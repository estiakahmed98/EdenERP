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
  const tx = useTranslations("pages.industriesApp");
  return (
    <button type="button" className={css.reset} onClick={onClick}>
      <RotateCcw size={13} aria-hidden="true" />
      {tx("professional.workspaces.resetExample")}
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
  const tx = useTranslations("pages.industriesApp");
  const [type, setType] = useState("all"),
    [limit, setLimit] = useState("15000000");
  let rows: (typeof properties)[number][] = [],
    error = "";
  try {
    rows = filterProperties(properties, type, number(limit));
  } catch (e) {
    error = e instanceof Error ? e.message : tx("professional.workspaces.useAValidExamplePriceLimit");
  }
  return (
    <>
      <div className={css.toolbar}>
        <Badge>{tx("professional.workspaces.fictionalPropertyPortfolio")}</Badge>
        <Reset
          onClick={() => {
            setType("all");
            setLimit("15000000");
          }}
        />
      </div>
      <div className={css.filterBar}>
        <label className={css.field}>
          <span>{tx("professional.workspaces.illustrativePropertyType")}</span>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="all">{tx("professional.workspaces.allExampleTypes")}</option>
            {[tx("professional.workspaces.apartment"), tx("professional.workspaces.office"), tx("professional.workspaces.shop")].map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
        <Numeric
          label={tx("professional.workspaces.enteredListedPriceLimitBdt")}
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
            <small>{p.type}{" "}{tx("professional.workspaces.fictionalRecord")}</small>
            <h3>{p.name}</h3>
            <p>{num(p.area)}{" "}{tx("professional.workspaces.sqFtIllustrativeArea")}</p>
            <b>{money(p.price)}</b>
          </article>
        ))}
      </div>
      <Outcome error={error}>
        {rows.length
          ? `${rows.length} fictional records match the entered filters.`
          : tx("professional.workspaces.noFictionalRecordsMatchTheseFilters")}
      </Outcome>
      <Note>
        {tx("professional.workspaces.theseAreFictionalListedAmountsSeparate")}
      </Note>
    </>
  );
}
function ArchitectureWorkspace() {
  const tx = useTranslations("pages.industriesApp");
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
        : tx("professional.workspaces.useValidWholeHoursAndAn");
  }
  return (
    <>
      <div className={css.toolbar}>
        <Badge>{tx("professional.workspaces.exArch01FictionalPhaseHours")}</Badge>
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
            label={tx("professional.workspaces.enteredFeePerWholeHourBdt")}
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
            {tx("professional.workspaces.hoursAndTheFeeAreEditable")}
          </Note>
        </div>
        <section
          className={css.summaryCard}
          aria-label={tx("professional.workspaces.localPhaseFeeEstimate")}
        >
          <span>{tx("professional.workspaces.theEffortPhaseByPhase")}</span>
          <h3>{tx("professional.workspaces.aClearerFeeConversation")}</h3>
          <dl className={css.summaryLines}>
            {phases.map((p, i) => (
              <Metric
                key={p.name}
                label={p.name}
                value={result ? money(result.lines[i]) : "—"}
              />
            ))}
            <Metric
              label={tx("professional.workspaces.illustrativePhaseFeeTotal")}
              value={result ? money(result.total) : "—"}
            />
          </dl>
          <Outcome error={error}>
            {result
              ? tx("professional.workspaces.enteredEffortProducesALocalTotal", { money: String(money(result.total)) })
              : ""}
          </Outcome>
          <Note>
            {tx("professional.workspaces.localArithmeticOnlyNoProposalInvoice")}
          </Note>
        </section>
      </div>
    </>
  );
}
function ConstructionWorkspace() {
  const tx = useTranslations("pages.industriesApp");
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
        : tx("professional.workspaces.useValidExampleQuantitiesAndRates");
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
        <Badge>{tx("professional.workspaces.fictionalWorkLinesBdt")}</Badge>
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
          label={tx("professional.workspaces.enteredExampleBudgetBdt")}
          raw={budget}
          onChange={setBudget}
          step="0.01"
        />
        <Note>
          {tx("professional.workspaces.wholeUnitQuantitiesAndRatesAre")}
        </Note>
      </div>
      <div
        className={css.tableScroll}
        role="region"
        tabIndex={0}
        aria-label={tx("professional.workspaces.editableFictionalWorkLinesScrollHorizont")}
      >
        <table>
          <caption className={css.srOnly}>
            {tx("professional.workspaces.fictionalWorkQuantitiesMultipliedByEnter")}
          </caption>
          <thead>
            <tr>
              {[
                tx("professional.workspaces.illustrativeWorkItem"),
                tx("professional.workspaces.unit"),
                tx("professional.workspaces.wholeQuantity"),
                tx("professional.workspaces.enteredRateBdt"),
                tx("professional.workspaces.lineAmountBdt"),
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
                    <span className={css.srOnly}>{w.name}{" "}{tx("professional.workspaces.quantity")}</span>
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
                    <span className={css.srOnly}>{w.name}{" "}{tx("professional.workspaces.rate")}</span>
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
          label={tx("professional.workspaces.enteredLineTotal")}
          value={result ? money(result.total) : "—"}
        />
        <Metric
          label={
            comparison && comparison.remaining < 0
              ? tx("professional.workspaces.overEnteredBudget")
              : tx("professional.workspaces.unallocatedBudget")
          }
          value={comparison ? money(Math.abs(comparison.remaining)) : "—"}
        />
      </dl>
      <Outcome error={error}>
        {comparison
          ? comparison.remaining < 0
            ? tx("professional.workspaces.theLinesExceedTheEnteredBudget", { money: String(money(-comparison.remaining)) })
            : tx("professional.workspaces.theEnteredBudgetHasUnallocated", { money: String(money(comparison.remaining)) })
          : ""}
      </Outcome>
      <Note>
        {tx("professional.workspaces.noProcurementApprovedBudgetOrActual")}
      </Note>
    </>
  );
}
function AccountingWorkspace() {
  const tx = useTranslations("pages.industriesApp");
  const [selected, setSelected] = useState([true, false, false, false]);
  const progress = checklist(selected);
  return (
    <>
      <div className={css.toolbar}>
        <Badge>{tx("professional.workspaces.exEng01ManuallyTrackedExample")}</Badge>
        <Reset onClick={() => setSelected([true, false, false, false])} />
      </div>
      <div className={css.reviewWorkspace}>
        <div className={css.checklist}>
          {reviewTasks(tx).map((task, i) => (
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
                <small>0{i + 1}{" "}{tx("professional.workspaces.exampleTask")}</small>
                <b>{task}</b>
              </span>
            </label>
          ))}
        </div>
        <section
          className={css.summaryCard}
          aria-label={tx("professional.workspaces.manuallySelectedTaskProgress")}
        >
          <span>{tx("professional.workspaces.theSelectedExampleTasks")}</span>
          <h3>{tx("professional.workspaces.aLittleClarityForTheNext")}</h3>
          <div className={css.largeCount}>
            {progress.done}
            <small> / {progress.total}{" "}{tx("professional.workspaces.selected")}</small>
          </div>
          <progress
            className={css.progress}
            value={progress.done}
            max={progress.total}
            aria-label={tx("professional.workspaces.selectedExampleReviewTasks")}
          />
          <dl className={css.metrics}>
            <Metric
              label={tx("professional.workspaces.exampleTasksRemaining")}
              value={progress.remaining}
            />
            <Metric
              label={tx("professional.workspaces.manuallySelectedShare")}
              value={`${progress.percent?.toFixed(0)}%`}
            />
          </dl>
          <Outcome error="">{`${progress.done} of ${progress.total} fictional tasks are selected. No accounts are reviewed automatically.`}</Outcome>
          <Note>
            {tx("professional.workspaces.thePercentageReflectsCheckboxSelectionsO")}
          </Note>
        </section>
      </div>
    </>
  );
}
function MarketingWorkspace() {
  const tx = useTranslations("pages.industriesApp");
  const [amounts, setAmounts] = useState(() =>
      channels.map((c) => String(c.amount)),
    ),
    [budget, setBudget] = useState("300000");
  let result: ReturnType<typeof allocation> | null = null,
    error = "";
  try {
    result = allocation(amounts.map(number), number(budget));
  } catch (e) {
    error = e instanceof Error ? e.message : tx("professional.workspaces.useValidExampleAmounts");
  }
  return (
    <>
      <div className={css.toolbar}>
        <Badge>{tx("professional.workspaces.exCamp01EnteredAmountsOnly")}</Badge>
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
            label={tx("professional.workspaces.enteredTotalBudgetBdt")}
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
            {tx("professional.workspaces.channelAmountsAreAssumptionsSeparateFrom")}
          </Note>
        </div>
        <section
          className={css.campaignResult}
          aria-label={tx("professional.workspaces.localAllocationResult")}
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
              label={tx("professional.workspaces.enteredAllocationTotal")}
              value={result ? money(result.assigned) : "—"}
            />
            <Metric
              label={
                result && result.remaining < 0
                  ? tx("professional.workspaces.overEnteredBudget")
                  : tx("professional.workspaces.unallocatedBudget")
              }
              value={result ? money(Math.abs(result.remaining)) : "—"}
            />
          </dl>
          <Outcome error={error}>
            {result
              ? result.remaining < 0
                ? tx("professional.workspaces.theExampleIsOverBudget", { money: String(money(-result.remaining)) })
                : tx("professional.workspaces.theExampleHasUnallocated", { money: String(money(result.remaining)) })
              : ""}
          </Outcome>
        </section>
      </div>
    </>
  );
}
function TalentWorkspace() {
  const tx = useTranslations("pages.industriesApp");
  const [stages, setStages] = useState(() => candidates.map((c) => c.stage));
  const counts = candidateCounts(stages);
  return (
    <>
      <div className={css.toolbar}>
        <Badge>{tx("professional.workspaces.anonymousFictionalCandidateIds")}</Badge>
        <Reset onClick={() => setStages(candidates.map((c) => c.stage))} />
      </div>
      <dl className={css.threeMetrics}>
        {candidateStages.map((s) => (
          <Metric
            key={s}
            label={`${candidateLabels(tx)[s]} · fictional candidates`}
            value={counts[s]}
          />
        ))}
      </dl>
      <div className={css.candidateCards}>
        {candidates.map((c, i) => (
          <article key={c.id}>
            <UserRound size={27} aria-hidden="true" />
            <h3>{c.id}</h3>
            <p>{c.role}{" "}{tx("professional.workspaces.fictional")}</p>
            <label className={css.field}>
              <span>{c.id}{" "}{tx("professional.workspaces.exampleStage")}</span>
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
                    {candidateLabels(tx)[s]}
                  </option>
                ))}
              </select>
            </label>
          </article>
        ))}
      </div>
      <Outcome error="">{tx("professional.workspaces.fictionalJourneyAppliedInterviewAndShort", { applied: String(counts.applied), interview: String(counts.interview), shortlist: String(counts.shortlist) })}</Outcome>
      <Note>
        {tx("professional.workspaces.stagesAreManuallySelectedNoApplicant")}
      </Note>
    </>
  );
}
function AuditWorkspace() {
  const tx = useTranslations("pages.industriesApp");
  const [states, setStates] = useState(() => evidenceRows.map((r) => r.state)),
    [filter, setFilter] = useState("all");
  const count = evidenceCounts(states),
    visible = evidenceRows
      .map((row, i) => ({ ...row, state: states[i], index: i }))
      .filter((row) => filter === "all" || row.state === filter);
  return (
    <>
      <div className={css.toolbar}>
        <Badge>{tx("professional.workspaces.fictionalEvidenceManuallySelectedStates")}</Badge>
        <Reset
          onClick={() => {
            setStates(evidenceRows.map((r) => r.state));
            setFilter("all");
          }}
        />
      </div>
      <div className={css.evidenceFilter}>
        <label className={css.field}>
          <span>{tx("professional.workspaces.showExampleEvidence")}</span>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">{tx("professional.workspaces.allExampleStates")}</option>
            {evidenceStates.map((s) => (
              <option key={s} value={s}>
                {evidenceLabels(tx)[s]}
              </option>
            ))}
          </select>
        </label>
        <p>
          {count.reviewed}{" "}{tx("professional.workspaces.of")}{" "}{count.total}{" "}{tx("professional.workspaces.manuallyMarkedReviewed")}
        </p>
      </div>
      <dl className={css.threeMetrics}>
        {evidenceStates.map((s) => (
          <Metric
            key={s}
            label={`${evidenceLabels(tx)[s]} · fictional records`}
            value={count[s]}
          />
        ))}
      </dl>
      <div
        className={css.tableScroll}
        role="region"
        tabIndex={0}
        aria-label={tx("professional.workspaces.editableFictionalEvidenceListScrollHoriz")}
      >
        <table>
          <caption className={css.srOnly}>
            {tx("professional.workspaces.fictionalEvidenceStatesSeparateFromCompl")}
          </caption>
          <thead>
            <tr>
              {[
                tx("professional.workspaces.exampleDocument"),
                tx("professional.workspaces.identifier"),
                tx("professional.workspaces.manuallySelectedState"),
                tx("professional.workspaces.context"),
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
                      {row.id}{" "}{tx("professional.workspaces.exampleEvidenceState")}
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
                          {evidenceLabels(tx)[s]}
                        </option>
                      ))}
                    </select>
                  </label>
                </td>
                <td>{tx("professional.workspaces.fictionalRecordNoDocumentAnalysis")}</td>
              </tr>
            ))}
            {visible.length === 0 && (
              <tr>
                <td colSpan={4}>{tx("professional.workspaces.noFictionalRecordsMatchThisState")}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Outcome error="">{`${visible.length} fictional evidence records shown. Reviewed is a manual example state.`}</Outcome>
      <Note>
        {tx("professional.workspaces.noStandardIsEvaluatedFindingCreated")}
      </Note>
    </>
  );
}
function TravelWorkspace() {
  const tx = useTranslations("pages.industriesApp");
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
      e instanceof Error ? e.message : tx("professional.workspaces.useValidExampleCountsAndAmounts");
  }
  const inputs: [keyof typeof fields, string, number, number, string][] = [
    ["travellers", tx("professional.workspaces.exampleTravellers"), 1, 100, "1"],
    ["fare", tx("professional.workspaces.enteredFareTravellerBdt"), 0, 100000000, "0.01"],
    ["rooms", tx("professional.workspaces.exampleRooms"), 1, 100, "1"],
    ["nights", tx("professional.workspaces.exampleNights"), 1, 365, "1"],
    ["nightly", tx("professional.workspaces.enteredRoomRateNightBdt"), 0, 100000000, "0.01"],
    ["transfer", tx("professional.workspaces.enteredTransferAmountBdt"), 0, 100000000, "0.01"],
  ];
  return (
    <>
      <div className={css.toolbar}>
        <Badge>{tx("professional.workspaces.exTrip01EnteredPricesOnly")}</Badge>
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
        <section className={css.summaryCard} aria-label={tx("professional.workspaces.localTripEstimate")}>
          <span>{tx("professional.workspaces.theEnteredJourneyAssumptions")}</span>
          <h3>{tx("professional.workspaces.aLittleClarityBeforeTheNext")}</h3>
          <dl className={css.summaryLines}>
            <Metric
              label={tx("professional.workspaces.travellerFares")}
              value={result ? money(result.fares) : "—"}
            />
            <Metric
              label={tx("professional.workspaces.roomsNightsNightlyRate")}
              value={result ? money(result.stay) : "—"}
            />
            <Metric
              label={tx("professional.workspaces.transferAddedOnce")}
              value={result ? money(result.transfer) : "—"}
            />
            <Metric
              label={tx("professional.workspaces.illustrativeTripTotal")}
              value={result ? money(result.total) : "—"}
            />
          </dl>
          <Outcome error={error}>
            {result
              ? tx("professional.workspaces.theLocalEstimateIsUsingOnly", { money: String(money(result.total)) })
              : ""}
          </Outcome>
          <Note>
            {tx("professional.workspaces.taxesAdditionalFeesAndOtherServices")}
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
  const tx = useTranslations("pages.industriesApp");
  const p = pages(tx)[slug],
    Workspace = workspaces[slug];
  return (
    <section className={css.workspaceSection} id="professional-workspace">
      <div className={css.wrap}>
        <div className={css.sectionHeading}>
          <p className={css.eyebrow}>{tx("professional.workspaces.exploreASmallPartOfThe")}</p>
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
  const tx = useTranslations("pages.industriesApp");
  const [selected, setSelected] = useState(0);
  return (
    <section className={css.workflowSection}>
      <div className={css.wrap}>
        <div className={css.sectionHeading}>
          <p className={css.eyebrow}>{tx("professional.workspaces.theWorkInContext")}</p>
          <h2>{tx("professional.workspaces.keepTheNextHandoffClear")}</h2>
        </div>
        <div
          className={css.workflowChoices}
          role="group"
          aria-label={tx("professional.workspaces.chooseAWorkflowPerspective")}
        >
          {pages(tx)[slug].steps.map(([title], i) => (
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
          {pages(tx)[slug].steps[selected][1]}
        </p>
      </div>
    </section>
  );
}
