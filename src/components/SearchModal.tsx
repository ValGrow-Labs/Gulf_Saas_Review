"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { softwares } from "@/data/software";
import { sectionLabel, shortDate } from "@/lib/news";
import type { NewsArticle } from "@/types";

/** Light story shape passed from the server layout (published stories only). */
export type SearchStory = Pick<NewsArticle, "id" | "slug" | "title" | "excerpt" | "tags" | "categorySlug" | "isoDate" | "publishedDate">;
import Monogram from "./Monogram";

const quickCategories = [
  { id: "all", label: "All" },
  { id: "erp-business-management", label: "ERP" },
  { id: "accounting-finance", label: "Accounting" },
  { id: "crm-sales", label: "CRM" },
  { id: "hr-payroll", label: "HR & payroll" },
  { id: "customer-support", label: "Support" },
];

export default function SearchModal({ stories = [] }: { stories?: SearchStory[] }) {
  const { isSearchOpen } = useApp();
  // Mount the palette only while open, so its query/filter state starts fresh each time.
  return isSearchOpen ? <SearchPalette stories={stories} /> : null;
}

function SearchPalette({ stories }: { stories: SearchStory[] }) {
  const { closeSearch } = useApp();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 20);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(t);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  const cleanQuery = query.toLowerCase().trim();

  const filteredSoftware = useMemo(() => {
    return softwares.filter((s) => {
      if (activeCategory !== "all" && s.category !== activeCategory) return false;
      if (!cleanQuery) return true;
      return (
        s.name.toLowerCase().includes(cleanQuery) ||
        s.description.toLowerCase().includes(cleanQuery) ||
        s.categoryName.toLowerCase().includes(cleanQuery) ||
        s.tagline.toLowerCase().includes(cleanQuery) ||
        s.countrySuitability.some((c) => c.toLowerCase().includes(cleanQuery)) ||
        s.localCompliance.some((l) => l.toLowerCase().includes(cleanQuery)) ||
        s.arabicSupport.toLowerCase().includes(cleanQuery)
      );
    });
  }, [cleanQuery, activeCategory]);

  const matchingStories = useMemo(() => {
    if (!cleanQuery || activeCategory !== "all") return [];
    return stories
      .filter(
        (n) =>
          n.title.toLowerCase().includes(cleanQuery) ||
          n.excerpt.toLowerCase().includes(cleanQuery) ||
          n.tags.some((t) => t.toLowerCase().includes(cleanQuery))
      )
      .slice(0, 4);
  }, [cleanQuery, activeCategory, stories]);

  const displayedList = cleanQuery
    ? filteredSoftware.slice(0, 8)
    : activeCategory !== "all"
    ? filteredSoftware.slice(0, 8)
    : filteredSoftware.slice(0, 6);

  const safeIndex = Math.min(activeIndex, Math.max(displayedList.length - 1, 0));

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      closeSearch();
    } else if (e.key === "ArrowDown" && displayedList.length) {
      e.preventDefault();
      setActiveIndex((safeIndex + 1) % displayedList.length);
    } else if (e.key === "ArrowUp" && displayedList.length) {
      e.preventDefault();
      setActiveIndex((safeIndex - 1 + displayedList.length) % displayedList.length);
    } else if (e.key === "Enter" && e.target === inputRef.current && displayedList[safeIndex]) {
      e.preventDefault();
      router.push(`/reviews/${displayedList[safeIndex].slug}`);
      closeSearch();
    }
  };

  const nothing = displayedList.length === 0 && matchingStories.length === 0;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-start justify-center px-3 pt-[7vh] sm:px-4 sm:pt-[12vh]"
      onKeyDown={handleKeyDown}
    >
      <div aria-hidden="true" className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={closeSearch} />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="search-modal-title"
        className="relative flex max-h-[80vh] w-full max-w-[660px] flex-col overflow-hidden rounded-[24px] border border-ink-3 bg-surface shadow-[0_30px_70px_-25px_rgba(31,25,21,0.45)] rise [animation-duration:280ms]"
      >
        <h2 id="search-modal-title" className="sr-only">
          Search reviews and news
        </h2>

        <div className="flex items-center gap-3 px-5">
          <svg viewBox="0 0 16 16" className="h-5 w-5 shrink-0 text-terracotta" aria-hidden="true">
            <circle cx="7" cy="7" r="4.75" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M10.5 10.5 L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <label className="flex-1">
            <span className="sr-only">Search</span>
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActiveIndex(0);
              }}
              placeholder="Search products, rules or stories"
              aria-controls="search-modal-results"
              aria-activedescendant={displayedList[safeIndex] ? `search-opt-${displayedList[safeIndex].id}` : undefined}
              className="h-16 w-full bg-transparent text-[1.1rem] text-ink placeholder:text-ink-3 focus:outline-none [&::-webkit-search-cancel-button]:hidden"
            />
          </label>
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              className="grid h-8 w-8 place-items-center rounded-full text-ink-3 hover:bg-paper-2 hover:text-ink"
              aria-label="Clear search"
            >
              ×
            </button>
          )}
          <button
            type="button"
            onClick={closeSearch}
            className="shrink-0 rounded-md border border-rule px-2 py-1 font-mono text-[0.65rem] text-ink-3 transition-colors hover:border-ink-3 hover:text-ink"
          >
            Esc
          </button>
        </div>

        <div role="group" aria-label="Filter by category" className="flex items-center gap-1.5 overflow-x-auto scrollbar-none border-y border-rule px-4 py-3">
          {quickCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                setActiveCategory(cat.id);
                setActiveIndex(0);
              }}
              aria-pressed={activeCategory === cat.id}
              className="chip !min-h-8 !py-1"
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div id="search-modal-results" className="flex-1 overflow-y-auto p-2">
          {displayedList.length > 0 && (
            <>
              <div className="flex items-center justify-between px-3 pt-2 pb-1">
                <span className="kicker">{cleanQuery ? "Products" : "Top reviewed"}</span>
                <span className="num text-[0.7rem] text-ink-3" aria-live="polite">
                  {filteredSoftware.length} {filteredSoftware.length === 1 ? "product" : "products"}
                </span>
              </div>
              <ul role="listbox" aria-label="Products">
                {displayedList.map((item, i) => {
                  const active = i === safeIndex;
                  return (
                    <li key={item.id} id={`search-opt-${item.id}`} role="option" aria-selected={active}>
                      <Link
                        href={`/reviews/${item.slug}`}
                        onClick={closeSearch}
                        onMouseEnter={() => setActiveIndex(i)}
                        className={`flex items-center gap-3 rounded-2xl px-3 py-2.5 transition-colors ${active ? "bg-paper-2" : ""}`}
                      >
                        <Monogram name={item.name} color={item.accentColor} size="sm" />
                        <span className="min-w-0 flex-1">
                          <span className={`block truncate text-[0.95rem] font-medium ${active ? "text-terracotta" : "text-ink"}`}>
                            {item.name}
                          </span>
                          <span className="block truncate text-[0.78rem] text-ink-3">
                            {item.categoryName} · {item.localCompliance?.[0] || item.tagline}
                          </span>
                        </span>
                        <span className="num rounded-full bg-paper px-2.5 py-1 text-[0.8rem] text-ink">
                          {item.verdict.score.toFixed(1)}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </>
          )}

          {matchingStories.length > 0 && (
            <>
              <p className="kicker px-3 pt-4 pb-1">Stories</p>
              <ul>
                {matchingStories.map((n) => (
                  <li key={n.id}>
                    <Link href={`/news/${n.slug}`} onClick={closeSearch} className="block rounded-2xl px-3 py-2.5 transition-colors hover:bg-paper-2">
                      <span className="block text-[0.95rem] text-ink">{n.title}</span>
                      <span className="block text-[0.75rem] text-ink-3">
                        {sectionLabel(n.categorySlug)} · {shortDate(n)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}

          {nothing && (
            <div className="px-3 py-10 text-center">
              <p className="text-[1rem] text-ink">Nothing matches &ldquo;{query}&rdquo;.</p>
              <p className="mt-1 text-[0.85rem] text-ink-3">Try a product name, a category such as ERP, or a rule such as ZATCA.</p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-rule px-5 py-3">
          <span className="hidden font-mono text-[0.66rem] text-ink-3 sm:inline">↑ ↓ move · Enter open · Esc close</span>
          <Link href="/reviews" onClick={closeSearch} className="arrow-link text-[0.82rem]">
            All {softwares.length} reviews
          </Link>
        </div>
      </div>
    </div>
  );
}
