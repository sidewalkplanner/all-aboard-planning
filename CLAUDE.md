# CLAUDE.md — All Aboard Planning

Guidance for future sessions working in this repository. Read this first.

## What this is

**All Aboard Planning** is a paid AICP (American Institute of Certified Planners) exam prep
site. Long term it becomes a planning consulting firm's site, with AICP prep as one section.
Everything prep-related therefore lives under `/aicp/`; firm-level pages (`/about`,
`/contact`, and eventually a consulting homepage at `/`) live at the root.

- Live URL: `https://sidewalkplanner.github.io/all-aboard-planning/`
- The app is **frontend only**: no backend, no payments. The course is **free**, but everything
  except Warm-up Quiz A requires a (placeholder, browser-only) account so progress is tracked
  per person. See "Access, accounts, and the future paid tier" below.

## Repository layout

```
web/                        The site (React 19 + Vite 8 + react-router 7). All real work happens here.
  index.html                Shell, SEO meta, SPA-redirect decoder for GitHub Pages
  public/404.html           GitHub Pages SPA fallback (encodes deep links; do not remove)
  vite.config.js            base path '/all-aboard-planning/' + the lesson Markdown plugin
  scripts/markdown.mjs      Shared Markdown → HTML renderer (used by Vite plugin and checker)
  scripts/check-content.mjs `npm run check`: validates lessons, practice refs, internal links
  src/
    App.jsx                 All routes (firm-level, /aicp/*, and legacy redirects)
    index.css               Design tokens (CSS custom properties) + shared classes
    lib/paths.js            Route constants — always build links from these
    lib/nav.js              Header/footer navigation config
    lib/theme.js            JS copies of the colour tokens (used by inline-styled exam UI)
    components/             Header, Footer, LessonBody, AccessGate, RequireSignIn, ContentPage, ...
    hooks/                  usePageTitle, useAccess (who can open what), useMembership (future paid tier)
    context/AuthContext.jsx Placeholder accounts (browser-only); swap for a real auth provider
    lib/access.js           PAID_TIER_ENABLED switch + PUBLIC_ASSESSMENTS (open without an account)
    lib/userStorage.js      Per-account localStorage keys (scopedKey)
    content/aicp/
      curriculum.js         Domains + ordered lesson metadata (the course's source of truth)
      lessons/*.md          One Markdown file per lesson body
      studyPlans.js         8- and 12-week schedules (reference lesson slugs)
      freeQuizRefs.js       Which Exam 1 items the free quizzes serve (checked by npm run check)
    content/pages/*.md      Exam Info and About page bodies (Markdown, same renderer as lessons)
    content/site.js         Owner settings (CONTACT_EMAIL placeholder)
    data/                   Question banks (exam1/2/3), diagnostic items, domain weights
    pages/                  Route components; pages/aicp/* are the prep section pages
    pages/exam/             Exam runner (quizzes, exams, domain drills, lesson practice sets)
    pages/diagnostic/       100-item diagnostic
uploads/                    Source specs for the question banks and diagnostic (reference only)
*.dc.html, support.js, root *.js   Original design prototypes (reference only; not deployed)
.github/workflows/deploy-pages.yml  Builds web/ and deploys to GitHub Pages on push to main
```

## Commands (run in `web/`)

| Command | What it does |
|---|---|
| `npm ci` | Install |
| `npm run dev` | Local dev server |
| `npm run build` | Production build to `web/dist` (must pass before pushing) |
| `npm run lint` | oxlint (warnings about unused catch params are pre-existing and fine) |
| `npm run check` | Content + link checker. Must pass before pushing |

Deployment is automatic: pushing to `main` runs the Pages workflow. There is no staging.

## Routing rules

- The router uses `basename={import.meta.env.BASE_URL}`, so route paths never include
  `/all-aboard-planning`. In Markdown, write internal links as root-relative paths
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

Build on the existing look; don't introduce a new visual language.

- **Fonts:** headings `Bricolage Grotesque` (700, tight letter-spacing); body `Figtree`.
- **Colour tokens** (defined once in `src/index.css` `:root`, mirrored in `lib/theme.js`):
  `--bg #F6F7FB`, `--surface #FFFFFF`, `--line #E4E6F0`, `--ink #1A1C2B`,
  `--text #3A3F57`, `--muted #5B6180`, `--brand #1D5FA8`, `--brand-strong #14508C`,
  `--navy #10345E`, `--coral #FF7059` (only on dark navy backgrounds), `--rust #C93B2C`.
  Never put coral text on white (fails contrast); use `--rust` / `--err-fg` instead.
