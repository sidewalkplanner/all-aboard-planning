// Lesson figures: teaching diagrams in the collage style, placed in lesson
// Markdown with a `:::figure fig-name | alt text` block (see
// scripts/markdown.mjs). Charts are hand-inked but drawn to scale: every bar,
// curve, and marker is computed from the numbers in its label.
//
// Lettering is baked in, so each figure's alt text in the lesson must say
// everything the figure says. Caveat's embedded subset has no ≈, →, or σ, so
// labels spell those out ("about", drawn arrows, "SD").
import { svgDoc, cut, ink, inkLine, hatch, rectD, roundRectD, ellipseD, blobD, polyD, makeRng, PALETTE as P } from '../lib/draw.mjs';
import { house, person, sun, tape, sparkle, star } from '../lib/props.mjs';
import { hand, serif } from './spots.mjs';

const OFF = 'translate(-1.5,-1.1)';
const L = (s) => `<g transform="${OFF}">${s}</g>`;
const fmtMoney = (n) => '$' + Math.round(n).toLocaleString('en-US');

// Pale tints of the cut-paper colours, for panel backgrounds and bands.
const T = { sky: '#DCE9F5', butter: '#F8E4AE', kraft: '#EFE1C8', blush: '#F9D9D2', sage: '#DCEBD6', lav: '#E3DAF1', cream: P.cream };

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
  return cut(d, { rng, fill, jitter: 1, filter: 'none' }) + L(ink(d, { rng, size: 2, wobble: 0.8 }));
}

