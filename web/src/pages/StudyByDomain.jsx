import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Hoverable from '../components/Hoverable';
import { DOMAINS } from '../data/domains';
import { BANK as EXAM1_BANK } from '../data/exam1-questions';
import { getHistory, summarizeHistory } from '../lib/history';
import { barStyle, cardStyle } from '../lib/style';
import { GREEN, RUST, LIGHT } from '../lib/theme';
import { useUnlock } from '../context/UnlockContext';
import { P } from '../lib/paths';
import usePageTitle from '../hooks/usePageTitle';

const countInBank = (name) => EXAM1_BANK.filter((q) => q.domain === name).length;

export default function StudyByDomain() {
  usePageTitle('Domain drills');
  const navigate = useNavigate();
  const { unlocked } = useUnlock();
  const domainTotals = useMemo(() => summarizeHistory(getHistory()).domainTotals, []);

  const studyNote = unlocked
    ? 'Untimed drills pulled from the same bank. No clock, no score on the line — every answer is explained as soon as you pick it.'
    : 'Untimed drills pulled from the same bank, up to 25 questions per domain, every answer explained as you pick it. Domain drills are part of Full Access.';

  const startDrill = (name) => {
    if (!unlocked) { navigate(P.pricing); return; }
    navigate(P.runDrill(name));
  };

  return (
    <section style={{ maxWidth: 1180, margin: '0 auto', padding: '56px 24px 80px' }}>
      <h1 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 42, fontWeight: 700, letterSpacing: '-0.022em', margin: 0 }}>Domain drills</h1>
      <p style={{ fontSize: 16.5, color: '#646A85', margin: '10px 0 12px', maxWidth: '62ch' }}>{studyNote}</p>
      <p className="small" style={{ margin: '0 0 30px' }}>Want to learn the material before drilling it? <Link to={P.course} className="link-underline">Browse the lessons by domain</Link>.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 16 }}>
        {DOMAINS.map((d) => {
          const t = domainTotals[d.short];
          const pct = t && t.n ? Math.round((t.got / t.n) * 100) : null;
          return (
            <Hoverable
              key={d.name}
              style={{ ...cardStyle(LIGHT, { padding: 22 }), textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 14 }}
              hoverStyle={{ border: '1px solid #14508C', boxShadow: '0 12px 28px -22px rgba(26,28,43,0.45)' }}
              onClick={() => startDrill(d.name)}
            >
              <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 21, fontWeight: 700, lineHeight: 1.25, color: '#1A1C2B' }}>{d.name}</div>
              <div style={{ fontSize: 14.5, color: '#646A85', lineHeight: 1.55 }}>{d.blurb}</div>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: '#14508C' }}>{unlocked ? 'Start drill' : 'Unlock to drill'}</div>
              <div style={{ marginTop: 'auto', width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#646A85', marginBottom: 6 }}>
                  <span>{countInBank(d.name)} questions</span><span>{pct === null ? 'No attempts yet' : pct + '% correct'}</span>
                </div>
                <div style={{ height: 7, background: '#ECEDF6', borderRadius: 99, overflow: 'hidden' }}>
                  <div style={barStyle(pct || 0, pct !== null && pct < 65 ? RUST : GREEN)} />
                </div>
              </div>
            </Hoverable>
          );
        })}
      </div>
    </section>
  );
}
