// Spot illustrations for landing-page sections and the result screens.
import { svgDoc, samplePath, torn, cut, ink, inkLine, hatch, contours, stipple, rectD, roundRectD, ellipseD, blobD, polyD, makeRng, PALETTE as P } from '../lib/draw.mjs';
import { tape, star, sparkle, tree, person } from '../lib/props.mjs';

const OFF = 'translate(-1.5,-1.1)';
const L = (s) => `<g transform="${OFF}">${s}</g>`;
const hand = (x, y, text, { size = 26, color = P.ink, rotate = 0, weight = 700, anchor = 'middle' } = {}) =>
  `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="Caveat, cursive" font-weight="${weight}" font-size="${size}" fill="${color}"${rotate ? ` transform="rotate(${rotate} ${x} ${y})"` : ''}>${text}</text>`;
const serif = (x, y, text, { size = 20, color = P.ink, weight = 800, italic = false, anchor = 'middle', spacing = 0 } = {}) =>
  `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="Fraunces, Georgia, serif" font-weight="${weight}"${italic ? ' font-style="italic"' : ''} font-size="${size}" letter-spacing="${spacing}" fill="${color}">${text}</text>`;

export function ticketD(x, y, w, h, stub, n = 9) {
  return `M${x} ${y}H${x + stub - n}A${n} ${n} 0 0 0 ${x + stub + n} ${y}H${x + w}V${y + h}H${x + stub + n}A${n} ${n} 0 0 0 ${x + stub - n} ${y + h}H${x}Z`;
}

function compassRose(cx, cy, r, rng) {
  let f = torn(ellipseD(cx, cy, r, r), { rng, fill: P.paper, amp: 1.6, rim: 2 });
  let l = ink(ellipseD(cx, cy, r * 0.82, r * 0.82), { rng, size: 1.6 });
  const pts = [];
  for (let i = 0; i < 8; i++) {
    const a = -Math.PI / 2 + (i * Math.PI) / 4;
    const len = i % 2 ? r * 0.45 : r * 0.9;
    pts.push([a, len]);
  }
  for (const [a, len] of pts) {
    const tip = [cx + Math.cos(a) * len, cy + Math.sin(a) * len];
    const l1 = [cx + Math.cos(a - 0.4) * r * 0.16, cy + Math.sin(a - 0.4) * r * 0.16];
    const r1 = [cx + Math.cos(a + 0.4) * r * 0.16, cy + Math.sin(a + 0.4) * r * 0.16];
    const north = Math.abs(a + Math.PI / 2) < 0.01;
    f += cut(polyD([l1, tip, [cx, cy]]), { rng, fill: north ? P.tomato : P.ink, shadow: false, jitter: 0.3 });
    f += cut(polyD([r1, tip, [cx, cy]]), { rng, fill: north ? P.tomatoDeep : P.butter, shadow: false, jitter: 0.3 });
  }
  f += `<circle cx="${cx}" cy="${cy}" r="${r * 0.08}" fill="${P.paper}" stroke="${P.ink}" stroke-width="1.6"/>`;
  l += serif(cx, cy - r * 0.95 - 4, 'N', { size: r * 0.28 });
  return f + L(l);
}

function pin(x, y, color, rng, s = 1) {
  const d = `M${x} ${y}C${x - 4 * s} ${y - 14 * s} ${x - 16 * s} ${y - 20 * s} ${x - 16 * s} ${y - 32 * s}A${16 * s} ${16 * s} 0 1 1 ${x + 16 * s} ${y - 32 * s}C${x + 16 * s} ${y - 20 * s} ${x + 4 * s} ${y - 14 * s} ${x} ${y}Z`;
  let out = cut(d, { rng, fill: color });
  out += `<circle cx="${x}" cy="${y - 32 * s}" r="${6 * s}" fill="${P.paper}"/>`;
  out += L(ink(d, { rng, size: 2.2 * s }));
  return out;
}

