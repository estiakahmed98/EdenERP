/**
 * Adon ERP public site: /apps/real-estate/collections
 * Copy lives in messages/*.json under pages.accountingShowcase.reCollectionsPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { BellRing, CalendarClock, PhoneCall, Wallet } from "lucide-react";

import { Bar, Card, Chip, HrPage, Stat, Table, bdt, hrMetadata, type HrTone } from "../../human-resources/_hr";

/** DUMMY data: [buyer, unit, due date, amount, status key, tone]. */
const due: [string, string, string, number, string, HrTone][] = [
  ["Tahmina Rahman", "A-7C", "02 Apr", 435000, "stDueSoon", "brown"],
  ["Imran Hossain", "B-4A", "28 Mar", 520000, "stLate", "red"],
  ["Sharmin Akter", "A-3D", "25 Mar", 380000, "stPromised", "sky"],
  ["Kamal Uddin", "C-2B", "20 Mar", 610000, "stPaid", "teal"],
  ["Nusrat Jahan", "A-5B", "15 Mar", 455000, "stLate", "red"],
];
/** DUMMY data: [label key, amount, share %]. */
const aging: [string, number, number][] = [
  ["a0", 3650000, 100],
  ["a1", 2320000, 64],
  ["a2", 1540000, 42],
  ["a3", 910000, 25],
];

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("reCollectionsPage", "/apps/real-estate/collections");
}

export default function RealEstateCollectionsPage() {
  return (
    <HrPage
      section="reCollectionsPage"
      path="/apps/real-estate/collections"
      prefix="rcl"
      appName="Collections"
      tool="reCollections"
      group="re"
      features={[
        "Instalments due this month, by project and by buyer",
        "Overdue buyers with days late and call notes",
        "Promise-to-pay dates recorded against each buyer",
        "Late charges applied by your own rule",
        "Receipts matched to the instalment they pay",
      ]}
      stepTones={["purple", "teal", "muted"]}
      connectStructure={[
        { key: "before", tools: ["reBookings"] },
        { key: "after", tools: ["receipts", "bankAccounts"] },
        { key: "shows", tools: ["arApAging", "reDashboard", "reBuyerPortal"] },
      ]}
      icons={[Wallet, CalendarClock, PhoneCall, BellRing]}
      render={(ui) => (
        <>
          <div className="grid gap-2 sm:grid-cols-4">
            <Stat label={ui.kDue} value={bdt(9240000)} tone="primary" />
            <Stat label={ui.kCollected} value={bdt(6125000)} tone="teal" />
            <Stat label={ui.kOverdue} value={bdt(8420000)} tone="red" />
            <Stat label={ui.kRate} value="66%" tone="navy" />
          </div>
          <div className="grid gap-3 lg:grid-cols-12">
            <Card className="lg:col-span-8" title={ui.tableTitle}>
              <Table
                dense
                cols={[
                  { head: ui.cBuyer },
                  { head: ui.cUnit },
                  { head: ui.cDue },
                  { head: ui.cAmount, end: true },
                  { head: ui.cStatus, className: "ps-4" },
                ]}
                rows={due.map(([buyer, unit, date, amt, st, tone], i) => [
                  buyer,
                  <span key={`u${i}`} className="font-mono text-[10.5px] text-muted-foreground">
                    {unit}
                  </span>,
                  date,
                  bdt(amt),
                  <Chip key={i} tone={tone}>
                    {ui[st]}
                  </Chip>,
                ])}
              />
            </Card>
            <Card className="lg:col-span-4" title={ui.agingTitle}>
              <ul className="space-y-2.5">
                {aging.map(([k, amt, pct], i) => (
                  <li key={k} className="text-[11px]">
                    <div className="mb-1 flex justify-between">
                      <span className="text-foreground">{ui[k]}</span>
                      <span className="tabular-nums text-muted-foreground">{bdt(amt)}</span>
                    </div>
                    <Bar pct={pct} tone={i > 1 ? "red" : i === 1 ? "brown" : "primary"} />
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
