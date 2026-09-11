import type { Metadata } from "next";
import { Anton, Montserrat } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { site } from "@/lib/content";

/* Anton carries the display voice, Montserrat everything else. Two families,
   no italics, no third weight axis to police. */
const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://growinproduct.com"),
  title: {
    default: "Grow In Product — Product Management & Technology Consulting",
    template: "%s · Grow In Product",
  },
  description:
    "Product strategy, business analysis, AI & automation, and fractional product leadership. One senior operator, strategy through launch.",
  openGraph: {
    title: "Grow In Product",
    description:
      "Product strategy, business analysis, AI & automation, and fractional product leadership.",
    type: "website",
    url: "/",
    siteName: site.name,
    images: [{ url: "/logo-full.png", width: 612, height: 408, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: "Building products. Driving growth.",
    images: ["/logo-full.png"],
  },
  icons: { icon: "/icon.png", apple: "/apple-icon.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${anton.variable} ${montserrat.variable}`}>
      <head>
        {/* Scroll reveals start at opacity 0 and are switched on by an
            IntersectionObserver. Without scripting that never happens, so the
            page would render blank. */}
        <noscript>
          <style>{`.reveal{opacity:1;transform:none}.reveal-line>*{transform:none}`}</style>
        </noscript>
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-2 focus:text-bg"
        >
          Skip to content
        </a>
        <SmoothScroll>
          <SiteHeader />
          {/* pushes page content clear of the fixed header */}
          <div id="main" style={{ paddingTop: "var(--header-h)" }}>
            {children}
          </div>
          <SiteFooter />
        </SmoothScroll>
      </body>
    </html>
  );
}
