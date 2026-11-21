import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { comparisons, comparisonLookup } from "@/data/comparisons";
import { softwares, softwareLookup } from "@/data/software";
import ComparisonMatrix from "@/components/ComparisonMatrix";
import { Scale, ArrowLeft } from "lucide-react";

export const dynamicParams = false;

export async function generateStaticParams() {
  return comparisons.map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const comp = comparisonLookup[slug];
  if (!comp) return { title: "Software Comparison Not Found" };

  return {
    title: `${comp.title}: Which is Better for Middle East Businesses?`,
    description: comp.shortDescription,
  };
}

export default async function ComparisonDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const comparison = comparisonLookup[slug];

  if (!comparison) {
    notFound();
  }

  const productA = softwareLookup[comparison.productAId];
  const productB = softwareLookup[comparison.productBId];

  if (!productA || !productB) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#FFF8EF] pb-24">
      {/* Top Header */}
      <div className="bg-[#FFF8EF] border-b border-[#E5DAC8] pt-10 pb-12 sm:pb-14">
        <div className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8 xl:px-12">
          <Link
            href="/compare"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#4A6D5F] hover:text-[#064734] mb-5 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>All Comparisons</span>
          </Link>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#064734]/50 bg-[#E0FFC2] px-3.5 py-1 text-xs font-bold text-[#064734] mb-3">
              <Scale className="h-4 w-4 text-[#15803D]" />
              <span>{comparison.categories.join(" • ")} Matchup</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-editorial text-[#064734] tracking-tight">
              {comparison.title}
            </h1>

            <p className="mt-2.5 text-sm sm:text-base text-[#163A2E] leading-relaxed">
              {comparison.shortDescription}
            </p>
          </div>
        </div>
      </div>

      {/* Main Comparison Area */}
      <div className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8 xl:px-12 pt-8 sm:pt-10">
        <ComparisonMatrix
          initialProductA={productA}
          initialProductB={productB}
          curatedVerdict={{
            winnerSummary: comparison.winnerSummary,
            gulfContext: comparison.gulfContext,
          }}
        />

        {/* Other Comparisons Navigation */}
        <div className="mt-16 pt-10 border-t border-[#E5DAC8]">
          <h3 className="text-xl font-bold text-[#064734] mb-5">
            Explore Other Regional Matchups
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {comparisons
              .filter((c) => c.slug !== comparison.slug)
              .slice(0, 3)
              .map((other) => (
                <Link
                  key={other.id}
                  href={`/compare/${other.slug}`}
                  className="rounded-2xl border border-[#E5DAC8] bg-[#FFF8EF] p-5 hover:border-[#064734] transition-colors shadow-2xs"
                >
                  <h4 className="text-base sm:text-lg font-bold text-[#064734] mb-2">
                    {other.title}
                  </h4>
                  <p className="text-[15px] text-[#475569] line-clamp-2">
                    {other.shortDescription}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
