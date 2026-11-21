import React from "react";
import Link from "next/link";
import { articles } from "@/data/articles";
import { FileText, Clock, ArrowRight, Layers } from "lucide-react";

export const metadata = {
  title: "Software Selection Guides & Compliance Playbooks | GulfSaasReview",
  description:
    "In-depth research, regulatory compliance breakdowns (ZATCA Phase 2, UAE VAT, WPS), and executive software selection guides for Saudi Arabia, UAE, and GCC business leaders.",
};

export default function ArticlesPage() {
  return (
    <div className="min-h-screen bg-[#FFF8EF] pb-24">
      {/* Header */}
      <div className="bg-[#FFF8EF] border-b-2 border-[#E5DAC8] pt-12 sm:pt-16 pb-14 sm:pb-16">
        <div className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#15803D] mb-3">
              <FileText className="h-4 w-4" />
              <span>Software Selection Guides</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-[#064734] tracking-tight">
              Insights for Smarter Business Software Decisions
            </h1>
            <p className="mt-3 text-base sm:text-lg md:text-xl text-[#163A2E] font-medium leading-relaxed">
              In-depth research, regulatory compliance breakdowns (Saudi ZATCA Phase 2, UAE Corporate Tax, WPS), and practical software evaluation playbooks for the Gulf market.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/reviews"
                className="inline-flex items-center gap-2 rounded-xl bg-[#064734] px-6 py-3 text-sm sm:text-base font-bold text-white hover:bg-[#15803D] transition-colors shadow-xs"
              >
                <Layers className="h-4 w-4 text-[#15803D]" />
                <span>Browse All Software Reviews</span>
              </Link>
              <Link
                href="/compare"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-[#E5DAC8] bg-white px-5 py-3 text-sm sm:text-base font-bold text-[#064734] hover:border-[#064734] transition-colors shadow-2xs"
              >
                <span>Compare Tools</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8 xl:px-12 pt-10 sm:pt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((art) => (
            <article
              key={art.id}
              className="group flex flex-col justify-between rounded-2xl border-2 border-[#E5DAC8] bg-white overflow-hidden shadow-xs hover:border-[#064734] hover:shadow-md transition-all duration-300"
            >
              <div>
                <div className="h-52 w-full bg-[#064734] p-6 flex flex-col justify-between text-white relative overflow-hidden">
                  <span className="inline-block rounded-lg bg-[#15803D]/25 px-3 py-1 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#15803D] border border-[#064734]/40 self-start">
                    {art.category}
                  </span>
                  <p className="font-serif italic text-white text-xl sm:text-2xl font-normal line-clamp-2">
                    &ldquo;{art.title}&rdquo;
                  </p>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs sm:text-sm font-bold text-[#3C6152] mb-3">
                    <span>{art.publishedDate}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5 text-[#15803D]">
                      <Clock className="h-4 w-4" />
                      {art.readTime}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#064734] group-hover:text-[#15803D] transition-colors leading-snug">
                    <Link href={`/articles/${art.slug}`}>{art.title}</Link>
                  </h2>

                  <p className="mt-3 text-sm sm:text-base text-[#163A2E] font-medium leading-relaxed line-clamp-3">
                    {art.excerpt}
                  </p>

                  {art.keyTakeaways && art.keyTakeaways.length > 0 && (
                    <div className="mt-4 pt-3.5 border-t-2 border-[#E5DAC8]/80 space-y-2">
                      {art.keyTakeaways.slice(0, 2).map((takeaway, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#064734] font-semibold">
                          <span className="h-2 w-2 rounded-full bg-[#15803D] mt-1.5 shrink-0" />
                          <span className="line-clamp-1">{takeaway}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="px-6 pb-6 pt-4 flex items-center justify-between border-t-2 border-[#E5DAC8] mt-auto">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-[#064734] text-[#15803D] flex items-center justify-center font-bold text-xs border border-[#064734]/30">
                    {art.author.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <span className="text-sm sm:text-base font-bold text-[#064734]">
                    {art.author.name}
                  </span>
                </div>

                <Link
                  href={`/articles/${art.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm sm:text-base font-bold text-[#064734] group-hover:text-[#15803D] transition-colors"
                >
                  <span>Read Guide</span>
                  <ArrowRight className="h-4 w-4 text-[#15803D]" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
