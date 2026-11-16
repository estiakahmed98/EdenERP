"use client";
import { useState } from "react";
import { Check, ClipboardCheck, SlidersHorizontal } from "lucide-react";
import { seatBalance, validDate } from "../calculations";
import {
  Badge,
  Button,
  css,
  Field,
  Notice,
  Panel,
  Tabs,
  useCollege,
  Workspace,
} from "../ui";
function Configuration() {
  const { t, number } = useCollege();
  const [tab, setTab] = useState("academicSetup"),
    [code, setCode] = useState(""),
    [start, setStart] = useState(""),
    [end, setEnd] = useState(""),
    [language, setLanguage] = useState("both"),
    [capacity, setCapacity] = useState("0"),
    [allocated, setAllocated] = useState("0"),
    [refs, setRefs] = useState({ dgme: "", bmdc: "", bcps: "" }),
    [attempted, setAttempted] = useState(false);
  const balance =
      capacity.trim() && allocated.trim()
        ? seatBalance(Number(capacity), Number(allocated))
        : null,
    codeOK = /^[a-z0-9-]{2,20}$/i.test(code.trim()),
    datesOK = validDate(start) && validDate(end) && end >= start,
    valid = codeOK && datesOK && balance !== null;
  return (
    <div className={css.settingsLayout}>
      <Tabs
        values={["academicSetup", "seatSettings", "validation"]}
        value={tab}
        onChange={setTab}
      />
      <div className={css.settingsBody}>
        {tab === "academicSetup" ? (
          <div className={css.stack}>
            <Panel title={t("ui.academicSetup")}>
              <div className={css.formGrid}>
                <Field label={t("ui.institution")}>
                  <input
                    value={code}
                    maxLength={20}
                    onChange={(e) => setCode(e.target.value)}
                    aria-invalid={attempted && !codeOK}
                  />
                </Field>
                <Field label={t("ui.language")}>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                  >
                    {["english", "bengali", "both"].map((k) => (
                      <option key={k} value={k}>
                        {t(`ui.${k}`)}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label={t("ui.academicStart")}>
                  <input
                    type="date"
                    value={start}
                    onChange={(e) => setStart(e.target.value)}
                    aria-invalid={attempted && !datesOK}
                  />
                </Field>
                <Field label={t("ui.academicEnd")}>
                  <input
                    type="date"
                    value={end}
                    min={start || undefined}
                    onChange={(e) => setEnd(e.target.value)}
                    aria-invalid={attempted && !datesOK}
                  />
                </Field>
              </div>
              <p className={css.caption}>{t("ui.institutionHint")}</p>
            </Panel>
            <Panel title={t("ui.references")}>
              <div className={css.threeFields}>
                {(["dgme", "bmdc", "bcps"] as const).map((k) => (
                  <Field key={k} label={t(`ui.${k}`)}>
                    <input
                      maxLength={120}
                      value={refs[k]}
                      onChange={(e) =>
                        setRefs({ ...refs, [k]: e.target.value })
                      }
                    />
                  </Field>
                ))}
              </div>
              <p className={css.caption}>{t("ui.referenceNote")}</p>
            </Panel>
          </div>
        ) : tab === "seatSettings" ? (
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
                  aria-invalid={balance === null}
                />
              </Field>
              <Field label={t("ui.allocated")}>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={allocated}
                  onChange={(e) => setAllocated(e.target.value)}
                  aria-invalid={balance === null}
                />
              </Field>
            </div>
            <div className={css.seatLine}>
              <span>{t("ui.available")}</span>
              <output>{balance === null ? "—" : number(balance)}</output>
            </div>
            {balance === null && <Notice error>{t("ui.seatError")}</Notice>}
            <p className={css.caption}>{t("ui.seatFoot")}</p>
          </Panel>
        ) : (
          <Panel title={t("ui.localAudit")}>
            <div className={css.validationList}>
              {[
                ["institution", codeOK],
                ["duration", datesOK],
                ["seatPlan", balance !== null],
              ].map(([label, ok]) => (
                <div key={String(label)}>
                  <span>{t(`ui.${label}`)}</span>
                  <Badge tone={ok ? "green" : "amber"}>
                    {t(`ui.${ok ? "valid" : "incomplete"}`)}
                  </Badge>
                  {ok && <Check size={16} aria-hidden="true" />}
                </div>
              ))}
            </div>
            <p className={css.caption}>{t("ui.settingsNote")}</p>
          </Panel>
        )}
      </div>
      <section className={css.settingsSummary}>
        <SlidersHorizontal size={26} strokeWidth={1.3} aria-hidden="true" />
        <h3>{t("ui.localAudit")}</h3>
        <dl>
          <div>
            <dt>{t("ui.institution")}</dt>
            <dd>{code || "—"}</dd>
          </div>
          <div>
            <dt>{t("ui.language")}</dt>
            <dd>{t(`ui.${language}`)}</dd>
          </div>
          <div>
            <dt>{t("ui.available")}</dt>
            <dd>{balance === null ? "—" : number(balance)}</dd>
          </div>
        </dl>
        <Button primary onClick={() => setAttempted(true)}>
          <ClipboardCheck size={16} aria-hidden="true" />
          {t("ui.validate")}
        </Button>
        {attempted ? (
          <Notice error={!valid}>
            {t(`ui.${valid ? "notSaved" : "settingsError"}`)}
          </Notice>
        ) : (
          <p>{t("ui.reviewNotRun")}</p>
        )}
        <p className={css.caption}>{t("ui.settingsNote")}</p>
      </section>
    </div>
  );
}
export default function Settings() {
  const [epoch, setEpoch] = useState(0);
  return (
    <Workspace reset={() => setEpoch((n) => n + 1)}>
      <Configuration key={epoch} />
    </Workspace>
  );
}
