import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { newsArticles, newsLookup } from "@/data/news";
import { softwares, softwareLookup } from "@/data/software";
import ShareButtons from "@/components/ShareButtons";
import SoftwareCard from "@/components/SoftwareCard";
import {
  Clock,
  Calendar,
  Globe2,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Building2,
} from "lucide-react";

export const dynamicParams = false;

export async function generateStaticParams() {
  return newsArticles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = newsLookup[slug];
  if (!article) return { title: "Article Not Found | GulfSaasReview" };

  return {
    title: `${article.title} | GulfSaasReview`,
    description: article.subtitle || article.excerpt,
    openGraph: {
      title: article.title,
      description: article.subtitle || article.excerpt,
      type: "article",
      publishedTime: article.isoDate,
      authors: [article.author.name],
    },
  };
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = newsLookup[slug];

  if (!article) {
    notFound();
  }

  // Find mentioned software
  const mentionedSoftwares = (article.relatedSoftwareSlugs || [])
    .map((slug) => softwareLookup[slug] || softwares.find((s) => s.slug === slug || s.id === slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  // Related news articles (exclude current, prefer same country or category)
  const relatedArticles = newsArticles
    .filter((a) => a.slug !== article.slug)
    .sort((a, b) => {
      const aScore = (a.countryCode === article.countryCode ? 2 : 0) + (a.category === article.category ? 1 : 0);
      const bScore = (b.countryCode === article.countryCode ? 2 : 0) + (b.category === article.category ? 1 : 0);
      return bScore - aScore;
    })
    .slice(0, 3);

  return (
    <article className="min-h-screen bg-[#FFF8EF] pb-24">
      {/* Breadcrumbs Strip */}
      <div className="border-b border-[#EAE2D5] bg-[#FFF8EF]/80">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-3.5">
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-[#697386] overflow-x-auto">
            <Link href="/" className="hover:text-[#0B3D2E] transition-colors shrink-0">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-[#16A34A] shrink-0" />
            <Link href="/news" className="hover:text-[#0B3D2E] transition-colors shrink-0">
              News
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-[#16A34A] shrink-0" />
            <span className="text-[#0B3D2E] font-semibold shrink-0">
              {article.country || article.category}
            </span>
            <ChevronRight className="h-3.5 w-3.5 text-[#16A34A] shrink-0" />
            <span className="text-[#697386] truncate max-w-xs">
              {article.title}
            </span>
          </nav>
        </div>
      </div>

      {/* Article Header Container */}
      <header className="border-b border-[#EAE2D5] bg-[#FFF8EF] pt-8 sm:pt-12 pb-10 sm:pb-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2.5 mb-5">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-[#0B3D2E] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#16A34A]">
              <Globe2 className="h-3.5 w-3.5" />
              {article.country}
            </span>
            <span className="inline-flex items-center rounded-md bg-[#EAE2D5] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#0B3D2E]">
              {article.category}
            </span>
            {article.isTrending && (
              <span className="inline-flex items-center gap-1 rounded-md bg-[#16A34A]/20 border border-[#16A34A]/40 px-2.5 py-1 text-xs font-bold text-[#0B3D2E]">
                Trending Dispatch #{article.trendingRank || "01"}
              </span>
            )}
          </div>

          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold text-[#0B3D2E] tracking-tight leading-[1.15]">
            {article.title}
          </h1>

          {article.subtitle && (
            <p className="mt-5 text-lg sm:text-xl md:text-2xl font-editorial italic text-[#475569] leading-relaxed">
              {article.subtitle}
            </p>
          )}

          {/* Author, Date & Reading Metas */}
          <div className="mt-8 pt-6 border-t border-[#EAE2D5] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="h-12 w-12 rounded-full bg-[#0B3D2E] text-[#16A34A] font-bold flex items-center justify-center text-sm border-2 border-[#16A34A]/30 shrink-0">
                {article.author.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <div className="font-bold text-[#0B3D2E] text-base">
                  {article.author.name}
                </div>
                <div className="text-xs sm:text-sm text-[#697386]">
                  {article.author.role}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs sm:text-sm text-[#697386]">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-[#16A34A]" />
                {article.publishedDate}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-[#16A34A]" />
                {article.readTime}
              </span>
            </div>
          </div>

          {/* Social Share Bar */}
          <div className="mt-6 pt-4 border-t border-[#EAE2D5]/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-xs uppercase tracking-wider font-bold text-[#697386]">
              Share this briefing:
            </span>
            <ShareButtons title={article.title} />
          </div>
        </div>
      </header>

      {/* Main Editorial Content Column */}
      <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12">
        {/* Featured Image with Caption */}
        {article.featuredImage && (
          <figure className="mb-10 overflow-hidden rounded-2xl border border-[#EAE2D5] bg-[#FFF8EF] shadow-xs">
            <div className="relative aspect-16/9 w-full bg-[#0B3D2E]/5">
              <Image
                src={article.featuredImage}
                alt={article.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
            </div>
            {article.imageCaption && (
              <figcaption className="p-4 sm:p-5 text-xs sm:text-sm text-[#697386] italic border-t border-[#EAE2D5] flex items-center justify-between gap-3">
                <span>{article.imageCaption}</span>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#0B3D2E]/70 shrink-0">
                  GulfSaasReview Bureau
                </span>
              </figcaption>
            )}
          </figure>
        )}

        {/* Executive Key Takeaways Callout Box */}
        {article.keyTakeaways && article.keyTakeaways.length > 0 && (
          <div className="mb-10 rounded-2xl border-l-4 border-l-[#16A34A] border border-[#EAE2D5] bg-[#FFF8EF] p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#0B3D2E] text-[#16A34A]">
                <FileText className="h-4 w-4" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold font-editorial text-[#0B3D2E] tracking-tight">
                Executive Takeaways &amp; Strategic Implications
              </h2>
            </div>
            <ul className="space-y-3">
              {article.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-3 text-base sm:text-lg text-[#1E293B]">
                  <CheckCircle2 className="h-5 w-5 text-[#16A34A] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Primary Story Text */}
        <div className="rounded-2xl border border-[#EAE2D5] bg-[#FFF8EF] p-6 sm:p-10 md:p-12 shadow-xs">
          {/* Excerpt as Lead Drop-in */}
          <p className="text-xl sm:text-2xl text-[#0B3D2E] font-editorial leading-relaxed pb-8 border-b border-[#EAE2D5]">
            {article.excerpt}
          </p>

          {/* Body Paragraphs (18-20px readable typography) */}
          <div className="pt-8 space-y-6 text-[18px] sm:text-[19px] md:text-[20px] text-[#1E293B] leading-[1.8] font-normal">
            {article.content?.map((paragraph, idx) => (
              <p key={idx} className="leading-relaxed">
                {paragraph}
              </p>
            ))}

            {/* Subheadings from editorial structure */}
            {article.subheadings && article.subheadings.length > 0 && (
              <div className="space-y-8 pt-6">
                {article.subheadings.map((sub, sIdx) => (
                  <section key={sIdx} className="space-y-4 pt-4 border-t border-[#EAE2D5]">
                    <h2 className="text-2xl sm:text-3xl font-bold font-editorial text-[#0B3D2E] tracking-tight">
                      {sub.title}
                    </h2>
                    {sub.paragraphs.map((p, pIdx) => (
                      <p key={pIdx} className="leading-relaxed">
                        {p}
                      </p>
                    ))}
                  </section>
                ))}
              </div>
            )}

            {/* Editorial Pull Quote */}
            <blockquote className="my-10 border-l-4 border-[#16A34A] bg-[#FFF8EF] p-6 sm:p-8 rounded-r-2xl">
              <p className="font-editorial italic text-xl sm:text-2xl text-[#0B3D2E] leading-relaxed">
                &ldquo;For enterprise decision-makers in Riyadh and Dubai, regulatory alignment is no longer a checklist line item—it is the baseline architecture of business continuity.&rdquo;
              </p>
              <cite className="block mt-4 text-sm font-bold uppercase tracking-wider text-[#697386] not-italic">
                — {article.author.name}, {article.author.role}
              </cite>
            </blockquote>

            {/* Article Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="pt-8 border-t border-[#EAE2D5] flex flex-wrap items-center gap-2">
                <span className="text-xs uppercase tracking-wider font-bold text-[#697386] mr-2">
                  Filed Under:
                </span>
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-lg bg-[#FFF8EF] border border-[#EAE2D5] px-3 py-1 text-xs font-semibold text-[#0B3D2E]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mentioned Software & Solutions Section */}
        {mentionedSoftwares.length > 0 && (
          <section className="mt-14">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#16A34A]">
                  Technology Benchmark
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-editorial text-[#0B3D2E]">
                  Software Evaluated in This Report
                </h2>
              </div>
              <Link
                href="/reviews"
                className="hidden sm:inline-flex items-center gap-1.5 text-sm font-bold text-[#0B3D2E] hover:text-[#16A34A] transition-colors"
              >
                <span>Full Directory</span>
                <ArrowRight className="h-4 w-4 text-[#16A34A]" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mentionedSoftwares.map((sw) => (
                <SoftwareCard key={sw.id} software={sw} />
              ))}
            </div>
          </section>
        )}

        {/* Related Regional Dispatches */}
        {relatedArticles.length > 0 && (
          <section className="mt-16 pt-12 border-t border-[#EAE2D5]">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#16A34A]">
                  Further Intelligence
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-editorial text-[#0B3D2E]">
                  Related Regional Dispatches
                </h2>
              </div>
              <Link
                href="/news"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0B3D2E] hover:text-[#16A34A] transition-colors"
              >
                <span>View All News</span>
                <ArrowRight className="h-4 w-4 text-[#16A34A]" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => (
                <article
                  key={rel.id}
                  className="group flex flex-col justify-between rounded-2xl border border-[#EAE2D5] bg-[#FFF8EF] p-5 transition-all duration-300 hover:border-[#16A34A] hover:shadow-md hover:-translate-y-0.5"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#697386] mb-3">
                      <span className="font-bold text-[#0B3D2E] uppercase">
                        {rel.country}
                      </span>
                      <span>{rel.readTime}</span>
                    </div>

                    <Link href={`/news/${rel.slug}`} className="block">
                      <h3 className="font-editorial text-lg font-bold text-[#0B3D2E] group-hover:text-[#16A34A] transition-colors line-clamp-2 leading-snug">
                        {rel.title}
                      </h3>
                    </Link>

                    <p className="mt-2.5 text-sm text-[#475569] line-clamp-2 leading-relaxed">
                      {rel.subtitle || rel.excerpt}
                    </p>
                  </div>

                  <div className="mt-5 pt-3.5 border-t border-[#EAE2D5] flex items-center justify-between text-xs">
                    <span className="text-[#697386]">{rel.publishedDate}</span>
                    <Link
                      href={`/news/${rel.slug}`}
                      className="inline-flex items-center gap-1 font-bold text-[#0B3D2E] group-hover:text-[#16A34A] transition-colors"
                    >
                      <span>Read Story</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Back to News Navigation Strip */}
        <div className="mt-14 pt-8 border-t border-[#EAE2D5] flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-base font-bold text-[#0B3D2E] hover:text-[#16A34A] transition-colors"
          >
            <ArrowLeft className="h-4 w-4 text-[#16A34A]" />
            <span>Return to Gulf News Feed</span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/reviews"
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#EAE2D5] bg-[#FFF8EF] px-4 py-2.5 text-sm font-bold text-[#0B3D2E] hover:border-[#16A34A] transition-colors"
            >
              Browse Software Reviews
            </Link>
            <Link
              href="/compare"
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#0B3D2E] px-4 py-2.5 text-sm font-bold text-[#FFF8EF] hover:bg-[#172B46] transition-colors"
            >
              Compare Solutions
            </Link>
          </div>
        </div>
      </main>
    </article>
  );
}
