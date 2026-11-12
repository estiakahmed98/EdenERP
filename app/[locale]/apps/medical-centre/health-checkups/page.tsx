/**
 * Adon ERP public site: /apps/medical-centre/health-checkups
 * Copy lives in messages/*.json under pages.accountingShowcase.mcCheckupsPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { useLocale } from "next-intl";
import { CalendarCheck, ClipboardCheck, HeartPulse, ShieldCheck } from "lucide-react";

import { Bar, Card, Chip, HrPage, hrMetadata } from "../../human-resources/_hr";

/** DUMMY data: [message key, English fallback, done, due]. */
const progress: [string, string, number, number][] = [
  ["dProduction", "Production", 96, 128],
  ["dQuality", "Quality", 18, 18],
  ["dSupplyChain", "Supply Chain", 15, 24],
  ["dSales", "Sales", 9, 22],
  ["dOffice", "Office", 20, 20],
];
/** DUMMY data: [message key, English fallback, result, unit, normal low, normal high, scale max]. */
const results: [string, string, number, string, number, number, number][] = [
  ["tHb", "Haemoglobin", 13.8, "g/dL", 13, 17, 20],
  ["tFbs", "Fasting blood sugar", 6.4, "mmol/L", 3.9, 5.6, 10],
  ["tBp", "Blood pressure, systolic", 124, "mmHg", 90, 130, 180],
  ["tBmi", "Body mass index", 24.1, "", 18.5, 25, 35],
  ["tHearing", "Hearing, 4 kHz", 22, "dB", 0, 25, 60],
];

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("mcCheckupsPage", "/apps/medical-centre/health-checkups");
}

export default function HealthCheckupsPage() {
  const locale = useLocale();
  /** Bangla pages show Bangla digits; other locales keep the sample figures as written. */
  const num = (n: number) => (locale === "bn" ? n.toLocaleString("bn-BD", { useGrouping: false }) : String(n));
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
          <Card className="lg:col-span-5" title={ui.campaign} right={<Chip tone="primary">{num(158)} / {num(212)}</Chip>}>
            <ul className="space-y-2.5">
              {progress.map(([k, fallback, done, due]) => (
                <li key={k} className="text-[11px]">
                  <p className="flex justify-between">
                    <span className="text-foreground">{ui[k] ?? fallback}</span>
                    <span className="tabular-nums text-muted-foreground">
                      {num(done)} / {num(due)}
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
              {results.map(([k, fallback, v, unit, lo, hi, max]) => {
                const out = v < lo || v > hi;
                return (
                  <li key={k} className="grid grid-cols-[9.5rem_1fr_4.5rem] items-center gap-3 text-[11px]">
                    <span className="truncate text-foreground">{ui[k] ?? fallback}</span>
                    <span className="relative block h-2 rounded-full bg-muted" aria-hidden="true">
                      <span className="absolute inset-y-0 rounded-full bg-[var(--teal)]/30" style={{ left: `${(lo / max) * 100}%`, width: `${((hi - lo) / max) * 100}%` }} />
                      <span
                        className={`absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-card ${out ? "bg-[var(--chart-4)]" : "bg-primary"}`}
                        style={{ left: `${(v / max) * 100}%` }}
                      />
                    </span>
                    <span className={`text-end tabular-nums ${out ? "font-semibold text-[var(--chart-4)]" : "text-foreground"}`}>
                      {num(v)} <span className="text-[9.5px] font-normal text-muted-foreground">{unit}</span>
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
