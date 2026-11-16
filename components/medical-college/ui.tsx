"use client";
import {
  Children,
  cloneElement,
  isValidElement,
  useId,
  type ReactNode,
  type ReactElement,
  type ButtonHTMLAttributes,
} from "react";
import { useLocale, useTranslations, useFormatter } from "next-intl";
import { RotateCcw, ShieldCheck } from "lucide-react";
import css from "./college.module.css";
export { css };
export function useCollege() {
  const t = useTranslations("pages.medicalCollegeApp"),
    locale = useLocale(),
    f = useFormatter();
  return {
    t,
    locale,
    number: (n: number) => f.number(n, { maximumFractionDigits: 1 }),
    money: (n: number) =>
      f.number(n, {
        style: "currency",
        currency: "BDT",
        currencyDisplay: "narrowSymbol",
      }),
    date: (s: string) =>
      f.dateTime(new Date(`${s}T12:00:00Z`), {
        month: "short",
        day: "numeric",
        timeZone: "UTC",
      }),
  };
}
export function Button({
  children,
  primary,
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { primary?: boolean }) {
  return (
    <button
      type="button"
      {...props}
      className={`${css.button} ${primary ? css.primary : ""} ${className}`}
    >
      {children}
    </button>
  );
}
export function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  const id = useId();
  return (
    <div className={css.field}>
      <label htmlFor={id}>{label}</label>
      {Children.map(children, (c) =>
        isValidElement(c) &&
        typeof c.type === "string" &&
        ["input", "select", "textarea"].includes(c.type)
          ? cloneElement(c as ReactElement<{ id?: string }>, { id })
          : c,
      )}
    </div>
  );
}
export function Panel({
  title,
  children,
  action,
  className = "",
}: {
  title?: ReactNode;
  children: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <section className={`${css.panel} ${className}`}>
      {title && (
        <header className={css.panelHead}>
          <h3>{title}</h3>
          {action}
        </header>
      )}
      {children}
    </section>
  );
}
export function Badge({
  children,
  tone = "blue",
}: {
  children: ReactNode;
  tone?: "blue" | "green" | "amber" | "red" | "neutral";
}) {
  return <span className={`${css.badge} ${css[tone]}`}>{children}</span>;
}
export function Notice({
  children,
  error = false,
}: {
  children: ReactNode;
  error?: boolean;
}) {
  return (
    <p
      className={`${css.notice} ${error ? css.error : ""}`}
      role={error ? "alert" : "status"}
    >
      {children}
    </p>
  );
}
export function Tabs({
  values,
  value,
  onChange,
  label,
}: {
  values: readonly string[];
  value: string;
  onChange: (s: string) => void;
  label?: string;
}) {
  const { t } = useCollege();
  return (
    <div className={css.tabs} role="group" aria-label={label ?? t("ui.view")}>
      {values.map((key) => (
        <Button
          key={key}
          aria-pressed={value === key}
          onClick={() => onChange(key)}
        >
          {t(`ui.${key}`)}
        </Button>
      ))}
    </div>
  );
}
export function Table({
  headers,
  children,
  label,
}: {
  headers: string[];
  children: ReactNode;
  label: string;
}) {
  return (
    <div
      className={css.tableWrap}
      role="region"
      aria-label={label}
      tabIndex={0}
    >
      <table>
        <thead>
          <tr>
            {headers.map((h) => (
              <th key={h} scope="col">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}
export function CheckField({
  label,
  checked,
  onChange,
  disabled = false,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <label className={css.check}>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span>{label}</span>
    </label>
  );
}
export function Ring({
  value,
  label,
}: {
  value: number | null;
  label: string;
}) {
  const { number } = useCollege();
  return (
    <div
      className={css.ring}
      role="img"
      aria-label={`${label}: ${value === null ? "—" : number(value) + "%"}`}
    >
      <svg viewBox="0 0 140 140" aria-hidden="true">
        <circle cx="70" cy="70" r="58" />
        <circle
          cx="70"
          cy="70"
          r="58"
          pathLength="100"
          strokeDasharray={`${value ?? 0} 100`}
          transform="rotate(-90 70 70)"
        />
        <text x="70" y="76" textAnchor="middle">
          {value === null ? "—" : number(value) + "%"}
        </text>
      </svg>
      <span>{label}</span>
    </div>
  );
}
export function Workspace({
  children,
  reset,
}: {
  children: ReactNode;
  reset: () => void;
}) {
  const { t } = useCollege();
  return (
    <section
      id="college-workspace"
      data-college-workspace
      className={css.workspace}
      aria-label={t("ui.workspace")}
    >
      <h2 className={css.srOnly}>{t("ui.workspace")}</h2>
      <header className={css.workspaceHead}>
        <span>
          <ShieldCheck size={15} aria-hidden="true" />
          {t("ui.localOnly")}
        </span>
        <Button onClick={reset}>
          <RotateCcw size={14} aria-hidden="true" />
          {t("ui.reset")}
        </Button>
      </header>
      {children}
    </section>
  );
}
export function LoadingWorkspace() {
  const { t } = useCollege();
  return (
    <div className={css.loading} role="status">
      {t("ui.loading")}
    </div>
  );
}
