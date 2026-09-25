// Reusable collage props. Each returns SVG markup positioned in scene
// coordinates. Fills are cut or torn paper; ink sits on top slightly
// off-register, the way a pen drawing never lines up with the paper
// shapes glued under it.
import { inkLine, ink, torn, cut, hatch, stipple, rectD, roundRectD, ellipseD, blobD, cloudD, polyD, makeRng, PALETTE as P } from './draw.mjs';

const OFF = 'translate(-1.6,-1.2)';
const g = (body, t = '') => `<g${t ? ` transform="${t}"` : ''}>${body}</g>`;

// ------------------------------------------------------------ buildings

export function house(x, y, w, h, opts = {}) {
  const rng = makeRng(opts.seed ?? 11);
  const { wall = P.butter, roof = P.tomato, door = P.civic, chimney = true } = opts;
  const roofH = h * 0.42;
  const wallTop = y - h + roofH;
  let fill = '';
  let lines = '';
  const wallD = rectD(x, wallTop, w, h - roofH);
  const roofD = polyD([[x - w * 0.08, wallTop + 2], [x + w / 2, y - h], [x + w * 1.08, wallTop + 2]]);
  if (chimney) {
    const cx = x + w * 0.7;
    fill += cut(rectD(cx, y - h + roofH * 0.15, w * 0.12, roofH * 0.6), { rng, fill: P.kraftDeep });
    lines += ink(rectD(cx, y - h + roofH * 0.15, w * 0.12, roofH * 0.6), { rng, size: 2.2 });
  }
  fill += cut(wallD, { rng, fill: wall, pattern: opts.pattern, patternOpacity: opts.patternOpacity ?? 0.3 });
  fill += cut(roofD, { rng, fill: roof, pattern: opts.roofPattern, patternOpacity: 0.5 });
  lines += ink(wallD, { rng, size: 2.6 });
  lines += ink(roofD, { rng, size: 2.8 });
  lines += hatch(roofD, { rng, gap: 6, angle: 60, opacity: 0.35, size: 1.1 });
  // door + window
  const dw = w * 0.22;
  const dh = (h - roofH) * 0.55;
  const dx = x + w * 0.18;
  fill += cut(roundRectD(dx, y - dh, dw, dh, dw * 0.45), { rng, fill: door, shadow: false });
  lines += ink(roundRectD(dx, y - dh, dw, dh, dw * 0.45), { rng, size: 2 });
  lines += `<circle cx="${dx + dw * 0.75}" cy="${y - dh * 0.45}" r="1.6" fill="var(--ink)"/>`;
  const ww = w * 0.28;
  const wx = x + w * 0.55;
  const wy = wallTop + (h - roofH) * 0.2;
  fill += cut(rectD(wx, wy, ww, ww * 0.9), { rng, fill: P.paper, shadow: false });
  lines += ink(rectD(wx, wy, ww, ww * 0.9), { rng, size: 2 });
  lines += ink(`M${wx + ww / 2} ${wy}V${wy + ww * 0.9}M${wx} ${wy + ww * 0.45}H${wx + ww}`, { rng, size: 1.5 });
  return fill + g(lines, OFF);
}

