import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Building2,
  Compass,
  Scale,
  ArrowRight,
} from "lucide-react";

export const metadata = {
  title: "About Us & Editorial Methodology | GulfSaasReview",
  description:
    "Learn how GulfSaasReview makes business software decisions easier for companies across the Middle East through practical research, regional compliance auditing, and transparency.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FFF8EF] pb-24">
      {/* Header Banner */}
      <div className="bg-[#FFF8EF] border-b border-[#EAE2D5] pt-14 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 text-[15px] font-bold uppercase tracking-wider text-[#16A34A] mb-3">
              <ShieldCheck className="h-4 w-4" />
              <span>Independent Platform Mission</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-editorial text-[#0B3D2E] tracking-tight leading-tight">
              Making business software decisions easier for companies across the Middle East.
            </h1>
            <p className="mt-4 text-[19px] sm:text-[20px] text-[#334155] leading-relaxed">
              GulfSaasReview was founded on a simple observation: global software review sites rarely evaluate whether a tool supports Saudi ZATCA e-invoicing, understands UAE Wage Protection Systems, or renders authentic Arabic typography.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 space-y-16">
        {/* Three Core Pillars */}
        <section>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[15px] font-bold uppercase tracking-wider text-[#16A34A] block mb-2">
              Our Foundations
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-editorial text-[#0B3D2E]">
              Built on Three Uncompromising Standards
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-2xl border border-[#EAE2D5] bg-[#FFF8EF] p-7 shadow-xs">
              <div className="flex h-13 w-13 items-center justify-center rounded-xl bg-[#0B3D2E] text-[#16A34A] mb-5">
                <ShieldCheck className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-[#0B3D2E] mb-2.5">
                1. Uncompromising Transparency
              </h3>
              <p className="text-[17px] text-[#475569] leading-relaxed">
                We believe buyers deserve unfiltered truth. We do not accept payment to artificially inflate review scores or disguise marketing advertisements as genuine editorial recommendations.
              </p>
            </div>

            <div className="rounded-2xl border border-[#EAE2D5] bg-[#FFF8EF] p-7 shadow-xs">
              <div className="flex h-13 w-13 items-center justify-center rounded-xl bg-[#0B3D2E] text-[#16A34A] mb-5">
                <Compass className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-[#0B3D2E] mb-2.5">
                2. Practical Regional Research
              </h3>
              <p className="text-[17px] text-[#475569] leading-relaxed">
                We assess products based on how they actually operate on the ground: whether an accounting tool connects to Al Rajhi bank or ENBD, handles SAR currency decimals, and generates compliant audit files.
              </p>
            </div>

            <div className="rounded-2xl border border-[#EAE2D5] bg-[#FFF8EF] p-7 shadow-xs">
              <div className="flex h-13 w-13 items-center justify-center rounded-xl bg-[#0B3D2E] text-[#16A34A] mb-5">
                <Building2 className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-[#0B3D2E] mb-2.5">
                3. Gulf Market Relevance
              </h3>
              <p className="text-[17px] text-[#475569] leading-relaxed">
                Middle Eastern business is distinct. We prioritize platforms with localized Arabic RTL interfaces, Middle Eastern support operating on local business weeks, and sovereign cloud residency.
              </p>
            </div>
          </div>
        </section>

        {/* Editorial Methodology Section */}
        <section
          id="methodology"
          className="rounded-3xl border border-[#16A34A]/40 bg-[#FFF8EF] p-8 sm:p-12 shadow-sm"
        >
          <div className="max-w-3xl mb-10">
            <span className="text-[15px] font-bold uppercase tracking-wider text-[#16A34A] block mb-2">
              Evaluation Rubric
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-editorial text-[#0B3D2E]">
              How We Evaluate Software for the Gulf
            </h2>
            <p className="mt-3 text-[18px] sm:text-[19px] text-[#475569] leading-relaxed">
              Every software profile and comparison on GulfSaasReview is analyzed across four core dimensions specifically calibrated for Middle Eastern operations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="rounded-2xl border border-[#EAE2D5] bg-white p-7 shadow-2xs">
              <div className="flex items-center gap-2.5 mb-3.5 text-lg font-bold text-[#0B3D2E]">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0B3D2E] text-white text-sm font-bold">
                  1
                </span>
                <span>Regional Regulatory Compliance</span>
              </div>
              <p className="text-[17px] text-[#475569] leading-relaxed">
                We verify compatibility with Saudi Arabia ZATCA Phase 1 &amp; 2 e-invoicing standards (XML UBL 2.1, cryptographic signatures, QR stamping), UAE Federal Tax Authority (FTA) 5% VAT audit file generation, and Wage Protection System (WPS) requirements.
              </p>
            </div>

            <div className="rounded-2xl border border-[#EAE2D5] bg-white p-7 shadow-2xs">
              <div className="flex items-center gap-2.5 mb-3.5 text-lg font-bold text-[#0B3D2E]">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0B3D2E] text-white text-sm font-bold">
                  2
                </span>
                <span>Arabic Language &amp; RTL Localization</span>
              </div>
              <p className="text-[17px] text-[#475569] leading-relaxed">
                We distinguish between cosmetic website translations and true native Arabic right-to-left (RTL) administrative dashboards, bilingual client-facing invoices, and Arabic knowledge bases.
              </p>
            </div>

            <div className="rounded-2xl border border-[#EAE2D5] bg-white p-7 shadow-2xs">
              <div className="flex items-center gap-2.5 mb-3.5 text-lg font-bold text-[#0B3D2E]">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0B3D2E] text-white text-sm font-bold">
                  3
                </span>
                <span>Regional Payment &amp; Ecosystem Integrations</span>
              </div>
              <p className="text-[17px] text-[#475569] leading-relaxed">
                We audit direct connectivity to critical Gulf financial infrastructure: Mada debit cards, Apple Pay, Buy Now Pay Later leaders (Tabby and Tamara), regional gateways (PayTabs, Tap, Telr), and telecom WhatsApp APIs.
              </p>
            </div>

            <div className="rounded-2xl border border-[#EAE2D5] bg-white p-7 shadow-2xs">
              <div className="flex items-center gap-2.5 mb-3.5 text-lg font-bold text-[#0B3D2E]">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0B3D2E] text-white text-sm font-bold">
                  4
                </span>
                <span>Data Residency &amp; Regional Support Availability</span>
              </div>
              <p className="text-[17px] text-[#475569] leading-relaxed">
                We evaluate alignment with Saudi Personal Data Protection Law (PDPL) and UAE Federal Data Law, noting whether software provides options for hosting on AWS UAE, Google Cloud Dammam, or certified on-premise infrastructure.
              </p>
            </div>
          </div>
        </section>

        {/* Editorial Standards Notice */}
        <section className="rounded-2xl border border-[#172B46] bg-[#0B3D2E] text-[#FFF8EF] p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#16A34A] text-[#0B3D2E]">
              <Scale className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">
                Distinction Between Sample Research Data &amp; Commercial Endorsements
              </h3>
              <p className="text-[17px] text-[#CBD5E1] leading-relaxed max-w-4xl">
                GulfSaasReview adheres to strict editorial neutrality. The product profiles currently showcased on this platform represent structured sample evaluation profiles designed to demonstrate regional software suitability rubrics. We do not fabricate user endorsements or claim formal laboratory testing where independent benchmarks are ongoing.
              </p>
            </div>
          </div>
        </section>

        {/* CTA to Explore */}
        <div className="text-center pt-4">
          <Link
            href="/reviews"
            className="inline-flex items-center gap-2 rounded-xl bg-[#0B3D2E] px-8 py-4 text-[17px] font-bold text-[#FFF8EF] hover:bg-[#172B46] shadow-sm min-h-[50px]"
          >
            <span>Explore Gulf Software Directory</span>
            <ArrowRight className="h-5 w-5 text-[#16A34A]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
