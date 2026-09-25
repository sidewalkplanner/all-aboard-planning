import { Link } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import usePageTitle from '../../hooks/usePageTitle';
import { P } from '../../lib/paths';
import { lessonBySlug } from '../../content/aicp/curriculum';
import { STUDY_PLANS, planProgress, planItemKey } from '../../content/aicp/studyPlans';
import useAccess from '../../hooks/useAccess';
import { useStudyState, choosePlan, setPlanCheck } from '../../lib/studyState';
import { PAID_TIER_ENABLED } from '../../lib/access';

const Check = ({ on }) => (
  <span aria-hidden="true" style={{ display: 'inline-flex', width: 18, height: 18, borderRadius: 5, marginRight: 8, verticalAlign: '-3px', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, border: `2px solid ${on ? 'var(--ok-fg)' : 'var(--line-strong)'}`, background: on ? 'var(--ok-fg)' : '#FFFFFF', color: '#FFFFFF' }}>
    {on ? '\u2713' : ''}
  </span>
);

function Plan({ plan, study, signedIn }) {
  const following = signedIn && study.plan && study.plan.id === plan.id;
  const prog = following ? planProgress(plan, study) : null;
  return (
    <section id={plan.id} aria-labelledby={`${plan.id}-heading`} style={{ paddingTop: 48 }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px 16px', justifyContent: 'space-between' }}>
        <h2 id={`${plan.id}-heading`} className="h2">{plan.title}</h2>
        <span className="row-wrap" style={{ gap: 8 }}>
          <span className="chip chip-brand">{plan.hoursPerWeek}</span>
          {signedIn && (following
            ? <button type="button" className="btn btn-secondary btn-sm" onClick={() => choosePlan(null)}>Stop following</button>
            : <button type="button" className="btn btn-primary btn-sm" onClick={() => choosePlan(plan.id)}>Follow this plan</button>)}
          {!signedIn && <Link className="btn btn-secondary btn-sm" to={P.createAccount(P.studyPlan + '#' + plan.id)}>Sign up to track this plan</Link>}
        </span>
      </div>
      <p className="body-text" style={{ margin: '8px 0 12px' }}>{plan.who}</p>
      {following && (
        <div className="callout" style={{ margin: '0 0 8px' }}>
          <p className="body-text" style={{ margin: 0 }}>
            <strong>You&rsquo;re following this plan.</strong> {prog.done} of {prog.total} items done
            {prog.current !== null ? `; you're on week ${prog.current + 1}.` : '. You finished the plan!'} Lessons tick off when you mark them complete; tick practice items yourself.
          </p>
        </div>
      )}
      <div>
        {plan.weeks.map((w, i) => {
          const mins = w.lessons.reduce((s, slug) => s + (lessonBySlug(slug)?.minutes || 0), 0);
          const wk = prog && prog.weeks[i];
          const isCurrent = prog && prog.current === i;
          return (
            <div key={i} className="week" style={isCurrent ? { background: 'var(--surface)', borderRadius: 12, padding: '20px 16px', border: '2px solid var(--brand)' } : undefined}>
              <div>
                <div className="num" style={{ fontSize: 14 }}>Week {i + 1}</div>
                {mins > 0 && <div className="small" style={{ marginTop: 2 }}>~{Math.round(mins / 6) / 10} hrs reading</div>}
                {wk && <div className="small" style={{ marginTop: 4, fontWeight: 700, color: wk.complete ? 'var(--ok-fg)' : 'var(--muted)' }}>{wk.complete ? 'Done' : isCurrent ? 'This week' : `${wk.done}/${wk.total}`}</div>}
              </div>
              <div>
                <h3 className="h3" style={{ fontSize: 19 }}>{w.focus}</h3>
                {w.lessons.length > 0 && (
                  <>
                    <div className="eyebrow" style={{ margin: '12px 0 6px' }}>Read</div>
                    <ul style={{ margin: 0, padding: following ? 0 : '0 0 0 20px', listStyle: following ? 'none' : undefined, display: 'flex', flexDirection: 'column', gap: 6 }} className="body-text">
                      {w.lessons.map((slug) => {
                        const l = lessonBySlug(slug);
                        const done = !!study.completed[slug];
                        return (
                          <li key={slug}>
                            {following && <Check on={done} />}
                            <Link to={P.lesson(slug)}>{l.number}. {l.title}</Link>
                            <span className="small"> &middot; {l.minutes} min{PAID_TIER_ENABLED && l.access === 'free' ? ' · free' : ''}</span>
                            {following && <span className="visually-hidden">{done ? ' (completed)' : ' (not completed)'}</span>}
                          </li>
                        );
                      })}
                    </ul>
                  </>
                )}
                <div className="eyebrow" style={{ margin: '14px 0 6px' }}>Practice</div>
                <ul style={{ margin: 0, padding: following ? 0 : '0 0 0 20px', listStyle: following ? 'none' : undefined, display: 'flex', flexDirection: 'column', gap: 6 }} className="body-text">
                  {w.lessons.length > 0 && !following && <li>Each lesson&rsquo;s checkpoints, answered as you read</li>}
                  {w.practice.map((p) => {
                    const key = planItemKey(plan.id, i, p.label);
                    const done = !!study.planChecks[key];
                    return (
                      <li key={p.label} style={following ? { display: 'flex', alignItems: 'flex-start', gap: 8 } : undefined}>
                        {following && (
                          <input
                            type="checkbox"
                            checked={done}
                            onChange={(e) => setPlanCheck(key, e.target.checked)}
                            aria-label={`Mark done: ${p.label}`}
                            style={{ width: 18, height: 18, marginTop: 4, accentColor: 'var(--ok-fg)', flex: 'none' }}
                          />
                        )}
                        <Link to={p.to} style={done ? { textDecoration: 'line-through', color: 'var(--muted)' } : undefined}>{p.label}</Link>
                      </li>
                    );
                  })}
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
  const { signedIn } = useAccess();
  const study = useStudyState();
  return (
    <>
      <PageHeader
        eyebrow="Study plans"
        title="A schedule you can actually keep"
        art="page-route" artW={960} artH={270} artTilt={-1}
        artAlt="A winding red route from start through a baseline exam and the lessons to a flag marked exam day"
        lead="Two week-by-week plans that cover every lesson and every practice exam. Pick the one that fits your calendar, then adjust it with your exam results."
      >
        <div className="row-wrap" style={{ marginTop: 22 }}>
          {STUDY_PLANS.map((p) => (
            <a key={p.id} className="btn btn-secondary" href={`#${p.id}`}>{p.title}</a>
          ))}
          <Link className="btn btn-primary" to={P.runExam('e1', 'practice')}>Start with your baseline exam</Link>
        </div>
      </PageHeader>

      <div className="container">
        <div className="grid-cards">
          <div className="card">
            <h2 className="h3">How to use a plan</h2>
            <ul className="body-text" style={{ margin: '10px 0 0', paddingLeft: 20 }}>
              <li>Answer each lesson&rsquo;s checkpoints as you reach them, before reading on.</li>
              <li>Take full exams timed and in one sitting, the way you will on test day.</li>
              <li>After each exam, review every miss before moving on.</li>
            </ul>
          </div>
          <div className="card">
            <h2 className="h3">Adjust with your exam results</h2>
            <p className="body-text" style={{ margin: '10px 0 0' }}>
              Every practice exam ranks the nine domains by how many points each is costing you. Give your top two
              domains an extra study session each week, and move lightly through the ones you scored well on.
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
        {STUDY_PLANS.map((p) => <Plan key={p.id} plan={p} study={study} signedIn={signedIn} />)}
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
