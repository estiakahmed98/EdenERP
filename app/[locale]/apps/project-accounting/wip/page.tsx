/**
 * Adon ERP public site: /[locale]/apps/project-accounting/wip
 * Copy lives in messages/*.json under pages.accountingShowcase.pjWip.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { Gauge, PieChart, Hourglass, Scale } from "lucide-react";
import { ProjectPage, projectMetadata, Panel, Stat, KV } from "../_project";

export async function generateMetadata(): Promise<Metadata> {
  return projectMetadata("pjWip", "wip");
}

export default function WipPage() {
  return (
    <ProjectPage
      section="pjWip"
      slug="wip"
      prefix="wp"
      appName="WIP"
      tool="pjWip"
      features={[
        "Percentage-of-completion revenue, worked out cost to cost",
        "Percent complete as cost to date over estimated total cost",
        "Earned revenue, billed to date, over-billing and under-billing",
        "Estimated total cost, cost to date and cost to complete",
        "Estimated gross profit and margin on the revised contract value",
      ]}
      stepTones={["blue", "teal", "amber"]}
      connectStructure={[
        { key: "before", tools: ["pjJobCost", "pjChangeOrders", "pjProgressBilling"] },
        { key: "after", tools: ["journalEntries", "financialReports"] },
        { key: "shows", tools: ["pjPnl", "pjSchedule"] },
      ]}
      icons={[Gauge, PieChart, Hourglass, Scale]}
      render={(ui) => ({
        main: (
          <>
            <p className="text-[10.5px] leading-snug text-muted-foreground">{ui.note}</p>
            <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
              <Stat label={ui.contract} value="BDT 53,20,000" />
              <Stat label={ui.eac} value="BDT 45,80,000" />
              <Stat label={ui.profit} value="BDT 7,40,000" sub={ui.margin} tone="text-[var(--teal)]" />
              <Stat label={ui.complete} value="39.3%" sub={ui.costToCost} />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Panel title={ui.revenueTitle}>
                <KV
                  rows={[
                    { label: ui.earned, value: "BDT 20,90,830" },
                    { label: ui.billed, value: "BDT 15,00,000" },
                    { label: ui.over, value: "BDT 0", bold: true, tone: "text-muted-foreground" },
                    { label: ui.under, value: "BDT 5,90,830", bold: true, tone: "text-amber-600 dark:text-amber-400" },
                  ]}
                />
              </Panel>
              <Panel title={ui.costTitle}>
                <KV
                  rows={[
                    { label: ui.costToDate, value: "BDT 18,00,000" },
                    { label: ui.etc, value: "BDT 27,80,000" },
                    { label: ui.eacLong, value: "BDT 45,80,000", bold: true },
                  ]}
                />
              </Panel>
            </div>
          </>
        ),
      })}
    />
  );
}
