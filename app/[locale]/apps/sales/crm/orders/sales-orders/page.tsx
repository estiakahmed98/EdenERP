/**
 * Adon ERP public site: /apps/sales/crm/orders/sales-orders
 * Copy lives in messages/*.json under pages.accountingShowcase.crSalesOrdersPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { ClipboardList, Receipt, ShieldCheck, Truck } from "lucide-react";

import { Card, Chip, HrPage, hrMetadata, type HrTone } from "../../../../human-resources/_hr";

/** DUMMY data: [order, customer, value in BDT, delivered %, invoiced %, status key, tone]. */
const orders: [string, string, number, number, number, string, HrTone][] = [
  ["SO-2026-00418", "Square Fashions Ltd", 171446, 100, 100, "stInvoiced", "teal"],
  ["SO-2026-00421", "Ananta Apparels", 2365000, 60, 40, "stPartial", "primary"],
  ["SO-2026-00423", "DBL Group", 780256, 25, 0, "stPartial", "primary"],
  ["SO-2026-00426", "Mondol Group", 1664800, 0, 0, "stCreditHold", "red"],
  ["SO-2026-00427", "Fakir Fashion Ltd", 1624745, 0, 0, "stConfirmed", "navy"],
];

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("crSalesOrdersPage", "/apps/sales/crm/orders/sales-orders");
}

export default function SalesOrdersPage() {
  return (
    <HrPage
      section="crSalesOrdersPage"
      path="/apps/sales/crm/orders/sales-orders"
      prefix="so"
      appName="Sales Orders"
      tool="crSalesOrders"
      group="crOrdersG"
      features={[
        "Orders from accepted quotes, the portal or the field app",
        "A credit check before an order is confirmed",
        "Delivered and invoiced shown against each order",
        "Partial deliveries and back orders tracked line by line",
        "Stock reserved when the order is confirmed",
      ]}
      stepTones={["purple", "red", "teal"]}
      connectStructure={[
        { key: "before", tools: ["crQuotes", "crCredit"] },
        { key: "after", tools: ["crDispatch", "deliveryChallans", "invoicesAr"] },
        { key: "shows", tools: ["cr360", "crDashboard"] },
      ]}
      icons={[ClipboardList, ShieldCheck, Truck, Receipt]}
      render={(ui) => (
        <Card title={ui.listTitle} right={<span className="text-[10px] text-muted-foreground">{ui.count}</span>}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[34rem] text-[11px]">
              <thead className="text-[9.5px] font-semibold uppercase tracking-wide text-muted-foreground">
                <tr className="border-b border-border">
                  <th className="pb-1.5 text-start">{ui.thOrder}</th>
                  <th className="pb-1.5 text-end">{ui.thValue}</th>
                  <th className="w-40 pb-1.5 text-start ps-4">{ui.thProgress}</th>
                  <th className="pb-1.5 text-end">{ui.thStatus}</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(([no, cust, value, del, inv, st, tone]) => (
                  <tr key={no} className="border-b border-border/60">
                    <td className="py-2">
                      <span className="block font-mono text-[10.5px] text-foreground">{no}</span>
                      <span className="block text-[10px] text-muted-foreground">{cust}</span>
                    </td>
                    <td className="py-2 text-end tabular-nums text-foreground">{value.toLocaleString("en-IN")}</td>
                    <td className="py-2 ps-4">
                      <span className="block h-1.5 rounded-full bg-muted" aria-hidden="true">
                        <span className="block h-1.5 rounded-full bg-primary" style={{ width: `${del}%` }} />
                      </span>
                      <span className="mt-1 block h-1.5 rounded-full bg-muted" aria-hidden="true">
                        <span className="block h-1.5 rounded-full bg-[var(--teal)]" style={{ width: `${inv}%` }} />
                      </span>
                    </td>
                    <td className="py-2 text-end">
                      <Chip tone={tone}>{ui[st]}</Chip>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 flex gap-4 text-[10px] text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-3 rounded bg-primary" /> {ui.delivered}
            </span>
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-3 rounded bg-[var(--teal)]" /> {ui.invoiced}
            </span>
          </p>
        </Card>
      )}
    />
  );
}
