"use client";
import { useState } from "react";
import { ArrowRight, Minus, Plus, RotateCcw } from "lucide-react";
import {
  basketTotals,
  durationSeconds,
  formatDuration,
  programmeBudget,
  programmeRundown,
} from "./calculations";
import {
  initialBasket,
  money,
  pages,
  products,
  programmeLines,
  segments,
  type OtherIndustry,
} from "./data";
import { Badge, Metric, Note, ProductArt, css } from "./ui";
import { useTranslations } from "next-intl";
function amount(value: string) {
  if (value.trim() === "")
    throw new Error("Fill in each example amount to calculate the result.");
  return Number(value);
}
function invalidDuration(value: string) {
  try {
    durationSeconds(value);
    return false;
  } catch {
    return true;
  }
}
function AmountField({
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
        step="0.01"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}
export function IndustryStory({ slug }: { slug: OtherIndustry }) {
  const t = useTranslations("pages.industriesApp");
  const [index, setIndex] = useState(0);
  const p = pages(t)[slug],
    stage = p.stages[index];
  return (
    <section className={css.storySection}>
      <div className={css.wrap}>
        <div className={css.sectionHeading}>
          <div>
            <p className={css.eyebrow}>{t("others.workspaces.theWorkflowInContext")}</p>
            <h2>{p.storyTitle}</h2>
          </div>
        </div>
        <div className={css.storyLayout}>
          <div
            className={css.storyChoices}
            role="group"
            aria-label={t("others.workspaces.chooseAWorkflowPerspective")}
          >
            {p.stages.map((item, i) => (
              <button
                type="button"
                key={item.label}
                aria-pressed={i === index}
                onClick={() => setIndex(i)}
              >
                <span>0{i + 1}</span>
                {item.label}
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
function CommerceDemo() {
  const t = useTranslations("pages.industriesApp");
  const [basket, setBasket] = useState<Record<string, number>>({
    ...initialBasket,
  });
  const [delivery, setDelivery] = useState("80");
  const [discount, setDiscount] = useState("0");
  const lines = products(t)
    .filter((row) => (basket[row.id] ?? 0) > 0)
    .map((row) => ({ ...row, qty: basket[row.id] }));
  let result: ReturnType<typeof basketTotals> | null = null;
  let error = "";
  try {
    result = basketTotals(lines, amount(delivery), amount(discount));
  } catch (e) {
    error = e instanceof Error ? e.message : t("others.workspaces.useValidExampleAmounts");
  }
  function change(id: string, delta: number) {
    setBasket((prev) => ({
      ...prev,
      [id]: Math.max(0, Math.min(99, (prev[id] ?? 0) + delta)),
    }));
  }
  return (
    <>
      <div className={css.toolbar}>
        <Badge>{t("others.workspaces.fictionalProductsNoLivePricesOr")}</Badge>
        <button
          type="button"
          className={css.button}
          onClick={() => {
            setBasket({ ...initialBasket });
            setDelivery("80");
            setDiscount("0");
          }}
        >
          <RotateCcw size={14} />
          {t("others.workspaces.resetBasket")}
        </button>
      </div>
      <div className={css.commerceDemo}>
        <div className={css.productCards}>
          {products(t).map((product) => (
            <article key={product.id} data-art={product.art}>
              <div>
                <ProductArt kind={product.art} />
              </div>
              <small>{product.id}</small>
              <h3>{product.name}</h3>
              <p>{money(product.price)}</p>
              <button
                className={css.button}
                type="button"
                disabled={(basket[product.id] ?? 0) >= 99}
                onClick={() => change(product.id, 1)}
              >
                <Plus size={14} />
                {t("others.workspaces.addToExample")}
              </button>
            </article>
          ))}
        </div>
        <section className={css.basketPanel} aria-label={t("others.workspaces.localExampleBasket")}>
          <h3>{t("others.workspaces.theBasketExplained")}</h3>
          <div className={css.basketLines}>
            {lines.map((row) => (
              <div key={row.id}>
                <span>
                  <b>{row.name}</b>
                  <small>{money(row.price)}{" "}{t("others.workspaces.each")}</small>
                </span>
                <div className={css.quantity}>
                  <button
                    type="button"
                    className={css.button}
                    aria-label={t("others.workspaces.removeOne", { name: String(row.name) })}
                    onClick={() => change(row.id, -1)}
                  >
                    <Minus size={13} />
                  </button>
                  <span>{row.qty}</span>
                  <button
                    type="button"
                    className={css.button}
                    aria-label={t("others.workspaces.addOne", { name: String(row.name) })}
                    disabled={row.qty >= 99}
                    onClick={() => change(row.id, 1)}
                  >
                    <Plus size={13} />
                  </button>
                </div>
              </div>
            ))}
            {!lines.length && (
              <p className={css.empty}>
                {t("others.workspaces.theExampleBasketIsEmptyAdd")}
              </p>
            )}
          </div>
          <div className={css.formGrid}>
            <AmountField
              label={t("others.workspaces.exampleDeliveryBdt")}
              value={delivery}
              onChange={setDelivery}
            />
            <AmountField
              label={t("others.workspaces.flatDiscountBdt")}
              value={discount}
              onChange={setDiscount}
            />
          </div>
          <dl className={css.basketTotals} aria-live="polite">
            <div>
              <dt>{t("others.workspaces.itemSubtotal")}</dt>
              <dd>{result ? money(result.subtotal) : "—"}</dd>
            </div>
            <div>
              <dt>{t("others.workspaces.delivery")}</dt>
              <dd>{result ? money(result.delivery) : "—"}</dd>
            </div>
            <div>
              <dt>{t("others.workspaces.flatDiscount")}</dt>
              <dd>{result ? money(result.discount) : "—"}</dd>
            </div>
            <div>
              <dt>{t("others.workspaces.exampleTotal")}</dt>
              <dd>{result ? money(result.total) : "—"}</dd>
            </div>
          </dl>
          {error && (
            <p className={css.feedback} data-warning="true" role="alert">
              {error}
            </p>
          )}
          <Note>
            {t("others.workspaces.taxIsNotCalculatedEmptyBaskets")}
          </Note>
        </section>
      </div>
    </>
  );
}
function NgoDemo() {
  const t = useTranslations("pages.industriesApp");
  const [budget, setBudget] = useState("100000");
  const [allocations, setAllocations] = useState<Record<string, string>>(
    Object.fromEntries(
      programmeLines(t).map((row) => [row.id, String(row.amount)]),
    ),
  );
  const [view, setView] = useState("amount");
  let result: ReturnType<typeof programmeBudget> | null = null;
  let error = "";
  try {
    result = programmeBudget(
      amount(budget),
      programmeLines(t).map((row) => amount(allocations[row.id])),
    );
  } catch (e) {
    error = e instanceof Error ? e.message : t("others.workspaces.useValidExampleAmounts");
  }
  return (
    <>
      <div className={css.toolbar}>
        <Badge>{t("others.workspaces.fictionalPlanningAmountsNotDonationsOr")}</Badge>
        <button
          type="button"
          className={css.button}
          onClick={() => {
            setBudget("100000");
            setAllocations(
              Object.fromEntries(
                programmeLines(t).map((row) => [row.id, String(row.amount)]),
              ),
            );
            setView("amount");
          }}
        >
          <RotateCcw size={14} />
          {t("others.workspaces.resetPlan")}
        </button>
      </div>
      <div className={css.ngoDemo}>
        <div>
          <div className={css.budgetInput}>
            <AmountField
              label={t("others.workspaces.illustrativePlanningBudgetBdt")}
              value={budget}
              onChange={setBudget}
            />
          </div>
          <div className={css.programmeInputs}>
            {programmeLines(t).map((row, i) => (
              <div key={row.id}>
                <span>0{i + 1}</span>
                <AmountField
                  label={`${row.label} · BDT`}
                  value={allocations[row.id]}
                  onChange={(value) =>
                    setAllocations((prev) => ({ ...prev, [row.id]: value }))
                  }
                />
              </div>
            ))}
          </div>
          <Note>
            {t("others.workspaces.allLabelsAreFictionalTheExample")}
          </Note>
        </div>
        <section
          className={css.budgetResult}
          aria-label={t("others.workspaces.localProgrammeBudgetResult")}
        >
          <span>{t("others.workspaces.thePlanningConversation")}</span>
          <h3>{t("others.workspaces.seeTheAllocationWithoutLosingThe")}</h3>
          <div
            className={css.viewToggle}
            role="group"
            aria-label={t("others.workspaces.budgetDisplay")}
          >
            <button
              type="button"
              aria-pressed={view === "amount"}
              onClick={() => setView("amount")}
            >
              {t("others.workspaces.amounts")}
            </button>
            <button
              type="button"
              aria-pressed={view === "share"}
              onClick={() => setView("share")}
            >
              {t("others.workspaces.shares")}
            </button>
          </div>
          <dl className={css.metrics}>
            <Metric
              label={t("others.workspaces.assignedPlanningAmount")}
              value={result ? money(result.assigned) : "—"}
            />
            <Metric
              label={
                result && result.remaining < 0
                  ? t("others.workspaces.aboveTheExampleBudget")
                  : t("others.workspaces.unassignedPlanningAmount")
              }
              value={result ? money(Math.abs(result.remaining)) : "—"}
            />
          </dl>
          <div className={css.programmeBreakdown}>
            {programmeLines(t).map((row, i) => (
              <div key={row.id}>
                <span>
                  <i data-tone={i} />
                  {row.label}
                </span>
                <b>
                  {result
                    ? view === "amount"
                      ? money(amount(allocations[row.id]))
                      : `${((Math.round(amount(allocations[row.id]) * 100) / Math.round(amount(budget) * 100)) * 100).toFixed(2)}%`
                    : "—"}
                </b>
              </div>
            ))}
          </div>
          <p
            className={css.feedback}
            role="status"
            data-warning={!!error || !!(result && result.remaining < 0)}
          >
            {error ||
              (result
                ? `${result.share.toFixed(2)}% of the entered example budget is assigned. This is arithmetic, not spending approval.`
                : t("others.workspaces.enterTheExampleAmounts"))}
          </p>
        </section>
      </div>
    </>
  );
}
function TvDemo() {
  const t = useTranslations("pages.industriesApp");
  const [start, setStart] = useState("19:00");
  const [target, setTarget] = useState("30");
  const [durations, setDurations] = useState<Record<string, string>>(
    Object.fromEntries(segments(t).map((row) => [row.id, row.duration])),
  );
  let result: ReturnType<typeof programmeRundown> | null = null;
  let error = "";
  try {
    result = programmeRundown(
      start,
      amount(target),
      segments(t).map((row) => ({ id: row.id, duration: durations[row.id] })),
    );
  } catch (e) {
    error = e instanceof Error ? e.message : t("others.workspaces.useValidExampleTimings");
  }
  return (
    <>
      <div className={css.toolbar}>
        <Badge>
          {t("others.workspaces.localPlanningClockWholeSecondsNo")}
        </Badge>
        <button
          className={css.button}
          type="button"
          onClick={() => {
            setStart("19:00");
            setTarget("30");
            setDurations(
              Object.fromEntries(segments(t).map((row) => [row.id, row.duration])),
            );
          }}
        >
          <RotateCcw size={14} />
          {t("others.workspaces.resetRundown")}
        </button>
      </div>
      <div className={css.rundownSettings}>
        <label className={css.field}>
          <span>{t("others.workspaces.exampleStart24HourClock")}</span>
          <input
            type="time"
            step="60"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
        </label>
        <label className={css.field}>
          <span>{t("others.workspaces.targetLengthWholeMinutes")}</span>
          <input
            type="number"
            inputMode="numeric"
            min="1"
            max="180"
            step="1"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
          />
        </label>
        <div className={css.rundownTotal} role="status">
          <span>{t("others.workspaces.totalExampleDuration")}</span>
          <b>{result ? formatDuration(result.total) : "—"}</b>
          <small>
            {result
              ? result.remaining === 0
                ? t("others.workspaces.matchesTheExampleTarget")
                : `${formatDuration(result.remaining)} ${result.remaining < 0 ? "over" : "under"} the example target`
              : t("others.workspaces.checkTheEnteredTimings")}
          </small>
        </div>
      </div>
      <p id="rundown-format" className={css.formatHint}>
        {t("others.workspaces.durationsUseMmSsMaximum180")}
      </p>
      <div
        className={css.tableScroll}
        tabIndex={0}
        role="region"
        aria-label={t("others.workspaces.editableExampleRundownScrollHorizontally")}
      >
        <table>
          <caption className={css.srOnly}>
            {t("others.workspaces.fiveFictionalProgrammeSegmentsWithEditab")}
          </caption>
          <thead>
            <tr>
              {[t("others.workspaces.segment"), t("others.workspaces.durationMmSs"), t("others.workspaces.starts"), t("others.workspaces.ends")].map(
                (label) => (
                  <th key={label} scope="col">
                    {label}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {segments(t).map((row) => {
              const timing = result?.timings.find((item) => item.id === row.id);
              return (
                <tr key={row.id}>
                  <td>
                    <span>{row.id}</span>
                    <b>{row.title}</b>
                  </td>
                  <td>
                    <label>
                      <span className={css.srOnly}>
                        {row.title}{" "}{t("others.workspaces.durationInMinutesAndSeconds")}
                      </span>
                      <input
                        className={css.durationInput}
                        type="text"
                        maxLength={6}
                        pattern="[0-9]{1,3}:[0-5][0-9]"
                        aria-describedby="rundown-format"
                        aria-invalid={invalidDuration(durations[row.id])}
                        value={durations[row.id]}
                        onChange={(e) =>
                          setDurations((prev) => ({
                            ...prev,
                            [row.id]: e.target.value,
                          }))
                        }
                      />
                    </label>
                  </td>
                  <td>
                    {timing ? timing.start.time : "—"}
                    {!!timing?.start.days && (
                      <small>+{timing.start.days}{" "}{t("others.workspaces.day")}</small>
                    )}
                  </td>
                  <td>
                    {timing ? timing.end.time : "—"}
                    {!!timing?.end.days && (
                      <small>+{timing.end.days}{" "}{t("others.workspaces.day")}</small>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {error && (
        <p className={css.feedback} data-warning="true" role="alert">
          {error}
        </p>
      )}
      <Note>
        {t("others.workspaces.thisIsNotFrameAccurateTimecode")}
      </Note>
    </>
  );
}
const demos = { ecommerce: CommerceDemo, ngo: NgoDemo, tv: TvDemo };
export default function OtherIndustryDemo({ slug }: { slug: OtherIndustry }) {
  const t = useTranslations("pages.industriesApp");
  const p = pages(t)[slug];
  const Demo = demos[slug];
  return (
    <section className={css.demoSection} id="industry-demo">
      <div className={css.wrap}>
        <div className={css.sectionHeading}>
          <div>
            <p className={css.eyebrow}>{t("others.workspaces.tryASmallPartOfThe")}</p>
            <h2>{p.demoTitle}</h2>
            <p>{p.demoDescription}</p>
          </div>
          <Badge>{t("others.workspaces.localExampleNotConnected")}</Badge>
        </div>
        <div className={css.demoSurface}>
          <Demo />
        </div>
      </div>
    </section>
  );
}
