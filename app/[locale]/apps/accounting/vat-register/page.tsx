/**
 * Adon ERP public site: /[locale]/apps/accounting/vat-register
 * Copy lives in messages/*.json under pages.accountingShowcase.vatRegister.
 * ALL DATA ON THIS PAGE IS DUMMY.
 *
 * Who is reading: the accountant who prepares the monthly VAT return
 * The question:   "How do I see the VAT I charged and the VAT I paid, and what is left to pay?"
 */
import type { Metadata } from "next";
import { CalendarClock, Calendar, Download, FileText, Percent, Printer, Receipt, RefreshCw, Search } from "lucide-react";
import type { ReactNode } from "react";

import { useCommon } from "../_shared";
import {
  TemplatePage,
  TemplatePreview,
  accountingPageMetadata,
  useTemplateContent,
} from "../_template";

/** DUMMY data. */
const sales = [
  { no: "INV-2026-000034", party: "Padma Knitwear Ltd.", taxable: "397,201.5", vat: "59,580.23" },
  { no: "INV-2026-000035", party: "Jamuna Apparel", taxable: "506,748.9", vat: "76,012.34" },
  { no: "INV-2026-000036", party: "Surma Textile Limited", taxable: "1,353,401.68", vat: "203,010.26" },
  { no: "INV-2026-000037", party: "Rupsha Sweater Ltd", taxable: "571,054.56", vat: "85,658.19" },
  { no: "INV-2026-000038", party: "Jamuna Apparel", taxable: "110,779.2", vat: "16,616.88" },
  { no: "INV-2026-000041", party: "Karnaphuli Fashion", taxable: "12,319.96", vat: "1,847.99" },
  { no: "INV-2026-000042", party: "Teesta International", taxable: "261,265.5", vat: "39,189.82" },
];
const purchases = [
  { no: "BILL-2026-000037", party: "Meghna Inks Ltd", taxable: "128,960", vat: "19,344" },
  { no: "BILL-2026-000038", party: "Bengal Plastics", taxable: "2,238", vat: "335.7" },
  { no: "BILL-2026-000039", party: "Shapla Packaging", taxable: "37,050", vat: "5,557.5" },
  { no: "BILL-2026-000040", party: "City Hardware", taxable: "4,914", vat: "737.1" },
  { no: "BILL-2026-000041", party: "Meghna Inks Ltd", taxable: "43,746", vat: "6,561.9" },
  { no: "BILL-2026-000042", party: "Bay Logistics", taxable: "72,698", vat: "10,904.7" },
  { no: "BILL-2026-000043", party: "Apex Adhesives", taxable: "49,742", vat: "7,461.3" },
];

export async function generateMetadata(): Promise<Metadata> {
  return accountingPageMetadata("vatRegister", "vat-register");
}

function Stat({ label, value, sub, tone }: { label: string; value: string; sub: string; tone: string }) {
  return (
    <div className="rounded-xl border border-border bg-card px-3 py-4 text-center">
      <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className={`mt-1 text-[1.15rem] font-semibold tabular-nums sm:text-[1.5rem] ${tone}`}>{value}</p>
      <p className="mt-0.5 text-[11px] text-muted-foreground">{sub}</p>
    </div>
  );
}

