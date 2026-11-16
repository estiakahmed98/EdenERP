"use client";
import { useState } from "react";
import { BedDouble, Fingerprint } from "lucide-react";
import { occupancy } from "../calculations";
import {
  Badge,
  Button,
  css,
  Field,
  Metric,
  Notice,
  Panel,
  useHospital,
  Workspace,
} from "../ui";

function Wards() {
  const { t, number } = useHospital();
  const [loaded, setLoaded] = useState(false);
  const [beds, setBeds] = useState([
    "available",
    "occupied",
    "available",
    "blocked",
    "occupied",
    "available",
    "available",
    "occupied",
  ]);
  const [selected, setSelected] = useState(0);
  return (
    <>
      <dl className={css.metricsThree}>
        <Metric
          label={t("ui.license")}
          value={number(0)}
          detail={t("ui.source")}
        />
      </dl>
      {!loaded ? (
        <div className={css.largeEmpty}>
          <BedDouble aria-hidden="true" />
          <p>{t("ui.zeroBeds")}</p>
          <Button primary onClick={() => setLoaded(true)}>
            {t("ui.loadWard")}
          </Button>
        </div>
      ) : (
        <div className={css.twoCol}>
          <Panel title={t("ui.ward")}>
            <div className={css.bedGrid}>
              {beds.map((status, index) => (
                <button
                  type="button"
                  key={index}
                  className={css.bedTile}
                  data-status={status}
                  aria-pressed={selected === index}
                  onClick={() => setSelected(index)}
                >
                  <BedDouble size={26} aria-hidden="true" />
                  <strong>DEMO-W0{index + 1}</strong>
                  <small>{t(`ui.${status}`)}</small>
                </button>
              ))}
            </div>
          </Panel>
          <Panel title={`DEMO-W0${selected + 1}`}>
            <Badge
              tone={
                beds[selected] === "blocked"
                  ? "amber"
                  : beds[selected] === "occupied"
                    ? "neutral"
                    : "green"
              }
            >
              {t(`ui.${beds[selected]}`)}
            </Badge>
            <Notice>{t("ui.noAdmission")}</Notice>
            <Button
              disabled={beds[selected] === "occupied"}
              onClick={() =>
                setBeds(
                  beds.map((value, index) =>
                    index === selected
                      ? value === "blocked"
                        ? "available"
                        : "blocked"
                      : value,
                  ),
                )
              }
            >
              {t("ui.blockBed")}
            </Button>
          </Panel>
        </div>
      )}
    </>
  );
}
function Admissions() {
  const { t } = useHospital();
  const [identifier, setIdentifier] = useState("");
  const [bed, setBed] = useState("DEMO-W01");
  const [checked, setChecked] = useState(false);
  const [review, setReview] = useState(false);
  return (
    <div className={css.equalCols}>
      <Panel title={t("ui.admission")}>
        <form
          className={css.stack}
          onSubmit={(event) => {
            event.preventDefault();
            setReview(true);
          }}
        >
          <Field label={t("ui.identifier")}>
            <input
              required
              pattern={"DEMO-[A-Za-z0-9\\-]+"}
              maxLength={32}
              value={identifier}
              onChange={(event) => {
                setIdentifier(event.target.value);
                setReview(false);
              }}
              placeholder="DEMO-P01"
            />
          </Field>
          <Field label={t("ui.requestBed")}>
            <select
              value={bed}
              onChange={(event) => {
                setBed(event.target.value);
                setReview(false);
              }}
            >
              <option>DEMO-W01</option>
              <option>DEMO-W03</option>
              <option disabled>DEMO-W02 — {t("ui.occupied")}</option>
            </select>
          </Field>
          <label className={css.check}>
            <input
              type="checkbox"
              required
              checked={checked}
              onChange={(event) => {
                setChecked(event.target.checked);
                setReview(false);
              }}
            />
            {t("ui.consentNote")}
          </label>
          <Button type="submit" primary>
            {t("ui.admit")}
          </Button>
        </form>
      </Panel>
      <Panel title={t("ui.handover")}>
        <ol className={css.timeline}>
          <li>
            <strong>
              <Fingerprint size={14} aria-hidden="true" /> {t("ui.identity")}
            </strong>
            <span>{identifier || "—"}</span>
          </li>
          <li>
            <strong>{t("ui.requestBed")}</strong>
            <span>{bed}</span>
          </li>
          <li>
            <strong>{t("ui.review")}</strong>
            <Badge tone={review ? "green" : "neutral"}>
              {t(review ? "ui.reviewOnly" : "ui.pending")}
            </Badge>
          </li>
        </ol>
        <Notice>{t("ui.noAdmission")}</Notice>
      </Panel>
    </div>
  );
}
function Census() {
  const { t, number } = useHospital();
  const [capacity, setCapacity] = useState("0");
  const [occupied, setOccupied] = useState("0");
  const result =
    capacity && occupied ? occupancy(Number(capacity), Number(occupied)) : null;
  const invalid =
    !!capacity &&
    !!occupied &&
    (Number(occupied) > Number(capacity) ||
      ![Number(capacity), Number(occupied)].every(
        (value) => Number.isSafeInteger(value) && value >= 0,
      ));
  return (
    <div className={css.stack}>
      <Notice>{t("ui.noCensus")}</Notice>
      <div className={css.equalCols}>
        <Panel title={t("ui.enterCapacity")}>
          <div className={css.stack}>
            <Field label={t("ui.capacity")}>
              <input
                type="number"
                min="0"
                max="10000"
                step="1"
                value={capacity}
                onChange={(event) => setCapacity(event.target.value)}
              />
            </Field>
            <Field label={t("ui.occupiedBeds")}>
              <input
                type="number"
                min="0"
                max="10000"
                step="1"
                value={occupied}
                onChange={(event) => setOccupied(event.target.value)}
              />
            </Field>
            {invalid && <Notice error>{t("ui.outOfBounds")}</Notice>}
            <p className={css.small}>
              {t("ui.formula")}: {t("ui.occupiedBeds")} ÷ {t("ui.capacity")} ×
              {number(100)}
            </p>
          </div>
        </Panel>
        <div className={css.capacityFigure}>
          <svg viewBox="0 0 180 180" role="img" aria-label={t("ui.occupancy")}>
            <circle
              cx="90"
              cy="90"
              r="72"
              fill="none"
              stroke="var(--border)"
              strokeWidth="9"
            />
            <circle
              cx="90"
              cy="90"
              r="72"
              fill="none"
              stroke="var(--primary)"
              strokeWidth="9"
              pathLength="100"
              strokeDasharray={`${result ?? 0} 100`}
              transform="rotate(-90 90 90)"
              strokeLinecap="round"
            />
            <text
              x="90"
              y="98"
              textAnchor="middle"
              fontSize="28"
              fill="var(--blue)"
            >
              {result === null ? "—" : `${number(result)}%`}
            </text>
          </svg>
          <span className={css.small}>
            {t(result === null ? "ui.notAvailable" : "ui.occupancy")}
          </span>
        </div>
      </div>
    </div>
  );
}
export default function OperationsWorkspace({
  kind,
}: {
  kind: "wards" | "admissions" | "census";
}) {
  const [epoch, setEpoch] = useState(0);
  return (
    <Workspace kind={kind} reset={() => setEpoch(epoch + 1)}>
      {kind === "wards" ? (
        <Wards key={epoch} />
      ) : kind === "admissions" ? (
        <Admissions key={epoch} />
      ) : (
        <Census key={epoch} />
      )}
    </Workspace>
  );
}
