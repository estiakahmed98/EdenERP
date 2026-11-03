/**
 * Adon ERP public site: /apps/sales/crm/engage-ai/ask-ai
 * Copy lives in messages/*.json under pages.accountingShowcase.crAskAiPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { Bot, Database, MessageCircleQuestion, ShieldCheck, Sparkles } from "lucide-react";

import { Avatar, Chip, HrPage, hrMetadata } from "../../../../human-resources/_hr";

/** DUMMY data: [account, reason, last order days ago]. */
const answer: [string, string, number][] = [
  ["Babylon Group", "No visit in 320 days, orders down 40%", 96],
  ["Mondol Group", "Over credit limit, 74 days overdue", 41],
  ["Karim Traders", "Two returns this quarter", 33],
];

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("crAskAiPage", "/apps/sales/crm/engage-ai/ask-ai");
}

export default function AskAiPage() {
  return (
    <HrPage
      section="crAskAiPage"
      path="/apps/sales/crm/engage-ai/ask-ai"
      prefix="ai"
      appName="Ask AI"
      tool="crAskAi"
      group="crEngageG"
      features={[
        "Questions about your sales data, asked in plain English or Bangla",
        "Answers built from your own deals, orders, visits and payments",
        "Every answer shows the records it came from",
        "Only data the person is allowed to see is used",
        "Suggested next steps, turned into tasks in one click",
      ]}
      stepTones={["purple", "teal", "muted"]}
      connectStructure={[
        { key: "before", tools: ["crDeals", "crVisits", "crCredit"] },
        { key: "after", tools: ["crTasks", "crPlans"] },
        { key: "shows", tools: ["crDashboard", "crRelationships"] },
      ]}
      icons={[MessageCircleQuestion, Database, ShieldCheck, Sparkles]}
      render={(ui) => (
        <div className="mx-auto max-w-[44rem] space-y-3">
          <div className="flex justify-end gap-2">
            <p className="max-w-[80%] rounded-2xl rounded-ee-sm bg-primary px-3.5 py-2 text-[11.5px] text-white">{ui.question}</p>
            <Avatar name="Mahmud Hossain" size={26} tone={2} />
          </div>
          <div className="flex gap-2">
            <span className="grid h-[26px] w-[26px] shrink-0 place-items-center rounded-full bg-[var(--teal)]/15 text-[var(--teal)]" aria-hidden="true">
              <Bot className="h-3.5 w-3.5" />
            </span>
            <div className="min-w-0 flex-1 rounded-2xl rounded-es-sm border border-border bg-card p-3">
              <p className="text-[11.5px] text-foreground">{ui.answerIntro}</p>
              <ul className="mt-2 divide-y divide-border rounded-lg border border-border">
                {answer.map(([acc, why, days]) => (
                  <li key={acc} className="flex items-center gap-2 px-2.5 py-1.5 text-[11px]">
                    <span className="w-28 shrink-0 font-medium text-foreground">{acc}</span>
                    <span className="min-w-0 flex-1 truncate text-muted-foreground">{why}</span>
                    <Chip tone="brown">
                      {days} d
                    </Chip>
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-[10px] text-muted-foreground">{ui.sources}</p>
              <div className="mt-2 flex flex-wrap gap-1.5 text-[10px] font-medium">
                <span className="rounded-full border border-primary/40 px-2.5 py-0.5 text-primary">{ui.s1}</span>
                <span className="rounded-full border border-primary/40 px-2.5 py-0.5 text-primary">{ui.s2}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-border bg-[var(--gray-bg)] px-3.5 py-2 text-[11px] text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            {ui.placeholder}
          </div>
        </div>
      )}
    />
  );
}
