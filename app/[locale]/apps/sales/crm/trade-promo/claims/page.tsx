/**
 * Adon ERP public site: /apps/sales/crm/trade-promo/claims
 * Copy lives in messages/*.json under pages.accountingShowcase.crClaimsPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { Camera, FileCheck, Inbox, Scale } from "lucide-react";

import { Avatar, Chip, HrPage, bdt, hrMetadata, type HrTone } from "../../../../human-resources/_hr";

/** DUMMY data: [claim, distributor, promotion, amount, evidence count, check key, tone]. */
const claims: [string, string, string, number, number, string, HrTone][] = [
  ["CL-2026-0094", "Rahman Packaging", "TP-26-06 · display", 42000, 14, "cMatches", "teal"],
  ["CL-2026-0095", "Karim Traders", "TP-26-07 · volume", 68500, 2, "cOver", "red"],
  ["CL-2026-0096", "Hossain Enterprise", "TP-26-06 · display", 18000, 6, "cMatches", "teal"],
];

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("crClaimsPage", "/apps/sales/crm/trade-promo/claims");
}

export default function ClaimsPage() {
  return (
    <HrPage
      section="crClaimsPage"
      path="/apps/sales/crm/trade-promo/claims"
      prefix="clm"
      appName="Claims"
      tool="crClaims"
      group="crPromoG"
      features={[
        "Distributor claims against a promotion or scheme",
        "Photos and invoices attached as evidence",
        "Each claim checked against the promotion's rules and sales",
        "Approve in full, in part, or reject with a reason",
        "Approved claims settled by credit note or payment",
      ]}
      stepTones={["muted", "purple", "teal"]}
      connectStructure={[
        { key: "before", tools: ["crPromotions", "crSchemes"] },
        { key: "after", tools: ["receipts", "journalEntries"] },
        { key: "shows", tools: ["crRebates", "crDashboard"] },
      ]}
      icons={[Inbox, Camera, Scale, FileCheck]}
      render={(ui) => (
        <div className="space-y-2">
          {claims.map(([no, dist, promo, amt, ev, check, tone], i) => (
            <div key={no} className={`grid items-center gap-3 rounded-xl border p-3 sm:grid-cols-[1fr_auto_auto] ${i === 1 ? "border-destructive/40 bg-destructive/5" : "border-border bg-card"}`}>
              <div className="flex min-w-0 items-center gap-2.5">
                <Avatar name={dist} size={28} tone={i} />
                <div className="min-w-0">
                  <p className="truncate text-[11.5px] font-semibold text-foreground">
                    {dist} <span className="font-mono text-[10px] font-normal text-muted-foreground">{no}</span>
                  </p>
                  <p className="truncate text-[10.5px] text-muted-foreground">{promo}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex -space-x-1" aria-hidden="true">
                  {Array.from({ length: Math.min(ev, 3) }, (_, k) => (
                    <span key={k} className="h-6 w-6 rounded border-2 border-card bg-[var(--gray-bg)]" style={{ backgroundImage: `linear-gradient(135deg, color-mix(in oklch, var(--primary) ${20 + k * 15}%, transparent), transparent)` }} />
                  ))}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  {ev} {ui.files}
                </span>
              </div>
              <div className="flex items-center justify-end gap-2">
                <span className="text-[12px] font-semibold tabular-nums text-foreground">{bdt(amt)}</span>
                <Chip tone={tone}>{ui[check]}</Chip>
                <span className={`rounded-md px-2 py-0.5 text-[10.5px] font-medium ${i === 1 ? "border border-border text-foreground" : "btn-gradient"}`}>{i === 1 ? ui.partial : ui.approve}</span>
              </div>
            </div>
          ))}
          <p className="text-[10px] text-muted-foreground">{ui.note}</p>
        </div>
      )}
    />
  );
}
