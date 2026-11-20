import React from "react";
import Link from "next/link";
import Logo from "./Logo";
import { ShieldCheck, MapPin, Newspaper, Layers, Scale, Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0B3D2E] text-[#FFF8EF] border-t border-[#0E4B39]">
      {/* Top Editorial Authority Strip */}
      <div className="border-b border-[#0E4B39] bg-[#07261D]">
        <div className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8 xl:px-12 py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 text-sm text-[#FFF8EF]">
            <span className="flex h-2 w-2 rounded-full bg-[#22C55E]" />
            <span className="font-semibold text-white">Independent GCC Software &amp; Tech Intelligence</span>
            <span className="text-[#5E7A6E] hidden sm:inline">•</span>
            <span className="text-[#FFF8EF]/80 hidden sm:inline">Unbiased evaluations for Saudi Arabia, the UAE, and the GCC</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-[#FFF8EF]/80">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-[#22C55E]" />
              Bureaus: Riyadh • Dubai • Doha • Manama
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8 xl:px-12 py-12 sm:py-16">
        {/* Main 5-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 pb-12 border-b border-[#0E4B39]">
          {/* Brand Info (2 Columns) */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="light" showTagline={false} />
            <p className="text-[16px] text-[#FFF8EF]/90 leading-relaxed max-w-sm">
              GulfSaasReview is the premier independent business software directory and regional technology evaluation authority for the Middle East.
            </p>
            <div className="pt-2 flex items-center gap-2 text-sm text-[#22C55E] font-semibold">
              <ShieldCheck className="h-4 w-4 shrink-0 text-[#22C55E]" />
              <span>ZATCA Phase 2 • UAE Corporate Tax • Bilingual RTL</span>
            </div>
            <div className="pt-2 text-xs text-[#A3C2B8] leading-relaxed">
              Published by Gulf Business Intelligence Media FZ-LLC. Free from vendor sponsorship bias.
            </div>
          </div>

          {/* Col 1: Gulf Tech News */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#22C55E]">
              <Newspaper className="h-3.5 w-3.5" />
              <span>Gulf News</span>
            </div>
            <ul className="space-y-2.5 text-[15px] text-[#FFF8EF]/90">
              <li>
                <Link href="/news" className="hover:text-white transition-colors">
                  Latest Technology News
                </Link>
              </li>
              <li>
                <Link href="/news?country=saudi-arabia" className="hover:text-white transition-colors">
                  Saudi Arabia (Vision 2030)
                </Link>
              </li>
              <li>
                <Link href="/news?country=uae" className="hover:text-white transition-colors">
                  UAE Digital Economy
                </Link>
              </li>
              <li>
                <Link href="/news?country=gcc" className="hover:text-white transition-colors">
                  GCC Cross-Border Policy
                </Link>
              </li>
              <li>
                <Link href="/news?category=ai-innovation" className="hover:text-white transition-colors">
                  AI &amp; Sovereign Models
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Software Directory */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#22C55E]">
              <Layers className="h-3.5 w-3.5" />
              <span>SaaS Reviews</span>
            </div>
            <ul className="space-y-2.5 text-[15px] text-[#FFF8EF]/90">
              <li>
                <Link href="/reviews" className="hover:text-white transition-colors">
                  All Software Reviews
                </Link>
              </li>
              <li>
                <Link href="/reviews?country=Saudi+Arabia" className="hover:text-white transition-colors">
                  Saudi ZATCA Phase 2 Tools
                </Link>
              </li>
              <li>
                <Link href="/reviews?country=UAE" className="hover:text-white transition-colors">
                  UAE VAT &amp; Corp Tax SaaS
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-white transition-colors">
                  Side-by-Side Comparisons
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-white transition-colors">
                  Browse All Categories &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Categories */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#22C55E]">
              <Scale className="h-3.5 w-3.5" />
              <span>Categories</span>
            </div>
            <ul className="space-y-2.5 text-[15px] text-[#FFF8EF]/90">
              <li>
                <Link href="/categories/erp-business-management" className="hover:text-white transition-colors">
                  ERP &amp; Operations
                </Link>
              </li>
              <li>
                <Link href="/categories/accounting-finance" className="hover:text-white transition-colors">
                  Accounting &amp; E-Invoicing
                </Link>
              </li>
              <li>
                <Link href="/categories/crm-sales" className="hover:text-white transition-colors">
                  CRM &amp; Sales Automation
                </Link>
              </li>
              <li>
                <Link href="/categories/customer-support" className="hover:text-white transition-colors">
                  Customer Support &amp; WhatsApp
                </Link>
              </li>
              <li>
                <Link href="/categories/hr-payroll" className="hover:text-white transition-colors">
                  HR &amp; Wage Protection (WPS)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Editorial & Bureaus */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#22C55E]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Publication</span>
            </div>
            <ul className="space-y-2.5 text-[15px] text-[#FFF8EF]/90">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Our Mission
                </Link>
              </li>
              <li>
                <Link href="/about#methodology" className="hover:text-white transition-colors">
                  Evaluation Methodology
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Editorial Desk
                </Link>
              </li>
              <li>
                <Link href="/contact?type=vendor" className="hover:text-white transition-colors">
                  Submit Software for Review
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Ethics &amp; Independence Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Regional Bureaus & Transparency Statement */}
        <div className="py-6 border-b border-[#0E4B39] grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-[#A3C2B8] leading-relaxed">
          <div>
            <span className="font-bold text-[#FFF8EF] uppercase tracking-wider block mb-1">
              Regional Editorial Coverage
            </span>
            Reporting from Riyadh (King Abdullah Financial District), Dubai (DIFC &amp; Dubai Internet City), Doha (Lusail), and Manama (Seef District).
          </div>
          <div>
            <span className="font-bold text-[#FFF8EF] uppercase tracking-wider block mb-1">
              Editorial Independence Notice
            </span>
            GulfSaasReview does not accept paid placements to alter software ratings or editorial conclusions. Ratings reflect independent feature audits and local compliance verification.
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-[#A3C2B8]">
          <div>
            &copy; 2026 GulfSaasReview. All rights reserved.
          </div>

          <div className="flex items-center space-x-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Editorial Contact
            </Link>
          </div>

          {/* Social Icons */}
          <div className="flex items-center space-x-2">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-[#0E4B39] text-[#FFF8EF] hover:text-[#22C55E] transition-colors"
              aria-label="LinkedIn"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.3a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26Z" />
              </svg>
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-[#0E4B39] text-[#FFF8EF] hover:text-[#22C55E] transition-colors"
              aria-label="X (Twitter)"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
