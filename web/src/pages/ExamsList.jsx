import { useNavigate } from 'react-router-dom';
import PageHead from '../components/PageHead';
import { ASSESSMENTS, PRICE } from '../data/domains';
import { useUnlock } from '../context/UnlockContext';

const STUB_COLORS = { q1: 'var(--sky)', q2: 'var(--mint)', e1: 'var(--butter)', e2: 'var(--blush)', e3: 'var(--lavender)' };
const STUB_MARKS = { q1: 'A', q2: 'B', e1: '1', e2: '2', e3: '3' };

function Ticket({ a, i, unlocked, onPractice, onTimed, onUnlock }) {
  const locked = a.tier === 'paid' && !unlocked && !a.soon;
  const hrs = Math.floor(a.mins / 60), mns = a.mins % 60;
  const status = a.soon ? 'In development' : a.tier === 'free' ? 'Free ride' : locked ? 'Locked' : 'Unlocked';
  const stampColor = a.soon ? 'var(--butter-deep)' : a.tier === 'free' ? 'var(--leaf-deep)' : locked ? 'var(--ink-faint)' : 'var(--civic-ink)';
  const taken = a.soon ? a.taken : locked ? 'Included in Full Access' : a.taken;
  const timeLabel = (hrs ? hrs + 'h ' : '') + (mns ? mns + 'm' : '');

  return (
    <div className="ticket card card--lift" style={{ '--r': `${[-0.5, 0.4, -0.3, 0.5, -0.4][i % 5]}deg` }}>
      <div className="ticket__stub" style={{ background: STUB_COLORS[a.id] ?? 'var(--butter)' }}>
        <span className="ticket__admit">Admit one</span>
        <span className="ticket__mark">{STUB_MARKS[a.id] ?? '★'}</span>
        <span className="ticket__admit">No. {String(a.size).padStart(3, '0')}</span>
      </div>
      <span className="ticket__notch ticket__notch--top" aria-hidden="true" />
      <span className="ticket__notch ticket__notch--bottom" aria-hidden="true" />
      <div className="ticket__body">
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
          <h2 className="h-card" style={{ fontSize: 26 }}>{a.title}</h2>
          <span className="stamp" style={{ color: stampColor }}>{status}</span>
        </div>
        <p style={{ fontSize: 15.5, lineHeight: 1.55, color: 'var(--ink-soft)', margin: '8px 0 0', maxWidth: '56ch' }}>{a.blurb}</p>
        <div style={{ display: 'flex', gap: 10, marginTop: 14, flexWrap: 'wrap' }}>
          <span className="chip chip--plain">{a.size} questions</span>
          <span className="chip chip--plain">{timeLabel}</span>
          <span className="chip chip--plain" style={{ borderStyle: 'dashed' }}>{taken}</span>
        </div>
      </div>
      <div className="ticket__actions">
        {locked && (
          <button className="btn btn--ink" onClick={onUnlock}>
            <svg width="16" height="18" viewBox="0 0 16 18" aria-hidden="true"><rect x="1.5" y="8" width="13" height="9" rx="2" fill="currentColor" /><path d="M4.5 8V5.5a3.5 3.5 0 0 1 7 0V8" fill="none" stroke="currentColor" strokeWidth="2.2" /></svg>
            Unlock
          </button>
        )}
        {a.soon && <span className="chip chip--butter" style={{ fontSize: 14, padding: '10px 16px' }}>Coming soon</span>}
        {!locked && !a.soon && (
          <>
            <button className="btn btn--paper" onClick={onPractice}>Practice mode</button>
            <button className="btn btn--civic" onClick={onTimed}>Start timed</button>
          </>
        )}
      </div>
    </div>
  );
}

export default function ExamsList() {
  const navigate = useNavigate();
  const { unlocked } = useUnlock();
  const freeExams = ASSESSMENTS.filter((a) => a.tier === 'free');
  const paidExams = ASSESSMENTS.filter((a) => a.tier === 'paid');

  const practice = (id) => navigate(`/exam/run?aid=${id}&mode=practice`);
  const timed = (id) => navigate(`/exam/run?aid=${id}&mode=timed`);
  const goUnlock = () => navigate('/pricing');

  return (
    <section className="wrap" style={{ paddingBottom: 80 }}>
      <PageHead
        title={<>Practice <em className="marker">exams</em></>}
        art="page-tickets" artW={520} artH={320} artTilt={-2}
        artAlt="A fan of paper train tickets for Quiz A, Exam 1 and Exam 2"
        note="pick a ticket, any ticket"
      >
        Every quiz and exam is drawn to the nine domains of the APA Exam Content Outline, in the same proportions as the real test. Start with the two free quizzes.
      </PageHead>

      <div className="eyebrow" style={{ marginBottom: 18 }}>Free rides</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
        {freeExams.map((a, i) => (
          <Ticket key={a.id} a={a} i={i} unlocked={unlocked} onPractice={() => practice(a.id)} onTimed={() => timed(a.id)} onUnlock={goUnlock} />
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '48px 0 18px', flexWrap: 'wrap' }}>
        <div className="eyebrow">Full Access</div>
        {!unlocked && (
          <button className="link-btn" onClick={goUnlock}>Unlock Full Access for {PRICE}</button>
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
        {paidExams.map((a, i) => (
          <Ticket key={a.id} a={a} i={i + 2} unlocked={unlocked} onPractice={() => practice(a.id)} onTimed={() => timed(a.id)} onUnlock={goUnlock} />
        ))}
      </div>
    </section>
  );
}
