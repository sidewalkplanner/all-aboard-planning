// Content and link checker: `npm run check` (from web/).
//
// Fails (exit 1) if any of these are wrong:
//  - every curriculum lesson has a Markdown body, and every body has a lesson;
//  - every lesson body has the required sections, in order;
//  - every practice ref resolves to a real question, with no duplicates;
//  - FREE_QUIZ_REFS matches what the seeded quiz sampler actually serves;
//  - every study plan covers every lesson exactly once, with valid links;
//  - every internal link in lessons, content pages, study plans, and
//    navigation points to a real route, lesson, and (if given) anchor;
//  - every <!-- VERIFY: ... --> flag in content has a reason.
//
// Needs no dependencies beyond the site's own (marked, via markdown.mjs).
import { readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderMarkdown } from './markdown.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = join(root, 'src');
const imp = (p) => import(join(src, p));

const [{ DOMAINS, LESSONS }, { FREE_QUIZ_REFS }, { STUDY_PLANS }, nav, shuffle, domainsData, b1, b2, b3] = await Promise.all([
  imp('content/aicp/curriculum.js'),
  imp('content/aicp/freeQuizRefs.js'),
  imp('content/aicp/studyPlans.js'),
  imp('lib/nav.js'),
  imp('lib/shuffle.js'),
  imp('data/domains.js'),
  imp('data/exam1-questions.js'),
  imp('data/exam2-questions.js'),
  imp('data/exam3-questions.js'),
]);

const errors = [];
const warnings = [];
const err = (m) => errors.push(m);
const warn = (m) => warnings.push(m);

// Routes that exist in App.jsx. Keep in sync when adding a route.
const KNOWN_ROUTES = new Set([
  '/', '/about', '/contact',
  '/aicp', '/aicp/course', '/aicp/study-plan', '/aicp/exam-info', '/aicp/faq', '/aicp/pricing',
  '/aicp/exams', '/aicp/diagnostic', '/aicp/drills', '/aicp/progress', '/aicp/signin', '/aicp/exam/run',
]);
const REQUIRED_SECTIONS = ['learning-objectives', 'key-concepts', 'key-terms', 'real-world-examples', 'summary'];

// ---------------------------------------------------------------- lessons
const lessonDir = join(src, 'content/aicp/lessons');
const mdFiles = readdirSync(lessonDir).filter((f) => f.endsWith('.md'));
const slugs = new Set(LESSONS.map((l) => l.slug));
if (slugs.size !== LESSONS.length) err('Duplicate lesson slugs in curriculum.js');

const rendered = new Map(); // slug -> { headings, links, html }
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
  if (!(l.practice || []).length) warn(`Lesson ${l.slug}: no practice questions`);
  if (l.access === 'free' && !(l.practice || []).some((r) => FREE_QUIZ_REFS.has(r))) warn(`Free lesson ${l.slug}: no free-quiz questions, so its set is locked for free users`);
}

// FREE_QUIZ_REFS must match the sampler.
const actualFree = new Set(['q1', 'q2'].flatMap((id) => shuffle.sample(b1.BANK, id).map((q) => `e1:${q.n}`)));
const declared = [...FREE_QUIZ_REFS];
if (declared.length !== actualFree.size || declared.some((r) => !actualFree.has(r))) {
  err(`freeQuizRefs.js is out of date. The quizzes currently serve: ${[...actualFree].sort().join(', ')}`);
}

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
    if (q.get('drill') && !bankNames.has(q.get('drill'))) err(`${where}: unknown drill domain in ${href}`);
    if (q.get('set') && !slugs.has(q.get('set'))) err(`${where}: unknown practice set in ${href}`);
    if (!q.get('aid') && !q.get('drill') && !q.get('set')) err(`${where}: exam runner link without aid, drill, or set: ${href}`);
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

// ------------------------------------------------------------------ report
const totalRefs = LESSONS.reduce((s, l) => s + (l.practice || []).length, 0);
console.log(`Checked ${LESSONS.length} lessons in ${DOMAINS.length} domains, ${totalRefs} practice refs, ${STUDY_PLANS.length} study plans, ${verifyCount} VERIFY flags.`);
warnings.forEach((w) => console.log(`  warning: ${w}`));
if (errors.length) {
  errors.forEach((e) => console.error(`  ERROR: ${e}`));
  console.error(`${errors.length} error(s).`);
  process.exit(1);
}
console.log('All content checks passed.');
