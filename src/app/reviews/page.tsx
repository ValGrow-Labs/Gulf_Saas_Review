import React, { Suspense } from "react";
import ReviewsClient from "./ReviewsClient";

export const metadata = {
  title: "Software Reviews Directory | GulfSaasReview",
  description:
    "Browse, filter, and discover business software evaluated for Saudi Arabia, the UAE, and the wider GCC. Filter by category, country suitability, Arabic RTL support, and pricing models.",
};

export default function ReviewsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#FFF8EF]">
          <div className="text-sm font-semibold text-[#064734]">
            Loading Gulf software directory...
          </div>
        </div>
      }
    >
      <ReviewsClient />
    </Suspense>
  );
}

