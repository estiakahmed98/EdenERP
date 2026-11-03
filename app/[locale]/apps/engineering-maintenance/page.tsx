/**
 * Adon ERP public site: /apps/engineering-maintenance
 * Copy lives in messages/*.json under pages.accountingShowcase.emOverviewPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { Activity, Gauge, Timer, Wrench } from "lucide-react";

import { Bar, Card, Chip, HrPage, Stat, hrMetadata, type HrTone } from "../human-resources/_hr";

/** DUMMY data: [machine, downtime hours this month]. */
const worst: [string, number][] = [
  ["Injection moulder IM-04", 18.5],
  ["Printing press PP-02", 11.0],
  ["Air compressor AC-01", 7.5],
  ["Granulator GR-03", 4.0],
  ["Chiller CH-01", 2.5],
];
const upcoming: [string, string, string, HrTone][] = [
  ["Today", "IM-02 · monthly PM", "pmDue", "brown"],
  ["Tomorrow", "Boiler BL-01 · safety check", "pmDue", "brown"],
  ["5 Nov", "Pressure gauge PG-11", "calDue", "sky"],
  ["8 Nov", "Forklift FL-02 · 500 h service", "pmDue", "brown"],
];

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("emOverviewPage", "/apps/engineering-maintenance");
}

export default function EngineeringMaintenancePage() {
  return (
    <HrPage
      section="emOverviewPage"
      path="/apps/engineering-maintenance"
      prefix="emo"
      appName="Overview"
      tool="emOverview"
      group="maint"
      features={[
        "Availability, MTBF and MTTR for the plant at a glance",
        "Open work orders and what is waiting for parts",
        "Machines with the most downtime this month",
        "Preventive maintenance and calibration coming due",
        "Maintenance cost by machine and by line",
      ]}
      stepTones={["purple", "teal", "muted"]}
      connectStructure={[
        { key: "before", tools: ["emEquipment", "emPm"] },
        { key: "after", tools: ["emWorkOrders", "emSpares", "emCalibration"] },
        { key: "shows", tools: ["emDowntime", "financialReports"] },
      ]}
      icons={[Gauge, Activity, Timer, Wrench]}
      render={(ui) => (
        <>
          <div className="grid gap-2 sm:grid-cols-4">
            <Stat label={ui.availability} value="94.2%" sub={ui.target} tone="teal" />
            <Stat label={ui.mtbf} value="126 h" sub={ui.mtbfSub} tone="primary" />
            <Stat label={ui.mttr} value="2.8 h" sub={ui.mttrSub} tone="navy" />
            <Stat label={ui.openWo} value="17" sub={ui.openWoSub} tone="brown" />
          </div>
          <div className="grid gap-3 lg:grid-cols-12">
            <Card className="lg:col-span-7" title={ui.worstTitle}>
              <ul className="space-y-2">
                {worst.map(([m, h]) => (
                  <li key={m} className="grid grid-cols-[10rem_1fr_3rem] items-center gap-3 text-[11px]">
                    <span className="truncate text-foreground">{m}</span>
                    <Bar pct={(h / 20) * 100} tone={h > 10 ? "red" : "primary"} />
                    <span className="text-end tabular-nums text-muted-foreground">{h} h</span>
                  </li>
                ))}
              </ul>
            </Card>
            <Card className="lg:col-span-5" title={ui.upcomingTitle}>
              <ul className="space-y-2">
                {upcoming.map(([when, what, kind, tone]) => (
                  <li key={what} className="flex items-center gap-2.5 text-[11px]">
                    <span className="w-16 shrink-0 text-[10px] font-semibold text-muted-foreground">{when}</span>
                    <span className="min-w-0 flex-1 truncate text-foreground">{what}</span>
                    <Chip tone={tone}>{ui[kind]}</Chip>
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
