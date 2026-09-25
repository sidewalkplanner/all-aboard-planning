// Renders the collage scenes in art/scenes/ to transparent WebP files in
// public/art/. Chromium does the rasterizing so SVG filters (paper grain,
// contact shadows) bake in exactly as designed and cost nothing at runtime.
//
//   node art/render.mjs            render everything
//   node art/render.mjs hero logo  render only scenes whose name matches
//
// Needs a Chromium binary: set CHROMIUM_PATH, or it falls back to the
// Playwright browser cache location.
import { chromium } from 'playwright-core';
import { mkdirSync, readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const outDir = join(here, '..', 'public', 'art');
const svgDir = join(here, 'out');
mkdirSync(outDir, { recursive: true });
mkdirSync(svgDir, { recursive: true });

const filters = process.argv.slice(2);
const executablePath = process.env.CHROMIUM_PATH
  ?? ['/opt/pw-browsers/chromium-1194/chrome-linux/chrome'].find((p) => existsSync(p));

const sceneFiles = readdirSync(join(here, 'scenes')).filter((f) => f.endsWith('.mjs'));
const assets = [];
const meta = {};
for (const f of sceneFiles) {
  const mod = await import(pathToFileURL(join(here, 'scenes', f)));
  const list = mod.default();
  if (list.meta) meta[f.replace('.mjs', '')] = list.meta;
  for (const a of list) assets.push(a);
}
// Layout numbers (rail height, station positions...) the React side needs
// to line live elements up with the baked artwork.
const round = (k, v) => (typeof v === 'number' ? Math.round(v * 100) / 100 : v);
writeFileSync(join(here, '..', 'src', 'data', 'artMeta.json'), JSON.stringify(meta, round, 2) + '\n');
const todo = assets.filter((a) => !filters.length || filters.some((k) => a.name.includes(k)));

// Baked-in lettering uses the site's own fonts, embedded so the blank
// render page doesn't need file access.
const font = (pkg, file) => readFileSync(join(here, '..', 'node_modules', pkg, 'files', file)).toString('base64');
const fontCss = `
@font-face{font-family:Fraunces;font-weight:100 900;font-style:normal;src:url(data:font/woff2;base64,${font('@fontsource-variable/fraunces', 'fraunces-latin-full-normal.woff2')}) format('woff2')}
@font-face{font-family:Fraunces;font-weight:100 900;font-style:italic;src:url(data:font/woff2;base64,${font('@fontsource-variable/fraunces', 'fraunces-latin-full-italic.woff2')}) format('woff2')}
@font-face{font-family:Caveat;font-weight:400;src:url(data:font/woff2;base64,${font('@fontsource/caveat', 'caveat-latin-400-normal.woff2')}) format('woff2')}
@font-face{font-family:Caveat;font-weight:700;src:url(data:font/woff2;base64,${font('@fontsource/caveat', 'caveat-latin-700-normal.woff2')}) format('woff2')}
`;

const browser = await chromium.launch({ executablePath });
const page = await browser.newPage({ deviceScaleFactor: 1 });

for (const a of todo) {
  const scale = a.scale ?? 2;
  writeFileSync(join(svgDir, `${a.name}.svg`), a.svg);
  if (a.keepSvg) {
    const dest = a.dest ? join(here, '..', a.dest) : outDir;
    writeFileSync(join(dest, `${a.name}.svg`), a.svg);
    if (!a.alsoRaster) { console.log(`svg   ${a.name}`); continue; }
  }
  await page.setViewportSize({ width: Math.ceil(a.w * scale), height: Math.ceil(a.h * scale) });
  await page.setContent(`<!doctype html><html><head><style>${fontCss}html,body{margin:0;background:transparent}svg{display:block;width:${a.w * scale}px;height:${a.h * scale}px}</style></head><body>${a.svg}</body></html>`);
  await page.evaluate(async () => { await Promise.all(['800 20px Fraunces', 'italic 700 20px Fraunces', '400 20px Caveat', '700 20px Caveat'].map((f) => document.fonts.load(f))); await document.fonts.ready; });
  const png = await page.locator('svg').screenshot({ omitBackground: true, type: 'png' });
  const quality = a.quality ?? 0.9;
  const webp = await page.evaluate(async ({ b64, q }) => {
    const img = new Image();
    img.src = 'data:image/png;base64,' + b64;
    await img.decode();
    const c = document.createElement('canvas');
    c.width = img.naturalWidth;
    c.height = img.naturalHeight;
    c.getContext('2d').drawImage(img, 0, 0);
    return c.toDataURL('image/webp', q).split(',')[1];
  }, { b64: png.toString('base64'), q: quality });
  const buf = Buffer.from(webp, 'base64');
  writeFileSync(join(outDir, `${a.name}.webp`), buf);
  if (a.png) writeFileSync(join(outDir, `${a.name}.png`), png);
  // `jpg: '#RRGGBB'`: also save a JPEG flattened onto that background color,
  // for email, where WebP isn't supported everywhere and PNGs are heavy.
  if (a.jpg) {
    const jpg = await page.evaluate(async ({ b64, bg }) => {
      const img = new Image();
      img.src = 'data:image/png;base64,' + b64;
      await img.decode();
      const c = document.createElement('canvas');
      c.width = img.naturalWidth;
      c.height = img.naturalHeight;
      const ctx = c.getContext('2d');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, c.width, c.height);
      ctx.drawImage(img, 0, 0);
      return c.toDataURL('image/jpeg', 0.84).split(',')[1];
    }, { b64: png.toString('base64'), bg: a.jpg });
    const jbuf = Buffer.from(jpg, 'base64');
    writeFileSync(join(outDir, `${a.name}.jpg`), jbuf);
    console.log(`${(jbuf.length / 1024).toFixed(0).padStart(5)}KB  ${a.name}.jpg`);
  }
  console.log(`${(buf.length / 1024).toFixed(0).padStart(5)}KB  ${a.name}  ${a.w}x${a.h}@${scale}x`);
}

await browser.close();
