import type { ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowDown, ArrowRight, FlaskConical, ScanLine } from "lucide-react";
import LiveDemoButton from "@/components/live-demo-button";
import { cn } from "@/lib/utils";
import css from "./pos.module.css";
import { useTranslations } from "next-intl";
export { css };

export function Badge({
  children,
  demo = false,
}: {
  children?: ReactNode;
  demo?: boolean;
}) {
  const t = useTranslations("pages.posApp");
  return (
    <span className={cn(css.badge, demo && css.demoBadge)}>
      <FlaskConical size={12} aria-hidden="true" />
      {children ??
        (demo ? t("ui.illustrativeLocalOnly") : t("ui.suppliedScreenshotSnapshot"))}
    </span>
  );
}
export function Button({
  className,
  children,
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type={type} className={cn(css.button, className)} {...props}>
      {children}
    </button>
  );
}
export function HeroActions() {
  const t = useTranslations("pages.posApp");
  return (
    <div className={css.heroActions}>
      <LiveDemoButton />
      <a href="#pos-workspace" className={css.textLink}>
        {t("ui.exploreTheWorkspace")}{" "}<ArrowDown size={15} aria-hidden="true" />
      </a>
    </div>
  );
}
export function Tag({
  children,
  positive = false,
}: {
  children: ReactNode;
  positive?: boolean;
}) {
  return (
    <span className={cn(css.tag, positive && css.positiveTag)}>{children}</span>
  );
}
export function Stat({
  label,
  value,
  detail,
}: {
  label: string;
  value: ReactNode;
  detail?: string;
}) {
  return (
    <div className={css.stat}>
      <dt>{label}</dt>
      <dd>{value}</dd>
      {detail && <dd className={css.statDetail}>{detail}</dd>}
    </div>
  );
}
export function Panel({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn(css.panel, className)}>
      <h3>{title}</h3>
      {children}
    </section>
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
export function Barcode() {
  return <div className={css.barcode} aria-hidden="true" />;
}
export function Denim({ top = false }: { top?: boolean }) {
  return (
    <svg
      viewBox="0 0 120 130"
      fill="none"
      aria-hidden="true"
      className={css.denim}
    >
      {top ? (
        <>
          <path
            d="m39 17-28 20 14 24 13-7v58h45V54l13 7 14-24-28-20c-6 12-37 12-43 0Z"
            fill="currentColor"
          />
          <path
            d="M40 18c4 23 37 23 42 0M39 58v48m44-48v48"
            stroke="white"
            strokeOpacity=".55"
            strokeDasharray="3 3"
          />
        </>
      ) : (
        <>
          <path d="M30 12h60l5 106H68L60 54l-8 64H25Z" fill="currentColor" />
          <path
            d="M30 26h60M60 13v35M32 31c1 13 15 15 18 1m38-1c-1 13-15 15-18 1M43 49l-5 63m39-63 5 63"
            stroke="white"
            strokeOpacity=".6"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
          <path d="M57 16h6" stroke="white" strokeWidth="3" />
        </>
      )}
    </svg>
  );
}
export function ReceiptPaper({ compact = false }: { compact?: boolean }) {
  const t = useTranslations("pages.posApp");
  return (
    <div className={cn(css.receiptPaper, compact && css.compactReceipt)}>
      <span className={css.receiptBrand}>{t("ui.denimHouse")}</span>
      <span className={css.receiptSubtitle}>{t("ui.illustrativeReceipt")}</span>
      <div className={css.paperRule} />
      <div className={css.paperLine}>
        <span>{t("ui.athleticFitJean")}</span>
        <b>3,450.00</b>
      </div>
      <div className={css.paperLine}>
        <span>{t("ui.quantity")}</span>
        <span>1</span>
      </div>
      <div className={css.paperRule} />
      <div className={css.paperLine}>
        <span>{t("ui.includesVat")}</span>
        <span>450.00</span>
      </div>
      <div className={css.paperLine}>
        <strong>{t("ui.totalBdt")}</strong>
        <strong>3,450.00</strong>
      </div>
      <Barcode />
      <span className={css.receiptSubtitle}>{t("ui.exampleFromSuppliedSummary")}</span>
    </div>
  );
}
export function Note({ children }: { children: ReactNode }) {
  return (
    <p className={css.note}>
      <ScanLine size={15} aria-hidden="true" />
      {children}
    </p>
  );
}
export function Arrow({ className }: { className?: string }) {
  return (
    <svg
      className={cn(css.sketchArrow, className)}
      viewBox="0 0 130 65"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 8c27 50 78 50 113 17m-22 2 24-5-4 22"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function Forward() {
  return <ArrowRight size={16} aria-hidden="true" />;
}
