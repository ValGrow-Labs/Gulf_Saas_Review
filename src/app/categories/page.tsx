import React from "react";
import Link from "next/link";
import { categories } from "@/data/categories";
import { softwares } from "@/data/software";
import {
  Layers,
  Calculator,
  Users,
  Briefcase,
  CheckSquare,
  Send,
  ShoppingBag,
  Headphones,
  ArrowRight,
} from "lucide-react";

export const metadata = {
  title: "Software Categories for Gulf Businesses | GulfSaasReview",
  description:
    "Browse software categories tailored for Middle Eastern enterprises, startups, and SMBs: Accounting, CRM, HR & Payroll, ERP, Project Management, and E-commerce.",
};

const categoryIcons: Record<string, React.ElementType> = {
  Calculator,
  Users,
  Briefcase,
  CheckSquare,
  Send,
  ShoppingBag,
  Layers,
  Headphones,
};

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-[#F6F1E7] pb-24">
      {/* Header */}
      <div className="bg-[#FCFAF5] border-b border-[#E7E4DC] pt-14 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#C6A66B] mb-3">
              <Layers className="h-4 w-4" />
              <span>Functional Taxonomy</span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-editorial text-[#101F35] tracking-tight">
              Software Categories
            </h1>
            <p className="mt-4 text-base sm:text-xl text-[#1E293B] leading-relaxed">
              Explore business applications evaluated across regulatory compliance, Arabic language support, and local regional integrations in Saudi Arabia, the UAE, and the wider GCC.
            </p>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12">
        <div className="space-y-10">
          {categories.map((cat) => {
            const IconComponent = categoryIcons[cat.iconName] || Layers;
            const popularProducts = softwares.filter((s) =>
              cat.popularSoftwareSlugs.includes(s.slug)
            );

            return (
              <div
                key={cat.id}
                className="rounded-3xl border-2 border-[#E7E4DC] bg-[#FCFAF5] p-7 sm:p-10 shadow-xs hover:border-[#C6A66B] transition-all"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Category Info (Col 7) */}
                  <div className="lg:col-span-7">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#101F35] text-[#C6A66B]">
                        <IconComponent className="h-7 w-7" />
                      </div>
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-bold font-editorial text-[#101F35]">
                          <Link
                            href={`/categories/${cat.slug}`}
                            className="hover:text-[#C6A66B] transition-colors"
                          >
                            {cat.name}
                          </Link>
                        </h2>
                        <span className="text-sm font-bold text-[#101F35] bg-[#F6F1E7] px-3 py-1 rounded-md border border-[#E7E4DC] inline-block mt-1">
                          {cat.count}+ evaluated solutions
                        </span>
                      </div>
                    </div>

                    <p className="text-base sm:text-lg text-[#101F35] leading-relaxed mb-5 font-normal">
                      {cat.description}
                    </p>

                    {/* Gulf Relevance Box */}
                    <div className="rounded-2xl bg-[#F6F1E7] border border-[#E7E4DC] p-5 mb-6 text-sm sm:text-base text-[#101F35]">
                      <span className="font-extrabold text-[#8C6D33] block mb-1.5 text-sm sm:text-base">
                        Why this matters in the Gulf:
                      </span>
                      <p className="text-[#1E293B] leading-relaxed font-medium">
                        {cat.gulfRelevance}
                      </p>
                    </div>

                    {/* Key Evaluation Criteria */}
                    <div>
                      <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#334155] mb-3">
                        Key Gulf Selection Criteria:
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm sm:text-base text-[#101F35] font-medium">
                        {cat.keyCriteria.map((crit, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="h-2 w-2 rounded-full bg-[#C6A66B] mt-2 shrink-0" />
                            <span>{crit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-8">
                      <Link
                        href={`/categories/${cat.slug}`}
                        className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-[#101F35] hover:text-[#C6A66B]"
                      >
                        <span>Explore All {cat.name} Solutions</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>

                  {/* Popular Software in this Category (Col 5) */}
                  <div className="lg:col-span-5 bg-white rounded-2xl border-2 border-[#E7E4DC] p-6 sm:p-7">
                    <h4 className="text-sm font-extrabold uppercase tracking-wider text-[#334155] mb-5">
                      Popular {cat.name} Software:
                    </h4>

                    <div className="space-y-3.5">
                      {popularProducts.map((p) => (
                        <Link
                          key={p.id}
                          href={`/reviews/${p.slug}`}
                          className="group flex items-center justify-between rounded-xl p-3 hover:bg-[#F6F1E7] border border-transparent hover:border-[#E7E4DC] transition-all"
                        >
                          <div className="flex items-center gap-3.5">
                            <div
                              className="h-10 w-10 rounded-xl flex items-center justify-center font-bold text-white text-sm shrink-0"
                              style={{ backgroundColor: p.accentColor || "#101F35" }}
                            >
                              {p.name.substring(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <div className="text-base font-bold text-[#101F35] group-hover:text-[#C6A66B]">
                                {p.name}
                              </div>
                              <div className="text-xs sm:text-sm text-[#334155] font-medium mt-0.5">
                                Score: {p.verdict.score}/10 • From {p.pricing.startingPrice}
                              </div>
                            </div>
                          </div>

                          <ArrowRight className="h-4 w-4 text-[#C6A66B] opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
