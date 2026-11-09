"use client";
import { enumLabel, formatDate } from "./labels";
import { useTranslations, useLocale } from "next-intl";

import { useState, type FormEvent } from "react";
import { Check, ClipboardCheck, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getSuppliedCapaRecords, type CapaRecord } from "./data";
import {
  Button,
  Empty,
  Field,
  Metric,
  Provenance,
  SearchField,
  Tag,
  Workspace,
  css,
} from "./ui";

export default function CapaWorkspace() {
  const t = useTranslations("pages.qualityApp");
  const suppliedCapaRecords = getSuppliedCapaRecords(t);
  const locale = useLocale();

  const actionSteps = [
    t("copy.reviewTheFindingAndContainmentContext"),
    t("copy.documentTheProposedActionAndSupportingEvidence"),
    t("copy.reviewEffectivenessBeforeConsideringClosure"),
  ];
  const phases = [
    t("copy.understand"),
    t("copy.plan"),
    t("copy.act"),
    t("copy.verify"),
  ];

  const phaseResponses = [
    t("ui.phaseUnderstand"),
    t("ui.phasePlan"),
    t("ui.phaseAct"),
    t("ui.phaseVerify"),
  ];
  const [localRecords, setLocalRecords] = useState<CapaRecord[]>([]);
  const [query, setQuery] = useState("");
  const [type, setType] = useState("All");
  const [selectedId, setSelectedId] = useState("CAPA-0006");
  const [open, setOpen] = useState(false);
  const [checks, setChecks] = useState<Record<string, boolean[]>>({});
  const [phase, setPhase] = useState<Record<string, number>>({});
  const [notice, setNotice] = useState("");
  const visible = [...localRecords, ...suppliedCapaRecords].filter(
    (record) =>
      (type === "All" || record.type === type) &&
      `${record.id} ${record.problem}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );
  const selected =
    visible.find((record) => record.id === selectedId) ?? visible[0];
  const currentChecks = selected
    ? (checks[selected.id] ?? [false, false, false])
    : [false, false, false];
  const completed = currentChecks.filter(Boolean).length;
  function toggleCheck(index: number) {
    if (!selected) return;
    const next = [...currentChecks];
    next[index] = !next[index];
    setChecks({ ...checks, [selected.id]: next });
  }
  function create(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const problem = String(form.get("problem") ?? "").trim();
    if (!problem) return;
    const id = `DEMO-CAPA-${String(localRecords.length + 1).padStart(4, "0")}`;
    const record: CapaRecord = {
      id,
      problem,
      type: form.get("type") as CapaRecord["type"],
      status: "Open",
      owner: String(form.get("owner") ?? "").trim() || null,
      due: String(form.get("due") ?? "") || null,
      provenance: "demo",
    };
    setLocalRecords([record, ...localRecords]);
    setSelectedId(id);
    setType("All");
    setQuery("");
    setOpen(false);
    setNotice(t("dynamic.v0CreatedInTheLocalDemoNoErp", { v0: id }));
  }
  return (
    <Workspace
      title={t("copy.fromAProblemToAConsideredResponse")}
      description={t("copy.exploreTheSuppliedCapaRegisterThenTryA")}
      actions={
        <Button variant="primary" onClick={() => setOpen(true)}>
          <Plus size={14} aria-hidden="true" />
          {t("copy.openDemoCapa")}
        </Button>
      }
    >
      <div className={css.workspaceBody}>
        <div className={css.snapshotLine}>
          <span>{t("copy.suppliedCapaSummaryLast90Days")}</span>
          <span>{t("ui.localAdditions", { count: localRecords.length })}</span>
        </div>
        <dl className={css.metricsFour}>
          <Metric
            label={t("copy.capasRaised")}
            value="5"
            detail={t("copy.sourceSummary90Days")}
          />
          <Metric
            label={t("copy.open")}
            value="4"
            detail={t("copy.fourSuppliedOpenRecords")}
            tone="amber"
          />
          <Metric
            label={t("copy.overdue")}
            value="0"
            detail={t("copy.sourceSnapshot")}
            tone="green"
          />
          <Metric
            label={t("copy.closed")}
            value="1"
            detail={t("copy.closedRecordNotSupplied")}
            tone="blue"
          />
        </dl>
        <div className={css.filterBar}>
          <SearchField
            value={query}
            onChange={setQuery}
            label={t("copy.searchCapaReferenceOrProblem")}
          />
          <div
            className={css.segmented}
            role="group"
            aria-label={t("copy.capaType")}
          >
            {["All", "Corrective", "Preventive"].map((value) => (
              <Button
                key={value}
                aria-pressed={type === value}
                onClick={() => setType(value)}
              >
                {enumLabel(t, value)}
              </Button>
            ))}
          </div>
        </div>
        <div className={css.capaWorkspaceGrid}>
          <div className={css.capaRegister}>
            <div className={css.registerHeading}>
              <h3>{t("copy.openCapas")}</h3>
              <span role="status" aria-live="polite">
                {t("ui.matchingRecords", { count: visible.length })}
              </span>
            </div>
            {visible.length ? (
              <div className={css.capaCards}>
                {visible.map((record) => (
                  <button
                    key={record.id}
                    type="button"
                    data-selected={selected?.id === record.id}
                    onClick={() => setSelectedId(record.id)}
                    aria-pressed={selected?.id === record.id}
                    aria-controls="capa-plan"
                  >
                    <span className={css.capaCardCode}>
                      {record.id}
                      <Tag
                        tone={record.type === "Corrective" ? "blue" : "neutral"}
                      >
                        {enumLabel(t, record.type)}
                      </Tag>
                    </span>
                    <strong>{record.problem}</strong>
                    <span className={css.capaCardMeta}>
                      <span>
                        {t("copy.owner")}
                        {record.owner ?? "—"}
                      </span>
                      <span>
                        {t("copy.due")}
                        {formatDate(locale, record.due)}
                      </span>
                    </span>
                    <span className={css.capaCardBottom}>
                      <Tag tone="red">{enumLabel(t, record.status)}</Tag>
                      <Provenance kind={record.provenance} />
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <Empty title={t("copy.noMatchingCapa")}>
                {t("copy.tryAnotherTypeOrProblemTheUnseenClosed")}
              </Empty>
            )}
            <p className={css.registerFootnote}>
              {t("copy.ownerAndDueDatesAreBlankInThe")}
            </p>
          </div>
          <section
            id="capa-plan"
            className={css.actionPlan}
            aria-label={t("copy.illustrativeCapaActionPlan")}
          >
            {selected ? (
              <div key={selected.id} className={css.detailReveal}>
                <div className={css.actionPlanHeader}>
                  <span className={css.eyebrow}>
                    {t("copy.exploreTheActionFlow")}
                  </span>
                  <Provenance kind="demo" />
                </div>
                <h3>{selected.id}</h3>
                <p className={css.actionPlanProblem}>{selected.problem}</p>
                <div
                  className={css.phaseRail}
                  role="group"
                  aria-label={t("copy.illustrativeCapaPhase")}
                >
                  {phases.map((label, index) => (
                    <button
                      key={label}
                      type="button"
                      aria-pressed={(phase[selected.id] ?? 0) === index}
                      onClick={() =>
                        setPhase({ ...phase, [selected.id]: index })
                      }
                    >
                      <span>{index + 1}</span>
                      {label}
                    </button>
                  ))}
                </div>
                <div className={css.phaseContext}>
                  <ClipboardCheck size={19} aria-hidden="true" />
                  <div>
                    <strong>{phaseResponses[phase[selected.id] ?? 0]}</strong>
                    <p>
                      {
                        [
                          t("copy.startWithTheFindingAndGatherTheMissing"),
                          t(
                            "copy.defineTheActionOwnerAndExpectedEvidenceBefore",
                          ),
                          t(
                            "copy.followTheChosenWorkAndKeepCompletionEvidence",
                          ),
                          t(
                            "copy.reviewEffectivenessBeforeConsideringACaseComplete",
                          ),
                        ][phase[selected.id] ?? 0]
                      }
                    </p>
                  </div>
                </div>
                <div className={css.demoPlanHeading}>
                  <h4>{t("copy.illustrativeEvidenceChecklist")}</h4>
                  <span>{completed} / 3</span>
                </div>
                <div
                  className={css.checklistProgress}
                  role="progressbar"
                  aria-label={t("copy.localDemoChecklistCompletion")}
                  aria-valuemin={0}
                  aria-valuemax={3}
                  aria-valuenow={completed}
                >
                  <span style={{ width: `${(completed / 3) * 100}%` }} />
                </div>
                <div className={css.actionChecklist}>
                  {actionSteps.map((label, index) => (
                    <label key={label}>
                      <input
                        type="checkbox"
                        checked={currentChecks[index]}
                        onChange={() => toggleCheck(index)}
                      />
                      <span>{label}</span>
                      {currentChecks[index] && (
                        <Check size={14} aria-hidden="true" />
                      )}
                    </label>
                  ))}
                </div>
                <div
                  className={css.planOutcome}
                  role="status"
                  aria-live="polite"
                >
                  {completed === 3
                    ? t(
                        "copy.theDemoChecklistIsCompleteReviewVerificationContext",
                      )
                    : t("copy.tryTheChecklistToExploreTheEvidenceFlow")}
                </div>
                <p className={css.panelNote}>
                  {t("copy.noSourceRootCauseActionItemsOrVerification")}
                </p>
              </div>
            ) : (
              <Empty title={t("copy.selectAnOpenCase")}>
                {t("copy.theLocalActionPlanDemonstrationAppearsHere")}
              </Empty>
            )}
          </section>
        </div>
        <p className={css.liveNotice} role="status" aria-live="polite">
          {notice}
        </p>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className={`sm:max-w-[620px] ${css.recordDialog}`}
          lang={locale}
          dir={locale === "ar" ? "rtl" : "ltr"}
          closeLabel={t("ui.close")}
        >
          <DialogHeader>
            <DialogTitle>{t("copy.openADemoCapa")}</DialogTitle>
            <DialogDescription>
              {t("copy.createALocalMockCaseToExploreThe")}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={create} className={css.recordForm}>
            <Field label={t("copy.problemStatement")}>
              <input
                name="problem"
                required
                maxLength={180}
                placeholder={t("copy.describeTheProblemToInvestigate")}
              />
            </Field>
            <div className={css.formColumns}>
              <Field label={t("copy.actionType")}>
                <select name="type" defaultValue="Corrective">
                  <option value="Corrective">
                    {enumLabel(t, "Corrective")}
                  </option>
                  <option value="Preventive">
                    {enumLabel(t, "Preventive")}
                  </option>
                </select>
              </Field>
              <Field label={t("copy.demoOwner")}>
                <input
                  name="owner"
                  maxLength={80}
                  placeholder={t("copy.optional")}
                />
              </Field>
              <Field label={t("copy.demoDueDate")}>
                <input name="due" type="date" />
              </Field>
            </div>
            <div className={css.formActions}>
              <Button onClick={() => setOpen(false)}>{t("copy.cancel")}</Button>
              <Button variant="primary" type="submit">
                {t("copy.createLocalDemoCapa")}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </Workspace>
  );
}
