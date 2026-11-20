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
    <div className="min-h-screen bg-[#F7F4EC] pb-24">
      {/* Header */}
      <div className="bg-[#FAF7F0] border-b border-[#E5DFD3] pt-12 pb-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 text-[15px] font-bold uppercase tracking-wider text-[#FF6B5B] mb-2.5">
              <Layers className="h-4 w-4" />
              <span>Browse by Business Need</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-editorial text-[#0A2E36] tracking-tight">
              Software Categories
            </h1>
            <p className="mt-3 text-[18px] sm:text-[19px] text-[#384D52] leading-relaxed">
              Explore business applications evaluated across regulatory compliance, Arabic language support, and local regional integrations in Saudi Arabia, the UAE, and the wider GCC.
            </p>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10">
        <div className="space-y-8">
          {categories.map((cat) => {
            const IconComponent = categoryIcons[cat.iconName] || Layers;
            const popularProducts = softwares.filter((s) =>
              cat.popularSoftwareSlugs.includes(s.slug)
            );

            return (
              <div
                key={cat.id}
                className="rounded-2xl border border-[#E5DFD3] bg-white p-6 sm:p-8 shadow-xs hover:border-[#FF6B5B] transition-all"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Category Info (Col 7) */}
                  <div className="lg:col-span-7">
                    <div className="flex items-center gap-3.5 mb-3.5">
                      <div className="flex h-13 w-13 items-center justify-center rounded-xl bg-[#0A2E36] text-[#FF6B5B] shadow-2xs">
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-bold font-editorial text-[#0A2E36]">
                          <Link
                            href={`/categories/${cat.slug}`}
                            className="hover:text-[#FF6B5B] transition-colors"
                          >
                            {cat.name}
                          </Link>
                        </h2>
                        <span className="text-[15px] text-[#526A70] font-semibold">
                          {cat.count}+ evaluated solutions
                        </span>
                      </div>
                    </div>

                    <p className="text-[18px] text-[#384D52] leading-relaxed mb-4">
                      {cat.description}
                    </p>

                    {/* Gulf Relevance Box */}
                    <div className="rounded-xl bg-[#FAF7F0] border border-[#E5DFD3] p-4 mb-5 text-[#0A2E36]">
                      <span className="font-bold text-[#0A2E36] text-[16px] block mb-1">
                        Why this matters in the Gulf:
                      </span>
                      <p className="text-[17px] text-[#526A70] leading-relaxed">
                        {cat.gulfRelevance}
                      </p>
                    </div>

                    {/* Key Evaluation Criteria */}
                    <div>
                      <h4 className="text-[14px] font-bold uppercase tracking-wider text-[#526A70] mb-3">
                        Key Gulf Selection Criteria:
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-[16px] sm:text-[17px] text-[#0A2E36]">
                        {cat.keyCriteria.map((crit, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="h-2 w-2 rounded-full bg-[#FF6B5B] mt-2 shrink-0" />
                            <span>{crit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-7">
                      <Link
                        href={`/categories/${cat.slug}`}
                        className="inline-flex items-center gap-2 text-[17px] font-bold text-[#0A2E36] hover:text-[#FF6B5B] transition-colors"
                      >
                        <span>Explore All {cat.name} Solutions</span>
                        <ArrowRight className="h-4 w-4 text-[#FF6B5B]" />
                      </Link>
                    </div>
                  </div>

                  {/* Popular Software in this Category (Col 5) */}
                  <div className="lg:col-span-5 bg-[#FAF7F0] rounded-2xl border border-[#E5DFD3] p-6 shadow-2xs">
                    <h4 className="text-[15px] font-bold uppercase tracking-wider text-[#526A70] mb-4">
                      Popular {cat.name} Software:
                    </h4>

                    <div className="space-y-3">
                      {popularProducts.map((p) => (
                        <Link
                          key={p.id}
                          href={`/reviews/${p.slug}`}
                          className="group flex items-center justify-between rounded-xl p-3 bg-white hover:bg-white border border-[#E5DFD3] hover:border-[#FF6B5B] transition-all shadow-2xs"
                        >
                          <div className="flex items-center gap-3.5">
                            <div
                              className="h-10 w-10 rounded-lg flex items-center justify-center font-bold text-white text-sm shrink-0"
                              style={{ backgroundColor: p.accentColor || "#0A2E36" }}
                            >
                              {p.name.substring(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <div className="text-[16px] font-bold text-[#0A2E36] group-hover:text-[#FF6B5B]">
                                {p.name}
                              </div>
                              <div className="text-[14px] text-[#526A70] font-medium">
                                Score: {p.verdict.score}/10 • From {p.pricing.startingPrice}
                              </div>
                            </div>
                          </div>

                          <ArrowRight className="h-4 w-4 text-[#FF6B5B] opacity-0 group-hover:opacity-100 transition-opacity" />
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
