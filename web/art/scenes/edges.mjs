// UI trimmings as small vector files: torn paper edges for section
// borders, a scribbled underline, a hand-drawn arrow and a circle scribble.
// These are used as CSS masks, so they're drawn in plain black.
import { inkLine, ink, makeRng, polyD } from '../lib/draw.mjs';

const svg = (w, h, body, extra = '') => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none"${extra}>${body}</svg>`;

// A torn top edge: solid below a ragged line, rough at several scales.
function tornEdge(seed, w = 1600, h = 28) {
  const rng = makeRng(seed);
  const pts = [[0, h]];
  let y = h * 0.5;
  for (let x = 0; x <= w; x += 4) {
    y += rng.range(-2.4, 2.4);
    y = Math.min(h * 0.85, Math.max(h * 0.15, y * 0.94 + h * 0.5 * 0.06));
    pts.push([x, y + Math.sin(x / 90 + seed) * 3 + rng.range(-1.2, 1.2)]);
  }
  pts.push([w, h]);
  return svg(w, h, `<path d="${polyD(pts)}" fill="#000"/>`);
}

export default function () {
  const rng = makeRng(3);
  const dest = 'src/assets/textures';
  const underline = svg(200, 16, inkLine('M3 10Q40 3 80 8T150 7T197 6', { rng, size: 5, wobble: 0.6, color: '#000' }));
  const arrow = svg(120, 90, ink('M8 14C40 4 88 18 96 70M78 56L96 74L106 50', { rng, size: 4.4, color: '#000' }), '');
  const circle = svg(220, 90, inkLine('M160 12C100 0 20 8 12 40C4 76 120 88 190 70C230 58 214 20 150 14C120 11 90 12 70 16', { rng, size: 4.4, wobble: 1.2, color: '#000' }));
  const check = svg(40, 40, inkLine('M6 22L16 32L36 6', { rng, size: 5.6, color: '#000' }));
  return [
    { name: 'edge-torn-a', svg: tornEdge(11), keepSvg: true, dest, w: 1600, h: 28 },
    { name: 'edge-torn-b', svg: tornEdge(29), keepSvg: true, dest, w: 1600, h: 28 },
    { name: 'scribble-underline', svg: underline, keepSvg: true, dest, w: 200, h: 16 },
    { name: 'scribble-arrow', svg: arrow, keepSvg: true, dest, w: 120, h: 90 },
    { name: 'scribble-circle', svg: circle, keepSvg: true, dest, w: 220, h: 90 },
    { name: 'scribble-check', svg: check, keepSvg: true, dest, w: 40, h: 40 }
  ];
}
