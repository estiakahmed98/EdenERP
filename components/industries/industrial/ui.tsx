import base from "../professional/professional.module.css";
import css from "./industrial.module.css";
export { base, css };
export { Actions, Badge, HandNote, Metric, Note } from "../professional/ui";
export function FabricArt() {
  return (
    <svg
      viewBox="0 0 400 300"
      fill="none"
      aria-hidden="true"
      className={css.fabricArt}
    >
      <path
        d="M62 74h247v158H62z"
        fill="var(--p-wash)"
        stroke="currentColor"
        strokeOpacity=".4"
      />
      <path
        d="M62 74h247c26 0 26 42 0 42H62"
        fill="var(--card)"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <ellipse
        cx="62"
        cy="95"
        rx="20"
        ry="21"
        fill="var(--p-sage)"
        stroke="currentColor"
      />
      <ellipse
        cx="62"
        cy="95"
        rx="7"
        ry="8"
        stroke="currentColor"
        strokeOpacity=".4"
      />
      {Array.from({ length: 15 }, (_, i) => (
        <path
          key={i}
          d={`M${78 + i * 15} 120v110`}
          stroke="currentColor"
          strokeOpacity={i % 3 === 0 ? ".55" : ".2"}
          strokeWidth={i % 3 === 0 ? "3" : "1"}
        />
      ))}
      {Array.from({ length: 9 }, (_, i) => (
        <path
          key={i}
          d={`M64 ${125 + i * 12}h244`}
          stroke="currentColor"
          strokeOpacity={i % 3 === 0 ? ".5" : ".2"}
          strokeWidth={i % 3 === 0 ? "3" : "1"}
        />
      ))}
      <path
        d="m62 232 26 13 27-7 27 13 27-9 27 12 27-9 28 10 26-9 32 9v-23"
        fill="var(--p-wash)"
        stroke="currentColor"
        strokeOpacity=".45"
      />
      <path
        d="M339 74v177m-6-177h12m-12 177h12M57 277h251m-251-6v12m251-12v12"
        stroke="currentColor"
        strokeOpacity=".3"
      />
    </svg>
  );
}
export function BeamArt() {
  return (
    <svg
      viewBox="0 0 520 265"
      fill="none"
      aria-hidden="true"
      className={css.beamArt}
    >
      <path
        d="m64 120 305-71 84 42-303 89-86-60Z"
        fill="var(--p-wash)"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="m64 120 86 60v45l-86-60v-45Zm86 60 303-89v45l-303 89v-45Z"
        fill="var(--card)"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="m82 134 51 35v27l-51-36v-26Z"
        fill="var(--p-sage)"
        stroke="currentColor"
        strokeOpacity=".4"
      />
      {[0, 1, 2, 3].map((i) => (
        <path
          key={i}
          d={`m${168 + i * 63} ${96 - i * 15} 84 47v45`}
          stroke="currentColor"
          strokeOpacity=".45"
          strokeDasharray="4 4"
        />
      ))}
      <path
        d="m62 91 301-71m-303 64 4 14m298-85 4 14M475 93v44m-6-44h12m-12 44h12"
        stroke="currentColor"
        strokeOpacity=".4"
      />
      <path d="m44 213 98 30 329-99" stroke="currentColor" strokeOpacity=".2" />
    </svg>
  );
}
export function ChairArt() {
  return (
    <svg
      viewBox="0 0 360 360"
      fill="none"
      aria-hidden="true"
      className={css.chairArt}
    >
      <path
        d="m98 45 125-18 41 65-126 22-40-69Z"
        fill="var(--p-sand)"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="m138 114 126-22v17l-126 23v-18Zm-40-69 40 69v18L98 63V45Z"
        fill="var(--card)"
        stroke="currentColor"
        strokeOpacity=".5"
      />
      <path
        d="M127 126v38m99-45v32M115 194v39m119-40v40"
        stroke="currentColor"
        strokeDasharray="3 5"
        strokeOpacity=".5"
      />
      <path
        d="m82 167 137-26 67 50-142 32-62-56Z"
        fill="var(--p-wash)"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="m82 167 62 56v13l-62-54v-15Zm62 56 142-32v13l-142 32v-13Z"
        fill="var(--card)"
        stroke="currentColor"
        strokeOpacity=".5"
      />
      <path
        d="m99 250 13 3-12 87-13-4 12-86Zm61 16 14-2 11 82-14 3-11-83Zm70-19 13-3 9 76-13 3-9-76Zm39-20 13-1 10 70-13 3-10-72Z"
        fill="var(--p-sand)"
        stroke="currentColor"
      />
      <path
        d="M33 81h49M288 181h42M33 292h49"
        stroke="currentColor"
        strokeOpacity=".3"
      />
      <circle cx="26" cy="81" r="3" fill="currentColor" />
      <circle cx="335" cy="181" r="3" fill="currentColor" />
      <circle cx="26" cy="292" r="3" fill="currentColor" />
    </svg>
  );
}
