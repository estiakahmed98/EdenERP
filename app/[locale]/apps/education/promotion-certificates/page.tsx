/**
 * Adon ERP public site: /apps/education/promotion-certificates
 * Copy lives in messages/*.json under pages.accountingShowcase.edPromotionPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { Search } from "lucide-react";

import { SchoolPage } from "@/components/education/school-page";
import { Box, Btn, Field, Hint, Panel, Pill, Register, Tabs, useUi } from "@/components/education/school-ui";

import { accountingMetadata } from "../../accounting/_shared";

/** DUMMY data: [date, from, into, promoted, retained, passed out]. */
const runs: [string, string, string, number, number, number][] = [
  ["12 Dec 2026", "2026", "2027", 548, 21, 64],
  ["14 Dec 2025", "2025", "2026", 531, 18, 58],
];

export async function generateMetadata(): Promise<Metadata> {
  return accountingMetadata("edPromotionPage", "/apps/education/promotion-certificates");
}

export default function EducationPromotionPage() {
  const ui = useUi("edPromotionPage");
  return (
    <SchoolPage
      section="edPromotionPage"
      path="/apps/education/promotion-certificates"
      tool="promotionCertificates"
      preview={
        <>
          <Tabs items={[ui.tabPromotion, ui.tabCertificates]} />
          <Hint>{ui.hint}</Hint>
          <Panel>
            <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-5">
              <Field label={ui.fFrom} value="2027" select />
              <Field label={ui.fInto} value="2028" select />
              <Field label={ui.fDecide} value={ui.decideValue} select />
              <Field label={ui.fAllowed} value="0" />
              <Field label={ui.fRolls} value={ui.rollsValue} select />
            </div>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
              <Box on label={ui.optSections} />
              <Box on label={ui.optWaivers} />
            </div>
            <div className="mt-3">
              <Btn solid icon={<Search className="h-3 w-3" />}>{ui.preview}</Btn>
            </div>
          </Panel>
          <Panel title={ui.runsTitle}>
            <Register
              dense
              cols={[
                { head: ui.cDate },
                { head: ui.cFrom },
                { head: ui.cInto },
                { head: ui.cDecide },
                { head: ui.cPromoted, end: true },
                { head: ui.cRetained, end: true },
                { head: ui.cPassed, end: true },
                { head: ui.cStatus, className: "ps-4" },
              ]}
              rows={runs.map(([date, from, into, up, kept, out]) => [
                date,
                from,
                into,
                ui.decideValue,
                up,
                kept,
                out,
                <Pill key={date} tone="green">
                  {ui.applied}
                </Pill>,
              ])}
            />
          </Panel>
        </>
      }
    />
  );
}
