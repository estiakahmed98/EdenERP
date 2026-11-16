"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  useId,
  type ButtonHTMLAttributes,
  type ReactElement,
  type ReactNode,
} from "react";
import { useFormatter, useLocale, useTranslations } from "next-intl";
import { ArrowUpRight, RotateCcw, ShieldCheck } from "lucide-react";
import { Link } from "@/i18n/navigation";
import {
  hospitalHref,
  hospitalPages,
  type HospitalSlug,
  type HospitalWorkspace,
} from "./registry";
import css from "./hospital.module.css";

export { css };
export function LoadingWorkspace() {
  const t = useTranslations("pages.hospitalApp");
  return (
    <div className={css.panel} role="status" aria-live="polite">
      <p className={css.localNote}>{t("ui.loading")}</p>
      <div className={css.progress} aria-hidden="true">
        <span style={{ width: "35%" }} />
      </div>
    </div>
  );
}
export function useHospital() {
  const t = useTranslations("pages.hospitalApp");
  const locale = useLocale();
  const format = useFormatter();
  return {
    t,
    locale,
    number: (value: number) =>
      format.number(value, { maximumFractionDigits: 1 }),
    money: (value: number) =>
      new Intl.NumberFormat(
        locale === "bn" ? "bn-BD" : locale === "en" ? "en-IN" : locale,
        {
          style: "currency",
          currency: "BDT",
          currencyDisplay: "narrowSymbol",
          maximumFractionDigits: 2,
        },
      ).format(value),
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
export function Badge({
  children,
  tone = "blue",
}: {
  children: ReactNode;
  tone?: "blue" | "green" | "amber" | "red" | "neutral";
}) {
  return <span className={`${css.badge} ${css[tone]}`}>{children}</span>;
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
export function Metric({
  label,
  value,
  detail,
}: {
  label: string;
  value: ReactNode;
  detail?: ReactNode;
}) {
  return (
    <div className={css.metric}>
      <dt>{label}</dt>
      <dd>{value}</dd>
      {detail && <dd className={css.metricDetail}>{detail}</dd>}
    </div>
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
      {Children.map(children, (child) =>
        isValidElement(child) &&
        typeof child.type === "string" &&
        ["input", "select", "textarea"].includes(child.type)
          ? cloneElement(child as ReactElement<{ id?: string }>, { id })
          : child,
      )}
    </div>
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
  onChange: (value: string) => void;
  label?: string;
}) {
  const { t } = useHospital();
  return (
    <div
      className={css.tabs}
      role="group"
      aria-label={label ?? t("ui.worklist")}
    >
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
export function Empty() {
  const { t } = useHospital();
  return <p className={css.empty}>{t("ui.empty")}</p>;
}
export function DataTable({
  title,
  headers,
  children,
}: {
  title: string;
  headers: string[];
  children: ReactNode;
}) {
  return (
    <div
      className={css.tableScroll}
      tabIndex={0}
      role="region"
      aria-label={title}
    >
      <table>
        <caption className={css.srOnly}>{title}</caption>
        <thead>
          <tr>
            {headers.map((label) => (
              <th scope="col" key={label}>
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}
export function Workspace({
  children,
  reset,
  source = false,
  kind,
}: {
  children: ReactNode;
  reset: () => void;
  source?: boolean;
  kind?: HospitalWorkspace;
}) {
  const { t } = useHospital();
  const page = hospitalPages.find((entry) => entry.workspace === kind);
  return (
    <section
      id="hospital-workspace"
      className={css.workspace}
      aria-labelledby="workspace-title"
      data-hospital-workspace
    >
      <header className={css.workspaceHead}>
        <div>
          <p className={css.eyebrow}>{t("ui.workspace")}</p>
          <h2 id="workspace-title">
            {page
              ? t(`pages.${page.slug}.title`)
              : t(source ? "ui.suppliedSummary" : "ui.preview")}
          </h2>
        </div>
        <Button onClick={reset}>
          <RotateCcw size={14} aria-hidden="true" />
          {t("ui.reset")}
        </Button>
      </header>
      <div className={css.provenance}>
        <ShieldCheck size={14} aria-hidden="true" />
        <span>{t(source ? "ui.source" : "ui.illustrative")}</span>
      </div>
      <p className={css.localNote}>{t("ui.localOnly")}</p>
      {children}
    </section>
  );
}
export function NextLink({ slug }: { slug: HospitalSlug }) {
  const { t } = useHospital();
  return (
    <Link className={css.nextLink} href={hospitalHref(slug)}>
      <span>{t("ui.next")}</span>
      <strong>
        {t(`pages.${slug}.title`)}
        <ArrowUpRight size={18} aria-hidden="true" />
      </strong>
    </Link>
  );
}
