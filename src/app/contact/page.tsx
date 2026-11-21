import React from "react";
import Link from "next/link";
import Sadu from "@/components/Sadu";
import ContactForm from "./ContactForm";

export const metadata = {
  title: "Contact GulfSaasReview | Editorial & Vendor Inquiries",
  description:
    "Contact the GulfSaasReview editorial and research team. Request a software review, report a regional compliance change, or ask about partnerships.",
};

const C = {
  paper: "#FFFCF6",
  paper2: "#F7F0E4",
  terracotta: "#C24E2A",
  teal: "#0E4B48",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { type } = await searchParams;
  const isVendor = type === "vendor";

  return (
    <>
      {/* ============================================================ HEADER */}
      <section aria-labelledby="contact-title" className="wrap pt-12 pb-12 lg:pt-20 lg:pb-16">
        <div className="max-w-[54rem] rise">
          <nav aria-label="Contact type" className="flex flex-wrap gap-2">
            <Link href="/contact" className="chip" aria-current={!isVendor ? "page" : undefined}>
              General enquiry
            </Link>
            <Link href="/contact?type=vendor" className="chip" aria-current={isVendor ? "page" : undefined}>
              Submit a product
            </Link>
          </nav>
          <h1 id="contact-title" className="display mt-7 text-[clamp(2.6rem,1.4rem+4.4vw,5rem)]">
            {isVendor ? (
              <>
                Submit a product <span className="text-terracotta">for review.</span>
              </>
            ) : (
              <>
                Write to the <span className="text-terracotta">research desk.</span>
              </>
            )}
          </h1>
          <p className="mt-6 max-w-[56ch] text-[1.125rem] leading-relaxed text-ink-2">
            {isVendor
              ? "We review software localised for Saudi Arabia, the UAE or the wider GCC. Inclusion depends on our evaluation rubric and verified regional integrations — not on payment."
              : "Questions about a review, a compliance change we should know about, or a product you want us to look at. Analysts usually reply within one business day."}
          </p>
        </div>
      </section>

      {/* ============================================================ FORM + INFO */}
      <Sadu from={C.paper} to={C.paper2} accent={isVendor ? C.terracotta : C.teal} />
      <section aria-label="Contact form and details" className="bg-paper-2">
        <div className="wrap grid grid-cols-1 gap-6 py-12 lg:grid-cols-12 lg:gap-8 lg:py-20">
          <div className="lg:col-span-7">
            <div className="card p-6 sm:p-9">
              <span className={`tag ${isVendor ? "tag-accent" : "tag-teal"}`}>
                {isVendor ? "Vendor desk" : "Editorial desk"}
              </span>
              <h2 className="h-card mt-4 text-[1.75rem]">{isVendor ? "Product details" : "Send a message"}</h2>
              <p className="mt-2 text-[0.9rem] text-ink-3">
                Fields marked <span className="text-terracotta">*</span> are required.
              </p>
              <div className="mt-8">
                <ContactForm
                  key={isVendor ? "vendor" : "general"}
                  initialType={isVendor ? "Vendor Review Request" : "General Inquiry"}
                />
              </div>
            </div>
          </div>

          <aside aria-label="Contact details" className="flex flex-col gap-4 lg:col-span-5">
            <div className="rounded-[24px] bg-teal p-6 text-teal-soft sm:p-7">
              <h2 className="kicker !text-sand">Response time</h2>
              <p className="h-card mt-3 text-[1.4rem] text-paper">Within one business day, Sunday to Thursday.</p>
              <p className="num mt-4 text-[0.85rem]">
                Sun–Thu · 09:00–18:00
                <span className="block text-teal-soft/75">GMT+3 Riyadh / GMT+4 Dubai</span>
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <div className="rounded-[24px] bg-sand-soft p-6">
                <h2 className="kicker kicker-accent">Riyadh research desk</h2>
                <p className="mt-3 font-semibold leading-snug text-ink">King Fahd Road, Al Olaya District, Riyadh, Saudi Arabia</p>
                <p className="mt-2 text-[0.86rem] leading-relaxed text-ink-2">ZATCA compliance, Qiwa and GOSI, Saudi PDPL</p>
              </div>
              <div className="rounded-[24px] bg-teal-soft p-6">
                <h2 className="kicker !text-teal">Dubai editorial office</h2>
                <p className="mt-3 font-semibold leading-snug text-ink">Dubai Internet City, Building 3, Dubai, UAE</p>
                <p className="mt-2 text-[0.86rem] leading-relaxed text-ink-2">UAE VAT, free-zone SaaS, regional start-ups</p>
              </div>
            </div>

            <div
              className={`rounded-[24px] p-6 sm:p-7 ${
                isVendor ? "bg-terracotta text-white" : "bg-terracotta-soft text-ink"
              }`}
            >
              <h2 className={`kicker ${isVendor ? "!text-sand" : "kicker-accent"}`}>Vendor inclusion policy</h2>
              <p className={`mt-3 text-[0.95rem] leading-relaxed ${isVendor ? "text-white/90" : "text-ink-2"}`}>
                We accept listing requests from vendors whose software is localised for Saudi Arabia, the UAE or GCC businesses. Inclusion is decided by our independent rubric and verified regional integrations.
              </p>
              <p className="mt-4 text-[0.9rem]">
                <span className={isVendor ? "text-white/75" : "text-ink-3"}>Vendor desk: </span>
                <a href="mailto:vendor-desk@gulfsaasreview.com" className={`link break-all ${isVendor ? "hover:!text-sand" : ""}`}>
                  vendor-desk@gulfsaasreview.com
                </a>
              </p>
              <Link href="/about#methodology" className={`arrow-link mt-4 ${isVendor ? "hover:!text-sand" : ""}`}>
                How we evaluate
              </Link>
            </div>
          </aside>
        </div>
      </section>
      <Sadu from={C.paper2} to={C.paper} accent={C.terracotta} />
      <div aria-hidden="true" className="h-12 lg:h-16" />
    </>
  );
}
