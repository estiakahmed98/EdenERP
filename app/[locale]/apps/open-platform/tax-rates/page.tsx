/**
 * Adon ERP public site: /apps/open-platform/tax-rates
 * Copy lives in messages/*.json under pages.accountingShowcase.opTaxRates.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { Percent, Landmark, CalendarClock, ReceiptText } from "lucide-react";
import { ModulePage, moduleMetadata } from "../../_module";
import { Card, Chip } from "../../budget-management/_budget";
import { Field } from "../../supply-chain/_supply";

/** DUMMY data: [name, code, rate, applies key, account]. */
const taxes: [string, string, string, string, string][] = [
  ["VAT, standard", "VAT-15", "15%", "both", "2310 VAT payable"],
  ["VAT, selected services", "VAT-10", "10%", "both", "2310 VAT payable"],
  ["VAT, reduced", "VAT-7.5", "7.5%", "both", "2310 VAT payable"],
  ["VAT, small trader", "VAT-5", "5%", "sales", "2310 VAT payable"],
  ["AIT on contracts", "AIT-6", "6%", "purchase", "2330 AIT payable"],
  ["VDS on supplies", "VDS-7.5", "7.5%", "purchase", "2340 VDS payable"],
];

export async function generateMetadata(): Promise<Metadata> {
  return moduleMetadata("opTaxRates", "/apps/open-platform/tax-rates");
}

export default function TaxRatesPage() {
  return (
    <ModulePage
      section="opTaxRates"
      path="/apps/open-platform/tax-rates"
      prefix="tx"
      appName="Tax Rates"
      tool="opTaxRates"
      moduleKey="opModule"
      exploreKey="explorePlatform"
      exploreHref="/apps/open-platform/tax-rates"
      tabs={["opTaxRates", "opMigration", "opExport"]}
      features={[
        "A list of tax rates with a name, a code and a percentage",
        "VAT at 15%, 10%, 7.5% and 5%, and tax deducted at source",
        "Sales, purchase or both for each rate",
        "The account each tax posts to",
        "Effective dates and an active status",
      ]}
      stepTones={["blue", "teal", "amber"]}
      connectStructure={[
        { key: "before", tools: ["chartOfAccounts"] },
        { key: "after", tools: ["invoicesAr", "billsAp", "purchaseOrders"] },
        { key: "shows", tools: ["vatRegister", "financialReports", "accountingHub"] },
      ]}
      icons={[Percent, Landmark, CalendarClock, ReceiptText]}
      render={(ui) => (
        <div className="grid gap-3 lg:grid-cols-12">
          <Card className="lg:col-span-8">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[30rem] text-[11px]">
                <thead className="text-[9.5px] font-semibold uppercase tracking-wide text-muted-foreground">
                  <tr className="border-b border-border">
                    <th className="pb-1.5 text-start">{ui.thName}</th>
                    <th className="pb-1.5 text-end">{ui.thRate}</th>
                    <th className="pb-1.5 text-start ps-4">{ui.thApplies}</th>
                    <th className="pb-1.5 text-start">{ui.thAccount}</th>
                    <th className="pb-1.5 text-end">{ui.thStatus}</th>
                  </tr>
                </thead>
                <tbody>
                  {taxes.map((t) => (
                    <tr key={t[0]} className="border-b border-border/60">
                      <td className="py-1.5">
                        <span className="block font-medium text-foreground">{t[0]}</span>
                        <span className="font-mono text-[9.5px] text-muted-foreground">{t[1]}</span>
                      </td>
                      <td className="py-1.5 text-end tabular-nums font-semibold text-amber-600 dark:text-amber-400">{t[2]}</td>
                      <td className="py-1.5 ps-4"><Chip tone="muted">{ui[t[3]]}</Chip></td>
                      <td className="py-1.5 text-muted-foreground">{t[4]}</td>
                      <td className="py-1.5 text-end"><Chip tone="teal">{ui.active}</Chip></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
          <Card title={ui.newTitle} className="lg:col-span-4">
            <div className="space-y-2.5">
              <Field label={ui.fName} value="VAT 15%" />
              <div className="grid grid-cols-2 gap-2">
                <Field label={ui.fRate} value="15" />
                <Field label={ui.fApplies} value={ui.both} select />
              </div>
              <Field label={ui.fAccount} value="2310 VAT payable" select />
              <Field label={ui.fFrom} value="mm/dd/yyyy" />
            </div>
          </Card>
        </div>
      )}
    />
  );
}
