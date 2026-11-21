"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** Renders public-site chrome (header, footer, compare tray) everywhere except the /admin CMS. */
export default function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/admin" || pathname.startsWith("/admin/")) return null;
  return <>{children}</>;
}
