import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import LessonBody from '../../components/LessonBody';
import AccessGate from '../../components/AccessGate';
import { useStudyState, setLessonComplete, noteLessonOpened } from '../../lib/studyState';
import useAccess from '../../hooks/useAccess';
import NotFound from '../NotFound';
import usePageTitle from '../../hooks/usePageTitle';
import { P } from '../../lib/paths';
import { LESSONS, domainById, lessonBySlug, neighbors } from '../../content/aicp/curriculum';

// Lesson bodies are code-split: each Markdown file becomes its own chunk,
// fetched only when that lesson is opened.
const BODIES = import.meta.glob('../../content/aicp/lessons/*.md');
const bodyLoader = (slug) => BODIES[`../../content/aicp/lessons/${slug}.md`];

// For locked lessons (signed out, or without Full Access once paid plans
// exist), show everything up to the second <h2> (the learning objectives).
const previewHtml = (html) => {
  const first = html.indexOf('<h2');
  const second = first >= 0 ? html.indexOf('<h2', first + 3) : -1;
  return second > 0 ? html.slice(0, second) : html;
};

// Lessons never show exam items: their checkpoints are original questions
// (content/aicp/checkpoints.js). Exam-style practice lives in the exams,
// whose results link missed questions back to the lessons that teach them.
function PracticeBlock({ lesson }) {
  const access = useAccess();
  const { pathname } = useLocation();
  const domain = domainById(lesson.domainId);
  return (
    <section aria-labelledby="practice-heading" className="card" style={{ marginTop: 40 }}>
      <span className="eyebrow eyebrow-rust">Practice</span>
      <h2 id="practice-heading" className="h3" style={{ marginBottom: 8 }}>Ready for exam-style questions?</h2>
      <p className="body-text" style={{ margin: '0 0 16px' }}>
        The checkpoints in this lesson were written for it alone, so they never give away an exam question.
        To see how the {domain.short} domain is tested, take a full-length practice exam. It mixes all nine domains in exam
        proportions, and your results point you back to the lessons behind every question you miss.
      </p>
      <div className="row-wrap">
        <Link className="btn btn-primary" to={P.exams}>See the practice exams</Link>
        <Link className="btn btn-secondary" to={P.diagnostic}>Take the diagnostic</Link>
      </div>
      {!access.signedIn && (
        <p className="small" style={{ margin: '14px 0 0' }}>
          Exams need an account, so your scores are saved.{' '}
          <Link to={P.signinNext(pathname, 'create')} className="link-underline">Create one</Link>, or try{' '}
          <Link to={P.runExam('q1', 'practice')} className="link-underline">Warm-up Quiz A</Link> first, no account needed.
        </p>
      )}
    </section>
  );
}

function Pager({ slug }) {
  const { prev, next } = neighbors(slug);
  return (
    <nav aria-label="Lesson navigation" className="lesson-pager">
      {prev ? (
        <Link className="card card-link card-sm" to={P.lesson(prev.slug)} rel="prev">
          <span className="small">&larr; Previous lesson</span>
          <span style={{ fontWeight: 700, color: 'var(--ink)' }}>{prev.number}. {prev.title}</span>
        </Link>
      ) : (
        <Link className="card card-link card-sm" to={P.course}>
          <span className="small">&larr; Back to</span>
          <span style={{ fontWeight: 700, color: 'var(--ink)' }}>Course overview</span>
        </Link>
      )}
      {next ? (
        <Link className="card card-link card-sm next" to={P.lesson(next.slug)} rel="next">
          <span className="small">Next lesson &rarr;</span>
          <span style={{ fontWeight: 700, color: 'var(--ink)' }}>{next.number}. {next.title}</span>
        </Link>
      ) : (
        <Link className="card card-link card-sm next" to={P.exams}>
          <span className="small">You&rsquo;ve finished the course &rarr;</span>
          <span style={{ fontWeight: 700, color: 'var(--ink)' }}>Take a full-length practice exam</span>
        </Link>
      )}
    </nav>
  );
}

