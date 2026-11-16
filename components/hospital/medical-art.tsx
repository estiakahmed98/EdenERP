import { useId } from "react";

/** Three connected service wings around an open atrium; distinct from the dashboard campus. */
export function DepartmentAtrium() {
  return (
    <svg viewBox="0 0 700 420" fill="none" aria-hidden="true">
      <ellipse
        cx="355"
        cy="310"
        rx="260"
        ry="80"
        fill="#1088ef"
        fillOpacity=".035"
      />
      <path
        d="M95 286 340 159 617 298 370 402Z"
        fill="var(--card)"
        stroke="var(--border)"
      />
      <path
        d="m168 308 173-87 185 94-160 68Z"
        fill="#1088ef"
        fillOpacity=".045"
        stroke="var(--border)"
        strokeDasharray="4 5"
      />
      <path
        d="m214 273 130-65 141 70-131 60Z"
        fill="var(--card)"
        stroke="#92c9f4"
      />
      <path
        d="m214 273 140 65v16l-140-65Z"
        fill="#1088ef"
        fillOpacity=".1"
        stroke="#92c9f4"
      />
      <path
        d="m354 338 131-60v16l-131 60Z"
        fill="#1088ef"
        fillOpacity=".17"
        stroke="#92c9f4"
      />
      <path
        d="M354 303V147M354 244l-146-55m146 55 147-61"
        stroke="#1088ef"
        strokeDasharray="4 6"
      />
      <g>
        <path
          d="m106 183 92-48 106 53-94 49Z"
          fill="var(--card)"
          stroke="#87bde9"
        />
        <path d="m106 183 104 54v65l-104-54Z" fill="#d4eaff" stroke="#87bde9" />
        <path d="m210 237 94-49v65l-94 49Z" fill="#eef7ff" stroke="#87bde9" />
        <path
          d="m128 173 69-35 82 40-70 36Z"
          fill="#1088ef"
          fillOpacity=".055"
        />
        <path
          d="m133 214 23 12v19l-23-12Zm38 19 23 12v19l-23-12Z"
          fill="#1088ef"
          fillOpacity=".4"
        />
        <circle cx="199" cy="161" r="24" fill="var(--card)" stroke="#1088ef" />
        <path
          d="M190 153v9a9 9 0 0 0 18 0v-9m-18 0h4m10 0h4m-9 18v5a8 8 0 0 0 16 0v-4"
          stroke="#1088ef"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <circle cx="215" cy="169" r="3" fill="var(--card)" stroke="#1088ef" />
      </g>
      <g>
        <path
          d="m263 91 83-43 106 53-85 44Z"
          fill="var(--card)"
          stroke="#87bde9"
        />
        <path d="m263 91 104 54v64l-104-54Z" fill="#c2e2fc" stroke="#87bde9" />
        <path d="m367 145 85-44v64l-85 44Z" fill="#eef7ff" stroke="#87bde9" />
        <path
          d="m285 119 21 11v20l-21-11Zm36 19 21 11v20l-21-11Z"
          fill="#1088ef"
          fillOpacity=".45"
        />
        <circle cx="349" cy="69" r="24" fill="var(--card)" stroke="#1088ef" />
        <path
          d="M344 57h10m-8 0v13l-8 12h22l-8-12V57m-9 18h14"
          stroke="#1088ef"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <g>
        <path
          d="m410 184 92-48 105 53-94 49Z"
          fill="var(--card)"
          stroke="#87bde9"
        />
        <path d="m410 184 103 54v65l-103-54Z" fill="#d4eaff" stroke="#87bde9" />
        <path d="m513 238 94-49v65l-94 49Z" fill="#eef7ff" stroke="#87bde9" />
        <path
          d="m435 216 23 12v19l-23-12Zm38 19 23 12v19l-23-12Z"
          fill="#1088ef"
          fillOpacity=".4"
        />
        <circle cx="502" cy="162" r="24" fill="var(--card)" stroke="#1088ef" />
        <path
          d="m502 149 11 4v9c0 7-5 11-11 14-6-3-11-7-11-14v-9Z"
          stroke="#1088ef"
          strokeWidth="1.6"
        />
        <path
          d="m496 162 4 4 8-9"
          stroke="#21a816"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </g>
      <circle cx="355" cy="290" r="29" fill="var(--card)" stroke="#1088ef" />
      <path
        d="M355 276v28m-14-14h28"
        stroke="#1088ef"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M119 323 80 344m503-17 42 22"
        stroke="#21a816"
        strokeDasharray="4 5"
      />
      <circle cx="77" cy="346" r="6" fill="var(--card)" stroke="#21a816" />
      <circle cx="629" cy="351" r="6" fill="var(--card)" stroke="#21a816" />
    </svg>
  );
}

