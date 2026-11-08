import type { ReactNode } from "react";
import { ArrowDown, FlaskConical, Info } from "lucide-react";
import LiveDemoButton from "@/components/live-demo-button";
import css from "./industry.module.css";
import { useTranslations } from "next-intl";
export { css };
export function Badge({ children }: { children?: ReactNode }) {
  const t = useTranslations("pages.industriesApp");
  return (
    <span className={css.badge}>
      <FlaskConical size={12} aria-hidden="true" />
      {children ?? t("manufacturing.ui.illustrativePreview")}
    </span>
  );
}
export function Actions() {
  const t = useTranslations("pages.industriesApp");
  return (
    <div className={css.actions}>
      <LiveDemoButton />
      <a href="#industry-workspace">
        {t("manufacturing.ui.exploreTheExample")}{" "}<ArrowDown size={15} aria-hidden="true" />
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
export function CoilDrawing() {
  return (
    <svg
      viewBox="0 0 650 270"
      fill="none"
      className={css.coilDrawing}
      aria-hidden="true"
    >
      <path d="M25 233h600" stroke="currentColor" strokeOpacity=".25" />
      <path
        d="M147 138h418v34H147z"
        fill="var(--industry-wash)"
        stroke="currentColor"
        strokeOpacity=".6"
      />
      <path
        d="M151 146h415m-415 10h415m-415 9h415"
        stroke="currentColor"
        strokeOpacity=".25"
      />
      <ellipse
        cx="116"
        cy="132"
        rx="79"
        ry="86"
        fill="var(--card)"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <ellipse
        cx="116"
        cy="132"
        rx="65"
        ry="72"
        stroke="currentColor"
        strokeOpacity=".6"
      />
      <ellipse
        cx="116"
        cy="132"
        rx="51"
        ry="58"
        stroke="currentColor"
        strokeOpacity=".45"
      />
      <ellipse
        cx="116"
        cy="132"
        rx="37"
        ry="44"
        stroke="currentColor"
        strokeOpacity=".6"
      />
      <ellipse
        cx="116"
        cy="132"
        rx="23"
        ry="29"
        fill="var(--industry-wash)"
        stroke="currentColor"
      />
      <path d="M79 211v22h77v-22" stroke="currentColor" strokeOpacity=".5" />
      {[260, 355, 450].map((x, i) => (
        <g key={x}>
          <path
            d={`M${x - 28} 80h56v128h-56z`}
            fill="var(--card)"
            stroke="currentColor"
            strokeOpacity=".5"
          />
          <ellipse
            cx={x}
            cy="123"
            rx="24"
            ry="13"
            fill="var(--industry-wash)"
            stroke="currentColor"
          />
          <ellipse
            cx={x}
            cy="180"
            rx="24"
            ry="13"
            fill="var(--industry-wash)"
            stroke="currentColor"
          />
          <path
            d={`M${x - 37} 208h74v25h-74z`}
            fill="var(--industry-wash)"
            stroke="currentColor"
            strokeOpacity=".5"
          />
          <path
            d={`M${x} 80V${i === 1 ? 42 : 57}`}
            stroke="currentColor"
            strokeOpacity=".4"
            strokeDasharray="3 4"
          />
        </g>
      ))}
      <path
        d="M543 181h73v9h-73zm-7 11h73v9h-73zm-7 11h73v9h-73z"
        fill="var(--industry-wash)"
        stroke="currentColor"
        strokeOpacity=".7"
      />
      <path
        className={css.materialFlow}
        d="M210 52h295m-10-5 10 5-10 5"
        stroke="currentColor"
        strokeDasharray="4 5"
      />
      <path d="M204 245h303" stroke="currentColor" strokeOpacity=".25" />
    </svg>
  );
}
export function PaddyDrawing() {
  return (
    <svg
      className={css.paddyDrawing}
      viewBox="0 0 200 240"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M70 227c12-65 33-130 45-194m-5 191c0-64 23-132 35-175M70 217c-22-22-35-44-39-71 27 16 41 37 47 55m28-13c24-16 40-34 48-59-26 11-39 25-46 41"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {[
        { x: 110, y: 46, r: -35 },
        { x: 130, y: 61, r: 35 },
        { x: 101, y: 76, r: -35 },
        { x: 120, y: 92, r: 35 },
        { x: 92, y: 109, r: -35 },
        { x: 111, y: 124, r: 35 },
        { x: 148, y: 65, r: 30 },
        { x: 138, y: 92, r: -30 },
        { x: 147, y: 119, r: 30 },
        { x: 126, y: 140, r: -30 },
      ].map((grain, i) => (
        <ellipse
          key={i}
          cx={grain.x}
          cy={grain.y}
          rx="7"
          ry="16"
          transform={`rotate(${grain.r} ${grain.x} ${grain.y})`}
          fill="var(--grain-fill)"
          stroke="currentColor"
          strokeWidth="1.2"
        />
      ))}
      <path d="M51 232h79" stroke="currentColor" strokeOpacity=".3" />
    </svg>
  );
}
