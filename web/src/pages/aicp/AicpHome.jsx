import { Link } from 'react-router-dom';
import usePageTitle from '../../hooks/usePageTitle';
import { P } from '../../lib/paths';
import { LESSONS, lessonBySlug } from '../../content/aicp/curriculum';
import useAccess from '../../hooks/useAccess';
import { useStudyState } from '../../lib/studyState';
import HeroTown from '../../components/HeroTown';
import Art from '../../components/Art';
import { art } from '../../lib/art';

const AUDIENCES = [
  { title: 'Recent graduates', body: 'Your coursework is fresh. The lessons connect it to how planning works in practice, which the exam tests too.', bg: 'var(--sky)' },
  { title: 'Working professionals', body: 'You know the job but haven’t taken a test in years. Get the theory, law, and history organized, on a plan that fits your schedule.', bg: 'var(--butter)' },
  { title: 'Candidates retaking the exam', body: 'Find the domains that cost you points and spend your time there, not on what you already know.', bg: 'var(--blush)' },
];

// How it works, as three stops on the line. Each names the tools you use there,
// so the page describes every part of the course once.
const STOPS = [
  {
    title: 'Take a baseline exam',
    body: 'Start with Practice Exam 1 in practice mode: untimed and saved as you go. Your results rank the nine domains by how many points each is costing you.',
    art: ['spot-compass', 300, 300], bg: 'var(--sky)',
    links: [[P.exams, 'See the practice exams']],
  },
  {
    title: 'Study what it points to',
    body: 'Work through the lessons for your weakest domains first, on an 8- or 12-week study plan. Checkpoints test you as you read, and flashcards keep key terms fresh.',
    art: ['page-books', 420, 310], bg: 'var(--butter)',
    links: [[P.course, 'Browse the lessons'], [P.studyPlan, 'See the study plans']],
  },
  {
    title: 'Rehearse and track',
    body: 'Take the other full-length exams on the real 3.5-hour clock. Each one updates your dashboard’s list of what to study next.',
    art: ['spot-mode', 320, 220], bg: 'var(--mint)',
    links: [[P.strategy, 'Read the exam strategy guide']],
  },
];

// Practice Exam 1 as the baseline, the first thing to do. Rendered beside the headline on
// wide screens and below the town on narrow ones (see .hero-card--wide).
function FirstStop({ signedIn, className = '' }) {
  return (
    <div className={`card hero-card ${className}`} style={{ '--r': '1deg' }}>
      <span className="tape" aria-hidden="true" />
      <span className="hand" style={{ display: 'block', fontSize: 26, color: 'var(--brand-strong)' }}>First stop: your baseline</span>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginTop: 6 }}>
        <div style={{ width: 88, flex: 'none' }}><Art name="spot-score" w={320} h={240} eager /></div>
        <h2 className="h3" style={{ fontSize: 26 }}>Practice Exam 1</h2>
      </div>
      <p className="body-text" style={{ margin: '8px 0 16px' }}>
        170 questions in practice mode, untimed and saved as you go. Your results rank the domains
        costing you the most points, so you know where to start.
      </p>
      <Link className="btn btn-primary btn-block" to={signedIn ? P.runExam('e1', 'practice') : P.createAccount(P.runExam('e1', 'practice'))}>Start Practice Exam 1</Link>
    </div>
  );
}

