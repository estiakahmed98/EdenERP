/**
 * Adon ERP public site: /apps/sales/crm/orders/returns
 * Copy lives in messages/*.json under pages.accountingShowcase.crReturnsPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { ClipboardCheck, FileMinus, PackageX, Undo2 } from "lucide-react";

import { Card, Chip, HrPage, Legend, Ring, hrMetadata, type HrTone } from "../../../../human-resources/_hr";

/** DUMMY data: [return, customer, item, qty, reason key, status key, tone, credit note]. */
const returns: [string, string, string, string, string, string, HrTone, string][] = [
  ["RET-2026-0031", "DBL Group", "Poly bag PE 26×44", "1,200 pcs", "rPrint", "stCredited", "teal", "CN-2026-0088"],
  ["RET-2026-0033", "Square Fashions", "Carton 3-ply", "150 pcs", "rDamaged", "stInspect", "brown", "—"],
  ["RET-2026-0034", "Mondol Group", "Zipper poly bag", "800 pcs", "rSize", "stApproved", "primary", "—"],
  ["RET-2026-0035", "Fakir Fashion", "Carton 5-ply", "60 pcs", "rLate", "stRejected", "red", "—"],
];
const reasons = ["rPrint", "rDamaged", "rSize", "rLate"];

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("crReturnsPage", "/apps/sales/crm/orders/returns");
}

export default function ReturnsPage() {
  return (
    <HrPage
      section="crReturnsPage"
      path="/apps/sales/crm/orders/returns"
      prefix="ret"
      appName="Returns"
      tool="crReturns"
      group="crOrdersG"
      features={[
        "Customer returns against the original invoice",
        "A reason on every return, for quality to act on",
        "Inspection before anything is accepted back",
        "A credit note raised when the return is approved",
        "Good stock back on the shelf, damaged stock kept apart",
      ]}
      stepTones={["muted", "purple", "teal"]}
      connectStructure={[
        { key: "before", tools: ["invoicesAr", "crSalesOrders"] },
        { key: "after", tools: ["receipts", "invMovements"] },
        { key: "shows", tools: ["cr360", "crDashboard"] },
      ]}
      icons={[Undo2, ClipboardCheck, FileMinus, PackageX]}
      render={(ui) => (
        <div className="grid gap-3 lg:grid-cols-12">
          <Card className="lg:col-span-8" title={ui.listTitle}>
            <ul className="divide-y divide-border">
              {returns.map(([no, cust, item, qty, reason, st, tone, cn]) => (
                <li key={no} className="grid items-center gap-2 py-2 text-[11px] sm:grid-cols-[1fr_7rem_6rem]">
                  <span className="min-w-0">
                    <span className="block text-foreground">
                      <span className="font-mono text-[10.5px]">{no}</span> · {cust}
                    </span>
                    <span className="block truncate text-[10px] text-muted-foreground">
                      {item} · {qty} · {ui[reason]}
                    </span>
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground">{cn}</span>
                  <span className="text-end">
                    <Chip tone={tone}>{ui[st]}</Chip>
                  </span>
                </li>
              ))}
            </ul>
          </Card>
          <Card className="lg:col-span-4" title={ui.byReason}>
            <div className="flex items-center gap-4">
              <Ring values={[46, 28, 18, 8]} centre="2.1%" caption={ui.ofSales} size={92} />
              <Legend items={reasons.map((r) => ui[r])} />
            </div>
          </Card>
        </div>
      )}
    />
  );
}
