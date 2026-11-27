import React from "react";
import Link from "next/link";
import { categories } from "@/data/categories";
import { softwares } from "@/data/software";
import Monogram from "@/components/Monogram";
import Sadu from "@/components/Sadu";
import { pad2 } from "@/lib/format";

export const metadata = {
  title: "Software Categories for Gulf Businesses | GulfSaasReview",
  description:
    "Browse software categories tailored for Middle Eastern enterprises, startups, and SMBs: Accounting, CRM, HR & Payroll, ERP, Project Management, and E-commerce.",
  alternates: {
    canonical: "/categories",
  },
};

const C = {
  paper: "#FFFCF6",
  terracotta: "#C24E2A",
  teal: "#0E4B48",
  sand: "#F1D39C",
  sandSoft: "#FAEBCF",
};

/** Colour treatments the category tiles cycle through. */
const tones = [
  {
    panel: "bg-terracotta text-white",
    muted: "text-white/75",
    accent: "text-sand",
    bullet: "bg-sand",
    inner: "bg-terracotta-deep",
    innerHover: "hover:bg-[#8a3318]",
    innerMuted: "text-white/65",
    link: "text-white hover:!text-sand",
  },
  {
    panel: "bg-teal text-teal-soft",
    muted: "text-teal-soft/80",
    accent: "text-sand",
    bullet: "bg-sand",
    inner: "bg-teal-deep",
    innerHover: "hover:bg-[#062826]",
    innerMuted: "text-teal-soft/70",
    link: "text-paper hover:!text-sand",
  },
  {
    panel: "bg-sand text-ink",
    muted: "text-ink-2",
    accent: "text-terracotta",
    bullet: "bg-terracotta",
    inner: "bg-paper",
    innerHover: "hover:bg-white",
    innerMuted: "text-ink-3",
    link: "",
  },
  {
    panel: "bg-teal-soft text-ink",
    muted: "text-ink-2",
    accent: "text-teal",
    bullet: "bg-teal",
    inner: "bg-paper",
    innerHover: "hover:bg-white",
    innerMuted: "text-ink-3",
    link: "",
  },
] as const;

