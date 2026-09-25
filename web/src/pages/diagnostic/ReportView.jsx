import { Link } from 'react-router-dom';
import { P } from '../../lib/paths';
import { domainByBankName } from '../../content/aicp/curriculum';
import RichText from '../../components/RichText';
import Art from '../../components/Art';
import { chipStyle, cardStyle } from '../../lib/style';
import { themeTokens } from '../../lib/theme';
import { badgeFor } from '../../lib/art';

const bandChip = (band) => chipStyle(band.bg, band.fg);

export default function ReportView(s) {
  const T = themeTokens(s.dark);
  const dWeightedLabel = (Math.round(s.dWeighted * 10) / 10).toFixed(1) + '%';
  const dAvgSec = s.dAvgSec;
  const pacingNote = !s.dAnsweredCount
    ? 'No pacing data.'
    : dAvgSec > s.EXAM_PACE
      ? `The real exam allows about ${s.EXAM_PACE} seconds per item. You averaged ${dAvgSec}. Pace is worth practising in a timed full-length exam.`
      : `Comfortably inside the real exam's pace of about ${s.EXAM_PACE} seconds per item.`;
  const skippedNote = s.dSkipped > 0
    ? `${s.dSkipped} ${s.dSkipped === 1 ? 'item was' : 'items were'} left blank and scored as incorrect.`
    : 'You answered every item.';
  const lessonsFor = (bankName) => {
    const d = domainByBankName(bankName);
    return d ? P.domain(d.id) : P.course;
  };
  const h2 = { fontSize: 'clamp(28px,3.2vw,38px)', color: T.ink };
  const label = (color) => ({ fontSize: 26, color, margin: 0 });

  return (
    <div className={T.paperClass} style={{ color: T.ink, minHeight: '100vh' }}>
      {/* Blueprint band, the same in paper and blueprint mode. */}
      <section className="blueprint-bg torn-bottom">
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '48px 24px 52px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto', gap: 24, alignItems: 'center' }} className="diag-head">
          <div>
            <div className="hand" style={{ fontSize: 28, color: '#F4C95D' }}>Your diagnostic report &middot; DIAG-1.0</div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 20, margin: '14px 0 0', flexWrap: 'wrap' }}>
              <div className="display" style={{ fontSize: 'clamp(60px,9vw,104px)', lineHeight: 0.9, color: '#FFFFFF' }}>{dWeightedLabel}</div>
              <div style={{ fontSize: 15.5, lineHeight: 1.5, color: '#C2D2E8', maxWidth: '40ch', paddingBottom: 10 }}>Weighted to the real exam blueprint, so the number is comparable across domains.</div>
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: '#C2D2E8', margin: '22px 0 0', maxWidth: '66ch', borderTop: '2px dashed rgba(255,255,255,0.25)', paddingTop: 18 }}>
              This is not a pass prediction. APA does not publish a passing percentage and the exam is scaled, so no score here tells you whether you would pass. Use it to decide what to study.
            </p>
            {s.dRevealUsed && (
              <p style={{ fontSize: 14.5, lineHeight: 1.6, color: '#FFD9CF', margin: '16px 0 0', maxWidth: '66ch' }}>
                You had answers showing during part or all of this attempt. Treat the subscores as directional &mdash; seeing the key mid-test tends to lift later domains.
              </p>
            )}
          </div>
          <div style={{ width: 'clamp(110px,16vw,180px)' }} className="float-soft" aria-hidden="true">
            <Art name="spot-compass" w={300} h={300} eager />
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1000, margin: '0 auto', padding: '64px 24px 0' }}>
        <h2 className="h2" style={h2}>Domain by domain</h2>
        <p style={{ fontSize: 16, color: T.mute, margin: '10px 0 28px', maxWidth: '64ch' }}>Each card shows the fraction as well as the percentage &mdash; with 8 to 14 items per domain, the fraction is the more honest reading.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,280px),1fr))', gap: 22 }}>
          {s.dDomainStats.map((x, i) => (
            <div key={x.d.code} style={{ ...cardStyle(T, { radius: 14, padding: '20px 22px' }), display: 'flex', flexDirection: 'column', gap: 10, transform: `rotate(${[-0.4, 0.3, -0.2, 0.4][i % 4]}deg)` }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <img src={badgeFor(x.d.bankName)} alt="" aria-hidden="true" width="40" height="40" loading="lazy" style={{ flex: 'none', marginTop: -4 }} />
                <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: '-0.01em', lineHeight: 1.3, flex: 1 }}>{x.d.name}</div>
                <span style={bandChip(x.band)}>{x.band.label}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                <span className="display" style={{ fontSize: 30, color: T.ink }}>{x.correct} / {x.n}</span>
                <span style={{ fontSize: 15, fontWeight: 600, color: T.mute, fontVariantNumeric: 'tabular-nums' }}>{Math.round(x.pctv)}%</span>
              </div>
              <div className="meter meter--thin" style={{ borderColor: T.lineStrong, background: T.bg }}>
                <span style={{ width: `${Math.max(2, Math.round(x.pctv))}%`, background: x.band.bar, borderRightColor: T.lineStrong }} />
              </div>
              <div style={{ fontSize: 14.5, color: T.mute }}>{x.band.language}</div>
              <div style={{ fontSize: 13, color: T.mute }}>{Math.round(x.d.weight * 100)}% of the exam</div>
              {x.d.small && (
                <div style={{ fontSize: 12.5, color: T.warnFg, background: T.warnBg, padding: '7px 10px', borderRadius: 'var(--wobble-sm)' }}>Small sample &mdash; read this one as directional.</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {s.dPlan.length > 0 && (
        <section style={{ maxWidth: 1000, margin: '0 auto', padding: '64px 24px 0' }}>
          <h2 className="h2" style={h2}>Study in this order</h2>
          <p style={{ fontSize: 16, color: T.mute, margin: '10px 0 28px', maxWidth: '66ch' }}>Ranked by exam weight times points lost. A soft spot in a heavy domain costs you more than a bad score in a light one, so this order is not the same as sorting by percentage.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {s.dPlan.map((p) => (
              <div key={p.name} className="plan-row" style={cardStyle(T, { radius: 14, padding: '20px 22px' })}>
                <div aria-hidden="true" style={{ width: 44, height: 44, borderRadius: '50%', display: 'grid', placeItems: 'center', background: 'var(--butter)', border: `2px solid ${T.lineStrong}`, fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, color: '#27233A' }}>{p.rank}</div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: '-0.01em' }}>{p.name}</span>
                    <span style={bandChip(p.band)}>{p.band.label}</span>
                  </div>
                  <div style={{ fontSize: 14, color: T.mute, marginTop: 4 }}>{p.detail}</div>
                  {p.hasTopics && <div style={{ fontSize: 14, color: T.mute, marginTop: 8 }}>Missed items touched: {p.topics}</div>}
                  {p.sampled && <div style={{ fontSize: 13, color: T.warnFg, marginTop: 8 }}>This domain has 18 sub-areas and 12 items on the form &mdash; it is sampled, not covered.</div>}
                </div>
                <Link className="btn btn-sm btn-secondary" to={lessonsFor(p.bankName)}>Read the lessons</Link>
              </div>
            ))}
          </div>
        </section>
      )}

      {s.dMisinformed.length > 0 && (
        <section style={{ maxWidth: 1000, margin: '0 auto', padding: '64px 24px 0' }}>
          <div style={{ ...cardStyle(T, { padding: '30px 32px' }), background: T.errBg, borderColor: s.dark ? '#F5AFA4' : '#C23F35' }}>
            <p className="hand" style={label(T.errFg)}>Check these first</p>
            <h2 className="h2" style={{ fontSize: 'clamp(24px,2.8vw,32px)', margin: '8px 0 0', color: T.ink }}>{s.dMisinformed.length} answers you were confident about and got wrong</h2>
            <p style={{ fontSize: 15.5, lineHeight: 1.6, color: T.errFg, margin: '12px 0 24px', maxWidth: '62ch' }}>These are the highest-priority items in the whole report. You would make these mistakes on exam day and never think to check them.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {s.dMisinformed.map((m) => (
                <div key={m.numLabel} style={{ background: T.surf, border: `2px solid ${s.dark ? '#F5AFA4' : '#C23F35'}`, borderRadius: 'var(--wobble-sm)', padding: '18px 20px' }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 12.5, fontWeight: 700, color: T.errFg }}>{m.numLabel}</span>
                    <span style={{ fontSize: 12.5, color: T.mute }}>{m.domain} &middot; {m.topic}</span>
                  </div>
                  <div style={{ fontSize: 15, lineHeight: 1.55, color: T.errFg, marginTop: 10 }}>You chose: {m.yourText}</div>
                  <div style={{ fontSize: 15, lineHeight: 1.55, color: T.accFg, marginTop: 4 }}>Correct: {m.correctText}</div>
                  <RichText as="p" text={m.why} style={{ fontSize: 14.5, lineHeight: 1.6, color: T.mute, margin: '10px 0 0' }} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section style={{ maxWidth: 1000, margin: '0 auto', padding: '64px 24px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))', gap: 22 }}>
          <div style={{ ...cardStyle(T, { radius: 14, padding: '22px 24px' }), transform: 'rotate(-0.5deg)' }}>
            <p className="hand" style={label(T.accFg)}>Pacing</p>
            <div className="display" style={{ fontSize: 30, margin: '8px 0 6px', color: T.ink }}>{dAvgSec ? dAvgSec + 's per item' : '—'}</div>
            <p style={{ fontSize: 14.5, lineHeight: 1.6, color: T.mute, margin: 0 }}>{pacingNote}</p>
          </div>
          <div style={{ ...cardStyle(T, { radius: 14, padding: '22px 24px' }), transform: 'rotate(0.4deg)' }}>
            <p className="hand" style={label(T.accFg)}>Blanks</p>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: T.mute, margin: '10px 0 0' }}>{skippedNote}</p>
          </div>
          <div style={{ ...cardStyle(T, { radius: 14, padding: '22px 24px' }), transform: 'rotate(-0.3deg)' }}>
            <p className="hand" style={label(T.accFg)}>Next step</p>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: T.mute, margin: '10px 0 14px' }}>Read the lessons for your top two priority domains and answer their checkpoints, then take a full-length timed exam to test pace. The <Link to={P.studyPlan} className="link-underline" style={{ color: T.accFg }}>study plans</Link> put it all on a calendar.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {s.dTopTwo.map((t) => (
                <Link key={t.name} className="btn btn-sm btn-secondary" style={{ justifyContent: 'flex-start' }} to={lessonsFor(t.bankName)}>{t.name}</Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1000, margin: '0 auto', padding: '64px 24px 80px' }}>
        <h2 className="h2" style={h2}>Every item, with rationales</h2>
        <p style={{ fontSize: 16, color: T.mute, margin: '10px 0 28px', maxWidth: '66ch' }}>Missed and skipped items first. Each one gives the reasoning for the key and a line on why each of the other three options is wrong.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {s.dReview.map((r) => (
            <div key={r.idx} style={cardStyle(T, { radius: 14, padding: '22px 24px' })}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                <span style={chipStyle(r.mark === 'Skipped' ? T.neutralBg : r.mark === 'Correct' ? T.accBg : T.errBg, r.mark === 'Skipped' ? T.mute : r.mark === 'Correct' ? T.accFg : T.errFg)}>{r.mark}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: T.mute }}>{r.numLabel}</span>
                <span style={{ fontSize: 13, color: T.mute }}>{r.domain} &middot; {r.subarea}</span>
              </div>
              {r.misinformed && (
                <div style={{ fontSize: 12.5, fontWeight: 700, color: T.errFg, background: T.errBg, padding: '6px 10px', borderRadius: 'var(--wobble-sm)', marginTop: 12, display: 'inline-block' }}>Confident and wrong &mdash; check this first</div>
              )}
              {r.hasScenario && (
                <RichText as="p" text={r.scenario} style={{ fontSize: 14.5, lineHeight: 1.6, color: T.mute, margin: '14px 0 0', paddingLeft: 14, borderLeft: `3px solid ${T.optLine}` }} />
              )}
              {r.hasExhibit && (
                <div style={{ margin: '14px 0 0', overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13.5 }}>
                    <thead>
                      <tr>
                        {r.exhibit.headers.map((h) => (
                          <th key={h.key} style={{ textAlign: 'left', padding: '8px 12px', fontSize: 11.5, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: T.mute, borderBottom: `2px solid ${T.optLine}` }}>{h.v}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {r.exhibit.rows.map((row) => (
                        <tr key={row.key}>
                          {row.cells.map((c) => (
                            <td key={c.key} style={{ padding: '8px 12px', borderBottom: `1px dashed ${T.optLine}`, color: T.mute, fontVariantNumeric: 'tabular-nums' }}>{c.v}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              <RichText as="p" text={r.stem} style={{ fontSize: 17, fontWeight: 500, lineHeight: 1.5, margin: '14px 0 14px', whiteSpace: 'pre-line', textWrap: 'pretty' }} />
              {r.showYours && (
                <div style={{ fontSize: 15, lineHeight: 1.55, color: T.errFg, marginBottom: 5 }}>Your answer: {r.yourLine}</div>
              )}
              <div style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.55, color: T.accFg }}>Key: {r.correctLine}</div>
              <RichText as="p" text={r.why} style={{ fontSize: 15, lineHeight: 1.65, color: T.mute, margin: '10px 0 0' }} />
              <div style={{ marginTop: 16, paddingTop: 14, borderTop: `2px dashed ${T.optLine}`, display: 'flex', flexDirection: 'column', gap: 9 }}>
                <div className="hand" style={{ fontSize: 22, color: T.mute }}>Why the others are wrong</div>
                {r.distractors.map((o) => (
                  <div key={o.key} style={{ display: 'grid', gridTemplateColumns: '26px 1fr', gap: 11, alignItems: 'start' }}>
                    <span style={{ width: 26, height: 26, borderRadius: '50%', border: `2px solid ${T.optLine}`, background: T.neutralBg, color: T.ink, fontFamily: 'var(--font-display)', fontSize: 12.5, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{o.letter}</span>
                    <RichText as="div" text={o.note} style={{ fontSize: 14.5, lineHeight: 1.6, color: T.mute }} />
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginTop: 16, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 12.5, color: T.mute }}>{r.source}</span>
                <Link to={lessonsFor(r.bankName)} className="link-underline" style={{ fontSize: 14, color: T.accFg, marginLeft: 'auto' }}>Read this domain&rsquo;s lessons</Link>
              </div>
            </div>
          ))}
        </div>
        <div className="row-wrap" style={{ marginTop: 36 }}>
          <button type="button" className={`btn ${s.dark ? 'btn-coral' : 'btn-dark'}`} onClick={() => s.navigate(P.exams)}>Take a full-length exam</button>
          <button type="button" className="btn btn-secondary" onClick={s.startDiag}>Retake the diagnostic</button>
        </div>
      </section>
    </div>
  );
}
