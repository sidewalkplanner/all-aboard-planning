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
import { house, block, cityHall, person, sun, tape, sparkle, star } from '../lib/props.mjs';
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

// ============================================================ Lesson 2.1

// The eras of American planning on one to-scale time axis, drawn as
// transit lines: where each starts and ends, and how they overlap.
function historyTimeline() {
  const rng = makeRng(2101);
  const W = 720;
  const H = 640;
  let b = '';
  const y0 = 1850;
  const y1 = 2025;
  const X = (yr) => 44 + ((yr - y0) / (y1 - y0)) * 640;
  // [name, start, end, colour, label side]. Spans follow the lesson's section
  // headings; "today" is drawn as 2025.
  const eras = [
    ['Sanitary and tenement reform', 1850, 1910, P.sky, 'right'],
    ['City Beautiful', 1893, 1919, P.butter, 'right'],
    ['Zoning and model laws', 1900, 1929, P.lavender, 'right'],
    ['Garden City ideas', 1898, 1939, P.sage, 'right'],
    ['New Deal', 1933, 1939, P.leaf, 'right'],
    ['Urban renewal, Interstates', 1949, 1969, P.tomato, 'left'],
    ['The backlash', 1961, 1979, P.blush, 'left'],
    ['New Urbanism', 1980, 2025, P.civic, 'left'],
    ['Smart Growth', 1990, 2025, P.kraft, 'left'],
  ];
  const top = 130;
  const pitch = 44;
  eras.forEach(([name, s, e, fill, side], i) => {
    const y = top + i * pitch;
    const d = roundRectD(X(s), y - 9, X(e) - X(s), 18, 9);
    b += cut(d, { rng, fill, jitter: 0.5 });
    b += L(ink(d, { rng, size: 2 }));
    b += side === 'right' ? label(X(e) + 12, y + 10, name, { anchor: 'start' }) : label(X(s) - 12, y + 10, name, { anchor: 'end' });
  });
  // The profession consolidates in 1978.
  const ay = top + eras.length * pitch + 10;
  const axisY = ay + 34;
  b += L(dashed(X(1978), ay + 12, X(1978), axisY - 4, rng, { color: P.tomatoDeep, size: 2, dash: 6, gap: 5 }));
  b += star(X(1978), ay - 4, 14, { fill: P.butter, seed: 21 });
  b += label(X(1978) - 22, ay + 6, '1978: APA and AICP', { anchor: 'end', color: P.tomatoDeep });
  b += L(inkLine([[X(y0) - 6, axisY], [X(y1) + 6, axisY]], { rng, size: 2.6, overshoot: 0 }));
  for (const yr of [1850, 1900, 1950, 2000]) {
    b += L(inkLine([[X(yr), axisY], [X(yr), axisY + 9]], { rng, size: 2, overshoot: 0 }));
    b += label(X(yr), axisY + 40, String(yr));
  }
  for (let yr = 1860; yr < 2025; yr += 10) if (yr % 50) b += L(inkLine([[X(yr), axisY], [X(yr), axisY + 5]], { rng, size: 1.4, overshoot: 0, opacity: 0.7 }));
  b += note(34, 46, 'each era answers the problems', { anchor: 'start' });
  b += note(34, 80, 'of the one before', { anchor: 'start' });
  b += sparkle(660, 44, 11, { seed: 5 });
  return { W, H, b };
}

// The 1916 height-and-setback rules: a sheer tower shades the street, a
// stepped one lets the light down. Shadows are cast from the drawn outline.
function weddingCake() {
  const rng = makeRng(2102);
  const PW = 338;
  const PH = 430;
  const G = 330; // ground line
  const slope = 2.2; // sun rays fall 2.2 px for every 1 px across
  const street = [180, 270];
  const RY = 100; // rays start here
  // A building as tiers [left, right, top], widest at the base.
  const scene = (heading, sub, tiers, remark, remarkColor) => {
    let s = panel(0, 0, PW, PH, T.sky, rng);
    s += title(20, 42, heading, { size: 25, anchor: 'start' });
    s += label(20, 72, sub, { size: 20, anchor: 'start', color: MUTED, weight: 500 });
    // Shadow: each tier's corner away from the sun, cast along the rays.
    let shade = '';
    for (const [, r, t] of tiers) shade += `<path d="${polyD([[r, t], [r + (G - t) / slope, G], [r, G]])}" fill="#27233A"/>`;
    // Sun rays from the upper left, each stopping where it meets a building.
    let rays = '';
    for (let k = 0; k < 8; k++) {
      const x = -130 + k * 56;
      const xAt = (y) => x + (y - RY) / slope;
      let end = Math.min(G, RY + (PW - 14 - x) * slope);
      for (const [l, r, t] of [...tiers, [street[1], PW - 12, G - 90]]) {
        if (xAt(t) >= l && xAt(t) <= r) end = Math.min(end, t);
        const yl = RY + (l - x) * slope;
        if (yl >= t && yl <= G) end = Math.min(end, yl);
      }
      if (xAt(end) > 8 && end > RY + 20) {
        const y0 = xAt(RY) < 10 ? RY + (10 - x) * slope : RY;
        if (y0 < end - 20) rays += dashed(xAt(y0), y0, xAt(end), end, rng, { color: P.butterDeep, size: 2, dash: 9, gap: 8 });
      }
    }
    s += `<g opacity="0.8">${L(rays)}</g>`;
    s += `<g opacity="0.22">${shade}</g>`;
    // Street and sidewalk strip.
    s += `<rect x="${street[0]}" y="${G}" width="${street[1] - street[0]}" height="14" fill="#8C8698"/>`;
    s += L(inkLine([[8, G], [PW - 8, G]], { rng, size: 2.4, overshoot: 0 }));
    // One stepped outline: tiers are nested, each narrower and taller.
    const outline = [[tiers[0][0], G]];
    tiers.forEach(([l, , t], i) => { if (i) outline.push([l, tiers[i - 1][2]]); outline.push([l, t]); });
    [...tiers].reverse().forEach(([, r, t], i, rev) => { outline.push([r, t]); outline.push([r, i < rev.length - 1 ? rev[i + 1][2] : G]); });
    const body = polyD(outline);
    s += cut(body, { rng, fill: P.lavender, jitter: 0.5 });
    s += L(ink(body, { rng, size: 2.2 }));
    tiers.forEach(([l, r, t], i) => {
      const bottom = i ? tiers[i - 1][2] : G;
      for (let wy = t + 14; wy < bottom - 16; wy += 22) for (let wx = l + 10; wx < r - 12; wx += 18) s += `<rect x="${wx}" y="${wy}" width="8" height="10" fill="${P.paper}" opacity="0.8"/>`;
    });
    const across = rectD(street[1], G - 90, PW - 12 - street[1], 90);
    s += cut(across, { rng, fill: P.butter, jitter: 0.5 }) + L(ink(across, { rng, size: 2.2 }));
    s += label((street[0] + street[1]) / 2, G + 42, 'street', { size: 20, color: MUTED, weight: 500 });
    s += note(PW / 2, PH - 20, remark, { size: 25, color: remarkColor });
    return s;
  };
  const sheer = scene('Straight up', 'like the Equitable Building', [[16, street[0], 108]], 'the street sits in shadow', P.tomatoDeep);
  const stepped = scene('Set back', 'the 1916 setback rules', [
    [16, street[0], 280], [28, 150, 220], [40, 124, 160], [52, 106, 108],
  ], 'light reaches the street', P.leafDeep);
  return {
    W: 720, H: 458, b: at(14, 14, sheer) + at(368, 14, stepped),
    narrow: { W: 366, H: 902, b: at(14, 14, sheer) + at(14, 458, stepped) },
  };
}

// Howard's garden city: a size-limited town in a permanent greenbelt, and
// the cluster of towns linked by rail that he called the social city.
function gardenCity() {
  const rng = makeRng(2103);
  const PW = 338;
  const PH = 420;
  const town = (cx, cy, rt, rg, detail) => {
    let s = '';
    const belt = ellipseD(cx, cy, rg, rg);
    s += cut(belt, { rng, fill: P.sage, jitter: 0.6, filter: FLAT });
    if (detail) {
      // Farm fields: strips of hatching in the greenbelt.
      for (let a = 0; a < 12; a++) {
        const a0 = (a / 12) * Math.PI * 2;
        const a1 = a0 + Math.PI / 6;
        const f = polyD([[cx + Math.cos(a0) * (rt + 6), cy + Math.sin(a0) * (rt + 6)], [cx + Math.cos(a0) * (rg - 6), cy + Math.sin(a0) * (rg - 6)], [cx + Math.cos(a1) * (rg - 6), cy + Math.sin(a1) * (rg - 6)], [cx + Math.cos(a1) * (rt + 6), cy + Math.sin(a1) * (rt + 6)]]);
        s += hatch(f, { rng, angle: a * 30 + (a % 2 ? 40 : -20), gap: 7, opacity: 0.4, size: 1.1, color: P.leafDeep });
      }
    }
    s += L(ink(belt, { rng, size: 2 }));
    const core = ellipseD(cx, cy, rt, rt);
    s += cut(core, { rng, fill: P.butter, jitter: 0.5, filter: FLAT });
    s += L(ink(core, { rng, size: 2.2 }));
    return s;
  };
  const rail = (x1, y1, x2, y2) => {
    let s = inkLine([[x1, y1], [x2, y2]], { rng, size: 2.6, overshoot: 0, color: P.ink });
    const len = Math.hypot(x2 - x1, y2 - y1);
    const nx = -(y2 - y1) / len;
    const ny = (x2 - x1) / len;
    for (let t = 10; t < len - 6; t += 12) {
      const px = x1 + ((x2 - x1) * t) / len;
      const py = y1 + ((y2 - y1) * t) / len;
      s += inkLine([[px - nx * 5, py - ny * 5], [px + nx * 5, py + ny * 5]], { rng, size: 1.4, overshoot: 0 });
    }
    return L(s);
  };

  let one = panel(0, 0, PW, PH, T.cream, rng);
  one += title(20, 42, 'One garden city', { size: 25, anchor: 'start' });
  one += town(169, 196, 56, 118, true);
  one += label(169, 204, 'town', { size: 22, weight: 700 });
  one += label(20, 358, 'town: about 32,000 people', { size: 22, anchor: 'start' });
  one += label(20, 390, 'greenbelt: permanent farms', { size: 22, anchor: 'start', color: P.leafDeep });

  let cluster = panel(0, 0, PW, PH, T.cream, rng);
  cluster += title(20, 42, 'The social city', { size: 25, anchor: 'start' });
  const cx = 169;
  const cy = 194;
  const ring = 106;
  const sats = [0, 1, 2, 3, 4, 5].map((k) => {
    const a = -Math.PI / 2 + (k / 6) * Math.PI * 2;
    return [cx + Math.cos(a) * ring, cy + Math.sin(a) * ring];
  });
  let lines = '';
  sats.forEach(([x, y], k) => {
    const [nx2, ny2] = sats[(k + 1) % 6];
    lines += rail(x, y, nx2, ny2) + rail(x, y, cx, cy);
  });
  cluster += lines;
  cluster += town(cx, cy, 38, 54, false);
  for (const [x, y] of sats) cluster += town(x, y, 17, 32, false);
  cluster += note(20, 370, 'a town is full? start a', { size: 25, anchor: 'start' });
  cluster += note(20, 400, 'new one down the line', { size: 25, anchor: 'start' });
  cluster += label(cx, cy + 7, 'central', { size: 19, weight: 700 });

  return {
    W: 720, H: 448, b: at(14, 14, one) + at(368, 14, cluster),
    narrow: { W: 366, H: 882, b: at(14, 14, one) + at(14, 448, cluster) },
  };
}

// Perry's neighborhood unit: arterials at the edges, a school at the center.
function neighborhoodUnit() {
  const rng = makeRng(2104);
  const W = 720;
  const H = 480;
  let b = '';
  const x0 = 40;
  const y0 = 50;
  const S = 380;
  const road = 22;
  // Arterials around the edge.
  const outer = rectD(x0 - road, y0 - road, S + 2 * road, S + 2 * road);
  b += cut(outer, { rng, fill: '#9C95A8', jitter: 0.4, filter: FLAT });
  const inner = rectD(x0, y0, S, S);
  b += cut(inner, { rng, fill: T.butter, jitter: 0.4, filter: FLAT, shadow: false });
  b += L(ink(outer, { rng, size: 2.2 }) + ink(inner, { rng, size: 2 }));
  for (const [ax, ay, bx2, by] of [[x0 - road, y0 - road / 2, x0 + S + road, y0 - road / 2], [x0 - road, y0 + S + road / 2, x0 + S + road, y0 + S + road / 2], [x0 - road / 2, y0 - road, x0 - road / 2, y0 + S + road], [x0 + S + road / 2, y0 - road, x0 + S + road / 2, y0 + S + road]]) {
    b += dashed(ax, ay, bx2, by, rng, { color: P.paper, size: 2, dash: 12, gap: 10 });
  }
  // Curving local streets that don't run straight through.
  const cx = x0 + S / 2;
  const cy = y0 + S / 2;
  const locals = [
    `M${x0} ${y0 + 110}C${x0 + 90} ${y0 + 100} ${cx - 60} ${cy - 90} ${cx - 50} ${cy - 44}`,
    `M${x0 + S} ${y0 + S - 110}C${x0 + S - 90} ${y0 + S - 100} ${cx + 60} ${cy + 90} ${cx + 50} ${cy + 44}`,
    `M${x0 + 110} ${y0 + S}C${x0 + 100} ${y0 + S - 90} ${cx - 90} ${cy + 60} ${cx - 44} ${cy + 50}`,
    `M${x0 + S - 110} ${y0}C${x0 + S - 100} ${y0 + 90} ${cx + 90} ${cy - 60} ${cx + 44} ${cy - 50}`,
  ];
  for (const d of locals) b += `<path d="${d}" fill="none" stroke="#FFFDF8" stroke-width="10" stroke-linecap="round"/>`;
  b += L(locals.map((d) => ink(d, { rng, size: 1.2, opacity: 0.5 })).join(''));
  const ring = ellipseD(cx, cy, 74, 74);
  b += `<path d="${ring}" fill="none" stroke="#FFFDF8" stroke-width="10"/>`;
  // Small parks throughout.
  const parks = [[x0 + 58, y0 + 36, 60, 44], [x0 + S - 130, y0 + S - 100, 62, 46], [x0 + 30, y0 + S - 160, 46, 58], [x0 + S - 70, y0 + 176, 48, 56]];
  for (const [px, py, pw, ph] of parks) {
    const d = roundRectD(px, py, pw, ph, 10);
    b += cut(d, { rng, fill: P.leaf, jitter: 0.8 }) + L(ink(d, { rng, size: 1.8 }));
  }
  // The school and community center at the heart.
  const green = ellipseD(cx, cy, 62, 62);
  b += cut(green, { rng, fill: P.sage, filter: FLAT }) + L(ink(green, { rng, size: 2 }));
  const school = rectD(cx - 52, cy - 22, 104, 44);
  b += cut(school, { rng, fill: P.civic, filter: FLAT }) + L(ink(school, { rng, size: 2.2 }));
  b += label(cx, cy + 10, 'school', { size: 28, weight: 700, color: '#FFFFFF' });
  // Shops at the corners, where the arterials meet.
  const shops = [[x0, y0], [x0 + S, y0], [x0, y0 + S], [x0 + S, y0 + S]];
  for (const [sx, sy] of shops) {
    const dx = sx === x0 ? 0 : -46;
    const dy = sy === y0 ? 0 : -46;
    const d = rectD(sx + dx, sy + dy, 46, 46);
    b += cut(d, { rng, fill: P.tomato, filter: FLAT }) + L(ink(d, { rng, size: 2 }));
  }
  // Callouts on the right.
  const lx = 474;
  const call = (y, lines, color, tx, ty) => {
    let s = lines.map((t, k) => label(lx, y + k * 32, t, { anchor: 'start', color })).join('');
    if (tx) s += L(arrow(lx - 8, y - 8, tx, ty, rng, { color, size: 2.2, head: 10, bend: 10 }));
    return s;
  };
  b += call(66, ['shops at the', 'corners'], P.tomatoDeep, x0 + S - 6, y0 + 30);
  b += call(186, ['elementary school', 'at the center'], P.civicDeep, cx + 56, cy - 10);
  b += call(300, ['small parks', 'throughout'], P.leafDeep, x0 + S - 70, y0 + S - 80);
  b += call(410, ['arterials along', 'the edges'], P.ink, x0 + S + road / 2 + 2, y0 + S - 30);
  return { W, H, b };
}

// Radburn's superblock: cul-de-sacs for cars, a park and paths for people.
function radburn() {
  const rng = makeRng(2105);
  const W = 720;
  const H = 470;
  let b = '';
  const x0 = 40;
  const y0 = 40;
  const w = 400;
  const h = 390;
  const road = 20;
  const outer = rectD(x0 - road, y0 - road, w + 2 * road, h + 2 * road);
  b += cut(outer, { rng, fill: '#9C95A8', jitter: 0.4, filter: FLAT });
  const inner = rectD(x0, y0, w, h);
  b += cut(inner, { rng, fill: T.butter, jitter: 0.4, filter: FLAT, shadow: false });
  b += L(ink(outer, { rng, size: 2.2 }) + ink(inner, { rng, size: 2 }));
  // The interior park.
  const park = blobD(x0 + w / 2, y0 + h / 2, 92, 128, makeRng(9), 7, 0.08);
  b += cut(park, { rng, fill: P.sage, filter: FLAT }) + L(ink(park, { rng, size: 2 }));
  // Cul-de-sacs from the edge roads, each lined with houses facing the park.
  const culs = [
    [x0, y0 + 80, 1], [x0, y0 + 200, 1], [x0, y0 + 320, 1],
    [x0 + w, y0 + 80, -1], [x0 + w, y0 + 200, -1], [x0 + w, y0 + 320, -1],
  ];
  let homes = '';
  for (const [sx, sy, dir] of culs) {
    const ex = sx + dir * 92;
    b += `<path d="M${sx} ${sy}H${ex}" stroke="#9C95A8" stroke-width="14" stroke-linecap="round"/>`;
    b += `<circle cx="${ex}" cy="${sy}" r="15" fill="#9C95A8"/>`;
    for (const off of [-1, 1]) {
      for (let k = 0; k < 3; k++) {
        const hx = sx + dir * (22 + k * 30);
        const hy = sy + off * 30;
        const d = rectD(hx - 11, hy - 10, 22, 20);
        homes += cut(d, { rng, fill: [P.tomato, P.butter, P.civic][(k + (off > 0 ? 1 : 0)) % 3], jitter: 0.3, filter: FLAT }) + L(ink(d, { rng, size: 1.5 }));
        // The door is on the side away from the cul-de-sac.
        homes += `<rect x="${hx - 4}" y="${off > 0 ? hy + 8 : hy - 12}" width="8" height="4" fill="${P.ink}"/>`;
      }
    }
  }
  b += homes;
  // Footpaths: a spine through the park, and walks between the house rows,
  // which the homes front onto. Door marks show which way each home faces.
  const paths = [
    `M${x0 + w / 2} ${y0 + 24}V${y0 + h + road + 16}`,
    `M${x0 + 8} ${y0 + 140}H${x0 + w - 8}`,
    `M${x0 + 8} ${y0 + 260}H${x0 + w - 8}`,
  ];
  b += L(paths.map((d) => inkLine(d, { rng, size: 2.8, color: P.tomatoDeep, overshoot: 0 })).join(''));
  // Underpass: the road bridges over the path at the bottom edge.
  const ux = x0 + w / 2;
  const uy = y0 + h + road / 2;
  b += `<rect x="${ux - 16}" y="${uy - road / 2 - 1}" width="32" height="${road + 2}" fill="#9C95A8"/>`;
  b += L(inkLine([[ux - 18, uy - road / 2 - 4], [ux + 18, uy - road / 2 - 4]], { rng, size: 2.4, overshoot: 0 }) + inkLine([[ux - 18, uy + road / 2 + 4], [ux + 18, uy + road / 2 + 4]], { rng, size: 2.4, overshoot: 0 }));
  const lx = 490;
  b += label(lx, 70, 'cul-de-sacs', { anchor: 'start', color: P.ink });
  b += label(lx, 102, 'for cars', { anchor: 'start', color: P.ink });
  b += L(arrow(lx - 8, 88, x0 + w - 70, y0 + 80, rng, { size: 2.2, head: 10, bend: -8 }));
  b += label(lx, 190, 'homes face the', { anchor: 'start', color: P.leafDeep });
  b += label(lx, 222, 'paths and park', { anchor: 'start', color: P.leafDeep });
  b += L(arrow(lx - 8, 206, x0 + w - 66, y0 + 126, rng, { color: P.leafDeep, size: 2.2, head: 10, bend: 8 }));
  b += label(lx, 310, 'paths for', { anchor: 'start', color: P.tomatoDeep });
  b += label(lx, 342, 'people', { anchor: 'start', color: P.tomatoDeep });
  b += L(arrow(lx - 8, 326, x0 + w - 30, y0 + 266, rng, { color: P.tomatoDeep, size: 2.2, head: 10, bend: -8 }));
  b += note(lx, 412, 'an underpass', { anchor: 'start', color: P.tomatoDeep });
  b += note(lx, 446, 'under the road', { anchor: 'start', color: P.tomatoDeep });
  b += L(arrow(lx - 10, 432, ux + 22, uy, rng, { color: P.tomatoDeep, size: 2.2, head: 10, bend: 10 }));
  return { W, H, b };
}

// ============================================================ Lesson 2.2

// The rational-comprehensive model as a route with five stops, looping back.
function rationalModel() {
  const rng = makeRng(2201);
  const W = 720;
  const H = 470;
  let b = '';
  const y = 176;
  const band = roundRectD(40, y - 11, 640, 22, 11);
  b += cut(band, { rng, fill: P.civic });
  b += L(ink(band, { rng, size: 2.2 }));
  const stops = [
    [80, ['Problem', 'and goals']], [220, ['All the', 'alternatives']], [360, ['Evaluate', 'each one']],
    [500, ['Choose', 'the best']], [640, ['Implement,', 'monitor']],
  ];
  stops.forEach(([x, lines], i) => {
    const r = 24;
    const d = ellipseD(x, y, r, r);
    b += cut(d, { rng, fill: i === 0 ? P.butter : P.paper, jitter: 0.5, filter: FLAT });
    b += L(ink(d, { rng, size: 3 }));
    b += title(x, y + 10, String(i + 1));
    const above = i % 2 === 1;
    lines.forEach((line, k) => { b += label(x, above ? y - 80 + k * 32 : y + 66 + k * 32, line); });
  });
  // Monitoring feeds the next round.
  b += L(inkLine(`M640 ${y + 110}C640 ${y + 170} 600 ${y + 186} 360 ${y + 186}C120 ${y + 186} 80 ${y + 170} 80 ${y + 110}`, { rng, size: 2.6, color: P.civicDeep, overshoot: 0 }));
  b += L(arrow(81, y + 124, 80, y + 106, rng, { color: P.civicDeep, size: 2.6, head: 12 }));
  b += note(360, y + 178, 'what you learn starts the next round');
  b += note(360, 422, 'critics: nobody has full information,', { color: P.tomatoDeep });
  b += note(360, 458, 'unlimited time, or agreed goals', { color: P.tomatoDeep });
  b += sparkle(672, 40, 11, { seed: 6 });
  return { W, H, b };
}

