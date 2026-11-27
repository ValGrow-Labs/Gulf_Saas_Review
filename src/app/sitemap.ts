import type { MetadataRoute } from "next";
import { articles } from "@/data/articles";
import { categories } from "@/data/categories";
import { comparisons } from "@/data/comparisons";
import { softwares } from "@/data/software";
import { getPublishedStories } from "@/lib/news-store";
import { SITE_URL } from "@/lib/site";

function parseValidDate(value?: string): Date | undefined {
  if (!value) return undefined;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const publishedStories = await getPublishedStories();
  const entries = new Map<string, MetadataRoute.Sitemap[number]>();

  const add = (
    path: string,
    options?: {
      lastModified?: Date;
      changeFrequency?: MetadataRoute.Sitemap[number]["changeFrequency"];
      priority?: number;
    }
  ) => {
    const url = `${SITE_URL}${path}`;
    if (entries.has(url)) return;
    entries.set(url, {
      url,
      ...(options?.lastModified ? { lastModified: options.lastModified } : {}),
      ...(options?.changeFrequency ? { changeFrequency: options.changeFrequency } : {}),
      ...(options?.priority !== undefined ? { priority: options.priority } : {}),
    });
  };

  const latestNewsDate = parseValidDate(
    publishedStories[0]?.updatedAt ?? publishedStories[0]?.isoDate ?? publishedStories[0]?.publishedDate
  );

  const latestArticleDate = articles
    .map((a) => parseValidDate(a.isoDate ?? a.publishedDate))
    .filter((d): d is Date => Boolean(d))
    .sort((a, b) => b.getTime() - a.getTime())[0];

  add("/", { lastModified: latestNewsDate, changeFrequency: "daily", priority: 1 });
  add("/news", { lastModified: latestNewsDate, changeFrequency: "daily", priority: 0.9 });

  for (const story of publishedStories) {
    if (!story.slug) continue;
    add(`/news/${story.slug}`, {
      lastModified: parseValidDate(story.updatedAt ?? story.isoDate ?? story.publishedDate),
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  add("/articles", { lastModified: latestArticleDate, changeFrequency: "weekly", priority: 0.8 });
  for (const article of articles) {
    add(`/articles/${article.slug}`, {
      lastModified: parseValidDate(article.isoDate ?? article.publishedDate),
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  add("/reviews", { changeFrequency: "weekly", priority: 0.9 });
  for (const software of softwares) {
    add(`/reviews/${software.slug}`, { changeFrequency: "monthly", priority: 0.8 });
  }

  add("/categories", { changeFrequency: "weekly", priority: 0.8 });
  for (const category of categories) {
    add(`/categories/${category.slug}`, { changeFrequency: "monthly", priority: 0.7 });
  }

  add("/compare", { changeFrequency: "weekly", priority: 0.8 });
  for (const comparison of comparisons) {
    add(`/compare/${comparison.slug}`, { changeFrequency: "monthly", priority: 0.7 });
  }

  add("/about", { changeFrequency: "monthly", priority: 0.5 });
  add("/contact", { changeFrequency: "monthly", priority: 0.5 });
  add("/privacy", { changeFrequency: "yearly", priority: 0.3 });
  add("/terms", { changeFrequency: "yearly", priority: 0.3 });

  return Array.from(entries.values());
}
