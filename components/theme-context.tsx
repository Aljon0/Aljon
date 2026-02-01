"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type ThemeContextType = {
  isDark: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // 1. CHANGE DEFAULT: Set to false so it starts in Light Mode
  const [isDark, setIsDark] = useState(false);
  
  // 2. PREVENT HYDRATION MISMATCH: We need to know if the component has mounted
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // 3. ON LOAD: Check if the user previously saved a preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      // If they have a saved preference, use it
      setIsDark(savedTheme === "dark");
    }
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const newTheme = !prev;
      // 4. ON TOGGLE: Save the new preference to LocalStorage
      localStorage.setItem("theme", newTheme ? "dark" : "light");
      return newTheme;
    });
  };

  // Prevent flash of incorrect content during hydration
  if (!mounted) {
    return <div className="min-h-screen bg-neutral-50" />; // Render a blank light background initially
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-black text-white' : 'bg-neutral-50 text-neutral-900'}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}