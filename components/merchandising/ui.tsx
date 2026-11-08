import type { ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowDown, FlaskConical, Info } from "lucide-react";
import LiveDemoButton from "@/components/live-demo-button";
import { cn } from "@/lib/utils";
import css from "./merchandising.module.css";
import { useTranslations } from "next-intl";
export { css };
export function Badge({
  children,
  local = false,
}: {
  children?: ReactNode;
  local?: boolean;
}) {
  const t = useTranslations("pages.merchandisingApp");
  return (
    <span className={cn(css.badge, local && css.localBadge)}>
      <FlaskConical size={12} aria-hidden="true" />
      {children ??
        (local ? t("ui.localExerciseNotSaved") : t("ui.suppliedScreenshotSnapshot"))}
    </span>
  );
}
export function Actions() {
  const t = useTranslations("pages.merchandisingApp");
  return (
    <div className={css.actions}>
      <LiveDemoButton />
      <a href="#merchandising-workspace">
        {t("ui.exploreTheWorkspace")}{" "}<ArrowDown size={15} aria-hidden="true" />
      </a>
    </div>
  );
}
export function Button({
  className,
  type = "button",
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type={type} className={cn(css.button, className)} {...props}>
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
  return (
    <label className={css.field}>
      <span>{label}</span>
      {children}
    </label>
  );
}
export function Panel({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className={css.panel}>
      <h3>{title}</h3>
      {children}
    </section>
  );
}
export function Tag({
  children,
  tone = "blue",
}: {
  children: ReactNode;
  tone?: "blue" | "green" | "red" | "amber" | "neutral";
}) {
  return (
    <span className={css.tag} data-tone={tone}>
      {children}
    </span>
  );
}
export function Metric({
  label,
  value,
  detail,
}: {
  label: string;
  value: ReactNode;
  detail?: string;
}) {
  return (
    <div className={css.metric}>
      <dt>{label}</dt>
      <dd>{value}</dd>
      {detail && <dd className={css.metricDetail}>{detail}</dd>}
    </div>
  );
}
export function Notice({ children }: { children: ReactNode }) {
  return (
    <p className={css.notice}>
      <Info size={14} aria-hidden="true" />
      {children}
    </p>
  );
}
export function Garment({ jacket = false }: { jacket?: boolean }) {
  return (
    <svg
      viewBox="0 0 180 200"
      fill="none"
      aria-hidden="true"
      className={css.garment}
    >
      {jacket ? (
        <>
          <path
            d="m58 22-27 16-23 77 22 8 21-48v101h78V75l21 48 22-8-23-77-27-16-32 9Z"
            fill="currentColor"
          />
          <path
            d="m58 22 17 25 15-16 15 16 17-25M90 33v142M51 78h78M51 135h78M67 50v23H54m59-23v23h13M65 101h16v21H65zm34 0h16v21H99z"
            stroke="white"
            strokeOpacity=".65"
            strokeWidth="1.5"
          />
          <path
            d="M58 35 35 114m88-79 22 79M61 166h20m19 0h20"
            stroke="white"
            strokeOpacity=".45"
            strokeDasharray="3 4"
          />
          <circle cx="94" cy="89" r="1.4" fill="white" />
          <circle cx="94" cy="136" r="1.4" fill="white" />
        </>
      ) : (
        <>
          <path d="M46 16h88l8 169h-40L90 78l-12 107H38Z" fill="currentColor" />
          <path
            d="M45 35h90M90 17v58M49 42c0 19 21 23 25 0m57 0c0 19-21 23-25 0M65 77l-8 100m58-100 8 100M47 175h30m27 0h30"
            stroke="white"
            strokeOpacity=".65"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <path d="M87 23h6" stroke="white" strokeWidth="3" />
        </>
      )}
    </svg>
  );
}
export function Curve() {
  return (
    <svg
      viewBox="0 0 130 65"
      className={css.curve}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 8c30 53 72 50 113 17m-22 2 24-5-4 22"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function Progress({
  value,
  total,
  label,
  green = false,
}: {
  value: number;
  total: number;
  label: string;
  green?: boolean;
}) {
  return (
    <div className={css.progress} data-green={green}>
      <div>
        <span>{label}</span>
        <b>
          {value.toLocaleString("en-US")} / {total.toLocaleString("en-US")}
        </b>
      </div>
      <div className={css.progressTrack}>
        <i
          style={{
            width: `${Math.max(0, Math.min(100, (value / total) * 100))}%`,
          }}
        />
      </div>
    </div>
  );
}
