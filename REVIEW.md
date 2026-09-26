# REVIEW: AICP course build

## Update 5: the streetcar on screen, and exams replace the diagnostic

### The home page
The hero was tall enough that the streetcar sat below the fold on common screens. The headline now runs two lines, the "first stop" card is slimmer, and short screens tighten further, so the whole streetcar shows without scrolling at 1280x720 and up (checked at seven sizes, including phones). The streetcar also starts partway into its loop, so it's already rolling in when the page opens. On phones the town comes before the card and is cropped to keep the streetcar, the AICP stop, and the planners in view.

### The diagnostic is retired; every exam ranks where to study
- **Every exam's results now say "Study in this order":** the top three domains by exam weight times the share of answered questions missed, each linking to that domain's lessons. It appears once 40 or more questions are answered, and ignores unanswered ones, so a partial practice-mode run still gives a fair ranking.
- **The dashboard's "Study these first"** comes from your latest exam, and before any exam it points you to Practice Exam 1 as your baseline.
- **Practice Exam 1 in practice mode is the baseline** on the home page, study plans, course overview, exam info, and FAQ. The study plans now go: Exam 1 baseline in week 1, Exam 2 midway, Exam 3 timed at the end. Weeks that had "retake the diagnostic" now say to reread the top domain on your dashboard.
- **Old diagnostic links** open the practice exams page.
- **Kept, unused:** the diagnostic's 100 original questions (`web/src/data/diagnostic-items.js`). None appear in the exams, so they could become lesson checkpoints or other practice later.
- **Lost with the diagnostic:** its confidence tagging ("confident but wrong") and the per-domain Priority-to-Strong bands. Either could be added to the exam results later if they're missed.

## Update 4: collage design, lessons without exam questions

### The look
The whole site now uses a **whimsical, hand-drawn paper collage** style: cream drawing paper, inked cut-paper cards, washi tape, pins, stamps, pencil notes, torn-edge bands, and a transit theme. Every illustration is original and drawn in code (`web/art/`, `npm run art`), then rendered to WebP. See CLAUDE.md, "Design rules".

### Domain drills are gone
"Study by domain" (`/aicp/drills`) was removed. Studying by domain now means reading that domain's lessons. Old drill links redirect to the domain's lessons, and the diagnostic report and study plans point to lessons instead of drills.

### Lessons no longer show exam questions
Before this update, lessons served exam items in three places: most checkpoints were exam-bank questions, the end-of-lesson "Lesson review" drew three more, and each lesson had a "practice set" of its exam items. Anyone who studied the lessons had already seen much of Practice Exams 1 to 3, so exam scores overstated readiness.

- **Every checkpoint is now an original question.** 178 new questions replace the exam items (plus the 24 original ones already there), across all 40 lessons. They're written from each section's own text and test the same idea from a different angle, so they never paraphrase an exam item. They live in `web/src/content/aicp/checkpoints/d1-*.js` through `d9-*.js`.
- **Removed:** the "Lesson review" quick check (`QuickCheck.jsx`), lesson practice sets (`?set=`, now redirected to the lesson), and `freeQuizRefs.js`.
- **Kept, but hidden:** each lesson's `practice` list of the exam items it teaches. Exam results use it to send missed questions back to the right lessons.
- **The end of each lesson** now points to the full-length exams and the diagnostic.
- **The checker enforces it:** `npm run check` fails if a lesson checkpoint uses an exam item or links to a practice set.

### Worth reviewing
- **The 178 new checkpoint questions are new content.** They restate facts from the lessons and avoid anything carrying a VERIFY flag, but a planner should read them before launch, as with the first 24.
- **The warm-up quizzes are gone.** Quizzes A and B were a free teaser for a paid course; with everything free they only repeated 50 Practice Exam 1 questions. Old quiz links open the exams list. The homepage's "try Quiz A" card now points to the diagnostic, and the study plans schedule a domain review in the quiz weeks. Signed-out visitors can still browse the course, study plans, and each lesson's objectives, but nothing interactive opens without an account.
- **Accounts are still a placeholder** (browser-only, no server). See CLAUDE.md, "Access, accounts, and the future paid tier".

## Update 3: interactive lessons

Every lesson now has **checkpoints**: questions placed right after the key sections, answered in place with instant feedback and an explanation. Before this, lessons were 20 or more minutes of reading with questions only at the end, so early sections had faded by the time you were tested on them. Answering soon after reading is one of the most reliable ways to make material stick, and it catches misunderstandings (nexus versus proportionality, variance versus conditional use) before they harden.

- **201 checkpoints across 40 lessons**, three to seven per lesson (about five on average), one after each of the most important sections.
- **Most reuse the reviewed practice-exam questions,** matched to the section they test. I matched them automatically by comparing each question's wording with each section's text, then reviewed every match by hand and dropped weak or duplicate ones.
- **24 are new, original questions** (`web/src/content/aicp/checkpoints.js`) for important sections no bank question covered: the math lesson's calculations, zoning map-versus-text amendments, policy wording, sensitivity analysis, the economic base multiplier, rural and tribal planning, infrastructure life-cycle cost, and a few more. Every calculation is worked out in its explanation so you can check it.
- **Required to finish a lesson.** "Mark lesson complete" unlocks only after every checkpoint is answered. It doesn't have to be answered correctly: a wrong answer shows the explanation and a "Try again" option. I didn't hide later sections behind the checkpoints, because people return to lessons as a reference.
- **Saved per account.** Answers persist, the lesson shows "Checkpoints: X of Y answered, Z correct", the dashboard shows overall checkpoint accuracy, and checkpoints you currently have wrong feed the dashboard's "Lessons to review" list.
- **The end-of-lesson block is now a "Lesson review"** of three questions the checkpoints didn't use, so it's fresh recall rather than repetition.
- **Checker rules:** every lesson needs at least three checkpoints; refs must resolve; no repeats within a lesson; no questions that need a data exhibit; and every original question must be well-formed and used.

