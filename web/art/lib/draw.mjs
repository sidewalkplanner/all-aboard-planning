// Hand-made collage drawing kit.
//
// Everything here turns clean geometry (SVG path strings or point lists)
// into things that look made by hand: pressure-varying ink lines that
// wobble and overshoot, paper cut with scissors, paper torn with a white
// fibrous rim, and scribbled hatching. Output is plain SVG markup strings,
// so scenes compose by concatenation.
import { getStroke } from 'perfect-freehand';
import { svgPathProperties } from 'svg-path-properties';

// ---------------------------------------------------------------- random

export function makeRng(seed = 1) {
  let a = seed >>> 0;
  const next = () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  next.range = (lo, hi) => lo + next() * (hi - lo);
  next.pick = (arr) => arr[Math.floor(next() * arr.length)];
  next.int = (lo, hi) => Math.floor(next.range(lo, hi + 1));
  return next;
}

// Smooth 1D value noise, used to make lines drift instead of jitter.
function noise1d(rng, count = 64) {
  const v = Array.from({ length: count }, () => rng() * 2 - 1);
  return (t) => {
    const x = ((t % count) + count) % count;
    const i = Math.floor(x);
    const f = x - i;
    const s = f * f * (3 - 2 * f);
    return v[i] * (1 - s) + v[(i + 1) % count] * s;
  };
}

// ---------------------------------------------------------------- geometry

const fmt = (n) => Math.round(n * 100) / 100;

export function samplePath(d, spacing = 3) {
  const props = new svgPathProperties(d);
  const len = props.getTotalLength();
  const n = Math.max(2, Math.ceil(len / spacing));
  const pts = [];
  for (let i = 0; i <= n; i++) {
    const p = props.getPointAtLength((len * i) / n);
    pts.push([p.x, p.y]);
  }
  return pts;
}

// A path string may hold several subpaths ("M..Z M..Z"); sample each.
export function splitSubpaths(d) {
  return d.split(/(?=[Mm])/).map((s) => s.trim()).filter(Boolean);
}

function resample(pts, spacing) {
  const out = [pts[0]];
  let carry = 0;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1];
    const [x1, y1] = pts[i];
    const seg = Math.hypot(x1 - x0, y1 - y0);
    let t = spacing - carry;
    while (t <= seg) {
      out.push([x0 + ((x1 - x0) * t) / seg, y0 + ((y1 - y0) * t) / seg]);
      t += spacing;
    }
    carry = seg - (t - spacing);
  }
  const last = pts[pts.length - 1];
  const tail = out[out.length - 1];
  if (Math.hypot(last[0] - tail[0], last[1] - tail[1]) > spacing * 0.3) out.push(last);
  return out;
}

function normals(pts, closed) {
  return pts.map((p, i) => {
    const a = pts[i === 0 ? (closed ? pts.length - 2 : 0) : i - 1];
    const b = pts[i === pts.length - 1 ? (closed ? 1 : i) : i + 1];
    const dx = b[0] - a[0];
    const dy = b[1] - a[1];
    const l = Math.hypot(dx, dy) || 1;
    return [-dy / l, dx / l];
  });
}

export function toPoints(shape, spacing = 3) {
  if (typeof shape === 'string') return samplePath(shape, spacing);
  return resample(shape, spacing);
}

export const polyD = (pts, close = true) =>
  'M' + pts.map(([x, y]) => `${fmt(x)} ${fmt(y)}`).join('L') + (close ? 'Z' : '');

// Outline polygon from perfect-freehand -> smooth closed path.
function strokeD(outline) {
  if (!outline.length) return '';
  const d = outline.reduce(
    (acc, [x0, y0], i, arr) => {
      const [x1, y1] = arr[(i + 1) % arr.length];
      acc.push(fmt(x0), fmt(y0), fmt((x0 + x1) / 2), fmt((y0 + y1) / 2));
      return acc;
    },
    ['M', ...outline[0].map(fmt), 'Q']
  );
  return d.join(' ') + ' Z';
}

// ---------------------------------------------------------------- ink

/**
 * A single hand-inked line along `shape` (path string or point list).
 * wobble: max drift in px; overshoot: how far the pen runs past each end;
 * size: nib width. Closed shapes don't meet exactly, like real sketching.
 */
