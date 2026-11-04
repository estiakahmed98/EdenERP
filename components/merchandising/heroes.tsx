import {
  ArrowRight,
  CalendarDays,
  Check,
  ClipboardList,
  Factory,
  Layers,
  LockKeyhole,
  Package,
  Scissors,
  ShieldCheck,
  Shirt,
  Users,
} from "lucide-react";
import { pages, type MerchandisingSlug } from "./data";
import { Actions, Badge, Curve, Garment, Progress, Tag, css } from "./ui";
function Copy({ slug }: { slug: MerchandisingSlug }) {
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

function DashboardHero() {
  return (
    <section className={css.dashboardHero}>
      <div className={css.wrap}>
        <div className={css.briefLayout}>
          <div className={css.briefCopy}>
            <div className={css.edition}>
              <span>THE ORDER DESK</span>
              <span>VOL. 01 / SUPPLIED SNAPSHOT</span>
            </div>
            <Copy slug="merchandising-dashboard" />
            <Actions />
            <div className={css.briefFooter}>
              <span>04 NOV 2026</span>
              <p>
                A morning view.
                <br />A more considered follow-up.
              </p>
            </div>
          </div>
          <figure className={css.briefBoard}>
            <div className={css.riskTile}>
              <span>THE PRIORITY SIGNAL</span>
              <strong>
                14<span>orders at risk</span>
              </strong>
              <p>Of 16 open orders in the supplied brief.</p>
              <div className={css.riskDots}>
                {Array.from({ length: 16 }, (_, i) => (
                  <i key={i} data-risk={i < 14} />
                ))}
              </div>
            </div>
            <div className={css.actionTile}>
              <CalendarDays size={21} />
              <b>64</b>
              <span>late milestones</span>
              <small>7 due in 7 days · source</small>
            </div>
            <div className={css.materialTile}>
              <Layers size={22} />
              <b>8</b>
              <span>orders with shortages</span>
            </div>
            <div className={css.moneyTile}>
              <span>THE COMMERCIAL CONTEXT</span>
              <b>USD 1,826,227</b>
              <small>Value of open orders · supplied snapshot</small>
            </div>
            <figcaption>Supplied historical brief · 4 November 2026</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
function StylesHero() {
  return (
    <section className={css.stylesHero}>
      <div className={`${css.wrap} ${css.stylesLayout}`}>
        <figure className={css.specBoard}>
          <div className={css.specHeader}>
            <span>STYLE NOTES / 8010</span>
            <Scissors size={17} />
          </div>
          <div className={css.specDrawing}>
            <Garment />
            <span className={css.dimensionLine} />
            <span className={css.specAnnotation}>
              the details
              <br />
              make the difference
              <Curve />
            </span>
          </div>
          <div className={css.swatches}>
            <i />
            <i />
            <i />
            <span>Conceptual fabric palette</span>
          </div>
          <div className={css.costSlip}>
            <span>SUPPLIED COMMERCIALS</span>
            <div>
              <span>Cost / pc</span>
              <b>USD 15.02</b>
            </div>
            <div>
              <span>Confirmed FOB</span>
              <b>USD 16.40</b>
            </div>
            <Tag>8.4% · source margin</Tag>
          </div>
          <figcaption>
            Conceptual garment drawing · source style 8010 figures
          </figcaption>
        </figure>
        <div>
          <Copy slug="styles-costing" />
          <Actions />
          <p className={css.quietLine}>
            <Shirt size={15} /> Specification. Development. Commercials.
          </p>
        </div>
      </div>
    </section>
  );
}
function TnaHero() {
  return (
    <section className={css.tnaHero}>
      <div className={css.wrap}>
        <div className={css.tnaHeading}>
          <div>
            <Copy slug="tna-calendar" />
          </div>
          <div className={css.dateFlag}>
            <span>TIME IS A SHARED RESPONSIBILITY</span>
            <b>
              Plan.
              <br />
              Own.
              <br />
              <em>Follow through.</em>
            </b>
          </div>
        </div>
        <Actions />
        <figure className={css.calendarScene}>
          <header>
            <span>
              <CalendarDays size={17} /> OCTOBER / 2026
            </span>
            <Badge>Selected order · SC-2026-000017</Badge>
          </header>
          <div className={css.milestoneRail}>
            {[
              { day: "02", label: "Fabric booking", kind: "Material" },
              { day: "07", label: "Lab dip approval", kind: "Approval" },
              { day: "09", label: "1st fit sample", kind: "Sample" },
              { day: "16", label: "Fit comments", kind: "Approval" },
              { day: "22", label: "2nd fit sample", kind: "Sample" },
            ].map((row, i) => (
              <div key={row.day}>
                <span>
                  OCT <b>{row.day}</b>
                </span>
                <i data-kind={i % 3} />
                <h3>{row.label}</h3>
                <small>{row.kind}</small>
              </div>
            ))}
          </div>
          <figcaption>
            Five October plan dates from the visible source excerpt · not a full
            calendar
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
function MaterialsHero() {
  return (
    <section className={css.materialsHero}>
      <div className={`${css.wrap} ${css.materialsLayout}`}>
        <div>
          <Copy slug="material-booking" />
          <Actions />
          <div className={css.materialLegend}>
            <span>
              <i />
              Booked
            </span>
            <span>
              <i />
              In-house
            </span>
            <span>
              <i />
              Gap to investigate
            </span>
          </div>
        </div>
        <figure className={css.materialLibrary}>
          <div className={css.materialShelf}>
            <div>
              <span>01 / DENIM</span>
              <i className={css.fabricDenim} />
              <b>Fabric</b>
            </div>
            <div>
              <span>02 / HARDWARE</span>
              <i className={css.fabricTrim} />
              <b>Trims</b>
            </div>
            <div>
              <span>03 / FINISHING</span>
              <i className={css.fabricLabel} />
              <b>Accessories</b>
            </div>
          </div>
          <div className={css.readinessCard}>
            <span>SOURCE ORDER / 000001 · STYLE 6026</span>
            <Progress label="Material lines booked" value={16} total={16} />
            <Progress
              label="Material lines in-house"
              value={4}
              total={16}
              green
            />
            <div>
              <Tag tone="red">12 lines short</Tag>
              <span>PCD · 19 July 2026</span>
            </div>
          </div>
          <span className={css.libraryAnnotation}>
            booked isn’t in-house
            <Curve />
          </span>
          <figcaption>
            Conceptual material swatches · supplied readiness counts
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
function ProductionHero() {
  return (
    <section className={css.productionHero}>
      <div className={css.wrap}>
        <div className={css.productionHeading}>
          <Copy slug="production-follow-up" />
          <Actions />
        </div>
        <figure className={css.productionScene}>
          <div className={css.productionIdentity}>
            <span>ORDER / SC-2026-000004</span>
            <h3>
              5343 <small>Slim Straight Jean</small>
            </h3>
            <Tag tone="red">Behind plan · source status</Tag>
          </div>
          <div className={css.productionStations}>
            <div>
              <span>01 / ORDERED</span>
              <Shirt size={28} />
              <b>8,400</b>
              <small>pieces ordered</small>
            </div>
            <ArrowRight size={24} />
            <div>
              <span>02 / SEWN</span>
              <Scissors size={28} />
              <b>7,002</b>
              <small>source sewn quantity</small>
              <i style={{ width: "83.36%" }} />
            </div>
            <ArrowRight size={24} />
            <div>
              <span>03 / PACKED</span>
              <Package size={28} />
              <b>5,078</b>
              <small>source packed quantity</small>
              <i style={{ width: "60.45%" }} />
            </div>
          </div>
          <figcaption>
            A production snapshot, not a reconstructed daily output curve
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
function FactoriesHero() {
  return (
    <section className={css.factoriesHero}>
      <div className={`${css.wrap} ${css.factoriesLayout}`}>
        <div>
          <Copy slug="factories" />
          <Actions />
          <div className={css.partnerCount}>
            <b>2</b>
            <span>
              factories in the
              <br />
              supplied network
            </span>
            <i />
            <b>6,440</b>
            <span>
              pieces
              <br />
              in progress
            </span>
          </div>
        </div>
        <figure className={css.factoryDossier}>
          <header>
            <span>FACTORY DOSSIER / 01</span>
            <Factory size={20} />
          </header>
          <div className={css.buildingDrawing}>
            <div className={css.factoryChimney} />
            <div className={css.factoryRoof} />
            <div className={css.factoryWindows}>
              {Array.from({ length: 12 }, (_, i) => (
                <i key={i} />
              ))}
            </div>
            <span>MYMENSINGH APPAREL LTD</span>
          </div>
          <div className={css.dossierStats}>
            <div>
              <b>6</b>
              <span>lines</span>
            </div>
            <div>
              <b>260</b>
              <span>machines</span>
            </div>
            <div>
              <b>4,200</b>
              <span>pcs / day</span>
            </div>
          </div>
          <div className={css.complianceNote}>
            <ShieldCheck size={18} />
            <span>
              Capability and compliance flags,
              <br />
              kept in the same profile.
            </span>
          </div>
          <figcaption>
            Conceptual facility illustration · source factory capacity
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
function ReceiptsHero() {
  return (
    <section className={css.receiptsHero}>
      <div className={`${css.wrap} ${css.receiptsLayout}`}>
        <div>
          <Copy slug="in-house-receipts" />
          <Actions />
          <div className={css.receiptHeadline}>
            <b>8,400</b>
            <span>
              posted pieces
              <br />
              in the supplied register
            </span>
          </div>
        </div>
        <figure className={css.receivingScene}>
          <div className={css.cartonStack}>
            <div>
              <Package size={30} />
              <span>OUR STOCK</span>
            </div>
            <div>
              <Package size={30} />
              <span>BUYER’S GOODS</span>
            </div>
            <div>
              <Package size={30} />
              <span>MEMO</span>
            </div>
          </div>
          <div className={css.receivingDocket}>
            <header>
              <ClipboardList size={22} />
              <span>GOODS RECEIVED / SOURCE EXCERPT</span>
            </header>
            <b>FR-2026-000002</b>
            <span>18 SEPTEMBER 2026</span>
            <div>
              <span>Received</span>
              <strong>3,000 pcs</strong>
            </div>
            <div>
              <span>Packing</span>
              <strong>300 cartons</strong>
            </div>
            <div>
              <span>Ownership</span>
              <Tag tone="green">Our stock</Tag>
            </div>
            <footer>
              <Check size={14} /> Posted · supplied status
            </footer>
          </div>
          <figcaption>
            Conceptual carton composition · supplied receipt details
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
function ProfitHero() {
  return (
    <section className={css.profitHero}>
      <div className={css.wrap}>
        <div className={css.centerCopy}>
          <Copy slug="profitability" />
          <Actions />
        </div>
        <figure className={css.profitStatement}>
          <div className={css.profitStatementTop}>
            <span>ACTUALS / BASE CURRENCY · BDT</span>
            <Badge>17 orders · source aggregate</Badge>
          </div>
          <div className={css.profitNumber}>
            <span>Net result in the supplied report</span>
            <b>13,790,555</b>
            <p>30.9% actual margin · 14.3% quoted</p>
          </div>
          <div className={css.revenueSplit}>
            <div />
            <div />
          </div>
          <div className={css.profitParts}>
            <div>
              <span>Revenue</span>
              <b>44,706,064</b>
            </div>
            <span>−</span>
            <div>
              <span>Cost of goods shipped</span>
              <b>30,915,509</b>
            </div>
            <span>=</span>
            <div>
              <span>Net</span>
              <b>13,790,555</b>
            </div>
          </div>
          <figcaption>
            Supplied report actuals · per-piece order-currency values stay
            separate
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
function PortalHero() {
  return (
    <section className={css.portalHero}>
      <div className={`${css.wrap} ${css.portalLayout}`}>
        <div>
          <Copy slug="buyer-portal" />
          <Actions />
          <div className={css.accessPrinciple}>
            <LockKeyhole size={18} />
            <span>
              The buyer’s context.
              <br />
              The role’s boundary.
            </span>
          </div>
        </div>
        <figure className={css.portalWindow}>
          <header>
            <span className={css.windowDots}>
              <i />
              <i />
              <i />
            </span>
            <span>BUYER WORKSPACE / CONCEPT PREVIEW</span>
            <LockKeyhole size={13} />
          </header>
          <div className={css.portalWelcome}>
            <span>BUYER PROFILE</span>
            <h3>American Eagle Outfitters</h3>
            <small>via Li & Fung BD · source account</small>
          </div>
          <div className={css.portalTabs}>
            <span>Samples</span>
            <span>TNA</span>
            <span>Shipments</span>
            <span>Documents</span>
          </div>
          <div className={css.roleCard}>
            <span className={css.roleAvatar}>
              <Users size={19} />
            </span>
            <div>
              <b>Merchandiser</b>
              <span>Sample decisions · source permission</span>
            </div>
            <Check size={17} />
          </div>
          <div className={css.roleCard}>
            <span className={css.roleAvatar}>
              <ShieldCheck size={19} />
            </span>
            <div>
              <b>QA</b>
              <span>View only · source permission</span>
            </div>
            <LockKeyhole size={16} />
          </div>
          <div className={css.portalBoundary}>
            <span>One buyer profile</span>
            <i />
            <span>Explicit roles</span>
          </div>
          <figcaption>
            Role illustration only · no sign-in or access grant is performed
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
const heroes = {
  "merchandising-dashboard": DashboardHero,
  "styles-costing": StylesHero,
  "tna-calendar": TnaHero,
  "material-booking": MaterialsHero,
  "production-follow-up": ProductionHero,
  factories: FactoriesHero,
  "in-house-receipts": ReceiptsHero,
  profitability: ProfitHero,
  "buyer-portal": PortalHero,
};
export default function MerchandisingHero({
  slug,
}: {
  slug: MerchandisingSlug;
}) {
  const Hero = heroes[slug];
  return <Hero />;
}
