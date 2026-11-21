import Link from "next/link";

const links = [
  { href: "/news", label: "News" },
  { href: "/reviews", label: "Reviews" },
  { href: "/compare", label: "Compare" },
  { href: "/articles", label: "Guides" },
];

/** Rounded window onto the desert: sun, two dunes and a row of Sadu teeth. */
function DuneScene() {
  return (
    <svg viewBox="0 0 320 400" aria-hidden="true" className="h-auto w-full max-w-[340px]">
      <defs>
        <clipPath id="nf-frame">
          <rect width="320" height="400" rx="28" />
        </clipPath>
      </defs>
      <g clipPath="url(#nf-frame)">
        <rect width="320" height="400" fill="#F1D39C" />
        <circle cx="206" cy="150" r="48" fill="#C24E2A" />
        <path d="M0 270 C70 225 140 230 200 262 C250 288 290 280 320 266 V400 H0 Z" fill="#FAEBCF" />
        <path d="M0 318 C60 290 120 286 180 312 C230 334 280 330 320 310 V400 H0 Z" fill="#0E4B48" />
        {/* Sadu teeth along the base */}
        <path
          d="M0 362 L20 382 L40 362 L60 382 L80 362 L100 382 L120 362 L140 382 L160 362 L180 382 L200 362 L220 382 L240 362 L260 382 L280 362 L300 382 L320 362 V400 H0 Z"
          fill="#C24E2A"
        />
        <path d="M60 342 l6 6 l-6 6 l-6 -6 Z M160 342 l6 6 l-6 6 l-6 -6 Z M260 342 l6 6 l-6 6 l-6 -6 Z" fill="#F1D39C" />
      </g>
      <rect
        x="1.5"
        y="1.5"
        width="317"
        height="397"
        rx="26.5"
        fill="none"
        stroke="#1F1915"
        strokeWidth="3"
      />
    </svg>
  );
}

export default function NotFound() {
  return (
    <section aria-labelledby="nf-title" className="wrap grid grid-cols-1 items-center gap-12 py-14 lg:grid-cols-12 lg:gap-14 lg:py-24">
      <div className="order-2 lg:order-1 lg:col-span-7">
        <span className="tag tag-accent">Error 404</span>
        <h1 id="nf-title" className="display mt-6 text-[clamp(2.6rem,1.6rem+4vw,4.75rem)]">
          Lost in the dunes? <span className="text-terracotta">This page isn&rsquo;t here.</span>
        </h1>
        <p className="mt-6 max-w-[50ch] text-[1.1rem] leading-relaxed text-ink-2">
          The link may be old, or the review may have moved. Search for the product, or head back to one of these.
        </p>

        <form action="/reviews" method="get" role="search" className="mt-8 flex max-w-xl flex-col gap-2 rounded-[28px] bg-sand-soft p-2 sm:flex-row sm:rounded-full">
          <label htmlFor="nf-q" className="sr-only">
            Search reviews
          </label>
          <input
            id="nf-q"
            name="q"
            type="search"
            placeholder="Product or category, e.g. Zoho Books"
            className="field flex-1 !rounded-full !border-transparent"
          />
          <button type="submit" className="btn btn-accent">
            Search reviews
          </button>
        </form>

        <nav aria-label="Suggested sections" className="mt-8">
          <ul className="flex flex-wrap gap-2">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="chip">
                  {l.label} <span aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[0.92rem] text-ink-3">
            Or start again from the{" "}
            <Link href="/" className="link text-ink">
              front page
            </Link>
            .
          </p>
        </nav>
      </div>

      <div className="order-1 flex justify-center lg:order-2 lg:col-span-5">
        <div className="relative w-[62%] max-w-[340px] sm:w-[48%] lg:w-full">
          <DuneScene />
        </div>
      </div>
    </section>
  );
}
