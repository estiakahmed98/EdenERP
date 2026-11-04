/**
 * Adon ERP public site: /apps/education/store-issues
 * Copy lives in messages/*.json under pages.accountingShowcase.edStorePage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { Plus } from "lucide-react";

import { SchoolPage } from "@/components/education/school-page";
import { Box, Btn, Field, Panel, Register, Tabs, taka, useUi } from "@/components/education/school-ui";

import { accountingMetadata } from "../../accounting/_shared";

/** DUMMY data: [item key, quantity, unit price]. */
const items: [string, number, number][] = [
  ["item1", 2, 700],
  ["item2", 6, 60],
  ["item3", 1, 180],
];

export async function generateMetadata(): Promise<Metadata> {
  return accountingMetadata("edStorePage", "/apps/education/store-issues");
}

export default function EducationStorePage() {
  const ui = useUi("edStorePage");
  const total = items.reduce((n, [, q, p]) => n + q * p, 0);
  return (
    <SchoolPage
      section="edStorePage"
      path="/apps/education/store-issues"
      tool="storeIssues"
      preview={
        <>
          <Tabs items={[ui.tabIssue, ui.tabIssued]} />
          <Panel>
            <div className="grid gap-2.5 sm:grid-cols-2">
              <Field label={ui.fPupil} value={ui.pupilHint} required />
              <Field label={ui.fStore} value={ui.storeValue} select required />
            </div>
            <div className="mt-3 flex gap-5">
              <Box radio on label={ui.charged} />
              <Box radio label={ui.free} />
            </div>
            <p className="mt-2 text-[10px] leading-snug text-muted-foreground">{ui.chargeHint}</p>
            <div className="mt-3">
              <Register
                dense
                cols={[{ head: ui.cItem }, { head: ui.cQty, end: true }, { head: ui.cAmount, end: true }]}
                rows={items.map(([key, qty, price]) => [ui[key], qty, taka(qty * price)])}
              />
            </div>
            <div className="mt-3">
              <Btn icon={<Plus className="h-3 w-3" />}>{ui.addItem}</Btn>
            </div>
            <div className="mt-3 max-w-md">
              <Field label={ui.fNote} value={ui.noteValue} />
            </div>
            <div className="mt-3 flex items-center justify-between gap-3">
              <p className="text-[13px] font-semibold text-foreground">
                {ui.total}: {taka(total)}
              </p>
              <Btn solid>{ui.issue}</Btn>
            </div>
          </Panel>
        </>
      }
    />
  );
}
