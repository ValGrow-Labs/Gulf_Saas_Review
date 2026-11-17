import React from "react";
import Link from "next/link";
import { articles } from "@/data/articles";
import { FileText, Clock, ArrowRight, Newspaper } from "lucide-react";

export const metadata = {
  title: "Insights & Guides for Middle East Business Technology | GulfSaasReview",
  description:
    "Editorial analysis, compliance playbooks, and SaaS implementation guides for Saudi Arabia, UAE, and GCC business leaders.",
};

export default function ArticlesPage() {
  return (
    <div className="min-h-screen bg-[#F6F1E7] pb-24">
      {/* Header */}
      <div className="bg-[#FCFAF5] border-b border-[#E7E4DC] pt-12 pb-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 text-[15px] font-bold uppercase tracking-wider text-[#C6A66B] mb-2.5">
              <FileText className="h-4 w-4" />
              <span>Editorial Intelligence</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-editorial text-[#101F35] tracking-tight">
              Insights for Smarter Business Technology
            </h1>
            <p className="mt-3 text-[18px] sm:text-[19px] text-[#475569] leading-relaxed">
              In-depth research, regulatory compliance breakdowns (ZATCA, UAE VAT, WPS), and executive software selection guides for the Gulf market.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <Link
                href="/news"
                className="inline-flex items-center gap-2 rounded-xl bg-[#101F35] px-4 py-2 text-sm font-bold text-[#FCFAF5] hover:bg-[#172B46] transition-colors"
              >
                <Newspaper className="h-4 w-4 text-[#C6A66B]" />
                <span>Switch to Gulf Tech News Feed</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((art) => (
            <article
              key={art.id}
              className="group flex flex-col justify-between rounded-2xl border border-[#E7E4DC] bg-[#FCFAF5] overflow-hidden shadow-xs hover:border-[#C6A66B] hover:shadow-md transition-all duration-300"
            >
              <div>
                <div className="h-48 w-full bg-[#101F35] p-6 flex flex-col justify-between text-white relative overflow-hidden">
                  <span className="inline-block rounded-md bg-[#C6A66B]/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#C6A66B] border border-[#C6A66B]/30 self-start">
                    {art.category}
                  </span>
                  <p className="font-editorial italic text-white text-xl font-normal line-clamp-2">
                    &ldquo;{art.title}&rdquo;
                  </p>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 text-sm text-[#697386] mb-3">
                    <span>{art.publishedDate}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-[#C6A66B]" />
                      {art.readTime}
                    </span>
                  </div>

                  <h2 className="text-lg sm:text-xl font-bold font-editorial text-[#101F35] group-hover:text-[#C6A66B] transition-colors leading-snug">
                    <Link href={`/news/${art.slug}`}>{art.title}</Link>
                  </h2>

                  <p className="mt-3 text-[17px] sm:text-[18px] text-[#475569] leading-relaxed line-clamp-3">
                    {art.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-4 flex items-center justify-between border-t border-[#E7E4DC] mt-auto">
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-full bg-[#101F35] text-[#C6A66B] flex items-center justify-center font-bold text-xs border border-[#C6A66B]/30">
                    {art.author.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <span className="text-[15px] font-semibold text-[#101F35]">
                    {art.author.name}
                  </span>
                </div>

                <Link
                  href={`/news/${art.slug}`}
                  className="inline-flex items-center gap-1.5 text-[15px] font-bold text-[#101F35] group-hover:text-[#C6A66B] transition-colors"
                >
                  <span>Read Briefing</span>
                  <ArrowRight className="h-4 w-4 text-[#C6A66B]" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
