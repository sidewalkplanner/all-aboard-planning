// Illustrations for the account emails (supabase/templates/). Email apps
// can't all show WebP, so these render as JPEG flattened onto the email card's
// color (the `jpg` option), and the templates load them from
// https://allaboardplanning.com/art/email-*.jpg.
import { svgDoc, cut, ink, roundRectD, makeRng, PALETTE as P } from '../lib/draw.mjs';
import { tape, sparkle, star } from '../lib/props.mjs';
import { ticketD, hand, serif } from './spots.mjs';

const OFF = 'translate(-1.5,-1.1)';
const L = (s) => `<g transform="${OFF}">${s}</g>`;

// A train ticket: stub with a number, perforation, title, and a note.
function ticket(x, y, w, h, rng, { fill, num, title, note, pattern }) {
  const stub = w * 0.26;
  const d = ticketD(x, y, w, h, stub, 11);
  let b = cut(d, { rng, fill, pattern, patternOpacity: 0.08 });
  for (let yy = y + 16; yy < y + h - 12; yy += 10) b += `<circle cx="${x + stub}" cy="${yy}" r="1.8" fill="${P.ink}" opacity="0.55"/>`;
  b += L(ink(d, { rng, size: 2.6 }));
  b += serif(x + stub / 2, y + h / 2 + 10, num, { size: 30 });
  b += serif(x + stub + (w - stub) / 2, y + h * 0.46, title, { size: h * 0.2, spacing: 2 });
  b += hand(x + stub + (w - stub) / 2, y + h * 0.78, note, { size: h * 0.21 });
  return b;
}

// A rubber stamp, slightly crooked, in tomato ink.
function stamp(cx, cy, text, rng, rot = -12) {
  const w = text.length * 17 + 30;
  const d = roundRectD(cx - w / 2, cy - 24, w, 48, 8);
  const inner = roundRectD(cx - w / 2 + 6, cy - 18, w - 12, 36, 5);
  const l = ink(d, { rng, size: 3, color: P.tomatoDeep }) + ink(inner, { rng, size: 1.4, color: P.tomatoDeep, opacity: 0.8 });
  return `<g transform="rotate(${rot} ${cx} ${cy})" opacity="0.92">${l}${serif(cx, cy + 9, text, { size: 24, spacing: 3, color: P.tomatoDeep })}</g>`;
}

// Confirm your email: a ticket waiting to be punched.
function confirmTicket() {
  const rng = makeRng(901);
  let b = '';
  b += `<g transform="rotate(-4 230 110)">${ticket(40, 40, 380, 150, rng, { fill: P.butter, num: 'AICP', title: 'ADMIT ONE', note: 'confirm to board', pattern: 'pinstripe' })}</g>`;
  b += tape(330, 18, 110, 30, 18, { seed: 7, fill: 'rgba(159,211,199,0.85)' });
  b += sparkle(22, 40, 11, { seed: 2 });
  b += sparkle(440, 190, 9, { seed: 3 });
  b += star(28, 176, 10, { fill: P.tomato, seed: 5 });
  return { W: 460, H: 220, b };
}

// Reset your password: a replacement ticket, stamped.
function reissuedTicket() {
  const rng = makeRng(911);
  let b = '';
  b += `<g transform="rotate(3 230 110)">${ticket(40, 40, 380, 150, rng, { fill: P.sky, num: 'AICP', title: 'NEW TICKET', note: '' })}</g>`;
  b += stamp(300, 158, 'REISSUED', rng, -8);
  b += tape(16, 22, 110, 30, -20, { seed: 8 });
  b += sparkle(440, 36, 11, { seed: 4 });
  return { W: 460, H: 220, b };
}

export default function () {
  return [
    ['email-ticket', confirmTicket()],
    ['email-reissued', reissuedTicket()],
  ].map(([name, { W, H, b }]) => ({ name, w: W, h: H, svg: svgDoc(W, H, b), scale: 1.4, quality: 0.86, jpg: '#FFFDF8' }));
}
