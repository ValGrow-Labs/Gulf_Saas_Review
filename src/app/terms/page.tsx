import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Terms & Conditions | GulfSaasReview",
  description: "Terms and conditions of use for GulfSaasReview.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#F6F1E7] pb-24">
      <div className="bg-[#FCFAF5] border-b border-[#E7E4DC] pt-12 pb-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[15px] font-bold text-[#64748B] hover:text-[#101F35] mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold font-editorial text-[#101F35]">
            Terms &amp; Conditions
          </h1>
          <p className="mt-3 text-[16px] text-[#64748B]">
            Last Updated: November 2026
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-10">
        <div className="rounded-2xl border border-[#E7E4DC] bg-[#FCFAF5] p-6 sm:p-10 shadow-xs space-y-6 text-[18px] text-[#1E293B] leading-relaxed">
          <h2 className="text-2xl font-bold text-[#101F35]">1. Acceptance of Terms</h2>
          <p className="text-[#334155]">
            By accessing or using GulfSaasReview (gulfsaasreview.com), you agree to be bound by these Terms and Conditions and our Privacy Policy.
          </p>

          <h2 className="text-2xl font-bold text-[#101F35]">2. Independent Editorial Information</h2>
          <p className="text-[#334155]">
            The evaluations, ratings, comparisons, and guides provided on this website are for educational and informational purposes only. While we endeavor to keep regional compliance statuses (such as ZATCA or UAE VAT) up to date, software vendors frequently alter product capabilities. Users must perform their own due diligence prior to entering commercial contracts.
          </p>

          <h2 className="text-2xl font-bold text-[#101F35]">3. Trademarks &amp; Intellectual Property</h2>
          <p className="text-[#334155]">
            All brand names, product logos, and registered trademarks mentioned on GulfSaasReview belong to their respective proprietary owners. Their mention does not imply sponsorship or formal commercial affiliation unless expressly specified.
          </p>
        </div>
      </div>
    </div>
  );
}
