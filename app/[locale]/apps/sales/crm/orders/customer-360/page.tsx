/**
 * Adon ERP public site: /apps/sales/crm/orders/customer-360
 * Copy lives in messages/*.json under pages.accountingShowcase.cr360Page.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { CircleDollarSign, History, LayoutDashboard, UserRound } from "lucide-react";

import { Avatar, Bar, Card, Chip, HrPage, hrMetadata, type HrTone } from "../../../../human-resources/_hr";

const kpis: [string, string, string][] = [
  ["kRevenue", "BDT 1.84 Cr", "kRevenueSub"],
  ["kOpenAr", "BDT 22.6 L", "kOpenArSub"],
  ["kOrders", "38", "kOrdersSub"],
  ["kReturns", "1.4%", "kReturnsSub"],
];
/** DUMMY data: [date, kind key, text, tone]. */
const feed: [string, string, string, HrTone][] = [
  ["1 Nov", "fInvoice", "INV-2026-1184 · BDT 3,42,000", "primary"],
  ["29 Oct", "fVisit", "Negotiation visit · positive", "teal"],
  ["24 Oct", "fPayment", "Cheque received · BDT 5,00,000", "teal"],
  ["20 Oct", "fOrder", "SO-2026-00421 confirmed", "navy"],
  ["12 Oct", "fTicket", "Return of 150 cartons raised", "brown"],
];

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("cr360Page", "/apps/sales/crm/orders/customer-360");
}

export default function Customer360Page() {
  return (
    <HrPage
      section="cr360Page"
      path="/apps/sales/crm/orders/customer-360"
      prefix="c360"
      appName="Customer 360"
      tool="cr360"
      group="crOrdersG"
      features={[
        "Revenue, open receivables, orders and returns for one customer",
        "Credit limit used, and how close the account is to a hold",
        "Every order, invoice, payment, visit and return on one timeline",
        "Contacts and their roles beside the numbers",
        "The same figures the accounts team sees",
      ]}
      stepTones={["purple", "teal", "muted"]}
      connectStructure={[
        { key: "before", tools: ["crContacts", "customers"] },
        { key: "after", tools: ["crPlans", "crCredit"] },
        { key: "shows", tools: ["arApAging", "crRelationships"] },
      ]}
      icons={[LayoutDashboard, CircleDollarSign, History, UserRound]}
      render={(ui) => (
        <>
          <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-card p-3">
            <Avatar name="Ananta Apparels" size={36} tone={0} />
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-semibold text-foreground">Ananta Apparels</p>
              <p className="text-[10.5px] text-muted-foreground">{ui.since}</p>
            </div>
            <Chip tone="teal">tier1</Chip>
            <div className="w-40">
              <p className="flex justify-between text-[10px] text-muted-foreground">
                <span>{ui.credit}</span>
                <span className="tabular-nums text-foreground">75%</span>
              </p>
              <Bar pct={75} tone="brown" />
            </div>
          </div>
          <div className="grid gap-2 sm:grid-cols-4">
            {kpis.map(([k, v, sub]) => (
              <div key={k} className="rounded-xl bg-[var(--gray-bg)] px-3 py-2">
                <p className="text-[9.5px] text-muted-foreground">{ui[k]}</p>
                <p className="text-[14px] font-semibold tabular-nums text-foreground">{v}</p>
                <p className="text-[9.5px] text-muted-foreground">{ui[sub]}</p>
              </div>
            ))}
          </div>
          <Card title={ui.timeline}>
            <ul className="space-y-1.5">
              {feed.map(([d, kind, text, tone]) => (
                <li key={d + kind} className="flex items-center gap-3 text-[11px]">
                  <span className="w-12 shrink-0 text-[10px] text-muted-foreground">{d}</span>
                  <Chip tone={tone}>{ui[kind]}</Chip>
                  <span className="truncate text-foreground">{text}</span>
                </li>
              ))}
            </ul>
          </Card>
        </>
      )}
    />
  );
}
