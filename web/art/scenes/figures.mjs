// Lesson figures: teaching diagrams in the collage style, placed in lesson
// Markdown with a `:::figure fig-name | alt text` block (see
// scripts/markdown.mjs). Charts are hand-inked but drawn to scale: every bar,
// curve, and marker is computed from the numbers in its label.
//
// Legibility rules (npm run check enforces the first two):
// - Text must be at least 13px where the figure is shown. A figure is drawn
//   720 wide and shrinks to about 340px on a phone, so labels are 28 or
//   larger, and handwriting 35 or larger (its letters run about 80% as
//   tall). Side-by-side figures can instead return a `narrow` layout
//   (panels stacked, about 360-400 wide) that phones get in its place; then
//   the wide layout only needs 19 or larger (24 handwritten).
// - Every text uses one of three voices: `title` (Fraunces) for headings,
//   `label` (Figtree) for data (numbers, ticks, legends, names), and `note`
//   (Caveat) for the one or two handwritten remarks that make the point.
// - Text sits on flat colour: shapes under labels skip the paper grain.
//
// Lettering is baked in, so each figure's alt text in the lesson must say
// everything the figure says. The embedded fonts have no ≈, →, or σ, so
// labels spell those out ("about", drawn arrows, "SD").
import { svgDoc, cut, ink, inkLine, hatch, rectD, roundRectD, ellipseD, blobD, polyD, makeRng, PALETTE as P } from '../lib/draw.mjs';
import { house, block, person, sun, tape, sparkle, star } from '../lib/props.mjs';
import { hand, serif } from './spots.mjs';

const OFF = 'translate(-1.5,-1.1)';
const L = (s) => `<g transform="${OFF}">${s}</g>`;
const at = (x, y, s) => `<g transform="translate(${x} ${y})">${s}</g>`;
const fmtMoney = (n) => '$' + Math.round(n).toLocaleString('en-US');
const fmt = (v) => Math.round(v).toLocaleString('en-US');
const MUTED = '#5A5468';
const FLAT = 'none'; // `filter` value for paper that carries text

// Pale tints of the cut-paper colours, for panel backgrounds and bands.
const T = { sky: '#DCE9F5', butter: '#F8E4AE', kraft: '#EFE1C8', blush: '#F9D9D2', sage: '#DCEBD6', lav: '#E3DAF1', cream: P.cream };

// The three voices.
const title = (x, y, text, o = {}) => serif(x, y, text, { size: 28, ...o });
const note = (x, y, text, o = {}) => hand(x, y, text, { size: 35, color: P.civicDeep, ...o });
const label = (x, y, text, { size = 28, color = P.ink, anchor = 'middle', weight = 600 } = {}) =>
  `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="Figtree, sans-serif" font-weight="${weight}" font-size="${size}" fill="${color}">${text}</text>`;

// A drawn arrow from (x1,y1) to (x2,y2), optionally bowed by `bend` px.
function arrow(x1, y1, x2, y2, rng, { color = P.ink, size = 2.6, bend = 0, head = 13 } = {}) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const len = Math.hypot(x2 - x1, y2 - y1) || 1;
  const nx = -(y2 - y1) / len;
  const ny = (x2 - x1) / len;
  const cx = mx + nx * bend;
  const cy = my + ny * bend;
  let out = inkLine(`M${x1} ${y1}Q${cx} ${cy} ${x2} ${y2}`, { rng, size, color, overshoot: 0 });
  const a = Math.atan2(y2 - cy, x2 - cx);
  for (const s of [-1, 1]) {
    const b = a + Math.PI + s * 0.45;
    out += inkLine([[x2, y2], [x2 + Math.cos(b) * head, y2 + Math.sin(b) * head]], { rng, size, color, overshoot: 0 });
  }
  return out;
}

// A dashed ink line between two points.
function dashed(x1, y1, x2, y2, rng, { color = P.ink, size = 2, dash = 10, gap = 7 } = {}) {
  const len = Math.hypot(x2 - x1, y2 - y1);
  const ux = (x2 - x1) / len;
  const uy = (y2 - y1) / len;
  let out = '';
  for (let t = 0; t < len; t += dash + gap) {
    const e = Math.min(len, t + dash);
    out += inkLine([[x1 + ux * t, y1 + uy * t], [x1 + ux * e, y1 + uy * e]], { rng, size, color, overshoot: 0, wobble: 0.4, taper: false });
  }
  return out;
}

// A panel of cut card stock with an inked edge.
function panel(x, y, w, h, fill, rng, r = 14) {
  const d = roundRectD(x, y, w, h, r);
  return cut(d, { rng, fill, jitter: 1, filter: FLAT }) + L(ink(d, { rng, size: 2, wobble: 0.8 }));
}

