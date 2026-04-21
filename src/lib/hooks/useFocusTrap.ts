"use client";

import { useEffect, RefObject } from "react";

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(", ");

export function useFocusTrap(
  ref: RefObject<HTMLElement | null>,
  enabled: boolean,
  options?: { onEscape?: () => void }
) {
  useEffect(() => {
    if (!enabled || !ref.current) return;

    const container = ref.current;
    const focusable = Array.from(
      container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    // Focus first element when trap activates
    first?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && options?.onEscape) {
        options.onEscape();
        return;
      }

      if (e.key !== "Tab") return;

      if (focusable.length === 0) {
        e.preventDefault();
        return;
      }

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    }

    container.addEventListener("keydown", handleKeyDown);
    return () => container.removeEventListener("keydown", handleKeyDown);
  }, [enabled, ref, options]);
}
