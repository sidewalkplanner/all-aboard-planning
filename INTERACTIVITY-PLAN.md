# Interactive lessons: the plan

Status: **approved; batch 1 built** (the `:::try` block and checker rules, Before you go, Try it
with live sketches for the 11 calculators plus bid-rent, and Sort it with 4 sorts). Next: batch 2.
Changes from the proposal: `affordability` moved to the housing lesson (Measuring affordability)
so Implementation math keeps three pieces; `rate-times-size` became `parking`.

## The idea in one paragraph

Reading a lesson feels like understanding it. Remembering it takes *doing* something with the
material: sorting look-alike ideas apart, applying a legal test to facts, putting steps in
order, catching mistakes, and pulling terms back out of memory a few minutes later. So every
interactive piece should make the reader **decide something** before it shows the answer, and
each one should teach **one idea the text can't teach as well**. That rules out "click to
reveal" boxes and decorative animation, and it means most sections get nothing. Checkpoints
stay the graded part; everything here is ungraded practice.

## The toolkit: seven kinds, plus two site-wide features

Every kind is placed in a lesson with one Markdown line, `:::try <id>`, and defined as data
in `src/content/aicp/interactives/` (one file per kind). One block and one registry keep the
authoring simple, and `npm run check` validates them the way it validates checkpoints.

### 1. Try it: live sketches and calculators (reuses the WIP calculator)

Sliders and number boxes redraw a hand-inked drawing, with the results and the worked steps
underneath. Two tabs:

