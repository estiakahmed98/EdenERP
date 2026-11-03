/**
 * Adon ERP public site: /apps/engineering-maintenance/downtime
 * Copy lives in messages/*.json under pages.accountingShowcase.emDowntimePage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { AlertOctagon, BarChart3, Clock, ListOrdered } from "lucide-react";

import { Card, Chip, HrPage, hrMetadata, type HrTone } from "../../human-resources/_hr";

/** DUMMY data: [reason key, hours this month]. Sorted, total 43.5 h. */
const reasons: [string, number][] = [
  ["rHydraulic", 16],
  ["rMould", 9.5],
  ["rPower", 7],
  ["rMaterial", 5],
  ["rElectrical", 4],
  ["rOther", 2],
];
const total = reasons.reduce((a, r) => a + r[1], 0);
const events: [string, string, string, string, HrTone][] = [
  ["2 Nov 07:40", "IM-04", "rHydraulic", "5 h 30 m", "red"],
  ["1 Nov 14:05", "PP-02", "rMould", "1 h 15 m", "brown"],
  ["31 Oct 22:10", "All", "rPower", "2 h 00 m", "navy"],
];

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("emDowntimePage", "/apps/engineering-maintenance/downtime");
}

export default function DowntimePage() {
  let acc = 0;
  const cumulative = reasons.map((r) => (acc += r[1]) / total);
  const pts = cumulative.map((c, i) => `${((i + 0.5) / reasons.length) * 100},${100 - c * 100}`).join(" ");

  return (
    <HrPage
      section="emDowntimePage"
      path="/apps/engineering-maintenance/downtime"
      prefix="dt"
      appName="Downtime"
      tool="emDowntime"
      group="maint"
      features={[
        "Every stop recorded with a start, an end and a reason",
        "Planned and unplanned downtime kept apart",
        "A Pareto of reasons, so the biggest causes are fixed first",
        "Availability, MTBF and MTTR worked out from the log",
        "Lost output in units and in taka",
      ]}
      stepTones={["red", "purple", "teal"]}
      connectStructure={[
        { key: "before", tools: ["emEquipment", "emWorkOrders"] },
        { key: "after", tools: ["emPm"] },
        { key: "shows", tools: ["emOverview", "financialReports"] },
      ]}
      icons={[AlertOctagon, Clock, BarChart3, ListOrdered]}
      render={(ui) => (
        <div className="grid gap-3 lg:grid-cols-12">
          <Card className="lg:col-span-7" title={ui.paretoTitle} right={<Chip tone="muted">{total} h</Chip>}>
            <div className="relative h-36">
              <div className="flex h-full items-end gap-2">
                {reasons.map(([k, h], i) => (
                  <div key={k} className="flex h-full flex-1 flex-col justify-end">
                    <span className={`block rounded-t ${i < 2 ? "bg-destructive" : "bg-primary/60"}`} style={{ height: `${(h / reasons[0][1]) * 100}%` }} aria-hidden="true" />
                  </div>
                ))}
              </div>
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
                <polyline points={pts} fill="none" stroke="var(--secondary)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                <line x1="0" x2="100" y1="20" y2="20" stroke="var(--muted-foreground)" strokeDasharray="3 3" strokeWidth="1" vectorEffect="non-scaling-stroke" />
              </svg>
            </div>
            <div className="mt-1.5 flex gap-2">
              {reasons.map(([k, h]) => (
                <span key={k} className="flex-1 text-center text-[9.5px] leading-tight text-muted-foreground">
                  {ui[k]}
                  <span className="block tabular-nums text-foreground">{h} h</span>
                </span>
              ))}
            </div>
            <p className="mt-2 text-[10px] text-muted-foreground">{ui.paretoNote}</p>
          </Card>
          <Card className="lg:col-span-5" title={ui.logTitle} right={<Chip tone="primary">{ui.logStop}</Chip>}>
            <ul className="space-y-2">
              {events.map(([when, m, k, dur, tone]) => (
                <li key={when} className="rounded-lg border border-border p-2.5">
                  <p className="flex items-center justify-between text-[10px] text-muted-foreground">
                    <span className="tabular-nums">{when}</span>
                    <span className="font-mono font-semibold text-foreground">{m}</span>
                  </p>
                  <p className="mt-1 flex items-center justify-between text-[11px]">
                    <Chip tone={tone}>{ui[k]}</Chip>
                    <span className="font-semibold tabular-nums text-foreground">{dur}</span>
                  </p>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      )}
    />
  );
}
