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
function Copy({ slug }: { slug: HospitalitySlug }) {
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
function RestaurantHero() {
  return (
    <section className={css.restaurantHero}>
      <div className={`${css.wrap} ${css.restaurantLayout}`}>
        <div>
          <Copy slug="restaurant" />
          <Actions />
          <div className={css.serviceSignature}>
            <Utensils size={15} />
            <span>DINING ROOM / ORDER / SERVICE</span>
          </div>
        </div>
        <figure className={css.diningPlan}>
          <header>
            <span>THE DINING ROOM / CONCEPT PLAN</span>
            <Badge>Fictional tables</Badge>
          </header>
          <div className={css.planCanvas}>
            <div className={css.hostDesk}>HOST / ARRIVAL</div>
            <div className={css.tableSketches}>
              {tables.map((t) => (
                <div
                  className={css.sketchTable}
                  data-state={t.state}
                  key={t.id}
                >
                  <b>{t.id}</b>
                  <span>{t.seats} seats</span>
                </div>
              ))}
            </div>
            <div className={css.placeSetting}>
              <PlateArt />
            </div>
            <span className={css.planDoor}>ENTRY</span>
          </div>
          <div className={css.tableDocket}>
            <ClipboardList size={19} />
            <div>
              <span>EXAMPLE TABLE T02</span>
              <b>4 seats. A party of 4.</b>
            </div>
            <small>
              A seat comparison,
              <br />
              not a reservation.
            </small>
          </div>
          <HandNote>A little room for better service.</HandNote>
          <figcaption>
            Concept floor plan · fictional table states and seat counts
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
function FastFoodHero() {
  const counts = ticketCounts(tickets.map((t) => t.stage));
  return (
    <section className={css.fastHero}>
      <div className={css.wrap}>
        <div className={css.fastHeading}>
          <Badge>THE KITCHEN PASS / CONCEPT 01</Badge>
          <Copy slug="fast-food" />
          <Actions />
        </div>
        <figure className={css.kitchenPass}>
          <div className={css.heroTicket}>
            <span>EX-K01 / FICTIONAL TICKET</span>
            <b>
              The order,
              <br />
              in the picture.
            </b>
            <div>
              <span>1 × house burger</span>
              <span>1 × potato side</span>
            </div>
            <footer>
              <i />
              Queued / local example
            </footer>
          </div>
          <div className={css.burgerStudy}>
            <span>THE HANDOFF, LAYER BY LAYER</span>
            <BurgerArt />
            <small>Concept food illustration</small>
          </div>
          <div className={css.passNote}>
            <span>ONE EXAMPLE PROCESS</span>
            <h3>
              A visible stage.
              <br />A clearer next step.
            </h3>
            <ol>
              {ticketStages.map((stage, i) => (
                <li key={stage}>
                  <span>0{i + 1}</span>
                  {ticketLabels[stage]}
                  <small>{counts[stage]} example ticket</small>
                </li>
              ))}
            </ol>
          </div>
          <div className={css.passRail}>
            <span>TAKE THE ORDER</span>
            <ArrowRight size={15} />
            <span>PREPARE</span>
            <ArrowRight size={15} />
            <span>READY FOR HANDOFF</span>
          </div>
          <figcaption>
            Fictional kitchen pass · stages change only in the local exercise
            below
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
function GuestHouseHero() {
  const stay = stayEstimate(arrivalDate, departureDate, 4000);
  return (
    <section className={css.guestHero}>
      <div className={`${css.wrap} ${css.guestLayout}`}>
        <figure className={css.guestJournal}>
          <div className={css.journalPages}>
            <div className={css.journalIllustration}>
              <span>THE WELCOME JOURNAL</span>
              <DoorArt />
              <small>A quiet arrival, thoughtfully considered.</small>
            </div>
            <div className={css.journalEntry}>
              <span>EX-STAY-01 / FICTIONAL</span>
              <h3>
                A few days.
                <br />A little clarity.
              </h3>
              <div>
                <small>ARRIVAL</small>
                <b>
                  15 <em>DEC</em>
                </b>
              </div>
              <div>
                <small>DEPARTURE</small>
                <b>
                  18 <em>DEC</em>
                </b>
              </div>
              <p>
                {stay.nights} example nights
                <br />
                <strong>{money(stay.nightly)} / night</strong>
              </p>
            </div>
          </div>
          <div className={css.keyTag}>
            <KeyArt />
            <span>THE GUEST HOUSE</span>
            <b>01</b>
            <small>Concept key tag</small>
          </div>
          <figcaption>
            Illustrative stay journal · dates and rates are fictional, not an
            availability check
          </figcaption>
        </figure>
        <div>
          <Copy slug="guest-house" />
          <Actions />
          <p className={css.guestFoot}>
            <DoorOpen size={16} />
            Arrival. Stay. A considered departure.
          </p>
        </div>
      </div>
    </section>
  );
}
function BeverageHero() {
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
            <span>01 / THE DEPOT</span>
            <b>The stock context</b>
            <small>Item → carton → units</small>
          </div>
          <div className={css.routeLine} />
          <div className={css.crateStudy}>
            <span>EX-LOAD-01 / FICTIONAL COUNT</span>
            <BottleArt />
            <div>
              <b>
                {num(load.cartons)}
                <small>cartons</small>
              </b>
              <span>=</span>
              <b>
                {num(load.units)}
                <small>individual units</small>
              </b>
            </div>
          </div>
          <div className={css.routeLine} />
          <div className={css.outletNode}>
            <Building2 size={28} />
            <span>02 / THE OUTLET</span>
            <b>The next handoff</b>
            <small>Trip and stock records</small>
          </div>
          <div className={css.dispatchLabel}>
            <MapPin size={14} />
            <span>DEPOT → OUTLET / CONCEPTUAL FLOW</span>
            <small>Count arithmetic only</small>
          </div>
          <figcaption>
            Fictional distribution story · no vehicle, route or dispatch is
            assigned
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
function HotelHero() {
  const snapshot = hotelSnapshot(rooms);
  return (
    <section className={css.hotelHero}>
      <div className={css.wrap}>
        <div className={css.hotelLayout}>
          <div>
            <Copy slug="hotel" />
            <Actions />
            <div className={css.propertySignature}>
              <span>THE ROOM</span>
              <i />
              <span>THE FLOOR</span>
              <i />
              <span>THE WHOLE PICTURE</span>
            </div>
          </div>
          <figure className={css.propertyStudy}>
            <div className={css.facadeRoof}>
              <Building2 size={21} />
              <span>A SMALL PROPERTY / CONCEPT STUDY</span>
            </div>
            <div className={css.facadeRooms}>
              {rooms.map((room) => (
                <div key={room.id} data-state={room.state}>
                  <span>ROOM {room.id}</span>
                  <i />
                  <small>{roomLabels[room.state]}</small>
                </div>
              ))}
            </div>
            <div className={css.facadeEntrance}>
              <span>ARRIVAL & RECEPTION</span>
              <div />
            </div>
            <div className={css.serviceMemo}>
              <span>THE SERVICE NOTE</span>
              <b>
                Every room state
                <br />
                adds context.
              </b>
              <small>Room 103 / service in this example</small>
            </div>
            <figcaption>
              Concept facade · six fictional rooms and local example states
            </figcaption>
          </figure>
        </div>
        <dl className={css.propertyRibbon}>
          <div>
            <dt>Fictional rooms</dt>
            <dd>{rooms.length}</dd>
          </div>
          <div>
            <dt>Occupied in the example</dt>
            <dd>{snapshot.occupied}</dd>
          </div>
          <div>
            <dt>Ready + occupied denominator</dt>
            <dd>{snapshot.denominator}</dd>
          </div>
          <div>
            <dt>Illustrative occupancy</dt>
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
