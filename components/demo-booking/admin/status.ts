import {
  CalendarCheck,
  CircleCheck,
  PhoneCall,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

import type { DemoRequestStatus } from "@/lib/demo-requests/validation";

export type StatusMeta = {
  icon: LucideIcon;
  /** Soft pill: background + text + ring, light & dark. */
  pill: string;
  /** Solid dot / accent color. */
  dot: string;
  /** Selected state for the status picker. */
  active: string;
};

export const STATUS_META: Record<DemoRequestStatus, StatusMeta> = {
  NEW: {
    icon: Sparkles,
    pill: "bg-sky-500/10 text-sky-700 ring-sky-500/25 dark:text-sky-300",
    dot: "bg-sky-500",
    active: "border-sky-500 bg-sky-500/10 text-sky-700 dark:text-sky-300",
  },
  CONTACTED: {
    icon: PhoneCall,
    pill: "bg-amber-500/10 text-amber-700 ring-amber-500/25 dark:text-amber-300",
    dot: "bg-amber-500",
    active: "border-amber-500 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  },
  SCHEDULED: {
    icon: CalendarCheck,
    pill: "bg-violet-500/10 text-violet-700 ring-violet-500/25 dark:text-violet-300",
    dot: "bg-violet-500",
    active:
      "border-violet-500 bg-violet-500/10 text-violet-700 dark:text-violet-300",
  },
  CLOSED: {
    icon: CircleCheck,
    pill: "bg-emerald-500/10 text-emerald-700 ring-emerald-500/25 dark:text-emerald-300",
    dot: "bg-emerald-500",
    active:
      "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  },
};

export function initialsOf(name: string) {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "?") + (parts[1]?.[0] ?? "")).toUpperCase();
}

export const formatDate = (value: string, locale: string) =>
  new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));

/** `t` is the translator scoped to `admin.demo`. */
export function timeAgo(
  value: string,
  t: (key: string, values?: Record<string, number>) => string,
  locale: string,
) {
  const seconds = Math.round((Date.now() - new Date(value).getTime()) / 1000);
  if (seconds < 60) return t("time.justNow");
  if (seconds < 3600) return t("time.minutesAgo", { count: Math.floor(seconds / 60) });
  if (seconds < 86400) return t("time.hoursAgo", { count: Math.floor(seconds / 3600) });
  const days = Math.floor(seconds / 86400);
  if (days < 30) return t("time.daysAgo", { count: days });
  return new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(
    new Date(value),
  );
}

/** Digits-only phone for wa.me links. */
export const whatsappLink = (phone: string) =>
  `https://wa.me/${phone.replace(/\D/g, "")}`;
