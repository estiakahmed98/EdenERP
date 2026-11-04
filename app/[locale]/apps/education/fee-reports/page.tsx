/**
 * Adon ERP public site: /apps/education/fee-reports
 * Copy lives in messages/*.json under pages.accountingShowcase.edFeeReportsPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";

import { SchoolPage } from "@/components/education/school-page";
import { Field, Panel, Pill, PencilBar, Register, Sticker, Tabs, num, useUi } from "@/components/education/school-ui";

import { accountingMetadata } from "../../accounting/_shared";

/** DUMMY data: [class, billed, collected]. */
const classes: [string, number, number][] = [
  ["Play", 3048800, 2841540],
  ["Nursery", 2256900, 2118000],
  ["KG", 2469630, 2255880],
  ["Class 1", 4200200, 3893420],
  ["Class 2", 3622850, 3420320],
  ["Class 3", 3457000, 3170600],
];

export async function generateMetadata(): Promise<Metadata> {
  return accountingMetadata("edFeeReportsPage", "/apps/education/fee-reports");
}

export default function EducationFeeReportsPage() {
  const ui = useUi("edFeeReportsPage");
  // The summary covers the whole school; the table below shows the first six classes.
  const billed = 59205795;
  const collected = 55068730;
  return (
    <SchoolPage
      section="edFeeReportsPage"
      path="/apps/education/fee-reports"
      tool="feeReports"
      preview={
        <>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Tabs items={[ui.tabSummary, ui.tabDefaulters, ui.tabCollections, ui.tabLedger, ui.tabTie]} />
            <span className="flex gap-2">
              <Pill tone="blue">{ui.basis}</Pill>
              <Pill tone="muted">{ui.year}</Pill>
            </span>
          </div>
          <div className="w-44">
            <Field label={ui.fMonth} value="" />
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
            <Sticker label={ui.kBilled} value={num(billed)} />
            <Sticker label={ui.kCollected} value={num(collected)} sub={`${((collected / billed) * 100).toFixed(2)}%`} tone="green" />
            <Sticker label={ui.kOutstanding} value={num(billed - collected)} tone="brown" />
            <Sticker label={ui.kWaivers} value={num(1277200)} tone="navy" />
            <Sticker label={ui.kWritten} value="0" tone="red" />
            <Sticker label={ui.kAdvance} value={num(522600)} tone="blue" />
          </div>
          <Panel>
            <Register
              dense
              cols={[
                { head: ui.cClass },
                { head: ui.cBilled, end: true },
                { head: ui.cCollected, end: true },
                { head: ui.cOutstanding, end: true },
                { head: ui.cPct, className: "w-40 ps-4" },
              ]}
              rows={classes.map(([name, b, c]) => [
                name,
                num(b),
                num(c),
                num(b - c),
                <span key={name} className="flex items-center gap-2">
                  <PencilBar pct={(c / b) * 100} tone="green" />
                  <span className="w-8 shrink-0 text-end text-[10px] tabular-nums text-muted-foreground">{Math.round((c / b) * 100)}%</span>
                </span>,
              ])}
            />
          </Panel>
        </>
      }
    />
  );
}
