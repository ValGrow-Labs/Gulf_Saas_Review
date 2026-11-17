"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { useApp } from "@/context/AppContext";
import { Search, Menu, X, ArrowUpRight, Scale, TrendingUp, Sparkles } from "lucide-react";

export default function Navigation() {
  const pathname = usePathname();
  const { openSearch, compareSlugs, setIsCompareTrayOpen } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Latest News", href: "/news" },
    { name: "Saudi Arabia", href: "/news?country=saudi-arabia" },
    { name: "UAE", href: "/news?country=uae" },
    { name: "GCC News", href: "/news?country=gcc" },
    { name: "AI & Technology", href: "/news?category=ai-innovation" },
    { name: "SaaS Reviews", href: "/reviews" },
    { name: "Comparisons", href: "/compare" },
    { name: "About Us", href: "/about" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/news?")) {
      return false; // dynamic query
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* Top Editorial Market & Date Strip */}
      <div className="hidden md:block w-full bg-[#101F35] text-[#E7E4DC] text-xs py-1.5 border-b border-[#223859]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4 text-[11.5px] font-semibold text-[#E7E4DC]/80">
            <span className="flex items-center gap-1.5 text-[#C6A66B]">
              <TrendingUp className="h-3 w-3" />
              <span>GCC Markets:</span>
            </span>
            <span>TASI (Riyadh) <span className="text-emerald-400 font-bold">+0.48%</span></span>
            <span className="text-[#697386]">•</span>
            <span>DFM (Dubai) <span className="text-emerald-400 font-bold">+0.32%</span></span>
            <span className="text-[#697386]">•</span>
            <span>ADX (Abu Dhabi) <span className="text-emerald-400 font-bold">+0.26%</span></span>
            <span className="text-[#697386]">•</span>
            <span className="text-[#DFCA9B]">Middle East B2B SaaS Index</span>
          </div>

          <div className="flex items-center gap-4 text-[11.5px] text-[#E7E4DC]/70">
            <span>Riyadh &amp; Dubai Editorial Desks</span>
            <span className="text-[#697386]">•</span>
            <span>Tuesday, November 17, 2026</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div
        className={`w-full transition-all duration-200 ${
          scrolled
            ? "bg-[#FCFAF5]/98 backdrop-blur-md shadow-[0_4px_24px_rgba(16,31,53,0.06)] border-b border-[#E7E4DC]"
            : "bg-[#FCFAF5] border-b border-[#E7E4DC]"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Left: Brand Logo */}
          <div className="flex items-center shrink-0 pr-4 lg:pr-6">
            <Logo />
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-5 2xl:gap-7">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative py-2 text-[14.5px] 2xl:text-[15.5px] font-semibold tracking-tight whitespace-nowrap transition-colors duration-150 ${
                    active
                      ? "text-[#101F35]"
                      : "text-[#475569] hover:text-[#101F35]"
                  }`}
                >
                  <span>{link.name}</span>
                  {active && (
                    <span className="absolute -bottom-1.5 left-0 right-0 h-[2.5px] bg-[#C6A66B] rounded-full transition-all duration-200" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Medium Screen Sub-nav (for 1024px - 1279px screens) */}
          <nav className="hidden lg:flex xl:hidden items-center gap-4">
            <Link href="/" className={`text-sm font-semibold ${pathname === "/" ? "text-[#101F35] font-bold" : "text-[#475569]"}`}>Home</Link>
            <Link href="/news" className={`text-sm font-semibold ${pathname.startsWith("/news") ? "text-[#101F35] font-bold" : "text-[#475569]"}`}>Latest News</Link>
            <Link href="/news?country=saudi-arabia" className="text-sm font-semibold text-[#475569]">Saudi Arabia</Link>
            <Link href="/news?country=uae" className="text-sm font-semibold text-[#475569]">UAE</Link>
            <Link href="/reviews" className={`text-sm font-semibold ${pathname.startsWith("/reviews") ? "text-[#101F35] font-bold" : "text-[#475569]"}`}>SaaS Reviews</Link>
            <Link href="/compare" className={`text-sm font-semibold ${pathname.startsWith("/compare") ? "text-[#101F35] font-bold" : "text-[#475569]"}`}>Comparisons</Link>
          </nav>

          {/* Right: Actions (Search, Compare, Explore CTA, Mobile Menu Button) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 pl-2 lg:pl-4">
            {/* Active Compare Pill */}
            {compareSlugs.length > 0 && (
              <button
                onClick={() => setIsCompareTrayOpen(true)}
                className="inline-flex items-center gap-1.5 h-10 px-3.5 rounded-xl text-[13px] font-bold bg-[#101F35] text-[#C6A66B] border border-[#C6A66B]/50 hover:bg-[#172B46] transition-all whitespace-nowrap shadow-xs cursor-pointer"
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
              className="flex items-center justify-center h-10 rounded-xl border border-[#E7E4DC] bg-white px-3 xl:px-3.5 text-[14px] font-medium text-[#475569] hover:border-[#C6A66B] hover:text-[#101F35] hover:bg-[#F6F1E7]/40 transition-all shadow-2xs cursor-pointer whitespace-nowrap"
              aria-label="Search news, reviews and comparisons"
              title="Search (⌘K)"
            >
              <Search className="h-4 w-4 text-[#101F35]" />
              <span className="hidden 2xl:inline ml-2 text-[14px] text-[#475569]">Search intelligence...</span>
              <kbd className="hidden 2xl:inline-flex ml-2 items-center rounded border border-[#E7E4DC] bg-[#F6F1E7] px-1.5 py-0.5 text-[11px] text-[#64748B] font-mono">
                ⌘K
              </kbd>
            </button>

            {/* Primary Action Button */}
            <Link
              href="/news"
              className="hidden sm:inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-[#101F35] text-[14px] font-bold text-[#FCFAF5] hover:bg-[#172B46] active:scale-[0.98] transition-all shadow-xs hover:shadow-sm border border-[#101F35] whitespace-nowrap"
            >
              <span>Latest Dispatch</span>
              <ArrowUpRight className="h-4 w-4 text-[#C6A66B]" />
            </Link>

            {/* Mobile Menu Hamburger (< lg) */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden inline-flex items-center justify-center h-10 w-10 rounded-xl text-[#101F35] hover:bg-[#E7E4DC]/60 focus:outline-none cursor-pointer border border-[#E7E4DC] bg-white transition-colors"
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

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-b border-[#E7E4DC] bg-[#FCFAF5] px-5 pt-4 pb-8 shadow-2xl animate-in slide-in-from-top-2 duration-200">
            <div className="space-y-1.5">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`block rounded-xl px-4 py-2.5 text-[16px] font-bold transition-colors ${
                      active
                        ? "bg-[#101F35] text-[#FCFAF5]"
                        : "text-[#101F35] hover:bg-[#E7E4DC]/50"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            <div className="mt-6 pt-5 border-t border-[#E7E4DC] flex flex-col gap-3">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openSearch();
                }}
                className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-[#E7E4DC] bg-white py-3 text-[16px] font-bold text-[#101F35] shadow-xs cursor-pointer hover:border-[#C6A66B] transition-colors"
              >
                <Search className="h-4 w-4 text-[#C6A66B]" />
                <span>Search News, Reviews &amp; Comparisons</span>
              </button>

              <Link
                href="/reviews"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#101F35] py-3 text-[16px] font-bold text-[#FCFAF5] shadow-sm hover:bg-[#172B46] transition-colors"
              >
                <span>Browse Software Directory</span>
                <ArrowUpRight className="h-4 w-4 text-[#C6A66B]" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
