// Nine domain badges (one per AICP content-outline domain) plus the logo.
// Each badge is a torn paper disc with a small inked collage on top.
import { svgDoc, torn, cut, ink, inkLine, hatch, rectD, roundRectD, ellipseD, blobD, polyD, makeRng, PALETTE as P } from '../lib/draw.mjs';

const OFF = 'translate(-1.4,-1)';
const S = 200;
const lines = (s) => `<g transform="${OFF}">${s}</g>`;

function disc(rng, fill, pattern) {
  return torn(blobD(100, 102, 80, 78, rng, 3, 0.03), { rng, fill, amp: 2.4, rim: 3, pattern, patternOpacity: 0.16 });
}

const icons = {
  // Fundamental Planning Knowledge: a classical column beside an open book.
  fundamentals(rng) {
    let f = '';
    let l = '';
    const book = 'M42 128Q70 116 100 128Q130 116 158 128V150Q130 138 100 150Q70 138 42 150Z';
    f += cut(book, { rng, fill: P.paper });
    l += ink(book, { rng, size: 2.6 });
    l += ink('M100 128V150', { rng, size: 2 });
    for (let i = 0; i < 3; i++) {
      l += inkLine([[52, 134 + i * 5], [88, 130 + i * 5]], { rng, size: 1.1, opacity: 0.6, overshoot: 0 });
      l += inkLine([[112, 130 + i * 5], [148, 134 + i * 5]], { rng, size: 1.1, opacity: 0.6, overshoot: 0 });
    }
    const cap = 'M72 54H128L122 64H78Z';
    const shaft = rectD(82, 64, 36, 54);
    const base = rectD(74, 118, 52, 9);
    f = cut(shaft, { rng, fill: P.cream }) + cut(cap, { rng, fill: P.paper }) + cut(base, { rng, fill: P.paper }) + f;
    l = ink(cap, { rng, size: 2.4 }) + ink(shaft, { rng, size: 2.4 }) + ink(base, { rng, size: 2.2 }) +
      ink('M91 67V116M100 67V116M109 67V116', { rng, size: 1.4 }) +
      ink('M66 52Q100 38 134 52', { rng, size: 2.2 }) + l;
    return f + lines(l);
  },
  // Plan & Policy Development: an unrolled plan sheet with a pencil.
  plan(rng) {
    let f = '';
    let l = '';
    const sheet = 'M40 62L150 52L160 136L50 146Z';
    f += cut(sheet, { rng, fill: P.sky, pattern: 'grid', patternOpacity: 0.45 });
    const roll = 'M150 52Q166 50 168 64L176 128Q178 140 160 136';
    l += ink(sheet, { rng, size: 2.4 }) + ink(roll, { rng, size: 2.2 });
    const parcelA = 'M58 78L96 74L99 100L61 104Z';
    const parcelB = 'M104 72L138 69L142 98L107 101Z';
    const parcelC = 'M63 110L140 103L143 128L66 135Z';
    f += cut(parcelA, { rng, fill: P.butter, shadow: false }) + cut(parcelB, { rng, fill: P.tomato, shadow: false }) + cut(parcelC, { rng, fill: P.leaf, shadow: false });
    l += ink(parcelA, { rng, size: 1.6 }) + ink(parcelB, { rng, size: 1.6 }) + ink(parcelC, { rng, size: 1.6 });
    const pencil = 'M118 164L168 104L178 112L128 172L114 176Z';
    f += cut(pencil, { rng, fill: P.butterDeep });
    f += cut('M114 176L118 164L128 172Z', { rng, fill: P.kraft, shadow: false });
    l += ink(pencil, { rng, size: 2.2 }) + ink('M168 104L178 112', { rng, size: 3 }) + `<circle cx="115.5" cy="174.5" r="2" fill="${P.ink}"/>`;
    return f + lines(l);
  },
  // Communication & Interaction: two overlapping speech bubbles.
  communication(rng) {
    let f = '';
    let l = '';
    const a = 'M40 58Q40 44 56 44H112Q128 44 128 58V94Q128 108 112 108H72L52 126L58 108H56Q40 108 40 94Z';
    const b = 'M84 92Q84 80 98 80H150Q164 80 164 92V128Q164 140 150 140H146L150 158L128 140H98Q84 140 84 128Z';
    f += cut(a, { rng, fill: P.paper });
    f += cut(b, { rng, fill: P.butter, pattern: 'dots', patternOpacity: 0.12 });
    l += ink(a, { rng, size: 2.6 }) + ink(b, { rng, size: 2.6 });
    l += ink('M56 64H110M56 76H100M56 88H86', { rng, size: 2, opacity: 0.8 });
    for (const x of [108, 124, 140]) l += `<circle cx="${x}" cy="110" r="4.2" fill="${P.ink}"/>`;
    return f + lines(l);
  },
  // Plan Implementation: a zoning map with parcels and a survey stake.
  implementation(rng) {
    let f = '';
    let l = '';
    const colors = [P.butter, P.tomato, P.butter, P.leaf, P.lavender, P.butter, P.civic, P.leaf, P.butter];
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        const x = 46 + c * 36 + (r % 2) * 2;
        const y = 50 + r * 34;
        const d = rectD(x, y, 32, 30);
        f += cut(d, { rng, fill: colors[r * 3 + c], shadow: r * 3 + c === 4 });
        l += ink(d, { rng, size: 1.8, wobble: 0.6 });
      }
    }
    l += ink('M44 150H156', { rng, size: 2.4 });
    const stake = 'M150 156L156 84L162 84L158 156Z';
    f += cut(stake, { rng, fill: P.kraft });
    const flag = 'M160 84L186 90L160 100Z';
    f += cut(flag, { rng, fill: P.tomato });
    l += ink(stake, { rng, size: 2 }) + ink(flag, { rng, size: 1.8 });
    return f + lines(l);
  },
  // Areas of Practice: a little tram passing a tree and a house.
  practice(rng) {
    let f = '';
    let l = '';
    const house = 'M40 138V104L64 84L88 104V138Z';
    f += cut(house, { rng, fill: P.butter });
    l += ink(house, { rng, size: 2.2 }) + ink(rectD(58, 116, 12, 22), { rng, size: 1.8 });
    const crown = blobD(160, 88, 20, 22, rng, 5, 0.1);
    f += cut(rectD(157, 100, 6, 38), { rng, fill: P.kraftDeep });
    f += torn(crown, { rng, fill: P.leafDeep, amp: 1.2, rim: 1.4 });
    const body = roundRectD(70, 98, 84, 42, 8);
    f += cut(body, { rng, fill: P.tomato });
    f += cut(rectD(72, 104, 80, 16), { rng, fill: P.cream, shadow: false });
    l += ink(body, { rng, size: 2.4 });
    for (let i = 0; i < 4; i++) l += ink(roundRectD(78 + i * 18, 106, 12, 12, 2), { rng, size: 1.4 });
    l += ink('M104 98L120 72', { rng, size: 2 }) + ink('M36 72H176', { rng, size: 1.4, opacity: 0.7 });
    l += ink('M40 150H170', { rng, size: 2.6 });
    for (const x of [86, 138]) l += `<circle cx="${x}" cy="143" r="6" fill="${P.ink}"/><circle cx="${x}" cy="143" r="2" fill="${P.butter}"/>`;
    return f + lines(l);
  },
  // Research & Assessment Methods: bar chart under a magnifying glass.
  research(rng) {
    let f = '';
    let l = '';
    const bars = [[46, 46, P.leaf], [70, 70, P.butter], [94, 34, P.tomato], [118, 86, P.civic]];
    for (const [x, h, c] of bars) {
      const d = rectD(x, 146 - h, 18, h);
      f += cut(d, { rng, fill: c });
      l += ink(d, { rng, size: 1.8 });
    }
    l += ink('M38 40V148H150', { rng, size: 2.4 });
    const lens = ellipseD(126, 84, 30, 30);
    f += `<path d="${lens}" fill="${P.paper}" opacity="0.55"/>`;
    l += ink(lens, { rng, size: 4.2 });
    l += ink('M147 106L174 136', { rng, size: 9, thinning: 0.2 });
    l += inkLine('M108 72Q114 62 124 60', { rng, size: 2, color: '#fff' });
    return `<g transform="translate(6,2)">${f + lines(l)}</g>`;
  },
  // Code of Ethics: a balance scale.
  ethics(rng) {
    let f = '';
    let l = '';
    const post = 'M96 60H104V148H96Z';
    const base = 'M70 158Q100 142 130 158Z';
    f += cut(post, { rng, fill: P.butterDeep }) + cut(base, { rng, fill: P.butterDeep });
    l += ink(post, { rng, size: 2 }) + ink(base, { rng, size: 2.2 });
    l += ink('M46 70L154 64', { rng, size: 3 });
    l += `<circle cx="100" cy="56" r="7" fill="${P.butter}" stroke="${P.ink}" stroke-width="2.4"/>`;
    for (const [x, y] of [[50, 70], [150, 64]]) {
      l += ink(`M${x} ${y}L${x - 20} ${y + 44}M${x} ${y}L${x + 20} ${y + 44}`, { rng, size: 1.6 });
      const pan = `M${x - 28} ${y + 44}Q${x} ${y + 70} ${x + 28} ${y + 44}Z`;
      f += cut(pan, { rng, fill: P.paper });
      l += ink(pan, { rng, size: 2.4 });
    }
    // a heart on one pan, a book on the other: principles and rules
    f += cut('M50 108C44 100 36 108 50 116C64 108 56 100 50 108Z', { rng, fill: P.tomato, shadow: false });
    f += cut(rectD(139, 99, 22, 9), { rng, fill: P.civic, shadow: false });
    return f + lines(l);
  },
  // Administration & Management: a clipboard checklist and a rubber stamp.
  admin(rng) {
    let f = '';
    let l = '';
    const board = roundRectD(50, 44, 84, 112, 6);
    const sheet = rectD(58, 58, 68, 90);
    f += cut(board, { rng, fill: P.kraftDeep }) + cut(sheet, { rng, fill: P.paper, pattern: 'ruled', patternOpacity: 0.4 });
    const clip = roundRectD(76, 36, 32, 16, 4);
    f += cut(clip, { rng, fill: P.ink });
    l += ink(board, { rng, size: 2.4 }) + ink(sheet, { rng, size: 1.6 });
    for (let i = 0; i < 4; i++) {
      const y = 72 + i * 19;
      l += ink(rectD(64, y - 6, 10, 10), { rng, size: 1.6 });
      if (i < 3) l += inkLine([[64, y - 2], [69, y + 4], [78, y - 10]], { rng, size: 2.6, color: P.tomatoDeep, overshoot: 1 });
      l += ink(`M82 ${y}H${116 - (i % 2) * 10}`, { rng, size: 1.6, opacity: 0.8 });
    }
    const handle = 'M150 96Q144 86 150 80Q160 74 166 82Q170 90 162 96Z';
    const stem = rectD(152, 96, 10, 22);
    const foot = rectD(138, 118, 38, 16);
    f += cut(stem, { rng, fill: P.kraft }) + cut(handle, { rng, fill: P.tomato }) + cut(foot, { rng, fill: P.ink });
    l += ink(handle, { rng, size: 1.8 }) + ink(stem, { rng, size: 1.6 });
    return f + lines(l);
  },
  // Leadership: a flag planted on a summit with a winding path up.
  leadership(rng) {
    let f = '';
    let l = '';
    const hill = 'M30 156Q70 70 104 62Q138 70 172 156Z';
    f += torn(hill, { rng, fill: P.leaf, amp: 1.6, rim: 2 });
    const snow = 'M84 84Q104 58 124 84Q114 80 104 88Q96 80 84 84Z';
    f += cut(snow, { rng, fill: P.paper, shadow: false });
    l += inkLine('M88 156Q116 140 96 124Q82 112 108 102Q118 96 104 80', { rng, size: 2, opacity: 0.8, color: P.cream });
    l += ink('M104 64V26', { rng, size: 2.6 });
    const flag = 'M104 26Q120 20 134 28Q146 34 158 28V52Q146 58 134 52Q120 46 104 52Z';
    f += cut(flag, { rng, fill: P.tomato, pattern: 'stripes', patternOpacity: 0.25 });
    l += ink(flag, { rng, size: 2 });
    l += ink(hill, { rng, size: 2.2, closed: false });
    return f + lines(l);
  }
};

