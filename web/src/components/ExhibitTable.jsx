export default function ExhibitTable({ exhibit, T }) {
  if (!exhibit) return null;
  return (
    <div style={{ background: T.surf, border: `1px solid ${T.line}`, borderRadius: 12, padding: 6, margin: '20px 0 0', overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14.5 }}>
        <thead>
          <tr>
            {exhibit.headers.map((h) => (
              <th key={h.key} style={{ textAlign: 'left', padding: '11px 14px', fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: T.mute, borderBottom: `1px solid ${T.line}` }}>{h.v}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {exhibit.rows.map((r) => (
            <tr key={r.key}>
              {r.cells.map((c) => (
                <td key={c.key} style={{ padding: '11px 14px', borderBottom: `1px solid ${T.line}`, color: T.ink, fontVariantNumeric: 'tabular-nums' }}>{c.v}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
