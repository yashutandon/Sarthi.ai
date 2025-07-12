"use client";

import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "@/components/context/theme-context";
import { cn } from "@/lib/utils";

interface ThemeToggleButtonProps {
  className?: string;
  variant?: "default" | "outline" | "ghost" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
  showLabel?: boolean;
}

export function ThemeToggleButton({
  className,
  variant = "ghost",
  size = "icon",
  showLabel = false,
}: ThemeToggleButtonProps) {
  const { theme, toggleTheme } = useTheme();

  const isLight = theme === "light";

  return (
    <Button
      variant={variant}
      size={size}
      onClick={toggleTheme}
      className={cn(
        "transition-all duration-300 flex items-center gap-2",
        className
      )}
      aria-label={`Switch to ${isLight ? "dark" : "light"} mode`}
    >
      {/* If label is shown, show only one icon to avoid overlap */}
      {showLabel ? (
        <>
          {isLight ? (
            <SunIcon className="h-[1.2rem] w-[1.2rem]" />
          ) : (
            <MoonIcon className="h-[1.2rem] w-[1.2rem]" />
          )}
          <span className="capitalize text-sm">
            {isLight ? "Light" : "Dark"}
          </span>
        </>
      ) : (
        <>
          {/* Icon transition when no label shown */}
          <SunIcon
            className={cn(
              "h-[1.2rem] w-[1.2rem] transition-all duration-300",
              isLight ? "rotate-0 scale-100" : "-rotate-90 scale-0"
            )}
          />
          <MoonIcon
            className={cn(
              "absolute h-[1.2rem] w-[1.2rem] transition-all duration-300",
              !isLight ? "rotate-0 scale-100" : "rotate-90 scale-0"
            )}
          />
        </>
      )}
    </Button>
  );
}
