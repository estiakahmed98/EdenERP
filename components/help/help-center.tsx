"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronDown,
  FileText,
  Headphones,
  HelpCircle,
  Layers3,
  LifeBuoy,
  Mail,
  MessageSquare,
  Phone,
  Search,
  X,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import LiveDemoButton from "@/components/live-demo-button";
import css from "./help.module.css";

type HelpResource = {
  id: string;
  title: string;
  category: string;
  summary: string;
  steps: string[];
  href: string;
  linkLabel: string;
  kind: "reference" | "guide";
};

type Props = {
  resources: HelpResource[];
  faqs: [string, string][];
  contact: { email: string; phone: string; phoneDisplay: string };
};

const shortcuts = [
  {
    key: "documentation",
    icon: BookOpen,
    href: "/community/learn/documentation",
  },
  { key: "faq", icon: HelpCircle, href: "#help-faq" },
  {
    key: "communitySupport",
    icon: MessageSquare,
    href: "/community/collaborate/forum",
  },
  { key: "contactSupport", icon: Headphones, href: "#help-contact" },
] as const;

function KnowledgeIllustration() {
  const t = useTranslations("pages.help");
  const docs = useTranslations(
    "pages.community.hubs.communityRoot.sections.0.links.1",
  );
  return (
    <div className={css.illustration}>
      <div className={css.orbit} aria-hidden="true" />
      <div className={css.orbitInner} aria-hidden="true" />
      <svg
        className={css.connections}
        viewBox="0 0 520 420"
        fill="none"
        aria-hidden="true"
      >
        <path d="M90 100C140 100 120 190 210 190M420 300C350 300 385 220 310 220M395 70C335 70 370 165 310 165" />
        <circle cx="90" cy="100" r="4" />
        <circle cx="420" cy="300" r="4" />
        <circle cx="395" cy="70" r="4" />
      </svg>
      <div className={`${css.floatingIcon} ${css.iconTop}`} aria-hidden="true">
        <LifeBuoy />
      </div>
      <div className={`${css.floatingIcon} ${css.iconLeft}`} aria-hidden="true">
        <MessageSquare />
      </div>
      <div
        className={`${css.floatingIcon} ${css.iconBottom}`}
        aria-hidden="true"
      >
        <Layers3 />
      </div>
      <div className={css.paperStack}>
        <div className={css.paperBack} aria-hidden="true" />
        <div className={css.paper}>
          <div className={css.paperTop}>
            <span className={css.paperIcon}>
              <BookOpen size={22} aria-hidden="true" />
            </span>
            <span className={css.paperDots} aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
          </div>
          <p className={css.paperTitle}>
            {t("categories.documentation.title")}
          </p>
          <div className={css.paperLines} aria-hidden="true">
            <i />
            <i />
          </div>
          <div className={css.paperRow}>
            <span>
              <Check size={13} aria-hidden="true" />
            </span>
            {t("categories.documentation.topics.gettingStarted")}
          </div>
          <div className={css.paperRow}>
            <span>
              <Check size={13} aria-hidden="true" />
            </span>
            {t("categories.documentation.topics.bestPractices")}
          </div>
          <Link className={css.paperLink} href="/community/learn/documentation">
            <BookOpen size={14} aria-hidden="true" />
            {t("categories.documentation.title")}
            <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </div>
      <div className={css.illustrationCaption}>
        <span aria-hidden="true" />
        {docs("description")}
      </div>
    </div>
  );
}

