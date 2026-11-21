"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { softwares } from "@/data/software";
import Monogram from "./Monogram";

const quickCategories = [
  { id: "all", label: "All" },
  { id: "erp-business-management", label: "ERP" },
  { id: "accounting-finance", label: "Accounting" },
  { id: "crm-sales", label: "CRM" },
  { id: "hr-payroll", label: "HR & payroll" },
  { id: "customer-support", label: "Support" },
];

export default function NavbarSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        // Only the visible instance should grab focus.
        if (!inputRef.current || inputRef.current.offsetParent === null) return;
        e.preventDefault();
        setIsOpen(true);
        inputRef.current.focus();
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

  const filtered = useMemo(() => {
    return softwares.filter((s) => {
      if (activeCategory !== "all" && s.category !== activeCategory) return false;
      if (!cleanQuery) return true;
      return (
        s.name.toLowerCase().includes(cleanQuery) ||
        s.categoryName.toLowerCase().includes(cleanQuery) ||
        s.description.toLowerCase().includes(cleanQuery) ||
        s.tagline.toLowerCase().includes(cleanQuery) ||
        s.countrySuitability.some((c) => c.toLowerCase().includes(cleanQuery)) ||
        s.localCompliance.some((l) => l.toLowerCase().includes(cleanQuery)) ||
        s.arabicSupport.toLowerCase().includes(cleanQuery)
      );
    });
  }, [cleanQuery, activeCategory]);

  const shown = filtered.slice(0, cleanQuery ? 7 : 6);

  return (
    <div ref={containerRef} className="relative">
      <label className="group flex h-10 w-full lg:w-64 xl:w-72 items-center gap-2 rounded-sm border border-rule bg-surface px-3 transition-colors hover:border-ink-3 focus-within:border-ink">
        <svg viewBox="0 0 16 16" className="h-4 w-4 shrink-0 text-ink-3" aria-hidden="true">
          <circle cx="7" cy="7" r="4.75" fill="none" stroke="currentColor" strokeWidth="1.4" />
          <path d="M10.5 10.5 L14 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
        </svg>
        <span className="sr-only">Search software</span>
        <input
          ref={inputRef}
          type="search"
          value={query}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          placeholder="Search software"
          className="w-full bg-transparent text-[0.9rem] text-ink placeholder:text-ink-3 focus:outline-none [&::-webkit-search-cancel-button]:hidden"
        />
        {query ? (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            className="text-ink-3 hover:text-ink text-sm px-1"
            aria-label="Clear search"
          >
            ×
          </button>
        ) : (
          <kbd className="hidden xl:inline-block shrink-0 whitespace-nowrap font-mono text-[0.65rem] text-ink-3 border border-rule rounded-xs px-1.5 py-0.5">
            Ctrl K
          </kbd>
        )}
      </label>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-full lg:w-[440px] rounded-sm border border-ink bg-surface shadow-[0_24px_48px_-24px_rgba(22,20,15,0.35)] rise [animation-duration:250ms]">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none border-b border-rule px-2 py-2">
            {quickCategories.map((cat) => {
              const active = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  aria-pressed={active}
                  className={`shrink-0 rounded-xs px-2.5 py-1.5 text-[0.8rem] transition-colors ${
                    active ? "bg-ink text-paper" : "text-ink-2 hover:bg-paper-2"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between px-4 pt-3 pb-1">
            <span className="eyebrow">{cleanQuery ? "Matches" : "Most read"}</span>
            <span className="num text-[0.72rem] text-ink-3">{filtered.length} products</span>
          </div>

          <ul className="max-h-[360px] overflow-y-auto pb-2">
            {shown.length > 0 ? (
              shown.map((sw) => (
                <li key={sw.id}>
                  <Link
                    href={`/reviews/${sw.slug}`}
                    onClick={() => setIsOpen(false)}
                    className="group flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-paper"
                  >
                    <Monogram name={sw.name} color={sw.accentColor} size="sm" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[0.925rem] text-ink group-hover:text-accent transition-colors">
                        {sw.name}
                      </span>
                      <span className="block truncate text-[0.78rem] text-ink-3">
                        {sw.categoryName} · {sw.localCompliance?.[0] || sw.tagline}
                      </span>
                    </span>
                    <span className="num text-[0.85rem] text-ink">{sw.rating.toFixed(1)}</span>
                  </Link>
                </li>
              ))
            ) : (
              <li className="px-4 py-8">
                <p className="text-[0.925rem] text-ink">Nothing matches &ldquo;{query}&rdquo;.</p>
                <p className="mt-1 text-[0.82rem] text-ink-3">
                  Try a product name, a category such as ERP, or a rule such as ZATCA.
                </p>
              </li>
            )}
          </ul>

          <div className="flex items-center justify-between border-t border-rule px-4 py-2.5">
            <span className="text-[0.78rem] text-ink-3">Only products we have reviewed</span>
            <Link href="/reviews" onClick={() => setIsOpen(false)} className="arrow-link text-[0.82rem]">
              All {softwares.length} reviews
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
