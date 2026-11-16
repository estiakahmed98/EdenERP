"use client";
import { useState } from "react";
import { ArrowUpRight, HeartPulse } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { hospitalHref } from "../registry";
import { Badge, css, Panel, Tabs, useHospital, Workspace } from "../ui";

function Dashboard() {
  const { t, number } = useHospital();
  const [group, setGroup] = useState("clinical");
  const [selected, setSelected] = useState("doctors");
  const sets: Record<
    string,
    {
      label: string;
      value: number;
      route:
        | "doctors-sittings"
        | "hospital-departments"
        | "services-prices"
        | "patients"
        | "laboratory"
        | "imaging";
    }[]
  > = {
    clinical: [
      { label: "doctors", value: 12, route: "doctors-sittings" },
      { label: "departments", value: 10, route: "hospital-departments" },
      { label: "services", value: 57, route: "services-prices" },
    ],
    frontdesk: [
      { label: "patientsRegistered", value: 1000, route: "patients" },
    ],
    operations: [
      { label: "collect", value: 4, route: "laboratory" },
      { label: "verify", value: 2, route: "laboratory" },
      { label: "toReport", value: 2, route: "imaging" },
    ],
  };
  const rows = sets[group];
  const row = rows.find((entry) => entry.label === selected) ?? rows[0];
  const max = Math.max(...rows.map((entry) => entry.value));
  return (
    <div className={css.stack}>
      <div className={css.analyticsOverview}>
        <span>
          <HeartPulse size={18} aria-hidden="true" />
          {t("ui.sourceFacility")}
        </span>
        <span>{t("ui.source")}</span>
      </div>
      <div className={css.twoCol}>
        <Panel title={t("ui.focus")}>
          <Tabs
            values={["clinical", "frontdesk", "operations"]}
            value={group}
            onChange={(value) => {
              setGroup(value);
              setSelected(sets[value][0].label);
            }}
          />
          <div className={css.bigChart}>
            <div className={css.chartBars}>
              {rows.map((entry) => (
                <button
                  type="button"
                  key={entry.label}
                  aria-pressed={row.label === entry.label}
                  onClick={() => setSelected(entry.label)}
                >
                  <span>{t(`ui.${entry.label}`)}</span>
                  <i>
                    <span style={{ width: `${(entry.value / max) * 100}%` }} />
                  </i>
                  <strong>{number(entry.value)}</strong>
                </button>
              ))}
            </div>
          </div>
        </Panel>
        <Panel title={t("ui.details")}>
          <HeartPulse size={25} aria-hidden="true" />
          <p className={css.indicatorNumber}>{number(row.value)}</p>
          <p>{t(`ui.${row.label}`)}</p>
          <p className={css.localNote}>{t("ui.snapshotOnly")}</p>
          <Link href={hospitalHref(row.route)} className={css.nextLink}>
            {t("ui.open")}
            <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </Panel>
      </div>
    </div>
  );
}
function Indicators() {
  const { t, number } = useHospital();
  const [category, setCategory] = useState("outpatients");
  const [metric, setMetric] = useState(0);
  const data: Record<
    string,
    {
      label: string;
      value: number;
      denominator: number;
      numerator: number;
      formula: string;
      percent?: boolean;
    }[]
  > = {
    outpatients: [
      {
        label: "seenPerDay",
        value: 8.8,
        numerator: 140,
        denominator: 16,
        formula: "seenFormula",
      },
      {
        label: "noShow",
        value: 7.7,
        numerator: 14,
        denominator: 182,
        formula: "noShowFormula",
        percent: true,
      },
    ],
    laboratory: [
      {
        label: "labTimely",
        value: 92,
        numerator: 505,
        denominator: 549,
        formula: "labFormula",
        percent: true,
      },
    ],
  };
  const row = data[category][metric];
  return (
    <div className={css.stack}>
      <Tabs
        values={["outpatients", "laboratory"]}
        value={category}
        onChange={(value) => {
          setCategory(value);
          setMetric(0);
        }}
      />
      <div className={css.equalCols}>
        <Panel title={t("ui.metric")}>
          <div className={css.stack}>
            {data[category].map((entry, index) => (
              <button
                key={entry.label}
                type="button"
                className={css.selectCard}
                aria-pressed={metric === index}
                onClick={() => setMetric(index)}
              >
                <span>{t(`ui.${entry.label}`)}</span>
                <strong>
                  {number(entry.value)}
                  {entry.percent ? "%" : ""}
                </strong>
              </button>
            ))}
          </div>
        </Panel>
        <Panel title={t("ui.definition")}>
          <Badge>{t("ui.source")}</Badge>
          <p className={css.indicatorNumber}>
            {number(row.value)}
            {row.percent ? "%" : ""}
          </p>
          <p>{t(`ui.${row.label}`)}</p>
          <p className={css.indicatorFormula}>{t(`ui.${row.formula}`)}</p>
          <p className={css.localNote}>
            {number(row.numerator)} ÷ {number(row.denominator)}
            {row.percent ? " × 100" : ""}
          </p>
        </Panel>
      </div>
      <p className={css.localNote}>{t("ui.snapshotOnly")}</p>
    </div>
  );
}
export default function AnalyticsWorkspace({
  kind,
}: {
  kind: "dashboard" | "indicators";
}) {
  const [epoch, setEpoch] = useState(0);
  return (
    <Workspace kind={kind} source reset={() => setEpoch(epoch + 1)}>
      {kind === "dashboard" ? (
        <Dashboard key={epoch} />
      ) : (
        <Indicators key={epoch} />
      )}
    </Workspace>
  );
}