### A bug I found and fixed along the way
Practice Exam 2 had **two scenario sets missing their scenario text** (questions 65–67, a wastewater facility siting dispute, and 144–146, the "Dana" conflict-of-interest case). Candidates were answering "The concentration of existing burdens in that neighborhood…" with no neighborhood described. I restored both scenarios from `uploads/aicp-practice-exam-2.md`. Exams 1 and 3 were checked and are complete.

### Worth reviewing
- The 24 original checkpoint questions in `web/src/content/aicp/checkpoints.js` are new content. They're short and restate facts from the lessons, but a planner should read them before launch.

---

## Update 2: full-site review

I reviewed the whole site as a candidate would use it: signed in, over several weeks, with test day as the goal. The content was solid, but the product was mostly a library of pages to read. For exam prep that's the weak spot: people retain what they practice recalling, not what they reread, and they need to know what to do next. These changes turn it into a guided study loop.

### What changed and why
- **A real dashboard** (`/aicp/progress`, now the "Dashboard" button in the header) shows what to do next: the lesson to continue, this week's study-plan items, and your diagnostic priorities. It also shows lessons complete, average score, questions answered, flashcards mastered, lesson and accuracy bars for every domain, **lessons to review** (from your missed questions), and recent activity.
- **Lesson completion**, with a "Mark lesson complete" button on each lesson. Completion shows on the course overview (a check mark and a done count per domain), in the study plans, on the dashboard, and in a "Welcome back / Continue" strip on the homepage.
- **"Check yourself" on every lesson:** three standalone questions from the lesson's practice set, answered inline with instant explanations, right after the reading, when recall practice does the most good.
- **Study plans you can follow.** "Follow this plan" highlights the current week, ticks off lessons automatically, and gives practice items checkboxes. Both plans now include the strategy guide in week 1, daily flashcards, and the quick reference in the final week.
- **Missed questions loop back to lessons.** Every attempt records which questions you missed. The results screen and the dashboard then list the lessons that teach them, most-missed first.
- **Exam tips in every lesson** (38 new sections): what the exam tends to ask on the topic and the traps to avoid, drawn only from that lesson's own content.
- **New Review section** (`/aicp/review`):
  - **Exam strategy guide:** question formats, a pacing plan with checkpoints, how to read a question, the "planner's answer" instinct, distractors to distrust, ethics and calculation tactics, study habits, and the last week and exam day.
  - **Flashcards:** 467 cards built automatically from every lesson's Key terms. Sessions deal your weakest cards first (Leitner boxes), with keyboard shortcuts, and progress saved per account.
  - **Quick reference:** landmark cases (split into zoning/constitutional, takings/exactions, and state cases), federal laws in order, people and ideas, formulas, numbers worth memorizing, and 22 commonly confused pairs.
- **Two new Areas of Practice lessons** to fill outline gaps: *Rural, small-town, and tribal planning* and *Infrastructure, energy, and water planning*. The course now has 40 lessons.
- **The Practice page is now a real hub** in study order: find your starting point (diagnostic), warm up (quizzes), rehearse (full exams, with your best and last scores), and target a weak spot (drills, lesson sets, flashcards).
- **Simpler navigation:** Course · Study plan · Practice · Review · Exam info, plus Dashboard. It no longer truncates the brand name at mid widths, and the footer lists the review tools.
- **Formatting fixes:**
  - The lesson table of contents collapses on phones instead of pushing the lesson down.
  - Wide tables scroll sideways on phones instead of squishing.
  - Exam tips are styled as a distinct checklist.
  - The dashboard no longer overflows at 360px.
- **Checker additions:**
  - Every lesson must have Exam tips.
  - Key terms bullets must parse into flashcards.
  - A warning appears if a lesson lacks three standalone questions for its quick check.

### Assumptions in this update
1. **Progress is self-reported.** You mark lessons complete yourself, rather than the site guessing from scroll position, and you tick study-plan practice items yourself. This is simpler, honest, and works with the placeholder accounts.
2. **Quick checks don't count toward scores.** They're for learning, so they're not recorded in your history or the dashboard's accuracy. The full practice sets, quizzes, exams, and drills are recorded.
3. **The review tools are behind the login**, consistent with the rule that only Warm-up Quiz A is open. The Review hub page itself is public, so visitors can see what's offered.
4. **The quick reference only restates facts already in the lessons**, and it carries their VERIFY flags. The strategy guide's pacing checkpoints are my own arithmetic from the published format (about 67 seconds a question leaves roughly 20 minutes for review); they're flagged together with the exam format.
5. **The two new lessons have no outline sub-area codes**, because the repo's outline data doesn't list those Areas of Practice sub-areas. Please match them to APA's outline. Both have VERIFY flags on the details I'm less sure of (right-to-farm coverage, extraterritorial jurisdiction, trust-land jurisdiction, water-supply rules, MS4 terminology, utility regulation).

