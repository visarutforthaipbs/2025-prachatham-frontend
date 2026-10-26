# AGENTS.md — how prachatham.com is built (read this first)

The single source of truth for any agent or person maintaining this site.
If something here is wrong, **fix this file in the same commit** as the change.
Last full review: 2026-10-18.

## 1. Architecture in one picture

```
editors ──► cms.prachatham.com (WordPress, headless)  ──REST──►  www.prachatham.com (Next.js on Vercel) ──► readers / Google
            DigitalOcean Droplet 209.97.165.218                   this repo, auto-deploys on push to main
            every public URL 301 → www (mu-plugin)
```

- **Frontend** (this repo): Next.js 15.5 App Router, React 19, TypeScript, Tailwind CSS v4, framer-motion, sanitize-html, sharp. **No Chakra UI** (README/old docs that mention it are stale).
- **Content**: WordPress REST API at `https://cms.prachatham.com/?rest_route=/wp/v2/...` (query-string form, not `/wp-json`). Client: `src/lib/wordpress.ts`. Env: `NEXT_PUBLIC_WORDPRESS_API_URL`. Pages revalidate every 60 s (ISR); sitemap/feed hourly.
- **CMS is not public.** `cms/mu-plugins/headless-redirect.php` (copy of what's on the server) redirects every public page to www; admin, login, REST, GraphQL, uploads stay open. Ops notes: `cms/README.md`.

## 2. Where things are

| Need | File |
|---|---|
| Fetch posts/categories/projects | `src/lib/wordpress.ts` (`getPosts`, `getAllPostSlugs`, `getProjects`, …) |
| Home hero slideshow (photo picking rules / component) | `src/lib/hero-slides.ts` (tested by `test-hero-slides.mjs`) · `src/components/HeroSlideshow.tsx` |
| Clean CMS HTML (XSS) | `src/lib/sanitize.ts` — every post body goes through it |
| Old media URLs → current host | `src/lib/image-urls.ts` (tested by `test-image-urls.mjs`) |
| Canonical origin | `src/lib/site-url.ts` → `SITE_URL` (fallback `https://www.prachatham.com`). Never use `process.env.NEXT_PUBLIC_SITE_URL` directly — it is unset on Vercel |
| Light/dark theme | `src/lib/theme.tsx` + pre-paint script in `src/app/layout.tsx` (defaults to system) |
| Design tokens, type scale, dark-mode safety net | `src/app/globals.css` |
| Design rules | `design_system.md` (rules) · `design-audit.md` (why) |
| HIG regression check | `scripts/hig_check.py` (needs a running prod server) |
| Redirects (legacy WP permalinks, /tag, /about-us…) | `next.config.ts` → `redirects()` |
| Sitemap (all posts) / robots / RSS | `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/feed.xml/route.ts` |
| Security headers / CSP | `vercel.json` (add new third-party hosts to CSP or they break silently) |
| Editor guide (Thai, for the newsroom) | `editor-instruction.md` |
| Weekly health check | `scripts/health_check.py` |

Routes: `/` · `/posts` · `/posts/[slug]` · `/category/[slug]` · `/projects/[slug]` · `/causes` · `/publications` · `/search` · `/about` · `/contact` · `/donate` · `/feed.xml` · `/sitemap.xml` · `/api/{posts,categories,projects,views}`.

## 3. Build, test, ship

```bash
nvm use 24            # or any Node ≥ 22.6 — the test runner needs --experimental-strip-types; system Node 21 fails `npm test`
npm ci
npm run type-check && npm run lint && npm run build && npm test
```

- **Deploy = push to `main`** on `github.com/visarutforthaipbs/2025-prachatham-frontend`. Vercel builds in ~40 s.
- **Commit author must be `visarut298@gmail.com`** or Vercel blocks the build: `git -c user.name="Visarut Sankham" -c user.email=visarut298@gmail.com commit …`
- Check the deploy: `gh api repos/visarutforthaipbs/2025-prachatham-frontend/commits/<sha>/status --jq .state` → `success`, then curl a string unique to the change on www.
- Rollback: `git revert <sha> && git push` (or promote the previous deployment in Vercel).
- Visual/UX changes: branch → PR → Vercel preview (behind Vercel login; attach screenshots). Small fixes may go straight to main after the gates pass.

## 4. Known traps

1. Another `next dev` in this folder rewrites `.next`; `next start` then serves stale CSS. Check `.next/BUILD_ID` exists before measuring, or build in a separate `git worktree`.
2. Tailwind v4 outputs `oklch()` colours — contrast scripts must convert via canvas.
3. Thai + DB Helvethaica X: no `uppercase`/`tracking-*`, no `leading-none`, weights 400/500/700 only, sizes from the shifted scale in `globals.css`.
4. White on the CTA orange `#C46211` is 4.1:1 → the label must stay bold ≥ 20 px. Don't change brand hexes (`#044B41`, `#C46211`) — owner decision.
5. While the CMS is down, www article/list pages fail too (they fetch on revalidate).
6. Don't block `cms.prachatham.com` in robots.txt: Google must crawl the 301s to move rankings to www.

## 5. CMS server (DigitalOcean)

SSH: `ssh prachatham-cms` (alias in `~/.ssh/config`, key `~/.ssh/prachatham_cms`, user root). Ubuntu 22.04, OpenLiteSpeed 1.9 + lsphp 8.3, MariaDB 10.6, WordPress at `/var/www/html`, `wp … --allow-root`. After editing anything WP-side: `wp litespeed-purge all --allow-root`. Backups: `/root/backups/`. PHP: only lsphp83 is installed (lsphp80 removed 2026-10-22); patched to 8.3.36 for CVE-2026-109618/109619 — upgrade with `apt-get install --only-upgrade` on installed `lsphp83*` names only, then `systemctl restart lsws` and check no `lsphp` worker predates the restart — detached lsphp parents (ppid 1) survive the restart; `kill -TERM` them and they respawn on demand. Admin console :7080 is firewalled (ufw) — reach it via `ssh -L 7080:127.0.0.1:7080 prachatham-cms`. Full notes + upgrade gotchas: `cms/README.md`.

## 6. Open items (keep current)

- Google Search Console: owner to submit `https://www.prachatham.com/sitemap.xml` and, if `cms.` is a verified property, run *Change of address* → www. Track the "เชียงดาว ประชาธรรม" query moving from cms.* to www.
- `npm audit`: postcss inside Next 15 (fix requires Next 16 — planned upgrade, not urgent).
- Stale docs: `README.md`, `DEPLOYMENT*.md`, `ISSUES-FIXED.md` predate the 2026 rebuild; trust this file over them.
