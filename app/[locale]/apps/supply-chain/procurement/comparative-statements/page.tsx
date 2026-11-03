/**
 * Adon ERP public site: /apps/supply-chain/procurement/comparative-statements
 * Copy lives in messages/*.json under pages.accountingShowcase.scComparative.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { Scale, Trophy, CalendarClock, FileCheck } from "lucide-react";
import { SupplyPage, supplyMetadata } from "../../_supply";
import { Card, Avatar, Chip, taka } from "../../../budget-management/_budget";

/** DUMMY data: [supplier, payment terms, delivery]. */
const quotes: [string, string, string][] = [
  ["Gulf Petrochem FZE", "60 days LC", "25 days"],
  ["Bengal Plastics", "30 days", "10 days"],
  ["Polymer Corp BD", "45 days", "14 days"],
];
/** DUMMY data: [item, quantity in kg, rate per kg for each supplier]. */
const items: [string, number, number[]][] = [
  ["PP granules", 15000, [118, 124, 121]],
  ["White masterbatch", 2000, [210, 205, 215]],
  ["Black masterbatch", 3000, [198, 202, 195]],
];
const totals = quotes.map((_, i) => items.reduce((a, it) => a + it[1] * it[2][i], 0));
const best = totals.indexOf(Math.min(...totals));

export async function generateMetadata(): Promise<Metadata> {
  return supplyMetadata("scComparative", "/apps/supply-chain/procurement/comparative-statements");
}

export default function ComparativeStatementsPage() {
  return (
    <SupplyPage
      section="scComparative"
      path="/apps/supply-chain/procurement/comparative-statements"
      prefix="cs"
      appName="Comparative Statements"
      tool="scComparative"
      features={[
        "Quotations from several suppliers side by side, item by item",
        "The lowest rate on each item highlighted",
        "Totals, payment terms and delivery days for each supplier",
        "A recommended supplier with the reason",
        "Approval of the comparison before an order is raised",
      ]}
      stepTones={["blue", "teal", "amber"]}
      connectStructure={[
        { key: "before", tools: ["scRequisitions", "vendors"] },
        { key: "after", tools: ["scTender", "purchaseOrders", "scGoodsReceipts"] },
        { key: "shows", tools: ["scOverview", "billsAp"] },
      ]}
      icons={[Scale, Trophy, CalendarClock, FileCheck]}
      render={(ui) => (
        <>
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[30rem] text-[11px]">
                <thead>
                  <tr className="text-start text-[10px] text-muted-foreground">
                    <th className="pb-2 pe-3 text-start font-semibold">{ui.thItem}</th>
                    {quotes.map((q, i) => (
                      <th key={q[0]} className="pb-2 pe-2 text-start font-semibold">
                        <span className="flex items-center gap-1.5 text-foreground">
                          <Avatar name={q[0]} tone={i} />
                          <span className="leading-tight">{q[0]}</span>
                        </span>
                        {i === best && <span className="mt-1 inline-block"><Chip tone="teal">{ui.recommended}</Chip></span>}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {items.map((it) => {
                    const lowest = Math.min(...it[2]);
                    return (
                      <tr key={it[0]} className="border-t border-border">
                        <td className="py-2 pe-3">
                          <span className="block font-medium text-foreground">{it[0]}</span>
                          <span className="text-[10px] text-muted-foreground">{it[1].toLocaleString("en-IN")} kg</span>
                        </td>
                        {it[2].map((rate, i) => (
                          <td key={i} className="py-2 pe-2">
                            <span className={`inline-block rounded-md px-1.5 py-0.5 tabular-nums ${rate === lowest ? "bg-[var(--teal)]/15 font-semibold text-[var(--teal)]" : "text-foreground"}`}>{rate}</span>
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                  <tr className="border-t border-border">
                    <td className="py-2 pe-3 font-semibold text-foreground">{ui.total}</td>
                    {totals.map((t, i) => (
                      <td key={i} className={`py-2 pe-2 tabular-nums font-semibold ${i === best ? "text-[var(--teal)]" : "text-foreground"}`}>{taka(t / 100000)}</td>
                    ))}
                  </tr>
                  <tr className="border-t border-border text-muted-foreground">
                    <td className="py-1.5 pe-3">{ui.payment}</td>
                    {quotes.map((q) => (
                      <td key={q[0]} className="py-1.5 pe-2">{q[1]}</td>
                    ))}
                  </tr>
                  <tr className="border-t border-border text-muted-foreground">
                    <td className="py-1.5 pe-3">{ui.delivery}</td>
                    {quotes.map((q) => (
                      <td key={q[0]} className="py-1.5 pe-2">{q[2]}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
          <Card>
            <p className="text-[11px] text-muted-foreground">{ui.decisionLabel}</p>
            <p className="mt-0.5 text-[13px] font-semibold text-foreground">{quotes[best][0]}</p>
            <p className="mt-1 text-[10.5px] leading-snug text-muted-foreground">{ui.decisionWhy}</p>
            <p className="mt-2.5 flex flex-wrap gap-1.5 text-[11px] font-medium">
              <span className="btn-gradient rounded-lg px-3 py-1">{ui.approveRaise}</span>
              <span className="rounded-lg border border-border px-3 py-1 text-foreground">{ui.sendTender}</span>
            </p>
          </Card>
        </>
      )}
    />
  );
}
