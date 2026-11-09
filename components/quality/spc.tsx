"use client";
import { qualityError } from "./labels";
import { useTranslations } from "next-intl";

import { useMemo, useRef, useState, type KeyboardEvent } from "react";
import { Activity, Download, Table2 } from "lucide-react";
import { calculateSpc, parseReadings } from "./calculations";
import { simulatedReadings, getSuppliedSpcSummary } from "./data";
import {
  Button,
  Empty,
  Field,
  Metric,
  Panel,
  Provenance,
  Workspace,
  css,
} from "./ui";

type Stats = ReturnType<typeof calculateSpc>;
function format(value: number | null, digits = 3) {
  return value === null || !Number.isFinite(value)
    ? "—"
    : value.toFixed(digits);
}

function ControlChart({
  values,
  stats,
  kind,
  showSpecs,
  lsl,
  usl,
  selected,
  onSelect,
}: {
  values: number[];
  stats: Stats;
  kind: "individuals" | "range";
  showSpecs: boolean;
  lsl: number;
  usl: number;
  selected: number;
  onSelect: (index: number) => void;
}) {
  const t = useTranslations("pages.qualityApp");

  const points = useRef<(SVGCircleElement | null)[]>([]);
  const observations = kind === "range" ? stats.ranges : values;
  const lines =
    kind === "range"
      ? [
          { label: "UCL", value: stats.mrUcl, tone: "limit" },
          { label: "MR̄", value: stats.mrMean, tone: "mean" },
          { label: "LCL", value: 0, tone: "limit" },
        ]
      : [
          { label: "UCL", value: stats.ucl, tone: "limit" },
          { label: "CL", value: stats.mean, tone: "mean" },
          { label: "LCL", value: stats.lcl, tone: "limit" },
          ...(showSpecs
            ? [
                { label: "USL", value: usl, tone: "spec" },
                { label: "LSL", value: lsl, tone: "spec" },
              ]
            : []),
        ];
  const low = Math.min(...observations, ...lines.map((line) => line.value));
  const high = Math.max(...observations, ...lines.map((line) => line.value));
  const padding = Math.max((high - low) * 0.12, 0.3);
  const min = low - padding;
  const max = high + padding;
  const x = (index: number) =>
    65 + (index / Math.max(1, observations.length - 1)) * 840;
  const y = (value: number) => 28 + ((max - value) / (max - min)) * 252;
  function move(event: KeyboardEvent<SVGCircleElement>, index: number) {
    if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const next =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? observations.length - 1
          : Math.min(
              observations.length - 1,
              Math.max(0, index + (event.key === "ArrowRight" ? 1 : -1)),
            );
    onSelect(next);
    points.current[next]?.focus();
  }
  return (
    <div className={css.chartViewport}>
      <svg
        viewBox="0 0 1000 325"
        role="group"
        aria-label={t("dynamic.v0ChartForV1V2UseArrowKeys", {
          v0: kind === "range" ? t("copy.movingRange") : t("copy.individuals"),
          v1: observations.length,
          v2: kind === "range" ? t("ui.ranges") : t("ui.readings"),
        })}
        className={css.controlChart}
      >
        {lines.map((line) => (
          <g key={line.label} className={css[`chartLine${line.tone}`]}>
            <line x1="65" x2="905" y1={y(line.value)} y2={y(line.value)} />
            <text x="12" y={y(line.value) + 4}>
              {line.label}
            </text>
            <text x="984" y={y(line.value) + 4} textAnchor="end">
              {format(line.value, 3)}
            </text>
          </g>
        ))}
        <polyline
          points={observations
            .map((value, index) => `${x(index)},${y(value)}`)
            .join(" ")}
          className={css.readingLine}
        />
        {observations.map((value, index) => {
          const outside =
            kind === "range"
              ? value > stats.mrUcl
              : value > stats.ucl || value < stats.lcl;
          const outSpec =
            kind === "individuals" && (value < lsl || value > usl);
          return (
            <circle
              key={index}
              ref={(node) => {
                points.current[index] = node;
              }}
              cx={x(index)}
              cy={y(value)}
              r={index === selected ? 5.5 : 3.1}
              tabIndex={index === selected ? 0 : -1}
              role="button"
              aria-label={`${kind === "range" ? t("copy.range") : t("copy.reading")} ${index + 1}: ${value.toFixed(4)}${outside ? t("copy.beyondControlLimits2") : outSpec ? t("copy.outsideSpecifications") : ""}`}
              className={
                outside
                  ? css.outControlPoint
                  : outSpec
                    ? css.outSpecPoint
                    : css.readingPoint
              }
              onMouseEnter={() => onSelect(index)}
              onFocus={() => onSelect(index)}
              onClick={() => onSelect(index)}
              onKeyDown={(event) => move(event, index)}
            />
          );
        })}
        {[0, Math.floor((observations.length - 1) / 2), observations.length - 1]
          .filter((value, index, array) => array.indexOf(value) === index)
          .map((index) => (
            <text
              key={index}
              x={x(index)}
              y="310"
              textAnchor="middle"
              className={css.axisText}
            >
              {kind === "range" ? `MR ${index + 1}` : `#${index + 1}`}
            </text>
          ))}
      </svg>
    </div>
  );
}

