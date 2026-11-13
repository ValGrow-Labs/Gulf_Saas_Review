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
    <div className="min-h-screen bg-[#F6F1E7] pb-24">
      {/* Top Header */}
      <div className="bg-[#FCFAF5] border-b border-[#E7E4DC] pt-10 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/compare"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#334155] hover:text-[#101F35] mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>All Comparisons</span>
          </Link>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#C6A66B]/60 bg-[#F6F1E7] px-4 py-1.5 text-xs sm:text-sm font-bold text-[#8C6D33] mb-4">
              <Scale className="h-4 w-4" />
              <span>{comparison.categories.join(" • ")} Matchup</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-editorial text-[#101F35] tracking-tight">
              {comparison.title}
            </h1>

            <p className="mt-4 text-base sm:text-xl text-[#1E293B] leading-relaxed">
              {comparison.shortDescription}
            </p>
          </div>
        </div>
      </div>

      {/* Main Comparison Area */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12">
        <ComparisonMatrix
          initialProductA={productA}
          initialProductB={productB}
          curatedVerdict={{
            winnerSummary: comparison.winnerSummary,
            gulfContext: comparison.gulfContext,
          }}
        />

        {/* Other Comparisons Navigation */}
        <div className="mt-16 pt-10 border-t border-[#E7E4DC]">
          <h3 className="text-lg sm:text-xl font-bold text-[#101F35] mb-5">
            Explore Other Regional Matchups
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {comparisons
              .filter((c) => c.slug !== comparison.slug)
              .slice(0, 3)
              .map((other) => (
                <Link
                  key={other.id}
                  href={`/compare/${other.slug}`}
                  className="rounded-2xl border-2 border-[#E7E4DC] bg-[#FCFAF5] p-5 hover:border-[#C6A66B] transition-colors"
                >
                  <h4 className="text-base font-bold text-[#101F35] mb-1.5">
                    {other.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#334155] line-clamp-2">
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