// Plain label backing, so a label can sit across a line and stay readable.
const backing = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="#FFFDF8"/>`;

// ============================================================ Lesson 1.1

// A research design as a transit line: five stops, in order.
function researchRoute() {
  const rng = makeRng(1101);
  const W = 720;
  const H = 250;
  let b = '';
  const y = 128;
  const band = roundRectD(40, y - 11, 640, 22, 11);
  b += cut(band, { rng, fill: P.civic });
  b += L(ink(band, { rng, size: 2.2 }));
  const stops = [
    [80, ['Question']],
    [220, ['Unit of', 'analysis']],
    [360, ['Data', 'sources']],
    [500, ['Method']],
    [640, ['Limits']],
  ];
  stops.forEach(([x, label], i) => {
    const r = i === 0 ? 25 : 19;
    const d = ellipseD(x, y, r, r);
    b += cut(d, { rng, fill: i === 0 ? P.butter : P.paper, jitter: 0.5 });
    b += L(ink(d, { rng, size: 3 }));
    b += serif(x, y + 7, String(i + 1), { size: i === 0 ? 22 : 19 });
    label.forEach((line, k) => { b += hand(x, y + 62 + k * 30, line, { size: 31 }); });
  });
  b += hand(40, 44, 'start here, not with the data', { size: 29, color: P.tomatoDeep, anchor: 'start', rotate: -2 });
  b += L(arrow(118, 56, 92, 96, rng, { color: P.tomatoDeep, bend: -14 }));
  b += sparkle(662, 50, 11, { seed: 6 });
  b += star(612, 60, 8, { fill: P.butter, seed: 7 });
  return { W, H, b };
}

// Primary data (you collect it) beside secondary data (it already exists).
function primarySecondary() {
  const rng = makeRng(1102);
  const W = 720;
  const H = 390;
  let b = '';
  b += panel(14, 14, 338, 362, T.sky, rng);
  b += panel(368, 14, 338, 362, T.kraft, rng);
  b += serif(36, 56, 'Primary data', { size: 27, anchor: 'start' });
  b += hand(36, 86, 'you collect it for your question', { size: 25, anchor: 'start', color: P.civicDeep });
  b += serif(390, 56, 'Secondary data', { size: 27, anchor: 'start' });
  b += hand(390, 86, 'someone else already collected it', { size: 25, anchor: 'start', color: P.kraftDeep });

  // Left: a planner with a clipboard, and the tally sheet they're filling in.
  b += person(92, 268, 2, { coat: P.tomato, prop: 'clipboard', seed: 21 });
  const sheet = rectD(178, 116, 140, 150);
  b += cut(sheet, { rng, fill: P.paper, extra: ' transform="rotate(4 248 191)"' });
  let marks = ink(sheet, { rng, size: 2 });
  marks += hand(188, 146, 'bikes counted', { size: 24, anchor: 'start' });
  const tally = (x0, y0, n) => {
    let s = '';
    for (let i = 0; i < Math.min(n, 4); i++) s += inkLine([[x0 + i * 9, y0], [x0 + i * 9 + 1, y0 + 24]], { rng, size: 2, overshoot: 0 });
    if (n >= 5) s += inkLine([[x0 - 4, y0 + 18], [x0 + 32, y0 + 6]], { rng, size: 2, overshoot: 0 });
    return s;
  };
  marks += tally(194, 164, 5) + tally(238, 164, 5) + tally(282, 164, 3);
  marks += tally(194, 206, 5) + tally(238, 206, 2);
  b += `<g transform="rotate(4 248 191)">${L(marks)}</g>`;
  b += tape(222, 104, 56, 18, -8, { seed: 4 });

  // Right: a stack of other people's reports.
  const books = [
    [430, 240, 230, 44, P.civic, 'CENSUS TABLES', -2],
    [446, 192, 214, 44, P.leaf, 'PERMIT RECORDS', 2],
    [424, 144, 226, 44, P.butter, 'CRASH DATABASE', -3],
  ];
  for (const [x, y, w, h, c, label, rot] of books) {
    const d = roundRectD(x, y, w, h, 5);
    const t = ` transform="rotate(${rot} ${x + w / 2} ${y + h / 2})"`;
    b += `<g${t}>${cut(d, { rng, fill: c })}${L(ink(d, { rng, size: 2.2 }))}${serif(x + w / 2, y + h / 2 + 6, label, { size: 15, spacing: 1.5, color: c === P.butter ? P.ink : P.paper })}</g>`;
  }

  const pro = (x, y, text) => hand(x, y, text, { size: 25, anchor: 'start', color: P.leafDeep });
  const con = (x, y, text) => hand(x, y, text, { size: 25, anchor: 'start', color: P.tomatoDeep });
  b += pro(36, 318, '+ fits your exact question');
  b += con(36, 350, '− costs time and money');
  b += pro(390, 318, '+ fast and cheap');
  b += con(390, 350, '− built for another purpose');
  return { W, H, b };
}

// Everyone counted every ten years, versus a sample every year.
function censusVsAcs() {
  const rng = makeRng(1103);
  const W = 720;
  const H = 420;
  let b = '';
  const row = (top, title, note, picked) => {
    let s = serif(24, top + 30, title, { size: 25, anchor: 'start' });
    s += hand(24, top + 60, note, { size: 25, anchor: 'start', color: P.civicDeep });
    const baseY = top + 150;
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
  b += row(8, 'Decennial census', 'everyone, every 10 years: the full count', 'all');
  b += L(inkLine([[24, 208], [696, 204]], { rng, size: 1.4, opacity: 0.5 }));
  b += row(214, 'American Community Survey (ACS)', 'a sample, every year: estimates with a ± margin of error', [1, 4, 8]);
  return { W, H, b };
}

// Four ways to draw a sample from the same 24 people.
function samplingMethods() {
  const rng = makeRng(1104);
  const W = 720;
  const H = 560;
  let b = '';
  const COLS = 6;
  const ROWS = 4;
  const SP = 40;
  const R = 11;
  const grid = (px, py, left = 71) => {
    const pts = [];
    for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) pts.push([px + left + c * SP, py + 112 + r * SP]);
    return pts;
  };
  const dots = (pts, chosen) => pts.map(([x, y], i) => {
    const on = chosen.includes(i);
    const d = ellipseD(x, y, R, R);
    return cut(d, { rng, fill: on ? P.tomato : P.paper, shadow: on, jitter: 0.4 }) + L(ink(d, { rng, size: on ? 2.4 : 1.6, opacity: on ? 1 : 0.7 }));
  }).join('');
  const head = (px, py, title, sub) => serif(px + 20, py + 40, title, { size: 23, anchor: 'start' }) + hand(px + 20, py + 68, sub, { size: 22, anchor: 'start', color: P.civicDeep });
  const origins = [[12, 12], [366, 12], [12, 290], [366, 290]];

  // Simple random.
  {
    const [px, py] = origins[0];
    b += panel(px, py, 342, 262, T.cream, rng);
    b += head(px, py, 'Simple random', 'everyone has an equal chance');
    b += dots(grid(px, py), [2, 7, 11, 14, 19, 22]);
  }
  // Stratified: renters (row 1) and owners (rows 2 to 4), sampled separately.
  {
    const [px, py] = origins[1];
    b += panel(px, py, 342, 262, T.cream, rng);
    b += head(px, py, 'Stratified', 'sample within each group');
    const g = grid(px, py, 50);
    const bandA = roundRectD(px + 32, py + 112 - 19, 236, 38, 10);
    const bandB = roundRectD(px + 32, py + 112 + SP - 19, 236, 38 + 2 * SP, 10);
    b += cut(bandA, { rng, fill: P.sky, shadow: false }) + cut(bandB, { rng, fill: T.butter, shadow: false });
    b += hand(px + 274, py + 119, 'renters', { size: 23, anchor: 'start' });
    b += hand(px + 274, py + 119 + 2 * SP, 'owners', { size: 23, anchor: 'start' });
    b += dots(g, [1, 4, 8, 13, 17, 22]);
  }
  // Cluster: six blocks of four; two whole blocks chosen.
  {
    const [px, py] = origins[2];
    b += panel(px, py, 342, 262, T.cream, rng);
    b += head(px, py, 'Cluster', 'pick whole blocks, survey everyone');
    const g = grid(px, py);
    for (let br = 0; br < 2; br++) {
      for (let bc = 0; bc < 3; bc++) {
        const [x0, y0] = g[br * 2 * COLS + bc * 2];
        const d = roundRectD(x0 - 17, y0 - 17, SP + 34, SP + 34, 9);
        const chosen = (br === 0 && bc === 1) || (br === 1 && bc === 0);
        b += cut(d, { rng, fill: chosen ? T.blush : T.kraft, shadow: false, jitter: 0.8 });
        b += L(ink(d, { rng, size: 1.4, opacity: 0.7 }));
      }
    }
    b += dots(g, [2, 3, 8, 9, 12, 13, 18, 19]);
  }
  // Systematic: every 4th person after a random start.
  {
    const [px, py] = origins[3];
    b += panel(px, py, 342, 262, T.cream, rng);
    b += head(px, py, 'Systematic', 'every 4th, after a random start');
    const g = grid(px, py);
    b += dots(g, [1, 5, 9, 13, 17, 21]);
    b += hand(g[1][0] + 18, g[1][1] - 16, 'start', { size: 22, anchor: 'start', color: P.tomatoDeep });
  }
  return { W, H, b };
}

// Validity and reliability as three targets.
function validityTargets() {
  const rng = makeRng(1105);
  const W = 720;
  const H = 340;
  let b = '';
  const targets = [
    [122, 'Neither', 'scattered and off target', 'scatter'],
    [360, 'Reliable, not valid', 'consistent, but wrong', 'off'],
    [598, 'Valid and reliable', 'consistent and on target', 'on'],
  ];
  const cy = 142;
  for (const [cx, title, note, kind] of targets) {
    const rings = [[98, P.paper], [74, P.blush], [50, P.paper], [26, P.tomato]];
    for (const [r, fill] of rings) {
      const d = ellipseD(cx, cy, r, r);
      b += cut(d, { rng, fill, shadow: r === 98, jitter: 0.6 });
      b += L(ink(d, { rng, size: 2 }));
    }
    const hits = [];
    const hr = makeRng(kind.length * 17 + 5);
    if (kind === 'scatter') {
      const spots = [[-58, -40], [40, -62], [66, 30], [-20, 58], [-70, 18], [16, -18], [52, -12]];
      for (const [dx, dy] of spots) hits.push([cx + dx, cy + dy]);
    } else {
      const [ox, oy] = kind === 'off' ? [44, -44] : [0, 0];
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2 + hr() * 0.8;
        const rr = 6 + hr() * 10;
        hits.push([cx + ox + Math.cos(a) * rr, cy + oy + Math.sin(a) * rr]);
      }
    }
    for (const [x, y] of hits) b += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="6" fill="${P.ink}" stroke="${P.paper}" stroke-width="2"/>`;
    b += serif(cx, 286, title, { size: 22 });
    b += hand(cx, 318, note, { size: 24, color: P.civicDeep });
  }
  return { W, H, b };
}

