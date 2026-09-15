import Hoverable from '../../components/Hoverable';
import { DIAG_TITLE } from '../../data/diagDomains';
import { themeTokens } from '../../lib/theme';

export default function IntroView(s) {
  const T = themeTokens(s.dark);
  const statCard = { background: T.surf, padding: '18px 20px' };
  const statNum = { fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em' };
  const statLabel = { fontSize: 13.5, color: T.mute, marginTop: 2 };

  const savedNote = s.dSaved
    ? `You have an attempt in progress — ${Object.keys(s.dSaved.ans || {}).length} of ${s.dTotal} answered. It is held for 7 days.`
    : '';

  return (
    <div style={{ background: T.bg, color: T.ink, minHeight: '100vh' }}>
      <section style={{ maxWidth: 820, margin: '0 auto', padding: '64px 24px 40px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 13px', borderRadius: 99, background: '#FCE6DF', color: '#A32E20', fontSize: 12.5, fontWeight: 700 }}>Free &middot; Form DIAG-1.0</div>
        <h1 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 'clamp(36px,4.6vw,54px)', lineHeight: 1.03, letterSpacing: '-0.035em', fontWeight: 700, margin: '20px 0 0', textWrap: 'pretty' }}>{DIAG_TITLE}</h1>
        <p style={{ fontSize: 18, lineHeight: 1.6, color: T.mute, margin: '18px 0 0', maxWidth: '60ch' }}>
          A 100-item placement test across the nine AICP content domains. There is no clock and no feedback during the test &mdash; both would change how you answer and blur the result. When you submit you get a per-domain report and a ranked study plan.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(170px,1fr))', gap: 1, background: T.line, border: `1px solid ${T.line}`, borderRadius: 14, overflow: 'hidden', margin: '34px 0 0' }}>
          <div style={statCard}><div style={statNum}>{s.dTotal}</div><div style={statLabel}>items, interleaved by domain</div></div>
          <div style={statCard}><div style={statNum}>~2 hrs</div><div style={statLabel}>typical sitting, untimed</div></div>
          <div style={statCard}><div style={statNum}>9</div><div style={statLabel}>domain subscores</div></div>
          <div style={statCard}><div style={statNum}>1</div><div style={statLabel}>scored attempt, replay after</div></div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 26, margin: '40px 0 0' }}>
          <div>
            <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 19, fontWeight: 700, margin: '0 0 8px' }}>Before you start</h3>
            <p style={{ fontSize: 15, lineHeight: 1.65, color: T.mute, margin: 0 }}>Sit down with a basic calculator and about two hours. You can move forward and back freely, flag anything, and leave items blank &mdash; blanks are scored as incorrect but reported separately, because a run of skips is itself a finding.</p>
          </div>
          <div>
            <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 19, fontWeight: 700, margin: '0 0 8px' }}>Tag your confidence</h3>
            <p style={{ fontSize: 15, lineHeight: 1.65, color: T.mute, margin: 0 }}>Each item has a Confident / Unsure toggle. It is optional, but it is what lets the report separate a lucky guess from real command &mdash; and flag what you are confidently wrong about.</p>
          </div>
          <div>
            <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 19, fontWeight: 700, margin: '0 0 8px' }}>It is not a pass predictor</h3>
            <p style={{ fontSize: 15, lineHeight: 1.65, color: T.mute, margin: 0 }}>APA does not publish a passing percentage and the real exam is scaled. The bands here are study triage. Nothing in your report tells you whether you would pass.</p>
          </div>
        </div>

        {s.dSaved && (
          <div style={{ margin: '38px 0 0', border: '1px solid #D79A2B', background: T.warnBg, borderRadius: 14, padding: '20px 22px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: T.warnFg }}>Attempt in progress</div>
            <p style={{ fontSize: 15.5, lineHeight: 1.6, color: T.warnFg, margin: '8px 0 16px' }}>{savedNote}</p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Hoverable
                style={{ background: T.warnFg, color: '#FFFBF2', border: 'none', padding: '13px 24px', borderRadius: 10, fontSize: 15.5, fontWeight: 700 }}
                hoverStyle={{ background: '#6E4F19' }}
                onClick={s.resumeDiag}
              >
                Resume where I left off
              </Hoverable>
              <Hoverable
                style={{ background: 'none', border: '1px solid #C9A65E', color: T.warnFg, padding: '13px 20px', borderRadius: 10, fontSize: 15.5, fontWeight: 600 }}
                hoverStyle={{ border: `1px solid ${T.warnFg}` }}
                onClick={s.startDiag}
              >
                Start over
              </Hoverable>
            </div>
          </div>
        )}

        <div style={{ margin: '38px 0 0', background: T.surf, border: `1px solid ${T.line}`, borderRadius: 14, padding: '20px 22px' }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 240 }}>
              <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: '-0.01em' }}>Show answers as I go</div>
              <p style={{ fontSize: 14.5, lineHeight: 1.6, color: T.mute, margin: '6px 0 0', maxWidth: '60ch' }}>
                Off by default, and off is what makes the diagnosis reliable &mdash; seeing the key changes how you answer later items. Turn it on if you would rather learn as you work than get a clean read. You can flip it at any point during the test.
              </p>
            </div>
            <Hoverable
              style={{ fontSize: 13.5, fontWeight: 600, padding: '9px 16px', borderRadius: 9, fontFamily: 'inherit', border: `1px solid ${s.dReveal ? '#D79A2B' : T.line}`, background: s.dReveal ? T.warnBg : T.surf, color: s.dReveal ? T.warnFg : T.mute }}
              onClick={s.toggleReveal}
              aria-pressed={s.dReveal}
            >
              {s.dReveal ? 'On — answers shown as I go' : 'Off — answers held until I submit'}
            </Hoverable>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 14, alignItems: 'center', margin: '28px 0 0', flexWrap: 'wrap' }}>
          <Hoverable
            style={{ background: '#C93B2C', color: '#FFF6F3', border: 'none', padding: '16px 30px', borderRadius: 12, fontSize: 16.5, fontWeight: 700, letterSpacing: '-0.01em' }}
            hoverStyle={{ background: '#A32E20' }}
            onClick={s.startDiag}
          >
            Begin the diagnostic
          </Hoverable>
          <span style={{ fontSize: 14, color: T.mute }}>Your place is saved as you go and held for 7 days.</span>
        </div>
      </section>
    </div>
  );
}
