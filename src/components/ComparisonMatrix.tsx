"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Software } from "@/types";
import { softwares } from "@/data/software";
import Monogram from "./Monogram";
import ScoreDial from "./ScoreDial";
import { arabicLabel, billingSuffix, countryShort } from "@/lib/format";

interface ComparisonMatrixProps {
  initialProductA: Software | null;
  initialProductB: Software | null;
  initialProductC?: Software | null;
  curatedVerdict?: {
    winnerSummary: string;
    gulfContext: string;
  };
  /** Mirror picker changes into ?a=&b=&c= on /compare so the view can be shared. */
  syncUrl?: boolean;
}

type Slots = [Software | null, Software | null, Software | null];

/* ---------- Local helpers (derived from the data, no invented values) ---------- */

/** Numeric entry price in the listed currency, or null when it is a quote. */
function entryPrice(sw: Software): number | null {
  const raw = sw.pricing.startingPrice.toLowerCase();
  if (raw.includes("free")) return 0;
  const m = raw.replace(/,/g, "").match(/(\d+(?:\.\d+)?)/);
  return m ? parseFloat(m[1]) : null;
}

/** Upper bound of the typical deployment window, in days. */
function deployDays(sw: Software): number | null {
  const s = sw.deploymentTime.toLowerCase();
  const nums = s.match(/\d+(?:\.\d+)?/g);
  if (!nums) return null;
  const n = parseFloat(nums[nums.length - 1]);
  if (s.includes("month")) return n * 30;
  if (s.includes("week")) return n * 7;
  return n;
}

type Status = "yes" | "partial" | "no" | "na";

/** Classify a free-text compliance status. The original text is always shown beside it. */
function classify(text?: string): Status {
  if (!text) return "na";
  const t = text.toLowerCase();
  if (t.startsWith("n/a")) return "na";
  if (/\bnot\b|\bno native\b|\bno direct\b/.test(t)) return "no";
  if (/fully certified|officially certified|certified fta|pre-configured|full fta|native tax|solid fta|^supported/.test(t))
    return "yes";
  return "partial";
}

const statusGlyph: Record<Status, { glyph: string; label: string; cls: string }> = {
  yes: { glyph: "✓", label: "Yes", cls: "bg-teal-soft text-positive" },
  partial: { glyph: "~", label: "Via partner or connector", cls: "bg-sand-soft text-[#7A5418]" },
  no: { glyph: "—", label: "No", cls: "bg-terracotta-soft text-terracotta-deep" },
  na: { glyph: "n/a", label: "Not applicable", cls: "bg-paper-2 text-ink-3" },
};

/** Indexes of the best value(s). No winner when every value ties or fewer than two are comparable. */
function winners(values: (number | null)[], prefer: "high" | "low"): Set<number> {
  const valid = values.map((v, i) => ({ v, i })).filter((x): x is { v: number; i: number } => x.v !== null);
  if (valid.length < 2) return new Set();
  const best = prefer === "high" ? Math.max(...valid.map((x) => x.v)) : Math.min(...valid.map((x) => x.v));
  const top = valid.filter((x) => x.v === best);
  if (top.length === valid.length) return new Set();
  return new Set(top.map((x) => x.i));
}

const slotLabels = ["First product", "Second product", "Third product (optional)"];

/* ---------- Component ---------- */

