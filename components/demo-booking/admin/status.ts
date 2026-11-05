import {
  CalendarCheck,
  CircleCheck,
  PhoneCall,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

import type { DemoRequestStatus } from "@/lib/demo-requests/validation";

export type StatusMeta = {
  label: string;
  hint: string;
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
    label: "New",
    hint: "Just received, not contacted yet",
    icon: Sparkles,
    pill: "bg-sky-500/10 text-sky-700 ring-sky-500/25 dark:text-sky-300",
    dot: "bg-sky-500",
    active: "border-sky-500 bg-sky-500/10 text-sky-700 dark:text-sky-300",
  },
  CONTACTED: {
    label: "Contacted",
    hint: "We have reached out to the client",
    icon: PhoneCall,
    pill: "bg-amber-500/10 text-amber-700 ring-amber-500/25 dark:text-amber-300",
    dot: "bg-amber-500",
    active: "border-amber-500 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  },
  SCHEDULED: {
    label: "Demo scheduled",
    hint: "A demo time is agreed with the client",
    icon: CalendarCheck,
    pill: "bg-violet-500/10 text-violet-700 ring-violet-500/25 dark:text-violet-300",
    dot: "bg-violet-500",
    active:
      "border-violet-500 bg-violet-500/10 text-violet-700 dark:text-violet-300",
  },
  CLOSED: {
    label: "Closed",
    hint: "Demo done or request finished",
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

const dateFormat = new Intl.DateTimeFormat("en", {
  dateStyle: "medium",
  timeStyle: "short",
});
export const formatDate = (value: string) => dateFormat.format(new Date(value));

export function timeAgo(value: string) {
  const seconds = Math.round((Date.now() - new Date(value).getTime()) / 1000);
  if (seconds < 60) return "Just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hr ago`;
  const days = Math.floor(seconds / 86400);
  if (days < 30) return `${days} day${days === 1 ? "" : "s"} ago`;
  return formatDate(value).split(",")[0];
}

/** Digits-only phone for wa.me links. */
export const whatsappLink = (phone: string) =>
  `https://wa.me/${phone.replace(/\D/g, "")}`;
