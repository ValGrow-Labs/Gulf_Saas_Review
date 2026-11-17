"use client";

import React, { useState } from "react";
import Link from "next/link";
import GccMap from "./GccMap";
import { newsArticles, gccCountries } from "@/data/news";
import { GccCountryCode } from "@/types";
import { ArrowRight, Clock, User, Sparkles, Building2, Globe2 } from "lucide-react";

export default function HomeNewsSection() {
  const [selectedCountry, setSelectedCountry] = useState<GccCountryCode | "all">("all");

  const filteredArticles = selectedCountry === "all"
    ? newsArticles
    : newsArticles.filter((art) => art.countryCode === selectedCountry);

  const activeCountryInfo = selectedCountry !== "all"
    ? gccCountries.find((c) => c.id === selectedCountry)
    : null;

  return (
    <section className="py-16 sm:py-24 bg-[#F6F1E7] border-b border-[#E7E4DC]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[14px] font-bold uppercase tracking-wider text-[#C6A66B] mb-2">
              <Globe2 className="h-4 w-4" />
              <span>Pan-GCC Regional Coverage</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-editorial text-[#101F35] tracking-tight">
              Technology Across the Gulf
            </h2>
            <p className="mt-3 text-[18px] sm:text-[19px] text-[#334155] max-w-2xl leading-relaxed">
              Explore national digital transformation mandates, venture capital inflows, and enterprise SaaS adoption across all six GCC member nations.
            </p>
          </div>

          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-[16px] font-bold text-[#101F35] hover:text-[#C6A66B] transition-colors shrink-0"
          >
            <span>All Regional Dispatches</span>
            <ArrowRight className="h-4 w-4 text-[#C6A66B]" />
          </Link>
        </div>

        {/* Section 4: Interactive GCC Geographical Animated Map */}
        <GccMap
          selectedCountry={selectedCountry}
          onSelectCountry={(country) => setSelectedCountry(country)}
        />

        {/* Filtered Country News Feed Section */}
        <div className="pt-6 space-y-8">
          <div className="flex items-center justify-between pb-3 border-b border-[#E7E4DC]">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">
                {activeCountryInfo ? activeCountryInfo.flagEmoji : "🌐"}
              </span>
              <div>
                <h3 className="text-2xl font-bold font-editorial text-[#101F35]">
                  {activeCountryInfo ? `${activeCountryInfo.name} Technology Briefings` : "Latest Stories Across All 6 GCC Nations"}
                </h3>
                <span className="text-xs text-[#697386]">
                  Showing {filteredArticles.length} editorial {filteredArticles.length === 1 ? "article" : "articles"}
                </span>
              </div>
            </div>

            {selectedCountry !== "all" && (
              <button
                onClick={() => setSelectedCountry("all")}
                className="text-xs font-bold text-[#C6A66B] hover:text-[#101F35] cursor-pointer"
              >
                Reset to All Countries &rarr;
              </button>
            )}
          </div>

          {/* Articles Grid for Selected Country */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredArticles.slice(0, 6).map((article) => (
              <article
                key={article.id}
                className="group flex flex-col justify-between rounded-2xl border border-[#E7E4DC] bg-[#FCFAF5] p-6 transition-all duration-300 hover:border-[#C6A66B] hover:shadow-md"
              >
                <div>
                  {/* Category Chip & Country */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#8C6D33] bg-[#C6A66B]/15 px-2.5 py-1 rounded-md">
                      {article.category}
                    </span>
                    <span className="text-xs font-semibold text-[#697386] flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#C6A66B]" />
                      {article.country}
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className="text-xl font-bold font-editorial text-[#101F35] group-hover:text-[#8C6D33] transition-colors leading-snug line-clamp-2">
                    <Link href={`/news/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h4>

                  {/* Excerpt */}
                  <p className="mt-3 text-[15.5px] text-[#475569] leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>

                {/* Footer Byline */}
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
      </div>
    </section>
  );
}
