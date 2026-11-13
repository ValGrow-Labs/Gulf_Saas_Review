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
      className={`group inline-flex items-center gap-3 transition-opacity hover:opacity-95 ${className}`}
      aria-label="GulfSaasReview Homepage"
    >
      {/* Custom Geometric Gulf-inspired Emblem */}
      <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#101F35] border border-[#C6A66B]/40 shadow-sm transition-transform duration-300 group-hover:scale-105">
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
            stroke="#C6A66B"
            strokeWidth="1.5"
            strokeOpacity="0.8"
          />
          <rect
            x="11"
            y="11"
            width="18"
            height="18"
            rx="2"
            stroke="#E7E4DC"
            strokeWidth="1.2"
            strokeOpacity="0.5"
          />
          {/* Central Modern Apex / Falcon Wing Geometry */}
          <path
            d="M20 12L25 21H15L20 12Z"
            fill="#C6A66B"
            fillOpacity="0.9"
          />
          <path
            d="M20 28L15 19H25L20 28Z"
            fill="#FCFAF5"
            fillOpacity="0.3"
          />
          <circle cx="20" cy="20" r="2.2" fill="#FCFAF5" />
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <div className="flex items-center tracking-tight leading-none text-lg">
          <span
            className={`font-bold transition-colors ${
              isLight ? "text-[#FCFAF5]" : "text-[#101F35]"
            }`}
          >
            GulfSaas
          </span>
          <span className="font-editorial italic font-normal text-[#C6A66B] ml-0.5 text-xl">
            Review
          </span>
        </div>
        {showTagline ? (
          <span
            className={`text-[10px] tracking-wider uppercase font-medium mt-1 ${
              isLight ? "text-[#E7E4DC]/70" : "text-[#697386]"
            }`}
          >
            Middle East Software Directory
          </span>
        ) : (
          <span
            className={`text-[9.5px] tracking-wider uppercase font-medium mt-0.5 ${
              isLight ? "text-[#C6A66B]/90" : "text-[#697386]"
            }`}
          >
            GCC Software Intelligence
          </span>
        )}
      </div>
    </Link>
  );
}

