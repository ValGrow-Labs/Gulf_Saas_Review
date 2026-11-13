"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Software } from "@/types";
import { softwares } from "@/data/software";
import {
  Star,
  Check,
  X,
  Globe2,
  ArrowRight,
  Scale,
  Sparkles,
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
      <div className="rounded-2xl border border-[#FF6B5B]/50 bg-[#FAF5ED] p-5 sm:p-7 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-[#E5DCD0]">
          <div className="flex items-center gap-2.5">
            <Scale className="h-6 w-6 text-[#FF6B5B]" />
            <h2 className="text-lg sm:text-xl font-bold text-[#14123D]">
              Customize Compared Solutions
            </h2>
          </div>
          <span className="text-xs sm:text-sm text-[#556070]">
            Select different software to compare side-by-side
          </span>
        </div>

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Selector A */}
          <div>
            <label className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#697386] block mb-2">
              Solution 1:
            </label>
            <select
              value={productA.slug}
              onChange={(e) => {
                const found = softwares.find((s) => s.slug === e.target.value);
                if (found) setProductA(found);
              }}
              className="w-full rounded-xl border border-[#E5DCD0] bg-white px-3.5 py-3 text-sm sm:text-base font-bold text-[#14123D] focus:border-[#FF6B5B] focus:outline-none min-h-[46px] shadow-2xs"
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
            <label className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#697386] block mb-2">
              Solution 2:
            </label>
            <select
              value={productB.slug}
              onChange={(e) => {
                const found = softwares.find((s) => s.slug === e.target.value);
                if (found) setProductB(found);
              }}
              className="w-full rounded-xl border border-[#E5DCD0] bg-white px-3.5 py-3 text-sm sm:text-base font-bold text-[#14123D] focus:border-[#FF6B5B] focus:outline-none min-h-[46px] shadow-2xs"
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
            <label className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#697386] block mb-2">
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
              className="w-full rounded-xl border border-[#E5DCD0] bg-white px-3.5 py-3 text-sm sm:text-base font-bold text-[#14123D] focus:border-[#FF6B5B] focus:outline-none min-h-[46px] shadow-2xs"
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
        <div className="rounded-2xl border border-[#14123D] bg-[#14123D] text-[#FAF5ED] p-6 sm:p-8 shadow-md">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#FF6B5B] mb-2">
            <Sparkles className="h-4 w-4" />
            <span>GulfSaasReview Comparative Analysis</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-editorial text-white mb-3">
            {curatedVerdict.winnerSummary}
          </h3>
          <p className="text-sm sm:text-base text-[#E5DCD0]/90 leading-relaxed">
            {curatedVerdict.gulfContext}
          </p>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* MOBILE RWD COMPARISON VIEW (Cards for < md screens)  */}
      {/* ---------------------------------------------------- */}
      <div className="block md:hidden space-y-6">
        {activeProducts.map((p) => (
          <div
            key={p.id}
            className="rounded-2xl border border-[#E5DCD0] bg-[#FAF5ED] p-5 shadow-xs space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#E5DCD0]">
              <div className="flex items-center gap-3">
                <div
                  className="h-12 w-12 rounded-xl flex items-center justify-center font-bold text-white text-base"
                  style={{ backgroundColor: p.accentColor || "#14123D" }}
                >
                  {p.name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h4 className="font-bold text-lg text-[#14123D]">{p.name}</h4>
                  <span className="text-xs text-[#697386]">{p.categoryName}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-sm font-bold text-[#14123D] bg-white px-2.5 py-1 rounded-lg border border-[#E5DCD0]">
                <Star className="h-4 w-4 fill-[#FF6B5B] text-[#FF6B5B]" />
                <span>{p.rating.toFixed(1)}</span>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-[#E5DCD0]/60">
                <span className="font-semibold text-[#697386]">Starting Price:</span>
                <span className="font-extrabold text-[#14123D] text-base">{p.pricing.startingPrice}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#E5DCD0]/60">
                <span className="font-semibold text-[#697386]">Regional Est:</span>
                <span className="font-bold text-[#D94534]">{p.pricing.tiers[0]?.regionalEstimateSAR || "See Tiers"}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#E5DCD0]/60">
                <span className="font-semibold text-[#697386]">ZATCA E-Invoicing:</span>
                <span className="font-bold text-right text-[#14123D]">{p.gulfSuitabilityAnalysis.zatcaStatus || "Check third-party"}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#E5DCD0]/60">
                <span className="font-semibold text-[#697386]">Arabic Support:</span>
                <span className="font-bold text-right text-[#D94534]">{p.arabicSupport}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#E5DCD0]/60">
                <span className="font-semibold text-[#697386]">Ease of Use:</span>
                <span className="font-bold text-[#14123D]">{p.easeOfUse} / 10</span>
              </div>
              <div className="py-2 border-b border-[#E5DCD0]/60">
                <span className="font-semibold text-[#697386] block mb-1">Best Suited For:</span>
                <p className="font-medium text-emerald-800 text-xs sm:text-sm">{p.verdict.bestFor}</p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href={`/reviews/${p.slug}`}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#14123D] py-3 text-sm font-bold text-white"
              >
                <span>Read Full {p.name} Review</span>
                <ArrowRight className="h-4 w-4 text-[#FF6B5B]" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* ---------------------------------------------------- */}
      {/* DESKTOP TABLE COMPARISON VIEW (Hidden on small screens) */}
      {/* ---------------------------------------------------- */}
      <div className="hidden md:block overflow-x-auto rounded-2xl border border-[#E5DCD0] bg-[#FAF5ED] shadow-xs">
        <table className="w-full text-left border-collapse min-w-[700px]">
          {/* Header Row: Products */}
          <thead>
            <tr className="border-b border-[#E5DCD0] bg-white">
              <th className="p-5 w-1/4 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#697386]">
                Specification
              </th>
              {activeProducts.map((p) => (
                <th key={p.id} className="p-5 w-1/3 align-top border-l border-[#E5DCD0]">
                  <div className="flex items-center gap-3">
                    <div
                      className="h-12 w-12 rounded-xl flex items-center justify-center font-bold text-white text-base shrink-0"
                      style={{ backgroundColor: p.accentColor || "#14123D" }}
                    >
                      {p.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-[#14123D]">
                        {p.name}
                      </h4>
                      <span className="text-xs sm:text-sm text-[#697386]">
                        {p.categoryName}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex items-center gap-1 text-base font-bold text-[#14123D]">
                      <Star className="h-4 w-4 fill-[#FF6B5B] text-[#FF6B5B]" />
                      <span>{p.rating.toFixed(1)}</span>
                    </div>
                    <span className="text-xs sm:text-sm text-[#697386]">
                      (Score: {p.verdict.score}/10)
                    </span>
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    <Link
                      href={`/reviews/${p.slug}`}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-[#14123D] px-4 py-2 text-xs sm:text-sm font-bold text-white hover:bg-[#1E1B59] transition-colors"
                    >
                      <span>Read Review</span>
                      <ArrowRight className="h-3.5 w-3.5 text-[#FF6B5B]" />
                    </Link>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-[#E5DCD0] text-sm">
            {/* 1. Starting Price & Model */}
            <tr className="bg-[#FAF5ED]">
              <td className="p-4 sm:p-5 font-bold text-[#14123D]">Starting Price</td>
              {activeProducts.map((p) => (
                <td key={p.id} className="p-4 sm:p-5 border-l border-[#E5DCD0]">
                  <div className="text-lg font-extrabold text-[#14123D]">
                    {p.pricing.startingPrice}
                  </div>
                  <div className="text-xs sm:text-sm text-[#697386]">
                    {p.pricing.billingPeriod}
                  </div>
                </td>
              ))}
            </tr>

            {/* 2. GCC Regional Cost Estimate */}
            <tr className="bg-white">
              <td className="p-4 sm:p-5 font-bold text-[#14123D]">SAR / AED Estimate</td>
              {activeProducts.map((p) => (
                <td key={p.id} className="p-4 sm:p-5 border-l border-[#E5DCD0]">
                  <div className="font-bold text-[#D94534] text-sm sm:text-base">
                    {p.pricing.tiers[0]?.regionalEstimateSAR || "See tier breakdown"}
                  </div>
                  <div className="text-xs text-[#697386] mt-0.5">
                    {p.pricing.tiers[0]?.regionalEstimateAED}
                  </div>
                </td>
              ))}
            </tr>

            {/* 3. Saudi Arabia ZATCA E-Invoicing */}
            <tr className="bg-[#FAF5ED]">
              <td className="p-4 sm:p-5 font-bold text-[#14123D]">
                Saudi ZATCA E-Invoicing
              </td>
              {activeProducts.map((p) => (
                <td key={p.id} className="p-4 sm:p-5 border-l border-[#E5DCD0]">
                  <div className="font-semibold text-[#14123D] leading-relaxed">
                    {p.gulfSuitabilityAnalysis.zatcaStatus || "Check third-party sync"}
                  </div>
                </td>
              ))}
            </tr>

            {/* 4. UAE VAT 5% Compliance */}
            <tr className="bg-white">
              <td className="p-4 sm:p-5 font-bold text-[#14123D]">
                UAE FTA VAT Readiness
              </td>
              {activeProducts.map((p) => (
                <td key={p.id} className="p-4 sm:p-5 border-l border-[#E5DCD0]">
                  <div className="font-semibold text-[#14123D] leading-relaxed">
                    {p.gulfSuitabilityAnalysis.uaeVatStatus || "Standard tax fields supported"}
                  </div>
                </td>
              ))}
            </tr>

            {/* 5. Arabic Language & RTL */}
            <tr className="bg-[#FAF5ED]">
              <td className="p-4 sm:p-5 font-bold text-[#14123D]">Arabic Support</td>
              {activeProducts.map((p) => (
                <td key={p.id} className="p-4 sm:p-5 border-l border-[#E5DCD0]">
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#FF6B5B]/20 px-2.5 py-1 text-xs font-bold text-[#D94534]">
                    <Globe2 className="h-3.5 w-3.5" />
                    {p.arabicSupport}
                  </span>
                  <p className="text-xs sm:text-sm text-[#556070] mt-2 leading-relaxed">
                    {p.gulfSuitabilityAnalysis.arabicExperience}
                  </p>
                </td>
              ))}
            </tr>

            {/* 6. Country Suitability */}
            <tr className="bg-white">
              <td className="p-4 sm:p-5 font-bold text-[#14123D]">Country Suitability</td>
              {activeProducts.map((p) => (
                <td key={p.id} className="p-4 sm:p-5 border-l border-[#E5DCD0]">
                  <div className="flex flex-wrap gap-1.5">
                    {p.countrySuitability.map((c) => (
                      <span
                        key={c}
                        className="rounded-lg bg-[#14123D]/5 px-2.5 py-1 text-xs font-semibold text-[#14123D]"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </td>
              ))}
            </tr>

            {/* 7. Ease of Use */}
            <tr className="bg-[#FAF5ED]">
              <td className="p-4 sm:p-5 font-bold text-[#14123D]">Ease of Use</td>
              {activeProducts.map((p) => (
                <td key={p.id} className="p-4 sm:p-5 border-l border-[#E5DCD0]">
                  <div className="font-extrabold text-base text-[#14123D]">
                    {p.easeOfUse} / 10
                  </div>
                </td>
              ))}
            </tr>

            {/* 8. Deployment Time */}
            <tr className="bg-white">
              <td className="p-4 sm:p-5 font-bold text-[#14123D]">Typical Deployment</td>
              {activeProducts.map((p) => (
                <td key={p.id} className="p-4 sm:p-5 border-l border-[#E5DCD0]">
                  <div className="font-semibold text-[#14123D]">
                    {p.deploymentTime}
                  </div>
                </td>
              ))}
            </tr>

            {/* 9. Local Integrations */}
            <tr className="bg-[#FAF5ED]">
              <td className="p-4 sm:p-5 font-bold text-[#14123D]">Local Integrations</td>
              {activeProducts.map((p) => (
                <td key={p.id} className="p-4 sm:p-5 border-l border-[#E5DCD0]">
                  <div className="flex flex-wrap gap-1.5">
                    {p.localIntegrations.map((item, idx) => (
                      <span
                        key={idx}
                        className="rounded-md bg-white border border-[#E5DCD0] px-2 py-1 text-xs text-[#14123D] font-medium"
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
              <td className="p-4 sm:p-5 font-bold text-[#14123D]">Key Pros</td>
              {activeProducts.map((p) => (
                <td key={p.id} className="p-4 sm:p-5 border-l border-[#E5DCD0]">
                  <ul className="space-y-2">
                    {p.pros.slice(0, 3).map((pro, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-[#14123D] font-medium leading-relaxed">{pro}</span>
                      </li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>

            {/* 11. Cons */}
            <tr className="bg-[#FAF5ED]">
              <td className="p-4 sm:p-5 font-bold text-[#14123D]">Key Cons</td>
              {activeProducts.map((p) => (
                <td key={p.id} className="p-4 sm:p-5 border-l border-[#E5DCD0]">
                  <ul className="space-y-2">
                    {p.cons.slice(0, 3).map((con, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <X className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-[#14123D] font-medium leading-relaxed">{con}</span>
                      </li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>

            {/* 12. Best Suited For */}
            <tr className="bg-white">
              <td className="p-4 sm:p-5 font-bold text-[#14123D]">Best Suited For</td>
              {activeProducts.map((p) => (
                <td key={p.id} className="p-4 sm:p-5 border-l border-[#E5DCD0]">
                  <div className="font-bold text-emerald-800 text-xs sm:text-sm leading-relaxed">
                    {p.verdict.bestFor}
                  </div>
                </td>
              ))}
            </tr>

            {/* 13. Final Recommendation */}
            <tr className="bg-[#FAF5ED]">
              <td className="p-4 sm:p-5 font-bold text-[#14123D]">Verdict Summary</td>
              {activeProducts.map((p) => (
                <td key={p.id} className="p-4 sm:p-5 border-l border-[#E5DCD0]">
                  <div className="rounded-xl bg-white p-4 border border-[#E5DCD0]">
                    <span className="font-bold text-[#14123D] text-sm sm:text-base block mb-1">
                      {p.verdict.badge}
                    </span>
                    <p className="text-xs sm:text-sm text-[#556070] leading-relaxed">
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
