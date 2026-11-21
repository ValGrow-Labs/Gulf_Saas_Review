import React from "react";

interface SaduProps {
  /** Colour of the band above the divider. */
  from: string;
  /** Colour of the band below the divider. */
  to: string;
  /** Accent colour for the diamond row. */
  accent?: string;
  className?: string;
}

/**
 * Sadu-weave divider: interlocking triangle teeth between two colour bands,
 * with a row of small diamonds — the pattern woven into Bedouin tent cloth.
 * Rendered as an SVG pattern so it tiles to any width.
 */
export default function Sadu({ from, to, accent = "#F1D39C", className = "" }: SaduProps) {
  const id = React.useId().replace(/:/g, "");
  return (
    <div aria-hidden="true" className={`relative h-10 w-full overflow-hidden ${className}`} style={{ background: to }}>
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        <defs>
          <pattern id={`sadu-${id}`} width="40" height="40" patternUnits="userSpaceOnUse">
            <rect width="40" height="40" fill={to} />
            {/* teeth from the band above */}
            <path d="M0 0 H40 V8 L30 18 L20 8 L10 18 L0 8 Z" fill={from} />
            {/* diamond row */}
            <path d="M10 22 L15 27 L10 32 L5 27 Z" fill={accent} />
            <path d="M30 22 L35 27 L30 32 L25 27 Z" fill={accent} />
            <rect x="17" y="26" width="6" height="2" fill={accent} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#sadu-${id})`} />
      </svg>
    </div>
  );
}