export default function LessonPage() {
  const { slug } = useParams();
  const lesson = lessonBySlug(slug);
  const access = useAccess();
  const [loaded, setLoaded] = useState({ slug: null, body: null });
  const body = lesson && loaded.slug === lesson.slug ? loaded.body : null;
  usePageTitle(lesson ? lesson.title : 'Lesson not found');

  useEffect(() => {
    let live = true;
    const load = lesson && bodyLoader(lesson.slug);
    if (load) load().then((m) => { if (live) setLoaded({ slug: lesson.slug, body: m.default }); });
    return () => { live = false; };
  }, [lesson]);

  const study = useStudyState();
  const readable = !!lesson && access.canReadLesson(lesson);
  useEffect(() => { if (readable) noteLessonOpened(lesson.slug); }, [readable, lesson]);

  if (!lesson) return <NotFound />;
  const domain = domainById(lesson.domainId);
  const locked = !readable;
  const complete = !!study.completed[lesson.slug];
  const checkpointRefs = body ? body.checkpoints.flat() : [];
  const cpAnswers = study.checkpoints[lesson.slug] || {};
  const cpAnswered = checkpointRefs.filter((r) => cpAnswers[r]).length;
  const cpCorrect = checkpointRefs.filter((r) => cpAnswers[r] && cpAnswers[r].correct).length;
  const cpAllDone = cpAnswered === checkpointRefs.length;
  const { next } = neighbors(lesson.slug);
  const toc = body && body.headings.length > 0 && (
    <ul className="toc">
      {body.headings.map((h, i) => (
        <li key={h.id}>
          {locked && i > 0
            ? <span style={{ display: 'block', padding: '6px 10px', color: 'var(--muted)' }}>{h.text} <span className="visually-hidden">(sign in to read)</span></span>
            : <a href={`#${h.id}`}>{h.text}</a>}
        </li>
      ))}
      <li><a href="#practice-heading">Practice exams</a></li>
    </ul>
  );

  return (
    <article>
      <div className="container" style={{ paddingTop: 40 }}>
        <Breadcrumb items={[
          { label: 'AICP prep', to: P.aicp },
          { label: 'Course', to: P.course },
          { label: `Domain ${domain.code}: ${domain.short}`, to: P.domain(domain.id) },
          { label: lesson.title },
        ]} />
        <div className="row-wrap" style={{ gap: 8 }}>
          <Link to={P.domain(domain.id)} className="chip chip-brand">Domain {domain.code} &middot; {domain.name} &middot; {domain.weight}% of the exam</Link>
          {complete && <span className="chip chip-ok">&#10003; Completed</span>}
          {access.paidTier && (
            <span className={`chip ${lesson.access === 'free' ? 'chip-ok' : 'chip-neutral'}`}>{lesson.access === 'free' ? 'Free lesson' : 'Full Access'}</span>
          )}
        </div>
        <h1 className="h1" style={{ marginTop: 16, maxWidth: '24ch' }}>{lesson.title}</h1>
        <p className="lead">{lesson.description}</p>
        <p className="small" style={{ margin: '14px 0 0' }}>
          Lesson {lesson.number} of {LESSONS.length} &middot; about {lesson.minutes} minutes
          {lesson.outline && lesson.outline.length > 0 && <> &middot; Outline areas: {lesson.outline.join('; ')}</>}
        </p>
      </div>

      <div className="container section-tight">
        <div className="lesson-layout">
          <div style={{ minWidth: 0 }}>
            {!body && <p className="small" role="status">Loading the lesson&hellip;</p>}
            {body && (locked ? (
              <>
                <LessonBody html={previewHtml(body.html)} />
                <AccessGate what="the rest of this lesson" />
              </>
            ) : (
              <>
                <LessonBody html={body.html} slug={lesson.slug} />
                <section aria-label="Lesson completion" className="card" style={{ marginTop: 20, display: 'flex', flexWrap: 'wrap', gap: 14, alignItems: 'center', justifyContent: 'space-between', ...(complete ? { borderColor: 'var(--ok-fg)', background: 'var(--ok-bg)' } : {}) }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 16.5 }}>{complete ? 'Lesson complete' : 'Finished this lesson?'}</div>
                    {checkpointRefs.length > 0 && (
                      <div className="small" style={{ fontWeight: 600, color: 'var(--ink)', margin: '2px 0' }}>
                        Checkpoints: {cpAnswered} of {checkpointRefs.length} answered{cpAnswered ? `, ${cpCorrect} correct` : ''}
                      </div>
                    )}
                    <div className="small">
                      {complete ? 'It counts toward your course progress and study plan.'
                        : cpAllDone ? 'Mark it complete to track your course progress and study plan.'
                          : 'Answer every checkpoint in the lesson to finish it.'}
                    </div>
                  </div>
                  <div className="row-wrap">
                    <button type="button" className={`btn ${complete ? 'btn-secondary' : 'btn-primary'}`} aria-pressed={complete} disabled={!complete && !cpAllDone} onClick={() => setLessonComplete(lesson.slug, !complete)}>
                      {complete ? 'Mark as not complete' : 'Mark lesson complete'}
                    </button>
                    {complete && next && <Link className="btn btn-primary" to={P.lesson(next.slug)}>Next: {next.title}</Link>}
                  </div>
                </section>
              </>
            ))}
            <PracticeBlock lesson={lesson} />
            <Pager slug={lesson.slug} />
          </div>

          <aside className="lesson-aside" aria-label="In this lesson">
            {toc && (
              <>
                <div className="card card-sm toc-desktop">
                  <span className="eyebrow">In this lesson</span>
                  {toc}
                </div>
                <details className="card card-sm toc-mobile">
                  <summary>In this lesson</summary>
                  {toc}
                </details>
              </>
            )}
          </aside>
        </div>
      </div>
    </article>
  );
}
