/**
 * Adon ERP public site: /apps/real-estate/revenue-recognition
 * Copy lives in messages/*.json under pages.accountingShowcase.reRevRecPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { BookOpenCheck, Percent, Scale, TrendingUp } from "lucide-react";

import { Bar, Card, HrPage, Stat, Table, bdt, hrMetadata } from "../../human-resources/_hr";

/** DUMMY data: [project, contract value, complete %]. */
const rows: [string, number, number][] = [
  ["Riverside Heights", 842000000, 62],
  ["Green Valley Residences", 615000000, 41],
  ["Lakeview Tower", 388000000, 18],
  ["Skyline Plaza", 296000000, 88],
];
/** DUMMY data: this month's journal, as [side, line key, amount]. */
const journal: [string, string, number][] = [
  ["jDr", "lContractAsset", 18450000],
  ["jDr", "lAdvance", 24600000],
  ["jCr", "lRevenue", 43050000],
];

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("reRevRecPage", "/apps/real-estate/revenue-recognition");
}

export default function RealEstateRevenueRecognitionPage() {
  const total = rows.reduce((n, r) => n + r[1], 0);
  const recognised = rows.reduce((n, r) => n + (r[1] * r[2]) / 100, 0);
  return (
    <HrPage
      section="reRevRecPage"
      path="/apps/real-estate/revenue-recognition"
      prefix="rrr"
      appName="Revenue Recognition"
      tool="reRevRec"
      group="re"
      features={[
        "Percentage of completion worked out for each project",
        "Revenue earned against what buyers have paid",
        "Contract assets, advances and deferred income kept apart",
        "A journal ready to review and post",
        "Every month's workings saved for the auditor",
      ]}
      stepTones={["purple", "teal", "muted"]}
      connectStructure={[
        { key: "before", tools: ["reBookings", "reCollections", "reProperties"] },
        { key: "after", tools: ["journalEntries"] },
        { key: "shows", tools: ["financialReports", "reHandover"] },
      ]}
      icons={[Percent, Scale, BookOpenCheck, TrendingUp]}
      render={(ui) => (
        <>
          <div className="grid gap-2 sm:grid-cols-4">
            <Stat label={ui.kContract} value={bdt(total)} tone="primary" />
            <Stat label={ui.kRecognised} value={bdt(recognised)} tone="teal" />
            <Stat label={ui.kDeferred} value={bdt(total - recognised)} tone="navy" />
            <Stat label={ui.kMethod} value={ui.methodValue} tone="brown" />
          </div>
          <div className="grid gap-3 lg:grid-cols-12">
            <Card className="lg:col-span-7" title={ui.tableTitle}>
              <Table
                dense
                cols={[
                  { head: ui.cProject },
                  { head: ui.cComplete, className: "w-28" },
                  { head: ui.cRecognised, end: true },
                  { head: ui.cDeferred, end: true },
                ]}
                rows={rows.map(([name, value, pct]) => [
                  name,
                  <span key={name} className="flex items-center gap-2">
                    <Bar pct={pct} tone={pct > 80 ? "teal" : "primary"} />
                    <span className="w-8 text-end text-[10px] tabular-nums text-muted-foreground">{pct}%</span>
                  </span>,
                  bdt((value * pct) / 100),
                  bdt((value * (100 - pct)) / 100),
                ])}
              />
            </Card>
            <Card className="lg:col-span-5" title={ui.journalTitle}>
              <ul className="space-y-1.5 text-[11px]">
                {journal.map(([side, line, amt]) => (
                  <li key={line} className={`flex items-center gap-2 ${side === "jCr" ? "ps-6" : ""}`}>
                    <span className="w-6 shrink-0 font-mono text-[10px] font-semibold text-primary">{ui[side]}</span>
                    <span className="min-w-0 flex-1 truncate text-foreground">{ui[line]}</span>
                    <span className="tabular-nums text-muted-foreground">{bdt(amt)}</span>
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
