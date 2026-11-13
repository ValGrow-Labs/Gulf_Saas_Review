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
      {/* Backdrop click to close */}
      <div className="fixed inset-0" onClick={closeSearch} />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-2xl rounded-2xl border border-[#C6A66B]/30 bg-[#FCFAF5] shadow-[0_25px_60px_rgba(16,31,53,0.35)] overflow-hidden z-10 flex flex-col max-h-[82vh]">
        {/* Search Header Bar */}
        <div className="relative flex items-center border-b border-[#E7E4DC] px-4 py-3.5 bg-white">
          <Search className="h-5 w-5 text-[#C6A66B] shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search software (e.g. Zoho, Odoo, ZATCA, CRM, UAE VAT)..."
            className="w-full bg-transparent text-sm text-[#101F35] placeholder-[#697386] focus:outline-none"
          />
          {query ? (
            <button
              onClick={() => setQuery("")}
              className="p-1 text-[#697386] hover:text-[#101F35]"
            >
              <X className="h-4 w-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block rounded border border-[#E7E4DC] bg-[#F6F1E7] px-2 py-0.5 text-[11px] font-mono text-[#697386]">
              ESC
            </kbd>
          )}
        </div>

        {/* Results Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          {/* Software Section */}
          {filteredSoftware.length > 0 && (
            <div>
              <div className="flex items-center justify-between pb-2 text-[11px] font-bold uppercase tracking-wider text-[#697386]">
                <span>Software Reviews</span>
                <Link
                  href="/reviews"
                  onClick={closeSearch}
                  className="text-[#C6A66B] hover:underline normal-case text-xs"
                >
                  View All &rarr;
                </Link>
              </div>
              <div className="grid gap-2">
                {filteredSoftware.map((item) => (
                  <Link
                    key={item.id}
                    href={`/reviews/${item.slug}`}
                    onClick={closeSearch}
                    className="group flex items-center justify-between rounded-xl border border-[#E7E4DC] bg-[#FCFAF5] p-3 hover:border-[#C6A66B] hover:bg-[#F6F1E7]/60 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white"
                        style={{ backgroundColor: item.accentColor || "#101F35" }}
                      >
                        {item.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-[#101F35] group-hover:text-[#C6A66B]">
                            {item.name}
                          </span>
                          <span className="text-[10px] text-[#697386] bg-[#E7E4DC]/50 px-1.5 py-0.5 rounded">
                            {item.categoryName}
                          </span>
                        </div>
                        <p className="text-xs text-[#697386] line-clamp-1 mt-0.5">
                          {item.tagline}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <div className="flex items-center gap-1 text-xs font-semibold text-[#101F35]">
                        <Star className="h-3 w-3 fill-[#C6A66B] text-[#C6A66B]" />
                        <span>{item.rating.toFixed(1)}</span>
                      </div>
                      <ArrowRight className="h-4 w-4 text-[#C6A66B] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Comparisons Section */}
          {filteredComparisons.length > 0 && (
            <div>
              <div className="flex items-center justify-between pb-2 text-[11px] font-bold uppercase tracking-wider text-[#697386]">
                <span>Side-by-Side Comparisons</span>
                <Link
                  href="/compare"
                  onClick={closeSearch}
                  className="text-[#C6A66B] hover:underline normal-case text-xs"
                >
                  All Comparisons &rarr;
                </Link>
              </div>
              <div className="grid gap-2">
                {filteredComparisons.map((c) => (
                  <Link
                    key={c.id}
                    href={`/compare/${c.slug}`}
                    onClick={closeSearch}
                    className="group flex items-center justify-between rounded-xl border border-[#E7E4DC] bg-[#FCFAF5] p-3 hover:border-[#C6A66B] hover:bg-[#F6F1E7]/60 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#101F35] text-[#C6A66B]">
                        <Scale className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="text-sm font-bold text-[#101F35] group-hover:text-[#C6A66B]">
                          {c.title}
                        </span>
                        <p className="text-xs text-[#697386] line-clamp-1">
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

          {/* Categories Section */}
          {filteredCategories.length > 0 && (
            <div>
              <div className="flex items-center justify-between pb-2 text-[11px] font-bold uppercase tracking-wider text-[#697386]">
                <span>Categories</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {filteredCategories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/categories/${cat.slug}`}
                    onClick={closeSearch}
                    className="flex items-center gap-2.5 rounded-lg border border-[#E7E4DC] p-2.5 hover:border-[#C6A66B] hover:bg-white text-xs font-semibold text-[#101F35]"
                  >
                    <Layers className="h-3.5 w-3.5 text-[#C6A66B]" />
                    <span>{cat.name}</span>
                    <span className="text-[10px] text-[#697386] ml-auto">
                      {cat.count}+ tools
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Articles Section */}
          {filteredArticles.length > 0 && (
            <div>
              <div className="flex items-center justify-between pb-2 text-[11px] font-bold uppercase tracking-wider text-[#697386]">
                <span>Editorial Guides & Insights</span>
              </div>
              <div className="grid gap-2">
                {filteredArticles.map((art) => (
                  <Link
                    key={art.id}
                    href={`/articles/${art.slug}`}
                    onClick={closeSearch}
                    className="group flex items-center justify-between rounded-xl border border-[#E7E4DC] p-3 hover:border-[#C6A66B] text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <FileText className="h-4 w-4 text-[#C6A66B] shrink-0" />
                      <div>
                        <span className="font-semibold text-[#101F35] group-hover:text-[#C6A66B]">
                          {art.title}
                        </span>
                        <div className="text-[10px] text-[#697386] mt-0.5">
                          {art.category} • {art.readTime}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer info in Modal */}
        <div className="border-t border-[#E7E4DC] bg-[#F6F1E7]/60 px-4 py-2.5 text-[11px] text-[#697386] flex items-center justify-between">
          <span>Independent evaluations for Saudi Arabia, UAE & GCC businesses</span>
          <span className="hidden sm:inline">Press ESC to dismiss</span>
        </div>
      </div>
    </div>
  );
}

