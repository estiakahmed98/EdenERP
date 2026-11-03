/**
 * Adon ERP public site: /apps/sales/crm/van-sales/van-stock
 * Copy lives in messages/*.json under pages.accountingShowcase.crVanStockPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { Boxes, ClipboardCheck, PackageOpen, Scale } from "lucide-react";

import { Card, Chip, HrPage, hrMetadata } from "../../../../human-resources/_hr";

/** DUMMY data: [item, loaded, sold, counted back]. Expected back is loaded less sold; poly bags are 10 short. */
const rows: [string, number, number, number][] = [
  ["Carton 3-ply", 800, 610, 190],
  ["Carton 5-ply", 200, 145, 55],
  ["Poly bag PE 26×44", 3000, 2350, 640],
  ["Zipper bag 10×12", 1500, 980, 520],
];

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("crVanStockPage", "/apps/sales/crm/van-sales/van-stock");
}

export default function VanStockPage() {
  return (
    <HrPage
      section="crVanStockPage"
      path="/apps/sales/crm/van-sales/van-stock"
      prefix="vstk"
      appName="Van Stock"
      tool="crVanStock"
      group="crVanG"
      features={[
        "Stock loaded on each van, as its own small warehouse",
        "Sold, returned and counted back, item by item",
        "Shortages found the same evening, not at month end",
        "Cash handed over checked against the day's sales",
        "Unsold stock moved back to the depot in one step",
      ]}
      stepTones={["purple", "teal", "red"]}
      connectStructure={[
        { key: "before", tools: ["crVans", "invWarehouses"] },
        { key: "after", tools: ["invMovements", "receipts"] },
        { key: "shows", tools: ["crTrips", "invSummary"] },
      ]}
      icons={[PackageOpen, Boxes, Scale, ClipboardCheck]}
      render={(ui) => (
        <div className="grid gap-3 lg:grid-cols-12">
          <Card className="lg:col-span-8" title={ui.recon} right={<Chip tone="muted">VAN-01 · 2 Nov</Chip>}>
            <table className="w-full text-[11px]">
              <thead className="text-[9.5px] font-semibold uppercase tracking-wide text-muted-foreground">
                <tr className="border-b border-border">
                  <th className="pb-1.5 text-start">{ui.thItem}</th>
                  <th className="pb-1.5 text-end">{ui.thLoaded}</th>
                  <th className="pb-1.5 text-end">{ui.thSold}</th>
                  <th className="pb-1.5 text-end">{ui.thExpected}</th>
                  <th className="pb-1.5 text-end">{ui.thCounted}</th>
                  <th className="pb-1.5 text-end">{ui.thDiff}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(([item, loaded, sold, counted]) => {
                  const expected = loaded - sold;
                  const diff = counted - expected;
                  return (
                    <tr key={item} className="border-b border-border/60">
                      <td className="py-1.5 text-foreground">{item}</td>
                      <td className="py-1.5 text-end tabular-nums text-muted-foreground">{loaded.toLocaleString("en-IN")}</td>
                      <td className="py-1.5 text-end tabular-nums text-muted-foreground">{sold.toLocaleString("en-IN")}</td>
                      <td className="py-1.5 text-end tabular-nums text-foreground">{expected.toLocaleString("en-IN")}</td>
                      <td className="py-1.5 text-end tabular-nums text-foreground">{counted.toLocaleString("en-IN")}</td>
                      <td className="py-1.5 text-end">
                        <Chip tone={diff === 0 ? "teal" : "red"}>{diff === 0 ? "0" : diff}</Chip>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
          <Card className="lg:col-span-4" title={ui.cashTitle}>
            <dl className="space-y-1.5 text-[11px]">
              {[
                [ui.cashSales, "31,400"],
                [ui.mobile, "4,800"],
                [ui.handed, "26,600"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="tabular-nums text-foreground">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-2.5 rounded-lg bg-destructive/10 px-2.5 py-1.5 text-[10.5px] text-destructive">{ui.shortNote}</p>
          </Card>
        </div>
      )}
    />
  );
}
