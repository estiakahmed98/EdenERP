"use client";

import { useCallback, useEffect, useState, type FormEvent, type ReactNode } from "react";
import { useFormatter, useTranslations } from "next-intl";
import { CheckCircle2, Loader2, Mail, MessageCircle, Plus, QrCode, RefreshCw, RotateCcw, ServerOff, Smartphone, Trash2, TriangleAlert, Unlink } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { NotificationOverview } from "@/lib/demo-notifications/settings";

type Channel = "EMAIL" | "WHATSAPP";
const STATUSES = ["PENDING", "PROCESSING", "SENT", "FAILED"] as const;
const statusTone: Record<string, string> = {
  PENDING: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  PROCESSING: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
  SENT: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  FAILED: "bg-destructive/10 text-destructive",
};

async function call(url: string, method: string, body?: unknown) {
  const response = await fetch(url, {
    method, cache: "no-store",
    ...(body === undefined ? {} : { headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }),
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.error || (response.status === 429 ? "rateLimit" : "server"));
  return result;
}

export default function NotificationSettings() {
  const t = useTranslations("admin.notifications");
  const format = useFormatter();
  const [data, setData] = useState<NotificationOverview | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState<string | null>(null);
  const [revision, setRevision] = useState(0);

  const errorText = useCallback((code: string) => t(t.has(`errors.${code}`) ? `errors.${code}` : "errors.server"), [t]);

  const load = useCallback(async (signal?: AbortSignal) => {
    try {
      const response = await fetch("/api/admin/notifications", { cache: "no-store", signal });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "server");
      if (!signal?.aborted) { setData(result); setError(""); }
    } catch (err) {
      if (!signal?.aborted) setError(err instanceof Error ? err.message : "server");
    }
  }, []);

  const state = data?.worker.online ? data.worker.state : "offline";
  const waiting = state === "qr" || state === "starting" || !!data?.worker.pendingCommand;

  // Poll quickly only while a QR is shown or a session is starting; otherwise
  // slowly. Never poll a hidden tab — resume with a fresh load when it is shown.
  useEffect(() => {
    const controller = new AbortController();
    let timer: ReturnType<typeof setTimeout> | undefined;
    const schedule = () => {
      clearTimeout(timer);
      if (controller.signal.aborted || document.hidden) return;
      timer = setTimeout(tick, waiting ? 3_000 : 30_000);
    };
    const tick = async () => {
      await load(controller.signal);
      schedule();
    };
    const onVisibility = () => { if (!document.hidden) void tick(); else clearTimeout(timer); };
    document.addEventListener("visibilitychange", onVisibility);
    void tick();
    return () => { controller.abort(); clearTimeout(timer); document.removeEventListener("visibilitychange", onVisibility); };
  }, [load, waiting, revision]);

  async function run(key: string, action: () => Promise<void>) {
    if (busy) return;
    setBusy(key);
    try { await action(); await load(); }
    catch (err) { toast.error(errorText(err instanceof Error ? err.message : "server")); }
    finally { setBusy(null); }
  }

  const logout = () => run("logout", async () => {
    await call("/api/admin/notifications", "POST", { action: "logout" });
    toast.success(t("whatsapp.logoutRequested"));
  });
  const retryFailed = () => run("retry", async () => {
    const result = await call("/api/admin/notifications", "POST", { action: "retryFailed" });
    toast.success(t("delivery.retried", { count: result.retried ?? 0 }));
  });

  if (!data) {
    return (
      <div className="mx-auto space-y-6 p-4 md:p-8">
        <Header />
        {error ? (
          <div role="alert" className="space-y-3 rounded-xl border bg-card p-8 text-center">
            <p className="text-destructive">{errorText(error)}</p>
            <Button variant="outline" onClick={() => setRevision((v) => v + 1)}>{t("retry")}</Button>
          </div>
        ) : (
          <div role="status" className="flex min-h-72 items-center justify-center gap-2 text-sm text-muted-foreground"><Loader2 className="size-5 animate-spin" aria-hidden="true" />{t("loading")}</div>
        )}
      </div>
    );
  }

  const { worker } = data;
  const count = (channel: Channel, status: string) => data.counts.find((row) => row.channel === channel && row.status === status)?.count ?? 0;
  const failed = count("EMAIL", "FAILED") + count("WHATSAPP", "FAILED");
  const phone = (digits: string) => `+${digits}`;

  return (
    <div className="mx-auto space-y-6 p-4 md:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <Header />
        <Button variant="outline" size="sm" onClick={() => setRevision((v) => v + 1)}><RefreshCw aria-hidden="true" />{t("refresh")}</Button>
      </div>

      {!data.enabled && (
        <div role="alert" className="flex items-start gap-3 rounded-xl border border-amber-500/40 bg-amber-500/10 p-4 text-sm text-amber-800 dark:text-amber-300">
          <TriangleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          <p>{t.rich("disabled", { code: (chunks) => <code className="rounded bg-background/60 px-1 font-mono text-xs" dir="ltr">{chunks}</code> })}</p>
        </div>
      )}
      {error && <p role="alert" className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{errorText(error)}</p>}

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        {/* WhatsApp connection */}
        <section aria-labelledby="whatsapp-title" className="overflow-hidden rounded-xl border bg-card shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b p-4">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600"><MessageCircle className="size-5" aria-hidden="true" /></span>
              <div><h2 id="whatsapp-title" className="font-semibold">{t("whatsapp.title")}</h2><p className="mt-0.5 text-xs text-muted-foreground">{t("whatsapp.hint")}</p></div>
            </div>
            <StatusPill state={state} label={t(`whatsapp.status.${state}`)} />
          </div>

          <div className="p-5" aria-live="polite">
            {state === "offline" && (
              <Notice icon={ServerOff} title={t("whatsapp.status.offline")}>
                {t.rich("whatsapp.offlineHint", { code: (chunks) => <code className="rounded bg-muted px-1 font-mono text-xs" dir="ltr">{chunks}</code> })}
              </Notice>
            )}
            {(state === "starting" || state === "disconnected" || (state === "qr" && !worker.qr)) && (
              <div className="flex min-h-56 flex-col items-center justify-center gap-3 text-center text-sm text-muted-foreground">
                <Loader2 className="size-6 animate-spin" aria-hidden="true" />{t("whatsapp.startingHint")}
              </div>
            )}
            {state === "error" && <Notice icon={TriangleAlert} title={t("whatsapp.status.error")}>{t("whatsapp.errorHint")}</Notice>}
            {state === "qr" && worker.qr && (
              <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start">
                {/* eslint-disable-next-line @next/next/no-img-element -- data URL generated by the worker */}
                <img src={worker.qr} alt={t("whatsapp.qrAlt")} width={220} height={220} className="size-56 shrink-0 rounded-lg border bg-white p-2" />
                <div className="space-y-3 text-sm">
                  <h3 className="flex items-center gap-2 font-semibold"><QrCode className="size-4" aria-hidden="true" />{t("whatsapp.scanTitle")}</h3>
                  <ol className="list-decimal space-y-1.5 ps-5 text-muted-foreground">
                    <li>{t("whatsapp.step1")}</li><li>{t("whatsapp.step2")}</li><li>{t("whatsapp.step3")}</li>
                  </ol>
                  <p className="text-xs text-muted-foreground">{t("whatsapp.qrRefresh")}</p>
                </div>
              </div>
            )}
            {state === "ready" && (
              <div className="flex items-center gap-4 rounded-lg bg-emerald-500/10 p-4">
                <CheckCircle2 className="size-8 shrink-0 text-emerald-600" aria-hidden="true" />
                <div className="min-w-0">
                  <p className="font-medium">{t("whatsapp.readyTitle")}</p>
                  {worker.account && <p className="mt-0.5 flex items-center gap-1.5 text-sm text-muted-foreground"><Smartphone className="size-3.5" aria-hidden="true" />{t("whatsapp.connectedAs")} <span dir="ltr" className="font-medium text-foreground">{phone(worker.account)}</span></p>}
                </div>
              </div>
            )}
          </div>

          {worker.online && state !== "starting" && (
            <div className="flex flex-wrap items-center justify-between gap-3 border-t bg-muted/20 px-5 py-3">
              <p className="text-xs text-muted-foreground">{t(state === "ready" ? "whatsapp.logoutHint" : "whatsapp.restartHint")}</p>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm" disabled={!!busy || !!worker.pendingCommand}>
                    {busy === "logout" || worker.pendingCommand ? <Loader2 className="animate-spin" aria-hidden="true" /> : state === "ready" ? <Unlink aria-hidden="true" /> : <RotateCcw aria-hidden="true" />}
                    {t(state === "ready" ? "whatsapp.logout" : "whatsapp.restart")}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>{t(state === "ready" ? "whatsapp.logout" : "whatsapp.restart")}</AlertDialogTitle>
                    <AlertDialogDescription>{t(state === "ready" ? "whatsapp.logoutConfirm" : "whatsapp.restartConfirm")}</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
                    <AlertDialogAction onClick={logout}>{t("confirm")}</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </section>

        {/* Delivery */}
        <section aria-labelledby="delivery-title" className="overflow-hidden rounded-xl border bg-card shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b p-4">
            <div><h2 id="delivery-title" className="font-semibold">{t("delivery.title")}</h2><p className="mt-0.5 text-xs text-muted-foreground">{t("delivery.hint")}</p></div>
            <Button variant="outline" size="sm" disabled={!!busy || failed === 0} onClick={retryFailed}>
              {busy === "retry" ? <Loader2 className="animate-spin" aria-hidden="true" /> : <RotateCcw aria-hidden="true" />}{t("delivery.retryFailed")}
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-3 border-b p-4">
            {(["WHATSAPP", "EMAIL"] as const).map((channel) => (
              <div key={channel} className="rounded-lg border p-3">
                <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">{channel === "EMAIL" ? <Mail className="size-3.5" aria-hidden="true" /> : <MessageCircle className="size-3.5" aria-hidden="true" />}{t(`delivery.channel.${channel}`)}</p>
                <dl className="mt-2 grid grid-cols-2 gap-x-2 gap-y-1 text-xs">
                  {STATUSES.map((status) => (
                    <div key={status} className="flex items-center justify-between gap-1"><dt className="text-muted-foreground">{t(`delivery.status.${status}`)}</dt><dd className="font-semibold tabular-nums">{format.number(count(channel, status))}</dd></div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
          {data.recent.length === 0 ? (
            <p className="p-6 text-center text-sm text-muted-foreground">{t("delivery.empty")}</p>
          ) : (
            <ul className="max-h-80 divide-y overflow-y-auto">
              {data.recent.map((job) => (
                <li key={job.id} className="flex items-center gap-3 px-4 py-2.5 text-xs">
                  {job.channel === "EMAIL" ? <Mail className="size-4 shrink-0 text-muted-foreground" aria-label={t("delivery.channel.EMAIL")} /> : <MessageCircle className="size-4 shrink-0 text-muted-foreground" aria-label={t("delivery.channel.WHATSAPP")} />}
                  <span className="min-w-0 flex-1 truncate" dir="ltr">{job.channel === "WHATSAPP" ? phone(job.recipient) : job.recipient}</span>
                  <span className="hidden text-muted-foreground sm:inline">{format.dateTime(new Date(job.sentAt ?? job.createdAt), { dateStyle: "short", timeStyle: "short" })}</span>
                  <span className={`rounded-full px-2 py-0.5 font-medium ${statusTone[job.status] ?? ""}`} title={job.lastError ?? undefined}>{t(`delivery.status.${job.status}`)}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <RecipientList channel="WHATSAPP" data={data} busy={busy} run={run} />
        <RecipientList channel="EMAIL" data={data} busy={busy} run={run} />
      </div>
      <p className="text-xs text-muted-foreground">{t("recipients.appliesNew")}</p>
    </div>
  );
}

function Header() {
  const t = useTranslations("admin.notifications");
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">{t("eyebrow")}</p>
      <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{t("title")}</h1>
      <p className="mt-2 max-w-xl text-sm text-muted-foreground">{t("description")}</p>
    </div>
  );
}

function StatusPill({ state, label }: { state: string; label: string }) {
  const tone = state === "ready" ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
    : state === "qr" ? "bg-blue-500/10 text-blue-700 dark:text-blue-400"
    : state === "error" || state === "offline" ? "bg-destructive/10 text-destructive"
    : "bg-muted text-muted-foreground";
  const dot = state === "ready" ? "bg-emerald-500" : state === "qr" ? "bg-blue-500 animate-pulse" : state === "error" || state === "offline" ? "bg-destructive" : "bg-muted-foreground animate-pulse";
  return <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${tone}`}><span className={`size-1.5 rounded-full ${dot}`} />{label}</span>;
}

function Notice({ icon: Icon, title, children }: { icon: typeof ServerOff; title: string; children: ReactNode }) {
  return (
    <div className="flex min-h-56 flex-col items-center justify-center gap-3 text-center">
      <Icon className="size-8 text-muted-foreground/60" aria-hidden="true" />
      <p className="font-medium">{title}</p>
      <p className="max-w-sm text-sm text-muted-foreground">{children}</p>
    </div>
  );
}

function RecipientList({ channel, data, busy, run }: {
  channel: Channel; data: NotificationOverview; busy: string | null;
  run: (key: string, action: () => Promise<void>) => Promise<void>;
}) {
  const t = useTranslations("admin.notifications");
  const [value, setValue] = useState("");
  const prefix = channel === "WHATSAPP" ? "whatsapp" : "email";
  const items = data.recipients.filter((row) => row.channel === channel);
  const display = (recipient: string) => channel === "WHATSAPP" ? `+${recipient}` : recipient;
  const Icon = channel === "WHATSAPP" ? MessageCircle : Mail;

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!value.trim()) return;
    void run(`add-${channel}`, async () => {
      await call("/api/admin/notifications/recipients", "POST", { channel, recipient: value });
      setValue("");
      toast.success(t("recipients.added"));
    });
  }

  return (
    <section aria-labelledby={`${prefix}-recipients`} className="overflow-hidden rounded-xl border bg-card shadow-sm">
      <div className="border-b p-4">
        <h2 id={`${prefix}-recipients`} className="flex items-center gap-2 font-semibold"><Icon className="size-4 text-primary" aria-hidden="true" />{t(`recipients.${prefix}Title`)}<span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium tabular-nums text-muted-foreground">{items.length}</span></h2>
        <p className="mt-1 text-xs text-muted-foreground">{t(`recipients.${prefix}Hint`)}</p>
      </div>
      <form onSubmit={submit} className="flex gap-2 border-b bg-muted/20 p-4">
        <Input
          className="h-10" dir="ltr" value={value} maxLength={254}
          type={channel === "EMAIL" ? "email" : "tel"} inputMode={channel === "EMAIL" ? "email" : "tel"}
          aria-label={t(`recipients.${prefix}Placeholder`)} placeholder={t(`recipients.${prefix}Placeholder`)}
          onChange={(event) => setValue(event.target.value)}
        />
        <Button type="submit" disabled={!!busy || !value.trim()}>{busy === `add-${channel}` ? <Loader2 className="animate-spin" aria-hidden="true" /> : <Plus aria-hidden="true" />}{t("recipients.add")}</Button>
      </form>
      {items.length === 0 ? (
        <p className="p-6 text-center text-sm text-muted-foreground">{t("recipients.empty")}</p>
      ) : (
        <ul className="divide-y">
          {items.map((row) => (
            <li key={row.id} className="flex items-center gap-3 px-4 py-2.5">
              <span className="min-w-0 flex-1 truncate text-sm" dir="ltr">{display(row.recipient)}</span>
              <Button
                size="icon" variant="ghost" className="size-8 text-muted-foreground hover:text-destructive"
                disabled={!!busy} aria-label={t("recipients.remove", { recipient: display(row.recipient) })}
                onClick={() => run(`remove-${row.id}`, async () => {
                  await call("/api/admin/notifications/recipients", "DELETE", { id: row.id });
                  toast.success(t("recipients.removed"));
                })}
              >
                {busy === `remove-${row.id}` ? <Loader2 className="animate-spin" aria-hidden="true" /> : <Trash2 aria-hidden="true" />}
              </Button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