### Worth doing next
- Replace the placeholder accounts with a hosted provider so progress syncs across devices. Lesson completion, flashcards, and plans all live in `web/src/lib/studyState.js` and would move with history.
- Record the 19 videos.
- Have a credentialed planner review the Exam tips and the quick reference. They're concise, which makes errors easy to spot but also easy to miss.

---

## Update: free for now, accounts, video slots

These changes followed the first build (described below). They supersede anything later in this file about Full Access, pricing, or the question of the day.

### What changed
- **The whole course is free.** One switch, `PAID_TIER_ENABLED` in `web/src/lib/access.js`, is set to `false`. Every lesson, practice set, exam, drill, and the diagnostic is free. The paid-tier code, labels, and pricing page are kept and come back when you flip the switch.
- **Everything except Warm-up Quiz A needs an account.** Signed-out visitors can still use the homepage, course overview, study plans, Exam Info, FAQ, Pricing, About, and Contact, and they can see each lesson's learning objectives. Everything else shows a "Create a free account" prompt, or sends them to sign-in and back to the page they wanted.
  - The diagnostic, domain drills, and progress page are gated at the route level.
  - Quiz B, the three exams, and lesson practice sets are gated in the exam runner.
  - Lesson bodies past the objectives are gated inline.
- **Progress is tracked per account.** History, in-progress exams, and the saved diagnostic are all stored per account. If someone takes Quiz A and then signs up in the same browser, the new account keeps that result. After a quiz, signed-out visitors see a "Save this score" prompt.
- **The question of the day is gone.** I removed the card, its data, and every mention of it. On the homepage its spot now holds a "Try Warm-up Quiz A, no account needed" card.
- **Pricing now says "The whole course is free"** and offers three options: a free account, trying it without an account, and teams and classes (also free). The Pricing link left the header and stays in the footer as "Pricing (it's free)".
- **Video slots:** a new `:::video` block in lesson Markdown adds a "Video coming soon" placeholder for high-impact topics. There are 19 slots in 16 lessons (listed below). Add an embed URL as a third field and the slot becomes a real player.

### Assumptions in this update
1. **"Behind a login" uses placeholder accounts, not real ones.** There's no backend yet, so accounts (with hashed passwords) and progress live in each visitor's browser. That gives you the login wall and per-person progress today. The catch is that accounts don't sync across devices and aren't real security. The site says so plainly: there's an "Accounts placeholder" box on the sign-in page and an FAQ answer about it. **Next step: pick a hosted auth provider** (Supabase is a good fit for a static GitHub Pages site). `web/src/context/AuthContext.jsx` explains exactly what to replace.
2. **The one free quiz is Warm-up Quiz A.** Quiz B needs an account.
3. **I didn't announce future pricing anywhere public.** The site says the course is free and doesn't say it will become paid. One FAQ answer says accounts will move to "a secure online service," so remove that line if you'd rather not commit to it.
4. **I read "for the plans" as the lessons.** The video slots sit inside the lesson pages, at the points where a short video helps most. The study plans link to those lessons, so the videos reach them too.

### Video slots

| Location | Video | Length |
|---|---|---|
| `web/src/content/aicp/lessons/aicp-code-of-ethics.md:30` | Principles versus Rules of Conduct | about 2 min |
| `web/src/content/aicp/lessons/capital-planning-and-finance.md:53` | How tax increment financing works | about 3 min |
| `web/src/content/aicp/lessons/demographic-and-economic-analysis.md:92` | Location quotients and shift-share, worked through | about 4 min |
| `web/src/content/aicp/lessons/environmental-planning-and-hazards.md:21` | The NEPA process: categorical exclusion, EA, or EIS? | about 3 min |
| `web/src/content/aicp/lessons/environmental-planning-and-hazards.md:48` | What a "100-year flood" really means | about 2 min |
| `web/src/content/aicp/lessons/goals-objectives-policies.md:25` | From vision to action: the plan hierarchy | about 2 min |
| `web/src/content/aicp/lessons/growth-management-and-innovative-tools.md:65` | How a TDR program moves development | about 3 min |
| `web/src/content/aicp/lessons/housing-and-community-development.md:47` | How the Low-Income Housing Tax Credit finances a building | about 3 min |
| `web/src/content/aicp/lessons/implementation-math.md:34` | Solving FAR problems step by step | about 4 min |
| `web/src/content/aicp/lessons/implementation-math.md:57` | Gross versus net density | about 3 min |
| `web/src/content/aicp/lessons/land-use-law-foundations.md:29` | Euclid and Nectow: why zoning is valid, and when it isn't | about 3 min |
| `web/src/content/aicp/lessons/planning-history.md:82` | American planning history on one timeline | about 4 min |
| `web/src/content/aicp/lessons/public-engagement-design.md:47` | Arnstein's ladder and the IAP2 spectrum, side by side | about 3 min |
| `web/src/content/aicp/lessons/solving-ethics-questions.md:73` | Working an ethics scenario with the five-step method | about 5 min |
| `web/src/content/aicp/lessons/statistics-for-planners.md:87` | Present value and benefit-cost ratios | about 3 min |
| `web/src/content/aicp/lessons/takings-and-exactions.md:42` | Penn Central's three factors, applied | about 3 min |
| `web/src/content/aicp/lessons/takings-and-exactions.md:74` | Nollan and Dolan: the two-part test for exactions | about 4 min |
| `web/src/content/aicp/lessons/transportation-planning.md:51` | The four-step travel demand model | about 4 min |
| `web/src/content/aicp/lessons/zoning-relief-and-nonconformities.md:30` | Area versus use variances: the hardship test in practice | about 3 min |

