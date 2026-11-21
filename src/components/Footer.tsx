import React from "react";
import Link from "next/link";
import Logo from "./Logo";
import Sadu from "./Sadu";
import { newsSections } from "@/lib/news";

const columns = [
  {
    title: "News",
    links: [{ label: "Latest", href: "/news" }, ...newsSections.slice(0, 4).map((s) => ({ label: s.label, href: `/news?section=${s.slug}` }))],
  },
  {
    title: "Buy better",
    links: [
      { label: "Reviews", href: "/reviews" },
      { label: "Categories", href: "/categories" },
      { label: "Compare", href: "/compare" },
      { label: "Buyer guides", href: "/articles" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About & method", href: "/about" },
      { label: "Submit a product", href: "/contact?type=vendor" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-auto">
      <Sadu from="#FFFCF6" to="#0E4B48" accent="#C24E2A" />
      <div className="bg-teal text-teal-soft">
        <div className="wrap pt-14 pb-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Logo variant="light" />
              <p className="mt-6 max-w-md font-display text-[1.5rem] font-semibold leading-snug tracking-[-0.02em] text-paper">
                Business software and tech news for the Gulf, tested against ZATCA, the FTA, WPS and real Arabic.
              </p>
              <p className="mt-4 max-w-md text-[0.92rem]">No vendor pays for a rating or a place on a list.</p>
            </div>
            <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7 lg:pl-10">
              {columns.map((col) => (
                <div key={col.title}>
                  <h2 className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-sand">{col.title}</h2>
                  <ul className="mt-4 space-y-2.5">
                    {col.links.map((l) => (
                      <li key={l.href}>
                        <Link href={l.href} className="text-[0.95rem] text-paper/85 transition-colors hover:text-sand">
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>

          <div className="mt-14 flex flex-col gap-4 border-t border-white/15 pt-6 text-[0.84rem] md:flex-row md:items-center md:justify-between">
            <p className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <span className="num">© 2026 Gulf SaaS Review</span>
              <span lang="ar" dir="rtl" className="font-arabic text-sand">
                أخبار التقنية والبرمجيات في الخليج
              </span>
            </p>
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <li><Link href="/privacy" className="hover:text-paper transition-colors">Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-paper transition-colors">Terms</Link></li>
              <li><a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-paper transition-colors">LinkedIn ↗</a></li>
              <li><a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-paper transition-colors">X ↗</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
