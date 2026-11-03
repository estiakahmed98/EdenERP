/**
 * Adon ERP public site: /apps/inventory/gate-passes
 * Copy lives in messages/*.json under pages.accountingShowcase.invGatePasses.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { DoorOpen, Truck, ClipboardCheck, Clock } from "lucide-react";
import { ModulePage, moduleMetadata } from "../../_module";
import { Card, Chip } from "../../budget-management/_budget";
import { Field } from "../../supply-chain/_supply";

const tone: Record<string, "teal" | "amber" | "red" | "blue" | "purple" | "muted"> = { onSite: "blue", exited: "teal", pending: "amber" };

/** DUMMY data: [number, direction, vehicle, party, purpose, times, status key]. */
const passes: [string, string, string, string, string, string, string][] = [
  ["GP-IN-0231", "in", "Dhaka Metro-Ta-11-2345", "Gulf Petrochem FZE", "PP granules, 15 t", "in 09:40", "onSite"],
  ["GP-OUT-0118", "out", "Dhaka Metro-Cha-14-7788", "Padma Knitwear Ltd.", "Cartons, delivery", "out 10:15", "exited"],
  ["GP-IN-0230", "in", "Gazipur-Ta-12-9021", "Shapla Packaging", "Packing material", "in 08:55", "exited"],
  ["GP-OUT-0119", "out", "Dhaka Metro-Ta-13-4410", "Jamuna Apparel", "Delivery, 6 pallets", "pending", "pending"],
];

export async function generateMetadata(): Promise<Metadata> {
  return moduleMetadata("invGatePasses", "/apps/inventory/gate-passes");
}

export default function GatePassesPage() {
  return (
    <ModulePage
      section="invGatePasses"
      path="/apps/inventory/gate-passes"
      prefix="gp"
      appName="Gate Passes"
      tool="invGatePasses"
      moduleKey="invModule"
      exploreKey="exploreInventory"
      exploreHref="/apps/inventory/inventory-summary"
      tabs={["invForecast", "invWarehouses", "invMovements", "invSummary", "invGatePasses", "invWeighbridge"]}
      features={[
        "Inward and outward gate passes with a number",
        "Vehicle number, driver and party on every pass",
        "On site, exited and pending approval statuses",
        "Time in and time out for each vehicle",
        "Gate passes linked to receipts and deliveries",
      ]}
      stepTones={["amber", "blue", "teal"]}
      connectStructure={[
        { key: "before", tools: ["scGoodsReceipts", "deliveryChallans"] },
        { key: "after", tools: ["invWeighbridge", "invMovements"] },
        { key: "shows", tools: ["invWarehouses", "scOverview"] },
      ]}
      icons={[DoorOpen, Truck, ClipboardCheck, Clock]}
      render={(ui) => (
        <div className="grid gap-3 lg:grid-cols-12">
          <Card className="lg:col-span-8">
            <ul className="divide-y divide-border">
              {passes.map((p) => (
                <li key={p[0]} className="flex items-center gap-3 py-2 text-[11px]">
                  <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg text-[12px] ${p[1] === "in" ? "bg-[var(--teal)]/15 text-[var(--teal)]" : "bg-sky-500/15 text-sky-600 dark:text-sky-400"}`} aria-hidden="true">
                    {p[1] === "in" ? "↓" : "↑"}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2">
                      <span className="font-mono text-[10px] font-semibold text-foreground">{p[0]}</span>
                      <span className="truncate text-muted-foreground">{p[2]}</span>
                    </span>
                    <span className="block truncate text-foreground">{p[3]} · {p[4]}</span>
                  </span>
                  <span className="hidden text-end text-[10px] tabular-nums text-muted-foreground sm:block">{p[5]}</span>
                  <Chip tone={tone[p[6]]}>{ui[p[6]]}</Chip>
                </li>
              ))}
            </ul>
          </Card>
          <Card title={ui.newTitle} className="lg:col-span-4">
            <div className="space-y-2.5">
              <Field label={ui.fType} value={ui.inward} select />
              <Field label={ui.fVehicle} value="Dhaka Metro-Ta-11-2345" />
              <Field label={ui.fDriver} />
              <Field label={ui.fParty} select />
              <Field label={ui.fPurpose} area />
            </div>
          </Card>
        </div>
      )}
    />
  );
}