---

## Original build (for reference)

This is the hand-off for the build described in `PLAN.md`: what was built, the assumptions behind it, every fact flagged for verification, and what's left.

## Summary of what was built

### Structure
- **All prep content now lives under `/aicp/`.** `/` redirects to `/aicp` for now; replace that redirect in `web/src/App.jsx` with a consulting homepage when it exists. Firm-level pages (`/about`, `/contact`) sit at the root.
- **Old URLs redirect** to their new homes with query strings intact (`/exams`, `/exam/run?…`, `/diagnostic`, `/study` → `/aicp/drills`, `/progress`, `/pricing`, `/signin`), so existing bookmarks and shared links keep working.
- All routes are defined once in `web/src/lib/paths.js`, and navigation config lives in `web/src/lib/nav.js`.

### Design system
- Design tokens are CSS custom properties in `web/src/index.css`, taken from the existing palette and fonts: Bricolage Grotesque and Figtree, navy, blue, and coral, with white cards on `#F6F7FB`. The file also has shared classes for layout, buttons, cards, chips, callouts, long-form prose, the lesson layout, the course list, study-plan weeks, the FAQ, and the footer.
- **New header:** real `<a>` links, `aria-current` on the active item, and a menu toggle below 1100px. **New footer:** a sitemap in three groups and the APA non-affiliation notice.
- **Accessibility:** a skip link; on each route change, scroll to top (or to the `#hash` target) and move focus into the new content; a global `:focus-visible` ring; one `<h1>` per page (verified by the crawl); per-page `<title>`; alt text or `aria-hidden` on every image and SVG. Muted-text colours were checked for AA contrast, and one low-contrast grey was fixed.
- **Mobile:** every page was checked at 360px wide with no horizontal overflow.

### Course
- **38 lessons across the 9 domains** (`web/src/content/aicp/lessons/*.md`, with metadata in `web/src/content/aicp/curriculum.js`). Each lesson has learning objectives, key concepts, key terms, real-world examples, and a summary; several also have exam tips or worked calculations. The shared template (`web/src/pages/aicp/LessonPage.jsx`) adds the domain badge, the outline sub-areas, the reading time, an "In this lesson" table of contents, a practice block, and Previous/Next navigation that runs across the whole course. Lessons total roughly 53,000 words.
- **Lesson practice sets:** 544 question references that map every lesson to real questions from Practice Exams 1–3. They run in the existing exam runner at `/aicp/exam/run?set=<slug>`. Free lessons serve only the questions that already appear in the free warm-up quizzes, so no paid question is given away.
- **Course overview** (`/aicp/course`): every lesson grouped by domain, with weights, reading times, and free or paid status.
- **Study plans** (`/aicp/study-plan`): an 8-week and a 12-week plan, each covering all 38 lessons exactly once, plus the diagnostic, both quizzes, drills, and all three exams.
- **The diagnostic report** now links each ranked domain to its lessons. **Exam results** link the weakest domain to its lessons, and a lesson practice set returns you to its lesson. The practice-exam and drills pages link to the course.

### Supporting pages
- **Prep homepage** (`/aicp`): what the course offers, who it's for, how it works, how the exam is weighted, the diagnostic promo, the question of the day, and calls to action.
- **Exam Info** (`/aicp/exam-info`): format, scoring, eligibility, registration, exam day, and certification maintenance, pointing to APA as the authority throughout.
- **FAQ** (`/aicp/faq`), **Pricing** (`/aicp/pricing`, with three tiers), **About** (`/about`), and **Contact** (`/contact`).

### Tooling
- **Build-time Markdown rendering** (a Vite plugin plus `web/scripts/markdown.mjs`). No Markdown parser ships to the browser, and each lesson body is its own lazily loaded chunk. `marked` was added as a dev dependency.
- **`npm run check`** (`web/scripts/check-content.mjs`) validates every lesson's required sections and their order, practice references, free-quiz membership, study-plan coverage, internal links, query parameters, anchors, and VERIFY reasons. I confirmed it fails on deliberately broken input.
- **Verification before finishing:** `npm run build` passes. `npm run lint` reports no errors (the warnings that remain were there before this build). `npm run check` passes. A headless-browser crawl of the production build visited 80 URLs with **zero broken internal links, zero missing anchors, zero pages with more or fewer than one `<h1>`, and no mobile overflow**. The only console errors came from the sandbox blocking Google Fonts. Functional tests covered the paid gate and demo unlock, a paid 18-question practice set, a free 3-question practice set, and Previous/Next navigation with scroll reset.

