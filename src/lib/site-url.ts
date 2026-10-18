/**
 * Canonical public origin of the site, without a trailing slash.
 *
 * NEXT_PUBLIC_SITE_URL is not set on the production Vercel project, so every
 * call site used to fall back on its own — to "http://localhost:3000" (post
 * share URL + JSON-LD @id), "https://prachatham.org" (wrong domain) or nothing
 * at all ("/undefined/contact" canonical). One source of truth fixes all of them.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.prachatham.com"
).replace(/\/+$/, "");
