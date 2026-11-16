"use client";
import { useState } from "react";
import { Check, CreditCard, Minus, Plus } from "lucide-react";
import { canPreviewClose, moneyTotal, splitCoverage } from "../calculations";
import {
  Badge,
  Button,
  css,
  DataTable,
  Field,
  Metric,
  Notice,
  Panel,
  Tabs,
  useHospital,
  Workspace,
} from "../ui";

function Billing() {
  const { t, money, number } = useHospital();
  const [quantities, setQuantities] = useState([1, 0, 0]);
  const [tendered, setTendered] = useState("");
  const [receipt, setReceipt] = useState(false);
  const fees = [800, 100, 50];
  const keys = ["consultation", "sampleHandling", "reportCopy"];
  const total =
    moneyTotal(
      fees.map((price, index) => ({ price, quantity: quantities[index] })),
    ) ?? 0;
  const cash = Number(tendered);
  const canReview =
    !!tendered && Number.isFinite(cash) && cash >= total && total > 0;
  return (
    <div className={css.twoCol}>
      <Panel title={t("ui.estimate")}>
        <DataTable
          title={t("ui.services")}
          headers={[t("ui.service"), t("ui.price"), t("ui.quantity")]}
        >
          {keys.map((key, index) => (
            <tr key={key}>
              <td>{t(`ui.${key}`)}</td>
              <td>{money(fees[index])}</td>
              <td>
                <div className={css.quantityControl}>
                  <Button
                    aria-label={`${t("ui.quantity")} − ${t(`ui.${key}`)}`}
                    disabled={!quantities[index]}
                    onClick={() => {
                      setQuantities(
                        quantities.map((q, i) => (i === index ? q - 1 : q)),
                      );
                      setReceipt(false);
                    }}
                  >
                    <Minus size={12} />
                  </Button>
                  <output>{number(quantities[index])}</output>
                  <Button
                    aria-label={`${t("ui.quantity")} + ${t(`ui.${key}`)}`}
                    disabled={quantities[index] >= 99}
                    onClick={() => {
                      setQuantities(
                        quantities.map((q, i) => (i === index ? q + 1 : q)),
                      );
                      setReceipt(false);
                    }}
                  >
                    <Plus size={12} />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </DataTable>
        <Notice>{t("ui.noPricePromise")}</Notice>
      </Panel>
      <div className={css.receiptTotal}>
        <CreditCard size={23} aria-hidden="true" />
        <p>{t("ui.total")}</p>
        <strong aria-live="polite">{money(total)}</strong>
        <Field label={t("ui.tendered")}>
          <input
            type="number"
            min="0"
            step="0.01"
            max="10000000"
            value={tendered}
            onChange={(event) => {
              setTendered(event.target.value);
              setReceipt(false);
            }}
          />
        </Field>
        <div className={css.statusLine}>
          <span className={css.small}>
            {t(cash >= total ? "ui.change" : "ui.shortfall")}
          </span>
          <strong>
            {money(Number.isFinite(cash) ? Math.abs(cash - total) : total)}
          </strong>
        </div>
        <hr className={css.divider} />
        <Button primary disabled={!canReview} onClick={() => setReceipt(true)}>
          {t("ui.receipt")}
        </Button>
        <Notice>{t(receipt ? "ui.noPayment" : "ui.illustrative")}</Notice>
        {receipt && (
          <Badge tone="green">DEMO-RECEIPT / {t("ui.reviewOnly")}</Badge>
        )}
      </div>
    </div>
  );
}
function DayClose() {
  const { t, money } = useHospital();
  const [charges, setCharges] = useState("21000");
  const [payments, setPayments] = useState("19750");
  const [prior, setPrior] = useState(true);
  const [reviewed, setReviewed] = useState(false);
  const charge = Number(charges),
    paid = Number(payments);
  const ready = !!charges && !!payments && canPreviewClose(charge, paid, prior);
  return (
    <div className={css.stack}>
      <div className={css.equalCols}>
        <Panel title={t("ui.charges")}>
          <Field label={t("ui.charges")}>
            <input
              type="number"
              min="0"
              max="100000000"
              value={charges}
              onChange={(event) => {
                setCharges(event.target.value);
                setReviewed(false);
              }}
            />
          </Field>
        </Panel>
        <Panel title={t("ui.collections")}>
          <Field label={t("ui.collections")}>
            <input
              type="number"
              min="0"
              max="100000000"
              value={payments}
              onChange={(event) => {
                setPayments(event.target.value);
                setReviewed(false);
              }}
            />
          </Field>
        </Panel>
      </div>
      <Panel title={t("ui.difference")}>
        <div className={css.row}>
          <strong className={css.amountHero}>
            {money(Number.isFinite(charge - paid) ? charge - paid : 0)}
          </strong>
          <Badge tone={ready ? "green" : "amber"}>
            {t(ready ? "ui.reconciled" : "ui.pending")}
          </Badge>
        </div>
        <label className={css.check}>
          <input
            type="checkbox"
            checked={!prior}
            onChange={(event) => {
              setPrior(!event.target.checked);
              setReviewed(false);
            }}
          />
          {t("ui.inspectPrior")}
        </label>
        {prior && <Notice error>{t("ui.priorOpen")}</Notice>}
        <Button primary disabled={!ready} onClick={() => setReviewed(true)}>
          <Check size={14} aria-hidden="true" />
          {t("ui.close")}
        </Button>
        {reviewed && <Notice>{t("ui.notLedger")}</Notice>}
      </Panel>
    </div>
  );
}
function Settlement() {
  const { t, money } = useHospital();
  const [selected, setSelected] = useState(0);
  const [amount, setAmount] = useState("");
  const [balances, setBalances] = useState([26430, 23590, 28500]);
  const [message, setMessage] = useState<
    "invalidAmount" | "noSettlement" | null
  >(null);
  const apply = () => {
    const value = Number(amount);
    if (
      !amount ||
      !Number.isFinite(value) ||
      value <= 0 ||
      value > balances[selected]
    )
      setMessage("invalidAmount");
    else {
      setBalances(
        balances.map((balance, index) =>
          index === selected
            ? Math.round((balance - value) * 100) / 100
            : balance,
        ),
      );
      setMessage("noSettlement");
      setAmount("");
    }
  };
  return (
    <div className={css.twoCol}>
      <Panel title={t("ui.owed")}>
        <div className={css.tokenList}>
          {balances.map((balance, index) => (
            <button
              key={index}
              type="button"
              className={css.selectCard}
              aria-pressed={selected === index}
              onClick={() => {
                setSelected(index);
                setMessage(null);
                setAmount("");
              }}
            >
              <strong>DEMO-DR0{index + 1}</strong>
              <span>{money(balance)}</span>
              <Badge tone="neutral">
                {t(index === 2 ? "ui.visiting" : "ui.employed")}
              </Badge>
            </button>
          ))}
        </div>
      </Panel>
      <Panel title={t("ui.allocation")}>
        <p className={css.small}>DEMO-DR0{selected + 1}</p>
        <p className={css.amountHero}>{money(balances[selected])}</p>
        <Field label={t("ui.allocation")}>
          <input
            type="number"
            min="0.01"
            step="0.01"
            max={balances[selected]}
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />
        </Field>
        <div className={css.statusLine}>
          <Button primary onClick={apply}>
            {t("ui.settle")}
          </Button>
        </div>
        {message && (
          <Notice error={message === "invalidAmount"}>
            {t(`ui.${message}`)}
          </Notice>
        )}
      </Panel>
    </div>
  );
}
function Payers() {
  const { t, money, number } = useHospital();
  const [total, setTotal] = useState("2000");
  const [coverage, setCoverage] = useState("60");
  const [tab, setTab] = useState("coverage");
  const split =
    total && coverage ? splitCoverage(Number(total), Number(coverage)) : null;
  const [checks, setChecks] = useState<string[]>([]);
  return (
    <>
      <Tabs
        values={["coverage", "authorisation", "claim"]}
        value={tab}
        onChange={setTab}
      />
      {tab === "coverage" ? (
        <div className={css.equalCols}>
          <Panel title={t("ui.coverage")}>
            <div className={css.stack}>
              <Field label={t("ui.total")}>
                <input
                  type="number"
                  min="0"
                  max="10000000"
                  value={total}
                  onChange={(event) => setTotal(event.target.value)}
                />
              </Field>
              <Field label={t("ui.coverage")}>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={coverage}
                  onChange={(event) => setCoverage(event.target.value)}
                />
                <output>{number(Number(coverage))}%</output>
              </Field>
            </div>
          </Panel>
          <Panel title={t("ui.review")}>
            <dl className={css.metricsThree}>
              <Metric
                label={t("ui.payerShare")}
                value={split ? money(split.payer) : "—"}
              />
              <Metric
                label={t("ui.patientShare")}
                value={split ? money(split.patient) : "—"}
              />
            </dl>
          </Panel>
        </div>
      ) : (
        <Panel title={t(`ui.${tab}`)}>
          {["verifiedIdentity", "documentation", "reviewer"].map((key) => (
            <label className={css.check} key={key}>
              <input
                type="checkbox"
                checked={checks.includes(`${tab}-${key}`)}
                onChange={() => {
                  const id = `${tab}-${key}`;
                  setChecks(
                    checks.includes(id)
                      ? checks.filter((value) => value !== id)
                      : [...checks, id],
                  );
                }}
              />
              {t(`ui.${key}`)}
            </label>
          ))}
          <Badge>
            {number(checks.filter((key) => key.startsWith(tab)).length)} /{" "}
            {number(3)}
          </Badge>
        </Panel>
      )}
      <Notice>{t("ui.noClaim")}</Notice>
    </>
  );
}
export default function FinanceWorkspace({
  kind,
}: {
  kind: "billing" | "close" | "settlement" | "payers";
}) {
  const [epoch, setEpoch] = useState(0);
  return (
    <Workspace kind={kind} reset={() => setEpoch(epoch + 1)}>
      {kind === "billing" ? (
        <Billing key={epoch} />
      ) : kind === "close" ? (
        <DayClose key={epoch} />
      ) : kind === "settlement" ? (
        <Settlement key={epoch} />
      ) : (
        <Payers key={epoch} />
      )}
    </Workspace>
  );
}
