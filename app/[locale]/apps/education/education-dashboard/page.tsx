/**
 * Adon ERP public site: /apps/education/education-dashboard
 * Copy lives in messages/*.json under pages.accountingShowcase.edDashboardPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";

import { SchoolPage } from "@/components/education/school-page";
import { Hint, Panel, PencilBar, Register, Sticker, num, useUi, type Tone } from "@/components/education/school-ui";

import { accountingMetadata } from "../../accounting/_shared";

/** DUMMY data: [class, sections, enrolled, capacity]. */
const classes: [string, number, number, number][] = [
  ["Playgroup", 2, 62, 60],
  ["Nursery", 2, 78, 80],
  ["Class I", 3, 112, 120],
  ["Class V", 3, 118, 120],
  ["Class IX", 2, 42, 60],
];
const terms: [string, string][] = [
  ["term1", "Jan to Apr"],
  ["term2", "May to Aug"],
  ["term3", "Sep to Dec"],
];

export async function generateMetadata(): Promise<Metadata> {
  return accountingMetadata("edDashboardPage", "/apps/education/education-dashboard");
}

export default function EducationDashboardPage() {
  const ui = useUi("edDashboardPage");
  const enrolled = classes.reduce((n, c) => n + c[2], 0);
  const capacity = classes.reduce((n, c) => n + c[3], 0);
  const pct = (enrolled / capacity) * 100;
  const tone = (p: number): Tone => (p > 100 ? "red" : p > 85 ? "green" : "blue");
  return (
    <SchoolPage
      section="edDashboardPage"
      path="/apps/education/education-dashboard"
      tool="educationDashboard"
      preview={
        <>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
            <Sticker label={ui.sEnrolled} value={num(enrolled)} sub={`of ${num(capacity)} seats`} />
            <Sticker label={ui.sSeats} value={`${pct.toFixed(1)}%`} tone={tone(pct)} />
            <Sticker label={ui.sSections} value="12" />
            <Sticker label={ui.sTeachers} value="34" />
            <Sticker label={ui.sFamilies} value="356" sub={ui.sFamiliesSub} />
            <Sticker label={ui.sApplicants} value="58" tone="blue" />
          </div>
          <div className="grid gap-3 lg:grid-cols-12">
            <Panel className="lg:col-span-7" title={ui.byClass}>
              <Register
                dense
                cols={[
                  { head: ui.cClass },
                  { head: ui.cSections, end: true },
                  { head: ui.cEnrolled, end: true },
                  { head: ui.cCapacity, end: true },
                  { head: ui.cPct, className: "w-28 ps-4" },
                ]}
                rows={classes.map(([name, s, e, c]) => [
                  name,
                  s,
                  e,
                  c,
                  <PencilBar key={name} pct={(e / c) * 100} tone={tone((e / c) * 100)} />,
                ])}
              />
            </Panel>
            <div className="space-y-3 lg:col-span-5">
              <Panel title={ui.termsTitle}>
                <ul className="space-y-1.5 text-[11px]">
                  {terms.map(([k, dates]) => (
                    <li key={k} className="flex justify-between border-b border-dashed border-border pb-1.5 last:border-0 last:pb-0">
                      <span className="font-medium text-foreground">{ui[k]}</span>
                      <span className="text-muted-foreground">{dates}</span>
                    </li>
                  ))}
                </ul>
              </Panel>
              <Panel title={ui.genderTitle}>
                <div className="flex h-2 overflow-hidden rounded-full" aria-hidden="true">
                  <span className="bg-primary" style={{ width: "46%" }} />
                  <span className="bg-[var(--teal)]" style={{ width: "54%" }} />
                </div>
                <p className="mt-2 flex justify-between text-[11px] text-muted-foreground">
                  <span>
                    {ui.boys}: <b className="text-foreground">190</b>
                  </span>
                  <span>
                    {ui.girls}: <b className="text-foreground">222</b>
                  </span>
                </p>
              </Panel>
              <Hint>{ui.note}</Hint>
            </div>
          </div>
        </>
      }
    />
  );
}