// Four ways to decide, shown on the same field of eighteen options.
function decisionStyles() {
  const rng = makeRng(2202);
  const COLS = 6;
  const SP = 44;
  const R = 11;
  const PW = 342;
  const PH = 256;
  const pt = (i) => [61 + (i % COLS) * SP, 124 + Math.floor(i / COLS) * SP];
  const dot = (i, kind) => {
    const [x, y] = pt(i);
    if (kind === 'now') {
      const d = rectD(x - 12, y - 12, 24, 24);
      return cut(d, { rng, fill: P.kraft, jitter: 0.3 }) + L(ink(d, { rng, size: 2.2 }));
    }
    const d = ellipseD(x, y, R, R);
    const fill = kind === 'seen' ? P.civic : kind === 'glance' ? T.sky : P.paper;
    return cut(d, { rng, fill, shadow: kind === 'seen', jitter: 0.4 }) + L(ink(d, { rng, size: kind === 'seen' ? 2.2 : 1.5, opacity: kind === 'none' ? 0.6 : 1 }));
  };
  const field = (kinds) => kinds.map((k, i) => dot(i, k)).join('');
  const pick = (i) => { const [x, y] = pt(i); return star(x, y - 1, 17, { fill: P.butter, seed: 30 + i, size: 2.2 }); };
  const head = (heading, sub) => title(20, 40, heading, { size: 23, anchor: 'start' }) + note(20, 72, sub, { size: 24, anchor: 'start' });
  const all = (k) => Array(18).fill(k);

  let rational = panel(0, 0, PW, PH, T.cream, rng) + head('Rational-comprehensive', 'weigh every option, take the best');
  rational += field(all('seen')) + pick(10);

  let satisfice = panel(0, 0, PW, PH, T.cream, rng) + head('Satisficing: Simon', 'stop at the first good-enough one');
  satisfice += field(all('none').map((k, i) => (i <= 8 ? 'seen' : k))) + pick(8);
  satisfice += L(arrow(pt(0)[0] - 4, pt(0)[1] - 22, pt(5)[0] + 4, pt(5)[1] - 22, rng, { color: P.civicDeep, size: 2, head: 9 }));
  satisfice += L(arrow(pt(6)[0] - 4, pt(6)[1] - 22, pt(8)[0] - 18, pt(8)[1] - 22, rng, { color: P.civicDeep, size: 2, head: 9 }));

  let incremental = panel(0, 0, PW, PH, T.cream, rng) + head('Incrementalism: Lindblom', 'small steps from where you are');
  incremental += field(all('none').map((k, i) => ([1, 6, 8, 13].includes(i) ? 'seen' : i === 7 ? 'now' : k))) + pick(8);
  incremental += L(arrow(pt(7)[0] + 16, pt(7)[1] - 2, pt(8)[0] - 20, pt(8)[1] - 2, rng, { color: P.tomatoDeep, size: 2.6, head: 8 }));

  let mixed = panel(0, 0, PW, PH, T.cream, rng) + head('Mixed scanning: Etzioni', 'quick look at all, close look at a few');
  const focus = [3, 4, 5, 9, 10, 11];
  const [fx0, fy0] = pt(3);
  const zone = roundRectD(fx0 - 22, fy0 - 22, 2 * SP + 44, SP + 44, 12);
  mixed += cut(zone, { rng, fill: T.butter, shadow: false, jitter: 0.6, filter: FLAT }) + L(ink(zone, { rng, size: 1.8 }));
  mixed += field(all('glance').map((k, i) => (focus.includes(i) ? 'seen' : k))) + pick(11);

  // Legend under the panels.
  const legend = (x, y) => {
    const items = [['seen', 'looked at closely'], ['glance', 'a quick glance'], ['none', 'not considered'], ['now', 'the status quo']];
    let s = '';
    items.forEach(([k, text], i) => {
      const lx = x + (i % 2) * 226;
      const ly = y + Math.floor(i / 2) * 34;
      if (k === 'now') s += `<rect x="${lx - 10}" y="${ly - 17}" width="20" height="20" fill="${P.kraft}" stroke="${P.ink}" stroke-width="1.8"/>`;
      else s += `<circle cx="${lx}" cy="${ly - 7}" r="10" fill="${k === 'seen' ? P.civic : k === 'glance' ? T.sky : P.paper}" stroke="${P.ink}" stroke-width="1.6"/>`;
      s += label(lx + 18, ly, text, { size: 20, anchor: 'start', weight: 500 });
    });
    s += star(x + 452, y - 6, 14, { fill: P.butter, seed: 3 });
    s += label(x + 472, y + 1, 'the choice', { size: 20, anchor: 'start', weight: 500 });
    return s;
  };
  const legendN = (x, y) => {
    const items = [['seen', 'looked at closely'], ['glance', 'a quick glance'], ['none', 'not considered'], ['now', 'the status quo']];
    let s = '';
    items.forEach(([k, text], i) => {
      const ly = y + i * 32;
      if (k === 'now') s += `<rect x="${x - 10}" y="${ly - 17}" width="20" height="20" fill="${P.kraft}" stroke="${P.ink}" stroke-width="1.8"/>`;
      else s += `<circle cx="${x}" cy="${ly - 7}" r="10" fill="${k === 'seen' ? P.civic : k === 'glance' ? T.sky : P.paper}" stroke="${P.ink}" stroke-width="1.6"/>`;
      s += label(x + 18, ly, text, { size: 20, anchor: 'start', weight: 500 });
    });
    s += star(x, y + 4 * 32 - 7, 14, { fill: P.butter, seed: 3 });
    s += label(x + 18, y + 4 * 32, 'the choice', { size: 20, anchor: 'start', weight: 500 });
    return s;
  };
  const panels = [rational, satisfice, incremental, mixed];
  const wide = [[12, 12], [366, 12], [12, 282], [366, 282]];
  return {
    W: 720, H: 628, b: panels.map((p, i) => at(...wide[i], p)).join('') + legend(40, 576),
    narrow: { W: 366, H: 1276, b: panels.map((p, i) => at(12, 12 + i * 268, p)).join('') + legendN(40, 1110) },
  };
}

// The planner's role: four answers to "whose interests does planning serve?"
function plannerRoles() {
  const rng = makeRng(2203);
  const PW = 342;
  const PH = 290;
  const head = (heading, sub) => title(20, 40, heading, { size: 24, anchor: 'start' }) + label(20, 70, sub, { size: 20, anchor: 'start', color: MUTED, weight: 500 });
  const sheet = (x, y, text, fill, rot = 0) => {
    const d = rectD(x, y, 88, 70);
    let s = cut(d, { rng, fill, filter: FLAT }) + L(ink(d, { rng, size: 2 }));
    for (let k = 0; k < 3; k++) s += L(inkLine([[x + 12, y + 16 + k * 10], [x + 76 - k * 10, y + 16 + k * 10]], { rng, size: 1.3, overshoot: 0, opacity: 0.6 }));
    s += label(x + 44, y + 62, text, { size: 19, weight: 700 });
    return `<g transform="rotate(${rot} ${x + 44} ${y + 35})">${s}</g>`;
  };
  const planner = (x, y, flip = false) => person(x, y, 1.25, { coat: P.tomato, prop: flip ? undefined : 'clipboard', flip, seed: 7 });
  const crowd = (x, y, seed) => [0, 1, 2].map((k) => person(x + k * 30, y + (k % 2) * 6, 1.05, { coat: [P.leaf, P.civic, P.lavender][k], hair: [P.ink, P.kraftDeep, P.ink][k], seed: seed + k, flip: true })).join('');

  let tech = panel(0, 0, PW, PH, T.cream, rng) + head('Technician', 'the rational model');
  tech += planner(52, 214);
  tech += sheet(110, 118, 'the plan', P.paper, -3);
  tech += crowd(242, 214, 40);
  tech += L(arrow(206, 160, 228, 160, rng, { size: 2.4, head: 10 }));
  tech += note(20, 266, 'one plan for one public interest', { size: 24, anchor: 'start' });

  let adv = panel(0, 0, PW, PH, T.cream, rng) + head('Advocate', 'Davidoff');
  adv += sheet(34, 92, 'city plan', P.paper, -3);
  adv += sheet(206, 92, 'our plan', T.butter, 3);
  adv += planner(196, 236, false);
  adv += crowd(242, 236, 50);
  adv += label(120, 210, 'versus', { size: 19, color: MUTED, weight: 500 });
  adv += note(20, 266, 'speaks for a group left out', { size: 24, anchor: 'start' });

  let eq = panel(0, 0, PW, PH, T.cream, rng) + head('Equity planner', 'Krumholz');
  eq += cityHall(22, 214, 110, 110, { seed: 3 });
  eq += planner(158, 214, true);
  eq += house(232, 214, 40, 52, { seed: 5, wall: P.sky, roof: P.civic, chimney: false });
  eq += house(282, 214, 36, 46, { seed: 6, wall: P.blush, roof: P.tomato, chimney: false });
  eq += L(arrow(176, 140, 262, 140, rng, { color: P.leafDeep, size: 2.6, head: 11, bend: -16 }));
  eq += label(222, 112, 'resources', { size: 19, color: P.leafDeep });
  eq += note(20, 266, 'inside city hall, for those with least', { size: 24, anchor: 'start' });

  let mutual = panel(0, 0, PW, PH, T.cream, rng) + head('Mutual learner', 'Friedmann');
  mutual += planner(40, 236);
  mutual += person(302, 236, 1.25, { coat: P.leaf, seed: 9, flip: true });
  mutual += label(171, 108, 'technical knowledge', { size: 19, color: P.civicDeep });
  mutual += L(arrow(92, 122, 250, 122, rng, { color: P.civicDeep, size: 2.4, head: 10 }));
  mutual += L(arrow(250, 150, 92, 150, rng, { color: P.leafDeep, size: 2.4, head: 10 }));
  mutual += label(171, 178, 'experiential knowledge', { size: 19, color: P.leafDeep });
  mutual += note(20, 266, 'face to face, each learns', { size: 24, anchor: 'start' });

  const panels = [tech, adv, eq, mutual];
  const wide = [[12, 12], [366, 12], [12, 316], [366, 316]];
  return {
    W: 720, H: 620, b: panels.map((p, i) => at(...wide[i], p)).join(''),
    narrow: { W: 366, H: 1228, b: panels.map((p, i) => at(12, 12 + i * 302, p)).join('') },
  };
}

// Campbell's planner's triangle: the three E's pull against each other.
function plannersTriangle() {
  const rng = makeRng(2204);
  const W = 720;
  const H = 548;
  let b = '';
  const A = [360, 92]; // environment
  const B = [128, 440]; // economy
  const C = [592, 440]; // equity
  const tri = polyD([A, B, C]);
  b += cut(tri, { rng, fill: T.sage, jitter: 0.8, filter: FLAT });
  b += L(ink(tri, { rng, size: 2.4 }));
  // The planner in the middle.
  const cx = (A[0] + B[0] + C[0]) / 3;
  const cy = (A[1] + B[1] + C[1]) / 3;
  const mid = ellipseD(cx, cy + 22, 104, 58);
  b += cut(mid, { rng, fill: P.paper, filter: FLAT }) + L(ink(mid, { rng, size: 1.8 }));
  b += label(cx, cy + 18, 'sustainable');
  b += label(cx, cy + 50, 'development');
  b += person(cx, cy - 36, 1.1, { coat: P.tomato, prop: 'clipboard', seed: 4 });
  const corner = ([x, y], text, fill, dy) => {
    const d = ellipseD(x, y, 30, 30);
    return cut(d, { rng, fill, filter: FLAT }) + L(ink(d, { rng, size: 2.6 })) + title(x, y + dy, text, { size: 30 });
  };
  b += corner(A, 'Environment', P.leaf, -44);
  b += corner(B, 'Economy', P.butter, 74);
  b += corner(C, 'Equity', P.tomato, 74);
  // Conflict labels along each side, turned to follow it.
  const side = (P1, P2, text, out) => {
    const mx = (P1[0] + P2[0]) / 2;
    const my = (P1[1] + P2[1]) / 2;
    let ang = (Math.atan2(P2[1] - P1[1], P2[0] - P1[0]) * 180) / Math.PI;
    if (ang > 90 || ang < -90) ang += 180;
    const nx = -(P2[1] - P1[1]);
    const ny = P2[0] - P1[0];
    const len = Math.hypot(nx, ny);
    const x = mx + (nx / len) * out;
    const y = my + (ny / len) * out;
    return `<g transform="rotate(${ang.toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)})">${label(x, y + 10, text, { color: P.tomatoDeep })}</g>`;
  };
  b += side(A, B, 'resource conflict', 30);
  b += side(C, A, 'development conflict', 30);
  b += side(B, C, 'property conflict', 34);
  return { W, H, b };
}

// ============================================================ Lesson 2.3

// Burgess, Hoyt, and Harris-Ullman: three pictures of the same city.
function urbanModels() {
  const rng = makeRng(2301);
  const PW = 228;
  const PH = 438;
  const R = 96;
  const cx = PW / 2;
  const cy = 164;
  const key = (items, y0) => items.map((t, i) => label(14, y0 + i * 27, `${i + 1}  ${t}`, { size: 19, anchor: 'start', weight: 500 })).join('');
  const num = (x, y, n, color = P.ink) => label(x, y + 7, String(n), { size: 20, weight: 800, color });
  const head = (t, who) => title(PW / 2, 34, t, { size: 23 }) + label(PW / 2, 60, who, { size: 19, color: MUTED, weight: 500 });

  // Concentric zones.
  let conc = panel(0, 0, PW, PH, T.cream, rng) + head('Concentric zones', 'Burgess');
  const ringFill = [P.sage, P.sky, P.butter, P.blush, P.tomato];
  [R, R * 0.8, R * 0.6, R * 0.4, R * 0.2].forEach((r, i) => {
    const d = ellipseD(cx, cy, r, r);
    conc += cut(d, { rng, fill: ringFill[i], shadow: i === 0, jitter: 0.5, filter: FLAT }) + L(ink(d, { rng, size: 1.8 }));
  });
  for (let i = 0; i < 5; i++) conc += num(cx, cy - R * (0.1 + i * 0.2) + (i === 0 ? R * 0.1 : 0), i + 1, i === 0 ? '#FFFFFF' : P.ink);
  conc += key(['CBD', 'zone in transition', 'working-class homes', 'middle-class homes', 'commuter zone'], 300);

  // Sectors: wedges out from the center, high rent along one corridor.
  let sect = panel(0, 0, PW, PH, T.cream, rng) + head('Sectors', 'Hoyt');
  // [start angle, end angle, class] in degrees, clockwise from east.
  const wedges = [[-120, -60, 5], [-60, -25, 4], [-25, 20, 3], [20, 75, 2], [75, 130, 3], [130, 180, 4], [180, 240, 4]];
  const fillOf = { 2: P.lavender, 3: P.butter, 4: P.sky, 5: P.leaf };
  const pt = (a, r) => [cx + Math.cos((a * Math.PI) / 180) * r, cy + Math.sin((a * Math.PI) / 180) * r];
  for (const [a0, a1, k] of wedges) {
    const pts = [[cx, cy]];
    for (let a = a0; a <= a1 + 0.1; a += 5) pts.push(pt(a, R));
    const d = polyD(pts);
    sect += cut(d, { rng, fill: fillOf[k], shadow: false, jitter: 0.4, filter: FLAT }) + L(ink(d, { rng, size: 1.6 }));
    const mid = k === 5 ? -72 : k === 2 ? 58 : (a0 + a1) / 2;
    sect += num(...pt(mid, R * 0.66), k);
  }
  const hub = ellipseD(cx, cy, R * 0.2, R * 0.2);
  sect += cut(hub, { rng, fill: P.tomato, filter: FLAT }) + L(ink(hub, { rng, size: 1.8 })) + num(cx, cy, 1, '#FFFFFF');
  // The corridor the high-rent wedge follows, and a rail line through industry.
  sect += L(inkLine([pt(-100, R * 0.22), pt(-100, R - 4)], { rng, size: 3, color: P.leafDeep, overshoot: 0 }));
  sect += L(inkLine([pt(32, R * 0.22), pt(32, R - 4)], { rng, size: 2.4, overshoot: 0 }));
  sect += key(['CBD', 'industry', 'lower-rent homes', 'middle-rent homes', 'high-rent homes'], 300);

  // Multiple nuclei.
  let nuc = panel(0, 0, PW, PH, T.cream, rng) + head('Multiple nuclei', 'Harris and Ullman');
  const base = ellipseD(cx, cy, R, R);
  nuc += cut(base, { rng, fill: P.butter, jitter: 0.5, filter: FLAT }) + L(ink(base, { rng, size: 1.8 }));
  const nuclei = [[cx - 18, cy - 20, 24, 20, P.tomato, 1], [cx + 50, cy + 30, 30, 22, P.lavender, 2], [cx - 46, cy + 50, 22, 18, P.sky, 3], [cx + 34, cy - 58, 20, 16, P.leaf, 4]];
  nuclei.forEach(([x, y, rx, ry, fill, n], i) => {
    const d = blobD(x, y, rx, ry, makeRng(40 + i), 6, 0.12);
    nuc += cut(d, { rng, fill, filter: FLAT }) + L(ink(d, { rng, size: 1.8 })) + num(x, y, n, n === 1 ? '#FFFFFF' : P.ink);
  });
  nuc += key(['CBD', 'industrial district', 'university', 'outlying business'], 300);
  nuc += `<rect x="14" y="${300 + 4 * 27 - 16}" width="18" height="18" fill="${P.butter}" stroke="${P.ink}" stroke-width="1.4"/>`;
  nuc += label(42, 300 + 4 * 27, 'homes fill the rest', { size: 19, anchor: 'start', weight: 500 });

  const panels = [conc, sect, nuc];
  return {
    W: 720, H: 466, b: panels.map((q, i) => at(8 + i * 238, 14, q)).join(''),
    narrow: { W: 252, H: 1368, b: panels.map((q, i) => at(12, 12 + i * 452, q)).join('') },
  };
}

// Christaller's central places: three levels of hexagonal market areas,
// each town's hexagon passing through its six neighboring villages.
function centralPlace() {
  const rng = makeRng(2302);
  const W = 720;
  const H = 470;
  let b = '';
  const d = 46; // village spacing
  const ox = 230;
  const oy = 236;
  const P0 = (i, j) => [ox + d * (i + j / 2), oy + (d * j * Math.sqrt(3)) / 2];
  const hex = ([x, y], r, rot) => polyD([0, 1, 2, 3, 4, 5].map((k) => {
    const a = ((60 * k + rot) * Math.PI) / 180;
    return [x + Math.cos(a) * r, y + Math.sin(a) * r];
  }));
  const clip = `<clipPath id="cp-map"><path d="${roundRectD(24, 24, 412, 422, 18)}"/></clipPath>`;
  let small = '';
  let mid = '';
  let dots = '';
  for (let j = -7; j <= 7; j++) {
    for (let i = -9; i <= 9; i++) {
      const p = P0(i, j);
      if (p[0] < 0 || p[0] > 460 || p[1] < 0 || p[1] > 470) continue;
      // Villages: every lattice point. Towns: one in three (K = 3). City: one in nine.
      const town = ((i - j) % 3 + 3) % 3 === 0;
      const city = town && i === 0 && j === 0;
      small += `<path d="${hex(p, d / Math.sqrt(3), 30)}" fill="none" stroke="${P.leafDeep}" stroke-width="1.2" opacity="0.55"/>`;
      if (town) mid += `<path d="${hex(p, d, 0)}" fill="none" stroke="${P.civicDeep}" stroke-width="2.4"/>`;
      dots += city ? '' : town
        ? `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="8" fill="${P.civic}" stroke="${P.ink}" stroke-width="1.8"/>`
        : `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="4.5" fill="${P.leaf}" stroke="${P.ink}" stroke-width="1.4"/>`;
    }
  }
  const cityHex = `<path d="${hex([ox, oy], d * Math.sqrt(3), 30)}" fill="${T.blush}" stroke="${P.tomatoDeep}" stroke-width="3.2"/>`;
  b += panel(24, 24, 412, 422, T.cream, rng, 18);
  b += `<defs>${clip}</defs><g clip-path="url(#cp-map)">${cityHex}${small}${mid}${dots}</g>`;
  b += star(ox, oy, 17, { fill: P.tomato, seed: 8, size: 2.4 });
  const lx = 466;
  const item = (y, mark, name, what, color) => mark + label(lx + 34, y, name, { anchor: 'start', color }) + label(lx + 34, y + 32, what, { anchor: 'start', weight: 500, color: MUTED });
  b += item(70, star(lx + 10, 60, 14, { fill: P.tomato, seed: 9 }), 'city', 'a hospital', P.tomatoDeep);
  b += item(170, `<circle cx="${lx + 10}" cy="160" r="9" fill="${P.civic}" stroke="${P.ink}" stroke-width="1.8"/>`, 'town', 'mid-level goods', P.civicDeep);
  b += item(270, `<circle cx="${lx + 10}" cy="260" r="5" fill="${P.leaf}" stroke="${P.ink}" stroke-width="1.4"/>`, 'village', 'a corner store', P.leafDeep);
  b += note(lx, 390, 'bigger threshold,', { anchor: 'start' });
  b += note(lx, 426, 'longer range', { anchor: 'start' });
  return { W, H, b };
}

