#!/usr/bin/env python3
"""Weekly health check for prachatham.com (frontend + headless CMS + server).

Usage:
    /usr/bin/python3 scripts/health_check.py            # full check (~3-5 min, builds in a temp worktree)
    /usr/bin/python3 scripts/health_check.py --quick    # skip build/audit (live + CMS + server only, ~20 s)
    /usr/bin/python3 scripts/health_check.py --json     # machine-readable

Read-only: builds origin/main in a throwaway git worktree, never touches the
working tree, never changes the server. Exit code 0 = all PASS/WARN, 1 = any FAIL.
Stdlib only. See AGENTS.md for what each check protects.
"""
import json, os, re, shutil, subprocess, sys, tempfile, time, urllib.error, urllib.request
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
WWW = "https://www.prachatham.com"
CMS = "https://cms.prachatham.com"
UA = "Mozilla/5.0 (compatible; prachatham-health/1.0)"
results = []  # (status, area, check, detail)


def add(status, area, check, detail: object = ""):
    results.append((status, area, check, str(detail)[:300]))


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *a, **k):
        return None


def http(url, method="GET", data=None, headers=None, follow=True, timeout=30):
    """Return (status, headers, body_text). Never raises."""
    h = {"User-Agent": UA, **(headers or {})}
    req = urllib.request.Request(url, data=data, method=method, headers=h)
    opener = urllib.request.build_opener() if follow else urllib.request.build_opener(NoRedirect)
    try:
        with opener.open(req, timeout=timeout) as r:
            return r.status, dict(r.headers), r.read().decode("utf-8", "ignore")
    except urllib.error.HTTPError as e:
        return e.code, dict(e.headers or {}), (e.read() or b"").decode("utf-8", "ignore")
    except Exception as e:  # network error
        return 0, {}, str(e)


def run(cmd, cwd=None, timeout=900, env=None):
    e = dict(os.environ)
    for k in ("PYTHONPATH", "VIRTUAL_ENV", "PYTHONHOME"):
        e.pop(k, None)
    if env:
        e.update(env)
    try:
        p = subprocess.run(cmd, cwd=cwd, shell=isinstance(cmd, str), capture_output=True, text=True, timeout=timeout, env=e)
        return p.returncode, (p.stdout or "") + (p.stderr or "")
    except subprocess.TimeoutExpired:
        return 124, "timeout"


def find_node():
    """Node >= 22.6 (npm test needs --experimental-strip-types)."""
    cands = sorted((Path.home() / ".nvm/versions/node").glob("v*/bin"), reverse=True)
    cands += [Path("/opt/homebrew/bin"), Path("/usr/local/bin")]
    for d in cands:
        node = d / "node"
        if not node.exists():
            continue
        rc, out = run([str(node), "-v"])
        m = re.match(r"v(\d+)\.(\d+)", out.strip())
        if m and (int(m.group(1)), int(m.group(2))) >= (22, 6):
            return d
    return None


# ── 1. Repo + build gates ────────────────────────────────────────────────
def check_build():
    rc, out = run(["git", "fetch", "-q", "origin"], cwd=REPO)
    if rc:
        add("FAIL", "repo", "git fetch", out)
        return
    rc, head = run(["git", "rev-parse", "--short", "origin/main"], cwd=REPO)
    add("INFO", "repo", "origin/main", head.strip())
    rc, dirty = run(["git", "status", "--porcelain"], cwd=REPO)
    if dirty.strip():
        add("WARN", "repo", "local working tree has uncommitted changes", f"{len(dirty.splitlines())} files (not built — check uses origin/main)")
    nodebin = find_node()
    if not nodebin:
        add("FAIL", "build", "node >= 22.6 available", "none found (nvm install 24)")
        return
    env = {"PATH": f"{nodebin}:{os.environ.get('PATH', '')}", "NEXT_TELEMETRY_DISABLED": "1"}
    wt = Path(tempfile.mkdtemp(prefix="pt-health-"))
    try:
        rc, out = run(["git", "worktree", "add", "-q", "--detach", str(wt), "origin/main"], cwd=REPO)
        if rc:
            add("FAIL", "build", "git worktree", out)
            return
        envf = REPO / ".env.local"
        if envf.exists():
            shutil.copy(envf, wt / ".env.local")
        steps = [
            ("npm ci", "npm ci --no-audit --no-fund", 600),
            ("type-check", "npm run -s type-check", 300),
            ("lint", "npm run -s lint", 300),
            ("build", "npm run -s build", 900),
            ("tests", "npm test", 120),
        ]
        for name, cmd, to in steps:
            t = time.time()
            rc, out = run(cmd, cwd=wt, env=env, timeout=to)
            dt = f"{time.time() - t:.0f}s"
            if rc:
                tail = " | ".join([l for l in out.splitlines() if l.strip()][-4:])
                add("FAIL", "build", name, f"exit {rc} ({dt}): {tail}")
                if name in ("npm ci", "build"):
                    break
            else:
                extra = ""
                if name == "tests":
                    m = re.search(r"pass (\d+).*?fail (\d+)", out, re.S)
                    extra = f" pass={m.group(1)} fail={m.group(2)}" if m else ""
                add("PASS", "build", name, dt + extra)
        rc, out = run("npm audit --omit=dev --json", cwd=wt, env=env, timeout=120)
        try:
            v = json.loads(out).get("metadata", {}).get("vulnerabilities", {})
            crit, high = v.get("critical", 0), v.get("high", 0)
            names = ", ".join(sorted(json.loads(out).get("vulnerabilities", {}).keys()))
            st = "FAIL" if crit else ("WARN" if high else "PASS")
            add(st, "deps", "npm audit (prod)", f"critical={crit} high={high} moderate={v.get('moderate', 0)} [{names}]")
        except Exception:
            add("WARN", "deps", "npm audit (prod)", "could not parse output")
    finally:
        run(["git", "worktree", "remove", "--force", str(wt)], cwd=REPO)
        shutil.rmtree(wt, ignore_errors=True)


