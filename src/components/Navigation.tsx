"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { useApp } from "@/context/AppContext";
import {
  Search,
  Menu,
  X,
  ArrowUpRight,
  Scale,
} from "lucide-react";

export default function Navigation() {
  const pathname = usePathname();
  const { openSearch, compareSlugs, setIsCompareTrayOpen } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
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
    { name: "UAE & Dubai", href: "/news?country=uae" },
    { name: "Qatar & GCC", href: "/news?country=gcc" },
    { name: "AI & Innovation", href: "/news?category=ai-innovation" },
    { name: "SaaS Reviews", href: "/reviews" },
    { name: "Comparisons", href: "/compare" },
    { name: "About Us", href: "/about" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/news?")) return false;
    return pathname.startsWith(href);
  };

  return (
    <header className="w-full bg-[#FCFAF5]">
      {/* Main Newspaper Masthead (Clean, Authoritative, High-End) */}
      <div className="border-b border-[#E7E4DC] bg-[#FCFAF5] py-4 sm:py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Left: Prominent Newspaper Brand */}
          <div className="flex items-center gap-4">
            <Logo showTagline={false} />
            <div className="hidden md:block pl-4 border-l border-[#E7E4DC]">
              <span className="block text-xs font-bold uppercase tracking-widest text-[#697386]">
                Middle East Software &amp; Tech Intelligence
              </span>
              <span className="text-[13.5px] text-[#101F35] font-semibold">
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
                className="inline-flex items-center gap-1.5 h-11 px-4 rounded-xl text-sm sm:text-[14.5px] font-bold bg-[#101F35] text-[#C6A66B] border border-[#C6A66B]/50 hover:bg-[#172B46] transition-all shadow-xs cursor-pointer"
                title="View selected software to compare"
              >
                <Scale className="h-4.5 w-4.5" />
                <span>Compare ({compareSlugs.length})</span>
              </button>
            )}

            {/* Search Trigger */}
            <button
              type="button"
              onClick={openSearch}
              className="flex items-center justify-center h-11 rounded-xl border border-[#E7E4DC] bg-white px-3.5 sm:px-4 text-base font-medium text-[#475569] hover:border-[#C6A66B] hover:text-[#101F35] transition-all shadow-2xs cursor-pointer whitespace-nowrap"
              aria-label="Search news, reviews and comparisons"
              title="Search (⌘K)"
            >
              <Search className="h-4.5 w-4.5 text-[#101F35]" />
              <span className="hidden sm:inline ml-2 text-sm sm:text-[15px] text-[#475569]">Search stories &amp; SaaS...</span>
              <kbd className="hidden sm:inline-flex ml-2 items-center rounded border border-[#E7E4DC] bg-[#F6F1E7] px-2 py-0.5 text-xs text-[#697386] font-mono">
                ⌘K
              </kbd>
            </button>

            {/* Primary Action Button */}
            <Link
              href="/news"
              className="hidden sm:inline-flex items-center gap-1.5 h-11 px-4.5 rounded-xl bg-[#101F35] text-sm sm:text-[15px] font-bold text-[#FCFAF5] hover:bg-[#172B46] transition-all shadow-xs"
            >
              <span>Latest News</span>
              <ArrowUpRight className="h-4.5 w-4.5 text-[#C6A66B]" />
            </Link>

            {/* Mobile Hamburger Toggle (< xl) */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden inline-flex items-center justify-center h-11 w-11 rounded-xl text-[#101F35] hover:bg-[#E7E4DC]/60 border border-[#E7E4DC] bg-white transition-colors cursor-pointer"
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
          <div className="hidden xl:flex items-center justify-between h-13">
            <div className="flex items-center gap-5 2xl:gap-7">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative py-3.5 text-[15.5px] 2xl:text-[16.5px] font-bold tracking-tight whitespace-nowrap transition-colors duration-150 ${
                      active
                        ? "text-[#101F35]"
                        : "text-[#475569] hover:text-[#101F35]"
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

            {/* Right Mini Status */}
            <div className="flex items-center gap-2 text-[13px] text-[#697386] font-semibold">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Riyadh &amp; Dubai Editorial Desks</span>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="xl:hidden border-b border-[#E7E4DC] bg-[#FCFAF5] px-5 pt-4 pb-8 shadow-2xl animate-in slide-in-from-top-2 duration-200">
            <div className="space-y-1.5">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-base font-bold transition-colors ${
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
