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
function Copy({ slug }: { slug: IndustrySlug }) {
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
function SteelHero() {
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
              <span>THE MATERIAL PASSPORT</span>
            </header>
            <div>
              <span>Identity</span>
              <b>Coil / lot reference</b>
            </div>
            <div>
              <span>Process</span>
              <b>Order + work-centre context</b>
            </div>
            <div>
              <span>Movement</span>
              <b>Weight + stock handoff</b>
            </div>
          </aside>
        </div>
        <figure className={css.rollingScene}>
          <header>
            <span>THE MILL, IN CONTEXT</span>
            <Badge>Concept illustration · no live machine data</Badge>
          </header>
          <div className={css.rollingArt}>
            <CoilDrawing />
            <div className={css.coilLabel}>
              <span>EXAMPLE MATERIAL</span>
              <b>{steelExample.reference}</b>
              <small>Identity through each handoff</small>
            </div>
            <div className={css.netSlip}>
              <Scale size={21} />
              <span>EXAMPLE NET INTAKE</span>
              <b>{kg(weight.net)}</b>
              <small>Gross less tare · local arithmetic</small>
            </div>
          </div>
          <div className={css.steelFlow}>
            <span>01 / INTAKE</span>
            <i />
            <span>02 / PRODUCTION</span>
            <i />
            <span>03 / DISPATCH CONTEXT</span>
          </div>
          <figcaption>
            Conceptual rolling line with illustrative weighment · no production
            or performance claim
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
function RiceHero() {
  const balance = riceMassBalance(riceExample.input, riceExample);
  return (
    <section className={css.riceHero}>
      <div className={`${css.wrap} ${css.riceLayout}`}>
        <figure className={css.grainScene}>
          <div className={css.grainHalo} />
          <div className={css.paddySheet}>
            <header>
              <Wheat size={19} />
              <span>THE LOT, THROUGH THE MILL</span>
            </header>
            <PaddyDrawing />
            <div className={css.lotReference}>
              <span>ILLUSTRATIVE INPUT LOT</span>
              <b>{riceExample.reference}</b>
              <strong>{kg(riceExample.input)}</strong>
            </div>
          </div>
          <div className={css.outputTickets}>
            <div>
              <Box size={18} />
              <span>Head rice</span>
              <b>{kg(riceExample.headRice)}</b>
            </div>
            <div>
              <Layers size={18} />
              <span>Broken rice</span>
              <b>{kg(riceExample.brokenRice)}</b>
            </div>
            <div>
              <Package size={18} />
              <span>Bran + husk</span>
              <b>{kg(riceExample.bran + riceExample.husk)}</b>
            </div>
          </div>
          <div className={css.balanceNote}>
            <span>Recorded outputs {kg(balance.recorded)}</span>
            <ArrowRight size={14} />
            <b>{kg(balance.unassigned)} unassigned</b>
          </div>
          <figcaption>
            Example weights only · output fractions are not milling benchmarks
          </figcaption>
        </figure>
        <div>
          <Copy slug="agro-rice" />
          <Actions />
          <div className={css.ricePrinciples}>
            <span>
              <Wheat size={15} /> Lot context
            </span>
            <span>
              <Scale size={15} /> Weight context
            </span>
            <span>
              <Package size={15} /> Stock context
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
