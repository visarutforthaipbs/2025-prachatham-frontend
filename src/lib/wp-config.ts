/**
 * Centralized WordPress API configuration.
 * Uses WORDPRESS_API_URL env var with fallback to the default CMS domain.
 *
 * The env var should be the base domain (e.g. "https://cms.prachatham.com").
 * If it contains a trailing "/wp-json" path it will be stripped automatically.
 */
const raw = process.env.WORDPRESS_API_URL || "https://cms.prachatham.com";
const WP_BASE = raw.replace(/\/wp-json\/?$/, "");

/** REST Route–style endpoint (uses ?rest_route= query param) */
export function wpRestRoute(path: string): string {
  return `${WP_BASE}/?rest_route=/wp/v2/${path}`;
}

/** WP-JSON–style endpoint (native pretty permalink REST API) */
export function wpJsonUrl(path: string): string {
  return `${WP_BASE}/wp-json/${path}`;
}

export { WP_BASE };
