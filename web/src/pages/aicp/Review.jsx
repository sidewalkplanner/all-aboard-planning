import { Link } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import usePageTitle from '../../hooks/usePageTitle';
import useAccess from '../../hooks/useAccess';
import { P } from '../../lib/paths';

// The study guides hub (/aicp/review): the two reading guides. Flashcards have
// their own nav item, and the dashboard lists lessons to review.
const GUIDES = [
  { to: P.strategy, title: 'Exam strategy guide', body: 'How the exam asks questions, a pacing plan for 3.5 hours, the "planner’s answer" instinct, the distractors to distrust, and how to spend your last week.', cta: 'Read the guide' },
  { to: P.quickRef, title: 'Quick reference', body: 'One page of landmark cases, federal laws in order, people and ideas, formulas, key numbers, and commonly confused pairs.', cta: 'Open the quick reference' },
];

export default function Review() {
  usePageTitle('Study guides');
  const { signedIn } = useAccess();
  return (
    <>
      <PageHeader
        eyebrow="Guides"
        title="Study guides"
        art="spot-compass" artW={300} artH={300}
        artAlt="A paper compass rose"
        lead="Two guides to read alongside the lessons: how to take the exam, and the facts worth knowing cold, on one page. Lean on them in the final weeks."
      />
      <div className="container" style={{ paddingBottom: 72 }}>
        <div className="grid-cards">
          {GUIDES.map((t) => (
            <Link key={t.to} to={t.to} className="card card-link">
              <h2 className="h3">{t.title}</h2>
              <p className="body-text" style={{ margin: 0 }}>{t.body}</p>
              <span className="link-arrow" style={{ marginTop: 'auto' }}>{t.cta}</span>
            </Link>
          ))}
        </div>
        <p className="body-text" style={{ margin: '28px 0 0' }}>
          Looking for something else? <Link to={P.flashcards} className="link-underline">Flashcards</Link> drill the key
          terms from every lesson, and your <Link to={P.progress} className="link-underline">dashboard</Link> lists the
          lessons behind the questions you&rsquo;ve missed.
        </p>
        {!signedIn && <p className="small" style={{ margin: '12px 0 0' }}>The study guides open once you sign in.</p>}
      </div>
    </>
  );
}
