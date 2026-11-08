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
import { useTranslations } from "next-intl";
import { type TFn } from "@/lib/i18n/t-types";

type Evidence = {
  caption: string;
  columns: string[];
  rows: ReactNode[][];
  stats: [string, string][];
  note: string;
};
function getEvidence(slug: PosSlug, t: TFn): Evidence {
  switch (slug) {
    case "register-till":
      return {
        caption: t("snapshots.registerContextFromSuppliedScreenshot"),
        columns: [t("snapshots.register"), t("snapshots.shift"), t("snapshots.cashier"), t("snapshots.float"), t("snapshots.cart")],
        rows: [
          ["R1-BSC", "SHF-2026-000024", "RASEL", money(0), t("snapshots.emptyInSource")],
        ],
        stats: [
          [t("snapshots.register"), "R1-BSC"],
          [t("snapshots.cashier"), "RASEL"],
          [t("snapshots.shiftStatus"), t("snapshots.open")],
        ],
        note: t("snapshots.theOriginalScreenshotShowsAnEmpty"),
      };
    case "shifts":
      return {
        caption: t("snapshots.eightFullyVisibleSuppliedShifts"),
        columns: [
          t("snapshots.shift"),
          t("snapshots.registerCashier"),
          t("snapshots.opened"),
          t("snapshots.closed"),
          t("snapshots.float"),
          t("snapshots.expectedCounted"),
          t("snapshots.receipts"),
          t("snapshots.status"),
        ],
        rows: shifts(t).map((row) => [
          row.id,
          <>
            {row.register}
            <small>{row.cashier}</small>
          </>,
          row.opened,
          row.closed,
          money(row.float),
          row.cash === null ? (
            t("snapshots.notShown")
          ) : (
            <>
              {money(row.cash)}
              <small>{t("snapshots.countedSameVariance000")}</small>
            </>
          ),
          row.receipts,
          <Tag positive={row.status === "Posted"}>{row.status}</Tag>,
        ]),
        stats: [
          [t("snapshots.visibleRecords"), "8"],
          [t("snapshots.openRecord"), "000024"],
          [t("snapshots.registersInExcerpt"), "2"],
        ],
        note: t("snapshots.excerptOnlyLowerTruncatedRowsAnd"),
      };
    case "receipts":
      return {
        caption: t("snapshots.suppliedSummaryEvidenceUsedForThe"),
        columns: [
          t("snapshots.item"),
          t("snapshots.quantity"),
          t("snapshots.tender"),
          t("snapshots.customerTotal"),
          t("snapshots.vatIncluded"),
          t("snapshots.recordSource"),
        ],
        rows: [
          [
            t("snapshots.dh6070AthleticFitJean12"),
            1,
            t("snapshots.cash"),
            money(3450),
            money(450),
            t("snapshots.daySummaryNotAReceipt"),
          ],
        ],
        stats: [
          [t("snapshots.sourceReceipts"), "1"],
          [t("snapshots.sourceTotal"), money(3450)],
          [t("snapshots.originalReceiptId"), t("snapshots.notSupplied")],
        ],
        note: t("snapshots.aReceiptScreenshotReceiptNumberCustomer"),
      };
    case "day-summary-z":
      return {
        caption: t("snapshots.daySummaryBreakdownFromSuppliedScreensho"),
        columns: [t("snapshots.breakdown"), t("snapshots.detail"), t("snapshots.count"), t("snapshots.value")],
        rows: [
          [t("snapshots.tender"), t("snapshots.cash"), "1×", money(3450)],
          [t("snapshots.category"), "finished_good", 1, money(3450)],
          [t("snapshots.topItem"), t("snapshots.athleticFitJean12OzDenim"), 1, money(3450)],
          [
            t("snapshots.grossMargin"),
            t("snapshots.salesLessVatAndCost"),
            t("snapshots.n58AsShown"),
            money(1738.91),
          ],
        ],
        stats: [
          [t("snapshots.netSales"), money(3450)],
          ["VAT", money(450)],
          [t("snapshots.costOfGoods"), money(1261.09)],
        ],
        note: t("snapshots.refundsAndDiscountAreZeroThe"),
      };
    case "outlet-dashboard":
      return {
        caption: t("snapshots.dashboardTopItemEvidence"),
        columns: [
          t("snapshots.item"),
          t("snapshots.units"),
          t("snapshots.netSales"),
          t("snapshots.itemGrossMargin"),
          t("snapshots.onHand"),
          t("snapshots.daysCover"),
        ],
        rows: [
          [
            t("snapshots.dh6070AthleticFitJean12"),
            1,
            money(3450),
            money(2188.91),
            295,
            "4,130 d",
          ],
        ],
        stats: [
          [t("snapshots.receipts"), "1"],
          [t("snapshots.averageBasket"), money(3450)],
          [t("snapshots.overallGrossMargin"), money(1738.91)],
        ],
        note: t("snapshots.theSourceItemMarginIs2"),
      };
    case "loyalty-vouchers":
      return {
        caption: t("snapshots.aggregateBalancesFromTheSuppliedOutlet"),
        columns: [t("snapshots.category"), t("snapshots.count"), t("snapshots.balance"), t("snapshots.individualRecords")],
        rows: [
          [
            t("snapshots.loyaltyAccounts"),
            27,
            t("snapshots.n3610PointsBdt3610"),
            t("snapshots.notSupplied"),
          ],
          [t("snapshots.activeVouchers"), 2, money(3770), t("snapshots.notSupplied")],
          [
            t("snapshots.vouchersSoldInDashboardWindow"),
            t("snapshots.notShown"),
            money(0),
            t("snapshots.notSupplied"),
          ],
        ],
        stats: [
          [t("snapshots.loyaltyAccounts"), "27"],
          [t("snapshots.points"), "3,610"],
          [t("snapshots.activeVouchers"), "2"],
        ],
        note: t("snapshots.aggregateDataOnlyNoCustomerLedger"),
      };
    case "transfers":
      return {
        caption: t("snapshots.twoSuppliedReceivedTransfers"),
        columns: [
          t("snapshots.transfer"),
          t("snapshots.fromTo"),
          t("snapshots.sent"),
          t("snapshots.received"),
          t("snapshots.linesQuantity"),
          t("snapshots.sentValue"),
          t("snapshots.shortage"),
          t("snapshots.markdown"),
        ],
        rows: transfers(t).map((row) => [
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
          [t("snapshots.suppliedTransfers"), "2"],
          [t("snapshots.sourceStatus"), t("snapshots.received")],
          [t("snapshots.destinations"), t("snapshots.out1Out2")],
        ],
        note: t("snapshots.dashesRemainUnreportedValuesQuantityDiff"),
      };
    case "stock-lots":
      return {
        caption: t("snapshots.suppliedPostedStockLot"),
        columns: [
          t("snapshots.stockLot"),
          t("snapshots.vendor"),
          t("snapshots.description"),
          t("snapshots.received"),
          t("snapshots.lumpCost"),
          t("snapshots.basis"),
          t("snapshots.quantity"),
          t("snapshots.bill"),
        ],
        rows: [
          [
            "LOT-2026-000001",
            t("snapshots.gulshanSurplusTraders"),
            t("snapshots.assortedLadiesTopsKidsTeesCancelled"),
            t("snapshots.sep14"),
            money(180000),
            t("snapshots.estimatedRetailValue"),
            1150,
            "BILL-2026-000056",
          ],
        ],
        stats: [
          [t("snapshots.lotQuantity"), "1,150"],
          [t("snapshots.lumpCost"), money(180000)],
          [t("snapshots.sourceStatus"), t("snapshots.posted")],
        ],
        note: t("snapshots.theLotSOriginalItemIntake"),
      };
    case "outlet-stock":
      return {
        caption: t("snapshots.sixSuppliedStockLinesOut1Bashundhara"),
        columns: [
          t("snapshots.skuItem"),
          t("snapshots.onHand"),
          t("snapshots.averageCost"),
          t("snapshots.stockValue"),
          t("snapshots.retailPrice"),
          t("snapshots.retailValue"),
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
          [t("snapshots.skusUnits"), "6 / 1,390"],
          [t("snapshots.stockValue"), money(853556.98)],
          [t("snapshots.retailValue"), money(2531860)],
        ],
        note: "Count sheets shown in the source: CNT-2026-000006 open, 0/6 counted; CNT-2026-000005 posted, 5/7 counted, variance −21,067.71. Their line-level counts are not supplied.",
      };
    case "outlets-registers":
      return {
        caption: t("snapshots.sixSuppliedWarehouseOutletDesignations"),
        columns: [t("snapshots.code"), t("snapshots.location"), t("snapshots.address"), t("snapshots.counterSales"), t("snapshots.register")],
        rows: locations(t).map((row) => [
          row.code,
          row.name,
          row.address,
          row.outlet ? t("snapshots.yes") : t("snapshots.no"),
          row.register ?? "—",
        ]),
        stats: [
          [t("snapshots.locations"), "6"],
          [t("snapshots.sellingOutlets"), "2"],
          [t("snapshots.registers"), "2"],
        ],
        note: t("snapshots.bothRegistersShowVat15R1"),
      };
  }
}
export default function PosSnapshot({ slug }: { slug: PosSlug }) {
  const t = useTranslations("pages.posApp");
  const evidence = getEvidence(slug, t);
  return (
    <section className={css.snapshotSection}>
      <div className={css.wrap}>
        <div className={css.sectionHeading}>
          <div>
            <p className={css.eyebrow}>{t("snapshots.aCloserLookAtTheProduct")}</p>
            <h2>{t("snapshots.theDetailBehindTheExperience")}</h2>
            <p>
              {t("snapshots.suppliedSoftwareDataPresentedAsA")}
            </p>
          </div>
          <Badge />
        </div>
        <DemoPreview
          title={pages(t)[slug].title}
          description={t("snapshots.exploreTheCompleteCheckoutReportingAnd")}
        >
          <div className={css.sourceWorkspace}>
            <header className={css.sourceBar}>
              <b>
                {t("snapshots.eden")}<span>{t("snapshots.erp")}</span>
              </b>
              <span>{t("snapshots.pointOfSale")}{" "}{pages(t)[slug].title}</span>
              <span>
                <Building2 size={13} />
                {company(t)}
              </span>
            </header>
            <div className={css.sourceContent}>
              <div className={css.sourceTitle}>
                <h3>{pages(t)[slug].title}</h3>
                <Tag>{t("snapshots.suppliedSnapshot")}</Tag>
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
