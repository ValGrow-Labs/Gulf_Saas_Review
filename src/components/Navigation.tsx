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
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          scrolled
            ? "bg-[#FCFAF5]/98 backdrop-blur-md shadow-[0_4px_24px_rgba(16,31,53,0.08)] border-b border-[#E7E4DC]"
            : "bg-[#FCFAF5] border-b border-[#E7E4DC]"
        }`}
      >
        <div className="mx-auto flex h-22 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Left: Logo */}
          <div className="flex items-center shrink-0">
            <Logo />
          </div>

          {/* Center: Desktop Navigation Links (17-18px) */}
          <nav className="hidden md:flex items-center space-x-2 lg:space-x-3">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative px-4 py-2.5 text-[17px] font-bold transition-colors rounded-xl ${
                    active
                      ? "text-[#101F35] bg-[#E7E4DC]/60"
                      : "text-[#475569] hover:text-[#101F35] hover:bg-[#E7E4DC]/30"
                  }`}
                >
                  {link.name}
                  {active && (
                    <span className="absolute bottom-1 left-4 right-4 h-[2.5px] bg-[#C6A66B] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: Search & Explore CTA */}
          <div className="flex items-center space-x-3 shrink-0">
            {compareSlugs.length > 0 && (
              <button
                onClick={() => setIsCompareTrayOpen(true)}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[15px] font-bold bg-[#101F35] text-[#C6A66B] border border-[#C6A66B]/60 hover:bg-[#172B46] transition-colors cursor-pointer"
                title="View selected software to compare"
              >
                <Scale className="h-4 w-4" />
                <span>Compare ({compareSlugs.length})</span>
              </button>
            )}

            <button
              type="button"
              onClick={openSearch}
              className="flex items-center gap-2.5 rounded-xl border border-[#E7E4DC] bg-white px-3.5 py-2.5 text-[15px] font-medium text-[#475569] hover:border-[#C6A66B] hover:text-[#101F35] transition-all shadow-2xs cursor-pointer min-h-[44px]"
              aria-label="Search software and comparisons"
            >
              <Search className="h-4 w-4 text-[#101F35]" />
              <span className="hidden lg:inline text-[15px]">Search software...</span>
              <kbd className="hidden lg:inline-flex items-center rounded border border-[#E7E4DC] bg-[#F6F1E7] px-1.5 py-0.5 text-[12px] text-[#64748B] font-mono">
                ⌘K
              </kbd>
            </button>

            <Link
              href="/reviews"
              className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-[#101F35] px-5 py-2.5 text-[16px] font-bold text-[#FCFAF5] hover:bg-[#172B46] active:scale-[0.98] transition-all shadow-sm border border-[#101F35] min-h-[44px]"
            >
              <span>Explore Software</span>
              <ArrowUpRight className="h-4 w-4 text-[#C6A66B]" />
            </Link>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden inline-flex items-center justify-center rounded-xl p-2.5 min-h-[44px] min-w-[44px] text-[#101F35] hover:bg-[#E7E4DC]/60 focus:outline-none cursor-pointer border border-[#E7E4DC] bg-white"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-b border-[#E7E4DC] bg-[#FCFAF5] px-4 pt-4 pb-8 shadow-2xl animate-in slide-in-from-top-2 duration-200">
            <div className="space-y-2">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`block rounded-xl px-4 py-3 text-[18px] font-bold transition-colors ${
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
                className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-[#E7E4DC] bg-white py-3.5 text-[17px] font-bold text-[#101F35] shadow-xs cursor-pointer"
              >
                <Search className="h-5 w-5 text-[#C6A66B]" />
                <span>Search Reviews, Categories &amp; Matchups</span>
              </button>

              <Link
                href="/reviews"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#101F35] py-3.5 text-[17px] font-bold text-[#FCFAF5] shadow-sm"
              >
                <span>Explore All Software Reviews</span>
                <ArrowUpRight className="h-5 w-5 text-[#C6A66B]" />
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
