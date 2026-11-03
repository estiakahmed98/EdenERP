/**
 * Adon ERP public site: /apps/trade-finance/export-shipments
 * Copy lives in messages/*.json under pages.accountingShowcase.tfShipmentsPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { Anchor, Boxes, FileText, Truck } from "lucide-react";

import { Card, Chip, HrPage, hrMetadata } from "../../human-resources/_hr";

const steps = ["sPacking", "sInvoice", "sExFactory", "sOnBoard", "sArrived", "sDelivered"];
const current = 3;
/** DUMMY data: [style, colour, cartons, pieces]. */
const lines: [string, string, number, number][] = [
  ["Polo shirt PS-118", "Navy", 220, 5280],
  ["Polo shirt PS-118", "White", 180, 4320],
  ["Crew tee CT-204", "Heather grey", 140, 4200],
];

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("tfShipmentsPage", "/apps/trade-finance/export-shipments");
}

export default function ExportShipmentsPage() {
  return (
    <HrPage
      section="tfShipmentsPage"
      path="/apps/trade-finance/export-shipments"
      prefix="shp"
      appName="Export Shipments"
      tool="tfShipments"
      group="tf"
      features={[
        "A shipment booked from an order's open lines",
        "Packing list and commercial invoice from the same record",
        "Revenue at ex-factory, then on board, arrived and delivered",
        "Mode, cartons, container, B/L or AWB and ETD on one page",
        "Every export document printed from one source",
      ]}
      stepTones={["muted", "purple", "teal"]}
      connectStructure={[
        { key: "before", tools: ["tfContracts", "tfLc"] },
        { key: "after", tools: ["invoicesAr", "tfPapers"] },
        { key: "shows", tools: ["tfTt", "financialReports"] },
      ]}
      icons={[Boxes, FileText, Truck, Anchor]}
      render={(ui) => (
        <>
          <ol className="grid grid-cols-6 gap-1" aria-hidden="true">
            {steps.map((s, i) => (
              <li key={s} className="text-center">
                <span className={`block h-1.5 rounded-full ${i <= current ? "bg-primary" : "bg-muted"}`} />
                <span className={`mt-1 block truncate text-[9.5px] ${i === current ? "font-semibold text-primary" : i < current ? "text-foreground" : "text-muted-foreground"}`}>{ui[s]}</span>
              </li>
            ))}
          </ol>
          <div className="grid gap-3 lg:grid-cols-12">
            <Card className="lg:col-span-5">
              <p className="font-mono text-[10.5px] text-muted-foreground">EXS-2026-0047</p>
              <p className="text-[13px] font-semibold text-foreground">Jubair Knitwear · PO-679183</p>
              <dl className="mt-3 grid grid-cols-2 gap-2 text-[10.5px]">
                {[
                  [ui.mode, ui.sea],
                  [ui.container, "1 × 40' HC"],
                  ["B/L", "MSCU-DAC-77812"],
                  ["ETD", "4 Nov 2026"],
                  [ui.port, "Chattogram → Hamburg"],
                  [ui.value, "USD 14,850"],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-lg bg-[var(--gray-bg)] px-2.5 py-1.5">
                    <dt className="text-[9.5px] text-muted-foreground">{k}</dt>
                    <dd className="font-medium text-foreground">{v}</dd>
                  </div>
                ))}
              </dl>
            </Card>
            <Card className="lg:col-span-7" title={ui.packing} right={<Chip tone="teal">{ui.docsReady}</Chip>}>
              <table className="w-full text-[11px]">
                <thead className="text-[9.5px] uppercase tracking-wide text-muted-foreground">
                  <tr className="border-b border-border">
                    <th className="py-1 text-start">{ui.thStyle}</th>
                    <th className="py-1 text-start">{ui.thColour}</th>
                    <th className="py-1 text-end">{ui.thCartons}</th>
                    <th className="py-1 text-end">{ui.thPcs}</th>
                  </tr>
                </thead>
                <tbody>
                  {lines.map(([s, c, ctn, pcs]) => (
                    <tr key={s + c} className="border-b border-border/60">
                      <td className="py-1.5 text-foreground">{s}</td>
                      <td className="py-1.5 text-muted-foreground">{c}</td>
                      <td className="py-1.5 text-end tabular-nums text-foreground">{ctn}</td>
                      <td className="py-1.5 text-end tabular-nums text-foreground">{pcs.toLocaleString("en-US")}</td>
                    </tr>
                  ))}
                  <tr className="font-semibold">
                    <td colSpan={2} className="py-1.5 text-foreground">{ui.total}</td>
                    <td className="py-1.5 text-end tabular-nums text-foreground">540</td>
                    <td className="py-1.5 text-end tabular-nums text-foreground">13,800</td>
                  </tr>
                </tbody>
              </table>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {["dPl", "dCi", "dBl", "dCoo"].map((d) => (
                  <span key={d} className="rounded-md border border-border px-2 py-0.5 text-[10px] text-foreground">
                    {ui[d]}
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
