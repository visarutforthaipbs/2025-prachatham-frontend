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
      "sup",
      "sub",
      "mark",
    ]),
    allowedAttributes: {
      ...sanitize.defaults.allowedAttributes,
      "*": ["id", "class", "data-*", "lang", "dir"],
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
        "style",
      ],
      figure: ["style"],
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
      video: [
        "src",
        "width",
        "height",
        "controls",
        "poster",
        "preload",
        "autoplay",
        "muted",
        "loop",
        "playsinline",
        "webkit-playsinline",
      ],
      audio: ["src", "controls", "preload"],
      td: ["colspan", "rowspan"],
      th: ["colspan", "rowspan", "scope"],
      ol: ["start", "type", "reversed"],
      blockquote: ["cite"],
    },
    // Gutenberg stores editor image resizing as inline styles. Allow only
    // layout-safe properties on media elements so resizing survives
    // sanitization without reopening the door to arbitrary CSS.
    allowedStyles: {
      img: {
        width: [/^\d+(?:\.\d+)?(?:px|em|rem|%)$/],
        height: [/^(?:auto|\d+(?:\.\d+)?(?:px|em|rem|%))$/],
        "max-width": [/^\d+(?:\.\d+)?(?:px|em|rem|%)$/],
        "aspect-ratio": [/^\d+(?:\.\d+)?(?:\s*\/\s*\d+(?:\.\d+)?)?$/],
        "object-fit": [/^(?:cover|contain|fill|none|scale-down)$/],
      },
      figure: {
        width: [/^\d+(?:\.\d+)?(?:px|em|rem|%)$/],
        "max-width": [/^\d+(?:\.\d+)?(?:px|em|rem|%)$/],
      },
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
