/**
 * Adon ERP public site: /apps/real-estate/brokers
 * Copy lives in messages/*.json under pages.accountingShowcase.reBrokersPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { BadgePercent, Handshake, ReceiptText, Users } from "lucide-react";

import { Avatar, Card, HrPage, Legend, Ring, Table, bdt, hrMetadata } from "../../human-resources/_hr";

/** DUMMY data: [broker, deals, sales value, rate %, commission due now]. */
const brokers: [string, number, number, number, number][] = [
  ["Rafiq Associates", 14, 186000000, 2.5, 640000],
  ["Dhaka Home Finder", 9, 112000000, 2.5, 392000],
  ["Nusrat Jahan", 6, 74000000, 2, 207000],
  ["Shams Realty", 4, 51000000, 2, 142000],
];
/** DUMMY data: statement for the first broker, as [label key, amount]. */
const statement: [string, number][] = [
  ["sTotal", 4650000],
  ["sPaid", 2900000],
  ["sDue", 640000],
  ["sHeld", 1110000],
];

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("reBrokersPage", "/apps/real-estate/brokers");
}

export default function RealEstateBrokersPage() {
  return (
    <HrPage
      section="reBrokersPage"
      path="/apps/real-estate/brokers"
      prefix="rbr"
      appName="Brokers"
      tool="reBrokers"
      group="re"
      features={[
        "Every booking records the broker who brought it",
        "Rates by broker, by project or by volume tier",
        "Commission released as the buyer pays",
        "A clear statement for each broker",
        "Payouts in one batch from accounts payable",
      ]}
      stepTones={["purple", "teal", "muted"]}
      connectStructure={[
        { key: "before", tools: ["reBookings", "reUnits"] },
        { key: "after", tools: ["reCollections", "billsAp"] },
        { key: "shows", tools: ["bankAccounts", "reDashboard"] },
      ]}
      icons={[Handshake, BadgePercent, ReceiptText, Users]}
      render={(ui) => (
        <div className="grid gap-3 lg:grid-cols-12">
          <Card className="lg:col-span-8" title={ui.boardTitle}>
            <Table
              dense
              cols={[
                { head: ui.cBroker },
                { head: ui.cDeals, end: true },
                { head: ui.cSales, end: true },
                { head: ui.cRate, end: true },
                { head: ui.cDue, end: true },
              ]}
              rows={brokers.map(([name, deals, value, rate, due], i) => [
                <span key={name} className="flex items-center gap-2">
                  <Avatar name={name} tone={i} />
                  {name}
                </span>,
                deals,
                bdt(value),
                `${rate}%`,
                bdt(due),
              ])}
            />
          </Card>
          <div className="space-y-3 lg:col-span-4">
            <Card title={ui.shareTitle}>
              <div className="flex items-center gap-3">
                <Ring values={brokers.map((b) => b[2])} centre="4" caption={ui.shareCaption} size={92} />
                <Legend items={brokers.map((b) => b[0])} />
              </div>
            </Card>
            <Card title={ui.statementTitle}>
              <dl className="space-y-1.5 text-[11px]">
                {statement.map(([k, amt]) => (
                  <div key={k} className="flex justify-between gap-2">
                    <dt className="text-muted-foreground">{ui[k]}</dt>
                    <dd className="tabular-nums text-foreground">{bdt(amt)}</dd>
                  </div>
                ))}
              </dl>
            </Card>
          </div>
        </div>
      )}
    />
  );
}
