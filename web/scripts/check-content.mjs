// Content and link checker: `npm run check` (from web/).
//
// Fails (exit 1) if any of these are wrong:
//  - every curriculum lesson has a Markdown body, and every body has a lesson;
//  - every lesson body has the required sections, in order;
//  - every practice ref (the exam items a lesson teaches, used to point
//    missed exam questions back to lessons) is real, with no duplicates;
//  - lesson checkpoints are original cp: questions, never exam items;
//  - every study plan covers every lesson exactly once, with valid links;
//  - every internal link in lessons, content pages, study plans, and
//    navigation points to a real route, lesson, and (if given) anchor;
//  - every <!-- VERIFY: ... --> flag in content has a reason;
//  - every :::video slot has a title and length (and an https URL if any);
//  - every :::figure names a rendered figure (public/art/<name>.webp, sized in
//    src/data/artMeta.json) and has alt text;
//  - no figure's baked-in text is smaller than 13px on screen;
//  - every :::try practice piece exists, is used once, sits between Key
//    concepts and Summary, and is well formed: sorts have reasons for every
//    card, calculators reproduce the lesson's worked example (`expect`), their
//    "Your turn" problems compute, and sketch text is at least 13px on a phone.
//
// Needs no dependencies beyond the site's own (marked, via markdown.mjs).
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderMarkdown, extractKeyTerms } from './markdown.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = join(root, 'src');
const imp = (p) => import(join(src, p));

const [{ DOMAINS, LESSONS }, { STUDY_PLANS }, nav, domainsData, b1, b2, b3] = await Promise.all([
  imp('content/aicp/curriculum.js'),
  imp('content/aicp/studyPlans.js'),
  imp('lib/nav.js'),
  imp('data/domains.js'),
  imp('data/exam1-questions.js'),
  imp('data/exam2-questions.js'),
  imp('data/exam3-questions.js'),
]);
const { CHECKPOINTS } = await imp('content/aicp/checkpoints.js');

const errors = [];
const warnings = [];
const err = (m) => errors.push(m);
const warn = (m) => warnings.push(m);

// Routes that exist in App.jsx. Keep in sync when adding a route.
const KNOWN_ROUTES = new Set([
  '/', '/about', '/contact',
  '/aicp', '/aicp/course', '/aicp/study-plan', '/aicp/exam-info', '/aicp/faq', '/aicp/pricing',
  '/aicp/exams', '/aicp/progress', '/aicp/signin', '/aicp/exam/run',
  '/aicp/review', '/aicp/review/flashcards', '/aicp/review/quick-reference', '/aicp/review/exam-strategy',
]);
const REQUIRED_SECTIONS = ['learning-objectives', 'key-concepts', 'key-terms', 'real-world-examples', 'summary'];

// ---------------------------------------------------------------- lessons
const lessonDir = join(src, 'content/aicp/lessons');
const mdFiles = readdirSync(lessonDir).filter((f) => f.endsWith('.md'));
const slugs = new Set(LESSONS.map((l) => l.slug));
if (slugs.size !== LESSONS.length) err('Duplicate lesson slugs in curriculum.js');

