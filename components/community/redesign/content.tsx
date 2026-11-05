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
export type ContactInfo = {
  supportEmail: string;
  salesEmail: string;
  phone: string;
  phoneDisplay: string;
};
export type TranslationLabels = { en: string; bn: string; ar: string };
type Language = keyof TranslationLabels;
function Reset({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" className={base.reset} onClick={onClick}>
      <RotateCcw size={13} aria-hidden="true" />
      Reset
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
  return (
    <label className={`${base.field} ${css.searchField}`}>
      <span>{label}</span>
      <div>
        <Search size={17} aria-hidden="true" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type to explore…"
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
  const [query, setQuery] = useState(""),
    [group, setGroup] = useState("all");
  const resources = [
    ...menuSlugs.map((s) => ({
      title: pages[s].title,
      group: pages[s].group,
      path: pages[s].path,
      description: pages[s].description,
    })),
    {
      title: "Find a Partner",
      group: "Get Services",
      path: "/community/get-services/find-partner",
      description:
        "Open the existing partner directory. Its page and filters remain unchanged.",
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
          label="Search the Community directory"
        />
        <label className={base.field}>
          <span>Choose a purpose</span>
          <select value={group} onChange={(e) => setGroup(e.target.value)}>
            <option value="all">All Community pages</option>
            {groups.map((g) => (
              <option key={g}>{g}</option>
            ))}
          </select>
        </label>
      </div>
      <div className={css.directoryGrid}>
        {results.map((r) => (
          <Link href={r.path} key={r.path}>
            <span>{r.group.toUpperCase()}</span>
            <h3>
              {r.title}
              <ArrowRight size={17} aria-hidden="true" />
            </h3>
            <p>{r.description}</p>
          </Link>
        ))}
      </div>
      <p className={css.resultStatus} role="status">
        {results.length} Community destinations match.
        {results.length === 0
          ? " Try a broader search or another purpose."
          : ""}
      </p>
      <div className={css.moreLinks}>
        <span>Explore the existing category hubs:</span>
        <Link href="/community/learn">Learn</Link>
        <Link href="/community/get-services">Get Services</Link>
        <Link href="/community/collaborate">Collaborate</Link>
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
              ? "Search starter discussion notes"
              : "Search the guide library"
          }
        />
        <label className={base.field}>
          <span>Topic</span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">All topics</option>
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
                Read the {kind === "discussion" ? "note" : "guide"}
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
        {result.length} {kind === "discussion" ? "starter notes" : "guides"}{" "}
        shown.{result.length === 0 ? " Try another search or topic." : ""}
      </p>
    </>
  );
}
function AgendaPlanner({ event = false }: { event?: boolean }) {
  const [role, setRole] = useState("Owner / cross-team"),
    [selected, setSelected] = useState(["finance", "stock"]),
    [minutes, setMinutes] = useState(15);
  const agenda = selectedAgenda(topics, selected),
    duration = agendaMinutes(agenda.length, minutes);
  function changeRole(next: string) {
    setRole(next);
    setSelected(
      next === "Owner / cross-team"
        ? ["finance", "stock"]
        : topics.filter((t) => t.group === next).map((t) => t.id),
    );
  }
  return (
    <div className={css.agendaPlanner}>
      <div>
        {!event && (
          <label className={base.field}>
            <span>Choose an exploration perspective</span>
            <select value={role} onChange={(e) => changeRole(e.target.value)}>
              {["Owner / cross-team", "Finance", "Operations", "People"].map(
                (r) => (
                  <option key={r}>{r}</option>
                ),
              )}
            </select>
          </label>
        )}
        <div className={css.topicChecks}>
          {topics.map((topic) => (
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
                <small>{topic.group} / product exploration</small>
              </span>
            </label>
          ))}
        </div>
      </div>
      <aside className={css.localPlan}>
        <span>{event ? "YOUR LOCAL AGENDA" : "YOUR EXPLORATION PATH"}</span>
        <h3>{event ? "A few focused topics." : "Make the learning useful."}</h3>
        {event && (
          <label className={base.field}>
            <span>Assumed minutes per topic</span>
            <select
              value={minutes}
              onChange={(e) => setMinutes(Number(e.target.value))}
            >
              {[10, 15, 20, 30].map((n) => (
                <option key={n} value={n}>
                  {n} minutes
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
          {agenda.length} selected topic{agenda.length === 1 ? "" : "s"}
          {event ? ` · ${duration} assumed minutes` : ""}.
          {agenda.length === 0 ? " Choose a topic to begin." : ""}
        </p>
        <Note>
          {event
            ? "This is a personal agenda, not a confirmed event, registration or meeting duration."
            : "This is a local topic plan, separate from enrolment, completed training or certification."}
        </Note>
      </aside>
    </div>
  );
}
function AdvisorBrief() {
  const [industry, setIndustry] = useState("Manufacturing"),
    [selected, setSelected] = useState(["finance"]),
    [question, setQuestion] = useState(""),
    [copyStatus, setCopyStatus] = useState(""),
    [copying, setCopying] = useState(false);
  const chosen = selectedAgenda(topics, selected);
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
          <span>Your workflow context</span>
          <select
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
          >
            {["Manufacturing", "Retail", "Services", "Education", "Other"].map(
              (i) => (
                <option key={i}>{i}</option>
              ),
            )}
          </select>
        </label>
        <div className={css.topicChecks}>
          {topics.map((t) => (
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
          <span>Questions to keep beside you · optional</span>
          <textarea
            value={question}
            maxLength={1200}
            rows={4}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="What would you like to understand about your workflow?"
          />
        </label>
      </div>
      <aside className={css.localPlan}>
        <span>YOUR LOCAL CONVERSATION NOTES</span>
        <h3>A brief with useful context.</h3>
        <pre>{brief}</pre>
        <button
          type="button"
          className={css.actionButton}
          disabled={copying}
          onClick={copy}
        >
          <Copy size={14} aria-hidden="true" />
          {copying ? "Copying…" : "Copy local brief"}
        </button>
        <p role="status" className={css.resultStatus}>
          {copyStatus}
        </p>
        <Note>
          These notes are not automatically sent with the shared demo request.
          Keep them for the conversation.
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
  const [message, setMessage] = useState("");
  const href = emailDraft(email, subject, message);
  return (
    <section className={css.emailComposer}>
      <div>
        <span>PREPARE AN EMAIL DRAFT</span>
        <h3>{title}</h3>
        <p>
          To: <a href={`mailto:${email}`}>{email}</a>
        </p>
      </div>
      <label className={base.field}>
        <span>Details for your draft · optional</span>
        <textarea
          rows={4}
          maxLength={3000}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Add the workflow, context and questions you want to discuss."
        />
      </label>
      <a href={href} className={css.actionButton}>
        Open an email draft
        <ArrowUpRight size={14} aria-hidden="true" />
      </a>
      <Note>
        Opens your mail application. This page does not send an email or create
        a ticket/application.
      </Note>
    </section>
  );
}
function SupportContent({ contact }: { contact: ContactInfo }) {
  return (
    <>
      <div className={css.contactRoutes}>
        <a href={`mailto:${contact.supportEmail}`}>
          <span>CONFIGURED SUPPORT EMAIL</span>
          <b>{contact.supportEmail}</b>
          <ArrowUpRight size={16} />
        </a>
        <a href={`tel:${contact.phone}`}>
          <span>CONFIGURED BUSINESS PHONE</span>
          <b>{contact.phoneDisplay}</b>
          <ArrowUpRight size={16} />
        </a>
        <Link href="/contact">
          <span>MORE CONTACT OPTIONS</span>
          <b>Open the contact page</b>
          <ArrowRight size={16} />
        </Link>
      </div>
      <GuideLibrary rows={referenceNotes} kind="reference" />
      <EmailComposer
        email={contact.supportEmail}
        subject="EdenERP support enquiry"
        title="Give your question a little context."
      />
    </>
  );
}
function Stories() {
  const [category, setCategory] = useState("all");
  const rows = journeys.filter(
    (r) => category === "all" || r.category === category,
  );
  return (
    <>
      <label className={`${base.field} ${css.shortField}`}>
        <span>Choose a workflow perspective</span>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="all">All illustrative journeys</option>
          {journeys.map((r) => (
            <option key={r.category}>{r.category}</option>
          ))}
        </select>
      </label>
      <div className={css.journeyGrid}>
        {rows.map((r) => (
          <article key={r.id}>
            <span>ILLUSTRATIVE WORKFLOW / {r.category.toUpperCase()}</span>
            <h3>{r.title}</h3>
            <p>{r.context}</p>
            <ol>
              {r.workflow.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <Link href={r.href}>
              Explore the product context
              <ArrowUpRight size={14} />
            </Link>
          </article>
        ))}
      </div>
      <p className={css.resultStatus} role="status">
        {rows.length} illustrative journeys shown. No verified customer result
        is claimed.
      </p>
    </>
  );
}
function TranslationsContent({ labels }: { labels: TranslationLabels }) {
  const [locale, setLocale] = useState<Language>("bn"),
    [drafts, setDrafts] = useState<TranslationLabels>(() => ({ ...labels })),
    [status, setStatus] = useState("");
  const draft = drafts[locale];
  function download() {
    try {
      const content = translationArtifact(locale, draft);
      downloadText(
        `edenerp-${locale}-label-draft.json`,
        content,
        "application/json",
      );
      setStatus(
        "A local draft download was requested. No translation has been published.",
      );
    } catch (e) {
      setStatus(
        e instanceof Error ? e.message : "The draft could not be prepared.",
      );
    }
  }
  return (
    <>
      <div className={css.translationToolbar}>
        <label className={base.field}>
          <span>Configured target language</span>
          <select
            value={locale}
            onChange={(e) => {
              setLocale(e.target.value as Language);
              setStatus("");
            }}
          >
            <option value="bn">Bengali</option>
            <option value="ar">Arabic</option>
            <option value="en">English</option>
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
          <span>THE CONFIGURED SOURCE</span>
          <code>common.actions.liveDemo</code>
          <blockquote lang="en" dir="ltr">
            {labels.en}
          </blockquote>
          <small>Configured target label</small>
          <p lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
            {labels[locale]}
          </p>
        </section>
        <section>
          <span>YOUR LOCAL WORDING DRAFT</span>
          <label className={base.field}>
            <span>Edit a draft label · up to 500 characters</span>
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
            {draft || "Your draft preview appears here."}
          </p>
          <button type="button" className={css.actionButton} onClick={download}>
            <Download size={14} />
            Download local JSON draft
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
  const [path, setPath] = useState(0),
    [selected, setSelected] = useState(partnerChecklist.map(() => false));
  return (
    <>
      <div
        className={css.partnerChoices}
        role="group"
        aria-label="Choose a partnership conversation topic"
      >
        {partnerPaths.map((p, i) => (
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
        {partnerChecklist.map((task, i) => (
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
        {selected.filter(Boolean).length} of {partnerChecklist.length}{" "}
        preparation notes selected. This is not an application or approval.
      </p>
      <EmailComposer
        email={contact.salesEmail}
        subject={`EdenERP partnership enquiry: ${partnerPaths[path].title}`}
        title="Introduce your practice and your questions."
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
  if (slug === "home") return <Directory />;
  if (slug === "tutorials") return <GuideLibrary rows={guides} />;
  if (slug === "documentation")
    return <GuideLibrary rows={referenceNotes} kind="reference" />;
  if (slug === "training") return <AgendaPlanner />;
  if (slug === "meet-advisor") return <AdvisorBrief />;
  if (slug === "support") return <SupportContent contact={contact} />;
  if (slug === "customer-stories") return <Stories />;
  if (slug === "forum")
    return (
      <>
        <GuideLibrary rows={discussionNotes} kind="discussion" />
        <EmailComposer
          email={contact.supportEmail}
          subject="EdenERP product discussion"
          title="Prepare a thoughtful product question."
        />
      </>
    );
  if (slug === "events") return <AgendaPlanner event />;
  if (slug === "translations")
    return labels ? (
      <TranslationsContent labels={labels} />
    ) : (
      <p>Configured label samples are unavailable.</p>
    );
  if (slug === "become-a-partner")
    return <PartnershipContent contact={contact} />;
  return null;
}
