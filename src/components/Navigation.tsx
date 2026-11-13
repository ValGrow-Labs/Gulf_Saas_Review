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

  // Close mobile menu on page change
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
            ? "bg-[#FCFAF5]/95 backdrop-blur-md shadow-[0_4px_20px_rgba(16,31,53,0.06)] border-b border-[#E7E4DC]"
            : "bg-[#FCFAF5] border-b border-[#E7E4DC]/80"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Left: Logo */}
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative px-3.5 py-2 text-sm font-medium transition-colors rounded-md ${
                    active
                      ? "text-[#101F35] font-semibold bg-[#E7E4DC]/40"
                      : "text-[#697386] hover:text-[#101F35] hover:bg-[#E7E4DC]/20"
                  }`}
                >
                  {link.name}
                  {active && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#C6A66B] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: Search & Explore CTA */}
          <div className="flex items-center space-x-2.5 sm:space-x-3">
            {/* Compare Badge Indicator if items are selected */}
            {compareSlugs.length > 0 && (
              <button
                onClick={() => setIsCompareTrayOpen(true)}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#101F35] text-[#C6A66B] border border-[#C6A66B]/50 hover:bg-[#172B46] transition-colors"
                title="View selected software to compare"
              >
                <Scale className="h-3.5 w-3.5" />
                <span>Compare ({compareSlugs.length})</span>
              </button>
            )}

            {/* Quick Search Button */}
            <button
              type="button"
              onClick={openSearch}
              className="flex items-center gap-2 rounded-lg border border-[#E7E4DC] bg-[#FCFAF5] px-3 py-2 text-xs font-medium text-[#697386] hover:border-[#C6A66B] hover:text-[#101F35] transition-all shadow-xs"
              aria-label="Search software and comparisons"
            >
              <Search className="h-4 w-4 text-[#101F35]" />
              <span className="hidden lg:inline text-xs">Search software...</span>
              <kbd className="hidden lg:inline-flex items-center rounded border border-[#E7E4DC] bg-[#F6F1E7] px-1.5 py-0.5 text-[10px] text-[#697386] font-mono">
                ⌘K
              </kbd>
            </button>

            {/* Explore Software Primary CTA */}
            <Link
              href="/reviews"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-[#101F35] px-4 py-2.5 text-xs font-semibold text-[#FCFAF5] hover:bg-[#172B46] active:scale-[0.99] transition-all shadow-sm border border-[#101F35]"
            >
              <span>Explore Software</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-[#C6A66B]" />
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-[#101F35] hover:bg-[#E7E4DC]/50 focus:outline-none"
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
          <div className="md:hidden border-b border-[#E7E4DC] bg-[#FCFAF5] px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
            <div className="space-y-1">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`block rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                      active
                        ? "bg-[#101F35] text-[#FCFAF5] font-semibold"
                        : "text-[#101F35] hover:bg-[#E7E4DC]/40"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            <div className="mt-5 pt-4 border-t border-[#E7E4DC] flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openSearch();
                }}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#E7E4DC] bg-white py-2.5 text-sm font-medium text-[#101F35]"
              >
                <Search className="h-4 w-4" />
                <span>Search Reviews, Comparisons & Guides</span>
              </button>

              <Link
                href="/reviews"
                className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#101F35] py-2.5 text-sm font-semibold text-[#FCFAF5]"
              >
                <span>Explore Software</span>
                <ArrowUpRight className="h-4 w-4 text-[#C6A66B]" />
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

