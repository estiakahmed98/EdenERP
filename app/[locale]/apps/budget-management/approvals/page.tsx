/**
 * Adon ERP public site: /apps/budget-management/approvals
 * Copy lives in messages/*.json under pages.accountingShowcase.bmApprovals.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { Workflow, UserCheck, Undo2, ScrollText } from "lucide-react";
import { BudgetPage, budgetMetadata, Card, Avatar } from "../_budget";

/** DUMMY data: [stage, state, approver, date]. */
const stages = [
  ["Finance", "done", "A. Rahman", "03/11/2026"],
  ["Compliance", "done", "N. Sultana", "04/11/2026"],
  ["Management", "now", "", ""],
  ["CEO", "queued", "", ""],
];
/** Newest first: [person, stage or "submit", date]. */
const feed = [
  ["N. Sultana", "Compliance", "04/11/2026"],
  ["A. Rahman", "Finance", "03/11/2026"],
  ["M. Islam", "submit", "02/11/2026"],
];

export async function generateMetadata(): Promise<Metadata> {
  return budgetMetadata("bmApprovals", "/apps/budget-management/approvals");
}

export default function BudgetApprovalsPage() {
  return (
    <BudgetPage
      section="bmApprovals"
      path="/apps/budget-management/approvals"
      prefix="ba"
      appName="Approvals"
      tool="bmApprovals"
      features={[
        "A four-stage approval route: Finance, Compliance, Management and CEO",
        "Approve, return or reject at the stage that is waiting",
        "An activity feed with the person, action and date for every step",
        "Later stages stay queued until the earlier one approves",
      ]}
      stepTones={["teal", "amber", "red"]}
      connectStructure={[
        { key: "before", tools: ["bmRequisitions", "bmLines"] },
        { key: "after", tools: ["bmOverview", "bmRbrf"] },
        { key: "shows", tools: ["bmVariance", "financialReports"] },
      ]}
      icons={[Workflow, UserCheck, Undo2, ScrollText]}
      render={(ui) => (
        <>
          <Card>
            <ol className="grid grid-cols-4 gap-2">
              {stages.map((s, i) => (
                <li key={s[0]} className="relative text-center text-[10.5px]">
                  {i < stages.length - 1 && (
                    <span className={`absolute start-1/2 top-[15px] h-[2px] w-full ${s[1] === "done" ? "bg-[var(--teal)]" : "bg-border"}`} aria-hidden="true" />
                  )}
                  <span
                    className={`relative z-10 mx-auto grid h-8 w-8 place-items-center rounded-full text-[11px] font-semibold ${
                      s[1] === "done" ? "bg-[var(--teal)] text-white" : s[1] === "now" ? "bg-primary text-white ring-4 ring-primary/20" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {s[1] === "done" ? "✓" : i + 1}
                  </span>
                  <p className="mt-1.5 font-semibold text-foreground">{s[0]}</p>
                  <p className="text-muted-foreground">{s[1] === "done" ? s[3] : s[1] === "now" ? ui.awaiting : ui.queued}</p>
                </li>
              ))}
            </ol>
          </Card>
          <div className="grid gap-3 lg:grid-cols-12">
            <Card title={ui.current} className="lg:col-span-5">
              <p className="text-[11px] text-muted-foreground">{ui.waitingFor}</p>
              <p className="mt-0.5 text-[14px] font-semibold text-foreground">Management</p>
              <p className="mt-3 flex flex-wrap gap-1.5 text-[11px] font-medium">
                <span className="rounded-lg bg-[var(--teal)] px-3 py-1 text-white">{ui.approve}</span>
                <span className="rounded-lg border border-border px-3 py-1 text-amber-600 dark:text-amber-400">{ui.ret}</span>
                <span className="rounded-lg border border-border px-3 py-1 text-destructive">{ui.reject}</span>
              </p>
            </Card>
            <Card title={ui.feed} className="lg:col-span-7">
              <ul className="space-y-3 text-[11px]">
                {feed.map((f, i) => (
                  <li key={f[0] + f[2]} className="flex gap-2.5">
                    <Avatar name={f[0]} size={24} tone={i} />
                    <div className="min-w-0">
                      <p className="text-foreground">
                        <span className="font-semibold">{f[0]}</span> {f[1] === "submit" ? ui.submittedMsg : `${ui.approvedMsg} ${f[1]}`}
                      </p>
                      <p className="text-[10px] text-muted-foreground">{f[2]}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </>
      )}
    />
  );
}
