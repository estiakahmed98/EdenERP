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
function Copy({ slug }: { slug: IndustrialSlug }) {
  const p = pages[slug];
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
  const fabric = fabricLength(1000, defaultLosses);
  return (
    <section className={css.textileHero}>
      <div className={`${base.wrap} ${css.textileLayout}`}>
        <div>
          <Copy slug="textile" />
          <Actions />
          <p className={css.heroFoot}>
            THE MATERIAL / THE PROCESS / THE FINISHED LENGTH
          </p>
        </div>
        <figure className={css.materialStudy}>
          <header>
            <span>EX-TX01 / THE MATERIAL NOTES</span>
            <Badge>Concept fabric study</Badge>
          </header>
          <div className={css.fabricCanvas}>
            <FabricArt />
            <div className={css.fabricLabel}>
              <span>ILLUSTRATIVE INPUT</span>
              <b>
                1,000 <small>m</small>
              </b>
              <small>Length stays in metres throughout.</small>
            </div>
          </div>
          <div className={css.processRibbons}>
            {textileStages.map((stage, i) => (
              <div key={stage}>
                <span>
                  0{i + 1} / {stage}
                </span>
                <b>
                  {num(fabric.stages[i].after, 3)}
                  <small> m</small>
                </b>
                <small>After {defaultLosses[i]}% entered loss</small>
              </div>
            ))}
          </div>
          <HandNote>Keep the length’s journey in view.</HandNote>
          <figcaption>
            Fictional fabric-length assumptions · no material conversion or
            process forecast
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
function MetalHero() {
  const cut = barPattern(6000, 1200, 3, 12);
  return (
    <section className={css.metalHero}>
      <div className={base.wrap}>
        <div className={css.metalHeading}>
          <Badge>THE FABRICATION STUDY / CONCEPT 01</Badge>
          <Copy slug="metal" />
          <Actions />
        </div>
        <figure className={css.cutStudy}>
          <div className={css.cutDrawing}>
            <header>
              <span>EX-CUT01 / ONE-LENGTH PATTERN</span>
              <Ruler size={18} />
            </header>
            <BeamArt />
            <div className={css.dimensionStrip}>
              <span>6,000 mm stock</span>
              <i />
              <span>1,200 mm piece</span>
              <i />
              <span>3 mm allowance / piece</span>
            </div>
          </div>
          <div className={css.cutDocket}>
            <Layers size={24} />
            <span>THE ENTERED CUT ASSUMPTIONS</span>
            <b>
              {cut.perBar}
              <small>pieces / full-pattern bar</small>
            </b>
            <div>
              <span>Requested pieces</span>
              <strong>12</strong>
            </div>
            <div>
              <span>Calculated stock bars</span>
              <strong>{cut.bars}</strong>
            </div>
            <div>
              <span>Remaining length / all bars</span>
              <strong>{num(cut.remaining)} mm</strong>
            </div>
            <small>
              Allowance is consumed for every piece, including final separation.
            </small>
          </div>
          <figcaption>
            Concept bar illustration and fictional arithmetic · no machine-ready
            cutting plan
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
function FurnitureHero() {
  const kits = componentKits(24, components);
  return (
    <section className={css.furnitureHero}>
      <div className={`${base.wrap} ${css.furnitureLayout}`}>
        <figure className={css.assemblyStudy}>
          <header>
            <span>EX-FURN01 / THE ASSEMBLY NOTES</span>
            <Badge>Concept exploded view</Badge>
          </header>
          <div className={css.assemblyCanvas}>
            <ChairArt />
            <div className={css.assemblyLabelA}>
              <b>A</b>
              <span>Design context</span>
            </div>
            <div className={css.assemblyLabelB}>
              <b>B</b>
              <span>Seat panel</span>
            </div>
            <div className={css.assemblyLabelC}>
              <b>C</b>
              <span>Leg components</span>
            </div>
          </div>
          <div className={css.kitNote}>
            <span>COMPONENT-ONLY EXAMPLE</span>
            <b>
              {kits.available}
              <small>kit equivalents from entered stock</small>
            </b>
            <p>For an illustrative request of 24 chairs.</p>
          </div>
          <figcaption>
            Concept chair drawing · three-line component arithmetic, separate
            from real production
          </figcaption>
        </figure>
        <div>
          <Copy slug="furniture" />
          <Actions />
          <div className={css.assemblyFlow}>
            <span>DESIGN</span>
            <ArrowRight size={13} />
            <span>PARTS</span>
            <ArrowRight size={13} />
            <span>ASSEMBLY</span>
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
