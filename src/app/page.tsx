import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { softwares } from "@/data/software";
import { comparisons } from "@/data/comparisons";
import { articles } from "@/data/articles";
import type { NewsArticle } from "@/types";
import NewsletterSection from "@/components/NewsletterSection";
import Monogram from "@/components/Monogram";
import Sadu from "@/components/Sadu";
import { getNewsFeed } from "@/lib/news-store";
import {
  newsSections,
  newsCountries,
  newsHref,
  sectionLabel,
  countryLabel,
  shortDate,
} from "@/lib/news";

export const metadata: Metadata = {
  title: "Gulf SaaS Review — Business software and tech news from the Gulf",
  description:
    "Independent reviews and side-by-side comparisons of accounting, CRM, HR and ERP software for Saudi Arabia, the UAE and the wider GCC. Every product is checked for ZATCA, UAE FTA, WPS and Arabic support.",
  alternates: {
    canonical: "/",
  },
};

/* Section colour coding — each news section owns a band colour. */
const sectionTone: Record<string, { bar: string; text: string; dot: string }> = {
  "ai-innovation": { bar: "bg-terracotta text-white", text: "text-terracotta", dot: "bg-terracotta" },
  "saas-cloud": { bar: "bg-teal text-paper", text: "text-teal", dot: "bg-teal" },
  fintech: { bar: "bg-sand text-ink", text: "text-[#8A5A12]", dot: "bg-sand" },
  "digital-transformation": { bar: "bg-teal-deep text-paper", text: "text-teal", dot: "bg-teal-deep" },
  "vision-strategy": { bar: "bg-terracotta-deep text-white", text: "text-terracotta-deep", dot: "bg-terracotta-deep" },
  cybersecurity: { bar: "bg-ink text-paper", text: "text-ink", dot: "bg-ink" },
};

function Kicker({ story }: { story: NewsArticle }) {
  const tone = sectionTone[story.categorySlug];
  return (
    <p className="font-mono text-[0.66rem] font-semibold uppercase tracking-[0.07em] text-ink-3">
      <span className={tone?.text ?? "text-terracotta"}>{sectionLabel(story.categorySlug)}</span>
      <span aria-hidden="true"> · </span>
      {countryLabel(story.countryCode)}
    </p>
  );
}

function Meta({ story }: { story: NewsArticle }) {
  return (
    <p className="mt-2 text-[0.76rem] text-ink-3">
      <time dateTime={story.isoDate}>{shortDate(story)}</time> · {story.readTime}
    </p>
  );
}

function ModuleTitle({ id, children, href, link }: { id: string; children: React.ReactNode; href?: string; link?: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <h2 id={id} className="flex items-center gap-2.5 font-display text-[1.35rem] font-bold tracking-[-0.025em]">
        <span aria-hidden="true" className="h-3 w-3 rotate-45 rounded-[2px] bg-terracotta" />
        {children}
      </h2>
      {href && (
        <Link href={href} className="arrow-link text-[0.82rem] text-ink-2">
          {link}
        </Link>
      )}
    </div>
  );
}

