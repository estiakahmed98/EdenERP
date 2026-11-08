"use client";
import { useState } from "react";
import { ArrowRight, RotateCcw } from "lucide-react";
import {
  milestoneDates,
  settlementScenario,
  sizeBreakdown,
  trimRequirements,
} from "./calculations";
import {
  dateLabel,
  examplePcd,
  milestones,
  money,
  num,
  pages,
  sizes,
  trims,
  type ApparelSlug,
} from "./data";
import { Badge, Metric, Note, css } from "./ui";
import { useTranslations } from "next-intl";
function number(value: string) {
  if (value.trim() === "")
    throw new Error("Fill in each example value to calculate the result.");
  return Number(value);
}
function Numeric({
  label,
  value,
  onChange,
  min = 0,
  max = 1000000,
  step = "1",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  min?: number;
  max?: number;
  step?: string;
}) {
  return (
    <label className={css.field}>
      <span>{label}</span>
      <input
        type="number"
        inputMode={step === "1" ? "numeric" : "decimal"}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}
export function ApparelStory({ slug }: { slug: ApparelSlug }) {
  const t = useTranslations("pages.industriesApp");
  const [index, setIndex] = useState(0);
  const p = pages(t)[slug],
    stage = p.stages[index];
  return (
    <section className={css.storySection}>
      <div className={css.wrap}>
        <div className={css.sectionHeading}>
          <div>
            <p className={css.eyebrow}>{t("apparel.workspaces.theWorkflowInContext")}</p>
            <h2>{p.story}</h2>
          </div>
        </div>
        <div
          className={css.stageChoices}
          role="group"
          aria-label={t("apparel.workspaces.chooseAnOperationalPerspective")}
        >
          {p.stages.map((item, i) => (
            <button
              key={item.label}
              type="button"
              aria-pressed={i === index}
              onClick={() => setIndex(i)}
            >
              <span>0{i + 1}</span>
              {item.label}
              <ArrowRight size={15} aria-hidden="true" />
            </button>
          ))}
        </div>
        <div className={css.stageDetail} aria-live="polite">
          <div>
            <h3>{stage.title}</h3>
            <p>{stage.body}</p>
          </div>
          <ol>
            {stage.points.map((point, i) => (
              <li key={point}>
                <span>0{i + 1}</span>
                {point}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
function GarmentsDemo() {
  const t = useTranslations("pages.industriesApp");
  const [quantity, setQuantity] = useState("3000");
  const [ratios, setRatios] = useState(() =>
    sizes.map((row) => String(row.ratio)),
  );
  let result: number[] | null = null;
  let error = "";
  try {
    result = sizeBreakdown(number(quantity), ratios.map(number));
  } catch (e) {
    error = e instanceof Error ? e.message : t("apparel.workspaces.useValidExampleQuantities");
  }
  return (
    <>
      <div className={css.toolbar}>
        <Badge>{t("apparel.workspaces.exOrder01FictionalSizeBreakdown")}</Badge>
        <button
          type="button"
          className={css.button}
          onClick={() => {
            setQuantity("3000");
            setRatios(sizes.map((row) => String(row.ratio)));
          }}
        >
          <RotateCcw size={14} />
          {t("apparel.workspaces.resetBreakdown")}
        </button>
      </div>
      <div className={css.garmentsDemo}>
        <div>
          <Numeric
            label={t("apparel.workspaces.exampleOrderQuantityPieces")}
            value={quantity}
            onChange={setQuantity}
            min={1}
          />
          <div className={css.ratioFields}>
            {sizes.map((row, i) => (
              <Numeric
                key={row.label}
                label={`${row.label} · ratio units`}
                value={ratios[i]}
                max={1000}
                onChange={(value) =>
                  setRatios((prev) =>
                    prev.map((entry, index) => (index === i ? value : entry)),
                  )
                }
              />
            ))}
          </div>
          <Note>
            {t("apparel.workspaces.ratioUnitsAreWholeNonNegative")}
          </Note>
        </div>
        <section className={css.sizeResult} aria-label={t("apparel.workspaces.localSizeAllocation")}>
          <span>{t("apparel.workspaces.theOrderDividedIntoWholePieces")}</span>
          <h3>{t("apparel.workspaces.aBreakdownThatAddsUp")}</h3>
          <div className={css.sizeColumns}>
            {sizes.map((row, i) => (
              <div key={row.label}>
                <span>{row.label}</span>
                <strong>{result ? num(result[i]) : "—"}</strong>
                <small>{t("apparel.workspaces.examplePieces")}</small>
                <i
                  style={{
                    height: `${result ? Math.max(0, (result[i] / Math.max(1, ...result)) * 75) : 0}px`,
                  }}
                />
              </div>
            ))}
          </div>
          <div
            className={css.resultMessage}
            role="status"
            data-warning={!!error}
          >
            {error ||
              t("apparel.workspaces.allocatedOfExamplePieces", { num: String(num(result!.reduce((sum, value) => sum + value, 0))), num2: String(num(number(quantity))) })}
          </div>
          <Note>
            {t("apparel.workspaces.largestRemainderRoundingPreservesTheTota")}
          </Note>
        </section>
      </div>
    </>
  );
}
function AccessoriesDemo() {
  const t = useTranslations("pages.industriesApp");
  const [quantity, setQuantity] = useState("1000");
  const [allowance, setAllowance] = useState("2.5");
  const [entries, setEntries] = useState(() =>
    trims.map((row) => ({
      perPiece: String(row.perPiece),
      stock: String(row.stock),
    })),
  );
  let result: ReturnType<typeof trimRequirements> | null = null;
  let error = "";
  try {
    result = trimRequirements(
      number(quantity),
      number(allowance),
      entries.map((row) => ({
        perPiece: number(row.perPiece),
        stock: number(row.stock),
      })),
    );
  } catch (e) {
    error = e instanceof Error ? e.message : t("apparel.workspaces.useValidExampleCounts");
  }
  function update(index: number, key: "perPiece" | "stock", value: string) {
    setEntries((prev) =>
      prev.map((row, i) => (i === index ? { ...row, [key]: value } : row)),
    );
  }
  return (
    <>
      <div className={css.toolbar}>
        <Badge>{t("apparel.workspaces.fictionalTrimsAllCountsInPieces")}</Badge>
        <button
          className={css.button}
          type="button"
          onClick={() => {
            setQuantity("1000");
            setAllowance("2.5");
            setEntries(
              trims.map((row) => ({
                perPiece: String(row.perPiece),
                stock: String(row.stock),
              })),
            );
          }}
        >
          <RotateCcw size={14} />
          {t("apparel.workspaces.resetRequirement")}
        </button>
      </div>
      <div className={css.accessorySettings}>
        <Numeric
          label={t("apparel.workspaces.exampleOrderQuantityGarments")}
          value={quantity}
          onChange={setQuantity}
          min={1}
        />
        <Numeric
          label={t("apparel.workspaces.enteredExtraAllowance")}
          value={allowance}
          onChange={setAllowance}
          max={100}
          step="0.01"
        />
        <div className={css.gapMetric}>
          <span>{t("apparel.workspaces.exampleLinesWithAShortfall")}</span>
          <b>
            {result ? result.filter((row) => row.short > 0).length : "—"}
            <small> / 4</small>
          </b>
        </div>
      </div>
      <div
        className={css.tableScroll}
        role="region"
        tabIndex={0}
        aria-label={t("apparel.workspaces.editableTrimRequirementsScrollHorizontal")}
      >
        <table>
          <caption className={css.srOnly}>
            {t("apparel.workspaces.illustrativeAccessoryRequirementsInWhole")}
          </caption>
          <thead>
            <tr>
              {[
                t("apparel.workspaces.exampleItem"),
                t("apparel.workspaces.piecesGarment"),
                t("apparel.workspaces.exampleStockPcs"),
                t("apparel.workspaces.requiredPcs"),
                t("apparel.workspaces.shortPcs"),
                t("apparel.workspaces.sparePcs"),
              ].map((label) => (
                <th key={label} scope="col">
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {trims.map((row, i) => (
              <tr key={row.id}>
                <th scope="row">{row.name}</th>
                <td>
                  <label>
                    <span className={css.srOnly}>{row.name}{" "}{t("apparel.workspaces.perGarment")}</span>
                    <input
                      type="number"
                      inputMode="numeric"
                      min="0"
                      max="100"
                      step="1"
                      value={entries[i].perPiece}
                      onChange={(e) => update(i, "perPiece", e.target.value)}
                    />
                  </label>
                </td>
                <td>
                  <label>
                    <span className={css.srOnly}>{row.name}{" "}{t("apparel.workspaces.exampleStock")}</span>
                    <input
                      type="number"
                      inputMode="numeric"
                      min="0"
                      max="100000000"
                      step="1"
                      value={entries[i].stock}
                      onChange={(e) => update(i, "stock", e.target.value)}
                    />
                  </label>
                </td>
                <td>{result ? num(result[i].required) : "—"}</td>
                <td className={css.shortCount}>
                  {result ? num(result[i].short) : "—"}
                </td>
                <td>{result ? num(result[i].surplus) : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {error && (
        <p className={css.resultMessage} data-warning="true" role="alert">
          {error}
        </p>
      )}
      <Note>
        {t("apparel.workspaces.requiredPiecesOrderQuantityEnteredCount")}
      </Note>
    </>
  );
}
function BuyingDemo() {
  const t = useTranslations("pages.industriesApp");
  const [mode, setMode] = useState<"margin" | "commission">("margin");
  const [quantity, setQuantity] = useState("10000");
  const [selling, setSelling] = useState("8.50");
  const [buying, setBuying] = useState("7.20");
  const [fee, setFee] = useState("0.35");
  let result: ReturnType<typeof settlementScenario> | null = null;
  let error = "";
  try {
    result = settlementScenario(
      mode === "margin"
        ? {
            mode,
            quantity: number(quantity),
            selling: number(selling),
            buying: number(buying),
          }
        : { mode, quantity: number(quantity), fee: number(fee) }, t,
    );
  } catch (e) {
    error =
      e instanceof Error ? e.message : t("apparel.workspaces.useValidExamplePricesAndQuantity");
  }
  return (
    <>
      <div className={css.toolbar}>
        <Badge>{t("apparel.workspaces.illustrativeSettlementUsdOnly")}</Badge>
        <button
          className={css.button}
          type="button"
          onClick={() => {
            setMode("margin");
            setQuantity("10000");
            setSelling("8.50");
            setBuying("7.20");
            setFee("0.35");
          }}
        >
          <RotateCcw size={14} />
          {t("apparel.workspaces.resetCommercialExample")}
        </button>
      </div>
      <div
        className={css.settlementChoices}
        role="group"
        aria-label={t("apparel.workspaces.exampleSettlementModel")}
      >
        <button
          type="button"
          aria-pressed={mode === "margin"}
          onClick={() => setMode("margin")}
        >
          {t("apparel.workspaces.marginTrading")}
        </button>
        <button
          type="button"
          aria-pressed={mode === "commission"}
          onClick={() => setMode("commission")}
        >
          {t("apparel.workspaces.commissionFee")}
        </button>
      </div>
      <div className={css.buyingDemo}>
        <div>
          <Numeric
            label={t("apparel.workspaces.exampleQuantityPieces")}
            value={quantity}
            onChange={setQuantity}
            min={1}
          />
          <div className={css.commercialFields}>
            {mode === "margin" ? (
              <>
                <Numeric
                  label={t("apparel.workspaces.enteredSellingPricePcUsd")}
                  value={selling}
                  onChange={setSelling}
                  step="0.01"
                />
                <Numeric
                  label={t("apparel.workspaces.enteredPurchaseCostPcUsd")}
                  value={buying}
                  onChange={setBuying}
                  step="0.01"
                />
              </>
            ) : (
              <Numeric
                label={t("apparel.workspaces.enteredCommissionFeePcUsd")}
                value={fee}
                onChange={setFee}
                step="0.01"
              />
            )}
          </div>
          <Note>
            {t("apparel.workspaces.pricesFeesAreRoundedToCents")}
          </Note>
        </div>
        <section
          className={css.commercialResult}
          aria-label={t("apparel.workspaces.localCommercialModelResult")}
        >
          <span>
            {mode === "margin"
              ? t("apparel.workspaces.theTradingConversation")
              : t("apparel.workspaces.theFeeConversation")}
          </span>
          <h3>
            {mode === "margin"
              ? t("apparel.workspaces.keepSalesAndPurchaseCostTogether")
              : t("apparel.workspaces.aFeeIsItsOwnCommercial")}
          </h3>
          <dl className={css.metrics}>
            <Metric
              label={
                mode === "margin"
                  ? t("apparel.workspaces.exampleSellingValue")
                  : t("apparel.workspaces.exampleGrossCommissionFees")
              }
              value={result ? money(result.revenue) : "—"}
            />
            <Metric
              label={
                mode === "margin" ? t("apparel.workspaces.examplePurchaseCost") : t("apparel.workspaces.operatingCosts")
              }
              value={
                result
                  ? result.cost === null
                    ? "Not supplied"
                    : money(result.cost)
                  : "—"
              }
            />
            <Metric
              label={
                mode === "margin"
                  ? t("apparel.workspaces.differenceBeforeOtherCosts")
                  : t("apparel.workspaces.netResult")
              }
              value={
                result
                  ? result.contribution === null
                    ? "Not calculated"
                    : money(result.contribution)
                  : "—"
              }
            />
            <Metric
              label={
                mode === "margin" ? t("apparel.workspaces.differenceSellingValue") : t("apparel.workspaces.netMargin")
              }
              value={
                result
                  ? result.margin === null
                    ? "Not calculated"
                    : `${result.margin.toFixed(2)}%`
                  : "—"
              }
            />
          </dl>
          <p className={css.resultMessage} role="status" data-warning={!!error}>
            {error ||
              (mode === "margin"
                ? t("apparel.workspaces.theTradingDifferenceExcludesOtherBusines")
                : t("apparel.workspaces.commissionModeCalculatesFeesOnlyUnknown"))}
          </p>
        </section>
      </div>
    </>
  );
}
function MerchandisingDemo() {
  const t = useTranslations("pages.industriesApp");
  const [pcd, setPcd] = useState(examplePcd);
  const [offsets, setOffsets] = useState(() =>
    milestones.map((row) => String(row.days)),
  );
  let result: string[] | null = null;
  let error = "";
  try {
    result = milestoneDates(pcd, offsets.map(number));
  } catch (e) {
    error =
      e instanceof Error ? e.message : t("apparel.workspaces.useValidExampleDatesAndOffsets");
  }
  return (
    <>
      <div className={css.toolbar}>
        <Badge>{t("apparel.workspaces.fictionalCalendarDayPlanningExercise")}</Badge>
        <button
          type="button"
          className={css.button}
          onClick={() => {
            setPcd(examplePcd);
            setOffsets(milestones.map((row) => String(row.days)));
          }}
        >
          <RotateCcw size={14} />
          {t("apparel.workspaces.resetDates")}
        </button>
      </div>
      <div className={css.dateDemo}>
        <div className={css.dateInputs}>
          <label className={css.field}>
            <span>{t("apparel.workspaces.examplePlannedCuttingDate")}</span>
            <input
              type="date"
              min="2000-01-01"
              max="2100-12-31"
              value={pcd}
              onChange={(e) => setPcd(e.target.value)}
            />
          </label>
          <div className={css.offsetInputs}>
            {milestones.map((row, i) => (
              <Numeric
                key={row.id}
                label={`${row.name} · days before PCD`}
                value={offsets[i]}
                max={365}
                onChange={(value) =>
                  setOffsets((prev) =>
                    prev.map((entry, index) => (index === i ? value : entry)),
                  )
                }
              />
            ))}
          </div>
          <Note>
            {t("apparel.workspaces.offsetsAreWholeCalendarDaysFrom")}
          </Note>
        </div>
        <section
          className={css.dateResults}
          aria-label={t("apparel.workspaces.localMilestoneDateResults")}
        >
          <span>{t("apparel.workspaces.workBackFromTheExamplePcd")}</span>
          <h3>{t("apparel.workspaces.aDateConversationWithTheAssumptions")}</h3>
          <ol>
            {milestones.map((row, i) => (
              <li key={row.id}>
                <span>0{i + 1}</span>
                <div>
                  <b>{row.name}</b>
                  <small>
                    {result
                      ? `${offsets[i]} calendar days before PCD`
                      : t("apparel.workspaces.checkTheEnteredExample")}
                  </small>
                </div>
                <strong>{result ? dateLabel(result[i]) : "—"}</strong>
              </li>
            ))}
          </ol>
          <p className={css.resultMessage} role="status" data-warning={!!error}>
            {error ||
              t("apparel.workspaces.theseDatesUpdateOnlyThisExample")}
          </p>
        </section>
      </div>
    </>
  );
}
const demos = {
  garments: GarmentsDemo,
  accessories: AccessoriesDemo,
  "buying-house": BuyingDemo,
  merchandising: MerchandisingDemo,
};
export default function ApparelDemo({ slug }: { slug: ApparelSlug }) {
  const t = useTranslations("pages.industriesApp");
  const p = pages(t)[slug];
  const Demo = demos[slug];
  return (
    <section className={css.demoSection} id="industry-demo">
      <div className={css.wrap}>
        <div className={css.sectionHeading}>
          <div>
            <p className={css.eyebrow}>{t("apparel.workspaces.exploreASmallPartOfThe")}</p>
            <h2>{p.demoTitle}</h2>
            <p>{p.demoDescription}</p>
          </div>
          <Badge>{t("apparel.workspaces.localExampleNotConnected")}</Badge>
        </div>
        <div className={css.demoSurface}>
          <Demo />
        </div>
      </div>
    </section>
  );
}
