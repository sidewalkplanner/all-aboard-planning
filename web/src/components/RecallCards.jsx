import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ALL_CARDS } from '../content/aicp/flashcards';
import { gradeCard, getStudyState } from '../lib/studyState';
import { P } from '../lib/paths';

// "Before you go": five of the lesson's key-term flashcards at the end of the
// lesson. Recall the definition, flip, and rate yourself. Ratings go into the
// same Leitner boxes as the Flashcards page, so the lesson hands its terms to
// spaced review. Cards you've missed come first, then new ones.
const ROUND = 5;
const rank = (cards, id) => {
  const c = cards[id];
  if (!c) return 1; // new
  return c.box === 0 ? 0 : 1 + c.box; // missed first, then weakest
};

function deal(slug, skip = []) {
  const cards = getStudyState().cards;
  const pool = ALL_CARDS.filter((c) => c.slug === slug && !skip.includes(c.id));
  return pool
    .map((c, i) => ({ c, k: rank(cards, c.id), i }))
    .sort((a, b) => a.k - b.k || a.i - b.i)
    .slice(0, ROUND)
    .map((x) => x.c);
}

export default function RecallCards({ slug }) {
  const all = useMemo(() => ALL_CARDS.filter((c) => c.slug === slug), [slug]);
  const [round, setRound] = useState(() => ({ cards: deal(slug), seen: [] }));
  const [pos, setPos] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [tally, setTally] = useState(0);
  const cardRef = useRef(null);
  const doneRef = useRef(null);
  const started = useRef(false);
  const card = round.cards[pos];
  const done = pos >= round.cards.length;

  useEffect(() => {
    if (!started.current) return;
    if (done) doneRef.current?.focus();
    else cardRef.current?.focus();
  }, [pos, done]);

  if (all.length === 0) return null;

  const grade = (gotIt) => {
    started.current = true;
    gradeCard(card.id, gotIt);
    if (gotIt) setTally((t) => t + 1);
    setFlipped(false);
    setPos((p) => p + 1);
  };
  const more = () => {
    started.current = true;
    const seen = [...round.seen, ...round.cards.map((c) => c.id)];
    const left = all.filter((c) => !seen.includes(c.id)).length;
    setRound({ cards: deal(slug, left ? seen : []), seen: left ? seen : [] });
    setPos(0);
    setTally(0);
    setFlipped(false);
  };
  const unseenLeft = all.length - round.seen.length - round.cards.length;

  return (
    <section className="recall" aria-labelledby="before-you-go">
      <span className="tape tape--mint tape--left" aria-hidden="true" />
      <h2 id="before-you-go" className="recall-title">Before you go</h2>
      <p className="recall-intro">
        Five key terms from this lesson. Say each definition to yourself before you flip the card, then be honest.
        Your answers feed your <Link to={P.flashcards} className="link-underline">flashcards</Link>, so the ones you miss come back first.
      </p>
      {!done ? (
        <>
          <div className="recall-dots" aria-hidden="true">
            {round.cards.map((c, i) => <span key={c.id} className={i < pos ? 'is-done' : i === pos ? 'is-now' : ''} />)}
          </div>
          <button
            ref={cardRef}
            type="button"
            className={`recall-card${flipped ? ' is-flipped' : ''}`}
            aria-label={flipped ? undefined : `Card ${pos + 1} of ${round.cards.length}: ${card.term}. Recall the definition, then press to flip.`}
            onClick={() => { started.current = true; setFlipped((f) => !f); }}
          >
            <span className="recall-term">{card.term}</span>
            {flipped
              ? <span className="recall-def" dangerouslySetInnerHTML={{ __html: card.html }} />
              : <span className="recall-hint">What does it mean? Tap to flip.</span>}
          </button>
          <div aria-live="polite">
            {flipped && (
              <div className="recall-grade">
                <span className="small">Did you know it?</span>
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => grade(false)}>Not yet</button>
                <button type="button" className="btn btn-primary btn-sm" onClick={() => grade(true)}>Got it</button>
              </div>
            )}
          </div>
        </>
      ) : (
        <div ref={doneRef} tabIndex={-1} className="recall-done">
          <p style={{ margin: 0, fontWeight: 700 }}>You knew {tally} of {round.cards.length}.</p>
          <p className="small" style={{ margin: '4px 0 12px' }}>
            {tally === round.cards.length ? 'Nicely done.' : 'The ones marked "Not yet" will come up first in your flashcards.'}
          </p>
          <div className="row-wrap">
            <button type="button" className="btn btn-secondary btn-sm" onClick={more}>{unseenLeft > 0 ? 'Five more from this lesson' : 'Go again'}</button>
            <Link className="btn btn-secondary btn-sm" to={P.flashcards}>All flashcards</Link>
          </div>
        </div>
      )}
    </section>
  );
}
