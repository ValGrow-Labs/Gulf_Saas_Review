import React, { Suspense } from "react";
import ReviewsClient from "./ReviewsClient";

export const metadata = {
  title: "Software reviews",
  description:
    "Browse business software reviewed for Saudi Arabia, the UAE and the wider GCC. Filter by category, market, Arabic support and pricing model.",
};

export default function ReviewsPage() {
  return (
    <Suspense
      fallback={
        <section className="bg-teal text-teal-soft">
          <div className="wrap py-28">
            <p className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.07em] text-sand">
              Loading the review index…
            </p>
          </div>
        </section>
      }
    >
      <ReviewsClient />
    </Suspense>
  );
}
