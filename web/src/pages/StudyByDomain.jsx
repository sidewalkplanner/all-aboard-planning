import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHead from '../components/PageHead';
import { DOMAINS } from '../data/domains';
import { BANK as EXAM1_BANK } from '../data/exam1-questions';
import { getHistory, summarizeHistory } from '../lib/history';
import { badgeFor, DOMAIN_COLOR } from '../lib/art';
import { RUST } from '../lib/theme';
import { useUnlock } from '../context/UnlockContext';

const countInBank = (name) => EXAM1_BANK.filter((q) => q.domain === name).length;

export default function StudyByDomain() {
  const navigate = useNavigate();
  const { unlocked } = useUnlock();
  const domainTotals = useMemo(() => summarizeHistory(getHistory()).domainTotals, []);

  const studyNote = unlocked
    ? 'Untimed drills pulled from the same bank. No clock, no score on the line — every answer is explained as soon as you pick it.'
    : 'Untimed drills pulled from the same bank, up to 25 questions per domain, every answer explained as you pick it. Domain drills are part of Full Access.';

  const startDrill = (name) => {
    if (!unlocked) { navigate('/pricing'); return; }
    navigate(`/exam/run?drill=${encodeURIComponent(name)}`);
  };

  return (
    <section className="wrap" style={{ paddingBottom: 80 }}>
      <PageHead
        title={<>Study by <em className="marker marker--sky">domain</em></>}
        art="page-books" artW={420} artH={310} artTilt={1.5}
        artAlt="A stack of planning books labelled Zoning, Plan Making, Ethics and GIS & Data, with a plant and a mug of coffee"
        note="one line at a time"
      >
        {studyNote}
      </PageHead>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,290px),1fr))', gap: 26 }}>
        {DOMAINS.map((d, i) => {
          const t = domainTotals[d.short];
          const pct = t && t.n ? Math.round((t.got / t.n) * 100) : null;
          return (
            <button
              key={d.name}
              className="card card--lift domain-card"
              style={{ '--r': `${[-0.6, 0.5, -0.3, 0.7, -0.5, 0.3][i % 6]}deg`, textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 12, padding: '0 22px 22px', color: 'var(--ink)', font: 'inherit' }}
              onClick={() => startDrill(d.name)}
            >
              <span className="domain-card__tab" style={{ background: DOMAIN_COLOR[d.name] }}>{d.pct}% of exam</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 14 }}>
                <img src={badgeFor(d.name)} alt="" aria-hidden="true" width="72" height="72" loading="lazy" style={{ flex: 'none' }} />
                <div className="h-card" style={{ fontSize: 21, lineHeight: 1.2 }}>{d.name}</div>
              </div>
              <div style={{ fontSize: 15, color: 'var(--ink-soft)', lineHeight: 1.55 }}>{d.blurb}</div>
              <div style={{ marginTop: 'auto', width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13.5, fontWeight: 600, color: 'var(--ink-soft)', marginBottom: 7 }}>
                  <span>{countInBank(d.name)} questions</span><span>{pct === null ? 'No attempts yet' : pct + '% correct'}</span>
                </div>
                <div className="meter meter--thin">
                  <span style={{ width: `${pct || 0}%`, background: pct !== null && pct < 65 ? RUST : DOMAIN_COLOR[d.name], borderRightWidth: pct ? 2 : 0 }} />
                </div>
                <div className="hand" style={{ fontSize: 23, marginTop: 14, color: unlocked ? 'var(--civic-ink)' : 'var(--ink-faint)' }}>
                  {unlocked ? 'Start drill →' : 'Unlock to drill →'}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