// Mid-rise with a grid of windows.
export function block(x, y, w, h, opts = {}) {
  const rng = makeRng(opts.seed ?? 21);
  const { wall = P.lavender, win = P.paper, cols = 3, rows = 4, cornice = P.ink, awning } = opts;
  let fill = cut(rectD(x, y - h, w, h), { rng, fill: wall, pattern: opts.pattern, patternOpacity: opts.patternOpacity ?? 0.35 });
  let lines = ink(rectD(x, y - h, w, h), { rng, size: 2.6 });
  lines += ink(`M${x - 4} ${y - h}H${x + w + 4}`, { rng, size: 3.4 });
  const padX = w * 0.14;
  const padTop = h * 0.08;
  const groundH = awning ? h * 0.22 : 0;
  const gw = (w - padX * 2) / cols;
  const gh = (h - padTop - groundH - h * 0.06) / rows;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const wx = x + padX + c * gw + gw * 0.18;
      const wy = y - h + padTop + r * gh + gh * 0.15;
      const lit = rng() < (opts.lit ?? 0.25);
      fill += cut(rectD(wx, wy, gw * 0.64, gh * 0.64), { rng, fill: lit ? P.butter : win, shadow: false, jitter: 0.6 });
      lines += ink(rectD(wx, wy, gw * 0.64, gh * 0.64), { rng, size: 1.6, wobble: 0.6, overshoot: 1.5 });
    }
  }
  if (awning) {
    const ay = y - groundH;
    const scallops = Math.max(3, Math.round(w / 22));
    const sw = (w + 8) / scallops;
    let d = `M${x - 4} ${ay - 12}H${x + w + 4}V${ay}`;
    for (let i = scallops; i > 0; i--) {
      const x1 = x - 4 + (i - 1) * sw;
      d += `Q${x1 + sw / 2} ${ay + 9} ${x1} ${ay}`;
    }
    d += 'Z';
    fill += cut(d, { rng, fill: awning });
    lines += ink(d, { rng, size: 2 });
    for (let i = 1; i < scallops; i += 2) {
      const sx = x - 4 + i * sw;
      fill += cut(rectD(sx, ay - 12, sw, 12), { rng, fill: P.paper, shadow: false, jitter: 0.4 });
    }
    fill += cut(rectD(x + w * 0.15, y - groundH * 0.72, w * 0.32, groundH * 0.72), { rng, fill: P.sky, shadow: false });
    lines += ink(rectD(x + w * 0.15, y - groundH * 0.72, w * 0.32, groundH * 0.72), { rng, size: 1.8 });
    fill += cut(rectD(x + w * 0.6, y - groundH * 0.72, w * 0.2, groundH * 0.72), { rng, fill: P.ink, shadow: false });
  }
  if (opts.water) {
    const tx = x + w * 0.62;
    const tw = w * 0.24;
    const tank = `M${tx} ${y - h - 6}V${y - h - 30}Q${tx + tw / 2} ${y - h - 44} ${tx + tw} ${y - h - 30}V${y - h - 6}Z`;
    fill += cut(tank, { rng, fill: P.kraft });
    lines += ink(tank, { rng, size: 2 });
    lines += ink(`M${tx + 3} ${y - h - 6}L${tx + 1} ${y - h}M${tx + tw - 3} ${y - h - 6}L${tx + tw - 1} ${y - h}`, { rng, size: 1.6 });
  }
  return fill + g(lines, OFF);
}

