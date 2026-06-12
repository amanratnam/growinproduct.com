import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import TopNav from "@/components/TopNav";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Grow In Product, Product Management & Technology Consulting",
    template: "%s · Grow In Product",
  },
  description:
    "Product strategy, business analysis, AI & automation, and fractional product leadership. Ship products that grow.",
  openGraph: {
    title: "Grow In Product",
    description:
      "Product strategy, business analysis, AI & automation, and fractional product leadership.",
    type: "website",
    images: [{ url: "/logo-full.png", width: 612, height: 408, alt: "Grow In Product" }],
  },
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SmoothScroll>
          <TopNav />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
