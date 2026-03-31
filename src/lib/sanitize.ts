import sanitize from "sanitize-html";

/**
 * Sanitize HTML from WordPress to prevent XSS attacks.
 * Uses sanitize-html which is lightweight and works in serverless environments
 * (unlike isomorphic-dompurify which requires jsdom).
 */
export function sanitizeHtml(dirty: string): string {
  return sanitize(dirty, {
    allowedTags: sanitize.defaults.allowedTags.concat([
      "img",
      "figure",
      "figcaption",
      "iframe",
      "details",
      "summary",
      "video",
      "audio",
      "source",
      "picture",
      "pre",
      "hr",
      "style",
      "sup",
      "sub",
      "mark",
    ]),
    allowedAttributes: {
      ...sanitize.defaults.allowedAttributes,
      "*": ["id", "class", "style", "data-*", "lang", "dir"],
      img: [
        "src",
        "srcset",
        "sizes",
        "alt",
        "width",
        "height",
        "loading",
        "decoding",
        "fetchpriority",
      ],
      a: ["href", "name", "target", "rel", "id", "data-type", "data-id"],
      iframe: [
        "src",
        "width",
        "height",
        "frameborder",
        "allow",
        "allowfullscreen",
        "scrolling",
        "title",
      ],
      source: ["src", "srcset", "type", "media", "sizes"],
      video: ["src", "width", "height", "controls", "poster", "preload"],
      audio: ["src", "controls", "preload"],
      td: ["colspan", "rowspan"],
      th: ["colspan", "rowspan", "scope"],
      ol: ["start", "type", "reversed"],
      blockquote: ["cite"],
    },
    allowedIframeHostnames: [
      "www.youtube.com",
      "youtube.com",
      "player.vimeo.com",
      "www.facebook.com",
      "www.instagram.com",
      "open.spotify.com",
      "www.google.com",
    ],
    allowedSchemes: ["http", "https", "mailto", "tel"],
  });
}
