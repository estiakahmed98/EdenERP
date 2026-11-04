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
type Evidence = {
  stats: [string, string][];
  columns: string[];
  rows: ReactNode[][];
  note: string;
};
function evidenceFor(slug: MerchandisingSlug): Evidence {
  switch (slug) {
    case "merchandising-dashboard":
      return {
        stats: [
          ["Open orders", "16"],
          ["Value of open orders", "USD 1,826,227"],
          ["Confirmed average margin", "12.8%"],
        ],
        columns: ["Owner", "Late actions", "Maximum source delay"],
        rows: owners.map((row) => [row.name, row.late, `+${row.delay} d`]),
        note: "Historical 4 November 2026 snapshot: 14 at-risk orders, 64 late milestones, 8 orders with shortages, 9 behind plan, 3 open shipments, USD 71,848 advances, 4 unpaid invoices (USD 388,787) and 2 open export LCs. Source figures describe the wider order book.",
      };
    case "styles-costing":
      return {
        stats: [
          ["All source styles", "9"],
          ["Source samples overdue", "9"],
          ["Source approvals overdue", "4"],
        ],
        columns: [
          "Style / name",
          "Buyer / season",
          "Cost / pc · USD",
          "Confirmed FOB · USD",
          "Source margin",
          "Samples / approvals / sheets",
          "Source status",
        ],
        rows: styles.map((row) => [
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
        note: "Five fully visible rows from nine styles. All-style source status counts: Costing 2, Confirmed 1, In production 3, Shipped 3. Unseen rows and hidden cost precision are not reconstructed.",
      };
    case "tna-calendar":
      return {
        stats: [
          [
            "All milestones",
            String(tnaStates.reduce((sum, row) => sum + row.value, 0)),
          ],
          ["Late / done", "64 / 279"],
          ["Selected order done", "0 / 30"],
        ],
        columns: [
          "Milestone",
          "Kind",
          "Owner",
          "Plan",
          "Wall / actual",
          "Source status",
        ],
        rows: milestones.map((row) => [
          row.name,
          row.kind,
          "Merchandiser",
          dateLabel(row.plan),
          "Not entered",
          row.status,
        ]),
        note: "Selected order SC-2026-000017. Seven fully visible rows out of 30; global states: Late 64, On track 16, Pending 141, Done 279, N/A 10. Four wall dates breached, seven due in seven days and 14 orders with late milestones are source alerts, not fresh date calculations.",
      };
    case "material-booking":
      return {
        stats: [
          ["Dashboard shortage orders", "8"],
          ["Dashboard missing plans", "3"],
          ["Visible booking rows", "7"],
        ],
        columns: [
          "Contract / style",
          "Buyer",
          "Order quantity",
          "Fabric due / PCD",
          "Booked lines",
          "In-house lines",
          "Short lines",
        ],
        rows: materials.map((row) => [
          <>
            {contract(row.id)}
            <small>
              Style {row.style} · {row.name}
            </small>
          </>,
          row.buyer,
          num(row.qty),
          <>
            {dateLabel(row.due)}
            <small>PCD {dateLabel(row.pcd)}</small>
          </>,
          row.lines === null ? "No plan" : `${row.booked}/${row.lines}`,
          row.lines === null ? "—" : `${row.inHouse}/${row.lines}`,
          row.short === null ? "Unknown" : row.short,
        ]),
        note: "Visible order excerpt only. Counts are material lines. SC-2026-000009 has no plan, rather than zero requirements or a known shortage count. Source dates are preserved, including rows whose fabric due date follows their PCD.",
      };
    case "production-follow-up":
      return {
        stats: [
          ["Dashboard behind / input late", "6 / 3"],
          ["Dashboard complete / shipped", "2 / 3"],
          ["Visible production rows", "5"],
        ],
        columns: [
          "Contract / style",
          "Floor / factory",
          "Order qty",
          "Sewn",
          "Packed",
          "Ship · source",
          "Source status",
        ],
        rows: production.map((row) => [
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
        note: "Sewn or packed values may exceed ordered quantity; the raw values remain visible. No daily output series, run rate, new ship projection or MES synchronization is invented. The status totals cover more rows than this five-row excerpt.",
      };
    case "factories":
      return {
        stats: [
          ["Factories", "2"],
          ["Open orders", "3"],
          ["Certificate alerts", "3"],
        ],
        columns: [
          "Factory",
          "Product types",
          "Lines / machines",
          "Pieces / day",
          "Certificate source flags",
          "Open orders",
          "WIP / load",
          "Next ship · source",
        ],
        rows: factories.map((row) => [
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
            {num(row.wip)} pcs<small>{row.days.toFixed(2)} d</small>
          </>,
          row.nextShip,
        ]),
        note: "Pieces in progress total 6,440. Source certificate badges are reproduced as flags, without claiming live certification, document verification or complete expiry dates.",
      };
    case "in-house-receipts":
      return {
        stats: [
          ["Posted pieces", "8,400"],
          ["Cartons", "750"],
          ["Drafts", "0"],
        ],
        columns: [
          "Receipt / date",
          "Contract / buyer",
          "Factory / inspector",
          "Pieces",
          "Cartons",
          "Ownership",
          "Source value",
          "Status",
        ],
        rows: receipts.map((row) => [
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
          row.mode === "Memo" ? "Memo · buyer’s goods" : "Our stock",
          row.value === null ? "—" : `${num(row.value)} · currency not shown`,
          <Tag tone="green">Posted</Tag>,
        ]),
        note: "Three source receipts: 3,000 own-stock pieces and 5,400 memo pieces. The visible own-stock value is 1,920,000 without a displayed currency. Unreported memo values remain unknown.",
      };
    case "profitability":
      return {
        stats: [
          ["Orders / shipped pieces", "17 / 25,916"],
          ["Revenue · BDT", num(profitSummary.revenue)],
          ["Net · BDT", num(profitSummary.net)],
        ],
        columns: [
          "Contract / style",
          "Mode",
          "Qty / shipped",
          "Quoted FOB / cost · USD",
          "Quoted margin",
          "Actual / cost · USD",
          "Actual margin",
          "Net · BDT",
        ],
        rows: profits.map((row) => [
          <>
            {contract(row.id)}
            <small>Style {row.style}</small>
          </>,
          row.mode,
          `${num(row.qty)} / ${num(row.shipped)}`,
          `${row.quote.toFixed(2)} / ${row.quoteCost.toFixed(2)}`,
          `${row.quoteMargin.toFixed(1)}%`,
          `${row.actual.toFixed(2)} / ${row.actualCost?.toFixed(2) ?? "—"}`,
          `${row.actualMargin.toFixed(1)}%`,
          num(row.net),
        ]),
        note: "Four complete rows from 17 orders. Actual aggregates: revenue BDT 44,706,064; COGS BDT 30,915,509; net BDT 13,790,555. Cost to date BDT 64,364,812 is separate. The commission row's USD 0.49 actual is a fee, not FOB sales; its actual cost is not shown.",
      };
    case "buyer-portal":
      return {
        stats: [
          ["Active logins · summary", "4"],
          ["Visible user rows", "3"],
          ["AEO styles / orders", "4 / 5"],
        ],
        columns: [
          "Person",
          "Buyer",
          "Role",
          "Can approve · source",
          "Last seen · source",
          "Status",
        ],
        rows: portalUsers.map((row) => [
          row.name,
          row.buyer,
          row.role,
          row.canApprove ? "Yes" : "No",
          row.lastSeen ?? "—",
          <Tag tone="green">Active</Tag>,
        ]),
        note: "Only three user rows are visible. The fourth active login, unseen users and credentials are not invented. AEO tabs: samples, TNA, shipments, documents. BlueWave shows default (all). The interactive role preview grants no actual access.",
      };
  }
}
export default function MerchandisingSnapshot({
  slug,
}: {
  slug: MerchandisingSlug;
}) {
  const evidence = evidenceFor(slug);
  return (
    <section className={css.snapshotSection}>
      <div className={css.wrap}>
        <div className={css.sectionHeading}>
          <div>
            <p className={css.eyebrow}>THE EVIDENCE BEHIND THE EXPERIENCE</p>
            <h2>A closer look at the workspace.</h2>
            <p>
              Supplied software records, presented as a historical preview.
              Explore the full process with an advisor.
            </p>
          </div>
          <Badge />
        </div>
        <DemoPreview
          title={pages[slug].title}
          description="Explore the complete style-to-shipment workflow, records and merchandising decisions in a guided product conversation."
        >
          <div className={css.sourceWorkspace}>
            <header className={css.sourceBar}>
              <b>
                Eden<span>ERP</span>
              </b>
              <span>/ Merchandising / {pages[slug].title}</span>
              <Building2 size={14} />
              <span>Supplied software snapshot</span>
            </header>
            <div className={css.sourceContent}>
              <div className={css.sourceTitle}>
                <h3>{pages[slug].title}</h3>
                <Tag>Supplied data</Tag>
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
                aria-label={`${pages[slug].title} source table, scroll horizontally`}
              >
                <table>
                  <caption className={css.srOnly}>
                    {pages[slug].title} supplied-record excerpt
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
