/**
 * Adon ERP public site: /apps/sales/crm/van-sales/van-sales
 * Copy lives in messages/*.json under pages.accountingShowcase.crVanSalesPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { Printer, ReceiptText, Smartphone, WifiOff } from "lucide-react";

import { Card, Chip, HrPage, hrMetadata } from "../../../../human-resources/_hr";

/** DUMMY data: [item, quantity, rate]. */
const lines: [string, number, number][] = [
  ["Carton 3-ply", 150, 30],
  ["Poly bag PE 26×44", 600, 8],
  ["Zipper bag 10×12", 600, 4],
];
const today: [string, string, string][] = [
  ["VS-0412-03", "Abdullahpur Box Store", "12,650"],
  ["VS-0412-02", "Uttara Sector 7 Poly House", "8,400"],
  ["VS-0412-01", "Tongi Station Road", "6,200"],
];

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("crVanSalesPage", "/apps/sales/crm/van-sales/van-sales");
}

export default function VanSalesPage() {
  const total = lines.reduce((a, l) => a + l[1] * l[2], 0);
  return (
    <HrPage
      section="crVanSalesPage"
      path="/apps/sales/crm/van-sales/van-sales"
      prefix="vsale"
      appName="Van Sales"
      tool="crVanSales"
      group="crVanG"
      features={[
        "A sale made at the outlet, on a phone, from the van's stock",
        "Prices and schemes applied the same as in the office",
        "Cash, mobile money or credit, taken on the spot",
        "A receipt printed on a pocket printer or sent by SMS",
        "Works without signal and syncs when it comes back",
      ]}
      stepTones={["purple", "teal", "muted"]}
      connectStructure={[
        { key: "before", tools: ["crVanStock", "crPricing"] },
        { key: "after", tools: ["crTrips", "receipts"] },
        { key: "shows", tools: ["crSecondary", "crDashboard"] },
      ]}
      icons={[Smartphone, ReceiptText, Printer, WifiOff]}
      render={(ui) => (
        <div className="grid items-center gap-4 md:grid-cols-[15rem_1fr]">
          <div className="mx-auto w-[15rem] rounded-[28px] border-[6px] border-foreground/85 bg-card p-3 shadow-xl">
            <div className="mx-auto mb-2 h-1.5 w-14 rounded-full bg-foreground/20" aria-hidden="true" />
            <p className="text-[10px] text-muted-foreground">VS-0412-04 · VAN-01</p>
            <p className="text-[12px] font-semibold text-foreground">Cherag Ali Market shop 4</p>
            <ul className="mt-2 divide-y divide-border text-[10.5px]">
              {lines.map(([item, q, r]) => (
                <li key={item} className="flex justify-between py-1.5">
                  <span className="text-foreground">
                    {item}
                    <span className="block text-[9.5px] text-muted-foreground">
                      {q} × {r}
                    </span>
                  </span>
                  <span className="tabular-nums text-foreground">{(q * r).toLocaleString("en-IN")}</span>
                </li>
              ))}
            </ul>
            <p className="mt-1 flex justify-between border-t border-border pt-1.5 text-[11.5px] font-semibold">
              <span className="text-foreground">{ui.total}</span>
              <span className="tabular-nums text-foreground">BDT {total.toLocaleString("en-IN")}</span>
            </p>
            <div className="mt-2 grid grid-cols-3 gap-1 text-center text-[9.5px]">
              {["pCash", "pMobile", "pCredit"].map((k, i) => (
                <span key={k} className={`rounded-md py-1 ${i === 1 ? "bg-primary font-semibold text-white" : "bg-[var(--gray-bg)] text-muted-foreground"}`}>
                  {ui[k]}
                </span>
              ))}
            </div>
            <span className="btn-gradient mt-2 block rounded-lg py-1.5 text-center text-[11px] font-medium">{ui.confirm}</span>
            <p className="mt-1.5 flex items-center justify-center gap-1 text-[9px] text-muted-foreground">
              <WifiOff className="h-2.5 w-2.5" aria-hidden="true" /> {ui.offline}
            </p>
          </div>
          <Card title={ui.todayTitle} right={<Chip tone="teal">27,250</Chip>}>
            <ul className="divide-y divide-border">
              {today.map(([no, outlet, amt]) => (
                <li key={no} className="flex items-center justify-between py-1.5 text-[11px]">
                  <span>
                    <span className="block font-mono text-[10px] text-muted-foreground">{no}</span>
                    <span className="block text-foreground">{outlet}</span>
                  </span>
                  <span className="tabular-nums text-foreground">{amt}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      )}
    />
  );
}
