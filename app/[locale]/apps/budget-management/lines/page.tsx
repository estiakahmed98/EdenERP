/**
 * Adon ERP public site: /apps/budget-management/lines
 * Copy lives in messages/*.json under pages.accountingShowcase.bmLines.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { ListChecks, CalendarRange, Layers, StickyNote } from "lucide-react";
import { BudgetPage, budgetMetadata, Card, taka } from "../_budget";

const dot: Record<string, string> = {
  materials: "bg-primary",
  utilities: "bg-amber-500",
  marketing: "bg-sky-500",
  travel: "bg-[var(--teal)]",
  software: "bg-violet-500",
  hardware: "bg-pink-500",
  other: "bg-muted-foreground",
};

/** DUMMY data in lakh taka: [category, description, amount, period]. */
const groups: { dept: string; lines: [string, string, number, string][] }[] = [
  { dept: "Production", lines: [["materials", "PP granules and masterbatch", 210, "annual"], ["utilities", "Factory power", 60, "monthly"], ["other", "Packing consumables", 80, "annual"]] },
  { dept: "Sales & Marketing", lines: [["marketing", "Eid campaign", 20, "Apr"], ["marketing", "Trade fairs", 60, "annual"], ["travel", "Field sales", 40, "monthly"]] },
  { dept: "IT", lines: [["software", "ERP and licences", 30, "annual"], ["hardware", "Servers and laptops", 25, "Jul"]] },
];

export async function generateMetadata(): Promise<Metadata> {
  return budgetMetadata("bmLines", "/apps/budget-management/lines");
}

export default function BudgetLinesPage() {
  return (
    <BudgetPage
      section="bmLines"
      path="/apps/budget-management/lines"
      prefix="bl"
      appName="Lines"
      tool="bmLines"
      features={[
        "Budget lines grouped by department and category",
        "A description and a budget amount on every line",
        "An annual amount, or a single month from 1 to 12",
        "An inline row to add a line without leaving the list",
        "Notes on every line",
      ]}
      stepTones={["blue", "teal", "amber"]}
      connectStructure={[
        { key: "before", tools: ["bmOverview", "chartOfAccounts"] },
        { key: "after", tools: ["bmRequisitions", "bmVariance", "bmRbrf"] },
        { key: "shows", tools: ["financialReports", "ledgers"] },
      ]}
      icons={[ListChecks, CalendarRange, Layers, StickyNote]}
      render={(ui) => (
        <Card>
          <div className="grid grid-cols-[1fr_auto] gap-x-4 border-b border-border pb-1.5 text-[9.5px] font-semibold uppercase tracking-wide text-muted-foreground sm:grid-cols-[7rem_1fr_5rem_8rem]">
            <span className="hidden sm:block">{ui.colCategory}</span>
            <span>{ui.colDesc}</span>
            <span className="hidden sm:block">{ui.colPeriod}</span>
            <span className="text-end">{ui.colAmount}</span>
          </div>
          {groups.map((g) => (
            <div key={g.dept}>
              <p className="mt-2.5 flex items-center justify-between rounded-md bg-[var(--gray-bg)] px-2 py-1 text-[11px] font-semibold text-foreground">
                {g.dept}
                <span className="font-normal tabular-nums text-muted-foreground">{taka(g.lines.reduce((a, l) => a + l[2], 0))}</span>
              </p>
              {g.lines.map((l) => (
                <div key={l[1]} className="grid grid-cols-[1fr_auto] items-center gap-x-4 border-b border-border/60 py-1.5 text-[11px] sm:grid-cols-[7rem_1fr_5rem_8rem]">
                  <span className="hidden items-center gap-1.5 sm:flex">
                    <span className={`h-2 w-2 rounded-full ${dot[l[0]] ?? "bg-muted-foreground"}`} />
                    {l[0]}
                  </span>
                  <span className="truncate text-foreground">{l[1]}</span>
                  <span className="hidden text-muted-foreground sm:block">{l[3] === "annual" ? ui.annual : l[3] === "monthly" ? ui.monthly : l[3]}</span>
                  <span className="text-end tabular-nums text-foreground">{taka(l[2])}</span>
                </div>
              ))}
            </div>
          ))}
          <div className="mt-2.5 grid grid-cols-[1fr_auto] items-center gap-x-3 rounded-lg border border-dashed border-primary/40 px-2.5 py-1.5 text-[11px] sm:grid-cols-[7rem_1fr_5rem_8rem]">
            <span className="font-medium text-primary">+ {ui.addLine}</span>
            <span className="hidden text-muted-foreground sm:block">{ui.colDesc}…</span>
            <span className="hidden sm:block" />
            <span className="hidden text-end text-muted-foreground sm:block">0</span>
          </div>
          <p className="mt-3 flex justify-between border-t border-border pt-2 text-[11px] font-semibold text-foreground">
            <span>{ui.total}</span>
            <span className="tabular-nums">{taka(840)}</span>
          </p>
        </Card>
      )}
    />
  );
}
