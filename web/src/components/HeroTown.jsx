import meta from '../data/artMeta.json';
import { art } from '../lib/art';

const M = meta.hero;
const pct = (v, of) => `${(v / of) * 100}%`;

// The landing hero's paper town. Layers are separate images so the tram
// can pull in, wait at the AICP stop while the crowd waves, and pull out
// again, with its wheels turning in step. Everything is positioned in the
// artwork's own coordinates (see art/scenes/hero.mjs), as percentages.
export default function HeroTown() {
  const layer = (name, extra) => (
    <img src={art(name)} alt="" aria-hidden="true" decoding="async" className={`town__layer ${extra ?? ''}`} />
  );
  const tramTop = M.RAIL_Y - M.railFromTop;

  return (
    <div className="town" role="img" aria-label="A hand-cut paper town: houses, city hall and a red streetcar pulling up to a stop marked AICP, where three planners wait with a plan roll and a clipboard.">
      <div className="town__frame" style={{ aspectRatio: `${M.W} / ${M.H}` }}>
        {layer('hero-back', 'town__back')}
        {layer('hero-town')}
        {layer('hero-poles')}
        {layer('hero-track')}
        <div className="town__lane">
          <div
            className="town__tram"
            style={{ left: 0, top: pct(tramTop, M.H), width: pct(M.tramW, M.W), aspectRatio: `${M.tramW} / ${M.tramH}` }}
          >
            <img src={art('hero-tram')} alt="" aria-hidden="true" className="town__tram-body" />
            {M.centers.map(([cx, cy], i) => (
              <img
                key={i}
                src={art('hero-wheel')}
                alt=""
                aria-hidden="true"
                className="town__wheel"
                style={{
                  left: pct(cx - M.wheelBox / 2, M.tramW), top: pct(cy - M.wheelBox / 2, M.tramH),
                  width: pct(M.wheelBox, M.tramW)
                }}
              />
            ))}
          </div>
        </div>
        {layer('hero-crowd', 'town__crowd')}
        {layer('hero-front')}
      </div>
    </div>
  );
}
