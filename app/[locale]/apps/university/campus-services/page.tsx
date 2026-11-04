/**
 * Adon ERP public site: /apps/university/campus-services
 * Copy lives in messages/*.json under pages.accountingShowcase.uniCampusPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { BedDouble, Bus, Home, Library, Stethoscope } from "lucide-react";

import { Panel, PencilBar, Pill, Register, Tabs, useUi, type Tone } from "@/components/education/school-ui";
import { UniversityPage } from "@/components/university/university-page";

import { accountingMetadata } from "../../accounting/_shared";

/** DUMMY data: [service key, value key, icon, fill %, tone]. */
const services = [
  ["hostel", "hostelValue", BedDouble, 86, "blue"],
  ["transport", "transportValue", Bus, 72, "green"],
  ["library", "libraryValue", Library, 64, "navy"],
  ["medical", "medicalValue", Stethoscope, 40, "brown"],
] as const;
/** DUMMY data: [request key, student, service key, date, status key]. */
const queue: [string, string, string, string, string][] = [
  ["r1", "Rafiq Ahmed", "hostel", "03 Nov", "pending"],
  ["r2", "Nusrat Jahan", "transport", "03 Nov", "approved"],
  ["r3", "Tanvir Hasan", "medical", "04 Nov", "scheduled"],
  ["r4", "Sumaiya Akter", "library", "04 Nov", "done"],
  ["r5", "Imran Hossain", "hostel", "04 Nov", "pending"],
];
const statusTone: Record<string, Tone> = { pending: "brown", approved: "blue", scheduled: "navy", done: "green" };

export async function generateMetadata(): Promise<Metadata> {
  return accountingMetadata("uniCampusPage", "/apps/university/campus-services");
}

export default function UniversityCampusPage() {
  const ui = useUi("uniCampusPage");
  return (
    <UniversityPage
      section="uniCampusPage"
      path="/apps/university/campus-services"
      tool="campusServices"
      icon={Home}
      preview={
        <>
          <Tabs items={[ui.tabServices, ui.tabQueue, ui.tabHostel, ui.tabTransport]} />
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {services.map(([key, valueKey, Icon, pct, tone]) => (
              <Panel key={key}>
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-primary" aria-hidden="true">
                  <Icon className="h-4 w-4" />
                </span>
                <p className="mt-3 text-[11px] text-muted-foreground">{ui[key]}</p>
                <p className="text-[14px] font-semibold tabular-nums text-foreground">{ui[valueKey]}</p>
                <div className="mt-2.5">
                  <PencilBar pct={pct} tone={tone} />
                </div>
              </Panel>
            ))}
          </div>
          <Panel title={ui.queueTitle}>
            <Register
              dense
              cols={[
                { head: ui.cRequest },
                { head: ui.cStudent },
                { head: ui.cService },
                { head: ui.cDate },
                { head: ui.cStatus, className: "ps-4" },
              ]}
              rows={queue.map(([req, student, service, date, status]) => [
                <b key={req} className="font-semibold text-foreground">{ui[req]}</b>,
                student,
                ui[service],
                date,
                <Pill key={`s${req}`} tone={statusTone[status]}>{ui[status]}</Pill>,
              ])}
            />
          </Panel>
        </>
      }
    />
  );
}
