import {
  ArrowRight,
  BookOpen,
  Clapperboard,
  FileText,
  HeartHandshake,
  Layers,
  Package,
  ShoppingBag,
  Wallet,
} from "lucide-react";
import { money, pages, products, segments, type OtherIndustry } from "./data";
import { Actions, Badge, ProductArt, css } from "./ui";
function Copy({ slug }: { slug: OtherIndustry }) {
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
function EcommerceHero() {
  return (
    <section className={css.ecommerceHero}>
      <div className={`${css.wrap} ${css.ecommerceLayout}`}>
        <div>
          <Copy slug="ecommerce" />
          <Actions />
          <div className={css.commercePrinciples}>
            <span>
              <ShoppingBag size={15} />
              Product
            </span>
            <span>
              <Package size={15} />
              Order
            </span>
            <span>
              <FileText size={15} />
              Business context
            </span>
          </div>
        </div>
        <figure className={css.storefront}>
          <header>
            <b>THE EVERYDAY EDIT</b>
            <Badge>Fictional storefront</Badge>
          </header>
          <div className={css.storeTitle}>
            <span>THOUGHTFUL EVERYDAY OBJECTS</span>
            <h3>
              A little order.
              <br />A lot of possibility.
            </h3>
          </div>
          <div className={css.heroProducts}>
            {products.map((product, i) => (
              <div key={product.id} data-art={product.art}>
                <ProductArt kind={product.art} />
                <span>
                  0{i + 1} / {product.category}
                </span>
                <b>{product.name}</b>
                <small>{money(product.price)}</small>
              </div>
            ))}
          </div>
          <div className={css.orderSlip}>
            <span>
              <ShoppingBag size={16} /> AN EXAMPLE BASKET
            </span>
            <b>Product → Quantity → Total</b>
            <small>A readable path into the order conversation.</small>
          </div>
          <figcaption>
            Concept storefront and product illustrations · not a live catalogue
            or shop
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
function NgoHero() {
  return (
    <section className={css.ngoHero}>
      <div className={css.wrap}>
        <div className={css.centerCopy}>
          <Copy slug="ngo" />
          <Actions />
        </div>
        <figure className={css.purposeScene}>
          <div className={css.purposeRibbon}>
            <div>
              <span>
                <HeartHandshake size={26} />
              </span>
              <b>Purpose</b>
              <small>The programme context</small>
            </div>
            <i />
            <div>
              <span>
                <Wallet size={26} />
              </span>
              <b>Funds</b>
              <small>The planning context</small>
            </div>
            <i />
            <div>
              <span>
                <Layers size={26} />
              </span>
              <b>Activities</b>
              <small>The operational detail</small>
            </div>
            <i />
            <div>
              <span>
                <BookOpen size={26} />
              </span>
              <b>Records</b>
              <small>The evidence to explore</small>
            </div>
          </div>
          <div className={css.programmeDossier}>
            <header>
              <span>EXAMPLE PLANNING DOSSIER</span>
              <Badge>Illustrative, not donated funds</Badge>
            </header>
            <div className={css.budgetHeadline}>
              <span>Local planning budget</span>
              <b>BDT 100,000</b>
              <small>No donor, beneficiary or impact claim.</small>
            </div>
            <div className={css.budgetBands}>
              <i />
              <i />
              <i />
            </div>
            <div className={css.budgetLegend}>
              <span>Programme A · 35%</span>
              <span>Programme B · 45%</span>
              <span>Shared operations · 20%</span>
            </div>
          </div>
          <span className={css.purposeNote}>
            the purpose and the detail, together
            <svg viewBox="0 0 130 65" fill="none" aria-hidden="true">
              <path
                d="M4 8c25 50 78 50 113 17m-22 2 24-5-4 22"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <figcaption>
            Conceptual programme-to-record illustration · all amounts and labels
            are fictional
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
function TvHero() {
  return (
    <section className={css.tvHero}>
      <div className={css.wrap}>
        <div className={css.tvHeading}>
          <div>
            <Copy slug="tv" />
            <Actions />
          </div>
          <aside className={css.productionNotes}>
            <Clapperboard size={26} />
            <span>THE WORK BEHIND THE SCREEN</span>
            <p>
              Planning.
              <br />
              Resources.
              <br />
              <b>The commercial context.</b>
            </p>
          </aside>
        </div>
        <figure className={css.broadcastScene}>
          <div className={css.programmeFrame}>
            <header>
              <span>PROGRAMME / CONCEPT VIEW</span>
              <Badge>Not a broadcast signal</Badge>
            </header>
            <div className={css.screenComposition}>
              <div className={css.viewfinderCorners} />
              <svg viewBox="0 0 390 150" fill="none" aria-hidden="true">
                <circle
                  cx="190"
                  cy="73"
                  r="53"
                  stroke="currentColor"
                  strokeOpacity=".25"
                />
                <circle
                  cx="190"
                  cy="73"
                  r="36"
                  stroke="currentColor"
                  strokeOpacity=".5"
                />
                <path
                  d="M71 73h47m144 0h48M190 4v21m0 96v22M142 27l96 92m0-92-96 92"
                  stroke="currentColor"
                  strokeOpacity=".35"
                />
                <rect
                  x="166"
                  y="50"
                  width="48"
                  height="46"
                  rx="9"
                  fill="var(--industry-wash)"
                  stroke="currentColor"
                />
                <path
                  d="M179 61h22m-22 10h22m-22 10h14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
              <div>
                <span>THE PROGRAMME STORY</span>
                <b>Brief → Plan → Handoff</b>
              </div>
            </div>
          </div>
          <div className={css.rundownStrip}>
            <header>
              <span>AN ILLUSTRATIVE RUNDOWN</span>
              <b>05 segments</b>
            </header>
            {segments.map((segment, i) => (
              <div key={segment.id}>
                <span>0{i + 1}</span>
                <b>{segment.title}</b>
                <small>{segment.duration}</small>
              </div>
            ))}
            <p>
              <ArrowRight size={14} />
              Explore timing in the local example below.
            </p>
          </div>
          <figcaption>
            Concept production canvas · no live transmission, video playback or
            audience data
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
const heroes = { ecommerce: EcommerceHero, ngo: NgoHero, tv: TvHero };
export default function OtherIndustryHero({ slug }: { slug: OtherIndustry }) {
  const Hero = heroes[slug];
  return <Hero />;
}