// Plain label backing, so a label can sit across a line and stay readable.
const backing = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="#FFFDF8"/>`;

// ============================================================ Lesson 1.1

// A research design as a transit line: five stops, in order.
function researchRoute() {
  const rng = makeRng(1101);
  const W = 720;
  const H = 262;
  let b = '';
  const y = 128;
  const band = roundRectD(40, y - 11, 640, 22, 11);
  b += cut(band, { rng, fill: P.civic });
  b += L(ink(band, { rng, size: 2.2 }));
  const stops = [[80, ['Question']], [220, ['Unit of', 'analysis']], [360, ['Data', 'sources']], [500, ['Method']], [640, ['Limits']]];
  stops.forEach(([x, lines], i) => {
    const r = i === 0 ? 28 : 24;
    const d = ellipseD(x, y, r, r);
    b += cut(d, { rng, fill: i === 0 ? P.butter : P.paper, jitter: 0.5, filter: FLAT });
    b += L(ink(d, { rng, size: 3 }));
    b += title(x, y + 10, String(i + 1));
    lines.forEach((line, k) => { b += label(x, y + 66 + k * 32, line); });
  });
  b += note(34, 48, 'start here, not with the data', { color: P.tomatoDeep, anchor: 'start', rotate: -2 });
  b += L(arrow(118, 62, 96, 94, rng, { color: P.tomatoDeep, bend: -14 }));
  b += sparkle(662, 50, 11, { seed: 6 });
  b += star(612, 60, 8, { fill: P.butter, seed: 7 });
  return { W, H, b };
}

// Primary data (you collect it) beside secondary data (it already exists).
function primarySecondary() {
  const rng = makeRng(1102);
  const PW = 338;
  const PH = 362;
  const pro = (y, text) => note(22, y, text, { size: 26, anchor: 'start', color: P.leafDeep });
  const con = (y, text) => note(22, y, text, { size: 26, anchor: 'start', color: P.tomatoDeep });

  let left = panel(0, 0, PW, PH, T.sky, rng);
  left += title(22, 44, 'Primary data', { size: 27, anchor: 'start' });
  left += note(22, 74, 'you collect it for your question', { size: 25, anchor: 'start' });
  left += person(78, 254, 2, { coat: P.tomato, prop: 'clipboard', seed: 21 });
  const sheet = rectD(164, 102, 140, 150);
  left += cut(sheet, { rng, fill: P.paper, filter: FLAT, extra: ' transform="rotate(4 234 177)"' });
  let marks = ink(sheet, { rng, size: 2 });
  marks += label(234, 134, 'bikes', { size: 22 });
  const tally = (x0, y0, n) => {
    let s = '';
    for (let i = 0; i < Math.min(n, 4); i++) s += inkLine([[x0 + i * 9, y0], [x0 + i * 9 + 1, y0 + 24]], { rng, size: 2, overshoot: 0 });
    if (n >= 5) s += inkLine([[x0 - 4, y0 + 18], [x0 + 32, y0 + 6]], { rng, size: 2, overshoot: 0 });
    return s;
  };
  marks += tally(180, 152, 5) + tally(224, 152, 5) + tally(268, 152, 3);
  marks += tally(180, 194, 5) + tally(224, 194, 2);
  left += `<g transform="rotate(4 234 177)">${L(marks)}</g>`;
  left += tape(208, 90, 56, 18, -8, { seed: 4 });
  left += pro(306, '+ fits your exact question');
  left += con(338, '− costs time and money');

  let right = panel(0, 0, PW, PH, T.kraft, rng);
  right += title(22, 44, 'Secondary data', { size: 27, anchor: 'start' });
  right += note(22, 74, 'someone else collected it', { size: 25, anchor: 'start', color: P.kraftDeep });
  const books = [
    [44, 226, 250, 46, P.civic, 'CENSUS TABLES', -2],
    [56, 176, 240, 46, P.leaf, 'PERMIT RECORDS', 2],
    [36, 126, 250, 46, P.butter, 'CRASH DATABASE', -3],
  ];
  for (const [x, y, w, h, c, name, rot] of books) {
    const d = roundRectD(x, y, w, h, 5);
    right += `<g transform="rotate(${rot} ${x + w / 2} ${y + h / 2})">${cut(d, { rng, fill: c, filter: FLAT })}${L(ink(d, { rng, size: 2.2 }))}${label(x + w / 2, y + h / 2 + 7, name, { size: 19, weight: 700, color: c === P.butter ? P.ink : '#FFFFFF' })}</g>`;
  }
  right += pro(306, '+ fast and cheap');
  right += con(338, '− built for another purpose');

  return {
    W: 720, H: 390, b: at(14, 14, left) + at(368, 14, right),
    narrow: { W: 366, H: 752, b: at(14, 14, left) + at(14, 390, right) },
  };
}

// Everyone counted every ten years, versus a sample every year.
function censusVsAcs() {
  const rng = makeRng(1103);
  const W = 720;
  const H = 436;
  let b = '';
  const row = (top, heading, remark, picked) => {
    let s = title(24, top + 32, heading, { anchor: 'start' });
    s += label(24, top + 66, remark, { anchor: 'start', color: P.civicDeep, weight: 500 });
    const baseY = top + 158;
    for (let i = 0; i < 10; i++) {
      const x = 34 + i * 67;
      const on = picked === 'all' || picked.includes(i);
      const opts = on
        ? { seed: 300 + i, wall: [P.butter, P.sky, P.blush, P.sage][i % 4], roof: [P.tomato, P.civic, P.kraftDeep][i % 3], chimney: i % 3 === 0 }
        : { seed: 300 + i, wall: '#EFE7D6', roof: '#E3D6BE', door: '#E3D6BE', chimney: false };
      s += on ? house(x, baseY, 46, 66, opts) : `<g opacity="0.55">${house(x, baseY, 46, 66, opts)}</g>`;
      if (on) s += L(inkLine([[x + 12, baseY + 18], [x + 21, baseY + 28], [x + 38, baseY + 8]], { rng, size: 3.4, color: P.leafDeep, overshoot: 0 }));
    }
    return s;
  };
  b += row(6, 'Decennial census', 'everyone, every 10 years: the full count', 'all');
  b += L(inkLine([[24, 212], [696, 208]], { rng, size: 1.4, opacity: 0.5 }));
  b += row(218, 'American Community Survey (ACS)', 'a sample each year: estimates with a ± margin', [1, 4, 8]);
  return { W, H, b };
}

// Four ways to draw a sample from the same 24 people.
function samplingMethods() {
  const rng = makeRng(1104);
  const COLS = 6;
  const ROWS = 4;
  const SP = 40;
  const R = 11;
  const PW = 342;
  const PH = 262;
  const grid = (left = 71) => {
    const pts = [];
    for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) pts.push([left + c * SP, 112 + r * SP]);
    return pts;
  };
  const dots = (pts, chosen) => pts.map(([x, y], i) => {
    const on = chosen.includes(i);
    const d = ellipseD(x, y, R, R);
    return cut(d, { rng, fill: on ? P.tomato : P.paper, shadow: on, jitter: 0.4 }) + L(ink(d, { rng, size: on ? 2.4 : 1.6, opacity: on ? 1 : 0.7 }));
  }).join('');
  const head = (heading, sub) => title(20, 40, heading, { size: 24, anchor: 'start' }) + note(20, 70, sub, { size: 24, anchor: 'start' });

  const simple = panel(0, 0, PW, PH, T.cream, rng) + head('Simple random', 'everyone has an equal chance') + dots(grid(), [2, 7, 11, 14, 19, 22]);

  let strat = panel(0, 0, PW, PH, T.cream, rng) + head('Stratified', 'sample within each group');
  strat += cut(roundRectD(32, 112 - 19, 236, 38, 10), { rng, fill: P.sky, shadow: false, filter: FLAT });
  strat += cut(roundRectD(32, 112 + SP - 19, 236, 38 + 2 * SP, 10), { rng, fill: T.butter, shadow: false, filter: FLAT });
  strat += label(274, 119, 'renters', { size: 20, anchor: 'start' });
  strat += label(274, 119 + 2 * SP, 'owners', { size: 20, anchor: 'start' });
  strat += dots(grid(50), [1, 4, 8, 13, 17, 22]);

  let cluster = panel(0, 0, PW, PH, T.cream, rng) + head('Cluster', 'pick whole blocks, survey all');
  const g = grid();
  for (let br = 0; br < 2; br++) {
    for (let bc = 0; bc < 3; bc++) {
      const [x0, y0] = g[br * 2 * COLS + bc * 2];
      const d = roundRectD(x0 - 17, y0 - 17, SP + 34, SP + 34, 9);
      const chosen = (br === 0 && bc === 1) || (br === 1 && bc === 0);
      cluster += cut(d, { rng, fill: chosen ? T.blush : T.kraft, shadow: false, jitter: 0.8 });
      cluster += L(ink(d, { rng, size: 1.4, opacity: 0.7 }));
    }
  }
  cluster += dots(g, [2, 3, 8, 9, 12, 13, 18, 19]);

  let sys = panel(0, 0, PW, PH, T.cream, rng) + head('Systematic', 'every 4th, after a random start');
  sys += dots(g, [1, 5, 9, 13, 17, 21]);
  sys += label(g[1][0] + 18, g[1][1] - 16, 'start', { size: 20, anchor: 'start', color: P.tomatoDeep });

  const panels = [simple, strat, cluster, sys];
  const wide = [[12, 12], [366, 12], [12, 290], [366, 290]];
  return {
    W: 720, H: 564, b: panels.map((p, i) => at(...wide[i], p)).join(''),
    narrow: { W: 366, H: 1108, b: panels.map((p, i) => at(12, 12 + i * 274, p)).join('') },
  };
}

// Validity and reliability as three targets.
function validityTargets() {
  const rng = makeRng(1105);
  const kinds = [
    ['Neither', 'scattered and off target', 'scatter'],
    ['Reliable, not valid', 'consistent, but wrong', 'off'],
    ['Valid and reliable', 'consistent and on target', 'on'],
  ];
  const target = (cx, cy, R, kind) => {
    let s = '';
    for (const [k, fill] of [[1, P.paper], [0.755, P.blush], [0.51, P.paper], [0.265, P.tomato]]) {
      const d = ellipseD(cx, cy, R * k, R * k);
      s += cut(d, { rng, fill, shadow: k === 1, jitter: 0.6 });
      s += L(ink(d, { rng, size: 2 }));
    }
    const hits = [];
    const hr = makeRng(kind.length * 17 + 5);
    const u = R / 98;
    if (kind === 'scatter') {
      for (const [dx, dy] of [[-58, -40], [40, -62], [66, 30], [-20, 58], [-70, 18], [16, -18], [52, -12]]) hits.push([cx + dx * u, cy + dy * u]);
    } else {
      const [ox, oy] = kind === 'off' ? [44 * u, -44 * u] : [0, 0];
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2 + hr() * 0.8;
        const rr = (6 + hr() * 10) * u;
        hits.push([cx + ox + Math.cos(a) * rr, cy + oy + Math.sin(a) * rr]);
      }
    }
    for (const [x, y] of hits) s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(6 * Math.max(u, 0.8)).toFixed(1)}" fill="${P.ink}" stroke="${P.paper}" stroke-width="2"/>`;
    return s;
  };
  let wide = '';
  kinds.forEach(([heading, remark, kind], i) => {
    const cx = 122 + i * 238;
    wide += target(cx, 142, 98, kind);
    wide += title(cx, 288, heading, { size: 23 });
    wide += note(cx, 320, remark, { size: 25 });
  });
  let narrow = '';
  kinds.forEach(([heading, remark, kind], i) => {
    const cy = 82 + i * 150;
    narrow += target(78, cy, 64, kind);
    narrow += title(160, cy - 4, heading, { size: 23, anchor: 'start' });
    narrow += note(160, cy + 28, remark, { size: 23, anchor: 'start' });
  });
  return { W: 720, H: 340, b: wide, narrow: { W: 400, H: 460, b: narrow } };
}

// ============================================================ Lesson 1.2

// A right-skewed income distribution: the tail pulls the mean above the median.
function skewedIncome() {
  const rng = makeRng(1201);
  const W = 720;
  const H = 424;
  let b = '';
  // Illustrative shares of households by $25k income band; the last band is
  // $200k and up (its midpoint is taken as $300k for the mean).
  const shares = [14, 22, 20, 15, 10, 7, 5, 3, 4];
  const mids = [12.5, 37.5, 62.5, 87.5, 112.5, 137.5, 162.5, 187.5, 300];
  const total = shares.reduce((a, c) => a + c, 0);
  const mean = shares.reduce((a, s, i) => a + s * mids[i], 0) / total;
  let cum = 0;
  let median = 0;
  for (let i = 0; i < shares.length; i++) {
    if (cum + shares[i] >= total / 2) { median = i * 25 + ((total / 2 - cum) / shares[i]) * 25; break; }
    cum += shares[i];
  }
  const x0 = 60;
  const bw = 620 / shares.length;
  const base = 326;
  const top = 132;
  const max = Math.max(...shares);
  const xAt = (k) => x0 + (k / 25) * bw;
  shares.forEach((s, i) => {
    const h = (s / max) * (base - top);
    const d = rectD(x0 + i * bw + 3, base - h, bw - 6, h);
    const last = i === shares.length - 1;
    b += cut(d, { rng, fill: last ? P.kraft : P.butter, jitter: 0.8, pattern: last ? 'stripes' : undefined, patternOpacity: 0.5 });
    b += L(ink(d, { rng, size: 2 }));
  });
  b += L(inkLine([[x0 - 6, base], [x0 + 626, base]], { rng, size: 2.6, overshoot: 0 }));
  for (let k = 0; k <= 8; k += 2) {
    const x = x0 + k * bw;
    b += L(inkLine([[x, base], [x, base + 8]], { rng, size: 2, overshoot: 0 }));
    if (k < 8) b += label(x, base + 38, k === 0 ? '$0' : `$${k * 25}k`);
  }
  b += label(x0 + 8.5 * bw, base + 38, '$200k+', { size: 28 });
  b += label(360, base + 84, 'household income (illustrative)', { color: MUTED, weight: 500 });

  const mx = xAt(median);
  const ax = xAt(mean);
  b += L(dashed(mx, base, mx, 34, rng, { color: P.civicDeep, size: 2.8 }));
  b += L(dashed(ax, base, ax, 34, rng, { color: P.tomatoDeep, size: 2.8 }));
  b += label(mx - 12, 58, 'median', { anchor: 'end', color: P.civicDeep });
  b += label(mx - 12, 90, `about $${Math.round(median)}k`, { anchor: 'end', color: P.civicDeep });
  b += label(ax + 12, 58, 'mean', { anchor: 'start', color: P.tomatoDeep });
  b += label(ax + 12, 90, `about $${Math.round(mean)}k`, { anchor: 'start', color: P.tomatoDeep });
  const tx = x0 + 5.05 * bw;
  b += note(tx, 172, 'the long tail of', { anchor: 'start', color: P.tomatoDeep });
  b += note(tx, 206, 'high incomes pulls', { anchor: 'start', color: P.tomatoDeep });
  b += note(tx, 240, 'the mean up', { anchor: 'start', color: P.tomatoDeep });
  b += L(arrow(tx - 6, 188, ax + 12, 160, rng, { color: P.tomatoDeep, bend: 10, size: 2.4 }));
  return { W, H, b };
}

