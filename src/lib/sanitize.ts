import DOMPurify from "isomorphic-dompurify";

/**
 * Sanitize HTML from WordPress to prevent XSS attacks.
 * Allows safe HTML tags used in WordPress content while stripping dangerous ones.
 */
export function sanitizeHtml(dirty: string): string {
  return DOMPurify.sanitize(dirty, {
    ADD_TAGS: ["iframe", "details", "summary"],
    ADD_ATTR: [
      "allow",
      "allowfullscreen",
      "frameborder",
      "scrolling",
      "target",
      "loading",
      "decoding",
      "fetchpriority",
    ],
    ALLOW_DATA_ATTR: true,
  });
}
