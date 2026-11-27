import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, categoryLookup } from "@/data/categories";
import { softwares, softwareLookup } from "@/data/software";
import { comparisons } from "@/data/comparisons";
import SoftwareCard from "@/components/SoftwareCard";
import Monogram from "@/components/Monogram";
import Sadu from "@/components/Sadu";
import { pad2 } from "@/lib/format";

export const dynamicParams = false;

export async function generateStaticParams() {
  return categories.map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = categoryLookup[slug];
  if (!category) return { title: "Category Not Found" };

  const title = `${category.name} Software Reviews for Saudi Arabia & UAE`;
  const description = category.description;
  const canonicalUrl = `/categories/${slug}`;

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
          alt: `${category.name} software evaluations`,
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
  sand: "#F1D39C",
  sandSoft: "#FAEBCF",
};

/** Header band colour, cycled by the category's position so neighbouring categories differ. */
const bands = [
  { hex: C.terracotta, cls: "bg-terracotta text-white", muted: "text-white/80", kicker: "text-sand", crumb: "text-white/70", panel: "bg-terracotta-deep" },
  { hex: C.teal, cls: "bg-teal text-teal-soft", muted: "text-teal-soft/85", kicker: "text-sand", crumb: "text-teal-soft/70", panel: "bg-teal-deep" },
  { hex: C.sand, cls: "bg-sand text-ink", muted: "text-ink-2", kicker: "text-terracotta", crumb: "text-ink-2", panel: "bg-paper" },
] as const;