export function inkLine(shape, opts = {}) {
  const {
    rng = makeRng(1), size = 3, wobble = 1.2, overshoot = 3, thinning = 0.55,
    color = 'var(--ink)', closed = false, taper = true, opacity = 1, extra = ''
  } = opts;
  let pts = toPoints(shape, 2.5);
  if (pts.length < 2) return '';
  const n = noise1d(rng);
  const freq = opts.freq ?? 0.045;
  const off = rng() * 50;
  const nm = normals(pts, false);
  pts = pts.map(([x, y], i) => {
    const w = n(off + i * freq * 2.5) * wobble;
    return [x + nm[i][0] * w, y + nm[i][1] * w];
  });
  if (closed) {
    // Run past the start so the loop overlaps a little, then lift the pen.
    const k = Math.min(pts.length - 1, Math.round(rng.range(2, 6)));
    pts = pts.concat(pts.slice(1, k).map(([x, y]) => [x + rng.range(-1, 1), y + rng.range(-1, 1)]));
  }
  if (overshoot) {
    const ext = (a, b, len) => {
      const dx = a[0] - b[0];
      const dy = a[1] - b[1];
      const l = Math.hypot(dx, dy) || 1;
      return [a[0] + (dx / l) * len, a[1] + (dy / l) * len];
    };
    if (!closed) {
      pts.unshift(ext(pts[0], pts[1], rng.range(0.2, 1) * overshoot));
      pts.push(ext(pts[pts.length - 1], pts[pts.length - 2], rng.range(0.3, 1) * overshoot));
    }
  }
  const outline = getStroke(pts, {
    size, thinning, smoothing: 0.62, streamline: 0.35, simulatePressure: true,
    start: { taper: taper ? size * 2.2 : 0, cap: true },
    end: { taper: taper ? size * 3 : 0, cap: true },
    last: true
  });
  return `<path d="${strokeD(outline)}" fill="${color}"${opacity !== 1 ? ` opacity="${opacity}"` : ''}${extra}/>`;
}

// Ink every subpath of a compound path.
export function ink(d, opts = {}) {
  const rng = opts.rng ?? makeRng(9);
  return splitSubpaths(d)
    .map((sub) => inkLine(sub, { ...opts, rng, closed: opts.closed ?? /z\s*$/i.test(sub) }))
    .join('');
}

// ---------------------------------------------------------------- paper

// Fractal edge displacement: a torn paper edge is rough at every scale.
function tearEdge(pts, rng, amp) {
  const n1 = noise1d(rng, 128);
  const n2 = noise1d(rng, 128);
  const o = rng() * 100;
  const nm = normals(pts, true);
  return pts.map(([x, y], i) => {
    const d = n1(o + i * 0.09) * amp + n2(o + i * 0.55) * amp * 0.45 + (rng() - 0.5) * amp * 0.5;
    return [x + nm[i][0] * d, y + nm[i][1] * d];
  });
}

function offsetPoly(pts, dist) {
  const nm = normals(pts, true);
  return pts.map(([x, y], i) => [x + nm[i][0] * dist, y + nm[i][1] * dist]);
}

// Signed area tells us which side "outward" is for the normal offset.
function orientation(pts) {
  let a = 0;
  for (let i = 0; i < pts.length - 1; i++) a += pts[i][0] * pts[i + 1][1] - pts[i + 1][0] * pts[i][1];
  return Math.sign(a) || 1;
}

/**
 * Torn paper: a colored sheet over a slightly larger white core that
 * peeks out along the tear, the tell-tale of hand-torn paper.
 */
export function torn(shape, opts = {}) {
  const {
    rng = makeRng(3), fill = '#fff', amp = 2.6, rim = 2.2, rimColor = '#FBF8F1',
    filter = 'url(#paper)', shadow = true, extra = ''
  } = opts;
  const base = toPoints(shape, 2);
  const s = -orientation(base);
  const outer = tearEdge(offsetPoly(base, s * rim), rng, amp * 1.1);
  const inner = tearEdge(base, rng, amp * 0.8);
  return `<g${shadow ? ' filter="url(#lift)"' : ''}${extra}>` +
    (rim ? `<path d="${polyD(outer)}" fill="${rimColor}"/>` : '') +
    `<path d="${polyD(inner)}" fill="${fill}" filter="${filter}"/>${overlay(polyD(inner), opts)}</g>`;
}

