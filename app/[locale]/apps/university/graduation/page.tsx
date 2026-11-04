/**
 * Adon ERP public site: /apps/university/graduation
 * Copy lives in messages/*.json under pages.accountingShowcase.uniGraduationPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { GraduationCap } from "lucide-react";

import { Initials, Panel, PencilBar, Pill, Register, Tabs, useUi, type Tone } from "@/components/education/school-ui";
import { UniversityPage } from "@/components/university/university-page";

import { accountingMetadata } from "../../accounting/_shared";

/** DUMMY data: [requirement key, earned, required]. Earned adds up to 118 of 130. */
const requirements: [string, number, number][] = [
  ["core", 54, 54],
  ["elective", 30, 36],
  ["thesis", 6, 6],
  ["general", 28, 34],
];
/** DUMMY data: [office key, state]. */
const clearances: [string, "cleared" | "pending"][] = [
  ["library", "cleared"],
  ["hostel", "cleared"],
  ["accounts", "pending"],
  ["department", "cleared"],
];
/** DUMMY data: [student ID, name, programme, CGPA, ready?]. */
const list: [string, string, string, string, boolean][] = [
  ["2021-1-60-018", "Nusrat Jahan", "BSc CSE", "3.84", false],
  ["2021-1-60-012", "Rafiq Ahmed", "BSc CSE", "3.91", true],
  ["2021-2-10-007", "Sumaiya Akter", "BBA", "3.62", true],
  ["2021-3-20-033", "Tanvir Hasan", "BSc EEE", "3.45", true],
];
const clearTone: Record<string, Tone> = { cleared: "green", pending: "brown" };

export async function generateMetadata(): Promise<Metadata> {
  return accountingMetadata("uniGraduationPage", "/apps/university/graduation");
}

export default function UniversityGraduationPage() {
  const ui = useUi("uniGraduationPage");
  const earned = requirements.reduce((n, r) => n + r[1], 0);
  const required = requirements.reduce((n, r) => n + r[2], 0);
  const pct = (earned / required) * 100;
  return (
    <UniversityPage
      section="uniGraduationPage"
      path="/apps/university/graduation"
      tool="graduation"
      icon={GraduationCap}
      preview={
        <>
          <Tabs items={[ui.tabAudit, ui.tabClearance, ui.tabConvocation, ui.tabCertificates]} />
          <div className="grid gap-3 lg:grid-cols-12">
            <Panel className="lg:col-span-7" title={`${ui.student}, ${ui.programme}`} right={<span className="font-mono text-[10px] text-muted-foreground">{ui.studentId}</span>}>
              <div className="flex flex-wrap items-center gap-5">
                <div className="relative shrink-0" style={{ width: 112, height: 112 }} aria-hidden="true">
                  <div
                    className="h-full w-full rounded-full"
                    style={{ background: `conic-gradient(var(--teal) ${pct}%, var(--muted) 0)` }}
                  />
                  <div className="absolute inset-[12px] flex flex-col items-center justify-center rounded-full bg-card">
                    <span className="text-[17px] font-semibold tabular-nums text-foreground">{earned}</span>
                    <span className="text-[9px] text-muted-foreground">
                      {ui.of} {required} {ui.creditsLabel}
                    </span>
                  </div>
                </div>
                <ul className="min-w-0 flex-1 space-y-2.5">
                  {requirements.map(([key, got, need]) => (
                    <li key={key} className="grid grid-cols-[6.5rem_1fr_3rem] items-center gap-3 text-[11px]">
                      <span className="text-foreground">{ui[key]}</span>
                      <PencilBar pct={(got / need) * 100} tone={got >= need ? "green" : "blue"} />
                      <span className="text-end tabular-nums text-muted-foreground">
                        {got}/{need}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Panel>
            <Panel className="lg:col-span-5" title={ui.clearTitle}>
              <ul className="space-y-2">
                {clearances.map(([office, state]) => (
                  <li key={office} className="flex items-center justify-between gap-2 rounded-lg border border-dashed border-border px-3 py-2 text-[11.5px]">
                    <span className="text-foreground">{ui[office]}</span>
                    <Pill tone={clearTone[state]}>{state === "cleared" ? ui.cleared : ui.pending}</Pill>
                  </li>
                ))}
              </ul>
            </Panel>
          </div>
          <Panel title={ui.listTitle}>
            <Register
              dense
              cols={[
                { head: ui.cId },
                { head: ui.cName },
                { head: ui.cProgramme },
                { head: ui.cCgpa, end: true },
                { head: ui.cStatus, className: "ps-4" },
              ]}
              rows={list.map(([id, name, programme, cgpa, ready], i) => [
                <span key={id} className="text-muted-foreground">{id}</span>,
                <span key={name} className="flex items-center gap-2">
                  <Initials name={name} tone={i} />
                  <b className="font-semibold text-foreground">{name}</b>
                </span>,
                programme,
                cgpa,
                <Pill key={`s${id}`} tone={ready ? "green" : "brown"}>{ready ? ui.ready : ui.missing}</Pill>,
              ])}
            />
          </Panel>
        </>
      }
    />
  );
}
