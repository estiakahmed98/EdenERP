/**
 * Adon ERP public site: /[locale]/apps/accounting/bank-accounts
 * Copy lives in messages/*.json under pages.accountingShowcase.bankAccounts.
 * ALL DATA ON THIS PAGE IS DUMMY. Account numbers are masked and invented.
 *
 * Who is reading: the owner and the accountant who reconcile the bank
 * The question:   "How do I tell the books which bank accounts the company has?"
 */
import type { Metadata } from "next";
import { Banknote, Landmark, Lock, ScrollText } from "lucide-react";

import { useCommon } from "../_shared";
import {
  Btn,
  Field,
  Pill,
  TemplatePage,
  TemplatePreview,
  accountingPageMetadata,
  useTemplateContent,
  type Col,
} from "../_template";

/** DUMMY data. */
const accounts = [
  { name: "LC & FC Account — Eastern Bank", last4: "2621" },
  { name: "Operating Account — Dutch-Bangla Bank", last4: "7054" },
];

export async function generateMetadata(): Promise<Metadata> {
  return accountingPageMetadata("bankAccounts", "bank-accounts");
}

export default function BankAccountsPage() {
  const content = useTemplateContent("bankAccounts");
  const { t: common } = useCommon();
  const { ui } = content;

  const cols: Col[] = [
    { head: ui.thName },
    { head: ui.thRouting, className: "hidden sm:table-cell" },
    { head: ui.thAccount },
    { head: ui.thStatus },
    { head: "", align: "end" },
  ];
  const rows = accounts.map((r) => [
    <span key="n" className="block truncate font-medium">{r.name}</span>,
    <span key="r" className="text-muted-foreground">—</span>,
    <span key="a" className="tabular-nums">****{r.last4}</span>,
    <Pill key="s" tone="teal">{ui.active}</Pill>,
    <Btn key="e">{common("edit")}</Btn>,
  ]);

  return (
    <TemplatePage
      slug="bank-accounts"
      prefix="ba"
      appName="Bank Accounts"
      features={[
        "Bank accounts linked to a cash account in the chart of accounts",
        "Bank name, routing number and account number",
        "Account numbers shown masked, last four digits only",
        "Active status, so closed accounts leave the pick lists",
        "Search, CSV and Excel export, print",
      ]}
      content={content}
      connectStructure={[
        { key: "before", tools: ["chartOfAccounts"] },
        { key: "after", tools: ["receipts", "chequeRegister", "billsAp"] },
        { key: "shows", tools: ["ledgers", "financialReports", "accountingHub"] },
      ]}
      localIcons={[Landmark, Lock, ScrollText, Banknote]}
      preview={
        <TemplatePreview
          prefix="ba"
          toolKey="bankAccounts"
          content={content}
          newLabel={ui.newShort}
          cols={cols}
          rows={rows}
          dialogTitle={ui.newTitle}
          dialogActions={[common("cancel"), ui.create]}
          dialog={
            <>
              <Field wide label={ui.fBank} value="e.g. Chase Business" />
              <Field wide label={ui.fCash} value={ui.searchAccount} select />
              <Field wide label={ui.fRouting} value={ui.optional} />
              <Field wide label={ui.fAccount} value={ui.optional} />
            </>
          }
        />
      }
    />
  );
}
