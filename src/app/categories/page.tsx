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
  ShieldCheck,
  Building2,
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
      <div className="bg-[#FCFAF5] border-b border-[#E7E4DC] pt-12 pb-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C6A66B] mb-2">
              <Layers className="h-3.5 w-3.5" />
              <span>Functional Taxonomy</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-editorial text-[#101F35] tracking-tight">
              Software Categories
            </h1>
            <p className="mt-3 text-sm sm:text-base text-[#697386] leading-relaxed">
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
                className="rounded-2xl border border-[#E7E4DC] bg-[#FCFAF5] p-6 sm:p-8 shadow-xs hover:border-[#C6A66B] transition-all"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Category Info (Col 7) */}
                  <div className="lg:col-span-7">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#101F35] text-[#C6A66B]">
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div>
                        <h2 className="text-xl sm:text-2xl font-bold font-editorial text-[#101F35]">
                          <Link
                            href={`/categories/${cat.slug}`}
                            className="hover:text-[#C6A66B] transition-colors"
                          >
                            {cat.name}
                          </Link>
                        </h2>
                        <span className="text-xs text-[#697386]">
                          {cat.count}+ evaluated solutions
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-[#101F35] leading-relaxed mb-4">
                      {cat.description}
                    </p>

                    {/* Gulf Relevance Box */}
                    <div className="rounded-xl bg-[#F6F1E7] border border-[#E7E4DC] p-3.5 mb-5 text-xs text-[#101F35]">
                      <span className="font-bold text-[#8C6D33] block mb-1">
                        Why this matters in the Gulf:
                      </span>
                      <p className="text-[#697386] leading-relaxed">
                        {cat.gulfRelevance}
                      </p>
                    </div>

                    {/* Key Evaluation Criteria */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#697386] mb-2.5">
                        Key Gulf Selection Criteria:
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#101F35]">
                        {cat.keyCriteria.map((crit, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#C6A66B] mt-1.5 shrink-0" />
                            <span>{crit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6">
                      <Link
                        href={`/categories/${cat.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#101F35] hover:text-[#C6A66B]"
                      >
                        <span>Explore All {cat.name} Solutions</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>

                  {/* Popular Software in this Category (Col 5) */}
                  <div className="lg:col-span-5 bg-white rounded-xl border border-[#E7E4DC] p-5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#697386] mb-4">
                      Popular {cat.name} Software:
                    </h4>

                    <div className="space-y-3">
                      {popularProducts.map((p) => (
                        <Link
                          key={p.id}
                          href={`/reviews/${p.slug}`}
                          className="group flex items-center justify-between rounded-lg p-2.5 hover:bg-[#F6F1E7] border border-transparent hover:border-[#E7E4DC] transition-all"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className="h-8 w-8 rounded-lg flex items-center justify-center font-bold text-white text-xs shrink-0"
                              style={{ backgroundColor: p.accentColor || "#101F35" }}
                            >
                              {p.name.substring(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <div className="text-xs font-bold text-[#101F35] group-hover:text-[#C6A66B]">
                                {p.name}
                              </div>
                              <div className="text-[10px] text-[#697386]">
                                Score: {p.verdict.score}/10 • From {p.pricing.startingPrice}
                              </div>
                            </div>
                          </div>

                          <ArrowRight className="h-3.5 w-3.5 text-[#C6A66B] opacity-0 group-hover:opacity-100 transition-opacity" />
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

