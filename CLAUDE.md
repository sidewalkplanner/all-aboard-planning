# CLAUDE.md — All Aboard Planning

Guidance for future sessions working in this repository. Read this first.

## What this is

**All Aboard Planning** is a paid AICP (American Institute of Certified Planners) exam prep
site. Long term it becomes a planning consulting firm's site, with AICP prep as one section.
Everything prep-related therefore lives under `/aicp/`; firm-level pages (`/about`,
`/contact`, and eventually a consulting homepage at `/`) live at the root.

- Live URL: `https://allaboardplanning.com/` (Cloudflare Workers, static assets)
- The app is **frontend only**: no backend, no payments. The course is **free**, but lessons,
  exams, and the review tools require a (placeholder, browser-only) account so
  progress is tracked per person. See "Access, accounts, and the future paid tier" below.

## Repository layout

```
web/                        The site (React 19 + Vite 8 + react-router 7). All real work happens here.
  index.html                Shell and SEO meta (canonical and share URLs use allaboardplanning.com)
  wrangler.jsonc            Cloudflare config: serves ./dist, SPA fallback so deep links load the app
  vite.config.js            base path '/' (site root) + the lesson Markdown plugin
  scripts/markdown.mjs      Shared Markdown → HTML renderer (used by Vite plugin and checker)
  scripts/check-content.mjs `npm run check`: validates lessons, checkpoints, internal links
  art/                      Illustration pipeline (`npm run art`): hand-drawn SVG scenes -> public/art/*.webp
  src/
    App.jsx                 All routes (firm-level, /aicp/*, and legacy redirects)
    index.css               Design tokens (CSS custom properties) + shared classes
    lib/paths.js            Route constants — always build links from these
    lib/nav.js              Header/footer navigation config
    lib/theme.js            JS copies of the colour tokens (used by inline-styled exam UI)
    components/             Header, Footer, PageHeader, Art, LessonBody, Checkpoint, AccessGate, RequireSignIn, ...
    hooks/                  usePageTitle, useAccess (who can open what), useMembership (future paid tier)
    context/AuthContext.jsx Placeholder accounts (browser-only); swap for a real auth provider
    lib/access.js           PAID_TIER_ENABLED switch + PUBLIC_ASSESSMENTS (open without an account)
    lib/userStorage.js      Per-account localStorage keys (scopedKey)
    lib/studyState.js       Per-account lesson completion, chosen study plan, plan checkboxes, flashcard boxes
    lib/history.js          Per-account scored attempts (with missedRefs, for "lessons to review")
    content/aicp/
      curriculum.js         Domains + ordered lesson metadata (the course's source of truth)
      lessons/*.md          One Markdown file per lesson body
      studyPlans.js         8- and 12-week schedules (reference lesson slugs)
      checkpoints.js        Original lesson checkpoint questions (+ checkpoints/d1..d9 per domain)
      flashcards.js         The flashcard deck (built from every lesson's Key terms by a Vite plugin)
    content/pages/*.md      Exam Info, About, Exam strategy, Quick reference bodies (same renderer as lessons)
    content/site.js         Owner settings (CONTACT_EMAIL placeholder)
    data/                   Question banks (exam1/2/3), domain weights; diagnostic-items.js is retired (kept, unused)
    pages/                  Route components; pages/aicp/* are the prep section pages
    pages/exam/             Exam runner (the three full-length practice exams)
uploads/                    Source specs for the question banks and diagnostic (reference only)
*.dc.html, support.js, root *.js   Original design prototypes (reference only; not deployed)
```

## Commands (run in `web/`)

| Command | What it does |
|---|---|
| `npm ci` | Install |
| `npm run dev` | Local dev server |
| `npm run build` | Production build to `web/dist` (must pass before pushing) |
| `npm run lint` | oxlint (warnings about unused catch params are pre-existing and fine) |
| `npm run check` | Content + link checker. Must pass before pushing |

Deployment is automatic: Cloudflare Workers Builds watches `main`. Its dashboard build
settings must be: root directory `web`, build command `npm run build`, deploy command
`npx wrangler deploy`; pull request (preview) builds run `npx wrangler preview`, which needs the
`previews` block in `wrangler.jsonc`. Workers Builds ignores a `build` section in the Wrangler
file, so the build command has to be set in the dashboard or nothing gets built.
There is no staging. The site used to be on GitHub Pages at `/all-aboard-planning/`; that
was switched off, and the Pages workflow and `404.html` workaround were removed. If the site
ever moves under a subfolder again, set `base` in `vite.config.js` to that subfolder.

