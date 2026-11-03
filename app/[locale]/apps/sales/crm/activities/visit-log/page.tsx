/**
 * Adon ERP public site: /apps/sales/crm/activities/visit-log
 * Copy lives in messages/*.json under pages.accountingShowcase.crVisitsPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { CalendarClock, MapPin, NotebookPen, Target } from "lucide-react";

import { Card, Chip, HrPage, Table, hrMetadata, type HrTone } from "../../../../human-resources/_hr";

/** DUMMY data: [account, tier, every n days, days since last visit or -1 for never]. */
const coverage: [string, string, number, number][] = [
  ["Beximco Apparels", "tier3", 180, -1],
  ["Babylon Group", "tier3", 180, 320],
  ["ANR Fashion Wear", "tier1", 30, 89],
  ["Ananta Apparels", "tier1", 30, 86],
];
/** DUMMY data: [visit, date, account, type, met, outcome key, tone, next]. */
const visits: [string, string, string, string, string, string, HrTone, string][] = [
  ["VIS-2026-000159", "29 Oct", "Musk Trousers", "Negotiation", "—", "oPositive", "teal", "—"],
  ["VIS-2026-000157", "17 Oct", "Maximo International", "Sales call", "—", "oNeutral", "muted", "25 Oct"],
  ["VIS-2026-000155", "15 Oct", "KLD Apparels Ltd.", "Sales call", "Md Asraf", "oNeutral", "muted", "18 Oct"],
  ["VIS-2026-000158", "13 Oct", "Trust Apparel Sourcing", "Follow-up", "—", "oNegative", "red", "—"],
];

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("crVisitsPage", "/apps/sales/crm/activities/visit-log");
}

export default function VisitLogPage() {
  return (
    <HrPage
      section="crVisitsPage"
      path="/apps/sales/crm/activities/visit-log"
      prefix="visit"
      appName="Visit Log"
      tool="crVisits"
      group="crActivitiesG"
      features={[
        "Every customer visit with type, people met and outcome",
        "A visit plan by account tier: every 30, 90 or 180 days",
        "Accounts overdue for a visit shown at the top",
        "The next step and its date on each visit",
        "Visits by year, type and outcome, filtered in one click",
      ]}
      stepTones={["purple", "teal", "red"]}
      connectStructure={[
        { key: "before", tools: ["crContacts", "crPlans"] },
        { key: "after", tools: ["crTasks", "crDeals"] },
        { key: "shows", tools: ["crRelationships", "crScorecard"] },
      ]}
      icons={[MapPin, CalendarClock, NotebookPen, Target]}
      render={(ui) => (
        <>
          <Card title={ui.coverage} right={<span className="text-[10px] text-muted-foreground"><span className="font-semibold text-destructive">4</span> {ui.overdueOf}</span>}>
            <div className="flex flex-wrap gap-2">
              {coverage.map(([acc, tier, every, ago], i) => (
                <span key={acc} className={`rounded-lg border px-2.5 py-1.5 text-[10px] ${i === 0 ? "border-[var(--chart-4)]" : "border-border"}`}>
                  <span className="block font-semibold text-primary">{acc}</span>
                  <span className="text-muted-foreground">
                    {tier} · {ui.every} {every} d · {ago < 0 ? ui.never : `${ago} d ${ui.ago} (${ago - every} d ${ui.over})`}
                  </span>
                </span>
              ))}
            </div>
          </Card>
          <Card>
            <Table
              cols={[{ head: ui.thVisit }, { head: ui.thAccount }, { head: ui.thType }, { head: ui.thMet }, { head: ui.thOutcome }, { head: ui.thNext, end: true }]}
              rows={visits.map((v) => [
                <span key="v">
                  <span className="block font-medium text-primary">{v[0]}</span>
                  <span className="block text-[9.5px] text-muted-foreground">{v[1]}</span>
                </span>,
                v[2],
                <span key="t" className="text-muted-foreground">{v[3]}</span>,
                <span key="m" className="text-muted-foreground">{v[4]}</span>,
                <Chip key="o" tone={v[6]}>{ui[v[5]]}</Chip>,
                <span key="n" className="text-muted-foreground">{v[7]}</span>,
              ])}
            />
          </Card>
        </>
      )}
    />
  );
}
