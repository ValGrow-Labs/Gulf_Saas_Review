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

export default function SoftwareCard({ software, compact = false }: SoftwareCardProps) {
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
    <div className="group relative flex flex-col justify-between rounded-2xl border border-[#E5DCD0] bg-[#FAF5ED] p-6 transition-all duration-300 hover:border-[#FF6B5B] hover:shadow-[0_12px_36px_rgba(20,18,61,0.09)] hover:-translate-y-0.5">
      {/* Top Row: Brand & Rating */}
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3.5 min-w-0">
            {/* Logo Badge */}
            <div
              className="flex h-13 w-13 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl font-bold text-white shadow-xs transition-transform duration-300 group-hover:scale-105"
              style={{ backgroundColor: software.accentColor || "#14123D" }}
            >
              <span className="text-lg sm:text-xl font-bold tracking-tight">
                {software.name.substring(0, 2).toUpperCase()}
              </span>
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href={`/reviews/${software.slug}`}
                  className="font-bold text-[#14123D] text-xl sm:text-2xl hover:text-[#FF6B5B] transition-colors leading-tight truncate"
                  title={software.name}
                >
                  {software.name}
                </Link>
                {/* Sample Review Badge */}
                <span
                  className="inline-flex items-center gap-1 rounded bg-[#F4EDE0] px-2.5 py-0.5 text-xs font-semibold text-[#64748B] border border-[#E5DCD0] shrink-0"
                  title={software.sampleNotice}
                >
                  <ShieldCheck className="h-3.5 w-3.5 text-[#FF6B5B]" />
                  Sample Review
                </span>
              </div>
              <span className="text-[15px] text-[#64748B] font-semibold block mt-1 truncate">
                {software.categoryName}
              </span>
            </div>
          </div>

          {/* Star Rating Badge */}
          <div className="flex items-center gap-1.5 rounded-lg bg-[#F4EDE0] px-3 py-1 text-sm font-bold text-[#14123D] border border-[#E5DCD0] shrink-0">
            <Star className="h-4 w-4 fill-[#FF6B5B] text-[#FF6B5B]" />
            <span>{software.rating.toFixed(1)}</span>
            <span className="text-xs text-[#64748B] font-normal">
              ({software.reviewCount})
            </span>
          </div>
        </div>

        {/* Tagline / Excerpt - 18px readable font */}
        <p className="mt-4 text-[17px] sm:text-[18px] text-[#334155] leading-relaxed line-clamp-2">
          {software.tagline || software.description}
        </p>

        {/* Regional Suitability Badges */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {software.countrySuitability.map((country) => (
            <span
              key={country}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#14123D]/5 px-3 py-1 text-xs sm:text-[13px] font-bold text-[#14123D]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF6B5B]" />
              {country}
            </span>
          ))}

          {/* Arabic Support Pill */}
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#FF6B5B]/15 px-3 py-1 text-xs sm:text-[13px] font-bold text-[#D94534]">
            <Globe2 className="h-3.5 w-3.5" />
            {software.arabicSupport}
          </span>
        </div>

        {/* Key Compliance Bullet points - 15-16px font */}
        <div className="mt-4 space-y-2 pt-3.5 border-t border-[#E5DCD0]/80 text-[15px] sm:text-[16px]">
          {software.localCompliance.slice(0, 2).map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 text-[#1E293B] font-medium">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
              <span className="truncate">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Footer: Pricing & Action Buttons */}
      <div className="mt-6 pt-4 border-t border-[#E5DCD0] flex items-center justify-between gap-3">
        <div className="flex flex-col">
          <span className="text-[12px] uppercase tracking-wider font-bold text-[#64748B]">
            Starting From
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-xl sm:text-2xl font-extrabold text-[#14123D]">
              {software.pricing.startingPrice}
            </span>
            {getBillingSuffix() && (
              <span className="text-[14px] font-semibold text-[#64748B]">
                {getBillingSuffix()}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Compare Button */}
          <button
            type="button"
            onClick={handleCompareClick}
            className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2.5 text-[15px] font-bold transition-all min-h-[44px] cursor-pointer ${
              compared
                ? "bg-[#14123D] text-[#FAF5ED]"
                : "border border-[#E5DCD0] bg-white text-[#14123D] hover:border-[#FF6B5B] hover:text-[#FF6B5B]"
            }`}
            title={compared ? "Remove from comparison" : "Add to comparison"}
          >
            {compared ? (
              <>
                <Check className="h-4 w-4 text-[#FF6B5B]" />
                <span>Added</span>
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" />
                <span>Compare</span>
              </>
            )}
          </button>

          {/* Read Review Link */}
          <Link
            href={`/reviews/${software.slug}`}
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#14123D] px-4 py-2.5 text-[15px] font-bold text-[#FAF5ED] hover:bg-[#1E1B59] transition-colors min-h-[44px]"
          >
            <span>Review</span>
            <ArrowRight className="h-4 w-4 text-[#FF6B5B]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
