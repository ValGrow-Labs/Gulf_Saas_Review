"use client";

import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { softwares } from "@/data/software";
import { comparisons } from "@/data/comparisons";
import ComparisonMatrix from "@/components/ComparisonMatrix";
import { Scale } from "lucide-react";

export default function CompareClient() {
  const searchParams = useSearchParams();

  const slugA = searchParams.get("a") || "zoho-one";
  const slugB = searchParams.get("b") || "hubspot-crm";
  const slugC = searchParams.get("c");

  const productA = softwares.find((s) => s.slug === slugA) || softwares[0];
  const productB =
    softwares.find((s) => s.slug === slugB) ||
    softwares.find((s) => s.slug !== productA.slug) ||
    softwares[1];
  const productC = slugC ? softwares.find((s) => s.slug === slugC) || null : null;

  return (
    <div className="min-h-screen bg-[#FFF8EF] pb-24">
      {/* Header */}
      <div className="bg-[#FFF8EF] border-b-2 border-[#E5DAC8] pt-12 sm:pt-14 pb-12 sm:pb-14">
        <div className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#15803D] mb-3">
              <Scale className="h-4 w-4" />
              <span>Side-by-Side Comparison Matrix</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-[#064734] tracking-tight">
              Compare Gulf Business Software
            </h1>
            <p className="mt-3 text-base sm:text-lg text-[#163A2E] font-medium leading-relaxed">
              Evaluate software side-by-side across Saudi Arabia ZATCA e-invoicing compliance, UAE VAT, Arabic language capabilities, and localized pricing tiers.
            </p>
          </div>

          {/* Quick Preset Badges */}
          <div className="mt-8 pt-6 border-t-2 border-[#E5DAC8]">
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#064734] block mb-3">
              Popular Head-to-Head Comparisons:
            </span>
            <div className="flex flex-wrap items-center gap-3">
              {comparisons.map((c) => (
                <Link
                  key={c.id}
                  href={`/compare/${c.slug}`}
                  className="rounded-xl border-2 border-[#E5DAC8] bg-white px-4 py-2.5 text-xs sm:text-sm font-bold text-[#064734] hover:border-[#064734] hover:text-[#15803D] transition-colors shadow-2xs"
                >
                  {c.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Comparison Matrix Area */}
      <div className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8 xl:px-12 pt-8 sm:pt-10">
        <ComparisonMatrix
          initialProductA={productA}
          initialProductB={productB}
          initialProductC={productC}
        />
      </div>
    </div>
  );
}
