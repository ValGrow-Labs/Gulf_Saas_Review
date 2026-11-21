"use server";

import { promises as fs } from "node:fs";
import path from "node:path";
import { randomBytes } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { passwordMatches, startSession, endSession, requireAdmin, adminConfigured } from "@/lib/admin-auth";
import { readStories, writeStories, UPLOAD_DIR, type StoredStory } from "@/lib/news-store";
import {
  categoryLabels,
  countryOptions,
  softwareOptions,
  listImages,
  listAuthors,
  listAvatars,
} from "@/lib/cms-options";

/* ------------------------------------------------------------------ auth */

export type LoginState = { error?: string };

export async function loginAction(_prev: LoginState, formData: FormData): Promise<LoginState> {
  if (!adminConfigured()) return { error: "The admin is disabled. Set ADMIN_PASSWORD in .env.local and restart the server." };
  const password = String(formData.get("password") ?? "");
  // Small fixed delay blunts password guessing.
  await new Promise((r) => setTimeout(r, 400));
  if (!passwordMatches(password)) return { error: "That password is not correct." };
  await startSession();
  redirect("/admin/stories");
}

export async function logoutAction() {
  await endSession();
  redirect("/admin/login");
}

/* ------------------------------------------------------------------ helpers */

export type StoryFormState = { errors?: Record<string, string>; message?: string };

const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;
const MIME_EXT: Record<string, string> = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" };

const str = (fd: FormData, key: string) => String(fd.get(key) ?? "").trim();

function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
    .replace(/-+$/g, "");
}

const paragraphsOf = (text: string) =>
  text
    .split(/\r?\n\s*\r?\n/)
    .map((p) => p.replace(/\s*\r?\n\s*/g, " ").trim())
    .filter(Boolean);

const linesOf = (text: string) =>
  text
    .split(/\r?\n/)
    .map((l) => l.replace(/^[-*•]\s*/, "").trim())
    .filter(Boolean);

function longDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

function readTimeFor(words: number) {
  return `${Math.max(2, Math.round(words / 200))} min read`;
}

async function saveUpload(file: File, slug: string): Promise<string> {
  const ext = MIME_EXT[file.type];
  const name = `${slug || "story"}-${Date.now().toString(36)}-${randomBytes(3).toString("hex")}.${ext}`;
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  await fs.writeFile(path.join(UPLOAD_DIR, name), Buffer.from(await file.arrayBuffer()));
  return `/media/${name}`;
}

function refreshPublicSite() {
  // Re-render every public page on its next visit (front page, news, story pages, search index in the layout).
  revalidatePath("/", "layout");
}

/* ------------------------------------------------------------------ save */

