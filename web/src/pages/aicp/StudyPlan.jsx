import { Link } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import usePageTitle from '../../hooks/usePageTitle';
import { P } from '../../lib/paths';
import { lessonBySlug } from '../../content/aicp/curriculum';
import { STUDY_PLANS } from '../../content/aicp/studyPlans';
import { PAID_TIER_ENABLED } from '../../lib/access';

function Plan({ plan }) {
  return (
    <section id={plan.id} aria-labelledby={`${plan.id}-heading`} style={{ paddingTop: 48 }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '8px 16px', justifyContent: 'space-between' }}>
        <h2 id={`${plan.id}-heading`} className="h2">{plan.title}</h2>
        <span className="chip chip-brand">{plan.hoursPerWeek}</span>
      </div>
      <p className="body-text" style={{ margin: '8px 0 12px' }}>{plan.who}</p>
      <div>
        {plan.weeks.map((w, i) => {
          const mins = w.lessons.reduce((s, slug) => s + (lessonBySlug(slug)?.minutes || 0), 0);
          return (
            <div key={i} className="week">
              <div>
                <div className="num" style={{ fontSize: 14 }}>Week {i + 1}</div>
                {mins > 0 && <div className="small" style={{ marginTop: 2 }}>~{Math.round(mins / 6) / 10} hrs reading</div>}
              </div>
              <div>
                <h3 className="h3" style={{ fontSize: 19 }}>{w.focus}</h3>
                {w.lessons.length > 0 && (
                  <>
                    <div className="eyebrow" style={{ margin: '12px 0 6px' }}>Read</div>
                    <ul style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 4 }} className="body-text">
                      {w.lessons.map((slug) => {
                        const l = lessonBySlug(slug);
                        return (
                          <li key={slug}>
                            <Link to={P.lesson(slug)}>{l.number}. {l.title}</Link>
                            <span className="small"> &middot; {l.minutes} min{PAID_TIER_ENABLED && l.access === 'free' ? ' · free' : ''}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </>
                )}
                <div className="eyebrow" style={{ margin: '14px 0 6px' }}>Practice</div>
                <ul style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 4 }} className="body-text">
                  {w.lessons.length > 0 && <li>Each lesson&rsquo;s practice set, right after you read it</li>}
                  {w.practice.map((p) => (
                    <li key={p.label}><Link to={p.to}>{p.label}</Link></li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default function StudyPlan() {
  usePageTitle('Study plans');
  return (
    <>
      <PageHeader
        eyebrow="Study plans"
        title="A schedule you can actually keep"
        lead="Two week-by-week plans that cover every lesson, every practice exam, and the diagnostic. Pick the one that fits your calendar, then adjust it with your diagnostic results."
      >
        <div className="row-wrap" style={{ marginTop: 22 }}>
          {STUDY_PLANS.map((p) => (
            <a key={p.id} className="btn btn-secondary" href={`#${p.id}`}>{p.title}</a>
          ))}
          <Link className="btn btn-primary" to={P.diagnostic}>Start with the diagnostic</Link>
        </div>
      </PageHeader>

      <div className="container">
        <div className="grid-cards">
          <div className="card">
            <h2 className="h3">How to use a plan</h2>
            <ul className="body-text" style={{ margin: '10px 0 0', paddingLeft: 20 }}>
              <li>Read each lesson, then do its practice set the same day, while it&rsquo;s fresh.</li>
              <li>Take full exams timed and in one sitting, the way you will on test day.</li>
              <li>After each exam, review every miss before moving on.</li>
            </ul>
          </div>
          <div className="card">
            <h2 className="h3">Adjust with your diagnostic</h2>
            <p className="body-text" style={{ margin: '10px 0 0' }}>
              The diagnostic ranks the nine domains by how many points each is costing you. Give your top two
              priority domains an extra study session each week, and move lightly through the ones marked Strong.
            </p>
          </div>
          <div className="card">
            <h2 className="h3">Behind schedule?</h2>
            <p className="body-text" style={{ margin: '10px 0 0' }}>
              Protect the heavily weighted domains first: Fundamental Planning Knowledge and Plan and Policy Development
              (15% each), then Communication (13%). Skim, don&rsquo;t skip, the lighter domains.
            </p>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: 72 }}>
        {STUDY_PLANS.map((p) => <Plan key={p.id} plan={p} />)}
        <div className="callout" style={{ marginTop: 40 }}>
          <p className="body-text" style={{ margin: 0 }}>
            <strong>Registering soon?</strong> Check APA&rsquo;s current testing windows and deadlines before you pick a start
            date. <Link to={P.examInfo} className="link-underline">See exam info</Link>.
          </p>
        </div>
      </div>
    </>
  );
}
