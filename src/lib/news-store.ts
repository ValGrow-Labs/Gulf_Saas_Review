/**
 * Server-only news store backed by content/news.json.
 * Import this ONLY from Server Components, Server Actions and Route Handlers.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import type { NewsArticle } from "@/types";

export type StoryStatus = "published" | "draft";
export type StoredStory = NewsArticle & { status: StoryStatus; updatedAt: string };

const CONTENT_DIR = path.join(process.cwd(), "content");
const NEWS_FILE = path.join(CONTENT_DIR, "news.json");
export const UPLOAD_DIR = path.join(CONTENT_DIR, "uploads");

export async function readStories(): Promise<StoredStory[]> {
  try {
    const raw = await fs.readFile(NEWS_FILE, "utf8");
    return JSON.parse(raw) as StoredStory[];
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw err;
  }
}

// Serialise writes so two saves can't interleave; write to a temp file then rename (atomic on the same disk).
let writeQueue: Promise<unknown> = Promise.resolve();
export function writeStories(stories: StoredStory[]): Promise<void> {
  const job = writeQueue.then(async () => {
    await fs.mkdir(CONTENT_DIR, { recursive: true });
    const tmp = `${NEWS_FILE}.${process.pid}.${Date.now()}.tmp`;
    await fs.writeFile(tmp, JSON.stringify(stories, null, 2) + "\n", "utf8");
    await fs.rename(tmp, NEWS_FILE);
  });
  writeQueue = job.catch(() => undefined);
  return job;
}

const toTime = (s: { isoDate?: string; publishedDate: string }) => new Date(s.isoDate ?? s.publishedDate).getTime();
export const byNewest = (a: StoredStory, b: StoredStory) => toTime(b) - toTime(a);

export async function getPublishedStories(): Promise<StoredStory[]> {
  return (await readStories()).filter((s) => s.status === "published").sort(byNewest);
}

/** Everything the public pages need, computed from published stories only. */
export async function getNewsFeed() {
  const latestNews = await getPublishedStories();
  const leadStory = latestNews.find((s) => s.isHeroFeatured) ?? latestNews[0];
  const ranked = latestNews
    .filter((s) => s.isTrending)
    .sort((a, b) => (a.trendingRank ?? 99) - (b.trendingRank ?? 99));
  const mostRead = (ranked.length > 0 ? ranked : latestNews).slice(0, 5);
  return { latestNews, leadStory, mostRead };
}

export async function getStoryBySlug(slug: string): Promise<StoredStory | undefined> {
  return (await readStories()).find((s) => s.slug === slug || s.id === slug);
}