export const BADGES = [
  ['fundamentals', P.butter, 'dots'],
  ['plan', P.sky, null],
  ['communication', P.blush, 'dots'],
  ['implementation', P.lavender, null],
  ['practice', P.mint, 'dots'],
  ['research', '#D7E6F3', null],
  ['ethics', P.sage, 'dots'],
  ['admin', '#E8D3B4', null],
  ['leadership', '#F6D9A8', 'dots']
];

function logo() {
  const rng = makeRng(77);
  // Torn civic-blue tile, rails running off to a butter sun: the old logo, redrawn by hand.
  let b = torn(roundRectD(14, 14, 172, 172, 34), { rng, fill: P.civic, amp: 2.2, rim: 4 });
  b += torn(ellipseD(100, 58, 22, 22), { rng, fill: P.butter, amp: 1.2, rim: 0, shadow: false });
  let l = '';
  l += ink('M52 170L90 78M148 170L110 78', { rng, size: 9, color: P.paper, thinning: 0.35, taper: false, wobble: 0.8 });
  l += ink('M44 152H156M60 124H140M73 101H127', { rng, size: 7.5, color: P.paper, thinning: 0.3, taper: false, wobble: 0.7 });
  return b + `<g transform="translate(-1,-1)">${l}</g>`;
}

export default function () {
  const out = BADGES.map(([key, color, pattern], i) => {
    const rng = makeRng(500 + i * 13);
    return { name: `badge-${key}`, w: S, h: S, svg: svgDoc(S, S, disc(rng, color, pattern) + icons[key](rng)), scale: 1, quality: 0.88 };
  });
  out.push({ name: 'logo', w: S, h: S, svg: svgDoc(S, S, logo()), scale: 0.64, png: true });
  return out;
}
