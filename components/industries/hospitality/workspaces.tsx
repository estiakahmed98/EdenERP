"use client";
import { useState } from "react";
import { ArrowRight, RotateCcw, Users } from "lucide-react";
import {
  cartonLoad,
  hotelSnapshot,
  nextTicketStage,
  seatFit,
  stayEstimate,
  ticketCounts,
} from "./calculations";
import {
  arrivalDate,
  departureDate,
  drinks,
  money,
  num,
  pages,
  roomLabels,
  rooms,
  roomStates,
  tables,
  ticketLabels,
  tickets,
  ticketStages,
  type HospitalitySlug,
  type RoomState,
} from "./data";
import { Badge, Metric, Note, css } from "./ui";
import { useTranslations } from "next-intl";
function number(raw: string) {
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
      {t("hospitality.workspaces.resetExample")}
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
export function HospitalityStory({ slug }: { slug: HospitalitySlug }) {
  const t = useTranslations("pages.industriesApp");
  const [index, setIndex] = useState(0),
    p = pages(t)[slug],
    stage = p.stages[index];
  return (
    <section className={css.storySection}>
      <div className={css.wrap}>
        <div className={css.sectionHeading}>
          <p className={css.eyebrow}>{t("hospitality.workspaces.theOperationInContext")}</p>
          <h2>{p.story}</h2>
        </div>
        <div
          className={css.storyChoices}
          role="group"
          aria-label={t("hospitality.workspaces.chooseAnOperationalPerspective")}
        >
          {p.stages.map((row, i) => (
            <button
              key={row.label}
              type="button"
              aria-pressed={index === i}
              onClick={() => setIndex(i)}
            >
              <span>0{i + 1}</span>
              {row.label}
              <ArrowRight size={15} aria-hidden="true" />
            </button>
          ))}
        </div>
        <div className={css.storyDetail} aria-live="polite">
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
function RestaurantWorkspace() {
  const t = useTranslations("pages.industriesApp");
  const [selected, setSelected] = useState(1),
    [party, setParty] = useState("4");
  const table = tables[selected];
  let result: ReturnType<typeof seatFit> | null = null,
    error = "";
  try {
    result = seatFit(table.seats, number(party));
  } catch (e) {
    error =
      e instanceof Error ? e.message : t("hospitality.workspaces.enterAValidExamplePartySize");
  }
  return (
    <>
      <div className={css.workspaceToolbar}>
        <Badge>{t("hospitality.workspaces.fictionalDiningRoomNoLiveConnection")}</Badge>
        <Reset
          onClick={() => {
            setSelected(1);
            setParty("4");
          }}
        />
      </div>
      <div className={css.seatingWorkspace}>
        <div className={css.seatingBoard}>
          <header>
            <span>{t("hospitality.workspaces.exampleFloorChooseATable")}</span>
            <small>{t("hospitality.workspaces.occupiedExampleTablesAreDisabled")}</small>
          </header>
          <div
            className={css.seatingChoices}
            role="group"
            aria-label={t("hospitality.workspaces.selectAFictionalOpenTable")}
          >
            {tables.map((row, i) => (
              <button
                key={row.id}
                type="button"
                disabled={row.state === "occupied"}
                aria-pressed={selected === i}
                onClick={() => setSelected(i)}
                data-state={row.state}
              >
                <Users size={19} aria-hidden="true" />
                <b>{row.id}</b>
                <span>{row.seats}{" "}{t("hospitality.workspaces.seats")}</span>
                <small>
                  {row.state === "occupied"
                    ? t("hospitality.workspaces.exampleOccupied")
                    : t("hospitality.workspaces.exampleOpen")}
                </small>
              </button>
            ))}
          </div>
        </div>
        <section className={css.seatResult} aria-label={t("hospitality.workspaces.localSeatComparison")}>
          <span>{t("hospitality.workspaces.thePartyAndTheTable")}</span>
          <h3>
            {table.id} / {table.seats}{" "}{t("hospitality.workspaces.exampleSeats")}
          </h3>
          <Numeric
            label={t("hospitality.workspaces.enteredPartySizePeople")}
            raw={party}
            onChange={setParty}
            min={1}
            max={1000}
          />
          <dl className={css.metrics}>
            <Metric
              label={t("hospitality.workspaces.seatsLeftAfterThisParty")}
              value={result ? num(result.spare) : "—"}
            />
            <Metric
              label={t("hospitality.workspaces.additionalSeatsNeeded")}
              value={result ? num(result.short) : "—"}
            />
          </dl>
          <Outcome error={error}>
            {result
              ? result.enough
                ? t("hospitality.workspaces.theEnteredPartyFitsThisFictional", { spare: String(result.spare) })
                : t("hospitality.workspaces.thisFictionalTableHasFewerSeats", { short: String(result.short) })
              : ""}
          </Outcome>
          <Note>
            {t("hospitality.workspaces.singleTableSeatArithmeticOnlyNo")}
          </Note>
        </section>
      </div>
    </>
  );
}
function FastFoodWorkspace() {
  const t = useTranslations("pages.industriesApp");
  const [entries, setEntries] = useState(() =>
    tickets(t).map((row) => ({ ...row })),
  );
  const counts = ticketCounts(entries.map((row) => row.stage));
  function advance(id: string) {
    setEntries((prev) =>
      prev.map((row) =>
        row.id === id ? { ...row, stage: nextTicketStage(row.stage) } : row,
      ),
    );
  }
  return (
    <>
      <div className={css.workspaceToolbar}>
        <Badge>{t("hospitality.workspaces.threeFictionalTicketsLocalStages")}</Badge>
        <Reset onClick={() => setEntries(tickets(t).map((row) => ({ ...row })))} />
      </div>
      <dl className={css.ticketMetrics}>
        {ticketStages.map((stage) => (
          <Metric
            key={stage}
            label={`${ticketLabels(t)[stage]} · example tickets`}
            value={counts[stage]}
          />
        ))}
      </dl>
      <div className={css.ticketBoard}>
        {entries.map((row) => (
          <article
            key={row.id}
            className={css.kitchenTicket}
            data-stage={row.stage}
          >
            <header>
              <b>{row.id}</b>
              <span>{ticketLabels(t)[row.stage]}</span>
            </header>
            <ul>
              {row.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <ol
              className={css.ticketProgress}
              aria-label={`${row.id} current stage: ${ticketLabels(t)[row.stage]}`}
            >
              {ticketStages.map((stage) => (
                <li key={stage} data-active={row.stage === stage}>
                  <i />
                  <span>{ticketLabels(t)[stage]}</span>
                </li>
              ))}
            </ol>
            <button
              type="button"
              className={css.localButton}
              disabled={row.stage === "ready"}
              onClick={() => advance(row.id)}
              aria-label={
                row.stage === "ready"
                  ? `${row.id} is ready in the example`
                  : t("hospitality.workspaces.moveTo", { id: String(row.id), v2: String(ticketLabels(t)[nextTicketStage(row.stage)]) })
              }
            >
              {row.stage === "ready"
                ? t("hospitality.workspaces.readyInTheExample")
                : t("hospitality.workspaces.moveTo2", { v1: String(ticketLabels(t)[nextTicketStage(row.stage)]) })}
              <ArrowRight size={14} aria-hidden="true" />
            </button>
          </article>
        ))}
      </div>
      <Outcome error="">{t("hospitality.workspaces.exampleBoardQueuedPreparingAndReady", { queued: String(counts.queued), preparing: String(counts.preparing), ready: String(counts.ready) })}</Outcome>
      <Note>
        {t("hospitality.workspaces.stagesAreChangedByYouThere")}
      </Note>
    </>
  );
}
function GuestWorkspace() {
  const t = useTranslations("pages.industriesApp");
  const [arrival, setArrival] = useState(arrivalDate),
    [departure, setDeparture] = useState(departureDate),
    [rate, setRate] = useState("4000");
  let result: ReturnType<typeof stayEstimate> | null = null,
    error = "";
  try {
    result = stayEstimate(arrival, departure, number(rate));
  } catch (e) {
    error =
      e instanceof Error ? e.message : t("hospitality.workspaces.useValidExampleDatesAndRate");
  }
  return (
    <>
      <div className={css.workspaceToolbar}>
        <Badge>{t("hospitality.workspaces.exStay01FictionalDatesAnd")}</Badge>
        <Reset
          onClick={() => {
            setArrival(arrivalDate);
            setDeparture(departureDate);
            setRate("4000");
          }}
        />
      </div>
      <div className={css.stayWorkspace}>
        <div className={css.stayInputs}>
          <label className={css.field}>
            <span>{t("hospitality.workspaces.exampleArrivalDate")}</span>
            <input
              type="date"
              min="2000-01-01"
              max="2100-12-31"
              value={arrival}
              onChange={(e) => setArrival(e.target.value)}
            />
          </label>
          <label className={css.field}>
            <span>{t("hospitality.workspaces.exampleDepartureDate")}</span>
            <input
              type="date"
              min="2000-01-01"
              max="2100-12-31"
              value={departure}
              onChange={(e) => setDeparture(e.target.value)}
            />
          </label>
          <Numeric
            label={t("hospitality.workspaces.enteredNightlyRoomRateBdt")}
            raw={rate}
            onChange={setRate}
            max={10000000}
            step="0.01"
          />
          <Note>
            {t("hospitality.workspaces.use1365ExampleNightsDate")}
          </Note>
        </div>
        <section className={css.stayReceipt} aria-label={t("hospitality.workspaces.localStayEstimate")}>
          <span>{t("hospitality.workspaces.theStayInAFewSimple")}</span>
          <h3>{t("hospitality.workspaces.aConsideredLittleEstimate")}</h3>
          <div className={css.nightCount}>
            <strong>{result ? result.nights : "—"}</strong>
            <span>{t("hospitality.workspaces.exampleNights")}</span>
          </div>
          <dl>
            <Metric
              label={t("hospitality.workspaces.enteredRateRoundedToCents")}
              value={result ? money(result.nightly) : "—"}
            />
            <Metric
              label={t("hospitality.workspaces.exampleRoomChargeEstimate")}
              value={result ? money(result.total) : "—"}
            />
          </dl>
          <Outcome error={error}>
            {result
              ? `${result.nights} nights × ${money(result.nightly)} = ${money(result.total)}.`
              : ""}
          </Outcome>
          <Note>
            {t("hospitality.workspaces.roomChargeOnlyThisDoesNot")}
          </Note>
        </section>
      </div>
    </>
  );
}
function BeverageWorkspace() {
  const t = useTranslations("pages.industriesApp");
  const [entries, setEntries] = useState(() =>
      drinks.map((row) => ({
        cartons: String(row.cartons),
        units: String(row.units),
      })),
    ),
    [limit, setLimit] = useState("600");
  let result: ReturnType<typeof cartonLoad> | null = null,
    error = "";
  try {
    result = cartonLoad(
      entries.map((row) => ({
        cartons: number(row.cartons),
        units: number(row.units),
      })),
      number(limit),
    );
  } catch (e) {
    error =
      e instanceof Error
        ? e.message
        : t("hospitality.workspaces.enterValidExampleCartonAndUnit");
  }
  function update(index: number, key: "cartons" | "units", raw: string) {
    setEntries((prev) =>
      prev.map((row, i) => (i === index ? { ...row, [key]: raw } : row)),
    );
  }
  return (
    <>
      <div className={css.workspaceToolbar}>
        <Badge>{t("hospitality.workspaces.fictionalBeveragesCountArithmeticOnly")}</Badge>
        <Reset
          onClick={() => {
            setEntries(
              drinks.map((row) => ({
                cartons: String(row.cartons),
                units: String(row.units),
              })),
            );
            setLimit("600");
          }}
        />
      </div>
      <div className={css.loadSettings}>
        <Numeric
          label={t("hospitality.workspaces.enteredLimitIndividualUnits")}
          raw={limit}
          onChange={setLimit}
          min={1}
          max={100000000}
        />
        <Note>
          {t("hospitality.workspaces.theEnteredCountLimitIsAn")}
        </Note>
      </div>
      <div
        className={css.tableScroll}
        role="region"
        tabIndex={0}
        aria-label={t("hospitality.workspaces.editableFictionalCartonLoadScrollHorizon")}
      >
        <table>
          <caption className={css.srOnly}>
            {t("hospitality.workspaces.fictionalCartonCountsConvertedToIndividu")}
          </caption>
          <thead>
            <tr>
              {[
                t("hospitality.workspaces.fictionalBeverage"),
                t("hospitality.workspaces.exampleCartons"),
                t("hospitality.workspaces.unitsCarton"),
                t("hospitality.workspaces.calculatedUnits"),
              ].map((s) => (
                <th key={s} scope="col">
                  {s}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {drinks.map((row, i) => (
              <tr key={row.id}>
                <th scope="row">
                  {row.name}
                  <small>{row.id}</small>
                </th>
                <td>
                  <label>
                    <span className={css.srOnly}>{row.name}{" "}{t("hospitality.workspaces.cartons")}</span>
                    <input
                      type="number"
                      inputMode="numeric"
                      min="0"
                      max="10000"
                      step="1"
                      value={entries[i].cartons}
                      onChange={(e) => update(i, "cartons", e.target.value)}
                    />
                  </label>
                </td>
                <td>
                  <label>
                    <span className={css.srOnly}>
                      {row.name}{" "}{t("hospitality.workspaces.unitsPerCarton")}
                    </span>
                    <input
                      type="number"
                      inputMode="numeric"
                      min="1"
                      max="1000"
                      step="1"
                      value={entries[i].units}
                      onChange={(e) => update(i, "units", e.target.value)}
                    />
                  </label>
                </td>
                <td>{result ? num(result.lines[i]) : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <dl className={css.loadMetrics}>
        <Metric
          label={t("hospitality.workspaces.exampleCartons")}
          value={result ? num(result.cartons) : "—"}
        />
        <Metric
          label={t("hospitality.workspaces.calculatedIndividualUnits")}
          value={result ? num(result.units) : "—"}
        />
        <Metric
          label={
            result && result.remaining < 0
              ? t("hospitality.workspaces.unitsOverEnteredLimit")
              : t("hospitality.workspaces.unitsBelowEnteredLimit")
          }
          value={result ? num(Math.abs(result.remaining)) : "—"}
        />
      </dl>
      <Outcome error={error}>
        {result
          ? result.remaining < 0
            ? t("hospitality.workspaces.theExampleExceedsTheEnteredCount", { num: String(num(-result.remaining)) })
            : t("hospitality.workspaces.theExampleIsUnitsBelowThe", { num: String(num(result.remaining)) })
          : ""}
      </Outcome>
      <Note>
        {t("hospitality.workspaces.noDispatchStockReservationRouteAssignmen")}
      </Note>
    </>
  );
}
function HotelWorkspace() {
  const t = useTranslations("pages.industriesApp");
  const [states, setStates] = useState(() => rooms.map((row) => row.state));
  const snapshot = hotelSnapshot(
    rooms.map((row, i) => ({ ...row, state: states[i] })),
  );
  return (
    <>
      <div className={css.workspaceToolbar}>
        <Badge>{t("hospitality.workspaces.sixFictionalRoomsLocalPropertyDay")}</Badge>
        <Reset onClick={() => setStates(rooms.map((row) => row.state))} />
      </div>
      <div className={css.propertyWorkspace}>
        <div className={css.roomBoard}>
          {["01", "02"].map((floor) => (
            <section
              className={css.floorRow}
              key={floor}
              aria-label={t("hospitality.workspaces.exampleFloor", { floor: String(floor) })}
            >
              <header>
                <span>{t("hospitality.workspaces.floor")}{" "}{floor}</span>
                <small>{t("hospitality.workspaces.fictionalRoomStates")}</small>
              </header>
              <div>
                {rooms.map((room, i) =>
                  room.floor === floor ? (
                    <article key={room.id} data-state={states[i]}>
                      <span>{t("hospitality.workspaces.room")}{" "}{room.id}</span>
                      <b>{roomLabels(t)[states[i]]}</b>
                      <small>{money(room.rate)}{" "}{t("hospitality.workspaces.exampleDay")}</small>
                      <label className={css.field}>
                        <span className={css.srOnly}>
                          {t("hospitality.workspaces.room2")}{" "}{room.id}{" "}{t("hospitality.workspaces.exampleState")}
                        </span>
                        <select
                          value={states[i]}
                          onChange={(e) => {
                            const state = e.target.value as RoomState;
                            setStates((prev) =>
                              prev.map((entry, j) => (i === j ? state : entry)),
                            );
                          }}
                        >
                          {roomStates.map((state) => (
                            <option key={state} value={state}>
                              {roomLabels(t)[state]}
                            </option>
                          ))}
                        </select>
                      </label>
                    </article>
                  ) : null,
                )}
              </div>
            </section>
          ))}
        </div>
        <aside className={css.propertyResult}>
          <span>{t("hospitality.workspaces.theDeclaredExampleBasis")}</span>
          <h3>
            {t("hospitality.workspaces.aRoomPicture")}
            <br />
            {t("hospitality.workspaces.withItsContext")}
          </h3>
          <dl className={css.metrics}>
            <Metric
              label={t("hospitality.workspaces.occupiedReadyOccupiedRooms")}
              value={`${snapshot.occupied} / ${snapshot.denominator}`}
            />
            <Metric
              label={t("hospitality.workspaces.illustrativeOccupancy")}
              value={
                snapshot.occupancy === null
                  ? "Undefined"
                  : `${snapshot.occupancy.toFixed(1)}%`
              }
            />
            <Metric label={t("hospitality.workspaces.roomsMarkedService")} value={snapshot.service} />
            <Metric
              label={t("hospitality.workspaces.occupiedExampleRoomCharges")}
              value={money(snapshot.chargeTotal)}
            />
          </dl>
          <Outcome error="">
            {snapshot.occupancy === null
              ? t("hospitality.workspaces.everyExampleRoomIsMarkedService")
              : t("hospitality.workspaces.fictionalCountsReadyOccupiedService", { ready: String(snapshot.ready), occupied: String(snapshot.occupied), service: String(snapshot.service) })}
          </Outcome>
          <Note>
            {t("hospitality.workspaces.readyOccupiedIsTheDeclaredDenominator")}
          </Note>
        </aside>
      </div>
    </>
  );
}
const workspaces = {
  restaurant: RestaurantWorkspace,
  "fast-food": FastFoodWorkspace,
  "guest-house": GuestWorkspace,
  "beverage-distributor": BeverageWorkspace,
  hotel: HotelWorkspace,
};
export default function HospitalityWorkspace({
  slug,
}: {
  slug: HospitalitySlug;
}) {
  const t = useTranslations("pages.industriesApp");
  const p = pages(t)[slug],
    Workspace = workspaces[slug];
  return (
    <section className={css.workspaceSection} id="hospitality-workspace">
      <div className={css.wrap}>
        <div className={css.sectionHeading}>
          <p className={css.eyebrow}>{t("hospitality.workspaces.exploreASmallPartOfThe")}</p>
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
