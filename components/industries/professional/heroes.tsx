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
import { useTranslations } from "next-intl";
function Copy({ slug }: { slug: ProfessionalSlug }) {
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
function AgencyHero() {
  const t = useTranslations("pages.industriesApp");
  return (
    <section className={css.agencyHero}>
      <div className={`${css.wrap} ${css.agencyLayout}`}>
        <div>
          <Copy slug="real-estate-agency" />
          <Actions />
          <p className={css.heroFoot}>
            {t("professional.heroes.theAddressTheBuyerTheNext")}
          </p>
        </div>
        <figure className={css.portfolio}>
          <header>
            <MapPin size={17} />
            <span>{t("professional.heroes.thePropertyPortfolioConcept")}</span>
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
                  {num(p.area)}{" "}{t("professional.heroes.sqFt")}{" "}{p.type}
                </small>
                <strong>{money(p.price)}</strong>
              </div>
            ))}
          </div>
          <HandNote>{t("professional.heroes.theDetailBehindTheAddress")}</HandNote>
          <figcaption>
            {t("professional.heroes.conceptMassingAndFictionalPropertiesNot")}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
function ArchitectureHero() {
  const t = useTranslations("pages.industriesApp");
  return (
    <section className={css.architectureHero}>
      <div className={css.wrap}>
        <div className={css.architectureHeading}>
          <Badge>{t("professional.heroes.theDesignDeskConceptStudy01")}</Badge>
          <Copy slug="architecture-firm" />
          <Actions />
        </div>
        <figure className={css.draftingDesk}>
          <div className={css.planIndex}>
            <span>{t("professional.heroes.thePhaseNotes")}</span>
            <b>
              01
              <br />
              <em>{t("professional.heroes.designIntent")}</em>
            </b>
            <small>{t("professional.heroes.giveEveryPhaseAClearPlace")}</small>
          </div>
          <div className={css.planStack}>
            <div className={css.backSheet} />
            <div className={css.frontSheet}>
              <header>
                <span>{t("professional.heroes.exArch01ConceptOnly")}</span>
                <span>{t("professional.heroes.planStudy")}</span>
              </header>
              <PlanArt />
              <div>
                <span>{t("professional.heroes.briefPhasesRecords")}</span>
                <small>{t("professional.heroes.notAScaleDrawing")}</small>
              </div>
            </div>
          </div>
          <div className={css.phaseStrip}>
            {phases.map((p, i) => (
              <div key={p.name}>
                <span>0{i + 1}</span>
                <b>{p.name}</b>
                <small>{p.hours}{" "}{t("professional.heroes.fictionalHours")}</small>
              </div>
            ))}
          </div>
          <figcaption>
            {t("professional.heroes.illustrativeDraftingCompositionNoTechnic")}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
function ConstructionHero() {
  const t = useTranslations("pages.industriesApp");
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
              <span>{t("professional.heroes.theSiteNotesConceptElevation")}</span>
              <span>EX-WORK-01</span>
            </header>
            <CraneArt />
            <p>{t("professional.heroes.theWorkItemIsPartOf")}</p>
          </div>
          <div className={css.costTicket}>
            <ClipboardList size={23} />
            <span>{t("professional.heroes.fictionalWorkLines")}</span>
            {workItems.map((row, i) => (
              <div key={row.name}>
                <span>{row.name}</span>
                <b>{money(costs.lines[i])}</b>
              </div>
            ))}
            <footer>
              <span>{t("professional.heroes.enteredExampleTotal")}</span>
              <b>{money(costs.total)}</b>
            </footer>
          </div>
          <figcaption>
            {t("professional.heroes.conceptSiteIllustrationAndFictionalArith")}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
function AccountingHero() {
  const t = useTranslations("pages.industriesApp");
  const progress = checklist([true, false, false, false]);
  return (
    <section className={css.accountingHero}>
      <div className={`${css.wrap} ${css.accountingLayout}`}>
        <figure className={css.reviewLedger}>
          <header>
            <FileText size={18} />
            <span>{t("professional.heroes.exEng01FictionalReviewNotes")}</span>
          </header>
          <div className={css.ledgerHeading}>
            <h3>
              {t("professional.heroes.theWorkBehind")}
              <br />
              {t("professional.heroes.theNumbers")}
            </h3>
            <b>
              {progress.done}
              <small> / {progress.total}</small>
            </b>
          </div>
          <div className={css.ledgerRows}>
            {reviewTasks(t).map((task, i) => (
              <div key={task}>
                <span>0{i + 1}</span>
                <b>{task}</b>
                {i === 0 ? <Check size={17} aria-hidden="true" /> : <i />}
              </div>
            ))}
          </div>
          <p>{t("professional.heroes.manuallyTrackedExampleTasksWithTheir")}</p>
          <figcaption>
            {t("professional.heroes.illustrativeEngagementLedgerNoAccountsOr")}
          </figcaption>
        </figure>
        <div>
          <Copy slug="accounting-firm" />
          <Actions />
          <p className={css.heroFoot}>
            {t("professional.heroes.clientContextReviewNotesAClearer")}
          </p>
        </div>
      </div>
    </section>
  );
}
function MarketingHero() {
  const t = useTranslations("pages.industriesApp");
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
          <HandNote>{t("professional.heroes.giveTheIdeaALittleStructure")}</HandNote>
        </div>
        <figure className={css.creativeBoard}>
          <div className={css.creativePoster}>
            <span>{t("professional.heroes.exCamp01TheCreativeBrief")}</span>
            <b>
              {t("professional.heroes.think")}
              <br />
              {t("professional.heroes.make")}
              <br />
              <em>{t("professional.heroes.connect")}</em>
            </b>
            <div className={css.posterOrbit} />
            <small>{t("professional.heroes.aConceptCampaignWithItsAssumptions")}</small>
          </div>
          <div className={css.channelNote}>
            <AllocationRing
              amounts={channels.map((c) => c.amount)}
              labels={channels.map((c) => c.name)}
            />
            <div>
              <span>{t("professional.heroes.exampleAllocation")}</span>
              <b>{money(budget.assigned)}</b>
              <small>{t("professional.heroes.budgetShapeNotPredictedResults")}</small>
            </div>
          </div>
          <figcaption>
            {t("professional.heroes.conceptCampaignBoardFictionalChannelAmou")}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
function TalentHero() {
  const t = useTranslations("pages.industriesApp");
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
            <span>{t("professional.heroes.theRoleBrief")}</span>
            <b>
              {t("professional.heroes.aClearNextStep")}
              <br />
              {t("professional.heroes.withThePersonInContext")}
            </b>
            <small>{t("professional.heroes.anonymousFictionalCandidateIds")}</small>
          </div>
        </div>
        <figure className={css.candidateJourney}>
          {candidateStages.map((stage, i) => (
            <div className={css.journeyStep} key={stage}>
              <header>
                <span>0{i + 1}{" "}{t("professional.heroes.theJourney")}</span>
                <ArrowRight size={16} />
              </header>
              <div className={css.avatarMark}>
                <UserRound size={28} />
              </div>
              <b>{candidateLabels(t)[stage]}</b>
              <span>{counts[stage]}{" "}{t("professional.heroes.fictionalCandidate")}</span>
              <small>
                {candidates[i].id} / {candidates[i].role}
              </small>
            </div>
          ))}
          <figcaption>
            {t("professional.heroes.illustrativeStagesNoScoringApplicantAsse")}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
function AuditHero() {
  const t = useTranslations("pages.industriesApp");
  const count = evidenceCounts(evidenceRows.map((r) => r.state));
  return (
    <section className={css.auditHero}>
      <div className={`${css.wrap} ${css.auditLayout}`}>
        <div>
          <Copy slug="audit-certification" />
          <Actions />
          <p className={css.heroFoot}>
            {t("professional.heroes.theDocumentTheReviewStateThe")}
          </p>
        </div>
        <figure className={css.evidenceDesk}>
          <div className={css.dossierBack}>
            <EvidenceArt />
            <span>{t("professional.heroes.theDocumentContext")}</span>
          </div>
          <div className={css.dossierFront}>
            <header>
              <span>{t("professional.heroes.exE01FictionalEvidence")}</span>
            </header>
            <EvidenceArt />
            <b>
              {t("professional.heroes.aReadable")}
              <br />
              {t("professional.heroes.trailOfContext")}
            </b>
            <small>{t("professional.heroes.manuallyReviewedInThisExample")}</small>
          </div>
          <div className={css.reviewPath}>
            <span>
              {count.missing}
              <small>{t("professional.heroes.missing")}</small>
            </span>
            <i />
            <span>
              {count.provided}
              <small>{t("professional.heroes.provided")}</small>
            </span>
            <i />
            <span>
              {count.reviewed}
              <small>{t("professional.heroes.reviewed")}</small>
            </span>
          </div>
          <figcaption>
            {t("professional.heroes.conceptEvidenceDossierNotACompliance")}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
function TravelHero() {
  const t = useTranslations("pages.industriesApp");
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
            <span>{t("professional.heroes.exTrip01TheItineraryNotes")}</span>
            <Badge>{t("professional.heroes.fictionalJourney")}</Badge>
          </header>
          <RouteArt />
          <div className={css.waypointLabels}>
            <span>{t("professional.heroes.n01Departure")}</span>
            <span>{t("professional.heroes.n02TheStay")}</span>
            <span>{t("professional.heroes.n03Return")}</span>
          </div>
          <div className={css.tripPass}>
            <div>
              <span>{t("professional.heroes.exampleTravellers")}</span>
              <b>02</b>
            </div>
            <div>
              <span>{t("professional.heroes.exampleNights")}</span>
              <b>03</b>
            </div>
            <div>
              <span>{t("professional.heroes.localEstimate")}</span>
              <strong>{money(trip.total)}</strong>
            </div>
          </div>
          <HandNote>{t("professional.heroes.aJourneyThoughtfullyConsidered")}</HandNote>
          <figcaption>
            {t("professional.heroes.conceptTravelPlanFictionalPricesAnd")}
          </figcaption>
        </figure>
        <div>
          <Copy slug="travel-agency" />
          <Actions />
          <p className={css.heroFoot}>
            {t("professional.heroes.theJourneyTheAssumptionsTheRecord")}
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
