import { Link } from 'react-router-dom';
import ContentPage from '../../components/ContentPage';
import body from '../../content/pages/exam-info.md';
import { P } from '../../lib/paths';

export default function ExamInfo() {
  return (
    <ContentPage
      eyebrow="Exam info"
      title="About the AICP exam"
      pageTitle="AICP exam info"
      lead="The format, scoring, eligibility, and registration process in plain language, with links to APA for the official details."
      body={body}
      after={(
        <div className="card" style={{ marginTop: 40 }}>
          <h2 className="h3">Ready to start studying?</h2>
          <p className="body-text" style={{ margin: '8px 0 16px' }}>Take the free diagnostic to see where you stand, then follow a study plan.</p>
          <div className="row-wrap">
            <Link className="btn btn-primary" to={P.diagnostic}>Take the diagnostic</Link>
            <Link className="btn btn-secondary" to={P.studyPlan}>See the study plans</Link>
            <Link className="btn btn-secondary" to={P.faq}>Read the FAQ</Link>
          </div>
        </div>
      )}
    />
  );
}