/**
 * Scissor-cut paper: straight-ish edges with tiny angle wander at each
 * snip, corners a touch off-square.
 */
export function cut(shape, opts = {}) {
  const { rng = makeRng(4), fill = '#fff', jitter = 1.4, filter = 'url(#paper)', shadow = true, extra = '' } = opts;
  let pts;
  if (typeof shape === 'string') {
    pts = splitSubpaths(shape).length > 1 ? null : samplePath(shape, 14);
  } else pts = resample(shape, 14);
  if (!pts) {
    return splitSubpaths(shape).map((d) => cut(d, opts)).join('');
  }
  const snip = noise1d(rng, 64);
  const o = rng() * 40;
  pts = pts.map(([x, y], i) => [x + snip(o + i * 0.7) * jitter, y + snip(o + 17 + i * 0.7) * jitter]);
  return `<g${shadow ? ' filter="url(#lift)"' : ''}${extra}><path d="${polyD(pts)}" fill="${fill}" filter="${filter}"/>${overlay(polyD(pts), opts)}</g>`;
}

// Patterned paper: dots, stripes, graph grid, ruled lines or newsprint laid
// over the base color, as if the scrap came from a different sheet.
function overlay(d, { pattern, patternOpacity = 0.5 } = {}) {
  if (!pattern) return '';
  return `<path d="${d}" fill="url(#pat-${pattern})" opacity="${patternOpacity}"/>`;
}

// Parallel scribbled hatch lines clipped to a shape.
let clipId = 0;
export function hatch(shape, opts = {}) {
  const {
    rng = makeRng(5), angle = -35, gap = 7, size = 1.3, color = 'var(--ink)', opacity = 0.55,
    bbox, wobble = 0.8, cross = false
  } = opts;
  const d = typeof shape === 'string' ? shape : polyD(shape);
  const pts = typeof shape === 'string' ? samplePath(shape, 6) : shape;
  const xs = pts.map((p) => p[0]);
  const ys = pts.map((p) => p[1]);
  const [x0, y0, x1, y1] = bbox ?? [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)];
  const cx = (x0 + x1) / 2;
  const cy = (y0 + y1) / 2;
  const R = Math.hypot(x1 - x0, y1 - y0) / 2 + 4;
  const id = `h${++clipId}`;
  const lines = [];
  const pass = (ang) => {
    const a = (ang * Math.PI) / 180;
    const ux = Math.cos(a);
    const uy = Math.sin(a);
    for (let t = -R; t <= R; t += gap * rng.range(0.8, 1.2)) {
      const px = cx - uy * t;
      const py = cy + ux * t;
      lines.push(inkLine([[px - ux * R, py - uy * R], [px + ux * R, py + uy * R]], {
        rng, size: size * rng.range(0.75, 1.15), wobble, overshoot: 0, color, taper: true
      }));
    }
  };
  pass(angle);
  if (cross) pass(angle + 80);
  return `<clipPath id="${id}"><path d="${d}"/></clipPath><g clip-path="url(#${id})" opacity="${opacity}">${lines.join('')}</g>`;
}

// Dots of stipple inside a shape (tree shading, gravel, etc.).
export function stipple(shape, opts = {}) {
  const { rng = makeRng(6), count = 40, r = [0.8, 1.8], color = 'var(--ink)', opacity = 0.6 } = opts;
  const d = typeof shape === 'string' ? shape : polyD(shape);
  const pts = typeof shape === 'string' ? samplePath(shape, 6) : shape;
  const xs = pts.map((p) => p[0]);
  const ys = pts.map((p) => p[1]);
  const id = `s${++clipId}`;
  let dots = '';
  for (let i = 0; i < count; i++) {
    const x = rng.range(Math.min(...xs), Math.max(...xs));
    const y = rng.range(Math.min(...ys), Math.max(...ys));
    dots += `<ellipse cx="${fmt(x)}" cy="${fmt(y)}" rx="${fmt(rng.range(...r))}" ry="${fmt(rng.range(...r) * 0.8)}"/>`;
  }
  return `<clipPath id="${id}"><path d="${d}"/></clipPath><g clip-path="url(#${id})" fill="${color}" opacity="${opacity}">${dots}</g>`;
}

