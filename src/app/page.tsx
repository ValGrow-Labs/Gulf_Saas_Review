import React from "react";
import Link from "next/link";
import Image from "next/image";
import { newsArticles, trendingTopics } from "@/data/news";
import { softwares } from "@/data/software";
import { comparisons } from "@/data/comparisons";
import { categories } from "@/data/categories";
import SoftwareCard from "@/components/SoftwareCard";
import HomeNewsSection from "@/components/HomeNewsSection";
import NewsletterSection from "@/components/NewsletterSection";
import HeroSearch from "@/components/HeroSearch";
import {
  ArrowRight,
  ArrowUpRight,
  Scale,
  Sparkles,
  Clock,
  User,
  TrendingUp,
  Cpu,
  ShieldCheck,
  Globe2,
  ChevronRight,
  Flame,
  FileText,
  Calendar,
  Layers,
  Calculator,
  Users,
  Briefcase,
  CheckSquare,
  Send,
  ShoppingBag,
  Headphones,
  CheckCircle2,
  Star,
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
  const heroArticle = newsArticles.find((a) => a.isHeroFeatured) || newsArticles[0];
  const sideArticles = newsArticles.filter((a) => a.id !== heroArticle.id).slice(0, 3);
  const spotlightArticles = newsArticles.filter((a) => a.id !== heroArticle.id).slice(3, 7);
  const latestArticles = newsArticles.filter((a) => a.id !== heroArticle.id).slice(2, 8);
  const aiArticles = newsArticles
    .filter((a) => a.category === "AI & Innovation" || a.category === "Cybersecurity" || a.category === "SaaS & Cloud")
    .slice(0, 3);

  const featuredSlugs = [
    "zoho-one",
    "odoo",
    "quickbooks-online",
    "hubspot-crm",
    "xero",
    "freshdesk",
  ];
  const featuredSoftware = featuredSlugs
    .map((slug) => softwares.find((s) => s.slug === slug))
    .filter((s): s is (typeof softwares)[0] => Boolean(s));

  return (
    <div className="flex flex-col min-h-screen bg-[#F7F4EC]">
      {/* ---------------------------------------------------- */}
      {/* SECTION 1: CRYSTAL-CLEAR VALUE PROPOSITION HERO       */}
      {/* ---------------------------------------------------- */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF7F0] via-[#F7F4EC] to-[#F2EDE1] pt-8 sm:pt-14 pb-14 sm:pb-20 border-b border-[#E5DFD3]">
        {/* Subtle Decorative Ambient Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-[#FF6B5B]/5 blur-3xl pointer-events-none" />
        <div className="absolute -top-24 right-0 w-80 h-80 rounded-full bg-[#0A2E36]/5 blur-2xl pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-6 sm:space-y-8">
          {/* Regional Territory Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E5DFD3] bg-white/90 backdrop-blur-xs px-4 py-1.5 text-xs sm:text-sm font-bold text-[#0A2E36] shadow-2xs">
            <span className="h-2 w-2 rounded-full bg-[#FF6B5B] animate-pulse" />
            <span>The Independent Software Guide for Saudi Arabia, UAE &amp; GCC</span>
          </div>

          {/* Simple, Bold, Unmistakable Headline */}
          <div className="max-w-4xl mx-auto space-y-3 sm:space-y-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold font-editorial text-[#0A2E36] tracking-tight leading-[1.15]">
              Find the Right Software for Your Business in the Gulf
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-[#384D52] leading-relaxed max-w-3xl mx-auto font-normal">
              Independent reviews, side-by-side comparisons, and regional compliance checks for Accounting, CRM, HR, Payroll, and ERP software across the Middle East.
            </p>
          </div>

          {/* Hero Interactive Search Bar */}
          <HeroSearch />

          {/* 4 Regional Compliance Trust Pillars */}
          <div className="pt-6 sm:pt-10 max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 text-left">
            <div className="rounded-2xl border border-[#E5DFD3] bg-white p-4.5 shadow-2xs hover:border-[#FF6B5B] transition-colors">
              <div className="flex items-center gap-2.5 mb-1.5">
                <span className="text-xl">🇸🇦</span>
                <span className="text-sm font-bold text-[#0A2E36]">ZATCA Phase 2</span>
              </div>
              <p className="text-xs sm:text-sm text-[#526A70] leading-snug">
                Verified e-invoicing cryptographic compliance for Saudi enterprises and SMBs.
              </p>
            </div>

            <div className="rounded-2xl border border-[#E5DFD3] bg-white p-4.5 shadow-2xs hover:border-[#FF6B5B] transition-colors">
              <div className="flex items-center gap-2.5 mb-1.5">
                <span className="text-xl">🇦🇪</span>
                <span className="text-sm font-bold text-[#0A2E36]">UAE FTA 5% VAT</span>
              </div>
              <p className="text-xs sm:text-sm text-[#526A70] leading-snug">
                Corporate tax alignment and Federal Tax Authority audit file compatibility.
              </p>
            </div>

            <div className="rounded-2xl border border-[#E5DFD3] bg-white p-4.5 shadow-2xs hover:border-[#FF6B5B] transition-colors">
              <div className="flex items-center gap-2.5 mb-1.5">
                <span className="text-xl">🌐</span>
                <span className="text-sm font-bold text-[#0A2E36]">Arabic UI &amp; RTL</span>
              </div>
              <p className="text-xs sm:text-sm text-[#526A70] leading-snug">
                Native right-to-left interfaces, Arabic invoicing, and bilingual client portals.
              </p>
            </div>

            <div className="rounded-2xl border border-[#E5DFD3] bg-white p-4.5 shadow-2xs hover:border-[#FF6B5B] transition-colors">
              <div className="flex items-center gap-2.5 mb-1.5">
                <span className="text-xl">📋</span>
                <span className="text-sm font-bold text-[#0A2E36]">WPS &amp; GCC Labor</span>
              </div>
              <p className="text-xs sm:text-sm text-[#526A70] leading-snug">
                Wage Protection System SIF generation and statutory End of Service calculations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SECTION 2: BROWSE SOFTWARE BY CATEGORY               */}
      {/* ---------------------------------------------------- */}
      <section className="py-14 sm:py-20 bg-[#FAF7F0] border-b border-[#E5DFD3]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#E5DFD3]">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#FF6B5B] mb-2">
                <Layers className="h-4 w-4" />
                <span>Browse by Business Need</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold font-editorial text-[#0A2E36] tracking-tight">
                Software Categories for Gulf Businesses
              </h2>
              <p className="mt-2 text-base sm:text-lg text-[#526A70] max-w-2xl leading-relaxed">
                Explore dedicated directories grouped by organizational function, verified for Middle Eastern legal and commercial standards.
              </p>
            </div>

            <Link
              href="/categories"
              className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-[#0A2E36] hover:text-[#FF6B5B] transition-colors shrink-0"
            >
              <span>View All Categories</span>
              <ArrowRight className="h-4.5 w-4.5 text-[#FF6B5B]" />
            </Link>
          </div>

          {/* 8 Clean Functional Category Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {categories.map((cat) => {
              const IconComponent = categoryIcons[cat.iconName] || Layers;
              return (
                <Link
                  key={cat.id}
                  href={`/reviews?category=${cat.slug}`}
                  className="group flex flex-col justify-between rounded-2xl border border-[#E5DFD3] bg-white p-5 sm:p-6 transition-all duration-300 hover:border-[#FF6B5B] hover:shadow-[0_12px_32px_rgba(10,46,54,0.07)] hover:-translate-y-1"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0A2E36] text-[#FF6B5B] group-hover:bg-[#FF6B5B] group-hover:text-white transition-colors duration-200 shadow-2xs">
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <span className="rounded-full bg-[#FAF7F0] border border-[#E5DFD3] px-3 py-1 text-xs font-bold text-[#526A70]">
                        {cat.count}+ tools
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-[#0A2E36] group-hover:text-[#FF6B5B] transition-colors leading-snug">
                      {cat.name}
                    </h3>

                    <p className="mt-2 text-sm text-[#526A70] leading-relaxed line-clamp-2">
                      {cat.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-3.5 border-t border-[#E5DFD3]/80 flex items-center justify-between text-xs font-bold text-[#0A2E36] group-hover:text-[#FF6B5B] transition-colors">
                    <span>Explore Tools</span>
                    <ArrowRight className="h-4 w-4 text-[#FF6B5B] transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SECTION 3: TOP-RATED BUSINESS SOFTWARE DIRECTORY     */}
      {/* ---------------------------------------------------- */}
      <section className="py-14 sm:py-20 bg-[#F7F4EC] border-b border-[#E5DFD3]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#E5DFD3]">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#FF6B5B] mb-2">
                <ShieldCheck className="h-4 w-4" />
                <span>Featured Independent Evaluations</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold font-editorial text-[#0A2E36] tracking-tight">
                Top-Rated Software for Gulf Enterprises &amp; SMBs
              </h2>
              <p className="mt-2 text-base sm:text-lg text-[#526A70] max-w-2xl leading-relaxed">
                Independently audited for Saudi Arabia ZATCA Phase 2, UAE FTA VAT filing, multi-currency support, and localized client portals.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/compare"
                className="inline-flex items-center gap-2 rounded-xl border border-[#E5DFD3] bg-white px-4.5 py-3 text-sm sm:text-base font-bold text-[#0A2E36] hover:border-[#FF6B5B] hover:text-[#FF6B5B] transition-colors shadow-2xs"
              >
                <Scale className="h-4.5 w-4.5 text-[#FF6B5B]" />
                <span>Compare Tools</span>
              </Link>
              <Link
                href="/reviews"
                className="inline-flex items-center gap-2 rounded-xl bg-[#0A2E36] px-4.5 py-3 text-sm sm:text-base font-bold text-white hover:bg-[#0D3B43] transition-colors shadow-xs"
              >
                <span>Full Directory ({softwares.length}+)</span>
                <ArrowRight className="h-4.5 w-4.5 text-[#FF6B5B]" />
              </Link>
            </div>
          </div>

          {/* Software Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredSoftware.map((software) => (
              <SoftwareCard key={software.id} software={software} />
            ))}
          </div>

          {/* Callout Strip to Browse All Reviews */}
          <div className="rounded-2xl border border-[#E5DFD3] bg-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xs">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FFF0EE] text-[#FF6B5B]">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-lg sm:text-xl font-bold text-[#0A2E36]">
                  Looking for specialized software or niche Gulf integrations?
                </h4>
                <p className="text-sm sm:text-base text-[#526A70]">
                  Filter 50+ business applications by country suitability (KSA, UAE, Qatar), Arabic RTL readiness, and pricing models.
                </p>
              </div>
            </div>

            <Link
              href="/reviews"
              className="inline-flex items-center gap-2 rounded-xl bg-[#FF6B5B] px-6 py-3.5 text-sm sm:text-base font-bold text-white hover:bg-[#E85747] transition-all shadow-md shrink-0"
            >
              <span>Explore All Software</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SECTION 4: HEAD-TO-HEAD COMPARISON MATRIX TEASERS    */}
      {/* ---------------------------------------------------- */}
      <section className="py-14 sm:py-20 bg-[#FAF7F0] border-b border-[#E5DFD3]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#E5DFD3]">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#FF6B5B] mb-2">
                <Scale className="h-4 w-4" />
                <span>Side-by-Side Analysis</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold font-editorial text-[#0A2E36] tracking-tight">
                Featured Head-to-Head Comparisons
              </h2>
              <p className="mt-2 text-base sm:text-lg text-[#526A70] max-w-2xl leading-relaxed">
                Direct benchmark evaluations comparing implementation costs, regional tax integration, and team adoption friction.
              </p>
            </div>

            <Link
              href="/compare"
              className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-[#0A2E36] hover:text-[#FF6B5B] transition-colors shrink-0"
            >
              <span>All Comparisons</span>
              <ArrowRight className="h-4.5 w-4.5 text-[#FF6B5B]" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {comparisons.slice(0, 2).map((comp) => (
              <div
                key={comp.id}
                className="rounded-2xl border border-[#E5DFD3] bg-white p-6 sm:p-7 hover:border-[#FF6B5B] transition-all duration-200 shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#FF6B5B] bg-[#FFF0EE] px-3 py-1 rounded-md">
                    {comp.categories?.[0] || "Head-to-Head"}
                  </span>
                  <h3 className="font-editorial text-2xl font-bold text-[#0A2E36] mt-3 leading-snug">
                    <Link href={`/compare/${comp.slug}`} className="hover:text-[#FF6B5B] transition-colors">
                      {comp.title}
                    </Link>
                  </h3>
                  <p className="mt-2.5 text-base text-[#384D52] leading-relaxed">
                    {comp.shortDescription}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E5DFD3] flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-[#526A70]">
                    GCC Verdict &amp; Pricing Breakdown
                  </span>
                  <Link
                    href={`/compare/${comp.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-bold text-[#0A2E36] hover:text-[#FF6B5B] transition-colors"
                  >
                    <span>Compare Solutions</span>
                    <ArrowRight className="h-4 w-4 text-[#FF6B5B]" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SECTION 5: LATEST GULF TECH & AI NEWS (PRESERVED)    */}
      {/* ---------------------------------------------------- */}
      <section className="py-14 sm:py-20 bg-[#F7F4EC] border-b border-[#E5DFD3]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#E5DFD3]">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#FF6B5B] mb-2">
                <FileText className="h-4 w-4" />
                <span>Editorial Intelligence &amp; Analysis</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold font-editorial text-[#0A2E36] tracking-tight">
                Latest Gulf Technology &amp; Enterprise News
              </h2>
              <p className="mt-2 text-base sm:text-lg text-[#526A70] max-w-2xl leading-relaxed">
                Independent reporting on Middle Eastern artificial intelligence, sovereign cloud infrastructure, and enterprise software acquisitions.
              </p>
            </div>

            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-[#0A2E36] hover:text-[#FF6B5B] transition-colors shrink-0"
            >
              <span>Explore All News</span>
              <ArrowRight className="h-4.5 w-4.5 text-[#FF6B5B]" />
            </Link>
          </div>

          {/* Lead Story + Trending Stories Column */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            {/* Left: Primary Lead Story with Photo (col-span-8) */}
            <div className="lg:col-span-8 flex flex-col justify-between">
              <article className="group">
                <div className="relative aspect-16/9 w-full overflow-hidden rounded-2xl border border-[#E5DFD3] bg-[#0A2E36]/5 shadow-xs mb-5">
                  <Image
                    src={heroArticle.featuredImage || heroArticle.image}
                    alt={heroArticle.title}
                    fill
                    priority
                    className="object-cover transition-transform duration-500 group-hover:scale-102"
                    sizes="(max-width: 1024px) 100vw, 800px"
                  />
                  <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2 z-10">
                    <span className="inline-flex items-center gap-1 rounded-md bg-[#0A2E36] px-3.5 py-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#FF6B5B] shadow-md">
                      <Sparkles className="h-3.5 w-3.5" />
                      {heroArticle.category}
                    </span>
                    <span className="rounded-md bg-white/95 backdrop-blur-xs px-3 py-1.5 text-xs sm:text-sm font-semibold text-[#0A2E36] shadow-xs">
                      {heroArticle.country}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold font-editorial text-[#0A2E36] tracking-tight leading-[1.2] group-hover:text-[#FF6B5B] transition-colors">
                    <Link href={`/news/${heroArticle.slug}`}>
                      {heroArticle.title}
                    </Link>
                  </h3>

                  <p className="text-base sm:text-lg text-[#384D52] leading-relaxed line-clamp-3 font-normal">
                    {heroArticle.subtitle || heroArticle.excerpt}
                  </p>

                  <div className="pt-4 border-t border-[#E5DFD3] flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm text-[#526A70]">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-[#0A2E36] text-[#FF6B5B] font-bold flex items-center justify-center text-xs">
                        {heroArticle.author.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <span className="font-bold text-[#0A2E36] block leading-tight text-sm">
                          {heroArticle.author.name}
                        </span>
                        <span className="text-xs text-[#526A70]">
                          {heroArticle.author.role}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4 text-[#FF6B5B]" />
                        {heroArticle.publishedDate}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4 text-[#FF6B5B]" />
                        {heroArticle.readTime}
                      </span>
                      <Link
                        href={`/news/${heroArticle.slug}`}
                        className="inline-flex items-center gap-1 font-bold text-[#0A2E36] hover:text-[#FF6B5B] transition-colors pl-2"
                      >
                        <span>Full Briefing</span>
                        <ArrowRight className="h-4 w-4 text-[#FF6B5B]" />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            </div>

            {/* Right: Curated Top Stories Column (col-span-4) */}
            <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#E5DFD3]">
                <h3 className="text-sm sm:text-base font-bold uppercase tracking-wider text-[#0A2E36] flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#FF6B5B]" />
                  <span>Trending Regional Dispatches</span>
                </h3>
                <Link
                  href="/news"
                  className="text-xs sm:text-sm font-bold text-[#FF6B5B] hover:text-[#0A2E36]"
                >
                  All News &rarr;
                </Link>
              </div>

              {/* 3 Side Editorial Stories with Thumbnails */}
              <div className="space-y-4 flex-1 flex flex-col justify-between">
                {sideArticles.map((article) => (
                  <article
                    key={article.id}
                    className="group flex gap-4 pb-4 border-b border-[#E5DFD3] last:border-b-0 last:pb-0"
                  >
                    <div className="relative h-20 w-24 sm:h-22 sm:w-28 shrink-0 overflow-hidden rounded-xl border border-[#E5DFD3] bg-white">
                      <Image
                        src={article.featuredImage || article.image}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="110px"
                      />
                    </div>

                    <div className="min-w-0 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 text-xs mb-1">
                          <span className="font-bold uppercase tracking-wider text-[#FF6B5B]">
                            {article.country}
                          </span>
                          <span className="text-[#526A70]">•</span>
                          <span className="text-[#526A70]">{article.readTime}</span>
                        </div>
                        <h4 className="font-editorial text-sm sm:text-base font-bold text-[#0A2E36] group-hover:text-[#FF6B5B] transition-colors leading-snug line-clamp-2">
                          <Link href={`/news/${article.slug}`}>
                            {article.title}
                          </Link>
                        </h4>
                      </div>

                      <span className="text-xs text-[#526A70] mt-1">
                        {article.publishedDate}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>

          {/* Sub-Hero 4-Column Regional Spotlight Strip */}
          <div className="pt-8 border-t border-[#E5DFD3]">
            <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#526A70] mb-4 flex items-center justify-between">
              <span>National Innovation Spotlights</span>
              <span className="text-[#0A2E36]">KSA • UAE • Qatar • Kuwait</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {spotlightArticles.map((item) => (
                <article
                  key={item.id}
                  className="group rounded-xl border border-[#E5DFD3] bg-white p-4.5 transition-all duration-200 hover:border-[#FF6B5B] hover:shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-16/10 w-full overflow-hidden rounded-lg mb-3 bg-[#0A2E36]/5">
                      <Image
                        src={item.featuredImage || item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 300px"
                      />
                      <span className="absolute bottom-2 left-2 rounded bg-[#0A2E36]/90 px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-[#FF6B5B] backdrop-blur-xs">
                        {item.country}
                      </span>
                    </div>

                    <h5 className="font-editorial text-sm sm:text-base font-bold text-[#0A2E36] group-hover:text-[#FF6B5B] transition-colors leading-snug line-clamp-2">
                      <Link href={`/news/${item.slug}`}>
                        {item.title}
                      </Link>
                    </h5>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-[#E5DFD3] flex items-center justify-between text-xs text-[#526A70]">
                    <span className="font-medium">{item.category}</span>
                    <span className="font-semibold text-[#0A2E36] group-hover:text-[#FF6B5B]">
                      Read &rarr;
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* 3-Column Story Grid with Clean Photos */}
          <div className="pt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {latestArticles.map((article) => (
              <article
                key={article.id}
                className="group flex flex-col justify-between rounded-2xl border border-[#E5DFD3] bg-white p-5 transition-all duration-300 hover:border-[#FF6B5B] hover:shadow-md"
              >
                <div>
                  <div className="relative aspect-16/10 w-full overflow-hidden rounded-xl border border-[#E5DFD3] bg-[#0A2E36]/5 mb-4">
                    <Image
                      src={article.featuredImage || article.image}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-103"
                      sizes="(max-width: 768px) 100vw, 400px"
                    />
                    <span className="absolute top-2.5 left-2.5 rounded bg-[#0A2E36]/90 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-[#FF6B5B]">
                      {article.country}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#D44435] bg-[#FFF0EE] px-2.5 py-0.5 rounded-md">
                      {article.category}
                    </span>
                    <span className="text-xs text-[#526A70]">
                      {article.publishedDate}
                    </span>
                  </div>

                  <h4 className="text-lg sm:text-xl font-bold font-editorial text-[#0A2E36] group-hover:text-[#FF6B5B] transition-colors leading-snug line-clamp-2">
                    <Link href={`/news/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h4>

                  <p className="mt-2 text-sm sm:text-base text-[#384D52] leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E5DFD3] flex items-center justify-between text-xs text-[#526A70]">
                  <div className="flex items-center gap-1.5 font-medium">
                    <User className="h-3.5 w-3.5 text-[#FF6B5B]" />
                    <span>{article.author.name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-[#FF6B5B]" />
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SECTION 6: WHAT'S TRENDING IN THE GULF (DEEP TEAL)   */}
      {/* ---------------------------------------------------- */}
      <section className="py-14 sm:py-20 bg-[#0A2E36] text-[#F7F4EC] border-b border-[#0F3F4A]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#0F3F4A]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#FF6B5B]/50 bg-[#0F3F4A] px-4 py-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#FF6B5B] mb-2.5">
                <TrendingUp className="h-4 w-4" />
                <span>Executive Pulse</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold font-editorial text-white tracking-tight">
                What&apos;s Trending in the Gulf
              </h2>
              <p className="mt-2 text-base sm:text-lg text-[#F7F4EC]/80 max-w-2xl leading-relaxed">
                High-interest technology topics dominating boardrooms and ministerial agendas across Riyadh, Dubai, Doha, and Kuwait City.
              </p>
            </div>

            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-[#FF6B5B] hover:text-white transition-colors shrink-0"
            >
              <span>Explore All Trends</span>
              <ArrowRight className="h-4.5 w-4.5" />
            </Link>
          </div>

          {/* Numbered Trend Cards (01 to 06) with Coral numbers */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {trendingTopics.map((item) => (
              <div
                key={item.rank}
                className="group relative rounded-2xl border border-[#0F3F4A] bg-[#062127] p-6 hover:border-[#FF6B5B] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-[#0F3F4A]">
                    <span className="font-editorial text-4xl font-extrabold text-[#FF6B5B]/85 group-hover:text-[#FF6B5B] transition-colors">
                      {item.rank}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#FF8A7C] bg-[#FF6B5B]/15 px-3 py-1 rounded-md">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="mt-4 text-xl font-bold font-editorial text-white group-hover:text-[#FF8A7C] transition-colors leading-snug">
                    <Link href="/news">
                      {item.headline}
                    </Link>
                  </h3>

                  <p className="mt-2.5 text-sm sm:text-base text-[#C2D4D7] leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-[#0F3F4A] flex items-center justify-between text-xs text-[#8BA4A9]">
                  <span>{item.category}</span>
                  <span className="font-mono text-[#FF6B5B]">{item.reads}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SECTION 7: GULF COUNTRIES MOVING BUILDINGS ANIMATION  */}
      {/* ---------------------------------------------------- */}
      <HomeNewsSection />

      {/* ---------------------------------------------------- */}
      {/* SECTION 8: EDITORIAL NEWSLETTER BRIEFING             */}
      {/* ---------------------------------------------------- */}
      <NewsletterSection />
    </div>
  );
}
