import React, { Suspense } from "react";
import CompareClient from "./CompareClient";

export const metadata = {
  title: "Compare Business Software Side-by-Side | GulfSaasReview",
  description:
    "Compare software features, ZATCA Phase 2 compliance, UAE VAT compatibility, Arabic RTL support, and pricing models side-by-side for Saudi Arabia and UAE businesses.",
  alternates: {
    canonical: "/compare",
  },
};

export default function ComparePage() {
  return (
    <Suspense
      fallback={
        <section className="bg-sand">
          <div className="wrap pt-10 pb-14 lg:pt-14 lg:pb-16">
            <span className="tag bg-paper text-terracotta-deep">Compare</span>
            <h1 className="display mt-5 text-[clamp(2.5rem,1.4rem+4vw,4.6rem)]">
              Put two or three products <span className="text-terracotta">side by side</span>.
            </h1>
            <p className="mt-6 text-ink-2">Loading the comparison table…</p>
          </div>
        </section>
      }
    >
      <CompareClient />
    </Suspense>
  );
}
