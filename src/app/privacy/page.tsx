import React from "react";
import Link from "next/link";
import Sadu from "@/components/Sadu";
import { pad2 } from "@/lib/format";

export const metadata = {
  title: "Privacy Policy | GulfSaasReview",
  description: "Privacy policy and regional data protection standards for GulfSaasReview.",
  alternates: {
    canonical: "/privacy",
  },
};

interface LegalSection {
  id: string;
  title: string;
  body: React.ReactNode[];
}

const sections: LegalSection[] = [
  {
    id: "overview",
    title: "Overview",
    body: [
      <>
        GulfSaasReview (&ldquo;we&rdquo;, &ldquo;us&rdquo; or &ldquo;our&rdquo;) operates gulfsaasreview.com. We respect the privacy of our visitors and protect the personal data we collect in line with applicable regional law, including the Saudi Personal Data Protection Law (PDPL) and UAE Federal Decree-Law No. 45 of 2021 on Personal Data Protection.
      </>,
    ],
  },
  {
    id: "information-we-collect",
    title: "Information we collect",
    body: [
      "We only collect information you choose to give us: when you subscribe to the newsletter, send a message through the contact form, or request a vendor review. We do not sell or rent personal data to advertising brokers or other third parties.",
    ],
  },
  {
    id: "use-of-information",
    title: "How we use it",
    body: [
      "Email addresses and contact details are used only to send the newsletter you asked for, reply to your enquiry, and send the software comparison updates you requested.",
    ],
  },
  {
    id: "contact",
    title: "Contact and data requests",
    body: [
      <>
        To ask a data protection question or request deletion of your data, email{" "}
        <a href="mailto:privacy@gulfsaasreview.com" className="link">
          privacy@gulfsaasreview.com
        </a>
        .
      </>,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalDocument
      eyebrow="Legal"
      title="Privacy policy"
      intro="What personal data we collect, why we collect it, and how to ask us to delete it."
      meta={<>Effective November 2026 · Saudi PDPL · UAE Federal Decree-Law No. 45 of 2021</>}
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
