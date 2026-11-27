import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Hanken_Grotesk, JetBrains_Mono, Readex_Pro } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CompareTray from "@/components/CompareTray";
import SearchModal from "@/components/SearchModal";
import SiteChrome from "@/components/SiteChrome";
import { getPublishedStories } from "@/lib/news-store";
import { SITE_URL } from "@/lib/site";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "wdth"],
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const readex = Readex_Pro({
  variable: "--font-readex",
  subsets: ["arabic", "latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#FFFCF6",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Gulf SaaS Review — Business software and tech news from the Gulf",
    template: "%s — Gulf SaaS Review",
  },
  description:
    "Independent reviews and side-by-side comparisons of accounting, CRM, HR and ERP software for Saudi Arabia, the UAE and the wider GCC. Every product is checked for ZATCA, UAE FTA, WPS and Arabic support.",
  keywords: [
    "Gulf SaaS reviews",
    "Saudi Arabia business software",
    "UAE B2B software",
    "ZATCA compliance software",
    "GCC cloud accounting",
    "Gulf software comparisons",
    "Saudi HR software WPS Mudad",
    "UAE Corporate Tax ERP",
  ],
  authors: [{ name: "Gulf SaaS Review editorial desk" }],
  creator: "Gulf SaaS Review",
  publisher: "Gulf SaaS Review",
  alternates: {
    canonical: "./",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Gulf SaaS Review — Business software and tech news from the Gulf",
    description:
      "Independent reviews of business software for Saudi Arabia, the UAE and the GCC — tested for local tax, payroll and language rules.",
    url: "/",
    siteName: "Gulf SaaS Review",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/articles/uae-einvoicing-digital.jpg",
        width: 1200,
        height: 750,
        alt: "Gulf SaaS Review — Regional enterprise software and technology news",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gulf SaaS Review — Business software and tech news from the Gulf",
    description:
      "Independent reviews of business software for Saudi Arabia, the UAE and the GCC — tested for local tax, payroll and language rules.",
    images: ["/articles/uae-einvoicing-digital.jpg"],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchStories = (await getPublishedStories()).map(({ id, slug, title, excerpt, tags, categorySlug, isoDate, publishedDate }) => ({
    id, slug, title, excerpt, tags, categorySlug, isoDate, publishedDate,
  }));

  const globalSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "NewsMediaOrganization",
      "@id": "https://gulfsaasreview.com/#organization",
      name: "Gulf SaaS Review",
      url: "https://gulfsaasreview.com",
      description:
        "Independent evaluations, regional compliance audits, and business technology news from Saudi Arabia, the UAE, and the wider GCC.",
      areaServed: ["Saudi Arabia", "United Arab Emirates", "Qatar", "Kuwait", "Bahrain", "Oman"],
      knowsAbout: ["ZATCA Phase 2", "WPS", "Mudad", "UAE Corporate Tax", "Enterprise SaaS", "Cloud ERP"],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://gulfsaasreview.com/#website",
      name: "Gulf SaaS Review",
      url: "https://gulfsaasreview.com",
      publisher: {
        "@id": "https://gulfsaasreview.com/#organization",
      },
    },
  ];

  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${hanken.variable} ${jetbrains.variable} ${readex.variable}`}
      data-scroll-behavior="smooth"
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalSchemas) }}
        />
      </head>
      <body className="min-h-dvh flex flex-col bg-paper text-ink font-sans antialiased overflow-x-clip">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-ink focus:text-paper focus:px-4 focus:py-2 focus:rounded-full"
        >
          Skip to content
        </a>
        <AppProvider>
          <SiteChrome>
            <Navigation />
          </SiteChrome>
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteChrome>
            <Footer />
            <CompareTray />
          </SiteChrome>
          <SearchModal stories={searchStories} />
        </AppProvider>
      </body>
    </html>
  );
}
