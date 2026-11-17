import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Lora } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import Navigation from "@/components/Navigation";
import BreakingNewsTicker from "@/components/BreakingNewsTicker";
import Footer from "@/components/Footer";
import CompareTray from "@/components/CompareTray";
import SearchModal from "@/components/SearchModal";

const sans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const serif = Lora({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "GulfSaasReview | Gulf Business Technology & SaaS News Journal",
    template: "%s | GulfSaasReview",
  },
  description:
    "Leading Gulf business technology, artificial intelligence, and enterprise software publication. Dedicated coverage of Saudi Arabia, UAE, Qatar, Kuwait, Bahrain, and Oman.",
  keywords: [
    "Gulf technology news",
    "Saudi Arabia AI",
    "Dubai AI Campus",
    "Middle East B2B SaaS",
    "ZATCA compliance",
    "GCC cloud computing",
    "Gulf software comparisons",
    "Arab business tech journal",
  ],
  authors: [{ name: "GulfSaasReview Editorial Board" }],
  openGraph: {
    title: "GulfSaasReview — Gulf Business Technology & SaaS Intelligence",
    description: "Daily reporting on artificial intelligence, sovereign cloud, enterprise software reviews, and market comparisons across KSA, UAE, and the GCC.",
    url: "https://gulfsaasreview.com",
    siteName: "GulfSaasReview",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${serif.variable}`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-screen flex flex-col bg-[#F6F1E7] text-[#101F35] font-sans antialiased selection:bg-[#C6A66B]/25 selection:text-[#101F35]">
        <AppProvider>
          <Navigation />
          <BreakingNewsTicker />
          <main className="flex-1">{children}</main>
          <Footer />
          <CompareTray />
          <SearchModal />
        </AppProvider>
      </body>
    </html>
  );
}
