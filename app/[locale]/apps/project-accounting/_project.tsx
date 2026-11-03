import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import { X } from "lucide-react";
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
 * Shared pieces for the Project Accounting showcase pages. Every page shows the
 * same project header and tab row, then the content of one tab, then (optionally)
 * the form that tab opens. Copy lives under pages.accountingShowcase.<section>.
 * ALL DATA ON THESE PAGES IS DUMMY.
 */

export const PROJECT_CODE = "PRJ-AUTOMATION";
export const PROJECT_NAME = "Line Automation Upgrade";

export const projectTabs: ToolKey[] = [
  "pjOverview",
  "pjCostCodes",
  "pjBudgets",
  "pjJobCost",
  "pjChangeOrders",
  "pjWip",
  "pjProgressBilling",
  "pjSchedule",
  "pjRisks",
  "pjDocuments",
  "pjMilestones",
  "pjBoq",
  "pjBillAllocations",
  "pjPnl",
];

export function projectMetadata(section: string, slug: string): Promise<Metadata> {
  return accountingPageMetadata(section, `/apps/project-accounting/${slug}`);
}

/* ------------------------------------------------------------------ */
/* Building blocks                                                     */
/* ------------------------------------------------------------------ */

export function Panel({
  title,
  count,
  action,
  note,
  children,
}: {
  title: string;
  count?: number;
  action?: string;
  note?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-3.5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[13px] font-semibold text-foreground">
          {title}
          {count !== undefined && <span className="ms-1 font-normal text-muted-foreground">· {count}</span>}
        </p>
        {action && (
          <span className="btn-gradient rounded-md px-2 py-1 text-[11px] font-medium">+ {action}</span>
        )}
      </div>
      {note && <p className="mt-2 text-[10.5px] leading-snug text-muted-foreground">{note}</p>}
      <div className="mt-2.5">{children}</div>
    </div>
  );
}

export type PCol = { head: string; align?: "end"; className?: string };

