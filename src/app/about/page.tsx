import React from "react";
import Link from "next/link";
import { softwares } from "@/data/software";
import { comparisons } from "@/data/comparisons";
import { categories } from "@/data/categories";
import { articles } from "@/data/articles";
import Sadu from "@/components/Sadu";
import { pad2 } from "@/lib/format";

export const metadata = {
  title: "About Us & Editorial Methodology | GulfSaasReview",
  description:
    "How GulfSaasReview evaluates business software for Saudi Arabia, the UAE and the GCC: regional compliance, Arabic support, local integrations and data residency.",
};

const C = {
  paper: "#FFFCF6",
  terracotta: "#C24E2A",
  teal: "#0E4B48",
  sand: "#F1D39C",
  sandSoft: "#FAEBCF",
};

const principles = [
  {
    title: "No paid scores",
    body: "We do not accept payment to raise a score, and we do not dress advertising up as an editorial recommendation.",
    panel: "bg-terracotta text-white",
    num: "text-sand",
    copy: "text-white/85",
  },
  {
    title: "Tested on the ground",
    body: "We look at how a product behaves in practice: whether an accounting tool connects to Al Rajhi or Emirates NBD, handles SAR decimals and produces a compliant audit file.",
    panel: "bg-sand text-ink",
    num: "text-terracotta",
    copy: "text-ink-2",
  },
  {
    title: "Written for the Gulf",
    body: "We favour products with a real Arabic right-to-left interface, support that works the local business week, and an in-region hosting option.",
    panel: "bg-teal-soft text-ink",
    num: "text-teal",
    copy: "text-ink-2",
  },
];

const dimensions = [
  {
    title: "Regional regulatory compliance",
    body: "Compatibility with ZATCA Phase 1 and 2 e-invoicing (UBL 2.1 XML, cryptographic signatures, QR stamping), UAE FTA VAT audit file generation, and Wage Protection System requirements.",
    tags: ["ZATCA", "FTA VAT", "WPS"],
  },
  {
    title: "Arabic language and RTL",
    body: "We separate cosmetic website translation from a native Arabic right-to-left admin interface, bilingual customer-facing invoices and an Arabic knowledge base.",
    tags: ["RTL", "Bilingual invoices"],
  },
  {
    title: "Regional payments and integrations",
    body: "Direct connections to Gulf financial infrastructure: Mada, Apple Pay, Tabby and Tamara, regional gateways such as PayTabs, Tap and Telr, and the WhatsApp Business API.",
    tags: ["Mada", "PayTabs", "WhatsApp"],
  },
  {
    title: "Data residency and regional support",
    body: "Alignment with the Saudi PDPL and UAE federal data law, and whether the vendor offers hosting in an in-country cloud region or a certified on-premise option.",
    tags: ["PDPL", "In-country hosting"],
  },
];

const tagTone = ["tag-accent", "tag-teal", "tag-sand"];

