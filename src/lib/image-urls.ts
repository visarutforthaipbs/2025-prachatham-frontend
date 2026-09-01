const CMS_MEDIA_ORIGIN = "https://cms.prachatham.com";
const MEDIA_UPLOAD_PATH = "/wp-content/uploads/";
const LEGACY_MEDIA_ORIGIN_PATTERN =
  /(?:https?:)?\/\/(?:www\.)?prachatham\.com(?=\/wp-content\/uploads\/)/gi;

/**
 * Normalize one legacy WordPress upload URL to the current CMS hostname.
 * URLs outside the uploads directory are intentionally left unchanged.
 */
export function normalizeWordPressMediaUrl(url: string): string {
  if (!url) return url;

  try {
    const parsed = new URL(url, CMS_MEDIA_ORIGIN);
    const isLegacyHost =
      parsed.hostname === "prachatham.com" ||
      parsed.hostname === "www.prachatham.com";

    if (!isLegacyHost || !parsed.pathname.startsWith(MEDIA_UPLOAD_PATH)) {
      return url;
    }

    parsed.protocol = "https:";
    parsed.hostname = "cms.prachatham.com";
    parsed.port = "";
    return parsed.toString();
  } catch {
    return url;
  }
}

function normalizeMediaAttribute(value: string): string {
  return value.replace(LEGACY_MEDIA_ORIGIN_PATTERN, CMS_MEDIA_ORIGIN);
}

/**
 * Rewrite legacy URLs in every src and srcset attribute on img/source tags.
 * Rewriting the attribute value directly preserves responsive-image
 * descriptors and data URLs while updating all candidates in a srcset.
 */
export function rewriteImageUrls(html: string): string {
  if (!html) return html;

  return html.replace(/<(?:img|source)\b[^>]*>/gi, (tag) =>
    tag.replace(
      /\b(?:src|srcset)\s*=\s*(["'])([\s\S]*?)\1/gi,
      (attribute, quote: string, value: string) =>
        attribute.replace(
          `${quote}${value}${quote}`,
          `${quote}${normalizeMediaAttribute(value)}${quote}`
        )
    )
  );
}