// The normal curve with the 68 / 95 / 99.7 rule.
function normalCurve() {
  const rng = makeRng(1202);
  const W = 720;
  const H = 466;
  let b = '';
  const cx = 360;
  const u = 91;
  const base = 290;
  const peak = 200;
  const f = (z) => Math.exp(-z * z / 2);
  const X = (z) => cx + z * u;
  const Y = (z) => base - peak * f(z);
  const area = (a, c) => {
    const pts = [[X(a), base]];
    for (let z = a; z <= c + 1e-9; z += 0.05) pts.push([X(z), Y(z)]);
    pts.push([X(c), base]);
    return polyD(pts);
  };
  b += cut(area(-3, 3), { rng, fill: T.sky, shadow: false, jitter: 0.3 });
  b += cut(area(-2, 2), { rng, fill: P.sky, shadow: false, jitter: 0.3 });
  b += cut(area(-1, 1), { rng, fill: '#7FB2DD', shadow: false, jitter: 0.3 });
  const curve = [];
  for (let z = -3.6; z <= 3.6 + 1e-9; z += 0.05) curve.push([X(z), Y(z)]);
  let lines = inkLine(curve, { rng, size: 3.2, overshoot: 0 });
  lines += inkLine([[X(-3.8), base], [X(3.8), base]], { rng, size: 2.4, overshoot: 0 });
  for (let k = -3; k <= 3; k++) {
    if (k !== 0) lines += inkLine([[X(k), base], [X(k), Y(k)]], { rng, size: 1.4, opacity: 0.8, overshoot: 0 });
    lines += inkLine([[X(k), base], [X(k), base + 8]], { rng, size: 2, overshoot: 0 });
  }
  lines += inkLine([[X(0), base], [X(0), Y(0)]], { rng, size: 1.8, overshoot: 0, color: P.tomatoDeep });
  b += L(lines);
  for (let k = -3; k <= 3; k++) b += label(X(k), base + 36, k === 0 ? 'mean' : `${k < 0 ? '−' : '+'}${Math.abs(k)} SD`);
  b += note(cx, 70, 'mean = median = mode', { color: P.tomatoDeep });
  for (const [k, text, y] of [[1, '68%', 366], [2, '95%', 404], [3, '99.7%', 442]]) {
    b += L(inkLine([[X(-k), y - 7], [X(-k), y], [X(k), y], [X(k), y - 7]], { rng, size: 2.2, overshoot: 0 }));
    const w = text.length * 17 + 22;
    b += backing(cx - w / 2, y - 20, w, 36);
    b += title(cx, y + 10, text);
  }
  return { W, H, b };
}

// Three scatterplots: strong positive, strong negative, and no relationship.
function correlations() {
  const pearson = (xs, ys) => {
    const n = xs.length;
    const mx = xs.reduce((a, c) => a + c, 0) / n;
    const my = ys.reduce((a, c) => a + c, 0) / n;
    let sxy = 0; let sxx = 0; let syy = 0;
    for (let i = 0; i < n; i++) { sxy += (xs[i] - mx) * (ys[i] - my); sxx += (xs[i] - mx) ** 2; syy += (ys[i] - my) ** 2; }
    return sxy / Math.sqrt(sxx * syy);
  };
  // Deterministic search for a seed whose sample r lands on the target.
  const sample = (target) => {
    for (let seed = 1; seed < 5000; seed++) {
      const rng = makeRng(seed * 7 + 3);
      const gauss = () => Math.sqrt(-2 * Math.log(rng() || 1e-9)) * Math.cos(2 * Math.PI * rng());
      const xs = []; const ys = [];
      for (let i = 0; i < 28; i++) {
        const x = gauss();
        xs.push(x);
        ys.push(target * x + Math.sqrt(1 - target * target) * gauss());
      }
      const r = pearson(xs, ys);
      if (Math.abs(r - target) < 0.004) return { xs, ys, r };
    }
    throw new Error('no sample for r=' + target);
  };
  const rng = makeRng(1203);
  const plots = [[0.9, P.civic, 'strong positive'], [-0.85, P.tomato, 'strong negative'], [0, P.lavender, 'no linear pattern']].map(([t, c, remark]) => ({ ...sample(t), color: c, remark }));
  const plot = ({ xs, ys, color }, px, py, pw, ph) => {
    let s = panel(px, py, pw, ph, T.cream, rng, 12);
    const ax0 = px + 24; const ax1 = px + pw - 18; const ay0 = py + 20; const ay1 = py + ph - 18;
    s += L(inkLine([[ax0, ay0], [ax0, ay1], [ax1, ay1]], { rng, size: 2.2, overshoot: 0 }));
    const lo = (a) => Math.min(...a); const hi = (a) => Math.max(...a);
    const sx = (x) => ax0 + 12 + ((x - lo(xs)) / (hi(xs) - lo(xs))) * (ax1 - ax0 - 24);
    const sy = (y) => ay1 - 12 - ((y - lo(ys)) / (hi(ys) - lo(ys))) * (ay1 - ay0 - 24);
    xs.forEach((x, i) => { s += `<circle cx="${sx(x).toFixed(1)}" cy="${sy(ys[i]).toFixed(1)}" r="5.2" fill="${color}" stroke="${P.ink}" stroke-width="1.6"/>`; });
    return s;
  };
  const shown = (r) => (Math.abs(r) < 0.005 ? '0.00' : (r > 0 ? '+' : '−') + Math.abs(r).toFixed(2));
  let wide = '';
  plots.forEach((p, i) => {
    const px = 16 + i * 236;
    wide += plot(p, px, 12, 216, 222);
    wide += label(px + 108, 274, `r = ${shown(p.r)}`, { size: 26, weight: 700 });
    wide += note(px + 108, 306, p.remark, { size: 25 });
  });
  let narrow = '';
  plots.forEach((p, i) => {
    const py = 12 + i * 186;
    narrow += plot(p, 12, py, 170, 170);
    narrow += label(200, py + 78, `r = ${shown(p.r)}`, { size: 26, weight: 700, anchor: 'start' });
    narrow += note(200, py + 110, p.remark, { size: 25, anchor: 'start' });
  });
  return { W: 720, H: 330, b: wide, narrow: { W: 380, H: 572, b: narrow } };
}

// Hot weather drives both ice cream sales and drownings.
function confounder() {
  const rng = makeRng(1204);
  const W = 720;
  const H = 392;
  let b = '';
  b += sun(250, 88, 42, { seed: 12 });
  b += title(340, 80, 'Hot weather', { anchor: 'start' });
  b += note(340, 118, 'the confounding variable', { anchor: 'start', color: P.tomatoDeep });

  const cone = polyD([[104, 222], [156, 222], [130, 300]]);
  b += cut(cone, { rng, fill: P.kraft });
  b += hatch(cone, { rng, angle: 45, gap: 9, cross: true, opacity: 0.5, size: 1.1 });
  b += L(ink(cone, { rng, size: 2.4 }));
  const scoop = blobD(130, 206, 34, 26, makeRng(4), 6, 0.1);
  b += cut(scoop, { rng, fill: P.blush });
  b += L(ink(scoop, { rng, size: 2.4 }));
  b += label(130, 340, 'Ice cream');
  b += label(130, 372, 'sales');

  const water = blobD(590, 286, 86, 22, makeRng(5), 5, 0.08);
  b += cut(water, { rng, fill: P.sky, shadow: false });
  b += L(ink('M522 282q10 -8 20 0t20 0M600 294q10 -8 20 0t20 0', { rng, size: 1.8, color: P.civicDeep }));
  const ringO = ellipseD(590, 244, 40, 40);
  const ringI = ellipseD(590, 244, 20, 20);
  b += cut(ringO, { rng, fill: P.tomato });
  for (let i = 0; i < 4; i++) {
    const a = (i * Math.PI) / 2 + Math.PI / 4;
    const seg = polyD([
      [590 + Math.cos(a - 0.3) * 21, 244 + Math.sin(a - 0.3) * 21], [590 + Math.cos(a - 0.3) * 39, 244 + Math.sin(a - 0.3) * 39],
      [590 + Math.cos(a + 0.3) * 39, 244 + Math.sin(a + 0.3) * 39], [590 + Math.cos(a + 0.3) * 21, 244 + Math.sin(a + 0.3) * 21],
    ]);
    b += cut(seg, { rng, fill: P.paper, shadow: false, jitter: 0.3 });
  }
  b += `<circle cx="590" cy="244" r="20" fill="${P.sky}"/>`;
  b += L(ink(ringO, { rng, size: 2.4 }) + ink(ringI, { rng, size: 2 }));
  b += label(590, 346, 'Drownings');

  b += L(arrow(214, 126, 160, 180, rng, { size: 3, bend: 12 }));
  b += L(arrow(292, 130, 540, 196, rng, { size: 3, bend: -14 }));
  b += L(dashed(196, 262, 520, 262, rng, { size: 2, color: P.civicDeep }));
  b += note(358, 300, 'they rise together,');
  b += note(358, 336, 'but neither causes');
  b += note(358, 372, 'the other');
  return { W, H, b };
}

