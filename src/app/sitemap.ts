import { MetadataRoute } from "next";
import { getPublishedStories } from "@/lib/news-store";
import { softwares } from "@/data/software";
import { articles } from "@/data/articles";
import { categories } from "@/data/categories";
import { comparisons } from "@/data/comparisons";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://gulfsaasreview.com";

  // Static core hub routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/reviews`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/compare`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Dynamic news stories (all published articles)
  const stories = await getPublishedStories();
  const newsRoutes: MetadataRoute.Sitemap = stories.map((s) => ({
    url: `${baseUrl}/news/${s.slug}`,
    lastModified: new Date(s.updatedAt || s.isoDate || s.publishedDate),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Software review deep-dives
  const softwareRoutes: MetadataRoute.Sitemap = softwares.map((s) => ({
    url: `${baseUrl}/reviews/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Comprehensive buyer guides
  const articleRoutes: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${baseUrl}/articles/${a.slug}`,
    lastModified: new Date(a.isoDate || a.publishedDate),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Software categories
  const categoryRoutes: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${baseUrl}/categories/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // Side-by-side comparison matrices
  const comparisonRoutes: MetadataRoute.Sitemap = comparisons.map((c) => ({
    url: `${baseUrl}/compare/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...newsRoutes,
    ...softwareRoutes,
    ...articleRoutes,
    ...categoryRoutes,
    ...comparisonRoutes,
  ];
}
