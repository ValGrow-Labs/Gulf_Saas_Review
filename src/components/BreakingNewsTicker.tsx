"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { breakingNewsHeadlines } from "@/data/news";
import { ChevronLeft, ChevronRight, Zap, Bell } from "lucide-react";

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
    <div
      className="w-full bg-[#101F35] text-[#FCFAF5] border-b border-[#C6A66B]/30 relative z-30"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="Breaking Technology News"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-11 items-center justify-between gap-3 text-xs sm:text-sm">
          {/* Breaking News Badge */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-[#C6A66B] px-2.5 py-0.5 text-[11px] sm:text-xs font-black uppercase tracking-wider text-[#101F35] shadow-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-[#101F35] animate-ping" />
              <span>Breaking</span>
            </span>
            <span className="text-[#C6A66B]/70 font-semibold hidden md:inline">|</span>
          </div>

          {/* Cycling Dynamic Headline */}
          <div className="flex-1 overflow-hidden min-w-0">
            <div className="flex items-center transition-all duration-300">
              <Link
                href="/news"
                className="truncate font-medium text-[#FCFAF5] hover:text-[#C6A66B] transition-colors flex items-center gap-2"
                title={breakingNewsHeadlines[currentIndex]}
              >
                <span className="truncate">{breakingNewsHeadlines[currentIndex]}</span>
              </Link>
            </div>
          </div>

          {/* Controls: Counter & Prev/Next Arrows */}
          <div className="flex items-center gap-1.5 shrink-0 text-[#E7E4DC]/80 pl-2">
            <span className="text-[11px] font-mono hidden sm:inline">
              {currentIndex + 1}/{breakingNewsHeadlines.length}
            </span>
            <button
              onClick={handlePrev}
              className="p-1 rounded hover:bg-[#172B46] hover:text-white transition-colors cursor-pointer"
              aria-label="Previous breaking headline"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={handleNext}
              className="p-1 rounded hover:bg-[#172B46] hover:text-white transition-colors cursor-pointer"
              aria-label="Next breaking headline"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