export default function AboutPage() {
  const figures = [
    { k: "Products reviewed", v: String(softwares.length) },
    { k: "Comparisons", v: String(comparisons.length) },
    { k: "Categories", v: String(categories.length) },
    { k: "Buyer guides", v: String(articles.length) },
  ];

  return (
    <>
      {/* ============================================================ HERO — teal band */}
      <section aria-labelledby="about-title" className="bg-teal text-teal-soft">
        <div className="wrap pt-14 pb-14 lg:pt-20 lg:pb-20">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
            <div className="lg:col-span-8 rise">
              <span className="inline-flex items-center rounded-full bg-teal-deep px-3.5 py-1.5 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-sand">
                About GulfSaasReview
              </span>
              <h1 id="about-title" className="display mt-6 text-[clamp(2.6rem,1.4rem+4.4vw,5rem)] text-paper">
                Software reviews that start from <span className="text-sand">Gulf</span> rules.
              </h1>
            </div>
            <div className="lg:col-span-4 rise [animation-delay:120ms]">
              <p className="max-w-[48ch] text-[1.075rem] leading-relaxed">
                Global review sites rarely check whether a product supports Saudi ZATCA e-invoicing, handles the UAE Wage Protection System or renders Arabic properly. We started GulfSaasReview to answer those questions first.
              </p>
            </div>
          </div>

          <dl className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-16 lg:grid-cols-4">
            {figures.map((f) => (
              <div key={f.k} className="flex flex-col-reverse justify-end rounded-[24px] bg-sand p-5 text-ink sm:p-6">
                <dt className="mt-2 text-[0.88rem] font-medium text-ink-2">{f.k}</dt>
                <dd className="display text-[clamp(2.4rem,1.8rem+2vw,3.4rem)] leading-none text-terracotta-deep">{f.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <Sadu from={C.teal} to={C.paper} accent={C.sand} />

      {/* ============================================================ PRINCIPLES */}
      <section aria-labelledby="principles-title">
        <div className="wrap py-16 lg:py-24">
          <span className="tag tag-accent">What we stand by</span>
          <h2 id="principles-title" className="h-section mt-4 max-w-[20ch]">
            Three commitments behind every review.
          </h2>

          <ol className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
            {principles.map((p, i) => (
              <li key={p.title} className={`flex flex-col rounded-[28px] p-7 sm:p-8 ${p.panel}`}>
                <span aria-hidden="true" className={`display text-[3rem] leading-none ${p.num}`}>
                  {i + 1}
                </span>
                <h3 className="h-card mt-6 text-[1.55rem]">{p.title}</h3>
                <p className={`mt-3 max-w-[48ch] text-[0.98rem] leading-relaxed ${p.copy}`}>{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ============================================================ METHODOLOGY — sand-soft band */}
      <Sadu from={C.paper} to={C.sandSoft} accent={C.terracotta} />
      <section id="methodology" aria-labelledby="method-title" className="scroll-mt-28 bg-sand-soft">
        <div className="wrap grid grid-cols-1 gap-10 py-16 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <span className="tag tag-teal">Methodology</span>
              <h2 id="method-title" className="h-section mt-4">
                How we evaluate software for the Gulf.
              </h2>
              <p className="mt-5 max-w-[40ch] text-ink-2">
                Every review and comparison is assessed on four dimensions calibrated for operating in Saudi Arabia, the UAE and the wider GCC.
              </p>
              <p className="mt-6 max-w-[40ch] rounded-[18px] bg-paper p-5 text-[0.92rem] leading-relaxed text-ink">
                <span className="font-semibold text-terracotta">Market rule. </span>
                A product that fails a mandatory requirement for a market is not recommended for that market, whatever its overall score.
              </p>
            </div>
          </div>

          <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-8">
            {dimensions.map((d, i) => (
              <li key={d.title} className="flex flex-col rounded-[24px] bg-surface p-6 sm:p-7">
                <span className="num inline-flex h-10 w-10 items-center justify-center rounded-full bg-terracotta text-[0.85rem] font-semibold text-white">
                  {pad2(i + 1)}
                </span>
                <h3 className="h-card mt-5 text-[1.35rem] sm:text-[1.45rem]">{d.title}</h3>
                <p className="mt-3 text-[0.96rem] leading-relaxed text-ink-2">{d.body}</p>
                <p className="mt-auto flex flex-wrap gap-2 pt-5">
                  {d.tags.map((t, j) => (
                    <span key={t} className={`tag ${tagTone[j % tagTone.length]}`}>
                      {t}
                    </span>
                  ))}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <Sadu from={C.sandSoft} to={C.paper} accent={C.teal} />

      {/* ============================================================ DISCLOSURE */}
      <section aria-labelledby="disclosure-title" className="wrap pt-16 lg:pt-24">
        <div className="grid grid-cols-1 gap-4 rounded-[28px] border-[1.5px] border-dashed border-sand bg-paper-2 p-7 sm:p-9 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <p className="kicker kicker-accent">Disclosure</p>
            <h2 id="disclosure-title" className="h-card mt-2 text-[1.6rem]">
              Sample research data
            </h2>
          </div>
          <p className="max-w-[62ch] leading-relaxed text-ink-2 lg:col-span-8">
            The product profiles currently on this site are structured sample evaluations, built to show how our regional rubric works. We do not publish invented user endorsements, and we do not claim formal lab testing where independent benchmarks are still in progress.
          </p>
        </div>
      </section>

      {/* ============================================================ ONWARD */}
      <section aria-labelledby="onward-title" className="wrap py-16 lg:py-24">
        <div className="grid grid-cols-1 items-end gap-8 rounded-[28px] bg-terracotta p-8 text-white sm:p-10 lg:grid-cols-12 lg:p-12">
          <div className="lg:col-span-7">
            <p className="kicker !text-sand">Put the method to work</p>
            <h2 id="onward-title" className="h-section mt-3 max-w-[22ch]">
              See how the products score.
            </h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
            <Link href="/reviews" className="btn btn-sand">
              Browse {softwares.length} reviews
            </Link>
            <Link
              href="/contact?type=vendor"
              className="btn border-[1.5px] border-white/60 text-white hover:border-white hover:bg-white/10"
            >
              Submit a product
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