/** Code-native concept illustrations. No patient images, scans or clinical readings. */
export function HospitalCampus() {
  const id = useId().replaceAll(":", "");
  return (
    <svg viewBox="0 0 760 470" fill="none" aria-hidden="true">
      <defs>
        <linearGradient
          id={`${id}-face`}
          x1="260"
          y1="120"
          x2="520"
          y2="410"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#dceeff" />
          <stop offset="1" stopColor="#8bc7fa" />
        </linearGradient>
        <linearGradient
          id={`${id}-glass`}
          x1="350"
          y1="140"
          x2="450"
          y2="300"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#1088ef" />
          <stop offset="1" stopColor="#003180" />
        </linearGradient>
        <radialGradient id={`${id}-glow`}>
          <stop stopColor="#1088ef" stopOpacity=".12" />
          <stop offset="1" stopColor="#1088ef" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="390" cy="270" rx="350" ry="200" fill={`url(#${id}-glow)`} />
      <path
        d="M64 331 369 168 693 333 389 460Z"
        fill="var(--card)"
        stroke="var(--border)"
      />
      <path d="M104 348 393 193 651 331" stroke="#1088ef" strokeOpacity=".15" />
      <path
        d="M174 289 374 397 566 294M267 238 467 345M488 245 291 351"
        stroke="var(--border)"
      />
      <path
        d="M210 287 374 199 558 294 395 383Z"
        fill="#1088ef"
        fillOpacity=".08"
      />
      <path
        d="M245 206 391 126 536 205 391 286Z"
        fill="var(--card)"
        stroke="#86bce8"
      />
      <path
        d="M245 206V316L391 397V286Z"
        fill={`url(#${id}-face)`}
        stroke="#86bce8"
      />
      <path d="M391 286V397L536 315V205Z" fill="#eef7ff" stroke="#86bce8" />
      <path
        d="M271 170 391 105 511 169 391 235Z"
        fill="var(--card)"
        stroke="#77b4e6"
      />
      <path d="M271 170V219L391 285V235Z" fill="#d7ecfd" stroke="#77b4e6" />
      <path d="M391 235V285L511 219V169Z" fill="#e9f5ff" stroke="#77b4e6" />
      <path
        d="M334 138 391 107 447 137 391 168Z"
        fill="#1088ef"
        fillOpacity=".09"
      />
      <path
        d="M378 124 390 118 403 125 403 136 416 143 404 150 392 143 380 150 367 143 379 136Z"
        fill="#1088ef"
      />
      {[0, 1, 2].map((row) => (
        <g key={row}>
          {[0, 1, 2].map((col) => (
            <path
              key={col}
              d={`M${264 + col * 35} ${237 + row * 26 + col * 19}v15l21 12v-15Z`}
              fill="#1088ef"
              fillOpacity={row === 1 ? 0.35 : 0.6}
            />
          ))}
          {[0, 1, 2].map((col) => (
            <path
              key={col}
              d={`M${411 + col * 35} ${289 + row * 25 - col * 20}v15l21-12v-15Z`}
              fill="#1088ef"
              fillOpacity=".28"
            />
          ))}
        </g>
      ))}
      <path d="M348 320v54l27 15v-54Z" fill={`url(#${id}-glass)`} />
      <path d="m353 324 16 9v46l-16-9Z" stroke="#b8e4ff" />
      <path
        d="m328 377 46 25 48-26v10l-48 26-46-25Z"
        fill="#d2e8f9"
        stroke="#8ac4ee"
      />
      <path
        d="M238 230 182 261 124 229V172l58-31 56 31Z"
        fill="var(--card)"
        stroke="#8ac4ee"
      />
      <path d="m124 172 58 32 56-32M182 204v57" stroke="#8ac4ee" />
      <path d="M151 182v26l16 8v-25Z" fill="#1088ef" fillOpacity=".35" />
      <path
        d="M536 243 592 212 649 244V300l-57 32-56-32Z"
        fill="var(--card)"
        stroke="#8ac4ee"
      />
      <path d="m536 243 56 32 57-31M592 275v57" stroke="#8ac4ee" />
      <path d="m605 282 22-12v23l-22 13Z" fill="#1088ef" fillOpacity=".25" />
      <path
        d="M183 262v40l-54 28M592 333v23l57 30M380 112V61l68-36"
        stroke="#1088ef"
        strokeWidth="1.5"
        strokeDasharray="5 7"
      />
      <circle cx="129" cy="330" r="7" fill="var(--card)" stroke="#1088ef" />
      <circle cx="649" cy="386" r="7" fill="var(--card)" stroke="#1088ef" />
      <circle cx="448" cy="25" r="7" fill="var(--card)" stroke="#21a816" />
      {[
        { x: 188, y: 341 },
        { x: 570, y: 356 },
        { x: 280, y: 401 },
      ].map(({ x, y }) => (
        <g key={x}>
          <ellipse
            cx={x}
            cy={y + 18}
            rx="16"
            ry="8"
            fill="#21a816"
            fillOpacity=".08"
          />
          <path d={`M${x} ${y}v18`} stroke="#477d47" strokeWidth="2" />
          <ellipse cx={x} cy={y - 5} rx="12" ry="20" fill="#80be7c" />
          <path d={`m${x} ${y - 15}v23`} stroke="#4c954f" />
        </g>
      ))}
    </svg>
  );
}

