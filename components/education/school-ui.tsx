import type { ReactNode } from "react";
import { useTranslations } from "next-intl";

import css from "./school.module.css";

/*
 * Widgets for the Education product previews. They only use colours from
 * app/globals.css. ALL DATA SHOWN WITH THEM IS DUMMY.
 */

export const SAMPLE_SCHOOL = "Shapla Model School";

export type Tone = "blue" | "green" | "navy" | "brown" | "red" | "muted";

const pillTone: Record<Tone, string> = {
  blue: "bg-primary/10 text-primary",
  green: "bg-[var(--teal)]/12 text-[var(--teal)]",
  navy: "bg-[var(--secondary)]/10 text-[var(--secondary)] dark:bg-[var(--chart-3)]/15 dark:text-[var(--chart-3)]",
  brown: "bg-[var(--chart-4)]/12 text-[var(--chart-4)]",
  red: "bg-destructive/10 text-destructive",
  muted: "bg-muted text-muted-foreground",
};

export const fillTone: Record<Tone, string> = {
  blue: "bg-primary",
  green: "bg-[var(--teal)]",
  navy: "bg-[var(--secondary)] dark:bg-[var(--chart-3)]",
  brown: "bg-[var(--chart-4)]",
  red: "bg-destructive",
  muted: "bg-muted-foreground/40",
};

const textTone: Record<Tone, string> = {
  blue: "text-primary",
  green: "text-[var(--teal)]",
  navy: "text-[var(--secondary)] dark:text-[var(--chart-3)]",
  brown: "text-[var(--chart-4)]",
  red: "text-destructive",
  muted: "text-foreground",
};

/** Taka with lakh/crore grouping. */
export const taka = (n: number) => `BDT ${Math.round(n).toLocaleString("en-IN")}`;
export const num = (n: number) => Math.round(n).toLocaleString("en-IN");

export function Pill({ tone = "muted", children }: { tone?: Tone; children: ReactNode }) {
  return (
    <span className={`inline-block whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-medium ${pillTone[tone]}`}>
      {children}
    </span>
  );
}

/** A small button, drawn like the real one. Never interactive here. */
export function Btn({ children, solid = false, icon }: { children: ReactNode; solid?: boolean; icon?: ReactNode }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border px-2.5 py-1.5 text-[11px] font-medium ${
        solid ? "border-primary bg-primary text-white" : "border-border bg-card text-primary"
      }`}
    >
      {icon}
      {children}
    </span>
  );
}

/** Sub-tabs of an app screen. The first one is the one shown. */
export function Tabs({ items, active = 0 }: { items: string[]; active?: number }) {
  return (
    <div className="flex flex-wrap gap-1.5" aria-hidden="true">
      {items.map((label, i) => (
        <span
          key={label}
          className={`rounded-lg border px-2.5 py-1 text-[11px] font-medium ${
            i === active ? "border-primary bg-primary text-white" : "border-border bg-card text-primary"
          }`}
        >
          {label}
        </span>
      ))}
    </div>
  );
}

/** An index card on the board. */
export function Panel({
  title,
  right,
  children,
  className = "",
  taped = false,
}: {
  title?: string;
  right?: ReactNode;
  children: ReactNode;
  className?: string;
  taped?: boolean;
}) {
  return (
    <div className={`relative rounded-2xl border border-border bg-card p-3.5 ${className}`}>
      {taped && <span className={css.tape} aria-hidden="true" />}
      {(title || right) && (
        <div className="mb-2.5 flex items-center justify-between gap-2">
          {title && <p className="text-[12.5px] font-semibold text-foreground">{title}</p>}
          {right}
        </div>
      )}
      {children}
    </div>
  );
}

/** A number on a card, with a highlighter stroke under it. */
export function Sticker({ label, value, sub, tone = "muted" }: { label: string; value: string; sub?: string; tone?: Tone }) {
  return (
    <div className="rounded-2xl border border-border bg-card px-3.5 py-3">
      <p className={`text-[20px] font-semibold leading-tight tabular-nums ${textTone[tone]}`}>{value}</p>
      <p className="mt-0.5 text-[10.5px] text-muted-foreground">{label}</p>
      {sub && <p className="text-[9.5px] text-muted-foreground/80">{sub}</p>}
    </div>
  );
}

/** Progress drawn as a pencil line. */
export function PencilBar({ pct, tone = "green" }: { pct: number; tone?: Tone }) {
  return (
    <span className="block h-1.5 w-full rounded-full bg-muted" aria-hidden="true">
      <span
        className={`${css.pencil} block h-1.5 rounded-s-full ${fillTone[tone]}`}
        style={{ width: `${Math.min(Math.max(pct, 0), 100)}%` }}
      />
    </span>
  );
}

const avatarTone = [
  "bg-primary/15 text-primary",
  "bg-[var(--teal)]/15 text-[var(--teal)]",
  "bg-[var(--secondary)]/12 text-[var(--secondary)] dark:text-[var(--chart-3)]",
  "bg-[var(--chart-4)]/15 text-[var(--chart-4)]",
];

export function Initials({ name, size = 24, tone = 0 }: { name: string; size?: number; tone?: number }) {
  const letters = name
    .split(/[\s.]+/)
    .filter(Boolean)
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
  return (
    <span
      className={`inline-grid shrink-0 place-items-center rounded-full text-[9.5px] font-semibold ${avatarTone[tone % avatarTone.length]}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {letters}
    </span>
  );
}

