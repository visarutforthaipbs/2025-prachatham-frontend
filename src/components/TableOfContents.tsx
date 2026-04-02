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
    const visibleEntries = entries.filter((e) => e.isIntersecting);
    if (visibleEntries.length > 0) {
      setActiveId(visibleEntries[0].target.id);
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

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveId(id);
      setIsOpen(false);
    }
  };

  if (headings.length === 0) return null;

  const minLevel = Math.min(...headings.map((h) => h.level));

  return (
    <>
      {/* Desktop sidebar */}
      <div
        className="hidden xl:block fixed top-[100px] w-[240px] max-h-[calc(100vh-140px)] overflow-y-auto"
        style={{ left: "max(1rem, calc((100vw - 56rem) / 2 - 280px))" }}
      >
        <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
          สารบัญ
        </p>
        <div className="flex flex-col">
          {headings.map((heading) => {
            const indent = (heading.level - minLevel) * 12;
            const isActive = activeId === heading.id;
            return (
              <a
                key={heading.id}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(heading.id);
                }}
                href={`#${heading.id}`}
                style={{ paddingLeft: `${indent + 12}px` }}
                className={`py-1.5 text-[13px] leading-snug border-l-2 block line-clamp-2 transition-all duration-150 hover:text-brand-600 hover:no-underline hover:bg-gray-50 ${
                  isActive
                    ? "text-brand-700 font-semibold border-brand-500 bg-brand-50"
                    : "text-gray-500 font-normal border-gray-200 bg-transparent"
                }`}
              >
                {heading.text}
              </a>
            );
          })}
        </div>
      </div>

      {/* Mobile floating TOC button */}
      <div className="block xl:hidden">
        <button
          className="fixed bottom-[80px] left-5 bg-white border border-gray-200 rounded-full px-4 py-2 shadow-lg z-[999] flex items-center gap-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          onClick={() => setIsOpen(!isOpen)}
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
            />
            <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-xl shadow-2xl z-[1001] max-h-[60vh] overflow-y-auto p-5">
              <div className="flex justify-between items-center mb-3">
                <p className="text-sm font-bold uppercase tracking-wider text-gray-500">
                  สารบัญ
                </p>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-full hover:bg-gray-100 text-gray-400 text-lg"
                >
                  ✕
                </button>
              </div>
              <div className="flex flex-col">
                {headings.map((heading) => {
                  const indent = (heading.level - minLevel) * 12;
                  const isActive = activeId === heading.id;
                  return (
                    <a
                      key={heading.id}
                      onClick={(e) => {
                        e.preventDefault();
                        handleClick(heading.id);
                      }}
                      href={`#${heading.id}`}
                      style={{ paddingLeft: `${indent + 12}px` }}
                      className={`py-2 text-sm leading-snug border-l-2 block hover:text-brand-600 hover:no-underline ${
                        isActive
                          ? "text-brand-700 font-semibold border-brand-500"
                          : "text-gray-600 font-normal border-gray-200"
                      }`}
                    >
                      {heading.text}
                    </a>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
