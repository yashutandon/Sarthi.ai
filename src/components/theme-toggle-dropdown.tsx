"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoonIcon, SunIcon, MonitorIcon } from "lucide-react";
import { useTheme } from "@/components/context/theme-context";
import { useSystemTheme } from "@/hooks/use-system-theme";
import { cn } from "@/lib/utils";

interface ThemeToggleDropdownProps {
  className?: string;
  variant?: "default" | "outline" | "ghost" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
}

export function ThemeToggleDropdown({ 
  className, 
  variant = "ghost", 
  size = "icon" 
}: ThemeToggleDropdownProps) {
  const { theme, setTheme } = useTheme();
  const systemTheme = useSystemTheme();

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    if (newTheme === 'system') {
      setTheme(systemTheme);
      localStorage.setItem('theme-preference', 'system');
    } else {
      setTheme(newTheme);
      localStorage.setItem('theme-preference', newTheme);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant}
          size={size}
          className={cn(
            "relative overflow-hidden transition-all duration-300",
            "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            className
          )}
        >
          <SunIcon 
            className={cn(
              "h-[1.2rem] w-[1.2rem] transition-all duration-300",
              theme === "light" ? "rotate-0 scale-100" : "-rotate-90 scale-0"
            )} 
          />
          <MoonIcon 
            className={cn(
              "absolute h-[1.2rem] w-[1.2rem] transition-all duration-300",
              theme === "dark" ? "rotate-0 scale-100" : "rotate-90 scale-0"
            )} 
          />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-48 theme-transition"
      >
        <DropdownMenuItem 
          onClick={() => handleThemeChange('light')}
          className="flex items-center gap-2 cursor-pointer"
        >
          <SunIcon className="h-4 w-4" />
          <span>Light</span>
          {theme === 'light' && (
            <span className="ml-auto text-xs text-muted-foreground">Active</span>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleThemeChange('dark')}
          className="flex items-center gap-2 cursor-pointer"
        >
          <MoonIcon className="h-4 w-4" />
          <span>Dark</span>
          {theme === 'dark' && (
            <span className="ml-auto text-xs text-muted-foreground">Active</span>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleThemeChange('system')}
          className="flex items-center gap-2 cursor-pointer"
        >
          <MonitorIcon className="h-4 w-4" />
          <span>System</span>
          <span className="ml-auto text-xs text-muted-foreground">
            {systemTheme}
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}