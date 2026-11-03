/**
 * Adon ERP public site: /apps/medical-centre/health-checkups
 * Copy lives in messages/*.json under pages.accountingShowcase.mcCheckupsPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { CalendarCheck, ClipboardCheck, HeartPulse, ShieldCheck } from "lucide-react";

import { Bar, Card, Chip, HrPage, hrMetadata } from "../../human-resources/_hr";

/** DUMMY data: [department, done, due]. */
const progress: [string, number, number][] = [
  ["Production", 96, 128],
  ["Quality", 18, 18],
  ["Supply Chain", 15, 24],
  ["Sales", 9, 22],
  ["Office", 20, 20],
];
/** DUMMY data: [test, result, unit, normal low, normal high, scale max]. */
const results: [string, number, string, number, number, number][] = [
  ["Haemoglobin", 13.8, "g/dL", 13, 17, 20],
  ["Fasting blood sugar", 6.4, "mmol/L", 3.9, 5.6, 10],
  ["Blood pressure, systolic", 124, "mmHg", 90, 130, 180],
  ["Body mass index", 24.1, "", 18.5, 25, 35],
  ["Hearing, 4 kHz", 22, "dB", 0, 25, 60],
];

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("mcCheckupsPage", "/apps/medical-centre/health-checkups");
}

export default function HealthCheckupsPage() {
  return (
    <HrPage
      section="mcCheckupsPage"
      path="/apps/medical-centre/health-checkups"
      prefix="chk"
      appName="Health Checkups"
      tool="mcCheckups"
      group="medical"
      features={[
        "Pre-employment, periodic and job-specific checkups",
        "Who is due, by department and by date",
        "Results against normal ranges, flagged when outside",
        "Follow-up visits booked for anyone flagged",
        "Fit, fit with limits, or unfit, sent to HR",
      ]}
      stepTones={["purple", "teal", "red"]}
      connectStructure={[
        { key: "before", tools: ["hrEmployees", "hrDepartments"] },
        { key: "after", tools: ["mcVisits"] },
        { key: "shows", tools: ["mcOverview", "hrReports"] },
      ]}
      icons={[CalendarCheck, HeartPulse, ClipboardCheck, ShieldCheck]}
      render={(ui) => (
        <div className="grid gap-3 lg:grid-cols-12">
          <Card className="lg:col-span-5" title={ui.campaign} right={<Chip tone="primary">158 / 212</Chip>}>
            <ul className="space-y-2.5">
              {progress.map(([d, done, due]) => (
                <li key={d} className="text-[11px]">
                  <p className="flex justify-between">
                    <span className="text-foreground">{d}</span>
                    <span className="tabular-nums text-muted-foreground">
                      {done} / {due}
                    </span>
                  </p>
                  <span className="mt-1 block">
                    <Bar pct={(done / due) * 100} tone={done === due ? "teal" : "primary"} />
                  </span>
                </li>
              ))}
            </ul>
          </Card>
          <Card className="lg:col-span-7" title={ui.resultTitle} right={<Chip tone="brown">{ui.followUp}</Chip>}>
            <ul className="space-y-2.5">
              {results.map(([test, v, unit, lo, hi, max]) => {
                const out = v < lo || v > hi;
                return (
                  <li key={test} className="grid grid-cols-[9.5rem_1fr_4.5rem] items-center gap-3 text-[11px]">
                    <span className="truncate text-foreground">{test}</span>
                    <span className="relative block h-2 rounded-full bg-muted" aria-hidden="true">
                      <span className="absolute inset-y-0 rounded-full bg-[var(--teal)]/30" style={{ left: `${(lo / max) * 100}%`, width: `${((hi - lo) / max) * 100}%` }} />
                      <span
                        className={`absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-card ${out ? "bg-[var(--chart-4)]" : "bg-primary"}`}
                        style={{ left: `${(v / max) * 100}%` }}
                      />
                    </span>
                    <span className={`text-end tabular-nums ${out ? "font-semibold text-[var(--chart-4)]" : "text-foreground"}`}>
                      {v} <span className="text-[9.5px] font-normal text-muted-foreground">{unit}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
            <p className="mt-3 flex items-center justify-between border-t border-border pt-2 text-[10.5px]">
              <span className="text-muted-foreground">{ui.verdict}</span>
              <Chip tone="teal">{ui.fit}</Chip>
            </p>
          </Card>
        </div>
      )}
    />
  );
}
