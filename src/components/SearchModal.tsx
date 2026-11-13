"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { softwares } from "@/data/software";
import { comparisons } from "@/data/comparisons";
import { categories } from "@/data/categories";
import { articles } from "@/data/articles";
import { Search, X, ArrowRight, Layers, FileText, Scale, Star } from "lucide-react";

export default function SearchModal() {
  const { isSearchOpen, closeSearch } = useApp();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setQuery("");
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const cleanQuery = query.toLowerCase().trim();

  const filteredSoftware = cleanQuery
    ? softwares.filter(
        (s) =>
          s.name.toLowerCase().includes(cleanQuery) ||
          s.description.toLowerCase().includes(cleanQuery) ||
          s.categoryName.toLowerCase().includes(cleanQuery) ||
          s.countrySuitability.some((c) => c.toLowerCase().includes(cleanQuery)) ||
          s.localCompliance.some((l) => l.toLowerCase().includes(cleanQuery))
      )
    : softwares.slice(0, 4);

  const filteredComparisons = cleanQuery
    ? comparisons.filter(
        (c) =>
          c.title.toLowerCase().includes(cleanQuery) ||
          c.shortDescription.toLowerCase().includes(cleanQuery)
      )
    : comparisons.slice(0, 2);

  const filteredCategories = cleanQuery
    ? categories.filter(
        (cat) =>
          cat.name.toLowerCase().includes(cleanQuery) ||
          cat.description.toLowerCase().includes(cleanQuery)
      )
    : categories.slice(0, 3);

  const filteredArticles = cleanQuery
    ? articles.filter(
        (a) =>
          a.title.toLowerCase().includes(cleanQuery) ||
          a.excerpt.toLowerCase().includes(cleanQuery)
      )
    : articles.slice(0, 2);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-14 sm:pt-20 px-4 bg-[#101F35]/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={closeSearch} />

      <div className="relative w-full max-w-2xl rounded-2xl border border-[#C6A66B]/40 bg-[#FCFAF5] shadow-[0_25px_60px_rgba(16,31,53,0.35)] overflow-hidden z-10 flex flex-col max-h-[82vh]">
        {/* Search Header Bar */}
        <div className="relative flex items-center border-b border-[#E7E4DC] px-5 py-4 bg-white">
          <Search className="h-6 w-6 text-[#C6A66B] shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search software (e.g. Zoho, Odoo, ZATCA, CRM, UAE VAT)..."
            className="w-full bg-transparent text-[17px] sm:text-[18px] text-[#101F35] placeholder-[#64748B] focus:outline-none"
          />
          {query ? (
            <button
              onClick={() => setQuery("")}
              className="p-1.5 text-[#64748B] hover:text-[#101F35] cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block rounded border border-[#E7E4DC] bg-[#F6F1E7] px-2 py-0.5 text-[12px] font-mono text-[#64748B]">
              ESC
            </kbd>
          )}
        </div>

        {/* Results Scroll Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {filteredSoftware.length > 0 && (
            <div>
              <div className="flex items-center justify-between pb-2 text-[14px] font-bold uppercase tracking-wider text-[#64748B]">
                <span>Software Reviews</span>
                <Link
                  href="/reviews"
                  onClick={closeSearch}
                  className="text-[#C6A66B] hover:underline normal-case text-[14px]"
                >
                  View All &rarr;
                </Link>
              </div>
              <div className="grid gap-2.5">
                {filteredSoftware.map((item) => (
                  <Link
                    key={item.id}
                    href={`/reviews/${item.slug}`}
                    onClick={closeSearch}
                    className="group flex items-center justify-between rounded-xl border border-[#E7E4DC] bg-[#FCFAF5] p-3.5 hover:border-[#C6A66B] hover:bg-[#F6F1E7]/60 transition-all"
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white"
                        style={{ backgroundColor: item.accentColor || "#101F35" }}
                      >
                        {item.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[17px] font-bold text-[#101F35] group-hover:text-[#C6A66B]">
                            {item.name}
                          </span>
                          <span className="text-[12px] font-bold text-[#64748B] bg-[#E7E4DC]/60 px-2 py-0.5 rounded">
                            {item.categoryName}
                          </span>
                        </div>
                        <p className="text-[15px] text-[#475569] line-clamp-1 mt-0.5">
                          {item.tagline}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5 shrink-0">
                      <div className="flex items-center gap-1 text-[15px] font-bold text-[#101F35]">
                        <Star className="h-4 w-4 fill-[#C6A66B] text-[#C6A66B]" />
                        <span>{item.rating.toFixed(1)}</span>
                      </div>
                      <ArrowRight className="h-4 w-4 text-[#C6A66B] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {filteredComparisons.length > 0 && (
            <div>
              <div className="flex items-center justify-between pb-2 text-[14px] font-bold uppercase tracking-wider text-[#64748B]">
                <span>Side-by-Side Comparisons</span>
                <Link
                  href="/compare"
                  onClick={closeSearch}
                  className="text-[#C6A66B] hover:underline normal-case text-[14px]"
                >
                  All Comparisons &rarr;
                </Link>
              </div>
              <div className="grid gap-2.5">
                {filteredComparisons.map((c) => (
                  <Link
                    key={c.id}
                    href={`/compare/${c.slug}`}
                    onClick={closeSearch}
                    className="group flex items-center justify-between rounded-xl border border-[#E7E4DC] bg-[#FCFAF5] p-3.5 hover:border-[#C6A66B] hover:bg-[#F6F1E7]/60 transition-all"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#101F35] text-[#C6A66B]">
                        <Scale className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="text-[16px] font-bold text-[#101F35] group-hover:text-[#C6A66B]">
                          {c.title}
                        </span>
                        <p className="text-[14px] text-[#475569] line-clamp-1">
                          {c.shortDescription}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-[#C6A66B] shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-[#E7E4DC] bg-[#F6F1E7]/70 px-5 py-3 text-[14px] text-[#64748B] flex items-center justify-between">
          <span>Independent evaluations for Saudi Arabia, UAE &amp; GCC businesses</span>
          <span className="hidden sm:inline">Press ESC to dismiss</span>
        </div>
      </div>
    </div>
  );
}
