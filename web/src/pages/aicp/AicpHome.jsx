import { Link } from 'react-router-dom';
import usePageTitle from '../../hooks/usePageTitle';
import { P } from '../../lib/paths';
import { DOMAINS, LESSONS, lessonBySlug } from '../../content/aicp/curriculum';
import useAccess from '../../hooks/useAccess';
import { useStudyState } from '../../lib/studyState';

const OFFERS = [
  { title: `${LESSONS.length} lessons in nine domains`, body: 'Plain-language lessons organized by the AICP exam content outline, each with key terms, real planning examples, exam tips, and a three-question check at the end.', to: P.course, cta: 'Browse the course' },
  { title: '8- and 12-week study plans', body: 'Week-by-week schedules for every lesson, drill, and exam. Follow one and your dashboard shows exactly what\u2019s due this week.', to: P.studyPlan, cta: 'See the plans' },
  { title: 'A 100-item diagnostic', body: 'A placement test that scores all nine domains and ranks them by how many points each is likely costing you.', to: P.diagnostic, cta: 'Take the diagnostic' },
  { title: 'Three full-length practice exams', body: '170 questions each, on the real 3.5-hour clock, with scenario sets and data exhibits. Results list the lessons behind every miss.', to: P.exams, cta: 'See practice exams' },
  { title: 'Flashcards and quick reference', body: `Hundreds of flashcards built from every lesson's key terms, plus one page of cases, laws, people, formulas, and key numbers.`, to: P.review, cta: 'See the review tools' },
  { title: 'An exam strategy guide', body: 'How the exam asks questions, a pacing plan for 3.5 hours, and the reasoning that separates the best answer from a merely true one.', to: P.strategy, cta: 'Read the guide' },
];

const AUDIENCES = [
  { title: 'Working planners', body: 'You know the job but haven’t studied for a test in years. You need the theory, law, and history behind daily practice organized and refreshed.' },
  { title: 'Early-career planners', body: 'You’ve recently become eligible and want a structured path through material that school only partly covered.' },
  { title: 'Candidates retaking the exam', body: 'You want to find exactly which domains cost you points and spend your time there, not on what you already know.' },
];

const STEPS = [
  ['01', 'Diagnose', 'Take the free diagnostic. Your report ranks the nine domains by exam weight times points lost.'],
  ['02', 'Learn', 'Work through the lessons on a study plan, starting with your priority domains.'],
  ['03', 'Practice', 'Do each lesson’s practice set right away, then drill any domain that stays shaky.'],
  ['04', 'Rehearse', 'Take full-length timed exams to build pace and stamina, and review every miss.'],
];

