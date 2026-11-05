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
type Journal = ReturnType<typeof parseJournal>;
export default function BlogJournal() {
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
          <span>Search article titles, summaries and authors</span>
          <input
            type="search"
            maxLength={100}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Find a journal article…"
          />
        </label>
        <button type="submit" className={css.actionButton}>
          <Search size={15} aria-hidden="true" />
          Search journal
        </button>
      </form>
      {state === "loading" && (
        <div className={css.journalState} role="status">
          <RefreshCw size={22} aria-hidden="true" />
          <h3>Loading the journal…</h3>
          <p>Reading the existing public article service.</p>
        </div>
      )}
      {state === "error" && (
        <div className={css.journalState} role="alert">
          <h3>The journal is unavailable right now.</h3>
          <p>
            The existing article service could not be loaded. No sample articles
            have been substituted.
          </p>
          <button
            type="button"
            className={css.actionButton}
            onClick={() => setAttempt((n) => n + 1)}
          >
            <RefreshCw size={14} aria-hidden="true" />
            Try again
          </button>
        </div>
      )}
      {state === "ready" && data && (
        <>
          {data.posts.length === 0 ? (
            <div className={css.journalState} role="status">
              <h3>
                {query
                  ? "No articles match that search."
                  : "No articles are available yet."}
              </h3>
              <p>
                {query
                  ? "Try another title, author or topic."
                  : "The journal will show posts returned by the public service when they are available."}
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
                      <span>FROM THE JOURNAL</span>
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
                          ? "Date unavailable"
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
                        Read article
                        <ChevronDown size={15} aria-hidden="true" />
                      </summary>
                      <div>
                        {body ||
                          "No readable article text is included in this record."}
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
              Previous
            </button>
            <p role="status">
              {data.total} article{data.total === 1 ? "" : "s"}
              {data.pages > 0 ? ` · page ${data.page} of ${data.pages}` : ""}
            </p>
            <button
              type="button"
              className={base.reset}
              disabled={page >= Math.min(data.pages, 1000)}
              onClick={() => setPage((n) => n + 1)}
            >
              Next
              <ArrowRight size={14} aria-hidden="true" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
