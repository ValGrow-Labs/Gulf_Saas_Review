"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { breakingNewsHeadlines } from "@/data/news";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function BreakingNewsTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % breakingNewsHeadlines.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? breakingNewsHeadlines.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % breakingNewsHeadlines.length);
  };

  return (
    <aside
      className="w-full bg-[#FAF7F0] border-b border-[#E5DFD3] relative z-20"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Breaking Technology News"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-9 sm:h-10 items-center justify-between gap-3 text-xs sm:text-sm">
          {/* Breaking News Label */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-[#0A2E36] px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-[#FF6B5B]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF6B5B] animate-ping" />
              <span>Flash News</span>
            </span>
            <span className="text-[#FF6B5B] font-bold hidden sm:inline">•</span>
          </div>

          {/* Cycling Dynamic Headline */}
          <div className="flex-1 overflow-hidden min-w-0">
            <div className="flex items-center">
              <Link
                href="/news"
                className="truncate font-semibold text-xs sm:text-sm text-[#0A2E36] hover:text-[#FF6B5B] transition-colors flex items-center gap-2"
                title={breakingNewsHeadlines[currentIndex]}
              >
                <span className="truncate">{breakingNewsHeadlines[currentIndex]}</span>
              </Link>
            </div>
          </div>

          {/* Controls: Counter & Prev/Next Arrows */}
          <div className="flex items-center gap-1.5 shrink-0 text-[#526A70] pl-2.5 border-l border-[#E5DFD3]">
            <span className="text-[11px] font-mono font-medium hidden sm:inline text-[#0A2E36]">
              {currentIndex + 1} / {breakingNewsHeadlines.length}
            </span>
            <button
              onClick={handlePrev}
              className="p-1 rounded hover:bg-[#F7F4EC] hover:text-[#0A2E36] transition-colors cursor-pointer"
              aria-label="Previous breaking headline"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={handleNext}
              className="p-1 rounded hover:bg-[#F7F4EC] hover:text-[#0A2E36] transition-colors cursor-pointer"
              aria-label="Next breaking headline"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
