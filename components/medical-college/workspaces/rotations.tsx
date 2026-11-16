"use client";
import { useState } from "react";
import {
  BedDouble,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
} from "lucide-react";
import { addDays, validDate } from "../calculations";
import {
  Badge,
  Button,
  CheckField,
  css,
  Field,
  Notice,
  Panel,
  useCollege,
  Workspace,
} from "../ui";
const units = ["unitA", "unitB", "skills"] as const;
type Session = {
  unit: string;
  day: string;
  reference: string;
  note: string;
  attended: boolean;
};
function Calendar() {
  const { t, date, number } = useCollege();
  const [week, setWeek] = useState("2026-11-16"),
    [unit, setUnit] = useState<string>("unitA"),
    [day, setDay] = useState("2026-11-16"),
    [sessions, setSessions] = useState<Session[]>([]),
    [reference, setReference] = useState(""),
    [note, setNote] = useState(""),
    [error, setError] = useState<"sessionReferenceError" | "conflict" | null>(
      null,
    );
  const base = validDate(week) ? week : "2026-11-16",
    days = Array.from({ length: 7 }, (_, i) => addDays(base, i)!),
    selected = sessions.find((s) => s.unit === unit && s.day === day);
  function assign() {
    if (selected) {
      setError("conflict");
      return;
    }
    if (!/^[A-Z0-9-]{2,24}$/i.test(reference.trim())) {
      setError("sessionReferenceError");
      return;
    }
    setSessions([
      ...sessions,
      {
        unit,
        day,
        reference: reference.trim().toUpperCase(),
        note: note.trim(),
        attended: false,
      },
    ]);
    setError(null);
  }
  function choose(u: string, d: string) {
    setUnit(u);
    setDay(d);
    setReference("");
    setNote("");
    setError(null);
  }
  return (
    <div className={css.stack}>
      <div className={css.calendarToolbar}>
        <Field label={t("ui.week")}>
          <input
            type="date"
            value={week}
            onChange={(e) => {
              setWeek(e.target.value);
              if (validDate(e.target.value)) setDay(e.target.value);
            }}
          />
        </Field>
        <div className={css.actions}>
          <Button
            aria-label={t("ui.previousWeek")}
            disabled={!validDate(week)}
            onClick={() => {
              const next = addDays(week, -7);
              if (next) {
                setWeek(next);
                setDay(next);
              }
            }}
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </Button>
          <Button
            aria-label={t("ui.nextWeek")}
            disabled={!validDate(week)}
            onClick={() => {
              const next = addDays(week, 7);
              if (next) {
                setWeek(next);
                setDay(next);
              }
            }}
          >
            <ChevronRight size={18} aria-hidden="true" />
          </Button>
          <Badge>{t("ui.planning")}</Badge>
        </div>
      </div>
      {!validDate(week) && <Notice error>{t("ui.invalid")}</Notice>}
      <div className={css.unitMap} role="group" aria-label={t("ui.unit")}>
        {units.map((u, i) => (
          <button
            type="button"
            key={u}
            aria-pressed={unit === u}
            onClick={() => {
              setUnit(u);
              setError(null);
            }}
          >
            <span className={css.unitTile}>
              <BedDouble size={27} strokeWidth={1.2} aria-hidden="true" />
            </span>
            <span>
              <small>{number(i + 1).padStart(2, number(0))}</small>
              <strong>{t(`ui.${u}`)}</strong>
            </span>
            <i aria-hidden="true" />
          </button>
        ))}
      </div>
      <div className={css.rotationLayout}>
        <Panel title={t("ui.calendar")}>
          <div
            className={css.calendarScroll}
            role="region"
            tabIndex={0}
            aria-label={t("ui.calendar")}
          >
            <table className={css.calendar}>
              <thead>
                <tr>
                  <th scope="col">{t("ui.unit")}</th>
                  {days.map((d) => (
                    <th scope="col" key={d}>
                      {date(d)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {units.map((u) => (
                  <tr key={u}>
                    <th scope="row">{t(`ui.${u}`)}</th>
                    {days.map((d) => {
                      const plan = sessions.find(
                        (s) => s.unit === u && s.day === d,
                      );
                      return (
                        <td key={d}>
                          <button
                            type="button"
                            aria-pressed={unit === u && day === d}
                            data-planned={!!plan}
                            aria-label={`${t("ui.session", { unit: t(`ui.${u}`), date: date(d, true) })} · ${t(`ui.${plan ? "reserved" : "free"}`)}`}
                            onClick={() => choose(u, d)}
                          >
                            {plan ? (
                              <>
                                <span>{plan.reference}</span>
                                <small>
                                  {t(
                                    `ui.${plan.attended ? "attendance" : "reserved"}`,
                                  )}
                                </small>
                              </>
                            ) : (
                              <span aria-hidden="true">+</span>
                            )}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={css.caption}>{t("ui.calendarNote")}</p>
        </Panel>
        <Panel title={t("ui.selected")}>
          <div className={css.selectedDate}>
            <strong>{date(day, true)}</strong>
            <span>{t(`ui.${unit}`)}</span>
          </div>
          {selected ? (
            <div className={css.stack}>
              <Badge>{selected.reference}</Badge>
              <CheckField
                label={t("ui.attended")}
                checked={selected.attended}
                onChange={(v) =>
                  setSessions(
                    sessions.map((s) =>
                      s === selected ? { ...s, attended: v } : s,
                    ),
                  )
                }
              />
              <Field label={t("ui.reflection")}>
                <textarea
                  maxLength={500}
                  value={selected.note}
                  onChange={(e) =>
                    setSessions(
                      sessions.map((s) =>
                        s === selected ? { ...s, note: e.target.value } : s,
                      ),
                    )
                  }
                />
              </Field>
              <Button
                onClick={() => {
                  setSessions(sessions.filter((s) => s !== selected));
                  setReference("");
                  setNote("");
                }}
              >
                {t("ui.remove")}
              </Button>
            </div>
          ) : (
            <div className={css.stack}>
              <Field label={t("ui.reference")}>
                <input
                  value={reference}
                  maxLength={24}
                  onChange={(e) => setReference(e.target.value)}
                  autoComplete="off"
                />
              </Field>
              <Field label={t("ui.reflection")}>
                <textarea
                  value={note}
                  maxLength={500}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder={t("ui.notesHint")}
                />
              </Field>
              <Button primary onClick={assign}>
                {t("ui.assign")}
              </Button>
            </div>
          )}
          {error && <Notice error>{t(`ui.${error}`)}</Notice>}
          <p className={css.caption}>{t("ui.noClinical")}</p>
        </Panel>
      </div>
      <section className={css.learningTrail}>
        <header>
          <ClipboardList size={18} aria-hidden="true" />
          <h3>{t("ui.caseNote")}</h3>
        </header>
        {sessions.length ? (
          <ol>
            {[...sessions]
              .sort((a, b) => a.day.localeCompare(b.day))
              .map((s) => (
                <li key={`${s.unit}-${s.day}`}>
                  <button
                    type="button"
                    onClick={() => {
                      choose(s.unit, s.day);
                      if (!days.includes(s.day)) setWeek(s.day);
                    }}
                  >
                    <time dateTime={s.day}>{date(s.day, true)}</time>
                    <strong>{s.reference}</strong>
                    <span>{t(`ui.${s.unit}`)}</span>
                    <Badge tone={s.attended ? "green" : "neutral"}>
                      {t(`ui.${s.attended ? "attendance" : "reserved"}`)}
                    </Badge>
                  </button>
                </li>
              ))}
          </ol>
        ) : (
          <p>{t("ui.noSessions")}</p>
        )}
      </section>
    </div>
  );
}
export default function Rotations() {
  const [epoch, setEpoch] = useState(0);
  return (
    <Workspace reset={() => setEpoch((n) => n + 1)}>
      <Calendar key={epoch} />
    </Workspace>
  );
}
