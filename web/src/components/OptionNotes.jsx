import RichText from './RichText';
import { LETTERS } from '../data/domains';

// "Why the other answers are wrong": one note per wrong option, shown after a
// question is answered. Questions without optionNotes render nothing, so the
// notes can be added bank by bank. `showText` repeats each option's wording
// for views that don't list the options (the exam review screen).
export default function OptionNotes({ q, picked, showText = false, className, style, headingStyle }) {
  const notes = q.optionNotes;
  if (!Array.isArray(notes)) return null;
  const items = q.options
    .map((text, i) => ({ i, text, note: notes[i] }))
    .filter((x) => x.i !== q.correct && x.note);
  if (!items.length) return null;
  return (
    <div className={className} style={style}>
      <p style={{ margin: '0 0 6px', fontWeight: 700, ...headingStyle }}>Why the other answers are wrong</p>
      <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {items.map((x) => (
          <li key={x.i}>
            <strong>
              {LETTERS[x.i]}
              {x.i === picked ? ' (your answer)' : ''}
              {showText ? <>: <RichText text={x.text} /></> : ''}
            </strong>
            {showText ? <br /> : ' '}
            <RichText text={x.note} />
          </li>
        ))}
      </ul>
    </div>
  );
}
