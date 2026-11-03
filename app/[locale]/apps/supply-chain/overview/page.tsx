/**
 * Adon ERP public site: /apps/supply-chain/overview
 * Copy lives in messages/*.json under pages.accountingShowcase.scOverview.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { Workflow, Truck, PackageCheck, Warehouse } from "lucide-react";
import { SupplyPage, supplyMetadata } from "../_supply";
import { Card, Tile, Donut, Avatar, Chip, donutColors } from "../../budget-management/_budget";

/** DUMMY data: [label key, sub key, count, accent]. */
const stages: [string, string, string, string][] = [
  ["sReq", "sReqSub", "6", "primary"],
  ["sCmp", "sCmpSub", "3", "sky"],
  ["sTnd", "sTndSub", "2", "amber"],
  ["sGrn", "sGrnSub", "4", "teal"],
  ["sLc", "sLcSub", "1", "primary"],
];
/** DUMMY data: [document, detail, chip key, person, avatar tone, chip tone]. */
const attention: [string, string, string, string, number, string][] = [
  ["PR-2026-0044 · Hydraulic press spares", "Maintenance · needed by 11/18/2026", "needsApproval", "R. Hasan", 0, "amber"],
  ["TND-2026-008 · Raw material, 12 months", "2 bids so far · closes 11/12/2026", "closingSoon", "T. Mia", 1, "red"],
  ["GRN-2026-0031 · Gulf Petrochem FZE", "Black masterbatch 600 kg short", "shortReceived", "N. Khan", 2, "blue"],
  ["Shipment SHP-014 · PP granules", "Freight and duty not yet spread over items", "notAllocated", "S. Akter", 3, "purple"],
];
const suppliers: [string, number][] = [
  ["Gulf Petrochem FZE", 38],
  ["Bengal Plastics", 27],
  ["Shapla Packaging", 20],
  ["Others", 15],
];

export async function generateMetadata(): Promise<Metadata> {
  return supplyMetadata("scOverview", "/apps/supply-chain/overview");
}

export default function SupplyChainOverviewPage() {
  return (
    <SupplyPage
      section="scOverview"
      path="/apps/supply-chain/overview"
      prefix="so"
      appName="Overview"
      tool="scOverview"
      features={[
        "One view of requisitions, comparisons, tenders, receipts and landed cost",
        "Counts for each step of the buying process, with what is waiting on someone",
        "A list of the documents that need attention today",
        "Spend by supplier for the quarter",
        "Every step linked to the accounts, the stock and the reports",
      ]}
      stepTones={["blue", "teal", "amber"]}
      connectStructure={[
        { key: "before", tools: ["itemsProducts", "vendors"] },
        { key: "after", tools: ["scRequisitions", "scComparative", "scTender", "scGoodsReceipts", "scLandedCost"] },
        { key: "shows", tools: ["billsAp", "financialReports", "accountingHub"] },
      ]}
      icons={[Workflow, Truck, PackageCheck, Warehouse]}
      render={(ui) => (
        <>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-5">
            {stages.map(([label, sub, value, accent]) => (
              <Tile key={label} label={ui[label]} value={value} sub={ui[sub]} accent={accent as "primary" | "teal" | "amber" | "sky"} />
            ))}
          </div>
          <div className="grid gap-3 lg:grid-cols-12">
            <Card title={ui.attention} className="lg:col-span-7">
              <ul className="divide-y divide-border">
                {attention.map((a) => (
                  <li key={a[0]} className="flex items-center gap-2.5 py-2 text-[11px]">
                    <Avatar name={a[3]} tone={a[4]} />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-medium text-foreground">{a[0]}</span>
                      <span className="block truncate text-muted-foreground">{a[1]}</span>
                    </span>
                    <Chip tone={a[5] as "amber" | "red" | "blue" | "purple"}>{ui[a[2]]}</Chip>
                  </li>
                ))}
              </ul>
            </Card>
            <Card title={ui.spend} className="lg:col-span-5">
              <Donut values={suppliers.map((s) => s[1] as number)} centre="1.2 Cr" caption={ui.quarter} />
              <ul className="mt-3 space-y-1 text-[10.5px]">
                {suppliers.map((s, i) => (
                  <li key={s[0]} className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-foreground">
                      <span className="h-2 w-2 rounded-full" style={{ background: donutColors[i] }} />
                      {s[0]}
                    </span>
                    <span className="tabular-nums text-muted-foreground">{s[1]}%</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </>
      )}
    />
  );
}
