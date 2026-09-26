import { useEffect, useId, useRef, useState } from 'react';
import { PracticeFrame } from './PracticeFrame';

// Sort it: cards dealt one at a time into labeled piles. Every card shows its
// reason once placed; a missed card goes back to the bottom of the deck, so a
// round ends only when every card is in the right pile. Not graded or saved.
const shuffle = (n) => {
  const a = [...Array(n).keys()];
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
const fresh = (def) => ({ deck: shuffle(def.cards.length), placed: [], missed: [], feedback: null });

export default function SortIt({ def }) {
  const uid = useId();
  const [s, setS] = useState(() => fresh(def));
  const cardRef = useRef(null);
  const nextRef = useRef(null);
  const doneRef = useRef(null);
  const started = useRef(false);
  const total = def.cards.length;
  const current = s.deck[0];
  const done = s.deck.length === 0;
  const pileLabel = (id) => def.piles.find((p) => p.id === id).label;

  // Move focus with the reader: to "Next card" after an answer, back to the
  // card when the next one is dealt, and to the summary at the end.
  useEffect(() => {
    if (!started.current) return;
    if (done) doneRef.current?.focus();
    else if (s.feedback) nextRef.current?.focus();
    else cardRef.current?.focus();
  }, [s.feedback, done]);

  const choose = (pile) => {
    started.current = true;
    setS((st) => {
      if (st.feedback) return st;
      const right = def.cards[st.deck[0]].pile === pile;
      return { ...st, feedback: { card: st.deck[0], pile, right } };
    });
  };
  const next = () => setS((st) => {
    const { card, right } = st.feedback;
    const deck = st.deck.slice(1);
    const firstMiss = !right && !st.missed.includes(card);
    return {
      deck: right ? deck : [...deck, card],
      placed: right ? [...st.placed, card] : st.placed,
      missed: firstMiss ? [...st.missed, card] : st.missed,
      feedback: null,
    };
  });
  const again = () => { started.current = true; setS(fresh(def)); };

  const fb = s.feedback;
  const card = def.cards[current];
  const counts = Object.fromEntries(def.piles.map((p) => [p.id, s.placed.filter((i) => def.cards[i].pile === p.id).length]));

  return (
    <PracticeFrame kind="sort" label="Sort it" title={def.title} headingId={`${uid}-h`}>
      <p className="practice-intro">{def.intro}</p>
      {!done ? (
        <>
          <p className="sort-progress small">
            <span>Sorted {s.placed.length} of {total}</span>
            {s.deck.length > 1 && <span> &middot; {s.deck.length - 1} still in the deck</span>}
          </p>
          <div className="sort-table">
            <div className="sort-deck" aria-hidden="true">
              {s.deck.length > 2 && <span className="sort-deck-under sort-deck-under--2" />}
              {s.deck.length > 1 && <span className="sort-deck-under" />}
            </div>
            <p ref={cardRef} tabIndex={-1} className={`sort-card${fb ? (fb.right ? ' is-right' : ' is-wrong') : ''}`} key={`${current}-${s.placed.length}-${s.missed.length}`}>
              <span className="visually-hidden">Card: </span>{card.text}
            </p>
          </div>
          <p className="sort-ask" id={`${uid}-ask`}>Which pile does it belong in?</p>
          <div className="sort-piles" role="group" aria-labelledby={`${uid}-ask`}>
            {def.piles.map((p) => {
              const chosen = fb && fb.pile === p.id;
              const answer = fb && !fb.right && card.pile === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  className={`sort-pile${chosen ? (fb.right ? ' is-right' : ' is-wrong') : ''}${answer ? ' is-answer' : ''}`}
                  disabled={!!fb}
                  onClick={() => choose(p.id)}
                >
                  <span className="sort-pile-label">{p.label}</span>
                  <span className="sort-pile-count" aria-label={`${counts[p.id]} sorted here`}>
                    {Array.from({ length: Math.min(counts[p.id], 6) }, (_, i) => <span key={i} className="sort-chit" aria-hidden="true" />)}
                    {counts[p.id] > 0 && <span className="sort-pile-n" aria-hidden="true">{counts[p.id]}</span>}
                  </span>
                </button>
              );
            })}
          </div>
          <div aria-live="polite">
            {fb && (
              <div className={`practice-feedback ${fb.right ? 'is-right' : 'is-wrong'} fade-up`}>
                <p className="practice-feedback-head">
                  {fb.right ? `Right: ${pileLabel(card.pile)}.` : `Not quite: it belongs in ${pileLabel(card.pile)}.`}
                </p>
                <p className="practice-feedback-why">{card.why}</p>
                {!fb.right && <p className="small" style={{ margin: '6px 0 0' }}>It goes back in the deck, so you&rsquo;ll see it again.</p>}
                <button ref={nextRef} type="button" className="btn btn-primary btn-sm" onClick={next}>
                  {s.deck.length === 1 && fb.right ? 'Finish' : 'Next card'}
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        <div ref={doneRef} tabIndex={-1} className="practice-done">
          <span className="stamp practice-stamp">All sorted</span>
          <p className="practice-done-line">
            {total - s.missed.length} of {total} right on the first try.
            {s.missed.length === 0 ? ' A clean sweep.' : ' The ones you missed are worth a second look:'}
          </p>
          {s.missed.length > 0 && (
            <ul className="practice-missed">
              {s.missed.map((i) => (
                <li key={i}><strong>{pileLabel(def.cards[i].pile)}:</strong> {def.cards[i].text}</li>
              ))}
            </ul>
          )}
          <button type="button" className="btn btn-secondary btn-sm" onClick={again}>Shuffle and sort again</button>
        </div>
      )}
    </PracticeFrame>
  );
}