// "Where should I study?": an old town map with a dotted route to X.
function diagMap() {
  const rng = makeRng(601);
  const W = 560;
  const H = 460;
  let b = '';
  const sheet = 'M44 58L520 36L534 404L60 426Z';
  b += `<g>${torn(sheet, { rng, fill: '#F3E4BE', amp: 3.2, rim: 3 })}</g>`;
  // Land-use parcels, a river and a park, like a municipal base map.
  const river = 'M44 300C150 270 220 330 330 300S470 250 534 270L534 300C470 282 400 330 330 330S150 300 48 334Z';
  b += torn(river, { rng, fill: P.sky, amp: 1.4, rim: 0, shadow: false });
  b += hatch(river, { rng, angle: 0, gap: 6, opacity: 0.25, size: 0.9, color: P.civicDeep });
  const parcels = [
    [80, 90, 90, 60, P.butter], [184, 84, 70, 64, P.butter], [270, 80, 96, 50, P.tomato], [380, 74, 110, 70, P.lavender],
    [84, 170, 74, 80, P.butter], [172, 166, 110, 40, P.civic], [300, 150, 70, 90, P.butter], [390, 164, 100, 70, P.leaf],
    [120, 350, 120, 50, P.leaf], [270, 356, 90, 44, P.butter], [380, 330, 110, 60, P.tomato]
  ];
  for (const [x, y, w, h, c] of parcels) {
    const d = rectD(x, y, w, h);
    b += cut(d, { rng, fill: c, shadow: false, jitter: 1, pattern: c === P.leaf ? 'dots' : undefined, patternOpacity: 0.15 });
    b += L(ink(d, { rng, size: 1.3, wobble: 0.6, opacity: 0.8 }));
  }
  b += contours(sheet, { rng, cx: 420, cy: 120, rings: 8, step: 14, opacity: 0.18 });
  // Street grid in thin ink.
  let streets = '';
  for (const x of [170, 262, 376]) streets += inkLine([[x + rng.range(-3, 3), 60], [x + rng.range(-3, 3), 410]], { rng, size: 1.4, opacity: 0.55 });
  for (const y of [156, 258, 342]) streets += inkLine([[50, y], [528, y - 8]], { rng, size: 1.4, opacity: 0.55 });
  b += L(streets);
  // Dotted route from you-are-here to X.
  const route = 'M110 390C150 330 120 280 200 250S300 280 320 210S420 170 440 120';
  b += L(dashed(route, rng));
  b += pin(110, 396, P.civic, rng, 1);
  // Big X
  b += L(ink('M424 104L458 136M458 104L424 136', { rng, size: 7, color: P.tomato, thinning: 0.3 }));
  b += tape(20, 48, 90, 26, -32, { seed: 3 });
  b += tape(478, 20, 90, 26, 28, { seed: 4, fill: 'rgba(159,211,199,0.8)' });
  b += compassRose(470, 360, 56, rng);
  b += `<g transform="rotate(-6 140 440)">${cut(roundRectD(60, 418, 170, 40, 6), { rng, fill: P.paper })}${hand(145, 446, 'you are here', { size: 28 })}</g>`;
  b += hand(470, 88, 'study here!', { size: 30, rotate: 8, color: P.tomatoDeep });
  return { W, H, b };
}

// Dashes drawn one by one so each is its own little pen stroke.
function dashed(d, rng) {
  const pts = samplePath(d, 3);
  let out = '';
  for (let i = 0; i + 4 < pts.length; i += 8) {
    out += inkLine(pts.slice(i, i + 5), { rng, size: 4.2, wobble: 0.3, overshoot: 0, color: P.tomatoDeep });
  }
  return out;
}

