/**
 * Pick background photos for the home hero slideshow from the newsroom's
 * "ข่าวเด่น" (featured news) posts.
 *
 * The hero puts white headline text over a dark scrim, so only real
 * landscape photographs work. Featured images in this CMS are a mix of field
 * photos, portrait social cards and text-heavy posters; we keep the photos
 * with cheap metadata rules instead of hand-curating:
 *   - JPEG only (PNG uploads here are screenshots and designed graphics)
 *   - landscape, aspect 1.25–1.8 (portrait 4:5 cards and ~1.91 cover/OG
 *     graphics are almost always text-on-image designs)
 *   - at least 1200 px wide, so it stays sharp full-bleed on desktop
 *
 * Pure function (no imports) so it can be unit-tested with node --test.
 */

export interface HeroSlide {
  src: string;
  alt: string;
  /** Raw (HTML-encoded) post title; decode before rendering. */
  title: string;
  href: string;
}

interface FeaturedMedia {
  source_url?: string;
  alt_text?: string;
  mime_type?: string;
  media_details?: { width?: number; height?: number };
}

interface PostLike {
  slug: string;
  title: { rendered: string };
  _embedded?: { "wp:featuredmedia"?: FeaturedMedia[] };
}

export const HERO_MIN_WIDTH = 1200;
export const HERO_MIN_RATIO = 1.25;
export const HERO_MAX_RATIO = 1.8;

export function isHeroPhoto(media: FeaturedMedia | undefined): boolean {
  if (!media?.source_url) return false;
  const mime = (media.mime_type || "").toLowerCase();
  const isJpeg =
    mime === "image/jpeg" || /\.jpe?g$/i.test(media.source_url.split("?")[0]);
  if (!isJpeg) return false;
  const w = media.media_details?.width ?? 0;
  const h = media.media_details?.height ?? 0;
  if (w < HERO_MIN_WIDTH || h <= 0) return false;
  const ratio = w / h;
  return ratio >= HERO_MIN_RATIO && ratio <= HERO_MAX_RATIO;
}

export function pickHeroSlides(posts: PostLike[], max = 5): HeroSlide[] {
  const slides: HeroSlide[] = [];
  const seen = new Set<string>();
  for (const post of posts) {
    const media = post._embedded?.["wp:featuredmedia"]?.[0];
    if (!isHeroPhoto(media) || !media?.source_url) continue;
    if (seen.has(media.source_url)) continue;
    seen.add(media.source_url);
    slides.push({
      src: media.source_url,
      alt: media.alt_text || "",
      title: post.title.rendered,
      href: `/posts/${post.slug}`,
    });
    if (slides.length >= max) break;
  }
  return slides;
}