- **Layout classes:** `.container` (1180px), `.container-narrow` (820px), `.section`,
  `.page-head`, `.eyebrow`, `.lead`, `.grid-cards`.
- **Components:** `.btn` + `.btn-primary | .btn-secondary | .btn-dark | .btn-coral | .btn-ghost-light`,
  `.card`, `.chip` (+ `.chip-brand | .chip-warn | .chip-neutral`), `.callout`
  (+ `.callout-warn`), `.prose` for long-form text, `.breadcrumb`.
- New pages use these classes. The exam runner and diagnostic still use inline styles with
  `themeTokens(dark)` because they support dark mode; leave that pattern in place there.
- **Accessibility:** exactly one `<h1>` per page, headings in order, every image/SVG either has
  alt text or `aria-hidden`, visible focus (global `:focus-visible` ring), AA contrast, links
  are `<a>`, buttons are `<button>`. Set the page title with `usePageTitle()`.
- Mobile first: every layout must work at 360px wide. Use `auto-fit/minmax` grids.

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
   `practice` refs must exist in `src/data/exam{1,2,3}-questions.js`. (If paid plans are
   enabled later, signed-in non-members see only the refs on free lessons that also appear in
   the warm-up quizzes, so paid items aren't given away.)
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

   ## Summary
   A short recap paragraph or bullets.
   ```
   Optional extra sections (for example `## Exam tips` or `## Worked examples`) may go
   anywhere after "Key concepts" and before "Summary". A short `>` note above
   "Learning objectives" is allowed (the ethics lessons use one). Tables, blockquotes, and `> **Exam tip:**` callouts are
   supported. Link to other lessons with `/aicp/lessons/<slug>`.

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

`/aicp/exam/run` takes one of:
- `?aid=q1|q2|e1|e2|e3&mode=practice|timed`: quizzes and full exams (`ASSESSMENTS` in `data/domains.js`)
- `?drill=<domain name>`: a 25-question untimed drill (account required)
- `?set=<lesson slug>`: a lesson's practice set, untimed, with explanations (account required)

Only assessments in `PUBLIC_ASSESSMENTS` (Warm-up Quiz A) open without an account; anything
else redirects to `/aicp/signin?next=...` and returns there after sign-in.

Question sampling is deterministic (seeded) in `lib/shuffle.js`; changing seeds or bank order
changes which items appear in Quiz A/B, which would invalidate free lessons' practice refs.
Run `npm run check` after touching the banks or the sampler.

## Access, accounts, and the future paid tier

- **Who can open what** is decided in one hook, `src/hooks/useAccess.js`, from two settings in
  `src/lib/access.js`: `PAID_TIER_ENABLED` (false today) and `PUBLIC_ASSESSMENTS` (`['q1']`).
  Today: signed-out visitors get Warm-up Quiz A, all marketing pages, the course overview, the
  study plans, and each lesson's learning objectives; everything else is free with an account.
- **Gating UI:** `components/AccessGate.jsx` (inline "create a free account" box) and
  `components/RequireSignIn.jsx` (route wrapper used for the diagnostic, drills, and progress).
  Never check `user` directly in a page; ask `useAccess()`.
- **Accounts are a placeholder** (`src/context/AuthContext.jsx`): accounts, SHA-256-hashed
  passwords, and the session live in this browser's localStorage. It isn't real security and
  doesn't sync across devices. To go live, replace the bodies of `signUp`, `signIn`, `signOut`
  and the initial session read with a hosted provider (Supabase, Firebase, Auth0, Clerk...) and
  move history to its database; keep the `{ user, signUp, signIn, signOut }` shape.
- **Progress is per account:** history, saved exam attempts, and the saved diagnostic use
  `scopedKey()` from `lib/userStorage.js`. Signed-out visitors use the unscoped keys; on sign-up,
  guest history is adopted into the new account.
- **Turning on paid plans later:** set `PAID_TIER_ENABLED = true`. Lessons/exams tagged `paid`
  and domain drills then need Full Access from `hooks/useMembership.js` (currently the demo
  `UnlockContext` toggle; replace it with the real membership check), the Pricing page switches
  to the paid tiers (`PaidPricing` in `pages/Pricing.jsx`, placeholder prices), and the
  Free/Full Access labels and header Pricing link reappear. Gated text still ships in the JS
  bundle, so real protection needs server-side delivery.
