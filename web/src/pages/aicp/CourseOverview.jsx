import { Link } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import usePageTitle from '../../hooks/usePageTitle';
import { P } from '../../lib/paths';
import { DOMAINS, LESSONS, TOTAL_MINUTES } from '../../content/aicp/curriculum';
import { PAID_TIER_ENABLED } from '../../lib/access';

export default function CourseOverview() {
  usePageTitle('Course overview');
  const hours = Math.round(TOTAL_MINUTES / 60);

  return (
    <>
      <PageHeader
        eyebrow="AICP exam prep course"
        title="Course overview"
        lead={`${LESSONS.length} lessons across the nine domains of the AICP exam content outline, in outline order. Each lesson covers objectives, key concepts, key terms, real planning examples, a summary, and a practice set of exam-style questions.`}
      >
        <div className="row-wrap" style={{ marginTop: 22 }}>
          <Link className="btn btn-primary" to={P.lesson(LESSONS[0].slug)}>Start lesson 1</Link>
          <Link className="btn btn-secondary" to={P.studyPlan}>Follow a study plan</Link>
          <Link className="btn btn-secondary" to={P.diagnostic}>Find your weak spots first</Link>
        </div>
        <p className="small" style={{ margin: '16px 0 0' }}>
          About {hours} hours of reading in total. Every lesson is free with an account{PAID_TIER_ENABLED ? '' : ', and you can preview each one\u2019s learning objectives without signing in'}.
        </p>
      </PageHeader>

      <div className="container">
        <nav aria-label="Jump to a domain" className="card card-sm" style={{ marginBottom: 12 }}>
          <span className="eyebrow">Jump to a domain</span>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {DOMAINS.map((d) => (
              <li key={d.id}><a className="chip chip-brand" href={`#${d.id}`}>{d.code}. {d.short} &middot; {d.weight}%</a></li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="container" style={{ paddingBottom: 72 }}>
        {DOMAINS.map((d) => {
          const lessons = LESSONS.filter((l) => l.domainId === d.id);
          const mins = lessons.reduce((s, l) => s + l.minutes, 0);
          return (
            <section key={d.id} id={d.id} aria-labelledby={`${d.id}-heading`} style={{ paddingTop: 40 }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '8px 16px', justifyContent: 'space-between' }}>
                <h2 id={`${d.id}-heading`} className="h2" style={{ fontSize: 'clamp(24px,2.8vw,30px)' }}>
                  <span style={{ color: 'var(--rust)' }}>Domain {d.code}.</span> {d.name}
                </h2>
                <span className="chip chip-brand">{d.weight}% of the exam</span>
              </div>
              <p className="body-text" style={{ margin: '8px 0 16px', maxWidth: '72ch' }}>{d.summary}</p>
              <ol className="lesson-list">
                {lessons.map((l) => (
                  <li key={l.slug}>
                    <Link to={P.lesson(l.slug)}>
                      <span className="lesson-num" aria-hidden="true">{l.number}</span>
                      <span style={{ minWidth: 0 }}>
                        <span style={{ display: 'block', fontWeight: 700, fontSize: 16.5, color: 'var(--ink)' }}>
                          <span className="visually-hidden">Lesson {l.number}: </span>{l.title}
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
                {lessons.length} lessons &middot; about {mins} minutes &middot;{' '}
                <Link to={P.drills} className="link-underline">Drill this domain</Link>
              </p>
            </section>
          );
        })}
      </div>
    </>
  );
}