// How it works 01: a ticket with a stopwatch (timed vs practice).
function howMode() {
  const rng = makeRng(611);
  let b = '';
  const t = ticketD(16, 84, 220, 104, 64);
  b += `<g transform="rotate(-8 126 136)">${cut(t, { rng, fill: P.butter, pattern: 'pinstripe', patternOpacity: 0.07 })}${L(ink(t, { rng, size: 2.4 }) + ink('M80 98V174', { rng, size: 1.4, opacity: 0.6 }))}${serif(48, 146, '01', { size: 24 })}${serif(150, 132, 'ADMIT', { size: 17, spacing: 2 })}${serif(150, 156, 'ONE', { size: 17, spacing: 2 })}</g>`;
  const cx = 262;
  const cy = 72;
  b += cut(rectD(cx - 7, cy - 58, 14, 14), { rng, fill: P.ink });
  b += cut(ellipseD(cx, cy, 48, 48), { rng, fill: P.paper });
  b += torn(`M${cx} ${cy}L${cx} ${cy - 42}A42 42 0 0 1 ${cx + 40} ${cy - 13}Z`, { rng, fill: P.tomato, amp: 0.6, rim: 0, shadow: false });
  let l = ink(ellipseD(cx, cy, 48, 48), { rng, size: 3 }) + ink(`M${cx} ${cy}L${cx + 22} ${cy - 26}`, { rng, size: 3 }) + ink(`M${cx - 10} ${cy - 62}h20`, { rng, size: 4 });
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    l += inkLine([[cx + Math.cos(a) * 38, cy + Math.sin(a) * 38], [cx + Math.cos(a) * 43, cy + Math.sin(a) * 43]], { rng, size: 1.8, overshoot: 0 });
  }
  b += L(l) + `<circle cx="${cx}" cy="${cy}" r="4" fill="${P.ink}"/>`;
  b += sparkle(24, 40, 10, { seed: 5 });
  return { W: 320, H: 220, b };
}

// How it works 02: pennant flags pinned to a question card.
function howFlag() {
  const rng = makeRng(621);
  let b = '';
  const card = 'M40 60L240 50L246 190L46 198Z';
  b += cut(card, { rng, fill: P.paper, pattern: 'ruled', patternOpacity: 0.35 });
  b += L(ink(card, { rng, size: 2.2 }));
  b += serif(76, 96, 'Q.', { size: 26, italic: true, color: P.civic });
  b += L(ink('M104 90H214M68 120H222M68 144H200M68 168H180', { rng, size: 2.2, opacity: 0.7 }));
  const poles = [[212, 20, P.tomato], [250, 34, P.butter]];
  for (const [x, y, c] of poles) {
    b += L(ink(`M${x} ${y}V${y + 120}`, { rng, size: 2.6 }));
    const f = `M${x} ${y}L${x + 52} ${y + 16}L${x} ${y + 34}Z`;
    b += cut(f, { rng, fill: c, pattern: c === P.tomato ? 'stripes' : undefined, patternOpacity: 0.3 });
    b += L(ink(f, { rng, size: 2 }));
  }
  b += hand(118, 228, 'come back to this one', { size: 24, rotate: -3, color: P.tomatoDeep });
  return { W: 320, H: 240, b };
}

// How it works 03: a signpost pointing to each domain.
function howScore() {
  const rng = makeRng(631);
  let b = '';
  const post = rectD(152, 40, 14, 176);
  b += cut(post, { rng, fill: P.kraftDeep });
  const arrows = [
    [60, 'Ethics', P.leaf, -1, -4], [102, 'Research', P.butter, 1, 3], [144, 'Leadership', P.tomato, -1, -2]
  ];
  b += L(ink(post, { rng, size: 2.2 }));
  let l = '';
  for (const [y, label, c, dir, rot] of arrows) {
    const x0 = dir > 0 ? 160 : 40;
    const w = 128;
    const d = dir > 0
      ? `M${x0} ${y}H${x0 + w}L${x0 + w + 20} ${y + 17}L${x0 + w} ${y + 34}H${x0}Z`
      : `M${x0 + 20} ${y}H${x0 + w + 20}V${y + 34}H${x0 + 20}L${x0} ${y + 17}Z`;
    b += `<g transform="rotate(${rot} 160 ${y + 17})">${cut(d, { rng, fill: c })}${L(ink(d, { rng, size: 2 }))}${hand(dir > 0 ? x0 + w / 2 + 6 : x0 + w / 2 + 16, y + 26, label, { size: 26 })}</g>`;
  }
  b += L(l);
  b += torn('M60 222Q160 196 260 222V236H60Z', { rng, fill: P.sage, amp: 1.2, rim: 1.4 });
  return { W: 320, H: 240, b };
}