export default function ComparisonMatrix({
  initialProductA,
  initialProductB,
  initialProductC = null,
  curatedVerdict,
  syncUrl = false,
}: ComparisonMatrixProps) {
  const router = useRouter();
  const initialKey = [initialProductA, initialProductB, initialProductC].map((p) => p?.slug ?? "").join("|");

  const [slots, setSlots] = useState<Slots>([initialProductA, initialProductB, initialProductC]);
  const [prevKey, setPrevKey] = useState(initialKey);

  // Re-sync when the incoming products change (e.g. the compare tray navigates here with new params).
  if (initialKey !== prevKey) {
    setPrevKey(initialKey);
    setSlots([initialProductA, initialProductB, initialProductC]);
  }

  const setSlot = (index: number, slug: string) => {
    const next = [...slots] as Slots;
    next[index] = slug ? softwares.find((s) => s.slug === slug) ?? null : null;
    setSlots(next);
    if (syncUrl) {
      const params = new URLSearchParams();
      (["a", "b", "c"] as const).forEach((k, i) => {
        if (next[i]) params.set(k, next[i]!.slug);
      });
      const qs = params.toString();
      setPrevKey(next.map((p) => p?.slug ?? "").join("|"));
      router.replace(qs ? `/compare?${qs}` : "/compare", { scroll: false });
    }
  };

  const active = slots.filter((p): p is Software => Boolean(p));
  const n = active.length;

  /* Winner rows */
  const scoreWin = winners(active.map((p) => p.verdict.score), "high");
  const easeWin = winners(active.map((p) => p.easeOfUse), "high");
  const priceWin = winners(active.map(entryPrice), "low");
  const deployWin = winners(active.map(deployDays), "low");
  const leads = active.map(
    (_, i) => [scoreWin, easeWin, priceWin, deployWin].filter((set) => set.has(i)).length
  );

  const sameCategory =
    n === 1
      ? softwares.filter((s) => s.category === active[0].category && s.slug !== active[0].slug)
      : [];
  const suggestions = (sameCategory.length ? sameCategory : softwares.filter((s) => !active.some((a) => a.slug === s.slug)))
    .slice()
    .sort((a, b) => b.verdict.score - a.verdict.score)
    .slice(0, 4);

  /* Cell primitives */
  const thRow =
    "sticky left-0 z-10 w-[8.5rem] min-w-[8.5rem] bg-surface py-4 pl-4 pr-3 text-left align-top text-[0.85rem] font-semibold text-ink sm:w-[13rem] sm:min-w-[13rem] sm:pl-6";
  const td = "px-4 py-4 align-top text-[0.9rem] text-ink sm:px-5";
  const row = "border-t-[1.5px] border-dashed border-rule";

  /** Leader highlight: the value sits in a terracotta-soft pill with a "Best" label. */
  const lead = (on: boolean, children: React.ReactNode, cls = "") =>
    on ? (
      <span className={`inline-flex flex-wrap items-baseline gap-x-2 rounded-full bg-terracotta-soft px-3 py-1 text-terracotta-deep ${cls}`}>
        {children}
        <span className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.08em]">Best</span>
      </span>
    ) : (
      <span className={cls}>{children}</span>
    );

  const group = (label: string) => (
    <tr>
      <th scope="colgroup" colSpan={n + 1} className="bg-sand-soft py-2.5 text-left font-normal">
        <span className="sticky left-0 inline-block px-4 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-[#7A5418] sm:px-6">
          {label}
        </span>
      </th>
    </tr>
  );

  const statusCell = (text?: string) => {
    const s = statusGlyph[classify(text)];
    return (
      <>
        <span className={`num inline-grid h-7 min-w-7 place-items-center rounded-full px-1.5 text-[0.85rem] font-semibold ${s.cls}`}>
          {s.glyph}
          <span className="sr-only"> {s.label}</span>
        </span>
        <p className="mt-2 text-[0.82rem] leading-relaxed text-ink-2">{text || "Not stated by the vendor."}</p>
      </>
    );
  };

  return (
    <div>
      {/* ------------------------------------------------ Pickers */}
      <fieldset className="rounded-[28px] bg-sand-soft p-5 sm:p-7">
        <legend className="sr-only">Choose products to compare</legend>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {slots.map((current, i) => {
            const taken = slots.filter((p, j) => p && j !== i).map((p) => p!.slug);
            const id = `compare-slot-${i}`;
            return (
              <div key={i}>
                <label htmlFor={id} className="flex items-baseline gap-2.5">
                  <span className="display text-[1.7rem] leading-none text-terracotta">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-ink-2">
                    {slotLabels[i]}
                  </span>
                </label>
                <div className="mt-3 flex items-center gap-2">
                  <div className="relative min-w-0 flex-1">
                    {current && (
                      <span className="pointer-events-none absolute left-2.5 top-1/2 z-10 flex -translate-y-1/2">
                        <Monogram name={current.name} color={current.accentColor} size="sm" className="!rounded-full" />
                      </span>
                    )}
                    <select
                      id={id}
                      value={current?.slug ?? ""}
                      onChange={(e) => setSlot(i, e.target.value)}
                      className={`field !min-h-[56px] cursor-pointer appearance-none !rounded-full !border-transparent pr-11 text-[1rem] font-semibold shadow-[0_1px_0_rgba(31,25,21,0.06)] hover:!border-ink-3 focus:!border-ink ${
                        current ? "!pl-14" : "!pl-5 text-ink-2"
                      }`}
                    >
                      <option value="">{i === 2 ? "None" : "Choose a product"}</option>
                      {softwares
                        .filter((s) => !taken.includes(s.slug))
                        .map((s) => (
                          <option key={s.id} value={s.slug}>
                            {s.name} · {s.categoryName}
                          </option>
                        ))}
                    </select>
                    <span aria-hidden="true" className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-[0.75rem] text-ink-3">
                      ▼
                    </span>
                  </div>
                  {current && (
                    <button
                      type="button"
                      onClick={() => setSlot(i, "")}
                      aria-label={`Remove ${current.name}`}
                      className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-paper text-[1.2rem] text-ink-2 transition-colors hover:bg-terracotta hover:text-white"
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </fieldset>

      {curatedVerdict && (
        <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-12">
          <div className="rounded-[24px] bg-teal p-6 text-teal-soft lg:col-span-7">
            <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-sand">Our verdict</p>
            <p className="mt-3 font-display text-[1.35rem] font-semibold leading-snug text-paper">{curatedVerdict.winnerSummary}</p>
          </div>
          <div className="rounded-[24px] bg-terracotta-soft p-6 lg:col-span-5">
            <p className="kicker kicker-accent">The Gulf angle</p>
            <p className="mt-3 text-ink-2">{curatedVerdict.gulfContext}</p>
          </div>
        </div>
      )}

      {/* ------------------------------------------------ Empty state */}
      {n < 2 && (
        <div className="mt-8 rounded-[28px] border-[1.5px] border-dashed border-sand bg-surface px-5 py-10 sm:px-10 sm:py-12">
          <span className="tag tag-accent">{n === 0 ? "Nothing picked yet" : "One more to go"}</span>
          <p className="h-card mt-4 max-w-[36ch] text-[1.7rem]">
            {n === 0
              ? "Pick two or three products above to see them side by side."
              : `Pick a second product to compare with ${active[0].name}.`}
          </p>
          <p className="mt-7 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-ink-3">
            {n === 1 && sameCategory.length ? `Also in ${active[0].categoryName}` : "Quick picks · highest scores"}
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => setSlot(slots.findIndex((p) => !p), s.slug)}
                  className="group inline-flex items-center gap-2.5 rounded-full border-[1.5px] border-rule bg-paper py-1.5 pl-1.5 pr-4 transition-colors hover:border-ink"
                >
                  <Monogram name={s.name} color={s.accentColor} size="sm" className="!rounded-full" />
                  <span className="font-semibold transition-colors group-hover:text-terracotta">{s.name}</span>
                  <span className="num rounded-full bg-sand-soft px-2 py-0.5 text-[0.75rem]">{s.verdict.score.toFixed(1)}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ------------------------------------------------ Table */}
      {n >= 2 && (
        <p className="num mt-8 text-[0.72rem] text-ink-3 sm:hidden">Scroll sideways to see each product →</p>
      )}
      {n >= 2 && (
        <div className="mt-4 overflow-x-auto rounded-[28px] border-[1.5px] border-rule bg-surface sm:mt-8">
          <table className={`w-full border-collapse text-left ${n === 3 ? "min-w-[900px]" : "min-w-[640px]"}`}>
            <caption className="sr-only">
              {active.map((p) => p.name).join(" compared with ")}. Values marked Best lead their row.
            </caption>
            <thead>
              <tr>
                <td className="sticky left-0 z-10 bg-surface pb-6 pl-4 pt-6 align-bottom sm:pl-6">
                  <span className="tag tag-sand hidden sm:inline-flex">{n} products</span>
                </td>
                {active.map((p, i) => (
                  <th key={p.id} scope="col" className="px-4 pb-6 pt-6 text-left align-bottom font-normal sm:px-5">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <Monogram name={p.name} color={p.accentColor} />
                        <div className="min-w-0">
                          <Link
                            href={`/reviews/${p.slug}`}
                            className="h-card block text-[1.25rem] leading-tight transition-colors hover:text-terracotta"
                          >
                            {p.name}
                          </Link>
                          <span className="block truncate text-[0.78rem] text-ink-3">{p.categoryName}</span>
                        </div>
                      </div>
                      <ScoreDial
                        score={p.verdict.score}
                        size={54}
                        color={scoreWin.has(i) ? "#C24E2A" : "#0E4B48"}
                      />
                    </div>
                    <p className="mt-4">
                      <span className={`tag ${leads[i] > 0 ? "tag-accent" : ""}`}>Leads {leads[i]} of 4 measured rows</span>
                    </p>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {group("Score")}
              <tr className={row}>
                <th scope="row" className={thRow}>Our score</th>
                {active.map((p, i) => (
                  <td key={p.id} className={td}>
                    {lead(
                      scoreWin.has(i),
                      <>
                        <span className="num text-[1.35rem] font-semibold leading-none">{p.verdict.score.toFixed(1)}</span>
                        <span className="num text-[0.75rem] opacity-70">/10</span>
                      </>
                    )}
                    <span aria-hidden="true" className="mt-3 block h-1.5 w-full max-w-[10rem] overflow-hidden rounded-full bg-paper-2">
                      <span
                        className={`block h-full rounded-full ${scoreWin.has(i) ? "bg-terracotta" : "bg-teal"}`}
                        style={{ width: `${p.verdict.score * 10}%` }}
                      />
                    </span>
                  </td>
                ))}
              </tr>
              <tr className={row}>
                <th scope="row" className={thRow}>Ease of use</th>
                {active.map((p, i) => (
                  <td key={p.id} className={td}>
                    {lead(
                      easeWin.has(i),
                      <>
                        <span className="num">{p.easeOfUse.toFixed(1)}</span>
                        <span className="num text-[0.75rem] opacity-70">/10</span>
                      </>
                    )}
                  </td>
                ))}
              </tr>
              <tr className={row}>
                <th scope="row" className={thRow}>Reader rating</th>
                {active.map((p) => (
                  <td key={p.id} className={td}>
                    <span className="num">{p.rating.toFixed(1)} / 5</span>
                    <span className="num ml-2 text-[0.75rem] text-ink-3">n={p.reviewCount}</span>
                  </td>
                ))}
              </tr>

              {group("Price")}
              <tr className={row}>
                <th scope="row" className={thRow}>Entry price</th>
                {active.map((p, i) => (
                  <td key={p.id} className={td}>
                    {lead(
                      priceWin.has(i),
                      <span>
                        <span className="num text-[1.05rem] font-semibold">{p.pricing.startingPrice}</span>
                        <span className="num text-[0.8rem] opacity-70">{billingSuffix(p)}</span>
                      </span>
                    )}
                    <p className="mt-1.5 text-[0.78rem] text-ink-3">{p.pricing.billingPeriod}</p>
                  </td>
                ))}
              </tr>
              <tr className={row}>
                <th scope="row" className={thRow}>SAR / AED estimate</th>
                {active.map((p) => (
                  <td key={p.id} className={td}>
                    <span className="num block text-[0.88rem]">
                      {p.pricing.tiers[0]?.regionalEstimateSAR || "See plans"}
                    </span>
                    {p.pricing.tiers[0]?.regionalEstimateAED && (
                      <span className="num block text-[0.88rem] text-ink-2">{p.pricing.tiers[0].regionalEstimateAED}</span>
                    )}
                  </td>
                ))}
              </tr>
              <tr className={row}>
                <th scope="row" className={thRow}>Pricing model</th>
                {active.map((p) => (
                  <td key={p.id} className={`${td} text-ink-2`}>{p.pricing.model}</td>
                ))}
              </tr>

              {group("Compliance")}
              <tr className={row}>
                <th scope="row" className={thRow}>ZATCA e-invoicing</th>
                {active.map((p) => (
                  <td key={p.id} className={td}>
                    {statusCell(p.gulfSuitabilityAnalysis.zatcaStatus)}
                  </td>
                ))}
              </tr>
              <tr className={row}>
                <th scope="row" className={thRow}>UAE VAT</th>
                {active.map((p) => (
                  <td key={p.id} className={td}>
                    {statusCell(p.gulfSuitabilityAnalysis.uaeVatStatus)}
                  </td>
                ))}
              </tr>
              <tr className={row}>
                <th scope="row" className={thRow}>Data residency</th>
                {active.map((p) => (
                  <td key={p.id} className={`${td} text-[0.85rem] text-ink-2`}>
                    {p.gulfSuitabilityAnalysis.dataResidency}
                  </td>
                ))}
              </tr>

              {group("Language and markets")}
              <tr className={row}>
                <th scope="row" className={thRow}>Arabic</th>
                {active.map((p) => (
                  <td key={p.id} className={td}>
                    <span className="tag tag-teal">{arabicLabel(p.arabicSupport)}</span>
                    <p className="mt-2 text-[0.82rem] leading-relaxed text-ink-2">
                      {p.gulfSuitabilityAnalysis.arabicExperience}
                    </p>
                  </td>
                ))}
              </tr>
              {(["Saudi Arabia", "UAE", "GCC"] as const).map((c) => (
                <tr key={c} className={row}>
                  <th scope="row" className={thRow}>
                    {c === "GCC" ? "Wider GCC" : c}
                    <span className="num ml-1.5 text-[0.7rem] font-normal text-ink-3">{countryShort[c]}</span>
                  </th>
                  {active.map((p) => {
                    const yes = p.countrySuitability.includes(c);
                    return (
                      <td key={p.id} className={td}>
                        <span
                          className={`num inline-grid h-7 w-7 place-items-center rounded-full text-[0.85rem] font-semibold ${
                            yes ? "bg-teal-soft text-positive" : "bg-paper-2 text-ink-3"
                          }`}
                        >
                          {yes ? "✓" : "—"}
                          <span className="sr-only">{yes ? " Supported" : " Not listed"}</span>
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
              <tr className={row}>
                <th scope="row" className={thRow}>Local integrations</th>
                {active.map((p) => (
                  <td key={p.id} className={td}>
                    <ul className="flex flex-wrap gap-1.5">
                      {p.localIntegrations.map((item) => (
                        <li key={item} className="rounded-full bg-paper-2 px-2.5 py-1 text-[0.78rem] text-ink-2">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>

              {group("Rollout")}
              <tr className={row}>
                <th scope="row" className={thRow}>Typical deployment</th>
                {active.map((p, i) => (
                  <td key={p.id} className={td}>
                    {lead(deployWin.has(i), <span className="num">{p.deploymentTime}</span>)}
                  </td>
                ))}
              </tr>
              <tr className={row}>
                <th scope="row" className={thRow}>Regional support</th>
                {active.map((p) => (
                  <td key={p.id} className={`${td} text-[0.85rem] text-ink-2`}>
                    {p.gulfSuitabilityAnalysis.regionalSupport}
                  </td>
                ))}
              </tr>

              {group("Our assessment")}
              <tr className={row}>
                <th scope="row" className={thRow}>Strengths</th>
                {active.map((p) => (
                  <td key={p.id} className={td}>
                    <ul className="space-y-2 text-[0.85rem] leading-relaxed text-ink-2">
                      {p.pros.slice(0, 3).map((pro) => (
                        <li key={pro} className="grid grid-cols-[1.1rem_1fr]">
                          <span aria-hidden="true" className="num font-semibold text-positive">+</span>
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
              <tr className={row}>
                <th scope="row" className={thRow}>Weaknesses</th>
                {active.map((p) => (
                  <td key={p.id} className={td}>
                    <ul className="space-y-2 text-[0.85rem] leading-relaxed text-ink-2">
                      {p.cons.slice(0, 3).map((con) => (
                        <li key={con} className="grid grid-cols-[1.1rem_1fr]">
                          <span aria-hidden="true" className="num font-semibold text-negative">−</span>
                          {con}
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
              <tr className={row}>
                <th scope="row" className={thRow}>Best for</th>
                {active.map((p) => (
                  <td key={p.id} className={`${td} text-[0.88rem]`}>{p.verdict.bestFor}</td>
                ))}
              </tr>
              <tr className={row}>
                <th scope="row" className={thRow}>Not for</th>
                {active.map((p) => (
                  <td key={p.id} className={`${td} text-[0.88rem] text-ink-2`}>{p.verdict.notRecommendedFor}</td>
                ))}
              </tr>
              <tr className={row}>
                <th scope="row" className={thRow}>Verdict</th>
                {active.map((p) => (
                  <td key={p.id} className={td}>
                    <p className="h-card text-[1.1rem]">{p.verdict.badge}</p>
                    <p className="mt-2 text-[0.85rem] leading-relaxed text-ink-2">{p.verdict.summary}</p>
                  </td>
                ))}
              </tr>
              <tr className="bg-paper-2">
                <td className="sticky left-0 z-10 bg-paper-2 py-5" />
                {active.map((p) => (
                  <td key={p.id} className="px-4 py-5 sm:px-5">
                    <Link href={`/reviews/${p.slug}`} className="btn btn-sm btn-light">
                      Read the {p.name} review →
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {n >= 2 && (
        <p className="mt-4 max-w-[70ch] text-[0.8rem] text-ink-3">
          <span className="mr-1.5 inline-flex rounded-full bg-terracotta-soft px-2 py-0.5 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.08em] text-terracotta-deep">
            Best
          </span>
          marks the leader on score, ease of use, lowest entry price and shortest deployment. Entry prices use different
          billing units, so check the plans before deciding on price alone.
        </p>
      )}
    </div>
  );
}
