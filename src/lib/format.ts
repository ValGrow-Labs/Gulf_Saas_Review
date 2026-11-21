import type { Software } from "@/types";

export const countryShort: Record<string, string> = {
  "Saudi Arabia": "KSA",
  UAE: "UAE",
  GCC: "GCC",
};

export function marketsLabel(software: Software) {
  return software.countrySuitability.map((c) => countryShort[c] || c).join(" · ");
}

export function billingSuffix(software: Software) {
  const price = software.pricing.startingPrice?.toLowerCase() || "";
  if (price.includes("quote") || price.includes("free")) return "";
  const period = software.pricing.billingPeriod?.toLowerCase() || "";
  if (["user", "seat", "agent", "employee"].some((k) => period.includes(k))) return "/user/mo";
  return "/mo";
}

export function arabicLabel(level: string) {
  if (level.startsWith("Native")) return "Native RTL";
  if (level.startsWith("Partial")) return "Partial";
  if (level.startsWith("Third")) return "Via partner";
  return "English only";
}

export const pad2 = (n: number) => String(n).padStart(2, "0");
