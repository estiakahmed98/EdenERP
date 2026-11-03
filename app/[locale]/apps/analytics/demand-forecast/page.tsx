/**
 * Adon ERP public site: /apps/analytics/demand-forecast
 * Copy lives in messages/*.json under pages.accountingShowcase.anDemandPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { ChartLine, Settings2, ShoppingCart, TrendingUp } from "lucide-react";

import { Card, Chip, Field, HrPage, hrMetadata } from "../../human-resources/_hr";

const months = ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan"];
/** DUMMY data: demand in thousand pieces; the last three are the forecast. */
const actual = [182, 204, 196, 221, 238];
const forecast = [226, 232, 241];
/** DUMMY data: [item, avg per month, next month, on hand, reorder?]. */
const items: [string, number, number, number, boolean][] = [
  ["Poly bag PE 26×44", 51600, 54200, 38400, true],
  ["Carton box 3-ply", 18900, 19700, 26100, false],
  ["Zipper bag 10×12", 12300, 13100, 9800, true],
];

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("anDemandPage", "/apps/analytics/demand-forecast");
}

export default function AnalyticsDemandPage() {
  const all = [...actual, ...forecast];
  const max = Math.max(...all);
  return (
    <HrPage
      section="anDemandPage"
      path="/apps/analytics/demand-forecast"
      prefix="andem"
      appName="Demand Forecast"
      tool="anDemand"
      group="an"
      features={[
        "Demand for each item projected from approved and paid sales",
        "Moving average or trend, with the history and horizon you choose",
        "Next month and next three months for every item",
        "Reorder suggestions against stock on hand",
        "Recomputed in one click when the settings change",
      ]}
      stepTones={["purple", "teal", "muted"]}
      connectStructure={[
        { key: "before", tools: ["invoicesAr", "invSummary"] },
        { key: "after", tools: ["scRequisitions", "invForecast"] },
        { key: "shows", tools: ["anExec", "crForecast"] },
      ]}
      icons={[ChartLine, Settings2, TrendingUp, ShoppingCart]}
      render={(ui) => (
        <>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            <Field label={ui.method} value={ui.ma} select />
            <Field label={ui.history} value="12" />
            <Field label={ui.horizon} value="3" />
            <div className="flex items-end">
              <span className="btn-gradient block w-full rounded-md py-1.5 text-center text-[11px] font-medium">{ui.recompute}</span>
            </div>
          </div>
          <div className="grid gap-3 lg:grid-cols-12">
            <Card className="lg:col-span-7" title={ui.chartTitle}>
              <div className="flex h-32 items-end gap-1.5" aria-hidden="true">
                {all.map((v, i) => {
                  const f = i >= actual.length;
                  return (
                    <span
                      key={i}
                      className={`flex-1 rounded-t ${f ? "border-2 border-dashed border-[var(--chart-5)] bg-[var(--chart-5)]/15" : "bg-primary"}`}
                      style={{ height: `${(v / max) * 100}%` }}
                    />
                  );
                })}
              </div>
              <div className="mt-1 flex gap-1.5 text-center text-[9.5px] text-muted-foreground">
                {months.map((m) => (
                  <span key={m} className="flex-1">
                    {m}
                  </span>
                ))}
              </div>
              <p className="mt-2 flex gap-4 text-[10px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <span className="h-2 w-3 rounded-sm bg-primary" /> {ui.actual}
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-2 w-3 rounded-sm border border-dashed border-[var(--chart-5)]" /> {ui.forecast}
                </span>
              </p>
            </Card>
            <Card className="lg:col-span-5" title={ui.byItem}>
              <ul className="space-y-2">
                {items.map(([name, avg, next, onHand, reorder]) => (
                  <li key={name} className="rounded-lg bg-[var(--gray-bg)] px-3 py-2 text-[11px]">
                    <p className="flex items-center justify-between">
                      <span className="font-medium text-foreground">{name}</span>
                      <Chip tone={reorder ? "brown" : "teal"}>{reorder ? ui.reorder : ui.ok}</Chip>
                    </p>
                    <p className="mt-0.5 text-[10px] tabular-nums text-muted-foreground">
                      {ui.avg} {avg.toLocaleString("en-IN")} · {ui.next} {next.toLocaleString("en-IN")} · {ui.onHand} {onHand.toLocaleString("en-IN")}
                    </p>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </>
      )}
    />
  );
}
