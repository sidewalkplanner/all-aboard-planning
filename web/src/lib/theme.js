export const GREEN = '#1D5FA8';
export const TEAL_TXT = '#14508C';
export const RUST = '#C93B2C';

export const LIGHT = {
  bg: '#F6F7FB', surf: '#FFFFFF', line: '#E4E6F0', ink: '#1A1C2B', mute: '#3A3F57',
  accBg: '#E6EEF9', accFg: TEAL_TXT, warnBg: '#FCF0DB', warnFg: '#8A6420',
  errBg: '#FCEAE6', errFg: '#A32E20', neutralBg: '#ECEDF6'
};

export const DARK = {
  bg: '#101320', surf: '#1A1E2E', line: '#2E3346', ink: '#EDEFF7', mute: '#AEB4CB',
  accBg: '#173049', accFg: '#8FC0F0', warnBg: '#3A2E16', warnFg: '#E5C185',
  errBg: '#3A1D18', errFg: '#F0A99B', neutralBg: '#242942'
};

export const themeTokens = (dark) => (dark ? DARK : LIGHT);
