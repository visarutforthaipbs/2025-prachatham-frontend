# cms.prachatham.com — WordPress (headless) ops notes

- Host: DigitalOcean Droplet `209.97.165.218`, OpenLiteSpeed WordPress 1-click, Ubuntu 20.04, PHP 8.0. WordPress root `/var/www/html`, `wp` CLI available (`--allow-root`).
- Role: **editor + API only**. The public site is the Next.js app at www.prachatham.com, which reads `?rest_route=/wp/v2/...` (and wp-graphql).
- `mu-plugins/headless-redirect.php` (installed 2026-10-18) 301-redirects every public URL on cms.* to its www equivalent (posts → `/posts/slug`, categories, tags → search, pages, feed) so Google moves the ranking to www. Admin, login, REST, GraphQL, cron, previews, uploads and `robots.txt` are untouched. It also disables the core XML sitemap. **Do not block cms.* in robots.txt** — Google must be able to crawl the 301s.
- After editing it: `wp litespeed-purge all --allow-root` (LSCache serves cached HTML to guests otherwise).
- Backups of the previous state: `/root/backups/20261018-0806/` (mu-plugins, wp-config.php, .htaccess, full DB dump).
- Pending maintenance (not done): disk 75 % full, 232 security updates, Ubuntu 20.04 → 22.04.
