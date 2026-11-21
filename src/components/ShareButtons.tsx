"use client";

import React, { useState } from "react";

interface ShareButtonsProps {
  title: string;
  url?: string;
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState<"idle" | "copied" | "failed">("idle");

  const currentUrl = () => url || (typeof window !== "undefined" ? window.location.href : "");

  const openShare = (href: string) => {
    window.open(href, "_blank", "noopener,noreferrer");
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl());
      setCopied("copied");
    } catch {
      setCopied("failed");
    }
    setTimeout(() => setCopied("idle"), 2500);
  };

  const shareLinkedIn = () =>
    openShare(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl())}`);

  const shareX = () =>
    openShare(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(currentUrl())}`
    );

  const shareWhatsApp = () =>
    openShare(`https://api.whatsapp.com/send?text=${encodeURIComponent(`${title}\n${currentUrl()}`)}`);

  const pill =
    "inline-flex min-h-9 cursor-pointer items-center gap-1.5 rounded-full border-[1.5px] border-rule bg-surface px-3.5 text-[0.84rem] font-semibold text-ink-2 transition-colors hover:border-ink hover:text-ink";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="kicker mr-1">Share</span>
      <button type="button" onClick={shareLinkedIn} className={pill}>
        LinkedIn <span aria-hidden="true">↗</span>
      </button>
      <button type="button" onClick={shareX} className={pill}>
        X <span aria-hidden="true">↗</span>
      </button>
      <button type="button" onClick={shareWhatsApp} className={pill}>
        WhatsApp <span aria-hidden="true">↗</span>
      </button>
      <button
        type="button"
        onClick={handleCopy}
        className={`${pill} ${
          copied === "copied" ? "!border-teal !bg-teal !text-paper" : copied === "failed" ? "!border-terracotta !text-terracotta" : ""
        }`}
      >
        {copied === "copied" ? "Copied ✓" : copied === "failed" ? "Copy failed" : "Copy link"}
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {copied === "copied" ? "Link copied to clipboard" : copied === "failed" ? "Could not copy the link" : ""}
      </span>
    </div>
  );
}