// Suburbanization in waves: streetcar fingers, then cars fill between,
// then an edge city at a freeway interchange.
function suburbanWaves() {
  const rng = makeRng(2303);
  const W = 720;
  const H = 480;
  let b = '';
  const c = [220, 240];
  const pol = (a, r) => [c[0] + Math.cos(a) * r, c[1] + Math.sin(a) * r];
  b += panel(20, 20, 400, 440, T.cream, rng, 18);
  // Automobile suburbs: loops and cul-de-sacs filling the gaps.
  const autoSpots = [[0.75, 150], [2.6, 150], [4.2, 150], [0.15, 168], [1.45, 170], [3.1, 158], [4.6, 176]];
  for (const [a, r] of autoSpots) {
    const [x, y] = pol(a, r);
    const blob = blobD(x, y, 34, 26, makeRng(Math.round(a * 10)), 6, 0.12);
    b += cut(blob, { rng, fill: T.butter, shadow: false, jitter: 0.5, filter: FLAT });
    b += L(ink(`M${x - 22} ${y}h30M${x + 8} ${y}v-14M${x - 8} ${y}v12`, { rng, size: 1.6, opacity: 0.7 }));
    b += `<circle cx="${x + 8}" cy="${y - 16}" r="4" fill="${P.kraft}"/><circle cx="${x - 8}" cy="${y + 14}" r="4" fill="${P.kraft}"/>`;
  }
  // Freeway ring and one radial, with an interchange.
  const ring = ellipseD(c[0], c[1], 118, 118);
  b += `<path d="${ring}" fill="none" stroke="#9C95A8" stroke-width="12"/>`;
  const fwA = pol(-0.6, 30);
  const fwB = pol(-0.6, 230);
  b += `<path d="M${fwA[0]} ${fwA[1]}L${fwB[0]} ${fwB[1]}" stroke="#9C95A8" stroke-width="12"/>`;
  // Streetcar lines with development strung along them.
  const lines = [2.0, 3.6, 5.0];
  for (const a of lines) {
    const p0 = pol(a, 30);
    const p1 = pol(a, 200);
    for (let r = 44; r < 190; r += 20) {
      for (const side of [-1, 1]) {
        const [x, y] = pol(a + side * (14 / r), r);
        b += `<rect x="${(x - 6).toFixed(1)}" y="${(y - 6).toFixed(1)}" width="12" height="12" fill="${P.tomato}" stroke="${P.ink}" stroke-width="1.2"/>`;
      }
    }
    b += L(inkLine([p0, p1], { rng, size: 2.6, overshoot: 0 }));
    const len = 170;
    for (let t = 6; t < len; t += 10) {
      const [x, y] = pol(a, 30 + t);
      const nx = -Math.sin(a) * 5;
      const ny = Math.cos(a) * 5;
      b += L(inkLine([[x - nx, y - ny], [x + nx, y + ny]], { rng, size: 1.2, overshoot: 0 }));
    }
  }
  // Edge city at the interchange.
  const [ex, ey] = pol(-0.6, 118);
  b += block(ex + 6, ey + 4, 26, 62, { seed: 3, wall: P.lavender, cols: 2, rows: 5 });
  b += block(ex - 26, ey + 10, 28, 44, { seed: 4, wall: P.sky, cols: 2, rows: 3 });
  b += block(ex + 34, ey + 12, 24, 36, { seed: 5, wall: P.butter, cols: 2, rows: 3 });
  // Downtown.
  b += block(c[0] - 26, c[1] + 18, 22, 60, { seed: 6, wall: P.civic, cols: 2, rows: 5 });
  b += block(c[0] - 2, c[1] + 18, 26, 78, { seed: 7, wall: P.tomato, cols: 2, rows: 6 });
  b += block(c[0] + 26, c[1] + 18, 20, 46, { seed: 8, wall: P.lavender, cols: 2, rows: 4 });
  const lx = 448;
  const call = (y, lines2, color, tx, ty, bend = 10) => lines2.map((t, k) => label(lx, y + k * 32, t, { anchor: 'start', color })).join('') + L(arrow(lx - 8, y - 8, tx, ty, rng, { color, size: 2.2, head: 10, bend }));
  b += call(60, ['edge city at an', 'interchange'], P.ink, ex + 60, ey - 30, 10);
  b += call(196, ['downtown'], P.ink, c[0] + 50, c[1] - 20, -8);
  b += call(290, ['streetcar suburbs', 'along the lines'], P.tomatoDeep, pol(2.0, 96)[0] + 20, pol(2.0, 96)[1] + 4, -10);
  b += call(398, ['car suburbs fill', 'in between'], P.kraftDeep, pol(0.75, 150)[0] + 36, pol(0.75, 150)[1] + 6, 10);
  return { W, H, b };
}

// Segregation's tools and the rulings that closed them, on a to-scale
// vertical time line.
function segregationTimeline() {
  const rng = makeRng(2304);
  const W = 720;
  const H = 520;
  let b = '';
  const ax = 112;
  const Y = (yr) => 40 + ((yr - 1910) / 65) * 430;
  b += L(inkLine([[ax, Y(1910) - 10], [ax, Y(1975) + 10]], { rng, size: 3, overshoot: 0 }));
  for (const yr of [1910, 1930, 1950, 1970]) {
    b += L(inkLine([[ax - 8, Y(yr)], [ax, Y(yr)]], { rng, size: 2, overshoot: 0 }));
    b += label(ax - 16, Y(yr) + 10, String(yr), { anchor: 'end', color: MUTED, weight: 500 });
  }
  // The 1930s HOLC maps as a span.
  const span = roundRectD(ax - 9, Y(1930), 18, Y(1940) - Y(1930), 8);
  b += cut(span, { rng, fill: P.tomato, filter: FLAT }) + L(ink(span, { rng, size: 2 }));
  const ev = (yr, color, name, what, italic) => {
    const y = Y(yr);
    let s = `<circle cx="${ax}" cy="${y}" r="10" fill="${color}" stroke="${P.ink}" stroke-width="2"/>`;
    s += L(inkLine([[ax + 14, y], [ax + 40, y]], { rng, size: 1.8, overshoot: 0 }));
    s += serif(ax + 52, y + 2, name, { size: 28, italic, anchor: 'start' });
    s += label(ax + 52, y + 36, what, { anchor: 'start', weight: 500, color: MUTED });
    return s;
  };
  b += ev(1917, P.butter, 'Buchanan v. Warley, 1917', 'racial zoning struck down', true);
  b += ev(1935, P.tomato, 'HOLC maps, 1930s', 'redlining starves areas of credit', false);
  b += ev(1948, P.butter, 'Shelley v. Kraemer, 1948', 'courts can’t enforce racial covenants', true);
  b += ev(1968, P.leaf, 'Fair Housing Act, 1968', 'housing discrimination prohibited', false);
  b += note(ax + 52, Y(1926) + 14, 'segregation shifts to covenants', { color: P.tomatoDeep, anchor: 'start' });
  b += note(ax + 52, Y(1957) + 10, 'and on to renewal, highways, zoning', { color: P.tomatoDeep, anchor: 'start' });
  return { W, H, b };
}

// Kevin Lynch's five elements on one small city map.
function lynchElements() {
  const rng = makeRng(2305);
  const W = 720;
  const H = 520;
  let b = '';
  b += panel(20, 20, 380, 480, T.cream, rng, 18);
  // District: a textured warehouse district in the upper left.
  const dist = polyD([[34, 34], [220, 34], [200, 200], [34, 214]]);
  b += cut(dist, { rng, fill: T.lav, shadow: false, jitter: 0.6, filter: FLAT });
  b += hatch(dist, { rng, angle: 40, gap: 12, opacity: 0.3, size: 1.2 });
  // Edge: a river along the bottom right.
  const river = `M180 506C220 440 300 420 400 392L400 470C320 488 280 500 250 506Z`;
  b += cut(river, { rng, fill: P.sky, shadow: false, jitter: 0.6 }) + L(ink('M180 506C220 440 300 420 400 392', { rng, size: 2.2, color: P.civicDeep }));
  // Paths: two main streets and a transit line.
  const streets = ['M34 260H400', 'M250 34V440'];
  for (const d of streets) b += `<path d="${d}" stroke="#FFFDF8" stroke-width="16" stroke-linecap="round"/>`;
  b += L(streets.map((d) => ink(d, { rng, size: 1.4, opacity: 0.6 })).join(''));
  b += `<path d="M34 262H400" stroke="${P.tomato}" stroke-width="4" stroke-dasharray="14 8"/>`;
  // Node: a square at the crossing.
  const sq = rectD(226, 236, 48, 48);
  b += cut(sq, { rng, fill: P.butter, filter: FLAT }) + L(ink(sq, { rng, size: 2.2 }));
  // Landmark: a tower that shows from far away.
  const tower = polyD([[322, 196], [322, 110], [334, 84], [346, 110], [346, 196]]);
  b += cut(tower, { rng, fill: P.kraft }) + L(ink(tower, { rng, size: 2.2 }));
  b += `<rect x="330" y="120" width="8" height="10" fill="${P.paper}"/>`;
  for (const [x, y] of [[70, 330], [110, 380], [80, 430], [330, 300], [150, 310]]) {
    const d = rectD(x, y, 26, 22);
    b += cut(d, { rng, fill: P.paper, shadow: false, filter: FLAT }) + L(ink(d, { rng, size: 1.4, opacity: 0.7 }));
  }
  const lx = 432;
  const call = (y, name, what, color, tx, ty, bend = 10) => label(lx, y, name, { anchor: 'start', color, weight: 800 })
    + label(lx, y + 32, what, { anchor: 'start', weight: 500, color: MUTED })
    + L(arrow(lx - 8, y - 8, tx, ty, rng, { color, size: 2.2, head: 10, bend }));
  b += call(70, 'District', 'a distinct area', P.ink, 206, 66, 0);
  b += call(160, 'Landmark', 'towers, peaks', P.kraftDeep, 352, 150, 8);
  b += call(260, 'Node', 'squares, stations', P.butterDeep === undefined ? P.ink : P.ink, 280, 262, 8);
  b += call(350, 'Path', 'streets, transit', P.tomatoDeep, 330, 268, -10);
  b += call(440, 'Edge', 'rivers, freeways', P.civicDeep, 360, 412, 10);
  return { W, H, b };
}

// ============================================================ Lesson 2.4

// A rubber stamp: an inked frame with a word, turned a little.
function stamp(x, y, text, color, rng, { size = 22, rot = -8 } = {}) {
  const w = text.length * size * 0.7 + 28;
  const h = size + 22;
  const d = roundRectD(x - w / 2, y - h / 2, w, h, 8);
  return `<g transform="rotate(${rot} ${x} ${y})"><path d="${d}" fill="#FFFDF8" opacity="0.85"/>${L(ink(d, { rng, size: 3, color }))}${label(x, y + size * 0.36, text, { size, color, weight: 800 })}</g>`;
}

// Where local land use power comes from: the state's police power, passed
// down by enabling acts, read narrowly (Dillon's Rule) or broadly (home rule).
function powerFlow() {
  const rng = makeRng(2401);
  const W = 720;
  const H = 470;
  let b = '';
  b += cityHall(34, 300, 150, 150, { seed: 12 });
  b += title(109, 346, 'The state', { size: 30 });
  b += label(109, 380, 'holds the', { color: MUTED, weight: 500 });
  b += label(109, 412, 'police power', { color: MUTED, weight: 500 });
  // Two cities, two widths of grant.
  const narrowPipe = `M196 212C260 200 300 150 350 132`;
  b += L(arrow(196, 212, 352, 130, rng, { size: 2.4, head: 12, bend: -18 }));
  const wide = polyD([[196, 262], [300, 300], [300, 286], [352, 318], [300, 350], [300, 336], [196, 302]]);
  b += cut(wide, { rng, fill: P.butter, filter: FLAT }) + L(ink(wide, { rng, size: 2 }));
  void narrowPipe;
  b += note(222, 70, 'enabling acts', { anchor: 'start', rotate: -3 });
  b += L(arrow(250, 80, 268, 150, rng, { color: P.civicDeep, size: 2, head: 10, bend: 8 }));
  b += block(360, 164, 60, 74, { seed: 14, wall: P.sky, cols: 2, rows: 3 });
  b += block(360, 360, 60, 74, { seed: 15, wall: P.blush, cols: 2, rows: 3 });
  const lx = 444;
  b += title(lx, 104, 'Dillon’s Rule', { anchor: 'start', size: 30 });
  b += label(lx, 140, 'only what’s granted,', { anchor: 'start' });
  b += label(lx, 172, 'implied, or essential', { anchor: 'start' });
  b += title(lx, 300, 'Home rule', { anchor: 'start', size: 30 });
  b += label(lx, 336, 'broad power over', { anchor: 'start' });
  b += label(lx, 368, 'local affairs', { anchor: 'start' });
  b += note(360, 448, 'no grant, no power: cities have none of their own', { color: P.tomatoDeep, size: 35 });
  return { W, H, b };
}

// Euclid (facial) versus Nectow (as applied), on the same zoning map.
function facialAsApplied() {
  const rng = makeRng(2402);
  const PW = 338;
  const PH = 412;
  const zone = { R: P.butter, C: P.tomato, I: P.lavender };
  const grid = ['RRRCC', 'RRCCI', 'RRIII', 'RRRII'];
  const map = (hl) => {
    let s = '';
    grid.forEach((row, r) => [...row].forEach((z, c) => {
      const d = rectD(34 + c * 54, 104 + r * 54, 52, 52);
      s += cut(d, { rng, fill: zone[z], shadow: false, jitter: 0.4, filter: FLAT }) + L(ink(d, { rng, size: 1.4, opacity: 0.8 }));
    }));
    if (hl) {
      const [c, r] = hl;
      const d = rectD(34 + c * 54 - 3, 104 + r * 54 - 3, 58, 58);
      s += L(ink(d, { rng, size: 4, color: P.tomatoDeep }));
    }
    return s;
  };
  const keyRow = (y) => [['R', 'homes'], ['C', 'shops'], ['I', 'industry']].map(([z, t], i) => `<rect x="${34 + i * 96}" y="${y - 16}" width="18" height="18" fill="${zone[z]}" stroke="${P.ink}" stroke-width="1.4"/>` + label(58 + i * 96, y, t, { size: 19, anchor: 'start', weight: 500 })).join('');
  let euclid = panel(0, 0, PW, PH, T.cream, rng);
  euclid += title(20, 40, 'Euclid, 1926', { size: 25, anchor: 'start', italic: true });
  euclid += label(20, 72, 'facial: the whole ordinance', { size: 20, anchor: 'start', color: MUTED, weight: 500 });
  euclid += map(null) + stamp(169, 212, 'VALID', P.leafDeep, rng, { size: 30, rot: -10 });
  euclid += keyRow(346);
  let nectow = panel(0, 0, PW, PH, T.cream, rng);
  nectow += title(20, 40, 'Nectow, 1928', { size: 25, anchor: 'start', italic: true });
  nectow += label(20, 72, 'as applied: one parcel', { size: 20, anchor: 'start', color: MUTED, weight: 500 });
  nectow += map([2, 3]) + stamp(184, 352, 'INVALID HERE', P.tomatoDeep, rng, { size: 19, rot: -4 });
  nectow += note(20, 396, 'homes zoned amid industry', { size: 24, anchor: 'start', color: P.tomatoDeep });
  return {
    W: 720, H: 440, b: at(14, 14, euclid) + at(368, 14, nectow),
    narrow: { W: 366, H: 866, b: at(14, 14, euclid) + at(14, 440, nectow) },
  };
}

// Belle Terre versus Moore: who a household limit may and may not reach.
function householdCases() {
  const rng = makeRng(2403);
  const PW = 338;
  const PH = 390;
  const scene = (heading, sub, people, verdict, color, why, sx = 250) => {
    let s = panel(0, 0, PW, PH, T.cream, rng);
    s += title(20, 40, heading, { size: 25, anchor: 'start', italic: true });
    s += label(20, 72, sub, { size: 20, anchor: 'start', color: MUTED, weight: 500 });
    s += house(94, 262, 150, 150, { seed: 17, wall: T.butter, roof: P.kraftDeep, chimney: true });
    s += people;
    s += stamp(sx, 132, verdict, color, rng, { size: 20, rot: 8 });
    s += note(20, 334, why[0], { size: 24, anchor: 'start', color });
    s += note(20, 366, why[1], { size: 24, anchor: 'start', color });
    return s;
  };
  const mates = [[70, P.civic, P.ink], [120, P.leaf, P.kraftDeep], [170, P.lavender, P.ink], [220, P.tomato, P.kraftDeep], [270, P.sky, P.ink]]
    .map(([x, coat, hair], i) => person(x, 292, 1.05, { coat, hair, seed: 60 + i, flip: i % 2 === 1 })).join('');
  const family = person(120, 292, 1.15, { coat: P.lavender, hair: '#CFC8D8', seed: 70 })
    + person(176, 292, 0.8, { coat: P.civic, seed: 71, flip: true }) + person(220, 292, 0.8, { coat: P.leaf, hair: P.kraftDeep, seed: 72, flip: true });
  const belle = scene('Belle Terre, 1974', 'a cap on unrelated housemates', mates, 'UPHELD', P.leafDeep, ['rational basis: quiet family', 'neighborhoods are legitimate']);
  const moore = scene('Moore, 1977', 'a narrow definition of family', family, 'STRUCK DOWN', P.tomatoDeep, ['a grandmother and two', 'grandsons: family life wins'], 226);
  return {
    W: 720, H: 418, b: at(14, 14, belle) + at(368, 14, moore),
    narrow: { W: 366, H: 822, b: at(14, 14, belle) + at(14, 418, moore) },
  };
}

// Reed v. Town of Gilbert: rules keyed to a sign's message versus rules that
// treat every sign alike.
function signContent() {
  const rng = makeRng(2404);
  const PW = 338;
  const PH = 350;
  const sign = (cx, base, w, h, text, fill) => {
    let s = L(inkLine([[cx, base], [cx, base - h - 40]], { rng, size: 3, overshoot: 0 }));
    const d = rectD(cx - w / 2, base - h - 60, w, h);
    s += cut(d, { rng, fill, filter: FLAT }) + L(ink(d, { rng, size: 2.2 }));
    s += label(cx, base - 60 - h / 2 + 7, text, { size: 19, weight: 800 });
    return s;
  };
  let based = panel(0, 0, PW, PH, T.cream, rng);
  based += title(20, 40, 'Content-based', { size: 25, anchor: 'start' });
  based += label(20, 72, 'the rule depends on the message', { size: 20, anchor: 'start', color: MUTED, weight: 500 });
  based += sign(70, 270, 110, 96, 'IDEAS', P.sky) + sign(186, 270, 96, 70, 'VOTE', P.butter) + sign(282, 270, 84, 38, 'EVENT', P.blush);
  based += L(inkLine([[20, 270], [318, 270]], { rng, size: 2, overshoot: 0 }));
  based += note(20, 322, 'strict scrutiny: usually falls', { size: 24, anchor: 'start', color: P.tomatoDeep });
  let neutral = panel(0, 0, PW, PH, T.cream, rng);
  neutral += title(20, 40, 'Content-neutral', { size: 25, anchor: 'start' });
  neutral += label(20, 72, 'size, place, time: same for all', { size: 20, anchor: 'start', color: MUTED, weight: 500 });
  neutral += L(dashed(18, 118, 322, 118, rng, { color: P.civicDeep, size: 1.8 }));
  neutral += label(322, 110, 'size limit', { size: 19, anchor: 'end', color: P.civicDeep, weight: 500 });
  neutral += sign(66, 270, 84, 66, 'IDEAS', P.sky) + sign(170, 270, 84, 66, 'VOTE', P.butter) + sign(274, 270, 84, 66, 'EVENT', P.blush);
  neutral += L(inkLine([[20, 270], [318, 270]], { rng, size: 2, overshoot: 0 }));
  neutral += note(20, 322, 'the safe way to write a code', { size: 24, anchor: 'start', color: P.leafDeep });
  return {
    W: 720, H: 378, b: at(14, 14, based) + at(368, 14, neutral),
    narrow: { W: 366, H: 742, b: at(14, 14, based) + at(14, 378, neutral) },
  };
}

// ============================================================ Lesson 2.5

// Is a regulation a taking? Two per se questions, then Penn Central.
function takingsRoute() {
  const rng = makeRng(2501);
  const W = 720;
  const H = 560;
  let b = '';
  const box = (x, y, w, h, fill, lines, { head } = {}) => {
    const d = roundRectD(x, y, w, h, 14);
    let s = cut(d, { rng, fill, filter: FLAT }) + L(ink(d, { rng, size: 2.2 }));
    let ty = y + 40;
    if (head) { s += title(x + 20, ty, head, { anchor: 'start', size: 30 }); ty += 36; }
    lines.forEach((t, k) => { s += label(x + 20, ty + k * 32, t, { anchor: 'start', weight: head ? 500 : 600 }); });
    return s;
  };
  b += box(20, 20, 400, 104, T.sky, ['Does government occupy it,', 'or give others access?']);
  b += box(20, 196, 400, 104, T.sky, ['Does it wipe out all', 'economic use?']);
  b += box(20, 372, 682, 170, T.sage, ['1 economic impact', '2 investment-backed expectations', '3 character of the action'], { head: 'Penn Central: weigh' });
  b += box(476, 20, 226, 136, T.blush, ['Loretto,', 'Cedar Point'], { head: 'Per se taking' });
  b += box(476, 196, 226, 136, T.blush, ['Lucas, unless', 'nuisance law'], { head: 'Per se taking' });
  const yes = (y) => L(arrow(424, y, 470, y, rng, { size: 2.6, head: 11 })) + label(447, y - 12, 'yes', { size: 28, color: P.tomatoDeep });
  const no = (y0, y1) => L(arrow(120, y0, 120, y1, rng, { size: 2.6, head: 11 })) + label(136, (y0 + y1) / 2 + 10, 'no', { anchor: 'start', color: P.civicDeep });
  b += yes(72) + yes(248);
  b += no(128, 190) + no(304, 366);
  b += note(684, 420, 'most claims', { anchor: 'end' });
  b += note(684, 456, 'end up here', { anchor: 'end' });
  return { W, H, b };
}

// Penn Central: measure the loss against the whole parcel, not the airspace.
function parcelAsWhole() {
  const rng = makeRng(2502);
  const W = 720;
  const H = 480;
  let b = '';
  const base = 420;
  // The blocked tower, drawn as a dashed outline in the air.
  const tx0 = 150;
  const tx1 = 320;
  const tTop = 40;
  const o = { color: P.tomatoDeep, size: 2.4 };
  b += `<rect x="${tx0}" y="${tTop}" width="${tx1 - tx0}" height="${270 - tTop}" fill="${T.blush}" opacity="0.6"/>`;
  b += L(dashed(tx0, tTop, tx1, tTop, rng, o) + dashed(tx1, tTop, tx1, 270, rng, o) + dashed(tx0, 270, tx0, tTop, rng, o));
  b += label((tx0 + tx1) / 2, 150, 'the tower', { color: P.tomatoDeep });
  b += label((tx0 + tx1) / 2, 182, 'it blocked', { color: P.tomatoDeep });
  // The terminal.
  const term = polyD([[70, base], [70, 290], [120, 270], [350, 270], [400, 290], [400, base]]);
  b += cut(term, { rng, fill: P.kraft }) + L(ink(term, { rng, size: 2.6 }));
  for (const x of [110, 190, 270, 350]) {
    const w = `M${x - 22} ${base - 16}V${base - 72}A22 22 0 0 1 ${x + 22} ${base - 72}V${base - 16}Z`;
    b += cut(w, { rng, fill: P.paper, shadow: false, filter: FLAT }) + L(ink(w, { rng, size: 1.8 }));
  }
  b += label(235, 316, 'the terminal', { weight: 700 });
  b += L(inkLine([[40, base], [430, base]], { rng, size: 2.6, overshoot: 0 }));
  // Brackets: the airspace alone, and the whole parcel.
  const bracket = (x, y0, y1, color) => L(inkLine([[x + 10, y0], [x, y0], [x, y1], [x + 10, y1]], { rng, size: 2.4, color, overshoot: 0 }));
  b += bracket(40, tTop, 262, P.tomatoDeep);
  b += bracket(20, tTop, base, P.leafDeep);
  const lx = 452;
  b += title(lx, 90, 'Airspace alone', { anchor: 'start', size: 30, color: P.tomatoDeep });
  b += label(lx, 126, 'all of it lost', { anchor: 'start', weight: 500 });
  b += title(lx, 250, 'The whole parcel', { anchor: 'start', size: 30, color: P.leafDeep });
  b += label(lx, 286, 'still earns a', { anchor: 'start', weight: 500 });
  b += label(lx, 318, 'reasonable return', { anchor: 'start', weight: 500 });
  b += note(lx, 400, 'the Court used', { anchor: 'start' });
  b += note(lx, 436, 'the whole parcel', { anchor: 'start' });
  return { W, H, b };
}

