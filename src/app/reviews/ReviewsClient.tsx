"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { softwares } from "@/data/software";
import { categories } from "@/data/categories";
import type { Country } from "@/types";
import SoftwareCard from "@/components/SoftwareCard";
import Monogram from "@/components/Monogram";
import ScoreDial from "@/components/ScoreDial";
import Sadu from "@/components/Sadu";
import { arabicLabel, billingSuffix, marketsLabel, pad2 } from "@/lib/format";

const C = { teal: "#0E4B48", paper: "#FFFCF6", sand: "#F1D39C" };

type SortKey = "score" | "rating" | "reviews" | "name";
type ViewMode = "grid" | "table";

const countryOptions: { value: Country; label: string }[] = [
  { value: "Saudi Arabia", label: "Saudi Arabia" },
  { value: "UAE", label: "UAE" },
  { value: "GCC", label: "Wider GCC" },
];

const pricingOptions = [
  { value: "all", label: "Any pricing" },
  { value: "free", label: "Free tier available" },
  { value: "subscription", label: "Subscription" },
  { value: "quote", label: "Enterprise quote" },
];

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "score", label: "Our score" },
  { value: "rating", label: "User rating" },
  { value: "reviews", label: "Most reviewed" },
  { value: "name", label: "Name, A–Z" },
];

const hasArabic = (level: string) =>
  level === "Native UI & RTL" || level === "Partial (Portal / Forms)";

/**
 * The URL query (?q, ?category, ?country, ?arabic) seeds the filters. Keying
 * the directory on the query string resets local state whenever the URL
 * changes — e.g. a new search from the navbar while already on /reviews.
 */
export default function ReviewsClient() {
  const searchParams = useSearchParams();
  return (
    <ReviewsDirectory
      key={searchParams.toString()}
      initialQuery={searchParams.get("q") || ""}
      initialCategory={searchParams.get("category") || "all"}
      initialCountry={searchParams.get("country") || "all"}
      initialArabic={searchParams.get("arabic") === "true"}
    />
  );
}

