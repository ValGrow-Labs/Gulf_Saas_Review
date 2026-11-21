import React from "react";

interface MonogramProps {
  name: string;
  /** Vendor brand colour — used as a soft glow dot so it never competes with the UI accent. */
  color?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: "h-9 w-9 text-[0.7rem] rounded-[10px]",
  md: "h-11 w-11 text-[0.8rem] rounded-xl",
  lg: "h-16 w-16 text-[1.05rem] rounded-2xl",
};

/** Neutral product tile: two letters on a white tile, brand colour as a small dot. */
export default function Monogram({ name, color, size = "md", className = "" }: MonogramProps) {
  const words = name.replace(/[^A-Za-z0-9 ]/g, "").split(" ").filter(Boolean);
  const letters = (words.length > 1 ? words[0][0] + words[1][0] : name.slice(0, 2)).toUpperCase();

  return (
    <span
      aria-hidden="true"
      className={`relative inline-flex shrink-0 items-center justify-center border-[1.5px] border-rule bg-surface font-display font-bold tracking-[-0.02em] text-ink ${sizes[size]} ${className}`}
    >
      {letters}
      <span
        className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: color || "#C24E2A" }}
      />
    </span>
  );
}
