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
            <div className="inline-flex items-center gap-1.5 text-[15px] font-bold uppercase tracking-wider text-[#C6A66B] mb-2.5">
              <Sparkles className="h-4 w-4" />
              <span>Independent Directory</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-editorial text-[#101F35] tracking-tight">
              Software Reviews Directory
            </h1>
            <p className="mt-3 text-[18px] sm:text-[19px] text-[#475569] leading-relaxed">
              Explore independent evaluations of enterprise and small business software tailored for businesses in Saudi Arabia, the UAE, and the GCC. Filter by regulatory readiness, Arabic UI, and pricing models.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
        {/* Search & Quick Controls Bar */}
        <div className="rounded-2xl border border-[#E7E4DC] bg-[#FCFAF5] p-6 shadow-xs mb-8">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#697386]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search software (e.g. Odoo, Zoho, ZATCA Phase 2, WhatsApp, WPS, Payroll)..."
                className="w-full rounded-xl border border-[#E7E4DC] bg-white pl-12 pr-10 py-3.5 text-[17px] sm:text-[18px] text-[#101F35] placeholder-[#697386] focus:border-[#C6A66B] focus:outline-none focus:ring-1 focus:ring-[#C6A66B] shadow-2xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-[#697386] hover:text-[#101F35] cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Quick Sort Dropdown */}
            <div className="flex items-center gap-3 shrink-0">
              <label htmlFor="sort-by" className="text-[15px] font-bold text-[#101F35] shrink-0">
                Sort By:
              </label>
              <select
                id="sort-by"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="rounded-xl border border-[#E7E4DC] bg-white px-4 py-3 text-[15px] sm:text-[16px] font-bold text-[#101F35] focus:border-[#C6A66B] focus:outline-none shadow-2xs cursor-pointer min-h-[48px]"
              >
                <option value="rating">Highest Rated</option>
                <option value="reviews">Most Reviewed</option>
                <option value="name">Alphabetical (A-Z)</option>
              </select>
            </div>
          </div>

          {/* Filter Pills: Category, Pricing, Country Scope */}
          <div className="mt-5 pt-4 border-t border-[#E7E4DC]/80 flex flex-wrap items-center gap-3 text-[15px] sm:text-[16px]">
            <div className="flex items-center gap-2">
              <span className="text-[13.5px] font-bold uppercase tracking-wider text-[#697386]">
                Country:
              </span>
              <span className="rounded-xl px-4 py-2 font-bold bg-[#101F35] text-[#FCFAF5] text-sm shadow-xs min-h-[40px] inline-flex items-center">
                All GCC
              </span>
            </div>

            <div className="h-5 w-[1px] bg-[#E7E4DC] mx-1 hidden sm:block" />

            {/* Category Dropdown Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-xl border border-[#E7E4DC] bg-[#F6F1E7] px-4 py-2.5 text-[15px] sm:text-[16px] font-bold text-[#101F35] focus:border-[#C6A66B] focus:outline-none min-h-[44px] cursor-pointer"
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
              className="rounded-xl border border-[#E7E4DC] bg-[#F6F1E7] px-4 py-2.5 text-[15px] sm:text-[16px] font-bold text-[#101F35] focus:border-[#C6A66B] focus:outline-none min-h-[44px] cursor-pointer"
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
                className="ml-auto inline-flex items-center gap-1.5 text-[15px] font-bold text-[#DE2A2A] hover:underline cursor-pointer py-1"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Reset All Filters</span>
              </button>
            )}
          </div>

          {/* 1-Click Quick Category Filter Chips */}
          <div className="mt-4 pt-3.5 border-t border-[#E7E4DC]/60 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs font-bold uppercase tracking-wider text-[#697386] shrink-0 mr-1">
              Popular Needs:
            </span>
            <button
              onClick={() => setSelectedCategory("all")}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedCategory === "all"
                  ? "bg-[#101F35] text-[#FCFAF5] shadow-xs"
                  : "bg-white text-[#101F35] border border-[#E7E4DC] hover:border-[#C6A66B]"
              }`}
            >
              All Tools ({softwares.length})
            </button>
            {categories.slice(0, 5).map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  selectedCategory === cat.slug
                    ? "bg-[#101F35] text-[#FCFAF5] shadow-xs"
                    : "bg-white text-[#101F35] border border-[#E7E4DC] hover:border-[#C6A66B]"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 text-[16px] text-[#475569]">
          <div>
            Showing <strong className="text-[#101F35] text-[18px]">{filteredSoftwares.length}</strong> software {filteredSoftwares.length === 1 ? "solution" : "solutions"}
            {selectedCategory !== "all" && ` in ${categories.find(c => c.slug === selectedCategory)?.name}`}
            {selectedCountry !== "all" && ` for ${selectedCountry}`}
          </div>
          <div className="flex items-center gap-2 text-[#101F35] font-semibold text-[15px]">
            <ShieldCheck className="h-4 w-4 text-[#C6A66B] shrink-0" />
            <span>Sample review directory compiled under GulfSaasReview regional standards.</span>
          </div>
        </div>

        {/* Results Grid */}
        {filteredSoftwares.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredSoftwares.map((software) => (
              <SoftwareCard key={software.id} software={software} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-[#E7E4DC] bg-[#FCFAF5] p-12 text-center max-w-xl mx-auto my-12">
            <SlidersHorizontal className="mx-auto h-12 w-12 text-[#697386] mb-3" />
            <h3 className="text-2xl font-bold font-editorial text-[#101F35]">No software matches your criteria</h3>
            <p className="mt-2 text-[17px] text-[#475569]">
              Try clearing your search query or loosening your category and country filters.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#101F35] px-6 py-3.5 text-[16px] font-bold text-white hover:bg-[#172B46] cursor-pointer"
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
