import React from "react";
import ContactForm from "./ContactForm";
import { Mail, MapPin, ShieldCheck, Clock } from "lucide-react";

export const metadata = {
  title: "Contact GulfSaasReview | Editorial & Vendor Inquiries",
  description:
    "Get in touch with the GulfSaasReview editorial and research team. Request a software review, report a regional compliance update, or discuss media partnerships.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#F6F1E7] pb-24">
      {/* Header */}
      <div className="bg-[#FCFAF5] border-b border-[#E7E4DC] pt-12 pb-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 text-[15px] font-bold uppercase tracking-wider text-[#C6A66B] mb-2.5">
              <Mail className="h-4 w-4" />
              <span>Get in Touch</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-editorial text-[#101F35] tracking-tight">
              Contact Our Research Team
            </h1>
            <p className="mt-3 text-[18px] sm:text-[19px] text-[#334155] leading-relaxed">
              Have questions regarding our regional software reviews? Are you a SaaS vendor seeking an independent evaluation for the Saudi or UAE market? We welcome your inquiry.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Contact Form (Col 7) */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-[#E7E4DC] bg-[#FCFAF5] p-6 sm:p-8 shadow-xs">
              <h2 className="text-2xl font-bold font-editorial text-[#101F35] mb-1">
                Send an Inquiry
              </h2>
              <p className="text-[16px] text-[#64748B] mb-6">
                Our analysts typically respond within one business day (Sunday through Thursday).
              </p>

              <ContactForm />
            </div>
          </div>

          {/* Right Column: Office Hubs & Information (Col 5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-[#E7E4DC] bg-[#FCFAF5] p-6 sm:p-8 shadow-xs space-y-5">
              <h3 className="text-xl font-bold text-[#101F35]">
                Regional Operations &amp; Coverage
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3.5 p-4 rounded-xl bg-[#F6F1E7] border border-[#E7E4DC]">
                  <MapPin className="h-5 w-5 text-[#C6A66B] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#101F35] block text-base mb-1">
                      Riyadh Research Desk
                    </strong>
                    <span className="text-[16px] text-[#475569] leading-relaxed block">
                      King Fahd Road, Al Olaya District, Riyadh, Kingdom of Saudi Arabia
                    </span>
                    <div className="text-[14px] text-[#8C6D33] font-bold mt-1.5">
                      Focus: ZATCA Compliance, Qiwa/GOSI &amp; Saudi PDPL
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-xl bg-[#F6F1E7] border border-[#E7E4DC]">
                  <MapPin className="h-5 w-5 text-[#C6A66B] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#101F35] block text-base mb-1">
                      Dubai Editorial Office
                    </strong>
                    <span className="text-[16px] text-[#475569] leading-relaxed block">
                      Dubai Internet City, Building 3, Dubai, United Arab Emirates
                    </span>
                    <div className="text-[14px] text-[#8C6D33] font-bold mt-1.5">
                      Focus: UAE VAT 5%, Free Zone SaaS &amp; Regional Startups
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E7E4DC] flex items-center gap-2.5 text-[15px] text-[#475569] font-medium">
                <Clock className="h-4 w-4 text-[#C6A66B]" />
                <span>
                  Sunday – Thursday: 9:00 AM – 6:00 PM (GMT+3 / GMT+4)
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-[#223859] bg-[#101F35] text-[#FCFAF5] p-6 sm:p-8 shadow-md">
              <div className="flex items-center gap-2 text-[14px] font-bold uppercase tracking-wider text-[#C6A66B] mb-2">
                <ShieldCheck className="h-4 w-4" />
                <span>Vendor Inclusion Policy</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Are You a Business Software Vendor?
              </h3>
              <p className="text-[16px] text-[#CBD5E1] leading-relaxed mb-4">
                We accept listing requests from vendors offering software localized for Saudi Arabia, UAE, or GCC businesses. Inclusion is determined based on our independent evaluation rubric and verified regional integrations.
              </p>
              <div className="text-[16px] text-[#C6A66B] font-bold">
                Direct vendor desk: vendor-desk@gulfsaasreview.com
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
