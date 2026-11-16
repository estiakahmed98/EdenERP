"use client";
import { useState } from "react";
import { Fingerprint, Plus, UserRound } from "lucide-react";
import { nextQueueState } from "../calculations";
import {
  Badge,
  Button,
  css,
  DataTable,
  Empty,
  Field,
  Notice,
  Panel,
  Tabs,
  useHospital,
  Workspace,
} from "../ui";

function Patients() {
  const { t } = useHospital();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState("DEMO-P01");
  const [tab, setTab] = useState("identity");
  const [form, setForm] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [consent, setConsent] = useState(false);
  const [result, setResult] = useState<"required" | "reviewOnly" | null>(null);
  const records = ["DEMO-P01", "DEMO-P02", "DEMO-P03", "DEMO-P04"];
  const filtered = records.filter((id) =>
    id.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <div className={css.stack}>
      <div className={css.toolbar}>
        <Field label={t("ui.search")}>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="DEMO-P01"
          />
        </Field>
        <Button onClick={() => setForm(!form)} aria-expanded={form}>
          <Plus size={14} aria-hidden="true" />
          {t("ui.register")}
        </Button>
      </div>
      {form && (
        <Panel title={t("ui.newRecord")}>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setResult(
                identifier.trim() &&
                  !records.includes(identifier.trim().toUpperCase()) &&
                  consent
                  ? "reviewOnly"
                  : "required",
              );
            }}
          >
            <div className={css.formGrid}>
              <Field label={t("ui.identifier")}>
                <input
                  value={identifier}
                  onChange={(event) => {
                    setIdentifier(event.target.value);
                    setResult(null);
                  }}
                  required
                  maxLength={32}
                  pattern="DEMO-[A-Za-z0-9-]+"
                  placeholder="DEMO-P05"
                />
              </Field>
              <div>
                <label className={css.check}>
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(event) => setConsent(event.target.checked)}
                    required
                  />
                  {t("ui.consentNote")}
                </label>
              </div>
            </div>
            <Button type="submit" primary>
              {t("ui.review")}
            </Button>
            {result && (
              <Notice error={result === "required"}>{t(`ui.${result}`)}</Notice>
            )}
          </form>
        </Panel>
      )}
      <div className={css.twoCol}>
        <Panel title={t("ui.worklist")}>
          <DataTable
            title={t("ui.patient")}
            headers={["UHID", t("ui.consent"), t("ui.details")]}
          >
            {filtered.map((id, index) => (
              <tr key={id} data-selected={selected === id}>
                <td>
                  <strong>{id}</strong>
                </td>
                <td>
                  <Badge tone={index === 2 ? "amber" : "green"}>
                    {t(index === 2 ? "ui.pending" : "ui.given")}
                  </Badge>
                </td>
                <td>
                  <Button
                    onClick={() => setSelected(id)}
                    aria-pressed={selected === id}
                  >
                    {t("ui.open")}
                  </Button>
                </td>
              </tr>
            ))}
          </DataTable>
          {!filtered.length && <Empty />}
        </Panel>
        <Panel
          title={
            <span className={css.rowActions}>
              <UserRound size={17} aria-hidden="true" />
              {selected}
            </span>
          }
        >
          <Tabs
            values={["identity", "history"]}
            value={tab}
            onChange={setTab}
          />
          {tab === "identity" ? (
            <div className={css.documentPreview}>
              <Fingerprint size={35} aria-hidden="true" />
              <dl className={css.detailList}>
                <div>
                  <dt>{t("ui.patient")}</dt>
                  <dd>{selected}</dd>
                </div>
                <div>
                  <dt>{t("ui.consent")}</dt>
                  <dd>
                    <Badge>
                      {t(selected === "DEMO-P03" ? "ui.pending" : "ui.given")}
                    </Badge>
                  </dd>
                </div>
              </dl>
            </div>
          ) : (
            <ol className={css.timeline}>
              {["identity", "appointment", "consulting"].map((key) => (
                <li key={key}>
                  <strong>{t(`ui.${key}`)}</strong>
                  <span className={css.small}>{t("ui.illustrative")}</span>
                </li>
              ))}
            </ol>
          )}
        </Panel>
      </div>
    </div>
  );
}
function Queue() {
  const { t, number } = useHospital();
  const [sitting, setSitting] = useState("S01");
  const [states, setStates] = useState<Record<string, string>>({
    "DEMO-Q01": "booked",
    "DEMO-Q02": "arrived",
    "DEMO-Q03": "called",
    "DEMO-Q04": "booked",
    "DEMO-Q05": "arrived",
    "DEMO-Q06": "booked",
  });
  const ids = Object.keys(states).filter((_, index) =>
    sitting === "S01"
      ? index < 3
      : sitting === "S02"
        ? index >= 3 && index < 5
        : index === 5,
  );
  return (
    <div className={css.stack}>
      <div className={css.tileGrid}>
        {["medicine", "cardiology", "radiology"].map((department, index) => {
          const id = `S0${index + 1}`;
          return (
            <button
              type="button"
              className={css.selectCard}
              key={id}
              aria-pressed={sitting === id}
              onClick={() => setSitting(id)}
            >
              <strong>DEMO-{id}</strong>
              <span>{t(`ui.${department}`)}</span>
              <span className={css.small}>
                {t("ui.capacity")}: {number(20)}
              </span>
            </button>
          );
        })}
      </div>
      <Panel title={t("ui.worklist")}>
        <div className={css.tokenList}>
          {ids.map((id) => {
            const state = states[id];
            const next = nextQueueState(state);
            return (
              <div className={css.tokenRow} key={id}>
                <strong>{id}</strong>
                <Badge tone={state === "seen" ? "green" : "blue"}>
                  {t(`ui.${state}`)}
                </Badge>
                <Button
                  primary
                  disabled={!next}
                  onClick={() => next && setStates({ ...states, [id]: next })}
                >
                  {t(next ? "ui.advance" : "ui.terminal")}
                </Button>
              </div>
            );
          })}
        </div>
      </Panel>
    </div>
  );
}
function Consultations() {
  const { t } = useHospital();
  const [view, setView] = useState("worklist");
  const [visit, setVisit] = useState("DEMO-C01");
  const [notes, setNotes] = useState("");
  const [reason, setReason] = useState("");
  const [locked, setLocked] = useState(false);
  const [amend, setAmend] = useState(false);
  const [error, setError] = useState(false);
  return (
    <>
      <Tabs
        values={["worklist", "certificates"]}
        value={view}
        onChange={setView}
      />
      {view === "certificates" ? (
        <Panel title={t("ui.certificates")}>
          <Notice>{t("ui.noClinicalDocument")}</Notice>
        </Panel>
      ) : (
        <div className={css.twoCol}>
          <div className={css.stack}>
            <Field label={t("ui.visit")}>
              <select
                value={visit}
                onChange={(event) => {
                  setVisit(event.target.value);
                  setNotes("");
                  setLocked(false);
                  setAmend(false);
                  setError(false);
                  setReason("");
                }}
              >
                <option>DEMO-C01</option>
                <option>DEMO-C02</option>
              </select>
            </Field>
            <Field label={t("ui.notes")}>
              <textarea
                className={css.noteEditor}
                value={notes}
                onChange={(event) => {
                  setNotes(event.target.value);
                  setError(false);
                }}
                readOnly={locked}
                maxLength={2000}
                placeholder={t("ui.notePrompt")}
              />
            </Field>
            {amend && (
              <Field label={t("ui.amendReason")}>
                <input
                  value={reason}
                  onChange={(event) => setReason(event.target.value)}
                  required
                  maxLength={140}
                />
              </Field>
            )}
            <div className={css.rowActions}>
              {locked ? (
                <Button
                  onClick={() => {
                    setLocked(false);
                    setAmend(true);
                  }}
                >
                  {t("ui.amend")}
                </Button>
              ) : (
                <Button
                  primary
                  onClick={() => {
                    if (!notes.trim() || (amend && !reason.trim()))
                      setError(true);
                    else {
                      setLocked(true);
                      setError(false);
                    }
                  }}
                >
                  {t("ui.lock")}
                </Button>
              )}
            </div>
            {error && <Notice error>{t("ui.required")}</Notice>}
          </div>
          <Panel title={t("ui.review")}>
            <div className={css.statusLine}>
              <strong>{visit}</strong>
              <Badge tone={locked ? "green" : "amber"}>
                {t(locked ? "ui.signed" : "ui.draft")}
              </Badge>
            </div>
            <div className={css.documentPreview}>
              <p>{notes || t("ui.notePrompt")}</p>
              {amend && reason && (
                <p>
                  {t("ui.amendReason")}: {reason}
                </p>
              )}
            </div>
            <Notice>{t("ui.noClinicalDocument")}</Notice>
          </Panel>
        </div>
      )}
    </>
  );
}
export default function FrontDeskWorkspace({
  kind,
}: {
  kind: "patients" | "queue" | "consultations";
}) {
  const [epoch, setEpoch] = useState(0);
  return (
    <Workspace kind={kind} reset={() => setEpoch(epoch + 1)}>
      {kind === "patients" ? (
        <Patients key={epoch} />
      ) : kind === "queue" ? (
        <Queue key={epoch} />
      ) : (
        <Consultations key={epoch} />
      )}
    </Workspace>
  );
}
