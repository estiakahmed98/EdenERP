"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  CalendarClock,
  ChevronLeft,
  ChevronRight,
  Inbox,
  Layers,
  Mail,
  Pencil,
  Phone,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { useLocale, useTranslations } from "next-intl";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  DEMO_STATUSES,
  type DemoAdminData,
  type DemoRequestRow,
  type DemoRequestStatus,
} from "@/lib/demo-requests/validation";
import RequestSheet, {
  type FieldErrors,
  type RequestFormValues,
} from "./admin/request-sheet";
import { StatusMenu } from "./admin/status-badge";
import {
  STATUS_META,
  formatDate,
  initialsOf,
  timeAgo,
} from "./admin/status";

const ENDPOINT = "/api/admin/demo-requests";

type ApiResult = {
  ok: boolean;
  status: number;
  body: {
    code?: string;
    saved?: boolean;
    deleted?: boolean;
    request?: DemoRequestRow;
    fields?: { fieldErrors?: Record<string, string[] | undefined> };
  };
};

async function api(method: string, payload?: unknown): Promise<ApiResult> {
  const response = await fetch(ENDPOINT, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const body = await response.json().catch(() => ({}));
  return { ok: response.ok, status: response.status, body };
}

type Translate = ReturnType<typeof useTranslations>;

function messageFor(result: ApiResult, fallback: string, t: Translate) {
  if (result.status === 401)
    return t("errors.sessionExpired");
  if (result.status === 409) return t("errors.conflict");
  if (result.status === 404) return t("errors.notFound");
  if (result.status === 429) return t("errors.tooMany");
  return fallback;
}

function toFieldErrors(result: ApiResult): FieldErrors {
  const errors: FieldErrors = {};
  const raw = result.body.fields?.fieldErrors ?? {};
  for (const [key, messages] of Object.entries(raw))
    if (messages?.[0]) errors[key as keyof FieldErrors] = messages[0];
  return errors;
}

export default function AdminDemoRequests() {
  const t = useTranslations("admin.demo");
  const locale = useLocale();
  const [data, setData] = useState<DemoAdminData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"ALL" | DemoRequestStatus>("ALL");
  const [page, setPage] = useState(1);

  // Sheet: undefined = closed, null = create, row = edit
  const [sheetRow, setSheetRow] = useState<DemoRequestRow | null | undefined>(
    undefined,
  );
  const [saving, setSaving] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [statusBusy, setStatusBusy] = useState<string | null>(null);
  const [toDelete, setToDelete] = useState<DemoRequestRow | null>(null);
  const [deleting, setDeleting] = useState(false);

  const sequence = useRef(0);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setQuery(search.trim());
      setPage(1);
    }, 300);
    return () => window.clearTimeout(timer);
  }, [search]);

  const load = useCallback(
    async (opts?: { signal?: AbortSignal; silent?: boolean }) => {
      const call = ++sequence.current;
      if (!opts?.silent) setLoading(true);
      setError("");
      try {
        const params = new URLSearchParams({
          q: query,
          status,
          page: String(page),
        });
        const response = await fetch(`${ENDPOINT}?${params}`, {
          signal: opts?.signal,
          cache: "no-store",
        });
        if (!response.ok)
          throw new Error(
            response.status === 401
              ? t("errors.sessionExpired")
              : t("errors.loadFailed"),
          );
        const value = (await response.json()) as DemoAdminData;
        if (!Array.isArray(value.requests) || typeof value.total !== "number")
          throw new Error(t("errors.invalidResponse"));
        if (call !== sequence.current) return;
        // Deleted the last row of a page → step back.
        if (!value.requests.length && value.total > 0 && value.page > 1) {
          setPage(value.page - 1);
          return;
        }
        setData(value);
      } catch (cause) {
        if (call !== sequence.current || opts?.signal?.aborted) return;
        setError(
          cause instanceof Error ? cause.message : t("errors.loadFailedShort"),
        );
      } finally {
        if (call === sequence.current && !opts?.signal?.aborted)
          setLoading(false);
      }
    },
    [query, status, page],
  );

  useEffect(() => {
    const controller = new AbortController();
    void load({ signal: controller.signal });
    return () => controller.abort();
  }, [load]);

  /** Replace one row in place (no flicker) and refresh the counters. */
  const applyRow = (next: DemoRequestRow) => {
    setData((current) =>
      current
        ? {
            ...current,
            requests: current.requests.map((r) => (r.id === next.id ? next : r)),
          }
        : current,
    );
    setSheetRow((current) => (current && current.id === next.id ? next : current));
    void load({ silent: true });
  };

  async function changeStatus(row: DemoRequestRow, next: DemoRequestStatus) {
    if (next === row.status || statusBusy) return;
    setStatusBusy(row.id);
    const result = await api("PATCH", {
      id: row.id,
      version: row.version,
      status: next,
    });
    setStatusBusy(null);
    if (result.ok && result.body.request) {
      applyRow(result.body.request);
      toast.success(
        t("toast.moved", {
          name: row.fullName,
          status: t(`status.${next}.label`),
        }),
      );
      return;
    }
    toast.error(messageFor(result, t("errors.statusFailed"), t));
    void load({ silent: true });
  }

  async function submitSheet(values: RequestFormValues) {
    setSaving(true);
    setFieldErrors({});
    const editing = sheetRow || null;
    const result = editing
      ? await api("PATCH", { id: editing.id, version: editing.version, ...values })
      : await api("POST", values);
    setSaving(false);

    if (result.ok && result.body.request) {
      toast.success(editing ? t("toast.saved") : t("toast.created"));
      setSheetRow(undefined);
      if (editing) applyRow(result.body.request);
      else {
        setStatus("ALL");
        setSearch("");
        setPage(1);
        void load({ silent: true });
      }
      return;
    }
    if (result.status === 400) {
      setFieldErrors(toFieldErrors(result));
      toast.error(t("errors.fixFields"));
      return;
    }
    toast.error(messageFor(result, t("errors.saveFailed"), t));
    if (result.status === 409) {
      setSheetRow(undefined);
      void load({ silent: true });
    }
  }

  async function confirmDelete() {
    if (!toDelete) return;
    setDeleting(true);
    const result = await api("DELETE", { id: toDelete.id });
    setDeleting(false);
    if (result.ok || result.status === 404) {
      toast.success(t("toast.deleted", { name: toDelete.fullName }));
      if (sheetRow && sheetRow.id === toDelete.id) setSheetRow(undefined);
      setToDelete(null);
      void load({ silent: true });
      return;
    }
    toast.error(messageFor(result, t("errors.deleteFailed"), t));
  }

  const counts = data?.counts;
  const grandTotal = counts
    ? DEMO_STATUSES.reduce((sum, key) => sum + counts[key], 0)
    : null;
  const filtered = status !== "ALL" || query !== "";

  const metrics: {
    key: "ALL" | DemoRequestStatus;
    label: string;
    value: number | null;
    dot: string;
    icon: typeof Layers;
  }[] = [
    { key: "ALL", label: t("allRequests"), value: grandTotal, dot: "bg-primary", icon: Layers },
    ...DEMO_STATUSES.map((key) => ({
      key,
      label: t(`status.${key}.label`),
      value: counts ? counts[key] : null,
      dot: STATUS_META[key].dot,
      icon: STATUS_META[key].icon,
    })),
  ];

  return (
    <div className="w-full space-y-6 p-6">
      {/* Page header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            {t("title")}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {t("subtitle")}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => void load()}
            disabled={loading}
            aria-label={t("refresh")}
          >
            <RefreshCw className={cn(loading && "animate-spin")} />
            <span className="hidden sm:inline">{t("refresh")}</span>
          </Button>
          <Button
            onClick={() => {
              setFieldErrors({});
              setSheetRow(null);
            }}
          >
            <Plus /> {t("newRequest")}
          </Button>
        </div>
      </div>

      {/* Pipeline / filters */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
        {metrics.map((metric) => {
          const active = status === metric.key;
          const Icon = metric.icon;
          return (
            <button
              key={metric.key}
              type="button"
              aria-pressed={active}
              onClick={() => {
                setStatus(metric.key);
                setPage(1);
              }}
              className={cn(
                "group rounded-2xl border bg-card p-4 text-left shadow-xs transition-all hover:shadow-md",
                active
                  ? "border-primary ring-2 ring-primary/20"
                  : "border-border hover:border-primary/40",
              )}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-muted-foreground">
                  {metric.label}
                </span>
                <span
                  className={cn(
                    "flex size-7 items-center justify-center rounded-lg text-white",
                    metric.dot,
                  )}
                >
                  <Icon className="size-4" aria-hidden="true" />
                </span>
              </div>
              <div className="mt-3 text-3xl font-bold tabular-nums text-foreground">
                {metric.value ?? <Skeleton className="h-8 w-10" />}
              </div>
            </button>
          );
        })}
      </div>

      {/* List */}
      <section
        aria-label={t("title")}
        className="overflow-hidden rounded-2xl border border-border bg-card shadow-xs"
      >
        <div className="flex flex-wrap items-center gap-3 border-b border-border p-4">
          <div className="relative min-w-52 flex-1">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              type="search"
              aria-label={t("searchLabel")}
              placeholder={t("searchPlaceholder")}
              value={search}
              maxLength={100}
              onChange={(event) => setSearch(event.target.value)}
              className="h-10 pl-9"
            />
          </div>
          {filtered && (
            <Button
              variant="ghost"
              onClick={() => {
                setSearch("");
                setQuery("");
                setStatus("ALL");
                setPage(1);
              }}
            >
              <X /> {t("clearFilters")}
            </Button>
          )}
        </div>

        {error ? (
          <div
            role="alert"
            className="flex flex-col items-center gap-3 px-6 py-16 text-center"
          >
            <Inbox className="size-9 text-muted-foreground" />
            <p className="font-semibold text-foreground">{error}</p>
            <Button variant="outline" onClick={() => void load()}>
              {t("tryAgain")}
            </Button>
          </div>
        ) : loading && !data ? (
          <div className="space-y-3 p-4" role="status" aria-label={t("loading")}>
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-14 w-full rounded-xl" />
            ))}
          </div>
        ) : data && data.requests.length ? (
          <>
            {/* Desktop table */}
            <div
              className={cn(
                "hidden overflow-x-auto md:block",
                loading && "opacity-60 transition-opacity",
              )}
              aria-busy={loading}
            >
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/40 hover:bg-muted/40">
                    <TableHead className="pl-4">{t("table.client")}</TableHead>
                    <TableHead>{t("table.contact")}</TableHead>
                    <TableHead>{t("table.interest")}</TableHead>
                    <TableHead>{t("table.status")}</TableHead>
                    <TableHead>{t("table.received")}</TableHead>
                    <TableHead className="pr-4 text-right">
                      <span className="sr-only">{t("table.actions")}</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.requests.map((row) => (
                    <TableRow
                      key={row.id}
                      className="cursor-pointer"
                      onClick={() => {
                        setFieldErrors({});
                        setSheetRow(row);
                      }}
                    >
                      <TableCell className="pl-4">
                        <div className="flex items-center gap-3">
                          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-sm font-bold text-foreground">
                            {initialsOf(row.fullName)}
                          </span>
                          <div className="min-w-0">
                            <p className="truncate font-semibold text-foreground">
                              {row.fullName}
                            </p>
                            <p className="truncate text-xs text-muted-foreground">
                              {row.companyName}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <a
                          href={`tel:${row.phone}`}
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1.5 text-sm text-foreground hover:text-primary"
                        >
                          <Phone className="size-3.5 text-muted-foreground" />
                          {row.phone}
                        </a>
                        {row.email && (
                          <a
                            href={`mailto:${row.email}`}
                            onClick={(e) => e.stopPropagation()}
                            className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary"
                          >
                            <Mail className="size-3.5" />
                            {row.email}
                          </a>
                        )}
                      </TableCell>
                      <TableCell>
                        {row.modules.length ? (
                          <div className="flex max-w-56 flex-wrap gap-1">
                            {row.modules.slice(0, 2).map((m) => (
                              <span
                                key={m}
                                className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground"
                              >
                                {m}
                              </span>
                            ))}
                            {row.modules.length > 2 && (
                              <span className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                                +{row.modules.length - 2}
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <StatusMenu
                          status={row.status}
                          busy={statusBusy === row.id}
                          onChange={(next) => void changeStatus(row, next)}
                        />
                      </TableCell>
                      <TableCell>
                        <time
                          dateTime={row.createdAt}
                          title={formatDate(row.createdAt, locale)}
                          className="flex items-center gap-1.5 whitespace-nowrap text-sm text-muted-foreground"
                        >
                          <CalendarClock className="size-3.5" />
                          {timeAgo(row.createdAt, t, locale)}
                        </time>
                      </TableCell>
                      <TableCell className="pr-4">
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            aria-label={t("editRow", { name: row.fullName })}
                            onClick={(e) => {
                              e.stopPropagation();
                              setFieldErrors({});
                              setSheetRow(row);
                            }}
                          >
                            <Pencil />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            aria-label={t("deleteRow", { name: row.fullName })}
                            className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                            onClick={(e) => {
                              e.stopPropagation();
                              setToDelete(row);
                            }}
                          >
                            <Trash2 />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile cards */}
            <ul
              className={cn(
                "divide-y divide-border md:hidden",
                loading && "opacity-60",
              )}
            >
              {data.requests.map((row) => (
                <li key={row.id} className="space-y-3 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <button
                      type="button"
                      className="flex min-w-0 items-center gap-3 text-left"
                      onClick={() => {
                        setFieldErrors({});
                        setSheetRow(row);
                      }}
                    >
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-sm font-bold text-foreground">
                        {initialsOf(row.fullName)}
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate font-semibold text-foreground">
                          {row.fullName}
                        </span>
                        <span className="block truncate text-xs text-muted-foreground">
                          {row.companyName}
                        </span>
                      </span>
                    </button>
                    <StatusMenu
                      status={row.status}
                      busy={statusBusy === row.id}
                      onChange={(next) => void changeStatus(row, next)}
                    />
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
                    <a
                      href={`tel:${row.phone}`}
                      className="flex items-center gap-1.5 text-foreground"
                    >
                      <Phone className="size-3.5 text-muted-foreground" />
                      {row.phone}
                    </a>
                    <span className="text-xs text-muted-foreground">
                      {timeAgo(row.createdAt, t, locale)}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => {
                        setFieldErrors({});
                        setSheetRow(row);
                      }}
                    >
                      <Pencil /> {t("edit")}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                      aria-label={t("deleteRow", { name: row.fullName })}
                      onClick={() => setToDelete(row)}
                    >
                      <Trash2 />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>

            {/* Pagination */}
            <div className="flex items-center justify-between gap-3 border-t border-border p-4 text-sm text-muted-foreground">
              <span>
                {t("pagination", {
                  count: data.total,
                  page: data.page,
                  pages: Math.max(1, Math.ceil(data.total / data.pageSize)),
                })}
              </span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon-sm"
                  aria-label={t("previous")}
                  disabled={page <= 1 || loading}
                  onClick={() => setPage((p) => p - 1)}
                >
                  <ChevronLeft />
                </Button>
                <Button
                  variant="outline"
                  size="icon-sm"
                  aria-label={t("next")}
                  disabled={page * data.pageSize >= data.total || loading}
                  onClick={() => setPage((p) => p + 1)}
                >
                  <ChevronRight />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
            <span className="flex size-14 items-center justify-center rounded-2xl bg-muted">
              <Inbox className="size-7 text-muted-foreground" />
            </span>
            <p className="font-semibold text-foreground">
              {filtered ? t("emptyFiltered") : t("emptyNone")}
            </p>
            <p className="max-w-sm text-sm text-muted-foreground">
              {filtered
                ? t("emptyFilteredHint")
                : t("emptyNoneHint")}
            </p>
            {!filtered && (
              <Button
                onClick={() => {
                  setFieldErrors({});
                  setSheetRow(null);
                }}
              >
                <Plus /> {t("newRequest")}
              </Button>
            )}
          </div>
        )}
      </section>

      {/* Create / edit */}
      <RequestSheet
        open={sheetRow !== undefined}
        row={sheetRow ?? null}
        saving={saving}
        errors={fieldErrors}
        onClose={() => setSheetRow(undefined)}
        onSubmit={(values) => void submitSheet(values)}
        onDelete={sheetRow ? () => setToDelete(sheetRow) : undefined}
      />

      {/* Delete confirmation */}
      <AlertDialog
        open={toDelete !== null}
        onOpenChange={(open) => !open && !deleting && setToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("deleteTitle")}</AlertDialogTitle>
            <AlertDialogDescription>
              {toDelete
                ? t("deleteDesc", {
                    name: toDelete.fullName,
                    company: toDelete.companyName,
                  })
                : ""}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>
              {t("cancel")}
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={deleting}
              onClick={(event) => {
                event.preventDefault();
                void confirmDelete();
              }}
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              {deleting ? t("deleting") : t("delete")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
