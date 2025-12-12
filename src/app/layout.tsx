import type { Metadata, Viewport } from "next";
import { Providers } from "./providers";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Box } from "@chakra-ui/react";
import "./globals.css";
import "@/styles/fonts.css";
import "@/styles/print.css";

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
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/images/ps-favicon.svg",
    shortcut: "/images/ps-favicon.svg",
    apple: "/images/ps-favicon.svg",
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
  return (
    <html lang="th" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers>
          <Box minH="100vh" bg="gray.50" display="flex" flexDirection="column">
            <Navigation />
            <Box as="main" flex="1">
              {children}
            </Box>
            <Footer />
          </Box>
        </Providers>
      </body>
    </html>
  );
}