### Existing content I changed (worth knowing)
- The question of the day was tagged "Areas of Practice" but is an ethics question, so it's now tagged Code of Ethics.
- The exam results screen used to say "Passing range" and "You cleared the range where candidates typically pass" for scores of 70% or more. APA doesn't publish a passing percentage, and the site's own diagnostic says so, so the screen now reads "70% or better" and presents 70% as a practice benchmark rather than a prediction.
- The old landing page (`Landing.jsx`) was replaced by the prep homepage. Its question-of-the-day card now lives in `components/QuestionOfTheDay.jsx`. Stale copy on the old landing and pricing pages ("340 questions across two exams", "Two full-length exams") was corrected to reflect three exams.
- "Study by domain" was renamed "Domain drills" (at `/aicp/drills`) so it isn't confused with the course lessons.
- The sign-in page now carries a visible "Accounts placeholder" notice.

## Assumptions

1. **The content outline.** I used the nine domains, weights, and sub-area codes already in the repo (`uploads/aicp-diagnostic-exam-spec.md` and `uploads/aicp-diagnostic-DIAG-1.0-items.csv`), not outside knowledge. **Please check these against APA's official outline:**

   | # | Domain | Weight |
   |---|---|---|
   | 1 | Research and Assessment Methods | 11% |
   | 2 | Fundamental Planning Knowledge | 15% |
   | 3 | Communication and Interaction | 13% |
   | 4 | Plan and Policy Development | 15% |
   | 5 | Plan Implementation | 12% |
   | 6 | Administration and Management | 6% |
   | 7 | Leadership | 6% |
   | 8 | Areas of Practice | 12% |
   | 9 | AICP Code of Ethics and Professional Conduct | 10% |

   Lessons list only the outline sub-area codes that appear in the repo's diagnostic CSV; I didn't invent codes for sub-areas I couldn't confirm. The CSV has two different "7.6" labels ("A planner's comprehensive approach to complex problems" and "The ethics of equity, diversity, and inclusivity in practice"). It also uses 8.19, although the spec says Areas of Practice has 18 sub-areas. Worth checking against APA's outline.
2. **Course order follows outline order** (domain 1 first), matching the diagnostic. The study plans use a teaching order instead, starting with history, law, and ethics.
3. **Free versus paid:** the first lesson in each domain is free (9 lessons), and the rest are Full Access. Lesson practice sets on free lessons give free users only the questions already in the free quizzes.
4. **One paid tier.** Full Access keeps the existing `$59` placeholder (`PRICE` in `web/src/data/domains.js`), with "one time, no renewal", "access until your test date", and "refund within 7 days" carried over from the existing page. I added a "Teams and agencies: let's talk" tier with no price. All prices are placeholders.
5. **The membership placeholder** is visible to visitors: a dashed box labelled "Membership placeholder" with a demo unlock, as you asked for a clearly marked placeholder. Gated lesson text still ships in the JavaScript bundle, so real protection needs server-side delivery.
6. **Contact:** no email address was available, so the page shows a "Contact placeholder" until `CONTACT_EMAIL` is set in `web/src/content/site.js`. I didn't use your personal email.
7. **About:** I wrote no founder biography, to avoid inventing details. There's a `<!-- PLACEHOLDER -->` comment in `web/src/content/pages/about.md` where a bio should go.
8. **Lessons are Markdown files** with metadata in `curriculum.js`, rather than JSX. This keeps them easy for you to edit and lets `<!-- VERIFY -->` comments work naturally; they also end up in the page as invisible HTML comments.
9. **Real-world examples are illustrative composites** ("a city", "a county"). None describes a real, named jurisdiction's project, so none can be mistaken for a factual claim. Named cases, statutes, and people are real, and anything I wasn't sure of is flagged below.
10. **The root prototype files** (`*.dc.html`, `support.js`, and the root-level `*.js` banks) and `uploads/` were left untouched, as reference material.
11. **Deployment is unchanged.** The existing GitHub Actions Pages workflow builds `web/` on every push to `main`, and the SPA 404 redirect already handles `/aicp/...` deep links. I pushed to the working branch, not `main`, so nothing is live until you merge.

## VERIFY flags

There are 94 flags. Find them with `grep -rn "VERIFY:" web/src`. Most flag well-known facts whose details change, such as APA exam logistics, federal rules that shifted in 2025, and attributions. Exam Info and the ethics lessons deserve the closest review, because APA's current documents decide them.

