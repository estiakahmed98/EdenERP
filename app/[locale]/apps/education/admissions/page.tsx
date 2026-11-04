/**
 * Adon ERP public site: /apps/education/admissions
 * Copy lives in messages/*.json under pages.accountingShowcase.edAdmissionsPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { Plus, Printer } from "lucide-react";

import { SchoolPage } from "@/components/education/school-page";
import { Btn, Panel, Pill, Register, Sticker, useUi } from "@/components/education/school-ui";

import { accountingMetadata } from "../../accounting/_shared";

/** DUMMY data: [round, class, method key, seats, applications, offered, admitted, open?]. */
const rounds: [string, string, string, number, number, number, number, boolean][] = [
  ["A Level intake 2027–28", "Class XI", "mDirect", 12, 7, 0, 4, true],
  ["Class I admission test 2027–28", "Class I", "mTest", 20, 63, 9, 11, false],
  ["Playgroup admission 2027–28", "Playgroup", "mInterview", 40, 46, 8, 26, false],
];
/** DUMMY data: [application no., applicant, sibling?, guardian, phone]. */
const applicants: [string, string, boolean, string, string][] = [
  ["ADM-2027-000110", "Yusuf Rahman", true, "Shahriar Rahman", "01711 000 731"],
  ["ADM-2027-000111", "Tahsin Karim", true, "Rezaul Karim", "01711 000 957"],
  ["ADM-2027-000112", "Nuha Hossain", false, "Sohel Hossain", "01711 000 292"],
];

export async function generateMetadata(): Promise<Metadata> {
  return accountingMetadata("edAdmissionsPage", "/apps/education/admissions");
}

export default function EducationAdmissionsPage() {
  const ui = useUi("edAdmissionsPage");
  return (
    <SchoolPage
      section="edAdmissionsPage"
      path="/apps/education/admissions"
      tool="admissions"
      preview={
        <>
          <Panel right={<Btn solid icon={<Plus className="h-3 w-3" />}>{ui.newRound}</Btn>}>
            <Register
              dense
              cols={[
                { head: ui.cRound },
                { head: ui.cClass },
                { head: ui.cMethod },
                { head: ui.cSeats, end: true },
                { head: ui.cApps, end: true },
                { head: ui.cOffered, end: true },
                { head: ui.cAdmitted, end: true },
                { head: ui.cStatus, className: "ps-4" },
              ]}
              rows={rounds.map(([name, cls, method, seats, apps, offered, admitted, open]) => [
                <b key={name} className="font-semibold text-primary">
                  {name}
                </b>,
                cls,
                ui[method],
                seats,
                apps,
                offered,
                <b key={`a${name}`}>{admitted}</b>,
                <Pill key={`s${name}`} tone={open ? "green" : "muted"}>
                  {open ? ui.stOpen : ui.stClosed}
                </Pill>,
              ])}
            />
          </Panel>
          <Panel title="A Level intake 2027–28" right={<Btn>{ui.closeApps}</Btn>}>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
              <Sticker label={ui.mApplications} value="7" sub={ui.mApplicationsSub} />
              <Sticker label={ui.mFormsPaid} value="7" sub="BDT 21,000" />
              <Sticker label={ui.mTested} value="0" />
              <Sticker label={ui.mOffered} value="0" tone="brown" />
              <Sticker label={ui.mWaitlisted} value="0" tone="navy" />
              <Sticker label={ui.mSeats} value="4 / 12" sub={ui.mSeatsSub} tone="green" />
            </div>
            <div className="mt-3 flex gap-2">
              <Btn solid icon={<Plus className="h-3 w-3" />}>{ui.newApp}</Btn>
              <Btn icon={<Printer className="h-3 w-3" />}>{ui.printMerit}</Btn>
            </div>
            <div className="mt-3">
              <Register
                dense
                cols={[
                  { head: ui.cAppNo },
                  { head: ui.cApplicant },
                  { head: ui.cGuardian },
                  { head: ui.cQuota },
                  { head: ui.cFee },
                  { head: ui.cStatus },
                ]}
                rows={applicants.map(([no, name, sib, guardian, phone]) => [
                  <span key={no} className="text-muted-foreground">
                    {no}
                  </span>,
                  <span key={name} className="flex items-center gap-1.5">
                    <b className="font-semibold text-primary">{name}</b>
                    {sib && <Pill tone="navy">{ui.sibling}</Pill>}
                  </span>,
                  <span key={guardian}>
                    {guardian}
                    <span className="block text-[9.5px] text-muted-foreground">{phone}</span>
                  </span>,
                  ui.general,
                  <Pill key={`f${no}`} tone="green">
                    {ui.paid}
                  </Pill>,
                  <Pill key={`d${no}`} tone="green">
                    {ui.admitted}
                  </Pill>,
                ])}
              />
            </div>
          </Panel>
        </>
      }
    />
  );
}
