import { useNavigate } from 'react-router-dom';
import Hoverable from '../components/Hoverable';
import { DOMAINS, ACTIVITY } from '../data/domains';
import { barStyle } from '../lib/style';
import { GREEN, RUST, TEAL_TXT } from '../lib/theme';

const statCard = { background: '#FFFFFF', border: '1px solid #E4E6F0', borderRadius: 14, padding: 22 };
const statNum = { fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 34, fontWeight: 700 };
const statLabel = { fontSize: 13.5, color: '#646A85', marginTop: 3 };

export default function Progress() {
  const navigate = useNavigate();
  return (
    <section style={{ maxWidth: 1180, margin: '0 auto', padding: '56px 24px 80px' }}>
      <h1 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 42, fontWeight: 700, letterSpacing: '-0.022em', margin: 0 }}>Your progress</h1>
      <p style={{ fontSize: 16.5, color: '#646A85', margin: '10px 0 32px' }}>Two exams down. Research and Assessment Methods is the one to work on next.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 16 }}>
        <div style={statCard}><div style={statNum}>74%</div><div style={statLabel}>Average score</div></div>
        <div style={statCard}><div style={statNum}>2 / 3</div><div style={statLabel}>Exams completed</div></div>
        <div style={statCard}><div style={statNum}>418</div><div style={statLabel}>Questions attempted</div></div>
        <div style={statCard}><div style={statNum}>6h 12m</div><div style={statLabel}>Time studying</div></div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 20, marginTop: 20 }}>
        <div style={{ background: '#FFFFFF', border: '1px solid #E4E6F0', borderRadius: 16, padding: 26 }}>
          <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 22, fontWeight: 700, margin: '0 0 20px' }}>Accuracy by domain</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
            {DOMAINS.map((d) => (
              <div key={d.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, fontSize: 14, marginBottom: 6 }}>
                  <span style={{ fontWeight: 600 }}>{d.short}</span>
                  <span style={{ color: '#646A85', fontVariantNumeric: 'tabular-nums' }}>{d.mastery}%</span>
                </div>
                <div style={{ height: 8, background: '#ECEDF6', borderRadius: 99, overflow: 'hidden' }}>
                  <div style={barStyle(d.mastery, d.mastery < 65 ? RUST : GREEN)} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: '#FFFFFF', border: '1px solid #E4E6F0', borderRadius: 16, padding: 26 }}>
          <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 22, fontWeight: 700, margin: '0 0 8px' }}>Recent activity</h2>
          {ACTIVITY.map((a) => (
            <div key={a.title + a.meta} style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'center', padding: '14px 0', borderBottom: '1px solid #EEF0F7' }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600 }}>{a.title}</div>
                <div style={{ fontSize: 13.5, color: '#636987', marginTop: 2 }}>{a.meta}</div>
              </div>
              <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 22, fontWeight: 700, color: TEAL_TXT }}>{a.score}</div>
            </div>
          ))}
          <Hoverable
            style={{ marginTop: 20, background: 'none', border: '1px solid #D2D6E6', color: '#1A1C2B', padding: '12px 18px', borderRadius: 10, fontSize: 15, fontWeight: 600, width: '100%' }}
            hoverStyle={{ border: '1px solid #1A1C2B', background: '#F6F7FB' }}
            onClick={() => navigate('/study')}
          >
            Drill your weakest domain
          </Hoverable>
        </div>
      </div>
    </section>
  );
}
