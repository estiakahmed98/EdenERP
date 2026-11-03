"use client";

import { useId, useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Boxes,
  Check,
  CircleCheck,
  Factory,
  LayoutGrid,
  List,
  Search,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ManufacturingMetric,
  manufacturingStyles as styles,
} from "./design-system";
import type {
  ManufacturingModuleContent,
  PreviewView,
  SampleRow,
} from "./module-content";
import visual from "./manufacturing-visuals.module.css";

const number = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });
const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "BDT",
  currencyDisplay: "code",
  maximumFractionDigits: 0,
});
const viewLabels: Record<PreviewView, string> = {
  table: "Register",
  board: "Board",
  timeline: "Planning view",
  cost: "Cost breakdown",
  trace: "Trace view",
};

function statusClass(status: string) {
  if (["Blocked", "Shortage", "Overloaded", "Disposal"].includes(status))
    return "bg-red-500/10 text-red-700 dark:text-red-300";
  if (
    ["Review", "On hold", "Partial", "Maintenance", "At capacity"].includes(
      status,
    )
  )
    return "bg-amber-500/10 text-amber-800 dark:text-amber-300";
  if (
    [
      "Completed",
      "Released",
      "Passed",
      "Active",
      "Approved",
      "Posted",
      "Returned",
      "Covered",
      "Balanced",
      "Available",
      "Allocated",
      "Recoverable",
    ].includes(status)
  )
    return "bg-emerald-500/10 text-emerald-800 dark:text-emerald-300";
  if (["Draft", "Pending", "Unallocated", "Ready to send"].includes(status))
    return "bg-muted/60 text-muted-foreground";
  return "bg-primary/10 text-primary";
}

function SampleStatus({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-md px-2 py-1 text-[10px] font-medium",
        statusClass(status),
      )}
    >
      <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
      {status}
    </span>
  );
}

function Progress({ row, label }: { row: SampleRow; label: string }) {
  return (
    <span className="block">
      <span className="mb-1.5 flex items-center justify-between gap-3 text-[10px]">
        <span className="text-muted-foreground">{label}</span>
        <span className="tabular-nums">{row[5]}%</span>
      </span>
      <span
        role="progressbar"
        aria-label={`${row[0]} ${label}`}
        aria-valuenow={row[5]}
        aria-valuemin={0}
        aria-valuemax={100}
        className="block h-1.5 overflow-hidden rounded-full bg-muted/60"
      >
        <span
          className={cn(
            "block h-full rounded-full",
            ["Overloaded", "Shortage", "Blocked"].includes(row[3])
              ? "bg-red-500"
              : row[3] === "At capacity"
                ? "bg-amber-500"
                : row[5] === 100
                  ? "bg-emerald-500"
                  : "bg-primary",
          )}
          style={{ width: `${row[5]}%` }}
        />
      </span>
    </span>
  );
}