// Civic building: steps, columns, pediment and a little dome: city hall.
export function cityHall(x, y, w, h, opts = {}) {
  const rng = makeRng(opts.seed ?? 31);
  const bodyH = h * 0.5;
  const pedH = h * 0.2;
  const baseY = y - h * 0.08;
  let fill = '';
  let lines = '';
  const domeR = w * 0.18;
  const drumTop = baseY - bodyH - pedH - h * 0.1;
  const drum = rectD(x + w / 2 - domeR * 0.8, drumTop, domeR * 1.6, h * 0.12);
  const dome = `M${x + w / 2 - domeR} ${drumTop}A${domeR} ${domeR * 0.95} 0 0 1 ${x + w / 2 + domeR} ${drumTop}Z`;
  fill += cut(dome, { rng, fill: P.sage });
  fill += cut(drum, { rng, fill: P.paper });
  lines += ink(dome, { rng, size: 2.4 }) + ink(drum, { rng, size: 2.2 });
  lines += ink(`M${x + w / 2} ${drumTop - domeR * 0.95}V${drumTop - domeR * 0.95 - 22}`, { rng, size: 2 });
  const flag = `M${x + w / 2} ${drumTop - domeR * 0.95 - 22}L${x + w / 2 + 18} ${drumTop - domeR * 0.95 - 16}L${x + w / 2} ${drumTop - domeR * 0.95 - 10}Z`;
  fill += cut(flag, { rng, fill: P.tomato, shadow: false });
  lines += ink(flag, { rng, size: 1.6 });
  for (let i = 0; i < 4; i++) {
    const r = i % 2 ? 0 : 1;
    lines += ink(`M${x + w / 2 - domeR * 0.8 + (i + 0.5) * domeR * 0.4} ${drumTop + 3}v${h * 0.12 - 6}`, { rng, size: 1.2 + r * 0 });
  }
  const body = rectD(x + w * 0.06, baseY - bodyH, w * 0.88, bodyH);
  const ped = polyD([[x, baseY - bodyH], [x + w / 2, baseY - bodyH - pedH], [x + w, baseY - bodyH]]);
  fill += cut(body, { rng, fill: P.cream });
  fill += cut(ped, { rng, fill: P.civic });
  lines += ink(body, { rng, size: 2.6 }) + ink(ped, { rng, size: 2.6 });
  lines += ink(`M${x - 2} ${baseY - bodyH}H${x + w + 2}`, { rng, size: 3.2 });
  const cols = 6;
  for (let i = 0; i < cols; i++) {
    const cx = x + w * 0.13 + (i * w * 0.74) / (cols - 1);
    const colD = rectD(cx - 5, baseY - bodyH + 6, 10, bodyH - 6);
    fill += cut(colD, { rng, fill: P.paper, shadow: false, jitter: 0.5 });
    lines += ink(`M${cx - 5} ${baseY - bodyH + 6}V${baseY}M${cx + 5} ${baseY - bodyH + 6}V${baseY}`, { rng, size: 1.7 });
  }
  lines += hatch(ped, { rng, gap: 5, angle: 0, opacity: 0.3, size: 1 });
  // steps
  for (let s = 0; s < 3; s++) {
    const sy = baseY + s * (h * 0.08) / 3;
    const inset = (2 - s) * 6;
    const st = rectD(x - 4 + inset, sy, w + 8 - inset * 2, (h * 0.08) / 3);
    fill += cut(st, { rng, fill: s % 2 ? P.kraft : P.cream, shadow: false, jitter: 0.5 });
    lines += ink(st, { rng, size: 1.5, overshoot: 2 });
  }
  return fill + g(lines, OFF);
}

// Skinny townhouse row with stepped gables (for skyline variety).
export function townhouse(x, y, w, h, opts = {}) {
  const rng = makeRng(opts.seed ?? 41);
  const { wall = P.blush } = opts;
  const step = h * 0.14;
  const outline = polyD([
    [x, y], [x, y - h + step], [x + w * 0.2, y - h + step], [x + w * 0.2, y - h + step * 0.4],
    [x + w * 0.38, y - h + step * 0.4], [x + w * 0.38, y - h], [x + w * 0.62, y - h], [x + w * 0.62, y - h + step * 0.4],
    [x + w * 0.8, y - h + step * 0.4], [x + w * 0.8, y - h + step], [x + w, y - h + step], [x + w, y]
  ]);
  let fill = cut(outline, { rng, fill: wall, pattern: opts.pattern, patternOpacity: opts.patternOpacity ?? 0.3 });
  let lines = ink(outline, { rng, size: 2.5 });
  const rows = Math.max(2, Math.floor((h - step) / 34));
  for (let r = 0; r < rows; r++) {
    const wy = y - h + step + 12 + r * 34;
    for (const cx of [x + w * 0.22, x + w * 0.58]) {
      const win = `M${cx} ${wy + 18}V${wy + 7}Q${cx + w * 0.1} ${wy - 2} ${cx + w * 0.2} ${wy + 7}V${wy + 18}Z`;
      fill += cut(win, { rng, fill: rng() < 0.3 ? P.butter : P.paper, shadow: false, jitter: 0.5 });
      lines += ink(win, { rng, size: 1.5 });
    }
  }
  return fill + g(lines, OFF);
}

// ------------------------------------------------------------ nature

