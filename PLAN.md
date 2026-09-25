# Build plan: AICP exam prep course

This is the plan for turning All Aboard Planning from a practice-exam site into a
complete AICP exam prep course. It was written before the build started.
`REVIEW.md` records what was actually built and where it differs from this plan.

## Goals

1. Keep every existing quiz, exam, drill, and the diagnostic working.
2. Move all prep content under `/aicp/` so a consulting-firm homepage can take `/` later.
3. Add a full course (lessons in every exam domain), study plans, and supporting pages.
4. Make it one design system: shared tokens, layout, navigation, and typography.

## Site map

Routes are relative to the GitHub Pages base path (`/all-aboard-planning/`).

### Firm level (outside the prep section)

| Route | Page | Notes |
|---|---|---|
| `/` | Redirect to `/aicp` | Placeholder until the consulting homepage exists |
| `/about` | About All Aboard Planning | Firm and course mission; founder bio placeholder |
| `/contact` | Contact | No backend: mailto link to a placeholder address |

### AICP prep section

| Route | Page | Status |
|---|---|---|
| `/aicp` | Prep homepage: what the course offers, who it's for, how it works, call to action | New (replaces the old `/` landing page) |
| `/aicp/course` | Course overview: every lesson, grouped by domain | New |
| `/aicp/lessons/:slug` | Lesson page (shared template) | New |
| `/aicp/study-plan` | 8-week and 12-week study schedules | New |
| `/aicp/exam-info` | Exam format, eligibility, registration, links to APA | New |
| `/aicp/faq` | Frequently asked questions | New |
| `/aicp/pricing` | Pricing, with placeholder prices | Existing page, rewritten |
| `/aicp/exams` | Practice exams and quizzes list | Existing page, moved |
| `/aicp/exam/run` | Exam runner (quizzes, exams, drills, and now lesson practice sets) | Existing page, moved and extended |
| `/aicp/diagnostic` | "Where Should I Study?" diagnostic | Existing page, moved |
| `/aicp/drills` | Domain drills (was "Study by domain" at `/study`) | Existing page, moved |
| `/aicp/progress` | Progress dashboard | Existing page, moved |
| `/aicp/signin` | Sign-in placeholder (no login system) | Existing page, moved |

Old URLs (`/exams`, `/exam/run`, `/diagnostic`, `/study`, `/progress`, `/pricing`,
`/signin`) redirect to their new `/aicp/...` paths and keep their query strings, so
bookmarks and shared links still work.

## Course structure

The course follows the nine domains of the AICP exam content outline, in outline order,
with the weights recorded in `uploads/aicp-diagnostic-exam-spec.md`:

| # | Domain | Weight | Lessons |
|---|---|---|---|
| 1 | Research and Assessment Methods | 11% | 4 |
| 2 | Fundamental Planning Knowledge | 15% | 6 |
| 3 | Communication and Interaction | 13% | 4 |
| 4 | Plan and Policy Development | 15% | 4 |
| 5 | Plan Implementation | 12% | 7 |
| 6 | Administration and Management | 6% | 2 |
| 7 | Leadership | 6% | 2 |
| 8 | Areas of Practice | 12% | 6 |
| 9 | AICP Code of Ethics and Professional Conduct | 10% | 3 |

38 lessons in total. The first lesson in each domain is free; the rest are Full Access,
behind a clearly marked membership placeholder.

### Lessons

**Domain 1: Research and Assessment Methods**
1. `research-design-and-data`: Research design and data sources (free)
2. `statistics-for-planners`: Statistics for planners
3. `demographic-and-economic-analysis`: Population projections and economic analysis
4. `spatial-analysis-and-gis`: Spatial analysis and GIS

**Domain 2: Fundamental Planning Knowledge**
5. `planning-history`: A history of American planning (free)
6. `planning-theory`: Planning theory
7. `urban-form-and-settlement`: Patterns of human settlement and urban form
8. `land-use-law-foundations`: Foundations of land use law
9. `takings-and-exactions`: Takings, exactions, and property rights
10. `federal-policy-and-planning`: Federal laws and programs that shaped planning

**Domain 3: Communication and Interaction**
11. `public-engagement-design`: Designing public engagement (free)
12. `equitable-and-accessible-engagement`: Equitable, inclusive, and accessible engagement
13. `consensus-and-negotiation`: Facilitation, consensus building, and negotiation
14. `communicating-with-decision-makers`: Staff reports, hearings, and the media

