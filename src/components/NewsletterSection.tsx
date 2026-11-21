"use client";

import React, { useState } from "react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const editions = ["Saudi", "UAE", "GCC"] as const;

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [edition, setEdition] = useState<(typeof editions)[number]>("Saudi");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    setTimeout(() => setStatus("success"), 600);
  };

  return (
    <section id="newsletter" aria-labelledby="newsletter-title" className="scroll-mt-24 py-16 lg:py-24">
      <div className="wrap">
        <div className="relative overflow-hidden rounded-[32px] bg-terracotta text-white">
          {/* sun over dunes motif */}
          <svg aria-hidden="true" viewBox="0 0 400 400" className="pointer-events-none absolute -right-16 -bottom-24 h-[130%] w-auto max-md:hidden">
            <rect x="40" y="70" width="320" height="360" rx="36" fill="#9B3A1C" />
            <circle cx="200" cy="230" r="70" fill="#F1D39C" />
            <path d="M40 320 L80 280 L120 320 L160 280 L200 320 L240 280 L280 320 L320 280 L360 320 V400 H40 Z" fill="#0E4B48" />
          </svg>

          <div className="relative grid grid-cols-1 gap-8 px-6 py-12 sm:px-10 lg:grid-cols-12 lg:px-14 lg:py-16">
            <div className="lg:col-span-7">
              <p className="font-mono text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-sand">The Sunday brief · every other week</p>
              <h2 id="newsletter-title" className="display mt-4 text-[clamp(2.2rem,1.4rem+2.8vw,3.8rem)]">
                The Gulf&rsquo;s software news, in one calm email.
              </h2>
              <p className="mt-4 max-w-[46ch] text-[1.02rem] text-white/85">
                New reviews, ZATCA, FTA and WPS rule changes, and which price lists moved. About a four-minute read.
              </p>

              {status === "success" ? (
                <div role="status" className="mt-8 max-w-lg rounded-2xl bg-white/12 p-6">
                  <p className="h-card text-[1.25rem]">You&rsquo;re subscribed to the {edition} edition.</p>
                  <p className="mt-2 text-[0.92rem] text-white/85">
                    We sent a confirmation link to {email}.{" "}
                    <button
                      type="button"
                      className="link"
                      onClick={() => {
                        setStatus("idle");
                        setEmail("");
                      }}
                    >
                      Use another address
                    </button>
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="mt-8 max-w-xl">
                  <fieldset className="flex flex-wrap items-center gap-2">
                    <legend className="sr-only">Edition</legend>
                    {editions.map((ed) => (
                      <button
                        key={ed}
                        type="button"
                        aria-pressed={edition === ed}
                        onClick={() => setEdition(ed)}
                        className={`h-9 rounded-full px-4 text-[0.86rem] font-semibold transition-colors ${
                          edition === ed ? "bg-sand text-ink" : "bg-white/12 text-white hover:bg-white/20"
                        }`}
                      >
                        {ed} edition
                      </button>
                    ))}
                  </fieldset>
                  <div className="mt-4 flex flex-col gap-2 rounded-[20px] bg-white p-1.5 sm:flex-row">
                    <label className="flex-1">
                      <span className="sr-only">Work email</span>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (status === "error") setStatus("idle");
                        }}
                        placeholder="you@company.sa"
                        aria-invalid={status === "error"}
                        aria-describedby="newsletter-error"
                        className="h-12 w-full rounded-2xl bg-transparent px-4 text-ink placeholder:text-ink-3 focus:outline-none"
                      />
                    </label>
                    <button type="submit" disabled={status === "loading"} className="btn btn-primary !min-h-12 disabled:opacity-60">
                      {status === "loading" ? "Subscribing…" : "Subscribe"}
                    </button>
                  </div>
                  <p id="newsletter-error" className="mt-2 min-h-5 text-[0.88rem] font-semibold text-sand">
                    {status === "error" ? "Enter a valid work email, e.g. name@company.ae." : ""}
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
