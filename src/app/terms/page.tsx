import React from "react";
import Link from "next/link";
import Sadu from "@/components/Sadu";
import { pad2 } from "@/lib/format";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions of use for GulfSaasReview.",
  alternates: {
    canonical: "/terms",
  },
};

interface LegalSection {
  id: string;
  title: string;
  body: React.ReactNode[];
}

const sections: LegalSection[] = [
  {
    id: "acceptance",
    title: "Acceptance of terms",
    body: [
      <>
        By accessing or using GulfSaasReview (gulfsaasreview.com), you agree to these terms and conditions and to our{" "}
        <Link href="/privacy" className="link">
          privacy policy
        </Link>
        .
      </>,
    ],
  },
  {
    id: "editorial-information",
    title: "Independent editorial information",
    body: [
      "The evaluations, ratings, comparisons and guides on this website are for information only. We work to keep regional compliance statuses, such as ZATCA or UAE VAT, up to date, but vendors change their products often. Do your own due diligence before signing a commercial contract.",
    ],
  },
  {
    id: "trademarks",
    title: "Trademarks and intellectual property",
    body: [
      "All brand names, product logos and registered trademarks mentioned on GulfSaasReview belong to their owners. Mentioning them does not imply sponsorship or a commercial relationship unless we say so explicitly.",
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalDocument
      eyebrow="Legal"
      title="Terms and conditions"
      intro="The terms that apply when you read, share or rely on anything published on GulfSaasReview."
      meta={<>Last updated November 2026</>}
      sections={sections}
    />
  );
}

function LegalDocument({
  eyebrow,
  title,
  meta,
  intro,
  sections,
}: {
  eyebrow: string;
  title: string;
  meta: React.ReactNode;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <header className="bg-sand-soft">
        <div className="wrap pt-12 pb-12 lg:pt-20 lg:pb-16">
          <div className="max-w-[52rem] rise">
            <span className="tag tag-accent">{eyebrow}</span>
            <h1 className="display mt-6 text-[clamp(2.6rem,1.4rem+4vw,4.5rem)]">{title}</h1>
            <p className="mt-6 max-w-[60ch] text-[1.1rem] leading-relaxed text-ink-2">{intro}</p>
            <p className="num mt-6 inline-flex rounded-full bg-paper px-4 py-2 text-[0.76rem] text-ink-2">{meta}</p>
          </div>
        </div>
      </header>
      <Sadu from="#FAEBCF" to="#FFFCF6" accent="#C24E2A" />

      <div className="wrap grid grid-cols-1 gap-10 py-12 lg:grid-cols-12 lg:gap-12 lg:py-20">
        <nav aria-labelledby="toc-title" className="lg:col-span-4 xl:col-span-3">
          <div className="rounded-[24px] bg-sand-soft p-5 sm:p-6 lg:sticky lg:top-28">
            <h2 id="toc-title" className="kicker kicker-accent">
              On this page
            </h2>
            <ol className="mt-3">
              {sections.map((s, i) => (
                <li key={s.id} className="border-t-[1.5px] border-dashed border-sand first:border-t-0">
                  <a
                    href={`#${s.id}`}
                    className="group grid grid-cols-[2.25rem_1fr] items-baseline gap-2 py-3 text-[0.95rem] font-medium text-ink transition-colors hover:text-terracotta"
                  >
                    <span className="display text-[1.35rem] leading-none text-terracotta">{i + 1}</span>
                    <span>{s.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>

        <article className="min-w-0 lg:col-span-8 xl:col-span-7 xl:col-start-5">
          {sections.map((s, i) => (
            <section
              key={s.id}
              id={s.id}
              aria-labelledby={`${s.id}-title`}
              className="scroll-mt-28 pb-12 last:pb-4"
            >
              <p className="num text-[0.78rem] font-semibold text-terracotta">Section {pad2(i + 1)}</p>
              <h2 id={`${s.id}-title`} className="display mt-2 text-[clamp(1.75rem,1.4rem+1.2vw,2.3rem)]">
                {s.title}
              </h2>
              <div className="mt-5 space-y-4">
                {s.body.map((p, j) => (
                  <p key={j} className="max-w-[68ch] text-[1.08rem] leading-[1.75] text-[#2E2620]">
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ))}

          <div className="mt-6 flex flex-col gap-4 rounded-[24px] bg-teal-soft p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
            <p className="h-card text-[1.2rem] text-ink">Questions about this page?</p>
            <Link href="/contact" className="btn btn-primary btn-sm self-start sm:self-auto">
              Contact the editors →
            </Link>
          </div>
        </article>
      </div>
    </>
  );
}
