#!/usr/bin/env python3
"""Build the two self-contained chart files from the *.src.html templates.

  python3 scripts/infographics/green-inequality/build.py
      # writes public/infographics/green-inequality/per-rai.html + money-flow.html

Inlines _shared.css, _shared.js and data.json so each output is a single
file (safe inside an <iframe>, no extra requests, no CDN).

data.json is the ONLY source of numbers and labels. It is produced by
export_data.py (kept with the article workspace), which asserts every value
against the article text. Never hand-edit data.json, and never type a number
into a *.src.html template: this script fails the build if it finds one.
"""
import json, pathlib, re, sys

HERE = pathlib.Path(__file__).resolve().parent          # build inputs (not shipped)
ROOT = HERE.parents[2]                                  # repo root
OUT = ROOT / "public/infographics/green-inequality"     # shipped files only
data = json.loads((HERE / "data.json").read_text(encoding="utf-8"))
css = (HERE / "_shared.css").read_text(encoding="utf-8")
js = (HERE / "_shared.js").read_text(encoding="utf-8")

# Every number that appears anywhere in data.json (as digits, with or without
# thousands separators / decimals) -- used to catch hand-typed data values.
def walk(o):
    if isinstance(o, dict):
        for v in o.values(): yield from walk(v)
    elif isinstance(o, list):
        for v in o: yield from walk(v)
    else:
        yield o
data_nums = set()
for v in walk(data):
    if isinstance(v, (int, float)) and not isinstance(v, bool):
        data_nums.add(v)

# Layout constants that are NOT data (px sizes, steps, thresholds) live in the
# templates. A bare literal that equals a data value is suspicious: flag it.
SUSPECT = {str(int(n)) if float(n).is_integer() else str(n) for n in data_nums if abs(n) >= 5}

def check_template(name, src):
    # Look only at the <script> body that holds chart logic and at visible text.
    bad = []
    body = re.sub(r"/\*.*?\*/", "", src, flags=re.S)
    # Strip CSS (everything inside <style>) -- px values are layout, not data.
    body = re.sub(r"<style>.*?</style>", "", body, flags=re.S)
    for m in re.finditer(r"(?<![\w.#/-])(\d[\d,]*\.?\d*)(?![\w.%])", body):
        tok = m.group(1).replace(",", "")
        if tok in SUSPECT:
            line = body.count("\n", 0, m.start()) + 1
            bad.append(f"{name}: literal {m.group(1)!r} equals a data.json value (template line ~{line})")
    return bad

problems = []
for stem in ("per-rai", "money-flow"):
    src = (HERE / f"{stem}.src.html").read_text(encoding="utf-8")
    problems += check_template(f"{stem}.src.html", src)
    out = (src.replace("/*__SHARED_CSS__*/", css)
              .replace("/*__SHARED_JS__*/", js)
              .replace("/*__DATA__*/null", json.dumps(data, ensure_ascii=False, separators=(",", ":"))))
    assert "__SHARED" not in out and "__DATA__" not in out, "placeholder left behind"
    (OUT / f"{stem}.html").write_text(out, encoding="utf-8")
    print(f"wrote {stem}.html  {len(out.encode('utf-8')):,} bytes")

if problems:
    print("\nHAND-TYPED NUMBER GUARD FAILED:", *problems, sep="\n  ")
    sys.exit(1)
print("number guard: ok (no data.json value typed into a template)")
