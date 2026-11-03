/**
 * Adon ERP public site: /apps/sales/crm/engage-ai/capture
 * Copy lives in messages/*.json under pages.accountingShowcase.crCapturePage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { ArrowRight, Globe, ScanLine, UserPlus } from "lucide-react";

import { Card, Chip, Field, HrPage, hrMetadata } from "../../../../human-resources/_hr";

const sources: [string, number][] = [
  ["sWeb", 64],
  ["sCard", 21],
  ["sWhatsapp", 38],
  ["sEmail", 17],
];

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("crCapturePage", "/apps/sales/crm/engage-ai/capture");
}

export default function CapturePage() {
  return (
    <HrPage
      section="crCapturePage"
      path="/apps/sales/crm/engage-ai/capture"
      prefix="cap"
      appName="Capture"
      tool="crCapture"
      group="crEngageG"
      features={[
        "Website forms that create leads directly",
        "A business card photographed and read into fields",
        "WhatsApp and email enquiries turned into leads",
        "Duplicates matched to existing contacts",
        "New leads assigned to the right rep straight away",
      ]}
      stepTones={["purple", "teal", "muted"]}
      connectStructure={[
        { key: "before", tools: ["crSequences"] },
        { key: "after", tools: ["crLeads", "crContacts"] },
        { key: "shows", tools: ["crPipeline", "crDashboard"] },
      ]}
      icons={[ScanLine, Globe, UserPlus, ArrowRight]}
      render={(ui) => (
        <>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {sources.map(([k, n], i) => (
              <div key={k} className={`rounded-xl border px-3 py-2 ${i === 1 ? "border-primary bg-primary/5" : "border-border bg-card"}`}>
                <p className="text-[10px] text-muted-foreground">{ui[k]}</p>
                <p className="text-[15px] font-semibold tabular-nums text-foreground">{n}</p>
              </div>
            ))}
          </div>
          <div className="grid items-center gap-3 md:grid-cols-[1fr_auto_1fr]">
            <div className="relative rounded-xl bg-gradient-to-br from-[var(--secondary)] to-primary p-4 text-white shadow-lg">
              <span className="absolute inset-2 rounded-lg border-2 border-dashed border-white/40" aria-hidden="true" />
              <p className="relative text-[13px] font-semibold">Najim Uddin</p>
              <p className="relative text-[10.5px] text-white/80">Head of Merchandising</p>
              <p className="relative mt-3 text-[11px] font-medium">ADS Apparel Limited</p>
              <p className="relative text-[10px] text-white/75">+880 17•• •••508 · najim@ads-apparel.example</p>
              <p className="relative text-[10px] text-white/75">Ashulia, Savar</p>
              <span className="relative mt-3 inline-block rounded bg-white/20 px-1.5 py-0.5 text-[9.5px]">{ui.scanned}</span>
            </div>
            <ArrowRight className="mx-auto hidden h-5 w-5 text-primary md:block" aria-hidden="true" />
            <Card title={ui.newLead} right={<Chip tone="brown">{ui.possibleMatch}</Chip>}>
              <div className="grid grid-cols-2 gap-2">
                <Field label={ui.fName} value="Najim Uddin" />
                <Field label={ui.fTitle} value="Head of Merchandising" />
                <Field label={ui.fCompany} value="ADS Apparel Limited" />
                <Field label={ui.fOwner} value="Rasel mia" select />
              </div>
            </Card>
          </div>
        </>
      )}
    />
  );
}
