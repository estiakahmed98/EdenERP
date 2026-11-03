import { CircleCheck, Cog, Layers3, PackageCheck } from "lucide-react";
import { ManufacturingScribble } from "../design-system";
import {
  Actions,
  Caption,
  css,
  Description,
  Diagram,
  Eyebrow,
  Frame,
  MiniLabel,
  Title,
  type HeroProps,
} from "./hero-parts";

export function WorkCentersHero({ copy, target }: HeroProps) {
  return (
    <Frame copy={copy} concept="work-centers" className={css.factoryFrame}>
      <div className={css.factoryLayout}>
        <figure className={css.floorPlan}>
          <div className={css.figureHeading}>
            <MiniLabel>Colour coating resources</MiniLabel>
            <MiniLabel>8 work centers in the register</MiniLabel>
          </div>
          <Diagram
            label="Illustrative grouping of the supplied colour-coating work centers: pre-treatment, primer, finish and exit inspection."
            viewBox="0 0 420 330"
          >
            <path
              d="M30 38H390V292H30Z"
              fill="var(--card)"
              stroke="var(--primary)"
              strokeOpacity=".25"
            />
            <path
              d="M30 150H390M170 38V292M30 255H390"
              stroke="var(--border)"
              strokeWidth="2"
            />
            <path
              d="M76 115V207H240V90H342V210"
              className={css.movingDash}
              stroke="var(--primary)"
              strokeOpacity=".45"
              strokeDasharray="5 7"
            />
            {[
              { x: 54, y: 67, w: 92, h: 65, n: "PRE-TREAT", id: "CCL-PRE" },
              {
                x: 205,
                y: 57,
                w: 149,
                h: 65,
                n: "PRIMER & OVEN",
                id: "CCL-PRIME",
              },
              { x: 53, y: 177, w: 93, h: 56, n: "FINISH", id: "CCL-FIN" },
              {
                x: 212,
                y: 171,
                w: 142,
                h: 61,
                n: "INSPECT & RECOIL",
                id: "CCL-EXIT",
              },
            ].map(({ x, y, w, h, n, id }, i) => (
              <g key={id}>
                <rect
                  x={x}
                  y={y}
                  width={w}
                  height={h}
                  rx="7"
                  fill={i === 0 ? "var(--primary)" : "var(--cream)"}
                  fillOpacity={i === 0 ? ".12" : "1"}
                  stroke="var(--primary)"
                  strokeOpacity=".25"
                />
                <circle cx={x + 13} cy={y + 16} r="3" fill="var(--primary)" />
                <text x={x + 23} y={y + 20} fontSize="11" fill="var(--ink)">
                  {id}
                </text>
                <text
                  x={x + 12}
                  y={y + 43}
                  fontSize="9"
                  fill="var(--muted-foreground)"
                >
                  {n}
                </text>
              </g>
            ))}
            <text
              x="48"
              y="278"
              fontSize="10"
              fill="var(--muted-foreground)"
              letterSpacing="2"
            >
              MATERIAL HANDOFF CORRIDOR
            </text>
            <path
              d="m390 268 12 0m-6-6v12"
              stroke="var(--primary)"
              strokeWidth="1.5"
            />
          </Diagram>
          <Caption>
            Illustrated resource grouping using the supplied work-center
            records.
          </Caption>
        </figure>
        <div className={css.factoryCopy}>
          <Eyebrow>{copy.category}</Eyebrow>
          <Title copy={copy} />
          <Description copy={copy} />
          <Actions target={target} />
          <div className={css.resourceLegend}>
            <Cog size={15} aria-hidden="true" />
            <span>Machines</span>
            <span>Teams</span>
            <span>External resources</span>
          </div>
        </div>
      </div>
    </Frame>
  );
}

export function RoutingsHero({ copy, target }: HeroProps) {
  const stations = [
    ["10", "Pre-treat", "Entry & degrease · 300 min"],
    ["20", "Prime & cure", "5 μm primer · 310 min"],
    ["30", "Coat & cure", "18–20 μm top coat · 325 min"],
    ["40", "Inspect & recoil", "Exit checkpoint · 290 min"],
  ];
  return (
    <Frame copy={copy} concept="routings" className={css.routeFrame}>
      <div className={css.routeHeader}>
        <div>
          <Eyebrow>{copy.category}</Eyebrow>
          <Title copy={copy} inline />
        </div>
        <div className={css.routeLead}>
          <Description copy={copy} />
          <Actions target={target} />
        </div>
      </div>
      <figure className={css.routeJourney}>
        <div className={css.routeTrack} aria-hidden="true" />
        <ol>
          {stations.map(([n, name, detail], i) => (
            <li key={n} className={i % 2 ? css.stationLower : undefined}>
              <span className={css.stationNumber}>{n}</span>
              <div>
                <h2>{name}</h2>
                <p>{detail}</p>
              </div>
              {i === 3 && (
                <CircleCheck
                  size={20}
                  className={css.routeCheck}
                  aria-hidden="true"
                />
              )}
            </li>
          ))}
        </ol>
        <Caption>
          RT-CCL · Four-stage colour coating from the supplied routing record.
        </Caption>
      </figure>
    </Frame>
  );
}

export function BomHero({ copy, target }: HeroProps) {
  return (
    <Frame copy={copy} concept="bill-of-materials" className={css.bomFrame}>
      <div className={css.bomLayout}>
        <div className={css.bomCopy}>
          <Eyebrow>{copy.category}</Eyebrow>
          <Title copy={copy} />
          <Description copy={copy} />
          <Actions target={target} />
        </div>
        <aside
          className={css.ingredientList}
          aria-label="Material lines from the supplied plain-sheet BOM"
        >
          <MiniLabel>01 / Material flow</MiniLabel>
          {[
            ["01", "Colour coil input", "1,006 kg · CC-040-GRN"],
            ["02", "Edge trim & scrap", "6 kg · 1% cost share"],
          ].map(([n, name, detail]) => (
            <div key={n}>
              <span>{n}</span>
              <p>
                <strong>{name}</strong>
                <small>{detail}</small>
              </p>
            </div>
          ))}
        </aside>
        <figure className={css.outputRecipe}>
          <div className={css.recipeStack} aria-hidden="true">
            <span />
            <span />
            <span />
            <Layers3 size={48} strokeWidth={1.2} />
          </div>
          <MiniLabel>02 / Defined output</MiniLabel>
          <h2>
            <ManufacturingScribble>1,000 kg</ManufacturingScribble>
          </h2>
          <p>Plain colour sheet · 98% yield</p>
          <span className={css.recipeVersion}>BOM-CTL-PLAIN</span>
          <Caption>Supplied production recipe</Caption>
        </figure>
        <div className={css.bomFooter}>
          <PackageCheck size={16} aria-hidden="true" />
          <span>
            Materials + quantities + yield = a production-ready recipe.
          </span>
        </div>
      </div>
    </Frame>
  );
}
