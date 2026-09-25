import { Link } from 'react-router-dom';
import ContentPage from '../../components/ContentPage';
import body from '../../content/pages/exam-strategy.md';
import { P } from '../../lib/paths';

export default function ExamStrategy() {
  return (
    <ContentPage
      eyebrow="Review"
      title="Exam strategy guide"
      art="spot-compass" artW={300} artH={300}
      artAlt="A paper compass rose"
      lead="How to read, pace, and reason through the AICP exam, so what you know shows up in your score."
      body={body}
      after={(
        <div className="card" style={{ marginTop: 40 }}>
          <h2 className="h3">Put it into practice</h2>
          <p className="body-text" style={{ margin: '8px 0 16px' }}>Try the pacing plan on a full-length timed exam, and use the flag-and-return rhythm.</p>
          <div className="row-wrap">
            <Link className="btn btn-primary" to={P.exams}>Practice exams</Link>
            <Link className="btn btn-secondary" to={P.quickRef}>Quick reference</Link>
          </div>
        </div>
      )}
    />
  );
}
