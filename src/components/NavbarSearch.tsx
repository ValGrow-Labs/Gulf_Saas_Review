"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { softwares } from "@/data/software";
import { Search, X, Star, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

const quickCategories = [
  { id: "all", label: "All" },
  { id: "erp-business-management", label: "ERP" },
  { id: "accounting-finance", label: "Accounting" },
  { id: "crm-sales", label: "CRM" },
  { id: "hr-payroll", label: "HR & Payroll" },
  { id: "customer-support", label: "Support" },
];

export default function NavbarSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard shortcut: Cmd/Ctrl + K to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen(true);
        inputRef.current?.focus();
      }
      if (e.key === "Escape") {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const cleanQuery = query.toLowerCase().trim();

  // Filter ONLY softwares (zero news or comparisons)
  const filteredSoftwares = useMemo(() => {
    return softwares.filter((s) => {
      // Category filter
      if (activeCategory !== "all" && s.category !== activeCategory) {
        return false;
      }
      // Text query filter
      if (cleanQuery) {
        const matchName = s.name.toLowerCase().includes(cleanQuery);
        const matchCategory = s.categoryName.toLowerCase().includes(cleanQuery);
        const matchDesc = s.description.toLowerCase().includes(cleanQuery);
        const matchTagline = s.tagline.toLowerCase().includes(cleanQuery);
        const matchCountry = s.countrySuitability.some((c) =>
          c.toLowerCase().includes(cleanQuery)
        );
        const matchCompliance = s.localCompliance.some((l) =>
          l.toLowerCase().includes(cleanQuery)
        );
        const matchArabic = s.arabicSupport.toLowerCase().includes(cleanQuery);
        return (
          matchName ||
          matchCategory ||
          matchDesc ||
          matchTagline ||
          matchCountry ||
          matchCompliance ||
          matchArabic
        );
      }
      return true;
    });
  }, [cleanQuery, activeCategory]);

  const displayedList = cleanQuery
    ? filteredSoftwares.slice(0, 7)
    : activeCategory !== "all"
    ? filteredSoftwares.slice(0, 6)
    : filteredSoftwares.slice(0, 5);

  return (
    <div ref={containerRef} className="relative">
      {/* Search Input Bar (Placed in the Navigation Row) */}
      <div className="relative flex items-center w-64 xl:w-76 h-9 sm:h-10 rounded-xl border border-[#E5DAC8] bg-white px-3 shadow-2xs hover:border-[#064734] focus-within:border-[#064734] focus-within:ring-2 focus-within:ring-[#E0FFC2] transition-all">
        <Search className="h-4 w-4 text-[#064734] shrink-0 mr-2" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          placeholder="Search software (Odoo, Zoho)..."
          className="w-full bg-transparent text-xs sm:text-sm font-semibold text-[#064734] placeholder-[#8BA4A9] focus:outline-none"
        />
        {query ? (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            className="p-1 text-[#3C6152] hover:text-[#064734] cursor-pointer"
            aria-label="Clear search query"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        ) : (
          <kbd className="hidden xl:inline-flex items-center rounded border border-[#E5DAC8] bg-[#FFF8EF] px-1.5 py-0.5 text-[10px] text-[#064734] font-mono font-bold shrink-0">
            ⌘K
          </kbd>
        )}
      </div>

      {/* Floating Instant Software Results Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-[420px] sm:w-[480px] rounded-2xl border-2 border-[#E5DAC8] bg-white p-3.5 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          {/* Header & Quick Category Filter Pills */}
          <div className="pb-3 border-b border-[#E5DAC8]">
            <div className="flex items-center justify-between text-xs font-extrabold uppercase tracking-wider text-[#064734] mb-2 px-1">
              <span className="flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-[#15803D]" />
                {cleanQuery ? "Matching Softwares" : "Explore Software Tools"}
              </span>
              <span className="text-[#15803D] font-bold">
                {filteredSoftwares.length} found
              </span>
            </div>

            {/* Category Filter Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
              {quickCategories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className={`rounded-lg px-2.5 py-1 text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#064734] text-white shadow-2xs"
                        : "bg-[#FFF8EF] text-[#064734] hover:bg-[#E5DAC8]/60"
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Software Items List (Shows ONLY Softwares) */}
          <div className="mt-2.5 space-y-2 max-h-[360px] overflow-y-auto pr-1">
            {displayedList.length > 0 ? (
              displayedList.map((sw) => (
                <Link
                  key={sw.id}
                  href={`/reviews/${sw.slug}`}
                  onClick={() => setIsOpen(false)}
                  className="group flex items-center justify-between gap-3 p-2.5 rounded-xl border border-[#E5DAC8] bg-white hover:border-[#064734] hover:bg-[#FFF8EF]/60 transition-all shadow-2xs"
                >
                  {/* Left: Monogram Logo & Name/Category */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="h-10 w-10 rounded-xl flex items-center justify-center text-xs font-extrabold text-white shrink-0 shadow-2xs"
                      style={{ backgroundColor: sw.accentColor || "#064734" }}
                    >
                      {sw.name.substring(0, 2).toUpperCase()}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm sm:text-base text-[#064734] group-hover:text-[#15803D] transition-colors truncate">
                          {sw.name}
                        </span>
                        <span className="text-[11px] font-bold bg-[#E0FFC2] text-[#064734] border border-[#BDE895] px-1.5 py-0.2 rounded shrink-0">
                          {sw.categoryName}
                        </span>
                      </div>

                      {/* 1-Line Tagline / Compliance */}
                      <p className="text-xs text-[#3C6152] font-medium truncate mt-0.5">
                        {sw.localCompliance?.[0] || sw.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Right: Score & Arrow */}
                  <div className="flex items-center gap-2.5 shrink-0 pl-1">
                    <div className="flex items-center gap-1 text-xs sm:text-sm font-extrabold text-[#064734]">
                      <Star className="h-3.5 w-3.5 fill-[#D97706] text-[#D97706]" />
                      <span>{sw.rating.toFixed(1)}</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-[#15803D] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Link>
              ))
            ) : (
              <div className="py-8 text-center">
                <p className="text-sm font-bold text-[#064734]">
                  No software found matching &ldquo;{query}&rdquo;
                </p>
                <p className="text-xs text-[#3C6152] mt-1">
                  Try searching for Odoo, Zoho, QuickBooks, ERP, or ZATCA.
                </p>
              </div>
            )}
          </div>

          {/* Footer Bar */}
          <div className="mt-3 pt-2.5 border-t border-[#E5DAC8] flex items-center justify-between text-xs text-[#3C6152] font-semibold px-1">
            <span>Only verified GCC business software</span>
            <Link
              href="/reviews"
              onClick={() => setIsOpen(false)}
              className="text-[#15803D] hover:text-[#064734] font-bold inline-flex items-center gap-1"
            >
              <span>View All 50+ Tools</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
