import type { Metadata } from "next";
import { BarChart3, CheckCheck, ClipboardList, LayoutGrid, ListChecks, Repeat2, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { useCommon, type ToolKey } from "../accounting/_shared";
import {
  TemplatePage,
  TemplatePreview,
  accountingPageMetadata,
  useTemplateContent,
  type Tone,
} from "../accounting/_template";

/*
 * Shared pieces for the Budget Management showcase pages.
 *
 * Design: an object-page header with a status-bar pipeline (Odoo style),
 * segmented section tabs, then numeric tiles with micro charts, bullet charts
 * with a target marker (SAP Fiori style), kanban cards and an activity feed.
 * Copy lives under pages.accountingShowcase.<section>.
 * ALL DATA ON THESE PAGES IS DUMMY.
 */

export const BUDGET_NAME = "FY2026 Operating Budget";
/** Share of the fiscal year that has gone by, drawn as the target marker. */
export const ELAPSED = 75;

const sections: { key: ToolKey; icon: LucideIcon }[] = [
  { key: "bmOverview", icon: LayoutGrid },
  { key: "bmLines", icon: ListChecks },
  { key: "bmRequisitions", icon: ClipboardList },
  { key: "bmVariance", icon: BarChart3 },
  { key: "bmApprovals", icon: CheckCheck },
  { key: "bmRbrf", icon: Repeat2 },
];

export function budgetMetadata(section: string, path: string): Promise<Metadata> {
  return accountingPageMetadata(section, path);
}

/** Lakh-unit number to a full taka figure in Bangladeshi grouping. */
export function taka(lakh: number) {
  return `BDT ${Math.round(lakh * 100000).toLocaleString("en-IN")}`;
}

/* ------------------------------------------------------------------ */
/* Widgets                                                             */
/* ------------------------------------------------------------------ */

export function Card({
  title,
  right,
  children,
  className = "",
}: {
  title?: string;
  right?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-2xl border border-border bg-card p-3.5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] ${className}`}>
      {(title || right) && (
        <div className="mb-3 flex items-center justify-between gap-2">
          {title && <p className="text-[12px] font-semibold text-foreground">{title}</p>}
          {right}
        </div>
      )}
      {children}
    </div>
  );
}

const accentBar: Record<string, string> = {
  primary: "bg-primary",
  teal: "bg-[var(--teal)]",
  amber: "bg-amber-500",
  sky: "bg-sky-500",
};
const accentText: Record<string, string> = {
  primary: "text-foreground",
  teal: "text-[var(--teal)]",
  amber: "text-amber-600 dark:text-amber-400",
  sky: "text-sky-600 dark:text-sky-400",
};

/** A numeric tile with a thin accent edge and room for a micro chart. */
export function Tile({
  label,
  value,
  sub,
  accent = "primary",
  children,
}: {
  label: string;
  value: string;
  sub?: string;
  accent?: "primary" | "teal" | "amber" | "sky";
  children?: ReactNode;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-card px-3.5 pb-3 pt-3">
      <span className={`absolute inset-x-0 top-0 h-[3px] ${accentBar[accent]}`} aria-hidden="true" />
      <p className="text-[10.5px] text-muted-foreground">{label}</p>
      <p className={`mt-1 text-[15px] font-semibold tabular-nums ${accentText[accent]}`}>{value}</p>
      {sub && <p className="mt-0.5 text-[10px] text-muted-foreground">{sub}</p>}
      {children && <div className="mt-2.5">{children}</div>}
    </div>
  );
}

/** Tiny column chart for a monthly series. */
export function Spark({ values }: { values: number[] }) {
  const max = Math.max(...values);
  return (
    <span className="flex h-8 items-end gap-[3px]" aria-hidden="true">
      {values.map((v, i) => (
        <span
          key={i}
          className={`w-full rounded-sm ${i === values.length - 1 ? "bg-primary" : "bg-primary/25"}`}
          style={{ height: `${Math.max(12, (v / max) * 100)}%` }}
        />
      ))}
    </span>
  );
}

/** Horizontal bullet chart: a filled bar and a marker for where it should be by now. */
export function Bullet({ pct, marker = ELAPSED }: { pct: number; marker?: number }) {
  const tone = pct >= 100 ? "bg-destructive" : pct >= 90 ? "bg-amber-500" : "bg-primary";
  return (
    <span className="relative block h-2 w-full rounded-full bg-muted">
      <span className={`block h-2 rounded-full ${tone}`} style={{ width: `${Math.min(pct, 100)}%` }} />
      <span className="absolute -top-[3px] h-[14px] w-[2px] rounded bg-foreground/70" style={{ left: `${marker}%` }} aria-hidden="true" />
    </span>
  );
}

export const donutColors = ["var(--primary)", "var(--teal)", "#f59e0b", "#0ea5e9", "#a1a1aa"];

/** A ring built from a conic gradient. Values are shares, in any unit. */
export function Donut({ values, centre, caption }: { values: number[]; centre: string; caption: string }) {
  const total = values.reduce((a, b) => a + b, 0);
  let acc = 0;
  const stops = values.map((v, i) => {
    const from = (acc / total) * 100;
    acc += v;
    return `${donutColors[i % donutColors.length]} ${from}% ${(acc / total) * 100}%`;
  });
  return (
    <div className="relative mx-auto h-28 w-28" aria-hidden="true">
      <div className="h-28 w-28 rounded-full" style={{ background: `conic-gradient(${stops.join(", ")})` }} />
      <div className="absolute inset-[14px] flex flex-col items-center justify-center rounded-full bg-card">
        <span className="text-[14px] font-semibold tabular-nums text-foreground">{centre}</span>
        <span className="text-[9px] text-muted-foreground">{caption}</span>
      </div>
    </div>
  );
}

const avatarTones = ["bg-primary/15 text-primary", "bg-[var(--teal)]/15 text-[var(--teal)]", "bg-amber-500/15 text-amber-700 dark:text-amber-400", "bg-sky-500/15 text-sky-700 dark:text-sky-400"];

export function Avatar({ name, size = 22, tone = 0 }: { name: string; size?: number; tone?: number }) {
  const initials = name
    .split(/[\s.]+/)
    .filter(Boolean)
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
  return (
    <span
      className={`inline-grid shrink-0 place-items-center rounded-full text-[9.5px] font-semibold ${avatarTones[tone % avatarTones.length]}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {initials}
    </span>
  );
}

