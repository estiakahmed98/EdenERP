/**
 * Adon ERP public site: /[locale]/apps/project-accounting/progress-billing
 * Copy lives in messages/*.json under pages.accountingShowcase.pjProgressBilling.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { ReceiptText, Percent, HandCoins, ShieldCheck } from "lucide-react";
import { ProjectPage, projectMetadata, Panel, MiniTable, Stat, FormField, Pill, mono } from "../_project";

export async function generateMetadata(): Promise<Metadata> {
  return projectMetadata("pjProgressBilling", "progress-billing");
}

export default function ProgressBillingPage() {
  return (
    <ProjectPage
      section="pjProgressBilling"
      slug="progress-billing"
      prefix="pb"
      appName="Progress Billing"
      tool="pjProgressBilling"
      features={[
        "Interim payment certificates (IPCs) with period, gross work done and retention",
        "Deductions for retention, mobilization recovery, AIT and VDS",
        "Net payable worked out for each certificate",
        "Retention held as a receivable until release at completion",
        "Subcontractor retention withheld from supplier bills, as a percentage of the pre-VAT subtotal",
      ]}
      stepTones={["blue", "teal", "amber"]}
      connectStructure={[
        { key: "before", tools: ["pjMilestones", "pjBoq", "pjWip"] },
        { key: "after", tools: ["invoicesAr", "receipts"] },
        { key: "shows", tools: ["pjPnl", "vatRegister", "financialReports"] },
      ]}
      icons={[ReceiptText, Percent, HandCoins, ShieldCheck]}
      render={(ui) => ({
        main: (
          <>
            <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
              <Stat label={ui.retHeld} value="BDT 1,50,000" />
              <Stat label={ui.retPayable} value="BDT 40,000" />
              <Stat label={ui.gross} value="BDT 15,00,000" />
              <Stat label={ui.net} value="BDT 11,60,000" tone="text-[var(--teal)]" />
              <Stat label={ui.ait} value="BDT 90,000" />
              <Stat label={ui.vds} value="BDT 0" />
              <Stat label={ui.mob} value="BDT 1,00,000" />
            </div>
            <Panel title={ui.ipcTitle} count={1} action={ui.newIpc} note={ui.ipcNote}>
              <MiniTable
                cols={[
                  { head: ui.thIpc },
                  { head: ui.thPeriod, className: "hidden sm:table-cell" },
                  { head: ui.thGross, align: "end" },
                  { head: ui.thRetention, align: "end", className: "hidden md:table-cell" },
                  { head: ui.ait, align: "end", className: "hidden md:table-cell" },
                  { head: ui.thNet, align: "end" },
                  { head: ui.thStatus },
                ]}
                rows={[[<span key="n" className={mono}>IPC-001</span>, "09/30/2026", "15,00,000", "1,50,000", "90,000", "11,60,000", <Pill key="s" tone="teal">{ui.certified}</Pill>]]}
              />
            </Panel>
            <Panel title={ui.subTitle} note={ui.subNote}>
              <MiniTable
                cols={[{ head: ui.thBill }, { head: ui.thSubtotal, align: "end" }, { head: ui.thStatus, className: "hidden sm:table-cell" }, { head: ui.thRetPct, align: "end" }]}
                rows={[[<span key="b" className={mono}>BILL-2026-000046 · Dhaka Machinery Co</span>, "4,00,000", ui.approved, "10%"]]}
              />
            </Panel>
          </>
        ),
        dialog: {
          title: ui.newTitle,
          fields: (
            <>
              <FormField label={ui.fFrom} value="mm/dd/yyyy" />
              <FormField label={ui.fTo} value="mm/dd/yyyy" />
              <FormField label={ui.fGross} value="0" />
              <FormField label={ui.fRetention} value="10" />
              <FormField label={ui.fMob} value="0" />
              <FormField label={ui.fAit} value="6" />
              <FormField label={ui.fVds} value="0" />
              <FormField label={ui.fOther} value="0" />
              <FormField label={ui.fStatus} value="draft" kind="select" />
            </>
          ),
        },
      })}
    />
  );
}
