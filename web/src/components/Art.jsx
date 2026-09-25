import { art } from '../lib/art';

// A baked collage illustration. Decorative by default (empty alt), sized by
// its intrinsic aspect ratio so it never shifts layout while loading.
export default function Art({ name, w, h, alt = '', className, style, eager = false, ...rest }) {
  return (
    <img
      src={art(name)}
      width={w}
      height={h}
      alt={alt}
      aria-hidden={alt ? undefined : 'true'}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      className={className}
      style={{ display: 'block', width: '100%', height: 'auto', ...style }}
      {...rest}
    />
  );
}