// Exactions: two gates on one line, then the cases that widened the test.
function exactionGates() {
  const rng = makeRng(2503);
  const W = 720;
  const H = 520;
  let b = '';
  const y = 218;
  const band = roundRectD(40, y - 11, 640, 22, 11);
  b += cut(band, { rng, fill: P.civic }) + L(ink(band, { rng, size: 2.2 }));
  const stop = (x, n, fill) => {
    const d = ellipseD(x, y, 26, 26);
    return cut(d, { rng, fill, filter: FLAT }) + L(ink(d, { rng, size: 3 })) + title(x, y + 10, n);
  };
  b += stop(140, '1', P.butter) + stop(380, '2', P.butter);
  const end = roundRectD(560, y - 30, 130, 60, 14);
  b += cut(end, { rng, fill: P.leaf, filter: FLAT }) + L(ink(end, { rng, size: 2.6 })) + label(625, y + 10, 'stands', { color: '#FFFFFF', weight: 800 });
  b += title(140, 58, 'Essential nexus', { size: 28 });
  b += label(140, 92, 'Nollan, 1987', { color: MUTED, weight: 500 });
  b += label(140, 136, 'tied to the', {});
  b += label(140, 168, 'project’s impact?', {});
  b += title(380, 58, 'Rough', { size: 28 });
  b += title(380, 90, 'proportionality', { size: 28 });
  b += label(380, 124, 'Dolan, 1994', { color: MUTED, weight: 500 });
  b += label(380, 168, 'sized to it?', {});
  for (const x of [140, 380]) {
    b += L(arrow(x, y + 30, x, y + 88, rng, { color: P.tomatoDeep, size: 2.6, head: 11 }));
    b += label(x + 14, y + 66, 'no', { anchor: 'start', color: P.tomatoDeep });
    b += label(x, y + 124, 'fails', { color: P.tomatoDeep, weight: 800 });
  }
  b += label(260, y - 22, 'yes', { color: P.leafDeep });
  b += label(495, y - 22, 'yes', { color: P.leafDeep });
  const card = roundRectD(40, 390, 640, 112, 14);
  b += cut(card, { rng, fill: T.kraft, filter: FLAT }) + L(ink(card, { rng, size: 2 }));
  b += label(64, 432, 'Koontz, 2013: denials and money demands too', { anchor: 'start', weight: 500 });
  b += label(64, 474, 'Sheetz, 2024: fees set by a legislature too', { anchor: 'start', weight: 500 });
  return { W, H, b };
}

// ============================================================ Lesson 2.6

// Federal housing programs on a to-scale time line, 1930 to 1980.
function housingLaws() {
  const rng = makeRng(2601);
  const W = 720;
  const H = 540;
  let b = '';
  const X = (yr) => 40 + ((yr - 1930) / 50) * 640;
  // [label, start, end (1980 = still running), colour, label anchored at the end]
  const rows = [
    ['1934 FHA mortgage insurance', 1934, 1980, P.sky, false],
    ['1937 public housing', 1937, 1980, P.butter, false],
    ['1954 Section 701 grants', 1954, 1980, P.sage, false],
    ['1949 urban renewal', 1949, 1974, P.tomato, false],
    ['1966 Model Cities', 1966, 1974, P.lavender, true],
  ];
  const top = 60;
  const pitch = 66;
  rows.forEach(([name, s0, e, fill, atEnd], i) => {
    const y = top + i * pitch;
    const d = roundRectD(X(s0), y, X(e) - X(s0), 18, 9);
    b += cut(d, { rng, fill, jitter: 0.5 }) + L(ink(d, { rng, size: 2 }));
    if (e === 1980) b += L(arrow(X(1980) - 6, y + 9, X(1980) + 18, y + 9, rng, { size: 2, head: 8 }));
    b += atEnd ? label(X(e), y - 12, name, { anchor: 'end' }) : label(X(s0), y - 12, name, { anchor: 'start' });
  });
  // Urban renewal and Model Cities fold into the block grant.
  const yC = top + 5 * pitch;
  const cd = roundRectD(X(1974), yC, X(1980) - X(1974), 18, 9);
  b += cut(cd, { rng, fill: P.leaf, jitter: 0.5 }) + L(ink(cd, { rng, size: 2 }));
  b += L(arrow(X(1980) - 6, yC + 9, X(1980) + 18, yC + 9, rng, { size: 2, head: 8 }));
  b += label(X(1980), yC + 52, '1974 CDBG, Section 8', { anchor: 'end' });
  for (const i of [3, 4]) b += L(arrow(X(1974) + 8, top + i * pitch + 20, X(1974) + 12, yC - 4, rng, { color: P.tomatoDeep, size: 2.2, head: 9, bend: i === 3 ? -22 : -8 }));
  b += note(X(1974) - 20, yC + 20, 'folded into one block grant', { anchor: 'end', color: P.tomatoDeep });
  const axisY = yC + 94;
  b += L(inkLine([[X(1930) - 4, axisY], [X(1980) + 4, axisY]], { rng, size: 2.6, overshoot: 0 }));
  for (let yr = 1930; yr <= 1980; yr += 10) {
    b += L(inkLine([[X(yr), axisY], [X(yr), axisY + 9]], { rng, size: 2, overshoot: 0 }));
    b += label(X(yr), axisY + 40, String(yr));
  }
  return { W, H, b };
}

// The Fair Housing Act's protected classes, as they grew.
function fairHousingClasses() {
  const rng = makeRng(2602);
  const W = 720;
  const H = 480;
  let b = '';
  const base = ['race', 'color', 'religion', 'national origin'];
  const cols = [
    ['1968', 'the act', base, []],
    ['1974', 'amended', base, ['sex']],
    ['1988', 'amendments', [...base, 'sex'], ['disability', 'familial status']],
  ];
  const tileH = 44;
  const baseY = 450;
  cols.forEach(([yr, sub, old, added], c) => {
    const x = 16 + c * 236;
    const all = [...old, ...added];
    all.forEach((t, k) => {
      const y = baseY - (k + 1) * (tileH + 6);
      const isNew = k >= old.length;
      const d = roundRectD(x, y, 216, tileH, 8);
      b += cut(d, { rng, fill: isNew ? P.tomato : T.sky, jitter: 0.4, filter: FLAT }) + L(ink(d, { rng, size: 1.8 }));
      b += label(x + 108, y + 31, t, { color: isNew ? '#FFFFFF' : P.ink, weight: isNew ? 800 : 600 });
    });
    const topY = baseY - all.length * (tileH + 6);
    b += title(x + 108, topY - 50, yr, { size: 32 });
    b += label(x + 108, topY - 16, sub, { color: MUTED, weight: 500 });
  });
  b += L(inkLine([[10, baseY + 4], [710, baseY + 4]], { rng, size: 2.4, overshoot: 0 }));
  return { W, H, b };
}

// One federally funded bus line, and the federal requirements it meets.
function oneProject() {
  const rng = makeRng(2603);
  const W = 720;
  const H = 520;
  let b = '';
  // The bus.
  const bx = 250;
  const by = 30;
  const bus = roundRectD(bx, by, 220, 86, 16);
  b += cut(bus, { rng, fill: P.tomato }) + L(ink(bus, { rng, size: 2.6 }));
  for (let i = 0; i < 4; i++) {
    const w = roundRectD(bx + 16 + i * 50, by + 14, 40, 30, 5);
    b += cut(w, { rng, fill: P.sky, shadow: false, filter: FLAT }) + L(ink(w, { rng, size: 1.6 }));
  }
  for (const wx of [bx + 50, bx + 170]) b += `<circle cx="${wx}" cy="${by + 88}" r="14" fill="${P.ink}"/><circle cx="${wx}" cy="${by + 88}" r="5" fill="${P.paper}"/>`;
  b += label(bx + 110, by + 76, 'BRT', { color: '#FFFFFF', weight: 800, size: 28 });
  const tags = [
    ['MPO plan and TIP', P.butter], ['NEPA review', P.sage],
    ['air quality conformity', T.sky], ['Section 106', T.lav],
    ['Title VI', T.blush], ['ADA', T.kraft],
  ];
  tags.forEach(([t, fill], i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = col ? 396 : 14;
    const w = col ? 310 : 364;
    const y = 170 + row * 96;
    const d = roundRectD(x, y, w, 64, 12);
    b += cut(d, { rng, fill, filter: FLAT }) + L(ink(d, { rng, size: 2 })) + label(x + 60, y + 42, t, { anchor: 'start' });
    b += L(inkLine([[x + 16, y + 34], [x + 26, y + 46], [x + 44, y + 18]], { rng, size: 3.4, color: P.leafDeep, overshoot: 0 }));
  });
  b += note(360, 500, 'one project, most of the laws in this lesson', { color: P.tomatoDeep });
  return { W, H, b };
}

// ============================================================ Lesson 3.1

// Arnstein's ladder: eight rungs in three groups.
function arnsteinLadder() {
  const rng = makeRng(3101);
  const W = 720;
  const H = 600;
  let b = '';
  const rungs = ['Manipulation', 'Therapy', 'Informing', 'Consultation', 'Placation', 'Partnership', 'Delegated power', 'Citizen control'];
  const groups = [[0, 1, 'Nonparticipation', P.tomato, T.blush], [2, 4, 'Tokenism', P.butterDeep, T.butter], [5, 7, 'Citizen power', P.leaf, T.sage]];
  const Y = (i) => 548 - i * 64;
  const r0 = 236;
  const r1 = 326;
  // Group bands behind the ladder.
  for (const [a, c, , , tint] of groups) {
    const d = roundRectD(216, Y(c) - 28, 490, Y(a) - Y(c) + 56, 14);
    b += cut(d, { rng, fill: tint, shadow: false, jitter: 0.5, filter: FLAT });
  }
  b += L(inkLine([[r0, 572], [r0 - 2, 40]], { rng, size: 3.6, overshoot: 0 }) + inkLine([[r1, 572], [r1 + 2, 40]], { rng, size: 3.6, overshoot: 0 }));
  rungs.forEach((name, i) => {
    const g = groups.find(([a, c]) => i >= a && i <= c);
    const d = roundRectD(r0 - 4, Y(i) - 8, r1 - r0 + 8, 16, 6);
    b += cut(d, { rng, fill: g[3], jitter: 0.4, filter: FLAT }) + L(ink(d, { rng, size: 1.8 }));
    b += label(r1 + 24, Y(i) + 10, `${i + 1}  ${name}`, { anchor: 'start' });
  });
  for (const [a, c, name] of groups) {
    const words = name === 'Nonparticipation' ? ['Non-', 'participation'] : name.split(' ');
    const mid = (Y(a) + Y(c)) / 2;
    words.forEach((w, k) => { b += title(202, mid + 10 + (k - (words.length - 1) / 2) * 32, w, { size: 28, anchor: 'end' }); });
  }
  b += note(700, Y(3) - 6, 'a voice,', { anchor: 'end', color: P.tomatoDeep });
  b += note(700, Y(3) + 28, 'no power', { anchor: 'end', color: P.tomatoDeep });
  return { W, H, b };
}

// The IAP2 spectrum: five levels, each giving the public more influence.
function iap2Spectrum() {
  const rng = makeRng(3102);
  const W = 720;
  const H = 520;
  let b = '';
  const levels = [
    ['Inform', 'understand the issue', P.sky],
    ['Consult', 'give feedback', T.sky],
    ['Involve', 'shape the options', P.sage],
    ['Collaborate', 'choose together', P.leaf],
    ['Empower', 'the public decides', P.leafDeep],
  ];
  levels.forEach(([name, what, fill], i) => {
    const y = 40 + i * 84;
    const len = (i + 1) * 100;
    const d = roundRectD(200, y, len, 52, 10);
    b += cut(d, { rng, fill, jitter: 0.5, filter: FLAT }) + L(ink(d, { rng, size: 2 }));
    b += title(20, y + 36, name, { anchor: 'start', size: 28 });
    const inside = i >= 2;
    b += label(inside ? 200 + len / 2 : 200 + len + 16, y + 36, what, { anchor: inside ? 'middle' : 'start', color: i >= 3 ? '#FFFFFF' : P.ink, weight: inside ? 700 : 500 });
  });
  const ay = 470;
  b += L(arrow(200, ay, 700, ay, rng, { size: 3, head: 14 }));
  b += label(450, ay + 40, 'more public influence', { color: MUTED, weight: 500 });
  return { W, H, b };
}

// Why engage early: the room to change a plan shrinks as it moves along.
function engageEarly() {
  const rng = makeRng(3103);
  const W = 720;
  const H = 480;
  let b = '';
  // Illustrative share of the plan still open to change at each stage.
  const stages = [['Problem', 100], ['Options', 75], ['Draft', 35], ['Hearing', 10]];
  const x0 = 110;
  const x1 = 640;
  const yB = 360;
  const yT = 80;
  const X = (i) => x0 + (i / (stages.length - 1)) * (x1 - x0);
  const Y = (v) => yB - (v / 100) * (yB - yT);
  const area = [[X(0), yB], ...stages.map(([, v], i) => [X(i), Y(v)]), [X(3), yB]];
  b += `<path d="${polyD(area)}" fill="${T.sage}"/>`;
  b += L(inkLine(stages.map(([, v], i) => [X(i), Y(v)]), { rng, size: 3.2, color: P.leafDeep, overshoot: 0 }));
  b += L(inkLine([[x0 - 10, yT - 16], [x0 - 10, yB], [x1 + 30, yB]], { rng, size: 2.4, overshoot: 0 }));
  stages.forEach(([name, v], i) => {
    b += `<circle cx="${X(i)}" cy="${Y(v)}" r="8" fill="${P.leaf}" stroke="${P.ink}" stroke-width="2"/>`;
    b += label(X(i), yB + 40, name);
  });
  b += label(x0 - 26, yT - 30, 'room to change the plan', { anchor: 'start', color: MUTED, weight: 500 });
  b += label(x0 - 26, yB + 84, 'stage of the plan (illustrative)', { anchor: 'start', color: MUTED, weight: 500 });
  b += note(X(0) + 24, Y(100) + 150, 'engage here', { anchor: 'start', color: P.leafDeep });
  b += note(X(3) + 10, Y(10) - 120, 'too late to', { anchor: 'end', color: P.tomatoDeep });
  b += note(X(3) + 10, Y(10) - 86, 'shape it', { anchor: 'end', color: P.tomatoDeep });
  return { W, H, b };
}

// A public hearing beside a public meeting.
function hearingVsMeeting() {
  const rng = makeRng(3104);
  const PW = 338;
  const PH = 380;
  const head = (h, sub) => title(20, 40, h, { size: 25, anchor: 'start' }) + label(20, 70, sub, { size: 20, anchor: 'start', color: MUTED, weight: 500 });
  let hear = panel(0, 0, PW, PH, T.cream, rng) + head('Public hearing', 'formal, noticed, on the record');
  for (let k = 0; k < 3; k++) hear += person(110 + k * 56, 176, 1, { coat: [P.civic, P.lavender, P.civic][k], seed: 80 + k });
  const dais = rectD(70, 156, 208, 44);
  hear += cut(dais, { rng, fill: P.kraft, filter: FLAT }) + L(ink(dais, { rng, size: 2.2 }));
  const pod = polyD([[146, 300], [150, 256], [196, 256], [200, 300]]);
  hear += person(173, 292, 1, { coat: P.tomato, seed: 84, flip: true });
  hear += cut(pod, { rng, fill: P.kraftDeep }) + L(ink(pod, { rng, size: 2 }));
  const rec = rectD(262, 236, 50, 62);
  hear += cut(rec, { rng, fill: P.paper, filter: FLAT }) + L(ink(rec, { rng, size: 2 }));
  for (let k = 0; k < 4; k++) hear += L(inkLine([[270, 250 + k * 12], [304, 250 + k * 12]], { rng, size: 1.2, overshoot: 0, opacity: 0.7 }));
  hear += note(20, 344, 'testimony becomes the record', { size: 24, anchor: 'start', color: P.civicDeep });
  let meet = panel(0, 0, PW, PH, T.cream, rng) + head('Public meeting', 'informal: share and gather ideas');
  const board = (x, fill) => {
    let s = L(inkLine([[x + 10, 260], [x + 24, 150]], { rng, size: 2.4, overshoot: 0 }) + inkLine([[x + 70, 260], [x + 56, 150]], { rng, size: 2.4, overshoot: 0 }));
    const d = rectD(x, 110, 80, 90);
    s += cut(d, { rng, fill: P.paper, filter: FLAT }) + L(ink(d, { rng, size: 2 }));
    for (const [nx, ny] of [[x + 10, 122], [x + 44, 140], [x + 18, 164]]) s += `<rect x="${nx}" y="${ny}" width="22" height="20" fill="${fill}" transform="rotate(${(nx % 7) - 3} ${nx + 11} ${ny + 10})"/>`;
    return s;
  };
  meet += board(30, P.butter) + board(200, P.blush);
  meet += person(140, 290, 1, { coat: P.leaf, seed: 90, prop: 'wave' }) + person(180, 294, 0.9, { coat: P.sky, seed: 91, flip: true }) + person(300, 292, 1, { coat: P.lavender, seed: 92, flip: true });
  meet += note(20, 344, 'no legal record', { size: 24, anchor: 'start', color: P.civicDeep });
  return {
    W: 720, H: 408, b: at(14, 14, hear) + at(368, 14, meet),
    narrow: { W: 366, H: 802, b: at(14, 14, hear) + at(14, 408, meet) },
  };
}

// The renter gap from the lesson's example: 55% of households, 15% of
// participants.
function participationGap() {
  const rng = makeRng(3105);
  const W = 720;
  const H = 380;
  let b = '';
  const x0 = 40;
  const w = 640;
  const bar = (y, heading, renters) => {
    let s = title(x0, y - 16, heading, { anchor: 'start', size: 28 });
    const rw = (renters / 100) * w;
    const r = rectD(x0, y, rw, 60);
    const o = rectD(x0 + rw, y, w - rw, 60);
    s += cut(r, { rng, fill: P.tomato, filter: FLAT, jitter: 0.4 }) + cut(o, { rng, fill: T.sky, filter: FLAT, jitter: 0.4 });
    s += L(ink(r, { rng, size: 2 }) + ink(o, { rng, size: 2 }));
    s += label(x0 + rw / 2, y + 40, `${renters}%`, { color: '#FFFFFF', weight: 800 });
    s += label(x0 + rw + (w - rw) / 2, y + 40, `${100 - renters}%`, { weight: 700 });
    return s;
  };
  b += bar(70, 'Households', 55);
  b += bar(210, 'First-round participants', 15);
  b += `<rect x="${x0}" y="300" width="24" height="24" fill="${P.tomato}" stroke="${P.ink}" stroke-width="1.6"/>` + label(x0 + 34, 320, 'renters', { anchor: 'start', weight: 500 });
  b += `<rect x="${x0 + 170}" y="300" width="24" height="24" fill="${T.sky}" stroke="${P.ink}" stroke-width="1.6"/>` + label(x0 + 204, 320, 'owners', { anchor: 'start', weight: 500 });
  b += note(680, 364, 'the fix: go find the renters', { anchor: 'end', color: P.tomatoDeep });
  return { W, H, b };
}

// ============================================================ Lesson 3.2

// Who a weeknight hearing at city hall hears from, and who it misses.
function whoMissing() {
  const rng = makeRng(3201);
  const W = 720;
  const H = 520;
  let b = '';
  const missing = [
    ['works nights', P.tomato], ['no childcare', P.leaf], ['no car', P.lavender],
    ['needs an interpreter', P.civic], ['needs captions', P.kraftDeep],
  ];
  b += title(20, 44, 'Who it misses', { anchor: 'start', size: 28 });
  missing.forEach(([why, coat], i) => {
    const y = 110 + i * 74;
    b += person(44, y + 30, 0.8, { coat, seed: 100 + i });
    const w = why.length * 15.4 + 32;
    const d = roundRectD(76, y - 22, w, 44, 10);
    b += cut(d, { rng, fill: P.paper, filter: FLAT }) + L(ink(d, { rng, size: 1.8 })) + label(92, y + 10, why, { anchor: 'start', weight: 500 });
  });
  // City hall at night, with the people who do come.
  b += title(700, 44, 'Who it hears', { anchor: 'end', size: 28 });
  b += cityHall(470, 330, 220, 190, { seed: 40 });
  for (let k = 0; k < 3; k++) b += person(512 + k * 56, 410, 1, { coat: P.sky, seed: 110 + k });
  b += label(706, 460, '7 pm weeknight hearing', { anchor: 'end', color: MUTED, weight: 500 });
  b += note(360, 506, 'take the meeting to them', { color: P.tomatoDeep });
  return { W, H, b };
}

