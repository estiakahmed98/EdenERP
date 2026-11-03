/**
 * Adon ERP public site: /apps/sales/crm/pipeline/deals
 * Copy lives in messages/*.json under pages.accountingShowcase.crDealsPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { Handshake, ListChecks, Package, Timer } from "lucide-react";

import { Avatar, Card, Chip, HrPage, bdt, hrMetadata } from "../../../../human-resources/_hr";

const stages = ["sLead", "sQualified", "sProposal", "sNegotiation", "sWon"];
const current = 3;
/** DUMMY data: [product, quantity, rate, amount]. Amount adds up to 23,65,000. */
const lines: [string, string, number, number][] = [
  ["Carton box 3-ply, 18×12×10 in", "62,000 pcs", 28.5, 1767000],
  ["Carton box 5-ply, 24×16×14 in", "9,200 pcs", 65, 598000],
];
const timeline: [string, string][] = [
  ["30 Oct", "Price revised after the second sample"],
  ["24 Oct", "Visit: samples approved by the buyer's QA"],
  ["18 Oct", "Proposal sent with two board grades"],
];

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("crDealsPage", "/apps/sales/crm/pipeline/deals");
}

export default function DealsPage() {
  return (
    <HrPage
      section="crDealsPage"
      path="/apps/sales/crm/pipeline/deals"
      prefix="deal"
      appName="Deals"
      tool="crDeals"
      group="crPipelineG"
      features={[
        "One deal with its stage, value, probability and close date",
        "Products and quantities from the item list",
        "Every call, visit and email on the deal's timeline",
        "Next step and owner, so nothing stalls",
        "Won turns into a quote or order without retyping",
      ]}
      stepTones={["purple", "teal", "red"]}
      connectStructure={[
        { key: "before", tools: ["crLeads", "crContacts", "itemsProducts"] },
        { key: "after", tools: ["crQuotes", "crSalesOrders"] },
        { key: "shows", tools: ["crPipeline", "crForecast"] },
      ]}
      icons={[Handshake, Package, ListChecks, Timer]}
      render={(ui) => (
        <>
          <ol className="flex overflow-hidden rounded-lg text-[10.5px]" aria-hidden="true">
            {stages.map((s, i) => (
              <li key={s} className={`flex-1 py-1.5 text-center ${i < current ? "bg-primary/20 text-primary" : i === current ? "bg-primary font-semibold text-white" : "bg-muted text-muted-foreground"}`}>
                {ui[s]}
              </li>
            ))}
          </ol>
          <div className="grid gap-3 lg:grid-cols-12">
            <Card className="lg:col-span-8">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="text-[13px] font-semibold text-foreground">Ananta Apparels — Carton Box 3-Ply</p>
                  <p className="flex items-center gap-1.5 text-[10.5px] text-muted-foreground">
                    <Avatar name="Rasel mia" size={18} tone={1} /> Rasel mia · {ui.close} 20 Nov 2026
                  </p>
                </div>
                <div className="text-end">
                  <p className="text-[15px] font-semibold tabular-nums text-foreground">{bdt(2365000)}</p>
                  <Chip tone="primary">82% · {ui.weighted} {bdt(1939300)}</Chip>
                </div>
              </div>
              <table className="mt-3 w-full text-[11px]">
                <tbody>
                  {lines.map(([p, q, r, a]) => (
                    <tr key={p} className="border-t border-border">
                      <td className="py-1.5 text-foreground">{p}</td>
                      <td className="py-1.5 text-end tabular-nums text-muted-foreground">{q}</td>
                      <td className="py-1.5 text-end tabular-nums text-muted-foreground">@ {r}</td>
                      <td className="py-1.5 text-end tabular-nums text-foreground">{a.toLocaleString("en-IN")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-2 rounded-lg bg-primary/10 px-3 py-1.5 text-[10.5px] text-primary">
                {ui.next}: {ui.nextValue}
              </p>
            </Card>
            <Card className="lg:col-span-4" title={ui.timeline}>
              <ol className="relative ms-1 border-s border-border">
                {timeline.map(([d, t]) => (
                  <li key={d} className="relative pb-2.5 ps-3.5 last:pb-0">
                    <span className="absolute -start-[4.5px] top-1 h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                    <p className="text-[9.5px] text-muted-foreground">{d}</p>
                    <p className="text-[11px] text-foreground">{t}</p>
                  </li>
                ))}
              </ol>
            </Card>
          </div>
        </>
      )}
    />
  );
}
