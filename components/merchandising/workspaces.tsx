"use client";

import { useState } from "react";
import { Check, LockKeyhole, Search } from "lucide-react";
import { compareDates, marginScenario, remainingDays } from "./calculations";
import {
  bdt,
  contract,
  dateLabel,
  factories,
  materials,
  milestones,
  num,
  owners,
  pages,
  portalUsers,
  production,
  profits,
  profitSummary,
  receipts,
  styles,
  usd,
  type MerchandisingSlug,
} from "./data";
import {
  Badge,
  Field,
  Garment,
  Metric,
  Notice,
  Panel,
  Progress,
  Tag,
  css,
} from "./ui";

function Toggle({
  value,
  setValue,
  items,
  label,
}: {
  value: string;
  setValue: (value: string) => void;
  items: [string, string][];
  label: string;
}) {
  return (
    <div className={css.toggle} role="group" aria-label={label}>
      {items.map(([id, name]) => (
        <button
          type="button"
          key={id}
          aria-pressed={value === id}
          onClick={() => setValue(id)}
        >
          {name}
        </button>
      ))}
    </div>
  );
}
function SearchField({
  value,
  onChange,
  label,
}: {
  value: string;
  onChange: (value: string) => void;
  label: string;
}) {
  return (
    <label className={css.search}>
      <Search size={16} aria-hidden="true" />
      <span className={css.srOnly}>{label}</span>
      <input
        type="search"
        value={value}
        placeholder={label}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}
function Numeric({
  label,
  value,
  onChange,
  integer = false,
  max = 1000000,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  integer?: boolean;
  max?: number;
}) {
  return (
    <Field label={label}>
      <input
        type="number"
        min="0"
        max={max}
        step={integer ? "1" : "0.01"}
        inputMode={integer ? "numeric" : "decimal"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </Field>
  );
}
const numeric = (value: string, integer = false) =>
  value.trim() !== "" &&
  Number.isFinite(Number(value)) &&
  Number(value) >= 0 &&
  Number(value) <= 1000000 &&
  (!integer || Number.isInteger(Number(value)));
function MarginInputs({
  price,
  cost,
  qty,
  setPrice,
  setCost,
  setQty,
}: {
  price: string;
  cost: string;
  qty: string;
  setPrice: (v: string) => void;
  setCost: (v: string) => void;
  setQty: (v: string) => void;
}) {
  const valid =
    numeric(price) &&
    Number(price) >= 0.01 &&
    numeric(cost) &&
    numeric(qty, true) &&
    Number(qty) > 0;
  const result = valid
    ? marginScenario(Number(price), Number(cost), Number(qty))
    : null;
  return (
    <>
      <Badge local>Illustrative USD scenario</Badge>
      <div className={css.formGrid}>
        <Numeric
          label="Selling price / pc · USD"
          value={price}
          onChange={setPrice}
        />
        <Numeric label="Cost / pc · USD" value={cost} onChange={setCost} />
        <Numeric
          label="Example quantity · pieces"
          value={qty}
          onChange={setQty}
          integer
        />
      </div>
      <div className={css.scenarioResult} role="status">
        <span>Calculated margin</span>
        <strong>{result ? `${result.margin.toFixed(2)}%` : "—"}</strong>
        <p>
          {result
            ? `${usd(result.net)} contribution on ${usd(result.revenue)} sales in this local exercise.`
            : "Enter a price of at least USD 0.01, a positive whole quantity and a non-negative cost (maximum 1,000,000 per field)."}
        </p>
      </div>
      <Notice>
        Order-currency arithmetic only. No exchange rate, document posting or
        source-sheet update is inferred.
      </Notice>
    </>
  );
}

function DashboardWorkspace() {
  const [view, setView] = useState("risk");
  const risks = [
    {
      id: "000001",
      style: "6026",
      ship: "18 Aug",
      reason: "12 material shortages · 1st PO delivery +42 d",
    },
    {
      id: "000002",
      style: "6070",
      ship: "08 Sep",
      reason: "Ship date passed · source alert",
    },
    {
      id: "000003",
      style: "8010",
      ship: "17 Sep",
      reason: "On-board (B/L date) +12 d",
    },
    {
      id: "000004",
      style: "5343",
      ship: "22 Sep",
      reason: "Fabric in-house +57 d",
    },
  ];
  return (
    <>
      <div className={css.toolbar}>
        <Badge>4 November 2026 · historical brief</Badge>
        <Toggle
          value={view}
          setValue={setView}
          label="Dashboard evidence view"
          items={[
            ["risk", "Order risks"],
            ["owners", "Action owners"],
            ["materials", "Material gaps"],
          ]}
        />
      </div>
      <dl className={css.metrics}>
        <Metric label="Open orders" value="16" detail="USD 1,826,227" />
        <Metric
          label="Orders at risk"
          value="14"
          detail="3 shipping within 14 d · source"
        />
        <Metric
          label="TNA milestones late"
          value="64"
          detail="7 due within 7 d · source"
        />
        <Metric
          label="Open shipments"
          value="3"
          detail="3 due within 14 d · source"
        />
      </dl>
      {view === "risk" ? (
        <div className={css.riskList}>
          {risks.map((row) => (
            <article key={row.id}>
              <span className={css.riskIndex}>{row.style}</span>
              <div>
                <b>{contract(row.id)}</b>
                <p>{row.reason}</p>
              </div>
              <Tag tone="red">Ship {row.ship}</Tag>
            </article>
          ))}
        </div>
      ) : view === "owners" ? (
        <div className={css.ownerChart}>
          {owners.map((row) => (
            <div key={row.name}>
              <span>{row.name}</span>
              <div>
                <i style={{ width: `${(row.late / 21) * 100}%` }} />
              </div>
              <b>{row.late} late</b>
              <small>max +{row.delay} d</small>
            </div>
          ))}
        </div>
      ) : (
        <div className={css.gapGrid}>
          <Panel title="8 orders with shortages">
            <strong className={css.resultNumber}>8</strong>
            <p>Inside 14 days of PCD in the source brief.</p>
          </Panel>
          <Panel title="Missing a material plan">
            <strong className={css.resultNumber}>3</strong>
            <p>
              The source also reports three orders without a plan. They are not
              counted as known zero shortages.
            </p>
          </Panel>
        </div>
      )}
      <Notice>
        Source excerpt only: four risk rows are fully visible. Aggregate
        counters describe the wider order book, not just the displayed rows.
      </Notice>
    </>
  );
}
function StylesWorkspace() {
  const [search, setSearch] = useState("");
  const [id, setId] = useState("8010");
  const [price, setPrice] = useState("16.40");
  const [cost, setCost] = useState("15.02");
  const [qty, setQty] = useState("1");
  const filtered = styles.filter((row) =>
    `${row.id} ${row.name} ${row.buyer}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );
  const selected = filtered.find((row) => row.id === id) ?? filtered[0];
  return (
    <div className={css.styleWorkspace}>
      <div>
        <SearchField
          value={search}
          onChange={setSearch}
          label="Search style, buyer or reference"
        />
        <div className={css.styleList}>
          {filtered.map((row) => (
            <button
              key={row.id}
              aria-pressed={selected?.id === row.id}
              onClick={() => {
                setId(row.id);
                setPrice(row.fob?.toFixed(2) ?? "");
                setCost(row.cost?.toFixed(2) ?? "");
              }}
            >
              <span className={css.styleThumb}>
                <Garment jacket={row.id.startsWith("26")} />
              </span>
              <span>
                <b>
                  {row.id} · {row.name}
                </b>
                <small>{row.buyer}</small>
                <Tag
                  tone={
                    row.status === "Confirmed"
                      ? "green"
                      : row.status === "In production"
                        ? "amber"
                        : "blue"
                  }
                >
                  {row.status}
                </Tag>
              </span>
            </button>
          ))}
        </div>
        {!filtered.length && (
          <p className={css.empty}>No matching source styles.</p>
        )}
        {selected && (
          <div className={css.styleEvidence}>
            <b>
              {selected.id} · {selected.season}
            </b>
            <dl className={css.metrics}>
              <Metric
                label="Source cost / pc"
                value={
                  selected.cost === null ? "Not shown" : usd(selected.cost)
                }
              />
              <Metric
                label="Source margin"
                value={
                  selected.margin === null
                    ? "Not shown"
                    : `${selected.margin.toFixed(1)}%`
                }
              />
              <Metric
                label="Samples / approvals"
                value={`${selected.samples} / ${selected.approvals}`}
              />
            </dl>
            <p>
              Source style 26002 shows 9.1% with rounded cost and FOB. Source
              margins are preserved; hidden precision is not reconstructed.
            </p>
          </div>
        )}
      </div>
      <Panel title="A separate cost conversation">
        <MarginInputs
          price={price}
          cost={cost}
          qty={qty}
          setPrice={setPrice}
          setCost={setCost}
          setQty={setQty}
        />
      </Panel>
    </div>
  );
}
function TnaWorkspace() {
  const [view, setView] = useState("calendar");
  const [id, setId] = useState("2");
  const [plan, setPlan] = useState("2026-10-02");
  const [actual, setActual] = useState("2026-10-04");
  const [wall, setWall] = useState("");
  let result: ReturnType<typeof compareDates> | null = null;
  let error = "";
  try {
    if (plan && actual) result = compareDates(plan, actual, wall || undefined);
    else error = "Choose a plan and comparison date.";
  } catch (e) {
    error = e instanceof Error ? e.message : "Choose valid dates.";
  }
  return (
    <>
      <div className={css.toolbar}>
        <Tag>Source order · SC-2026-000017 · 0 of 30 done</Tag>
        <Toggle
          value={view}
          setValue={setView}
          label="Milestone display"
          items={[
            ["calendar", "Date cards"],
            ["matrix", "Source matrix"],
          ]}
        />
      </div>
      <div className={css.tnaWorkspace}>
        <div>
          {view === "calendar" ? (
            <div className={css.dateCards}>
              {milestones.map((row) => (
                <button
                  type="button"
                  key={row.id}
                  aria-pressed={id === String(row.id)}
                  onClick={() => {
                    setId(String(row.id));
                    setPlan(row.plan);
                    setActual("");
                  }}
                >
                  <span>{dateLabel(row.plan)}</span>
                  <b>{row.name}</b>
                  <Tag>{row.kind}</Tag>
                  <small>{row.status} · source label</small>
                </button>
              ))}
            </div>
          ) : (
            <div
              className={css.tableScroll}
              tabIndex={0}
              role="region"
              aria-label="Source milestone matrix, scroll horizontally"
            >
              <table>
                <caption className={css.srOnly}>
                  Seven visible source milestones, all owned by Merchandiser
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Milestone</th>
                    <th scope="col">Plan</th>
                    <th scope="col">Kind</th>
                    <th scope="col">Source status</th>
                  </tr>
                </thead>
                <tbody>
                  {milestones.map((row) => (
                    <tr key={row.id}>
                      <td>{row.name}</td>
                      <td>{dateLabel(row.plan)}</td>
                      <td>{row.kind}</td>
                      <td>{row.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <Notice>
            All seven visible rows are owned by Merchandiser. Their wall/actual
            fields are blank. Source statuses are not recalculated against
            today.
          </Notice>
        </div>
        <Panel title="Local date comparison">
          <Badge local />
          <div className={css.formGrid}>
            <Field label="Plan date">
              <input
                type="date"
                min="2000-01-01"
                max="2100-12-31"
                value={plan}
                onChange={(e) => setPlan(e.target.value)}
              />
            </Field>
            <Field label="Actual / comparison date">
              <input
                type="date"
                min="2000-01-01"
                max="2100-12-31"
                value={actual}
                onChange={(e) => setActual(e.target.value)}
              />
            </Field>
            <Field label="Buyer wall date · optional">
              <input
                type="date"
                min="2000-01-01"
                max="2100-12-31"
                value={wall}
                onChange={(e) => setWall(e.target.value)}
              />
            </Field>
          </div>
          <div className={css.scenarioResult} role="status">
            <span>Difference from plan</span>
            <strong>
              {result ? `${result.delay > 0 ? "+" : ""}${result.delay} d` : "—"}
            </strong>
            <p>
              {result
                ? result.delay > 0
                  ? "Comparison date is after the plan."
                  : result.delay < 0
                    ? "Comparison date is before the plan."
                    : "Comparison date matches the plan."
                : error}
            </p>
            {result?.wallDelay !== null && result && (
              <p>Difference from wall date: {result.wallDelay} d.</p>
            )}
          </div>
          <Notice>
            The example dates are local inputs. They do not update the selected
            milestone or the 64-late source aggregate.
          </Notice>
        </Panel>
      </div>
    </>
  );
}
function MaterialsWorkspace() {
  const [search, setSearch] = useState("");
  const [shortOnly, setShortOnly] = useState(false);
  const [id, setId] = useState("000001");
  const filtered = materials.filter(
    (row) =>
      `${row.id} ${row.style} ${row.name} ${row.buyer}`
        .toLowerCase()
        .includes(search.toLowerCase()) &&
      (!shortOnly || row.short === null || row.short > 0),
  );
  const selected = filtered.find((row) => row.id === id) ?? filtered[0];
  return (
    <>
      <div className={css.toolbar}>
        <SearchField
          value={search}
          onChange={setSearch}
          label="Find order, style or buyer"
        />
        <label className={css.checkbox}>
          <input
            type="checkbox"
            checked={shortOnly}
            onChange={(e) => setShortOnly(e.target.checked)}
          />
          Short or missing plan only
        </label>
      </div>
      <div className={css.materialWorkspace}>
        <div className={css.orderList}>
          {filtered.map((row) => (
            <button
              key={row.id}
              aria-pressed={selected?.id === row.id}
              onClick={() => setId(row.id)}
            >
              <span>
                <b>{contract(row.id)}</b>
                <small>
                  {row.style} · {row.name}
                </small>
              </span>
              <Tag
                tone={
                  row.short === null ? "amber" : row.short > 0 ? "red" : "green"
                }
              >
                {row.short === null ? "No plan" : `${row.short} short`}
              </Tag>
            </button>
          ))}
          {!filtered.length && (
            <p className={css.empty}>No source orders match these filters.</p>
          )}
        </div>
        {selected ? (
          <Panel title={`Style ${selected.style} · readiness`}>
            <Tag>{contract(selected.id)}</Tag>
            <p className={css.detailText}>
              {selected.buyer}
              <br />
              {num(selected.qty)} pieces ordered
            </p>
            {selected.lines === null ? (
              <div className={css.noPlan}>
                <LayersMark />
                <b>No material plan shown</b>
                <p>Booked, in-house and shortage counts remain unknown.</p>
              </div>
            ) : (
              <>
                <Progress
                  label="Material lines booked"
                  value={selected.booked!}
                  total={selected.lines}
                />
                <Progress
                  label="Material lines in-house"
                  value={selected.inHouse!}
                  total={selected.lines}
                  green
                />
              </>
            )}
            <dl className={css.metrics}>
              <Metric
                label="Fabric in-house due"
                value={dateLabel(selected.due)}
              />
              <Metric label="PCD · source" value={dateLabel(selected.pcd)} />
            </dl>
            <Notice>
              Line counts are not material-unit quantities. Dates are preserved
              exactly as supplied, including any source sequencing
              inconsistencies.
            </Notice>
          </Panel>
        ) : (
          <p className={css.empty}>Clear a filter to inspect a source order.</p>
        )}
      </div>
    </>
  );
}
function LayersMark() {
  return <span className={css.unknownMark}>?</span>;
}
function ProductionWorkspace() {
  const [own, setOwn] = useState(false);
  const [id, setId] = useState("000004");
  const [pace, setPace] = useState("500");
  const filtered = production.filter(
    (row) => !own || row.factory === "Own floor",
  );
  const selected = filtered.find((row) => row.id === id) ?? filtered[0];
  const result = numeric(pace, true)
    ? remainingDays(selected.qty, selected.sewn, Number(pace))
    : null;
  return (
    <>
      <div className={css.toolbar}>
        <Field label="Supplied production order">
          <select value={selected.id} onChange={(e) => setId(e.target.value)}>
            {filtered.map((row) => (
              <option key={row.id} value={row.id}>
                {contract(row.id)} · style {row.style}
              </option>
            ))}
          </select>
        </Field>
        <label className={css.checkbox}>
          <input
            type="checkbox"
            checked={own}
            onChange={(e) => setOwn(e.target.checked)}
          />
          Own floor only
        </label>
      </div>
      <div className={css.productionWorkspace}>
        <div>
          <div className={css.selectedOrder}>
            <div>
              <span>{selected.factory}</span>
              <h3>{selected.name}</h3>
            </div>
            <Tag tone={selected.status === "Behind plan" ? "red" : "green"}>
              {selected.status}
            </Tag>
          </div>
          <Progress
            label="Sewn · source quantity"
            value={selected.sewn}
            total={selected.qty}
          />
          <Progress
            label="Packed · source quantity"
            value={selected.packed}
            total={selected.qty}
            green
          />
          <dl className={css.metrics}>
            <Metric
              label="Raw sewn completion"
              value={`${((selected.sewn / selected.qty) * 100).toFixed(1)}%`}
            />
            <Metric
              label="Raw packed completion"
              value={`${((selected.packed / selected.qty) * 100).toFixed(1)}%`}
            />
            <Metric label="Source ship date" value={selected.ship} />
          </dl>
          <Notice>
            Over-completion is preserved in the numbers; only the decorative bar
            is capped. Source status is not inferred from these ratios.
          </Notice>
        </div>
        <Panel title="What would the remaining work take?">
          <Badge local>Illustrative sewing pace</Badge>
          <Numeric
            label="Assumed sewn pieces / working day"
            value={pace}
            onChange={setPace}
            integer
          />
          <div className={css.scenarioResult} role="status">
            <span>
              Remaining sewing · {result ? num(result.remaining) : "—"} pieces
            </span>
            <strong>
              {result?.days === null || !result
                ? "—"
                : `${result.days.toFixed(2)} d`}
            </strong>
            <p>
              {!result
                ? "Enter whole pieces per day from 0 to 1,000,000."
                : result.days === null
                  ? "A positive pace is needed to estimate duration."
                  : result.remaining === 0
                    ? "No remaining sewing against the ordered quantity."
                    : `${Math.ceil(result.days)} whole working days at the entered pace.`}
            </p>
          </div>
          <Notice>
            This is not a predicted shipment date. Packing, shifts, holidays and
            a real run rate are not supplied.
          </Notice>
        </Panel>
      </div>
    </>
  );
}
function FactoriesWorkspace() {
  const [id, setId] = useState("mymensingh");
  const [pace, setPace] = useState("4200");
  const selected = factories.find((row) => row.id === id)!;
  const result = numeric(pace, true)
    ? remainingDays(selected.wip, 0, Number(pace))
    : null;
  return (
    <div className={css.factoryWorkspace}>
      <div>
        <Toggle
          value={id}
          setValue={(value) => {
            setId(value);
            setPace(
              String(factories.find((row) => row.id === value)!.capacity),
            );
          }}
          label="Factory dossier"
          items={factories.map((row) => [
            row.id,
            row.id === "savar" ? "Savar" : "Mymensingh",
          ])}
        />
        <div className={css.factoryProfile}>
          <span>SUPPLIED FACTORY PROFILE</span>
          <h3>{selected.name}</h3>
          <p>{selected.location}</p>
          <Tag>{selected.types}</Tag>
        </div>
        <dl className={css.metrics}>
          <Metric label="Production lines" value={selected.lines} />
          <Metric label="Machines" value={selected.machines} />
          <Metric label="Capacity · pcs / day" value={num(selected.capacity)} />
          <Metric label="Open orders" value={selected.orders} />
          <Metric label="Pieces in progress" value={num(selected.wip)} />
          <Metric label="Source load" value={`${selected.days.toFixed(2)} d`} />
        </dl>
        <div className={css.certificateFlags}>
          {selected.certificates.map((cert) => (
            <Tag key={cert.name} tone={cert.alert ? "red" : "green"}>
              {cert.name}
            </Tag>
          ))}
        </div>
        <Notice>
          These are source certificate flags. Expiry dates and verification
          documents were not supplied. Next ship in source: {selected.nextShip}.
        </Notice>
      </div>
      <Panel title="A simple capacity conversation">
        <Numeric
          label="Assumed capacity · pieces / day"
          value={pace}
          onChange={setPace}
          integer
        />
        <div className={css.scenarioResult} role="status">
          <span>Equivalent load on source WIP</span>
          <strong>
            {result?.days === null || !result
              ? "—"
              : `${result.days.toFixed(2)} d`}
          </strong>
          <p>
            {result?.days === null
              ? "Enter a positive capacity to calculate equivalent load."
              : !result
                ? "Use whole capacity from 0 to 1,000,000."
                : `${num(selected.wip)} pieces divided by the entered daily capacity.`}
          </p>
        </div>
        <Notice>
          Capacity division is an illustrative load measure, not a factory
          booking or a promised delivery date.
        </Notice>
      </Panel>
    </div>
  );
}
function ReceiptsWorkspace() {
  const [mode, setMode] = useState("all");
  const [id, setId] = useState(receipts[0].id);
  const filtered = receipts.filter(
    (row) => mode === "all" || row.mode === mode,
  );
  const selected = filtered.find((row) => row.id === id) ?? filtered[0];
  return (
    <>
      <div className={css.toolbar}>
        <Badge>Three supplied posted receipts</Badge>
        <Toggle
          value={mode}
          setValue={setMode}
          label="Receipt ownership mode"
          items={[
            ["all", "All receipts"],
            ["Our stock", "Our stock"],
            ["Memo", "Buyer’s goods · memo"],
          ]}
        />
      </div>
      <dl className={css.metrics}>
        <Metric
          label="Filtered source pieces"
          value={num(filtered.reduce((s, r) => s + r.qty, 0))}
        />
        <Metric
          label="Filtered cartons"
          value={num(filtered.reduce((s, r) => s + r.cartons, 0))}
        />
        <Metric label="Source drafts" value="0" />
      </dl>
      <div className={css.receiptWorkspace}>
        <div className={css.receiptList}>
          {filtered.map((row) => (
            <button
              key={row.id}
              aria-pressed={selected.id === row.id}
              onClick={() => setId(row.id)}
            >
              <span>{row.date}</span>
              <b>{row.id}</b>
              <small>{row.factory}</small>
              <div>
                <strong>{num(row.qty)} pcs</strong>
                <Tag tone={row.mode === "Memo" ? "blue" : "green"}>
                  {row.mode}
                </Tag>
              </div>
            </button>
          ))}
        </div>
        <Panel title="The receipt, in context">
          <Tag tone="green">Posted · source status</Tag>
          <h4 className={css.receiptReference}>{selected.id}</h4>
          <p className={css.detailText}>
            {selected.buyer}
            <br />
            {contract(selected.order)}
          </p>
          <dl className={css.detailList}>
            <div>
              <dt>Factory</dt>
              <dd>{selected.factory}</dd>
            </div>
            <div>
              <dt>Inspector</dt>
              <dd>{selected.inspector}</dd>
            </div>
            <div>
              <dt>Packing</dt>
              <dd>
                {num(selected.cartons)} cartons · {num(selected.qty)} pieces
              </dd>
            </div>
            <div>
              <dt>Ownership</dt>
              <dd>
                {selected.mode === "Memo"
                  ? "Memo · buyer’s goods"
                  : "Our stock"}
              </dd>
            </div>
            <div>
              <dt>Source value</dt>
              <dd>
                {selected.value === null
                  ? "Not shown"
                  : `${num(selected.value)} · currency not shown`}
              </dd>
            </div>
          </dl>
          <Notice>
            Memo values remain unknown. The visible own-stock value is not
            assigned a currency absent from its screenshot.
          </Notice>
        </Panel>
      </div>
    </>
  );
}
function ProfitWorkspace() {
  const [view, setView] = useState("aggregate");
  const [mode, setMode] = useState("all");
  const [price, setPrice] = useState("16.40");
  const [cost, setCost] = useState("15.02");
  const [qty, setQty] = useState("1000");
  const rows = profits.filter((row) => mode === "all" || row.mode === mode);
  return (
    <>
      <div className={css.toolbar}>
        <Badge>Actual aggregates · BDT</Badge>
        <Toggle
          value={view}
          setValue={setView}
          label="Profitability evidence"
          items={[
            ["aggregate", "Report totals"],
            ["orders", "Order excerpt"],
          ]}
        />
      </div>
      {view === "aggregate" ? (
        <>
          <dl className={css.metrics}>
            <Metric label="Revenue" value={bdt(profitSummary.revenue)} />
            <Metric
              label="Cost of goods shipped"
              value={bdt(profitSummary.cost)}
            />
            <Metric label="Net" value={bdt(profitSummary.net)} />
            <Metric label="Actual / quoted margin" value="30.9% / 14.3%" />
            <Metric label="Orders / pieces ordered" value="17 / 132,415" />
            <Metric
              label="Cost to date"
              value={bdt(profitSummary.costToDate)}
            />
          </dl>
          <Notice>
            Cost to date includes finished output / margin receipts, shipped or
            not. It is distinct from the cost of goods shipped and is not
            subtracted twice.
          </Notice>
        </>
      ) : (
        <>
          <Field label="Settlement mode · source excerpt">
            <select value={mode} onChange={(e) => setMode(e.target.value)}>
              <option value="all">All visible modes</option>
              <option>Own floor</option>
              <option>Commission</option>
            </select>
          </Field>
          <div
            className={css.tableScroll}
            tabIndex={0}
            role="region"
            aria-label="Profitability order excerpt, scroll horizontally"
          >
            <table>
              <caption className={css.srOnly}>
                Four visible profitability records, per-piece USD and net BDT
              </caption>
              <thead>
                <tr>
                  {[
                    "Order / style",
                    "Mode",
                    "Quoted / pc · USD",
                    "Actual / pc · USD",
                    "Actual cost / pc · USD",
                    "Source net · BDT",
                  ].map((label) => (
                    <th scope="col" key={label}>
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id}>
                    <td>
                      {contract(row.id)}
                      <small>Style {row.style}</small>
                    </td>
                    <td>{row.mode}</td>
                    <td>{row.quote.toFixed(2)}</td>
                    <td>
                      {row.actual.toFixed(2)}
                      {row.mode === "Commission" && (
                        <small>Commission fee, not FOB sales</small>
                      )}
                    </td>
                    <td>{row.actualCost?.toFixed(2) ?? "Not shown"}</td>
                    <td>{num(row.net)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Notice>
            Four-row excerpt from a 17-order report. The commission row's 0.49
            is a per-piece fee; unknown cost is not treated as zero.
          </Notice>
        </>
      )}
      <div className={css.profitScenario}>
        <div>
          <p className={css.eyebrow}>A SEPARATE COMMERCIAL EXERCISE</p>
          <h3>What changes when the cost changes?</h3>
          <p>
            Use a plain USD sales scenario to understand contribution and
            margin. This is not the actual BDT report or a commission
            calculation.
          </p>
        </div>
        <Panel title="Local selling-price and cost scenario">
          <MarginInputs
            price={price}
            cost={cost}
            qty={qty}
            setPrice={setPrice}
            setCost={setCost}
            setQty={setQty}
          />
        </Panel>
      </div>
    </>
  );
}
function PortalWorkspace() {
  const [id, setId] = useState(portalUsers[0].id);
  const [section, setSection] = useState("samples");
  const user = portalUsers.find((row) => row.id === id)!;
  const canDecide =
    user.canApprove && ["samples", "approvals"].includes(section);
  return (
    <div className={css.portalWorkspace}>
      <div>
        <Badge>4 active in summary · 3 visible user rows</Badge>
        <div className={css.portalPeople}>
          {portalUsers.map((row) => (
            <button
              key={row.id}
              aria-pressed={id === row.id}
              onClick={() => {
                setId(row.id);
                setSection("samples");
              }}
            >
              <span className={css.personInitial}>
                {row.name.slice(0, 1).toUpperCase()}
              </span>
              <span>
                <b>{row.name}</b>
                <small>{row.buyer}</small>
              </span>
              <Tag>{row.role}</Tag>
            </button>
          ))}
        </div>
        <Notice>
          The fourth active login is not visible in the supplied crop and is not
          fabricated. Contact details and sign-in credentials are not part of
          this preview.
        </Notice>
      </div>
      <Panel title="Role and section preview">
        <Tag tone="green">Active · source status</Tag>
        <h4 className={css.portalName}>{user.name}</h4>
        <Field label="Source-enabled section">
          <select value={section} onChange={(e) => setSection(e.target.value)}>
            {user.tabs.map((tab) => (
              <option key={tab} value={tab}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </option>
            ))}
          </select>
        </Field>
        <div className={css.permissionResult} role="status">
          {canDecide ? <Check size={23} /> : <LockKeyhole size={23} />}
          <strong>
            {canDecide ? "View + decision role" : "View only in this section"}
          </strong>
          <p>
            {canDecide
              ? "The source grants this Merchandiser approval capability. Samples / approvals are decision areas in this explanatory preview."
              : user.canApprove
                ? "Merchandiser approval capability does not imply editing every portal section."
                : "The supplied QA role cannot approve. This section is presented as read-only."}
          </p>
        </div>
        <dl className={css.detailList}>
          <div>
            <dt>Can approve · source</dt>
            <dd>{user.canApprove ? "Yes" : "No"}</dd>
          </div>
          <div>
            <dt>Last seen · source</dt>
            <dd>{user.lastSeen ?? "Not shown"}</dd>
          </div>
        </dl>
        <Notice>
          Explanatory UI only. No authentication, approval, reset, revoke or
          access grant is performed.
        </Notice>
      </Panel>
    </div>
  );
}
const workspaces = {
  "merchandising-dashboard": DashboardWorkspace,
  "styles-costing": StylesWorkspace,
  "tna-calendar": TnaWorkspace,
  "material-booking": MaterialsWorkspace,
  "production-follow-up": ProductionWorkspace,
  factories: FactoriesWorkspace,
  "in-house-receipts": ReceiptsWorkspace,
  profitability: ProfitWorkspace,
  "buyer-portal": PortalWorkspace,
};
export default function MerchandisingWorkspace({
  slug,
}: {
  slug: MerchandisingSlug;
}) {
  const p = pages[slug];
  const Workspace = workspaces[slug];
  return (
    <section id="merchandising-workspace" className={css.workspaceSection}>
      <div className={css.wrap}>
        <div className={css.sectionHeading}>
          <div>
            <p className={css.eyebrow}>EXPLORE THE WORKFLOW</p>
            <h2>{p.workspace}</h2>
            <p>{p.instruction}</p>
          </div>
          <Badge local>Interactive demo · not connected</Badge>
        </div>
        <div className={css.workspace}>
          <Workspace />
        </div>
      </div>
    </section>
  );
}