export function ImagingRoom() {
  return (
    <svg viewBox="0 0 720 390" fill="none" aria-hidden="true">
      <path
        d="M45 269 331 111 671 282 392 373Z"
        fill="var(--card)"
        stroke="var(--border)"
      />
      <path
        d="M76 258V72l284 149v146"
        fill="#1088ef"
        fillOpacity=".025"
        stroke="var(--border)"
      />
      <path d="m360 221 274-148v187" stroke="var(--border)" />
      <path d="M151 144v76l72 39v-76Z" fill="#e0f2ff" stroke="#8dc9f4" />
      <path d="m159 157 54 28v53l-54-28Z" fill="#1088ef" fillOpacity=".16" />
      <ellipse
        cx="425"
        cy="202"
        rx="91"
        ry="111"
        fill="#ddedfb"
        stroke="#75b6e7"
        transform="rotate(-17 425 202)"
      />
      <ellipse
        cx="409"
        cy="203"
        rx="82"
        ry="103"
        fill="var(--card)"
        stroke="#75b6e7"
        transform="rotate(-17 409 203)"
      />
      <ellipse
        cx="409"
        cy="203"
        rx="50"
        ry="66"
        fill="#1088ef"
        fillOpacity=".05"
        stroke="#9acdf0"
        transform="rotate(-17 409 203)"
      />
      <path
        d="M259 265 408 185l76 43-148 83Z"
        fill="var(--card)"
        stroke="#75b6e7"
      />
      <path
        d="M259 265v12l77 46 148-82v-13l-148 83Z"
        fill="#d9edfc"
        stroke="#75b6e7"
      />
      <path d="m289 279 26 15v30l-26-15Z" fill="#b9dcf5" />
      <path d="m315 324 38-21 20 11-38 21Z" fill="#d5eafb" stroke="#8bc6ee" />
      <path d="M534 261v-77l42-23v77Z" fill="var(--card)" stroke="#8bc6ee" />
      <path d="m540 194 28-16v33l-28 16Z" fill="#1088ef" fillOpacity=".17" />
      <path
        d="m550 251 15 9v15l-32 17-14-8 31-17Z"
        fill="#d9edfc"
        stroke="#8bc6ee"
      />
      <path
        d="M190 103v-25m-12 7 12-7 12 20"
        stroke="#21a816"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M499 125c44-6 81 20 91 57"
        stroke="#1088ef"
        strokeDasharray="4 6"
      />
      <circle cx="590" cy="182" r="5" fill="var(--card)" stroke="#1088ef" />
    </svg>
  );
}

