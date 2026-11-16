"use client";
import { useState } from "react";
import { FlaskConical, Pill, ScanLine } from "lucide-react";
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

function Laboratory() {
  const { t, number } = useHospital();
  const stages = ["collect", "receive", "processing", "verify"];
  const [states, setStates] = useState([0, 1, 2, 3]);
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const rows = states
    .map((stage, index) => ({ stage, index, id: `DEMO-L0${index + 1}` }))
    .filter(
      (row) =>
        (filter === "all" || stages[row.stage] === filter) &&
        row.id.toLowerCase().includes(query.toLowerCase()),
    );
  return (
    <>
      <div className={css.collectionCounts}>
        {stages.map((key, index) => (
          <div key={key}>
            <strong>
              {number(states.filter((state) => state === index).length)}
            </strong>
            {t(`ui.${key}`)}
          </div>
        ))}
      </div>
      <Tabs values={["all", ...stages]} value={filter} onChange={setFilter} />
      <div className={css.twoCol}>
        <div className={css.stack}>
          <Field label={t("ui.search")}>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="DEMO-L01"
            />
          </Field>
          <div className={css.workCards}>
            {rows.map((row) => (
              <div className={css.workCard} key={row.id}>
                <div>
                  <strong>
                    <FlaskConical size={15} aria-hidden="true" /> {row.id}
                  </strong>
                  <span className={css.small}>{t("ui.specimen")}</span>
                  <Badge>{t(`ui.${stages[row.stage]}`)}</Badge>
                </div>
                <Button
                  onClick={() => setSelected(row.index)}
                  aria-pressed={selected === row.index}
                >
                  {t("ui.trace")}
                </Button>
              </div>
            ))}
          </div>
          {!rows.length && <Empty />}
        </div>
        <Panel title={`DEMO-L0${selected + 1}`}>
          <ol className={css.timeline}>
            {stages.map((key, index) => (
              <li key={key}>
                <strong>{t(`ui.${key}`)}</strong>
                <Badge tone={index <= states[selected] ? "blue" : "neutral"}>
                  {t(index <= states[selected] ? "ui.selected" : "ui.pending")}
                </Badge>
              </li>
            ))}
          </ol>
          <div className={css.statusLine}>
            <Button
              primary
              disabled={states[selected] === 3}
              onClick={() =>
                setStates(
                  states.map((stage, index) =>
                    index === selected ? Math.min(3, stage + 1) : stage,
                  ),
                )
              }
            >
              {t(states[selected] === 3 ? "ui.terminal" : "ui.advance")}
            </Button>
          </div>
        </Panel>
      </div>
      <Notice>{t("ui.noResults")}</Notice>
    </>
  );
}
function Imaging() {
  const { t } = useHospital();
  const [modality, setModality] = useState("all");
  const [selected, setSelected] = useState(0);
  const [stages, setStages] = useState([0, 1, 0, 2]);
  const [notes, setNotes] = useState<Record<number, string>>({});
  const modalities = ["CT", "MRI", "ECG", "CT"];
  const labels = ["todo", "toReport", "draft"];
  return (
    <div className={css.stack}>
      <Field label={t("ui.modality")}>
        <select
          value={modality}
          onChange={(event) => {
            setModality(event.target.value);
            if (event.target.value !== "all")
              setSelected(modalities.indexOf(event.target.value));
          }}
        >
          <option value="all">{t("ui.all")}</option>
          {["CT", "MRI", "ECG"].map((value) => (
            <option key={value}>{value}</option>
          ))}
        </select>
      </Field>
      <DataTable
        title={t("ui.worklist")}
        headers={[
          t("ui.identifier"),
          t("ui.modality"),
          t("ui.status"),
          t("ui.details"),
        ]}
      >
        {modalities.map((value, index) =>
          modality === "all" || modality === value ? (
            <tr key={index} data-selected={selected === index}>
              <td>DEMO-IS0{index + 1}</td>
              <td>{value}</td>
              <td>
                <Badge tone={stages[index] === 2 ? "amber" : "blue"}>
                  {t(`ui.${labels[stages[index]]}`)}
                </Badge>
              </td>
              <td>
                <Button
                  onClick={() => setSelected(index)}
                  aria-pressed={selected === index}
                >
                  {t("ui.open")}
                </Button>
              </td>
            </tr>
          ) : null,
        )}
      </DataTable>
      <Panel
        title={
          <span className={css.rowActions}>
            <ScanLine size={18} aria-hidden="true" />
            DEMO-IS0{selected + 1} / {modalities[selected]}
          </span>
        }
      >
        <div className={css.twoCol}>
          <Field label={t("ui.notes")}>
            <textarea
              value={notes[selected] ?? ""}
              maxLength={1000}
              placeholder={t("ui.notePrompt")}
              onChange={(event) =>
                setNotes({ ...notes, [selected]: event.target.value })
              }
            />
          </Field>
          <div>
            <Badge>{t(`ui.${labels[stages[selected]]}`)}</Badge>
            <Notice>{t("ui.scanNote")}</Notice>
            <Button
              primary
              disabled={stages[selected] === 2}
              onClick={() =>
                setStages(
                  stages.map((value, index) =>
                    index === selected ? Math.min(2, value + 1) : value,
                  ),
                )
              }
            >
              {t(stages[selected] === 2 ? "ui.terminal" : "ui.advance")}
            </Button>
          </div>
        </div>
      </Panel>
    </div>
  );
}
function Pharmacy() {
  const { t, number } = useHospital();
  const [stock, setStock] = useState([12, 8, 5]);
  const [selected, setSelected] = useState(0);
  const [quantity, setQuantity] = useState("1");
  const [message, setMessage] = useState(false);
  const [error, setError] = useState(false);
  const valid =
    Number.isSafeInteger(Number(quantity)) &&
    Number(quantity) > 0 &&
    Number(quantity) <= stock[selected] &&
    selected !== 2;
  return (
    <div className={css.twoCol}>
      <Panel title={t("ui.stock")}>
        <div className={css.tokenList}>
          {stock.map((value, index) => (
            <button
              key={index}
              type="button"
              className={css.selectCard}
              aria-pressed={selected === index}
              onClick={() => {
                setSelected(index);
                setQuantity("1");
                setMessage(false);
                setError(false);
              }}
            >
              <Pill size={20} aria-hidden="true" />
              <strong>DEMO-SKU0{index + 1}</strong>
              <span>
                {t("ui.quantity")}: {number(value)}
              </span>
              <Badge tone={index === 2 ? "red" : "green"}>
                {t(index === 2 ? "ui.expired" : "ui.valid")}
              </Badge>
              <div className={css.stockBar} aria-hidden="true">
                {Array.from({ length: Math.min(8, value) }, (_, i) => (
                  <i key={i} />
                ))}
              </div>
            </button>
          ))}
        </div>
      </Panel>
      <Panel title={t("ui.issue")}>
        <p className={css.small}>DEMO-SKU0{selected + 1}</p>
        <p className={css.amountHero}>{number(stock[selected])}</p>
        <Field label={t("ui.quantity")}>
          <input
            type="number"
            min="1"
            max={stock[selected]}
            step="1"
            value={quantity}
            onChange={(event) => {
              setQuantity(event.target.value);
              setMessage(false);
              setError(false);
            }}
          />
        </Field>
        <div className={css.statusLine}>
          <Button
            primary
            disabled={selected === 2 || stock[selected] === 0}
            onClick={() => {
              if (!valid) {
                setError(true);
                return;
              }
              setStock(
                stock.map((value, index) =>
                  index === selected ? value - Number(quantity) : value,
                ),
              );
              setQuantity("1");
              setError(false);
              setMessage(true);
            }}
          >
            {t("ui.issue")}
          </Button>
        </div>
        {error && <Notice error>{t("ui.invalidQuantity")}</Notice>}
        {message && <Badge tone="green">{t("ui.reviewOnly")}</Badge>}
        <Notice>{t("ui.noDispense")}</Notice>
      </Panel>
    </div>
  );
}
function Theatre() {
  const { t, number } = useHospital();
  const [room, setRoom] = useState("DEMO-OT01");
  const [checks, setChecks] = useState<Record<string, boolean>>({});
  const [reviewed, setReviewed] = useState(false);
  const keys = ["room", "equipment", "team"];
  const completed = keys.filter((key) => checks[`${room}-${key}`]).length;
  return (
    <div className={css.equalCols}>
      <Panel title={t("ui.schedule")}>
        <div className={css.stack}>
          {["DEMO-OT01", "DEMO-OT02"].map((id, index) => (
            <button
              type="button"
              className={css.selectCard}
              key={id}
              aria-pressed={room === id}
              onClick={() => {
                setRoom(id);
                setReviewed(false);
              }}
            >
              <strong>{id}</strong>
              <span className={css.small}>
                {index ? "14:00–15:00" : "10:00–11:00"} · {t("ui.illustrative")}
              </span>
              <Badge tone="neutral">{t("ui.pending")}</Badge>
            </button>
          ))}
        </div>
      </Panel>
      <Panel title={t("ui.readiness")}>
        <p className={css.small}>{room}</p>
        {keys.map((key) => (
          <label className={css.check} key={key}>
            <input
              type="checkbox"
              checked={checks[`${room}-${key}`] ?? false}
              onChange={(event) => {
                setChecks({
                  ...checks,
                  [`${room}-${key}`]: event.target.checked,
                });
                setReviewed(false);
              }}
            />
            {t(`ui.${key}`)}
          </label>
        ))}
        <div className={css.progress} aria-hidden="true">
          <span style={{ width: `${(completed / 3) * 100}%` }} />
        </div>
        <p className={css.localNote}>
          {t("ui.completion")}: {number(completed)} / {number(3)}
        </p>
        <Button
          primary
          disabled={completed !== 3}
          onClick={() => setReviewed(true)}
        >
          {t("ui.review")}
        </Button>
        {reviewed && <Notice>{t("ui.reviewOnly")}</Notice>}
        <Notice>{t("ui.notChecklist")}</Notice>
      </Panel>
    </div>
  );
}
function Emergency() {
  const { t } = useHospital();
  const stages = ["intake", "assessment", "transfer"];
  const [tokens, setTokens] = useState([0, 1, 0]);
  return (
    <>
      <Notice>{t("ui.emergencyNote")}</Notice>
      <div className={css.queueBoard}>
        {stages.map((key, stage) => (
          <section key={key}>
            <h3>{t(`ui.${key}`)}</h3>
            {tokens.map((value, index) =>
              value === stage ? (
                <div className={css.tokenRow} key={index}>
                  <strong>DEMO-E0{index + 1}</strong>
                  <Badge tone="neutral">{t("ui.illustrative")}</Badge>
                  <Button
                    disabled={stage === 2}
                    onClick={() =>
                      setTokens(
                        tokens.map((item, i) =>
                          i === index ? Math.min(2, item + 1) : item,
                        ),
                      )
                    }
                  >
                    {t(stage === 2 ? "ui.terminal" : "ui.advance")}
                  </Button>
                </div>
              ) : null,
            )}
          </section>
        ))}
      </div>
    </>
  );
}
function Blood() {
  const { t, number } = useHospital();
  const [selected, setSelected] = useState(0);
  const [checks, setChecks] = useState<Record<string, boolean>>({});
  const [reviewed, setReviewed] = useState(false);
  const keys = ["verifiedIdentity", "documentation", "reviewer"];
  const statuses = ["quarantined", "available", "reserved"];
  const done = keys.filter((key) => checks[`${selected}-${key}`]).length;
  return (
    <div className={css.twoCol}>
      <Panel title={t("ui.unit")}>
        <DataTable
          title={t("ui.stock")}
          headers={[t("ui.unit"), t("ui.status"), t("ui.details")]}
        >
          {statuses.map((key, index) => (
            <tr key={key} data-selected={selected === index}>
              <td>DEMO-U0{index + 1}</td>
              <td>
                <Badge tone={index === 0 ? "amber" : "neutral"}>
                  {t(`ui.${key}`)}
                </Badge>
              </td>
              <td>
                <Button
                  onClick={() => {
                    setSelected(index);
                    setReviewed(false);
                  }}
                  aria-pressed={selected === index}
                >
                  {t("ui.open")}
                </Button>
              </td>
            </tr>
          ))}
        </DataTable>
      </Panel>
      <Panel title={t("ui.trace")}>
        <strong>DEMO-U0{selected + 1}</strong>
        {keys.map((key) => (
          <label className={css.check} key={key}>
            <input
              type="checkbox"
              checked={checks[`${selected}-${key}`] ?? false}
              onChange={(event) => {
                setChecks({
                  ...checks,
                  [`${selected}-${key}`]: event.target.checked,
                });
                setReviewed(false);
              }}
            />
            {t(`ui.${key}`)}
          </label>
        ))}
        <p className={css.localNote}>
          {number(done)} / {number(3)}
        </p>
        <Button
          disabled={done !== 3 || selected === 0}
          primary
          onClick={() => setReviewed(true)}
        >
          {t("ui.review")}
        </Button>
        {reviewed && <Notice>{t("ui.reviewOnly")}</Notice>}
        <Notice>{t("ui.bloodNote")}</Notice>
      </Panel>
    </div>
  );
}
export default function ClinicalWorkspace({
  kind,
}: {
  kind:
    "laboratory" | "imaging" | "pharmacy" | "theatre" | "emergency" | "blood";
}) {
  const [epoch, setEpoch] = useState(0);
  return (
    <Workspace kind={kind} reset={() => setEpoch(epoch + 1)}>
      {kind === "laboratory" ? (
        <Laboratory key={epoch} />
      ) : kind === "imaging" ? (
        <Imaging key={epoch} />
      ) : kind === "pharmacy" ? (
        <Pharmacy key={epoch} />
      ) : kind === "theatre" ? (
        <Theatre key={epoch} />
      ) : kind === "emergency" ? (
        <Emergency key={epoch} />
      ) : (
        <Blood key={epoch} />
      )}
    </Workspace>
  );
}