export default function HelpCenter({ resources, faqs, contact }: Props) {
  const t = useTranslations("pages.help");
  const hub = useTranslations("pages.apps.hub");
  const footer = useTranslations("layout.footer.links");
  const docs = useTranslations(
    "pages.community.hubs.communityRoot.sections.0.links.1",
  );
  const locale = useLocale();
  const [query, setQuery] = useState("");
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLHeadingElement>(null);
  const terms = query
    .trim()
    .normalize("NFKC")
    .toLocaleLowerCase(locale)
    .split(/\s+/)
    .filter(Boolean);
  const visible = resources.filter((resource) => {
    const text = [
      resource.title,
      resource.category,
      resource.summary,
      ...resource.steps,
    ]
      .join(" ")
      .normalize("NFKC")
      .toLocaleLowerCase(locale);
    return terms.every((term) => text.includes(term));
  });

  function search(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    resultsRef.current?.scrollIntoView({ block: "start" });
    resultsRef.current?.focus({ preventScroll: true });
  }

  function clearSearch() {
    setQuery("");
    inputRef.current?.focus();
  }

  return (
    <main className={css.page} data-help-center>
      <section className={css.hero} aria-labelledby="help-title">
        <div className={css.wrap}>
          <div className={css.heroLayout}>
            <div className={css.heroCopy}>
              <p className={css.eyebrow}>
                <span>
                  <LifeBuoy size={15} aria-hidden="true" />
                </span>
                {footer("helpCenter")}
              </p>
              <h1 id="help-title">
                {t.rich("hero.title", {
                  highlight: (chunks) => (
                    <span className={css.highlight}>
                      {chunks}
                      <svg
                        viewBox="0 0 240 12"
                        preserveAspectRatio="none"
                        aria-hidden="true"
                      >
                        <path d="M3 8C62 1 159 1 237 7M30 10C98 4 169 5 211 9" />
                      </svg>
                    </span>
                  ),
                })}
              </h1>
              <p className={css.lead}>{t("hero.description")}</p>
              <form className={css.search} role="search" onSubmit={search}>
                <label className={css.srOnly} htmlFor={inputId}>
                  {t("hero.searchPlaceholder")}
                </label>
                <Search size={21} aria-hidden="true" />
                <input
                  ref={inputRef}
                  id={inputId}
                  type="search"
                  value={query}
                  placeholder={t("hero.searchPlaceholder")}
                  onChange={(event) => setQuery(event.target.value)}
                  aria-controls="help-resource-list"
                  autoComplete="off"
                  maxLength={200}
                />
                {query ? (
                  <button
                    className={css.clear}
                    type="button"
                    onClick={clearSearch}
                    aria-label={hub("clear")}
                  >
                    <X size={16} aria-hidden="true" />
                  </button>
                ) : null}
                <button
                  className={css.searchSubmit}
                  type="submit"
                  aria-label={t("hero.searchPlaceholder")}
                >
                  <ArrowRight size={19} aria-hidden="true" />
                </button>
              </form>
              <div className={css.heroLinks}>
                <Link href="/community/learn/tutorials">
                  {t("categories.documentation.topics.gettingStarted")}
                  <ArrowUpRight size={13} aria-hidden="true" />
                </Link>
                <a href="#help-faq">
                  {t("categories.faq.title")}
                  <ArrowDown size={13} aria-hidden="true" />
                </a>
              </div>
            </div>
            <KnowledgeIllustration />
          </div>
          <nav className={css.shortcuts} aria-label={footer("helpCenter")}>
            {shortcuts.map(({ key, icon: Icon, href }, index) => (
              <Link key={key} href={href} className={css.shortcut}>
                <div className={css.shortcutTop}>
                  <span className={css.shortcutIcon}>
                    <Icon size={21} aria-hidden="true" />
                  </span>
                  <span className={css.shortcutNumber}>0{index + 1}</span>
                </div>
                <h2>
                  {t(`categories.${key}.title`)}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </h2>
                <p>
                  {key === "documentation"
                    ? docs("description")
                    : t(`categories.${key}.description`)}
                </p>
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <section
        className={`${css.wrap} ${css.resources}`}
        aria-labelledby="help-resources-title"
      >
        <div className={css.resourceMain}>
          <div className={css.sectionHeading}>
            <div>
              <p className={css.eyebrow}>
                <BookOpen size={14} aria-hidden="true" />
                {t("categories.documentation.title")}
              </p>
              <h2 ref={resultsRef} id="help-resources-title" tabIndex={-1}>
                {t("popularTopics.title")}
              </h2>
            </div>
            <Link
              href="/community/learn/documentation"
              aria-label={`${hub("all")} · ${t("categories.documentation.title")}`}
            >
              {hub("all")}
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
          <div id="help-resource-list" className={css.resourceList}>
            {visible.map((resource) => (
              <details key={resource.id} className={css.resource}>
                <summary>
                  <span className={css.resourceIcon}>
                    {resource.kind === "reference" ? (
                      <FileText size={19} aria-hidden="true" />
                    ) : (
                      <Layers3 size={19} aria-hidden="true" />
                    )}
                  </span>
                  <span className={css.resourceText}>
                    <span className={css.resourceTitle}>{resource.title}</span>
                    <span className={css.resourceCategory}>
                      {resource.category}
                    </span>
                  </span>
                  <ChevronDown
                    size={17}
                    className={css.chevron}
                    aria-hidden="true"
                  />
                </summary>
                <div className={css.resourceBody}>
                  <p>{resource.summary}</p>
                  <ol>
                    {resource.steps.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                  <Link href={resource.href}>
                    {resource.linkLabel}
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </Link>
                </div>
              </details>
            ))}
            {visible.length === 0 ? (
              <div className={css.empty}>
                <Search size={25} aria-hidden="true" />
                <p>{hub("noResults")}</p>
                <button type="button" onClick={clearSearch}>
                  {hub("clear")}
                  <ArrowRight size={15} aria-hidden="true" />
                </button>
              </div>
            ) : null}
          </div>
          <p role="status" className={css.srOnly}>
            {query ? `${t("popularTopics.title")}: ${visible.length}` : ""}
          </p>
        </div>

        <aside
          className={css.contact}
          id="help-contact"
          aria-labelledby="help-contact-title"
        >
          <div className={css.contactArt} aria-hidden="true">
            <span />
            <Headphones size={34} strokeWidth={1.5} />
            <i />
            <i />
          </div>
          <p className={css.eyebrow}>{t("categories.contactSupport.title")}</p>
          <h2 id="help-contact-title">{t("supportOptions.title")}</h2>
          <p className={css.contactLead}>
            {t("categories.contactSupport.description")}
          </p>
          <div className={css.contactLinks}>
            <a href={`mailto:${contact.email}`}>
              <span className={css.channelIcon}>
                <Mail size={18} aria-hidden="true" />
              </span>
              <span>
                <b>{t("supportOptions.emailSupport.title")}</b>
                <small dir="ltr">{contact.email}</small>
              </span>
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <a href={`tel:${contact.phone}`}>
              <span className={css.channelIcon}>
                <Phone size={18} aria-hidden="true" />
              </span>
              <span>
                <b>{t("supportOptions.phoneSupport.title")}</b>
                <small dir="ltr">{contact.phoneDisplay}</small>
              </span>
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
          <Link
            href="/community/get-services/support"
            className={css.contactAction}
          >
            {t("categories.contactSupport.title")}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </aside>
      </section>

      <section
        className={css.faqSection}
        id="help-faq"
        aria-labelledby="help-faq-title"
      >
        <div className={`${css.wrap} ${css.faqLayout}`}>
          <div className={css.faqIntro}>
            <span className={css.faqSymbol} aria-hidden="true">
              ?
            </span>
            <p className={css.eyebrow}>{t("categories.faq.title")}</p>
            <h2 id="help-faq-title">{t("categories.faq.description")}</h2>
            <Link href="/contact">
              {t("categories.contactSupport.title")}
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className={css.faqList}>
            {faqs.map(([question, answer], index) => (
              <details key={question}>
                <summary>
                  <span className={css.faqNumber}>0{index + 1}</span>
                  <h3>{question}</h3>
                  <ChevronDown
                    size={18}
                    className={css.chevron}
                    aria-hidden="true"
                  />
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className={`${css.wrap} ${css.advisor}`}>
        <div className={css.advisorIcon} aria-hidden="true">
          <MessageSquare size={25} strokeWidth={1.5} />
        </div>
        <div>
          <h2>{hub("ctaTitle")}</h2>
          <p>{hub("ctaLead")}</p>
        </div>
        <LiveDemoButton />
      </section>
    </main>
  );
}
