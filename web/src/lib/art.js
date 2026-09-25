// Baked collage artwork lives in public/art/ (rendered by art/render.mjs).
export const art = (name) => `${import.meta.env.BASE_URL}art/${name}.webp`;

// Each domain has a badge (public/art/badge-*.webp) and its own paper colour.
// Domains are named several ways across the site (curriculum id, display
// name, question-bank name, diagnostic name), so look them up by keyword.
const DOMAIN_ART = [
  [/research/i, 'research', '#7FB2DD'],
  [/fundamental/i, 'fundamentals', '#F4C95D'],
  [/communication/i, 'communication', '#E4574B'],
  [/plan[\s-]*(and|&)?[\s-]*policy/i, 'plan', '#3D7BC4'],
  [/implementation/i, 'implementation', '#9E87CC'],
  [/administration/i, 'admin', '#CFA877'],
  [/leadership/i, 'leadership', '#F3AFA4'],
  [/practice/i, 'practice', '#6FA86A'],
  [/ethic/i, 'ethics', '#3F7A4F'],
];

const lookup = (name) => DOMAIN_ART.find(([re]) => re.test(name || ''));

export const badgeFor = (name) => art(`badge-${lookup(name)?.[1] ?? 'fundamentals'}`);

export const domainColor = (name) => lookup(name)?.[2] ?? '#3D7BC4';

// Proxy so existing `DOMAIN_COLOR[name]` lookups keep working with any form.
export const DOMAIN_COLOR = new Proxy({}, { get: (_, name) => domainColor(String(name)) });
