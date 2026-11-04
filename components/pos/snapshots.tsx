import type { ReactNode } from "react";
import { Building2 } from "lucide-react";
import DemoPreview from "@/components/manufacturing/demo-preview";
import {
  company,
  locations,
  money,
  number,
  pages,
  shifts,
  stock,
  transfers,
  type PosSlug,
} from "./data";
import { Badge, Stat, Tag, css } from "./ui";

type Evidence = {
  caption: string;
  columns: string[];
  rows: ReactNode[][];
  stats: [string, string][];
  note: string;
};
function getEvidence(slug: PosSlug): Evidence {
  switch (slug) {
    case "register-till":
      return {
        caption: "Register context from supplied screenshot",
        columns: ["Register", "Shift", "Cashier", "Float", "Cart"],
        rows: [
          ["R1-BSC", "SHF-2026-000024", "RASEL", money(0), "Empty in source"],
        ],
        stats: [
          ["Register", "R1-BSC"],
          ["Cashier", "RASEL"],
          ["Shift status", "Open"],
        ],
        note: "The original screenshot shows an empty cart. The interactive basket above is an illustrative exercise using supplied product prices.",
      };
    case "shifts":
      return {
        caption: "Eight fully visible supplied shifts",
        columns: [
          "Shift",
          "Register / cashier",
          "Opened",
          "Closed",
          "Float",
          "Expected / counted",
          "Receipts",
          "Status",
        ],
        rows: shifts.map((row) => [
          row.id,
          <>
            {row.register}
            <small>{row.cashier}</small>
          </>,
          row.opened,
          row.closed,
          money(row.float),
          row.cash === null ? (
            "Not shown"
          ) : (
            <>
              {money(row.cash)}
              <small>Counted same · variance ৳ 0.00</small>
            </>
          ),
          row.receipts,
          <Tag positive={row.status === "Posted"}>{row.status}</Tag>,
        ]),
        stats: [
          ["Visible records", "8"],
          ["Open record", "000024"],
          ["Registers in excerpt", "2"],
        ],
        note: "Excerpt only. Lower truncated rows and unshown journal references are omitted; this is not a complete shift history.",
      };
    case "receipts":
      return {
        caption: "Supplied summary evidence used for the receipt illustration",
        columns: [
          "Item",
          "Quantity",
          "Tender",
          "Customer total",
          "VAT included",
          "Record source",
        ],
        rows: [
          [
            "DH-6070 · Athletic Fit Jean — 12 oz Denim",
            1,
            "Cash",
            money(3450),
            money(450),
            "Day summary, not a receipt",
          ],
        ],
        stats: [
          ["Source receipts", "1"],
          ["Source total", money(3450)],
          ["Original receipt ID", "Not supplied"],
        ],
        note: "A receipt screenshot, receipt number, customer identity and timestamp were not supplied. EXAMPLE-01 above is explicitly illustrative.",
      };
    case "day-summary-z":
      return {
        caption: "Day-summary breakdown from supplied screenshot",
        columns: ["Breakdown", "Detail", "Count", "Value"],
        rows: [
          ["Tender", "Cash", "1×", money(3450)],
          ["Category", "finished_good", 1, money(3450)],
          ["Top item", "Athletic Fit Jean — 12 oz Denim", 1, money(3450)],
          [
            "Gross margin",
            "Sales less VAT and cost",
            "58% as shown",
            money(1738.91),
          ],
        ],
        stats: [
          ["Net sales", money(3450)],
          ["VAT", money(450)],
          ["Cost of goods", money(1261.09)],
        ],
        note: "Refunds and discount are zero. The source shows no variance figure. A trading date is not inferred from an incomplete selector.",
      };
    case "outlet-dashboard":
      return {
        caption: "Dashboard top-item evidence",
        columns: [
          "Item",
          "Units",
          "Net sales",
          "Item gross margin",
          "On hand",
          "Days cover",
        ],
        rows: [
          [
            "DH-6070 · Athletic Fit Jean — 12 oz Denim",
            1,
            money(3450),
            money(2188.91),
            295,
            "4,130 d",
          ],
        ],
        stats: [
          ["Receipts", "1"],
          ["Average basket", money(3450)],
          ["Overall gross margin", money(1738.91)],
        ],
        note: "The source item margin is 2,188.91, while the headline margin is 1,738.91 (a 450 VAT difference). Both are preserved as separate source figures. Dashboard stock is a separate snapshot from Outlet Stock.",
      };
    case "loyalty-vouchers":
      return {
        caption: "Aggregate balances from the supplied outlet dashboard",
        columns: ["Category", "Count", "Balance", "Individual records"],
        rows: [
          [
            "Loyalty accounts",
            27,
            "3,610 points · BDT 3,610 shown",
            "Not supplied",
          ],
          ["Active vouchers", 2, money(3770), "Not supplied"],
          [
            "Vouchers sold in dashboard window",
            "Not shown",
            money(0),
            "Not supplied",
          ],
        ],
        stats: [
          ["Loyalty accounts", "27"],
          ["Points", "3,610"],
          ["Active vouchers", "2"],
        ],
        note: "Aggregate data only. No customer ledger, voucher detail, expiry, earning policy or redemption rule is invented.",
      };
    case "transfers":
      return {
        caption: "Two supplied received transfers",
        columns: [
          "Transfer",
          "From → to",
          "Sent",
          "Received",
          "Lines / quantity",
          "Sent value",
          "Shortage",
          "Markdown",
        ],
        rows: transfers.map((row) => [
          row.id,
          `${row.from} → ${row.to}`,
          row.sent,
          row.received,
          `${row.lines} / ${row.qty}`,
          money(row.value),
          row.shortage === null ? "—" : money(row.shortage),
          row.markdown === null ? "—" : money(row.markdown),
        ]),
        stats: [
          ["Supplied transfers", "2"],
          ["Source status", "Received"],
          ["Destinations", "OUT1 / OUT2"],
        ],
        note: "Dashes remain unreported values. Quantity differences in the local exercise do not recalculate the historical monetary shortage or markdown.",
      };
    case "stock-lots":
      return {
        caption: "Supplied posted stock lot",
        columns: [
          "Stock lot",
          "Vendor",
          "Description",
          "Received",
          "Lump cost",
          "Basis",
          "Quantity",
          "Bill",
        ],
        rows: [
          [
            "LOT-2026-000001",
            "Gulshan Surplus Traders",
            "Assorted ladies’ tops + kids’ tees — cancelled export order, 6 bales",
            "Sep 14",
            money(180000),
            "Estimated retail value",
            1150,
            "BILL-2026-000056",
          ],
        ],
        stats: [
          ["Lot quantity", "1,150"],
          ["Lump cost", money(180000)],
          ["Source status", "Posted"],
        ],
        note: "The lot's original item intake and allocation results were not supplied. The example calculator does not reconstruct them.",
      };
    case "outlet-stock":
      return {
        caption: "Six supplied stock lines · OUT1 Bashundhara City",
        columns: [
          "SKU / item",
          "On hand",
          "Average cost",
          "Stock value",
          "Retail price",
          "Retail value",
        ],
        rows: stock.map((row) => [
          <>
            <b>{row.sku}</b>
            <small>{row.name}</small>
          </>,
          number(row.qty),
          money(row.cost),
          money(row.value),
          money(row.price),
          money(row.retail),
        ]),
        stats: [
          ["SKUs / units", "6 / 1,390"],
          ["Stock value", money(853556.98)],
          ["Retail value", money(2531860)],
        ],
        note: "Count sheets shown in the source: CNT-2026-000006 open, 0/6 counted; CNT-2026-000005 posted, 5/7 counted, variance −21,067.71. Their line-level counts are not supplied.",
      };
    case "outlets-registers":
      return {
        caption: "Six supplied warehouse / outlet designations",
        columns: ["Code", "Location", "Address", "Counter sales", "Register"],
        rows: locations.map((row) => [
          row.code,
          row.name,
          row.address,
          row.outlet ? "Yes" : "No",
          row.register ?? "—",
        ]),
        stats: [
          ["Locations", "6"],
          ["Selling outlets", "2"],
          ["Registers", "2"],
        ],
        note: "Both registers show VAT 15%. R1-BSC shows open shift SHF-2026-000024; R1-JFP has no open shift shown. Retail settings and cashier details below the screenshot crop are not invented.",
      };
  }
}
export default function PosSnapshot({ slug }: { slug: PosSlug }) {
  const evidence = getEvidence(slug);
  return (
    <section className={css.snapshotSection}>
      <div className={css.wrap}>
        <div className={css.sectionHeading}>
          <div>
            <p className={css.eyebrow}>A CLOSER LOOK AT THE PRODUCT</p>
            <h2>The detail behind the experience.</h2>
            <p>
              Supplied software data, presented as a historical preview. Explore
              the full workflow with an advisor.
            </p>
          </div>
          <Badge />
        </div>
        <DemoPreview
          title={pages[slug].title}
          description="Explore the complete checkout, reporting and outlet-stock workflow in a guided product conversation."
        >
          <div className={css.sourceWorkspace}>
            <header className={css.sourceBar}>
              <b>
                Eden<span>ERP</span>
              </b>
              <span>/ Point of Sale / {pages[slug].title}</span>
              <span>
                <Building2 size={13} />
                {company}
              </span>
            </header>
            <div className={css.sourceContent}>
              <div className={css.sourceTitle}>
                <h3>{pages[slug].title}</h3>
                <Tag>Supplied snapshot</Tag>
              </div>
              <dl className={css.sourceStats}>
                {evidence.stats.map(([label, value]) => (
                  <Stat key={label} label={label} value={value} />
                ))}
              </dl>
              <div className={css.tableScroll}>
                <table>
                  <caption className={css.srOnly}>{evidence.caption}</caption>
                  <thead>
                    <tr>
                      {evidence.columns.map((column) => (
                        <th scope="col" key={column}>
                          {column}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {evidence.rows.map((row, index) => (
                      <tr key={index}>
                        {row.map((cell, column) => (
                          <td key={column}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className={css.sourceNote}>{evidence.note}</p>
            </div>
          </div>
        </DemoPreview>
        <p className={css.evidenceCaption}>{evidence.note}</p>
      </div>
    </section>
  );
}
