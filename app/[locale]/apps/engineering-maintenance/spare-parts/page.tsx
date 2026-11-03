/**
 * Adon ERP public site: /apps/engineering-maintenance/spare-parts
 * Copy lives in messages/*.json under pages.accountingShowcase.emSparesPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { Boxes, Link2, PackagePlus, ShieldAlert } from "lucide-react";

import { Card, Chip, HrPage, hrMetadata } from "../../human-resources/_hr";

/** DUMMY data: [part, used on, on hand, minimum, maximum]. */
const parts: [string, string, number, number, number][] = [
  ["Pump seal kit SK-250", "IM-01, IM-04", 1, 2, 6],
  ["Heater band 220 V", "IM-01, IM-04", 14, 8, 24],
  ["Doctor blade 1,300 mm", "PP-02", 3, 4, 12],
  ["Air filter element AF-90", "AC-01", 6, 2, 8],
  ["Granulator knife set", "GR-03", 2, 1, 3],
  ["Proximity sensor M18", "All moulders", 9, 5, 15],
];

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("emSparesPage", "/apps/engineering-maintenance/spare-parts");
}

export default function SparePartsPage() {
  return (
    <HrPage
      section="emSparesPage"
      path="/apps/engineering-maintenance/spare-parts"
      prefix="spr"
      appName="Spare Parts"
      tool="emSpares"
      group="maint"
      features={[
        "Spare parts with a minimum, a maximum and a reorder point",
        "Where each part is used, machine by machine",
        "Critical spares that must never run out",
        "Parts issued to work orders, so cost lands on the job",
        "A purchase requisition raised when stock runs low",
      ]}
      stepTones={["purple", "red", "teal"]}
      connectStructure={[
        { key: "before", tools: ["emEquipment", "itemsProducts"] },
        { key: "after", tools: ["emWorkOrders", "scRequisitions"] },
        { key: "shows", tools: ["invSummary", "emOverview"] },
      ]}
      icons={[Boxes, Link2, ShieldAlert, PackagePlus]}
      render={(ui) => (
        <Card title={ui.listTitle} right={<Chip tone="red">{ui.belowMin}</Chip>}>
          <ul className="space-y-2.5">
            {parts.map(([name, where, qty, min, max]) => {
              const low = qty < min;
              return (
                <li key={name} className="grid items-center gap-x-3 gap-y-1 text-[11px] sm:grid-cols-[13rem_1fr_6rem]">
                  <span className="min-w-0">
                    <span className="block truncate font-medium text-foreground">{name}</span>
                    <span className="block truncate text-[10px] text-muted-foreground">
                      {ui.usedOn} {where}
                    </span>
                  </span>
                  <span className="relative block h-3 rounded-full bg-muted" aria-hidden="true">
                    <span className="absolute inset-y-0 rounded-full bg-[var(--teal)]/20" style={{ left: `${(min / max) * 100}%`, right: 0 }} />
                    <span className={`absolute inset-y-0.5 start-0.5 rounded-full ${low ? "bg-destructive" : "bg-primary"}`} style={{ width: `calc(${(qty / max) * 100}% - 4px)` }} />
                    <span className="absolute -top-1 h-5 w-0.5 bg-foreground/60" style={{ left: `${(min / max) * 100}%` }} />
                  </span>
                  <span className="flex items-center justify-end gap-1.5">
                    <span className="tabular-nums text-foreground">
                      {qty} / {max}
                    </span>
                    {low && <Chip tone="red">{ui.reorder}</Chip>}
                  </span>
                </li>
              );
            })}
          </ul>
          <p className="mt-3 border-t border-border pt-2 text-[10px] text-muted-foreground">{ui.legend}</p>
        </Card>
      )}
    />
  );
}
