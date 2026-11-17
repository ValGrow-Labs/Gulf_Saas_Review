"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { newsArticles, gccCountries } from "@/data/news";
import { NewsArticle, GccCountryCode } from "@/types";
import { Search, Filter, Clock, User, ArrowRight, Globe2, Sparkles, Building2, Flame } from "lucide-react";

export default function NewsClient() {
  const searchParams = useSearchParams();
  const initialCountry = searchParams.get("country") || "all";
  const initialCategory = searchParams.get("category") || "all";

  const [selectedCountry, setSelectedCountry] = useState<string>(initialCountry);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { label: "All Categories", value: "all" },
    { label: "AI & Innovation", value: "ai-innovation" },
    { label: "SaaS & Cloud", value: "saas-cloud" },
    { label: "FinTech", value: "fintech" },
    { label: "Vision & Strategy", value: "vision-strategy" },
    { label: "Digital Transformation", value: "digital-transformation" },
    { label: "Cybersecurity", value: "cybersecurity" },
  ];

  const filteredArticles = useMemo(() => {
    return newsArticles.filter((article) => {
      // Country filter
      if (selectedCountry !== "all") {
        if (selectedCountry === "saudi-arabia" && article.countryCode !== "saudi-arabia") return false;
        if (selectedCountry === "uae" && article.countryCode !== "uae") return false;
        if (selectedCountry === "qatar" && article.countryCode !== "qatar") return false;
        if (selectedCountry === "kuwait" && article.countryCode !== "kuwait") return false;
        if (selectedCountry === "bahrain" && article.countryCode !== "bahrain") return false;
        if (selectedCountry === "oman" && article.countryCode !== "oman") return false;
        if (selectedCountry === "gcc" && article.countryCode !== "gcc") return false;
      }

      // Category filter
      if (selectedCategory !== "all" && article.categorySlug !== selectedCategory) {
        return false;
      }

      // Query search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = article.title.toLowerCase().includes(query);
        const matchesExcerpt = article.excerpt.toLowerCase().includes(query);
        const matchesTags = article.tags.some((t) => t.toLowerCase().includes(query));
        return matchesTitle || matchesExcerpt || matchesTags;
      }

      return true;
    });
  }, [selectedCountry, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#F6F1E7] pb-24">
      {/* Header Banner */}
      <div className="bg-[#FCFAF5] border-b border-[#E7E4DC] pt-12 pb-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C6A66B] mb-2.5">
              <Globe2 className="h-4 w-4" />
              <span>Middle East Technology Journal</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-editorial text-[#101F35] tracking-tight">
              Gulf Technology &amp; SaaS News
            </h1>
            <p className="mt-3 text-[18px] sm:text-[19px] text-[#334155] leading-relaxed">
              Comprehensive coverage of artificial intelligence, sovereign cloud data centers, software compliance, and B2B SaaS across Saudi Arabia, UAE, and the wider GCC.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="mt-8 pt-6 border-t border-[#E7E4DC] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#697386]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search headlines, keywords, or topics..."
                className="w-full rounded-xl border border-[#E7E4DC] bg-white pl-10 pr-4 py-2.5 text-sm font-medium text-[#101F35] placeholder-[#697386] focus:border-[#C6A66B] focus:outline-none"
              />
            </div>

            {/* Country Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              <button
                onClick={() => setSelectedCountry("all")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap cursor-pointer transition-colors ${
                  selectedCountry === "all"
                    ? "bg-[#101F35] text-[#FCFAF5]"
                    : "bg-white text-[#475569] border border-[#E7E4DC] hover:border-[#C6A66B]"
                }`}
              >
                All GCC
              </button>
              {gccCountries.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCountry(c.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap cursor-pointer transition-colors flex items-center gap-1.5 ${
                    selectedCountry === c.id
                      ? "bg-[#101F35] text-[#FCFAF5]"
                      : "bg-white text-[#475569] border border-[#E7E4DC] hover:border-[#C6A66B]"
                  }`}
                >
                  <span>{c.flagEmoji}</span>
                  <span>{c.shortName}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                  selectedCategory === cat.value
                    ? "bg-[#C6A66B] text-[#101F35] font-bold"
                    : "bg-transparent text-[#697386] hover:text-[#101F35]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10">
        <div className="flex items-center justify-between pb-4 border-b border-[#E7E4DC] mb-8">
          <span className="text-sm font-bold text-[#101F35]">
            Showing {filteredArticles.length} {filteredArticles.length === 1 ? "Story" : "Stories"}
          </span>
          {(selectedCountry !== "all" || selectedCategory !== "all" || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCountry("all");
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              className="text-xs font-bold text-[#8C6D33] hover:underline cursor-pointer"
            >
              Reset all filters
            </button>
          )}
        </div>

        {filteredArticles.length === 0 ? (
          <div className="rounded-2xl border border-[#E7E4DC] bg-white p-12 text-center max-w-lg mx-auto">
            <h3 className="text-xl font-bold font-editorial text-[#101F35] mb-2">No matching dispatches found</h3>
            <p className="text-sm text-[#475569] mb-4">
              We couldn&apos;t find any stories matching your current filter criteria.
            </p>
            <button
              onClick={() => {
                setSelectedCountry("all");
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              className="px-4 py-2 rounded-xl bg-[#101F35] text-xs font-bold text-white cursor-pointer"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                className="group flex flex-col justify-between rounded-2xl border border-[#E7E4DC] bg-white p-6 transition-all duration-300 hover:border-[#C6A66B] hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#8C6D33] bg-[#C6A66B]/15 px-2.5 py-1 rounded-md">
                      {article.category}
                    </span>
                    <span className="text-xs font-semibold text-[#697386] flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#C6A66B]" />
                      {article.country}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold font-editorial text-[#101F35] group-hover:text-[#8C6D33] transition-colors leading-snug line-clamp-2">
                    <Link href={`/news/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h2>

                  <p className="mt-3 text-[15px] text-[#475569] leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>

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
        )}
      </div>
    </div>
  );
}
