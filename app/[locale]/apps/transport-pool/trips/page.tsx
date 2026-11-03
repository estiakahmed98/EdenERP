/**
 * Adon ERP public site: /apps/transport-pool/trips
 * Copy lives in messages/*.json under pages.accountingShowcase.tpTripsPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { ArrowRight, Gauge, MapPinned, Route } from "lucide-react";

import { Avatar, Card, Chip, HrPage, hrMetadata, type HrTone } from "../../human-resources/_hr";

/** DUMMY data: [trip, vehicle, driver, from, to, purpose key, odometer out, odometer in (0 if open), status key, tone]. */
const trips: [string, string, string, string, string, string, number, number, string, HrTone][] = [
  ["TRP-0418", "VEH-001", "Abdul Karim", "Gazipur plant", "Ashulia · ADS Apparel", "pDelivery", 61148, 0, "sOut", "primary"],
  ["TRP-0417", "VEH-005", "Rokon Mia", "Uttara", "Gazipur plant", "pStaff", 114521, 114587, "sDone", "teal"],
  ["TRP-0416", "VEH-003", "Jahid Hasan", "Gazipur plant", "Chattogram port", "pExport", 129201, 129707, "sDone", "teal"],
  ["TRP-0415", "VEH-004", "Kamal Uddin", "Head office", "Bank, Motijheel", "pOffice", 164064, 164106, "sDone", "teal"],
];

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("tpTripsPage", "/apps/transport-pool/trips");
}

export default function TripsPage() {
  return (
    <HrPage
      section="tpTripsPage"
      path="/apps/transport-pool/trips"
      prefix="tpt"
      appName="Trips"
      tool="tpTrips"
      group="tp"
      features={[
        "Every trip with vehicle, driver, from, to and purpose",
        "Odometer out and in, so distance is measured, not guessed",
        "The vehicle's odometer updated at the end of each trip",
        "Trips charged to a department, project or delivery",
        "Ongoing trips shown until the vehicle is back",
      ]}
      stepTones={["purple", "teal", "muted"]}
      connectStructure={[
        { key: "before", tools: ["tpVehicles", "hrEmployees"] },
        { key: "after", tools: ["tpFuel", "deliveryChallans"] },
        { key: "shows", tools: ["tpHub", "pjJobCost"] },
      ]}
      icons={[Route, MapPinned, Gauge, ArrowRight]}
      render={(ui) => (
        <Card title={ui.listTitle} right={<Chip tone="primary">{ui.newTrip}</Chip>}>
          <ul className="space-y-2">
            {trips.map(([no, veh, driver, from, to, purpose, out, back, st, tone], i) => (
              <li key={no} className={`rounded-xl border p-3 ${back === 0 ? "border-primary bg-primary/5" : "border-border"}`}>
                <div className="flex flex-wrap items-center gap-2 text-[11px]">
                  <span className="font-mono text-[10.5px] text-muted-foreground">{no}</span>
                  <span className="font-mono font-semibold text-foreground">{veh}</span>
                  <Chip tone="navy">{ui[purpose]}</Chip>
                  <span className="ms-auto">
                    <Chip tone={tone}>{ui[st]}</Chip>
                  </span>
                </div>
                <div className="mt-2 grid items-center gap-2 text-[11px] sm:grid-cols-[1fr_auto_1fr_9rem]">
                  <span className="truncate text-foreground">{from}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                  <span className="truncate text-foreground">{to}</span>
                  <span className="text-end tabular-nums text-muted-foreground">
                    {back ? `${(back - out).toLocaleString("en-IN")} km` : `${ui.outAt} ${out.toLocaleString("en-IN")}`}
                  </span>
                </div>
                <p className="mt-1.5 flex items-center gap-1.5 text-[10px] text-muted-foreground">
                  <Avatar name={driver} size={16} tone={i} /> {driver}
                </p>
              </li>
            ))}
          </ul>
        </Card>
      )}
    />
  );
}
