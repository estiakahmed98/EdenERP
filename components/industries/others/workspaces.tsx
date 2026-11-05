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
  const [index, setIndex] = useState(0);
  const p = pages[slug],
    stage = p.stages[index];
  return (
    <section className={css.storySection}>
      <div className={css.wrap}>
        <div className={css.sectionHeading}>
          <div>
            <p className={css.eyebrow}>THE WORKFLOW IN CONTEXT</p>
            <h2>{p.storyTitle}</h2>
          </div>
        </div>
        <div className={css.storyLayout}>
          <div
            className={css.storyChoices}
            role="group"
            aria-label="Choose a workflow perspective"
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
  const [basket, setBasket] = useState<Record<string, number>>({
    ...initialBasket,
  });
  const [delivery, setDelivery] = useState("80");
  const [discount, setDiscount] = useState("0");
  const lines = products
    .filter((row) => (basket[row.id] ?? 0) > 0)
    .map((row) => ({ ...row, qty: basket[row.id] }));
  let result: ReturnType<typeof basketTotals> | null = null;
  let error = "";
  try {
    result = basketTotals(lines, amount(delivery), amount(discount));
  } catch (e) {
    error = e instanceof Error ? e.message : "Use valid example amounts.";
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
        <Badge>Fictional products · no live prices or stock</Badge>
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
          Reset basket
        </button>
      </div>
      <div className={css.commerceDemo}>
        <div className={css.productCards}>
          {products.map((product) => (
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
                Add to example
              </button>
            </article>
          ))}
        </div>
        <section className={css.basketPanel} aria-label="Local example basket">
          <h3>The basket, explained.</h3>
          <div className={css.basketLines}>
            {lines.map((row) => (
              <div key={row.id}>
                <span>
                  <b>{row.name}</b>
                  <small>{money(row.price)} each</small>
                </span>
                <div className={css.quantity}>
                  <button
                    type="button"
                    className={css.button}
                    aria-label={`Remove one ${row.name}`}
                    onClick={() => change(row.id, -1)}
                  >
                    <Minus size={13} />
                  </button>
                  <span>{row.qty}</span>
                  <button
                    type="button"
                    className={css.button}
                    aria-label={`Add one ${row.name}`}
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
                The example basket is empty. Add a product to explore.
              </p>
            )}
          </div>
          <div className={css.formGrid}>
            <AmountField
              label="Example delivery · BDT"
              value={delivery}
              onChange={setDelivery}
            />
            <AmountField
              label="Flat discount · BDT"
              value={discount}
              onChange={setDiscount}
            />
          </div>
          <dl className={css.basketTotals} aria-live="polite">
            <div>
              <dt>Item subtotal</dt>
              <dd>{result ? money(result.subtotal) : "—"}</dd>
            </div>
            <div>
              <dt>Delivery</dt>
              <dd>{result ? money(result.delivery) : "—"}</dd>
            </div>
            <div>
              <dt>Flat discount</dt>
              <dd>{result ? money(result.discount) : "—"}</dd>
            </div>
            <div>
              <dt>Example total</dt>
              <dd>{result ? money(result.total) : "—"}</dd>
            </div>
          </dl>
          {error && (
            <p className={css.feedback} data-warning="true" role="alert">
              {error}
            </p>
          )}
          <Note>
            Tax is not calculated. Empty baskets have no delivery charge. No
            order, payment, coupon redemption or stock reservation is made.
          </Note>
        </section>
      </div>
    </>
  );
}
function NgoDemo() {
  const [budget, setBudget] = useState("100000");
  const [allocations, setAllocations] = useState<Record<string, string>>(
    Object.fromEntries(
      programmeLines.map((row) => [row.id, String(row.amount)]),
    ),
  );
  const [view, setView] = useState("amount");
  let result: ReturnType<typeof programmeBudget> | null = null;
  let error = "";
  try {
    result = programmeBudget(
      amount(budget),
      programmeLines.map((row) => amount(allocations[row.id])),
    );
  } catch (e) {
    error = e instanceof Error ? e.message : "Use valid example amounts.";
  }
  return (
    <>
      <div className={css.toolbar}>
        <Badge>Fictional planning amounts · not donations or expenditure</Badge>
        <button
          type="button"
          className={css.button}
          onClick={() => {
            setBudget("100000");
            setAllocations(
              Object.fromEntries(
                programmeLines.map((row) => [row.id, String(row.amount)]),
              ),
            );
            setView("amount");
          }}
        >
          <RotateCcw size={14} />
          Reset plan
        </button>
      </div>
      <div className={css.ngoDemo}>
        <div>
          <div className={css.budgetInput}>
            <AmountField
              label="Illustrative planning budget · BDT"
              value={budget}
              onChange={setBudget}
            />
          </div>
          <div className={css.programmeInputs}>
            {programmeLines.map((row, i) => (
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
            All labels are fictional. The example checks no donor restrictions,
            beneficiary eligibility or expenditure policy.
          </Note>
        </div>
        <section
          className={css.budgetResult}
          aria-label="Local programme budget result"
        >
          <span>THE PLANNING CONVERSATION</span>
          <h3>See the allocation without losing the purpose.</h3>
          <div
            className={css.viewToggle}
            role="group"
            aria-label="Budget display"
          >
            <button
              type="button"
              aria-pressed={view === "amount"}
              onClick={() => setView("amount")}
            >
              Amounts
            </button>
            <button
              type="button"
              aria-pressed={view === "share"}
              onClick={() => setView("share")}
            >
              Shares
            </button>
          </div>
          <dl className={css.metrics}>
            <Metric
              label="Assigned planning amount"
              value={result ? money(result.assigned) : "—"}
            />
            <Metric
              label={
                result && result.remaining < 0
                  ? "Above the example budget"
                  : "Unassigned planning amount"
              }
              value={result ? money(Math.abs(result.remaining)) : "—"}
            />
          </dl>
          <div className={css.programmeBreakdown}>
            {programmeLines.map((row, i) => (
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
                : "Enter the example amounts.")}
          </p>
        </section>
      </div>
    </>
  );
}
function TvDemo() {
  const [start, setStart] = useState("19:00");
  const [target, setTarget] = useState("30");
  const [durations, setDurations] = useState<Record<string, string>>(
    Object.fromEntries(segments.map((row) => [row.id, row.duration])),
  );
  let result: ReturnType<typeof programmeRundown> | null = null;
  let error = "";
  try {
    result = programmeRundown(
      start,
      amount(target),
      segments.map((row) => ({ id: row.id, duration: durations[row.id] })),
    );
  } catch (e) {
    error = e instanceof Error ? e.message : "Use valid example timings.";
  }
  return (
    <>
      <div className={css.toolbar}>
        <Badge>
          Local planning clock · whole seconds, no broadcast control
        </Badge>
        <button
          className={css.button}
          type="button"
          onClick={() => {
            setStart("19:00");
            setTarget("30");
            setDurations(
              Object.fromEntries(segments.map((row) => [row.id, row.duration])),
            );
          }}
        >
          <RotateCcw size={14} />
          Reset rundown
        </button>
      </div>
      <div className={css.rundownSettings}>
        <label className={css.field}>
          <span>Example start · 24-hour clock</span>
          <input
            type="time"
            step="60"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
        </label>
        <label className={css.field}>
          <span>Target length · whole minutes</span>
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
          <span>Total example duration</span>
          <b>{result ? formatDuration(result.total) : "—"}</b>
          <small>
            {result
              ? result.remaining === 0
                ? "Matches the example target"
                : `${formatDuration(result.remaining)} ${result.remaining < 0 ? "over" : "under"} the example target`
              : "Check the entered timings"}
          </small>
        </div>
      </div>
      <p id="rundown-format" className={css.formatHint}>
        Durations use mm:ss (maximum 180:00 per segment). Clock labels show +1
        day when the example crosses midnight.
      </p>
      <div
        className={css.tableScroll}
        tabIndex={0}
        role="region"
        aria-label="Editable example rundown, scroll horizontally"
      >
        <table>
          <caption className={css.srOnly}>
            Five fictional programme segments with editable durations and
            calculated start/end clocks
          </caption>
          <thead>
            <tr>
              {["Segment", "Duration · mm:ss", "Starts", "Ends"].map(
                (label) => (
                  <th key={label} scope="col">
                    {label}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {segments.map((row) => {
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
                        {row.title} duration in minutes and seconds
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
                      <small>+{timing.start.days} day</small>
                    )}
                  </td>
                  <td>
                    {timing ? timing.end.time : "—"}
                    {!!timing?.end.days && (
                      <small>+{timing.end.days} day</small>
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
        This is not frame-accurate timecode, transmission scheduling or media
        playback. The clock has no date, timezone, station feed, advertising
        inventory or rights integration.
      </Note>
    </>
  );
}
const demos = { ecommerce: CommerceDemo, ngo: NgoDemo, tv: TvDemo };
export default function OtherIndustryDemo({ slug }: { slug: OtherIndustry }) {
  const p = pages[slug];
  const Demo = demos[slug];
  return (
    <section className={css.demoSection} id="industry-demo">
      <div className={css.wrap}>
        <div className={css.sectionHeading}>
          <div>
            <p className={css.eyebrow}>TRY A SMALL PART OF THE WORKFLOW</p>
            <h2>{p.demoTitle}</h2>
            <p>{p.demoDescription}</p>
          </div>
          <Badge>Local example · not connected</Badge>
        </div>
        <div className={css.demoSurface}>
          <Demo />
        </div>
      </div>
    </section>
  );
}
