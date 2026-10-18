"use client";

import Link from "next/link";
import Image from "next/image";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaRss,
} from "react-icons/fa";

const socialLinks: {
  label: string;
  icon: typeof FaRss;
  href: string;
  external?: boolean;
}[] = [
  { label: "Facebook", icon: FaFacebook, href: "https://www.facebook.com/prachatham" },
  { label: "Twitter", icon: FaTwitter, href: "https://twitter.com/PrachathamF" },
  { label: "Instagram", icon: FaInstagram, href: "https://www.instagram.com/prachathammedia/" },
  { label: "TikTok", icon: FaTiktok, href: "https://www.tiktok.com/@prachathammedia" },
  { label: "YouTube", icon: FaYoutube, href: "https://www.youtube.com/user/pnnontv" },
  { label: "RSS", icon: FaRss, href: "/feed.xml", external: false },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Top accent bar */}
      <div className="h-[3px] bg-gradient-to-r from-brand-600 via-brand-500 to-accent-500" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-7 md:py-16">
        {/* Compact mobile footer */}
        <div className="md:hidden flex flex-col items-center text-center gap-5">
          <Image
            src="/new-footer-logo.svg"
            alt="ประชาธรรม"
            width={128}
            height={32}
          />

          <nav aria-label="เมนูท้ายเว็บไซต์" className="flex flex-wrap justify-center gap-x-2">
            <Link href="/posts" className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] px-2 text-base text-gray-200 hover:text-brand-200 transition-colors">
              สื่อ
            </Link>
            <Link href="/causes" className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] px-2 text-base text-gray-200 hover:text-brand-200 transition-colors">
              โครงการ
            </Link>
            <Link href="/publications" className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] px-2 text-base text-gray-200 hover:text-brand-200 transition-colors">
              สิ่งพิมพ์
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] px-2 text-base text-gray-200 hover:text-brand-200 transition-colors">
              ติดต่อ
            </Link>
          </nav>

          <div className="flex items-center justify-center gap-1">
            {socialLinks.map(({ label, icon: IconComponent, href, external = true }) => (
              <a
                key={label}
                href={href}
                {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                aria-label={label === "RSS" ? "ติดตามผ่าน RSS" : `ติดตามเราบน ${label}`}
                className="w-11 h-11 inline-flex items-center justify-center rounded-full text-gray-300 hover:text-brand-200 hover:bg-white/10 transition-colors duration-200"
              >
                <IconComponent className="w-5 h-5" aria-hidden="true" />
              </a>
            ))}
          </div>

          <p className="text-sm text-gray-300">
            &copy; {new Date().getFullYear()} ประชาธรรม
          </p>
        </div>

        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Logo and Description */}
          <div className="flex flex-col items-start gap-5">
            <Image
              src="/new-footer-logo.svg"
              alt="ประชาธรรม"
              width={160}
              height={40}
            />
            <p className="text-base text-gray-200">
              สื่อ ประชาธรรม ประชาทำ
            </p>
            <p className="text-base text-gray-300">
              77/1 หมู่ 5 ต.สุเทพ อ.เมือง
              <br />
              จ.เชียงใหม่ 50200
            </p>
          </div>

          {/* About Foundation */}
          <div className="flex flex-col items-start gap-4">
            <h3 className="text-base font-bold text-white">
              เกี่ยวกับมูลนิธิ
            </h3>
            <div className="flex flex-col gap-1">
              <Link
                href="/about"
                className="inline-flex items-center min-h-[32px] text-gray-300 text-base hover:text-brand-200 transition-colors duration-150"
              >
                เกี่ยวกับเรา
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center min-h-[32px] text-gray-300 text-base hover:text-brand-200 transition-colors duration-150"
              >
                ช่องทางติดต่อเรา
              </Link>
            </div>
          </div>

          {/* Our Projects */}
          <div className="flex flex-col items-start gap-4">
            <h3 className="text-base font-bold text-white">
              เมนูหลัก
            </h3>
            <div className="flex flex-col gap-1">
              <Link
                href="/causes"
                className="inline-flex items-center min-h-[32px] text-gray-300 text-base hover:text-brand-200 transition-colors duration-150"
              >
                โครงการที่กำลังทำ
              </Link>
              <Link
                href="/posts"
                className="inline-flex items-center min-h-[32px] text-gray-300 text-base hover:text-brand-200 transition-colors duration-150"
              >
                สื่อ
              </Link>
              <Link
                href="/publications"
                className="inline-flex items-center min-h-[32px] text-gray-300 text-base hover:text-brand-200 transition-colors duration-150"
              >
                สิ่งพิมพ์
              </Link>
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-col items-start gap-4">
            <h3 className="text-base font-bold text-white">
              หมวดหมู่
            </h3>
            <div className="flex flex-col gap-1">
              <Link
                href="/category/featured"
                className="inline-flex items-center min-h-[32px] text-gray-300 text-base hover:text-brand-200 transition-colors duration-150"
              >
                ข่าวเด่น
              </Link>
              <Link
                href="/category/activist-journalist"
                className="inline-flex items-center min-h-[32px] text-gray-300 text-base hover:text-brand-200 transition-colors duration-150"
              >
                Activist Journalist
              </Link>
              <Link
                href="/category/envilocaleyes"
                className="inline-flex items-center min-h-[32px] text-gray-300 text-base hover:text-brand-200 transition-colors duration-150"
              >
                Envilocaleyes
              </Link>
              <Link
                href="/category/firedustdialogue"
                className="inline-flex items-center min-h-[32px] text-gray-300 text-base hover:text-brand-200 transition-colors duration-150"
              >
                ฝุ่นไฟ Dialogue
              </Link>
              <Link
                href="/category/breath-talk"
                className="inline-flex items-center min-h-[32px] text-gray-300 text-base hover:text-brand-200 transition-colors duration-150"
              >
                Breath Talk
              </Link>
            </div>
          </div>
        </div>

        <hr className="hidden md:block my-10 border-gray-700" />

        {/* Bottom section */}
        <div className="hidden md:flex md:flex-row gap-6 justify-between items-center">
          <p className="text-sm text-gray-300">
            &copy; {new Date().getFullYear()} ประชาธรรม — สื่อชุมชนเพื่อการเปลี่ยนแปลง
          </p>

          <div className="flex items-center gap-1">
            {socialLinks.map(({ label, icon: IconComponent, href, external = true }) => (
              <a
                key={label}
                href={href}
                {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                aria-label={label === "RSS" ? "ติดตามผ่าน RSS" : `ติดตามเราบน ${label}`}
                className="w-10 h-10 inline-flex items-center justify-center rounded-full text-gray-300 hover:text-brand-200 hover:bg-white/10 transition-colors duration-200"
              >
                <IconComponent className="w-5 h-5" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
