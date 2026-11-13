import React from "react";
import Link from "next/link";
import Logo from "./Logo";
import { ShieldCheck, MapPin, Globe, Mail, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#101F35] text-[#FCFAF5] border-t border-[#223859]">
      {/* Upper Main Footer Grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column (Col Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="light" showTagline={true} />
            <p className="text-sm text-[#E7E4DC]/80 leading-relaxed max-w-md pt-2">
              GulfSaasReview is the premier independent software discovery, evaluation, and comparison platform dedicated to businesses across Saudi Arabia, the UAE, and the wider GCC.
            </p>

            <div className="flex items-center gap-2 pt-2 text-xs text-[#C6A66B]">
              <ShieldCheck className="h-4 w-4" />
              <span>Independent editorial methodology • Regional GCC focus</span>
            </div>

            <div className="pt-2 flex items-center gap-4 text-xs text-[#E7E4DC]/70">
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-[#C6A66B]" />
                Riyadh & Dubai Coverage
              </span>
              <span className="flex items-center gap-1">
                <Globe className="h-3.5 w-3.5 text-[#C6A66B]" />
                GCC Market Intelligence
              </span>
            </div>
          </div>

          {/* Col 1: Platform & Reviews */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#C6A66B]">
              Software Discovery
            </h3>
            <ul className="space-y-2 text-sm text-[#E7E4DC]/80">
              <li>
                <Link href="/reviews" className="hover:text-white transition-colors">
                  All Software Reviews
                </Link>
              </li>
              <li>
                <Link href="/reviews?country=Saudi+Arabia" className="hover:text-white transition-colors">
                  Saudi Arabia (ZATCA) Tools
                </Link>
              </li>
              <li>
                <Link href="/reviews?country=UAE" className="hover:text-white transition-colors">
                  UAE VAT Compliant SaaS
                </Link>
              </li>
              <li>
                <Link href="/reviews?arabic=true" className="hover:text-white transition-colors">
                  Native Arabic RTL Software
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-white transition-colors">
                  Side-by-Side Comparisons
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Categories */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#C6A66B]">
              Top Categories
            </h3>
            <ul className="space-y-2 text-sm text-[#E7E4DC]/80">
              <li>
                <Link href="/categories/accounting-finance" className="hover:text-white transition-colors">
                  Accounting & Finance
                </Link>
              </li>
              <li>
                <Link href="/categories/crm-sales" className="hover:text-white transition-colors">
                  CRM & Sales
                </Link>
              </li>
              <li>
                <Link href="/categories/erp-business-management" className="hover:text-white transition-colors">
                  ERP & Business Management
                </Link>
              </li>
              <li>
                <Link href="/categories/hr-payroll" className="hover:text-white transition-colors">
                  HR & Wage Protection (WPS)
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-[#C6A66B] flex items-center gap-1 transition-colors">
                  <span>Browse All 8 Categories</span>
                  <ArrowUpRight className="h-3 w-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Company & Trust */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#C6A66B]">
              GulfSaasReview
            </h3>
            <ul className="space-y-2 text-sm text-[#E7E4DC]/80">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Our Mission
                </Link>
              </li>
              <li>
                <Link href="/about#methodology" className="hover:text-white transition-colors">
                  Editorial Methodology
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Our Analysts
                </Link>
              </li>
              <li>
                <Link href="/contact?type=vendor" className="hover:text-white transition-colors">
                  Request Software Listing
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Editorial Sample Notice Box */}
        <div className="mt-12 rounded-xl bg-[#14243C] border border-[#223859] p-4 text-xs text-[#E7E4DC]/70 leading-relaxed">
          <p className="font-semibold text-[#C6A66B] mb-1">
            Transparency & Research Disclaimer
          </p>
          <p>
            GulfSaasReview publishes independent product evaluations and comparison analyses for informational and research purposes. Ratings and compatibility notes reflect regional market fit, publicly declared vendor specifications, and independent evaluation frameworks. Product profiles are illustrative reviews to help Gulf businesses assess software suitability. All trademarks and brand assets belong to their respective owners.
          </p>
        </div>
      </div>

      {/* Bottom Sub-Footer Bar */}
      <div className="border-t border-[#223859] bg-[#0C1728] py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#E7E4DC]/60">
          <div>
            © 2026 GulfSaasReview. All rights reserved.
          </div>

          <div className="flex items-center space-x-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Editorial Contact
            </Link>
          </div>

          {/* Social Media Links with standard inline SVGs */}
          <div className="flex items-center space-x-3">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-md hover:bg-[#223859] hover:text-[#C6A66B] transition-colors"
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
              className="p-1.5 rounded-md hover:bg-[#223859] hover:text-[#C6A66B] transition-colors"
              aria-label="X / Twitter"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="mailto:contact@gulfsaasreview.com"
              className="p-1.5 rounded-md hover:bg-[#223859] hover:text-[#C6A66B] transition-colors"
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
