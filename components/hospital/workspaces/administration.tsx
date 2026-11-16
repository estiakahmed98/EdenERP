"use client";
import { useState } from "react";
import {
  Building2,
  Download,
  FlaskConical,
  Stethoscope,
  UsersRound,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { expiryState } from "../calculations";
import { hospitalHref } from "../registry";
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

function Doctors() {
  const { t, number } = useHospital();
  const [department, setDepartment] = useState("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const [view, setView] = useState("doctors");
  const departments = ["medicine", "cardiology", "radiology"];
  const rows = departments
    .map((key, index) => ({ key, index, id: `DEMO-DR0${index + 1}` }))
    .filter(
      (row) =>
        (department === "all" || department === row.key) &&
        row.id.toLowerCase().includes(query.toLowerCase()),
    );
  return (
    <>
      <Tabs values={["doctors", "schedule"]} value={view} onChange={setView} />
      <div className={css.toolbar}>
        <Field label={t("ui.department")}>
          <select
            value={department}
            onChange={(event) => {
              setDepartment(event.target.value);
              if (event.target.value !== "all")
                setSelected(departments.indexOf(event.target.value));
            }}
          >
            <option value="all">{t("ui.all")}</option>
            {departments.map((key) => (
              <option key={key} value={key}>
                {t(`ui.${key}`)}
              </option>
            ))}
          </select>
        </Field>
        <Field label={t("ui.search")}>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="DEMO-DR01"
          />
        </Field>
      </div>
      <div className={css.equalCols}>
        <div className={css.stack}>
          {rows.map((row) => (
            <button
              type="button"
              key={row.id}
              className={css.selectCard}
              aria-pressed={selected === row.index}
              onClick={() => setSelected(row.index)}
            >
              <Stethoscope size={22} aria-hidden="true" />
              <strong>{row.id}</strong>
              <span>{t(`ui.${row.key}`)}</span>
              <Badge>
                {t(row.index === 2 ? "ui.visiting" : "ui.employed")}
              </Badge>
            </button>
          ))}
          {!rows.length && <Empty />}
        </div>
        <Panel title={t(view === "schedule" ? "ui.schedule" : "ui.details")}>
          <strong>DEMO-DR0{selected + 1}</strong>
          <p className={css.localNote}>{t(`ui.${departments[selected]}`)}</p>
          <ol className={css.timeline}>
            {["17:00–18:00", "18:00–19:00"].map((time, index) => (
              <li key={time}>
                <strong>{time}</strong>
                <span className={css.small}>
                  {t("ui.capacity")}: {number(10)} · DEMO-S0
                  {selected * 2 + index + 1}
                </span>
              </li>
            ))}
          </ol>
          <div className={css.statusLine}>
            <Link href={hospitalHref("opd-serials")} className={css.button}>
              {t("pages.opd-serials.title")}
            </Link>
          </div>
        </Panel>
      </div>
    </>
  );
}
function Services() {
  const { t, money } = useHospital();
  const [list, setList] = useState("self");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState([true, false, false]);
  const keys = ["consultation", "sampleHandling", "reportCopy"];
  const prices: Record<string, number[]> = {
    self: [800, 100, 50],
    staff: [600, 80, 40],
    corporate: [700, 90, 45],
  };
  const rows = keys
    .map((key, index) => ({ key, index }))
    .filter(
      (row) =>
        t(`ui.${row.key}`).toLowerCase().includes(query.toLowerCase()) ||
        `DEMO-SVC0${row.index + 1}`.toLowerCase().includes(query.toLowerCase()),
    );
  const total = prices[list].reduce(
    (sum, price, index) => sum + (selected[index] ? price : 0),
    0,
  );
  return (
    <>
      <div className={css.toolbar}>
        <Field label={t("ui.priceList")}>
          <select
            value={list}
            onChange={(event) => setList(event.target.value)}
          >
            {Object.keys(prices).map((key) => (
              <option key={key} value={key}>
                {t(`ui.${key}`)}
              </option>
            ))}
          </select>
        </Field>
        <Field label={t("ui.search")}>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </Field>
      </div>
      <DataTable
        title={t("ui.services")}
        headers={[t("ui.selected"), t("ui.service"), t("ui.price")]}
      >
        {rows.map((row) => (
          <tr key={row.key}>
            <td>
              <input
                type="checkbox"
                aria-label={t(`ui.${row.key}`)}
                checked={selected[row.index]}
                onChange={(event) =>
                  setSelected(
                    selected.map((value, index) =>
                      index === row.index ? event.target.checked : value,
                    ),
                  )
                }
              />
            </td>
            <td>
              <strong>{t(`ui.${row.key}`)}</strong>
              <p className={css.small}>DEMO-SVC0{row.index + 1}</p>
            </td>
            <td>{money(prices[list][row.index])}</td>
          </tr>
        ))}
      </DataTable>
      {!rows.length && <Empty />}
      <div className={css.statusLine}>
        <Badge>{t("ui.estimate")}</Badge>
        <output className={css.amountHero}>{money(total)}</output>
      </div>
      <Notice>{t("ui.noPricePromise")}</Notice>
    </>
  );
}
function Departments() {
  const { t } = useHospital();
  const [selected, setSelected] = useState(0);
  const types = ["clinicalType", "diagnostic", "administrative"];
  const icons = [Stethoscope, FlaskConical, UsersRound];
  const departments = [
    ["medicine", "cardiology"],
    ["laboratory", "radiology"],
    ["accounts", "reception"],
  ];
  return (
    <div className={css.stack}>
      <div className={css.departmentGrid}>
        {types.map((key, index) => {
          const Icon = icons[index];
          return (
            <button
              type="button"
              className={css.departmentCard}
              key={key}
              aria-pressed={selected === index}
              onClick={() => setSelected(index)}
            >
              <Icon size={29} aria-hidden="true" />
              <strong>{t(`ui.${key}`)}</strong>
              <span>{t("ui.illustrative")}</span>
            </button>
          );
        })}
      </div>
      <Panel title={t(`ui.${types[selected]}`)}>
        <div className={css.equalCols}>
          {departments[selected].map((key) => (
            <div className={css.selectCard} key={key}>
              <Building2 size={21} aria-hidden="true" />
              <strong>{t(`ui.${key}`)}</strong>
              <p className={css.small}>{t("ui.illustrative")}</p>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
function Staff() {
  const { t, locale } = useHospital();
  const [asOf, setAsOf] = useState("2026-11-16");
  const [filter, setFilter] = useState("all");
  const dates = ["2026-09-15", "2026-12-07", "2028-03-28"];
  const rows = dates
    .map((date, index) => ({ date, index, state: expiryState(date, asOf) }))
    .filter((row) => filter === "all" || row.state === filter);
  const dateLabel = (date: string) =>
    new Intl.DateTimeFormat(locale, {
      dateStyle: "medium",
      timeZone: "UTC",
    }).format(new Date(`${date}T00:00:00Z`));
  return (
    <>
      <div className={css.toolbar}>
        <Field label={t("ui.asOf")}>
          <input
            type="date"
            value={asOf}
            onChange={(event) => setAsOf(event.target.value)}
          />
        </Field>
        <Field label={t("ui.status")}>
          <select
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
          >
            {["all", "expired", "expiring", "valid"].map((key) => (
              <option value={key} key={key}>
                {t(`ui.${key}`)}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <DataTable
        title={t("ui.registration")}
        headers={[t("ui.registration"), t("ui.validUntil"), t("ui.status")]}
      >
        {rows.map((row) => (
          <tr key={row.date}>
            <td>DEMO-REG-0{row.index + 1}</td>
            <td>{dateLabel(row.date)}</td>
            <td>
              <Badge
                tone={
                  row.state === "expired"
                    ? "red"
                    : row.state === "expiring"
                      ? "amber"
                      : row.state === "valid"
                        ? "green"
                        : "neutral"
                }
              >
                {row.state ? t(`ui.${row.state}`) : "—"}
              </Badge>
            </td>
          </tr>
        ))}
      </DataTable>
      {!rows.length && <Empty />}
      <Notice>{t("ui.credentialNote")}</Notice>
    </>
  );
}
function Access() {
  const { t, locale } = useHospital();
  const [action, setAction] = useState("all");
  const [role, setRole] = useState("all");
  const [from, setFrom] = useState("");
  const events = [
    {
      id: "DEMO-P01",
      role: "reception",
      action: "searched",
      time: "2026-11-16T03:30:00Z",
    },
    {
      id: "DEMO-P02",
      role: "clinician",
      action: "viewed",
      time: "2026-11-16T03:20:00Z",
    },
    {
      id: "DEMO-P03",
      role: "accounts",
      action: "viewed",
      time: "2026-11-15T09:00:00Z",
    },
  ];
  const filtered = events.filter(
    (event) =>
      (action === "all" || event.action === action) &&
      (role === "all" || event.role === role) &&
      (!from || event.time.slice(0, 10) >= from),
  );
  const download = () => {
    const csv = [
      "demo_identifier,actor_role,action,time_utc",
      ...filtered.map((event) =>
        [event.id, event.role, event.action, event.time].join(","),
      ),
    ].join("\r\n");
    const url = URL.createObjectURL(
      new Blob([csv], { type: "text/csv;charset=utf-8" }),
    );
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "adon-hospital-demo-access.csv";
    anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  return (
    <>
      <div className={css.toolbar}>
        <Field label={t("ui.filterAction")}>
          <select
            value={action}
            onChange={(event) => setAction(event.target.value)}
          >
            {["all", "viewed", "searched"].map((key) => (
              <option value={key} key={key}>
                {t(`ui.${key}`)}
              </option>
            ))}
          </select>
        </Field>
        <Field label={t("ui.who")}>
          <select
            value={role}
            onChange={(event) => setRole(event.target.value)}
          >
            {["all", "reception", "clinician", "accounts"].map((key) => (
              <option value={key} key={key}>
                {t(`ui.${key}`)}
              </option>
            ))}
          </select>
        </Field>
        <Field label={t("ui.when")}>
          <input
            type="date"
            value={from}
            onChange={(event) => setFrom(event.target.value)}
          />
        </Field>
        <Button onClick={download}>
          <Download size={14} aria-hidden="true" />
          {t("ui.exported")}
        </Button>
      </div>
      <ol className={css.traceList}>
        {filtered.map((event) => (
          <li key={event.id}>
            <time dateTime={event.time}>
              {new Intl.DateTimeFormat(locale, {
                hour: "2-digit",
                minute: "2-digit",
                timeZone: "Asia/Dhaka",
              }).format(new Date(event.time))}
            </time>
            <div>
              <strong>{t(`ui.${event.role}`)}</strong>
              <Badge tone="neutral">{t(`ui.${event.action}`)}</Badge>
              <p>{event.id}</p>
            </div>
          </li>
        ))}
      </ol>
      {!filtered.length && <Empty />}
      <Notice>{t("ui.logNote")}</Notice>
    </>
  );
}
function Settings() {
  const { t } = useHospital();
  const [tab, setTab] = useState("facility");
  const [code, setCode] = useState("DEMO-CENTRE");
  const [language, setLanguage] = useState("both");
  const [role, setRole] = useState("reception");
  const [modules, setModules] = useState([
    "outpatients",
    "laboratory",
    "imaging",
  ]);
  const [review, setReview] = useState(false);
  return (
    <div className={css.settingsGroups}>
      <div
        className={css.settingsNav}
        role="group"
        aria-label={t("pages.hospital-settings.title")}
      >
        {["facility", "languages", "permissions"].map((key) => (
          <Button
            key={key}
            aria-pressed={tab === key}
            onClick={() => setTab(key)}
          >
            {t(`ui.${key}`)}
          </Button>
        ))}
      </div>
      <Panel title={t(`ui.${tab}`)}>
        {tab === "facility" ? (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setReview(true);
            }}
          >
            <Field label={t("ui.facilityCode")}>
              <input
                required
                pattern="[A-Z0-9-]+"
                maxLength={32}
                value={code}
                onChange={(event) => {
                  setCode(event.target.value);
                  setReview(false);
                }}
              />
            </Field>
            <div className={css.statusLine}>
              {["outpatients", "laboratory", "imaging"].map((key) => (
                <label key={key} className={css.check}>
                  <input
                    type="checkbox"
                    checked={modules.includes(key)}
                    onChange={() => {
                      setModules(
                        modules.includes(key)
                          ? modules.filter((value) => value !== key)
                          : [...modules, key],
                      );
                      setReview(false);
                    }}
                  />
                  {t(key === "imaging" ? "pages.imaging.title" : `ui.${key}`)}
                </label>
              ))}
            </div>
            <Button primary type="submit">
              {t("ui.settingsPreview")}
            </Button>
          </form>
        ) : tab === "languages" ? (
          <Field label={t("ui.languages")}>
            <select
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
            >
              {["english", "bengali", "both"].map((key) => (
                <option key={key} value={key}>
                  {t(`ui.${key}`)}
                </option>
              ))}
            </select>
          </Field>
        ) : (
          <div>
            <Field label={t("ui.who")}>
              <select
                value={role}
                onChange={(event) => setRole(event.target.value)}
              >
                {["reception", "clinician", "accounts"].map((key) => (
                  <option key={key} value={key}>
                    {t(`ui.${key}`)}
                  </option>
                ))}
              </select>
            </Field>
            <Notice>{t("ui.roleNote")}</Notice>
            <Badge>{t(`ui.${role}`)}</Badge>
          </div>
        )}
        {review && <Notice>{t("ui.notSettingsSave")}</Notice>}
        <hr className={css.divider} />
        <div className={css.settingsSummary}>
          <div>
            <span>{t("ui.facility")}</span>
            <strong>{code || "—"}</strong>
          </div>
          <div>
            <span>{t("ui.languages")}</span>
            <span>{t(`ui.${language}`)}</span>
          </div>
          <div>
            <span>{t("ui.services")}</span>
            <span>{modules.length}</span>
          </div>
        </div>
      </Panel>
    </div>
  );
}
export default function AdministrationWorkspace({
  kind,
}: {
  kind:
    "doctors" | "services" | "departments" | "staff" | "access" | "settings";
}) {
  const [epoch, setEpoch] = useState(0);
  return (
    <Workspace kind={kind} reset={() => setEpoch(epoch + 1)}>
      {kind === "doctors" ? (
        <Doctors key={epoch} />
      ) : kind === "services" ? (
        <Services key={epoch} />
      ) : kind === "departments" ? (
        <Departments key={epoch} />
      ) : kind === "staff" ? (
        <Staff key={epoch} />
      ) : kind === "access" ? (
        <Access key={epoch} />
      ) : (
        <Settings key={epoch} />
      )}
    </Workspace>
  );
}
