import { useNavigate } from 'react-router-dom';
import Hoverable from '../components/Hoverable';
import { PRICE } from '../data/domains';
import { useUnlock } from '../context/UnlockContext';
import { cardStyle } from '../lib/style';
import { LIGHT } from '../lib/theme';

export default function Pricing() {
  const navigate = useNavigate();
  const { unlock } = useUnlock();

  return (
    <section style={{ maxWidth: 1000, margin: '0 auto', padding: '64px 24px 90px' }}>
      <h1 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 'clamp(34px,4.4vw,46px)', fontWeight: 700, letterSpacing: '-0.03em', margin: 0, maxWidth: '18ch' }}>
        Two quizzes free. The full-length exam when you are ready.
      </h1>
      <p style={{ fontSize: 17, color: '#646A85', margin: '14px 0 40px', maxWidth: '58ch' }}>
        The free quizzes use the same weighting and the same explanations as the full exam. Full Access opens the full-length 170-question exam and untimed drills in every domain.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 20, alignItems: 'start' }}>
        <div style={cardStyle(LIGHT, { radius: 18, padding: 30 })}>
          <div style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#636987' }}>Free</div>
          <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 44, fontWeight: 700, letterSpacing: '-0.03em', margin: '10px 0 4px' }}>$0</div>
          <p style={{ fontSize: 14.5, color: '#646A85', margin: '0 0 22px' }}>No account needed.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 11, fontSize: 15, color: '#3A3F57' }}>
            <div>Two 25-question warm-up quizzes</div>
            <div>Full explanation on every answer</div>
            <div>Question of the day</div>
            <div>Per-domain score breakdown</div>
          </div>
          <Hoverable
            style={{ width: '100%', marginTop: 26, background: 'none', border: '1px solid #D2D6E6', color: '#1A1C2B', padding: 13, borderRadius: 10, fontSize: 15.5, fontWeight: 600 }}
            hoverStyle={{ border: '1px solid #1A1C2B' }}
            onClick={() => navigate('/exams')}
          >
            Take a free quiz
          </Hoverable>
        </div>
        <div style={{ background: '#122744', border: '1px solid #122744', borderRadius: 18, padding: 30, color: '#FFFFFF' }}>
          <div style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#FFAD9B' }}>Full Access</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, margin: '10px 0 4px' }}>
            <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 44, fontWeight: 700, letterSpacing: '-0.03em' }}>{PRICE}</div>
            <div style={{ fontSize: 14.5, color: '#AEC4E0' }}>one time, no renewal</div>
          </div>
          <p style={{ fontSize: 14.5, color: '#AEC4E0', margin: '0 0 22px' }}>Access until your test date.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 11, fontSize: 15, color: '#E8EFF8' }}>
            <div>Everything in Free</div>
            <div>Two full-length 170-question timed exams</div>
            <div>Untimed drills in all nine domains</div>
            <div>Progress tracking across attempts</div>
            <div>Missed-question review sets</div>
          </div>
          <Hoverable
            style={{ width: '100%', marginTop: 26, background: '#FF7059', border: 'none', color: '#3B1008', padding: 14, borderRadius: 10, fontSize: 16, fontWeight: 700 }}
            hoverStyle={{ background: '#FF8570' }}
            onClick={() => { unlock(); navigate('/exams'); }}
          >
            Unlock Full Access
          </Hoverable>
          <p style={{ fontSize: 13, color: '#8FA9C8', textAlign: 'center', margin: '14px 0 0' }}>Refund within 7 days if it is not useful.</p>
        </div>
      </div>
    </section>
  );
}
