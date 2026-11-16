import type { CollegeSlug } from "./registry";
/** Decorative education objects, never a student record, regulatory seal or live status. */
export default function CollegeArt({ slug }: { slug: CollegeSlug }) {
  const common = {
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinejoin: "round" as const,
  };
  let drawing;
  switch (slug) {
    case "intake-admission":
      drawing = (
        <>
          <path
            d="m65 170 144-73 224 91-142 38Z"
            fill="var(--card)"
            {...common}
          />
          <path
            d="m65 170 226 56v12L65 182Z"
            fill="var(--mc-wash)"
            {...common}
          />
          <path
            d="m291 226 142-38v12l-142 38Z"
            fill="var(--mc-soft)"
            {...common}
          />
          <g transform="translate(125 37) rotate(-8 100 80)">
            <rect
              width="220"
              height="140"
              rx="12"
              fill="var(--card)"
              {...common}
            />
            <path
              d="M22 30h88m-88 19h56m-56 29h168m-168 24h168"
              {...common}
              opacity=".35"
            />
            <circle cx="180" cy="33" r="17" fill="var(--mc-wash)" {...common} />
            <path d="M174 33h12m-6-6v12" {...common} />
            <path d="M22 119h20m8 0h5m7 0h18m8 0h7m8 0h35" {...common} />
          </g>
          <path
            d="M360 90c45-5 72 8 65 33m-10-12 10 13 10-12"
            stroke="var(--mc-green)"
            strokeWidth="1.6"
          />
          <g fill="var(--card)" {...common}>
            {[0, 1, 2, 3, 4].map((i) => (
              <path key={i} d={`m${75 + i * 52} 191 18-9 20 9-18 9Z`} />
            ))}
          </g>
        </>
      );
      break;
    case "cards-items":
      drawing = (
        <>
          <path d="m102 76 267-31 50 145-268 31Z" fill="var(--mc-soft)" />
          <g transform="translate(110 30) rotate(5 140 90)">
            <rect
              width="275"
              height="168"
              rx="6"
              fill="var(--card)"
              {...common}
            />
            <path
              d="M24 35h227M24 63h227M24 92h227M24 121h227M24 150h227M124 35v115m60-115v115"
              {...common}
              opacity=".4"
            />
            {[0, 1, 2].map((i) => (
              <g key={i}>
                <path d={`M30 ${77 + i * 29}h65`} {...common} />
                <circle cx="154" cy={77 + i * 29} r="7" fill="var(--mc-wash)" />
                <path
                  d={`m217 ${75 + i * 29} 4 4 10-10`}
                  stroke="var(--mc-green)"
                  strokeWidth="1.5"
                />
              </g>
            ))}
            <path d="M24 20h87" {...common} />
          </g>
          <path d="m390 54 8-2 23 119-8 2Z" fill="var(--mc-blue)" />
          <path d="m413 173 5 11 3-13" fill="var(--mc-blue)" />
        </>
      );
      break;
    case "professional-exams":
      drawing = (
        <>
          <path d="M40 125h440" {...common} strokeDasharray="5 7" />
          {[90, 260, 430].map((x, i) => (
            <g key={x}>
              <path
                d={`M${x - 31} 159v-72a31 31 0 0 1 62 0v72`}
                fill="var(--card)"
                {...common}
              />
              <path
                d={`M${x - 21} 159v-70a21 21 0 0 1 42 0v70`}
                {...common}
                opacity=".3"
              />
              <circle
                cx={x}
                cy="113"
                r="17"
                fill="var(--mc-wash)"
                {...common}
              />
              <path
                d={
                  i === 0
                    ? `M${x - 6} 113h12m-6-6v12`
                    : i === 1
                      ? `m${x - 7} 113 5 5 10-12`
                      : `M${x - 5} 106v14l11-7Z`
                }
                stroke={i === 1 ? "var(--mc-green)" : "currentColor"}
                strokeWidth="1.5"
              />
            </g>
          ))}
          <path d="m174 118 8 7-8 7m169-14 8 7-8 7" {...common} />
        </>
      );
      break;
    case "ward-placement":
      drawing = (
        <>
          <path
            d="m60 159 197-100 203 102-191 87Z"
            fill="var(--card)"
            {...common}
          />
          <path d="M60 159v-53L257 9v50" fill="var(--mc-wash)" {...common} />
          <path
            d="M257 9 460 110v51L257 59Z"
            fill="var(--mc-soft)"
            {...common}
          />
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <path
                d={`m${126 + i * 73} ${125 + i * 24} 41-21 50 24-41 21Z`}
                fill="var(--card)"
                {...common}
              />
              <path
                d={`m${126 + i * 73} ${125 + i * 24} 50 24v14m-50-14v-9m91-12v14`}
                {...common}
              />
              <path
                d={`m${135 + i * 73} ${122 + i * 24} 31-15 14 7-31 15Z`}
                fill="var(--mc-soft)"
                {...common}
              />
            </g>
          ))}
          <path
            d="m89 193 175-86m-20 122 170-80"
            stroke="var(--mc-green)"
            strokeWidth="1.2"
            strokeDasharray="4 6"
          />
        </>
      );
      break;
    case "interns":
      drawing = (
        <>
          <path
            d="M25 155c40-110 108 90 175-10S332 32 395 117s78 36 104-30"
            {...common}
            strokeDasharray="5 7"
          />
          {[
            [100, 150],
            [257, 78],
            [420, 143],
          ].map(([x, y], i) => (
            <g key={x}>
              <circle cx={x} cy={y} r="28" fill="var(--card)" {...common} />
              <circle cx={x} cy={y} r="19" stroke="currentColor" opacity=".2" />
              <path
                d={
                  i === 0
                    ? `M${x - 9} ${y - 10}h18v20h-18Zm5-5v5m8-5v5`
                    : i === 1
                      ? `M${x - 9} ${y - 9}h18v19h-18Zm4 5h10m-10 5h10`
                      : `m${x - 9} ${y} 6 6 13-14`
                }
                stroke={i === 2 ? "var(--mc-green)" : "currentColor"}
                strokeWidth="1.5"
              />
            </g>
          ))}
          <path d="M35 192h122m87-169h74m67 172h89" {...common} opacity=".2" />
        </>
      );
      break;
    case "postgraduate-trainees":
      drawing = (
        <>
          {[0, 1, 2].map((i) => (
            <g
              key={i}
              transform={`translate(${84 + i * 108} ${58 - i * 15}) rotate(${(i - 1) * 8} 80 75)`}
            >
              <path d="M0 18 18 0h142v150H0Z" fill="var(--card)" {...common} />
              <path d="M0 18h18V0" {...common} />
              <path
                d="M25 45h73m-73 25h110m-110 18h110m-110 18h60"
                {...common}
                opacity=".35"
              />
              <circle
                cx="120"
                cy="122"
                r="14"
                fill="var(--mc-wash)"
                {...common}
              />
              <path
                d="m114 122 4 4 9-10"
                stroke="var(--mc-green)"
                strokeWidth="1.3"
              />
            </g>
          ))}
        </>
      );
      break;
    case "governance":
      drawing = (
        <>
          <path
            d="m260 106-130-54m130 54L390 52m-130 54L130 185m130-79 130 79"
            {...common}
            strokeDasharray="4 6"
          />
          <path
            d="m200 107 60-31 64 31-61 32Z"
            fill="var(--card)"
            {...common}
          />
          <path
            d="M200 107v20l63 32 61-32v-20l-61 32Z"
            fill="var(--mc-soft)"
            {...common}
          />
          {[
            [130, 52],
            [390, 52],
            [130, 185],
            [390, 185],
          ].map(([x, y]) => (
            <g key={x + ":" + y}>
              <ellipse
                cx={x}
                cy={y + 9}
                rx="39"
                ry="20"
                fill="var(--mc-soft)"
                {...common}
              />
              <ellipse
                cx={x}
                cy={y}
                rx="39"
                ry="20"
                fill="var(--card)"
                {...common}
              />
              <path
                d={`m${x - 9} ${y} 7 5 12-10`}
                stroke="var(--mc-green)"
                strokeWidth="1.4"
              />
            </g>
          ))}
        </>
      );
      break;
    case "college-settings":
      drawing = (
        <>
          {[2, 1, 0].map((i) => (
            <g key={i} transform={`translate(${108 + i * 18} ${30 + i * 44})`}>
              <path
                d="m0 38 151-38 120 47-153 38Z"
                fill="var(--card)"
                {...common}
              />
              <path
                d="m0 38 118 47 153-38v9L118 94 0 47Z"
                fill="var(--mc-soft)"
                {...common}
              />
              <path d="m56 33 65 25m20-46 63 24" {...common} opacity=".5" />
              <ellipse
                cx={93 + i * 13}
                cy={48 + i * 4}
                rx="9"
                ry="4"
                fill="var(--mc-blue)"
              />
            </g>
          ))}
        </>
      );
      break;
  }
  return (
    <svg viewBox="0 0 520 255" fill="none" aria-hidden="true">
      {drawing}
    </svg>
  );
}
