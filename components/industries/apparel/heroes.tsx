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
import { useTranslations } from "next-intl";
function Copy({ slug }: { slug: ApparelSlug }) {
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
function GarmentsHero() {
  const t = useTranslations("pages.industriesApp");
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
              {t("apparel.heroes.breakdown")}
            </span>
            <span>
              <Shirt size={15} />
              {t("apparel.heroes.production")}
            </span>
            <span>
              <FileText size={15} />
              {t("apparel.heroes.review")}
            </span>
          </div>
        </div>
        <figure className={css.patternSheet}>
          <header>
            <span>{t("apparel.heroes.theOrderPieceByPiece")}</span>
            <Badge>{t("apparel.heroes.conceptPatternSheet")}</Badge>
          </header>
          <div className={css.patternArt}>
            <GarmentDrawing />
            <div className={css.patternLabel}>
              <span>EX-ORDER-01</span>
              <b>{t("apparel.heroes.n3000Pieces")}</b>
              <small>{t("apparel.heroes.sizeRatio1221")}</small>
            </div>
            <span className={css.patternCorner}>{t("apparel.heroes.sizeMaterialProcess")}</span>
          </div>
          <div className={css.sizeRibbon}>
            {sizes.map((row, i) => (
              <div key={row.label}>
                <span>{row.label}</span>
                <b>{num(pieces[i])}</b>
                <small>{t("apparel.heroes.examplePieces")}</small>
              </div>
            ))}
          </div>
          <figcaption>
            {t("apparel.heroes.conceptualGarmentDrawingAndFictionalOrde")}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
function AccessoriesHero() {
  const t = useTranslations("pages.industriesApp");
  return (
    <section className={css.accessoriesHero}>
      <div className={css.wrap}>
        <div className={css.centerCopy}>
          <Copy slug="accessories" />
          <Actions />
        </div>
        <figure className={css.trimOrganiser}>
          <header>
            <span>{t("apparel.heroes.theDetailsDrawer")}</span>
            <Badge>{t("apparel.heroes.conceptAccessoryLibrary")}</Badge>
          </header>
          <div className={css.trimPockets}>
            {(
              [
                {
                  kind: "button",
                  title: t("apparel.heroes.buttons"),
                  note: t("apparel.heroes.countTheFasteningDetail"),
                },
                { kind: "zip", title: t("apparel.heroes.zips"), note: t("apparel.heroes.keepTheUnitExplicit") },
                {
                  kind: "label",
                  title: t("apparel.heroes.labels"),
                  note: t("apparel.heroes.connectIdentityWithTheItem"),
                },
                {
                  kind: "tag",
                  title: t("apparel.heroes.hangTags"),
                  note: t("apparel.heroes.followTheFinishingContext"),
                },
              ] as const
            ).map((row, i) => (
              <div key={row.kind}>
                <span>0{i + 1}{" "}{t("apparel.heroes.pieceDetail")}</span>
                <TrimDrawing kind={row.kind} />
                <b>{row.title}</b>
                <small>{row.note}</small>
              </div>
            ))}
          </div>
          <div className={css.trimCallout}>
            <span>{t("apparel.heroes.smallDetailsKeptInThePicture")}</span>
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
            {t("apparel.heroes.conceptIllustrationsNoActualAccessorySpe")}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
function BuyingHouseHero() {
  const t = useTranslations("pages.industriesApp");
  return (
    <section className={css.buyingHero}>
      <div className={`${css.wrap} ${css.buyingLayout}`}>
        <figure className={css.coordinationMap}>
          <div className={css.mapGrid} />
          <div className={css.buyerNode}>
            <Users size={23} />
            <span>{t("apparel.heroes.buyerContext")}</span>
            <b>{t("apparel.heroes.theOrderBrief")}</b>
          </div>
          <div className={css.coordinationLine} />
          <div className={css.factoryNode}>
            <Factory size={23} />
            <span>{t("apparel.heroes.factoryContext")}</span>
            <b>{t("apparel.heroes.theProductionHandoff")}</b>
          </div>
          <div className={css.orderDossier}>
            <header>
              <FileText size={20} />
              <span>{t("apparel.heroes.exBh01ConceptDossier")}</span>
            </header>
            <h3>
              {t("apparel.heroes.theCommercialModel")}
              <br />
              {t("apparel.heroes.belongsInTheRecord")}
            </h3>
            <div>
              <span>{t("apparel.heroes.marginTrading")}</span>
              <small>{t("apparel.heroes.salesAndPurchaseCostContext")}</small>
            </div>
            <div>
              <span>{t("apparel.heroes.commission")}</span>
              <small>{t("apparel.heroes.aFeeBasisKeptDistinct")}</small>
            </div>
          </div>
          <figcaption>
            {t("apparel.heroes.conceptualCoordinationMapNoRealBuyer")}
          </figcaption>
        </figure>
        <div>
          <Copy slug="buying-house" />
          <Actions />
          <p className={css.buyingFootnote}>
            {t("apparel.heroes.aClearHandoffStartsWithA")}
          </p>
        </div>
      </div>
    </section>
  );
}
function MerchandisingHero() {
  const t = useTranslations("pages.industriesApp");
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
            <span>{t("apparel.heroes.illustrativePlannedCuttingDate")}</span>
            <b>
              15 <em>{t("apparel.heroes.dec")}</em>
            </b>
            <small>{t("apparel.heroes.n2026CalendarDayExample")}</small>
          </div>
        </div>
        <figure className={css.actionDesk}>
          <div className={css.styleFolder}>
            <header>
              <Shirt size={18} />
              <span>{t("apparel.heroes.exStyle01Concept")}</span>
            </header>
            <GarmentDrawing />
            <div>
              <span>{t("apparel.heroes.styleBrief")}</span>
              <small>{t("apparel.heroes.specificationAndCommercialContext")}</small>
            </div>
          </div>
          <div className={css.actionSpine}>
            <header>
              <span>{t("apparel.heroes.workBackFromTheNextHandoff")}</span>
              <Badge>{t("apparel.heroes.exampleDateOffsets")}</Badge>
            </header>
            {milestones.map((row, i) => (
              <div key={row.id}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <b>{row.name}</b>
                  <small>{row.days}{" "}{t("apparel.heroes.calendarDaysBeforeExamplePcd")}</small>
                </div>
                <strong>{dateLabel(dates[i])}</strong>
              </div>
            ))}
          </div>
          <div className={css.materialMemo}>
            <Layers size={20} />
            <b>
              {t("apparel.heroes.keepMaterialReadiness")}
              <br />
              {t("apparel.heroes.inTheConversation")}
            </b>
            <span>{t("apparel.heroes.aDateIsOnePartOf")}</span>
          </div>
          <figcaption>
            {t("apparel.heroes.illustrativeStyleActionCompositionNoSour")}
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
