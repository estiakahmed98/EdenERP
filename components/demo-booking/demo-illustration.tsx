import { useId } from "react";

/** A decorative ERP concept: no customer data, metrics or advisor identities. */
export default function DemoIllustration() {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 340 285" fill="none" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient
          id={`${id}-base`}
          x1="101"
          y1="160"
          x2="247"
          y2="245"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#20A2FF" />
          <stop offset="1" stopColor="#003180" />
        </linearGradient>
        <linearGradient
          id={`${id}-top`}
          x1="112"
          y1="136"
          x2="218"
          y2="208"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#78D2FF" />
          <stop offset="1" stopColor="#1088EF" />
        </linearGradient>
        <linearGradient
          id={`${id}-glass`}
          x1="131"
          y1="50"
          x2="233"
          y2="164"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EDF9FF" stopOpacity=".95" />
          <stop offset="1" stopColor="#ADD9FF" stopOpacity=".8" />
        </linearGradient>
        <radialGradient id={`${id}-glow`}>
          <stop stopColor="#1088EF" stopOpacity=".15" />
          <stop offset="1" stopColor="#1088EF" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="173" cy="209" rx="160" ry="75" fill={`url(#${id}-glow)`} />
      <ellipse
        cx="173"
        cy="212"
        rx="143"
        ry="57"
        stroke="#1088EF"
        strokeOpacity=".09"
      />
      <path
        d="M23 185C20 234 85 268 174 266C270 265 327 219 314 179"
        stroke="white"
        strokeWidth="2"
      />
      <path
        d="m72 123 98 58 104-62M170 181l-97 51m97-51 97 53"
        stroke="#1088EF"
        strokeOpacity=".25"
        strokeDasharray="3 5"
      />
      <path
        d="m103 194 69-40 69 40v33l-69 40-69-40Z"
        fill="#003180"
        fillOpacity=".08"
      />
      <path
        d="m103 184 69-40 69 40v25l-69 40-69-40Z"
        fill={`url(#${id}-base)`}
      />
      <path d="m103 184 69 40 69-40-69-40Z" fill={`url(#${id}-top)`} />
      <path
        d="m103 184 69 40 69-40M172 224v25"
        stroke="#9ADFFF"
        strokeOpacity=".65"
      />
      <path
        d="m103 165 69-40 69 40v12l-69 40-69-40Z"
        fill={`url(#${id}-base)`}
      />
      <path d="m103 165 69 40 69-40-69-40Z" fill={`url(#${id}-top)`} />
      <path d="m105 165 67 39 67-39" stroke="#D0F0FF" strokeWidth="2" />
      <path
        d="m125 171 44 25 48-28"
        stroke="#21A816"
        strokeWidth="3"
        strokeLinecap="round"
        opacity=".85"
      />
      <g transform="rotate(-7 180 109)">
        <path
          d="M119 61a9 9 0 0 1 7-9l95-22a7 7 0 0 1 9 7v111a9 9 0 0 1-7 9l-95 22a7 7 0 0 1-9-7Z"
          fill={`url(#${id}-glass)`}
          stroke="white"
          strokeWidth="2"
        />
        <path
          d="m133 66 82-19M133 76l47-11"
          stroke="#5FAEEB"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="m134 136 11-3v-25l-11 3Zm17-4 11-3V94l-11 3Zm18-4 11-3V84l-11 3Z"
          fill="#1088EF"
          fillOpacity=".65"
        />
        <path
          d="m186 88 9 8 14-25"
          stroke="#21A816"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="m133 151 76-18m-76 27 53-12"
          stroke="#9AC7EB"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
      <g transform="translate(35 91)">
        <path d="m0 27 34-20 34 20v12L34 59 0 39Z" fill="#BBD9F4" />
        <path d="m0 27 34-20 34 20-34 20Z" fill="white" stroke="#D4E7F7" />
        <path d="m17 16 17-10 19 11v15L34 43 17 33Z" fill="#A5D5FA" />
        <path
          d="M17 16V5l11-6v13L39 6l14 11-19 11Z"
          fill="#E3F2FF"
          stroke="#1088EF"
          strokeWidth=".8"
        />
        <path
          d="m23 24 4 2v5l-4-2m10 1 4 2v5l-4-2m11-12 4-2v5l-4 2"
          stroke="#1088EF"
        />
      </g>
      <g transform="translate(248 102)">
        <path d="m0 27 30-17 30 17v11L30 56 0 38Z" fill="#C7DFF2" />
        <path d="m0 27 30-17 30 17-30 17Z" fill="white" stroke="#D4E7F7" />
        <path
          d="m15 8 14-8 14 8v19l-14 8-14-8Z"
          fill="#B8DCF9"
          stroke="#77B7E9"
        />
        <path d="m15 8 14 8 14-8M29 16v19m-7-31 14 8v7" stroke="#77B7E9" />
      </g>
      <g transform="translate(35 201)">
        <rect width="52" height="42" rx="12" fill="white" stroke="#D9EAF7" />
        <path
          d="m14 12 3 2 3 15h16l4-12H18m5 18h1m10 0h1"
          stroke="#1088EF"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <g transform="translate(265 199)">
        <rect width="49" height="43" rx="12" fill="white" stroke="#D9EAF7" />
        <circle cx="19" cy="14" r="5" fill="#AAD8FA" stroke="#1088EF" />
        <path d="M10 34v-6a9 9 0 0 1 18 0v6" fill="#DCEFFF" stroke="#1088EF" />
        <path
          d="M31 11a5 5 0 0 1 0 10m2 4c5 0 7 4 7 9"
          stroke="#1088EF"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </g>
      <circle cx="58" cy="64" r="4" fill="#21A816" fillOpacity=".5" />
      <path
        d="M270 64v8m-4-4h8M99 240v5m-2.5-2.5h5"
        stroke="#21A816"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M85 53c10-16 26-24 39-22M116 26l9 5-8 5"
        stroke="#1088EF"
        strokeOpacity=".4"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
