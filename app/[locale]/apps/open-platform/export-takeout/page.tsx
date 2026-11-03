/**
 * Adon ERP public site: /apps/open-platform/export-takeout
 * Copy lives in messages/*.json under pages.accountingShowcase.opExport.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { Download, FileArchive, ShieldCheck, Database } from "lucide-react";
import { ModulePage, moduleMetadata } from "../../_module";
import { Card, Bullet, Chip } from "../../budget-management/_budget";


/** DUMMY data: [dataset, detail, formats, selected]. */
const datasets: [string, string, string, boolean][] = [
  ["Chart of accounts", "86 accounts", "CSV,Excel", true],
  ["Journal entries", "2,418 entries", "CSV,Excel,JSON", true],
  ["Invoices and bills", "412 documents", "CSV,Excel,PDF", true],
  ["Items and products", "27 items", "CSV,Excel", false],
  ["Customers and vendors", "531 parties", "CSV,Excel", false],
];
/** DUMMY data: [name, date, size, status key]. */
const history: [string, string, string, string][] = [
  ["Full takeout", "11/03/2026", "—", "running"],
  ["Journal entries, FY 2026", "10/31/2026", "4.2 MB", "ready"],
  ["Items and products", "10/12/2026", "86 KB", "ready"],
];

export async function generateMetadata(): Promise<Metadata> {
  return moduleMetadata("opExport", "/apps/open-platform/export-takeout");
}

export default function ExportTakeoutPage() {
  return (
    <ModulePage
      section="opExport"
      path="/apps/open-platform/export-takeout"
      prefix="ex"
      appName="Export / Takeout"
      tool="opExport"
      moduleKey="opModule"
      exploreKey="explorePlatform"
      exploreHref="/apps/open-platform/tax-rates"
      tabs={["opTaxRates", "opMigration", "opExport"]}
      features={[
        "Export any dataset as CSV, Excel, JSON or PDF",
        "A full takeout of your data, in portable formats",
        "A date range for transactional data",
        "A history of exports with size, status and a download link",
        "Your data stays yours, with no lock-in",
      ]}
      stepTones={["blue", "teal", "amber"]}
      connectStructure={[
        { key: "before", tools: ["chartOfAccounts", "itemsProducts"] },
        { key: "after", tools: ["opMigration"] },
        { key: "shows", tools: ["financialReports", "accountingHub"] },
      ]}
      icons={[Download, FileArchive, ShieldCheck, Database]}
      render={(ui) => (
        <div className="grid gap-3 lg:grid-cols-12">
          <Card title={ui.datasets} className="lg:col-span-7" right={<span className="text-[10px] text-muted-foreground">{ui.range}</span>}>
            <ul className="divide-y divide-border text-[11px]">
              {datasets.map((d) => (
                <li key={d[0]} className="flex items-center gap-2.5 py-2">
                  <span className={`grid h-4 w-4 shrink-0 place-items-center rounded border text-[10px] ${d[3] ? "border-primary bg-primary text-white" : "border-border text-transparent"}`} aria-hidden="true">✓</span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-medium text-foreground">{d[0]}</span>
                    <span className="block text-[10px] text-muted-foreground">{d[1]}</span>
                  </span>
                  <span className="flex gap-1">
                    {d[2].split(",").map((f) => (
                      <Chip key={f} tone="muted">{f}</Chip>
                    ))}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-3 flex gap-1.5 text-[11px] font-medium">
              <span className="btn-gradient rounded-lg px-3 py-1">{ui.create}</span>
              <span className="rounded-lg border border-border px-3 py-1 text-foreground">{ui.full}</span>
            </p>
          </Card>
          <Card title={ui.history} className="lg:col-span-5">
            <ul className="space-y-3 text-[11px]">
              {history.map((h) => (
                <li key={h[0]}>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium text-foreground">{h[0]}</span>
                    <Chip tone={h[3] === "ready" ? "teal" : "blue"}>{ui[h[3]]}</Chip>
                  </div>
                  <p className="text-[10px] text-muted-foreground">{h[1]} · {h[2]}</p>
                  {h[3] === "running" && <span className="mt-1.5 block"><Bullet pct={64} marker={100} /></span>}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      )}
    />
  );
}
