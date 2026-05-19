"use client";

import Link from "next/link";
import Image from "next/image";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";

const socialLinks = [
  { label: "Facebook", icon: FaFacebook, href: "https://www.facebook.com/prachatham" },
  { label: "Twitter", icon: FaTwitter, href: "https://twitter.com/PrachathamF" },
  { label: "Instagram", icon: FaInstagram, href: "https://www.instagram.com/prachathammedia/" },
  { label: "TikTok", icon: FaTiktok, href: "https://www.tiktok.com/@prachathammedia" },
  { label: "YouTube", icon: FaYoutube, href: "https://www.youtube.com/@pnnontv" },
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

          <nav aria-label="เมนูท้ายเว็บไซต์" className="flex flex-wrap justify-center gap-x-4 gap-y-2">
            <Link href="/posts" className="text-sm text-gray-300 hover:text-brand-300 transition-colors">
              สื่อ
            </Link>
            <Link href="/causes" className="text-sm text-gray-300 hover:text-brand-300 transition-colors">
              โครงการ
            </Link>
            <Link href="/publications" className="text-sm text-gray-300 hover:text-brand-300 transition-colors">
              สิ่งพิมพ์
            </Link>
            <Link href="/contact" className="text-sm text-gray-300 hover:text-brand-300 transition-colors">
              ติดต่อ
            </Link>
          </nav>

          <div className="flex items-center justify-center gap-4">
            {socialLinks.map(({ label, icon: IconComponent, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`ติดตามเราบน ${label}`}
                className="text-gray-400 hover:text-brand-300 transition-colors duration-200"
              >
                <IconComponent className="w-4 h-4" />
              </a>
            ))}
          </div>

          <p className="text-xs text-gray-500 leading-relaxed">
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
            <p className="text-sm text-gray-300 leading-relaxed">
              สื่อ ประชาธรรม ประชาทำ
            </p>
            <p className="text-sm text-gray-400 leading-relaxed">
              77/1 หมู่ 5 ต.สุเทพ อ.เมือง
              <br />
              จ.เชียงใหม่ 50200
            </p>
          </div>

          {/* About Foundation */}
          <div className="flex flex-col items-start gap-4">
            <h3 className="text-sm font-semibold text-white tracking-wide">
              เกี่ยวกับมูลนิธิ
            </h3>
            <div className="flex flex-col gap-3">
              <Link
                href="/about"
                className="text-gray-300 text-sm hover:text-brand-300 transition-colors duration-150"
              >
                เกี่ยวกับเรา
              </Link>
              <Link
                href="/contact"
                className="text-gray-300 text-sm hover:text-brand-300 transition-colors duration-150"
              >
                ช่องทางติดต่อเรา
              </Link>
            </div>
          </div>

          {/* Our Projects */}
          <div className="flex flex-col items-start gap-4">
            <h3 className="text-sm font-semibold text-white tracking-wide">
              เมนูหลัก
            </h3>
            <div className="flex flex-col gap-3">
              <Link
                href="/causes"
                className="text-gray-300 text-sm hover:text-brand-300 transition-colors duration-150"
              >
                โครงการที่กำลังทำ
              </Link>
              <Link
                href="/posts"
                className="text-gray-300 text-sm hover:text-brand-300 transition-colors duration-150"
              >
                สื่อ
              </Link>
              <Link
                href="/publications"
                className="text-gray-300 text-sm hover:text-brand-300 transition-colors duration-150"
              >
                สิ่งพิมพ์
              </Link>
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-col items-start gap-4">
            <h3 className="text-sm font-semibold text-white tracking-wide">
              หมวดหมู่
            </h3>
            <div className="flex flex-col gap-3">
              <Link
                href="/category/featured"
                className="text-gray-300 text-sm hover:text-brand-300 transition-colors duration-150"
              >
                ข่าวเด่น
              </Link>
              <Link
                href="/category/activist-journalist"
                className="text-gray-300 text-sm hover:text-brand-300 transition-colors duration-150"
              >
                ACTIVIST JOURNALIST
              </Link>
              <Link
                href="/category/envilocaleyes"
                className="text-gray-300 text-sm hover:text-brand-300 transition-colors duration-150"
              >
                ENVILOCALEYES
              </Link>
              <Link
                href="/category/firedustdialogue"
                className="text-gray-300 text-sm hover:text-brand-300 transition-colors duration-150"
              >
                ฝุ่นไฟ DIALOGUE
              </Link>
              <Link
                href="/category/breath-talk"
                className="text-gray-300 text-sm hover:text-brand-300 transition-colors duration-150"
              >
                BREATH TALK
              </Link>
            </div>
          </div>
        </div>

        <hr className="hidden md:block my-10 border-gray-700" />

        {/* Bottom section */}
        <div className="hidden md:flex md:flex-row gap-6 justify-between items-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} ประชาธรรม — สื่อชุมชนเพื่อการเปลี่ยนแปลง
          </p>

          <div className="flex items-center gap-4">
            {socialLinks.map(({ label, icon: IconComponent, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`ติดตามเราบน ${label}`}
                className="text-gray-400 hover:text-brand-300 hover:-translate-y-0.5 transition-all duration-200"
              >
                <IconComponent className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
