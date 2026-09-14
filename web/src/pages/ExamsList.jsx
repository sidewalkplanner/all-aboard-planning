import { useNavigate } from 'react-router-dom';
import Hoverable from '../components/Hoverable';
import { ASSESSMENTS, PRICE } from '../data/domains';
import { chipStyle } from '../lib/style';
import { useUnlock } from '../context/UnlockContext';

const cardStyle = { background: '#FFFFFF', border: '1px solid #E4E6F0', borderRadius: 16, padding: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 24, alignItems: 'center' };
const ghostBtn = { background: 'none', border: '1px solid #D2D6E6', color: '#1A1C2B', padding: '12px 18px', borderRadius: 10, fontSize: 15, fontWeight: 600 };
const ghostBtnHover = { border: '1px solid #1A1C2B', background: '#F6F7FB' };
const primaryBtn = { background: '#1D5FA8', border: 'none', color: '#F6F7FB', padding: '12px 18px', borderRadius: 10, fontSize: 15, fontWeight: 600 };
const primaryBtnHover = { background: '#164C87' };

function Row({ a, unlocked, onPractice, onTimed, onUnlock }) {
  const locked = a.tier === 'paid' && !unlocked && !a.soon;
  const hrs = Math.floor(a.mins / 60), mns = a.mins % 60;
  const status = a.soon ? 'In development' : a.tier === 'free' ? 'Free' : locked ? 'Locked' : 'Unlocked';
  const statusStyle = a.soon ? chipStyle('#FCF0DB', '#8A6420') : a.tier === 'free' ? chipStyle('#E6EEF9', '#14508C') : locked ? chipStyle('#ECEDF6', '#646A85') : chipStyle('#FCF0DB', '#8A6420');
  const taken = a.soon ? a.taken : locked ? 'Included in Full Access' : a.taken;
  const timeLabel = (hrs ? hrs + 'h ' : '') + (mns ? mns + 'm' : '');

  return (
    <div style={cardStyle}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 25, fontWeight: 700, margin: 0 }}>{a.title}</h2>
          <span style={statusStyle}>{status}</span>
        </div>
        <p style={{ fontSize: 15, color: '#646A85', margin: '8px 0 0', maxWidth: '52ch' }}>{a.blurb}</p>
        <div style={{ display: 'flex', gap: 18, marginTop: 14, fontSize: 13.5, color: '#646A85', flexWrap: 'wrap' }}>
          <span>{a.size} questions</span><span>{timeLabel}</span><span>{taken}</span>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
        {locked && (
          <Hoverable
            style={{ display: 'flex', alignItems: 'center', gap: 9, background: '#1A1C2B', border: 'none', color: '#F6F7FB', padding: '12px 20px', borderRadius: 10, fontSize: 15, fontWeight: 600 }}
            hoverStyle={{ background: '#1D5FA8' }}
            onClick={onUnlock}
          >
            <span style={{ display: 'block', width: 11, height: 9, border: '2px solid #F6F7FB', borderRadius: 2, position: 'relative', marginTop: 4 }}>
              <span style={{ position: 'absolute', left: 1, top: -7, width: 5, height: 7, border: '2px solid #F6F7FB', borderBottom: 'none', borderRadius: '4px 4px 0 0', display: 'block' }} />
            </span>
            Unlock
          </Hoverable>
        )}
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
  const navigate = useNavigate();
  const { unlocked } = useUnlock();
  const freeExams = ASSESSMENTS.filter((a) => a.tier === 'free');
  const paidExams = ASSESSMENTS.filter((a) => a.tier === 'paid');

  const practice = (id) => navigate(`/exam/run?aid=${id}&mode=practice`);
  const timed = (id) => navigate(`/exam/run?aid=${id}&mode=timed`);
  const goUnlock = () => navigate('/pricing');

  return (
    <section style={{ maxWidth: 1180, margin: '0 auto', padding: '56px 24px 80px' }}>
      <h1 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 42, fontWeight: 700, letterSpacing: '-0.022em', margin: 0 }}>Practice exams</h1>
      <p style={{ fontSize: 16.5, color: '#646A85', margin: '10px 0 34px', maxWidth: '62ch' }}>
        Every quiz and exam is drawn to the nine domains of the APA Exam Content Outline, in the same proportions as the real test. Start with the two free quizzes.
      </p>

      <div style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#636987', marginBottom: 14 }}>Free</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {freeExams.map((a) => (
          <Row key={a.id} a={a} unlocked={unlocked} onPractice={() => practice(a.id)} onTimed={() => timed(a.id)} onUnlock={goUnlock} />
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '38px 0 14px', flexWrap: 'wrap' }}>
        <div style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#636987' }}>Full Access</div>
        {!unlocked && (
          <Hoverable
            style={{ background: 'none', border: 'none', padding: 0, fontSize: 13.5, fontWeight: 600, color: '#14508C', textDecoration: 'underline', textUnderlineOffset: '3px' }}
            onClick={goUnlock}
          >
            Unlock Full Access for {PRICE}
          </Hoverable>
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {paidExams.map((a) => (
          <Row key={a.id} a={a} unlocked={unlocked} onPractice={() => practice(a.id)} onTimed={() => timed(a.id)} onUnlock={goUnlock} />
        ))}
      </div>
    </section>
  );
}
