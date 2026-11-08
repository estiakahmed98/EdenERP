"use client";
import { useState } from "react";
import { ArrowRight, RotateCcw } from "lucide-react";
import { riceMassBalance, steelWeight } from "./calculations";
import {
  kg,
  pages,
  riceExample,
  steelExample,
  type IndustrySlug,
} from "./data";
import { Badge, Metric, Note, css } from "./ui";
import { useTranslations } from "next-intl";
function WeightInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className={css.field}>
      <span>{label}</span>
      <input
        type="number"
        inputMode="decimal"
        min="0"
        max="100000000"
        step="0.001"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}
function numeric(value: string) {
  if (value.trim() === "")
    throw new Error("Fill in every example weight to compare the quantities.");
  return Number(value);
}
export function ProcessStory({ slug }: { slug: IndustrySlug }) {
  const t = useTranslations("pages.industriesApp");
  const [index, setIndex] = useState(0);
  const p = pages(t)[slug],
    stage = p.stages[index];
  return (
    <section className={css.processSection}>
      <div className={css.wrap}>
        <div className={css.sectionHeading}>
          <div>
            <p className={css.eyebrow}>{t("manufacturing.workspaces.aProcessWithContext")}</p>
            <h2>{p.story}</h2>
          </div>
        </div>
        <div
          className={css.stageButtons}
          role="group"
          aria-label={t("manufacturing.workspaces.chooseAProcessStage")}
        >
          {p.stages.map((item, i) => (
            <button
              key={item.label}
              type="button"
              aria-pressed={index === i}
              onClick={() => setIndex(i)}
            >
              <span>0{i + 1}</span>
              {item.label}
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          ))}
        </div>
        <div className={css.stageDetail} aria-live="polite">
          <div>
            <h3>{stage.title}</h3>
            <p>{stage.body}</p>
          </div>
          <dl>
            {stage.details.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
function SteelWorkspace() {
  const t = useTranslations("pages.industriesApp");
  const [gross, setGross] = useState(String(steelExample.gross));
  const [tare, setTare] = useState(String(steelExample.tare));
  const [first, setFirst] = useState(String(steelExample.orders[0].weight));
  const [second, setSecond] = useState(String(steelExample.orders[1].weight));
  let result: ReturnType<typeof steelWeight> | null = null;
  let error = "";
  try {
    result = steelWeight(numeric(gross), numeric(tare), [
      numeric(first),
      numeric(second),
    ]);
  } catch (e) {
    error = e instanceof Error ? e.message : t("manufacturing.workspaces.useValidExampleWeights");
  }
  return (
    <>
      <div className={css.toolbar}>
        <Badge>{t("manufacturing.workspaces.illustrativeWeighmentKgRoundedTo0")}</Badge>
        <button
          type="button"
          className={css.button}
          onClick={() => {
            setGross(String(steelExample.gross));
            setTare(String(steelExample.tare));
            setFirst(String(steelExample.orders[0].weight));
            setSecond(String(steelExample.orders[1].weight));
          }}
        >
          <RotateCcw size={14} />
          {t("manufacturing.workspaces.resetExample")}
        </button>
      </div>
      <div className={css.steelWorkspace}>
        <div>
          <div className={css.weighmentFields}>
            <WeightInput
              label={t("manufacturing.workspaces.grossWeighmentKg")}
              value={gross}
              onChange={setGross}
            />
            <span>−</span>
            <WeightInput
              label={t("manufacturing.workspaces.tareWeighmentKg")}
              value={tare}
              onChange={setTare}
            />
          </div>
          <div className={css.netResult}>
            <span>{t("manufacturing.workspaces.calculatedNetWeight")}</span>
            <strong>{result ? kg(result.net) : "—"}</strong>
          </div>
          <div className={css.allocationFields}>
            <WeightInput
              label={t("manufacturing.workspaces.exOrderAAllocatedKg")}
              value={first}
              onChange={setFirst}
            />
            <WeightInput
              label={t("manufacturing.workspaces.exOrderBAllocatedKg")}
              value={second}
              onChange={setSecond}
            />
          </div>
          <Note>
            {t("manufacturing.workspaces.noDimensionsGradeThicknessOrPhysical")}
          </Note>
        </div>
        <section
          className={css.allocationPanel}
          aria-label={t("manufacturing.workspaces.localAllocationResult")}
        >
          <span>{t("manufacturing.workspaces.theWeightConversation")}</span>
          <h3>{t("manufacturing.workspaces.knowWhatTheExampleLeavesUnallocated")}</h3>
          <dl className={css.metrics}>
            <Metric
              label={t("manufacturing.workspaces.exampleAllocatedWeight")}
              value={result ? kg(result.allocated) : "—"}
            />
            <Metric
              label={
                result && result.remaining < 0
                  ? t("manufacturing.workspaces.exampleAllocationShortfall")
                  : t("manufacturing.workspaces.exampleUnallocatedWeight")
              }
              value={result ? kg(Math.abs(result.remaining)) : "—"}
            />
          </dl>
          <div className={css.allocationTrack} aria-hidden="true">
            <i
              style={{
                width: `${result && result.net > 0 ? Math.min(100, (result.allocated / result.net) * 100) : 0}%`,
              }}
            />
          </div>
          <p
            className={css.feedback}
            role="status"
            data-warning={!!error || !!(result && result.remaining < 0)}
          >
            {error ||
              (!result
                ? t("manufacturing.workspaces.enterTheWeightsToCompare")
                : result.remaining < 0
                  ? t("manufacturing.workspaces.theExampleAllocationsExceedTheCalculated")
                  : t("manufacturing.workspaces.theEnteredAllocationsFitWithinThe"))}
          </p>
          <Note>
            {t("manufacturing.workspaces.theResultDoesNotCreateA")}
          </Note>
        </section>
      </div>
    </>
  );
}
function RiceWorkspace() {
  const t = useTranslations("pages.industriesApp");
  const [input, setInput] = useState(String(riceExample.input));
  const [outputs, setOutputs] = useState({
    headRice: String(riceExample.headRice),
    brokenRice: String(riceExample.brokenRice),
    bran: String(riceExample.bran),
    husk: String(riceExample.husk),
  });
  let result: ReturnType<typeof riceMassBalance> | null = null;
  let error = "";
  try {
    result = riceMassBalance(numeric(input), {
      headRice: numeric(outputs.headRice),
      brokenRice: numeric(outputs.brokenRice),
      bran: numeric(outputs.bran),
      husk: numeric(outputs.husk),
    });
  } catch (e) {
    error = e instanceof Error ? e.message : t("manufacturing.workspaces.useValidExampleWeights");
  }
  return (
    <>
      <div className={css.toolbar}>
        <Badge>{t("manufacturing.workspaces.illustrativeLotNoStandardRecoveryAssumed")}</Badge>
        <button
          className={css.button}
          type="button"
          onClick={() => {
            setInput(String(riceExample.input));
            setOutputs({
              headRice: String(riceExample.headRice),
              brokenRice: String(riceExample.brokenRice),
              bran: String(riceExample.bran),
              husk: String(riceExample.husk),
            });
          }}
        >
          <RotateCcw size={14} />
          {t("manufacturing.workspaces.resetExample")}
        </button>
      </div>
      <div className={css.riceWorkspace}>
        <div>
          <div className={css.paddyInput}>
            <WeightInput
              label={t("manufacturing.workspaces.exampleNetPaddyInputKg")}
              value={input}
              onChange={setInput}
            />
            <span>{t("manufacturing.workspaces.exPaddy01LocalInput")}</span>
          </div>
          <div className={css.outputFields}>
            {(
              [
                ["headRice", "Head rice"],
                ["brokenRice", "Broken rice"],
                ["bran", "Bran"],
                ["husk", "Husk"],
              ] as const
            ).map(([key, label], i) => (
              <div key={key}>
                <span>0{i + 1}</span>
                <WeightInput
                  label={`${label} · recorded kg`}
                  value={outputs[key]}
                  onChange={(value) =>
                    setOutputs((prev) => ({ ...prev, [key]: value }))
                  }
                />
              </div>
            ))}
          </div>
          <Note>
            {t("manufacturing.workspaces.weightsAreRoundedTo0001")}
          </Note>
        </div>
        <section className={css.massPanel} aria-label={t("manufacturing.workspaces.localMassBalance")}>
          <span>{t("manufacturing.workspaces.inputRecordedOutputs")}</span>
          <h3>{t("manufacturing.workspaces.keepTheArithmeticVisible")}</h3>
          <dl className={css.metrics}>
            <Metric
              label={t("manufacturing.workspaces.recordedOutputs")}
              value={result ? kg(result.recorded) : "—"}
            />
            <Metric
              label={
                result && result.unassigned < 0
                  ? t("manufacturing.workspaces.outputsAboveInput")
                  : t("manufacturing.workspaces.unassignedInputWeight")
              }
              value={result ? kg(Math.abs(result.unassigned)) : "—"}
            />
            <Metric
              label={t("manufacturing.workspaces.headRiceFractionExample")}
              value={result ? `${result.headRicePercent.toFixed(2)}%` : "—"}
            />
            <Metric
              label={t("manufacturing.workspaces.headBrokenFractionExample")}
              value={result ? `${result.ricePercent.toFixed(2)}%` : "—"}
            />
          </dl>
          <p
            className={css.feedback}
            data-warning={!!error || !!(result && result.unassigned < 0)}
            role="status"
          >
            {error ||
              (result && result.unassigned < 0
                ? t("manufacturing.workspaces.recordedOutputWeightsExceedTheEntered")
                : t("manufacturing.workspaces.unassignedWeightIsAnArithmeticGap"))}
          </p>
          <Note>
            {t("manufacturing.workspaces.theseFractionsBelongOnlyToThe")}
          </Note>
        </section>
      </div>
    </>
  );
}
export default function IndustryWorkspace({ slug }: { slug: IndustrySlug }) {
  const t = useTranslations("pages.industriesApp");
  const p = pages(t)[slug];
  return (
    <section className={css.workspaceSection} id="industry-workspace">
      <div className={css.wrap}>
        <div className={css.sectionHeading}>
          <div>
            <p className={css.eyebrow}>{t("manufacturing.workspaces.exploreTheQuantityConversation")}</p>
            <h2>{p.demoTitle}</h2>
            <p>{p.demoDescription}</p>
          </div>
          <Badge>{t("manufacturing.workspaces.localExampleNotConnected")}</Badge>
        </div>
        <div className={css.workspace}>
          {slug === "steel" ? <SteelWorkspace /> : <RiceWorkspace />}
        </div>
      </div>
    </section>
  );
}