// ============================================================ Lesson 1.2

// A right-skewed income distribution: the tail pulls the mean above the median.
function skewedIncome() {
  const rng = makeRng(1201);
  const W = 720;
  const H = 410;
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
  const base = 330;
  const top = 132;
  const max = Math.max(...shares);
  const xAt = (k) => x0 + (k / 25) * bw;
  shares.forEach((s, i) => {
    const h = (s / max) * (base - top);
    const d = rectD(x0 + i * bw + 3, base - h, bw - 6, h);
    b += cut(d, { rng, fill: i === shares.length - 1 ? P.kraft : P.butter, jitter: 0.8, pattern: i === shares.length - 1 ? 'stripes' : undefined, patternOpacity: 0.5 });
    b += L(ink(d, { rng, size: 2 }));
  });
  b += L(inkLine([[x0 - 6, base], [x0 + 626, base]], { rng, size: 2.6, overshoot: 0 }));
  for (let k = 0; k <= 8; k += 2) {
    const x = x0 + k * bw;
    b += L(inkLine([[x, base], [x, base + 8]], { rng, size: 2, overshoot: 0 }));
    if (k < 8) b += hand(x, base + 34, k === 0 ? '$0' : `$${k * 25}k`, { size: 27 });
  }
  b += hand(x0 + 8.5 * bw, base + 34, '$200k+', { size: 25 });
  b += hand(360, base + 70, 'household income (illustrative)', { size: 26, color: '#5A5468' });

  const mx = xAt(median);
  const ax = xAt(mean);
  b += L(dashed(mx, base, mx, 96, rng, { color: P.civicDeep, size: 2.6 }));
  b += L(dashed(ax, base, ax, 96, rng, { color: P.tomatoDeep, size: 2.6 }));
  b += hand(mx - 10, 90, `median about $${Math.round(median)}k`, { size: 29, anchor: 'end', color: P.civicDeep });
  b += hand(ax + 10, 90, `mean about $${Math.round(mean)}k`, { size: 29, anchor: 'start', color: P.tomatoDeep });
  b += hand(x0 + 5.1 * bw, 200, 'a long tail of high incomes', { size: 25, anchor: 'start', color: P.tomatoDeep });
  b += hand(x0 + 5.1 * bw, 228, 'pulls the mean up', { size: 25, anchor: 'start', color: P.tomatoDeep });
  b += L(arrow(x0 + 5.05 * bw, 214, ax + 12, 180, rng, { color: P.tomatoDeep, bend: 10, size: 2.2 }));
  return { W, H, b, meta: { median, mean } };
}