# ── 2. Live site ─────────────────────────────────────────────────────────
def check_live():
    for path in ["/", "/posts", "/about", "/category/featured", "/feed.xml", "/robots.txt"]:
        t = time.time()
        st, _, body = http(WWW + path)
        dt = time.time() - t
        add("PASS" if st == 200 and dt < 8 else ("WARN" if st == 200 else "FAIL"), "www", f"GET {path}", f"{st} {dt:.1f}s")
    # newest post renders and is self-canonical (guards the localhost:3000 regression)
    st, hd, body = http(f"{CMS}/?rest_route=/wp/v2/posts&per_page=1&_fields=slug")
    total = int(hd.get("X-WP-Total") or hd.get("x-wp-total") or 0)
    slug = json.loads(body)[0]["slug"] if st == 200 else None
    if slug:
        st, _, page = http(f"{WWW}/posts/{slug}")
        bad = [x for x in ("localhost", "/undefined/", "prachatham.org") if x in page]
        add("PASS" if st == 200 and not bad else "FAIL", "www", f"newest post /posts/{slug}", f"{st} {'bad URLs: ' + ','.join(bad) if bad else 'canonical ok'}")
    st, _, page = http(f"{WWW}/contact")
    m = re.search(r'<link rel="canonical" href="([^"]+)"', page)
    add("PASS" if m and m.group(1) == f"{WWW}/contact" else "FAIL", "www", "contact canonical", m.group(1) if m else "missing")
    st, _, sm = http(f"{WWW}/sitemap.xml")
    nposts = len(re.findall(r"<loc>[^<]*/posts/", sm))
    add("PASS" if total and nposts >= total else "FAIL", "seo", "sitemap lists every published post", f"sitemap={nposts} cms_total={total}")
    st, hd, _ = http(f"{WWW}/2023/04/26/26042566-01", follow=False)
    loc = hd.get("Location") or hd.get("location") or ""
    add("PASS" if st in (301, 308) and loc.endswith("/posts/26042566-01") else "FAIL", "seo", "legacy WP URL redirect on www", f"{st} → {loc}")


# ── 3. Headless CMS ──────────────────────────────────────────────────────
def check_cms():
    t = time.time()
    st, _, _ = http(f"{CMS}/?rest_route=/wp/v2/posts&per_page=1")
    add("PASS" if st == 200 else "FAIL", "cms", "REST API", f"{st} {time.time() - t:.1f}s")
    st, _, _ = http(f"{CMS}/graphql", method="POST", data=b'{"query":"{generalSettings{title}}"}', headers={"Content-Type": "application/json"})
    add("PASS" if st == 200 else "WARN", "cms", "GraphQL", st)
    st, _, _ = http(f"{CMS}/wp-login.php")
    add("PASS" if st == 200 else "FAIL", "cms", "wp-login reachable", st)
    st, _, body = http(f"{CMS}/?rest_route=/wp/v2/posts&per_page=1&_fields=link,slug")
    if st == 200:
        p = json.loads(body)[0]
        st2, hd, _ = http(p["link"], follow=False, headers={"User-Agent": "Googlebot/2.1"})
        loc = hd.get("Location") or hd.get("location") or ""
        add("PASS" if st2 == 301 and loc == f"{WWW}/posts/{p['slug']}" else "FAIL", "seo", "cms post → www 301 (headless mu-plugin)", f"{st2} → {loc}")
    st, _, robots = http(f"{CMS}/robots.txt")
    add("PASS" if st == 200 and "Sitemap:" not in robots and "Disallow: /\n" not in robots else "FAIL", "seo", "cms robots.txt (crawlable, no sitemap)", st)


