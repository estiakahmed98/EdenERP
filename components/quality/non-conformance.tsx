"use client";

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
  suppliedNcRecords,
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
    setNotice(`${id} added to this local demo. No ERP record was created.`);
  }
  return (
    <Workspace
      title="Every exception deserves a clear record."
      description="Search and inspect the four supplied open records. Create a separate, clearly marked demo case to explore the entry flow."
      actions={
        <>
          <Button
            onClick={() => {
              setQuery("");
              setSource("All");
              setSeverity("All");
            }}
          >
            Reset filters
          </Button>
          <Button variant="primary" onClick={() => setOpen(true)}>
            <Plus size={14} aria-hidden="true" />
            Raise demo NC
          </Button>
        </>
      }
    >
      <div className={css.workspaceBody}>
        <div className={css.snapshotLine}>
          <span>Supplied register summary / 30 days</span>
          <span>
            {localRecords.length} local demo{" "}
            {localRecords.length === 1 ? "record" : "records"}
          </span>
        </div>
        <dl className={css.metricsFour}>
          <Metric
            label="NCs raised"
            value="6"
            detail="Source summary · 30 days"
          />
          <Metric
            label="Open NCs"
            value="4"
            detail="Four visible source rows"
            tone="red"
          />
          <Metric
            label="Critical NCs"
            value="1"
            detail="Individual case not supplied"
            tone="amber"
          />
          <Metric
            label="Affected quantity"
            value="0"
            detail="Across the four supplied rows"
          />
        </dl>
        <div className={css.filterBar}>
          <SearchField
            value={query}
            onChange={setQuery}
            label="Search NC reference or problem…"
          />
          <label className={css.inlineField}>
            Severity
            <select
              value={severity}
              onChange={(event) => setSeverity(event.target.value)}
            >
              {["All", "Minor", "Major", "Critical"].map((value) => (
                <option key={value}>{value}</option>
              ))}
            </select>
          </label>
          <label className={css.inlineField}>
            Source
            <select
              value={source}
              onChange={(event) => setSource(event.target.value)}
            >
              {["All", "Inspection", "Supplier", "Production"].map((value) => (
                <option key={value}>{value}</option>
              ))}
            </select>
          </label>
        </div>
        <div className={css.recordLayout}>
          <div className={css.recordRegister}>
            <div className={css.registerHeading}>
              <h3>Non-conformances</h3>
              <span role="status" aria-live="polite">
                {visible.length} matching records
              </span>
            </div>
            <div className={css.tableScroll}>
              <table className={css.dataTable}>
                <caption className="sr-only">
                  Supplied non-conformance excerpt and clearly identified local
                  demo records
                </caption>
                <thead>
                  <tr>
                    {[
                      "Reference / finding",
                      "Source",
                      "Severity",
                      "Status",
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
                              Local demo record
                            </span>
                          )}
                        </button>
                      </th>
                      <td>{record.source}</td>
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
                          {record.severity}
                        </Tag>
                      </td>
                      <td>
                        <Tag tone={record.status === "Open" ? "red" : "blue"}>
                          {record.status}
                        </Tag>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {!visible.length && (
              <Empty title="No matching records">
                Try a different source or severity. The unseen source records
                are not added to this demo.
              </Empty>
            )}
            <p className={css.registerFootnote}>
              Source totals include two records outside the supplied excerpt.
              Local demo additions are counted separately.
            </p>
          </div>
          <aside
            id="nc-detail"
            className={css.caseNotebook}
            aria-label="Selected non-conformance details"
          >
            {selected ? (
              <div key={selected.id} className={css.detailReveal}>
                <div className={css.notebookTop}>
                  <ShieldCheck size={18} aria-hidden="true" />
                  <Provenance kind={selected.provenance} />
                </div>
                <span className={css.microLabel}>Exception file</span>
                <h3>{selected.id}</h3>
                <p className={css.notebookProblem}>{selected.title}</p>
                <dl className={css.detailFacts}>
                  <div>
                    <dt>Detected</dt>
                    <dd>{selected.detected}</dd>
                  </div>
                  <div>
                    <dt>Source</dt>
                    <dd>{selected.source}</dd>
                  </div>
                  <div>
                    <dt>Quantity affected</dt>
                    <dd>{selected.affected}</dd>
                  </div>
                  <div>
                    <dt>Current status</dt>
                    <dd>{selected.status}</dd>
                  </div>
                </dl>
                <div className={css.detailNote}>
                  <CircleAlert size={16} aria-hidden="true" />
                  <p>
                    {selected.provenance === "supplied"
                      ? "Containment, disposition and root-cause notes were not included in the supplied record."
                      : "This is a local demonstration case. It will reset when the page is reloaded."}
                  </p>
                </div>
              </div>
            ) : (
              <Empty title="Select a record">
                A matching case will appear here.
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
          lang="en"
          dir="ltr"
        >
          <DialogHeader>
            <DialogTitle>Raise a demo non-conformance</DialogTitle>
            <DialogDescription>
              Explore the entry flow with a local mock record. Supplied records
              remain unchanged.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={createRecord} className={css.recordForm}>
            <Field label="Finding / problem">
              <input
                name="title"
                required
                maxLength={180}
                placeholder="Describe the quality exception"
              />
            </Field>
            <div className={css.formColumns}>
              <Field label="Source">
                <select name="source" defaultValue="Production">
                  <option>Production</option>
                  <option>Inspection</option>
                  <option>Supplier</option>
                </select>
              </Field>
              <Field label="Severity">
                <select name="severity" defaultValue="Major">
                  <option>Minor</option>
                  <option>Major</option>
                  <option>Critical</option>
                </select>
              </Field>
              <Field label="Quantity affected">
                <input
                  name="affected"
                  type="number"
                  min="0"
                  step="any"
                  defaultValue="0"
                  required
                />
              </Field>
              <Field label="Detected date">
                <input
                  name="detected"
                  type="date"
                  defaultValue="2026-10-19"
                  required
                />
              </Field>
            </div>
            <div className={css.formActions}>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button variant="primary" type="submit">
                Create local demo NC
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </Workspace>
  );
}
