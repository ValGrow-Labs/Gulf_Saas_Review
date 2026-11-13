import React from "react";
import Link from "next/link";
import { ShieldCheck, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | GulfSaasReview",
  description: "Privacy policy and regional data protection standards for GulfSaasReview.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#F6F1E7] pb-24">
      <div className="bg-[#FCFAF5] border-b border-[#E7E4DC] pt-12 pb-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#697386] hover:text-[#101F35] mb-6"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold font-editorial text-[#101F35]">
            Privacy Policy
          </h1>
          <p className="mt-2 text-xs text-[#697386]">
            Effective Date: November 2026 • Compliant with Saudi PDPL and UAE Federal Data Protection Regulations
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-10">
        <div className="rounded-2xl border border-[#E7E4DC] bg-[#FCFAF5] p-6 sm:p-10 shadow-xs space-y-6 text-xs sm:text-sm text-[#101F35] leading-relaxed">
          <h2 className="text-base font-bold text-[#101F35]">1. Overview</h2>
          <p className="text-[#697386]">
            GulfSaasReview (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) operates gulfsaasreview.com. We respect the privacy of our visitors and are committed to protecting personal data collected in accordance with applicable regional data protection legislation, including the Saudi Personal Data Protection Law (PDPL) and UAE Federal Decree-Law No. 45 of 2021 on Personal Data Protection.
          </p>

          <h2 className="text-base font-bold text-[#101F35]">2. Information We Collect</h2>
          <p className="text-[#697386]">
            We only collect information voluntarily submitted by you when subscribing to our newsletter, submitting an inquiry via our contact form, or requesting a vendor review listing. We do not sell or monetize personal corporate data to third-party ad brokers.
          </p>

          <h2 className="text-base font-bold text-[#101F35]">3. Use of Information</h2>
          <p className="text-[#697386]">
            Submitted email addresses and contact information are used exclusively to deliver editorial newsletters, respond to editorial inquiries, and provide requested software comparison updates.
          </p>

          <h2 className="text-base font-bold text-[#101F35]">4. Contact & Inquiries</h2>
          <p className="text-[#697386]">
            For data protection inquiries or to request data deletion, contact privacy@gulfsaasreview.com.
          </p>
        </div>
      </div>
    </div>
  );
}

