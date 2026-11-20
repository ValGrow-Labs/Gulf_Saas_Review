"use client";

import React from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { Scale, X, ArrowRight, Trash2 } from "lucide-react";

export default function CompareTray() {
  const {
    compareSlugs,
    comparedSoftwares,
    removeFromCompare,
    clearCompare,
    isCompareTrayOpen,
  } = useApp();

  if (compareSlugs.length === 0 || !isCompareTrayOpen) {
    return null;
  }

  // Construct target comparison link
  let compareUrl = "/compare";
  if (compareSlugs.length >= 2) {
    compareUrl = `/compare?a=${compareSlugs[0]}&b=${compareSlugs[1]}${
      compareSlugs[2] ? `&c=${compareSlugs[2]}` : ""
    }`;
  } else if (compareSlugs.length === 1) {
    compareUrl = `/compare?a=${compareSlugs[0]}`;
  }

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-3xl animate-in slide-in-from-bottom-6 duration-300">
      <div className="rounded-2xl border border-[#FF6B5B]/50 bg-[#0A2E36] p-3.5 sm:p-4 text-[#F7F4EC] shadow-[0_20px_50px_rgba(10,46,54,0.45)] backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Left: Indicator & Items */}
          <div className="flex items-center gap-3 overflow-x-auto w-full sm:w-auto py-1">
            <div className="flex items-center gap-2 border-r border-[#0F3F4A] pr-3 shrink-0">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FF6B5B]/20 text-[#FF6B5B]">
                <Scale className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold leading-tight">
                  Comparing ({compareSlugs.length}/3)
                </span>
                <span className="text-[10px] text-[#F7F4EC]/70">
                  Select up to 3 tools
                </span>
              </div>
            </div>

            {/* Selected Tool Chips */}
            <div className="flex items-center gap-2 shrink-0">
              {comparedSoftwares.map((sw) => (
                <div
                  key={sw.id}
                  className="flex items-center gap-2 rounded-lg bg-[#0F3F4A] border border-[#16535E] px-2.5 py-1 text-xs"
                >
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: sw.accentColor || "#FF6B5B" }}
                  />
                  <span className="font-semibold text-white">{sw.name}</span>
                  <button
                    onClick={() => removeFromCompare(sw.slug)}
                    className="text-[#8BA4A9] hover:text-[#F7F4EC] transition-colors"
                    aria-label={`Remove ${sw.name}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}

              {compareSlugs.length < 2 && (
                <span className="text-xs text-[#F7F4EC]/60 italic pl-1">
                  + Add 1 more to compare
                </span>
              )}
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
            <button
              onClick={clearCompare}
              className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-[#F7F4EC]/70 hover:text-white transition-colors"
              title="Clear all"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Clear</span>
            </button>

            <Link
              href={compareUrl}
              className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-bold transition-all shadow-md ${
                compareSlugs.length >= 2
                  ? "bg-[#FF6B5B] text-white hover:bg-[#E85747] active:scale-95"
                  : "bg-[#0F3F4A] text-[#F7F4EC]/60 pointer-events-none opacity-60"
              }`}
            >
              <span>Compare Side-by-Side</span>
              <ArrowRight className="h-3.5 w-3.5 text-white" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