export type Col = { head: string; end?: boolean; className?: string };

/** A register: ruled rows like an exercise book. */
export function Register({ cols, rows, dense = false }: { cols: Col[]; rows: ReactNode[][]; dense?: boolean }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[30rem] text-[11px]">
        <thead className="text-[9.5px] font-semibold uppercase tracking-wide text-muted-foreground">
          <tr className="border-b border-border">
            {cols.map((c, j) => (
              <th key={`${c.head}-${j}`} className={`pb-1.5 ${c.end ? "text-end" : "text-start"} ${c.className ?? ""}`}>
                {c.head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-dashed border-border last:border-b-0">
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={`${dense ? "py-1" : "py-1.5"} text-foreground ${cols[j].end ? "text-end tabular-nums" : ""} ${cols[j].className ?? ""}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Field({ label, value, select = false, required = false }: { label: string; value?: string; select?: boolean; required?: boolean }) {
  return (
    <div>
      <p className="text-[10px] text-muted-foreground">
        {label}
        {required && <span className="text-destructive"> *</span>}
      </p>
      <div className="mt-0.5 flex items-center justify-between rounded-lg border border-border bg-[var(--gray-bg)] px-2.5 py-1.5 text-[11px] text-foreground">
        <span className="truncate">{value ?? ""}</span>
        {select && <span className="text-[9px] text-muted-foreground">▾</span>}
      </div>
    </div>
  );
}

/** One line of explanation, like the tinted hint bar in the app. */
export function Hint({ children }: { children: ReactNode }) {
  return <p className="rounded-xl bg-primary/8 px-3 py-2 text-[10.5px] leading-snug text-muted-foreground">{children}</p>;
}

/** A tick box as drawn in the app, never interactive here. */
export function Box({ on = false, label, radio = false }: { on?: boolean; label: ReactNode; radio?: boolean }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] text-foreground">
      <span
        className={`grid h-3.5 w-3.5 shrink-0 place-items-center border text-[9px] leading-none text-white ${radio ? "rounded-full" : "rounded-[4px]"} ${
          on ? "border-primary bg-primary" : "border-border bg-card"
        }`}
        aria-hidden="true"
      >
        {on && (radio ? <span className="h-1 w-1 rounded-full bg-white" /> : "✓")}
      </span>
      {label}
    </span>
  );
}

/** The `ui` strings of a page, as plain text (some contain braces that are not placeholders). */
export function useUi(section: string) {
  return useTranslations(`pages.accountingShowcase.${section}`).raw("ui") as Record<string, string>;
}
