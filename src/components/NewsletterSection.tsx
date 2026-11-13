"use client";

import React, { useState } from "react";
import { Mail, CheckCircle2, ArrowRight, ShieldCheck } from "lucide-react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("Saudi Arabia");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("Please enter a valid business email address.");
      return;
    }

    setStatus("loading");
    // Simulate instantaneous verification
    setTimeout(() => {
      setStatus("success");
      setMessage(`Thank you! You are now subscribed to Gulf business technology insights tailored for ${country}.`);
    }, 600);
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#101F35] py-16 sm:py-20 text-[#FCFAF5]">
      {/* Subtle geometric background watermarks */}
      <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-[#172B46] blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 h-96 w-96 rounded-full bg-[#C6A66B]/10 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-[#C6A66B]/40 bg-[#172B46] px-3.5 py-1 text-xs font-semibold text-[#C6A66B] mb-5">
          <Mail className="h-3.5 w-3.5" />
          <span>Bi-Weekly GCC Software Intelligence</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-editorial text-white tracking-tight">
          Stay Ahead of Business Technology
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base text-[#E7E4DC]/80 leading-relaxed">
          Get independent software reviews, ZATCA e-invoicing updates, GCC pricing benchmarks, and practical technology insights delivered directly to your inbox.
        </p>

        {status === "success" ? (
          <div className="mx-auto mt-8 max-w-md rounded-2xl border border-emerald-500/40 bg-emerald-950/40 p-6 text-center animate-in zoom-in-95 duration-200">
            <CheckCircle2 className="mx-auto h-8 w-8 text-emerald-400 mb-2" />
            <h3 className="text-base font-bold text-white">Subscription Confirmed</h3>
            <p className="mt-1 text-xs text-emerald-200/90 leading-relaxed">
              {message}
            </p>
            <button
              onClick={() => {
                setStatus("idle");
                setEmail("");
              }}
              className="mt-4 text-xs text-[#C6A66B] hover:underline"
            >
              Subscribe another email &rarr;
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-8 max-w-xl space-y-3 sm:space-y-0 sm:flex sm:items-center sm:gap-2.5"
          >
            <div className="relative flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your business email"
                className="w-full rounded-xl border border-[#223859] bg-[#14243C] px-4 py-3.5 text-sm text-white placeholder-[#697386] focus:border-[#C6A66B] focus:outline-none focus:ring-1 focus:ring-[#C6A66B]"
                required
              />
            </div>

            <div className="sm:w-44">
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full rounded-xl border border-[#223859] bg-[#14243C] px-3 py-3.5 text-xs text-[#FCFAF5] focus:border-[#C6A66B] focus:outline-none"
              >
                <option value="Saudi Arabia">Saudi Arabia (KSA)</option>
                <option value="UAE">UAE (Dubai & AD)</option>
                <option value="Other GCC">Other GCC (QA, KW, BH, OM)</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#C6A66B] px-6 py-3.5 text-sm font-bold text-[#101F35] hover:bg-[#DFCA9B] active:scale-95 transition-all shadow-md shrink-0 cursor-pointer"
            >
              <span>{status === "loading" ? "Subscribing..." : "Subscribe"}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="mt-3 text-xs text-rose-400">{message}</p>
        )}

        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-[11px] text-[#E7E4DC]/60">
          <span className="flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5 text-[#C6A66B]" />
            Strictly zero spam. Unsubscribe anytime.
          </span>
          <span>•</span>
          <span>Read by 4,200+ GCC business executives & founders</span>
        </div>
      </div>
    </section>
  );
}

