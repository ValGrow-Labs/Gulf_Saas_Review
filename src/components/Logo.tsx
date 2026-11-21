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
      {/* Custom Geometric Gulf-inspired Emblem in Forest & Leaf */}
      <div className="relative flex h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11 shrink-0 items-center justify-center rounded-xl bg-[#064734] border border-[#E0FFC2]/60 shadow-sm transition-transform duration-300 group-hover:scale-105">
        <svg
          viewBox="0 0 40 40"
          className="h-5 w-5 sm:h-6 sm:w-6 md:h-6.5 md:w-6.5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Geometric 8-Point Gulf Star Lattice in Leaf */}
          <rect
            x="9"
            y="9"
            width="22"
            height="22"
            rx="2"
            transform="rotate(45 20 20)"
            stroke="#E0FFC2"
            strokeWidth="1.5"
            strokeOpacity="0.95"
          />
          <rect
            x="11"
            y="11"
            width="18"
            height="18"
            rx="2"
            stroke="#FFF8EF"
            strokeWidth="1.2"
            strokeOpacity="0.6"
          />
          {/* Central Geometric Apex */}
          <path
            d="M20 12L25 21H15L20 12Z"
            fill="#E0FFC2"
            fillOpacity="0.95"
          />
          <path
            d="M20 28L15 19H25L20 28Z"
            fill="#FFF8EF"
            fillOpacity="0.45"
          />
          <circle cx="20" cy="20" r="2.2" fill="#FFF8EF" />
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <div className="flex items-baseline tracking-tight leading-none">
          <span
            className={`font-extrabold text-[1.18rem] sm:text-[1.3rem] md:text-[1.38rem] tracking-tight ${
              isLight ? "text-[#FFF8EF]" : "text-[#064734]"
            }`}
          >
            GulfSaas
          </span>
          <span
            className={`font-sans font-bold ml-1 text-[1.22rem] sm:text-[1.35rem] md:text-[1.44rem] tracking-tight ${
              isLight ? "text-[#E0FFC2]" : "text-[#15803D]"
            }`}
          >
            Review
          </span>
        </div>
        {showTagline ? (
          <span
            className={`text-[11px] tracking-[0.16em] uppercase font-bold mt-1 ${
              isLight ? "text-[#FFF8EF]/80" : "text-[#4A6D5F]"
            }`}
          >
            Middle East Tech &amp; SaaS Reviews
          </span>
        ) : (
          <span
            className={`text-[10.5px] tracking-[0.18em] uppercase font-bold mt-0.5 ${
              isLight ? "text-[#E0FFC2]" : "text-[#15803D]"
            }`}
          >
            GCC Software &amp; Tech Intelligence
          </span>
        )}
      </div>
    </Link>
  );
}