export function tree(x, y, r, opts = {}) {
  const rng = makeRng(opts.seed ?? 51);
  const { crown = P.leaf, trunk = P.kraftDeep, shade = true } = opts;
  const trunkD = polyD([[x - r * 0.1, y], [x - r * 0.07, y - r * 1.25], [x + r * 0.07, y - r * 1.25], [x + r * 0.1, y]]);
  const crownD = blobD(x, y - r * 1.55, r, r * 1.05, rng, 6, 0.1);
  let fill = cut(trunkD, { rng, fill: trunk });
  fill += torn(crownD, { rng, fill: crown, amp: 1.6, rim: 1.6 });
  let lines = ink(trunkD, { rng, size: 2 });
  lines += ink(`M${x} ${y - r * 0.9}l${r * 0.3} ${-r * 0.4}M${x} ${y - r * 1.1}l${-r * 0.25} ${-r * 0.3}`, { rng, size: 1.6 });
  // A few quick leaf marks rather than a full outline: looser, more drawn.
  for (let i = 0; i < 5; i++) {
    const a = rng.range(Math.PI * 0.9, Math.PI * 2.1);
    const cx = x + Math.cos(a) * r * 0.55;
    const cy = y - r * 1.55 + Math.sin(a) * r * 0.55;
    lines += inkLine([[cx - 5, cy + 2], [cx, cy - 3], [cx + 5, cy + 1]], { rng, size: 1.6, wobble: 0.5 });
  }
  if (shade) lines += hatch(crownD, { rng, angle: -50, gap: 5.5, opacity: 0.28, size: 1, bbox: [x - r, y - r * 1.55, x + r * 1.2, y - r * 0.4] });
  return fill + g(lines, OFF);
}

export function pine(x, y, h, opts = {}) {
  const rng = makeRng(opts.seed ?? 61);
  const w = h * 0.5;
  const tiers = 3;
  let fill = cut(rectD(x - 3, y - h * 0.18, 6, h * 0.18), { rng, fill: P.kraftDeep });
  let lines = '';
  for (let i = 0; i < tiers; i++) {
    const ty = y - h * 0.12 - i * h * 0.26;
    const tw = w * (1 - i * 0.22);
    const d = polyD([[x - tw / 2, ty], [x, ty - h * 0.46], [x + tw / 2, ty]]);
    fill += cut(d, { rng, fill: opts.fill ?? P.leafDeep });
    lines += ink(d, { rng, size: 2 });
  }
  return fill + g(lines, OFF);
}

export function bush(x, y, w, h, opts = {}) {
  const rng = makeRng(opts.seed ?? 71);
  const blob = blobD(x + w / 2, y - h * 0.45, w / 2, h / 2, rng, 5, 0.14);
  let out = torn(blob, { rng, fill: opts.fill ?? P.sage, amp: 1.3, rim: 1.4 });
  out += g(stipple(blob, { rng, count: Math.round(w / 3), color: P.leafDeep, opacity: 0.5 }), OFF);
  return out;
}

export function cloud(x, y, w, h, opts = {}) {
  const rng = makeRng(opts.seed ?? 81);
  const d = cloudD(x, y, w, h, rng);
  let out = torn(d, { rng, fill: opts.fill ?? P.paper, amp: 2, rim: opts.rim ?? 0, shadow: opts.shadow ?? true });
  if (opts.ink !== false) out += g(ink(d, { rng, size: 1.8, wobble: 1.4 }), OFF);
  return out;
}

