/**
 * Adon ERP public site: /apps/inventory/weighbridge-scales
 * Copy lives in messages/*.json under pages.accountingShowcase.invWeighbridge.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { Scale, Truck, Gauge, ReceiptText } from "lucide-react";
import { ModulePage, moduleMetadata } from "../../_module";
import { Card, Chip } from "../../budget-management/_budget";


/** DUMMY data. Net weight is gross less tare. */
const gross = 28450;
const tare = 13200;
const net = gross - tare;
const ordered = 15000;
/** DUMMY data: [ticket, party, material, vehicle, net kg]. */
const tickets: [string, string, string, string, number][] = [
  ["WB-2026-0507", "Gulf Petrochem FZE", "PP granules", "Dhaka Metro-Ta-11-2345", 15250],
  ["WB-2026-0506", "Shapla Packaging", "Packing material", "Gazipur-Ta-12-9021", 6400],
  ["WB-2026-0505", "Padma Knitwear Ltd.", "Cartons, outward", "Dhaka Metro-Cha-14-7788", 4820],
  ["WB-2026-0504", "Bengal Plastics", "Masterbatch", "Narayanganj-Ta-11-3302", 3000],
];

export async function generateMetadata(): Promise<Metadata> {
  return moduleMetadata("invWeighbridge", "/apps/inventory/weighbridge-scales");
}

export default function WeighbridgeScalesPage() {
  return (
    <ModulePage
      section="invWeighbridge"
      path="/apps/inventory/weighbridge-scales"
      prefix="wb"
      appName="Weighbridge & Scales"
      tool="invWeighbridge"
      moduleKey="invModule"
      exploreKey="exploreInventory"
      exploreHref="/apps/inventory/inventory-summary"
      tabs={["invForecast", "invWarehouses", "invMovements", "invSummary", "invGatePasses", "invWeighbridge"]}
      features={[
        "Weighment tickets with gross, tare and net weight",
        "Net weight worked out at the weighbridge",
        "A comparison with the quantity on the purchase order, with a tolerance",
        "Vehicle, party and material on every ticket",
        "Weights passed to the goods receipt without retyping",
      ]}
      stepTones={["blue", "teal", "amber"]}
      connectStructure={[
        { key: "before", tools: ["invGatePasses", "purchaseOrders"] },
        { key: "after", tools: ["scGoodsReceipts", "invMovements"] },
        { key: "shows", tools: ["invSummary", "scOverview"] },
      ]}
      icons={[Scale, Truck, Gauge, ReceiptText]}
      render={(ui) => (
        <div className="grid gap-3 lg:grid-cols-12">
          <Card title={ui.live} className="lg:col-span-5" right={<Chip tone="teal">{ui.stable}</Chip>}>
            <p className="rounded-xl bg-foreground px-4 py-3 text-end font-mono text-[28px] font-semibold tabular-nums leading-none text-[var(--teal)]">
              {net.toLocaleString("en-IN")}<span className="ms-1 text-[12px] text-[var(--teal)]/70">kg</span>
            </p>
            <dl className="mt-3 grid grid-cols-3 gap-2 text-[11px]">
              <div>
                <dt className="text-muted-foreground">{ui.gross}</dt>
                <dd className="font-semibold tabular-nums text-foreground">{gross.toLocaleString("en-IN")}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">{ui.tare}</dt>
                <dd className="font-semibold tabular-nums text-foreground">{tare.toLocaleString("en-IN")}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">{ui.netLabel}</dt>
                <dd className="font-semibold tabular-nums text-[var(--teal)]">{net.toLocaleString("en-IN")}</dd>
              </div>
            </dl>
            <p className="mt-3 text-[10.5px] text-muted-foreground">
              {ui.ordered}: {ordered.toLocaleString("en-IN")} kg · {ui.difference}: <span className="font-semibold text-foreground">+{(net - ordered).toLocaleString("en-IN")} kg ({(((net - ordered) / ordered) * 100).toFixed(1)}%)</span> · {ui.tolerance}
            </p>
            <p className="mt-3 flex gap-1.5 text-[11px] font-medium">
              <span className="btn-gradient rounded-lg px-3 py-1">{ui.print}</span>
              <span className="rounded-lg border border-border px-3 py-1 text-foreground">{ui.toGrn}</span>
            </p>
          </Card>
          <Card title={ui.recent} className="lg:col-span-7">
            <ul className="divide-y divide-border text-[11px]">
              {tickets.map((t) => (
                <li key={t[0]} className="flex items-center gap-3 py-2">
                  <span className="font-mono text-[10px] font-semibold text-foreground">{t[0]}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-foreground">{t[1]}</span>
                    <span className="block truncate text-[10px] text-muted-foreground">{t[2]} · {t[3]}</span>
                  </span>
                  <span className="tabular-nums font-semibold text-foreground">{t[4].toLocaleString("en-IN")} kg</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      )}
    />
  );
}
