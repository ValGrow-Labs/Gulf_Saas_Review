"use client";

import React, { useState, useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { useApp } from "@/context/AppContext";
import { newsSections } from "@/lib/news";

const links = [
  { name: "News", href: "/news" },
  { name: "Reviews", href: "/reviews" },
  { name: "Compare", href: "/compare" },
  { name: "Guides", href: "/articles" },
  { name: "About", href: "/about" },
];

function SearchIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden="true">
      <circle cx="7" cy="7" r="4.75" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M10.5 10.5 L14 14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function useDateline() {
  return useSyncExternalStore(
    () => () => {},
    () => new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" }),
    () => ""
  );
}

const searchHints = ["Odoo", "ZATCA e-invoicing", "payroll & WPS", "Arabic CRM", "Zoho vs HubSpot", "UAE VAT"];

/**
 * "Search …" with the example term sliding up every few seconds.
 * Pure transform transition — no keyframes — so the global reduced-motion rule stills it.
 */
function RotatingSearchHint() {
  const [i, setI] = useState(0);
  const [instant, setInstant] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setInstant(false);
      setI((n) => n + 1);
    }, 2600);
    return () => clearInterval(t);
  }, []);

  // After sliding onto the duplicated first term, jump back to the real first term without animating.
  const onEnd = () => {
    if (i >= searchHints.length) {
      setInstant(true);
      setI(0);
    }
  };

  const items = [...searchHints, searchHints[0]];

  return (
    <span aria-hidden="true" className="hidden text-[0.9rem] lg:block">
      <span className="relative block h-[1.4em] w-[12.5rem] overflow-hidden text-left">
        <span
          onTransitionEnd={onEnd}
          className={`absolute inset-x-0 top-0 flex flex-col ${
            instant ? "" : "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          }`}
          style={{ transform: `translateY(-${i * 1.4}em)` }}
        >
          {items.map((h, k) => (
            <span key={k} className="block h-[1.4em] truncate leading-[1.4em] text-ink-3">
              Search {h}
            </span>
          ))}
        </span>
      </span>
    </span>
  );
}