// Two ACS estimates whose confidence intervals overlap.
function overlappingIntervals() {
  const rng = makeRng(1205);
  const W = 720;
  const H = 316;
  let b = '';
  const x0 = 60;
  const per = 600 / 35;
  const X = (v) => x0 + v * per;
  const tracts = [['Tract A', 18, 6, 116, P.sky], ['Tract B', 22, 7, 196, T.lav]];
  const lo = Math.max(...tracts.map(([, e, m]) => e - m));
  const hi = Math.min(...tracts.map(([, e, m]) => e + m));
  const band = rectD(X(lo), 62, X(hi) - X(lo), 172);
  b += cut(band, { rng, fill: T.butter, shadow: false, jitter: 0.6, filter: FLAT });
  b += hatch(band, { rng, angle: -50, gap: 10, opacity: 0.22, size: 1.1 });
  b += note((X(lo) + X(hi)) / 2, 46, 'overlap: can’t call them different', { color: P.tomatoDeep });
  for (const [name, est, moe, y, fill] of tracts) {
    const d = roundRectD(X(est - moe), y - 14, X(est + moe) - X(est - moe), 28, 6);
    b += cut(d, { rng, fill, filter: FLAT });
    b += L(ink(d, { rng, size: 2.2 }));
    b += L(inkLine([[X(est), y - 22], [X(est), y + 22]], { rng, size: 3.4, overshoot: 0 }));
    b += label(X(est - moe) - 12, y + 10, name, { anchor: 'end' });
    b += label(X(est + moe) + 12, y + 10, `${est}% ± ${moe}`, { anchor: 'start' });
  }
  const ay = 252;
  b += L(inkLine([[x0 - 4, ay], [X(35) + 4, ay]], { rng, size: 2.4, overshoot: 0 }));
  for (let v = 0; v <= 35; v += 5) {
    b += L(inkLine([[X(v), ay], [X(v), ay + 8]], { rng, size: 2, overshoot: 0 }));
    b += label(X(v), ay + 40, `${v}%`);
  }
  return { W, H, b };
}

// What $10,000 is worth today, by discount rate and by how far away it is.
function discounting() {
  const rng = makeRng(1206);
  const FV = 10000;
  const rates = [[0.03, P.leaf, '3%'], [0.05, P.butter, '5%'], [0.07, P.tomato, '7%']];
  // One group of three bars, drawn with its baseline at y = base.
  const group = (t, gx, base, full, barW, step, name, valueSize) => {
    let s = '';
    const topY = base - full;
    s += L(dashed(gx - 10, topY, gx + 2 * step + barW + 10, topY, rng, { size: 1.8, color: P.civicDeep }));
    rates.forEach(([r, fill, rl], i) => {
      const pv = FV / (1 + r) ** t;
      const h = (pv / FV) * full;
      const x = gx + i * step;
      const d = rectD(x, base - h, barW, h);
      s += cut(d, { rng, fill, jitter: 0.8 });
      s += L(ink(d, { rng, size: 2.2 }));
      const vy = base - h - 10;
      s += (vy < topY + 18 ? backing(x - 8, vy - 24, barW + 16, 30) : '') + label(x + barW / 2, vy, fmtMoney(pv), { size: valueSize });
      s += label(x + barW / 2, base + 32, rl, { size: 26 });
    });
    s += L(inkLine([[gx - 16, base], [gx + 2 * step + barW + 16, base]], { rng, size: 2.4, overshoot: 0 }));
    s += title(gx + step + barW / 2, base + 72, name, { size: 24 });
    return s;
  };
  let wide = note(40, 40, 'What $10,000 is worth today', { size: 30, anchor: 'start', color: P.ink });
  wide += note(690, 88, '$10,000 when it arrives', { size: 24, anchor: 'end' });
  wide += group(2, 96, 326, 230, 74, 90, 'Paid in 2 years', 22);
  wide += group(30, 416, 326, 230, 74, 90, 'Paid in 30 years', 22);
  wide += label(40, 358, 'rate', { size: 22, anchor: 'start', color: MUTED });

  let narrow = note(20, 40, 'What $10,000 is worth today', { size: 28, anchor: 'start', color: P.ink });
  narrow += note(370, 76, '$10,000 when it arrives', { size: 22, anchor: 'end' });
  narrow += group(2, 50, 250, 150, 84, 110, 'Paid in 2 years', 22);
  narrow += group(30, 50, 540, 150, 84, 110, 'Paid in 30 years', 22);
  return { W: 720, H: 420, b: wide, narrow: { W: 390, H: 636, b: narrow } };
}

// ============================================================ Lesson 1.3

// A population pyramid: each cohort moves up an age band per step, shaped
// by births, deaths, and migration.
function populationPyramid() {
  const rng = makeRng(1301);
  const W = 720;
  const H = 512;
  let b = '';
  // Illustrative thousands of residents by 10-year age band, youngest first.
  const bands = ['0–9', '10–19', '20–29', '30–39', '40–49', '50–59', '60–69', '70–79', '80+'];
  const men = [6.1, 6.4, 6.8, 7.0, 6.5, 6.2, 5.4, 3.6, 1.8];
  const women = [5.8, 6.2, 6.7, 6.9, 6.6, 6.4, 5.8, 4.2, 2.6];
  const cx = 360;
  const gapHalf = 48;
  const unit = 150 / 7;
  const barH = 30;
  const rowY = (i) => 384 - i * 36;
  bands.forEach((band, i) => {
    const y = rowY(i);
    const hi = i === 2;
    const dl = rectD(cx - gapHalf - men[i] * unit, y, men[i] * unit, barH);
    const dr = rectD(cx + gapHalf, y, women[i] * unit, barH);
    b += cut(dl, { rng, fill: hi ? P.tomato : P.sky, jitter: 0.6 }) + cut(dr, { rng, fill: hi ? P.tomato : P.butter, jitter: 0.6 });
    b += L(ink(dl, { rng, size: 1.8 }) + ink(dr, { rng, size: 1.8 }));
    b += label(cx, y + 25, band);
  });
  const y3 = rowY(3);
  const box = (xa, xb) => {
    const [l, r] = [Math.min(xa, xb) - 5, Math.max(xa, xb) + 5];
    const o = { color: P.tomatoDeep, size: 2.2, dash: 8, gap: 6 };
    return dashed(l, y3 - 4, r, y3 - 4, rng, o) + dashed(r, y3 - 4, r, y3 + barH + 4, rng, o) + dashed(r, y3 + barH + 4, l, y3 + barH + 4, rng, o) + dashed(l, y3 + barH + 4, l, y3 - 4, rng, o);
  };
  b += L(box(cx + gapHalf, cx + gapHalf + women[3] * unit) + box(cx - gapHalf, cx - gapHalf - men[3] * unit));
  const ex = cx + gapHalf + women[2] * unit + 14;
  b += L(arrow(ex, rowY(2) + 16, ex + 2, rowY(3) + 12, rng, { color: P.tomatoDeep, bend: -22, size: 2.6, head: 11 }));
  b += note(ex + 24, rowY(3) + 32, '10 years', { anchor: 'start', color: P.tomatoDeep });
  b += note(ex + 24, rowY(3) + 60, 'later', { anchor: 'start', color: P.tomatoDeep });

  const bottom = rowY(0) + barH;
  b += title(cx - gapHalf - 6, bottom + 36, 'Men', { anchor: 'end' });
  b += title(cx + gapHalf + 6, bottom + 36, 'Women', { anchor: 'start' });
  b += note(16, 40, 'deaths thin out', { anchor: 'start' });
  b += note(16, 74, 'the older cohorts', { anchor: 'start' });
  b += L(arrow(262, 70, cx - gapHalf - men[8] * unit - 8, rowY(8) + 20, rng, { color: P.civicDeep, bend: -8, size: 2.2, head: 10 }));
  b += note(704, 40, 'migration adds or', { anchor: 'end' });
  b += note(704, 74, 'removes people', { anchor: 'end' });
  b += L(arrow(560, 84, cx + gapHalf + women[7] * unit + 10, rowY(7) + 16, rng, { color: P.civicDeep, bend: 10, size: 2.2, head: 10 }));
  b += note(cx, bottom + 94, 'births add a new youngest cohort');
  b += L(arrow(cx, bottom + 60, cx, bottom + 8, rng, { color: P.civicDeep, size: 2.2, head: 10 }));
  return { W, H, b };
}

// Linear versus geometric projection of the lesson's example town.
function projections() {
  const rng = makeRng(1302);
  const W = 720;
  const H = 420;
  let b = '';
  const x0 = 100;
  const x1 = 500;
  const yB = 326;
  const yT = 60;
  const vMin = 15000;
  const vMax = 45000;
  const X = (i) => x0 + (i / 4) * (x1 - x0);
  const Y = (v) => yB - ((v - vMin) / (vMax - vMin)) * (yB - yT);
  const linear = [20000, 24000, 28000, 32000, 36000];
  const geo = [20000, 24000];
  while (geo.length < 5) geo.push(geo[geo.length - 1] * 1.2);
  for (const v of [20000, 30000, 40000]) {
    b += L(inkLine([[x0, Y(v)], [x1 + 10, Y(v)]], { rng, size: 1, opacity: 0.35, overshoot: 0 }));
    b += label(x0 - 14, Y(v) + 10, `${v / 1000}k`, { anchor: 'end' });
  }
  b += L(inkLine([[x0, yT - 10], [x0, yB], [x1 + 14, yB]], { rng, size: 2.4, overshoot: 0 }));
  ['−10', 'today', '+10', '+20', '+30'].forEach((t, i) => {
    b += L(inkLine([[X(i), yB], [X(i), yB + 8]], { rng, size: 2, overshoot: 0 }));
    b += label(X(i), yB + 40, t);
  });
  b += label((x0 + x1) / 2, yB + 82, 'years from today', { color: MUTED, weight: 500 });
  let lines = inkLine([[X(0), Y(20000)], [X(1), Y(24000)]], { rng, size: 3.2, overshoot: 0 });
  for (let i = 1; i < 4; i++) {
    lines += dashed(X(i), Y(linear[i]), X(i + 1), Y(linear[i + 1]), rng, { color: P.civicDeep, size: 3 });
    lines += dashed(X(i), Y(geo[i]), X(i + 1), Y(geo[i + 1]), rng, { color: P.tomatoDeep, size: 3 });
  }
  b += L(lines);
  const dot = (x, y, c) => `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="7" fill="${c}" stroke="${P.ink}" stroke-width="2"/>`;
  b += dot(X(0), Y(20000), P.paper) + dot(X(1), Y(24000), P.paper);
  for (let i = 2; i < 5; i++) b += dot(X(i), Y(linear[i]), P.civic) + dot(X(i), Y(geo[i]), P.tomato);
  b += label(X(4) + 18, Y(geo[4]) - 6, 'geometric', { anchor: 'start', color: P.tomatoDeep, weight: 500 });
  b += label(X(4) + 18, Y(geo[4]) + 26, fmt(geo[4]), { anchor: 'start', color: P.tomatoDeep });
  b += label(X(4) + 18, Y(linear[4]) + 14, 'linear', { anchor: 'start', color: P.civicDeep, weight: 500 });
  b += label(X(4) + 18, Y(linear[4]) + 46, fmt(linear[4]), { anchor: 'start', color: P.civicDeep });
  b += label(X(2), Y(geo[2]) - 18, fmt(geo[2]), { color: P.tomatoDeep });
  b += label(X(2) + 4, Y(linear[2]) + 40, fmt(linear[2]), { color: P.civicDeep });
  b += label(X(0) + 12, Y(20000) + 34, '20,000', { anchor: 'start' });
  b += label(X(1), Y(24000) - 18, '24,000');
  b += label(x0 + 4, 38, 'population', { anchor: 'start', color: MUTED, weight: 500 });
  return { W, H, b };
}

