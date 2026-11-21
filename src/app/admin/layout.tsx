import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { LogoMark } from "@/components/Logo";
import { isAdmin } from "@/lib/admin-auth";
import { logoutAction } from "./actions";

export const metadata: Metadata = {
  title: "CMS",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const loggedIn = await isAdmin();

  return (
    <div className="min-h-dvh bg-paper-2">
      <header className="sticky top-0 z-40 bg-teal text-paper shadow-[0_8px_24px_-16px_rgba(31,25,21,0.6)]">
        <div className="wrap flex h-14 items-center justify-between gap-4">
          <Link href={loggedIn ? "/admin/stories" : "/admin/login"} className="flex items-center gap-2.5">
            <LogoMark className="h-7 w-7" light />
            <span className="font-display text-[1.05rem] font-extrabold tracking-[-0.04em]">
              Gulf SaaS <span className="text-sand">Review</span>
            </span>
            <span className="rounded-full bg-white/12 px-2 py-0.5 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-sand">
              CMS
            </span>
          </Link>
          {loggedIn && (
            <nav aria-label="Admin" className="flex items-center gap-1 text-[0.88rem] font-semibold">
              <Link href="/admin/stories" className="rounded-full px-3 py-1.5 hover:bg-white/10">
                Stories
              </Link>
              <Link href="/admin/stories/new" className="rounded-full bg-sand px-3.5 py-1.5 text-ink hover:bg-[#F6DFB4]">
                + New story
              </Link>
              <Link href="/" target="_blank" className="hidden rounded-full px-3 py-1.5 hover:bg-white/10 sm:inline">
                View site ↗
              </Link>
              <form action={logoutAction}>
                <button type="submit" className="rounded-full px-3 py-1.5 text-white/80 hover:bg-white/10 hover:text-white">
                  Log out
                </button>
              </form>
            </nav>
          )}
        </div>
      </header>
      <main className="wrap py-8">{children}</main>
    </div>
  );
}
