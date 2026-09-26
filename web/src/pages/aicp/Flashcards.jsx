import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import usePageTitle from '../../hooks/usePageTitle';
import { P } from '../../lib/paths';
import { DOMAINS, lessonBySlug } from '../../content/aicp/curriculum';
import { ALL_CARDS } from '../../content/aicp/flashcards';
import { useStudyState, gradeCard, resetCards, MASTERED_BOX } from '../../lib/studyState';

// Flashcards from every lesson's key terms (content/aicp/flashcards.js). Cards
// move up a box each time you get them right and drop to box 0 when you miss,
// and each session deals the weakest cards first: a simple Leitner system.
const SESSION_SIZE = 20;
const hash = (str) => [...str].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 11);

const boxOf = (cards, id) => (cards[id] ? cards[id].box : -1); // -1 = never seen

function buildQueue(pool, cards, round) {
  return pool
    .slice()
    .sort((a, b) => {
      const ba = Math.max(boxOf(cards, a.id), 0);
      const bb = Math.max(boxOf(cards, b.id), 0);
      return ba - bb || hash(a.id + round) - hash(b.id + round);
    })
    .slice(0, SESSION_SIZE);
}

export default function Flashcards() {
  usePageTitle('Flashcards');
  const study = useStudyState();
  const [domainId, setDomainId] = useState('all');
  const [termFirst, setTermFirst] = useState(true);
  const [round, setRound] = useState(0);
  const [queue, setQueue] = useState(null);
  const [pos, setPos] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [tally, setTally] = useState({ got: 0, again: 0 });
  const cardRef = useRef(null);

  const pool = useMemo(() => (domainId === 'all' ? ALL_CARDS : ALL_CARDS.filter((c) => c.domainId === domainId)), [domainId]);
  const counts = useMemo(() => {
    let fresh = 0, learning = 0, mastered = 0;
    pool.forEach((c) => {
      const b = boxOf(study.cards, c.id);
      if (b < 0) fresh++; else if (b >= MASTERED_BOX) mastered++; else learning++;
    });
    return { fresh, learning, mastered };
  }, [pool, study.cards]);

  const start = () => {
    setQueue(buildQueue(pool, study.cards, round));
    setRound((r) => r + 1);
    setPos(0);
    setFlipped(false);
    setTally({ got: 0, again: 0 });
  };
  const card = queue && queue[pos];
  const finished = queue && pos >= queue.length;

  const grade = (gotIt) => {
    if (!card) return;
    gradeCard(card.id, gotIt);
    setTally((t) => ({ got: t.got + (gotIt ? 1 : 0), again: t.again + (gotIt ? 0 : 1) }));
    setPos((p) => p + 1);
    setFlipped(false);
  };

  // Keyboard: space/enter flips, 1 = again, 2 = got it.
  useEffect(() => {
    if (!card) return undefined;
    const onKey = (e) => {
      if (e.target.closest && e.target.closest('select, input, textarea')) return;
      if (e.key === ' ' || e.key === 'Enter') {
        if (e.target.tagName === 'BUTTON' && e.target !== cardRef.current) return;
        e.preventDefault(); setFlipped((f) => !f);
      } else if (flipped && e.key === '1') grade(false);
      else if (flipped && e.key === '2') grade(true);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });
  useEffect(() => { if (card && cardRef.current) cardRef.current.focus(); }, [card]);

  const lesson = card && lessonBySlug(card.slug);
  const front = card && (termFirst
    ? <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px,4vw,34px)', fontWeight: 700, lineHeight: 1.2 }}>{card.term}</span>
    : <span className="body-text" style={{ fontSize: 18 }} dangerouslySetInnerHTML={{ __html: card.html }} />);
  const back = card && (termFirst
    ? <span className="body-text" style={{ fontSize: 18, color: 'var(--ink)' }} dangerouslySetInnerHTML={{ __html: card.html }} />
    : <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px,4vw,34px)', fontWeight: 700, lineHeight: 1.2 }}>{card.term}</span>);

  return (
    <>
      <PageHeader
        eyebrow="Key terms"
        title="Flashcards"
        art="page-cards" artW={550} artH={330} artTilt={-1}
        artAlt="A kraft index-card box with coloured tabs and two flashcards: Euclid v. Ambler and FAR"
        lead={`${ALL_CARDS.length} cards built from the key terms in every lesson. Each session deals your weakest cards first, and a card counts as mastered after you get it right ${MASTERED_BOX} times in a row.`}
      />
      <div className="container-narrow" style={{ paddingBottom: 80 }}>
        {!queue || finished ? (
          <div className="card">
            {finished && (
              <div role="status" style={{ marginBottom: 20 }}>
                <h2 className="h3">Session done</h2>
                <p className="body-text" style={{ margin: '6px 0 0' }}>You knew {tally.got} of {queue.length}. {tally.again ? 'The ones you missed will come up first next time.' : 'Clean sweep.'}</p>
              </div>
            )}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,220px),1fr))', gap: 16, alignItems: 'end' }}>
              <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 14, fontWeight: 600 }}>
                Cards from
                <select value={domainId} onChange={(e) => setDomainId(e.target.value)} style={{ padding: '11px 12px', borderRadius: 10, border: '1px solid var(--line-strong)', fontSize: 15, background: '#FFFFFF' }}>
                  <option value="all">All nine domains ({ALL_CARDS.length})</option>
                  {DOMAINS.map((d) => (
                    <option key={d.id} value={d.id}>{d.code}. {d.name} ({ALL_CARDS.filter((c) => c.domainId === d.id).length})</option>
                  ))}
                </select>
              </label>
              <label style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: 15 }}>
                <input type="checkbox" checked={!termFirst} onChange={(e) => setTermFirst(!e.target.checked)} style={{ width: 18, height: 18 }} />
                Show the definition first (name the term)
              </label>
            </div>
            <div className="row-wrap" style={{ marginTop: 18, gap: 8 }}>
              <span className="chip chip-neutral">{counts.fresh} new</span>
              <span className="chip chip-warn">{counts.learning} learning</span>
              <span className="chip chip-ok">{counts.mastered} mastered</span>
            </div>
            <div className="bar-track" style={{ marginTop: 12 }} aria-hidden="true">
              <div className="bar-fill" style={{ width: `${(counts.mastered / Math.max(1, pool.length)) * 100}%`, background: 'var(--ok-fg)' }} />
            </div>
            <div className="row-wrap" style={{ marginTop: 22 }}>
              <button type="button" className="btn btn-primary" onClick={start}>{finished ? 'Next 20 cards' : `Start a session (${Math.min(SESSION_SIZE, pool.length)} cards)`}</button>
              {counts.fresh < pool.length && (
                <button type="button" className="btn btn-secondary" onClick={() => { if (window.confirm('Reset your progress on these cards?')) resetCards(pool.map((c) => c.id)); }}>
                  Reset these cards
                </button>
              )}
            </div>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: 'var(--muted)', marginBottom: 8 }}>
              <span>Card {pos + 1} of {queue.length}</span>
              <button type="button" className="link-underline" style={{ background: 'none', border: 'none', color: 'var(--brand-strong)', padding: 0, fontSize: 14 }} onClick={() => setQueue(null)}>End session</button>
            </div>
            <div className="bar-track" aria-hidden="true"><div className="bar-fill" style={{ width: `${(pos / queue.length) * 100}%` }} /></div>
            <button
              ref={cardRef}
              type="button"
              onClick={() => setFlipped((f) => !f)}
              aria-live="polite"
              aria-label={flipped ? undefined : `${termFirst ? 'Term' : 'Definition'} shown. Press to reveal the ${termFirst ? 'definition' : 'term'}.`}
              className="card"
              style={{ display: 'flex', flexDirection: 'column', gap: 18, justifyContent: 'center', alignItems: 'center', textAlign: 'center', width: '100%', minHeight: 280, marginTop: 16, padding: '32px 24px', cursor: 'pointer', boxShadow: 'var(--shadow-card)' }}
            >
              {front}
              {flipped && <span style={{ width: 60, height: 2, background: 'var(--line)' }} aria-hidden="true" />}
              {flipped && back}
              {!flipped && <span className="small">Press to flip (space)</span>}
            </button>
            <p className="small" style={{ textAlign: 'center', margin: '10px 0 0' }}>
              From <Link to={P.lesson(lesson.slug)} className="link-underline">Lesson {lesson.number}: {lesson.title}</Link>
            </p>
            {flipped && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 18 }}>
                <button type="button" className="btn btn-secondary" onClick={() => grade(false)}>Again <span className="small">(1)</span></button>
                <button type="button" className="btn btn-primary" onClick={() => grade(true)}>Got it <span className="small" style={{ color: '#DCE7F5' }}>(2)</span></button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