// The housing-unit method as a row of cards.
function housingUnitMethod() {
  const rng = makeRng(1303);
  const W = 720;
  const H = 304;
  let b = '';
  const cards = [
    ['500', ['new', 'homes'], P.butter],
    ['96%', ['occupied'], P.sky],
    ['2.4', ['people', 'per home'], P.blush],
    [fmt(500 * 0.96 * 2.4), ['new', 'residents'], P.sage],
  ];
  const w = 150;
  const xs = [8, 188, 368, 556];
  cards.forEach(([num, lines, fill], i) => {
    const x = xs[i];
    const d = roundRectD(x, 30, w, 166, 12);
    let s = cut(d, { rng, fill, filter: FLAT }) + L(ink(d, { rng, size: 2.2 })) + title(x + w / 2, 100, num, { size: 42 });
    lines.forEach((line, k) => { s += label(x + w / 2, 144 + k * 32, line); });
    b += `<g transform="rotate(${[-2, 1.5, -1, 2][i]} ${x + w / 2} 113)">${s}</g>`;
  });
  b += title(173, 124, '×', { size: 38 }) + title(353, 124, '×', { size: 38 }) + title(537, 124, '=', { size: 38 });
  b += tape(598, 16, 76, 22, 6, { seed: 5 });
  b += note(360, 250, 'then add people in group quarters');
  b += note(360, 286, '(dorms, nursing homes)');
  return { W, H, b };
}

// A location quotient as two waffle charts and a number line.
function locationQuotient() {
  const rng = makeRng(1304);
  const W = 720;
  const H = 468;
  let b = '';
  const waffle = (x, y, n) => {
    let s = '';
    for (let i = 0; i < 100; i++) {
      const on = i >= 100 - n;
      s += `<rect x="${x + (i % 10) * 20}" y="${y + Math.floor(i / 10) * 20}" width="16" height="16" rx="3" fill="${on ? P.tomato : '#EFE7D6'}" stroke="${on ? P.ink : '#CDBEA2'}" stroke-width="${on ? 1.6 : 1}"/>`;
    }
    return s;
  };
  for (const [x, heading, sub, n] of [[30, 'This county', '6 per 100 jobs', 6], [284, 'The nation', '3 per 100 jobs', 3]]) {
    b += title(x, 40, heading, { anchor: 'start' });
    b += label(x, 74, sub, { anchor: 'start', color: P.civicDeep, weight: 500 });
    b += waffle(x, 92, n);
  }
  b += label(614, 110, 'manufacturing', { color: P.tomatoDeep, weight: 500 });
  b += label(614, 142, 'share of jobs', { color: P.tomatoDeep, weight: 500 });
  b += title(614, 204, '6% ÷ 3%', { size: 30 });
  b += title(614, 256, 'LQ = 2.0', { size: 36, color: P.tomatoDeep });
  const lx0 = 60;
  const lx1 = 660;
  const LX = (v) => lx0 + (v / 3) * (lx1 - lx0);
  const ly = 362;
  b += cut(rectD(LX(0), ly - 14, LX(1) - LX(0), 28), { rng, fill: P.sky, shadow: false });
  b += cut(rectD(LX(1), ly - 14, LX(3) - LX(1), 28), { rng, fill: T.butter, shadow: false });
  b += L(ink(rectD(LX(0), ly - 14, LX(3) - LX(0), 28), { rng, size: 1.8 }));
  for (const v of [0, 1, 2, 3]) b += label(LX(v), ly + 46, v.toFixed(1));
  b += L(inkLine([[LX(1), ly - 22], [LX(1), ly + 20]], { rng, size: 3, overshoot: 0 }));
  b += label(LX(0.4), ly - 26, 'below 1.0: imports', { color: P.civicDeep, weight: 500 });
  b += label(LX(2.1), ly - 26, 'above 1.0: likely exports', { color: P.kraftDeep, weight: 500 });
  b += `<path d="M${LX(2)} ${ly + 10}L${LX(2) - 12} ${ly - 13}H${LX(2) + 12}Z" fill="${P.tomato}" stroke="${P.ink}" stroke-width="2"/>`;
  b += note(LX(2), ly + 90, 'this county', { color: P.tomatoDeep });
  return { W, H, b };
}

// Shift-share: one industry's local job growth, split three ways.
function shiftShare() {
  const rng = makeRng(1305);
  const W = 720;
  const H = 300;
  let b = '';
  const base = 1000;
  const nat = base * 0.05;
  const mix = base * (0.12 - 0.05);
  const actual = 150;
  const local = actual - nat - mix;
  const px = 600 / actual;
  b += note(60, 44, `${actual} new jobs in one local industry`, { anchor: 'start', color: P.ink });
  let x = 60;
  for (const [v, name, how, fill] of [[nat, 'national growth', '1,000 × 5%', P.sky], [mix, 'industry mix', '1,000 × (12% − 5%)', P.butter], [local, 'local share', 'the rest', P.sage]]) {
    const w = v * px;
    const d = rectD(x, 122, w, 58);
    b += cut(d, { rng, fill, jitter: 0.8, filter: FLAT });
    b += L(ink(d, { rng, size: 2.2 }));
    b += title(x + w / 2, 162, String(Math.round(v)), { size: 30 });
    b += label(x + w / 2, 106, name, { color: P.civicDeep, weight: 500 });
    b += label(x + w / 2, 224, how);
    x += w;
  }
  b += note(360, 282, 'a positive local share: a competitive edge', { color: P.leafDeep });
  return { W, H, b };
}

// ============================================================ Lesson 1.4

// The same patch of town as vector features and as a raster surface.
function vectorRaster() {
  const rng = makeRng(1401);
  const PW = 340;
  const PH = 376;
  let left = panel(0, 0, PW, PH, T.cream, rng);
  left += title(20, 38, 'Vector', { size: 26, anchor: 'start' });
  left += note(20, 68, 'points, lines, and polygons', { size: 24, anchor: 'start' });
  for (const [x, y, w, h] of [[32, 88, 88, 62], [128, 88, 88, 62], [224, 88, 88, 62], [32, 230, 130, 62], [170, 230, 142, 62]]) {
    const d = rectD(x, y, w, h);
    left += cut(d, { rng, fill: P.butter, shadow: false, jitter: 0.8, filter: FLAT });
    left += L(ink(d, { rng, size: 1.8 }));
  }
  left += L(inkLine([[24, 186], [318, 186]], { rng, size: 5, overshoot: 0, color: MUTED }));
  left += L(inkLine('M28 332C98 306 158 348 228 318S308 304 320 310', { rng, size: 3.4, color: P.civic, overshoot: 0 }));
  for (const px of [80, 188, 288]) left += `<circle cx="${px}" cy="186" r="7.5" fill="${P.tomato}" stroke="${P.ink}" stroke-width="2"/>`;
  left += label(76, 128, 'polygon', { size: 21 });
  left += label(80, 220, 'point', { size: 21, color: P.tomatoDeep });
  left += label(240, 176, 'line', { size: 21, color: MUTED });
  left += label(312, 358, 'line', { size: 21, anchor: 'end', color: P.civicDeep });

  let right = panel(0, 0, PW, PH, T.cream, rng);
  right += title(20, 38, 'Raster', { size: 26, anchor: 'start' });
  right += note(20, 68, 'a grid of cells, each a value', { size: 24, anchor: 'start' });
  const n = 10;
  const cell = 26;
  const gx = 40;
  const gy = 84;
  const ramp = ['#EAF2DD', '#D4E6C2', '#B9D3A2', '#9DBE86', '#C9B07F', '#AE8E5C'];
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      const u = c / (n - 1);
      const v = r / (n - 1);
      const z = Math.exp(-((u - 0.7) ** 2 + (v - 0.3) ** 2) / 0.12) + 0.45 * Math.exp(-((u - 0.2) ** 2 + (v - 0.8) ** 2) / 0.08);
      const k = Math.max(0, Math.min(ramp.length - 1, Math.floor(z * ramp.length)));
      right += `<rect x="${gx + c * cell}" y="${gy + r * cell}" width="${cell}" height="${cell}" fill="${ramp[k]}" stroke="#FFFDF8" stroke-width="1.2"/>`;
    }
  }
  right += L(ink(rectD(gx, gy, n * cell, n * cell), { rng, size: 2 }));
  right += label(PW / 2, 366, 'darker cells: higher ground', { size: 21, color: P.kraftDeep });

  return {
    W: 720, H: 400, b: at(12, 12, left) + at(368, 12, right),
    narrow: { W: 364, H: 776, b: at(12, 12, left) + at(12, 400, right) },
  };
}

