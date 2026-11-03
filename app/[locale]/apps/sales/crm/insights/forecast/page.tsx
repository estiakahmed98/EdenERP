/**
 * Adon ERP public site: /apps/sales/crm/insights/forecast
 * Copy lives in messages/*.json under pages.accountingShowcase.crForecastPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { CalendarClock, ChartColumnStacked, Layers, Target } from "lucide-react";

import { Card, Chip, HrPage, hrColors, hrMetadata } from "../../../../human-resources/_hr";

const months = ["Nov", "Dec", "Jan", "Feb"];
const cats = ["cClosed", "cCommit", "cBest", "cPipeline"];
/** DUMMY data in lakh: closed, commit, best case, pipeline for each month. */
const data = [
  [31, 18, 12, 9],
  [0, 26, 17, 21],
  [0, 11, 19, 28],
  [0, 4, 13, 30],
];
const target = [62, 60, 55, 55];

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("crForecastPage", "/apps/sales/crm/insights/forecast");
}

export default function ForecastPage() {
  const max = 75;
  return (
    <HrPage
      section="crForecastPage"
      path="/apps/sales/crm/insights/forecast"
      prefix="fcst"
      appName="Forecast"
      tool="crForecast"
      group="crInsightsG"
      features={[
        "Deals sorted into closed, commit, best case and pipeline",
        "Each rep calls their own commit; managers adjust",
        "Forecast month by month against target",
        "The gap to target shown before the month starts",
        "Weighted and called forecasts side by side",
      ]}
      stepTones={["purple", "teal", "muted"]}
      connectStructure={[
        { key: "before", tools: ["crPipeline", "crDeals"] },
        { key: "after", tools: ["crTargets", "bmLines"] },
        { key: "shows", tools: ["crDashboard", "financialReports"] },
      ]}
      icons={[ChartColumnStacked, Layers, Target, CalendarClock]}
      render={(ui) => (
        <Card
          title={ui.chartTitle}
          right={
            <span className="flex flex-wrap gap-2 text-[10px] text-muted-foreground">
              {cats.map((c, i) => (
                <span key={c} className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-sm" style={{ background: hrColors[i === 0 ? 1 : i === 1 ? 0 : i === 2 ? 3 : 2], opacity: i === 3 ? 0.35 : 1 }} />
                  {ui[c]}
                </span>
              ))}
            </span>
          }
        >
          <div className="relative flex h-44 items-end gap-8 px-4" aria-hidden="true">
            {months.map((m, mi) => (
              <div key={m} className="relative flex h-full flex-1 flex-col-reverse">
                {data[mi].map((v, ci) => (
                  <span
                    key={ci}
                    className="w-full first:rounded-b last:rounded-t"
                    style={{ height: `${(v / max) * 100}%`, background: hrColors[ci === 0 ? 1 : ci === 1 ? 0 : ci === 2 ? 3 : 2], opacity: ci === 3 ? 0.35 : 1 }}
                  />
                ))}
                <span className="absolute -inset-x-2 border-t-2 border-dashed border-destructive" style={{ bottom: `${(target[mi] / max) * 100}%` }} />
              </div>
            ))}
          </div>
          <div className="mt-1.5 flex gap-8 px-4 text-center text-[10px]">
            {months.map((m, mi) => {
              const called = data[mi][0] + data[mi][1];
              const gap = target[mi] - called;
              return (
                <span key={m} className="flex-1">
                  <span className="block text-muted-foreground">{m}</span>
                  <Chip tone={gap <= 0 ? "teal" : gap < 20 ? "brown" : "red"}>
                    {gap <= 0 ? ui.onTarget : `−${gap} L`}
                  </Chip>
                </span>
              );
            })}
          </div>
          <p className="mt-3 border-t border-border pt-2 text-[10px] text-muted-foreground">{ui.note}</p>
        </Card>
      )}
    />
  );
}