function SuppliedSummary() {
  const t = useTranslations("pages.qualityApp");
  const supplied = getSuppliedSpcSummary(t);

  return (
    <>
      <dl className={css.metricsSix}>
        <Metric label="Cp" value="0.621" tone="red" />
        <Metric label="Cpk" value="0.578" tone="red" />
        <Metric label={t("copy.mean")} value="23.3958" />
        <Metric label={t("copy.withinSigma")} value="0.8053" />
        <Metric label={t("copy.outOfControl")} value="3" tone="red" />
        <Metric
          label={t("copy.analyzedReadings")}
          value="100"
          detail={t("copy.351ReportedAvailable")}
        />
      </dl>
      <Panel title={t("copy.theSuppliedSpcSnapshot")}>
        <dl className={css.sourceLimits}>
          {[
            [t("copy.parameter"), supplied.parameter],
            [t("copy.inspectionContext"), supplied.context],
            [t("copy.specification"), `${supplied.lsl}–${supplied.usl} μm`],
            [t("copy.target"), `${supplied.target} μm`],
            [t("copy.controlLimits"), `${supplied.lcl}–${supplied.ucl}`],
          ].map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
        <Empty title={t("copy.theOriginalReadingValuesWereNotSupplied")}>
          {t("copy.theScreenshotGivesASummaryAndChartImage")}
        </Empty>
      </Panel>
    </>
  );
}

export default function SpcWorkspace() {
  const t = useTranslations("pages.qualityApp");
  const supplied = getSuppliedSpcSummary(t);

  const [mode, setMode] = useState<"demo" | "supplied" | "local">("demo");
  const [kind, setKind] = useState<"individuals" | "range">("individuals");
  const [windowSize, setWindowSize] = useState("100");
  const [showSpecs, setShowSpecs] = useState(true);
  const [selected, setSelected] = useState(0);
  const [lslText, setLsl] = useState("22");
  const [uslText, setUsl] = useState("25");
  const [pasted, setPasted] = useState("");
  const [localReadings, setLocalReadings] = useState<number[]>([]);
  const [inputError, setInputError] = useState("");
  const [showTable, setShowTable] = useState(false);
  const lsl = lslText.trim() ? Number(lslText) : NaN;
  const usl = uslText.trim() ? Number(uslText) : NaN;
  const values = useMemo(() => {
    const all = mode === "local" ? localReadings : simulatedReadings;
    return windowSize === "all" ? all : all.slice(-Number(windowSize));
  }, [mode, localReadings, windowSize]);
  const calculation = useMemo(() => {
    try {
      return { stats: calculateSpc(values, lsl, usl), error: null };
    } catch (error) {
      return { stats: null, error: (error as Error).message };
    }
  }, [values, lsl, usl]);
  const stats = calculation.stats;
  const series = kind === "range" ? (stats?.ranges ?? []) : values;
  const active = Math.min(selected, Math.max(0, series.length - 1));
  function loadLocal() {
    try {
      const parsed = parseReadings(pasted);
      setLocalReadings(parsed);
      setMode("local");
      setWindowSize("all");
      setSelected(0);
      setInputError("");
    } catch (error) {
      setInputError((error as Error).message);
    }
  }
  function download() {
    const csv = [
      [t("copy.observation"), t("copy.valueM")]
        .map((label) => `"${label.replaceAll('"', '""')}"`)
        .join(","),
      ...values.map((value, index) => `${index + 1},${value}`),
    ].join("\r\n");
    const url = URL.createObjectURL(
      new Blob([csv], { type: "text/csv;charset=utf-8;" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = `qms-${mode}-readings.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }
  return (
    <Workspace
      title={t("copy.followTheProcessPointByPoint")}
      description={t(
        "copy.theSourceSummaryIsPreservedSeparatelyInteractiveCharts",
      )}
      provenance={
        mode === "supplied" ? "supplied" : mode === "local" ? "local" : "demo"
      }
    >
      <div className={css.workspaceBody}>
        <div className={css.spcToolbar}>
          <div>
            <span className={css.microLabel}>{t("copy.qualityParameter")}</span>
            <h3>
              {supplied.parameter}
              <small>{supplied.context}</small>
            </h3>
          </div>
          <div
            className={css.segmented}
            role="group"
            aria-label={t("copy.spcDataSource")}
          >
            <Button
              aria-pressed={mode === "demo"}
              onClick={() => {
                setMode("demo");
                setSelected(0);
              }}
            >
              {t("copy.simulatedReadings")}
            </Button>
            <Button
              aria-pressed={mode === "supplied"}
              onClick={() => setMode("supplied")}
            >
              {t("copy.suppliedSummary")}
            </Button>
            {localReadings.length > 0 && (
              <Button
                aria-pressed={mode === "local"}
                onClick={() => {
                  setMode("local");
                  setSelected(0);
                }}
              >
                {t("copy.localReadings")}
              </Button>
            )}
          </div>
        </div>
        {mode === "supplied" ? (
          <SuppliedSummary />
        ) : (
          <>
            <div className={css.spcControls}>
              <Field label={t("copy.lowerSpecificationM")}>
                <input
                  type="number"
                  step="any"
                  value={lslText}
                  onChange={(event) => setLsl(event.target.value)}
                />
              </Field>
              <Field label={t("copy.upperSpecificationM")}>
                <input
                  type="number"
                  step="any"
                  value={uslText}
                  onChange={(event) => setUsl(event.target.value)}
                />
              </Field>
              <Field label={t("copy.visibleAnalyzedWindow")}>
                <select
                  value={windowSize}
                  onChange={(event) => {
                    setWindowSize(event.target.value);
                    setSelected(0);
                  }}
                >
                  <option value="25">{t("copy.last25")}</option>
                  <option value="50">{t("copy.last50")}</option>
                  <option value="100">{t("copy.last100")}</option>
                  <option value="all">
                    {t("copy.allAvailableInThisDemo")}
                  </option>
                </select>
              </Field>
              <Provenance kind={mode === "local" ? "local" : "demo"} />
            </div>
            {stats ? (
              <>
                <dl className={css.metricsSix}>
                  <Metric
                    label={t("copy.cpEstimate")}
                    value={format(stats.cp)}
                    detail={t("copy.visibleWindowCalculation")}
                    tone="blue"
                  />
                  <Metric
                    label={t("copy.cpkEstimate")}
                    value={format(stats.cpk)}
                    detail={t("copy.reviewStabilityFirst")}
                    tone="blue"
                  />
                  <Metric
                    label={t("copy.mean")}
                    value={format(stats.mean, 4)}
                    detail="μm"
                  />
                  <Metric
                    label={t("copy.withinSigma")}
                    value={format(stats.sigma, 4)}
                    detail="MR̄ / 1.128"
                  />
                  <Metric
                    label={t("copy.beyondControlLimits")}
                    value={stats.outOfControl}
                    detail={t("copy.individualsThreeSigmaRule")}
                    tone={stats.outOfControl ? "red" : "neutral"}
                  />
                  <Metric
                    label={t("copy.readingsAnalyzed")}
                    value={stats.count}
                    detail={t("dynamic.v0OutsideSpecifications", {
                      v0: stats.outOfSpec,
                    })}
                  />
                </dl>
                <Panel
                  title={
                    kind === "range"
                      ? t("copy.movingRangeControlChart")
                      : t("copy.individualsControlChart")
                  }
                  action={
                    <div
                      className={css.segmented}
                      role="group"
                      aria-label={t("copy.spcChartType")}
                    >
                      <Button
                        aria-pressed={kind === "individuals"}
                        onClick={() => {
                          setKind("individuals");
                          setSelected(0);
                        }}
                      >
                        {t("copy.individuals")}
                      </Button>
                      <Button
                        aria-pressed={kind === "range"}
                        onClick={() => {
                          setKind("range");
                          setSelected(0);
                        }}
                      >
                        {t("copy.movingRange2")}
                      </Button>
                    </div>
                  }
                >
                  <div className={css.chartOptions}>
                    <label>
                      <input
                        type="checkbox"
                        checked={showSpecs}
                        disabled={kind === "range"}
                        onChange={(event) => setShowSpecs(event.target.checked)}
                      />
                      {t("copy.showSpecificationLines")}
                    </label>
                    <div>
                      <Button
                        onClick={() => setShowTable(!showTable)}
                        aria-pressed={showTable}
                      >
                        <Table2 size={13} aria-hidden="true" />
                        {t("copy.readingsTable")}
                      </Button>
                      <Button onClick={download}>
                        <Download size={13} aria-hidden="true" />
                        CSV
                      </Button>
                    </div>
                  </div>
                  <ControlChart
                    values={values}
                    stats={stats}
                    kind={kind}
                    showSpecs={showSpecs}
                    lsl={lsl}
                    usl={usl}
                    selected={active}
                    onSelect={setSelected}
                  />
                  <div className={css.chartInspection} aria-live="polite">
                    <Activity size={18} aria-hidden="true" />
                    <div>
                      <strong>
                        {t(
                          kind === "range"
                            ? "ui.rangeNumber"
                            : "ui.readingNumber",
                          { index: active + 1 },
                        )}
                      </strong>
                      <span>{format(series[active] ?? null, 4)} μm</span>
                    </div>
                    <p>
                      {kind === "range"
                        ? t("copy.absoluteDifferenceBetweenSuccessiveReadings")
                        : t("copy.hoverOrFocusAPointUseArrowKeys")}
                    </p>
                  </div>
                  <label className={css.pointSlider}>
                    <span>
                      {t("ui.inspectObservation", {
                        index: active + 1,
                        count: series.length,
                      })}
                    </span>
                    <input
                      type="range"
                      min="0"
                      max={Math.max(0, series.length - 1)}
                      step="1"
                      value={active}
                      onChange={(event) =>
                        setSelected(Number(event.target.value))
                      }
                      aria-label={t("copy.inspectAChartObservation")}
                    />
                  </label>
                  <p className={css.panelNote}>
                    {t("copy.redPointsExceedControlLimitsAmberPointsExceed")}
                  </p>
                  {stats.sigma === 0 && (
                    <p className={css.formError}>
                      {t("copy.noMovingRangeVariationIsPresentCpAnd")}
                    </p>
                  )}
                  {showTable && (
                    <div className={css.readingsTable}>
                      <table className={css.dataTable}>
                        <caption className="sr-only">
                          {mode === "local"
                            ? t("ui.localReadingsCaption")
                            : t("ui.simulatedReadingsCaption")}
                        </caption>
                        <thead>
                          <tr>
                            <th scope="col">{t("copy.observation")}</th>
                            <th scope="col">{t("copy.valueM")}</th>
                            <th scope="col">{t("copy.controlStatus")}</th>
                            <th scope="col">{t("copy.specificationStatus")}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {values.map((value, index) => (
                            <tr key={index}>
                              <th scope="row">{index + 1}</th>
                              <td>{value.toFixed(4)}</td>
                              <td>
                                {value < stats.lcl || value > stats.ucl
                                  ? t("copy.beyondLimit")
                                  : t("copy.withinLimits")}
                              </td>
                              <td>
                                {value < lsl || value > usl
                                  ? t("copy.outsideSpec")
                                  : t("copy.withinSpec")}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </Panel>
                <p className={css.statisticsNote}>
                  {t(
                    "copy.capabilityEstimatesAreDescriptiveForThisWindowReview",
                  )}{" "}
                  <a
                    href="https://www.itl.nist.gov/div898/handbook/pmc/section1/pmc16.htm"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t("copy.nistCalculationReference")}
                  </a>
                </p>
              </>
            ) : (
              <p role="alert" className={css.formError}>
                {qualityError(t, calculation.error)}
              </p>
            )}
          </>
        )}
        <details className={css.readingsInput}>
          <summary>{t("copy.tryYourOwnLocalReadings")}</summary>
          <p>{t("copy.paste2500NumericReadingsInObservationOrder")}</p>
          <label className={css.field}>
            <span>{t("copy.readingsSeparatedByCommasSpacesOrNewLines")}</span>
            <textarea
              rows={4}
              value={pasted}
              onChange={(event) => setPasted(event.target.value)}
              placeholder="23.4, 23.8, 22.9, 23.5…"
            />
          </label>
          {inputError && (
            <p role="alert" className={css.formError}>
              {qualityError(t, inputError)}
            </p>
          )}
          <Button variant="primary" onClick={loadLocal}>
            {t("copy.applyLocalReadings")}
          </Button>
        </details>
      </div>
    </Workspace>
  );
}
