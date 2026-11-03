/**
 * Adon ERP public site: /apps/sales/crm/distribution/field
 * Copy lives in messages/*.json under pages.accountingShowcase.crFieldPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { Camera, MapPin, Navigation, Smartphone } from "lucide-react";

import { Avatar, Card, Chip, HrPage, Stat, hrMetadata, type HrTone } from "../../../../human-resources/_hr";

/** DUMMY data: [time, outlet, state key, tone, order taka]. */
const route: [string, string, string, HrTone, string][] = [
  ["09:40", "Rahman Packaging House, Tongi", "vOrdered", "teal", "48,200"],
  ["10:55", "Sena Kallyan Market shop 12", "vOrdered", "teal", "6,450"],
  ["12:10", "Station Road Traders", "vNoOrder", "muted", "—"],
  ["14:30", "Cherag Ali Market shop 4", "vNow", "primary", ""],
  ["15:45", "Board Bazar Poly House", "vPlanned", "muted", ""],
];

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("crFieldPage", "/apps/sales/crm/distribution/field");
}

export default function FieldPage() {
  return (
    <HrPage
      section="crFieldPage"
      path="/apps/sales/crm/distribution/field"
      prefix="fld"
      appName="Field"
      tool="crField"
      group="crDistributionG"
      features={[
        "A beat plan for each field rep, outlet by outlet",
        "Check-in at the outlet with location and time",
        "Orders taken on the phone, even without signal",
        "A photo of the shelf or display on each visit",
        "Strike rate and order value for each day",
      ]}
      stepTones={["purple", "teal", "muted"]}
      connectStructure={[
        { key: "before", tools: ["crOrg", "crDealers"] },
        { key: "after", tools: ["crSalesOrders", "crSecondary"] },
        { key: "shows", tools: ["crTargets", "crScorecard"] },
      ]}
      icons={[Navigation, MapPin, Smartphone, Camera]}
      render={(ui) => (
        <>
          <div className="flex flex-wrap items-center gap-3">
            <Avatar name="Pranto" size={30} tone={1} />
            <div>
              <p className="text-[12px] font-semibold text-foreground">Pranto · Uttara–Tongi beat</p>
              <p className="text-[10px] text-muted-foreground">{ui.today}</p>
            </div>
            <div className="ms-auto grid grid-cols-3 gap-2">
              <Stat label={ui.visited} value="3 / 5" tone="primary" />
              <Stat label={ui.strike} value="67%" tone="teal" />
              <Stat label={ui.orders} value="54,650" tone="navy" />
            </div>
          </div>
          <Card title={ui.route}>
            <ol className="relative ms-2 border-s-2 border-dashed border-border">
              {route.map(([t, outlet, st, tone, value]) => (
                <li key={t} className="relative flex items-center gap-3 pb-2.5 ps-4 last:pb-0">
                  <span
                    className={`absolute -start-[7px] top-1 h-3 w-3 rounded-full ring-2 ring-card ${st === "vOrdered" ? "bg-[var(--teal)]" : st === "vNow" ? "bg-primary" : "bg-muted-foreground/40"}`}
                    aria-hidden="true"
                  />
                  <span className="w-10 shrink-0 text-[10px] tabular-nums text-muted-foreground">{t}</span>
                  <span className="min-w-0 flex-1 truncate text-[11px] text-foreground">{outlet}</span>
                  {value && <span className="text-[10.5px] tabular-nums text-foreground">{value}</span>}
                  <Chip tone={tone}>{ui[st]}</Chip>
                </li>
              ))}
            </ol>
          </Card>
        </>
      )}
    />
  );
}
