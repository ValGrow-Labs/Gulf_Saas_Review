"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Software } from "@/types";
import SoftwareCard from "@/components/SoftwareCard";

interface SoftwareSliderProps {
  softwares: Software[];
  eyebrow?: string;
  title?: string;
}

export default function SoftwareSlider({
  softwares,
  eyebrow = "Reviewed this quarter",
  title = "Products our readers shortlist most",
}: SoftwareSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 8);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    update();
    const el = trackRef.current;
    el?.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el?.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const step = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-slide]");
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 360) + 20), behavior: "smooth" });
  };

  const arrowBtn =
    "flex h-11 w-11 items-center justify-center rounded-sm border transition-colors disabled:cursor-not-allowed disabled:border-rule disabled:text-ink-3/50";

  return (
    <div>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="h-section mt-3 max-w-[22ch]">{title}</h2>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/reviews" className="arrow-link">
            All reviews
          </Link>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => step(-1)}
              disabled={!canLeft}
              aria-label="Previous"
              className={`${arrowBtn} border-ink text-ink hover:bg-ink hover:text-paper`}
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              disabled={!canRight}
              aria-label="Next"
              className={`${arrowBtn} border-ink text-ink hover:bg-ink hover:text-paper`}
            >
              →
            </button>
          </div>
        </div>
      </div>

      <div
        ref={trackRef}
        className="mt-10 -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-4 px-4 pb-2 scrollbar-none sm:mx-0 sm:scroll-px-0 sm:px-0"
      >
        {softwares.map((software, i) => (
          <div
            key={software.id}
            data-slide
            className="rise w-[85vw] shrink-0 snap-start sm:w-[384px]"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <SoftwareCard software={software} />
          </div>
        ))}
      </div>
    </div>
  );
}