export default function ModuleWorkspace({
  content,
}: {
  content: ManufacturingModuleContent;
}) {
  const detailId = useId();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All records");
  const [selectedId, setSelectedId] = useState(content.rows[0][0]);
  const [view, setView] = useState<PreviewView>(content.view);
  const statuses = [...new Set(content.rows.map((row) => row[3]))];
  const visible = useMemo(
    () =>
      content.rows.filter(
        (row) =>
          (filter === "All records" || row[3] === filter) &&
          `${row[0]} ${row[1]} ${row[2]} ${row[3]}`
            .toLowerCase()
            .includes(query.trim().toLowerCase()),
      ),
    [content.rows, filter, query],
  );
  const selected = visible.find((row) => row[0] === selectedId) ?? visible[0];
  const total = content.rows.reduce((sum, row) => sum + row[4], 0);
  const visibleTotal = visible.reduce((sum, row) => sum + row[4], 0);
  const amount = (value: number) =>
    content.unit === "BDT"
      ? money.format(value)
      : `${number.format(value)} ${content.unit}`;
  const selectClass = (row: SampleRow) =>
    cn(
      "rounded-lg border p-4 text-start",
      styles.focus,
      visual.connectionCard,
      selected?.[0] === row[0]
        ? "border-primary/45 bg-primary/[0.05]"
        : "border-border bg-card hover:border-primary/35",
    );

  const recordButton = (row: SampleRow) => (
    <button
      type="button"
      onClick={() => setSelectedId(row[0])}
      aria-pressed={selected?.[0] === row[0]}
      aria-controls={detailId}
      className={cn("rounded text-start", styles.focus)}
    >
      <span className="inline-flex items-center gap-1 font-semibold text-primary">
        {row[0]}
        <ArrowUpRight className="size-3" aria-hidden="true" />
      </span>
      <span className="mt-1 block text-[11px] font-medium text-foreground">
        {row[1]}
      </span>
      <span className="sr-only"> — View sample details</span>
    </button>
  );

  function renderRecords() {
    if (!visible.length)
      return (
        <div className="px-5 py-16 text-center">
          <Search
            className="mx-auto mb-3 size-6 text-muted-foreground"
            aria-hidden="true"
          />
          <p className="text-sm font-semibold">No matching records</p>
          <p className="mt-2 text-xs text-muted-foreground">
            Try another search or clear the status filter.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setFilter("All records");
            }}
            className={cn(
              "mt-4 rounded text-xs font-semibold text-primary underline underline-offset-4",
              styles.focus,
            )}
          >
            Reset filters
          </button>
        </div>
      );

    if (view === "board")
      return (
        <div className="grid gap-4 p-4 sm:grid-cols-2">
          {statuses
            .filter((status) => visible.some((row) => row[3] === status))
            .map((status) => (
              <section
                key={status}
                aria-label={`${status} records`}
                className="rounded-xl border border-border bg-muted/15 p-3"
              >
                <div className="mb-3 flex items-center justify-between gap-2">
                  <SampleStatus status={status} />
                  <span className="text-[10px] text-muted-foreground">
                    {visible.filter((row) => row[3] === status).length}
                  </span>
                </div>
                <div className="space-y-3">
                  {visible
                    .filter((row) => row[3] === status)
                    .map((row) => (
                      <button
                        key={row[0]}
                        type="button"
                        aria-pressed={selected?.[0] === row[0]}
                        aria-controls={detailId}
                        onClick={() => setSelectedId(row[0])}
                        className={cn("block w-full", selectClass(row))}
                      >
                        <span className="text-[10px] font-semibold text-primary">
                          {row[0]}
                        </span>
                        <span className="mt-2 block text-xs font-semibold">
                          {row[1]}
                        </span>
                        <span className="mt-1 block text-[10px] leading-5 text-muted-foreground">
                          {row[2]}
                        </span>
                        <span className="my-3 block text-xs font-medium tabular-nums">
                          {amount(row[4])}
                        </span>
                        <Progress row={row} label={content.progressLabel} />
                      </button>
                    ))}
                </div>
              </section>
            ))}
        </div>
      );

    if (view === "timeline")
      return (
        <div className="overflow-x-auto p-4">
          <div className="min-w-[660px]">
            <p className="mb-4 text-[10px] leading-5 text-muted-foreground">
              Illustrative five-day window. Bar positions show sample
              placements, not a calculated schedule.
            </p>
            <div className="grid grid-cols-[180px_1fr] border-b border-border pb-3 text-[10px] font-medium text-muted-foreground">
              <span>Resource / work</span>
              <div className="grid grid-cols-5 text-center">
                {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day) => (
                  <span key={day}>{day}</span>
                ))}
              </div>
            </div>
            {visible.map((row) => (
              <div
                key={row[0]}
                className="grid min-h-24 grid-cols-[180px_1fr] items-center gap-3 border-b border-border/60 last:border-0"
              >
                <div>{recordButton(row)}</div>
                <div
                  className="grid h-16 grid-cols-5 items-center rounded-lg bg-muted/20"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(90deg,transparent,transparent calc(20% - 1px),var(--border) calc(20% - 1px),var(--border) 20%)",
                  }}
                >
                  <button
                    type="button"
                    aria-label={`View ${row[0]} ${row[1]} sample placement`}
                    aria-pressed={selected?.[0] === row[0]}
                    aria-controls={detailId}
                    onClick={() => setSelectedId(row[0])}
                    style={{
                      gridColumn: `${(content.rows.indexOf(row) % 3) + 1} / span ${(content.rows.indexOf(row) % 2) + 1}`,
                    }}
                    className={cn(
                      "mx-1 min-h-10 rounded-md border px-2 py-1 text-start text-[10px] font-medium",
                      styles.focus,
                      selected?.[0] === row[0]
                        ? "border-primary/50 bg-primary/20 text-primary"
                        : "border-primary/15 bg-primary/10 text-foreground",
                    )}
                  >
                    <span className="block truncate">{row[0]}</span>
                    <span className="block truncate text-[9px] opacity-75">
                      {row[3]}
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    if (view === "cost")
      return (
        <div className="space-y-3 p-4">
          <div className="mb-5 flex items-center justify-between gap-4">
            <span className="text-xs font-semibold">
              Visible cost components
            </span>
            <span className="text-sm font-semibold tabular-nums text-primary">
              {amount(visibleTotal)}
            </span>
          </div>
          {visible.map((row) => (
            <button
              key={row[0]}
              type="button"
              aria-pressed={selected?.[0] === row[0]}
              aria-controls={detailId}
              onClick={() => setSelectedId(row[0])}
              className={cn("block w-full", selectClass(row))}
            >
              <span className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-semibold">{row[1]}</span>
                <span className="text-xs font-semibold tabular-nums">
                  {amount(row[4])}
                </span>
              </span>
              <span className="mt-2 block text-[10px] text-muted-foreground">
                {row[2]}
              </span>
              <span className="mt-4 block h-2 overflow-hidden rounded-full bg-muted/50">
                <span
                  className="block h-full rounded-full bg-primary"
                  style={{
                    width: `${visibleTotal ? (row[4] / visibleTotal) * 100 : 0}%`,
                  }}
                />
              </span>
              <span className="mt-2 flex items-center justify-between text-[10px] text-muted-foreground">
                <span>
                  {visibleTotal ? Math.round((row[4] / visibleTotal) * 100) : 0}
                  % of visible cost
                </span>
                <SampleStatus status={row[3]} />
              </span>
            </button>
          ))}
        </div>
      );

    if (view === "trace")
      return (
        <div className="p-4">
          <div
            className={cn(
              "mb-4 rounded-xl border border-dashed border-primary/25 bg-primary/[0.025] p-4",
              visual.blueprintPanel,
            )}
          >
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-wider text-primary">
              Illustrative trace structure
            </p>
            <ol className="grid gap-3 sm:grid-cols-3">
              {content.flow.map((stage, index) => (
                <li key={stage} className="flex items-center gap-2 text-[11px]">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full border border-primary/20 bg-card text-[10px] text-primary">
                    0{index + 1}
                  </span>
                  <span>{stage}</span>
                  {index < 2 && (
                    <ArrowRight
                      className="ms-auto hidden size-3 text-primary sm:block"
                      aria-hidden="true"
                    />
                  )}
                </li>
              ))}
            </ol>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {visible.map((row) => (
              <button
                key={row[0]}
                type="button"
                aria-pressed={selected?.[0] === row[0]}
                aria-controls={detailId}
                onClick={() => setSelectedId(row[0])}
                className={selectClass(row)}
              >
                <span className="text-xs font-semibold text-primary">
                  {row[0]}
                </span>
                <span className="mt-2 block text-xs font-semibold">
                  {row[1]}
                </span>
                <span className="mb-3 mt-2 block text-[10px] leading-5 text-muted-foreground">
                  {row[2]}
                </span>
                <SampleStatus status={row[3]} />
                <span className="mt-3 block text-[10px] text-muted-foreground">
                  {amount(row[4])}
                </span>
              </button>
            ))}
          </div>
        </div>
      );

    return (
      <div className="overflow-x-auto">
        <table className="w-full min-w-[650px] text-start text-xs">
          <caption className="sr-only">
            Sample {content.title} records. Select a reference to view its
            details.
          </caption>
          <thead className="bg-muted/20 text-[10px] uppercase tracking-wider text-muted-foreground">
            <tr>
              {[
                "Reference / record",
                "Status",
                content.valueLabel,
                content.progressLabel,
              ].map((label) => (
                <th
                  key={label}
                  scope="col"
                  className="px-4 py-3 text-start font-medium"
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.map((row) => (
              <tr
                key={row[0]}
                data-selected={selected?.[0] === row[0]}
                className={cn(
                  "border-t border-border/60",
                  visual.orderRow,
                  selected?.[0] === row[0]
                    ? "bg-primary/[0.045]"
                    : "hover:bg-muted/20",
                )}
              >
                <th scope="row" className="px-4 py-5 text-start font-normal">
                  {recordButton(row)}
                  <span className="mt-1.5 block max-w-56 text-[10px] leading-5 text-muted-foreground">
                    {row[2]}
                  </span>
                </th>
                <td className="px-4 py-5">
                  <SampleStatus status={row[3]} />
                </td>
                <td className="whitespace-nowrap px-4 py-5 text-[11px] tabular-nums">
                  {amount(row[4])}
                </td>
                <td className="min-w-40 px-4 py-5">
                  <Progress row={row} label={content.progressLabel} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <figure className="overflow-hidden rounded-2xl border border-border bg-card shadow-[0_24px_80px_-40px_rgba(0,49,128,0.3)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-3.5 sm:px-6">
        <div className="flex items-center gap-3 text-xs">
          <span className="grid size-8 place-items-center rounded-lg bg-primary text-white">
            <Factory className="size-4" aria-hidden="true" />
          </span>
          <span className="font-semibold">
            Adon <span className="text-primary">ERP</span>
          </span>
          <span className="text-muted-foreground">/ Manufacturing</span>
        </div>
        <span className="rounded-full border border-dashed border-primary/30 bg-primary/5 px-3 py-1 text-[10px] font-medium text-primary">
          Interactive sample
        </span>
      </div>
      <div className="bg-[var(--cream)] p-4 sm:p-6">
        <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold tracking-tight">
              {content.title}
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Select a sample record to explore its production context.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1.5 text-[10px] text-muted-foreground">
            <CircleCheck className="size-3 text-primary" aria-hidden="true" />
            Sample data
          </span>
        </div>
        <dl className="mb-5 grid gap-3 sm:grid-cols-3">
          <ManufacturingMetric
            label="Sample records"
            value={number.format(content.rows.length)}
            detail={`${statuses.length} visible status categories`}
            icon={Boxes}
          />
          <ManufacturingMetric
            label={`${content.focusStatus} records`}
            value={number.format(
              content.rows.filter((row) => row[3] === content.focusStatus)
                .length,
            )}
            detail="Across the full sample set"
            icon={CircleCheck}
            annotated
          />
          <ManufacturingMetric
            label={content.totalLabel}
            value={number.format(total)}
            detail={`${content.unit} · all sample records`}
            icon={Factory}
          />
        </dl>
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-3">
            <div
              role="group"
              aria-label="Filter sample records by status"
              className="flex max-w-full gap-1 overflow-x-auto"
            >
              {["All records", ...statuses].map((status) => (
                <button
                  key={status}
                  type="button"
                  aria-pressed={filter === status}
                  onClick={() => setFilter(status)}
                  className={cn(
                    "min-h-9 shrink-0 rounded-md px-3 text-xs font-medium transition-colors",
                    styles.focus,
                    filter === status
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted/40",
                  )}
                >
                  {status}
                  <span className="ms-2 text-[10px] opacity-70">
                    {status === "All records"
                      ? content.rows.length
                      : content.rows.filter((row) => row[3] === status).length}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3">
            <div className="relative w-full sm:w-60">
              <Search
                className="pointer-events-none absolute start-3 top-2.5 size-3.5 text-muted-foreground"
                aria-hidden="true"
              />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                aria-label={`Search sample ${content.title} records`}
                placeholder="Search reference, name or resource…"
                className="h-9 w-full rounded-md border border-border bg-background pe-9 ps-9 text-xs outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
              {query && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => setQuery("")}
                  className={cn(
                    "absolute end-1 top-0.5 grid size-8 place-items-center rounded text-muted-foreground",
                    styles.focus,
                  )}
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>
            {content.view !== "table" && (
              <div
                role="group"
                aria-label="Workspace display"
                className="flex gap-1 rounded-lg border border-border p-1"
              >
                {([content.view, "table"] as const).map((option) => (
                  <button
                    key={option}
                    type="button"
                    aria-pressed={view === option}
                    onClick={() => setView(option)}
                    className={cn(
                      "inline-flex min-h-8 items-center gap-1.5 rounded-md px-2.5 text-[10px] font-medium",
                      styles.focus,
                      view === option
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted/30",
                    )}
                  >
                    {option === "table" ? (
                      <List className="size-3" aria-hidden="true" />
                    ) : (
                      <LayoutGrid className="size-3" aria-hidden="true" />
                    )}
                    {viewLabels[option]}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="grid lg:grid-cols-[minmax(0,1fr)_270px]">
            <div className="min-w-0">
              {renderRecords()}
              <p
                role="status"
                aria-live="polite"
                className="border-t border-border px-4 py-3 text-[10px] text-muted-foreground"
              >
                Showing {visible.length} of {content.rows.length} sample records
              </p>
            </div>
            <aside
              id={detailId}
              aria-label="Selected sample record details"
              className="border-t border-border bg-muted/10 p-5 lg:border-s lg:border-t-0"
            >
              {selected ? (
                <div key={selected[0]} className={visual.detail}>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Record details
                  </p>
                  <h4 className="mt-4 break-words text-base font-semibold">
                    {selected[0]}
                  </h4>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    {selected[1]}
                  </p>
                  <div className="mt-4">
                    <SampleStatus status={selected[3]} />
                  </div>
                  <dl className="my-5 space-y-4 border-y border-border py-5">
                    <div>
                      <dt className="text-[10px] text-muted-foreground">
                        {content.contextLabel}
                      </dt>
                      <dd className="mt-1 text-xs leading-5">{selected[2]}</dd>
                    </div>
                    <div>
                      <dt className="text-[10px] text-muted-foreground">
                        {content.valueLabel}
                      </dt>
                      <dd className="mt-1 text-sm font-semibold tabular-nums">
                        {amount(selected[4])}
                      </dd>
                    </div>
                  </dl>
                  <Progress row={selected} label={content.progressLabel} />
                  <div className="mt-5 rounded-lg border border-dashed border-primary/25 bg-primary/[0.04] p-3">
                    <span className="mb-2 inline-flex items-center gap-1.5 text-[10px] font-semibold text-primary">
                      <Check className="size-3" aria-hidden="true" />
                      Production context
                    </span>
                    <p className="text-[11px] leading-6 text-muted-foreground">
                      {selected[6]}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="py-8 text-xs leading-6 text-muted-foreground">
                  No record matches this search. Reset the filters to explore
                  the sample.
                </p>
              )}
            </aside>
          </div>
        </div>
      </div>
      <figcaption className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-5 py-3.5 text-[11px] text-muted-foreground sm:px-6">
        <span>
          Illustrative product preview. No live ERP records are changed.
        </span>
        <span className="inline-flex items-center gap-1.5 text-primary">
          <Search className="size-3" aria-hidden="true" />
          Search, filter and select a record
        </span>
      </figcaption>
    </figure>
  );
}
