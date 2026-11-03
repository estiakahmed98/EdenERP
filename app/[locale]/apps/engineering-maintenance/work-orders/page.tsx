/**
 * Adon ERP public site: /apps/engineering-maintenance/work-orders
 * Copy lives in messages/*.json under pages.accountingShowcase.emWorkOrdersPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { Check, ClipboardCheck, Hammer, PackageSearch, UserCog } from "lucide-react";

import { Avatar, Card, Chip, HrPage, bdt, hrMetadata } from "../../human-resources/_hr";

const stages: [string, number][] = [
  ["stOpen", 5],
  ["stProgress", 6],
  ["stParts", 3],
  ["stDone", 41],
];
const tasks: [string, boolean][] = [
  ["Isolate power and lock out", true],
  ["Drain hydraulic oil", true],
  ["Replace main pump seal kit", true],
  ["Refill and bleed the system", false],
  ["Test run 30 minutes at full pressure", false],
];
/** DUMMY data: [part, quantity, cost in taka]. */
const parts: [string, string, number][] = [
  ["Pump seal kit SK-250", "1", 18400],
  ["Hydraulic oil ISO VG 46", "60 L", 21000],
];

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("emWorkOrdersPage", "/apps/engineering-maintenance/work-orders");
}

export default function WorkOrdersPage() {
  return (
    <HrPage
      section="emWorkOrdersPage"
      path="/apps/engineering-maintenance/work-orders"
      prefix="wo"
      appName="Work Orders"
      tool="emWorkOrders"
      group="maint"
      features={[
        "Breakdown, preventive and improvement work orders",
        "A checklist, the technician and the hours on each job",
        "Spare parts issued against the work order",
        "Downtime from the first report to the machine running again",
        "Labour and parts cost on every job",
      ]}
      stepTones={["red", "purple", "teal"]}
      connectStructure={[
        { key: "before", tools: ["emEquipment", "emPm"] },
        { key: "after", tools: ["emSpares", "emDowntime"] },
        { key: "shows", tools: ["emOverview", "journalEntries"] },
      ]}
      icons={[Hammer, UserCog, PackageSearch, ClipboardCheck]}
      render={(ui) => (
        <>
          <div className="grid grid-cols-4 gap-2">
            {stages.map(([k, n], i) => (
              <div key={k} className={`rounded-xl px-3 py-2 ${i === 1 ? "bg-primary text-white" : "border border-border bg-card"}`}>
                <p className={`text-[10px] ${i === 1 ? "text-white/80" : "text-muted-foreground"}`}>{ui[k]}</p>
                <p className="text-[16px] font-semibold tabular-nums">{n}</p>
              </div>
            ))}
          </div>
          <Card>
            <div className="flex flex-wrap items-start justify-between gap-2 border-b border-dashed border-border pb-3">
              <div>
                <p className="font-mono text-[10px] text-muted-foreground">WO-2026-0418 · {ui.breakdown}</p>
                <p className="text-[13px] font-semibold text-foreground">{ui.woTitle}</p>
                <p className="text-[10.5px] text-muted-foreground">Injection moulder IM-04 · {ui.reported}</p>
              </div>
              <div className="flex items-center gap-2">
                <Chip tone="red">{ui.priority}</Chip>
                <span className="flex items-center gap-1.5 text-[10.5px] text-foreground">
                  <Avatar name="Kamal Uddin" size={22} tone={3} /> Kamal Uddin
                </span>
              </div>
            </div>
            <div className="mt-3 grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">{ui.checklist} · 3/5</p>
                <ul className="mt-1.5 space-y-1.5">
                  {tasks.map(([t, done]) => (
                    <li key={t} className="flex items-center gap-2 text-[11px]">
                      <span className={`grid h-4 w-4 shrink-0 place-items-center rounded ${done ? "bg-[var(--teal)] text-white" : "border border-border"}`} aria-hidden="true">
                        {done && <Check className="h-3 w-3" />}
                      </span>
                      <span className={done ? "text-muted-foreground line-through" : "text-foreground"}>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">{ui.partsUsed}</p>
                <ul className="mt-1.5 divide-y divide-border rounded-lg border border-border text-[11px]">
                  {parts.map(([p, q, c]) => (
                    <li key={p} className="flex justify-between gap-2 px-2.5 py-1.5">
                      <span className="truncate text-foreground">{p}</span>
                      <span className="shrink-0 tabular-nums text-muted-foreground">
                        {q} · {c.toLocaleString("en-IN")}
                      </span>
                    </li>
                  ))}
                </ul>
                <dl className="mt-2 space-y-1 text-[11px]">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">{ui.labour}</dt>
                    <dd className="tabular-nums text-foreground">5.5 h · 2,750</dd>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <dt className="text-foreground">{ui.cost}</dt>
                    <dd className="tabular-nums text-foreground">{bdt(18400 + 21000 + 2750)}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </Card>
        </>
      )}
    />
  );
}
