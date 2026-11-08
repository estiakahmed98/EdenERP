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
import { useTranslations } from "next-intl";

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
  const t = useTranslations("pages.merchandisingApp");
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
      <Badge local>{t("workspaces.illustrativeUsdScenario")}</Badge>
      <div className={css.formGrid}>
        <Numeric
          label={t("workspaces.sellingPricePcUsd")}
          value={price}
          onChange={setPrice}
        />
        <Numeric label={t("workspaces.costPcUsd")} value={cost} onChange={setCost} />
        <Numeric
          label={t("workspaces.exampleQuantityPieces")}
          value={qty}
          onChange={setQty}
          integer
        />
      </div>
      <div className={css.scenarioResult} role="status">
        <span>{t("workspaces.calculatedMargin")}</span>
        <strong>{result ? `${result.margin.toFixed(2)}%` : "—"}</strong>
        <p>
          {result
            ? `${usd(result.net)} contribution on ${usd(result.revenue)} sales in this local exercise.`
            : t("workspaces.enterAPriceOfAtLeast")}
        </p>
      </div>
      <Notice>
        {t("workspaces.orderCurrencyArithmeticOnlyNoExchange")}
      </Notice>
    </>
  );
}

function DashboardWorkspace() {
  const t = useTranslations("pages.merchandisingApp");
  const [view, setView] = useState("risk");
  const risks = [
    {
      id: "000001",
      style: "6026",
      ship: t("workspaces.n18Aug"),
      reason: t("workspaces.n12MaterialShortages1stPoDelivery"),
    },
    {
      id: "000002",
      style: "6070",
      ship: t("workspaces.n08Sep"),
      reason: t("workspaces.shipDatePassedSourceAlert"),
    },
    {
      id: "000003",
      style: "8010",
      ship: t("workspaces.n17Sep"),
      reason: t("workspaces.onBoardBLDate12"),
    },
    {
      id: "000004",
      style: "5343",
      ship: t("workspaces.n22Sep"),
      reason: t("workspaces.fabricInHouse57D"),
    },
  ];
  return (
    <>
      <div className={css.toolbar}>
        <Badge>{t("workspaces.n4November2026HistoricalBrief")}</Badge>
        <Toggle
          value={view}
          setValue={setView}
          label={t("workspaces.dashboardEvidenceView")}
          items={[
            ["risk", t("workspaces.orderRisks")],
            ["owners", t("workspaces.actionOwners")],
            ["materials", t("workspaces.materialGaps")],
          ]}
        />
      </div>
      <dl className={css.metrics}>
        <Metric label={t("workspaces.openOrders")} value="16" detail="USD 1,826,227" />
        <Metric
          label={t("workspaces.ordersAtRisk")}
          value="14"
          detail="3 shipping within 14 d · source"
        />
        <Metric
          label={t("workspaces.tnaMilestonesLate")}
          value="64"
          detail="7 due within 7 d · source"
        />
        <Metric
          label={t("workspaces.openShipments")}
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
              <Tag tone="red">{t("workspaces.ship")}{" "}{row.ship}</Tag>
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
              <b>{row.late}{" "}{t("workspaces.late")}</b>
              <small>{t("workspaces.max")}{row.delay} d</small>
            </div>
          ))}
        </div>
      ) : (
        <div className={css.gapGrid}>
          <Panel title={t("workspaces.n8OrdersWithShortages")}>
            <strong className={css.resultNumber}>8</strong>
            <p>{t("workspaces.inside14DaysOfPcdIn")}</p>
          </Panel>
          <Panel title={t("workspaces.missingAMaterialPlan")}>
            <strong className={css.resultNumber}>3</strong>
            <p>
              {t("workspaces.theSourceAlsoReportsThreeOrders")}
            </p>
          </Panel>
        </div>
      )}
      <Notice>
        {t("workspaces.sourceExcerptOnlyFourRiskRows")}
      </Notice>
    </>
  );
}
function StylesWorkspace() {
  const t = useTranslations("pages.merchandisingApp");
  const [search, setSearch] = useState("");
  const [id, setId] = useState("8010");
  const [price, setPrice] = useState("16.40");
  const [cost, setCost] = useState("15.02");
  const [qty, setQty] = useState("1");
  const filtered = styles(t).filter((row) =>
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
          label={t("workspaces.searchStyleBuyerOrReference")}
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
          <p className={css.empty}>{t("workspaces.noMatchingSourceStyles")}</p>
        )}
        {selected && (
          <div className={css.styleEvidence}>
            <b>
              {selected.id} · {selected.season}
            </b>
            <dl className={css.metrics}>
              <Metric
                label={t("workspaces.sourceCostPc")}
                value={
                  selected.cost === null ? "Not shown" : usd(selected.cost)
                }
              />
              <Metric
                label={t("workspaces.sourceMargin")}
                value={
                  selected.margin === null
                    ? "Not shown"
                    : `${selected.margin.toFixed(1)}%`
                }
              />
              <Metric
                label={t("workspaces.samplesApprovals")}
                value={`${selected.samples} / ${selected.approvals}`}
              />
            </dl>
            <p>
              {t("workspaces.sourceStyle26002Shows91")}
            </p>
          </div>
        )}
      </div>
      <Panel title={t("workspaces.aSeparateCostConversation")}>
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
  const t = useTranslations("pages.merchandisingApp");
  const [view, setView] = useState("calendar");
  const [id, setId] = useState("2");
  const [plan, setPlan] = useState("2026-10-02");
  const [actual, setActual] = useState("2026-10-04");
  const [wall, setWall] = useState("");
  let result: ReturnType<typeof compareDates> | null = null;
  let error = "";
  try {
    if (plan && actual) result = compareDates(plan, actual, wall || undefined);
    else error = t("workspaces.chooseAPlanAndComparisonDate");
  } catch (e) {
    error = e instanceof Error ? e.message : t("workspaces.chooseValidDates");
  }
  return (
    <>
      <div className={css.toolbar}>
        <Tag>{t("workspaces.sourceOrderSc20260000170")}</Tag>
        <Toggle
          value={view}
          setValue={setView}
          label={t("workspaces.milestoneDisplay")}
          items={[
            ["calendar", t("workspaces.dateCards")],
            ["matrix", t("workspaces.sourceMatrix")],
          ]}
        />
      </div>
      <div className={css.tnaWorkspace}>
        <div>
          {view === "calendar" ? (
            <div className={css.dateCards}>
              {milestones(t).map((row) => (
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
                  <small>{row.status}{" "}{t("workspaces.sourceLabel")}</small>
                </button>
              ))}
            </div>
          ) : (
            <div
              className={css.tableScroll}
              tabIndex={0}
              role="region"
              aria-label={t("workspaces.sourceMilestoneMatrixScrollHorizontally")}
            >
              <table>
                <caption className={css.srOnly}>
                  {t("workspaces.sevenVisibleSourceMilestonesAllOwned")}
                </caption>
                <thead>
                  <tr>
                    <th scope="col">{t("workspaces.milestone")}</th>
                    <th scope="col">{t("workspaces.plan")}</th>
                    <th scope="col">{t("workspaces.kind")}</th>
                    <th scope="col">{t("workspaces.sourceStatus")}</th>
                  </tr>
                </thead>
                <tbody>
                  {milestones(t).map((row) => (
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
            {t("workspaces.allSevenVisibleRowsAreOwned")}
          </Notice>
        </div>
        <Panel title={t("workspaces.localDateComparison")}>
          <Badge local />
          <div className={css.formGrid}>
            <Field label={t("workspaces.planDate")}>
              <input
                type="date"
                min="2000-01-01"
                max="2100-12-31"
                value={plan}
                onChange={(e) => setPlan(e.target.value)}
              />
            </Field>
            <Field label={t("workspaces.actualComparisonDate")}>
              <input
                type="date"
                min="2000-01-01"
                max="2100-12-31"
                value={actual}
                onChange={(e) => setActual(e.target.value)}
              />
            </Field>
            <Field label={t("workspaces.buyerWallDateOptional")}>
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
            <span>{t("workspaces.differenceFromPlan")}</span>
            <strong>
              {result ? `${result.delay > 0 ? "+" : ""}${result.delay} d` : "—"}
            </strong>
            <p>
              {result
                ? result.delay > 0
                  ? t("workspaces.comparisonDateIsAfterThePlan")
                  : result.delay < 0
                    ? t("workspaces.comparisonDateIsBeforeThePlan")
                    : t("workspaces.comparisonDateMatchesThePlan")
                : error}
            </p>
            {result?.wallDelay !== null && result && (
              <p>{t("workspaces.differenceFromWallDate")}{" "}{result.wallDelay} d.</p>
            )}
          </div>
          <Notice>
            {t("workspaces.theExampleDatesAreLocalInputs")}
          </Notice>
        </Panel>
      </div>
    </>
  );
}
function MaterialsWorkspace() {
  const t = useTranslations("pages.merchandisingApp");
  const [search, setSearch] = useState("");
  const [shortOnly, setShortOnly] = useState(false);
  const [id, setId] = useState("000001");
  const filtered = materials(t).filter(
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
          label={t("workspaces.findOrderStyleOrBuyer")}
        />
        <label className={css.checkbox}>
          <input
            type="checkbox"
            checked={shortOnly}
            onChange={(e) => setShortOnly(e.target.checked)}
          />
          {t("workspaces.shortOrMissingPlanOnly")}
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
                {row.short === null ? t("workspaces.noPlan") : `${row.short} short`}
              </Tag>
            </button>
          ))}
          {!filtered.length && (
            <p className={css.empty}>{t("workspaces.noSourceOrdersMatchTheseFilters")}</p>
          )}
        </div>
        {selected ? (
          <Panel title={t("workspaces.styleReadiness", { style: String(selected.style) })}>
            <Tag>{contract(selected.id)}</Tag>
            <p className={css.detailText}>
              {selected.buyer}
              <br />
              {num(selected.qty)}{" "}{t("workspaces.piecesOrdered")}
            </p>
            {selected.lines === null ? (
              <div className={css.noPlan}>
                <LayersMark />
                <b>{t("workspaces.noMaterialPlanShown")}</b>
                <p>{t("workspaces.bookedInHouseAndShortageCounts")}</p>
              </div>
            ) : (
              <>
                <Progress
                  label={t("workspaces.materialLinesBooked")}
                  value={selected.booked!}
                  total={selected.lines}
                />
                <Progress
                  label={t("workspaces.materialLinesInHouse")}
                  value={selected.inHouse!}
                  total={selected.lines}
                  green
                />
              </>
            )}
            <dl className={css.metrics}>
              <Metric
                label={t("workspaces.fabricInHouseDue")}
                value={dateLabel(selected.due)}
              />
              <Metric label={t("workspaces.pcdSource")} value={dateLabel(selected.pcd)} />
            </dl>
            <Notice>
              {t("workspaces.lineCountsAreNotMaterialUnit")}
            </Notice>
          </Panel>
        ) : (
          <p className={css.empty}>{t("workspaces.clearAFilterToInspectA")}</p>
        )}
      </div>
    </>
  );
}
function LayersMark() {
  return <span className={css.unknownMark}>?</span>;
}
function ProductionWorkspace() {
  const t = useTranslations("pages.merchandisingApp");
  const [own, setOwn] = useState(false);
  const [id, setId] = useState("000004");
  const [pace, setPace] = useState("500");
  const filtered = production(t).filter(
    (row) => !own || row.factory === "Own floor",
  );
  const selected = filtered.find((row) => row.id === id) ?? filtered[0];
  const result = numeric(pace, true)
    ? remainingDays(selected.qty, selected.sewn, Number(pace))
    : null;
  return (
    <>
      <div className={css.toolbar}>
        <Field label={t("workspaces.suppliedProductionOrder")}>
          <select value={selected.id} onChange={(e) => setId(e.target.value)}>
            {filtered.map((row) => (
              <option key={row.id} value={row.id}>
                {contract(row.id)}{" "}{t("workspaces.style")}{" "}{row.style}
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
          {t("workspaces.ownFloorOnly")}
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
            label={t("workspaces.sewnSourceQuantity")}
            value={selected.sewn}
            total={selected.qty}
          />
          <Progress
            label={t("workspaces.packedSourceQuantity")}
            value={selected.packed}
            total={selected.qty}
            green
          />
          <dl className={css.metrics}>
            <Metric
              label={t("workspaces.rawSewnCompletion")}
              value={`${((selected.sewn / selected.qty) * 100).toFixed(1)}%`}
            />
            <Metric
              label={t("workspaces.rawPackedCompletion")}
              value={`${((selected.packed / selected.qty) * 100).toFixed(1)}%`}
            />
            <Metric label={t("workspaces.sourceShipDate")} value={selected.ship} />
          </dl>
          <Notice>
            {t("workspaces.overCompletionIsPreservedInThe")}
          </Notice>
        </div>
        <Panel title={t("workspaces.whatWouldTheRemainingWorkTake")}>
          <Badge local>{t("workspaces.illustrativeSewingPace")}</Badge>
          <Numeric
            label={t("workspaces.assumedSewnPiecesWorkingDay")}
            value={pace}
            onChange={setPace}
            integer
          />
          <div className={css.scenarioResult} role="status">
            <span>
              {t("workspaces.remainingSewing")}{" "}{result ? num(result.remaining) : "—"}{" "}{t("workspaces.pieces")}
            </span>
            <strong>
              {result?.days === null || !result
                ? "—"
                : `${result.days.toFixed(2)} d`}
            </strong>
            <p>
              {!result
                ? t("workspaces.enterWholePiecesPerDayFrom")
                : result.days === null
                  ? t("workspaces.aPositivePaceIsNeededTo")
                  : result.remaining === 0
                    ? t("workspaces.noRemainingSewingAgainstTheOrdered")
                    : `${Math.ceil(result.days)} whole working days at the entered pace.`}
            </p>
          </div>
          <Notice>
            {t("workspaces.thisIsNotAPredictedShipment")}
          </Notice>
        </Panel>
      </div>
    </>
  );
}
function FactoriesWorkspace() {
  const t = useTranslations("pages.merchandisingApp");
  const [id, setId] = useState("mymensingh");
  const [pace, setPace] = useState("4200");
  const selected = factories(t).find((row) => row.id === id)!;
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
              String(factories(t).find((row) => row.id === value)!.capacity),
            );
          }}
          label={t("workspaces.factoryDossier")}
          items={factories(t).map((row) => [
            row.id,
            row.id === "savar" ? t("workspaces.savar") : t("workspaces.mymensingh"),
          ])}
        />
        <div className={css.factoryProfile}>
          <span>{t("workspaces.suppliedFactoryProfile")}</span>
          <h3>{selected.name}</h3>
          <p>{selected.location}</p>
          <Tag>{selected.types}</Tag>
        </div>
        <dl className={css.metrics}>
          <Metric label={t("workspaces.productionLines")} value={selected.lines} />
          <Metric label={t("workspaces.machines")} value={selected.machines} />
          <Metric label={t("workspaces.capacityPcsDay")} value={num(selected.capacity)} />
          <Metric label={t("workspaces.openOrders")} value={selected.orders} />
          <Metric label={t("workspaces.piecesInProgress")} value={num(selected.wip)} />
          <Metric label={t("workspaces.sourceLoad")} value={`${selected.days.toFixed(2)} d`} />
        </dl>
        <div className={css.certificateFlags}>
          {selected.certificates.map((cert) => (
            <Tag key={cert.name} tone={cert.alert ? "red" : "green"}>
              {cert.name}
            </Tag>
          ))}
        </div>
        <Notice>
          {t("workspaces.theseAreSourceCertificateFlagsExpiry")}{" "}{selected.nextShip}.
        </Notice>
      </div>
      <Panel title={t("workspaces.aSimpleCapacityConversation")}>
        <Numeric
          label={t("workspaces.assumedCapacityPiecesDay")}
          value={pace}
          onChange={setPace}
          integer
        />
        <div className={css.scenarioResult} role="status">
          <span>{t("workspaces.equivalentLoadOnSourceWip")}</span>
          <strong>
            {result?.days === null || !result
              ? "—"
              : `${result.days.toFixed(2)} d`}
          </strong>
          <p>
            {result?.days === null
              ? t("workspaces.enterAPositiveCapacityToCalculate")
              : !result
                ? t("workspaces.useWholeCapacityFrom0To")
                : `${num(selected.wip)} pieces divided by the entered daily capacity.`}
          </p>
        </div>
        <Notice>
          {t("workspaces.capacityDivisionIsAnIllustrativeLoad")}
        </Notice>
      </Panel>
    </div>
  );
}
function ReceiptsWorkspace() {
  const t = useTranslations("pages.merchandisingApp");
  const [mode, setMode] = useState("all");
  const [id, setId] = useState(receipts(t)[0].id);
  const filtered = receipts(t).filter(
    (row) => mode === "all" || row.mode === mode,
  );
  const selected = filtered.find((row) => row.id === id) ?? filtered[0];
  return (
    <>
      <div className={css.toolbar}>
        <Badge>{t("workspaces.threeSuppliedPostedReceipts")}</Badge>
        <Toggle
          value={mode}
          setValue={setMode}
          label={t("workspaces.receiptOwnershipMode")}
          items={[
            ["all", t("workspaces.allReceipts")],
            [t("workspaces.ourStock"), t("workspaces.ourStock")],
            [t("workspaces.memo"), t("workspaces.buyerSGoodsMemo")],
          ]}
        />
      </div>
      <dl className={css.metrics}>
        <Metric
          label={t("workspaces.filteredSourcePieces")}
          value={num(filtered.reduce((s, r) => s + r.qty, 0))}
        />
        <Metric
          label={t("workspaces.filteredCartons")}
          value={num(filtered.reduce((s, r) => s + r.cartons, 0))}
        />
        <Metric label={t("workspaces.sourceDrafts")} value="0" />
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
                <strong>{num(row.qty)}{" "}{t("workspaces.pcs")}</strong>
                <Tag tone={row.mode === "Memo" ? "blue" : "green"}>
                  {row.mode}
                </Tag>
              </div>
            </button>
          ))}
        </div>
        <Panel title={t("workspaces.theReceiptInContext")}>
          <Tag tone="green">{t("workspaces.postedSourceStatus")}</Tag>
          <h4 className={css.receiptReference}>{selected.id}</h4>
          <p className={css.detailText}>
            {selected.buyer}
            <br />
            {contract(selected.order)}
          </p>
          <dl className={css.detailList}>
            <div>
              <dt>{t("workspaces.factory")}</dt>
              <dd>{selected.factory}</dd>
            </div>
            <div>
              <dt>{t("workspaces.inspector")}</dt>
              <dd>{selected.inspector}</dd>
            </div>
            <div>
              <dt>{t("workspaces.packing")}</dt>
              <dd>
                {num(selected.cartons)}{" "}{t("workspaces.cartons")}{" "}{num(selected.qty)}{" "}{t("workspaces.pieces")}
              </dd>
            </div>
            <div>
              <dt>{t("workspaces.ownership")}</dt>
              <dd>
                {selected.mode === "Memo"
                  ? t("workspaces.memoBuyerSGoods")
                  : t("workspaces.ourStock")}
              </dd>
            </div>
            <div>
              <dt>{t("workspaces.sourceValue")}</dt>
              <dd>
                {selected.value === null
                  ? t("workspaces.notShown")
                  : `${num(selected.value)} · currency not shown`}
              </dd>
            </div>
          </dl>
          <Notice>
            {t("workspaces.memoValuesRemainUnknownTheVisible")}
          </Notice>
        </Panel>
      </div>
    </>
  );
}
function ProfitWorkspace() {
  const t = useTranslations("pages.merchandisingApp");
  const [view, setView] = useState("aggregate");
  const [mode, setMode] = useState("all");
  const [price, setPrice] = useState("16.40");
  const [cost, setCost] = useState("15.02");
  const [qty, setQty] = useState("1000");
  const rows = profits.filter((row) => mode === "all" || row.mode === mode);
  return (
    <>
      <div className={css.toolbar}>
        <Badge>{t("workspaces.actualAggregatesBdt")}</Badge>
        <Toggle
          value={view}
          setValue={setView}
          label={t("workspaces.profitabilityEvidence")}
          items={[
            ["aggregate", t("workspaces.reportTotals")],
            ["orders", t("workspaces.orderExcerpt")],
          ]}
        />
      </div>
      {view === "aggregate" ? (
        <>
          <dl className={css.metrics}>
            <Metric label={t("workspaces.revenue")} value={bdt(profitSummary.revenue)} />
            <Metric
              label={t("workspaces.costOfGoodsShipped")}
              value={bdt(profitSummary.cost)}
            />
            <Metric label={t("workspaces.net")} value={bdt(profitSummary.net)} />
            <Metric label={t("workspaces.actualQuotedMargin")} value="30.9% / 14.3%" />
            <Metric label={t("workspaces.ordersPiecesOrdered")} value="17 / 132,415" />
            <Metric
              label={t("workspaces.costToDate")}
              value={bdt(profitSummary.costToDate)}
            />
          </dl>
          <Notice>
            {t("workspaces.costToDateIncludesFinishedOutput")}
          </Notice>
        </>
      ) : (
        <>
          <Field label={t("workspaces.settlementModeSourceExcerpt")}>
            <select value={mode} onChange={(e) => setMode(e.target.value)}>
              <option value="all">{t("workspaces.allVisibleModes")}</option>
              <option>{t("workspaces.ownFloor")}</option>
              <option>{t("workspaces.commission")}</option>
            </select>
          </Field>
          <div
            className={css.tableScroll}
            tabIndex={0}
            role="region"
            aria-label={t("workspaces.profitabilityOrderExcerptScrollHorizonta")}
          >
            <table>
              <caption className={css.srOnly}>
                {t("workspaces.fourVisibleProfitabilityRecordsPerPiece")}
              </caption>
              <thead>
                <tr>
                  {[
                    t("workspaces.orderStyle"),
                    t("workspaces.mode"),
                    t("workspaces.quotedPcUsd"),
                    t("workspaces.actualPcUsd"),
                    t("workspaces.actualCostPcUsd"),
                    t("workspaces.sourceNetBdt"),
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
                      <small>{t("workspaces.style2")}{" "}{row.style}</small>
                    </td>
                    <td>{row.mode}</td>
                    <td>{row.quote.toFixed(2)}</td>
                    <td>
                      {row.actual.toFixed(2)}
                      {row.mode === "Commission" && (
                        <small>{t("workspaces.commissionFeeNotFobSales")}</small>
                      )}
                    </td>
                    <td>{row.actualCost?.toFixed(2) ?? t("workspaces.notShown")}</td>
                    <td>{num(row.net)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Notice>
            {t("workspaces.fourRowExcerptFromA17")}
          </Notice>
        </>
      )}
      <div className={css.profitScenario}>
        <div>
          <p className={css.eyebrow}>{t("workspaces.aSeparateCommercialExercise")}</p>
          <h3>{t("workspaces.whatChangesWhenTheCostChanges")}</h3>
          <p>
            {t("workspaces.useAPlainUsdSalesScenario")}
          </p>
        </div>
        <Panel title={t("workspaces.localSellingPriceAndCostScenario")}>
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
  const t = useTranslations("pages.merchandisingApp");
  const [id, setId] = useState(portalUsers(t)[0].id);
  const [section, setSection] = useState("samples");
  const user = portalUsers(t).find((row) => row.id === id)!;
  const canDecide =
    user.canApprove && ["samples", "approvals"].includes(section);
  return (
    <div className={css.portalWorkspace}>
      <div>
        <Badge>{t("workspaces.n4ActiveInSummary3Visible")}</Badge>
        <div className={css.portalPeople}>
          {portalUsers(t).map((row) => (
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
          {t("workspaces.theFourthActiveLoginIsNot")}
        </Notice>
      </div>
      <Panel title={t("workspaces.roleAndSectionPreview")}>
        <Tag tone="green">{t("workspaces.activeSourceStatus")}</Tag>
        <h4 className={css.portalName}>{user.name}</h4>
        <Field label={t("workspaces.sourceEnabledSection")}>
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
            {canDecide ? t("workspaces.viewDecisionRole") : t("workspaces.viewOnlyInThisSection")}
          </strong>
          <p>
            {canDecide
              ? t("workspaces.theSourceGrantsThisMerchandiserApproval")
              : user.canApprove
                ? t("workspaces.merchandiserApprovalCapabilityDoesNotImp")
                : t("workspaces.theSuppliedQaRoleCannotApprove")}
          </p>
        </div>
        <dl className={css.detailList}>
          <div>
            <dt>{t("workspaces.canApproveSource")}</dt>
            <dd>{user.canApprove ? t("workspaces.yes") : t("workspaces.no")}</dd>
          </div>
          <div>
            <dt>{t("workspaces.lastSeenSource")}</dt>
            <dd>{user.lastSeen ?? t("workspaces.notShown")}</dd>
          </div>
        </dl>
        <Notice>
          {t("workspaces.explanatoryUiOnlyNoAuthenticationApprova")}
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
  const t = useTranslations("pages.merchandisingApp");
  const p = pages(t)[slug];
  const Workspace = workspaces[slug];
  return (
    <section id="merchandising-workspace" className={css.workspaceSection}>
      <div className={css.wrap}>
        <div className={css.sectionHeading}>
          <div>
            <p className={css.eyebrow}>{t("workspaces.exploreTheWorkflow")}</p>
            <h2>{p.workspace}</h2>
            <p>{p.instruction}</p>
          </div>
          <Badge local>{t("workspaces.interactiveDemoNotConnected")}</Badge>
        </div>
        <div className={css.workspace}>
          <Workspace />
        </div>
      </div>
    </section>
  );
}
