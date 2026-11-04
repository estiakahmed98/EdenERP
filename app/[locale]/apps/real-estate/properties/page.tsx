/**
 * Adon ERP public site: /apps/real-estate/properties
 * Copy lives in messages/*.json under pages.accountingShowcase.rePropertiesPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { Building2, HardHat, MapPin, Ruler } from "lucide-react";

import { Bar, Card, Chip, HrPage, Table, hrMetadata, type HrTone } from "../../human-resources/_hr";

/** DUMMY data: [project, area, status key, tone]. */
const list: [string, string, string, HrTone][] = [
  ["Riverside Heights", "Purbachal, Dhaka", "stBuilding", "primary"],
  ["Green Valley Residences", "Bashundhara R/A", "stBuilding", "primary"],
  ["Lakeview Tower", "Uttara Sector 7", "stLaunch", "sky"],
  ["Skyline Plaza", "Gulshan Avenue", "stReady", "teal"],
];
/** DUMMY data: [block, floors, units, sold, built %]. */
const blocks: [string, number, number, number, number][] = [
  ["Tower A", 14, 56, 41, 72],
  ["Tower B", 14, 56, 33, 48],
  ["Tower C", 12, 48, 12, 15],
  ["Clubhouse", 3, 6, 0, 30],
];

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("rePropertiesPage", "/apps/real-estate/properties");
}

export default function RealEstatePropertiesPage() {
  return (
    <HrPage
      section="rePropertiesPage"
      path="/apps/real-estate/properties"
      prefix="rpr"
      appName="Properties"
      tool="reProperties"
      group="re"
      features={[
        "Every project with its land, location and launch date",
        "Blocks or towers, with floors and units on each",
        "Land in katha, bigha or square feet",
        "Construction progress by block against the handover date",
        "Launch in phases, one block at a time",
      ]}
      stepTones={["purple", "teal", "muted"]}
      connectStructure={[
        { key: "before", tools: ["fixedAssetRegister"] },
        { key: "after", tools: ["reUnits", "reBookings", "reHandover"] },
        { key: "shows", tools: ["reRevRec", "reDashboard"] },
      ]}
      icons={[Building2, MapPin, Ruler, HardHat]}
      render={(ui) => (
        <div className="grid gap-3 lg:grid-cols-12">
          <Card className="lg:col-span-4" title={ui.listTitle}>
            <ul className="space-y-1.5">
              {list.map(([name, area, st, tone], i) => (
                <li key={name} className={`rounded-lg border px-3 py-2 ${i === 0 ? "border-primary bg-primary/5" : "border-border"}`}>
                  <p className="text-[11.5px] font-semibold text-foreground">{name}</p>
                  <p className="mt-0.5 flex items-center justify-between gap-2 text-[10px] text-muted-foreground">
                    <span className="truncate">{area}</span>
                    <Chip tone={tone}>{ui[st]}</Chip>
                  </p>
                </li>
              ))}
            </ul>
          </Card>
          <Card className="lg:col-span-8" title={ui.detailTitle}>
            <dl className="mb-3 grid gap-x-4 gap-y-2 border-b border-border pb-3 sm:grid-cols-4">
              {[
                [ui.dLocation, "Purbachal, Dhaka"],
                [ui.dLand, "1.2 bigha"],
                [ui.dHandover, "Dec 2027"],
                [ui.dUnits, "166"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-[9.5px] uppercase tracking-wide text-muted-foreground">{k}</dt>
                  <dd className="text-[11.5px] tabular-nums text-foreground">{v}</dd>
                </div>
              ))}
            </dl>
            <Table
              dense
              cols={[
                { head: ui.cBlock },
                { head: ui.cFloors, end: true },
                { head: ui.cUnits, end: true },
                { head: ui.cSold, end: true },
                { head: ui.cBuilt, className: "w-32 ps-4" },
              ]}
              rows={blocks.map(([b, f, u, s, p]) => [
                b,
                f,
                u,
                s,
                <span key={b} className="flex items-center gap-2">
                  <Bar pct={p} tone={p > 60 ? "teal" : "primary"} />
                  <span className="w-8 text-end text-[10px] tabular-nums text-muted-foreground">{p}%</span>
                </span>,
              ])}
            />
          </Card>
        </div>
      )}
    />
  );
}
