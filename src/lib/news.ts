/** Client-safe news helpers: labels, sections, countries, formatting. */
import { gccCountries } from "@/data/news";
import type { NewsArticle } from "@/types";

/** News sections, in masthead order. `slug` matches NewsArticle.categorySlug. */
export const newsSections = [
  { slug: "ai-innovation", label: "AI" },
  { slug: "saas-cloud", label: "Cloud & SaaS" },
  { slug: "fintech", label: "FinTech" },
  { slug: "digital-transformation", label: "Transformation" },
  { slug: "vision-strategy", label: "Policy" },
  { slug: "cybersecurity", label: "Security" },
] as const;

export function sectionLabel(slug: string) {
  return newsSections.find((s) => s.slug === slug)?.label ?? slug;
}

export const newsCountries = gccCountries.map((c) => ({
  code: c.id,
  name: c.name,
  short: c.shortName,
  native: c.nativeName,
}));

export function countryLabel(code: string) {
  if (code === "gcc") return "GCC";
  return newsCountries.find((c) => c.code === code)?.name ?? code;
}

// Story lists (latest, most read, lead) now come from the CMS store: see getNewsFeed() in "@/lib/news-store".

/** "16 Nov" style short date for river timestamps. */
export function shortDate(a: { isoDate?: string; publishedDate: string }) {
  const d = new Date(a.isoDate ?? a.publishedDate);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "UTC" });
}

export const newsHref = (a: NewsArticle) => `/news/${a.slug}`;
