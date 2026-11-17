import React from "react";
import Link from "next/link";
import { newsArticles, trendingTopics } from "@/data/news";
import { softwares } from "@/data/software";
import { comparisons } from "@/data/comparisons";
import SoftwareCard from "@/components/SoftwareCard";
import HomeNewsSection from "@/components/HomeNewsSection";
import NewsletterSection from "@/components/NewsletterSection";
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
  FileText
} from "lucide-react";

export default function HomePage() {
  const heroArticle = newsArticles.find((a) => a.isHeroFeatured) || newsArticles[0];
  const trendingArticles = newsArticles.filter((a) => a.isTrending && a.id !== heroArticle.id).slice(0, 3);
  const latestArticles = newsArticles.filter((a) => a.id !== heroArticle.id).slice(0, 5);
  const aiArticles = newsArticles.filter((a) => a.category === "AI & Innovation" || a.category === "Cybersecurity" || a.category === "SaaS & Cloud").slice(0, 3);

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
    <div className="flex flex-col min-h-screen bg-[#F6F1E7]">
      {/* ---------------------------------------------------- */}
      {/* SECTION 1: EDITORIAL HERO NEWS SECTION               */}
      {/* ---------------------------------------------------- */}
      <section className="relative overflow-hidden bg-[#FCFAF5] pt-8 sm:pt-12 pb-16 border-b border-[#E7E4DC]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Sub-masthead breadcrumb / date */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-[#E7E4DC] mb-8 text-xs font-semibold uppercase tracking-wider text-[#697386]">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#C6A66B]" />
              <span className="text-[#101F35] font-bold">GulfSaasReview Executive Journal</span>
              <span>â€¢</span>
              <span>Middle East Business &amp; SaaS Intelligence</span>
            </div>
            <div className="flex items-center gap-2 text-[#C6A66B]">
              <Flame className="h-3.5 w-3.5" />
              <span className="font-bold">Daily Tech Edition</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            {/* Left: Lead Featured Hero Story (col-span-8) */}
            <div className="lg:col-span-8 flex flex-col justify-between">
              <div className="group relative rounded-3xl overflow-hidden border border-[#E7E4DC] bg-[#101F35] text-[#FCFAF5] shadow-lg flex flex-col justify-end min-h-[440px] sm:min-h-[500px] p-6 sm:p-10 transition-all duration-300">
                {/* Background Editorial Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#101F35] via-[#101F35]/75 to-transparent z-10" />
                <div className="absolute inset-0 bg-[radial-gradient(#C6A66B_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

                {/* Content Overlay */}
                <div className="relative z-20 space-y-4">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#C6A66B] px-3.5 py-1 text-xs font-black uppercase tracking-wider text-[#101F35]">
                      <Sparkles className="h-3.5 w-3.5" />
                      {heroArticle.category}
                    </span>
                    <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-[#FCFAF5] backdrop-blur-xs">
                      {heroArticle.country}
                    </span>
                    <span className="text-xs text-[#E7E4DC]/80 font-medium">
                      {heroArticle.publishedDate}
                    </span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-editorial text-white tracking-tight leading-[1.18] group-hover:text-[#DFCA9B] transition-colors">
                    <Link href={`/news/${heroArticle.slug}`}>
                      {heroArticle.title}
                    </Link>
                  </h1>

                  <p className="text-[17px] sm:text-[18.5px] text-[#E7E4DC]/90 leading-relaxed max-w-3xl line-clamp-3">
                    {heroArticle.subtitle || heroArticle.excerpt}
                  </p>

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-white/15">
                    <div className="flex items-center gap-3 text-sm text-[#E7E4DC]/90">
                      <div className="h-8 w-8 rounded-full bg-[#C6A66B] flex items-center justify-center font-bold text-[#101F35] text-xs">
                        TA
                      </div>
                      <div>
                        <span className="font-bold text-white block leading-tight">{heroArticle.author.name}</span>
                        <span className="text-xs text-[#E7E4DC]/70">{heroArticle.author.role}</span>
                      </div>
                    </div>

                    <Link
                      href={`/news/${heroArticle.slug}`}
                      className="inline-flex items-center gap-2 rounded-xl bg-[#C6A66B] px-5 py-2.5 text-sm font-bold text-[#101F35] hover:bg-[#DFCA9B] transition-all shadow-md"
                    >
                      <span>Read Full Story</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Trending News Dispatches Column (col-span-4) */}
            <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#E7E4DC]">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#C6A66B] animate-pulse" />
                  <h3 className="text-lg font-bold font-editorial text-[#101F35] tracking-tight">
                    Trending Dispatches
                  </h3>
                </div>
                <Link
                  href="/news"
                  className="text-xs font-bold text-[#8C6D33] hover:text-[#101F35] transition-colors"
                >
                  View All &rarr;
                </Link>
              </div>

              <div className="space-y-4 flex-1 flex flex-col justify-between">
                {trendingArticles.map((article, index) => (
                  <article
                    key={article.id}
                    className="group rounded-2xl border border-[#E7E4DC] bg-white p-4.5 hover:border-[#C6A66B] hover:shadow-md transition-all flex flex-col justify-between flex-1"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C6D33] bg-[#C6A66B]/15 px-2 py-0.5 rounded">
                          {article.category}
                        </span>
                        <span className="text-[11px] font-semibold text-[#697386]">
                          {article.readTime}
                        </span>
                      </div>

                      <h4 className="font-bold text-[16.5px] font-editorial text-[#101F35] group-hover:text-[#8C6D33] transition-colors leading-snug line-clamp-2">
                        <Link href={`/news/${article.slug}`}>
                          {article.title}
                        </Link>
                      </h4>

                      <p className="mt-2 text-xs text-[#475569] leading-relaxed line-clamp-2">
                        {article.excerpt}
                      </p>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-[#E7E4DC]/70 flex items-center justify-between text-[11.5px] text-[#697386]">
                      <span className="font-semibold text-[#101F35]">{article.country}</span>
                      <span className="text-[#8C6D33] font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-0.5">
                        Read story &rarr;
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SECTION 2: GULF COUNTRIES MAP & REGIONAL NEWS        */}
      {/* ---------------------------------------------------- */}
      <HomeNewsSection />

      {/* ---------------------------------------------------- */}
      {/* SECTION 3: LATEST GULF TECHNOLOGY NEWS (MAGAZINE)    */}
      {/* ---------------------------------------------------- */}
      <section className="py-16 sm:py-24 bg-[#FCFAF5] border-b border-[#E7E4DC]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-[14px] font-bold uppercase tracking-wider text-[#C6A66B] mb-2">
                <FileText className="h-4 w-4" />
                <span>Editorial Dispatch</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-editorial text-[#101F35] tracking-tight">
                Latest Gulf Technology News
              </h2>
              <p className="mt-3 text-[18px] sm:text-[19px] text-[#334155] max-w-2xl leading-relaxed">
                Independent reporting on Middle Eastern artificial intelligence, sovereign cloud infrastructure, and enterprise software acquisitions.
              </p>
            </div>

            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-[16px] font-bold text-[#101F35] hover:text-[#C6A66B] transition-colors shrink-0"
            >
              <span>Explore All News</span>
              <ArrowRight className="h-4 w-4 text-[#C6A66B]" />
            </Link>
          </div>

          {/* Magazine Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {latestArticles.map((article, i) => (
              <article
                key={article.id}
                className="group flex flex-col justify-between rounded-2xl border border-[#E7E4DC] bg-white p-6 transition-all duration-300 hover:border-[#C6A66B] hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#8C6D33] bg-[#C6A66B]/15 px-2.5 py-1 rounded-md">
                      {article.category}
                    </span>
                    <span className="text-xs font-semibold text-[#697386]">
                      {article.publishedDate}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold font-editorial text-[#101F35] group-hover:text-[#8C6D33] transition-colors leading-snug line-clamp-2">
                    <Link href={`/news/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h3>

                  <p className="mt-3 text-[15px] text-[#475569] leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E7E4DC] flex items-center justify-between text-xs text-[#697386]">
                  <div className="flex items-center gap-1.5 font-medium">
                    <User className="h-3.5 w-3.5 text-[#C6A66B]" />
                    <span>{article.author.name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-[#C6A66B]" />
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SECTION 4: WHAT'S TRENDING IN THE GULF               */}
      {/* ---------------------------------------------------- */}
      <section className="py-16 sm:py-24 bg-[#101F35] text-[#FCFAF5] border-b border-[#223859]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#C6A66B]/50 bg-[#172B46] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#C6A66B] mb-3">
                <TrendingUp className="h-3.5 w-3.5" />
                <span>Executive Pulse</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-editorial text-white tracking-tight">
                What&apos;s Trending in the Gulf
              </h2>
              <p className="mt-3 text-[18px] sm:text-[19px] text-[#E7E4DC]/90 max-w-2xl leading-relaxed">
                High-interest technology topics dominating boardrooms and ministerial agendas across Riyadh, Dubai, Doha, and Kuwait City.
              </p>
            </div>

            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-[15px] font-bold text-[#C6A66B] hover:text-white transition-colors shrink-0"
            >
              <span>Explore All Trends</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Numbered Editorial Trend Ranking Cards (01 to 06) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {trendingTopics.map((item) => (
              <div
                key={item.rank}
                className="group relative rounded-2xl border border-[#223859] bg-[#14243C] p-6 sm:p-7 hover:border-[#C6A66B] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-[#223859]">
                    <span className="font-editorial text-3xl sm:text-4xl font-extrabold text-[#C6A66B]/80 group-hover:text-[#C6A66B] transition-colors">
                      {item.rank}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#DFCA9B] bg-[#C6A66B]/15 px-2.5 py-1 rounded-md">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="mt-4 text-xl font-bold font-editorial text-white group-hover:text-[#DFCA9B] transition-colors leading-snug">
                    <Link href="/news">
                      {item.headline}
                    </Link>
                  </h3>

                  <p className="mt-3 text-[15px] text-[#CBD5E1] leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                <div className="mt-6 pt-3.5 border-t border-[#223859] flex items-center justify-between text-xs text-[#E7E4DC]/70">
                  <span>{item.category}</span>
                  <span className="font-mono text-[#C6A66B]">{item.reads}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SECTION 5: AI & ENTERPRISE TECHNOLOGY INSIGHTS       */}
      {/* ---------------------------------------------------- */}
      <section className="py-16 sm:py-24 bg-[#F6F1E7] border-b border-[#E7E4DC]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-[14px] font-bold uppercase tracking-wider text-[#C6A66B] mb-2">
                <Cpu className="h-4 w-4" />
                <span>Deep-Tech Research</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-editorial text-[#101F35] tracking-tight">
                AI &amp; Enterprise Technology Insights
              </h2>
              <p className="mt-3 text-[18px] sm:text-[19px] text-[#334155] max-w-2xl leading-relaxed">
                In-depth technical evaluations of Arabic foundation models, GCC sovereign cloud infrastructure, and enterprise automation.
              </p>
            </div>

            <Link
              href="/news?category=ai-innovation"
              className="inline-flex items-center gap-2 text-[16px] font-bold text-[#101F35] hover:text-[#C6A66B] transition-colors shrink-0"
            >
              <span>View All AI Articles</span>
              <ArrowRight className="h-4 w-4 text-[#C6A66B]" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {aiArticles.map((art) => (
              <article
                key={art.id}
                className="group flex flex-col justify-between rounded-2xl border border-[#E7E4DC] bg-[#FCFAF5] overflow-hidden shadow-xs hover:border-[#C6A66B] hover:shadow-md transition-all"
              >
                <div>
                  <div className="relative h-44 w-full bg-[#101F35] overflow-hidden flex items-center justify-center p-6 text-center">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#101F35] to-[#172B46] opacity-95" />
                    <div className="relative z-10 space-y-2">
                      <span className="inline-block rounded-full bg-[#C6A66B]/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#DFCA9B] border border-[#C6A66B]/30">
                        {art.category}
                      </span>
                      <p className="font-editorial italic text-white text-lg font-normal line-clamp-2 px-2">
                        &ldquo;{art.title}&rdquo;
                      </p>
                    </div>
                  </div>

                  <div className="p-6">
                    <span className="text-xs font-semibold text-[#8C6D33] block mb-2">
                      {art.country} â€¢ {art.publishedDate}
                    </span>
                    <h3 className="font-bold text-lg font-editorial text-[#101F35] group-hover:text-[#8C6D33] transition-colors leading-snug line-clamp-2">
                      <Link href={`/news/${art.slug}`}>
                        {art.title}
                      </Link>
                    </h3>
                    <p className="mt-2.5 text-[15px] text-[#475569] leading-relaxed line-clamp-3">
                      {art.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-3 border-t border-[#E7E4DC] flex items-center justify-between text-xs text-[#697386]">
                  <span className="font-medium">{art.author.name}</span>
                  <span className="font-bold text-[#101F35] group-hover:text-[#C6A66B] flex items-center gap-1">
                    Read Analysis &rarr;
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SECTION 6: CURATED SAAS REVIEWS & COMPARISONS        */}
      {/* ---------------------------------------------------- */}
      <section className="py-16 sm:py-24 bg-[#FCFAF5] border-b border-[#E7E4DC]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-[14px] font-bold uppercase tracking-wider text-[#C6A66B] mb-2">
                <ShieldCheck className="h-4 w-4" />
                <span>Independent Regional Evaluations</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-editorial text-[#101F35] tracking-tight">
                Curated Software Intelligence &amp; Comparisons
              </h2>
              <p className="mt-3 text-[18px] sm:text-[19px] text-[#334155] max-w-2xl leading-relaxed">
                Objective evaluations of digital tools tailored for Gulf businesses, assessed for Arabic capabilities, ZATCA Phase 2, and UAE VAT compliance.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/reviews"
                className="inline-flex items-center gap-2 rounded-xl bg-[#101F35] px-6 py-3.5 text-sm font-bold text-[#FCFAF5] hover:bg-[#172B46] transition-all shadow-sm"
              >
                <span>All 12 Software Reviews</span>
                <ArrowUpRight className="h-4 w-4 text-[#C6A66B]" />
              </Link>
              <Link
                href="/compare"
                className="inline-flex items-center gap-2 rounded-xl border border-[#101F35] bg-white px-6 py-3.5 text-sm font-bold text-[#101F35] hover:bg-[#F6F1E7] transition-all shadow-2xs"
              >
                <Scale className="h-4 w-4 text-[#C6A66B]" />
                <span>Side-by-Side Matrix</span>
              </Link>
            </div>
          </div>

          {/* Featured Software Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredSoftware.map((software) => (
              <SoftwareCard key={software.id} software={software} />
            ))}
          </div>

          {/* Top Head-to-Head Comparison Matchups Strip */}
          <div className="pt-10 border-t border-[#E7E4DC] space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold font-editorial text-[#101F35]">
                Top Regional Head-to-Head Comparisons
              </h3>
              <Link
                href="/compare"
                className="text-sm font-bold text-[#8C6D33] hover:text-[#101F35]"
              >
                Custom 3-Way Compare &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {comparisons.map((c) => (
                <div
                  key={c.id}
                  className="rounded-2xl border border-[#E7E4DC] bg-white p-5 hover:border-[#C6A66B] hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#697386] block mb-2">
                      {c.categories[0]}
                    </span>
                    <h4 className="font-bold text-base font-editorial text-[#101F35] leading-snug">
                      {c.title}
                    </h4>
                    <p className="mt-2 text-xs text-[#475569] leading-relaxed line-clamp-2">
                      {c.shortDescription}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#E7E4DC] flex items-center justify-between">
                    <span className="text-xs text-[#697386]">Gulf Market Take</span>
                    <Link
                      href={`/compare/${c.slug}`}
                      className="text-xs font-bold text-[#101F35] hover:text-[#C6A66B] inline-flex items-center gap-1"
                    >
                      <span>Compare</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SECTION 7: EDITORIAL NEWSLETTER & BRIEFING           */}
      {/* ---------------------------------------------------- */}
      <NewsletterSection />
    </div>
  );
}