- **Explore** starts at the lesson's worked example. Move a slider and watch the building,
  curve, or bar change. Each opens with a one-line *predict first* prompt ("What happens to
  the number of stories if coverage drops to 25%?"), which the slider then answers.
- **Your turn** generates a fresh problem with exam-style numbers, you type the answer, and it
  checks you and shows the steps with your numbers. Working a problem yourself sticks far better
  than watching a calculator do it.

**Teaches well:** formulas, and any relationship between a number and a shape: FAR and
building mass, bid-rent rings, flood odds over a mortgage, discounting, the TIF increment, float
on a critical path.

**The technical bet:** the drawings use the same ink kit as the figures (`art/lib/draw.mjs`
is plain JavaScript and runs in the browser), so live sketches match the static art exactly.
I timed it: fully re-inking a 24-shape scene takes about 12 ms on this server, which could
approach 40 ms on a phone. So static parts are inked once, moving parts are pre-inked pieces
that are reused and repositioned (a building is a stack of inked slabs), strokes are seeded so
nothing shimmers while you drag, and redraws wait for the next animation frame.

### 2. Sort it

A deck of short situations, dealt one card at a time, each sent to one of 2 to 5 labeled piles
(index cards into kraft envelopes). A wrong card gets a one-line reason and goes back to the
bottom of the deck, so you finish only once you've placed every card correctly. The piles fill
up visibly.

**Teaches well:** telling look-alike categories apart, which is the most common exam trap:
area vs. use variance, goal/objective/policy/action, IAP2 levels, positions vs. interests, rule
vs. principle, Scope 1/2/3, the four preservation treatments.

One card at a time, with the piles as big buttons, works at 360px with thumbs, keyboard, and
screen readers. I'd skip drag-and-drop entirely: it's fiddly on phones and hard to make
accessible, and tapping teaches just as well.

### 3. Line it up

Steps are drawn as stations on a transit line. You pick **which stop comes next** from the
shuffled remainder; a wrong pick gets a hint and you try again. The line grows as you go.

**Teaches well:** sequences the exam tests: the planning process, Section 106, Kotter's eight
steps, the motion sequence, chronologies of federal law.

This replaces the step-through timeline idea (see "What I'd skip").

### 4. Walk the test

A fact pattern goes through a legal test gate by gate (turnstiles, matching the gate figures
already in the lessons). At each gate you decide yes or no from the facts, then see why. Each
test has two or three fact patterns that end differently, so you see the test pass and fail.

**Teaches well:** multi-part legal tests, the heart of the law lessons: the variance findings,
the takings route (Loretto, then Lucas, then Penn Central), Nollan/Dolan, and the NEPA path.

### 5. You're the planner

A short branching scenario with two or three decision points. Each choice has consequences,
and the path ends with a stamp: **Too passive**, **By the book**, or **Too aggressive**, plus the
Code provision or procedural rule involved. You can replay a different path.

**Teaches well:** judgment calls: ethics, hearings, open meetings, running a heated meeting.
The exam's ethics questions reward the proportionate, proper-channels answer, and this lets you
feel what the other answers lead to.

Walk the test and You're the planner share one engine (nodes with choices), shown in two looks.

### 6. Red pen

A realistic short document (a staff report, a draft survey, a meeting flyer, a sign ordinance,
a policy draft) with some phrases you can tap to mark as problems. Then **Check my marks**
shows red-pencil notes in the margin: problems you found, problems you missed, and false alarms.

**Teaches well:** the "which of these is best practice" questions, and it's the closest thing
to real planning work in the whole course.

### 7. Find it (use sparingly)

A drawn scene with numbered spots. Each prompt ("Which spot is an edge?") is answered by
tapping a spot. **Teaches well:** concepts that are inherently spatial: Lynch's five elements
and CPTED. It needs new, unlabeled art for each use, so I'm limiting it to those two.

### Site-wide A: "Before you go" recall cards (every lesson, no authoring)

At the end of each lesson, just above "Mark lesson complete," five of that lesson's key-term
flashcards: see the term, recall the definition, flip, and rate yourself "Got it" or "Not yet."
The ratings feed the same Leitner boxes as the Flashcards page, so the lesson hands its terms
to the spaced-review system automatically. It's cheap to build, applies to all 40 lessons, and
of everything here it probably does the most for retention.

### Site-wide B: "Cover the answers" on reference tables

A toggle on the Quick reference tables (cases, laws, people and ideas, numbers, confused pairs)
and on the lessons' "at a glance" tables that hides the answer column. Tap a row to reveal
it. It's the digital version of covering the page with your hand, and it turns the cram sheet
into a self-test.

### What I'd skip, and why

- **Step-through timelines.** Clicking "Next" through dates is reading with extra steps.
  Chronology becomes *Line it up* (order the laws) or *Sort it* (put events in their era).
- **Before/after drag sliders.** They hide half the comparison at any moment, and the
  side-by-side figures (road diet, cluster subdivision, form-based code) already do this better.
  Where a live sketch needs two states, it gets a two-button toggle instead.
- **Click-to-reveal boxes** (the empty `reveals.js` in the WIP). With nothing to commit to,
  readers skip straight to the answer. I'd delete that registry.
- **Drag-and-drop**, for the reasons above.
- **Points, streaks, leaderboards.** It's practice. A finished piece gets a stamp; that's all.
- **Simulations with invented behavior** (a mini-SimCity for induced demand, say). They look
  authoritative and teach made-up dynamics. Live sketches only animate models the lessons
  actually teach, and invented numbers say "illustrative."
- **Interactive versions of existing figures** just because we can. Most figures are right as
  they are.
- Crosswords, word searches, and the like.

## Where they go

Aim: **one to three per lesson, and zero where nothing beats the text.** About 55 pieces
across 40 lessons. Every placement sits after the section it practices and before that
section's checkpoint, so practice comes first and the graded question follows. The `id`s are
working names.

**Priority:** ★ = first batch, ● = batch 2 to 3, ○ = later or optional.

### Module 1: Research and Assessment Methods

| Lesson | Section | Piece | Kind |
|---|---|---|---|
| Research design and data | Types of research design | ● `sort-research-design`: studies into descriptive, explanatory, or evaluative | Sort it |
| | Bias and error | ● `red-survey`: a six-question draft survey; mark the leading, double-barreled, and loaded questions | Red pen |
| Statistics for planners | Levels of measurement | ★ `sort-levels`: variables into nominal, ordinal, interval, ratio | Sort it |
| | Rates, growth, and constant dollars | ★ `pct-change` (WIP): percent change vs. percentage points | Try it |
| | Discounting | ★ `present-value` (WIP) + shrinking-coins drawing | Try it |
| | Relationships between variables | ○ `correlation`: an r slider redraws the scatter and reads out r² | Try it |
| Demographic and economic analysis | Cohort-component method | ● `pyramid`: "age the pyramid" five years at a time, with fertility and migration sliders (illustrative) | Try it |
| | People to households to housing | ★ `households` (WIP) | Try it |
| | Location quotient | ★ `lq` (WIP) + bars | Try it |
| | Shift-share | ● `shift-share`: the three components as a stacked bar | Try it |
| | Measuring segregation | ○ `dissimilarity`: move households between four tracts and watch D change | Try it |
| Spatial analysis and GIS | Mapping without misleading | ● `class-breaks`: one illustrative map; switch equal interval, quantile, and natural breaks, then counts vs. rates | Try it |
| | The gravity model | ● `gravity`: resize and move two centers, starting from the figure's numbers | Try it |
| | Choosing the right chart | ○ `sort-charts`: data situations into line, bar, pie, scatter, map | Sort it |

### Module 2: Fundamental Planning Knowledge

| Lesson | Section | Piece | Kind |
|---|---|---|---|
| Planning history | (end of Key concepts) | ● `sort-history-eras`: ten event tickets onto the lesson's numbered eras, drawn as stations | Sort it |
| Planning theory | Theory at a glance | ● `sort-theorists`: "Who would say it?" stances into theories; plus Cover the answers on the table | Sort it |
| Urban form and settlement | Von Thünen and bid-rent | ★ `bid-rent`: three bid lines; cheapen commuting and watch the residential ring spread out (suburbanization in one slider). The section has no figure today. | Try it |
| | How people read the city | ○ `find-lynch`: unlabeled town; find the path, edge, district, node, landmark | Find it |
| Land use law foundations | The First Amendment | ● `red-sign-code`: a sign ordinance; mark the content-based rules (*Reed*) | Red pen |
| | (after Other doctrines) | ○ `sort-which-clause`: disputes into due process, equal protection, First Amendment, takings | Sort it |
| Takings and exactions | Per se takings | ● `test-takings`: three regulations down the takings route | Walk the test |
| | Exactions | ● `test-nollan-dolan`: three permit conditions through nexus and rough proportionality | Walk the test |
| Federal policy | (Real-world examples) | ● `order-federal-laws`: six landmark laws in date order | Line it up |

### Module 3: Communication and Interaction

| Lesson | Section | Piece | Kind |
|---|---|---|---|
| Public engagement design | The IAP2 spectrum | ★ `sort-iap2`: promises to the public into inform, consult, involve, collaborate, empower | Sort it |
| Equitable and accessible engagement | Three kinds of equity | ○ `sort-equity`: procedural, distributive, structural | Sort it |
| | Accessible materials | ● `red-flyer`: a meeting flyer; mark the barriers (contrast, text in an image, time, place, language, no accommodation contact) | Red pen |
| Consensus and negotiation | Positions and interests | ● `sort-positions-interests` | Sort it |
| | Third-party help | ○ `sort-adr`: who decides? facilitation, mediation, arbitration | Sort it |
| | Responding to opposition | ● `scene-heated-meeting`: facilitate a meeting going sideways | You're the planner |
| Communicating with decision-makers | The staff report | ● `red-staff-report`: buried recommendation, comments counted as votes, findings missing, a denial recommended for a compliant project | Red pen |
| | How a public body conducts business | ○ `order-motion`: motion, second, debate, amendment, vote | Line it up |
| | Hearings, notice, and the record | ● `scene-hearing`: a quasi-judicial hearing with an ex parte contact and a late exhibit | You're the planner |

### Module 4: Plan and Policy Development

| Lesson | Section | Piece | Kind |
|---|---|---|---|
| The planning process | The typical sequence | ● `order-planning-process` | Line it up |
| | Strategic vs. comprehensive plans | ○ `sort-swot`: findings into strengths, weaknesses, opportunities, threats | Sort it |
| Goals, objectives, and policies | The plan hierarchy | ★ `sort-goal-objective-policy`: statements into goal, objective, policy, action | Sort it |
| | Drafting policy | ● `red-policy-draft`: "should" where "shall" is meant, an objective with no measure or date | Red pen |
| Plan analysis tools | Buildable lands | ● `buildable-land`: gross acres, minus constraints, times density, compared with need (a waterfall) | Try it |
| | Greenhouse gas inventories | ● `sort-ghg-scopes` | Sort it |
| Comprehensive plans | — | Figures only (see below) | |

### Module 5: Plan Implementation

| Lesson | Section | Piece | Kind |
|---|---|---|---|
| Zoning fundamentals | Dimensional standards | ● `envelope`: "Which limit binds?" Setbacks, height, coverage, and FAR on one lot; the building grows to the largest allowed and the binding limit lights up | Try it |
| | Who administers zoning | ★ `sort-who-decides`: requests to administrator, planning commission, board of adjustment, governing body | Sort it |
| Zoning relief | Variances | ★ `test-variance`: "You sit on the board of adjustment": three requests through the five findings | Walk the test |
| | Rezonings | ○ `sort-legislative-quasi`: legislative, quasi-judicial, or administrative | Sort it |
| Subdivision and development review | Private restrictions | ○ `sort-zoning-covenant`: public rule or private restriction, and who enforces it | Sort it |
| Growth management | Transfer of development rights | ● `tdr`: credits from a farm become bonus floors downtown | Try it |
| | Growth management | ○ `sort-growth-tools`: situations into IZ, TDR, PDR, UGB, adequate facilities | Sort it |
| Implementation math | FAR | ★ `far` (WIP) + building massing drawing | Try it |
| | Gross and net density | ★ `density` (WIP) + site drawing with streets removed | Try it |
| | Parking; trip generation | ★ `rate-times-size` (new): spaces or trips from size × rate, with the parking land drawn to scale | Try it |
| | Housing affordability | ★ `affordability` (WIP) | Try it |
| Capital planning and finance | Tax increment financing | ● `tif`: the base freezes, the increment grows; see who gets what each year | Try it |
| | Paying for capital projects | ○ `sort-funding`: projects into GO bond, revenue bond, special assessment, impact fee | Sort it |
| Monitoring | Monitoring and evaluation | ○ `sort-measures`: input, output, outcome | Sort it |

### Module 6: Administration and Management

| Lesson | Section | Piece | Kind |
|---|---|---|---|
| Project and contract management | Critical path | ● `critical-path`: stretch a task and watch the path and float move on a Gantt chart | Try it |
| | Earned value | ★ `earned-value` (WIP) + planned/earned/actual lines | Try it |
| Managing a planning agency | Budgets | ○ `sort-budget-formats` | Sort it |
| | Open meetings | ● `scene-reply-all`: a commissioner's reply-all email chain | You're the planner |

### Module 7: Leadership

| Lesson | Section | Piece | Kind |
|---|---|---|---|
| Leadership in planning | Sources of power | ● `sort-power`: French and Raven's five | Sort it |
| | Leading change | ● `order-kotter` | Line it up |
| Mentoring and development | What motivates people | ● `sort-herzberg`: motivators vs. hygiene factors | Sort it |

### Module 8: Areas of Practice

| Lesson | Section | Piece | Kind |
|---|---|---|---|
| Transportation | Transit service basics | ○ `ridership-coverage`: spend a fixed bus budget on frequent corridors or wide coverage (illustrative) | Try it |
| Housing | Federal and state programs | ○ `sort-housing-programs`: supply-side vs. demand-side | Sort it |
| Environment and hazards | NEPA | ● `test-nepa`: three projects to a categorical exclusion, an EA and FONSI, or an EIS | Walk the test |
| | Floodplains and the NFIP | ★ `flood-odds` (WIP) + a 30-year bar | Try it |
| | Climate | ○ `sort-mitigation-adaptation` | Sort it |
| Economic development | Economic base theory | ● `sort-basic-nonbasic` | Sort it |
| | The multiplier | ★ `multiplier` (WIP) + ripples | Try it |
| Urban design and preservation | CPTED | ○ `find-cpted`: find four problems on a drawn corner | Find it |
| | Secretary's Standards | ● `sort-treatments`: preservation, rehabilitation, restoration, reconstruction | Sort it |
| | Section 106 | ● `order-section-106` | Line it up |
| Infrastructure | Asset management | ○ `lifecycle`: cheap to build vs. cheap to own | Try it |
| | Solid waste | ○ `order-waste-hierarchy` | Line it up |
| Health, food, parks; rural and tribal | — | Figures only (see below) | |

### Module 9: Ethics

| Lesson | Section | Piece | Kind |
|---|---|---|---|
| The AICP Code | Structure: principles and rules | ● `sort-rule-principle`: conduct into "violates a Rule" or "falls short of a principle" | Sort it |
| Conflicts of interest | Gifts, favors | ● `sort-gifts`: accept, disclose and step back, or decline | Sort it |
| Solving ethics questions | (after Colleagues' misconduct) | ★ `scene-week`: "A week at the planning desk," four linked dilemmas scored too passive, by the book, or too aggressive, each ending on the five-step method | You're the planner |

### Sections that need a figure more than an interaction

Many sections from the recent content passes have no picture. These are the ones where one
would teach faster than the text (about 20, drawn in the usual pipeline):

- **Research design:** "Did the program cause the change?" (before/after vs. a comparison group)
- **Statistics:** spread (two distributions, same mean, different SD); constant vs. nominal dollars
- **Demographics:** estimate vs. projection vs. forecast on one time axis
- **GIS:** large scale vs. small scale (the naming trap), same place at two scales
- **History:** a highway through a neighborhood (urban renewal and the highway era)
- **Urban form:** filtering (how neighborhoods change)
- **Land use law:** procedural vs. substantive due process
- **Takings:** the "public use" spectrum behind *Kelo*
- **Consensus:** the Thomas-Kilmann grid (assertive × cooperative)
- **Comprehensive plans:** the common elements as a tabbed binder
- **Plan analysis:** average vs. marginal cost (capacity steps), for fiscal impact
- **Zoning relief:** contract vs. conditional zoning; the appeal route (administrator, board, court)
- **Growth management:** how inclusionary zoning's set-aside and offsets balance
- **Capital planning:** a special assessment district along a new sewer line
- **Project management:** contract types by who carries the risk
- **Managing an agency:** the serial meeting (A emails B, B emails C, that's a quorum)
- **Mentoring:** Herzberg's two factors
- **Transportation:** MTP vs. TIP horizons; access management conflict points
- **Environment:** the disaster cycle; defensible space around a home
- **Urban design:** Whyte's plaza (sitting space, sun, food, triangulation)
- **Health:** a visitable house (zero-step entry, wide doors, a ground-floor bathroom)

(Figures promised here are subject to the usual rule: only facts the lesson states.)

## How it fits the site

**Look.** Each kind gets its own paper so it's recognizable, and all of them are clearly not
checkpoints: a hand-lettered **Practice** label and no numbered badge. Try it sits on
graph paper; Sort it uses index cards and kraft envelopes; Line it up is a line map with
stations; Walk the test uses the ticket-gate style the variance and exaction figures already
use; You're the planner uses transfer tickets and ends with a rubber stamp; Red pen is a
typed memo with red pencil in Caveat; Find it uses numbered pins. All of it comes from existing
tokens and classes (`.card`, `.tape`, `.stamp`, `.chip`, the palette); nothing new is invented.

**Phones (360px).** One column. Sliders are full width with 44px touch targets; Sort it deals
one card at a time; Red pen documents reflow as text, with no images of text. Drawings scale to
the column and keep text at 13px or more, the same rule as figures.

**Keyboard and screen readers.**
- Everything is native `<button>`, `<input type="range">`, and `<input>` elements.
- Sliders carry `aria-valuetext` ("FAR 2.5").
- Drawings are `aria-hidden`, with a one-sentence live text version ("A 5-story building
  covering 50% of the lot").
- Results and feedback go to a polite live region, debounced so dragging doesn't flood the
  screen reader.
- Red pen phrases are toggle buttons (`aria-pressed`) labeled "Mark as a problem: …".
- Focus stays where you are; after a sort, it moves to the next card.
- Everything is heading-labeled and has the global focus ring.

**Reduced motion.** No flying cards, shakes, or tweens; changes happen instantly. Live
sketches redraw directly as you move a slider, with no animation.

**Speed.** Each kind is lazy-loaded, only on lessons that use it, and the ink kit loads only
with Try it. Lessons without pieces ship nothing extra.

**State.** Practice isn't graded or saved; a finished piece shows a stamp for that visit. The one
exception is Before you go, whose ratings go into the flashcard boxes (and so sync to the
account like the Flashcards page does).

**Authoring and checks** (added to `npm run check` and documented in CLAUDE.md):
- every `:::try` id exists and is used once;
- no more than three per lesson, only between Key concepts and Summary;
- every sort card and scenario choice has a "why";
- each calculator declares `expect` for its default inputs, and the checker confirms the
  result matches the lesson's worked example;
- invented data is marked illustrative;
- content rules match checkpoints: original writing, no exam items, facts consistent with the
  lesson, and VERIFY flags carried over.

## What to build first

The five pieces with the most learning per hour of work:

1. **Before you go recall cards**: every lesson, no authoring, and the biggest single
   boost to remembering.
2. **Try it with live drawings**: finish the WIP calculators (style them, add drawings and
   *Your turn*), place the eight that fit (FAR, density, rate × size, affordability,
   households, LQ, multiplier, flood odds), plus **bid-rent** as the showpiece of what a live
   sketch can do.
3. **Sort it**, with the four highest-yield sorts: goal/objective/policy/action, IAP2
   promises, who decides in zoning, and levels of measurement.
4. **Walk the test: the board of adjustment** (`test-variance`). Variances are among the most
   tested topics, and deciding the findings yourself is exactly the skill the exam checks.
5. **You're the planner: a week at the planning desk** (`scene-week`). Ethics is its own
   domain, the method is teachable, and it's the most engaging piece on the list.

### Batches

1. **Framework and the first three:** the `:::try` block (replacing `:::calc`), checker rules,
   shared practice styling, Before you go, Try it (the WIP calculators plus bid-rent), and
   Sort it with its first four sorts. Screenshots at 360px and desktop.
2. **Judgment:** the scenario engine, with the variance board, takings route, Nollan/Dolan,
   NEPA, and the ethics week.
3. **Red pen and the richer sketches:** staff report, flyer, sign code, survey; FAR envelope,
   TIF, critical path, class breaks.
4. **The rest of the ● items**, then new figures by module.
5. **Cover the answers** and the ○ items, as time allows.

Nothing merges until you say "merge."

## Questions for you

1. **Before you go:** OK to have lessons write to flashcard boxes, or should the recall deck be
   practice-only too?
2. **Your turn problems:** generated fresh each time (my preference) or hand-written sets?
3. **Density:** is about 55 pieces the right amount, or would you rather go deeper on fewer
   lessons first?
