"use client";

import { useState } from "react";
import {
  ArrowRight,
  Check,
  Minus,
  Plus,
  RotateCcw,
  Search,
  ShoppingBag,
} from "lucide-react";
import { allocateCost, basketTotals } from "./calculations";
import {
  locations,
  money,
  number,
  pages,
  saleSummary,
  shifts,
  stock,
  transfers,
  type PosSlug,
} from "./data";
import {
  Badge,
  Barcode,
  Button,
  Denim,
  Field,
  Note,
  Panel,
  ReceiptPaper,
  Stat,
  Tag,
  css,
} from "./ui";

function Selection({
  items,
  value,
  onChange,
  label,
}: {
  items: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  label: string;
}) {
  return (
    <div className={css.selection} role="group" aria-label={label}>
      {items.map((item) => (
        <button
          key={item.value}
          type="button"
          aria-pressed={value === item.value}
          onClick={() => onChange(item.value)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
function SearchBox({
  value,
  onChange,
  label,
}: {
  value: string;
  onChange: (value: string) => void;
  label: string;
}) {
  return (
    <label className={css.searchBox}>
      <Search size={16} aria-hidden="true" />
      <span className={css.srOnly}>{label}</span>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={label}
      />
    </label>
  );
}
function Numeric({
  label,
  value,
  onChange,
  max = 100000000,
  integer = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  max?: number;
  integer?: boolean;
}) {
  return (
    <Field label={label}>
      <input
        type="number"
        inputMode={integer ? "numeric" : "decimal"}
        min="0"
        max={max}
        step={integer ? "1" : "0.01"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </Field>
  );
}
const validAmount = (value: string, max = 100000000) =>
  value.trim() !== "" &&
  Number.isFinite(Number(value)) &&
  Number(value) >= 0 &&
  Number(value) <= max;
const validCount = (value: string, max = 100000) =>
  validAmount(value, max) && Number.isInteger(Number(value));

function RegisterWorkspace() {
  const [query, setQuery] = useState("");
  const [basket, setBasket] = useState<Record<string, number>>({
    "DH-6070": 1,
  });
  const [tender, setTender] = useState("3500");
  const [complete, setComplete] = useState(false);
  const lines = stock
    .filter((row) => basket[row.sku])
    .map((row) => ({ ...row, qty: basket[row.sku] }));
  const valid = validAmount(tender);
  const totals = basketTotals(lines, valid ? Number(tender) : 0);
  function change(sku: string, delta: number) {
    setComplete(false);
    setBasket((prev) => ({
      ...prev,
      [sku]: Math.min(999, Math.max(0, (prev[sku] ?? 0) + delta)),
    }));
  }
  return (
    <div className={css.checkoutLab}>
      <div>
        <div className={css.labToolbar}>
          <SearchBox
            value={query}
            onChange={setQuery}
            label="Search product or SKU"
          />
          <Tag>R1-BSC · example basket</Tag>
        </div>
        <div className={css.productGrid}>
          {stock
            .filter((row) =>
              `${row.sku} ${row.name}`
                .toLowerCase()
                .includes(query.toLowerCase()),
            )
            .map((row) => (
              <button
                key={row.sku}
                className={css.productButton}
                onClick={() => change(row.sku, 1)}
                aria-label={`Add ${row.name} to demo basket`}
              >
                <div className={css.productArt}>
                  <Denim top={row.sku.startsWith("LOT")} />
                  <span>
                    <Plus size={16} />
                  </span>
                </div>
                <small>{row.sku}</small>
                <b>{row.name}</b>
                <strong>{money(row.price)}</strong>
              </button>
            ))}
        </div>
        {!stock.some((row) =>
          `${row.sku} ${row.name}`.toLowerCase().includes(query.toLowerCase()),
        ) && (
          <p className={css.empty}>
            No matching products. Try “denim” or “DH-6070”.
          </p>
        )}
      </div>
      <Panel title="Your demo basket" className={css.basketPanel}>
        <div className={css.basketLines}>
          {lines.map((row) => (
            <div className={css.basketLine} key={row.sku}>
              <div>
                <b>{row.name}</b>
                <small>{money(row.price)} each</small>
              </div>
              <div className={css.qtyControls}>
                <Button
                  aria-label={`Remove one ${row.sku}`}
                  onClick={() => change(row.sku, -1)}
                >
                  <Minus size={13} />
                </Button>
                <span>{row.qty}</span>
                <Button
                  aria-label={`Add one ${row.sku}`}
                  disabled={row.qty >= 999}
                  onClick={() => change(row.sku, 1)}
                >
                  <Plus size={13} />
                </Button>
              </div>
            </div>
          ))}
          {!lines.length && (
            <p className={css.empty}>
              Your basket is empty. Add an item to begin.
            </p>
          )}
        </div>
        <dl className={css.totals}>
          <div>
            <dt>Includes VAT · 15% demo rate</dt>
            <dd>{money(totals.tax)}</dd>
          </div>
          <div>
            <dt>Total</dt>
            <dd>{money(totals.total)}</dd>
          </div>
        </dl>
        <Numeric
          label="Cash tender · BDT"
          value={tender}
          onChange={(value) => {
            setTender(value);
            setComplete(false);
          }}
        />
        <div className={css.labToolbar}>
          <Button
            onClick={() => {
              setTender(totals.total.toFixed(2));
              setComplete(false);
            }}
          >
            Exact amount
          </Button>
          <span>
            Change <b>{money(totals.change)}</b>
          </span>
        </div>
        {!valid && (
          <p role="alert" className={css.error}>
            Enter a cash amount between 0 and 100,000,000.
          </p>
        )}
        <Button
          className={css.primaryButton}
          disabled={!valid || !totals.ready || complete}
          onClick={() => setComplete(true)}
        >
          <ShoppingBag size={16} />
          {complete ? "Simulation complete" : "Simulate checkout"}
        </Button>
        <p className={css.feedback} role="status">
          {complete
            ? "Demo calculated. No payment taken, receipt saved or stock changed."
            : totals.due > 0
              ? `${money(totals.due)} still due in this exercise.`
              : "Local exercise · no sale will be created."}
        </p>
        <Button
          onClick={() => {
            setBasket({ "DH-6070": 1 });
            setTender("3500");
            setQuery("");
            setComplete(false);
          }}
        >
          <RotateCcw size={13} /> Reset basket
        </Button>
      </Panel>
    </div>
  );
}

function ShiftsWorkspace() {
  const closed = shifts.filter((row) => row.cash !== null);
  const [id, setId] = useState(closed[0].id);
  const [count, setCount] = useState("3450");
  const row = closed.find((item) => item.id === id)!;
  const valid = validAmount(count);
  const variance = valid
    ? Math.round((Number(count) - row.cash!) * 100) / 100
    : null;
  return (
    <div className={css.reconcileLab}>
      <div>
        <Field label="Supplied closed shift">
          <select
            value={id}
            onChange={(e) => {
              setId(e.target.value);
              setCount("");
            }}
          >
            {closed.map((item) => (
              <option key={item.id} value={item.id}>
                {item.id} · {item.register}
              </option>
            ))}
          </select>
        </Field>
        <div className={css.shiftIdentity}>
          <span className={css.avatar}>{row.cashier.slice(0, 1)}</span>
          <div>
            <b>{row.cashier}</b>
            <span>
              {row.opened} → {row.closed}
            </span>
          </div>
          <Tag positive>Posted source record</Tag>
        </div>
        <dl className={css.stats}>
          <Stat label="Opening float" value={money(row.float)} />
          <Stat label="Expected cash · source" value={money(row.cash!)} />
          <Stat label="Receipts" value={row.receipts} />
        </dl>
      </div>
      <Panel title="Your count, compared">
        <Numeric
          label="Locally counted cash · BDT"
          value={count}
          onChange={setCount}
        />
        <div
          className={css.varianceResult}
          data-negative={variance !== null && variance !== 0}
        >
          <span>Cash variance</span>
          <strong>{variance === null ? "—" : money(variance)}</strong>
          <p role="status">
            {variance === null
              ? "Enter a valid cash count to compare."
              : variance === 0
                ? "The local count matches expected cash."
                : variance < 0
                  ? "The local count is short of expected cash."
                  : "The local count exceeds expected cash."}
          </p>
        </div>
        <Note>
          The supplied posted shift remains unchanged. This comparison is not a
          close or a journal posting.
        </Note>
      </Panel>
    </div>
  );
}
function ReceiptsWorkspace() {
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState("inclusive");
  const match = "example-01 dh-6070 athletic fit jean denim".includes(
    query.toLowerCase(),
  );
  return (
    <div className={css.receiptLab}>
      <div>
        <Badge demo>Illustrative receipt · derived totals</Badge>
        <SearchBox
          value={query}
          onChange={setQuery}
          label="Find example receipt or product"
        />
        {match ? (
          <div className={css.receiptListItem}>
            <ReceiptPaper compact />
            <div>
              <span>EXAMPLE-01 · LOCAL DEMO</span>
              <h3>Athletic Fit Jean</h3>
              <p>DH-6070 · 1 unit · Cash</p>
              <b>{money(3450)}</b>
              <small>
                The item, tender and totals come from the supplied summary. The
                receipt identifier is illustrative.
              </small>
            </div>
          </div>
        ) : (
          <p className={css.empty}>
            No matching example. Search “DH-6070” or clear the search.
          </p>
        )}
      </div>
      <Panel title="A transparent tax breakdown">
        <Selection
          label="Price display"
          value={mode}
          onChange={setMode}
          items={[
            { value: "inclusive", label: "VAT inclusive" },
            { value: "exclusive", label: "Before VAT" },
          ]}
        />
        <dl className={css.stats}>
          <Stat
            label={
              mode === "inclusive" ? "Price including VAT" : "Price before VAT"
            }
            value={money(mode === "inclusive" ? 3450 : 3000)}
          />
          <Stat label="VAT · supplied amount" value={money(450)} />
        </dl>
        <p className={css.explainer}>
          The customer total is {money(3450)} in both views. Changing the
          display does not add VAT a second time.
        </p>
        <Barcode />
      </Panel>
    </div>
  );
}
function SummaryWorkspace() {
  const [mode, setMode] = useState("totals");
  return (
    <>
      <div className={css.labToolbar}>
        <Badge />
        <Selection
          label="Summary view"
          value={mode}
          onChange={setMode}
          items={[
            { value: "totals", label: "Closing totals" },
            { value: "bridge", label: "Explain the margin" },
          ]}
        />
      </div>
      {mode === "totals" ? (
        <dl className={css.summaryStats}>
          <Stat
            label="Gross / net sales"
            value={money(saleSummary.gross)}
            detail="No refunds or discounts in source"
          />
          <Stat label="VAT included" value={money(saleSummary.vat)} />
          <Stat label="Cost of goods" value={money(saleSummary.cost)} />
          <Stat
            label="Gross margin"
            value={money(saleSummary.margin)}
            detail="Source shows 58%"
          />
          <Stat label="Receipts / items" value="1 / 1" />
          <Stat label="Average basket" value={money(3450)} />
        </dl>
      ) : (
        <div className={css.waterfall}>
          {[
            { label: "Customer total", value: 3450, width: 100 },
            { label: "Less VAT", value: 450, width: (450 / 3450) * 100 },
            {
              label: "Less cost of goods",
              value: 1261.09,
              width: (1261.09 / 3450) * 100,
            },
            {
              label: "Gross margin",
              value: 1738.91,
              width: (1738.91 / 3450) * 100,
            },
          ].map((row, i) => (
            <div key={row.label}>
              <span>{row.label}</span>
              <div>
                <i style={{ width: `${row.width}%` }} data-result={i === 3} />
              </div>
              <b>{money(row.value)}</b>
            </div>
          ))}
        </div>
      )}
      <div className={css.summaryFoot}>
        <span>
          Cash tender <b>{money(3450)}</b>
        </span>
        <span>
          Top item <b>DH-6070 · 1 unit</b>
        </span>
        <span>
          Category <b>finished_good</b>
        </span>
      </div>
      <Note>
        No trading date or shift has been inferred from the summary selector.
        Figures reproduce the supplied snapshot.
      </Note>
    </>
  );
}
function DashboardWorkspace() {
  const [view, setView] = useState("sales");
  return (
    <>
      <div className={css.labToolbar}>
        <Tag>All outlets · supplied 14-day window</Tag>
        <Selection
          label="Dashboard evidence view"
          value={view}
          onChange={setView}
          items={[
            { value: "sales", label: "Sales evidence" },
            { value: "stock", label: "Stock cover" },
          ]}
        />
      </div>
      <dl className={css.summaryStats}>
        <Stat label="Net sales" value={money(3450)} />
        <Stat label="Receipts" value="1" detail="0 returns" />
        <Stat
          label="Gross margin"
          value={money(1738.91)}
          detail="58% as shown"
        />
      </dl>
      {view === "sales" ? (
        <div className={css.dashboardEvidence}>
          <Panel title="The complete supplied sales contribution">
            <div className={css.evidenceBar}>
              <span>DH-6070</span>
              <i />
              <b>{money(3450)}</b>
            </div>
            <p>
              One Athletic Fit Jean at R1-BSC. Cash is the only tender shown.
            </p>
            <Note>
              No daily chart is reconstructed: the screenshot does not expose
              all daily values.
            </Note>
          </Panel>
          <Panel title="From total to context">
            <dl className={css.stackedStats}>
              <Stat label="Average basket" value={money(3450)} />
              <Stat label="Average per day, as shown" value={money(246.43)} />
            </dl>
          </Panel>
        </div>
      ) : (
        <Panel title="Top item · supplied dashboard stock cover">
          <div className={css.stockCover}>
            <Denim />
            <div>
              <b>DH-6070 · Athletic Fit Jean</b>
              <p>
                On hand <strong>295</strong> · Units sold <strong>1</strong>
              </p>
              <span className={css.coverDays}>
                4,130 <small>days cover · source figure</small>
              </span>
            </div>
          </div>
          <Note>
            This dashboard snapshot reports 295 on hand. The separate
            outlet-stock screenshot reports 192; the two are not treated as the
            same balance or date.
          </Note>
        </Panel>
      )}
    </>
  );
}
function LoyaltyWorkspace() {
  const [balance, setBalance] = useState("100");
  const [redeem, setRedeem] = useState("25");
  const [rate, setRate] = useState("1");
  const valid =
    validCount(balance, 1000000) &&
    validCount(redeem, 1000000) &&
    Number(redeem) <= Number(balance) &&
    validAmount(rate, 1000) &&
    Number(rate) > 0;
  return (
    <div className={css.loyaltyLab}>
      <div>
        <Badge demo>Illustrative policy · not a customer balance</Badge>
        <h3>What would a redemption look like?</h3>
        <p className={css.explainer}>
          Set your own example balance and BDT per point. The defaults below
          illustrate the interaction; they are not Denim House's redemption
          policy.
        </p>
        <div className={css.formGrid}>
          <Numeric
            label="Example available points"
            value={balance}
            onChange={setBalance}
            max={1000000}
            integer
          />
          <Numeric
            label="Points to redeem"
            value={redeem}
            onChange={setRedeem}
            max={1000000}
            integer
          />
          <Numeric
            label="Example BDT per point"
            value={rate}
            onChange={setRate}
            max={1000}
          />
        </div>
      </div>
      <Panel title="Redemption preview">
        <span className={css.resultEyebrow}>Illustrative value</span>
        <strong className={css.largeResult}>
          {valid
            ? money(Math.round(Number(redeem) * Number(rate) * 100) / 100)
            : "—"}
        </strong>
        <p role="status">
          {valid
            ? `${number(Number(balance) - Number(redeem))} example points would remain.`
            : "Use whole non-negative points, a positive rate, and redeem no more than the available balance."}
        </p>
        <div className={css.paperRule} />
        <p>
          No points are redeemed and no voucher is issued. Customer identities
          and voucher codes were not supplied.
        </p>
      </Panel>
    </div>
  );
}
function TransfersWorkspace() {
  const [id, setId] = useState(transfers[0].id);
  const [received, setReceived] = useState("27");
  const row = transfers.find((item) => item.id === id)!;
  const valid = validCount(received);
  return (
    <div className={css.transferLab}>
      <div>
        <Field label="Supplied received transfer">
          <select
            value={id}
            onChange={(e) => {
              setId(e.target.value);
              setReceived("");
            }}
          >
            {transfers.map((item) => (
              <option key={item.id} value={item.id}>
                {item.id} · {item.to}
              </option>
            ))}
          </select>
        </Field>
        <div className={css.transferRoute}>
          <div>
            <span>FG</span>
            <b>Finished Goods</b>
            <small>Sent {row.sent}</small>
          </div>
          <ArrowRight size={23} />
          <div>
            <span>{row.to}</span>
            <b>{row.outlet}</b>
            <small>Received {row.received}</small>
          </div>
        </div>
        <dl className={css.stats}>
          <Stat label="Sent quantity" value={row.qty} />
          <Stat label="Sent value" value={money(row.value)} />
          <Stat label="Source status" value="Received" />
        </dl>
        <p className={css.explainer}>
          Source shortage:{" "}
          {row.shortage === null ? "not shown" : money(row.shortage)} ·
          Markdown: {row.markdown === null ? "not shown" : money(row.markdown)}
        </p>
      </div>
      <Panel title="Local receiving exercise">
        <Numeric
          label="Example received units"
          value={received}
          onChange={setReceived}
          max={100000}
          integer
        />
        <div className={css.varianceResult}>
          <span>Quantity difference from sent</span>
          <strong>{valid ? Number(received) - row.qty : "—"}</strong>
          <p role="status">
            {valid
              ? "Units only. No monetary shortage is inferred from this aggregate quantity."
              : "Enter a whole quantity from 0 to 100,000."}
          </p>
        </div>
        <Note>
          This does not change the supplied received record or move stock.
        </Note>
      </Panel>
    </div>
  );
}
function LotsWorkspace() {
  const [basis, setBasis] = useState("retail");
  const [first, setFirst] = useState("600");
  const [second, setSecond] = useState("550");
  const valid =
    validCount(first) &&
    validCount(second) &&
    Number(first) > 0 &&
    Number(second) > 0;
  const allocation = valid
    ? allocateCost(
        180000,
        [
          { qty: Number(first), retail: 690 },
          { qty: Number(second), retail: 490 },
        ],
        basis as "quantity" | "retail",
      )
    : null;
  return (
    <>
      <div className={css.labToolbar}>
        <Badge demo>Illustrative intake · supplied lump cost</Badge>
        <Selection
          label="Cost allocation basis"
          value={basis}
          onChange={setBasis}
          items={[
            { value: "retail", label: "Retail value" },
            { value: "quantity", label: "Quantity" },
          ]}
        />
      </div>
      <div className={css.allocationLab}>
        <div className={css.allocationInputs}>
          <Numeric
            label="Example tops · qty · retail BDT 690"
            value={first}
            onChange={setFirst}
            max={100000}
            integer
          />
          <Numeric
            label="Example tees · qty · retail BDT 490"
            value={second}
            onChange={setSecond}
            max={100000}
            integer
          />
          <Note>
            Example intake lines are editable. They are not the missing original
            SKU breakdown.
          </Note>
        </div>
        <Panel title="BDT 180,000 · fully apportioned">
          {allocation ? (
            <>
              <div className={css.allocationBar}>
                {allocation.map((row, i) => (
                  <span
                    key={i}
                    style={{ width: `${(row.value / 180000) * 100}%` }}
                  />
                ))}
              </div>
              {allocation.map((row, i) => (
                <div className={css.allocationRow} key={i}>
                  <span>
                    {i === 0 ? "Example tops" : "Example tees"}
                    <small>
                      {money(row.unitCost)} per unit, rounded display
                    </small>
                  </span>
                  <b>{money(row.value)}</b>
                </div>
              ))}
              <p role="status" className={css.allocationTotal}>
                <Check size={16} /> Total allocated{" "}
                {money(allocation.reduce((a, b) => a + b.value, 0))}
              </p>
            </>
          ) : (
            <p role="alert" className={css.error}>
              Enter whole quantities between 1 and 100,000 for both example
              lines.
            </p>
          )}
        </Panel>
      </div>
    </>
  );
}
function StockWorkspace() {
  const [query, setQuery] = useState("");
  const [sku, setSku] = useState("DH-6070");
  const [count, setCount] = useState("192");
  const row = stock.find((item) => item.sku === sku)!;
  const filtered = stock.filter((item) =>
    `${item.sku} ${item.name}`.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <div className={css.stockLab}>
      <div>
        <SearchBox
          value={query}
          onChange={setQuery}
          label="Search the supplied stock"
        />
        <div className={css.stockList}>
          {filtered.map((item) => (
            <button
              key={item.sku}
              aria-pressed={sku === item.sku}
              onClick={() => {
                setSku(item.sku);
                setCount("");
              }}
            >
              <span>
                <b>{item.sku}</b>
                <small>{item.name}</small>
              </span>
              <strong>
                {number(item.qty)}
                <small>on hand</small>
              </strong>
            </button>
          ))}
          {!filtered.length && (
            <p className={css.empty}>No matching stock lines.</p>
          )}
        </div>
      </div>
      <Panel title="Count with context">
        <Tag>{row.sku} · OUT1</Tag>
        <div className={css.countProduct}>
          <Denim top={row.sku.startsWith("LOT")} />
          <div>
            <b>{row.name}</b>
            <p>Source on hand: {number(row.qty)}</p>
            <small>Average cost: {money(row.cost)}</small>
          </div>
        </div>
        <Numeric
          label="Local physical count · units"
          value={count}
          onChange={setCount}
          max={100000}
          integer
        />
        <p className={css.countVariance} role="status">
          {validCount(count)
            ? `Quantity variance: ${Number(count) - row.qty} units`
            : "Enter a whole count from 0 to 100,000."}
        </p>
        <Note>
          No count sheet is saved or adjustment posted. Source balances are
          unchanged.
        </Note>
      </Panel>
    </div>
  );
}
function OutletsWorkspace() {
  const [code, setCode] = useState("OUT1");
  const location = locations.find((row) => row.code === code)!;
  return (
    <div className={css.outletLab}>
      <div className={css.locationList}>
        {locations.map((row) => (
          <button
            key={row.code}
            aria-pressed={code === row.code}
            onClick={() => setCode(row.code)}
          >
            <span className={css.locationCode}>{row.code}</span>
            <span>
              <b>{row.name}</b>
              <small>{row.outlet ? "Selling outlet" : "Warehouse"}</small>
            </span>
            <ArrowRight size={15} />
          </button>
        ))}
      </div>
      <Panel title={location.name}>
        <Tag positive={location.outlet}>
          {location.outlet
            ? "Sells over the counter"
            : "Warehouse · not a selling outlet"}
        </Tag>
        <p className={css.locationAddress}>{location.address}</p>
        <dl className={css.stats}>
          <Stat label="Location code" value={location.code} />
          <Stat label="Register" value={location.register ?? "None shown"} />
          {location.register && (
            <Stat label="VAT setting · source" value="15%" />
          )}
        </dl>
        {location.register ? (
          <div className={css.registerDetail}>
            <Barcode />
            <b>{location.register}</b>
            <span>
              {location.code === "OUT1"
                ? "Open shift: SHF-2026-000024 · source snapshot"
                : "No open shift shown in source"}
            </span>
          </div>
        ) : (
          <p className={css.explainer}>
            No POS register is shown for this warehouse in the supplied
            configuration.
          </p>
        )}
        <Note>
          Read-only explorer. Register creation, cashier permissions and retail
          settings require the product workspace.
        </Note>
      </Panel>
    </div>
  );
}
const workspaces = {
  "register-till": RegisterWorkspace,
  shifts: ShiftsWorkspace,
  receipts: ReceiptsWorkspace,
  "day-summary-z": SummaryWorkspace,
  "outlet-dashboard": DashboardWorkspace,
  "loyalty-vouchers": LoyaltyWorkspace,
  transfers: TransfersWorkspace,
  "stock-lots": LotsWorkspace,
  "outlet-stock": StockWorkspace,
  "outlets-registers": OutletsWorkspace,
};
export default function PosWorkspace({ slug }: { slug: PosSlug }) {
  const p = pages[slug];
  const Workspace = workspaces[slug];
  return (
    <section id="pos-workspace" className={css.workspaceSection}>
      <div className={css.wrap}>
        <div className={css.sectionHeading}>
          <div>
            <p className={css.eyebrow}>GET A FEEL FOR THE WORKFLOW</p>
            <h2>{p.lab}</h2>
            <p>{p.labDescription}</p>
          </div>
          <Badge demo>Interactive preview · not connected</Badge>
        </div>
        <div className={css.lab}>
          <Workspace />
        </div>
      </div>
    </section>
  );
}
