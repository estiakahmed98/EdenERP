"use client";

import { useState } from "react";
import { ArrowDownRight, Calculator, Check, RotateCcw, X } from "lucide-react";
import { lookupAqlPlan, evaluateAql } from "./calculations";
import { suppliedAqlPlans } from "./data";
import {
  Button,
  Field,
  Metric,
  Panel,
  Provenance,
  Tag,
  Workspace,
  css,
} from "./ui";

export default function AqlWorkspace() {
  const [lot, setLot] = useState("500");
  const [aql, setAql] = useState("2.5");
  const [level, setLevel] = useState("II");
  const [defects, setDefects] = useState("");
  const [evaluated, setEvaluated] = useState(false);
  const lookup = lookupAqlPlan(lot.trim() ? Number(lot) : NaN, aql, level);
  const result =
    evaluated && lookup.plan
      ? evaluateAql(lookup.plan, defects.trim() ? Number(defects) : NaN)
      : null;
  function reset() {
    setLot("500");
    setAql("2.5");
    setLevel("II");
    setDefects("");
    setEvaluated(false);
  }
  function selectRow(max: number) {
    setLot(String(max));
    setAql("2.5");
    setLevel("II");
    setDefects("");
    setEvaluated(false);
  }
  return (
    <Workspace
      title="A sample plan you can inspect."
      description="Try the supplied numeric plan excerpt: AQL 2.5, General II, normal single sampling, lot sizes 2–500. Uncovered combinations return an explicit data gap."
      actions={
        <Button onClick={reset}>
          <RotateCcw size={14} aria-hidden="true" />
          Load supplied example
        </Button>
      }
    >
      <div className={css.workspaceBody}>
        <div className={css.samplingScope}>
          <Calculator size={18} aria-hidden="true" />
          <span>Plan scope: supplied matrix excerpt</span>
          <Tag tone="blue">AQL 2.5 · General II</Tag>
          <span>Normal / single sampling</span>
        </div>
        <div className={css.aqlCalculatorGrid}>
          <Panel
            title="Define the inspection basis"
            className={css.calculatorPanel}
          >
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setEvaluated(true);
              }}
            >
              <div className={css.formColumns}>
                <Field label="Lot size">
                  <input
                    type="number"
                    min="2"
                    step="1"
                    value={lot}
                    onChange={(event) => {
                      setLot(event.target.value);
                      setEvaluated(false);
                    }}
                    required
                  />
                </Field>
                <Field label="AQL">
                  <select
                    value={aql}
                    onChange={(event) => {
                      setAql(event.target.value);
                      setEvaluated(false);
                    }}
                  >
                    {["1.0", "1.5", "2.5", "4.0", "6.5"].map((value) => (
                      <option key={value}>{value}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Inspection level">
                  <select
                    value={level}
                    onChange={(event) => {
                      setLevel(event.target.value);
                      setEvaluated(false);
                    }}
                  >
                    <option value="I">General I</option>
                    <option value="II">General II</option>
                    <option value="III">General III</option>
                  </select>
                </Field>
                <Field label="Defective units found">
                  <input
                    type="number"
                    min="0"
                    max={lookup.plan?.sample}
                    step="1"
                    value={defects}
                    placeholder="Enter after inspection"
                    onChange={(event) => {
                      setDefects(event.target.value);
                      setEvaluated(false);
                    }}
                  />
                </Field>
              </div>
              <div className={css.formActions}>
                <span className={css.microHint}>
                  Sample counts are looked up, not estimated as a percentage.
                </span>
                <Button type="submit" variant="primary" disabled={!lookup.plan}>
                  Evaluate finding
                  <ArrowDownRight size={14} aria-hidden="true" />
                </Button>
              </div>
            </form>
          </Panel>
          <section
            className={css.samplingDecision}
            aria-label="Sampling plan result"
            aria-live="polite"
          >
            <Provenance />
            <span className={css.eyebrow}>
              {lookup.plan
                ? `Plan code ${lookup.plan.code}`
                : "Plan unavailable"}
            </span>
            <h3>
              {lookup.plan
                ? `${lookup.plan.sample} units to inspect`
                : "A configured plan is needed."}
            </h3>
            {lookup.plan ? (
              <>
                <dl className={css.thresholdNumbers}>
                  <div>
                    <dt>Accept at or below</dt>
                    <dd>{lookup.plan.accept}</dd>
                  </div>
                  <div>
                    <dt>Reject at or above</dt>
                    <dd>{lookup.plan.reject}</dd>
                  </div>
                </dl>
                <div className={css.sampleRatio}>
                  <span
                    style={{
                      width: `${(lookup.plan.sample / Number(lot)) * 100}%`,
                    }}
                  />
                </div>
                <p className={css.panelNote}>
                  {lookup.plan.sample} sampled from a lot of{" "}
                  {Number(lot).toLocaleString("en-US")}.
                </p>
                {result?.error ? (
                  <p role="alert" className={css.formError}>
                    {result.error}
                  </p>
                ) : result?.decision ? (
                  <div
                    className={
                      result.decision === "Accept"
                        ? css.acceptDecision
                        : css.rejectDecision
                    }
                  >
                    {result.decision === "Accept" ? (
                      <Check size={19} aria-hidden="true" />
                    ) : (
                      <X size={19} aria-hidden="true" />
                    )}
                    <div>
                      <strong>{result.decision} under this plan</strong>
                      <span>
                        {defects} defective units recorded in the local
                        evaluation.
                      </span>
                    </div>
                  </div>
                ) : (
                  <p className={css.waitingDecision}>
                    Plan ready. Enter the inspection finding and evaluate.
                  </p>
                )}
              </>
            ) : (
              <p className={css.formError}>{lookup.error}</p>
            )}
          </section>
        </div>
        <dl className={css.metricsFour}>
          <Metric
            label="Supported numeric rows"
            value="8"
            detail="Fully visible supplied excerpt"
          />
          <Metric
            label="Inspection basis"
            value="II"
            detail="General Inspection Level II"
            tone="blue"
          />
          <Metric
            label="Supported AQL"
            value="2.5"
            detail="Other columns contain lookup arrows"
          />
          <Metric
            label="Largest supplied lot"
            value="500"
            detail="No extrapolation beyond the excerpt"
          />
        </dl>
        <Panel
          title="Inspect the supplied matrix"
          action={
            <span className={css.panelNote}>
              Select a row to load its example
            </span>
          }
        >
          <div id="sampling-matrix" className={css.tableScroll}>
            <table className={css.dataTable}>
              <caption className="sr-only">
                Supplied General II AQL 2.5 plan excerpt. Select a lot interval
                to load its maximum quantity.
              </caption>
              <thead>
                <tr>
                  {[
                    "Lot interval",
                    "Code",
                    "Sample",
                    "Accept",
                    "Reject",
                    "Use example",
                  ].map((label) => (
                    <th key={label} scope="col">
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {suppliedAqlPlans.map((plan) => (
                  <tr
                    key={plan.code}
                    data-selected={lookup.plan?.code === plan.code}
                  >
                    <th scope="row">
                      {plan.min}–{plan.max}
                    </th>
                    <td>
                      <span className={css.recordCode}>{plan.code}</span>
                    </td>
                    <td>{plan.sample}</td>
                    <td>
                      <Tag tone="green">{plan.accept}</Tag>
                    </td>
                    <td>
                      <Tag tone="red">{plan.reject}</Tag>
                    </td>
                    <td>
                      <Button
                        onClick={() => selectRow(plan.max)}
                        aria-label={`Load lot ${plan.max}, sample ${plan.sample}, accept ${plan.accept}, reject ${plan.reject}`}
                      >
                        Load {plan.max}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={css.panelNote}>
            The screenshot&apos;s default lot of 1,000 is outside the fully
            visible numeric excerpt. This demo starts at 500 so its result can
            be traced to the supplied row.
          </p>
        </Panel>
      </div>
    </Workspace>
  );
}
