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
    if (period.includes("user") || period.includes("seat") || period.includes("agent") || period.includes("employee")) {
      return "/user/mo";
    }
    return "/mo";
  };

  return (
    <div className="group relative flex flex-col justify-between rounded-xl border border-[#E7E4DC] bg-[#FCFAF5] p-5 sm:p-6 transition-all duration-300 hover:border-[#C6A66B]/80 hover:shadow-[0_12px_32px_rgba(16,31,53,0.08)] hover:-translate-y-0.5">
      {/* Top Row: Brand & Rating */}
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {/* Logo Badge */}
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl font-bold text-white shadow-xs transition-transform duration-300 group-hover:scale-105 border border-black/5"
              style={{ backgroundColor: software.accentColor || "#101F35" }}
            >
              <span className="text-base font-bold tracking-tight">
                {software.name.substring(0, 2).toUpperCase()}
              </span>
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-1.5">
                <Link
                  href={`/reviews/${software.slug}`}
                  className="font-bold text-[#101F35] text-lg hover:text-[#C6A66B] transition-colors leading-tight truncate"
                  title={software.name}
                >
                  {software.name}
                </Link>
                {/* Sample Review Badge */}
                <span
                  className="inline-flex items-center gap-1 rounded bg-[#F6F1E7] px-2 py-0.5 text-[9.5px] font-semibold text-[#697386] border border-[#E7E4DC] shrink-0"
                  title={software.sampleNotice}
                >
                  <ShieldCheck className="h-3 w-3 text-[#C6A66B]" />
                  Sample Review
                </span>
              </div>
              <span className="text-xs text-[#697386] font-medium block mt-0.5 truncate">
                {software.categoryName}
              </span>
            </div>
          </div>

          {/* Star Rating Badge */}
          <div className="flex items-center gap-1.5 rounded-lg bg-[#F6F1E7] px-2.5 py-1 text-xs font-bold text-[#101F35] border border-[#E7E4DC] shrink-0">
            <Star className="h-3.5 w-3.5 fill-[#C6A66B] text-[#C6A66B]" />
            <span>{software.rating.toFixed(1)}</span>
            <span className="text-[10px] text-[#697386] font-normal">
              ({software.reviewCount})
            </span>
          </div>
        </div>

        {/* Tagline / Excerpt */}
        <p className="mt-3.5 text-xs text-[#697386] leading-relaxed line-clamp-2 min-h-[2rem]">
          {software.tagline || software.description}
        </p>

        {/* Regional Suitability Badges */}
        <div className="mt-4 flex flex-wrap items-center gap-1.5">
          {software.countrySuitability.map((country) => (
            <span
              key={country}
              className="inline-flex items-center gap-1 rounded-md bg-[#101F35]/5 px-2 py-0.5 text-[10.5px] font-semibold text-[#101F35]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#C6A66B]" />
              {country}
            </span>
          ))}

          {/* Arabic Support Pill */}
          <span className="inline-flex items-center gap-1 rounded-md bg-[#C6A66B]/15 px-2 py-0.5 text-[10.5px] font-semibold text-[#8C6D33]">
            <Globe2 className="h-3 w-3" />
            {software.arabicSupport}
          </span>
        </div>

        {/* Key Compliance Bullet points */}
        <div className="mt-3.5 space-y-1.5 pt-3 border-t border-[#E7E4DC]/60 text-xs">
          {software.localCompliance.slice(0, 2).map((item, idx) => (
            <div key={idx} className="flex items-center gap-1.5 text-[#101F35] text-[11px]">
              <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
              <span className="truncate">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Footer: Pricing & Action Buttons */}
      <div className="mt-5 pt-3.5 border-t border-[#E7E4DC] flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-wider font-bold text-[#697386]">
            Starting From
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-base font-extrabold text-[#101F35]">
              {software.pricing.startingPrice}
            </span>
            {getBillingSuffix() && (
              <span className="text-[11px] font-medium text-[#697386]">
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
            className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
              compared
                ? "bg-[#101F35] text-[#FCFAF5]"
                : "border border-[#E7E4DC] bg-white text-[#101F35] hover:border-[#C6A66B] hover:text-[#C6A66B]"
            }`}
            title={compared ? "Remove from comparison" : "Add to comparison"}
          >
            {compared ? (
              <>
                <Check className="h-3 w-3 text-[#C6A66B]" />
                <span>Added</span>
              </>
            ) : (
              <>
                <Plus className="h-3 w-3" />
                <span>Compare</span>
              </>
            )}
          </button>

          {/* Read Review Link */}
          <Link
            href={`/reviews/${software.slug}`}
            className="inline-flex items-center gap-1 rounded-lg bg-[#101F35] px-3 py-1.5 text-xs font-bold text-[#FCFAF5] hover:bg-[#172B46] transition-colors"
          >
            <span>Review</span>
            <ArrowRight className="h-3 w-3 text-[#C6A66B]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
