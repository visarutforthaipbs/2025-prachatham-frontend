"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle: Array<Record<string, unknown>>;
  }
}

interface AdSenseProps {
  /** Ad slot ID from your AdSense account */
  slot: string;
  /** Ad format — use "auto" for responsive, "fluid" for in-article */
  format?: "auto" | "horizontal" | "rectangle" | "fluid";
  /** Ad layout — use "in-article" for fluid in-article ads */
  layout?: string;
  /** Whether the ad is responsive */
  responsive?: boolean;
  /** Optional max height to keep ads small */
  maxHeight?: string;
}

export default function AdSense({
  slot,
  format = "auto",
  layout,
  responsive = true,
  maxHeight = "100px",
}: AdSenseProps) {
  const adRef = useRef<HTMLModElement>(null);
  const isAdPushed = useRef(false);

  useEffect(() => {
    // Reset on slot change so ads re-initialize across soft navigations
    isAdPushed.current = false;
  }, [slot]);

  useEffect(() => {
    const adElement = adRef.current;
    const container = adElement?.parentElement;
    if (!adElement || !container || isAdPushed.current) return;

    let raf = 0;
    let timeout: ReturnType<typeof setTimeout> | null = null;

    const pushAd = () => {
      if (isAdPushed.current) return;

      const containerWidth = container.getBoundingClientRect().width;
      const adWidth = adElement.getBoundingClientRect().width;
      const availableWidth = Math.max(containerWidth, adWidth);

      if (availableWidth < 250) return;

      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        isAdPushed.current = true;
      } catch {
        // AdSense may not be loaded yet or ad blocker is active
      }
    };

    const schedulePush = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(pushAd);
    };

    const observer = new ResizeObserver(schedulePush);
    observer.observe(container);
    observer.observe(adElement);
    schedulePush();
    timeout = setTimeout(schedulePush, 500);

    return () => {
      cancelAnimationFrame(raf);
      if (timeout) clearTimeout(timeout);
      observer.disconnect();
    };
  }, [slot]);

  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_ID;

  // Don't render anything if no publisher ID is configured
  if (!publisherId || !slot) return null;

  return (
    <aside
      aria-label="โฆษณา"
      className="ad-container my-4 mx-auto w-full text-center opacity-85 hover:opacity-100 transition-opacity duration-200 print:hidden overflow-hidden"
      style={{ maxHeight, minHeight: maxHeight }}
    >
      <span className="text-[10px] text-gray-400 mb-1 block tracking-wider uppercase">
        โฆษณา
      </span>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{
          display: "block",
          width: "100%",
          textAlign: layout === "in-article" ? "center" as const : undefined,
          maxHeight,
          overflow: "hidden",
        }}
        data-ad-client={publisherId}
        data-ad-slot={slot}
        data-ad-format={format}
        {...(layout ? { "data-ad-layout": layout } : {})}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </aside>
  );
}
