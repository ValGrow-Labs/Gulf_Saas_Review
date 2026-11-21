import React from "react";

interface ScoreDialProps {
  /** Score out of 10. */
  score: number;
  size?: number;
  className?: string;
  /** Show "/10" under the number. */
  showMax?: boolean;
  /** Arc colour. Defaults to terracotta. */
  color?: string;
}

/** Circular score gauge (out of 10), coloured arc on a sand track. */
export default function ScoreDial({ score, size = 56, className = "", showMax = false, color = "#C24E2A" }: ScoreDialProps) {
  const stroke = size >= 80 ? 5 : 3.5;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(1, score / 10));

  return (
    <span
      role="img"
      aria-label={`Score ${score.toFixed(1)} out of 10`}
      className={`relative inline-grid shrink-0 place-items-center ${className}`}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#EADFCF" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${c * pct} ${c}`}
        />
      </svg>
      <span className="absolute inset-0 flex flex-col items-center justify-center leading-none">
        <span className="num font-semibold text-ink" style={{ fontSize: size * 0.3 }}>
          {score.toFixed(1)}
        </span>
        {showMax && <span className="num mt-0.5 text-ink-3" style={{ fontSize: Math.max(9, size * 0.12) }}>/10</span>}
      </span>
    </span>
  );
}
