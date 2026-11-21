import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | GulfSaasReview",
  description: "Privacy policy and regional data protection standards for GulfSaasReview.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#FFF8EF] pb-24">
      <div className="bg-[#FFF8EF] border-b border-[#E5DAC8] pt-12 pb-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[15px] font-bold text-[#64748B] hover:text-[#064734] mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold font-editorial text-[#064734]">
            Privacy Policy
          </h1>
          <p className="mt-3 text-[16px] text-[#64748B]">
            Effective Date: November 2026 â€¢ Compliant with Saudi PDPL and UAE Federal Data Protection Regulations
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-10">
        <div className="rounded-2xl border border-[#E5DAC8] bg-[#FFF8EF] p-6 sm:p-10 shadow-xs space-y-6 text-[18px] text-[#1E293B] leading-relaxed">
          <h2 className="text-2xl font-bold text-[#064734]">1. Overview</h2>
          <p className="text-[#334155]">
            GulfSaasReview (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) operates gulfsaasreview.com. We respect the privacy of our visitors and are committed to protecting personal data collected in accordance with applicable regional data protection legislation, including the Saudi Personal Data Protection Law (PDPL) and UAE Federal Decree-Law No. 45 of 2021 on Personal Data Protection.
          </p>

          <h2 className="text-2xl font-bold text-[#064734]">2. Information We Collect</h2>
          <p className="text-[#334155]">
            We only collect information voluntarily submitted by you when subscribing to our newsletter, submitting an inquiry via our contact form, or requesting a vendor review listing. We do not sell or monetize personal corporate data to third-party ad brokers.
          </p>

          <h2 className="text-2xl font-bold text-[#064734]">3. Use of Information</h2>
          <p className="text-[#334155]">
            Submitted email addresses and contact information are used exclusively to deliver editorial newsletters, respond to editorial inquiries, and provide requested software comparison updates.
          </p>

          <h2 className="text-2xl font-bold text-[#064734]">4. Contact &amp; Inquiries</h2>
          <p className="text-[#334155]">
            For data protection inquiries or to request data deletion, contact privacy@gulfsaasreview.com.
          </p>
        </div>
      </div>
    </div>
  );
}