function VatTable({
  title,
  count,
  heads,
  rows,
  vatTone,
  tools,
}: {
  title: string;
  count: string;
  heads: string[];
  rows: { no: string; party: string; taxable: string; vat: string }[];
  vatTone: string;
  tools: { search: string; csv: string; excel: string; print: string };
}) {
  const chip = "inline-flex items-center gap-1 rounded border border-border px-1.5 py-0.5 font-medium text-foreground";
  return (
    <div className="min-w-0">
      <p className="mb-2 text-[13px] font-semibold text-foreground">{title}</p>
      <div className="overflow-hidden rounded-lg border border-border bg-card">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-3 py-2">
          <span className="inline-flex w-28 items-center gap-1.5 rounded-md bg-[var(--gray-bg)] px-2 py-1 text-[11px] text-muted-foreground">
            <Search className="h-3 w-3" /> {tools.search}
          </span>
          <div className="flex items-center gap-1.5 text-[10.5px] text-muted-foreground">
            <span className="me-1">{count}</span>
            <span className={chip}>
              <Download className="h-3 w-3" /> {tools.csv}
            </span>
            <span className={`${chip} hidden sm:inline-flex`}>
              <Download className="h-3 w-3" /> {tools.excel}
            </span>
            <span className={`${chip} hidden md:inline-flex`}>
              <Printer className="h-3 w-3" /> {tools.print}
            </span>
          </div>
        </div>
        <table className="w-full text-[11px]">
          <thead className="bg-[var(--gray-bg)] text-[9.5px] font-semibold uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-2.5 py-2 text-start">{heads[0]}</th>
              <th className="px-2.5 py-2 text-start">{heads[1]}</th>
              <th className="hidden px-2.5 py-2 text-start sm:table-cell">{heads[2]}</th>
              <th className="px-2.5 py-2 text-start">{heads[3]}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.no} className={`border-t border-border ${i % 2 ? "bg-[var(--gray-bg)]/50" : ""}`}>
                <td className="px-2.5 py-2 font-mono text-[10px] text-foreground">{r.no}</td>
                <td className="max-w-[7rem] truncate px-2.5 py-2 text-foreground">{r.party}</td>
                <td className="hidden px-2.5 py-2 tabular-nums text-foreground sm:table-cell">BDT {r.taxable}</td>
                <td className={`px-2.5 py-2 tabular-nums ${vatTone}`}>BDT {r.vat}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function DateBox({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] text-muted-foreground">{label}</p>
      <div className="mt-0.5 flex items-center gap-2 rounded-md border border-border bg-[var(--gray-bg)] px-2.5 py-1.5 font-mono text-[11px] text-foreground">
        {value} <Calendar className="h-3 w-3 text-muted-foreground" aria-hidden="true" />
      </div>
    </div>
  );
}

export default function VatRegisterPage() {
  const content = useTemplateContent("vatRegister");
  const { t: common } = useCommon();
  const { ui } = content;
  const tools = { search: common("search"), csv: common("csv"), excel: common("excel"), print: common("print") };

  const body: ReactNode = (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <p className="text-lg font-semibold text-foreground">{ui.title}</p>
        <div className="flex items-end gap-2">
          <DateBox label={ui.from} value="01/31/2026" />
          <DateBox label={ui.to} value="11/29/2026" />
          <span className="inline-flex items-center gap-1 rounded-md border border-border bg-card px-2 py-1.5 text-[11.5px] font-medium text-foreground">
            <RefreshCw className="h-3 w-3" /> {common("refresh")}
          </span>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <Stat label={ui.outputVat} value="BDT 2,549,490.41" sub={ui.invoices} tone="text-[var(--teal)]" />
        <Stat label={ui.inputVat} value="BDT 586,511.55" sub={ui.bills} tone="text-destructive" />
        <Stat label={ui.netPayable} value="BDT 1,962,978.86" sub={ui.toPay} tone="text-amber-500" />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <VatTable
          title={ui.outputTitle}
          count={ui.outputCount}
          heads={[ui.thInvoice, ui.thCustomer, ui.thTaxable, ui.thVat]}
          rows={sales}
          vatTone="text-[var(--teal)]"
          tools={tools}
        />
        <div className="hidden lg:block">
          <VatTable
            title={ui.inputTitle}
            count={ui.inputCount}
            heads={[ui.thBill, ui.thVendor, ui.thTaxable, ui.thVat]}
            rows={purchases}
            vatTone="text-destructive"
            tools={tools}
          />
        </div>
      </div>
    </div>
  );

  return (
    <TemplatePage
      slug="vat-register"
      prefix="vr"
      appName="VAT Register"
      features={[
        "Output VAT from sales invoices and input VAT from supplier bills, side by side",
        "A date range for the period, with totals for VAT charged, VAT paid and net VAT payable",
        "Invoice or bill number, party, taxable amount and VAT on every line",
        "Search, CSV and Excel export, print on each table",
      ]}
      content={content}
      stepTones={["teal", "red", "amber"]}
      connectStructure={[
        { key: "before", tools: ["invoicesAr", "billsAp", "purchaseOrders"] },
        { key: "after", tools: ["financialReports", "closingFy"] },
        { key: "shows", tools: ["accountingHub", "ledgers"] },
      ]}
      localIcons={[Percent, FileText, Receipt, CalendarClock]}
      preview={<TemplatePreview prefix="vr" toolKey="vatRegister" content={content} cols={[]} rows={[]} body={body} />}
    />
  );
}
