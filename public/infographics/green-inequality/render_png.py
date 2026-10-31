#!/usr/bin/env python3
"""Render the CI-styled PNG fallbacks (light, 2x) from the real HTML charts.

  python3 render_png.py        # run from the repo root; needs playwright + local Google Chrome

Output: per-rai.png, money-flow.png (1440 px wide). Used under each iframe in the WP post
for LINE/Facebook/Google and readers without JS. The interactive-only bits (table toggle,
"tap for detail" hint) are hidden in the image because they mean nothing in a still.
Re-run whenever data.json or a *.src.html template changes (after build.py).
"""
import threading, http.server, socketserver, functools, pathlib
from playwright.sync_api import sync_playwright

PUB = pathlib.Path("public"); OUT = PUB / "infographics/green-inequality"
class Q(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a): pass
srv = socketserver.TCPServer(("127.0.0.1", 0), functools.partial(Q, directory=str(PUB)))
port = srv.server_address[1]; threading.Thread(target=srv.serve_forever, daemon=True).start()
with sync_playwright() as p:
    b = p.chromium.launch(headless=True, executable_path="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome")
    for n in ("per-rai", "money-flow"):
        ctx = b.new_context(viewport={"width": 720, "height": 900}, device_scale_factor=2, color_scheme="light")
        ctx.add_init_script("localStorage.setItem('prachatham-theme','light')")
        pg = ctx.new_page(); pg.goto(f"http://127.0.0.1:{port}/infographics/green-inequality/{n}.html")
        pg.wait_for_timeout(1200); pg.evaluate("document.fonts.ready"); pg.wait_for_timeout(300)
        pg.add_style_tag(content="#tbtn,#hint{display:none!important}")
        pg.wait_for_timeout(100)
        h = pg.evaluate("Math.ceil(document.querySelector('.wrap').getBoundingClientRect().bottom+parseFloat(getComputedStyle(document.body).paddingBottom))")
        pg.set_viewport_size({"width": 720, "height": h}); pg.wait_for_timeout(300)
        pg.screenshot(path=str(OUT / f"{n}.png"))
        print(n, "->", 1440, "x", h * 2); ctx.close()
    b.close()
srv.shutdown()
