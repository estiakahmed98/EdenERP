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
  return (
    <button type="button" className={css.reset} onClick={onClick}>
      <RotateCcw size={13} aria-hidden="true" />
      Reset example
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
  const [selected, setSelected] = useState(0),
    p = pages[slug],
    stage = p.stages[selected];
  return (
    <section className={css.storySection}>
      <div className={css.wrap}>
        <div className={css.sectionHeading}>
          <p className={css.eyebrow}>THE STORE, IN CONTEXT</p>
          <h2>{p.story}</h2>
        </div>
        <div className={css.storyLayout}>
          <div
            className={css.storyChoices}
            role="group"
            aria-label="Choose a retail perspective"
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
  const [quantities, setQuantities] = useState([1, 0, 1]);
  const total = basketTotal(
    books.map((b, i) => ({ price: b.price, quantity: quantities[i] })),
  );
  const count = quantities.reduce((a, b) => a + b, 0);
  return (
    <>
      <div className={css.workspaceToolbar}>
        <Badge>Fictional book catalogue · BDT</Badge>
        <Reset onClick={() => setQuantities([1, 0, 1])} />
      </div>
      <div className={css.basketLayout}>
        <div className={css.bookChoices}>
          {books.map((book, i) => (
            <article key={book.id}>
              <div className={css.miniBook} data-colour={book.colour}>
                <span>{book.id}</span>
                <b>{book.name}</b>
                <i />
                <small>FICTIONAL TITLE</small>
              </div>
              <h3>{book.name}</h3>
              <p>{book.detail}</p>
              <strong>{money(book.price)}</strong>
              <div className={css.quantityControl}>
                <button
                  type="button"
                  aria-label={`Remove one ${book.name} from example`}
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
                  aria-label={`Add one ${book.name} to example`}
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
          <span>THE READER’S BASKET / LOCAL EXAMPLE</span>
          <h3>A little shelf discovery.</h3>
          <ul>
            {books
              .filter((_, i) => quantities[i] > 0)
              .map((book) => {
                const i = books.indexOf(book);
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
          {count === 0 && <p>No example books selected.</p>}
          <dl>
            <Metric
              label={`${count} example book${count === 1 ? "" : "s"} · total`}
              value={money(total)}
            />
          </dl>
          <Outcome error="">{`${count} selected example books. Basket total ${money(total)}.`}</Outcome>
          <Note>
            Unit prices only. No tax, discount, payment or real stock check is
            applied.
          </Note>
        </aside>
      </div>
    </>
  );
}
function ClothingWorkspace() {
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
      e instanceof Error ? e.message : "Enter a valid requested quantity.";
  }
  return (
    <>
      <div className={css.workspaceToolbar}>
        <Badge>EX-CL / fictional overshirt variants</Badge>
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
            EX-CL-{colours[colour].id.toUpperCase()}-{clothingSizes[size]}
          </span>
          <small>Concept drawing · no real product specification</small>
        </div>
        <div className={css.variantControls}>
          <fieldset>
            <legend>Choose an example colour</legend>
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
            <legend>Choose an example size</legend>
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
            label="Requested example quantity · pieces"
            raw={requested}
            onChange={setRequested}
            min={1}
          />
          <dl className={css.metrics}>
            <Metric
              label="Selected variant · example on hand"
              value={num(stock)}
            />
            <Metric
              label="Shortfall for this request · pcs"
              value={result ? num(result.short) : "—"}
            />
          </dl>
          <Outcome error={error}>
            {result
              ? result.short > 0
                ? `The request exceeds fictional stock by ${num(result.short)} pieces.`
                : `Fictional stock covers the request, with ${num(result.remaining)} pieces left in the example.`
              : ""}
          </Outcome>
          <Note>
            This comparison is local only. No availability promise, reservation
            or sale is made.
          </Note>
        </div>
      </div>
    </>
  );
}
function FurnitureWorkspace() {
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
        : "Use valid example quantities and amounts.";
  }
  return (
    <>
      <div className={css.workspaceToolbar}>
        <Badge>Fictional showroom set · BDT</Badge>
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
            <legend>Choose an illustrative finish</legend>
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
                    <small>+ {money(row.extra)} / piece</small>
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
                  <small>Base {money(row.price)} / piece</small>
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
          <span>THE PIECES AND THE FINISH</span>
          <h3>{finishes[finish].name} / concept set</h3>
          <Numeric
            label="Entered delivery amount · BDT"
            raw={delivery}
            onChange={setDelivery}
            max={10000000}
            step="0.01"
          />
          <dl>
            <Metric
              label="Example pieces"
              value={result ? num(result.pieces) : "—"}
            />
            <Metric
              label="Furniture + finish surcharge"
              value={result ? money(result.subtotal) : "—"}
            />
            <Metric
              label="Delivery added once"
              value={result ? money(result.delivery) : "—"}
            />
            <Metric
              label="Illustrative set total"
              value={result ? money(result.total) : "—"}
            />
          </dl>
          <Outcome error={error}>
            {result
              ? result.pieces === 0
                ? "Choose at least one piece to build the set. No delivery is added to an empty set."
                : `Local estimate ${money(result.total)}. No quotation is saved.`
              : ""}
          </Outcome>
          <Note>
            Example prices and delivery only. No tax, discount, lead time or
            stock availability is inferred.
          </Note>
        </aside>
      </div>
    </>
  );
}
const dateStates: Record<string, string> = {
  past: "Date label passed",
  today: "Matches reference date",
  window: "Inside example window",
  later: "Beyond example window",
};
function GroceryWorkspace() {
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
        : "Use valid example dates and a review window.";
  }
  const rows = batches
    .map((row, i) => ({ ...row, calculated: result?.[i] }))
    .filter((row) => filter === "all" || row.calculated?.state === filter);
  return (
    <>
      <div className={css.workspaceToolbar}>
        <Badge>Four fictional batches · calendar dates only</Badge>
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
          <span>Example reference date</span>
          <input
            type="date"
            min="2000-01-01"
            max="2100-12-31"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
          />
        </label>
        <Numeric
          label="Example review window · calendar days"
          raw={window}
          onChange={setWindow}
          max={365}
        />
        <label className={css.field}>
          <span>Show date labels</span>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All batches</option>
            <option value="past">Date label passed</option>
            <option value="today">Matches reference</option>
            <option value="window">Inside example window</option>
            <option value="later">Beyond example window</option>
          </select>
        </label>
      </div>
      <dl className={css.batchMetrics}>
        <Metric
          label="Date labels before reference"
          value={result ? result.filter((r) => r.state === "past").length : "—"}
        />
        <Metric
          label="Date labels matching reference"
          value={
            result ? result.filter((r) => r.state === "today").length : "—"
          }
        />
        <Metric
          label="Future dates inside window"
          value={
            result ? result.filter((r) => r.state === "window").length : "—"
          }
        />
      </dl>
      <div
        className={css.tableScroll}
        tabIndex={0}
        role="region"
        aria-label="Illustrative batch date review, scroll horizontally"
      >
        <table>
          <caption className={css.srOnly}>
            Fictional batch dates compared with an entered reference date
          </caption>
          <thead>
            <tr>
              {[
                "Fictional item / batch",
                "Example units",
                "Recorded date",
                "Day difference",
                "Date observation",
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
                      ? dateStates[row.calculated.state]
                      : "Check inputs"}
                  </span>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={5}>
                  No fictional batches match this date filter.
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
        These are arithmetic observations only. Storage conditions, actual shelf
        life and food-safety decisions are outside this example; no inventory is
        changed.
      </Note>
    </>
  );
}
function HardwareWorkspace() {
  const [target, setTarget] = useState("240"),
    [onHand, setOnHand] = useState("65"),
    [pack, setPack] = useState("50");
  let result: ReturnType<typeof purchasePacks> | null = null,
    error = "";
  try {
    result = purchasePacks(value(target), value(onHand), value(pack));
  } catch (e) {
    error =
      e instanceof Error ? e.message : "Enter valid whole-unit quantities.";
  }
  return (
    <>
      <div className={css.workspaceToolbar}>
        <Badge>EX-H01 · fictional fixing / units only</Badge>
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
            label="Entered target · individual units"
            raw={target}
            onChange={setTarget}
          />
          <Numeric
            label="Example on hand · individual units"
            raw={onHand}
            onChange={setOnHand}
          />
          <Numeric
            label="Entered purchase-pack size · units"
            raw={pack}
            onChange={setPack}
            min={1}
          />
          <Note>
            All inputs are whole units. Pack size must be positive; the target
            can be zero.
          </Note>
        </div>
        <section
          className={css.packResult}
          aria-label="Local whole-pack calculation"
        >
          <span>WHOLE PACKS / VISIBLE REMAINDER</span>
          <h3>
            {result ? num(result.packs) : "—"}
            <small>packs needed</small>
          </h3>
          <div className={css.packFlow}>
            <span>
              {result ? num(result.shortage) : "—"}
              <small>units short</small>
            </span>
            <ArrowRight size={16} aria-hidden="true" />
            <span>
              {result ? num(result.incoming) : "—"}
              <small>incoming units</small>
            </span>
          </div>
          <dl className={css.metrics}>
            <Metric
              label="Example units after purchase packs"
              value={result ? num(result.after) : "—"}
            />
            <Metric
              label="Units remaining beyond target"
              value={result ? num(result.remaining) : "—"}
            />
          </dl>
          <Outcome error={error}>
            {result
              ? result.packs === 0
                ? "Example on-hand units already cover the target; no packs are needed."
                : `${result.packs} whole packs cover the ${result.shortage}-unit shortage.`
              : ""}
          </Outcome>
          <Note>
            Local arithmetic only. No supplier price, availability or purchase
            order is implied.
          </Note>
        </section>
      </div>
    </>
  );
}
function ToyWorkspace() {
  const [selected, setSelected] = useState([true, false, true]),
    [wrap, setWrap] = useState(false),
    [wrapAmount, setWrapAmount] = useState("150"),
    [budget, setBudget] = useState("2000");
  let result: ReturnType<typeof giftBudget> | null = null,
    error = "";
  try {
    result = giftBudget(
      toys.map((row, i) => ({
        price: row.price,
        quantity: selected[i] ? 1 : 0,
      })),
      wrap ? value(wrapAmount) : 0,
      value(budget),
    );
  } catch (e) {
    error =
      e instanceof Error ? e.message : "Use valid example budget amounts.";
  }
  return (
    <>
      <div className={css.workspaceToolbar}>
        <Badge>Fictional toy collection · BDT</Badge>
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
          {toys.map((row, i) => (
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
                  {selected[i] ? "Selected" : "Add to example"}
                </span>
                <b>{row.name}</b>
                <small>{row.detail}</small>
                <strong>{money(row.price)}</strong>
              </span>
            </label>
          ))}
        </div>
        <aside className={css.giftReceipt}>
          <span>A LITTLE GIFT, CONSIDERED</span>
          <h3>Keep the budget in the picture.</h3>
          <Numeric
            label="Entered gift budget · BDT"
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
            Include an illustrative gift-wrap charge
          </label>
          {wrap && (
            <Numeric
              label="Entered gift-wrap amount · BDT"
              raw={wrapAmount}
              onChange={setWrapAmount}
              max={10000000}
              step="0.01"
            />
          )}
          <dl className={css.metrics}>
            <Metric
              label="Example gift total"
              value={result ? money(result.total) : "—"}
            />
            <Metric
              label={
                result && result.remaining < 0
                  ? "Over entered budget"
                  : "Remaining budget"
              }
              value={result ? money(Math.abs(result.remaining)) : "—"}
            />
          </dl>
          <Outcome error={error}>
            {result
              ? result.remaining < 0
                ? `The example is ${money(-result.remaining)} over the entered budget.`
                : `The example leaves ${money(result.remaining)} of the entered budget.`
              : ""}
          </Outcome>
          <Note>
            No age/safety guidance, live stock check, payment or reservation is
            provided.
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
  const p = pages[slug],
    Workspace = workspaces[slug];
  return (
    <section className={css.workspaceSection} id="retail-workspace">
      <div className={css.wrap}>
        <div className={css.sectionHeading}>
          <p className={css.eyebrow}>TRY A SMALL PART OF THE WORK</p>
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