export default function AicpHome() {
  usePageTitle('');
  const { signedIn, user } = useAccess();
  const study = useStudyState();
  const last = study.lastLesson && lessonBySlug(study.lastLesson.slug);
  const resume = last && !study.completed[last.slug] ? last : LESSONS.find((l) => !study.completed[l.slug]);
  const doneCount = LESSONS.filter((l) => study.completed[l.slug]).length;

  return (
    <>
      {signedIn && (
        <section aria-label="Pick up where you left off" className="container" style={{ paddingTop: 22 }}>
          <div className="card card-sm" style={{ '--r': '-0.4deg', display: 'flex', flexWrap: 'wrap', gap: '10px 20px', alignItems: 'center', justifyContent: 'space-between', background: 'var(--butter) var(--grain-tex)' }}>
            <p className="body-text" style={{ margin: 0, color: 'var(--ink)' }}>
              <strong className="hand" style={{ fontSize: 26, color: 'var(--ink)' }}>Welcome back{user && user.name ? `, ${user.name.split(' ')[0]}` : ''}!</strong>{' '}
              {doneCount} of {LESSONS.length} lessons complete.{resume ? ` Up next: lesson ${resume.number}, ${resume.title}.` : ''}
            </p>
            <div className="row-wrap" style={{ gap: 10 }}>
              {resume && <Link className="btn btn-dark btn-sm" to={P.lesson(resume.slug)}>Continue</Link>}
              <Link className="btn btn-secondary btn-sm" to={P.progress}>Dashboard</Link>
            </div>
          </div>
        </section>
      )}

      {/* HERO: headline and the first-stop card over the paper town */}
      <section style={{ position: 'relative', overflow: 'hidden' }}>
        <img src={art('hero-cloud-a')} alt="" aria-hidden="true" className="sky-bit sky-bit--cloud" style={{ width: 190, top: 6, left: '50%' }} />
        <img src={art('hero-cloud-b')} alt="" aria-hidden="true" className="sky-bit sky-bit--cloud-b" style={{ width: 140, top: 300, left: '47%' }} />
        <img src={art('hero-sun')} alt="" aria-hidden="true" className="sky-bit sky-bit--sun" style={{ width: 150, top: 18, right: '2%' }} />

        <div className="container hero-grid">
          <div>
            <span className="chip chip-warn" style={{ transform: 'rotate(-2deg)' }}>AICP exam prep: lessons, study plans, and practice</span>
            <h1 className="display hero-title">
              Your one stop for <em className="marker">AICP prep!</em>
            </h1>
            <p className="lead hero-lead">
              A complete course for the AICP Certification Exam, built around APA&rsquo;s nine-domain content outline. Study
              plain-language lessons, follow a week-by-week plan, and practice with exam-style questions that explain every answer.
            </p>
            <div className="row-wrap hero-actions">
              <Link className="btn btn-rust btn-lg" to={P.course}>Browse the course</Link>
              {signedIn
                ? <Link className="btn btn-secondary btn-lg" to={P.exams}>See the practice exams</Link>
                : <Link className="btn btn-secondary btn-lg" to={P.createAccount(P.course)}>Create an account</Link>}
            </div>
            <dl className="hero-stats">
              {[[LESSONS.length, 'lessons', 'var(--butter)', -2], ['3', 'full-length exams', 'var(--sky)', 1.5], ['9', 'exam domains', 'var(--blush)', -1]].map(([n, label, bg, r]) => (
                <div key={label} className="stat-pill" style={{ transform: `rotate(${r}deg)` }}>
                  <dt className="visually-hidden">{label}</dt>
                  <dd style={{ margin: 0, display: 'contents' }}>
                    <span className="stat-pill__num" style={{ background: bg }}>{n}</span>
                    <span className="stat-pill__label" aria-hidden="true">{label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <FirstStop signedIn={signedIn} className="hero-card--wide" />
        </div>

        {/* The town sits high enough that the streetcar is on screen without scrolling. */}
        <div className="hero-town">
          <HeroTown />
        </div>
        {/* On narrow screens the card follows the town instead, so the streetcar comes first. */}
        <div className="container hero-card-narrow">
          <FirstStop signedIn={signedIn} />
        </div>
      </section>

      {/* WHO IT'S FOR, on kraft paper continuing the embankment */}
      <section className="kraft-bg torn-top" aria-labelledby="who-heading" style={{ marginTop: -10 }}>
        <div className="container" style={{ paddingTop: 44, paddingBottom: 72 }}>
          <span className="stamp" style={{ color: 'var(--tomato-ink)' }}>Who it&rsquo;s for</span>
          <h2 id="who-heading" className="h2" style={{ marginTop: 18 }}>Built for <span className="scribble">everyone</span> headed to the AICP exam</h2>
          <p className="lead" style={{ color: '#3D3326' }}>Recent graduates, working planners, and anyone taking the exam again: if you&rsquo;re preparing for the AICP exam, this course is for you.</p>
          <div className="grid-cards" style={{ marginTop: 34 }}>
            {AUDIENCES.map((a, i) => (
              <div key={a.title} className="card card--lift" style={{ '--r': `${[-1, 0.8, -0.5][i]}deg` }}>
                <span className={i === 1 ? 'pin' : `tape ${i === 2 ? 'tape--mint' : ''}`} aria-hidden="true" />
                <span aria-hidden="true" style={{ display: 'block', width: 40, height: 8, background: a.bg, border: '2px solid var(--ink)', borderRadius: 4, marginBottom: 12 }} />
                <h3 className="h3">{a.title}</h3>
                <p className="body-text" style={{ margin: '8px 0 0' }}>{a.body}</p>
              </div>
            ))}
          </div>
          <p style={{ margin: '26px 0 0', fontSize: 14.5, color: '#3D3326' }}>
            Not sure you&rsquo;re eligible yet? <Link to={P.examInfo} className="link-underline">Read the exam info page</Link>, then confirm with APA.
          </p>
        </div>
      </section>

      {/* HOW IT WORKS: three stops, each naming the tools used there */}
      <section className="section band-white" aria-labelledby="how-heading" style={{ marginTop: 20 }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
            <div>
              <span className="eyebrow eyebrow-rust">How it works</span>
              <h2 id="how-heading" className="h2">Three stops to exam day</h2>
            </div>
            <span className="hand" style={{ fontSize: 26, transform: 'rotate(-4deg)', color: 'var(--brand-strong)' }}>repeat until you&rsquo;re ready</span>
          </div>
          <ol style={{ listStyle: 'none', padding: 0, margin: '32px 0 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,280px),1fr))', gap: 28 }}>
            {STOPS.map((stop, i) => (
              <li key={stop.title} className="card" style={{ '--r': `${[-0.8, 0.6, -0.5][i]}deg`, padding: '16px 20px 22px', display: 'flex', flexDirection: 'column' }}>
                <div aria-hidden="true" style={{ background: stop.bg, borderRadius: 'var(--wobble-sm)', border: '2px solid var(--ink)', padding: 10, height: 150, display: 'grid', placeItems: 'center' }}>
                  <Art name={stop.art[0]} w={stop.art[1]} h={stop.art[2]} style={{ width: 'auto', height: 126, maxWidth: '100%' }} />
                </div>
                <span className="hand" style={{ display: 'block', fontSize: 24, color: 'var(--tomato-deep)', marginTop: 14 }}>Stop {i + 1}</span>
                <h3 className="h3">{stop.title}</h3>
                <p className="body-text" style={{ margin: '6px 0 12px' }}>{stop.body}</p>
                <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {stop.links.map(([to, label]) => <Link key={to} to={to} className="link-arrow">{label}</Link>)}
                </div>
              </li>
            ))}
          </ol>
          <p className="body-text" style={{ margin: '30px 0 0' }}>
            Everything follows the nine domains of APA&rsquo;s exam content outline, weighted like the real exam.{' '}
            <Link to={P.examInfo} className="link-underline">See how the exam is weighted</Link>.
          </p>
        </div>
      </section>

      {/* CTA with the conductor */}
      <section className="section" aria-labelledby="cta-heading" style={{ paddingTop: 84 }}>
        <div className="container">
          <div className="card" style={{ background: 'var(--butter) var(--grain-tex)', padding: 'clamp(28px,5vw,48px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))', gap: 28, alignItems: 'center' }}>
            <span className="tape tape--mint tape--left" aria-hidden="true" />
            <span className="tape tape--blush tape--right" aria-hidden="true" />
            <div>
              <h2 id="cta-heading" className="h2">Your train is on the platform.</h2>
              <p className="lead" style={{ color: '#3A3320' }}>
                Every lesson and practice exam is open to you. Create an account and your progress is saved as you go.
              </p>
              <div className="row-wrap" style={{ marginTop: 26 }}>
                {signedIn
                  ? <Link className="btn btn-dark btn-lg" to={P.lesson(LESSONS[0].slug)}>Start the first lesson</Link>
                  : <Link className="btn btn-dark btn-lg" to={P.createAccount(P.lesson(LESSONS[0].slug))}>Create an account</Link>}
                <Link className="btn btn-secondary btn-lg" to={P.course}>Browse the course</Link>
              </div>
            </div>
            <div style={{ maxWidth: 240, justifySelf: 'center', width: '100%' }}>
              <Art name="page-conductor" w={300} h={340} alt="A cheerful streetcar conductor waving you aboard, lantern in hand" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