// A half-mile circle versus a half-mile walk along the actual streets.
function walkshed() {
  const rng = makeRng(1402);
  const W = 720;
  const H = 520;
  let b = '';
  const R = 170;
  const S = [360, 230];
  const nodes = new Map();
  const edges = [];
  const key = (p) => `${p[0]},${p[1]}`;
  const addEdge = (a, c) => {
    nodes.set(key(a), a); nodes.set(key(c), c);
    edges.push([key(a), key(c), Math.hypot(c[0] - a[0], c[1] - a[1])]);
  };
  // West: a connected street grid.
  const gxs = [40, 104, 168, 232, 296, 360];
  const gys = [50, 110, 170, 230, 290, 350, 410];
  for (const y of gys) for (let i = 0; i < gxs.length - 1; i++) addEdge([gxs[i], y], [gxs[i + 1], y]);
  for (const x of gxs) for (let j = 0; j < gys.length - 1; j++) addEdge([x, gys[j]], [x, gys[j + 1]]);
  // East: one collector looping away from the station, with cul-de-sacs.
  const loop = [[360, 230], [420, 230], [420, 410], [680, 410], [680, 50], [420, 50], [420, 110]];
  for (let i = 0; i < loop.length - 1; i++) addEdge(loop[i], loop[i + 1]);
  const culs = [[[680, 170], [520, 170]], [[680, 290], [520, 290]], [[500, 410], [500, 330]], [[600, 410], [600, 330]], [[520, 50], [520, 110]], [[600, 50], [600, 110]]];
  for (const [a, c] of culs) addEdge(a, c);
  // Split the collector where the cul-de-sacs join it.
  const splitAt = (a, c, p) => {
    const i = edges.findIndex(([x, y]) => (x === key(a) && y === key(c)) || (x === key(c) && y === key(a)));
    if (i >= 0) edges.splice(i, 1);
    addEdge(a, p); addEdge(p, c);
  };
  splitAt([680, 410], [680, 50], [680, 290]);
  splitAt([680, 290], [680, 50], [680, 170]);
  splitAt([420, 410], [680, 410], [500, 410]);
  splitAt([500, 410], [680, 410], [600, 410]);
  splitAt([680, 50], [420, 50], [600, 50]);
  splitAt([600, 50], [420, 50], [520, 50]);
  const g = new Map();
  for (const [a, c, l] of edges) {
    if (!g.has(a)) g.set(a, []);
    if (!g.has(c)) g.set(c, []);
    g.get(a).push([c, l]);
    g.get(c).push([a, l]);
  }
  const dist = new Map([[key(S), 0]]);
  const todo = [key(S)];
  while (todo.length) {
    todo.sort((p, q) => dist.get(p) - dist.get(q));
    const u = todo.shift();
    for (const [v, l] of g.get(u) || []) {
      const d = dist.get(u) + l;
      if (d < (dist.get(v) ?? Infinity)) { dist.set(v, d); todo.push(v); }
    }
  }
  let streets = '';
  let walk = '';
  for (const [a, c, l] of edges) {
    const A = nodes.get(a);
    const C = nodes.get(c);
    streets += `<line x1="${A[0]}" y1="${A[1]}" x2="${C[0]}" y2="${C[1]}" stroke="#D9CCB3" stroke-width="11" stroke-linecap="round"/>`;
    for (const [from, P0, P1] of [[a, A, C], [c, C, A]]) {
      const d0 = dist.get(from) ?? Infinity;
      if (d0 >= R) continue;
      const reach = Math.min(1, (R - d0) / l);
      const e = [P0[0] + (P1[0] - P0[0]) * reach, P0[1] + (P1[1] - P0[1]) * reach];
      walk += `<line x1="${P0[0]}" y1="${P0[1]}" x2="${e[0].toFixed(1)}" y2="${e[1].toFixed(1)}" stroke="${P.tomato}" stroke-width="8" stroke-linecap="round"/>`;
    }
  }
  b += streets;
  for (const [, c] of culs) b += `<circle cx="${c[0]}" cy="${c[1]}" r="11" fill="#D9CCB3"/>`;
  b += walk;
  b += L(inkLine(ellipseD(S[0], S[1], R, R), { rng, size: 3.4, color: P.civicDeep, closed: true, overshoot: 0 }));
  const sign = roundRectD(S[0] - 20, S[1] - 20, 40, 40, 7);
  b += cut(sign, { rng, fill: P.butter, filter: FLAT }) + L(ink(sign, { rng, size: 2.2 })) + label(S[0], S[1] + 10, 'T', { weight: 800 });
  b += note(538, 222, 'close by air', { anchor: 'start', color: MUTED });
  b += note(538, 258, 'far on foot', { anchor: 'start', color: MUTED });
  b += `<line x1="40" y1="460" x2="84" y2="460" stroke="${P.tomato}" stroke-width="8" stroke-linecap="round"/>`;
  b += label(100, 470, 'streets within a half-mile walk', { anchor: 'start' });
  b += L(inkLine([[40, 500], [84, 500]], { rng, size: 3.4, color: P.civicDeep, overshoot: 0 }));
  b += label(100, 510, 'half-mile circle', { anchor: 'start', color: P.civicDeep });
  return { W, H: H + 10, b };
}

// McHarg's overlay: stack the constraint layers, and the darkest spots are
// where building would do the most harm.
function mchargOverlay() {
  const rng = makeRng(1403);
  const W = 720;
  const H = 440;
  let b = '';
  const blob = (cu, cv, ru, rv, seed) => {
    const r = makeRng(seed);
    const ph = r() * 6;
    const pts = [];
    for (let i = 0; i < 40; i++) {
      const a = (i / 40) * Math.PI * 2;
      const k = 1 + 0.14 * Math.sin(a * 3 + ph) + 0.08 * Math.sin(a * 5 + ph * 2);
      pts.push([cu + Math.cos(a) * ru * k, cv + Math.sin(a) * rv * k]);
    }
    return pts;
  };
  const layers = [
    ['steep slopes', P.kraftDeep, [blob(0.72, 0.35, 0.22, 0.26, 3), blob(0.2, 0.2, 0.12, 0.14, 4)]],
    ['wet soils', P.civic, [blob(0.35, 0.7, 0.28, 0.18, 5), blob(0.66, 0.5, 0.14, 0.16, 6)]],
    ['habitat', P.leafDeep, [blob(0.55, 0.45, 0.22, 0.2, 7), blob(0.18, 0.72, 0.12, 0.14, 8)]],
  ];
  const sheet = (x0, y0, w, h, s) => ([u, v]) => [x0 + u * w + (1 - v) * s, y0 + v * h];
  layers.forEach(([name, color, patches], i) => {
    const T0 = sheet(20, 36 + i * 118, 250, 86, 50);
    const corners = [[0, 0], [1, 0], [1, 1], [0, 1]].map(T0);
    b += cut(polyD(corners), { rng, fill: '#FBF8F1', jitter: 0.6 });
    for (const p of patches) b += `<path d="${polyD(p.map(T0))}" fill="${color}" opacity="0.6"/>`;
    b += L(ink(polyD(corners), { rng, size: 1.8 }));
    b += label(328, 36 + i * 118 + 54, name, { anchor: 'start', color, weight: 500 });
  });
  b += L(arrow(472, 214, 508, 214, rng, { size: 3 }));
  const MX = 518;
  const MY = 86;
  const MW = 186;
  const MH = 240;
  const T1 = ([u, v]) => [MX + u * MW, MY + v * MH];
  const d = rectD(MX, MY, MW, MH);
  b += cut(d, { rng, fill: '#FBF8F1' });
  // Each layer keeps its colour; multiplying them makes overlaps darker.
  b += '<g style="isolation:isolate">';
  for (const [, color, patches] of layers) for (const p of patches) b += `<path d="${polyD(p.map(T1))}" fill="${color}" opacity="0.55" style="mix-blend-mode:multiply"/>`;
  b += '</g>';
  b += L(ink(d, { rng, size: 2.2 }));
  b += title(MX + MW / 2, MY - 18, 'Stacked');
  b += note(706, MY + MH + 42, 'darkest: most harm', { anchor: 'end', color: P.tomatoDeep });
  b += note(706, MY + MH + 78, 'clear: best suited', { anchor: 'end', color: P.leafDeep });
  return { W, H, b };
}

// The same six tracts mapped as counts and as rates.
function countsVsRates() {
  const rng = makeRng(1404);
  const tracts = [['A', 12000, 1800], ['B', 3000, 750], ['C', 4000, 400], ['D', 2500, 800], ['E', 5000, 500], ['F', 3500, 350]];
  // Shared vertices so neighbouring tracts meet: a 4 x 3 lattice, nudged.
  const V = [
    [[0, 0], [104, 6], [206, -4], [312, 4]],
    [[-4, 118], [98, 112], [214, 124], [306, 114]],
    [[2, 236], [108, 230], [200, 242], [314, 232]],
  ];
  const quad = (r, c) => [V[r][c], V[r][c + 1], V[r + 1][c + 1], V[r + 1][c]];
  const cellsOf = [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2]];
  const shade = [T.blush, P.blush, P.tomatoDeep];
  const map = (heading, value, classOf, show, remark, breaks) => {
    let s = title(0, 26, heading, { size: 24, anchor: 'start' });
    tracts.forEach((t, i) => {
      const [r, c] = cellsOf[i];
      const pts = quad(r, c).map(([x, y]) => [x, y + 48]);
      const k = classOf(value(t));
      s += cut(polyD(pts), { rng, fill: shade[k], shadow: false, jitter: 0.5, filter: FLAT });
      s += L(ink(polyD(pts), { rng, size: 1.6 }));
      const cx = pts.reduce((a, p) => a + p[0], 0) / 4;
      const cy = pts.reduce((a, p) => a + p[1], 0) / 4;
      s += label(cx, cy + 9, show(value(t)), { size: 26, weight: 700, color: k === 2 ? '#FFFFFF' : P.ink });
    });
    s += note(156, 326, remark, { size: 24 });
    s += label(156, 358, breaks, { size: 20, color: MUTED, weight: 500 });
    return s;
  };
  const counts = map('Count in poverty', (t) => t[2], (v) => (v > 1200 ? 2 : v > 600 ? 1 : 0), fmt, 'mostly shows where people live', 'breaks at 600 and 1,200 people');
  const rates = map('Poverty rate', (t) => (t[2] / t[1]) * 100, (v) => (v > 20 ? 2 : v > 12 ? 1 : 0), (v) => `${Math.round(v)}%`, 'shows where poverty concentrates', 'breaks at 12% and 20%');
  return {
    W: 720, H: 380, b: at(24, 10, counts) + at(388, 10, rates),
    narrow: { W: 362, H: 760, b: at(24, 10, counts) + at(24, 390, rates) },
  };
}

