/**
 * Auto-height for self-hosted infographic iframes (public/infographics/*).
 *
 * The charts post { type: "infographic-height", height: <number> } to their parent.
 * This module decides whether to honour such a message. It is deliberately strict:
 *   (a) the message must come from our own origin,
 *   (b) it may only resize an <iframe> whose src path starts with /infographics/
 *       AND whose contentWindow is the message source,
 *   (c) height must be a finite number, clamped to 200-6000 px,
 *   (d) anything missing or malformed is a silent no-op.
 *
 * Kept free of React so `npm test` (node --test) can exercise it.
 */

export const INFOGRAPHIC_MESSAGE_TYPE = "infographic-height";
export const MIN_HEIGHT = 200;
export const MAX_HEIGHT = 6000;
const PATH_PREFIX = "/infographics/";

/** Returns the clamped integer height, or null if the value is not a usable number. */
export function clampHeight(value: unknown): number | null {
  if (typeof value !== "number" || !Number.isFinite(value)) return null;
  return Math.round(Math.min(MAX_HEIGHT, Math.max(MIN_HEIGHT, value)));
}

/** True only for same-origin iframe sources under /infographics/. */
export function isInfographicSrc(src: string | null | undefined, origin: string): boolean {
  if (!src || !origin) return false;
  try {
    const u = new URL(src, origin);
    return u.origin === origin && u.pathname.startsWith(PATH_PREFIX);
  } catch {
    return false;
  }
}

export interface HeightMessageEvent {
  origin: string;
  source: unknown;
  data: unknown;
}

export interface IframeLike {
  getAttribute(name: string): string | null;
  contentWindow: unknown;
  style: { height: string };
}

/**
 * Applies a height message to the matching iframe.
 * Returns the iframe that was resized, or null when the message was ignored.
 */
export function applyHeightMessage<T extends IframeLike>(
  event: HeightMessageEvent,
  iframes: Iterable<T>,
  origin: string,
): T | null {
  if (!origin || event.origin !== origin) return null; // (a)
  const data = event.data as { type?: unknown; height?: unknown } | null;
  if (!data || typeof data !== "object" || data.type !== INFOGRAPHIC_MESSAGE_TYPE) return null;
  const height = clampHeight(data.height); // (c)
  if (height === null || !event.source) return null; // (d)
  for (const frame of iframes) {
    if (frame.contentWindow !== event.source) continue; // (b) source must be this frame
    if (!isInfographicSrc(frame.getAttribute("src"), origin)) continue; // (b) path rule
    frame.style.height = `${height}px`;
    return frame;
  }
  return null;
}
