"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight, Sparkles } from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function HeroSearch() {
  const router = useRouter();
  const { openSearch } = useApp();
  const [query, setQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/reviews?q=${encodeURIComponent(query.trim())}`);
    } else {
      openSearch();
    }
  };

  const popularTerms = [
    { label: "Accounting & VAT", query: "accounting" },
    { label: "ZATCA Phase 2", query: "ZATCA" },
    { label: "HR & Payroll (WPS)", query: "payroll" },
    { label: "CRM & Sales", query: "CRM" },
    { label: "ERP Systems", query: "ERP" },
    { label: "Arabic RTL", query: "Arabic" },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Search Bar Container */}
      <form
        onSubmit={handleSearchSubmit}
        className="relative flex flex-col sm:flex-row items-stretch sm:items-center rounded-2xl border-2 border-[#064734]/15 bg-white p-2 shadow-[0_12px_32px_rgba(11,61,46,0.08)] hover:border-[#064734] focus-within:border-[#15803D] transition-all duration-200"
      >
        <div className="relative flex-1 flex items-center pl-3 pr-2 py-1">
          <Search className="h-5 w-5 text-[#15803D] shrink-0 mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search 50+ tools (e.g., Odoo, Zoho, QuickBooks, Accounting, ZATCA, WPS)..."
            className="w-full text-base sm:text-lg text-[#064734] placeholder-[#8BA4A9] bg-transparent focus:outline-none font-medium"
          />
        </div>

        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#064734] px-6 py-3.5 text-base font-bold text-white hover:bg-[#064734] text-[#E0FFC2] active:scale-98 transition-all shadow-md shrink-0 cursor-pointer mt-2 sm:mt-0"
        >
          <span>Find Software</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>

      {/* Popular Search Shortcuts */}
      <div className="mt-3.5 flex flex-wrap items-center justify-center gap-2 text-xs sm:text-[13px]">
        <span className="font-bold uppercase tracking-wider text-[#4A6D5F] flex items-center gap-1">
          <Sparkles className="h-3 w-3 text-[#15803D]" />
          Popular:
        </span>
        {popularTerms.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={() => router.push(`/reviews?q=${encodeURIComponent(item.query)}`)}
            className="rounded-lg bg-white/90 border border-[#E5DAC8] px-2.5 py-1 font-semibold text-[#064734] hover:border-[#064734] hover:text-[#15803D] hover:bg-white transition-all shadow-2xs cursor-pointer"
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