// The gravity model: pull = size ÷ distance².
function gravity() {
  const rng = makeRng(1405);
  const W = 720;
  const H = 380;
  let b = '';
  const mile = 72;
  const shopper = 300;
  const ground = 214;
  b += note(360, 44, 'pull = size ÷ distance²', { color: P.ink });
  b += L(inkLine([[20, ground], [700, ground]], { rng, size: 2, overshoot: 0, opacity: 0.6 }));
  b += person(shopper, ground, 1.2, { coat: P.civic, seed: 31 });
  for (const [name, size, dist, dir] of [['Corner shops', 1, 2, -1], ['Regional center', 4, 3, 1]]) {
    const x = shopper + dir * dist * mile;
    const pull = size / dist ** 2;
    if (size === 1) b += block(x - 34, ground, 68, 58, { wall: P.butter, cols: 2, rows: 1, awning: true, seed: 41 });
    else b += block(x - 70, ground, 140, 118, { wall: P.lavender, cols: 5, rows: 3, awning: true, seed: 42 });
    const [a, c] = [Math.min(shopper, x), Math.max(shopper, x)];
    b += L(dashed(a, ground + 26, c, ground + 26, rng, { size: 2 }) + inkLine([[a, ground + 18], [a, ground + 34]], { rng, size: 2, overshoot: 0 }) + inkLine([[c, ground + 18], [c, ground + 34]], { rng, size: 2, overshoot: 0 }));
    b += label((shopper + x) / 2, ground + 62, `${dist} miles`);
    b += title(x, ground + 106, name);
    b += label(x, ground + 142, `${size} ÷ ${dist}² = ${pull.toFixed(2)}`, { color: size === 4 ? P.tomatoDeep : P.civicDeep });
  }
  b += L(arrow(shopper + 20, ground - 60, shopper + 3 * mile - 80, ground - 90, rng, { size: 4, color: P.tomatoDeep, bend: -8 }));
  b += L(arrow(shopper - 20, ground - 60, shopper - 2 * mile + 44, ground - 70, rng, { size: 2, color: P.civicDeep, bend: 6 }));
  return { W, H, b };
}

// A little cut-paper person for counting charts: head and body, scaled by s.
function tally(x, y, s, fill, rng) {
  const head = ellipseD(x, y - 30 * s, 7 * s, 7 * s);
  const body = roundRectD(x - 9 * s, y - 21 * s, 18 * s, 21 * s, 7 * s);
  return `<path d="${body}" fill="${fill}"/><path d="${head}" fill="${fill}"/>` + L(ink(body, { rng, size: 1.6 }) + ink(head, { rng, size: 1.6 }));
}

// The dependency ratio from the lesson's example, one figure per 1,000 people.
function dependencyRatio() {
  const rng = makeRng(1306);
  const W = 720;
  const H = 400;
  let b = '';
  b += label(360, 36, 'each figure = 1,000 people', { color: MUTED, weight: 500 });
  b += title(20, 92, 'Working age, 15–64', { anchor: 'start' });
  for (let i = 0; i < 20; i++) b += tally(36 + (i % 10) * 34, 150 + Math.floor(i / 10) * 56, 1, P.civic, rng);
  b += label(190, 250, '20,000', { color: P.civicDeep });
  b += title(420, 92, 'Dependents', { anchor: 'start' });
  for (let i = 0; i < 6; i++) b += tally(436 + (i % 3) * 34, 158 + Math.floor(i / 3) * 48, 0.8, P.butter, rng);
  for (let i = 0; i < 4; i++) b += tally(578 + (i % 2) * 38, 150 + Math.floor(i / 2) * 56, 1, P.lavender, rng);
  b += label(470, 250, '6,000', { color: P.kraftDeep });
  b += label(470, 282, 'under 15', { weight: 500, color: MUTED });
  b += label(597, 250, '4,000', { color: '#6B559E' });
  b += label(597, 282, '65+', { weight: 500, color: MUTED });
  b += L(inkLine([[400, 76], [400, 290]], { rng, size: 1.4, opacity: 0.4, overshoot: 0 }));
  b += title(360, 340, '(6,000 + 4,000) ÷ 20,000 × 100 = 50', { size: 28 });
  b += note(360, 386, '50 dependents per 100 working-age people', { color: P.tomatoDeep });
  return { W, H, b };
}

// The index of dissimilarity: the same two groups, spread evenly or apart.
function dissimilarity() {
  const rng = makeRng(1307);
  // People per tract (each dot = 10), for group A and group B.
  const regions = [
    ['Evenly spread', [20, 20, 20, 20], [20, 20, 20, 20]],
    ['Mostly apart', [40, 40, 10, 10], [10, 10, 40, 40]],
  ];
  const D = (a, c) => {
    const A = a.reduce((x, y) => x + y, 0);
    const B = c.reduce((x, y) => x + y, 0);
    return Math.round(50 * a.reduce((s, v, i) => s + Math.abs(v / A - c[i] / B), 0));
  };
  const region = ([heading, a, c]) => {
    let s = panel(0, 0, 330, 330, T.cream, rng);
    s += title(20, 40, heading, { size: 25, anchor: 'start' });
    s += title(310, 40, `D = ${D(a, c)}`, { size: 25, anchor: 'end', color: P.tomatoDeep });
    for (let t = 0; t < 4; t++) {
      const tx = 34 + (t % 2) * 134;
      const ty = 62 + Math.floor(t / 2) * 96;
      const d = rectD(tx, ty, 128, 90);
      s += cut(d, { rng, fill: '#FBF8F1', shadow: false, filter: FLAT }) + L(ink(d, { rng, size: 1.6 }));
      const dots = [...Array(a[t] / 10).fill(P.civic), ...Array(c[t] / 10).fill(P.butter)];
      dots.forEach((fill, k) => {
        const x = tx + 22 + (k % 4) * 28;
        const y = ty + 24 + Math.floor(k / 4) * 28;
        s += `<circle cx="${x}" cy="${y}" r="10" fill="${fill}" stroke="${P.ink}" stroke-width="1.6"/>`;
      });
    }
    return s;
  };
  const [even, apart] = regions.map(region);
  const key = (x, y) => `<circle cx="${x}" cy="${y - 8}" r="10" fill="${P.civic}" stroke="${P.ink}" stroke-width="1.6"/>` + label(x + 18, y, 'group A', { size: 22, anchor: 'start' })
    + `<circle cx="${x + 140}" cy="${y - 8}" r="10" fill="${P.butter}" stroke="${P.ink}" stroke-width="1.6"/>` + label(x + 158, y, 'group B', { size: 22, anchor: 'start' });
  const explain = note(165, 280, '60% of one group would', { size: 25 }) + note(165, 308, 'have to move to even it out', { size: 25 });
  const evenNote = label(165, 292, 'every tract: half A, half B', { size: 22, color: MUTED, weight: 500 });
  const per = (x, y) => label(x, y, 'each dot = 10 people', { size: 22, anchor: 'start', color: MUTED, weight: 500 });
  return {
    W: 720, H: 410, b: at(20, 12, even + evenNote) + at(370, 12, apart + explain) + key(40, 386) + per(400, 386),
    narrow: { W: 354, H: 760, b: at(12, 12, even + evenNote) + at(12, 354, apart + explain) + key(24, 712) + per(24, 744) },
  };
}

