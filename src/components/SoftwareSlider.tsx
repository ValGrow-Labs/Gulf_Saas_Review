"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { Software } from "@/types";
import SoftwareCard from "@/components/SoftwareCard";
import {
  ShieldCheck,
  Scale,
  ArrowLeft,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

interface SoftwareSliderProps {
  softwares: Software[];
}

export default function SoftwareSlider({ softwares }: SoftwareSliderProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [hasEnteredView, setHasEnteredView] = useState(false);

  // Check scroll position to enable/disable arrow buttons
  const checkScrollability = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

  useEffect(() => {
    checkScrollability();
    const el = scrollContainerRef.current;
    if (el) {
      el.addEventListener("scroll", checkScrollability, { passive: true });
    }
    window.addEventListener("resize", checkScrollability);
    return () => {
      if (el) el.removeEventListener("scroll", checkScrollability);
      window.removeEventListener("resize", checkScrollability);
    };
  }, []);

  // Trigger one-by-one slide-in animation when scrolled into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEnteredView(true);
        }
      },
      { threshold: 0.12 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Slide left by one card width
  const slideLeft = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".software-slide-card");
    const cardWidth = card ? card.offsetWidth : 360;
    el.scrollBy({ left: -(cardWidth + 20), behavior: "smooth" });
  };

  // Slide right by one card width
  const slideRight = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".software-slide-card");
    const cardWidth = card ? card.offsetWidth : 360;
    el.scrollBy({ left: cardWidth + 20, behavior: "smooth" });
  };

  return (
    <div ref={sectionRef} className="space-y-6">
      {/* Section Header with Left/Right Circular Buttons (Atlassian / Jira style) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-3 border-b-2 border-[#E5DAC8]">
        <div>
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#15803D] mb-1">
            <ShieldCheck className="h-4 w-4" />
            <span>Featured Independent Evaluations</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-[#064734] tracking-tight">
            Top-Rated Software for Gulf Enterprises &amp; SMBs
          </h2>
          <p className="mt-1 text-sm sm:text-base text-[#163A2E] font-medium max-w-3xl">
            Independently audited for Saudi Arabia ZATCA Phase 2, UAE FTA VAT filing, multi-currency support, and localized client portals.
          </p>
        </div>

        {/* Right: Compare button, Directory link, and Circular Arrow Buttons */}
        <div className="flex items-center gap-3 shrink-0 self-start md:self-end">
          <Link
            href="/compare"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border-2 border-[#E5DAC8] bg-white px-3.5 py-2 text-xs sm:text-sm font-bold text-[#064734] hover:border-[#064734] hover:text-[#064734] transition-colors shadow-2xs"
          >
            <Scale className="h-4 w-4 text-[#15803D]" />
            <span>Compare Tools</span>
          </Link>

          <Link
            href="/reviews"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-xl bg-[#064734] px-4 py-2 text-xs sm:text-sm font-bold text-white hover:bg-[#043224] transition-colors shadow-xs"
          >
            <span>Full Directory ({softwares.length}+)</span>
            <ChevronRight className="h-4 w-4" />
          </Link>

          {/* Left Arrow Button (Circular) */}
          <button
            type="button"
            onClick={slideLeft}
            disabled={!canScrollLeft}
            aria-label="Previous softwares"
            className={`h-11 w-11 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm ${
              canScrollLeft
                ? "bg-[#064734] text-[#E0FFC2] hover:bg-[#043224] active:scale-95 cursor-pointer"
                : "bg-[#E5DAC8] text-[#3C6152]/40 cursor-not-allowed opacity-50"
            }`}
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          {/* Right Arrow Button (Circular) */}
          <button
            type="button"
            onClick={slideRight}
            disabled={!canScrollRight}
            aria-label="Next softwares"
            className={`h-11 w-11 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm ${
              canScrollRight
                ? "bg-[#064734] text-[#E0FFC2] hover:bg-[#043224] active:scale-95 cursor-pointer"
                : "bg-[#E5DAC8] text-[#3C6152]/40 cursor-not-allowed opacity-50"
            }`}
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Horizontal Sliding Track (Comes from right to left one by one) */}
      <div className="relative">
        {/* Subtle gradient edge shadows to hint scrollability */}
        {canScrollLeft && (
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#F4ECE1] to-transparent z-10 pointer-events-none" />
        )}
        {canScrollRight && (
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#F4ECE1] to-transparent z-10 pointer-events-none" />
        )}

        <div
          ref={scrollContainerRef}
          className="flex items-stretch gap-5 overflow-x-auto scroll-smooth pb-4 pt-1 snap-x snap-mandatory scrollbar-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {softwares.map((software, idx) => {
            // Progressive right-to-left slide animation on scroll into view
            const staggerDelay = `${idx * 80}ms`;

            return (
              <div
                key={software.id}
                style={{
                  transitionDelay: hasEnteredView ? staggerDelay : "0ms",
                }}
                className={`software-slide-card w-[320px] sm:w-[360px] md:w-[380px] shrink-0 snap-start transition-all duration-500 flex flex-col ${
                  hasEnteredView
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-16"
                }`}
              >
                <SoftwareCard software={software} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