## Routing rules

- The router uses `basename={import.meta.env.BASE_URL}` (the Vite `base`, `/` today), so route
  paths never include a base prefix. In Markdown, write internal links as root-relative paths
  (`/aicp/lessons/zoning-fundamentals`); the Markdown plugin adds the base path and
  `LessonBody` turns clicks into client-side navigation.
- Build links from `src/lib/paths.js` (`P.course`, `P.lesson(slug)`, …) instead of string
  literals, and use `<Link>` (real anchors) — not `<button onClick={navigate}>` — for anything
  that is navigation.
- Old top-level routes (`/exams`, `/exam/run`, `/diagnostic`, `/study`, `/progress`,
  `/pricing`, `/signin`) redirect to `/aicp/...` preserving the query string. Keep them.
- If you add a route, add it to `App.jsx` **and** to `KNOWN_ROUTES` in
  `scripts/check-content.mjs` so the link checker knows about it.

## Design rules

The look is a **whimsical, hand-drawn paper collage**: cream drawing paper, cut-paper shapes
with inked outlines, washi tape, pins, stamps, and pencil notes, with a transit theme
(streetcars, tickets, station signs). Build on it; don't introduce a new visual language.

- **Fonts:** headings `Fraunces` (display serif); body `Figtree`; handwritten notes `Caveat`
  (`.hand`). Use the handwriting sparingly, for short notes and labels, never for body copy.
- **Colour tokens** (defined once in `src/index.css` `:root`, mirrored in `lib/theme.js`):
  paper `--bg #F7F0E2`, card `--surface #FFFDF8`, ink `--ink #27233A`, body `--text #3F3A4F`,
  `--muted #5A5468`; cut-paper colours `--butter`, `--tomato`, `--civic`, `--leaf`, `--lavender`,
  `--kraft`, `--sky`. The original role names are kept as aliases: `--brand #2F6CB3` (civic blue),
  `--navy #15294A` (blueprint bands), `--coral` (= butter, an accent on blueprint only),
  `--rust #C23F35`. Never put butter or blush text on paper (fails contrast); use `--rust` /
  `--err-fg` or `--brand-strong` for coloured text.
- **Surfaces:** `.card` is inked card stock with a slight tilt (set `--r` for the angle) and
  hand-cut corners; `.card-dark` is blueprint. Bands: `.band-white | .band-warm | .band-navy`
  (torn edges built in), backgrounds `.paper-bg | .kraft-bg | .blueprint-bg`.
- **Components:** `.btn` + `.btn-primary | .btn-secondary | .btn-dark | .btn-coral | .btn-rust |
  .btn-ghost-light`; `.chip` variants; `.tape`, `.pin`, `.stamp`; `.callout`; `.meter`;
  `.ticket` (exam cards); `.prose` for long-form text (key terms become index cards, exam tips a
  sticky note, video slots a film strip); `.breadcrumb`; `PageHeader` with optional `art`.
- **Illustrations** come from the pipeline in `web/art/` (see its README): scenes are drawn in
  code with perfect-freehand strokes, rendered to WebP in `public/art/`, and placed with
  `<Art name=... w h alt />`. Don't hotlink or drop in stock art; add a scene and run
  `npm run art <name>`. Paper textures come from `npm run art:textures`.
- **Motion:** gentle (float, sway, the hero streetcar). Everything respects
  `prefers-reduced-motion`.
- The exam runner uses inline styles with `themeTokens(dark)` because they
  support a blueprint dark mode; leave that pattern in place there.
- **Accessibility:** exactly one `<h1>` per page, headings in order, every image/SVG either has
  alt text or `aria-hidden`, visible focus (global `:focus-visible` ring), AA contrast, links
  are `<a>`, buttons are `<button>`. Set the page title with `usePageTitle()`.
- Mobile first: every layout must work at 360px wide with no horizontal scroll. Use
  `auto-fit/minmax` grids.

## Content conventions

- **Original writing only.** Never copy or closely paraphrase APA materials, textbooks, or
  other prep courses. The APA content outline is used only as a blueprint.
- **Accuracy.** Don't invent cases, statutes, dates, or statistics. If you're not certain of
  a specific fact, write it but flag it: `<!-- VERIFY: reason -->` in Markdown/HTML, or
  `{/* VERIFY: reason */}` in JSX. Every flag must be listed in `REVIEW.md`. Find them with
  `grep -rn "VERIFY:" web/src`.
- **APA is the authority** on fees, dates, eligibility, and scoring. Say so and link to
  planning.org rather than stating fees.
