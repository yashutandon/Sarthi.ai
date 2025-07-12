export type Theme = 'light' | 'dark';

export interface ThemeConfig {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  systemTheme: Theme;
  isSystemTheme: boolean;
}

export interface ThemeColors {
  background: string;
  foreground: string;
  primary: string;
  secondary: string;
  accent: string;
  muted: string;
  destructive: string;
  border: string;
  card: string;
  popover: string;
}