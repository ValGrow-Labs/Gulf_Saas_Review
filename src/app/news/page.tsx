import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import type { NewsArticle } from "@/types";
import Sadu from "@/components/Sadu";
import { getNewsFeed } from "@/lib/news-store";
import {
  newsSections,
  sectionLabel,
  newsCountries,
  countryLabel,
  shortDate,
  newsHref,
} from "@/lib/news";

export const metadata: Metadata = {
  title: "News",
  description:
    "Reporting on business software, cloud, FinTech and policy across Saudi Arabia, the UAE, Qatar, Kuwait, Bahrain and Oman.",
};


type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

/** Country codes that can be filtered on: the six GCC states plus region-wide stories. */
/** Short Arabic names for filter pills and headers. */
const arabicCountry: Record<string, string> = {
  "saudi-arabia": "السعودية",
  uae: "الإمارات",
  qatar: "قطر",
  kuwait: "الكويت",
  bahrain: "البحرين",
  oman: "عُمان",
  gcc: "الخليج",
};
const arabicSection: Record<string, string> = {
  "ai-innovation": "الذكاء الاصطناعي",
  "saas-cloud": "السحابة والبرمجيات",
  fintech: "التقنية المالية",
  "digital-transformation": "التحول الرقمي",
  "vision-strategy": "السياسات",
  cybersecurity: "الأمن السيبراني",
};

const countryFilters = [
  ...newsCountries.map((c) => ({ code: c.code as string, label: c.name, arabic: arabicCountry[c.code] })),
  { code: "gcc", label: "GCC-wide", arabic: arabicCountry.gcc },
];

/** Filter pill on the terracotta band. Active = sand fill. */
const bandChip = (active: boolean) =>
  `inline-flex min-h-8 items-center gap-2 whitespace-nowrap rounded-full border-[1.5px] px-3.5 text-[0.82rem] font-semibold transition-colors ${
    active ? "border-sand bg-sand text-ink" : "border-white/35 text-white hover:border-white/70 hover:bg-white/10"
  }`;

function filterHref(section?: string, country?: string) {
  const qs = new URLSearchParams();
  if (section) qs.set("section", section);
  if (country) qs.set("country", country);
  const s = qs.toString();
  return s ? `/news?${s}` : "/news";
}

