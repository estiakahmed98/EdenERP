/**
 * Adon ERP public site: /apps/education/fees
 * Copy lives in messages/*.json under pages.accountingShowcase.edFeesPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { Undo2 } from "lucide-react";

import { SchoolPage } from "@/components/education/school-page";
import { Btn, Field, Hint, Panel, Pill, Register, Tabs, num, useUi } from "@/components/education/school-ui";

import { accountingMetadata } from "../../accounting/_shared";

/** DUMMY data: [month, kind key, demands, gross, waivers, net, advance applied]. */
const runs: [string, string, number, number, number, number, number][] = [
  ["2027-10", "lateFines", 1175, 117500, 0, 117500, 0],
  ["2027-10", "fees", 1720, 4579600, 127720, 4451880, 61400],
  ["2027-09", "fees", 1719, 4237400, 127720, 4109680, 45300],
  ["2027-08", "fees", 1719, 4237400, 127720, 4109680, 67400],
  ["2027-07", "fees", 1719, 4237400, 127720, 4109680, 55800],
];

export async function generateMetadata(): Promise<Metadata> {
  return accountingMetadata("edFeesPage", "/apps/education/fees");
}

export default function EducationFeesPage() {
  const ui = useUi("edFeesPage");
  return (
    <SchoolPage
      section="edFeesPage"
      path="/apps/education/fees"
      tool="fees"
      preview={
        <>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Tabs active={1} items={[ui.tabCounter, ui.tabRuns, ui.tabStructure, ui.tabHeads, ui.tabWaivers, ui.tabReleases]} />
            <span className="flex gap-2">
              <Pill tone="blue">{ui.basis}</Pill>
              <Pill tone="muted">{ui.year}</Pill>
            </span>
          </div>
          <Hint>{ui.hint}</Hint>
          <Panel>
            <div className="flex items-end gap-2">
              <div className="w-48">
                <Field label={ui.fMonth} value={ui.monthValue} />
              </div>
              <Btn>{ui.preview}</Btn>
            </div>
          </Panel>
          <Panel>
            <Register
              dense
              cols={[
                { head: ui.cMonth },
                { head: ui.cKind },
                { head: ui.cDemands, end: true },
                { head: ui.cGross, end: true },
                { head: ui.cWaivers, end: true },
                { head: ui.cNet, end: true },
                { head: ui.cAdvance, end: true },
                { head: ui.cStatus, className: "ps-4" },
                { head: "-" },
              ]}
              rows={runs.map(([month, kind, demands, gross, waivers, net, advance], i) => [
                <b key={`${month}${kind}`} className="font-semibold text-foreground">
                  {month}
                </b>,
                ui[kind],
                demands,
                num(gross),
                <span key={`w${i}`} className="text-muted-foreground">
                  {num(waivers)}
                </span>,
                num(net),
                <span key={`a${i}`} className="text-muted-foreground">
                  {num(advance)}
                </span>,
                <Pill key={`s${i}`} tone="green">
                  {ui.posted}
                </Pill>,
                kind === "fees" ? (
                  <Btn key={`r${i}`} icon={<Undo2 className="h-3 w-3" />}>{ui.reverse}</Btn>
                ) : (
                  ""
                ),
              ])}
            />
          </Panel>
        </>
      }
    />
  );
}
