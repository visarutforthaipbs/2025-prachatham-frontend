# cms.prachatham.com — WordPress (headless) ops notes

- Host: DigitalOcean Droplet `209.97.165.218`, OpenLiteSpeed WordPress 1-click, **Ubuntu 22.04.5** (upgraded 2026-10-18), OpenLiteSpeed 1.9.3, lsphp 8.3, MariaDB 10.6. WordPress root `/var/www/html`, `wp` CLI available (`--allow-root`).
- Role: **editor + API only**. The public site is the Next.js app at www.prachatham.com, which reads `?rest_route=/wp/v2/...` (and wp-graphql).
- `mu-plugins/headless-redirect.php` (installed 2026-10-18) 301-redirects every public URL on cms.* to its www equivalent (posts → `/posts/slug`, categories, tags → search, pages, feed) so Google moves the ranking to www. Admin, login, REST, GraphQL, cron, previews, uploads and `robots.txt` are untouched. It also disables the core XML sitemap. **Do not block cms.* in robots.txt** — Google must be able to crawl the 301s.
- After editing it: `wp litespeed-purge all --allow-root` (LSCache serves cached HTML to guests otherwise).
- Backups of the previous state: `/root/backups/20261018-0806/` (mu-plugins, wp-config.php, .htaccess, full DB dump).
- 2026-10-18 maintenance: all 323 pending packages installed, kernel 5.4.0-216, rebooted; journal/snap cleanup (75 % → 65 % disk); `unattended-upgrades` reinstalled (it had been removed — that's why patches piled up). Web PHP is lsphp83 (CLI `php` is 8.0 — harmless).
- 2026-10-18 release upgrade 20.04 → 22.04 done. Gotchas hit (for next time): (1) `do-release-upgrade` hung on IPv6 — disable IPv6 + `Acquire::ForceIPv4` for the run; (2) the DO mirror URL with a trailing slash returns 403 on `ubuntu//dists/jammy/Release` → use `archive.ubuntu.com/ubuntu`; (3) upgrader comments out the LiteSpeed repo → re-enable as `jammy main` and `dist-upgrade`; (4) `ufw` came up inactive → `ufw --force enable`; (5) run `grub-install /dev/vda && update-grub` before reboot. Backups in `/root/backups/`.
- Note: OpenLiteSpeed admin (port 7080) is open to the internet in ufw — consider restricting it.
