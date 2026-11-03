"use client";

import { useState, type FormEvent } from "react";
import { Check, ClipboardCheck, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { suppliedCapaRecords, type CapaRecord } from "./data";
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

const actionSteps = [
  "Review the finding and containment context",
  "Document the proposed action and supporting evidence",
  "Review effectiveness before considering closure",
];
const phases = ["Understand", "Plan", "Act", "Verify"];
export default function CapaWorkspace() {
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
    setNotice(`${id} created in the local demo. No ERP record was changed.`);
  }
  return (
    <Workspace
      title="From a problem to a considered response."
      description="Explore the supplied CAPA register, then try a separate illustrative action plan. Checklists and phases are local demo interactions."
      actions={
        <Button variant="primary" onClick={() => setOpen(true)}>
          <Plus size={14} aria-hidden="true" />
          Open demo CAPA
        </Button>
      }
    >
      <div className={css.workspaceBody}>
        <div className={css.snapshotLine}>
          <span>Supplied CAPA summary / Last 90 days</span>
          <span>{localRecords.length} local demo additions</span>
        </div>
        <dl className={css.metricsFour}>
          <Metric
            label="CAPAs raised"
            value="5"
            detail="Source summary · 90 days"
          />
          <Metric
            label="Open"
            value="4"
            detail="Four supplied open records"
            tone="amber"
          />
          <Metric
            label="Overdue"
            value="0"
            detail="Source snapshot"
            tone="green"
          />
          <Metric
            label="Closed"
            value="1"
            detail="Closed record not supplied"
            tone="blue"
          />
        </dl>
        <div className={css.filterBar}>
          <SearchField
            value={query}
            onChange={setQuery}
            label="Search CAPA reference or problem…"
          />
          <div className={css.segmented} role="group" aria-label="CAPA type">
            {["All", "Corrective", "Preventive"].map((value) => (
              <Button
                key={value}
                aria-pressed={type === value}
                onClick={() => setType(value)}
              >
                {value}
              </Button>
            ))}
          </div>
        </div>
        <div className={css.capaWorkspaceGrid}>
          <div className={css.capaRegister}>
            <div className={css.registerHeading}>
              <h3>Open CAPAs</h3>
              <span role="status" aria-live="polite">
                {visible.length} matching records
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
                        {record.type}
                      </Tag>
                    </span>
                    <strong>{record.problem}</strong>
                    <span className={css.capaCardMeta}>
                      <span>Owner: {record.owner ?? "—"}</span>
                      <span>Due: {record.due ?? "—"}</span>
                    </span>
                    <span className={css.capaCardBottom}>
                      <Tag tone="red">{record.status}</Tag>
                      <Provenance kind={record.provenance} />
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <Empty title="No matching CAPA">
                Try another type or problem. The unseen closed source record is
                not invented.
              </Empty>
            )}
            <p className={css.registerFootnote}>
              Owner and due dates are blank in the supplied open records.
            </p>
          </div>
          <section
            id="capa-plan"
            className={css.actionPlan}
            aria-label="Illustrative CAPA action plan"
          >
            {selected ? (
              <div key={selected.id} className={css.detailReveal}>
                <div className={css.actionPlanHeader}>
                  <span className={css.eyebrow}>Explore the action flow</span>
                  <Provenance kind="demo" />
                </div>
                <h3>{selected.id}</h3>
                <p className={css.actionPlanProblem}>{selected.problem}</p>
                <div
                  className={css.phaseRail}
                  role="group"
                  aria-label="Illustrative CAPA phase"
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
                    <strong>
                      {phases[phase[selected.id] ?? 0]} the response
                    </strong>
                    <p>
                      {
                        [
                          "Start with the finding and gather the missing investigation context.",
                          "Define the action, owner and expected evidence before execution.",
                          "Follow the chosen work and keep completion evidence together.",
                          "Review effectiveness before considering a case complete.",
                        ][phase[selected.id] ?? 0]
                      }
                    </p>
                  </div>
                </div>
                <div className={css.demoPlanHeading}>
                  <h4>Illustrative evidence checklist</h4>
                  <span>{completed} / 3</span>
                </div>
                <div
                  className={css.checklistProgress}
                  role="progressbar"
                  aria-label="Local demo checklist completion"
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
                    ? "The demo checklist is complete. Review verification context before closure."
                    : "Try the checklist to explore the evidence flow. Source status remains Open."}
                </div>
                <p className={css.panelNote}>
                  No source root cause, action items or verification evidence
                  were supplied. This plan is an illustrative interaction.
                </p>
              </div>
            ) : (
              <Empty title="Select an open case">
                The local action-plan demonstration appears here.
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
          lang="en"
          dir="ltr"
        >
          <DialogHeader>
            <DialogTitle>Open a demo CAPA</DialogTitle>
            <DialogDescription>
              Create a local mock case to explore the planning flow. Nothing is
              saved to the ERP.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={create} className={css.recordForm}>
            <Field label="Problem statement">
              <input
                name="problem"
                required
                maxLength={180}
                placeholder="Describe the problem to investigate"
              />
            </Field>
            <div className={css.formColumns}>
              <Field label="Action type">
                <select name="type" defaultValue="Corrective">
                  <option>Corrective</option>
                  <option>Preventive</option>
                </select>
              </Field>
              <Field label="Demo owner">
                <input name="owner" maxLength={80} placeholder="Optional" />
              </Field>
              <Field label="Demo due date">
                <input name="due" type="date" />
              </Field>
            </div>
            <div className={css.formActions}>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button variant="primary" type="submit">
                Create local demo CAPA
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </Workspace>
  );
}
