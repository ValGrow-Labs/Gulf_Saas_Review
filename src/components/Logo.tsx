import React from "react";
import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  /** "light" for use on teal/terracotta bands. */
  variant?: "dark" | "light";
  className?: string;
  /** Kept for API compatibility. */
  showTagline?: boolean;
}

const sizing = {
  sm: { mark: "h-7 w-7", text: "text-[1.05rem]" },
  md: { mark: "h-9 w-9", text: "text-[1.3rem]" },
  lg: { mark: "h-12 w-12", text: "text-[1.9rem]" },
};

/** Mark: a Gulf arch window with a setting sun and Sadu teeth. */
export function LogoMark({ className = "h-9 w-9", light = false }: { className?: string; light?: boolean }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <path d="M4 38 V18 A16 16 0 0 1 36 18 V38 Z" fill={light ? "#FFFCF6" : "#0E4B48"} />
      <circle cx="20" cy="22" r="7" fill="#C24E2A" />
      <path d="M4 30 L9 25 L14 30 L19 25 L24 30 L29 25 L34 30 L36 28 V38 H4 Z" fill="#F1D39C" />
    </svg>
  );
}

export default function Logo({ size = "md", variant = "dark", className = "" }: LogoProps) {
  const s = sizing[size];
  const light = variant === "light";
  return (
    <Link
      href="/"
      aria-label="Gulf SaaS Review — home"
      className={`group inline-flex items-center gap-2.5 shrink-0 whitespace-nowrap ${className}`}
    >
      <span className="transition-transform duration-500 group-hover:-translate-y-0.5">
        <LogoMark className={s.mark} light={light} />
      </span>
      <span
        className={`font-display font-extrabold leading-none tracking-[-0.045em] ${s.text} ${light ? "text-paper" : "text-ink"}`}
        style={{ fontVariationSettings: '"opsz" 48, "wdth" 86' }}
      >
        Gulf SaaS <span className={light ? "text-sand" : "text-terracotta"}>Review</span>
      </span>
    </Link>
  );
}
