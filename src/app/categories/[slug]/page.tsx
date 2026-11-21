import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, categoryLookup } from "@/data/categories";
import { softwares } from "@/data/software";
import SoftwareCard from "@/components/SoftwareCard";
import {
  Layers,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";

export const dynamicParams = false;

export async function generateStaticParams() {
  return categories.map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = categoryLookup[slug];
  if (!category) return { title: "Category Not Found" };

  return {
    title: `${category.name} Software Reviews for Saudi Arabia & UAE`,
    description: category.description,
  };
}

export default async function CategoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = categoryLookup[slug];

  if (!category) {
    notFound();
  }

  // Filter software in this category
  const matchingSoftware = softwares.filter(
    (s) =>
      s.category === category.id ||
      category.popularSoftwareSlugs.includes(s.slug)
  );

  return (
    <div className="min-h-screen bg-[#FFF8EF] pb-24">
      {/* Header */}
      <div className="bg-[#FFF8EF] border-b border-[#E5DAC8] pt-10 pb-12 sm:pb-14">
        <div className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8 xl:px-12">
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#4A6D5F] hover:text-[#064734] mb-5 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>All Categories</span>
          </Link>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#064734]/50 bg-[#E0FFC2] px-3.5 py-1 text-xs font-bold text-[#064734] mb-3">
              <Layers className="h-4 w-4 text-[#15803D]" />
              <span>{matchingSoftware.length} Evaluated Solutions</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-editorial text-[#064734] tracking-tight">
              {category.name} Software in the Gulf
            </h1>

            <p className="mt-2.5 text-sm sm:text-base text-[#163A2E] leading-relaxed">
              {category.description}
            </p>

            <div className="mt-5 rounded-2xl bg-white border border-[#E5DAC8] p-4 sm:p-5 text-xs sm:text-sm shadow-2xs">
              <span className="font-bold text-[#064734] block mb-1">
                Regional Gulf Context &amp; Relevance:
              </span>
              <p className="text-[#163A2E] leading-relaxed">
                {category.gulfRelevance}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Software Listings in this Category */}
      <div className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8 xl:px-12 pt-8 sm:pt-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold font-editorial text-[#064734]">
            Reviewed {category.name} Tools
          </h2>
          <span className="text-xs sm:text-sm font-semibold text-[#4A6D5F]">
            Sorted by Gulf regional suitability
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {matchingSoftware.map((software) => (
            <SoftwareCard key={software.id} software={software} />
          ))}
        </div>

        {/* Category Key Criteria Box */}
        <div className="mt-16 rounded-2xl border border-[#E5DAC8] bg-[#FFF8EF] p-6 sm:p-8">
          <h3 className="text-xl sm:text-2xl font-bold font-editorial text-[#064734] mb-5">
            Buyer&apos;s Checklist for {category.name} in Saudi Arabia &amp; UAE
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {category.keyCriteria.map((crit, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-[17px] text-[#1E293B]">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <span>{crit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
