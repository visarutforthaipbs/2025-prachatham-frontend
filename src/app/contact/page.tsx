import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "ช่องทางติดต่อเรา | ประชาธรรม",
  description:
    "ติดต่อประชาธรรม สื่อสิ่งแวดล้อมไทย - รับฟังความคิดเห็น คำแนะนำ และข้อเสนอแนะจากทุกท่าน ที่อยู่ เชียงใหม่ อีเมล pnn.thailand@gmail.com",
  keywords:
    "ติดต่อ ประชาธรรม, สื่อสิ่งแวดล้อม, ช่องทางติดต่อ, เชียงใหม่, pnn.thailand@gmail.com, contact, environmental media, thailand",
  authors: [{ name: "Prachatham", url: "https://prachatham.org" }],
  openGraph: {
    title: "ช่องทางติดต่อเรา | ประชาธรรม",
    description:
      "ติดต่อประชาธรรม สื่อสิ่งแวดล้อมไทย - รับฟังความคิดเห็น คำแนะนำ และข้อเสนอแนะจากทุกท่าน",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/contact`,
    siteName: "ประชาธรรม",
    locale: "th_TH",
    type: "website",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/images/ps-favicon.svg`,
        width: 1200,
        height: 630,
        alt: "ติดต่อประชาธรรม สื่อสิ่งแวดล้อมไทย",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ช่องทางติดต่อเรา | ประชาธรรม",
    description:
      "ติดต่อประชาธรรม สื่อสิ่งแวดล้อมไทย - รับฟังความคิดเห็น คำแนะนำ และข้อเสนอแนะจากทุกท่าน",
    images: [`${process.env.NEXT_PUBLIC_SITE_URL}/images/ps-favicon.svg`],
    site: "@PrachathamF",
    creator: "@PrachathamF",
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/contact`,
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
  other: {
    "contact:email": "pnn.thailand@gmail.com",
    "contact:phone_number": "",
    "contact:country_name": "Thailand",
    "contact:region": "Chiang Mai",
    "contact:postal_code": "50200",
    "geo.region": "TH-50",
    "geo.placename": "Chiang Mai",
    "geo.position": "18.7883;98.9853",
    ICBM: "18.7883, 98.9853",
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
