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
    <div className="group relative flex flex-col justify-between rounded-xl border border-[#EAE2D5] bg-white p-4.5 transition-all duration-200 hover:border-[#16A34A] hover:shadow-xs">
      {/* Top Row: Brand & Rating */}
      <div>
        <div className="flex items-start justify-between gap-2.5">
          <div className="flex items-center gap-3 min-w-0">
            {/* Logo Badge */}
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg font-bold text-white shadow-2xs text-sm"
              style={{ backgroundColor: software.accentColor || "#0B3D2E" }}
            >
              <span>{software.name.substring(0, 2).toUpperCase()}</span>
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-1.5">
                <Link
                  href={`/reviews/${software.slug}`}
                  className="font-bold text-[#0B3D2E] text-base sm:text-lg hover:text-[#16A34A] transition-colors leading-snug truncate"
                  title={software.name}
                >
                  {software.name}
                </Link>
                {/* Sample Review Badge */}
                <span
                  className="inline-flex items-center gap-1 rounded bg-[#EAF5ED] px-2 py-0.5 text-[11px] font-semibold text-[#0B3D2E] border border-[#C8E6D2] shrink-0"
                  title={software.sampleNotice}
                >
                  <ShieldCheck className="h-3 w-3 text-[#16A34A]" />
                  Sample Review
                </span>
              </div>
              <span className="text-xs text-[#5E7A6E] font-semibold block truncate">
                {software.categoryName}
              </span>
            </div>
          </div>

          {/* Star Rating Badge */}
          <div className="flex items-center gap-1 rounded-md bg-[#FFF8EF] px-2 py-0.5 text-xs font-bold text-[#0B3D2E] border border-[#EAE2D5] shrink-0">
            <Star className="h-3.5 w-3.5 fill-[#16A34A] text-[#16A34A]" />
            <span>{software.rating.toFixed(1)}</span>
            <span className="text-[11px] text-[#5E7A6E] font-normal">
              ({software.reviewCount})
            </span>
          </div>
        </div>

        {/* Tagline / Excerpt */}
        <p className="mt-3 text-xs sm:text-sm text-[#354F44] leading-relaxed line-clamp-2">
          {software.tagline || software.description}
        </p>

        {/* Regional Suitability Badges */}
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          {software.countrySuitability.map((country) => (
            <span
              key={country}
              className="inline-flex items-center gap-1 rounded-md bg-[#0B3D2E]/5 px-2 py-0.5 text-[11px] font-semibold text-[#0B3D2E]"
            >
              <span className="h-1 w-1 rounded-full bg-[#16A34A]" />
              {country}
            </span>
          ))}

          {/* Arabic Support Pill */}
          <span className="inline-flex items-center gap-1 rounded-md bg-[#EAF5ED] px-2 py-0.5 text-[11px] font-semibold text-[#15803D] border border-[#16A34A]/25">
            <Globe2 className="h-3 w-3 text-[#16A34A]" />
            {software.arabicSupport}
          </span>
        </div>

        {/* Key Compliance Bullet points */}
        <div className="mt-3 space-y-1.5 pt-2.5 border-t border-[#EAE2D5]/80 text-xs">
          {software.localCompliance.slice(0, 2).map((item, idx) => (
            <div key={idx} className="flex items-center gap-1.5 text-[#2D4A3E] font-medium" title={item}>
              <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#16A34A]" />
              <span className="line-clamp-1">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Footer: Pricing & Action Buttons */}
      <div className="mt-4 pt-3 border-t border-[#EAE2D5] flex items-center justify-between gap-2">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-wider font-bold text-[#5E7A6E]">
            Starting From
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-base sm:text-lg font-extrabold text-[#0B3D2E]">
              {software.pricing.startingPrice}
            </span>
            {getBillingSuffix() && (
              <span className="text-xs font-semibold text-[#5E7A6E]">
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
                ? "bg-[#0B3D2E] text-white shadow-2xs"
                : "border border-[#EAE2D5] bg-white text-[#0B3D2E] hover:border-[#16A34A] hover:text-[#16A34A]"
            }`}
            title={compared ? "Remove from comparison" : "Add to comparison"}
          >
            {compared ? (
              <>
                <Check className="h-3.5 w-3.5 text-[#22C55E]" />
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
            className="inline-flex items-center gap-1 rounded-lg bg-[#0B3D2E] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#16A34A] transition-colors min-h-[34px] shadow-2xs"
          >
            <span>Read Review</span>
            <ArrowRight className="h-3.5 w-3.5 text-[#22C55E]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
