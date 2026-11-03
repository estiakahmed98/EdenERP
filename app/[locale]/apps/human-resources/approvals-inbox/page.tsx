/**
 * Adon ERP public site: /apps/human-resources/approvals-inbox
 * Copy lives in messages/*.json under pages.accountingShowcase.hrInbox.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { Clock, Inbox, MessageSquare, ShieldCheck } from "lucide-react";

import { Avatar, Chip, HrPage, bdt, hrMetadata, type HrTone } from "../_hr";

/** DUMMY data: [requester, type key, summary, age, tone]. */
const items: [string, string, string, string, HrTone][] = [
  ["Payroll · October 2026", "tPayroll", "212 employees · net BDT 63,29,600", "2h", "primary"],
  ["Rafiqul Islam", "tLeave", "Earned leave · 4 days from 12 Nov", "5h", "teal"],
  ["Nusrat Jahan", "tAdvance", "Salary advance · BDT 20,000", "1d", "brown"],
  ["Tanvir Hasan", "tOvertime", "Overtime · 14 hours, week 44", "1d", "navy"],
  ["Mahmud Hossain", "tSettlement", "Final settlement · Sales", "3d", "red"],
];
const lines: [string, number][] = [
  ["Gross", 6842000],
  ["PF (employee)", -268400],
  ["Income tax (TDS)", -196300],
  ["Advance recovery", -47700],
];

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("hrInbox", "/apps/human-resources/approvals-inbox");
}

export default function ApprovalsInboxPage() {
  return (
    <HrPage
      section="hrInbox"
      path="/apps/human-resources/approvals-inbox"
      prefix="inbox"
      appName="Approvals Inbox"
      tool="hrApprovals"
      group="pay"
      features={[
        "Every HR request waiting for you in one list",
        "Payroll, leave, advances, overtime and settlements",
        "The details on the right, without opening another page",
        "Approve, return or reject with a comment",
        "Who approved what, and when, kept on the record",
      ]}
      stepTones={["purple", "teal", "red"]}
      connectStructure={[
        { key: "before", tools: ["hrPayrollRuns", "hrLeaveApps", "hrSettlements"] },
        { key: "after", tools: ["epPayslips", "epLeaves"] },
        { key: "shows", tools: ["hrServiceRecords", "hrReports"] },
      ]}
      icons={[Inbox, Clock, MessageSquare, ShieldCheck]}
      render={(ui) => (
        <div className="grid overflow-hidden rounded-xl border border-border bg-card lg:grid-cols-12">
          <ul className="divide-y divide-border border-border lg:col-span-5 lg:border-e">
            {items.map((it, i) => (
              <li key={it[0]} className={`flex gap-2.5 px-3 py-2.5 ${i === 0 ? "bg-primary/5" : ""}`}>
                {i === 0 && <span className="-ms-3 w-0.5 self-stretch bg-primary" aria-hidden="true" />}
                <Avatar name={it[0]} size={26} tone={i} />
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-2">
                    <span className="truncate text-[11.5px] font-semibold text-foreground">{it[0]}</span>
                    <span className="shrink-0 text-[9.5px] text-muted-foreground">{it[3]}</span>
                  </span>
                  <span className="mt-0.5 block truncate text-[10.5px] text-muted-foreground">{it[2]}</span>
                  <span className="mt-1 block">
                    <Chip tone={it[4]}>{ui[it[1]]}</Chip>
                  </span>
                </span>
              </li>
            ))}
          </ul>
          <div className="p-4 lg:col-span-7">
            <div className="flex items-center justify-between">
              <p className="text-[13px] font-semibold text-foreground">{ui.detailTitle}</p>
              <Chip tone="brown">{ui.waiting}</Chip>
            </div>
            <p className="mt-1 text-[10.5px] text-muted-foreground">{ui.detailSub}</p>
            <dl className="mt-3 divide-y divide-border rounded-lg border border-border">
              {lines.map((l) => (
                <div key={l[0]} className="flex justify-between px-3 py-1.5 text-[11px]">
                  <dt className="text-muted-foreground">{l[0]}</dt>
                  <dd className={`tabular-nums ${l[1] < 0 ? "text-destructive" : "text-foreground"}`}>{bdt(l[1])}</dd>
                </div>
              ))}
              <div className="flex justify-between bg-[var(--gray-bg)] px-3 py-1.5 text-[11.5px] font-semibold">
                <dt className="text-foreground">{ui.net}</dt>
                <dd className="tabular-nums text-foreground">{bdt(6329600)}</dd>
              </div>
            </dl>
            <div className="mt-3 rounded-md border border-border bg-[var(--gray-bg)] px-2.5 py-2 text-[10.5px] text-muted-foreground">{ui.comment}</div>
            <div className="mt-3 flex justify-end gap-2 text-[11px] font-medium">
              <span className="rounded-md border border-destructive/30 px-2.5 py-1 text-destructive">{ui.reject}</span>
              <span className="rounded-md border border-border px-2.5 py-1 text-foreground">{ui.return}</span>
              <span className="btn-gradient rounded-md px-2.5 py-1">{ui.approve}</span>
            </div>
          </div>
        </div>
      )}
    />
  );
}