export default function Navigation() {
  const pathname = usePathname();
  const { compareSlugs, setIsCompareTrayOpen, openSearch } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dateline = useDateline();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 110);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      {/* Teal dateline strip */}
      <div className="bg-teal text-teal-soft">
        <div className="wrap flex h-9 items-center justify-between gap-4 text-[0.78rem]">
          <p className="num hidden min-w-[15rem] sm:block" suppressHydrationWarning>
            {dateline}
          </p>
          <p lang="ar" dir="rtl" className="font-arabic text-[0.85rem] text-sand">
            أخبار التقنية والبرمجيات في الخليج
          </p>
          <ul className="hidden items-center gap-3 font-mono text-[0.68rem] tracking-[0.08em] md:flex">
            {["KSA", "UAE", "QAT", "KWT", "BHR", "OMN"].map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main bar */}
      <header className="bg-paper">
        <div className="wrap flex h-[76px] items-center justify-between gap-6">
          <Logo />

          <p className="hidden max-w-[34ch] text-center text-[0.86rem] leading-snug text-ink-3 xl:block">
            Business software and technology news from Saudi Arabia, the UAE and the Gulf
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={openSearch}
              aria-label="Search"
              className="inline-flex h-11 items-center gap-2.5 rounded-full border-[1.5px] border-rule bg-surface px-4 text-ink-3 transition-colors hover:border-ink-3 hover:text-ink lg:pr-5"
            >
              <SearchIcon />
              <RotatingSearchHint />
            </button>

            {compareSlugs.length > 0 && (
              <button
                type="button"
                onClick={() => setIsCompareTrayOpen(true)}
                className="hidden h-11 items-center gap-2 rounded-full bg-paper-2 px-4 text-[0.9rem] font-semibold text-ink transition-colors hover:bg-sand-soft sm:inline-flex"
              >
                Compare
                <span className="num grid h-5 min-w-5 place-items-center rounded-full bg-terracotta px-1 text-[0.7rem] text-white">
                  {compareSlugs.length}
                </span>
              </button>
            )}

            <Link href="/#newsletter" className="btn btn-accent btn-sm hidden !min-h-11 sm:inline-flex">
              Subscribe
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-ink text-paper lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label="Open menu"
            >
              <span className="flex flex-col gap-[5px]" aria-hidden="true">
                <span className="block h-[2px] w-4 rounded bg-current" />
                <span className="block h-[2px] w-4 rounded bg-current" />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Section bar — sticky, terracotta */}
      <nav
        aria-label="Sections"
        className={`sticky top-0 z-50 bg-terracotta text-white transition-shadow duration-300 ${
          scrolled ? "shadow-[0_10px_30px_-14px_rgba(31,25,21,0.55)]" : ""
        }`}
      >
        <div className="wrap flex h-12 items-center gap-5">
          <Link
            href="/"
            aria-label="Front page"
            tabIndex={scrolled ? 0 : -1}
            className={`hidden shrink-0 overflow-hidden font-display text-[1.05rem] font-extrabold tracking-[-0.04em] transition-[max-width,opacity] duration-300 lg:block ${
              scrolled ? "max-w-[180px] opacity-100" : "max-w-0 opacity-0"
            }`}
          >
            Gulf SaaS <span className="text-sand">Review</span>
          </Link>
          <ul className="-mx-1 flex flex-1 items-center gap-1 overflow-x-auto scrollbar-none text-[0.9rem] font-semibold">
            <li>
              <Link
                href="/"
                aria-current={pathname === "/" ? "page" : undefined}
                className={`block whitespace-nowrap rounded-full px-3 py-1.5 transition-colors ${
                  pathname === "/" ? "bg-sand text-ink" : "hover:bg-white/15"
                }`}
              >
                Front page
              </Link>
            </li>
            <li>
              <Link
                href="/news"
                aria-current={isActive("/news") ? "page" : undefined}
                className={`block whitespace-nowrap rounded-full px-3 py-1.5 transition-colors ${
                  isActive("/news") ? "bg-sand text-ink" : "hover:bg-white/15"
                }`}
              >
                Latest news
              </Link>
            </li>
            {newsSections.map((sec) => (
              <li key={sec.slug}>
                <Link
                  href={`/news?section=${sec.slug}`}
                  className="block whitespace-nowrap rounded-full px-3 py-1.5 text-white/85 transition-colors hover:bg-white/15 hover:text-white"
                >
                  {sec.label}
                </Link>
              </li>
            ))}
            <li aria-hidden="true" className="mx-2 h-5 w-px shrink-0 bg-white/30" />
            {links.filter((l) => l.href !== "/news").map((l) => {
              const active = isActive(l.href);
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={active ? "page" : undefined}
                    className={`block whitespace-nowrap rounded-full px-3 py-1.5 transition-colors ${
                      active ? "bg-sand text-ink" : "hover:bg-white/15"
                    }`}
                  >
                    {l.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Mobile menu — full-screen teal sheet */}
      {menuOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-[65] overflow-y-auto bg-teal text-paper lg:hidden rise [animation-duration:300ms]"
        >
          <div className="wrap flex h-[72px] items-center justify-between">
            <Logo variant="light" />
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-paper text-xl text-ink"
              aria-label="Close menu"
            >
              ×
            </button>
          </div>
          <div className="wrap pb-10 pt-4">
            <nav aria-label="Mobile">
              <ul>
                {links.map((l) => (
                  <li key={l.href} className="border-b border-white/15">
                    <Link
                      href={l.href}
                      aria-current={isActive(l.href) ? "page" : undefined}
                      className={`block py-3.5 font-display text-[2.4rem] font-bold tracking-[-0.04em] ${
                        isActive(l.href) ? "text-sand" : "text-paper"
                      }`}
                    >
                      {l.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <p className="kicker mt-8 !text-teal-soft">News sections</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {newsSections.map((s) => (
                <Link
                  key={s.slug}
                  href={`/news?section=${s.slug}`}
                  className="rounded-full border-[1.5px] border-white/25 px-4 py-2 text-[0.9rem] text-paper hover:bg-white/10"
                >
                  {s.label}
                </Link>
              ))}
            </div>
            <div className="mt-10 grid gap-3">
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  openSearch();
                }}
                className="btn bg-paper text-ink"
              >
                <SearchIcon /> Search reviews and news
              </button>
              <Link href="/#newsletter" className="btn btn-sand">
                Subscribe to the Sunday brief
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
