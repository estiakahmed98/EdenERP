/**
 * Adon ERP public site: /apps/transport-pool/vehicles
 * Copy lives in messages/*.json under pages.accountingShowcase.tpVehiclesPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { CarFront, FileWarning, Gauge, Truck } from "lucide-react";

import { Chip, HrPage, Stat, Table, hrMetadata, type HrTone } from "../../human-resources/_hr";

/** DUMMY data: [code, vehicle, plate, type key, odometer km, owned, docs due in days]. */
const fleet: [string, string, string, string, number, boolean, number][] = [
  ["VEH-001", "Tata LPT 709", "DHAKA-METRO-TA-13-4958", "tTruck", 61200, true, 120],
  ["VEH-002", "Ashok Leyland Dost", "DHAKA-METRO-TA-16-8383", "tTruck", 51706, true, 18],
  ["VEH-003", "Toyota Dyna", "DHAKA-METRO-NA-13-7897", "tVan", 129707, true, 64],
  ["VEH-004", "Mahindra Bolero", "DHAKA-METRO-THA-13-7077", "tPickup", 164106, true, -4],
  ["VEH-005", "Toyota HiAce", "DHAKA-METRO-CHA-11-5722", "tMicrobus", 114587, true, 210],
  ["VEH-R01", "Rented truck · Padma Transport", "DHAKA-METRO-TA-16-3159", "tTruck", 72820, false, 90],
];

function docs(days: number): { tone: HrTone; key: string } {
  if (days < 0) return { tone: "red", key: "dExpired" };
  if (days <= 30) return { tone: "brown", key: "dDue" };
  return { tone: "teal", key: "dOk" };
}

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("tpVehiclesPage", "/apps/transport-pool/vehicles");
}

export default function VehiclesPage() {
  return (
    <HrPage
      section="tpVehiclesPage"
      path="/apps/transport-pool/vehicles"
      prefix="veh"
      appName="Vehicles"
      tool="tpVehicles"
      group="tp"
      features={[
        "Every owned and rented vehicle with plate, type and odometer",
        "Tax token, fitness, route permit and insurance expiry dates",
        "Documents due within 30 days flagged",
        "A driver assigned to each vehicle",
        "Linked to the fixed asset register for cost and depreciation",
      ]}
      stepTones={["purple", "teal", "red"]}
      connectStructure={[
        { key: "before", tools: ["fixedAssetRegister", "hrEmployees"] },
        { key: "after", tools: ["tpTrips", "tpFuel", "tpMaint"] },
        { key: "shows", tools: ["tpHub", "anExec"] },
      ]}
      icons={[Truck, CarFront, Gauge, FileWarning]}
      render={(ui) => (
        <>
          <div className="grid gap-2 sm:grid-cols-4">
            <Stat label={ui.active} value="7" tone="teal" />
            <Stat label={ui.owned} value="5" sub={ui.rented} tone="primary" />
            <Stat label={ui.docsDue} value="1" tone="brown" />
            <Stat label={ui.docsExpired} value="1" tone="red" />
          </div>
          <div className="rounded-xl border border-border bg-card p-3.5">
            <Table
              cols={[{ head: ui.thCode }, { head: ui.thVehicle }, { head: ui.thType }, { head: ui.thOdo, end: true }, { head: ui.thDocs, end: true }]}
              rows={fleet.map(([code, name, plate, type, odo, owned, days]) => {
                const d = docs(days);
                return [
                  <span key="c" className="font-mono text-[10.5px]">{code}</span>,
                  <span key="v">
                    <span className="block font-medium">
                      {name} {!owned && <Chip tone="sky">{ui.rentedTag}</Chip>}
                    </span>
                    <span className="block font-mono text-[9.5px] text-muted-foreground">{plate}</span>
                  </span>,
                  <span key="t" className="text-muted-foreground">{ui[type]}</span>,
                  `${odo.toLocaleString("en-IN")} km`,
                  <Chip key="d" tone={d.tone}>{days < 0 ? ui[d.key] : `${ui[d.key]} · ${days} d`}</Chip>,
                ];
              })}
            />
          </div>
        </>
      )}
    />
  );
}
