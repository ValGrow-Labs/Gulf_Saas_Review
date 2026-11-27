import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { comparisons, comparisonLookup } from "@/data/comparisons";
import { softwareLookup } from "@/data/software";
import ComparisonMatrix from "@/components/ComparisonMatrix";
import Monogram from "@/components/Monogram";
import ScoreDial from "@/components/ScoreDial";
import Sadu from "@/components/Sadu";
import { arabicLabel, billingSuffix, marketsLabel } from "@/lib/format";

export const dynamicParams = false;

const C = { paper: "#FFFCF6", terracotta: "#C24E2A", teal: "#0E4B48", sand: "#F1D39C" };

export async function generateStaticParams() {
  return comparisons.map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const comp = comparisonLookup[slug];
  if (!comp) return { title: "Software Comparison Not Found" };

  const title = `${comp.title}: Which is Better for Middle East Businesses?`;
  const description = comp.shortDescription;
  const canonicalUrl = `/compare/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      images: [
        {
          url: "/articles/uae-einvoicing-digital.jpg",
          alt: comp.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ComparisonDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const comparison = comparisonLookup[slug];

  if (!comparison) {
    notFound();
  }

  const productA = softwareLookup[comparison.productAId];
  const productB = softwareLookup[comparison.productBId];

  if (!productA || !productB) {
    notFound();
  }

  const pair = [productA, productB];
  const others = comparisons.filter((c) => c.slug !== comparison.slug).slice(0, 3);
  const halves = [
    { cls: "bg-teal text-teal-soft", accent: "text-sand", dial: "#0E4B48", lead: "bg-sand text-ink" },
    { cls: "bg-terracotta text-white", accent: "text-sand", dial: "#C24E2A", lead: "bg-sand text-ink" },
  ] as const;

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
        name: "Compare",
        item: "https://gulfsaasreview.com/compare",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: comparison.title,
        item: `https://gulfsaasreview.com/compare/${comparison.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* ------------------------------------------------ Title */}
      <section aria-labelledby="vs-h1" className="wrap pt-10 lg:pt-14">
        <nav aria-label="Breadcrumb" className="num text-[0.75rem] text-ink-3">
          <Link href="/compare" className="link text-ink-3">
            Compare
          </Link>
          <span aria-hidden="true" className="mx-2">/</span>
          <span aria-current="page">{comparison.title}</span>
        </nav>

        <div className="rise mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <span className="tag tag-accent">Head to head · {comparison.categories.join(" · ")}</span>
            <h1 id="vs-h1" className="display mt-5 text-[clamp(2.5rem,1.4rem+4.2vw,4.8rem)]">
              {productA.name} <span className="text-terracotta">vs</span> {productB.name}
            </h1>
          </div>
          <p className="max-w-[46ch] text-[1.05rem] leading-relaxed text-ink-2 lg:col-span-4">
            {comparison.shortDescription}
          </p>
        </div>

        {/* Split scoreline */}
        <div className="rise relative mt-10 grid grid-cols-1 overflow-hidden rounded-[32px] [animation-delay:120ms] md:grid-cols-2">
          {pair.map((p, idx) => {
            const other = idx === 0 ? productB : productA;
            const ahead = p.verdict.score > other.verdict.score;
            const h = halves[idx];
            return (
              <div
                key={p.id}
                className={`flex flex-col gap-6 p-7 sm:p-10 ${h.cls} ${idx === 0 ? "max-md:pb-14 md:pr-16" : "max-md:pt-14 md:pl-16"}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <Monogram name={p.name} color={p.accentColor} size="lg" />
                  {ahead && (
                    <span className={`rounded-full px-3 py-1 font-mono text-[0.66rem] font-semibold uppercase tracking-[0.08em] ${h.lead}`}>
                      Higher score
                    </span>
                  )}
                </div>
                <div className="flex items-end justify-between gap-5">
                  <div className="min-w-0">
                    <h2 className="display text-[clamp(1.9rem,1.4rem+1.6vw,2.8rem)] text-white">{p.name}</h2>
                    <p className={`mt-1 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.08em] ${h.accent}`}>
                      {p.verdict.badge}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-paper p-1.5">
                    <ScoreDial score={p.verdict.score} size={92} color={h.dial} showMax />
                  </span>
                </div>
                <dl className="grid grid-cols-3 gap-2 text-[0.82rem]">
                  {[
                    { k: "From", v: `${p.pricing.startingPrice}${billingSuffix(p)}` },
                    { k: "Markets", v: marketsLabel(p) },
                    { k: "Arabic", v: arabicLabel(p.arabicSupport) },
                  ].map((f) => (
                    <div key={f.k} className="rounded-[16px] bg-black/15 px-3 py-2.5">
                      <dt className="opacity-75">{f.k}</dt>
                      <dd className="num mt-0.5 font-semibold text-white">{f.v}</dd>
                    </div>
                  ))}
                </dl>
                <Link href={`/reviews/${p.slug}`} className="arrow-link mt-auto text-white hover:!text-sand">
                  Read the {p.name} review
                </Link>
              </div>
            );
          })}
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-sand font-display text-[1.7rem] font-extrabold tracking-[-0.03em] text-ink ring-[6px] ring-paper"
          >
            vs
          </span>
        </div>
      </section>

      {/* ------------------------------------------------ Verdict + Gulf angle */}
      <section aria-labelledby="verdict-title" className="wrap grid grid-cols-1 gap-4 py-12 lg:grid-cols-12 lg:py-16">
        <div className="rounded-[28px] bg-sand-soft p-7 sm:p-10 lg:col-span-7">
          <span className="tag bg-paper text-terracotta-deep">Our verdict</span>
          <h2 id="verdict-title" className="mt-5 font-display text-[clamp(1.4rem,1.1rem+1.1vw,2rem)] font-semibold leading-[1.25] tracking-[-0.015em]">
            {comparison.winnerSummary}
          </h2>
        </div>
        <div className="rounded-[28px] bg-teal-soft p-7 sm:p-10 lg:col-span-5">
          <span className="tag bg-paper text-teal">The Gulf angle</span>
          <p className="mt-5 leading-relaxed text-ink-2">{comparison.gulfContext}</p>
        </div>
      </section>

      {/* ------------------------------------------------ Table */}
      <section aria-labelledby="table-title">
        <div className="wrap pb-16 lg:pb-24">
          <div className="mb-8 grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <h2 id="table-title" className="h-section">
                Every measure we track, lined up.
              </h2>
            </div>
            <p className="max-w-[44ch] text-ink-2 lg:col-span-5 lg:justify-self-end">
              Swap either product or add a third to see how the alternatives stack up.
            </p>
          </div>
          <ComparisonMatrix initialProductA={productA} initialProductB={productB} />
        </div>
      </section>

      {/* ------------------------------------------------ Other comparisons — sand band */}
      {others.length > 0 && (
        <>
          <Sadu from={C.paper} to={C.sand} accent={C.terracotta} />
          <section aria-labelledby="more-title" className="bg-sand">
            <div className="wrap py-16 lg:py-20">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <h2 id="more-title" className="h-section">
                  Other matchups
                </h2>
                <Link href="/compare#head-to-heads" className="arrow-link">
                  All comparisons
                </Link>
              </div>
              <ul className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
                {others.map((other) => {
                  const a = softwareLookup[other.productAId];
                  const b = softwareLookup[other.productBId];
                  return (
                    <li key={other.id}>
                      <Link
                        href={`/compare/${other.slug}`}
                        className="group flex h-full flex-col rounded-[24px] bg-paper p-6 transition-transform duration-300 hover:-translate-y-1"
                      >
                        {a && b && (
                          <span className="flex items-center">
                            <Monogram name={a.name} color={a.accentColor} />
                            <span className="z-10 -mx-2 grid h-8 w-8 place-items-center rounded-full bg-terracotta font-display text-[0.72rem] font-bold text-white ring-[3px] ring-paper">
                              vs
                            </span>
                            <Monogram name={b.name} color={b.accentColor} />
                          </span>
                        )}
                        <span className="h-card mt-5 text-[1.35rem] transition-colors group-hover:text-terracotta">
                          {a?.name ?? other.title.split(" vs ")[0]} vs {b?.name ?? other.title.split(" vs ")[1]}
                        </span>
                        <span className="mt-2 text-[0.92rem] leading-relaxed text-ink-2 line-clamp-3">
                          {other.shortDescription}
                        </span>
                        {a && b && (
                          <span className="mt-auto flex items-center gap-2 pt-5">
                            <span className="num rounded-full bg-sand-soft px-2.5 py-1 text-[0.78rem]">{a.verdict.score.toFixed(1)}</span>
                            <span className="h-px flex-1 bg-rule" />
                            <span className="num rounded-full bg-sand-soft px-2.5 py-1 text-[0.78rem]">{b.verdict.score.toFixed(1)}</span>
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
          <Sadu from={C.sand} to={C.paper} accent={C.teal} />
        </>
      )}
    </>
  );
}
