import {
  ArrowRight,
  Building2,
  ClipboardList,
  DoorOpen,
  MapPin,
  Utensils,
  Warehouse,
} from "lucide-react";
import {
  cartonLoad,
  hotelSnapshot,
  stayEstimate,
  ticketCounts,
} from "./calculations";
import {
  arrivalDate,
  departureDate,
  drinks,
  money,
  num,
  pages,
  roomLabels,
  rooms,
  tables,
  ticketLabels,
  tickets,
  ticketStages,
  type HospitalitySlug,
} from "./data";
import {
  Actions,
  Badge,
  BottleArt,
  BurgerArt,
  DoorArt,
  HandNote,
  KeyArt,
  PlateArt,
  css,
} from "./ui";
import { useTranslations } from "next-intl";
function Copy({ slug }: { slug: HospitalitySlug }) {
  const tx = useTranslations("pages.industriesApp");
  const p = pages(tx)[slug];
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
function RestaurantHero() {
  const tx = useTranslations("pages.industriesApp");
  return (
    <section className={css.restaurantHero}>
      <div className={`${css.wrap} ${css.restaurantLayout}`}>
        <div>
          <Copy slug="restaurant" />
          <Actions />
          <div className={css.serviceSignature}>
            <Utensils size={15} />
            <span>{tx("hospitality.heroes.diningRoomOrderService")}</span>
          </div>
        </div>
        <figure className={css.diningPlan}>
          <header>
            <span>{tx("hospitality.heroes.theDiningRoomConceptPlan")}</span>
            <Badge>{tx("hospitality.heroes.fictionalTables")}</Badge>
          </header>
          <div className={css.planCanvas}>
            <div className={css.hostDesk}>{tx("hospitality.heroes.hostArrival")}</div>
            <div className={css.tableSketches}>
              {tables.map((t) => (
                <div
                  className={css.sketchTable}
                  data-state={t.state}
                  key={t.id}
                >
                  <b>{t.id}</b>
                  <span>{t.seats}{" "}{tx("hospitality.heroes.seats")}</span>
                </div>
              ))}
            </div>
            <div className={css.placeSetting}>
              <PlateArt />
            </div>
            <span className={css.planDoor}>{tx("hospitality.heroes.entry")}</span>
          </div>
          <div className={css.tableDocket}>
            <ClipboardList size={19} />
            <div>
              <span>{tx("hospitality.heroes.exampleTableT02")}</span>
              <b>{tx("hospitality.heroes.n4SeatsAPartyOf4")}</b>
            </div>
            <small>
              {tx("hospitality.heroes.aSeatComparison")}
              <br />
              {tx("hospitality.heroes.notAReservation")}
            </small>
          </div>
          <HandNote>{tx("hospitality.heroes.aLittleRoomForBetterService")}</HandNote>
          <figcaption>
            {tx("hospitality.heroes.conceptFloorPlanFictionalTableStates")}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
function FastFoodHero() {
  const tx = useTranslations("pages.industriesApp");
  const counts = ticketCounts(tickets(tx).map((t) => t.stage));
  return (
    <section className={css.fastHero}>
      <div className={css.wrap}>
        <div className={css.fastHeading}>
          <Badge>{tx("hospitality.heroes.theKitchenPassConcept01")}</Badge>
          <Copy slug="fast-food" />
          <Actions />
        </div>
        <figure className={css.kitchenPass}>
          <div className={css.heroTicket}>
            <span>{tx("hospitality.heroes.exK01FictionalTicket")}</span>
            <b>
              {tx("hospitality.heroes.theOrder")}
              <br />
              {tx("hospitality.heroes.inThePicture")}
            </b>
            <div>
              <span>{tx("hospitality.heroes.n1HouseBurger")}</span>
              <span>{tx("hospitality.heroes.n1PotatoSide")}</span>
            </div>
            <footer>
              <i />
              {tx("hospitality.heroes.queuedLocalExample")}
            </footer>
          </div>
          <div className={css.burgerStudy}>
            <span>{tx("hospitality.heroes.theHandoffLayerByLayer")}</span>
            <BurgerArt />
            <small>{tx("hospitality.heroes.conceptFoodIllustration")}</small>
          </div>
          <div className={css.passNote}>
            <span>{tx("hospitality.heroes.oneExampleProcess")}</span>
            <h3>
              {tx("hospitality.heroes.aVisibleStage")}
              <br />{tx("hospitality.heroes.aClearerNextStep")}
            </h3>
            <ol>
              {ticketStages.map((stage, i) => (
                <li key={stage}>
                  <span>0{i + 1}</span>
                  {ticketLabels(tx)[stage]}
                  <small>{counts[stage]}{" "}{tx("hospitality.heroes.exampleTicket")}</small>
                </li>
              ))}
            </ol>
          </div>
          <div className={css.passRail}>
            <span>{tx("hospitality.heroes.takeTheOrder")}</span>
            <ArrowRight size={15} />
            <span>{tx("hospitality.heroes.prepare")}</span>
            <ArrowRight size={15} />
            <span>{tx("hospitality.heroes.readyForHandoff")}</span>
          </div>
          <figcaption>
            {tx("hospitality.heroes.fictionalKitchenPassStagesChangeOnly")}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
function GuestHouseHero() {
  const tx = useTranslations("pages.industriesApp");
  const stay = stayEstimate(arrivalDate, departureDate, 4000);
  return (
    <section className={css.guestHero}>
      <div className={`${css.wrap} ${css.guestLayout}`}>
        <figure className={css.guestJournal}>
          <div className={css.journalPages}>
            <div className={css.journalIllustration}>
              <span>{tx("hospitality.heroes.theWelcomeJournal")}</span>
              <DoorArt />
              <small>{tx("hospitality.heroes.aQuietArrivalThoughtfullyConsidered")}</small>
            </div>
            <div className={css.journalEntry}>
              <span>{tx("hospitality.heroes.exStay01Fictional")}</span>
              <h3>
                {tx("hospitality.heroes.aFewDays")}
                <br />{tx("hospitality.heroes.aLittleClarity")}
              </h3>
              <div>
                <small>{tx("hospitality.heroes.arrival")}</small>
                <b>
                  15 <em>{tx("hospitality.heroes.dec")}</em>
                </b>
              </div>
              <div>
                <small>{tx("hospitality.heroes.departure")}</small>
                <b>
                  18 <em>{tx("hospitality.heroes.dec")}</em>
                </b>
              </div>
              <p>
                {stay.nights}{" "}{tx("hospitality.heroes.exampleNights")}
                <br />
                <strong>{money(stay.nightly)}{" "}{tx("hospitality.heroes.night")}</strong>
              </p>
            </div>
          </div>
          <div className={css.keyTag}>
            <KeyArt />
            <span>{tx("hospitality.heroes.theGuestHouse")}</span>
            <b>01</b>
            <small>{tx("hospitality.heroes.conceptKeyTag")}</small>
          </div>
          <figcaption>
            {tx("hospitality.heroes.illustrativeStayJournalDatesAndRates")}
          </figcaption>
        </figure>
        <div>
          <Copy slug="guest-house" />
          <Actions />
          <p className={css.guestFoot}>
            <DoorOpen size={16} />
            {tx("hospitality.heroes.arrivalStayAConsideredDeparture")}
          </p>
        </div>
      </div>
    </section>
  );
}
function BeverageHero() {
  const tx = useTranslations("pages.industriesApp");
  const load = cartonLoad(drinks, 600);
  return (
    <section className={css.beverageHero}>
      <div className={css.wrap}>
        <div className={css.beverageHeading}>
          <Copy slug="beverage-distributor" />
          <Actions />
        </div>
        <figure className={css.distributionMap}>
          <div className={css.depotNode}>
            <Warehouse size={28} />
            <span>{tx("hospitality.heroes.n01TheDepot")}</span>
            <b>{tx("hospitality.heroes.theStockContext")}</b>
            <small>{tx("hospitality.heroes.itemCartonUnits")}</small>
          </div>
          <div className={css.routeLine} />
          <div className={css.crateStudy}>
            <span>{tx("hospitality.heroes.exLoad01FictionalCount")}</span>
            <BottleArt />
            <div>
              <b>
                {num(load.cartons)}
                <small>{tx("hospitality.heroes.cartons")}</small>
              </b>
              <span>=</span>
              <b>
                {num(load.units)}
                <small>{tx("hospitality.heroes.individualUnits")}</small>
              </b>
            </div>
          </div>
          <div className={css.routeLine} />
          <div className={css.outletNode}>
            <Building2 size={28} />
            <span>{tx("hospitality.heroes.n02TheOutlet")}</span>
            <b>{tx("hospitality.heroes.theNextHandoff")}</b>
            <small>{tx("hospitality.heroes.tripAndStockRecords")}</small>
          </div>
          <div className={css.dispatchLabel}>
            <MapPin size={14} />
            <span>{tx("hospitality.heroes.depotOutletConceptualFlow")}</span>
            <small>{tx("hospitality.heroes.countArithmeticOnly")}</small>
          </div>
          <figcaption>
            {tx("hospitality.heroes.fictionalDistributionStoryNoVehicleRoute")}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
function HotelHero() {
  const tx = useTranslations("pages.industriesApp");
  const snapshot = hotelSnapshot(rooms);
  return (
    <section className={css.hotelHero}>
      <div className={css.wrap}>
        <div className={css.hotelLayout}>
          <div>
            <Copy slug="hotel" />
            <Actions />
            <div className={css.propertySignature}>
              <span>{tx("hospitality.heroes.theRoom")}</span>
              <i />
              <span>{tx("hospitality.heroes.theFloor")}</span>
              <i />
              <span>{tx("hospitality.heroes.theWholePicture")}</span>
            </div>
          </div>
          <figure className={css.propertyStudy}>
            <div className={css.facadeRoof}>
              <Building2 size={21} />
              <span>{tx("hospitality.heroes.aSmallPropertyConceptStudy")}</span>
            </div>
            <div className={css.facadeRooms}>
              {rooms.map((room) => (
                <div key={room.id} data-state={room.state}>
                  <span>{tx("hospitality.heroes.room")}{" "}{room.id}</span>
                  <i />
                  <small>{roomLabels(tx)[room.state]}</small>
                </div>
              ))}
            </div>
            <div className={css.facadeEntrance}>
              <span>{tx("hospitality.heroes.arrivalReception")}</span>
              <div />
            </div>
            <div className={css.serviceMemo}>
              <span>{tx("hospitality.heroes.theServiceNote")}</span>
              <b>
                {tx("hospitality.heroes.everyRoomState")}
                <br />
                {tx("hospitality.heroes.addsContext")}
              </b>
              <small>{tx("hospitality.heroes.room103ServiceInThisExample")}</small>
            </div>
            <figcaption>
              {tx("hospitality.heroes.conceptFacadeSixFictionalRoomsAnd")}
            </figcaption>
          </figure>
        </div>
        <dl className={css.propertyRibbon}>
          <div>
            <dt>{tx("hospitality.heroes.fictionalRooms")}</dt>
            <dd>{rooms.length}</dd>
          </div>
          <div>
            <dt>{tx("hospitality.heroes.occupiedInTheExample")}</dt>
            <dd>{snapshot.occupied}</dd>
          </div>
          <div>
            <dt>{tx("hospitality.heroes.readyOccupiedDenominator")}</dt>
            <dd>{snapshot.denominator}</dd>
          </div>
          <div>
            <dt>{tx("hospitality.heroes.illustrativeOccupancy")}</dt>
            <dd>{snapshot.occupancy?.toFixed(0)}%</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
const heroes = {
  restaurant: RestaurantHero,
  "fast-food": FastFoodHero,
  "guest-house": GuestHouseHero,
  "beverage-distributor": BeverageHero,
  hotel: HotelHero,
};
export default function HospitalityHero({ slug }: { slug: HospitalitySlug }) {
  const Hero = heroes[slug];
  return <Hero />;
}
