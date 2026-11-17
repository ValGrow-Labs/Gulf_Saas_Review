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
    <article className="min-h-screen bg-[#F6F1E7] pb-24">
      {/* Breadcrumb Strip */}
      <div className="border-b border-[#E7E4DC] bg-[#FCFAF5]/80">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-3.5">
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-[#697386] overflow-x-auto">
            <Link href="/" className="hover:text-[#101F35] transition-colors shrink-0">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-[#C6A66B] shrink-0" />
            <Link href="/articles" className="hover:text-[#101F35] transition-colors shrink-0">
              Insights
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-[#C6A66B] shrink-0" />
            <span className="text-[#101F35] font-semibold shrink-0">
              {article.category}
            </span>
            <ChevronRight className="h-3.5 w-3.5 text-[#C6A66B] shrink-0" />
            <span className="text-[#697386] truncate max-w-xs">
              {article.title}
            </span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <header className="border-b border-[#E7E4DC] bg-[#FCFAF5] pt-8 sm:pt-12 pb-10 sm:pb-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2.5 mb-5">
            <span className="inline-flex items-center rounded-md bg-[#101F35] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#C6A66B]">
              {article.category}
            </span>
            {(article as any).country && (
              <span className="inline-flex items-center rounded-md bg-[#E7E4DC] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#101F35]">
                {(article as any).country}
              </span>
            )}
          </div>

          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-bold text-[#101F35] tracking-tight leading-[1.18]">
            {article.title}
          </h1>

          <div className="mt-8 pt-6 border-t border-[#E7E4DC] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="h-12 w-12 rounded-full bg-[#101F35] text-[#C6A66B] font-bold flex items-center justify-center text-sm border-2 border-[#C6A66B]/30 shrink-0">
                {article.author.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <div className="font-bold text-[#101F35] text-base">
                  {article.author.name}
                </div>
                <div className="text-xs sm:text-sm text-[#697386]">
                  {article.author.role}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs sm:text-sm text-[#697386]">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-[#C6A66B]" />
                {article.publishedDate}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-[#C6A66B]" />
                {article.readTime}
              </span>
            </div>
          </div>

          {/* Social Share Bar */}
          <div className="mt-6 pt-4 border-t border-[#E7E4DC]/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-xs uppercase tracking-wider font-bold text-[#697386]">
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
          <figure className="mb-10 overflow-hidden rounded-2xl border border-[#E7E4DC] bg-[#FCFAF5] shadow-xs">
            <div className="relative aspect-16/9 w-full bg-[#101F35]/5">
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
              <figcaption className="p-4 sm:p-5 text-xs sm:text-sm text-[#697386] italic border-t border-[#E7E4DC]">
                {(article as any).imageCaption}
              </figcaption>
            )}
          </figure>
        )}

        {/* Executive Takeaways */}
        {(article as any).keyTakeaways && (article as any).keyTakeaways.length > 0 && (
          <div className="mb-10 rounded-2xl border-l-4 border-l-[#C6A66B] border border-[#E7E4DC] bg-[#FCFAF5] p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#101F35] text-[#C6A66B]">
                <FileText className="h-4 w-4" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold font-editorial text-[#101F35] tracking-tight">
                Executive Takeaways &amp; Strategic Implications
              </h2>
            </div>
            <ul className="space-y-3">
              {(article as any).keyTakeaways.map((takeaway: string, idx: number) => (
                <li key={idx} className="flex items-start gap-3 text-base sm:text-lg text-[#1E293B]">
                  <CheckCircle2 className="h-5 w-5 text-[#C6A66B] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Article Body */}
        <div className="rounded-2xl border border-[#E7E4DC] bg-[#FCFAF5] p-6 sm:p-10 md:p-12 shadow-xs">
          <p className="text-xl sm:text-2xl text-[#101F35] font-editorial leading-relaxed pb-8 border-b border-[#E7E4DC]">
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
                  <section key={sIdx} className="space-y-4 pt-4 border-t border-[#E7E4DC]">
                    <h2 className="text-2xl sm:text-3xl font-bold font-editorial text-[#101F35]">
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
            <blockquote className="my-10 border-l-4 border-[#C6A66B] bg-[#F6F1E7] p-6 sm:p-8 rounded-r-2xl">
              <p className="font-editorial italic text-xl sm:text-2xl text-[#101F35] leading-relaxed">
                &ldquo;When procuring business software across the Gulf, verify vendor adherence to regional regulatory milestones (such as Phase 2 ZATCA or UAE Corporate Tax) as hard contract deliverables.&rdquo;
              </p>
              <cite className="block mt-4 text-sm font-bold uppercase tracking-wider text-[#697386] not-italic">
                — {article.author.name}, {article.author.role}
              </cite>
            </blockquote>
          </div>
        </div>

        {/* Mentioned Software */}
        {mentionedSoftwares.length > 0 && (
          <section className="mt-14">
            <h2 className="text-2xl sm:text-3xl font-bold font-editorial text-[#101F35] mb-6">
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
          <section className="mt-16 pt-12 border-t border-[#E7E4DC]">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold font-editorial text-[#101F35]">
                Related Intelligence
              </h2>
              <Link
                href="/news"
                className="text-sm font-bold text-[#101F35] hover:text-[#C6A66B] transition-colors"
              >
                View All News &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => (
                <article
                  key={rel.id}
                  className="rounded-2xl border border-[#E7E4DC] bg-[#FCFAF5] p-5 hover:border-[#C6A66B] transition-all"
                >
                  <span className="text-xs font-bold uppercase text-[#C6A66B]">
                    {rel.category}
                  </span>
                  <Link href={`/news/${rel.slug}`}>
                    <h3 className="font-editorial text-lg font-bold text-[#101F35] hover:text-[#C6A66B] mt-2 line-clamp-2">
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
        <div className="mt-14 pt-8 border-t border-[#E7E4DC] flex items-center justify-between">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-base font-bold text-[#101F35] hover:text-[#C6A66B]"
          >
            <ArrowLeft className="h-4 w-4 text-[#C6A66B]" />
            <span>Return to News Feed</span>
          </Link>
          <Link
            href="/reviews"
            className="rounded-xl bg-[#101F35] px-5 py-2.5 text-sm font-bold text-[#FCFAF5] hover:bg-[#172B46]"
          >
            Explore Software Reviews
          </Link>
        </div>
      </main>
    </article>
  );
}
