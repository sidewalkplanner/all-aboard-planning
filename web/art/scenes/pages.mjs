// Header illustrations for the inner pages, plus the footer skyline.
import { svgDoc, torn, cut, ink, inkLine, hatch, stipple, rectD, roundRectD, ellipseD, blobD, polyD, makeRng, PALETTE as P } from '../lib/draw.mjs';
import { tape, star, sparkle, tree, pine, bush, house, block, townhouse, cityHall, tram, wheel, cloud } from '../lib/props.mjs';
import { ticketD, hand, serif } from './spots.mjs';

const OFF = 'translate(-1.5,-1.1)';
const L = (s) => `<g transform="${OFF}">${s}</g>`;

function ticket(x, y, w, h, rot, color, title, sub, rng, opts = {}) {
  const stub = w * 0.28;
  const d = ticketD(x, y, w, h, stub, 10);
  let b = cut(d, { rng, fill: color, pattern: opts.pattern, patternOpacity: 0.1 });
  let l = ink(d, { rng, size: 2.4 });
  let perf = '';
  for (let yy = y + 14; yy < y + h - 10; yy += 9) perf += `<circle cx="${x + stub}" cy="${yy}" r="1.6" fill="${P.ink}" opacity="0.55"/>`;
  b += perf + L(l);
  b += serif(x + stub / 2, y + h / 2 + 9, opts.num ?? '№', { size: 24 });
  b += serif(x + stub + (w - stub) / 2, y + h * 0.45, title, { size: h * 0.2, spacing: 1.5 });
  b += hand(x + stub + (w - stub) / 2, y + h * 0.75, sub, { size: h * 0.2 });
  return `<g transform="rotate(${rot} ${x + w / 2} ${y + h / 2})">${b}</g>`;
}

// Exams: a fan of train tickets and a conductor's hole punch.
function tickets() {
  const rng = makeRng(701);
  let b = '';
  b += ticket(40, 120, 300, 120, -12, P.sky, 'QUIZ A', 'free ride', rng, { num: 'A' });
  b += ticket(90, 80, 300, 120, 4, P.butter, 'EXAM 1', '170 questions', rng, { num: '1', pattern: 'pinstripe' });
  b += ticket(150, 150, 300, 120, -3, P.blush, 'EXAM 2', 'full length', rng, { num: '2' });
  // punched holes in the top ticket's stub, and a strip of tape holding the fan
  for (const [x, y] of [[170, 172], [172, 250]]) b += `<circle cx="${x}" cy="${y}" r="6" fill="${P.cream}" stroke="${P.ink}" stroke-width="1.6"/>`;
  b += tape(330, 62, 110, 30, 24, { seed: 6, fill: 'rgba(159,211,199,0.82)' });
  b += sparkle(40, 60, 12, { seed: 2 }) + sparkle(470, 250, 9, { seed: 3 });
  b += star(500, 130, 12, { fill: P.butter, seed: 5 });
  return { W: 520, H: 320, b };
}

