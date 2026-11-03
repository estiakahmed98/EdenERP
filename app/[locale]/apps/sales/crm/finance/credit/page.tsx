/**
 * Adon ERP public site: /apps/sales/crm/finance/credit
 * Copy lives in messages/*.json under pages.accountingShowcase.crCreditPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { CreditCard, Gauge, ShieldAlert, Unlock } from "lucide-react";

import { Card, Chip, HrPage, hrMetadata } from "../../../../human-resources/_hr";

/** DUMMY data: [customer, limit in lakh, outstanding in lakh, oldest overdue days]. */
const accounts: [string, number, number, number][] = [
  ["Mondol Group", 20, 21.4, 74],
  ["Karim Traders", 8, 7.1, 38],
  ["Ananta Apparels", 30, 22.6, 12],
  ["DBL Group", 25, 9.8, 0],
  ["Square Fashions", 15, 3.2, 0],
];

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("crCreditPage", "/apps/sales/crm/finance/credit");
}

export default function CreditPage() {
  return (
    <HrPage
      section="crCreditPage"
      path="/apps/sales/crm/finance/credit"
      prefix="cred"
      appName="Credit"
      tool="crCredit"
      group="crFinanceG"
      features={[
        "A credit limit and payment terms for every customer",
        "Outstanding, including orders not yet invoiced, against the limit",
        "Orders held automatically when the limit or an overdue is crossed",
        "Holds released by finance with a reason",
        "Limits reviewed from payment history",
      ]}
      stepTones={["purple", "red", "teal"]}
      connectStructure={[
        { key: "before", tools: ["customers", "arApAging"] },
        { key: "after", tools: ["crSalesOrders", "crCollections"] },
        { key: "shows", tools: ["cr360", "crDashboard"] },
      ]}
      icons={[CreditCard, Gauge, ShieldAlert, Unlock]}
      render={(ui) => (
        <Card title={ui.listTitle} right={<Chip tone="red">{ui.onHold}</Chip>}>
          <ul className="space-y-3">
            {accounts.map(([name, limit, out, overdue]) => {
              const pct = Math.round((out / limit) * 100);
              const hold = pct > 100 || overdue > 60;
              return (
                <li key={name} className="text-[11px]">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-medium text-foreground">{name}</span>
                    <span className="flex items-center gap-2 text-[10.5px] tabular-nums text-muted-foreground">
                      {out} L / {limit} L
                      {overdue > 0 && <Chip tone={overdue > 60 ? "red" : "brown"}>{overdue} {ui.daysOverdue}</Chip>}
                      {hold && <Chip tone="red">{ui.hold}</Chip>}
                    </span>
                  </div>
                  <span className="relative mt-1 block h-2.5 rounded-full bg-muted" aria-hidden="true">
                    <span className={`block h-2.5 rounded-full ${pct > 100 ? "bg-destructive" : pct > 80 ? "bg-[var(--chart-4)]" : "bg-[var(--teal)]"}`} style={{ width: `${Math.min(pct, 100)}%` }} />
                    <span className="absolute -top-0.5 end-0 h-3.5 w-0.5 bg-foreground/60" />
                  </span>
                </li>
              );
            })}
          </ul>
          <p className="mt-3 border-t border-border pt-2 text-[10px] text-muted-foreground">{ui.rule}</p>
        </Card>
      )}
    />
  );
}
