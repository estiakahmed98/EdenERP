"use client";
import { useState } from "react";
import { ArrowRight, Building2, RotateCcw, UserRound } from "lucide-react";
import {
  allocation,
  budgetDifference,
  candidateCounts,
  checklist,
  costLines,
  evidenceCounts,
  filterProperties,
  tripEstimate,
} from "./calculations";
import {
  candidateLabels,
  candidates,
  candidateStages,
  channels,
  evidenceLabels,
  evidenceRows,
  evidenceStates,
  money,
  num,
  pages,
  phases,
  properties,
  reviewTasks,
  workItems,
  type CandidateStage,
  type EvidenceState,
  type ProfessionalSlug,
} from "./data";
import { AllocationRing, Badge, Metric, Note, css } from "./ui";
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
  max = 100000000,
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
function AgencyWorkspace() {
  const [type, setType] = useState("all"),
    [limit, setLimit] = useState("15000000");
  let rows: (typeof properties)[number][] = [],
    error = "";
  try {
    rows = filterProperties(properties, type, number(limit));
  } catch (e) {
    error = e instanceof Error ? e.message : "Use a valid example price limit.";
  }
  return (
    <>
      <div className={css.toolbar}>
        <Badge>Fictional property portfolio</Badge>
        <Reset
          onClick={() => {
            setType("all");
            setLimit("15000000");
          }}
        />
      </div>
      <div className={css.filterBar}>
        <label className={css.field}>
          <span>Illustrative property type</span>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="all">All example types</option>
            {["Apartment", "Office", "Shop"].map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
        <Numeric
          label="Entered listed-price limit · BDT"
          raw={limit}
          onChange={setLimit}
          step="0.01"
        />
      </div>
      <div className={css.propertyCards}>
        {rows.map((p) => (
          <article key={p.id}>
            <div className={css.propertyGlyph}>
              <Building2 size={40} aria-hidden="true" />
              <span>{p.id}</span>
            </div>
            <small>{p.type} / FICTIONAL RECORD</small>
            <h3>{p.name}</h3>
            <p>{num(p.area)} sq ft · illustrative area</p>
            <b>{money(p.price)}</b>
          </article>
        ))}
      </div>
      <Outcome error={error}>
        {rows.length
          ? `${rows.length} fictional records match the entered filters.`
          : "No fictional records match these filters. Try another type or price limit."}
      </Outcome>
      <Note>
        These are fictional listed amounts, separate from real availability,
        valuation or buyer affordability.
      </Note>
    </>
  );
}
function ArchitectureWorkspace() {
  const [hours, setHours] = useState(() => phases.map((p) => String(p.hours))),
    [rate, setRate] = useState("1500");
  let result: ReturnType<typeof costLines> | null = null,
    error = "";
  try {
    result = costLines(
      hours.map((h) => ({ quantity: number(h), rate: number(rate) })),
    );
  } catch (e) {
    error =
      e instanceof Error
        ? e.message
        : "Use valid whole hours and an example rate.";
  }
  return (
    <>
      <div className={css.toolbar}>
        <Badge>EX-ARCH-01 · fictional phase hours</Badge>
        <Reset
          onClick={() => {
            setHours(phases.map((p) => String(p.hours)));
            setRate("1500");
          }}
        />
      </div>
      <div className={css.phaseWorkspace}>
        <div>
          <Numeric
            label="Entered fee per whole hour · BDT"
            raw={rate}
            onChange={setRate}
            step="0.01"
          />
          <div className={css.phaseFields}>
            {phases.map((p, i) => (
              <Numeric
                key={p.name}
                label={`${p.name} · whole hours`}
                raw={hours[i]}
                max={10000}
                onChange={(raw) =>
                  setHours((prev) => prev.map((h, j) => (i === j ? raw : h)))
                }
              />
            ))}
          </div>
          <Note>
            Hours and the fee are editable assumptions; no recommended
            professional rate or scope is inferred.
          </Note>
        </div>
        <section
          className={css.summaryCard}
          aria-label="Local phase-fee estimate"
        >
          <span>THE EFFORT, PHASE BY PHASE</span>
          <h3>A clearer fee conversation.</h3>
          <dl className={css.summaryLines}>
            {phases.map((p, i) => (
              <Metric
                key={p.name}
                label={p.name}
                value={result ? money(result.lines[i]) : "—"}
              />
            ))}
            <Metric
              label="Illustrative phase-fee total"
              value={result ? money(result.total) : "—"}
            />
          </dl>
          <Outcome error={error}>
            {result
              ? `Entered effort produces a local total of ${money(result.total)}.`
              : ""}
          </Outcome>
          <Note>
            Local arithmetic only. No proposal, invoice, tax or project record
            is created.
          </Note>
        </section>
      </div>
    </>
  );
}
function ConstructionWorkspace() {
  const [entries, setEntries] = useState(() =>
      workItems.map((w) => ({
        quantity: String(w.quantity),
        rate: String(w.rate),
      })),
    ),
    [budget, setBudget] = useState("300000");
  let result: ReturnType<typeof costLines> | null = null,
    comparison: { remaining: number } | null = null,
    error = "";
  try {
    result = costLines(
      entries.map((e) => ({
        quantity: number(e.quantity),
        rate: number(e.rate),
      })),
    );
    comparison = { remaining: budgetDifference(result.total, number(budget)) };
  } catch (e) {
    error =
      e instanceof Error
        ? e.message
        : "Use valid example quantities and rates.";
    result = null;
  }
  function update(i: number, key: "quantity" | "rate", raw: string) {
    setEntries((prev) =>
      prev.map((row, j) => (i === j ? { ...row, [key]: raw } : row)),
    );
  }
  return (
    <>
      <div className={css.toolbar}>
        <Badge>Fictional work lines · BDT</Badge>
        <Reset
          onClick={() => {
            setEntries(
              workItems.map((w) => ({
                quantity: String(w.quantity),
                rate: String(w.rate),
              })),
            );
            setBudget("300000");
          }}
        />
      </div>
      <div className={css.budgetSetting}>
        <Numeric
          label="Entered example budget · BDT"
          raw={budget}
          onChange={setBudget}
          step="0.01"
        />
        <Note>
          Whole-unit quantities and rates are fictional. The units label the
          example lines, not an engineering specification.
        </Note>
      </div>
      <div
        className={css.tableScroll}
        role="region"
        tabIndex={0}
        aria-label="Editable fictional work lines, scroll horizontally"
      >
        <table>
          <caption className={css.srOnly}>
            Fictional work quantities multiplied by entered unit rates
          </caption>
          <thead>
            <tr>
              {[
                "Illustrative work item",
                "Unit",
                "Whole quantity",
                "Entered rate · BDT",
                "Line amount · BDT",
              ].map((s) => (
                <th key={s} scope="col">
                  {s}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {workItems.map((w, i) => (
              <tr key={w.name}>
                <th scope="row">{w.name}</th>
                <td>{w.unit}</td>
                <td>
                  <label>
                    <span className={css.srOnly}>{w.name} quantity</span>
                    <input
                      type="number"
                      min="0"
                      max="10000"
                      step="1"
                      inputMode="numeric"
                      value={entries[i].quantity}
                      onChange={(e) => update(i, "quantity", e.target.value)}
                    />
                  </label>
                </td>
                <td>
                  <label>
                    <span className={css.srOnly}>{w.name} rate</span>
                    <input
                      type="number"
                      min="0"
                      max="100000000"
                      step="0.01"
                      inputMode="decimal"
                      value={entries[i].rate}
                      onChange={(e) => update(i, "rate", e.target.value)}
                    />
                  </label>
                </td>
                <td>{result ? money(result.lines[i]) : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <dl className={css.metrics}>
        <Metric
          label="Entered line total"
          value={result ? money(result.total) : "—"}
        />
        <Metric
          label={
            comparison && comparison.remaining < 0
              ? "Over entered budget"
              : "Unallocated budget"
          }
          value={comparison ? money(Math.abs(comparison.remaining)) : "—"}
        />
      </dl>
      <Outcome error={error}>
        {comparison
          ? comparison.remaining < 0
            ? `The lines exceed the entered budget by ${money(-comparison.remaining)}.`
            : `The entered budget has ${money(comparison.remaining)} unallocated.`
          : ""}
      </Outcome>
      <Note>
        No procurement, approved budget or actual project-cost result is
        represented.
      </Note>
    </>
  );
}
function AccountingWorkspace() {
  const [selected, setSelected] = useState([true, false, false, false]);
  const progress = checklist(selected);
  return (
    <>
      <div className={css.toolbar}>
        <Badge>EX-ENG-01 · manually tracked example</Badge>
        <Reset onClick={() => setSelected([true, false, false, false])} />
      </div>
      <div className={css.reviewWorkspace}>
        <div className={css.checklist}>
          {reviewTasks.map((task, i) => (
            <label key={task}>
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
              <span>
                <small>0{i + 1} / EXAMPLE TASK</small>
                <b>{task}</b>
              </span>
            </label>
          ))}
        </div>
        <section
          className={css.summaryCard}
          aria-label="Manually selected task progress"
        >
          <span>THE SELECTED EXAMPLE TASKS</span>
          <h3>A little clarity for the next review.</h3>
          <div className={css.largeCount}>
            {progress.done}
            <small> / {progress.total} selected</small>
          </div>
          <progress
            className={css.progress}
            value={progress.done}
            max={progress.total}
            aria-label="Selected example review tasks"
          />
          <dl className={css.metrics}>
            <Metric
              label="Example tasks remaining"
              value={progress.remaining}
            />
            <Metric
              label="Manually selected share"
              value={`${progress.percent?.toFixed(0)}%`}
            />
          </dl>
          <Outcome error="">{`${progress.done} of ${progress.total} fictional tasks are selected. No accounts are reviewed automatically.`}</Outcome>
          <Note>
            The percentage reflects checkbox selections only; it is not an
            engagement conclusion.
          </Note>
        </section>
      </div>
    </>
  );
}
function MarketingWorkspace() {
  const [amounts, setAmounts] = useState(() =>
      channels.map((c) => String(c.amount)),
    ),
    [budget, setBudget] = useState("300000");
  let result: ReturnType<typeof allocation> | null = null,
    error = "";
  try {
    result = allocation(amounts.map(number), number(budget));
  } catch (e) {
    error = e instanceof Error ? e.message : "Use valid example amounts.";
  }
  return (
    <>
      <div className={css.toolbar}>
        <Badge>EX-CAMP-01 · entered amounts only</Badge>
        <Reset
          onClick={() => {
            setAmounts(channels.map((c) => String(c.amount)));
            setBudget("300000");
          }}
        />
      </div>
      <div className={css.campaignWorkspace}>
        <div>
          <Numeric
            label="Entered total budget · BDT"
            raw={budget}
            onChange={setBudget}
            step="0.01"
          />
          <div className={css.channelFields}>
            {channels.map((c, i) => (
              <Numeric
                key={c.name}
                label={`${c.name} allocation · BDT`}
                raw={amounts[i]}
                step="0.01"
                onChange={(raw) =>
                  setAmounts((prev) => prev.map((v, j) => (i === j ? raw : v)))
                }
              />
            ))}
          </div>
          <Note>
            Channel amounts are assumptions, separate from any ad platform,
            performance result or approved spend.
          </Note>
        </div>
        <section
          className={css.campaignResult}
          aria-label="Local allocation result"
        >
          <AllocationRing
            amounts={result ? result.shares : [0, 0, 0]}
            labels={channels.map((c) => c.name)}
          />
          <ul className={css.channelLegend}>
            {channels.map((c, i) => (
              <li key={c.name}>
                <i />
                <span>{c.name}</span>
                <b>{result ? `${result.shares[i].toFixed(1)}%` : "—"}</b>
              </li>
            ))}
          </ul>
          <dl className={css.metrics}>
            <Metric
              label="Entered allocation total"
              value={result ? money(result.assigned) : "—"}
            />
            <Metric
              label={
                result && result.remaining < 0
                  ? "Over entered budget"
                  : "Unallocated budget"
              }
              value={result ? money(Math.abs(result.remaining)) : "—"}
            />
          </dl>
          <Outcome error={error}>
            {result
              ? result.remaining < 0
                ? `The example is ${money(-result.remaining)} over budget.`
                : `The example has ${money(result.remaining)} unallocated.`
              : ""}
          </Outcome>
        </section>
      </div>
    </>
  );
}
function TalentWorkspace() {
  const [stages, setStages] = useState(() => candidates.map((c) => c.stage));
  const counts = candidateCounts(stages);
  return (
    <>
      <div className={css.toolbar}>
        <Badge>Anonymous fictional candidate IDs</Badge>
        <Reset onClick={() => setStages(candidates.map((c) => c.stage))} />
      </div>
      <dl className={css.threeMetrics}>
        {candidateStages.map((s) => (
          <Metric
            key={s}
            label={`${candidateLabels[s]} · fictional candidates`}
            value={counts[s]}
          />
        ))}
      </dl>
      <div className={css.candidateCards}>
        {candidates.map((c, i) => (
          <article key={c.id}>
            <UserRound size={27} aria-hidden="true" />
            <h3>{c.id}</h3>
            <p>{c.role} / fictional</p>
            <label className={css.field}>
              <span>{c.id} · example stage</span>
              <select
                value={stages[i]}
                onChange={(e) => {
                  const stage = e.target.value as CandidateStage;
                  setStages((prev) =>
                    prev.map((s, j) => (i === j ? stage : s)),
                  );
                }}
              >
                {candidateStages.map((s) => (
                  <option key={s} value={s}>
                    {candidateLabels[s]}
                  </option>
                ))}
              </select>
            </label>
          </article>
        ))}
      </div>
      <Outcome error="">{`Fictional journey: ${counts.applied} applied, ${counts.interview} interview and ${counts.shortlist} shortlisted.`}</Outcome>
      <Note>
        Stages are manually selected. No applicant is assessed, ranked,
        contacted or saved.
      </Note>
    </>
  );
}
function AuditWorkspace() {
  const [states, setStates] = useState(() => evidenceRows.map((r) => r.state)),
    [filter, setFilter] = useState("all");
  const count = evidenceCounts(states),
    visible = evidenceRows
      .map((row, i) => ({ ...row, state: states[i], index: i }))
      .filter((row) => filter === "all" || row.state === filter);
  return (
    <>
      <div className={css.toolbar}>
        <Badge>Fictional evidence · manually selected states</Badge>
        <Reset
          onClick={() => {
            setStates(evidenceRows.map((r) => r.state));
            setFilter("all");
          }}
        />
      </div>
      <div className={css.evidenceFilter}>
        <label className={css.field}>
          <span>Show example evidence</span>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All example states</option>
            {evidenceStates.map((s) => (
              <option key={s} value={s}>
                {evidenceLabels[s]}
              </option>
            ))}
          </select>
        </label>
        <p>
          {count.reviewed} of {count.total} manually marked reviewed
        </p>
      </div>
      <dl className={css.threeMetrics}>
        {evidenceStates.map((s) => (
          <Metric
            key={s}
            label={`${evidenceLabels[s]} · fictional records`}
            value={count[s]}
          />
        ))}
      </dl>
      <div
        className={css.tableScroll}
        role="region"
        tabIndex={0}
        aria-label="Editable fictional evidence list, scroll horizontally"
      >
        <table>
          <caption className={css.srOnly}>
            Fictional evidence states, separate from compliance or certification
            decisions
          </caption>
          <thead>
            <tr>
              {[
                "Example document",
                "Identifier",
                "Manually selected state",
                "Context",
              ].map((s) => (
                <th key={s} scope="col">
                  {s}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.map((row) => (
              <tr key={row.id}>
                <th scope="row">{row.name}</th>
                <td>{row.id}</td>
                <td>
                  <label>
                    <span className={css.srOnly}>
                      {row.id} example evidence state
                    </span>
                    <select
                      value={row.state}
                      onChange={(e) => {
                        const state = e.target.value as EvidenceState;
                        setStates((prev) =>
                          prev.map((s, j) => (row.index === j ? state : s)),
                        );
                      }}
                    >
                      {evidenceStates.map((s) => (
                        <option key={s} value={s}>
                          {evidenceLabels[s]}
                        </option>
                      ))}
                    </select>
                  </label>
                </td>
                <td>Fictional record · no document analysis</td>
              </tr>
            ))}
            {visible.length === 0 && (
              <tr>
                <td colSpan={4}>No fictional records match this state.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Outcome error="">{`${visible.length} fictional evidence records shown. Reviewed is a manual example state.`}</Outcome>
      <Note>
        No standard is evaluated, finding created or certificate issued by this
        local list.
      </Note>
    </>
  );
}
function TravelWorkspace() {
  const [fields, setFields] = useState({
    travellers: "2",
    fare: "25000",
    rooms: "1",
    nights: "3",
    nightly: "5000",
    transfer: "3000",
  });
  let result: ReturnType<typeof tripEstimate> | null = null,
    error = "";
  try {
    result = tripEstimate({
      travellers: number(fields.travellers),
      fare: number(fields.fare),
      rooms: number(fields.rooms),
      nights: number(fields.nights),
      nightly: number(fields.nightly),
      transfer: number(fields.transfer),
    });
  } catch (e) {
    error =
      e instanceof Error ? e.message : "Use valid example counts and amounts.";
  }
  const inputs: [keyof typeof fields, string, number, number, string][] = [
    ["travellers", "Example travellers", 1, 100, "1"],
    ["fare", "Entered fare / traveller · BDT", 0, 100000000, "0.01"],
    ["rooms", "Example rooms", 1, 100, "1"],
    ["nights", "Example nights", 1, 365, "1"],
    ["nightly", "Entered room rate / night · BDT", 0, 100000000, "0.01"],
    ["transfer", "Entered transfer amount · BDT", 0, 100000000, "0.01"],
  ];
  return (
    <>
      <div className={css.toolbar}>
        <Badge>EX-TRIP-01 · entered prices only</Badge>
        <Reset
          onClick={() =>
            setFields({
              travellers: "2",
              fare: "25000",
              rooms: "1",
              nights: "3",
              nightly: "5000",
              transfer: "3000",
            })
          }
        />
      </div>
      <div className={css.travelWorkspace}>
        <div className={css.tripFields}>
          {inputs.map(([key, label, min, max, step]) => (
            <Numeric
              key={key}
              label={label}
              raw={fields[key]}
              min={min}
              max={max}
              step={step}
              onChange={(raw) => setFields((prev) => ({ ...prev, [key]: raw }))}
            />
          ))}
        </div>
        <section className={css.summaryCard} aria-label="Local trip estimate">
          <span>THE ENTERED JOURNEY ASSUMPTIONS</span>
          <h3>A little clarity before the next conversation.</h3>
          <dl className={css.summaryLines}>
            <Metric
              label="Traveller fares"
              value={result ? money(result.fares) : "—"}
            />
            <Metric
              label="Rooms × nights × nightly rate"
              value={result ? money(result.stay) : "—"}
            />
            <Metric
              label="Transfer added once"
              value={result ? money(result.transfer) : "—"}
            />
            <Metric
              label="Illustrative trip total"
              value={result ? money(result.total) : "—"}
            />
          </dl>
          <Outcome error={error}>
            {result
              ? `The local estimate is ${money(result.total)}, using only entered assumptions.`
              : ""}
          </Outcome>
          <Note>
            Taxes, additional fees and other services are excluded. No live
            fares, availability, reservation or ticketing is connected.
          </Note>
        </section>
      </div>
    </>
  );
}
const workspaces = {
  "real-estate-agency": AgencyWorkspace,
  "architecture-firm": ArchitectureWorkspace,
  construction: ConstructionWorkspace,
  "accounting-firm": AccountingWorkspace,
  "marketing-agency": MarketingWorkspace,
  "talent-acquisition": TalentWorkspace,
  "audit-certification": AuditWorkspace,
  "travel-agency": TravelWorkspace,
};
export default function ProfessionalWorkspace({
  slug,
}: {
  slug: ProfessionalSlug;
}) {
  const p = pages[slug],
    Workspace = workspaces[slug];
  return (
    <section className={css.workspaceSection} id="professional-workspace">
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
export function ProfessionalWorkflow({ slug }: { slug: ProfessionalSlug }) {
  const [selected, setSelected] = useState(0);
  return (
    <section className={css.workflowSection}>
      <div className={css.wrap}>
        <div className={css.sectionHeading}>
          <p className={css.eyebrow}>THE WORK, IN CONTEXT</p>
          <h2>Keep the next handoff clear.</h2>
        </div>
        <div
          className={css.workflowChoices}
          role="group"
          aria-label="Choose a workflow perspective"
        >
          {pages[slug].steps.map(([title], i) => (
            <button
              key={title}
              type="button"
              aria-pressed={selected === i}
              onClick={() => setSelected(i)}
            >
              <span>0{i + 1}</span>
              {title}
              <ArrowRight size={15} aria-hidden="true" />
            </button>
          ))}
        </div>
        <p className={css.workflowDetail} aria-live="polite">
          {pages[slug].steps[selected][1]}
        </p>
      </div>
    </section>
  );
}