export function sun(cx, cy, r, opts = {}) {
  const rng = makeRng(opts.seed ?? 91);
  let out = torn(ellipseD(cx, cy, r, r), { rng, fill: opts.fill ?? P.butter, amp: 2.2, rim: 2.4 });
  let lines = '';
  const rays = 12;
  for (let i = 0; i < rays; i++) {
    const a = (i / rays) * Math.PI * 2 + rng.range(-0.08, 0.08);
    const r0 = r + 10;
    const r1 = r + (i % 2 ? 22 : 32);
    lines += inkLine([[cx + Math.cos(a) * r0, cy + Math.sin(a) * r0], [cx + Math.cos(a) * r1, cy + Math.sin(a) * r1]], { rng, size: 2.4, wobble: 0.6 });
  }
  if (opts.face !== false) {
    lines += `<ellipse cx="${cx - r * 0.3}" cy="${cy - r * 0.08}" rx="2.6" ry="3.4" fill="var(--ink)"/><ellipse cx="${cx + r * 0.3}" cy="${cy - r * 0.08}" rx="2.6" ry="3.4" fill="var(--ink)"/>`;
    lines += inkLine(`M${cx - r * 0.28} ${cy + r * 0.2}Q${cx} ${cy + r * 0.45} ${cx + r * 0.28} ${cy + r * 0.2}`, { rng, size: 2.2 });
    lines += `<ellipse cx="${cx - r * 0.52}" cy="${cy + r * 0.2}" rx="${r * 0.13}" ry="${r * 0.08}" fill="${P.tomato}" opacity="0.55"/><ellipse cx="${cx + r * 0.52}" cy="${cy + r * 0.2}" rx="${r * 0.13}" ry="${r * 0.08}" fill="${P.tomato}" opacity="0.55"/>`;
  }
  return out + g(lines, OFF);
}

// ------------------------------------------------------------ streetcar

/**
 * The All Aboard streetcar: a chunky vintage tram in side view.
 * Returns { body, wheels } so the wheels can spin as a separate layer;
 * wheel centres are given for the animation.
 */
