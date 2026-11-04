/**
 * Adon ERP public site: /apps/education/notices
 * Copy lives in messages/*.json under pages.accountingShowcase.edNoticesPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { Eye, Send } from "lucide-react";

import { SchoolPage } from "@/components/education/school-page";
import { Box, Btn, Field, Panel, Tabs, useUi } from "@/components/education/school-ui";

import { accountingMetadata } from "../../accounting/_shared";

export async function generateMetadata(): Promise<Metadata> {
  return accountingMetadata("edNoticesPage", "/apps/education/notices");
}

export default function EducationNoticesPage() {
  const ui = useUi("edNoticesPage");
  return (
    <SchoolPage
      section="edNoticesPage"
      path="/apps/education/notices"
      tool="notices"
      preview={
        <>
          <Tabs items={[ui.tabCompose, ui.tabNotices, ui.tabTemplates, ui.tabLog, ui.tabAuto]} />
          <div className="grid gap-3 lg:grid-cols-12">
            <Panel className="lg:col-span-7">
              <div className="grid gap-2.5 sm:grid-cols-4">
                <div className="sm:col-span-2">
                  <Field label={ui.fTemplate} value={ui.templateValue} select />
                </div>
                <Field label={ui.fAudience} value={ui.audienceValue} select required />
                <Field label={ui.fClass} value={ui.classValue} select />
                <Field label={ui.fSection} value={ui.sectionValue} select required />
              </div>
              <p className="mt-3 text-[10px] text-muted-foreground">{ui.channels}</p>
              <div className="mt-1 flex flex-wrap gap-x-5 gap-y-1.5">
                <Box on label={ui.portal} />
                <Box on label={ui.sms} />
                <Box label={ui.email} />
              </div>
              <div className="mt-3 space-y-2.5">
                <Field label={ui.fTitle} value={ui.titleValue} required />
                <div>
                  <p className="text-[10px] text-muted-foreground">
                    {ui.fNotice} <span className="text-destructive">*</span>
                  </p>
                  <div className="mt-0.5 min-h-[4.5rem] rounded-lg border border-border bg-[var(--gray-bg)] px-2.5 py-2 text-[11px] leading-snug text-foreground">
                    {ui.noticeValue}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground">
                    {ui.fSms} {ui.smsCount} <span className="text-destructive">*</span>
                  </p>
                  <div className="mt-0.5 min-h-[2.5rem] rounded-lg border border-border bg-[var(--gray-bg)] px-2.5 py-2 text-[11px] leading-snug text-foreground">
                    {ui.sample}
                  </div>
                </div>
                <p className="text-[9.5px] leading-snug text-muted-foreground">
                  {ui.merge}: {ui.mergeList}
                </p>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Btn icon={<Eye className="h-3 w-3" />}>{ui.preview}</Btn>
                <Btn>{ui.saveDraft}</Btn>
                <Btn>{ui.schedule}</Btn>
                <Btn solid icon={<Send className="h-3 w-3" />}>{ui.sendNow}</Btn>
              </div>
            </Panel>
            <Panel className="lg:col-span-5" title={ui.previewTitle} taped>
              <p className="text-[10.5px] font-medium text-primary">{ui.reaches}</p>
              <div className="mt-3 rounded-xl border border-dashed border-border bg-[var(--gray-bg)] p-3">
                <p className="text-[12px] font-semibold text-foreground">{ui.titleValue}</p>
                <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">{ui.sample}</p>
              </div>
            </Panel>
          </div>
        </>
      }
    />
  );
}
