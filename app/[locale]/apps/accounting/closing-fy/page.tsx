/**
 * Adon ERP public site: /[locale]/apps/accounting/closing-fy
 * Copy lives in messages/*.json under pages.accountingShowcase.closingFy.
 * ALL DATA ON THIS PAGE IS DUMMY.
 *
 * Who is reading: the accountant and the owner at year end
 * The question:   "What does closing the year do, and where do I see that it was done?"
 */
import type { Metadata } from "next";
import { CalendarCheck, FileLock2, ScrollText, TrendingUp } from "lucide-react";

import {
  TemplatePage,
  TemplatePreview,
  accountingPageMetadata,
  useTemplateContent,
  type Col,
} from "../_template";

export async function generateMetadata(): Promise<Metadata> {
  return accountingPageMetadata("closingFy", "closing-fy");
}

export default function ClosingFyPage() {
  const content = useTemplateContent("closingFy");
  const { ui } = content;

  const cols: Col[] = [{ head: ui.thDate }, { head: ui.thDescription }, { head: ui.thPosted, align: "end" }];

  return (
    <TemplatePage
      slug="closing-fy"
      prefix="cf"
      appName="Closing & FY"
      features={[
        "A list of closing entries, one for each financial year closed",
        "Date, description and posted status on each entry",
        "Income and expense accounts brought to zero into retained earnings",
        "Empty until the first year is closed",
        "Search, CSV and Excel export, print",
      ]}
      content={content}
      stepTones={["blue", "teal", "muted"]}
      connectStructure={[
        { key: "before", tools: ["journalEntries", "financialReports"] },
        { key: "after", tools: ["ledgers", "chartOfAccounts"] },
        { key: "shows", tools: ["accountingHub", "vatRegister"] },
      ]}
      localIcons={[CalendarCheck, TrendingUp, FileLock2, ScrollText]}
      preview={
        <TemplatePreview
          prefix="cf"
          toolKey="closingFy"
          title={ui.title}
          content={content}
          cols={cols}
          rows={[]}
          emptyText={ui.empty}
        />
      }
    />
  );
}
