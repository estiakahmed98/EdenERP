/**
 * Adon ERP public site: /apps/trade-finance/bd-export-papers
 * Copy lives in messages/*.json under pages.accountingShowcase.tfPapersPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { BadgePercent, FileCheck2, Landmark, Stamp } from "lucide-react";

import { Card, Chip, HrPage, hrMetadata, type HrTone } from "../../human-resources/_hr";

const tabs = ["tExp", "tUd", "tIncentive", "tBoe"];
/** The paper chain behind one export, in order. */
const chain: [string, string, HrTone][] = [
  ["cMaster", "ML-2026-0071 · USD 48,000", "navy"],
  ["cBtb", "2 BTB LCs · USD 26,400", "primary"],
  ["cUd", "UD-26-1188", "sky"],
  ["cExp", "EXP-2026-004417", "teal"],
  ["cPrc", "PRC · realised USD 47,520", "teal"],
  ["cIncentive", "Claim · pending at bank", "brown"],
];

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("tfPapersPage", "/apps/trade-finance/bd-export-papers");
}

export default function BdExportPapersPage() {
  return (
    <HrPage
      section="tfPapersPage"
      path="/apps/trade-finance/bd-export-papers"
      prefix="bdx"
      appName="BD Export Papers"
      tool="tfPapers"
      group="tf"
      features={[
        "The EXP form for every shipment, and proceeds realisation against it",
        "PRC, FRC and the ERQ share retained",
        "Utilisation declarations from master LC to back-to-back LCs",
        "Cash incentive claims prepared from realised lots",
        "Bills of entry on imports, with bonded duty kept as memo",
      ]}
      stepTones={["purple", "teal", "muted"]}
      connectStructure={[
        { key: "before", tools: ["tfShipments", "tfLc"] },
        { key: "after", tools: ["tfTt", "scLandedCost"] },
        { key: "shows", tools: ["financialReports", "journalEntries"] },
      ]}
      icons={[Stamp, FileCheck2, BadgePercent, Landmark]}
      render={(ui) => (
        <>
          <nav className="flex flex-wrap gap-4 border-b border-border text-[11px]" aria-hidden="true">
            {tabs.map((t, i) => (
              <span key={t} className={`-mb-px border-b-2 pb-1.5 ${i === 0 ? "border-primary font-semibold text-primary" : "border-transparent text-muted-foreground"}`}>
                {ui[t]}
              </span>
            ))}
          </nav>
          <Card title={ui.chainTitle} right={<Chip tone="muted">EXS-2026-0047</Chip>}>
            <ol className="grid gap-2 sm:grid-cols-3 lg:grid-cols-6">
              {chain.map(([k, v, tone], i) => (
                <li key={k} className="relative rounded-lg border border-border bg-[var(--gray-bg)] p-2.5">
                  <span className="text-[9.5px] font-semibold text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                  <p className="mt-0.5">
                    <Chip tone={tone}>{ui[k]}</Chip>
                  </p>
                  <p className="mt-1.5 text-[10px] leading-tight text-foreground">{v}</p>
                  {i < chain.length - 1 && <span className="absolute -end-2 top-1/2 hidden text-muted-foreground lg:block" aria-hidden="true">›</span>}
                </li>
              ))}
            </ol>
          </Card>
          <div className="grid gap-2 sm:grid-cols-4">
            {[
              [ui.lots, "6", ui.lotsSub, "text-foreground"],
              [ui.openFcy, "USD 31,200", ui.openFcySub, "text-foreground"],
              [ui.overdue, "0", ui.overdueSub, "text-[var(--teal)]"],
              [ui.realised, "USD 112,640", ui.realisedSub, "text-[var(--teal)]"],
            ].map(([k, v, sub, c]) => (
              <div key={k} className="rounded-xl border border-border bg-card px-3 py-2.5">
                <p className="text-[9.5px] uppercase text-muted-foreground">{k}</p>
                <p className={`font-mono text-[14px] font-semibold ${c}`}>{v}</p>
                <p className="text-[9.5px] text-muted-foreground">{sub}</p>
              </div>
            ))}
          </div>
        </>
      )}
    />
  );
}
