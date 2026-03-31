"use client";

import { useEffect, useRef } from "react";
import { Box, Text } from "@chakra-ui/react";

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
    if (!isAdPushed.current && adRef.current) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        isAdPushed.current = true;
      } catch {
        // AdSense may not be loaded yet or ad blocker is active
      }
    }
  }, []);

  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_ID;

  // Don't render anything if no publisher ID is configured
  if (!publisherId) return null;

  return (
    <Box
      as="aside"
      aria-label="โฆษณา"
      maxH={maxHeight}
      overflow="hidden"
      my={4}
      mx="auto"
      textAlign="center"
      opacity={0.85}
      _hover={{ opacity: 1 }}
      transition="opacity 0.2s"
      className="ad-container"
      sx={{
        "@media print": { display: "none" },
      }}
    >
      <Text
        fontSize="2xs"
        color="gray.400"
        mb={1}
        letterSpacing="0.05em"
        textTransform="uppercase"
      >
        โฆษณา
      </Text>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{
          display: "block",
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
    </Box>
  );
}
