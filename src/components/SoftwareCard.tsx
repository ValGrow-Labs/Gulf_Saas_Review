"use client";

import React from "react";
import Link from "next/link";
import { Software } from "@/types";
import { useApp } from "@/context/AppContext";
import Monogram from "./Monogram";
import ScoreDial from "./ScoreDial";
import { arabicLabel, billingSuffix, marketsLabel } from "@/lib/format";

interface SoftwareCardProps {
  software: Software;
  /** Kept for API compatibility. */
  compact?: boolean;
}

export default function SoftwareCard({ software }: SoftwareCardProps) {
  const { isInCompare, addToCompare, removeFromCompare } = useApp();
  const compared = isInCompare(software.slug);
  const native = software.arabicSupport.startsWith("Native");

  const toggleCompare = () => {
    if (compared) removeFromCompare(software.slug);
    else addToCompare(software.slug);
  };

  return (
    <article className="group card card-hover relative flex h-full flex-col p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <Monogram name={software.name} color={software.accentColor} />
          <div className="min-w-0">
            <h3 className="h-card truncate text-[1.25rem]">
              <Link
                href={`/reviews/${software.slug}`}
                className="transition-colors after:absolute after:inset-0 after:rounded-[22px] after:content-[''] group-hover:text-terracotta"
              >
                {software.name}
              </Link>
            </h3>
            <p className="truncate text-[0.82rem] text-ink-3">{software.categoryName}</p>
          </div>
        </div>
        <ScoreDial score={software.verdict.score} size={54} />
      </div>

      <p className="mt-4 min-h-[3em] text-[0.94rem] leading-relaxed text-ink-2 line-clamp-2">
        {software.tagline || software.description}
      </p>

      <div className="mt-4 mb-5 flex flex-wrap gap-1.5">
        <span className="tag tag-teal">{marketsLabel(software)}</span>
        <span className={`tag ${native ? "tag-sand" : ""}`}>Arabic: {arabicLabel(software.arabicSupport)}</span>
      </div>

      <div className="mt-auto flex items-end justify-between gap-3 border-t-[1.5px] border-dashed border-rule pt-4">
        <p className="leading-tight">
          <span className="kicker block !text-[0.6rem]">From</span>
          <span className="num text-[1.05rem] font-semibold text-ink">{software.pricing.startingPrice}</span>
          <span className="num text-[0.78rem] text-ink-3">{billingSuffix(software)}</span>
        </p>
        <button
          type="button"
          onClick={toggleCompare}
          aria-pressed={compared}
          className={`relative z-10 inline-flex h-9 items-center gap-1.5 rounded-full px-3.5 text-[0.84rem] font-semibold transition-colors ${
            compared ? "bg-terracotta text-white" : "bg-paper-2 text-ink hover:bg-sand-soft"
          }`}
        >
          <span aria-hidden="true">{compared ? "✓" : "+"}</span>
          {compared ? "Comparing" : "Compare"}
        </button>
      </div>
    </article>
  );
}
