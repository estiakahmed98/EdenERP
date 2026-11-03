/**
 * Adon ERP public site: /apps/sales/crm/accounts/playbook
 * Copy lives in messages/*.json under pages.accountingShowcase.crPlaybookPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { Check, ListOrdered, Route, Star, Target } from "lucide-react";

import { Chip, HrPage, hrMetadata } from "../../../../human-resources/_hr";

/** DUMMY data: [stage key, steps as [text, done]]. */
const stages: [string, [string, boolean][]][] = [
  ["sQualify", [["Confirm monthly volume and board grade", true], ["Meet the merchandiser and QA", true], ["Check credit with accounts", true]]],
  ["sPropose", [["Send two samples and a test report", true], ["Price with the volume slab", false], ["Agree delivery slots", false]]],
  ["sClose", [["Trial order of one container", false], ["Review first delivery with QA", false], ["Set the visit rhythm", false]]],
];

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("crPlaybookPage", "/apps/sales/crm/accounts/playbook");
}

export default function PlaybookPage() {
  return (
    <HrPage
      section="crPlaybookPage"
      path="/apps/sales/crm/accounts/playbook"
      prefix="play"
      appName="Playbook"
      tool="crPlaybook"
      group="crAccountsG"
      features={[
        "The steps that win a deal, stage by stage",
        "A checklist on every deal, ticked as the rep goes",
        "Different playbooks for new accounts and for growth",
        "Must-do steps that block the next stage until done",
        "Tips and templates beside each step",
      ]}
      stepTones={["purple", "teal", "muted"]}
      connectStructure={[
        { key: "before", tools: ["crObjections", "crPlans"] },
        { key: "after", tools: ["crDeals", "crTasks"] },
        { key: "shows", tools: ["crScorecard"] },
      ]}
      icons={[Route, ListOrdered, Target, Star]}
      render={(ui) => (
        <>
          <div className="flex flex-wrap items-center gap-2">
            <Chip tone="primary">{ui.playbookName}</Chip>
            <span className="text-[10.5px] text-muted-foreground">{ui.appliedTo}</span>
            <span className="ms-auto text-[10.5px] font-semibold text-foreground">4 / 9</span>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {stages.map(([key, steps], si) => (
              <div key={key} className={`rounded-xl border p-3 ${si === 1 ? "border-primary bg-primary/5" : "border-border bg-card"}`}>
                <p className="flex items-center gap-2 text-[11.5px] font-semibold text-foreground">
                  <span className={`grid h-5 w-5 place-items-center rounded-full text-[10px] text-white ${si === 0 ? "bg-[var(--teal)]" : si === 1 ? "bg-primary" : "bg-muted-foreground/50"}`}>{si + 1}</span>
                  {ui[key]}
                </p>
                <ul className="mt-2.5 space-y-2">
                  {steps.map(([t, done], i) => (
                    <li key={t} className="flex items-start gap-2 text-[11px]">
                      <span className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded ${done ? "bg-[var(--teal)] text-white" : "border border-border"}`} aria-hidden="true">
                        {done && <Check className="h-3 w-3" />}
                      </span>
                      <span className={done ? "text-muted-foreground" : "text-foreground"}>
                        {t}
                        {si === 1 && i === 1 && <span className="ms-1 rounded bg-destructive/10 px-1 text-[9px] text-destructive">{ui.required}</span>}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </>
      )}
    />
  );
}
