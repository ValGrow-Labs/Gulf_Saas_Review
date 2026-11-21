"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { Category } from "@/types";
import {
  Calculator,
  Users,
  Briefcase,
  CheckSquare,
  Send,
  ShoppingBag,
  Layers,
  Headphones,
  ArrowLeft,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

const categoryIcons: Record<string, React.ElementType> = {
  Calculator,
  Users,
  Briefcase,
  CheckSquare,
  Send,
  ShoppingBag,
  Layers,
  Headphones,
};

interface CategorySliderProps {
  categories: Category[];
}

export default function CategorySlider({ categories }: CategorySliderProps) {
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
      { threshold: 0.15 }
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
    const cardWidth = el.querySelector<HTMLElement>(".category-card")?.offsetWidth || 340;
    el.scrollBy({ left: -(cardWidth + 16), behavior: "smooth" });
  };

  // Slide right by one card width
  const slideRight = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const cardWidth = el.querySelector<HTMLElement>(".category-card")?.offsetWidth || 340;
    el.scrollBy({ left: cardWidth + 16, behavior: "smooth" });
  };

  return (
    <div ref={sectionRef} className="space-y-6">
      {/* Section Header with Left/Right Circular Buttons (Atlassian / Jira style) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-3 border-b-2 border-[#E5DAC8]">
        <div>
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#15803D] mb-1">
            <Layers className="h-4 w-4" />
            <span>Browse by Business Need</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-[#064734] tracking-tight">
            Software Categories for Gulf Businesses
          </h2>
          <p className="mt-1 text-sm sm:text-base text-[#163A2E] font-medium max-w-3xl">
            Explore dedicated directories grouped by organizational function, verified for Middle Eastern legal and commercial standards.
          </p>
        </div>

        {/* Right: Circular Navigation Arrows + "View All" Link */}
        <div className="flex items-center gap-3 shrink-0 self-start md:self-end">
          <Link
            href="/categories"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#064734] hover:text-[#15803D] transition-colors mr-2"
          >
            <span>View All ({categories.length})</span>
            <ChevronRight className="h-4 w-4" />
          </Link>

          {/* Left Arrow Button (Circular) */}
          <button
            type="button"
            onClick={slideLeft}
            disabled={!canScrollLeft}
            aria-label="Previous categories"
            className={`h-11 w-11 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm ${
              canScrollLeft
                ? "bg-[#064734] text-white hover:bg-[#043224] active:scale-95 cursor-pointer"
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
            aria-label="Next categories"
            className={`h-11 w-11 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm ${
              canScrollRight
                ? "bg-[#064734] text-white hover:bg-[#043224] active:scale-95 cursor-pointer"
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
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#FFF8EF] to-transparent z-10 pointer-events-none" />
        )}
        {canScrollRight && (
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#FFF8EF] to-transparent z-10 pointer-events-none" />
        )}

        <div
          ref={scrollContainerRef}
          className="flex items-stretch gap-4 sm:gap-5 overflow-x-auto scroll-smooth pb-4 pt-1 snap-x snap-mandatory scrollbar-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {categories.map((cat, idx) => {
            const IconComponent = categoryIcons[cat.iconName] || Layers;
            // Progressive right-to-left slide animation on scroll into view
            const staggerDelay = `${idx * 85}ms`;

            return (
              <Link
                key={cat.id}
                href={`/reviews?category=${cat.slug}`}
                style={{
                  transitionDelay: hasEnteredView ? staggerDelay : "0ms",
                }}
                className={`category-card group flex flex-col justify-between w-[290px] sm:w-[330px] md:w-[350px] shrink-0 snap-start rounded-2xl border-2 border-[#E5DAC8] bg-white p-5 transition-all duration-500 hover:border-[#064734] hover:shadow-md cursor-pointer ${
                  hasEnteredView
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-16"
                }`}
              >
                <div>
                  {/* Top Bar: Icon & Count Badge */}
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#064734] text-[#15803D] group-hover:bg-[#E0FFC2] group-hover:text-[#064734] transition-colors duration-200 shadow-2xs">
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <span className="rounded-lg bg-[#E0FFC2] border border-[#BDE895] px-2.5 py-1 text-xs font-extrabold text-[#064734]">
                      {cat.count}+ tools
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-[#064734] group-hover:text-[#15803D] transition-colors leading-snug">
                    {cat.name}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-xs sm:text-sm text-[#3C6152] font-medium line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                {/* Bottom CTA */}
                <div className="mt-4 pt-3 border-t-2 border-[#E5DAC8]/80 flex items-center justify-between text-xs sm:text-sm font-bold text-[#064734] group-hover:text-[#15803D] transition-colors">
                  <span>Explore Tools</span>
                  <ArrowRight className="h-4 w-4 text-[#15803D] transform group-hover:translate-x-1.5 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