export function WardCutaway() {
  return (
    <svg viewBox="0 0 900 350" fill="none" aria-hidden="true">
      <path
        d="M60 238 450 32 842 239 450 343Z"
        fill="var(--card)"
        stroke="#9bcbed"
      />
      <path
        d="M60 238v-99L450 32v100Z"
        fill="#1088ef"
        fillOpacity=".04"
        stroke="#9bcbed"
      />
      <path
        d="M450 32v100l392 207V239Z"
        fill="#1088ef"
        fillOpacity=".07"
        stroke="#9bcbed"
      />
      <path
        d="m65 239 385 99 385-99M149 192l386 101M245 140l386 103"
        stroke="var(--border)"
      />
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${180 + i * 142} ${178 - i * 26})`}>
          <path d="m0 0 59-32 88 47-60 32Z" fill="#e9f5ff" stroke="#8fc9ed" />
          <path d="M0 0v12l87 47V47Z" fill="#c7e4f8" stroke="#8fc9ed" />
          <path d="m87 47 60-32v12L87 59Z" fill="#e0effa" stroke="#8fc9ed" />
          <path d="m4-2v-29l59-32v29" stroke="#75b3dd" strokeWidth="3" />
          <path
            d="m14-8 45-24 29 16-45 24Z"
            fill="var(--card)"
            stroke="#a0cee9"
          />
          <path
            d="m10 20 0 16m65 18v16m58-31v16"
            stroke="#85bde3"
            strokeWidth="2"
          />
        </g>
      ))}
      <path
        d="M647 202v-36l58-30 54 29v37l-58 30Z"
        fill="var(--card)"
        stroke="#91c7eb"
      />
      <path d="m647 166 54 29 58-30m-58 30v37" stroke="#91c7eb" />
      <path
        d="m688 180 10-5 11 6v10l-11 6-10-5Z"
        fill="#21a816"
        fillOpacity=".25"
      />
      <path
        d="M136 246c80 56 211 95 322 63s123-48 182-31"
        stroke="#1088ef"
        strokeDasharray="5 7"
      />
      <path d="m622 269 21 10-22 10" stroke="#1088ef" />
      <path
        d="m82 262 38 9m-19-20 0 29"
        stroke="#21a816"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function BloodUnitArt() {
  return (
    <svg viewBox="0 0 390 430" fill="none" aria-hidden="true">
      <ellipse
        cx="204"
        cy="382"
        rx="112"
        ry="18"
        fill="#1088ef"
        fillOpacity=".05"
      />
      <path
        d="M150 55h94v26l20 20v205c0 22-24 45-67 45s-67-23-67-45V101l20-20Z"
        fill="var(--card)"
        stroke="#8dc8f2"
        strokeWidth="2"
      />
      <path d="M157 62h80v37h-80Z" fill="#eaf5ff" stroke="#8dc8f2" />
      <path
        d="M141 221c47-23 73 23 112 0v81c0 19-20 35-56 35s-56-16-56-35Z"
        fill="#1088ef"
        fillOpacity=".11"
      />
      <path
        d="M153 132h88v105h-88Z"
        fill="var(--card)"
        stroke="var(--border)"
      />
      <path
        d="M177 151h40m-40 13h40m-40 13h29"
        stroke="#1088ef"
        strokeOpacity=".35"
      />
      <path
        d="M173 201v18m5-18v18m5-18v18m7-18v18m5-18v18m8-18v18m6-18v18m7-18v18m5-18v18"
        stroke="#003180"
      />
      <path
        d="M172 353v20c0 19-38 10-38 30m86-50v18c0 25 39-1 39 30"
        stroke="#8dc8f2"
        strokeWidth="3"
      />
      <path
        d="M139 106h115M197 35v20m-8-20h16"
        stroke="#8dc8f2"
        strokeWidth="2"
      />
      <circle
        cx="297"
        cy="105"
        r="32"
        fill="var(--card)"
        stroke="var(--border)"
      />
      <path d="m284 105 9 9 17-21" stroke="#21a816" strokeWidth="2" />
      <path
        d="M269 121c-4 18-13 24-26 29"
        stroke="#21a816"
        strokeDasharray="3 5"
      />
    </svg>
  );
}
