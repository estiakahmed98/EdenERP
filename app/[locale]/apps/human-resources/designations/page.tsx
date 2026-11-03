/**
 * Adon ERP public site: /apps/human-resources/designations
 * Copy lives in messages/*.json under pages.accountingShowcase.hrDesig.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { BadgeCheck, Layers, ListTree, Users } from "lucide-react";

import { Card, Chip, Field, HrPage, Table, hrMetadata } from "../_hr";

/** DUMMY data: [designation, department, grade band, headcount, vacant]. */
const rows: [string, string, string, number, number][] = [
  ["Machine Operator", "Production", "G1-G2", 86, 4],
  ["Line Supervisor", "Production", "G3", 9, 1],
  ["QC Inspector", "Quality", "G2-G3", 14, 0],
  ["Store Keeper", "Supply Chain", "G2", 6, 0],
  ["Accounts Officer", "Finance & Accounts", "G4", 5, 1],
  ["Area Sales Manager", "Sales", "G5", 4, 0],
  ["Plant Manager", "Production", "G7", 1, 0],
];

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("hrDesig", "/apps/human-resources/designations");
}

export default function DesignationsPage() {
  return (
    <HrPage
      section="hrDesig"
      path="/apps/human-resources/designations"
      prefix="desig"
      appName="Designations"
      tool="hrDesignations"
      group="org"
      features={[
        "Job titles tied to a department",
        "A grade band for every designation",
        "Approved posts against people in them",
        "Vacant posts shown before hiring starts",
        "Title changes kept in each employee's service record",
      ]}
      stepTones={["teal", "purple", "muted"]}
      connectStructure={[
        { key: "before", tools: ["hrDepartments", "hrGrades"] },
        { key: "after", tools: ["hrEmployees", "hrRecruitment"] },
        { key: "shows", tools: ["hrServiceRecords", "hrReports"] },
      ]}
      icons={[ListTree, Layers, Users, BadgeCheck]}
      render={(ui) => (
        <div className="grid gap-3 lg:grid-cols-12">
          <Card className="lg:col-span-8" title={ui.listTitle} right={<span className="text-[10.5px] text-muted-foreground">{ui.count}</span>}>
            <Table
              cols={[{ head: ui.thTitle }, { head: ui.thDept }, { head: ui.thBand }, { head: ui.thPeople, end: true }, { head: ui.thVacant, end: true }]}
              rows={rows.map((r) => [
                <span key="t" className="font-medium">{r[0]}</span>,
                <span key="d" className="text-muted-foreground">{r[1]}</span>,
                <Chip key="b" tone="navy">{r[2]}</Chip>,
                r[3],
                r[4] ? <Chip key="v" tone="red">{r[4]}</Chip> : <span key="v" className="text-muted-foreground">0</span>,
              ])}
            />
          </Card>
          <Card className="lg:col-span-4" title={ui.formTitle}>
            <div className="space-y-2.5">
              <Field label={ui.fTitle} value="Maintenance Technician" />
              <Field label={ui.fDept} value="Production" select />
              <Field label={ui.fBand} value="G2-G3" select />
              <Field label={ui.fPosts} value="6" />
              <div className="flex justify-end gap-2 pt-1 text-[11px] font-medium">
                <span className="rounded-md border border-border px-2.5 py-1 text-foreground">{ui.cancel}</span>
                <span className="btn-gradient rounded-md px-2.5 py-1">{ui.save}</span>
              </div>
            </div>
          </Card>
        </div>
      )}
    />
  );
}
