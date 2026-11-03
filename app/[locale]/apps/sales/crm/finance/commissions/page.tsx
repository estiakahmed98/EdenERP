/**
 * Adon ERP public site: /apps/sales/crm/finance/commissions
 * Copy lives in messages/*.json under pages.accountingShowcase.crCommissionsPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { BadgeDollarSign, CheckCheck, Percent, Wallet } from "lucide-react";

import { Avatar, Card, Chip, HrPage, Table, hrMetadata, type HrTone } from "../../../../human-resources/_hr";

/** DUMMY data: [rep, source, base in taka, rate %, status key, tone]. */
const ledger: [string, string, number, number, string, HrTone][] = [
  ["Rasel mia", "INV-2026-1184 paid", 342000, 2, "stPaid", "teal"],
  ["Pranto", "Deal won · Asrotex", 1363950, 3, "stApproved", "primary"],
  ["Ashraful", "Deal won · Mondol Group", 1664800, 3, "stAccrued", "brown"],
  ["Rasel & Pranto", "INV-2026-1190 paid", 210000, 2, "stAccrued", "brown"],
];
const plans: [string, string, string][] = [
  ["ERP Sales", "bInvoicePaid", "2%"],
  ["Field Sales — 3% on won deals", "bDealAmount", "3%"],
];

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("crCommissionsPage", "/apps/sales/crm/finance/commissions");
}

export default function CommissionsPage() {
  return (
    <HrPage
      section="crCommissionsPage"
      path="/apps/sales/crm/finance/commissions"
      prefix="comm"
      appName="Commissions"
      tool="crCommissions"
      group="crFinanceG"
      features={[
        "Commission plans on won deals or on paid invoices",
        "A rate for each plan, and a plan for each rep",
        "Commission accrued automatically from deals and payments",
        "Approve all and pay all, with the ledger kept",
        "Split commission between two reps on one deal",
      ]}
      stepTones={["muted", "purple", "teal"]}
      connectStructure={[
        { key: "before", tools: ["crDeals", "receipts"] },
        { key: "after", tools: ["hrPayrollRuns", "journalEntries"] },
        { key: "shows", tools: ["crScorecard", "crDashboard"] },
      ]}
      icons={[Percent, BadgeDollarSign, CheckCheck, Wallet]}
      render={(ui) => (
        <>
          <Card
            title={ui.ledger}
            right={
              <span className="flex flex-wrap gap-1.5 text-[10px] font-medium">
                {["aAccrueDeals", "aAccrueInvoices", "aApprove", "aPay"].map((a) => (
                  <span key={a} className="rounded-md border border-primary/30 px-2 py-0.5 text-primary">
                    {ui[a]}
                  </span>
                ))}
              </span>
            }
          >
            <Table
              cols={[{ head: ui.thRep }, { head: ui.thSource }, { head: ui.thBase, end: true }, { head: ui.thRate, end: true }, { head: ui.thCommission, end: true }, { head: ui.thStatus, end: true }]}
              rows={ledger.map(([rep, src, base, rate, st, tone], i) => [
                <span key="r" className="flex items-center gap-1.5">
                  <Avatar name={rep} size={18} tone={i} />
                  {rep}
                </span>,
                <span key="s" className="text-muted-foreground">{src}</span>,
                base.toLocaleString("en-IN"),
                `${rate}%`,
                <span key="c" className="font-semibold">{Math.round((base * rate) / 100).toLocaleString("en-IN")}</span>,
                <Chip key="st" tone={tone}>{ui[st]}</Chip>,
              ])}
            />
          </Card>
          <Card title={ui.plans} right={<Chip tone="primary">+ {ui.plan}</Chip>}>
            <ul className="grid gap-2 sm:grid-cols-2">
              {plans.map(([name, basis, rate]) => (
                <li key={name} className="flex items-center justify-between rounded-lg bg-[var(--gray-bg)] px-3 py-2 text-[11px]">
                  <span>
                    <span className="block font-medium text-foreground">{name}</span>
                    <span className="block font-mono text-[10px] text-muted-foreground">{ui[basis]}</span>
                  </span>
                  <span className="text-[15px] font-semibold text-primary">{rate}</span>
                </li>
              ))}
            </ul>
          </Card>
        </>
      )}
    />
  );
}
