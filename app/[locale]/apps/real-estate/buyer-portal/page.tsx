/**
 * Adon ERP public site: /apps/real-estate/buyer-portal
 * Copy lives in messages/*.json under pages.accountingShowcase.reBuyerPortalPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { Check, FileText, HardHat, Smartphone, UserRound } from "lucide-react";

import { Avatar, Bar, Card, Chip, HrPage, bdt, hrMetadata, type HrTone } from "../../human-resources/_hr";

/** DUMMY data: construction stages, as [label key, state, built %]. */
const stages: [string, "done" | "progress" | "pending", number][] = [
  ["p1", "done", 100],
  ["p2", "progress", 72],
  ["p3", "pending", 0],
];
const docs = ["d1", "d2", "d3"];
const stTone: Record<string, HrTone> = { done: "teal", progress: "brown", pending: "muted" };
const stKey: Record<string, string> = { done: "stDone", progress: "stProgress", pending: "stPending" };

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("reBuyerPortalPage", "/apps/real-estate/buyer-portal");
}

export default function RealEstateBuyerPortalPage() {
  const total = 13616000;
  const paid = 3846000;
  return (
    <HrPage
      section="reBuyerPortalPage"
      path="/apps/real-estate/buyer-portal"
      prefix="rbp"
      appName="Buyer Portal"
      tool="reBuyerPortal"
      group="re"
      features={[
        "Each buyer sees their unit, payments and next instalment",
        "Receipts to download at any hour",
        "Construction photos and progress for the buyer's block",
        "Allotment letter and agreement kept in one place",
        "Notices to all buyers, or to one block",
      ]}
      stepTones={["purple", "teal", "muted"]}
      connectStructure={[
        { key: "before", tools: ["reBookings", "reCollections"] },
        { key: "after", tools: ["reHandover"] },
        { key: "shows", tools: ["receipts", "reProperties", "reDashboard"] },
      ]}
      icons={[Smartphone, UserRound, HardHat, FileText]}
      render={(ui) => (
        <div className="grid gap-3 lg:grid-cols-12">
          <Card className="lg:col-span-7">
            <div className="flex items-center gap-2.5 border-b border-border pb-3">
              <Avatar name="Tahmina Rahman" size={32} tone={1} />
              <div>
                <p className="text-[13px] font-semibold text-foreground">{ui.hello}</p>
                <p className="text-[10.5px] text-muted-foreground">
                  {ui.unitLabel}: Tower A, 7C · Riverside Heights
                </p>
              </div>
            </div>
            <div className="mt-3 rounded-lg bg-[var(--gray-bg)] p-3">
              <div className="flex items-end justify-between gap-2">
                <div>
                  <p className="text-[10px] text-muted-foreground">{ui.paidLabel}</p>
                  <p className="text-[15px] font-semibold tabular-nums text-foreground">{bdt(paid)}</p>
                </div>
                <p className="text-[10.5px] tabular-nums text-muted-foreground">
                  {Math.round((paid / total) * 100)}% of {bdt(total)}
                </p>
              </div>
              <div className="mt-2">
                <Bar pct={(paid / total) * 100} tone="teal" />
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between gap-3 rounded-lg border border-border p-3">
              <div>
                <p className="text-[10px] text-muted-foreground">{ui.nextLabel}</p>
                <p className="text-[12px] font-semibold tabular-nums text-foreground">{bdt(435000)} · 02 Apr 2026</p>
              </div>
              <span className="rounded-md bg-primary px-3 py-1.5 text-[11px] font-medium text-white">{ui.payBtn}</span>
            </div>
          </Card>
          <div className="space-y-3 lg:col-span-5">
            <Card title={ui.progressTitle}>
              <ul className="space-y-2.5">
                {stages.map(([key, state, pct]) => (
                  <li key={key} className="text-[11px]">
                    <div className="mb-1 flex items-center justify-between gap-2">
                      <span className="flex items-center gap-1.5 text-foreground">
                        {state === "done" && <Check className="h-3 w-3 text-[var(--teal)]" aria-hidden="true" />}
                        {ui[key]}
                      </span>
                      <Chip tone={stTone[state]}>{ui[stKey[state]]}</Chip>
                    </div>
                    <Bar pct={pct} tone={state === "done" ? "teal" : "primary"} />
                  </li>
                ))}
              </ul>
            </Card>
            <Card title={ui.docsTitle}>
              <ul className="space-y-1.5 text-[11px]">
                {docs.map((k) => (
                  <li key={k} className="flex items-center gap-2">
                    <FileText className="h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
                    <span className="min-w-0 flex-1 truncate text-foreground">{ui[k]}</span>
                    <span className="text-[10px] font-medium text-primary">{ui.viewDoc}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      )}
    />
  );
}
