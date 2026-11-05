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

function Copy({ slug }: { slug: PosSlug }) {
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
function FigureLabel({ children }: { children: React.ReactNode }) {
  return <figcaption className={css.figureLabel}>{children}</figcaption>;
}

function RegisterHero() {
  return (
    <section className={css.registerHero}>
      <div className={css.wrap}>
        <div className={css.registerLayout}>
          <div>
            <Copy slug="register-till" />
            <HeroActions />
            <div className={css.quietFeatures}>
              <span>
                <ScanLine size={15} /> Find
              </span>
              <span>
                <ShoppingBag size={15} /> Tender
              </span>
              <span>
                <ReceiptText size={15} /> Trace
              </span>
            </div>
          </div>
          <figure className={css.checkoutScene}>
            <div className={css.sceneHalo} />
            <div className={css.productFloat}>
              <Denim />
              <span>DH-6070</span>
              <b>Ready for the basket</b>
            </div>
            <div className={css.terminal}>
              <header>
                <span>
                  <Store size={15} />  Adon ERP · Register
                </span>
                <i>Preview</i>
              </header>
              <div className={css.scanBox}>
                <ScanLine size={20} />
                <span>One scan. A clear next step.</span>
              </div>
              <div className={css.terminalProduct}>
                <Denim />
                <div>
                  <b>Athletic Fit Jean</b>
                  <small>12 oz Denim · 1 item</small>
                </div>
                <strong>৳ 3,450</strong>
              </div>
              <div className={css.terminalTotal}>
                <span>Basket total</span>
                <strong>৳ 3,450.00</strong>
              </div>
              <div className={css.mockAction}>
                Scan → Tender → Receipt <ArrowRight size={16} />
              </div>
            </div>
            <div className={css.smallSlip}>
              <Barcode />
              <b>THE NEXT CHAPTER</b>
              <span>A sale with a trail.</span>
            </div>
            <span className={css.handNote}>
              the counter, connected
              <Arrow />
            </span>
            <FigureLabel>
              Illustrated checkout · supplied product and price
            </FigureLabel>
          </figure>
        </div>
      </div>
    </section>
  );
}
function ShiftsHero() {
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
              <span>SHIFT RECONCILIATION</span>
              <b>Every difference has a place.</b>
            </div>
            <div className={css.drawer}>
              <div className={css.banknotes}>
                ৳<span>EXPECTED</span>
              </div>
              <div className={css.banknotes}>
                ৳<span>COUNTED</span>
              </div>
              <div className={css.coins}>
                <i />
                <i />
                <i />
              </div>
            </div>
            <div className={css.varianceStamp}>
              <Check size={17} /> Posted shift · 000023
              <span>৳ 0.00 variance</span>
            </div>
            <FigureLabel>Supplied closed shift · R1-BSC</FigureLabel>
          </figure>
        </div>
        <ol className={css.shiftRibbon}>
          <li>
            <span>01 / OPEN</span>
            <strong>Cashier + float</strong>
          </li>
          <li>
            <span>02 / TRADE</span>
            <strong>Receipts in context</strong>
          </li>
          <li>
            <span>03 / COUNT</span>
            <strong>Expected vs counted</strong>
          </li>
          <li>
            <span>04 / REVIEW</span>
            <strong>A clear handover</strong>
          </li>
        </ol>
      </div>
    </section>
  );
}
function ReceiptsHero() {
  return (
    <section className={css.receiptsHero}>
      <div className={`${css.wrap} ${css.receiptsLayout}`}>
        <figure className={css.receiptScene}>
          <div className={css.receiptBack} />
          <ReceiptPaper />
          <span className={css.receiptAnnotation}>
            A little paper.
            <br />A lot of context.
            <Arrow />
          </span>
          <FigureLabel>
            Illustrative receipt · no original receipt supplied
          </FigureLabel>
        </figure>
        <div>
          <Copy slug="receipts" />
          <div className={css.receiptChips}>
            <span>
              <Box size={14} /> The basket
            </span>
            <span>
              <CreditCard size={14} /> The tender
            </span>
            <span>
              <ReceiptText size={14} /> The tax
            </span>
          </div>
          <HeroActions />
        </div>
      </div>
    </section>
  );
}
function SummaryHero() {
  return (
    <section className={css.summaryHero}>
      <div className={css.wrap}>
        <div className={css.centerCopy}>
          <Copy slug="day-summary-z" />
          <HeroActions />
        </div>
        <figure className={css.closeStatement}>
          <div className={css.statementLabel}>
            <span>Z / CLOSING STATEMENT</span>
            <Badge />
          </div>
          <div className={css.statementFigure}>
            <span>Gross sales</span>
            <strong>
              <small>৳</small> 3,450<span>.00</span>
            </strong>
            <p>One receipt. One item. A visible breakdown.</p>
          </div>
          <div className={css.salesBridge}>
            <div>
              <span>Includes VAT</span>
              <b>৳ 450.00</b>
            </div>
            <span>+</span>
            <div>
              <span>Cost of goods</span>
              <b>৳ 1,261.09</b>
            </div>
            <span>+</span>
            <div className={css.bridgeResult}>
              <span>Gross margin, after VAT & cost</span>
              <b>৳ 1,738.91</b>
            </div>
          </div>
          <FigureLabel>
            Supplied day-summary figures · historical snapshot
          </FigureLabel>
        </figure>
      </div>
    </section>
  );
}
function DashboardHero() {
  return (
    <section className={css.dashboardHero}>
      <div className={`${css.wrap} ${css.dashboardLayout}`}>
        <div>
          <Copy slug="outlet-dashboard" />
          <HeroActions />
          <p className={css.dashboardFoot}>OUTLETS / BASKETS / MARGIN</p>
        </div>
        <figure className={css.dashboardMosaic}>
          <div className={css.mosaicSales}>
            <span>NET SALES · SUPPLIED WINDOW</span>
            <strong>৳ 3,450</strong>
            <div className={css.singleBar}>
              <i />
              <span>One receipt in the supplied 14-day view</span>
            </div>
          </div>
          <div className={css.mosaicBasket}>
            <ShoppingBag size={22} />
            <strong>1</strong>
            <span>Receipt</span>
            <small>৳ 3,450 average basket</small>
          </div>
          <div className={css.mosaicMargin}>
            <span>GROSS MARGIN</span>
            <strong>৳ 1,738.91</strong>
            <div className={css.marginTrack}>
              <i />
            </div>
            <small>58% · as shown in source</small>
          </div>
          <div className={css.mosaicRegister}>
            <Monitor size={21} />
            <div>
              <b>R1-BSC</b>
              <span>Bashundhara City</span>
            </div>
            <ArrowRight size={18} />
          </div>
          <FigureLabel>
            Supplied historical dashboard · no invented trend
          </FigureLabel>
        </figure>
      </div>
    </section>
  );
}
function LoyaltyHero() {
  return (
    <section className={css.loyaltyHero}>
      <div className={css.wrap}>
        <div className={css.centerCopy}>
          <Copy slug="loyalty-vouchers" />
          <HeroActions />
        </div>
        <figure className={css.loyaltyScene}>
          <span className={css.orbitLabel}>A balance worth understanding.</span>
          <div className={css.loyaltyCard}>
            <header>
              <span>
                EDEN<span>ERP</span> / RETAIL
              </span>
              <Gift size={23} />
            </header>
            <span>LOYALTY ACCOUNTS</span>
            <strong>27</strong>
            <footer>
              <span>3,610 points in the supplied snapshot</span>
              <i />
            </footer>
          </div>
          <div className={css.voucher}>
            <div>
              <span>ACTIVE GIFT VOUCHERS</span>
              <b>02</b>
            </div>
            <div>
              <span>Outstanding value</span>
              <strong>৳ 3,770</strong>
            </div>
          </div>
          <div className={css.loyaltyRing} />
          <FigureLabel>
            Supplied aggregate balances · card illustration is conceptual
          </FigureLabel>
        </figure>
      </div>
    </section>
  );
}
function TransfersHero() {
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
            <span>SOURCE / FG</span>
            <b>Finished Goods</b>
          </div>
          <div className={css.routeTransit}>
            <span className={css.routeCaption}>
              Dispatch → Receive → Reconcile
            </span>
            <div className={css.routeTrack}>
              <i />
              <span>
                <Package size={29} />
              </span>
              <i />
            </div>
            <span className={css.routeReference}>
              STR-2026-000002 · 27 units · 3 lines
            </span>
          </div>
          <div className={css.routeDestination}>
            <Store size={32} />
            <span>DESTINATION / OUT2</span>
            <b>Jamuna Future Park</b>
          </div>
          <FigureLabel>
            Supplied received transfer · diagram shows the handover, not live
            tracking
          </FigureLabel>
        </figure>
      </div>
    </section>
  );
}
function LotsHero() {
  return (
    <section className={css.lotsHero}>
      <div className={`${css.wrap} ${css.lotsLayout}`}>
        <div>
          <Copy slug="stock-lots" />
          <HeroActions />
          <div className={css.lotSource}>
            <span>SUPPLIED LOT / 000001</span>
            <b>Gulshan Surplus Traders</b>
            <small>Assorted ladies’ tops + kids’ tees · 6 bales</small>
          </div>
        </div>
        <figure className={css.lotScene}>
          <div className={css.lotQuantity}>
            <b>1,150</b>
            <span>UNITS IN ONE LOT</span>
          </div>
          <div className={css.bale}>
            <span>LOT / 2026</span>
            <Package size={65} />
            <Barcode />
          </div>
          <div className={css.sortLine} />
          <div className={css.sortedItems}>
            <div>
              <Denim top />
              <span>Sort the intake</span>
            </div>
            <div>
              <Gift size={37} />
              <span>Share the cost</span>
            </div>
            <div>
              <ReceiptText size={37} />
              <span>Review the basis</span>
            </div>
          </div>
          <FigureLabel>
            Supplied lot totals · illustrative item sorting
          </FigureLabel>
        </figure>
      </div>
    </section>
  );
}
function StockHero() {
  return (
    <section className={css.stockHero}>
      <div className={css.wrap}>
        <div className={css.stockHeading}>
          <div>
            <Copy slug="outlet-stock" />
          </div>
          <div>
            <p className={css.stockNumber}>
              1,390<span>units on hand</span>
            </p>
            <HeroActions />
          </div>
        </div>
        <figure className={css.shelfScene}>
          <div className={css.shelfItem}>
            <span>01 / DENIM</span>
            <Denim />
            <div>
              <b>Athletic Fit Jean</b>
              <span>DH-6070 · 192 units</span>
            </div>
          </div>
          <div className={css.shelfItem}>
            <span>02 / COTTON TWILL</span>
            <Denim />
            <div>
              <b>Three-Quarter Pant</b>
              <span>DH-7101 · 80 units</span>
            </div>
          </div>
          <div className={css.shelfItem}>
            <span>03 / ASSORTED TOPS</span>
            <Denim top />
            <div>
              <b>Ladies’ Top — Blue</b>
              <span>LOT-TOP-BLU · 380 units</span>
            </div>
          </div>
          <div className={css.shelfBase}>
            <Barcode />
            <span>OUT1 / BASHUNDHARA CITY</span>
            <b>6 SKUs. One stock view.</b>
          </div>
          <FigureLabel>
            Three of six supplied stock lines · conceptual product illustrations
          </FigureLabel>
        </figure>
      </div>
    </section>
  );
}
function OutletsHero() {
  return (
    <section className={css.outletsHero}>
      <div className={`${css.wrap} ${css.outletsLayout}`}>
        <figure className={css.networkScene}>
          <div className={css.networkGrid} />
          <div className={css.networkHub}>
            <Box size={29} />
            <b>Factory</b>
            <span>FG / RM / WIP / CN</span>
          </div>
          <div className={css.networkBranch} />
          <div className={css.networkOutlet}>
            <Store size={24} />
            <div>
              <span>OUT1</span>
              <b>Bashundhara City</b>
              <small>Register · R1-BSC</small>
            </div>
          </div>
          <div className={css.networkOutlet}>
            <Store size={24} />
            <div>
              <span>OUT2</span>
              <b>Jamuna Future Park</b>
              <small>Register · R1-JFP</small>
            </div>
          </div>
          <div className={css.networkTotals}>
            <b>6</b> locations <span>→</span>
            <b>2</b> selling outlets
          </div>
          <FigureLabel>
            Supplied location network · schematic, not a geographic map
          </FigureLabel>
        </figure>
        <div>
          <Copy slug="outlets-registers" />
          <HeroActions />
          <p className={css.networkCaption}>
            <MapPin size={15} /> A place for the stock. A context for the sale.
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
