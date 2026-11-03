/**
 * Adon ERP public site: /apps/human-resources/tax-brackets-nbr
 * Copy lives in messages/*.json under pages.accountingShowcase.hrTaxSlabs.
 * ALL DATA ON THIS PAGE IS DUMMY: the slabs are sample figures, set from the Finance Act in use.
 */
import type { Metadata } from "next";
import { Calculator, FileSpreadsheet, Landmark, Percent } from "lucide-react";

import { Card, Chip, HrPage, bdt, hrMetadata } from "../_hr";

/** DUMMY data: [slab size in taka (0 = the rest), rate %]. */
const slabs: [number, number][] = [
  [350000, 0],
  [100000, 5],
  [400000, 10],
  [500000, 15],
  [500000, 20],
  [0, 25],
];
/** Worked example: taxable income of BDT 9,60,000. */
const income = 960000;

function example() {
  let left = income;
  return slabs.map(([size, rate]) => {
    const part = size === 0 ? left : Math.min(left, size);
    left -= part;
    return { part, tax: (part * rate) / 100 };
  });
}

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("hrTaxSlabs", "/apps/human-resources/tax-brackets-nbr");
}

export default function TaxBracketsPage() {
  const worked = example();
  const total = worked.reduce((a, w) => a + w.tax, 0);

  return (
    <HrPage
      section="hrTaxSlabs"
      path="/apps/human-resources/tax-brackets-nbr"
      prefix="tax"
      appName="Tax Brackets (NBR)"
      tool="hrTax"
      group="statutory"
      features={[
        "Income tax slabs set for each income year",
        "Separate tax-free limits where the law sets them",
        "Annual tax spread over the remaining months as TDS",
        "Investment rebate taken into account",
        "The same figures carried to Form 108",
      ]}
      stepTones={["purple", "teal", "muted"]}
      connectStructure={[
        { key: "before", tools: ["hrComponents", "hrStructures"] },
        { key: "after", tools: ["hrPayrollRuns", "hrForm108"] },
        { key: "shows", tools: ["epPayslips", "financialReports"] },
      ]}
      icons={[Percent, Calculator, FileSpreadsheet, Landmark]}
      render={(ui) => (
        <div className="grid gap-3 lg:grid-cols-12">
          <Card className="lg:col-span-7" title={ui.slabsTitle} right={<Chip tone="navy">{ui.year}</Chip>}>
            <ul className="space-y-1.5">
              {slabs.map(([size, rate], i) => (
                <li key={i} className="grid grid-cols-[8.5rem_1fr_2.5rem] items-center gap-2 text-[11px]">
                  <span className="truncate text-muted-foreground">{size === 0 ? ui.rest : `${i === 0 ? ui.first : ui.next} ${size.toLocaleString("en-IN")}`}</span>
                  <span className="h-4 rounded bg-muted" aria-hidden="true">
                    <span className="block h-4 rounded bg-primary" style={{ width: `${8 + rate * 3.6}%`, opacity: 0.25 + rate / 33 }} />
                  </span>
                  <span className="text-end font-semibold tabular-nums text-foreground">{rate}%</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[10px] text-muted-foreground">{ui.sampleNote}</p>
          </Card>
          <Card className="lg:col-span-5" title={ui.calcTitle}>
            <p className="text-[10.5px] text-muted-foreground">{ui.taxable}</p>
            <p className="text-[16px] font-semibold tabular-nums text-foreground">{bdt(income)}</p>
            <dl className="mt-2.5 space-y-1 text-[10.5px]">
              {worked
                .filter((w) => w.part > 0)
                .map((w, i) => (
                  <div key={i} className="flex justify-between">
                    <dt className="text-muted-foreground">
                      {w.part.toLocaleString("en-IN")} × {slabs[i][1]}%
                    </dt>
                    <dd className="tabular-nums text-foreground">{bdt(w.tax)}</dd>
                  </div>
                ))}
            </dl>
            <div className="mt-2.5 flex justify-between border-t border-border pt-2 text-[11.5px] font-semibold">
              <span className="text-foreground">{ui.annual}</span>
              <span className="tabular-nums text-foreground">{bdt(total)}</span>
            </div>
            <div className="mt-2 flex justify-between rounded-lg bg-primary/10 px-2.5 py-1.5 text-[11px] font-semibold text-primary">
              <span>{ui.monthly}</span>
              <span className="tabular-nums">{bdt(total / 12)}</span>
            </div>
          </Card>
        </div>
      )}
    />
  );
}
