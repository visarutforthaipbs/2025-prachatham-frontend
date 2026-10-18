"use client";

import { useState, useEffect } from "react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-5 right-5 md:bottom-8 md:right-8 z-[1000]">
      <button
        aria-label="กลับขึ้นด้านบน"
        onClick={scrollToTop}
        className="w-12 h-12 inline-flex items-center justify-center rounded-full text-brand-700 dark:text-brand-200 border border-black/10 dark:border-white/15 bg-white/80 dark:bg-forest-900/80 backdrop-blur-xl backdrop-saturate-150 shadow-[0_4px_14px_rgba(0,0,0,0.12)] hover:bg-white dark:hover:bg-forest-900 transition-colors duration-200"
      >
        <svg className="w-5 h-5" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </div>
  );
}
