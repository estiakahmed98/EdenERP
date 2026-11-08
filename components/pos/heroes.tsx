import {
  ArrowRight,
  Box,
  Check,
  CreditCard,
  Gift,
  MapPin,
  Monitor,
  Package,
  ReceiptText,
  ScanLine,
  ShoppingBag,
  Store,
  Wallet,
} from "lucide-react";
import { pages, type PosSlug } from "./data";
import {
  Arrow,
  Badge,
  Barcode,
  Denim,
  HeroActions,
  ReceiptPaper,
  css,
} from "./ui";
import { useTranslations } from "next-intl";

function Copy({ slug }: { slug: PosSlug }) {
  const t = useTranslations("pages.posApp");
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
function FigureLabel({ children }: { children: React.ReactNode }) {
  return <figcaption className={css.figureLabel}>{children}</figcaption>;
}

function RegisterHero() {
  const t = useTranslations("pages.posApp");
  return (
    <section className={css.registerHero}>
      <div className={css.wrap}>
        <div className={css.registerLayout}>
          <div>
            <Copy slug="register-till" />
            <HeroActions />
            <div className={css.quietFeatures}>
              <span>
                <ScanLine size={15} />{" "}{t("heroes.find")}
              </span>
              <span>
                <ShoppingBag size={15} />{" "}{t("heroes.tender")}
              </span>
              <span>
                <ReceiptText size={15} />{" "}{t("heroes.trace")}
              </span>
            </div>
          </div>
          <figure className={css.checkoutScene}>
            <div className={css.sceneHalo} />
            <div className={css.productFloat}>
              <Denim />
              <span>DH-6070</span>
              <b>{t("heroes.readyForTheBasket")}</b>
            </div>
            <div className={css.terminal}>
              <header>
                <span>
                  <Store size={15} />{" "}{t("heroes.adonErpRegister")}
                </span>
                <i>{t("heroes.preview")}</i>
              </header>
              <div className={css.scanBox}>
                <ScanLine size={20} />
                <span>{t("heroes.oneScanAClearNextStep")}</span>
              </div>
              <div className={css.terminalProduct}>
                <Denim />
                <div>
                  <b>{t("heroes.athleticFitJean")}</b>
                  <small>{t("heroes.n12OzDenim1Item")}</small>
                </div>
                <strong>৳ 3,450</strong>
              </div>
              <div className={css.terminalTotal}>
                <span>{t("heroes.basketTotal")}</span>
                <strong>৳ 3,450.00</strong>
              </div>
              <div className={css.mockAction}>
                {t("heroes.scanTenderReceipt")}{" "}<ArrowRight size={16} />
              </div>
            </div>
            <div className={css.smallSlip}>
              <Barcode />
              <b>{t("heroes.theNextChapter")}</b>
              <span>{t("heroes.aSaleWithATrail")}</span>
            </div>
            <span className={css.handNote}>
              {t("heroes.theCounterConnected")}
              <Arrow />
            </span>
            <FigureLabel>
              {t("heroes.illustratedCheckoutSuppliedProductAndPri")}
            </FigureLabel>
          </figure>
        </div>
      </div>
    </section>
  );
}
function ShiftsHero() {
  const t = useTranslations("pages.posApp");
  return (
    <section className={css.shiftsHero}>
      <div className={css.wrap}>
        <div className={css.shiftTop}>
          <div>
            <Copy slug="shifts" />
            <HeroActions />
          </div>
          <figure className={css.drawerScene}>
            <div className={css.drawerTop}>
              <Wallet size={25} />
              <span>{t("heroes.shiftReconciliation")}</span>
              <b>{t("heroes.everyDifferenceHasAPlace")}</b>
            </div>
            <div className={css.drawer}>
              <div className={css.banknotes}>
                ৳<span>{t("heroes.expected")}</span>
              </div>
              <div className={css.banknotes}>
                ৳<span>{t("heroes.counted")}</span>
              </div>
              <div className={css.coins}>
                <i />
                <i />
                <i />
              </div>
            </div>
            <div className={css.varianceStamp}>
              <Check size={17} />{" "}{t("heroes.postedShift000023")}
              <span>{t("heroes.n000Variance")}</span>
            </div>
            <FigureLabel>{t("heroes.suppliedClosedShiftR1Bsc")}</FigureLabel>
          </figure>
        </div>
        <ol className={css.shiftRibbon}>
          <li>
            <span>{t("heroes.n01Open")}</span>
            <strong>{t("heroes.cashierFloat")}</strong>
          </li>
          <li>
            <span>{t("heroes.n02Trade")}</span>
            <strong>{t("heroes.receiptsInContext")}</strong>
          </li>
          <li>
            <span>{t("heroes.n03Count")}</span>
            <strong>{t("heroes.expectedVsCounted")}</strong>
          </li>
          <li>
            <span>{t("heroes.n04Review")}</span>
            <strong>{t("heroes.aClearHandover")}</strong>
          </li>
        </ol>
      </div>
    </section>
  );
}
function ReceiptsHero() {
  const t = useTranslations("pages.posApp");
  return (
    <section className={css.receiptsHero}>
      <div className={`${css.wrap} ${css.receiptsLayout}`}>
        <figure className={css.receiptScene}>
          <div className={css.receiptBack} />
          <ReceiptPaper />
          <span className={css.receiptAnnotation}>
            {t("heroes.aLittlePaper")}
            <br />{t("heroes.aLotOfContext")}
            <Arrow />
          </span>
          <FigureLabel>
            {t("heroes.illustrativeReceiptNoOriginalReceiptSupp")}
          </FigureLabel>
        </figure>
        <div>
          <Copy slug="receipts" />
          <div className={css.receiptChips}>
            <span>
              <Box size={14} />{" "}{t("heroes.theBasket")}
            </span>
            <span>
              <CreditCard size={14} />{" "}{t("heroes.theTender")}
            </span>
            <span>
              <ReceiptText size={14} />{" "}{t("heroes.theTax")}
            </span>
          </div>
          <HeroActions />
        </div>
      </div>
    </section>
  );
}
function SummaryHero() {
  const t = useTranslations("pages.posApp");
  return (
    <section className={css.summaryHero}>
      <div className={css.wrap}>
        <div className={css.centerCopy}>
          <Copy slug="day-summary-z" />
          <HeroActions />
        </div>
        <figure className={css.closeStatement}>
          <div className={css.statementLabel}>
            <span>{t("heroes.zClosingStatement")}</span>
            <Badge />
          </div>
          <div className={css.statementFigure}>
            <span>{t("heroes.grossSales")}</span>
            <strong>
              <small>৳</small> 3,450<span>.00</span>
            </strong>
            <p>{t("heroes.oneReceiptOneItemAVisible")}</p>
          </div>
          <div className={css.salesBridge}>
            <div>
              <span>{t("heroes.includesVat")}</span>
              <b>৳ 450.00</b>
            </div>
            <span>+</span>
            <div>
              <span>{t("heroes.costOfGoods")}</span>
              <b>৳ 1,261.09</b>
            </div>
            <span>+</span>
            <div className={css.bridgeResult}>
              <span>{t("heroes.grossMarginAfterVatCost")}</span>
              <b>৳ 1,738.91</b>
            </div>
          </div>
          <FigureLabel>
            {t("heroes.suppliedDaySummaryFiguresHistoricalSnaps")}
          </FigureLabel>
        </figure>
      </div>
    </section>
  );
}
function DashboardHero() {
  const t = useTranslations("pages.posApp");
  return (
    <section className={css.dashboardHero}>
      <div className={`${css.wrap} ${css.dashboardLayout}`}>
        <div>
          <Copy slug="outlet-dashboard" />
          <HeroActions />
          <p className={css.dashboardFoot}>{t("heroes.outletsBasketsMargin")}</p>
        </div>
        <figure className={css.dashboardMosaic}>
          <div className={css.mosaicSales}>
            <span>{t("heroes.netSalesSuppliedWindow")}</span>
            <strong>৳ 3,450</strong>
            <div className={css.singleBar}>
              <i />
              <span>{t("heroes.oneReceiptInTheSupplied14")}</span>
            </div>
          </div>
          <div className={css.mosaicBasket}>
            <ShoppingBag size={22} />
            <strong>1</strong>
            <span>{t("heroes.receipt")}</span>
            <small>{t("heroes.n3450AverageBasket")}</small>
          </div>
          <div className={css.mosaicMargin}>
            <span>{t("heroes.grossMargin")}</span>
            <strong>৳ 1,738.91</strong>
            <div className={css.marginTrack}>
              <i />
            </div>
            <small>{t("heroes.n58AsShownInSource")}</small>
          </div>
          <div className={css.mosaicRegister}>
            <Monitor size={21} />
            <div>
              <b>R1-BSC</b>
              <span>{t("heroes.bashundharaCity")}</span>
            </div>
            <ArrowRight size={18} />
          </div>
          <FigureLabel>
            {t("heroes.suppliedHistoricalDashboardNoInventedTre")}
          </FigureLabel>
        </figure>
      </div>
    </section>
  );
}
function LoyaltyHero() {
  const t = useTranslations("pages.posApp");
  return (
    <section className={css.loyaltyHero}>
      <div className={css.wrap}>
        <div className={css.centerCopy}>
          <Copy slug="loyalty-vouchers" />
          <HeroActions />
        </div>
        <figure className={css.loyaltyScene}>
          <span className={css.orbitLabel}>{t("heroes.aBalanceWorthUnderstanding")}</span>
          <div className={css.loyaltyCard}>
            <header>
              <span>
                {t("heroes.eden")}<span>{t("heroes.erp")}</span>{" "}{t("heroes.retail")}
              </span>
              <Gift size={23} />
            </header>
            <span>{t("heroes.loyaltyAccounts")}</span>
            <strong>27</strong>
            <footer>
              <span>{t("heroes.n3610PointsInTheSupplied")}</span>
              <i />
            </footer>
          </div>
          <div className={css.voucher}>
            <div>
              <span>{t("heroes.activeGiftVouchers")}</span>
              <b>02</b>
            </div>
            <div>
              <span>{t("heroes.outstandingValue")}</span>
              <strong>৳ 3,770</strong>
            </div>
          </div>
          <div className={css.loyaltyRing} />
          <FigureLabel>
            {t("heroes.suppliedAggregateBalancesCardIllustratio")}
          </FigureLabel>
        </figure>
      </div>
    </section>
  );
}
function TransfersHero() {
  const t = useTranslations("pages.posApp");
  return (
    <section className={css.transfersHero}>
      <div className={css.wrap}>
        <div className={css.transferHeading}>
          <div>
            <Copy slug="transfers" />
          </div>
          <HeroActions />
        </div>
        <figure className={css.routeScene}>
          <div className={css.routeOrigin}>
            <Box size={32} />
            <span>{t("heroes.sourceFg")}</span>
            <b>{t("heroes.finishedGoods")}</b>
          </div>
          <div className={css.routeTransit}>
            <span className={css.routeCaption}>
              {t("heroes.dispatchReceiveReconcile")}
            </span>
            <div className={css.routeTrack}>
              <i />
              <span>
                <Package size={29} />
              </span>
              <i />
            </div>
            <span className={css.routeReference}>
              {t("heroes.str202600000227Units3")}
            </span>
          </div>
          <div className={css.routeDestination}>
            <Store size={32} />
            <span>{t("heroes.destinationOut2")}</span>
            <b>{t("heroes.jamunaFuturePark")}</b>
          </div>
          <FigureLabel>
            {t("heroes.suppliedReceivedTransferDiagramShowsThe")}
          </FigureLabel>
        </figure>
      </div>
    </section>
  );
}
function LotsHero() {
  const t = useTranslations("pages.posApp");
  return (
    <section className={css.lotsHero}>
      <div className={`${css.wrap} ${css.lotsLayout}`}>
        <div>
          <Copy slug="stock-lots" />
          <HeroActions />
          <div className={css.lotSource}>
            <span>{t("heroes.suppliedLot000001")}</span>
            <b>{t("heroes.gulshanSurplusTraders")}</b>
            <small>{t("heroes.assortedLadiesTopsKidsTees6")}</small>
          </div>
        </div>
        <figure className={css.lotScene}>
          <div className={css.lotQuantity}>
            <b>1,150</b>
            <span>{t("heroes.unitsInOneLot")}</span>
          </div>
          <div className={css.bale}>
            <span>{t("heroes.lot2026")}</span>
            <Package size={65} />
            <Barcode />
          </div>
          <div className={css.sortLine} />
          <div className={css.sortedItems}>
            <div>
              <Denim top />
              <span>{t("heroes.sortTheIntake")}</span>
            </div>
            <div>
              <Gift size={37} />
              <span>{t("heroes.shareTheCost")}</span>
            </div>
            <div>
              <ReceiptText size={37} />
              <span>{t("heroes.reviewTheBasis")}</span>
            </div>
          </div>
          <FigureLabel>
            {t("heroes.suppliedLotTotalsIllustrativeItemSorting")}
          </FigureLabel>
        </figure>
      </div>
    </section>
  );
}
function StockHero() {
  const t = useTranslations("pages.posApp");
  return (
    <section className={css.stockHero}>
      <div className={css.wrap}>
        <div className={css.stockHeading}>
          <div>
            <Copy slug="outlet-stock" />
          </div>
          <div>
            <p className={css.stockNumber}>
              1,390<span>{t("heroes.unitsOnHand")}</span>
            </p>
            <HeroActions />
          </div>
        </div>
        <figure className={css.shelfScene}>
          <div className={css.shelfItem}>
            <span>{t("heroes.n01Denim")}</span>
            <Denim />
            <div>
              <b>{t("heroes.athleticFitJean")}</b>
              <span>{t("heroes.dh6070192Units")}</span>
            </div>
          </div>
          <div className={css.shelfItem}>
            <span>{t("heroes.n02CottonTwill")}</span>
            <Denim />
            <div>
              <b>{t("heroes.threeQuarterPant")}</b>
              <span>{t("heroes.dh710180Units")}</span>
            </div>
          </div>
          <div className={css.shelfItem}>
            <span>{t("heroes.n03AssortedTops")}</span>
            <Denim top />
            <div>
              <b>{t("heroes.ladiesTopBlue")}</b>
              <span>{t("heroes.lotTopBlu380Units")}</span>
            </div>
          </div>
          <div className={css.shelfBase}>
            <Barcode />
            <span>{t("heroes.out1BashundharaCity")}</span>
            <b>{t("heroes.n6SkusOneStockView")}</b>
          </div>
          <FigureLabel>
            {t("heroes.threeOfSixSuppliedStockLines")}
          </FigureLabel>
        </figure>
      </div>
    </section>
  );
}
function OutletsHero() {
  const t = useTranslations("pages.posApp");
  return (
    <section className={css.outletsHero}>
      <div className={`${css.wrap} ${css.outletsLayout}`}>
        <figure className={css.networkScene}>
          <div className={css.networkGrid} />
          <div className={css.networkHub}>
            <Box size={29} />
            <b>{t("heroes.factory")}</b>
            <span>{t("heroes.fgRmWipCn")}</span>
          </div>
          <div className={css.networkBranch} />
          <div className={css.networkOutlet}>
            <Store size={24} />
            <div>
              <span>OUT1</span>
              <b>{t("heroes.bashundharaCity")}</b>
              <small>{t("heroes.registerR1Bsc")}</small>
            </div>
          </div>
          <div className={css.networkOutlet}>
            <Store size={24} />
            <div>
              <span>OUT2</span>
              <b>{t("heroes.jamunaFuturePark")}</b>
              <small>{t("heroes.registerR1Jfp")}</small>
            </div>
          </div>
          <div className={css.networkTotals}>
            <b>6</b>{" "}{t("heroes.locations")}{" "}<span>→</span>
            <b>2</b>{" "}{t("heroes.sellingOutlets")}
          </div>
          <FigureLabel>
            {t("heroes.suppliedLocationNetworkSchematicNotA")}
          </FigureLabel>
        </figure>
        <div>
          <Copy slug="outlets-registers" />
          <HeroActions />
          <p className={css.networkCaption}>
            <MapPin size={15} />{" "}{t("heroes.aPlaceForTheStockA")}
          </p>
        </div>
      </div>
    </section>
  );
}
const heroes = {
  "register-till": RegisterHero,
  shifts: ShiftsHero,
  receipts: ReceiptsHero,
  "day-summary-z": SummaryHero,
  "outlet-dashboard": DashboardHero,
  "loyalty-vouchers": LoyaltyHero,
  transfers: TransfersHero,
  "stock-lots": LotsHero,
  "outlet-stock": StockHero,
  "outlets-registers": OutletsHero,
};
export default function PosHero({ slug }: { slug: PosSlug }) {
  const Hero = heroes[slug];
  return <Hero />;
}
