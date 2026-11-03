/**
 * Adon ERP public site: /apps/supply-chain/procurement/purchase-requisitions
 * Copy lives in messages/*.json under pages.accountingShowcase.scRequisitions.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { ClipboardList, CalendarClock, UserRound, ArrowRightLeft } from "lucide-react";
import { SupplyPage, supplyMetadata, Field } from "../../_supply";
import { Card, Avatar, Chip } from "../../../budget-management/_budget";

const statusTone: Record<string, "muted" | "blue" | "teal" | "purple"> = { draft: "muted", submitted: "blue", approved: "teal", converted: "purple" };

/** DUMMY data: [number, items, department, requester, needed by, priority stars, avatar tone, status key]. */
const rows: [string, string, string, string, string, number, number, string][] = [
  ["PR-2026-0045", "Office printers, 4 units", "Administration", "N. Khan", "12/05/2026", 1, 0, "draft"],
  ["PR-2026-0044", "Hydraulic press spares", "Maintenance", "R. Hasan", "11/18/2026", 3, 1, "submitted"],
  ["PR-2026-0043", "Packing tape and cartons", "Logistics", "T. Mia", "11/25/2026", 2, 2, "submitted"],
  ["PR-2026-0042", "PP granules and masterbatch", "Production", "S. Akter", "11/20/2026", 3, 3, "approved"],
  ["PR-2026-0041", "Flexo ink, cyan and magenta", "Production", "S. Akter", "11/10/2026", 2, 3, "converted"],
  ["PR-2026-0040", "Safety gloves, 200 pairs", "Administration", "N. Khan", "10/30/2026", 1, 0, "converted"],
];

export async function generateMetadata(): Promise<Metadata> {
  return supplyMetadata("scRequisitions", "/apps/supply-chain/procurement/purchase-requisitions");
}

export default function PurchaseRequisitionsPage() {
  return (
    <SupplyPage
      section="scRequisitions"
      path="/apps/supply-chain/procurement/purchase-requisitions"
      prefix="pr"
      appName="Purchase Requisitions"
      tool="scRequisitions"
      features={[
        "Purchase requisitions raised by departments, with a number and a needed-by date",
        "Requester, department, priority and status on every requisition",
        "Draft, submitted, approved and converted statuses",
        "Item lines with quantity, unit and purpose",
        "Approved requisitions turned into comparisons, tenders or purchase orders",
      ]}
      stepTones={["muted", "blue", "teal"]}
      connectStructure={[
        { key: "before", tools: ["itemsProducts", "vendors"] },
        { key: "after", tools: ["scComparative", "scTender", "purchaseOrders"] },
        { key: "shows", tools: ["scOverview", "financialReports"] },
      ]}
      icons={[ClipboardList, CalendarClock, UserRound, ArrowRightLeft]}
      render={(ui) => (
        <div className="grid gap-3 lg:grid-cols-12">
          <Card className="lg:col-span-8">
            <div className="hidden grid-cols-[6.5rem_1fr_6rem_5.5rem_5rem] gap-x-3 border-b border-border pb-1.5 text-[9.5px] font-semibold uppercase tracking-wide text-muted-foreground sm:grid">
              <span>{ui.thNo}</span>
              <span>{ui.thItems}</span>
              <span>{ui.thDept}</span>
              <span>{ui.thNeeded}</span>
              <span className="text-end">{ui.thStatus}</span>
            </div>
            {rows.map((r) => (
              <div key={r[0]} className="grid grid-cols-[1fr_auto] items-center gap-x-3 border-b border-border/60 py-2 text-[11px] sm:grid-cols-[6.5rem_1fr_6rem_5.5rem_5rem]">
                <span className="hidden font-mono text-[10px] text-muted-foreground sm:block">{r[0]}</span>
                <span className="flex min-w-0 items-center gap-2">
                  <Avatar name={r[3]} tone={r[6]} />
                  <span className="min-w-0">
                    <span className="block truncate font-medium text-foreground">{r[1]}</span>
                    <span className="block text-[10px] text-amber-500" aria-hidden="true">{"★".repeat(r[5])}<span className="text-muted-foreground/40">{"★".repeat(3 - r[5])}</span></span>
                  </span>
                </span>
                <span className="hidden text-muted-foreground sm:block">{r[2]}</span>
                <span className="hidden tabular-nums text-muted-foreground sm:block">{r[4]}</span>
                <span className="text-end">
                  <Chip tone={statusTone[r[7]]}>{ui[r[7]]}</Chip>
                </span>
              </div>
            ))}
          </Card>
          <Card title={ui.newTitle} className="lg:col-span-4">
            <div className="space-y-2.5">
              <Field label={ui.fDept} value="Production" select />
              <Field label={ui.fNeeded} value="mm/dd/yyyy" />
              <Field label={ui.fItem} value="PP granules" select />
              <div className="grid grid-cols-2 gap-2">
                <Field label={ui.fQty} value="15,000" />
                <Field label={ui.fUnit} value="kg" />
              </div>
              <Field label={ui.fPurpose} area />
              <p className="text-[11px] text-primary">+ {ui.addLine}</p>
            </div>
          </Card>
        </div>
      )}
    />
  );
}
