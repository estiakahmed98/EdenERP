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
import { useTranslations } from "next-intl";
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
  const t = useTranslations("pages.industriesApp");
  return (
    <button type="button" className={base.reset} onClick={onClick}>
      <RotateCcw size={13} aria-hidden="true" />
      {t("industrial.workspaces.resetExample")}
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
  const t = useTranslations("pages.industriesApp");
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
        : t("industrial.workspaces.useValidExampleLengthsAndLoss");
  }
  return (
    <>
      <div className={base.toolbar}>
        <Badge>{t("industrial.workspaces.exTx01FictionalLengthAssumptions")}</Badge>
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
            label={t("industrial.workspaces.incomingExampleLengthMetres")}
            raw={incoming}
            onChange={setIncoming}
            min={0.001}
            step="0.001"
          />
          <div className={css.lossFields}>
            {textileStages(t).map((stage, i) => (
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
            {t("industrial.workspaces.eachPercentageIsAppliedSequentiallyLengt")}
          </Note>
        </div>
        <section
          className={css.lengthTimeline}
          aria-label={t("industrial.workspaces.localSequentialFabricLengthCalculation")}
        >
          <span>{t("industrial.workspaces.oneUnitThroughTheProcess")}</span>
          <h3>{t("industrial.workspaces.followTheRemainingLength")}</h3>
          <ol>
            {textileStages(t).map((stage, i) => (
              <li key={stage}>
                <span>0{i + 1}</span>
                <div>
                  <h4>{stage}</h4>
                  <b>{result ? `${num(result.stages[i].after, 3)} m` : "—"}</b>
                  <small>
                    {result
                      ? `${num(result.stages[i].loss, 3)} m removed from ${num(result.stages[i].before, 3)} m`
                      : t("industrial.workspaces.checkTheEnteredExample")}
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
          label={t("industrial.workspaces.enteredIncomingLengthM")}
          value={result ? num(result.incoming, 3) : "—"}
        />
        <Metric
          label={t("industrial.workspaces.calculatedFinalLengthM")}
          value={result ? num(result.finished, 3) : "—"}
        />
        <Metric
          label={t("industrial.workspaces.exampleRetainedLengthShare")}
          value={result ? `${result.retainedPercent.toFixed(2)}%` : "—"}
        />
      </dl>
      <Note>
        {t("industrial.workspaces.noYarnConversionProcessRecommendationPro")}
      </Note>
    </>
  );
}
function MetalWorkspace() {
  const t = useTranslations("pages.industriesApp");
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
      e instanceof Error ? e.message : t("industrial.workspaces.useValidWholeMillimetreInputs");
  }
  const inputs: [keyof typeof fields, string, number, number][] = [
    ["stock", t("industrial.workspaces.exampleStockLengthMm"), 1, 1000000],
    ["piece", t("industrial.workspaces.requestedPieceLengthMm"), 1, 1000000],
    ["allowance", t("industrial.workspaces.enteredAllowancePieceMm"), 0, 1000],
    ["quantity", t("industrial.workspaces.requestedExamplePieces"), 1, 10000],
  ];
  return (
    <>
      <div className={base.toolbar}>
        <Badge>{t("industrial.workspaces.exCut01OneDimensionalExample")}</Badge>
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
          label={t("industrial.workspaces.piecesFullPatternBar")}
          value={result ? num(result.perBar) : "—"}
        />
        <Metric
          label={t("industrial.workspaces.calculatedStockBars")}
          value={result ? num(result.bars) : "—"}
        />
        <Metric
          label={t("industrial.workspaces.remainingLengthAllBarsMm")}
          value={result ? num(result.remaining) : "—"}
        />
      </dl>
      <div className={css.patterns}>
        {result?.patterns.map((pattern, i) => (
          <section key={i} aria-label={t("industrial.workspaces.groupedCuttingPattern", { v1: String(i + 1) })}>
            <header>
              <span>{t("industrial.workspaces.pattern0")}{i + 1}</span>
              <b>
                {num(pattern.bars)}{" "}{t("industrial.workspaces.bar")}{pattern.bars === 1 ? "" : "s"} ×{" "}
                {num(pattern.pieces)}{" "}{t("industrial.workspaces.pieces")}
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
              <span>{num(pattern.used)}{" "}{t("industrial.workspaces.mmConsumedBar")}</span>
              <span>{num(pattern.remaining)}{" "}{t("industrial.workspaces.mmRemainsBar")}</span>
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
        {t("industrial.workspaces.allowanceIsConsumedForEveryPiece")}
      </Note>
    </>
  );
}
function FurnitureWorkspace() {
  const t = useTranslations("pages.industriesApp");
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
      e instanceof Error ? e.message : t("industrial.workspaces.useValidWholeComponentCounts");
  }
  function update(i: number, key: "perUnit" | "stock", raw: string) {
    setEntries((prev) =>
      prev.map((row, j) => (i === j ? { ...row, [key]: raw } : row)),
    );
  }
  return (
    <>
      <div className={base.toolbar}>
        <Badge>{t("industrial.workspaces.exFurn01ThreeFictionalComponentLines")}</Badge>
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
          label={t("industrial.workspaces.enteredExampleOrderChairs")}
          raw={quantity}
          onChange={setQuantity}
          min={1}
          max={10000}
        />
        <Note>
          {t("industrial.workspaces.eachLineIsASeparatelyIdentified")}
        </Note>
      </div>
      <div
        className={base.tableScroll}
        role="region"
        tabIndex={0}
        aria-label={t("industrial.workspaces.editableFictionalFurnitureComponentsScro")}
      >
        <table>
          <caption className={base.srOnly}>
            {t("industrial.workspaces.wholePieceComponentRequirementsAndStock")}
          </caption>
          <thead>
            <tr>
              {[
                t("industrial.workspaces.fictionalComponent"),
                t("industrial.workspaces.piecesChair"),
                t("industrial.workspaces.exampleStockPcs"),
                t("industrial.workspaces.requiredPcs"),
                t("industrial.workspaces.shortPcs"),
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
                      {row.name}{" "}{t("industrial.workspaces.piecesPerChair")}
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
                      {row.name}{" "}{t("industrial.workspaces.exampleStock")}
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
          label={t("industrial.workspaces.componentOnlyKitEquivalentsInStock")}
          value={result ? num(result.available) : "—"}
        />
        <Metric
          label={t("industrial.workspaces.requestedKitsCoveredByComponents")}
          value={result ? num(result.covered) : "—"}
        />
        <Metric
          label={t("industrial.workspaces.requestedKitShortfall")}
          value={result ? num(result.short) : "—"}
        />
      </dl>
      <Outcome error={error}>
        {result
          ? result.short > 0
            ? t("industrial.workspaces.theEnteredComponentsLeaveOfThe", { num: String(num(result.short)) })
            : t("industrial.workspaces.theEnteredComponentsCoverTheRequested")
          : ""}
      </Outcome>
      <Note>
        {t("industrial.workspaces.componentCoverageDoesNotIncludeLabour")}
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
  const t = useTranslations("pages.industriesApp");
  const Workspace = workspaces[slug],
    p = pages(t)[slug];
  return (
    <section className={base.workspaceSection} id="professional-workspace">
      <div className={base.wrap}>
        <div className={base.sectionHeading}>
          <p className={base.eyebrow}>{t("industrial.workspaces.exploreASmallPartOfThe")}</p>
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
  const t = useTranslations("pages.industriesApp");
  const [index, setIndex] = useState(0);
  return (
    <section className={base.workflowSection}>
      <div className={base.wrap}>
        <div className={base.sectionHeading}>
          <p className={base.eyebrow}>{t("industrial.workspaces.theWorkInContext")}</p>
          <h2>{t("industrial.workspaces.keepTheNextManufacturingHandoffClear")}</h2>
        </div>
        <div
          className={base.workflowChoices}
          role="group"
          aria-label={t("industrial.workspaces.chooseAManufacturingPerspective")}
        >
          {pages(t)[slug].steps.map(([title], i) => (
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
          {pages(t)[slug].steps[index][1]}
        </p>
      </div>
    </section>
  );
}