// Procedural, distributive, and structural equity.
function threeEquities() {
  const rng = makeRng(3202);
  const PW = 228;
  const PH = 370;
  const head = (t, sub) => title(PW / 2, 40, t, { size: 23 }) + label(PW / 2, 68, sub, { size: 19, color: MUTED, weight: 500 });
  let proc = panel(0, 0, PW, PH, T.cream, rng) + head('Procedural', 'who takes part');
  const tbl = ellipseD(114, 200, 54, 34);
  for (let k = 0; k < 6; k++) {
    const a = (k / 6) * Math.PI * 2 + 0.3;
    const x = 114 + Math.cos(a) * 82;
    const y = 200 + Math.sin(a) * 58;
    proc += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="14" fill="${[P.tomato, P.leaf, P.civic, P.butter, P.lavender, P.kraft][k]}" stroke="${P.ink}" stroke-width="1.8"/>`;
  }
  proc += cut(tbl, { rng, fill: P.kraft, filter: FLAT }) + L(ink(tbl, { rng, size: 2 }));
  proc += note(PW / 2, 318, 'a fair, open process', { size: 24 });
  let dist = panel(0, 0, PW, PH, T.cream, rng) + head('Distributive', 'benefits and burdens');
  // One side gets the park; the other already hosts three burdens.
  dist += `<rect x="18" y="150" width="90" height="110" rx="8" fill="${T.sage}"/>` + `<rect x="120" y="150" width="90" height="110" rx="8" fill="${T.blush}"/>`;
  dist += `<circle cx="48" cy="200" r="18" fill="${P.leaf}" stroke="${P.ink}" stroke-width="1.6"/><circle cx="80" cy="222" r="15" fill="${P.leaf}" stroke="${P.ink}" stroke-width="1.6"/>`;
  for (let k = 0; k < 3; k++) {
    const x = 132 + k * 24;
    dist += `<rect x="${x}" y="${190 - k * 10}" width="14" height="${70 + k * 10}" fill="${P.kraftDeep}" stroke="${P.ink}" stroke-width="1.6"/>`;
    dist += `<circle cx="${x + 9}" cy="${176 - k * 10}" r="7" fill="#B9B3C4"/><circle cx="${x + 17}" cy="${164 - k * 10}" r="9" fill="#CFCAD8"/>`;
  }
  dist += label(63, 288, 'gains', { size: 19, weight: 700, color: P.leafDeep }) + label(165, 288, 'bears', { size: 19, weight: 700, color: P.tomatoDeep });
  dist += note(PW / 2, 318, 'who gets what', { size: 24 });
  let struc = panel(0, 0, PW, PH, T.cream, rng) + head('Structural', 'past harms, future effects');
  struc += L(arrow(24, 200, 206, 200, rng, { size: 2.6, head: 12 }));
  const red = roundRectD(26, 130, 64, 50, 6);
  struc += cut(red, { rng, fill: P.paper, filter: FLAT }) + hatch(red, { rng, angle: 45, gap: 9, color: P.tomatoDeep, opacity: 0.5, size: 1.2 }) + L(ink(red, { rng, size: 3, color: P.tomatoDeep }));
  const now = roundRectD(136, 130, 64, 50, 6);
  struc += cut(now, { rng, fill: T.blush, filter: FLAT }) + L(ink(now, { rng, size: 3, color: P.tomatoDeep }));
  struc += label(58, 234, '1930s', { size: 19, weight: 700 }) + label(168, 234, 'today', { size: 19, weight: 700 });
  struc += label(PW / 2, 266, 'same lines, still felt', { size: 19, color: MUTED, weight: 500 });
  struc += note(PW / 2, 318, 'correct, or entrench?', { size: 24 });
  const panels = [proc, dist, struc];
  return {
    W: 720, H: 398, b: panels.map((q, i) => at(8 + i * 238, 14, q)).join(''),
    narrow: { W: 252, H: 1152, b: panels.map((q, i) => at(12, 12 + i * 384, q)).join('') },
  };
}

// WCAG's four principles.
function wcagPour() {
  const rng = makeRng(3203);
  const CW = 166;
  const CH = 250;
  const cards = [
    ['P', 'Perceivable', ['alt text,', 'captions'], P.sky],
    ['O', 'Operable', ['works with', 'a keyboard'], P.sage],
    ['U', 'Understandable', ['plain', 'language'], T.butter],
    ['R', 'Robust', ['works with', 'screen readers'], T.lav],
  ];
  const card = ([letter, name, ex, fill]) => {
    const d = roundRectD(0, 0, CW, CH, 14);
    let s = cut(d, { rng, fill, filter: FLAT }) + L(ink(d, { rng, size: 2.2 }));
    s += title(CW / 2, 86, letter, { size: 64 });
    s += label(CW / 2, 134, name, { size: name.length > 12 ? 19 : 22, weight: 800 });
    ex.forEach((t, k) => { s += label(CW / 2, 180 + k * 28, t, { size: 19, weight: 500 }); });
    return s;
  };
  const cs = cards.map(card);
  return {
    W: 720, H: 282, b: cs.map((c, i) => at(12 + i * 176, 16, c)).join(''),
    narrow: { W: 372, H: 556, b: cs.map((c, i) => at(14 + (i % 2) * 180, 14 + Math.floor(i / 2) * 266, c)).join('') },
  };
}

// ============================================================ Lesson 3.3

// Positions above the water, interests below: the lesson's apartment example.
function positionsInterests() {
  const rng = makeRng(3301);
  const W = 720;
  const H = 500;
  let b = '';
  const wl = 170;
  b += `<rect x="0" y="${wl}" width="${W}" height="${H - wl}" fill="${T.sky}"/>`;
  b += L(ink(`M0 ${wl}q30 -8 60 0t60 0t60 0t60 0t60 0t60 0t60 0t60 0t60 0t60 0t60 0t60 0`, { rng, size: 2, color: P.civicDeep }));
  const tip = polyD([[300, wl], [338, 104], [372, 92], [410, 130], [436, wl]]);
  const body = polyD([[300, wl], [436, wl], [520, 250], [560, 360], [500, 460], [330, 476], [210, 420], [196, 300], [240, 220]]);
  b += cut(body, { rng, fill: '#F1F7FC', filter: FLAT, shadow: false }) + L(ink(body, { rng, size: 2, color: P.civicDeep, opacity: 0.7 }));
  b += cut(tip, { rng, fill: '#FFFFFF', filter: FLAT }) + L(ink(tip, { rng, size: 2.4 }));
  b += title(24, 56, 'Position', { anchor: 'start', size: 30 });
  b += label(24, 90, 'what they say', { anchor: 'start', color: MUTED, weight: 500 });
  const bub = roundRectD(466, 36, 234, 86, 14);
  b += cut(bub, { rng, fill: P.paper, filter: FLAT }) + L(ink(bub, { rng, size: 2 }));
  b += label(583, 72, '“No apartments', {}) + label(583, 104, 'on this site!”', {});
  b += L(inkLine([[470, 110], [420, 132]], { rng, size: 2, overshoot: 0 }));
  b += title(24, 226, 'Interests', { anchor: 'start', size: 30 });
  b += label(24, 260, 'why they say it', { anchor: 'start', color: MUTED, weight: 500 });
  b += label(368, 310, 'traffic on', { weight: 700 }) + label(368, 342, 'my street', { weight: 700 });
  b += label(368, 396, 'losing', { weight: 700 }) + label(368, 428, 'afternoon sun', { weight: 700 });
  b += note(704, 420, 'negotiate', { anchor: 'end', color: P.civicDeep });
  b += note(704, 456, 'down here', { anchor: 'end', color: P.civicDeep });
  return { W, H, b };
}

// Facilitation, mediation, arbitration: who decides?
function adrWhoDecides() {
  const rng = makeRng(3302);
  const PW = 228;
  const PH = 360;
  const head = (t) => title(PW / 2, 40, t, { size: 24 });
  const crown = (x, y) => star(x, y, 13, { fill: P.butter, seed: Math.round(x) });
  const neutral = (x, y) => person(x, y, 1, { coat: P.ink, hair: P.kraftDeep, seed: 140 });
  let fac = panel(0, 0, PW, PH, T.cream, rng) + head('Facilitation');
  const chart = rectD(84, 84, 60, 70);
  fac += cut(chart, { rng, fill: P.paper, filter: FLAT }) + L(ink(chart, { rng, size: 1.8 }));
  fac += neutral(114, 230);
  fac += [40, 188].map((x, i) => person(x, 236, 0.9, { coat: [P.leaf, P.sky][i], seed: 141 + i, flip: i === 1 })).join('');
  fac += label(PW / 2, 280, 'runs the process', { size: 19, weight: 500, color: MUTED });
  fac += crown(40, 146) + crown(188, 146);
  fac += note(PW / 2, 324, 'the group decides', { size: 24, color: P.leafDeep });
  let med = panel(0, 0, PW, PH, T.cream, rng) + head('Mediation');
  med += person(46, 236, 1, { coat: P.tomato, seed: 150 }) + person(182, 236, 1, { coat: P.leaf, seed: 151, flip: true }) + neutral(114, 236);
  med += crown(46, 134) + crown(182, 134);
  med += label(PW / 2, 280, 'helps them agree', { size: 19, weight: 500, color: MUTED });
  med += note(PW / 2, 324, 'the parties decide', { size: 24, color: P.leafDeep });
  let arb = panel(0, 0, PW, PH, T.cream, rng) + head('Arbitration');
  const bench = rectD(74, 150, 80, 36);
  arb += neutral(114, 170) + cut(bench, { rng, fill: P.kraft, filter: FLAT }) + L(ink(bench, { rng, size: 2 }));
  arb += crown(114, 84);
  arb += person(46, 250, 0.9, { coat: P.tomato, seed: 152 }) + person(182, 250, 0.9, { coat: P.leaf, seed: 153, flip: true });
  arb += label(PW / 2, 280, 'hears both sides', { size: 19, weight: 500, color: MUTED });
  arb += note(PW / 2, 324, 'the arbitrator decides', { size: 24, color: P.tomatoDeep });
  const panels = [fac, med, arb];
  const key = (x, y) => star(x, y - 8, 13, { fill: P.butter, seed: 7 }) + label(x + 22, y, 'makes the decision', { size: 20, anchor: 'start', weight: 500 });
  return {
    W: 720, H: 430, b: panels.map((q, i) => at(8 + i * 238, 14, q)).join('') + key(24, 410),
    narrow: { W: 252, H: 1162, b: panels.map((q, i) => at(12, 12 + i * 372, q)).join('') + key(20, 1146) },
  };
}

// Gradients of agreement: consensus when nobody blocks.
function agreementGradients() {
  const rng = makeRng(3303);
  const W = 720;
  const H = 440;
  let b = '';
  const zones = [['endorse', T.sage, P.leafDeep], ['live with it', T.butter, P.kraftDeep], ['block', T.blush, P.tomatoDeep]];
  const x0 = 180;
  const zw = 176;
  zones.forEach(([name, fill, color], i) => {
    const d = roundRectD(x0 + i * zw, 60, zw - 8, 300, 12);
    b += cut(d, { rng, fill, shadow: false, filter: FLAT }) + L(ink(d, { rng, size: 1.6, opacity: 0.8 }));
    b += label(x0 + i * zw + (zw - 8) / 2, 44, name, { color });
  });
  // Illustrative groups of twelve.
  const rows = [['Group A', [5, 7, 0]], ['Group B', [6, 5, 1]]];
  rows.forEach(([name, counts], r) => {
    const y = 140 + r * 150;
    b += title(20, y + 10, name, { anchor: 'start', size: 28 });
    counts.forEach((n, i) => {
      for (let k = 0; k < n; k++) {
        const cx = x0 + i * zw + 26 + (k % 4) * 38;
        const cy = y - 18 + Math.floor(k / 4) * 38;
        b += `<circle cx="${cx}" cy="${cy}" r="13" fill="${[P.leaf, P.butter, P.tomato][i]}" stroke="${P.ink}" stroke-width="1.8"/>`;
      }
    });
    b += label(20, y + 44, r === 0 ? 'consensus' : 'not yet', { anchor: 'start', weight: 800, color: r === 0 ? P.leafDeep : P.tomatoDeep });
  });
  b += note(360, 414, 'consensus isn’t unanimity: it’s no blocks (illustrative)', { color: P.civicDeep });
  return { W, H, b };
}

// The nominal group technique as a four-stop line.
function nominalGroup() {
  const rng = makeRng(3304);
  const W = 720;
  const H = 300;
  let b = '';
  const y = 120;
  const band = roundRectD(40, y - 11, 640, 22, 11);
  b += cut(band, { rng, fill: P.civic }) + L(ink(band, { rng, size: 2.2 }));
  const stops = [[100, ['Write', 'silently']], [273, ['Share', 'round-robin']], [447, ['Discuss', 'to clarify']], [620, ['Rank', 'individually']]];
  stops.forEach(([x, lines], i) => {
    const d = ellipseD(x, y, 26, 26);
    b += cut(d, { rng, fill: i === 0 ? P.butter : P.paper, filter: FLAT }) + L(ink(d, { rng, size: 3 })) + title(x, y + 10, String(i + 1));
    b += label(x, y + 66, lines[0], { weight: 800 }) + label(x, y + 98, lines[1], { weight: 500 });
  });
  b += note(360, 284, 'no one can dominate: ideas start on paper', { color: P.civicDeep });
  return { W, H, b };
}

// ============================================================ Lesson 3.4

// Staff recommend; appointed bodies advise or decide; elected officials decide.
function whoDoesWhat() {
  const rng = makeRng(3401);
  const W = 720;
  const H = 480;
  let b = '';
  const box = (x, y, w, h, fill, lines, verb, vColor) => {
    const d = roundRectD(x, y, w, h, 14);
    let s = cut(d, { rng, fill, filter: FLAT }) + L(ink(d, { rng, size: 2.2 }));
    lines.forEach((t, k) => { s += title(x + w / 2, y + 40 + k * 32, t, { size: 28 }); });
    s += label(x + w / 2, y + h - 22, verb, { color: vColor, weight: 800 });
    return s;
  };
  b += box(14, 160, 196, 150, T.sky, ['Staff'], 'recommend', P.civicDeep);
  b += box(262, 40, 208, 150, T.butter, ['Planning', 'commission'], 'recommends', P.kraftDeep);
  b += box(262, 290, 208, 150, T.lav, ['Zoning', 'board'], 'decides', P.tomatoDeep);
  b += box(520, 40, 186, 150, T.blush, ['Council', 'or board'], 'decides', P.tomatoDeep);
  b += L(arrow(212, 210, 256, 130, rng, { size: 2.6, head: 11 }));
  b += L(arrow(212, 262, 256, 340, rng, { size: 2.6, head: 11 }));
  b += L(arrow(474, 115, 514, 115, rng, { size: 2.6, head: 11 }));
  b += label(613, 224, 'plans, rezonings,', { weight: 500, color: MUTED });
  b += label(613, 256, 'budgets', { weight: 500, color: MUTED });
  b += label(488, 350, 'variances,', { anchor: 'start', weight: 500, color: MUTED });
  b += label(488, 382, 'appeals', { anchor: 'start', weight: 500, color: MUTED });
  b += note(16, 390, 'staff analyze;', { anchor: 'start', color: P.civicDeep });
  b += note(16, 426, 'officials decide', { anchor: 'start', color: P.civicDeep });
  return { W, H, b };
}

// The parts of a staff report, drawn to their usual share of the page.
function staffReport() {
  const rng = makeRng(3402);
  const W = 720;
  const H = 592;
  let b = '';
  const parts = [
    ['Recommendation first', 48, P.tomato], ['Background', 48, T.kraft], ['Analysis vs. criteria', 150, T.sky],
    ['Findings', 64, T.sage], ['Public comment', 56, T.lav], ['Alternatives', 44, T.butter], ['Attachments', 44, '#EFE7D6'],
  ];
  const page = roundRectD(40, 20, 300, 520, 8);
  b += cut(page, { rng, fill: P.paper, filter: FLAT }) + L(ink(page, { rng, size: 2.4 }));
  let y = 44;
  parts.forEach(([name, h, fill], i) => {
    const d = rectD(62, y, 256, h - 8);
    b += cut(d, { rng, fill, shadow: false, jitter: 0.4, filter: FLAT });
    for (let ly = y + 12; ly < y + h - 14; ly += 12) b += L(inkLine([[74, ly], [306 - ((ly * 7) % 40), ly]], { rng, size: 1, overshoot: 0, opacity: 0.45 }));
    const cy = y + (h - 8) / 2;
    b += L(inkLine([[322, cy], [366, cy]], { rng, size: 1.6, overshoot: 0, opacity: 0.8 }));
    b += label(376, cy + 10, `${i + 1} ${name}`, { anchor: 'start', weight: i === 0 || i === 2 ? 800 : 500 });
    y += h;
  });
  b += note(190, 150 + 10, 'the heart', { color: P.civicDeep });
  b += note(376, 540, 'a busy reader may stop', { anchor: 'start', color: P.tomatoDeep });
  b += note(376, 576, 'after item 1', { anchor: 'start', color: P.tomatoDeep });
  return { W, H, b };
}

// A 1% chance each year, compounded over a 30-year mortgage.
function floodOdds() {
  const rng = makeRng(3403);
  const W = 720;
  const H = 440;
  let b = '';
  const x0 = 100;
  const x1 = 660;
  const yB = 340;
  const yT = 60;
  const X = (n) => x0 + (n / 30) * (x1 - x0);
  const Y = (p) => yB - (p / 0.3) * (yB - yT);
  const cum = (n) => 1 - 0.99 ** n;
  for (const p of [0.1, 0.2, 0.3]) {
    b += L(inkLine([[x0, Y(p)], [x1, Y(p)]], { rng, size: 1, opacity: 0.35, overshoot: 0 }));
    b += label(x0 - 14, Y(p) + 10, `${Math.round(p * 100)}%`, { anchor: 'end' });
  }
  const pts = [];
  for (let n = 0; n <= 30; n++) pts.push([X(n), Y(cum(n))]);
  const area = [[X(0), yB], ...pts, [X(30), yB]];
  b += `<path d="${polyD(area)}" fill="${T.sky}"/>`;
  b += L(inkLine(pts, { rng, size: 3.2, color: P.civicDeep, overshoot: 0 }));
  b += L(inkLine([[x0, yT - 10], [x0, yB], [x1 + 14, yB]], { rng, size: 2.4, overshoot: 0 }));
  for (const n of [0, 10, 20, 30]) {
    b += L(inkLine([[X(n), yB], [X(n), yB + 8]], { rng, size: 2, overshoot: 0 }));
    b += label(X(n), yB + 40, String(n));
  }
  b += label((x0 + x1) / 2, yB + 84, 'years in the home', { color: MUTED, weight: 500 });
  b += label(x0 - 50, 34, 'chance of at least one 100-year flood', { anchor: 'start', color: MUTED, weight: 500 });
  const dot = (n) => `<circle cx="${X(n)}" cy="${Y(cum(n))}" r="8" fill="${P.civic}" stroke="${P.ink}" stroke-width="2"/>`;
  b += dot(1) + dot(30);
  b += label(X(1) + 4, Y(cum(1)) - 84, `1 year: ${Math.round(cum(1) * 100)}%`, { anchor: 'start' });
  b += L(inkLine([[X(1) + 10, Y(cum(1)) - 74], [X(1) + 2, Y(cum(1)) - 14]], { rng, size: 1.6, overshoot: 0 }));
  b += label(X(30) - 12, Y(cum(30)) - 22, `30 years: ${Math.round(cum(30) * 100)}%`, { anchor: 'end', weight: 800 });
  b += note(X(15), Y(cum(15)) - 70, '1% a year adds up', { color: P.tomatoDeep });
  return { W, H, b };
}

// ============================================================ Lesson 4.1

// The planning sequence as a two-row route, with the loop back.
function planningSequence() {
  const rng = makeRng(4101);
  const W = 720;
  const H = 520;
  let b = '';
  const yA = 140;
  const yB = 350;
  const xs = [90, 225, 360, 495, 630];
  // The route: along the top, round the bend, back along the bottom.
  const route = `M${xs[0] - 40} ${yA}H${xs[4]}C${xs[4] + 70} ${yA} ${xs[4] + 70} ${yB} ${xs[4]} ${yB}H${xs[0] - 40}`;
  b += `<path d="${route}" fill="none" stroke="${P.civic}" stroke-width="20" stroke-linecap="round"/>`;
  b += L(ink(route, { rng, size: 1.6, opacity: 0.6 }));
  const names = [['Scope'], ['Existing', 'conditions'], ['Issues'], ['Vision', 'and goals'], ['Alternatives'],
    ['Evaluate'], ['Draft', 'plan'], ['Adopt'], ['Implement'], ['Monitor']];
  names.forEach((lines, i) => {
    const top = i < 5;
    const x = top ? xs[i] : xs[9 - i];
    const y = top ? yA : yB;
    const d = ellipseD(x, y, 25, 25);
    b += cut(d, { rng, fill: i === 0 ? P.butter : i === 1 ? P.tomato : P.paper, filter: FLAT }) + L(ink(d, { rng, size: 2.6 }));
    b += title(x, y + 10, String(i + 1), { size: 28, color: i === 1 ? '#FFFFFF' : P.ink });
    lines.forEach((t, k) => { b += label(x, i === 4 ? y - 40 : y + 62 + k * 32, t); });
  });
  // Monitoring loops back to the start of the analysis.
  b += L(inkLine(`M${xs[0] - 50} ${yB - 20}C${14} ${yB - 60} ${14} ${yA + 60} ${xs[0] - 40} ${yA + 30}`, { rng, size: 2.4, color: P.tomatoDeep, overshoot: 0 }));
  b += L(arrow(xs[0] - 58, yA + 40, xs[0] - 36, yA + 26, rng, { color: P.tomatoDeep, size: 2.4, head: 10 }));
  b += note(360, 60, 'engagement runs the whole way', { color: P.civicDeep });
  b += note(360, 500, 'first real step after scoping: step 2', { color: P.tomatoDeep });
  return { W, H, b };
}

// Hazards first, or hazards last: the same site planned two ways.
function hazardsFirst() {
  const rng = makeRng(4102);
  const PW = 338;
  const PH = 380;
  const map = (first) => {
    let s = '';
    const flood = `M28 250C90 230 150 270 220 240S300 220 316 236V318H28Z`;
    s += `<path d="${flood}" fill="${T.sky}"/>` + L(ink(`M28 250C90 230 150 270 220 240S300 220 316 236`, { rng, size: 2, color: P.civicDeep }));
    s += label(280, 300, 'floodplain', { size: 19, anchor: 'end', color: P.civicDeep, weight: 700 });
    const homes = first
      ? [[40, 110], [80, 110], [120, 110], [160, 110], [200, 110], [40, 160], [80, 160], [120, 160], [160, 160], [240, 160], [280, 110], [240, 110]]
      : [[40, 110], [80, 110], [120, 110], [160, 110], [200, 110], [240, 110], [40, 180], [120, 180], [200, 180], [60, 250], [140, 262], [230, 246]];
    for (const [x, y] of homes) {
      const wet = y > 230;
      s += `<rect x="${x}" y="${y}" width="28" height="24" fill="${wet ? P.tomato : P.butter}" stroke="${P.ink}" stroke-width="1.6"/>`;
    }
    if (first) s += `<rect x="40" y="206" width="236" height="14" rx="4" fill="${P.leaf}"/>` + label(158, 200, 'buffer: park, trails', { size: 19, color: P.leafDeep, weight: 700 });
    return s;
  };
  let a = panel(0, 0, PW, PH, T.cream, rng) + title(20, 40, 'Hazards first', { size: 25, anchor: 'start' }) + label(20, 70, 'map the risk, then the land use', { size: 20, anchor: 'start', color: MUTED, weight: 500 });
  a += map(true) + note(20, 356, 'growth stays out of harm’s way', { size: 24, anchor: 'start', color: P.leafDeep });
  let c = panel(0, 0, PW, PH, T.cream, rng) + title(20, 40, 'Hazards last', { size: 25, anchor: 'start' }) + label(20, 70, 'land use first, squeezed after', { size: 20, anchor: 'start', color: MUTED, weight: 500 });
  c += map(false) + note(20, 356, 'homes end up in the floodplain', { size: 24, anchor: 'start', color: P.tomatoDeep });
  return {
    W: 720, H: 408, b: at(14, 14, a) + at(368, 14, c),
    narrow: { W: 366, H: 802, b: at(14, 14, a) + at(14, 408, c) },
  };
}

// Surfacing a tradeoff: three options for the greenfield with habitat.
function tradeoffOptions() {
  const rng = makeRng(4103);
  const PW = 228;
  const PH = 330;
  const opt = (name, homes, verdict, vColor) => {
    let s = panel(0, 0, PW, PH, T.cream, rng) + title(PW / 2, 40, name, { size: 23 });
    const site = rectD(24, 64, 180, 170);
    s += cut(site, { rng, fill: T.butter, shadow: false, filter: FLAT }) + L(ink(site, { rng, size: 1.8 }));
    const hab = blobD(150, 150, 46, 60, makeRng(12), 6, 0.1);
    const lost = homes === 'full';
    s += cut(hab, { rng, fill: lost ? '#E7E1D2' : P.sage, shadow: false, filter: FLAT }) + L(ink(hab, { rng, size: 1.6, opacity: lost ? 0.5 : 1 }));
    const pts = homes === 'full' ? [[36, 76], [64, 76], [92, 76], [120, 76], [148, 76], [176, 76], [36, 118], [64, 118], [92, 118], [130, 128], [166, 128], [36, 160], [64, 160], [92, 160], [130, 176], [166, 176], [36, 202], [64, 202], [92, 202]]
      : homes === 'cluster' ? [[36, 76], [58, 76], [80, 76], [36, 98], [58, 98], [80, 98], [36, 120], [58, 120], [80, 120], [36, 142], [58, 142], [80, 142], [36, 164], [58, 164], [80, 164], [36, 186], [58, 186], [80, 186], [36, 208]]
      : [];
    const sz = homes === 'cluster' ? 16 : 20;
    for (const [x, y] of pts) s += `<rect x="${x}" y="${y}" width="${sz}" height="${sz - 2}" fill="${P.tomato}" stroke="${P.ink}" stroke-width="1.3"/>`;
    s += label(PW / 2, 268, verdict[0], { size: 19, color: vColor, weight: 700 });
    s += label(PW / 2, 294, verdict[1], { size: 19, color: vColor, weight: 700 });
    return s;
  };
  const panels = [
    opt('Full build-out', 'full', ['homes spread out,', 'habitat lost'], P.tomatoDeep),
    opt('Clustered', 'cluster', ['same homes, closer,', 'habitat kept'], P.leafDeep),
    opt('No change', 'none', ['no new homes,', 'habitat kept'], P.civicDeep),
  ];
  const key = (x, y) => `<rect x="${x}" y="${y - 16}" width="18" height="18" fill="${P.sage}" stroke="${P.ink}" stroke-width="1.4"/>` + label(x + 26, y, 'wildlife habitat', { size: 20, anchor: 'start', weight: 500 })
    + `<rect x="${x + 210}" y="${y - 16}" width="18" height="16" fill="${P.tomato}" stroke="${P.ink}" stroke-width="1.3"/>` + label(x + 236, y, 'new homes', { size: 20, anchor: 'start', weight: 500 });
  return {
    W: 720, H: 400, b: panels.map((q, i) => at(8 + i * 238, 14, q)).join('') + key(24, 380),
    narrow: { W: 356, H: 1076, b: panels.map((q, i) => at(64, 12 + i * 342, q)).join('') + key(16, 1060) },
  };
}

// When an update is overdue: assumed 1% growth against 3% actual.
function growthDrift() {
  const rng = makeRng(4104);
  const W = 720;
  const H = 440;
  let b = '';
  const x0 = 100;
  const x1 = 560;
  const yB = 340;
  const yT = 70;
  const X = (n) => x0 + (n / 8) * (x1 - x0);
  const Y = (g) => yB - (g / 0.3) * (yB - yT);
  for (const g of [0.1, 0.2, 0.3]) {
    b += L(inkLine([[x0, Y(g)], [x1, Y(g)]], { rng, size: 1, opacity: 0.35, overshoot: 0 }));
    b += label(x0 - 14, Y(g) + 10, `+${Math.round(g * 100)}%`, { anchor: 'end' });
  }
  const line = (r) => { const pts = []; for (let n = 0; n <= 8; n++) pts.push([X(n), Y((1 + r) ** n - 1)]); return pts; };
  const gap = [...line(0.03), ...line(0.01).reverse()];
  b += `<path d="${polyD(gap)}" fill="${T.blush}"/>`;
  b += L(inkLine(line(0.01), { rng, size: 3, color: P.civicDeep, overshoot: 0 }) + inkLine(line(0.03), { rng, size: 3, color: P.tomatoDeep, overshoot: 0 }));
  b += L(inkLine([[x0, yT - 10], [x0, yB], [x1 + 10, yB]], { rng, size: 2.4, overshoot: 0 }));
  for (const n of [0, 2, 4, 6, 8]) b += label(X(n), yB + 38, String(n));
  b += label((x0 + x1) / 2, yB + 80, 'years since the plan', { color: MUTED, weight: 500 });
  b += label(x0 - 60, 36, 'population growth since adoption', { anchor: 'start', color: MUTED, weight: 500 });
  const end = (r) => (1 + r) ** 8 - 1;
  b += label(x1 + 16, Y(end(0.03)) + 8, `actual 3%`, { anchor: 'start', color: P.tomatoDeep, weight: 700 });
  b += label(x1 + 16, Y(end(0.03)) + 40, `+${Math.round(end(0.03) * 100)}%`, { anchor: 'start', color: P.tomatoDeep });
  b += label(x1 + 16, Y(end(0.01)) - 10, `planned 1%`, { anchor: 'start', color: P.civicDeep, weight: 700 });
  b += label(x1 + 16, Y(end(0.01)) + 22, `+${Math.round(end(0.01) * 100)}%`, { anchor: 'start', color: P.civicDeep });
  b += note(x0 + 20, Y(0.24), 'time for a full update', { anchor: 'start', color: P.tomatoDeep });
  return { W, H, b };
}

// ============================================================ Lesson 4.2

// The future land use map beside the zoning map of the same blocks.
function fluVsZoning() {
  const rng = makeRng(4201);
  const PW = 338;
  const PH = 420;
  const colors = { R: P.butter, C: P.tomato, I: P.lavender, P: P.leaf };
  const now = ['RRRC', 'RRCC', 'IIRR', 'IIPR'];
  const future = ['RRRC', 'RRCC', 'RRRR', 'CRPR'];
  const map = (grid, other, ring) => {
    let s = '';
    grid.forEach((row, r) => [...row].forEach((z, c) => {
      const d = rectD(46 + c * 62, 96 + r * 62, 60, 60);
      s += cut(d, { rng, fill: colors[z], shadow: false, jitter: 0.4, filter: FLAT }) + L(ink(d, { rng, size: 1.4, opacity: 0.8 }));
      if (ring && other[r][c] !== z) s += L(ink(rectD(46 + c * 62 - 3, 96 + r * 62 - 3, 66, 66), { rng, size: 3.4, color: P.tomatoDeep }));
    }));
    return s;
  };
  const key = (y) => [['R', 'homes'], ['C', 'shops'], ['I', 'industry'], ['P', 'park']].map(([z, t], i) => { const kx = 46 + (i % 2) * 130; const ky = y + Math.floor(i / 2) * 28; return `<rect x="${kx}" y="${ky - 16}" width="18" height="18" fill="${colors[z]}" stroke="${P.ink}" stroke-width="1.4"/>` + label(kx + 26, ky, t, { size: 19, anchor: 'start', weight: 500 }); }).join('');
  let a = panel(0, 0, PW, PH, T.cream, rng) + title(20, 40, 'Zoning map', { size: 25, anchor: 'start' }) + label(20, 70, 'the rules in force today', { size: 20, anchor: 'start', color: MUTED, weight: 500 });
  a += map(now, future, false) + key(372);
  let c = panel(0, 0, PW, PH, T.cream, rng) + title(20, 40, 'Future land use map', { size: 25, anchor: 'start' }) + label(20, 70, 'where the plan wants to go', { size: 20, anchor: 'start', color: MUTED, weight: 500 });
  c += map(future, now, true) + note(20, 382, 'circled: where they differ', { size: 24, anchor: 'start', color: P.tomatoDeep });
  return {
    W: 720, H: 448, b: at(14, 14, a) + at(368, 14, c),
    narrow: { W: 366, H: 882, b: at(14, 14, a) + at(14, 448, c) },
  };
}

// How much legal weight the plan carries, state by state.
function consistencySpectrum() {
  const rng = makeRng(4202);
  const W = 720;
  const H = 360;
  let b = '';
  const y = 150;
  const bar = polyD([[40, y - 8], [640, y - 20], [640, y - 36], [690, y], [640, y + 36], [640, y + 20], [40, y + 8]]);
  b += cut(bar, { rng, fill: P.civic, filter: FLAT }) + L(ink(bar, { rng, size: 2 }));
  const stops = [
    [140, ['Zoning is', 'the plan'], 'no separate plan', T.sky],
    [330, ['One factor'], 'courts weigh it', P.sky],
    [586, ['Consistency'], 'zoning must match', P.butter],
  ];
  stops.forEach(([x, lines, what, fill], i) => {
    const d = ellipseD(x, y, 22, 22);
    b += cut(d, { rng, fill, filter: FLAT }) + L(ink(d, { rng, size: 2.6 }));
    lines.forEach((t, k) => { b += title(x, y + 70 + k * 32, t, { size: 28 }); });
    b += label(x, y + 70 + lines.length * 32 + 4, what, { color: MUTED, weight: 500 });
  });
  b += label(40, 70, 'less legal weight', { anchor: 'start', color: MUTED, weight: 500 });
  b += label(690, 70, 'more legal weight', { anchor: 'end', color: MUTED, weight: 500 });
  b += note(700, 340, 'there, rezone to match the plan', { anchor: 'end', color: P.tomatoDeep });
  return { W, H, b };
}

// The family of plans around the comprehensive plan.
function planFamily() {
  const rng = makeRng(4203);
  const W = 720;
  const H = 540;
  let b = '';
  const box = (x, y, w, h, fill, head, sub) => {
    const d = roundRectD(x, y, w, h, 14);
    return cut(d, { rng, fill, filter: FLAT }) + L(ink(d, { rng, size: 2.2 })) + title(x + w / 2, y + 40, head, { size: 28 }) + label(x + w / 2, y + 74, sub, { color: MUTED, weight: 500 });
  };
  b += box(160, 16, 400, 96, T.lav, 'Regional plan', 'across jurisdictions');
  b += box(110, 164, 500, 110, P.butter, 'Comprehensive plan', 'whole city, all topics, 20 years');
  b += box(14, 330, 340, 96, T.sky, 'Area plans', 'a place, block by block');
  b += box(366, 330, 340, 96, T.sage, 'Functional plans', 'one system, citywide');
  b += L(arrow(360, 114, 360, 158, rng, { size: 2.4, head: 10 }));
  b += L(arrow(250, 278, 190, 324, rng, { size: 2.4, head: 10 }));
  b += L(arrow(470, 278, 530, 324, rng, { size: 2.4, head: 10 }));
  b += label(360, 474, 'carried out by zoning, the CIP, and programs', { weight: 700 });
  b += note(360, 518, 'adopt area plans into the plan to give them weight', { color: P.tomatoDeep, size: 35 });
  return { W, H, b };
}

// ============================================================ Lesson 4.3

// The plan hierarchy as a funnel, with the lesson's housing example.
function planHierarchy() {
  const rng = makeRng(4301);
  const W = 720;
  const H = 500;
  let b = '';
  const rows = [
    ['Vision', 'room for every age and income', P.sky],
    ['Goal', 'housing for all income levels', T.sky],
    ['Objective', '2,000 affordable homes by 2035', P.butter],
    ['Policy', 'shall allow duplexes citywide', P.sage],
    ['Action', 'draft the code by June 2026', P.blush],
  ];
  const top = 20;
  const rh = 88;
  const cx = 140;
  const half = (i) => 124 - i * 13;
  rows.forEach(([name, ex, fill], i) => {
    const y = top + i * rh;
    const d = polyD([[cx - half(i), y], [cx + half(i), y], [cx + half(i + 1), y + rh - 6], [cx - half(i + 1), y + rh - 6]]);
    b += cut(d, { rng, fill, filter: FLAT, jitter: 0.5 }) + L(ink(d, { rng, size: 2 }));
    b += title(cx, y + rh / 2 + 8, name, { size: 28 });
    b += label(290, y + rh / 2 + 8, ex, { anchor: 'start', weight: 500 });
    b += L(inkLine([[cx + half(i) + 8, y + rh / 2], [280, y + rh / 2]], { rng, size: 1.4, overshoot: 0, opacity: 0.6 }));
  });
  b += note(360, 486, 'broad at the top, assigned at the bottom', { color: P.civicDeep });
  return { W, H, b };
}

// A SMART objective, drawn from its own numbers: 60% today, 80% by 2035.
function smartObjective() {
  const rng = makeRng(4302);
  const W = 720;
  const H = 400;
  let b = '';
  const x0 = 60;
  const w = 560;
  const X = (p) => x0 + (p / 100) * w;
  const y = 170;
  const track = rectD(x0, y, w, 50);
  b += cut(track, { rng, fill: '#EFE7D6', filter: FLAT }) + L(ink(track, { rng, size: 2 }));
  const now = rectD(x0, y, X(60) - x0, 50);
  b += cut(now, { rng, fill: P.leaf, filter: FLAT, shadow: false }) + L(ink(now, { rng, size: 2 }));
  const gap = rectD(X(60), y, X(80) - X(60), 50);
  b += `<path d="${gap}" fill="${P.sage}" opacity="0.7"/>` + hatch(gap, { rng, angle: 45, gap: 9, color: P.leafDeep, opacity: 0.5, size: 1.2 });
  for (const p of [0, 20, 40, 60, 80, 100]) b += label(X(p), y + 90, `${p}%`, { color: MUTED, weight: 500 });
  const flag = (x, text, sub, color, anchor) => {
    const tx = anchor === 'end' ? x - 10 : x + 10;
    let s = L(inkLine([[x, y - 2], [x, y - 90]], { rng, size: 2.4, color, overshoot: 0 }));
    s += label(tx, y - 62, text, { color, weight: 800, anchor });
    s += label(tx, y - 30, sub, { color, weight: 500, anchor });
    return s;
  };
  b += flag(X(60), 'baseline', '60% today', P.leafDeep, 'end');
  b += flag(X(80), 'target', '80% by 2035', P.tomatoDeep, 'start');
  b += label(x0, 330, 'metric: residents within a 10-minute walk of a park', { anchor: 'start', weight: 500 });
  b += note(x0, 380, 'a number, a starting point, a target, and a date', { anchor: 'start', color: P.civicDeep });
  return { W, H, b };
}

// Directive words, from permissive to binding.
function directiveWords() {
  const rng = makeRng(4303);
  const W = 720;
  const H = 360;
  let b = '';
  const words = [['may', 'encourage', 'permits', T.sky], ['should', '', 'expects, with judgment', P.sky], ['shall', 'will', 'commits', P.civic]];
  words.forEach(([w1, w2, what, fill], i) => {
    const x = 20 + i * 234;
    const h = 90 + i * 60;
    const d = roundRectD(x, 280 - h, 212, h, 12);
    b += cut(d, { rng, fill, filter: FLAT }) + L(ink(d, { rng, size: 2.2 }));
    const tc = i === 2 ? '#FFFFFF' : P.ink;
    b += title(x + 106, 280 - h + 46, `“${w1}”`, { size: 32, color: tc });
    if (w2) b += title(x + 106, 280 - h + 84, `“${w2}”`, { size: 28, color: tc });
    b += label(x + 106, 318, what, { weight: 700 });
  });
  b += L(inkLine([[16, 282], [704, 282]], { rng, size: 2.4, overshoot: 0 }));
  b += note(20, 50, 'an all-“encourage” plan', { anchor: 'start', color: P.tomatoDeep });
  b += note(20, 86, 'commits to nothing', { anchor: 'start', color: P.tomatoDeep });
  return { W, H, b };
}

// ============================================================ Lesson 4.4

// A goals-achievement matrix whose winner flips when one weight doubles.
function goalsMatrix() {
  const rng = makeRng(4401);
  const W = 720;
  const H = 470;
  let b = '';
  // Illustrative scores, 1 (poor) to 5 (best), for three criteria.
  const alts = [['A', [2, 5, 4]], ['B', [3, 4, 5]], ['C', [5, 4, 2]]];
  const eq = alts.map(([, sc]) => sc.reduce((a, c) => a + c, 0));
  const dbl = alts.map(([, sc]) => sc[0] * 2 + sc[1] + sc[2]);
  const best = (arr) => arr.indexOf(Math.max(...arr));
  const cols = [180, 300, 415, 545, 660];
  const top = 130;
  const rh = 76;
  const heads = [['Housing'], ['Farmland'], ['Cost'], ['Equal', 'weights'], ['Housing', 'x 2']];
  b += label(60, 58, 'Option', { weight: 800 });
  heads.forEach((h, i) => h.forEach((t, k) => { b += label(cols[i], 58 + k * 32, t, { weight: 800, color: i >= 3 ? P.civicDeep : P.ink }); }));
  const hl = (x, y, fill) => { const d = roundRectD(x - 50, y, 100, rh - 12, 10); return cut(d, { rng, fill, filter: FLAT, shadow: false }) + L(ink(d, { rng, size: 2.4 })); };
  b += hl(cols[3], top + best(eq) * rh, P.butter) + hl(cols[4], top + best(dbl) * rh, P.butter);
  alts.forEach(([name, sc], r) => {
    const y = top + r * rh + 44;
    b += title(60, y, name, { size: 32 });
    sc.forEach((v, c) => { b += label(cols[c], y, String(v)); });
    b += label(cols[3], y, String(eq[r]), { weight: 800 }) + label(cols[4], y, String(dbl[r]), { weight: 800 });
  });
  b += L(inkLine([[20, top - 8], [700, top - 8]], { rng, size: 2, overshoot: 0 }) + inkLine([[478, 40], [478, top + 3 * rh]], { rng, size: 1.6, overshoot: 0, opacity: 0.6 }));
  b += label(40, top + 3 * rh + 40, 'scores 1 to 5, illustrative', { anchor: 'start', color: MUTED, weight: 500 });
  b += note(700, top + 3 * rh + 86, 'one weight changed, and the winner flips', { anchor: 'end', color: P.tomatoDeep });
  return { W, H, b };
}

// Scenario planning: four futures from two uncertainties, one robust strategy.
function scenarioGrid() {
  const rng = makeRng(4402);
  const W = 720;
  const H = 520;
  let b = '';
  const x0 = 170;
  const y0 = 40;
  const cw = 250;
  const ch = 180;
  const cells = [
    [0, 0, 'Fast growth,', 'high impact', T.blush], [1, 0, 'Slow growth,', 'high impact', T.butter],
    [0, 1, 'Fast growth,', 'low impact', T.sky], [1, 1, 'Slow growth,', 'low impact', T.sage],
  ];
  for (const [c, r, l1, l2, fill] of cells) {
    const x = x0 + c * (cw + 10);
    const y = y0 + r * (ch + 10);
    const d = roundRectD(x, y, cw, ch, 14);
    b += cut(d, { rng, fill, filter: FLAT }) + L(ink(d, { rng, size: 2 }));
    b += label(x + cw / 2, y + (r ? ch - 54 : 44), l1, { weight: 700 }) + label(x + cw / 2, y + (r ? ch - 22 : 76), l2, { weight: 500 });
  }
  const cx = x0 + cw + 5;
  const cy = y0 + ch + 5;
  const hub = roundRectD(cx - 110, cy - 46, 220, 92, 46);
  b += cut(hub, { rng, fill: P.paper, filter: FLAT }) + L(ink(hub, { rng, size: 2.6, color: P.leafDeep }));
  b += star(cx - 72, cy, 18, { fill: P.butter, seed: 4 });
  b += label(cx + 14, cy - 6, 'robust', { weight: 800, color: P.leafDeep }) + label(cx + 14, cy + 26, 'strategy', { weight: 800, color: P.leafDeep });
  b += title(150, y0 + ch / 2 - 14, 'Climate', { size: 28, anchor: 'end' });
  b += title(150, y0 + ch / 2 + 18, 'impact', { size: 28, anchor: 'end' });
  b += label(150, y0 + ch / 2 + 54, 'high', { anchor: 'end', color: MUTED, weight: 500 });
  b += label(150, y0 + ch * 1.5 + 30, 'low', { anchor: 'end', color: MUTED, weight: 500 });
  b += title(x0 + cw / 2, y0 + 2 * ch + 60, 'fast growth', { size: 28 }) + title(x0 + cw * 1.5 + 10, y0 + 2 * ch + 60, 'slow growth', { size: 28 });
  b += note(360, 506, 'not predictions: tests for a strategy', { color: P.civicDeep });
  return { W, H, b };
}

// The buildable lands gap from the lesson: demand 12,000, capacity 7,500.
function buildableGap() {
  const rng = makeRng(4403);
  const W = 720;
  const H = 400;
  let b = '';
  const demand = 12000;
  const cap = 7500;
  const x0 = 224;
  const w = 470;
  const X = (v) => x0 + (v / demand) * w;
  const bar = (y, v, fill, name, sub) => {
    const d = rectD(x0, y, X(v) - x0, 64);
    let s = cut(d, { rng, fill, filter: FLAT }) + L(ink(d, { rng, size: 2 }));
    s += title(x0 - 16, y + 32, name, { size: 28, anchor: 'end' }) + label(x0 - 16, y + 62, sub, { anchor: 'end', color: MUTED, weight: 500 });
    s += label(X(v) - 16, y + 44, fmt(v), { anchor: 'end', weight: 800 });
    return s;
  };
  b += bar(50, demand, P.sky, 'Demand', '20 years');
  b += bar(170, cap, P.leaf, 'Capacity', 'current zoning');
  const gap = rectD(X(cap), 170, X(demand) - X(cap), 64);
  b += `<path d="${gap}" fill="${T.blush}"/>` + L(dashed(X(cap), 170, X(demand), 170, rng, { color: P.tomatoDeep }) + dashed(X(demand), 170, X(demand), 234, rng, { color: P.tomatoDeep }) + dashed(X(cap), 234, X(demand), 234, rng, { color: P.tomatoDeep }));
  b += label((X(cap) + X(demand)) / 2, 214, `gap ${fmt(demand - cap)}`, { color: P.tomatoDeep, weight: 800 });
  b += label(x0, 300, 'floodplains, steep slopes removed', { anchor: 'start', color: MUTED, weight: 500 });
  b += note(x0, 356, 'close it with infill: upzone corridors,', { anchor: 'start', color: P.leafDeep });
  b += note(x0, 390, 'allow middle housing', { anchor: 'start', color: P.leafDeep });
  return { W, H, b };
}

// The three scopes of a greenhouse gas inventory.
function ghgScopes() {
  const rng = makeRng(4404);
  const PW = 228;
  const PH = 330;
  const head = (n, sub) => title(PW / 2, 42, `Scope ${n}`, { size: 26 }) + label(PW / 2, 72, sub, { size: 19, color: MUTED, weight: 500 });
  const puff = (x, y) => `<circle cx="${x}" cy="${y}" r="10" fill="#C9C3D3"/><circle cx="${x + 14}" cy="${y - 12}" r="13" fill="#D9D4E1"/>`;
  let s1 = panel(0, 0, PW, PH, T.cream, rng) + head(1, 'direct');
  const truck = roundRectD(50, 170, 110, 56, 8);
  s1 += cut(truck, { rng, fill: P.civic, filter: FLAT }) + L(ink(truck, { rng, size: 2 }));
  s1 += `<circle cx="78" cy="232" r="12" fill="${P.ink}"/><circle cx="136" cy="232" r="12" fill="${P.ink}"/>` + puff(176, 206) + puff(196, 186);
  s1 += label(PW / 2, 150, 'city fleet', { size: 19, weight: 700 });
  s1 += note(PW / 2, 296, 'burned by you', { size: 24 });
  let s2 = panel(0, 0, PW, PH, T.cream, rng) + head(2, 'purchased electricity');
  const plant = rectD(24, 150, 56, 80);
  s2 += cut(plant, { rng, fill: P.kraft, filter: FLAT }) + L(ink(plant, { rng, size: 2 })) + puff(46, 138);
  const bldg = rectD(150, 160, 56, 70);
  s2 += cut(bldg, { rng, fill: P.sky, filter: FLAT }) + L(ink(bldg, { rng, size: 2 }));
  s2 += L(inkLine([[80, 170], [150, 176]], { rng, size: 2, overshoot: 0 }));
  s2 += `<path d="M112 160l-8 14h10l-6 14" fill="none" stroke="${P.butterDeep}" stroke-width="3"/>`;
  s2 += note(PW / 2, 296, 'burned for you', { size: 24 });
  let s3 = panel(0, 0, PW, PH, T.cream, rng) + head(3, 'other indirect');
  const bin = polyD([[70, 170], [158, 170], [150, 232], [78, 232]]);
  s3 += cut(bin, { rng, fill: P.leaf, filter: FLAT }) + L(ink(bin, { rng, size: 2 }));
  s3 += label(PW / 2, 150, 'waste, supply chain', { size: 19, weight: 700 });
  s3 += note(PW / 2, 296, 'caused by you', { size: 24 });
  const panels = [s1, s2, s3];
  return {
    W: 720, H: 358, b: panels.map((q, i) => at(8 + i * 238, 14, q)).join(''),
    narrow: { W: 252, H: 1034, b: panels.map((q, i) => at(12, 12 + i * 342, q)).join('') },
  };
}

// ============================================================ Lesson 5.1

// Cumulative (pyramid) zoning versus exclusive zoning, as two use grids.
function cumulativeZoning() {
  const rng = makeRng(5101);
  const PW = 338;
  const PH = 360;
  const dists = ['R', 'C', 'I'];
  const uses = [['homes', P.butter], ['shops', P.tomato], ['factories', P.lavender]];
  const grid = (allowed, key = true) => {
    let s = '';
    dists.forEach((d, c) => { s += label(136 + c * 66, 108, d, { size: 22, weight: 800 }); });
    uses.forEach(([u, fill], r) => {
      const y = 126 + r * 62;
      s += label(20, y + 38, u, { size: 20, anchor: 'start', weight: 500 });
      dists.forEach((d, c) => {
        const on = allowed(r, c);
        const x = 106 + c * 66;
        const cell = rectD(x, y, 60, 56);
        s += cut(cell, { rng, fill: on ? fill : '#EFE7D6', shadow: false, jitter: 0.4, filter: FLAT }) + L(ink(cell, { rng, size: 1.4, opacity: 0.8 }));
        if (on) s += L(inkLine([[x + 18, y + 30], [x + 27, y + 40], [x + 44, y + 16]], { rng, size: 3, color: P.ink, overshoot: 0 }));
      });
    });
    if (key) s += label(20, 344, 'R homes · C commercial · I industrial', { size: 19, anchor: 'start', color: MUTED, weight: 500 });
    return s;
  };
  let a = panel(0, 0, PW, PH, T.cream, rng) + title(20, 40, 'Cumulative', { size: 25, anchor: 'start' }) + label(20, 70, 'higher uses allowed lower down', { size: 19, anchor: 'start', color: MUTED, weight: 500 });
  a += grid((r, c) => r <= c);
  let b2 = panel(0, 0, PW, PH, T.cream, rng) + title(20, 40, 'Exclusive', { size: 25, anchor: 'start' }) + label(20, 70, 'each district lists its own uses', { size: 19, anchor: 'start', color: MUTED, weight: 500 });
  b2 += grid((r, c) => r === c, false);
  b2 += note(20, 344, 'keeps homes out of industry', { size: 24, anchor: 'start', color: P.tomatoDeep });
  return {
    W: 720, H: 388, b: at(14, 14, a) + at(368, 14, b2),
    narrow: { W: 366, H: 762, b: at(14, 14, a) + at(14, 388, b2) },
  };
}

// A lot in plan view: setbacks leave the buildable area.
function lotStandards() {
  const rng = makeRng(5102);
  const W = 720;
  const H = 520;
  let b = '';
  const lx = 150;
  const ly = 40;
  const lw = 300;
  const lh = 380;
  const [front, side, rear] = [70, 40, 80];
  const lot = rectD(lx, ly, lw, lh);
  b += cut(lot, { rng, fill: T.sage, filter: FLAT }) + L(ink(lot, { rng, size: 2.6 }));
  const env = rectD(lx + side, ly + rear, lw - 2 * side, lh - front - rear);
  b += `<path d="${env}" fill="${T.butter}"/>`;
  const o = { color: P.civicDeep, size: 2, dash: 9, gap: 6 };
  b += L(dashed(lx + side, ly + rear, lx + lw - side, ly + rear, rng, o) + dashed(lx + lw - side, ly + rear, lx + lw - side, ly + lh - front, rng, o) + dashed(lx + lw - side, ly + lh - front, lx + side, ly + lh - front, rng, o) + dashed(lx + side, ly + lh - front, lx + side, ly + rear, rng, o));
  const house2 = rectD(lx + side + 30, ly + rear + 40, 150, 120);
  b += cut(house2, { rng, fill: P.tomato, filter: FLAT }) + L(ink(house2, { rng, size: 2.4 }));
  b += label(lx + side + 105, ly + rear + 108, 'building', { color: '#FFFFFF', weight: 800 });
  // Street along the front.
  b += `<rect x="40" y="${ly + lh + 16}" width="640" height="44" fill="#9C95A8"/>`;
  b += label(360, ly + lh + 48, 'street', { color: '#FFFFFF', weight: 700 });
  // Dimension ticks for each setback.
  const dim = (x1, y1, x2, y2) => L(inkLine([[x1, y1], [x2, y2]], { rng, size: 1.8, overshoot: 0 }) + inkLine([[x1 - (y2 - y1 ? 6 : 0), y1 - (x2 - x1 ? 6 : 0)], [x1 + (y2 - y1 ? 6 : 0), y1 + (x2 - x1 ? 6 : 0)]], { rng, size: 1.8, overshoot: 0 }) + inkLine([[x2 - (y2 - y1 ? 6 : 0), y2 - (x2 - x1 ? 6 : 0)], [x2 + (y2 - y1 ? 6 : 0), y2 + (x2 - x1 ? 6 : 0)]], { rng, size: 1.8, overshoot: 0 }));
  b += dim(lx + lw / 2, ly + lh - front, lx + lw / 2, ly + lh);
  b += dim(lx + lw / 2, ly, lx + lw / 2, ly + rear);
  b += dim(lx + lw - side, ly + 200, lx + lw, ly + 200);
  const cx = 480;
  const call = (y, text, tx, ty, color = P.ink) => label(cx, y, text, { anchor: 'start', color }) + L(arrow(cx - 8, y - 8, tx, ty, rng, { size: 2, head: 9, color, bend: 6 }));
  b += call(80, 'rear setback', lx + lw / 2 + 8, ly + rear / 2);
  b += call(210, 'side setback', lx + lw - side / 2, ly + 190);
  b += call(300, 'buildable area', lx + lw - side - 24, ly + 290, P.kraftDeep);
  b += call(390, 'front setback', lx + lw / 2 + 8, ly + lh - front / 2);
  b += note(20, 130, 'lot', { anchor: 'start', color: P.leafDeep });
  b += note(20, 166, 'coverage:', { anchor: 'start', color: P.leafDeep });
  b += note(20, 202, 'building', { anchor: 'start', color: P.leafDeep });
  b += note(20, 238, '÷ lot', { anchor: 'start', color: P.leafDeep });
  return { W, H, b };
}

// Overlay zones add rules on top; floating zones land when applied.
function overlayFloating() {
  const rng = makeRng(5103);
  const PW = 338;
  const PH = 400;
  const sheet = (x0, y0, w, h, sk) => ([u, v]) => [x0 + u * w + (1 - v) * sk, y0 + v * h];
  let ov = panel(0, 0, PW, PH, T.cream, rng) + title(20, 40, 'Overlay district', { size: 25, anchor: 'start' }) + label(20, 70, 'extra rules on top of the base', { size: 19, anchor: 'start', color: MUTED, weight: 500 });
  const top = sheet(20, 104, 180, 80, 44);
  const bot = sheet(20, 214, 180, 80, 44);
  const quad = (T0, u0, u1) => polyD([[u0, 0], [u1, 0], [u1, 1], [u0, 1]].map(T0));
  // Base districts: three colored strips.
  [[0, 0.4, P.butter], [0.4, 0.7, P.tomato], [0.7, 1, P.lavender]].forEach(([u0, u1, f]) => { ov += `<path d="${quad(bot, u0, u1)}" fill="${f}"/>`; });
  ov += L(ink(quad(bot, 0, 1), { rng, size: 1.8 }));
  ov += `<path d="${quad(top, 0, 1)}" fill="#FBF8F1" opacity="0.9"/>` + `<path d="${quad(top, 0.25, 0.6)}" fill="${P.sky}"/>` + L(ink(quad(top, 0, 1), { rng, size: 1.8 }));
  ov += label(256, 150, 'overlay', { size: 19, anchor: 'start', color: P.civicDeep, weight: 700 }) + label(256, 262, 'base', { size: 19, anchor: 'start', weight: 700 });
  ov += note(20, 340, 'meet both sets of rules', { size: 24, anchor: 'start', color: P.civicDeep });
  ov += label(20, 376, 'e.g. historic, floodplain, airport', { size: 19, anchor: 'start', color: MUTED, weight: 500 });
  let fl = panel(0, 0, PW, PH, T.cream, rng) + title(20, 40, 'Floating zone', { size: 25, anchor: 'start' }) + label(20, 70, 'in the text, not on the map', { size: 19, anchor: 'start', color: MUTED, weight: 500 });
  const card = roundRectD(110, 96, 120, 56, 10);
  fl += `<g transform="rotate(-6 170 124)">${cut(card, { rng, fill: P.butter, filter: FLAT }) + L(ink(card, { rng, size: 2 })) + label(170, 132, 'MXD', { size: 22, weight: 800 })}</g>`;
  for (let r = 0; r < 2; r++) for (let c = 0; c < 4; c++) {
    const on = r === 1 && c === 2;
    const d = rectD(50 + c * 62, 214 + r * 56, 58, 52);
    fl += cut(d, { rng, fill: on ? P.butter : T.sage, shadow: false, jitter: 0.4, filter: FLAT }) + L(ink(d, { rng, size: on ? 2.6 : 1.4 }));
  }
  fl += L(arrow(176, 162, 210, 262, rng, { size: 2.4, head: 11, color: P.tomatoDeep, bend: -14 }));
  fl += note(20, 340, 'lands by rezoning,', { size: 24, anchor: 'start', color: P.tomatoDeep });
  fl += note(20, 370, 'once an owner qualifies', { size: 24, anchor: 'start', color: P.tomatoDeep });
  return {
    W: 720, H: 428, b: at(14, 14, ov) + at(368, 14, fl),
    narrow: { W: 366, H: 842, b: at(14, 14, ov) + at(14, 428, fl) },
  };
}

// Which path a use takes, from the lesson's coffee shop example.
function usePaths() {
  const rng = makeRng(5104);
  const W = 720;
  const H = 470;
  let b = '';
  const rows = [
    ['Permitted', 'coffee shop', 'staff check standards', 'permit issued', T.sage, P.leafDeep],
    ['Conditional', 'drive-through', 'hearing, criteria, findings', 'approved with conditions', T.butter, P.kraftDeep],
    ['Prohibited', 'not on the list', 'no permit possible', 'rezone or amend the text', T.blush, P.tomatoDeep],
  ];
  rows.forEach(([kind, ex, how, result, fill, color], i) => {
    const y = 20 + i * 150;
    const d = roundRectD(14, y, 692, 132, 14);
    b += cut(d, { rng, fill, filter: FLAT }) + L(ink(d, { rng, size: 2 }));
    b += title(34, y + 46, kind, { anchor: 'start', size: 28, color });
    b += label(34, y + 82, ex, { anchor: 'start', color: MUTED, weight: 500 });
    b += label(270, y + 46, how, { anchor: 'start', weight: 500 });
    b += L(arrow(270, y + 72, 300, y + 98, rng, { size: 2, head: 9, bend: 8 }));
    b += label(314, y + 110, result, { anchor: 'start', weight: 800, color });
  });
  return { W, H, b };
}

// ============================================================ Lesson 5.2

// The typical variance findings as five gates on one line.
function varianceGates() {
  const rng = makeRng(5201);
  const W = 720;
  const H = 440;
  let b = '';
  const y = 200;
  const band = roundRectD(40, y - 11, 540, 22, 11);
  b += cut(band, { rng, fill: P.civic }) + L(ink(band, { rng, size: 2.2 }));
  const end = roundRectD(566, y - 30, 144, 60, 14);
  b += cut(end, { rng, fill: P.leaf, filter: FLAT }) + L(ink(end, { rng, size: 2.6 })) + label(638, y + 10, 'variance', { color: '#FFFFFF', weight: 800, size: 28 });
  const gates = [[80, ['Unique', 'to the lot']], [195, ['Not', 'self-created']], [310, ['Denies', 'reasonable use']], [420, ['Keeps the', 'character']], [516, ['The', 'minimum']]];
  gates.forEach(([x, lines], i) => {
    const d = ellipseD(x, y, 24, 24);
    b += cut(d, { rng, fill: P.butter, filter: FLAT }) + L(ink(d, { rng, size: 3 })) + title(x, y + 10, String(i + 1));
    const above = i % 2 === 1;
    lines.forEach((t, k) => { b += label(x, above ? y - 82 + k * 32 : y + 66 + k * 32, t, { weight: k ? 500 : 800 }); });
  });
  b += note(20, 400, 'fail any one: no variance', { anchor: 'start', color: P.tomatoDeep });
  b += note(700, 400, 'profit alone isn’t hardship', { anchor: 'end', color: P.tomatoDeep });
  return { W, H, b };
}

// Area variance versus use variance.
function areaVsUse() {
  const rng = makeRng(5202);
  const PW = 338;
  const PH = 400;
  const head = (t, sub) => title(20, 40, t, { size: 25, anchor: 'start' }) + label(20, 70, sub, { size: 19, anchor: 'start', color: MUTED, weight: 500 });
  let a = panel(0, 0, PW, PH, T.cream, rng) + head('Area variance', 'relaxes a setback, height, coverage');
  const lot = polyD([[40, 110], [300, 110], [300, 190], [40, 250]]);
  a += cut(lot, { rng, fill: T.sage, filter: FLAT }) + L(ink(lot, { rng, size: 2.2 }));
  a += L(dashed(40, 220, 300, 160, rng, { color: P.civicDeep, size: 2 }));
  const hs = rectD(150, 126, 90, 62);
  a += cut(hs, { rng, fill: P.butter, filter: FLAT }) + L(ink(hs, { rng, size: 2.2 }));
  a += label(170, 280, 'odd-shaped lot', { size: 20, weight: 700 }) + label(170, 306, 'house crosses the setback line', { size: 19, color: MUTED, weight: 500 });
  a += note(20, 354, 'often a lower bar:', { size: 24, anchor: 'start', color: P.leafDeep }) + note(20, 382, '“practical difficulty”', { size: 24, anchor: 'start', color: P.leafDeep });
  let u = panel(0, 0, PW, PH, T.cream, rng) + head('Use variance', 'allows a use the district bans');
  for (let k = 0; k < 4; k++) u += house(40 + k * 70, 230, 52, 64, { seed: 60 + k, wall: T.butter, roof: P.kraftDeep, chimney: false });
  u += block(180, 230, 56, 80, { seed: 7, wall: P.tomato, cols: 2, rows: 3 });
  u += label(170, 280, 'a shop on a homes-only street', { size: 19, weight: 700 });
  u += note(20, 354, '“unnecessary hardship”;', { size: 24, anchor: 'start', color: P.tomatoDeep }) + note(20, 382, 'banned in many states', { size: 24, anchor: 'start', color: P.tomatoDeep });
  return {
    W: 720, H: 428, b: at(14, 14, a) + at(368, 14, u),
    narrow: { W: 366, H: 842, b: at(14, 14, a) + at(14, 428, u) },
  };
}

// Spot zoning versus a small rezoning that carries out the plan.
function spotZoning() {
  const rng = makeRng(5203);
  const PW = 338;
  const PH = 400;
  const colors = { R: P.butter, C: P.tomato, I: P.lavender };
  const map = (grid, ring) => {
    let s = '';
    grid.forEach((row, r) => [...row].forEach((z, c) => {
      const d = rectD(46 + c * 50, 96 + r * 50, 48, 48);
      s += cut(d, { rng, fill: colors[z], shadow: false, jitter: 0.4, filter: FLAT }) + L(ink(d, { rng, size: 1.3, opacity: 0.8 }));
    }));
    if (ring) s += L(ink(ellipseD(ring[0], ring[1], 64, 64), { rng, size: 2.4, color: P.civicDeep }));
    return s;
  };
  let a = panel(0, 0, PW, PH, T.cream, rng) + title(20, 40, 'Spot zoning', { size: 25, anchor: 'start' }) + label(20, 70, 'one lot singled out', { size: 19, anchor: 'start', color: MUTED, weight: 500 });
  a += map(['RRRRR', 'RRIRR', 'RRRRR', 'RRRRR'], null);
  a += L(ink(rectD(143, 143, 54, 54), { rng, size: 3.4, color: P.tomatoDeep }));
  a += note(20, 346, 'against the plan,', { size: 24, anchor: 'start', color: P.tomatoDeep }) + note(20, 376, 'for the owner', { size: 24, anchor: 'start', color: P.tomatoDeep });
  let c = panel(0, 0, PW, PH, T.cream, rng) + title(20, 40, 'Defensible', { size: 25, anchor: 'start' }) + label(20, 70, 'small, but carries out the plan', { size: 19, anchor: 'start', color: MUTED, weight: 500 });
  c += map(['RRRRR', 'RRRRR', 'RRCRR', 'RRRRR'], [170, 220]);
  c += label(170, 318, 'plan: shops here', { size: 19, color: P.civicDeep, weight: 700 });
  c += note(20, 346, 'consistent with the plan,', { size: 24, anchor: 'start', color: P.leafDeep }) + note(20, 376, 'serves the public', { size: 24, anchor: 'start', color: P.leafDeep });
  const key = (x, y) => [['R', 'homes'], ['C', 'shops'], ['I', 'industry']].map(([z, t], i) => `<rect x="${x + i * 120}" y="${y - 16}" width="18" height="18" fill="${colors[z]}" stroke="${P.ink}" stroke-width="1.4"/>` + label(x + 26 + i * 120, y, t, { size: 20, anchor: 'start', weight: 500 })).join('');
  return {
    W: 720, H: 458, b: at(14, 14, a) + at(368, 14, c) + key(40, 444),
    narrow: { W: 366, H: 872, b: at(14, 14, a) + at(14, 428, c) + key(20, 858) },
  };
}

// What a legal nonconforming use may and may not do.
function nonconformingRules() {
  const rng = makeRng(5204);
  const W = 720;
  const H = 440;
  let b = '';
  // A fenced salvage yard with stacked old cars, among homes.
  const yard = rectD(40, 150, 220, 110);
  b += cut(yard, { rng, fill: T.kraft, filter: FLAT }) + L(ink(yard, { rng, size: 2.2 }));
  for (let x = 48; x < 256; x += 14) b += L(inkLine([[x, 150], [x, 142]], { rng, size: 1.6, overshoot: 0 }));
  const car = (x, y, fill) => {
    const d = roundRectD(x, y, 70, 30, 10);
    return cut(d, { rng, fill, filter: FLAT }) + L(ink(d, { rng, size: 1.8 })) + `<circle cx="${x + 16}" cy="${y + 30}" r="7" fill="${P.ink}"/><circle cx="${x + 54}" cy="${y + 30}" r="7" fill="${P.ink}"/>`;
  };
  b += car(58, 214, P.sky) + car(136, 214, P.tomato) + car(96, 176, P.butter) + car(176, 176, P.sage);
  b += house(60, 124, 50, 56, { seed: 23, wall: T.butter, roof: P.kraftDeep, chimney: false }) + house(190, 124, 50, 56, { seed: 24, wall: T.butter, roof: P.kraftDeep, chimney: false });
  b += label(150, 312, 'salvage yard,', { weight: 700 }) + label(150, 344, 'now zoned homes', { weight: 500, color: MUTED });
  const rules = [
    [true, 'keep operating'],
    [false, 'expand or intensify'],
    [false, 'rebuild after a big loss'],
    [false, 'restart after abandonment'],
  ];
  rules.forEach(([ok, text], i) => {
    const y = 60 + i * 84;
    const d = ellipseD(316, y - 9, 20, 20);
    b += cut(d, { rng, fill: ok ? P.leaf : P.tomato, filter: FLAT }) + L(ink(d, { rng, size: 2 }));
    b += ok ? L(inkLine([[306, y - 9], [314, y - 1], [327, y - 18]], { rng, size: 3, color: '#FFFFFF', overshoot: 0 }))
      : L(inkLine([[308, y - 17], [324, y - 1]], { rng, size: 3, color: '#FFFFFF', overshoot: 0 }) + inkLine([[324, y - 17], [308, y - 1]], { rng, size: 3, color: '#FFFFFF', overshoot: 0 }));
    b += label(348, y, text, { anchor: 'start', weight: ok ? 800 : 500 });
  });
  b += label(348, 60 + 2 * 84 + 32, '(often over 50% of value)', { anchor: 'start', color: MUTED, weight: 500 });
  b += label(348, 60 + 3 * 84 + 32, '(often 6 to 12 months)', { anchor: 'start', color: MUTED, weight: 500 });
  b += note(20, 404, 'the goal: let nonconformities fade out over time', { anchor: 'start', color: P.civicDeep });
  return { W, H, b };
}

// ============================================================ Lesson 5.3

// The subdivision approval route, from sketch to accepted streets.
function platProcess() {
  const rng = makeRng(5301);
  const W = 720;
  const H = 390;
  let b = '';
  const y = 200;
  const band = roundRectD(40, y - 11, 640, 22, 11);
  b += cut(band, { rng, fill: P.civic }) + L(ink(band, { rng, size: 2.2 }));
  const stops = [[80, ['Sketch', 'plan']], [220, ['Preliminary', 'plat']], [360, ['Build or', 'bond']], [500, ['Final plat,', 'recorded']], [640, ['Accept', 'streets']]];
  stops.forEach(([x, lines], i) => {
    const key = i === 3;
    const d = ellipseD(x, y, key ? 28 : 24, key ? 28 : 24);
    b += cut(d, { rng, fill: key ? P.tomato : P.paper, filter: FLAT }) + L(ink(d, { rng, size: 3 })) + title(x, y + 10, String(i + 1), { color: key ? '#FFFFFF' : P.ink });
    const above = i % 2 === 1;
    lines.forEach((t, k) => { b += label(x, above ? y - 82 + k * 32 : y + 66 + k * 32, t, { weight: k ? 500 : 800 }); });
  });
  b += note(220, 60, 'the main design review', { color: P.civicDeep });
  b += note(560, 360, 'now the lots legally exist', { color: P.tomatoDeep });
  b += L(arrow(530, 336, 506, 290, rng, { color: P.tomatoDeep, size: 2.2, head: 10, bend: 8 }));
  return { W, H, b };
}

// The official map: reserve the road's path before the homes arrive.
function officialMap() {
  const rng = makeRng(5302);
  const PW = 338;
  const PH = 380;
  const lots = (skip) => {
    let s = '';
    for (let r = 0; r < 3; r++) for (let c = 0; c < 5; c++) {
      const x = 40 + c * 54;
      const yy = 110 + r * 64;
      if (skip && c === 2) continue;
      const d = rectD(x, yy, 48, 56);
      s += cut(d, { rng, fill: P.butter, shadow: false, jitter: 0.4, filter: FLAT }) + L(ink(d, { rng, size: 1.4, opacity: 0.8 }));
      s += `<rect x="${x + 14}" y="${yy + 16}" width="20" height="18" fill="${P.tomato}" stroke="${P.ink}" stroke-width="1.2"/>`;
    }
    return s;
  };
  const road = (s0) => L(dashed(169, 96, 169, 310, rng, { color: P.tomatoDeep, size: 3, dash: 12, gap: 8 })) + s0;
  let a = panel(0, 0, PW, PH, T.cream, rng) + title(20, 40, 'No official map', { size: 25, anchor: 'start' }) + label(20, 70, 'homes built in the road’s path', { size: 19, anchor: 'start', color: MUTED, weight: 500 });
  a += lots(false) + road('');
  a += note(20, 350, 'road now means buying homes', { size: 24, anchor: 'start', color: P.tomatoDeep });
  let c = panel(0, 0, PW, PH, T.cream, rng) + title(20, 40, 'Official map', { size: 25, anchor: 'start' }) + label(20, 70, 'right-of-way reserved in advance', { size: 19, anchor: 'start', color: MUTED, weight: 500 });
  c += `<rect x="146" y="100" width="46" height="208" fill="#D9D2C2"/>` + lots(true) + road('');
  c += note(20, 350, 'subdivisions leave room for it', { size: 24, anchor: 'start', color: P.leafDeep });
  return {
    W: 720, H: 408, b: at(14, 14, a) + at(368, 14, c),
    narrow: { W: 366, H: 802, b: at(14, 14, a) + at(14, 408, c) },
  };
}

// When rights vest: the common-law rule and earlier statutory points.
function vestedRights() {
  const rng = makeRng(5303);
  const W = 720;
  const H = 400;
  let b = '';
  const y = 180;
  b += L(arrow(30, y, 700, y, rng, { size: 3, head: 14 }));
  const pts = [
    [90, 'Complete', 'application', P.sky, 'up'],
    [260, 'Preliminary', 'plat approved', P.sky, 'down'],
    [430, 'Permit', 'issued', P.butter, 'up'],
    [600, 'Substantial', 'spending', P.leaf, 'down'],
  ];
  pts.forEach(([x, l1, l2, fill, dir]) => {
    b += `<circle cx="${x}" cy="${y}" r="14" fill="${fill}" stroke="${P.ink}" stroke-width="2"/>`;
    const ty = dir === 'up' ? y - 72 : y + 62;
    b += label(x, ty, l1, { weight: 800 }) + label(x, ty + 32, l2, { weight: 500 });
  });
  const brace = (x0, x1, yy, text, color) => L(inkLine([[x0, yy - 10], [x0, yy], [x1, yy], [x1, yy - 10]], { rng, size: 2.2, color, overshoot: 0 })) + label((x0 + x1) / 2, yy + 32, text, { color, weight: 700 });
  b += brace(70, 290, 320, 'some states vest early', P.civicDeep);
  b += brace(410, 640, 320, 'most states: common law', P.leafDeep);
  b += note(700, 386, 'in good faith, under a valid permit', { anchor: 'end', color: P.leafDeep });
  return { W, H, b };
}

// A development agreement as a trade, from the lesson's example.
function devAgreement() {
  const rng = makeRng(5304);
  const W = 720;
  const H = 444;
  let b = '';
  // A balance beam on a post.
  b += L(inkLine([[360, 130], [360, 380]], { rng, size: 4, overshoot: 0 }));
  b += `<path d="M320 392L360 370L400 392Z" fill="${P.kraft}" stroke="${P.ink}" stroke-width="2"/>`;
  b += L(inkLine([[80, 130], [640, 130]], { rng, size: 4, overshoot: 0 }));
  const pan = (cx, fill, head, lines) => {
    let s = L(inkLine([[cx - 60, 130], [cx - 100, 200]], { rng, size: 1.8, overshoot: 0 }) + inkLine([[cx + 60, 130], [cx + 100, 200]], { rng, size: 1.8, overshoot: 0 }));
    const d = roundRectD(cx - 150, 196, 300, 170, 14);
    s += cut(d, { rng, fill, filter: FLAT }) + L(ink(d, { rng, size: 2.2 }));
    s += title(cx, 238, head, { size: 28 });
    lines.forEach((t, k) => { s += label(cx, 278 + k * 30, t, { weight: 500 }); });
    return s;
  };
  b += pan(180, T.sky, 'City gives', ['standards locked', 'for 15 years']);
  b += pan(540, T.sage, 'Developer gives', ['fire station site,', 'trails, and 10%', 'affordable homes']);
  b += note(360, 60, 'certainty for the developer, benefits for the public', { color: P.civicDeep, size: 35 });
  b += label(360, 426, 'adopted in public, within state authority', { color: MUTED, weight: 500 });
  return { W, H, b };
}

// ============================================================ Lesson 5.4

// The same corridor under Euclidean rules and under a form-based code.
function formBased() {
  const rng = makeRng(5401);
  const PW = 338;
  const PH = 380;
  const street = (s0) => `<rect x="12" y="290" width="314" height="40" fill="#9C95A8"/>` + `<rect x="12" y="276" width="314" height="14" fill="#E3DCCB"/>` + s0;
  const lotLines = (y0) => [0, 1, 2].map((k) => L(inkLine([[12 + k * 105 + 105, y0], [12 + k * 105 + 105, 276]], { rng, size: 1.2, opacity: 0.5, overshoot: 0 }))).join('');
  let eu = panel(0, 0, PW, PH, T.cream, rng) + title(20, 40, 'Euclidean', { size: 25, anchor: 'start' }) + label(20, 70, 'buildings behind parking', { size: 19, anchor: 'start', color: MUTED, weight: 500 });
  eu += street('');
  for (let k = 0; k < 3; k++) {
    const x = 22 + k * 105;
    eu += `<rect x="${x}" y="190" width="85" height="80" fill="#D6D1C6"/>`;
    for (let j = 0; j < 3; j++) eu += `<rect x="${x + 8 + j * 26}" y="210" width="18" height="36" fill="none" stroke="#FFFFFF" stroke-width="2"/>`;
    const bd = rectD(x + 10, 100 + (k % 2) * 20, 65, 70 - (k % 2) * 20);
    eu += cut(bd, { rng, fill: [P.tomato, P.butter, P.lavender][k], filter: FLAT }) + L(ink(bd, { rng, size: 2 }));
  }
  eu += lotLines(96);
  eu += note(20, 362, 'set back, car-first', { size: 24, anchor: 'start', color: P.tomatoDeep });
  let fb = panel(0, 0, PW, PH, T.cream, rng) + title(20, 40, 'Form-based', { size: 25, anchor: 'start' }) + label(20, 70, 'built to the sidewalk', { size: 19, anchor: 'start', color: MUTED, weight: 500 });
  fb += street('');
  for (let k = 0; k < 3; k++) {
    const x = 22 + k * 105;
    fb += `<rect x="${x}" y="100" width="85" height="60" fill="#D6D1C6"/>`;
    const bd = rectD(x + 4, 176, 80, 96);
    fb += cut(bd, { rng, fill: [P.tomato, P.butter, P.lavender][k], filter: FLAT }) + L(ink(bd, { rng, size: 2 }));
    fb += `<rect x="${x + 14}" y="236" width="60" height="30" fill="${P.sky}" stroke="${P.ink}" stroke-width="1.4"/>`;
    fb += `<circle cx="${x + 94}" cy="283" r="9" fill="${P.leaf}" stroke="${P.ink}" stroke-width="1.4"/>`;
  }
  fb += L(dashed(12, 272, 326, 272, rng, { color: P.civicDeep, size: 2 }));
  fb += label(169, 138, 'parking behind', { size: 19, color: MUTED, weight: 700 });
  fb += note(20, 362, 'build-to line, active fronts', { size: 24, anchor: 'start', color: P.leafDeep });
  return {
    W: 720, H: 408, b: at(14, 14, eu) + at(368, 14, fb),
    narrow: { W: 366, H: 802, b: at(14, 14, eu) + at(14, 408, fb) },
  };
}

// Conventional and conservation subdivisions with the same 16 homes.
function clusterSubdivision() {
  const rng = makeRng(5402);
  const PW = 338;
  const PH = 380;
  const site = (s0) => { const d = rectD(34, 90, 270, 216); return cut(d, { rng, fill: T.sage, filter: FLAT }) + L(ink(d, { rng, size: 2.2 })) + s0; };
  const home = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${P.butter}" stroke="${P.ink}" stroke-width="1.4"/><rect x="${x + w / 2 - 6}" y="${y + h / 2 - 5}" width="12" height="10" fill="${P.tomato}"/>`;
  let conv = panel(0, 0, PW, PH, T.cream, rng) + title(20, 40, 'Conventional', { size: 25, anchor: 'start' }) + label(20, 70, '16 homes on big lots', { size: 19, anchor: 'start', color: MUTED, weight: 500 });
  let homes = '';
  for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) homes += home(34 + c * 67.5, 90 + r * 54, 67.5, 54);
  conv += site(homes);
  conv += note(20, 350, 'all of the land divided', { size: 24, anchor: 'start', color: P.tomatoDeep });
  let cl = panel(0, 0, PW, PH, T.cream, rng) + title(20, 40, 'Conservation', { size: 25, anchor: 'start' }) + label(20, 70, 'the same 16 homes, clustered', { size: 19, anchor: 'start', color: MUTED, weight: 500 });
  let ch = '';
  for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) ch += home(34 + c * 30, 90 + r * 54, 30, 54);
  let trees = '';
  for (const [x, y] of [[200, 130], [250, 170], [190, 220], [270, 250], [230, 110]]) trees += `<circle cx="${x}" cy="${y}" r="14" fill="${P.leaf}" stroke="${P.ink}" stroke-width="1.4"/>`;
  cl += site(ch + trees);
  cl += label(220, 300, 'open space', { size: 19, weight: 700, color: P.leafDeep });
  cl += note(20, 350, 'more than half kept open', { size: 24, anchor: 'start', color: P.leafDeep });
  return {
    W: 720, H: 408, b: at(14, 14, conv) + at(368, 14, cl),
    narrow: { W: 366, H: 802, b: at(14, 14, conv) + at(14, 408, cl) },
  };
}

