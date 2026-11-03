"use client";

import { useState } from "react";
import { ArrowUpRight, CircleAlert, SlidersHorizontal } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { qualitySnapshot as source, suppliedNcRecords } from "./data";
import { Button, Empty, Metric, Panel, Tag, Workspace, css } from "./ui";

export default function DashboardWorkspace() {
  const [breakdown, setBreakdown] = useState<"severity" | "sources">(
    "severity",
  );
  const [selected, setSelected] = useState<string | null>(null);
  const basis = source[breakdown];
  const records = suppliedNcRecords.filter(
    (record) =>
      !selected ||
      (breakdown === "severity" ? record.severity : record.source) === selected,
  );
  const chartLabel = basis
    .map((item) => `${item.name}: ${item.count}`)
    .join(", ");
  const reset = () => {
    setSelected(null);
    setBreakdown("severity");
  };
  return (
    <Workspace
      title="Quality, with the context attached."
      description="Explore the supplied 90-day snapshot. Chart selections filter the visible case excerpt; snapshot totals remain as supplied."
      actions={
        <Button onClick={reset}>
          <SlidersHorizontal size={14} aria-hidden="true" />
          Reset view
        </Button>
      }
    >
      <div className={css.workspaceBody}>
        <div className={css.snapshotLine}>
          <span>Quality snapshot / Last 90 days</span>
          <span>Alif Steel Mills Ltd</span>
        </div>
        <dl className={css.metricsSix}>
          <Metric label="Open NCs" value="4" detail="of 6 raised" tone="red" />
          <Metric
            label="Critical NCs"
            value="1"
            detail="Across the source snapshot"
            tone="red"
          />
          <Metric
            label="Open CAPAs"
            value="4"
            detail="of 5 CAPAs"
            tone="amber"
          />
          <Metric
            label="Overdue CAPAs"
            value="0"
            detail="Reported in the snapshot"
            tone="green"
          />
          <Metric
            label="First-pass yield"
            value="92%"
            detail="Supplied inspection indicator"
            tone="blue"
          />
          <Metric label="AQL pass rate" value="—" detail="0 AQL inspections" />
        </dl>
        <div className={css.dashboardGrid}>
          <Panel
            title="The shape of the findings"
            action={
              <div
                className={css.segmented}
                role="group"
                aria-label="Chart breakdown"
              >
                {(["severity", "sources"] as const).map((mode) => (
                  <Button
                    key={mode}
                    aria-pressed={breakdown === mode}
                    onClick={() => {
                      setBreakdown(mode);
                      setSelected(null);
                    }}
                  >
                    {mode === "severity" ? "Severity" : "Source"}
                  </Button>
                ))}
              </div>
            }
            className={css.breakdownPanel}
          >
            <div className={css.breakdownContent}>
              <div
                className={cn(
                  css.findingDonut,
                  breakdown === "sources" && css.sourceDonut,
                )}
                role="img"
                aria-label={chartLabel}
              >
                <div>
                  <strong>6</strong>
                  <span>NCs raised</span>
                </div>
              </div>
              <div className={css.chartLegend}>
                {basis.map((item, index) => (
                  <button
                    key={item.name}
                    type="button"
                    aria-pressed={selected === item.name}
                    onClick={() =>
                      setSelected(selected === item.name ? null : item.name)
                    }
                  >
                    <span className={css[`legendDot${index}`]} />
                    <span>{item.name}</span>
                    <strong>{item.count}</strong>
                    <small>Filter cases</small>
                  </button>
                ))}
              </div>
            </div>
            <p className={css.panelNote}>
              Select a segment label to inspect matching records in the supplied
              table excerpt.
            </p>
          </Panel>
          <Panel title="Non-conformances by month" className={css.monthPanel}>
            <div className={css.monthChart}>
              <span className={css.monthAxis}>6</span>
              <div className={css.monthColumn}>
                <span>6 raised</span>
                <div>
                  <i />
                  <button
                    type="button"
                    aria-label="Filter the supplied case excerpt to critical findings"
                    onClick={() => {
                      setBreakdown("severity");
                      setSelected("Critical");
                    }}
                  >
                    <span className="sr-only">1 critical</span>
                  </button>
                </div>
                <small>Oct 2026</small>
              </div>
              <span className={css.monthBaseline} />
            </div>
            <p className={css.panelNote}>
              <span className={css.criticalKey} />1 critical finding. No other
              monthly counts were supplied.
            </p>
          </Panel>
          <Panel
            title="The visible case excerpt"
            action={
              selected && (
                <Button onClick={() => setSelected(null)}>
                  Clear {selected}
                </Button>
              )
            }
            className={css.caseExcerptPanel}
          >
            {records.length ? (
              <div className={css.caseExcerpt}>
                {records.map((record) => (
                  <Link key={record.id} href="/apps/quality/non-conformance">
                    <span>{record.id}</span>
                    <div>
                      <strong>{record.title}</strong>
                      <small>
                        {record.source} · {record.status}
                      </small>
                    </div>
                    <Tag tone={record.severity === "Minor" ? "blue" : "amber"}>
                      {record.severity}
                    </Tag>
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </Link>
                ))}
              </div>
            ) : (
              <Empty title="No matching case row was supplied">
                The summary includes one critical finding, but its individual
                record is outside the four-row source excerpt.
              </Empty>
            )}
            <p className={css.panelNote}>
              4 open rows were supplied from 6 raised NCs. This excerpt is not
              the complete register.
            </p>
          </Panel>
          <Panel title="Defect classification" className={css.paretoPanel}>
            <Empty title="Ready for a clearer Pareto view">
              No classified defects are present in the supplied snapshot. Keep
              the empty state visible until classifications exist.
            </Empty>
            <Link
              href="/apps/quality/non-conformance"
              className={css.inlineLink}
            >
              Review the NC context
              <ArrowUpRight size={13} aria-hidden="true" />
            </Link>
          </Panel>
          <div className={css.dashboardInsight}>
            <CircleAlert size={20} aria-hidden="true" />
            <div>
              <strong>A finding is a starting point.</strong>
              <p>
                Follow the problem into CAPA, then review the evidence behind
                the action.
              </p>
            </div>
            <Link href="/apps/quality/capa" className={css.inlineLink}>
              Explore CAPA
              <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </Workspace>
  );
}
