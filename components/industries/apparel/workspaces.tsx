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
  const [index, setIndex] = useState(0);
  const p = pages[slug],
    stage = p.stages[index];
  return (
    <section className={css.storySection}>
      <div className={css.wrap}>
        <div className={css.sectionHeading}>
          <div>
            <p className={css.eyebrow}>THE WORKFLOW, IN CONTEXT</p>
            <h2>{p.story}</h2>
          </div>
        </div>
        <div
          className={css.stageChoices}
          role="group"
          aria-label="Choose an operational perspective"
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
  const [quantity, setQuantity] = useState("3000");
  const [ratios, setRatios] = useState(() =>
    sizes.map((row) => String(row.ratio)),
  );
  let result: number[] | null = null;
  let error = "";
  try {
    result = sizeBreakdown(number(quantity), ratios.map(number));
  } catch (e) {
    error = e instanceof Error ? e.message : "Use valid example quantities.";
  }
  return (
    <>
      <div className={css.toolbar}>
        <Badge>EX-ORDER-01 · fictional size breakdown</Badge>
        <button
          type="button"
          className={css.button}
          onClick={() => {
            setQuantity("3000");
            setRatios(sizes.map((row) => String(row.ratio)));
          }}
        >
          <RotateCcw size={14} />
          Reset breakdown
        </button>
      </div>
      <div className={css.garmentsDemo}>
        <div>
          <Numeric
            label="Example order quantity · pieces"
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
            Ratio units are whole non-negative numbers. At least one must be
            positive. All figures belong only to this local example.
          </Note>
        </div>
        <section className={css.sizeResult} aria-label="Local size allocation">
          <span>THE ORDER, DIVIDED INTO WHOLE PIECES</span>
          <h3>A breakdown that adds up.</h3>
          <div className={css.sizeColumns}>
            {sizes.map((row, i) => (
              <div key={row.label}>
                <span>{row.label}</span>
                <strong>{result ? num(result[i]) : "—"}</strong>
                <small>example pieces</small>
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
              `Allocated ${num(result!.reduce((sum, value) => sum + value, 0))} of ${num(number(quantity))} example pieces.`}
          </div>
          <Note>
            Largest-remainder rounding preserves the total. This does not save
            an order, reserve fabric or create a marker/cutting plan.
          </Note>
        </section>
      </div>
    </>
  );
}
function AccessoriesDemo() {
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
    error = e instanceof Error ? e.message : "Use valid example counts.";
  }
  function update(index: number, key: "perPiece" | "stock", value: string) {
    setEntries((prev) =>
      prev.map((row, i) => (i === index ? { ...row, [key]: value } : row)),
    );
  }
  return (
    <>
      <div className={css.toolbar}>
        <Badge>Fictional trims · all counts in pieces</Badge>
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
          Reset requirement
        </button>
      </div>
      <div className={css.accessorySettings}>
        <Numeric
          label="Example order quantity · garments"
          value={quantity}
          onChange={setQuantity}
          min={1}
        />
        <Numeric
          label="Entered extra allowance · %"
          value={allowance}
          onChange={setAllowance}
          max={100}
          step="0.01"
        />
        <div className={css.gapMetric}>
          <span>Example lines with a shortfall</span>
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
        aria-label="Editable trim requirements, scroll horizontally"
      >
        <table>
          <caption className={css.srOnly}>
            Illustrative accessory requirements in whole pieces
          </caption>
          <thead>
            <tr>
              {[
                "Example item",
                "Pieces / garment",
                "Example stock · pcs",
                "Required · pcs",
                "Short · pcs",
                "Spare · pcs",
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
                    <span className={css.srOnly}>{row.name} per garment</span>
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
                    <span className={css.srOnly}>{row.name} example stock</span>
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
        Required pieces = order quantity × entered count × entered allowance
        factor, rounded up to a whole piece. The allowance is an assumption, not
        a standard; no purchasing or stock action is performed.
      </Note>
    </>
  );
}
function BuyingDemo() {
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
        : { mode, quantity: number(quantity), fee: number(fee) },
    );
  } catch (e) {
    error =
      e instanceof Error ? e.message : "Use valid example prices and quantity.";
  }
  return (
    <>
      <div className={css.toolbar}>
        <Badge>Illustrative settlement · USD only</Badge>
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
          Reset commercial example
        </button>
      </div>
      <div
        className={css.settlementChoices}
        role="group"
        aria-label="Example settlement model"
      >
        <button
          type="button"
          aria-pressed={mode === "margin"}
          onClick={() => setMode("margin")}
        >
          Margin trading
        </button>
        <button
          type="button"
          aria-pressed={mode === "commission"}
          onClick={() => setMode("commission")}
        >
          Commission fee
        </button>
      </div>
      <div className={css.buyingDemo}>
        <div>
          <Numeric
            label="Example quantity · pieces"
            value={quantity}
            onChange={setQuantity}
            min={1}
          />
          <div className={css.commercialFields}>
            {mode === "margin" ? (
              <>
                <Numeric
                  label="Entered selling price / pc · USD"
                  value={selling}
                  onChange={setSelling}
                  step="0.01"
                />
                <Numeric
                  label="Entered purchase cost / pc · USD"
                  value={buying}
                  onChange={setBuying}
                  step="0.01"
                />
              </>
            ) : (
              <Numeric
                label="Entered commission fee / pc · USD"
                value={fee}
                onChange={setFee}
                step="0.01"
              />
            )}
          </div>
          <Note>
            Prices/fees are rounded to cents before quantity multiplication. No
            exchange rate, tax rule, invoice or buyer/factory contract is
            inferred.
          </Note>
        </div>
        <section
          className={css.commercialResult}
          aria-label="Local commercial model result"
        >
          <span>
            {mode === "margin"
              ? "THE TRADING CONVERSATION"
              : "THE FEE CONVERSATION"}
          </span>
          <h3>
            {mode === "margin"
              ? "Keep sales and purchase cost together."
              : "A fee is its own commercial record."}
          </h3>
          <dl className={css.metrics}>
            <Metric
              label={
                mode === "margin"
                  ? "Example selling value"
                  : "Example gross commission fees"
              }
              value={result ? money(result.revenue) : "—"}
            />
            <Metric
              label={
                mode === "margin" ? "Example purchase cost" : "Operating costs"
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
                  ? "Difference before other costs"
                  : "Net result"
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
                mode === "margin" ? "Difference / selling value" : "Net margin"
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
                ? "The trading difference excludes other business costs."
                : "Commission mode calculates fees only. Unknown operating costs are not treated as zero.")}
          </p>
        </section>
      </div>
    </>
  );
}
function MerchandisingDemo() {
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
      e instanceof Error ? e.message : "Use valid example dates and offsets.";
  }
  return (
    <>
      <div className={css.toolbar}>
        <Badge>Fictional calendar-day planning exercise</Badge>
        <button
          type="button"
          className={css.button}
          onClick={() => {
            setPcd(examplePcd);
            setOffsets(milestones.map((row) => String(row.days)));
          }}
        >
          <RotateCcw size={14} />
          Reset dates
        </button>
      </div>
      <div className={css.dateDemo}>
        <div className={css.dateInputs}>
          <label className={css.field}>
            <span>Example planned cutting date</span>
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
            Offsets are whole calendar days from 0 to 365. Weekends, holidays,
            capacity and dependencies are not modelled; the offsets are not
            recommended lead times.
          </Note>
        </div>
        <section
          className={css.dateResults}
          aria-label="Local milestone date results"
        >
          <span>WORK BACK FROM THE EXAMPLE PCD</span>
          <h3>A date conversation with the assumptions visible.</h3>
          <ol>
            {milestones.map((row, i) => (
              <li key={row.id}>
                <span>0{i + 1}</span>
                <div>
                  <b>{row.name}</b>
                  <small>
                    {result
                      ? `${offsets[i]} calendar days before PCD`
                      : "Check the entered example"}
                  </small>
                </div>
                <strong>{result ? dateLabel(result[i]) : "—"}</strong>
              </li>
            ))}
          </ol>
          <p className={css.resultMessage} role="status" data-warning={!!error}>
            {error ||
              "These dates update only this example. No TNA milestone, booking or production plan is saved."}
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
  const p = pages[slug];
  const Demo = demos[slug];
  return (
    <section className={css.demoSection} id="industry-demo">
      <div className={css.wrap}>
        <div className={css.sectionHeading}>
          <div>
            <p className={css.eyebrow}>EXPLORE A SMALL PART OF THE WORK</p>
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
