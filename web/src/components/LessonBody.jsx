import { useNavigate } from 'react-router-dom';

const BASE = import.meta.env.BASE_URL;

// Renders build-time HTML from a lesson's Markdown (our own authored content,
// not user input). Clicks on internal links become client-side navigation so
// the app doesn't reload.
export default function LessonBody({ html }) {
  const navigate = useNavigate();
  const onClick = (e) => {
    const a = e.target.closest('a');
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const href = a.getAttribute('href') || '';
    if (href.startsWith(BASE)) {
      e.preventDefault();
      navigate('/' + href.slice(BASE.length));
    }
  };
  // eslint-disable-next-line react/no-danger
  return <div className="prose" onClick={onClick} dangerouslySetInnerHTML={{ __html: html }} />;
}
