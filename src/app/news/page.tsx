import React, { Suspense } from "react";
import type { Metadata } from "next";
import NewsClient from "./NewsClient";

export const metadata: Metadata = {
  title: "Gulf Technology News & SaaS Dispatches",
  description:
    "Real-time business technology reporting across Saudi Arabia, UAE, Qatar, Kuwait, Bahrain, and Oman. Daily updates on AI, sovereign cloud, enterprise SaaS, and startup venture capital.",
};

export default function NewsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F6F1E7] p-12 text-center text-[#101F35]">Loading GCC technology news...</div>}>
      <NewsClient />
    </Suspense>
  );
}
