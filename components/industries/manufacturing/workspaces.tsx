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
  const [index, setIndex] = useState(0);
  const p = pages[slug],
    stage = p.stages[index];
  return (
    <section className={css.processSection}>
      <div className={css.wrap}>
        <div className={css.sectionHeading}>
          <div>
            <p className={css.eyebrow}>A PROCESS WITH CONTEXT</p>
            <h2>{p.story}</h2>
          </div>
        </div>
        <div
          className={css.stageButtons}
          role="group"
          aria-label="Choose a process stage"
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
    error = e instanceof Error ? e.message : "Use valid example weights.";
  }
  return (
    <>
      <div className={css.toolbar}>
        <Badge>Illustrative weighment · kg, rounded to 0.001</Badge>
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
          Reset example
        </button>
      </div>
      <div className={css.steelWorkspace}>
        <div>
          <div className={css.weighmentFields}>
            <WeightInput
              label="Gross weighment · kg"
              value={gross}
              onChange={setGross}
            />
            <span>−</span>
            <WeightInput
              label="Tare weighment · kg"
              value={tare}
              onChange={setTare}
            />
          </div>
          <div className={css.netResult}>
            <span>Calculated net weight</span>
            <strong>{result ? kg(result.net) : "—"}</strong>
          </div>
          <div className={css.allocationFields}>
            <WeightInput
              label="EX-ORDER-A · allocated kg"
              value={first}
              onChange={setFirst}
            />
            <WeightInput
              label="EX-ORDER-B · allocated kg"
              value={second}
              onChange={setSecond}
            />
          </div>
          <Note>
            No dimensions, grade, thickness or physical cutting rules are
            inferred. These are two example order weights, not a cutting plan.
          </Note>
        </div>
        <section
          className={css.allocationPanel}
          aria-label="Local allocation result"
        >
          <span>THE WEIGHT CONVERSATION</span>
          <h3>Know what the example leaves unallocated.</h3>
          <dl className={css.metrics}>
            <Metric
              label="Example allocated weight"
              value={result ? kg(result.allocated) : "—"}
            />
            <Metric
              label={
                result && result.remaining < 0
                  ? "Example allocation shortfall"
                  : "Example unallocated weight"
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
                ? "Enter the weights to compare."
                : result.remaining < 0
                  ? "The example allocations exceed the calculated net weight."
                  : "The entered allocations fit within the example net weight. No stock has been reserved.")}
          </p>
          <Note>
            The result does not create a scale ticket, stock reservation,
            production order or dispatch record.
          </Note>
        </section>
      </div>
    </>
  );
}
function RiceWorkspace() {
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
    error = e instanceof Error ? e.message : "Use valid example weights.";
  }
  return (
    <>
      <div className={css.toolbar}>
        <Badge>Illustrative lot · no standard recovery assumed</Badge>
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
          Reset example
        </button>
      </div>
      <div className={css.riceWorkspace}>
        <div>
          <div className={css.paddyInput}>
            <WeightInput
              label="Example net paddy input · kg"
              value={input}
              onChange={setInput}
            />
            <span>EX-PADDY-01 / LOCAL INPUT</span>
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
            Weights are rounded to 0.001 kg for the arithmetic. The example does
            not correct moisture, classify quality or determine an acceptable
            milling yield.
          </Note>
        </div>
        <section className={css.massPanel} aria-label="Local mass balance">
          <span>INPUT → RECORDED OUTPUTS</span>
          <h3>Keep the arithmetic visible.</h3>
          <dl className={css.metrics}>
            <Metric
              label="Recorded outputs"
              value={result ? kg(result.recorded) : "—"}
            />
            <Metric
              label={
                result && result.unassigned < 0
                  ? "Outputs above input"
                  : "Unassigned input weight"
              }
              value={result ? kg(Math.abs(result.unassigned)) : "—"}
            />
            <Metric
              label="Head-rice fraction · example"
              value={result ? `${result.headRicePercent.toFixed(2)}%` : "—"}
            />
            <Metric
              label="Head + broken fraction · example"
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
                ? "Recorded output weights exceed the entered paddy input."
                : "Unassigned weight is an arithmetic gap. It is not automatically classified as process loss.")}
          </p>
          <Note>
            These fractions belong only to the entered example, not a benchmark
            or a quality decision. No production output or inventory is posted.
          </Note>
        </section>
      </div>
    </>
  );
}
export default function IndustryWorkspace({ slug }: { slug: IndustrySlug }) {
  const p = pages[slug];
  return (
    <section className={css.workspaceSection} id="industry-workspace">
      <div className={css.wrap}>
        <div className={css.sectionHeading}>
          <div>
            <p className={css.eyebrow}>EXPLORE THE QUANTITY CONVERSATION</p>
            <h2>{p.demoTitle}</h2>
            <p>{p.demoDescription}</p>
          </div>
          <Badge>Local example · not connected</Badge>
        </div>
        <div className={css.workspace}>
          {slug === "steel" ? <SteelWorkspace /> : <RiceWorkspace />}
        </div>
      </div>
    </section>
  );
}
