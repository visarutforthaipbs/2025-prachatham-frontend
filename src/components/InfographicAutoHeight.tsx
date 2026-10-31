"use client";

import { useEffect } from "react";
import { applyHeightMessage } from "@/lib/infographic-height";

/**
 * Renders nothing. Lets self-hosted infographics (public/infographics/*) tell the
 * article how tall they are, so the iframe grows/shrinks with the content and never
 * shows an inner scrollbar. If this component is removed, iframes simply keep the
 * fixed height written in their snippet (see public/infographics/green-inequality/EMBED.md).
 * Validation rules live in src/lib/infographic-height.ts.
 */
export default function InfographicAutoHeight() {
  useEffect(() => {
    const origin = window.location.origin;
    const onMessage = (event: MessageEvent) => {
      const frames = document.querySelectorAll<HTMLIFrameElement>(
        ".wordpress-content iframe",
      );
      applyHeightMessage(event, frames, origin);
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return null;
}
