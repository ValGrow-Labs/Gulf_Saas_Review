"use client";

import React from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import Monogram from "./Monogram";

export default function CompareTray() {
  const {
    compareSlugs,
    comparedSoftwares,
    removeFromCompare,
    clearCompare,
    isCompareTrayOpen,
    setIsCompareTrayOpen,
  } = useApp();

  if (compareSlugs.length === 0 || !isCompareTrayOpen) return null;

  let compareUrl = "/compare";
  if (compareSlugs.length >= 2) {
    compareUrl = `/compare?a=${compareSlugs[0]}&b=${compareSlugs[1]}${compareSlugs[2] ? `&c=${compareSlugs[2]}` : ""}`;
  } else if (compareSlugs.length === 1) {
    compareUrl = `/compare?a=${compareSlugs[0]}`;
  }
  const ready = compareSlugs.length >= 2;

  return (
    <aside
      aria-label="Comparison tray"
      className="fixed inset-x-3 bottom-3 z-50 sm:inset-x-auto sm:left-1/2 sm:w-[min(780px,94vw)] sm:-translate-x-1/2 rise [animation-duration:400ms]"
    >
      <div className="rounded-[22px] border border-ink-3 bg-surface/95 p-2.5 shadow-[0_24px_50px_-20px_rgba(31,25,21,0.4)] backdrop-blur-xl">
        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
          <ul className="flex flex-1 items-center gap-2 overflow-x-auto scrollbar-none">
            {comparedSoftwares.map((sw) => (
              <li key={sw.id} className="flex shrink-0 items-center gap-2 rounded-full bg-paper-2 py-1 pl-1 pr-2">
                <Monogram name={sw.name} color={sw.accentColor} size="sm" className="!rounded-full" />
                <span className="text-[0.85rem] text-ink">{sw.name}</span>
                <button
                  type="button"
                  onClick={() => removeFromCompare(sw.slug)}
                  className="grid h-6 w-6 place-items-center rounded-full text-ink-3 hover:bg-paper hover:text-ink"
                  aria-label={`Remove ${sw.name}`}
                >
                  ×
                </button>
              </li>
            ))}
            {!ready && <li className="shrink-0 px-2 text-[0.82rem] text-ink-3">Add one more to compare</li>}
            {compareSlugs.length >= 3 && <li className="shrink-0 px-2 text-[0.82rem] text-ink-3">3 of 3 — remove one to swap</li>}
          </ul>
          <div className="flex items-center justify-end gap-1">
            <button type="button" onClick={clearCompare} className="h-9 rounded-full px-3 text-[0.82rem] text-ink-3 hover:text-ink">
              Clear
            </button>
            <button
              type="button"
              onClick={() => setIsCompareTrayOpen(false)}
              className="h-9 rounded-full px-3 text-[0.82rem] text-ink-3 hover:text-ink"
            >
              Hide
            </button>
            {ready ? (
              <Link href={compareUrl} className="btn btn-accent btn-sm">
                Compare {compareSlugs.length} →
              </Link>
            ) : (
              <span aria-disabled="true" className="btn btn-sm cursor-not-allowed bg-paper-2 text-ink-3">
                Compare
              </span>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
