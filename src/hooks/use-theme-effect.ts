import { useEffect } from 'react';
import { useTheme } from '@/components/context/theme-context';

export const useThemeEffect = () => {
  const { theme } = useTheme();
  
  useEffect(() => {
    // Apply theme to document
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    
    // Set meta theme-color for mobile browsers
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (!metaThemeColor) {
      metaThemeColor = document.createElement('meta');
      metaThemeColor.setAttribute('name', 'theme-color');
      document.head.appendChild(metaThemeColor);
    }
    
    const themeColor = theme === 'dark' ? '#0a0a0a' : '#ffffff';
    metaThemeColor.setAttribute('content', themeColor);
  }, [theme]);
};