function ReviewsDirectory({
  initialQuery,
  initialCategory,
  initialCountry,
  initialArabic,
}: {
  initialQuery: string;
  initialCategory: string;
  initialCountry: string;
  initialArabic: boolean;
}) {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedCountry, setSelectedCountry] = useState(initialCountry);
  const [arabicOnly, setArabicOnly] = useState(initialArabic);
  const [selectedPricing, setSelectedPricing] = useState("all");
  const [sortBy, setSortBy] = useState<SortKey>("score");

  const filteredSoftwares = useMemo(() => {
    return softwares
      .filter((item) => {
        if (searchQuery.trim()) {
          const q = searchQuery.trim().toLowerCase();
          const hit =
            item.name.toLowerCase().includes(q) ||
            item.tagline.toLowerCase().includes(q) ||
            item.description.toLowerCase().includes(q) ||
            item.categoryName.toLowerCase().includes(q) ||
            item.localCompliance.some((c) => c.toLowerCase().includes(q));
          if (!hit) return false;
        }

        if (selectedCategory !== "all" && item.category !== selectedCategory) return false;

        if (selectedCountry !== "all" && !item.countrySuitability.includes(selectedCountry as Country)) {
          return false;
        }

        if (arabicOnly && !hasArabic(item.arabicSupport)) return false;

        if (selectedPricing !== "all") {
          if (selectedPricing === "free" && item.pricing.model !== "Free Tier") {
            if (!item.pricing.tiers.some((t) => t.price === "$0")) return false;
          } else if (
            selectedPricing === "subscription" &&
            item.pricing.model !== "Monthly Subscription" &&
            item.pricing.model !== "Tiered Plan"
          ) {
            return false;
          } else if (selectedPricing === "quote" && item.pricing.model !== "Enterprise Quote") {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "score") return b.verdict.score - a.verdict.score;
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "reviews") return b.reviewCount - a.reviewCount;
        if (sortBy === "name") return a.name.localeCompare(b.name);
        return 0;
      });
  }, [searchQuery, selectedCategory, selectedCountry, arabicOnly, selectedPricing, sortBy]);

  const hasActiveFilters =
    searchQuery !== "" ||
    selectedCategory !== "all" ||
    selectedCountry !== "all" ||
    arabicOnly ||
    selectedPricing !== "all";

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedCountry("all");
    setArabicOnly(false);
    setSelectedPricing("all");
    setSortBy("score");
  };

  const categoryName = categories.find((c) => c.slug === selectedCategory)?.name;
  const countryName = countryOptions.find((c) => c.value === selectedCountry)?.label;
  const nativeArabicCount = softwares.filter((s) => s.arabicSupport === "Native UI & RTL").length;

  const summaryBits = [
    categoryName && `in ${categoryName}`,
    countryName && `for ${countryName}`,
    arabicOnly && "with Arabic support",
    searchQuery.trim() && `matching “${searchQuery.trim()}”`,
  ].filter(Boolean);

  return (
    <>
      {/* ------------------------------------------------------------ HEADER — teal band with filters */}
      <section aria-labelledby="reviews-title" className="bg-teal text-teal-soft">
        <div className="wrap pt-12 pb-12 lg:pt-16 lg:pb-16">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
            <div className="rise lg:col-span-8">
              <span className="tag !bg-sand !text-ink">Review index</span>
              <h1 id="reviews-title" className="display mt-5 text-[clamp(2.5rem,1.4rem+4vw,4.6rem)] text-paper">
                Every review, filtered by the rules that matter here.
              </h1>
              <p className="mt-5 max-w-[56ch] text-[1.075rem] leading-relaxed">
                Narrow the list by market, Arabic support and pricing model, or search for a requirement such as ZATCA, WPS or VAT.
              </p>
            </div>

            <dl className="rise grid grid-cols-3 gap-2 [animation-delay:120ms] lg:col-span-4">
              {[
                { k: "Products", v: softwares.length },
                { k: "Categories", v: categories.length },
                { k: "Native Arabic", v: nativeArabicCount },
              ].map((f) => (
                <div key={f.k} className="flex flex-col-reverse justify-end rounded-[20px] bg-teal-deep px-4 py-4">
                  <dt className="mt-2 text-[0.78rem] leading-tight text-teal-soft/80">{f.k}</dt>
                  <dd className="display text-[2.3rem] leading-none text-sand">{f.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Filter panel */}
          <div role="search" aria-label="Filter reviews" className="mt-10 rounded-[28px] bg-paper p-4 text-ink sm:p-6 lg:mt-12">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <label htmlFor="review-search" className="eyebrow block">
                  Search
                </label>
                <div className="relative mt-2">
                  <span aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-3">
                    <svg viewBox="0 0 20 20" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <circle cx="8.5" cy="8.5" r="5.5" />
                      <path d="M13 13l4 4" strokeLinecap="round" />
                    </svg>
                  </span>
                  <input
                    id="review-search"
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Product, category or requirement — e.g. Odoo, payroll, ZATCA"
                    className="field !min-h-[52px] !rounded-full !pl-11 pr-12"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      aria-label="Clear search"
                      className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-paper-2 text-lg text-ink-2 transition-colors hover:bg-terracotta-soft hover:text-terracotta"
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>
              <div className="lg:col-span-4">
                <label htmlFor="sort-by" className="eyebrow block">
                  Sort by
                </label>
                <select
                  id="sort-by"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortKey)}
                  className="field mt-2 !min-h-[52px] cursor-pointer !rounded-full"
                >
                  {sortOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-4">
                <label htmlFor="filter-category" className="eyebrow block">
                  Category
                </label>
                <select
                  id="filter-category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="field mt-2 cursor-pointer !rounded-full"
                >
                  <option value="all">All categories</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.slug}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="lg:col-span-3">
                <label htmlFor="filter-country" className="eyebrow block">
                  Market
                </label>
                <select
                  id="filter-country"
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="field mt-2 cursor-pointer !rounded-full"
                >
                  <option value="all">All markets</option>
                  {countryOptions.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="lg:col-span-3">
                <label htmlFor="filter-pricing" className="eyebrow block">
                  Pricing
                </label>
                <select
                  id="filter-pricing"
                  value={selectedPricing}
                  onChange={(e) => setSelectedPricing(e.target.value)}
                  className="field mt-2 cursor-pointer !rounded-full"
                >
                  {pricingOptions.map((p) => (
                    <option key={p.value} value={p.value}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="lg:col-span-2">
                <button
                  type="button"
                  onClick={() => setArabicOnly((v) => !v)}
                  aria-pressed={arabicOnly}
                  className={`flex min-h-[48px] w-full items-center justify-center gap-2.5 rounded-full border-[1.5px] px-4 text-[0.9rem] font-semibold transition-colors ${
                    arabicOnly
                      ? "border-terracotta bg-terracotta text-white"
                      : "border-rule bg-surface text-ink-2 hover:border-ink-3 hover:text-ink"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition-colors ${
                      arabicOnly ? "bg-white text-terracotta" : "border-[1.5px] border-ink-3"
                    }`}
                  >
                    {arabicOnly && (
                      <svg viewBox="0 0 12 12" className="h-3 w-3">
                        <path d="M2.5 6.2 L5 8.5 L9.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
                      </svg>
                    )}
                  </span>
                  Arabic support
                </button>
              </div>
            </div>
          </div>

          {/* Quick category picks */}
          <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="mr-1 shrink-0 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-sand">
              Quick picks
            </span>
            {[{ id: "all", slug: "all", name: "All" }, ...categories.slice(0, 6)].map((cat) => {
              const active = selectedCategory === cat.slug;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.slug)}
                  aria-pressed={active}
                  className={`inline-flex min-h-[36px] shrink-0 items-center rounded-full border-[1.5px] px-4 text-[0.86rem] font-semibold transition-colors ${
                    active
                      ? "border-sand bg-sand text-ink"
                      : "border-teal-soft/30 text-teal-soft hover:border-sand hover:text-paper"
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>
      <Sadu from={C.teal} to={C.paper} accent={C.sand} />

      {/* ------------------------------------------------------------ RESULTS */}
      <section aria-labelledby="results-title">
        <div className="wrap pt-10 pb-20 lg:pt-14 lg:pb-28">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0" aria-live="polite">
              <h2 id="results-title" className="h-card text-[1.35rem] text-ink sm:text-[1.55rem]">
                <span className="text-terracotta">{filteredSoftwares.length}</span>{" "}
                {filteredSoftwares.length === 1 ? "product" : "products"}
                {summaryBits.length > 0 && <span className="text-ink-2"> {summaryBits.join(" ")}</span>}
              </h2>
              {hasActiveFilters && (
                <button type="button" onClick={handleResetFilters} className="link mt-1 text-[0.88rem] text-ink-3">
                  Clear all filters
                </button>
              )}
            </div>

            <div role="group" aria-label="View" className="inline-flex shrink-0 self-start rounded-full bg-paper-2 p-1 sm:self-auto">
              {(
                [
                  { v: "grid", label: "Cards" },
                  { v: "table", label: "Table" },
                ] as const
              ).map((o) => (
                <button
                  key={o.v}
                  type="button"
                  onClick={() => setViewMode(o.v)}
                  aria-pressed={viewMode === o.v}
                  className={`min-h-[36px] rounded-full px-4 text-[0.86rem] font-semibold transition-colors ${
                    viewMode === o.v ? "bg-ink text-paper" : "text-ink-2 hover:text-ink"
                  }`}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>

          {filteredSoftwares.length === 0 ? (
            <div className="mt-8 grid grid-cols-1 items-center gap-8 rounded-[28px] bg-sand-soft p-8 sm:p-12 md:grid-cols-[auto_1fr]">
              <span aria-hidden="true" className="flex h-24 w-24 items-center justify-center rounded-full bg-sand">
                <span className="display text-[2.6rem] leading-none text-terracotta">0</span>
              </span>
              <div>
                <h3 className="h-section max-w-[22ch]">Nothing matches those filters.</h3>
                <p className="mt-3 max-w-[52ch] text-ink-2">
                  Try a shorter search term, or widen the market and category filters. Not every product supports every GCC market.
                </p>
                <button type="button" onClick={handleResetFilters} className="btn btn-accent mt-6">
                  Clear filters
                </button>
              </div>
            </div>
          ) : viewMode === "grid" ? (
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredSoftwares.map((software) => (
                <SoftwareCard key={software.id} software={software} />
              ))}
            </div>
          ) : (
            <div className="mt-8 overflow-x-auto rounded-[24px] border-[1.5px] border-rule bg-surface">
              <table className="w-full min-w-[920px] text-left text-[0.9rem]">
                <thead className="bg-sand-soft">
                  <tr>
                    {["#", "Product", "Markets", "Local compliance", "Arabic", "From", "Users", "Score"].map((h, i) => (
                      <th
                        key={h}
                        scope="col"
                        className={`kicker !text-[0.66rem] !text-[#7A5418] px-4 py-3.5 ${i === 0 ? "w-14 !pl-6" : ""} ${
                          i === 7 ? "!pr-6 text-right" : ""
                        }`}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredSoftwares.map((sw, i) => (
                    <tr
                      key={sw.id}
                      className="group border-t-[1.5px] border-dashed border-rule transition-colors first:border-t-0 hover:bg-paper-2"
                    >
                      <td className="num py-4 pl-6 pr-4 text-[0.8rem] text-ink-3">{pad2(i + 1)}</td>
                      <td className="px-4 py-4">
                        <Link href={`/reviews/${sw.slug}`} className="flex items-center gap-3">
                          <Monogram name={sw.name} color={sw.accentColor} size="sm" />
                          <span>
                            <span className="block font-semibold text-ink transition-colors group-hover:text-terracotta">
                              {sw.name}
                            </span>
                            <span className="block text-[0.78rem] text-ink-3">{sw.categoryName}</span>
                          </span>
                        </Link>
                      </td>
                      <td className="whitespace-nowrap px-4 py-4">
                        <span className="tag tag-teal">{marketsLabel(sw)}</span>
                      </td>
                      <td className="px-4 py-4 text-ink-2">
                        <span className="line-clamp-1 max-w-[28ch]" title={sw.localCompliance.join(" · ")}>
                          {sw.localCompliance[0]}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-4 py-4">
                        <span className={`tag ${sw.arabicSupport.startsWith("Native") ? "tag-sand" : ""}`}>
                          {arabicLabel(sw.arabicSupport)}
                        </span>
                      </td>
                      <td className="num whitespace-nowrap px-4 py-4 text-[0.88rem] font-semibold">
                        {sw.pricing.startingPrice}
                        <span className="font-normal text-ink-3">{billingSuffix(sw)}</span>
                      </td>
                      <td className="num whitespace-nowrap px-4 py-4 text-[0.8rem] text-ink-2">
                        {sw.rating.toFixed(1)} / 5 <span className="text-ink-3">· {sw.reviewCount}</span>
                      </td>
                      <td className="py-3 pl-4 pr-6 text-right">
                        <ScoreDial score={sw.verdict.score} size={46} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <p className="mt-8 text-[0.85rem] text-ink-3">
            Scores are out of 10 and reflect our tests against Gulf requirements. User ratings are out of 5.{" "}
            <Link href="/about#methodology" className="link">
              How we score
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
