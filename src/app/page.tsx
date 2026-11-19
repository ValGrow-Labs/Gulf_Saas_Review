import React from "react";
import Link from "next/link";
import Image from "next/image";
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
  FileText,
  Calendar,
  Compass,
  Layers,
} from "lucide-react";

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
      {/* SECTION 1: EDITORIAL NEWSPAPER HERO GRID             */}
      {/* ---------------------------------------------------- */}
      <section className="bg-[#FCFAF5] pt-6 sm:pt-8 pb-12 border-b border-[#E7E4DC]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Breadcrumb & Tag */}
          <div className="flex items-center justify-between pb-4 border-b border-[#E7E4DC] mb-6 text-sm font-bold uppercase tracking-wider text-[#697386]">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#C6A66B]" />
              <span className="text-[#101F35]">Top Regional Story &amp; Analysis</span>
              <span>•</span>
              <span className="text-[#697386]">Gulf Business &amp; SaaS Intelligence</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#C6A66B]">
              <Flame className="h-4 w-4" />
              <span>Daily Lead Dispatch</span>
            </div>
          </div>

          {/* User-Friendly Quick Discovery & Wayfinding Hub */}
          <div className="mb-8 rounded-2xl border border-[#E7E4DC] bg-white p-4 sm:p-5 shadow-xs">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#101F35] text-[#C6A66B]">
                  <Compass className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-[#697386]">
                    What are you looking for today?
                  </span>
                  <span className="text-sm sm:text-base font-bold text-[#101F35]">
                    Find business software, compare solutions, or explore GCC tech news
                  </span>
                </div>
              </div>

              {/* 3 Quick Action Shortcuts */}
              <div className="flex flex-wrap items-center gap-2.5">
                <Link
                  href="/reviews"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#101F35] px-4 py-2.5 text-xs sm:text-sm font-bold text-[#FCFAF5] hover:bg-[#172B46] transition-colors shadow-2xs"
                >
                  <ShieldCheck className="h-4 w-4 text-[#C6A66B]" />
                  <span>Browse Software</span>
                </Link>
                <Link
                  href="/categories"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-[#E7E4DC] bg-[#FCFAF5] px-4 py-2.5 text-xs sm:text-sm font-bold text-[#101F35] hover:border-[#C6A66B] transition-colors"
                >
                  <Layers className="h-4 w-4 text-[#C6A66B]" />
                  <span>Explore Categories</span>
                </Link>
                <Link
                  href="/compare"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-[#E7E4DC] bg-[#FCFAF5] px-4 py-2.5 text-xs sm:text-sm font-bold text-[#101F35] hover:border-[#C6A66B] transition-colors"
                >
                  <Scale className="h-4 w-4 text-[#C6A66B]" />
                  <span>Compare Tools</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Main 2-Column Newspaper Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            {/* Left: Primary Lead Story with Photo (col-span-8) */}
            <div className="lg:col-span-8 flex flex-col justify-between">
              <article className="group">
                {/* Featured Photo with Category Pill */}
                <div className="relative aspect-16/9 w-full overflow-hidden rounded-2xl border border-[#E7E4DC] bg-[#101F35]/5 shadow-xs mb-5">
                  <Image
                    src={heroArticle.featuredImage || heroArticle.image}
                    alt={heroArticle.title}
                    fill
                    priority
                    className="object-cover transition-transform duration-500 group-hover:scale-102"
                    sizes="(max-width: 1024px) 100vw, 800px"
                  />
                  <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2 z-10">
                    <span className="inline-flex items-center gap-1 rounded-md bg-[#101F35] px-3.5 py-1.5 text-sm font-bold uppercase tracking-wider text-[#C6A66B] shadow-md">
                      <Sparkles className="h-3.5 w-3.5" />
                      {heroArticle.category}
                    </span>
                    <span className="rounded-md bg-white/90 backdrop-blur-xs px-3 py-1.5 text-sm font-semibold text-[#101F35] shadow-xs">
                      {heroArticle.country}
                    </span>
                  </div>
                </div>

                {/* Headline & Metadata */}
                <div className="space-y-3">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[45px] font-bold font-editorial text-[#101F35] tracking-tight leading-[1.2] group-hover:text-[#8C6D33] transition-colors">
                    <Link href={`/news/${heroArticle.slug}`}>
                      {heroArticle.title}
                    </Link>
                  </h1>

                  <p className="text-lg sm:text-xl text-[#334155] leading-relaxed line-clamp-3 font-normal">
                    {heroArticle.subtitle || heroArticle.excerpt}
                  </p>

                  <div className="pt-4 border-t border-[#E7E4DC] flex flex-wrap items-center justify-between gap-4 text-sm sm:text-base text-[#697386]">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-[#101F35] text-[#C6A66B] font-bold flex items-center justify-center text-xs sm:text-sm">
                        {heroArticle.author.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <span className="font-bold text-[#101F35] block leading-tight text-sm sm:text-base">
                          {heroArticle.author.name}
                        </span>
                        <span className="text-xs sm:text-sm text-[#697386]">
                          {heroArticle.author.role}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4 text-[#C6A66B]" />
                        {heroArticle.publishedDate}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4 text-[#C6A66B]" />
                        {heroArticle.readTime}
                      </span>
                      <Link
                        href={`/news/${heroArticle.slug}`}
                        className="inline-flex items-center gap-1 font-bold text-[#101F35] hover:text-[#C6A66B] transition-colors pl-2"
                      >
                        <span>Full Briefing</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            </div>

            {/* Right: Curated Top Stories Column (col-span-4) */}
            <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#E7E4DC]">
                <h3 className="text-base font-bold uppercase tracking-wider text-[#101F35] flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#C6A66B]" />
                  <span>Trending Regional Dispatches</span>
                </h3>
                <Link
                  href="/news"
                  className="text-sm font-bold text-[#C6A66B] hover:text-[#101F35]"
                >
                  All News &rarr;
                </Link>
              </div>

              {/* 3 Side Editorial Stories with Thumbnails */}
              <div className="space-y-4 flex-1 flex flex-col justify-between">
                {sideArticles.map((article, idx) => (
                  <article
                    key={article.id}
                    className="group flex gap-4 pb-4 border-b border-[#E7E4DC] last:border-b-0 last:pb-0"
                  >
                    {/* Thumbnail Image */}
                    <div className="relative h-22 w-26 sm:h-24 sm:w-30 shrink-0 overflow-hidden rounded-xl border border-[#E7E4DC] bg-white">
                      <Image
                        src={article.featuredImage || article.image}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="120px"
                      />
                    </div>

                    {/* Story Content */}
                    <div className="min-w-0 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 text-xs mb-1">
                          <span className="font-bold uppercase tracking-wider text-[#C6A66B]">
                            {article.country}
                          </span>
                          <span className="text-[#697386]">•</span>
                          <span className="text-[#697386]">{article.readTime}</span>
                        </div>
                        <h4 className="font-editorial text-base sm:text-[17px] font-bold text-[#101F35] group-hover:text-[#8C6D33] transition-colors leading-snug line-clamp-2">
                          <Link href={`/news/${article.slug}`}>
                            {article.title}
                          </Link>
                        </h4>
                      </div>

                      <span className="text-xs text-[#697386] mt-1.5">
                        {article.publishedDate}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>

          {/* Sub-Hero 4-Column Regional Spotlight Strip */}
          <div className="mt-10 pt-8 border-t border-[#E7E4DC]">
            <div className="text-sm font-bold uppercase tracking-wider text-[#697386] mb-4 flex items-center justify-between">
              <span>National Innovation Spotlights</span>
              <span className="text-[#101F35]">KSA • UAE • Qatar • Kuwait</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {spotlightArticles.map((item) => (
                <article
                  key={item.id}
                  className="group rounded-xl border border-[#E7E4DC] bg-white p-4.5 transition-all duration-200 hover:border-[#C6A66B] hover:shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-16/10 w-full overflow-hidden rounded-lg mb-3 bg-[#101F35]/5">
                      <Image
                        src={item.featuredImage || item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 300px"
                      />
                      <span className="absolute bottom-2 left-2 rounded bg-[#101F35]/90 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-[#C6A66B] backdrop-blur-xs">
                        {item.country}
                      </span>
                    </div>

                    <h5 className="font-editorial text-base font-bold text-[#101F35] group-hover:text-[#8C6D33] transition-colors leading-snug line-clamp-2">
                      <Link href={`/news/${item.slug}`}>
                        {item.title}
                      </Link>
                    </h5>
                  </div>

                  <div className="mt-3.5 pt-2.5 border-t border-[#E7E4DC] flex items-center justify-between text-xs text-[#697386]">
                    <span className="font-medium">{item.category}</span>
                    <span className="font-semibold text-[#101F35] group-hover:text-[#C6A66B]">
                      Read &rarr;
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SECTION 2: GULF COUNTRIES MOVING BUILDINGS ANIMATION  */}
      {/* ---------------------------------------------------- */}
      <HomeNewsSection />

      {/* ---------------------------------------------------- */}
      {/* SECTION 3: LATEST GULF TECHNOLOGY NEWS (MAGAZINE)    */}
      {/* ---------------------------------------------------- */}
      <section className="py-14 sm:py-20 bg-[#FCFAF5] border-b border-[#E7E4DC]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#E7E4DC]">
            <div>
              <div className="inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wider text-[#C6A66B] mb-1.5">
                <FileText className="h-4.5 w-4.5" />
                <span>Editorial Dispatches</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold font-editorial text-[#101F35] tracking-tight">
                Latest Gulf Technology &amp; Enterprise News
              </h2>
              <p className="mt-2 text-lg sm:text-xl text-[#475569] max-w-2xl leading-relaxed">
                Independent reporting on Middle Eastern artificial intelligence, sovereign cloud infrastructure, and enterprise software acquisitions.
              </p>
            </div>

            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-base sm:text-[17px] font-bold text-[#101F35] hover:text-[#C6A66B] transition-colors shrink-0"
            >
              <span>Explore All News</span>
              <ArrowRight className="h-4.5 w-4.5 text-[#C6A66B]" />
            </Link>
          </div>

          {/* Newspaper 3-Column Story Grid with Clean Photos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {latestArticles.map((article) => (
              <article
                key={article.id}
                className="group flex flex-col justify-between rounded-2xl border border-[#E7E4DC] bg-white p-5 transition-all duration-300 hover:border-[#C6A66B] hover:shadow-md"
              >
                <div>
                  <div className="relative aspect-16/10 w-full overflow-hidden rounded-xl border border-[#E7E4DC] bg-[#101F35]/5 mb-4">
                    <Image
                      src={article.featuredImage || article.image}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-103"
                      sizes="(max-width: 768px) 100vw, 400px"
                    />
                    <span className="absolute top-2.5 left-2.5 rounded bg-[#101F35]/90 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-[#C6A66B]">
                      {article.country}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#8C6D33] bg-[#C6A66B]/15 px-2.5 py-0.5 rounded-md">
                      {article.category}
                    </span>
                    <span className="text-xs sm:text-sm text-[#697386]">
                      {article.publishedDate}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold font-editorial text-[#101F35] group-hover:text-[#8C6D33] transition-colors leading-snug line-clamp-2">
                    <Link href={`/news/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h3>

                  <p className="mt-2.5 text-base sm:text-[17px] text-[#475569] leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-[#E7E4DC] flex items-center justify-between text-xs sm:text-sm text-[#697386]">
                  <div className="flex items-center gap-1.5 font-medium">
                    <User className="h-4 w-4 text-[#C6A66B]" />
                    <span>{article.author.name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-[#C6A66B]" />
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
      <section className="py-14 sm:py-20 bg-[#101F35] text-[#FCFAF5] border-b border-[#172B46]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#172B46]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#C6A66B]/50 bg-[#172B46] px-4 py-1.5 text-sm font-bold uppercase tracking-wider text-[#C6A66B] mb-2.5">
                <TrendingUp className="h-4 w-4" />
                <span>Executive Pulse</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold font-editorial text-white tracking-tight">
                What&apos;s Trending in the Gulf
              </h2>
              <p className="mt-2 text-lg text-[#E7E4DC]/90 max-w-2xl leading-relaxed">
                High-interest technology topics dominating boardrooms and ministerial agendas across Riyadh, Dubai, Doha, and Kuwait City.
              </p>
            </div>

            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-base font-bold text-[#C6A66B] hover:text-white transition-colors shrink-0"
            >
              <span>Explore All Trends</span>
              <ArrowRight className="h-4.5 w-4.5" />
            </Link>
          </div>

          {/* Numbered Editorial Trend Ranking Cards (01 to 06) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {trendingTopics.map((item) => (
              <div
                key={item.rank}
                className="group relative rounded-2xl border border-[#172B46] bg-[#0A1628] p-6 hover:border-[#C6A66B] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-[#172B46]">
                    <span className="font-editorial text-4xl font-extrabold text-[#C6A66B]/80 group-hover:text-[#C6A66B] transition-colors">
                      {item.rank}
                    </span>
                    <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#DFCA9B] bg-[#C6A66B]/15 px-3 py-1 rounded-md">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="mt-4 text-xl sm:text-2xl font-bold font-editorial text-white group-hover:text-[#DFCA9B] transition-colors leading-snug">
                    <Link href="/news">
                      {item.headline}
                    </Link>
                  </h3>

                  <p className="mt-2.5 text-base text-[#CBD5E1] leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-[#172B46] flex items-center justify-between text-xs sm:text-sm text-[#E7E4DC]/70">
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
      <section className="py-14 sm:py-20 bg-[#F6F1E7] border-b border-[#E7E4DC]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#E7E4DC]">
            <div>
              <div className="inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wider text-[#C6A66B] mb-1.5">
                <Cpu className="h-4.5 w-4.5" />
                <span>Deep-Tech Research</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold font-editorial text-[#101F35] tracking-tight">
                AI &amp; Enterprise Technology Insights
              </h2>
              <p className="mt-2 text-lg text-[#475569] max-w-2xl leading-relaxed">
                In-depth technical evaluations of Arabic foundation models, GCC sovereign cloud infrastructure, and enterprise automation.
              </p>
            </div>

            <Link
              href="/news?category=ai-innovation"
              className="inline-flex items-center gap-2 text-base font-bold text-[#101F35] hover:text-[#C6A66B] transition-colors shrink-0"
            >
              <span>View All AI Articles</span>
              <ArrowRight className="h-4.5 w-4.5 text-[#C6A66B]" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {aiArticles.map((art) => (
              <article
                key={art.id}
                className="group flex flex-col justify-between rounded-2xl border border-[#E7E4DC] bg-white p-6 shadow-xs hover:border-[#C6A66B] hover:shadow-md transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between text-xs sm:text-sm text-[#697386] mb-3">
                    <span className="font-bold text-[#101F35] uppercase">
                      {art.country}
                    </span>
                    <span className="text-[#8C6D33] font-semibold">{art.readTime}</span>
                  </div>

                  <h3 className="font-editorial text-xl sm:text-2xl font-bold text-[#101F35] group-hover:text-[#8C6D33] transition-colors leading-snug">
                    <Link href={`/news/${art.slug}`}>{art.title}</Link>
                  </h3>

                  <p className="mt-3 text-base text-[#475569] leading-relaxed line-clamp-3">
                    {art.excerpt}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E7E4DC] flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-[#697386]">{art.publishedDate}</span>
                  <Link
                    href={`/news/${art.slug}`}
                    className="inline-flex items-center gap-1 font-bold text-[#101F35] group-hover:text-[#C6A66B] transition-colors"
                  >
                    <span>Read Briefing</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SECTION 6: SAAS REVIEWS & COMPARISONS PRESERVATION   */}
      {/* ---------------------------------------------------- */}
      <section className="py-14 sm:py-20 bg-[#FCFAF5] border-b border-[#E7E4DC]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#E7E4DC]">
            <div>
              <div className="inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wider text-[#C6A66B] mb-1.5">
                <ShieldCheck className="h-4.5 w-4.5" />
                <span>Regional Software Directory</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold font-editorial text-[#101F35] tracking-tight">
                Software Reviews &amp; Comparisons
              </h2>
              <p className="mt-2 text-lg text-[#475569] max-w-2xl leading-relaxed">
                Objective evaluations of business software assessed for Saudi ZATCA e-invoicing Phase 2, UAE VAT compliance, and Arabic RTL interfaces.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/compare"
                className="inline-flex items-center gap-2 rounded-xl border border-[#E7E4DC] bg-white px-4.5 py-3 text-sm sm:text-base font-bold text-[#101F35] hover:border-[#C6A66B] transition-colors shadow-2xs"
              >
                <Scale className="h-4.5 w-4.5 text-[#C6A66B]" />
                <span>Side-by-Side Matrix</span>
              </Link>
              <Link
                href="/reviews"
                className="inline-flex items-center gap-2 rounded-xl bg-[#101F35] px-4.5 py-3 text-sm sm:text-base font-bold text-[#FCFAF5] hover:bg-[#172B46] transition-colors"
              >
                <span>Full Directory</span>
                <ArrowRight className="h-4.5 w-4.5" />
              </Link>
            </div>
          </div>

          {/* Software Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredSoftware.map((software) => (
              <SoftwareCard key={software.id} software={software} />
            ))}
          </div>

          {/* Curated Head-to-Head Comparison Teasers */}
          <div className="pt-8 border-t border-[#E7E4DC]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold font-editorial text-[#101F35]">
                Featured Head-to-Head Comparisons
              </h3>
              <Link
                href="/compare"
                className="text-sm sm:text-base font-bold text-[#101F35] hover:text-[#C6A66B] transition-colors"
              >
                All Comparisons &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {comparisons.slice(0, 2).map((comp) => (
                <div
                  key={comp.id}
                  className="rounded-2xl border border-[#E7E4DC] bg-white p-6 hover:border-[#C6A66B] transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#C6A66B]">
                      {comp.categories?.[0] || "Head-to-Head"}
                    </span>
                    <h4 className="font-editorial text-2xl font-bold text-[#101F35] mt-1.5 leading-snug">
                      <Link href={`/compare/${comp.slug}`}>{comp.title}</Link>
                    </h4>
                    <p className="mt-2 text-base text-[#475569] leading-relaxed">
                      {comp.shortDescription}
                    </p>
                  </div>

                  <div className="mt-5 pt-3.5 border-t border-[#E7E4DC] flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-[#697386]">
                      GCC Verdict &amp; Pricing Analysis
                    </span>
                    <Link
                      href={`/compare/${comp.slug}`}
                      className="inline-flex items-center gap-1 text-sm font-bold text-[#101F35] hover:text-[#C6A66B] transition-colors"
                    >
                      <span>Compare Solutions</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SECTION 7: EDITORIAL NEWSLETTER BRIEFING             */}
      {/* ---------------------------------------------------- */}
      <NewsletterSection />
    </div>
  );
}
