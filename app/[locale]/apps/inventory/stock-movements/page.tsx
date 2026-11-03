/**
 * Adon ERP public site: /apps/inventory/stock-movements
 * Copy lives in messages/*.json under pages.accountingShowcase.invMovements.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { ArrowLeftRight, PackageCheck, ClipboardCheck, History } from "lucide-react";
import { ModulePage, moduleMetadata } from "../../_module";
import { Card, Chip } from "../../budget-management/_budget";


const tone: Record<string, "teal" | "amber" | "red" | "blue" | "purple" | "muted"> = { receipt: "teal", issue: "amber", transfer: "blue", adjustment: "purple" };

/** DUMMY data: [date, reference, type key, item, warehouse, quantity, balance]. */
const moves: [string, string, string, string, string, number, number][] = [
  ["11/03/2026", "GRN-2026-0031", "receipt", "PP granules", "Gazipur Main", 14850, 38850],
  ["11/03/2026", "GRN-2026-0031", "receipt", "White masterbatch", "Gazipur Main", 2000, 4100],
  ["11/02/2026", "ISS-0412", "issue", "PP granules", "Gazipur Main", -2400, 24000],
  ["11/02/2026", "TRF-0087", "transfer", "Carton box 5-ply", "Narayanganj → Gazipur", 1500, 8200],
  ["11/01/2026", "ADJ-0019", "adjustment", "Flexo ink cyan", "Gazipur Main", -5, 310],
  ["10/31/2026", "ISS-0409", "issue", "Black masterbatch", "Gazipur Main", -300, 1200],
  ["10/30/2026", "GRN-2026-0030", "receipt", "Carton box 5-ply", "Narayanganj Depot", 6000, 6700],
];

export async function generateMetadata(): Promise<Metadata> {
  return moduleMetadata("invMovements", "/apps/inventory/stock-movements");
}

export default function StockMovementsPage() {
  return (
    <ModulePage
      section="invMovements"
      path="/apps/inventory/stock-movements"
      prefix="sm"
      appName="Stock Movements"
      tool="invMovements"
      moduleKey="invModule"
      exploreKey="exploreInventory"
      exploreHref="/apps/inventory/inventory-summary"
      tabs={["invForecast", "invWarehouses", "invMovements", "invSummary", "invGatePasses", "invWeighbridge"]}
      features={[
        "A ledger of every stock movement with date, reference, item and quantity",
        "Receipts, issues, transfers and adjustments told apart",
        "From and to warehouse on each movement",
        "A running balance on every line",
        "Filters by movement type, search, CSV and Excel export",
      ]}
      stepTones={["teal", "amber", "blue"]}
      connectStructure={[
        { key: "before", tools: ["scGoodsReceipts", "invWarehouses"] },
        { key: "after", tools: ["invSummary", "invForecast"] },
        { key: "shows", tools: ["ledgers", "financialReports", "scOverview"] },
      ]}
      icons={[ArrowLeftRight, PackageCheck, ClipboardCheck, History]}
      render={(ui) => (
        <Card>
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap gap-1.5 text-[10.5px] font-medium">
              {[ui.fAll, ui.fReceipt, ui.fIssue, ui.fTransfer, ui.fAdjust].map((f, i) => (
                <span key={f} className={`rounded-full border px-2.5 py-0.5 ${i === 0 ? "border-primary bg-primary text-white" : "border-border text-muted-foreground"}`}>{f}</span>
              ))}
            </div>
            <span className="text-[10.5px] text-muted-foreground">{ui.count}</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[34rem] text-[11px]">
              <thead className="text-[9.5px] font-semibold uppercase tracking-wide text-muted-foreground">
                <tr className="border-b border-border">
                  <th className="pb-1.5 text-start">{ui.thDate}</th>
                  <th className="pb-1.5 text-start">{ui.thRef}</th>
                  <th className="pb-1.5 text-start">{ui.thType}</th>
                  <th className="pb-1.5 text-start">{ui.thItem}</th>
                  <th className="pb-1.5 text-start">{ui.thWhere}</th>
                  <th className="pb-1.5 text-end">{ui.thQty}</th>
                  <th className="pb-1.5 text-end">{ui.thBalance}</th>
                </tr>
              </thead>
              <tbody>
                {moves.map((m) => (
                  <tr key={`${m[1]}-${m[3]}`} className="border-b border-border/60">
                    <td className="py-1.5 tabular-nums text-muted-foreground">{m[0]}</td>
                    <td className="py-1.5 font-mono text-[10px] text-foreground">{m[1]}</td>
                    <td className="py-1.5"><Chip tone={tone[m[2]]}>{ui[m[2]]}</Chip></td>
                    <td className="py-1.5 font-medium text-foreground">{m[3]}</td>
                    <td className="py-1.5 text-muted-foreground">{m[4]}</td>
                    <td className={`py-1.5 text-end tabular-nums font-semibold ${m[5] > 0 ? "text-[var(--teal)]" : "text-amber-600 dark:text-amber-400"}`}>
                      {m[5] > 0 ? "+" : "−"}{Math.abs(m[5]).toLocaleString("en-IN")}
                    </td>
                    <td className="py-1.5 text-end tabular-nums text-foreground">{m[6].toLocaleString("en-IN")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    />
  );
}
