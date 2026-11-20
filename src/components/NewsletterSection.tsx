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
    setTimeout(() => {
      setStatus("success");
      setMessage(`Thank you! You are now subscribed to Gulf business technology insights tailored for ${country}.`);
    }, 600);
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#0B3D2E] py-10 sm:py-14 text-[#FFF8EF]">
      {/* Subtle geometric background watermarks */}
      <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#0E4B39] blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-[#22C55E]/15 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-[#22C55E]/40 bg-[#0E4B39] px-3.5 py-1 text-xs font-bold text-[#22C55E] mb-3">
          <Mail className="h-3.5 w-3.5" />
          <span>Bi-Weekly GCC Software Intelligence</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold font-editorial text-white tracking-tight">
          Stay Ahead of Business Technology
        </h2>

        <p className="mx-auto mt-2 max-w-xl text-xs sm:text-sm text-[#FFF8EF]/90 leading-relaxed font-normal">
          Get independent software reviews, ZATCA e-invoicing updates, GCC pricing benchmarks and practical technology insights delivered straight to your inbox.
        </p>

        {status === "success" ? (
          <div className="mx-auto mt-6 max-w-md rounded-xl border border-emerald-500/50 bg-emerald-950/50 p-5 text-center animate-in zoom-in-95 duration-200">
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
              className="mt-3 text-xs font-semibold text-[#22C55E] hover:underline cursor-pointer"
            >
              Subscribe another business email &rarr;
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-6 max-w-xl space-y-2.5 sm:space-y-0 sm:flex sm:items-center sm:gap-2.5"
          >
            <div className="relative flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your corporate email"
                className="w-full rounded-xl border border-[#0E4B39] bg-[#07261D] px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-[#A3C2B8] focus:border-[#22C55E] focus:outline-none focus:ring-1 focus:ring-[#22C55E] min-h-[44px]"
                required
              />
            </div>

            <div className="sm:w-48">
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full rounded-xl border border-[#0E4B39] bg-[#07261D] px-3 py-2.5 text-xs sm:text-sm text-[#FFF8EF] font-semibold focus:border-[#22C55E] focus:outline-none min-h-[44px] cursor-pointer"
              >
                <option value="Saudi Arabia">Saudi Arabia (KSA)</option>
                <option value="UAE">UAE (Dubai &amp; AD)</option>
                <option value="Other GCC">Other GCC (QA, KW, BH, OM)</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#16A34A] px-6 py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-[#22C55E] active:scale-95 transition-all shadow-md shrink-0 cursor-pointer min-h-[44px]"
            >
              <span>{status === "loading" ? "Subscribing..." : "Subscribe"}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="mt-2 text-xs font-semibold text-rose-400">{message}</p>
        )}

        <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-[11px] text-[#FFF8EF]/70">
          <span className="flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5 text-[#22C55E]" />
            No marketing spam. Unsubscribe anytime.
          </span>
          <span>•</span>
          <span>Curated by regional SaaS research team</span>
        </div>
      </div>
    </section>
  );
}