const rendered = new Map(); // slug -> { headings, links, html }
let totalCards = 0;
let totalCheckpoints = 0;
const usedCp = new Set();
for (const l of LESSONS) {
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(l.slug)) err(`Lesson slug "${l.slug}" is not kebab-case`);
  for (const f of ['title', 'description', 'minutes', 'access']) if (!l[f]) err(`Lesson ${l.slug}: missing ${f}`);
  if (!['free', 'paid'].includes(l.access)) err(`Lesson ${l.slug}: access must be 'free' or 'paid'`);
  if (!mdFiles.includes(`${l.slug}.md`)) { err(`Lesson ${l.slug}: no file lessons/${l.slug}.md`); continue; }
  const md = readFileSync(join(lessonDir, `${l.slug}.md`), 'utf8');
  const r = renderMarkdown(md);
  rendered.set(l.slug, r);
  if (/^#\s/m.test(md)) err(`Lesson ${l.slug}: don't use a level-1 heading (the template renders the title)`);
  const ids = r.headings.map((h) => h.id);
  let pos = -1;
  for (const req of REQUIRED_SECTIONS) {
    const i = ids.indexOf(req);
    if (i < 0) err(`Lesson ${l.slug}: missing "## ${req.replace(/-/g, ' ')}" section`);
    else if (i < pos) err(`Lesson ${l.slug}: section "${req}" is out of order`);
    else pos = i;
  }
  if (ids[0] !== 'learning-objectives') err(`Lesson ${l.slug}: the first section must be Learning objectives`);
  if (ids[ids.length - 1] !== 'summary') err(`Lesson ${l.slug}: the last section must be Summary`);
  if (!ids.includes('exam-tips') || ids.indexOf('exam-tips') < ids.indexOf('key-concepts')) err(`Lesson ${l.slug}: needs an "## Exam tips" section after Key concepts`);
  // Flashcards come from Key terms bullets; every bullet must parse.
  const termSection = (md.match(/^## Key terms[ \t]*\n([\s\S]*?)(?=^## )/m) || [, ''])[1];
  const bullets = termSection.split('\n').filter((x) => x.startsWith('- ')).length;
  const cards = extractKeyTerms(md, l.slug);
  if (cards.length !== bullets) err(`Lesson ${l.slug}: ${bullets - cards.length} Key terms bullet(s) aren't in "- **Term**: definition" form`);
  if (cards.length < 6) warn(`Lesson ${l.slug}: only ${cards.length} key terms (flashcards)`);
  totalCards += cards.length;
  // Checkpoints: original questions only (never exam items, so reading a
  // lesson never gives away an exam question), no repeats, at least three.
  const cpRefs = r.checkpoints.flat();
  if (cpRefs.length < 3) err(`Lesson ${l.slug}: only ${r.checkpoints.length} checkpoints (need at least 3)`);
  if (new Set(cpRefs).size !== cpRefs.length) err(`Lesson ${l.slug}: a checkpoint question is used twice`);
  for (const ref of cpRefs) {
    if (!ref.startsWith('cp:')) { err(`Lesson ${l.slug}: checkpoint ${ref} is an exam item; write an original cp: question instead`); continue; }
    if (!CHECKPOINTS[ref]) err(`Lesson ${l.slug}: checkpoint ${ref} isn't defined in checkpoints.js`);
    usedCp.add(ref);
  }
  totalCheckpoints += r.checkpoints.length;
  for (const v of r.videos) {
    if (!v.title || !v.length) err(`Lesson ${l.slug}: a :::video block needs "Title | length"`);
    if (v.url && !/^https:\/\//.test(v.url)) err(`Lesson ${l.slug}: video URL must be https (${v.url})`);
  }
  if (/^:::video/m.test(md) && !r.videos.length) err(`Lesson ${l.slug}: malformed :::video block`);
  for (const f of r.figures) {
    if (!f.size || !existsSync(join(root, 'public', 'art', `${f.name}.webp`))) err(`Lesson ${l.slug}: figure ${f.name} isn't rendered (run npm run art -- ${f.name})`);
    if (f.size?.narrow && !existsSync(join(root, 'public', 'art', `${f.name}-narrow.webp`))) err(`Lesson ${l.slug}: figure ${f.name}'s phone layout isn't rendered (run npm run art -- ${f.name})`);
    if (f.alt.length < 40) err(`Lesson ${l.slug}: figure ${f.name} needs alt text that says what the figure shows`);
  }
  if ((md.match(/^:::figure/gm) || []).length !== r.figures.length) err(`Lesson ${l.slug}: malformed :::figure block (":::figure name | alt text", caption, ":::")`);
  const words = md.replace(/<!--[\s\S]*?-->/g, '').split(/\s+/).length;
  if (words < 700) warn(`Lesson ${l.slug}: only ${words} words`);
}
for (const f of mdFiles) if (!slugs.has(f.replace(/\.md$/, ''))) err(`lessons/${f} has no entry in curriculum.js`);

// Each domain has a free first lesson (the course's stated preview model).
for (const d of DOMAINS) {
  if (!d.lessons.length) err(`Domain ${d.id} has no lessons`);
  else if (d.lessons[0].access !== 'free') warn(`Domain ${d.id}: first lesson isn't free`);
}
const weightSum = DOMAINS.reduce((s, d) => s + d.weight, 0);
if (weightSum !== 100) err(`Domain weights sum to ${weightSum}, not 100`);
const bankNames = new Set(domainsData.DOMAINS.map((d) => d.name));
for (const d of DOMAINS) if (!bankNames.has(d.bankName)) err(`Domain ${d.id}: bankName "${d.bankName}" isn't a question-bank domain`);

// ---------------------------------------------------------- practice refs
const BANKS = { e1: b1.BANK, e2: b2.BANK, e3: b3.BANK };
for (const l of LESSONS) {
  const seen = new Set();
  for (const ref of l.practice || []) {
    if (seen.has(ref)) err(`Lesson ${l.slug}: duplicate practice ref ${ref}`);
    seen.add(ref);
    const [b, n] = ref.split(':');
    if (!BANKS[b] || !BANKS[b].some((q) => q.n === Number(n))) err(`Lesson ${l.slug}: practice ref ${ref} doesn't exist`);
  }
  if (!(l.practice || []).length) warn(`Lesson ${l.slug}: no exam items mapped to it`);
}

// Original checkpoint questions: well-formed, and each used somewhere.
for (const [id, q] of Object.entries(CHECKPOINTS)) {
  if (!q.text || !Array.isArray(q.options) || q.options.length !== 4 || !(q.correct >= 0 && q.correct < 4) || !q.explanation) err(`checkpoints.js: ${id} is malformed (needs text, 4 options, correct 0-3, explanation)`);
  if (!usedCp.has(id)) warn(`checkpoints.js: ${id} isn't used in any lesson`);
}

// Per-option notes ("why the other answers are wrong"): optional while they're
// being written. When present: four entries, the correct one empty (the
// explanation covers it), every wrong one a real sentence.
let notedQs = 0;
let allQs = 0;
const checkNotes = (where, q) => {
  allQs++;
  if (q.optionNotes === undefined) return;
  notedQs++;
  const n = q.optionNotes;
  if (!Array.isArray(n) || n.length !== q.options.length) return err(`${where}: optionNotes must have one entry per option`);
  n.forEach((note, i) => {
    if (i === q.correct && note) err(`${where}: optionNotes for the correct option should be empty (the explanation covers it)`);
    if (i !== q.correct && !(typeof note === 'string' && note.trim().length >= 20)) err(`${where}: optionNotes[${i}] is missing or too short`);
  });
};
for (const [id, q] of Object.entries(CHECKPOINTS)) checkNotes(`checkpoints.js: ${id}`, q);
for (const [b, bank] of Object.entries(BANKS)) for (const q of bank) checkNotes(`exam bank ${b}: item ${q.n}`, q);

// ------------------------------------------------------------ study plans
for (const plan of STUDY_PLANS) {
  const listed = plan.weeks.flatMap((w) => w.lessons);
  for (const s of listed) if (!slugs.has(s)) err(`Study plan ${plan.id}: unknown lesson "${s}"`);
  const counts = listed.reduce((m, s) => m.set(s, (m.get(s) || 0) + 1), new Map());
  for (const [s, c] of counts) if (c > 1) err(`Study plan ${plan.id}: lesson "${s}" appears ${c} times`);
  for (const s of slugs) if (!counts.has(s)) err(`Study plan ${plan.id}: lesson "${s}" is never scheduled`);
}

// ------------------------------------------------------------ link checks
const anchorsFor = (path) => {
  if (path === '/aicp/course') return new Set(DOMAINS.map((d) => d.id));
  if (path === '/aicp/study-plan') return new Set(STUDY_PLANS.map((p) => p.id));
  const m = path.match(/^\/aicp\/lessons\/(.+)$/);
  if (m && rendered.has(m[1])) return new Set([...rendered.get(m[1]).headings.map((h) => h.id), 'practice-heading']);
  return null; // anchors on other pages aren't tracked
};
const validAids = new Set(domainsData.ASSESSMENTS.map((a) => a.id));

function checkLink(href, where) {
  if (!href.startsWith('/')) return; // external, mailto, or in-page (#...) links
  const [pathAndQuery, hash] = href.split('#');
  const [path, query] = pathAndQuery.split('?');
  const lesson = path.match(/^\/aicp\/lessons\/([^/]+)$/);
  if (lesson) {
    if (!slugs.has(lesson[1])) { err(`${where}: link to unknown lesson ${href}`); return; }
  } else if (!KNOWN_ROUTES.has(path)) {
    err(`${where}: link to unknown route ${href}`);
    return;
  }
  if (path === '/aicp/exam/run') {
    const q = new URLSearchParams(query || '');
    if (q.get('aid') && !validAids.has(q.get('aid'))) err(`${where}: unknown exam id in ${href}`);
    if (q.get('drill')) err(`${where}: domain drills were retired; link to the domain's lessons instead: ${href}`);
    if (q.get('set')) err(`${where}: lesson practice sets were retired; link to the lesson or the exams instead: ${href}`);
    if (!q.get('aid')) err(`${where}: exam runner link without aid: ${href}`);
  }
  if (hash) {
    const anchors = anchorsFor(path);
    if (anchors && !anchors.has(hash)) err(`${where}: anchor #${hash} doesn't exist on ${path}`);
  }
}

for (const [slug, r] of rendered) {
  r.links.forEach((h) => checkLink(h, `lessons/${slug}.md`));
  for (const h of r.links) if (h.startsWith('#') && !r.headings.some((x) => x.id === h.slice(1))) {
    // In-page anchors may target any heading level; recompute from the HTML.
    if (!r.html.includes(`id="${h.slice(1)}"`)) err(`lessons/${slug}.md: in-page anchor ${h} not found`);
  }
}
const pageDir = join(src, 'content/pages');
for (const f of readdirSync(pageDir).filter((x) => x.endsWith('.md'))) {
  renderMarkdown(readFileSync(join(pageDir, f), 'utf8')).links.forEach((h) => checkLink(h, `pages/${f}`));
}
for (const plan of STUDY_PLANS) for (const w of plan.weeks) for (const p of w.practice) checkLink(p.to, `studyPlans.js (${plan.id})`);
for (const item of nav.AICP_NAV) checkLink(item.to, 'nav.js AICP_NAV');
for (const g of nav.FOOTER_NAV) for (const l of g.links) checkLink(l.to, 'nav.js FOOTER_NAV');

// ------------------------------------------------------------ VERIFY flags
const walk = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)]));
let verifyCount = 0;
for (const file of walk(src).filter((f) => /\.(md|jsx?|html)$/.test(f))) {
  const text = readFileSync(file, 'utf8');
  for (const m of text.matchAll(/VERIFY:(.*)/g)) {
    verifyCount++;
    if (m[1].replace(/-->|\*\/|\}/g, '').trim().length < 10) err(`${file.slice(root.length + 1)}: VERIFY flag without a reason`);
  }
}

