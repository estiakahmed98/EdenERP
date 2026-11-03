/**
 * Adon ERP public site: /apps/transport-pool/fuel-log
 * Copy lives in messages/*.json under pages.accountingShowcase.tpFuelPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { Droplets, Fuel, Gauge, Receipt } from "lucide-react";

import { Card, Chip, HrPage, hrMetadata } from "../../human-resources/_hr";

/** DUMMY data: [vehicle, km per litre for the last six fills, normal range low, high]. */
const efficiency: [string, number[], number, number][] = [
  ["VEH-001 · Tata LPT 709", [6.8, 7.1, 6.9, 7.0, 6.7, 6.9], 6.2, 7.6],
  ["VEH-003 · Toyota Dyna", [8.4, 8.2, 8.5, 8.3, 6.1, 5.8], 7.6, 9.0],
  ["VEH-005 · Toyota HiAce", [9.2, 9.4, 9.1, 9.5, 9.3, 9.2], 8.5, 10.0],
];
/** DUMMY data: [date, vehicle, litres, rate, odometer]. */
const fills: [string, string, number, number, number][] = [
  ["2 Nov", "VEH-003", 42, 114, 129707],
  ["1 Nov", "VEH-001", 55, 114, 61148],
  ["30 Oct", "VEH-005", 38, 114, 114521],
];

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("tpFuelPage", "/apps/transport-pool/fuel-log");
}

export default function FuelLogPage() {
  return (
    <HrPage
      section="tpFuelPage"
      path="/apps/transport-pool/fuel-log"
      prefix="fuel"
      appName="Fuel Log"
      tool="tpFuel"
      group="tp"
      features={[
        "Every fill with litres, rate, amount and odometer",
        "Kilometres per litre worked out from one fill to the next",
        "Vehicles using more fuel than normal flagged",
        "Fuel cost this month, by vehicle and by department",
        "Fuel posted to the vehicle's cost in the books",
      ]}
      stepTones={["purple", "teal", "red"]}
      connectStructure={[
        { key: "before", tools: ["tpVehicles", "tpTrips"] },
        { key: "after", tools: ["pettyCash", "journalEntries"] },
        { key: "shows", tools: ["tpHub", "anExec"] },
      ]}
      icons={[Fuel, Gauge, Droplets, Receipt]}
      render={(ui) => (
        <div className="grid gap-3 lg:grid-cols-12">
          <Card className="lg:col-span-7" title={ui.effTitle} right={<Chip tone="red">{ui.flagged}</Chip>}>
            <ul className="space-y-3">
              {efficiency.map(([veh, vals, lo, hi]) => {
                const max = 11;
                const last = vals[vals.length - 1];
                const bad = last < lo;
                return (
                  <li key={veh}>
                    <p className="flex items-center justify-between text-[11px]">
                      <span className="font-medium text-foreground">{veh}</span>
                      <span className={`tabular-nums ${bad ? "font-semibold text-destructive" : "text-muted-foreground"}`}>
                        {last} km/L
                      </span>
                    </p>
                    <div className="relative mt-1 flex h-10 items-end gap-1.5 rounded-md bg-[var(--gray-bg)] px-1.5" aria-hidden="true">
                      <span className="absolute inset-x-0 bg-[var(--teal)]/15" style={{ bottom: `${(lo / max) * 100}%`, height: `${((hi - lo) / max) * 100}%` }} />
                      {vals.map((v, i) => (
                        <span key={i} className={`relative flex-1 rounded-t ${v < lo ? "bg-destructive" : "bg-primary/70"}`} style={{ height: `${(v / max) * 100}%` }} />
                      ))}
                    </div>
                  </li>
                );
              })}
            </ul>
            <p className="mt-2 text-[10px] text-muted-foreground">{ui.effNote}</p>
          </Card>
          <Card className="lg:col-span-5" title={ui.fillsTitle}>
            <ul className="divide-y divide-border">
              {fills.map(([d, veh, l, r, odo]) => (
                <li key={d + veh} className="py-2 text-[11px]">
                  <p className="flex justify-between">
                    <span className="font-mono font-semibold text-foreground">{veh}</span>
                    <span className="tabular-nums text-foreground">BDT {(l * r).toLocaleString("en-IN")}</span>
                  </p>
                  <p className="flex justify-between text-[10px] text-muted-foreground">
                    <span>
                      {d} · {l} L × {r}
                    </span>
                    <span className="tabular-nums">{odo.toLocaleString("en-IN")} km</span>
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-2 flex justify-between border-t border-border pt-2 text-[11px] font-semibold">
              <span className="text-foreground">{ui.mtd}</span>
              <span className="tabular-nums text-foreground">BDT 38,190</span>
            </p>
          </Card>
        </div>
      )}
    />
  );
}
