/**
 * Adon ERP public site: /apps/education/online-payments
 * Copy lives in messages/*.json under pages.accountingShowcase.edOnlinePage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { RefreshCw } from "lucide-react";

import { SchoolPage } from "@/components/education/school-page";
import { Box, Btn, Field, Panel, Pill, Register, Sticker, Tabs, taka, useUi, type Tone } from "@/components/education/school-ui";

import { accountingMetadata } from "../../accounting/_shared";

/** DUMMY data: [payment, date, family, code, amount, status key, tone, gateway txn, receipt]. */
const payments: [string, string, string, string, number, string, Tone, string, string][] = [
  ["EPY-2027-000012", "04 Nov, 10:42", "Arif Hossain", "FAM-2021-000112", 4500, "paid", "green", "GWT0000412", "MR-2027-008812"],
  ["EPY-2027-000011", "04 Nov, 09:15", "Shirin Akter", "FAM-2019-000047", 3000, "paid", "green", "GWT0000411", "MR-2027-008811"],
  ["EPY-2027-000010", "03 Nov, 17:30", "Nazmul Haque", "FAM-2020-000080", 2000, "settled", "muted", "GWT0000409", "MR-2027-008809"],
  ["EPY-2027-000009", "03 Nov, 16:02", "Mehedi Rahman", "FAM-2022-000151", 2000, "failed", "red", "", ""],
];

export async function generateMetadata(): Promise<Metadata> {
  return accountingMetadata("edOnlinePage", "/apps/education/online-payments");
}

export default function EducationOnlinePage() {
  const ui = useUi("edOnlinePage");
  return (
    <SchoolPage
      section="edOnlinePage"
      path="/apps/education/online-payments"
      tool="onlinePayments"
      preview={
        <>
          <Tabs items={[ui.tabRecon, ui.tabGateways]} />
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            <Sticker label={ui.kPaid} value="12" sub={ui.kPaidSub} tone="green" />
            <Sticker label={ui.kUnsettled} value={taka(30500)} sub={ui.kUnsettledSub} />
            <Sticker label={ui.kClearing} value={taka(30500)} sub={ui.kClearingSub} />
            <Sticker label={ui.kReview} value="1" tone="brown" />
          </div>
          <Panel>
            <div className="mb-3 flex flex-wrap items-end gap-2">
              <div className="w-44">
                <Field label={ui.fStatus} value={ui.all} select />
              </div>
              <Btn icon={<RefreshCw className="h-3 w-3" />}>{ui.refresh}</Btn>
              <span className="rounded-lg bg-primary/40 px-2.5 py-1.5 text-[11px] font-medium text-white">{ui.settle}</span>
            </div>
            <Register
              dense
              cols={[
                { head: "-", className: "w-6" },
                { head: ui.cPayment },
                { head: ui.cDate },
                { head: ui.cFamily },
                { head: ui.cAmount, end: true },
                { head: ui.cStatus, className: "ps-4" },
                { head: ui.cTxn },
                { head: ui.cReceipt },
              ]}
              rows={payments.map(([no, date, family, code, amount, st, tone, txn, receipt]) => [
                st === "paid" ? <Box key={no} label="" /> : "",
                <span key={`p${no}`}>
                  {no}
                  <span className="block text-[9.5px] text-muted-foreground">{ui.testGateway}</span>
                </span>,
                date,
                <span key={`f${no}`}>
                  {family}
                  <span className="block text-[9.5px] text-muted-foreground">{code}</span>
                </span>,
                taka(amount),
                <Pill key={`s${no}`} tone={tone}>
                  {ui[st]}
                </Pill>,
                txn || "–",
                receipt ? <span key={`r${no}`} className="text-primary underline">{receipt}</span> : "–",
              ])}
            />
          </Panel>
        </>
      }
    />
  );
}
