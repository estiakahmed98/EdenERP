"use client";
import { useState } from "react";
import { ArrowRight, LockKeyhole } from "lucide-react";
import { marksSummary, thresholdCheck } from "../calculations";
import {
  Badge,
  Button,
  CheckField,
  css,
  Field,
  Notice,
  Panel,
  Tabs,
  useCollege,
  Workspace,
} from "../ui";
function Examination() {
  const { t, number } = useCollege();
  const [view, setView] = useState("preparation"),
    [attendance, setAttendance] = useState(""),
    [minAttendance, setMinAttendance] = useState(""),
    [assessment, setAssessment] = useState(""),
    [minAssessment, setMinAssessment] = useState(""),
    [docs, setDocs] = useState(false),
    [reviewed, setReviewed] = useState(false),
    [score, setScore] = useState(""),
    [maximum, setMaximum] = useState("100"),
    [resultReviewed, setResultReviewed] = useState(false);
  const attendanceCheck = thresholdCheck(attendance, minAttendance),
    assessmentCheck = thresholdCheck(assessment, minAssessment),
    ready = attendanceCheck === true && assessmentCheck === true && docs,
    result = marksSummary([{ score, maximum }]);
  const change = (setter: (v: string) => void, value: string) => {
    setter(value);
    setReviewed(false);
  };
  return (
    <div className={css.stack}>
      <Tabs
        values={["preparation", "results"]}
        value={view}
        onChange={setView}
      />
      {view === "preparation" ? (
        <div className={css.examLayout}>
          <div>
            <Panel title={t("ui.criteria")}>
              <p className={css.caption}>{t("ui.criteriaHint")}</p>
              <div className={css.criteriaRow}>
                <span className={css.criteriaIndex}>01</span>
                <div className={css.formGrid}>
                  <Field label={t("ui.actualAttendance")}>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={attendance}
                      onChange={(e) => change(setAttendance, e.target.value)}
                    />
                  </Field>
                  <Field label={t("ui.minimumAttendance")}>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={minAttendance}
                      onChange={(e) => change(setMinAttendance, e.target.value)}
                    />
                  </Field>
                </div>
                <Badge
                  tone={
                    attendanceCheck === null
                      ? "neutral"
                      : attendanceCheck
                        ? "green"
                        : "amber"
                  }
                >
                  {t(
                    `ui.${attendanceCheck === null ? "notConfigured" : attendanceCheck ? "meets" : "below"}`,
                  )}
                </Badge>
              </div>
              <div className={css.criteriaRow}>
                <span className={css.criteriaIndex}>02</span>
                <div className={css.formGrid}>
                  <Field label={t("ui.actualAssessment")}>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={assessment}
                      onChange={(e) => change(setAssessment, e.target.value)}
                    />
                  </Field>
                  <Field label={t("ui.minimumAssessment")}>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={minAssessment}
                      onChange={(e) => change(setMinAssessment, e.target.value)}
                    />
                  </Field>
                </div>
                <Badge
                  tone={
                    assessmentCheck === null
                      ? "neutral"
                      : assessmentCheck
                        ? "green"
                        : "amber"
                  }
                >
                  {t(
                    `ui.${assessmentCheck === null ? "notConfigured" : assessmentCheck ? "meets" : "below"}`,
                  )}
                </Badge>
              </div>
              <CheckField
                label={t("ui.documents")}
                checked={docs}
                onChange={(v) => {
                  setDocs(v);
                  setReviewed(false);
                }}
              />
            </Panel>
          </div>
          <div className={css.examDecision}>
            <LockKeyhole size={28} strokeWidth={1.3} aria-hidden="true" />
            <span>{t("ui.eligibility")}</span>
            <h3>{t(`ui.${ready ? "ready" : "pending"}`)}</h3>
            <div className={css.gateLights} aria-hidden="true">
              {[attendanceCheck === true, assessmentCheck === true, docs].map(
                (v, i) => (
                  <i key={i} data-on={v} />
                ),
              )}
            </div>
            <Button primary disabled={!ready} onClick={() => setReviewed(true)}>
              {t("ui.review")}
            </Button>
            <p>{t("ui.notEligibility")}</p>
            {reviewed && <Notice>{t("ui.notSaved")}</Notice>}
          </div>
        </div>
      ) : (
        <Panel title={t("ui.results")}>
          <div className={css.resultStudy}>
            <div className={css.stack}>
              <div className={css.formGrid}>
                <Field label={t("ui.resultScore")}>
                  <input
                    type="number"
                    min="0"
                    value={score}
                    onChange={(e) => {
                      setScore(e.target.value);
                      setResultReviewed(false);
                    }}
                  />
                </Field>
                <Field label={t("ui.resultMaximum")}>
                  <input
                    type="number"
                    min="1"
                    value={maximum}
                    onChange={(e) => {
                      setMaximum(e.target.value);
                      setResultReviewed(false);
                    }}
                  />
                </Field>
              </div>
              <Button
                primary
                disabled={!result}
                onClick={() => setResultReviewed(true)}
              >
                {t("ui.resultReview")}
              </Button>
              {score && !result && <Notice error>{t("ui.marksError")}</Notice>}
            </div>
            <div className={css.resultPrint}>
              <span>{t("ui.percentage")}</span>
              <output>{result ? number(result.percentage) + "%" : "—"}</output>
              <p>{t("ui.resultNote")}</p>
            </div>
          </div>
          {resultReviewed && <Notice>{t("ui.notSaved")}</Notice>}
        </Panel>
      )}
      <div className={css.phaseLine}>
        {["currentPhase", "examReview", "nextPhase"].map((key, i) => (
          <div key={key}>
            <span>{number(i + 1)}</span>
            <strong>{t(`ui.${key}`)}</strong>
            {i < 2 && <ArrowRight size={19} aria-hidden="true" />}
          </div>
        ))}
      </div>
    </div>
  );
}
export default function Exams() {
  const [epoch, setEpoch] = useState(0);
  return (
    <Workspace reset={() => setEpoch((n) => n + 1)}>
      <Examination key={epoch} />
    </Workspace>
  );
}
