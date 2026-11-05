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
export function ProductArt({ kind }: { kind: "notebook" | "mug" | "tote" }) {
  return (
    <svg
      viewBox="0 0 180 180"
      fill="none"
      className={css.productArt}
      aria-hidden="true"
    >
      {kind === "notebook" ? (
        <>
          <path
            d="M48 26h91v129H48z"
            fill="var(--product-fill)"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M58 27v128M121 27v127"
            stroke="currentColor"
            strokeOpacity=".5"
          />
          {[47, 67, 87, 107, 127].map((y) => (
            <path
              key={y}
              d={`M42 ${y}h15`}
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          ))}
          <path
            d="M76 62h32m-32 8h23"
            stroke="white"
            strokeWidth="2"
            strokeOpacity=".8"
          />
          <path
            d="m106 155 8-18 8 18"
            stroke="currentColor"
            strokeOpacity=".6"
          />
        </>
      ) : kind === "mug" ? (
        <>
          <path
            d="M48 56h77v70c0 23-77 23-77 0V56Z"
            fill="var(--product-fill)"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <ellipse
            cx="86.5"
            cy="56"
            rx="38.5"
            ry="10"
            fill="var(--card)"
            stroke="currentColor"
          />
          <path
            d="M125 70c39-5 37 49 0 49m2-39c20-3 18 27-1 28"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M63 72v49"
            stroke="white"
            strokeOpacity=".65"
            strokeLinecap="round"
            strokeWidth="3"
          />
          <path d="M64 149h47" stroke="currentColor" strokeOpacity=".3" />
        </>
      ) : (
        <>
          <path
            d="m43 65-6 91h108l-7-91H43Z"
            fill="var(--product-fill)"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M65 77V49c0-34 50-34 50 0v28"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M50 77 46 145h90l-6-68"
            stroke="currentColor"
            strokeOpacity=".5"
            strokeDasharray="3 4"
          />
          <path
            d="M70 107h41m-35 8h29"
            stroke="white"
            strokeOpacity=".8"
            strokeWidth="2"
          />
        </>
      )}
    </svg>
  );
}
