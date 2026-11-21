"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { softwares } from "@/data/software";
import { Search, X, ArrowRight, Star, Sparkles } from "lucide-react";

const quickCategories = [
  { id: "all", label: "All Softwares" },
  { id: "erp-business-management", label: "ERP" },
  { id: "accounting-finance", label: "Accounting" },
  { id: "crm-sales", label: "CRM" },
  { id: "hr-payroll", label: "HR & Payroll" },
  { id: "customer-support", label: "Customer Desks" },
];

export default function SearchModal() {
  const { isSearchOpen, closeSearch } = useApp();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setQuery("");
      setActiveCategory("all");
    }
  }, [isSearchOpen]);

  const cleanQuery = query.toLowerCase().trim();

  // Shows ONLY softwares (zero comparisons, zero news)
  const filteredSoftware = useMemo(() => {
    return softwares.filter((s) => {
      if (activeCategory !== "all" && s.category !== activeCategory) {
        return false;
      }
      if (cleanQuery) {
        const matchName = s.name.toLowerCase().includes(cleanQuery);
        const matchDesc = s.description.toLowerCase().includes(cleanQuery);
        const matchCategory = s.categoryName.toLowerCase().includes(cleanQuery);
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
          matchDesc ||
          matchCategory ||
          matchTagline ||
          matchCountry ||
          matchCompliance ||
          matchArabic
        );
      }
      return true;
    });
  }, [cleanQuery, activeCategory]);

  if (!isSearchOpen) return null;

  const displayedList = cleanQuery
    ? filteredSoftware.slice(0, 10)
    : activeCategory !== "all"
    ? filteredSoftware.slice(0, 8)
    : filteredSoftware.slice(0, 6);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-14 sm:pt-20 px-4 bg-[#064734]/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={closeSearch} />

      <div className="relative w-full max-w-2xl rounded-2xl border-2 border-[#E0FFC2]/40 bg-[#FFF8EF] shadow-[0_25px_60px_rgba(6, 71, 52,0.5)] overflow-hidden z-10 flex flex-col max-h-[82vh]">
        {/* Search Header Bar */}
        <div className="relative flex items-center border-b-2 border-[#E5DAC8] px-6 py-4.5 bg-white">
          <Search className="h-6 w-6 text-[#15803D] shrink-0 mr-3.5" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search business software (e.g. Odoo, Zoho, ZATCA, WPS)..."
            className="w-full bg-transparent text-lg sm:text-xl text-[#064734] placeholder-[#8BA4A9] focus:outline-none font-bold"
          />
          {query ? (
            <button
              onClick={() => setQuery("")}
              className="p-1.5 text-[#3C6152] hover:text-[#064734] cursor-pointer"
            >
              <X className="h-6 w-6" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block rounded-md border-2 border-[#E5DAC8] bg-[#FFF8EF] px-2.5 py-1 text-xs font-mono font-bold text-[#064734]">
              ESC
            </kbd>
          )}
        </div>

        {/* Quick Category Filter Pills */}
        <div className="px-6 py-3 bg-[#FFF8EF] border-b border-[#E5DAC8] flex items-center gap-2 overflow-x-auto scrollbar-none">
          {quickCategories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#064734] text-white shadow-2xs"
                    : "bg-white text-[#064734] border border-[#E5DAC8] hover:border-[#064734]"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Results Scroll Area (Shows ONLY Softwares) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="flex items-center justify-between pb-1 text-xs font-extrabold uppercase tracking-wider text-[#15803D]">
            <span className="flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              {cleanQuery ? `Software Results (${filteredSoftware.length})` : "Verified Gulf Business Software"}
            </span>
            <Link
              href="/reviews"
              onClick={closeSearch}
              className="text-[#064734] hover:text-[#15803D] font-bold normal-case text-xs"
            >
              View All 50+ &rarr;
            </Link>
          </div>

          <div className="grid gap-3">
            {displayedList.length > 0 ? (
              displayedList.map((item) => (
                <Link
                  key={item.id}
                  href={`/reviews/${item.slug}`}
                  onClick={closeSearch}
                  className="group flex items-center justify-between rounded-xl border-2 border-[#E5DAC8] bg-white p-4 hover:border-[#064734] hover:bg-[#FFF8EF]/50 transition-all shadow-2xs"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-extrabold text-white shadow-2xs"
                      style={{ backgroundColor: item.accentColor || "#064734" }}
                    >
                      {item.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-base sm:text-lg font-bold text-[#064734] group-hover:text-[#15803D] truncate">
                          {item.name}
                        </span>
                        <span className="text-xs font-bold text-[#064734] bg-[#E0FFC2] border border-[#BDE895] px-2 py-0.5 rounded">
                          {item.categoryName}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#163A2E] font-medium truncate mt-0.5">
                        {item.localCompliance?.[0] || item.tagline}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 pl-2">
                    <div className="flex items-center gap-1 text-sm sm:text-base font-extrabold text-[#064734]">
                      <Star className="h-4 w-4 fill-[#D97706] text-[#15803D]" />
                      <span>{item.rating.toFixed(1)}</span>
                    </div>
                    <ArrowRight className="h-5 w-5 text-[#15803D] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Link>
              ))
            ) : (
              <div className="py-10 text-center bg-white rounded-xl border border-[#E5DAC8] p-6">
                <p className="text-base font-bold text-[#064734]">
                  No software found matching &ldquo;{query}&rdquo;
                </p>
                <p className="text-xs text-[#3C6152] mt-1.5">
                  Try searching for Odoo, Zoho, QuickBooks, Accounting, ZATCA, or CRM.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="border-t-2 border-[#E5DAC8] bg-white px-6 py-3.5 text-xs sm:text-sm font-semibold text-[#3C6152] flex items-center justify-between">
          <span>Software directory for Saudi Arabia, UAE &amp; GCC</span>
          <span className="font-bold">Press ESC to dismiss</span>
        </div>
      </div>
    </div>
  );
}
