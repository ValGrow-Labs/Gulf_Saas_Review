import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { articles, articleLookup } from "@/data/articles";
import { softwares, softwareLookup } from "@/data/software";
import ShareButtons from "@/components/ShareButtons";
import SoftwareCard from "@/components/SoftwareCard";
import Monogram from "@/components/Monogram";
import ScoreDial from "@/components/ScoreDial";
import Sadu from "@/components/Sadu";
import { pad2 } from "@/lib/format";

export const dynamicParams = false;

export async function generateStaticParams() {
  return articles.map((a) => ({
    slug: a.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articleLookup[slug];
  if (!article) return { title: "Article Not Found | GulfSaasReview" };

  return {
    title: `${article.title} | GulfSaasReview`,
    description: article.excerpt,
  };
}

const C = {
  paper: "#FFFCF6",
  terracotta: "#C24E2A",
  teal: "#0E4B48",
  sand: "#F1D39C",
};

/** Splits "Title: subtitle" or "Title (subtitle)" so the headline can set the tail in a lighter tone. */
function splitTitle(title: string): [string, string | null] {
  const paren = title.match(/^(.*?)\s*\((.+)\)\s*$/);
  if (paren) return [paren[1], paren[2]];
  const idx = title.indexOf(": ");
  if (idx > 0) return [title.slice(0, idx), title.slice(idx + 2)];
  return [title, null];
}

const dropCap =
  "first-letter:float-left first-letter:mt-[0.06em] first-letter:mr-3 first-letter:font-display first-letter:text-[4.4em] first-letter:font-bold first-letter:leading-[0.8] first-letter:text-teal";

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articleLookup[slug];

  if (!article) {
    notFound();
  }

  const relatedArticles = articles.filter((a) => a.slug !== article.slug).slice(0, 3);

  const mentionedSoftwares = (article.relatedSoftwareSlugs || [])
    .map((s) => softwareLookup[s] || softwares.find((item) => item.slug === s || item.id === s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const [headline, subhead] = splitTitle(article.title);
  const paragraphs = article.content || [];
  // Pull quote sits after the second paragraph (or at the end of a short piece).
  const quoteAfter = Math.min(1, Math.max(paragraphs.length - 1, 0));
  const takeaways = article.keyTakeaways || [];

  const pullQuote = (
    <figure className="my-12 rounded-[28px] bg-teal-soft p-7 sm:my-14 sm:p-9">
      <span aria-hidden="true" className="display block text-[4rem] leading-[0.6] text-teal">
        &ldquo;
      </span>
      <blockquote className="mt-4">
        <p className="!max-w-none font-display !text-[clamp(1.35rem,1.1rem+1vw,1.8rem)] font-semibold !leading-[1.25] tracking-[-0.02em] !text-teal-deep">
          Treat regional compliance milestones, such as ZATCA Phase 2 or UAE corporate tax, as contract deliverables
          rather than roadmap promises.
        </p>
      </blockquote>
      <figcaption className="mt-5 text-[0.88rem] font-semibold text-teal">
        {article.author.name}, <span className="font-normal">{article.author.role}</span>
      </figcaption>
    </figure>
  );

  return (
    <>
      <article>
        {/* ============================================================ HERO */}
        <header className="wrap pt-8 pb-10 lg:pt-10 lg:pb-12">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-[0.82rem] font-semibold">
              <li>
                <Link href="/" className="inline-flex min-h-8 items-center rounded-full bg-paper-2 px-3 text-ink-2 transition-colors hover:text-teal">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-ink-3">
                /
              </li>
              <li>
                <Link href="/articles" className="inline-flex min-h-8 items-center rounded-full bg-paper-2 px-3 text-ink-2 transition-colors hover:text-teal">
                  Buyer guides
                </Link>
              </li>
              <li aria-hidden="true" className="text-ink-3">
                /
              </li>
              <li aria-current="page" className="inline-flex min-h-8 items-center rounded-full bg-teal-soft px-3 text-teal">
                {article.category}
              </li>
            </ol>
          </nav>

          <div className="mt-10 max-w-[62rem] rise lg:mt-12">
            <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.07em] text-ink-3">
              <span className="text-teal">Buyer guide</span>
              <span aria-hidden="true"> · </span>
              {article.readTime}
            </p>
            <h1 className="display mt-4 text-[clamp(2.2rem,1.3rem+3.6vw,4.4rem)]">
              {headline}
              {subhead && (
                <>
                  <span className="sr-only">: </span>
                  <span className="mt-3 block text-[0.55em] leading-[1.15] tracking-[-0.02em] text-teal">{subhead}</span>
                </>
              )}
            </h1>
            <p className="mt-6 max-w-[58ch] text-[1.2rem] leading-relaxed text-ink-2 sm:text-[1.32rem]">{article.excerpt}</p>
          </div>

          <div className="mt-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-paper-2 ring-2 ring-teal-soft ring-offset-2 ring-offset-paper">
                <Image src={article.author.avatar} alt="" fill sizes="48px" className="object-cover" />
              </span>
              <p className="text-[0.9rem] leading-tight">
                <span className="block font-semibold text-ink">By {article.author.name}</span>
                <span className="text-ink-3">
                  {article.author.role} ·{" "}
                  {article.isoDate ? (
                    <time dateTime={article.isoDate}>{article.publishedDate}</time>
                  ) : (
                    <span>{article.publishedDate}</span>
                  )}
                </span>
              </p>
            </div>
            <ShareButtons title={article.title} />
          </div>
        </header>

        {/* ============================================================ LEAD IMAGE */}
        {article.image && (
          <figure className="wrap">
            <div className="media aspect-[16/10] !rounded-[28px] sm:aspect-[21/9]">
              <Image
                src={article.image}
                alt=""
                fill
                priority
                sizes="(min-width: 1536px) 1440px, 100vw"
                className="object-cover"
              />
            </div>
          </figure>
        )}

        {/* ============================================================ BODY + RAIL */}
        <div className="wrap grid grid-cols-1 gap-12 py-12 lg:grid-cols-12 lg:gap-10 lg:py-16">
          {/* Rail: takeaways + products. Comes first on mobile so the summary is read first. */}
          <aside aria-label="Summary" className="lg:col-span-4 lg:col-start-9 lg:row-start-1">
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

              {mentionedSoftwares.length > 0 && (
                <section aria-labelledby="rail-products-title" className="hidden rounded-[28px] bg-sand-soft p-6 sm:p-8 lg:block">
                  <h2 id="rail-products-title" className="h-card text-[1.5rem]">
                    Products in this guide
                  </h2>
                  <ul className="mt-4 space-y-2">
                    {mentionedSoftwares.map((sw) => (
                      <li key={sw.id}>
                        <Link
                          href={`/reviews/${sw.slug}`}
                          className="group grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-[18px] bg-paper p-2.5 pr-3 transition-colors hover:bg-white"
                        >
                          <Monogram name={sw.name} color={sw.accentColor} size="sm" />
                          <span className="min-w-0">
                            <span className="block truncate text-[0.95rem] font-semibold text-ink transition-colors group-hover:text-teal">
                              {sw.name}
                            </span>
                            <span className="block truncate text-[0.78rem] text-ink-3">{sw.categoryName}</span>
                          </span>
                          <ScoreDial score={sw.verdict.score} size={40} color={C.teal} />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          </aside>

          <div className="min-w-0 lg:col-span-7 lg:col-start-1 lg:row-start-1">
            <div className="prose-gsr mx-auto max-w-[66ch] lg:mx-0">
              {paragraphs.map((paragraph, idx) => (
                <React.Fragment key={idx}>
                  <p className={idx === 0 ? dropCap : undefined}>{paragraph}</p>
                  {idx === quoteAfter && pullQuote}
                </React.Fragment>
              ))}
              {paragraphs.length === 0 && pullQuote}

              {article.subheadings?.map((sub, sIdx) => (
                <section key={sIdx}>
                  <h2>{sub.title}</h2>
                  {sub.paragraphs?.map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                </section>
              ))}
            </div>

            <p className="mx-auto mt-12 max-w-[66ch] rounded-[18px] bg-paper-2 px-5 py-4 text-[0.88rem] text-ink-2 lg:mx-0">
              Scores and compliance notes referenced here follow our published{" "}
              <Link href="/about#methodology" className="link font-semibold">
                review method
              </Link>
              . Spotted something out of date?{" "}
              <Link href="/contact" className="link font-semibold">
                Tell the editors
              </Link>
              .
            </p>
          </div>
        </div>
      </article>

      {/* ============================================================ PRODUCTS — sand band */}
      {mentionedSoftwares.length > 0 && (
        <>
          <Sadu from={C.paper} to={C.sand} accent={C.teal} />
          <section aria-labelledby="mentioned-title" className="bg-sand">
            <div className="wrap py-14 lg:py-20">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <span className="tag bg-paper text-teal">Products in this guide</span>
                  <h2 id="mentioned-title" className="h-section mt-4 max-w-[22ch]">
                    Read the full reviews before you shortlist.
                  </h2>
                </div>
                <Link href="/reviews" className="arrow-link">
                  All reviews
                </Link>
              </div>
              <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                {mentionedSoftwares.map((sw) => (
                  <SoftwareCard key={sw.id} software={sw} />
                ))}
              </div>
            </div>
          </section>
          <Sadu from={C.sand} to={relatedArticles.length > 0 ? C.teal : C.paper} accent={C.terracotta} />
        </>
      )}

      {/* ============================================================ MORE GUIDES — teal band */}
      {relatedArticles.length > 0 && (
        <>
          {mentionedSoftwares.length === 0 && <Sadu from={C.paper} to={C.teal} accent={C.sand} />}
          <section aria-labelledby="more-guides-title" className="bg-teal text-teal-soft">
            <div className="wrap py-14 lg:py-20">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <h2 id="more-guides-title" className="h-section text-paper">
                  More buyer guides
                </h2>
                <Link href="/articles" className="arrow-link text-paper hover:!text-sand">
                  All guides
                </Link>
              </div>

              <ul className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
                {relatedArticles.map((rel) => (
                  <li key={rel.id}>
                    <article className="group h-full">
                      <Link
                        href={`/articles/${rel.slug}`}
                        className="grid h-full grid-cols-[1fr_104px] items-start gap-5 rounded-[24px] bg-teal-deep p-4 transition-transform duration-300 hover:-translate-y-1 sm:grid-cols-[1fr_150px] sm:p-5"
                      >
                        <span className="min-w-0">
                          <span className="block font-mono text-[0.68rem] font-semibold uppercase tracking-[0.07em] text-sand">
                            {rel.category}
                          </span>
                          <span className="mt-2 block font-display text-[1.2rem] font-bold leading-snug tracking-[-0.02em] text-paper sm:text-[1.35rem]">
                            {rel.title}
                          </span>
                          <span className="mt-3 block text-[0.82rem] text-teal-soft/75">
                            {rel.author.name} · {rel.readTime}
                          </span>
                        </span>
                        <span className="media aspect-square !bg-teal">
                          <Image src={rel.image} alt="" fill sizes="150px" className="object-cover" />
                        </span>
                      </Link>
                    </article>
                  </li>
                ))}
              </ul>
            </div>
          </section>
          <Sadu from={C.teal} to={C.paper} accent={C.sand} />
        </>
      )}
    </>
  );
}
