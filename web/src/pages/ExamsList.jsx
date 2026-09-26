import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { ASSESSMENTS } from '../data/domains';
import useAccess from '../hooks/useAccess';
import usePageTitle from '../hooks/usePageTitle';
import { PUBLIC_ASSESSMENTS } from '../lib/access';
import { getHistory } from '../lib/history';
import { useSyncVersion } from '../lib/cloudSync';
import { P } from '../lib/paths';

const fmtTime = (mins) => {
  const h = Math.floor(mins / 60), m = mins % 60;
  return (h ? `${h}h ` : '') + (m ? `${m}m` : '');
};

const STUB = {
  e1: ['1', 'var(--butter)'], e2: ['2', 'var(--blush)'], e3: ['3', 'var(--lavender)'],
};

// Each exam is a train ticket: a coloured stub, then the details.
function Ticket({ a, i, access, attempts }) {
  const isPublic = PUBLIC_ASSESSMENTS.includes(a.id);
  const canOpen = access.canOpenAssessment(a);
  const best = attempts.length ? Math.max(...attempts.map((x) => x.pct)) : null;
  const lastTry = attempts.length ? attempts[attempts.length - 1] : null;
  const [mark, color] = STUB[a.id] ?? ['★', 'var(--butter)'];

  return (
    <div className="ticket card card--lift" style={{ '--r': `${[-0.5, 0.4, -0.3, 0.5, -0.4][i % 5]}deg` }}>
      <div className="ticket__stub" style={{ background: color }} aria-hidden="true">
        <span className="ticket__admit">Admit one</span>
        <span className="ticket__mark">{mark}</span>
        <span className="ticket__admit">No. {String(a.size).padStart(3, '0')}</span>
      </div>
      <span className="ticket__notch ticket__notch--top" aria-hidden="true" />
      <span className="ticket__notch ticket__notch--bottom" aria-hidden="true" />
      <div className="ticket__body">
        <h3 className="h3" style={{ fontSize: 25 }}>{a.title}</h3>
        <div className="row-wrap" style={{ gap: 8, marginTop: 12 }}>
          <span className="chip chip--plain">{a.size} questions</span>
          <span className="chip chip--plain">{fmtTime(a.mins)} timed</span>
          {isPublic && <span className="chip chip-ok">No account needed</span>}
          {lastTry && (
            <span className="chip chip-warn">
              Best {best}% &middot; last {lastTry.pct}% ({attempts.length} {attempts.length === 1 ? 'attempt' : 'attempts'})
            </span>
          )}
        </div>
      </div>
      <div className="ticket__actions">
        {canOpen ? (
          <>
            <Link className="btn btn-secondary" to={P.runExam(a.id, 'practice')}>Practice mode</Link>
            <Link className="btn btn-primary" to={P.runExam(a.id, 'timed')}>Start timed</Link>
          </>
        ) : (
          <Link className="btn btn-dark" to={access.blockedTarget(P.runExam(a.id, 'practice'))}>{access.signedIn ? 'Unlock' : 'Sign in to start'}</Link>
        )}
      </div>
    </div>
  );
}

export default function ExamsList() {
  usePageTitle('Practice exams');
  const access = useAccess();
  const synced = useSyncVersion();
  const history = useMemo(() => (access.signedIn ? getHistory() : []), [access.signedIn, synced]); // eslint-disable-line react-hooks/exhaustive-deps
  const attemptsFor = (id) => history.filter((h) => h.kind === 'exam' && h.assessmentId === id).sort((x, y) => x.completedAt - y.completedAt);
  const exams = ASSESSMENTS;

  return (
    <>
      <PageHeader
        eyebrow="Three full-length exams"
        title={<>Practice <em className="marker">exams</em></>}
        lead={`Every question is written to the nine domains of the AICP exam content outline, and every answer comes with an explanation.${access.signedIn ? ' Your scores are saved to your dashboard.' : ' Sign in to start; your scores are saved to your dashboard.'}`}
        note="pick a ticket, any ticket"
        art="page-tickets" artW={520} artH={320} artTilt={-2}
        artAlt="A fan of paper train tickets for Exams 1, 2 and 3"
      />

      <div className="container" style={{ paddingBottom: 80 }}>
        <section aria-labelledby="exam-heading">
          <h2 id="exam-heading" className="eyebrow">1. Take the exams</h2>
          <p className="body-text" style={{ margin: '0 0 18px', maxWidth: '72ch' }}>
            Full-length, 170-question exams on the real exam&rsquo;s 3.5-hour clock. Start with <strong>Practice Exam 1 in practice
            mode</strong> as your baseline: it&rsquo;s untimed and saves as you go, and your results rank the nine domains to study
            first. Take the others later in your prep, at least one timed and in a single sitting before test day.
          </p>
          <div className="stack" style={{ gap: 24 }}>
            {exams.map((a, i) => <Ticket key={a.id} a={a} i={i} access={access} attempts={attemptsFor(a.id)} />)}
          </div>
        </section>

        <section aria-labelledby="target-heading" style={{ marginTop: 52 }}>
          <h2 id="target-heading" className="eyebrow">2. Shore up a weak spot</h2>
          <div className="grid-cards" style={{ gap: 26 }}>
            <Link to={P.course} className="card card-link" style={{ '--r': '-0.6deg' }}>
              <span className="tape" aria-hidden="true" />
              <h3 className="h3">Go back to the lessons</h3>
              <p className="body-text" style={{ margin: 0, fontSize: 15 }}>Your results list the lessons behind every miss. Reread them and answer their checkpoints before you retake an exam.</p>
              <span className="link-arrow" style={{ marginTop: 'auto' }}>Browse the lessons</span>
            </Link>
            <Link to={P.flashcards} className="card card-link" style={{ '--r': '0.6deg' }}>
              <span className="pin" aria-hidden="true" />
              <h3 className="h3">Flashcards</h3>
              <p className="body-text" style={{ margin: 0, fontSize: 15 }}>Key terms, cases, and laws from every lesson, with your weakest cards dealt first.</p>
              <span className="link-arrow" style={{ marginTop: 'auto' }}>Study flashcards</span>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
