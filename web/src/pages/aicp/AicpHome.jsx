import { Link } from 'react-router-dom';
import usePageTitle from '../../hooks/usePageTitle';
import { P } from '../../lib/paths';
import { DOMAINS, LESSONS, lessonBySlug } from '../../content/aicp/curriculum';
import useAccess from '../../hooks/useAccess';
import { useStudyState } from '../../lib/studyState';
import HeroTown from '../../components/HeroTown';
import Art from '../../components/Art';
import { art, badgeFor, DOMAIN_COLOR } from '../../lib/art';

const OFFERS = [
  { title: `${LESSONS.length} lessons in nine domains`, body: 'Plain-language lessons organized by the AICP exam content outline, with checkpoint questions after every key section, key terms, real planning examples, and exam tips.', to: P.course, cta: 'Browse the course', tape: 'tape' },
  { title: '8- and 12-week study plans', body: 'Week-by-week schedules for every lesson and exam. Follow one and your dashboard shows exactly what’s due this week.', to: P.studyPlan, cta: 'See the plans', tape: 'pin' },
  { title: 'Three full-length practice exams', body: '170 questions each, on the real 3.5-hour clock, with scenario sets and data exhibits. Results rank the domains to study first and list the lessons behind every miss.', to: P.exams, cta: 'See practice exams', tape: 'tape tape--mint' },
  { title: 'A dashboard for your prep', body: 'Lessons finished, exam scores, the domains to study first, and the lessons to reread, all in one place.', to: P.progress, cta: 'Open your dashboard', tape: 'pin' },
  { title: 'Flashcards and quick reference', body: `Hundreds of flashcards built from every lesson's key terms, plus one page of cases, laws, people, formulas, and key numbers.`, to: P.review, cta: 'See the review tools', tape: 'tape tape--blush' },
  { title: 'An exam strategy guide', body: 'How the exam asks questions, a pacing plan for 3.5 hours, and the reasoning that separates the best answer from a merely true one.', to: P.strategy, cta: 'Read the guide', tape: 'pin' },
];

const AUDIENCES = [
  { title: 'Working planners', body: 'You know the job but haven’t studied for a test in years. You need the theory, law, and history behind daily practice organized and refreshed.', bg: 'var(--butter)' },
  { title: 'Early-career planners', body: 'You’ve recently become eligible and want a structured path through material that school only partly covered.', bg: 'var(--sky)' },
  { title: 'Candidates retaking the exam', body: 'You want to find exactly which domains cost you points and spend your time there, not on what you already know.', bg: 'var(--blush)' },
];

