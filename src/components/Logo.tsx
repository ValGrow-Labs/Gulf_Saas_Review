import React from "react";
import Link from "next/link";

interface LogoProps {
  variant?: "dark" | "light";
  className?: string;
  showTagline?: boolean;
}

export default function Logo({
  variant = "dark",
  className = "",
  showTagline = false,
}: LogoProps) {
  const isLight = variant === "light";

  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-3 transition-opacity hover:opacity-95 whitespace-nowrap shrink-0 ${className}`}
      aria-label="GulfSaasReview Homepage"
    >
      {/* Custom Geometric Gulf-inspired Emblem in Deep Teal & Coral */}
      <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0A2E36] border border-[#FF6B5B]/50 shadow-sm transition-transform duration-300 group-hover:scale-105">
        <svg
          viewBox="0 0 40 40"
          className="h-6.5 w-6.5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Geometric 8-Point Gulf Star Lattice in Coral */}
          <rect
            x="9"
            y="9"
            width="22"
            height="22"
            rx="2"
            transform="rotate(45 20 20)"
            stroke="#FF6B5B"
            strokeWidth="1.5"
            strokeOpacity="0.9"
          />
          <rect
            x="11"
            y="11"
            width="18"
            height="18"
            rx="2"
            stroke="#F7F4EC"
            strokeWidth="1.2"
            strokeOpacity="0.6"
          />
          {/* Central Geometric Apex */}
          <path
            d="M20 12L25 21H15L20 12Z"
            fill="#FF6B5B"
            fillOpacity="0.95"
          />
          <path
            d="M20 28L15 19H25L20 28Z"
            fill="#F7F4EC"
            fillOpacity="0.45"
          />
          <circle cx="20" cy="20" r="2.2" fill="#F7F4EC" />
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <div className="flex items-baseline tracking-tight leading-none">
          <span
            className={`font-extrabold text-[1.38rem] tracking-tight ${
              isLight ? "text-[#F7F4EC]" : "text-[#0A2E36]"
            }`}
          >
            GulfSaas
          </span>
          <span className="font-serif font-bold text-[#FF6B5B] ml-1.5 text-[1.44rem] tracking-tight">
            Review
          </span>
        </div>
        {showTagline ? (
          <span
            className={`text-[11px] tracking-[0.16em] uppercase font-bold mt-1 ${
              isLight ? "text-[#F7F4EC]/80" : "text-[#526A70]"
            }`}
          >
            Middle East Tech &amp; SaaS Reviews
          </span>
        ) : (
          <span
            className={`text-[10.5px] tracking-[0.18em] uppercase font-bold mt-0.5 ${
              isLight ? "text-[#FF8A7C]" : "text-[#526A70]"
            }`}
          >
            GCC Software &amp; Tech Intelligence
          </span>
        )}
      </div>
    </Link>
  );
}