# ── 4. Server (read-only over SSH) ───────────────────────────────────────
def check_server():
    script = r"""
echo "os=$(lsb_release -rs)"
echo "uptime_days=$(( $(cut -d. -f1 /proc/uptime) / 86400 ))"
echo "disk_pct=$(df --output=pcent / | tail -1 | tr -dc 0-9)"
echo "mem_avail_mb=$(free -m | awk 'NR==2{print $7}')"
echo "reboot_required=$([ -f /var/run/reboot-required ] && echo yes || echo no)"
echo "pending=$(apt list --upgradable 2>/dev/null | tail -n +2 | wc -l)"
echo "pending_security=$(apt list --upgradable 2>/dev/null | grep -c -- -security)"
for s in lsws mariadb redis-server ufw unattended-upgrades; do echo "svc_$s=$(systemctl is-active $s)"; done
echo "ufw=$(ufw status | head -1 | awk '{print $2}')"
echo "mu_plugin=$(test -f /var/www/html/wp-content/mu-plugins/headless-redirect.php && echo present || echo MISSING)"
"""
    try:
        p = subprocess.run(["ssh", "-o", "BatchMode=yes", "-o", "ConnectTimeout=15", "prachatham-cms", "bash -s"], input=script,
                           capture_output=True, text=True, timeout=120)
        rc, out = p.returncode, p.stdout
    except Exception as e:
        rc, out = 1, str(e)
    if rc:
        add("FAIL", "server", "ssh prachatham-cms", out or "unreachable")
        return
    kv = dict(l.split("=", 1) for l in out.splitlines() if "=" in l)
    add("PASS" if kv.get("os", "").startswith(("22.04", "24.04")) else "WARN", "server", "Ubuntu release", kv.get("os"))
    d = int(kv.get("disk_pct", 0) or 0)
    add("FAIL" if d >= 90 else "WARN" if d >= 80 else "PASS", "server", "disk used", f"{d}%")
    add("WARN" if int(kv.get("mem_avail_mb", 0) or 0) < 150 else "PASS", "server", "memory available", f"{kv.get('mem_avail_mb')} MB")
    sec = int(kv.get("pending_security", 0) or 0)
    add("WARN" if sec else "PASS", "server", "pending updates", f"{kv.get('pending')} total, {sec} security")
    add("WARN" if kv.get("reboot_required") == "yes" else "PASS", "server", "reboot required", kv.get("reboot_required"))
    for s in ("lsws", "mariadb", "redis-server", "unattended-upgrades"):
        v = kv.get(f"svc_{s}")
        add("PASS" if v == "active" else "FAIL", "server", f"service {s}", v)
    add("PASS" if kv.get("ufw") == "active" else "FAIL", "server", "firewall (ufw)", kv.get("ufw"))
    add("PASS" if kv.get("mu_plugin") == "present" else "FAIL", "server", "headless-redirect mu-plugin", kv.get("mu_plugin"))
    add("INFO", "server", "uptime", f"{kv.get('uptime_days')} days")


def main():
    quick = "--quick" in sys.argv
    t0 = time.time()
    if not quick:
        check_build()
    check_live()
    check_cms()
    check_server()
    fails = [r for r in results if r[0] == "FAIL"]
    warns = [r for r in results if r[0] == "WARN"]
    if "--json" in sys.argv:
        print(json.dumps({"fails": len(fails), "warns": len(warns), "seconds": round(time.time() - t0),
                          "results": [dict(zip(("status", "area", "check", "detail"), r)) for r in results]}, ensure_ascii=False, indent=1))
    else:
        print(f"prachatham health — {time.strftime('%Y-%m-%d %H:%M')} — {'quick' if quick else 'full'} — {time.time() - t0:.0f}s")
        for st, area, check, detail in results:
            print(f"{st:5} {area:7} {check:45} {detail}")
        print(f"\nSUMMARY: {len(fails)} FAIL, {len(warns)} WARN, {sum(r[0] == 'PASS' for r in results)} PASS")
    sys.exit(1 if fails else 0)


if __name__ == "__main__":
    main()
