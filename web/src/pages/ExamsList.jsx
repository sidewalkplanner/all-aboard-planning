import { Link, useNavigate } from 'react-router-dom';
import Hoverable from '../components/Hoverable';
import { ASSESSMENTS } from '../data/domains';
import { chipStyle, cardStyle } from '../lib/style';
import { LIGHT } from '../lib/theme';
import useAccess from '../hooks/useAccess';
import { PUBLIC_ASSESSMENTS } from '../lib/access';
import { P } from '../lib/paths';
import usePageTitle from '../hooks/usePageTitle';

const rowCardStyle = { ...cardStyle(LIGHT, { padding: 24 }), display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 24, alignItems: 'center' };
const ghostBtn = { background: 'none', border: '1px solid #D2D6E6', color: '#1A1C2B', padding: '12px 18px', borderRadius: 10, fontSize: 15, fontWeight: 600 };
const ghostBtnHover = { border: '1px solid #1A1C2B', background: '#F6F7FB' };
const primaryBtn = { background: '#1D5FA8', border: 'none', color: '#F6F7FB', padding: '12px 18px', borderRadius: 10, fontSize: 15, fontWeight: 600 };
const primaryBtnHover = { background: '#164C87' };

function Row({ a, canOpen, lockLabel, blockedTo, onPractice, onTimed, statusLabel }) {
  const locked = !canOpen && !a.soon;
  const hrs = Math.floor(a.mins / 60), mns = a.mins % 60;
  const status = a.soon ? 'In development' : statusLabel;
  const statusStyle = a.soon ? chipStyle('#FCF0DB', '#8A6420') : locked ? chipStyle('#ECEDF6', '#4F5573') : chipStyle('#E6EEF9', '#14508C');
  const timeLabel = (hrs ? hrs + 'h ' : '') + (mns ? mns + 'm' : '');

  return (
    <div style={rowCardStyle}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 25, fontWeight: 700, margin: 0 }}>{a.title}</h2>
          <span style={statusStyle}>{status}</span>
        </div>
        <p style={{ fontSize: 15, color: '#5B6180', margin: '8px 0 0', maxWidth: '52ch' }}>{a.blurb}</p>
        <div style={{ display: 'flex', gap: 18, marginTop: 14, fontSize: 13.5, color: '#5B6180', flexWrap: 'wrap' }}>
          <span>{a.size} questions</span><span>{timeLabel}</span>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
        {locked && <Link className="btn btn-dark" to={blockedTo}>{lockLabel}</Link>}
        {a.soon && (
          <span style={{ fontSize: 14.5, fontWeight: 600, color: '#8A6420', background: '#FCF0DB', padding: '12px 18px', borderRadius: 10 }}>Coming soon</span>
        )}
        {!locked && !a.soon && (
          <>
            <Hoverable style={ghostBtn} hoverStyle={ghostBtnHover} onClick={onPractice}>Practice mode</Hoverable>
            <Hoverable style={primaryBtn} hoverStyle={primaryBtnHover} onClick={onTimed}>Start timed</Hoverable>
          </>
        )}
      </div>
    </div>
  );
}

export default function ExamsList() {
  usePageTitle('Practice exams');
  const navigate = useNavigate();
  const access = useAccess();
  const isPublic = (a) => PUBLIC_ASSESSMENTS.includes(a.id);
  const open = ASSESSMENTS.filter(isPublic);
  const rest = ASSESSMENTS.filter((a) => !isPublic(a));

  const practice = (id) => navigate(P.runExam(id, 'practice'));
  const timed = (id) => navigate(P.runExam(id, 'timed'));
  const statusFor = (a) => {
    if (isPublic(a)) return 'Open to everyone';
    if (access.paidTier && a.tier === 'paid') return access.fullAccess ? 'Unlocked' : 'Full Access';
    return 'Free with an account';
  };
  const row = (a) => (
    <Row
      key={a.id}
      a={a}
      canOpen={access.canOpenAssessment(a)}
      statusLabel={statusFor(a)}
      lockLabel={access.signedIn ? 'Unlock' : 'Sign in to start'}
      blockedTo={access.blockedTarget(P.runExam(a.id, 'practice'))}
      onPractice={() => practice(a.id)}
      onTimed={() => timed(a.id)}
    />
  );
  const groupLabel = { fontSize: 12.5, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#5B6180' };

  return (
    <section style={{ maxWidth: 1180, margin: '0 auto', padding: '56px var(--gutter) 80px' }}>
      <h1 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 42, fontWeight: 700, letterSpacing: '-0.022em', margin: 0 }}>Practice exams</h1>
      <p style={{ fontSize: 16.5, color: '#5B6180', margin: '10px 0 34px', maxWidth: '62ch' }}>
        Every quiz and exam is drawn to the nine domains of the APA Exam Content Outline, in the same proportions as the real test.
        {access.signedIn ? ' Your scores are saved to your account.' : ' Start with Warm-up Quiz A, no account needed. Everything else is free with an account.'}
      </p>

      <div className="callout" style={{ marginBottom: 28 }}>
        <p className="body-text" style={{ margin: 0 }}>
          Studying a specific topic? Every <Link to={P.course} className="link-underline">course lesson</Link> has its own practice set,
          and the <Link to={P.studyPlan} className="link-underline">study plans</Link> tell you when to take each exam.
        </p>
      </div>
      <div style={{ ...groupLabel, marginBottom: 14 }}>No account needed</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>{open.map(row)}</div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '38px 0 14px', flexWrap: 'wrap' }}>
        <div style={groupLabel}>Free with an account</div>
        {!access.signedIn && (
          <Link className="link-underline" style={{ fontSize: 13.5 }} to={P.createAccount(P.exams)}>Create a free account</Link>
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>{rest.map(row)}</div>
    </section>
  );
}
