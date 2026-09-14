#!/usr/bin/env python3
"""
AICP Domain Diagnostic (DIAG-1.0) — reference scoring implementation.

This is the authoritative statement of the scoring rules for the site admin to
port to whatever stack the site runs on. Read the spec document alongside it.

Key points that are easy to get wrong:
  1. The overall score is NOT raw_correct / 100. Domains 6 and 7 are
     deliberately oversampled so their subscores are stable, so the overall
     must be re-weighted to the published exam blueprint.
  2. Grade against the option mapping stored for that attempt, not against a
     static answer letter, because option order is randomized at delivery for
     items flagged shuffle_options = TRUE.
  3. Unanswered counts as incorrect but is tracked separately.
  4. Never report a pass/fail prediction.

Run this file directly to execute the self-tests.
"""

from dataclasses import dataclass, field

FORM_VERSION = "DIAG-1.0"

# domain_code -> (name, blueprint weight, items on this form)
BLUEPRINT = {
    1: ("Research and Assessment Methods", 0.11, 11),
    2: ("Fundamental Planning Knowledge", 0.15, 14),
    3: ("Communication and Interaction", 0.13, 12),
    4: ("Plan and Policy Development", 0.15, 14),
    5: ("Plan Implementation", 0.12, 12),
    6: ("Administration and Management", 0.06, 8),
    7: ("Leadership", 0.06, 8),
    8: ("Areas of Practice", 0.12, 12),
    9: ("AICP Code of Ethics and Professional Conduct", 0.10, 9),
}

assert abs(sum(w for _, w, _ in BLUEPRINT.values()) - 1.0) < 1e-9, "weights must sum to 1.00"
assert sum(n for _, _, n in BLUEPRINT.values()) == 100, "item counts must sum to 100"

# Domains with 9 or fewer items carry a wider margin; the report must say so.
SMALL_SAMPLE = {d for d, (_, _, n) in BLUEPRINT.items() if n <= 9}

BANDS = [
    (80.0, "Strong", "Maintain - light review only"),
    (65.0, "Solid", "Review - targeted refresh"),
    (50.0, "Developing", "Study - full pass on this domain"),
    (0.0, "Priority", "Start here"),
]


@dataclass
class Response:
    item_id: str
    domain: int
    is_correct: bool
    was_skipped: bool = False
    confidence: str | None = None      # "confident" | "unsure" | None
    seconds: float | None = None
    topic: str = ""                     # subarea label, used in the study list


@dataclass
class DomainResult:
    code: int
    name: str
    weight: float
    correct: int
    total: int
    pct: float
    band: str
    guidance: str
    small_sample: bool
    missed_topics: list = field(default_factory=list)


def band_for(pct: float):
    for floor, label, guidance in BANDS:
        if pct >= floor:
            return label, guidance
    return BANDS[-1][1], BANDS[-1][2]


def score(responses: list[Response]) -> dict:
    if len(responses) != 100:
        raise ValueError(f"expected 100 responses, got {len(responses)}")

    domains = {}
    for code, (name, weight, expected) in BLUEPRINT.items():
        rs = [r for r in responses if r.domain == code]
        if len(rs) != expected:
            raise ValueError(f"domain {code}: {len(rs)} responses, expected {expected}")
        correct = sum(1 for r in rs if r.is_correct)
        pct = 100.0 * correct / expected
        label, guidance = band_for(pct)
        domains[code] = DomainResult(
            code=code, name=name, weight=weight, correct=correct, total=expected,
            pct=round(pct, 1), band=label, guidance=guidance,
            small_sample=code in SMALL_SAMPLE,
            missed_topics=sorted({r.topic for r in rs if not r.is_correct and r.topic}),
        )

    # Re-weight to the blueprint. This is the headline number.
    weighted_overall = round(sum(d.pct * d.weight for d in domains.values()), 1)

    # Study order: what it costs you on the real exam, not what looks worst here.
    study_order = sorted(
        domains.values(),
        key=lambda d: (-(d.weight * (d.total - d.correct)), d.pct, d.code),
    )

    misinformed = [r for r in responses if r.confidence == "confident" and not r.is_correct]
    fragile = [r for r in responses if r.confidence == "unsure" and r.is_correct]

    return {
        "form_version": FORM_VERSION,
        "weighted_overall": weighted_overall,
        "raw_correct": sum(1 for r in responses if r.is_correct),   # internal only
        "skipped": sum(1 for r in responses if r.was_skipped),
        "domains": domains,
        "study_order": [d.code for d in study_order],
        "misinformed_items": [r.item_id for r in misinformed],
        "fragile_items": [r.item_id for r in fragile],
        "disclaimer": (
            "This diagnostic identifies where to focus your study. It is not a "
            "prediction of passing or failing the AICP Certification Examination."
        ),
    }


def render(result: dict) -> str:
    out = [f"Weighted overall: {result['weighted_overall']}%",
           result["disclaimer"], ""]
    for code in result["study_order"]:
        d = result["domains"][code]
        note = "  (small sample - directional)" if d.small_sample else ""
        out.append(f"{d.code}. {d.name}: {d.correct}/{d.total} ({d.pct}%) - {d.band}{note}")
        out.append(f"   {d.guidance}")
        if d.missed_topics:
            out.append(f"   Topics missed: {', '.join(d.missed_topics)}")
    if result["misinformed_items"]:
        out += ["", "Check these first (confident but incorrect): "
                + ", ".join(result["misinformed_items"])]
    return "\n".join(out)


# --------------------------------------------------------------------------
# Self-tests. Required before launch per the spec's build checklist.
# --------------------------------------------------------------------------
def _responses(correct_by_domain: dict) -> list[Response]:
    rs = []
    for code, (_, _, n) in BLUEPRINT.items():
        hits = correct_by_domain.get(code, 0)
        for i in range(n):
            rs.append(Response(f"D{code}-{i+1:02d}", code, is_correct=i < hits,
                               topic=f"topic-{code}"))
    return rs


if __name__ == "__main__":
    all_right = _responses({d: n for d, (_, _, n) in BLUEPRINT.items()})
    r = score(all_right)
    assert r["weighted_overall"] == 100.0, r["weighted_overall"]

    all_wrong = _responses({})
    assert score(all_wrong)["weighted_overall"] == 0.0

    # Oversampling check: perfect everywhere except Leadership (6% of the exam,
    # 8 items here). Raw would understate the weighted score.
    mixed = _responses({d: n for d, (_, _, n) in BLUEPRINT.items()} | {7: 0})
    m = score(mixed)
    assert m["raw_correct"] == 92
    assert m["weighted_overall"] == 94.0, m["weighted_overall"]
    assert m["study_order"][0] == 7

    # Study order weights exam impact, not raw percentage.
    # D2 (15%): 8 missed of 14 -> 1.20.  D7 (6%): 7 missed of 8 -> 0.42.
    impact = _responses({d: n for d, (_, _, n) in BLUEPRINT.items()} | {2: 6, 7: 1})
    i = score(impact)
    assert i["domains"][2].pct > i["domains"][7].pct       # D2 scores higher
    assert i["study_order"][0] == 2                        # but is studied first

    print("All scoring self-tests passed.")
    print()
    print(render(i))
