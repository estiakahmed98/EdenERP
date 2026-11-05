import {
  CalendarDays,
  Factory,
  FileText,
  Layers,
  Scissors,
  Shirt,
  Users,
} from "lucide-react";
import { milestoneDates, sizeBreakdown } from "./calculations";
import {
  dateLabel,
  examplePcd,
  milestones,
  num,
  pages,
  sizes,
  type ApparelSlug,
} from "./data";
import { Actions, Badge, GarmentDrawing, TrimDrawing, css } from "./ui";
function Copy({ slug }: { slug: ApparelSlug }) {
  const p = pages[slug];
  return (
    <>
      <p className={css.eyebrow}>{p.eyebrow}</p>
      <h1>
        {p.headline}
        <br />
        <em>{p.accent}</em>
      </h1>
      <p className={css.lead}>{p.description}</p>
    </>
  );
}
function GarmentsHero() {
  const pieces = sizeBreakdown(
    3000,
    sizes.map((row) => row.ratio),
  );
  return (
    <section className={css.garmentsHero}>
      <div className={`${css.wrap} ${css.garmentsLayout}`}>
        <div>
          <Copy slug="garments" />
          <Actions />
          <div className={css.garmentPrinciples}>
            <span>
              <Scissors size={15} />
              Breakdown
            </span>
            <span>
              <Shirt size={15} />
              Production
            </span>
            <span>
              <FileText size={15} />
              Review
            </span>
          </div>
        </div>
        <figure className={css.patternSheet}>
          <header>
            <span>THE ORDER, PIECE BY PIECE</span>
            <Badge>Concept pattern sheet</Badge>
          </header>
          <div className={css.patternArt}>
            <GarmentDrawing />
            <div className={css.patternLabel}>
              <span>EX-ORDER-01</span>
              <b>3,000 pieces</b>
              <small>Size ratio · 1 : 2 : 2 : 1</small>
            </div>
            <span className={css.patternCorner}>SIZE / MATERIAL / PROCESS</span>
          </div>
          <div className={css.sizeRibbon}>
            {sizes.map((row, i) => (
              <div key={row.label}>
                <span>{row.label}</span>
                <b>{num(pieces[i])}</b>
                <small>example pieces</small>
              </div>
            ))}
          </div>
          <figcaption>
            Conceptual garment drawing and fictional order breakdown · not a
            physical cutting plan
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
function AccessoriesHero() {
  return (
    <section className={css.accessoriesHero}>
      <div className={css.wrap}>
        <div className={css.centerCopy}>
          <Copy slug="accessories" />
          <Actions />
        </div>
        <figure className={css.trimOrganiser}>
          <header>
            <span>THE DETAILS DRAWER</span>
            <Badge>Concept accessory library</Badge>
          </header>
          <div className={css.trimPockets}>
            {(
              [
                {
                  kind: "button",
                  title: "Buttons",
                  note: "Count the fastening detail",
                },
                { kind: "zip", title: "Zips", note: "Keep the unit explicit" },
                {
                  kind: "label",
                  title: "Labels",
                  note: "Connect identity with the item",
                },
                {
                  kind: "tag",
                  title: "Hang tags",
                  note: "Follow the finishing context",
                },
              ] as const
            ).map((row, i) => (
              <div key={row.kind}>
                <span>0{i + 1} / PIECE DETAIL</span>
                <TrimDrawing kind={row.kind} />
                <b>{row.title}</b>
                <small>{row.note}</small>
              </div>
            ))}
          </div>
          <div className={css.trimCallout}>
            <span>Small details, kept in the picture.</span>
            <svg viewBox="0 0 120 45" fill="none" aria-hidden="true">
              <path
                d="M3 3c25 39 71 41 109 13m-19 2 21-5-6 19"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <figcaption>
            Concept illustrations · no actual accessory specification or stock
            is implied
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
function BuyingHouseHero() {
  return (
    <section className={css.buyingHero}>
      <div className={`${css.wrap} ${css.buyingLayout}`}>
        <figure className={css.coordinationMap}>
          <div className={css.mapGrid} />
          <div className={css.buyerNode}>
            <Users size={23} />
            <span>BUYER CONTEXT</span>
            <b>The order brief</b>
          </div>
          <div className={css.coordinationLine} />
          <div className={css.factoryNode}>
            <Factory size={23} />
            <span>FACTORY CONTEXT</span>
            <b>The production handoff</b>
          </div>
          <div className={css.orderDossier}>
            <header>
              <FileText size={20} />
              <span>EX-BH-01 / CONCEPT DOSSIER</span>
            </header>
            <h3>
              The commercial model
              <br />
              belongs in the record.
            </h3>
            <div>
              <span>Margin trading</span>
              <small>Sales and purchase-cost context</small>
            </div>
            <div>
              <span>Commission</span>
              <small>A fee basis, kept distinct</small>
            </div>
          </div>
          <figcaption>
            Conceptual coordination map · no real buyer, factory assignment or
            order
          </figcaption>
        </figure>
        <div>
          <Copy slug="buying-house" />
          <Actions />
          <p className={css.buyingFootnote}>
            A clear handoff starts with a clear commercial context.
          </p>
        </div>
      </div>
    </section>
  );
}
function MerchandisingHero() {
  const dates = milestoneDates(
    examplePcd,
    milestones.map((row) => row.days),
  );
  return (
    <section className={css.merchandisingHero}>
      <div className={css.wrap}>
        <div className={css.merchandisingHeading}>
          <div>
            <Copy slug="merchandising" />
            <Actions />
          </div>
          <div className={css.pcdFlag}>
            <CalendarDays size={23} />
            <span>ILLUSTRATIVE PLANNED CUTTING DATE</span>
            <b>
              15 <em>DEC</em>
            </b>
            <small>2026 / calendar-day example</small>
          </div>
        </div>
        <figure className={css.actionDesk}>
          <div className={css.styleFolder}>
            <header>
              <Shirt size={18} />
              <span>EX-STYLE-01 / CONCEPT</span>
            </header>
            <GarmentDrawing />
            <div>
              <span>Style brief</span>
              <small>Specification and commercial context</small>
            </div>
          </div>
          <div className={css.actionSpine}>
            <header>
              <span>WORK BACK FROM THE NEXT HANDOFF</span>
              <Badge>Example date offsets</Badge>
            </header>
            {milestones.map((row, i) => (
              <div key={row.id}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <b>{row.name}</b>
                  <small>{row.days} calendar days before example PCD</small>
                </div>
                <strong>{dateLabel(dates[i])}</strong>
              </div>
            ))}
          </div>
          <div className={css.materialMemo}>
            <Layers size={20} />
            <b>
              Keep material readiness
              <br />
              in the conversation.
            </b>
            <span>A date is one part of the order’s context.</span>
          </div>
          <figcaption>
            Illustrative style/action composition · no source TNA milestones are
            changed
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
const heroes = {
  garments: GarmentsHero,
  accessories: AccessoriesHero,
  "buying-house": BuyingHouseHero,
  merchandising: MerchandisingHero,
};
export default function ApparelHero({ slug }: { slug: ApparelSlug }) {
  const Hero = heroes[slug];
  return <Hero />;
}
