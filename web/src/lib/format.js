// exhibit_asset arrives as a markdown pipe table.
export const parseExhibit = (src) => {
  if (!src) return null;
  const lines = String(src).split('\n').map((l) => l.trim()).filter((l) => l.startsWith('|'));
  const cells = (l) => l.replace(/^\||\|$/g, '').split('|').map((c) => c.trim());
  const rows = lines.filter((l) => !/^\|[\s:|-]+\|?$/.test(l)).map(cells);
  if (rows.length < 2) return null;
  return {
    headers: rows[0].map((v, i) => ({ v, key: 'h' + i })),
    rows: rows.slice(1).map((r, ri) => ({ key: 'r' + ri, cells: r.map((v, ci) => ({ v, key: 'c' + ci })) }))
  };
};

export const fmtClock = (totalSeconds) => {
  const s = Math.max(0, totalSeconds);
  const h = Math.floor(s / 3600);
  const rest = s % 3600;
  const m = Math.floor(rest / 60);
  const sec = rest % 60;
  return `${h}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
};

export const fmtHoursMinutes = (mins) => {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return (h ? h + 'h ' : '') + (m ? m + 'm' : '');
};