// Pricing: a little ticket booth with a striped awning.
function booth() {
  const rng = makeRng(711);
  let b = '';
  const body = rectD(80, 110, 260, 210);
  b += cut(body, { rng, fill: P.civic, pattern: 'grid', patternOpacity: 0.12 });
  const roof = 'M60 70H360L372 110H48Z';
  b += cut(roof, { rng, fill: P.ink });
  b += serif(210, 99, 'TICKETS', { size: 26, spacing: 4, color: P.butter });
  // awning with scallops
  let aw = 'M56 110H364V140';
  const n = 8;
  const sw = 308 / n;
  for (let i = n; i > 0; i--) aw += `Q${56 + (i - 0.5) * sw} 158 ${56 + (i - 1) * sw} 140`;
  aw += 'Z';
  b += cut(aw, { rng, fill: P.tomato });
  for (let i = 0; i < n; i += 2) b += cut(rectD(56 + i * sw, 110, sw, 30), { rng, fill: P.paper, shadow: false, jitter: 0.4 });
  const win = roundRectD(120, 164, 180, 96, 40);
  b += cut(win, { rng, fill: P.sky });
  // conductor peeking out
  b += cut(ellipseD(210, 226, 26, 28), { rng, fill: '#E9B58E', shadow: false });
  b += cut('M180 214Q210 176 240 214Z', { rng, fill: P.civicDeep, shadow: false });
  b += cut(rectD(176, 208, 68, 9), { rng, fill: P.ink, shadow: false });
  b += `<circle cx="210" cy="199" r="4.5" fill="${P.butter}"/>`;
  b += `<circle cx="200" cy="228" r="2.6" fill="${P.ink}"/><circle cx="220" cy="228" r="2.6" fill="${P.ink}"/>`;
  b += L(inkLine('M200 240Q210 248 220 240', { rng, size: 2 }));
  b += `<ellipse cx="192" cy="238" rx="5" ry="3" fill="${P.tomato}" opacity="0.5"/><ellipse cx="228" cy="238" rx="5" ry="3" fill="${P.tomato}" opacity="0.5"/>`;
  const counter = rectD(96, 256, 228, 16);
  b += cut(counter, { rng, fill: P.kraft });
  b += L(ink(body, { rng, size: 2.6 }) + ink(roof, { rng, size: 2.4 }) + ink(aw, { rng, size: 2 }) + ink(win, { rng, size: 2.4 }) + ink(counter, { rng, size: 2 }));
  b += L(ink(rectD(110, 286, 200, 20), { rng, size: 1.6, opacity: 0.6 }));
  b += ticket(270, 234, 120, 54, 14, P.butter, 'ADMIT', 'one', rng, { num: '★' });
  b += torn('M20 320Q210 300 400 320V336H20Z', { rng, fill: P.kraft, amp: 1.6, rim: 1.6 });
  b += bush(8, 332, 90, 44, { seed: 7 }) + bush(340, 334, 80, 40, { seed: 8, fill: P.leaf });
  b += sparkle(390, 60, 11, { seed: 3 }) + sparkle(30, 150, 9, { seed: 4 });
  return { W: 420, H: 350, b };
}

// Progress: the journey so far, a route with station stamps.
function route() {
  const rng = makeRng(721);
  let b = '';
  const line = 'M40 150C140 60 220 210 330 130S520 60 620 140S780 200 860 110';
  b += L(inkLine(line, { rng, size: 10, color: P.tomato, taper: false, wobble: 1 }));
  b += L(inkLine(line, { rng, size: 2.2, color: P.paper, taper: false, wobble: 0.5, opacity: 0.8 }));
  const stations = [[40, 150, 'start'], [245, 142, 'quiz A'], [455, 94, 'diagnostic'], [660, 160, 'exam 1'], [860, 110, 'exam day!']];
  stations.forEach(([x, y, label], i) => {
    b += `<circle cx="${x}" cy="${y}" r="13" fill="${P.paper}" stroke="${P.ink}" stroke-width="4"/>`;
    const dy = [44, -26, -26, 44, -26][i];
    b += hand(x + (i === 4 ? -10 : 0), y + dy, label, { size: 26, color: i === 4 ? P.tomatoDeep : P.ink });
  });
  // Passport-style stamps.
  const stamp = (x, y, r, text, color, rot) => {
    const d = ellipseD(x, y, r, r);
    return `<g transform="rotate(${rot} ${x} ${y})" opacity="0.85">${L(ink(d, { rng, size: 2.6, color }) + ink(ellipseD(x, y, r - 7, r - 7), { rng, size: 1.4, color }))}${serif(x, y + 6, text, { size: 15, color, spacing: 1 })}</g>`;
  };
  b += stamp(130, 232, 34, 'GO!', P.civic, -14);
  b += stamp(360, 38, 34, 'AICP', P.leafDeep, 10);
  // Flag at exam day.
  b += L(ink('M880 110V28', { rng, size: 2.6 }));
  const flag = 'M880 28L930 42L880 58Z';
  b += cut(flag, { rng, fill: P.butter });
  b += L(ink(flag, { rng, size: 2 }));
  b += star(560, 40, 12, { fill: P.butter, seed: 6 }) + sparkle(740, 240, 10, { seed: 7 });
  return { W: 960, H: 270, b };
}

