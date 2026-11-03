/**
 * Adon ERP public site: /apps/sales/crm/dms/market-returns
 * Copy lives in messages/*.json under pages.accountingShowcase.crMarketReturnsPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { PackageX, RotateCcw, ScanSearch, Undo2 } from "lucide-react";

import { Card, Chip, HrPage, hrMetadata, type HrTone } from "../../../../human-resources/_hr";

/** DUMMY data: [reason key, pieces this month]. */
const reasons: [string, number][] = [
  ["rDamp", 1840],
  ["rCrushed", 1120],
  ["rPrint", 640],
  ["rExpired", 300],
];
/** DUMMY data: [return, retailer, via distributor, pieces, decision key, tone]. */
const rows: [string, string, string, string, string, HrTone][] = [
  ["MR-2026-0211", "Tongi Poly Corner", "Rahman Packaging", "420", "dReplace", "teal"],
  ["MR-2026-0212", "Agrabad Box House", "Karim Traders", "180", "dCredit", "primary"],
  ["MR-2026-0213", "Fatullah Store 7", "Hossain Enterprise", "60", "dReject", "red"],
];

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("crMarketReturnsPage", "/apps/sales/crm/dms/market-returns");
}

export default function MarketReturnsPage() {
  const total = reasons.reduce((a, r) => a + r[1], 0);
  return (
    <HrPage
      section="crMarketReturnsPage"
      path="/apps/sales/crm/dms/market-returns"
      prefix="mret"
      appName="Market Returns"
      tool="crMarketReturns"
      group="crDmsG"
      features={[
        "Damaged and unsold goods coming back from the market",
        "A reason for every return, by retailer and distributor",
        "Replace, credit or reject, decided after inspection",
        "Returned goods added back to the distributor's stock or written off",
        "Return rate by item, area and month",
      ]}
      stepTones={["muted", "purple", "teal"]}
      connectStructure={[
        { key: "before", tools: ["crSecondary", "crDistStock"] },
        { key: "after", tools: ["crClaims", "crReturns"] },
        { key: "shows", tools: ["crSellThrough", "crDashboard"] },
      ]}
      icons={[Undo2, ScanSearch, RotateCcw, PackageX]}
      render={(ui) => (
        <div className="grid gap-3 lg:grid-cols-12">
          <Card className="lg:col-span-5" title={ui.byReason} right={<Chip tone="muted">{total.toLocaleString("en-IN")} {ui.pcs}</Chip>}>
            <div className="flex h-5 overflow-hidden rounded-md" aria-hidden="true">
              {reasons.map(([k, n], i) => (
                <span key={k} style={{ width: `${(n / total) * 100}%`, background: ["var(--destructive)", "var(--chart-4)", "var(--primary)", "var(--chart-5)"][i] }} />
              ))}
            </div>
            <ul className="mt-3 space-y-1.5">
              {reasons.map(([k, n], i) => (
                <li key={k} className="flex items-center justify-between text-[11px]">
                  <span className="flex items-center gap-1.5 text-foreground">
                    <span className="h-2 w-2 rounded-sm" style={{ background: ["var(--destructive)", "var(--chart-4)", "var(--primary)", "var(--chart-5)"][i] }} aria-hidden="true" />
                    {ui[k]}
                  </span>
                  <span className="tabular-nums text-muted-foreground">{Math.round((n / total) * 100)}%</span>
                </li>
              ))}
            </ul>
          </Card>
          <Card className="lg:col-span-7" title={ui.listTitle}>
            <ul className="space-y-2">
              {rows.map(([no, ret, dist, pcs, dec, tone]) => (
                <li key={no} className="flex items-center gap-3 rounded-lg border border-border px-3 py-2 text-[11px]">
                  <span className="min-w-0 flex-1">
                    <span className="block text-foreground">
                      <span className="font-mono text-[10.5px]">{no}</span> · {ret}
                    </span>
                    <span className="block text-[10px] text-muted-foreground">
                      {ui.via} {dist} · {pcs} {ui.pcs}
                    </span>
                  </span>
                  <Chip tone={tone}>{ui[dec]}</Chip>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      )}
    />
  );
}
