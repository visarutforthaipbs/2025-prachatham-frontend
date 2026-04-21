"use client";

import { useEffect } from "react";

export function useEscapeKey(handler: () => void, enabled: boolean = true) {
  useEffect(() => {
    if (!enabled) return;

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        handler();
      }
    }

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [handler, enabled]);
}
