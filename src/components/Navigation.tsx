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
  Sparkles,
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
    { name: "SaaS Reviews", href: "/reviews" },
    { name: "Categories", href: "/categories" },
    { name: "Comparisons", href: "/compare" },
    { name: "Latest News", href: "/news" },
    { name: "AI & Innovation", href: "/news?category=ai-innovation" },
    { name: "About Us", href: "/about" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href === "/news" && (pathname === "/news" || (pathname.startsWith("/news/") && !pathname.includes("category=ai-innovation")))) return true;
    if (href.includes("category=ai-innovation") && (pathname.includes("ai-innovation") || pathname.includes("how-artificial-intelligence-is-transforming-business"))) return true;
    if (href === "/categories" && pathname.startsWith("/categories")) return true;
    if (href === "/reviews" && pathname.startsWith("/reviews")) return true;
    if (href === "/compare" && pathname.startsWith("/compare")) return true;
    return pathname.startsWith(href);
  };

  return (
    <header className="w-full bg-[#FFF8EF]">
      {/* Main Masthead in Cream White with Forest Green */}
      <div className="border-b border-[#EAE2D5] bg-[#FFF8EF] py-2 sm:py-2.5">
        <div className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8 xl:px-12 flex items-center justify-between gap-3 sm:gap-4">
          {/* Left: Brand Logo & Subtitle */}
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <Logo showTagline={false} />
            <div className="hidden md:block pl-3 sm:pl-4 border-l border-[#EAE2D5]">
              <span className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-[#5E7A6E]">
                Middle East Software &amp; Tech Intelligence
              </span>
              <span className="text-xs text-[#0B3D2E] font-semibold">
                Independent Reviews • Regional Compliance • Vision 2030
              </span>
            </div>
          </div>

          {/* Right: Search, Comparison Tray & Action CTA */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Compare Counter Pill */}
            {compareSlugs.length > 0 && (
              <button
                onClick={() => setIsCompareTrayOpen(true)}
                className="inline-flex items-center gap-1.5 h-9 px-2.5 sm:px-3 rounded-lg text-xs font-bold bg-[#0B3D2E] text-[#22C55E] border border-[#16A34A]/50 hover:bg-[#0E4B39] transition-all shadow-xs cursor-pointer"
                title="View selected software to compare"
              >
                <Scale className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Compare</span>
                <span>({compareSlugs.length})</span>
              </button>
            )}

            {/* Search Trigger */}
            <button
              type="button"
              onClick={openSearch}
              className="flex items-center justify-center h-9 px-2.5 sm:px-3 rounded-lg border border-[#EAE2D5] bg-white text-xs sm:text-[13px] font-medium text-[#5E7A6E] hover:border-[#16A34A] hover:text-[#0B3D2E] transition-all shadow-2xs cursor-pointer whitespace-nowrap"
              aria-label="Search news, reviews and comparisons"
              title="Search (⌘K)"
            >
              <Search className="h-3.5 w-3.5 text-[#0B3D2E]" />
              <span className="hidden md:inline ml-2 text-xs text-[#5E7A6E]">Search 50+ software...</span>
              <kbd className="hidden lg:inline-flex ml-2 items-center rounded border border-[#EAE2D5] bg-[#FFF8EF] px-1 py-0.2 text-[10px] text-[#5E7A6E] font-mono">
                ⌘K
              </kbd>
            </button>

            {/* Primary Action Button in Forest Green */}
            <Link
              href="/reviews"
              className="hidden sm:inline-flex items-center gap-1.5 h-9 px-3.5 rounded-lg bg-[#0B3D2E] text-xs font-bold text-white hover:bg-[#16A34A] transition-all shadow-xs"
            >
              <span>Browse Reviews</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-white" />
            </Link>

            {/* Mobile Hamburger Toggle (< lg) */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden inline-flex items-center justify-center h-9 w-9 rounded-lg text-[#0B3D2E] hover:bg-[#EAE2D5]/60 border border-[#EAE2D5] bg-white transition-colors cursor-pointer"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Primary Section Navigation Strip */}
      <nav className="sticky top-0 z-30 w-full bg-[#FFF8EF]/98 backdrop-blur-md border-b border-[#EAE2D5]">
        <div className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="hidden lg:flex items-center h-10 sm:h-11">
            <div className="flex items-center gap-6 lg:gap-8 xl:gap-9 h-full">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative h-full flex items-center px-1 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors duration-150 ${
                      active
                        ? "text-[#0B3D2E]"
                        : "text-[#5E7A6E] hover:text-[#0B3D2E]"
                    }`}
                  >
                    <span>{link.name}</span>
                    {active && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#16A34A] rounded-full" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-b border-[#EAE2D5] bg-[#FFF8EF] px-4 pt-3 pb-6 shadow-2xl animate-in slide-in-from-top-2 duration-200">
            <div className="space-y-1">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors min-h-[44px] ${
                      active
                        ? "bg-[#0B3D2E] text-[#FFF8EF]"
                        : "text-[#0B3D2E] hover:bg-[#EAE2D5]/60"
                    }`}
                  >
                    <span>{link.name}</span>
                    {active && <span className="h-2 w-2 rounded-full bg-[#16A34A]" />}
                  </Link>
                );
              })}
            </div>

            <div className="mt-4 pt-4 border-t border-[#EAE2D5] flex flex-col gap-2.5">
              <Link
                href="/reviews"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full rounded-xl bg-[#0B3D2E] py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-[#16A34A] min-h-[44px] flex items-center justify-center gap-1.5 shadow-xs"
              >
                <span>Browse Software Reviews</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/compare"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full rounded-xl border border-[#EAE2D5] bg-white py-2.5 text-xs sm:text-sm font-bold text-[#0B3D2E] hover:border-[#16A34A] min-h-[44px] flex items-center justify-center gap-1.5 shadow-2xs"
              >
                <Scale className="h-3.5 w-3.5 text-[#16A34A]" />
                <span>Side-by-Side Comparisons</span>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
