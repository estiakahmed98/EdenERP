"use client";
import { useState } from "react";
import { Plus, Trash2, PenLine, ArrowRight } from "lucide-react";
import { marksSummary } from "../calculations";
import {
  Badge,
  Button,
  CheckField,
  css,
  Field,
  Notice,
  Panel,
  Ring,
  Table,
  useCollege,
  Workspace,
} from "../ui";
function Sheet() {
  const { t, number } = useCollege();
  const [rows, setRows] = useState([
      { id: 1, score: "", maximum: "100" },
      { id: 2, score: "", maximum: "100" },
      { id: 3, score: "", maximum: "100" },
    ]),
    [nextId, setNextId] = useState(4),
    [professor, setProfessor] = useState(false),
    [registrar, setRegistrar] = useState(false),
    [reviewed, setReviewed] = useState(false),
    [title, setTitle] = useState("");
  const result = marksSummary(rows),
    invalid = rows.some(
      (r) =>
        r.score !== "" &&
        (Number(r.score) < 0 ||
          Number(r.score) > Number(r.maximum) ||
          !r.maximum.trim() ||
          Number(r.maximum) <= 0),
    );
  function update(id: number, key: "score" | "maximum", value: string) {
    setRows(rows.map((r) => (r.id === id ? { ...r, [key]: value } : r)));
    setReviewed(false);
    setProfessor(false);
    setRegistrar(false);
  }
  return (
    <div className={css.assessmentDesk}>
      <div className={css.markSheet}>
        <div className={css.sheetTop}>
          <PenLine size={23} aria-hidden="true" />
          <div>
            <h3>{t("ui.sheet")}</h3>
            <p>{t("ui.sheetHint")}</p>
          </div>
          <Badge>{t("ui.draft")}</Badge>
        </div>
        <Field label={t("ui.name")}>
          <input
            value={title}
            maxLength={80}
            onChange={(e) => {
              setTitle(e.target.value);
              setReviewed(false);
            }}
            placeholder={t("ui.sheet")}
          />
        </Field>
        <Table
          label={t("ui.sheet")}
          headers={[
            t("ui.criterion"),
            t("ui.maximum"),
            t("ui.score"),
            t("ui.details"),
          ]}
        >
          {rows.map((r, i) => (
            <tr key={r.id}>
              <td>
                <strong>{t("ui.item", { value: number(i + 1) })}</strong>
              </td>
              <td>
                <input
                  aria-label={`${t("ui.maximum")} · ${t("ui.item", { value: number(i + 1) })}`}
                  type="number"
                  min="1"
                  max="10000"
                  value={r.maximum}
                  onChange={(e) => update(r.id, "maximum", e.target.value)}
                />
              </td>
              <td>
                <input
                  aria-label={`${t("ui.score")} · ${t("ui.item", { value: number(i + 1) })}`}
                  type="number"
                  min="0"
                  max={r.maximum}
                  value={r.score}
                  onChange={(e) => update(r.id, "score", e.target.value)}
                  aria-invalid={
                    !!r.score &&
                    (Number(r.score) < 0 || Number(r.score) > Number(r.maximum))
                  }
                />
              </td>
              <td>
                <Button
                  aria-label={t("ui.removeItem", { value: number(i + 1) })}
                  disabled={rows.length === 1}
                  onClick={() => {
                    setRows(rows.filter((x) => x.id !== r.id));
                    setReviewed(false);
                    setProfessor(false);
                    setRegistrar(false);
                  }}
                >
                  <Trash2 size={14} aria-hidden="true" />
                </Button>
              </td>
            </tr>
          ))}
        </Table>
        <div className={css.sheetFooter}>
          <Button
            disabled={rows.length >= 12}
            onClick={() => {
              setRows([...rows, { id: nextId, score: "", maximum: "100" }]);
              setNextId(nextId + 1);
              setReviewed(false);
              setProfessor(false);
              setRegistrar(false);
            }}
          >
            <Plus size={14} aria-hidden="true" />
            {t("ui.addItem")}
          </Button>
          <output>
            {t("ui.total")}:{" "}
            {result
              ? `${number(result.total)} / ${number(result.maximum)}`
              : "—"}
          </output>
        </div>
        {invalid && <Notice error>{t("ui.marksError")}</Notice>}
      </div>
      <div className={css.assessmentMargin}>
        <Ring value={result?.percentage ?? null} label={t("ui.percentage")} />
        <Panel title={t("ui.approval")}>
          <div className={css.reviewChain}>
            <CheckField
              label={t("ui.professor")}
              checked={professor}
              disabled={!result}
              onChange={(v) => {
                setProfessor(v);
                setRegistrar(false);
                setReviewed(false);
              }}
            />
            <ArrowRight size={18} aria-hidden="true" />
            <CheckField
              label={t("ui.registrar")}
              checked={registrar}
              disabled={!result || !professor}
              onChange={(v) => {
                setRegistrar(v);
                setReviewed(false);
              }}
            />
          </div>
          <p className={css.caption}>{t("ui.noApproval")}</p>
          <Button
            primary
            disabled={!result || !professor || !registrar}
            onClick={() => setReviewed(true)}
          >
            {t("ui.review")}
          </Button>
          {reviewed && <Notice>{t("ui.notSaved")}</Notice>}
        </Panel>
      </div>
    </div>
  );
}
export default function Assessment() {
  const [epoch, setEpoch] = useState(0);
  return (
    <Workspace reset={() => setEpoch((n) => n + 1)}>
      <Sheet key={epoch} />
    </Workspace>
  );
}
