import React from "react";
import Link from "next/link";
import { softwares } from "@/data/software";
import { comparisons } from "@/data/comparisons";
import { categories } from "@/data/categories";
import { articles } from "@/data/articles";
import SoftwareCard from "@/components/SoftwareCard";
import NewsletterSection from "@/components/NewsletterSection";
import SoftwareSlider from "@/components/SoftwareSlider";
import {
  ArrowRight,
  Scale,
  User,
  ShieldCheck,
  FileText,
  Layers,
  Calculator,
  Users,
  Briefcase,
  CheckSquare,
  Send,
  ShoppingBag,
  Headphones,
  Star,
  CheckCircle2,
  Check,
  Table,
  ChevronRight,
} from "lucide-react";

const categoryIcons: Record<string, React.ElementType> = {
  Calculator,
  Users,
  Briefcase,
  CheckSquare,
  Send,
  ShoppingBag,
  Layers,
  Headphones,
};

export default function HomePage() {
  const featuredSlugs = [
    "zoho-one",
    "odoo",
    "quickbooks-online",
    "hubspot-crm",
    "xero",
    "freshdesk",
    "zenhr",
    "sap-business-one",
  ];
  const featuredSoftware = featuredSlugs
    .map((slug) => softwares.find((s) => s.slug === slug))
    .filter((s): s is (typeof softwares)[0] => Boolean(s));

  // GCC Software Market Index Table (Simpler, Shorter, 2 Sizes Bigger)
  const marketIndexRows = [
    {
      name: "Zoho One",
      slug: "zoho-one",
      category: "ERP & Operations",
      country: "KSA, UAE",
      compliance: "ZATCA Phase 2 Certified",
      arabic: "Native RTL",
      price: "SAR 139 / mo",
      rating: 4.8,
      accentColor: "#0F8265",
    },
    {
      name: "Odoo ERP",
      slug: "odoo",
      category: "Business Suite",
      country: "KSA, UAE",
      compliance: "UAE 9% Corporate Tax",
      arabic: "Native RTL",
      price: "SAR 75 / mo",
      rating: 4.7,
      accentColor: "#714B67",
    },
    {
      name: "HubSpot CRM",
      slug: "hubspot-crm",
      category: "CRM & Sales",
      country: "Pan-GCC",
      compliance: "WhatsApp API Sync",
      arabic: "Bilingual",
      price: "$20 / mo",
      rating: 4.8,
      accentColor: "#FF7A59",
    },
    {
      name: "QuickBooks",
      slug: "quickbooks-online",
      category: "Accounting",
      country: "UAE, KSA",
      compliance: "VAT Filing Apps",
      arabic: "English/Partial",
      price: "SAR 80 / mo",
      rating: 4.4,
      accentColor: "#2CA01C",
    },
    {
      name: "Xero",
      slug: "xero",
      category: "Cloud Accounts",
      country: "UAE, Qatar",
      compliance: "Multi-Currency Bank Feeds",
      arabic: "Add-on RTL",
      price: "$15 / mo",
      rating: 4.5,
      accentColor: "#13B5EA",
    },
    {
      name: "Freshdesk",
      slug: "freshdesk",
      category: "Customer Support",
      country: "Pan-GCC",
      compliance: "WhatsApp Helpdesk",
      arabic: "Native RTL",
      price: "$18 / mo",
      rating: 4.6,
      accentColor: "#0066CC",
    },
    {
      name: "ZenHR",
      slug: "zenhr",
      category: "HR & Payroll",
      country: "Saudi, UAE",
      compliance: "Saudi Mudad & WPS",
      arabic: "Native RTL",
      price: "SAR 25 / user",
      rating: 4.7,
      accentColor: "#10B981",
    },
    {
      name: "SAP Business One",
      slug: "sap-business-one",
      category: "Enterprise ERP",
      country: "Pan-GCC",
      compliance: "ZATCA & Multi-Entity",
      arabic: "Native RTL",
      price: "Custom Quote",
      rating: 4.5,
      accentColor: "#0070F2",
    },
  ];

  const standards = [
    {
      rank: "01",
      tag: "Saudi Mandate",
      title: "ZATCA Phase 2 E-Invoicing",
      summary: "Real-time XML clearance and cryptographic stamps for Saudi businesses.",
      badge: "Mandatory KSA",
    },
    {
      rank: "02",
      tag: "UAE Federal Tax",
      title: "UAE Corporate Tax & VAT",
      summary: "FTA-compliant 9% corporate tax computation and bilingual audit files.",
      badge: "Mandatory UAE",
    },
    {
      rank: "03",
      tag: "Labor Compliance",
      title: "Wage Protection (WPS)",
      summary: "Automated SIF payroll files for Saudi Mudad, UAE MOHRE, and regional banks.",
      badge: "Pan-GCC WPS",
    },
    {
      rank: "04",
      tag: "Data Privacy",
      title: "Sovereign Cloud Residency",
      summary: "In-country data hosting adhering to Saudi and UAE national PDPL laws.",
      badge: "Sovereign Cloud",
    },
    {
      rank: "05",
      tag: "Localization",
      title: "Authentic Arabic RTL",
      summary: "True right-to-left layout architecture with bilingual Arabic invoices.",
      badge: "Native Arabic",
    },
    {
      rank: "06",
      tag: "Regional Channels",
      title: "WhatsApp Business API",
      summary: "Direct WhatsApp messaging for invoices, quotes, and customer support.",
      badge: "WhatsApp First",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#FFF8EF]">
      {/* ---------------------------------------------------- */}
      {/* SECTION 1: FLOATING HERO SPOTLIGHT WITH MOVING GRADIENT ANIMATION */}
      {/* ---------------------------------------------------- */}
      <section className="bg-[#FFF8EF] py-14 sm:py-18 lg:py-24 border-b-2 border-[#E5DAC8] relative overflow-hidden">
        {/* Animated Moving Gradient Base */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFF8EF] via-[#F4ECE1]/70 to-[#FFF8EF] animate-gradient-shift pointer-events-none" />

        {/* Subtle Tech Dot Matrix Grid Overlay */}
        <div className="absolute inset-0 hero-dot-grid opacity-70 [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_80%)] pointer-events-none" />

        {/* Left Moving Fluid Gradient Orb (Vibrant Coral Glow) */}
        <div
          aria-hidden="true"
          className="absolute -left-28 sm:-left-16 top-12 sm:top-8 w-[480px] sm:w-[660px] h-[480px] sm:h-[660px] rounded-full bg-gradient-to-tr from-[#E0FFC2]/50 via-[#E0FFC2]/25 to-transparent blur-[85px] sm:blur-[115px] pointer-events-none animate-float-orb-1"
        />

        {/* Right Moving Fluid Gradient Orb (Deep Teal & Cyan Sheen) */}
        <div
          aria-hidden="true"
          className="absolute -right-28 sm:-right-16 top-24 sm:top-16 w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] rounded-full bg-gradient-to-bl from-[#064734]/28 via-[#0A5C44]/22 to-transparent blur-[95px] sm:blur-[125px] pointer-events-none animate-float-orb-2"
        />

        {/* Center Pulsing Ambient Aurora (Coral-Teal Harmony) */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] sm:w-[860px] h-[360px] sm:h-[500px] rounded-full bg-gradient-to-r from-[#E0FFC2]/25 via-[#0A5C44]/20 to-[#E0FFC2]/15 blur-[85px] sm:blur-[115px] pointer-events-none animate-float-orb-3"
        />

        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          {/* Floating Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border-2 border-[#BDE895] bg-[#E0FFC2] px-4 py-1.5 text-xs sm:text-sm font-extrabold text-[#064734] shadow-xs mb-5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#15803D] animate-pulse shrink-0" />
            <span>The Independent Software Guide for Saudi Arabia, UAE &amp; GCC</span>
          </div>

          {/* Main Headline (Floating, Majestic Typography) */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[56px] font-bold font-serif text-[#064734] tracking-tight leading-[1.16] max-w-4xl">
            Find the Right Software for Your Business in the Gulf
          </h1>

          {/* Floating Subtitle */}
          <p className="mt-5 text-base sm:text-lg md:text-xl font-medium text-[#163A2E] leading-relaxed max-w-3xl">
            Independent reviews, comparisons, and ZATCA compliance checks for Accounting, CRM, HR, and ERP software across the Middle East.
          </p>

          {/* Floating Action Buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/reviews"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#064734] px-7 py-3.5 text-base sm:text-lg font-bold text-white hover:bg-[#043224] hover:-translate-y-0.5 transition-all shadow-md min-h-[48px]"
            >
              <span>Browse 50+ Reviews</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/categories"
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#E5DAC8] bg-white px-6 py-3.5 text-base sm:text-lg font-bold text-[#064734] hover:border-[#064734] hover:text-[#064734] hover:-translate-y-0.5 transition-all shadow-xs min-h-[48px]"
            >
              <Layers className="h-4 w-4 text-[#15803D]" />
              <span>Explore Categories</span>
            </Link>
            <Link
              href="/compare"
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#E5DAC8] bg-white px-6 py-3.5 text-base sm:text-lg font-bold text-[#064734] hover:border-[#064734] hover:text-[#064734] hover:-translate-y-0.5 transition-all shadow-xs min-h-[48px]"
            >
              <Scale className="h-4 w-4 text-[#15803D]" />
              <span>Compare Matrix</span>
            </Link>
          </div>

          {/* Floating Trust Bar (High Contrast & Clear) */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-[#064734] font-bold">
            <span>✓ 50+ Audited GCC Tools</span>
            <span className="text-[#BDE895]">•</span>
            <span>✓ 100% Sponsor-Free Editorial</span>
            <span className="text-[#BDE895]">•</span>
            <span>✓ Saudi ZATCA &amp; UAE FTA Verified</span>
            <span className="text-[#BDE895]">•</span>
            <span>✓ Free Instant Access</span>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SECTION 2: BROWSE SOFTWARE BY CATEGORY (STATIC GRID) */}
      {/* ---------------------------------------------------- */}
      <section className="py-10 sm:py-12 bg-[#F4ECE1] border-b-2 border-[#E5DAC8]">
        <div className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8 xl:px-12 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-3 border-b-2 border-[#E5DAC8]">
            <div>
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#15803D] mb-1">
                <Layers className="h-4 w-4" />
                <span>Browse by Business Need</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-[#064734] tracking-tight">
                Software Categories for Gulf Businesses
              </h2>
              <p className="mt-1 text-sm sm:text-base text-[#163A2E] font-medium max-w-3xl">
                Explore dedicated directories grouped by organizational function, verified for Middle Eastern legal and commercial standards.
              </p>
            </div>

            <Link
              href="/categories"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#064734] hover:text-[#15803D] transition-colors shrink-0"
            >
              <span>View All Categories</span>
              <ArrowRight className="h-4 w-4 text-[#15803D]" />
            </Link>
          </div>

          {/* 4-Column x 2-Row Grid of 8 Categories */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {categories.slice(0, 8).map((cat) => {
              const IconComponent = categoryIcons[cat.iconName] || Layers;
              return (
                <Link
                  key={cat.id}
                  href={`/reviews?category=${cat.slug}`}
                  className="group flex flex-col justify-between rounded-2xl border-2 border-[#E5DAC8] bg-white p-5 transition-all duration-200 hover:border-[#064734] hover:shadow-md cursor-pointer"
                >
                  <div>
                    {/* Top Bar: Icon & Count Badge */}
                    <div className="flex items-center justify-between mb-3.5">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#064734] text-[#E0FFC2] group-hover:bg-[#E0FFC2] group-hover:text-[#064734] transition-colors duration-200 shadow-2xs">
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <span className="rounded-lg bg-[#E0FFC2] border border-[#BDE895] px-2.5 py-1 text-xs font-extrabold text-[#064734]">
                        {cat.count}+ tools
                      </span>
                    </div>

                    <h3 className="font-serif text-lg font-bold text-[#064734] group-hover:text-[#15803D] transition-colors leading-snug">
                      {cat.name}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-[#163A2E] font-medium line-clamp-2 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t-2 border-[#E5DAC8] flex items-center justify-between text-xs sm:text-sm font-bold text-[#064734] group-hover:text-[#15803D] transition-colors">
                    <span>Explore Tools</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SECTION 3: GCC SAAS DIRECTORY INDEX TABLE (2 SIZES BIGGER) */}
      {/* ---------------------------------------------------- */}
      <section className="py-8 sm:py-10 bg-[#FFF8EF] border-b-2 border-[#E5DAC8]">
        <div className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8 xl:px-12 space-y-5">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 pb-3 border-b-2 border-[#E5DAC8]">
            <div>
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#15803D] mb-1">
                <Table className="h-4 w-4" />
                <span>The GCC Software Index</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-[#064734] tracking-tight">
                The GCC SaaS Directory &amp; Compliance Index
              </h2>
              <p className="mt-1 text-sm sm:text-base text-[#163A2E] font-medium">
                Every audited business platform summarized in a single-line view for fast regional comparison.
              </p>
            </div>

            <Link
              href="/reviews"
              className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-[#064734] hover:text-[#15803D] transition-colors shrink-0"
            >
              <span>Full 50+ Tool Directory</span>
              <ArrowRight className="h-4 w-4 text-[#15803D]" />
            </Link>
          </div>

          {/* Table (2 Sizes Bigger & Simpler) */}
          <div className="rounded-2xl border-2 border-[#E5DAC8] bg-white overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-[#064734] text-white uppercase text-xs sm:text-sm font-extrabold tracking-wider">
                  <tr>
                    <th scope="col" className="py-4 px-4">Software</th>
                    <th scope="col" className="py-4 px-3">Category</th>
                    <th scope="col" className="py-4 px-3">Suitability</th>
                    <th scope="col" className="py-4 px-4">Compliance Highlights</th>
                    <th scope="col" className="py-4 px-3">Arabic RTL</th>
                    <th scope="col" className="py-4 px-3">Starting Price</th>
                    <th scope="col" className="py-4 px-3 text-center">Score</th>
                    <th scope="col" className="py-4 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-[#E5DAC8] text-[#064734] font-medium">
                  {marketIndexRows.map((row) => (
                    <tr
                      key={row.slug}
                      className="hover:bg-[#F4ECE1]/60 transition-colors group"
                    >
                      {/* Name */}
                      <td className="py-3.5 px-4 font-bold text-[#064734]">
                        <Link
                          href={`/reviews/${row.slug}`}
                          className="flex items-center gap-2.5 group-hover:text-[#15803D] transition-colors"
                        >
                          <div
                            className="h-7 w-7 rounded-lg flex items-center justify-center text-xs text-white font-extrabold shadow-2xs"
                            style={{ backgroundColor: row.accentColor }}
                          >
                            {row.name.substring(0, 2).toUpperCase()}
                          </div>
                          <span className="font-bold text-sm sm:text-base">{row.name}</span>
                        </Link>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-3 text-[#3C6152] font-semibold text-xs sm:text-sm">
                        {row.category}
                      </td>

                      {/* Suitability */}
                      <td className="py-3.5 px-3">
                        <span className="inline-flex items-center gap-1 rounded-md bg-[#E0FFC2] px-2.5 py-1 text-xs font-bold text-[#064734] border border-[#BDE895]">
                          {row.country}
                        </span>
                      </td>

                      {/* Compliance */}
                      <td className="py-3.5 px-4 font-semibold text-xs sm:text-sm text-[#064734]">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-[#15803D] shrink-0" />
                          <span>{row.compliance}</span>
                        </div>
                      </td>

                      {/* Arabic RTL */}
                      <td className="py-3.5 px-3">
                        <span className="text-xs sm:text-sm font-bold text-[#15803D]">
                          {row.arabic}
                        </span>
                      </td>

                      {/* Pricing */}
                      <td className="py-3.5 px-3 font-extrabold text-xs sm:text-sm text-[#064734]">
                        {row.price}
                      </td>

                      {/* Rating */}
                      <td className="py-3.5 px-3 text-center">
                        <span className="inline-flex items-center gap-1 rounded-md bg-[#FFF8EF] px-2.5 py-1 text-xs sm:text-sm font-bold text-[#064734] border border-[#E5DAC8]">
                          <Star className="h-3.5 w-3.5 fill-[#D97706] text-[#D97706]" />
                          {row.rating.toFixed(1)}
                        </span>
                      </td>

                      {/* Action */}
                      <td className="py-3.5 px-4 text-right">
                        <Link
                          href={`/reviews/${row.slug}`}
                          className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#064734] group-hover:text-[#15803D] hover:underline"
                        >
                          <span>Review</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table Footer */}
            <div className="border-t-2 border-[#E5DAC8] bg-[#FFF8EF] px-5 py-3 flex items-center justify-between text-xs sm:text-sm text-[#3C6152] font-semibold">
              <span>Audited under Saudi Arabia ZATCA Phase 2, UAE FTA Corporate Tax, and Regional WPS Standards</span>
              <Link href="/reviews" className="font-bold text-[#064734] hover:text-[#15803D] inline-flex items-center gap-1">
                <span>View Full Database</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SECTION 4: FEATURED INDEPENDENT EVALUATIONS (SLIDER) */}
      {/* ---------------------------------------------------- */}
      <section className="py-8 sm:py-10 bg-[#F4ECE1] border-b-2 border-[#E5DAC8]">
        <div className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8 xl:px-12">
          <SoftwareSlider softwares={featuredSoftware} />
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SECTION 5: HEAD-TO-HEAD COMPARISON BENCHMARKS        */}
      {/* ---------------------------------------------------- */}
      <section className="py-8 sm:py-10 bg-[#FFF8EF] border-b-2 border-[#E5DAC8]">
        <div className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8 xl:px-12 space-y-5">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 pb-3 border-b-2 border-[#E5DAC8]">
            <div>
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#15803D] mb-1">
                <Scale className="h-4 w-4" />
                <span>Side-by-Side Analysis</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-[#064734] tracking-tight">
                Featured Head-to-Head Comparisons
              </h2>
              <p className="mt-1 text-sm sm:text-base text-[#163A2E] font-medium">
                Direct benchmark evaluations comparing implementation costs, regional tax integration, and team adoption friction.
              </p>
            </div>

            <Link
              href="/compare"
              className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-[#064734] hover:text-[#15803D] transition-colors shrink-0"
            >
              <span>All Comparisons</span>
              <ArrowRight className="h-4 w-4 text-[#15803D]" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {comparisons.slice(0, 2).map((comp) => (
              <div
                key={comp.id}
                className="rounded-2xl border-2 border-[#E5DAC8] bg-white p-5 hover:border-[#064734] transition-all duration-200 shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-[#064734] bg-[#E0FFC2] px-2.5 py-1 rounded-md border border-[#BDE895]">
                      {comp.categories?.[0] || "Head-to-Head"}
                    </span>
                    <span className="text-xs font-bold text-[#15803D]">Bilingual Audit</span>
                  </div>

                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#064734] leading-snug">
                    <Link href={`/compare/${comp.slug}`} className="hover:text-[#15803D] transition-colors">
                      {comp.title}
                    </Link>
                  </h3>

                  {/* 1-Line Description */}
                  <p className="mt-2 text-xs sm:text-sm text-[#163A2E] font-medium truncate" title={comp.shortDescription}>
                    {comp.shortDescription}
                  </p>
                </div>

                <div className="mt-4 pt-3.5 border-t-2 border-[#E5DAC8] flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-[#3C6152] font-medium">
                    GCC Verdict &amp; Pricing Breakdown Included
                  </span>
                  <Link
                    href={`/compare/${comp.slug}`}
                    className="inline-flex items-center gap-1 font-bold text-[#064734] hover:text-[#15803D] transition-colors"
                  >
                    <span>Compare Solutions</span>
                    <ArrowRight className="h-3.5 w-3.5 text-[#15803D]" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SECTION 6: SOFTWARE BUYER GUIDES & PLAYBOOKS         */}
      {/* ---------------------------------------------------- */}
      <section className="py-8 sm:py-10 bg-[#F4ECE1] border-b-2 border-[#E5DAC8]">
        <div className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8 xl:px-12 space-y-5">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 pb-3 border-b-2 border-[#E5DAC8]">
            <div>
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#15803D] mb-1">
                <FileText className="h-4 w-4" />
                <span>Software Selection Playbooks</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-[#064734] tracking-tight">
                Gulf Software Buyer Guides &amp; Playbooks
              </h2>
              <p className="mt-1 text-sm sm:text-base text-[#163A2E] font-medium">
                Practical research on ZATCA Phase 2 e-invoicing, UAE Corporate Tax compliance, Wage Protection System (WPS) integrations, and total cost of ownership.
              </p>
            </div>

            <Link
              href="/articles"
              className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-[#064734] hover:text-[#15803D] transition-colors shrink-0"
            >
              <span>Explore All Guides</span>
              <ArrowRight className="h-4 w-4 text-[#15803D]" />
            </Link>
          </div>

          {/* 3 Comprehensive Software Buyer Guides */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {articles.map((art) => (
              <article
                key={art.id}
                className="group flex flex-col justify-between rounded-2xl border-2 border-[#E5DAC8] bg-white p-5 hover:border-[#064734] hover:shadow-xs transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-[#064734] bg-[#E0FFC2] px-2.5 py-1 rounded-md border border-[#BDE895]">
                      {art.category}
                    </span>
                    <span className="text-xs sm:text-sm text-[#3C6152] font-bold">
                      {art.readTime}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#064734] group-hover:text-[#15803D] transition-colors leading-snug line-clamp-2">
                    <Link href={`/articles/${art.slug}`}>
                      {art.title}
                    </Link>
                  </h3>

                  {/* 1-Line Excerpt */}
                  <p className="mt-2 text-xs sm:text-sm text-[#163A2E] font-medium truncate" title={art.excerpt}>
                    {art.excerpt}
                  </p>

                  {/* 1-Line Key Takeaway */}
                  {art.keyTakeaways && art.keyTakeaways.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t-2 border-[#E5DAC8]/80 text-xs sm:text-sm text-[#064734] font-semibold">
                      <div className="flex items-center gap-2 truncate">
                        <Check className="h-3.5 w-3.5 text-[#15803D] shrink-0" />
                        <span className="truncate">{art.keyTakeaways[0]}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t-2 border-[#E5DAC8] flex items-center justify-between text-xs sm:text-sm">
                  <div className="flex items-center gap-2 text-[#3C6152]">
                    <User className="h-4 w-4 text-[#15803D]" />
                    <span className="font-bold text-[#064734]">{art.author.name}</span>
                  </div>

                  <Link
                    href={`/articles/${art.slug}`}
                    className="inline-flex items-center gap-1 font-bold text-[#064734] group-hover:text-[#15803D] transition-colors"
                  >
                    <span>Read Guide</span>
                    <ArrowRight className="h-3.5 w-3.5 text-[#15803D]" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SECTION 7: THE 6 STANDARDS OF GULF SAAS VERIFICATION */}
      {/* ---------------------------------------------------- */}
      <section className="py-8 sm:py-10 bg-[#064734] text-[#FFF8EF] border-b-2 border-[#0A5C44]">
        <div className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8 xl:px-12 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 pb-3 border-b-2 border-[#0A5C44]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#E0FFC2]/50 bg-[#0A5C44] px-3.5 py-1 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#E0FFC2] mb-1.5">
                <ShieldCheck className="h-4 w-4" />
                <span>Evaluation Framework</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-white tracking-tight">
                The 6 Pillars of Gulf Software Verification
              </h2>
              <p className="mt-1 text-sm sm:text-base text-[#FFF8EF]/90 font-medium">
                Every platform listed on GulfSaasReview is benchmarked against critical regional legal and operational criteria before receiving editorial endorsement.
              </p>
            </div>

            <Link
              href="/about#methodology"
              className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-[#E0FFC2] hover:text-white transition-colors shrink-0"
            >
              <span>View Methodology</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Numbered Standard Cards (01 to 06) with vibrant green numbers */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {standards.map((item) => (
              <div
                key={item.rank}
                className="group relative rounded-2xl border-2 border-[#0A5C44] bg-[#043224] p-5 hover:border-[#E0FFC2] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-[#0A5C44]">
                    <span className="font-serif text-3xl font-extrabold text-[#15803D] group-hover:text-[#15803D] transition-colors">
                      {item.rank}
                    </span>
                    <span className="text-xs font-extrabold uppercase tracking-wider text-[#E0FFC2] bg-[#E0FFC2]/20 border border-[#E0FFC2]/30 px-2.5 py-1 rounded-md">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="mt-2.5 text-base sm:text-lg font-bold font-serif text-white group-hover:text-[#15803D] transition-colors leading-snug">
                    {item.title}
                  </h3>

                  {/* 1-Line Summary */}
                  <p className="mt-1.5 text-xs sm:text-sm text-[#C2D6CE] font-medium truncate" title={item.summary}>
                    {item.summary}
                  </p>
                </div>

                <div className="mt-3.5 pt-3 border-t border-[#0A5C44] flex items-center justify-between text-xs sm:text-sm text-[#A5C2B6]">
                  <span>Regional Standard</span>
                  <span className="font-bold text-[#E0FFC2]">{item.badge}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SECTION 8: EDITORIAL NEWSLETTER BRIEFING             */}
      {/* ---------------------------------------------------- */}
      <NewsletterSection />
    </div>
  );
}
