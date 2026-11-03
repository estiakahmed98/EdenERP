/**
 * Adon ERP public site: /[locale]/apps/project-accounting/change-orders
 * Copy lives in messages/*.json under pages.accountingShowcase.pjChangeOrders.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { FilePenLine, ShieldCheck, Scale, History } from "lucide-react";
import { ProjectPage, projectMetadata, Panel, MiniTable, KV, FormField, Pill, mono } from "../_project";

export async function generateMetadata(): Promise<Metadata> {
  return projectMetadata("pjChangeOrders", "change-orders");
}

export default function ChangeOrdersPage() {
  return (
    <ProjectPage
      section="pjChangeOrders"
      slug="change-orders"
      prefix="co"
      appName="Change Orders"
      tool="pjChangeOrders"
      features={[
        "Original, approved changes and revised contract value",
        "Original, approved changes and revised cost budget",
        "Change orders with a title, type, contract change and budget change",
        "Only approved change orders move the revised figures, original figures stay untouched for audit",
        "Requested date, status, description and reason on each change order",
      ]}
      stepTones={["amber", "teal", "red"]}
      connectStructure={[
        { key: "before", tools: ["pjOverview", "pjBudgets"] },
        { key: "after", tools: ["pjWip", "pjProgressBilling"] },
        { key: "shows", tools: ["pjPnl", "financialReports"] },
      ]}
      icons={[FilePenLine, ShieldCheck, Scale, History]}
      render={(ui) => ({
        main: (
          <>
            <div className="grid gap-3 sm:grid-cols-2">
              <Panel title={ui.contractValue}>
                <KV
                  rows={[
                    { label: ui.original, value: "BDT 52,00,000.00" },
                    { label: ui.approvedChanges, value: "BDT 1,20,000.00", tone: "text-[var(--teal)]" },
                    { label: ui.revised, value: "BDT 53,20,000.00", bold: true },
                  ]}
                />
              </Panel>
              <Panel title={ui.costBudget}>
                <KV
                  rows={[
                    { label: ui.original, value: "BDT 45,00,000.00" },
                    { label: ui.approvedChanges, value: "BDT 80,000.00", tone: "text-[var(--teal)]" },
                    { label: ui.revised, value: "BDT 45,80,000.00", bold: true },
                  ]}
                />
              </Panel>
            </div>
            <Panel title={ui.title} count={2} action={ui.add} note={ui.note}>
              <MiniTable
                cols={[
                  { head: ui.thNo },
                  { head: ui.thTitle },
                  { head: ui.thContract, align: "end", className: "hidden sm:table-cell" },
                  { head: ui.thBudget, align: "end", className: "hidden sm:table-cell" },
                  { head: ui.thStatus },
                ]}
                rows={[
                  [<span key="a" className={mono}>CO-001</span>, "Extra safety guarding", "+1,20,000", "+80,000", <Pill key="s" tone="teal">{ui.approved}</Pill>],
                  [<span key="b" className={mono}>CO-002</span>, "Second sorting lane", "+2,50,000", "+1,80,000", <Pill key="t" tone="amber">{ui.pending}</Pill>],
                ]}
              />
            </Panel>
          </>
        ),
        dialog: {
          title: ui.newTitle,
          fields: (
            <>
              <FormField label={ui.fTitle} />
              <FormField label={ui.fType} value="variation" kind="select" />
              <FormField label={ui.fContract} value="0" />
              <FormField label={ui.fBudget} value="0" />
              <FormField label={ui.fDate} value="mm/dd/yyyy" />
              <FormField label={ui.fStatus} value="pending" kind="select" />
              <FormField label={ui.fDesc} kind="area" />
            </>
          ),
        },
      })}
    />
  );
}
