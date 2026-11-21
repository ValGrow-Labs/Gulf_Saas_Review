import React from "react";
import Link from "next/link";
import Logo from "./Logo";
import { ShieldCheck, MapPin, FileText, Layers, Scale, Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#064734] text-[#FFF8EF] border-t-2 border-[#0A5C44]">
      {/* Top Editorial Authority Strip (Bigger & High Contrast) */}
      <div className="border-b border-[#0A5C44] bg-[#043224]">
        <div className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8 xl:px-12 py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-base text-white font-bold">
            <span className="flex h-2.5 w-2.5 rounded-full bg-[#E0FFC2]" />
            <span>Independent GCC Software &amp; Tech Intelligence</span>
            <span className="text-[#4A6D5F] hidden sm:inline">•</span>
            <span className="text-[#FFF8EF]/90 font-medium hidden sm:inline">Unbiased evaluations for Saudi Arabia, UAE &amp; the GCC</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm font-bold text-[#FFF8EF]">
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#E0FFC2]" />
              Coverage: Saudi Arabia • UAE • Qatar • Kuwait • Bahrain • Oman
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8 xl:px-12 py-12 sm:py-16">
        {/* Main 5-Column Grid (2 Sizes Bigger & Clearer) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 pb-12 border-b border-[#0A5C44]">
          {/* Brand Info (2 Columns) */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="light" showTagline={false} />
            <p className="text-base sm:text-lg text-[#FFF8EF] leading-relaxed max-w-sm font-medium">
              GulfSaasReview is the premier independent business software directory and regional technology evaluation authority for the Middle East.
            </p>
            <div className="pt-2 flex items-center gap-2 text-base text-[#E0FFC2] font-bold">
              <ShieldCheck className="h-5 w-5 shrink-0 text-[#E0FFC2]" />
              <span>ZATCA Phase 2 • UAE Corporate Tax • Bilingual RTL</span>
            </div>
            <div className="pt-1 text-sm text-[#A5C2B6] leading-relaxed font-medium">
              Published by Gulf Business Intelligence Media FZ-LLC. Free from vendor sponsorship bias.
            </div>
          </div>

          {/* Col 1: Software Selection Guides */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm sm:text-base font-extrabold uppercase tracking-wider text-[#E0FFC2]">
              <FileText className="h-4 w-4" />
              <span>Buyer Guides</span>
            </div>
            <ul className="space-y-3 text-base text-[#FFF8EF] font-medium">
              <li>
                <Link href="/articles" className="hover:text-[#E0FFC2] transition-colors">
                  All Selection Guides
                </Link>
              </li>
              <li>
                <Link href="/articles/best-accounting-software-saudi-arabia-zatca" className="hover:text-[#E0FFC2] transition-colors">
                  Saudi ZATCA Phase 2 Guide
                </Link>
              </li>
              <li>
                <Link href="/articles/top-crm-platforms-uae-companies" className="hover:text-[#E0FFC2] transition-colors">
                  UAE CRM &amp; WhatsApp Guide
                </Link>
              </li>
              <li>
                <Link href="/articles/how-to-choose-erp-gcc-enterprises" className="hover:text-[#E0FFC2] transition-colors">
                  GCC ERP Selection Playbook
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-[#E0FFC2] transition-colors">
                  Side-by-Side Comparisons
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Software Directory */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm sm:text-base font-extrabold uppercase tracking-wider text-[#E0FFC2]">
              <Layers className="h-4 w-4" />
              <span>SaaS Reviews</span>
            </div>
            <ul className="space-y-3 text-base text-[#FFF8EF] font-medium">
              <li>
                <Link href="/reviews" className="hover:text-[#E0FFC2] transition-colors">
                  All Software Reviews
                </Link>
              </li>
              <li>
                <Link href="/reviews?country=Saudi+Arabia" className="hover:text-[#E0FFC2] transition-colors">
                  Saudi ZATCA Tools
                </Link>
              </li>
              <li>
                <Link href="/reviews?country=UAE" className="hover:text-[#E0FFC2] transition-colors">
                  UAE Corporate Tax SaaS
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-[#E0FFC2] transition-colors">
                  Side-by-Side Comparisons
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-[#E0FFC2] transition-colors">
                  Browse All Categories &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Categories */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm sm:text-base font-extrabold uppercase tracking-wider text-[#E0FFC2]">
              <Scale className="h-4 w-4" />
              <span>Categories</span>
            </div>
            <ul className="space-y-3 text-base text-[#FFF8EF] font-medium">
              <li>
                <Link href="/categories/erp-business-management" className="hover:text-[#E0FFC2] transition-colors">
                  ERP &amp; Operations
                </Link>
              </li>
              <li>
                <Link href="/categories/accounting-finance" className="hover:text-[#E0FFC2] transition-colors">
                  Accounting &amp; E-Invoicing
                </Link>
              </li>
              <li>
                <Link href="/categories/crm-sales" className="hover:text-[#E0FFC2] transition-colors">
                  CRM &amp; Sales Pipelines
                </Link>
              </li>
              <li>
                <Link href="/categories/customer-support" className="hover:text-[#E0FFC2] transition-colors">
                  Customer Desks &amp; WhatsApp
                </Link>
              </li>
              <li>
                <Link href="/categories/hr-payroll" className="hover:text-[#E0FFC2] transition-colors">
                  HR &amp; Wage Protection (WPS)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm sm:text-base font-extrabold uppercase tracking-wider text-[#E0FFC2]">
              <Sparkles className="h-4 w-4" />
              <span>Platform</span>
            </div>
            <ul className="space-y-3 text-base text-[#FFF8EF] font-medium">
              <li>
                <Link href="/about" className="hover:text-[#E0FFC2] transition-colors">
                  About Our Mission
                </Link>
              </li>
              <li>
                <Link href="/about#methodology" className="hover:text-[#E0FFC2] transition-colors">
                  Evaluation Methodology
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#E0FFC2] transition-colors">
                  Contact Editorial Desk
                </Link>
              </li>
              <li>
                <Link href="/contact?type=vendor" className="hover:text-[#E0FFC2] transition-colors">
                  Submit Software for Review
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[#E0FFC2] transition-colors">
                  Ethics &amp; Independence
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Regional Coverage Statement */}
        <div className="py-6 border-b border-[#0A5C44] grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-[#A5C2B6] leading-relaxed font-medium">
          <div>
            <span className="font-extrabold text-[#FFF8EF] uppercase tracking-wider block mb-1 text-sm">
              Regional Software Audits
            </span>
            Auditing cloud software and compliance for enterprises and SMBs across Riyadh, Dubai, Abu Dhabi, Doha, and Kuwait City.
          </div>
          <div>
            <span className="font-extrabold text-[#FFF8EF] uppercase tracking-wider block mb-1 text-sm">
              Editorial Independence Notice
            </span>
            GulfSaasReview does not accept paid placements to alter software ratings or editorial conclusions. Ratings reflect independent feature audits and local compliance verification.
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm sm:text-base text-[#A5C2B6] font-medium">
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
              Contact Us
            </Link>
          </div>

          {/* Social Icons */}
          <div className="flex items-center space-x-3">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-[#0A5C44] text-[#FFF8EF] hover:text-[#E0FFC2] transition-colors"
              aria-label="LinkedIn"
            >
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.3a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26Z" />
              </svg>
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-[#0A5C44] text-[#FFF8EF] hover:text-[#E0FFC2] transition-colors"
              aria-label="X (Twitter)"
            >
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
