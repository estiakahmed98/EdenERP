/**
 * Adon ERP public site: /apps/employee-portal/my-pf-gratuity
 * Copy lives in messages/*.json under pages.accountingShowcase.epPfPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { HandCoins, Landmark, PiggyBank, TrendingUp } from "lucide-react";

import { Card, Chip, HrPage, bdt, hrMetadata } from "../../human-resources/_hr";

/** DUMMY data: PF balance at each year end, in taka: [year, own, employer, profit]. */
const years: [string, number, number, number][] = [
  ["2022", 18200, 18200, 900],
  ["2023", 46800, 46800, 4300],
  ["2024", 77500, 77500, 10200],
  ["2025", 110900, 110900, 18600],
  ["2026", 140400, 140400, 27900],
];
const latest = years[years.length - 1];
const max = latest[1] + latest[2] + latest[3];

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("epPfPage", "/apps/employee-portal/my-pf-gratuity");
}

export default function MyPfGratuityPage() {
  return (
    <HrPage
      section="epPfPage"
      path="/apps/employee-portal/my-pf-gratuity"
      prefix="mypf"
      appName="My PF & Gratuity"
      tool="epPf"
      group="portal"
      features={[
        "Provident fund balance: own share, employer share and profit",
        "Every month's contribution listed",
        "The vested share of the employer's money",
        "Gratuity earned so far, worked out from service and basic",
        "A statement to download at any time",
      ]}
      stepTones={["purple", "teal", "muted"]}
      connectStructure={[
        { key: "before", tools: ["hrPolicy", "hrPayrollRuns"] },
        { key: "after", tools: ["hrSettlements"] },
        { key: "shows", tools: ["epPayslips", "epProfile"] },
      ]}
      icons={[PiggyBank, TrendingUp, Landmark, HandCoins]}
      render={(ui) => (
        <div className="grid gap-3 lg:grid-cols-12">
          <Card className="lg:col-span-8" title={ui.growth} right={<Chip tone="primary">{bdt(max)}</Chip>}>
            <div className="flex h-36 items-end gap-3" aria-hidden="true">
              {years.map(([y, own, er, profit]) => (
                <div key={y} className="flex flex-1 flex-col items-center gap-1">
                  <div className="flex w-full flex-col-reverse overflow-hidden rounded-t-md" style={{ height: `${((own + er + profit) / max) * 112}px` }}>
                    <span className="bg-primary" style={{ flex: own }} />
                    <span className="bg-[var(--teal)]" style={{ flex: er }} />
                    <span className="bg-[var(--chart-5)]" style={{ flex: profit }} />
                  </div>
                  <span className="text-[9.5px] tabular-nums text-muted-foreground">{y}</span>
                </div>
              ))}
            </div>
            <p className="mt-2 flex flex-wrap gap-x-4 text-[10px] text-muted-foreground">
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-sm bg-primary" />
                {ui.own}
              </span>
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-sm bg-[var(--teal)]" />
                {ui.employer}
              </span>
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-sm bg-[var(--chart-5)]" />
                {ui.profit}
              </span>
            </p>
          </Card>
          <div className="space-y-3 lg:col-span-4">
            <Card title={ui.pfNow}>
              <dl className="space-y-1 text-[11px]">
                {[
                  [ui.own, latest[1]],
                  [ui.employer, latest[2]],
                  [ui.profit, latest[3]],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <dt className="text-muted-foreground">{k}</dt>
                    <dd className="tabular-nums text-foreground">{Number(v).toLocaleString("en-IN")}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-2 flex items-center justify-between text-[10.5px]">
                <span className="text-muted-foreground">{ui.vested}</span>
                <Chip tone="teal">75%</Chip>
              </p>
            </Card>
            <Card title={ui.gratuity}>
              <p className="text-[17px] font-semibold tabular-nums text-foreground">{bdt(24600 * 4)}</p>
              <p className="text-[10px] text-muted-foreground">{ui.gratuitySub}</p>
            </Card>
          </div>
        </div>
      )}
    />
  );
}