export function tram(x, y, w, opts = {}) {
  const rng = makeRng(opts.seed ?? 101);
  const h = w * 0.36;
  const { body = P.tomato, band = P.cream, trim = P.butter, sign = 'ALL ABOARD' } = opts;
  const top = y - h;
  const skirt = y - h * 0.16;
  let fill = '';
  let lines = '';
  // trolley pole up to the wire
  const poleX = x + w * 0.32;
  lines += ink(`M${poleX} ${top - h * 0.12}L${poleX + w * 0.28} ${top - h * 0.62}`, { rng, size: 2.6 });
  lines += `<circle cx="${poleX + w * 0.28}" cy="${top - h * 0.62}" r="4" fill="var(--ink)"/>`;
  // roof with clerestory
  const roof = `M${x + w * 0.04} ${top + 6}Q${x + w * 0.02} ${top - h * 0.1} ${x + w * 0.12} ${top - h * 0.1}H${x + w * 0.88}Q${x + w * 0.98} ${top - h * 0.1} ${x + w * 0.96} ${top + 6}Z`;
  const clere = roundRectD(x + w * 0.2, top - h * 0.2, w * 0.6, h * 0.12, 6);
  fill += cut(clere, { rng, fill: P.kraft });
  fill += cut(roof, { rng, fill: P.ink });
  lines += ink(clere, { rng, size: 2 });
  lines += ink(`M${poleX - 12} ${top - h * 0.1}h26`, { rng, size: 3 });
  // body
  const bodyD = `M${x} ${top + 8}Q${x} ${top} ${x + 10} ${top}H${x + w - 10}Q${x + w} ${top} ${x + w} ${top + 8}V${skirt}Q${x + w} ${y - 4} ${x + w - 12} ${y - 4}H${x + 12}Q${x} ${y - 4} ${x} ${skirt}Z`;
  fill += cut(bodyD, { rng, fill: body });
  // cream window band
  const bandD = rectD(x + 2, top + h * 0.08, w - 4, h * 0.44);
  fill += cut(bandD, { rng, fill: band, shadow: false, jitter: 0.8 });
  // trim stripe
  const stripe = rectD(x + 2, top + h * 0.58, w - 4, h * 0.06);
  fill += cut(stripe, { rng, fill: trim, shadow: false, jitter: 0.6 });
  lines += ink(bodyD, { rng, size: 3 });
  lines += ink(`M${x + 2} ${top + h * 0.08}H${x + w - 2}M${x + 2} ${top + h * 0.52}H${x + w - 2}`, { rng, size: 1.8 });
  // windows
  const nWin = 6;
  const winW = (w * 0.72) / nWin;
  for (let i = 0; i < nWin; i++) {
    const wx = x + w * 0.2 + i * winW + 4;
    const wd = roundRectD(wx, top + h * 0.13, winW - 8, h * 0.33, 5);
    fill += cut(wd, { rng, fill: P.sky, shadow: false, jitter: 0.6 });
    lines += ink(wd, { rng, size: 1.8 });
    lines += inkLine([[wx + 5, top + h * 0.2], [wx + 11, top + h * 0.16]], { rng, size: 1.6, color: '#fff' });
  }
  // front door + destination sign
  const door = roundRectD(x + w * 0.05, top + h * 0.13, w * 0.12, h * 0.68, 5);
  fill += cut(door, { rng, fill: P.butterDeep, shadow: false });
  lines += ink(door, { rng, size: 2 });
  lines += ink(`M${x + w * 0.11} ${top + h * 0.16}V${top + h * 0.78}`, { rng, size: 1.4 });
  const signD = roundRectD(x + w * 0.3, top - h * 0.34, w * 0.42, h * 0.2, 4);
  fill += cut(signD, { rng, fill: P.ink, shadow: true });
  lines += `<text x="${x + w * 0.51}" y="${top - h * 0.203}" text-anchor="middle" font-family="Fraunces, Georgia, serif" font-weight="800" font-size="${h * 0.13}" letter-spacing="1.5" fill="${P.butter}">${sign}</text>`;
  // headlamp + bumper
  const lamp = ellipseD(x + w + 1, top + h * 0.7, 6, 6);
  fill += cut(lamp, { rng, fill: P.butter, shadow: false });
  lines += ink(lamp, { rng, size: 1.8 });
  lines += ink(`M${x - 6} ${y - 6}H${x + 10}M${x + w - 10} ${y - 6}H${x + w + 6}`, { rng, size: 3.2 });
  // number roundel
  const rx = x + w * 0.9;
  const ry = top + h * 0.72;
  fill += cut(ellipseD(rx, ry, h * 0.09, h * 0.09), { rng, fill: P.paper, shadow: false });
  lines += `<text x="${rx}" y="${ry + h * 0.045}" text-anchor="middle" font-family="Fraunces, Georgia, serif" font-weight="800" font-size="${h * 0.12}" fill="${P.ink}">9</text>`;
  // rivets
  for (let i = 0; i < 14; i++) lines += `<circle cx="${x + w * 0.2 + i * (w * 0.72 / 13)}" cy="${top + h * 0.7}" r="1.4" fill="var(--ink)" opacity="0.6"/>`;
  // bogies (static frame); wheels are separate
  const wheelR = h * 0.13;
  const wheelY = y + wheelR * 0.2;
  const centers = [x + w * 0.16, x + w * 0.3, x + w * 0.7, x + w * 0.84].map((cx) => [cx, wheelY]);
  for (const bx of [x + w * 0.23, x + w * 0.77]) {
    const bog = roundRectD(bx - w * 0.11, y - 10, w * 0.22, 12, 4);
    fill += cut(bog, { rng, fill: P.ink, shadow: false });
  }
  const wheelSvg = centers.map(([cx, cy], i) => wheel(cx, cy, wheelR, { seed: 300 + i })).join('');
  return { body: fill + g(lines, OFF), wheels: wheelSvg, centers, h, wheelR };
}

export function wheel(cx, cy, r, opts = {}) {
  const rng = makeRng(opts.seed ?? 111);
  let out = cut(ellipseD(cx, cy, r, r), { rng, fill: P.ink, shadow: false, jitter: 0.5 });
  out += cut(ellipseD(cx, cy, r * 0.62, r * 0.62), { rng, fill: P.kraft, shadow: false, jitter: 0.4 });
  let lines = '';
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * Math.PI;
    lines += inkLine([[cx - Math.cos(a) * r * 0.6, cy - Math.sin(a) * r * 0.6], [cx + Math.cos(a) * r * 0.6, cy + Math.sin(a) * r * 0.6]], { rng, size: 1.8, overshoot: 0 });
  }
  lines += `<circle cx="${cx}" cy="${cy}" r="${r * 0.14}" fill="${P.butter}" stroke="var(--ink)" stroke-width="1.4"/>`;
  return out + lines;
}