function longDate(a: NewsArticle) {
  return new Date(a.isoDate ?? a.publishedDate).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

const isoOf = (a: NewsArticle) => a.isoDate ?? new Date(a.publishedDate).toISOString().slice(0, 10);

function Kicker({ story, tone = "default" }: { story: NewsArticle; tone?: "default" | "onColor" }) {
  return (
    <p
      className={`font-mono text-[0.68rem] font-semibold uppercase tracking-[0.07em] ${
        tone === "onColor" ? "text-white/70" : "text-ink-3"
      }`}
    >
      <span className={tone === "onColor" ? "text-sand" : "text-terracotta"}>{sectionLabel(story.categorySlug)}</span>
      <span aria-hidden="true"> · </span>
      <span className="sr-only">, </span>
      {countryLabel(story.countryCode)}
    </p>
  );
}

function RiverItem({ story }: { story: NewsArticle }) {
  return (
    <li className="border-t-[1.5px] border-dashed border-rule first:border-t-0">
      <Link
        href={newsHref(story)}
        className="group grid grid-cols-[1fr_84px] items-start gap-4 px-4 py-4 transition-colors hover:bg-paper sm:grid-cols-[4.2rem_1fr_128px] sm:px-5"
      >
        <time dateTime={isoOf(story)} className="num hidden pt-0.5 text-[0.74rem] leading-tight text-terracotta sm:block">
          {shortDate(story)}
        </time>
        <div className="min-w-0">
          <Kicker story={story} />
          <h3 className="h-card mt-1 text-[1.06rem] transition-colors group-hover:text-terracotta sm:text-[1.15rem]">{story.title}</h3>
          <p className="mt-1 hidden text-[0.86rem] text-ink-2 line-clamp-2 sm:block">{story.excerpt}</p>
          <p className="mt-1.5 text-[0.74rem] text-ink-3">
            {story.author.name}
            <span className="sm:hidden"> · {shortDate(story)}</span> · {story.readTime}
          </p>
        </div>
        <div className="media aspect-[4/3] !rounded-[12px]">
          <Image src={story.featuredImage} alt="" fill sizes="128px" className="object-cover" />
        </div>
      </Link>
    </li>
  );
}

export default async function NewsPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const { latestNews, leadStory, mostRead } = await getNewsFeed();
  const rawSection = first(sp.section);
  const rawCountry = first(sp.country);
  const section = newsSections.some((s) => s.slug === rawSection) ? rawSection : undefined;
  const country = countryFilters.some((c) => c.code === rawCountry) ? rawCountry : undefined;
  const filtered = Boolean(section || country);

  const stories = latestNews.filter(
    (a) => (!section || a.categorySlug === section) && (!country || a.countryCode === country)
  );

  const countryName = country ? (country === "gcc" ? "the GCC" : countryLabel(country)) : undefined;
  const countryFilterLabel = country ? countryFilters.find((c) => c.code === country)!.label : undefined;
  const title =
    section && countryName
      ? `${sectionLabel(section)} in ${countryName}`
      : section
        ? sectionLabel(section)
        : country
          ? countryFilterLabel!
          : "News from the Gulf";

  const countLine =
    stories.length === 0
      ? "No stories match these filters yet."
      : `${stories.length} ${stories.length === 1 ? "story" : "stories"}, most recent ${longDate(stories[0])}.`;

  // Front arrangement when unfiltered: lead + three secondaries, then everything else in the river.
  const secondary = filtered ? [] : latestNews.filter((a) => a.id !== leadStory.id).slice(0, 3);
  const topIds = new Set([leadStory.id, ...secondary.map((a) => a.id)]);
  const river = filtered ? stories : stories.filter((a) => !topIds.has(a.id));
  const arabicTitle =
    section && country
      ? `${arabicSection[section]} · ${arabicCountry[country]}`
      : section
        ? arabicSection[section]
        : country
          ? `أخبار ${arabicCountry[country]}`
          : "أخبار الخليج";

  return (
    <>
      {/* ============================================================ HEADER + FILTERS — terracotta band, bilingual */}
      <header className="relative overflow-hidden border-t-[3px] border-sand bg-terracotta text-white">
        {/* Sadu diamond lattice watermark */}
        <svg aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 h-full w-1/2 opacity-[0.12] max-md:hidden">
          <defs>
            <pattern id="news-lattice" width="36" height="36" patternUnits="userSpaceOnUse">
              <path d="M18 2 L34 18 L18 34 L2 18 Z" fill="none" stroke="#F1D39C" strokeWidth="2" />
              <path d="M18 12 L24 18 L18 24 L12 18 Z" fill="#F1D39C" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#news-lattice)" />
        </svg>

        <div className="wrap relative pt-8 pb-7">
          <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
            <div>
              <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-white/70">
                {filtered ? (
                  <Link href="/news" className="text-sand hover:underline">
                    All news
                  </Link>
                ) : (
                  <span className="text-sand">News desk</span>
                )}
                {filtered && <span aria-hidden="true"> / filtered</span>}
              </p>
              <h1 className="display mt-2 text-[clamp(2rem,1.4rem+1.9vw,3rem)] text-paper">{title}</h1>
              <p className="mt-2 text-[0.88rem] text-white/85">{countLine}</p>
            </div>
            <p lang="ar" dir="rtl" className="font-arabic text-[clamp(2rem,1.4rem+2.2vw,3.4rem)] font-medium leading-none text-sand">
              {arabicTitle}
            </p>
          </div>

          <div className="mt-7 space-y-2.5">
            <nav aria-label="News sections" className="flex items-center gap-3">
              <span className="w-16 shrink-0 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-white/70">Section</span>
              <ul className="-my-1 flex flex-1 gap-1.5 overflow-x-auto py-1 scrollbar-none">
                <li>
                  <Link href={filterHref(undefined, country)} aria-current={!section ? "page" : undefined} className={bandChip(!section)}>
                    All
                  </Link>
                </li>
                {newsSections.map((sec) => (
                  <li key={sec.slug}>
                    <Link href={filterHref(sec.slug, country)} aria-current={section === sec.slug ? "page" : undefined} className={bandChip(section === sec.slug)}>
                      {sec.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-label="News by country" className="flex items-center gap-3">
              <span className="w-16 shrink-0 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-white/70">Country</span>
              <ul className="-my-1 flex flex-1 gap-1.5 overflow-x-auto py-1 scrollbar-none">
                <li>
                  <Link href={filterHref(section, undefined)} aria-current={!country ? "page" : undefined} className={bandChip(!country)}>
                    All
                  </Link>
                </li>
                {countryFilters.map((c) => (
                  <li key={c.code}>
                    <Link href={filterHref(section, c.code)} aria-current={country === c.code ? "page" : undefined} className={bandChip(country === c.code)}>
                      {c.label}
                      <span lang="ar" dir="rtl" className="font-arabic text-[0.86rem] opacity-80">
                        {c.arabic}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <Sadu from="#C24E2A" to="#FFFCF6" accent="#0E4B48" />

      {/* ============================================================ TOP STORIES (unfiltered only) */}
      {!filtered && (
        <section aria-labelledby="top-stories-title" className="wrap pt-7 pb-8">
          <h2 id="top-stories-title" className="sr-only">
            Top stories
          </h2>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-7">
            <div className="lg:col-span-8">
              <article className="group">
                <Link href={newsHref(leadStory)} className="grid grid-cols-1 gap-5 md:grid-cols-[1.25fr_1fr] md:items-center">
                  <div className="media aspect-[16/11] !rounded-[20px]">
                    <Image
                      src={leadStory.featuredImage}
                      alt={leadStory.imageCaption ?? ""}
                      fill
                      priority
                      sizes="(min-width: 1024px) 520px, 100vw"
                      className="object-cover"
                    />
                    <span className="absolute left-3 top-3 z-10 rounded-full bg-terracotta px-3 py-1 font-mono text-[0.62rem] font-bold uppercase tracking-[0.08em] text-white">
                      Lead story
                    </span>
                  </div>
                  <div>
                    <Kicker story={leadStory} />
                    <h3 className="display mt-2 text-[clamp(1.6rem,1.2rem+1.3vw,2.3rem)] transition-colors group-hover:text-terracotta">
                      {leadStory.title}
                    </h3>
                    <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-2 line-clamp-4">{leadStory.subtitle || leadStory.excerpt}</p>
                    <p className="mt-3 text-[0.78rem] text-ink-3">
                      <span className="font-semibold text-ink-2">{leadStory.author.name}</span> ·{" "}
                      <time dateTime={isoOf(leadStory)}>{shortDate(leadStory)}</time> · {leadStory.readTime}
                    </p>
                  </div>
                </Link>
              </article>

              <ul className="mt-7 grid grid-cols-1 gap-5 border-t-[1.5px] border-dashed border-rule pt-6 sm:grid-cols-3">
                {secondary.map((s2) => (
                  <li key={s2.id}>
                    <article className="group">
                      <Link href={newsHref(s2)} className="grid grid-cols-[1fr_88px] gap-4 sm:block">
                        <div className="media aspect-square !rounded-[14px] max-sm:order-2 sm:aspect-[16/10]">
                          <Image src={s2.featuredImage} alt="" fill sizes="(min-width: 640px) 260px, 88px" className="object-cover" />
                        </div>
                        <div className="sm:mt-3">
                          <Kicker story={s2} />
                          <h3 className="h-card mt-1.5 text-[1.02rem] transition-colors group-hover:text-terracotta">{s2.title}</h3>
                          <p className="mt-1.5 text-[0.74rem] text-ink-3">
                            <time dateTime={isoOf(s2)}>{shortDate(s2)}</time> · {s2.readTime}
                          </p>
                        </div>
                      </Link>
                    </article>
                  </li>
                ))}
              </ul>
            </div>

            <aside aria-labelledby="most-read-title" className="lg:col-span-4">
              <section className="h-full rounded-[22px] bg-sand-soft p-5">
                <h2 id="most-read-title" className="flex items-center gap-2.5 font-display text-[1.3rem] font-bold tracking-[-0.025em]">
                  <span aria-hidden="true" className="h-3 w-3 rotate-45 rounded-[2px] bg-terracotta" />
                  Most read
                </h2>
                <ol className="mt-2">
                  {mostRead.map((m, i) => (
                    <li key={m.id} className="border-t-[1.5px] border-dashed border-sand first:border-t-0">
                      <Link href={newsHref(m)} className="group grid grid-cols-[2rem_1fr] gap-2 py-3">
                        <span aria-hidden="true" className="font-display text-[1.7rem] font-bold leading-[0.9] text-terracotta">
                          {i + 1}
                        </span>
                        <span>
                          <span className="block text-[0.9rem] font-semibold leading-snug transition-colors group-hover:text-terracotta">{m.title}</span>
                          <span className="mt-0.5 block text-[0.72rem] text-ink-3">
                            {sectionLabel(m.categorySlug)} · <time dateTime={isoOf(m)}>{shortDate(m)}</time>
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ol>
              </section>
            </aside>
          </div>
        </section>
      )}

      {/* ============================================================ RIVER + RAIL */}
      <div className={filtered ? "" : "border-t-[1.5px] border-rule bg-paper-2"}>
        <div className="wrap grid grid-cols-1 gap-8 py-10 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-8">
            {stories.length > 0 ? (
              <section aria-labelledby="latest-title">
                <h2 id="latest-title" className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-display text-[1.35rem] font-bold tracking-[-0.025em]">
                  <span aria-hidden="true" className="h-3 w-3 rotate-45 rounded-[2px] bg-terracotta" />
                  {filtered ? `${stories.length} ${stories.length === 1 ? "story" : "stories"}` : "All stories"}
                  <span className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-ink-3">Newest first</span>
                </h2>
                <ol className="mt-4 overflow-hidden rounded-[22px] border-[1.5px] border-rule bg-surface">
                  {river.map((r) => (
                    <RiverItem key={r.id} story={r} />
                  ))}
                </ol>
              </section>
            ) : (
              <section aria-labelledby="empty-title" className="rounded-[22px] bg-terracotta-soft p-7">
                <span className="tag bg-white text-terracotta-deep">No results</span>
                <h2 id="empty-title" className="h-card mt-3 text-[1.6rem]">
                  Nothing filed here yet.
                </h2>
                <p className="mt-2 max-w-[52ch] text-[0.95rem] leading-relaxed text-ink-2">
                  We have not published any {section ? sectionLabel(section) : ""} stories
                  {countryName ? ` from ${countryName}` : ""} so far. Try a wider search.
                </p>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  <Link href="/news" className="btn btn-accent btn-sm">
                    Clear filters
                  </Link>
                  {section && country && (
                    <>
                      <Link href={filterHref(section)} className="btn btn-outline btn-sm">
                        All {sectionLabel(section)}
                      </Link>
                      <Link href={filterHref(undefined, country)} className="btn btn-outline btn-sm">
                        All {countryFilterLabel}
                      </Link>
                    </>
                  )}
                </div>
              </section>
            )}
          </div>

          <aside aria-label="Browse" className="lg:col-span-4">
            <div className="space-y-5 lg:sticky lg:top-16">
              {filtered && (
                <section aria-labelledby="most-read-title-f" className="rounded-[22px] bg-sand-soft p-5">
                  <h2 id="most-read-title-f" className="font-display text-[1.2rem] font-bold tracking-[-0.02em]">
                    Most read
                  </h2>
                  <ol className="mt-1">
                    {mostRead.map((m, i) => (
                      <li key={m.id} className="border-t-[1.5px] border-dashed border-sand first:border-t-0">
                        <Link href={newsHref(m)} className="group grid grid-cols-[1.6rem_1fr] gap-2 py-2.5">
                          <span aria-hidden="true" className="font-display text-[1.3rem] font-bold leading-none text-terracotta">
                            {i + 1}
                          </span>
                          <span className="text-[0.86rem] font-semibold leading-snug group-hover:text-terracotta">{m.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ol>
                </section>
              )}
              <section aria-labelledby="by-country-title" className="rounded-[22px] bg-teal p-5 text-teal-soft">
                <h2 id="by-country-title" className="font-display text-[1.2rem] font-bold tracking-[-0.02em] text-paper">
                  By country
                </h2>
                <ul className="mt-3 grid grid-cols-2 gap-2">
                  {newsCountries.map((c) => {
                    const n = latestNews.filter((a) => a.countryCode === c.code).length;
                    const active = country === c.code;
                    return (
                      <li key={c.code}>
                        <Link
                          href={filterHref(section, c.code)}
                          aria-current={active ? "page" : undefined}
                          className={`flex h-full flex-col rounded-[14px] p-3 transition-colors ${active ? "bg-sand text-ink" : "bg-teal-deep hover:bg-[#0b403d]"}`}
                        >
                          <span lang="ar" dir="rtl" className={`self-start font-arabic text-[0.98rem] leading-tight ${active ? "text-terracotta-deep" : "text-sand"}`}>
                            {c.native}
                          </span>
                          <span className={`mt-1.5 text-[0.82rem] font-semibold ${active ? "text-ink" : "text-paper"}`}>{c.name}</span>
                          <span className={`num text-[0.68rem] ${active ? "text-ink-2" : "text-teal-soft/75"}`}>
                            {n} {n === 1 ? "story" : "stories"}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </section>
              <section aria-labelledby="buying-title" className="rounded-[22px] bg-terracotta p-5 text-white">
                <h2 id="buying-title" className="font-display text-[1.2rem] font-bold tracking-[-0.02em]">
                  Buying software?
                </h2>
                <p className="mt-1.5 text-[0.86rem] text-white/85">Our reviews test each product against ZATCA, FTA, WPS and Arabic.</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Link href="/reviews" className="btn btn-sand btn-sm">
                    Reviews
                  </Link>
                  <Link href="/compare" className="btn btn-sm border-[1.5px] border-white/50 text-white hover:bg-white/10">
                    Compare
                  </Link>
                </div>
              </section>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
