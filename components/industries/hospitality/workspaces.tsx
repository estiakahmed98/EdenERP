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
export function HospitalityStory({ slug }: { slug: HospitalitySlug }) {
  const [index, setIndex] = useState(0),
    p = pages[slug],
    stage = p.stages[index];
  return (
    <section className={css.storySection}>
      <div className={css.wrap}>
        <div className={css.sectionHeading}>
          <p className={css.eyebrow}>THE OPERATION, IN CONTEXT</p>
          <h2>{p.story}</h2>
        </div>
        <div
          className={css.storyChoices}
          role="group"
          aria-label="Choose an operational perspective"
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
  const [selected, setSelected] = useState(1),
    [party, setParty] = useState("4");
  const table = tables[selected];
  let result: ReturnType<typeof seatFit> | null = null,
    error = "";
  try {
    result = seatFit(table.seats, number(party));
  } catch (e) {
    error =
      e instanceof Error ? e.message : "Enter a valid example party size.";
  }
  return (
    <>
      <div className={css.workspaceToolbar}>
        <Badge>Fictional dining room · no live connection</Badge>
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
            <span>EXAMPLE FLOOR / CHOOSE A TABLE</span>
            <small>Occupied example tables are disabled.</small>
          </header>
          <div
            className={css.seatingChoices}
            role="group"
            aria-label="Select a fictional open table"
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
                <span>{row.seats} seats</span>
                <small>
                  {row.state === "occupied"
                    ? "Example occupied"
                    : "Example open"}
                </small>
              </button>
            ))}
          </div>
        </div>
        <section className={css.seatResult} aria-label="Local seat comparison">
          <span>THE PARTY AND THE TABLE</span>
          <h3>
            {table.id} / {table.seats} example seats
          </h3>
          <Numeric
            label="Entered party size · people"
            raw={party}
            onChange={setParty}
            min={1}
            max={1000}
          />
          <dl className={css.metrics}>
            <Metric
              label="Seats left after this party"
              value={result ? num(result.spare) : "—"}
            />
            <Metric
              label="Additional seats needed"
              value={result ? num(result.short) : "—"}
            />
          </dl>
          <Outcome error={error}>
            {result
              ? result.enough
                ? `The entered party fits this fictional table, with ${result.spare} spare seats.`
                : `This fictional table has ${result.short} fewer seats than the entered party needs.`
              : ""}
          </Outcome>
          <Note>
            Single-table seat arithmetic only. No room availability, scheduling
            or reservation is checked.
          </Note>
        </section>
      </div>
    </>
  );
}
function FastFoodWorkspace() {
  const [entries, setEntries] = useState(() =>
    tickets.map((row) => ({ ...row })),
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
        <Badge>Three fictional tickets · local stages</Badge>
        <Reset onClick={() => setEntries(tickets.map((row) => ({ ...row })))} />
      </div>
      <dl className={css.ticketMetrics}>
        {ticketStages.map((stage) => (
          <Metric
            key={stage}
            label={`${ticketLabels[stage]} · example tickets`}
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
              <span>{ticketLabels[row.stage]}</span>
            </header>
            <ul>
              {row.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <ol
              className={css.ticketProgress}
              aria-label={`${row.id} current stage: ${ticketLabels[row.stage]}`}
            >
              {ticketStages.map((stage) => (
                <li key={stage} data-active={row.stage === stage}>
                  <i />
                  <span>{ticketLabels[stage]}</span>
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
                  : `Move ${row.id} to ${ticketLabels[nextTicketStage(row.stage)]}`
              }
            >
              {row.stage === "ready"
                ? "Ready in the example"
                : `Move to ${ticketLabels[nextTicketStage(row.stage)]}`}
              <ArrowRight size={14} aria-hidden="true" />
            </button>
          </article>
        ))}
      </div>
      <Outcome error="">{`Example board: ${counts.queued} queued, ${counts.preparing} preparing and ${counts.ready} ready.`}</Outcome>
      <Note>
        Stages are changed by you. There are no live timers, kitchen messages,
        payments or real order updates.
      </Note>
    </>
  );
}
function GuestWorkspace() {
  const [arrival, setArrival] = useState(arrivalDate),
    [departure, setDeparture] = useState(departureDate),
    [rate, setRate] = useState("4000");
  let result: ReturnType<typeof stayEstimate> | null = null,
    error = "";
  try {
    result = stayEstimate(arrival, departure, number(rate));
  } catch (e) {
    error =
      e instanceof Error ? e.message : "Use valid example dates and rate.";
  }
  return (
    <>
      <div className={css.workspaceToolbar}>
        <Badge>EX-STAY-01 · fictional dates and rate</Badge>
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
            <span>Example arrival date</span>
            <input
              type="date"
              min="2000-01-01"
              max="2100-12-31"
              value={arrival}
              onChange={(e) => setArrival(e.target.value)}
            />
          </label>
          <label className={css.field}>
            <span>Example departure date</span>
            <input
              type="date"
              min="2000-01-01"
              max="2100-12-31"
              value={departure}
              onChange={(e) => setDeparture(e.target.value)}
            />
          </label>
          <Numeric
            label="Entered nightly room rate · BDT"
            raw={rate}
            onChange={setRate}
            max={10000000}
            step="0.01"
          />
          <Note>
            Use 1–365 example nights. Date differences use calendar days in UTC
            and ignore check-in/out times.
          </Note>
        </div>
        <section className={css.stayReceipt} aria-label="Local stay estimate">
          <span>THE STAY, IN A FEW SIMPLE NUMBERS</span>
          <h3>A considered little estimate.</h3>
          <div className={css.nightCount}>
            <strong>{result ? result.nights : "—"}</strong>
            <span>example nights</span>
          </div>
          <dl>
            <Metric
              label="Entered rate, rounded to cents"
              value={result ? money(result.nightly) : "—"}
            />
            <Metric
              label="Example room-charge estimate"
              value={result ? money(result.total) : "—"}
            />
          </dl>
          <Outcome error={error}>
            {result
              ? `${result.nights} nights × ${money(result.nightly)} = ${money(result.total)}.`
              : ""}
          </Outcome>
          <Note>
            Room charge only. This does not include taxes, meals or extras, and
            creates no booking or bill.
          </Note>
        </section>
      </div>
    </>
  );
}
function BeverageWorkspace() {
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
        : "Enter valid example carton and unit counts.";
  }
  function update(index: number, key: "cartons" | "units", raw: string) {
    setEntries((prev) =>
      prev.map((row, i) => (i === index ? { ...row, [key]: raw } : row)),
    );
  }
  return (
    <>
      <div className={css.workspaceToolbar}>
        <Badge>Fictional beverages · count arithmetic only</Badge>
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
          label="Entered limit · individual units"
          raw={limit}
          onChange={setLimit}
          min={1}
          max={100000000}
        />
        <Note>
          The entered count limit is an assumption. It does not represent a
          vehicle’s weight, volume or loading capacity.
        </Note>
      </div>
      <div
        className={css.tableScroll}
        role="region"
        tabIndex={0}
        aria-label="Editable fictional carton load, scroll horizontally"
      >
        <table>
          <caption className={css.srOnly}>
            Fictional carton counts converted to individual units
          </caption>
          <thead>
            <tr>
              {[
                "Fictional beverage",
                "Example cartons",
                "Units / carton",
                "Calculated units",
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
                    <span className={css.srOnly}>{row.name} cartons</span>
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
                      {row.name} units per carton
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
          label="Example cartons"
          value={result ? num(result.cartons) : "—"}
        />
        <Metric
          label="Calculated individual units"
          value={result ? num(result.units) : "—"}
        />
        <Metric
          label={
            result && result.remaining < 0
              ? "Units over entered limit"
              : "Units below entered limit"
          }
          value={result ? num(Math.abs(result.remaining)) : "—"}
        />
      </dl>
      <Outcome error={error}>
        {result
          ? result.remaining < 0
            ? `The example exceeds the entered count limit by ${num(-result.remaining)} units.`
            : `The example is ${num(result.remaining)} units below the entered count limit.`
          : ""}
      </Outcome>
      <Note>
        No dispatch, stock reservation, route assignment or physical loading
        approval is created.
      </Note>
    </>
  );
}
function HotelWorkspace() {
  const [states, setStates] = useState(() => rooms.map((row) => row.state));
  const snapshot = hotelSnapshot(
    rooms.map((row, i) => ({ ...row, state: states[i] })),
  );
  return (
    <>
      <div className={css.workspaceToolbar}>
        <Badge>Six fictional rooms · local property-day example</Badge>
        <Reset onClick={() => setStates(rooms.map((row) => row.state))} />
      </div>
      <div className={css.propertyWorkspace}>
        <div className={css.roomBoard}>
          {["01", "02"].map((floor) => (
            <section
              className={css.floorRow}
              key={floor}
              aria-label={`Example floor ${floor}`}
            >
              <header>
                <span>FLOOR {floor}</span>
                <small>Fictional room states</small>
              </header>
              <div>
                {rooms.map((room, i) =>
                  room.floor === floor ? (
                    <article key={room.id} data-state={states[i]}>
                      <span>ROOM {room.id}</span>
                      <b>{roomLabels[states[i]]}</b>
                      <small>{money(room.rate)} / example day</small>
                      <label className={css.field}>
                        <span className={css.srOnly}>
                          Room {room.id} example state
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
                              {roomLabels[state]}
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
          <span>THE DECLARED EXAMPLE BASIS</span>
          <h3>
            A room picture,
            <br />
            with its context.
          </h3>
          <dl className={css.metrics}>
            <Metric
              label="Occupied / ready+occupied rooms"
              value={`${snapshot.occupied} / ${snapshot.denominator}`}
            />
            <Metric
              label="Illustrative occupancy"
              value={
                snapshot.occupancy === null
                  ? "Undefined"
                  : `${snapshot.occupancy.toFixed(1)}%`
              }
            />
            <Metric label="Rooms marked service" value={snapshot.service} />
            <Metric
              label="Occupied example room charges"
              value={money(snapshot.chargeTotal)}
            />
          </dl>
          <Outcome error="">
            {snapshot.occupancy === null
              ? "Every example room is marked service. The occupancy denominator is zero, so the percentage is undefined."
              : `Fictional counts: ${snapshot.ready} ready, ${snapshot.occupied} occupied, ${snapshot.service} service.`}
          </Outcome>
          <Note>
            Ready + occupied is the declared denominator; service rooms are
            excluded. Charges sum occupied fictional rates for one day, with no
            billing or posted revenue.
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
  const p = pages[slug],
    Workspace = workspaces[slug];
  return (
    <section className={css.workspaceSection} id="hospitality-workspace">
      <div className={css.wrap}>
        <div className={css.sectionHeading}>
          <p className={css.eyebrow}>EXPLORE A SMALL PART OF THE WORK</p>
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
