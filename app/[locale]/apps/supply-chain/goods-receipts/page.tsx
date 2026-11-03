/**
 * Adon ERP public site: /apps/supply-chain/goods-receipts
 * Copy lives in messages/*.json under pages.accountingShowcase.scGoodsReceipts.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { PackageCheck, Truck, ShieldCheck, ReceiptText } from "lucide-react";
import { SupplyPage, supplyMetadata } from "../_supply";
import { Card, Bullet, Chip } from "../../budget-management/_budget";

const grnTone: Record<string, "amber" | "teal" | "red"> = { partial: "amber", complete: "teal", qcHold: "red" };

/** DUMMY data: [number, supplier, purchase order, date, status key]. */
const grns: [string, string, string, string, string][] = [
  ["GRN-2026-0031", "Gulf Petrochem FZE", "PO-2026-000013", "11/03/2026", "partial"],
  ["GRN-2026-0030", "Shapla Packaging", "PO-2026-000011", "10/29/2026", "complete"],
  ["GRN-2026-0029", "Meghna Inks Ltd", "PO-2026-000009", "10/22/2026", "complete"],
  ["GRN-2026-0028", "Bengal Plastics", "PO-2026-000008", "10/15/2026", "qcHold"],
];
/** DUMMY data: [item, ordered kg, received kg, accepted kg]. */
const lines: [string, number, number, number][] = [
  ["PP granules", 15000, 15000, 14850],
  ["White masterbatch", 2000, 2000, 2000],
  ["Black masterbatch", 3000, 2400, 2400],
];

export async function generateMetadata(): Promise<Metadata> {
  return supplyMetadata("scGoodsReceipts", "/apps/supply-chain/goods-receipts");
}

export default function GoodsReceiptsPage() {
  return (
    <SupplyPage
      section="scGoodsReceipts"
      path="/apps/supply-chain/goods-receipts"
      prefix="gr"
      appName="Goods Receipts"
      tool="scGoodsReceipts"
      features={[
        "Goods receipt notes (GRNs) against purchase orders",
        "Ordered, received and accepted quantity for every line",
        "Partial, complete and quality-hold statuses",
        "Rejected quantity recorded at the gate",
        "Stock updated and the bill matched to what actually arrived",
      ]}
      stepTones={["amber", "teal", "red"]}
      connectStructure={[
        { key: "before", tools: ["purchaseOrders", "scTender", "vendors"] },
        { key: "after", tools: ["billsAp", "scLandedCost"] },
        { key: "shows", tools: ["scOverview", "itemsProducts", "financialReports"] },
      ]}
      icons={[PackageCheck, Truck, ShieldCheck, ReceiptText]}
      render={(ui) => (
        <div className="grid gap-3 lg:grid-cols-12">
          <Card className="lg:col-span-5">
            <ul className="divide-y divide-border">
              {grns.map((g) => (
                <li key={g[0]} className="py-2 text-[11px]">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[10px] font-semibold text-foreground">{g[0]}</span>
                    <Chip tone={grnTone[g[4]]}>{ui[g[4]]}</Chip>
                  </div>
                  <p className="mt-0.5 truncate font-medium text-foreground">{g[1]}</p>
                  <p className="text-[10px] text-muted-foreground">{g[2]} · {g[3]}</p>
                </li>
              ))}
            </ul>
          </Card>
          <Card title="GRN-2026-0031" className="lg:col-span-7" right={<Chip tone="amber">{ui.partial}</Chip>}>
            <ul className="space-y-3">
              {lines.map((l) => (
                <li key={l[0]} className="text-[11px]">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-medium text-foreground">{l[0]}</span>
                    <span className="tabular-nums text-muted-foreground">
                      {l[2].toLocaleString("en-IN")} / {l[1].toLocaleString("en-IN")} kg
                    </span>
                  </div>
                  <span className="mt-1 block"><Bullet pct={(l[2] / l[1]) * 100} marker={100} /></span>
                  <p className="mt-0.5 flex justify-between text-[10px]">
                    <span className="text-muted-foreground">{ui.accepted} {l[3].toLocaleString("en-IN")} kg</span>
                    {l[1] - l[2] > 0 && <span className="text-amber-600 dark:text-amber-400">{(l[1] - l[2]).toLocaleString("en-IN")} kg {ui.short}</span>}
                    {l[2] - l[3] > 0 && <span className="text-destructive">{(l[2] - l[3]).toLocaleString("en-IN")} kg {ui.rejected}</span>}
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-3 flex flex-wrap gap-1.5 border-t border-border pt-2.5 text-[11px] font-medium">
              <span className="btn-gradient rounded-lg px-3 py-1">{ui.confirm}</span>
              <span className="rounded-lg border border-border px-3 py-1 text-foreground">{ui.qcHoldBtn}</span>
            </p>
          </Card>
        </div>
      )}
    />
  );
}
