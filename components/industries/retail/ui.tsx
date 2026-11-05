import type { ReactNode } from "react";
import { ArrowDown, FlaskConical, Info } from "lucide-react";
import LiveDemoButton from "@/components/live-demo-button";
import css from "./retail.module.css";
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
      <a href="#retail-workspace">
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
export function CurvedNote({ children }: { children: ReactNode }) {
  return (
    <div className={css.curvedNote}>
      <svg viewBox="0 0 110 45" fill="none" aria-hidden="true">
        <path
          d="M5 6c15 36 66 42 96 12m-21 5 22-7-5 23"
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
export function ShirtArt({ colour = "#31527a" }: { colour?: string }) {
  return (
    <svg
      viewBox="0 0 260 280"
      fill="none"
      aria-hidden="true"
      className={css.shirtArt}
    >
      <path
        d="m84 35-48 29L12 134l36 15 27-43v135h110V106l27 43 36-15-24-70-48-29-46 19-46-19Z"
        fill={colour}
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="m84 35 25 39 21-20 21 20 25-39M130 55v186M91 96h24v36H91zm54 0h24v36h-24zM76 218h108"
        stroke="#ffffff"
        strokeOpacity=".6"
      />
      <path
        d="M24 257h212m-212-5v10m212-10v10"
        stroke="currentColor"
        strokeOpacity=".25"
      />
      {[105, 148, 191].map((y) => (
        <circle key={y} cx="136" cy={y} r="2" fill="#fff" fillOpacity=".7" />
      ))}
    </svg>
  );
}
export function RoomArt() {
  return (
    <svg
      viewBox="0 0 500 340"
      fill="none"
      aria-hidden="true"
      className={css.roomArt}
    >
      <path
        d="M35 35h430v270H35z"
        fill="var(--retail-wash)"
        stroke="currentColor"
        strokeOpacity=".3"
      />
      <path
        d="M35 90V35h430v270H120m-85-70v70h25"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        d="M35 235h85a85 85 0 0 1-85 70"
        stroke="currentColor"
        strokeOpacity=".3"
      />
      <rect
        x="105"
        y="62"
        width="220"
        height="86"
        rx="13"
        fill="var(--card)"
        stroke="currentColor"
      />
      <rect
        x="116"
        y="72"
        width="198"
        height="15"
        rx="5"
        stroke="currentColor"
        strokeOpacity=".3"
      />
      <path d="M179 88v46m73-46v46" stroke="currentColor" strokeOpacity=".3" />
      <rect
        x="159"
        y="182"
        width="115"
        height="60"
        rx="29"
        fill="var(--card)"
        stroke="currentColor"
      />
      <rect
        x="343"
        y="187"
        width="63"
        height="70"
        rx="13"
        fill="var(--card)"
        stroke="currentColor"
      />
      <rect
        x="351"
        y="191"
        width="47"
        height="13"
        rx="4"
        stroke="currentColor"
        strokeOpacity=".3"
      />
      <circle
        cx="398"
        cy="91"
        r="28"
        fill="var(--retail-sage)"
        stroke="currentColor"
        strokeOpacity=".4"
      />
      <path
        d="m390 110 8-40m-1 20-11-10m10 17 14-13M54 13h392m0-6v12M54 7v12"
        stroke="currentColor"
        strokeOpacity=".4"
      />
    </svg>
  );
}
export function ProduceArt() {
  return (
    <svg
      viewBox="0 0 320 225"
      fill="none"
      aria-hidden="true"
      className={css.produceArt}
    >
      <path
        d="m40 120 15 80h215l15-80H40Z"
        fill="var(--retail-wash)"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M58 143h210M62 166h201M91 121l8 79m53-79v79m57-79-7 79"
        stroke="currentColor"
        strokeOpacity=".3"
      />
      <path
        d="M67 121c-25-51 40-89 61-32-20-24-1-65 35-49 20 9 14 38-1 57 25-33 77-22 75 23"
        fill="var(--retail-sage)"
        stroke="currentColor"
        strokeOpacity=".6"
      />
      <path
        d="m97 121-5-43m51 43 9-63m48 62 15-24"
        stroke="currentColor"
        strokeOpacity=".4"
      />
      <circle
        cx="239"
        cy="103"
        r="27"
        fill="var(--retail-sand)"
        stroke="currentColor"
      />
      <path d="m239 81-4-11m4 12 10-6" stroke="currentColor" />
      <rect
        x="114"
        y="155"
        width="88"
        height="29"
        rx="4"
        fill="var(--card)"
        stroke="currentColor"
        strokeOpacity=".4"
      />
      <path d="M128 168h59m-59 7h30" stroke="currentColor" strokeOpacity=".5" />
    </svg>
  );
}
export function FixingArt() {
  return (
    <svg
      viewBox="0 0 300 220"
      fill="none"
      aria-hidden="true"
      className={css.fixingArt}
    >
      <path
        d="m90 30 47 2 10 30-12 13-47-2-9-29 11-14Z"
        fill="var(--card)"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="m94 42 29 2-2 17-25-2-2-17Z" stroke="currentColor" />
      <path
        d="m105 75 45 102 15 15 0-25-40-93"
        fill="var(--retail-wash)"
        stroke="currentColor"
        strokeWidth="2"
      />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <path
          key={i}
          d={`m${112 + i * 6} ${89 + i * 14} 20-9`}
          stroke="currentColor"
          strokeWidth="2"
        />
      ))}
      <path
        d="m183 29 65 145m-72-140 14-7m51 151 15-7M48 30v161m-7-161h14m-14 161h14"
        stroke="currentColor"
        strokeOpacity=".4"
        strokeDasharray="3 4"
      />
      <circle
        cx="224"
        cy="60"
        r="20"
        stroke="currentColor"
        strokeOpacity=".3"
      />
      <circle
        cx="224"
        cy="60"
        r="11"
        stroke="currentColor"
        strokeOpacity=".5"
      />
    </svg>
  );
}
export function ToyArt({
  kind = "blocks",
}: {
  kind?: "blocks" | "train" | "puzzle";
}) {
  return (
    <svg
      viewBox="0 0 220 180"
      fill="none"
      aria-hidden="true"
      className={css.toyArt}
    >
      {kind === "blocks" ? (
        <>
          <rect
            x="24"
            y="96"
            width="65"
            height="61"
            rx="9"
            fill="var(--retail-wash)"
            stroke="currentColor"
          />
          <path
            d="m101 157 35-62 35 62h-70Z"
            fill="var(--retail-sage)"
            stroke="currentColor"
          />
          <circle
            cx="150"
            cy="58"
            r="29"
            fill="var(--retail-sand)"
            stroke="currentColor"
          />
          <path
            d="m39 125 12 12 23-27M16 169h178"
            stroke="currentColor"
            strokeOpacity=".4"
          />
        </>
      ) : kind === "train" ? (
        <>
          <path
            d="M23 84h100v55H23z"
            fill="var(--retail-wash)"
            stroke="currentColor"
          />
          <path
            d="M31 46h47v38H31z"
            fill="var(--retail-sage)"
            stroke="currentColor"
          />
          <path
            d="M136 94h62v45h-62z"
            fill="var(--retail-sand)"
            stroke="currentColor"
          />
          <path d="M123 129h13M94 84V65h13v19" stroke="currentColor" />
          <circle
            cx="45"
            cy="144"
            r="13"
            fill="var(--card)"
            stroke="currentColor"
          />
          <circle
            cx="101"
            cy="144"
            r="13"
            fill="var(--card)"
            stroke="currentColor"
          />
          <circle
            cx="152"
            cy="144"
            r="13"
            fill="var(--card)"
            stroke="currentColor"
          />
          <circle
            cx="185"
            cy="144"
            r="13"
            fill="var(--card)"
            stroke="currentColor"
          />
        </>
      ) : (
        <>
          <rect
            x="38"
            y="28"
            width="144"
            height="130"
            rx="14"
            fill="var(--retail-sand)"
            stroke="currentColor"
          />
          <path
            d="M110 28v42c-20-16-20 23 0 8v80M38 93h50c-17 24 20 24 11 0h83"
            stroke="currentColor"
          />
          <path
            d="m55 46 16 2m78 87h16"
            stroke="currentColor"
            strokeOpacity=".4"
          />
        </>
      )}
    </svg>
  );
}
