/**
 * Adon ERP public site: /[locale]/apps/project-accounting/boq
 * Copy lives in messages/*.json under pages.accountingShowcase.pjBoq.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { ListChecks, Ruler, Calculator, Hammer } from "lucide-react";
import { ProjectPage, projectMetadata, Panel, MiniTable, FormField, mono } from "../_project";

/** DUMMY data. */
const rows = [
  ["1.1", "Conveyor belt section", "m", "120", "11,40,000", "60"],
  ["1.2", "Sorting robot arm", "each", "2", "7,00,000", "1"],
  ["2.1", "PLC control panel", "each", "3", "3,60,000", "1"],
  ["2.2", "Cable tray", "m", "400", "4,40,000", "150"],
];

export async function generateMetadata(): Promise<Metadata> {
  return projectMetadata("pjBoq", "boq");
}

export default function BoqPage() {
  return (
    <ProjectPage
      section="pjBoq"
      slug="boq"
      prefix="bq"
      appName="BOQ"
      tool="pjBoq"
      features={[
        "A bill of quantities with item number, description, unit, quantity and unit rate",
        "Amount worked out for every row",
        "Completed quantity, used for progress billing",
        "Item numbers in a tree such as 1.2.3, with a sort order",
      ]}
      stepTones={["blue", "teal", "amber"]}
      connectStructure={[
        { key: "before", tools: ["pjCostCodes", "pjOverview"] },
        { key: "after", tools: ["pjProgressBilling", "pjWip"] },
        { key: "shows", tools: ["pjPnl", "invoicesAr"] },
      ]}
      icons={[ListChecks, Ruler, Calculator, Hammer]}
      render={(ui) => ({
        main: (
          <Panel title={ui.title} count={4} action={ui.add}>
            <MiniTable
              cols={[
                { head: ui.thItem },
                { head: ui.thDesc },
                { head: ui.thUnit, className: "hidden sm:table-cell" },
                { head: ui.thQty, align: "end", className: "hidden sm:table-cell" },
                { head: ui.thAmount, align: "end" },
                { head: ui.thDone, align: "end" },
              ]}
              rows={rows.map((r) => [
                <span key="i" className={mono}>{r[0]}</span>,
                <span key="d" className="block max-w-[9rem] truncate">{r[1]}</span>,
                <span key="u" className="text-muted-foreground">{r[2]}</span>,
                <span key="q">{r[3]}</span>,
                <span key="a">{r[4]}</span>,
                <span key="n">{r[5]}</span>,
              ])}
            />
          </Panel>
        ),
        dialog: {
          title: ui.newTitle,
          fields: (
            <>
              <FormField label={ui.fItem} />
              <FormField label={ui.fDesc} kind="area" />
              <FormField label={ui.fUnit} value="each" />
              <FormField label={ui.fQty} value="1" />
              <FormField label={ui.fRate} value="0" />
              <FormField label={ui.fDone} value="0" />
            </>
          ),
        },
      })}
    />
  );
}
