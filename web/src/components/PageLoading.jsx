import { art } from '../lib/art';

// A tiny tram rocking in place while a lazy route loads.
export default function PageLoading() {
  return (
    <div role="status" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
      <img src={art('hero-tram')} alt="" aria-hidden="true" width="150" style={{ animation: 'tramBob 0.4s ease-in-out infinite alternate' }} />
      <div className="hand" style={{ fontSize: 26, color: 'var(--ink-soft)' }}>Pulling into the station&hellip;</div>
    </div>
  );
}
