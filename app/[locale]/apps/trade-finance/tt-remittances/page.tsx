/**
 * Adon ERP public site: /apps/trade-finance/tt-remittances
 * Copy lives in messages/*.json under pages.accountingShowcase.tfTtPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { ArrowDownToLine, Clock, Landmark, Scale } from "lucide-react";

import { Card, Chip, HrPage, Stat, hrMetadata, type HrTone } from "../../human-resources/_hr";

const tabs = ["tRegister", "tAdvances", "tRealisation"];
/** DUMMY data: [invoice, buyer, shipped, days since shipment, invoiced USD, realised USD]. */
const invoices: [string, string, string, number, number, number][] = [
  ["CI-2026-0142", "Jubair Knitwear", "12 Jul", 114, 15000, 6000],
  ["CI-2026-0151", "Viyellatex Group", "28 Jul", 98, 18500, 18500],
  ["CI-2026-0163", "Hameem Group", "19 Aug", 76, 22400, 4400],
  ["CI-2026-0170", "Babylon Group", "3 Sep", 61, 9800, 0],
];

function state(days: number, open: number): { tone: HrTone; key: string } {
  if (open === 0) return { tone: "teal", key: "sRealised" };
  if (days > 120) return { tone: "red", key: "sOverdue" };
  if (days >= 105) return { tone: "brown", key: "sDueSoon" };
  return { tone: "primary", key: "sOpen" };
}

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("tfTtPage", "/apps/trade-finance/tt-remittances");
}

export default function TtRemittancesPage() {
  return (
    <HrPage
      section="tfTtPage"
      path="/apps/trade-finance/tt-remittances"
      prefix="tt"
      appName="TT Remittances"
      tool="tfTt"
      group="tf"
      features={[
        "Telegraphic transfers in and out, with bank advice and SWIFT reference",
        "Advances held as a liability until the goods ship",
        "Advances applied to the invoice at shipment",
        "A 120-day realisation clock on every foreign-currency invoice",
        "Gross, bank charges, net and the rate on each TT",
      ]}
      stepTones={["purple", "teal", "red"]}
      connectStructure={[
        { key: "before", tools: ["tfContracts", "bankAccounts"] },
        { key: "after", tools: ["tfShipments", "receipts"] },
        { key: "shows", tools: ["tfPapers", "exchangeRates"] },
      ]}
      icons={[ArrowDownToLine, Scale, Clock, Landmark]}
      render={(ui) => (
        <>
          <nav className="flex gap-4 border-b border-border text-[11px]" aria-hidden="true">
            {tabs.map((t, i) => (
              <span key={t} className={`-mb-px border-b-2 pb-1.5 ${i === 2 ? "border-primary font-semibold text-primary" : "border-transparent text-muted-foreground"}`}>
                {ui[t]}
              </span>
            ))}
          </nav>
          <div className="grid gap-2 sm:grid-cols-4">
            <Stat label={ui.openInvoices} value="3" tone="primary" />
            <Stat label={ui.openProceeds} value="USD 36,800" tone="sky" />
            <Stat label={ui.dueSoon} value="1" tone="brown" />
            <Stat label={ui.overdue} value="0" tone="red" />
          </div>
          <Card title={ui.clockTitle}>
            <ul className="space-y-2.5">
              {invoices.map(([inv, buyer, shipped, days, total, done]) => {
                const s = state(days, total - done);
                return (
                  <li key={inv} className="grid items-center gap-x-3 gap-y-1 text-[11px] sm:grid-cols-[9rem_1fr_7rem_5.5rem]">
                    <span className="min-w-0">
                      <span className="block font-mono text-[10.5px] text-foreground">{inv}</span>
                      <span className="block truncate text-[10px] text-muted-foreground">
                        {buyer} · {shipped}
                      </span>
                    </span>
                    <span className="relative block h-2.5 rounded-full bg-muted" aria-hidden="true">
                      <span className={`block h-2.5 rounded-full ${s.key === "sDueSoon" ? "bg-[var(--chart-4)]" : s.key === "sRealised" ? "bg-[var(--teal)]" : "bg-primary"}`} style={{ width: `${Math.min(100, (days / 120) * 100)}%` }} />
                    </span>
                    <span className="text-end tabular-nums text-muted-foreground">
                      {days} / 120 {ui.days}
                    </span>
                    <span className="text-end">
                      <Chip tone={s.tone}>{ui[s.key]}</Chip>
                    </span>
                  </li>
                );
              })}
            </ul>
            <p className="mt-3 border-t border-border pt-2 text-[10px] text-muted-foreground">{ui.clockNote}</p>
          </Card>
        </>
      )}
    />
  );
}
