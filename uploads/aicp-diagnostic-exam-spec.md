# AICP Diagnostic Exam — Design Specification & Admin Build Guide

**Product:** Domain Diagnostic ("Where Should I Study?")
**Version:** 1.0
**Last updated:** September 14, 2026

---

## 1. What this test is (and isn't)

This is a **diagnostic**, not a mock exam. Its only job is to produce a reliable, per-domain picture of where a candidate is strong and where they're losing points, mapped to the nine AICP Certification Exam content areas.

| It is | It is not |
|---|---|
| A placement tool that outputs a ranked study plan | A pass/fail predictor |
| Weighted by domain so subscores are interpretable | A simulation of exam-day conditions |
| Taken once at the start (and optionally once mid-prep) | A repeatable drill bank |

Keep a **separate** product for the full-length timed mock (170 items, blueprint-proportional). Don't try to make one test do both — the item counts that make a mock realistic make the subscores useless.

---

## 2. Recommended length: **100 questions**

### Why 100

The tension is between total length (fatigue, abandonment) and **subscore reliability**. A domain score built on 5 or 6 items is noise: one careless misread swings it 17 percentage points. Roughly 8–10 items is the floor at which a subscore is worth showing a user at all, and 12+ is where it starts to be stable.

If you weight a 100-item test strictly to the blueprint, Administration & Management and Leadership get 6 items each — below that floor. So the design uses **proportional weighting with an 8-item floor**, then re-weights at scoring time so the overall number still reflects the real blueprint.

At ~75 seconds per item, 100 questions is about a 2-hour sitting. That is long but tolerable for a once-per-prep diagnostic, and it's shorter than the real exam.

### Alternatives to offer

- **Quick Check (50 items).** Free/lead-magnet version. Same blueprint proportions, 4–7 items per domain. Report **tiers only** ("Priority / Review / Solid") with no percentages, and label subscores as directional. Use this to drive signups for the 100-item version.
- **Full Mock (170 items).** Separate paid product, strictly blueprint-proportional, timed to APA's currently published limit. Not this document.

---

## 3. Blueprint and item allocation

| # | Domain | Exam weight | Diagnostic items | Notes |
|---|---|---|---|---|
| 1 | Research and Assessment Methods | 11% | 11 | Include 2 calculation items |
| 2 | Fundamental Planning Knowledge | 15% | 14 | History, theory, legal foundations |
| 3 | Communication and Interaction | 13% | 12 | Heavy on scenario framing |
| 4 | Plan and Policy Development | 15% | 14 | Include 1 sequencing item |
| 5 | Plan Implementation | 12% | 12 | Include 2 calculation items |
| 6 | Administration and Management | 6% | 8 | **Oversampled** to reach subscore floor |
| 7 | Leadership | 6% | 8 | **Oversampled** to reach subscore floor |
| 8 | Areas of Practice | 12% | 12 | Rotate sub-areas; see §4 |
| 9 | AICP Code of Ethics and Professional Conduct | 10% | 9 | 2022 Code only |
| | **Total** | **100%** | **100** | |

**Critical for the admin:** domains 6 and 7 are deliberately over-represented. Do **not** compute the overall score as raw correct ÷ 100. See §7.

### Sub-area tagging

Every item carries a second tag naming the sub-area from the APA content outline (e.g. `2.3 Foundational legal principles`, `8.11 Housing planning`). Domain-level reporting is what the user sees first; sub-area tags power the drill-down and the study-plan links. Areas of Practice has 18 listed sub-areas and only 12 items — rotate which sub-areas appear across test versions, and tell the user in the report that this domain is sampled, not covered.

---

## 4. Item mix targets

### Format mix (mirror the styles APA uses)

| Format | Target count | Example from APA's illustrative set |
|---|---|---|
| Single best answer | ~45 | "Cap parks are:" |
| Roman-numeral multi-select (I/II/III/IV) | ~25 | "Typical public health topics in the comprehensive plan include:" |
| Negative stem (EXCEPT / LEAST) | ~8 | "...include all of the following EXCEPT?" |
| Ordering / sequencing | ~5 | The Oregon Model visioning steps |
| Calculation | ~7 | FAR, location quotient, parking acreage |
| Exhibit-based (chart, map, schedule) | ~5 | The Gantt-style implementation schedule |
| Ethics case judgment | ~5 | "Definitely / Possibly / Does not violate / Insufficient information" |

Every item has exactly **four** options, labeled A–D. No "all of the above" as the correct answer more than twice in the whole form — it's a tell.

### Scenario sets

Include **3 scenario sets of 3–5 items each** (10–14 items total, drawn from the counts above, not added on top). Scenario items must stay contiguous and in order; they cannot be shuffled apart.

### Cognitive level

- ~30% recall/recognition (definitions, statutes, named concepts)
- ~50% application (given a situation, choose the right tool)
- ~20% analysis/judgment (weigh tradeoffs, sequence, evaluate a case)

A diagnostic weighted toward pure recall will systematically over-flag people who are actually fine and under-flag the ones who memorized vocabulary but can't apply it.