// Diagnostic intro: a big compass rose with a pencil.
function compass() {
  const rng = makeRng(641);
  let b = compassRose(150, 150, 110, rng);
  b += tape(10, 40, 100, 28, -38, { seed: 9 });
  b += sparkle(272, 50, 12, { seed: 3 });
  b += sparkle(30, 250, 9, { seed: 4 });
  return { W: 300, H: 300, b };
}

// Results: an "Arrived" platform sign under bunting.
function arrived() {
  const rng = makeRng(651);
  let b = '';
  const bunting = 'M10 40Q200 90 390 40';
  b += L(inkLine(bunting, { rng, size: 2, taper: false }));
  const flags = [P.tomato, P.butter, P.civic, P.leaf, P.lavender, P.tomato, P.butter, P.civic];
  flags.forEach((c, i) => {
    const t = (i + 0.5) / flags.length;
    const x = 10 + t * 380;
    const y = 40 + 4 * t * (1 - t) * 50 - 0;
    const d = `M${x - 16} ${y - 2}L${x + 16} ${y + 2}L${x + rng.range(-3, 3)} ${y + 34}Z`;
    b += cut(d, { rng, fill: c, shadow: false });
    b += L(ink(d, { rng, size: 1.4 }));
  });
  for (const x of [120, 280]) {
    const post = rectD(x - 5, 120, 10, 130);
    b += cut(post, { rng, fill: P.civicDeep });
    b += L(ink(post, { rng, size: 1.8 }));
  }
  const sign = roundRectD(70, 104, 260, 74, 12);
  b += cut(sign, { rng, fill: P.civic });
  b += cut(roundRectD(80, 114, 240, 54, 8), { rng, fill: P.paper, shadow: false });
  b += L(ink(sign, { rng, size: 2.6 }));
  b += serif(200, 152, 'ARRIVED', { size: 34, spacing: 3 });
  b += torn('M40 250Q200 226 360 250V262H40Z', { rng, fill: P.kraft, amp: 1.4, rim: 1.4 });
  const confetti = [[40, 120, P.tomato], [362, 110, P.butter], [30, 200, P.civic], [370, 200, P.leaf], [60, 80, P.butter], [340, 76, P.lavender]];
  for (const [x, y, c] of confetti) b += cut(rectD(x, y, 10, 5), { rng, fill: c, shadow: false, extra: ` transform="rotate(${rng.range(-60, 60)} ${x} ${y})"` });
  b += star(356, 150, 14, { fill: P.butter, seed: 3 });
  b += star(44, 160, 10, { fill: P.tomato, seed: 4 });
  return { W: 400, H: 270, b };
}

export default function () {
  const list = [
    ['spot-diagnostic', diagMap()],
    ['spot-mode', howMode()],
    ['spot-flag', howFlag()],
    ['spot-score', howScore()],
    ['spot-compass', compass()],
    ['spot-arrived', arrived()]
  ];
  return list.map(([name, { W, H, b }]) => ({ name, w: W, h: H, svg: svgDoc(W, H, b), scale: 1.6, quality: 0.84 }));
}

export { hand, serif, compassRose, pin, tree, person, stipple, blobD };