**Domain 4: Plan and Policy Development**
15. `the-planning-process`: The planning process, from scoping to adoption (free)
16. `comprehensive-plans`: Comprehensive plans, elements, and consistency
17. `goals-objectives-policies`: Vision, goals, objectives, and policies
18. `plan-analysis-tools`: Scenario planning, fiscal impact, and consequence analysis

**Domain 5: Plan Implementation**
19. `zoning-fundamentals`: Zoning fundamentals (free)
20. `zoning-relief-and-nonconformities`: Variances, conditional uses, rezonings, and nonconformities
21. `subdivision-and-development-review`: Subdivision and development review
22. `growth-management-and-innovative-tools`: Growth management and innovative land use tools
23. `implementation-math`: Implementation math: FAR, density, parking, and more
24. `capital-planning-and-finance`: Capital planning and public finance
25. `monitoring-and-implementation-programs`: Implementation programs, partnerships, and monitoring

**Domain 6: Administration and Management**
26. `project-and-contract-management`: Project, procurement, and contract management (free)
27. `managing-a-planning-agency`: Managing a planning agency

**Domain 7: Leadership**
28. `leadership-in-planning`: Leadership in planning (free)
29. `mentoring-and-professional-development`: Mentoring and professional development

**Domain 8: Areas of Practice**
30. `transportation-planning`: Transportation planning (free)
31. `housing-and-community-development`: Housing and community development
32. `environmental-planning-and-hazards`: Environmental planning, hazards, and resilience
33. `economic-development`: Economic development
34. `urban-design-and-historic-preservation`: Urban design and historic preservation
35. `health-food-parks-and-regional-planning`: Health, food systems, parks, and regional planning

**Domain 9: AICP Code of Ethics and Professional Conduct**
36. `aicp-code-of-ethics`: How the AICP Code of Ethics is organized (free)
37. `conflicts-of-interest-and-rules-of-conduct`: Conflicts of interest and the Rules of Conduct
38. `solving-ethics-questions`: Working through ethics scenarios

### What every lesson contains

Every lesson uses the shared lesson template:

- Breadcrumb, domain badge (outline number, name, exam weight), title, reading time, access tier
- Learning objectives
- Key concepts in plain language
- Key terms
- Real-world planning examples
- Summary
- Related practice: a lesson practice set of real questions from the existing exams
  and quizzes, plus the domain drill, the free warm-up quizzes, and the diagnostic
- Previous and next lesson navigation, running across the whole course

## Connecting existing practice to the course

- **Lesson practice sets.** Each lesson lists specific question IDs from the three
  exam banks (for example `e1:115`), and the exam runner gets a new
  `?set=<lesson-slug>` mode. Free lessons only use questions that already appear in
  the free warm-up quizzes, so no paid exam item is given away.
- The **diagnostic report** links each ranked domain to that domain's lessons.
- **Exam results** and the drills page link back to the course.

## Design system

- Build on the existing look: Bricolage Grotesque headings, Figtree body text, navy,
  blue, and coral palette, white cards on a light gray-blue background.
- Move the tokens into CSS custom properties in `index.css`. Add shared classes for
  layout, buttons, cards, chips, long-form prose, and callouts. New pages use those
  classes; existing inline-styled pages keep working.
- Accessibility: a skip link, real `<a>` links for navigation (not buttons),
  `aria-current` on the active nav item, visible focus rings, one `<h1>` per page,
  AA contrast for text, and scroll-to-top or scroll-to-anchor when the route changes.
- A new header with the prep-section navigation (collapses to a menu below 1100px),
  and a new footer with a full sitemap and the APA non-affiliation disclaimer.

## Quality checks

- `npm run build` and `npm run lint` pass.
- `npm run check` (new, no extra dependencies) checks that:
  - every lesson in the curriculum has a Markdown file with all the required sections;
  - every practice question ID resolves to a real question;
  - free lessons only use free-quiz questions;
  - every internal link in the lessons, study plans, and navigation points to a real
    route, lesson, or anchor.
- A headless-browser crawl of the built site visits every page and confirms that no
  internal link lands on the 404 page.

## Content rules

- All text is original. Nothing is copied from APA, textbooks, or other prep courses.
- No invented cases, statutes, dates, or statistics. Any specific fact I'm not fully
  confident about is marked `<!-- VERIFY: reason -->` (or `{/* VERIFY: reason */}`
  in JSX), and every flag is listed in `REVIEW.md`.
- Exam logistics (fees, dates, eligibility, pass score) always point to APA as the
  authority.
