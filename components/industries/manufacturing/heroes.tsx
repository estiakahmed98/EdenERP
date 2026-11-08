import { ArrowRight, Box, Layers, Package, Scale, Wheat } from "lucide-react";
import { riceMassBalance, steelWeight } from "./calculations";
import {
  kg,
  pages,
  riceExample,
  steelExample,
  type IndustrySlug,
} from "./data";
import { Actions, Badge, CoilDrawing, PaddyDrawing, css } from "./ui";
import { useTranslations } from "next-intl";
function Copy({ slug }: { slug: IndustrySlug }) {
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
function SteelHero() {
  const t = useTranslations("pages.industriesApp");
  const weight = steelWeight(
    steelExample.gross,
    steelExample.tare,
    steelExample.orders.map((row) => row.weight),
  );
  return (
    <section className={css.steelHero}>
      <div className={css.wrap}>
        <div className={css.steelHeading}>
          <div>
            <Copy slug="steel" />
            <Actions />
          </div>
          <aside className={css.materialPassport}>
            <header>
              <Layers size={23} />
              <span>{t("manufacturing.heroes.theMaterialPassport")}</span>
            </header>
            <div>
              <span>{t("manufacturing.heroes.identity")}</span>
              <b>{t("manufacturing.heroes.coilLotReference")}</b>
            </div>
            <div>
              <span>{t("manufacturing.heroes.process")}</span>
              <b>{t("manufacturing.heroes.orderWorkCentreContext")}</b>
            </div>
            <div>
              <span>{t("manufacturing.heroes.movement")}</span>
              <b>{t("manufacturing.heroes.weightStockHandoff")}</b>
            </div>
          </aside>
        </div>
        <figure className={css.rollingScene}>
          <header>
            <span>{t("manufacturing.heroes.theMillInContext")}</span>
            <Badge>{t("manufacturing.heroes.conceptIllustrationNoLiveMachineData")}</Badge>
          </header>
          <div className={css.rollingArt}>
            <CoilDrawing />
            <div className={css.coilLabel}>
              <span>{t("manufacturing.heroes.exampleMaterial")}</span>
              <b>{steelExample.reference}</b>
              <small>{t("manufacturing.heroes.identityThroughEachHandoff")}</small>
            </div>
            <div className={css.netSlip}>
              <Scale size={21} />
              <span>{t("manufacturing.heroes.exampleNetIntake")}</span>
              <b>{kg(weight.net)}</b>
              <small>{t("manufacturing.heroes.grossLessTareLocalArithmetic")}</small>
            </div>
          </div>
          <div className={css.steelFlow}>
            <span>{t("manufacturing.heroes.n01Intake")}</span>
            <i />
            <span>{t("manufacturing.heroes.n02Production")}</span>
            <i />
            <span>{t("manufacturing.heroes.n03DispatchContext")}</span>
          </div>
          <figcaption>
            {t("manufacturing.heroes.conceptualRollingLineWithIllustrativeWei")}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
function RiceHero() {
  const t = useTranslations("pages.industriesApp");
  const balance = riceMassBalance(riceExample.input, riceExample);
  return (
    <section className={css.riceHero}>
      <div className={`${css.wrap} ${css.riceLayout}`}>
        <figure className={css.grainScene}>
          <div className={css.grainHalo} />
          <div className={css.paddySheet}>
            <header>
              <Wheat size={19} />
              <span>{t("manufacturing.heroes.theLotThroughTheMill")}</span>
            </header>
            <PaddyDrawing />
            <div className={css.lotReference}>
              <span>{t("manufacturing.heroes.illustrativeInputLot")}</span>
              <b>{riceExample.reference}</b>
              <strong>{kg(riceExample.input)}</strong>
            </div>
          </div>
          <div className={css.outputTickets}>
            <div>
              <Box size={18} />
              <span>{t("manufacturing.heroes.headRice")}</span>
              <b>{kg(riceExample.headRice)}</b>
            </div>
            <div>
              <Layers size={18} />
              <span>{t("manufacturing.heroes.brokenRice")}</span>
              <b>{kg(riceExample.brokenRice)}</b>
            </div>
            <div>
              <Package size={18} />
              <span>{t("manufacturing.heroes.branHusk")}</span>
              <b>{kg(riceExample.bran + riceExample.husk)}</b>
            </div>
          </div>
          <div className={css.balanceNote}>
            <span>{t("manufacturing.heroes.recordedOutputs")}{" "}{kg(balance.recorded)}</span>
            <ArrowRight size={14} />
            <b>{kg(balance.unassigned)}{" "}{t("manufacturing.heroes.unassigned")}</b>
          </div>
          <figcaption>
            {t("manufacturing.heroes.exampleWeightsOnlyOutputFractionsAre")}
          </figcaption>
        </figure>
        <div>
          <Copy slug="agro-rice" />
          <Actions />
          <div className={css.ricePrinciples}>
            <span>
              <Wheat size={15} />{" "}{t("manufacturing.heroes.lotContext")}
            </span>
            <span>
              <Scale size={15} />{" "}{t("manufacturing.heroes.weightContext")}
            </span>
            <span>
              <Package size={15} />{" "}{t("manufacturing.heroes.stockContext")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
export default function IndustryHero({ slug }: { slug: IndustrySlug }) {
  return slug === "steel" ? <SteelHero /> : <RiceHero />;
}
