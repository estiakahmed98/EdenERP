"use client";

import { useState, type ReactNode } from "react";
import { Building2, ChevronRight, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import {
  capacityOverrides,
  capacitySnapshot,
  cclOperations,
  demoCompany,
  demoWeeks,
  mpsProducts,
  plainSheetBom,
  sourceBatchCount,
  sourceProductionOrderCount,
  steelBatches,
  steelBoms,
  steelProductionOrders,
  steelProducts,
  steelRoutings,
  steelWorkCenters,
  type RecordedDemoSlug,
  type SteelProductKey,
} from "./recorded-demo-data";
import css from "./demo-preview.module.css";

const number = new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 });
const n = (value: number | null) =>
  value === null ? "—" : number.format(value);
const titles: Record<RecordedDemoSlug, string> = {
  "work-centers": "Work Centers",
  routings: "Routings",
  "bill-of-materials": "Bill of Materials",
  "capacity-planning": "Capacity Planning",
  "master-schedule-mps": "Master Production Schedule",
  "production-orders": "Production Orders",
  "batches-lots": "Batches / Lots",
};
/** Localized title and description for a recorded-demo preview. */
export function useRecordedDemoCopy(slug: RecordedDemoSlug) {
  const t = useTranslations("pages.manufacturingModules.recorded");
  return { title: t(`${slug}.title`), description: t(`${slug}.description`) };
}

