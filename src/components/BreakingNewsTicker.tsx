"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { breakingNewsHeadlines } from "@/data/news";
import { ChevronLeft, ChevronRight, Zap } from "lucide-react";

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
      className="w-full bg-[#FCFAF5] border-b border-[#E7E4DC] relative z-20"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Breaking Technology News"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-11 items-center justify-between gap-3 text-sm sm:text-[14.5px]">
          {/* Breaking News Label */}
          <div className="flex items-center gap-2.5 shrink-0">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-[#101F35] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#C6A66B]">
              <span className="h-2 w-2 rounded-full bg-[#C6A66B] animate-ping" />
              <span>Flash News</span>
            </span>
            <span className="text-[#C6A66B] font-bold hidden sm:inline">•</span>
          </div>

          {/* Cycling Dynamic Headline */}
          <div className="flex-1 overflow-hidden min-w-0">
            <div className="flex items-center">
              <Link
                href="/news"
                className="truncate font-semibold text-sm sm:text-base text-[#101F35] hover:text-[#C6A66B] transition-colors flex items-center gap-2"
                title={breakingNewsHeadlines[currentIndex]}
              >
                <span className="truncate">{breakingNewsHeadlines[currentIndex]}</span>
              </Link>
            </div>
          </div>

          {/* Controls: Counter & Prev/Next Arrows */}
          <div className="flex items-center gap-2 shrink-0 text-[#697386] pl-3 border-l border-[#E7E4DC]">
            <span className="text-xs font-mono font-medium hidden sm:inline text-[#101F35]">
              {currentIndex + 1} / {breakingNewsHeadlines.length}
            </span>
            <button
              onClick={handlePrev}
              className="p-1.5 rounded hover:bg-[#F6F1E7] hover:text-[#101F35] transition-colors cursor-pointer"
              aria-label="Previous breaking headline"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-1.5 rounded hover:bg-[#F6F1E7] hover:text-[#101F35] transition-colors cursor-pointer"
              aria-label="Next breaking headline"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
