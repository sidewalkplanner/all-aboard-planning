// Live sketches for Try it: the same hand-inked collage kit the lesson figures
// use (art/lib/draw.mjs), drawn in the browser so a slider can reshape them.
//
// Speed matters because a sketch redraws while a slider moves. So:
// - fills skip the paper-grain filter (the card behind them has grain);
// - every shape is seeded from its size and position, so the same shape
//   always gets the same wobble and nothing shimmers while you drag;
// - inked shapes are cached, so the parts that don't move cost nothing.
//
// Sketches are 400 units wide. On a 360px phone they're drawn about 288px
// wide, so text must be at least 19 units (Figtree) or 24 (Caveat) to reach
// 13px on screen; `npm run check` enforces it. They're shown no wider than
// 460px, where the default text is about 22px.
import { inkLine, cut, rectD, ellipseD, polyD, makeRng, PALETTE } from '../../../art/lib/draw.mjs';

export const P = PALETTE;
export const W = 400;
export const TEXT = 19;

const cache = new Map();
const memo = (key, make) => {
  let v = cache.get(key);
  if (v === undefined) {
    v = make();
    if (cache.size > 800) cache.clear();
    cache.set(key, v);
  }
  return v;
};
const r1 = (n) => Math.round(n * 10) / 10;
const seedOf = (...n) => n.reduce((s, x) => (s * 31 + Math.round(x * 10)) >>> 0, 7);

// A cut-paper rectangle with an inked outline.
export function box(x, y, w, h, { fill = P.paper, ink = true, size = 1.8, seed = 0 } = {}) {
  [x, y, w, h] = [r1(x), r1(y), r1(w), r1(h)];
  if (w <= 0 || h <= 0) return '';
  return memo(`b${x},${y},${w},${h},${fill},${ink},${size},${seed}`, () => {
    const s = seedOf(x, y, w, h, seed);
    const paper = cut(rectD(x, y, w, h), { rng: makeRng(s), fill, jitter: Math.min(1, w / 20, h / 20), filter: 'none', shadow: false });
    const line = ink ? inkLine(rectD(x, y, w, h), { rng: makeRng(s + 1), size, wobble: 0.8, closed: true, overshoot: 0 }) : '';
    return paper + line;
  });
}

// A cut-paper circle.
export function disc(cx, cy, r, { fill = P.butter, ink = true, seed = 0 } = {}) {
  [cx, cy, r] = [r1(cx), r1(cy), r1(r)];
  if (r <= 0) return '';
  return memo(`d${cx},${cy},${r},${fill},${ink},${seed}`, () => {
    const s = seedOf(cx, cy, r, seed);
    return cut(ellipseD(cx, cy, r), { rng: makeRng(s), fill, jitter: Math.min(1, r / 10), filter: 'none', shadow: false }) +
      (ink ? inkLine(ellipseD(cx, cy, r), { rng: makeRng(s + 1), size: 1.8, wobble: 0.6, closed: true, overshoot: 0 }) : '');
  });
}

// A hand-inked line through points.
export function line(pts, { size = 2, color = P.ink, dash = false, seed = 0 } = {}) {
  const key = `l${pts.map(([a, b]) => `${r1(a)} ${r1(b)}`).join(',')},${size},${color},${dash},${seed}`;
  return memo(key, () => {
    if (dash) {
      // Short separate strokes, like a pencil dash.
      const out = [];
      for (let i = 0; i < pts.length - 1; i++) {
        const [x1, y1] = pts[i];
        const [x2, y2] = pts[i + 1];
        const len = Math.hypot(x2 - x1, y2 - y1);
        const n = Math.max(1, Math.floor(len / 12));
        for (let k = 0; k < n; k++) {
          const a = k / n;
          const b = Math.min(1, a + 0.55 / n);
          out.push(`<line x1="${r1(x1 + (x2 - x1) * a)}" y1="${r1(y1 + (y2 - y1) * a)}" x2="${r1(x1 + (x2 - x1) * b)}" y2="${r1(y1 + (y2 - y1) * b)}" stroke="${color}" stroke-width="${size}" stroke-linecap="round"/>`);
        }
      }
      return out.join('');
    }
    return inkLine(polyD(pts, false), { rng: makeRng(seedOf(...pts.flat(), seed)), size, color, wobble: 0.7, overshoot: 1.5 });
  });
}

// A polygon of cut paper with no outline (bands, areas under curves).
export function patch(pts, { fill = P.sky, seed = 0 } = {}) {
  return cut(polyD(pts), { rng: makeRng(seedOf(pts.length, seed)), fill, jitter: 0.5, filter: 'none', shadow: false });
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

// Data labels (Figtree).
export function text(x, y, s, { size = TEXT, anchor = 'middle', weight = 600, color = P.ink } = {}) {
  return `<text x="${r1(x)}" y="${r1(y)}" text-anchor="${anchor}" font-family="Figtree Variable, Figtree, sans-serif" font-weight="${weight}" font-size="${size}" fill="${color}">${esc(s)}</text>`;
}

// A handwritten remark (Caveat), for the one note that makes the point.
export function note(x, y, s, { size = 24, anchor = 'middle', color = P.civicDeep } = {}) {
  return `<text x="${r1(x)}" y="${r1(y)}" text-anchor="${anchor}" font-family="Caveat, cursive" font-weight="700" font-size="${size}" fill="${color}">${esc(s)}</text>`;
}

export const sketch = (h, body) => ({ w: W, h, svg: body });

// Number formatting shared by the calculators and their sketches.
export const num = (n, dp = 0) => n.toLocaleString('en-US', { minimumFractionDigits: dp, maximumFractionDigits: dp });
export const money = (n) => `$${num(Math.round(n))}`;
export const pct = (n, dp = 1) => `${num(n, dp)}%`;
