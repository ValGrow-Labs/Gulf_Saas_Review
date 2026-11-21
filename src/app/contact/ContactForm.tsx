"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const inquiryTypes = [
  { value: "Vendor Review Request", label: "Vendor review request (listing)" },
  { value: "Editorial Inquiry", label: "Editorial or research question" },
  { value: "Regional Compliance Update", label: "Report a compliance or ZATCA change" },
  { value: "Partnership & Press", label: "Partnership or press" },
  { value: "General Inquiry", label: "General question" },
];

type FieldName = "name" | "email" | "message";
type Errors = Partial<Record<FieldName, string>>;

interface ContactFormProps {
  initialType?: string;
}

export default function ContactForm({ initialType = "General Inquiry" }: ContactFormProps) {
  const emptyForm = {
    name: "",
    email: "",
    company: "",
    inquiryType: inquiryTypes.some((t) => t.value === initialType) ? initialType : "General Inquiry",
    subject: "",
    message: "",
  };

  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const validate = (data: typeof formData): Errors => {
    const e: Errors = {};
    if (!data.name.trim()) e.name = "Enter your name.";
    if (!data.email.trim()) e.email = "Enter your work email.";
    else if (!EMAIL_RE.test(data.email.trim())) e.email = "Enter a valid email, e.g. name@company.sa.";
    if (!data.message.trim()) e.message = "Tell us what your message is about.";
    return e;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name in errors) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name as FieldName];
        return next;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate(formData);
    setErrors(found);
    const first = (["name", "email", "message"] as FieldName[]).find((f) => found[f]);
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus("loading");
    setTimeout(() => setStatus("success"), 600);
  };

  if (status === "success") {
    return (
      <div role="status" className="rounded-[22px] bg-teal-soft p-6 sm:p-8">
        <span
          aria-hidden="true"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-teal text-[1.2rem] font-bold text-paper"
        >
          ✓
        </span>
        <p className="h-card mt-4 text-[1.6rem]">Message received.</p>
        <p className="mt-3 max-w-[56ch] text-ink-2">
          Thank you, {formData.name.trim()}. Your message about &ldquo;{formData.subject.trim() || formData.inquiryType}&rdquo; has gone to our editorial desk. We will reply to{" "}
          <span className="font-semibold text-ink">{formData.email.trim()}</span>.
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setFormData(emptyForm);
            setErrors({});
          }}
          className="btn btn-primary btn-sm mt-6"
        >
          Send another message
        </button>
      </div>
    );
  }

  const labelCls = "block text-[0.875rem] font-medium text-ink";
  const errCls = "mt-1.5 flex items-center gap-1.5 text-[0.84rem] font-medium text-terracotta-deep";
  const fieldCls = (f?: FieldName) =>
    `field mt-2 ${f && errors[f] ? "!border-terracotta !bg-terracotta-soft/40" : ""}`;
  const required = (
    <span className="text-accent" aria-hidden="true">
      {" "}
      *
    </span>
  );

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={labelCls}>
            Full name{required}
          </label>
          <input
            id="cf-name"
            type="text"
            name="name"
            autoComplete="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Faisal Al-Harbi"
            aria-required="true"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "cf-name-error" : undefined}
            className={fieldCls("name")}
          />
          {errors.name && (
            <p id="cf-name-error" className={errCls}>
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="cf-email" className={labelCls}>
            Work email{required}
          </label>
          <input
            id="cf-email"
            type="email"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="faisal@company.sa"
            aria-required="true"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "cf-email-error" : undefined}
            className={fieldCls("email")}
          />
          {errors.email && (
            <p id="cf-email-error" className={errCls}>
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-company" className={labelCls}>
            Company
          </label>
          <input
            id="cf-company"
            type="text"
            name="company"
            autoComplete="organization"
            value={formData.company}
            onChange={handleChange}
            placeholder="Al-Riyadh Logistics"
            className={fieldCls()}
          />
        </div>

        <div>
          <label htmlFor="cf-type" className={labelCls}>
            Topic
          </label>
          <select
            id="cf-type"
            name="inquiryType"
            value={formData.inquiryType}
            onChange={handleChange}
            className={`${fieldCls()} cursor-pointer`}
          >
            {inquiryTypes.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="cf-subject" className={labelCls}>
          Subject
        </label>
        <input
          id="cf-subject"
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder={
            formData.inquiryType === "Vendor Review Request" ? "Product name and category" : "One line on what this is about"
          }
          className={fieldCls()}
        />
      </div>

      <div>
        <label htmlFor="cf-message" className={labelCls}>
          Message{required}
        </label>
        <textarea
          id="cf-message"
          name="message"
          rows={6}
          value={formData.message}
          onChange={handleChange}
          placeholder={
            formData.inquiryType === "Vendor Review Request"
              ? "Markets you support, Arabic and RTL status, ZATCA or FTA certification, local integrations."
              : "The details of your question, the product or rule involved, and any links."
          }
          aria-required="true"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "cf-message-error" : undefined}
          className={`${fieldCls("message")} resize-y leading-relaxed`}
        />
        {errors.message && (
          <p id="cf-message-error" className={errCls}>
            {errors.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-4 border-t-[1.5px] border-dashed border-rule pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[0.82rem] text-ink-3">
          We use your details only to reply.{" "}
          <Link href="/privacy" className="link text-ink-3">
            Privacy policy
          </Link>
        </p>
        <button type="submit" disabled={status === "loading"} className="btn btn-accent disabled:opacity-60">
          {status === "loading" ? "Sending…" : "Send message →"}
        </button>
      </div>
    </form>
  );
}
