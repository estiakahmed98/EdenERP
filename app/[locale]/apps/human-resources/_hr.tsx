import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { useCommon, type ToolKey } from "../accounting/_shared";
import { AppShell, designFor } from "../accounting/_designs";
import {
  TemplatePage,
  TemplatePreview,
  accountingPageMetadata,
  useTemplateContent,
  type Tone,
} from "../accounting/_template";

/*
 * Shared pieces for the HR & Payroll and Employee Portal showcase pages.
 * Every widget here uses only the colours from app/globals.css (primary,
 * teal, secondary, the chart colours and destructive), so the theme classes
 * recolour the previews too. Copy lives under pages.accountingShowcase.<section>.
 * ALL DATA ON THESE PAGES IS DUMMY.
 */

export const HR_COMPANY = "Nodi Polymer Industries";

export function hrMetadata(section: string, path: string): Promise<Metadata> {
  return accountingPageMetadata(section, path);
}

/** Tool groups shown as the in-app navigation. */
export const hrGroups = {
  org: ["hrDepartments", "hrDesignations", "hrGrades", "hrEmployees", "hrServiceRecords", "hrProjects"],
  pay: ["hrComponents", "hrStructures", "hrPayrollRuns", "hrApprovals", "hrSalaryBudgets", "hrReports"],
  statutory: ["hrTax", "hrForm108", "hrPolicy", "hrWppf", "hrSettlements"],
  time: ["hrShifts", "hrHolidays", "hrLeaveTypes", "hrLeaveApps", "hrAttendance"],
  portal: ["epProfile", "epPayslips", "epLeaves", "epAttendance", "epPf"],
} satisfies Record<string, ToolKey[]>;

/* ------------------------------------------------------------------ */
/* Widgets                                                             */
/* ------------------------------------------------------------------ */

export type HrTone = "primary" | "teal" | "navy" | "brown" | "sky" | "red" | "muted";

const chipTone: Record<HrTone, string> = {
  primary: "bg-primary/10 text-primary",
  teal: "bg-[var(--teal)]/12 text-[var(--teal)]",
  navy: "bg-[var(--secondary)]/10 text-[var(--secondary)] dark:bg-[var(--chart-3)]/15 dark:text-[var(--chart-3)]",
  brown: "bg-[var(--chart-4)]/12 text-[var(--chart-4)]",
  sky: "bg-[var(--chart-5)]/12 text-[var(--chart-5)]",
  red: "bg-destructive/10 text-destructive",
  muted: "bg-muted text-muted-foreground",
};

export const barTone: Record<HrTone, string> = {
  primary: "bg-primary",
  teal: "bg-[var(--teal)]",
  navy: "bg-[var(--secondary)] dark:bg-[var(--chart-3)]",
  brown: "bg-[var(--chart-4)]",
  sky: "bg-[var(--chart-5)]",
  red: "bg-destructive",
  muted: "bg-muted-foreground/40",
};

/** Raw colours for gradients, in the same order as the tones above. */
export const hrColors = ["var(--primary)", "var(--teal)", "var(--secondary)", "var(--chart-5)", "var(--chart-4)"];

export function Chip({ tone, children }: { tone: HrTone; children: ReactNode }) {
  return <span className={`inline-block whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-medium ${chipTone[tone]}`}>{children}</span>;
}

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
    <div className={`rounded-xl border border-border bg-card p-3.5 ${className}`}>
      {(title || right) && (
        <div className="mb-2.5 flex items-center justify-between gap-2">
          {title && <p className="text-[12px] font-semibold text-foreground">{title}</p>}
          {right}
        </div>
      )}
      {children}
    </div>
  );
}

export function Stat({ label, value, sub, tone = "primary" }: { label: string; value: string; sub?: string; tone?: HrTone }) {
  return (
    <div className="rounded-xl border border-border bg-card px-3 py-2.5">
      <p className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
        <span className={`h-1.5 w-1.5 rounded-full ${barTone[tone]}`} aria-hidden="true" />
        {label}
      </p>
      <p className="mt-1 text-[15px] font-semibold tabular-nums text-foreground">{value}</p>
      {sub && <p className="text-[10px] text-muted-foreground">{sub}</p>}
    </div>
  );
}

export function Bar({ pct, tone = "primary" }: { pct: number; tone?: HrTone }) {
  return (
    <span className="block h-1.5 w-full rounded-full bg-muted" aria-hidden="true">
      <span className={`block h-1.5 rounded-full ${barTone[tone]}`} style={{ width: `${Math.min(pct, 100)}%` }} />
    </span>
  );
}

export function Ring({ values, centre, caption, size = 104 }: { values: number[]; centre: string; caption: string; size?: number }) {
  const total = values.reduce((a, b) => a + b, 0);
  let acc = 0;
  const stops = values.map((v, i) => {
    const from = (acc / total) * 100;
    acc += v;
    return `${hrColors[i % hrColors.length]} ${from}% ${(acc / total) * 100}%`;
  });
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }} aria-hidden="true">
      <div className="h-full w-full rounded-full" style={{ background: `conic-gradient(${stops.join(", ")})` }} />
      <div className="absolute inset-[13px] flex flex-col items-center justify-center rounded-full bg-card">
        <span className="text-[13px] font-semibold tabular-nums text-foreground">{centre}</span>
        <span className="text-[9px] text-muted-foreground">{caption}</span>
      </div>
    </div>
  );
}

