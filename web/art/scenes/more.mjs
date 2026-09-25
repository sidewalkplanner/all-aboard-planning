// More page-header illustrations: flashcards, exam info, FAQ and contact.
import { svgDoc, torn, cut, ink, inkLine, hatch, rectD, roundRectD, ellipseD, polyD, makeRng, PALETTE as P } from '../lib/draw.mjs';
import { tape, star, sparkle } from '../lib/props.mjs';
import { hand, serif } from './spots.mjs';

const OFF = 'translate(-1.5,-1.1)';
const L = (s) => `<g transform="${OFF}">${s}</g>`;
const rot = (deg, cx, cy, body) => `<g transform="rotate(${deg} ${cx} ${cy})">${body}</g>`;

// An index card: red header rule, blue lines, handwritten front.
function indexCard(x, y, w, h, rng, { title, line, color = P.paper } = {}) {
  const d = rectD(x, y, w, h);
  let b = cut(d, { rng, fill: color });
  b += `<path d="M${x + 6} ${y + 34}H${x + w - 6}" stroke="${P.tomato}" stroke-width="1.6" opacity="0.7"/>`;
  for (let ly = y + 56; ly < y + h - 8; ly += 20) b += `<path d="M${x + 6} ${ly}H${x + w - 6}" stroke="${P.civic}" stroke-width="1" opacity="0.45"/>`;
  b += L(ink(d, { rng, size: 2 }));
  if (title) b += hand(x + w / 2, y + 26, title, { size: 23 });
  if (line) b += hand(x + w / 2, y + 74, line, { size: 20, color: P.civicDeep });
  return b;
}

// Flashcards: a kraft card box with coloured tab dividers and a fan of cards.
function cards() {
  const rng = makeRng(801);
  let b = '';
  // tabs sticking out of the box
  const tabs = [[70, P.butter], [120, P.tomato], [170, P.leaf], [220, P.civic], [270, P.lavender]];
  for (const [x, c] of tabs) {
    const t = `M${x} 150V120Q${x} 112 ${x + 8} 112H${x + 34}Q${x + 42} 112 ${x + 42} 120V150Z`;
    b += cut(t, { rng, fill: c });
    b += L(ink(t, { rng, size: 1.6 }));
  }
  b += cut(rectD(50, 140, 280, 20), { rng, fill: P.paper, shadow: false });
  const box = 'M40 150H340L330 290H50Z';
  b += cut(box, { rng, fill: P.kraft });
  b += hatch(box, { rng, angle: 8, gap: 9, opacity: 0.18, size: 1 });
  b += L(ink(box, { rng, size: 2.6 }));
  const label = roundRectD(76, 196, 100, 40, 6);
  b += cut(label, { rng, fill: P.paper, shadow: false });
  b += L(ink(label, { rng, size: 1.6 }));
  b += serif(126, 222, 'TERMS', { size: 15, spacing: 2 });
  // fanned cards in front
  b += rot(-9, 290, 250, indexCard(196, 190, 180, 110, rng, { title: 'Euclid v. Ambler', line: '1926: zoning upheld' }));
  b += rot(7, 440, 150, indexCard(352, 96, 176, 110, rng, { title: 'FAR', line: 'floor area ÷ lot area', color: '#FFF6DC' }));
  // pencil
  const pencil = 'M20 300L160 250L166 264L26 314L10 312Z';
  b += cut(pencil, { rng, fill: P.butterDeep });
  b += cut('M10 312L20 300L26 314Z', { rng, fill: P.kraft, shadow: false });
  b += L(ink(pencil, { rng, size: 1.8 }) + ink('M160 250L166 264', { rng, size: 3 }));
  b += sparkle(520, 250, 12, { seed: 4 }) + sparkle(30, 90, 9, { seed: 5 });
  b += star(330, 60, 13, { fill: P.butter, seed: 6 });
  return { W: 550, H: 330, b };
}

