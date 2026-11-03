/**
 * Adon ERP public site: /apps/employee-portal/my-leaves
 * Copy lives in messages/*.json under pages.accountingShowcase.epLeavesPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { CalendarClock, CalendarPlus, Hourglass, Smartphone } from "lucide-react";

import { Card, Chip, Field, HrPage, hrMetadata, type HrTone } from "../../human-resources/_hr";

/** DUMMY data: [type key, used, entitled, colour]. */
const balances: [string, number, number, string][] = [
  ["casual", 4, 10, "var(--primary)"],
  ["sick", 2, 14, "var(--teal)"],
  ["earned", 6, 17, "var(--chart-5)"],
];
const history: [string, string, number, string, HrTone][] = [
  ["casual", "5 Nov", 1, "stApproved", "teal"],
  ["earned", "18–22 Nov", 5, "stPending", "brown"],
  ["sick", "2–3 Sep", 2, "stApproved", "teal"],
];

function Gauge({ used, total, color, label }: { used: number; total: number; color: string; label: string }) {
  const left = total - used;
  return (
    <div className="flex flex-col items-center">
      <div className="relative h-20 w-20" aria-hidden="true">
        <div className="h-full w-full rounded-full" style={{ background: `conic-gradient(${color} ${(left / total) * 100}%, var(--muted) 0)` }} />
        <div className="absolute inset-[9px] flex flex-col items-center justify-center rounded-full bg-card">
          <span className="text-[16px] font-semibold leading-none tabular-nums text-foreground">{left}</span>
          <span className="text-[9px] text-muted-foreground">/ {total}</span>
        </div>
      </div>
      <p className="mt-1.5 text-[11px] font-medium text-foreground">{label}</p>
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("epLeavesPage", "/apps/employee-portal/my-leaves");
}

export default function MyLeavesPage() {
  return (
    <HrPage
      section="epLeavesPage"
      path="/apps/employee-portal/my-leaves"
      prefix="myl"
      appName="My Leaves"
      tool="epLeaves"
      group="portal"
      features={[
        "Leave balance for every type, at a glance",
        "Apply from a phone in under a minute",
        "Holidays and weekly days off left out of the count",
        "Status of each request as it moves",
        "A notice when it is approved or returned",
      ]}
      stepTones={["purple", "teal", "muted"]}
      connectStructure={[
        { key: "before", tools: ["hrLeaveTypes", "hrHolidays"] },
        { key: "after", tools: ["hrLeaveApps", "hrApprovals"] },
        { key: "shows", tools: ["epAttendance", "epPayslips"] },
      ]}
      icons={[Hourglass, Smartphone, CalendarPlus, CalendarClock]}
      render={(ui) => (
        <div className="grid gap-3 lg:grid-cols-12">
          <div className="space-y-3 lg:col-span-7">
            <Card title={ui.balance}>
              <div className="grid grid-cols-3 gap-2">
                {balances.map(([k, used, total, color]) => (
                  <Gauge key={k} used={used} total={total} color={color} label={ui[k]} />
                ))}
              </div>
            </Card>
            <Card title={ui.history}>
              <ul className="divide-y divide-border">
                {history.map(([k, dates, days, st, tone]) => (
                  <li key={dates} className="flex items-center justify-between py-1.5 text-[11px]">
                    <span className="text-foreground">{ui[k]}</span>
                    <span className="tabular-nums text-muted-foreground">
                      {dates} · {days} {ui.days}
                    </span>
                    <Chip tone={tone}>{ui[st]}</Chip>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
          <Card className="lg:col-span-5" title={ui.applyTitle}>
            <div className="space-y-2.5">
              <Field label={ui.fType} value={ui.casual} select />
              <div className="grid grid-cols-2 gap-2">
                <Field label={ui.fFrom} value="10 Nov 2026" />
                <Field label={ui.fTo} value="11 Nov 2026" />
              </div>
              <Field label={ui.fReason} value={ui.reasonValue} />
              <p className="rounded-lg bg-primary/10 px-2.5 py-1.5 text-[10.5px] text-primary">{ui.afterNote}</p>
              <span className="btn-gradient block rounded-md px-3 py-1.5 text-center text-[11px] font-medium">{ui.send}</span>
            </div>
          </Card>
        </div>
      )}
    />
  );
}
