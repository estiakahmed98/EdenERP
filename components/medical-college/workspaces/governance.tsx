"use client";
import { useState } from "react";
import {
  BookOpen,
  Building2,
  HeartPulse,
  Scale,
  ShieldCheck,
} from "lucide-react";
import { planningAmount } from "../calculations";
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
const areas = ["academic", "clinical", "finance", "administration"] as const;
const icons = [BookOpen, HeartPulse, Scale, Building2];
function Governance() {
  const { t, money } = useCollege();
  const [area, setArea] = useState<(typeof areas)[number]>("academic"),
    [checklists, setChecklists] = useState<Record<string, boolean[]>>({}),
    [budget, setBudget] = useState(""),
    [proposed, setProposed] = useState(""),
    [reviewed, setReviewed] = useState(false);
  const checks = checklists[area] ?? [false, false, false];
  const balance =
    budget.trim() &&
    proposed.trim() &&
    planningAmount(Number(budget), 1) !== null &&
    planningAmount(Number(proposed), 1) !== null &&
    Number(proposed) <= Number(budget)
      ? Math.round((Number(budget) - Number(proposed)) * 100) / 100
      : null;
  return (
    <div className={css.governanceLayout}>
      <section className={css.organisationSheet}>
        <h3>{t("ui.organisation")}</h3>
        <div className={css.organisationMap}>
          <svg viewBox="0 0 600 400" fill="none" aria-hidden="true">
            <path
              d="M300 200 130 75m170 125L470 75M300 200 130 325m170-125 170 125"
              stroke="currentColor"
              strokeDasharray="4 7"
            />
            <circle cx="300" cy="200" r="48" stroke="currentColor" />
            <circle
              cx="300"
              cy="200"
              r="32"
              stroke="currentColor"
              opacity=".2"
            />
          </svg>
          <div className={css.governanceHub}>
            <ShieldCheck size={27} strokeWidth={1.3} aria-hidden="true" />
          </div>
          {areas.map((key, i) => {
            const Icon = icons[i];
            return (
              <button
                key={key}
                type="button"
                data-node={i}
                aria-pressed={area === key}
                onClick={() => {
                  setArea(key);
                  setReviewed(false);
                }}
              >
                <Icon size={25} strokeWidth={1.3} aria-hidden="true" />
                <strong>{t(`ui.${key}`)}</strong>
              </button>
            );
          })}
        </div>
        <p className={css.caption}>{t("ui.governanceNote")}</p>
      </section>
      <Panel title={t(`ui.${area}`)}>
        <div className={css.stack}>
          <p className={css.roleDescription}>{t(`ui.${area}Role`)}</p>
          {["documents", "reviewer", "policy"].map((key, i) => (
            <CheckField
              key={key}
              label={t(`ui.${key}`)}
              checked={checks[i]}
              onChange={(v) => {
                setChecklists({
                  ...checklists,
                  [area]: checks.map((x, j) => (j === i ? v : x)),
                });
                setReviewed(false);
              }}
            />
          ))}
          <Button
            primary
            disabled={!checks.every(Boolean)}
            onClick={() => setReviewed(true)}
          >
            {t("ui.reviewSummary")}
          </Button>
          {reviewed && (
            <Notice>
              {t("ui.governanceReady")} {t("ui.noApproval")}
            </Notice>
          )}
        </div>
      </Panel>
      <section className={css.financialOversight}>
        <div>
          <span className={css.eyebrow}>BDT</span>
          <h3>{t("ui.oversight")}</h3>
          <p>{t("ui.notPayroll")}</p>
        </div>
        <div className={css.formGrid}>
          <Field label={t("ui.budget")}>
            <input
              type="number"
              min="0"
              step="0.01"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />
          </Field>
          <Field label={t("ui.proposed")}>
            <input
              type="number"
              min="0"
              step="0.01"
              value={proposed}
              onChange={(e) => setProposed(e.target.value)}
            />
          </Field>
        </div>
        <div className={css.balanceOutput}>
          <span>{t("ui.remaining")}</span>
          <output>{balance === null ? "—" : money(balance)}</output>
          <Badge tone={balance === null ? "neutral" : "green"}>
            {t(`ui.${balance === null ? "notConfigured" : "planning"}`)}
          </Badge>
        </div>
        {budget && proposed && balance === null && (
          <Notice error>{t("ui.budgetError")}</Notice>
        )}
      </section>
    </div>
  );
}
export default function GovernanceWorkspace() {
  const [epoch, setEpoch] = useState(0);
  return (
    <Workspace reset={() => setEpoch((n) => n + 1)}>
      <Governance key={epoch} />
    </Workspace>
  );
}
