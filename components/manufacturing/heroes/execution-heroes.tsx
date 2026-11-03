import {
  Check,
  ChevronRight,
  CircleCheck,
  Factory,
  Recycle,
  Truck,
} from "lucide-react";
import { ManufacturingSketchRing } from "../design-system";
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

export function ProductionOrdersHero({ copy, target }: HeroProps) {
  return (
    <Frame
      copy={copy}
      concept="production-orders"
      className={css.travelerFrame}
    >
      <div className={css.travelerHeader}>
        <div>
          <Eyebrow>{copy.category}</Eyebrow>
          <Title copy={copy} inline />
        </div>
        <div>
          <Description copy={copy} />
          <Actions target={target} />
        </div>
      </div>
      <figure className={css.jobTicket}>
        <div className={css.ticketIdentity}>
          <MiniLabel>Production traveler / Supplied record</MiniLabel>
          <h2>MO-2026-000058</h2>
          <p>Alif Colour Coil 0.32 mm — Alif Blue (on AZ100)</p>
          <div className={css.ticketBarcode} aria-hidden="true" />
          <span className={css.ticketStatus}>In progress</span>
        </div>
        <div className={css.ticketProcess}>
          <div className={css.figureHeading}>
            <span>BOM-CCL-032-BLU</span>
            <strong>0%</strong>
          </div>
          <div className={css.ticketProgress}>
            <span style={{ width: "0%" }} />
          </div>
          <ol>
            {[
              "Planned: 32,000",
              "In progress",
              "Produced: 0",
              "Start date: —",
            ].map((step, i) => (
              <li
                key={step}
                className={
                  i === 0
                    ? css.ticketDone
                    : i === 1
                      ? css.ticketCurrent
                      : undefined
                }
              >
                <span>
                  {i === 0 ? <Check size={12} aria-hidden="true" /> : i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
          <div className={css.ticketOutput}>
            <span>Recorded output</span>
            <strong>
              0 <small>/ 32,000 planned</small>
            </strong>
          </div>
        </div>
        <Caption>
          One job reference carries materials, operations and output together.
        </Caption>
      </figure>
    </Frame>
  );
}

export function ShopFloorHero({ copy, target }: HeroProps) {
  return (
    <Frame copy={copy} concept="shop-floor" className={css.consoleFrame}>
      <div className={css.consoleLayout}>
        <div className={css.consoleCopy}>
          <Eyebrow>{copy.category}</Eyebrow>
          <Title copy={copy} />
          <Description copy={copy} />
          <Actions target={target} />
        </div>
        <figure className={css.operatorDisplay}>
          <div className={css.consoleReadout}>
            <span>
              <i />
              STATION A-01
            </span>
            <span>MO-0148 / OP-10</span>
          </div>
          <div className={css.operatorDial}>
            <svg
              viewBox="0 0 180 180"
              role="img"
              aria-label="Sample extrusion operation is 72 percent complete."
              fill="none"
            >
              <circle
                cx="90"
                cy="90"
                r="75"
                stroke="white"
                strokeOpacity=".08"
                strokeWidth="9"
              />
              <circle
                className={css.dialReveal}
                cx="90"
                cy="90"
                r="75"
                pathLength="100"
                stroke="#1088ef"
                strokeWidth="9"
                strokeDasharray="72 100"
                strokeLinecap="round"
                transform="rotate(-90 90 90)"
              />
              <text
                x="90"
                y="94"
                textAnchor="middle"
                fill="white"
                fontSize="40"
                fontWeight="600"
              >
                72%
              </text>
              <text
                x="90"
                y="117"
                textAnchor="middle"
                fill="#a9bdd8"
                fontSize="9"
              >
                OUTPUT RECORDED
              </text>
            </svg>
          </div>
          <div className={css.operatorJob}>
            <Factory size={20} aria-hidden="true" />
            <div>
              <h2>Film extrusion</h2>
              <p>1,728 / 2,400 target units</p>
            </div>
          </div>
          <Caption>
            Illustrative station view · Focus on the operation in front of you.
          </Caption>
        </figure>
        <div className={css.consoleQueue}>
          <span>THE NEXT HANDOFF</span>
          <p>
            Extrude <ChevronRight size={14} aria-hidden="true" /> Print{" "}
            <ChevronRight size={14} aria-hidden="true" /> Seal{" "}
            <ChevronRight size={14} aria-hidden="true" /> Inspect
          </p>
          <span className={css.consoleReady}>
            <CircleCheck size={14} aria-hidden="true" />
            Keep instructions at the station.
          </span>
        </div>
      </div>
    </Frame>
  );
}

export function ScrapHero({ copy, target }: HeroProps) {
  return (
    <Frame copy={copy} concept="scrap-waste" className={css.scrapFrame}>
      <div className={css.scrapHeader}>
        <Eyebrow>{copy.category}</Eyebrow>
        <Title copy={copy} inline />
        <Description copy={copy} />
      </div>
      <figure className={css.scrapCycle}>
        <div className={css.recoveryStream}>
          <MiniLabel>Clean paper offcuts</MiniLabel>
          <strong>
            <ManufacturingSketchRing>35 kg</ManufacturingSketchRing>
          </strong>
          <p>Recoverable material</p>
          <span>SCR-003 / Carton cutting</span>
        </div>
        <div className={css.cycleCenter}>
          <Diagram
            label="Illustration of a material recovery loop, separating recoverable offcuts from disposal waste."
            viewBox="0 0 260 230"
          >
            <path
              d="M77 37C166-9 250 96 194 166"
              stroke="var(--teal)"
              strokeWidth="2"
              strokeDasharray="5 7"
              className={css.movingDash}
            />
            <path
              d="m192 151 4 18 17-5"
              stroke="var(--teal)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M183 196C83 253-6 137 53 64"
              stroke="var(--primary)"
              strokeWidth="2"
            />
            <path
              d="m37 69 18-9 8 18"
              stroke="var(--primary)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle
              cx="130"
              cy="117"
              r="64"
              fill="var(--card)"
              stroke="var(--border)"
            />
            <Recycle
              x="107"
              y="88"
              width="46"
              height="46"
              color="var(--teal)"
              strokeWidth="1.2"
            />
            <text
              x="130"
              y="156"
              textAnchor="middle"
              fill="var(--ink)"
              fontSize="11"
            >
              REVIEW THE LOSS
            </text>
          </Diagram>
        </div>
        <div className={css.disposalStream}>
          <MiniLabel>Damaged seals</MiniLabel>
          <strong>8 kg</strong>
          <p>Disposal quantity</p>
          <span>SCR-004 / Temperature review</span>
        </div>
        <Caption>
          Two illustrative loss streams. Recovery and disposal tell different
          stories.
        </Caption>
      </figure>
      <div className={css.centerActions}>
        <Actions target={target} />
      </div>
    </Frame>
  );
}

export function SubcontractHero({ copy, target }: HeroProps) {
  return (
    <Frame copy={copy} concept="subcontracting" className={css.partnerFrame}>
      <header className={css.partnerHeader}>
        <Eyebrow>{copy.category}</Eyebrow>
        <Title copy={copy} inline />
      </header>
      <figure className={css.partnerBridge}>
        <div className={css.internalPartner}>
          <Factory size={46} strokeWidth={1.1} aria-hidden="true" />
          <MiniLabel>Your production floor</MiniLabel>
          <h2>Send the operation.</h2>
          <span>1,500 units sent</span>
        </div>
        <div className={css.bridgeConnector}>
          <span>SUB-001 · Lamination</span>
          <Diagram
            label="Illustrative outside processing: 1,500 units sent, 900 returned and 600 outstanding."
            viewBox="0 0 300 110"
          >
            <path
              d="M12 33C84 0 215 0 286 33"
              stroke="var(--primary)"
              strokeWidth="2"
            />
            <path
              d="m277 23 11 11-15 5"
              stroke="var(--primary)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M286 79C217 112 86 112 14 79"
              stroke="var(--teal)"
              strokeWidth="2"
              strokeDasharray="4 7"
              className={css.movingDash}
            />
            <path
              d="m25 73-13 6 10 11"
              stroke="var(--teal)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path d="M150 4V107" stroke="var(--border)" strokeDasharray="3 5" />
          </Diagram>
          <small>600 units remain outstanding</small>
        </div>
        <div className={css.externalPartner}>
          <Truck size={46} strokeWidth={1.1} aria-hidden="true" />
          <MiniLabel>Vendor resource A</MiniLabel>
          <h2>Keep the context.</h2>
          <span>900 units returned</span>
        </div>
        <Caption>
          Sample external operation · The production reference bridges both
          sides.
        </Caption>
      </figure>
      <div className={css.partnerFooter}>
        <Description copy={copy} />
        <Actions target={target} />
      </div>
    </Frame>
  );
}