// ---------------------------------------------------------------- shapes

export function rectD(x, y, w, h) {
  return `M${x} ${y}H${x + w}V${y + h}H${x}Z`;
}

export function roundRectD(x, y, w, h, r) {
  return `M${x + r} ${y}H${x + w - r}Q${x + w} ${y} ${x + w} ${y + r}V${y + h - r}Q${x + w} ${y + h} ${x + w - r} ${y + h}H${x + r}Q${x} ${y + h} ${x} ${y + h - r}V${y + r}Q${x} ${y} ${x + r} ${y}Z`;
}

export function ellipseD(cx, cy, rx, ry = rx) {
  return `M${cx - rx} ${cy}A${rx} ${ry} 0 1 0 ${cx + rx} ${cy}A${rx} ${ry} 0 1 0 ${cx - rx} ${cy}Z`;
}

// Lumpy blob (clouds, tree crowns, bushes): circle with low-freq radius noise.
export function blobD(cx, cy, rx, ry, rng, lumps = 7, depth = 0.12) {
  const pts = [];
  const ph = Array.from({ length: 3 }, () => rng() * Math.PI * 2);
  const N = 120;
  for (let i = 0; i <= N; i++) {
    const a = (i / N) * Math.PI * 2;
    const k = 1 + depth * (Math.sin(a * lumps + ph[0]) * 0.6 + Math.sin(a * (lumps + 3) + ph[1]) * 0.3 + Math.sin(a * 2 + ph[2]) * 0.4);
    pts.push([cx + Math.cos(a) * rx * k, cy + Math.sin(a) * ry * k]);
  }
  return polyD(pts);
}

// Cumulus cloud: flat bottom, a row of puffs on top.
export function cloudD(x, y, w, h, rng) {
  const puffs = Math.max(3, Math.round(w / (h * 0.9)));
  let d = `M${x} ${y + h}`;
  let cx = x;
  const step = w / puffs;
  for (let i = 0; i < puffs; i++) {
    const r = step * rng.range(0.52, 0.72);
    const peak = y + h - (i === 0 || i === puffs - 1 ? h * 0.55 : h * rng.range(0.75, 1));
    d += `C${cx} ${peak} ${cx + step} ${peak} ${cx + step} ${y + h - r * 0.25}`;
    cx += step;
  }
  return d + 'Z';
}

// ---------------------------------------------------------------- defs

