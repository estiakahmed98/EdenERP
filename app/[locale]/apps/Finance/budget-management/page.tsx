/**
 * Adon ERP public site: /apps/Finance/budget-management
 * Copy lives in messages/*.json under pages.accountingShowcase.bmOverview.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { Layers, CheckCheck, Gauge, ShieldCheck } from "lucide-react";
import { BudgetPage, budgetMetadata, Card, Tile, Spark, Bullet, Avatar, ELAPSED, taka } from "../../budget-management/_budget";

/** DUMMY data in lakh taka: [department, budget, actual to date]. Totals 840 and 624. */
const depts: [string, number, number][] = [
  ["Production", 350, 248],
  ["Logistics", 100, 81],
  ["Sales & Marketing", 120, 82],
  ["Administration", 90, 71],
  ["Human Resources", 60, 41],
  ["IT", 55, 52],
  ["Maintenance", 65, 49],
];
/** Actual spend per month, January to September. Adds up to 624. */
const monthly = [52, 58, 61, 66, 70, 72, 75, 84, 86];

export async function generateMetadata(): Promise<Metadata> {
  return budgetMetadata("bmOverview", "/apps/Finance/budget-management");
}

export default function BudgetManagementPage() {
  return (
    <BudgetPage
      section="bmOverview"
      path="/apps/Finance/budget-management"
      prefix="bm"
      appName="Overview"
      tool="bmOverview"
      features={[
        "Budget versions by fiscal year, with an active version and a version number",
        "Total budget, actual to date, remaining budget and utilisation at a glance",
        "Budget against actual by department, with a marker for how much of the year has gone",
        "Pending approvals and the stage the budget has reached",
        "Departmental requisitions, multi-stage approval and variance control in one place",
      ]}
      stepTones={["blue", "teal", "amber"]}
      connectStructure={[
        { key: "before", tools: ["chartOfAccounts", "bmLines"] },
        { key: "after", tools: ["bmRequisitions", "bmApprovals", "bmRbrf"] },
        { key: "shows", tools: ["bmVariance", "financialReports", "accountingHub"] },
      ]}
      icons={[Layers, CheckCheck, Gauge, ShieldCheck]}
      render={(ui) => (
        <>
          <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
            <Tile label={ui.total} value={taka(840)} sub={ui.fiscal}>
              <Bullet pct={100} marker={ELAPSED} />
            </Tile>
            <Tile label={ui.actual} value={taka(624)} accent="sky" sub={ui.monthly}>
              <Spark values={monthly} />
            </Tile>
            <Tile label={ui.remaining} value={taka(216)} accent="teal" sub={ui.utilisation}>
              <Bullet pct={74} />
            </Tile>
            <Tile label={ui.pending} value="2" accent="amber" sub={ui.nextUp}>
              <span className="flex gap-1">
                <Avatar name="A. Rahman" tone={0} />
                <Avatar name="N. Sultana" tone={1} />
                <Avatar name="M. Islam" tone={2} />
              </span>
            </Tile>
          </div>
          <Card
            title={ui.byDept}
            right={
              <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                <span className="inline-block h-3 w-[2px] rounded bg-foreground/70" /> {ui.elapsed}
              </span>
            }
          >
            <ul className="space-y-2.5">
              {depts.map(([name, budget, actual]) => {
                const pct = Math.round((actual / budget) * 100);
                return (
                  <li key={name} className="grid grid-cols-[7.5rem_1fr_3rem] items-center gap-x-3 text-[11px]">
                    <span className="truncate font-medium text-foreground">{name}</span>
                    <Bullet pct={pct} />
                    <span className={`text-end tabular-nums ${pct >= 90 ? "font-semibold text-amber-600 dark:text-amber-400" : "text-muted-foreground"}`}>{pct}%</span>
                  </li>
                );
              })}
            </ul>
          </Card>
        </>
      )}
    />
  );
}
