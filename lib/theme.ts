import { useColorScheme } from 'react-native';

export const gold = '#D4AF37';
export const goldSoft = '#E8CE7A';
export const goldDeep = '#A8862B';

export interface Theme {
  dark: boolean;
  bg: string;
  bgElev: string;
  bgCard: string;
  bgCardAlt: string;
  border: string;
  borderSoft: string;
  text: string;
  textDim: string;
  textFaint: string;
  accent: string;
  accentSoft: string;
  accentBg: string;
  good: string;
  warn: string;
  bad: string;
  shadow: any;
}

export const darkTheme: Theme = {
  dark: true,
  bg: '#07070A',
  bgElev: '#0E0E13',
  bgCard: '#141419',
  bgCardAlt: '#1B1B22',
  border: '#26262F',
  borderSoft: '#1D1D25',
  text: '#F5F5F7',
  textDim: '#A9A9B4',
  textFaint: '#6B6B77',
  accent: gold,
  accentSoft: goldSoft,
  accentBg: 'rgba(212,175,55,0.12)',
  good: '#5AC8A8',
  warn: '#E0B15E',
  bad: '#E07A7A',
  shadow: {
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
};

export const lightTheme: Theme = {
  dark: false,
  bg: '#FAFAF8',
  bgElev: '#FFFFFF',
  bgCard: '#FFFFFF',
  bgCardAlt: '#F2F1EC',
  border: '#E2E0D8',
  borderSoft: '#EDEBE4',
  text: '#111114',
  textDim: '#5C5C66',
  textFaint: '#9A9AA4',
  accent: goldDeep,
  accentSoft: '#B99334',
  accentBg: 'rgba(168,134,43,0.10)',
  good: '#1F8A6D',
  warn: '#A9762A',
  bad: '#B84A4A',
  shadow: {
    shadowColor: '#3A3620',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
};

export function makeTheme(dark: boolean): Theme {
  return dark ? darkTheme : lightTheme;
}

export function useSystemTheme(): Theme {
  const scheme = useColorScheme();
  return makeTheme(scheme === 'dark');
}
