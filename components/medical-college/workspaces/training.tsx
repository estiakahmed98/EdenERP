"use client";
import { useState } from "react";
import {
  ArrowDownRight,
  BookOpen,
  CalendarDays,
  Check,
  Plus,
} from "lucide-react";
import { overlaps, planningAmount, progress } from "../calculations";
import {
  Badge,
  Button,
  CheckField,
  css,
  Field,
  Notice,
  Panel,
  Ring,
  useCollege,
  Workspace,
} from "../ui";
function Amount({ kind }: { kind: "allowance" | "stipend" }) {
  const { t, money } = useCollege();
  const [rate, setRate] = useState(""),
    [months, setMonths] = useState("1");
  const total =
    rate.trim() && months.trim()
      ? planningAmount(Number(rate), Number(months))
      : null;
  return (
    <section className={css.amountLedger}>
      <header>
        <span>BDT</span>
        <h3>{t(`ui.${kind}`)}</h3>
      </header>
      <div className={css.formGrid}>
        <Field label={t("ui.rate")}>
          <input
            type="number"
            min="0"
            step="0.01"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
        </Field>
        <Field label={t("ui.months")}>
          <input
            type="number"
            min="1"
            max="120"
            value={months}
            onChange={(e) => setMonths(e.target.value)}
          />
        </Field>
      </div>
      <output>{total === null ? "—" : money(total)}</output>
      {rate && total === null && <Notice error>{t("ui.amountError")}</Notice>}
      <p>{t("ui.notPayroll")}</p>
    </section>
  );
}
function Logbook() {
  const { t } = useCollege();
  const [target, setTarget] = useState(""),
    [completed, setCompleted] = useState("0");
  const value =
    target.trim() && completed.trim()
      ? progress(Number(completed), Number(target))
      : null;
  return (
    <Panel title={t("ui.logbook")}>
      <div className={css.logbookStudy}>
        <Ring value={value} label={t("ui.logbookProgress")} />
        <div className={css.stack}>
          <Field label={t("ui.target")}>
            <input
              type="number"
              min="1"
              step="1"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
            />
          </Field>
          <Field label={t("ui.completed")}>
            <input
              type="number"
              min="0"
              step="1"
              value={completed}
              onChange={(e) => setCompleted(e.target.value)}
            />
          </Field>
        </div>
      </div>
      {target && value === null && (
        <Notice error>{t("ui.logbookError")}</Notice>
      )}
    </Panel>
  );
}
function Review() {
  const { t } = useCollege();
  const [notes, setNotes] = useState(""),
    [checked, setChecked] = useState(false),
    [reviewed, setReviewed] = useState(false);
  return (
    <Panel title={t("ui.supervisor")}>
      <div className={css.stack}>
        <Field label={t("ui.feedback")}>
          <textarea
            maxLength={600}
            value={notes}
            onChange={(e) => {
              setNotes(e.target.value);
              setReviewed(false);
            }}
            placeholder={t("ui.notesHint")}
          />
        </Field>
        <CheckField
          label={t("ui.documents")}
          checked={checked}
          onChange={(v) => {
            setChecked(v);
            setReviewed(false);
          }}
        />
        <Button
          disabled={!checked || !notes.trim()}
          onClick={() => setReviewed(true)}
        >
          {t("ui.review")}
        </Button>
        <p className={css.caption}>{t("ui.noApproval")}</p>
        {reviewed && <Notice>{t("ui.notSaved")}</Notice>}
      </div>
    </Panel>
  );
}
function Postings() {
  const { t, date } = useCollege();
  const [rows, setRows] = useState<
      { id: number; title: string; start: string; end: string }[]
    >([]),
    [nextId, setNextId] = useState(1),
    [title, setTitle] = useState(""),
    [start, setStart] = useState(""),
    [end, setEnd] = useState(""),
    [error, setError] = useState(false);
  function add() {
    if (title.trim().length < 2 || overlaps(start, end, rows) !== false) {
      setError(true);
      return;
    }
    setRows([...rows, { id: nextId, title: title.trim(), start, end }]);
    setNextId((n) => n + 1);
    setTitle("");
    setStart("");
    setEnd("");
    setError(false);
  }
  return (
    <section className={css.postingJournal}>
      <header>
        <CalendarDays size={22} aria-hidden="true" />
        <div>
          <h3>{t("ui.posting")}</h3>
          <p>{t("ui.postingHint")}</p>
        </div>
      </header>
      <details className={css.postingForm}>
        <summary>
          <Plus size={16} aria-hidden="true" />
          {t("ui.addPosting")}
        </summary>
        <div className={css.stack}>
          <Field label={t("ui.postingTitle")}>
            <input
              value={title}
              maxLength={80}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Field>
          <div className={css.formGrid}>
            <Field label={t("ui.start")}>
              <input
                type="date"
                value={start}
                onChange={(e) => setStart(e.target.value)}
              />
            </Field>
            <Field label={t("ui.end")}>
              <input
                type="date"
                min={start || undefined}
                value={end}
                onChange={(e) => setEnd(e.target.value)}
              />
            </Field>
          </div>
          <Button primary onClick={add}>
            {t("ui.add")}
          </Button>
          {error && <Notice error>{t("ui.dateError")}</Notice>}
        </div>
      </details>
      {rows.length ? (
        <ol className={css.postingTimeline}>
          {[...rows]
            .sort((a, b) => a.start.localeCompare(b.start))
            .map((r) => (
              <li key={r.id}>
                <span className={css.timelinePoint} />
                <div>
                  <time dateTime={r.start}>
                    {date(r.start, true)} → {date(r.end, true)}
                  </time>
                  <h4>{r.title}</h4>
                  <Badge>{t("ui.planning")}</Badge>
                </div>
                <Button
                  onClick={() => setRows(rows.filter((x) => x.id !== r.id))}
                >
                  {t("ui.remove")}
                </Button>
              </li>
            ))}
        </ol>
      ) : (
        <div className={css.empty}>
          <BookOpen size={38} strokeWidth={1.1} aria-hidden="true" />
          <h4>{t("ui.noPostings")}</h4>
          <p>{t("ui.postingEmpty")}</p>
        </div>
      )}
    </section>
  );
}
function Interns() {
  return (
    <div className={css.internLayout}>
      <Postings />
      <div className={css.stack}>
        <Logbook />
        <Amount kind="allowance" />
      </div>
      <div className={css.internReview}>
        <Review />
      </div>
    </div>
  );
}
function Postgraduate() {
  const { t, number } = useCollege();
  const [track, setTrack] = useState("FCPS"),
    [checks, setChecks] = useState<boolean[]>([false, false, false, false]);
  const stages = ["enrol", "portfolio", "supervisorReview", "assessmentReview"];
  return (
    <div className={css.stack}>
      <div
        className={css.programmeTabs}
        role="group"
        aria-label={t("ui.programme")}
      >
        {["FCPS", "MD", "MS"].map((p) => (
          <button
            type="button"
            key={p}
            aria-pressed={track === p}
            onClick={() => {
              setTrack(p);
              setChecks([false, false, false, false]);
            }}
          >
            <span>{p}</span>
            <ArrowDownRight size={24} aria-hidden="true" />
          </button>
        ))}
      </div>
      <div className={css.pgLayout}>
        <section className={css.pathwayPaper}>
          <p className={css.caption}>{t(`ui.track${track}`)}</p>
          <h3>{t("ui.pathway")}</h3>
          <ol>
            {stages.map((s, i) => (
              <li key={s}>
                <span>{number(i + 1)}</span>
                <CheckField
                  label={t(`ui.${s}`)}
                  checked={checks[i]}
                  onChange={(v) =>
                    setChecks(checks.map((x, j) => (j === i ? v : x)))
                  }
                />
                {checks[i] && <Check size={18} aria-hidden="true" />}
              </li>
            ))}
          </ol>
          <div className={css.pathwayProgress}>
            <Ring
              value={(checks.filter(Boolean).length / 4) * 100}
              label={t("ui.pathProgress")}
            />
            <p>{t("ui.pathwayNote")}</p>
          </div>
        </section>
        <div className={css.stack}>
          <Review key={`${track}-review`} />
          <Amount key={`${track}-stipend`} kind="stipend" />
        </div>
      </div>
    </div>
  );
}
export default function Training({
  kind,
}: {
  kind: "interns" | "postgraduate-trainees";
}) {
  const [epoch, setEpoch] = useState(0);
  return (
    <Workspace reset={() => setEpoch((n) => n + 1)}>
      {kind === "interns" ? (
        <Interns key={epoch} />
      ) : (
        <Postgraduate key={epoch} />
      )}
    </Workspace>
  );
}
