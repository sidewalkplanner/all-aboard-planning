import { useNavigate } from 'react-router-dom';
import PageHead from '../components/PageHead';
import { ASSESSMENTS } from '../data/domains';

const STUB_COLORS = { q1: 'var(--sky)', q2: 'var(--mint)', e1: 'var(--butter)', e2: 'var(--blush)', e3: 'var(--lavender)' };
const STUB_MARKS = { q1: 'A', q2: 'B', e1: '1', e2: '2', e3: '3' };

function Ticket({ a, i, onPractice, onTimed }) {
  const hrs = Math.floor(a.mins / 60), mns = a.mins % 60;
  const status = a.soon ? 'In development' : a.kind === 'quiz' ? 'Warm-up' : 'Full length';
  const stampColor = a.soon ? 'var(--butter-deep)' : a.kind === 'quiz' ? 'var(--leaf-deep)' : 'var(--civic-ink)';
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
          <span className="chip chip--plain" style={{ borderStyle: 'dashed' }}>{a.taken}</span>
        </div>
      </div>
      <div className="ticket__actions">
        {a.soon ? (
          <span className="chip chip--butter" style={{ fontSize: 14, padding: '10px 16px' }}>Coming soon</span>
        ) : (
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
  const quizzes = ASSESSMENTS.filter((a) => a.kind === 'quiz');
  const exams = ASSESSMENTS.filter((a) => a.kind === 'exam');

  const practice = (id) => navigate(`/exam/run?aid=${id}&mode=practice`);
  const timed = (id) => navigate(`/exam/run?aid=${id}&mode=timed`);

  return (
    <section className="wrap" style={{ paddingBottom: 80 }}>
      <PageHead
        title={<>Practice <em className="marker">exams</em></>}
        art="page-tickets" artW={520} artH={320} artTilt={-2}
        artAlt="A fan of paper train tickets for Quiz A, Exam 1 and Exam 2"
        note="pick a ticket, any ticket"
      >
        Every quiz and exam is drawn to the nine domains of the APA Exam Content Outline, in the same proportions as the real test. Warm up with a 25-question quiz, then take a full-length exam when you are ready.
      </PageHead>

      <div className="eyebrow" style={{ marginBottom: 18 }}>Warm-up quizzes</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
        {quizzes.map((a, i) => (
          <Ticket key={a.id} a={a} i={i} onPractice={() => practice(a.id)} onTimed={() => timed(a.id)} />
        ))}
      </div>

      <div className="eyebrow" style={{ margin: '48px 0 18px' }}>Full-length exams</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
        {exams.map((a, i) => (
          <Ticket key={a.id} a={a} i={i + 2} onPractice={() => practice(a.id)} onTimed={() => timed(a.id)} />
        ))}
      </div>
    </section>
  );
}
