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
function Copy({ slug }: { slug: CommunitySlug }) {
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
function HomeHero() {
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
            <span>01 / LEARN</span>
            <b>
              Find your
              <br />
              next question.
            </b>
            <ArrowRight size={17} />
          </Link>
          <Link href="/community/get-services/support">
            <LifeBuoy size={26} />
            <span>02 / GET HELP</span>
            <b>
              A clearer
              <br />
              route forward.
            </b>
            <ArrowRight size={17} />
          </Link>
          <Link href="/community/collaborate/become-a-partner">
            <Handshake size={26} />
            <span>03 / COLLABORATE</span>
            <b>
              Bring your
              <br />
              perspective.
            </b>
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}
function TutorialsHero() {
  return (
    <section className={css.tutorialHero}>
      <div className={`${base.wrap} ${css.split}`}>
        <div>
          <Copy slug="tutorials" />
          <Actions />
        </div>
        <figure className={css.walkthroughStudy}>
          <span>THE WRITTEN WALKTHROUGH</span>
          <GuideArt />
          <div className={css.guideStrip}>
            <span>OBSERVE</span>
            <ArrowRight size={14} />
            <span>EXPLORE</span>
            <ArrowRight size={14} />
            <span>ASK</span>
          </div>
          <HandNote>A useful place to begin.</HandNote>
          <figcaption>
            Concept reading path · explore the written guides below
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
function DocsHero() {
  return (
    <section className={css.docsHero}>
      <div className={`${base.wrap} ${css.reverseSplit}`}>
        <figure className={css.referenceSpread}>
          <header>
            <FileText size={21} />
            <span>THE PRODUCT-GUIDE INDEX</span>
          </header>
          <ol>
            {[
              "Find the product context",
              "Read the example labels",
              "Prepare your questions",
              "Choose the next conversation",
            ].map((t, i) => (
              <li key={t}>
                <span>0{i + 1}</span>
                <b>{t}</b>
              </li>
            ))}
          </ol>
          <figcaption>
            Reference notes for exploring public product presentations
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
              title: "Your role",
              body: "Start with the work you do.",
            },
            {
              icon: GraduationCap,
              title: "Your topics",
              body: "Choose the detail worth exploring.",
            },
            {
              icon: MessagesSquare,
              title: "Your conversation",
              body: "Bring the questions together.",
            },
          ].map(({ icon: Icon, title, body }, i) => (
            <div key={title}>
              <Icon size={25} />
              <span>0{i + 1} / THE LEARNING AGENDA</span>
              <b>{title}</b>
              <small>{body}</small>
            </div>
          ))}
          <figcaption>
            A local exploration plan, separate from enrolment or course
            completion
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
function BlogHero() {
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
            <span>Adon ERP / THE JOURNAL</span>
            <b>
              Notes
              <br />
              from the
              <br />
              <em>work.</em>
            </b>
            <div />
            <small>Articles from the public blog service.</small>
            <figcaption>Editorial cover illustration</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
function AdvisorHero() {
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
            <span>THE CONVERSATION BRIEF</span>
            <b>
              Your process is
              <br />a good starting point.
            </b>
            <small>Prepare notes below, then request a walkthrough.</small>
          </div>
          <figcaption>
            Concept conversation notes · not a confirmed meeting
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
function SupportHero() {
  return (
    <section className={css.supportHero}>
      <div className={`${base.wrap} ${css.reverseSplit}`}>
        <figure className={css.helpCompass}>
          <div className={css.helpHub}>
            <LifeBuoy size={47} />
            <b>A useful next step.</b>
          </div>
          <Link href="/community/learn/documentation">
            <FileText size={18} />
            Read a guide
            <ArrowRight size={14} />
          </Link>
          <Link href="/community/get-services/meet-advisor">
            <MessagesSquare size={18} />
            Prepare a conversation
            <ArrowRight size={14} />
          </Link>
          <Link href="/contact">
            <CompassMark />
            Find contact routes
            <ArrowRight size={14} />
          </Link>
          <figcaption>Existing help destinations, kept in one place</figcaption>
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
  return (
    <section className={css.storiesHero}>
      <div className={base.wrap}>
        <div className={css.storiesHeading}>
          <Copy slug="customer-stories" />
          <Actions />
        </div>
        <figure className={css.storyboard}>
          {["The context", "The workflow", "The questions"].map((title, i) => (
            <div key={title}>
              <span>0{i + 1} / THE STORY NOTES</span>
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
            Illustrative story structure · no customer endorsement or measured
            result is claimed
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
function ForumHero() {
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
            <span>THE QUESTION NOTE</span>
            <b>
              What are you
              <br />
              trying to understand?
            </b>
          </div>
          <div>
            <ArrowRight size={20} />
            <span>THE CONTEXT NOTE</span>
            <b>
              Start with the workflow.
              <br />
              Then add the detail.
            </b>
          </div>
          <figcaption>
            Authored discussion prompts · not live forum posts
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
function EventsHero() {
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
            <span>YOUR TEAM’S AGENDA NOTES</span>
          </header>
          <h3>
            A little time.
            <br />A few good topics.
          </h3>
          <ol>
            {[
              "Choose the focus",
              "Gather the questions",
              "Discuss the next step",
            ].map((t, i) => (
              <li key={t}>
                <span>0{i + 1}</span>
                {t}
              </li>
            ))}
          </ol>
          <figcaption>
            Personal agenda concept · no public event or registration is
            represented
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
function TranslationsHero() {
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
            <span>THE SOURCE</span>
            <b>
              Words with
              <br />
              their context.
            </b>
          </div>
          <div>
            <Globe2 size={29} />
            <span>THE LOCAL WORDING</span>
            <b>
              A draft worth
              <br />
              reviewing.
            </b>
          </div>
          <div>
            <FileText size={29} />
            <span>THE REVIEW ARTIFACT</span>
            <b>
              One label.
              <br />A clear handoff.
            </b>
          </div>
          <figcaption>
            A translation-review concept · no contribution is automatically
            published
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
function PartnerHero() {
  return (
    <section className={css.partnerHero}>
      <div className={`${base.wrap} ${css.reverseSplit}`}>
        <figure className={css.collaborationBridge}>
          <div>
            <Users size={29} />
            <span>YOUR PRACTICE</span>
            <b>
              Skills.
              <br />
              Experience.
              <br />
              Perspective.
            </b>
          </div>
          <Handshake size={42} />
          <div>
            <MessagesSquare size={29} />
            <span>THE CONVERSATION</span>
            <b>
              Questions.
              <br />
              Context.
              <br />A next step.
            </b>
          </div>
          <figcaption>
            Collaboration concept · no partner status or programme tier is
            implied
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
