/**
 * Adon ERP public site: /apps/open-platform/migration-studio
 * Copy lives in messages/*.json under pages.accountingShowcase.opMigration.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { Upload, Columns3, ShieldCheck, DatabaseZap } from "lucide-react";
import { ModulePage, moduleMetadata } from "../../_module";
import { Card, Bullet, Chip } from "../../budget-management/_budget";


const steps = ["sUpload", "sMap", "sCheck", "sImport"];
/** DUMMY data: [source column, ERP field, match confidence %]. */
const mapping: [string, string, number][] = [
  ["Customer Name", "Customer name", 100],
  ["Cust_ID", "Reference ID", 100],
  ["Phone No", "Phone", 96],
  ["Addr", "Billing address", 88],
  ["Credit Days", "Payment terms", 72],
];

export async function generateMetadata(): Promise<Metadata> {
  return moduleMetadata("opMigration", "/apps/open-platform/migration-studio");
}

export default function MigrationStudioPage() {
  return (
    <ModulePage
      section="opMigration"
      path="/apps/open-platform/migration-studio"
      prefix="ms"
      appName="Migration Studio"
      tool="opMigration"
      moduleKey="opModule"
      exploreKey="explorePlatform"
      exploreHref="/apps/open-platform/tax-rates"
      tabs={["opTaxRates", "opMigration", "opExport"]}
      features={[
        "Import data from Excel or CSV, or from another accounting system",
        "A guided path: upload, map columns, check, import",
        "Columns matched to fields, with a confidence for each",
        "A check of every row before anything is written",
        "An import summary with counts of rows read, valid and flagged",
      ]}
      stepTones={["blue", "amber", "teal"]}
      connectStructure={[
        { key: "before", tools: ["chartOfAccounts", "itemsProducts"] },
        { key: "after", tools: ["customers", "vendors", "journalEntries"] },
        { key: "shows", tools: ["financialReports", "opExport"] },
      ]}
      icons={[Upload, Columns3, ShieldCheck, DatabaseZap]}
      render={(ui) => (
        <>
          <ol className="grid grid-cols-4 gap-1.5 text-[10.5px]">
            {steps.map((s, i) => (
              <li key={s} className={`flex items-center gap-1.5 rounded-lg border px-2 py-1.5 ${i === 1 ? "border-primary bg-primary text-white" : i < 1 ? "border-border bg-card text-foreground" : "border-border bg-card text-muted-foreground"}`}>
                <span className={`grid h-4 w-4 shrink-0 place-items-center rounded-full text-[9px] font-semibold ${i === 1 ? "bg-white/25" : "bg-muted"}`}>{i < 1 ? "✓" : i + 1}</span>
                <span className="truncate">{ui[s]}</span>
              </li>
            ))}
          </ol>
          <div className="grid gap-3 lg:grid-cols-12">
            <Card title={ui.mapping} className="lg:col-span-7" right={<span className="text-[10px] text-muted-foreground">customers.xlsx</span>}>
              <ul className="divide-y divide-border text-[11px]">
                {mapping.map((m) => (
                  <li key={m[0]} className="grid grid-cols-[1fr_auto_1fr_auto] items-center gap-x-2 py-1.5">
                    <span className="truncate font-mono text-[10px] text-muted-foreground">{m[0]}</span>
                    <span className="text-muted-foreground">→</span>
                    <span className="truncate font-medium text-foreground">{m[1]}</span>
                    <Chip tone={m[2] === 100 ? "teal" : "amber"}>{m[2]}%</Chip>
                  </li>
                ))}
              </ul>
            </Card>
            <Card title={ui.check} className="lg:col-span-5">
              <dl className="grid grid-cols-3 gap-2 text-[11px]">
                <div>
                  <dt className="text-muted-foreground">{ui.read}</dt>
                  <dd className="text-[15px] font-semibold tabular-nums text-foreground">1,248</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">{ui.valid}</dt>
                  <dd className="text-[15px] font-semibold tabular-nums text-[var(--teal)]">1,231</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">{ui.flagged}</dt>
                  <dd className="text-[15px] font-semibold tabular-nums text-amber-600 dark:text-amber-400">17</dd>
                </div>
              </dl>
              <span className="mt-3 block"><Bullet pct={98.6} marker={100} /></span>
              <p className="mt-2 text-[10.5px] leading-snug text-muted-foreground">{ui.checkNote}</p>
              <p className="mt-3 flex gap-1.5 text-[11px] font-medium">
                <span className="btn-gradient rounded-lg px-3 py-1">{ui.importBtn}</span>
                <span className="rounded-lg border border-border px-3 py-1 text-foreground">{ui.download}</span>
              </p>
            </Card>
          </div>
        </>
      )}
    />
  );
}
