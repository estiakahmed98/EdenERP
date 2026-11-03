/**
 * Adon ERP public site: /apps/medical-centre/clinic-visits
 * Copy lives in messages/*.json under pages.accountingShowcase.mcVisitsPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { ClipboardPlus, FileHeart, Stethoscope, Thermometer } from "lucide-react";

import { Avatar, Card, Chip, HrPage, hrMetadata } from "../../human-resources/_hr";

const vitals: [string, string, string][] = [
  ["vBp", "128/84", "mmHg"],
  ["vPulse", "96", "bpm"],
  ["vTemp", "100.8", "°F"],
  ["vSpo2", "98", "%"],
];
/** DUMMY data: [medicine, dose, days, quantity]. */
const rx: [string, string, string, number][] = [
  ["Paracetamol 500 mg", "1 + 1 + 1", "3", 9],
  ["Oral rehydration salts", "After each loose stool", "2", 6],
];

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("mcVisitsPage", "/apps/medical-centre/clinic-visits");
}

export default function ClinicVisitsPage() {
  return (
    <HrPage
      section="mcVisitsPage"
      path="/apps/medical-centre/clinic-visits"
      prefix="vis"
      appName="Clinic Visits"
      tool="mcVisits"
      group="medical"
      features={[
        "Every visit to the factory clinic, by employee",
        "Vital signs, complaint, findings and advice",
        "Medicines given from the clinic's own stock",
        "Workplace injuries recorded for the accident register",
        "Rest or sick leave advice sent to HR with one click",
      ]}
      stepTones={["purple", "teal", "red"]}
      connectStructure={[
        { key: "before", tools: ["hrEmployees", "mcCheckups"] },
        { key: "after", tools: ["mcPharmacy", "hrLeaveApps"] },
        { key: "shows", tools: ["mcOverview", "hrReports"] },
      ]}
      icons={[Stethoscope, Thermometer, ClipboardPlus, FileHeart]}
      render={(ui) => (
        <div className="rounded-xl border border-border bg-card">
          <div className="flex flex-wrap items-center gap-3 border-b border-border px-4 py-3">
            <Avatar name="Jahid Hasan" size={34} tone={0} />
            <div className="min-w-0 flex-1">
              <p className="text-[12.5px] font-semibold text-foreground">Jahid Hasan · EMP-0311</p>
              <p className="text-[10.5px] text-muted-foreground">{ui.who}</p>
            </div>
            <Chip tone="primary">{ui.visitNo}</Chip>
            <Chip tone="muted">{ui.allergy}</Chip>
          </div>
          <div className="grid gap-4 p-4 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">{ui.vitals}</p>
              <div className="mt-1.5 grid grid-cols-2 gap-2">
                {vitals.map(([k, v, unit], i) => (
                  <div key={k} className={`rounded-lg px-3 py-2 ${i === 2 ? "bg-destructive/10" : "bg-[var(--gray-bg)]"}`}>
                    <p className="text-[9.5px] text-muted-foreground">{ui[k]}</p>
                    <p className={`text-[15px] font-semibold tabular-nums ${i === 2 ? "text-destructive" : "text-foreground"}`}>
                      {v} <span className="text-[9.5px] font-normal text-muted-foreground">{unit}</span>
                    </p>
                  </div>
                ))}
              </div>
              <dl className="mt-3 space-y-2 text-[11px]">
                <div>
                  <dt className="text-[9.5px] uppercase tracking-wide text-muted-foreground">{ui.complaint}</dt>
                  <dd className="text-foreground">{ui.complaintValue}</dd>
                </div>
                <div>
                  <dt className="text-[9.5px] uppercase tracking-wide text-muted-foreground">{ui.finding}</dt>
                  <dd className="text-foreground">{ui.findingValue}</dd>
                </div>
              </dl>
            </div>
            <div className="lg:col-span-7">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">{ui.rx}</p>
              <table className="mt-1.5 w-full text-[11px]">
                <thead className="text-[9.5px] uppercase tracking-wide text-muted-foreground">
                  <tr className="border-b border-border">
                    <th className="py-1 text-start">{ui.thMed}</th>
                    <th className="py-1 text-start">{ui.thDose}</th>
                    <th className="py-1 text-end">{ui.thDays}</th>
                    <th className="py-1 text-end">{ui.thQty}</th>
                  </tr>
                </thead>
                <tbody>
                  {rx.map(([m, dose, days, q]) => (
                    <tr key={m} className="border-b border-border/60">
                      <td className="py-1.5 font-medium text-foreground">{m}</td>
                      <td className="py-1.5 text-muted-foreground">{dose}</td>
                      <td className="py-1.5 text-end tabular-nums text-foreground">{days}</td>
                      <td className="py-1.5 text-end tabular-nums text-foreground">{q}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-3 grid grid-cols-3 gap-1.5 text-center text-[10.5px]">
                {["oReturn", "oRest", "oRefer"].map((k, i) => (
                  <span key={k} className={`rounded-md border px-2 py-1.5 ${i === 1 ? "border-primary bg-primary font-semibold text-white" : "border-border text-muted-foreground"}`}>
                    {ui[k]}
                  </span>
                ))}
              </div>
              <p className="mt-2 rounded-lg bg-primary/10 px-3 py-1.5 text-[10.5px] text-primary">{ui.leaveNote}</p>
            </div>
          </div>
        </div>
      )}
    />
  );
}
