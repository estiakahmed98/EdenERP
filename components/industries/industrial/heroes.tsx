import { ArrowRight, Layers, Ruler } from "lucide-react";
import { barPattern, componentKits, fabricLength } from "./calculations";
import {
  components,
  defaultLosses,
  num,
  pages,
  textileStages,
  type IndustrialSlug,
} from "./data";
import {
  Actions,
  Badge,
  BeamArt,
  ChairArt,
  FabricArt,
  HandNote,
  base,
  css,
} from "./ui";
import { useTranslations } from "next-intl";
function Copy({ slug }: { slug: IndustrialSlug }) {
  const t = useTranslations("pages.industriesApp");
  const p = pages(t)[slug];
  return (
    <>
      <p className={base.eyebrow}>{p.eyebrow}</p>
      <h1>
        {p.headline}
        <br />
        <em>{p.accent}</em>
      </h1>
      <p className={base.lead}>{p.description}</p>
    </>
  );
}
function TextileHero() {
  const t = useTranslations("pages.industriesApp");
  const fabric = fabricLength(1000, defaultLosses);
  return (
    <section className={css.textileHero}>
      <div className={`${base.wrap} ${css.textileLayout}`}>
        <div>
          <Copy slug="textile" />
          <Actions />
          <p className={css.heroFoot}>
            {t("industrial.heroes.theMaterialTheProcessTheFinished")}
          </p>
        </div>
        <figure className={css.materialStudy}>
          <header>
            <span>{t("industrial.heroes.exTx01TheMaterialNotes")}</span>
            <Badge>{t("industrial.heroes.conceptFabricStudy")}</Badge>
          </header>
          <div className={css.fabricCanvas}>
            <FabricArt />
            <div className={css.fabricLabel}>
              <span>{t("industrial.heroes.illustrativeInput")}</span>
              <b>
                1,000 <small>m</small>
              </b>
              <small>{t("industrial.heroes.lengthStaysInMetresThroughout")}</small>
            </div>
          </div>
          <div className={css.processRibbons}>
            {textileStages(t).map((stage, i) => (
              <div key={stage}>
                <span>
                  0{i + 1} / {stage}
                </span>
                <b>
                  {num(fabric.stages[i].after, 3)}
                  <small> m</small>
                </b>
                <small>{t("industrial.heroes.after")}{" "}{defaultLosses[i]}{t("industrial.heroes.enteredLoss")}</small>
              </div>
            ))}
          </div>
          <HandNote>{t("industrial.heroes.keepTheLengthSJourneyIn")}</HandNote>
          <figcaption>
            {t("industrial.heroes.fictionalFabricLengthAssumptionsNoMateri")}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
function MetalHero() {
  const t = useTranslations("pages.industriesApp");
  const cut = barPattern(6000, 1200, 3, 12);
  return (
    <section className={css.metalHero}>
      <div className={base.wrap}>
        <div className={css.metalHeading}>
          <Badge>{t("industrial.heroes.theFabricationStudyConcept01")}</Badge>
          <Copy slug="metal" />
          <Actions />
        </div>
        <figure className={css.cutStudy}>
          <div className={css.cutDrawing}>
            <header>
              <span>{t("industrial.heroes.exCut01OneLengthPattern")}</span>
              <Ruler size={18} />
            </header>
            <BeamArt />
            <div className={css.dimensionStrip}>
              <span>{t("industrial.heroes.n6000MmStock")}</span>
              <i />
              <span>{t("industrial.heroes.n1200MmPiece")}</span>
              <i />
              <span>{t("industrial.heroes.n3MmAllowancePiece")}</span>
            </div>
          </div>
          <div className={css.cutDocket}>
            <Layers size={24} />
            <span>{t("industrial.heroes.theEnteredCutAssumptions")}</span>
            <b>
              {cut.perBar}
              <small>{t("industrial.heroes.piecesFullPatternBar")}</small>
            </b>
            <div>
              <span>{t("industrial.heroes.requestedPieces")}</span>
              <strong>12</strong>
            </div>
            <div>
              <span>{t("industrial.heroes.calculatedStockBars")}</span>
              <strong>{cut.bars}</strong>
            </div>
            <div>
              <span>{t("industrial.heroes.remainingLengthAllBars")}</span>
              <strong>{num(cut.remaining)}{" "}{t("industrial.heroes.mm")}</strong>
            </div>
            <small>
              {t("industrial.heroes.allowanceIsConsumedForEveryPiece")}
            </small>
          </div>
          <figcaption>
            {t("industrial.heroes.conceptBarIllustrationAndFictionalArithm")}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
function FurnitureHero() {
  const t = useTranslations("pages.industriesApp");
  const kits = componentKits(24, components);
  return (
    <section className={css.furnitureHero}>
      <div className={`${base.wrap} ${css.furnitureLayout}`}>
        <figure className={css.assemblyStudy}>
          <header>
            <span>{t("industrial.heroes.exFurn01TheAssemblyNotes")}</span>
            <Badge>{t("industrial.heroes.conceptExplodedView")}</Badge>
          </header>
          <div className={css.assemblyCanvas}>
            <ChairArt />
            <div className={css.assemblyLabelA}>
              <b>A</b>
              <span>{t("industrial.heroes.designContext")}</span>
            </div>
            <div className={css.assemblyLabelB}>
              <b>B</b>
              <span>{t("industrial.heroes.seatPanel")}</span>
            </div>
            <div className={css.assemblyLabelC}>
              <b>C</b>
              <span>{t("industrial.heroes.legComponents")}</span>
            </div>
          </div>
          <div className={css.kitNote}>
            <span>{t("industrial.heroes.componentOnlyExample")}</span>
            <b>
              {kits.available}
              <small>{t("industrial.heroes.kitEquivalentsFromEnteredStock")}</small>
            </b>
            <p>{t("industrial.heroes.forAnIllustrativeRequestOf24")}</p>
          </div>
          <figcaption>
            {t("industrial.heroes.conceptChairDrawingThreeLineComponent")}
          </figcaption>
        </figure>
        <div>
          <Copy slug="furniture" />
          <Actions />
          <div className={css.assemblyFlow}>
            <span>{t("industrial.heroes.design")}</span>
            <ArrowRight size={13} />
            <span>{t("industrial.heroes.parts")}</span>
            <ArrowRight size={13} />
            <span>{t("industrial.heroes.assembly")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
const heroes = {
  textile: TextileHero,
  metal: MetalHero,
  furniture: FurnitureHero,
};
export default function IndustrialHero({ slug }: { slug: IndustrialSlug }) {
  const Hero = heroes[slug];
  return <Hero />;
}
