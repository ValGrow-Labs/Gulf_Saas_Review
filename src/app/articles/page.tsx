import React from "react";
import Link from "next/link";
import { articles } from "@/data/articles";
import { FileText, Clock, ArrowRight, Sparkles } from "lucide-react";

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
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C6A66B] mb-2">
              <FileText className="h-3.5 w-3.5" />
              <span>Editorial Intelligence</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-editorial text-[#101F35] tracking-tight">
              Insights for Smarter Business Technology
            </h1>
            <p className="mt-3 text-sm sm:text-base text-[#697386] leading-relaxed">
              In-depth research, regulatory compliance breakdowns (ZATCA, UAE VAT, WPS), and executive software selection guides for the Gulf market.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((art) => (
            <article
              key={art.id}
              className="group flex flex-col justify-between rounded-2xl border border-[#E7E4DC] bg-[#FCFAF5] overflow-hidden shadow-xs hover:border-[#C6A66B] hover:shadow-md transition-all"
            >
              <div>
                <div className="h-48 w-full bg-[#101F35] p-6 flex flex-col justify-between text-white relative overflow-hidden">
                  <span className="inline-block rounded-md bg-[#C6A66B]/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#DFCA9B] border border-[#C6A66B]/30 self-start">
                    {art.category}
                  </span>
                  <p className="font-editorial italic text-white text-lg font-normal line-clamp-2">
                    &ldquo;{art.title}&rdquo;
                  </p>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-[#697386] mb-3">
                    <span>{art.publishedDate}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {art.readTime}
                    </span>
                  </div>

                  <h2 className="text-base font-bold text-[#101F35] group-hover:text-[#C6A66B] transition-colors leading-snug">
                    <Link href={`/articles/${art.slug}`}>{art.title}</Link>
                  </h2>

                  <p className="mt-2.5 text-xs text-[#697386] leading-relaxed line-clamp-3">
                    {art.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-[#E7E4DC]/60 mt-auto">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-full bg-[#101F35] text-[#C6A66B] flex items-center justify-center font-bold text-[10px]">
                    {art.author.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <span className="text-xs font-medium text-[#101F35]">
                    {art.author.name}
                  </span>
                </div>

                <Link
                  href={`/articles/${art.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#101F35] group-hover:text-[#C6A66B]"
                >
                  <span>Read Guide</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

