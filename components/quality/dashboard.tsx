"use client";
import { enumLabel } from "./labels";
import { useTranslations } from "next-intl";

import { useState } from "react";
import { ArrowUpRight, CircleAlert, SlidersHorizontal } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { qualitySnapshot as source, getSuppliedNcRecords } from "./data";
import { Button, Empty, Metric, Panel, Tag, Workspace, css } from "./ui";

export default function DashboardWorkspace() {
  const t = useTranslations("pages.qualityApp");
  const suppliedNcRecords = getSuppliedNcRecords(t);

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
    .map((item) => `${enumLabel(t, item.name)}: ${item.count}`)
    .join(", ");
  const reset = () => {
    setSelected(null);
    setBreakdown("severity");
  };
  return (
    <Workspace
      title={t("copy.qualityWithTheContextAttached")}
      description={t("copy.exploreTheSupplied90DaySnapshotChartSelections")}
      actions={
        <Button onClick={reset}>
          <SlidersHorizontal size={14} aria-hidden="true" />
          {t("copy.resetView")}
        </Button>
      }
    >
      <div className={css.workspaceBody}>
        <div className={css.snapshotLine}>
          <span>{t("copy.qualitySnapshotLast90Days")}</span>
          <span>Alif Steel Mills Ltd</span>
        </div>
        <dl className={css.metricsSix}>
          <Metric
            label={t("copy.openNcs")}
            value="4"
            detail={t("copy.of6Raised")}
            tone="red"
          />
          <Metric
            label={t("copy.criticalNcs")}
            value="1"
            detail={t("copy.acrossTheSourceSnapshot")}
            tone="red"
          />
          <Metric
            label={t("copy.openCapas")}
            value="4"
            detail={t("copy.of5Capas")}
            tone="amber"
          />
          <Metric
            label={t("copy.overdueCapas")}
            value="0"
            detail={t("copy.reportedInTheSnapshot")}
            tone="green"
          />
          <Metric
            label={t("copy.firstPassYield")}
            value="92%"
            detail={t("copy.suppliedInspectionIndicator")}
            tone="blue"
          />
          <Metric
            label={t("copy.aqlPassRate")}
            value="—"
            detail={t("copy.0AqlInspections")}
          />
        </dl>
        <div className={css.dashboardGrid}>
          <Panel
            title={t("copy.theShapeOfTheFindings")}
            action={
              <div
                className={css.segmented}
                role="group"
                aria-label={t("copy.chartBreakdown")}
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
                    {mode === "severity"
                      ? t("copy.severity")
                      : t("copy.source")}
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
                  <span>{t("copy.ncsRaised")}</span>
                </div>
              </div>
              <div className={css.chartLegend}>
                {basis.map((item, index) => (
                  <button
                    key={enumLabel(t, item.name)}
                    type="button"
                    aria-pressed={selected === item.name}
                    onClick={() =>
                      setSelected(selected === item.name ? null : item.name)
                    }
                  >
                    <span className={css[`legendDot${index}`]} />
                    <span>{enumLabel(t, item.name)}</span>
                    <strong>{item.count}</strong>
                    <small>{t("copy.filterCases")}</small>
                  </button>
                ))}
              </div>
            </div>
            <p className={css.panelNote}>
              {t("copy.selectASegmentLabelToInspectMatchingRecords")}
            </p>
          </Panel>
          <Panel
            title={t("copy.nonConformancesByMonth")}
            className={css.monthPanel}
          >
            <div className={css.monthChart}>
              <span className={css.monthAxis}>6</span>
              <div className={css.monthColumn}>
                <span>{t("copy.6Raised")}</span>
                <div>
                  <i />
                  <button
                    type="button"
                    aria-label={t(
                      "copy.filterTheSuppliedCaseExcerptToCriticalFindings",
                    )}
                    onClick={() => {
                      setBreakdown("severity");
                      setSelected("Critical");
                    }}
                  >
                    <span className="sr-only">{t("copy.1Critical")}</span>
                  </button>
                </div>
                <small>{t("copy.oct2026")}</small>
              </div>
              <span className={css.monthBaseline} />
            </div>
            <p className={css.panelNote}>
              <span className={css.criticalKey} />
              {t("copy.1CriticalFindingNoOtherMonthlyCountsWere")}
            </p>
          </Panel>
          <Panel
            title={t("copy.theVisibleCaseExcerpt")}
            action={
              selected && (
                <Button onClick={() => setSelected(null)}>
                  {t("ui.clearSelection", { name: enumLabel(t, selected) })}
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
                        {enumLabel(t, record.source)} ·{" "}
                        {enumLabel(t, record.status)}
                      </small>
                    </div>
                    <Tag tone={record.severity === "Minor" ? "blue" : "amber"}>
                      {enumLabel(t, record.severity)}
                    </Tag>
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </Link>
                ))}
              </div>
            ) : (
              <Empty title={t("copy.noMatchingCaseRowWasSupplied")}>
                {t("copy.theSummaryIncludesOneCriticalFindingButIts")}
              </Empty>
            )}
            <p className={css.panelNote}>
              {t("copy.4OpenRowsWereSuppliedFrom6Raised")}
            </p>
          </Panel>
          <Panel
            title={t("copy.defectClassification")}
            className={css.paretoPanel}
          >
            <Empty title={t("copy.readyForAClearerParetoView")}>
              {t("copy.noClassifiedDefectsArePresentInTheSupplied")}
            </Empty>
            <Link
              href="/apps/quality/non-conformance"
              className={css.inlineLink}
            >
              {t("copy.reviewTheNcContext")}
              <ArrowUpRight size={13} aria-hidden="true" />
            </Link>
          </Panel>
          <div className={css.dashboardInsight}>
            <CircleAlert size={20} aria-hidden="true" />
            <div>
              <strong>{t("copy.aFindingIsAStartingPoint")}</strong>
              <p>{t("copy.followTheProblemIntoCapaThenReviewThe")}</p>
            </div>
            <Link href="/apps/quality/capa" className={css.inlineLink}>
              {t("copy.exploreCapa")}
              <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </Workspace>
  );
}