// Shared filters: `paper` adds grain and gouache-like mottling to fills,
// `lift` gives a cut-out a soft contact shadow so it reads as layered paper.
export function defs({ grain = 1.1, seed = 2, shadow = 0.22 } = {}) {
  return `<defs>
<filter id="paper" x="-10%" y="-10%" width="120%" height="120%" color-interpolation-filters="sRGB">
  <feTurbulence type="fractalNoise" baseFrequency="${grain}" numOctaves="3" seed="${seed}" result="fine"/>
  <feColorMatrix in="fine" type="matrix" values="0 0 0 0 0.18  0 0 0 0 0.13  0 0 0 0 0.08  0 0 0 -4 2.2" result="d1"/>
  <feComponentTransfer in="d1" result="dark"><feFuncA type="linear" slope="0.3"/></feComponentTransfer>
  <feColorMatrix in="fine" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 3 -1.75" result="l1"/>
  <feComponentTransfer in="l1" result="light"><feFuncA type="linear" slope="0.24"/></feComponentTransfer>
  <feTurbulence type="fractalNoise" baseFrequency="0.012 0.02" numOctaves="2" seed="${seed + 5}" result="coarse"/>
  <feColorMatrix in="coarse" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 -1.2 0.8" result="mottle"/>
  <feComposite in="dark" in2="SourceAlpha" operator="in" result="darkIn"/>
  <feComposite in="light" in2="SourceAlpha" operator="in" result="lightIn"/>
  <feComposite in="mottle" in2="SourceAlpha" operator="in" result="mottleIn"/>
  <feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="mottleIn"/><feMergeNode in="darkIn"/><feMergeNode in="lightIn"/></feMerge>
</filter>
<pattern id="pat-dots" width="9" height="9" patternUnits="userSpaceOnUse"><circle cx="2.5" cy="2.5" r="1.3" fill="#27233A"/><circle cx="7" cy="7" r="1.3" fill="#27233A"/></pattern>
<pattern id="pat-bigdots" width="16" height="16" patternUnits="userSpaceOnUse"><circle cx="4" cy="4" r="2.8" fill="#FBF8F1"/><circle cx="12" cy="12" r="2.8" fill="#FBF8F1"/></pattern>
<pattern id="pat-stripes" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(35)"><rect width="4.5" height="10" fill="#FBF8F1"/></pattern>
<pattern id="pat-pinstripe" width="7" height="7" patternUnits="userSpaceOnUse"><rect width="1.3" height="7" fill="#27233A"/></pattern>
<pattern id="pat-grid" width="12" height="12" patternUnits="userSpaceOnUse"><path d="M12 0H0V12" fill="none" stroke="#3D7BC4" stroke-width="0.9"/></pattern>
<pattern id="pat-ruled" width="14" height="14" patternUnits="userSpaceOnUse"><path d="M0 13H14" stroke="#3D7BC4" stroke-width="0.9"/></pattern>
<pattern id="pat-check" width="16" height="16" patternUnits="userSpaceOnUse"><rect width="8" height="8" fill="#FBF8F1"/><rect x="8" y="8" width="8" height="8" fill="#FBF8F1"/></pattern>
<pattern id="pat-news" width="120" height="11" patternUnits="userSpaceOnUse"><path d="M2 5H24M28 5H41M45 5H70M74 5H88M92 5H118" stroke="#27233A" stroke-width="2.2" stroke-dasharray="3 1 5 1 2 1 4 1"/></pattern>
<filter id="lift" x="-10%" y="-10%" width="125%" height="130%" color-interpolation-filters="sRGB">
  <feGaussianBlur in="SourceAlpha" stdDeviation="2.4" result="b"/>
  <feOffset dx="1.6" dy="3" result="o"/>
  <feColorMatrix in="o" type="matrix" values="0 0 0 0 0.16  0 0 0 0 0.12  0 0 0 0 0.2  0 0 0 ${shadow} 0" result="s"/>
  <feMerge><feMergeNode in="s"/><feMergeNode in="SourceGraphic"/></feMerge>
</filter>
<filter id="inkbleed" x="-5%" y="-5%" width="110%" height="110%">
  <feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="2" seed="${seed + 9}" result="t"/>
  <feDisplacementMap in="SourceGraphic" in2="t" scale="1.3" xChannelSelector="R" yChannelSelector="G"/>
</filter>
</defs>`;
}

export const PALETTE = {
  ink: '#27233A',
  cream: '#F7F0E2',
  paper: '#FBF8F1',
  butter: '#F4C95D',
  butterDeep: '#E7A93A',
  tomato: '#E4574B',
  tomatoDeep: '#C23F35',
  lavender: '#9E87CC',
  leaf: '#6FA86A',
  leafDeep: '#3F7A4F',
  sage: '#A9C9A0',
  civic: '#3D7BC4',
  civicDeep: '#27558F',
  sky: '#BFD9EE',
  blush: '#F3AFA4',
  kraft: '#CFA877',
  kraftDeep: '#A87F4E',
  mint: '#9FD3C7',
  night: '#1B2F52'
};

export function svgDoc(w, h, body, opts = {}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" style="--ink:${PALETTE.ink}">${defs(opts)}${body}</svg>`;
}

// Topographic contour lines clipped to a shape: map-paper scraps.
export function contours(shape, opts = {}) {
  const { rng = makeRng(8), cx, cy, rings = 9, step = 16, color = 'var(--ink)', opacity = 0.35, size = 1.2 } = opts;
  const d = typeof shape === 'string' ? shape : polyD(shape);
  const id = `c${++clipId}`;
  let lines = '';
  const ph = rng() * 10;
  for (let i = 1; i <= rings; i++) {
    const r = i * step;
    const loop = blobD(cx, cy, r * 1.5, r, makeRng(Math.floor(ph * 100) + i), 4, 0.16);
    lines += inkLine(loop, { rng, size, wobble: 0.8, closed: true, overshoot: 0 });
  }
  return `<clipPath id="${id}"><path d="${d}"/></clipPath><g clip-path="url(#${id})" opacity="${opacity}" fill="${color}">${lines}</g>`;
}