// The Lorenz curve and the Gini coefficient.
function lorenzGini() {
  const rng = makeRng(1308);
  const W = 720;
  const H = 450;
  let b = '';
  // Illustrative income shares by fifth of households, poorest first.
  const shares = [3, 8, 14, 23, 52];
  const cum = [0];
  for (const v of shares) cum.push(cum[cum.length - 1] + v);
  const gini = 1 - shares.reduce((s, _, i) => s + 0.2 * (cum[i] + cum[i + 1]) / 100, 0);
  const x0 = 90;
  const y0 = 370;
  const S = 320;
  const X = (p) => x0 + (p / 100) * S;
  const Y = (p) => y0 - (p / 100) * S;
  // The curve joins the quintile points with straight segments, which is
  // exactly what the Gini below is computed from.
  const pts = cum.map((c, i) => [X(i * 20), Y(c)]);
  // Area A: between the diagonal and the curve. Area B: under the curve.
  const back = [...pts].reverse().map(([x, y]) => `L${x} ${y}`).join('');
  b += `<path d="M${X(0)} ${Y(0)}L${X(100)} ${Y(100)}${back}Z" fill="${T.blush}"/>`;
  b += `<path d="M${X(0)} ${Y(0)}${pts.slice(1).map(([x, y]) => `L${x} ${y}`).join('')}L${X(100)} ${Y(0)}Z" fill="${T.sky}"/>`;
  b += L(inkLine([[X(0), Y(0)], [X(100), Y(100)]], { rng, size: 2, color: P.civicDeep, overshoot: 0 }));
  b += L(inkLine(pts, { rng, size: 3.4, color: P.tomatoDeep, overshoot: 0, wobble: 0.6 }));
  for (const [x, y] of pts.slice(1, -1)) b += `<circle cx="${x}" cy="${y}" r="5.5" fill="${P.tomato}" stroke="${P.ink}" stroke-width="1.6"/>`;
  b += L(inkLine([[X(0), Y(100) - 6], [X(0), Y(0)], [X(100) + 6, Y(0)]], { rng, size: 2.4, overshoot: 0 }));
  for (const p of [0, 50, 100]) {
    b += label(X(p), y0 + 36, `${p}%`);
    if (p) b += label(x0 - 12, Y(p) + 10, `${p}%`, { anchor: 'end' });
  }
  b += title(X(46), Y(32), 'A', { size: 30, color: P.tomatoDeep });
  b += title(X(72), Y(18), 'B', { size: 30, color: P.civicDeep });
  b += label(X(50), y0 + 68, 'households, poorest to richest', { weight: 500, color: MUTED });
  b += label(x0 - 6, 34, 'share of income', { weight: 500, color: MUTED, anchor: 'start' });
  b += `<g transform="rotate(-45 ${X(42)} ${Y(42)})">${label(X(42), Y(42) - 12, 'perfect equality', { color: P.civicDeep, weight: 500 })}</g>`;
  const rx = 440;
  b += title(rx, 100, 'Gini = A ÷ (A + B)', { size: 28, anchor: 'start' });
  b += title(rx, 148, `= ${gini.toFixed(2)} here`, { size: 28, anchor: 'start', color: P.tomatoDeep });
  b += note(rx, 208, 'the more the curve', { anchor: 'start' });
  b += note(rx, 244, 'sags, the higher', { anchor: 'start' });
  b += note(rx, 280, 'the Gini', { anchor: 'start' });
  b += label(rx, 326, 'no sag: Gini 0', { anchor: 'start', color: MUTED, weight: 500 });
  b += label(rx, 360, 'all to one: Gini 1', { anchor: 'start', color: MUTED, weight: 500 });
  return { W, H, b, gini };
}

// The same twelve tract values, classed two ways.
function classBreaks() {
  const rng = makeRng(1406);
  // Illustrative poverty rates, laid out in a 4 x 3 grid of tracts.
  const vals = [6, 12, 4, 9, 14, 7, 30, 5, 10, 34, 6, 8];
  const sorted = [...vals].sort((a, c) => a - c);
  const lo = sorted[0];
  const hi = sorted[sorted.length - 1];
  const step = (hi - lo) / 3;
  const equal = (v) => Math.min(2, Math.floor((v - lo) / step));
  const quant = (v) => { const r = sorted.indexOf(v); return r < 4 ? 0 : r < 8 ? 1 : 2; };
  const shade = [T.blush, P.blush, P.tomatoDeep];
  const map = (heading, classOf, legend) => {
    let s = title(0, 28, heading, { size: 25, anchor: 'start' });
    vals.forEach((v, i) => {
      const x = (i % 4) * 78;
      const y = 48 + Math.floor(i / 4) * 78;
      const d = rectD(x, y, 76, 76);
      const k = classOf(v);
      s += cut(d, { rng, fill: shade[k], shadow: false, jitter: 0.5, filter: FLAT }) + L(ink(d, { rng, size: 1.4 }));
      s += label(x + 38, y + 47, `${v}%`, { size: 24, weight: 700, color: k === 2 ? '#FFFFFF' : P.ink });
    });
    legend.forEach(([text, k], i) => {
      s += `<rect x="0" y="${298 + i * 32}" width="22" height="22" rx="4" fill="${shade[k]}" stroke="${P.ink}" stroke-width="1.4"/>`;
      s += label(32, 316 + i * 32, text, { size: 22, anchor: 'start', weight: 500 });
    });
    return s;
  };
  const e = (k) => `${Math.round(lo + k * step)}–${Math.round(lo + (k + 1) * step) - (k < 2 ? 1 : 0)}%`;
  const eq = map('Equal intervals', equal, [0, 1, 2].map((k) => [`${e(k)}: ${vals.filter((v) => equal(v) === k).length} tract${vals.filter((v) => equal(v) === k).length === 1 ? '' : 's'}`, k]));
  const qs = map('Quantiles', quant, [[`${sorted[0]}–${sorted[3]}%: 4 tracts`, 0], [`${sorted[4]}–${sorted[7]}%: 4 tracts`, 1], [`${sorted[8]}–${sorted[11]}%: 4 tracts`, 2]]);
  return {
    W: 720, H: 460, b: at(24, 12, eq) + at(392, 12, qs) + note(360, 446, 'same data, two different stories', { size: 30, color: P.tomatoDeep }),
    narrow: { W: 360, H: 900, b: at(24, 12, eq) + at(24, 440, qs) + note(180, 886, 'same data, two stories', { size: 28, color: P.tomatoDeep }) },
  };
}

// The modifiable areal unit problem: the same households, zoned two ways.
function maup() {
  const rng = makeRng(1407);
  const COLS = 6;
  const ROWS = 4;
  const SP = 46;
  const SY = 60; // taller rows leave room for the share tags between them
  // High-income households fill the top-left and bottom-right quarters.
  const high = (c, r) => (r < 2 && c < 3) || (r >= 2 && c >= 3);
  const shade = (p) => (p >= 0.75 ? T.sage : p <= 0.25 ? '#FBF8F1' : '#EEF3E4');
  const map = (heading, zones, sub) => {
    let s = title(0, 28, heading, { size: 25, anchor: 'start' });
    s += label(0, 60, sub, { size: 22, anchor: 'start', color: MUTED, weight: 500 });
    const TOP = 96;
    const tags = [];
    for (const [c0, r0, c1, r1] of zones) {
      let n = 0; let h = 0;
      for (let r = r0; r < r1; r++) for (let c = c0; c < c1; c++) { n++; if (high(c, r)) h++; }
      const d = rectD(c0 * SP, TOP + r0 * SY, (c1 - c0) * SP, (r1 - r0) * SY);
      s += cut(d, { rng, fill: shade(h / n), shadow: false, jitter: 0.4, filter: FLAT });
      s += L(ink(d, { rng, size: 2.2 }));
      tags.push([((c0 + c1) / 2) * SP, TOP + r0 * SY, `${Math.round((100 * h) / n)}%`]);
    }
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        s += `<circle cx="${c * SP + SP / 2}" cy="${TOP + r * SY + SY / 2 + 4}" r="9" fill="${high(c, r) ? P.leafDeep : P.paper}" stroke="${P.ink}" stroke-width="1.6"/>`;
      }
    }
    for (const [x, y, t] of tags) s += `<rect x="${x - 34}" y="${y - 15}" width="68" height="30" rx="8" fill="#FFFDF8" stroke="${P.ink}" stroke-width="1.6"/>` + label(x, y + 8, t, { size: 22, weight: 700 });
    return s;
  };
  const two = map('Two big zones', [[0, 0, 3, 4], [3, 0, 6, 4]], 'no pattern at all');
  const four = map('Four small zones', [[0, 0, 3, 2], [3, 0, 6, 2], [0, 2, 3, 4], [3, 2, 6, 4]], 'a sharp pattern');
  const key = (x, y) => `<circle cx="${x}" cy="${y - 7}" r="9" fill="${P.leafDeep}" stroke="${P.ink}" stroke-width="1.6"/>` + label(x + 16, y, 'high-income household', { size: 22, anchor: 'start', weight: 500 })
    + label(x, y + 30, '%: share with high incomes', { size: 20, anchor: 'start', color: MUTED, weight: 500 });
  return {
    W: 720, H: 424, b: at(24, 12, two) + at(420, 12, four) + key(24, 380),
    narrow: { W: 340, H: 790, b: at(32, 12, two) + at(32, 376, four) + key(20, 744) },
  };
}

export const FIGURES = [
  ['fig-research-route', researchRoute],
  ['fig-primary-secondary', primarySecondary],
  ['fig-census-acs', censusVsAcs],
  ['fig-sampling', samplingMethods],
  ['fig-validity', validityTargets],
  ['fig-skew', skewedIncome],
  ['fig-normal', normalCurve],
  ['fig-correlation', correlations],
  ['fig-confounder', confounder],
  ['fig-moe', overlappingIntervals],
  ['fig-discounting', discounting],
  ['fig-pyramid', populationPyramid],
  ['fig-projections', projections],
  ['fig-housing-unit', housingUnitMethod],
  ['fig-location-quotient', locationQuotient],
  ['fig-shift-share', shiftShare],
  ['fig-vector-raster', vectorRaster],
  ['fig-walkshed', walkshed],
  ['fig-mcharg', mchargOverlay],
  ['fig-counts-rates', countsVsRates],
  ['fig-gravity', gravity],
  ['fig-dependency', dependencyRatio],
  ['fig-dissimilarity', dissimilarity],
  ['fig-lorenz', lorenzGini],
  ['fig-class-breaks', classBreaks],
  ['fig-maup', maup],
];

// Every figure as { name, w, h, svg, narrow?: { w, h, svg } }. Also used by
// scripts/check-content.mjs to check label sizes.
export function buildFigures() {
  return FIGURES.map(([name, fn]) => {
    const { W, H, b, narrow } = fn();
    const fig = { name, w: W, h: H, svg: svgDoc(W, H, b) };
    if (narrow) fig.narrow = { w: narrow.W, h: narrow.H, svg: svgDoc(narrow.W, narrow.H, narrow.b) };
    return fig;
  });
}

export default function () {
  const meta = {};
  const list = [];
  for (const f of buildFigures()) {
    meta[f.name] = { w: f.w, h: f.h, ...(f.narrow ? { narrow: { w: f.narrow.w, h: f.narrow.h } } : {}) };
    list.push({ name: f.name, w: f.w, h: f.h, svg: f.svg, scale: 2, quality: 0.8 });
    if (f.narrow) list.push({ name: `${f.name}-narrow`, w: f.narrow.w, h: f.narrow.h, svg: f.narrow.svg, scale: 2, quality: 0.8 });
  }
  list.meta = meta;
  return list;
}