### Answer key balance

Across 100 items, each of A/B/C/D should be correct 22–28 times. Check this before launch; drifting to a C-heavy key is a common authoring artifact.

---

## 5. Authoring rules (for whoever writes or reviews items)

1. **One defensible answer.** If two options could both be argued by a practicing planner, rewrite the stem — don't rely on "best."
2. **Distractors must be plausible and diagnostic.** Each wrong option should correspond to a specific, nameable misconception. Record that misconception; the report uses it.
3. **National practice only.** No item may turn on one state's enabling act, one city's code, or a regional term. If it's Colorado-specific or California-specific, cut it.
4. **Current, not nostalgic.** Reflect current practice, equity framing, and the 2022 Code of Ethics. Retire anything keyed to the pre-2022 Code.
5. **Calculations must be doable in ~90 seconds** with a basic calculator. State units. For FAR/acreage items, give the 43,560 sq ft conversion only if the item isn't testing that.
6. **Write the rationale before you finalize the key.** If the rationale is hard to write in three sentences, the item is flawed.
7. **Cite a source** for each item (outline sub-area plus a reference: statute, case, standard text, APA policy guide). This is what lets you defend an item when a paying user contests it — and someone will.
8. **Reading level.** Stems as short as the content allows. Avoid double negatives; a negative stem plus a negative option is an automatic rewrite.
9. **Ethics items** must be answerable from the Code text itself. Never test what "feels" unethical.

---

## 6. Delivery rules

| Setting | Value | Reason |
|---|---|---|
| Timing | 125-minute soft timer, visible, **not enforced** | Diagnostic accuracy beats time pressure; track time anyway |
| Navigation | Free — forward, back, flag for review | |
| Question order | Interleave domains; do **not** group by topic | Grouping lets users pattern-match and inflates subscores |
| Randomization | Shuffle option order per item, except ordering items and items with "All of the above" | |
| Scenario sets | Locked together, in sequence | |
| Feedback during test | **None** | Immediate feedback changes later behavior and corrupts the diagnosis |
| Calculator | On-screen basic calculator | |
| Save & resume | Required, session token, 7-day window | 2 hours is a long sit on mobile |
| Skipping | Allowed; unanswered = incorrect, but tracked separately | An 11-item skip pattern is itself a finding |
| Attempts | One scored attempt per purchase; unlimited review-mode replay after | |

### Confidence tagging (recommended)

Next to each item, a two-state toggle: **"Confident"** / **"Unsure."** Optional to use, off by default in the UI but one tap away. This produces the single most useful output in the whole report:

| | Correct | Incorrect |
|---|---|---|
| **Confident** | Mastered — don't study this | **Misinformed** — highest priority; they'll make this mistake on exam day and never check it |
| **Unsure** | Fragile — one review pass | Unknown — expected gaps, study normally |

---

## 7. Scoring rules

### 7.1 Raw scoring

- 1 point per correct item. No partial credit on Roman-numeral or ordering items — they're scored all-or-nothing, same as the exam.
- No penalty for guessing. Unanswered counts as incorrect.
- Blank/skipped items are stored with a separate flag so the report can distinguish "got it wrong" from "ran out of steam."

### 7.2 Domain subscores

For each domain *d*:

```
domain_pct(d) = correct_items(d) / total_items(d) × 100
```

Display as a percentage **and** as `9/12` — the fraction communicates the precision better than the percentage does.

### 7.3 Overall score — **re-weight to the blueprint**

Because domains 6 and 7 are oversampled, the raw total is biased. Compute:

```
weighted_overall = Σ [ domain_pct(d) × blueprint_weight(d) ]
```

with blueprint_weight = 0.11, 0.15, 0.13, 0.15, 0.12, 0.06, 0.06, 0.12, 0.10 for domains 1–9 respectively. Weights must sum to 1.00; assert this in code.

Show the weighted overall as the headline number. Store the raw total too, for item analysis, but don't display it — two different "scores" on one report generates support tickets.

### 7.4 Bands

| Band | Domain % | Report language |
|---|---|---|
| Strong | ≥ 80% | "Maintain — light review only" |
| Solid | 65–79% | "Review — targeted refresh" |
| Developing | 50–64% | "Study — full pass on this domain" |
| Priority | < 50% | "Start here" |

**These are study-triage bands, not a cut score.** APA does not publish a fixed passing percentage, and the exam is scaled. The report must say so, in the report, not just in the terms of service. Never render text like "you would have passed."

### 7.5 Precision caveats

- Domains with 8 or 9 items (Administration & Management, Leadership, Ethics) carry a wider margin. Append a "small sample — directional" note to those three cards.
- Do not report sub-area scores numerically. With 1–3 items per sub-area, report them only as named topics inside the study list ("missed items touched: eminent domain, TDR, nonconforming uses").

---

## 8. Report output

Generate on submit, deliver on-screen plus PDF email:

1. **Headline:** weighted overall %, with the "not a pass predictor" line directly beneath it.
2. **Domain grid:** nine cards, banded and color-coded, each with `x/y`, band label, and one-line meaning.
3. **Ranked study plan:** domains sorted by (blueprint weight × points lost). This is the ordering that matters — a 60% in Fundamental Planning Knowledge (15% of the exam) outranks a 40% in Leadership (6%). Present as "Study in this order: 1, 2, 3…"
4. **Misinformed list** (if confidence tagging was used): every confident-but-wrong item, by topic. Label it "Check these first."
5. **Item review:** each item with the user's answer, the key, the rationale for the correct answer, **and a one-line rationale for why each distractor is wrong**, plus a link to the matching study-guide article.
6. **Pacing note:** average seconds per item vs. the exam's per-item pace, flagged only if they're slower.
7. **Next step CTA:** the study guide sections for their top two priority domains.

---

## 9. Post-launch item analysis

Once ~100 users have completed a form, run monthly:

| Statistic | Flag when | Action |
|---|---|---|
| p-value (% correct) | > 0.95 | Too easy — replace; it's telling you nothing |
| p-value | < 0.25 | Too hard or flawed — review the key first |
| Point-biserial correlation | < 0.15 | Not discriminating — rewrite |
| Point-biserial | negative | **Key is probably wrong** — pull the item immediately |
| Distractor selection | any option chosen < 5% | Rewrite that distractor |
| Time on item | > 3× median | Stem is unclear or too long |

Keep a **retired items** table rather than deleting — you need the history when a user asks why their old report differs from their new one.

Version the form. `DIAG-1.0`, `DIAG-1.1`, etc. Store the form version on every submission; never silently change items under a stored result.

---

## 10. Data schema

### `items` table / authoring CSV

`item_id` · `form_version` · `domain_code` (1–9) · `subarea_code` · `format` (single / roman / negative / ordering / calculation / exhibit / ethics_case) · `cognitive_level` (recall / application / analysis) · `scenario_id` (nullable) · `scenario_order` (nullable) · `scenario_text` (nullable) · `exhibit_asset` (nullable) · `stem` · `option_a` · `option_b` · `option_c` · `option_d` · `correct_option` · `rationale_correct` · `rationale_a` · `rationale_b` · `rationale_c` · `rationale_d` · `source_ref` · `study_guide_slug` · `shuffle_options` (bool) · `calculator_needed` (bool) · `status` (draft / review / live / retired) · `author` · `reviewed_by` · `last_updated`

### `responses` table

`response_id` · `attempt_id` · `user_id` · `item_id` · `form_version` · `selected_option` (nullable) · `is_correct` · `was_skipped` · `confidence_tag` (confident / unsure / null) · `seconds_on_item` · `flagged_for_review` · `submitted_at`

### `attempts` table

`attempt_id` · `user_id` · `form_version` · `started_at` · `submitted_at` · `total_seconds` · `raw_correct` · `weighted_overall` · `domain_pct_1` … `domain_pct_9` · `report_url`

---

## 11. Build checklist

1. Lock the blueprint table (§3) in config, not in code. Assert weights sum to 1.00 and item counts sum to 100 at build time.
2. Author items **domain by domain**, in the order of §3. Write rationales as you go.
3. Second reviewer passes every item against §5. No item goes live on one set of eyes.
4. Balance the answer key (§4) and check negative-stem count.
5. Build the delivery layer to §6. Test save-and-resume on mobile first — that's where the 2-hour sitting breaks.
6. Implement scoring per §7. Unit-test the re-weighting with a synthetic all-correct attempt (must return exactly 100.0) and a synthetic all-wrong attempt (0.0).
7. Pilot with 15–25 planners who have already taken the real exam. Ask them one question: *did the report tell you what you actually needed to study?*
8. Set up the §9 analysis job before launch, not after.

---

## 12. Compliance and positioning notes

- **Write every item from scratch.** Do not reuse, adapt, or paraphrase APA's illustrative questions or anything recalled from a live exam form. Use the published content outline as a blueprint — that's what it's for — and nothing else.
- Include a disclaimer on the product page and in the report footer: independent study material, not affiliated with, endorsed by, or sponsored by APA or AICP. Use "AICP®" and "APA" only nominatively (describing what the product prepares you for), never in the site name, logo, or domain.
- Do not publish a claimed passing score, score conversion, or pass-rate guarantee.
- Report accessibility: color bands must carry a text label too, and the domain grid needs to be readable by screen reader in a sensible order. The content outline explicitly covers accessible electronic media — a prep product that fails it is a bad look.

---

## Appendix: quick reference

**Item counts:** 11 / 14 / 12 / 14 / 12 / 8 / 8 / 12 / 9 = 100
**Weights:** .11 / .15 / .13 / .15 / .12 / .06 / .06 / .12 / .10 = 1.00
**Formula:** `weighted_overall = Σ (domain_pct × weight)`
**Bands:** ≥80 Strong · 65–79 Solid · 50–64 Developing · <50 Priority
**Study order:** rank by `weight × points_lost`, descending