// Sign in: the conductor waving you aboard with a lantern.
function conductor() {
  const rng = makeRng(731);
  let b = '';
  const cx = 150;
  const base = 330;
  // legs + shoes
  b += L(ink(`M${cx - 18} ${base - 70}L${cx - 22} ${base - 6}M${cx + 18} ${base - 70}L${cx + 22} ${base - 6}`, { rng, size: 7, thinning: 0.2 }));
  b += cut(`M${cx - 40} ${base}Q${cx - 40} ${base - 14} ${cx - 20} ${base - 12}L${cx - 14} ${base}Z`, { rng, fill: P.ink });
  b += cut(`M${cx + 40} ${base}Q${cx + 40} ${base - 14} ${cx + 20} ${base - 12}L${cx + 14} ${base}Z`, { rng, fill: P.ink });
  // coat
  const coat = `M${cx - 56} ${base - 60}Q${cx - 64} ${base - 200} ${cx} ${base - 204}Q${cx + 64} ${base - 200} ${cx + 56} ${base - 60}Q${cx} ${base - 44} ${cx - 56} ${base - 60}Z`;
  b += cut(coat, { rng, fill: P.civicDeep, pattern: 'pinstripe', patternOpacity: 0.12 });
  for (let i = 0; i < 4; i++) b += `<circle cx="${cx + (i % 2 ? 12 : -12)}" cy="${base - 160 + Math.floor(i / 2) * 44}" r="5" fill="${P.butter}" stroke="${P.ink}" stroke-width="1.6"/>`;
  b += L(ink(coat, { rng, size: 2.8 }) + ink(`M${cx} ${base - 196}V${base - 52}`, { rng, size: 1.6, opacity: 0.6 }));
  // left arm raised, waving
  b += L(ink(`M${cx - 50} ${base - 170}Q${cx - 86} ${base - 196} ${cx - 92} ${base - 236}`, { rng, size: 13, thinning: 0.15, color: P.civicDeep, taper: false }));
  b += cut(ellipseD(cx - 94, base - 246, 13, 14), { rng, fill: '#E9B58E' });
  b += L(ink(`M${cx - 112} ${base - 262}q-6 -8 -4 -16M${cx - 76} ${base - 262}q6 -8 4 -16`, { rng, size: 2 }));
  // right arm holding lantern
  b += L(ink(`M${cx + 50} ${base - 166}Q${cx + 82} ${base - 140} ${cx + 88} ${base - 110}`, { rng, size: 13, thinning: 0.15, color: P.civicDeep, taper: false }));
  b += cut(ellipseD(cx + 90, base - 104, 11, 11), { rng, fill: '#E9B58E' });
  const lx = cx + 92;
  const ly = base - 70;
  b += L(ink(`M${lx} ${base - 100}V${ly - 30}`, { rng, size: 2 }));
  const glass = `M${lx - 18} ${ly - 26}H${lx + 18}L${lx + 14} ${ly + 16}H${lx - 14}Z`;
  b += `<circle cx="${lx}" cy="${ly - 4}" r="44" fill="${P.butter}" opacity="0.28"/>`;
  b += cut(glass, { rng, fill: P.butter });
  b += cut(rectD(lx - 20, ly - 32, 40, 8), { rng, fill: P.tomato });
  b += cut(rectD(lx - 16, ly + 14, 32, 7), { rng, fill: P.tomato });
  b += cut(blobD(lx, ly - 4, 5, 9, rng, 3, 0.1), { rng, fill: P.tomato, shadow: false });
  b += L(ink(glass, { rng, size: 2 }));
  // head
  const head = ellipseD(cx, base - 236, 38, 40);
  b += cut(head, { rng, fill: '#E9B58E' });
  b += L(ink(head, { rng, size: 2.6 }));
  b += `<circle cx="${cx - 13}" cy="${base - 236}" r="3.6" fill="${P.ink}"/><circle cx="${cx + 13}" cy="${base - 236}" r="3.6" fill="${P.ink}"/>`;
  b += `<ellipse cx="${cx - 22}" cy="${base - 222}" rx="7" ry="4" fill="${P.tomato}" opacity="0.5"/><ellipse cx="${cx + 22}" cy="${base - 222}" rx="7" ry="4" fill="${P.tomato}" opacity="0.5"/>`;
  const stache = `M${cx - 20} ${base - 220}Q${cx - 10} ${base - 230} ${cx} ${base - 222}Q${cx + 10} ${base - 230} ${cx + 20} ${base - 220}Q${cx + 10} ${base - 214} ${cx} ${base - 218}Q${cx - 10} ${base - 214} ${cx - 20} ${base - 220}Z`;
  b += cut(stache, { rng, fill: '#6B4428', shadow: false });
  b += L(inkLine(`M${cx - 8} ${base - 209}Q${cx} ${base - 203} ${cx + 8} ${base - 209}`, { rng, size: 2.2 }));
  // cap
  const cap = `M${cx - 40} ${base - 258}Q${cx - 44} ${base - 300} ${cx} ${base - 302}Q${cx + 44} ${base - 300} ${cx + 40} ${base - 258}Z`;
  const brim = `M${cx - 44} ${base - 260}Q${cx} ${base - 250} ${cx + 52} ${base - 262}L${cx + 50} ${base - 252}Q${cx} ${base - 240} ${cx - 44} ${base - 250}Z`;
  b += cut(cap, { rng, fill: P.civicDeep }) + cut(brim, { rng, fill: P.ink });
  b += cut(rectD(cx - 12, base - 290, 24, 14), { rng, fill: P.butter, shadow: false });
  b += L(ink(cap, { rng, size: 2.4 }));
  b += serif(cx, base - 279, 'AA', { size: 10 });
  b += hand(cx - 70, 40, 'all aboard!', { size: 36, rotate: -8, color: P.tomatoDeep });
  b += sparkle(260, 60, 11, { seed: 3 });
  return { W: 300, H: 340, b };
}

