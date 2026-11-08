import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  FileText,
  Globe2,
  GraduationCap,
  Handshake,
  Languages,
  LifeBuoy,
  MessagesSquare,
  PenLine,
  Route,
  Users,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { pages, type CommunitySlug } from "./data";
import { Actions, DialogueArt, GuideArt, HandNote, base, css } from "./ui";
import { useTranslations } from "next-intl";
function Copy({ slug }: { slug: CommunitySlug }) {
  const tx = useTranslations("pages.communityApp");
  const p = pages(tx)[slug];
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
function HomeHero() {
  const tx = useTranslations("pages.communityApp");
  return (
    <section className={css.homeHero}>
      <div className={`${base.wrap} ${css.homeLayout}`}>
        <div>
          <Copy slug="home" />
          <Actions />
        </div>
        <div className={css.communityMap}>
          <Link href="/community/learn/tutorials">
            <BookOpen size={26} />
            <span>{tx("heroes.n01Learn")}</span>
            <b>
              {tx("heroes.findYour")}
              <br />
              {tx("heroes.nextQuestion")}
            </b>
            <ArrowRight size={17} />
          </Link>
          <Link href="/community/get-services/support">
            <LifeBuoy size={26} />
            <span>{tx("heroes.n02GetHelp")}</span>
            <b>
              {tx("heroes.aClearer")}
              <br />
              {tx("heroes.routeForward")}
            </b>
            <ArrowRight size={17} />
          </Link>
          <Link href="/community/collaborate/become-a-partner">
            <Handshake size={26} />
            <span>{tx("heroes.n03Collaborate")}</span>
            <b>
              {tx("heroes.bringYour")}
              <br />
              {tx("heroes.perspective")}
            </b>
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}
function TutorialsHero() {
  const tx = useTranslations("pages.communityApp");
  return (
    <section className={css.tutorialHero}>
      <div className={`${base.wrap} ${css.split}`}>
        <div>
          <Copy slug="tutorials" />
          <Actions />
        </div>
        <figure className={css.walkthroughStudy}>
          <span>{tx("heroes.theWrittenWalkthrough")}</span>
          <GuideArt />
          <div className={css.guideStrip}>
            <span>{tx("heroes.observe")}</span>
            <ArrowRight size={14} />
            <span>{tx("heroes.explore")}</span>
            <ArrowRight size={14} />
            <span>{tx("heroes.ask")}</span>
          </div>
          <HandNote>{tx("heroes.aUsefulPlaceToBegin")}</HandNote>
          <figcaption>
            {tx("heroes.conceptReadingPathExploreTheWritten")}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
function DocsHero() {
  const tx = useTranslations("pages.communityApp");
  return (
    <section className={css.docsHero}>
      <div className={`${base.wrap} ${css.reverseSplit}`}>
        <figure className={css.referenceSpread}>
          <header>
            <FileText size={21} />
            <span>{tx("heroes.theProductGuideIndex")}</span>
          </header>
          <ol>
            {[
              tx("heroes.findTheProductContext"),
              tx("heroes.readTheExampleLabels"),
              tx("heroes.prepareYourQuestions"),
              tx("heroes.chooseTheNextConversation"),
            ].map((t, i) => (
              <li key={t}>
                <span>0{i + 1}</span>
                <b>{t}</b>
              </li>
            ))}
          </ol>
          <figcaption>
            {tx("heroes.referenceNotesForExploringPublicProduct")}
          </figcaption>
        </figure>
        <div>
          <Copy slug="documentation" />
          <Actions />
        </div>
      </div>
    </section>
  );
}
function TrainingHero() {
  const tx = useTranslations("pages.communityApp");
  return (
    <section className={css.trainingHero}>
      <div className={base.wrap}>
        <div className={css.centerCopy}>
          <Copy slug="training" />
          <Actions />
        </div>
        <figure className={css.learningPath}>
          {[
            {
              icon: Users,
              title: tx("heroes.yourRole"),
              body: tx("heroes.startWithTheWorkYouDo"),
            },
            {
              icon: GraduationCap,
              title: tx("heroes.yourTopics"),
              body: tx("heroes.chooseTheDetailWorthExploring"),
            },
            {
              icon: MessagesSquare,
              title: tx("heroes.yourConversation"),
              body: tx("heroes.bringTheQuestionsTogether"),
            },
          ].map(({ icon: Icon, title, body }, i) => (
            <div key={title}>
              <Icon size={25} />
              <span>0{i + 1}{" "}{tx("heroes.theLearningAgenda")}</span>
              <b>{title}</b>
              <small>{body}</small>
            </div>
          ))}
          <figcaption>
            {tx("heroes.aLocalExplorationPlanSeparateFrom")}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
function BlogHero() {
  const tx = useTranslations("pages.communityApp");
  return (
    <section className={css.blogHero}>
      <div className={base.wrap}>
        <div className={css.journalHeading}>
          <div>
            <Copy slug="blog" />
            <Actions />
          </div>
          <figure className={css.journalCover}>
            <PenLine size={24} />
            <span>{tx("heroes.adonErpTheJournal")}</span>
            <b>
              {tx("heroes.notes")}
              <br />
              {tx("heroes.fromThe")}
              <br />
              <em>{tx("heroes.work")}</em>
            </b>
            <div />
            <small>{tx("heroes.articlesFromThePublicBlogService")}</small>
            <figcaption>{tx("heroes.editorialCoverIllustration")}</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
function AdvisorHero() {
  const tx = useTranslations("pages.communityApp");
  return (
    <section className={css.advisorHero}>
      <div className={`${base.wrap} ${css.split}`}>
        <div>
          <Copy slug="meet-advisor" />
          <Actions />
        </div>
        <figure className={css.advisorStudy}>
          <DialogueArt />
          <div className={css.conversationNote}>
            <span>{tx("heroes.theConversationBrief")}</span>
            <b>
              {tx("heroes.yourProcessIs")}
              <br />{tx("heroes.aGoodStartingPoint")}
            </b>
            <small>{tx("heroes.prepareNotesBelowThenRequestA")}</small>
          </div>
          <figcaption>
            {tx("heroes.conceptConversationNotesNotAConfirmed")}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
function SupportHero() {
  const tx = useTranslations("pages.communityApp");
  return (
    <section className={css.supportHero}>
      <div className={`${base.wrap} ${css.reverseSplit}`}>
        <figure className={css.helpCompass}>
          <div className={css.helpHub}>
            <LifeBuoy size={47} />
            <b>{tx("heroes.aUsefulNextStep")}</b>
          </div>
          <Link href="/community/learn/documentation">
            <FileText size={18} />
            {tx("heroes.readAGuide")}
            <ArrowRight size={14} />
          </Link>
          <Link href="/community/get-services/meet-advisor">
            <MessagesSquare size={18} />
            {tx("heroes.prepareAConversation")}
            <ArrowRight size={14} />
          </Link>
          <Link href="/contact">
            <CompassMark />
            {tx("heroes.findContactRoutes")}
            <ArrowRight size={14} />
          </Link>
          <figcaption>{tx("heroes.existingHelpDestinationsKeptInOne")}</figcaption>
        </figure>
        <div>
          <Copy slug="support" />
          <Actions />
        </div>
      </div>
    </section>
  );
}
function CompassMark() {
  return <Route size={18} aria-hidden="true" />;
}
function StoriesHero() {
  const tx = useTranslations("pages.communityApp");
  return (
    <section className={css.storiesHero}>
      <div className={base.wrap}>
        <div className={css.storiesHeading}>
          <Copy slug="customer-stories" />
          <Actions />
        </div>
        <figure className={css.storyboard}>
          {[tx("heroes.theContext"), tx("heroes.theWorkflow"), tx("heroes.theQuestions")].map((title, i) => (
            <div key={title}>
              <span>0{i + 1}{" "}{tx("heroes.theStoryNotes")}</span>
              <b>{title}</b>
              <i />
              <small>
                {
                  [
                    "Start with the team’s process.",
                    "Follow the operational handoff.",
                    "Keep the next discussion useful.",
                  ][i]
                }
              </small>
            </div>
          ))}
          <figcaption>
            {tx("heroes.illustrativeStoryStructureNoCustomerEndo")}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
function ForumHero() {
  const tx = useTranslations("pages.communityApp");
  return (
    <section className={css.forumHero}>
      <div className={`${base.wrap} ${css.split}`}>
        <div>
          <Copy slug="forum" />
          <Actions />
        </div>
        <figure className={css.discussionStack}>
          <div>
            <MessagesSquare size={22} />
            <span>{tx("heroes.theQuestionNote")}</span>
            <b>
              {tx("heroes.whatAreYou")}
              <br />
              {tx("heroes.tryingToUnderstand")}
            </b>
          </div>
          <div>
            <ArrowRight size={20} />
            <span>{tx("heroes.theContextNote")}</span>
            <b>
              {tx("heroes.startWithTheWorkflow")}
              <br />
              {tx("heroes.thenAddTheDetail")}
            </b>
          </div>
          <figcaption>
            {tx("heroes.authoredDiscussionPromptsNotLiveForum")}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
function EventsHero() {
  const tx = useTranslations("pages.communityApp");
  return (
    <section className={css.eventsHero}>
      <div className={`${base.wrap} ${css.eventsLayout}`}>
        <div>
          <Copy slug="events" />
          <Actions />
        </div>
        <figure className={css.agendaStudy}>
          <header>
            <CalendarDays size={23} />
            <span>{tx("heroes.yourTeamSAgendaNotes")}</span>
          </header>
          <h3>
            {tx("heroes.aLittleTime")}
            <br />{tx("heroes.aFewGoodTopics")}
          </h3>
          <ol>
            {[
              tx("heroes.chooseTheFocus"),
              tx("heroes.gatherTheQuestions"),
              tx("heroes.discussTheNextStep"),
            ].map((t, i) => (
              <li key={t}>
                <span>0{i + 1}</span>
                {t}
              </li>
            ))}
          </ol>
          <figcaption>
            {tx("heroes.personalAgendaConceptNoPublicEvent")}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
function TranslationsHero() {
  const tx = useTranslations("pages.communityApp");
  return (
    <section className={css.translationsHero}>
      <div className={base.wrap}>
        <div className={css.centerCopy}>
          <Copy slug="translations" />
          <Actions />
        </div>
        <figure className={css.languageSpread}>
          <div>
            <Languages size={29} />
            <span>{tx("heroes.theSource")}</span>
            <b>
              {tx("heroes.wordsWith")}
              <br />
              {tx("heroes.theirContext")}
            </b>
          </div>
          <div>
            <Globe2 size={29} />
            <span>{tx("heroes.theLocalWording")}</span>
            <b>
              {tx("heroes.aDraftWorth")}
              <br />
              {tx("heroes.reviewing")}
            </b>
          </div>
          <div>
            <FileText size={29} />
            <span>{tx("heroes.theReviewArtifact")}</span>
            <b>
              {tx("heroes.oneLabel")}
              <br />{tx("heroes.aClearHandoff")}
            </b>
          </div>
          <figcaption>
            {tx("heroes.aTranslationReviewConceptNoContribution")}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
function PartnerHero() {
  const tx = useTranslations("pages.communityApp");
  return (
    <section className={css.partnerHero}>
      <div className={`${base.wrap} ${css.reverseSplit}`}>
        <figure className={css.collaborationBridge}>
          <div>
            <Users size={29} />
            <span>{tx("heroes.yourPractice")}</span>
            <b>
              {tx("heroes.skills")}
              <br />
              {tx("heroes.experience")}
              <br />
              {tx("heroes.perspective2")}
            </b>
          </div>
          <Handshake size={42} />
          <div>
            <MessagesSquare size={29} />
            <span>{tx("heroes.theConversation")}</span>
            <b>
              {tx("heroes.questions")}
              <br />
              {tx("heroes.context")}
              <br />{tx("heroes.aNextStep")}
            </b>
          </div>
          <figcaption>
            {tx("heroes.collaborationConceptNoPartnerStatusOr")}
          </figcaption>
        </figure>
        <div>
          <Copy slug="become-a-partner" />
          <Actions />
        </div>
      </div>
    </section>
  );
}
const heroes = {
  home: HomeHero,
  tutorials: TutorialsHero,
  documentation: DocsHero,
  training: TrainingHero,
  blog: BlogHero,
  "meet-advisor": AdvisorHero,
  support: SupportHero,
  "customer-stories": StoriesHero,
  forum: ForumHero,
  events: EventsHero,
  translations: TranslationsHero,
  "become-a-partner": PartnerHero,
};
export default function CommunityHero({ slug }: { slug: CommunitySlug }) {
  const Hero = heroes[slug];
  return <Hero />;
}
