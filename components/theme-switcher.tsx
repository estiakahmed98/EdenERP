"use client";

import { Check, ChevronDown, Leaf, Moon, Palette, Sun, Waves } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";

import { type AppTheme, THEME_OPTIONS, resolveAppTheme } from "@/lib/themes";

type ThemeSwitcherProps = {
  variant: "desktop" | "mobile";
};

const THEME_ICONS = {
  light: Sun,
  dark: Moon,
  green: Leaf,
  ocean: Waves,
} as const;

export default function ThemeSwitcher({ variant }: ThemeSwitcherProps) {
  const t = useTranslations("common.theme");
  const panelId = useId();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { theme, resolvedTheme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: PointerEvent) {
      const target = event.target as Node | null;
      if (!target) return;
      if (containerRef.current?.contains(target)) return;

      setOpen(false);
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const activeTheme = mounted
    ? resolveAppTheme(theme, resolvedTheme)
    : ("light" as AppTheme);
  const ActiveIcon = THEME_ICONS[activeTheme];

  function selectTheme(nextTheme: AppTheme) {
    setTheme(nextTheme);
    setOpen(false);
  }

  const optionsMarkup = (
    <div
      className={
        variant === "desktop"
          ? "grid min-w-64 gap-2"
          : "grid grid-cols-2 gap-2"
      }
    >
      {THEME_OPTIONS.map((option) => {
        const Icon = THEME_ICONS[option.theme];
        const isActive = activeTheme === option.theme;

        return (
          <button
            key={option.theme}
            type="button"
            onClick={() => selectTheme(option.theme)}
            aria-pressed={isActive}
            className={`flex items-center gap-3 rounded-2xl border px-3 py-3 text-left transition-all ${
              isActive
                ? "border-primary bg-primary/10 text-foreground shadow-sm"
                : "border-border bg-card text-card-foreground hover:border-primary/40 hover:bg-accent/10"
            }`}
          >
            <span
              className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${option.previewClassName}`}
            >
              <Icon size={18} />
            </span>

            <span className="min-w-0 flex-1">
              <span className="block text-sm font-semibold">
                {t(option.labelKey)}
              </span>
              {isActive ? (
                <span className="mt-0.5 inline-flex items-center text-primary">
                  <Check size={14} />
                </span>
              ) : null}
            </span>
          </button>
        );
      })}
    </div>
  );

  if (variant === "mobile") {
    return (
      <div className="space-y-3 rounded-2xl border border-border bg-card p-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-card-foreground">
          <Palette size={16} />
          <span>{t("label")}</span>
        </div>
        {optionsMarkup}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative hidden md:block">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={t("label")}
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-sm font-semibold text-card-foreground shadow-xs transition-colors hover:bg-accent/10"
      >
        <ActiveIcon size={16} />
        <span>{t(activeTheme === "ocean" ? "oceanBlue" : activeTheme)}</span>
        <ChevronDown
          size={16}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open ? (
        <div
          id={panelId}
          role="menu"
          aria-label={t("label")}
          className="absolute right-0 top-[calc(100%+0.75rem)] z-50 rounded-2xl border border-border bg-popover p-3 shadow-2xl"
        >
          {optionsMarkup}
        </div>
      ) : null}
    </div>
  );
}