// ------------------------------------------------------------ people

// Friendly bean-shaped figures: body, round head, stick legs.
export function person(x, y, s = 1, opts = {}) {
  const rng = makeRng(opts.seed ?? 121);
  const { coat = P.civic, skin = '#E9B58E', hair = P.ink, prop, flip = false, hat } = opts;
  const t = flip ? `translate(${x * 2},0) scale(-1,1)` : '';
  const H = 62 * s;
  const bodyD = `M${x - 11 * s} ${y - H * 0.28}Q${x - 13 * s} ${y - H * 0.78} ${x} ${y - H * 0.78}Q${x + 13 * s} ${y - H * 0.78} ${x + 11 * s} ${y - H * 0.28}Z`;
  const headD = ellipseD(x, y - H * 0.9, 9 * s, 10 * s);
  let fill = '';
  let lines = '';
  lines += ink(`M${x - 5 * s} ${y - H * 0.3}L${x - 7 * s} ${y}M${x + 5 * s} ${y - H * 0.3}L${x + 6 * s} ${y}`, { rng, size: 2.6 * s, overshoot: 0 });
  lines += ink(`M${x - 7 * s} ${y}h${-6 * s}M${x + 6 * s} ${y}h${6 * s}`, { rng, size: 3 * s, overshoot: 0 });
  fill += cut(bodyD, { rng, fill: coat });
  fill += cut(headD, { rng, fill: skin, shadow: false });
  const hairD = `M${x - 9.5 * s} ${y - H * 0.9}Q${x - 10 * s} ${y - H * 1.07} ${x} ${y - H * 1.07}Q${x + 10 * s} ${y - H * 1.07} ${x + 9.5 * s} ${y - H * 0.9}Q${x + 3 * s} ${y - H * 0.98} ${x - 9.5 * s} ${y - H * 0.9}Z`;
  fill += cut(hairD, { rng, fill: hair, shadow: false, jitter: 0.4 });
  if (hat === 'hardhat') {
    const hh = `M${x - 12 * s} ${y - H * 0.95}Q${x} ${y - H * 1.2} ${x + 12 * s} ${y - H * 0.95}Z`;
    fill += cut(hh, { rng, fill: P.butter, shadow: false });
    lines += ink(hh, { rng, size: 1.8 * s });
  }
  lines += ink(bodyD, { rng, size: 2.2 * s }) + ink(headD, { rng, size: 2 * s });
  lines += `<circle cx="${x + 3 * s}" cy="${y - H * 0.9}" r="${1.4 * s}" fill="var(--ink)"/><circle cx="${x + 7 * s}" cy="${y - H * 0.9}" r="${1.4 * s}" fill="var(--ink)"/>`;
  lines += inkLine(`M${x + 3 * s} ${y - H * 0.85}q${2 * s} ${2 * s} ${4 * s} 0`, { rng, size: 1.3 * s, overshoot: 0 });
  // arm
  if (prop === 'roll') {
    lines += ink(`M${x + 6 * s} ${y - H * 0.64}L${x + 16 * s} ${y - H * 0.5}`, { rng, size: 2.4 * s });
    const roll = `M${x + 12 * s} ${y - H * 0.58}l${16 * s} ${-12 * s}l${4 * s} ${5 * s}l${-16 * s} ${12 * s}Z`;
    fill += cut(roll, { rng, fill: P.sky, shadow: false });
    lines += ink(roll, { rng, size: 1.6 * s });
  } else if (prop === 'wave') {
    lines += ink(`M${x + 8 * s} ${y - H * 0.66}L${x + 18 * s} ${y - H * 0.98}`, { rng, size: 2.4 * s });
  } else if (prop === 'clipboard') {
    const cb = rectD(x + 8 * s, y - H * 0.64, 13 * s, 17 * s);
    fill += cut(cb, { rng, fill: P.kraft, shadow: false });
    lines += ink(cb, { rng, size: 1.6 * s }) + ink(`M${x + 11 * s} ${y - H * 0.56}h${7 * s}M${x + 11 * s} ${y - H * 0.5}h${7 * s}`, { rng, size: 1.1 * s });
  } else {
    lines += ink(`M${x + 8 * s} ${y - H * 0.64}Q${x + 13 * s} ${y - H * 0.45} ${x + 10 * s} ${y - H * 0.35}`, { rng, size: 2.4 * s });
  }
  return `<g${t ? ` transform="${t}"` : ''}>${fill}${g(lines, OFF)}</g>`;
}

