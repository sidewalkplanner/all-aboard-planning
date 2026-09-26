import { Link } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import usePageTitle from '../../hooks/usePageTitle';
import { P } from '../../lib/paths';
import { DOMAINS, LESSONS } from '../../content/aicp/curriculum';
import { PAID_TIER_ENABLED, STUDY_PLANS_ENABLED } from '../../lib/access';
import useAccess from '../../hooks/useAccess';
import { useStudyState } from '../../lib/studyState';

export default function CourseOverview() {
  usePageTitle('Lessons');
  const { signedIn } = useAccess();
  const { completed } = useStudyState();
  const doneCount = signedIn ? LESSONS.filter((l) => completed[l.slug]).length : 0;
  const nextLesson = LESSONS.find((l) => !completed[l.slug]) || LESSONS[0];

  return (
    <>
      <PageHeader
        eyebrow="AICP exam prep"
        title="Lessons"
        art="page-books" artW={420} artH={310} artTilt={1.5}
        artAlt="A stack of planning books labelled Zoning, Plan Making, Ethics and GIS & Data, with a plant and a mug of coffee"
        lead={`${LESSONS.length} lessons across the nine domains of the AICP exam content outline, in outline order. Each lesson has checkpoint questions after its key sections, plus key terms, real planning examples, exam tips, and a summary. Exam-style questions live in the full-length practice exams.`}
      >
        <div className="row-wrap" style={{ marginTop: 22 }}>
          <Link className="btn btn-primary" to={P.lesson(nextLesson.slug)}>
            {doneCount ? `Continue: lesson ${nextLesson.number}` : 'Start lesson 1'}
          </Link>
          {STUDY_PLANS_ENABLED && <Link className="btn btn-secondary" to={P.studyPlan}>Follow a study plan</Link>}
          <Link className="btn btn-secondary" to={P.runExam('e1', 'practice')}>Take Practice Exam 1 first</Link>
        </div>
        {signedIn && (
          <div style={{ marginTop: 22, maxWidth: 520 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, fontWeight: 600, marginBottom: 6 }}>
              <span>Your progress</span><span>{doneCount} of {LESSONS.length} lessons complete</span>
            </div>
            <div className="bar-track" role="progressbar" aria-label="Lessons complete" aria-valuemin={0} aria-valuemax={LESSONS.length} aria-valuenow={doneCount}>
              <div className="bar-fill" style={{ width: `${(doneCount / LESSONS.length) * 100}%`, background: 'var(--ok-fg)' }} />
            </div>
          </div>
        )}
        <p className="small" style={{ margin: '16px 0 0' }}>
          New to the exam? Read the <Link to={P.strategy} className="link-underline">test-taking strategy guide</Link> first.
          {!signedIn && <> Every lesson opens once you sign in{PAID_TIER_ENABLED ? '' : ', and you can preview each one\u2019s learning objectives without signing in'}.</>}
        </p>
      </PageHeader>

      <div className="container">
        <nav aria-label="Jump to a domain" className="card card-sm" style={{ marginBottom: 12 }}>
          <span className="eyebrow">Jump to a domain</span>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {DOMAINS.map((d) => (
              <li key={d.id}><a className="chip chip-brand" href={`#${d.id}`}>{d.code}. {d.short}</a></li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="container" style={{ paddingBottom: 72 }}>
        {DOMAINS.map((d) => {
          const lessons = LESSONS.filter((l) => l.domainId === d.id);
          const mins = lessons.reduce((s, l) => s + l.minutes, 0);
          const domainDone = lessons.filter((l) => completed[l.slug]).length;
          return (
            <section key={d.id} id={d.id} aria-labelledby={`${d.id}-heading`} style={{ paddingTop: 40 }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '8px 16px', justifyContent: 'space-between' }}>
                <h2 id={`${d.id}-heading`} className="h2" style={{ fontSize: 'clamp(24px,2.8vw,30px)' }}>
                  <span style={{ color: 'var(--rust)' }}>Domain {d.code}.</span> {d.name}
                </h2>
                <span className="row-wrap" style={{ gap: 8 }}>
                  {signedIn && domainDone > 0 && <span className="chip chip-ok">{domainDone} of {lessons.length} done</span>}
                </span>
              </div>
              <p className="body-text" style={{ margin: '8px 0 16px', maxWidth: '72ch' }}>{d.summary}</p>
              <ol className="lesson-list">
                {lessons.map((l) => (
                  <li key={l.slug}>
                    <Link to={P.lesson(l.slug)}>
                      <span className="lesson-num" aria-hidden="true" style={signedIn && completed[l.slug] ? { color: 'var(--ok-fg)' } : undefined}>
                        {signedIn && completed[l.slug] ? '\u2713' : l.number}
                      </span>
                      <span style={{ minWidth: 0 }}>
                        <span style={{ display: 'block', fontWeight: 700, fontSize: 16.5, color: 'var(--ink)' }}>
                          <span className="visually-hidden">Lesson {l.number}{signedIn && completed[l.slug] ? ' (completed)' : ''}: </span>{l.title}
                        </span>
                        <span style={{ display: 'block', fontSize: 14.5, color: 'var(--muted)', marginTop: 2 }}>{l.description}</span>
                      </span>
                      <span className="lesson-meta" style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                        <span className="small" style={{ whiteSpace: 'nowrap' }}>{l.minutes} min</span>
                        {PAID_TIER_ENABLED && (
                          <span className={`chip ${l.access === 'free' ? 'chip-ok' : 'chip-neutral'}`}>{l.access === 'free' ? 'Free' : 'Full Access'}</span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
              <p className="small" style={{ margin: '10px 0 0' }}>
                {lessons.length} lessons &middot; about {mins} minutes
              </p>
            </section>
          );
        })}
      </div>
    </>
  );
}
