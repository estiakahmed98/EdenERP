/**
 * Adon ERP public site: /apps/budget-management/rbrf
 * Copy lives in messages/*.json under pages.accountingShowcase.bmRbrf.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { Repeat2, FilePenLine, Scale, History } from "lucide-react";
import { BudgetPage, budgetMetadata, Card, Avatar, Chip, taka } from "../_budget";

/** DUMMY data: [line, before, after (lakh taka), reason, prepared by, status]. */
const requests: [string, number, number, string, string, string][] = [
  ["IT · Software licences", 12, 15.5, "Seats for new plant users", "M. Islam", "pending"],
  ["Marketing · Eid campaign", 20, 16, "Moved to digital", "N. Khan", "approved"],
  ["Maintenance · Spares", 18, 22, "Line 2 overhaul", "R. Hasan", "returned"],
];

export async function generateMetadata(): Promise<Metadata> {
  return budgetMetadata("bmRbrf", "/apps/budget-management/rbrf");
}

export default function BudgetRbrfPage() {
  return (
    <BudgetPage
      section="bmRbrf"
      path="/apps/budget-management/rbrf"
      prefix="br"
      appName="RBRF"
      tool="bmRbrf"
      features={[
        "Re-budget requests (RBRF) that propose a new amount for a budget line",
        "A written justification on every request",
        "Before and after amounts drawn as two bars, with the change shown",
        "Prepared-by, status and actions on each request",
        "The budget line is revised only on approval",
      ]}
      stepTones={["amber", "teal", "red"]}
      connectStructure={[
        { key: "before", tools: ["bmLines", "bmVariance"] },
        { key: "after", tools: ["bmApprovals", "bmOverview"] },
        { key: "shows", tools: ["financialReports", "accountingHub"] },
      ]}
      icons={[Repeat2, FilePenLine, Scale, History]}
      render={(ui) => (
        <>
          <div className="flex items-center justify-between gap-3">
            <p className="text-[10.5px] leading-snug text-muted-foreground">{ui.note}</p>
            <span className="btn-gradient shrink-0 rounded-lg px-2.5 py-1 text-[11px] font-medium">+ {ui.add}</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {requests.map((r, i) => {
              const max = Math.max(r[1], r[2]);
              const delta = r[2] - r[1];
              return (
                <Card key={r[0]}>
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-[11.5px] font-semibold leading-tight text-foreground">{r[0]}</p>
                    <Chip tone={r[5] === "approved" ? "teal" : r[5] === "returned" ? "red" : "amber"}>{ui[r[5]]}</Chip>
                  </div>
                  <div className="mt-3 space-y-1.5 text-[10px]">
                    <div>
                      <p className="flex justify-between text-muted-foreground">
                        <span>{ui.before}</span>
                        <span className="tabular-nums">{taka(r[1])}</span>
                      </p>
                      <span className="block h-2 rounded-full bg-muted-foreground/30" style={{ width: `${(r[1] / max) * 100}%` }} />
                    </div>
                    <div>
                      <p className="flex justify-between text-foreground">
                        <span>{ui.after}</span>
                        <span className="font-semibold tabular-nums">{taka(r[2])}</span>
                      </p>
                      <span className="block h-2 rounded-full bg-primary" style={{ width: `${(r[2] / max) * 100}%` }} />
                    </div>
                  </div>
                  <p className={`mt-2 text-[11px] font-semibold tabular-nums ${delta > 0 ? "text-amber-600 dark:text-amber-400" : "text-[var(--teal)]"}`}>
                    {delta > 0 ? "+" : "−"}{taka(Math.abs(delta))}
                  </p>
                  <p className="mt-1 text-[10.5px] italic leading-snug text-muted-foreground">“{r[3]}”</p>
                  <div className="mt-2.5 flex items-center justify-between border-t border-border pt-2">
                    <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                      <Avatar name={r[4]} tone={i} /> {r[4]}
                    </span>
                    {r[5] === "pending" && (
                      <span className="flex gap-1 text-[10px] font-medium">
                        <span className="rounded-md bg-[var(--teal)] px-1.5 py-0.5 text-white">{ui.approve}</span>
                        <span className="rounded-md border border-border px-1.5 py-0.5 text-amber-600 dark:text-amber-400">{ui.ret}</span>
                      </span>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </>
      )}
    />
  );
}
