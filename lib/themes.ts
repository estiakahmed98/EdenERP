export const APP_THEMES = ["light", "dark", "green", "ocean"] as const;

export type AppTheme = (typeof APP_THEMES)[number];

export type ThemeOption = {
  theme: AppTheme;
  labelKey: "light" | "dark" | "green" | "oceanBlue";
  previewClassName: string;
};

export const THEME_OPTIONS: ThemeOption[] = [
  {
    theme: "light",
    labelKey: "light",
    previewClassName:
      "border-amber-200 bg-linear-to-br from-white to-slate-100 text-amber-500",
  },
  {
    theme: "dark",
    labelKey: "dark",
    previewClassName:
      "border-slate-700 bg-linear-to-br from-slate-950 to-slate-800 text-slate-100",
  },
  {
    theme: "green",
    labelKey: "green",
    previewClassName:
      "border-emerald-200 bg-linear-to-br from-emerald-50 to-emerald-100 text-emerald-700",
  },
  {
    theme: "ocean",
    labelKey: "oceanBlue",
    previewClassName:
      "border-cyan-200 bg-linear-to-br from-cyan-50 to-blue-100 text-cyan-700",
  },
];

export function resolveAppTheme(
  theme?: string,
  resolvedTheme?: string,
): AppTheme {
  if (theme && APP_THEMES.includes(theme as AppTheme)) {
    return theme as AppTheme;
  }

  return resolvedTheme === "dark" ? "dark" : "light";
}

export function resolveSonnerTheme(
  theme?: string,
  resolvedTheme?: string,
): "light" | "dark" {
  return resolveAppTheme(theme, resolvedTheme) === "dark" ? "dark" : "light";
}
