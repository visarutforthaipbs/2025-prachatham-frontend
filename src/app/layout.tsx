import type { Metadata } from "next";
import { Providers } from "./providers";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Box } from "@chakra-ui/react";
import "./globals.css";
import "@/styles/fonts.css";
import "@/styles/print.css";

export const metadata: Metadata = {
  title: "ประชาธรรม -  การเปลี่ยนแปลงผ่านสื่อชุมชน",
  description: "องค์กรสื่อสิ่งแวดล้อมไทย เพื่อการอนุรักษ์และพัฒนาที่ยั่งยืน",
  keywords: "สิ่งแวดล้อม, ประชาธรรม, การอนุรักษ์, ธรรมชาติ, สื่อสิ่งแวดล้อม",
  authors: [{ name: "Prachatham" }],
  icons: {
    icon: "/images/ps-favicon.svg",
    shortcut: "/images/ps-favicon.svg",
    apple: "/images/ps-favicon.svg",
  },
  openGraph: {
    title: "ประชาธรรม | สื่อสิ่งแวดล้อมไทย",
    description: "องค์กรสื่อสิ่งแวดล้อมไทย เพื่อการอนุรักษ์และพัฒนาที่ยั่งยืน",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "ประชาธรรม",
    locale: "th_TH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ประชาธรรม | สื่อสิ่งแวดล้อมไทย",
    description: "องค์กรสื่อสิ่งแวดล้อมไทย เพื่อการอนุรักษ์และพัฒนาที่ยั่งยืน",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body suppressHydrationWarning={true}>
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