// Transfer of development rights: from a sending farm to a receiving center.
function tdrFlow() {
  const rng = makeRng(5403);
  const W = 720;
  const H = 440;
  let b = '';
  // Sending area: a farm under easement.
  const field = rectD(20, 150, 250, 150);
  b += cut(field, { rng, fill: T.sage, filter: FLAT }) + L(ink(field, { rng, size: 2 }));
  for (let k = 0; k < 6; k++) b += L(inkLine([[34, 170 + k * 22], [256, 170 + k * 22]], { rng, size: 1.2, color: P.leafDeep, opacity: 0.6, overshoot: 0 }));
  b += house(110, 200, 60, 60, { seed: 31, wall: P.blush, roof: P.tomato });
  b += stamp(145, 270, 'EASEMENT', P.leafDeep, rng, { size: 28, rot: -6 });
  b += title(145, 60, 'Sending area', { size: 28 }) + label(145, 94, 'farmland, habitat', { color: MUTED, weight: 500 });
  // Receiving area: a center with a taller building.
  b += block(470, 300, 70, 100, { seed: 32, wall: P.sky, cols: 2, rows: 3 });
  b += block(550, 300, 80, 180, { seed: 33, wall: P.lavender, cols: 3, rows: 6 });
  b += block(640, 300, 60, 90, { seed: 34, wall: P.butter, cols: 2, rows: 3 });
  b += L(dashed(540, 204, 640, 204, rng, { color: P.tomatoDeep, size: 2 }));
  b += label(590, 330, 'extra height', { color: P.tomatoDeep, weight: 700 });
  b += title(560, 60, 'Receiving area', { size: 28 }) + label(560, 94, 'where growth is wanted', { color: MUTED, weight: 500 });
  // Rights go one way; money comes back.
  b += L(arrow(284, 200, 452, 200, rng, { size: 3, head: 13, color: P.civicDeep, bend: -20 }));
  b += label(368, 170, 'rights', { color: P.civicDeep, weight: 800 });
  b += L(arrow(452, 262, 284, 262, rng, { size: 3, head: 13, color: P.leafDeep, bend: -20 }));
  b += label(368, 316, 'payment', { color: P.leafDeep, weight: 800 });
  b += note(20, 400, 'works only if developers want the extra rights', { anchor: 'start', color: P.tomatoDeep });
  b += label(20, 434, 'PDR skips the market: public funds buy the rights', { anchor: 'start', color: MUTED, weight: 500, size: 28 });
  return { W, H, b };
}