const STEPS = [
  ['01', 'Baseline', 'Take Practice Exam 1 in practice mode. Your results rank the nine domains by how many points each is costing you.', 'spot-compass', 300, 300, 'var(--sky)'],
  ['02', 'Learn', 'Work through the lessons on a study plan, starting with your priority domains.', 'page-books', 420, 310, 'var(--butter)'],
  ['03', 'Check', 'Answer each lesson’s checkpoints as you read, and circle back to anything you miss.', 'spot-flag', 320, 240, 'var(--blush)'],
  ['04', 'Rehearse', 'Take full-length timed exams to build pace and stamina, and review every miss.', 'spot-mode', 320, 220, 'var(--mint)'],
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
  const maxPct = Math.max(...DOMAINS.map((d) => d.weight));

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
              Learn it, practice it, and walk in <em className="marker">ready.</em>
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
          <h2 id="who-heading" className="h2" style={{ marginTop: 18 }}>Built for planners studying around a <span className="scribble">full-time</span> job</h2>
          <p className="lead" style={{ color: '#3D3326' }}>If you meet APA&rsquo;s eligibility requirements and are preparing for the AICP exam, this course is for you.</p>
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

      {/* WHAT YOU GET */}
      <section className="section" aria-labelledby="offer-heading" style={{ paddingTop: 76 }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
            <div>
              <span className="eyebrow eyebrow-rust">What the course offers</span>
              <h2 id="offer-heading" className="h2">Lessons and practice, <em className="marker marker--sky">connected</em></h2>
              <p className="lead">Every lesson checks your understanding as you go, and every score report points back to the lessons.</p>
            </div>
            <span className="hand" style={{ fontSize: 26, transform: 'rotate(-4deg)', color: 'var(--brand-strong)' }}>everything in one station</span>
          </div>
          <div className="grid-cards" style={{ marginTop: 36, gap: 28 }}>
            {OFFERS.map((o, i) => (
              <Link key={o.title} to={o.to} className="card card-link" style={{ '--r': `${[-0.8, 0.6, -0.4, 0.7, -0.6, 0.4][i]}deg`, padding: '26px 24px 22px' }}>
                <span className={o.tape} aria-hidden="true" />
                <h3 className="h3">{o.title}</h3>
                <p className="body-text" style={{ margin: 0 }}>{o.body}</p>
                <span className="link-arrow" style={{ marginTop: 'auto', paddingTop: 6 }}>{o.cta}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section band-white" aria-labelledby="how-heading" style={{ marginTop: 20 }}>
        <div className="container">
          <span className="eyebrow eyebrow-rust">How it works</span>
          <h2 id="how-heading" className="h2">Four steps, repeated until test day</h2>
          <ol style={{ listStyle: 'none', padding: 0, margin: '36px 0 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,230px),1fr))', gap: 26 }}>
            {STEPS.map(([n, title, body, img, w, h, bg], i) => (
              <li key={n} className="card" style={{ '--r': `${[-0.8, 0.6, -0.4, 0.7][i]}deg`, padding: '16px 18px 22px' }}>
                <div aria-hidden="true" style={{ background: bg, borderRadius: 'var(--wobble-sm)', border: '2px solid var(--ink)', padding: 10, height: 150, display: 'grid', placeItems: 'center' }}>
                  <Art name={img} w={w} h={h} style={{ width: 'auto', height: 126, maxWidth: '100%' }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 16 }}>
                  <span className="num" aria-hidden="true">{n}</span>
                  <h3 className="h3">{title}</h3>
                </div>
                <p className="body-text" style={{ margin: '6px 0 0' }}>{body}</p>
              </li>
            ))}
          </ol>
          <div className="row-wrap" style={{ marginTop: 36 }}>
            <Link className="btn btn-dark" to={P.studyPlan}>Pick a study plan</Link>
            <Link className="btn btn-secondary" to={P.exams}>See the practice exams</Link>
          </div>
        </div>
      </section>

      {/* WEIGHTING: the nine domains, each with its badge */}
      <section className="section" aria-labelledby="weight-heading" style={{ paddingTop: 84 }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
            <div>
              <span className="eyebrow eyebrow-rust">The exam blueprint</span>
              <h2 id="weight-heading" className="h2">How the exam is weighted</h2>
              <p className="lead">
                The course and the practice exams all follow the nine domains of the content outline in these proportions.
                Select a domain to see its lessons.
              </p>
            </div>
            <span className="hand" style={{ fontSize: 26, transform: 'rotate(-4deg)', color: 'var(--brand-strong)' }}>nine lines, one exam</span>
          </div>
          {/* VERIFY: domain weights come from uploads/aicp-diagnostic-exam-spec.md; confirm against APA's current published content outline. */}
          <ul className="card" style={{ listStyle: 'none', margin: '32px 0 0', padding: '8px 26px' }}>
            {DOMAINS.map((d, i) => (
              <li key={d.id} style={{ borderBottom: i < DOMAINS.length - 1 ? '2px dashed var(--line)' : 'none' }}>
                <Link to={P.domain(d.id)} className="weight-row">
                  <img src={badgeFor(d.name)} alt="" aria-hidden="true" width="48" height="48" loading="lazy" />
                  <span style={{ fontSize: 15.5, fontWeight: 700 }}>{d.code}. {d.name}</span>
                  <span className="meter" aria-hidden="true">
                    <span style={{ width: `${(d.weight / maxPct) * 100}%`, background: DOMAIN_COLOR[d.name], animationDelay: `${i * 60}ms` }} />
                  </span>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 800, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{d.weight}%</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* EVERY EXAM RANKS WHERE TO STUDY */}
      <section className="band-warm" aria-labelledby="rank-heading" style={{ marginTop: 20 }}>
        <div className="container section" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,320px),1fr))', gap: 48, alignItems: 'center' }}>
          <div>
            <span className="stamp" style={{ color: 'var(--tomato-ink)' }}>170 questions &middot; every exam</span>
            <h2 id="rank-heading" className="h2" style={{ marginTop: 20 }}>Every exam shows you where you <span className="scribble">actually</span> stand.</h2>
            <p className="body-text" style={{ fontSize: 17, margin: '16px 0 0', maxWidth: '54ch', color: '#3D3326' }}>
              Start with Practice Exam 1 in practice mode as your baseline. With 170 questions, your results give a solid read on
              each of the nine domains, so your study time goes where you&rsquo;re losing points. Each later exam updates the list.
            </p>
            <div className="row-wrap" style={{ marginTop: 28 }}>
              <Link className="btn btn-dark btn-lg" to={P.exams}>See the practice exams</Link>
            </div>
          </div>
          <div style={{ maxWidth: 540, justifySelf: 'center', width: '100%', transform: 'rotate(1.5deg)' }}>
            <Art name="spot-diagnostic" w={560} h={460} alt="A hand-drawn town map with a dotted route from a pin marked 'you are here' to a red X labelled 'study here!'" />
          </div>
          <div className="grid-cards" style={{ gridColumn: '1 / -1', gap: 26 }}>
            {[
              ['Every domain scored', 'A score for each of the nine domains, so you can see strengths and gaps at a glance.', 'tape'],
              ['Study in order', 'Domains ranked by exam weight times the share you missed, so a soft spot in a heavy domain outranks a worse score in a light one.', 'pin'],
              ['The lessons behind every miss', 'Your results list the lessons that teach each question you missed, most-missed first.', 'tape tape--mint'],
            ].map(([t, b, fix], i) => (
              <div key={t} className="card card-sm card--lift" style={{ '--r': `${[-1.2, 0.8, -0.6][i]}deg`, paddingTop: 24 }}>
                <span className={fix} aria-hidden="true" />
                <h3 className="hand" style={{ margin: 0, fontSize: 26, color: 'var(--tomato-deep)' }}>{t}</h3>
                <p className="body-text" style={{ margin: '8px 0 0' }}>{b}</p>
              </div>
            ))}
          </div>
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
