import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import usePageTitle from '../hooks/usePageTitle';
import useAccess from '../hooks/useAccess';
import { ASSESSMENTS } from '../data/domains';
import { getHistory, summarizeHistory } from '../lib/history';
import { barStyle } from '../lib/style';
import { GREEN, RUST } from '../lib/theme';
import { fmtHoursMinutesFromSeconds, fmtShortDate } from '../lib/format';
import { P } from '../lib/paths';
import { DOMAINS, LESSONS, domainByBankName, lessonBySlug, lessonsToReview } from '../content/aicp/curriculum';
import { STUDY_PLANS, planById, planProgress, planItemKey } from '../content/aicp/studyPlans';
import { ALL_CARDS } from '../content/aicp/flashcards';
import { useStudyState, MASTERED_BOX, setPlanCheck } from '../lib/studyState';

const statNum = { fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 700, lineHeight: 1.1 };

// The signed-in home base: what to do next, how far along you are, and where
// you're losing points. Everything here is derived from lib/studyState.js
// (lessons, plan, flashcards) and lib/history.js (scored attempts).
export default function Progress() {
  usePageTitle('Dashboard');
  const { user } = useAccess();
  const study = useStudyState();
  const history = useMemo(() => getHistory(), []);
  const summary = useMemo(() => summarizeHistory(history), [history]);

  // What to do next: the last lesson opened if it isn't done, else the next undone lesson.
  const last = study.lastLesson && lessonBySlug(study.lastLesson.slug);
  const nextUndone = LESSONS.find((l) => !study.completed[l.slug]);
  const afterLast = last && LESSONS.slice(last.number).find((l) => !study.completed[l.slug]);
  const continueLesson = last && !study.completed[last.slug] ? last : afterLast || nextUndone;
  const doneCount = LESSONS.filter((l) => study.completed[l.slug]).length;

  const plan = study.plan && planById(study.plan.id);
  const prog = plan && planProgress(plan, study);
  const week = plan && prog.current !== null ? plan.weeks[prog.current] : null;

  const diag = summary.recent.find((h) => h.kind === 'diagnostic');
  const priorities = (diag && diag.priorities ? diag.priorities : []).map(domainByBankName).filter(Boolean);

  const missed = useMemo(() => history.slice(-20).flatMap((h) => h.missedRefs || []), [history]);
  const review = useMemo(() => lessonsToReview(missed, 5), [missed]);

  const mastered = ALL_CARDS.filter((c) => study.cards[c.id] && study.cards[c.id].box >= MASTERED_BOX).length;
  const seenCards = ALL_CARDS.filter((c) => study.cards[c.id]).length;
  const examsTotal = ASSESSMENTS.filter((a) => !a.soon).length;
  const firstName = user && user.name ? user.name.split(' ')[0] : '';

  return (
    <>
      <header className="container page-head">
        <span className="eyebrow eyebrow-brand">Dashboard</span>
        <h1 className="h1">{firstName ? `Welcome back, ${firstName}` : 'Your dashboard'}</h1>
        <p className="lead">
          {doneCount === 0 && summary.n === 0
            ? 'Start with the diagnostic to see where you stand, pick a study plan, then work through the lessons. Everything you do shows up here.'
            : `${doneCount} of ${LESSONS.length} lessons complete · ${summary.examIds.size} of ${examsTotal} quizzes and exams taken · ${mastered} of ${ALL_CARDS.length} flashcards mastered.`}
        </p>
      </header>

      <div className="container" style={{ paddingBottom: 72 }}>
        {/* NEXT STEPS */}
        <div className="grid-cards">
          <section className="card" aria-labelledby="dash-continue">
            <span className="eyebrow eyebrow-rust">Up next</span>
            {continueLesson ? (
              <>
                <h2 id="dash-continue" className="h3">Lesson {continueLesson.number}: {continueLesson.title}</h2>
                <p className="small" style={{ margin: '6px 0 16px' }}>{domainLabel(continueLesson)} &middot; about {continueLesson.minutes} min</p>
                <Link className="btn btn-primary" to={P.lesson(continueLesson.slug)}>{last && last.slug === continueLesson.slug ? 'Continue reading' : 'Start this lesson'}</Link>
              </>
            ) : (
              <>
                <h2 id="dash-continue" className="h3">You&rsquo;ve completed every lesson</h2>
                <p className="small" style={{ margin: '6px 0 16px' }}>Now rehearse: full-length timed exams, then review what you miss.</p>
                <Link className="btn btn-primary" to={P.exams}>Take a practice exam</Link>
              </>
            )}
          </section>

          <section className="card" aria-labelledby="dash-plan">
            <span className="eyebrow eyebrow-rust">Study plan</span>
            {plan ? (
              week ? (
                <>
                  <h2 id="dash-plan" className="h3">{plan.title}, week {prog.current + 1}: {week.focus}</h2>
                  <ul style={{ listStyle: 'none', margin: '10px 0 14px', padding: 0, display: 'flex', flexDirection: 'column', gap: 6, fontSize: 14.5 }}>
                    {week.lessons.map((s) => (
                      <li key={s}>
                        <span aria-hidden="true" style={{ color: study.completed[s] ? 'var(--ok-fg)' : 'var(--line-strong)', fontWeight: 800 }}>{study.completed[s] ? '✓' : '○'}</span>{' '}
                        <Link to={P.lesson(s)} style={study.completed[s] ? { color: 'var(--muted)' } : undefined}>{lessonBySlug(s).title}</Link>
                      </li>
                    ))}
                    {week.practice.map((p) => {
                      const key = planItemKey(plan.id, prog.current, p.label);
                      return (
                        <li key={p.label} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                          <input type="checkbox" checked={!!study.planChecks[key]} onChange={(e) => setPlanCheck(key, e.target.checked)} aria-label={`Mark done: ${p.label}`} style={{ marginTop: 3, accentColor: 'var(--ok-fg)' }} />
                          <Link to={p.to}>{p.label}</Link>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="bar-track" aria-hidden="true"><div className="bar-fill" style={{ width: `${(prog.done / prog.total) * 100}%`, background: 'var(--ok-fg)' }} /></div>
                  <p className="small" style={{ margin: '8px 0 0' }}>{prog.done} of {prog.total} plan items done &middot; <Link to={`${P.studyPlan}#${plan.id}`} className="link-underline">See the whole plan</Link></p>
                </>
              ) : (
                <>
                  <h2 id="dash-plan" className="h3">You finished the {plan.title}</h2>
                  <p className="small" style={{ margin: '6px 0 16px' }}>Keep taking timed exams and reviewing flashcards until test day.</p>
                  <Link className="btn btn-secondary" to={P.review}>Final review tools</Link>
                </>
              )
            ) : (
              <>
                <h2 id="dash-plan" className="h3">Pick a study plan</h2>
                <p className="small" style={{ margin: '6px 0 16px' }}>
                  {STUDY_PLANS.map((p) => `${p.title} (${p.hoursPerWeek})`).join(' or ')}. Follow one and this card shows your week.
                </p>
                <Link className="btn btn-primary" to={P.studyPlan}>Choose a plan</Link>
              </>
            )}
          </section>

          <section className="card" aria-labelledby="dash-diag">
            <span className="eyebrow eyebrow-rust">Where to focus</span>
            {diag ? (
              <>
                <h2 id="dash-diag" className="h3">Your diagnostic priorities</h2>
                <ol style={{ margin: '10px 0 14px', paddingLeft: 20, fontSize: 14.5, display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {priorities.map((d) => <li key={d.id}><Link to={P.domain(d.id)}>{d.name}</Link></li>)}
                </ol>
                <p className="small" style={{ margin: '0 0 12px' }}>From your diagnostic on {fmtShortDate(diag.completedAt)} (weighted score {diag.pct}%).</p>
                <Link className="btn btn-secondary btn-sm" to={P.diagnostic}>Retake mid-prep</Link>
              </>
            ) : (
              <>
                <h2 id="dash-diag" className="h3">Take the diagnostic</h2>
                <p className="small" style={{ margin: '6px 0 16px' }}>100 untimed items that rank the nine domains by how many points each is costing you. About two hours.</p>
                <Link className="btn btn-primary" to={P.diagnostic}>Start the diagnostic</Link>
              </>
            )}
          </section>
        </div>

        {/* STATS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,170px),1fr))', gap: 16, marginTop: 20 }}>
          {[
            [`${doneCount}/${LESSONS.length}`, 'Lessons complete'],
            [summary.avgScore === null ? '—' : summary.avgScore + '%', 'Average practice score'],
            [summary.questionsAttempted, 'Questions answered'],
            [`${mastered}/${ALL_CARDS.length}`, 'Flashcards mastered'],
            [summary.timeSeconds ? fmtHoursMinutesFromSeconds(summary.timeSeconds) : '—', 'Time in practice'],
          ].map(([n, label]) => (
            <div key={label} className="card card-sm"><div style={statNum}>{n}</div><div className="small" style={{ marginTop: 3 }}>{label}</div></div>
          ))}
        </div>

        <div className="grid-2" style={{ marginTop: 20 }}>
          {/* BY DOMAIN */}
          <section className="card" aria-labelledby="dash-domains">
            <h2 id="dash-domains" className="h3" style={{ marginBottom: 6 }}>By domain</h2>
            <p className="small" style={{ margin: '0 0 16px' }}>Lessons completed, and your accuracy on practice questions. Below 65% is shown in red.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {DOMAINS.map((d) => {
                const t = summary.domainTotals[d.short];
                const pct = t && t.n ? Math.round((t.got / t.n) * 100) : null;
                const lessons = d.lessons.length;
                const done = d.lessons.filter((l) => study.completed[l.slug]).length;
                return (
                  <div key={d.id}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '2px 12px', fontSize: 14, marginBottom: 6 }}>
                      <Link to={P.domain(d.id)} style={{ fontWeight: 700, color: 'var(--ink)' }}>{d.code}. {d.short} <span className="small">({d.weight}%)</span></Link>
                      <span style={{ color: 'var(--muted)', fontVariantNumeric: 'tabular-nums' }}>
                        {done}/{lessons} lessons &middot; {pct === null ? 'no scores yet' : `${pct}% correct`}
                      </span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                      <div className="bar-track" style={{ height: 7 }} aria-hidden="true"><div className="bar-fill" style={{ width: `${(done / lessons) * 100}%`, background: 'var(--ok-fg)' }} /></div>
                      <div className="bar-track" style={{ height: 7 }} aria-hidden="true"><div style={barStyle(pct || 0, pct !== null && pct < 65 ? RUST : GREEN)} /></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <div className="stack stack-16">
            {/* LESSONS TO REVIEW */}
            <section className="card" aria-labelledby="dash-review">
              <h2 id="dash-review" className="h3" style={{ marginBottom: 6 }}>Lessons to review</h2>
              {review.length ? (
                <>
                  <p className="small" style={{ margin: '0 0 12px' }}>Based on the questions you&rsquo;ve missed in your recent attempts, most-missed first.</p>
                  <ol style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6, fontSize: 15 }}>
                    {review.map(({ lesson, misses }) => (
                      <li key={lesson.slug}><Link to={P.lesson(lesson.slug)}>{lesson.title}</Link> <span className="small">&middot; {misses} missed</span></li>
                    ))}
                  </ol>
                </>
              ) : (
                <p className="small" style={{ margin: 0 }}>Take a quiz, exam, drill, or lesson practice set, and the lessons behind any questions you miss will show up here.</p>
              )}
            </section>

            {/* FLASHCARDS */}
            <section className="card" aria-labelledby="dash-cards">
              <h2 id="dash-cards" className="h3" style={{ marginBottom: 6 }}>Flashcards</h2>
              <p className="small" style={{ margin: '0 0 12px' }}>
                {seenCards ? `${mastered} mastered, ${seenCards - mastered} still learning, ${ALL_CARDS.length - seenCards} not seen yet.` : `${ALL_CARDS.length} cards covering every lesson's key terms. Ten minutes a day adds up.`}
              </p>
              <Link className="btn btn-secondary btn-sm" to={P.flashcards}>{seenCards ? 'Review your weakest cards' : 'Start flashcards'}</Link>
            </section>

            {/* RECENT */}
            <section className="card" aria-labelledby="dash-recent">
              <h2 id="dash-recent" className="h3" style={{ marginBottom: 4 }}>Recent activity</h2>
              {summary.recent.length === 0 && <p className="small" style={{ margin: '6px 0 0' }}>No scored attempts yet.</p>}
              {summary.recent.slice(0, 5).map((a) => (
                <div key={a.id} style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--line)' }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 600 }}>{a.title}</div>
                    <div className="small">
                      {a.kind === 'diagnostic' ? `${a.answeredCount} items` : a.mode === 'timed' ? 'Timed' : 'Practice'} &middot; {fmtShortDate(a.completedAt)}
                    </div>
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'var(--brand-strong)' }}>{a.pct}%</div>
                </div>
              ))}
              <div className="row-wrap" style={{ marginTop: 14 }}>
                <Link className="btn btn-secondary btn-sm" to={P.exams}>Practice</Link>
                <Link className="btn btn-secondary btn-sm" to={P.drills}>Domain drills</Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

function domainLabel(lesson) {
  const d = DOMAINS.find((x) => x.id === lesson.domainId);
  return `Domain ${d.code}: ${d.short}`;
}
