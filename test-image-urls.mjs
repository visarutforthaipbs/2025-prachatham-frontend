import assert from "node:assert/strict";
import test from "node:test";

import {
  normalizeWordPressMediaUrl,
  rewriteImageUrls,
} from "./src/lib/image-urls.ts";

test("normalizes legacy WordPress upload URLs", () => {
  assert.equal(
    normalizeWordPressMediaUrl(
      "https://prachatham.com/wp-content/uploads/2022/04/photo.jpg"
    ),
    "https://cms.prachatham.com/wp-content/uploads/2022/04/photo.jpg"
  );
  assert.equal(
    normalizeWordPressMediaUrl(
      "http://www.prachatham.com/wp-content/uploads/2022/04/photo.jpg"
    ),
    "https://cms.prachatham.com/wp-content/uploads/2022/04/photo.jpg"
  );
});

test("does not rewrite non-media or current CMS URLs", () => {
  const currentCmsUrl =
    "https://cms.prachatham.com/wp-content/uploads/2022/04/photo.webp";
  const articleUrl = "https://prachatham.com/posts/example";

  assert.equal(normalizeWordPressMediaUrl(currentCmsUrl), currentCmsUrl);
  assert.equal(normalizeWordPressMediaUrl(articleUrl), articleUrl);
});

test("rewrites src and every legacy srcset candidate on the same tag", () => {
  const html = `<img src="https://prachatham.com/wp-content/uploads/2022/04/photo.jpg" srcset="https://prachatham.com/wp-content/uploads/2022/04/photo-300.jpg 300w, https://www.prachatham.com/wp-content/uploads/2022/04/photo-800.jpg 800w, https://cms.prachatham.com/wp-content/uploads/2022/04/photo-1200.webp 1200w">`;
  const rewritten = rewriteImageUrls(html);

  assert.equal(
    rewritten,
    `<img src="https://cms.prachatham.com/wp-content/uploads/2022/04/photo.jpg" srcset="https://cms.prachatham.com/wp-content/uploads/2022/04/photo-300.jpg 300w, https://cms.prachatham.com/wp-content/uploads/2022/04/photo-800.jpg 800w, https://cms.prachatham.com/wp-content/uploads/2022/04/photo-1200.webp 1200w">`
  );
});

test("preserves unrelated attributes, external URLs, and data URLs", () => {
  const html = `<picture><source srcset='data:image/svg+xml,%3Csvg%3E 1x'><img class="photo" src="https://example.com/photo.jpg" alt="Example"></picture>`;

  assert.equal(rewriteImageUrls(html), html);
});
