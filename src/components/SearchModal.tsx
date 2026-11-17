"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { softwares } from "@/data/software";
import { comparisons } from "@/data/comparisons";
import { categories } from "@/data/categories";
import { newsArticles } from "@/data/news";
import { Search, X, ArrowRight, Newspaper, Scale, Star } from "lucide-react";

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

  const filteredNews = cleanQuery
    ? newsArticles.filter(
        (n) =>
          n.title.toLowerCase().includes(cleanQuery) ||
          n.excerpt.toLowerCase().includes(cleanQuery) ||
          n.country.toLowerCase().includes(cleanQuery) ||
          n.category.toLowerCase().includes(cleanQuery)
      )
    : newsArticles.slice(0, 3);

  const filteredSoftware = cleanQuery
    ? softwares.filter(
        (s) =>
          s.name.toLowerCase().includes(cleanQuery) ||
          s.description.toLowerCase().includes(cleanQuery) ||
          s.categoryName.toLowerCase().includes(cleanQuery) ||
          s.countrySuitability.some((c) => c.toLowerCase().includes(cleanQuery)) ||
          s.localCompliance.some((l) => l.toLowerCase().includes(cleanQuery))
      )
    : softwares.slice(0, 3);

  const filteredComparisons = cleanQuery
    ? comparisons.filter(
        (c) =>
          c.title.toLowerCase().includes(cleanQuery) ||
          c.shortDescription.toLowerCase().includes(cleanQuery)
      )
    : comparisons.slice(0, 2);

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
            placeholder="Search news, AI, software (e.g. Saudi Vision, Odoo, ZATCA, UAE VAT)..."
            className="w-full bg-transparent text-[17px] sm:text-[18px] text-[#101F35] placeholder-[#697386] focus:outline-none"
          />
          {query ? (
            <button
              onClick={() => setQuery("")}
              className="p-1.5 text-[#697386] hover:text-[#101F35] cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block rounded border border-[#E7E4DC] bg-[#F6F1E7] px-2 py-0.5 text-[12px] font-mono text-[#697386]">
              ESC
            </kbd>
          )}
        </div>

        {/* Results Scroll Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* News Dispatches */}
          {filteredNews.length > 0 && (
            <div>
              <div className="flex items-center justify-between pb-2 text-[14px] font-bold uppercase tracking-wider text-[#697386]">
                <span className="flex items-center gap-1.5">
                  <Newspaper className="h-4 w-4 text-[#C6A66B]" />
                  <span>Gulf Tech News &amp; Briefings</span>
                </span>
                <Link
                  href="/news"
                  onClick={closeSearch}
                  className="text-[#101F35] hover:text-[#C6A66B] font-bold normal-case text-[14px]"
                >
                  All News &rarr;
                </Link>
              </div>
              <div className="grid gap-2.5">
                {filteredNews.map((item) => (
                  <Link
                    key={item.id}
                    href={`/news/${item.slug}`}
                    onClick={closeSearch}
                    className="group flex items-center justify-between rounded-xl border border-[#E7E4DC] bg-white p-3.5 hover:border-[#C6A66B] hover:bg-[#F6F1E7]/40 transition-all"
                  >
                    <div className="min-w-0 pr-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#C6A66B]">
                          {item.country}
                        </span>
                        <span className="text-xs text-[#697386]">• {item.category}</span>
                      </div>
                      <h4 className="text-[16px] font-bold font-editorial text-[#101F35] group-hover:text-[#C6A66B] line-clamp-1">
                        {item.title}
                      </h4>
                    </div>
                    <ArrowRight className="h-4 w-4 text-[#C6A66B] shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Software Reviews */}
          {filteredSoftware.length > 0 && (
            <div>
              <div className="flex items-center justify-between pb-2 text-[14px] font-bold uppercase tracking-wider text-[#697386]">
                <span>Software Reviews</span>
                <Link
                  href="/reviews"
                  onClick={closeSearch}
                  className="text-[#101F35] hover:text-[#C6A66B] font-bold normal-case text-[14px]"
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
                    className="group flex items-center justify-between rounded-xl border border-[#E7E4DC] bg-white p-3.5 hover:border-[#C6A66B] hover:bg-[#F6F1E7]/40 transition-all"
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
                          <span className="text-[12px] font-bold text-[#697386] bg-[#E7E4DC]/60 px-2 py-0.5 rounded">
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

          {/* Comparisons */}
          {filteredComparisons.length > 0 && (
            <div>
              <div className="flex items-center justify-between pb-2 text-[14px] font-bold uppercase tracking-wider text-[#697386]">
                <span>Side-by-Side Comparisons</span>
                <Link
                  href="/compare"
                  onClick={closeSearch}
                  className="text-[#101F35] hover:text-[#C6A66B] font-bold normal-case text-[14px]"
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
                    className="group flex items-center justify-between rounded-xl border border-[#E7E4DC] bg-white p-3.5 hover:border-[#C6A66B] hover:bg-[#F6F1E7]/40 transition-all"
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

        <div className="border-t border-[#E7E4DC] bg-[#F6F1E7]/70 px-5 py-3 text-[14px] text-[#697386] flex items-center justify-between">
          <span>Independent evaluations for Saudi Arabia, UAE &amp; GCC businesses</span>
          <span className="hidden sm:inline">Press ESC to dismiss</span>
        </div>
      </div>
    </div>
  );
}
