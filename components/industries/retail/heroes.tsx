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
function Copy({ slug }: { slug: RetailSlug }) {
  const p = pages[slug];
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
  return (
    <section className={css.bookHero}>
      <div className={`${css.wrap} ${css.bookLayout}`}>
        <div className={css.bookCopy}>
          <span className={css.edition}>RETAIL NOTES / CHAPTER 01</span>
          <Copy slug="book-store" />
          <Actions />
          <p className={css.heroFoot}>The shelf. The reader. The record.</p>
        </div>
        <figure className={css.libraryScene}>
          <div className={css.shelfLabel}>
            <BookOpen size={17} />
            <span>THE CONSIDERED BOOKSHELF</span>
          </div>
          <div className={css.bookDisplay}>
            <div className={css.featuredBook}>
              <span>EX-B01 / FICTIONAL TITLE</span>
              <b>
                The
                <br />
                Quiet
                <br />
                <i>Atlas.</i>
              </b>
              <div className={css.bookOrbit} />
              <small>A collection of imagined journeys</small>
            </div>
            <div className={css.bookSpines}>
              {books.slice(1).map((book) => (
                <div key={book.id} data-colour={book.colour}>
                  <span>{book.name}</span>
                  <small>{book.id}</small>
                </div>
              ))}
            </div>
          </div>
          <div className={css.shelfRule} />
          <div className={css.bookTicket}>
            <span>EXAMPLE / PAPERBACK</span>
            <b>{money(450)}</b>
            <small>Illustrative price · not an offer</small>
          </div>
          <CurvedNote>Every title has a place.</CurvedNote>
          <figcaption>
            Concept shelf · fictional titles, identifiers and prices
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
function ClothingHero() {
  return (
    <section className={css.clothingHero}>
      <div className={css.wrap}>
        <div className={css.lookbookHeading}>
          <Badge>COLLECTION / CONCEPT 01</Badge>
          <Copy slug="clothing-store" />
          <Actions />
        </div>
        <figure className={css.lookbook}>
          <div className={css.swatchCard}>
            <Palette size={19} />
            <span>THE COLOUR STORY</span>
            <div className={css.swatchDots}>
              {colours.map((c) => (
                <i key={c.id} style={{ background: c.hex }} />
              ))}
            </div>
            <b>Navy. Sage. Cream.</b>
            <small>Three illustrative colour choices</small>
          </div>
          <div className={css.garmentPlate}>
            <span>THE EVERYDAY OVERSHIRT / CONCEPT FLAT</span>
            <ShirtArt />
            <div className={css.plateRule} />
            <span>COLOUR × SIZE × STOCK CONTEXT</span>
          </div>
          <div className={css.variantCard}>
            <Tag size={18} />
            <span>EX-CL-NAVY-M</span>
            <b>
              A collection,
              <br />
              piece by piece.
            </b>
            <div>
              S <span>M</span> L
            </div>
            <small>Fictional variant identifiers and stock</small>
          </div>
          <figcaption>
            A conceptual lookbook, separate from the editable variant exercise
            below
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
function FurnitureHero() {
  return (
    <section className={css.furnitureHero}>
      <div className={`${css.wrap} ${css.furnitureLayout}`}>
        <figure className={css.roomSheet}>
          <header>
            <span>THE SMALL SHOWROOM / CONCEPT PLAN</span>
            <ArrowUpRight size={18} />
          </header>
          <RoomArt />
          <div className={css.roomLegend}>
            <span>
              <i />
              Studio sofa
            </span>
            <span>
              <i />
              Reading chair
            </span>
            <span>
              <i />
              Low table
            </span>
          </div>
          <div className={css.finishStrip}>
            <span>FINISH NOTES</span>
            <i />
            <i />
            <i />
            <small>A choice belongs in the record.</small>
          </div>
          <figcaption>
            Illustrative top view · not a scale or dimension-checked room plan
          </figcaption>
        </figure>
        <div className={css.furnitureCopy}>
          <Copy slug="furniture-store" />
          <Actions />
          <div className={css.materialSignature}>
            <span>01 / THE PIECE</span>
            <span>02 / THE FINISH</span>
            <span>03 / THE HANDOFF</span>
          </div>
        </div>
      </div>
    </section>
  );
}
function GroceryHero() {
  return (
    <section className={css.groceryHero}>
      <div className={css.wrap}>
        <div className={css.groceryHeading}>
          <div>
            <Copy slug="grocery-store" />
            <Actions />
          </div>
          <div className={css.freshSeal}>
            <span>RETAIL</span>
            <ProduceArt />
            <b>A shelf with a story.</b>
            <small>Concept produce illustration</small>
          </div>
        </div>
        <figure className={css.freshLedger}>
          <div className={css.ledgerTitle}>
            <span>THE SHELF NOTES</span>
            <b>
              Batch detail,
              <br />
              kept close.
            </b>
          </div>
          <div className={css.dateTicket}>
            <span>FICTIONAL REFERENCE DATE</span>
            <b>
              15 <i>DEC</i>
            </b>
            <small>2026 / editable example below</small>
          </div>
          <div className={css.batchTicket}>
            <span>EX-G02 / YOGHURT CUP</span>
            <b>
              36 <small>example units</small>
            </b>
            <p>
              Recorded date <strong>16 Dec 2026</strong>
            </p>
            <small>Date arithmetic only · no safety assessment</small>
          </div>
          <figcaption>
            Concept stock ledger · dates and quantities are illustrative
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
function HardwareHero() {
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
              <span>ITEM STUDY / CONCEPT ONLY</span>
              <span>EX-H01</span>
            </header>
            <FixingArt />
            <div className={css.diagramCaption}>
              THE UNIT IS PART OF THE DETAIL.
            </div>
          </div>
          <div className={css.packTicket}>
            <Boxes size={25} />
            <span>ILLUSTRATIVE PACK NOTE</span>
            <b>
              50<small>units / pack</small>
            </b>
            <div>
              <span>Target</span>
              <strong>240 units</strong>
            </div>
            <div>
              <span>On hand</span>
              <strong>65 units</strong>
            </div>
            <div>
              <span>Shortage</span>
              <strong>175 units</strong>
            </div>
            <footer>
              <b>4 packs</b>
              <span>25 units remain after the target</span>
            </footer>
          </div>
          <CurvedNote>Count the pack. Keep the unit.</CurvedNote>
          <figcaption>
            Concept fastener drawing and fictional pack arithmetic · no product
            specification
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
function ToyHero() {
  return (
    <section className={css.toyHero}>
      <div className={`${css.wrap} ${css.toyLayout}`}>
        <div className={css.toyCopy}>
          <Badge>A THOUGHTFUL LITTLE RETAIL WORLD</Badge>
          <Copy slug="toy-store" />
          <Actions />
          <div className={css.playSignature}>
            <span>
              <Check size={13} />A clear basket
            </span>
            <span>
              <Check size={13} />A considered gift
            </span>
          </div>
        </div>
        <figure className={css.playDisplay}>
          <div className={css.playOrbit} />
          <div className={css.blockStage}>
            <span>THE PLAY COLLECTION / CONCEPT 01</span>
            <ToyArt />
            <b>
              Room for
              <br />
              <i>imagination.</i>
            </b>
          </div>
          <div className={css.trainNote}>
            <ToyArt kind="train" />
            <span>
              A small collection.
              <br />
              Its own item details.
            </span>
          </div>
          <div className={css.giftNote}>
            <span>GIFT BASKET / EXAMPLE</span>
            <b>
              A little thought
              <br />
              goes a long way.
            </b>
            <small>Explore an entered budget below.</small>
          </div>
          <figcaption>
            Fictional toy concepts · no age, safety or availability claims
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
