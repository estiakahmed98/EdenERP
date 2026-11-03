"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Inbox,
  Loader2,
  Phone,
  RefreshCw,
  Search,
  X,
} from "lucide-react";
import { NextIntlClientProvider } from "next-intl";
import english from "@/messages/en.json";
import LiveDemoButton from "@/components/live-demo-button";
import DemoBookingProvider from "./provider";
import {
  DEMO_STATUSES,
  type DemoAdminData,
  type DemoRequestRow,
  type DemoRequestStatus,
} from "@/lib/demo-requests/validation";
import css from "./admin-requests.module.css";

const labels: Record<DemoRequestStatus, string> = {
  NEW: "New",
  CONTACTED: "Contacted",
  SCHEDULED: "Demo arranged",
  CLOSED: "Closed",
};
export default function AdminDemoRequests() {
  const [data, setData] = useState<DemoAdminData | null>(null),
    [loading, setLoading] = useState(true),
    [error, setError] = useState("");
  const [search, setSearch] = useState(""),
    [query, setQuery] = useState(""),
    [status, setStatus] = useState("ALL"),
    [page, setPage] = useState(1);
  const [selected, setSelected] = useState<DemoRequestRow | null>(null),
    [nextStatus, setNextStatus] = useState<DemoRequestStatus>("NEW"),
    [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false),
    [saveError, setSaveError] = useState(""),
    [saved, setSaved] = useState("");
  const sequence = useRef(0),
    savePending = useRef(false);
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setQuery(search.trim());
      setPage(1);
    }, 300);
    return () => window.clearTimeout(timer);
  }, [search]);
  const load = useCallback(
    async (signal?: AbortSignal) => {
      const call = ++sequence.current;
      setLoading(true);
      setError("");
      try {
        const params = new URLSearchParams({
          q: query,
          status,
          page: String(page),
        });
        const response = await fetch("/api/admin/demo-requests?" + params, {
          signal,
          cache: "no-store",
        });
        if (!response.ok)
          throw new Error(
            response.status === 401
              ? "Your admin session has expired. Sign in again."
              : "Requests could not be loaded. Please try again.",
          );
        const value = (await response.json()) as DemoAdminData;
        if (!Array.isArray(value.requests) || typeof value.total !== "number")
          throw new Error("The server returned an invalid response.");
        if (call !== sequence.current) return;
        setData(value);
      } catch (cause) {
        if (call !== sequence.current || signal?.aborted) return;
        setError(
          cause instanceof Error
            ? cause.message
            : "Requests could not be loaded.",
        );
      } finally {
        if (call === sequence.current && !signal?.aborted) setLoading(false);
      }
    },
    [query, status, page],
  );
  useEffect(() => {
    const controller = new AbortController();
    void load(controller.signal);
    const refresh = () => void load();
    window.addEventListener("eden-demo-request-created", refresh);
    return () => {
      controller.abort();
      window.removeEventListener("eden-demo-request-created", refresh);
    };
  }, [load]);
  function select(row: DemoRequestRow) {
    setSelected(row);
    setNextStatus(row.status);
    setNotes(row.adminNotes);
    setSaveError("");
    setSaved("");
  }
  async function save(event: FormEvent) {
    event.preventDefault();
    if (!selected || savePending.current) return;
    savePending.current = true;
    setSaving(true);
    setSaveError("");
    setSaved("");
    try {
      const response = await fetch("/api/admin/demo-requests", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selected.id,
          version: selected.version,
          status: nextStatus,
          adminNotes: notes,
        }),
      });
      const body = await response.json();
      if (!response.ok || body.saved !== true)
        throw new Error(
          response.status === 409
            ? "This request changed. Reload and reopen it before saving again."
            : response.status === 401
              ? "Your admin session has expired. Sign in again."
              : "Your changes could not be saved.",
        );
      setSaved("Changes saved.");
      setSelected((current) =>
        current?.id === selected.id
          ? (body.request as DemoRequestRow)
          : current,
      );
      await load();
    } catch (cause) {
      setSaveError(
        cause instanceof Error
          ? cause.message
          : "Your changes could not be saved.",
      );
    } finally {
      savePending.current = false;
      setSaving(false);
    }
  }
  const date = (value: string) =>
    new Intl.DateTimeFormat("en", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(value));
  return (
    <NextIntlClientProvider locale="en" messages={{ common: english.common }}>
      <DemoBookingProvider>
        <main className={css.admin}>
          <header className={css.header}>
            <div>
              <span className={css.eyebrow}>Customer conversations</span>
              <h1>Demo requests</h1>
              <p>
                Review requests, contact clients and keep follow-up notes
                together.
              </p>
            </div>
            <LiveDemoButton />
          </header>
          <div className={css.metrics}>
            {DEMO_STATUSES.map((value) => (
              <button
                key={value}
                type="button"
                aria-pressed={status === value}
                onClick={() => {
                  setStatus((current) => (current === value ? "ALL" : value));
                  setPage(1);
                  setSelected(null);
                }}
              >
                <span>{labels[value]}</span>
                <strong>{data ? data.counts[value] : "—"}</strong>
              </button>
            ))}
          </div>
          <section className={css.panel} aria-label="Saved demo requests">
            <div className={css.toolbar}>
              <label className={css.search}>
                <Search size={15} />
                <input
                  type="search"
                  aria-label="Search name, company, phone or email"
                  placeholder="Search requests…"
                  value={search}
                  maxLength={100}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </label>
              <label className={css.filter}>
                Status
                <select
                  value={status}
                  onChange={(event) => {
                    setStatus(event.target.value);
                    setPage(1);
                    setSelected(null);
                  }}
                >
                  <option value="ALL">All requests</option>
                  {DEMO_STATUSES.map((value) => (
                    <option key={value} value={value}>
                      {labels[value]}
                    </option>
                  ))}
                </select>
              </label>
              <button
                className={css.secondary}
                type="button"
                disabled={loading}
                onClick={() => void load()}
              >
                <RefreshCw
                  size={14}
                  className={loading ? css.spin : undefined}
                />
                Refresh
              </button>
            </div>
            {error ? (
              <div className={css.empty} role="alert">
                <Inbox size={28} />
                <strong>{error}</strong>
                <button
                  type="button"
                  className={css.secondary}
                  onClick={() => void load()}
                >
                  Try again
                </button>
              </div>
            ) : loading && !data ? (
              <div className={css.empty} role="status">
                <Loader2 size={26} className={css.spin} />
                <span>Loading saved requests…</span>
              </div>
            ) : data && data.requests.length ? (
              <>
                <div className={css.tableScroll} aria-busy={loading}>
                  <table>
                    <caption className={css.srOnly}>
                      Demo requests saved in the database
                    </caption>
                    <thead>
                      <tr>
                        <th>Client</th>
                        <th>Company</th>
                        <th>Phone</th>
                        <th>Status</th>
                        <th>Received</th>
                        <th>
                          <span className={css.srOnly}>Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.requests.map((row) => (
                        <tr
                          key={row.id}
                          data-selected={selected?.id === row.id}
                        >
                          <td>
                            <strong>{row.fullName}</strong>
                            {row.email && <small>{row.email}</small>}
                          </td>
                          <td>{row.companyName}</td>
                          <td>
                            <a href={"tel:" + row.phone}>{row.phone}</a>
                          </td>
                          <td>
                            <span
                              className={css.badge}
                              data-status={row.status}
                            >
                              {labels[row.status]}
                            </span>
                          </td>
                          <td>
                            <time dateTime={row.createdAt}>
                              {date(row.createdAt)}
                            </time>
                          </td>
                          <td>
                            <button
                              className={css.secondary}
                              type="button"
                              onClick={() => select(row)}
                            >
                              Manage
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className={css.pagination}>
                  <span>
                    {data.total} request{data.total === 1 ? "" : "s"} · Page{" "}
                    {data.page} of{" "}
                    {Math.max(1, Math.ceil(data.total / data.pageSize))}
                  </span>
                  <div>
                    <button
                      className={css.secondary}
                      type="button"
                      disabled={page <= 1 || loading}
                      onClick={() => {
                        setPage((p) => p - 1);
                        setSelected(null);
                      }}
                      aria-label="Previous page"
                    >
                      <ChevronLeft size={15} />
                    </button>
                    <button
                      className={css.secondary}
                      type="button"
                      disabled={page * data.pageSize >= data.total || loading}
                      onClick={() => {
                        setPage((p) => p + 1);
                        setSelected(null);
                      }}
                      aria-label="Next page"
                    >
                      <ChevronRight size={15} />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className={css.empty}>
                <Inbox size={30} />
                <strong>No matching requests</strong>
                <p>
                  Saved submissions will appear here. Try another search or
                  status filter.
                </p>
              </div>
            )}
          </section>
          {selected && (
            <section
              className={css.detail}
              aria-label={"Manage request from " + selected.fullName}
            >
              <header>
                <div>
                  <span className={css.eyebrow}>Request details</span>
                  <h2>{selected.fullName}</h2>
                  <p>{selected.companyName}</p>
                </div>
                <button
                  type="button"
                  className={css.iconButton}
                  onClick={() => setSelected(null)}
                  aria-label="Close request details"
                >
                  <X size={18} />
                </button>
              </header>
              <div className={css.detailGrid}>
                <div>
                  <dl className={css.details}>
                    <div>
                      <dt>Phone</dt>
                      <dd>
                        <a href={"tel:" + selected.phone}>
                          <Phone size={13} /> {selected.phone}
                        </a>
                      </dd>
                    </div>
                    <div>
                      <dt>Email</dt>
                      <dd>
                        {selected.email ? (
                          <a href={"mailto:" + selected.email}>
                            {selected.email}
                          </a>
                        ) : (
                          "Not shared"
                        )}
                      </dd>
                    </div>
                    <div>
                      <dt>ERP modules</dt>
                      <dd>
                        {selected.modules.length
                          ? selected.modules.join(", ")
                          : "Not shared"}
                      </dd>
                    </div>
                    <div>
                      <dt>Message</dt>
                      <dd>{selected.message || "Not shared"}</dd>
                    </div>
                    <div>
                      <dt>Received</dt>
                      <dd>{date(selected.createdAt)}</dd>
                    </div>
                  </dl>
                </div>
                <form onSubmit={save}>
                  <fieldset disabled={saving}>
                    <label>
                      Status
                      <select
                        value={nextStatus}
                        onChange={(event) =>
                          setNextStatus(event.target.value as DemoRequestStatus)
                        }
                      >
                        {DEMO_STATUSES.map((value) => (
                          <option value={value} key={value}>
                            {labels[value]}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label>
                      Follow-up notes
                      <textarea
                        rows={5}
                        maxLength={4000}
                        value={notes}
                        onChange={(event) => setNotes(event.target.value)}
                      />
                    </label>
                  </fieldset>
                  {saveError && (
                    <p className={css.error} role="alert">
                      {saveError}
                    </p>
                  )}
                  {saved && (
                    <p className={css.feedback} role="status">
                      <Check size={14} />
                      {saved}
                    </p>
                  )}
                  <button
                    type="submit"
                    className={css.primary}
                    disabled={saving}
                  >
                    {saving && <Loader2 size={14} className={css.spin} />}{" "}
                    {saving ? "Saving…" : "Save changes"}
                  </button>
                </form>
              </div>
            </section>
          )}
        </main>
      </DemoBookingProvider>
    </NextIntlClientProvider>
  );
}
