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
    <section className="relative w-full overflow-hidden bg-[#14123D] py-16 sm:py-24 text-[#FAF5ED]">
      {/* Subtle geometric background watermarks */}
      <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-[#1E1B59] blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 h-96 w-96 rounded-full bg-[#FF6B5B]/10 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#FF6B5B]/50 bg-[#1E1B59] px-4 py-1.5 text-xs sm:text-sm font-bold text-[#FF6B5B] mb-5">
          <Mail className="h-4 w-4" />
          <span>Bi-Weekly GCC Software Intelligence</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-editorial text-white tracking-tight">
          Stay Ahead of Business Technology
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg lg:text-xl text-[#E5DCD0]/90 leading-relaxed font-normal">
          Get independent software reviews, ZATCA e-invoicing updates, GCC pricing benchmarks and the sort of practical technology insights you can actually use delivered straight to your inbox.
        </p>

        {status === "success" ? (
          <div className="mx-auto mt-8 max-w-md rounded-2xl border border-emerald-500/50 bg-emerald-950/50 p-7 text-center animate-in zoom-in-95 duration-200">
            <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-400 mb-3" />
            <h3 className="text-lg font-bold text-white">Subscription Confirmed</h3>
            <p className="mt-2 text-sm text-emerald-200/90 leading-relaxed">
              {message}
            </p>
            <button
              onClick={() => {
                setStatus("idle");
                setEmail("");
              }}
              className="mt-5 text-sm font-semibold text-[#FF6B5B] hover:underline cursor-pointer"
            >
              Subscribe another business email &rarr;
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-10 max-w-2xl space-y-3 sm:space-y-0 sm:flex sm:items-center sm:gap-3"
          >
            <div className="relative flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your corporate email"
                className="w-full rounded-xl border border-[#2C2775] bg-[#1A174E] px-4 py-3.5 sm:py-4 text-base text-white placeholder-[#697386] focus:border-[#FF6B5B] focus:outline-none focus:ring-1 focus:ring-[#FF6B5B] min-h-[50px]"
                required
              />
            </div>

            <div className="sm:w-52">
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full rounded-xl border border-[#2C2775] bg-[#1A174E] px-3.5 py-3.5 sm:py-4 text-sm sm:text-base text-[#FAF5ED] font-semibold focus:border-[#FF6B5B] focus:outline-none min-h-[50px] cursor-pointer"
              >
                <option value="Saudi Arabia">Saudi Arabia (KSA)</option>
                <option value="UAE">UAE (Dubai &amp; AD)</option>
                <option value="Other GCC">Other GCC (QA, KW, BH, OM)</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#FF6B5B] px-8 py-3.5 sm:py-4 text-base font-bold text-[#14123D] hover:bg-[#FFA094] active:scale-95 transition-all shadow-md shrink-0 cursor-pointer min-h-[50px]"
            >
              <span>{status === "loading" ? "Subscribing..." : "Subscribe"}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="mt-3 text-sm text-rose-400 font-medium">{message}</p>
        )}

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-[#E5DCD0]/80 font-medium">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-[#FF6B5B]" />
            Strictly zero spam. You can unsubscribe at any time.
          </span>
          <span>•</span>
          <span>Read by 4,200+ GCC business executives &amp; founders</span>
        </div>
      </div>
    </section>
  );
}