// The normal curve with the 68 / 95 / 99.7 rule.
function normalCurve() {
  const rng = makeRng(1202);
  const W = 720;
  const H = 436;
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
  for (let k = -3; k <= 3; k++) b += hand(X(k), base + 30, k === 0 ? 'mean' : `${k < 0 ? '−' : '+'}${Math.abs(k)} SD`, { size: 25 });
  b += hand(cx, 72, 'mean = median = mode', { size: 29, color: P.tomatoDeep });
  const brackets = [[1, '68%', 344], [2, '95%', 376], [3, '99.7%', 408]];
  for (const [k, label, y] of brackets) {
    b += L(inkLine([[X(-k), y - 7], [X(-k), y], [X(k), y], [X(k), y - 7]], { rng, size: 2.2, overshoot: 0 }));
    const w = label.length * 14 + 20;
    b += backing(cx - w / 2, y - 17, w, 32);
    b += serif(cx, y + 8, label, { size: 23 });
  }
  return { W, H, b };
}

// Three scatterplots: strong positive, strong negative, and no relationship.
function correlations() {
  const W = 720;
  const H = 330;
  let b = '';
  const pearson = (xs, ys) => {
    const n = xs.length;
    const mx = xs.reduce((a, c) => a + c, 0) / n;
    const my = ys.reduce((a, c) => a + c, 0) / n;
    let sxy = 0; let sxx = 0; let syy = 0;
    for (let i = 0; i < n; i++) { sxy += (xs[i] - mx) * (ys[i] - my); sxx += (xs[i] - mx) ** 2; syy += (ys[i] - my) ** 2; }
    return sxy / Math.sqrt(sxx * syy);
  };
  // Deterministic search for a seed whose sample r lands near the target.
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
  const plots = [
    [16, 0.9, P.civic, 'strong positive'],
    [252, -0.85, P.tomato, 'strong negative'],
    [488, 0, P.lavender, 'no linear pattern'],
  ];
  const rng = makeRng(1203);
  for (const [px, target, color, note] of plots) {
    const { xs, ys, r } = sample(target);
    b += panel(px, 12, 216, 222, T.cream, rng, 12);
    const ax0 = px + 26; const ax1 = px + 198; const ay0 = 32; const ay1 = 212;
    b += L(inkLine([[ax0, ay0], [ax0, ay1], [ax1, ay1]], { rng, size: 2.2, overshoot: 0 }));
    const lo = (a) => Math.min(...a); const hi = (a) => Math.max(...a);
    const sx = (x) => ax0 + 12 + ((x - lo(xs)) / (hi(xs) - lo(xs))) * (ax1 - ax0 - 24);
    const sy = (y) => ay1 - 12 - ((y - lo(ys)) / (hi(ys) - lo(ys))) * (ay1 - ay0 - 24);
    xs.forEach((x, i) => { b += `<circle cx="${sx(x).toFixed(1)}" cy="${sy(ys[i]).toFixed(1)}" r="5.2" fill="${color}" stroke="${P.ink}" stroke-width="1.6"/>`; });
    const shown = Math.abs(r) < 0.005 ? '0.00' : (r > 0 ? '+' : '−') + Math.abs(r).toFixed(2);
    b += serif(px + 108, 272, `r = ${shown}`, { size: 25 });
    b += hand(px + 108, 304, note, { size: 25, color: P.civicDeep });
  }
  return { W, H, b };
}

