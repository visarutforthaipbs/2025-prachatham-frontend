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

      <div className="flex text-gray-700 dark:text-gray-200 min-h-16 py-2 px-4 border-b border-gray-100 dark:border-gray-800 items-center shadow-sm backdrop-blur-[12px] backdrop-saturate-[180%] bg-white/92 dark:bg-gray-900/92">
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
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              <nav className="hidden md:flex ml-10" aria-label="เมนูหลัก">
                <div className="flex items-center gap-1">
                  {NAV_ITEMS.map((navItem) => {
                    const active = isActive(navItem.href || "#");
                    return (
                      <Link
                        key={navItem.label}
                        href={navItem.href || "#"}
                        className={`px-4 py-2 text-sm font-medium rounded-md relative hover:no-underline transition-all duration-200 ${
                          active
                            ? "text-brand-700 dark:text-brand-300 bg-brand-50 dark:bg-brand-900/30"
                            : "text-gray-600 dark:text-gray-300 hover:text-brand-700 dark:hover:text-brand-300 hover:bg-brand-50 dark:hover:bg-brand-900/20"
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
            <div className="flex flex-1 md:flex-none justify-end items-center gap-2">
              {/* Theme toggle */}
              <ThemeToggle />

              {/* Search button */}
              <button
                aria-label="Search"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-gray-500 dark:text-gray-400 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
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
      <div
        ref={mobileNavRef}
        id="mobile-nav"
        className={`md:hidden bg-white border-b border-gray-100 shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${
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
                className={`w-full py-3 px-4 font-medium rounded-lg hover:no-underline transition-all duration-150 ${
                  active
                    ? "text-brand-700 dark:text-brand-300 bg-brand-50 dark:bg-brand-900/30"
                    : "text-gray-700 dark:text-gray-300 hover:text-brand-700 dark:hover:text-brand-300 hover:bg-brand-50 dark:hover:bg-brand-900/20"
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
            className="btn-primary w-full mt-3 rounded-lg font-medium text-center"
            onClick={() => setIsOpen(false)}
          >
            ติดต่อเรา
          </Link>
        </div>
      </div>

      {/* Search Box */}
      <div
        ref={searchRef}
        className={`bg-white border-b border-gray-100 shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${
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
              className="w-full px-4 py-3 text-lg rounded-lg bg-gray-50 border border-gray-200 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200 transition-colors"
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
    </div>
  );
}
