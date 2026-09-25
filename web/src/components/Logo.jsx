import { art } from '../lib/art';

// The collage mark: rails running off toward a paper sun, on torn civic blue.
export default function Logo({ size = 36 }) {
  return (
    <img
      src={art('logo')}
      width={size}
      height={size}
      alt=""
      aria-hidden="true"
      style={{ display: 'block', flex: 'none', transform: 'rotate(-4deg)' }}
    />
  );
}
