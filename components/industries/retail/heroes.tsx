import {
  ArrowUpRight,
  BookOpen,
  Boxes,
  Check,
  Palette,
  Tag,
} from "lucide-react";
import { pages, books, colours, money, type RetailSlug } from "./data";
import {
  Actions,
  Badge,
  CurvedNote,
  FixingArt,
  ProduceArt,
  RoomArt,
  ShirtArt,
  ToyArt,
  css,
} from "./ui";
import { useTranslations } from "next-intl";
function Copy({ slug }: { slug: RetailSlug }) {
  const t = useTranslations("pages.industriesApp");
  const p = pages(t)[slug];
  return (
    <>
      <p className={css.eyebrow}>{p.category}</p>
      <h1>
        {p.headline}
        <br />
        <em>{p.accent}</em>
      </h1>
      <p className={css.lead}>{p.description}</p>
    </>
  );
}
function BookHero() {
  const t = useTranslations("pages.industriesApp");
  return (
    <section className={css.bookHero}>
      <div className={`${css.wrap} ${css.bookLayout}`}>
        <div className={css.bookCopy}>
          <span className={css.edition}>{t("retail.heroes.retailNotesChapter01")}</span>
          <Copy slug="book-store" />
          <Actions />
          <p className={css.heroFoot}>{t("retail.heroes.theShelfTheReaderTheRecord")}</p>
        </div>
        <figure className={css.libraryScene}>
          <div className={css.shelfLabel}>
            <BookOpen size={17} />
            <span>{t("retail.heroes.theConsideredBookshelf")}</span>
          </div>
          <div className={css.bookDisplay}>
            <div className={css.featuredBook}>
              <span>{t("retail.heroes.exB01FictionalTitle")}</span>
              <b>
                {t("retail.heroes.the")}
                <br />
                {t("retail.heroes.quiet")}
                <br />
                <i>{t("retail.heroes.atlas")}</i>
              </b>
              <div className={css.bookOrbit} />
              <small>{t("retail.heroes.aCollectionOfImaginedJourneys")}</small>
            </div>
            <div className={css.bookSpines}>
              {books(t).slice(1).map((book) => (
                <div key={book.id} data-colour={book.colour}>
                  <span>{book.name}</span>
                  <small>{book.id}</small>
                </div>
              ))}
            </div>
          </div>
          <div className={css.shelfRule} />
          <div className={css.bookTicket}>
            <span>{t("retail.heroes.examplePaperback")}</span>
            <b>{money(450)}</b>
            <small>{t("retail.heroes.illustrativePriceNotAnOffer")}</small>
          </div>
          <CurvedNote>{t("retail.heroes.everyTitleHasAPlace")}</CurvedNote>
          <figcaption>
            {t("retail.heroes.conceptShelfFictionalTitlesIdentifiersAn")}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
function ClothingHero() {
  const t = useTranslations("pages.industriesApp");
  return (
    <section className={css.clothingHero}>
      <div className={css.wrap}>
        <div className={css.lookbookHeading}>
          <Badge>{t("retail.heroes.collectionConcept01")}</Badge>
          <Copy slug="clothing-store" />
          <Actions />
        </div>
        <figure className={css.lookbook}>
          <div className={css.swatchCard}>
            <Palette size={19} />
            <span>{t("retail.heroes.theColourStory")}</span>
            <div className={css.swatchDots}>
              {colours.map((c) => (
                <i key={c.id} style={{ background: c.hex }} />
              ))}
            </div>
            <b>{t("retail.heroes.navySageCream")}</b>
            <small>{t("retail.heroes.threeIllustrativeColourChoices")}</small>
          </div>
          <div className={css.garmentPlate}>
            <span>{t("retail.heroes.theEverydayOvershirtConceptFlat")}</span>
            <ShirtArt />
            <div className={css.plateRule} />
            <span>{t("retail.heroes.colourSizeStockContext")}</span>
          </div>
          <div className={css.variantCard}>
            <Tag size={18} />
            <span>{t("retail.heroes.exClNavyM")}</span>
            <b>
              {t("retail.heroes.aCollection")}
              <br />
              {t("retail.heroes.pieceByPiece")}
            </b>
            <div>
              S <span>M</span> L
            </div>
            <small>{t("retail.heroes.fictionalVariantIdentifiersAndStock")}</small>
          </div>
          <figcaption>
            {t("retail.heroes.aConceptualLookbookSeparateFromThe")}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
function FurnitureHero() {
  const t = useTranslations("pages.industriesApp");
  return (
    <section className={css.furnitureHero}>
      <div className={`${css.wrap} ${css.furnitureLayout}`}>
        <figure className={css.roomSheet}>
          <header>
            <span>{t("retail.heroes.theSmallShowroomConceptPlan")}</span>
            <ArrowUpRight size={18} />
          </header>
          <RoomArt />
          <div className={css.roomLegend}>
            <span>
              <i />
              {t("retail.heroes.studioSofa")}
            </span>
            <span>
              <i />
              {t("retail.heroes.readingChair")}
            </span>
            <span>
              <i />
              {t("retail.heroes.lowTable")}
            </span>
          </div>
          <div className={css.finishStrip}>
            <span>{t("retail.heroes.finishNotes")}</span>
            <i />
            <i />
            <i />
            <small>{t("retail.heroes.aChoiceBelongsInTheRecord")}</small>
          </div>
          <figcaption>
            {t("retail.heroes.illustrativeTopViewNotAScale")}
          </figcaption>
        </figure>
        <div className={css.furnitureCopy}>
          <Copy slug="furniture-store" />
          <Actions />
          <div className={css.materialSignature}>
            <span>{t("retail.heroes.n01ThePiece")}</span>
            <span>{t("retail.heroes.n02TheFinish")}</span>
            <span>{t("retail.heroes.n03TheHandoff")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
function GroceryHero() {
  const t = useTranslations("pages.industriesApp");
  return (
    <section className={css.groceryHero}>
      <div className={css.wrap}>
        <div className={css.groceryHeading}>
          <div>
            <Copy slug="grocery-store" />
            <Actions />
          </div>
          <div className={css.freshSeal}>
            <span>{t("retail.heroes.retail")}</span>
            <ProduceArt />
            <b>{t("retail.heroes.aShelfWithAStory")}</b>
            <small>{t("retail.heroes.conceptProduceIllustration")}</small>
          </div>
        </div>
        <figure className={css.freshLedger}>
          <div className={css.ledgerTitle}>
            <span>{t("retail.heroes.theShelfNotes")}</span>
            <b>
              {t("retail.heroes.batchDetail")}
              <br />
              {t("retail.heroes.keptClose")}
            </b>
          </div>
          <div className={css.dateTicket}>
            <span>{t("retail.heroes.fictionalReferenceDate")}</span>
            <b>
              15 <i>{t("retail.heroes.dec")}</i>
            </b>
            <small>{t("retail.heroes.n2026EditableExampleBelow")}</small>
          </div>
          <div className={css.batchTicket}>
            <span>{t("retail.heroes.exG02YoghurtCup")}</span>
            <b>
              36 <small>{t("retail.heroes.exampleUnits")}</small>
            </b>
            <p>
              {t("retail.heroes.recordedDate")}{" "}<strong>{t("retail.heroes.n16Dec2026")}</strong>
            </p>
            <small>{t("retail.heroes.dateArithmeticOnlyNoSafetyAssessment")}</small>
          </div>
          <figcaption>
            {t("retail.heroes.conceptStockLedgerDatesAndQuantities")}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
function HardwareHero() {
  const t = useTranslations("pages.industriesApp");
  return (
    <section className={css.hardwareHero}>
      <div className={css.wrap}>
        <div className={css.hardwareHeading}>
          <Copy slug="hardware-store" />
          <Actions />
        </div>
        <figure className={css.pegboard}>
          <div className={css.drawingPlate}>
            <header>
              <span>{t("retail.heroes.itemStudyConceptOnly")}</span>
              <span>EX-H01</span>
            </header>
            <FixingArt />
            <div className={css.diagramCaption}>
              {t("retail.heroes.theUnitIsPartOfThe")}
            </div>
          </div>
          <div className={css.packTicket}>
            <Boxes size={25} />
            <span>{t("retail.heroes.illustrativePackNote")}</span>
            <b>
              50<small>{t("retail.heroes.unitsPack")}</small>
            </b>
            <div>
              <span>{t("retail.heroes.target")}</span>
              <strong>{t("retail.heroes.n240Units")}</strong>
            </div>
            <div>
              <span>{t("retail.heroes.onHand")}</span>
              <strong>{t("retail.heroes.n65Units")}</strong>
            </div>
            <div>
              <span>{t("retail.heroes.shortage")}</span>
              <strong>{t("retail.heroes.n175Units")}</strong>
            </div>
            <footer>
              <b>{t("retail.heroes.n4Packs")}</b>
              <span>{t("retail.heroes.n25UnitsRemainAfterTheTarget")}</span>
            </footer>
          </div>
          <CurvedNote>{t("retail.heroes.countThePackKeepTheUnit")}</CurvedNote>
          <figcaption>
            {t("retail.heroes.conceptFastenerDrawingAndFictionalPack")}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
function ToyHero() {
  const t = useTranslations("pages.industriesApp");
  return (
    <section className={css.toyHero}>
      <div className={`${css.wrap} ${css.toyLayout}`}>
        <div className={css.toyCopy}>
          <Badge>{t("retail.heroes.aThoughtfulLittleRetailWorld")}</Badge>
          <Copy slug="toy-store" />
          <Actions />
          <div className={css.playSignature}>
            <span>
              <Check size={13} />{t("retail.heroes.aClearBasket")}
            </span>
            <span>
              <Check size={13} />{t("retail.heroes.aConsideredGift")}
            </span>
          </div>
        </div>
        <figure className={css.playDisplay}>
          <div className={css.playOrbit} />
          <div className={css.blockStage}>
            <span>{t("retail.heroes.thePlayCollectionConcept01")}</span>
            <ToyArt />
            <b>
              {t("retail.heroes.roomFor")}
              <br />
              <i>{t("retail.heroes.imagination")}</i>
            </b>
          </div>
          <div className={css.trainNote}>
            <ToyArt kind="train" />
            <span>
              {t("retail.heroes.aSmallCollection")}
              <br />
              {t("retail.heroes.itsOwnItemDetails")}
            </span>
          </div>
          <div className={css.giftNote}>
            <span>{t("retail.heroes.giftBasketExample")}</span>
            <b>
              {t("retail.heroes.aLittleThought")}
              <br />
              {t("retail.heroes.goesALongWay")}
            </b>
            <small>{t("retail.heroes.exploreAnEnteredBudgetBelow")}</small>
          </div>
          <figcaption>
            {t("retail.heroes.fictionalToyConceptsNoAgeSafety")}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
const heroes = {
  "book-store": BookHero,
  "clothing-store": ClothingHero,
  "furniture-store": FurnitureHero,
  "grocery-store": GroceryHero,
  "hardware-store": HardwareHero,
  "toy-store": ToyHero,
};
export default function RetailHero({ slug }: { slug: RetailSlug }) {
  const Hero = heroes[slug];
  return <Hero />;
}
