import assert from "node:assert/strict";
import test from "node:test";

import { isHeroPhoto, pickHeroSlides } from "./src/lib/hero-slides.ts";

const media = (w, h, url = "https://cms.prachatham.com/wp-content/uploads/a.jpg", mime = "image/jpeg") => ({
  source_url: url,
  alt_text: "",
  mime_type: mime,
  media_details: { width: w, height: h },
});
const post = (slug, m) => ({
  slug,
  title: { rendered: `t-${slug}` },
  _embedded: m ? { "wp:featuredmedia": [m] } : undefined,
});

test("accepts landscape JPEG field photos", () => {
  assert.equal(isHeroPhoto(media(1474, 1110)), true); // 4:3
  assert.equal(isHeroPhoto(media(2048, 1365)), true); // 3:2
});

test("rejects posters, portrait cards, screenshots and small images", () => {
  assert.equal(isHeroPhoto(media(1080, 1350)), false); // 4:5 social card
  assert.equal(isHeroPhoto(media(1650, 864)), false); // ~1.91 cover graphic
  assert.equal(isHeroPhoto(media(2560, 1357, "https://x/s.png", "image/png")), false);
  assert.equal(isHeroPhoto(media(800, 600)), false); // too small
  assert.equal(isHeroPhoto(undefined), false);
});

test("picks in order, dedupes, caps at max, builds post links", () => {
  const posts = [
    post("a", media(1474, 1110, "https://x/1.jpg")),
    post("b", media(1080, 1350, "https://x/2.jpg")),
    post("c"),
    post("d", media(1474, 1110, "https://x/1.jpg")),
    post("e", media(2048, 1536, "https://x/3.jpg")),
    post("f", media(2048, 1365, "https://x/4.jpg")),
  ];
  const slides = pickHeroSlides(posts, 2);
  assert.deepEqual(slides.map((s) => s.href), ["/posts/a", "/posts/e"]);
  assert.equal(slides[0].src, "https://x/1.jpg");
  assert.equal(slides[0].title, "t-a");
});
