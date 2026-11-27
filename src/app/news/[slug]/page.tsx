import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { NewsArticle } from "@/types";
import { getNewsFeed, getPublishedStories, getStoryBySlug } from "@/lib/news-store";
import { isAdmin } from "@/lib/admin-auth";
import { softwares, softwareLookup } from "@/data/software";
import { sectionLabel, countryLabel, shortDate, newsHref } from "@/lib/news";
import ShareButtons from "@/components/ShareButtons";
import Monogram from "@/components/Monogram";
import ScoreDial from "@/components/ScoreDial";
import Sadu from "@/components/Sadu";
import { pad2 } from "@/lib/format";

// Stories published from the CMS after the build are rendered on first request.
export const dynamicParams = true;

export async function generateStaticParams() {
  return (await getPublishedStories()).map((a) => ({ slug: a.slug }));
}

/** Published stories are public; drafts are visible only to a logged-in admin (preview). */
async function loadVisibleStory(slug: string) {
  const story = await getStoryBySlug(slug);
  if (!story) return undefined;
  if (story.status !== "published" && !(await isAdmin())) return undefined;
  return story;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const story = await loadVisibleStory(slug);
  if (!story) return { title: "Story not found" };

  const description = story.subtitle || story.excerpt;
  const canonicalUrl = `/news/${story.slug}`;
  const isPublished = story.status === "published";

  return {
    title: story.title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: isPublished
      ? { index: true, follow: true }
      : { index: false, follow: false },
    openGraph: {
      type: "article",
      siteName: "Gulf SaaS Review",
      locale: "en_US",
      title: story.title,
      description,
      url: canonicalUrl,
      publishedTime: story.isoDate,
      authors: [story.author.name],
      section: sectionLabel(story.categorySlug),
      tags: story.tags,
      images: [{ url: story.featuredImage, alt: story.imageCaption ?? story.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: story.title,
      description,
      images: [story.featuredImage],
    },
  };
}

const C = {
  paper: "#FFFCF6",
  terracotta: "#C24E2A",
  teal: "#0E4B48",
  sand: "#F1D39C",
};

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

/** Up to three other stories: same section first, then same country, then the latest. */
function relatedTo(story: NewsArticle, latestNews: NewsArticle[], n = 3) {
  const others = latestNews.filter((a) => a.id !== story.id);
  const picked: NewsArticle[] = [];
  const add = (list: NewsArticle[]) => {
    for (const a of list) if (picked.length < n && !picked.includes(a)) picked.push(a);
  };
  add(others.filter((a) => a.categorySlug === story.categorySlug));
  if (story.countryCode !== "gcc") add(others.filter((a) => a.countryCode === story.countryCode));
  add(others);
  return picked;
}

const dropCap =
  "first-letter:float-left first-letter:mt-[0.06em] first-letter:mr-3 first-letter:font-display first-letter:text-[4.4em] first-letter:font-bold first-letter:leading-[0.8] first-letter:text-terracotta";

export default async function NewsStoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = await loadVisibleStory(slug);
  if (!story) notFound();
  const { latestNews, mostRead } = await getNewsFeed();
  const isDraft = story.status !== "published";

  const section = sectionLabel(story.categorySlug);
  const sectionHref = `/news?section=${story.categorySlug}`;
  const paragraphs = story.content ?? [];
  const takeaways = story.keyTakeaways ?? [];
  const products = (story.relatedSoftwareSlugs ?? [])
    .map((s) => softwareLookup[s] || softwares.find((item) => item.slug === s || item.id === s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
  const related = relatedTo(story, latestNews);
  const popular = mostRead.filter((a) => a.id !== story.id).slice(0, 5);

  const newsArticleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: story.title,
    description: story.subtitle || story.excerpt,
    image: [`https://gulfsaasreview.com${story.featuredImage}`],
    datePublished: story.isoDate || story.publishedDate,
    dateModified: story.updatedAt || story.isoDate || story.publishedDate,
    author: [
      {
        "@type": "Person",
        name: story.author.name,
        jobTitle: story.author.role,
      },
    ],
    publisher: {
      "@type": "NewsMediaOrganization",
      name: "Gulf SaaS Review",
      url: "https://gulfsaasreview.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://gulfsaasreview.com/news/${story.slug}`,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://gulfsaasreview.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "News",
        item: "https://gulfsaasreview.com/news",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: section,
        item: `https://gulfsaasreview.com${sectionHref}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: story.title,
        item: `https://gulfsaasreview.com/news/${story.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(newsArticleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {isDraft && (
        <div role="status" className="bg-sand">
          <div className="wrap flex flex-wrap items-center justify-between gap-3 py-2.5 text-[0.88rem] font-semibold text-ink">
            <span>Draft preview: only logged-in editors can see this story.</span>
            <Link href={`/admin/stories/${story.id}`} className="underline">
              Back to editor
            </Link>
          </div>
        </div>
      )}
      <article>
        {/* ============================================================ HERO */}
        <header className="wrap pt-8 pb-10 lg:pt-10 lg:pb-12">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-[0.82rem] font-semibold">
              <li>
                <Link href="/news" className="inline-flex min-h-8 items-center rounded-full bg-paper-2 px-3 text-ink-2 transition-colors hover:text-terracotta">
                  News
                </Link>
              </li>
              <li aria-hidden="true" className="text-ink-3">
                /
              </li>
              <li>
                <Link href={sectionHref} className="inline-flex min-h-8 items-center rounded-full bg-terracotta-soft px-3 text-terracotta-deep transition-colors hover:bg-terracotta hover:text-white">
                  {section}
                </Link>
              </li>
            </ol>
          </nav>

          <div className="mt-10 max-w-[62rem] rise lg:mt-12">
            <Kicker story={story} />
            <h1 className="display mt-4 text-[clamp(2.2rem,1.3rem+3.4vw,4.3rem)]">{story.title}</h1>
            {story.subtitle && (
              <p className="mt-6 max-w-[58ch] text-[1.2rem] leading-relaxed text-ink-2 sm:text-[1.32rem]">{story.subtitle}</p>
            )}
          </div>

          <div className="mt-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-paper-2 ring-2 ring-sand ring-offset-2 ring-offset-paper">
                <Image src={story.author.avatar} alt={story.author.name} fill sizes="48px" className="object-cover" />
              </span>
              <p className="text-[0.9rem] leading-tight">
                <span className="block font-semibold text-ink">By {story.author.name}</span>
                <span className="text-ink-3">
                  <time dateTime={isoOf(story)}>{longDate(story)}</time> · {story.readTime}
                </span>
              </p>
            </div>
            <ShareButtons title={story.title} />
          </div>
        </header>

        {/* ============================================================ LEAD IMAGE */}
        <figure className="wrap">
          <div className="relative">
            <div className="media relative aspect-[16/10] !rounded-[28px] sm:aspect-[21/9]">
              <Image
                src={story.featuredImage}
                alt={story.imageCaption ?? story.title}
                fill
                priority
                sizes="(min-width: 1536px) 1440px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
          {story.imageCaption && (
            <figcaption className="mt-5 flex max-w-[80ch] gap-2 text-[0.85rem] leading-[1.5] text-ink-3">
              <span aria-hidden="true" className="text-terracotta">
                ◆
              </span>
              {story.imageCaption}
            </figcaption>
          )}
        </figure>

        {/* ============================================================ BODY + RAIL */}
        <div className="wrap grid grid-cols-1 gap-12 py-12 lg:grid-cols-12 lg:gap-10 lg:py-16">
          <div className="min-w-0 lg:col-span-7">
            <div className="prose-gsr mx-auto max-w-[66ch] lg:mx-0">
              {paragraphs.map((p, idx) => (
                <p key={idx} className={idx === 0 ? dropCap : undefined}>
                  {p}
                </p>
              ))}

              {story.subheadings?.map((sub, sIdx) => (
                <section key={sIdx}>
                  <h2>{sub.title}</h2>
                  {sub.paragraphs.map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                </section>
              ))}
            </div>

            {story.tags.length > 0 && (
              <div className="mx-auto mt-12 max-w-[66ch] lg:mx-0">
                <h2 className="kicker">Topics</h2>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {story.tags.map((t) => (
                    <li key={t}>
                      <Link href={sectionHref} className="chip">
                        {t}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <p className="mx-auto mt-8 max-w-[66ch] rounded-[18px] bg-paper-2 px-5 py-4 text-[0.88rem] text-ink-2 lg:mx-0">
              Spotted an error or have a tip?{" "}
              <Link href="/contact" className="link font-semibold">
                Write to the newsroom
              </Link>
              .
            </p>
          </div>

          <aside aria-label="Story summary" className="lg:col-span-4 lg:col-start-9">
            <div className="space-y-6 lg:sticky lg:top-28">
              {takeaways.length > 0 && (
                <section aria-labelledby="takeaways-title" className="rounded-[28px] bg-teal p-6 text-teal-soft sm:p-8">
                  <h2 id="takeaways-title" className="h-card text-[1.5rem] text-paper">
                    Key takeaways
                  </h2>
                  <ol className="mt-4">
                    {takeaways.map((t, i) => (
                      <li
                        key={i}
                        className="grid grid-cols-[2.2rem_1fr] gap-2 border-t-[1.5px] border-dashed border-white/20 py-4 first:border-t-0 first:pt-2"
                      >
                        <span className="num pt-[0.2rem] text-[0.82rem] font-semibold text-sand">{pad2(i + 1)}</span>
                        <span className="text-[0.98rem] leading-[1.55] text-paper">{t}</span>
                      </li>
                    ))}
                  </ol>
                </section>
              )}

              {products.length > 0 && (
                <section aria-labelledby="products-title" className="rounded-[28px] bg-sand-soft p-6 sm:p-8">
                  <h2 id="products-title" className="h-card text-[1.5rem]">
                    Products mentioned
                  </h2>
                  <ul className="mt-4 space-y-2">
                    {products.map((sw) => (
                      <li key={sw.id}>
                        <Link
                          href={`/reviews/${sw.slug}`}
                          className="group grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-[18px] bg-paper p-2.5 pr-3 transition-colors hover:bg-white"
                        >
                          <Monogram name={sw.name} color={sw.accentColor} size="sm" />
                          <span className="min-w-0">
                            <span className="block truncate text-[0.95rem] font-semibold text-ink transition-colors group-hover:text-terracotta">
                              {sw.name}
                            </span>
                            <span className="block truncate text-[0.78rem] text-ink-3">{sw.categoryName}</span>
                          </span>
                          <ScoreDial score={sw.verdict.score} size={40} color={C.teal} />
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link href="/reviews" className="arrow-link mt-5">
                    All reviews
                  </Link>
                </section>
              )}
            </div>
          </aside>
        </div>
      </article>

      {/* ============================================================ RELATED — terracotta band */}
      {related.length > 0 && (
        <>
          <Sadu from={C.paper} to={C.terracotta} accent={C.sand} />
          <section aria-labelledby="related-title" className="bg-terracotta text-white">
            <div className="wrap py-14 lg:py-20">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <h2 id="related-title" className="h-section">
                  Related coverage
                </h2>
                <Link href={sectionHref} className="arrow-link text-white hover:!text-sand">
                  More {section}
                </Link>
              </div>
              <ul className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
                {related.map((s) => (
                  <li key={s.id}>
                    <article className="group">
                      <Link href={newsHref(s)} className="grid grid-cols-[1fr_104px] items-start gap-4 md:block">
                        <div className="media order-2 aspect-[4/3] !bg-terracotta-deep md:mb-5">
                          <Image src={s.featuredImage} alt={s.imageCaption || s.title} fill loading="lazy" sizes="(min-width: 768px) 420px, 104px" className="object-cover" />
                        </div>
                        <div className="order-1 min-w-0">
                          <Kicker story={s} tone="onColor" />
                          <h3 className="h-card mt-2 text-[1.2rem] text-white decoration-sand decoration-2 underline-offset-4 group-hover:underline sm:text-[1.4rem]">
                            {s.title}
                          </h3>
                          <p className="mt-2 text-[0.8rem] text-white/65">
                            {s.author.name} · <time dateTime={isoOf(s)}>{longDate(s)}</time>
                          </p>
                        </div>
                      </Link>
                    </article>
                  </li>
                ))}
              </ul>
            </div>
          </section>
          <Sadu from={C.terracotta} to={C.paper} accent={C.teal} />
        </>
      )}

      {/* ============================================================ MOST READ */}
      {popular.length > 0 && (
        <section aria-labelledby="most-read-title" className="wrap py-14 lg:py-20">
          <div className="rounded-[28px] bg-sand-soft p-6 sm:p-10">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 id="most-read-title" className="h-section">
                Most read
              </h2>
              <Link href="/news" className="arrow-link">
                All news
              </Link>
            </div>
            <ol className="mt-6 grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:grid-cols-5">
              {popular.map((s, i) => (
                <li
                  key={s.id}
                  className="border-t-[1.5px] border-dashed border-sand first:border-t-0 sm:[&:nth-child(2)]:border-t-0 lg:border-t-0"
                >
                  <Link href={newsHref(s)} className="group grid grid-cols-[2.6rem_1fr] gap-3 py-4 lg:block">
                    <span aria-hidden="true" className="display block text-[2.4rem] leading-[0.85] text-terracotta">
                      {i + 1}
                    </span>
                    <span className="block lg:mt-3">
                      <span className="block text-[1rem] font-semibold leading-snug text-ink transition-colors group-hover:text-terracotta">
                        {s.title}
                      </span>
                      <span className="mt-1 block text-[0.78rem] text-ink-3">
                        {sectionLabel(s.categorySlug)} · <time dateTime={isoOf(s)}>{shortDate(s)}</time>
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}
    </>
  );
}