| Location | What to check |
|---|---|
| `web/src/content/aicp/lessons/aicp-code-of-ethics.md:1` | confirm the current Code version (a revised Code took effect in 2021, with later amendments possible) and link to it. |
| `web/src/content/aicp/lessons/aicp-code-of-ethics.md:15` | confirm to whom the Code currently applies (AICP members, and whether candidates are covered). |
| `web/src/content/aicp/lessons/aicp-code-of-ethics.md:46` | confirm that the current Code's principles include explicit language on racial and economic equity and on eliminating historic inequities. |
| `web/src/content/aicp/lessons/aicp-code-of-ethics.md:63` | the wording and grouping of these principles are paraphrased from our understanding of the Code; check each against the current text. |
| `web/src/content/aicp/lessons/aicp-code-of-ethics.md:86` | confirm the current names and process for informal advice and formal advisory opinions under the Code's procedures. |
| `web/src/content/aicp/lessons/aicp-code-of-ethics.md:97` | confirm the current complaint procedure steps, the name of the deciding body, and the list of available sanctions (for example, whether a "letter of admonition" still exists). |
| `web/src/content/aicp/lessons/comprehensive-plans.md:52` | confirm the names of the principles and processes in APA's Comprehensive Plan Standards for Sustaining Places, and whether APA has updated them. |
| `web/src/content/aicp/lessons/comprehensive-plans.md:64` | confirm which states to cite as consistency states (Oregon, Florida, and California are commonly cited) and how each applies the requirement. |
| `web/src/content/aicp/lessons/conflicts-of-interest-and-rules-of-conduct.md:1` | check each paraphrased rule theme below against the current Rules of Conduct text. |
| `web/src/content/aicp/lessons/consensus-and-negotiation.md:87` | this five-part typology is usually attributed to Christopher Moore's "circle of conflict"; confirm the attribution if named. |
| `web/src/content/aicp/lessons/economic-development.md:60` | this is the Main Street America "Four Point Approach"; confirm current terminology if named. |
| `web/src/content/aicp/lessons/economic-development.md:93` | Opportunity Zone rules were modified by 2025 federal tax legislation; confirm current program terms before describing details. |
| `web/src/content/aicp/lessons/economic-development.md:95` | confirm the current status of the New Markets Tax Credit and EDA programs if expanded. |
| `web/src/content/aicp/lessons/environmental-planning-and-hazards.md:19` | federal NEPA implementing procedures changed substantially in 2025 (CEQ regulations rescinded, agency procedures revised); confirm the current process terms before publishing detailed steps. |
| `web/src/content/aicp/lessons/environmental-planning-and-hazards.md:60` | confirm the five-year update cycle and which FEMA grant programs currently require an approved plan. |
| `web/src/content/aicp/lessons/equitable-and-accessible-engagement.md:43` | confirm the current status of federal LEP guidance (Executive Order 13166 and agency guidance), which may have changed in 2025. |
| `web/src/content/aicp/lessons/equitable-and-accessible-engagement.md:44` | federal environmental justice executive orders have been revoked or amended since 2025; confirm the current status of EO 12898 before relying on it. |
| `web/src/content/aicp/lessons/equitable-and-accessible-engagement.md:61` | confirm the 2024 DOJ Title II web accessibility rule's standard (WCAG 2.1 AA) and its current compliance dates. |
| `web/src/content/aicp/lessons/federal-policy-and-planning.md:24` | confirm the "workable program" requirement is correctly attributed to the Housing Act of 1954. |
| `web/src/content/aicp/lessons/federal-policy-and-planning.md:31` | confirm the 1962 Act as the origin of the 3C planning requirement. |
| `web/src/content/aicp/lessons/goals-objectives-policies.md:67` | "targeted universalism" is commonly attributed to john a. powell; confirm before attributing. |
| `web/src/content/aicp/lessons/growth-management-and-innovative-tools.md:22` | confirm the SmartCode transect zone numbering (T1–T6) and names if you want to teach them precisely. |
| `web/src/content/aicp/lessons/growth-management-and-innovative-tools.md:34` | performance zoning is often associated with Lane Kendig's work in Bucks County, Pennsylvania, in the 1970s; confirm before attributing. |
| `web/src/content/aicp/lessons/growth-management-and-innovative-tools.md:80` | Florida's statewide concurrency mandate was substantially relaxed in 2011 (except for certain facilities); confirm the current status before describing it. |
| `web/src/content/aicp/lessons/growth-management-and-innovative-tools.md:92` | confirm details sometimes cited for these cases (Ramapo's roughly 18-year capital program; Petaluma's cap of about 500 units a year) before adding them. |
| `web/src/content/aicp/lessons/health-food-parks-and-regional-planning.md:43` | confirm the USDA food access thresholds (commonly 1 mile urban / 10 miles rural, with additional 0.5- and 20-mile variants) before citing numbers. |
| `web/src/content/aicp/lessons/health-food-parks-and-regional-planning.md:68` | service radii by park type vary by source (older NRPA guidance); confirm figures before citing specific distances beyond the neighborhood park range. |
| `web/src/content/aicp/lessons/health-food-parks-and-regional-planning.md:80` | confirm the descriptions of Portland Metro and the Twin Cities Metropolitan Council if expanded. |
| `web/src/content/aicp/lessons/health-food-parks-and-regional-planning.md:84` | the Twin Cities Fiscal Disparities program (1971) is the usual example; confirm before naming it. |
| `web/src/content/aicp/lessons/housing-and-community-development.md:24` | HUD's extremely low/very low/low categories are 30/50/80% of area median; "moderate" is defined by individual programs and states. Confirm wording if used for specific programs. |
| `web/src/content/aicp/lessons/housing-and-community-development.md:41` | LIHTC was created by the Tax Reform Act of 1986; confirm current affordability periods and the 9%/4% credit structure if added. |
| `web/src/content/aicp/lessons/housing-and-community-development.md:63` | HUD's AFFH rule has been issued, rescinded, and reissued several times; confirm its current status before describing specific requirements. |
| `web/src/content/aicp/lessons/housing-and-community-development.md:69` | Mount Laurel I is usually dated 1975 and Mount Laurel II (builder's remedy) 1983; confirm before adding dates. |
| `web/src/content/aicp/lessons/implementation-math.md:148` | confirm what calculator tools are available on the current exam. |
| `web/src/content/aicp/lessons/infrastructure-energy-and-water-planning.md:39` | some states (for example, California and Arizona) require water supply assessments or assured supply for large developments; confirm before naming them. |
| `web/src/content/aicp/lessons/infrastructure-energy-and-water-planning.md:52` | MS4 = municipal separate storm sewer system permits under the NPDES program; confirm terminology before expanding. |
| `web/src/content/aicp/lessons/infrastructure-energy-and-water-planning.md:62` | confirm the general statement that investor-owned utilities are regulated by state public utility commissions. |
| `web/src/content/aicp/lessons/land-use-law-foundations.md:67` | confirm the holding summary for City of Austin v. Reagan National Advertising of Austin (2022). |
| `web/src/content/aicp/lessons/leadership-in-planning.md:22` | adaptive leadership is usually attributed to Ronald Heifetz; confirm before attributing. |
| `web/src/content/aicp/lessons/mentoring-and-professional-development.md:74` | confirm the current CM total, reporting period, and each required topic minimum (historically 1.5 ethics, 1.5 law, 1 equity, 1 sustainability and resilience). |
| `web/src/content/aicp/lessons/mentoring-and-professional-development.md:75` | confirm which advanced specialty certifications AICP currently offers. |
| `web/src/content/aicp/lessons/planning-history.md:28` | the "make no little plans" quotation's attribution to Burnham is disputed; keep the "popularly attributed" hedge or remove. |
| `web/src/content/aicp/lessons/planning-history.md:37` | Hartford 1907 as the first official municipal planning commission is commonly cited; confirm before publishing. |
| `web/src/content/aicp/lessons/planning-history.md:39` | SZEA publication history is given variously as 1922, 1924, and 1926; confirm the dates you want to teach. |
| `web/src/content/aicp/lessons/planning-history.md:78` | Oregon's statewide land use planning law (Senate Bill 100) is commonly dated to 1973; confirm. |
| `web/src/content/aicp/lessons/planning-history.md:84` | confirm the founding years 1917 (ACPI/AIP) and 1934 (ASPO). |
| `web/src/content/aicp/lessons/planning-history.md:88` | confirm CNU's founding year (1993). |
| `web/src/content/aicp/lessons/planning-history.md:89` | confirm Maryland Smart Growth program year (1997). |
| `web/src/content/aicp/lessons/planning-theory.md:51` | Krumholz served as Cleveland planning director roughly 1969–1979, and the Cleveland Policy Planning Report is usually dated 1975; confirm if dates are added. |
| `web/src/content/aicp/lessons/planning-theory.md:70` | confirm the conflict labels in Campbell's planner's triangle (property, resource, development) and the 1996 date. |
| `web/src/content/aicp/lessons/project-and-contract-management.md:63` | the federal QBS requirement for A/E services comes from the Brooks Act (1972); confirm it applies to the planning services in question. |
| `web/src/content/aicp/lessons/research-design-and-data.md:50` | confirm that the 65,000-population threshold for ACS 1-year estimates is current, and that the 3-year product remains discontinued. |
| `web/src/content/aicp/lessons/rural-small-town-and-tribal-planning.md:26` | confirm the claim that most states have right-to-farm laws. |
| `web/src/content/aicp/lessons/rural-small-town-and-tribal-planning.md:42` | extraterritorial jurisdiction exists in some states (for example, Texas and North Carolina historically); confirm before naming states. |
| `web/src/content/aicp/lessons/rural-small-town-and-tribal-planning.md:48` | the USDA Rural Development programs are the usual federal source; confirm current program names if cited. |
| `web/src/content/aicp/lessons/rural-small-town-and-tribal-planning.md:57` | confirm this general statement on the application of state and local zoning to trust land; jurisdiction over fee land within reservations is complex and case-specific. |
| `web/src/content/aicp/lessons/subdivision-and-development-review.md:57` | vesting rules vary widely by state; if specific states are named, confirm them. |
| `web/src/content/aicp/lessons/transportation-planning.md:28` | confirm current federal rules on MTP update cycles (commonly every 4 years in nonattainment/maintenance areas and 5 in attainment areas) and the minimum TIP period (4 years). |
| `web/src/content/aicp/lessons/transportation-planning.md:62` | California's SB 743 (2013) directed the shift from LOS to VMT for CEQA transportation analysis; confirm details if expanded. |
| `web/src/content/aicp/lessons/urban-design-and-historic-preservation.md:71` | this is Section 4(f) of the Department of Transportation Act of 1966; confirm wording before naming it. |
| `web/src/content/aicp/lessons/urban-design-and-historic-preservation.md:96` | confirm the credit remains 20% and the current rules on claiming it (spread over five years since 2017), and that the 10% non-historic credit remains repealed. |
| `web/src/content/aicp/lessons/zoning-relief-and-nonconformities.md:47` | identify which states currently follow Fasano if a list is added. |
| `web/src/content/pages/exam-info.md:1` | confirm this URL is still APA's main AICP certification page. |
| `web/src/content/pages/exam-info.md:21` | domain names and weights are taken from uploads/aicp-diagnostic-exam-spec.md in this repo; confirm them against APA's current published content outline. |
| `web/src/content/pages/exam-info.md:28` | confirm the current question count and time limit with APA. |
| `web/src/content/pages/exam-info.md:29` | confirm that APA still includes unscored pretest items, and how many. |
| `web/src/content/pages/exam-info.md:30` | confirm the current vendor (historically Prometric) and whether remote proctoring is still offered. |
| `web/src/content/pages/exam-info.md:31` | confirm APA's current scoring policy on unanswered questions. |
| `web/src/content/pages/exam-info.md:35` | confirm the current score scale and passing score with APA. |
| `web/src/content/pages/exam-info.md:53` | the education/experience table reflects APA's historical requirements; confirm every row against APA's current eligibility rules before publishing. |
| `web/src/content/pages/exam-info.md:55` | confirm APA's current definition of qualifying professional planning experience. |
| `web/src/content/pages/exam-info.md:57` | confirm the current name, rules, and availability of APA's candidate program for students and recent graduates. |
| `web/src/content/pages/exam-info.md:59` | confirm whether APA membership is required to apply for, take, or hold AICP certification. |
| `web/src/content/pages/exam-info.md:66` | confirm whether the application still requires written responses about experience (historically called "criteria" essays). |
| `web/src/content/pages/exam-info.md:69` | confirm APA's accommodation request process and deadline. |
| `web/src/content/pages/exam-info.md:70` | confirm current testing window months. |
| `web/src/content/pages/exam-info.md:83` | confirm calculator and scratch-paper policies with APA's current candidate guide. |
| `web/src/content/pages/exam-info.md:87` | confirm the current CM credit total, reporting period, and required topic credits. |
| `web/src/content/pages/exam-info.md:91` | confirm URL. |
| `web/src/content/pages/exam-info.md:92` | confirm URL. |
| `web/src/content/pages/exam-info.md:93` | confirm URL. |
| `web/src/content/pages/exam-strategy.md:5` | confirm the current question count, time limit, and format with APA. |
| `web/src/content/pages/exam-strategy.md:38` | confirm APA's current scoring policy on unanswered questions. |
| `web/src/content/pages/exam-strategy.md:89` | confirm calculator policy with APA's current candidate guide. |
| `web/src/content/pages/exam-strategy.md:112` | confirm APA still includes unscored pretest items. |
| `web/src/content/pages/quick-reference.md:22` | confirm this holding summary. |
| `web/src/content/pages/quick-reference.md:56` | Mount Laurel I is usually dated 1975 and Mount Laurel II 1983. |
| `web/src/content/pages/quick-reference.md:62` | SZEA publication dates are given variously as 1922, 1924, and 1926. |
| `web/src/content/pages/quick-reference.md:68` | confirm the 1962 Act as the origin of the 3C requirement. |
| `web/src/content/pages/quick-reference.md:81` | LIHTC is usually dated to the Tax Reform Act of 1986. |
| `web/src/content/pages/quick-reference.md:169` | confirm the current question count and time limit with APA. |
| `web/src/content/pages/quick-reference.md:170` | confirm the credit remains 20%. |
| `web/src/content/pages/quick-reference.md:171` | confirm the five-year update cycle. |
| `web/src/content/pages/quick-reference.md:172` | confirm the current CM requirement. |

Other placeholders, which aren't VERIFY flags:
- `web/src/content/pages/about.md` has `<!-- PLACEHOLDER -->` for the founder bio.
- `web/src/content/site.js` has `CONTACT_EMAIL = null`.
- `web/src/pages/Pricing.jsx` has `PLACEHOLDER PRICE` comments.
- `web/src/hooks/useMembership.js` has a `MEMBERSHIP PLACEHOLDER` comment (future paid tier).
- Lesson Markdown has 19 `:::video` slots (listed at the top of this file).

## Not finished, and suggested next steps

1. **Fact-check the VERIFY list,** starting with `web/src/content/pages/exam-info.md` (eligibility, format, scoring, windows) and the three ethics lessons against the current AICP Code. Remove each flag once it's confirmed.
2. **Have a subject-matter expert review the lessons.** I wrote them carefully, but a planner with AICP credentials should review the law lessons in particular (lessons 8, 9, and 20), since case holdings are summarized briefly.
3. **Accounts:** replace the browser-only placeholder in `web/src/context/AuthContext.jsx` with a hosted auth provider, and move progress history to its database so it syncs across devices. Later, for paid plans, set `PAID_TIER_ENABLED` in `web/src/lib/access.js` and replace the check in `web/src/hooks/useMembership.js` with a real membership check.
3a. **Videos:** record the 19 videos listed at the top, then add each embed URL as the third field of its `:::video` line.
4. **Set the contact email and the founder bio** (and real prices in `PRICE`, `web/src/data/domains.js`, when paid plans launch).
5. **Improve practice coverage:** some lessons have small practice sets (Implementation math has 7 questions; Research design has only 2 free ones). Consider writing new questions targeted to specific lessons, and tagging exam questions with lesson slugs directly.
6. **SEO:** the app sets per-page titles, but meta descriptions and canonical URLs are still global (`web/index.html`). Pre-rendering or per-route meta would help lessons get indexed.
7. **Consulting homepage:** when it's ready, add it at `/` in `web/src/App.jsx` (replacing the redirect), add a firm group to `FOOTER_NAV`, and consider a firm-level header nav alongside `AICP_NAV`.
8. **Nice to have:** a collapsible "In this lesson" menu on phones (it currently sits above the lesson body); lesson completion tracking on the Progress page; and a print stylesheet for lessons.
9. **Lint warnings that were already there** (unused `catch (e)` parameters, a React Compiler memoization note in the diagnostic hook) are untouched.
