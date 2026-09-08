"use client";

import { Moon, Sun } from "lucide-react";
import useTheme from "@/lib/useTheme";

export default function ThemeToggle({ className = "" }) {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      data-cursor="VIEW"
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      aria-pressed={isLight}
      className={`relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border text-foreground transition-colors hover:bg-foreground/5 ${className}`}
    >
      <Sun
        size={16}
        aria-hidden="true"
        className="absolute transition-all duration-300 ease-out"
        style={{
          opacity: isLight ? 1 : 0,
          transform: isLight ? "rotate(0deg) scale(1)" : "rotate(-90deg) scale(0.4)",
        }}
      />
      <Moon
        size={16}
        aria-hidden="true"
        className="absolute transition-all duration-300 ease-out"
        style={{
          opacity: isLight ? 0 : 1,
          transform: isLight ? "rotate(90deg) scale(0.4)" : "rotate(0deg) scale(1)",
        }}
      />
    </button>
  );
}
