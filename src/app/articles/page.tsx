import React from "react";
import Link from "next/link";
import Image from "next/image";
import { articles } from "@/data/articles";
import { softwares } from "@/data/software";
import { comparisons } from "@/data/comparisons";
import Sadu from "@/components/Sadu";
import { pad2 } from "@/lib/format";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Buyer Guides for Gulf Business Software",
  description:
    "Long-form buyer guides on ZATCA Phase 2, UAE VAT and corporate tax, WPS payroll and software selection for businesses in Saudi Arabia, the UAE and the GCC.",
  alternates: {
    canonical: "/articles",
  },
  openGraph: {
    title: "Buyer Guides for Gulf Business Software — Gulf SaaS Review",
    description:
      "Long-form buyer guides on ZATCA Phase 2, UAE VAT and corporate tax, WPS payroll and software selection for businesses in Saudi Arabia, the UAE and the GCC.",
    url: "/articles",
    images: [
      {
        url: "/articles/saudi-zatca-accounting-guide.jpg",
        alt: "Gulf SaaS Review Buyer Guides",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Buyer Guides for Gulf Business Software",
    description:
      "Long-form buyer guides on ZATCA Phase 2, UAE VAT and corporate tax, WPS payroll and software selection for businesses in Saudi Arabia, the UAE and the GCC.",
  },
};

const C = {
  paper: "#FFFCF6",
  terracotta: "#C24E2A",
  teal: "#0E4B48",
  sand: "#F1D39C",
};

function ArticleDate({ date, iso }: { date: string; iso?: string }) {
  return iso ? <time dateTime={iso}>{date}</time> : <span>{date}</span>;
}

export default function ArticlesPage() {
  const [lead, ...rest] = articles;
  const topics = Array.from(new Set(articles.map((a) => a.category)));
  const byDate = [...articles].sort(
    (a, b) => Date.parse(b.isoDate || b.publishedDate) - Date.parse(a.isoDate || a.publishedDate)
  );

  return (
    <>
      {/* ============================================================ HEADER — sand band */}
      <header className="bg-sand">
        <div className="wrap grid grid-cols-1 gap-10 pt-12 pb-12 lg:grid-cols-12 lg:items-end lg:pt-16 lg:pb-16">
          <div className="lg:col-span-8 rise">
            <span className="tag bg-paper text-terracotta-deep">Buyer guides</span>
            <h1 className="display mt-5 text-[clamp(2.6rem,1.4rem+4.4vw,5rem)]">Longer reads for bigger purchases.</h1>
            <p className="mt-6 max-w-[56ch] text-[1.125rem] leading-relaxed text-ink-2">
              Guides on the rules that shape software buying in the Gulf — ZATCA Phase 2, UAE VAT and corporate tax, WPS
              payroll — and how to choose a product that meets them.
            </p>
          </div>
          <dl className="grid grid-cols-2 gap-3 lg:col-span-4">
            {[
              { k: "Guides published", v: String(articles.length) },
              { k: "Products reviewed", v: String(softwares.length) },
            ].map((f) => (
              <div key={f.k} className="flex flex-col-reverse justify-end rounded-[22px] bg-paper p-5">
                <dt className="mt-2 text-[0.85rem] text-ink-3">{f.k}</dt>
                <dd className="display text-[2.6rem] leading-none text-terracotta">{f.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>
      <Sadu from={C.sand} to={C.paper} accent={C.terracotta} />

      {/* ============================================================ LEAD + OTHERS */}
      <section aria-labelledby="latest-title" className="wrap py-14 lg:py-20">
        <h2 id="latest-title" className="sr-only">
          Latest guides
        </h2>

        {lead && (
          <article className="group grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <Link href={`/articles/${lead.slug}`} tabIndex={-1} aria-hidden="true" className="block">
                <div className="relative">
                  <div className="media relative aspect-[4/5] !rounded-[28px] max-sm:aspect-[4/3.4]">
                    <Image src={lead.image} alt={lead.title} fill priority sizes="(min-width: 1024px) 480px, 100vw" className="object-cover" />
                  </div>
                </div>
              </Link>
            </div>
            <div className="lg:col-span-7">
              <Link href={`/articles/${lead.slug}`} className="block">
                <span className="tag tag-teal">Latest guide</span>
                <p className="kicker kicker-accent mt-5">
                  {lead.category} <span aria-hidden="true">·</span> <span className="text-ink-3">{lead.readTime}</span>
                </p>
                <h3 className="display mt-3 text-[clamp(2rem,1.3rem+2.4vw,3.4rem)] transition-colors group-hover:text-terracotta">
                  {lead.title}
                </h3>
                <p className="mt-5 max-w-[58ch] text-[1.1rem] leading-relaxed text-ink-2">{lead.excerpt}</p>
              </Link>
              <div className="mt-7 flex flex-wrap items-center gap-5">
                <div className="flex items-center gap-3">
                  <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-paper-2">
                    <Image src={lead.author.avatar} alt={lead.author.name} fill sizes="44px" className="object-cover" />
                  </span>
                  <p className="text-[0.88rem] leading-tight">
                    <span className="block font-semibold text-ink">{lead.author.name}</span>
                    <span className="text-ink-3">
                      <ArticleDate date={lead.publishedDate} iso={lead.isoDate} />
                    </span>
                  </p>
                </div>
                <Link href={`/articles/${lead.slug}`} className="btn btn-primary">
                  Read the guide →
                </Link>
              </div>
            </div>
          </article>
        )}

        {rest.length > 0 && (
          <ul className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
            {rest.map((art) => (
              <li key={art.id}>
                <article className="group h-full">
                  <Link
                    href={`/articles/${art.slug}`}
                    className="card card-hover grid h-full grid-cols-1 gap-5 p-3 sm:grid-cols-[200px_1fr]"
                  >
                    <div className="media aspect-[4/3] sm:aspect-auto sm:min-h-[220px]">
                      <Image src={art.image} alt={art.title} fill loading="lazy" sizes="(min-width: 640px) 200px, 100vw" className="object-cover" />
                    </div>
                    <div className="flex min-w-0 flex-col p-3 sm:pl-0">
                      <span className="kicker kicker-accent">{art.category}</span>
                      <h3 className="h-card mt-2 text-[1.35rem] transition-colors group-hover:text-terracotta">{art.title}</h3>
                      <p className="mt-3 line-clamp-3 text-[0.92rem] text-ink-2">{art.excerpt}</p>
                      <p className="mt-auto pt-4 text-[0.82rem] text-ink-3">
                        {art.author.name} · {art.readTime}
                      </p>
                    </div>
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* ============================================================ FULL INDEX */}
      <section aria-labelledby="all-guides-title" className="wrap pb-10 lg:pb-12">
        <div className="grid grid-cols-1 gap-8 rounded-[28px] bg-paper-2 p-6 sm:p-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="all-guides-title" className="h-section">
              Every guide, newest first.
            </h2>
            <p className="mt-4 max-w-[38ch] text-ink-2">
              Covering {topics.length} topics: {topics.join(", ")}.
            </p>
          </div>
          <ol className="lg:col-span-8">
            {byDate.map((art, i) => (
              <li key={art.id} className="border-t-[1.5px] border-dashed border-rule first:border-t-0">
                <Link
                  href={`/articles/${art.slug}`}
                  className="group grid grid-cols-[2.6rem_1fr] gap-x-4 py-5 sm:grid-cols-[3rem_1fr_auto]"
                >
                  <span className="display text-[2rem] leading-[0.9] text-terracotta" aria-hidden="true">
                    {pad2(i + 1)}
                  </span>
                  <span className="min-w-0">
                    <span className="h-card block text-[1.2rem] transition-colors group-hover:text-terracotta sm:text-[1.3rem]">
                      {art.title}
                    </span>
                    <span className="mt-1.5 block text-[0.84rem] text-ink-3">
                      {art.category} · {art.author.name}
                    </span>
                  </span>
                  <span className="num col-start-2 mt-2 text-[0.76rem] text-ink-3 sm:col-start-3 sm:mt-0 sm:pt-1 sm:text-right">
                    <ArticleDate date={art.publishedDate} iso={art.isoDate} />
                    <span className="sm:hidden"> · </span>
                    <span className="sm:block">{art.readTime}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ============================================================ ONWARD — teal panel */}
      <section aria-labelledby="onward-title" className="wrap pb-16 lg:pb-24">
        <div className="grid grid-cols-1 gap-8 rounded-[28px] bg-teal p-8 text-teal-soft sm:p-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="font-mono text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-sand">
              Already have a shortlist?
            </p>
            <h2 id="onward-title" className="h-section mt-3 max-w-[22ch] text-paper">
              Go straight to the reviews and comparisons.
            </h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
            <Link href="/reviews" className="btn btn-sand">
              Browse {softwares.length} reviews
            </Link>
            <Link href="/compare" className="btn btn-outline text-paper">
              See {comparisons.length} comparisons
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