// Exam info: a wall calendar with test day circled in red marker.
function calendar() {
  const rng = makeRng(811);
  let b = '';
  const page = rectD(60, 60, 330, 250);
  b += cut(page, { rng, fill: P.paper });
  const header = rectD(60, 60, 330, 56);
  b += cut(header, { rng, fill: P.tomato, shadow: false });
  b += serif(225, 98, 'EXAM MONTH', { size: 22, spacing: 3, color: P.paper });
  // grid of days
  let grid = '';
  const cols = 7;
  const cw = 330 / cols;
  const rows = 5;
  const rh = (250 - 56) / rows;
  for (let c = 1; c < cols; c++) grid += `M${60 + c * cw} 116V310`;
  for (let r = 1; r < rows; r++) grid += `M60 ${116 + r * rh}H390`;
  b += L(ink(grid, { rng, size: 1.1, opacity: 0.55 }));
  let day = 1;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (r === 0 && c < 2) continue;
      if (day > 30) break;
      b += `<text x="${60 + c * cw + 6}" y="${116 + r * rh + 16}" font-family="Figtree, sans-serif" font-weight="700" font-size="11" fill="${P.ink}" opacity="0.7">${day}</text>`;
      day++;
    }
  }
  // crossed-off study days
  for (const [c, r] of [[2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [0, 1], [1, 1], [2, 1]]) {
    const x = 60 + c * cw;
    const y = 116 + r * rh;
    b += L(inkLine([[x + 8, y + 8], [x + cw - 8, y + rh - 6]], { rng, size: 2.2, color: P.leafDeep, opacity: 0.8 }));
  }
  // test day circled
  const cx = 60 + 4.5 * cw;
  const cy = 116 + 2.5 * rh;
  b += L(ink(`M${cx + 26} ${cy - 16}C${cx + 10} ${cy - 30} ${cx - 34} ${cy - 22} ${cx - 30} ${cy + 4}C${cx - 26} ${cy + 26} ${cx + 30} ${cy + 24} ${cx + 30} ${cy}C${cx + 30} ${cy - 12} ${cx + 18} ${cy - 20} ${cx + 4} ${cy - 22}`, { rng, size: 4, color: P.tomatoDeep, taper: false }));
  b += star(cx, cy + 4, 11, { fill: P.butter, seed: 7 });
  b += L(ink(page, { rng, size: 2.6 }));
  // binder rings
  for (const x of [120, 225, 330]) {
    b += `<rect x="${x - 6}" y="44" width="12" height="30" rx="6" fill="${P.paper}" stroke="${P.ink}" stroke-width="2.4"/>`;
  }
  b += tape(20, 250, 90, 26, -28, { seed: 5 });
  b += hand(400, 40, 'test day!', { size: 30, rotate: 10, color: P.tomatoDeep });
  b += L(ink(`M398 50C388 90 350 110 ${cx + 34} ${cy - 20}`, { rng, size: 2.2, color: P.tomatoDeep }));
  return { W: 470, H: 330, b };
}

// FAQ: two big speech bubbles, a question and an answer.
function faq() {
  const rng = makeRng(821);
  let b = '';
  const q = 'M40 70Q40 40 70 40H250Q280 40 280 70V160Q280 190 250 190H130L90 230L100 190H70Q40 190 40 160Z';
  b += cut(q, { rng, fill: P.butter, pattern: 'dots', patternOpacity: 0.12 });
  b += L(ink(q, { rng, size: 2.8 }));
  b += serif(160, 158, '?', { size: 120, italic: true, color: P.ink });
  const a = 'M220 170Q220 145 245 145H400Q425 145 425 170V250Q425 275 400 275H380L392 310L350 275H245Q220 275 220 250Z';
  b += cut(a, { rng, fill: P.sky });
  b += L(ink(a, { rng, size: 2.8 }));
  b += L(ink('M246 184H398M246 208H380M246 232H340', { rng, size: 3, opacity: 0.75 }));
  b += L(ink('M356 232l10 12 22 -26', { rng, size: 4.4, color: P.leafDeep }));
  // lightbulb doodle
  const bulb = 'M400 30C380 30 368 46 372 62C375 74 384 78 386 90H414C416 78 425 74 428 62C432 46 420 30 400 30Z';
  b += cut(bulb, { rng, fill: '#FFF3C4', shadow: false });
  b += L(ink(bulb, { rng, size: 2 }) + ink('M388 98H412M391 106H409', { rng, size: 2 }));
  for (const [dx, dy] of [[-40, 4], [40, 4], [0, -34], [-30, -24], [30, -24]]) b += L(inkLine([[400 + dx * 0.72, 56 + dy * 0.72], [400 + dx, 56 + dy]], { rng, size: 2, overshoot: 0 }));
  b += sparkle(24, 262, 10, { seed: 3 });
  return { W: 450, H: 320, b };
}

