import { useState } from 'react';

// Generic hover-style wrapper: merges `hoverStyle` on top of `style` while
// the pointer is over the element. Mirrors the design file's `style-hover`.
export default function Hoverable({ as: As = 'button', style, hoverStyle, children, ...props }) {
  const [hover, setHover] = useState(false);
  const merged = hover && hoverStyle ? { ...style, ...hoverStyle } : style;
  return (
    <As
      style={merged}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...props}
    >
      {children}
    </As>
  );
}
