import { Link } from 'react-router-dom';
import ContentPage from '../../components/ContentPage';
import body from '../../content/pages/exam-info.md';
import { P } from '../../lib/paths';

export default function ExamInfo() {
  return (
    <ContentPage
      eyebrow="Exam info"
      title="About the AICP exam"
      art="page-calendar" artW={470} artH={330} artTilt={-1.5}
      artAlt="A wall calendar with study days crossed off and test day circled in red"
      pageTitle="AICP exam info"
      lead="The format, scoring, eligibility, and registration process in plain language, with links to APA for the official details."
      body={body}
      after={(
        <div className="card" style={{ marginTop: 40 }}>
          <h2 className="h3">Ready to start studying?</h2>
          <p className="body-text" style={{ margin: '8px 0 16px' }}>Take Practice Exam 1 in practice mode to see where you stand, then work through the lessons it points you to.</p>
          <div className="row-wrap">
            <Link className="btn btn-primary" to={P.runExam('e1', 'practice')}>Start Practice Exam 1</Link>
            <Link className="btn btn-secondary" to={P.course}>Browse the course</Link>
            <Link className="btn btn-secondary" to={P.faq}>Read the FAQ</Link>
          </div>
        </div>
      )}
    />
  );
}
