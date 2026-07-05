# Interactive infographics

Self-hosted interactive HTML infographics that get embedded into WordPress posts
via an `<iframe>`. Because the file runs inside an iframe, its inline `<script>`
and `<style>` are isolated from the main site (and survive the post-content
sanitizer, which strips `<script>` from the post body itself).

## How to add one

1. **Drop your bundled HTML file here**, e.g. `public/infographics/labor-2025.html`.
   It is served at `https://<your-domain>/infographics/labor-2025.html`
   (and `/infographics/labor-2025.html` for a relative embed).

2. **In the WordPress editor**, add a **Custom HTML** block to the post and paste:

   ```html
   <iframe
     src="/infographics/labor-2025.html"
     title="ชื่ออินโฟกราฟิก"
     loading="lazy"
     style="width:100%;aspect-ratio:16/9;border:0;border-radius:8px"
   ></iframe>
   ```

   - `src` uses a **relative** path so it works on every environment
     (local, preview, production). Relative iframe URLs are allowed by the
     sanitizer (`src/lib/sanitize.ts`).
   - Set `aspect-ratio` to match your design, or use a fixed `height` instead.

3. Publish. The infographic renders inside the article at
   `src/app/posts/[slug]/page.tsx`.

## Notes

- Only same-origin (`/infographics/...`) and the whitelisted video/embed hosts
  are allowed. Arbitrary external iframes are stripped by the sanitizer.
- Keep everything (CSS, JS, data) inside the single HTML file so it stays
  self-contained. External CDN scripts loaded from inside the file are fine.
- `_template.html` is a working starting point — copy it and build from there.

### Optional: auto-resize the iframe to content height

If your infographic changes height, the template posts its height to the parent
via `postMessage`. To make the iframe grow automatically, that requires a small
client-side listener in the app. Ask to have it wired up if you need it —
otherwise a fixed `aspect-ratio`/`height` on the iframe is simplest.
