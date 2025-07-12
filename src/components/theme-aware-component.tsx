"use client";

import { useTheme } from "@/components/context/theme-context";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ThemeAwareComponentProps {
  children: ReactNode;
  className?: string;
  lightClassName?: string;
  darkClassName?: string;
}

export const ThemeAwareComponent = ({ 
  children, 
  className, 
  lightClassName, 
  darkClassName 
}: ThemeAwareComponentProps) => {
  const { theme } = useTheme();
  
  return (
    <div className={cn(
      className,
      theme === 'light' ? lightClassName : darkClassName,
      "theme-transition"
    )}>
      {children}
    </div>
  );
};