// An urban growth boundary: urban inside, rural outside.
function growthBoundary() {
  const rng = makeRng(5404);
  const W = 720;
  const H = 480;
  let b = '';
  const bg = rectD(14, 14, 692, 452);
  b += cut(bg, { rng, fill: T.sage, filter: FLAT, shadow: false }) + L(ink(bg, { rng, size: 1.8 }));
  for (let k = 0; k < 14; k++) b += L(inkLine([[30, 36 + k * 30], [690, 30 + k * 30]], { rng, size: 1, color: P.leafDeep, opacity: 0.35, overshoot: 0 }));
  const ugb = blobD(330, 240, 200, 150, makeRng(21), 8, 0.08);
  b += cut(ugb, { rng, fill: T.butter, filter: FLAT }) + L(ink(ugb, { rng, size: 3.4, color: P.tomatoDeep }));
  // Built-up core, with infill sites marked inside.
  const core = blobD(330, 240, 110, 80, makeRng(22), 7, 0.1);
  b += cut(core, { rng, fill: P.butter, filter: FLAT }) + L(ink(core, { rng, size: 1.8 }));
  for (const [x, y] of [[280, 210], [330, 250], [380, 220], [300, 270], [360, 280], [250, 250], [410, 250]]) b += `<rect x="${x}" y="${y}" width="18" height="18" fill="${P.tomato}" stroke="${P.ink}" stroke-width="1.2"/>`;
  b += label(330, 196, 'urban uses and services', { weight: 700 });
  b += label(580, 440, 'rural: farms, forest', { weight: 700, color: P.leafDeep });
  b += label(600, 70, 'growth boundary', { weight: 800, color: P.tomatoDeep });
  b += L(arrow(600, 84, 500, 150, rng, { color: P.tomatoDeep, size: 2.2, head: 10, bend: 6 }));
  b += note(34, 420, 'needs enough room inside', { anchor: 'start', color: P.civicDeep });
  b += note(34, 454, 'for projected growth', { anchor: 'start', color: P.civicDeep });
  return { W, H, b };
}

