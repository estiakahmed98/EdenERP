"use client";

import * as React from "react";

import { APP_THEMES, type AppTheme } from "@/lib/themes";

type Theme = AppTheme | "system";
type ResolvedTheme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = React.createContext<ThemeContextValue | undefined>(
  undefined,
);

export type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
  themes?: readonly string[];
  attribute?: string;
};

const STORAGE_KEY = "theme";

function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function isAppTheme(theme: string): theme is AppTheme {
  return (APP_THEMES as readonly string[]).includes(theme);
}

function applyThemeClass(theme: Theme, enableSystem: boolean) {
  if (typeof document === "undefined") return;

  const resolvedTheme =
    theme === "system" && enableSystem ? getSystemTheme() : theme;

  document.documentElement.classList.remove(
    "light",
    "dark",
    "green",
    "ocean",
    "theme-light",
    "theme-dark",
    "theme-green",
    "theme-ocean",
  );

  if (isAppTheme(resolvedTheme)) {
    document.documentElement.classList.add(resolvedTheme);
    document.documentElement.classList.add(`theme-${resolvedTheme}`);
    return;
  }

  document.documentElement.classList.add(resolvedTheme);
  document.documentElement.classList.add(`theme-${resolvedTheme}`);
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  enableSystem = true,
}: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState<Theme>(defaultTheme);
  const [resolvedTheme, setResolvedTheme] = React.useState<ResolvedTheme>(
    "light",
  );

  React.useEffect(() => {
    const storedTheme = window.localStorage.getItem(STORAGE_KEY);
    const nextTheme =
      storedTheme && (storedTheme === "system" || isAppTheme(storedTheme))
        ? (storedTheme as Theme)
        : defaultTheme;

    setThemeState(nextTheme);
    setResolvedTheme(
      nextTheme === "system" && enableSystem ? getSystemTheme() : "light",
    );
  }, [defaultTheme, enableSystem]);

  React.useEffect(() => {
    const updateResolvedTheme = () => {
      setResolvedTheme(
        theme === "system" && enableSystem ? getSystemTheme() : "light",
      );
    };

    updateResolvedTheme();
    applyThemeClass(theme, enableSystem);

    if (theme !== "system" || !enableSystem) return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", updateResolvedTheme);

    return () => {
      mediaQuery.removeEventListener("change", updateResolvedTheme);
    };
  }, [theme, enableSystem]);

  const setTheme = React.useCallback(
    (nextTheme: Theme) => {
      setThemeState(nextTheme);
      window.localStorage.setItem(STORAGE_KEY, nextTheme);
      applyThemeClass(nextTheme, enableSystem);
      setResolvedTheme(
        nextTheme === "system" && enableSystem ? getSystemTheme() : "light",
      );
    },
    [enableSystem],
  );

  const value = React.useMemo<ThemeContextValue>(
    () => ({
      theme,
      resolvedTheme,
      setTheme,
    }),
    [theme, resolvedTheme, setTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = React.useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}
