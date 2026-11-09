"use client";
import { enumLabel, qualityError } from "./labels";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("pages.qualityApp");

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
      title={t("copy.aSamplePlanYouCanInspect")}
      description={t("copy.tryTheSuppliedNumericPlanExcerptAql2")}
      actions={
        <Button onClick={reset}>
          <RotateCcw size={14} aria-hidden="true" />
          {t("copy.loadSuppliedExample")}
        </Button>
      }
    >
      <div className={css.workspaceBody}>
        <div className={css.samplingScope}>
          <Calculator size={18} aria-hidden="true" />
          <span>{t("copy.planScopeSuppliedMatrixExcerpt")}</span>
          <Tag tone="blue">{t("copy.aql25GeneralIi")}</Tag>
          <span>{t("copy.normalSingleSampling")}</span>
        </div>
        <div className={css.aqlCalculatorGrid}>
          <Panel
            title={t("copy.defineTheInspectionBasis")}
            className={css.calculatorPanel}
          >
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setEvaluated(true);
              }}
            >
              <div className={css.formColumns}>
                <Field label={t("copy.lotSize")}>
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
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label={t("copy.inspectionLevel")}>
                  <select
                    value={level}
                    onChange={(event) => {
                      setLevel(event.target.value);
                      setEvaluated(false);
                    }}
                  >
                    <option value="I">{t("copy.generalI")}</option>
                    <option value="II">{t("copy.generalIi")}</option>
                    <option value="III">{t("copy.generalIii")}</option>
                  </select>
                </Field>
                <Field label={t("copy.defectiveUnitsFound")}>
                  <input
                    type="number"
                    min="0"
                    max={lookup.plan?.sample}
                    step="1"
                    value={defects}
                    placeholder={t("copy.enterAfterInspection")}
                    onChange={(event) => {
                      setDefects(event.target.value);
                      setEvaluated(false);
                    }}
                  />
                </Field>
              </div>
              <div className={css.formActions}>
                <span className={css.microHint}>
                  {t("copy.sampleCountsAreLookedUpNotEstimatedAs")}
                </span>
                <Button type="submit" variant="primary" disabled={!lookup.plan}>
                  {t("copy.evaluateFinding")}
                  <ArrowDownRight size={14} aria-hidden="true" />
                </Button>
              </div>
            </form>
          </Panel>
          <section
            className={css.samplingDecision}
            aria-label={t("copy.samplingPlanResult")}
            aria-live="polite"
          >
            <Provenance />
            <span className={css.eyebrow}>
              {lookup.plan
                ? t("dynamic.planCodeV0", { v0: lookup.plan.code })
                : t("copy.planUnavailable")}
            </span>
            <h3>
              {lookup.plan
                ? t("dynamic.v0UnitsToInspect", { v0: lookup.plan.sample })
                : t("copy.aConfiguredPlanIsNeeded")}
            </h3>
            {lookup.plan ? (
              <>
                <dl className={css.thresholdNumbers}>
                  <div>
                    <dt>{t("copy.acceptAtOrBelow")}</dt>
                    <dd>{lookup.plan.accept}</dd>
                  </div>
                  <div>
                    <dt>{t("copy.rejectAtOrAbove")}</dt>
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
                  {t("ui.sampledFrom", {
                    sample: lookup.plan.sample,
                    lot: Number(lot),
                  })}
                </p>
                {result?.error ? (
                  <p role="alert" className={css.formError}>
                    {t("ui.defectiveRange", { sample: lookup.plan.sample })}
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
                      <strong>
                        {t("ui.planDecision", {
                          decision: enumLabel(t, result.decision),
                        })}
                      </strong>
                      <span>
                        {t("ui.defectsRecorded", { count: Number(defects) })}
                      </span>
                    </div>
                  </div>
                ) : (
                  <p className={css.waitingDecision}>
                    {t("copy.planReadyEnterTheInspectionFindingAndEvaluate")}
                  </p>
                )}
              </>
            ) : (
              <p className={css.formError}>{qualityError(t, lookup.error)}</p>
            )}
          </section>
        </div>
        <dl className={css.metricsFour}>
          <Metric
            label={t("copy.supportedNumericRows")}
            value="8"
            detail={t("copy.fullyVisibleSuppliedExcerpt")}
          />
          <Metric
            label={t("copy.inspectionBasis")}
            value="II"
            detail={t("copy.generalInspectionLevelIi")}
            tone="blue"
          />
          <Metric
            label={t("copy.supportedAql")}
            value="2.5"
            detail={t("copy.otherColumnsContainLookupArrows")}
          />
          <Metric
            label={t("copy.largestSuppliedLot")}
            value="500"
            detail={t("copy.noExtrapolationBeyondTheExcerpt")}
          />
        </dl>
        <Panel
          title={t("copy.inspectTheSuppliedMatrix")}
          action={
            <span className={css.panelNote}>
              {t("copy.selectARowToLoadItsExample")}
            </span>
          }
        >
          <div id="sampling-matrix" className={css.tableScroll}>
            <table className={css.dataTable}>
              <caption className="sr-only">
                {t("copy.suppliedGeneralIiAql25PlanExcerpt")}
              </caption>
              <thead>
                <tr>
                  {[
                    t("copy.lotInterval"),
                    t("copy.code"),
                    t("copy.sample"),
                    t("copy.accept"),
                    t("copy.reject"),
                    t("copy.useExample"),
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
                        aria-label={t(
                          "dynamic.loadLotV0SampleV1AcceptV2Reject",
                          {
                            v0: plan.max,
                            v1: plan.sample,
                            v2: plan.accept,
                            v3: plan.reject,
                          },
                        )}
                      >
                        {t("ui.loadLot", { max: plan.max })}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={css.panelNote}>
            {t("copy.theScreenshotsDefaultLotOf1000Is")}
          </p>
        </Panel>
      </div>
    </Workspace>
  );
}
