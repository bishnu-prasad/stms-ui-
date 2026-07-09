import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeProviderContext = createContext<ThemeProviderState>({
  theme: "light",
  setTheme: () => null,
});

export function ThemeProvider({
  children,
  defaultTheme = "light",
  ...props
}: ThemeProviderProps) {
  // Helper to get theme storage key based on current URL path
  const getThemeStorageKey = () => {
    const path = window.location.pathname;
    if (path.startsWith("/owner")) return "stms-owner-theme";
    if (path.startsWith("/super-admin")) return "stms-superadmin-theme";
    if (path.startsWith("/engineer")) return "stms-engineer-theme";
    return "stms-customer-theme";
  };

  // Get active theme for current portal path
  const getActiveTheme = (): Theme => {
    const key = getThemeStorageKey();
    const stored = localStorage.getItem(key);
    if (stored === "dark" || stored === "light") return stored;
    return defaultTheme;
  };

  const [theme, setThemeState] = useState<Theme>(() => getActiveTheme());

  // Function to apply class to root HTML
  const applyThemeClass = (targetTheme: Theme) => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(targetTheme);
  };

  // Apply theme on state change
  useEffect(() => {
    applyThemeClass(theme);
  }, [theme]);

  // Sync theme state when pathname changes (user switches portals)
  useEffect(() => {
    const handleLocationChange = () => {
      const activeTheme = getActiveTheme();
      setThemeState(activeTheme);
    };

    // Listen for custom navigation events
    window.addEventListener("popstate", handleLocationChange);
    
    // wouter routes can navigate silently; run check to keep class updated
    const interval = setInterval(handleLocationChange, 150);

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      clearInterval(interval);
    };
  }, []);

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      const key = getThemeStorageKey();
      localStorage.setItem(key, newTheme);
      setThemeState(newTheme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
