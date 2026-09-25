import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { DOMAINS, ASSESSMENTS } from '../data/domains';
import { getHistory, summarizeHistory } from '../lib/history';
import { badgeFor, DOMAIN_COLOR } from '../lib/art';
import { RUST } from '../lib/theme';
import { fmtHoursMinutesFromSeconds, fmtShortDate } from '../lib/format';
import Art from '../components/Art';

const STAT_COLORS = ['var(--butter)', 'var(--sky)', 'var(--blush)', 'var(--mint)'];

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

  const stats = [
    [summary.avgScore === null ? '—' : summary.avgScore + '%', 'Average score'],
    [`${summary.examIds.size} / ${examsTotal}`, 'Exams completed'],
    [summary.questionsAttempted, 'Questions attempted'],
    [summary.timeSeconds ? fmtHoursMinutesFromSeconds(summary.timeSeconds) : '—', 'Time studying']
  ];

  return (
    <section className="wrap" style={{ paddingBottom: 80 }}>
      <div style={{ padding: '56px 0 10px' }}>
        <h1 className="display" style={{ fontSize: 'clamp(40px,5.4vw,64px)' }}>Your <em className="marker marker--blush">journey</em> so far</h1>
        <p className="lede" style={{ marginTop: 14 }}>{subtitle}</p>
      </div>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <Art name="page-route" w={960} h={270} eager alt="A winding red route from 'start' through quiz A, the diagnostic and exam 1 to a flag marked 'exam day!'" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,210px),1fr))', gap: 22, marginTop: 20 }}>
        {stats.map(([n, label], i) => (
          <div key={label} className="card" style={{ padding: '20px 22px', display: 'flex', alignItems: 'center', gap: 16, '--r': `${[-0.8, 0.6, -0.4, 0.8][i]}deg` }}>
            <span aria-hidden="true" style={{ width: 14, height: 46, borderRadius: 8, background: STAT_COLORS[i], border: '2px solid var(--ink)', flex: 'none' }} />
            <div>
              <div className="display" style={{ fontSize: 34 }}>{n}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink-soft)', marginTop: 4 }}>{label}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,320px),1fr))', gap: 28, marginTop: 30, alignItems: 'start' }}>
        <div className="card" style={{ padding: 28 }}>
          <span className="tape" aria-hidden="true" />
          <h2 className="h-card" style={{ fontSize: 24, margin: '0 0 20px' }}>Accuracy by domain</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {domainRows.map((d) => (
              <div key={d.name} style={{ display: 'grid', gridTemplateColumns: '36px 1fr', gap: 12, alignItems: 'center' }}>
                <img src={badgeFor(d.name)} alt="" aria-hidden="true" width="36" height="36" loading="lazy" />
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, fontSize: 14, marginBottom: 6 }}>
                    <span style={{ fontWeight: 700 }}>{d.short}</span>
                    <span style={{ color: 'var(--ink-soft)', fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{d.pct === null ? 'No data yet' : d.pct + '%'}</span>
                  </div>
                  <div className="meter meter--thin">
                    <span style={{ width: `${d.pct || 0}%`, background: d.pct !== null && d.pct < 65 ? RUST : DOMAIN_COLOR[d.name], borderRightWidth: d.pct ? 2 : 0 }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="card" style={{ padding: 28, '--r': '0.5deg' }}>
          <span className="pin" aria-hidden="true" />
          <h2 className="h-card" style={{ fontSize: 24, margin: '0 0 8px' }}>Recent stops</h2>
          {summary.recent.length === 0 && (
            <div style={{ textAlign: 'center', padding: '8px 0 6px' }}>
              <div style={{ maxWidth: 170, margin: '0 auto 10px' }}><Art name="spot-compass" w={300} h={300} /></div>
              <p className="hand" style={{ fontSize: 26, color: 'var(--ink-faint)', margin: 0 }}>No stops yet. The platform is right this way!</p>
            </div>
          )}
          {summary.recent.slice(0, 6).map((a) => (
            <div key={a.id} style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'center', padding: '14px 0', borderBottom: '2px dashed var(--line)' }}>
              <div>
                <div style={{ fontSize: 15.5, fontWeight: 700 }}>{a.title}</div>
                <div style={{ fontSize: 13.5, color: 'var(--ink-soft)', marginTop: 2 }}>
                  {a.kind === 'diagnostic' ? `${a.answeredCount} items` : a.mode === 'timed' ? 'Timed' : 'Practice'} &middot; {fmtShortDate(a.completedAt)}
                </div>
              </div>
              <span className="stamp" style={{ color: a.pct >= 70 ? 'var(--leaf-deep)' : 'var(--civic-ink)', fontSize: 16 }}>{a.pct}%</span>
            </div>
          ))}
          <button className="btn btn--tomato btn--block" style={{ marginTop: 22 }} onClick={() => navigate('/study')}>
            Drill your weakest domain
          </button>
        </div>
      </div>
    </section>
  );
}
