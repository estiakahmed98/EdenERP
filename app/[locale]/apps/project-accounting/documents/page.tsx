/**
 * Adon ERP public site: /[locale]/apps/project-accounting/documents
 * Copy lives in messages/*.json under pages.accountingShowcase.pjDocuments.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { FileText, Paperclip, CalendarClock, FileCheck } from "lucide-react";
import { ProjectPage, projectMetadata, Panel, MiniTable } from "../_project";

/** DUMMY data. */
const library = [
  ["Import Registration Certificate (IRC)", "license"],
  ["Export Registration Certificate (ERC)", "license"],
  ["Fire License", "license"],
  ["Trade License", "license"],
  ["TIN Certificate", "registration"],
];

export async function generateMetadata(): Promise<Metadata> {
  return projectMetadata("pjDocuments", "documents");
}

export default function DocumentsPage() {
  return (
    <ProjectPage
      section="pjDocuments"
      slug="documents"
      prefix="dc"
      appName="Documents"
      tool="pjDocuments"
      features={[
        "Documents linked to a project: contracts, permits and drawings",
        "Attach from the company document library, so nothing is uploaded twice",
        "Category and expiry date shown on each attached document",
        "Licences, certificates, registrations and insurance policies in one picker",
      ]}
      stepTones={["blue", "teal", "amber"]}
      connectStructure={[
        { key: "before", tools: ["pjOverview"] },
        { key: "after", tools: ["pjMilestones", "pjProgressBilling"] },
        { key: "shows", tools: ["pjRisks", "pjSchedule"] },
      ]}
      icons={[FileText, Paperclip, CalendarClock, FileCheck]}
      render={(ui) => ({
        main: (
          <Panel title={ui.title} count={2} action={ui.attach} note={ui.note}>
            <MiniTable
              cols={[{ head: ui.thTitle }, { head: ui.thCategory, className: "hidden sm:table-cell" }, { head: ui.thExpiry }]}
              rows={[
                ["Trade License", "license", "12/31/2026"],
                ["Fire & General Insurance Policy", "insurance", "06/30/2027"],
              ]}
            />
          </Panel>
        ),
        dialog: {
          title: ui.dialogTitle,
          noFooter: true,
          fields: (
            <>
              <MiniTable
                cols={[{ head: ui.thTitle }, { head: ui.thCategory, className: "hidden sm:table-cell" }, { head: "" }]}
                rows={library.map((d) => [
                  <span key="t" className="block max-w-[11rem] truncate">{d[0]}</span>,
                  <span key="c" className="text-muted-foreground">{d[1]}</span>,
                  <span key="a" className="rounded border border-border px-1.5 py-0.5 text-primary">{ui.attachBtn}</span>,
                ])}
              />
              <p className="text-end text-[11px]">
                <span className="rounded-md border border-border px-2.5 py-1 text-primary">{ui.close}</span>
              </p>
            </>
          ),
        },
      })}
    />
  );
}
