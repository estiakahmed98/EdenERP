/**
 * Adon ERP public site: /apps/medical-centre/pharmacy
 * Copy lives in messages/*.json under pages.accountingShowcase.mcPharmacyPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { CalendarX, ClipboardList, PackagePlus, Pill } from "lucide-react";

import { Card, Chip, HrPage, hrMetadata, type HrTone } from "../../human-resources/_hr";

/** DUMMY data: [medicine, batch, on hand, minimum, months to expiry]. */
const stock: [string, string, number, number, number][] = [
  ["Paracetamol 500 mg tab", "B-2611", 840, 300, 14],
  ["Oral rehydration salts", "B-2540", 120, 150, 9],
  ["Antacid 400 mg tab", "B-2488", 260, 100, 2],
  ["Povidone iodine 10% 100 ml", "B-2402", 18, 10, 1],
  ["Cetirizine 10 mg tab", "B-2577", 410, 100, 20],
  ["Crepe bandage 10 cm", "—", 35, 20, 36],
];

function expiry(m: number): HrTone {
  if (m <= 1) return "red";
  if (m <= 3) return "brown";
  return "teal";
}

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("mcPharmacyPage", "/apps/medical-centre/pharmacy");
}

export default function PharmacyPage() {
  return (
    <HrPage
      section="mcPharmacyPage"
      path="/apps/medical-centre/pharmacy"
      prefix="phm"
      appName="Pharmacy"
      tool="mcPharmacy"
      group="medical"
      features={[
        "The clinic's medicines and first-aid stock, by batch",
        "Expiry dates, with the oldest batch given out first",
        "Minimum stock, so nothing runs out on a night shift",
        "Every issue linked to a clinic visit",
        "A purchase requisition raised when stock runs low",
      ]}
      stepTones={["purple", "red", "teal"]}
      connectStructure={[
        { key: "before", tools: ["itemsProducts", "scGoodsReceipts"] },
        { key: "after", tools: ["mcVisits", "scRequisitions"] },
        { key: "shows", tools: ["invSummary", "mcOverview"] },
      ]}
      icons={[Pill, CalendarX, ClipboardList, PackagePlus]}
      render={(ui) => (
        <>
          <div className="flex flex-wrap items-center gap-2 text-[10.5px]">
            <Chip tone="red">{ui.expiring}</Chip>
            <Chip tone="brown">{ui.low}</Chip>
            <span className="ms-auto text-muted-foreground">{ui.count}</span>
          </div>
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[34rem] text-[11px]">
                <thead className="text-[9.5px] font-semibold uppercase tracking-wide text-muted-foreground">
                  <tr className="border-b border-border">
                    <th className="pb-1.5 text-start">{ui.thMed}</th>
                    <th className="pb-1.5 text-start">{ui.thBatch}</th>
                    <th className="pb-1.5 text-start">{ui.thStock}</th>
                    <th className="pb-1.5 text-end">{ui.thExpiry}</th>
                  </tr>
                </thead>
                <tbody>
                  {stock.map(([m, batch, qty, min, months]) => {
                    const low = qty < min;
                    return (
                      <tr key={m} className="border-b border-border/60">
                        <td className="py-2 font-medium text-foreground">{m}</td>
                        <td className="py-2 font-mono text-[10px] text-muted-foreground">{batch}</td>
                        <td className="py-2">
                          <span className="flex items-center gap-2">
                            <span className="w-10 tabular-nums text-foreground">{qty}</span>
                            <span className="block h-1.5 w-24 rounded-full bg-muted" aria-hidden="true">
                              <span className={`block h-1.5 rounded-full ${low ? "bg-[var(--chart-4)]" : "bg-primary"}`} style={{ width: `${Math.min(100, (qty / (min * 3)) * 100)}%` }} />
                            </span>
                            {low && <Chip tone="brown">{ui.belowMin}</Chip>}
                          </span>
                        </td>
                        <td className="py-2 text-end">
                          <Chip tone={expiry(months)}>
                            {months} {ui.months}
                          </Chip>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      )}
    />
  );
}