export function bike(x, y, s = 1, opts = {}) {
  const rng = makeRng(opts.seed ?? 131);
  const r = 13 * s;
  let lines = '';
  lines += ink(ellipseD(x, y - r, r, r), { rng, size: 2 * s }) + ink(ellipseD(x + 40 * s, y - r, r, r), { rng, size: 2 * s });
  lines += ink(`M${x} ${y - r}L${x + 14 * s} ${y - r - 20 * s}H${x + 34 * s}L${x + 40 * s} ${y - r}M${x + 14 * s} ${y - r - 20 * s}L${x + 20 * s} ${y - r}L${x + 34 * s} ${y - r - 20 * s}M${x + 20 * s} ${y - r}L${x} ${y - r}`, { rng, size: 2.2 * s, color: opts.color ?? P.tomato });
  lines += ink(`M${x + 12 * s} ${y - r - 25 * s}h${8 * s}M${x + 34 * s} ${y - r - 20 * s}l${-3 * s} ${-8 * s}h${6 * s}`, { rng, size: 2.4 * s });
  return g(lines);
}

// ------------------------------------------------------------ bits

export function tape(x, y, w, h, angle, opts = {}) {
  const rng = makeRng(opts.seed ?? 141);
  const fill = opts.fill ?? 'rgba(244,201,93,0.78)';
  const pts = [];
  const zig = (x0, y0, x1, y1, n) => {
    for (let i = 0; i <= n; i++) {
      const t = i / n;
      pts.push([x0 + (x1 - x0) * t + (i % 2 ? 1.6 : -1.2) * (x0 === x1 ? 1 : 0), y0 + (y1 - y0) * t + (i % 2 ? 1.6 : -1.2) * (y0 === y1 ? 0 : 0)]);
    }
  };
  // Torn short ends, clean long edges.
  zig(x, y, x, y + h, 7);
  pts.push([x + w, y + h]);
  const right = [];
  for (let i = 7; i >= 0; i--) right.push([x + w + (i % 2 ? 1.8 : -1.4), y + (h * i) / 7]);
  pts.push(...right);
  return `<g transform="rotate(${angle} ${x + w / 2} ${y + h / 2})"><path d="${polyD(pts)}" fill="${fill}" filter="url(#paper)"/></g>`;
}

export function star(cx, cy, r, opts = {}) {
  const rng = makeRng(opts.seed ?? 151);
  const pts = [];
  for (let i = 0; i <= 10; i++) {
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    const rr = i % 2 ? r * 0.45 : r;
    pts.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr]);
  }
  let out = opts.fill ? cut(pts, { rng, fill: opts.fill, shadow: false }) : '';
  out += g(ink(polyD(pts), { rng, size: opts.size ?? 2, wobble: 0.6 }), opts.fill ? OFF : '');
  return out;
}

export function sparkle(cx, cy, r, opts = {}) {
  const rng = makeRng(opts.seed ?? 161);
  return ink(`M${cx} ${cy - r}V${cy + r}M${cx - r} ${cy}H${cx + r}M${cx - r * 0.55} ${cy - r * 0.55}L${cx - r * 0.25} ${cy - r * 0.25}M${cx + r * 0.25} ${cy + r * 0.25}L${cx + r * 0.55} ${cy + r * 0.55}`, { rng, size: opts.size ?? 2, color: opts.color });
}

export { hatch, stipple, torn, cut, ink, inkLine };