// 404: a streetcar whose track runs off the torn edge of the map.
function lost() {
  const rng = makeRng(741);
  let b = '';
  const ground = 'M20 250Q200 232 360 246L372 252L360 262L376 270L362 280L20 290Z';
  b += torn(ground, { rng, fill: P.kraft, amp: 2, rim: 2 });
  b += L(inkLine([[20, 248], [352, 244]], { rng, size: 3, taper: false }));
  for (let x = 30; x < 350; x += 24) b += cut(rectD(x, 244, 12, 9), { rng, fill: P.kraftDeep, shadow: false, jitter: 0.6 });
  const t = tram(0, 0, 220, { seed: 12, sign: 'WRONG STOP' });
  b += `<g transform="translate(96,${244 - t.wheelR * 1.2}) rotate(-4 110 0)">${t.body}${t.wheels}</g>`;
  // signpost with question marks
  const post = rectD(410, 120, 10, 170);
  b += cut(post, { rng, fill: P.kraftDeep });
  const a1 = 'M420 130H500L516 146L500 162H420Z';
  const a2 = 'M410 176H330L314 192L330 208H410Z';
  b += `<g transform="rotate(8 460 146)">${cut(a1, { rng, fill: P.butter })}${L(ink(a1, { rng, size: 2 }))}${hand(462, 155, 'this way?', { size: 22 })}</g>`;
  b += `<g transform="rotate(-6 360 192)">${cut(a2, { rng, fill: P.blush })}${L(ink(a2, { rng, size: 2 }))}${hand(364, 200, 'or here?', { size: 22 })}</g>`;
  b += L(ink(post, { rng, size: 1.8 }));
  b += torn('M390 290Q450 276 520 290V300H390Z', { rng, fill: P.sage, amp: 1.4, rim: 1.4 });
  b += serif(470, 90, '?', { size: 56, italic: true, color: P.tomato });
  b += serif(60, 120, '?', { size: 36, italic: true, color: P.civic });
  b += cloud(300, 18, 130, 44, { seed: 9 });
  return { W: 540, H: 310, b };
}

