import type { ReactNode } from "react";
import { ArrowDown, FlaskConical, Info } from "lucide-react";
import LiveDemoButton from "@/components/live-demo-button";
import css from "./hospitality.module.css";
import { useTranslations } from "next-intl";
export { css };
export function Badge({ children }: { children?: ReactNode }) {
  const t = useTranslations("pages.industriesApp");
  return (
    <span className={css.badge}>
      <FlaskConical size={12} aria-hidden="true" />
      {children ?? t("hospitality.ui.illustrativeExample")}
    </span>
  );
}
export function Actions() {
  const t = useTranslations("pages.industriesApp");
  return (
    <div className={css.actions}>
      <LiveDemoButton />
      <a href="#hospitality-workspace">
        {t("hospitality.ui.exploreTheExample")}
        <ArrowDown size={14} aria-hidden="true" />
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
export function HandNote({ children }: { children: ReactNode }) {
  return (
    <div className={css.handNote}>
      <svg viewBox="0 0 100 43" fill="none" aria-hidden="true">
        <path
          d="M4 7c10 32 59 38 88 12m-19 2 20-5-6 20"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span>{children}</span>
    </div>
  );
}
export function PlateArt() {
  return (
    <svg
      viewBox="0 0 250 250"
      fill="none"
      aria-hidden="true"
      className={css.plateArt}
    >
      <circle
        cx="125"
        cy="125"
        r="97"
        fill="var(--card)"
        stroke="currentColor"
        strokeOpacity=".45"
      />
      <circle
        cx="125"
        cy="125"
        r="80"
        stroke="currentColor"
        strokeOpacity=".3"
      />
      <circle cx="125" cy="125" r="63" fill="var(--h-wash)" />
      <path
        d="M17 71v35m-7-35v27c0 13 14 13 14 0V71m-7 36v72M235 71c-16 17-14 40-3 42v66m3-108v42"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M89 129c14-26 52-30 72-1-18 27-54 30-72 1Z"
        fill="var(--h-sage)"
        stroke="currentColor"
        strokeOpacity=".4"
      />
      <path
        d="m108 133 33-18m-21 11-1-12m12 6 11 8"
        stroke="currentColor"
        strokeOpacity=".5"
      />
    </svg>
  );
}
export function BurgerArt() {
  return (
    <svg
      viewBox="0 0 300 250"
      fill="none"
      aria-hidden="true"
      className={css.burgerArt}
    >
      <path
        d="M58 89c5-69 179-69 184 0H58Z"
        fill="var(--h-sand)"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="m92 57 7 4m32-19 5 5m33-5 6 4m28 13 6-4"
        stroke="currentColor"
        strokeOpacity=".5"
        strokeLinecap="round"
      />
      <path
        d="m54 106 28 8 24-10 31 9 28-11 24 11 31-10 26 9"
        stroke="var(--h-green)"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="55"
        y="128"
        width="190"
        height="24"
        rx="12"
        fill="var(--h-wash)"
        stroke="currentColor"
      />
      <path
        d="m64 163 51 3 27 17 28-17h67"
        fill="var(--h-sand)"
        stroke="currentColor"
      />
      <path
        d="M57 190h187c-6 39-177 39-187 0Z"
        fill="var(--h-sand)"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M35 235h230" stroke="currentColor" strokeOpacity=".25" />
    </svg>
  );
}
export function DoorArt() {
  return (
    <svg
      viewBox="0 0 250 280"
      fill="none"
      aria-hidden="true"
      className={css.doorArt}
    >
      <path
        d="M57 246V96c0-86 136-86 136 0v150H57Z"
        fill="var(--h-wash)"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M74 246V99c0-66 102-66 102 0v147H74Z"
        fill="var(--card)"
        stroke="currentColor"
        strokeOpacity=".45"
      />
      <path
        d="M90 94h70v91H90z"
        fill="var(--h-sage)"
        stroke="currentColor"
        strokeOpacity=".3"
      />
      <circle cx="160" cy="200" r="4" stroke="currentColor" />
      <path
        d="M36 247h178M22 258h206M30 222c-15-25-5-41 10-32-12-32 18-37 20-4m-21 43v-27"
        stroke="currentColor"
        strokeOpacity=".5"
      />
      <rect
        x="102"
        y="57"
        width="47"
        height="16"
        rx="4"
        stroke="currentColor"
        strokeOpacity=".5"
      />
    </svg>
  );
}
export function BottleArt() {
  return (
    <svg
      viewBox="0 0 300 230"
      fill="none"
      aria-hidden="true"
      className={css.bottleArt}
    >
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${i * 72} ${i === 1 ? -15 : 0})`}>
          <path
            d="M46 45h24v31c0 13 14 19 14 34v78H32v-78c0-15 14-21 14-34V45Z"
            fill={i === 1 ? "var(--h-sage)" : "var(--h-wash)"}
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <rect
            x="44"
            y="37"
            width="28"
            height="10"
            rx="3"
            fill="var(--card)"
            stroke="currentColor"
          />
          <rect
            x="39"
            y="117"
            width="38"
            height="42"
            rx="3"
            fill="var(--card)"
            stroke="currentColor"
            strokeOpacity=".4"
          />
          <path
            d="M47 130h22m-22 8h22m-22 8h12"
            stroke="currentColor"
            strokeOpacity=".4"
          />
        </g>
      ))}
      <path
        d="M17 197h237l-10 21H27l-10-21Z"
        fill="var(--h-sand)"
        stroke="currentColor"
        strokeOpacity=".4"
      />
    </svg>
  );
}
export function KeyArt() {
  return (
    <svg
      viewBox="0 0 170 120"
      fill="none"
      aria-hidden="true"
      className={css.keyArt}
    >
      <circle cx="48" cy="45" r="22" stroke="currentColor" strokeWidth="2" />
      <circle cx="48" cy="45" r="8" stroke="currentColor" />
      <path
        d="m64 61 57 39 10-13-11-8-5 7-9-6 6-8-38-25"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M54 21C48-4 4 10 23 34"
        stroke="currentColor"
        strokeOpacity=".4"
      />
    </svg>
  );
}