// Contact: a postcard with a streetcar stamp, postmark and a hello.
function postcard() {
  const rng = makeRng(831);
  let b = '';
  const env = rotRect(40, 90, 320, 200, -6);
  b += cut(env.d, { rng, fill: P.kraft });
  b += L(ink(env.d, { rng, size: 2.2 }) + ink(env.flap, { rng, size: 1.8, opacity: 0.8 }));
  const card = 'M110 50L450 70L440 290L100 270Z';
  b += cut(card, { rng, fill: P.paper, pattern: 'ruled', patternOpacity: 0 });
  b += L(ink(card, { rng, size: 2.6 }));
  b += L(ink('M282 90L274 262', { rng, size: 1.6, opacity: 0.6 }));
  b += hand(190, 130, 'Hello from', { size: 30, rotate: 3 });
  b += hand(196, 162, 'the station!', { size: 30, rotate: 3, color: P.civicDeep });
  b += L(ink('M140 196Q170 186 200 196T258 196M140 222Q170 212 200 222T258 222', { rng, size: 1.8, opacity: 0.55 }));
  for (const y of [176, 206, 236]) b += L(ink(`M300 ${y}L${428 - (y - 176) * 0.05} ${y + 7}`, { rng, size: 1.6, opacity: 0.6 }));
  // stamp with perforated edge and a tiny tram
  const sx = 356;
  const sy = 86;
  let perf = '';
  const sw = 70;
  const sh = 60;
  perf += `<rect x="${sx}" y="${sy}" width="${sw}" height="${sh}" fill="${P.tomato}" stroke="${P.paper}" stroke-width="6" stroke-dasharray="3 3"/>`;
  b += rot(3, sx + sw / 2, sy + sh / 2, perf + cut(roundRectD(sx + 14, sy + 20, 42, 20, 5), { rng, fill: P.butter, shadow: false }) + `<circle cx="${sx + 24}" cy="${sy + 43}" r="3.4" fill="${P.ink}"/><circle cx="${sx + 46}" cy="${sy + 43}" r="3.4" fill="${P.ink}"/>` + L(ink(`M${sx + 35} ${sy + 20}L${sx + 44} ${sy + 8}`, { rng, size: 1.6 })));
  // postmark
  b += `<g opacity="0.7">${L(ink(ellipseD(338, 128, 30, 30), { rng, size: 1.8, color: P.civicDeep }) + ink('M372 116Q392 106 412 116T452 116M372 128Q392 118 412 128T452 128M372 140Q392 130 412 140T452 140', { rng, size: 1.6, color: P.civicDeep }))}</g>`;
  b += serif(338, 133, 'AICP', { size: 12, color: P.civicDeep });
  b += sparkle(470, 250, 11, { seed: 4 }) + star(60, 60, 12, { fill: P.butter, seed: 5 });
  return { W: 500, H: 320, b };
}

function rotRect(x, y, w, h, deg) {
  const a = (deg * Math.PI) / 180;
  const cx = x + w / 2;
  const cy = y + h / 2;
  const r = ([px, py]) => [cx + (px - cx) * Math.cos(a) - (py - cy) * Math.sin(a), cy + (px - cx) * Math.sin(a) + (py - cy) * Math.cos(a)];
  const pts = [[x, y], [x + w, y], [x + w, y + h], [x, y + h]].map(r);
  const flap = [[x, y], [x + w / 2, y + h * 0.55], [x + w, y]].map(r);
  return { d: polyD(pts), flap: polyD(flap, false) };
}

export default function () {
  return [
    ['page-cards', cards()],
    ['page-calendar', calendar()],
    ['page-faq', faq()],
    ['page-postcard', postcard()]
  ].map(([name, { W, H, b }]) => ({ name, w: W, h: H, svg: svgDoc(W, H, b), scale: 1.6, quality: 0.84 }));
}