// ------------------------------------------------------------------ figure legibility
// Baked-in text must be at least 13px where it's shown. The wide layout is
// about 340px wide on a phone, or at least 500px when a figure also has a
// stacked phone layout (which is itself shown about 340px wide).
{
  const { buildFigures } = await import(join(root, 'art', 'scenes', 'figures.mjs'));
  const MIN_PX = 13;
  // Handwriting has shorter letters than Figtree or Fraunces at the same font
  // size: Caveat counts as 0.8 of its size, Patrick Hand (the figure notes) 0.94.
  const smallest = (svg) => Math.min(...[...svg.matchAll(/<text[^>]*font-family="([^"]+)"[^>]*font-size="([\d.]+)"/g)]
    .map((m) => Number(m[2]) * (/Caveat/.test(m[1]) ? 0.8 : /Patrick Hand/.test(m[1]) ? 0.94 : 1)));
  for (const f of buildFigures()) {
    const views = f.narrow ? [['wide', f.w, 500, f.svg], ['phone', f.narrow.w, 340, f.narrow.svg]] : [['wide', f.w, 340, f.svg]];
    for (const [which, w, shown, svg] of views) {
      const px = (smallest(svg) * shown) / w;
      if (px < MIN_PX) err(`Figure ${f.name} (${which} layout): smallest text is ${px.toFixed(1)}px on screen; make it at least ${Math.ceil((MIN_PX * w) / shown)} in the drawing (${Math.ceil((MIN_PX * w) / shown / 0.8)} for handwriting), or add a narrow layout`);
    }
  }
}

