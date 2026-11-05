import {
  ArrowRight,
  Check,
  ClipboardList,
  FileText,
  MapPin,
  UserRound,
} from "lucide-react";
import {
  allocation,
  candidateCounts,
  checklist,
  costLines,
  evidenceCounts,
  tripEstimate,
} from "./calculations";
import {
  candidateLabels,
  candidates,
  candidateStages,
  channels,
  evidenceRows,
  money,
  num,
  pages,
  phases,
  properties,
  reviewTasks,
  workItems,
  type ProfessionalSlug,
} from "./data";
import {
  Actions,
  AllocationRing,
  Badge,
  BuildingArt,
  CraneArt,
  EvidenceArt,
  HandNote,
  PlanArt,
  RouteArt,
  css,
} from "./ui";
function Copy({ slug }: { slug: ProfessionalSlug }) {
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
function AgencyHero() {
  return (
    <section className={css.agencyHero}>
      <div className={`${css.wrap} ${css.agencyLayout}`}>
        <div>
          <Copy slug="real-estate-agency" />
          <Actions />
          <p className={css.heroFoot}>
            THE ADDRESS / THE BUYER / THE NEXT HANDOFF
          </p>
        </div>
        <figure className={css.portfolio}>
          <header>
            <MapPin size={17} />
            <span>THE PROPERTY PORTFOLIO / CONCEPT</span>
          </header>
          <BuildingArt />
          <div className={css.propertyNotes}>
            {properties.slice(0, 2).map((p, i) => (
              <div key={p.id}>
                <span>
                  0{i + 1} / {p.id}
                </span>
                <b>{p.name}</b>
                <small>
                  {num(p.area)} sq ft · {p.type}
                </small>
                <strong>{money(p.price)}</strong>
              </div>
            ))}
          </div>
          <HandNote>The detail behind the address.</HandNote>
          <figcaption>
            Concept massing and fictional properties · not live listings
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
function ArchitectureHero() {
  return (
    <section className={css.architectureHero}>
      <div className={css.wrap}>
        <div className={css.architectureHeading}>
          <Badge>THE DESIGN DESK / CONCEPT STUDY 01</Badge>
          <Copy slug="architecture-firm" />
          <Actions />
        </div>
        <figure className={css.draftingDesk}>
          <div className={css.planIndex}>
            <span>THE PHASE NOTES</span>
            <b>
              01
              <br />
              <em>Design intent.</em>
            </b>
            <small>Give every phase a clear place.</small>
          </div>
          <div className={css.planStack}>
            <div className={css.backSheet} />
            <div className={css.frontSheet}>
              <header>
                <span>EX-ARCH-01 / CONCEPT ONLY</span>
                <span>PLAN STUDY</span>
              </header>
              <PlanArt />
              <div>
                <span>BRIEF → PHASES → RECORDS</span>
                <small>Not a scale drawing</small>
              </div>
            </div>
          </div>
          <div className={css.phaseStrip}>
            {phases.map((p, i) => (
              <div key={p.name}>
                <span>0{i + 1}</span>
                <b>{p.name}</b>
                <small>{p.hours} fictional hours</small>
              </div>
            ))}
          </div>
          <figcaption>
            Illustrative drafting composition · no technical specification or
            project is created
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
function ConstructionHero() {
  const costs = costLines(
    workItems.map((row) => ({ quantity: row.quantity, rate: row.rate })),
  );
  return (
    <section className={css.constructionHero}>
      <div className={css.wrap}>
        <div className={css.siteHeading}>
          <Copy slug="construction" />
          <Actions />
        </div>
        <figure className={css.siteComposition}>
          <div className={css.siteDrawing}>
            <header>
              <span>THE SITE NOTES / CONCEPT ELEVATION</span>
              <span>EX-WORK-01</span>
            </header>
            <CraneArt />
            <p>THE WORK ITEM IS PART OF THE PROJECT STORY.</p>
          </div>
          <div className={css.costTicket}>
            <ClipboardList size={23} />
            <span>FICTIONAL WORK LINES</span>
            {workItems.map((row, i) => (
              <div key={row.name}>
                <span>{row.name}</span>
                <b>{money(costs.lines[i])}</b>
              </div>
            ))}
            <footer>
              <span>Entered example total</span>
              <b>{money(costs.total)}</b>
            </footer>
          </div>
          <figcaption>
            Concept site illustration and fictional arithmetic · no engineering
            estimate or specification
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
function AccountingHero() {
  const progress = checklist([true, false, false, false]);
  return (
    <section className={css.accountingHero}>
      <div className={`${css.wrap} ${css.accountingLayout}`}>
        <figure className={css.reviewLedger}>
          <header>
            <FileText size={18} />
            <span>EX-ENG-01 / FICTIONAL REVIEW NOTES</span>
          </header>
          <div className={css.ledgerHeading}>
            <h3>
              The work behind
              <br />
              the numbers.
            </h3>
            <b>
              {progress.done}
              <small> / {progress.total}</small>
            </b>
          </div>
          <div className={css.ledgerRows}>
            {reviewTasks.map((task, i) => (
              <div key={task}>
                <span>0{i + 1}</span>
                <b>{task}</b>
                {i === 0 ? <Check size={17} aria-hidden="true" /> : <i />}
              </div>
            ))}
          </div>
          <p>Manually tracked example tasks, with their context intact.</p>
          <figcaption>
            Illustrative engagement ledger · no accounts or documents are
            inspected
          </figcaption>
        </figure>
        <div>
          <Copy slug="accounting-firm" />
          <Actions />
          <p className={css.heroFoot}>
            CLIENT CONTEXT / REVIEW NOTES / A CLEARER HANDOFF
          </p>
        </div>
      </div>
    </section>
  );
}
function MarketingHero() {
  const budget = allocation(
    channels.map((c) => c.amount),
    300000,
  );
  return (
    <section className={css.marketingHero}>
      <div className={`${css.wrap} ${css.marketingLayout}`}>
        <div>
          <Copy slug="marketing-agency" />
          <Actions />
          <HandNote>Give the idea a little structure.</HandNote>
        </div>
        <figure className={css.creativeBoard}>
          <div className={css.creativePoster}>
            <span>EX-CAMP-01 / THE CREATIVE BRIEF</span>
            <b>
              Think.
              <br />
              Make.
              <br />
              <em>Connect.</em>
            </b>
            <div className={css.posterOrbit} />
            <small>A concept campaign, with its assumptions visible.</small>
          </div>
          <div className={css.channelNote}>
            <AllocationRing
              amounts={channels.map((c) => c.amount)}
              labels={channels.map((c) => c.name)}
            />
            <div>
              <span>EXAMPLE ALLOCATION</span>
              <b>{money(budget.assigned)}</b>
              <small>Budget shape, not predicted results.</small>
            </div>
          </div>
          <figcaption>
            Concept campaign board · fictional channel amounts and no
            performance forecast
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
function TalentHero() {
  const counts = candidateCounts(candidates.map((c) => c.stage));
  return (
    <section className={css.talentHero}>
      <div className={css.wrap}>
        <div className={css.talentHeading}>
          <div>
            <Copy slug="talent-acquisition" />
            <Actions />
          </div>
          <div className={css.roleBrief}>
            <UserRound size={25} />
            <span>THE ROLE BRIEF</span>
            <b>
              A clear next step,
              <br />
              with the person in context.
            </b>
            <small>Anonymous fictional candidate IDs</small>
          </div>
        </div>
        <figure className={css.candidateJourney}>
          {candidateStages.map((stage, i) => (
            <div className={css.journeyStep} key={stage}>
              <header>
                <span>0{i + 1} / THE JOURNEY</span>
                <ArrowRight size={16} />
              </header>
              <div className={css.avatarMark}>
                <UserRound size={28} />
              </div>
              <b>{candidateLabels[stage]}</b>
              <span>{counts[stage]} fictional candidate</span>
              <small>
                {candidates[i].id} / {candidates[i].role}
              </small>
            </div>
          ))}
          <figcaption>
            Illustrative stages · no scoring, applicant assessment or hiring
            recommendation
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
function AuditHero() {
  const count = evidenceCounts(evidenceRows.map((r) => r.state));
  return (
    <section className={css.auditHero}>
      <div className={`${css.wrap} ${css.auditLayout}`}>
        <div>
          <Copy slug="audit-certification" />
          <Actions />
          <p className={css.heroFoot}>
            THE DOCUMENT / THE REVIEW STATE / THE FOLLOW-UP
          </p>
        </div>
        <figure className={css.evidenceDesk}>
          <div className={css.dossierBack}>
            <EvidenceArt />
            <span>THE DOCUMENT CONTEXT</span>
          </div>
          <div className={css.dossierFront}>
            <header>
              <span>EX-E01 / FICTIONAL EVIDENCE</span>
            </header>
            <EvidenceArt />
            <b>
              A readable
              <br />
              trail of context.
            </b>
            <small>Manually reviewed in this example</small>
          </div>
          <div className={css.reviewPath}>
            <span>
              {count.missing}
              <small>Missing</small>
            </span>
            <i />
            <span>
              {count.provided}
              <small>Provided</small>
            </span>
            <i />
            <span>
              {count.reviewed}
              <small>Reviewed</small>
            </span>
          </div>
          <figcaption>
            Concept evidence dossier · not a compliance decision or
            certification seal
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
function TravelHero() {
  const trip = tripEstimate({
    travellers: 2,
    fare: 25000,
    rooms: 1,
    nights: 3,
    nightly: 5000,
    transfer: 3000,
  });
  return (
    <section className={css.travelHero}>
      <div className={`${css.wrap} ${css.travelLayout}`}>
        <figure className={css.itinerary}>
          <header>
            <span>EX-TRIP-01 / THE ITINERARY NOTES</span>
            <Badge>Fictional journey</Badge>
          </header>
          <RouteArt />
          <div className={css.waypointLabels}>
            <span>01 / DEPARTURE</span>
            <span>02 / THE STAY</span>
            <span>03 / RETURN</span>
          </div>
          <div className={css.tripPass}>
            <div>
              <span>EXAMPLE TRAVELLERS</span>
              <b>02</b>
            </div>
            <div>
              <span>EXAMPLE NIGHTS</span>
              <b>03</b>
            </div>
            <div>
              <span>LOCAL ESTIMATE</span>
              <strong>{money(trip.total)}</strong>
            </div>
          </div>
          <HandNote>A journey, thoughtfully considered.</HandNote>
          <figcaption>
            Concept travel plan · fictional prices and no live availability
          </figcaption>
        </figure>
        <div>
          <Copy slug="travel-agency" />
          <Actions />
          <p className={css.heroFoot}>
            THE JOURNEY / THE ASSUMPTIONS / THE RECORD
          </p>
        </div>
      </div>
    </section>
  );
}
const heroes = {
  "real-estate-agency": AgencyHero,
  "architecture-firm": ArchitectureHero,
  construction: ConstructionHero,
  "accounting-firm": AccountingHero,
  "marketing-agency": MarketingHero,
  "talent-acquisition": TalentHero,
  "audit-certification": AuditHero,
  "travel-agency": TravelHero,
};
export default function ProfessionalHero({ slug }: { slug: ProfessionalSlug }) {
  const Hero = heroes[slug];
  return <Hero />;
}