export function Chip({ tone, children }: { tone: Tone; children: ReactNode }) {
  const style: Record<Tone, string> = {
    teal: "bg-[var(--teal)]/12 text-[var(--teal)]",
    red: "bg-destructive/10 text-destructive",
    amber: "bg-amber-500/12 text-amber-600 dark:text-amber-400",
    muted: "bg-muted text-muted-foreground",
    blue: "bg-sky-500/12 text-sky-600 dark:text-sky-400",
    purple: "bg-primary/10 text-primary",
  };
  return <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${style[tone]}`}>{children}</span>;
}

/* ------------------------------------------------------------------ */
/* Shell: object header, status bar, segmented tabs                    */
/* ------------------------------------------------------------------ */

function BudgetShell({ active, children }: { active: ToolKey; children: ReactNode }) {
  const { t: common, tools } = useCommon();
  const steps = [common("stDraft"), common("stSubmitted"), common("stApproved"), common("stActive")];
  const current = 1;

  return (
    <div>
      <p className="text-[10.5px] text-muted-foreground">
        {tools.bmOverview} / <span className="text-foreground">{BUDGET_NAME}</span>
      </p>

      <div className="mt-1.5 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <p className="text-[16px] font-semibold text-foreground sm:text-[18px]">
          {BUDGET_NAME} <span className="font-normal text-muted-foreground">· FY 2026 · v2</span>
        </p>
        <ol className="flex items-center overflow-hidden rounded-full border border-border bg-card text-[10.5px]" aria-hidden="true">
          {steps.map((s, i) => (
            <li
              key={s}
              className={`px-3 py-1 ${i < steps.length - 1 ? "border-e border-border" : ""} ${
                i === current ? "bg-primary font-semibold text-white" : i < current ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {s}
            </li>
          ))}
        </ol>
      </div>

      <nav className="mt-3 inline-flex max-w-full flex-wrap gap-0.5 rounded-xl bg-muted p-0.5" aria-hidden="true">
        {sections.map(({ key, icon: Icon }) => (
          <span
            key={key}
            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] ${
              key === active ? "bg-card font-semibold text-primary shadow-sm" : "text-muted-foreground"
            }`}
          >
            <Icon className="h-3 w-3 shrink-0" />
            {key === "bmOverview" ? common("tabOverview") : tools[key]}
            {key === "bmApprovals" && <span className="rounded-full bg-amber-500 px-1.5 text-[9px] font-semibold text-white">2</span>}
          </span>
        ))}
      </nav>

      <div className="mt-3.5 space-y-3">{children}</div>
    </div>
  );
}

export function BudgetPage({
  section,
  path,
  prefix,
  appName,
  features,
  tool,
  connectStructure,
  icons,
  stepTones,
  render,
}: {
  section: string;
  path: string;
  prefix: string;
  appName: string;
  features: string[];
  tool: ToolKey;
  connectStructure: { key: string; tools: ToolKey[] }[];
  icons: LucideIcon[];
  stepTones?: Tone[];
  render: (ui: Record<string, string>) => ReactNode;
}) {
  const content = useTemplateContent(section);
  const { t: common } = useCommon();

  return (
    <TemplatePage
      slug={path}
      prefix={prefix}
      appName={`Budget Management ${appName}`}
      features={features}
      content={content}
      stepTones={stepTones}
      connectStructure={connectStructure}
      localIcons={icons}
      exploreHref="/apps/Finance/budget-management"
      exploreLabel={common("exploreBudget")}
      preview={
        <TemplatePreview
          prefix={prefix}
          toolKey={tool}
          content={content}
          cols={[]}
          rows={[]}
          body={<BudgetShell active={tool}>{render(content.ui)}</BudgetShell>}
        />
      }
    />
  );
}
