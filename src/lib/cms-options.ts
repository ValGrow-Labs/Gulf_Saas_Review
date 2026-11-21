/** Server-only option lists for the CMS editor. */
import { promises as fs } from "node:fs";
import path from "node:path";
import { softwares } from "@/data/software";
import { newsSections, newsCountries } from "@/lib/news";
import { readStories, UPLOAD_DIR } from "@/lib/news-store";

/** Long category labels stored on each story, keyed by section slug. */
export const categoryLabels: Record<string, string> = {
  "ai-innovation": "AI & Innovation",
  "saas-cloud": "SaaS & Cloud",
  fintech: "FinTech",
  "digital-transformation": "Digital Transformation",
  "vision-strategy": "Vision & Strategy",
  cybersecurity: "Cybersecurity",
};

export const sectionOptions = newsSections.map((s) => ({ value: s.slug, label: categoryLabels[s.slug] ?? s.label }));

export const countryOptions = [
  ...newsCountries.map((c) => ({ value: c.code as string, label: c.name })),
  { value: "gcc", label: "GCC Regional" },
];

export const softwareOptions = softwares.map((s) => ({ value: s.slug, label: s.name }));

export const IMAGE_EXT = /\.(jpe?g|png|webp)$/i;

/** Existing photos the editor can pick: bundled article images + uploads. */
export async function listImages(): Promise<string[]> {
  const bundled = await fs
    .readdir(path.join(process.cwd(), "public", "articles"))
    .catch(() => [] as string[]);
  const uploads = await fs.readdir(UPLOAD_DIR).catch(() => [] as string[]);
  return [
    ...uploads.filter((f) => IMAGE_EXT.test(f)).sort().reverse().map((f) => `/media/${f}`),
    ...bundled.filter((f) => IMAGE_EXT.test(f)).sort().map((f) => `/articles/${f}`),
  ];
}

/** Authors already used on stories (unique by name), so bylines stay consistent. */
export async function listAuthors() {
  const seen = new Map<string, { name: string; role: string; avatar: string }>();
  for (const s of await readStories()) if (!seen.has(s.author.name)) seen.set(s.author.name, s.author);
  return [...seen.values()].sort((a, b) => a.name.localeCompare(b.name));
}

/** Avatars available for new authors. */
export async function listAvatars(): Promise<string[]> {
  const files = await fs.readdir(path.join(process.cwd(), "public", "authors")).catch(() => [] as string[]);
  return files.filter((f) => IMAGE_EXT.test(f)).map((f) => `/authors/${f}`);
}
