"use client";

import React from "react";
import Link from "next/link";
import { Software } from "@/types";
import { useApp } from "@/context/AppContext";
import { Star, ArrowRight, Check, Plus, Globe2, ShieldCheck, CheckCircle2 } from "lucide-react";

interface SoftwareCardProps {
  software: Software;
  compact?: boolean;
}

export default function SoftwareCard({ software }: SoftwareCardProps) {
  const { isInCompare, addToCompare, removeFromCompare } = useApp();
  const compared = isInCompare(software.slug);

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (compared) {
      removeFromCompare(software.slug);
    } else {
      addToCompare(software.slug);
    }
  };

  // Safe pricing suffix helper
  const getBillingSuffix = () => {
    const price = software.pricing.startingPrice?.toLowerCase() || "";
    if (price.includes("quote")) return "";
    const period = software.pricing.billingPeriod?.toLowerCase() || "";
    if (
      period.includes("user") ||
      period.includes("seat") ||
      period.includes("agent") ||
      period.includes("employee")
    ) {
      return "/user/mo";
    }
    return "/mo";
  };

  return (
    <div className="group relative flex flex-col justify-between rounded-xl border border-[#E5DFD3] bg-white p-4.5 transition-all duration-200 hover:border-[#FF6B5B] hover:shadow-xs">
      {/* Top Row: Brand & Rating */}
      <div>
        <div className="flex items-start justify-between gap-2.5">
          <div className="flex items-center gap-3 min-w-0">
            {/* Logo Badge */}
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg font-bold text-white shadow-2xs text-sm"
              style={{ backgroundColor: software.accentColor || "#0A2E36" }}
            >
              <span>{software.name.substring(0, 2).toUpperCase()}</span>
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-1.5">
                <Link
                  href={`/reviews/${software.slug}`}
                  className="font-bold text-[#0A2E36] text-base sm:text-lg hover:text-[#FF6B5B] transition-colors leading-snug truncate"
                  title={software.name}
                >
                  {software.name}
                </Link>
                {/* Sample Review Badge */}
                <span
                  className="inline-flex items-center gap-1 rounded bg-[#FAF7F0] px-2 py-0.5 text-[11px] font-semibold text-[#526A70] border border-[#E5DFD3] shrink-0"
                  title={software.sampleNotice}
                >
                  <ShieldCheck className="h-3 w-3 text-[#FF6B5B]" />
                  Sample Review
                </span>
              </div>
              <span className="text-xs text-[#526A70] font-semibold block truncate">
                {software.categoryName}
              </span>
            </div>
          </div>

          {/* Star Rating Badge */}
          <div className="flex items-center gap-1 rounded-md bg-[#FAF7F0] px-2 py-0.5 text-xs font-bold text-[#0A2E36] border border-[#E5DFD3] shrink-0">
            <Star className="h-3.5 w-3.5 fill-[#FF6B5B] text-[#FF6B5B]" />
            <span>{software.rating.toFixed(1)}</span>
            <span className="text-[11px] text-[#526A70] font-normal">
              ({software.reviewCount})
            </span>
          </div>
        </div>

        {/* Tagline / Excerpt */}
        <p className="mt-3 text-xs sm:text-sm text-[#384D52] leading-relaxed line-clamp-2">
          {software.tagline || software.description}
        </p>

        {/* Regional Suitability Badges */}
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          {software.countrySuitability.map((country) => (
            <span
              key={country}
              className="inline-flex items-center gap-1 rounded-md bg-[#0A2E36]/5 px-2 py-0.5 text-[11px] font-semibold text-[#0A2E36]"
            >
              <span className="h-1 w-1 rounded-full bg-[#FF6B5B]" />
              {country}
            </span>
          ))}

          {/* Arabic Support Pill */}
          <span className="inline-flex items-center gap-1 rounded-md bg-[#FFF0EE] px-2 py-0.5 text-[11px] font-semibold text-[#D44435] border border-[#FF6B5B]/20">
            <Globe2 className="h-3 w-3 text-[#FF6B5B]" />
            {software.arabicSupport}
          </span>
        </div>

        {/* Key Compliance Bullet points */}
        <div className="mt-3 space-y-1.5 pt-2.5 border-t border-[#E5DFD3]/80 text-xs">
          {software.localCompliance.slice(0, 2).map((item, idx) => (
            <div key={idx} className="flex items-center gap-1.5 text-[#1E3A40] font-medium" title={item}>
              <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
              <span className="line-clamp-1">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Footer: Pricing & Action Buttons */}
      <div className="mt-4 pt-3 border-t border-[#E5DFD3] flex items-center justify-between gap-2">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-wider font-bold text-[#526A70]">
            Starting From
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-base sm:text-lg font-extrabold text-[#0A2E36]">
              {software.pricing.startingPrice}
            </span>
            {getBillingSuffix() && (
              <span className="text-xs font-semibold text-[#526A70]">
                {getBillingSuffix()}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Quick Compare Button */}
          <button
            type="button"
            onClick={handleCompareClick}
            className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-bold transition-all min-h-[34px] cursor-pointer ${
              compared
                ? "bg-[#0A2E36] text-white shadow-2xs"
                : "border border-[#E5DFD3] bg-white text-[#0A2E36] hover:border-[#FF6B5B] hover:text-[#FF6B5B]"
            }`}
            title={compared ? "Remove from comparison" : "Add to comparison"}
          >
            {compared ? (
              <>
                <Check className="h-3.5 w-3.5 text-[#FF6B5B]" />
                <span>Added</span>
              </>
            ) : (
              <>
                <Plus className="h-3.5 w-3.5" />
                <span>Compare</span>
              </>
            )}
          </button>

          {/* Read Review Link */}
          <Link
            href={`/reviews/${software.slug}`}
            className="inline-flex items-center gap-1 rounded-lg bg-[#0A2E36] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#0D3B43] transition-colors min-h-[34px] shadow-2xs"
          >
            <span>Read Review</span>
            <ArrowRight className="h-3.5 w-3.5 text-[#FF6B5B]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
