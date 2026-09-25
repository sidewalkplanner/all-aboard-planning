import { useNavigate } from 'react-router-dom';
import PageHead from '../components/PageHead';
import { PRICE } from '../data/domains';
import { useUnlock } from '../context/UnlockContext';

function Checklist({ items }) {
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
      {items.map((t) => (
        <li key={t} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: 15.5, lineHeight: 1.45 }}>
          <span className="pen-check" aria-hidden="true" />
          {t}
        </li>
      ))}
    </ul>
  );
}

export default function Pricing() {
  const navigate = useNavigate();
  const { unlock } = useUnlock();

  return (
    <section className="wrap" style={{ maxWidth: 1080, paddingBottom: 90 }}>
      <PageHead
        title={<>Two quizzes free. The full ride when you are <em className="marker">ready.</em></>}
        art="page-booth" artW={420} artH={350} artTilt={-1}
        artAlt="A little ticket booth with a striped awning and a friendly conductor at the window"
      >
        The free quizzes use the same weighting and the same explanations as the full exams. Full Access opens all three full-length 170-question exams and untimed drills in every domain.
      </PageHead>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', gap: 34, alignItems: 'start', marginTop: 10 }}>
        <div className="card" style={{ padding: 32, '--r': '-0.8deg' }}>
          <span className="tape tape--sky tape--left" aria-hidden="true" />
          <div className="hand" style={{ fontSize: 30, color: 'var(--civic-ink)' }}>Day pass</div>
          <div className="display" style={{ fontSize: 58, margin: '8px 0 4px' }}>$0</div>
          <p style={{ fontSize: 15, color: 'var(--ink-soft)', margin: '0 0 24px' }}>No account needed.</p>
          <Checklist items={['Two 25-question warm-up quizzes', 'Full explanation on every answer', 'Question of the day', 'Per-domain score breakdown', 'The 100-item diagnostic']} />
          <button className="btn btn--paper btn--block" style={{ marginTop: 30 }} onClick={() => navigate('/exams')}>Take a free quiz</button>
        </div>

        <div className="card" style={{ padding: 32, background: 'var(--butter) var(--grain-tex)', '--r': '1deg', boxShadow: '8px 10px 0 rgba(39,35,58,0.2)' }}>
          <span className="tape tape--blush tape--right" aria-hidden="true" />
          <span className="stamp" style={{ position: 'absolute', top: 26, right: 26, color: 'var(--tomato-ink)', transform: 'rotate(8deg)', background: 'rgba(255,253,248,0.5)' }}>Best for exam day</span>
          <div className="hand" style={{ fontSize: 30, color: 'var(--tomato-ink)' }}>All-access pass</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, margin: '8px 0 4px', flexWrap: 'wrap' }}>
            <div className="display" style={{ fontSize: 58 }}>{PRICE}</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: '#4A3E1C' }}>one time, no renewal</div>
          </div>
          <p style={{ fontSize: 15, color: '#4A3E1C', margin: '0 0 24px' }}>Access until your test date.</p>
          <Checklist items={['Everything in the day pass', 'Three full-length 170-question timed exams', 'Untimed drills in all nine domains', 'Progress tracking across attempts', 'Missed-question review sets']} />
          <button className="btn btn--lg btn--ink btn--block" style={{ marginTop: 30 }} onClick={() => { unlock(); navigate('/exams'); }}>Unlock Full Access</button>
          <p className="hand" style={{ fontSize: 22, textAlign: 'center', margin: '14px 0 0', color: '#4A3E1C' }}>Refund within 7 days if it is not useful.</p>
        </div>
      </div>
    </section>
  );
}
