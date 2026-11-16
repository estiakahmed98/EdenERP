"use client";
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowRight, BookOpen, Plus, X } from "lucide-react";
import { seatBalance } from "../calculations";
import {
  Badge,
  Button,
  css,
  Field,
  Notice,
  Panel,
  Table,
  useCollege,
  Workspace,
} from "../ui";
const stages = ["inquiry", "verification", "allocation", "admission"] as const;
type Plan = { reference: string; programme: string; stage: number };
function Intake() {
  const { t, number } = useCollege();
  const [plans, setPlans] = useState<Plan[]>([]),
    [query, setQuery] = useState(""),
    [filter, setFilter] = useState("all"),
    [sort, setSort] = useState("ascending"),
    [opened, setOpened] = useState(false),
    [reference, setReference] = useState(""),
    [programme, setProgramme] = useState("MBBS"),
    [error, setError] = useState(false),
    [selected, setSelected] = useState<string | null>(null),
    [capacity, setCapacity] = useState("0"),
    [allocated, setAllocated] = useState("0"),
    [round, setRound] = useState(0);
  const balance =
    capacity.trim() && allocated.trim()
      ? seatBalance(Number(capacity), Number(allocated))
      : null;
  const selectedPlan = plans.find((p) => p.reference === selected);
  const rows = plans
    .filter(
      (p) =>
        p.reference.toLowerCase().includes(query.toLowerCase()) &&
        (filter === "all" || stages[p.stage] === filter),
    )
    .sort((a, b) =>
      sort === "ascending"
        ? a.reference.localeCompare(b.reference)
        : b.reference.localeCompare(a.reference),
    );
  function create() {
    const ref = reference.trim().toUpperCase();
    if (
      !/^[A-Z0-9-]{2,24}$/.test(ref) ||
      plans.some((p) => p.reference === ref)
    ) {
      setError(true);
      return;
    }
    setPlans([...plans, { reference: ref, programme, stage: 0 }]);
    setSelected(ref);
    setOpened(false);
    setReference("");
    setError(false);
  }
  return (
    <div className={css.stack}>
      <div
        className={css.admissionRail}
        role="group"
        aria-label={t("ui.pipeline")}
      >
        {stages.map((s, i) => (
          <button
            key={s}
            type="button"
            aria-pressed={filter === s}
            onClick={() => setFilter(filter === s ? "all" : s)}
          >
            <span>{number(i + 1)}</span>
            <strong>{t(`ui.${s}`)}</strong>
            <b>{number(plans.filter((p) => p.stage === i).length)}</b>
            {i < 3 && <ArrowRight size={15} aria-hidden="true" />}
          </button>
        ))}
      </div>
      <div className={css.intakeGrid}>
        <Panel
          title={t("ui.pipeline")}
          action={
            <Dialog.Root open={opened} onOpenChange={setOpened}>
              <Dialog.Trigger asChild>
                <Button primary>
                  <Plus size={15} aria-hidden="true" />
                  {t("ui.create")}
                </Button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className={css.overlay} />
                <Dialog.Content
                  className={`${css.college} ${css.dialog}`}
                  aria-describedby="plan-description"
                >
                  <Dialog.Title>{t("ui.create")}</Dialog.Title>
                  <Dialog.Description id="plan-description">
                    {t("ui.privacy")}
                  </Dialog.Description>
                  <Dialog.Close
                    className={css.dialogClose}
                    aria-label={t("ui.close")}
                  >
                    <X size={19} />
                  </Dialog.Close>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      create();
                    }}
                    className={css.stack}
                  >
                    <Field label={t("ui.reference")}>
                      <input
                        value={reference}
                        onChange={(e) => setReference(e.target.value)}
                        maxLength={24}
                        autoComplete="off"
                        required
                      />
                    </Field>
                    <Field label={t("ui.programme")}>
                      <select
                        value={programme}
                        onChange={(e) => setProgramme(e.target.value)}
                      >
                        <option>MBBS</option>
                        <option>BDS</option>
                      </select>
                    </Field>
                    {error && <Notice error>{t("ui.referenceError")}</Notice>}
                    <Button primary type="submit">
                      {t("ui.add")}
                    </Button>
                  </form>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          }
        >
          <div className={css.filters}>
            <Field label={t("ui.search")}>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </Field>
            <Field label={t("ui.stage")}>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">{t("ui.all")}</option>
                {stages.map((s) => (
                  <option key={s} value={s}>
                    {t(`ui.${s}`)}
                  </option>
                ))}
              </select>
            </Field>
            <Field label={t("ui.sort")}>
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                {["ascending", "descending"].map((s) => (
                  <option key={s} value={s}>
                    {t(`ui.${s}`)}
                  </option>
                ))}
              </select>
            </Field>
          </div>
          {plans.length === 0 ? (
            <div className={css.empty}>
              <BookOpen size={35} strokeWidth={1.2} aria-hidden="true" />
              <h4>{t("ui.noCandidates")}</h4>
              <p>{t("ui.candidateHelp")}</p>
            </div>
          ) : (
            <>
              <p className={css.caption}>
                {t("ui.count", { count: plans.length })}
              </p>
              <Table
                label={t("ui.pipeline")}
                headers={[
                  t("ui.reference"),
                  t("ui.programme"),
                  t("ui.stage"),
                  t("ui.details"),
                ]}
              >
                {rows.map((p) => (
                  <tr
                    key={p.reference}
                    data-selected={selected === p.reference}
                  >
                    <td>
                      <strong>{p.reference}</strong>
                    </td>
                    <td>{p.programme}</td>
                    <td>
                      <Badge>{t(`ui.${stages[p.stage]}`)}</Badge>
                    </td>
                    <td>
                      <Button onClick={() => setSelected(p.reference)}>
                        {t("ui.open")}
                      </Button>
                    </td>
                  </tr>
                ))}
              </Table>
              {!rows.length && <p className={css.caption}>{t("ui.empty")}</p>}
            </>
          )}
          {selectedPlan && (
            <div className={css.detail} aria-live="polite">
              <div>
                <Badge>{t("ui.planning")}</Badge>
                <h4>{selectedPlan.reference}</h4>
                <p>
                  {selectedPlan.programme} ·{" "}
                  {t(`ui.${stages[selectedPlan.stage]}`)}
                </p>
              </div>
              <div className={css.actions}>
                <Button
                  primary
                  disabled={selectedPlan.stage === 3}
                  onClick={() =>
                    setPlans(
                      plans.map((p) =>
                        p.reference === selected
                          ? { ...p, stage: p.stage + 1 }
                          : p,
                      ),
                    )
                  }
                >
                  {t("ui.advance")}
                  <ArrowRight size={14} aria-hidden="true" />
                </Button>
                <Button
                  onClick={() => {
                    setPlans(plans.filter((p) => p.reference !== selected));
                    setSelected(null);
                  }}
                >
                  {t("ui.remove")}
                </Button>
              </div>
              <p className={css.caption}>{t("ui.noIdentity")}</p>
            </div>
          )}
        </Panel>
        <div className={css.stack}>
          <Panel title={t("ui.seatPlan")}>
            <div className={css.formGrid}>
              <Field label={t("ui.capacity")}>
                <input
                  type="number"
                  min="0"
                  max="99999"
                  step="1"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                />
              </Field>
              <Field label={t("ui.allocated")}>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={allocated}
                  onChange={(e) => setAllocated(e.target.value)}
                />
              </Field>
            </div>
            <div className={css.seatStudy} aria-hidden="true">
              {Array.from({ length: 36 }, (_, i) => (
                <i
                  key={i}
                  data-filled={
                    balance !== null &&
                    Number(capacity) > 0 &&
                    i / 36 < Number(allocated) / Number(capacity)
                  }
                />
              ))}
            </div>
            <div className={css.bigValue}>
              <span>{t("ui.available")}</span>
              <output>{balance === null ? "—" : number(balance)}</output>
            </div>
            {balance === null && <Notice error>{t("ui.seatError")}</Notice>}
            <p className={css.caption}>{t("ui.seatFoot")}</p>
          </Panel>
          <section className={css.roundPaper}>
            <h3>{t("ui.roundPlan")}</h3>
            <div role="group" aria-label={t("ui.round")}>
              {["notice", "choice", "verification", "enrolment"].map(
                (key, i) => (
                  <button
                    type="button"
                    key={key}
                    aria-pressed={round === i}
                    onClick={() => setRound(i)}
                  >
                    <i>{number(i + 1)}</i>
                    {t(`ui.${key}`)}
                  </button>
                ),
              )}
            </div>
            <p aria-live="polite">
              {t(
                `ui.${["notice", "choice", "verification", "enrolment"][round]}`,
              )}
            </p>
            <small>{t("ui.roundHint")}</small>
          </section>
        </div>
      </div>
    </div>
  );
}
export default function Admission() {
  const [epoch, setEpoch] = useState(0);
  return (
    <Workspace reset={() => setEpoch((n) => n + 1)}>
      <Intake key={epoch} />
    </Workspace>
  );
}
