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
import { useTranslations } from "next-intl";
function Copy({ slug }: { slug: OtherIndustry }) {
  const t = useTranslations("pages.industriesApp");
  const p = pages(t)[slug];
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
  const t = useTranslations("pages.industriesApp");
  return (
    <section className={css.ecommerceHero}>
      <div className={`${css.wrap} ${css.ecommerceLayout}`}>
        <div>
          <Copy slug="ecommerce" />
          <Actions />
          <div className={css.commercePrinciples}>
            <span>
              <ShoppingBag size={15} />
              {t("others.heroes.product")}
            </span>
            <span>
              <Package size={15} />
              {t("others.heroes.order")}
            </span>
            <span>
              <FileText size={15} />
              {t("others.heroes.businessContext")}
            </span>
          </div>
        </div>
        <figure className={css.storefront}>
          <header>
            <b>{t("others.heroes.theEverydayEdit")}</b>
            <Badge>{t("others.heroes.fictionalStorefront")}</Badge>
          </header>
          <div className={css.storeTitle}>
            <span>{t("others.heroes.thoughtfulEverydayObjects")}</span>
            <h3>
              {t("others.heroes.aLittleOrder")}
              <br />{t("others.heroes.aLotOfPossibility")}
            </h3>
          </div>
          <div className={css.heroProducts}>
            {products(t).map((product, i) => (
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
              <ShoppingBag size={16} />{" "}{t("others.heroes.anExampleBasket")}
            </span>
            <b>{t("others.heroes.productQuantityTotal")}</b>
            <small>{t("others.heroes.aReadablePathIntoTheOrder")}</small>
          </div>
          <figcaption>
            {t("others.heroes.conceptStorefrontAndProductIllustrations")}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
function NgoHero() {
  const t = useTranslations("pages.industriesApp");
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
              <b>{t("others.heroes.purpose")}</b>
              <small>{t("others.heroes.theProgrammeContext")}</small>
            </div>
            <i />
            <div>
              <span>
                <Wallet size={26} />
              </span>
              <b>{t("others.heroes.funds")}</b>
              <small>{t("others.heroes.thePlanningContext")}</small>
            </div>
            <i />
            <div>
              <span>
                <Layers size={26} />
              </span>
              <b>{t("others.heroes.activities")}</b>
              <small>{t("others.heroes.theOperationalDetail")}</small>
            </div>
            <i />
            <div>
              <span>
                <BookOpen size={26} />
              </span>
              <b>{t("others.heroes.records")}</b>
              <small>{t("others.heroes.theEvidenceToExplore")}</small>
            </div>
          </div>
          <div className={css.programmeDossier}>
            <header>
              <span>{t("others.heroes.examplePlanningDossier")}</span>
              <Badge>{t("others.heroes.illustrativeNotDonatedFunds")}</Badge>
            </header>
            <div className={css.budgetHeadline}>
              <span>{t("others.heroes.localPlanningBudget")}</span>
              <b>{t("others.heroes.bdt100000")}</b>
              <small>{t("others.heroes.noDonorBeneficiaryOrImpactClaim")}</small>
            </div>
            <div className={css.budgetBands}>
              <i />
              <i />
              <i />
            </div>
            <div className={css.budgetLegend}>
              <span>{t("others.heroes.programmeA35")}</span>
              <span>{t("others.heroes.programmeB45")}</span>
              <span>{t("others.heroes.sharedOperations20")}</span>
            </div>
          </div>
          <span className={css.purposeNote}>
            {t("others.heroes.thePurposeAndTheDetailTogether")}
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
            {t("others.heroes.conceptualProgrammeToRecordIllustrationA")}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
function TvHero() {
  const t = useTranslations("pages.industriesApp");
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
            <span>{t("others.heroes.theWorkBehindTheScreen")}</span>
            <p>
              {t("others.heroes.planning")}
              <br />
              {t("others.heroes.resources")}
              <br />
              <b>{t("others.heroes.theCommercialContext")}</b>
            </p>
          </aside>
        </div>
        <figure className={css.broadcastScene}>
          <div className={css.programmeFrame}>
            <header>
              <span>{t("others.heroes.programmeConceptView")}</span>
              <Badge>{t("others.heroes.notABroadcastSignal")}</Badge>
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
                <span>{t("others.heroes.theProgrammeStory")}</span>
                <b>{t("others.heroes.briefPlanHandoff")}</b>
              </div>
            </div>
          </div>
          <div className={css.rundownStrip}>
            <header>
              <span>{t("others.heroes.anIllustrativeRundown")}</span>
              <b>{t("others.heroes.n05Segments")}</b>
            </header>
            {segments(t).map((segment, i) => (
              <div key={segment.id}>
                <span>0{i + 1}</span>
                <b>{segment.title}</b>
                <small>{segment.duration}</small>
              </div>
            ))}
            <p>
              <ArrowRight size={14} />
              {t("others.heroes.exploreTimingInTheLocalExample")}
            </p>
          </div>
          <figcaption>
            {t("others.heroes.conceptProductionCanvasNoLiveTransmissio")}
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
