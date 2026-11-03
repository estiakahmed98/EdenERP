/**
 * Adon ERP public site: /apps/sales/crm/accounts/account-plans
 * Copy lives in messages/*.json under pages.accountingShowcase.crPlansPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { Grid2x2, Goal, Map as MapIcon, Users } from "lucide-react";

import { Bar, Card, Chip, HrPage, hrMetadata } from "../../../../human-resources/_hr";

const products = ["Carton 3-ply", "Carton 5-ply", "Poly bag", "Zipper bag", "Back board"];
const divisions = ["Knit", "Woven", "Denim", "Sweater"];
/** Whitespace: s = sold today, o = open opportunity, blank = not yet. Rows follow divisions. */
const grid = ["ssos ", "s o  ", "so  o", "  o  "];
const goals: [string, number][] = [
  ["Grow yearly revenue to BDT 2.5 Cr", 74],
  ["Win the denim division's poly bags", 40],
  ["Become second supplier for 5-ply", 15],
];

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("crPlansPage", "/apps/sales/crm/accounts/account-plans");
}

export default function AccountPlansPage() {
  return (
    <HrPage
      section="crPlansPage"
      path="/apps/sales/crm/accounts/account-plans"
      prefix="aplan"
      appName="Account Plans"
      tool="crPlans"
      group="crAccountsG"
      features={[
        "A yearly plan for each key account, with goals and progress",
        "A whitespace grid: what each division buys, and what it could",
        "Stakeholders and how strong each relationship is",
        "Actions with owners and dates, tracked to done",
        "A visit rhythm set by account tier",
      ]}
      stepTones={["purple", "teal", "muted"]}
      connectStructure={[
        { key: "before", tools: ["cr360", "crContacts"] },
        { key: "after", tools: ["crDeals", "crVisits", "crPlaybook"] },
        { key: "shows", tools: ["crRelationships", "crScorecard"] },
      ]}
      icons={[Goal, Grid2x2, Users, MapIcon]}
      render={(ui) => (
        <div className="grid gap-3 lg:grid-cols-12">
          <Card className="lg:col-span-7" title={`${ui.whitespace} · Ananta Apparels`}>
            <div className="overflow-x-auto">
              <div className="grid min-w-[26rem] grid-cols-[4.5rem_repeat(5,1fr)] gap-1 text-[10px]">
                <span />
                {products.map((p) => (
                  <span key={p} className="text-center text-[9.5px] font-semibold text-muted-foreground">
                    {p}
                  </span>
                ))}
                {divisions.map((d, r) => (
                  <div key={d} className="contents">
                    <span className="self-center font-medium text-foreground">{d}</span>
                    {grid[r].split("").map((c, i) => (
                      <span
                        key={i}
                        className={`grid h-7 place-items-center rounded text-[9.5px] font-semibold ${
                          c === "s" ? "bg-[var(--teal)] text-white" : c === "o" ? "bg-primary/15 text-primary ring-1 ring-primary/40" : "bg-[var(--gray-bg)] text-muted-foreground"
                        }`}
                      >
                        {c === "s" ? ui.sold : c === "o" ? ui.open : "—"}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </Card>
          <Card className="lg:col-span-5" title={ui.goals} right={<Chip tone="navy">FY 2026-27</Chip>}>
            <ul className="space-y-3">
              {goals.map(([g, pct]) => (
                <li key={g} className="text-[11px]">
                  <p className="flex justify-between gap-2">
                    <span className="text-foreground">{g}</span>
                    <span className="tabular-nums text-muted-foreground">{pct}%</span>
                  </p>
                  <span className="mt-1 block">
                    <Bar pct={pct} tone={pct > 60 ? "teal" : "primary"} />
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
