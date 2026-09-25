// Baked collage artwork lives in public/art/ (rendered by art/render.mjs).
export const art = (name) => `${import.meta.env.BASE_URL}art/${name}.webp`;

// Badge artwork for each content-outline domain, keyed by its full name.
export const DOMAIN_BADGE = {
  'Fundamental Planning Knowledge': 'fundamentals',
  'Plan & Policy Development': 'plan',
  'Communication & Interaction': 'communication',
  'Plan Implementation': 'implementation',
  'Areas of Practice': 'practice',
  'Research & Assessment Methods': 'research',
  'Code of Ethics & Professional Conduct': 'ethics',
  'Administration & Management': 'admin',
  'Leadership': 'leadership'
};

// Each domain gets its own paper color, used for its bar and badge.
export const DOMAIN_COLOR = {
  'Fundamental Planning Knowledge': '#F4C95D',
  'Plan & Policy Development': '#3D7BC4',
  'Communication & Interaction': '#E4574B',
  'Plan Implementation': '#9E87CC',
  'Areas of Practice': '#6FA86A',
  'Research & Assessment Methods': '#7FB2DD',
  'Code of Ethics & Professional Conduct': '#3F7A4F',
  'Administration & Management': '#CFA877',
  'Leadership': '#F3AFA4'
};

export const badgeFor = (name) => art(`badge-${DOMAIN_BADGE[name] ?? 'fundamentals'}`);
