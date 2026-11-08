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
import { useTranslations } from "next-intl";

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
  const t = useTranslations("pages.posApp");
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
            label={t("workspaces.searchProductOrSku")}
          />
          <Tag>{t("workspaces.r1BscExampleBasket")}</Tag>
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
                aria-label={t("workspaces.addToDemoBasket", { name: String(row.name) })}
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
            {t("workspaces.noMatchingProductsTryDenimOr")}
          </p>
        )}
      </div>
      <Panel title={t("workspaces.yourDemoBasket")} className={css.basketPanel}>
        <div className={css.basketLines}>
          {lines.map((row) => (
            <div className={css.basketLine} key={row.sku}>
              <div>
                <b>{row.name}</b>
                <small>{money(row.price)}{" "}{t("workspaces.each")}</small>
              </div>
              <div className={css.qtyControls}>
                <Button
                  aria-label={t("workspaces.removeOne", { sku: String(row.sku) })}
                  onClick={() => change(row.sku, -1)}
                >
                  <Minus size={13} />
                </Button>
                <span>{row.qty}</span>
                <Button
                  aria-label={t("workspaces.addOne", { sku: String(row.sku) })}
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
              {t("workspaces.yourBasketIsEmptyAddAn")}
            </p>
          )}
        </div>
        <dl className={css.totals}>
          <div>
            <dt>{t("workspaces.includesVat15DemoRate")}</dt>
            <dd>{money(totals.tax)}</dd>
          </div>
          <div>
            <dt>{t("workspaces.total")}</dt>
            <dd>{money(totals.total)}</dd>
          </div>
        </dl>
        <Numeric
          label={t("workspaces.cashTenderBdt")}
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
            {t("workspaces.exactAmount")}
          </Button>
          <span>
            {t("workspaces.change")}{" "}<b>{money(totals.change)}</b>
          </span>
        </div>
        {!valid && (
          <p role="alert" className={css.error}>
            {t("workspaces.enterACashAmountBetween0")}
          </p>
        )}
        <Button
          className={css.primaryButton}
          disabled={!valid || !totals.ready || complete}
          onClick={() => setComplete(true)}
        >
          <ShoppingBag size={16} />
          {complete ? t("workspaces.simulationComplete") : t("workspaces.simulateCheckout")}
        </Button>
        <p className={css.feedback} role="status">
          {complete
            ? t("workspaces.demoCalculatedNoPaymentTakenReceipt")
            : totals.due > 0
              ? `${money(totals.due)} still due in this exercise.`
              : t("workspaces.localExerciseNoSaleWillBe")}
        </p>
        <Button
          onClick={() => {
            setBasket({ "DH-6070": 1 });
            setTender("3500");
            setQuery("");
            setComplete(false);
          }}
        >
          <RotateCcw size={13} />{" "}{t("workspaces.resetBasket")}
        </Button>
      </Panel>
    </div>
  );
}

