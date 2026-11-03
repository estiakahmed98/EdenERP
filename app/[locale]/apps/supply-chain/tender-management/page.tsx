/**
 * Adon ERP public site: /apps/supply-chain/tender-management
 * Copy lives in messages/*.json under pages.accountingShowcase.scTender.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { Gavel, Trophy, CalendarClock, ScrollText } from "lucide-react";
import { SupplyPage, supplyMetadata } from "../_supply";
import { Card, Bullet, Chip, taka } from "../../budget-management/_budget";

const tenderTone: Record<string, "amber" | "blue" | "teal"> = { evaluating: "amber", open: "blue", awarded: "teal" };

/** DUMMY data: [number, title, status key, bids, date note]. */
const tenders: [string, string, string, number, string][] = [
  ["TND-2026-008", "Raw material supply, 12 months", "open", 2, "closes 11/12/2026"],
  ["TND-2026-007", "Annual packaging material supply", "evaluating", 5, "closed 10/28/2026"],
  ["TND-2026-006", "Factory CCTV and access control", "awarded", 4, "awarded 09/30/2026"],
];
/** DUMMY data: [bidder, technical score out of 100, price in taka]. Weighted 60% technical, 40% price. */
const bids: [string, number, number][] = [
  ["Shapla Packaging", 86, 4120000],
  ["Padma Cartons", 82, 3950000],
  ["Meghna Print & Pack", 78, 3890000],
  ["Karnaphuli Packaging", 74, 3780000],
  ["Surma Paper Mills", 69, 4260000],
];
const lowest = Math.min(...bids.map((b) => b[2]));
const ranked = bids
  .map(([name, tech, price]) => ({ name, tech, price, score: 0.6 * tech + 0.4 * ((lowest / price) * 100) }))
  .sort((a, b) => b.score - a.score);

export async function generateMetadata(): Promise<Metadata> {
  return supplyMetadata("scTender", "/apps/supply-chain/tender-management");
}

export default function TenderManagementPage() {
  return (
    <SupplyPage
      section="scTender"
      path="/apps/supply-chain/tender-management"
      prefix="tm"
      appName="Tender Management"
      tool="scTender"
      features={[
        "Tenders with a number, a title, a status and a closing date",
        "Bids recorded for each tender",
        "Technical and price scores combined into a weighted rank",
        "Open, evaluating and awarded statuses",
        "The winning bid turned into a purchase order",
      ]}
      stepTones={["blue", "amber", "teal"]}
      connectStructure={[
        { key: "before", tools: ["scRequisitions", "scComparative", "vendors"] },
        { key: "after", tools: ["purchaseOrders", "scGoodsReceipts"] },
        { key: "shows", tools: ["scOverview", "financialReports"] },
      ]}
      icons={[Gavel, Trophy, CalendarClock, ScrollText]}
      render={(ui) => (
        <div className="grid gap-3 lg:grid-cols-12">
          <div className="space-y-2.5 lg:col-span-5">
            {tenders.map((t) => (
              <Card key={t[0]}>
                <div className="flex items-start justify-between gap-2">
                  <p className="text-[11.5px] font-semibold leading-tight text-foreground">{t[1]}</p>
                  <Chip tone={tenderTone[t[2]]}>{ui[t[2]]}</Chip>
                </div>
                <p className="mt-1 flex items-center justify-between text-[10px] text-muted-foreground">
                  <span className="font-mono">{t[0]}</span>
                  <span>{t[3]} {ui.bids} · {t[4]}</span>
                </p>
              </Card>
            ))}
          </div>
          <Card title={`${ui.evaluation} · TND-2026-007`} className="lg:col-span-7" right={<span className="text-[10px] text-muted-foreground">{ui.weights}</span>}>
            <ul className="space-y-2.5">
              {ranked.map((b, i) => (
                <li key={b.name} className="grid grid-cols-[1.25rem_1fr_auto] items-center gap-x-2.5 text-[11px]">
                  <span className={`grid h-5 w-5 place-items-center rounded-full text-[10px] font-semibold ${i === 0 ? "bg-[var(--teal)] text-white" : "bg-muted text-muted-foreground"}`}>{i + 1}</span>
                  <span className="min-w-0">
                    <span className="block truncate font-medium text-foreground">{b.name}</span>
                    <span className="mt-1 block"><Bullet pct={b.score} marker={100} /></span>
                  </span>
                  <span className="text-end">
                    <span className="block font-semibold tabular-nums text-foreground">{b.score.toFixed(1)}</span>
                    <span className="block text-[10px] tabular-nums text-muted-foreground">{b.tech} · {taka(b.price / 100000)}</span>
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
