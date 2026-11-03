/**
 * Adon ERP public site: /apps/sales/crm/accounts/objections
 * Copy lives in messages/*.json under pages.accountingShowcase.crObjectionsPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { BookOpenText, MessageSquareQuote, ThumbsUp, TrendingUp } from "lucide-react";

import { Chip, HrPage, hrMetadata, type HrTone } from "../../../../human-resources/_hr";

/** DUMMY data: [category key, tone, objection, best answer, times heard, win rate %]. */
const items: [string, HrTone, string, string, number, number][] = [
  ["cPrice", "red", "“Your price is 6% above our current supplier.”", "Show cost per shipped carton: fewer crushes, fewer claims. Offer a trial lot at the same price.", 41, 58],
  ["cLead", "brown", "“We need it in 7 days, not 12.”", "Split the order: 40% from stock in 5 days, the rest on the normal run.", 23, 64],
  ["cQuality", "navy", "“The last batch had print smudges.”", "Share the QC report and the corrective action; offer a supervised first run.", 12, 50],
  ["cCredit", "primary", "“We pay at 90 days, not 45.”", "Offer 60 days with a 1% early payment discount.", 18, 44],
];

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("crObjectionsPage", "/apps/sales/crm/accounts/objections");
}

export default function ObjectionsPage() {
  return (
    <HrPage
      section="crObjectionsPage"
      path="/apps/sales/crm/accounts/objections"
      prefix="obj"
      appName="Objections"
      tool="crObjections"
      group="crAccountsG"
      features={[
        "The objections your team hears, written down once",
        "The answer that has worked best for each",
        "How often each objection comes up, and how often it is overcome",
        "Objections logged on visits and deals",
        "New reps learn from the whole team's experience",
      ]}
      stepTones={["red", "purple", "teal"]}
      connectStructure={[
        { key: "before", tools: ["crVisits", "crDeals"] },
        { key: "after", tools: ["crPlaybook"] },
        { key: "shows", tools: ["crScorecard", "crDashboard"] },
      ]}
      icons={[MessageSquareQuote, BookOpenText, ThumbsUp, TrendingUp]}
      render={(ui) => (
        <div className="grid gap-2.5 md:grid-cols-2">
          {items.map(([cat, tone, q, a, heard, win]) => (
            <div key={cat} className="rounded-xl border border-border bg-card p-3.5">
              <div className="flex items-center justify-between">
                <Chip tone={tone}>{ui[cat]}</Chip>
                <span className="text-[10px] text-muted-foreground">
                  {heard} {ui.heard}
                </span>
              </div>
              <p className="mt-2 text-[12px] font-semibold leading-snug text-foreground">{q}</p>
              <p className="mt-2 rounded-lg bg-[var(--gray-bg)] p-2.5 text-[10.5px] leading-relaxed text-foreground">
                <span className="font-semibold text-primary">{ui.answer}: </span>
                {a}
              </p>
              <p className="mt-2 flex items-center gap-2 text-[10px] text-muted-foreground">
                <span className="h-1.5 flex-1 rounded-full bg-muted" aria-hidden="true">
                  <span className="block h-1.5 rounded-full bg-[var(--teal)]" style={{ width: `${win}%` }} />
                </span>
                {win}% {ui.overcome}
              </p>
            </div>
          ))}
        </div>
      )}
    />
  );
}
