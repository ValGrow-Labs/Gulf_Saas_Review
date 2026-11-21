"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import NavbarSearch from "./NavbarSearch";
import { useApp } from "@/context/AppContext";
import {
  Menu,
  X,
  Scale,
  ArrowUpRight,
} from "lucide-react";

export default function Navigation() {
  const pathname = usePathname();
  const { openSearch, compareSlugs, setIsCompareTrayOpen } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
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
    { name: "Buyer Guides", href: "/articles" },
    { name: "About Us", href: "/about" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href === "/categories" && pathname.startsWith("/categories")) return true;
    if (href === "/reviews" && pathname.startsWith("/reviews")) return true;
    if (href === "/compare" && pathname.startsWith("/compare")) return true;
    if (href === "/articles" && pathname.startsWith("/articles")) return true;
    if (href === "/about" && pathname.startsWith("/about")) return true;
    return pathname.startsWith(href);
  };

  return (
    <header className={`w-full bg-[#FFF8EF] border-b-2 border-[#E5DAC8] sticky top-0 z-50 transition-all duration-200 ${scrolled ? "shadow-md bg-[#FFF8EF]/95 backdrop-blur-md" : ""}`}>
      {/* MAIN MASTHEAD */}
      <div className="bg-[#FFF8EF] py-3.5 sm:py-4 border-b border-[#E5DAC8]">
        <div className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8 xl:px-12 flex items-center justify-between gap-4">
          {/* Brand Logo & Editorial Subtitle */}
          <div className="flex items-center gap-4 sm:gap-6 min-w-0">
            <Logo showTagline={false} />
            <div className="hidden lg:block pl-5 border-l-2 border-[#E5DAC8]">
              <span className="block text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#15803D]">
                Middle East Software &amp; Tech Intelligence
              </span>
              <span className="text-sm sm:text-base text-[#064734] font-bold">
                Independent Reviews • Regional Compliance • Vision 2030
              </span>
            </div>
          </div>

          {/* Right: Compare Tray & Mobile Hamburger Toggle */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
            {/* Compare Counter Pill */}
            {compareSlugs.length > 0 && (
              <button
                onClick={() => setIsCompareTrayOpen(true)}
                className="inline-flex items-center gap-2 h-10 px-3.5 rounded-xl text-sm font-bold bg-[#064734] text-[#E0FFC2] border border-[#E0FFC2]/50 hover:bg-[#0A5C44] transition-all shadow-xs cursor-pointer"
                title="View selected software to compare"
              >
                <Scale className="h-4 w-4" />
                <span className="hidden sm:inline">Compare</span>
                <span>({compareSlugs.length})</span>
              </button>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden inline-flex items-center justify-center h-10 w-10 rounded-xl text-[#064734] hover:bg-[#E5DAC8]/60 border border-[#E5DAC8] bg-white transition-colors cursor-pointer"
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

      {/* PRIMARY NAVIGATION BAR (WITH THE NEW SOFTWARE SEARCH BAR IN MARKED AREA) */}
      <nav className="w-full bg-[#FFF8EF]/98 backdrop-blur-md">
        <div className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="hidden lg:flex items-center justify-between h-12 sm:h-13">
            {/* Nav links on the left */}
            <div className="flex items-center gap-7 xl:gap-9 h-full">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative h-full flex items-center px-1 text-sm sm:text-base font-extrabold uppercase tracking-wide whitespace-nowrap transition-colors duration-150 ${
                      active
                        ? "text-[#064734]"
                        : "text-[#3C6152] hover:text-[#064734]"
                    }`}
                  >
                    <span>{link.name}</span>
                    {active && (
                      <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#064734] rounded-full" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right: The Marked Area - Brand New Software Search Bar! */}
            <div className="flex items-center py-1">
              <NavbarSearch />
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-b border-[#E5DAC8] bg-[#FFF8EF] px-4 pt-3 pb-6 shadow-2xl animate-in slide-in-from-top-2 duration-200">
            {/* Mobile Software Search */}
            <div className="mb-3.5">
              <NavbarSearch />
            </div>
            <div className="space-y-1.5">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-base font-bold uppercase tracking-wider transition-colors min-h-[48px] ${
                      active
                        ? "bg-[#064734] text-white"
                        : "text-[#064734] hover:bg-[#E5DAC8]/60"
                    }`}
                  >
                    <span>{link.name}</span>
                    {active && <span className="h-2.5 w-2.5 rounded-full bg-[#E0FFC2]" />}
                  </Link>
                );
              })}
            </div>

            <div className="mt-4 pt-4 border-t border-[#E5DAC8] flex flex-col gap-3">
              <Link
                href="/reviews"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full rounded-xl bg-[#064734] py-3 text-base font-bold text-white hover:bg-[#043224] min-h-[48px] flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Browse Software Reviews</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/compare"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full rounded-xl border-2 border-[#E5DAC8] bg-white py-3 text-base font-bold text-[#064734] hover:border-[#064734] min-h-[48px] flex items-center justify-center gap-2 shadow-2xs"
              >
                <Scale className="h-4 w-4 text-[#15803D]" />
                <span>Side-by-Side Comparisons</span>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
