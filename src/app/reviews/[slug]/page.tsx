import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { softwares } from "@/data/software";
import SoftwareCard from "@/components/SoftwareCard";
import Monogram from "@/components/Monogram";
import ScoreDial from "@/components/ScoreDial";
import Sadu from "@/components/Sadu";
import { arabicLabel, billingSuffix, marketsLabel, pad2 } from "@/lib/format";

export const dynamicParams = false;

export async function generateStaticParams() {
  return softwares.map((s) => ({
    slug: s.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const software = softwares.find((s) => s.slug === slug);
  if (!software) return { title: "Review not found" };

  const title = `${software.name} review: Gulf suitability, ZATCA and pricing`;
  const description = software.tagline;
  const canonicalUrl = `/reviews/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "article",
      title,
      description,
      url: canonicalUrl,
      images: [
        {
          url: "/articles/uae-einvoicing-digital.jpg",
          alt: `${software.name} review`,
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

const C = {
  paper: "#FFFCF6",
  terracotta: "#C24E2A",
  teal: "#0E4B48",
  tealSoft: "#D5E7E3",
  sand: "#F1D39C",
};

/** Rounded score bar, 0–10. */
function ScoreBar({ score, className = "" }: { score: number; className?: string }) {
  return (
    <span aria-hidden="true" className={`block h-2.5 overflow-hidden rounded-full bg-paper-2 ${className}`}>
      <span className="block h-full rounded-full bg-teal" style={{ width: `${Math.min(score, 10) * 10}%` }} />
    </span>
  );
}

function SectionHead({ n, id, title, tone = "default" }: { n: number; id: string; title: string; tone?: "default" | "onColor" }) {
  return (
    <header>
      <p className={`kicker ${tone === "onColor" ? "!text-sand" : "kicker-accent"}`}>{pad2(n)}</p>
      <h2 id={id} className={`h-section mt-2 ${tone === "onColor" ? "text-paper" : ""}`}>
        {title}
      </h2>
    </header>
  );
}

export default async function IndividualReviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const software = softwares.find((s) => s.slug === slug);

  if (!software) {
    notFound();
  }

  const similarProducts = softwares
    .filter(
      (s) =>
        s.slug !== software.slug &&
        (software.similarSoftwareSlugs.includes(s.slug) || s.category === software.category)
    )
    .slice(0, 3);

  const analysis = software.gulfSuitabilityAnalysis;
  const isSample = software.isVerifiedReview === false;

  const readiness = [
    analysis.zatcaStatus && { k: "ZATCA e-invoicing (KSA)", v: analysis.zatcaStatus },
    analysis.uaeVatStatus && { k: "FTA VAT (UAE)", v: analysis.uaeVatStatus },
    { k: "Arabic and right-to-left", v: analysis.arabicExperience },
    { k: "Regional support", v: analysis.regionalSupport },
    { k: "Data residency", v: analysis.dataResidency },
  ].filter((r): r is { k: string; v: string } => Boolean(r));

  const toc = [
    { id: "overview", label: "Overview" },
    { id: "strengths", label: "Strengths and drawbacks" },
    { id: "features", label: "Feature scores" },
    { id: "readiness", label: "Gulf readiness" },
    { id: "pricing", label: "Pricing" },
    { id: "verdict", label: "Verdict" },
  ];

  const figures = [
    { k: "Markets", v: marketsLabel(software), unit: "" },
    { k: "From", v: software.pricing.startingPrice, unit: billingSuffix(software) },
    { k: "Pricing model", v: software.pricing.model, unit: "" },
    { k: "Deployment", v: software.deploymentTime.replace(/\s*-\s*/, "–"), unit: "" },
    { k: "Arabic", v: arabicLabel(software.arabicSupport), unit: "" },
  ];

  const tiers = software.pricing.tiers;

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: software.name,
    operatingSystem: "Cloud, Web-based",
    applicationCategory: software.category,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: software.verdict.score,
      bestRating: 10,
      worstRating: 1,
      ratingCount: 1,
    },
    review: {
      "@type": "Review",
      author: {
        "@type": "Organization",
        name: "Gulf SaaS Review Editorial Lab",
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: software.verdict.score,
        bestRating: 10,
        worstRating: 1,
      },
      reviewBody: software.verdict.summary,
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
        name: "Reviews",
        item: "https://gulfsaasreview.com/reviews",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: software.name,
        item: `https://gulfsaasreview.com/reviews/${software.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <article>
      {/* ------------------------------------------------------------ HERO */}
      <header className="wrap pt-8 pb-12 lg:pb-16">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.82rem] text-ink-3">
            <li>
              <Link href="/" className="transition-colors hover:text-terracotta">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/reviews" className="transition-colors hover:text-terracotta">
                Reviews
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href={`/reviews?category=${software.category}`} className="transition-colors hover:text-terracotta">
                {software.categoryName}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-ink-2">
              {software.name}
            </li>
          </ol>
        </nav>

        <div className="mt-8 grid grid-cols-1 gap-10 lg:mt-12 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="rise lg:col-span-7">
            <div className="flex flex-wrap items-center gap-4">
              <Monogram name={software.name} color={software.accentColor} size="lg" />
              <div className="flex flex-wrap gap-2">
                <span className="tag tag-accent">Review</span>
                <span className="tag tag-teal">{software.categoryName}</span>
              </div>
            </div>
            <h1 className="display mt-7 text-[clamp(2.8rem,1.4rem+5vw,5.6rem)]">{software.name}</h1>
            <p className="mt-6 max-w-[50ch] text-[clamp(1.15rem,1.05rem+0.5vw,1.4rem)] leading-snug text-ink-2">
              {software.verdict.summary}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={`/compare?a=${software.slug}`} className="btn btn-primary">
                Compare with others
              </Link>
              <a href={software.websiteUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                Vendor site <span aria-hidden="true">↗</span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
          </div>

          {/* Score panel */}
          <aside aria-label="Score" className="rise [animation-delay:120ms] lg:col-span-5">
            <div>
              <div className="rounded-[32px] bg-teal p-6 text-teal-soft sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-sand">Our score</p>
                  <span className="tag !whitespace-normal !bg-sand !text-ink">{software.verdict.badge}</span>
                </div>
                <div className="mt-6 flex justify-center">
                  <ScoreDial
                    score={software.verdict.score}
                    size={168}
                    color={C.sand}
                    showMax
                    className="[&_.num]:!text-paper [&_circle:first-of-type]:[stroke:rgb(255_255_255/0.14)]"
                  />
                </div>
                <dl className="mt-7 grid grid-cols-2 gap-2">
                  <div className="rounded-[18px] bg-teal-deep px-4 py-3.5">
                    <dt className="text-[0.78rem] text-teal-soft/80">Ease of use</dt>
                    <dd className="num mt-1 text-[1.15rem] font-semibold text-paper">
                      {software.easeOfUse.toFixed(1)}
                      <span className="text-[0.8rem] font-normal text-teal-soft/70">/10</span>
                    </dd>
                  </div>
                  <div className="rounded-[18px] bg-teal-deep px-4 py-3.5">
                    <dt className="text-[0.78rem] text-teal-soft/80">User rating</dt>
                    <dd className="num mt-1 text-[1.15rem] font-semibold text-paper">
                      {software.rating.toFixed(1)}
                      <span className="text-[0.8rem] font-normal text-teal-soft/70"> / 5 · {software.reviewCount}</span>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </aside>
        </div>

        {/* Quick facts */}
        <dl className="mt-12 grid grid-cols-2 gap-2.5 md:grid-cols-5 lg:mt-16">
          {figures.map((f) => (
            <div
              key={f.k}
              className="flex flex-col-reverse justify-end rounded-[20px] bg-sand-soft px-4 py-4 last:col-span-2 sm:px-5 md:last:col-span-1"
            >
              <dt className="mt-1.5 font-mono text-[0.66rem] font-semibold uppercase tracking-[0.07em] text-[#7A5418]">{f.k}</dt>
              <dd className="font-display text-[1.15rem] font-bold leading-tight tracking-[-0.015em] text-ink">
                {f.v}
                {f.unit && <span className="num text-[0.78rem] font-normal text-ink-3">{f.unit}</span>}
              </dd>
            </div>
          ))}
        </dl>

        {isSample && software.sampleNotice && (
          <p className="mt-5 flex flex-col gap-2 rounded-[20px] bg-paper-2 px-5 py-4 text-[0.88rem] leading-relaxed text-ink-2 sm:flex-row sm:items-baseline sm:gap-3">
            <span className="tag shrink-0 self-start !bg-surface">Note</span>
            <span>{software.sampleNotice}</span>
          </p>
        )}
      </header>

      {/* ------------------------------------------------------------ IN-PAGE NAV */}
      <nav aria-label="In this review" className="sticky top-12 z-30 border-y-[1.5px] border-rule bg-paper/95 backdrop-saturate-150">
        <div className="wrap flex items-center gap-2 overflow-x-auto py-2.5 scrollbar-none">
          <span className="mr-1 hidden shrink-0 font-mono text-[0.66rem] font-semibold uppercase tracking-[0.08em] text-ink-3 sm:inline">
            In this review
          </span>
          {toc.map((t, i) => (
            <a key={t.id} href={`#${t.id}`} className="chip shrink-0 !min-h-[34px] hover:!border-terracotta hover:!text-terracotta">
              <span className="num text-[0.72rem] text-terracotta">{pad2(i + 1)}</span>
              {t.label}
            </a>
          ))}
        </div>
      </nav>

      {/* ------------------------------------------------------------ OVERVIEW, STRENGTHS, FEATURES */}
      <div className="wrap space-y-20 py-16 lg:space-y-24 lg:py-20">
        <section aria-labelledby="overview" className="grid scroll-mt-36 grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <SectionHead n={1} id="overview" title="Overview" />
          </div>
          <div className="prose-gsr lg:col-span-8">
            <p>{software.description}</p>
            <p>{analysis.summary}</p>
          </div>
        </section>

        <section aria-labelledby="strengths" className="scroll-mt-36">
          <SectionHead n={2} id="strengths" title="Strengths and drawbacks" />
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-[28px] bg-teal-soft p-6 sm:p-8">
              <h3 className="h-card text-[1.45rem] text-teal">What works</h3>
              <ul className="mt-5 space-y-3">
                {software.pros.map((pro, idx) => (
                  <li key={idx} className="grid grid-cols-[1.75rem_1fr] gap-3 text-[0.98rem] leading-relaxed text-ink">
                    <span aria-hidden="true" className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-teal text-[0.85rem] font-bold text-paper">
                      +
                    </span>
                    {pro}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[28px] bg-terracotta-soft p-6 sm:p-8">
              <h3 className="h-card text-[1.45rem] text-terracotta-deep">What to watch</h3>
              <ul className="mt-5 space-y-3">
                {software.cons.map((con, idx) => (
                  <li key={idx} className="grid grid-cols-[1.75rem_1fr] gap-3 text-[0.98rem] leading-relaxed text-ink">
                    <span aria-hidden="true" className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-terracotta text-[0.85rem] font-bold text-white">
                      −
                    </span>
                    {con}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section aria-labelledby="features" className="scroll-mt-36">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <SectionHead n={3} id="features" title="Feature scores" />
            <p className="max-w-[46ch] text-ink-2 md:text-right">
              Each area is scored out of 10 for how well it serves a business operating in the Gulf.
            </p>
          </div>
          <ol className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            {software.keyFeatures.map((kf, idx) => (
              <li key={idx} className="card flex flex-col p-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="h-card text-[1.25rem]">
                    <span className="num mr-2 text-[0.8rem] font-normal text-terracotta">{pad2(idx + 1)}</span>
                    {kf.title}
                  </h3>
                  <span className="num shrink-0 text-[1.35rem] font-semibold leading-none">
                    {kf.score.toFixed(1)}
                    <span className="text-[0.75rem] font-normal text-ink-3">/10</span>
                  </span>
                </div>
                <p className="mt-3 text-[0.93rem] leading-relaxed text-ink-2">{kf.description}</p>
                <div className="mt-auto pt-5">
                  <ScoreBar score={kf.score} />
                </div>
              </li>
            ))}
          </ol>
        </section>
      </div>

      {/* ------------------------------------------------------------ GULF READINESS — teal band */}
      <Sadu from={C.paper} to={C.teal} accent={C.terracotta} />
      <section aria-labelledby="readiness" className="scroll-mt-36 bg-teal text-teal-soft">
        <div className="wrap py-16 lg:py-20">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <SectionHead n={4} id="readiness" title="Gulf readiness" tone="onColor" />
            <p className="max-w-[46ch] md:text-right">Tax compliance, language, support and where your data lives.</p>
          </div>

          <dl className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-2">
            {readiness.map((r, i) => (
              <div
                key={r.k}
                className={`rounded-[24px] bg-teal-deep p-6 ${readiness.length % 2 === 1 && i === readiness.length - 1 ? "md:col-span-2" : ""}`}
              >
                <dt className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-sand">{r.k}</dt>
                <dd className="mt-2.5 text-[0.98rem] leading-relaxed text-teal-soft">{r.v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <h3 className="h-card text-[1.35rem] text-paper">Local compliance</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {software.localCompliance.map((comp, i) => (
                  <li key={i} className="inline-flex items-center gap-2 rounded-full bg-sand px-3.5 py-1.5 text-[0.88rem] font-medium text-ink">
                    <span aria-hidden="true" className="text-teal">✓</span>
                    {comp}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="h-card text-[1.35rem] text-paper">Local integrations</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {software.localIntegrations.map((intg, i) => (
                  <li key={i} className="rounded-full border-[1.5px] border-teal-soft/30 px-3.5 py-1.5 text-[0.88rem] text-teal-soft">
                    {intg}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      <Sadu from={C.teal} to={C.paper} accent={C.sand} />

      {/* ------------------------------------------------------------ PRICING + VERDICT */}
      <div className="wrap space-y-20 py-16 lg:space-y-24 lg:py-20">
        <section aria-labelledby="pricing" className="scroll-mt-36">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <SectionHead n={5} id="pricing" title="Pricing" />
            <p className="flex flex-wrap gap-2 md:justify-end">
              <span className="tag tag-sand">{software.pricing.model}</span>
              <span className="tag">{software.pricing.billingPeriod}</span>
            </p>
          </div>
          <p className="mt-4 max-w-[64ch] text-ink-2">{software.pricing.regionalNote}</p>

          <div
            className={`mt-8 grid grid-cols-1 gap-4 ${tiers.length > 1 ? "md:grid-cols-2" : ""} ${
              tiers.length > 2 ? "xl:grid-cols-3" : ""
            }`}
          >
            {tiers.map((tier, idx) => {
              const hot = Boolean(tier.highlight);
              return (
                <div
                  key={idx}
                  className={`flex flex-col rounded-[28px] p-6 sm:p-7 ${
                    hot ? "bg-terracotta text-white" : "border-[1.5px] border-rule bg-surface"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="h-card text-[1.35rem]">{tier.name}</h3>
                    {hot && <span className="tag shrink-0 !bg-sand !text-ink">Recommended</span>}
                  </div>
                  <p className="mt-5 leading-none">
                    <span className="display text-[2.4rem]">{tier.price}</span>
                    <span className={`num ml-1 text-[0.8rem] ${hot ? "text-white/75" : "text-ink-3"}`}>/{tier.period}</span>
                  </p>
                  {(tier.regionalEstimateSAR || tier.regionalEstimateAED) && (
                    <p className={`num mt-2.5 text-[0.78rem] ${hot ? "text-sand" : "text-ink-3"}`}>
                      ≈ {[tier.regionalEstimateSAR, tier.regionalEstimateAED].filter(Boolean).join(" · ")}
                    </p>
                  )}
                  <p className={`mt-4 text-[0.93rem] leading-relaxed ${hot ? "text-white/85" : "text-ink-2"}`}>{tier.description}</p>
                  <ul
                    className={`mt-5 space-y-2.5 border-t-[1.5px] border-dashed pt-5 ${hot ? "border-white/30" : "border-rule"}`}
                  >
                    {tier.features.map((feat, fIdx) => (
                      <li key={fIdx} className="grid grid-cols-[1.1rem_1fr] gap-2 text-[0.9rem]">
                        <span aria-hidden="true" className={hot ? "text-sand" : "text-teal"}>
                          ✓
                        </span>
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        <section aria-labelledby="verdict" className="scroll-mt-36">
          <div className="rounded-[32px] bg-sand p-6 sm:p-10 lg:p-14">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-8">
                <p className="kicker kicker-accent">{pad2(6)}</p>
                <h2 id="verdict" className="h-section mt-2">
                  Verdict
                </h2>
                <p className="display mt-6 max-w-[22ch] text-[clamp(1.8rem,1.3rem+1.6vw,2.8rem)]">
                  {software.verdict.badge}.
                </p>
              </div>
              <div className="flex lg:col-span-4 lg:justify-end">
                <span className="rounded-full bg-paper p-3">
                  <ScoreDial score={software.verdict.score} size={136} color={C.terracotta} showMax />
                </span>
              </div>
            </div>

            <dl className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-[22px] bg-paper p-6">
                <dt className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-teal">Best for</dt>
                <dd className="mt-2 text-[1rem] leading-relaxed text-ink">{software.verdict.bestFor}</dd>
              </div>
              <div className="rounded-[22px] bg-paper p-6">
                <dt className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-terracotta">
                  Not recommended for
                </dt>
                <dd className="mt-2 text-[1rem] leading-relaxed text-ink">{software.verdict.notRecommendedFor}</dd>
              </div>
            </dl>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={`/compare?a=${software.slug}`} className="btn btn-primary">
                Compare {software.name} with others
              </Link>
              <a href={software.websiteUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                Visit {software.name} <span aria-hidden="true">↗</span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* ------------------------------------------------------------ ALTERNATIVES */}
      {similarProducts.length > 0 && (
        <>
          <Sadu from={C.paper} to={C.tealSoft} accent={C.terracotta} />
          <section aria-labelledby="alternatives-title" className="bg-teal-soft">
            <div className="wrap py-16 lg:py-20">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <span className="tag !bg-paper !text-teal">Alternatives</span>
                  <h2 id="alternatives-title" className="h-section mt-4 max-w-[24ch]">
                    Other products to consider alongside {software.name}.
                  </h2>
                </div>
                <Link href="/reviews" className="arrow-link">
                  All reviews
                </Link>
              </div>
              <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
                {similarProducts.map((sim) => (
                  <SoftwareCard key={sim.id} software={sim} />
                ))}
              </div>
            </div>
          </section>
          <Sadu from={C.tealSoft} to={C.paper} accent={C.teal} />
        </>
      )}
      </article>
    </>
  );
}
