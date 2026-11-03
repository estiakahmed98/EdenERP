/**
 * Adon ERP public site: /apps/transport-pool/maintenance
 * Copy lives in messages/*.json under pages.accountingShowcase.tpMaintPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { CalendarClock, FileBadge, ShieldCheck, Wrench } from "lucide-react";

import { Card, Chip, HrPage, hrMetadata, type HrTone } from "../../human-resources/_hr";

const months = ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr"];
/** DUMMY data: [vehicle, events as [month index, kind key]]. */
const plan: [string, [number, string][]][] = [
  ["VEH-001", [[0, "kService"], [3, "kTax"], [4, "kService"]]],
  ["VEH-002", [[0, "kFitness"], [2, "kService"]]],
  ["VEH-003", [[1, "kService"], [1, "kInsurance"], [4, "kService"]]],
  ["VEH-004", [[0, "kTax"], [2, "kService"], [5, "kPermit"]]],
  ["VEH-005", [[2, "kService"], [5, "kService"]]],
];
const tone: Record<string, HrTone> = { kService: "primary", kTax: "brown", kFitness: "red", kInsurance: "teal", kPermit: "navy" };
const kinds = ["kService", "kTax", "kFitness", "kInsurance", "kPermit"];

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("tpMaintPage", "/apps/transport-pool/maintenance");
}

export default function TransportMaintenancePage() {
  return (
    <HrPage
      section="tpMaintPage"
      path="/apps/transport-pool/maintenance"
      prefix="tpm"
      appName="Maintenance"
      tool="tpMaint"
      group="tp"
      features={[
        "Servicing by kilometres or by date for every vehicle",
        "Tax token, fitness, insurance and route permit renewals",
        "A six-month plan of what falls due, vehicle by vehicle",
        "Cost of each service and renewal, with the bill attached",
        "Next due worked out from the odometer after each service",
      ]}
      stepTones={["purple", "red", "teal"]}
      connectStructure={[
        { key: "before", tools: ["tpVehicles", "tpTrips"] },
        { key: "after", tools: ["billsAp", "journalEntries"] },
        { key: "shows", tools: ["tpHub", "fixedAssetRegister"] },
      ]}
      icons={[Wrench, CalendarClock, FileBadge, ShieldCheck]}
      render={(ui) => (
        <Card title={ui.planTitle} right={<Chip tone="red">{ui.thisMonth}</Chip>}>
          <div className="overflow-x-auto">
            <div className="grid min-w-[32rem] grid-cols-[4.5rem_repeat(6,1fr)] gap-1 text-[10px]">
              <span />
              {months.map((m, i) => (
                <span key={m} className={`text-center text-[9.5px] font-semibold ${i === 0 ? "text-primary" : "text-muted-foreground"}`}>
                  {m}
                </span>
              ))}
              {plan.map(([veh, events]) => (
                <div key={veh} className="contents">
                  <span className="self-center font-mono font-semibold text-foreground">{veh}</span>
                  {months.map((_, mi) => {
                    const here = events.filter(([m]) => m === mi);
                    return (
                      <span key={mi} className={`flex min-h-8 flex-col items-center justify-center gap-0.5 rounded ${mi === 0 ? "bg-primary/5" : "bg-[var(--gray-bg)]"}`}>
                        {here.map(([, k]) => (
                          <Chip key={k} tone={tone[k]}>
                            {ui[k]}
                          </Chip>
                        ))}
                      </span>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
          <p className="mt-3 flex flex-wrap gap-1.5 border-t border-border pt-2">
            {kinds.map((k) => (
              <Chip key={k} tone={tone[k]}>
                {ui[k]}
              </Chip>
            ))}
          </p>
        </Card>
      )}
    />
  );
}
