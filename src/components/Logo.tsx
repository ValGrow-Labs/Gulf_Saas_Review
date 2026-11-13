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
      {/* Custom Geometric Gulf-inspired Emblem */}
      <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#14123D] border border-[#FF6B5B]/50 shadow-sm transition-transform duration-300 group-hover:scale-105">
        <svg
          viewBox="0 0 40 40"
          className="h-6 w-6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Geometric 8-Point Gulf Star Lattice */}
          <rect
            x="9"
            y="9"
            width="22"
            height="22"
            rx="2"
            transform="rotate(45 20 20)"
            stroke="#FF6B5B"
            strokeWidth="1.5"
            strokeOpacity="0.85"
          />
          <rect
            x="11"
            y="11"
            width="18"
            height="18"
            rx="2"
            stroke="#E5DCD0"
            strokeWidth="1.2"
            strokeOpacity="0.5"
          />
          {/* Central Falcon Geometric Apex */}
          <path
            d="M20 12L25 21H15L20 12Z"
            fill="#FF6B5B"
            fillOpacity="0.95"
          />
          <path
            d="M20 28L15 19H25L20 28Z"
            fill="#FAF5ED"
            fillOpacity="0.35"
          />
          <circle cx="20" cy="20" r="2.2" fill="#FAF5ED" />
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <div className="flex items-baseline tracking-tight leading-none">
          <span
            className={`font-extrabold text-[1.25rem] tracking-tight ${
              isLight ? "text-[#FAF5ED]" : "text-[#14123D]"
            }`}
          >
            GulfSaas
          </span>
          <span className="font-serif font-bold text-[#FF6B5B] ml-1 text-[1.3rem] tracking-tight">
            Review
          </span>
        </div>
        {showTagline ? (
          <span
            className={`text-[9.5px] tracking-[0.16em] uppercase font-bold mt-1 ${
              isLight ? "text-[#E5DCD0]/80" : "text-[#697386]"
            }`}
          >
            Middle East Software Directory
          </span>
        ) : (
          <span
            className={`text-[9px] tracking-[0.18em] uppercase font-bold mt-0.5 ${
              isLight ? "text-[#FF6B5B]/90" : "text-[#697386]"
            }`}
          >
            GCC Software Intelligence
          </span>
        )}
      </div>
    </Link>
  );
}
