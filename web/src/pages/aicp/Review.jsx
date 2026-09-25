import { Link } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import usePageTitle from '../../hooks/usePageTitle';
import { P } from '../../lib/paths';

const TOOLS = [
  { to: P.strategy, title: 'Exam strategy guide', body: 'How the exam asks questions, a pacing plan for 3.5 hours, the "planner’s answer" instinct, the distractors to distrust, and how to spend your last week.', cta: 'Read the guide' },
  { to: P.flashcards, title: 'Flashcards', body: 'Every key term, case, and law from the lessons as flip cards. Sessions deal your weakest cards first, and your progress is saved.', cta: 'Study flashcards' },
  { to: P.quickRef, title: 'Quick reference', body: 'One page of landmark cases, federal laws in order, people and ideas, formulas, key numbers, and commonly confused pairs.', cta: 'Open the quick reference' },
  { to: P.progress, title: 'Your lessons to review', body: 'Your dashboard lists the lessons behind the questions you’ve missed most, so final review goes where it counts.', cta: 'See your dashboard' },
];

export default function Review() {
  usePageTitle('Review tools');
  return (
    <>
      <PageHeader
        eyebrow="Review"
        title="Review tools"
        lead="The lessons teach the material. These tools help you remember it and perform on test day. Use them throughout your prep, and lean on them in the final weeks."
      />
      <div className="container" style={{ paddingBottom: 72 }}>
        <div className="grid-cards">
          {TOOLS.map((t) => (
            <Link key={t.to} to={t.to} className="card card-link">
              <h2 className="h3">{t.title}</h2>
              <p className="body-text" style={{ margin: 0 }}>{t.body}</p>
              <span className="link-arrow" style={{ marginTop: 'auto' }}>{t.cta}</span>
            </Link>
          ))}
        </div>
        <p className="small" style={{ margin: '20px 0 0' }}>All review tools are free with an account.</p>
      </div>
    </>
  );
}
