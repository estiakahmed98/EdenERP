import CapacityGauge from "./capacity-gauge";
import {
  ArrowDown,
  ArrowRight,
  CalendarRange,
  Check,
  Clock3,
  TriangleAlert,
} from "lucide-react";
import {
  ManufacturingSketchRing,
  ManufacturingStickyNote,
} from "../design-system";
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

export function MrpHero({ copy, target }: HeroProps) {
  return (
    <Frame copy={copy} concept="mrp-planning" className={css.mrpFrame}>
      <div className={css.mrpLayout}>
        <div className={css.mrpCopy}>
          <Eyebrow>{copy.category}</Eyebrow>
          <Title copy={copy} />
          <Description copy={copy} />
          <Actions target={target} />
        </div>
        <figure className={css.materialBalance}>
          <div className={css.figureHeading}>
            <MiniLabel>LDPE resin / Sample requirement</MiniLabel>
            <TriangleAlert size={16} aria-hidden="true" />
          </div>
          <div className={css.demandNumber}>
            <small>Gross demand</small>
            <strong>
              1,200 <span>kg</span>
            </strong>
          </div>
          <div className={css.supplyEquation}>
            <div>
              <span>Available supply</span>
              <strong>720 kg</strong>
              <div className={css.supplyBar}>
                <i />
              </div>
            </div>
            <span className={css.equationMinus}>−</span>
          </div>
          <div className={css.shortageCutout}>
            <span>Plan the net requirement</span>
            <strong>
              480 <small>kg short</small>
            </strong>
            <p>Review supply timing before release.</p>
          </div>
          <Caption>
            Demand − available supply = the next material decision.
          </Caption>
        </figure>
      </div>
    </Frame>
  );
}

export function CapacityHero({ copy, target }: HeroProps) {
  return (
    <Frame
      copy={copy}
      concept="capacity-planning"
      className={css.capacityFrame}
    >
      <header className={css.capacityHeader}>
        <Eyebrow>{copy.category}</Eyebrow>
        <Title copy={copy} inline />
      </header>
      <div className={css.capacityComposition}>
        <div className={css.capacityLead}>
          <Description copy={copy} />
          <p className={css.caption}>Supplied weekly capacity snapshot</p>
        </div>
        <figure className={css.capacityGauge}>
          <Diagram
            label="Supplied capacity view: eight work centers, zero overloaded, zero recorded utilization and one undated production order whose load is not placed."
            viewBox="0 0 360 245"
          >
            <CapacityGauge
              utilizationLabel="RECORDED UTILIZATION"
              availableLabel="Available"
              overloadedLabel="Overloaded"
            />
          </Diagram>
          <Caption>
            Zero overloads in the supplied view. Undated work is not placed.
          </Caption>
        </figure>
        <aside className={css.capacityConstraint}>
          <span>Scheduling exception</span>
          <strong>
            <ManufacturingSketchRing>1 MO</ManufacturingSketchRing>
          </strong>
          <p>
            No planned date
            <br />8 work centers
          </p>
          <span className={css.amberLabel}>Load not placed</span>
        </aside>
      </div>
      <div className={css.centerActions}>
        <Actions target={target} />
      </div>
    </Frame>
  );
}

export function MpsHero({ copy, target }: HeroProps) {
  return (
    <Frame copy={copy} concept="master-schedule-mps" className={css.mpsFrame}>
      <div className={css.mpsLayout}>
        <figure className={css.calendarSheet}>
          <div className={css.calendarSpine}>THE MASTER PLAN</div>
          <div className={css.calendarContent}>
            <div className={css.figureHeading}>
              <MiniLabel>Weekly buckets · Supplied plan</MiniLabel>
              <CalendarRange size={18} aria-hidden="true" />
            </div>
            <h2>
              Make room
              <br />
              for what’s next.
            </h2>
            <div
              className={css.calendarDays}
              style={{ gridTemplateColumns: "repeat(4, 1fr)" }}
            >
              {["45", "46", "47", "48", "49", "50", "51", "52"].map((week) => (
                <div key={week}>
                  <span>WEEK</span>
                  <strong>{week}</strong>
                  <i />
                </div>
              ))}
            </div>
            <div className={css.calendarTarget}>
              <span>CC-025-BLU · On hand</span>
              <strong>
                47,903.06 <small>kg</small>
              </strong>
            </div>
            <Caption>Colour coil 0.25 mm · Reorder point 2,000.</Caption>
          </div>
        </figure>
        <div className={css.mpsCopy}>
          <Eyebrow>{copy.category}</Eyebrow>
          <Title copy={copy} />
          <Description copy={copy} />
          <Actions target={target} />
          <div className={css.calendarNote}>
            <ManufacturingStickyNote>
              Give the week a production target.
            </ManufacturingStickyNote>
          </div>
        </div>
      </div>
    </Frame>
  );
}

