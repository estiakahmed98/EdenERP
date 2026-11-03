/**
 * Adon ERP public site: /apps/trade-finance/letters-of-credit
 * Copy lives in messages/*.json under pages.accountingShowcase.tfLcPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { ClipboardPaste, FileStack, Landmark, Timer } from "lucide-react";

import { Card, Chip, HrPage, hrMetadata, type HrTone } from "../../human-resources/_hr";

/** DUMMY data: [LC number, buyer, type, status key, tone]. */
const list: [string, string, string, string, HrTone][] = [
  ["BTB-LC-2026-9908", "Opex Sinha Group", "Usance 60d", "stClosed", "muted"],
  ["BTB-LC-2026-1702", "Epyllion Group", "Usance 60d", "stDocs", "navy"],
  ["BTB-LC-2026-4623", "Ha-Meem Denim", "Usance 90d", "stOpened", "primary"],
  ["BTB-LC-2026-0328", "Babylon Group", "Usance 60d", "stDelivered", "brown"],
];
/** The selected LC, in USD: value, shipped, encashed, charges. */
const lc = { value: 23000, shipped: 4842, encashed: 0, charges: 276 };
const mt700: [string, string][] = [
  ["31D", "Expiry 22 Jul 2026, Dhaka"],
  ["44C", "Latest shipment 22 Jun 2026"],
  ["43P", "Partial shipments allowed"],
  ["46A", "Commercial invoice, packing list, B/L"],
];

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("tfLcPage", "/apps/trade-finance/letters-of-credit");
}

export default function LettersOfCreditPage() {
  const pct = (n: number) => `${(n / lc.value) * 100}%`;
  return (
    <HrPage
      section="tfLcPage"
      path="/apps/trade-finance/letters-of-credit"
      prefix="lc"
      appName="Letters of Credit"
      tool="tfLc"
      group="tf"
      features={[
        "Master and back-to-back LCs, sight or usance",
        "SWIFT MT700 pasted in and read into fields",
        "Shipped and encashed against the LC value",
        "Amendments, bank charges and documents on each LC",
        "Days left to the latest shipment date",
      ]}
      stepTones={["purple", "teal", "muted"]}
      connectStructure={[
        { key: "before", tools: ["tfContracts", "bankAccounts"] },
        { key: "after", tools: ["tfShipments", "tfPapers"] },
        { key: "shows", tools: ["arApAging", "financialReports"] },
      ]}
      icons={[Landmark, ClipboardPaste, FileStack, Timer]}
      render={(ui) => (
        <div className="grid gap-3 lg:grid-cols-12">
          <ul className="space-y-1.5 lg:col-span-4">
            {list.map(([no, buyer, type, st, tone], i) => (
              <li key={no} className={`rounded-lg border px-3 py-2 ${i === 1 ? "border-primary bg-primary/5" : "border-border bg-card"}`}>
                <p className="font-mono text-[10.5px] font-semibold text-primary">{no}</p>
                <p className="mt-0.5 flex items-center justify-between gap-2 text-[10.5px]">
                  <span className="truncate text-foreground">{buyer}</span>
                  <Chip tone={tone}>{ui[st]}</Chip>
                </p>
                <p className="text-[9.5px] text-muted-foreground">{type}</p>
              </li>
            ))}
          </ul>
          <div className="space-y-3 lg:col-span-8">
            <div className="grid grid-cols-2 gap-2 rounded-xl bg-[var(--gray-bg)] p-3 sm:grid-cols-4">
              {[
                [ui.value, lc.value, "text-foreground"],
                [ui.shipped, lc.shipped, "text-[var(--teal)]"],
                [ui.encashed, lc.encashed, "text-[var(--teal)]"],
                [ui.charges, lc.charges, "text-destructive"],
              ].map(([k, v, c]) => (
                <div key={k as string}>
                  <p className="text-[9.5px] uppercase text-muted-foreground">{k}</p>
                  <p className={`text-[13px] font-semibold tabular-nums ${c}`}>USD {(v as number).toLocaleString("en-US")}</p>
                </div>
              ))}
            </div>
            <Card title={ui.utilisation} right={<Chip tone="brown">{ui.daysLeft}</Chip>}>
              <span className="relative block h-3 overflow-hidden rounded-full bg-muted" aria-hidden="true">
                <span className="absolute inset-y-0 start-0 bg-[var(--teal)]/40" style={{ width: pct(lc.shipped) }} />
                <span className="absolute inset-y-0 start-0 bg-[var(--teal)]" style={{ width: pct(lc.encashed) }} />
              </span>
              <p className="mt-1.5 text-[10px] text-muted-foreground">{ui.utilNote}</p>
            </Card>
            <Card title="SWIFT MT700" right={<Chip tone="primary">{ui.paste}</Chip>}>
              <dl className="grid gap-1.5 sm:grid-cols-2">
                {mt700.map(([tag, v]) => (
                  <div key={tag} className="flex gap-2 text-[10.5px]">
                    <dt className="w-8 shrink-0 font-mono font-semibold text-primary">:{tag}:</dt>
                    <dd className="text-foreground">{v}</dd>
                  </div>
                ))}
              </dl>
            </Card>
          </div>
        </div>
      )}
    />
  );
}
