/**
 * Adon ERP public site: /apps/sales/crm/insights/relationships
 * Copy lives in messages/*.json under pages.accountingShowcase.crRelationshipsPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { HeartHandshake, Network, ShieldAlert, UsersRound } from "lucide-react";

import { Avatar, Card, Chip, HrPage, hrMetadata, type HrTone } from "../../../../human-resources/_hr";

/** DUMMY data: stakeholders around one account as [name, role key, strength 1-3, x %, y %]. */
const people: [string, string, number, number, number][] = [
  ["Imran Hossain", "rOwner", 1, 50, 14],
  ["Najim Uddin", "rMerch", 3, 18, 48],
  ["Tahmina Haque", "rQa", 2, 82, 48],
  ["Shirin Akter", "rAccounts", 3, 30, 84],
  ["Rahman Kabir", "rProduction", 1, 70, 84],
];
const strengthTone: Record<number, HrTone> = { 1: "red", 2: "brown", 3: "teal" };
const strengthLine: Record<number, string> = { 1: "var(--destructive)", 2: "var(--chart-4)", 3: "var(--teal)" };

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("crRelationshipsPage", "/apps/sales/crm/insights/relationships");
}

export default function RelationshipsPage() {
  return (
    <HrPage
      section="crRelationshipsPage"
      path="/apps/sales/crm/insights/relationships"
      prefix="rel"
      appName="Relationships"
      tool="crRelationships"
      group="crInsightsG"
      features={[
        "The people at each key account, drawn around your rep",
        "Relationship strength from visits, calls and replies",
        "Gaps at the decision-maker level flagged",
        "Accounts that depend on a single contact",
        "Coverage across all accounts, by tier",
      ]}
      stepTones={["purple", "red", "teal"]}
      connectStructure={[
        { key: "before", tools: ["crContacts", "crVisits"] },
        { key: "after", tools: ["crPlans", "crTasks"] },
        { key: "shows", tools: ["crScorecard", "cr360"] },
      ]}
      icons={[Network, HeartHandshake, ShieldAlert, UsersRound]}
      render={(ui) => (
        <div className="grid gap-3 lg:grid-cols-12">
          <Card className="lg:col-span-8" title={`${ui.mapTitle} · ADS Apparel Limited`}>
            <div className="relative h-56 rounded-lg bg-[var(--gray-bg)]">
              <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
                {people.map(([n, , s, x, y]) => (
                  <line key={n} x1="50%" y1="50%" x2={`${x}%`} y2={`${y}%`} stroke={strengthLine[s]} strokeWidth={s * 1.4} strokeDasharray={s === 1 ? "4 4" : undefined} />
                ))}
              </svg>
              <span className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
                <span className="rounded-full ring-4 ring-primary/30">
                  <Avatar name="Rasel mia" size={36} tone={0} />
                </span>
                <span className="mt-0.5 rounded bg-card px-1 text-[9.5px] font-semibold text-foreground">Rasel mia</span>
              </span>
              {people.map(([n, role, s, x, y], i) => (
                <span key={n} className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center" style={{ left: `${x}%`, top: `${y}%` }}>
                  <Avatar name={n} size={28} tone={i + 1} />
                  <span className="mt-0.5 rounded bg-card px-1 text-center text-[9px] leading-tight text-foreground">
                    {n}
                    <span className="block text-muted-foreground">{ui[role]}</span>
                  </span>
                  <span className="sr-only">{s}</span>
                </span>
              ))}
            </div>
          </Card>
          <Card className="lg:col-span-4" title={ui.health}>
            <ul className="space-y-2 text-[11px]">
              {people.map(([n, role, s]) => (
                <li key={n} className="flex items-center justify-between gap-2">
                  <span className="min-w-0 truncate text-foreground">
                    {n} <span className="text-muted-foreground">· {ui[role]}</span>
                  </span>
                  <Chip tone={strengthTone[s]}>{ui[`s${s}`]}</Chip>
                </li>
              ))}
            </ul>
            <p className="mt-3 rounded-lg bg-destructive/10 px-2.5 py-1.5 text-[10.5px] text-destructive">{ui.alert}</p>
          </Card>
        </div>
      )}
    />
  );
}
