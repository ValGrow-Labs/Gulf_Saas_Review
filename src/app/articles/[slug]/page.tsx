import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { articles, articleLookup } from "@/data/articles";
import { softwares, softwareLookup } from "@/data/software";
import ShareButtons from "@/components/ShareButtons";
import SoftwareCard from "@/components/SoftwareCard";
import {
  Clock,
  Calendar,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  FileText,
  CheckCircle2,
} from "lucide-react";

export const dynamicParams = false;

export async function generateStaticParams() {
  return articles.map((a) => ({
    slug: a.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articleLookup[slug];
  if (!article) return { title: "Article Not Found | GulfSaasReview" };

  return {
    title: `${article.title} | GulfSaasReview`,
    description: article.excerpt,
  };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articleLookup[slug];

  if (!article) {
    notFound();
  }

  // Related articles (filter out current)
  const relatedArticles = articles
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3);

  // Mentioned software if any
  const mentionedSoftwares = ((article.relatedSoftwareSlugs || []) as string[])
    .map((s: string) => softwareLookup[s] || softwares.find((item) => item.slug === s || item.id === s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <article className="min-h-screen bg-[#FFF8EF] pb-24">
      {/* Breadcrumb Strip */}
      <div className="border-b border-[#E5DAC8] bg-[#FFF8EF]/80">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-3.5">
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-[#4A6D5F] overflow-x-auto">
            <Link href="/" className="hover:text-[#064734] transition-colors shrink-0">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-[#15803D] shrink-0" />
            <Link href="/articles" className="hover:text-[#064734] transition-colors shrink-0">
              Insights
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-[#15803D] shrink-0" />
            <span className="text-[#064734] font-semibold shrink-0">
              {article.category}
            </span>
            <ChevronRight className="h-3.5 w-3.5 text-[#15803D] shrink-0" />
            <span className="text-[#4A6D5F] truncate max-w-xs">
              {article.title}
            </span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <header className="border-b border-[#E5DAC8] bg-[#FFF8EF] pt-8 sm:pt-12 pb-10 sm:pb-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2.5 mb-5">
            <span className="inline-flex items-center rounded-md bg-[#064734] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#15803D]">
              {article.category}
            </span>
            {(article as any).country && (
              <span className="inline-flex items-center rounded-md bg-[#E5DAC8] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#064734]">
                {(article as any).country}
              </span>
            )}
          </div>

          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-bold text-[#064734] tracking-tight leading-[1.18]">
            {article.title}
          </h1>

          <div className="mt-8 pt-6 border-t border-[#E5DAC8] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="h-12 w-12 rounded-full bg-[#064734] text-[#15803D] font-bold flex items-center justify-center text-sm border-2 border-[#064734]/30 shrink-0">
                {article.author.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <div className="font-bold text-[#064734] text-base">
                  {article.author.name}
                </div>
                <div className="text-xs sm:text-sm text-[#4A6D5F]">
                  {article.author.role}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs sm:text-sm text-[#4A6D5F]">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-[#15803D]" />
                {article.publishedDate}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-[#15803D]" />
                {article.readTime}
              </span>
            </div>
          </div>

          {/* Social Share Bar */}
          <div className="mt-6 pt-4 border-t border-[#E5DAC8]/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-xs uppercase tracking-wider font-bold text-[#4A6D5F]">
              Share this briefing:
            </span>
            <ShareButtons title={article.title} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12">
        {/* Featured Image */}
        {article.image && (
          <figure className="mb-10 overflow-hidden rounded-2xl border border-[#E5DAC8] bg-[#FFF8EF] shadow-xs">
            <div className="relative aspect-16/9 w-full bg-[#064734]/5">
              <Image
                src={article.image}
                alt={article.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
            </div>
            {(article as any).imageCaption && (
              <figcaption className="p-4 sm:p-5 text-xs sm:text-sm text-[#4A6D5F] italic border-t border-[#E5DAC8]">
                {(article as any).imageCaption}
              </figcaption>
            )}
          </figure>
        )}

        {/* Executive Takeaways */}
        {(article as any).keyTakeaways && (article as any).keyTakeaways.length > 0 && (
          <div className="mb-10 rounded-2xl border-l-4 border-l-[#064734] border border-[#E5DAC8] bg-[#FFF8EF] p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#064734] text-[#15803D]">
                <FileText className="h-4 w-4" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold font-editorial text-[#064734] tracking-tight">
                Executive Takeaways &amp; Strategic Implications
              </h2>
            </div>
            <ul className="space-y-3">
              {(article as any).keyTakeaways.map((takeaway: string, idx: number) => (
                <li key={idx} className="flex items-start gap-3 text-base sm:text-lg text-[#1E293B]">
                  <CheckCircle2 className="h-5 w-5 text-[#15803D] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Article Body */}
        <div className="rounded-2xl border border-[#E5DAC8] bg-[#FFF8EF] p-6 sm:p-10 md:p-12 shadow-xs">
          <p className="text-xl sm:text-2xl text-[#064734] font-editorial leading-relaxed pb-8 border-b border-[#E5DAC8]">
            {article.excerpt}
          </p>

          <div className="pt-8 space-y-6 text-[18px] sm:text-[19px] md:text-[20px] text-[#1E293B] leading-[1.8]">
            {article.content?.map((paragraph, idx) => (
              <p key={idx} className="leading-relaxed">
                {paragraph}
              </p>
            ))}

            {/* Subheadings */}
            {(article as any).subheadings && (article as any).subheadings.length > 0 && (
              <div className="space-y-8 pt-6">
                {(article as any).subheadings.map((sub: any, sIdx: number) => (
                  <section key={sIdx} className="space-y-4 pt-4 border-t border-[#E5DAC8]">
                    <h2 className="text-2xl sm:text-3xl font-bold font-editorial text-[#064734]">
                      {sub.title}
                    </h2>
                    {sub.paragraphs?.map((p: string, pIdx: number) => (
                      <p key={pIdx} className="leading-relaxed">
                        {p}
                      </p>
                    ))}
                  </section>
                ))}
              </div>
            )}

            {/* Pull Quote */}
            <blockquote className="my-10 border-l-4 border-[#064734] bg-[#FFF8EF] p-6 sm:p-8 rounded-r-2xl">
              <p className="font-editorial italic text-xl sm:text-2xl text-[#064734] leading-relaxed">
                &ldquo;When procuring business software across the Gulf, verify vendor adherence to regional regulatory milestones (such as Phase 2 ZATCA or UAE Corporate Tax) as hard contract deliverables.&rdquo;
              </p>
              <cite className="block mt-4 text-sm font-bold uppercase tracking-wider text-[#4A6D5F] not-italic">
                — {article.author.name}, {article.author.role}
              </cite>
            </blockquote>
          </div>
        </div>

        {/* Mentioned Software */}
        {mentionedSoftwares.length > 0 && (
          <section className="mt-14">
            <h2 className="text-2xl sm:text-3xl font-bold font-editorial text-[#064734] mb-6">
              Mentioned Software &amp; Solutions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mentionedSoftwares.map((sw: any) => (
                <SoftwareCard key={sw.id} software={sw} />
              ))}
            </div>
          </section>
        )}

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="mt-16 pt-12 border-t border-[#E5DAC8]">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold font-editorial text-[#064734]">
                Related Guides &amp; Playbooks
              </h2>
              <Link
                href="/articles"
                className="text-sm font-bold text-[#064734] hover:text-[#15803D] transition-colors"
              >
                All Guides &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => (
                <article
                  key={rel.id}
                  className="rounded-2xl border border-[#E5DAC8] bg-[#FFF8EF] p-5 hover:border-[#064734] transition-all"
                >
                  <span className="text-xs font-bold uppercase text-[#15803D]">
                    {rel.category}
                  </span>
                  <Link href={`/articles/${rel.slug}`}>
                    <h3 className="font-editorial text-lg font-bold text-[#064734] hover:text-[#15803D] mt-2 line-clamp-2">
                      {rel.title}
                    </h3>
                  </Link>
                  <p className="mt-2 text-sm text-[#475569] line-clamp-2">
                    {rel.excerpt}
                  </p>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Back Link */}
        <div className="mt-14 pt-8 border-t border-[#E5DAC8] flex items-center justify-between">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-base font-bold text-[#064734] hover:text-[#15803D]"
          >
            <ArrowLeft className="h-4 w-4 text-[#15803D]" />
            <span>Return to Selection Guides</span>
          </Link>
          <Link
            href="/reviews"
            className="rounded-xl bg-[#064734] px-5 py-2.5 text-sm font-bold text-[#FFF8EF] hover:bg-[#15803D] transition-colors"
          >
            Explore Software Reviews
          </Link>
        </div>
      </main>
    </article>
  );
}
