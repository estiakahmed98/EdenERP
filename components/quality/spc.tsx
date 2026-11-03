"use client";

import { useMemo, useRef, useState, type KeyboardEvent } from "react";
import { Activity, Download, Table2 } from "lucide-react";
import { calculateSpc, parseReadings } from "./calculations";
import { simulatedReadings, suppliedSpcSummary as supplied } from "./data";
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
        aria-label={`${kind === "range" ? "Moving-range" : "Individuals"} chart for ${observations.length} ${kind === "range" ? "ranges" : "readings"}. Use arrow keys on a point to inspect adjacent values.`}
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
              aria-label={`${kind === "range" ? "Range" : "Reading"} ${index + 1}: ${value.toFixed(4)}${outside ? ", beyond control limits" : outSpec ? ", outside specifications" : ""}`}
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
  return (
    <>
      <dl className={css.metricsSix}>
        <Metric label="Cp" value="0.621" tone="red" />
        <Metric label="Cpk" value="0.578" tone="red" />
        <Metric label="Mean" value="23.3958" />
        <Metric label="Within sigma" value="0.8053" />
        <Metric label="Out of control" value="3" tone="red" />
        <Metric
          label="Analyzed readings"
          value="100"
          detail="351 reported available"
        />
      </dl>
      <Panel title="The supplied SPC snapshot">
        <dl className={css.sourceLimits}>
          {[
            ["Parameter", supplied.parameter],
            ["Inspection context", supplied.context],
            ["Specification", `${supplied.lsl}–${supplied.usl} μm`],
            ["Target", `${supplied.target} μm`],
            ["Control limits", `${supplied.lcl}–${supplied.ucl}`],
          ].map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
        <Empty title="The original reading values were not supplied">
          The screenshot gives a summary and chart image, not the 100 individual
          values. Use the separately labeled simulation or paste local readings
          to explore the interactive charts.
        </Empty>
      </Panel>
    </>
  );
}

