/**
 * Adon ERP public site: /apps/university/outcomes-obe
 * Copy lives in messages/*.json under pages.accountingShowcase.uniOutcomesPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { Target } from "lucide-react";

import { Panel, PencilBar, Sticker, Tabs, useUi } from "@/components/education/school-ui";
import { UniversityPage } from "@/components/university/university-page";

import { accountingMetadata } from "../../accounting/_shared";

/** DUMMY data: rows are course outcomes, columns are programme outcomes; 0 none, 1 weak, 2 medium, 3 strong. */
const matrix: number[][] = [
  [3, 1, 0, 0, 0, 0],
  [2, 3, 1, 0, 0, 0],
  [0, 2, 3, 1, 0, 0],
  [0, 0, 2, 3, 1, 0],
  [0, 0, 0, 1, 3, 2],
];
/** DUMMY data: attainment of each programme outcome, in percent. */
const attainment = [78, 71, 64, 58, 69, 74];
const cell = ["bg-muted", "bg-primary/15", "bg-primary/40", "bg-primary/75"];

export async function generateMetadata(): Promise<Metadata> {
  return accountingMetadata("uniOutcomesPage", "/apps/university/outcomes-obe");
}

export default function UniversityOutcomesPage() {
  const ui = useUi("uniOutcomesPage");
  const legend = [ui.none, ui.weak, ui.medium, ui.strong];
  return (
    <UniversityPage
      section="uniOutcomesPage"
      path="/apps/university/outcomes-obe"
      tool="outcomesObe"
      icon={Target}
      preview={
        <>
          <Tabs items={[ui.tabMap, ui.tabAssess, ui.tabAttain, ui.tabReports]} />
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
            <Sticker label={ui.kClos} value="5" />
            <Sticker label={ui.kPlos} value="6" />
            <Sticker label={ui.kMet} value="5 / 6" tone="green" />
            <Sticker label={ui.kGaps} value="1" tone="brown" />
          </div>
          <div className="grid gap-3 lg:grid-cols-12">
            <Panel className="lg:col-span-7" title={`${ui.mapTitle}: ${ui.course}`}>
              <div className="overflow-x-auto">
                <div className="grid min-w-[22rem] grid-cols-[3.5rem_repeat(6,1fr)] gap-1.5 text-center text-[10px]">
                  <span />
                  {attainment.map((_, j) => (
                    <span key={j} className="font-semibold text-muted-foreground">{ui.plo}{j + 1}</span>
                  ))}
                  {matrix.map((row, i) => (
                    <div key={i} className="contents">
                      <span className="self-center text-start font-semibold text-muted-foreground">{ui.clo}{i + 1}</span>
                      {row.map((level, j) => (
                        <span
                          key={j}
                          className={`grid h-9 place-items-center rounded-md text-[11px] font-semibold ${cell[level]} ${level >= 2 ? "text-white" : "text-muted-foreground"}`}
                        >
                          {level || ""}
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-muted-foreground">
                {legend.map((label, level) => (
                  <li key={label} className="flex items-center gap-1.5">
                    <span className={`h-3 w-3 rounded-sm ${cell[level]}`} aria-hidden="true" />
                    {level} {label}
                  </li>
                ))}
              </ul>
            </Panel>
            <Panel className="lg:col-span-5" title={ui.attainTitle} right={<span className="text-[10px] text-muted-foreground">{ui.target}</span>}>
              <ul className="space-y-3">
                {attainment.map((pct, j) => (
                  <li key={j} className="grid grid-cols-[2.6rem_1fr_2.2rem] items-center gap-3 text-[11px]">
                    <span className="font-semibold text-foreground">{ui.plo}{j + 1}</span>
                    <PencilBar pct={pct} tone={pct >= 60 ? "green" : "brown"} />
                    <span className="text-end tabular-nums text-muted-foreground">{pct}%</span>
                  </li>
                ))}
              </ul>
            </Panel>
          </div>
        </>
      }
    />
  );
}
