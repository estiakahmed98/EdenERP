/**
 * Adon ERP public site: /apps/real-estate/units
 * Copy lives in messages/*.json under pages.accountingShowcase.reUnitsPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { BedDouble, DoorOpen, Grid3x3, Tag } from "lucide-react";

import { Card, HrPage, bdt, hrMetadata } from "../../human-resources/_hr";

type UnitState = "a" | "b" | "s" | "h";

/** DUMMY data: floors 8 down to 3, units A to D. a = available, b = booked, s = sold, h = on hold. */
const plan: { floor: number; units: UnitState[] }[] = [
  { floor: 8, units: ["a", "a", "h", "a"] },
  { floor: 7, units: ["s", "a", "a", "b"] },
  { floor: 6, units: ["s", "s", "b", "a"] },
  { floor: 5, units: ["s", "s", "s", "b"] },
  { floor: 4, units: ["s", "b", "s", "s"] },
  { floor: 3, units: ["s", "s", "s", "s"] },
];
const letters = ["A", "B", "C", "D"];

const cell: Record<UnitState, string> = {
  a: "border-[var(--teal)]/40 bg-[var(--teal)]/10 text-[var(--teal)]",
  b: "border-primary/40 bg-primary/10 text-primary",
  s: "border-border bg-muted text-muted-foreground",
  h: "border-[var(--chart-4)]/40 bg-[var(--chart-4)]/12 text-[var(--chart-4)]",
};

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("reUnitsPage", "/apps/real-estate/units");
}

export default function RealEstateUnitsPage() {
  const size = 1480;
  const rate = 9200;
  return (
    <HrPage
      section="reUnitsPage"
      path="/apps/real-estate/units"
      prefix="run"
      appName="Units"
      tool="reUnits"
      group="re"
      features={[
        "A floor-by-floor stacking plan coloured by status",
        "Size, facing, view and rate on every unit",
        "Holds that expire and return the unit to stock",
        "Price worked out from size, rate and extras",
        "Brokers see only the stock you allow",
      ]}
      stepTones={["purple", "teal", "muted"]}
      connectStructure={[
        { key: "before", tools: ["reProperties"] },
        { key: "after", tools: ["reBookings", "reHandover", "reLeases"] },
        { key: "shows", tools: ["reBrokers", "reDashboard"] },
      ]}
      icons={[Grid3x3, DoorOpen, BedDouble, Tag]}
      render={(ui) => (
        <div className="grid gap-3 lg:grid-cols-12">
          <Card className="lg:col-span-7" title={ui.stackTitle}>
            <div className="space-y-1">
              <div className="grid grid-cols-[3rem_repeat(4,1fr)] gap-1 text-center text-[9.5px] text-muted-foreground">
                <span />
                {letters.map((l) => (
                  <span key={l}>{l}</span>
                ))}
              </div>
              {plan.map(({ floor, units }) => (
                <div key={floor} className="grid grid-cols-[3rem_repeat(4,1fr)] items-center gap-1">
                  <span className="text-[9.5px] text-muted-foreground">
                    {ui.floor} {floor}
                  </span>
                  {units.map((state, i) => {
                    const on = floor === 7 && i === 2;
                    return (
                      <span
                        key={i}
                        className={`rounded-md border py-1.5 text-center text-[10.5px] font-medium ${cell[state]} ${on ? "ring-2 ring-primary ring-offset-1 ring-offset-card" : ""}`}
                      >
                        {floor}
                        {letters[i]}
                      </span>
                    );
                  })}
                </div>
              ))}
            </div>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 border-t border-border pt-2.5 text-[10px] text-muted-foreground">
              {(["a", "b", "s", "h"] as UnitState[]).map((s, i) => (
                <li key={s} className="flex items-center gap-1.5">
                  <span className={`h-2.5 w-2.5 rounded-sm border ${cell[s]}`} aria-hidden="true" />
                  {[ui.sAvail, ui.sBooked, ui.sSold, ui.sHold][i]}
                </li>
              ))}
            </ul>
          </Card>
          <Card className="lg:col-span-5" title={ui.detailTitle}>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              {[
                [ui.dSize, `${size.toLocaleString("en-US")} sft`],
                [ui.dFacing, ui.facingValue],
                [ui.dRate, bdt(rate)],
                [ui.dPrice, bdt(size * rate)],
                [ui.dBeds, "3"],
                [ui.dBaths, "3"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-[9.5px] uppercase tracking-wide text-muted-foreground">{k}</dt>
                  <dd className="text-[11.5px] tabular-nums text-foreground">{v}</dd>
                </div>
              ))}
            </dl>
            <span className="mt-3.5 inline-block rounded-md bg-primary px-3 py-1.5 text-[11px] font-medium text-white">{ui.holdBtn}</span>
          </Card>
        </div>
      )}
    />
  );
}
