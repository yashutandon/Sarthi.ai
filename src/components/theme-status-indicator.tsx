"use client";

import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/components/context/theme-context";
import { useSystemTheme } from "@/hooks/use-system-theme";

export function ThemeStatusIndicator() {
  const { theme } = useTheme();
  const systemTheme = useSystemTheme();
  
  const preference = localStorage.getItem('theme-preference') || 'system';
  
  return (
    <div className="flex items-center gap-2">
      <Badge variant="outline" className="theme-transition">
        Theme: {theme}
      </Badge>
      {preference === 'system' && (
        <Badge variant="secondary" className="theme-transition">
          Following system ({systemTheme})
        </Badge>
      )}
    </div>
  );
}