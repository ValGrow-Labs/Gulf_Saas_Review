import React from "react";
import Link from "next/link";
import { softwares } from "@/data/software";
import { categories } from "@/data/categories";
import { comparisons } from "@/data/comparisons";
import { articles } from "@/data/articles";
import SoftwareCard from "@/components/SoftwareCard";
import NewsletterSection from "@/components/NewsletterSection";
import {
  ArrowRight,
  ArrowUpRight,
  Scale,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Building2,
  Globe2,
  TrendingUp,
  Clock,
  Layers,
  Star,
  Check,
  Calculator,
  Users,
  Briefcase,
  CheckSquare,
  Send,
  ShoppingBag,
  Headphones,
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
    "hubspot-crm",
    "quickbooks-online",
    "xero",
    "odoo",
    "freshdesk",
  ];
  const featuredSoftware = featuredSlugs
    .map((slug) => softwares.find((s) => s.slug === slug))
    .filter((s): s is (typeof softwares)[0] => Boolean(s));

  return (
    <div className="flex flex-col min-h-screen">
      {/* ---------------------------------------------------- */}
      {/* HERO SECTION                                         */}
      {/* ---------------------------------------------------- */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF5ED] via-[#F4EDE0] to-[#EADECB] pt-12 sm:pt-16 pb-16 sm:pb-24 border-b border-[#E5DCD0]">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#FF6B5B]/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-[#14123D]/5 blur-2xl pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left Column: Headlines & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#FF6B5B]/60 bg-[#FAF5ED] px-4 py-1.5 text-[15px] font-bold text-[#14123D] shadow-xs">
                <span className="flex h-2.5 w-2.5 rounded-full bg-[#FF6B5B]" />
                <span className="text-[#D94534] font-bold">Independent Software Intelligence</span>
                <span className="text-[#697386] hidden sm:inline">•</span>
                <span className="text-[#334155] hidden sm:inline">Saudi Arabia • UAE • GCC</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-editorial text-[#14123D] tracking-tight leading-[1.14]">
                Find the right software for your business in the Gulf.
              </h1>

              <p className="text-[19px] sm:text-[20px] text-[#334155] leading-relaxed max-w-2xl font-normal">
                Independent software reviews, expert comparisons and practical insights to help Middle Eastern businesses make better technology decisions.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  href="/reviews"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#14123D] px-8 py-4 text-[18px] font-bold text-[#FAF5ED] hover:bg-[#1E1B59] active:scale-[0.98] transition-all shadow-md border border-[#14123D] min-h-[52px]"
                >
                  <span>Explore Software</span>
                  <ArrowRight className="h-5 w-5 text-[#FF6B5B]" />
                </Link>

                <Link
                  href="/compare"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#14123D] bg-[#FAF5ED] px-8 py-4 text-[18px] font-bold text-[#14123D] hover:bg-[#E5DCD0]/50 active:scale-[0.98] transition-all shadow-2xs min-h-[52px]"
                >
                  <Scale className="h-5 w-5 text-[#FF6B5B]" />
                  <span>Compare Solutions</span>
                </Link>
              </div>

              {/* Trust Statement */}
              <div className="pt-5 border-t border-[#E5DCD0] flex flex-wrap items-center gap-y-3 gap-x-6 text-[16px] text-[#334155]">
                <div className="flex items-center gap-2 font-bold text-[#14123D]">
                  <Building2 className="h-5 w-5 text-[#FF6B5B] shrink-0" />
                  <span>Built for businesses across Saudi Arabia, the UAE and the GCC.</span>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-[15px] font-semibold text-[#334155]">
                  <span className="flex items-center gap-1.5">
                    <Check className="h-4 w-4 text-emerald-600 font-bold" /> ZATCA Phase 2
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Check className="h-4 w-4 text-emerald-600 font-bold" /> UAE 5% VAT
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Check className="h-4 w-4 text-emerald-600 font-bold" /> Arabic RTL Ready
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Floating Review Card */}
            <div className="lg:col-span-5 relative w-full">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="rounded-2xl border border-[#FF6B5B]/50 bg-[#FAF5ED] p-6 sm:p-7 shadow-[0_20px_50px_rgba(20,18,61,0.12)] relative z-10">
                  <div className="flex items-center justify-between pb-4 border-b border-[#E5DCD0]">
                    <div className="flex items-center gap-3.5">
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#714B67] text-white font-serif font-bold text-xl shadow-xs">
                        OD
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-[#14123D] text-xl">Odoo ERP</h4>
                          <span className="rounded bg-[#FF6B5B]/20 text-[#D94534] text-[13px] font-bold px-2 py-0.5">
                            Top Rated GCC
                          </span>
                        </div>
                        <p className="text-[15px] text-[#697386] font-medium">ERP &amp; Business Management</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-lg font-bold text-[#14123D]">
                        <Star className="h-4 w-4 fill-[#FF6B5B] text-[#FF6B5B]" />
                        <span>4.8</span>
                      </div>
                      <span className="text-[13px] text-[#697386]">Score: 9.5/10</span>
                    </div>
                  </div>

                  <div className="mt-4 space-y-3 text-[16px]">
                    <div className="flex items-center justify-between rounded-xl bg-[#F4EDE0] p-3.5">
                      <span className="text-[#475569]">Saudi Compliance</span>
                      <span className="font-bold text-emerald-700 flex items-center gap-1.5">
                        <CheckCircle2 className="h-4 w-4" />
                        ZATCA Phase 2 Official
                      </span>
                    </div>
                    <div className="flex items-center justify-between rounded-xl bg-[#F4EDE0] p-3.5">
                      <span className="text-[#475569]">Arabic UI &amp; RTL</span>
                      <span className="font-bold text-[#14123D] flex items-center gap-1.5">
                        <Globe2 className="h-4 w-4 text-[#FF6B5B]" />
                        100% Native RTL
                      </span>
                    </div>
                    <div className="flex items-center justify-between rounded-xl bg-[#F4EDE0] p-3.5">
                      <span className="text-[#475569]">Pricing Model</span>
                      <span className="font-bold text-[#14123D]">
                        $24.90 / user (~93 SAR)
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-[#E5DCD0] flex items-center justify-between text-[15px]">
                    <span className="text-[#64748B]">
                      Tested for UAE &amp; KSA mid-market
                    </span>
                    <Link
                      href="/reviews/odoo"
                      className="font-bold text-[#14123D] hover:text-[#FF6B5B] flex items-center gap-1.5"
                    >
                      <span>Read Full Review</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* FEATURED SOFTWARE SECTION                            */}
      {/* ---------------------------------------------------- */}
      <section className="py-16 sm:py-24 bg-[#FAF5ED] border-b border-[#E5DCD0]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <div className="inline-flex items-center gap-1.5 text-[15px] font-bold uppercase tracking-wider text-[#FF6B5B] mb-2">
                <Sparkles className="h-4 w-4" />
                <span>Curated Directory</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-editorial text-[#14123D] tracking-tight">
                Discover Software That Works for Your Business
              </h2>
              <p className="mt-3 text-[18px] sm:text-[19px] text-[#334155] max-w-2xl leading-relaxed">
                Look carefully at the range of digital tools that have been carefully reviewed and selected to meet the needs of Gulf businesses, having been assessed for their Arabic capability and suitability in the Gulf context.
              </p>
            </div>

            <Link
              href="/reviews"
              className="inline-flex items-center gap-2 text-[17px] font-bold text-[#14123D] hover:text-[#FF6B5B] transition-colors shrink-0"
            >
              <span>View All Software Reviews</span>
              <ArrowUpRight className="h-5 w-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredSoftware.map((software) => (
              <SoftwareCard key={software.id} software={software} />
            ))}
          </div>

          <div className="mt-12 rounded-xl bg-[#F4EDE0] border border-[#E5DCD0] p-5 text-center text-[16px] text-[#475569]">
            <span>
              Illustrative listings for the purposes of regional evaluation only. GulfSaasReview carries out an objective analysis of software specs with no commercial bias.
            </span>
            <Link href="/about#methodology" className="ml-1 font-bold text-[#14123D] hover:underline">
              Read our evaluation criteria &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* BROWSE BY CATEGORY SECTION                           */}
      {/* ---------------------------------------------------- */}
      <section className="py-16 sm:py-24 bg-[#F4EDE0] border-b border-[#E5DCD0]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[15px] font-bold uppercase tracking-wider text-[#FF6B5B] block mb-2">
              Browse by Industry Need
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-editorial text-[#14123D] tracking-tight">
              Explore Software by Category
            </h2>
            <p className="mt-3 text-[18px] sm:text-[19px] text-[#334155]">
              Targeted software suites by functional and compliance requirements in the Gulf market.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => {
              const IconComponent = categoryIcons[category.iconName] || Layers;
              return (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug}`}
                  className="group relative flex flex-col justify-between rounded-2xl border border-[#E5DCD0] bg-[#FAF5ED] p-6 transition-all duration-300 hover:border-[#FF6B5B] hover:shadow-[0_12px_30px_rgba(20,18,61,0.08)] hover:-translate-y-1"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex h-13 w-13 items-center justify-center rounded-xl bg-[#14123D] text-[#FF6B5B] group-hover:bg-[#FF6B5B] group-hover:text-[#14123D] transition-colors">
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <span className="text-[14px] font-bold text-[#475569] bg-[#F4EDE0] px-3 py-1 rounded-md">
                        {category.count}+ tools
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-[#14123D] group-hover:text-[#FF6B5B] transition-colors">
                      {category.name}
                    </h3>

                    <p className="mt-2.5 text-[17px] text-[#475569] leading-relaxed line-clamp-2">
                      {category.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#E5DCD0]/80 flex items-center justify-between text-[16px] font-bold text-[#14123D]">
                    <span>Explore Tools</span>
                    <ArrowRight className="h-4 w-4 text-[#FF6B5B] group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/categories"
              className="inline-flex items-center gap-2 rounded-xl border border-[#14123D] bg-[#FAF5ED] px-7 py-3.5 text-[17px] font-bold text-[#14123D] hover:bg-[#E5DCD0]/50 transition-colors shadow-2xs"
            >
              <span>View Category Index &amp; Gulf Criteria</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* TOP SOFTWARE COMPARISONS (LARGE 18-20px READABLE TEXT) */}
      {/* ---------------------------------------------------- */}
      <section className="py-16 sm:py-24 bg-[#FAF5ED] border-b border-[#E5DCD0]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-[15px] font-bold uppercase tracking-wider text-[#FF6B5B] block mb-2">
                Head-to-Head Analysis
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-editorial text-[#14123D] tracking-tight">
                Make Better Decisions with Side-by-Side Comparisons
              </h2>
              <p className="mt-3 text-[18px] sm:text-[19px] text-[#334155] max-w-2xl">
                Just compare the features, the regional compliance, the Arabic localisation and the real total cost of ownership before you sign off on any software contracts.
              </p>
            </div>

            <Link
              href="/compare"
              className="inline-flex items-center gap-2 text-[17px] font-bold text-[#14123D] hover:text-[#FF6B5B] transition-colors shrink-0"
            >
              <span>Build Custom Comparison</span>
              <Scale className="h-5 w-5 text-[#FF6B5B]" />
            </Link>
          </div>

          {/* Comparison Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {comparisons.map((c) => {
              const productA = softwares.find((s) => s.slug === c.productAId);
              const productB = softwares.find((s) => s.slug === c.productBId);

              return (
                <div
                  key={c.id}
                  className="group rounded-2xl border border-[#E5DCD0] bg-[#FAF5ED] p-6 sm:p-8 shadow-xs hover:border-[#FF6B5B] hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Header: Logos & VS Badge */}
                    <div className="flex items-center justify-between pb-4 border-b border-[#E5DCD0]">
                      <div className="flex items-center gap-3">
                        <div
                          className="h-12 w-12 rounded-xl flex items-center justify-center font-bold text-white text-base"
                          style={{ backgroundColor: productA?.accentColor || "#14123D" }}
                        >
                          {productA?.name.substring(0, 2).toUpperCase() || "A"}
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wider text-[#FF6B5B] bg-[#F4EDE0] px-2.5 py-1 rounded-md">
                          VS
                        </span>
                        <div
                          className="h-12 w-12 rounded-xl flex items-center justify-center font-bold text-white text-base"
                          style={{ backgroundColor: productB?.accentColor || "#1E1B59" }}
                        >
                          {productB?.name.substring(0, 2).toUpperCase() || "B"}
                        </div>
                      </div>

                      <span className="text-[15px] font-semibold text-[#64748B]">
                        {c.categories[0]}
                      </span>
                    </div>

                    {/* Comparison Title */}
                    <h3 className="mt-4 text-xl sm:text-2xl font-bold text-[#14123D] group-hover:text-[#FF6B5B] transition-colors">
                      {c.title}
                    </h3>

                    {/* Description - 18px-19px */}
                    <p className="mt-3 text-[18px] text-[#334155] leading-relaxed">
                      {c.shortDescription}
                    </p>

                    {/* Gulf Context Snippet - 18px font */}
                    <div className="mt-5 rounded-xl bg-[#F4EDE0] p-4 text-[#14123D] border border-[#E5DCD0]">
                      <span className="font-bold text-[#D94534] text-[16px] block mb-1">
                        Gulf Market Take:
                      </span>
                      <p className="text-[17px] text-[#334155] leading-relaxed line-clamp-2">
                        {c.gulfContext}
                      </p>
                    </div>
                  </div>

                  {/* Compare Now CTA Button */}
                  <div className="mt-6 pt-4 border-t border-[#E5DCD0] flex items-center justify-between">
                    <span className="text-[15px] font-semibold text-[#64748B]">
                      Full breakdown available
                    </span>
                    <Link
                      href={`/compare/${c.slug}`}
                      className="inline-flex items-center gap-2 rounded-xl bg-[#14123D] px-5 py-2.5 text-[16px] font-bold text-[#FAF5ED] hover:bg-[#1E1B59] transition-colors"
                    >
                      <span>Compare Now</span>
                      <ArrowRight className="h-4 w-4 text-[#FF6B5B]" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* WHY GULFSAASREVIEW? (4 FEATURE BLOCKS)               */}
      {/* ---------------------------------------------------- */}
      <section className="py-16 sm:py-24 bg-[#14123D] text-[#FAF5ED]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[15px] font-bold uppercase tracking-wider text-[#FF6B5B] block mb-2">
              Our Value Proposition
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-editorial text-white tracking-tight">
              Software Reviews with a Gulf Perspective
            </h2>
            <p className="mt-3 text-[19px] sm:text-[20px] text-[#E5DCD0]/90">
              Generic global directories ignore the particular regulatory, payment and cultural aspects of doing business in Saudi Arabia and the UAE. We address that.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="rounded-2xl border border-[#2C2775] bg-[#1A174E] p-6 sm:p-7 hover:border-[#FF6B5B]/50 transition-colors">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FF6B5B]/20 text-[#FF6B5B] mb-5">
                <Globe2 className="h-6 w-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                1. Regional Expertise
              </h3>
              <p className="text-[17px] text-[#CBD5E1] leading-relaxed">
                Software insights focused purely on the Saudi Arabian, UAE and wider GCC business requirements, labour requirements and tax environments.
              </p>
            </div>

            <div className="rounded-2xl border border-[#2C2775] bg-[#1A174E] p-6 sm:p-7 hover:border-[#FF6B5B]/50 transition-colors">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FF6B5B]/20 text-[#FF6B5B] mb-5">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                2. Practical Evaluations
              </h3>
              <p className="text-[17px] text-[#CBD5E1] leading-relaxed">
                Assess the software on its actual features, ease of use, transparency of pricing and practical business value rather than on the marketing hype.
              </p>
            </div>

            <div className="rounded-2xl border border-[#2C2775] bg-[#1A174E] p-6 sm:p-7 hover:border-[#FF6B5B]/50 transition-colors">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FF6B5B]/20 text-[#FF6B5B] mb-5">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                3. Local Business Relevance
              </h3>
              <p className="text-[17px] text-[#CBD5E1] leading-relaxed">
                Highlight regional availability, Arabic support, local payment options (Mada, Tabby) and the relevant compliance (ZATCA, WPS).
              </p>
            </div>

            <div className="rounded-2xl border border-[#2C2775] bg-[#1A174E] p-6 sm:p-7 hover:border-[#FF6B5B]/50 transition-colors">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FF6B5B]/20 text-[#FF6B5B] mb-5">
                <Scale className="h-6 w-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                4. Smarter Decisions
              </h3>
              <p className="text-[17px] text-[#CBD5E1] leading-relaxed">
                Help businesses to reduce their research time from weeks to hours and to select the right digital solutions that will work in the Middle East.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* LATEST INSIGHTS & ARTICLES                           */}
      {/* ---------------------------------------------------- */}
      <section className="py-16 sm:py-24 bg-[#FAF5ED] border-b border-[#E5DCD0]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-[15px] font-bold uppercase tracking-wider text-[#FF6B5B] block mb-2">
                Regional Briefings
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-editorial text-[#14123D] tracking-tight">
                Insights for Smarter Business Technology
              </h2>
              <p className="mt-3 text-[18px] sm:text-[19px] text-[#334155] max-w-2xl leading-relaxed">
                In-depth editorial pieces looking at the regulatory landscape, software selection playbooks and the state of tech leadership in the Middle East.
              </p>
            </div>

            <Link
              href="/articles"
              className="inline-flex items-center gap-2 text-[17px] font-bold text-[#14123D] hover:text-[#FF6B5B] transition-colors shrink-0"
            >
              <span>View All Articles</span>
              <ArrowUpRight className="h-5 w-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.slice(0, 3).map((art) => (
              <article
                key={art.id}
                className="group flex flex-col justify-between rounded-2xl border border-[#E5DCD0] bg-[#FAF5ED] overflow-hidden shadow-xs hover:border-[#FF6B5B] hover:shadow-md transition-all"
              >
                <div>
                  <div className="relative h-48 w-full bg-[#14123D] overflow-hidden flex items-center justify-center p-6 text-center">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#14123D] to-[#1E1B59] opacity-90" />
                    <div className="relative z-10">
                      <span className="inline-block rounded-full bg-[#FF6B5B]/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#FFA094] border border-[#FF6B5B]/30 mb-2">
                        {art.category}
                      </span>
                      <p className="font-editorial italic text-white text-xl font-normal line-clamp-2 px-2">
                        &ldquo;{art.title}&rdquo;
                      </p>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3 text-sm text-[#64748B] mb-3">
                      <span>{art.publishedDate}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {art.readTime}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-[#14123D] group-hover:text-[#FF6B5B] transition-colors leading-snug">
                      <Link href={`/articles/${art.slug}`}>{art.title}</Link>
                    </h3>

                    <p className="mt-3 text-[17px] sm:text-[18px] text-[#334155] leading-relaxed line-clamp-3">
                      {art.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-4 flex items-center justify-between border-t border-[#E5DCD0]/80 mt-auto">
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-full bg-[#14123D] text-[#FF6B5B] flex items-center justify-center font-bold text-xs">
                      {art.author.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <span className="text-[15px] font-semibold text-[#14123D]">
                      {art.author.name}
                    </span>
                  </div>

                  <Link
                    href={`/articles/${art.slug}`}
                    className="inline-flex items-center gap-1.5 text-[15px] font-bold text-[#14123D] group-hover:text-[#FF6B5B]"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* NEWSLETTER SECTION                                   */}
      {/* ---------------------------------------------------- */}
      <NewsletterSection />
    </div>
  );
}
