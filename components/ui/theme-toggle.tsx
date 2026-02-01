"use client";

import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={cn(
        "p-2 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors",
        className
      )}
      aria-label="Toggle Theme"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 cursor-pointer" />
      <Moon className="absolute h-4 w-4 top-2 left-2 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 cursor-pointer" />
      <span className="sr-only cursor-pointer">Toggle theme</span>
    </button>
  );
}