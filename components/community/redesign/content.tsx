"use client";
import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Copy,
  Download,
  RotateCcw,
  Search,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import LiveDemoButton from "@/components/live-demo-button";
import {
  discussionNotes,
  groups,
  groupLabel,
  guides,
  journeys,
  menuSlugs,
  pages,
  partnerChecklist,
  partnerPaths,
  referenceNotes,
  topics,
  type CommunitySlug,
  type Guide,
} from "./data";
import {
  agendaMinutes,
  emailDraft,
  filterGuides,
  selectedAgenda,
  translationArtifact,
} from "./logic";
import { Note, base, css } from "./ui";
import { useTranslations } from "next-intl";
export type ContactInfo = {
  supportEmail: string;
  salesEmail: string;
  phone: string;
  phoneDisplay: string;
};
export type TranslationLabels = { en: string; bn: string; ar: string };
type Language = keyof TranslationLabels;
function Reset({ onClick }: { onClick: () => void }) {
  const tx = useTranslations("pages.communityApp");
  return (
    <button type="button" className={base.reset} onClick={onClick}>
      <RotateCcw size={13} aria-hidden="true" />
      {tx("content.reset")}
    </button>
  );
}
function SearchField({
  query,
  setQuery,
  label,
}: {
  query: string;
  setQuery: (q: string) => void;
  label: string;
}) {
  const tx = useTranslations("pages.communityApp");
  return (
    <label className={`${base.field} ${css.searchField}`}>
      <span>{label}</span>
      <div>
        <Search size={17} aria-hidden="true" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={tx("content.typeToExplore")}
        />
      </div>
    </label>
  );
}
function downloadText(filename: string, text: string, type: string) {
  const url = URL.createObjectURL(new Blob([text], { type }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
function Directory() {
  const tx = useTranslations("pages.communityApp");
  const [query, setQuery] = useState(""),
    [group, setGroup] = useState("all");
  const resources = [
    ...menuSlugs.map((s) => ({
      title: pages(tx)[s].title,
      group: pages(tx)[s].group,
      path: pages(tx)[s].path,
      description: pages(tx)[s].description,
    })),
    {
      title: tx("content.findAPartner"),
      group: "Get Services",
      path: "/community/get-services/find-partner",
      description:
        tx("content.openTheExistingPartnerDirectoryIts"),
    },
  ];
  const results = resources.filter(
    (r) =>
      (group === "all" || r.group === group) &&
      `${r.title} ${r.description}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );
  return (
    <>
      <div className={css.resourceFilters}>
        <SearchField
          query={query}
          setQuery={setQuery}
          label={tx("content.searchTheCommunityDirectory")}
        />
        <label className={base.field}>
          <span>{tx("content.chooseAPurpose")}</span>
          <select value={group} onChange={(e) => setGroup(e.target.value)}>
            <option value="all">{tx("content.allCommunityPages")}</option>
            {groups.map((g) => (
              <option key={g} value={g}>{groupLabel(g, tx)}</option>
            ))}
          </select>
        </label>
      </div>
      <div className={css.directoryGrid}>
        {results.map((r) => (
          <Link href={r.path} key={r.path}>
            <span>{groupLabel(r.group, tx).toUpperCase()}</span>
            <h3>
              {r.title}
              <ArrowRight size={17} aria-hidden="true" />
            </h3>
            <p>{r.description}</p>
          </Link>
        ))}
      </div>
      <p className={css.resultStatus} role="status">
        {results.length}{" "}{tx("content.communityDestinationsMatch")}
        {results.length === 0
          ? tx("content.tryABroaderSearchOrAnother")
          : ""}
      </p>
      <div className={css.moreLinks}>
        <span>{tx("content.exploreTheExistingCategoryHubs")}</span>
        <Link href="/community/learn">{tx("content.learn")}</Link>
        <Link href="/community/get-services">{tx("content.getServices")}</Link>
        <Link href="/community/collaborate">{tx("content.collaborate")}</Link>
      </div>
    </>
  );
}
export function GuideLibrary({
  rows,
  kind = "guides",
}: {
  rows: Guide[];
  kind?: "guides" | "reference" | "discussion";
}) {
  const tx = useTranslations("pages.communityApp");
  const [query, setQuery] = useState(""),
    [category, setCategory] = useState("all");
  const result = filterGuides(rows, query, category),
    categories = [...new Set(rows.map((r) => r.category))];
  return (
    <>
      <div className={css.resourceFilters}>
        <SearchField
          query={query}
          setQuery={setQuery}
          label={
            kind === "discussion"
              ? tx("content.searchStarterDiscussionNotes")
              : tx("content.searchTheGuideLibrary")
          }
        />
        <label className={base.field}>
          <span>{tx("content.topic")}</span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">{tx("content.allTopics")}</option>
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
      </div>
      <div className={css.guideGrid} data-kind={kind}>
        {result.map((row, i) => (
          <details key={row.id} className={css.guideCard}>
            <summary>
              <span>
                {row.category.toUpperCase()} / {String(i + 1).padStart(2, "0")}
              </span>
              <h3>{row.title}</h3>
              <p>{row.summary}</p>
              <b>
                {tx("content.readThe")}{" "}{kind === "discussion" ? "note" : "guide"}
                <ArrowRight size={15} aria-hidden="true" />
              </b>
            </summary>
            <div>
              <ol>
                {row.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
              <Link href={row.href}>
                {row.linkLabel}
                <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </details>
        ))}
      </div>
      <p className={css.resultStatus} role="status">
        {result.length} {kind === "discussion" ? tx("content.starterNotes") : "guides"}{" "}
        {tx("content.shown")}{result.length === 0 ? tx("content.tryAnotherSearchOrTopic") : ""}
      </p>
    </>
  );
}
function AgendaPlanner({ event = false }: { event?: boolean }) {
  const tx = useTranslations("pages.communityApp");
  const [role, setRole] = useState("Owner / cross-team"),
    [selected, setSelected] = useState(["finance", "stock"]),
    [minutes, setMinutes] = useState(15);
  const agenda = selectedAgenda(topics(tx), selected),
    duration = agendaMinutes(agenda.length, minutes);
  function changeRole(next: string) {
    setRole(next);
    setSelected(
      next === "Owner / cross-team"
        ? ["finance", "stock"]
        : topics(tx).filter((t) => t.group === next).map((t) => t.id),
    );
  }
  return (
    <div className={css.agendaPlanner}>
      <div>
        {!event && (
          <label className={base.field}>
            <span>{tx("content.chooseAnExplorationPerspective")}</span>
            <select value={role} onChange={(e) => changeRole(e.target.value)}>
              {[tx("content.ownerCrossTeam"), tx("content.finance"), tx("content.operations"), tx("content.people")].map(
                (r) => (
                  <option key={r}>{r}</option>
                ),
              )}
            </select>
          </label>
        )}
        <div className={css.topicChecks}>
          {topics(tx).map((topic) => (
            <label key={topic.id}>
              <input
                type="checkbox"
                checked={selected.includes(topic.id)}
                onChange={(e) => {
                  const checked = e.target.checked;
                  setSelected((prev) =>
                    checked
                      ? [...prev, topic.id]
                      : prev.filter((id) => id !== topic.id),
                  );
                }}
              />
              <span>
                <b>{topic.label}</b>
                <small>{topic.group}{" "}{tx("content.productExploration")}</small>
              </span>
            </label>
          ))}
        </div>
      </div>
      <aside className={css.localPlan}>
        <span>{event ? tx("content.yourLocalAgenda") : tx("content.yourExplorationPath")}</span>
        <h3>{event ? tx("content.aFewFocusedTopics") : tx("content.makeTheLearningUseful")}</h3>
        {event && (
          <label className={base.field}>
            <span>{tx("content.assumedMinutesPerTopic")}</span>
            <select
              value={minutes}
              onChange={(e) => setMinutes(Number(e.target.value))}
            >
              {[10, 15, 20, 30].map((n) => (
                <option key={n} value={n}>
                  {n}{" "}{tx("content.minutes")}
                </option>
              ))}
            </select>
          </label>
        )}
        <ol>
          {agenda.map((t) => (
            <li key={t.id}>
              <Link href={t.href}>
                {t.label}
                <ArrowUpRight size={13} aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ol>
        <p className={css.resultStatus} role="status">
          {agenda.length}{" "}{tx("content.selectedTopic")}{agenda.length === 1 ? "" : "s"}
          {event ? tx("content.assumedMinutes", { duration: String(duration) }) : ""}.
          {agenda.length === 0 ? tx("content.chooseATopicToBegin") : ""}
        </p>
        <Note>
          {event
            ? tx("content.thisIsAPersonalAgendaNot")
            : tx("content.thisIsALocalTopicPlan")}
        </Note>
      </aside>
    </div>
  );
}
function AdvisorBrief() {
  const tx = useTranslations("pages.communityApp");
  const [industry, setIndustry] = useState("Manufacturing"),
    [selected, setSelected] = useState(["finance"]),
    [question, setQuestion] = useState(""),
    [copyStatus, setCopyStatus] = useState(""),
    [copying, setCopying] = useState(false);
  const chosen = selectedAgenda(topics(tx), selected);
  const brief = `Workflow context: ${industry}\nTopics: ${chosen.map((t) => t.label).join(", ") || "To discuss"}\nQuestions: ${question.trim() || "Add your questions beside this preview."}`;
  async function copy() {
    setCopying(true);
    try {
      await navigator.clipboard.writeText(brief);
      setCopyStatus("Brief copied to your clipboard. It has not been sent.");
    } catch {
      setCopyStatus(
        "Clipboard access is unavailable. You can select and copy the preview text.",
      );
    } finally {
      setCopying(false);
    }
  }
  return (
    <div className={css.briefLayout}>
      <div>
        <label className={base.field}>
          <span>{tx("content.yourWorkflowContext")}</span>
          <select
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
          >
            {[tx("content.manufacturing"), tx("content.retail"), tx("content.services"), tx("content.education"), tx("content.other")].map(
              (i) => (
                <option key={i}>{i}</option>
              ),
            )}
          </select>
        </label>
        <div className={css.topicChecks}>
          {topics(tx).map((t) => (
            <label key={t.id}>
              <input
                type="checkbox"
                checked={selected.includes(t.id)}
                onChange={(e) => {
                  const checked = e.target.checked;
                  setSelected((prev) =>
                    checked
                      ? [...prev, t.id]
                      : prev.filter((id) => id !== t.id),
                  );
                }}
              />
              <span>{t.label}</span>
            </label>
          ))}
        </div>
        <label className={base.field}>
          <span>{tx("content.questionsToKeepBesideYouOptional")}</span>
          <textarea
            value={question}
            maxLength={1200}
            rows={4}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder={tx("content.whatWouldYouLikeToUnderstand")}
          />
        </label>
      </div>
      <aside className={css.localPlan}>
        <span>{tx("content.yourLocalConversationNotes")}</span>
        <h3>{tx("content.aBriefWithUsefulContext")}</h3>
        <pre>{brief}</pre>
        <button
          type="button"
          className={css.actionButton}
          disabled={copying}
          onClick={copy}
        >
          <Copy size={14} aria-hidden="true" />
          {copying ? tx("content.copying") : tx("content.copyLocalBrief")}
        </button>
        <p role="status" className={css.resultStatus}>
          {copyStatus}
        </p>
        <Note>
          {tx("content.theseNotesAreNotAutomaticallySent")}
        </Note>
        <LiveDemoButton />
      </aside>
    </div>
  );
}
function EmailComposer({
  email,
  subject,
  title,
}: {
  email: string;
  subject: string;
  title: string;
}) {
  const tx = useTranslations("pages.communityApp");
  const [message, setMessage] = useState("");
  const href = emailDraft(email, subject, message);
  return (
    <section className={css.emailComposer}>
      <div>
        <span>{tx("content.prepareAnEmailDraft")}</span>
        <h3>{title}</h3>
        <p>
          {tx("content.to")}{" "}<a href={`mailto:${email}`}>{email}</a>
        </p>
      </div>
      <label className={base.field}>
        <span>{tx("content.detailsForYourDraftOptional")}</span>
        <textarea
          rows={4}
          maxLength={3000}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={tx("content.addTheWorkflowContextAndQuestions")}
        />
      </label>
      <a href={href} className={css.actionButton}>
        {tx("content.openAnEmailDraft")}
        <ArrowUpRight size={14} aria-hidden="true" />
      </a>
      <Note>
        {tx("content.opensYourMailApplicationThisPage")}
      </Note>
    </section>
  );
}
function SupportContent({ contact }: { contact: ContactInfo }) {
  const tx = useTranslations("pages.communityApp");
  return (
    <>
      <div className={css.contactRoutes}>
        <a href={`mailto:${contact.supportEmail}`}>
          <span>{tx("content.configuredSupportEmail")}</span>
          <b>{contact.supportEmail}</b>
          <ArrowUpRight size={16} />
        </a>
        <a href={`tel:${contact.phone}`}>
          <span>{tx("content.configuredBusinessPhone")}</span>
          <b>{contact.phoneDisplay}</b>
          <ArrowUpRight size={16} />
        </a>
        <Link href="/contact">
          <span>{tx("content.moreContactOptions")}</span>
          <b>{tx("content.openTheContactPage")}</b>
          <ArrowRight size={16} />
        </Link>
      </div>
      <GuideLibrary rows={referenceNotes(tx)} kind="reference" />
      <EmailComposer
        email={contact.supportEmail}
        subject="Adon ERP support enquiry"
        title={tx("content.giveYourQuestionALittleContext")}
      />
    </>
  );
}
function Stories() {
  const tx = useTranslations("pages.communityApp");
  const [category, setCategory] = useState("all");
  const rows = journeys(tx).filter(
    (r) => category === "all" || r.category === category,
  );
  return (
    <>
      <label className={`${base.field} ${css.shortField}`}>
        <span>{tx("content.chooseAWorkflowPerspective")}</span>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="all">{tx("content.allIllustrativeJourneys")}</option>
          {journeys(tx).map((r) => (
            <option key={r.category}>{r.category}</option>
          ))}
        </select>
      </label>
      <div className={css.journeyGrid}>
        {rows.map((r) => (
          <article key={r.id}>
            <span>{tx("content.illustrativeWorkflow")}{" "}{r.category.toUpperCase()}</span>
            <h3>{r.title}</h3>
            <p>{r.context}</p>
            <ol>
              {r.workflow.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <Link href={r.href}>
              {tx("content.exploreTheProductContext")}
              <ArrowUpRight size={14} />
            </Link>
          </article>
        ))}
      </div>
      <p className={css.resultStatus} role="status">
        {rows.length}{" "}{tx("content.illustrativeJourneysShownNoVerifiedCusto")}
      </p>
    </>
  );
}
function TranslationsContent({ labels }: { labels: TranslationLabels }) {
  const tx = useTranslations("pages.communityApp");
  const [locale, setLocale] = useState<Language>("bn"),
    [drafts, setDrafts] = useState<TranslationLabels>(() => ({ ...labels })),
    [status, setStatus] = useState("");
  const draft = drafts[locale];
  function download() {
    try {
      const content = translationArtifact(locale, draft);
      downloadText(
        `Adon ERP-${locale}-label-draft.json`,
        content,
        "application/json",
      );
      setStatus(
        tx("content.aLocalDraftDownloadWasRequested"),
      );
    } catch (e) {
      setStatus(
        e instanceof Error ? e.message : tx("content.theDraftCouldNotBePrepared"),
      );
    }
  }
  return (
    <>
      <div className={css.translationToolbar}>
        <label className={base.field}>
          <span>{tx("content.configuredTargetLanguage")}</span>
          <select
            value={locale}
            onChange={(e) => {
              setLocale(e.target.value as Language);
              setStatus("");
            }}
          >
            <option value="bn">{tx("content.bengali")}</option>
            <option value="ar">{tx("content.arabic")}</option>
            <option value="en">{tx("content.english")}</option>
          </select>
        </label>
        <Reset
          onClick={() => {
            setDrafts({ ...labels });
            setStatus("");
          }}
        />
      </div>
      <div className={css.translationEditor}>
        <section>
          <span>{tx("content.theConfiguredSource")}</span>
          <code>{tx("content.commonActionsLivedemo")}</code>
          <blockquote lang="en" dir="ltr">
            {labels.en}
          </blockquote>
          <small>{tx("content.configuredTargetLabel")}</small>
          <p lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
            {labels[locale]}
          </p>
        </section>
        <section>
          <span>{tx("content.yourLocalWordingDraft")}</span>
          <label className={base.field}>
            <span>{tx("content.editADraftLabelUpTo")}</span>
            <textarea
              value={draft}
              maxLength={500}
              rows={4}
              dir={locale === "ar" ? "rtl" : "ltr"}
              lang={locale}
              onChange={(e) =>
                setDrafts((prev) => ({ ...prev, [locale]: e.target.value }))
              }
            />
          </label>
          <p
            className={css.labelPreview}
            lang={locale}
            dir={locale === "ar" ? "rtl" : "ltr"}
          >
            {draft || tx("content.yourDraftPreviewAppearsHere")}
          </p>
          <button type="button" className={css.actionButton} onClick={download}>
            <Download size={14} />
            {tx("content.downloadLocalJsonDraft")}
          </button>
        </section>
      </div>
      <p className={css.resultStatus} role="status">
        {status ||
          `${draft.length} / 500 draft characters. The application messages are unchanged.`}
      </p>
    </>
  );
}
function PartnershipContent({ contact }: { contact: ContactInfo }) {
  const tx = useTranslations("pages.communityApp");
  const [path, setPath] = useState(0),
    [selected, setSelected] = useState(partnerChecklist(tx).map(() => false));
  return (
    <>
      <div
        className={css.partnerChoices}
        role="group"
        aria-label={tx("content.chooseAPartnershipConversationTopic")}
      >
        {partnerPaths(tx).map((p, i) => (
          <button
            key={p.id}
            type="button"
            aria-pressed={path === i}
            onClick={() => setPath(i)}
          >
            <span>0{i + 1}</span>
            <b>{p.title}</b>
            <small>{p.body}</small>
          </button>
        ))}
      </div>
      <div className={css.topicChecks}>
        {partnerChecklist(tx).map((task, i) => (
          <label key={task}>
            <input
              type="checkbox"
              checked={selected[i]}
              onChange={(e) => {
                const checked = e.target.checked;
                setSelected((prev) =>
                  prev.map((v, j) => (i === j ? checked : v)),
                );
              }}
            />
            <span>{task}</span>
          </label>
        ))}
      </div>
      <p role="status" className={css.resultStatus}>
        {selected.filter(Boolean).length}{" "}{tx("content.of")}{" "}{partnerChecklist(tx).length}{" "}
        {tx("content.preparationNotesSelectedThisIsNot")}
      </p>
      <EmailComposer
        email={contact.salesEmail}
        subject={`Adon ERP partnership enquiry: ${partnerPaths(tx)[path].title}`}
        title={tx("content.introduceYourPracticeAndYourQuestions")}
      />
    </>
  );
}
export default function CommunityContent({
  slug,
  contact,
  labels,
}: {
  slug: CommunitySlug;
  contact: ContactInfo;
  labels?: TranslationLabels;
}) {
  const tx = useTranslations("pages.communityApp");
  if (slug === "home") return <Directory />;
  if (slug === "tutorials") return <GuideLibrary rows={guides(tx)} />;
  if (slug === "documentation")
    return <GuideLibrary rows={referenceNotes(tx)} kind="reference" />;
  if (slug === "training") return <AgendaPlanner />;
  if (slug === "meet-advisor") return <AdvisorBrief />;
  if (slug === "support") return <SupportContent contact={contact} />;
  if (slug === "customer-stories") return <Stories />;
  if (slug === "forum")
    return (
      <>
        <GuideLibrary rows={discussionNotes(tx)} kind="discussion" />
        <EmailComposer
          email={contact.supportEmail}
          subject="Adon ERP product discussion"
          title={tx("content.prepareAThoughtfulProductQuestion")}
        />
      </>
    );
  if (slug === "events") return <AgendaPlanner event />;
  if (slug === "translations")
    return labels ? (
      <TranslationsContent labels={labels} />
    ) : (
      <p>{tx("content.configuredLabelSamplesAreUnavailable")}</p>
    );
  if (slug === "become-a-partner")
    return <PartnershipContent contact={contact} />;
  return null;
}
