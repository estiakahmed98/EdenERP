import type { ReactNode } from "react";
import { ArrowDown, FlaskConical, Info } from "lucide-react";
import LiveDemoButton from "@/components/live-demo-button";
import css from "./industry.module.css";
export { css };
export function Badge({ children }: { children?: ReactNode }) {
  return (
    <span className={css.badge}>
      <FlaskConical size={12} aria-hidden="true" />
      {children ?? "Illustrative preview"}
    </span>
  );
}
export function Actions() {
  return (
    <div className={css.actions}>
      <LiveDemoButton />
      <a href="#industry-demo">
        Explore the example <ArrowDown size={15} aria-hidden="true" />
      </a>
    </div>
  );
}
export function Note({ children }: { children: ReactNode }) {
  return (
    <p className={css.note}>
      <Info size={14} aria-hidden="true" />
      {children}
    </p>
  );
}
export function Metric({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className={css.metric}>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
export function Arrow() {
  return (
    <svg
      className={css.curvedArrow}
      viewBox="0 0 130 65"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 8c25 50 78 50 113 17m-22 2 24-5-4 22"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
