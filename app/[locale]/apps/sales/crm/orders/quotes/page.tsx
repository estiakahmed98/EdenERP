/**
 * Adon ERP public site: /apps/sales/crm/orders/quotes
 * Copy lives in messages/*.json under pages.accountingShowcase.crQuotesPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { ArrowRight, FileText, Percent, Send } from "lucide-react";

import { Chip, HR_COMPANY, HrPage, hrMetadata, type HrTone } from "../../../../human-resources/_hr";

const list: [string, string, number, HrTone][] = [
  ["QUO-2026-00005", "stSent", 17890, "primary"],
  ["QUO-2026-00004", "stDraft", 28794, "muted"],
  ["QUO-2026-00003", "stAccepted", 193883, "teal"],
  ["QUO-2026-00002", "stDraft", 217369, "muted"],
];
/** DUMMY data for QUO-2026-00003: [item, quantity, rate in paisa]. Subtotal 1,84,650; VAT 5% 9,233. */
const lines: [string, number, number][] = [
  ["Poly bag PE 26×44 in", 12000, 760],
  ["Zipper poly bag 10×12 in", 18500, 390],
  ["Carton box 3-ply 18×12×10 in", 750, 2840],
];

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("crQuotesPage", "/apps/sales/crm/orders/quotes");
}

export default function QuotesPage() {
  const sub = lines.reduce((a, l) => a + (l[1] * l[2]) / 100, 0);
  const vat = Math.round(sub * 0.05);
  return (
    <HrPage
      section="crQuotesPage"
      path="/apps/sales/crm/orders/quotes"
      prefix="quo"
      appName="Quotes"
      tool="crQuotes"
      group="crOrdersG"
      features={[
        "Quotes from a deal or from scratch, with price lists applied",
        "Draft, sent, accepted and lost, all in one list",
        "VAT and discounts worked out on each line",
        "A PDF in your letterhead, sent from the record",
        "An accepted quote turned into a sales order in one click",
      ]}
      stepTones={["muted", "purple", "teal"]}
      connectStructure={[
        { key: "before", tools: ["crDeals", "crPricing"] },
        { key: "after", tools: ["crSalesOrders", "invoicesAr"] },
        { key: "shows", tools: ["cr360", "crForecast"] },
      ]}
      icons={[FileText, Percent, Send, ArrowRight]}
      render={(ui) => (
        <div className="grid gap-3 lg:grid-cols-12">
          <ul className="space-y-1.5 lg:col-span-4">
            {list.map(([q, st, total, tone], i) => (
              <li key={q} className={`flex items-center justify-between rounded-lg border px-3 py-2 text-[11px] ${i === 2 ? "border-primary bg-primary/5" : "border-border bg-card"}`}>
                <span>
                  <span className="block font-mono text-[10.5px] text-foreground">{q}</span>
                  <span className="block tabular-nums text-muted-foreground">BDT {total.toLocaleString("en-IN")}</span>
                </span>
                <Chip tone={tone}>{ui[st]}</Chip>
              </li>
            ))}
          </ul>
          <div className="rounded-xl border border-border bg-card p-4 lg:col-span-8">
            <div className="flex items-start justify-between border-b border-border pb-2">
              <div>
                <p className="text-[13px] font-bold uppercase tracking-wide text-foreground">{ui.quotation}</p>
                <p className="text-[10px] text-muted-foreground">QUO-2026-00003 · {ui.valid}</p>
              </div>
              <div className="text-end text-[10px] text-muted-foreground">
                <p className="font-semibold text-foreground">{HR_COMPANY}</p>
                <p>{ui.to} Square Fashions Ltd</p>
              </div>
            </div>
            <table className="mt-2 w-full text-[11px]">
              <tbody>
                {lines.map(([item, qty, rate]) => (
                  <tr key={item} className="border-b border-dashed border-border">
                    <td className="py-1.5 text-foreground">{item}</td>
                    <td className="py-1.5 text-end tabular-nums text-muted-foreground">{qty.toLocaleString("en-IN")}</td>
                    <td className="py-1.5 text-end tabular-nums text-muted-foreground">@ {(rate / 100).toFixed(2)}</td>
                    <td className="py-1.5 text-end tabular-nums text-foreground">{((qty * rate) / 100).toLocaleString("en-IN")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <dl className="ms-auto mt-2 w-56 space-y-1 text-[11px]">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">{ui.subtotal}</dt>
                <dd className="tabular-nums text-foreground">{sub.toLocaleString("en-IN")}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">{ui.vat}</dt>
                <dd className="tabular-nums text-foreground">{vat.toLocaleString("en-IN")}</dd>
              </div>
              <div className="flex justify-between border-t border-border pt-1 font-semibold">
                <dt className="text-foreground">{ui.total}</dt>
                <dd className="tabular-nums text-foreground">BDT {(sub + vat).toLocaleString("en-IN")}</dd>
              </div>
            </dl>
            <div className="mt-3 flex justify-end gap-2 text-[11px] font-medium">
              <span className="rounded-md border border-border px-2.5 py-1 text-foreground">PDF</span>
              <span className="btn-gradient inline-flex items-center gap-1 rounded-md px-2.5 py-1">
                {ui.toOrder} <ArrowRight className="h-3 w-3" aria-hidden="true" />
              </span>
            </div>
          </div>
        </div>
      )}
    />
  );
}