export default function CategoriesPage() {
  const tracked = categories.reduce((sum, c) => sum + c.count, 0);

  return (
    <>
      {/* ------------------------------------------------ Hero */}
      <section className="wrap pt-10 pb-14 lg:pt-16 lg:pb-20">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <div className="rise lg:col-span-7">
            <span className="tag tag-accent">Categories</span>
            <h1 className="display mt-5 text-[clamp(2.5rem,1.4rem+4vw,4.6rem)]">
              Start from the job the software has to do.
            </h1>
          </div>
          <p className="rise max-w-[46ch] text-[1.08rem] leading-relaxed text-ink-2 [animation-delay:120ms] lg:col-span-5 lg:justify-self-end">
            Each category lists the local rules that matter for that kind of software — ZATCA, UAE VAT, WPS, Arabic — and
            the reviewed products that meet them.
          </p>
        </div>

        <dl className="rise mt-10 flex flex-wrap gap-3 [animation-delay:180ms]">
          {[
            { k: "categories", v: categories.length, cls: "bg-terracotta-soft text-terracotta-deep" },
            { k: "products reviewed", v: softwares.length, cls: "bg-teal-soft text-teal" },
            { k: "products tracked", v: tracked, cls: "bg-sand-soft text-[#7A5418]" },
          ].map((f) => (
            <div key={f.k} className={`flex flex-row-reverse items-baseline gap-2 rounded-full px-5 py-2.5 ${f.cls}`}>
              <dt className="text-[0.88rem] font-medium">{f.k}</dt>
              <dd className="display text-[1.6rem] leading-none">{f.v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ------------------------------------------------ Category tiles */}
      <Sadu from={C.paper} to={C.sandSoft} accent={C.terracotta} />
      <section aria-labelledby="all-cats" className="bg-sand-soft">
        <div className="wrap py-14 lg:py-20">
          <h2 id="all-cats" className="h-section">All categories</h2>

          <ol className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-2">
            {categories.map((cat, i) => {
              const tone = tones[i % tones.length];
              const products = cat.popularSoftwareSlugs
                .map((slug) => softwares.find((s) => s.slug === slug))
                .filter((s): s is (typeof softwares)[number] => Boolean(s));
              const shown = products.slice(0, 3);

              return (
                <li key={cat.id}>
                  <article
                    aria-labelledby={`cat-${cat.slug}`}
                    className={`flex h-full flex-col rounded-[28px] p-6 sm:p-8 ${tone.panel}`}
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <span className={`num text-[0.8rem] font-semibold ${tone.accent}`}>{pad2(i + 1)}</span>
                      <span className={`num text-[0.75rem] ${tone.muted}`}>
                        {cat.count} tracked · {products.length} reviewed
                      </span>
                    </div>
                    <h3 id={`cat-${cat.slug}`} className={`display mt-4 text-[clamp(2rem,1.5rem+1.6vw,2.9rem)] ${i % tones.length === 1 ? "text-paper" : ""}`}>
                      <Link href={`/categories/${cat.slug}`} className="decoration-2 underline-offset-[6px] hover:underline">
                        {cat.name}
                      </Link>
                    </h3>
                    <p className={`mt-3 max-w-[56ch] text-[0.98rem] leading-relaxed ${tone.muted}`}>{cat.description}</p>

                    <h4 className={`mt-6 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.08em] ${tone.accent}`}>
                      What to check
                    </h4>
                    <ul className="mt-3 space-y-2">
                      {cat.keyCriteria.slice(0, 3).map((crit) => (
                        <li key={crit} className="grid grid-cols-[0.9rem_1fr] items-baseline gap-2 text-[0.92rem] leading-snug">
                          <span aria-hidden="true" className={`h-1.5 w-1.5 translate-y-[-2px] rotate-45 ${tone.bullet}`} />
                          {crit}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto pt-7">
                      {products.length > 0 ? (
                        <ul className="space-y-2">
                          {shown.map((p) => (
                            <li key={p.id}>
                              <Link
                                href={`/reviews/${p.slug}`}
                                className={`group flex items-center gap-3 rounded-[16px] p-2 pr-4 transition-colors ${tone.inner} ${tone.innerHover}`}
                              >
                                <Monogram name={p.name} color={p.accentColor} size="sm" />
                                <span className="min-w-0 flex-1">
                                  <span className="block truncate font-semibold">{p.name}</span>
                                  <span className={`num block text-[0.7rem] ${tone.innerMuted}`}>
                                    From {p.pricing.startingPrice}
                                  </span>
                                </span>
                                <span className="num text-[1rem] font-semibold">{p.verdict.score.toFixed(1)}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className={`rounded-[16px] p-4 text-[0.88rem] ${tone.inner} ${tone.innerMuted}`}>
                          No full reviews in this category yet.
                        </p>
                      )}
                      <Link href={`/categories/${cat.slug}`} className={`arrow-link mt-5 ${tone.link}`}>
                        Explore {cat.name}
                      </Link>
                    </div>
                  </article>
                </li>
              );
            })}
          </ol>
        </div>
      </section>
      <Sadu from={C.sandSoft} to={C.paper} accent={C.teal} />

      {/* ------------------------------------------------ Compare prompt */}
      <section aria-labelledby="cat-compare" className="wrap py-14 lg:py-20">
        <div className="flex flex-col items-start justify-between gap-6 rounded-[28px] bg-paper-2 p-7 sm:p-10 md:flex-row md:items-center">
          <div>
            <h2 id="cat-compare" className="h-card text-[1.7rem]">Already have a shortlist?</h2>
            <p className="mt-2 max-w-[52ch] text-ink-2">
              Line up two or three products on price, ZATCA, UAE VAT, Arabic and rollout.
            </p>
          </div>
          <Link href="/compare" className="btn btn-accent">
            Compare products →
          </Link>
        </div>
      </section>
    </>
  );
}
