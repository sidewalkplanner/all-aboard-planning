// Domain model used by the 100-item "Where Should I Study?" diagnostic
// (DIAG-1.0). Weights sum to 1.00 and mirror the APA content outline.
export const DIAG_TITLE = 'Where Should I Study?';
export const DIAG_KEY = 'aap-diag-1.0-attempt';
export const EXAM_PACE = 74; // seconds per item on the real exam (170 items / 210 min)

export const DIAG_DOMAINS = [
  { code: 1, name: 'Research and Assessment Methods', short: 'Research', weight: 0.11, items: 11, small: false, bankName: 'Research & Assessment Methods' },
  { code: 2, name: 'Fundamental Planning Knowledge', short: 'Fundamentals', weight: 0.15, items: 14, small: false, bankName: 'Fundamental Planning Knowledge' },
  { code: 3, name: 'Communication and Interaction', short: 'Communication', weight: 0.13, items: 12, small: false, bankName: 'Communication & Interaction' },
  { code: 4, name: 'Plan and Policy Development', short: 'Plan & Policy', weight: 0.15, items: 14, small: false, bankName: 'Plan & Policy Development' },
  { code: 5, name: 'Plan Implementation', short: 'Implementation', weight: 0.12, items: 12, small: false, bankName: 'Plan Implementation' },
  { code: 6, name: 'Administration and Management', short: 'Administration', weight: 0.06, items: 8, small: true, bankName: 'Administration & Management' },
  { code: 7, name: 'Leadership', short: 'Leadership', weight: 0.06, items: 8, small: true, bankName: 'Leadership' },
  { code: 8, name: 'Areas of Practice', short: 'Areas of Practice', weight: 0.12, items: 12, small: false, bankName: 'Areas of Practice' },
  { code: 9, name: 'AICP Code of Ethics and Professional Conduct', short: 'Ethics', weight: 0.10, items: 9, small: true, bankName: 'Code of Ethics & Professional Conduct' }
];

export const DIAG_BANDS = [
  { label: 'Strong', min: 80, language: 'Maintain — light review only', fg: '#14508C', bg: '#E6EEF9', bar: '#1D5FA8' },
  { label: 'Solid', min: 65, language: 'Review — targeted refresh', fg: '#1F6B4F', bg: '#E4F2EA', bar: '#2E8B62' },
  { label: 'Developing', min: 50, language: 'Study — full pass on this domain', fg: '#8A6420', bg: '#FCF0DB', bar: '#D79A2B' },
  { label: 'Priority', min: 0, language: 'Start here', fg: '#A32E20', bg: '#FCEAE6', bar: '#C93B2C' }
];

export const bandFor = (pct) => DIAG_BANDS.find((b) => pct >= b.min) || DIAG_BANDS[DIAG_BANDS.length - 1];

