// Landing hero: a paper town along a streetcar line, split into layers
// so the page can parallax them and drive the tram through.
import { svgDoc, torn, cut, ink, inkLine, hatch, contours, rectD, polyD, makeRng, PALETTE as P } from '../lib/draw.mjs';
import { house, block, cityHall, townhouse, tree, pine, bush, cloud, sun, tram, wheel, person, bike } from '../lib/props.mjs';

export const W = 1600;
export const H = 470;
export const RAIL_Y = 404;
export const WIRE_Y = 172;
const OFF = 'translate(-1.6,-1.2)';

function hillBand(y, amp, rng, waves = 3) {
  let d = `M-20 ${y}`;
  const seg = (W + 40) / waves;
  for (let i = 0; i < waves; i++) {
    const x0 = -20 + i * seg;
    const up = rng.range(0.4, 1) * amp;
    d += `C${x0 + seg * 0.3} ${y - up} ${x0 + seg * 0.7} ${y - up} ${x0 + seg} ${y + rng.range(-amp * 0.2, amp * 0.2)}`;
  }
  return d + `V${H + 20}H-20Z`;
}

function back() {
  const rng = makeRng(201);
  let b = '';
  // Far skyline in faded lavender, low detail, like a tissue-paper layer.
  const heights = [120, 170, 95, 210, 140, 110, 250, 160, 130, 190, 100, 150, 220, 120, 175, 105];
  let x = 20;
  let sky = '';
  for (const h of heights) {
    const w = rng.range(55, 95);
    const d = rng() < 0.25
      ? polyD([[x, 360], [x, 360 - h], [x + w / 2, 360 - h - 26], [x + w, 360 - h], [x + w, 360]])
      : rectD(x, 360 - h, w, h);
    sky += cut(d, { rng, fill: '#D9CFE8', shadow: false, jitter: 1 });
    x += w + rng.range(-8, 16);
  }
  b += `<g opacity="0.9">${sky}</g>`;
  // Two torn hill bands, the nearer one cut from an old contour map.
  const h1 = hillBand(300, 70, rng, 4);
  b += torn(h1, { rng, fill: '#CFE3C4', amp: 3, rim: 3 });
  const h2 = hillBand(338, 55, rng, 5);
  b += torn(h2, { rng, fill: P.sage, amp: 3, rim: 3 });
  b += contours(h2, { rng, cx: 520, cy: 400, rings: 12, step: 13, opacity: 0.22 });
  b += contours(h2, { rng, cx: 1250, cy: 420, rings: 12, step: 12, opacity: 0.22 });
  return b;
}

function mid() {
  const base = 386;
  let b = '';
  b += tree(40, base, 34, { seed: 2 });
  b += house(78, base, 112, 140, { seed: 3, wall: P.butter, roof: P.tomato, pattern: 'dots', patternOpacity: 0.12 });
  b += townhouse(206, base, 84, 190, { seed: 4, wall: P.blush, pattern: 'pinstripe', patternOpacity: 0.12 });
  b += block(300, base, 124, 236, { seed: 5, wall: P.lavender, awning: P.tomato, water: true, lit: 0.3 });
  b += pine(452, base, 110, { seed: 6 });
  b += tree(498, base, 30, { seed: 7, crown: P.leafDeep });
  b += cityHall(540, base, 250, 230, { seed: 8 });
  b += tree(812, base, 36, { seed: 9 });
  b += block(858, base, 108, 284, { seed: 10, wall: P.civic, win: P.sky, cols: 3, rows: 6, lit: 0.2, pattern: 'grid', patternOpacity: 0.25 });
  b += block(972, base, 96, 170, { seed: 11, wall: P.tomato, cols: 2, rows: 3, awning: P.butter, lit: 0.35 });
  b += house(1082, base, 104, 128, { seed: 12, wall: P.mint, roof: P.civicDeep, door: P.tomato });
  b += tree(1210, base, 30, { seed: 13, crown: P.leaf });
  b += townhouse(1246, base, 78, 168, { seed: 14, wall: P.butter });
  b += townhouse(1322, base, 78, 196, { seed: 15, wall: P.lavender });
  b += pine(1430, base, 96, { seed: 16 });
  b += house(1462, base, 108, 132, { seed: 17, wall: P.blush, roof: P.leafDeep, door: P.butterDeep, chimney: false });
  b += tree(1586, base, 32, { seed: 18 });
  return b;
}