- Non-affiliation: All Aboard Planning is independent and not affiliated with or endorsed by
  APA/AICP. Use "AICP" and "APA" only to describe what the product prepares for.
- Voice: professional but friendly, second person, plain language, short paragraphs, US
  spelling. Explain *why* a rule exists, not just what it is.
- Domain names and numbering follow the content outline in
  `uploads/aicp-diagnostic-exam-spec.md` (codes 1–9, see `DOMAINS` in `curriculum.js`).

## How to add a new lesson

1. **Pick the domain and position.** Open `web/src/content/aicp/curriculum.js`. Lessons are
   ordered within each domain's `lessons` array; course order (and Previous/Next) is domain
   order, then array order.
2. **Add the metadata entry** to that array:
   ```js
   {
     slug: 'my-new-lesson',              // URL: /aicp/lessons/my-new-lesson (kebab-case, unique)
     title: 'My new lesson',
     description: 'One sentence shown on the course overview and in search results.',
     minutes: 20,                        // estimated reading time
     access: 'paid',                     // 'free' or 'paid'; only matters once PAID_TIER_ENABLED is on
     outline: ['5.1 Develop and interpret rules and regulations'], // outline sub-areas (optional)
     practice: ['e1:74', 'e2:91'],       // question refs: e1/e2/e3 = exam bank, number = item "n"
   }
   ```
   `practice` refs must exist in `src/data/exam{1,2,3}-questions.js`. They list the exam items
   the lesson teaches and are **never shown in the lesson**; exam results use them to send
   each missed question back to the lessons that cover it.
3. **Create the body** at `web/src/content/aicp/lessons/my-new-lesson.md`. Don't repeat the
   title — the template renders the header, domain badge, practice block, and Previous/Next
   navigation. Use these `##` sections, in this order (the checker enforces them):
   ```markdown
   ## Learning objectives
   - Bullet list, each starting with a verb ("Explain…", "Calculate…").

   ## Key concepts
   ### Subtopic
   Plain-language explanation…

   ## Key terms
   - **Term**: definition in your own words.

   ## Real-world examples
   Concrete planning situations (generic or well-documented real ones).

   ## Exam tips
   - 3–6 bullets: what the exam tends to ask on this topic and the traps to avoid.

   ## Summary
   A short recap paragraph or bullets.
   ```
   "Exam tips" is required (anywhere after Key concepts, before Summary). Other optional
   sections (for example `## Worked examples`) may go anywhere after "Key concepts" and
   before "Summary". A short `>` note above
   "Learning objectives" is allowed (the ethics lessons use one). Tables, blockquotes, and `> **Exam tip:**` callouts are
   supported. Link to other lessons with `/aicp/lessons/<slug>`.

   **Checkpoints (required, at least 3 per lesson).** After a key `###` section, add a line:
   ```markdown
   :::checkpoint cp:zoning-floating
   ```
   It renders an interactive question right there. **Checkpoints are original questions only**
   (`:::checkpoint cp:my-id`), defined in `src/content/aicp/checkpoints/d<N>-*.js` for the
   lesson's domain. Never use an exam item (`e1:`/`e2:`/`e3:`): lessons must not give away exam
   questions, and the checker fails if one appears. Write each from the section's own text,
   testing the idea from a different angle than the exam items do; vary which option is correct.
   Several refs on one line make a multi-question checkpoint.
   Readers must answer every checkpoint before they can mark the lesson complete; answers are
   saved per account. Don't reuse a ref twice in one lesson (the checker enforces this).

   **Video slots.** Where a short video would help with a high-impact or visual topic, add:
   ```markdown
   :::video Nollan and Dolan: the two-part test for exactions | about 4 min
   One or two sentences on what the video will cover.
   :::
   ```
   It renders a "Video coming soon" placeholder. When the video exists, add its embed URL as a
   third field (`Title | about 4 min | https://www.youtube-nocookie.com/embed/ID`) and it renders
   the player instead. `npm run check` validates the blocks and counts remaining placeholders.
4. **Flag uncertain facts** with `<!-- VERIFY: … -->` and add them to `REVIEW.md`.
5. **Add it to the study plans** in `studyPlans.js` if it should be scheduled.
6. Run `npm run check && npm run build` in `web/`.

## The exam runner

`/aicp/exam/run` takes `?aid=e1|e2|e3&mode=practice|timed`: the three full-length exams
(`ASSESSMENTS` in `data/domains.js`).

