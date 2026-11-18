"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { useApp } from "@/context/AppContext";
import { categories } from "@/data/categories";
import {
  Search,
  Menu,
  X,
  ArrowUpRight,
  Scale,
  ChevronDown,
} from "lucide-react";

export default function Navigation() {
  const pathname = usePathname();
  const { openSearch, compareSlugs, setIsCompareTrayOpen } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isMobileCategoriesOpen, setIsMobileCategoriesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsCategoriesOpen(false);
    setIsMobileCategoriesOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Latest News", href: "/news" },
    { name: "AI & Innovation", href: "/news?category=ai-innovation" },
    { name: "SaaS Reviews", href: "/reviews" },
    { name: "Categories", href: "/categories", isDropdown: true },
    { name: "Comparisons", href: "/compare" },
    { name: "About Us", href: "/about" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href === "/news" && (pathname === "/news" || (pathname.startsWith("/news/") && !pathname.includes("category=ai-innovation")))) return true;
    if (href.includes("category=ai-innovation") && (pathname.includes("ai-innovation") || pathname.includes("how-artificial-intelligence-is-transforming-business"))) return true;
    if (href === "/categories" && pathname.startsWith("/categories")) return true;
    return pathname.startsWith(href);
  };

  return (
    <header className="w-full bg-[#FCFAF5]">
      {/* Main Newspaper Masthead (Clean, Authoritative, High-End) */}
      <div className="border-b border-[#E7E4DC] bg-[#FCFAF5] py-4 sm:py-5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Left: Prominent Newspaper Brand */}
          <div className="flex items-center gap-4">
            <Logo showTagline={false} />
            <div className="hidden md:block pl-4 border-l border-[#E7E4DC]">
              <span className="block text-xs font-bold uppercase tracking-widest text-[#697386]">
                Middle East Software &amp; Tech Intelligence
              </span>
              <span className="text-[13px] text-[#101F35] font-semibold">
                Independent Reviews • Regional Benchmarks • Vision 2030 Analysis
              </span>
            </div>
          </div>

          {/* Right: Search, Comparison Tray & Action CTA */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Compare Counter Pill */}
            {compareSlugs.length > 0 && (
              <button
                onClick={() => setIsCompareTrayOpen(true)}
                className="inline-flex items-center gap-1.5 h-10 px-3.5 rounded-xl text-xs sm:text-[13px] font-bold bg-[#101F35] text-[#C6A66B] border border-[#C6A66B]/50 hover:bg-[#172B46] transition-all shadow-xs cursor-pointer"
                title="View selected software to compare"
              >
                <Scale className="h-4 w-4" />
                <span>Compare ({compareSlugs.length})</span>
              </button>
            )}

            {/* Search Trigger */}
            <button
              type="button"
              onClick={openSearch}
              className="flex items-center justify-center h-10 rounded-xl border border-[#E7E4DC] bg-white px-3 sm:px-3.5 text-sm font-medium text-[#475569] hover:border-[#C6A66B] hover:text-[#101F35] transition-all shadow-2xs cursor-pointer whitespace-nowrap"
              aria-label="Search news, reviews and comparisons"
              title="Search (⌘K)"
            >
              <Search className="h-4 w-4 text-[#101F35]" />
              <span className="hidden sm:inline ml-2 text-xs sm:text-sm text-[#475569]">Search stories &amp; SaaS...</span>
              <kbd className="hidden sm:inline-flex ml-2 items-center rounded border border-[#E7E4DC] bg-[#F6F1E7] px-1.5 py-0.5 text-[10px] text-[#697386] font-mono">
                ⌘K
              </kbd>
            </button>

            {/* Primary Action Button */}
            <Link
              href="/news"
              className="hidden sm:inline-flex items-center gap-1.5 h-10 px-4 rounded-xl bg-[#101F35] text-xs sm:text-sm font-bold text-[#FCFAF5] hover:bg-[#172B46] transition-all shadow-xs"
            >
              <span>Latest News</span>
              <ArrowUpRight className="h-4 w-4 text-[#C6A66B]" />
            </Link>

            {/* Mobile Hamburger Toggle (< lg) */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden inline-flex items-center justify-center h-10 w-10 rounded-xl text-[#101F35] hover:bg-[#E7E4DC]/60 border border-[#E7E4DC] bg-white transition-colors cursor-pointer"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 3. Primary Section Navigation Strip (Classic Newspaper Ribbon) */}
      <nav className="sticky top-0 z-30 w-full bg-[#FCFAF5]/98 backdrop-blur-md border-b border-[#E7E4DC]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="hidden lg:flex items-center h-12">
            <div className="flex items-center gap-6 lg:gap-8 xl:gap-10 2xl:gap-12 h-full">
              {navLinks.map((link) => {
                const active = isActive(link.href);

                if (link.isDropdown) {
                  return (
                    <div
                      key={link.name}
                      ref={dropdownRef}
                      className="relative h-full flex items-center"
                      onMouseEnter={() => setIsCategoriesOpen(true)}
                      onMouseLeave={() => setIsCategoriesOpen(false)}
                    >
                      <Link
                        href={link.href}
                        className={`relative h-full flex items-center gap-1.5 px-1 text-xs sm:text-[13px] xl:text-[14px] font-bold uppercase tracking-wider whitespace-nowrap transition-colors duration-150 ${
                          active
                            ? "text-[#101F35]"
                            : "text-[#697386] hover:text-[#101F35]"
                        }`}
                      >
                        <span>{link.name}</span>
                        <ChevronDown
                          className={`h-3.5 w-3.5 transition-transform duration-200 ${
                            isCategoriesOpen ? "rotate-180 text-[#C6A66B]" : "text-[#697386]"
                          }`}
                        />
                        {active && (
                          <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#C6A66B] rounded-full" />
                        )}
                      </Link>

                      {/* Categories Dropdown Menu (Matching Image 3) */}
                      {isCategoriesOpen && (
                        <div className="absolute top-full left-0 pt-1.5 z-50">
                          <div className="w-84 rounded-2xl border border-[#E7E4DC] bg-[#FCFAF5] p-2.5 shadow-2xl animate-in fade-in slide-in-from-top-1 duration-150">
                            {/* Option 1: All Categories (8) */}
                            <Link
                              href="/categories"
                              onClick={() => setIsCategoriesOpen(false)}
                              className="flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-bold text-[#101F35] bg-[#F6F1E7] hover:bg-[#101F35] hover:text-[#FCFAF5] transition-colors group/all"
                            >
                              <span className="flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-[#C6A66B]" />
                                <span>All Categories ({categories.length})</span>
                              </span>
                              <span className="text-xs text-[#697386] group-hover/all:text-[#C6A66B]">
                                View All &rarr;
                              </span>
                            </Link>

                            <div className="my-1.5 border-t border-[#E7E4DC]" />

                            {/* 8 Specific Software Categories from Image 3 */}
                            <div className="space-y-0.5">
                              {categories.map((cat) => (
                                <Link
                                  key={cat.id}
                                  href={`/categories/${cat.slug}`}
                                  onClick={() => setIsCategoriesOpen(false)}
                                  className="flex items-center justify-between rounded-xl px-3.5 py-2 text-[13.5px] font-semibold text-[#334155] hover:bg-[#F6F1E7] hover:text-[#101F35] transition-colors group/item"
                                >
                                  <span>{cat.name}</span>
                                  <span className="text-[11px] font-mono font-medium text-[#697386] group-hover/item:text-[#8C6D33]">
                                    {cat.count}+ tools
                                  </span>
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative h-full flex items-center px-1 text-xs sm:text-[13px] xl:text-[14px] font-bold uppercase tracking-wider whitespace-nowrap transition-colors duration-150 ${
                      active
                        ? "text-[#101F35]"
                        : "text-[#697386] hover:text-[#101F35]"
                    }`}
                  >
                    <span>{link.name}</span>
                    {active && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#C6A66B] rounded-full" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-b border-[#E7E4DC] bg-[#FCFAF5] px-5 pt-4 pb-8 shadow-2xl animate-in slide-in-from-top-2 duration-200">
            <div className="space-y-1.5">
              {navLinks.map((link) => {
                const active = isActive(link.href);

                if (link.isDropdown) {
                  return (
                    <div key={link.name} className="space-y-1">
                      <button
                        type="button"
                        onClick={() => setIsMobileCategoriesOpen(!isMobileCategoriesOpen)}
                        className={`w-full flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                          active
                            ? "bg-[#101F35] text-[#FCFAF5]"
                            : "text-[#101F35] hover:bg-[#E7E4DC]/60"
                        }`}
                      >
                        <span>{link.name}</span>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-200 ${
                            isMobileCategoriesOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {isMobileCategoriesOpen && (
                        <div className="pl-3 pr-1 py-1.5 space-y-1 bg-[#F6F1E7]/70 rounded-xl border border-[#E7E4DC]">
                          <Link
                            href="/categories"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block px-3 py-2 text-xs font-bold uppercase tracking-wider text-[#C6A66B] hover:underline"
                          >
                            All Categories ({categories.length}) &rarr;
                          </Link>
                          {categories.map((cat) => (
                            <Link
                              key={cat.id}
                              href={`/categories/${cat.slug}`}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="block px-3 py-1.5 text-sm font-semibold text-[#334155] hover:text-[#101F35]"
                            >
                              {cat.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold uppercase tracking-wider transition-colors ${
                      active
                        ? "bg-[#101F35] text-[#FCFAF5]"
                        : "text-[#101F35] hover:bg-[#E7E4DC]/60"
                    }`}
                  >
                    <span>{link.name}</span>
                    {active && <span className="h-2 w-2 rounded-full bg-[#C6A66B]" />}
                  </Link>
                );
              })}
            </div>

            <div className="mt-6 pt-5 border-t border-[#E7E4DC] flex flex-col gap-3">
              <Link
                href="/reviews"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center rounded-xl bg-[#101F35] py-3 text-sm font-bold text-[#FCFAF5] hover:bg-[#172B46]"
              >
                Browse Software Reviews
              </Link>
              <Link
                href="/compare"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center rounded-xl border border-[#E7E4DC] bg-white py-3 text-sm font-bold text-[#101F35] hover:border-[#C6A66B]"
              >
                Side-by-Side Comparisons
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