// Hot weather drives both ice cream sales and drownings.
function confounder() {
  const rng = makeRng(1204);
  const W = 720;
  const H = 380;
  let b = '';
  b += sun(300, 88, 42, { seed: 12 });
  b += serif(392, 84, 'Hot weather', { size: 27, anchor: 'start' });
  b += hand(392, 114, 'the confounding variable', { size: 25, anchor: 'start', color: P.tomatoDeep });

  // Ice cream cone.
  const cone = polyD([[104, 222], [156, 222], [130, 300]]);
  b += cut(cone, { rng, fill: P.kraft });
  b += hatch(cone, { rng, angle: 45, gap: 9, cross: true, opacity: 0.5, size: 1.1 });
  b += L(ink(cone, { rng, size: 2.4 }));
  const scoop = blobD(130, 206, 34, 26, makeRng(4), 6, 0.1);
  b += cut(scoop, { rng, fill: P.blush });
  b += L(ink(scoop, { rng, size: 2.4 }));
  b += serif(130, 340, 'Ice cream sales', { size: 22 });

  // Life ring on the water.
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
  b += serif(590, 340, 'Drownings', { size: 22 });

  b += L(arrow(258, 124, 170, 180, rng, { size: 3, bend: 12 }));
  b += L(arrow(342, 124, 540, 196, rng, { size: 3, bend: -14 }));
  b += L(dashed(196, 262, 520, 262, rng, { size: 2, color: P.civicDeep }));
  b += hand(358, 294, 'they rise together,', { size: 25, color: P.civicDeep });
  b += hand(358, 322, 'but neither causes the other', { size: 25, color: P.civicDeep });
  return { W, H, b };
}

