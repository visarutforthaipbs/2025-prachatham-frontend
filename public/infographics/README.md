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

### Auto-resize the iframe to content height

Done. The template posts its height to the parent via `postMessage`
(`{type: "infographic-height", height}`); `src/components/InfographicAutoHeight.tsx`,
mounted on every post page, resizes the matching iframe. It only accepts messages
from the same origin, from an iframe whose `src` path starts with `/infographics/`
and whose `contentWindow` sent the message, with a numeric height clamped to
200–6000 px. Still give the iframe a fixed px `height` in the snippet: it is the
fallback before JS runs (the sanitizer allows px heights only).

### Full reference build

`green-inequality/` is the reference for a data-driven, CI-compliant chart pair. Only the shipped files live
here (`per-rai.html`, `money-flow.html`, the two PNG fallbacks). Build inputs are NOT in `public/` (anything
here is downloadable): `scripts/infographics/green-inequality/` holds `data.json` (the only number source),
`*.src.html`, `_shared.css/js`, `build.py` (inlines CSS/JS/data, fails on hand-typed numbers),
`render_png.py` (PNG fallback) and `build_embed.py`, which writes the Thai newsroom guide
[`docs/infographics/green-inequality-EMBED.md`](../../docs/infographics/green-inequality-EMBED.md).
See "Infographics" in `AGENTS.md`.
