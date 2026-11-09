"use client";
import { enumLabel, formatDate } from "./labels";
import { useTranslations, useLocale } from "next-intl";

import { useState, type FormEvent } from "react";
import { CircleAlert, Plus, ShieldCheck } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  getSuppliedNcRecords,
  type NcRecord,
  type NcSource,
  type Severity,
} from "./data";
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

export default function NonConformanceWorkspace() {
  const t = useTranslations("pages.qualityApp");
  const suppliedNcRecords = getSuppliedNcRecords(t);
  const locale = useLocale();

  const [localRecords, setLocalRecords] = useState<NcRecord[]>([]);
  const [query, setQuery] = useState("");
  const [severity, setSeverity] = useState("All");
  const [source, setSource] = useState("All");
  const [selectedId, setSelectedId] = useState("NC-0004");
  const [open, setOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const records = [...localRecords, ...suppliedNcRecords];
  const visible = records.filter(
    (record) =>
      (severity === "All" || record.severity === severity) &&
      (source === "All" || record.source === source) &&
      `${record.id} ${record.title}`
        .toLowerCase()
        .includes(query.toLowerCase().trim()),
  );
  const selected =
    visible.find((record) => record.id === selectedId) ?? visible[0];
  function createRecord(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const title = String(form.get("title") ?? "").trim();
    const affected = Number(form.get("affected"));
    if (!title || !Number.isFinite(affected) || affected < 0) return;
    const id = `DEMO-NC-${String(localRecords.length + 1).padStart(4, "0")}`;
    const record: NcRecord = {
      id,
      title,
      source: form.get("source") as NcSource,
      severity: form.get("severity") as Severity,
      status: "Open",
      affected,
      detected: String(form.get("detected")),
      provenance: "demo",
    };
    setLocalRecords([record, ...localRecords]);
    setSelectedId(id);
    setQuery("");
    setSource("All");
    setSeverity("All");
    setOpen(false);
    setNotice(t("dynamic.v0AddedToThisLocalDemoNoErp", { v0: id }));
  }
  return (
    <Workspace
      title={t("copy.everyExceptionDeservesAClearRecord")}
      description={t("copy.searchAndInspectTheFourSuppliedOpenRecords")}
      actions={
        <>
          <Button
            onClick={() => {
              setQuery("");
              setSource("All");
              setSeverity("All");
            }}
          >
            {t("copy.resetFilters")}
          </Button>
          <Button variant="primary" onClick={() => setOpen(true)}>
            <Plus size={14} aria-hidden="true" />
            {t("copy.raiseDemoNc")}
          </Button>
        </>
      }
    >
      <div className={css.workspaceBody}>
        <div className={css.snapshotLine}>
          <span>{t("copy.suppliedRegisterSummary30Days")}</span>
          <span>{t("ui.localRecords", { count: localRecords.length })}</span>
        </div>
        <dl className={css.metricsFour}>
          <Metric
            label={t("copy.ncsRaised")}
            value="6"
            detail={t("copy.sourceSummary30Days")}
          />
          <Metric
            label={t("copy.openNcs")}
            value="4"
            detail={t("copy.fourVisibleSourceRows")}
            tone="red"
          />
          <Metric
            label={t("copy.criticalNcs")}
            value="1"
            detail={t("copy.individualCaseNotSupplied")}
            tone="amber"
          />
          <Metric
            label={t("copy.affectedQuantity")}
            value="0"
            detail={t("copy.acrossTheFourSuppliedRows")}
          />
        </dl>
        <div className={css.filterBar}>
          <SearchField
            value={query}
            onChange={setQuery}
            label={t("copy.searchNcReferenceOrProblem")}
          />
          <label className={css.inlineField}>
            {t("copy.severity")}
            <select
              value={severity}
              onChange={(event) => setSeverity(event.target.value)}
            >
              {["All", "Minor", "Major", "Critical"].map((value) => (
                <option key={value} value={value}>
                  {enumLabel(t, value)}
                </option>
              ))}
            </select>
          </label>
          <label className={css.inlineField}>
            {t("copy.source")}
            <select
              value={source}
              onChange={(event) => setSource(event.target.value)}
            >
              {["All", "Inspection", "Supplier", "Production"].map((value) => (
                <option key={value} value={value}>
                  {enumLabel(t, value)}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className={css.recordLayout}>
          <div className={css.recordRegister}>
            <div className={css.registerHeading}>
              <h3>{t("copy.nonConformances")}</h3>
              <span role="status" aria-live="polite">
                {t("ui.matchingRecords", { count: visible.length })}
              </span>
            </div>
            <div className={css.tableScroll}>
              <table className={css.dataTable}>
                <caption className="sr-only">
                  {t(
                    "copy.suppliedNonConformanceExcerptAndClearlyIdentifiedLocal",
                  )}
                </caption>
                <thead>
                  <tr>
                    {[
                      t("copy.referenceFinding"),
                      t("copy.source"),
                      t("copy.severity"),
                      t("copy.status"),
                    ].map((label) => (
                      <th key={label} scope="col">
                        {label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {visible.map((record) => (
                    <tr
                      key={record.id}
                      data-selected={selected?.id === record.id}
                      data-provenance={record.provenance}
                    >
                      <th scope="row">
                        <button
                          type="button"
                          onClick={() => setSelectedId(record.id)}
                          aria-pressed={selected?.id === record.id}
                          aria-controls="nc-detail"
                        >
                          <span className={css.recordCode}>{record.id}</span>
                          <span className={css.recordTitle}>
                            {record.title}
                          </span>
                          {record.provenance === "demo" && (
                            <span className={css.localRecord}>
                              {t("copy.localDemoRecord")}
                            </span>
                          )}
                        </button>
                      </th>
                      <td>{enumLabel(t, record.source)}</td>
                      <td>
                        <Tag
                          tone={
                            record.severity === "Critical"
                              ? "red"
                              : record.severity === "Major"
                                ? "amber"
                                : "blue"
                          }
                        >
                          {enumLabel(t, record.severity)}
                        </Tag>
                      </td>
                      <td>
                        <Tag tone={record.status === "Open" ? "red" : "blue"}>
                          {enumLabel(t, record.status)}
                        </Tag>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {!visible.length && (
              <Empty title={t("copy.noMatchingRecords")}>
                {t("copy.tryADifferentSourceOrSeverityTheUnseen")}
              </Empty>
            )}
            <p className={css.registerFootnote}>
              {t("copy.sourceTotalsIncludeTwoRecordsOutsideTheSupplied")}
            </p>
          </div>
          <aside
            id="nc-detail"
            className={css.caseNotebook}
            aria-label={t("copy.selectedNonConformanceDetails")}
          >
            {selected ? (
              <div key={selected.id} className={css.detailReveal}>
                <div className={css.notebookTop}>
                  <ShieldCheck size={18} aria-hidden="true" />
                  <Provenance kind={selected.provenance} />
                </div>
                <span className={css.microLabel}>
                  {t("copy.exceptionFile")}
                </span>
                <h3>{selected.id}</h3>
                <p className={css.notebookProblem}>{selected.title}</p>
                <dl className={css.detailFacts}>
                  <div>
                    <dt>{t("copy.detected")}</dt>
                    <dd>{formatDate(locale, selected.detected)}</dd>
                  </div>
                  <div>
                    <dt>{t("copy.source")}</dt>
                    <dd>{enumLabel(t, selected.source)}</dd>
                  </div>
                  <div>
                    <dt>{t("copy.quantityAffected")}</dt>
                    <dd>{selected.affected}</dd>
                  </div>
                  <div>
                    <dt>{t("copy.currentStatus")}</dt>
                    <dd>{enumLabel(t, selected.status)}</dd>
                  </div>
                </dl>
                <div className={css.detailNote}>
                  <CircleAlert size={16} aria-hidden="true" />
                  <p>
                    {selected.provenance === "supplied"
                      ? t("copy.containmentDispositionAndRootCauseNotesWereNot")
                      : t("copy.thisIsALocalDemonstrationCaseItWill")}
                  </p>
                </div>
              </div>
            ) : (
              <Empty title={t("copy.selectARecord")}>
                {t("copy.aMatchingCaseWillAppearHere")}
              </Empty>
            )}
          </aside>
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
            <DialogTitle>{t("copy.raiseADemoNonConformance")}</DialogTitle>
            <DialogDescription>
              {t("copy.exploreTheEntryFlowWithALocalMock")}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={createRecord} className={css.recordForm}>
            <Field label={t("copy.findingProblem")}>
              <input
                name="title"
                required
                maxLength={180}
                placeholder={t("copy.describeTheQualityException")}
              />
            </Field>
            <div className={css.formColumns}>
              <Field label={t("copy.source")}>
                <select name="source" defaultValue="Production">
                  <option value="Production">
                    {enumLabel(t, "Production")}
                  </option>
                  <option value="Inspection">
                    {enumLabel(t, "Inspection")}
                  </option>
                  <option value="Supplier">{enumLabel(t, "Supplier")}</option>
                </select>
              </Field>
              <Field label={t("copy.severity")}>
                <select name="severity" defaultValue="Major">
                  <option value="Minor">{enumLabel(t, "Minor")}</option>
                  <option value="Major">{enumLabel(t, "Major")}</option>
                  <option value="Critical">{enumLabel(t, "Critical")}</option>
                </select>
              </Field>
              <Field label={t("copy.quantityAffected")}>
                <input
                  name="affected"
                  type="number"
                  min="0"
                  step="any"
                  defaultValue="0"
                  required
                />
              </Field>
              <Field label={t("copy.detectedDate")}>
                <input
                  name="detected"
                  type="date"
                  defaultValue="2026-10-19"
                  required
                />
              </Field>
            </div>
            <div className={css.formActions}>
              <Button onClick={() => setOpen(false)}>{t("copy.cancel")}</Button>
              <Button variant="primary" type="submit">
                {t("copy.createLocalDemoNc")}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </Workspace>
  );
}