// Two ACS estimates whose confidence intervals overlap.
function overlappingIntervals() {
  const rng = makeRng(1205);
  const W = 720;
  const H = 300;
  let b = '';
  const x0 = 60;
  const per = 600 / 35;
  const X = (v) => x0 + v * per;
  const tracts = [['Tract A', 18, 6, 110, P.sky], ['Tract B', 22, 7, 190, T.lav]];
  const lo = Math.max(...tracts.map(([, e, m]) => e - m));
  const hi = Math.min(...tracts.map(([, e, m]) => e + m));
  const band = rectD(X(lo), 58, X(hi) - X(lo), 172);
  b += cut(band, { rng, fill: T.butter, shadow: false, jitter: 0.6 });
  b += hatch(band, { rng, angle: -50, gap: 10, opacity: 0.3, size: 1.1 });
  b += hand((X(lo) + X(hi)) / 2, 44, 'overlap: can’t call them different', { size: 25, color: P.tomatoDeep });
  for (const [name, est, moe, y, fill] of tracts) {
    const d = roundRectD(X(est - moe), y - 13, X(est + moe) - X(est - moe), 26, 6);
    b += cut(d, { rng, fill });
    b += L(ink(d, { rng, size: 2.2 }));
    b += L(inkLine([[X(est), y - 20], [X(est), y + 20]], { rng, size: 3.4, overshoot: 0 }));
    b += hand(X(est - moe) - 10, y + 9, name, { size: 24, anchor: 'end' });
    b += hand(X(est + moe) + 10, y + 9, `${est}% ± ${moe}`, { size: 24, anchor: 'start' });
  }
  const ay = 244;
  b += L(inkLine([[x0 - 4, ay], [X(35) + 4, ay]], { rng, size: 2.4, overshoot: 0 }));
  for (let v = 0; v <= 35; v += 5) {
    b += L(inkLine([[X(v), ay], [X(v), ay + 8]], { rng, size: 2, overshoot: 0 }));
    b += hand(X(v), ay + 34, `${v}%`, { size: 26 });
  }
  return { W, H, b };
}

// What $10,000 is worth today, by discount rate and by how far away it is.
function discounting() {
  const rng = makeRng(1206);
  const W = 720;
  const H = 420;
  let b = '';
  const FV = 10000;
  const rates = [[0.03, P.leaf, '3%'], [0.05, P.butter, '5%'], [0.07, P.tomato, '7%']];
  const groups = [[2, 96, 'Paid in 2 years'], [30, 412, 'Paid in 30 years']];
  const base = 326;
  const full = 230;
  const topY = base - full;
  b += hand(40, 40, 'What $10,000 is worth today', { size: 30, anchor: 'start' });
  for (const [t, gx, label] of groups) {
    b += L(dashed(gx - 10, topY, gx + 260, topY, rng, { size: 1.8, color: P.civicDeep }));
    rates.forEach(([r, fill, rl], i) => {
      const pv = FV / (1 + r) ** t;
      const h = (pv / FV) * full;
      const x = gx + i * 88;
      const d = rectD(x, base - h, 70, h);
      b += cut(d, { rng, fill, jitter: 0.8 });
      b += L(ink(d, { rng, size: 2.2 }));
      const vy = base - h - 10;
      b += (vy < topY + 16 ? backing(x - 6, vy - 22, 82, 28) : '') + hand(x + 35, vy, fmtMoney(pv), { size: 25 });
      b += hand(x + 35, base + 30, rl, { size: 27 });
    });
    b += serif(gx + 123, base + 70, label, { size: 23 });
  }
  b += hand(690, topY - 8, '$10,000 when it arrives', { size: 25, anchor: 'end', color: P.civicDeep });
  b += L(inkLine([[40, base], [690, base]], { rng, size: 2.4, overshoot: 0 }));
  b += hand(40, base + 30, 'rate:', { size: 24, anchor: 'start', color: '#5A5468' });
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
];

export default function () {
  const meta = {};
  const list = FIGURES.map(([name, fn]) => {
    const { W, H, b } = fn();
    meta[name] = { w: W, h: H };
    return { name, w: W, h: H, svg: svgDoc(W, H, b), scale: 2, quality: 0.8 };
  });
  list.meta = meta;
  return list;
}