export async function saveStoryAction(_prev: StoryFormState, formData: FormData): Promise<StoryFormState> {
  await requireAdmin();

  const errors: Record<string, string> = {};
  const stories = await readStories();
  const existingId = str(formData, "id");
  const existing = existingId ? stories.find((s) => s.id === existingId) : undefined;
  if (existingId && !existing) return { message: "This story no longer exists. It may have been deleted in another tab." };

  const intent = str(formData, "intent"); // "publish" | "draft"
  const title = str(formData, "title");
  const subtitle = str(formData, "subtitle");
  const excerpt = str(formData, "excerpt");
  const categorySlug = str(formData, "categorySlug");
  const countryCode = str(formData, "countryCode");
  const isoDate = str(formData, "isoDate");
  const imageCaption = str(formData, "imageCaption");
  const content = paragraphsOf(str(formData, "content"));
  const keyTakeaways = linesOf(str(formData, "keyTakeaways")).slice(0, 6);
  const tags = str(formData, "tags")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
    .slice(0, 8);
  const validSoftware = new Set(softwareOptions.map((o) => o.value));
  const relatedSoftwareSlugs = formData
    .getAll("relatedSoftwareSlugs")
    .map(String)
    .filter((s) => validSoftware.has(s))
    .slice(0, 4);

  // Subheadings: parallel arrays; drop empty rows.
  const subTitles = formData.getAll("subheadingTitle").map((v) => String(v).trim());
  const subBodies = formData.getAll("subheadingBody").map((v) => String(v));
  const subheadings = subTitles
    .map((t, i) => ({ title: t, paragraphs: paragraphsOf(subBodies[i] ?? "") }))
    .filter((s) => s.title || s.paragraphs.length);
  if (subheadings.some((s) => !s.title || !s.paragraphs.length)) {
    errors.subheadings = "Each section needs both a heading and some text, or remove it.";
  }

  // Validation
  if (title.length < 8) errors.title = "Write a headline of at least 8 characters.";
  if (title.length > 160) errors.title = "Keep the headline under 160 characters.";
  if (excerpt.length < 20) errors.excerpt = "Write a short summary (at least 20 characters). It shows in lists and search.";
  if (!categoryLabels[categorySlug]) errors.categorySlug = "Choose a section.";
  const country = countryOptions.find((c) => c.value === countryCode);
  if (!country) errors.countryCode = "Choose a country.";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(isoDate) || Number.isNaN(Date.parse(isoDate))) errors.isoDate = "Pick a publication date.";
  if (intent === "publish" && content.length === 0) errors.content = "Add the story text before publishing.";

  // Slug
  const slugInput = slugify(str(formData, "slug") || title);
  if (!slugInput) errors.slug = "The web address can only use letters, numbers and dashes.";
  else if (stories.some((s) => s.slug === slugInput && s.id !== existing?.id)) {
    errors.slug = "Another story already uses this web address. Change it slightly.";
  }

  // Author: existing byline, or a new one.
  let author: StoredStory["author"] | undefined;
  const authorChoice = str(formData, "author");
  if (authorChoice === "__new") {
    const name = str(formData, "newAuthorName");
    const role = str(formData, "newAuthorRole");
    const avatar = str(formData, "newAuthorAvatar");
    const avatars = await listAvatars();
    if (name.length < 3) errors.author = "Enter the new author's name.";
    else if (!avatars.includes(avatar)) errors.author = "Choose a photo for the new author.";
    else author = { name, role: role || "Contributor", avatar };
  } else {
    author = (await listAuthors()).find((a) => a.name === authorChoice);
    if (!author) errors.author = "Choose an author.";
  }

  // Image: upload wins over picker.
  let image = str(formData, "image");
  const upload = formData.get("imageFile");
  const hasUpload = upload instanceof File && upload.size > 0;
  if (hasUpload) {
    if (!MIME_EXT[(upload as File).type]) errors.image = "Upload a JPG, PNG or WebP image.";
    else if ((upload as File).size > MAX_UPLOAD_BYTES) errors.image = "Images must be 5 MB or smaller.";
  } else if (!(await listImages()).includes(image)) {
    errors.image = "Choose a photo or upload one.";
  }
  if (!imageCaption) errors.imageCaption = "Describe the photo. It's shown as the caption and read out by screen readers.";

  if (Object.keys(errors).length) return { errors, message: "Fix the highlighted fields and save again." };

  if (hasUpload) image = await saveUpload(upload as File, slugInput);

  // Flags
  const isHeroFeatured = formData.get("isHeroFeatured") === "on";
  const rank = Number(str(formData, "trendingRank") || "0");
  const trendingRank = rank >= 1 && rank <= 5 ? rank : undefined;
  const status = intent === "publish" ? "published" : "draft";

  const words = [...content, ...subheadings.flatMap((s) => s.paragraphs)].join(" ").split(/\s+/).filter(Boolean).length;
  const readTimeInput = str(formData, "readTime");

  const story: StoredStory = {
    ...(existing ?? {}),
    id: existing?.id ?? slugInput,
    slug: slugInput!,
    title,
    subtitle: subtitle || undefined,
    excerpt,
    category: categoryLabels[categorySlug],
    categorySlug,
    country: country!.label,
    countryCode: countryCode as StoredStory["countryCode"],
    readTime: /^\d+ min read$/.test(readTimeInput) ? readTimeInput : readTimeFor(words),
    publishedDate: longDate(isoDate),
    isoDate,
    author: author!,
    image,
    featuredImage: image,
    imageCaption,
    isHeroFeatured,
    isTrending: Boolean(trendingRank),
    trendingRank,
    featured: existing?.featured ?? false,
    tags,
    relatedSoftwareSlugs,
    keyTakeaways,
    content,
    subheadings: subheadings.length ? subheadings : undefined,
    status,
    updatedAt: new Date().toISOString(),
  };
  if (!story.trendingRank) delete story.trendingRank;
  if (!story.subheadings) delete story.subheadings;
  if (!story.subtitle) delete story.subtitle;

  // Keep flags unique: one lead story, one story per Most-read rank.
  let next = stories.map((s) => {
    if (s.id === story.id) return s;
    let changed = s;
    if (isHeroFeatured && s.isHeroFeatured) changed = { ...changed, isHeroFeatured: false };
    if (trendingRank && s.trendingRank === trendingRank) {
      changed = { ...changed, isTrending: false };
      delete changed.trendingRank;
    }
    return changed;
  });
  next = existing ? next.map((s) => (s.id === story.id ? story : s)) : [story, ...next];

  await writeStories(next);
  refreshPublicSite();
  redirect(`/admin/stories/${encodeURIComponent(story.id)}?saved=${status}`);
}

/* ------------------------------------------------------------------ delete */

export async function deleteStoryAction(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  const stories = await readStories();
  if (!stories.some((s) => s.id === id)) redirect("/admin/stories");
  await writeStories(stories.filter((s) => s.id !== id));
  refreshPublicSite();
  redirect("/admin/stories?deleted=1");
}

/* ------------------------------------------------------------------ quick status toggle from the list */

export async function setStatusAction(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  const status = str(formData, "status") === "published" ? "published" : "draft";
  const stories = await readStories();
  const target = stories.find((s) => s.id === id);
  if (!target) redirect("/admin/stories");
  if (status === "published" && !(target.content?.length)) redirect(`/admin/stories/${encodeURIComponent(id)}?needsText=1`);
  await writeStories(stories.map((s) => (s.id === id ? { ...s, status, updatedAt: new Date().toISOString() } : s)));
  refreshPublicSite();
  redirect("/admin/stories");
}
