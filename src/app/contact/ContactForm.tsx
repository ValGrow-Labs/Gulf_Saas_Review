"use client";

import React, { useState } from "react";
import { CheckCircle2, Send, AlertCircle } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    inquiryType: "General Inquiry",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus("error");
      setErrorMessage("Please complete all required fields (Name, Email, Message).");
      return;
    }

    if (!formData.email.includes("@")) {
      setStatus("error");
      setErrorMessage("Please enter a valid corporate email address.");
      return;
    }

    setStatus("loading");

    // Simulate instant secure processing
    setTimeout(() => {
      setStatus("success");
    }, 600);
  };

  if (status === "success") {
    return (
      <div className="rounded-xl border border-emerald-500/40 bg-emerald-50/60 p-8 text-center animate-in zoom-in-95 duration-200">
        <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-600 mb-3" />
        <h3 className="text-xl font-bold font-editorial text-[#101F35]">
          Message Successfully Received
        </h3>
        <p className="mt-2 text-xs sm:text-sm text-[#697386] max-w-md mx-auto leading-relaxed">
          Thank you, <strong className="text-[#101F35]">{formData.name}</strong>. Your inquiry regarding &ldquo;{formData.subject || formData.inquiryType}&rdquo; has been routed to our regional editorial desk in Riyadh and Dubai.
        </p>
        <p className="mt-2 text-xs text-[#697386]">
          We will contact you at <strong className="text-[#101F35]">{formData.email}</strong> shortly.
        </p>

        <button
          onClick={() => {
            setStatus("idle");
            setFormData({
              name: "",
              email: "",
              company: "",
              inquiryType: "General Inquiry",
              subject: "",
              message: "",
            });
          }}
          className="mt-6 inline-flex items-center gap-1.5 rounded-xl bg-[#101F35] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#172B46] transition-colors"
        >
          <span>Send Another Message</span>
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {status === "error" && (
        <div className="flex items-center gap-2 rounded-xl border border-rose-300 bg-rose-50 p-3 text-xs text-rose-800">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Row 1: Name & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-[#101F35] block mb-1.5">
            Full Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Faisal Al-Harbi"
            required
            className="w-full rounded-xl border border-[#E7E4DC] bg-white px-3.5 py-2.5 text-sm text-[#101F35] placeholder-[#697386] focus:border-[#C6A66B] focus:outline-none"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-[#101F35] block mb-1.5">
            Business Email <span className="text-rose-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="faisal@company.sa"
            required
            className="w-full rounded-xl border border-[#E7E4DC] bg-white px-3.5 py-2.5 text-sm text-[#101F35] placeholder-[#697386] focus:border-[#C6A66B] focus:outline-none"
          />
        </div>
      </div>

      {/* Row 2: Company & Inquiry Type */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-[#101F35] block mb-1.5">
            Company Name
          </label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="e.g. Al-Riyadh Logistics"
            className="w-full rounded-xl border border-[#E7E4DC] bg-white px-3.5 py-2.5 text-sm text-[#101F35] placeholder-[#697386] focus:border-[#C6A66B] focus:outline-none"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-[#101F35] block mb-1.5">
            Inquiry Topic
          </label>
          <select
            name="inquiryType"
            value={formData.inquiryType}
            onChange={handleChange}
            className="w-full rounded-xl border border-[#E7E4DC] bg-white px-3.5 py-2.5 text-sm text-[#101F35] focus:border-[#C6A66B] focus:outline-none"
          >
            <option value="Vendor Review Request">Vendor Review Request (Listing)</option>
            <option value="Editorial Inquiry">Editorial & Research Inquiry</option>
            <option value="Regional Compliance Update">Report Compliance / ZATCA Update</option>
            <option value="Partnership & Press">Partnership & Media</option>
            <option value="General Inquiry">General Question</option>
          </select>
        </div>
      </div>

      {/* Subject */}
      <div>
        <label className="text-xs font-bold text-[#101F35] block mb-1.5">
          Subject
        </label>
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Brief summary of your inquiry"
          className="w-full rounded-xl border border-[#E7E4DC] bg-white px-3.5 py-2.5 text-sm text-[#101F35] placeholder-[#697386] focus:border-[#C6A66B] focus:outline-none"
        />
      </div>

      {/* Message */}
      <div>
        <label className="text-xs font-bold text-[#101F35] block mb-1.5">
          Message <span className="text-rose-500">*</span>
        </label>
        <textarea
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          placeholder="Please share details regarding your inquiry, regional market questions, or software specifications..."
          required
          className="w-full rounded-xl border border-[#E7E4DC] bg-white p-3.5 text-sm text-[#101F35] placeholder-[#697386] focus:border-[#C6A66B] focus:outline-none"
        />
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#101F35] px-6 py-3.5 text-xs font-bold text-[#FCFAF5] hover:bg-[#172B46] active:scale-98 transition-all shadow-sm w-full sm:w-auto cursor-pointer"
        >
          <Send className="h-4 w-4 text-[#C6A66B]" />
          <span>{status === "loading" ? "Submitting..." : "Send Message to Editorial Desk"}</span>
        </button>
      </div>
    </form>
  );
}

