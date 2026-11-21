"use client";

import React, { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { softwares } from "@/data/software";
import { categories } from "@/data/categories";
import SoftwareCard from "@/components/SoftwareCard";
import {
  Search,
  SlidersHorizontal,
  X,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Check,
  LayoutGrid,
  Table,
  Star,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

export default function ReviewsClient() {
  const searchParams = useSearchParams();

  // Initial params
  const initialCategory = searchParams.get("category") || "all";
  const initialCountry = searchParams.get("country") || "all";
  const initialArabic = searchParams.get("arabic") === "true";
  const initialQuery = searchParams.get("q") || "";

  // View Mode: Grid or Single-Line Broadsheet Table
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  // Filter States
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedCountry, setSelectedCountry] = useState(initialCountry);
  const [arabicOnly, setArabicOnly] = useState(initialArabic);
  const [selectedPricing, setSelectedPricing] = useState("all");
  const [sortBy, setSortBy] = useState<"rating" | "reviews" | "name">("rating");

  // Filtering Logic
  const filteredSoftwares = useMemo(() => {
    return softwares
      .filter((item) => {
        // Text Search
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = item.name.toLowerCase().includes(q);
          const matchTagline = item.tagline.toLowerCase().includes(q);
          const matchDesc = item.description.toLowerCase().includes(q);
          const matchCategory = item.categoryName.toLowerCase().includes(q);
          const matchCompliance = item.localCompliance.some((c) =>
            c.toLowerCase().includes(q)
          );
          if (!matchName && !matchTagline && !matchDesc && !matchCategory && !matchCompliance) {
            return false;
          }
        }

        // Category Filter
        if (selectedCategory !== "all" && item.category !== selectedCategory) {
          return false;
        }

        // Country Suitability Filter
        if (selectedCountry !== "all") {
          if (!item.countrySuitability.includes(selectedCountry as any)) {
            return false;
          }
        }

        // Arabic Language Support Filter
        if (arabicOnly) {
          if (
            item.arabicSupport !== "Native UI & RTL" &&
            item.arabicSupport !== "Partial (Portal / Forms)"
          ) {
            return false;
          }
        }

        // Pricing Model Filter
        if (selectedPricing !== "all") {
          if (selectedPricing === "free" && item.pricing.model !== "Free Tier") {
            const hasFreeTier = item.pricing.tiers.some((t) => t.price === "$0");
            if (!hasFreeTier) return false;
          } else if (
            selectedPricing === "subscription" &&
            item.pricing.model !== "Monthly Subscription" &&
            item.pricing.model !== "Tiered Plan"
          ) {
            return false;
          } else if (
            selectedPricing === "quote" &&
            item.pricing.model !== "Enterprise Quote"
          ) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "reviews") return b.reviewCount - a.reviewCount;
        if (sortBy === "name") return a.name.localeCompare(b.name);
        return 0;
      });
  }, [
    searchQuery,
    selectedCategory,
    selectedCountry,
    arabicOnly,
    selectedPricing,
    sortBy,
  ]);

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
    setSortBy("rating");
  };

  return (
    <div className="min-h-screen bg-[#FFF8EF] pb-24">
      {/* Page Header */}
      <div className="bg-[#FFF8EF] border-b-2 border-[#E5DAC8] pt-12 sm:pt-14 pb-12 sm:pb-14">
        <div className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#15803D] mb-3">
              <Sparkles className="h-4 w-4" />
              <span>Independent Directory</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-[#064734] tracking-tight">
              Software Reviews Directory
            </h1>
            <p className="mt-3 text-base sm:text-lg text-[#163A2E] font-medium leading-relaxed">
              Explore independent evaluations of enterprise and small business software tailored for businesses in Saudi Arabia, the UAE, and the GCC. Filter by regulatory readiness, Arabic UI, and pricing models.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8 xl:px-12 pt-8 sm:pt-10">
        {/* Search & Quick Controls Bar */}
        <div className="rounded-2xl border-2 border-[#E5DAC8] bg-white p-5 sm:p-7 shadow-xs mb-8">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 sm:gap-5">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#15803D]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search software (e.g. Odoo, Zoho, ZATCA Phase 2, WhatsApp, WPS, Payroll)..."
                className="w-full rounded-xl border-2 border-[#E5DAC8] bg-[#FFF8EF] pl-12 pr-10 py-3.5 text-base sm:text-lg text-[#064734] placeholder-[#8BA4A9] focus:border-[#064734] focus:outline-none focus:ring-1 focus:ring-[#064734] shadow-2xs font-semibold"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-[#3C6152] hover:text-[#064734] cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* Quick Sort Dropdown */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <label htmlFor="sort-by" className="text-sm sm:text-base font-bold text-[#064734] shrink-0">
                Sort By:
              </label>
              <select
                id="sort-by"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full sm:w-auto rounded-xl border-2 border-[#E5DAC8] bg-[#FFF8EF] px-4 py-3 text-sm sm:text-base font-bold text-[#064734] focus:border-[#064734] focus:outline-none shadow-2xs cursor-pointer min-h-[48px]"
              >
                <option value="rating">Highest Rated</option>
                <option value="reviews">Most Reviewed</option>
                <option value="name">Alphabetical (A-Z)</option>
              </select>
            </div>
          </div>

          {/* Filter Pills: Category, Pricing, Country Scope */}
          <div className="mt-5 pt-4 border-t-2 border-[#E5DAC8]/80 flex flex-wrap items-center gap-3 text-sm sm:text-base">
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#064734]">
                Country:
              </span>
              <span className="rounded-xl px-4 py-2 font-bold bg-[#064734] text-white text-xs sm:text-sm shadow-xs min-h-[40px] inline-flex items-center">
                All GCC
              </span>
            </div>

            <div className="h-6 w-[2px] bg-[#E5DAC8] mx-1 hidden sm:block" />

            {/* Category Dropdown Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full sm:w-auto rounded-xl border-2 border-[#E5DAC8] bg-[#FFF8EF] px-4 py-2.5 text-xs sm:text-sm font-bold text-[#064734] focus:border-[#064734] focus:outline-none min-h-[44px] cursor-pointer"
            >
              <option value="all">All Categories ({categories.length})</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>

            {/* Pricing Filter */}
            <select
              value={selectedPricing}
              onChange={(e) => setSelectedPricing(e.target.value)}
              className="w-full sm:w-auto rounded-xl border-2 border-[#E5DAC8] bg-[#FFF8EF] px-4 py-2.5 text-xs sm:text-sm font-bold text-[#064734] focus:border-[#064734] focus:outline-none min-h-[44px] cursor-pointer"
            >
              <option value="all">All Pricing Models</option>
              <option value="free">Free Tier Available</option>
              <option value="subscription">Subscription / User</option>
              <option value="quote">Enterprise Quote</option>
            </select>

            {/* Reset Filters Button */}
            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="ml-auto inline-flex items-center gap-2 text-sm sm:text-base font-bold text-[#15803D] hover:text-[#064734] hover:underline cursor-pointer py-1"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Reset All Filters</span>
              </button>
            )}
          </div>

          {/* 1-Click Quick Category Filter Chips */}
          <div className="mt-4 pt-4 border-t-2 border-[#E5DAC8]/60 flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#064734] shrink-0 mr-1">
              Popular Needs:
            </span>
            <button
              onClick={() => setSelectedCategory("all")}
              className={`rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
                selectedCategory === "all"
                  ? "bg-[#064734] text-white shadow-xs"
                  : "bg-[#FFF8EF] text-[#064734] border-2 border-[#E5DAC8] hover:border-[#064734] hover:text-[#15803D]"
              }`}
            >
              All Tools ({softwares.length})
            </button>
            {categories.slice(0, 5).map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
                  selectedCategory === cat.slug
                    ? "bg-[#064734] text-white shadow-xs"
                    : "bg-[#FFF8EF] text-[#064734] border-2 border-[#E5DAC8] hover:border-[#064734] hover:text-[#15803D]"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter & View Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 text-sm sm:text-base text-[#064734] font-semibold">
          <div>
            Showing <strong className="text-[#064734] text-base sm:text-lg">{filteredSoftwares.length}</strong> software {filteredSoftwares.length === 1 ? "solution" : "solutions"}
            {selectedCategory !== "all" && ` in ${categories.find(c => c.slug === selectedCategory)?.name}`}
            {selectedCountry !== "all" && ` for ${selectedCountry}`}
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Switcher */}
            <div className="flex items-center rounded-xl border-2 border-[#E5DAC8] bg-white p-1 shadow-2xs">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-bold rounded-lg transition-colors cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-[#064734] text-white"
                    : "text-[#3C6152] hover:text-[#064734]"
                }`}
                title="Grid view"
              >
                <LayoutGrid className="h-4 w-4" />
                <span>Cards</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("table")}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-bold rounded-lg transition-colors cursor-pointer ${
                  viewMode === "table"
                    ? "bg-[#064734] text-white"
                    : "text-[#3C6152] hover:text-[#064734]"
                }`}
                title="Single-line table view"
              >
                <Table className="h-4 w-4" />
                <span>1-Line Index</span>
              </button>
            </div>
          </div>
        </div>

        {/* Results View: Grid or Single-Line Broadsheet Table */}
        {filteredSoftwares.length > 0 ? (
          viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredSoftwares.map((software) => (
                <SoftwareCard key={software.id} software={software} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-[#E5DAC8] bg-white overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs whitespace-nowrap">
                  <thead className="bg-[#064734] text-white uppercase text-[10.5px] font-bold tracking-wider">
                    <tr>
                      <th scope="col" className="py-3 px-4">Software</th>
                      <th scope="col" className="py-3 px-3">Category</th>
                      <th scope="col" className="py-3 px-3">Suitability</th>
                      <th scope="col" className="py-3 px-4">Compliance Highlights</th>
                      <th scope="col" className="py-3 px-3">Arabic RTL</th>
                      <th scope="col" className="py-3 px-3">Starting Price</th>
                      <th scope="col" className="py-3 px-3 text-center">Score</th>
                      <th scope="col" className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5DAC8] text-[#3C6152]">
                    {filteredSoftwares.map((software) => (
                      <tr
                        key={software.id}
                        className="hover:bg-[#FFF8EF] transition-colors group"
                      >
                        <td className="py-2.5 px-4 font-bold text-[#064734]">
                          <Link
                            href={`/reviews/${software.slug}`}
                            className="flex items-center gap-2 group-hover:text-[#15803D] transition-colors"
                          >
                            <div
                              className="h-6 w-6 rounded flex items-center justify-center text-[10px] text-white font-extrabold shadow-2xs"
                              style={{ backgroundColor: software.accentColor || "#064734" }}
                            >
                              {software.name.substring(0, 2).toUpperCase()}
                            </div>
                            <span className="font-bold text-xs">{software.name}</span>
                          </Link>
                        </td>
                        <td className="py-2.5 px-3 text-[#4A6D5F] font-medium">
                          {software.categoryName}
                        </td>
                        <td className="py-2.5 px-3">
                          <span className="inline-flex items-center gap-1 rounded bg-[#E0FFC2] px-2 py-0.5 text-[11px] font-semibold text-[#064734] border border-[#BDE895]">
                            {software.countrySuitability.join(", ")}
                          </span>
                        </td>
                        <td className="py-2.5 px-4 font-medium text-[#064734]">
                          <div className="flex items-center gap-1.5 truncate max-w-xs" title={software.localCompliance.join(" • ")}>
                            <CheckCircle2 className="h-3.5 w-3.5 text-[#15803D] shrink-0" />
                            <span className="truncate">{software.localCompliance[0] || "Compliant"}</span>
                          </div>
                        </td>
                        <td className="py-2.5 px-3">
                          <span className="text-[11px] font-bold text-[#15803D]">
                            {software.arabicSupport.includes("Native") ? "Native RTL" : "Partial RTL"}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 font-semibold text-[#064734]">
                          {software.pricing.startingPrice}
                        </td>
                        <td className="py-2.5 px-3 text-center">
                          <span className="inline-flex items-center gap-1 rounded bg-[#FFF8EF] px-2 py-0.5 text-xs font-bold text-[#064734] border border-[#E5DAC8]">
                            <Star className="h-3 w-3 fill-[#D97706] text-[#D97706]" />
                            {software.rating.toFixed(1)}
                          </span>
                        </td>
                        <td className="py-2.5 px-4 text-right">
                          <Link
                            href={`/reviews/${software.slug}`}
                            className="inline-flex items-center gap-1 text-xs font-bold text-[#064734] group-hover:text-[#15803D] hover:underline"
                          >
                            <span>Review</span>
                            <ArrowRight className="h-3 w-3" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )
        ) : (
          <div className="rounded-2xl border border-dashed border-[#E5DAC8] bg-white p-12 text-center max-w-xl mx-auto my-12">
            <SlidersHorizontal className="mx-auto h-12 w-12 text-[#4A6D5F] mb-3" />
            <h3 className="text-2xl font-bold font-editorial text-[#064734]">No software matches your criteria</h3>
            <p className="mt-2 text-[17px] text-[#4A6D5F]">
              Try clearing your search query or loosening your category and country filters.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#064734] px-6 py-3.5 text-[16px] font-bold text-white hover:bg-[#15803D] cursor-pointer shadow-md"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Reset Filters</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
