import React, { Suspense } from "react";
import CompareClient from "./CompareClient";

export const metadata = {
  title: "Compare Business Software Side-by-Side | GulfSaasReview",
  description:
    "Compare software features, ZATCA Phase 2 compliance, UAE VAT compatibility, Arabic RTL support, and pricing models side-by-side for Saudi Arabia and UAE businesses.",
};

export default function ComparePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#F9F6F0]">
          <div className="text-sm font-semibold text-[#1F3D2B]">
            Loading software comparison engine...
          </div>
        </div>
      }
    >
      <CompareClient />
    </Suspense>
  );
}

