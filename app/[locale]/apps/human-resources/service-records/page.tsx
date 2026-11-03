/**
 * Adon ERP public site: /apps/human-resources/service-records
 * Copy lives in messages/*.json under pages.accountingShowcase.hrService.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { ArrowUpRight, FileClock, History, MoveRight } from "lucide-react";

import { Avatar, Card, Chip, HrPage, barTone, hrMetadata, type HrTone } from "../_hr";

/** DUMMY data: [date, event key, detail, tone]. Newest first. */
const events: [string, string, string, HrTone][] = [
  ["01 Jul 2026", "evIncrement", "G4 step 2 → step 3 · BDT 52,900", "teal"],
  ["15 Jan 2025", "evPromotion", "Accounts Officer, G3 → G4", "primary"],
  ["01 Mar 2024", "evTransfer", "Narayanganj Depot → Head Office", "sky"],
  ["01 Jul 2023", "evIncrement", "G3 step 1 → step 2", "teal"],
  ["01 Sep 2022", "evConfirm", "Probation completed", "navy"],
  ["01 Mar 2022", "evJoin", "Junior Accounts Officer, G3", "brown"],
];

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("hrService", "/apps/human-resources/service-records");
}

export default function ServiceRecordsPage() {
  return (
    <HrPage
      section="hrService"
      path="/apps/human-resources/service-records"
      prefix="svc"
      appName="Service Records"
      tool="hrServiceRecords"
      group="org"
      features={[
        "Every change in an employee's working life, with a date",
        "Joining, confirmation, increments, promotions and transfers",
        "The grade, step and salary after each change",
        "The order or letter attached to each entry",
        "Length of service worked out for gratuity",
      ]}
      stepTones={["purple", "teal", "muted"]}
      connectStructure={[
        { key: "before", tools: ["hrEmployees", "hrGrades", "hrDepartments"] },
        { key: "after", tools: ["hrSettlements", "hrAppraisals"] },
        { key: "shows", tools: ["epProfile", "hrReports"] },
      ]}
      icons={[History, ArrowUpRight, MoveRight, FileClock]}
      render={(ui) => (
        <div className="grid gap-3 lg:grid-cols-12">
          <Card className="lg:col-span-4">
            <div className="flex flex-col items-center text-center">
              <Avatar name="Shamima Akter" size={52} tone={0} />
              <p className="mt-2 text-[13px] font-semibold text-foreground">Shamima Akter</p>
              <p className="text-[10.5px] text-muted-foreground">Accounts Officer · EMP-0147</p>
            </div>
            <dl className="mt-3 grid grid-cols-2 gap-2 text-center">
              <div className="rounded-lg bg-[var(--gray-bg)] py-2">
                <dt className="text-[9.5px] text-muted-foreground">{ui.service}</dt>
                <dd className="text-[13px] font-semibold tabular-nums text-foreground">4y 8m</dd>
              </div>
              <div className="rounded-lg bg-[var(--gray-bg)] py-2">
                <dt className="text-[9.5px] text-muted-foreground">{ui.grade}</dt>
                <dd className="text-[13px] font-semibold text-foreground">G4 · 3</dd>
              </div>
            </dl>
          </Card>
          <Card className="lg:col-span-8" title={ui.timeline} right={<Chip tone="primary">{ui.addEntry}</Chip>}>
            <ol className="relative ms-1.5 border-s border-border">
              {events.map(([date, key, detail, tone]) => (
                <li key={date + key} className="relative pb-2.5 ps-4 last:pb-0">
                  <span className={`absolute -start-[5px] top-1 h-2.5 w-2.5 rounded-full ring-2 ring-card ${barTone[tone]}`} aria-hidden="true" />
                  <div className="flex flex-wrap items-center gap-x-2">
                    <span className="w-20 text-[10px] tabular-nums text-muted-foreground">{date}</span>
                    <Chip tone={tone}>{ui[key]}</Chip>
                    <span className="text-[11px] text-foreground">{detail}</span>
                  </div>
                </li>
              ))}
            </ol>
          </Card>
        </div>
      )}
    />
  );
}
