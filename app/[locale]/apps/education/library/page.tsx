/**
 * Adon ERP public site: /apps/education/library
 * Copy lives in messages/*.json under pages.accountingShowcase.edLibraryPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";

import { SchoolPage } from "@/components/education/school-page";
import { Box, Btn, Field, Panel, Sticker, Tabs, taka, useUi } from "@/components/education/school-ui";

import { accountingMetadata } from "../../accounting/_shared";

export async function generateMetadata(): Promise<Metadata> {
  return accountingMetadata("edLibraryPage", "/apps/education/library");
}

export default function EducationLibraryPage() {
  const ui = useUi("edLibraryPage");
  return (
    <SchoolPage
      section="edLibraryPage"
      path="/apps/education/library"
      tool="library"
      preview={
        <>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
            <Sticker label={ui.kTitles} value="48" />
            <Sticker label={ui.kCopies} value="153" sub={ui.kCopiesSub} />
            <Sticker label={ui.kLoan} value="65" />
            <Sticker label={ui.kOverdue} value="61" tone="red" />
            <Sticker label={ui.kFines} value={taka(0)} />
          </div>
          <Tabs items={[ui.tabIssue, ui.tabBooks, ui.tabLoans, ui.tabRules]} />
          <div className="grid gap-3 md:grid-cols-2">
            <Panel title={ui.issueTitle}>
              <div className="space-y-2.5">
                <Field label={ui.fAccession} value={ui.accessionHint} required />
                <div className="flex gap-5">
                  <Box radio on label={ui.pupil} />
                  <Box radio label={ui.staff} />
                </div>
                <Field label={ui.fPupil} value={ui.pupilHint} required />
                <Btn solid>{ui.issueBtn}</Btn>
              </div>
            </Panel>
            <Panel title={ui.returnTitle}>
              <div className="space-y-2.5">
                <Field label={ui.fAccession} value={ui.accessionHint} required />
                <Field label={ui.fWaive} />
                <p className="text-[10px] leading-snug text-muted-foreground">{ui.returnNote}</p>
                <Btn solid>{ui.returnBtn}</Btn>
              </div>
            </Panel>
          </div>
        </>
      }
    />
  );
}
