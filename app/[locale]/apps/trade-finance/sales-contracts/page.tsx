/**
 * Adon ERP public site: /apps/trade-finance/sales-contracts
 * Copy lives in messages/*.json under pages.accountingShowcase.tfContractsPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { FileSignature, Landmark, PackageCheck, Ship } from "lucide-react";

import { Card, Chip, HrPage, Table, hrMetadata, type HrTone } from "../../human-resources/_hr";

/** DUMMY data: [contract, buyer, buyer PO, status key, value in USD, LCs, delivery]. */
const rows: [string, string, string, string, number, number, string][] = [
  ["SC-2026-000004", "Viyellatex Group", "PO-560396", "stProduction", 37000, 1, "8 Oct 2026"],
  ["SC-2026-000003", "Jubair Knitwear", "PO-679183", "stProduction", 15000, 1, "30 Aug 2026"],
  ["SC-2026-000002", "Ha-Meem Denim", "PO-339412", "stConfirmed", 28000, 1, "19 Apr 2027"],
  ["SC-2026-000001", "Babylon Group", "PO-594329", "stDelivered", 20000, 2, "3 Aug 2026"],
  ["SC-2025-000001", "Newage Apparels Ltd", "PO-910745", "stClosed", 31000, 1, "13 Feb 2026"],
];
const tone: Record<string, HrTone> = { stConfirmed: "primary", stProduction: "brown", stDelivered: "teal", stClosed: "muted" };
const filters = ["fAll", "fDraft", "stConfirmed", "stProduction", "stDelivered", "stClosed"];

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("tfContractsPage", "/apps/trade-finance/sales-contracts");
}

export default function SalesContractsPage() {
  return (
    <HrPage
      section="tfContractsPage"
      path="/apps/trade-finance/sales-contracts"
      prefix="sct"
      appName="Sales Contracts"
      tool="tfContracts"
      group="tf"
      features={[
        "Export sales contracts with buyer, PO, value and delivery date",
        "Statuses from draft to closed, filtered in one click",
        "Letters of credit opened against each contract",
        "Shipments and invoices drawn from the contract lines",
        "Value open, shipped and realised for every buyer",
      ]}
      stepTones={["muted", "purple", "teal"]}
      connectStructure={[
        { key: "before", tools: ["customers", "crDeals"] },
        { key: "after", tools: ["tfLc", "tfTt", "tfShipments"] },
        { key: "shows", tools: ["tfPapers", "arApAging"] },
      ]}
      icons={[FileSignature, Landmark, Ship, PackageCheck]}
      render={(ui) => (
        <>
          <div className="flex flex-wrap gap-1.5 text-[10.5px] font-medium">
            {filters.map((f, i) => (
              <span key={f} className={`rounded-md border px-2.5 py-0.5 ${i === 0 ? "border-primary bg-primary text-white" : "border-border bg-card text-foreground"}`}>
                {ui[f]}
              </span>
            ))}
          </div>
          <Card>
            <Table
              cols={[
                { head: ui.thContract },
                { head: ui.thBuyer },
                { head: ui.thPo },
                { head: ui.thStatus },
                { head: ui.thValue, end: true },
                { head: ui.thLcs, end: true },
                { head: ui.thDelivery, end: true },
              ]}
              rows={rows.map((r) => [
                <span key="c" className="font-mono text-[10.5px]">{r[0]}</span>,
                <span key="b" className="font-medium">{r[1]}</span>,
                <span key="p" className="text-muted-foreground">{r[2]}</span>,
                <Chip key="s" tone={tone[r[3]]}>{ui[r[3]]}</Chip>,
                <span key="v" className="font-mono text-primary">USD {r[4].toLocaleString("en-US")}</span>,
                r[5],
                <span key="d" className="text-muted-foreground">{r[6]}</span>,
              ])}
            />
          </Card>
        </>
      )}
    />
  );
}
