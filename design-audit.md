# Prachatham — Apple HIG design audit & revamp (Oct 2026)

Branch: `hig-revamp` · Method: `apple-hig-design` skill (audit checklist, specs, verification recipes).
Brief: **Platform** responsive web (phone-first; LINE/Facebook traffic). **Primary task** read and browse community news. **Feeling** calm, trustworthy, local-voice editorial.
Constraint from the owner: **keep the same colours** — teal `#044B41` and orange `#C46211` are unchanged hex-for-hex.

## How it was measured

Local production build (`next build && next start`), 9 routes (home, article, category, posts, about, search, donate, contact, 404) × 390 px and 1280 px × light and dark = **36 captures**, scrolled top-to-bottom first so lazy content renders. Each capture measures every visible control's hit size, every text node's font size, and the contrast of every text node against its real background (oklch converted via canvas — Tailwind v4 emits oklch).

| Metric (all 36 captures) | Before | After |
|---|---:|---:|
| Controls under 44×44 (phone) / 28×28 (pointer) | 1 078 | **0** |
| Text nodes below 4.5:1 (3:1 large) | 902 | **0** |
| Text nodes below 13 px | 926 | **0** |
| Pages with more than one `h1` | home (3) | **none** |
| Infinite animations on home | 2 | **0** |

## Checklist score (0 / 1 / 2 per row, `templates/audit-checklist.md`)

| Section | Before | After | Notes |
|---|---:|---:|---|
| A. Purpose & hierarchy | 4/8 | 7/8 | One filled CTA per band; duplicate "เรียนรู้เพิ่มเติม" → specific labels. |
| B. Typography | 3/10 | 9/10 | Type scale tuned for DB Helvethaica X; no faux-light weight; no tracking on Thai. |
| C. Color & appearance | 4/12 | 11/12 | Semantic roles; dark mode follows system; brand hexes kept. Toggle kept (owner feature). |
| D. Layout & targets | 3/10 | 9/10 | All targets ≥ 44 pt on touch; breadcrumbs no longer wrap. |
| E. Navigation & structure | 6/8 | 8/8 | Active page bold + tinted; search labelled in Thai with `aria-expanded`. |
| F. Feedback, modality, errors | 8/14 | 11/14 | Empty states now offer the next step; TTS controls no longer colour-coded. |
| G. Accessibility & inclusion | 5/10 | 9/10 | Decorative icons hidden from AT; breadcrumbs are `<nav>` with `aria-current`. |
| H. Craft & brand | 4/8 | 7/8 | Brand lives in logo, active state, the one CTA. |
| **Total** | **37/80 (46 %) → revamp** | **71/80 (89 %)** | |

## Top findings (ordered by reader impact) → fix

1. **Dark mode was broken on most pages** *(Color · Dark Mode)* — About body text 1.6:1, brand headings 1.4:1 (`dark:text-brand-400` referenced an undefined token), white board cards, light-green panels with light text. → Defined `brand-400`; added a dark-mode safety net in `globals.css` (`@layer utilities`, loses to any explicit `dark:` class) mapping light-only text/bg classes to semantic roles.
2. **Tap targets far below 44 pt** *(Layout · Buttons)* — menu 36, theme/search 32, chips 38, share 32, footer links 20, breadcrumb 25, "อ่านต่อ" 20. → 44 pt everywhere; PostCard is one whole-card link (`.card-link`), badges keep their own 44 pt hit area.
3. **Text too small for the font** *(Typography)* — DB Helvethaica X draws ~20 % small; meta was 12 px (visual ≈ 10 px), badges 12 px, labels 10 px. → `@theme` scale: xs 14, sm 16, base 18, lg 20, xl 22; article body 19 → 21 px, leading 1.8.
4. **Low-contrast metadata** *(Color · Accessibility)* — `text-gray-400` dates/authors 2.6:1. → gray-500 (light) / gray-400 (dark), ≥ 4.5:1.
5. **CTA orange with white 14–16 px label = 4.1:1** *(Color)* — colour kept; label is now bold 20 px (WCAG large text, 3:1 bar) and buttons are 44 pt pills.
6. **Motion on frequent interactions** *(Motion)* — 25 s Ken-Burns loop, bouncing scroll cue, scroll-reveal hiding every news grid until scrolled. → removed; one 350 ms hero entrance that honours reduced motion.
7. **Three `h1`s on home; section header drew Thai with 0.18 em tracking + uppercase** *(Typography · Accessibility)* → `PageHeader` renders `h2` by default, no tracking on Thai.
8. **Dark mode ignored the system setting** *(Dark Mode)* → default `system`, inline pre-paint script (no white flash); the reader's toggle choice still wins.

## Bugs fixed on the same branch (from the earlier site audit)

- Post pages shipped `http://localhost:3000/...` as the share URL and JSON-LD `@id`; Contact shipped `/undefined/contact` canonical/og:url and a `prachatham.org` fallback. Root cause: `NEXT_PUBLIC_SITE_URL` is unset on Vercel. → `src/lib/site-url.ts` (one fallback: `https://www.prachatham.com`) used by every call site.
- YouTube link `@pnnontv` 404 → `youtube.com/user/pnnontv` (footer + contact + JSON-LD).
- Security: `next` 15.5.15 → 15.5.28, `sanitize-html` → 2.18.1 (critical XSS — this library cleans every CMS post), `sharp` → 0.35.5, plus transitive fixes. Remaining: `postcss` bundled inside Next 15 (fix requires Next 16 — not done, breaking upgrade; only exploitable when processing untrusted CSS at build time).

## Deliberate non-changes (owner's call)

- **Theme toggle kept.** HIG prefers no in-app appearance toggle; it now defaults to the system setting instead of forcing light.
- **Brand colours unchanged.** Orange stays the single prominent action colour; teal is the brand/active colour.
- **Button labels changed** (destinations unchanged): hero "เรียนรู้เพิ่มเติม" → "รู้จักประชาธรรม"; mission "เรียนรู้เพิ่มเติม" → "อ่านเรื่องราวของเรา" (now secondary, so the page has one prominent action per band).
- Content, routes, CMS data, ads — untouched.

## Verification run

`npm run type-check` ✓ · `npm run lint` ✓ · `npm run build` ✓ · `test-image-urls.mjs` 4/4 ✓ (Node ≥ 22.6 — the script uses `--experimental-strip-types`) · 36-capture measurement above · visual review of light/dark × phone/desktop screenshots.
