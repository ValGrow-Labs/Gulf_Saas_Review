"use client";

import React, { useState } from "react";
import { Share2, Check, Copy, MessageCircle } from "lucide-react";

interface ShareButtonsProps {
  title: string;
  url?: string;
}

export default function ShareButtons({ title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleShareTwitter = () => {
    if (typeof window !== "undefined") {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(`${title} — via @GulfSaasReview`);
      window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank");
    }
  };

  const handleShareLinkedIn = () => {
    if (typeof window !== "undefined") {
      const url = encodeURIComponent(window.location.href);
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank");
    }
  };

  const handleShareWhatsApp = () => {
    if (typeof window !== "undefined") {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(`${title}\n${url}`);
      window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
      <span className="text-[#697386] uppercase tracking-wider font-bold mr-1 flex items-center gap-1">
        <Share2 className="h-3.5 w-3.5" />
        <span>Share:</span>
      </span>

      <button
        onClick={handleCopy}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E7E4DC] bg-white text-[#101F35] hover:border-[#C6A66B] hover:bg-[#F6F1E7] transition-colors cursor-pointer"
        title="Copy article link"
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5 text-emerald-600" />
            <span className="text-emerald-700 font-bold">Link Copied!</span>
          </>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5 text-[#697386]" />
            <span>Copy Link</span>
          </>
        )}
      </button>

      <button
        onClick={handleShareLinkedIn}
        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#E7E4DC] bg-white text-[#101F35] hover:border-[#0077b5] hover:text-[#0077b5] transition-colors cursor-pointer"
        title="Share on LinkedIn"
      >
        <span>LinkedIn</span>
      </button>

      <button
        onClick={handleShareTwitter}
        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#E7E4DC] bg-white text-[#101F35] hover:border-black hover:text-black transition-colors cursor-pointer"
        title="Share on X"
      >
        <span>X (Twitter)</span>
      </button>

      <button
        onClick={handleShareWhatsApp}
        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#E7E4DC] bg-white text-[#101F35] hover:border-emerald-600 hover:text-emerald-700 transition-colors cursor-pointer"
        title="Share on WhatsApp"
      >
        <MessageCircle className="h-3.5 w-3.5 text-emerald-600" />
        <span>WhatsApp</span>
      </button>
    </div>
  );
}

