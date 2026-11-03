/**
 * Adon ERP public site: /apps/budget-management/variance
 * Copy lives in messages/*.json under pages.accountingShowcase.bmVariance.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { BarChart3, TrendingDown, ShieldAlert, Gauge } from "lucide-react";
import { BudgetPage, budgetMetadata, Card, Bullet, Donut, donutColors, taka } from "../_budget";

/** DUMMY data in lakh taka: [category, budget, actual]. Totals 840 and 624. */
const cats: [string, number, number][] = [
  ["Raw materials", 210, 148],
  ["Salaries", 180, 137],
  ["Logistics", 100, 81],
  ["Other", 90, 54],
  ["Marketing", 80, 56],
  ["Maintenance", 65, 49],
  ["Utilities", 60, 47],
  ["Software & IT", 55, 52],
];

export async function generateMetadata(): Promise<Metadata> {
  return budgetMetadata("bmVariance", "/apps/budget-management/variance");
}

export default function BudgetVariancePage() {
  return (
    <BudgetPage
      section="bmVariance"
      path="/apps/budget-management/variance"
      prefix="bv"
      appName="Variance"
      tool="bmVariance"
      features={[
        "Budget against actual for every category",
        "Variance in taka and percent of budget used",
        "A marker on each bar for how much of the year has gone",
        "A ring showing how the budget is made up",
        "Enforcement of the budget on spending",
      ]}
      stepTones={["teal", "amber", "red"]}
      connectStructure={[
        { key: "before", tools: ["bmLines", "bmRequisitions"] },
        { key: "after", tools: ["bmRbrf", "bmApprovals"] },
        { key: "shows", tools: ["financialReports", "accountingHub", "ledgers"] },
      ]}
      icons={[BarChart3, TrendingDown, ShieldAlert, Gauge]}
      render={(ui) => (
        <div className="grid gap-3 lg:grid-cols-12">
          <Card title={ui.composition} className="lg:col-span-4">
            <Donut values={cats.slice(0, 4).map((c) => c[1]).concat([cats.slice(4).reduce((a, c) => a + c[1], 0)])} centre={taka(840).replace("BDT ", "")} caption={ui.budget} />
            <ul className="mt-3 space-y-1 text-[10.5px]">
              {cats.slice(0, 4).map((c, i) => (
                <li key={c[0]} className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-foreground">
                    <span className="h-2 w-2 rounded-full" style={{ background: donutColors[i] }} />
                    {c[0]}
                  </span>
                  <span className="tabular-nums text-muted-foreground">{Math.round((c[1] / 840) * 100)}%</span>
                </li>
              ))}
              <li className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-foreground">
                  <span className="h-2 w-2 rounded-full" style={{ background: donutColors[4] }} />
                  {ui.others}
                </span>
                <span className="tabular-nums text-muted-foreground">{Math.round((cats.slice(4).reduce((a, c) => a + c[1], 0) / 840) * 100)}%</span>
              </li>
            </ul>
          </Card>
          <Card
            title={ui.title}
            className="lg:col-span-8"
            right={
              <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                <span className="inline-block h-3 w-[2px] rounded bg-foreground/70" /> {ui.elapsed}
              </span>
            }
          >
            <ul className="space-y-2.5">
              {cats.map(([name, budget, actual]) => {
                const pct = Math.round((actual / budget) * 100);
                return (
                  <li key={name} className="grid grid-cols-[6.5rem_1fr_3rem] items-center gap-x-3 text-[11px] sm:grid-cols-[7.5rem_1fr_8rem_3rem]">
                    <span className="truncate font-medium text-foreground">{name}</span>
                    <Bullet pct={pct} />
                    <span className="hidden text-end tabular-nums text-[var(--teal)] sm:block">{taka(budget - actual)}</span>
                    <span className={`text-end tabular-nums ${pct >= 90 ? "font-semibold text-amber-600 dark:text-amber-400" : "text-muted-foreground"}`}>{pct}%</span>
                  </li>
                );
              })}
            </ul>
            <div className="mt-3 grid grid-cols-3 gap-2 border-t border-border pt-3 text-[11px]">
              <div>
                <p className="text-muted-foreground">{ui.budget}</p>
                <p className="font-semibold tabular-nums text-foreground">{taka(840)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">{ui.actual}</p>
                <p className="font-semibold tabular-nums text-foreground">{taka(624)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">{ui.variance}</p>
                <p className="font-semibold tabular-nums text-[var(--teal)]">{taka(216)}</p>
              </div>
            </div>
          </Card>
        </div>
      )}
    />
  );
}
