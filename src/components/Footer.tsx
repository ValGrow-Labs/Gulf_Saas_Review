import React from "react";
import Link from "next/link";
import Logo from "./Logo";
import { ShieldCheck, Mail, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#101F35] text-[#FCFAF5] border-t border-[#223859]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-14">
        {/* Main Clean 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 pb-10 border-b border-[#223859]/80">
          {/* Brand Info (Col 2) */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="light" showTagline={false} />
            <p className="text-[17px] text-[#E7E4DC]/90 leading-relaxed max-w-sm">
              Independent software reviews, comparisons and practical technology insights for businesses across KSA, UAE and the GCC.
            </p>
            <div className="flex items-center gap-2 text-[15px] text-[#C6A66B] font-semibold">
              <ShieldCheck className="h-4 w-4 shrink-0" />
              <span>Independent Editorial Standards • Riyadh &amp; Dubai</span>
            </div>
          </div>

          {/* Col 1: Software Reviews */}
          <div className="space-y-3">
            <h3 className="text-[15px] font-bold uppercase tracking-wider text-[#C6A66B]">
              Reviews
            </h3>
            <ul className="space-y-2.5 text-[16px] text-[#E7E4DC]">
              <li>
                <Link href="/reviews" className="hover:text-white transition-colors">
                  All Software Reviews
                </Link>
              </li>
              <li>
                <Link href="/reviews?country=Saudi+Arabia" className="hover:text-white transition-colors">
                  Saudi (ZATCA) Tools
                </Link>
              </li>
              <li>
                <Link href="/reviews?country=UAE" className="hover:text-white transition-colors">
                  UAE VAT Ready SaaS
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
            <h3 className="text-[15px] font-bold uppercase tracking-wider text-[#C6A66B]">
              Categories
            </h3>
            <ul className="space-y-2.5 text-[16px] text-[#E7E4DC]">
              <li>
                <Link href="/categories/accounting-finance" className="hover:text-white transition-colors">
                  Accounting &amp; Finance
                </Link>
              </li>
              <li>
                <Link href="/categories/crm-sales" className="hover:text-white transition-colors">
                  CRM &amp; Sales Pipelines
                </Link>
              </li>
              <li>
                <Link href="/categories/erp-business-management" className="hover:text-white transition-colors">
                  ERP &amp; Business Management
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-[#C6A66B] font-bold inline-flex items-center gap-1 transition-colors">
                  <span>Browse All 8 &rarr;</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Company */}
          <div className="space-y-3">
            <h3 className="text-[15px] font-bold uppercase tracking-wider text-[#C6A66B]">
              Company
            </h3>
            <ul className="space-y-2.5 text-[16px] text-[#E7E4DC]">
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
                  Contact Our Desk
                </Link>
              </li>
              <li>
                <Link href="/contact?type=vendor" className="hover:text-white transition-colors">
                  Request Vendor Listing
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Short Concise Disclaimer Strip */}
        <div className="py-4 text-[14px] text-[#E7E4DC]/70 leading-relaxed flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#223859]/60">
          <span>
            Independent research &amp; sample review directory for GCC enterprise software. All brand trademarks belong to their respective owners.
          </span>
          <span className="text-[#C6A66B] font-semibold shrink-0">
            KSA • UAE • GCC Coverage
          </span>
        </div>

        {/* Bottom Clean Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[15px] text-[#E7E4DC]/80">
          <div>
            © 2026 GulfSaasReview. All rights reserved.
          </div>

          <div className="flex items-center space-x-6 text-[15px]">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms &amp; Conditions
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Contact
            </Link>
          </div>

          {/* Compact Social Icons */}
          <div className="flex items-center space-x-2">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-[#14243C] text-[#E7E4DC] hover:text-[#C6A66B] transition-colors"
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
              className="p-2 rounded-lg bg-[#14243C] text-[#E7E4DC] hover:text-[#C6A66B] transition-colors"
              aria-label="X / Twitter"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="mailto:contact@gulfsaasreview.com"
              className="p-2 rounded-lg bg-[#14243C] text-[#E7E4DC] hover:text-[#C6A66B] transition-colors"
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