export function Legend({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1 text-[10.5px] text-muted-foreground">
      {items.map((label, i) => (
        <li key={label} className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-sm" style={{ background: hrColors[i % hrColors.length] }} aria-hidden="true" />
          {label}
        </li>
      ))}
    </ul>
  );
}

const avatarTones = [
  "bg-primary/15 text-primary",
  "bg-[var(--teal)]/15 text-[var(--teal)]",
  "bg-[var(--secondary)]/12 text-[var(--secondary)] dark:text-[var(--chart-3)]",
  "bg-[var(--chart-4)]/15 text-[var(--chart-4)]",
];

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

export type HCol = { head: string; end?: boolean; className?: string };

export function Table({ cols, rows, dense = false }: { cols: HCol[]; rows: ReactNode[][]; dense?: boolean }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[30rem] text-[11px]">
        <thead className="text-[9.5px] font-semibold uppercase tracking-wide text-muted-foreground">
          <tr className="border-b border-border">
            {cols.map((c) => (
              <th key={c.head} className={`pb-1.5 ${c.end ? "text-end" : "text-start"} ${c.className ?? ""}`}>
                {c.head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-border/60 last:border-b-0">
              {row.map((cell, j) => (
                <td key={j} className={`${dense ? "py-1" : "py-1.5"} text-foreground ${cols[j].end ? "text-end tabular-nums" : ""} ${cols[j].className ?? ""}`}>
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

export function Field({ label, value, select = false }: { label: string; value?: string; select?: boolean }) {
  return (
    <div>
      <p className="text-[10px] text-muted-foreground">{label}</p>
      <div className="mt-0.5 flex items-center justify-between rounded-md border border-border bg-[var(--gray-bg)] px-2.5 py-1.5 text-[11px] text-foreground">
        <span className="truncate">{value ?? ""}</span>
        {select && <span className="text-[9px] text-muted-foreground">▾</span>}
      </div>
    </div>
  );
}

/** Bangladeshi digit grouping for a taka figure. */
export function bdt(n: number) {
  return `BDT ${Math.round(n).toLocaleString("en-IN")}`;
}

/* ------------------------------------------------------------------ */
/* Page wrapper                                                        */
/* ------------------------------------------------------------------ */

function HrShell({
  path,
  portal,
  nav,
  active,
  title,
  children,
}: {
  path: string;
  portal: boolean;
  nav: ToolKey[];
  active: ToolKey;
  title: string;
  children: ReactNode;
}) {
  const { t: common, tools } = useCommon();
  const design = designFor(path);
  const moduleName = common(portal ? "epModule" : "hrModule");

  if (design.shell !== 0) {
    return (
      <AppShell
        variant={design.shell}
        accent={design.accent}
        moduleName={moduleName}
        title={title}
        nav={nav.map((key) => ({ key, label: tools[key] }))}
        active={active}
      >
        {children}
      </AppShell>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          {portal && <Avatar name="Farhana Akter" size={30} tone={1} />}
          <div>
            <p className="text-[10.5px] text-muted-foreground">
              {moduleName} / <span className="text-foreground">{tools[active]}</span>
            </p>
            <p className="text-[16px] font-semibold text-foreground sm:text-[18px]">{title}</p>
          </div>
        </div>
        <span className="rounded-md border border-border bg-card px-2 py-1 text-[10.5px] text-muted-foreground">FY 2026-27</span>
      </div>
      <nav className="mt-3 flex flex-wrap gap-x-4 gap-y-1 border-b border-border text-[11px]" aria-hidden="true">
        {nav.map((key) => (
          <span
            key={key}
            className={`-mb-px border-b-2 pb-1.5 ${key === active ? "border-primary font-semibold text-primary" : "border-transparent text-muted-foreground"}`}
          >
            {tools[key]}
          </span>
        ))}
      </nav>
      <div className="mt-3.5 space-y-3">{children}</div>
    </div>
  );
}

export function HrPage({
  section,
  path,
  prefix,
  appName,
  features,
  tool,
  group,
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
  group: keyof typeof hrGroups;
  connectStructure: { key: string; tools: ToolKey[] }[];
  icons: LucideIcon[];
  stepTones?: Tone[];
  render: (ui: Record<string, string>) => ReactNode;
}) {
  const content = useTemplateContent(section);
  const { t: common } = useCommon();
  const portal = group === "portal";

  return (
    <TemplatePage
      slug={path}
      prefix={prefix}
      appName={`${portal ? "Employee Portal" : "HR & Payroll"} ${appName}`}
      features={features}
      content={content}
      stepTones={stepTones}
      connectStructure={connectStructure}
      localIcons={icons}
      exploreHref={portal ? "/apps/employee-portal/my-profile" : "/apps/human-resources/employees"}
      exploreLabel={common(portal ? "explorePortal" : "exploreHr")}
      preview={
        <TemplatePreview
          prefix={prefix}
          toolKey={tool}
          content={content}
          cols={[]}
          rows={[]}
          body={
            <HrShell path={path} portal={portal} nav={hrGroups[group]} active={tool} title={content.ui.title}>
              {render(content.ui)}
            </HrShell>
          }
        />
      }
    />
  );
}
