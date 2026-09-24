import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import LessonBody from '../../components/LessonBody';
import MembershipGate, { useMembership } from '../../components/MembershipGate';
import NotFound from '../NotFound';
import usePageTitle from '../../hooks/usePageTitle';
import { P } from '../../lib/paths';
import { LESSONS, domainById, lessonBySlug, neighbors } from '../../content/aicp/curriculum';
import { FREE_QUIZ_REFS } from '../../content/aicp/freeQuizRefs';

// Lesson bodies are code-split: each Markdown file becomes its own chunk,
// fetched only when that lesson is opened.
const BODIES = import.meta.glob('../../content/aicp/lessons/*.md');
const bodyLoader = (slug) => BODIES[`../../content/aicp/lessons/${slug}.md`];

// For locked lessons, show everything up to the second <h2> (the learning
// objectives) as a preview.
const previewHtml = (html) => {
  const first = html.indexOf('<h2');
  const second = first >= 0 ? html.indexOf('<h2', first + 3) : -1;
  return second > 0 ? html.slice(0, second) : html;
};

const BANK_LABEL = { e1: 'Practice Exam 1', e2: 'Practice Exam 2', e3: 'Practice Exam 3' };

function PracticeBlock({ lesson, domain }) {
  const { isMember } = useMembership();
  const refs = lesson.practice || [];
  const freeCount = lesson.access === 'free' ? refs.filter((r) => FREE_QUIZ_REFS.has(r)).length : 0;
  const banks = [...new Set(refs.map((r) => r.split(':')[0]))].sort().map((b) => BANK_LABEL[b]);
  const sources = banks.length > 1 ? `${banks.slice(0, -1).join(', ')} and ${banks[banks.length - 1]}` : banks[0];

  return (
    <section aria-labelledby="practice-heading" className="card" style={{ marginTop: 40 }}>
      <span className="eyebrow eyebrow-rust">Practice</span>
      <h2 id="practice-heading" className="h3" style={{ marginBottom: 8 }}>Test yourself on this lesson</h2>
      {refs.length > 0 && (
        <p className="body-text" style={{ margin: '0 0 16px' }}>
          This lesson&rsquo;s practice set has <strong>{refs.length} questions</strong> on these topics, taken from {sources}.
          It&rsquo;s untimed, and you can check each answer and read the explanation as you go.
        </p>
      )}
      <div className="row-wrap">
        {refs.length > 0 && isMember && (
          <Link className="btn btn-primary" to={P.runSet(lesson.slug)}>Start the practice set ({refs.length})</Link>
        )}
        {refs.length > 0 && !isMember && freeCount > 0 && (
          <Link className="btn btn-primary" to={P.runSet(lesson.slug)}>Try {freeCount} free {freeCount === 1 ? 'question' : 'questions'}</Link>
        )}
        {refs.length > 0 && !isMember && (
          <Link className="btn btn-secondary" to={P.pricing}>{freeCount > 0 ? `Unlock all ${refs.length}` : `Unlock the practice set (${refs.length})`}</Link>
        )}
        <Link className="btn btn-secondary" to={isMember ? P.runDrill(domain.bankName) : P.pricing}>
          {isMember ? `Drill ${domain.short}` : `${domain.short} drill (Full Access)`}
        </Link>
      </div>
      {!isMember && freeCount > 0 && (
        <p className="small" style={{ margin: '12px 0 0' }}>
          The free questions also appear in the free warm-up quizzes. Full Access opens the rest of the set.
        </p>
      )}
      <p className="small" style={{ margin: '14px 0 0' }}>
        Also free: the <Link to={P.exams} className="link-underline">warm-up quizzes</Link> and
        the <Link to={P.diagnostic} className="link-underline">diagnostic</Link>, which shows where to focus next.
      </p>
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
  const { isMember } = useMembership();
  const [body, setBody] = useState(null);
  usePageTitle(lesson ? lesson.title : 'Lesson not found');

  useEffect(() => {
    let live = true;
    setBody(null);
    const load = lesson && bodyLoader(lesson.slug);
    if (load) load().then((m) => { if (live) setBody(m.default); });
    return () => { live = false; };
  }, [lesson]);

  if (!lesson) return <NotFound />;
  const domain = domainById(lesson.domainId);
  const locked = lesson.access === 'paid' && !isMember;

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
          <span className={`chip ${lesson.access === 'free' ? 'chip-ok' : 'chip-neutral'}`}>{lesson.access === 'free' ? 'Free lesson' : 'Full Access'}</span>
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
                <MembershipGate what="the rest of this lesson" />
              </>
            ) : (
              <LessonBody html={body.html} />
            ))}
            <PracticeBlock lesson={lesson} domain={domain} />
            <Pager slug={lesson.slug} />
          </div>

          <aside className="lesson-aside" aria-label="In this lesson">
            {body && body.headings.length > 0 && (
              <div className="card card-sm">
                <span className="eyebrow">In this lesson</span>
                <ul className="toc">
                  {body.headings.map((h, i) => (
                    <li key={h.id}>
                      {locked && i > 0
                        ? <span style={{ display: 'block', padding: '6px 10px', color: 'var(--muted)' }}>{h.text} <span className="visually-hidden">(Full Access)</span></span>
                        : <a href={`#${h.id}`}>{h.text}</a>}
                    </li>
                  ))}
                  <li><a href="#practice-heading">Practice questions</a></li>
                </ul>
              </div>
            )}
          </aside>
        </div>
      </div>
    </article>
  );
}
