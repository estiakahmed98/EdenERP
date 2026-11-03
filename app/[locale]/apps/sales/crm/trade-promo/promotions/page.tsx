/**
 * Adon ERP public site: /apps/sales/crm/trade-promo/promotions
 * Copy lives in messages/*.json under pages.accountingShowcase.crPromotionsPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { Megaphone, PiggyBank, Target, TrendingUp } from "lucide-react";

import { Bar, Chip, HrPage, Stat, hrMetadata, type HrTone } from "../../../../human-resources/_hr";

/** DUMMY data: [code, name, type key, budget lakh, spent lakh, extra sales lakh, status key, tone]. */
const promos: [string, string, string, number, number, number, string, HrTone][] = [
  ["TP-26-07", "Winter carton push", "tVolume", 6, 3.1, 24.8, "stActive", "teal"],
  ["TP-26-06", "Retailer display drive", "tDisplay", 4, 3.8, 11.4, "stActive", "teal"],
  ["TP-26-05", "Puja season poly bags", "tSeasonal", 3, 3, 7.2, "stSettled", "muted"],
];

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("crPromotionsPage", "/apps/sales/crm/trade-promo/promotions");
}

export default function PromotionsPage() {
  return (
    <HrPage
      section="crPromotionsPage"
      path="/apps/sales/crm/trade-promo/promotions"
      prefix="promo"
      appName="Promotions"
      tool="crPromotions"
      group="crPromoG"
      features={[
        "Budgeted trade promotions with dates, channels and items",
        "Budget, claimed and settled for each promotion",
        "Utilisation shown before the budget runs out",
        "Return on spend from the extra sales it brought",
        "Claims from distributors checked against the promotion's rules",
      ]}
      stepTones={["purple", "teal", "muted"]}
      connectStructure={[
        { key: "before", tools: ["crSchemes", "bmLines"] },
        { key: "after", tools: ["crClaims", "crRebates"] },
        { key: "shows", tools: ["crDashboard", "financialReports"] },
      ]}
      icons={[Megaphone, PiggyBank, Target, TrendingUp]}
      render={(ui) => (
        <>
          <div className="grid gap-2 sm:grid-cols-5">
            <Stat label={ui.kPromotions} value="3" tone="navy" />
            <Stat label={ui.kActive} value="2" tone="teal" />
            <Stat label={ui.kBudget} value="13 L" tone="primary" />
            <Stat label={ui.kClaimed} value="9.9 L" tone="brown" />
            <Stat label={ui.kSettled} value="3 L" tone="red" />
          </div>
          <div className="grid gap-2.5 md:grid-cols-3">
            {promos.map(([code, name, type, budget, spent, extra, st, tone]) => {
              const used = Math.round((spent / budget) * 100);
              const roi = (extra / spent).toFixed(1);
              return (
                <div key={code} className="rounded-xl border border-border bg-card p-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-muted-foreground">{code}</span>
                    <Chip tone={tone}>{ui[st]}</Chip>
                  </div>
                  <p className="mt-1 text-[12px] font-semibold text-foreground">{name}</p>
                  <Chip tone="navy">{ui[type]}</Chip>
                  <p className="mt-2.5 flex justify-between text-[10px] text-muted-foreground">
                    <span>
                      {spent} L / {budget} L
                    </span>
                    <span>{used}%</span>
                  </p>
                  <Bar pct={used} tone={used > 90 ? "red" : "primary"} />
                  <p className="mt-2.5 flex items-baseline justify-between border-t border-border pt-2">
                    <span className="text-[10px] text-muted-foreground">{ui.roi}</span>
                    <span className="text-[16px] font-semibold tabular-nums text-[var(--teal)]">{roi}×</span>
                  </p>
                </div>
              );
            })}
          </div>
        </>
      )}
    />
  );
}
