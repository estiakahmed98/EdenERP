/**
 * Adon ERP public site: /apps/real-estate/handover
 * Copy lives in messages/*.json under pages.accountingShowcase.reHandoverPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { Check, ClipboardCheck, KeyRound, ShieldCheck, Wrench } from "lucide-react";

import { Avatar, Bar, Card, Chip, HrPage, Table, hrMetadata, type HrTone } from "../../human-resources/_hr";

/** DUMMY data: checklist for Unit 7C, as [label key, state, note]. */
const steps: [string, "done" | "progress" | "pending", string][] = [
  ["c1", "done", "02 Mar 2027"],
  ["c2", "done", "Electricity, gas, water"],
  ["c3", "progress", "3 of 4 fixed"],
  ["c4", "pending", ""],
  ["c5", "pending", ""],
];
/** DUMMY data: [unit, buyer, date, ready %]. */
const upcoming: [string, string, string, number][] = [
  ["A-7C", "Tahmina Rahman", "18 Mar", 60],
  ["A-3D", "Sharmin Akter", "20 Mar", 100],
  ["B-4A", "Imran Hossain", "24 Mar", 35],
  ["C-2B", "Kamal Uddin", "27 Mar", 80],
];
const stTone: Record<string, HrTone> = { done: "teal", progress: "brown", pending: "muted" };
const stKey: Record<string, string> = { done: "stDone", progress: "stProgress", pending: "stPending" };

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("reHandoverPage", "/apps/real-estate/handover");
}

export default function RealEstateHandoverPage() {
  return (
    <HrPage
      section="reHandoverPage"
      path="/apps/real-estate/handover"
      prefix="rho"
      appName="Handover"
      tool="reHandover"
      group="re"
      features={[
        "A checklist for every unit, the same steps every time",
        "Dues checked against collections before handover",
        "Snag list with photos taken on site",
        "Possession letter and documents signed and filed",
        "Handover by block or by floor",
      ]}
      stepTones={["purple", "teal", "muted"]}
      connectStructure={[
        { key: "before", tools: ["reBookings", "reCollections"] },
        { key: "after", tools: ["reUnits", "reRevRec"] },
        { key: "shows", tools: ["reBuyerPortal", "reProperties"] },
      ]}
      icons={[ClipboardCheck, Wrench, ShieldCheck, KeyRound]}
      render={(ui) => (
        <div className="grid gap-3 lg:grid-cols-12">
          <Card className="lg:col-span-5" title={ui.checklistTitle}>
            <div className="mb-3 flex items-center gap-2 border-b border-border pb-2.5">
              <Avatar name="Tahmina Rahman" size={26} />
              <div className="text-[11px]">
                <p className="text-[9.5px] text-muted-foreground">{ui.buyerLabel}</p>
                <p className="font-semibold text-foreground">Tahmina Rahman</p>
              </div>
            </div>
            <ol className="space-y-2.5">
              {steps.map(([key, state, note]) => (
                <li key={key} className="flex items-start gap-2.5 text-[11px]">
                  <span
                    className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full border ${
                      state === "done" ? "border-[var(--teal)] bg-[var(--teal)] text-white" : state === "progress" ? "border-[var(--chart-4)] text-[var(--chart-4)]" : "border-border"
                    }`}
                    aria-hidden="true"
                  >
                    {state === "done" && <Check className="h-2.5 w-2.5" />}
                    {state === "progress" && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className={state === "pending" ? "text-muted-foreground" : "text-foreground"}>{ui[key]}</span>
                    {note && <span className="block text-[9.5px] text-muted-foreground">{note}</span>}
                  </span>
                  <Chip tone={stTone[state]}>{ui[stKey[state]]}</Chip>
                </li>
              ))}
            </ol>
          </Card>
          <Card className="lg:col-span-7" title={ui.upcomingTitle}>
            <Table
              dense
              cols={[
                { head: ui.cUnit },
                { head: ui.cBuyer },
                { head: ui.cDate },
                { head: ui.cReady, className: "w-28" },
              ]}
              rows={upcoming.map(([unit, buyer, date, pct]) => [
                <span key={unit} className="font-mono text-[10.5px] text-muted-foreground">
                  {unit}
                </span>,
                buyer,
                date,
                <span key={`p${unit}`} className="flex items-center gap-2">
                  <Bar pct={pct} tone={pct === 100 ? "teal" : "primary"} />
                  <span className="w-8 text-end text-[10px] tabular-nums text-muted-foreground">{pct}%</span>
                </span>,
              ])}
            />
          </Card>
        </div>
      )}
    />
  );
}
