export const Colors = {
  dark: {
    background: '#0A0A0A',
    surface: '#141414',
    surfaceElevated: '#1E1E1E',
    surfaceHover: '#252525',
    border: '#2A2A2A',
    borderLight: '#333333',
    text: '#FFFFFF',
    textSecondary: '#A0A0A0',
    textTertiary: '#666666',
    accent: '#D4AF37',
    accentLight: '#F4D03F',
    accentDark: '#B8960C',
    success: '#00C853',
    error: '#FF5252',
    warning: '#FFB300',
    info: '#448AFF',
    gradient: ['#D4AF37', '#F4D03F'],
    cardShadow: 'rgba(0,0,0,0.5)',
  },
  light: {
    background: '#FAFAFA',
    surface: '#FFFFFF',
    surfaceElevated: '#F5F5F5',
    surfaceHover: '#EEEEEE',
    border: '#E0E0E0',
    borderLight: '#EEEEEE',
    text: '#1A1A1A',
    textSecondary: '#666666',
    textTertiary: '#999999',
    accent: '#B8960C',
    accentLight: '#D4AF37',
    accentDark: '#8B7200',
    success: '#00C853',
    error: '#FF5252',
    warning: '#FFB300',
    info: '#448AFF',
    gradient: ['#B8960C', '#D4AF37'],
    cardShadow: 'rgba(0,0,0,0.08)',
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const FontSizes = {
  xs: 11,
  sm: 13,
  md: 15,
  lg: 18,
  xl: 24,
  xxl: 32,
  xxxl: 42,
};

export type Theme = typeof Colors.dark;
