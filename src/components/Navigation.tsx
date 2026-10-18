"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useClickOutside } from "@/lib/hooks/useClickOutside";
import { useFocusTrap } from "@/lib/hooks/useFocusTrap";
import ThemeToggle from "@/components/ThemeToggle";

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
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const mobileNavRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Auto-focus search input only on desktop (avoid mobile keyboard pop-up)
  useEffect(() => {
    if (isSearchOpen && !isMobile && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen, isMobile]);

  // Cmd+K / Ctrl+K keyboard shortcut to open search
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useClickOutside(mobileNavRef, () => setIsOpen(false), isOpen);
  useFocusTrap(mobileNavRef, isOpen, { onEscape: () => setIsOpen(false) });
  useFocusTrap(searchRef, isSearchOpen, { onEscape: () => setIsSearchOpen(false) });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setIsSearchOpen(false);
    }
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <div className="sticky top-0 z-[1000]">
      {/* Top accent bar */}
      <div className="h-[3px] bg-gradient-to-r from-brand-600 via-brand-500 to-accent-500" />

      <div className="flex text-gray-700 dark:text-gray-200 min-h-16 py-2 px-4 border-b border-black/5 dark:border-white/10 items-center shadow-sm backdrop-blur-[14px] backdrop-saturate-[160%] bg-[#fbfcf7]/94 dark:bg-forest-950/90">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 w-full">
          <div className="flex items-center justify-between">
            {/* Mobile menu button */}
            <div className="flex flex-1 md:flex-none -ml-2 md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? "ปิดเมนู" : "เปิดเมนู"}
                aria-expanded={isOpen}
                aria-controls="mobile-nav"
                className="shrink-0 w-11 h-11 inline-flex items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" aria-hidden="true" stroke="currentColor" viewBox="0 0 24 24">
                  {isOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>

            {/* Logo */}
            <div className="flex flex-1 justify-center md:justify-start items-center">
              <Link
                href="/"
                className="flex items-center min-h-[44px] hover:no-underline"
              >
                {/* Teal logo on light, light logo on dark (teal #044B41 on the
                    dark bar is 1.4:1 — the wordmark disappeared). */}
                <Image
                  src="/new-logo-2.svg"
                  alt="ประชาธรรม"
                  width={160}
                  height={40}
                  priority
                  className="dark:hidden"
                />
                <Image
                  src="/new-footer-logo.svg"
                  alt="ประชาธรรม"
                  width={160}
                  height={40}
                  className="hidden dark:block"
                />
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex ml-10" aria-label="เมนูหลัก">
                <div className="flex items-center gap-1">
                  {NAV_ITEMS.map((navItem) => {
                    const active = isActive(navItem.href || "#");
                    return (
                      <Link
                        key={navItem.label}
                        href={navItem.href || "#"}
                        className={`inline-flex items-center min-h-[44px] px-4 py-2 text-lg font-medium rounded-full relative hover:no-underline transition-colors duration-200 ${
                          active
                            ? "text-brand-700 dark:text-brand-200 bg-brand-50 dark:bg-brand-900/60 font-bold"
                            : "text-gray-700 dark:text-gray-300 hover:text-brand-800 dark:hover:text-brand-200 hover:bg-black/5 dark:hover:bg-white/10"
                        }`}
                        aria-current={active ? "page" : undefined}
                      >
                        {navItem.label}
                      </Link>
                    );
                  })}
                </div>
              </nav>
            </div>

            {/* Right side buttons */}
            <div className="flex flex-1 md:flex-none justify-end items-center gap-0.5 md:gap-1 shrink-0">
              {/* Theme toggle */}
              <ThemeToggle />

              {/* Search button */}
              <button
                aria-label="ค้นหา"
                aria-expanded={isSearchOpen}
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="shrink-0 w-11 h-11 inline-flex items-center justify-center text-gray-600 dark:text-gray-300 rounded-full hover:bg-black/5 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                <svg className="w-5 h-5" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Contact Us Button - Desktop */}
              <Link
                href="/contact"
                className="btn-primary hidden md:inline-flex ml-1"
              >
                ติดต่อเรา
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        ref={mobileNavRef}
        id="mobile-nav"
        className={`md:hidden bg-[#fbfcf7] dark:bg-forest-950 border-b border-black/5 dark:border-white/10 shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="p-5 flex flex-col gap-1">
          {NAV_ITEMS.map((navItem) => {
            const active = isActive(navItem.href || "#");
            return (
              <Link
                key={navItem.label}
                href={navItem.href || "#"}
                className={`w-full min-h-[48px] flex items-center py-2 px-4 text-lg font-medium rounded-xl hover:no-underline transition-colors duration-150 ${
                  active
                    ? "text-brand-700 dark:text-brand-200 bg-brand-50 dark:bg-brand-900/60 font-bold"
                    : "text-gray-700 dark:text-gray-300 hover:text-brand-800 dark:hover:text-brand-200 hover:bg-black/5 dark:hover:bg-white/10"
                }`}
                aria-current={active ? "page" : undefined}
                onClick={() => setIsOpen(false)}
              >
                {navItem.label}
              </Link>
            );
          })}

          {/* Contact Us Button - Mobile */}
          <Link
            href="/contact"
            className="btn-primary w-full mt-3"
            onClick={() => setIsOpen(false)}
          >
            ติดต่อเรา
          </Link>
        </div>
      </div>

      {/* Search Box */}
      <div
        ref={searchRef}
        className={`bg-[#fbfcf7] dark:bg-forest-950 border-b border-black/5 dark:border-white/10 shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${
          isSearchOpen ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"
        }`}
        aria-hidden={!isSearchOpen}
      >
        <div className="p-5 max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <form onSubmit={handleSearch}>
            <input
              ref={searchInputRef}
              placeholder="พิมพ์คำที่ต้องการค้นหา..."
              aria-label="ค้นหาบทความ"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              type="search"
              enterKeyHint="search"
              className="w-full min-h-[48px] px-4 py-2 text-lg rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200 dark:focus:ring-brand-900 transition-colors"
            />
            <div className="flex justify-end mt-3 gap-2">
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="min-h-[44px] px-5 py-2 text-lg font-medium rounded-full text-gray-700 dark:text-gray-200 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              >
                ยกเลิก
              </button>
              <button
                type="submit"
                className="btn-primary"
              >
                ค้นหา
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
