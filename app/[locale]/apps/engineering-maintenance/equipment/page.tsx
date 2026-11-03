/**
 * Adon ERP public site: /apps/engineering-maintenance/equipment
 * Copy lives in messages/*.json under pages.accountingShowcase.emEquipmentPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { Cog, FileText, Network, QrCode } from "lucide-react";

import { Card, Chip, HrPage, hrMetadata } from "../../human-resources/_hr";

/** DUMMY data: the asset tree, as [depth, name, code]. */
const tree: [number, string, string][] = [
  [0, "Gazipur plant", ""],
  [1, "Moulding hall", ""],
  [2, "Injection moulder", "IM-01"],
  [2, "Injection moulder", "IM-04"],
  [2, "Granulator", "GR-03"],
  [1, "Printing hall", ""],
  [2, "Printing press", "PP-02"],
  [1, "Utilities", ""],
  [2, "Air compressor", "AC-01"],
];
const specs: [string, string][] = [
  ["sMake", "Haitian MA 2500"],
  ["sSerial", "HT-25-•••4471"],
  ["sInstalled", "12 Mar 2019"],
  ["sCost", "BDT 1,48,00,000"],
  ["sWarranty", "Ended Mar 2021"],
  ["sMeter", "21,480 h"],
];

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("emEquipmentPage", "/apps/engineering-maintenance/equipment");
}

export default function EquipmentPage() {
  return (
    <HrPage
      section="emEquipmentPage"
      path="/apps/engineering-maintenance/equipment"
      prefix="eqp"
      appName="Equipment"
      tool="emEquipment"
      group="maint"
      features={[
        "Every machine in a tree: plant, hall, line and machine",
        "Make, model, serial, installation date and warranty",
        "Running hours or counters for meter-based maintenance",
        "Criticality, so the right machines are looked after first",
        "Linked to the fixed asset register for cost and depreciation",
      ]}
      stepTones={["purple", "teal", "muted"]}
      connectStructure={[
        { key: "before", tools: ["fixedAssetRegister"] },
        { key: "after", tools: ["emPm", "emWorkOrders", "emSpares"] },
        { key: "shows", tools: ["emDowntime", "emOverview"] },
      ]}
      icons={[Network, Cog, QrCode, FileText]}
      render={(ui) => (
        <div className="grid gap-3 lg:grid-cols-12">
          <Card className="lg:col-span-4" title={ui.treeTitle}>
            <ul className="space-y-0.5 text-[11px]">
              {tree.map(([depth, name, code], i) => {
                const on = code === "IM-04";
                return (
                  <li
                    key={i}
                    className={`flex items-center gap-1.5 rounded-md py-1 pe-2 ${on ? "bg-primary/10 font-semibold text-primary" : "text-foreground"}`}
                    style={{ paddingInlineStart: `${8 + depth * 14}px` }}
                  >
                    <span className="text-[9px] text-muted-foreground" aria-hidden="true">
                      {code ? "•" : "▾"}
                    </span>
                    <span className="truncate">{name}</span>
                    {code && <span className="ms-auto font-mono text-[9.5px] text-muted-foreground">{code}</span>}
                  </li>
                );
              })}
            </ul>
          </Card>
          <Card className="lg:col-span-8">
            <div className="flex flex-wrap items-start gap-3 border-b border-border pb-3">
              <span className="grid h-14 w-14 place-items-center rounded-xl bg-[var(--gray-bg)] text-primary" aria-hidden="true">
                <Cog className="h-7 w-7" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold text-foreground">Injection moulder IM-04</p>
                <p className="text-[10.5px] text-muted-foreground">Gazipur plant / Moulding hall</p>
                <div className="mt-1.5 flex flex-wrap gap-1">
                  <Chip tone="red">{ui.critA}</Chip>
                  <Chip tone="brown">{ui.statusDown}</Chip>
                </div>
              </div>
              <span className="grid h-14 w-14 place-items-center rounded-lg border border-border text-muted-foreground" aria-hidden="true">
                <QrCode className="h-8 w-8" />
              </span>
            </div>
            <dl className="mt-3 grid gap-x-4 gap-y-2 sm:grid-cols-3">
              {specs.map(([k, v]) => (
                <div key={k}>
                  <dt className="text-[9.5px] uppercase tracking-wide text-muted-foreground">{ui[k]}</dt>
                  <dd className="text-[11.5px] tabular-nums text-foreground">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-3 grid grid-cols-3 gap-2 border-t border-border pt-3 text-center">
              {[
                [ui.openWo, "2"],
                [ui.nextPm, "6 Nov"],
                [ui.costYtd, "BDT 3,84,500"],
              ].map(([k, v]) => (
                <div key={k} className="rounded-lg bg-[var(--gray-bg)] py-2">
                  <p className="text-[9.5px] text-muted-foreground">{k}</p>
                  <p className="text-[12px] font-semibold tabular-nums text-foreground">{v}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    />
  );
}