function track() {
  const rng = makeRng(301);
  let b = '';
  // Kraft-paper embankment the rails sit on.
  const bank = `M-20 ${RAIL_Y - 22}C400 ${RAIL_Y - 30} 900 ${RAIL_Y - 14} ${W + 20} ${RAIL_Y - 24}V${H + 20}H-20Z`;
  b += torn(bank, { rng, fill: P.kraft, amp: 3, rim: 3 });
  b += hatch(bank, { rng, angle: 12, gap: 11, opacity: 0.18, size: 1 });
  // Sleepers, then the two rails.
  let ties = '';
  for (let x = -10; x < W + 10; x += 26 + rng.range(-3, 3)) {
    const t = rectD(x, RAIL_Y - 3, 14, 12);
    ties += cut(t, { rng, fill: P.kraftDeep, shadow: false, jitter: 0.8 });
  }
  b += ties;
  b += `<g transform="${OFF}">`;
  b += inkLine([[-20, RAIL_Y], [W + 20, RAIL_Y]], { rng, size: 3.6, wobble: 1.2, taper: false });
  b += inkLine([[-20, RAIL_Y + 8], [W + 20, RAIL_Y + 8]], { rng, size: 2.4, wobble: 1.2, taper: false, opacity: 0.8 });
  b += '</g>';
  // Grass tufts along the bank.
  let tufts = '';
  for (let i = 0; i < 38; i++) {
    const x = rng.range(0, W);
    const y = rng.range(RAIL_Y + 24, H - 6);
    tufts += ink(`M${x - 5} ${y}L${x - 7} ${y - 8}M${x} ${y}L${x} ${y - 11}M${x + 5} ${y}L${x + 8} ${y - 8}`, { rng, size: 1.6, color: P.leafDeep });
  }
  b += tufts;
  // Overhead wire and its poles (behind the tram).
  let poles = '';
  for (const px of [150, 560, 970, 1380]) {
    const pole = rectD(px - 4, WIRE_Y - 12, 8, RAIL_Y - 24 - WIRE_Y + 12);
    poles += cut(pole, { rng, fill: P.civicDeep, shadow: true, jitter: 0.5 });
    poles += `<g transform="${OFF}">${ink(pole, { rng, size: 1.8 })}${ink(`M${px - 4} ${WIRE_Y}H${px + 24}`, { rng, size: 2.4 })}</g>`;
  }
  const sag = (x0, x1) => `M${x0} ${WIRE_Y}Q${(x0 + x1) / 2} ${WIRE_Y + 12} ${x1} ${WIRE_Y}`;
  let wire = '';
  for (const [a, c] of [[-20, 150], [150, 560], [560, 970], [970, 1380], [1380, W + 20]]) wire += inkLine(sag(a, c), { rng, size: 1.8, wobble: 0.6, taper: false });
  // A few birds perched on the wire.
  let birds = '';
  for (const [bx, dir] of [[250, 1], [285, -1], [1150, 1], [1190, 1], [1232, -1]]) {
    const by = WIRE_Y + 12 * (1 - Math.pow(((bx - (bx < 560 ? 355 : 1175)) / 205), 2)) - 1;
    const sc = 1.7;
    const body0 = `M${bx - 7 * dir} ${by - 5}Q${bx} ${by - 14} ${bx + 7 * dir} ${by - 7}L${bx + 11 * dir} ${by - 6}L${bx + 7 * dir} ${by - 4}Q${bx + 2 * dir} ${by + 1} ${bx - 7 * dir} ${by - 5}Z`;
    const bird = cut(body0, { rng, fill: P.ink, shadow: false, jitter: 0.3 }) +
      `<circle cx="${bx + 4 * dir}" cy="${by - 8.5}" r="1.1" fill="#fff"/>` +
      inkLine([[bx - 7 * dir, by - 5], [bx - 13 * dir, by - 3]], { rng, size: 2, overshoot: 0 }) +
      inkLine([[bx, by - 3], [bx - 1, by + 1]], { rng, size: 1.2, overshoot: 0 });
    birds += `<g transform="translate(${bx},${by}) scale(${sc}) translate(${-bx},${-by})">${bird}</g>`;
  }
  return { bank: b, poles: poles + `<g transform="${OFF}">${wire}</g>` + birds };
}

