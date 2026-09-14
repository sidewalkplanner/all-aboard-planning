// Renders plain question/explanation text, turning *emphasis* markdown
// (used for publication titles like *Garden Cities of To-Morrow*) into
// <em>. Source content is our own authored question bank, not user input.
export default function RichText({ as: As = 'span', text, style, className }) {
  if (!text) return null;
  const parts = String(text).split(/(\*[^*]+\*)/g);
  return (
    <As style={style} className={className}>
      {parts.map((part, i) => {
        if (part.startsWith('*') && part.endsWith('*') && part.length > 1) {
          return <em key={i}>{part.slice(1, -1)}</em>;
        }
        return <span key={i}>{part}</span>;
      })}
    </As>
  );
}
