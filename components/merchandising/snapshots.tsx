import type { ReactNode } from "react";
import { Building2 } from "lucide-react";
import DemoPreview from "@/components/manufacturing/demo-preview";
import {
  contract,
  dateLabel,
  factories,
  materials,
  milestones,
  num,
  owners,
  pages,
  portalUsers,
  production,
  profits,
  profitSummary,
  receipts,
  styles,
  tnaStates,
  type MerchandisingSlug,
} from "./data";
import { Badge, Metric, Tag, css } from "./ui";
import { useTranslations } from "next-intl";
import { type TFn } from "@/lib/i18n/t-types";
type Evidence = {
  stats: [string, string][];
  columns: string[];
  rows: ReactNode[][];
  note: string;
};
function evidenceFor(slug: MerchandisingSlug, t: TFn): Evidence {
  switch (slug) {
    case "merchandising-dashboard":
      return {
        stats: [
          [t("snapshots.openOrders"), "16"],
          [t("snapshots.valueOfOpenOrders"), t("snapshots.usd1826227")],
          [t("snapshots.confirmedAverageMargin"), "12.8%"],
        ],
        columns: [t("snapshots.owner"), t("snapshots.lateActions"), t("snapshots.maximumSourceDelay")],
        rows: owners.map((row) => [row.name, row.late, `+${row.delay} d`]),
        note: "Historical 4 November 2026 snapshot: 14 at-risk orders, 64 late milestones, 8 orders with shortages, 9 behind plan, 3 open shipments, USD 71,848 advances, 4 unpaid invoices (USD 388,787) and 2 open export LCs. Source figures describe the wider order book.",
      };
    case "styles-costing":
      return {
        stats: [
          [t("snapshots.allSourceStyles"), "9"],
          [t("snapshots.sourceSamplesOverdue"), "9"],
          [t("snapshots.sourceApprovalsOverdue"), "4"],
        ],
        columns: [
          t("snapshots.styleName"),
          t("snapshots.buyerSeason"),
          t("snapshots.costPcUsd"),
          t("snapshots.confirmedFobUsd"),
          t("snapshots.sourceMargin"),
          t("snapshots.samplesApprovalsSheets"),
          t("snapshots.sourceStatus"),
        ],
        rows: styles(t).map((row) => [
          <>
            <b>{row.id}</b>
            <small>{row.name}</small>
          </>,
          <>
            {row.buyer}
            <small>{row.season}</small>
          </>,
          row.cost === null ? "—" : row.cost.toFixed(2),
          row.fob === null ? "—" : row.fob.toFixed(2),
          row.margin === null ? "—" : `${row.margin.toFixed(1)}%`,
          `${row.samples} / ${row.approvals} / ${row.sheets}`,
          <Tag>{row.status}</Tag>,
        ]),
        note: t("snapshots.fiveFullyVisibleRowsFromNine"),
      };
    case "tna-calendar":
      return {
        stats: [
          [
            t("snapshots.allMilestones"),
            String(tnaStates(t).reduce((sum, row) => sum + row.value, 0)),
          ],
          [t("snapshots.lateDone"), "64 / 279"],
          [t("snapshots.selectedOrderDone"), "0 / 30"],
        ],
        columns: [
          t("snapshots.milestone"),
          t("snapshots.kind"),
          t("snapshots.owner"),
          t("snapshots.plan"),
          t("snapshots.wallActual"),
          t("snapshots.sourceStatus"),
        ],
        rows: milestones(t).map((row) => [
          row.name,
          row.kind,
          t("snapshots.merchandiser"),
          dateLabel(row.plan),
          t("snapshots.notEntered"),
          row.status,
        ]),
        note: t("snapshots.selectedOrderSc2026000017Seven"),
      };
    case "material-booking":
      return {
        stats: [
          [t("snapshots.dashboardShortageOrders"), "8"],
          [t("snapshots.dashboardMissingPlans"), "3"],
          [t("snapshots.visibleBookingRows"), "7"],
        ],
        columns: [
          t("snapshots.contractStyle"),
          t("snapshots.buyer"),
          t("snapshots.orderQuantity"),
          t("snapshots.fabricDuePcd"),
          t("snapshots.bookedLines"),
          t("snapshots.inHouseLines"),
          t("snapshots.shortLines"),
        ],
        rows: materials(t).map((row) => [
          <>
            {contract(row.id)}
            <small>
              {t("snapshots.style")}{" "}{row.style} · {row.name}
            </small>
          </>,
          row.buyer,
          num(row.qty),
          <>
            {dateLabel(row.due)}
            <small>{t("snapshots.pcd")}{" "}{dateLabel(row.pcd)}</small>
          </>,
          row.lines === null ? t("snapshots.noPlan") : `${row.booked}/${row.lines}`,
          row.lines === null ? "—" : `${row.inHouse}/${row.lines}`,
          row.short === null ? t("snapshots.unknown") : row.short,
        ]),
        note: t("snapshots.visibleOrderExcerptOnlyCountsAre"),
      };
    case "production-follow-up":
      return {
        stats: [
          [t("snapshots.dashboardBehindInputLate"), "6 / 3"],
          [t("snapshots.dashboardCompleteShipped"), "2 / 3"],
          [t("snapshots.visibleProductionRows"), "5"],
        ],
        columns: [
          t("snapshots.contractStyle"),
          t("snapshots.floorFactory"),
          t("snapshots.orderQty"),
          t("snapshots.sewn"),
          t("snapshots.packed"),
          t("snapshots.shipSource"),
          t("snapshots.sourceStatus"),
        ],
        rows: production(t).map((row) => [
          <>
            {contract(row.id)}
            <small>
              {row.style} · {row.name}
            </small>
          </>,
          row.factory,
          num(row.qty),
          num(row.sewn),
          num(row.packed),
          row.ship,
          row.status,
        ]),
        note: t("snapshots.sewnOrPackedValuesMayExceed"),
      };
    case "factories":
      return {
        stats: [
          [t("snapshots.factories"), "2"],
          [t("snapshots.openOrders"), "3"],
          [t("snapshots.certificateAlerts"), "3"],
        ],
        columns: [
          t("snapshots.factory"),
          t("snapshots.productTypes"),
          t("snapshots.linesMachines"),
          t("snapshots.piecesDay"),
          t("snapshots.certificateSourceFlags"),
          t("snapshots.openOrders"),
          t("snapshots.wipLoad"),
          t("snapshots.nextShipSource"),
        ],
        rows: factories(t).map((row) => [
          row.name,
          row.types,
          `${row.lines} / ${row.machines}`,
          num(row.capacity),
          <div className={css.flagList}>
            {row.certificates.map((cert) => (
              <Tag key={cert.name} tone={cert.alert ? "red" : "green"}>
                {cert.name}
              </Tag>
            ))}
          </div>,
          row.orders,
          <>
            {num(row.wip)}{" "}{t("snapshots.pcs")}<small>{row.days.toFixed(2)} d</small>
          </>,
          row.nextShip,
        ]),
        note: t("snapshots.piecesInProgressTotal6440"),
      };
    case "in-house-receipts":
      return {
        stats: [
          [t("snapshots.postedPieces"), "8,400"],
          [t("snapshots.cartons"), "750"],
          [t("snapshots.drafts"), "0"],
        ],
        columns: [
          t("snapshots.receiptDate"),
          t("snapshots.contractBuyer"),
          t("snapshots.factoryInspector"),
          t("snapshots.pieces"),
          t("snapshots.cartons"),
          t("snapshots.ownership"),
          t("snapshots.sourceValue"),
          t("snapshots.status"),
        ],
        rows: receipts(t).map((row) => [
          <>
            {row.id}
            <small>{row.date}</small>
          </>,
          <>
            {contract(row.order)}
            <small>{row.buyer}</small>
          </>,
          <>
            {row.factory}
            <small>{row.inspector}</small>
          </>,
          num(row.qty),
          row.cartons,
          row.mode === "Memo" ? t("snapshots.memoBuyerSGoods") : t("snapshots.ourStock"),
          row.value === null ? "—" : `${num(row.value)} · currency not shown`,
          <Tag tone="green">{t("snapshots.posted")}</Tag>,
        ]),
        note: "Three source receipts: 3,000 own-stock pieces and 5,400 memo pieces. The visible own-stock value is 1,920,000 without a displayed currency. Unreported memo values remain unknown.",
      };
    case "profitability":
      return {
        stats: [
          [t("snapshots.ordersShippedPieces"), "17 / 25,916"],
          [t("snapshots.revenueBdt"), num(profitSummary.revenue)],
          [t("snapshots.netBdt"), num(profitSummary.net)],
        ],
        columns: [
          t("snapshots.contractStyle"),
          t("snapshots.mode"),
          t("snapshots.qtyShipped"),
          t("snapshots.quotedFobCostUsd"),
          t("snapshots.quotedMargin"),
          t("snapshots.actualCostUsd"),
          t("snapshots.actualMargin"),
          t("snapshots.netBdt"),
        ],
        rows: profits.map((row) => [
          <>
            {contract(row.id)}
            <small>{t("snapshots.style")}{" "}{row.style}</small>
          </>,
          row.mode,
          `${num(row.qty)} / ${num(row.shipped)}`,
          `${row.quote.toFixed(2)} / ${row.quoteCost.toFixed(2)}`,
          `${row.quoteMargin.toFixed(1)}%`,
          `${row.actual.toFixed(2)} / ${row.actualCost?.toFixed(2) ?? "—"}`,
          `${row.actualMargin.toFixed(1)}%`,
          num(row.net),
        ]),
        note: t("snapshots.fourCompleteRowsFrom17Orders"),
      };
    case "buyer-portal":
      return {
        stats: [
          [t("snapshots.activeLoginsSummary"), "4"],
          [t("snapshots.visibleUserRows"), "3"],
          [t("snapshots.aeoStylesOrders"), "4 / 5"],
        ],
        columns: [
          t("snapshots.person"),
          t("snapshots.buyer"),
          t("snapshots.role"),
          t("snapshots.canApproveSource"),
          t("snapshots.lastSeenSource"),
          t("snapshots.status"),
        ],
        rows: portalUsers(t).map((row) => [
          row.name,
          row.buyer,
          row.role,
          row.canApprove ? t("snapshots.yes") : t("snapshots.no"),
          row.lastSeen ?? "—",
          <Tag tone="green">{t("snapshots.active")}</Tag>,
        ]),
        note: t("snapshots.onlyThreeUserRowsAreVisible"),
      };
  }
}
export default function MerchandisingSnapshot({
  slug,
}: {
  slug: MerchandisingSlug;
}) {
  const t = useTranslations("pages.merchandisingApp");
  const evidence = evidenceFor(slug, t);
  return (
    <section className={css.snapshotSection}>
      <div className={css.wrap}>
        <div className={css.sectionHeading}>
          <div>
            <p className={css.eyebrow}>{t("snapshots.theEvidenceBehindTheExperience")}</p>
            <h2>{t("snapshots.aCloserLookAtTheWorkspace")}</h2>
            <p>
              {t("snapshots.suppliedSoftwareRecordsPresentedAsA")}
            </p>
          </div>
          <Badge />
        </div>
        <DemoPreview
          title={pages(t)[slug].title}
          description={t("snapshots.exploreTheCompleteStyleToShipment")}
        >
          <div className={css.sourceWorkspace}>
            <header className={css.sourceBar}>
              <b>
                {t("snapshots.eden")}<span>{t("snapshots.erp")}</span>
              </b>
              <span>{t("snapshots.merchandising")}{" "}{pages(t)[slug].title}</span>
              <Building2 size={14} />
              <span>{t("snapshots.suppliedSoftwareSnapshot")}</span>
            </header>
            <div className={css.sourceContent}>
              <div className={css.sourceTitle}>
                <h3>{pages(t)[slug].title}</h3>
                <Tag>{t("snapshots.suppliedData")}</Tag>
              </div>
              <dl className={css.sourceMetrics}>
                {evidence.stats.map(([label, value]) => (
                  <Metric key={label} label={label} value={value} />
                ))}
              </dl>
              <div
                className={css.tableScroll}
                tabIndex={0}
                role="region"
                aria-label={`${pages(t)[slug].title} source table, scroll horizontally`}
              >
                <table>
                  <caption className={css.srOnly}>
                    {pages(t)[slug].title}{" "}{t("snapshots.suppliedRecordExcerpt")}
                  </caption>
                  <thead>
                    <tr>
                      {evidence.columns.map((label) => (
                        <th scope="col" key={label}>
                          {label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {evidence.rows.map((row, i) => (
                      <tr key={i}>
                        {row.map((cell, j) => (
                          <td key={j}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className={css.sourceFootnote}>{evidence.note}</p>
            </div>
          </div>
        </DemoPreview>
        <p className={css.evidenceCaption}>{evidence.note}</p>
      </div>
    </section>
  );
}
