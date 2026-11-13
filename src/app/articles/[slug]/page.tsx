import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, articleLookup } from "@/data/articles";
import {
  FileText,
  Clock,
  ArrowLeft,
  Calendar,
  Share2,
  Building2,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

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
  if (!article) return { title: "Article Not Found" };

  return {
    title: `${article.title} | GulfSaasReview Insights`,
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

  return (
    <div className="min-h-screen bg-[#F6F1E7] pb-24">
      {/* Header */}
      <div className="bg-[#FCFAF5] border-b border-[#E7E4DC] pt-10 pb-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/articles"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#697386] hover:text-[#101F35] mb-6"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>All Articles & Guides</span>
          </Link>

          <div>
            <span className="inline-block rounded-md bg-[#C6A66B]/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#8C6D33] mb-4">
              {article.category}
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-editorial text-[#101F35] tracking-tight leading-tight">
              {article.title}
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-[#697386] pt-4 border-t border-[#E7E4DC]">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-[#101F35] text-[#C6A66B] flex items-center justify-center font-bold text-xs">
                  {article.author.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <div className="font-bold text-[#101F35]">
                    {article.author.name}
                  </div>
                  <div className="text-[10px] text-[#697386]">
                    {article.author.role}
                  </div>
                </div>
              </div>

              <span>•</span>
              <span>{article.publishedDate}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {article.readTime}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Article Body */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-10">
        <div className="rounded-2xl border border-[#E7E4DC] bg-[#FCFAF5] p-6 sm:p-10 shadow-xs">
          {/* Lead Paragraph */}
          <p className="text-base sm:text-lg text-[#101F35] font-serif italic border-l-4 border-[#C6A66B] pl-4 mb-8 leading-relaxed">
            {article.excerpt}
          </p>

          {/* Body Content */}
          <div className="space-y-6 text-sm sm:text-base text-[#101F35] leading-relaxed">
            {article.content?.map((paragraph, idx) => (
              <p key={idx} className="text-[#101F35] leading-relaxed">
                {paragraph}
              </p>
            ))}

            <div className="my-8 rounded-xl bg-[#F6F1E7] border border-[#E7E4DC] p-6">
              <h4 className="font-bold text-sm text-[#101F35] mb-2">
                Executive Takeaway for Gulf Leadership
              </h4>
              <p className="text-xs text-[#697386] leading-relaxed">
                When procuring software in Saudi Arabia or the UAE, ensure vendor contracts stipulate adherence to regional regulatory milestones (such as Phase 2 ZATCA updates or MOHRE WPS changes) without punitive add-on consulting fees.
              </p>
            </div>
          </div>

          {/* Related Links CTA */}
          <div className="mt-12 pt-8 border-t border-[#E7E4DC] flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href="/reviews"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#101F35] hover:text-[#C6A66B]"
            >
              <span>Explore software matching these criteria</span>
              <ArrowRight className="h-3.5 w-3.5 text-[#C6A66B]" />
            </Link>

            <Link
              href="/compare"
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#101F35] px-4 py-2 text-xs font-semibold text-white hover:bg-[#172B46]"
            >
              <span>Compare Solutions</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

