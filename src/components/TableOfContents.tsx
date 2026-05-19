"use client";

import { useEffect, useState, useCallback } from "react";

export interface TocHeading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  headings: TocHeading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const visible = entries
      .filter((e) => e.isIntersecting)
      .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
    if (visible.length > 0) {
      setActiveId(visible[0].target.id);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      rootMargin: "-80px 0px -60% 0px",
      threshold: 0,
    });

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings, handleObserver]);

  if (headings.length === 0) return null;

  const minLevel = Math.min(...headings.map((h) => h.level));

  return (
    <>
      {/* Desktop sidebar */}
      <div
        className="hidden 2xl:block fixed top-[104px] w-[240px] max-h-[calc(100vh-140px)] overflow-y-auto border-l border-gray-200 dark:border-gray-800 pl-4"
        style={{ right: "max(1rem, calc((100vw - 72rem) / 2 - 280px))" }}
      >
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400 mb-3">
          สารบัญ
        </p>
        <nav aria-label="สารบัญ">
          <div className="flex flex-col">
            {headings.map((heading) => {
              const indent = (heading.level - minLevel) * 12;
              const isActive = activeId === heading.id;
              return (
                <a
                  key={heading.id}
                  href={`#${heading.id}`}
                  style={{ paddingLeft: `${indent + 12}px` }}
                  className={`py-1.5 text-[13px] leading-snug border-l block line-clamp-2 transition-all duration-150 hover:text-brand-700 dark:hover:text-brand-300 hover:no-underline ${
                    isActive
                      ? "text-brand-700 dark:text-brand-300 font-semibold border-brand-500"
                      : "text-gray-500 dark:text-gray-400 font-normal border-transparent bg-transparent"
                  }`}
                  aria-current={isActive ? "true" : undefined}
                >
                  {heading.text}
                </a>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Mobile floating TOC button */}
      <div className="block 2xl:hidden">
        <button
          className="fixed bottom-[80px] left-5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full px-4 py-2 shadow-lg z-[999] flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="mobile-toc-panel"
        >
          <span
            className="w-4 h-4 inline-block"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23059669' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cline x1='3' y1='6' x2='21' y2='6'/%3E%3Cline x1='3' y1='12' x2='15' y2='12'/%3E%3Cline x1='3' y1='18' x2='18' y2='18'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
            }}
          />
          สารบัญ
        </button>

        {/* Mobile TOC panel */}
        {isOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/30 z-[1000]"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />
            <div
              id="mobile-toc-panel"
              className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 rounded-t-xl shadow-2xl z-[1001] max-h-[60vh] overflow-y-auto p-5"
            >
              <div className="flex justify-between items-center mb-3">
                <p className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  สารบัญ
                </p>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 dark:text-gray-500 text-lg"
                  aria-label="ปิดสารบัญ"
                >
                  ✕
                </button>
              </div>
              <nav aria-label="สารบัญ">
                <div className="flex flex-col">
                  {headings.map((heading) => {
                    const indent = (heading.level - minLevel) * 12;
                    const isActive = activeId === heading.id;
                    return (
                      <a
                        key={heading.id}
                        href={`#${heading.id}`}
                        onClick={() => setIsOpen(false)}
                        style={{ paddingLeft: `${indent + 12}px` }}
                        className={`py-2 text-sm leading-snug border-l-2 block hover:text-brand-600 dark:hover:text-brand-400 hover:no-underline ${
                          isActive
                            ? "text-brand-700 dark:text-brand-400 font-semibold border-brand-500"
                            : "text-gray-600 dark:text-gray-400 font-normal border-gray-200 dark:border-gray-700"
                        }`}
                        aria-current={isActive ? "true" : undefined}
                      >
                        {heading.text}
                      </a>
                    );
                  })}
                </div>
              </nav>
            </div>
          </>
        )}
      </div>
    </>
  );
}
