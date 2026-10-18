#!/usr/bin/env python3
"""HIG regression check for the Prachatham site.

Usage:  npm run build && npx next start -p 3311 &
        python3 scripts/hig_check.py http://localhost:3311 /tmp/hig-out
Needs: playwright (pip) + a local Google Chrome. Writes <route>-<width>-<scheme>.png
+ measure.json; prints one JSON line per capture. Pass = fails 0, lowc_count 0,
small_count 0, h1count 1 on every line (see design_system.md section 6).
"""
import json, sys, pathlib
from playwright.sync_api import sync_playwright
BASE = sys.argv[1]; OUT = pathlib.Path(sys.argv[2]); OUT.mkdir(parents=True, exist_ok=True)
ROUTES = json.loads(sys.argv[3]) if len(sys.argv) > 3 else {
  "home": "/", "post": "/posts/08082569", "category": "/category/firedustdialogue", "posts": "/posts",
  "about": "/about", "search": "/search?q=ป่า", "donate": "/donate", "contact": "/contact", "404": "/nope-404"}
WIDTHS = [390, 1280]
MEASURE = r"""() => {
 const cv = document.createElement('canvas'); cv.width=cv.height=1; const cx = cv.getContext('2d', {willReadFrequently:true});
 const rgba = c => { cx.clearRect(0,0,1,1); cx.fillStyle = '#000'; cx.fillStyle = c; cx.fillRect(0,0,1,1); const d = cx.getImageData(0,0,1,1).data; return [d[0],d[1],d[2],d[3]/255]; };
 const lum = c => { const [r0,g0,b0,a] = rgba(c); const [r,g,b] = [r0,g0,b0].map(v=>{v/=255; return v<=0.03928? v/12.92 : Math.pow((v+0.055)/1.055,2.4)}); return {L:0.2126*r+0.7152*g+0.0722*b, a}; };
 const bgOf = el => { while (el) { const c = getComputedStyle(el).backgroundColor; if (rgba(c)[3] > 0.5) return c; if ([...el.children].some(k=>k.tagName==='IMG'&&getComputedStyle(k).position==='absolute') || el.querySelector(':scope > div > img, :scope > span > img')) return null; if (getComputedStyle(el).backgroundImage !== 'none' && el.tagName!=='HTML') return null; el = el.parentElement; } return 'rgb(255,255,255)'; };
 const ctl = []; const mn = innerWidth <= 600 ? 44 : 28;
 document.querySelectorAll('a,button,[role=button],input,select,textarea,summary').forEach(e => {
   const r = e.getBoundingClientRect(); if (r.width<=1||r.height<=1) return;
   const st = getComputedStyle(e); if (st.visibility==='hidden') return;
   const inline = e.tagName==='A' && st.display==='inline';
   if (!inline && (r.width<mn||r.height<mn)) ctl.push({t:(e.getAttribute('aria-label')||e.textContent||e.tagName).trim().slice(0,30), w:Math.round(r.width), h:Math.round(r.height)});
 });
 const small = [], lowc = []; const seen = new Set();
 const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
 while (walker.nextNode()) { const n = walker.currentNode; if (!n.textContent.trim()) continue; const el = n.parentElement; if (!el || seen.has(el)) continue; seen.add(el);
   const r = el.getBoundingClientRect(); if (r.width<1||r.height<1) continue; const st = getComputedStyle(el); if (st.visibility==='hidden'||+st.opacity===0) continue;
   if (el.closest('.sr-only,[aria-hidden=true],script,style,noscript')) continue;
   const fs = parseFloat(st.fontSize); const txt = n.textContent.trim().slice(0,28);
   if (fs < 13) small.push(fs+'px '+txt);
   const bg = bgOf(el); if (!bg) continue; const f = lum(st.color), b = lum(bg); if (!f||!b) continue;
   const ratio = (Math.max(f.L,b.L)+0.05)/(Math.min(f.L,b.L)+0.05); const big = fs>=18.66 || (fs>=14 && +st.fontWeight>=700) || fs >= 24;
   if (ratio < (big?3:4.5) && f.a > 0.9) lowc.push(ratio.toFixed(2)+' '+fs+'px '+st.color+' on '+bg+' «'+txt+'»');
 }
 const heads = [...document.querySelectorAll('h1,h2')].slice(0,5).map(h=>h.tagName+' '+getComputedStyle(h).fontSize+'/'+getComputedStyle(h).fontWeight);
 const bs = getComputedStyle(document.body);
 const fills = [...document.querySelectorAll('a,button')].filter(e=>{const r=e.getBoundingClientRect(); if(r.top>innerHeight||r.bottom<0||r.width<2) return false; const c=getComputedStyle(e).backgroundColor.match(/[\d.]+/g); if(!c) return false; if(c.length>3&&+c[3]<0.9) return false; const [R,G,B]=c.map(Number); return Math.max(R,G,B)-Math.min(R,G,B)>60;}).map(e=>(e.textContent||e.getAttribute('aria-label')||'').trim().slice(0,20));
 return {body: bs.fontSize+' '+bs.lineHeight, h1count: document.querySelectorAll('h1').length, heads, target_fails: ctl, small_text: [...new Set(small)].slice(0,25), small_count: small.length, low_contrast: [...new Set(lowc)].slice(0,25), lowc_count: lowc.length, filled_accent_above_fold: fills, overflowX: document.documentElement.scrollWidth > innerWidth, anims: [...document.querySelectorAll('*')].filter(e=>getComputedStyle(e).animationName!=='none' && getComputedStyle(e).animationIterationCount==='infinite').length};
}"""
exe = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
res = []
with sync_playwright() as p:
    b = p.chromium.launch(headless=True, executable_path=exe)
    for name, path in ROUTES.items():
        for w in WIDTHS:
            for scheme in ("light", "dark"):
                ctx = b.new_context(viewport={"width": w, "height": 860}, device_scale_factor=2, color_scheme=scheme)
                ctx.add_init_script(f"try{{localStorage.setItem('prachatham-theme','{scheme}')}}catch(e){{}}")
                pg = ctx.new_page(); errs = []
                pg.on("pageerror", lambda e: errs.append(str(e)[:120])); pg.on("console", lambda m: m.type=="error" and errs.append(m.text[:120]))
                try: pg.goto(BASE+path, wait_until="load", timeout=60000)
                except Exception as e: errs.append("goto "+str(e)[:80])
                pg.wait_for_timeout(2500)
                stem = f"{name}-{w}-{scheme}"
                pg.screenshot(path=str(OUT/f"{stem}.png"))
                if scheme == "light": pg.screenshot(path=str(OUT/f"{stem}-full.png"), full_page=True)
                m = pg.evaluate(MEASURE); m.update(route=name, width=w, scheme=scheme, errors=errs[:6]); res.append(m)
                print(json.dumps({k: m[k] for k in ("route","width","scheme","body","h1count","lowc_count","small_count","overflowX")} | {"fails": len(m["target_fails"]), "errs": len(errs)}, ensure_ascii=False), flush=True)
                ctx.close()
    b.close()
(OUT/"measure.json").write_text(json.dumps(res, ensure_ascii=False, indent=1))
