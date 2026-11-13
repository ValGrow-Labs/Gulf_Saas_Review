import React from "react";
import Link from "next/link";
import Logo from "./Logo";
import {
  ShieldCheck,
  MapPin,
  Globe2,
  Mail,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#101F35] text-[#FCFAF5] border-t border-[#223859]">
      {/* ---------------------------------------------------- */}
      {/* NEW STYLE PRE-FOOTER: Regional Market Trust Strip    */}
      {/* ---------------------------------------------------- */}
      <div className="border-b border-[#223859] bg-[#0C1728]/80 py-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <span className="flex h-3 w-3 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <div>
              <span className="text-sm sm:text-base font-bold text-white block">
                Independent Gulf Software Directory &amp; Compliance Research
              </span>
              <span className="text-xs sm:text-sm text-[#C6A66B]">
                Regularly updated for ZATCA Phase 2, UAE FTA VAT, and GCC Labor Laws
              </span>
            </div>
          </div>

          {/* Regional Country Coverage Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm font-semibold">
            <span className="rounded-full bg-[#14243C] border border-[#223859] px-3.5 py-1.5 text-white">
              🇸🇦 Saudi Arabia
            </span>
            <span className="rounded-full bg-[#14243C] border border-[#223859] px-3.5 py-1.5 text-white">
              🇦🇪 United Arab Emirates
            </span>
            <span className="rounded-full bg-[#14243C] border border-[#223859] px-3.5 py-1.5 text-white">
              🇶🇦 Qatar
            </span>
            <span className="rounded-full bg-[#14243C] border border-[#223859] px-3.5 py-1.5 text-white">
              🇰🇼 Kuwait
            </span>
            <span className="rounded-full bg-[#14243C] border border-[#223859] px-3.5 py-1.5 text-white">
              🇧🇭 Bahrain
            </span>
            <span className="rounded-full bg-[#14243C] border border-[#223859] px-3.5 py-1.5 text-white">
              🇴🇲 Oman
            </span>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* MAIN FOOTER NAVIGATION GRID                          */}
      {/* ---------------------------------------------------- */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand Column (Col 4) */}
          <div className="lg:col-span-4 space-y-5">
            <Logo variant="light" showTagline={true} />

            <p className="text-sm sm:text-base text-[#F6F1E7]/90 leading-relaxed max-w-md pt-1">
              GulfSaasReview is the independent software discovery, testing, and comparison platform built specifically for businesses across Saudi Arabia, the UAE, and the wider GCC.
            </p>

            <div className="space-y-2.5 pt-2">
              <div className="flex items-center gap-2 text-sm text-[#C6A66B] font-semibold">
                <ShieldCheck className="h-4 w-4 shrink-0" />
                <span>100% Independent Editorial Methodology</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#E7E4DC]/90">
                <MapPin className="h-4 w-4 text-[#C6A66B] shrink-0" />
                <span>Riyadh (Olaya) &amp; Dubai (Internet City) Desks</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#E7E4DC]/90">
                <Mail className="h-4 w-4 text-[#C6A66B] shrink-0" />
                <span>editorial@gulfsaasreview.com</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/contact?type=vendor"
                className="inline-flex items-center gap-2 rounded-xl bg-[#C6A66B] px-4 py-2.5 text-xs sm:text-sm font-bold text-[#101F35] hover:bg-[#DFCA9B] transition-colors shadow-sm"
              >
                <span>Request Vendor Review Listing</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Col 1: Software Reviews (Col 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#C6A66B]">
              Software Discovery
            </h3>
            <ul className="space-y-3 text-sm sm:text-base text-[#E7E4DC]">
              <li>
                <Link href="/reviews" className="hover:text-white hover:underline transition-colors block">
                  All Software Reviews
                </Link>
              </li>
              <li>
                <Link href="/reviews?country=Saudi+Arabia" className="hover:text-white hover:underline transition-colors block">
                  Saudi Arabia (ZATCA) Tools
                </Link>
              </li>
              <li>
                <Link href="/reviews?country=UAE" className="hover:text-white hover:underline transition-colors block">
                  UAE VAT Compliant SaaS
                </Link>
              </li>
              <li>
                <Link href="/reviews?arabic=true" className="hover:text-white hover:underline transition-colors block">
                  Native Arabic RTL Software
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-white hover:underline transition-colors block">
                  Side-by-Side Comparisons
                </Link>
              </li>
              <li>
                <Link href="/reviews?pricing=free" className="hover:text-white hover:underline transition-colors block">
                  Free Tier Business Tools
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Categories (Col 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#C6A66B]">
              Top Categories
            </h3>
            <ul className="space-y-3 text-sm sm:text-base text-[#E7E4DC]">
              <li>
                <Link href="/categories/accounting-finance" className="hover:text-white hover:underline transition-colors block">
                  Accounting &amp; Finance
                </Link>
              </li>
              <li>
                <Link href="/categories/crm-sales" className="hover:text-white hover:underline transition-colors block">
                  CRM &amp; Sales Pipelines
                </Link>
              </li>
              <li>
                <Link href="/categories/erp-business-management" className="hover:text-white hover:underline transition-colors block">
                  ERP &amp; Business Management
                </Link>
              </li>
              <li>
                <Link href="/categories/hr-payroll" className="hover:text-white hover:underline transition-colors block">
                  HR &amp; Wage Protection (WPS)
                </Link>
              </li>
              <li>
                <Link href="/categories/ecommerce" className="hover:text-white hover:underline transition-colors block">
                  E-Commerce &amp; Retail POS
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-[#C6A66B] flex items-center gap-1 font-semibold transition-colors">
                  <span>Browse All 8 Categories</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Company & Insights (Col 2) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#C6A66B]">
              GulfSaasReview
            </h3>
            <ul className="space-y-3 text-sm sm:text-base text-[#E7E4DC]">
              <li>
                <Link href="/about" className="hover:text-white hover:underline transition-colors block">
                  About Our Mission
                </Link>
              </li>
              <li>
                <Link href="/about#methodology" className="hover:text-white hover:underline transition-colors block">
                  Editorial Rubric
                </Link>
              </li>
              <li>
                <Link href="/articles" className="hover:text-white hover:underline transition-colors block">
                  Latest Insights
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white hover:underline transition-colors block">
                  Contact Our Desk
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white hover:underline transition-colors block">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white hover:underline transition-colors block">
                  Terms &amp; Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* NEW STYLE EDITORIAL DISCLAIMER CARD                  */}
        {/* ---------------------------------------------------- */}
        <div className="mt-14 rounded-2xl bg-[#14243C] border border-[#223859] p-6 sm:p-7 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-[#C6A66B] shrink-0" />
              <h4 className="text-sm sm:text-base font-bold text-white">
                Editorial Transparency &amp; Regional Research Notice
              </h4>
            </div>
            <span className="text-xs font-semibold text-[#C6A66B] bg-[#101F35] border border-[#223859] px-3 py-1 rounded-full">
              Middle East Software Standards
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#E7E4DC]/90 leading-relaxed">
            GulfSaasReview provides independent software evaluations, side-by-side product comparisons, and compliance guides for informational and decision-support purposes. Review ratings and compatibility assessments reflect verified regional features, public vendor documentation, and our Middle East evaluation rubric. Product profiles represent illustrative review samples to assist Gulf businesses in evaluating software fit. All brand trademarks, logos, and product identities belong to their respective registered owners.
          </p>
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* BOTTOM COPYRIGHT & LEGAL BAR                         */}
      {/* ---------------------------------------------------- */}
      <div className="border-t border-[#223859] bg-[#0A1424] py-6 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-[#E7E4DC]/80">
          <div className="text-center md:text-left">
            © 2026 GulfSaasReview. All rights reserved. Independent Middle East SaaS Discovery &amp; Research.
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms &amp; Conditions
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Editorial Contact
            </Link>
          </div>

          {/* Social Icons in Modern Rounded Badges */}
          <div className="flex items-center space-x-2.5">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-[#14243C] border border-[#223859] text-[#E7E4DC] hover:text-[#C6A66B] hover:border-[#C6A66B] transition-all"
              aria-label="LinkedIn"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.3a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26Z" />
              </svg>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-[#14243C] border border-[#223859] text-[#E7E4DC] hover:text-[#C6A66B] hover:border-[#C6A66B] transition-all"
              aria-label="X / Twitter"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="mailto:contact@gulfsaasreview.com"
              className="p-2 rounded-lg bg-[#14243C] border border-[#223859] text-[#E7E4DC] hover:text-[#C6A66B] hover:border-[#C6A66B] transition-all"
              aria-label="Email Us"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
