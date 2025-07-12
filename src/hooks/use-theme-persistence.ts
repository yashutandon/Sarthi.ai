import { useEffect } from 'react';
import { useTheme } from '@/components/context/theme-context';

export const useThemePersistence = () => {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'theme' && e.newValue) {
        setTheme(e.newValue as 'light' | 'dark');
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [setTheme]);

  return { theme };
};
