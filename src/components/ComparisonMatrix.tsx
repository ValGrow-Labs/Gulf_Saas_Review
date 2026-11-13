"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Software } from "@/types";
import { softwares } from "@/data/software";
import {
  Star,
  Check,
  X,
  ShieldCheck,
  Globe2,
  Building2,
  ArrowRight,
  ExternalLink,
  Scale,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

interface ComparisonMatrixProps {
  initialProductA: Software;
  initialProductB: Software;
  initialProductC?: Software | null;
  curatedVerdict?: {
    winnerSummary: string;
    gulfContext: string;
  };
}

export default function ComparisonMatrix({
  initialProductA,
  initialProductB,
  initialProductC = null,
  curatedVerdict,
}: ComparisonMatrixProps) {
  const [productA, setProductA] = useState<Software>(initialProductA);
  const [productB, setProductB] = useState<Software>(initialProductB);
  const [productC, setProductC] = useState<Software | null>(initialProductC);

  const activeProducts = [productA, productB, productC].filter(
    (p): p is Software => Boolean(p)
  );

  return (
    <div className="space-y-10">
      {/* Product Selectors Header */}
      <div className="rounded-2xl border border-[#C6A66B]/40 bg-[#FCFAF5] p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-[#E7E4DC]">
          <div className="flex items-center gap-2">
            <Scale className="h-5 w-5 text-[#C6A66B]" />
            <h2 className="text-base font-bold text-[#101F35]">
              Customize Compared Solutions
            </h2>
          </div>
          <span className="text-xs text-[#697386]">
            Select different software to compare side-by-side
          </span>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Selector A */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-[#697386] block mb-1.5">
              Solution 1:
            </label>
            <select
              value={productA.slug}
              onChange={(e) => {
                const found = softwares.find((s) => s.slug === e.target.value);
                if (found) setProductA(found);
              }}
              className="w-full rounded-xl border border-[#E7E4DC] bg-white px-3.5 py-2.5 text-sm font-semibold text-[#101F35] focus:border-[#C6A66B] focus:outline-none"
            >
              {softwares.map((s) => (
                <option key={s.id} value={s.slug}>
                  {s.name} ({s.categoryName})
                </option>
              ))}
            </select>
          </div>

          {/* Selector B */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-[#697386] block mb-1.5">
              Solution 2:
            </label>
            <select
              value={productB.slug}
              onChange={(e) => {
                const found = softwares.find((s) => s.slug === e.target.value);
                if (found) setProductB(found);
              }}
              className="w-full rounded-xl border border-[#E7E4DC] bg-white px-3.5 py-2.5 text-sm font-semibold text-[#101F35] focus:border-[#C6A66B] focus:outline-none"
            >
              {softwares.map((s) => (
                <option key={s.id} value={s.slug}>
                  {s.name} ({s.categoryName})
                </option>
              ))}
            </select>
          </div>

          {/* Selector C (Optional 3rd) */}
          <div className="sm:col-span-2 lg:col-span-1">
            <label className="text-xs font-bold uppercase tracking-wider text-[#697386] block mb-1.5">
              Solution 3 (Optional):
            </label>
            <select
              value={productC ? productC.slug : "none"}
              onChange={(e) => {
                if (e.target.value === "none") {
                  setProductC(null);
                } else {
                  const found = softwares.find((s) => s.slug === e.target.value);
                  if (found) setProductC(found);
                }
              }}
              className="w-full rounded-xl border border-[#E7E4DC] bg-white px-3.5 py-2.5 text-sm font-semibold text-[#101F35] focus:border-[#C6A66B] focus:outline-none"
            >
              <option value="none">-- None (2-way comparison) --</option>
              {softwares
                .filter((s) => s.slug !== productA.slug && s.slug !== productB.slug)
                .map((s) => (
                  <option key={s.id} value={s.slug}>
                    {s.name} ({s.categoryName})
                  </option>
                ))}
            </select>
          </div>
        </div>
      </div>

      {/* Curated Editorial Verdict Note if available */}
      {curatedVerdict && (
        <div className="rounded-2xl border border-[#101F35] bg-[#101F35] text-[#FCFAF5] p-6 sm:p-7 shadow-md">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C6A66B] mb-2">
            <Sparkles className="h-4 w-4" />
            <span>GulfSaasReview Comparative Analysis</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-editorial text-white mb-3">
            {curatedVerdict.winnerSummary}
          </h3>
          <p className="text-xs sm:text-sm text-[#E7E4DC]/90 leading-relaxed">
            {curatedVerdict.gulfContext}
          </p>
        </div>
      )}

      {/* Side-by-Side Comparison Table Grid */}
      <div className="overflow-x-auto rounded-2xl border border-[#E7E4DC] bg-[#FCFAF5] shadow-xs">
        <table className="w-full text-left border-collapse min-w-[700px]">
          {/* Header Row: Products */}
          <thead>
            <tr className="border-b border-[#E7E4DC] bg-white">
              <th className="p-5 w-1/4 text-xs font-bold uppercase tracking-wider text-[#697386]">
                Specification
              </th>
              {activeProducts.map((p) => (
                <th key={p.id} className="p-5 w-1/3 align-top border-l border-[#E7E4DC]">
                  <div className="flex items-center gap-3">
                    <div
                      className="h-10 w-10 rounded-xl flex items-center justify-center font-bold text-white text-sm shrink-0"
                      style={{ backgroundColor: p.accentColor || "#101F35" }}
                    >
                      {p.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-bold text-base text-[#101F35]">
                        {p.name}
                      </h4>
                      <span className="text-xs text-[#697386]">
                        {p.categoryName}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex items-center gap-1 text-sm font-bold text-[#101F35]">
                      <Star className="h-4 w-4 fill-[#C6A66B] text-[#C6A66B]" />
                      <span>{p.rating.toFixed(1)}</span>
                    </div>
                    <span className="text-xs text-[#697386]">
                      (Score: {p.verdict.score}/10)
                    </span>
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    <Link
                      href={`/reviews/${p.slug}`}
                      className="inline-flex items-center gap-1 rounded-lg bg-[#101F35] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#172B46]"
                    >
                      <span>Read Review</span>
                      <ArrowRight className="h-3 w-3 text-[#C6A66B]" />
                    </Link>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-[#E7E4DC] text-xs">
            {/* 1. Starting Price & Model */}
            <tr className="bg-[#FCFAF5]">
              <td className="p-4 font-bold text-[#101F35]">Starting Price</td>
              {activeProducts.map((p) => (
                <td key={p.id} className="p-4 border-l border-[#E7E4DC]">
                  <div className="text-base font-bold text-[#101F35]">
                    {p.pricing.startingPrice}
                  </div>
                  <div className="text-[11px] text-[#697386]">
                    {p.pricing.billingPeriod}
                  </div>
                </td>
              ))}
            </tr>

            {/* 2. GCC Regional Cost Estimate */}
            <tr className="bg-white">
              <td className="p-4 font-bold text-[#101F35]">SAR / AED Estimate</td>
              {activeProducts.map((p) => (
                <td key={p.id} className="p-4 border-l border-[#E7E4DC]">
                  <div className="font-semibold text-[#8C6D33]">
                    {p.pricing.tiers[0]?.regionalEstimateSAR || "See tier breakdown"}
                  </div>
                  <div className="text-[10px] text-[#697386] mt-0.5">
                    {p.pricing.tiers[0]?.regionalEstimateAED}
                  </div>
                </td>
              ))}
            </tr>

            {/* 3. Saudi Arabia ZATCA E-Invoicing */}
            <tr className="bg-[#FCFAF5]">
              <td className="p-4 font-bold text-[#101F35]">
                Saudi ZATCA E-Invoicing
              </td>
              {activeProducts.map((p) => (
                <td key={p.id} className="p-4 border-l border-[#E7E4DC]">
                  <div className="font-semibold text-[#101F35]">
                    {p.gulfSuitabilityAnalysis.zatcaStatus || "Check third-party sync"}
                  </div>
                </td>
              ))}
            </tr>

            {/* 4. UAE VAT 5% Compliance */}
            <tr className="bg-white">
              <td className="p-4 font-bold text-[#101F35]">
                UAE FTA VAT Readiness
              </td>
              {activeProducts.map((p) => (
                <td key={p.id} className="p-4 border-l border-[#E7E4DC]">
                  <div className="font-semibold text-[#101F35]">
                    {p.gulfSuitabilityAnalysis.uaeVatStatus || "Standard tax fields supported"}
                  </div>
                </td>
              ))}
            </tr>

            {/* 5. Arabic Language & RTL */}
            <tr className="bg-[#FCFAF5]">
              <td className="p-4 font-bold text-[#101F35]">Arabic Support</td>
              {activeProducts.map((p) => (
                <td key={p.id} className="p-4 border-l border-[#E7E4DC]">
                  <span className="inline-flex items-center gap-1 rounded bg-[#C6A66B]/20 px-2 py-0.5 text-xs font-semibold text-[#8C6D33]">
                    <Globe2 className="h-3 w-3" />
                    {p.arabicSupport}
                  </span>
                  <p className="text-[11px] text-[#697386] mt-1.5">
                    {p.gulfSuitabilityAnalysis.arabicExperience}
                  </p>
                </td>
              ))}
            </tr>

            {/* 6. Country Suitability */}
            <tr className="bg-white">
              <td className="p-4 font-bold text-[#101F35]">Country Suitability</td>
              {activeProducts.map((p) => (
                <td key={p.id} className="p-4 border-l border-[#E7E4DC]">
                  <div className="flex flex-wrap gap-1">
                    {p.countrySuitability.map((c) => (
                      <span
                        key={c}
                        className="rounded bg-[#101F35]/5 px-2 py-0.5 text-[10px] font-medium text-[#101F35]"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </td>
              ))}
            </tr>

            {/* 7. Ease of Use */}
            <tr className="bg-[#FCFAF5]">
              <td className="p-4 font-bold text-[#101F35]">Ease of Use</td>
              {activeProducts.map((p) => (
                <td key={p.id} className="p-4 border-l border-[#E7E4DC]">
                  <div className="font-bold text-sm text-[#101F35]">
                    {p.easeOfUse} / 10
                  </div>
                </td>
              ))}
            </tr>

            {/* 8. Deployment Time */}
            <tr className="bg-white">
              <td className="p-4 font-bold text-[#101F35]">Typical Deployment</td>
              {activeProducts.map((p) => (
                <td key={p.id} className="p-4 border-l border-[#E7E4DC]">
                  <div className="font-semibold text-[#101F35]">
                    {p.deploymentTime}
                  </div>
                </td>
              ))}
            </tr>

            {/* 9. Local Integrations */}
            <tr className="bg-[#FCFAF5]">
              <td className="p-4 font-bold text-[#101F35]">Local Integrations</td>
              {activeProducts.map((p) => (
                <td key={p.id} className="p-4 border-l border-[#E7E4DC]">
                  <div className="flex flex-wrap gap-1">
                    {p.localIntegrations.map((item, idx) => (
                      <span
                        key={idx}
                        className="rounded bg-white border border-[#E7E4DC] px-1.5 py-0.5 text-[10px] text-[#101F35]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </td>
              ))}
            </tr>

            {/* 10. Pros */}
            <tr className="bg-white">
              <td className="p-4 font-bold text-[#101F35]">Key Pros</td>
              {activeProducts.map((p) => (
                <td key={p.id} className="p-4 border-l border-[#E7E4DC]">
                  <ul className="space-y-1.5">
                    {p.pros.slice(0, 3).map((pro, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="text-[11px] text-[#101F35]">{pro}</span>
                      </li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>

            {/* 11. Cons */}
            <tr className="bg-[#FCFAF5]">
              <td className="p-4 font-bold text-[#101F35]">Key Cons</td>
              {activeProducts.map((p) => (
                <td key={p.id} className="p-4 border-l border-[#E7E4DC]">
                  <ul className="space-y-1.5">
                    {p.cons.slice(0, 3).map((con, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <X className="h-3.5 w-3.5 text-rose-600 shrink-0 mt-0.5" />
                        <span className="text-[11px] text-[#101F35]">{con}</span>
                      </li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>

            {/* 12. Best Suited For */}
            <tr className="bg-white">
              <td className="p-4 font-bold text-[#101F35]">Best Suited For</td>
              {activeProducts.map((p) => (
                <td key={p.id} className="p-4 border-l border-[#E7E4DC]">
                  <div className="font-semibold text-emerald-800 text-[11px]">
                    {p.verdict.bestFor}
                  </div>
                </td>
              ))}
            </tr>

            {/* 13. Final Recommendation */}
            <tr className="bg-[#FCFAF5]">
              <td className="p-4 font-bold text-[#101F35]">Verdict Summary</td>
              {activeProducts.map((p) => (
                <td key={p.id} className="p-4 border-l border-[#E7E4DC]">
                  <div className="rounded-lg bg-white p-3 border border-[#E7E4DC]">
                    <span className="font-bold text-[#101F35] block mb-1">
                      {p.verdict.badge}
                    </span>
                    <p className="text-[11px] text-[#697386]">
                      {p.verdict.summary}
                    </p>
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

