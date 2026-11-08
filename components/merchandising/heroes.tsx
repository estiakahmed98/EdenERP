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
import { useTranslations } from "next-intl";
function Copy({ slug }: { slug: MerchandisingSlug }) {
  const t = useTranslations("pages.merchandisingApp");
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

function DashboardHero() {
  const t = useTranslations("pages.merchandisingApp");
  return (
    <section className={css.dashboardHero}>
      <div className={css.wrap}>
        <div className={css.briefLayout}>
          <div className={css.briefCopy}>
            <div className={css.edition}>
              <span>{t("heroes.theOrderDesk")}</span>
              <span>{t("heroes.vol01SuppliedSnapshot")}</span>
            </div>
            <Copy slug="merchandising-dashboard" />
            <Actions />
            <div className={css.briefFooter}>
              <span>{t("heroes.n04Nov2026")}</span>
              <p>
                {t("heroes.aMorningView")}
                <br />{t("heroes.aMoreConsideredFollowUp")}
              </p>
            </div>
          </div>
          <figure className={css.briefBoard}>
            <div className={css.riskTile}>
              <span>{t("heroes.thePrioritySignal")}</span>
              <strong>
                14<span>{t("heroes.ordersAtRisk")}</span>
              </strong>
              <p>{t("heroes.of16OpenOrdersInThe")}</p>
              <div className={css.riskDots}>
                {Array.from({ length: 16 }, (_, i) => (
                  <i key={i} data-risk={i < 14} />
                ))}
              </div>
            </div>
            <div className={css.actionTile}>
              <CalendarDays size={21} />
              <b>64</b>
              <span>{t("heroes.lateMilestones")}</span>
              <small>{t("heroes.n7DueIn7DaysSource")}</small>
            </div>
            <div className={css.materialTile}>
              <Layers size={22} />
              <b>8</b>
              <span>{t("heroes.ordersWithShortages")}</span>
            </div>
            <div className={css.moneyTile}>
              <span>{t("heroes.theCommercialContext")}</span>
              <b>{t("heroes.usd1826227")}</b>
              <small>{t("heroes.valueOfOpenOrdersSuppliedSnapshot")}</small>
            </div>
            <figcaption>{t("heroes.suppliedHistoricalBrief4November2026")}</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
function StylesHero() {
  const t = useTranslations("pages.merchandisingApp");
  return (
    <section className={css.stylesHero}>
      <div className={`${css.wrap} ${css.stylesLayout}`}>
        <figure className={css.specBoard}>
          <div className={css.specHeader}>
            <span>{t("heroes.styleNotes8010")}</span>
            <Scissors size={17} />
          </div>
          <div className={css.specDrawing}>
            <Garment />
            <span className={css.dimensionLine} />
            <span className={css.specAnnotation}>
              {t("heroes.theDetails")}
              <br />
              {t("heroes.makeTheDifference")}
              <Curve />
            </span>
          </div>
          <div className={css.swatches}>
            <i />
            <i />
            <i />
            <span>{t("heroes.conceptualFabricPalette")}</span>
          </div>
          <div className={css.costSlip}>
            <span>{t("heroes.suppliedCommercials")}</span>
            <div>
              <span>{t("heroes.costPc")}</span>
              <b>{t("heroes.usd1502")}</b>
            </div>
            <div>
              <span>{t("heroes.confirmedFob")}</span>
              <b>{t("heroes.usd1640")}</b>
            </div>
            <Tag>{t("heroes.n84SourceMargin")}</Tag>
          </div>
          <figcaption>
            {t("heroes.conceptualGarmentDrawingSourceStyle8010")}
          </figcaption>
        </figure>
        <div>
          <Copy slug="styles-costing" />
          <Actions />
          <p className={css.quietLine}>
            <Shirt size={15} />{" "}{t("heroes.specificationDevelopmentCommercials")}
          </p>
        </div>
      </div>
    </section>
  );
}
function TnaHero() {
  const t = useTranslations("pages.merchandisingApp");
  return (
    <section className={css.tnaHero}>
      <div className={css.wrap}>
        <div className={css.tnaHeading}>
          <div>
            <Copy slug="tna-calendar" />
          </div>
          <div className={css.dateFlag}>
            <span>{t("heroes.timeIsASharedResponsibility")}</span>
            <b>
              {t("heroes.plan")}
              <br />
              {t("heroes.own")}
              <br />
              <em>{t("heroes.followThrough")}</em>
            </b>
          </div>
        </div>
        <Actions />
        <figure className={css.calendarScene}>
          <header>
            <span>
              <CalendarDays size={17} />{" "}{t("heroes.october2026")}
            </span>
            <Badge>{t("heroes.selectedOrderSc2026000017")}</Badge>
          </header>
          <div className={css.milestoneRail}>
            {[
              { day: "02", label: t("heroes.fabricBooking"), kind: "Material" },
              { day: "07", label: t("heroes.labDipApproval"), kind: "Approval" },
              { day: "09", label: t("heroes.n1stFitSample"), kind: "Sample" },
              { day: "16", label: t("heroes.fitComments"), kind: "Approval" },
              { day: "22", label: t("heroes.n2ndFitSample"), kind: "Sample" },
            ].map((row, i) => (
              <div key={row.day}>
                <span>
                  {t("heroes.oct")}{" "}<b>{row.day}</b>
                </span>
                <i data-kind={i % 3} />
                <h3>{row.label}</h3>
                <small>{row.kind}</small>
              </div>
            ))}
          </div>
          <figcaption>
            {t("heroes.fiveOctoberPlanDatesFromThe")}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
function MaterialsHero() {
  const t = useTranslations("pages.merchandisingApp");
  return (
    <section className={css.materialsHero}>
      <div className={`${css.wrap} ${css.materialsLayout}`}>
        <div>
          <Copy slug="material-booking" />
          <Actions />
          <div className={css.materialLegend}>
            <span>
              <i />
              {t("heroes.booked")}
            </span>
            <span>
              <i />
              {t("heroes.inHouse")}
            </span>
            <span>
              <i />
              {t("heroes.gapToInvestigate")}
            </span>
          </div>
        </div>
        <figure className={css.materialLibrary}>
          <div className={css.materialShelf}>
            <div>
              <span>{t("heroes.n01Denim")}</span>
              <i className={css.fabricDenim} />
              <b>{t("heroes.fabric")}</b>
            </div>
            <div>
              <span>{t("heroes.n02Hardware")}</span>
              <i className={css.fabricTrim} />
              <b>{t("heroes.trims")}</b>
            </div>
            <div>
              <span>{t("heroes.n03Finishing")}</span>
              <i className={css.fabricLabel} />
              <b>{t("heroes.accessories")}</b>
            </div>
          </div>
          <div className={css.readinessCard}>
            <span>{t("heroes.sourceOrder000001Style6026")}</span>
            <Progress label={t("heroes.materialLinesBooked")} value={16} total={16} />
            <Progress
              label={t("heroes.materialLinesInHouse")}
              value={4}
              total={16}
              green
            />
            <div>
              <Tag tone="red">{t("heroes.n12LinesShort")}</Tag>
              <span>{t("heroes.pcd19July2026")}</span>
            </div>
          </div>
          <span className={css.libraryAnnotation}>
            {t("heroes.bookedIsnTInHouse")}
            <Curve />
          </span>
          <figcaption>
            {t("heroes.conceptualMaterialSwatchesSuppliedReadin")}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
function ProductionHero() {
  const t = useTranslations("pages.merchandisingApp");
  return (
    <section className={css.productionHero}>
      <div className={css.wrap}>
        <div className={css.productionHeading}>
          <Copy slug="production-follow-up" />
          <Actions />
        </div>
        <figure className={css.productionScene}>
          <div className={css.productionIdentity}>
            <span>{t("heroes.orderSc2026000004")}</span>
            <h3>
              5343 <small>{t("heroes.slimStraightJean")}</small>
            </h3>
            <Tag tone="red">{t("heroes.behindPlanSourceStatus")}</Tag>
          </div>
          <div className={css.productionStations}>
            <div>
              <span>{t("heroes.n01Ordered")}</span>
              <Shirt size={28} />
              <b>8,400</b>
              <small>{t("heroes.piecesOrdered")}</small>
            </div>
            <ArrowRight size={24} />
            <div>
              <span>{t("heroes.n02Sewn")}</span>
              <Scissors size={28} />
              <b>7,002</b>
              <small>{t("heroes.sourceSewnQuantity")}</small>
              <i style={{ width: "83.36%" }} />
            </div>
            <ArrowRight size={24} />
            <div>
              <span>{t("heroes.n03Packed")}</span>
              <Package size={28} />
              <b>5,078</b>
              <small>{t("heroes.sourcePackedQuantity")}</small>
              <i style={{ width: "60.45%" }} />
            </div>
          </div>
          <figcaption>
            {t("heroes.aProductionSnapshotNotAReconstructed")}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
function FactoriesHero() {
  const t = useTranslations("pages.merchandisingApp");
  return (
    <section className={css.factoriesHero}>
      <div className={`${css.wrap} ${css.factoriesLayout}`}>
        <div>
          <Copy slug="factories" />
          <Actions />
          <div className={css.partnerCount}>
            <b>2</b>
            <span>
              {t("heroes.factoriesInThe")}
              <br />
              {t("heroes.suppliedNetwork")}
            </span>
            <i />
            <b>6,440</b>
            <span>
              {t("heroes.pieces")}
              <br />
              {t("heroes.inProgress")}
            </span>
          </div>
        </div>
        <figure className={css.factoryDossier}>
          <header>
            <span>{t("heroes.factoryDossier01")}</span>
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
            <span>{t("heroes.mymensinghApparelLtd")}</span>
          </div>
          <div className={css.dossierStats}>
            <div>
              <b>6</b>
              <span>{t("heroes.lines")}</span>
            </div>
            <div>
              <b>260</b>
              <span>{t("heroes.machines")}</span>
            </div>
            <div>
              <b>4,200</b>
              <span>{t("heroes.pcsDay")}</span>
            </div>
          </div>
          <div className={css.complianceNote}>
            <ShieldCheck size={18} />
            <span>
              {t("heroes.capabilityAndComplianceFlags")}
              <br />
              {t("heroes.keptInTheSameProfile")}
            </span>
          </div>
          <figcaption>
            {t("heroes.conceptualFacilityIllustrationSourceFact")}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
function ReceiptsHero() {
  const t = useTranslations("pages.merchandisingApp");
  return (
    <section className={css.receiptsHero}>
      <div className={`${css.wrap} ${css.receiptsLayout}`}>
        <div>
          <Copy slug="in-house-receipts" />
          <Actions />
          <div className={css.receiptHeadline}>
            <b>8,400</b>
            <span>
              {t("heroes.postedPieces")}
              <br />
              {t("heroes.inTheSuppliedRegister")}
            </span>
          </div>
        </div>
        <figure className={css.receivingScene}>
          <div className={css.cartonStack}>
            <div>
              <Package size={30} />
              <span>{t("heroes.ourStock")}</span>
            </div>
            <div>
              <Package size={30} />
              <span>{t("heroes.buyerSGoods")}</span>
            </div>
            <div>
              <Package size={30} />
              <span>{t("heroes.memo")}</span>
            </div>
          </div>
          <div className={css.receivingDocket}>
            <header>
              <ClipboardList size={22} />
              <span>{t("heroes.goodsReceivedSourceExcerpt")}</span>
            </header>
            <b>FR-2026-000002</b>
            <span>{t("heroes.n18September2026")}</span>
            <div>
              <span>{t("heroes.received")}</span>
              <strong>{t("heroes.n3000Pcs")}</strong>
            </div>
            <div>
              <span>{t("heroes.packing")}</span>
              <strong>{t("heroes.n300Cartons")}</strong>
            </div>
            <div>
              <span>{t("heroes.ownership")}</span>
              <Tag tone="green">{t("heroes.ourStock2")}</Tag>
            </div>
            <footer>
              <Check size={14} />{" "}{t("heroes.postedSuppliedStatus")}
            </footer>
          </div>
          <figcaption>
            {t("heroes.conceptualCartonCompositionSuppliedRecei")}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
function ProfitHero() {
  const t = useTranslations("pages.merchandisingApp");
  return (
    <section className={css.profitHero}>
      <div className={css.wrap}>
        <div className={css.centerCopy}>
          <Copy slug="profitability" />
          <Actions />
        </div>
        <figure className={css.profitStatement}>
          <div className={css.profitStatementTop}>
            <span>{t("heroes.actualsBaseCurrencyBdt")}</span>
            <Badge>{t("heroes.n17OrdersSourceAggregate")}</Badge>
          </div>
          <div className={css.profitNumber}>
            <span>{t("heroes.netResultInTheSuppliedReport")}</span>
            <b>13,790,555</b>
            <p>{t("heroes.n309ActualMargin143")}</p>
          </div>
          <div className={css.revenueSplit}>
            <div />
            <div />
          </div>
          <div className={css.profitParts}>
            <div>
              <span>{t("heroes.revenue")}</span>
              <b>44,706,064</b>
            </div>
            <span>−</span>
            <div>
              <span>{t("heroes.costOfGoodsShipped")}</span>
              <b>30,915,509</b>
            </div>
            <span>=</span>
            <div>
              <span>{t("heroes.net")}</span>
              <b>13,790,555</b>
            </div>
          </div>
          <figcaption>
            {t("heroes.suppliedReportActualsPerPieceOrder")}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
function PortalHero() {
  const t = useTranslations("pages.merchandisingApp");
  return (
    <section className={css.portalHero}>
      <div className={`${css.wrap} ${css.portalLayout}`}>
        <div>
          <Copy slug="buyer-portal" />
          <Actions />
          <div className={css.accessPrinciple}>
            <LockKeyhole size={18} />
            <span>
              {t("heroes.theBuyerSContext")}
              <br />
              {t("heroes.theRoleSBoundary")}
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
            <span>{t("heroes.buyerWorkspaceConceptPreview")}</span>
            <LockKeyhole size={13} />
          </header>
          <div className={css.portalWelcome}>
            <span>{t("heroes.buyerProfile")}</span>
            <h3>{t("heroes.americanEagleOutfitters")}</h3>
            <small>{t("heroes.viaLiFungBdSourceAccount")}</small>
          </div>
          <div className={css.portalTabs}>
            <span>{t("heroes.samples")}</span>
            <span>{t("heroes.tna")}</span>
            <span>{t("heroes.shipments")}</span>
            <span>{t("heroes.documents")}</span>
          </div>
          <div className={css.roleCard}>
            <span className={css.roleAvatar}>
              <Users size={19} />
            </span>
            <div>
              <b>{t("heroes.merchandiser")}</b>
              <span>{t("heroes.sampleDecisionsSourcePermission")}</span>
            </div>
            <Check size={17} />
          </div>
          <div className={css.roleCard}>
            <span className={css.roleAvatar}>
              <ShieldCheck size={19} />
            </span>
            <div>
              <b>{t("heroes.qa")}</b>
              <span>{t("heroes.viewOnlySourcePermission")}</span>
            </div>
            <LockKeyhole size={16} />
          </div>
          <div className={css.portalBoundary}>
            <span>{t("heroes.oneBuyerProfile")}</span>
            <i />
            <span>{t("heroes.explicitRoles")}</span>
          </div>
          <figcaption>
            {t("heroes.roleIllustrationOnlyNoSignIn")}
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
