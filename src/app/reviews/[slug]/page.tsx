import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { softwares } from "@/data/software";
import SoftwareCard from "@/components/SoftwareCard";
import {
  Star,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Globe2,
  Building2,
  ArrowRight,
  ExternalLink,
  Scale,
  Calendar,
  Layers,
  Sparkles,
  Server,
  Zap,
} from "lucide-react";

export const dynamicParams = false;

export async function generateStaticParams() {
  return softwares.map((s) => ({
    slug: s.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const software = softwares.find((s) => s.slug === slug);
  if (!software) return { title: "Software Review Not Found" };

  return {
    title: `${software.name} Review: Gulf Business Suitability, ZATCA & Pricing`,
    description: software.tagline,
  };
}

export default async function IndividualReviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const software = softwares.find((s) => s.slug === slug);

  if (!software) {
    notFound();
  }

  // Find similar softwares
  const similarProducts = softwares.filter(
    (s) =>
      software.similarSoftwareSlugs.includes(s.slug) ||
      (s.category === software.category && s.slug !== software.slug)
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#F6F1E7] pb-24">
      {/* ---------------------------------------------------- */}
      {/* BREADCRUMBS & TOP HERO BANNER                        */}
      {/* ---------------------------------------------------- */}
      <div className="bg-[#FCFAF5] border-b border-[#E7E4DC] pt-8 pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center space-x-2 text-xs text-[#697386] mb-6">
            <Link href="/" className="hover:text-[#101F35]">
              Home
            </Link>
            <span>/</span>
            <Link href="/reviews" className="hover:text-[#101F35]">
              Reviews
            </Link>
            <span>/</span>
            <Link
              href={`/reviews?category=${software.category}`}
              className="hover:text-[#101F35]"
            >
              {software.categoryName}
            </Link>
            <span>/</span>
            <span className="font-semibold text-[#101F35]">{software.name}</span>
          </nav>

          {/* Product Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-start gap-4 sm:gap-5">
              {/* Product Logo */}
              <div
                className="flex h-16 w-16 sm:h-20 sm:w-20 shrink-0 items-center justify-center rounded-2xl text-2xl font-serif font-bold text-white shadow-md"
                style={{ backgroundColor: software.accentColor || "#101F35" }}
              >
                {software.name.substring(0, 2).toUpperCase()}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-editorial text-[#101F35]">
                    {software.name}
                  </h1>
                  <span className="inline-flex items-center gap-1 rounded-md bg-[#F6F1E7] px-2.5 py-1 text-xs font-medium text-[#697386] border border-[#E7E4DC]">
                    <ShieldCheck className="h-3.5 w-3.5 text-[#C6A66B]" />
                    Sample Review Profile
                  </span>
                </div>

                <p className="text-sm sm:text-base text-[#697386] max-w-3xl leading-relaxed">
                  {software.tagline}
                </p>

                {/* Country Suitability Tags */}
                <div className="mt-3.5 flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#697386] mr-1">
                    Suited For:
                  </span>
                  {software.countrySuitability.map((c) => (
                    <span
                      key={c}
                      className="inline-flex items-center gap-1 rounded-md bg-[#101F35]/5 px-2.5 py-1 text-xs font-semibold text-[#101F35]"
                    >
                      <Building2 className="h-3 w-3 text-[#C6A66B]" />
                      {c}
                    </span>
                  ))}

                  <span className="inline-flex items-center gap-1 rounded-md bg-[#C6A66B]/20 px-2.5 py-1 text-xs font-semibold text-[#8C6D33]">
                    <Globe2 className="h-3 w-3" />
                    {software.arabicSupport}
                  </span>
                </div>
              </div>
            </div>

            {/* Rating & CTA Block */}
            <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-3 shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-[#E7E4DC]">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-2xl font-bold text-[#101F35]">
                  <Star className="h-6 w-6 fill-[#C6A66B] text-[#C6A66B]" />
                  <span>{software.rating.toFixed(1)}</span>
                </div>
                <div className="text-left text-xs text-[#697386]">
                  <div>Overall Score: {software.verdict.score}/10</div>
                  <div className="text-[10px]">Based on Gulf criteria</div>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Link
                  href={`/compare?a=${software.slug}`}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#101F35] bg-white px-4 py-2.5 text-xs font-bold text-[#101F35] hover:bg-[#F6F1E7] transition-all"
                >
                  <Scale className="h-3.5 w-3.5 text-[#C6A66B]" />
                  <span>Compare</span>
                </Link>

                <a
                  href={software.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#101F35] px-4 py-2.5 text-xs font-bold text-[#FCFAF5] hover:bg-[#172B46] transition-all shadow-xs"
                >
                  <span>Visit Vendor</span>
                  <ExternalLink className="h-3.5 w-3.5 text-[#C6A66B]" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* MAIN REVIEW BODY & SIDEBAR                           */}
      {/* ---------------------------------------------------- */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Review Content (Col Span 8) */}
          <div className="lg:col-span-8 space-y-10">
            {/* 1. Software Overview & Executive Summary */}
            <section className="rounded-2xl border border-[#E7E4DC] bg-[#FCFAF5] p-6 sm:p-8 shadow-xs">
              <h2 className="text-xl sm:text-2xl font-bold font-editorial text-[#101F35] mb-4">
                Executive Overview
              </h2>
              <p className="text-sm sm:text-base text-[#101F35] leading-relaxed mb-4">
                {software.description}
              </p>
              <p className="text-sm text-[#697386] leading-relaxed">
                {software.gulfSuitabilityAnalysis.summary}
              </p>

              {/* Quick Metrics Bar */}
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-[#E7E4DC]">
                <div className="rounded-xl bg-[#F6F1E7] p-3 text-center">
                  <span className="text-[10px] uppercase font-bold text-[#697386] block">
                    Ease of Use
                  </span>
                  <span className="text-lg font-bold text-[#101F35]">
                    {software.easeOfUse} / 10
                  </span>
                </div>
                <div className="rounded-xl bg-[#F6F1E7] p-3 text-center">
                  <span className="text-[10px] uppercase font-bold text-[#697386] block">
                    Deployment
                  </span>
                  <span className="text-sm font-bold text-[#101F35]">
                    {software.deploymentTime}
                  </span>
                </div>
                <div className="rounded-xl bg-[#F6F1E7] p-3 text-center">
                  <span className="text-[10px] uppercase font-bold text-[#697386] block">
                    Starting At
                  </span>
                  <span className="text-sm font-bold text-[#101F35]">
                    {software.pricing.startingPrice}
                  </span>
                </div>
                <div className="rounded-xl bg-[#F6F1E7] p-3 text-center">
                  <span className="text-[10px] uppercase font-bold text-[#697386] block">
                    Arabic Support
                  </span>
                  <span className="text-xs font-bold text-[#8C6D33] line-clamp-1">
                    {software.arabicSupport.split(" ")[0]}
                  </span>
                </div>
              </div>
            </section>

            {/* 2. Product Visual Showcase / UI Mockup Gallery */}
            <section className="rounded-2xl border border-[#E7E4DC] bg-[#FCFAF5] p-6 sm:p-8 shadow-xs">
              <h2 className="text-xl sm:text-2xl font-bold font-editorial text-[#101F35] mb-2">
                Interface & Workflow Showcase
              </h2>
              <p className="text-xs text-[#697386] mb-6">
                Visual inspection of administrative views, localization toggles, and reporting dashboards.
              </p>

              {/* Showcase Frame */}
              <div className="rounded-xl border border-[#E7E4DC] bg-[#101F35] p-4 sm:p-6 text-[#FCFAF5] shadow-inner">
                <div className="flex items-center justify-between pb-3 border-b border-[#223859] mb-4">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    <span className="text-xs text-[#E7E4DC]/60 ml-2 font-mono">
                      https://app.{software.slug}.com/gulf-portal
                    </span>
                  </div>
                  <span className="text-[11px] text-[#C6A66B] font-mono">
                    GCC Enterprise Edition
                  </span>
                </div>

                <div className="bg-[#14243C] rounded-lg p-5 border border-[#223859] space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="text-xs text-[#C6A66B] font-semibold">
                        Regional Financial & Compliance Monitor
                      </span>
                      <h4 className="text-lg font-bold text-white">
                        {software.name} Central Dashboard
                      </h4>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="px-2 py-1 rounded bg-[#223859] text-[#E7E4DC]">
                        Currency: SAR / AED
                      </span>
                      <span className="px-2 py-1 rounded bg-emerald-900/60 text-emerald-300 border border-emerald-700/50">
                        ZATCA Sync Active
                      </span>
                    </div>
                  </div>

                  {/* Mock Data Visual Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    <div className="rounded-lg bg-[#101F35] p-3 border border-[#223859]">
                      <span className="text-[10px] text-[#697386] block">
                        Monthly Taxable Supplies
                      </span>
                      <span className="text-base font-bold text-white">
                        1,420,850 SAR
                      </span>
                      <span className="text-[10px] text-emerald-400 block mt-1">
                        +14.2% vs last month
                      </span>
                    </div>
                    <div className="rounded-lg bg-[#101F35] p-3 border border-[#223859]">
                      <span className="text-[10px] text-[#697386] block">
                        ZATCA Phase 2 E-Invoices
                      </span>
                      <span className="text-base font-bold text-white">
                        892 Validated
                      </span>
                      <span className="text-[10px] text-emerald-400 block mt-1">
                        100% Cryptographic Match
                      </span>
                    </div>
                    <div className="rounded-lg bg-[#101F35] p-3 border border-[#223859]">
                      <span className="text-[10px] text-[#697386] block">
                        Wage Protection (WPS)
                      </span>
                      <span className="text-base font-bold text-white">
                        Approved
                      </span>
                      <span className="text-[10px] text-emerald-400 block mt-1">
                        MOHRE / Mudad Synced
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 3. Key Features Breakdown */}
            <section className="rounded-2xl border border-[#E7E4DC] bg-[#FCFAF5] p-6 sm:p-8 shadow-xs">
              <h2 className="text-xl sm:text-2xl font-bold font-editorial text-[#101F35] mb-2">
                Key Features & Regional Benchmarks
              </h2>
              <p className="text-xs text-[#697386] mb-6">
                Evaluated against Gulf corporate software operational standards.
              </p>

              <div className="space-y-4">
                {software.keyFeatures.map((kf, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-[#E7E4DC] bg-white p-4 transition-all hover:border-[#C6A66B]"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-bold text-[#101F35]">
                        {kf.title}
                      </h4>
                      <div className="flex items-center gap-1 text-xs font-bold text-[#8C6D33] bg-[#F6F1E7] px-2 py-0.5 rounded">
                        <Sparkles className="h-3 w-3 text-[#C6A66B]" />
                        <span>{kf.score} / 10</span>
                      </div>
                    </div>
                    <p className="text-xs text-[#697386] leading-relaxed">
                      {kf.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* 4. Pros & Cons (Gulf Market Focused) */}
            <section className="rounded-2xl border border-[#E7E4DC] bg-[#FCFAF5] p-6 sm:p-8 shadow-xs">
              <h2 className="text-xl sm:text-2xl font-bold font-editorial text-[#101F35] mb-6">
                Pros & Cons: The Gulf Perspective
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Pros */}
                <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-5">
                  <div className="flex items-center gap-2 mb-3 text-emerald-800 font-bold text-sm">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span>Key Advantages</span>
                  </div>
                  <ul className="space-y-2.5">
                    {software.pros.map((pro, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-xs text-[#101F35] leading-relaxed"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Cons */}
                <div className="rounded-xl border border-rose-200 bg-rose-50/40 p-5">
                  <div className="flex items-center gap-2 mb-3 text-rose-800 font-bold text-sm">
                    <XCircle className="h-4 w-4 text-rose-600" />
                    <span>Points to Consider</span>
                  </div>
                  <ul className="space-y-2.5">
                    {software.cons.map((con, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-xs text-[#101F35] leading-relaxed"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-rose-600 mt-1.5 shrink-0" />
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* 5. Regional Suitability Deep-Dive */}
            <section className="rounded-2xl border border-[#C6A66B]/50 bg-gradient-to-br from-[#FCFAF5] to-[#F6F1E7] p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C6A66B] mb-2">
                <Globe2 className="h-4 w-4" />
                <span>Regional Middle East Audit</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-editorial text-[#101F35] mb-6">
                Middle Eastern Market Compliance & Readiness
              </h2>

              <div className="space-y-4">
                {software.gulfSuitabilityAnalysis.zatcaStatus && (
                  <div className="rounded-xl bg-white border border-[#E7E4DC] p-4">
                    <span className="text-xs font-bold text-[#101F35] block mb-1">
                      Saudi Arabia ZATCA E-Invoicing Status:
                    </span>
                    <p className="text-xs text-[#697386]">
                      {software.gulfSuitabilityAnalysis.zatcaStatus}
                    </p>
                  </div>
                )}

                {software.gulfSuitabilityAnalysis.uaeVatStatus && (
                  <div className="rounded-xl bg-white border border-[#E7E4DC] p-4">
                    <span className="text-xs font-bold text-[#101F35] block mb-1">
                      UAE FTA VAT Compliance Status:
                    </span>
                    <p className="text-xs text-[#697386]">
                      {software.gulfSuitabilityAnalysis.uaeVatStatus}
                    </p>
                  </div>
                )}

                <div className="rounded-xl bg-white border border-[#E7E4DC] p-4">
                  <span className="text-xs font-bold text-[#101F35] block mb-1">
                    Arabic Language & RTL Usability:
                  </span>
                  <p className="text-xs text-[#697386]">
                    {software.gulfSuitabilityAnalysis.arabicExperience}
                  </p>
                </div>

                <div className="rounded-xl bg-white border border-[#E7E4DC] p-4">
                  <span className="text-xs font-bold text-[#101F35] block mb-1">
                    GCC Data Residency & Cloud Hosting:
                  </span>
                  <p className="text-xs text-[#697386]">
                    {software.gulfSuitabilityAnalysis.dataResidency}
                  </p>
                </div>
              </div>
            </section>

            {/* 6. Pricing Information & Tiers */}
            <section className="rounded-2xl border border-[#E7E4DC] bg-[#FCFAF5] p-6 sm:p-8 shadow-xs">
              <h2 className="text-xl sm:text-2xl font-bold font-editorial text-[#101F35] mb-2">
                Pricing & Regional Estimates
              </h2>
              <p className="text-xs text-[#697386] mb-6">
                {software.pricing.regionalNote}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {software.pricing.tiers.map((tier, idx) => (
                  <div
                    key={idx}
                    className={`rounded-xl border p-5 flex flex-col justify-between ${
                      tier.highlight
                        ? "border-[#C6A66B] bg-[#F6F1E7]/70 shadow-sm"
                        : "border-[#E7E4DC] bg-white"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-[#101F35] text-base">
                          {tier.name}
                        </h4>
                        {tier.highlight && (
                          <span className="rounded bg-[#C6A66B] text-[#101F35] text-[10px] font-bold px-2 py-0.5">
                            Recommended
                          </span>
                        )}
                      </div>

                      <div className="flex items-baseline gap-1 my-3">
                        <span className="text-2xl font-bold text-[#101F35]">
                          {tier.price}
                        </span>
                        <span className="text-xs text-[#697386]">
                          /{tier.period}
                        </span>
                      </div>

                      {tier.regionalEstimateSAR && (
                        <div className="text-[11px] font-semibold text-[#8C6D33] mb-3">
                          Est: {tier.regionalEstimateSAR} • {tier.regionalEstimateAED}
                        </div>
                      )}

                      <p className="text-xs text-[#697386] mb-4">
                        {tier.description}
                      </p>

                      <ul className="space-y-2 border-t border-[#E7E4DC] pt-3 text-xs text-[#101F35]">
                        {tier.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-center gap-1.5">
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 7. Final Verdict */}
            <section className="rounded-2xl border border-[#101F35] bg-[#101F35] text-[#FCFAF5] p-6 sm:p-8 shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#223859]">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#C6A66B] block mb-1">
                    GulfSaasReview Editorial Verdict
                  </span>
                  <h3 className="text-2xl font-bold font-editorial text-white">
                    {software.verdict.badge}
                  </h3>
                </div>
                <div className="flex items-center gap-2 bg-[#14243C] px-4 py-2 rounded-xl border border-[#223859]">
                  <span className="text-3xl font-bold text-[#C6A66B]">
                    {software.verdict.score}
                  </span>
                  <span className="text-xs text-[#E7E4DC]/70">/ 10 Overall Score</span>
                </div>
              </div>

              <p className="mt-6 text-sm text-[#E7E4DC] leading-relaxed">
                {software.verdict.summary}
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-4 border-t border-[#223859]">
                <div>
                  <strong className="text-emerald-400 block mb-1">
                    Best Suited For:
                  </strong>
                  <span className="text-[#E7E4DC]/80">
                    {software.verdict.bestFor}
                  </span>
                </div>
                <div>
                  <strong className="text-rose-400 block mb-1">
                    Not Recommended For:
                  </strong>
                  <span className="text-[#E7E4DC]/80">
                    {software.verdict.notRecommendedFor}
                  </span>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar Column (Col Span 4) */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Quick Actions Card */}
            <div className="rounded-2xl border border-[#E7E4DC] bg-[#FCFAF5] p-6 shadow-xs sticky top-28">
              <h3 className="text-base font-bold text-[#101F35] mb-4">
                Evaluate & Compare
              </h3>

              <div className="space-y-3">
                <Link
                  href={`/compare?a=${software.slug}`}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#101F35] px-4 py-3 text-xs font-bold text-white hover:bg-[#172B46] transition-colors"
                >
                  <Scale className="h-4 w-4 text-[#C6A66B]" />
                  <span>Compare with Other Platforms</span>
                </Link>

                <a
                  href={software.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 rounded-xl border border-[#101F35] bg-white px-4 py-3 text-xs font-bold text-[#101F35] hover:bg-[#F6F1E7] transition-colors"
                >
                  <span>Visit {software.name} Official Website</span>
                  <ExternalLink className="h-3.5 w-3.5 text-[#C6A66B]" />
                </a>
              </div>

              {/* Verified Integrations List */}
              <div className="mt-6 pt-5 border-t border-[#E7E4DC]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#697386] mb-3">
                  Verified Local Integrations
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {software.localIntegrations.map((intg, i) => (
                    <span
                      key={i}
                      className="rounded bg-[#F6F1E7] border border-[#E7E4DC] px-2 py-1 text-[11px] text-[#101F35]"
                    >
                      {intg}
                    </span>
                  ))}
                </div>
              </div>

              {/* Regulatory Compliance Badges */}
              <div className="mt-6 pt-5 border-t border-[#E7E4DC]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#697386] mb-3">
                  Regional Regulatory Badges
                </h4>
                <div className="space-y-1.5">
                  {software.localCompliance.map((comp, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-1.5 text-xs text-[#101F35]"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                      <span className="text-[11px] font-medium">{comp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Research Disclaimer */}
              <div className="mt-6 pt-4 border-t border-[#E7E4DC] text-[10px] text-[#697386] leading-relaxed">
                <span className="font-semibold text-[#101F35] block mb-0.5">
                  Editorial Research Note:
                </span>
                {software.sampleNotice}
              </div>
            </div>
          </aside>
        </div>

        {/* ---------------------------------------------------- */}
        {/* SIMILAR SOFTWARE RECOMMENDATIONS                     */}
        {/* ---------------------------------------------------- */}
        <section className="mt-20 pt-12 border-t border-[#E7E4DC]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#C6A66B] block mb-1">
                Alternative Solutions
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-editorial text-[#101F35]">
                Similar Software for Gulf Businesses
              </h2>
            </div>
            <Link
              href="/reviews"
              className="text-xs font-bold text-[#101F35] hover:text-[#C6A66B] flex items-center gap-1"
            >
              <span>All Reviews</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarProducts.map((sim) => (
              <SoftwareCard key={sim.id} software={sim} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