export function MiniTable({ cols, rows, empty }: { cols: PCol[]; rows: ReactNode[][]; empty?: string }) {
  return (
    <div className="overflow-hidden rounded-md border border-border">
      <table className="w-full text-[10.5px]">
        <thead className="bg-[var(--gray-bg)] text-[9.5px] font-semibold uppercase tracking-wide text-muted-foreground">
          <tr>
            {cols.map((c) => (
              <th key={c.head} className={`px-2.5 py-1.5 ${c.align === "end" ? "text-end" : "text-start"} ${c.className ?? ""}`}>
                {c.head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className={`border-t border-border ${i % 2 ? "bg-[var(--gray-bg)]/40" : ""}`}>
              {r.map((cell, j) => (
                <td key={j} className={`px-2.5 py-1.5 text-foreground ${cols[j].align === "end" ? "text-end tabular-nums" : ""} ${cols[j].className ?? ""}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
          {rows.length === 0 && empty && (
            <tr className="border-t border-border">
              <td colSpan={cols.length} className="px-2.5 py-2 text-foreground">
                {empty}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export function Stat({ label, value, sub, tone = "" }: { label: string; value: string; sub?: string; tone?: string }) {
  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2.5">
      <p className="text-[10px] text-muted-foreground">{label}</p>
      <p className={`mt-0.5 text-[13px] font-semibold tabular-nums sm:text-[15px] ${tone || "text-foreground"}`}>{value}</p>
      {sub && <p className="mt-0.5 text-[9.5px] text-muted-foreground">{sub}</p>}
    </div>
  );
}

export function KV({ rows }: { rows: { label: string; value: string; bold?: boolean; tone?: string }[] }) {
  return (
    <dl className="text-[11px]">
      {rows.map((r) => (
        <div key={r.label} className="flex justify-between gap-3 border-b border-border/70 py-1.5 last:border-b-0">
          <dt className={r.bold ? "font-semibold text-foreground" : "text-foreground"}>{r.label}</dt>
          <dd className={`tabular-nums ${r.bold ? "font-semibold" : ""} ${r.tone ?? "text-foreground"}`}>{r.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function FormField({ label, value, kind = "input" }: { label: string; value?: string; kind?: "input" | "select" | "area" }) {
  return (
    <div>
      <p className="text-[10px] text-muted-foreground">{label}</p>
      <div
        className={`mt-0.5 rounded-md border border-border bg-[var(--gray-bg)] px-2.5 text-[11px] text-foreground ${
          kind === "area" ? "h-10 py-1.5" : "py-1.5"
        } ${kind === "select" ? "flex items-center justify-between" : ""}`}
      >
        <span className="text-muted-foreground">{value ?? ""}</span>
        {kind === "select" && <span className="text-[9px] text-muted-foreground">▾</span>}
      </div>
    </div>
  );
}

export function Pill({ tone, children }: { tone: Tone; children: ReactNode }) {
  const style: Record<Tone, string> = {
    teal: "bg-[var(--teal)]/12 text-[var(--teal)]",
    red: "bg-destructive/10 text-destructive",
    amber: "bg-amber-500/12 text-amber-600 dark:text-amber-400",
    muted: "bg-muted text-muted-foreground",
    blue: "bg-sky-500/12 text-sky-600 dark:text-sky-400",
    purple: "bg-primary/10 text-primary",
  };
  return <span className={`inline-block rounded px-1.5 py-0.5 text-[10px] font-medium ${style[tone]}`}>{children}</span>;
}

export const mono = "font-mono text-[10px]";
export const money = "tabular-nums";

/* ------------------------------------------------------------------ */
/* Page frame                                                          */
/* ------------------------------------------------------------------ */

export type ProjectRender = {
  main: ReactNode;
  dialog?: { title: string; fields: ReactNode; wide?: boolean; noFooter?: boolean };
};

function ProjectBody({ active, render }: { active: ToolKey; render: ProjectRender }) {
  const { t: common, tools } = useCommon();
  const { main, dialog } = render;

  return (
    <div>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-[15px] font-semibold text-foreground sm:text-lg">
            {PROJECT_CODE} · {PROJECT_NAME}
          </p>
          <p className="mt-0.5 flex items-center gap-1.5 text-[10.5px] text-muted-foreground">
            rd_capex · cost_plus · —
            <span className="rounded-full bg-emerald-600 px-1.5 py-0.5 text-[9.5px] font-semibold text-white">{common("active")}</span>
          </p>
        </div>
        <span className="hidden shrink-0 rounded-md border border-border bg-card px-2 py-1 text-[10.5px] text-primary sm:inline-block">
          {common("backToList")}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap gap-x-3.5 gap-y-1 border-b border-border text-[10.5px]">
        {projectTabs.map((key) => (
          <span
            key={key}
            className={`-mb-px border-b-2 pb-1.5 ${
              key === active ? "border-primary font-semibold text-primary" : "border-transparent text-muted-foreground"
            }`}
          >
            {key === "pjOverview" ? common("tabOverview") : tools[key]}
          </span>
        ))}
      </div>

      <div className={`mt-3 grid gap-4 ${dialog ? "lg:grid-cols-12" : ""}`}>
        <div className={`min-w-0 space-y-3 ${dialog ? "lg:col-span-7" : ""}`}>{main}</div>
        {dialog && (
          <div className="order-first lg:order-none lg:col-span-5">
            <div className="rounded-xl border border-border bg-card shadow-[0_20px_40px_-24px_oklch(0.3_0.08_257/0.45)]">
              <div className="flex items-center justify-between px-4 pt-3.5">
                <p className="text-[14px] font-semibold text-foreground">{dialog.title}</p>
                <X className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
              </div>
              <div className={`grid gap-x-3 gap-y-2.5 px-4 py-3 ${dialog.wide ? "grid-cols-2" : ""}`}>{dialog.fields}</div>
              {!dialog.noFooter && (
                <div className="flex justify-end gap-2 px-4 pb-3.5 text-[11px] font-medium">
                  <span className="rounded-md border border-border bg-card px-2.5 py-1 text-primary">{common("cancel")}</span>
                  <span className="btn-gradient rounded-md px-2.5 py-1">{common("save")}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function ProjectPage({
  section,
  slug,
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
  slug: string;
  prefix: string;
  appName: string;
  features: string[];
  tool: ToolKey;
  connectStructure: { key: string; tools: ToolKey[] }[];
  icons: LucideIcon[];
  stepTones?: Tone[];
  render: (ui: Record<string, string>) => ProjectRender;
}) {
  const content = useTemplateContent(section);
  const { t: common } = useCommon();

  return (
    <TemplatePage
      slug={`/apps/project-accounting/${slug}`}
      prefix={prefix}
      appName={`Project Accounting ${appName}`}
      features={features}
      content={content}
      stepTones={stepTones}
      connectStructure={connectStructure}
      localIcons={icons}
      exploreHref="/apps/project-accounting/projects"
      exploreLabel={common("exploreProject")}
      preview={
        <TemplatePreview
          prefix={prefix}
          toolKey={tool}
          content={content}
          cols={[]}
          rows={[]}
          body={<ProjectBody active={tool} render={render(content.ui)} />}
        />
      }
    />
  );
}