export default async function CategoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = categoryLookup[slug];

  if (!category) {
    notFound();
  }

  // Products filed in this category, plus the ones we list as popular for it — best score first.
  const matchingSoftware = softwares
    .filter((s) => s.category === category.id || category.popularSoftwareSlugs.includes(s.slug))
    .sort((a, b) => b.verdict.score - a.verdict.score);

  const relatedComparisons = comparisons.filter((c) => c.categories.includes(category.name));
  const otherCategories = categories.filter((c) => c.slug !== category.slug);
  const band = bands[Math.max(0, categories.findIndex((c) => c.slug === category.slug)) % bands.length];
  const onDark = band.hex !== C.sand;

  const compareHref =
    matchingSoftware.length >= 2
      ? `/compare?a=${matchingSoftware[0].slug}&b=${matchingSoftware[1].slug}${
          matchingSoftware[2] ? `&c=${matchingSoftware[2].slug}` : ""
        }`
      : null;

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
        name: "Categories",
        item: "https://gulfsaasreview.com/categories",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: category.name,
        item: `https://gulfsaasreview.com/categories/${category.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* ------------------------------------------------ Header band */}
      <section className={band.cls}>
        <div className="wrap pt-10 pb-14 lg:pt-14 lg:pb-20">
          <nav aria-label="Breadcrumb" className={`num text-[0.75rem] ${band.crumb}`}>
            <Link href="/categories" className={`underline decoration-1 underline-offset-4 ${onDark ? "hover:text-sand" : "hover:text-terracotta"}`}>
              Categories
            </Link>
            <span aria-hidden="true" className="mx-2">/</span>
            <span aria-current="page">{category.name}</span>
          </nav>

          <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
            <div className="rise lg:col-span-7">
              <p className={`font-mono text-[0.7rem] font-semibold uppercase tracking-[0.08em] ${band.kicker}`}>
                Category · {matchingSoftware.length} reviewed · {category.count} tracked
              </p>
              <h1 className={`display mt-4 text-[clamp(2.5rem,1.4rem+4vw,4.6rem)] ${onDark ? "text-paper" : ""}`}>
                {category.name} software for the Gulf.
              </h1>
              <p className={`mt-6 max-w-[56ch] text-[1.1rem] leading-relaxed ${band.muted}`}>{category.description}</p>
              {compareHref && (
                <Link href={compareHref} className={`btn mt-8 ${onDark ? "btn-sand" : "btn-primary"}`}>
                  Compare the top {Math.min(3, matchingSoftware.length)} →
                </Link>
              )}
            </div>
            <aside aria-labelledby="why-title" className="rise [animation-delay:120ms] lg:col-span-5">
              <div className={`rounded-[28px] p-6 sm:p-8 ${band.panel}`}>
                <h2 id="why-title" className={`font-mono text-[0.7rem] font-semibold uppercase tracking-[0.08em] ${band.kicker}`}>
                  Why it matters here
                </h2>
                <p className={`mt-4 font-display text-[1.3rem] font-semibold leading-snug tracking-[-0.015em] ${onDark ? "text-paper" : "text-ink"}`}>
                  {category.gulfRelevance}
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
      <Sadu from={band.hex} to={C.paper} accent={band.hex === C.teal ? C.sand : C.teal} />

      {/* ------------------------------------------------ Products */}
      <section aria-labelledby="products-title">
        <div className="wrap py-16 lg:py-24">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <span className="tag tag-teal">Reviewed</span>
              <h2 id="products-title" className="h-section mt-4">
                {category.name} products we have tested.
              </h2>
            </div>
            <div className="lg:col-span-5 lg:text-right">
              <p className="text-ink-2 lg:ml-auto lg:max-w-[42ch]">
                Sorted by our score. Tick Compare on any two or three to line them up.
              </p>
            </div>
          </div>

          {matchingSoftware.length > 0 ? (
            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {matchingSoftware.map((software) => (
                <SoftwareCard key={software.id} software={software} />
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-[28px] bg-paper-2 px-6 py-10 sm:px-10">
              <p className="h-card text-[1.5rem]">No full reviews in this category yet.</p>
              <p className="mt-2 text-ink-2">
                We track {category.count} products here and publish reviews as testing finishes.
              </p>
              <Link href="/reviews" className="arrow-link mt-5">
                Browse all reviews
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ------------------------------------------------ Buyer's checklist */}
      <Sadu from={C.paper} to={C.sand} accent={C.terracotta} />
      <section aria-labelledby="checklist-title" className="bg-sand">
        <div className="wrap py-16 lg:py-20">
          <div className="max-w-[44rem]">
            <span className="tag bg-paper text-terracotta-deep">Buyer&rsquo;s checklist</span>
            <h2 id="checklist-title" className="h-section mt-4">
              What to check before you sign in Saudi Arabia or the UAE.
            </h2>
          </div>
          <ol className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {category.keyCriteria.map((crit, idx) => (
              <li key={crit} className="flex items-start gap-5 rounded-[24px] bg-paper p-6 sm:p-7">
                <span className="display shrink-0 text-[2.6rem] leading-[0.85] text-terracotta">{pad2(idx + 1)}</span>
                <p className="h-card pt-1 text-[1.2rem]">{crit}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <Sadu from={C.sand} to={C.paper} accent={C.teal} />

      {/* ------------------------------------------------ Related comparisons */}
      {relatedComparisons.length > 0 && (
        <section aria-labelledby="vs-title">
          <div className="wrap pt-16 lg:pt-24">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 id="vs-title" className="h-section">
                {category.name} head to heads
              </h2>
              <Link href="/compare#head-to-heads" className="arrow-link">
                All comparisons
              </Link>
            </div>
            <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {relatedComparisons.map((comp) => {
                const a = softwareLookup[comp.productAId];
                const b = softwareLookup[comp.productBId];
                return (
                  <li key={comp.id}>
                    <Link href={`/compare/${comp.slug}`} className="card card-hover group flex h-full flex-col p-6">
                      {a && b && (
                        <span className="flex items-center">
                          <Monogram name={a.name} color={a.accentColor} />
                          <span className="z-10 -mx-2 grid h-8 w-8 place-items-center rounded-full bg-terracotta font-display text-[0.72rem] font-bold text-white ring-[3px] ring-surface">
                            vs
                          </span>
                          <Monogram name={b.name} color={b.accentColor} />
                        </span>
                      )}
                      <span className="h-card mt-5 text-[1.35rem] transition-colors group-hover:text-terracotta">
                        {a?.name ?? comp.title.split(" vs ")[0]} vs {b?.name ?? comp.title.split(" vs ")[1]}
                      </span>
                      <span className="mt-2 text-[0.92rem] leading-relaxed text-ink-2 line-clamp-3">
                        {comp.shortDescription}
                      </span>
                      {a && b && (
                        <span className="mt-auto flex items-center gap-2 pt-5">
                          <span className="num rounded-full bg-paper-2 px-2.5 py-1 text-[0.78rem]">{a.verdict.score.toFixed(1)}</span>
                          <span className="h-px flex-1 bg-rule" />
                          <span className="num rounded-full bg-paper-2 px-2.5 py-1 text-[0.78rem]">{b.verdict.score.toFixed(1)}</span>
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}

      {/* ------------------------------------------------ Other categories */}
      <nav aria-labelledby="other-cats">
        <div className="wrap py-14 lg:py-20">
          <div className="rounded-[28px] bg-teal-soft p-6 sm:p-8">
            <h2 id="other-cats" className="h-card text-[1.4rem]">
              Other categories
            </h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {otherCategories.map((c) => (
                <li key={c.id}>
                  <Link href={`/categories/${c.slug}`} className="chip !bg-paper">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