function Product({ product }: { product: SteelProductKey }) {
  const item = steelProducts[product];
  return (
    <span className={css.product}>
      {item.name}
      <span className={css.productCode}>{item.code}</span>
    </span>
  );
}
function Code({ children }: { children: ReactNode }) {
  return <span className={css.code}>{children}</span>;
}
function Pill({
  children,
  tone,
}: {
  children: ReactNode;
  tone?: "green" | "amber";
}) {
  return <span className={cn(css.pill, tone && css[tone])}>{children}</span>;
}
type TableRow = { key: string; cells: ReactNode[] };
function row(key: string, ...cells: ReactNode[]): TableRow {
  return { key, cells };
}
function DataTable({
  columns,
  rows,
  caption,
  plan = false,
}: {
  columns: string[];
  rows: TableRow[];
  caption: string;
  plan?: boolean;
}) {
  return (
    <div className={css.tableScroll}>
      <table className={cn(css.table, plan && css.planTable)}>
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr>
            {columns.map((label) => (
              <th key={label} scope="col">
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length ? (
            rows.map(({ key, cells }) => (
              <tr key={key} data-demo-row>
                {cells.map((cell, index) => (
                  <td key={index}>{cell}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length}>
                No matching records in the supplied excerpt.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
function Summary({ items }: { items: [string, ReactNode][] }) {
  return (
    <dl className={css.summary}>
      {items.map(([label, value]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function RecordedDemoWorkspace({
  slug,
}: {
  slug: RecordedDemoSlug;
}) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [detail, setDetail] = useState(false);
  const matches = (...values: string[]) =>
    values.join(" ").toLowerCase().includes(query.trim().toLowerCase());
  const toolbar = (count: string) => (
    <div className={css.toolbar}>
      <label className={css.search}>
        <Search size={13} aria-hidden="true" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search the preview…"
          aria-label={`Search ${titles[slug]} preview`}
        />
      </label>
      <span>{count}</span>
    </div>
  );
  const tabs = (options: string[]) => (
    <div
      className={css.tabs}
      role="group"
      aria-label="Filter preview by status"
    >
      {options.map((status) => (
        <button
          key={status}
          type="button"
          aria-pressed={filter === status}
          onClick={() => setFilter(status)}
        >
          {status}
        </button>
      ))}
    </div>
  );

  function renderPreview() {
    if (slug === "work-centers") {
      const records = steelWorkCenters.filter((item) =>
        matches(item.name, item.code, item.type),
      );
      return (
        <>
          <Summary
            items={[
              ["Work centers", 8],
              ["Machine resources", 7],
              ["Labor groups", 1],
            ]}
          />
          {toolbar(`${records.length} of 8 supplied records`)}
          <DataTable
            caption="Work centers from the supplied software screenshot"
            columns={["Name", "Code", "Type", "Capacity", "Efficiency", "Ops"]}
            rows={records.map((item) =>
              row(
                item.code,
                <span className={css.product}>{item.name}</span>,
                <Code>{item.code}</Code>,
                <Pill tone={item.type === "Labor Group" ? "amber" : undefined}>
                  {item.type}
                </Pill>,
                n(item.capacity),
                n(item.efficiency),
                item.operations,
              ),
            )}
          />
        </>
      );
    }
    if (slug === "routings") {
      const records = steelRoutings.filter((item) =>
        matches(item.name, item.code),
      );
      return (
        <>
          <div
            className={css.tabs}
            role="group"
            aria-label="Routing preview view"
          >
            <button
              type="button"
              aria-pressed={!detail}
              onClick={() => setDetail(false)}
            >
              Routing register
            </button>
            <button
              type="button"
              aria-pressed={detail}
              onClick={() => setDetail(true)}
            >
              RT-CCL operations
            </button>
          </div>
          {detail ? (
            <>
              <Summary
                items={[
                  ["Routing", <Code>RT-CCL</Code>],
                  ["Operations", 4],
                  [
                    "Run time total",
                    `${n(cclOperations.reduce((sum, op) => sum + op.run, 0))} min`,
                  ],
                ]}
              />
              <DataTable
                caption="Four-stage colour coating operations from the supplied routing details"
                columns={[
                  "Seq",
                  "Operation",
                  "Work center",
                  "Setup (min)",
                  "Run (min)",
                  "Teardown (min)",
                  "QC",
                ]}
                rows={cclOperations.map((op) =>
                  row(
                    String(op.sequence),
                    <Code>#{op.sequence}</Code>,
                    <span className={css.product}>{op.name}</span>,
                    <Code>{op.workCenter}</Code>,
                    op.setup,
                    op.run,
                    op.teardown,
                    op.qc ? <Pill tone="green">QC</Pill> : "—",
                  ),
                )}
              />
            </>
          ) : (
            <>
              {toolbar(`${records.length} of 3 supplied routes`)}
              <DataTable
                caption="Production routings from the supplied software screenshot"
                columns={["Name", "Code", "Operations", "BOMs", "Default"]}
                rows={records.map((item) =>
                  row(
                    item.code,
                    <span className={css.product}>{item.name}</span>,
                    <Code>{item.code}</Code>,
                    item.operations,
                    item.boms,
                    item.isDefault ? <Pill tone="green">Yes</Pill> : "—",
                  ),
                )}
              />
              <p className={css.excerpt}>
                Open “RT-CCL operations” above to preview the supplied
                four-stage operation detail.
              </p>
            </>
          )}
        </>
      );
    }
    if (slug === "bill-of-materials") {
      const records = steelBoms.filter((item) =>
        matches(
          item.code,
          steelProducts[item.product].name,
          steelProducts[item.product].code,
        ),
      );
      return (
        <>
          <div className={css.tabs} role="group" aria-label="BOM preview view">
            <button
              type="button"
              aria-pressed={!detail}
              onClick={() => setDetail(false)}
            >
              BOM register
            </button>
            <button
              type="button"
              aria-pressed={detail}
              onClick={() => setDetail(true)}
            >
              BOM-CTL-PLAIN details
            </button>
          </div>
          {detail ? (
            <>
              <Summary
                items={[
                  ["Output", "1,000 kg"],
                  ["Yield", <span className={css.warning}>98%</span>],
                  ["Estimated cost", `BDT ${n(plainSheetBom.estimatedCost)}`],
                ]}
              />
              <h4 className={css.subheading}>{steelProducts.plain.name}</h4>
              <DataTable
                caption="BOM-CTL-PLAIN material lines from the supplied software screenshot"
                columns={[
                  "Type",
                  "Item",
                  "Quantity",
                  "UOM",
                  "Scrap %",
                  "Cost share",
                ]}
                rows={[
                  row(
                    "input",
                    <Pill>Input</Pill>,
                    <Product product="coil040" />,
                    n(plainSheetBom.inputQuantity),
                    "kg",
                    "—",
                    "—",
                  ),
                  row(
                    "scrap",
                    <Pill tone="amber">Scrap</Pill>,
                    <span className={css.product}>
                      Edge trim & process scrap
                      <span className={css.productCode}>SCR-EDGE</span>
                    </span>,
                    n(plainSheetBom.scrapQuantity),
                    "kg",
                    "—",
                    "1%",
                  ),
                ]}
              />
            </>
          ) : (
            <>
              {toolbar(`${records.length} of 10 supplied BOMs`)}
              <DataTable
                caption="Steel product BOM register from the supplied software screenshot"
                columns={["BOM", "Product", "Type", "Output", "Yield", "Lines"]}
                rows={records.map((item) =>
                  row(
                    item.code,
                    <>
                      <Code>{item.code}</Code>
                      <span className={css.productCode}>Default</span>
                    </>,
                    <Product product={item.product} />,
                    <Pill tone="amber">{item.type}</Pill>,
                    `${n(item.output)} kg`,
                    <span className={css.warning}>{item.yield}%</span>,
                    item.lines,
                  ),
                )}
              />
            </>
          )}
        </>
      );
    }
    if (slug === "capacity-planning") {
      return (
        <>
          <Summary
            items={[
              ["Work centers", capacitySnapshot.workCenters],
              [
                "Overloaded",
                <span className={css.positive}>
                  {capacitySnapshot.overloaded}
                </span>,
              ],
              [
                "Undated MOs",
                <span className={css.warning}>
                  {capacitySnapshot.undatedOrders}
                </span>,
              ],
              ["Planning horizon", "Weekly · 8 buckets"],
            ]}
          />
          <p className={css.notice}>
            1 production order has no planned date. Its load is not placed in
            the weekly view.
          </p>
          <DataTable
            caption="Eight work centers across W45 to W52 in the supplied capacity snapshot"
            columns={["Work center", ...demoWeeks, "Utilization"]}
            rows={steelWorkCenters.map((item) =>
              row(
                item.code,
                <span className={css.product}>{item.name}</span>,
                ...demoWeeks.map(() => "·"),
                "0%",
              ),
            )}
          />
          <h4 className={css.subheading}>
            Capacity overrides ({capacitySnapshot.overrides})
          </h4>
          <DataTable
            caption="Visible capacity override examples from the supplied screenshot"
            columns={["Work center", "Date", "Capacity override"]}
            rows={capacityOverrides.map((item, index) =>
              row(
                String(index),
                <Code>{item.workCenter}</Code>,
                item.date,
                `${n(item.minutes)} min`,
              ),
            )}
          />
          <p className={css.excerpt}>
            Eight visible override examples are included from the screenshot;
            the source view reports 28.
          </p>
        </>
      );
    }
    if (slug === "master-schedule-mps") {
      return (
        <>
          <Summary
            items={[
              ["Bucket", "Weekly"],
              ["Horizon", "8 buckets"],
              ["Warehouse", "—"],
              ["Include forecast", "No"],
            ]}
          />
          {mpsProducts.map((item) => (
            <section
              key={item.product}
              className={css.productPlan}
              aria-label={`${steelProducts[item.product].name} weekly plan`}
            >
              <h4>
                {steelProducts[item.product].name}
                <span className={css.productCode}>
                  {steelProducts[item.product].code}
                </span>
              </h4>
              <div className={css.planMeta}>
                <span>
                  On hand: <strong>{n(item.onHand)} kg</strong>
                </span>
                <span>
                  Reorder point: <strong>{n(item.reorder)}</strong>
                </span>
              </div>
              <DataTable
                plan
                caption={`Weekly MPS snapshot for ${steelProducts[item.product].code}`}
                columns={["Planning row", ...demoWeeks]}
                rows={[
                  row("demand", "Demand", ...demoWeeks.map(() => "·")),
                  row(
                    "receipts",
                    "Scheduled receipts",
                    ...demoWeeks.map(() => "·"),
                  ),
                  row(
                    "mps",
                    <Code>MPS</Code>,
                    ...demoWeeks.map((week) => (
                      <span
                        key={week}
                        className={css.emptyCell}
                        aria-label="No MPS quantity entered"
                      />
                    )),
                  ),
                  row(
                    "stock",
                    "Projected on-hand",
                    ...demoWeeks.map(() => (
                      <span className={css.positive}>{n(item.onHand)}</span>
                    )),
                  ),
                  row("suggested", "Suggested", ...demoWeeks.map(() => "·")),
                  row(
                    "atp",
                    "ATP",
                    n(item.onHand),
                    ...demoWeeks.slice(1).map(() => "—"),
                  ),
                ]}
              />
            </section>
          ))}
        </>
      );
    }
    if (slug === "production-orders") {
      const records = steelProductionOrders.filter(
        (item) =>
          (filter === "All" || item.status === filter) &&
          matches(
            item.id,
            item.bom,
            steelProducts[item.product].name,
            steelProducts[item.product].code,
          ),
      );
      return (
        <>
          {tabs([
            "All",
            "Draft",
            "Planned",
            "Confirmed",
            "In progress",
            "Completed",
            "Closed",
            "Cancelled",
          ])}
          {toolbar(
            `${records.length} supplied records · ${sourceProductionOrderCount} orders in source view`,
          )}
          <DataTable
            caption="Visible production orders from the supplied software screenshot"
            columns={[
              "MO #",
              "Product",
              "BOM",
              "Status",
              "Planned",
              "Produced",
              "Start",
            ]}
            rows={records.map((item) =>
              row(
                item.id,
                <Code>{item.id}</Code>,
                <Product product={item.product} />,
                <Code>{item.bom}</Code>,
                <Pill tone={item.status === "Completed" ? "green" : "amber"}>
                  {item.status}
                </Pill>,
                <span className={css.number}>{n(item.planned)}</span>,
                <span
                  className={cn(
                    css.number,
                    item.status === "Completed" && css.positive,
                  )}
                >
                  {n(item.produced)}
                </span>,
                "—",
              ),
            )}
          />
          <p className={css.excerpt}>
            The nine fully visible source rows are reproduced here. Remaining
            source orders are not inferred.
          </p>
        </>
      );
    }
    const records = steelBatches.filter(
      (item) =>
        (filter === "All" || item.status === filter) &&
        matches(
          item.id,
          steelProducts[item.product].name,
          steelProducts[item.product].code,
        ),
    );
    return (
      <>
        {tabs(["All", "Active", "Quarantine", "Expired", "Recalled"])}
        {toolbar(
          `${records.length} supplied records · ${sourceBatchCount} batches in source view`,
        )}
        <DataTable
          caption="Visible batch records from the supplied software screenshot"
          columns={[
            "Batch #",
            "Product",
            "Status",
            "Manufactured",
            "Expiry",
            "Quantity",
            "Supplier batch",
          ]}
          rows={records.map((item) =>
            row(
              item.id,
              <Code>{item.id}</Code>,
              <Product product={item.product} />,
              <Pill tone="green">{item.status}</Pill>,
              item.manufactured,
              "—",
              <span className={css.number}>{n(item.quantity)}</span>,
              "—",
            ),
          )}
        />
      </>
    );
  }

  return (
    <figure className={css.snapshot} data-recorded-demo={slug}>
      <header className={css.appBar}>
        <div>
          <strong>AdonERP</strong>
          <ChevronRight size={12} aria-hidden="true" />
          <span>Manufacturing</span>
          <ChevronRight size={12} aria-hidden="true" />
          <span>{titles[slug]}</span>
        </div>
        <div className={css.company}>
          <Building2 size={13} aria-hidden="true" />
          {demoCompany}
        </div>
      </header>
      <div className={css.workspace}>
        <div className={css.heading}>
          <h3>{titles[slug]}</h3>
          <span className={css.sourceBadge}>Software data preview</span>
        </div>
        {renderPreview()}
      </div>
      <figcaption className={css.sourceCaption}>
        Static demo excerpt recreated from the supplied software screenshots.
        Preview controls do not change ERP records.
      </figcaption>
    </figure>
  );
}
