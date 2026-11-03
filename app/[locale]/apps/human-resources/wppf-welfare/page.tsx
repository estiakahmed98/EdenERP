/**
 * Adon ERP public site: /apps/human-resources/wppf-welfare
 * Copy lives in messages/*.json under pages.accountingShowcase.hrWppfPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { HeartHandshake, Landmark, PieChart, Users } from "lucide-react";

import { Card, Chip, HrPage, Legend, Ring, Stat, bdt, hrMetadata } from "../_hr";

/** DUMMY data: net profit for the year and the 5% set aside, split 80 / 10 / 10. */
const profit = 84000000;
const fund = profit * 0.05;
const split: [string, number][] = [
  ["participation", 80],
  ["welfare", 10],
  ["foundation", 10],
];
const eligible = 186;

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("hrWppfPage", "/apps/human-resources/wppf-welfare");
}

export default function WppfPage() {
  return (
    <HrPage
      section="hrWppfPage"
      path="/apps/human-resources/wppf-welfare"
      prefix="wppf"
      appName="WPPF & Welfare"
      tool="hrWppf"
      group="statutory"
      features={[
        "The workers' share of net profit worked out at year end",
        "The fund split between participation, welfare and the foundation",
        "Eligible workers picked by length of service",
        "Equal shares for eligible workers, paid or held as the policy says",
        "A journal entry for the provision and the payment",
      ]}
      stepTones={["purple", "teal", "muted"]}
      connectStructure={[
        { key: "before", tools: ["financialReports", "hrServiceRecords"] },
        { key: "after", tools: ["bankAccounts", "journalEntries"] },
        { key: "shows", tools: ["hrReports", "epPf"] },
      ]}
      icons={[PieChart, Users, HeartHandshake, Landmark]}
      render={(ui) => (
        <>
          <div className="grid gap-2 sm:grid-cols-3">
            <Stat label={ui.profit} value={bdt(profit)} sub={ui.year} tone="navy" />
            <Stat label={ui.fund} value={bdt(fund)} sub={ui.fivePct} tone="primary" />
            <Stat label={ui.perWorker} value={bdt((fund * 0.8 * 2) / 3 / eligible)} sub={`${eligible} ${ui.eligible}`} tone="teal" />
          </div>
          <Card title={ui.splitTitle}>
            <div className="flex flex-wrap items-center gap-6">
              <Ring values={split.map((s) => s[1])} centre={bdt(fund / 100000).replace("BDT ", "") + "L"} caption={ui.fundShort} />
              <div className="min-w-0 flex-1 space-y-2">
                {split.map(([k, pct]) => (
                  <div key={k} className="flex items-center justify-between gap-3 text-[11px]">
                    <span className="text-foreground">{ui[k]}</span>
                    <span className="flex items-center gap-2">
                      <Chip tone="muted">{pct}%</Chip>
                      <span className="w-28 text-end tabular-nums text-foreground">{bdt((fund * pct) / 100)}</span>
                    </span>
                  </div>
                ))}
                <div className="pt-1">
                  <Legend items={split.map(([k]) => ui[k])} />
                </div>
              </div>
            </div>
            <p className="mt-3 rounded-lg bg-[var(--gray-bg)] px-3 py-2 text-[10.5px] text-muted-foreground">{ui.note}</p>
          </Card>
        </>
      )}
    />
  );
}
