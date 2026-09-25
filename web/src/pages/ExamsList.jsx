import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ASSESSMENTS } from '../data/domains';
import useAccess from '../hooks/useAccess';
import usePageTitle from '../hooks/usePageTitle';
import { PUBLIC_ASSESSMENTS } from '../lib/access';
import { getHistory } from '../lib/history';
import { P } from '../lib/paths';

const fmtTime = (mins) => {
  const h = Math.floor(mins / 60), m = mins % 60;
  return (h ? `${h}h ` : '') + (m ? `${m}m` : '');
};

function AssessmentCard({ a, access, attempts }) {
  const isPublic = PUBLIC_ASSESSMENTS.includes(a.id);
  const canOpen = access.canOpenAssessment(a);
  const best = attempts.length ? Math.max(...attempts.map((x) => x.pct)) : null;
  const lastTry = attempts.length ? attempts[attempts.length - 1] : null;
  const status = isPublic ? 'Open to everyone'
    : access.paidTier && a.tier === 'paid' ? (access.fullAccess ? 'Unlocked' : 'Full Access')
      : 'Free with an account';

  return (
    <div className="card" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))', gap: 20, alignItems: 'center' }}>
      <div>
        <div className="row-wrap" style={{ gap: 10 }}>
          <h3 className="h3" style={{ fontSize: 23 }}>{a.title}</h3>
          <span className={`chip ${canOpen ? 'chip-brand' : 'chip-neutral'}`}>{status}</span>
        </div>
        <p className="body-text" style={{ margin: '6px 0 0', fontSize: 15, maxWidth: '56ch' }}>{a.blurb}</p>
        <p className="small" style={{ margin: '10px 0 0' }}>
          {a.size} questions &middot; {fmtTime(a.mins)} timed
          {lastTry && <> &middot; <strong style={{ color: 'var(--ink)' }}>best {best}%</strong>, last {lastTry.pct}% ({attempts.length} {attempts.length === 1 ? 'attempt' : 'attempts'})</>}
        </p>
      </div>
      <div className="row-wrap" style={{ justifyContent: 'flex-end' }}>
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
  usePageTitle('Practice');
  const access = useAccess();
  const history = useMemo(() => (access.signedIn ? getHistory() : []), [access.signedIn]);
  const attemptsFor = (id) => history.filter((h) => h.kind === 'exam' && h.assessmentId === id).sort((x, y) => x.completedAt - y.completedAt);
  const quizzes = ASSESSMENTS.filter((a) => a.size < 100);
  const exams = ASSESSMENTS.filter((a) => a.size >= 100);
  const diagTaken = history.some((h) => h.kind === 'diagnostic');

  return (
    <>
      <header className="container page-head">
        <span className="eyebrow eyebrow-brand">Practice</span>
        <h1 className="h1">Practice exams, quizzes, and drills</h1>
        <p className="lead">
          Every question is written to the nine domains of the AICP exam content outline, and every answer comes with an explanation.
          {access.signedIn ? ' Your scores are saved to your dashboard.' : ' Warm-up Quiz A is open to everyone; everything else is free with an account.'}
        </p>
      </header>

      <div className="container" style={{ paddingBottom: 80 }}>
        <section aria-labelledby="start-heading">
          <h2 id="start-heading" className="eyebrow">1. Find your starting point</h2>
          <div className="card" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))', gap: 20, alignItems: 'center', background: 'var(--surface-alt)', borderColor: 'var(--line-warm)' }}>
            <div>
              <h3 className="h3" style={{ fontSize: 23 }}>The diagnostic</h3>
              <p className="body-text" style={{ margin: '6px 0 0', fontSize: 15, maxWidth: '60ch' }}>
                100 untimed items that score all nine domains and rank them by exam weight times points lost. Take it first, and again
                midway through your prep. It&rsquo;s a placement test, not a pass predictor.
              </p>
            </div>
            <div className="row-wrap" style={{ justifyContent: 'flex-end' }}>
              <Link className="btn btn-rust" to={access.signedIn ? P.diagnostic : P.signinNext(P.diagnostic)}>{diagTaken ? 'Retake the diagnostic' : 'Take the diagnostic'}</Link>
            </div>
          </div>
        </section>

        <section aria-labelledby="quiz-heading" style={{ marginTop: 40 }}>
          <h2 id="quiz-heading" className="eyebrow">2. Warm up</h2>
          <div className="stack stack-16">
            {quizzes.map((a) => <AssessmentCard key={a.id} a={a} access={access} attempts={attemptsFor(a.id)} />)}
          </div>
        </section>

        <section aria-labelledby="exam-heading" style={{ marginTop: 40 }}>
          <h2 id="exam-heading" className="eyebrow">3. Rehearse the real thing</h2>
          <p className="body-text" style={{ margin: '0 0 14px', maxWidth: '72ch' }}>
            Full-length, 170-question exams on the real exam&rsquo;s 3.5-hour clock. Take at least one timed and in a single sitting
            before test day, and review every miss afterward; the results screen lists the lessons to reread.
          </p>
          <div className="stack stack-16">
            {exams.map((a) => <AssessmentCard key={a.id} a={a} access={access} attempts={attemptsFor(a.id)} />)}
          </div>
        </section>

        <section aria-labelledby="target-heading" style={{ marginTop: 40 }}>
          <h2 id="target-heading" className="eyebrow">4. Target a weak spot</h2>
          <div className="grid-cards">
            <Link to={P.drills} className="card card-link">
              <h3 className="h3">Domain drills</h3>
              <p className="body-text" style={{ margin: 0, fontSize: 15 }}>Up to 25 untimed questions from one domain, explained as you go. Best for the domains your diagnostic ranks highest.</p>
              <span className="link-arrow" style={{ marginTop: 'auto' }}>Choose a domain</span>
            </Link>
            <Link to={P.course} className="card card-link">
              <h3 className="h3">Lesson practice sets</h3>
              <p className="body-text" style={{ margin: 0, fontSize: 15 }}>Every lesson has checkpoints as you read, a lesson review, and a full practice set on exactly the topics it teaches.</p>
              <span className="link-arrow" style={{ marginTop: 'auto' }}>Browse the lessons</span>
            </Link>
            <Link to={P.flashcards} className="card card-link">
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
