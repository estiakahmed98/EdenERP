/**
 * Adon ERP public site: /apps/sales/crm/dms/secondary-sales
 * Copy lives in messages/*.json under pages.accountingShowcase.crSecondaryPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { ArrowRightLeft, Building, ShoppingBasket, Store } from "lucide-react";

import { Card, Chip, HrPage, Table, hrMetadata, type HrTone } from "../../../../human-resources/_hr";

/** DUMMY data: [sale, distributor, retailer, date, lines, total, status key, tone]. */
const sales: [string, string, string, string, number, number, string, HrTone][] = [
  ["SS-2026-01204", "Rahman Packaging House", "Tongi Poly Corner", "2 Nov", 3, 18650, "stPosted", "teal"],
  ["SS-2026-01203", "Rahman Packaging House", "Station Road Traders", "2 Nov", 2, 9400, "stPosted", "teal"],
  ["SS-2026-01202", "Hossain Enterprise", "Fatullah Store 7", "1 Nov", 4, 22380, "stPosted", "teal"],
  ["SS-2026-01201", "Karim Traders", "Agrabad Box House", "1 Nov", 1, 4200, "stDraft", "muted"],
];
/** The flow, as [step key, figure]. */
const flow: [string, string][] = [
  ["fPrimary", "BDT 48.6 L"],
  ["fDistributor", "BDT 31.2 L"],
  ["fRetailer", "BDT 27.9 L"],
];

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("crSecondaryPage", "/apps/sales/crm/dms/secondary-sales");
}

export default function SecondarySalesPage() {
  return (
    <HrPage
      section="crSecondaryPage"
      path="/apps/sales/crm/dms/secondary-sales"
      prefix="sec"
      appName="Secondary Sales"
      tool="crSecondary"
      group="crDmsG"
      features={[
        "What distributors sell on to retailers, recorded line by line",
        "Posting takes the items out of the distributor's stock",
        "No ledger entry: the primary sale is already booked",
        "Entered by the distributor or by your field rep",
        "Secondary sales by distributor, retailer and item",
      ]}
      stepTones={["purple", "teal", "muted"]}
      connectStructure={[
        { key: "before", tools: ["crSalesOrders", "crDealers"] },
        { key: "after", tools: ["crDistStock", "crSellThrough"] },
        { key: "shows", tools: ["crSecTargets", "crDashboard"] },
      ]}
      icons={[ArrowRightLeft, Building, Store, ShoppingBasket]}
      render={(ui) => (
        <>
          <ol className="grid grid-cols-3 gap-2" aria-hidden="true">
            {flow.map(([k, v], i) => (
              <li key={k} className={`relative rounded-xl px-3 py-2 text-center ${i === 1 ? "bg-primary text-white" : "bg-[var(--gray-bg)]"}`}>
                <p className={`text-[10px] ${i === 1 ? "text-white/80" : "text-muted-foreground"}`}>{ui[k]}</p>
                <p className={`text-[13px] font-semibold tabular-nums ${i === 1 ? "" : "text-foreground"}`}>{v}</p>
              </li>
            ))}
          </ol>
          <Card title={ui.listTitle} right={<Chip tone="primary">{ui.newSale}</Chip>}>
            <Table
              cols={[{ head: ui.thSale }, { head: ui.thDistributor }, { head: ui.thRetailer }, { head: ui.thLines, end: true }, { head: ui.thTotal, end: true }, { head: ui.thStatus, end: true }]}
              rows={sales.map(([no, dist, ret, date, lines, total, st, tone]) => [
                <span key="n">
                  <span className="block font-mono text-[10.5px]">{no}</span>
                  <span className="block text-[9.5px] text-muted-foreground">{date}</span>
                </span>,
                dist,
                <span key="r" className="text-muted-foreground">{ret}</span>,
                lines,
                total.toLocaleString("en-IN"),
                <Chip key="s" tone={tone}>{ui[st]}</Chip>,
              ])}
            />
          </Card>
        </>
      )}
    />
  );
}
