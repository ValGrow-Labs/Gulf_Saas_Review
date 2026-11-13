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
} from "lucide-react";

export default function ReviewsClient() {
  const searchParams = useSearchParams();

  // Initial params
  const initialCategory = searchParams.get("category") || "all";
  const initialCountry = searchParams.get("country") || "all";
  const initialArabic = searchParams.get("arabic") === "true";

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
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
            // Check if any tier has free price
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
    <div className="min-h-screen bg-[#F6F1E7] pb-24">
      {/* Page Header */}
      <div className="bg-[#FCFAF5] border-b border-[#E7E4DC] pt-12 pb-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C6A66B] mb-2">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Independent Directory</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-editorial text-[#101F35] tracking-tight">
              Software Reviews Directory
            </h1>
            <p className="mt-3 text-sm sm:text-base text-[#697386] leading-relaxed">
              Explore independent evaluations of enterprise and small business software tailored for businesses in Saudi Arabia, the UAE, and the GCC. Filter by regulatory readiness, Arabic UI, and pricing models.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
        {/* Search & Quick Controls Bar */}
        <div className="rounded-2xl border border-[#E7E4DC] bg-[#FCFAF5] p-4 sm:p-5 shadow-xs mb-8">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#697386]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by software name, feature (e.g. ZATCA, WhatsApp, WPS, Payroll)..."
                className="w-full rounded-xl border border-[#E7E4DC] bg-white pl-10 pr-9 py-2.5 text-sm text-[#101F35] placeholder-[#697386] focus:border-[#C6A66B] focus:outline-none focus:ring-1 focus:ring-[#C6A66B]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#697386] hover:text-[#101F35]"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Quick Sort Dropdown */}
            <div className="flex items-center gap-2.5 shrink-0">
              <label htmlFor="sort-by" className="text-xs font-medium text-[#697386] shrink-0">
                Sort By:
              </label>
              <select
                id="sort-by"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="rounded-xl border border-[#E7E4DC] bg-white px-3 py-2 text-xs font-semibold text-[#101F35] focus:border-[#C6A66B] focus:outline-none"
              >
                <option value="rating">Highest Rated</option>
                <option value="reviews">Most Reviewed</option>
                <option value="name">Alphabetical (A-Z)</option>
              </select>
            </div>
          </div>

          {/* Filter Pills: Country, Arabic, Pricing, Category */}
          <div className="mt-4 pt-4 border-t border-[#E7E4DC]/70 flex flex-wrap items-center gap-2 text-xs">
            {/* Country Suitability Pills */}
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#697386] mr-1">
              Country:
            </span>
            {["all", "Saudi Arabia", "UAE", "GCC"].map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCountry(c)}
                className={`rounded-lg px-3 py-1.5 font-medium transition-colors ${
                  selectedCountry === c
                    ? "bg-[#101F35] text-[#FCFAF5]"
                    : "bg-[#F6F1E7] text-[#101F35] hover:bg-[#E7E4DC]"
                }`}
              >
                {c === "all" ? "All GCC" : c}
              </button>
            ))}

            <div className="h-4 w-[1px] bg-[#E7E4DC] mx-1 hidden sm:block" />

            {/* Arabic Language Toggle */}
            <button
              onClick={() => setArabicOnly(!arabicOnly)}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-medium transition-colors ${
                arabicOnly
                  ? "bg-[#C6A66B] text-[#101F35] font-bold"
                  : "bg-[#F6F1E7] text-[#101F35] hover:bg-[#E7E4DC]"
              }`}
            >
              {arabicOnly && <Check className="h-3 w-3" />}
              <span>Arabic UI / RTL Support</span>
            </button>

            <div className="h-4 w-[1px] bg-[#E7E4DC] mx-1 hidden sm:block" />

            {/* Category Dropdown Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-lg border border-[#E7E4DC] bg-[#F6F1E7] px-3 py-1.5 text-xs font-medium text-[#101F35] focus:border-[#C6A66B] focus:outline-none"
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
              className="rounded-lg border border-[#E7E4DC] bg-[#F6F1E7] px-3 py-1.5 text-xs font-medium text-[#101F35] focus:border-[#C6A66B] focus:outline-none"
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
                className="ml-auto inline-flex items-center gap-1 text-xs font-bold text-[#DE2A2A] hover:underline"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Reset All Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Results Counter & Transparency Note */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 text-xs text-[#697386]">
          <div>
            Showing <strong className="text-[#101F35]">{filteredSoftwares.length}</strong> software {filteredSoftwares.length === 1 ? "solution" : "solutions"}
            {selectedCategory !== "all" && ` in ${categories.find(c => c.slug === selectedCategory)?.name}`}
            {selectedCountry !== "all" && ` for ${selectedCountry}`}
          </div>
          <div className="flex items-center gap-1.5 text-[#101F35]">
            <ShieldCheck className="h-3.5 w-3.5 text-[#C6A66B]" />
            <span>Sample review directory compiled under GulfSaasReview regional standards.</span>
          </div>
        </div>

        {/* Results Grid */}
        {filteredSoftwares.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSoftwares.map((software) => (
              <SoftwareCard key={software.id} software={software} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-[#E7E4DC] bg-[#FCFAF5] p-12 text-center max-w-xl mx-auto my-12">
            <SlidersHorizontal className="mx-auto h-10 w-10 text-[#697386] mb-3" />
            <h3 className="text-lg font-bold text-[#101F35]">No software matches your criteria</h3>
            <p className="mt-1 text-xs text-[#697386]">
              Try clearing your search query or loosening your category and country filters.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-5 inline-flex items-center gap-1.5 rounded-lg bg-[#101F35] px-4 py-2 text-xs font-bold text-white hover:bg-[#172B46]"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

