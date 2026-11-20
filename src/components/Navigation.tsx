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
    <header className="w-full bg-[#FAF7F0]">
      {/* Main Masthead in Cream with Deep Teal and Coral */}
      <div className="border-b border-[#E5DFD3] bg-[#FAF7F0] py-3.5 sm:py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Left: Brand Logo & Subtitle */}
          <div className="flex items-center gap-4">
            <Logo showTagline={false} />
            <div className="hidden md:block pl-4 border-l border-[#E5DFD3]">
              <span className="block text-xs font-bold uppercase tracking-widest text-[#526A70]">
                Middle East Software &amp; Tech Intelligence
              </span>
              <span className="text-[13px] text-[#0A2E36] font-semibold">
                Independent Reviews • Regional Compliance • Vision 2030
              </span>
            </div>
          </div>

          {/* Right: Search, Comparison Tray & Action CTA */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Compare Counter Pill */}
            {compareSlugs.length > 0 && (
              <button
                onClick={() => setIsCompareTrayOpen(true)}
                className="inline-flex items-center gap-1.5 h-10 px-3.5 rounded-xl text-xs sm:text-[13px] font-bold bg-[#0A2E36] text-[#FF6B5B] border border-[#FF6B5B]/50 hover:bg-[#0D3B43] transition-all shadow-xs cursor-pointer"
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
              className="flex items-center justify-center h-10 rounded-xl border border-[#E5DFD3] bg-white px-3 sm:px-3.5 text-sm font-medium text-[#526A70] hover:border-[#FF6B5B] hover:text-[#0A2E36] transition-all shadow-2xs cursor-pointer whitespace-nowrap"
              aria-label="Search news, reviews and comparisons"
              title="Search (⌘K)"
            >
              <Search className="h-4 w-4 text-[#0A2E36]" />
              <span className="hidden sm:inline ml-2 text-xs sm:text-sm text-[#526A70]">Search 50+ software...</span>
              <kbd className="hidden sm:inline-flex ml-2 items-center rounded border border-[#E5DFD3] bg-[#F7F4EC] px-1.5 py-0.5 text-[10px] text-[#526A70] font-mono">
                ⌘K
              </kbd>
            </button>

            {/* Primary Action Button in Coral */}
            <Link
              href="/reviews"
              className="hidden sm:inline-flex items-center gap-1.5 h-10 px-4 rounded-xl bg-[#FF6B5B] text-xs sm:text-sm font-bold text-white hover:bg-[#E85747] transition-all shadow-xs"
            >
              <span>Browse Reviews</span>
              <ArrowUpRight className="h-4 w-4 text-white" />
            </Link>

            {/* Mobile Hamburger Toggle (< lg) */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden inline-flex items-center justify-center h-10 w-10 rounded-xl text-[#0A2E36] hover:bg-[#E5DFD3]/60 border border-[#E5DFD3] bg-white transition-colors cursor-pointer"
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

      {/* Primary Section Navigation Strip */}
      <nav className="sticky top-0 z-30 w-full bg-[#FAF7F0]/98 backdrop-blur-md border-b border-[#E5DFD3]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="hidden lg:flex items-center h-12">
            <div className="flex items-center gap-6 lg:gap-8 xl:gap-10 2xl:gap-12 h-full">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative h-full flex items-center px-1 text-xs sm:text-[13px] xl:text-[14px] font-bold uppercase tracking-wider whitespace-nowrap transition-colors duration-150 ${
                      active
                        ? "text-[#0A2E36]"
                        : "text-[#526A70] hover:text-[#0A2E36]"
                    }`}
                  >
                    <span>{link.name}</span>
                    {active && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#FF6B5B] rounded-full" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-b border-[#E5DFD3] bg-[#FAF7F0] px-5 pt-4 pb-8 shadow-2xl animate-in slide-in-from-top-2 duration-200">
            <div className="space-y-1.5">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold uppercase tracking-wider transition-colors ${
                      active
                        ? "bg-[#0A2E36] text-[#F7F4EC]"
                        : "text-[#0A2E36] hover:bg-[#E5DFD3]/60"
                    }`}
                  >
                    <span>{link.name}</span>
                    {active && <span className="h-2 w-2 rounded-full bg-[#FF6B5B]" />}
                  </Link>
                );
              })}
            </div>

            <div className="mt-6 pt-5 border-t border-[#E5DFD3] flex flex-col gap-3">
              <Link
                href="/reviews"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center rounded-xl bg-[#FF6B5B] py-3 text-sm font-bold text-white hover:bg-[#E85747]"
              >
                Browse Software Reviews
              </Link>
              <Link
                href="/compare"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center rounded-xl border border-[#E5DFD3] bg-white py-3 text-sm font-bold text-[#0A2E36] hover:border-[#FF6B5B]"
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
