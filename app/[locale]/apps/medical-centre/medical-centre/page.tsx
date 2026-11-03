/**
 * Adon ERP public site: /apps/medical-centre/medical-centre
 * Copy lives in messages/*.json under pages.accountingShowcase.mcOverviewPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { Activity, BedDouble, HeartPulse, Pill } from "lucide-react";

import { Avatar, Card, Chip, HrPage, Stat, hrMetadata, type HrTone } from "../../human-resources/_hr";

/** DUMMY data: [time, employee, department, complaint, state key, tone]. */
const queue: [string, string, string, string, string, HrTone][] = [
  ["09:05", "Jahid Hasan", "Moulding", "Fever, loose stools", "qWithDoctor", "primary"],
  ["09:12", "Rokeya Begum", "Printing", "Cut on left hand", "qDressing", "teal"],
  ["09:20", "Abdul Karim", "Stores", "Back pain", "qWaiting", "muted"],
  ["09:26", "Sadia Rahman", "Quality", "Dizziness", "qWaiting", "muted"],
];
/** Visits by hour today, 08:00 to 13:00. */
const byHour = [6, 9, 7, 5, 3];

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("mcOverviewPage", "/apps/medical-centre/medical-centre");
}

export default function MedicalCentrePage() {
  return (
    <HrPage
      section="mcOverviewPage"
      path="/apps/medical-centre/medical-centre"
      prefix="mco"
      appName="Overview"
      tool="mcOverview"
      group="medical"
      features={[
        "Today's clinic: visits, the queue and beds in use",
        "Workplace injuries kept apart from illness",
        "Medicines running low or close to expiry",
        "Health checkups due by department",
        "Sick leave and rest advice sent to HR",
      ]}
      stepTones={["purple", "teal", "red"]}
      connectStructure={[
        { key: "before", tools: ["hrEmployees"] },
        { key: "after", tools: ["mcVisits", "mcPharmacy", "mcCheckups"] },
        { key: "shows", tools: ["hrLeaveApps", "hrReports"] },
      ]}
      icons={[HeartPulse, Activity, Pill, BedDouble]}
      render={(ui) => (
        <>
          <div className="grid gap-2 sm:grid-cols-4">
            <Stat label={ui.visits} value="30" sub={ui.today} tone="primary" />
            <Stat label={ui.injuries} value="2" sub={ui.injuriesSub} tone="red" />
            <Stat label={ui.beds} value="1 / 4" sub={ui.bedsSub} tone="teal" />
            <Stat label={ui.stock} value="3" sub={ui.stockSub} tone="brown" />
          </div>
          <div className="grid gap-3 lg:grid-cols-12">
            <Card className="lg:col-span-8" title={ui.queueTitle}>
              <ul className="divide-y divide-border">
                {queue.map(([t, name, dept, complaint, state, tone], i) => (
                  <li key={name} className="flex items-center gap-3 py-2">
                    <span className="w-10 shrink-0 text-[10px] tabular-nums text-muted-foreground">{t}</span>
                    <Avatar name={name} size={24} tone={i} />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[11px] font-medium text-foreground">
                        {name} <span className="font-normal text-muted-foreground">· {dept}</span>
                      </span>
                      <span className="block truncate text-[10px] text-muted-foreground">{complaint}</span>
                    </span>
                    <Chip tone={tone}>{ui[state]}</Chip>
                  </li>
                ))}
              </ul>
            </Card>
            <Card className="lg:col-span-4" title={ui.hourTitle}>
              <div className="flex h-24 items-end gap-2" aria-hidden="true">
                {byHour.map((v, i) => (
                  <span key={i} className={`flex-1 rounded-t ${i === 1 ? "bg-primary" : "bg-primary/30"}`} style={{ height: `${(v / 9) * 100}%` }} />
                ))}
              </div>
              <div className="mt-1 flex gap-2 text-center text-[9px] tabular-nums text-muted-foreground">
                {["08", "09", "10", "11", "12"].map((h) => (
                  <span key={h} className="flex-1">
                    {h}
                  </span>
                ))}
              </div>
            </Card>
          </div>
        </>
      )}
    />
  );
}
