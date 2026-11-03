/**
 * Adon ERP public site: /apps/sales/crm/insights/targets
 * Copy lives in messages/*.json under pages.accountingShowcase.crTargetsPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { CalendarRange, Crosshair, Trophy, Users } from "lucide-react";

import { Avatar, Card, Chip, HrPage, hrMetadata } from "../../../../human-resources/_hr";

/** DUMMY data: [rep, territory, target in lakh, achieved in lakh]. 20 of 31 days gone (65%). */
const reps: [string, string, number, number][] = [
  ["Ashraful", "Uttara", 18, 16.4],
  ["Rasel mia", "Gazipur", 22, 14.1],
  ["Pranto", "Uttara–Tongi", 12, 9.8],
  ["Hasnat", "Airport Road", 10, 4.2],
  ["Riad", "Gazipur", 14, 7.9],
];
const elapsed = 65;

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("crTargetsPage", "/apps/sales/crm/insights/targets");
}

export default function TargetsPage() {
  return (
    <HrPage
      section="crTargetsPage"
      path="/apps/sales/crm/insights/targets"
      prefix="tgt"
      appName="Targets"
      tool="crTargets"
      group="crInsightsG"
      features={[
        "Targets by rep, territory, region and item group",
        "Monthly, quarterly or yearly periods",
        "Achievement from invoices, orders or won deals, as you choose",
        "Where each rep should be by today",
        "Targets rolled up the sales tree automatically",
      ]}
      stepTones={["purple", "teal", "muted"]}
      connectStructure={[
        { key: "before", tools: ["crOrg", "bmLines"] },
        { key: "after", tools: ["crScorecard", "crCommissions"] },
        { key: "shows", tools: ["crDashboard", "crForecast"] },
      ]}
      icons={[Crosshair, Users, CalendarRange, Trophy]}
      render={(ui) => (
        <Card title={ui.period} right={<Chip tone="muted">{ui.elapsed}</Chip>}>
          <ul className="space-y-2.5">
            {reps.map(([rep, area, target, done], i) => {
              const pct = Math.round((done / target) * 100);
              const ahead = pct >= elapsed;
              return (
                <li key={rep} className="grid items-center gap-3 text-[11px] sm:grid-cols-[9rem_1fr_7rem]">
                  <span className="flex items-center gap-2">
                    <Avatar name={rep} size={22} tone={i} />
                    <span className="min-w-0">
                      <span className="block truncate font-medium text-foreground">{rep}</span>
                      <span className="block truncate text-[10px] text-muted-foreground">{area}</span>
                    </span>
                  </span>
                  <span className="relative block h-3 rounded-full bg-muted" aria-hidden="true">
                    <span className={`block h-3 rounded-full ${ahead ? "bg-[var(--teal)]" : "bg-[var(--chart-4)]"}`} style={{ width: `${pct}%` }} />
                    <span className="absolute -top-1 h-5 w-0.5 bg-foreground/70" style={{ left: `${elapsed}%` }} />
                  </span>
                  <span className="flex items-center justify-end gap-2">
                    <span className="tabular-nums text-muted-foreground">
                      {done}/{target} L
                    </span>
                    <Chip tone={ahead ? "teal" : "brown"}>{pct}%</Chip>
                  </span>
                </li>
              );
            })}
          </ul>
          <p className="mt-3 border-t border-border pt-2 text-[10px] text-muted-foreground">{ui.legend}</p>
        </Card>
      )}
    />
  );
}