export default function AicpHome() {
  usePageTitle('');
  const { signedIn, user } = useAccess();
  const study = useStudyState();
  const last = study.lastLesson && lessonBySlug(study.lastLesson.slug);
  const resume = last && !study.completed[last.slug] ? last : LESSONS.find((l) => !study.completed[l.slug]);
  const doneCount = LESSONS.filter((l) => study.completed[l.slug]).length;
  const maxPct = Math.max(...DOMAINS.map((d) => d.weight));

  return (
    <>
      {signedIn && (
        <section aria-label="Pick up where you left off" style={{ background: 'var(--surface)', borderBottom: '1px solid var(--line)' }}>
          <div className="container" style={{ paddingTop: 16, paddingBottom: 16, display: 'flex', flexWrap: 'wrap', gap: '10px 20px', alignItems: 'center', justifyContent: 'space-between' }}>
            <p className="body-text" style={{ margin: 0 }}>
              <strong>Welcome back{user && user.name ? `, ${user.name.split(' ')[0]}` : ''}.</strong>{' '}
              {doneCount} of {LESSONS.length} lessons complete.{resume ? ` Up next: lesson ${resume.number}, ${resume.title}.` : ''}
            </p>
            <div className="row-wrap" style={{ gap: 8 }}>
              {resume && <Link className="btn btn-primary btn-sm" to={P.lesson(resume.slug)}>Continue</Link>}
              <Link className="btn btn-secondary btn-sm" to={P.progress}>Dashboard</Link>
            </div>
          </div>
        </section>
      )}

      {/* HERO */}
      <section className="band-navy">
        <div className="container" style={{ paddingTop: 72, paddingBottom: 80, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,320px),1fr))', gap: 56, alignItems: 'center' }}>
          <div>
            <span style={{ display: 'inline-flex', padding: '7px 14px', borderRadius: 99, background: 'rgba(255,112,89,0.20)', color: 'var(--coral-soft)', fontSize: 13, fontWeight: 700, letterSpacing: '0.02em' }}>
              Free AICP exam prep: lessons, study plans, and practice
            </span>
            <h1 className="display" style={{ margin: '22px 0 0', color: '#FFFFFF' }}>
              Learn it, practice it, and walk in ready.
            </h1>
            <p className="lead" style={{ fontSize: 18.5, maxWidth: '48ch' }}>
              A complete course for the AICP Certification Exam, built around APA&rsquo;s nine-domain content outline. Study
              plain-language lessons, follow a week-by-week plan, and practice with exam-style questions that explain every answer.
            </p>
            <div className="row-wrap" style={{ marginTop: 30 }}>
              <Link className="btn btn-coral btn-lg" to={P.course}>Browse the course</Link>
              {signedIn
                ? <Link className="btn btn-ghost-light btn-lg" to={P.diagnostic}>Take the diagnostic</Link>
                : <Link className="btn btn-ghost-light btn-lg" to={P.createAccount(P.course)}>Create a free account</Link>}
            </div>
            <dl style={{ display: 'flex', gap: 40, marginTop: 44, flexWrap: 'wrap', borderTop: '1px solid rgba(255,255,255,0.18)', paddingTop: 24, marginBottom: 0 }}>
              {[[LESSONS.length, 'lessons'], ['3', 'full-length exams'], ['9', 'exam domains']].map(([n, label]) => (
                <div key={label}>
                  <dt className="visually-hidden">{label}</dt>
                  <dd style={{ margin: 0 }}>
                    <span style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: 38, fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--coral)' }}>{n}</span>
                    <span aria-hidden="true" style={{ display: 'block', fontSize: 13.5, fontWeight: 500, color: '#B8CBE4', marginTop: 2 }}>{label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div style={{ background: '#FFFFFF', color: 'var(--ink)', borderRadius: 20, padding: 28, boxShadow: '0 30px 60px -24px rgba(6,20,44,0.55)' }}>
            <span className="eyebrow eyebrow-brand">Try it now, no account needed</span>
            <h2 className="h3" style={{ fontSize: 24 }}>Warm-up Quiz A</h2>
            <p className="body-text" style={{ margin: '8px 0 18px' }}>
              25 questions weighted like the real exam, untimed, with an explanation for every answer. See how the course
              teaches before you sign up.
            </p>
            <Link className="btn btn-primary btn-block" to={P.runExam('q1', 'practice')}>Start the free quiz</Link>
            <div style={{ borderTop: '1px solid var(--line)', marginTop: 22, paddingTop: 18 }}>
              <h3 style={{ margin: 0, fontSize: 15.5 }}>Then, with a free account</h3>
              <ul className="body-text" style={{ margin: '8px 0 0', paddingLeft: 20, fontSize: 15 }}>
                <li>All {LESSONS.length} lessons and their practice sets</li>
                <li>Three full-length exams and domain drills</li>
                <li>The diagnostic and progress tracking</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="section" aria-labelledby="who-heading">
        <div className="container">
          <span className="eyebrow eyebrow-rust">Who it&rsquo;s for</span>
          <h2 id="who-heading" className="h2">Built for planners studying around a full-time job</h2>
          <p className="lead">If you meet APA&rsquo;s eligibility requirements and are preparing for the AICP exam, this course is for you.</p>
          <div className="grid-cards" style={{ marginTop: 28 }}>
            {AUDIENCES.map((a) => (
              <div key={a.title} className="card">
                <h3 className="h3">{a.title}</h3>
                <p className="body-text" style={{ margin: '8px 0 0' }}>{a.body}</p>
              </div>
            ))}
          </div>
          <p className="small" style={{ margin: '18px 0 0' }}>
            Not sure you&rsquo;re eligible yet? <Link to={P.examInfo} className="link-underline">Read the exam info page</Link>, then confirm with APA.
          </p>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className="section band-white" aria-labelledby="offer-heading">
        <div className="container">
          <span className="eyebrow eyebrow-rust">What the course offers</span>
          <h2 id="offer-heading" className="h2">Lessons and practice, connected</h2>
          <p className="lead">Every lesson points to the questions that test it, and every score report points back to the lessons.</p>
          <div className="grid-cards" style={{ marginTop: 28 }}>
            {OFFERS.map((o) => (
              <Link key={o.title} to={o.to} className="card card-link">
                <h3 className="h3">{o.title}</h3>
                <p className="body-text" style={{ margin: 0 }}>{o.body}</p>
                <span className="link-arrow" style={{ marginTop: 'auto' }}>{o.cta}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section" aria-labelledby="how-heading">
        <div className="container">
          <span className="eyebrow eyebrow-rust">How it works</span>
          <h2 id="how-heading" className="h2">Four steps, repeated until test day</h2>
          <ol style={{ listStyle: 'none', padding: 0, margin: '32px 0 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,230px),1fr))', gap: 28 }}>
            {STEPS.map(([n, title, body]) => (
              <li key={n}>
                <div className="num" aria-hidden="true">{n}</div>
                <h3 className="h3" style={{ margin: '8px 0' }}>{title}</h3>
                <p className="body-text" style={{ margin: 0 }}>{body}</p>
              </li>
            ))}
          </ol>
          <div className="row-wrap" style={{ marginTop: 32 }}>
            <Link className="btn btn-dark" to={P.studyPlan}>Pick a study plan</Link>
            <Link className="btn btn-secondary" to={P.exams}>Take a free warm-up quiz</Link>
          </div>
        </div>
      </section>

      {/* WEIGHTING */}
      <section className="section band-white" aria-labelledby="weight-heading">
        <div className="container">
          <span className="eyebrow eyebrow-rust">The exam blueprint</span>
          <h2 id="weight-heading" className="h2">How the exam is weighted</h2>
          <p className="lead">
            The course, quizzes, and exams all follow the nine domains of the content outline in these proportions.
            Select a domain to see its lessons.
          </p>
          {/* VERIFY: domain weights come from uploads/aicp-diagnostic-exam-spec.md; confirm against APA's current published content outline. */}
          <ul style={{ listStyle: 'none', padding: 0, margin: '28px 0 0' }}>
            {DOMAINS.map((d) => (
              <li key={d.id} style={{ borderBottom: '1px solid #EEF0F7' }}>
                <Link to={P.domain(d.id)} style={{ display: 'grid', gridTemplateColumns: 'minmax(160px,1.4fr) minmax(80px,3fr) 48px', gap: 20, alignItems: 'center', padding: '14px 0', color: 'var(--ink)' }}>
                  <span style={{ fontSize: 15.5, fontWeight: 600 }}>{d.code}. {d.name}</span>
                  <span className="bar-track" aria-hidden="true"><span className="bar-fill" style={{ display: 'block', width: `${(d.weight / maxPct) * 100}%` }} /></span>
                  <span style={{ fontSize: 14.5, color: 'var(--muted)', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{d.weight}%</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* DIAGNOSTIC PROMO */}
      <section className="band-warm" aria-labelledby="diag-heading">
        <div className="container section" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', gap: 40, alignItems: 'center' }}>
          <div>
            <span className="chip chip-err">100 items &middot; no time limit &middot; free with an account</span>
            <h2 id="diag-heading" className="h2" style={{ marginTop: 18 }}>Start by finding out where you actually stand.</h2>
            <p className="body-text" style={{ fontSize: 16.5, margin: '14px 0 0', maxWidth: '54ch', color: '#5A4A42' }}>
              The diagnostic isn&rsquo;t a mock exam. It gives you a reliable read on each of the nine domains, so your study
              time goes where you&rsquo;re losing points. You get a ranked study list that links straight to the lessons.
            </p>
            <div className="row-wrap" style={{ marginTop: 26 }}>
              <Link className="btn btn-rust" to={P.diagnostic}>Take the diagnostic</Link>
            </div>
          </div>
          <div className="stack stack-12">
            {[
              ['What you get', 'A percentage and a fraction for all nine domains, banded from Priority to Strong.'],
              ['Study in order', 'Domains ranked by exam weight times points lost, so a soft spot in a heavy domain outranks a bad score in a light one.'],
              ['Confident but wrong', 'Tag your confidence as you go and the report surfaces the mistakes you would never have thought to check.'],
            ].map(([t, b]) => (
              <div key={t} className="card card-sm" style={{ borderColor: 'var(--line-warm)' }}>
                <h3 style={{ margin: 0, fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--err-fg)' }}>{t}</h3>
                <p className="body-text" style={{ margin: '8px 0 0' }}>{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" aria-labelledby="cta-heading">
        <div className="container">
          <div className="card card-dark" style={{ padding: 'clamp(28px,5vw,48px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', gap: 28, alignItems: 'center' }}>
            <div>
              <h2 id="cta-heading" className="h2" style={{ color: '#FFFFFF' }}>Free, start to finish.</h2>
              <p style={{ color: 'var(--on-navy-muted)', fontSize: 16.5, lineHeight: 1.6, margin: '12px 0 0', maxWidth: '52ch' }}>
                Every lesson, practice set, exam, drill, and the diagnostic is free. Create an account to keep your progress, or try Warm-up Quiz A first.
              </p>
            </div>
            <div className="row-wrap" style={{ justifyContent: 'flex-end' }}>
              {signedIn
                ? <Link className="btn btn-coral btn-lg" to={P.lesson(LESSONS[0].slug)}>Start the first lesson</Link>
                : <Link className="btn btn-coral btn-lg" to={P.createAccount(P.lesson(LESSONS[0].slug))}>Create a free account</Link>}
              <Link className="btn btn-ghost-light btn-lg" to={P.runExam('q1', 'practice')}>Try the free quiz</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
