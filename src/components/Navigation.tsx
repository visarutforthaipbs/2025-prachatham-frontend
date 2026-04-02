"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface NavItem {
  label: string;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "โครงการที่กำลังทำ",
    href: "/causes",
  },
  {
    label: "สื่อ",
    href: "/posts",
  },
  {
    label: "สิ่งพิมพ์",
    href: "/publications",
  },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setIsSearchOpen(false);
    }
  };

  return (
    <div className="sticky top-0 z-[1000]">
      {/* Top accent bar */}
      <div className="h-[3px] bg-gradient-to-r from-brand-600 via-brand-500 to-accent-500" />

      <div
        className="flex text-gray-600 min-h-16 py-2 px-4 border-b border-gray-100 items-center shadow-sm backdrop-blur-[12px] backdrop-saturate-[180%]"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.92)" }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 w-full">
          <div className="flex items-center justify-between">
            {/* Mobile menu button */}
            <div className="flex flex-1 md:flex-none -ml-2 md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? "ปิดเมนู" : "เปิดเมนู"}
                aria-expanded={isOpen}
                aria-controls="mobile-nav"
                className="p-2 rounded-md hover:bg-gray-100 transition-colors"
              >
                {isOpen ? (
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>

            {/* Logo */}
            <div className="flex flex-1 justify-center md:justify-start items-center">
              <Link
                href="/"
                className="flex items-center hover:no-underline"
              >
                <Image
                  src="/new-logo-2.svg"
                  alt="ประชาธรรม"
                  width={160}
                  height={40}
                  priority
                />
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex ml-10">
                <div className="flex items-center gap-1">
                  {NAV_ITEMS.map((navItem) => (
                    <Link
                      key={navItem.label}
                      href={navItem.href || "#"}
                      className="px-4 py-2 text-sm font-medium text-gray-600 rounded-md relative hover:no-underline hover:text-brand-700 hover:bg-brand-50 transition-all duration-200"
                    >
                      {navItem.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Right side buttons */}
            <div className="flex flex-1 md:flex-none justify-end items-center gap-2">
              {/* Search button */}
              <button
                aria-label="Search"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-gray-500 rounded-md hover:bg-gray-100 hover:text-gray-700 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Contact Us Button - Desktop */}
              <Link
                href="/contact"
                className="btn-primary hidden md:flex text-sm"
              >
                ติดต่อเรา
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div
          id="mobile-nav"
          className="md:hidden bg-white p-5 border-b border-gray-100 shadow-lg"
        >
          <div className="flex flex-col gap-1">
            {NAV_ITEMS.map((navItem) => (
              <Link
                key={navItem.label}
                href={navItem.href || "#"}
                className="w-full py-3 px-4 font-medium text-gray-700 rounded-lg hover:no-underline hover:text-brand-700 hover:bg-brand-50 transition-all duration-150"
                onClick={() => setIsOpen(false)}
              >
                {navItem.label}
              </Link>
            ))}

            {/* Contact Us Button - Mobile */}
            <Link
              href="/contact"
              className="btn-primary w-full mt-3 rounded-lg font-medium text-center"
              onClick={() => setIsOpen(false)}
            >
              ติดต่อเรา
            </Link>
          </div>
        </div>
      )}

      {/* Search Box */}
      {isSearchOpen && (
        <div className="bg-white p-5 border-b border-gray-100 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <form onSubmit={handleSearch}>
              <input
                placeholder="พิมพ์คำที่ต้องการค้นหา..."
                aria-label="ค้นหาบทความ"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 text-lg rounded-lg bg-gray-50 border border-gray-200 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200 transition-colors"
                autoFocus
              />
              <div className="flex justify-end mt-3 gap-2">
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  className="px-4 py-2 text-sm rounded-md hover:bg-gray-100 transition-colors"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="btn-primary text-sm"
                >
                  ค้นหา
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
