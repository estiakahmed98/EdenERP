/**
 * Adon ERP public site: /apps/analytics/export-takeout
 * Copy lives in messages/*.json under pages.accountingShowcase.anExportPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { Braces, DoorOpen, FileDown, FileSpreadsheet } from "lucide-react";

import { Card, Chip, Field, HrPage, hrMetadata } from "../../human-resources/_hr";

const formats: [string, string][] = [
  ["CSV", "fCsv"],
  ["Excel", "fXlsx"],
  ["IIF", "fIif"],
  ["JSON", "fJson"],
];
/** DUMMY data: [dataset key, rows]. */
const datasets: [string, string][] = [
  ["dTb", "26"],
  ["dCustomers", "184"],
  ["dInvoices", "2,318"],
  ["dItems", "412"],
  ["dEmployees", "212"],
];

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("anExportPage", "/apps/analytics/export-takeout");
}

export default function AnalyticsExportPage() {
  return (
    <HrPage
      section="anExportPage"
      path="/apps/analytics/export-takeout"
      prefix="anexp"
      appName="Export / Takeout"
      tool="anExport"
      group="an"
      features={[
        "Any dataset to CSV, Excel, QuickBooks IIF or JSON",
        "Everything at once, as a multi-sheet workbook or a JSON bundle",
        "An as-of date for balances and reports",
        "CSV with BOM, so Bangla text opens cleanly in Excel",
        "Files that re-import through the Migration Studio",
      ]}
      stepTones={["purple", "teal", "muted"]}
      connectStructure={[
        { key: "before", tools: ["anFinancial", "anHr"] },
        { key: "after", tools: ["opMigration"] },
        { key: "shows", tools: ["opExport", "anHub"] },
      ]}
      icons={[FileDown, FileSpreadsheet, Braces, DoorOpen]}
      render={(ui) => (
        <>
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-primary/30 bg-primary/5 p-3.5">
            <div>
              <p className="text-[12.5px] font-semibold text-foreground">{ui.fullTitle}</p>
              <p className="text-[10.5px] text-muted-foreground">{ui.fullSub}</p>
            </div>
            <div className="flex gap-2 text-[10.5px] font-medium">
              <span className="rounded-md border border-primary/40 bg-card px-2.5 py-1 text-primary">{ui.workbook}</span>
              <span className="rounded-md border border-primary/40 bg-card px-2.5 py-1 text-primary">{ui.bundle}</span>
            </div>
          </div>
          <div className="grid gap-3 lg:grid-cols-12">
            <Card className="lg:col-span-5" title={ui.datasets}>
              <ul className="space-y-1">
                {datasets.map(([k, n], i) => (
                  <li key={k} className={`flex items-center justify-between rounded-md px-2.5 py-1.5 text-[11px] ${i === 0 ? "bg-primary text-white" : "text-foreground"}`}>
                    {ui[k]}
                    <span className={`tabular-nums ${i === 0 ? "text-white/80" : "text-muted-foreground"}`}>
                      {n} {ui.rows}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
            <Card className="lg:col-span-7" title={ui.exportTitle}>
              <div className="grid grid-cols-4 gap-1.5">
                {formats.map(([f, k], i) => (
                  <span key={f} className={`rounded-lg border px-2 py-2 text-center ${i === 0 ? "border-primary bg-primary/10" : "border-border"}`}>
                    <span className={`block text-[12px] font-semibold ${i === 0 ? "text-primary" : "text-foreground"}`}>{f}</span>
                    <span className="block text-[9px] leading-tight text-muted-foreground">{ui[k]}</span>
                  </span>
                ))}
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <Field label={ui.asOf} value="3 Nov 2026" />
                <div className="flex items-end">
                  <span className="btn-gradient block w-full rounded-md py-1.5 text-center text-[11px] font-medium">{ui.exportBtn}</span>
                </div>
              </div>
              <p className="mt-2 flex items-center gap-1.5 text-[10px] text-muted-foreground">
                <Chip tone="teal">UTF-8</Chip> {ui.bomNote}
              </p>
            </Card>
          </div>
        </>
      )}
    />
  );
}