Retired, with redirects for old links: domain drills (`?drill=`, to the domain's lessons),
lesson practice sets (`?set=`, to the lesson), and the warm-up quizzes (`?aid=q1|q2`, to the
exams list). The quizzes were a free teaser for a paid course and stopped making sense once
everything was free. The 100-item diagnostic (`/aicp/diagnostic`, to the exams list) was
retired too: with 170 questions, each exam gives a sturdier per-domain read, so every exam's
results now carry its ranking. Its 100 original questions stay in `data/diagnostic-items.js`,
unused, for later. Don't reintroduce any of them; exam items live only in the exams.

**Study order.** `useExamSession` ranks the top three domains by exam weight times the share of
*answered* questions missed (`studyOrder`, shown once at least 40 are answered), shows them as
"Study in this order" on the results screen, and records them as `priorities` on the attempt.
The dashboard's "Study these first" card reads the latest attempt that has `priorities`.
Practice Exam 1 in practice mode is the recommended baseline everywhere (home, plans, dashboard).

Assessments in `PUBLIC_ASSESSMENTS` would open without an account (none today); anything else
redirects to `/aicp/signin?next=...` and returns there after sign-in.

Question order is deterministic (seeded) in `lib/shuffle.js`.

## Access, accounts, and the future paid tier

- **Who can open what** is decided in one hook, `src/hooks/useAccess.js`, from two settings in
  `src/lib/access.js`: `PAID_TIER_ENABLED` (false today) and `PUBLIC_ASSESSMENTS` (`[]`).
  Today: signed-out visitors get all marketing pages, the course overview, the
  study plans, and each lesson's learning objectives; everything else is free with an account.
- **Gating UI:** `components/AccessGate.jsx` (inline "create a free account" box) and
  `components/RequireSignIn.jsx` (route wrapper used for the dashboard and review tools).
  Never check `user` directly in a page; ask `useAccess()`.
- **Accounts are a placeholder** (`src/context/AuthContext.jsx`): accounts, SHA-256-hashed
  passwords, and the session live in this browser's localStorage. It isn't real security and
  doesn't sync across devices. To go live, replace the bodies of `signUp`, `signIn`, `signOut`
  and the initial session read with a hosted provider (Supabase, Firebase, Auth0, Clerk...) and
  move history to its database; keep the `{ user, signUp, signIn, signOut }` shape.
- **Progress is per account:** history and saved exam attempts use
  `scopedKey()` from `lib/userStorage.js`. Signed-out visitors use the unscoped keys; on sign-up,
  guest history is adopted into the new account.
- **Turning on paid plans later:** set `PAID_TIER_ENABLED = true`. Lessons/exams tagged `paid`
  then need Full Access from `hooks/useMembership.js` (currently the demo
  `UnlockContext` toggle; replace it with the real membership check), the Pricing page switches
  to the paid tiers (`PaidPricing` in `pages/Pricing.jsx`, placeholder prices), and the
  Free/Full Access labels and header Pricing link reappear. Gated text still ships in the JS
  bundle, so real protection needs server-side delivery.

## Study features (how the pieces fit)

- **Site map for learners:** Course (lessons) · Study plan · Practice (`/aicp/exams`:
  full exams) · Review (`/aicp/review`: exam strategy guide, flashcards, quick
  reference) · Exam info · Dashboard (`/aicp/progress`, signed in).
- **Lesson page** (`pages/aicp/LessonPage.jsx`): body with mid-lesson checkpoints
  (`LessonBody` portals a `Checkpoint` into each `:::checkpoint` slot; answers go to
  `studyState.checkpoints`), a "Mark lesson complete" toggle that unlocks once every
  checkpoint is answered, a practice block pointing to the full exams, and Previous/Next. Opening a lesson records it as
  `lastLesson`. Questions load through `lib/questionBank.js`.
- **Flashcards** are generated from every lesson's `## Key terms` bullets, which must be written
  `- **Term**: definition` (the checker enforces this). Leitner boxes live in `studyState.cards`.
- **Study plans**: "Follow this plan" stores `studyState.plan`; lessons tick off from lesson
  completion; practice items are ticked manually (`planItemKey`). `planProgress()` powers both
  the plan page and the dashboard.
- **Lessons to review**: every scored attempt records `missedRefs`; `lessonsToReview()` in
  `curriculum.js` maps them back to lessons for the results screen and the dashboard.
- **Quick reference** (`content/pages/quick-reference.md`) restates facts from the lessons. When
  a lesson's fact changes, update the quick reference too (and carry any VERIFY flag).
