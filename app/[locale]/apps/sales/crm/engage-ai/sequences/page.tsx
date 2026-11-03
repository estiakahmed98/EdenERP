/**
 * Adon ERP public site: /apps/sales/crm/engage-ai/sequences
 * Copy lives in messages/*.json under pages.accountingShowcase.crSequencesPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { Mail, MessageSquare, Phone, Repeat, Timer } from "lucide-react";

import { Chip, HrPage, hrMetadata } from "../../../../human-resources/_hr";

/** DUMMY data: [day, channel, step text, sent, response %]. */
const steps: [number, string, string, number, number][] = [
  [0, "email", "Intro: who we are and two sample photos", 120, 48],
  [2, "sms", "Short reminder with the catalogue link", 112, 22],
  [5, "call", "Call task for the owner rep", 96, 31],
  [9, "email", "Case study: 18% fewer carton claims", 74, 36],
  [14, "email", "Break-up note: shall we close the file?", 51, 19],
];
const icon = { email: Mail, sms: MessageSquare, call: Phone } as const;

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("crSequencesPage", "/apps/sales/crm/engage-ai/sequences");
}

export default function SequencesPage() {
  return (
    <HrPage
      section="crSequencesPage"
      path="/apps/sales/crm/engage-ai/sequences"
      prefix="seq"
      appName="Sequences"
      tool="crSequences"
      group="crEngageG"
      features={[
        "A series of emails, texts and call tasks on a schedule",
        "Leads enrolled by hand or when they arrive",
        "The sequence stops when the lead replies",
        "Opens, replies and calls measured at each step",
        "Templates with the lead's name and company filled in",
      ]}
      stepTones={["purple", "teal", "muted"]}
      connectStructure={[
        { key: "before", tools: ["crLeads", "crCapture"] },
        { key: "after", tools: ["crTasks", "crDeals"] },
        { key: "shows", tools: ["crDashboard"] },
      ]}
      icons={[Repeat, Mail, Timer, Phone]}
      render={(ui) => (
        <>
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-[12.5px] font-semibold text-foreground">{ui.seqName}</p>
            <Chip tone="teal">{ui.active}</Chip>
            <span className="ms-auto text-[10.5px] text-muted-foreground">{ui.enrolled}</span>
          </div>
          <ol className="space-y-1.5">
            {steps.map(([day, ch, text, sent, resp], i) => {
              const Icon = icon[ch as keyof typeof icon];
              return (
                <li key={day} className="grid items-center gap-3 rounded-xl border border-border bg-card px-3 py-2 text-[11px] sm:grid-cols-[3.5rem_2rem_1fr_9rem]">
                  <span className="font-semibold text-muted-foreground">
                    {ui.day} {day}
                  </span>
                  <span className={`grid h-7 w-7 place-items-center rounded-full ${ch === "call" ? "bg-[var(--teal)]/15 text-[var(--teal)]" : "bg-primary/10 text-primary"}`} aria-hidden="true">
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-foreground">{text}</span>
                  <span className="flex items-center gap-2">
                    <span className="h-1.5 flex-1 rounded-full bg-muted" aria-hidden="true">
                      <span className="block h-1.5 rounded-full bg-primary" style={{ width: `${resp}%`, opacity: 1 - i * 0.12 }} />
                    </span>
                    <span className="w-16 text-end tabular-nums text-muted-foreground">
                      {resp}% · {sent}
                    </span>
                  </span>
                </li>
              );
            })}
          </ol>
          <p className="text-[10px] text-muted-foreground">{ui.note}</p>
        </>
      )}
    />
  );
}
