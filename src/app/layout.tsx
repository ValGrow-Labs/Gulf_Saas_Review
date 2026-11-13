import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Lora } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import Navigation from "@/components/Navigation";
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
    default: "GulfSaasReview | Independent Software Reviews for Saudi Arabia, UAE & GCC",
    template: "%s | GulfSaasReview",
  },
  description:
    "Independent software reviews, expert comparisons, and practical technology insights to help Middle Eastern businesses make smarter software decisions. ZATCA compliance, Arabic support & UAE VAT.",
  keywords: [
    "Gulf SaaS reviews",
    "Saudi Arabia business software",
    "UAE software comparison",
    "ZATCA Phase 2 compliant software",
    "GCC ERP systems",
    "Middle East CRM",
    "Riyadh Dubai software directory",
  ],
  authors: [{ name: "GulfSaasReview Editorial Board" }],
  openGraph: {
    title: "GulfSaasReview — Software Reviews with a Gulf Perspective",
    description: "Independent reviews, side-by-side comparisons, and regional compliance analysis for businesses in KSA, UAE, and GCC.",
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
      <body className="min-h-screen flex flex-col bg-[#E8DCC4] text-[#1F3D2B] font-sans antialiased selection:bg-[#C6A66B]/20 selection:text-[#1F3D2B]">
        <AppProvider>
          <Navigation />
          <main className="flex-1">{children}</main>
          <Footer />
          <CompareTray />
          <SearchModal />
        </AppProvider>
      </body>
    </html>
  );
}