// Study by domain: a stack of well-used planning books with a plant.
function books() {
  const rng = makeRng(751);
  let b = '';
  const spines = [
    [40, 250, 300, 46, P.civic, 'ZONING'], [60, 204, 270, 46, P.butter, 'PLAN MAKING'], [30, 164, 290, 40, P.tomato, 'ETHICS'], [70, 124, 250, 40, P.leaf, 'GIS & DATA']
  ];
  for (const [x, y, w, h, c, label] of spines) {
    const d = roundRectD(x, y, w, h, 5);
    b += cut(d, { rng, fill: c, pattern: c === P.butter ? 'dots' : undefined, patternOpacity: 0.12 });
    b += cut(rectD(x + w - 18, y + 2, 12, h - 4), { rng, fill: P.paper, shadow: false, pattern: 'ruled', patternOpacity: 0.6 });
    b += L(ink(d, { rng, size: 2.2 }) + ink(`M${x + 24} ${y + 4}V${y + h - 4}M${x + 30} ${y + 4}V${y + h - 4}`, { rng, size: 1.2, opacity: 0.6 }));
    b += serif(x + w / 2, y + h / 2 + 6, label, { size: 15, spacing: 2, color: c === P.butter ? P.ink : P.paper });
  }
  // plant pot on top
  const pot = 'M210 124L204 84H264L258 124Z';
  const leaves = [
    'M234 84Q200 40 214 10Q244 40 234 84Z', 'M234 84Q260 30 294 26Q282 70 234 84Z', 'M234 84Q190 70 176 44Q220 44 234 84Z'
  ];
  for (const lf of leaves) {
    b += cut(lf, { rng, fill: P.leaf });
    b += L(ink(lf, { rng, size: 1.8 }));
  }
  b += cut(pot, { rng, fill: P.tomato, pattern: 'stripes', patternOpacity: 0.2 });
  b += L(ink(pot, { rng, size: 2.2 }));
  // mug
  const mug = 'M332 250V204H378V250Q378 258 370 258H340Q332 258 332 250Z';
  b += cut(mug, { rng, fill: P.paper });
  b += L(ink(mug, { rng, size: 2.2 }) + ink('M378 214Q396 214 396 228Q396 242 378 240', { rng, size: 2.2 }));
  b += L(ink('M346 194Q340 184 348 176Q354 168 348 160M362 194Q356 184 364 176', { rng, size: 1.6, opacity: 0.6 }));
  b += cut(rectD(332, 220, 46, 10), { rng, fill: P.civic, shadow: false });
  b += torn('M10 296Q210 284 410 296V306H10Z', { rng, fill: P.kraft, amp: 1.4, rim: 1.4 });
  b += sparkle(360, 120, 11, { seed: 4 }) + sparkle(20, 100, 8, { seed: 5 });
  return { W: 420, H: 310, b };
}

// Footer: a line-only skyline sketch with the track along the bottom.
function footer() {
  const rng = makeRng(761);
  const W = 1600;
  const H = 150;
  const base = 130;
  let l = '';
  const outline = [];
  let x = 0;
  while (x < W) {
    const kind = rng.int(0, 4);
    const w = rng.range(40, 90);
    const h = rng.range(30, 100);
    if (kind === 0) outline.push(`M${x} ${base}V${base - h * 0.6}L${x + w / 2} ${base - h * 0.95}L${x + w} ${base - h * 0.6}V${base}`);
    else if (kind === 1) {
      outline.push(`M${x + w * 0.45} ${base}V${base - 16}`);
      outline.push(ellipseD(x + w * 0.45, base - 16 - h * 0.25, h * 0.2, h * 0.25));
    } else outline.push(`M${x} ${base}V${base - h}H${x + w}V${base}`);
    if (kind >= 2) {
      for (let wy = base - h + 12; wy < base - 16; wy += 16) {
        for (let wx = x + 10; wx < x + w - 14; wx += 16) {
          if (rng() < 0.6) outline.push(`M${wx} ${wy}h6v7h-6Z`);
        }
      }
    }
    x += w + rng.range(4, 26);
  }
  for (const d of outline) l += ink(d, { rng, size: 1.6, wobble: 0.7, overshoot: 2 });
  l += inkLine([[0, base], [W, base]], { rng, size: 2.4, taper: false });
  l += inkLine([[0, base + 8], [W, base + 8]], { rng, size: 1.6, taper: false });
  for (let t = 6; t < W; t += 22) l += inkLine([[t, base - 1], [t + 4, base + 11]], { rng, size: 1.4, overshoot: 0 });
  return { W, H, b: l.replaceAll('var(--ink)', '#000') };
}

export default function () {
  const list = [
    ['page-tickets', tickets()],
    ['page-booth', booth()],
    ['page-route', route()],
    ['page-conductor', conductor()],
    ['page-lost', lost()],
    ['page-books', books()]
  ];
  const out = list.map(([name, { W, H, b }]) => ({ name, w: W, h: H, svg: svgDoc(W, H, b), scale: 1.6, quality: 0.84 }));
  const f = footer();
  // Used as a CSS mask (alpha only), so it's drawn in black and tinted in CSS.
  out.push({ name: 'footer-skyline', w: f.W, h: f.H, svg: svgDoc(f.W, f.H, f.b), scale: 1.25, quality: 0.8 });
  return out;
}