export default async function FrontPage() {
  const { latestNews, leadStory, mostRead } = await getNewsFeed();
  if (!leadStory) {
    return (
      <section className="wrap py-24 text-center">
        <h1 className="display text-[2.4rem]">No stories published yet.</h1>
        <p className="mt-3 text-ink-2">Publish a story from the admin to fill the front page.</p>
      </section>
    );
  }
  const rest = latestNews.filter((s) => s.id !== leadStory.id);
  const leftCol = rest.slice(0, 3);
  const moreTop = rest.slice(3, 7);
  const wire = latestNews.slice(0, 7);
  const briefing = latestNews.slice(0, 6);

  const sectionBlocks = newsSections
    .map((sec) => ({ ...sec, stories: latestNews.filter((s) => s.categorySlug === sec.slug) }))
    .filter((b) => b.stories.length > 0);

  const scoreboard = [...softwares].sort((a, b) => b.verdict.score - a.verdict.score).slice(0, 6);
  const bySlug = (slug: string) => softwares.find((s) => s.slug === slug);
  const countryLead = newsCountries.map((c) => ({ ...c, story: latestNews.find((s) => s.countryCode === c.code) }));

  return (
    <>
      <h1 className="sr-only">Gulf SaaS Review — business software and technology news from the Gulf</h1>

      {/* ================================================== BREAKING TICKER */}
      <div className="border-b-[1.5px] border-rule bg-sand-soft">
        <div className="wrap flex h-11 items-center gap-4 overflow-hidden">
          <span className="flex shrink-0 items-center gap-2 font-mono text-[0.68rem] font-bold uppercase tracking-[0.08em] text-terracotta">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-terracotta opacity-60" />
              <span className="relative h-2 w-2 rounded-full bg-terracotta" />
            </span>
            Briefing
          </span>
          <div className="relative min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_3%,black_95%,transparent)]">
            <ul className="animate-ticker flex w-max items-center gap-8 whitespace-nowrap text-[0.88rem] text-ink">
              {[...briefing, ...briefing].map((story, i) => (
                <li key={i} aria-hidden={i >= briefing.length} className="flex items-center gap-8">
                  <Link href={newsHref(story)} tabIndex={i >= briefing.length ? -1 : undefined} className="hover:text-terracotta hover:underline">
                    {story.title}
                  </Link>
                  <span aria-hidden="true" className="text-[0.6rem] text-terracotta">◆</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ================================================== ABOVE THE FOLD */}
      <section aria-label="Top stories" className="wrap pt-7 pb-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-7">
          {/* Lead */}
          <article className="group lg:order-2 lg:col-span-6">
            <Link href={newsHref(leadStory)} className="block">
              <figure>
                <div className="media aspect-[16/10] !rounded-[20px]">
                  <Image
                    src={leadStory.featuredImage}
                    alt={leadStory.imageCaption ?? leadStory.title}
                    fill
                    priority
                    sizes="(min-width: 1024px) 660px, 100vw"
                    className="object-cover"
                  />
                  <span className="absolute left-3 top-3 z-10 rounded-full bg-terracotta px-3 py-1 font-mono text-[0.64rem] font-bold uppercase tracking-[0.08em] text-white">
                    Lead story
                  </span>
                </div>
                {leadStory.imageCaption && (
                  <figcaption className="mt-2 text-[0.72rem] text-ink-3">{leadStory.imageCaption}</figcaption>
                )}
              </figure>
              <div className="mt-4">
                <Kicker story={leadStory} />
                <h2 className="display mt-2 text-[clamp(1.9rem,1.3rem+1.9vw,2.9rem)] transition-colors group-hover:text-terracotta">
                  {leadStory.title}
                </h2>
                {leadStory.subtitle && (
                  <p className="mt-3 text-[1.02rem] leading-relaxed text-ink-2">{leadStory.subtitle}</p>
                )}
                <p className="mt-3 flex flex-wrap items-center gap-2 text-[0.8rem] text-ink-3">
                  <span className="relative h-6 w-6 overflow-hidden rounded-full bg-paper-2">
                    <Image src={leadStory.author.avatar} alt={leadStory.author.name} fill sizes="24px" className="object-cover" />
                  </span>
                  <span className="font-semibold text-ink-2">{leadStory.author.name}</span>
                  <span aria-hidden="true">·</span>
                  <time dateTime={leadStory.isoDate}>{shortDate(leadStory)}</time>
                  <span aria-hidden="true">·</span>
                  {leadStory.readTime}
                </p>
              </div>
            </Link>
          </article>

          {/* Left column */}
          <div className="lg:order-1 lg:col-span-3">
            <ul className="divide-y-[1.5px] divide-dashed divide-rule">
              {leftCol.map((story, i) => (
                <li key={story.id} className="py-4 first:pt-0">
                  <article className="group">
                    <Link href={newsHref(story)} className="block">
                      {i === 0 && (
                        <div className="media mb-3 aspect-[16/10] !rounded-[14px]">
                          <Image src={story.featuredImage} alt={story.imageCaption || story.title} fill loading="lazy" sizes="(min-width: 1024px) 300px, 100vw" className="object-cover" />
                        </div>
                      )}
                      <Kicker story={story} />
                      <h3 className="h-card mt-1.5 text-[1.12rem] transition-colors group-hover:text-terracotta">{story.title}</h3>
                      {i === 0 && <p className="mt-1.5 text-[0.86rem] leading-relaxed text-ink-2 line-clamp-2">{story.excerpt}</p>}
                      <Meta story={story} />
                    </Link>
                  </article>
                </li>
              ))}
            </ul>
          </div>

          {/* Right column — the wire */}
          <aside aria-labelledby="wire-title" className="hidden lg:order-3 lg:col-span-3 lg:block">
            <div className="rounded-[22px] bg-teal p-5 text-paper">
              <h2 id="wire-title" className="flex items-center justify-between font-display text-[1.2rem] font-bold tracking-[-0.02em]">
                Latest
                <span className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-sand">Newest first</span>
              </h2>
              <ol className="mt-3">
                {wire.map((story) => (
                  <li key={story.id} className="border-t border-white/12">
                    <Link href={newsHref(story)} className="group grid grid-cols-[3rem_1fr] gap-2 py-3">
                      <time dateTime={story.isoDate} className="num pt-0.5 text-[0.7rem] text-sand">
                        {shortDate(story)}
                      </time>
                      <span className="text-[0.88rem] font-medium leading-snug text-paper/90 transition-colors group-hover:text-sand">
                        {story.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
              <Link href="/news" className="mt-1 inline-flex text-[0.82rem] font-semibold text-sand hover:underline">
                All news →
              </Link>
            </div>
          </aside>
        </div>

        {/* More top stories */}
        <div className="mt-10 grid grid-cols-1 gap-6 border-t-[1.5px] border-dashed border-rule pt-8 sm:grid-cols-2 lg:grid-cols-4">
          {moreTop.map((story) => (
            <article key={story.id} className="group">
              <Link href={newsHref(story)} className="grid grid-cols-[1fr_96px] gap-4 sm:block">
                <div className="media aspect-square !rounded-[14px] max-sm:order-2 sm:aspect-[16/10]">
                  <Image
                    src={story.featuredImage}
                    alt={story.imageCaption || story.title}
                    fill
                    loading="lazy"
                    sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 96px"
                    className="object-cover"
                  />
                </div>
                <div className="sm:mt-3">
                  <Kicker story={story} />
                  <h3 className="h-card mt-1.5 text-[1.05rem] transition-colors group-hover:text-terracotta">{story.title}</h3>
                  <Meta story={story} />
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* ================================================== SECTIONS + SIDEBAR */}
      <section aria-label="News by section" className="border-t-[1.5px] border-rule bg-paper-2">
        <div className="wrap grid grid-cols-1 gap-8 py-12 lg:grid-cols-12">
          <div className="grid grid-cols-1 content-start gap-5 sm:grid-cols-2 lg:col-span-8">
            {sectionBlocks.map((block) => {
              const tone = sectionTone[block.slug];
              const [first, ...others] = block.stories;
              return (
                <section key={block.slug} aria-labelledby={`sec-${block.slug}`} className="overflow-hidden rounded-[22px] bg-surface">
                  <div className={`flex items-center justify-between px-5 py-3 ${tone.bar}`}>
                    <h2 id={`sec-${block.slug}`} className="font-display text-[1.15rem] font-bold tracking-[-0.02em]">
                      {block.label}
                    </h2>
                    <Link href={`/news?section=${block.slug}`} className="text-[0.78rem] font-semibold opacity-85 hover:underline hover:opacity-100">
                      More →
                    </Link>
                  </div>
                  <div className="p-5">
                    <article className="group">
                      <Link href={newsHref(first)} className="grid grid-cols-[1fr_92px] gap-4">
                        <div>
                          <p className="font-mono text-[0.64rem] font-semibold uppercase tracking-[0.07em] text-ink-3">
                            {countryLabel(first.countryCode)}
                          </p>
                          <h3 className="h-card mt-1 text-[1.08rem] transition-colors group-hover:text-terracotta">{first.title}</h3>
                          <Meta story={first} />
                        </div>
                        <div className="media aspect-square !rounded-[12px]">
                          <Image src={first.featuredImage} alt={first.imageCaption || first.title} fill loading="lazy" sizes="92px" className="object-cover" />
                        </div>
                      </Link>
                    </article>
                    {others.length > 0 && (
                      <ul className="mt-3 divide-y-[1.5px] divide-dashed divide-rule border-t-[1.5px] border-dashed border-rule">
                        {others.map((s) => (
                          <li key={s.id}>
                            <Link href={newsHref(s)} className="group flex gap-3 py-3">
                              <span aria-hidden="true" className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${tone.dot}`} />
                              <span className="text-[0.92rem] font-semibold leading-snug transition-colors group-hover:text-terracotta">
                                {s.title}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </section>
              );
            })}
          </div>

          {/* Sidebar */}
          <aside aria-label="Sidebar" className="space-y-5 lg:col-span-4">
            <section aria-labelledby="mostread-title" className="rounded-[22px] bg-sand-soft p-5">
              <ModuleTitle id="mostread-title">Most read</ModuleTitle>
              <ol className="mt-2">
                {mostRead.map((story, i) => (
                  <li key={story.id} className="border-t-[1.5px] border-dashed border-sand first:border-t-0">
                    <Link href={newsHref(story)} className="group grid grid-cols-[2rem_1fr] gap-2 py-3">
                      <span className="font-display text-[1.8rem] font-bold leading-[0.9] text-terracotta">{i + 1}</span>
                      <span className="text-[0.9rem] font-semibold leading-snug transition-colors group-hover:text-terracotta">{story.title}</span>
                    </Link>
                  </li>
                ))}
              </ol>
            </section>

            <section aria-labelledby="scores-title" className="rounded-[22px] bg-surface p-5">
              <ModuleTitle id="scores-title" href="/reviews" link="All reviews">
                Review scores
              </ModuleTitle>
              <ol className="mt-3">
                {scoreboard.map((sw, i) => (
                  <li key={sw.id} className="border-t-[1.5px] border-dashed border-rule first:border-t-0">
                    <Link href={`/reviews/${sw.slug}`} className="group flex items-center gap-3 py-2.5">
                      <span className="num w-4 text-[0.72rem] text-ink-3">{i + 1}</span>
                      <Monogram name={sw.name} color={sw.accentColor} size="sm" />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[0.92rem] font-semibold transition-colors group-hover:text-terracotta">{sw.name}</span>
                        <span className="block truncate text-[0.74rem] text-ink-3">{sw.categoryName}</span>
                      </span>
                      <span className="num rounded-full bg-teal px-2.5 py-1 text-[0.78rem] font-semibold text-paper">
                        {sw.verdict.score.toFixed(1)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
            </section>

            <section aria-labelledby="vs-title" className="rounded-[22px] bg-terracotta p-5 text-white">
              <h2 id="vs-title" className="font-display text-[1.35rem] font-bold tracking-[-0.025em]">
                Head to head
              </h2>
              <ul className="mt-2">
                {comparisons.map((comp) => {
                  const a = bySlug(comp.productAId);
                  const b = bySlug(comp.productBId);
                  return (
                    <li key={comp.id} className="border-t border-white/20 first:border-t-0">
                      <Link href={`/compare/${comp.slug}`} className="group flex items-center justify-between gap-3 py-3">
                        <span className="text-[0.95rem] font-semibold leading-snug group-hover:underline">
                          {a?.name ?? comp.title.split(" vs ")[0]} <span className="text-sand">vs</span>{" "}
                          {b?.name ?? comp.title.split(" vs ")[1]}
                        </span>
                        <span aria-hidden="true" className="text-sand transition-transform group-hover:translate-x-1">
                          →
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>

            {/* GCC Compliance Quick-Check */}
            <section aria-labelledby="compliance-title" className="rounded-[22px] border-[1.5px] border-rule bg-surface p-5 shadow-2xs lg:sticky lg:top-16">
              <ModuleTitle id="compliance-title" href="/reviews" link="All reviews">
                Compliance check
              </ModuleTitle>
              <p className="mt-1.5 text-[0.84rem] leading-snug text-ink-3">
                Four rules your software must handle to run legally in the Gulf.
              </p>

              <ul className="mt-3 divide-y-[1.5px] divide-dashed divide-rule border-t-[1.5px] border-dashed border-rule">
                <li className="py-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="kicker kicker-accent">Saudi Arabia</span>
                    <span className="num rounded-full border border-emerald-200/80 bg-emerald-50 px-2 py-0.5 text-[0.68rem] font-semibold text-emerald-800">
                      Mandatory
                    </span>
                  </div>
                  <h3 className="h-card mt-1 text-[0.98rem] text-ink">
                    ZATCA Phase 2 e-invoicing
                  </h3>
                  <p className="mt-1 text-[0.82rem] leading-relaxed text-ink-2">
                    Links to the Fatoora portal with live QR stamps on invoices.
                  </p>
                  <p className="mt-1.5 text-[0.74rem] text-ink-3">
                    <span className="font-semibold text-ink-2">Tested:</span> Zoho Books, Odoo ERP
                  </p>
                </li>

                <li className="py-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="kicker text-teal">United Arab Emirates</span>
                    <span className="num rounded-full border border-teal/20 bg-teal-soft/70 px-2 py-0.5 text-[0.68rem] font-semibold text-teal">
                      Audit ready
                    </span>
                  </div>
                  <h3 className="h-card mt-1 text-[0.98rem] text-ink">
                    UAE Corporate Tax &amp; VAT
                  </h3>
                  <p className="mt-1 text-[0.82rem] leading-relaxed text-ink-2">
                    Exports the official FTA audit file (FAF) and 5% VAT returns.
                  </p>
                  <p className="mt-1.5 text-[0.74rem] text-ink-3">
                    <span className="font-semibold text-ink-2">Tested:</span> QuickBooks, Zoho, Xero
                  </p>
                </li>

                <li className="py-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="kicker text-[#8A5A12]">Saudi Arabia &amp; UAE</span>
                    <span className="num rounded-full border border-sand bg-sand-soft px-2 py-0.5 text-[0.68rem] font-semibold text-[#8A5A12]">
                      Payroll SIF
                    </span>
                  </div>
                  <h3 className="h-card mt-1 text-[0.98rem] text-ink">
                    WPS salary transfers
                  </h3>
                  <p className="mt-1 text-[0.82rem] leading-relaxed text-ink-2">
                    Generates bank-ready salary files so staff get paid without fines.
                  </p>
                  <p className="mt-1.5 text-[0.74rem] text-ink-3">
                    <span className="font-semibold text-ink-2">Tested:</span> Bayzat, ZenHR
                  </p>
                </li>

                <li className="py-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="kicker text-ink-3">Regional standard</span>
                    <span className="num rounded-full border border-blue-200/80 bg-blue-50 px-2 py-0.5 text-[0.68rem] font-semibold text-blue-700">
                      Data hosting
                    </span>
                  </div>
                  <h3 className="h-card mt-1 text-[0.98rem] text-ink">
                    Saudi PDPL &amp; cloud residency
                  </h3>
                  <p className="mt-1 text-[0.82rem] leading-relaxed text-ink-2">
                    Stores company records inside local GCC data centers.
                  </p>
                  <p className="mt-1.5 text-[0.74rem] text-ink-3">
                    <span className="font-semibold text-ink-2">Tested:</span> Salesforce, Zoho ME, Odoo
                  </p>
                </li>
              </ul>

              <Link
                href="/reviews"
                className="btn btn-primary mt-4 w-full justify-center text-[0.88rem]"
              >
                See all reviewed software →
              </Link>
            </section>
          </aside>
        </div>
      </section>

      {/* ================================================== ACROSS THE GULF */}
      <Sadu from="#F7F0E4" to="#0E4B48" accent="#C24E2A" />
      <section aria-labelledby="gulf-title" className="bg-teal text-teal-soft">
        <div className="wrap py-10">
          <div className="flex items-end justify-between gap-4">
            <h2 id="gulf-title" className="font-display text-[1.6rem] font-bold tracking-[-0.025em] text-paper">
              Across the Gulf
            </h2>
            <Link href="/news" className="text-[0.85rem] font-semibold text-sand hover:underline">
              All countries →
            </Link>
          </div>
          <ul className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
            {countryLead.map((c) => (
              <li key={c.code}>
                <Link
                  href={`/news?country=${c.code}`}
                  className="group flex h-full flex-col rounded-[18px] bg-teal-deep p-4 transition-colors hover:bg-[#0b2f2d]"
                >
                  <span lang="ar" dir="rtl" className="font-arabic text-[1.25rem] leading-tight text-sand">
                    {c.native}
                  </span>
                  <span className="mt-1 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-teal-soft/75">{c.name}</span>
                  {c.story && (
                    <span className="mt-3 text-[0.86rem] font-semibold leading-snug text-paper group-hover:underline">{c.story.title}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Sadu from="#0E4B48" to="#FFFCF6" accent="#F1D39C" />

      {/* ================================================== BUYER GUIDES */}
      <section aria-labelledby="guides-title" className="wrap pt-8">
        <ModuleTitle id="guides-title" href="/articles" link="All guides">
          Buyer guides
        </ModuleTitle>
        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
          {articles.map((art) => (
            <article key={art.id} className="group">
              <Link href={`/articles/${art.slug}`} className="card card-hover flex h-full gap-4 p-3">
                <div className="media aspect-square w-24 shrink-0 !rounded-[14px]">
                  <Image src={art.image} alt={art.title} fill loading="lazy" sizes="96px" className="object-cover" />
                </div>
                <div className="min-w-0 py-1 pr-1">
                  <span className="kicker kicker-accent">{art.category}</span>
                  <h3 className="h-card mt-1 text-[1rem] line-clamp-3">{art.title}</h3>
                  <p className="mt-1.5 text-[0.74rem] text-ink-3">{art.readTime}</p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <NewsletterSection />
    </>
  );
}
