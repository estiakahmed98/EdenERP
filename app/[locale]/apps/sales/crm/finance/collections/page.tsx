/**
 * Adon ERP public site: /apps/sales/crm/finance/collections
 * Copy lives in messages/*.json under pages.accountingShowcase.crCollectionsPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { Banknote, CalendarClock, Smartphone, Wallet } from "lucide-react";

import { Card, Chip, HrPage, Legend, Ring, hrMetadata } from "../../../../human-resources/_hr";

/** DUMMY data: collections this month by mode, in lakh. Total 86.4. */
const modes: [string, number][] = [
  ["mBank", 41.2],
  ["mCheque", 26.5],
  ["mMobile", 11.3],
  ["mCash", 7.4],
];
/** Receivables by age, in lakh. */
const aging: [string, number][] = [
  ["0–30", 58.4],
  ["31–60", 21.7],
  ["61–90", 9.6],
  ["90+", 4.3],
];
const promises: [string, string, string][] = [
  ["Mondol Group", "BDT 8,00,000", "5 Nov"],
  ["Karim Traders", "BDT 1,50,000", "7 Nov"],
];

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("crCollectionsPage", "/apps/sales/crm/finance/collections");
}

export default function CollectionsPage() {
  const max = Math.max(...aging.map((a) => a[1]));
  return (
    <HrPage
      section="crCollectionsPage"
      path="/apps/sales/crm/finance/collections"
      prefix="coll"
      appName="Collections"
      tool="crCollections"
      group="crFinanceG"
      features={[
        "Payments by bank transfer, cheque, mobile money and cash",
        "Collected against invoices, oldest first",
        "Receivables by age for every rep and every customer",
        "Promises to pay, with a reminder on the day",
        "Cash handed over by reps reconciled to receipts",
      ]}
      stepTones={["purple", "teal", "red"]}
      connectStructure={[
        { key: "before", tools: ["invoicesAr", "crCredit"] },
        { key: "after", tools: ["receipts", "chequeRegister", "bankReconciliation"] },
        { key: "shows", tools: ["arApAging", "crCommissions"] },
      ]}
      icons={[Wallet, Banknote, Smartphone, CalendarClock]}
      render={(ui) => (
        <div className="grid gap-3 lg:grid-cols-12">
          <Card className="lg:col-span-5" title={ui.byMode}>
            <div className="flex items-center gap-4">
              <Ring values={modes.map((m) => m[1])} centre="86.4L" caption={ui.thisMonth} size={96} />
              <div className="space-y-1.5">
                <Legend items={modes.map(([k]) => ui[k])} />
              </div>
            </div>
          </Card>
          <Card className="lg:col-span-7" title={ui.aging}>
            <div className="flex h-24 items-end gap-3" aria-hidden="true">
              {aging.map(([b, v], i) => (
                <div key={b} className="flex flex-1 flex-col items-center gap-1">
                  <span className="text-[9.5px] tabular-nums text-muted-foreground">{v}L</span>
                  <span className={`w-full rounded-t ${i >= 2 ? "bg-destructive/80" : "bg-primary"}`} style={{ height: `${(v / max) * 70}px` }} />
                </div>
              ))}
            </div>
            <div className="mt-1 flex gap-3 text-center text-[10px] text-muted-foreground">
              {aging.map(([b]) => (
                <span key={b} className="flex-1">
                  {b} {ui.d}
                </span>
              ))}
            </div>
            <ul className="mt-3 space-y-1 border-t border-border pt-2">
              {promises.map(([c, amt, d]) => (
                <li key={c} className="flex items-center justify-between text-[11px]">
                  <span className="text-foreground">{c}</span>
                  <span className="flex items-center gap-2">
                    <span className="tabular-nums text-muted-foreground">{amt}</span>
                    <Chip tone="brown">
                      {ui.promised} {d}
                    </Chip>
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      )}
    />
  );
}
