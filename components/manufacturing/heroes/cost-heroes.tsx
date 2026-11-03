import { ArrowUpRight, LockKeyhole } from "lucide-react";
import {
  Actions,
  Caption,
  css,
  Description,
  Diagram,
  Eyebrow,
  Frame,
  Title,
  type HeroProps,
} from "./hero-parts";

export function StandardCostHero({ copy, target }: HeroProps) {
  return (
    <Frame copy={copy} concept="standard-costing" className={css.standardFrame}>
      <div className={css.standardLayout}>
        <header className={css.standardCopy}>
          <Eyebrow>{copy.category}</Eyebrow>
          <Title copy={copy} />
          <Description copy={copy} />
          <Actions target={target} />
        </header>
        <figure className={css.costLedger}>
          <div className={css.costLedgerHeader}>
            <span>COST CARD / SAMPLE BASIS</span>
            <LockKeyhole size={16} aria-hidden="true" />
          </div>
          <div className={css.standardTotal}>
            <span>Expected batch cost</span>
            <strong>
              <small>BDT</small>25,000
            </strong>
            <p>1,000-unit production basis</p>
          </div>
          <div className={css.costStack}>
            {[
              ["Materials", "18,500"],
              ["Labor", "2,400"],
              ["Machine", "1,600"],
              ["Overhead", "2,500"],
            ].map(([label, value], i) => (
              <div key={label} className={css[`costLayer${i}`]}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
          <div className={css.costLedgerFooter}>
            <span>Versioned assumptions</span>
            <span>A stable comparison point</span>
          </div>
          <Caption>
            The standard is built from materials, time and resource rates.
          </Caption>
        </figure>
      </div>
    </Frame>
  );
}

export function ActualCostHero({ copy, target }: HeroProps) {
  return (
    <Frame copy={copy} concept="production-costing" className={css.actualFrame}>
      <div className={css.actualHeader}>
        <div>
          <Eyebrow>{copy.category}</Eyebrow>
          <Title copy={copy} inline />
        </div>
        <aside className={css.varianceFocus}>
          <span>Illustrative batch variance</span>
          <strong>
            <ArrowUpRight size={30} aria-hidden="true" />
            +1,000
          </strong>
          <small>BDT above a 25,000 standard</small>
        </aside>
      </div>
      <figure className={css.varianceBridge}>
        <div className={css.varianceChart}>
          <Diagram
            label="Sample cost bridge: BDT 25,000 standard plus materials 700, labor 200, machine minus 100 and overhead 200 equals BDT 26,000 actual."
            viewBox="0 0 850 220"
          >
            <path d="M30 179H820" stroke="var(--border)" />
            <path
              d="M115 29H740"
              stroke="var(--primary)"
              strokeOpacity=".3"
              strokeDasharray="4 5"
            />
            {[
              {
                x: 60,
                y: 29,
                h: 150,
                l: "Standard",
                v: "25,000",
                c: "var(--primary)",
              },
              {
                x: 200,
                y: 24.8,
                h: 4.2,
                l: "Materials",
                v: "+700",
                c: "#d59a26",
              },
              { x: 330, y: 23.6, h: 1.2, l: "Labor", v: "+200", c: "#d59a26" },
              {
                x: 460,
                y: 23.6,
                h: 1,
                l: "Machine",
                v: "−100",
                c: "var(--teal)",
              },
              { x: 590, y: 23, h: 1.2, l: "Overhead", v: "+200", c: "#d59a26" },
              {
                x: 730,
                y: 23,
                h: 156,
                l: "Actual",
                v: "26,000",
                c: "var(--ink)",
              },
            ].map(({ x, y, h, l, v, c }) => (
              <g key={l}>
                <rect x={x} y={y} width="60" height={h} rx="2" fill={c} />
                <text
                  x={x + 30}
                  y={y - 9}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="600"
                  fill="var(--ink)"
                >
                  {v}
                </text>
                <text
                  x={x + 30}
                  y="202"
                  textAnchor="middle"
                  fontSize="11"
                  fill="var(--muted-foreground)"
                >
                  {l}
                </text>
              </g>
            ))}
          </Diagram>
        </div>
        <Caption>
          Sample BDT cost bridge · Compare the same product, quantity and cost
          scope.
        </Caption>
      </figure>
      <div className={css.actualFooter}>
        <Description copy={copy} />
        <Actions target={target} />
      </div>
    </Frame>
  );
}
