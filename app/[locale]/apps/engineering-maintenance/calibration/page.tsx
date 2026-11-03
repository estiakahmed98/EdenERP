/**
 * Adon ERP public site: /apps/engineering-maintenance/calibration
 * Copy lives in messages/*.json under pages.accountingShowcase.emCalibrationPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { BadgeCheck, CalendarClock, Crosshair, FileBadge } from "lucide-react";

import { Card, Chip, HrPage, hrMetadata, type HrTone } from "../../human-resources/_hr";

/** DUMMY data: [instrument, code, days until due (negative is overdue), interval in days]. */
const instruments: [string, string, number, number][] = [
  ["Pressure gauge 0–250 bar", "PG-11", 2, 180],
  ["Digital caliper 150 mm", "DC-04", 41, 365],
  ["Thermocouple type K", "TC-07", -6, 180],
  ["Weighing scale 60 kg", "WS-02", 96, 365],
  ["Torque wrench 20–100 Nm", "TW-01", 18, 365],
];
/** Readings from the last calibration of PG-11: [reference bar, error bar]. Tolerance ±1.25 bar. */
const readings: [number, number][] = [
  [0, 0.1],
  [50, 0.4],
  [100, -0.3],
  [150, 0.8],
  [200, 1.1],
  [250, 0.6],
];
const tol = 1.25;

function due(days: number): { tone: HrTone; key: string } {
  if (days < 0) return { tone: "red", key: "overdue" };
  if (days <= 14) return { tone: "brown", key: "dueSoon" };
  return { tone: "teal", key: "ok" };
}

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("emCalibrationPage", "/apps/engineering-maintenance/calibration");
}

export default function CalibrationPage() {
  return (
    <HrPage
      section="emCalibrationPage"
      path="/apps/engineering-maintenance/calibration"
      prefix="cal"
      appName="Calibration"
      tool="emCalibration"
      group="maint"
      features={[
        "Every measuring instrument with its calibration interval",
        "Due and overdue instruments flagged before an audit",
        "Readings against reference, with the tolerance band",
        "The certificate from the lab attached to each calibration",
        "Instruments out of tolerance taken out of use",
      ]}
      stepTones={["purple", "teal", "red"]}
      connectStructure={[
        { key: "before", tools: ["emEquipment"] },
        { key: "after", tools: ["emWorkOrders", "emPm"] },
        { key: "shows", tools: ["emOverview"] },
      ]}
      icons={[Crosshair, CalendarClock, FileBadge, BadgeCheck]}
      render={(ui) => (
        <div className="grid gap-3 lg:grid-cols-12">
          <Card className="lg:col-span-6" title={ui.listTitle}>
            <ul className="divide-y divide-border">
              {instruments.map(([name, code, days, interval]) => {
                const d = due(days);
                const left = Math.max(0, days) / interval;
                return (
                  <li key={code} className="flex items-center gap-3 py-2">
                    <span
                      className="relative grid h-8 w-8 shrink-0 place-items-center rounded-full"
                      style={{ background: `conic-gradient(${days < 0 ? "var(--destructive)" : "var(--primary)"} ${days < 0 ? 100 : left * 100}%, var(--muted) 0)` }}
                      aria-hidden="true"
                    >
                      <span className="grid h-6 w-6 place-items-center rounded-full bg-card text-[8.5px] font-semibold tabular-nums text-foreground">{days}d</span>
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[11px] font-medium text-foreground">{name}</span>
                      <span className="block font-mono text-[9.5px] text-muted-foreground">{code}</span>
                    </span>
                    <Chip tone={d.tone}>{ui[d.key]}</Chip>
                  </li>
                );
              })}
            </ul>
          </Card>
          <Card className="lg:col-span-6" title={ui.readingsTitle} right={<Chip tone="teal">{ui.pass}</Chip>}>
            <div className="relative h-32 rounded-lg bg-[var(--gray-bg)]" aria-hidden="true">
              <span className="absolute inset-x-0 rounded bg-[var(--teal)]/15" style={{ top: "14%", bottom: "14%" }} />
              <span className="absolute inset-x-0 top-1/2 h-px bg-border" />
              {readings.map(([ref, err], i) => (
                <span
                  key={ref}
                  className={`absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-card ${Math.abs(err) > tol ? "bg-destructive" : "bg-primary"}`}
                  style={{ left: `${8 + (i / (readings.length - 1)) * 84}%`, top: `${50 - (err / tol) * 36}%` }}
                />
              ))}
              <span className="absolute end-2 top-1 text-[9px] text-[var(--teal)]">+{tol}</span>
              <span className="absolute bottom-1 end-2 text-[9px] text-[var(--teal)]">−{tol}</span>
            </div>
            <div className="mt-1 flex justify-between px-[6%] text-[9.5px] tabular-nums text-muted-foreground">
              {readings.map(([ref]) => (
                <span key={ref}>{ref}</span>
              ))}
            </div>
            <p className="mt-2 flex items-center justify-between text-[10.5px]">
              <span className="text-muted-foreground">{ui.cert}</span>
              <span className="font-mono text-foreground">CAL-26-0912</span>
            </p>
          </Card>
        </div>
      )}
    />
  );
}