// ============================================================ Lesson 5.5

// FAR 2.0 built three ways, drawn to scale: stories = FAR / coverage.
function farShapes() {
  const rng = makeRng(5501);
  const W = 720;
  const H = 440;
  let b = '';
  const FAR = 2.0;
  const lotW = 190;
  const story = 26;
  const base = 330;
  [1, 0.5, 0.25].forEach((cov, i) => {
    const cx = 124 + i * 236;
    const x0 = cx - lotW / 2;
    const floors = FAR / cov;
    const bw = lotW * cov;
    b += `<rect x="${x0}" y="${base}" width="${lotW}" height="12" fill="${P.sage}" stroke="${P.ink}" stroke-width="1.6"/>`;
    for (let f = 0; f < floors; f++) {
      const d = rectD(cx - bw / 2, base - (f + 1) * story, bw, story);
      b += cut(d, { rng, fill: [P.butter, P.sky, P.lavender][i], shadow: f === 0, jitter: 0.3, filter: FLAT }) + L(ink(d, { rng, size: 1.6 }));
    }
    b += title(cx, base + 52, `${floors} stories`, { size: 28 });
    b += label(cx, base + 86, `${Math.round(cov * 100)}% coverage`, { weight: 500, color: MUTED });
  });
  b += note(360, 60, 'same FAR 2.0: stories = FAR ÷ coverage', { color: P.civicDeep });
  return { W, H, b };
}

// Gross versus net density, from the lesson's 40-acre example.
function grossNet() {
  const rng = makeRng(5502);
  const W = 720;
  const H = 440;
  let b = '';
  const acres = 40;
  const setAside = 0.25;
  const perNet = 6;
  const net = acres * (1 - setAside);
  const units = net * perNet;
  const gross = units / acres;
  const cell = 48;
  // 8 x 5 acres; streets and open space take a column and part of a row.
  const off = new Set([3, 11, 19, 27, 35, 32, 33, 34, 36, 37]);
  for (let i = 0; i < acres; i++) {
    const x = 24 + (i % 8) * (cell + 2);
    const y = 60 + Math.floor(i / 8) * (cell + 2);
    const out = off.has(i);
    b += `<rect x="${x}" y="${y}" width="${cell}" height="${cell}" rx="4" fill="${out ? '#B9B3C4' : P.butter}" stroke="${P.ink}" stroke-width="1.2"/>`;
  }
  b += label(24, 40, 'each square: 1 acre', { anchor: 'start', color: MUTED, weight: 500 });
  const lx = 440;
  const rows = [
    [`${acres} acres`, P.ink, 800], [`− ${acres - net} for streets,`, MUTED, 500], ['open space', MUTED, 500],
    [`= ${net} net acres`, P.kraftDeep, 800], [`× ${perNet} per net acre`, MUTED, 500], [`= ${units} units`, P.tomatoDeep, 800],
  ];
  rows.forEach(([t, color, weight], k) => { b += label(lx, 80 + k * 38, t, { anchor: 'start', color, weight }); });
  b += `<rect x="24" y="340" width="22" height="22" fill="#B9B3C4" stroke="${P.ink}" stroke-width="1.2"/>` + label(56, 358, 'streets, open space', { anchor: 'start', weight: 500 });
  b += note(24, 418, `gross density: ${units} ÷ ${acres} = ${gross} per acre`, { anchor: 'start', color: P.civicDeep });
  return { W, H, b };
}

// Parking land against the store's own footprint, drawn to the same scale.
function parkingLand() {
  const rng = makeRng(5503);
  const W = 720;
  const H = 440;
  let b = '';
  const store = 60000;
  const spaces = (store / 1000) * 4;
  const park = spaces * 350;
  const h = 200;
  const k = 1 / 300; // px of width per sq ft, at 200 px tall
  const sw = store * k;
  const pw = park * k;
  const y = 110;
  const sd = rectD(30, y, sw, h);
  b += cut(sd, { rng, fill: P.tomato, filter: FLAT }) + L(ink(sd, { rng, size: 2.2 }));
  b += label(30 + sw / 2, y + h / 2 + 10, 'store', { color: '#FFFFFF', weight: 800 });
  const pd = rectD(50 + sw, y, pw, h);
  b += `<path d="${pd}" fill="#9C95A8"/>`;
  for (let x = 50 + sw + 14; x < 50 + sw + pw - 6; x += 20) b += `<line x1="${x}" y1="${y + 8}" x2="${x}" y2="${y + 70}" stroke="#FFFFFF" stroke-width="2"/><line x1="${x}" y1="${y + h - 70}" x2="${x}" y2="${y + h - 8}" stroke="#FFFFFF" stroke-width="2"/>`;
  b += L(ink(pd, { rng, size: 2.2 }));
  b += label(50 + sw + pw / 2, y + h / 2 + 10, 'parking', { color: '#FFFFFF', weight: 800 });
  b += label(30, 60, `one story, ${fmt(store)} sq ft`, { anchor: 'start', color: P.tomatoDeep, weight: 700 });
  b += label(700, 60, `${spaces} spaces × 350 sq ft`, { anchor: 'end', weight: 700 });
  b += label(30, y + h + 44, `store: ${fmt(store)} sq ft`, { anchor: 'start', weight: 500 });
  b += label(700, y + h + 44, `lot: ${fmt(park)} sq ft (${(park / 43560).toFixed(2)} acres)`, { anchor: 'end', weight: 500 });
  b += note(360, 420, 'the parking is bigger than the building', { color: P.tomatoDeep });
  return { W, H, b };
}

// Cost burden, from the lesson's example household.
function costBurden() {
  const rng = makeRng(5504);
  const W = 720;
  const H = 400;
  let b = '';
  const income = 42000;
  const monthly = income / 12;
  const rent = 1300;
  const afford = monthly * 0.3;
  const x0 = 40;
  const w = 640;
  const X = (v) => x0 + (v / monthly) * w;
  const y = 150;
  const all = rectD(x0, y, w, 70);
  b += cut(all, { rng, fill: '#EFE7D6', filter: FLAT }) + L(ink(all, { rng, size: 2 }));
  const r = rectD(x0, y, X(rent) - x0, 70);
  b += cut(r, { rng, fill: P.tomato, filter: FLAT, shadow: false }) + L(ink(r, { rng, size: 2 }));
  b += label((x0 + X(afford)) / 2, y + 46, `rent $${fmt(rent)}`, { color: '#FFFFFF', weight: 800 });
  b += L(dashed(X(afford), y - 30, X(afford), y + 110, rng, { color: P.civicDeep, size: 2.6 }));
  b += label(X(afford) + 10, y - 16, `30% of income: $${fmt(afford)}`, { anchor: 'start', color: P.civicDeep, weight: 800 });
  b += label(x0, 60, `income: $${fmt(monthly)} a month`, { anchor: 'start', weight: 700 });
  b += label(x0 + w, y + 110, `$${fmt(monthly)}`, { anchor: 'end', color: MUTED, weight: 500 });
  b += label(x0, y + 110, '$0', { anchor: 'start', color: MUTED, weight: 500 });
  b += title(x0, 350, `${Math.round((rent / monthly) * 100)}% of income: cost-burdened`, { anchor: 'start', size: 28, color: P.tomatoDeep });
  b += note(700, 390, 'over the line by $250 a month', { anchor: 'end', color: P.tomatoDeep });
  return { W, H, b };
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
  ['fig-history-timeline', historyTimeline],
  ['fig-wedding-cake', weddingCake],
  ['fig-garden-city', gardenCity],
  ['fig-neighborhood-unit', neighborhoodUnit],
  ['fig-radburn', radburn],
  ['fig-rational-model', rationalModel],
  ['fig-decision-styles', decisionStyles],
  ['fig-planner-roles', plannerRoles],
  ['fig-planners-triangle', plannersTriangle],
  ['fig-urban-models', urbanModels],
  ['fig-central-place', centralPlace],
  ['fig-suburban-waves', suburbanWaves],
  ['fig-segregation-timeline', segregationTimeline],
  ['fig-lynch', lynchElements],
  ['fig-power-flow', powerFlow],
  ['fig-facial-as-applied', facialAsApplied],
  ['fig-household-cases', householdCases],
  ['fig-sign-content', signContent],
  ['fig-takings-route', takingsRoute],
  ['fig-parcel-whole', parcelAsWhole],
  ['fig-exaction-gates', exactionGates],
  ['fig-housing-laws', housingLaws],
  ['fig-fair-housing-classes', fairHousingClasses],
  ['fig-one-project', oneProject],
  ['fig-arnstein', arnsteinLadder],
  ['fig-iap2', iap2Spectrum],
  ['fig-engage-early', engageEarly],
  ['fig-hearing-meeting', hearingVsMeeting],
  ['fig-participation-gap', participationGap],
  ['fig-who-missing', whoMissing],
  ['fig-three-equities', threeEquities],
  ['fig-wcag', wcagPour],
  ['fig-positions-interests', positionsInterests],
  ['fig-adr', adrWhoDecides],
  ['fig-agreement', agreementGradients],
  ['fig-nominal-group', nominalGroup],
  ['fig-who-does-what', whoDoesWhat],
  ['fig-staff-report', staffReport],
  ['fig-flood-odds', floodOdds],
  ['fig-planning-sequence', planningSequence],
  ['fig-hazards-first', hazardsFirst],
  ['fig-tradeoff', tradeoffOptions],
  ['fig-growth-drift', growthDrift],
  ['fig-flu-zoning', fluVsZoning],
  ['fig-consistency', consistencySpectrum],
  ['fig-plan-family', planFamily],
  ['fig-plan-hierarchy', planHierarchy],
  ['fig-smart', smartObjective],
  ['fig-directive-words', directiveWords],
  ['fig-goals-matrix', goalsMatrix],
  ['fig-scenarios', scenarioGrid],
  ['fig-buildable-gap', buildableGap],
  ['fig-ghg-scopes', ghgScopes],
  ['fig-cumulative', cumulativeZoning],
  ['fig-lot-standards', lotStandards],
  ['fig-overlay-floating', overlayFloating],
  ['fig-use-paths', usePaths],
  ['fig-variance-gates', varianceGates],
  ['fig-area-use', areaVsUse],
  ['fig-spot-zoning', spotZoning],
  ['fig-nonconforming', nonconformingRules],
  ['fig-plat-process', platProcess],
  ['fig-official-map', officialMap],
  ['fig-vested-rights', vestedRights],
  ['fig-dev-agreement', devAgreement],
  ['fig-form-based', formBased],
  ['fig-cluster', clusterSubdivision],
  ['fig-tdr', tdrFlow],
  ['fig-ugb', growthBoundary],
  ['fig-far-shapes', farShapes],
  ['fig-gross-net', grossNet],
  ['fig-parking-land', parkingLand],
  ['fig-cost-burden', costBurden],
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
