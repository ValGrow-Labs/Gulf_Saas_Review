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
    <div className="min-h-screen bg-[#F7F4EC] pb-24">
      {/* Header */}
      <div className="bg-[#FAF7F0] border-b border-[#E5DFD3] pt-12 pb-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 text-[15px] font-bold uppercase tracking-wider text-[#FF6B5B] mb-2.5">
              <Scale className="h-4 w-4" />
              <span>Side-by-Side Comparison Matrix</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-editorial text-[#0A2E36] tracking-tight">
              Compare Gulf Business Software
            </h1>
            <p className="mt-3 text-[18px] sm:text-[19px] text-[#384D52] leading-relaxed">
              Evaluate software side-by-side across Saudi Arabia ZATCA e-invoicing compliance, UAE VAT, Arabic language capabilities, and localized pricing tiers.
            </p>
          </div>

          {/* Quick Preset Badges */}
          <div className="mt-8 pt-6 border-t border-[#E5DFD3]">
            <span className="text-[15px] font-bold uppercase tracking-wider text-[#526A70] block mb-3">
              Popular Head-to-Head Comparisons:
            </span>
            <div className="flex flex-wrap items-center gap-2.5">
              {comparisons.map((c) => (
                <Link
                  key={c.id}
                  href={`/compare/${c.slug}`}
                  className="rounded-xl border border-[#E5DFD3] bg-white px-4 py-2.5 text-[15px] sm:text-[16px] font-bold text-[#0A2E36] hover:border-[#FF6B5B] hover:text-[#FF6B5B] transition-colors shadow-2xs"
                >
                  {c.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Comparison Matrix Area */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10">
        <ComparisonMatrix
          initialProductA={productA}
          initialProductB={productB}
          initialProductC={productC}
        />
      </div>
    </div>
  );
}
