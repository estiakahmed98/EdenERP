"use client";
import { useState } from "react";
import { ArrowRight, RotateCcw } from "lucide-react";
import { barPattern, componentKits, fabricLength } from "./calculations";
import {
  components,
  defaultLosses,
  num,
  pages,
  textileStages,
  type IndustrialSlug,
} from "./data";
import { Badge, Metric, Note, base, css } from "./ui";
function number(raw: string) {
  if (raw.trim() === "")
    throw new Error("Fill in each example value to calculate the result.");
  return Number(raw);
}
function Numeric({
  label,
  raw,
  onChange,
  min = 0,
  max = 1000000,
  step = "1",
}: {
  label: string;
  raw: string;
  onChange: (value: string) => void;
  min?: number;
  max?: number;
  step?: string;
}) {
  return (
    <label className={base.field}>
      <span>{label}</span>
      <input
        type="number"
        inputMode={step === "1" ? "numeric" : "decimal"}
        min={min}
        max={max}
        step={step}
        value={raw}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}
function Reset({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" className={base.reset} onClick={onClick}>
      <RotateCcw size={13} aria-hidden="true" />
      Reset example
    </button>
  );
}
function Outcome({ error, children }: { error: string; children: string }) {
  return (
    <p className={base.outcome} role="status" data-error={!!error}>
      {error || children}
    </p>
  );
}
function TextileWorkspace() {
  const [incoming, setIncoming] = useState("1000"),
    [losses, setLosses] = useState(() => defaultLosses.map(String));
  let result: ReturnType<typeof fabricLength> | null = null,
    error = "";
  try {
    result = fabricLength(number(incoming), losses.map(number));
  } catch (e) {
    error =
      e instanceof Error
        ? e.message
        : "Use valid example lengths and loss percentages.";
  }
  return (
    <>
      <div className={base.toolbar}>
        <Badge>EX-TX01 · fictional length assumptions</Badge>
        <Reset
          onClick={() => {
            setIncoming("1000");
            setLosses(defaultLosses.map(String));
          }}
        />
      </div>
      <div className={css.textileWorkspace}>
        <div>
          <Numeric
            label="Incoming example length · metres"
            raw={incoming}
            onChange={setIncoming}
            min={0.001}
            step="0.001"
          />
          <div className={css.lossFields}>
            {textileStages.map((stage, i) => (
              <Numeric
                key={stage}
                label={`${stage} · entered loss %`}
                raw={losses[i]}
                max={100}
                step="0.01"
                onChange={(raw) =>
                  setLosses((prev) => prev.map((v, j) => (i === j ? raw : v)))
                }
              />
            ))}
          </div>
          <Note>
            Each percentage is applied sequentially. Length is rounded to
            millimetres after each stage; percentages are rounded to two
            decimals.
          </Note>
        </div>
        <section
          className={css.lengthTimeline}
          aria-label="Local sequential fabric-length calculation"
        >
          <span>ONE UNIT, THROUGH THE PROCESS</span>
          <h3>Follow the remaining length.</h3>
          <ol>
            {textileStages.map((stage, i) => (
              <li key={stage}>
                <span>0{i + 1}</span>
                <div>
                  <h4>{stage}</h4>
                  <b>{result ? `${num(result.stages[i].after, 3)} m` : "—"}</b>
                  <small>
                    {result
                      ? `${num(result.stages[i].loss, 3)} m removed from ${num(result.stages[i].before, 3)} m`
                      : "Check the entered example"}
                  </small>
                  <div
                    className={css.lengthTrack}
                    role="img"
                    aria-label={
                      result
                        ? `${stage}: ${((result.stages[i].after / result.incoming) * 100).toFixed(2)}% of incoming example length remains`
                        : `${stage}: check inputs`
                    }
                  >
                    <i
                      style={{
                        width: `${result ? (result.stages[i].after / result.incoming) * 100 : 0}%`,
                      }}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ol>
          <Outcome error={error}>
            {result
              ? `${num(result.finished, 3)} m remains; ${num(result.lost, 3)} m is removed in this arithmetic example.`
              : ""}
          </Outcome>
        </section>
      </div>
      <dl className={base.threeMetrics}>
        <Metric
          label="Entered incoming length · m"
          value={result ? num(result.incoming, 3) : "—"}
        />
        <Metric
          label="Calculated final length · m"
          value={result ? num(result.finished, 3) : "—"}
        />
        <Metric
          label="Example retained-length share"
          value={result ? `${result.retainedPercent.toFixed(2)}%` : "—"}
        />
      </dl>
      <Note>
        No yarn conversion, process recommendation, production forecast or saved
        lot record is created.
      </Note>
    </>
  );
}
function MetalWorkspace() {
  const [fields, setFields] = useState({
    stock: "6000",
    piece: "1200",
    allowance: "3",
    quantity: "12",
  });
  let result: ReturnType<typeof barPattern> | null = null,
    error = "";
  try {
    result = barPattern(
      number(fields.stock),
      number(fields.piece),
      number(fields.allowance),
      number(fields.quantity),
    );
  } catch (e) {
    error =
      e instanceof Error ? e.message : "Use valid whole-millimetre inputs.";
  }
  const inputs: [keyof typeof fields, string, number, number][] = [
    ["stock", "Example stock length · mm", 1, 1000000],
    ["piece", "Requested piece length · mm", 1, 1000000],
    ["allowance", "Entered allowance / piece · mm", 0, 1000],
    ["quantity", "Requested example pieces", 1, 10000],
  ];
  return (
    <>
      <div className={base.toolbar}>
        <Badge>EX-CUT01 · one-dimensional example</Badge>
        <Reset
          onClick={() =>
            setFields({
              stock: "6000",
              piece: "1200",
              allowance: "3",
              quantity: "12",
            })
          }
        />
      </div>
      <div className={css.cutInputs}>
        {inputs.map(([key, label, min, max]) => (
          <Numeric
            key={key}
            label={label}
            raw={fields[key]}
            min={min}
            max={max}
            onChange={(raw) => setFields((prev) => ({ ...prev, [key]: raw }))}
          />
        ))}
      </div>
      <dl className={base.threeMetrics}>
        <Metric
          label="Pieces / full-pattern bar"
          value={result ? num(result.perBar) : "—"}
        />
        <Metric
          label="Calculated stock bars"
          value={result ? num(result.bars) : "—"}
        />
        <Metric
          label="Remaining length / all bars · mm"
          value={result ? num(result.remaining) : "—"}
        />
      </dl>
      <div className={css.patterns}>
        {result?.patterns.map((pattern, i) => (
          <section key={i} aria-label={`Grouped cutting pattern ${i + 1}`}>
            <header>
              <span>PATTERN 0{i + 1}</span>
              <b>
                {num(pattern.bars)} bar{pattern.bars === 1 ? "" : "s"} ×{" "}
                {num(pattern.pieces)} pieces
              </b>
            </header>
            <div
              className={css.cutBar}
              role="img"
              aria-label={`${pattern.used} millimetres consumed and ${pattern.remaining} millimetres remaining per bar`}
            >
              <i
                style={{
                  width: `${(pattern.used / number(fields.stock)) * 100}%`,
                }}
              />
              <span />
            </div>
            <div className={css.patternKey}>
              <span>{num(pattern.used)} mm consumed / bar</span>
              <span>{num(pattern.remaining)} mm remains / bar</span>
            </div>
          </section>
        ))}
      </div>
      <Outcome error={error}>
        {result
          ? `${num(result.pieceTotal)} mm in requested pieces + ${num(result.allowanceTotal)} mm entered allowance + ${num(result.remaining)} mm remainder = ${num(result.stockTotal)} mm stock.`
          : ""}
      </Outcome>
      <Note>
        Allowance is consumed for every piece, including final separation. End
        trim, material/tool constraints and offcut reuse are outside this
        exercise; no cutting plan is saved.
      </Note>
    </>
  );
}
function FurnitureWorkspace() {
  const [quantity, setQuantity] = useState("24"),
    [entries, setEntries] = useState(() =>
      components.map((row) => ({
        perUnit: String(row.perUnit),
        stock: String(row.stock),
      })),
    );
  let result: ReturnType<typeof componentKits> | null = null,
    error = "";
  try {
    result = componentKits(
      number(quantity),
      entries.map((row) => ({
        perUnit: number(row.perUnit),
        stock: number(row.stock),
      })),
    );
  } catch (e) {
    error =
      e instanceof Error ? e.message : "Use valid whole component counts.";
  }
  function update(i: number, key: "perUnit" | "stock", raw: string) {
    setEntries((prev) =>
      prev.map((row, j) => (i === j ? { ...row, [key]: raw } : row)),
    );
  }
  return (
    <>
      <div className={base.toolbar}>
        <Badge>EX-FURN01 · three fictional component lines</Badge>
        <Reset
          onClick={() => {
            setQuantity("24");
            setEntries(
              components.map((row) => ({
                perUnit: String(row.perUnit),
                stock: String(row.stock),
              })),
            );
          }}
        />
      </div>
      <div className={base.budgetSetting}>
        <Numeric
          label="Entered example order · chairs"
          raw={quantity}
          onChange={setQuantity}
          min={1}
          max={10000}
        />
        <Note>
          Each line is a separately identified component counted in whole
          pieces. Kit coverage considers these three lines only.
        </Note>
      </div>
      <div
        className={base.tableScroll}
        role="region"
        tabIndex={0}
        aria-label="Editable fictional furniture components, scroll horizontally"
      >
        <table>
          <caption className={base.srOnly}>
            Whole-piece component requirements and stock shortfalls for a
            fictional chair batch
          </caption>
          <thead>
            <tr>
              {[
                "Fictional component",
                "Pieces / chair",
                "Example stock · pcs",
                "Required · pcs",
                "Short · pcs",
              ].map((s) => (
                <th key={s} scope="col">
                  {s}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {components.map((row, i) => (
              <tr key={row.id}>
                <th scope="row">
                  {row.name}
                  <small className={css.itemId}>{row.id}</small>
                </th>
                <td>
                  <label>
                    <span className={base.srOnly}>
                      {row.name} pieces per chair
                    </span>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      step="1"
                      inputMode="numeric"
                      value={entries[i].perUnit}
                      onChange={(e) => update(i, "perUnit", e.target.value)}
                    />
                  </label>
                </td>
                <td>
                  <label>
                    <span className={base.srOnly}>
                      {row.name} example stock
                    </span>
                    <input
                      type="number"
                      min="0"
                      max="100000000"
                      step="1"
                      inputMode="numeric"
                      value={entries[i].stock}
                      onChange={(e) => update(i, "stock", e.target.value)}
                    />
                  </label>
                </td>
                <td>{result ? num(result.lines[i].required) : "—"}</td>
                <td>{result ? num(result.lines[i].short) : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <dl className={base.threeMetrics}>
        <Metric
          label="Component-only kit equivalents in stock"
          value={result ? num(result.available) : "—"}
        />
        <Metric
          label="Requested kits covered by components"
          value={result ? num(result.covered) : "—"}
        />
        <Metric
          label="Requested kit shortfall"
          value={result ? num(result.short) : "—"}
        />
      </dl>
      <Outcome error={error}>
        {result
          ? result.short > 0
            ? `The entered components leave ${num(result.short)} of the requested kits uncovered.`
            : "The entered components cover the requested kit count in this local example."
          : ""}
      </Outcome>
      <Note>
        Component coverage does not include labour, machines, other materials or
        quality. No finished-product availability, inventory reservation or
        production release is implied.
      </Note>
    </>
  );
}
const workspaces = {
  textile: TextileWorkspace,
  metal: MetalWorkspace,
  furniture: FurnitureWorkspace,
};
export default function IndustrialWorkspace({
  slug,
}: {
  slug: IndustrialSlug;
}) {
  const Workspace = workspaces[slug],
    p = pages[slug];
  return (
    <section className={base.workspaceSection} id="professional-workspace">
      <div className={base.wrap}>
        <div className={base.sectionHeading}>
          <p className={base.eyebrow}>EXPLORE A SMALL PART OF THE WORK</p>
          <h2>{p.demoTitle}</h2>
          <p>{p.demoDescription}</p>
        </div>
        <div className={base.workspaceSurface}>
          <Workspace />
        </div>
      </div>
    </section>
  );
}
export function IndustrialWorkflow({ slug }: { slug: IndustrialSlug }) {
  const [index, setIndex] = useState(0);
  return (
    <section className={base.workflowSection}>
      <div className={base.wrap}>
        <div className={base.sectionHeading}>
          <p className={base.eyebrow}>THE WORK, IN CONTEXT</p>
          <h2>Keep the next manufacturing handoff clear.</h2>
        </div>
        <div
          className={base.workflowChoices}
          role="group"
          aria-label="Choose a manufacturing perspective"
        >
          {pages[slug].steps.map(([title], i) => (
            <button
              key={title}
              type="button"
              aria-pressed={index === i}
              onClick={() => setIndex(i)}
            >
              <span>0{i + 1}</span>
              {title}
              <ArrowRight size={15} aria-hidden="true" />
            </button>
          ))}
        </div>
        <p className={base.workflowDetail} aria-live="polite">
          {pages[slug].steps[index][1]}
        </p>
      </div>
    </section>
  );
}
