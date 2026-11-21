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
    <div className="group relative flex flex-col justify-between rounded-2xl border-2 border-[#E5DAC8] bg-white p-5 sm:p-6 transition-all duration-200 hover:border-[#064734] hover:shadow-md">
      <div>
        {/* Row 1: Brand Logo, Name, Category, Rating (Single Line, 2 Sizes Bigger) */}
        <div className="flex items-center justify-between gap-3 pb-3 border-b-2 border-[#E5DAC8]/80">
          <div className="flex items-center gap-3.5 min-w-0">
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl font-extrabold text-white shadow-xs text-sm"
              style={{ backgroundColor: software.accentColor || "#064734" }}
            >
              <span>{software.name.substring(0, 2).toUpperCase()}</span>
            </div>

            <div className="min-w-0">
              <Link
                href={`/reviews/${software.slug}`}
                className="font-bold text-[#064734] text-lg sm:text-xl hover:text-[#15803D] transition-colors leading-snug truncate block"
                title={software.name}
              >
                {software.name}
              </Link>
              <span className="text-xs sm:text-sm font-bold text-[#15803D] block truncate">
                {software.categoryName}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 rounded-lg bg-[#FFF8EF] px-2.5 py-1 text-sm sm:text-base font-bold text-[#064734] border-2 border-[#E5DAC8] shrink-0">
            <Star className="h-4 w-4 fill-[#D97706] text-[#D97706]" />
            <span>{software.rating.toFixed(1)}</span>
            <span className="text-xs text-[#3C6152] font-medium">
              ({software.reviewCount})
            </span>
          </div>
        </div>

        {/* Row 2: Short & Simple Tagline (Visible & Readable) */}
        <p className="mt-3 text-sm sm:text-base text-[#163A2E] font-semibold truncate" title={software.tagline}>
          {software.tagline || software.description}
        </p>

        {/* Row 3: Regional Suitability & Arabic RTL (Large & Clear) */}
        <div className="mt-3 flex items-center justify-between gap-2 text-xs sm:text-sm bg-[#F4ECE1] px-3 py-2 rounded-xl border border-[#E5DAC8]">
          <div className="flex items-center gap-2 truncate text-[#064734] font-bold">
            <span className="h-2 w-2 rounded-full bg-[#15803D] shrink-0" />
            <span className="truncate">{software.countrySuitability.join(" • ")}</span>
          </div>
          <span className="shrink-0 text-[#15803D] font-bold">
            {software.arabicSupport.includes("Native") ? "Arabic RTL: Native" : "Arabic: Partial"}
          </span>
        </div>

        {/* Row 4: Single-Line Compliance Highlights (Visible & Punchy) */}
        <div className="mt-2.5 space-y-1.5 text-xs sm:text-sm">
          {software.localCompliance.slice(0, 2).map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 text-[#064734] font-semibold" title={item}>
              <CheckCircle2 className="h-4 w-4 shrink-0 text-[#15803D]" />
              <span className="truncate">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Row 5: Pricing & Big Action Buttons */}
      <div className="mt-4 pt-3.5 border-t-2 border-[#E5DAC8] flex items-center justify-between gap-3">
        <div className="min-w-0">
          <span className="text-xs uppercase font-extrabold text-[#3C6152] block leading-none mb-1">
            Starting Price
          </span>
          <div className="flex items-baseline gap-1 truncate">
            <span className="text-lg sm:text-xl font-extrabold text-[#064734]">
              {software.pricing.startingPrice}
            </span>
            {getBillingSuffix() && (
              <span className="text-xs sm:text-sm font-bold text-[#3C6152]">
                {getBillingSuffix()}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleCompareClick}
            className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs sm:text-sm font-bold transition-all min-h-[40px] cursor-pointer shrink-0 ${
              compared
                ? "bg-[#064734] text-white shadow-xs"
                : "border-2 border-[#E5DAC8] bg-white text-[#064734] hover:border-[#064734] hover:text-[#064734]"
            }`}
            title={compared ? "Remove from comparison" : "Add to comparison"}
          >
            {compared ? (
              <>
                <Check className="h-4 w-4 text-[#E0FFC2]" />
                <span className="hidden sm:inline">Added</span>
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">Compare</span>
              </>
            )}
          </button>

          <Link
            href={`/reviews/${software.slug}`}
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#064734] px-4 py-2 text-xs sm:text-sm font-bold text-white hover:bg-[#043224] transition-colors min-h-[40px] shadow-xs shrink-0"
          >
            <span>Review</span>
            <ArrowRight className="h-4 w-4 text-[#E0FFC2]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