// ------------------------------------------------------------------ practice pieces
{
  const { kindOf } = await imp('content/aicp/interactives/index.js');
  const { SORTS } = await imp('content/aicp/interactives/sorts.js');
  const { CALCULATORS } = await imp('content/aicp/interactives/calculators.js');
  const DEFS = { sort: SORTS, calc: CALCULATORS };
  for (const [kind, defs] of Object.entries(DEFS)) {
    for (const id of Object.keys(defs)) if (kindOf(id) !== kind) err(`interactives: "${id}" is defined as a ${kind} but its prefix makes it a ${kindOf(id)}`);
  }
  const usedTry = new Map();
  for (const [slug, r] of rendered) {
    if (r.tries.length > 3) err(`Lesson ${slug}: ${r.tries.length} practice pieces (keep it to 3 or fewer)`);
    const md = readFileSync(join(lessonDir, `${slug}.md`), 'utf8');
    const start = md.indexOf('## Key concepts');
    const end = md.indexOf('## Summary');
    for (const id of r.tries) {
      const def = DEFS[kindOf(id)][id];
      if (!def) err(`Lesson ${slug}: :::try ${id} isn't defined in content/aicp/interactives/`);
      if (usedTry.has(id)) err(`Lesson ${slug}: :::try ${id} is already used in ${usedTry.get(id)}`);
      usedTry.set(id, slug);
      const at = md.indexOf(`:::try ${id}`);
      if (at < start || at > end) err(`Lesson ${slug}: :::try ${id} must sit between Key concepts and Summary`);
    }
    if ((md.match(/^:::try/gm) || []).length !== r.tries.length) err(`Lesson ${slug}: malformed :::try line (":::try id")`);
  }
  for (const [kind, defs] of Object.entries(DEFS)) for (const id of Object.keys(defs)) if (!usedTry.has(id)) warn(`interactives: ${kind} ${id} isn't placed in any lesson`);

  for (const [id, d] of Object.entries(SORTS)) {
    const where = `sorts.js: ${id}`;
    if (!d.title || !d.intro) err(`${where}: needs a title and an intro`);
    const piles = new Set((d.piles || []).map((p) => p.id));
    if (piles.size < 2 || piles.size > 5 || piles.size !== d.piles.length) err(`${where}: needs 2 to 5 piles with unique ids`);
    if (!d.cards || d.cards.length < 6) err(`${where}: needs at least 6 cards`);
    for (const [i, c] of (d.cards || []).entries()) {
      if (!piles.has(c.pile)) err(`${where}: card ${i + 1} names an unknown pile "${c.pile}"`);
      if (!c.text || !(typeof c.why === 'string' && c.why.trim().length >= 20)) err(`${where}: card ${i + 1} needs text and a reason ("why")`);
    }
    for (const p of piles) if (!d.cards.some((c) => c.pile === p)) err(`${where}: no card belongs in pile "${p}"`);
  }

  // Sketch text: a sketch is 400 wide and drawn about 288px wide on a phone.
  const SHOWN = 288;
  const sketchPx = (sk) => Math.min(...[...sk.svg.matchAll(/<text[^>]*font-family="([^"]+)"[^>]*font-size="([\d.]+)"/g)]
    .map((m) => Number(m[2]) * (/Caveat/.test(m[1]) ? 0.8 : 1))) * SHOWN / sk.w;
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  for (const [id, d] of Object.entries(CALCULATORS)) {
    const where = `calculators.js: ${id}`;
    if (!d.title || !d.intro || !Array.isArray(d.inputs) || !d.inputs.length) { err(`${where}: needs a title, intro, and inputs`); continue; }
    for (const i of d.inputs) {
      if (!i.id || !i.label || !Number.isFinite(i.value)) err(`${where}: input ${i.id || '?'} needs an id, label, and numeric value`);
      if (i.slider && !(Number.isFinite(i.min) && Number.isFinite(i.max) && i.value >= i.min && i.value <= i.max)) err(`${where}: slider ${i.id} needs min and max around its value`);
    }
    const v = Object.fromEntries(d.inputs.map((i) => [i.id, i.value]));
    const out = d.compute(v);
    if (!out) { err(`${where}: the default inputs don't compute`); continue; }
    if (!d.expect || !Object.keys(d.expect).length) err(`${where}: needs \`expect\`, the lesson's worked answer`);
    for (const [label, want] of Object.entries(d.expect || {})) {
      const got = out.results.find((x) => x.label === label);
      if (!got || !got.value.includes(want)) err(`${where}: expected "${label}" to show ${want}, got ${got ? got.value : 'nothing'}`);
    }
    const sketches = [];
    if (d.draw) {
      if (typeof d.describe !== 'function') err(`${where}: a sketch needs describe() for screen readers`);
      sketches.push(d.draw(v, out));
    }
    for (const make of d.problems || []) {
      for (let k = 0; k < 25; k++) {
        const p = make(pick);
        const o = d.compute(p.values);
        if (!p.text || !Number.isFinite(p.answer) || !Number.isInteger(p.dp) || !o) { err(`${where}: a "Your turn" problem doesn't compute (${p.text})`); break; }
        if (d.draw && k < 3) sketches.push(d.draw(p.values, o));
      }
    }
    for (const sk of sketches) {
      const px = sketchPx(sk);
      if (px < 13) { err(`${where}: sketch text is ${px.toFixed(1)}px on a phone; use at least 19 (24 handwritten)`); break; }
    }
  }
  console.log(`Practice pieces: ${usedTry.size} placed (${Object.keys(SORTS).length} sorts, ${Object.keys(CALCULATORS).length} calculators defined).`);
}

// ------------------------------------------------------------------ report
const totalRefs = LESSONS.reduce((s, l) => s + (l.practice || []).length, 0);
const videos = [...rendered.values()].flatMap((r) => r.videos);
const placeholders = videos.filter((v) => !v.url).length;
const figureCount = [...rendered.values()].reduce((n, r) => n + r.figures.length, 0);
console.log(`Checked ${LESSONS.length} lessons in ${DOMAINS.length} domains, ${totalRefs} exam items mapped to lessons, ${STUDY_PLANS.length} study plans, ${verifyCount} VERIFY flags, ${videos.length} video slots (${placeholders} still placeholders), ${figureCount} figures, ${totalCards} flashcards, ${totalCheckpoints} checkpoints, ${notedQs} of ${allQs} questions with per-option notes.`);
warnings.forEach((w) => console.log(`  warning: ${w}`));
if (errors.length) {
  errors.forEach((e) => console.error(`  ERROR: ${e}`));
  console.error(`${errors.length} error(s).`);
  process.exit(1);
}
console.log('All content checks passed.');
