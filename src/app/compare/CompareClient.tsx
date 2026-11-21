"use client";

import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { softwares } from "@/data/software";
import { comparisons } from "@/data/comparisons";
import ComparisonMatrix from "@/components/ComparisonMatrix";
import Monogram from "@/components/Monogram";
import Sadu from "@/components/Sadu";

const find = (slug: string | null) => (slug ? softwares.find((s) => s.slug === slug) ?? null : null);

const C = {
  paper: "#FFFCF6",
  terracotta: "#C24E2A",
  teal: "#0E4B48",
  sand: "#F1D39C",
};

export default function CompareClient() {
  const searchParams = useSearchParams();

  const productA = find(searchParams.get("a"));
  let productB = find(searchParams.get("b"));
  if (productB && productB.slug === productA?.slug) productB = null;
  let productC = find(searchParams.get("c"));
  if (productC && (productC.slug === productA?.slug || productC.slug === productB?.slug)) productC = null;

  const bySlug = (slug: string) => softwares.find((s) => s.slug === slug);

  return (
    <>
      {/* ------------------------------------------------ Sand header band + builder */}
      <section aria-labelledby="compare-title" className="bg-sand">
        <div className="wrap pt-10 pb-14 lg:pt-14 lg:pb-16">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
            <div className="rise lg:col-span-7">
              <span className="tag bg-paper text-terracotta-deep">Compare</span>
              <h1 id="compare-title" className="display mt-5 text-[clamp(2.5rem,1.4rem+4vw,4.6rem)]">
                Put two or three products <span className="text-terracotta">side by side</span>.
              </h1>
            </div>
            <p className="rise max-w-[46ch] text-[1.05rem] leading-relaxed text-ink-2 [animation-delay:120ms] lg:col-span-5 lg:justify-self-end">
              Pick from the {softwares.length} products we have reviewed. The table lines up price, ZATCA and UAE VAT
              status, Arabic support and our verdict row by row.
            </p>
          </div>
        </div>
      </section>
      <Sadu from={C.sand} to={C.paper} accent={C.terracotta} />

      <section aria-labelledby="builder-title">
        <div className="wrap pt-10 pb-16 lg:pt-14 lg:pb-24">
          <h2 id="builder-title" className="sr-only">
            Comparison table
          </h2>
          <ComparisonMatrix
            initialProductA={productA}
            initialProductB={productB}
            initialProductC={productC}
            syncUrl
          />
        </div>
      </section>

      {/* ------------------------------------------------ Curated head-to-heads — teal band */}
      <Sadu from={C.paper} to={C.teal} accent={C.sand} />
      <section id="head-to-heads" aria-labelledby="h2h-title" className="scroll-mt-28 bg-teal text-teal-soft">
        <div className="wrap py-16 lg:py-20">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <h2 id="h2h-title" className="h-section text-paper">
                {comparisons.length} matchups written up in full
              </h2>
            </div>
            <p className="max-w-[44ch] lg:col-span-5 lg:justify-self-end">
              Each one adds our verdict and the Gulf context behind it on top of the table.
            </p>
          </div>

          <ul className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
            {comparisons.map((comp) => {
              const a = bySlug(comp.productAId);
              const b = bySlug(comp.productBId);
              return (
                <li key={comp.id}>
                  <Link
                    href={`/compare/${comp.slug}`}
                    className="group flex h-full flex-col rounded-[24px] bg-teal-deep p-6 transition-transform duration-300 hover:-translate-y-1 sm:p-7"
                  >
                    <span className="flex items-center justify-between gap-4">
                      {a && b ? (
                        <span className="flex items-center">
                          <Monogram name={a.name} color={a.accentColor} />
                          <span className="z-10 -mx-2 grid h-8 w-8 place-items-center rounded-full bg-terracotta font-display text-[0.72rem] font-bold text-white ring-[3px] ring-teal-deep">
                            vs
                          </span>
                          <Monogram name={b.name} color={b.accentColor} />
                        </span>
                      ) : (
                        <span />
                      )}
                      <span className="font-mono text-[0.66rem] font-semibold uppercase tracking-[0.08em] text-sand">
                        {comp.categories.join(" · ")}
                      </span>
                    </span>
                    <span className="mt-5 font-display text-[clamp(1.5rem,1.2rem+1vw,2rem)] font-bold leading-tight tracking-[-0.02em] text-paper">
                      {a?.name ?? comp.title.split(" vs ")[0]}
                      <span className="mx-2 text-sand">vs</span>
                      {b?.name ?? comp.title.split(" vs ")[1]}
                    </span>
                    <span className="mt-3 text-[0.95rem] leading-relaxed line-clamp-3">{comp.shortDescription}</span>
                    <span className="mt-auto flex items-center justify-between gap-4 pt-6">
                      {a && b ? (
                        <span className="num text-[0.8rem] text-teal-soft/80">
                          {a.verdict.score.toFixed(1)} — {b.verdict.score.toFixed(1)}
                        </span>
                      ) : (
                        <span />
                      )}
                      <span className="text-[0.88rem] font-semibold text-sand transition-transform duration-300 group-hover:translate-x-1">
                        Read the comparison →
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      <Sadu from={C.teal} to={C.paper} accent={C.sand} />
    </>
  );
}
