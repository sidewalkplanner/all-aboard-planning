// Primary accent (civic blue), secondary (tomato) and the text-safe
// variant of the accent. Names are historical: GREEN is the primary.
export const GREEN = '#2F6CB3';
export const TEAL_TXT = '#23508A';
export const RUST = '#C23F35';
export const INK = '#27233A';

// Cream drawing paper by day...
export const LIGHT = {
  bg: '#F7F0E2', surf: '#FFFDF8', line: '#E3D8C3', lineStrong: '#27233A', ink: '#27233A', mute: '#4F4A5E',
  accBg: '#DDEAF7', accFg: TEAL_TXT, warnBg: '#FBEBC4', warnFg: '#7A5510',
  errBg: '#FBE1DC', errFg: '#A5332A', neutralBg: '#EFE6D3', shadow: 'rgba(39,35,58,0.13)', optLine: 'rgba(39,35,58,0.3)',
  paperClass: 'paper-bg'
};

// ...and blueprint paper by night.
export const DARK = {
  bg: '#15294A', surf: '#1C3558', line: '#34507A', lineStrong: '#8FB0DA', ink: '#EEF3FA', mute: '#B8C8DE',
  accBg: '#23456F', accFg: '#A9CCF2', warnBg: '#4A3B19', warnFg: '#F1D08A',
  errBg: '#4A2525', errFg: '#F5AFA4', neutralBg: '#223F66', shadow: 'rgba(0,0,0,0.3)', optLine: 'rgba(170,200,240,0.32)',
  paperClass: 'blueprint-bg'
};

export const themeTokens = (dark) => (dark ? DARK : LIGHT);
