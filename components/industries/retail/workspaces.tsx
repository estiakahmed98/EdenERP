"use client";
import { useState } from "react";
import { ArrowRight, Minus, Plus, RotateCcw } from "lucide-react";
import {
  basketTotal,
  batchDates,
  furnitureTotal,
  giftBudget,
  purchasePacks,
  variantComparison,
} from "./calculations";
import {
  batches,
  books,
  clothingSizes,
  colours,
  dateLabel,
  finishes,
  furniture,
  money,
  num,
  pages,
  referenceDate,
  toys,
  variantStock,
  type RetailSlug,
} from "./data";
import { Badge, Metric, Note, ShirtArt, ToyArt, css } from "./ui";
import { useTranslations } from "next-intl";
import { memoT, type TFn } from "@/lib/i18n/t-types";
function value(raw: string) {
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
  onChange: (v: string) => void;
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
        value={raw}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}
function Reset({ onClick }: { onClick: () => void }) {
  const t = useTranslations("pages.industriesApp");
  return (
    <button type="button" className={css.reset} onClick={onClick}>
      <RotateCcw size={13} aria-hidden="true" />
      {t("retail.workspaces.resetExample")}
    </button>
  );
}
function Outcome({ error, children }: { error: string; children: string }) {
  return (
    <p className={css.outcome} role="status" data-error={!!error}>
      {error || children}
    </p>
  );
}
export function RetailStory({ slug }: { slug: RetailSlug }) {
  const t = useTranslations("pages.industriesApp");
  const [selected, setSelected] = useState(0),
    p = pages(t)[slug],
    stage = p.stages[selected];
  return (
    <section className={css.storySection}>
      <div className={css.wrap}>
        <div className={css.sectionHeading}>
          <p className={css.eyebrow}>{t("retail.workspaces.theStoreInContext")}</p>
          <h2>{p.story}</h2>
        </div>
        <div className={css.storyLayout}>
          <div
            className={css.storyChoices}
            role="group"
            aria-label={t("retail.workspaces.chooseARetailPerspective")}
          >
            {p.stages.map((row, i) => (
              <button
                key={row.label}
                type="button"
                aria-pressed={selected === i}
                onClick={() => setSelected(i)}
              >
                <span>0{i + 1}</span>
                {row.label}
                <ArrowRight size={16} aria-hidden="true" />
              </button>
            ))}
          </div>
          <div className={css.storyDetail} aria-live="polite">
            <h3>{stage.title}</h3>
            <p>{stage.body}</p>
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
      </div>
    </section>
  );
}
function BookWorkspace() {
  const t = useTranslations("pages.industriesApp");
  const [quantities, setQuantities] = useState([1, 0, 1]);
  const total = basketTotal(
    books(t).map((b, i) => ({ price: b.price, quantity: quantities[i] })),
  );
  const count = quantities.reduce((a, b) => a + b, 0);
  return (
    <>
      <div className={css.workspaceToolbar}>
        <Badge>{t("retail.workspaces.fictionalBookCatalogueBdt")}</Badge>
        <Reset onClick={() => setQuantities([1, 0, 1])} />
      </div>
      <div className={css.basketLayout}>
        <div className={css.bookChoices}>
          {books(t).map((book, i) => (
            <article key={book.id}>
              <div className={css.miniBook} data-colour={book.colour}>
                <span>{book.id}</span>
                <b>{book.name}</b>
                <i />
                <small>{t("retail.workspaces.fictionalTitle")}</small>
              </div>
              <h3>{book.name}</h3>
              <p>{book.detail}</p>
              <strong>{money(book.price)}</strong>
              <div className={css.quantityControl}>
                <button
                  type="button"
                  aria-label={t("retail.workspaces.removeOneFromExample", { name: String(book.name) })}
                  disabled={quantities[i] === 0}
                  onClick={() =>
                    setQuantities((prev) =>
                      prev.map((q, j) => (j === i ? q - 1 : q)),
                    )
                  }
                >
                  <Minus size={14} />
                </button>
                <output aria-label={`${book.name} example quantity`}>
                  {quantities[i]}
                </output>
                <button
                  type="button"
                  aria-label={t("retail.workspaces.addOneToExample", { name: String(book.name) })}
                  disabled={quantities[i] >= 99}
                  onClick={() =>
                    setQuantities((prev) =>
                      prev.map((q, j) => (j === i ? q + 1 : q)),
                    )
                  }
                >
                  <Plus size={14} />
                </button>
              </div>
            </article>
          ))}
        </div>
        <aside className={css.basketReceipt}>
          <span>{t("retail.workspaces.theReaderSBasketLocalExample")}</span>
          <h3>{t("retail.workspaces.aLittleShelfDiscovery")}</h3>
          <ul>
            {books(t)
              .filter((_, i) => quantities[i] > 0)
              .map((book) => {
                const i = books(t).indexOf(book);
                return (
                  <li key={book.id}>
                    <span>
                      {book.name}
                      <small>
                        {quantities[i]} × {money(book.price)}
                      </small>
                    </span>
                    <b>{money(quantities[i] * book.price)}</b>
                  </li>
                );
              })}
          </ul>
          {count === 0 && <p>{t("retail.workspaces.noExampleBooksSelected")}</p>}
          <dl>
            <Metric
              label={`${count} example book${count === 1 ? "" : "s"} · total`}
              value={money(total)}
            />
          </dl>
          <Outcome error="">{`${count} selected example books. Basket total ${money(total)}.`}</Outcome>
          <Note>
            {t("retail.workspaces.unitPricesOnlyNoTaxDiscount")}
          </Note>
        </aside>
      </div>
    </>
  );
}
function ClothingWorkspace() {
  const t = useTranslations("pages.industriesApp");
  const [colour, setColour] = useState(0),
    [size, setSize] = useState(1),
    [requested, setRequested] = useState("3");
  const stock = variantStock[colour][size];
  let result: ReturnType<typeof variantComparison> | null = null,
    error = "";
  try {
    result = variantComparison(stock, value(requested));
  } catch (e) {
    error =
      e instanceof Error ? e.message : t("retail.workspaces.enterAValidRequestedQuantity");
  }
  return (
    <>
      <div className={css.workspaceToolbar}>
        <Badge>{t("retail.workspaces.exClFictionalOvershirtVariants")}</Badge>
        <Reset
          onClick={() => {
            setColour(0);
            setSize(1);
            setRequested("3");
          }}
        />
      </div>
      <div className={css.variantWorkspace}>
        <div className={css.selectedGarment}>
          <ShirtArt colour={colours[colour].hex} />
          <span>
            {t("retail.workspaces.exCl")}{colours[colour].id.toUpperCase()}-{clothingSizes[size]}
          </span>
          <small>{t("retail.workspaces.conceptDrawingNoRealProductSpecification")}</small>
        </div>
        <div className={css.variantControls}>
          <fieldset>
            <legend>{t("retail.workspaces.chooseAnExampleColour")}</legend>
            <div className={css.colourChoices}>
              {colours.map((row, i) => (
                <label key={row.id}>
                  <input
                    type="radio"
                    name="retail-colour"
                    checked={colour === i}
                    onChange={() => setColour(i)}
                  />
                  <span>
                    <i style={{ background: row.hex }} />
                    {row.name}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend>{t("retail.workspaces.chooseAnExampleSize")}</legend>
            <div className={css.sizeChoices}>
              {clothingSizes.map((row, i) => (
                <label key={row}>
                  <input
                    type="radio"
                    name="retail-size"
                    checked={size === i}
                    onChange={() => setSize(i)}
                  />
                  <span>{row}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <Numeric
            label={t("retail.workspaces.requestedExampleQuantityPieces")}
            raw={requested}
            onChange={setRequested}
            min={1}
          />
          <dl className={css.metrics}>
            <Metric
              label={t("retail.workspaces.selectedVariantExampleOnHand")}
              value={num(stock)}
            />
            <Metric
              label={t("retail.workspaces.shortfallForThisRequestPcs")}
              value={result ? num(result.short) : "—"}
            />
          </dl>
          <Outcome error={error}>
            {result
              ? result.short > 0
                ? t("retail.workspaces.theRequestExceedsFictionalStockBy", { num: String(num(result.short)) })
                : t("retail.workspaces.fictionalStockCoversTheRequestWith", { num: String(num(result.remaining)) })
              : ""}
          </Outcome>
          <Note>
            {t("retail.workspaces.thisComparisonIsLocalOnlyNo")}
          </Note>
        </div>
      </div>
    </>
  );
}
function FurnitureWorkspace() {
  const t = useTranslations("pages.industriesApp");
  const [finish, setFinish] = useState(0),
    [quantities, setQuantities] = useState(["1", "1", "1"]),
    [delivery, setDelivery] = useState("1000");
  let result: ReturnType<typeof furnitureTotal> | null = null,
    error = "";
  try {
    result = furnitureTotal(
      furniture.map((row, i) => ({
        price: row.price,
        quantity: value(quantities[i]),
      })),
      finishes[finish].extra,
      value(delivery),
    );
  } catch (e) {
    error =
      e instanceof Error
        ? e.message
        : t("retail.workspaces.useValidExampleQuantitiesAndAmounts");
  }
  return (
    <>
      <div className={css.workspaceToolbar}>
        <Badge>{t("retail.workspaces.fictionalShowroomSetBdt")}</Badge>
        <Reset
          onClick={() => {
            setFinish(0);
            setQuantities(["1", "1", "1"]);
            setDelivery("1000");
          }}
        />
      </div>
      <div className={css.furnitureWorkspace}>
        <div>
          <fieldset>
            <legend>{t("retail.workspaces.chooseAnIllustrativeFinish")}</legend>
            <div className={css.finishChoices}>
              {finishes.map((row, i) => (
                <label key={row.id}>
                  <input
                    type="radio"
                    name="retail-finish"
                    checked={finish === i}
                    onChange={() => setFinish(i)}
                  />
                  <span>
                    <i data-finish={row.id} />
                    <b>{row.name}</b>
                    <small>+ {money(row.extra)}{" "}{t("retail.workspaces.piece")}</small>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
          <div className={css.furnitureLines}>
            {furniture.map((row, i) => (
              <div key={row.id}>
                <span>
                  <b>{row.name}</b>
                  <small>{t("retail.workspaces.base")}{" "}{money(row.price)}{" "}{t("retail.workspaces.piece")}</small>
                </span>
                <Numeric
                  label={`${row.name} · quantity`}
                  raw={quantities[i]}
                  max={20}
                  onChange={(v) =>
                    setQuantities((prev) =>
                      prev.map((q, j) => (i === j ? v : q)),
                    )
                  }
                />
              </div>
            ))}
          </div>
        </div>
        <aside className={css.setReceipt}>
          <span>{t("retail.workspaces.thePiecesAndTheFinish")}</span>
          <h3>{finishes[finish].name}{" "}{t("retail.workspaces.conceptSet")}</h3>
          <Numeric
            label={t("retail.workspaces.enteredDeliveryAmountBdt")}
            raw={delivery}
            onChange={setDelivery}
            max={10000000}
            step="0.01"
          />
          <dl>
            <Metric
              label={t("retail.workspaces.examplePieces")}
              value={result ? num(result.pieces) : "—"}
            />
            <Metric
              label={t("retail.workspaces.furnitureFinishSurcharge")}
              value={result ? money(result.subtotal) : "—"}
            />
            <Metric
              label={t("retail.workspaces.deliveryAddedOnce")}
              value={result ? money(result.delivery) : "—"}
            />
            <Metric
              label={t("retail.workspaces.illustrativeSetTotal")}
              value={result ? money(result.total) : "—"}
            />
          </dl>
          <Outcome error={error}>
            {result
              ? result.pieces === 0
                ? t("retail.workspaces.chooseAtLeastOnePieceTo")
                : t("retail.workspaces.localEstimateNoQuotationIsSaved", { money: String(money(result.total)) })
              : ""}
          </Outcome>
          <Note>
            {t("retail.workspaces.examplePricesAndDeliveryOnlyNo")}
          </Note>
        </aside>
      </div>
    </>
  );
}
const dateStates = memoT((t: TFn): Record<string, string> => ({
  past: t("retail.workspaces.dateLabelPassed"),
  today: t("retail.workspaces.matchesReferenceDate"),
  window: t("retail.workspaces.insideExampleWindow"),
  later: t("retail.workspaces.beyondExampleWindow"),
}));
function GroceryWorkspace() {
  const t = useTranslations("pages.industriesApp");
  const [reference, setReference] = useState(referenceDate),
    [window, setWindow] = useState("3"),
    [filter, setFilter] = useState("all");
  let result: ReturnType<typeof batchDates> | null = null,
    error = "";
  try {
    result = batchDates(reference, value(window), batches);
  } catch (e) {
    error =
      e instanceof Error
        ? e.message
        : t("retail.workspaces.useValidExampleDatesAndA");
  }
  const rows = batches
    .map((row, i) => ({ ...row, calculated: result?.[i] }))
    .filter((row) => filter === "all" || row.calculated?.state === filter);
  return (
    <>
      <div className={css.workspaceToolbar}>
        <Badge>{t("retail.workspaces.fourFictionalBatchesCalendarDatesOnly")}</Badge>
        <Reset
          onClick={() => {
            setReference(referenceDate);
            setWindow("3");
            setFilter("all");
          }}
        />
      </div>
      <div className={css.batchSettings}>
        <label className={css.field}>
          <span>{t("retail.workspaces.exampleReferenceDate")}</span>
          <input
            type="date"
            min="2000-01-01"
            max="2100-12-31"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
          />
        </label>
        <Numeric
          label={t("retail.workspaces.exampleReviewWindowCalendarDays")}
          raw={window}
          onChange={setWindow}
          max={365}
        />
        <label className={css.field}>
          <span>{t("retail.workspaces.showDateLabels")}</span>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">{t("retail.workspaces.allBatches")}</option>
            <option value="past">{t("retail.workspaces.dateLabelPassed")}</option>
            <option value="today">{t("retail.workspaces.matchesReference")}</option>
            <option value="window">{t("retail.workspaces.insideExampleWindow")}</option>
            <option value="later">{t("retail.workspaces.beyondExampleWindow")}</option>
          </select>
        </label>
      </div>
      <dl className={css.batchMetrics}>
        <Metric
          label={t("retail.workspaces.dateLabelsBeforeReference")}
          value={result ? result.filter((r) => r.state === "past").length : "—"}
        />
        <Metric
          label={t("retail.workspaces.dateLabelsMatchingReference")}
          value={
            result ? result.filter((r) => r.state === "today").length : "—"
          }
        />
        <Metric
          label={t("retail.workspaces.futureDatesInsideWindow")}
          value={
            result ? result.filter((r) => r.state === "window").length : "—"
          }
        />
      </dl>
      <div
        className={css.tableScroll}
        tabIndex={0}
        role="region"
        aria-label={t("retail.workspaces.illustrativeBatchDateReviewScrollHorizon")}
      >
        <table>
          <caption className={css.srOnly}>
            {t("retail.workspaces.fictionalBatchDatesComparedWithAn")}
          </caption>
          <thead>
            <tr>
              {[
                t("retail.workspaces.fictionalItemBatch"),
                t("retail.workspaces.exampleUnits"),
                t("retail.workspaces.recordedDate"),
                t("retail.workspaces.dayDifference"),
                t("retail.workspaces.dateObservation"),
              ].map((s) => (
                <th scope="col" key={s}>
                  {s}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <th scope="row">
                  {row.name}
                  <small>{row.id}</small>
                </th>
                <td>{row.quantity}</td>
                <td>{dateLabel(row.date)}</td>
                <td>
                  {row.calculated
                    ? `${row.calculated.days > 0 ? "+" : ""}${row.calculated.days} days`
                    : "—"}
                </td>
                <td>
                  <span
                    className={css.dateState}
                    data-state={row.calculated?.state}
                  >
                    {row.calculated
                      ? dateStates(t)[row.calculated.state]
                      : t("retail.workspaces.checkInputs")}
                  </span>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={5}>
                  {t("retail.workspaces.noFictionalBatchesMatchThisDate")}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Outcome
        error={error}
      >{`${rows.length} fictional batches shown. Dates do not determine safety or saleability.`}</Outcome>
      <Note>
        {t("retail.workspaces.theseAreArithmeticObservationsOnlyStorag")}
      </Note>
    </>
  );
}
function HardwareWorkspace() {
  const t = useTranslations("pages.industriesApp");
  const [target, setTarget] = useState("240"),
    [onHand, setOnHand] = useState("65"),
    [pack, setPack] = useState("50");
  let result: ReturnType<typeof purchasePacks> | null = null,
    error = "";
  try {
    result = purchasePacks(value(target), value(onHand), value(pack));
  } catch (e) {
    error =
      e instanceof Error ? e.message : t("retail.workspaces.enterValidWholeUnitQuantities");
  }
  return (
    <>
      <div className={css.workspaceToolbar}>
        <Badge>{t("retail.workspaces.exH01FictionalFixingUnitsOnly")}</Badge>
        <Reset
          onClick={() => {
            setTarget("240");
            setOnHand("65");
            setPack("50");
          }}
        />
      </div>
      <div className={css.packWorkspace}>
        <div className={css.packInputs}>
          <Numeric
            label={t("retail.workspaces.enteredTargetIndividualUnits")}
            raw={target}
            onChange={setTarget}
          />
          <Numeric
            label={t("retail.workspaces.exampleOnHandIndividualUnits")}
            raw={onHand}
            onChange={setOnHand}
          />
          <Numeric
            label={t("retail.workspaces.enteredPurchasePackSizeUnits")}
            raw={pack}
            onChange={setPack}
            min={1}
          />
          <Note>
            {t("retail.workspaces.allInputsAreWholeUnitsPack")}
          </Note>
        </div>
        <section
          className={css.packResult}
          aria-label={t("retail.workspaces.localWholePackCalculation")}
        >
          <span>{t("retail.workspaces.wholePacksVisibleRemainder")}</span>
          <h3>
            {result ? num(result.packs) : "—"}
            <small>{t("retail.workspaces.packsNeeded")}</small>
          </h3>
          <div className={css.packFlow}>
            <span>
              {result ? num(result.shortage) : "—"}
              <small>{t("retail.workspaces.unitsShort")}</small>
            </span>
            <ArrowRight size={16} aria-hidden="true" />
            <span>
              {result ? num(result.incoming) : "—"}
              <small>{t("retail.workspaces.incomingUnits")}</small>
            </span>
          </div>
          <dl className={css.metrics}>
            <Metric
              label={t("retail.workspaces.exampleUnitsAfterPurchasePacks")}
              value={result ? num(result.after) : "—"}
            />
            <Metric
              label={t("retail.workspaces.unitsRemainingBeyondTarget")}
              value={result ? num(result.remaining) : "—"}
            />
          </dl>
          <Outcome error={error}>
            {result
              ? result.packs === 0
                ? t("retail.workspaces.exampleOnHandUnitsAlreadyCover")
                : `${result.packs} whole packs cover the ${result.shortage}-unit shortage.`
              : ""}
          </Outcome>
          <Note>
            {t("retail.workspaces.localArithmeticOnlyNoSupplierPrice")}
          </Note>
        </section>
      </div>
    </>
  );
}
function ToyWorkspace() {
  const t = useTranslations("pages.industriesApp");
  const [selected, setSelected] = useState([true, false, true]),
    [wrap, setWrap] = useState(false),
    [wrapAmount, setWrapAmount] = useState("150"),
    [budget, setBudget] = useState("2000");
  let result: ReturnType<typeof giftBudget> | null = null,
    error = "";
  try {
    result = giftBudget(
      toys(t).map((row, i) => ({
        price: row.price,
        quantity: selected[i] ? 1 : 0,
      })),
      wrap ? value(wrapAmount) : 0,
      value(budget),
    );
  } catch (e) {
    error =
      e instanceof Error ? e.message : t("retail.workspaces.useValidExampleBudgetAmounts");
  }
  return (
    <>
      <div className={css.workspaceToolbar}>
        <Badge>{t("retail.workspaces.fictionalToyCollectionBdt")}</Badge>
        <Reset
          onClick={() => {
            setSelected([true, false, true]);
            setWrap(false);
            setWrapAmount("150");
            setBudget("2000");
          }}
        />
      </div>
      <div className={css.giftWorkspace}>
        <div className={css.toyChoices}>
          {toys(t).map((row, i) => (
            <label key={row.id}>
              <input
                type="checkbox"
                checked={selected[i]}
                onChange={(e) => {
                  const checked = e.target.checked;
                  setSelected((prev) =>
                    prev.map((s, j) => (i === j ? checked : s)),
                  );
                }}
              />
              <span className={css.toyChoiceBody}>
                <ToyArt kind={row.kind} />
                <span className={css.selectionMark}>
                  {selected[i] ? t("retail.workspaces.selected") : t("retail.workspaces.addToExample")}
                </span>
                <b>{row.name}</b>
                <small>{row.detail}</small>
                <strong>{money(row.price)}</strong>
              </span>
            </label>
          ))}
        </div>
        <aside className={css.giftReceipt}>
          <span>{t("retail.workspaces.aLittleGiftConsidered")}</span>
          <h3>{t("retail.workspaces.keepTheBudgetInThePicture")}</h3>
          <Numeric
            label={t("retail.workspaces.enteredGiftBudgetBdt")}
            raw={budget}
            onChange={setBudget}
            max={10000000}
            step="0.01"
          />
          <label className={css.wrapChoice}>
            <input
              type="checkbox"
              checked={wrap}
              onChange={(e) => setWrap(e.target.checked)}
            />
            {t("retail.workspaces.includeAnIllustrativeGiftWrapCharge")}
          </label>
          {wrap && (
            <Numeric
              label={t("retail.workspaces.enteredGiftWrapAmountBdt")}
              raw={wrapAmount}
              onChange={setWrapAmount}
              max={10000000}
              step="0.01"
            />
          )}
          <dl className={css.metrics}>
            <Metric
              label={t("retail.workspaces.exampleGiftTotal")}
              value={result ? money(result.total) : "—"}
            />
            <Metric
              label={
                result && result.remaining < 0
                  ? t("retail.workspaces.overEnteredBudget")
                  : t("retail.workspaces.remainingBudget")
              }
              value={result ? money(Math.abs(result.remaining)) : "—"}
            />
          </dl>
          <Outcome error={error}>
            {result
              ? result.remaining < 0
                ? t("retail.workspaces.theExampleIsOverTheEntered", { money: String(money(-result.remaining)) })
                : t("retail.workspaces.theExampleLeavesOfTheEntered", { money: String(money(result.remaining)) })
              : ""}
          </Outcome>
          <Note>
            {t("retail.workspaces.noAgeSafetyGuidanceLiveStock")}
          </Note>
        </aside>
      </div>
    </>
  );
}
const workspaces = {
  "book-store": BookWorkspace,
  "clothing-store": ClothingWorkspace,
  "furniture-store": FurnitureWorkspace,
  "grocery-store": GroceryWorkspace,
  "hardware-store": HardwareWorkspace,
  "toy-store": ToyWorkspace,
};
export default function RetailWorkspace({ slug }: { slug: RetailSlug }) {
  const t = useTranslations("pages.industriesApp");
  const p = pages(t)[slug],
    Workspace = workspaces[slug];
  return (
    <section className={css.workspaceSection} id="retail-workspace">
      <div className={css.wrap}>
        <div className={css.sectionHeading}>
          <p className={css.eyebrow}>{t("retail.workspaces.tryASmallPartOfThe")}</p>
          <h2>{p.demoTitle}</h2>
          <p>{p.demoDescription}</p>
        </div>
        <div className={css.workspaceSurface}>
          <Workspace />
        </div>
      </div>
    </section>
  );
}