export function ApsHero({ copy, target }: HeroProps) {
  return (
    <Frame copy={copy} concept="scheduling-aps" className={css.apsFrame}>
      <div className={css.apsHeader}>
        <div>
          <Eyebrow>{copy.category}</Eyebrow>
          <Title copy={copy} inline />
        </div>
        <div className={css.apsActions}>
          <MiniLabel>Time is a production resource.</MiniLabel>
          <Actions target={target} />
        </div>
      </div>
      <div className={css.apsDescription}>
        <Description copy={copy} />
      </div>
      <figure className={css.ganttFigure}>
        <div className={css.ganttScroll}>
          <div className={css.ganttCanvas}>
            <div className={css.ganttDays}>
              <span>OPERATION</span>
              {["MON", "TUE", "WED", "THU", "FRI"].map((d) => (
                <span key={d}>{d}</span>
              ))}
            </div>
            {[
              ["Extrusion", "MO-0148", 1, 2],
              ["Printing", "MO-0148", 3, 1],
              ["Conversion", "MO-0147", 2, 2],
              ["Bag sealing", "MO-0146", 4, 1],
            ].map(([name, id, start, duration], i) => (
              <div className={css.ganttRow} key={name}>
                <span>
                  {name}
                  <small>{id}</small>
                </span>
                <div className={css.ganttLane}>
                  <span
                    className={i === 2 ? css.ganttAmber : css.ganttBlue}
                    style={{ gridColumn: `${start} / span ${duration}` }}
                  >
                    <Clock3 size={12} aria-hidden="true" />
                    {name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Caption>
          Illustrative sequence · Resource timing and dependencies deserve the
          same view.
        </Caption>
      </figure>
    </Frame>
  );
}

export function LineBoardHero({ copy, target }: HeroProps) {
  return (
    <Frame copy={copy} concept="line-planning-board" className={css.lineFrame}>
      <header className={css.lineHeader}>
        <Eyebrow>{copy.category}</Eyebrow>
        <Title copy={copy} inline />
      </header>
      <div className={css.lineComposition}>
        <div className={css.lineLead}>
          <Description copy={copy} />
          <Actions target={target} />
          <span className={css.lineFooter}>
            <span className={css.statusDot} />A shared reference for the floor.
          </span>
        </div>
        <figure className={css.lineLanes}>
          <div className={css.lineLane}>
            <MiniLabel>01 / Ready</MiniLabel>
            <div>
              <span>A-02</span>
              <h2>Zipper bags</h2>
              <p>MO-0146</p>
              <i />
            </div>
          </div>
          <div className={css.lineLane}>
            <MiniLabel>02 / Running</MiniLabel>
            <div className={css.runningCard}>
              <span>A-01</span>
              <h2>PE bags</h2>
              <p>MO-0148</p>
              <i style={{ width: "72%" }} />
              <strong>72% recorded</strong>
            </div>
          </div>
          <div className={css.lineLane}>
            <MiniLabel>03 / Attention</MiniLabel>
            <div className={css.attentionCard}>
              <span>B-02</span>
              <h2>Cartons</h2>
              <p>MO-0147</p>
              <TriangleAlert size={18} aria-hidden="true" />
              <strong>Material review</strong>
            </div>
          </div>
          <Caption>
            Illustrative assignments · Know what is ready, running and waiting.
          </Caption>
        </figure>
      </div>
    </Frame>
  );
}

export function AllocationHero({ copy, target }: HeroProps) {
  return (
    <Frame
      copy={copy}
      concept="order-allocation"
      className={css.allocationFrame}
    >
      <div className={css.allocationLayout}>
        <header>
          <Eyebrow>{copy.category}</Eyebrow>
          <Title copy={copy} />
        </header>
        <figure className={css.allocationDiagram}>
          <MiniLabel>MO-0147 / Sample allocation</MiniLabel>
          <div className={css.allocationQuantity}>
            <span>Order quantity</span>
            <strong>1,800</strong>
            <small>units to place</small>
          </div>
          <div className={css.allocationFork} aria-hidden="true">
            <ArrowDown size={18} />
            <ArrowDown size={18} />
          </div>
          <div className={css.allocationTargets}>
            <div>
              <Check size={15} aria-hidden="true" />
              <span>Line B-02</span>
              <strong>900</strong>
              <small>allocated</small>
            </div>
            <div>
              <ArrowRight size={15} aria-hidden="true" />
              <span>Capacity to review</span>
              <strong>900</strong>
              <small>still to assign</small>
            </div>
          </div>
          <Caption>Allocate the quantity. Keep the remainder visible.</Caption>
        </figure>
        <div className={css.allocationLead}>
          <Description copy={copy} />
        </div>
        <Actions target={target} />
      </div>
    </Frame>
  );
}
