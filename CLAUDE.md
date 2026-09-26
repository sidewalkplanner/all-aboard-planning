# CLAUDE.md — All Aboard Planning

Guidance for future sessions working in this repository. Read this first.

## What this is

**All Aboard Planning** is a paid AICP (American Institute of Certified Planners) exam prep
site. Long term it becomes a planning consulting firm's site, with AICP prep as one section.
Everything prep-related therefore lives under `/aicp/`; firm-level pages (`/about`,
`/contact`, and eventually a consulting homepage at `/`) live at the root.

- Live URL: `https://allaboardplanning.com/` (Cloudflare Workers, static assets)
- The app is **frontend only**: no backend, no payments. The course is **free**, but lessons,
  exams, and the review tools require a free account (Supabase Auth) so
  progress is tracked per person. See "Access, accounts, and the future paid tier" below.

## Repository layout

```
web/                        The site (React 19 + Vite 8 + react-router 7). All real work happens here.
  index.html                Shell and SEO meta (canonical and share URLs use allaboardplanning.com)
  vite.config.js            base path '/' (site root) + the lesson Markdown plugin
  scripts/markdown.mjs      Shared Markdown → HTML renderer (used by Vite plugin and checker)
  scripts/check-content.mjs `npm run check`: validates lessons, checkpoints, internal links
  art/                      Illustration pipeline (`npm run art`): hand-drawn SVG scenes -> public/art/*.webp
                            (scenes/figures.mjs holds the lesson figures)
  src/
    App.jsx                 All routes (firm-level, /aicp/*, and legacy redirects)
    index.css               Design tokens (CSS custom properties) + shared classes
    lib/paths.js            Route constants — always build links from these
    lib/nav.js              Header/footer navigation config
    lib/theme.js            JS copies of the colour tokens (used by inline-styled exam UI)
    components/             Header, Footer, PageHeader, Art, LessonBody, Checkpoint, AccessGate, RequireSignIn, ...
    hooks/                  usePageTitle, useAccess (who can open what), useMembership (future paid tier)
    context/AuthContext.jsx Accounts via Supabase Auth: sign up/in/out, password reset
    lib/supabase.js         Supabase client (project URL + publishable key)
    lib/cloudSync.js        Syncs each learner's progress between localStorage and Supabase
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
wrangler.jsonc              Cloudflare config (repo root): builds web/, serves web/dist, SPA fallback, custom domain
supabase/migrations/        Database schema (the user_data table and its row-level security)
supabase/templates/         Branded account emails (build.mjs writes the HTML; paste into Supabase)
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

Deployment is automatic: Cloudflare Workers Builds watches `main` and runs from the **repo
root** (its Root directory setting is blank), with deploy command `npx wrangler deploy`; pull
request builds run `npx wrangler preview`. Both read the root `wrangler.jsonc`, whose `build`
step (`cd web && npm ci && npm run build`) builds the site before uploading `web/dist`, so the
dashboard's build command can stay empty. Keep the config at the root: a config inside `web/` is
never read (that caused blank and failed deploys). Keep the `routes` entry for
`allaboardplanning.com` too: `wrangler deploy` replaces the Worker's routes with the config's,
so dropping it detaches the domain and Cloudflare deletes its DNS record. The empty `previews`
block is required by `wrangler preview`.
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
   **Figures.** Where a picture teaches faster than a paragraph (a distribution, a comparison,
   a process, a map), add a diagram after the section it explains:
   ```markdown
   :::figure fig-skew | Alt text that says everything the figure shows, including its labels.
   A one- or two-sentence caption that adds the takeaway rather than repeating the text.
   :::
   ```
   Draw it in `web/art/scenes/figures.mjs` (same collage kit as the other art) and render it with
   `npm run art -- fig-skew`; that writes `public/art/fig-skew.webp` and records its size in
   `src/data/artMeta.json`. Charts must be drawn to scale from the numbers in their labels, and
   any invented data is marked "illustrative". The lettering is baked into the image, so the alt
   text carries it. Legibility rules (the header of `figures.mjs` has the detail):
   - **Size.** Text must be at least 13px on screen, and `npm run check` enforces it. In the
     720-wide canvas that means 28+ for labels and 35+ for notes (`note` sizes are given in
     Caveat terms and drawn in Patrick Hand at 0.96 of that). Side-by-side figures instead return a `narrow` layout with the panels stacked;
     phones get `<name>-narrow.webp`, and the wide layout then needs only 19+ (24+ handwritten).
   - **Voices.** `title` (Fraunces) for headings, `label` (Figtree) for data: numbers, ticks,
     legends, names. `note` (Patrick Hand, a print-style hand that stays readable on phones; Caveat was
     too hard to read at figure size) only for the one or two remarks that make the point.
   - **Flat color under text.** Shapes that carry labels skip the paper grain (`filter: FLAT`).
   If text won't fit at the minimum, cut words or add a narrow layout; never shrink the type.

4. **Flag uncertain facts** with `<!-- VERIFY: … -->` and add them to `REVIEW.md`.
5. **Add it to the study plans** in `studyPlans.js` if it should be scheduled.
6. Run `npm run check && npm run build` in `web/`.

## Lesson figures: workflow and status

**Status (update this as you go).** Module 1 (Research and Assessment Methods) is fully
illustrated: 26 figures across its four lessons. Module 2 (Fundamental Planning
Knowledge) is fully illustrated too: 33 figures across its six lessons (history 5, theory 4,
urban form 5, land use law 4, takings 3, federal policy 3). Module 3 (Communication and
Interaction) has 15 across its four lessons (engagement design 5, equitable engagement 3,
consensus 4, decision-makers 3). Module 4 (Plan and Policy Development) has 14 across its four
lessons (planning process 4, comprehensive plans 3, goals and policies 3, analysis tools 4).
Module 5 (Plan Implementation) has 28 across its seven lessons
(zoning 4, zoning relief 4, subdivision 4, growth management 4, implementation math 4, capital
finance 4, monitoring 4). Module 6 (Administration and Management) has 7 across its two lessons (project
management 3, managing an agency 4). Module 7 (Leadership) has 7 across its two lessons (leadership 4,
mentoring and development 3). Next is module 8 (Areas of Practice), in course order, starting with `transportation-planning`. Aim for two to five figures per lesson, one per
section where a picture teaches faster than the text: a process, a comparison, a
distribution, a map, or a worked calculation. Skip sections a picture wouldn't improve.

**Before showing or pushing figures, look at them.** `npm run check` only catches small text.
Also:
1. Render (`npm run art -- fig-`) and view every new figure at full size, looking for
   overlapping labels, text running off the edge, and marks that collide.
2. View each one at phone width (340px; the `-narrow` version if it has one) and confirm the
   words are comfortably readable.
3. Confirm every chart is computed from the numbers in its labels, never drawn by eye (an early
   Lorenz curve got invented wiggles from curve smoothing). Invented data says "illustrative"
   in the figure or caption, and the caption's arithmetic must check out.
4. Keep figure facts consistent with the lesson. If a figure needs a concept the lesson doesn't
   explain, add a sentence (and a key term if it's testable) to the lesson.

**Working with the owner (Bobby).** Work on the session's `claude/...` branch and push there.
Merging to `main` makes the site live, so merge only when Bobby says to (for example "merge"
or "go live"): open a pull request and merge it. After a merge, restart the branch from
`origin/main` before the next change. Send a few of the new figures as images with each
update so he can review without opening the site.

**Open items outside the code.** The two account email templates (confirm signup, reset
password) changed after they were last pasted into Supabase and need pasting again (see
`supabase/templates/README.md`). The fact-check checklist Bobby works from lists the VERIFY
flags; `REVIEW.md` has the same flags with current line numbers.

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
- **Accounts are Supabase Auth** (project `all-aboard-planning`, ref `eawdxearyzkkloivokdh`,
  free plan) behind `src/context/AuthContext.jsx`, which exposes
  `{ user, signUp, signIn, signOut, resetPassword, updatePassword, recovering }` with `user` as
  `{ id, name, email }` (name lives in the auth user's metadata). The publishable key in
  `lib/supabase.js` is meant to be public; row-level security protects the data. Email links
  (confirmation, password reset) return to `/aicp/signin`, which handles `?mode=forgot|reset`.
  **Changing an account's email is intentionally not offered** (no UI, and `AuthContext` only
  calls `updateUser` for passwords); don't add it. Only the confirm-signup and reset-password
  emails are customized; the change-email and "password changed" emails aren't used.
- **Auth settings live in the Supabase dashboard, not the repo:** Site URL
  `https://allaboardplanning.com`, redirect URLs for the site, and **"Confirm email" on** (new
  accounts must click a link before signing in). Auth emails go out through **Resend** as custom
  SMTP (`smtp.resend.com`, sender `bobby@allaboardplanning.com`, domain verified in Resend with
  DNS records on Cloudflare). Don't switch back to Supabase's built-in email: it only reaches the
  project team's addresses, so public sign-ups and password resets would fail. Resend's free plan
  allows 3,000 emails a month (100 a day).
- **The account emails are branded** (cream paper, inked card, ticket art): source in
  `supabase/templates/build.mjs`, which writes the HTML files there; art in
  `web/art/scenes/email.mjs`, rendered as JPEG (`jpg` option in `art/render.mjs`) because not
  every email app shows WebP. Supabase doesn't read the files: after changing them, paste each
  into Authentication → Emails → Templates (subjects and steps in `supabase/templates/README.md`).
- **Progress syncs to Supabase:** history, study state, and in-progress exams are still read and
  written in localStorage under `scopedKey()` from `lib/userStorage.js`; each write calls
  `noteWrite(base)`, and `lib/cloudSync.js` pushes it to the `user_data` table (one row per
  learner per document, RLS: own rows only). On sign-in it pulls; unpushed local changes are
  merged, never overwritten, and nothing is pushed before the first pull. A guest's data and data
  from the retired browser-only accounts (same email) are adopted on sign-in.
- **Database changes** go in `supabase/migrations/` as new numbered files, applied with the
  Supabase tools, and keep RLS on every table.
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
