/**
 * Adon ERP public site: /apps/real-estate/leases
 * Copy lives in messages/*.json under pages.accountingShowcase.reLeasesPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { CalendarClock, FileText, Percent, Store } from "lucide-react";

import { Bar, Card, Chip, HrPage, Table, bdt, hrMetadata, type HrTone } from "../../human-resources/_hr";

/** DUMMY data: [tenant, unit, monthly rent, ends, status key, tone]. */
const leases: [string, string, number, string, string, HrTone][] = [
  ["Aarong Express", "G-04", 185000, "31 Dec 2027", "stActive", "teal"],
  ["Bean & Brew Cafe", "G-11", 85000, "30 Apr 2026", "stExpiring", "brown"],
  ["Dr. Nasreen's Clinic", "2-03", 120000, "15 Jun 2026", "stRenewal", "sky"],
  ["Sohag Electronics", "1-07", 95000, "28 Feb 2028", "stActive", "teal"],
  ["Kids Corner", "1-02", 64000, "30 May 2026", "stExpiring", "brown"],
];
/** DUMMY data: [label key, count, share %]. */
const ending: [string, number, number][] = [
  ["e30", 4, 100],
  ["e60", 6, 75],
  ["e90", 3, 38],
];

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("reLeasesPage", "/apps/real-estate/leases");
}

export default function RealEstateLeasesPage() {
  return (
    <HrPage
      section="reLeasesPage"
      path="/apps/real-estate/leases"
      prefix="rle"
      appName="Leases"
      tool="reLeases"
      group="re"
      features={[
        "Every tenant, unit and monthly rent in one list",
        "Yearly rent increases applied on the right day",
        "Security deposits held, adjusted and returned",
        "Renewal reminders 30, 60 and 90 days ahead",
        "Rent invoices raised every month from the lease",
      ]}
      stepTones={["purple", "teal", "muted"]}
      connectStructure={[
        { key: "before", tools: ["reUnits"] },
        { key: "after", tools: ["invoicesAr", "receipts", "bankAccounts"] },
        { key: "shows", tools: ["reCollections", "reDashboard"] },
      ]}
      icons={[Store, Percent, FileText, CalendarClock]}
      render={(ui) => (
        <div className="grid gap-3 lg:grid-cols-12">
          <Card className="lg:col-span-8" title={ui.listTitle}>
            <Table
              dense
              cols={[
                { head: ui.cTenant },
                { head: ui.cUnit },
                { head: ui.cRent, end: true },
                { head: ui.cEnds, className: "ps-4" },
                { head: ui.cStatus },
              ]}
              rows={leases.map(([tenant, unit, rent, end, st, tone], i) => [
                tenant,
                <span key={`u${i}`} className="font-mono text-[10.5px] text-muted-foreground">
                  {unit}
                </span>,
                bdt(rent),
                end,
                <Chip key={i} tone={tone}>
                  {ui[st]}
                </Chip>,
              ])}
            />
          </Card>
          <div className="space-y-3 lg:col-span-4">
            <Card title={ui.expiryTitle}>
              <ul className="space-y-2.5">
                {ending.map(([k, n, pct], i) => (
                  <li key={k} className="grid grid-cols-[6.5rem_1fr_1.5rem] items-center gap-2 text-[11px]">
                    <span className="truncate text-foreground">{ui[k]}</span>
                    <Bar pct={pct} tone={i === 0 ? "brown" : "primary"} />
                    <span className="text-end tabular-nums text-muted-foreground">{n}</span>
                  </li>
                ))}
              </ul>
            </Card>
            <Card title={ui.reviewTitle}>
              <dl className="space-y-1.5 text-[11px]">
                {[
                  [ui.dIncrease, ui.increaseValue],
                  [ui.dDeposit, ui.depositValue],
                  [ui.dNotice, ui.noticeValue],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-2">
                    <dt className="text-muted-foreground">{k}</dt>
                    <dd className="tabular-nums text-foreground">{v}</dd>
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
