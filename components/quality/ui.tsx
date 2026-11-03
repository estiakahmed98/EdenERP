import type { ButtonHTMLAttributes, ReactNode } from "react";
import {
  ArrowRight,
  Building2,
  CheckCheck,
  FlaskConical,
  ShieldCheck,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { ManufacturingDemoButton } from "@/components/manufacturing/design-system";
import DemoPreview from "@/components/manufacturing/demo-preview";
import {
  qualityCompany,
  qualityPages,
  qualitySlugs,
  type QualitySlug,
} from "./data";
import css from "./quality.module.css";

export const DemoButton = ManufacturingDemoButton;
export { css };
export function Button({
  children,
  className,
  variant = "subtle",
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "subtle";
}) {
  return (
    <button
      {...props}
      type={type}
      className={cn(
        css.button,
        variant === "primary" && css.primaryButton,
        className,
      )}
    >
      {children}
    </button>
  );
}
export function Provenance({
  kind = "supplied",
  children,
}: {
  kind?: "supplied" | "demo" | "local";
  children?: ReactNode;
}) {
  const Icon = kind === "supplied" ? ShieldCheck : FlaskConical;
  return (
    <span
      className={cn(css.provenance, kind !== "supplied" && css.demoProvenance)}
      data-provenance={kind}
    >
      <Icon size={12} aria-hidden="true" />
      {children ??
        (kind === "supplied"
          ? "Supplied snapshot"
          : kind === "local"
            ? "Local input · not saved"
            : "Illustrative demo")}
    </span>
  );
}
export function Tag({
  children,
  tone = "blue",
}: {
  children: ReactNode;
  tone?: "blue" | "amber" | "red" | "green" | "neutral";
}) {
  return <span className={cn(css.tag, css[`tone${tone}`])}>{children}</span>;
}
export function Metric({
  label,
  value,
  detail,
  tone = "neutral",
}: {
  label: string;
  value: ReactNode;
  detail?: string;
  tone?: "neutral" | "blue" | "red" | "amber" | "green";
}) {
  return (
    <div className={css.metric}>
      <dt>{label}</dt>
      <dd className={css[`metric${tone}`]}>{value}</dd>
      {detail && <dd className={css.metricDetail}>{detail}</dd>}
    </div>
  );
}
export function Workspace({
  title,
  description,
  children,
  actions,
  provenance = "supplied",
}: {
  title: string;
  description: string;
  children: ReactNode;
  actions?: ReactNode;
  provenance?: "supplied" | "demo" | "local";
}) {
  return (
    <section
      id="qms-workspace"
      className={css.workspaceSection}
      aria-label={`${title} interactive workspace`}
    >
      <div className={css.wrap}>
        <div className={css.sectionHeading}>
          <div>
            <span className={css.eyebrow}>Explore the workspace</span>
            <h2 className="showcase-heading">{title}</h2>
            <p>{description}</p>
          </div>
          <Provenance kind={provenance} />
        </div>
        <DemoPreview title={title}>
          <div className={css.workspace}>
            <header className={css.workspaceBar}>
              <div>
                <strong>
                  Adon<span>ERP</span>
                </strong>
                <span>/ Quality</span>
                <span className={css.company}>
                  <Building2 size={13} aria-hidden="true" />
                  {qualityCompany}
                </span>
              </div>
              {actions && <div className={css.workspaceActions}>{actions}</div>}
            </header>
            {children}
          </div>
        </DemoPreview>
      </div>
    </section>
  );
}
export function Panel({
  title,
  children,
  action,
  className,
}: {
  title: string;
  children: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn(css.panel, className)}>
      <div className={css.panelHeading}>
        <h3>{title}</h3>
        {action}
      </div>
      {children}
    </section>
  );
}
export function SearchField({
  value,
  onChange,
  label,
}: {
  value: string;
  onChange: (value: string) => void;
  label: string;
}) {
  return (
    <input
      type="search"
      aria-label={label}
      placeholder={label}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className={css.search}
    />
  );
}
export function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className={css.field}>
      <span>{label}</span>
      {children}
    </label>
  );
}
export function Empty({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className={css.empty}>
      <ShieldCheck size={24} aria-hidden="true" />
      <h4>{title}</h4>
      <p>{children}</p>
    </div>
  );
}
export function QualityFlow({ slug }: { slug: QualitySlug }) {
  const page = qualityPages[slug];
  return (
    <section className={css.flowSection}>
      <div className={css.wrap}>
        <div className={css.sectionHeading}>
          <div>
            <span className={css.eyebrow}>A workflow with a clear purpose</span>
            <h2 className="showcase-heading">
              Keep the evidence moving forward.
            </h2>
          </div>
          <CheckCheck size={28} className={css.flowIcon} aria-hidden="true" />
        </div>
        <ol className={css.flowCards}>
          {page.steps.map(([title, description], index) => (
            <li key={title}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{description}</p>
              {index < 3 && (
                <ArrowRight
                  size={15}
                  className={css.flowArrow}
                  aria-hidden="true"
                />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
export function QualityConnections({ slug }: { slug: QualitySlug }) {
  return (
    <section className={css.connections}>
      <div className={css.wrap}>
        <div className={css.sectionHeading}>
          <div>
            <span className={css.eyebrow}>One quality system</span>
            <h2 className="showcase-heading">
              Follow the next part of the story.
            </h2>
          </div>
        </div>
        <div className={css.connectionGrid}>
          {qualitySlugs
            .filter((item) => item !== slug)
            .map((item) => (
              <Link key={item} href={`/apps/quality/${item}`}>
                <h3>
                  {qualityPages[item].title}
                  <ArrowRight size={15} aria-hidden="true" />
                </h3>
                <p>{qualityPages[item].description}</p>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
export function QualityClosing() {
  return (
    <section className={css.closing}>
      <div className={css.wrap}>
        <div>
          <span className={css.eyebrow}>
            Make the full quality journey visible
          </span>
          <h2 className="showcase-heading">
            Bring your process to the conversation.
          </h2>
          <p>
            Explore the complete workflow with a guided product walkthrough.
          </p>
        </div>
        <DemoButton />
      </div>
    </section>
  );
}
