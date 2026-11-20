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
  Sparkles,
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
    <div className="min-h-screen bg-[#FFF8EF] pb-24">
      {/* ---------------------------------------------------- */}
      {/* BREADCRUMBS & TOP HERO BANNER                        */}
      {/* ---------------------------------------------------- */}
      <div className="bg-[#FFF8EF] border-b border-[#EAE2D5] pt-8 pb-12 sm:pb-14">
        <div className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8 xl:px-12">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center space-x-2 text-xs sm:text-sm text-[#5E7A6E] mb-6">
            <Link href="/" className="hover:text-[#0B3D2E] font-medium">
              Home
            </Link>
            <span>/</span>
            <Link href="/reviews" className="hover:text-[#0B3D2E] font-medium">
              Reviews
            </Link>
            <span>/</span>
            <Link
              href={`/reviews?category=${software.category}`}
              className="hover:text-[#0B3D2E] font-medium"
            >
              {software.categoryName}
            </Link>
            <span>/</span>
            <span className="font-bold text-[#0B3D2E]">{software.name}</span>
          </nav>

          {/* Product Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
              {/* Product Logo */}
              <div
                className="flex h-16 w-16 sm:h-20 sm:w-20 shrink-0 items-center justify-center rounded-2xl text-2xl sm:text-3xl font-serif font-bold text-white shadow-md"
                style={{ backgroundColor: software.accentColor || "#0B3D2E" }}
              >
                {software.name.substring(0, 2).toUpperCase()}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2.5 mb-2">
                  <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-editorial text-[#0B3D2E]">
                    {software.name}
                  </h1>
                  <span className="inline-flex items-center gap-1 rounded-lg bg-[#FFF8EF] px-3 py-1 text-xs sm:text-sm font-semibold text-[#5E7A6E] border border-[#EAE2D5]">
                    <ShieldCheck className="h-4 w-4 text-[#16A34A]" />
                    Sample Review Profile
                  </span>
                </div>

                <p className="text-sm sm:text-lg text-[#556070] max-w-3xl leading-relaxed">
                  {software.tagline}
                </p>

                {/* Country Suitability Tags */}
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#5E7A6E] mr-1">
                    Suited For:
                  </span>
                  {software.countrySuitability.map((c) => (
                    <span
                      key={c}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-[#0B3D2E]/5 px-3 py-1 text-xs sm:text-sm font-bold text-[#0B3D2E]"
                    >
                      <Building2 className="h-3.5 w-3.5 text-[#16A34A]" />
                      {c}
                    </span>
                  ))}

                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#16A34A]/20 px-3 py-1 text-xs sm:text-sm font-bold text-[#0B3D2E]">
                    <Globe2 className="h-3.5 w-3.5" />
                    {software.arabicSupport}
                  </span>
                </div>
              </div>
            </div>

            {/* Rating & CTA Block */}
            <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-3 shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-[#EAE2D5]">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-2xl sm:text-3xl font-extrabold text-[#0B3D2E]">
                  <Star className="h-6 w-6 fill-[#16A34A] text-[#16A34A]" />
                  <span>{software.rating.toFixed(1)}</span>
                </div>
                <div className="text-left text-xs sm:text-sm text-[#556070]">
                  <div className="font-bold text-[#0B3D2E]">Score: {software.verdict.score}/10</div>
                  <div className="text-[11px] text-[#5E7A6E]">Regional GCC Criteria</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto pt-2">
                <Link
                  href={`/compare?a=${software.slug}`}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-xl border border-[#0B3D2E] bg-white px-5 py-3 text-sm font-bold text-[#0B3D2E] hover:bg-[#FFF8EF] transition-all min-h-[44px]"
                >
                  <Scale className="h-4 w-4 text-[#16A34A]" />
                  <span>Compare</span>
                </Link>

                <a
                  href={software.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-xl bg-[#0B3D2E] px-5 py-3 text-sm font-bold text-[#FFF8EF] hover:bg-[#172B46] transition-all shadow-xs min-h-[44px]"
                >
                  <span>Visit Vendor</span>
                  <ExternalLink className="h-4 w-4 text-[#16A34A]" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* MAIN REVIEW BODY & SIDEBAR                           */}
      {/* ---------------------------------------------------- */}
      <div className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8 xl:px-12 pt-8 sm:pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Review Content (Col Span 8) */}
          <div className="lg:col-span-8 space-y-10">
            {/* 1. Software Overview & Executive Summary */}
            <section className="rounded-2xl border border-[#EAE2D5] bg-[#FFF8EF] p-6 sm:p-8 shadow-xs">
              <h2 className="text-2xl sm:text-3xl font-bold font-editorial text-[#0B3D2E] mb-4">
                Executive Overview
              </h2>
              <p className="text-base sm:text-lg text-[#0B3D2E] leading-relaxed mb-4 font-normal">
                {software.description}
              </p>
              <p className="text-sm sm:text-base text-[#556070] leading-relaxed">
                {software.gulfSuitabilityAnalysis.summary}
              </p>

              {/* Quick Metrics Bar */}
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-6 border-t border-[#EAE2D5]">
                <div className="rounded-xl bg-[#FFF8EF] p-4 text-center">
                  <span className="text-xs uppercase font-bold text-[#5E7A6E] block">
                    Ease of Use
                  </span>
                  <span className="text-xl font-extrabold text-[#0B3D2E] block mt-1">
                    {software.easeOfUse} / 10
                  </span>
                </div>
                <div className="rounded-xl bg-[#FFF8EF] p-4 text-center">
                  <span className="text-xs uppercase font-bold text-[#5E7A6E] block">
                    Deployment
                  </span>
                  <span className="text-sm sm:text-base font-bold text-[#0B3D2E] block mt-1">
                    {software.deploymentTime}
                  </span>
                </div>
                <div className="rounded-xl bg-[#FFF8EF] p-4 text-center">
                  <span className="text-xs uppercase font-bold text-[#5E7A6E] block">
                    Starting At
                  </span>
                  <span className="text-base sm:text-lg font-bold text-[#0B3D2E] block mt-1">
                    {software.pricing.startingPrice}
                  </span>
                </div>
                <div className="rounded-xl bg-[#FFF8EF] p-4 text-center">
                  <span className="text-xs uppercase font-bold text-[#5E7A6E] block">
                    Arabic Support
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-[#0B3D2E] block mt-1 truncate">
                    {software.arabicSupport.split(" ")[0]}
                  </span>
                </div>
              </div>
            </section>

            {/* 2. Key Features Breakdown */}
            <section className="rounded-2xl border border-[#EAE2D5] bg-[#FFF8EF] p-6 sm:p-8 shadow-xs">
              <h2 className="text-2xl sm:text-3xl font-bold font-editorial text-[#0B3D2E] mb-2">
                Key Features &amp; Regional Benchmarks
              </h2>
              <p className="text-sm text-[#556070] mb-6">
                Evaluated against Gulf corporate software operational standards.
              </p>

              <div className="space-y-4">
                {software.keyFeatures.map((kf, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-[#EAE2D5] bg-white p-5 transition-all hover:border-[#16A34A]"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-base font-bold text-[#0B3D2E]">
                        {kf.title}
                      </h4>
                      <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0B3D2E] bg-[#FFF8EF] px-2.5 py-1 rounded-md">
                        <Sparkles className="h-3.5 w-3.5 text-[#16A34A]" />
                        <span>{kf.score} / 10</span>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-[#556070] leading-relaxed">
                      {kf.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* 3. Pros & Cons (Gulf Market Focused) */}
            <section className="rounded-2xl border border-[#EAE2D5] bg-[#FFF8EF] p-6 sm:p-8 shadow-xs">
              <h2 className="text-2xl sm:text-3xl font-bold font-editorial text-[#0B3D2E] mb-6">
                Pros &amp; Cons: The Gulf Perspective
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Pros */}
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-6">
                  <div className="flex items-center gap-2 mb-4 text-emerald-900 font-bold text-base">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                    <span>Key Advantages</span>
                  </div>
                  <ul className="space-y-3">
                    {software.pros.map((pro, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-[#0B3D2E] leading-relaxed"
                      >
                        <span className="h-2 w-2 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Cons */}
                <div className="rounded-2xl border border-rose-200 bg-rose-50/50 p-6">
                  <div className="flex items-center gap-2 mb-4 text-rose-900 font-bold text-base">
                    <XCircle className="h-5 w-5 text-rose-600" />
                    <span>Points to Consider</span>
                  </div>
                  <ul className="space-y-3">
                    {software.cons.map((con, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-[#0B3D2E] leading-relaxed"
                      >
                        <span className="h-2 w-2 rounded-full bg-rose-600 mt-1.5 shrink-0" />
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* 4. Regional Suitability Deep-Dive */}
            <section className="rounded-2xl border border-[#16A34A]/50 bg-gradient-to-br from-[#FFF8EF] to-[#FFF8EF] p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#16A34A] mb-2">
                <Globe2 className="h-4 w-4" />
                <span>Regional Middle East Audit</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-editorial text-[#0B3D2E] mb-6">
                Middle Eastern Market Compliance &amp; Readiness
              </h2>

              <div className="space-y-4">
                {software.gulfSuitabilityAnalysis.zatcaStatus && (
                  <div className="rounded-xl bg-white border border-[#EAE2D5] p-5">
                    <span className="text-sm font-bold text-[#0B3D2E] block mb-1">
                      Saudi Arabia ZATCA E-Invoicing Status:
                    </span>
                    <p className="text-xs sm:text-sm text-[#556070] leading-relaxed">
                      {software.gulfSuitabilityAnalysis.zatcaStatus}
                    </p>
                  </div>
                )}

                {software.gulfSuitabilityAnalysis.uaeVatStatus && (
                  <div className="rounded-xl bg-white border border-[#EAE2D5] p-5">
                    <span className="text-sm font-bold text-[#0B3D2E] block mb-1">
                      UAE FTA VAT Compliance Status:
                    </span>
                    <p className="text-xs sm:text-sm text-[#556070] leading-relaxed">
                      {software.gulfSuitabilityAnalysis.uaeVatStatus}
                    </p>
                  </div>
                )}

                <div className="rounded-xl bg-white border border-[#EAE2D5] p-5">
                  <span className="text-sm font-bold text-[#0B3D2E] block mb-1">
                    Arabic Language &amp; RTL Usability:
                  </span>
                  <p className="text-xs sm:text-sm text-[#556070] leading-relaxed">
                    {software.gulfSuitabilityAnalysis.arabicExperience}
                  </p>
                </div>

                <div className="rounded-xl bg-white border border-[#EAE2D5] p-5">
                  <span className="text-sm font-bold text-[#0B3D2E] block mb-1">
                    GCC Data Residency &amp; Cloud Hosting:
                  </span>
                  <p className="text-xs sm:text-sm text-[#556070] leading-relaxed">
                    {software.gulfSuitabilityAnalysis.dataResidency}
                  </p>
                </div>
              </div>
            </section>

            {/* 5. Pricing Information & Tiers */}
            <section className="rounded-2xl border border-[#EAE2D5] bg-[#FFF8EF] p-6 sm:p-8 shadow-xs">
              <h2 className="text-2xl sm:text-3xl font-bold font-editorial text-[#0B3D2E] mb-2">
                Pricing &amp; Regional Estimates
              </h2>
              <p className="text-sm text-[#556070] mb-6">
                {software.pricing.regionalNote}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {software.pricing.tiers.map((tier, idx) => (
                  <div
                    key={idx}
                    className={`rounded-2xl border p-6 flex flex-col justify-between ${
                      tier.highlight
                        ? "border-[#16A34A] bg-[#FFF8EF]/70 shadow-sm"
                        : "border-[#EAE2D5] bg-white"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-[#0B3D2E] text-lg">
                          {tier.name}
                        </h4>
                        {tier.highlight && (
                          <span className="rounded-md bg-[#16A34A] text-[#0B3D2E] text-xs font-bold px-2.5 py-1">
                            Recommended
                          </span>
                        )}
                      </div>

                      <div className="flex items-baseline gap-1 my-3">
                        <span className="text-2xl sm:text-3xl font-extrabold text-[#0B3D2E]">
                          {tier.price}
                        </span>
                        <span className="text-xs sm:text-sm text-[#5E7A6E]">
                          /{tier.period}
                        </span>
                      </div>

                      {tier.regionalEstimateSAR && (
                        <div className="text-xs sm:text-sm font-bold text-[#0B3D2E] mb-3">
                          Est: {tier.regionalEstimateSAR} â€¢ {tier.regionalEstimateAED}
                        </div>
                      )}

                      <p className="text-xs sm:text-sm text-[#556070] mb-4">
                        {tier.description}
                      </p>

                      <ul className="space-y-2.5 border-t border-[#EAE2D5] pt-4 text-xs sm:text-sm text-[#0B3D2E]">
                        {tier.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 6. Final Verdict */}
            <section className="rounded-2xl border border-[#0B3D2E] bg-[#0B3D2E] text-[#FFF8EF] p-6 sm:p-8 shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#172B46]">
                <div>
                  <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#16A34A] block mb-1">
                    GulfSaasReview Editorial Verdict
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold font-editorial text-white">
                    {software.verdict.badge}
                  </h3>
                </div>
                <div className="flex items-center gap-2 bg-[#172B46] px-5 py-2.5 rounded-xl border border-[#172B46]">
                  <span className="text-3xl font-extrabold text-[#16A34A]">
                    {software.verdict.score}
                  </span>
                  <span className="text-xs sm:text-sm text-[#EAE2D5]/80 font-medium">/ 10 Overall Score</span>
                </div>
              </div>

              <p className="mt-6 text-sm sm:text-base text-[#EAE2D5] leading-relaxed">
                {software.verdict.summary}
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs sm:text-sm pt-5 border-t border-[#172B46]">
                <div>
                  <strong className="text-emerald-400 block mb-1 text-sm">
                    Best Suited For:
                  </strong>
                  <span className="text-[#EAE2D5]/90 leading-relaxed">
                    {software.verdict.bestFor}
                  </span>
                </div>
                <div>
                  <strong className="text-rose-400 block mb-1 text-sm">
                    Not Recommended For:
                  </strong>
                  <span className="text-[#EAE2D5]/90 leading-relaxed">
                    {software.verdict.notRecommendedFor}
                  </span>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar Column (Col Span 4) */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Quick Actions Card */}
            <div className="rounded-2xl border border-[#EAE2D5] bg-[#FFF8EF] p-6 sm:p-7 shadow-xs sticky top-28">
              <h3 className="text-base sm:text-lg font-bold text-[#0B3D2E] mb-4">
                Evaluate &amp; Compare
              </h3>

              <div className="space-y-3">
                <Link
                  href={`/compare?a=${software.slug}`}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#0B3D2E] px-4 py-3.5 text-sm font-bold text-white hover:bg-[#172B46] transition-colors"
                >
                  <Scale className="h-4 w-4 text-[#16A34A]" />
                  <span>Compare with Other Platforms</span>
                </Link>

                <a
                  href={software.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 rounded-xl border border-[#0B3D2E] bg-white px-4 py-3.5 text-sm font-bold text-[#0B3D2E] hover:bg-[#FFF8EF] transition-colors"
                >
                  <span>Visit {software.name} Official Website</span>
                  <ExternalLink className="h-4 w-4 text-[#16A34A]" />
                </a>
              </div>

              {/* Verified Integrations List */}
              <div className="mt-6 pt-5 border-t border-[#EAE2D5]">
                <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#5E7A6E] mb-3">
                  Verified Local Integrations
                </h4>
                <div className="flex flex-wrap gap-2">
                  {software.localIntegrations.map((intg, i) => (
                    <span
                      key={i}
                      className="rounded-lg bg-[#FFF8EF] border border-[#EAE2D5] px-2.5 py-1 text-xs text-[#0B3D2E] font-semibold"
                    >
                      {intg}
                    </span>
                  ))}
                </div>
              </div>

              {/* Regulatory Compliance Badges */}
              <div className="mt-6 pt-5 border-t border-[#EAE2D5]">
                <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#5E7A6E] mb-3">
                  Regional Regulatory Badges
                </h4>
                <div className="space-y-2">
                  {software.localCompliance.map((comp, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-xs sm:text-sm text-[#0B3D2E]"
                    >
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                      <span className="font-semibold">{comp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Research Disclaimer */}
              <div className="mt-6 pt-5 border-t border-[#EAE2D5] text-xs text-[#5E7A6E] leading-relaxed">
                <span className="font-bold text-[#0B3D2E] block mb-1">
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
        <section className="mt-20 pt-12 border-t border-[#EAE2D5]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#16A34A] block mb-1">
                Alternative Solutions
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-editorial text-[#0B3D2E]">
                Similar Software for Gulf Businesses
              </h2>
            </div>
            <Link
              href="/reviews"
              className="text-sm font-bold text-[#0B3D2E] hover:text-[#16A34A] flex items-center gap-1"
            >
              <span>All Reviews</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {similarProducts.map((sim) => (
              <SoftwareCard key={sim.id} software={sim} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
