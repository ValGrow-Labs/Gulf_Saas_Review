"use client";

import React, { useState } from "react";
import Link from "next/link";
import GulfSkylinesAnimation from "./GulfSkylinesAnimation";
import { newsArticles, gccCountries } from "@/data/news";
import { GccCountryCode } from "@/types";
import { ArrowRight, Clock, User, Globe2 } from "lucide-react";

export default function HomeNewsSection() {
  const [selectedCountry, setSelectedCountry] = useState<GccCountryCode | "all">("all");

  const filteredArticles = selectedCountry === "all"
    ? newsArticles
    : newsArticles.filter((art) => art.countryCode === selectedCountry);

  const activeCountryInfo = selectedCountry !== "all"
    ? gccCountries.find((c) => c.id === selectedCountry)
    : null;

  return (
    <section className="py-7 sm:py-9 bg-[#FBF4E8] border-b border-[#EAE2D5]">
      <div className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8 xl:px-12 space-y-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 pb-3 border-b border-[#E5DFD3]">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FF6B5B] mb-1">
              <Globe2 className="h-3.5 w-3.5" />
              <span>Pan-GCC Regional Coverage</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-editorial text-[#0A2E36] tracking-tight">
              Technology Across the Gulf
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-[#384D52] max-w-2xl leading-relaxed">
              Explore national digital transformation mandates, venture capital inflows, and enterprise SaaS adoption across all six GCC member nations.
            </p>
          </div>

          <Link
            href="/news"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0A2E36] hover:text-[#FF6B5B] transition-colors shrink-0"
          >
            <span>All Regional Dispatches</span>
            <ArrowRight className="h-4 w-4 text-[#FF6B5B]" />
          </Link>
        </div>

        {/* Interactive Gulf Countries Skylines & Moving Buildings Animation */}
        <GulfSkylinesAnimation
          selectedCountry={selectedCountry}
          onSelectCountry={(country) => setSelectedCountry(country)}
        />

        {/* Filtered Country News Feed Section */}
        <div className="pt-4 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#E5DFD3]">
            <div className="flex items-center gap-2">
              <span className="text-xl">
                {activeCountryInfo ? activeCountryInfo.flagEmoji : "🌐"}
              </span>
              <div>
                <h3 className="text-base sm:text-lg font-bold font-editorial text-[#0A2E36]">
                  {activeCountryInfo ? `${activeCountryInfo.name} Technology Briefings` : "Latest Stories Across All 6 GCC Nations"}
                </h3>
                <span className="text-[11px] text-[#526A70]">
                  Showing {filteredArticles.length} editorial {filteredArticles.length === 1 ? "article" : "articles"}
                </span>
              </div>
            </div>

            {selectedCountry !== "all" && (
              <button
                onClick={() => setSelectedCountry("all")}
                className="text-xs font-bold text-[#FF6B5B] hover:text-[#0A2E36] cursor-pointer"
              >
                Reset to All Countries &rarr;
              </button>
            )}
          </div>

          {/* Articles Grid for Selected Country */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredArticles.slice(0, 6).map((article) => (
              <article
                key={article.id}
                className="group flex flex-col justify-between rounded-xl border border-[#E5DFD3] bg-white p-4.5 transition-all duration-200 hover:border-[#FF6B5B] hover:shadow-sm"
              >
                <div>
                  {/* Category Chip & Country */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#D44435] bg-[#FFF0EE] px-2 py-0.5 rounded">
                      {article.category}
                    </span>
                    <span className="text-[11px] font-semibold text-[#526A70] flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#FF6B5B]" />
                      {article.country}
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className="text-sm sm:text-base font-bold font-editorial text-[#0A2E36] group-hover:text-[#FF6B5B] transition-colors leading-snug line-clamp-2">
                    <Link href={`/news/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h4>

                  {/* Excerpt */}
                  <p className="mt-1 text-xs text-[#384D52] leading-relaxed line-clamp-2">
                    {article.excerpt}
                  </p>
                </div>

                {/* Footer Byline */}
                <div className="mt-3 pt-2.5 border-t border-[#E5DFD3] flex items-center justify-between text-[11px] text-[#526A70]">
                  <div className="flex items-center gap-1 font-medium">
                    <User className="h-3 w-3 text-[#FF6B5B]" />
                    <span>{article.author.name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-[#FF6B5B]" />
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
