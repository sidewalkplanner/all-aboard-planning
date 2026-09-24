import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Hoverable from '../components/Hoverable';
import { DOMAINS, ASSESSMENTS } from '../data/domains';
import { getHistory, summarizeHistory } from '../lib/history';
import { barStyle, cardStyle } from '../lib/style';
import { GREEN, RUST, TEAL_TXT, LIGHT } from '../lib/theme';
import { fmtHoursMinutesFromSeconds, fmtShortDate } from '../lib/format';
import { P } from '../lib/paths';

const statCard = cardStyle(LIGHT, { radius: 14, padding: 22 });
const statNum = { fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 34, fontWeight: 700 };
const statLabel = { fontSize: 13.5, color: '#646A85', marginTop: 3 };

export default function Progress() {
  const navigate = useNavigate();
  const summary = useMemo(() => summarizeHistory(getHistory()), []);
  const examsTotal = useMemo(() => ASSESSMENTS.filter((a) => !a.soon).length, []);

  const domainRows = DOMAINS.map((d) => {
    const t = summary.domainTotals[d.short];
    const pct = t && t.n ? Math.round((t.got / t.n) * 100) : null;
    return { ...d, pct };
  });

  const weakest = domainRows
    .filter((d) => d.pct !== null)
    .sort((a, b) => a.pct - b.pct)[0];

  const subtitle = summary.n === 0
    ? "Nothing recorded yet — take a quiz, exam, or drill and your stats will show up here."
    : weakest
      ? `${summary.examIds.size} of ${examsTotal} exams completed. ${weakest.name} is the one to work on next.`
      : `${summary.examIds.size} of ${examsTotal} exams completed.`;

  return (
    <section style={{ maxWidth: 1180, margin: '0 auto', padding: '56px 24px 80px' }}>
      <h1 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 42, fontWeight: 700, letterSpacing: '-0.022em', margin: 0 }}>Your progress</h1>
      <p style={{ fontSize: 16.5, color: '#646A85', margin: '10px 0 32px' }}>{subtitle}</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 16 }}>
        <div style={statCard}><div style={statNum}>{summary.avgScore === null ? '—' : summary.avgScore + '%'}</div><div style={statLabel}>Average score</div></div>
        <div style={statCard}><div style={statNum}>{summary.examIds.size} / {examsTotal}</div><div style={statLabel}>Exams completed</div></div>
        <div style={statCard}><div style={statNum}>{summary.questionsAttempted}</div><div style={statLabel}>Questions attempted</div></div>
        <div style={statCard}><div style={statNum}>{summary.timeSeconds ? fmtHoursMinutesFromSeconds(summary.timeSeconds) : '—'}</div><div style={statLabel}>Time studying</div></div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 20, marginTop: 20 }}>
        <div style={cardStyle(LIGHT, { padding: 26 })}>
          <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 22, fontWeight: 700, margin: '0 0 20px' }}>Accuracy by domain</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
            {domainRows.map((d) => (
              <div key={d.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, fontSize: 14, marginBottom: 6 }}>
                  <span style={{ fontWeight: 600 }}>{d.short}</span>
                  <span style={{ color: '#646A85', fontVariantNumeric: 'tabular-nums' }}>{d.pct === null ? 'No data yet' : d.pct + '%'}</span>
                </div>
                <div style={{ height: 8, background: '#ECEDF6', borderRadius: 99, overflow: 'hidden' }}>
                  <div style={barStyle(d.pct || 0, d.pct !== null && d.pct < 65 ? RUST : GREEN)} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={cardStyle(LIGHT, { padding: 26 })}>
          <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 22, fontWeight: 700, margin: '0 0 8px' }}>Recent activity</h2>
          {summary.recent.length === 0 && (
            <p style={{ fontSize: 14.5, color: '#646A85', margin: '8px 0 4px' }}>No attempts yet.</p>
          )}
          {summary.recent.slice(0, 6).map((a) => (
            <div key={a.id} style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'center', padding: '14px 0', borderBottom: '1px solid #EEF0F7' }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600 }}>{a.title}</div>
                <div style={{ fontSize: 13.5, color: '#636987', marginTop: 2 }}>
                  {a.kind === 'diagnostic' ? `${a.answeredCount} items` : a.mode === 'timed' ? 'Timed' : 'Practice'} &middot; {fmtShortDate(a.completedAt)}
                </div>
              </div>
              <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 22, fontWeight: 700, color: TEAL_TXT }}>{a.pct}%</div>
            </div>
          ))}
          <Hoverable
            style={{ marginTop: 20, background: 'none', border: '1px solid #D2D6E6', color: '#1A1C2B', padding: '12px 18px', borderRadius: 10, fontSize: 15, fontWeight: 600, width: '100%' }}
            hoverStyle={{ border: '1px solid #1A1C2B', background: '#F6F7FB' }}
            onClick={() => navigate(P.drills)}
          >
            Drill your weakest domain
          </Hoverable>
        </div>
      </div>
    </section>
  );
}