// Tram-stop sign with a flag and the little crowd waiting.
function stop() {
  const rng = makeRng(401);
  const x = 700;
  const y = RAIL_Y + 40;
  let b = '';
  const post = rectD(x - 3, y - 120, 6, 120);
  b += cut(post, { rng, fill: P.ink });
  const sign = `M${x - 34} ${y - 150}H${x + 34}V${y - 112}H${x - 34}Z`;
  b += cut(sign, { rng, fill: P.butter });
  b += `<g transform="${OFF}">${ink(sign, { rng, size: 2.2 })}</g>`;
  b += `<text x="${x}" y="${y - 136}" text-anchor="middle" font-family="Fraunces, Georgia, serif" font-weight="800" font-size="11" letter-spacing="1" fill="${P.ink}">STOP</text>`;
  b += `<text x="${x}" y="${y - 120}" text-anchor="middle" font-family="Fraunces, Georgia, serif" font-weight="700" font-style="italic" font-size="12" fill="${P.tomatoDeep}">AICP</text>`;
  return b;
}

function foreground() {
  let b = '';
  b += bush(-10, H + 4, 150, 60, { seed: 1, fill: P.leaf });
  b += bush(1480, H + 6, 150, 62, { seed: 2, fill: P.leaf });
  b += bush(1380, H + 10, 110, 44, { seed: 3 });
  return b;
}

function crowd() {
  const y = RAIL_Y + 44;
  let b = '';
  b += person(740, y, 1.25, { seed: 5, coat: P.civic, prop: 'roll' });
  b += person(782, y, 1.15, { seed: 6, coat: P.tomato, prop: 'wave', flip: true, skin: '#8D5A3B' });
  b += person(820, y, 1.3, { seed: 7, coat: P.leafDeep, prop: 'clipboard', skin: '#F0C9A6', hair: '#7A4A2A' });
  b += bike(890, y + 2, 1.1, { seed: 8 });
  return b;
}

export default function () {
  const t = tram(0, 0, 360, { seed: 9 });
  // Tram drawn at origin: body spans x 0..360, rails at y 0.
  const pad = 70;
  const tramW = 360 + pad * 2;
  const tramTop = 0 - t.h - t.h * 0.7;
  const tramH = -tramTop + t.wheelR * 1.4 + 10;
  const tramSvg = svgDoc(tramW, tramH, `<g transform="translate(${pad},${-tramTop})">${t.body}</g>`);
  const r = t.wheelR;
  const wheelSvg = svgDoc(r * 2 + 12, r * 2 + 12, wheel(r + 6, r + 6, r, { seed: 77 }), {});
  const tr = track();
  const out = [
    { name: 'hero-back', w: W, h: H, svg: svgDoc(W, H, back()), scale: 1.25, quality: 0.8 },
    { name: 'hero-poles', w: W, h: H, svg: svgDoc(W, H, tr.poles), scale: 1.6, quality: 0.85 },
    { name: 'hero-town', w: W, h: H, svg: svgDoc(W, H, mid()), scale: 1.6, quality: 0.84 },
    { name: 'hero-track', w: W, h: H, svg: svgDoc(W, H, tr.bank), scale: 1.5, quality: 0.8 },
    // The AICP stop sign sits on its own still layer, in front of the tram
    // but separate from the crowd, which hops when the tram arrives.
    { name: 'hero-stop', w: W, h: H, svg: svgDoc(W, H, stop()), scale: 1.6, quality: 0.86 },
    { name: 'hero-crowd', w: W, h: H, svg: svgDoc(W, H, crowd()), scale: 1.6, quality: 0.86 },
    { name: 'hero-front', w: W, h: H, svg: svgDoc(W, H, foreground()), scale: 1.5, quality: 0.84 },
    { name: 'hero-tram', w: tramW, h: tramH, svg: tramSvg, quality: 0.86 },
    { name: 'hero-wheel', w: r * 2 + 12, h: r * 2 + 12, svg: wheelSvg, scale: 3 },
    { name: 'hero-sun', w: 200, h: 200, svg: svgDoc(200, 200, sun(100, 100, 52, { seed: 3 })) },
    { name: 'hero-cloud-a', w: 260, h: 110, svg: svgDoc(260, 110, cloud(20, 20, 220, 70, { seed: 4 })) },
    { name: 'hero-cloud-b', w: 200, h: 90, svg: svgDoc(200, 90, cloud(16, 16, 168, 56, { seed: 5, fill: P.sky })) }
  ];
  // Geometry the React component needs to line the layers up.
  out.meta = { W, H, RAIL_Y, WIRE_Y, pad, tramW, tramH, tramTop, railFromTop: -tramTop + t.wheelR * 1.2, centers: t.centers.map(([cx, cy]) => [cx + pad, cy - tramTop]), wheelBox: r * 2 + 12 };
  return out;
}
