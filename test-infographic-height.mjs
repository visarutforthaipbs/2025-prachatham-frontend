import test from "node:test";
import assert from "node:assert/strict";
import {
  applyHeightMessage,
  clampHeight,
  isInfographicSrc,
  MIN_HEIGHT,
  MAX_HEIGHT,
} from "./src/lib/infographic-height.ts";

const ORIGIN = "https://www.prachatham.com";
const frame = (src, win = {}) => ({
  contentWindow: win,
  style: { height: "1000px" },
  getAttribute: (n) => (n === "src" ? src : null),
});
const msg = (over = {}) => ({
  origin: ORIGIN,
  source: null,
  data: { type: "infographic-height", height: 1500 },
  ...over,
});

test("clampHeight: clamps to 200-6000 and rejects non-numbers", () => {
  assert.equal(clampHeight(1500.4), 1500);
  assert.equal(clampHeight(5), MIN_HEIGHT);
  assert.equal(clampHeight(99999), MAX_HEIGHT);
  for (const bad of ["1500", NaN, Infinity, -Infinity, null, undefined, {}, [], true]) {
    assert.equal(clampHeight(bad), null, String(bad));
  }
});

test("isInfographicSrc: only same-origin /infographics/ paths", () => {
  assert.equal(isInfographicSrc("/infographics/green-inequality/per-rai.html", ORIGIN), true);
  assert.equal(isInfographicSrc(`${ORIGIN}/infographics/x.html`, ORIGIN), true);
  assert.equal(isInfographicSrc("/wp-content/evil.html", ORIGIN), false);
  assert.equal(isInfographicSrc("/infographicsX/a.html", ORIGIN), false);
  assert.equal(isInfographicSrc("https://evil.example/infographics/a.html", ORIGIN), false);
  assert.equal(isInfographicSrc("//evil.example/infographics/a.html", ORIGIN), false);
  assert.equal(isInfographicSrc("", ORIGIN), false);
  assert.equal(isInfographicSrc(null, ORIGIN), false);
  assert.equal(isInfographicSrc("/infographics/a.html", ""), false);
});

test("applies height to the iframe whose contentWindow is the source", () => {
  const w1 = {}, w2 = {};
  const a = frame("/infographics/a.html", w1);
  const b = frame("/infographics/b.html", w2);
  const hit = applyHeightMessage(msg({ source: w2 }), [a, b], ORIGIN);
  assert.equal(hit, b);
  assert.equal(b.style.height, "1500px");
  assert.equal(a.style.height, "1000px"); // untouched
});

test("clamps the applied height", () => {
  const w = {}; const f = frame("/infographics/a.html", w);
  applyHeightMessage(msg({ source: w, data: { type: "infographic-height", height: 10 } }), [f], ORIGIN);
  assert.equal(f.style.height, "200px");
  applyHeightMessage(msg({ source: w, data: { type: "infographic-height", height: 1e9 } }), [f], ORIGIN);
  assert.equal(f.style.height, "6000px");
});

test("(a) ignores messages from another origin", () => {
  const w = {}; const f = frame("/infographics/a.html", w);
  assert.equal(applyHeightMessage(msg({ source: w, origin: "https://evil.example" }), [f], ORIGIN), null);
  assert.equal(applyHeightMessage(msg({ source: w, origin: "null" }), [f], ORIGIN), null);
  assert.equal(f.style.height, "1000px");
});

test("(b) ignores iframes outside /infographics/ and spoofed sources", () => {
  const w = {};
  const other = frame("/wp-content/x.html", w);
  assert.equal(applyHeightMessage(msg({ source: w }), [other], ORIGIN), null);
  const ok = frame("/infographics/a.html", {});
  assert.equal(applyHeightMessage(msg({ source: {} }), [ok], ORIGIN), null); // source is not this frame
  assert.equal(ok.style.height, "1000px");
});

test("(c)/(d) no-op on malformed or missing data", () => {
  const w = {}; const f = frame("/infographics/a.html", w);
  const cases = [
    msg({ source: w, data: null }),
    msg({ source: w, data: "infographic-height" }),
    msg({ source: w, data: { type: "other", height: 900 } }),
    msg({ source: w, data: { type: "infographic-height" } }),
    msg({ source: w, data: { type: "infographic-height", height: "900" } }),
    msg({ source: w, data: { type: "infographic-height", height: NaN } }),
    msg({ source: null }),
    msg({ source: undefined }),
  ];
  for (const c of cases) assert.equal(applyHeightMessage(c, [f], ORIGIN), null);
  assert.equal(applyHeightMessage(msg({ source: w }), [], ORIGIN), null); // no iframes
  assert.equal(applyHeightMessage(msg({ source: w }), [f], ""), null); // no origin
  assert.equal(f.style.height, "1000px");
});
