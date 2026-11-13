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
      <div className="rounded-2xl border border-emerald-500/50 bg-emerald-50/70 p-8 text-center animate-in zoom-in-95 duration-200">
        <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-600 mb-3" />
        <h3 className="text-2xl font-bold font-editorial text-[#1F3D2B]">
          Message Successfully Received
        </h3>
        <p className="mt-2 text-[17px] text-[#334155] max-w-md mx-auto leading-relaxed">
          Thank you, <strong className="text-[#1F3D2B]">{formData.name}</strong>. Your inquiry regarding &ldquo;{formData.subject || formData.inquiryType}&rdquo; has been routed to our regional editorial desk in Riyadh and Dubai.
        </p>
        <p className="mt-2 text-[16px] text-[#475569]">
          We will contact you at <strong className="text-[#1F3D2B]">{formData.email}</strong> shortly.
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
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#1F3D2B] px-6 py-3.5 text-[16px] font-bold text-white hover:bg-[#173022] transition-colors"
        >
          <span>Send Another Message</span>
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {status === "error" && (
        <div className="flex items-center gap-2.5 rounded-xl border border-rose-300 bg-rose-50 p-4 text-[15px] text-rose-800">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Row 1: Name & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="text-[16px] font-bold text-[#1F3D2B] block mb-2">
            Full Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Faisal Al-Harbi"
            required
            className="w-full rounded-xl border border-[#D8CABA] bg-white px-4 py-3.5 text-[17px] text-[#1F3D2B] placeholder-[#64748B] focus:border-[#C6A66B] focus:outline-none min-h-[48px]"
          />
        </div>

        <div>
          <label className="text-[16px] font-bold text-[#1F3D2B] block mb-2">
            Business Email <span className="text-rose-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="faisal@company.sa"
            required
            className="w-full rounded-xl border border-[#D8CABA] bg-white px-4 py-3.5 text-[17px] text-[#1F3D2B] placeholder-[#64748B] focus:border-[#C6A66B] focus:outline-none min-h-[48px]"
          />
        </div>
      </div>

      {/* Row 2: Company & Inquiry Type */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="text-[16px] font-bold text-[#1F3D2B] block mb-2">
            Company Name
          </label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="e.g. Al-Riyadh Logistics"
            className="w-full rounded-xl border border-[#D8CABA] bg-white px-4 py-3.5 text-[17px] text-[#1F3D2B] placeholder-[#64748B] focus:border-[#C6A66B] focus:outline-none min-h-[48px]"
          />
        </div>

        <div>
          <label className="text-[16px] font-bold text-[#1F3D2B] block mb-2">
            Inquiry Topic
          </label>
          <select
            name="inquiryType"
            value={formData.inquiryType}
            onChange={handleChange}
            className="w-full rounded-xl border border-[#D8CABA] bg-white px-4 py-3.5 text-[16px] font-semibold text-[#1F3D2B] focus:border-[#C6A66B] focus:outline-none min-h-[48px]"
          >
            <option value="Vendor Review Request">Vendor Review Request (Listing)</option>
            <option value="Editorial Inquiry">Editorial &amp; Research Inquiry</option>
            <option value="Regional Compliance Update">Report Compliance / ZATCA Update</option>
            <option value="Partnership & Press">Partnership &amp; Media</option>
            <option value="General Inquiry">General Question</option>
          </select>
        </div>
      </div>

      {/* Subject */}
      <div>
        <label className="text-[16px] font-bold text-[#1F3D2B] block mb-2">
          Subject
        </label>
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Brief summary of your inquiry"
          className="w-full rounded-xl border border-[#D8CABA] bg-white px-4 py-3.5 text-[17px] text-[#1F3D2B] placeholder-[#64748B] focus:border-[#C6A66B] focus:outline-none min-h-[48px]"
        />
      </div>

      {/* Message */}
      <div>
        <label className="text-[16px] font-bold text-[#1F3D2B] block mb-2">
          Message <span className="text-rose-500">*</span>
        </label>
        <textarea
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          placeholder="Please share details regarding your inquiry, regional market questions, or software specifications..."
          required
          className="w-full rounded-xl border border-[#D8CABA] bg-white p-4 text-[17px] text-[#1F3D2B] placeholder-[#64748B] focus:border-[#C6A66B] focus:outline-none"
        />
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1F3D2B] px-8 py-4 text-[17px] font-bold text-[#F9F6F0] hover:bg-[#173022] active:scale-98 transition-all shadow-sm w-full sm:w-auto cursor-pointer min-h-[50px]"
        >
          <Send className="h-5 w-5 text-[#C6A66B]" />
          <span>{status === "loading" ? "Submitting..." : "Send Message to Editorial Desk"}</span>
        </button>
      </div>
    </form>
  );
}
