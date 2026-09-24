import { Link } from 'react-router-dom';

// items: [{ label, to? }] — the last item is the current page.
export default function Breadcrumb({ items }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="breadcrumb">
        {items.map((it, i) => (
          <li key={it.label}>
            {it.to && i < items.length - 1
              ? <Link to={it.to}>{it.label}</Link>
              : <span aria-current="page">{it.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
