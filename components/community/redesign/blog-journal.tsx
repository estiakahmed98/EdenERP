"use client";
import { useEffect, useState, type FormEvent } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  RefreshCw,
  Search,
} from "lucide-react";
import { articleText, parseJournal } from "./logic";
import { base, css } from "./ui";
import { useTranslations } from "next-intl";
type Journal = ReturnType<typeof parseJournal>;
export default function BlogJournal() {
  const t = useTranslations("pages.communityApp");
  const [draft, setDraft] = useState(""),
    [query, setQuery] = useState(""),
    [page, setPage] = useState(1),
    [attempt, setAttempt] = useState(0),
    [data, setData] = useState<Journal | null>(null),
    [state, setState] = useState<"loading" | "ready" | "error">("loading");
  useEffect(() => {
    const controller = new AbortController();
    let current = true;
    setState("loading");
    setData(null);
    async function read() {
      try {
        const params = new URLSearchParams({
          page: String(page),
          limit: "6",
          search: query,
        });
        const response = await fetch(`/api/blog?${params}`, {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("Journal service unavailable");
        const result = parseJournal(await response.json());
        if (current) {
          setData(result);
          setState("ready");
        }
      } catch (error) {
        if (!controller.signal.aborted && current) {
          setData(null);
          setState("error");
        }
        if (error instanceof Error && error.name === "AbortError") return;
      }
    }
    void read();
    return () => {
      current = false;
      controller.abort();
    };
  }, [query, page, attempt]);
  function search(event: FormEvent) {
    event.preventDefault();
    setQuery(draft.trim().slice(0, 100));
    setPage(1);
  }
  return (
    <div className={css.journalLibrary} aria-busy={state === "loading"}>
      <form className={css.journalSearch} onSubmit={search}>
        <label className={base.field}>
          <span>{t("blog-journal.searchArticleTitlesSummariesAndAuthors")}</span>
          <input
            type="search"
            maxLength={100}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={t("blog-journal.findAJournalArticle")}
          />
        </label>
        <button type="submit" className={css.actionButton}>
          <Search size={15} aria-hidden="true" />
          {t("blog-journal.searchJournal")}
        </button>
      </form>
      {state === "loading" && (
        <div className={css.journalState} role="status">
          <RefreshCw size={22} aria-hidden="true" />
          <h3>{t("blog-journal.loadingTheJournal")}</h3>
          <p>{t("blog-journal.readingTheExistingPublicArticleService")}</p>
        </div>
      )}
      {state === "error" && (
        <div className={css.journalState} role="alert">
          <h3>{t("blog-journal.theJournalIsUnavailableRightNow")}</h3>
          <p>
            {t("blog-journal.theExistingArticleServiceCouldNot")}
          </p>
          <button
            type="button"
            className={css.actionButton}
            onClick={() => setAttempt((n) => n + 1)}
          >
            <RefreshCw size={14} aria-hidden="true" />
            {t("blog-journal.tryAgain")}
          </button>
        </div>
      )}
      {state === "ready" && data && (
        <>
          {data.posts.length === 0 ? (
            <div className={css.journalState} role="status">
              <h3>
                {query
                  ? t("blog-journal.noArticlesMatchThatSearch")
                  : t("blog-journal.noArticlesAreAvailableYet")}
              </h3>
              <p>
                {query
                  ? t("blog-journal.tryAnotherTitleAuthorOrTopic")
                  : t("blog-journal.theJournalWillShowPostsReturned")}
              </p>
            </div>
          ) : (
            <div className={css.postGrid}>
              {data.posts.map((post, i) => {
                const summary = articleText(post.summary),
                  body = articleText(post.content),
                  date = new Date(post.date);
                return (
                  <article key={post.id} className={css.postCard}>
                    <div className={css.postIndex}>
                      <span>{t("blog-journal.fromTheJournal")}</span>
                      <b>
                        {String((data.page - 1) * 6 + i + 1).padStart(2, "0")}
                      </b>
                      <i />
                    </div>
                    <div className={css.postMeta}>
                      <span>{post.author}</span>
                      <time
                        dateTime={
                          Number.isNaN(date.getTime())
                            ? undefined
                            : date.toISOString()
                        }
                      >
                        {Number.isNaN(date.getTime())
                          ? t("blog-journal.dateUnavailable")
                          : date.toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                              timeZone: "UTC",
                            })}
                      </time>
                    </div>
                    <h3>{post.title}</h3>
                    {summary && <p>{summary}</p>}
                    <details className={css.articleDetails}>
                      <summary>
                        {t("blog-journal.readArticle")}
                        <ChevronDown size={15} aria-hidden="true" />
                      </summary>
                      <div>
                        {body ||
                          t("blog-journal.noReadableArticleTextIsIncluded")}
                      </div>
                    </details>
                  </article>
                );
              })}
            </div>
          )}
          <div className={css.journalPagination}>
            <button
              type="button"
              className={base.reset}
              disabled={page <= 1}
              onClick={() => setPage((n) => Math.max(1, n - 1))}
            >
              <ArrowLeft size={14} aria-hidden="true" />
              {t("blog-journal.previous")}
            </button>
            <p role="status">
              {data.total}{" "}{t("blog-journal.article")}{data.total === 1 ? "" : "s"}
              {data.pages > 0 ? t("blog-journal.pageOf", { page: String(data.page), pages: String(data.pages) }) : ""}
            </p>
            <button
              type="button"
              className={base.reset}
              disabled={page >= Math.min(data.pages, 1000)}
              onClick={() => setPage((n) => n + 1)}
            >
              {t("blog-journal.next")}
              <ArrowRight size={14} aria-hidden="true" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
