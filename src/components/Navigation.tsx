"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { useApp } from "@/context/AppContext";
import { Search, Menu, X, ArrowUpRight, Scale } from "lucide-react";

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
    { name: "Software Reviews", href: "/reviews" },
    { name: "Comparisons", href: "/compare" },
    { name: "Categories", href: "/categories" },
    { name: "About Us", href: "/about" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        scrolled
          ? "bg-[#FAF5ED]/98 backdrop-blur-md shadow-[0_4px_24px_rgba(20,18,61,0.06)] border-b border-[#E5DCD0]"
          : "bg-[#FAF5ED] border-b border-[#E5DCD0]"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Brand Logo */}
        <div className="flex items-center shrink-0 pr-4 lg:pr-8">
          <Logo />
        </div>

        {/* Center: Desktop Navigation Links (Spacious, elegant, never wraps) */}
        <nav className="hidden lg:flex items-center gap-7 xl:gap-9">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative py-2 text-[15px] xl:text-[16px] font-semibold tracking-tight whitespace-nowrap transition-colors duration-150 ${
                  active
                    ? "text-[#14123D]"
                    : "text-[#475569] hover:text-[#14123D]"
                }`}
              >
                <span>{link.name}</span>
                {active && (
                  <span className="absolute -bottom-1.5 left-0 right-0 h-[2.5px] bg-[#FF6B5B] rounded-full transition-all duration-200" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right: Actions (Search, Compare, Explore CTA, Mobile Menu Button) */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 pl-4 lg:pl-8">
          {/* Active Compare Pill */}
          {compareSlugs.length > 0 && (
            <button
              onClick={() => setIsCompareTrayOpen(true)}
              className="inline-flex items-center gap-1.5 h-10 px-3.5 rounded-xl text-[13px] xl:text-[14px] font-bold bg-[#14123D] text-[#FF6B5B] border border-[#FF6B5B]/50 hover:bg-[#1E1B59] transition-all whitespace-nowrap shadow-xs cursor-pointer"
              title="View selected software to compare"
            >
              <Scale className="h-4 w-4" />
              <span>Compare ({compareSlugs.length})</span>
            </button>
          )}

          {/* Search Trigger: icon on lg, full pill with shortcut on xl */}
          <button
            type="button"
            onClick={openSearch}
            className="flex items-center justify-center h-10 rounded-xl border border-[#E5DCD0] bg-white px-3 xl:px-3.5 text-[14px] font-medium text-[#475569] hover:border-[#FF6B5B] hover:text-[#14123D] hover:bg-[#F4EDE0]/40 transition-all shadow-2xs cursor-pointer whitespace-nowrap"
            aria-label="Search software and comparisons"
            title="Search (⌘K)"
          >
            <Search className="h-4 w-4 text-[#14123D] xl:text-[#475569]" />
            <span className="hidden xl:inline ml-2 text-[14px] text-[#475569]">Search software...</span>
            <kbd className="hidden xl:inline-flex ml-2 items-center rounded border border-[#E5DCD0] bg-[#F4EDE0] px-1.5 py-0.5 text-[11px] text-[#64748B] font-mono">
              ⌘K
            </kbd>
          </button>

          {/* Primary Explore CTA */}
          <Link
            href="/reviews"
            className="hidden sm:inline-flex items-center gap-2 h-10 px-4.5 rounded-xl bg-[#14123D] text-[14px] xl:text-[15px] font-bold text-[#FAF5ED] hover:bg-[#1E1B59] active:scale-[0.98] transition-all shadow-xs hover:shadow-sm border border-[#14123D] whitespace-nowrap"
          >
            <span>Explore Software</span>
            <ArrowUpRight className="h-4 w-4 text-[#FF6B5B]" />
          </Link>

          {/* Mobile Menu Hamburger (< lg) */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden inline-flex items-center justify-center h-10 w-10 rounded-xl text-[#14123D] hover:bg-[#E5DCD0]/60 focus:outline-none cursor-pointer border border-[#E5DCD0] bg-white transition-colors"
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
        <div className="lg:hidden border-b border-[#E5DCD0] bg-[#FAF5ED] px-5 pt-4 pb-8 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <div className="space-y-1.5">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`block rounded-xl px-4 py-3 text-[18px] font-bold transition-colors ${
                    active
                      ? "bg-[#14123D] text-[#FAF5ED]"
                      : "text-[#14123D] hover:bg-[#E5DCD0]/50"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="mt-6 pt-5 border-t border-[#E5DCD0] flex flex-col gap-3">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                openSearch();
              }}
              className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-[#E5DCD0] bg-white py-3.5 text-[17px] font-bold text-[#14123D] shadow-xs cursor-pointer hover:border-[#FF6B5B] transition-colors"
            >
              <Search className="h-5 w-5 text-[#FF6B5B]" />
              <span>Search Reviews, Categories &amp; Comparisons</span>
            </button>

            <Link
              href="/reviews"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#14123D] py-3.5 text-[17px] font-bold text-[#FAF5ED] shadow-sm hover:bg-[#1E1B59] transition-colors"
            >
              <span>Explore All Software Reviews</span>
              <ArrowUpRight className="h-5 w-5 text-[#FF6B5B]" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
