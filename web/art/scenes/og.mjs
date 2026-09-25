// Social share card (1200x630): the hero town under the headline.
import hero from './hero.mjs';
import { svgDoc, torn, roundRectD, ellipseD, ink, makeRng, PALETTE as P } from '../lib/draw.mjs';
import { sun, cloud } from '../lib/props.mjs';

const inner = (s) => s.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '').replace(/<defs>[\s\S]*?<\/defs>/, '');

export default function () {
  const a = hero();
  const m = a.meta;
  const pick = (n) => inner(a.find((x) => x.name === n).svg);
  const W = 1200;
  const H = 630;
  const s = W / m.W * 1.18;
  const townY = H - m.H * s + 50;
  const tx = 260;
  const ty = m.RAIL_Y - m.railFromTop;
  let town = pick('hero-back') + pick('hero-town') + pick('hero-poles') + pick('hero-track');
  town += `<g transform="translate(${tx - m.pad},${ty})">${pick('hero-tram')}</g>`;
  town += pick('hero-crowd') + pick('hero-front');
  const rng = makeRng(4);
  let b = `<rect width="${W}" height="${H}" fill="${P.cream}"/>`;
  b += sun(1085, 105, 46, { seed: 3 });
  b += cloud(640, 70, 190, 60, { seed: 4 });
  b += `<g transform="translate(${(W - m.W * s) / 2 - 40},${townY}) scale(${s})">${town}</g>`;
  // logo tile
  b += torn(roundRectD(64, 58, 64, 64, 14), { rng, fill: P.civic, amp: 1.2, rim: 2 });
  b += torn(ellipseD(96, 76, 8, 8), { rng, fill: P.butter, amp: 0.6, rim: 0, shadow: false });
  b += ink('M80 116L92 84M112 116L100 84M74 108H118M79 97H113', { rng, size: 4, color: P.paper, taper: false });
  b += `<text x="146" y="102" font-family="Fraunces" font-weight="800" font-size="34" fill="${P.ink}">All Aboard <tspan font-family="Caveat" font-weight="700" font-size="42" fill="${P.tomatoDeep}">Planning</tspan></text>`;
  b += `<rect x="378" y="228" width="232" height="26" fill="${P.butter}" opacity="0.85" transform="rotate(-1 494 241)"/>`;
  b += `<text x="64" y="180" font-family="Fraunces" font-weight="800" font-size="62" letter-spacing="-1.5" fill="${P.ink}">Practice until the real</text>`;
  b += `<text x="64" y="250" font-family="Fraunces" font-weight="800" font-size="62" letter-spacing="-1.5" fill="${P.ink}">thing feels <tspan font-style="italic" font-weight="700">familiar.</tspan></text>`;
  b += `<text x="66" y="304" font-family="Caveat" font-weight="700" font-size="34" fill="${P.tomatoDeep}">free AICP exam practice, every answer explained</text>`;
  return [{ name: 'og-image', w: W, h: H, svg: svgDoc(W, H, b), scale: 1, png: true, quality: 0.9 }];
}
