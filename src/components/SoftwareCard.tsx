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
    <div className="group relative flex flex-col justify-between rounded-2xl border-2 border-[#E7E4DC] bg-[#FCFAF5] p-6 sm:p-7 transition-all duration-300 hover:border-[#C6A66B] hover:shadow-[0_14px_40px_rgba(16,31,53,0.1)] hover:-translate-y-0.5">
      {/* Top Row: Brand & Rating */}
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3.5 min-w-0">
            {/* Logo Badge */}
            <div
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl font-bold text-white shadow-xs transition-transform duration-300 group-hover:scale-105 border border-black/10"
              style={{ backgroundColor: software.accentColor || "#101F35" }}
            >
              <span className="text-lg font-bold tracking-tight">
                {software.name.substring(0, 2).toUpperCase()}
              </span>
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href={`/reviews/${software.slug}`}
                  className="font-extrabold text-[#101F35] text-xl sm:text-2xl hover:text-[#C6A66B] transition-colors leading-tight truncate"
                  title={software.name}
                >
                  {software.name}
                </Link>
                {/* Sample Review Badge */}
                <span
                  className="inline-flex items-center gap-1 rounded bg-[#F6F1E7] px-2.5 py-1 text-xs font-bold text-[#334155] border border-[#E7E4DC] shrink-0"
                  title={software.sampleNotice}
                >
                  <ShieldCheck className="h-3.5 w-3.5 text-[#C6A66B]" />
                  Sample Review
                </span>
              </div>
              <span className="text-xs sm:text-sm text-[#334155] font-semibold block mt-1 truncate">
                {software.categoryName}
              </span>
            </div>
          </div>

          {/* Star Rating Badge */}
          <div className="flex items-center gap-1.5 rounded-xl bg-[#F6F1E7] px-3 py-1.5 text-sm sm:text-base font-extrabold text-[#101F35] border border-[#E7E4DC] shrink-0">
            <Star className="h-4 w-4 fill-[#C6A66B] text-[#C6A66B]" />
            <span>{software.rating.toFixed(1)}</span>
            <span className="text-xs text-[#334155] font-semibold">
              ({software.reviewCount})
            </span>
          </div>
        </div>

        {/* Tagline / Excerpt */}
        <p className="mt-4 text-sm sm:text-base text-[#1E293B] font-medium leading-relaxed line-clamp-2">
          {software.tagline || software.description}
        </p>

        {/* Regional Suitability Badges */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {software.countrySuitability.map((country) => (
            <span
              key={country}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#101F35]/10 px-3 py-1 text-xs sm:text-sm font-bold text-[#101F35]"
            >
              <span className="h-2 w-2 rounded-full bg-[#C6A66B]" />
              {country}
            </span>
          ))}

          {/* Arabic Support Pill */}
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#C6A66B]/20 px-3 py-1 text-xs sm:text-sm font-bold text-[#8C6D33]">
            <Globe2 className="h-4 w-4" />
            {software.arabicSupport}
          </span>
        </div>

        {/* Key Compliance Bullet points */}
        <div className="mt-5 space-y-2 pt-4 border-t border-[#E7E4DC] text-sm">
          {software.localCompliance.slice(0, 2).map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 text-[#101F35] text-sm font-medium">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
              <span className="truncate">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Footer: Pricing & Action Buttons */}
      <div className="mt-7 pt-4 border-t border-[#E7E4DC] flex items-center justify-between gap-3">
        <div className="flex flex-col">
          <span className="text-xs uppercase tracking-wider font-extrabold text-[#334155]">
            Starting From
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-xl sm:text-2xl font-extrabold text-[#101F35]">
              {software.pricing.startingPrice}
            </span>
            {getBillingSuffix() && (
              <span className="text-sm font-bold text-[#334155]">
                {getBillingSuffix()}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Quick Compare Button */}
          <button
            type="button"
            onClick={handleCompareClick}
            className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-bold transition-all min-h-[44px] cursor-pointer ${
              compared
                ? "bg-[#101F35] text-[#FCFAF5]"
                : "border border-[#E7E4DC] bg-white text-[#101F35] hover:border-[#C6A66B] hover:text-[#C6A66B] shadow-2xs"
            }`}
            title={compared ? "Remove from comparison" : "Add to comparison"}
          >
            {compared ? (
              <>
                <Check className="h-4 w-4 text-[#C6A66B] stroke-[3]" />
                <span>Added</span>
              </>
            ) : (
              <>
                <Plus className="h-4 w-4 stroke-[3]" />
                <span>Compare</span>
              </>
            )}
          </button>

          {/* Read Review Link */}
          <Link
            href={`/reviews/${software.slug}`}
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#101F35] px-4 py-2.5 text-sm font-bold text-[#FCFAF5] hover:bg-[#172B46] transition-colors min-h-[44px] shadow-xs"
          >
            <span>Review</span>
            <ArrowRight className="h-4 w-4 text-[#C6A66B]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
