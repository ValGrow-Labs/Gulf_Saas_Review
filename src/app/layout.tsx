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

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: "GulfSaasReview | Gulf Business Software & SaaS Intelligence",
    template: "%s | GulfSaasReview",
  },
  description:
    "Leading Gulf business software directory and SaaS evaluation platform. Dedicated independent reviews, ZATCA e-invoicing compliance, and side-by-side software comparisons for Saudi Arabia, UAE, Qatar, Kuwait, Bahrain, and Oman.",
  keywords: [
    "Gulf SaaS reviews",
    "Saudi Arabia business software",
    "UAE B2B software",
    "ZATCA compliance software",
    "GCC cloud accounting",
    "Gulf software comparisons",
    "Middle East CRM ERP",
  ],
  authors: [{ name: "GulfSaasReview Editorial Board" }],
  openGraph: {
    title: "GulfSaasReview — Gulf Business Software & SaaS Intelligence",
    description: "Independent reviews, regional compliance verification (ZATCA, UAE VAT, WPS), and software comparisons across KSA, UAE, and the GCC.",
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
      <body className="min-h-screen flex flex-col bg-[#FFF8EF] text-[#064734] font-sans antialiased overflow-x-clip selection:bg-[#E0FFC2] selection:text-[#064734]">
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
