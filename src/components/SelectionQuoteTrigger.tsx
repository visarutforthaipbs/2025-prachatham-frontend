"use client";

import { useEffect, useState } from "react";
import { FaPaintBrush } from "react-icons/fa";

interface SelectionQuoteTriggerProps {
  onTrigger: (selectedText: string) => void;
  containerSelector: string;
}

export default function SelectionQuoteTrigger({
  onTrigger,
  containerSelector,
}: SelectionQuoteTriggerProps) {
  const [selectionText, setSelectionText] = useState("");
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return;

    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed) {
        setSelectionText("");
        setCoords(null);
        return;
      }

      const text = selection.toString().trim();
      // Ensure the quote is a reasonable length
      if (text.length < 10 || text.length > 350) {
        setSelectionText("");
        setCoords(null);
        return;
      }

      // Verify the selection is inside the target container
      const container = document.querySelector(containerSelector);
      if (!container) return;

      const anchorNode = selection.anchorNode;
      if (!anchorNode || !container.contains(anchorNode)) {
        setSelectionText("");
        setCoords(null);
        return;
      }

      try {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        
        // Position tooltip centered above the selection bounds
        // Fallback to top-10 if coordinates go above viewport top boundary
        const calculatedTop = rect.top - 46;
        setCoords({
          top: calculatedTop > 10 ? calculatedTop : rect.bottom + 12,
          left: rect.left + rect.width / 2,
        });
        setSelectionText(text);
      } catch {
        setCoords(null);
      }
    };

    document.addEventListener("selectionchange", handleSelectionChange);
    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
    };
  }, [containerSelector]);

  if (!coords || !selectionText) return null;

  return (
    <button
      type="button"
      onClick={() => {
        onTrigger(selectionText);
        // Clear selection after trigger
        window.getSelection()?.removeAllRanges();
        setSelectionText("");
        setCoords(null);
      }}
      style={{
        top: `${coords.top}px`,
        left: `${coords.left}px`,
      }}
      className="quote-tooltip-btn fixed z-[1800] -translate-x-1/2 flex items-center gap-1.5 bg-brand-700 dark:bg-brand-600 text-white rounded-full px-4 py-2 shadow-xl border border-white/20 text-xs font-semibold hover:bg-brand-600 dark:hover:bg-brand-500 hover:scale-105 active:scale-95 transition-all duration-200 pointer-events-auto cursor-pointer"
      aria-label="สร้างการ์ดโควทจากข้อความที่เลือก"
    >
      <FaPaintBrush className="w-3.5 h-3.5 text-accent-300 animate-pulse" />
      <span>แชร์ข้อความนี้</span>
    </button>
  );
}