function ShiftsWorkspace() {
  const t = useTranslations("pages.posApp");
  const closed = shifts(t).filter((row) => row.cash !== null);
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
        <Field label={t("workspaces.suppliedClosedShift")}>
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
          <Tag positive>{t("workspaces.postedSourceRecord")}</Tag>
        </div>
        <dl className={css.stats}>
          <Stat label={t("workspaces.openingFloat")} value={money(row.float)} />
          <Stat label={t("workspaces.expectedCashSource")} value={money(row.cash!)} />
          <Stat label={t("workspaces.receipts")} value={row.receipts} />
        </dl>
      </div>
      <Panel title={t("workspaces.yourCountCompared")}>
        <Numeric
          label={t("workspaces.locallyCountedCashBdt")}
          value={count}
          onChange={setCount}
        />
        <div
          className={css.varianceResult}
          data-negative={variance !== null && variance !== 0}
        >
          <span>{t("workspaces.cashVariance")}</span>
          <strong>{variance === null ? "—" : money(variance)}</strong>
          <p role="status">
            {variance === null
              ? t("workspaces.enterAValidCashCountTo")
              : variance === 0
                ? t("workspaces.theLocalCountMatchesExpectedCash")
                : variance < 0
                  ? t("workspaces.theLocalCountIsShortOf")
                  : t("workspaces.theLocalCountExceedsExpectedCash")}
          </p>
        </div>
        <Note>
          {t("workspaces.theSuppliedPostedShiftRemainsUnchanged")}
        </Note>
      </Panel>
    </div>
  );
}
function ReceiptsWorkspace() {
  const t = useTranslations("pages.posApp");
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState("inclusive");
  const match = "example-01 dh-6070 athletic fit jean denim".includes(
    query.toLowerCase(),
  );
  return (
    <div className={css.receiptLab}>
      <div>
        <Badge demo>{t("workspaces.illustrativeReceiptDerivedTotals")}</Badge>
        <SearchBox
          value={query}
          onChange={setQuery}
          label={t("workspaces.findExampleReceiptOrProduct")}
        />
        {match ? (
          <div className={css.receiptListItem}>
            <ReceiptPaper compact />
            <div>
              <span>{t("workspaces.example01LocalDemo")}</span>
              <h3>{t("workspaces.athleticFitJean")}</h3>
              <p>{t("workspaces.dh60701UnitCash")}</p>
              <b>{money(3450)}</b>
              <small>
                {t("workspaces.theItemTenderAndTotalsCome")}
              </small>
            </div>
          </div>
        ) : (
          <p className={css.empty}>
            {t("workspaces.noMatchingExampleSearchDh6070")}
          </p>
        )}
      </div>
      <Panel title={t("workspaces.aTransparentTaxBreakdown")}>
        <Selection
          label={t("workspaces.priceDisplay")}
          value={mode}
          onChange={setMode}
          items={[
            { value: "inclusive", label: t("workspaces.vatInclusive") },
            { value: "exclusive", label: t("workspaces.beforeVat") },
          ]}
        />
        <dl className={css.stats}>
          <Stat
            label={
              mode === "inclusive" ? t("workspaces.priceIncludingVat") : t("workspaces.priceBeforeVat")
            }
            value={money(mode === "inclusive" ? 3450 : 3000)}
          />
          <Stat label={t("workspaces.vatSuppliedAmount")} value={money(450)} />
        </dl>
        <p className={css.explainer}>
          {t("workspaces.theCustomerTotalIs")}{" "}{money(3450)}{" "}{t("workspaces.inBothViewsChangingTheDisplay")}
        </p>
        <Barcode />
      </Panel>
    </div>
  );
}
function SummaryWorkspace() {
  const t = useTranslations("pages.posApp");
  const [mode, setMode] = useState("totals");
  return (
    <>
      <div className={css.labToolbar}>
        <Badge />
        <Selection
          label={t("workspaces.summaryView")}
          value={mode}
          onChange={setMode}
          items={[
            { value: "totals", label: t("workspaces.closingTotals") },
            { value: "bridge", label: t("workspaces.explainTheMargin") },
          ]}
        />
      </div>
      {mode === "totals" ? (
        <dl className={css.summaryStats}>
          <Stat
            label={t("workspaces.grossNetSales")}
            value={money(saleSummary.gross)}
            detail="No refunds or discounts in source"
          />
          <Stat label={t("workspaces.vatIncluded")} value={money(saleSummary.vat)} />
          <Stat label={t("workspaces.costOfGoods")} value={money(saleSummary.cost)} />
          <Stat
            label={t("workspaces.grossMargin")}
            value={money(saleSummary.margin)}
            detail="Source shows 58%"
          />
          <Stat label={t("workspaces.receiptsItems")} value="1 / 1" />
          <Stat label={t("workspaces.averageBasket")} value={money(3450)} />
        </dl>
      ) : (
        <div className={css.waterfall}>
          {[
            { label: t("workspaces.customerTotal"), value: 3450, width: 100 },
            { label: t("workspaces.lessVat"), value: 450, width: (450 / 3450) * 100 },
            {
              label: t("workspaces.lessCostOfGoods"),
              value: 1261.09,
              width: (1261.09 / 3450) * 100,
            },
            {
              label: t("workspaces.grossMargin"),
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
          {t("workspaces.cashTender")}{" "}<b>{money(3450)}</b>
        </span>
        <span>
          {t("workspaces.topItem")}{" "}<b>{t("workspaces.dh60701Unit")}</b>
        </span>
        <span>
          {t("workspaces.category")}{" "}<b>{t("workspaces.finishedGood")}</b>
        </span>
      </div>
      <Note>
        {t("workspaces.noTradingDateOrShiftHas")}
      </Note>
    </>
  );
}
function DashboardWorkspace() {
  const t = useTranslations("pages.posApp");
  const [view, setView] = useState("sales");
  return (
    <>
      <div className={css.labToolbar}>
        <Tag>{t("workspaces.allOutletsSupplied14DayWindow")}</Tag>
        <Selection
          label={t("workspaces.dashboardEvidenceView")}
          value={view}
          onChange={setView}
          items={[
            { value: "sales", label: t("workspaces.salesEvidence") },
            { value: "stock", label: t("workspaces.stockCover") },
          ]}
        />
      </div>
      <dl className={css.summaryStats}>
        <Stat label={t("workspaces.netSales")} value={money(3450)} />
        <Stat label={t("workspaces.receipts")} value="1" detail="0 returns" />
        <Stat
          label={t("workspaces.grossMargin")}
          value={money(1738.91)}
          detail="58% as shown"
        />
      </dl>
      {view === "sales" ? (
        <div className={css.dashboardEvidence}>
          <Panel title={t("workspaces.theCompleteSuppliedSalesContribution")}>
            <div className={css.evidenceBar}>
              <span>DH-6070</span>
              <i />
              <b>{money(3450)}</b>
            </div>
            <p>
              {t("workspaces.oneAthleticFitJeanAtR1")}
            </p>
            <Note>
              {t("workspaces.noDailyChartIsReconstructedThe")}
            </Note>
          </Panel>
          <Panel title={t("workspaces.fromTotalToContext")}>
            <dl className={css.stackedStats}>
              <Stat label={t("workspaces.averageBasket")} value={money(3450)} />
              <Stat label={t("workspaces.averagePerDayAsShown")} value={money(246.43)} />
            </dl>
          </Panel>
        </div>
      ) : (
        <Panel title={t("workspaces.topItemSuppliedDashboardStockCover")}>
          <div className={css.stockCover}>
            <Denim />
            <div>
              <b>{t("workspaces.dh6070AthleticFitJean")}</b>
              <p>
                {t("workspaces.onHand")}{" "}<strong>295</strong>{" "}{t("workspaces.unitsSold")}{" "}<strong>1</strong>
              </p>
              <span className={css.coverDays}>
                4,130 <small>{t("workspaces.daysCoverSourceFigure")}</small>
              </span>
            </div>
          </div>
          <Note>
            {t("workspaces.thisDashboardSnapshotReports295On")}
          </Note>
        </Panel>
      )}
    </>
  );
}
function LoyaltyWorkspace() {
  const t = useTranslations("pages.posApp");
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
        <Badge demo>{t("workspaces.illustrativePolicyNotACustomerBalance")}</Badge>
        <h3>{t("workspaces.whatWouldARedemptionLookLike")}</h3>
        <p className={css.explainer}>
          {t("workspaces.setYourOwnExampleBalanceAnd")}
        </p>
        <div className={css.formGrid}>
          <Numeric
            label={t("workspaces.exampleAvailablePoints")}
            value={balance}
            onChange={setBalance}
            max={1000000}
            integer
          />
          <Numeric
            label={t("workspaces.pointsToRedeem")}
            value={redeem}
            onChange={setRedeem}
            max={1000000}
            integer
          />
          <Numeric
            label={t("workspaces.exampleBdtPerPoint")}
            value={rate}
            onChange={setRate}
            max={1000}
          />
        </div>
      </div>
      <Panel title={t("workspaces.redemptionPreview")}>
        <span className={css.resultEyebrow}>{t("workspaces.illustrativeValue")}</span>
        <strong className={css.largeResult}>
          {valid
            ? money(Math.round(Number(redeem) * Number(rate) * 100) / 100)
            : "—"}
        </strong>
        <p role="status">
          {valid
            ? `${number(Number(balance) - Number(redeem))} example points would remain.`
            : t("workspaces.useWholeNonNegativePointsA")}
        </p>
        <div className={css.paperRule} />
        <p>
          {t("workspaces.noPointsAreRedeemedAndNo")}
        </p>
      </Panel>
    </div>
  );
}
function TransfersWorkspace() {
  const t = useTranslations("pages.posApp");
  const [id, setId] = useState(transfers(t)[0].id);
  const [received, setReceived] = useState("27");
  const row = transfers(t).find((item) => item.id === id)!;
  const valid = validCount(received);
  return (
    <div className={css.transferLab}>
      <div>
        <Field label={t("workspaces.suppliedReceivedTransfer")}>
          <select
            value={id}
            onChange={(e) => {
              setId(e.target.value);
              setReceived("");
            }}
          >
            {transfers(t).map((item) => (
              <option key={item.id} value={item.id}>
                {item.id} · {item.to}
              </option>
            ))}
          </select>
        </Field>
        <div className={css.transferRoute}>
          <div>
            <span>{t("workspaces.fg")}</span>
            <b>{t("workspaces.finishedGoods")}</b>
            <small>{t("workspaces.sent")}{" "}{row.sent}</small>
          </div>
          <ArrowRight size={23} />
          <div>
            <span>{row.to}</span>
            <b>{row.outlet}</b>
            <small>{t("workspaces.received")}{" "}{row.received}</small>
          </div>
        </div>
        <dl className={css.stats}>
          <Stat label={t("workspaces.sentQuantity")} value={row.qty} />
          <Stat label={t("workspaces.sentValue")} value={money(row.value)} />
          <Stat label={t("workspaces.sourceStatus")} value="Received" />
        </dl>
        <p className={css.explainer}>
          {t("workspaces.sourceShortage")}{" "}
          {row.shortage === null ? t("workspaces.notShown") : money(row.shortage)}{" "}{t("workspaces.markdown")}{" "}{row.markdown === null ? t("workspaces.notShown") : money(row.markdown)}
        </p>
      </div>
      <Panel title={t("workspaces.localReceivingExercise")}>
        <Numeric
          label={t("workspaces.exampleReceivedUnits")}
          value={received}
          onChange={setReceived}
          max={100000}
          integer
        />
        <div className={css.varianceResult}>
          <span>{t("workspaces.quantityDifferenceFromSent")}</span>
          <strong>{valid ? Number(received) - row.qty : "—"}</strong>
          <p role="status">
            {valid
              ? t("workspaces.unitsOnlyNoMonetaryShortageIs")
              : t("workspaces.enterAWholeQuantityFrom0")}
          </p>
        </div>
        <Note>
          {t("workspaces.thisDoesNotChangeTheSupplied")}
        </Note>
      </Panel>
    </div>
  );
}
function LotsWorkspace() {
  const t = useTranslations("pages.posApp");
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
        <Badge demo>{t("workspaces.illustrativeIntakeSuppliedLumpCost")}</Badge>
        <Selection
          label={t("workspaces.costAllocationBasis")}
          value={basis}
          onChange={setBasis}
          items={[
            { value: "retail", label: t("workspaces.retailValue") },
            { value: "quantity", label: t("workspaces.quantity") },
          ]}
        />
      </div>
      <div className={css.allocationLab}>
        <div className={css.allocationInputs}>
          <Numeric
            label={t("workspaces.exampleTopsQtyRetailBdt690")}
            value={first}
            onChange={setFirst}
            max={100000}
            integer
          />
          <Numeric
            label={t("workspaces.exampleTeesQtyRetailBdt490")}
            value={second}
            onChange={setSecond}
            max={100000}
            integer
          />
          <Note>
            {t("workspaces.exampleIntakeLinesAreEditableThey")}
          </Note>
        </div>
        <Panel title={t("workspaces.bdt180000FullyApportioned")}>
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
                    {i === 0 ? t("workspaces.exampleTops") : t("workspaces.exampleTees")}
                    <small>
                      {money(row.unitCost)}{" "}{t("workspaces.perUnitRoundedDisplay")}
                    </small>
                  </span>
                  <b>{money(row.value)}</b>
                </div>
              ))}
              <p role="status" className={css.allocationTotal}>
                <Check size={16} />{" "}{t("workspaces.totalAllocated")}{" "}
                {money(allocation.reduce((a, b) => a + b.value, 0))}
              </p>
            </>
          ) : (
            <p role="alert" className={css.error}>
              {t("workspaces.enterWholeQuantitiesBetween1And")}
            </p>
          )}
        </Panel>
      </div>
    </>
  );
}
function StockWorkspace() {
  const t = useTranslations("pages.posApp");
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
          label={t("workspaces.searchTheSuppliedStock")}
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
                <small>{t("workspaces.onHand2")}</small>
              </strong>
            </button>
          ))}
          {!filtered.length && (
            <p className={css.empty}>{t("workspaces.noMatchingStockLines")}</p>
          )}
        </div>
      </div>
      <Panel title={t("workspaces.countWithContext")}>
        <Tag>{row.sku}{" "}{t("workspaces.out1")}</Tag>
        <div className={css.countProduct}>
          <Denim top={row.sku.startsWith("LOT")} />
          <div>
            <b>{row.name}</b>
            <p>{t("workspaces.sourceOnHand")}{" "}{number(row.qty)}</p>
            <small>{t("workspaces.averageCost")}{" "}{money(row.cost)}</small>
          </div>
        </div>
        <Numeric
          label={t("workspaces.localPhysicalCountUnits")}
          value={count}
          onChange={setCount}
          max={100000}
          integer
        />
        <p className={css.countVariance} role="status">
          {validCount(count)
            ? t("workspaces.quantityVarianceUnits", { v1: String(Number(count) - row.qty) })
            : t("workspaces.enterAWholeCountFrom0")}
        </p>
        <Note>
          {t("workspaces.noCountSheetIsSavedOr")}
        </Note>
      </Panel>
    </div>
  );
}
function OutletsWorkspace() {
  const t = useTranslations("pages.posApp");
  const [code, setCode] = useState("OUT1");
  const location = locations(t).find((row) => row.code === code)!;
  return (
    <div className={css.outletLab}>
      <div className={css.locationList}>
        {locations(t).map((row) => (
          <button
            key={row.code}
            aria-pressed={code === row.code}
            onClick={() => setCode(row.code)}
          >
            <span className={css.locationCode}>{row.code}</span>
            <span>
              <b>{row.name}</b>
              <small>{row.outlet ? t("workspaces.sellingOutlet") : t("workspaces.warehouse")}</small>
            </span>
            <ArrowRight size={15} />
          </button>
        ))}
      </div>
      <Panel title={location.name}>
        <Tag positive={location.outlet}>
          {location.outlet
            ? t("workspaces.sellsOverTheCounter")
            : t("workspaces.warehouseNotASellingOutlet")}
        </Tag>
        <p className={css.locationAddress}>{location.address}</p>
        <dl className={css.stats}>
          <Stat label={t("workspaces.locationCode")} value={location.code} />
          <Stat label={t("workspaces.register")} value={location.register ?? "None shown"} />
          {location.register && (
            <Stat label={t("workspaces.vatSettingSource")} value="15%" />
          )}
        </dl>
        {location.register ? (
          <div className={css.registerDetail}>
            <Barcode />
            <b>{location.register}</b>
            <span>
              {location.code === "OUT1"
                ? t("workspaces.openShiftShf2026000024Source")
                : t("workspaces.noOpenShiftShownInSource")}
            </span>
          </div>
        ) : (
          <p className={css.explainer}>
            {t("workspaces.noPosRegisterIsShownFor")}
          </p>
        )}
        <Note>
          {t("workspaces.readOnlyExplorerRegisterCreationCashier")}
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
  const t = useTranslations("pages.posApp");
  const p = pages(t)[slug];
  const Workspace = workspaces[slug];
  return (
    <section id="pos-workspace" className={css.workspaceSection}>
      <div className={css.wrap}>
        <div className={css.sectionHeading}>
          <div>
            <p className={css.eyebrow}>{t("workspaces.getAFeelForTheWorkflow")}</p>
            <h2>{p.lab}</h2>
            <p>{p.labDescription}</p>
          </div>
          <Badge demo>{t("workspaces.interactivePreviewNotConnected")}</Badge>
        </div>
        <div className={css.lab}>
          <Workspace />
        </div>
      </div>
    </section>
  );
}