export default function SpcWorkspace() {
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
      "Observation,Value",
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
      title="Follow the process, point by point."
      description="The source summary is preserved separately. Interactive charts use explicitly simulated or locally pasted readings, with metrics calculated from the visible data window."
      provenance={
        mode === "supplied" ? "supplied" : mode === "local" ? "local" : "demo"
      }
    >
      <div className={css.workspaceBody}>
        <div className={css.spcToolbar}>
          <div>
            <span className={css.microLabel}>Quality parameter</span>
            <h3>
              {supplied.parameter}
              <small>{supplied.context}</small>
            </h3>
          </div>
          <div
            className={css.segmented}
            role="group"
            aria-label="SPC data source"
          >
            <Button
              aria-pressed={mode === "demo"}
              onClick={() => {
                setMode("demo");
                setSelected(0);
              }}
            >
              Simulated readings
            </Button>
            <Button
              aria-pressed={mode === "supplied"}
              onClick={() => setMode("supplied")}
            >
              Supplied summary
            </Button>
            {localReadings.length > 0 && (
              <Button
                aria-pressed={mode === "local"}
                onClick={() => {
                  setMode("local");
                  setSelected(0);
                }}
              >
                Local readings
              </Button>
            )}
          </div>
        </div>
        {mode === "supplied" ? (
          <SuppliedSummary />
        ) : (
          <>
            <div className={css.spcControls}>
              <Field label="Lower specification (μm)">
                <input
                  type="number"
                  step="any"
                  value={lslText}
                  onChange={(event) => setLsl(event.target.value)}
                />
              </Field>
              <Field label="Upper specification (μm)">
                <input
                  type="number"
                  step="any"
                  value={uslText}
                  onChange={(event) => setUsl(event.target.value)}
                />
              </Field>
              <Field label="Visible / analyzed window">
                <select
                  value={windowSize}
                  onChange={(event) => {
                    setWindowSize(event.target.value);
                    setSelected(0);
                  }}
                >
                  <option value="25">Last 25</option>
                  <option value="50">Last 50</option>
                  <option value="100">Last 100</option>
                  <option value="all">All available in this demo</option>
                </select>
              </Field>
              <Provenance kind={mode === "local" ? "local" : "demo"} />
            </div>
            {stats ? (
              <>
                <dl className={css.metricsSix}>
                  <Metric
                    label="Cp estimate"
                    value={format(stats.cp)}
                    detail="Visible-window calculation"
                    tone="blue"
                  />
                  <Metric
                    label="Cpk estimate"
                    value={format(stats.cpk)}
                    detail="Review stability first"
                    tone="blue"
                  />
                  <Metric
                    label="Mean"
                    value={format(stats.mean, 4)}
                    detail="μm"
                  />
                  <Metric
                    label="Within sigma"
                    value={format(stats.sigma, 4)}
                    detail="MR̄ / 1.128"
                  />
                  <Metric
                    label="Beyond control limits"
                    value={stats.outOfControl}
                    detail="Individuals, three-sigma rule"
                    tone={stats.outOfControl ? "red" : "neutral"}
                  />
                  <Metric
                    label="Readings analyzed"
                    value={stats.count}
                    detail={`${stats.outOfSpec} outside specifications`}
                  />
                </dl>
                <Panel
                  title={
                    kind === "range"
                      ? "Moving-range control chart"
                      : "Individuals control chart"
                  }
                  action={
                    <div
                      className={css.segmented}
                      role="group"
                      aria-label="SPC chart type"
                    >
                      <Button
                        aria-pressed={kind === "individuals"}
                        onClick={() => {
                          setKind("individuals");
                          setSelected(0);
                        }}
                      >
                        Individuals
                      </Button>
                      <Button
                        aria-pressed={kind === "range"}
                        onClick={() => {
                          setKind("range");
                          setSelected(0);
                        }}
                      >
                        Moving range
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
                      Show specification lines
                    </label>
                    <div>
                      <Button
                        onClick={() => setShowTable(!showTable)}
                        aria-pressed={showTable}
                      >
                        <Table2 size={13} aria-hidden="true" />
                        Readings table
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
                        {kind === "range" ? "Moving range" : "Reading"} #
                        {active + 1}
                      </strong>
                      <span>{format(series[active] ?? null, 4)} μm</span>
                    </div>
                    <p>
                      {kind === "range"
                        ? "Absolute difference between successive readings."
                        : "Hover or focus a point. Use arrow keys to inspect adjacent readings."}
                    </p>
                  </div>
                  <label className={css.pointSlider}>
                    <span>
                      Inspect observation {active + 1} of {series.length}
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
                      aria-label="Inspect a chart observation"
                    />
                  </label>
                  <p className={css.panelNote}>
                    Red points exceed control limits; amber points exceed
                    specifications without exceeding control limits. Estimates
                    use the visible window.
                  </p>
                  {stats.sigma === 0 && (
                    <p className={css.formError}>
                      No moving-range variation is present. Cp and Cpk are
                      undefined for this window.
                    </p>
                  )}
                  {showTable && (
                    <div className={css.readingsTable}>
                      <table className={css.dataTable}>
                        <caption className="sr-only">
                          {mode === "local" ? "Locally pasted" : "Simulated"}{" "}
                          process readings
                        </caption>
                        <thead>
                          <tr>
                            <th scope="col">Observation</th>
                            <th scope="col">Value (μm)</th>
                            <th scope="col">Control status</th>
                            <th scope="col">Specification status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {values.map((value, index) => (
                            <tr key={index}>
                              <th scope="row">{index + 1}</th>
                              <td>{value.toFixed(4)}</td>
                              <td>
                                {value < stats.lcl || value > stats.ucl
                                  ? "Beyond limit"
                                  : "Within limits"}
                              </td>
                              <td>
                                {value < lsl || value > usl
                                  ? "Outside spec"
                                  : "Within spec"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </Panel>
                <p className={css.statisticsNote}>
                  Capability estimates are descriptive for this window. Review
                  process stability and distribution assumptions before
                  interpreting them.{" "}
                  <a
                    href="https://www.itl.nist.gov/div898/handbook/pmc/section1/pmc16.htm"
                    target="_blank"
                    rel="noreferrer"
                  >
                    NIST calculation reference
                  </a>
                </p>
              </>
            ) : (
              <p role="alert" className={css.formError}>
                {calculation.error}
              </p>
            )}
          </>
        )}
        <details className={css.readingsInput}>
          <summary>Try your own local readings</summary>
          <p>
            Paste 2–500 numeric readings in observation order. They stay in this
            page and are not sent to an ERP service.
          </p>
          <label className={css.field}>
            <span>Readings, separated by commas, spaces or new lines</span>
            <textarea
              rows={4}
              value={pasted}
              onChange={(event) => setPasted(event.target.value)}
              placeholder="23.4, 23.8, 22.9, 23.5…"
            />
          </label>
          {inputError && (
            <p role="alert" className={css.formError}>
              {inputError}
            </p>
          )}
          <Button variant="primary" onClick={loadLocal}>
            Apply local readings
          </Button>
        </details>
      </div>
    </Workspace>
  );
}
