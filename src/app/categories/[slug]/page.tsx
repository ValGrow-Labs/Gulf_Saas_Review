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
    <div className="min-h-screen bg-[#E8DCC4] pb-24">
      {/* Header */}
      <div className="bg-[#F9F6F0] border-b border-[#D8CABA] pt-10 pb-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 text-[15px] font-bold text-[#64748B] hover:text-[#1F3D2B] mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>All Categories</span>
          </Link>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#C6A66B]/50 bg-[#E8DCC4] px-4 py-1.5 text-[14px] font-bold text-[#8C6D33] mb-3">
              <Layers className="h-4 w-4" />
              <span>{matchingSoftware.length} Evaluated Solutions</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-editorial text-[#1F3D2B] tracking-tight">
              {category.name} Software in the Gulf
            </h1>

            <p className="mt-3 text-[19px] sm:text-[20px] text-[#334155] leading-relaxed">
              {category.description}
            </p>

            <div className="mt-6 rounded-2xl bg-[#E8DCC4] border border-[#D8CABA] p-5 text-[17px]">
              <span className="font-bold text-[#8C6D33] block mb-1">
                Regional Gulf Context &amp; Relevance:
              </span>
              <p className="text-[#334155] leading-relaxed">
                {category.gulfRelevance}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Software Listings in this Category */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold font-editorial text-[#1F3D2B]">
            Reviewed {category.name} Tools
          </h2>
          <span className="text-[15px] font-semibold text-[#64748B]">
            Sorted by Gulf regional suitability
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {matchingSoftware.map((software) => (
            <SoftwareCard key={software.id} software={software} />
          ))}
        </div>

        {/* Category Key Criteria Box */}
        <div className="mt-16 rounded-2xl border border-[#D8CABA] bg-[#F9F6F0] p-6 sm:p-8">
          <h3 className="text-xl sm:text-2xl font-bold font-editorial text-[#1F3D2B] mb-5">
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
