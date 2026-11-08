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
      {children ?? t("apparel.ui.illustrativePreview")}
    </span>
  );
}
export function Actions() {
  const t = useTranslations("pages.industriesApp");
  return (
    <div className={css.actions}>
      <LiveDemoButton />
      <a href="#industry-demo">
        {t("apparel.ui.exploreTheExample")}{" "}<ArrowDown size={15} aria-hidden="true" />
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
export function GarmentDrawing() {
  return (
    <svg
      viewBox="0 0 240 250"
      className={css.garmentDrawing}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m82 28-44 27-25 76 30 12 26-48v121h102V95l26 48 30-12-25-76-44-27-38 15-38-15Z"
        fill="var(--industry-wash)"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="m82 28 18 38 20-23 20 23 18-38M120 46v170M70 110h100M70 186h100M80 82h26v29H80zm54 0h26v29h-26z"
        stroke="currentColor"
        strokeOpacity=".65"
      />
      <path
        d="m42 65-20 62m176-62 20 62M79 206h30m23 0h29"
        stroke="currentColor"
        strokeOpacity=".4"
        strokeDasharray="3 4"
      />
      <path
        d="M55 232h130m-130-4v8m130-8v8M7 155v58m-4-58h8m-8 58h8"
        stroke="currentColor"
        strokeOpacity=".3"
      />
      <circle cx="125" cy="126" r="2" fill="currentColor" />
      <circle cx="125" cy="165" r="2" fill="currentColor" />
    </svg>
  );
}
export function TrimDrawing({
  kind,
}: {
  kind: "button" | "zip" | "label" | "tag";
}) {
  return (
    <svg
      viewBox="0 0 130 140"
      className={css.trimDrawing}
      fill="none"
      aria-hidden="true"
    >
      {kind === "button" ? (
        <>
          <circle
            cx="65"
            cy="69"
            r="42"
            fill="var(--industry-wash)"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <circle
            cx="65"
            cy="69"
            r="33"
            stroke="currentColor"
            strokeOpacity=".45"
          />
          {[
            [56, 60],
            [74, 60],
            [56, 78],
            [74, 78],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="4" stroke="currentColor" />
          ))}
          <path
            d="m56 60 18 18m0-18L56 78"
            stroke="currentColor"
            strokeOpacity=".4"
          />
        </>
      ) : kind === "zip" ? (
        <>
          <path
            d="M48 18h34v105H48z"
            fill="var(--industry-wash)"
            stroke="currentColor"
            strokeOpacity=".4"
          />
          <path d="M65 23v96" stroke="currentColor" />
          {Array.from({ length: 12 }, (_, i) => (
            <path
              key={i}
              d={`M55 ${28 + i * 7}h20`}
              stroke="currentColor"
              strokeWidth="3"
            />
          ))}
          <rect
            x="55"
            y="32"
            width="20"
            height="29"
            rx="4"
            fill="var(--card)"
            stroke="currentColor"
          />
          <rect
            x="61"
            y="42"
            width="8"
            height="21"
            rx="3"
            fill="var(--industry-wash)"
            stroke="currentColor"
          />
        </>
      ) : kind === "label" ? (
        <>
          <path
            d="M18 42h94v57H18z"
            fill="var(--industry-wash)"
            stroke="currentColor"
          />
          <path
            d="M26 48v45m78-45v45"
            stroke="currentColor"
            strokeOpacity=".5"
            strokeDasharray="3 3"
          />
          <path
            d="M42 60h46m-37 12h28m-23 11h18"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </>
      ) : (
        <>
          <path
            d="m34 29 43-9 27 26-2 70-65 4-3-91Z"
            fill="var(--industry-wash)"
            stroke="currentColor"
          />
          <circle cx="72" cy="39" r="5" stroke="currentColor" />
          <path
            d="M72 34c-21-21-36-12-39 2m16 38h40m-40 8h31m-31 13h37"
            stroke="currentColor"
            strokeOpacity=".65"
          />
        </>
      )}
    </svg>
  );
}
