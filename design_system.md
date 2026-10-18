# Prachatham Design System

Trust, community empowerment, local voice — applied with Apple HIG discipline
(see `design-audit.md` for the audit that produced these rules).
Source of truth: `src/app/globals.css` (`@theme` + semantic tokens). Tailwind v4, no component library.

## 1. Colour — brand hexes are fixed

| Role | Light | Dark | Use |
|---|---|---|---|
| Brand teal (`brand-600`, `--brand`) | `#044B41` | — | Logo, active nav pill, filled secondary actions, impact band |
| Brand ink (`--brand-ink`) | `#044B41` | `#8AE0A0` | Teal **text/icons**. Never put `#044B41` text on a dark surface (1.4:1) |
| CTA orange (`accent-500`, `--cta`) | `#C46211` | same | **The one prominent action** per band (`.btn-primary`). White label must stay bold ≥ 20 px (white on orange is 4.1:1 → only passes as large text) |
| Label / secondary / tertiary | `#1d1d1f` / `#4b5563` / `#5f6672` | `#eef2f0` / `#c5cdc9` / `#9fb0aa` | Titles / body / metadata. Tertiary is still ≥ 4.5:1 |
| Background / raised surface | `#f7f8f3` / `#fff` | `#071513` / `#0B201D` | Page / cards |

Rules: one accent per view; colour never carries meaning alone (links are underlined in articles); don't use `text-gray-400` on light surfaces (2.6:1) — use `text-gray-500`; every light-only class needs a `dark:` partner (a safety net in `globals.css` catches the common ones).

## 2. Typography — DB Helvethaica X

The font draws ~20 % smaller than system fonts, so the Tailwind scale is shifted up in `@theme`:
`text-xs` 14 · `text-sm` 16 · `text-base` 18 · `text-lg` 20 · `text-xl` 22 px. Floor: 13 px. Article body 19 px (phone) / 21 px, leading 1.8.

- Weights available: 400 / 500 / 700 only — no `font-light`, no 800/900.
- No `uppercase` or `tracking-*` on Thai text. Headlines `leading-[1.2]`; never `leading-none` on Thai (tone marks clip).
- One `h1` per page; section headers are `h2` (`PageHeader` defaults to `h2`).

## 3. Layout & targets

- Containers: `max-w-7xl` pages, `max-w-3xl` article column, `max-w-4xl` narrow bands.
- Section rhythm: `SectionWrapper` = 48 px (phone) / 80 px (desktop).
- **Every control ≥ 44 × 44 pt on touch**: icon buttons `w-11 h-11`, chips/links `min-h-[44px]`, badges inside a 44 pt link wrapper.
- Breadcrumbs are `<nav aria-label="Breadcrumb">`, links `whitespace-nowrap`, current page `truncate` + `aria-current`.

## 4. Components

- **Buttons** (`@layer components`, so utilities can override layout): `.btn-primary` (orange, filled, one per band), `.btn-secondary` (white + teal border), `.btn-outline-green`. All 44 pt pills.
- **Cards**: `.card` — solid surface, hairline border, hover lifts 2 px on pointer devices only. `PostCard` is one whole-card link (`.card-link` + `.card-link-target`); nested links use `.card-link-above`.
- **Chips**: `CategoryChips` / `CategoryFilter` — 44 pt rounded-full, active = teal fill.
- **Navigation**: translucent bar (functional layer), active item bold + tinted; light logo variant in dark mode.

## 5. Motion & appearance

- Motion only where it explains a change: one 350 ms hero entrance, `cubic-bezier(0.16,1,0.3,1)`, respects `prefers-reduced-motion`. No looping animation, no scroll-reveal on content.
- Dark mode follows the system by default (pre-paint script in `layout.tsx`); the toggle stores an explicit choice in `localStorage` (`prachatham-theme`).

## 6. Checks before shipping UI

`npm run type-check && npm run lint && npm run build`, then the HIG capture (9 routes × 390/1280 × light/dark) must report 0 targets < 44 pt, 0 text < 4.5:1, 0 text < 13 px, one `h1` per page.
