import type { Metadata, Viewport } from "next";
import dynamic from "next/dynamic";
import Script from "next/script";
import { Providers } from "./providers";
import Navigation from "@/components/Navigation";
import SkipLink from "@/components/SkipLink";
import ErrorBoundaryWrapper from "@/components/ErrorBoundary";
import "./globals.css";
import "@/styles/fonts.css";
import "@/styles/print.css";

const Footer = dynamic(() => import("@/components/Footer"), {
  loading: () => null,
});
const BackToTop = dynamic(() => import("@/components/BackToTop"));

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "ประชาธรรม -  การเปลี่ยนแปลงผ่านสื่อชุมชน",
  description: "องค์กรสื่อสิ่งแวดล้อมไทย เพื่อการอนุรักษ์และพัฒนาที่ยั่งยืน",
  keywords:
    "สิ่งแวดล้อม, ประชาธรรม, การอนุรักษ์, ธรรมชาติ, สื่อสิ่งแวดล้อม, สื่อชุมชน, การเปลี่ยนแปลง, พัฒนาที่ยั่งยืน",
  authors: [{ name: "Prachatham" }],
  creator: "Prachatham Foundation",
  publisher: "Prachatham Foundation",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.prachatham.com"
  ),
  icons: {
    icon: "/new-favicon.svg",
    shortcut: "/new-favicon.svg",
    apple: "/new-favicon.svg",
  },
  openGraph: {
    title: "ประชาธรรม | สื่อสิ่งแวดล้อมไทย",
    description:
      "องค์กรสื่อสิ่งแวดล้อมไทย เพื่อการอนุรักษ์และพัฒนาที่ยั่งยืน ผ่านการสื่อสารและสื่อชุมชน",
    url: "/",
    siteName: "ประชาธรรม",
    locale: "th_TH",
    type: "website",
    images: [
      {
        url: "/images/hero-1-page-1.jpg",
        width: 1200,
        height: 630,
        alt: "ประชาธรรม | สื่อสิ่งแวดล้อมไทย",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ประชาธรรม | สื่อสิ่งแวดล้อมไทย",
    description: "องค์กรสื่อสิ่งแวดล้อมไทย เพื่อการอนุรักษ์และพัฒนาที่ยั่งยืน",
    images: ["/images/hero-1-page-1.jpg"],
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
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID;

  return (
    <html lang="th" suppressHydrationWarning>
      <head>
        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="/font/dbhelvethaicax-webfont.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/font/dbhelvethaicaxbd-webfont.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {/* Preconnect to external origins */}
        <link rel="dns-prefetch" href="https://cms.prachatham.com" />
        <link rel="preconnect" href="https://cms.prachatham.com" crossOrigin="anonymous" />
        {adsenseId && (
          <>
            <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
            <link rel="preconnect" href="https://pagead2.googlesyndication.com" crossOrigin="anonymous" />
          </>
        )}
      </head>
      <body suppressHydrationWarning>
        <Providers>
          <SkipLink />
          <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
            <Navigation />
            <main id="main-content" className="flex-1" tabIndex={-1}>
              <ErrorBoundaryWrapper>
                {children}
              </ErrorBoundaryWrapper>
            </main>
            <Footer />
          </div>
          <BackToTop />
        </Providers>
        {adsenseId && (
          <Script
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
            crossOrigin="anonymous"
            strategy="lazyOnload"
          />
        )}
      </body>
    </html>
  );
}
