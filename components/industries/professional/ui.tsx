import type { ReactNode } from "react";
import { ArrowDown, FlaskConical, Info } from "lucide-react";
import LiveDemoButton from "@/components/live-demo-button";
import css from "./professional.module.css";
export { css };
export function Badge({ children }: { children?: ReactNode }) {
  return (
    <span className={css.badge}>
      <FlaskConical size={12} aria-hidden="true" />
      {children ?? "Illustrative example"}
    </span>
  );
}
export function Actions() {
  return (
    <div className={css.actions}>
      <LiveDemoButton />
      <a href="#professional-workspace">
        Explore the example
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
      <svg viewBox="0 0 105 44" fill="none" aria-hidden="true">
        <path
          d="M4 6c15 35 61 38 92 13m-20 3 22-6-6 21"
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
export function BuildingArt() {
  return (
    <svg
      viewBox="0 0 380 285"
      fill="none"
      aria-hidden="true"
      className={css.buildingArt}
    >
      <path
        d="m32 216 158-83 158 83-158 57L32 216Z"
        fill="var(--p-wash)"
        stroke="currentColor"
        strokeOpacity=".3"
      />
      {[
        { x: 65, y: 125, w: 74, h: 100 },
        { x: 148, y: 52, w: 88, h: 178 },
        { x: 245, y: 105, w: 62, h: 113 },
      ].map(({ x, y, w, h }, i) => (
        <g key={i}>
          <path
            d={`m${x} ${y} ${w / 2}-20 ${w / 2} 20v${h}l-${w / 2} 20-${w / 2}-20V${y}Z`}
            fill="var(--card)"
            stroke="currentColor"
          />
          <path
            d={`m${x} ${y} ${w / 2} 20 ${w / 2}-20m-${w / 2} 20v${h}`}
            stroke="currentColor"
            strokeOpacity=".5"
          />
          {Array.from({ length: i === 1 ? 6 : 3 }, (_, j) => (
            <path
              key={j}
              d={`m${x + 10} ${y + 29 + j * 22} 17 8m${x + w - 27} ${y + 37 + j * 22} 17-8`}
              stroke="currentColor"
              strokeOpacity=".45"
              strokeWidth="4"
            />
          ))}
        </g>
      ))}
      <path
        d="m23 237 164 55m13-1 163-65"
        stroke="currentColor"
        strokeOpacity=".25"
        strokeDasharray="3 4"
      />
    </svg>
  );
}
export function PlanArt() {
  return (
    <svg
      viewBox="0 0 440 280"
      fill="none"
      aria-hidden="true"
      className={css.planArt}
    >
      <path
        d="M50 40h340v200H50z"
        fill="var(--card)"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path
        d="M230 40v110H50m110 0v90m70-90h160M65 50h150v85H65z"
        stroke="currentColor"
        strokeOpacity=".45"
      />
      <path
        d="M245 52h132v85H245zM174 166h200v61H174z"
        fill="var(--p-wash)"
        stroke="currentColor"
        strokeOpacity=".3"
      />
      <path
        d="M100 239v-40a40 40 0 0 1 40 40m90-160h-39a39 39 0 0 0 39 39"
        stroke="currentColor"
        strokeOpacity=".4"
      />
      <path
        d="M50 18h340m-340-7v14m340-14v14M26 40v200m-7-200h14m-14 200h14"
        stroke="currentColor"
        strokeOpacity=".35"
      />
      <circle
        cx="304"
        cy="94"
        r="25"
        stroke="currentColor"
        strokeOpacity=".4"
      />
      <path
        d="M70 82h100m-100 25h100m70 60v48m20-48v48m20-48v48m20-48v48m20-48v48m20-48v48"
        stroke="currentColor"
        strokeOpacity=".35"
      />
    </svg>
  );
}
export function CraneArt() {
  return (
    <svg
      viewBox="0 0 480 270"
      fill="none"
      aria-hidden="true"
      className={css.craneArt}
    >
      <path
        d="M35 244h420M100 244V55h27v189M47 55h295v20H47zM108 55l53-35 137 35m-137-35v35"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M100 85l27 25-27 25 27 25-27 25 27 25-27 25m201-160v66m-7-7c0 15 15 15 15 0"
        stroke="currentColor"
        strokeOpacity=".5"
      />
      <path
        d="M200 145h195v99H200z"
        fill="var(--p-wash)"
        stroke="currentColor"
      />
      <path
        d="M195 177h205m-205 33h205m-161-65v99m52-99v99m52-99v99"
        stroke="currentColor"
        strokeOpacity=".45"
      />
      <path
        d="M363 143v-35h53v136"
        stroke="currentColor"
        strokeOpacity=".4"
        strokeDasharray="4 4"
      />
      <path d="M38 259h391" stroke="currentColor" strokeOpacity=".3" />
    </svg>
  );
}
export function EvidenceArt() {
  return (
    <svg
      viewBox="0 0 190 220"
      fill="none"
      aria-hidden="true"
      className={css.evidenceArt}
    >
      <path
        d="M33 18h88l35 35v145H33V18Z"
        fill="var(--card)"
        stroke="currentColor"
      />
      <path
        d="M121 18v35h35M50 77h87M50 92h66"
        stroke="currentColor"
        strokeOpacity=".4"
      />
      {[117, 143, 169].map((y, i) => (
        <g key={y}>
          <rect
            x="51"
            y={y}
            width="12"
            height="12"
            rx="2"
            fill={i === 0 ? "var(--p-sage)" : "none"}
            stroke="currentColor"
            strokeOpacity=".5"
          />
          <path
            d={`M76 ${y + 5}h57`}
            stroke="currentColor"
            strokeOpacity=".35"
          />
        </g>
      ))}
    </svg>
  );
}
export function RouteArt() {
  return (
    <svg
      viewBox="0 0 440 240"
      fill="none"
      aria-hidden="true"
      className={css.routeArt}
    >
      <path
        d="M45 178C62 49 147 24 212 126s145 83 185-85"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="5 6"
      />
      {[
        [45, 178],
        [212, 126],
        [397, 41],
      ].map(([x, y], i) => (
        <g key={i}>
          <circle
            cx={x}
            cy={y}
            r="20"
            fill="var(--card)"
            stroke="currentColor"
          />
          <circle cx={x} cy={y} r="5" fill="currentColor" />
          <circle
            cx={x}
            cy={y}
            r="30"
            stroke="currentColor"
            strokeOpacity=".15"
          />
        </g>
      ))}
      <path
        d="m121 58 15 1-6 7 3 12-6-2-4-8-8 1-2-5 8-6Z"
        fill="var(--p-wash)"
        stroke="currentColor"
      />
    </svg>
  );
}
export function AllocationRing({
  amounts,
  labels,
}: {
  amounts: number[];
  labels: string[];
}) {
  const total = amounts.reduce((a, b) => a + b, 0),
    circumference = 2 * Math.PI * 46;
  let offset = 0;
  return (
    <svg
      viewBox="0 0 120 120"
      className={css.allocationRing}
      role="img"
      aria-label={
        total > 0
          ? labels
              .map(
                (label, i) =>
                  `${label}: ${((amounts[i] / total) * 100).toFixed(1)}% of allocated amount`,
              )
              .join(", ")
          : "No example amount allocated"
      }
    >
      <circle
        cx="60"
        cy="60"
        r="46"
        fill="none"
        stroke="var(--border)"
        strokeWidth="13"
      />
      {amounts.map((amount, i) => {
        const length = total > 0 ? (amount / total) * circumference : 0,
          start = offset;
        offset += length;
        return (
          <circle
            key={labels[i]}
            cx="60"
            cy="60"
            r="46"
            fill="none"
            stroke={`var(--chart-${i + 1})`}
            strokeWidth="13"
            strokeDasharray={`${length} ${circumference - length}`}
            strokeDashoffset={-start}
            transform="rotate(-90 60 60)"
          />
        );
      })}
      <circle cx="60" cy="60" r="30" fill="var(--card)" />
    </svg>
  );
}
