"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  Globe,
  Inbox,
  Loader2,
  Mail,
  MessagesSquare,
  Monitor,
  PanelRight,
  Phone,
  RotateCcw,
  Search,
  User,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import {
  newClientId,
  applyReaction,
  type AdminConversationDTO,
  type ChatMessageDTO,
  type ChatServerEvent,
} from "@/lib/chat/shared";
import {
  applyReceipt,
  upsertMessage,
  useChatSocket,
  useRemoteTyping,
  useTypingEmitter,
} from "@/hooks/use-chat-socket";
import { MessageReactions } from "./message-reactions";
import { ChatComposer, ChatMessageImage } from "./chat-composer";
import { MessageStatus, TypingDots, deliveryState } from "./message-status";

type Filter = "OPEN" | "CLOSED" | "ALL";
type LocalMessage = ChatMessageDTO & { failed?: boolean };

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "?") + (parts[1]?.[0] ?? "")).toUpperCase();
}

/** Admin live-chat inbox: every conversation, live presence, typing and receipts. */
export default function AdminChat() {
  const t = useTranslations("admin.chat");
  const locale = useLocale();

  const [filter, setFilter] = useState<Filter>("OPEN");
  const [query, setQuery] = useState("");
  const [conversations, setConversations] = useState<AdminConversationDTO[]>([]);
  const [listLoading, setListLoading] = useState(true);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [messages, setMessages] = useState<LocalMessage[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [threadLoading, setThreadLoading] = useState(false);
  const [online, setOnline] = useState<Set<string>>(new Set());
  const { typing, update: setTyping } = useRemoteTyping();
  const activeRef = useRef<string | null>(null);
  activeRef.current = activeId;

  // ---------------------------------------------------------------- loading
  const loadList = useCallback(async () => {
    setListLoading(true);
    try {
      const params = new URLSearchParams({ status: filter });
      if (query.trim()) params.set("q", query.trim());
      const res = await fetch(`/api/admin/chat/conversations?${params}`, { cache: "no-store" });
      if (!res.ok) throw new Error(String(res.status));
      const data = await res.json();
      setConversations(data.conversations);
    } catch {
      toast.error(t("loadFailed"));
    } finally {
      setListLoading(false);
    }
  }, [filter, query, t]);

  useEffect(() => {
    const id = setTimeout(loadList, query ? 300 : 0);
    return () => clearTimeout(id);
  }, [loadList, query]);

  const openThread = useCallback(
    async (id: string) => {
      setDetailsOpen(false);
      setActiveId(id);
      setMessages([]);
      setThreadLoading(true);
      try {
        const res = await fetch(`/api/admin/chat/conversations/${id}`, { cache: "no-store" });
        if (!res.ok) throw new Error(String(res.status));
        const data = await res.json();
        if (activeRef.current !== id) return;
        setMessages(data.messages);
        setHasMore(data.hasMore);
        setConversations((list) => mergeConversation(list, data.conversation));
      } catch {
        toast.error(t("loadFailed"));
      } finally {
        setThreadLoading(false);
      }
    },
    [t],
  );

  const loadOlder = async () => {
    if (!activeId || !messages[0]) return;
    const res = await fetch(
      `/api/admin/chat/conversations/${activeId}?before=${encodeURIComponent(messages[0].createdAt)}`,
      { cache: "no-store" },
    );
    if (!res.ok) return;
    const data = await res.json();
    setMessages((list) => (data.messages as ChatMessageDTO[]).reduce(upsertMessage, list));
    setHasMore(data.hasMore);
  };

  // ----------------------------------------------------------------- socket
  const onEvent = useCallback(
    (e: ChatServerEvent) => {
      switch (e.t) {
        case "hello":
          if (e.role === "admin") setOnline(new Set(e.online));
          break;
        case "message":
          if (e.conversation) setConversations((list) => mergeConversation(list, e.conversation!));
          if (e.message.conversationId === activeRef.current) {
            setMessages((list) => upsertMessage(list, e.message));
          } else if (e.message.senderType === "VISITOR") {
            toast(e.conversation?.visitorName ?? t("newMessage"), {
              description: e.message.body.slice(0, 120),
              action: { label: t("open"), onClick: () => void openThread(e.message.conversationId) },
            });
          }
          if (e.message.senderType === "VISITOR") setTyping(e.message.conversationId, false);
          break;
        case "reaction":
          setMessages((list) => applyReaction(list, e.message));
          break;
        case "receipt":
          if (e.conversationId === activeRef.current) setMessages((list) => applyReceipt(list, e));
          break;
        case "typing":
          setTyping(e.from === "VISITOR" ? e.conversationId : `admin:${e.conversationId}`, e.typing, e.name);
          break;
        case "presence":
          setOnline((s) => {
            const next = new Set(s);
            if (e.online) next.add(e.conversationId);
            else next.delete(e.conversationId);
            return next;
          });
          setConversations((list) =>
            list.map((c) =>
              c.id === e.conversationId
                ? { ...c, online: e.online, visitorLastSeenAt: e.lastSeenAt, currentPath: e.currentPath }
                : c,
            ),
          );
          break;
        case "conversation":
          if ("unreadCount" in e.conversation)
            setConversations((list) => mergeConversation(list, e.conversation as AdminConversationDTO));
          break;
        case "error":
          if (e.clientId) {
            setMessages((list) => list.map((m) => (m.clientId === e.clientId ? { ...m, failed: true } : m)));
          }
          toast.error(t(`errors.${e.code === "RATE_LIMITED" || e.code === "TOO_LONG" ? e.code : "generic"}`));
          break;
      }
    },
    [openThread, setTyping, t],
  );

  const { status, send, reactionActor } = useChatSocket({ enabled: true, admin: true, onEvent });
  const typingEmitter = useTypingEmitter(send, activeId ?? undefined);

  const active = conversations.find((c) => c.id === activeId) ?? null;
  const isOnline = (c: AdminConversationDTO) => online.has(c.id) || (status !== "open" && c.online);

  // Read receipts: everything in the open thread is read while the tab is visible.
  const activeUnread = active?.unreadCount ?? 0;
  const visitorUnreadInThread = messages.some((m) => m.senderType === "VISITOR" && !m.readAt);
  useEffect(() => {
    if (!activeId || status !== "open" || (!activeUnread && !visitorUnreadInThread)) return;
    const markRead = () => document.visibilityState === "visible" && send({ t: "read", conversationId: activeId });
    markRead();
    document.addEventListener("visibilitychange", markRead);
    return () => document.removeEventListener("visibilitychange", markRead);
  }, [activeId, status, activeUnread, visitorUnreadInThread, send]);

  // Unread total in the tab title.
  const totalUnread = useMemo(() => conversations.reduce((n, c) => n + c.unreadCount, 0), [conversations]);
  useEffect(() => {
    const base = document.title.replace(/^\(\d+\+?\)\s*/, "");
    document.title = totalUnread ? `(${totalUnread > 99 ? "99+" : totalUnread}) ${base}` : base;
  }, [totalUnread]);

  const listRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages.length, activeId, typing]);

  // ---------------------------------------------------------------- actions
  const sendText = (body: string) => {
    const text = body.trim();
    if (!text || !activeId) return;
    const clientId = newClientId();
    setMessages((list) =>
      upsertMessage(list, {
        id: `local-${clientId}`,
        conversationId: activeId,
        senderType: "ADMIN",
        senderName: null,
        body: text,
        clientId,
        createdAt: new Date().toISOString(),
        deliveredAt: null,
        readAt: null,
      }),
    );
    typingEmitter.stop();
    send({ t: "send", clientId, body: text, conversationId: activeId });
  };

  const toggleStatus = () => {
    if (!active) return;
    send({ t: "status", conversationId: active.id, status: active.status === "OPEN" ? "CLOSED" : "OPEN" });
  };

  const visible = conversations.filter((c) => filter === "ALL" || c.status === filter);
  const fmtTime = (iso: string | null) => {
    if (!iso) return "";
    const d = new Date(iso);
    const sameDay = d.toDateString() === new Date().toDateString();
    return sameDay
      ? d.toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit" })
      : d.toLocaleDateString(locale, { day: "numeric", month: "short" });
  };
  const fmtFull = (iso: string | null) =>
    iso ? new Date(iso).toLocaleString(locale, { dateStyle: "medium", timeStyle: "short" }) : "—";

  return (
    <div className="flex h-[calc(100dvh-4rem)] min-h-[580px] flex-col gap-5 p-3 [--primary:#1088ef] [--secondary:#003180] sm:p-5 lg:p-6">
      <div className="flex shrink-0 items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="btn-gradient flex size-12 shrink-0 items-center justify-center rounded-2xl shadow-sm">
            <MessagesSquare className="size-6" />
          </span>
          <div>
            <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">{t("title")}</h1>
            <p className="mt-1 hidden text-sm text-muted-foreground sm:block">{t("subtitle")}</p>
          </div>
        </div>
        <span
          className={cn(
            "inline-flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-medium",
            status === "open" ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400" : "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-400",
          )}
        >
          <span className={cn("size-2 rounded-full", status === "open" ? "bg-emerald-500" : "animate-pulse bg-amber-500")} />
          {status === "open" ? t("connected") : t("connecting")}
        </span>
      </div>

      <div className={cn(
        "relative grid min-h-0 flex-1 overflow-hidden rounded-2xl border border-border bg-card shadow-[0_8px_40px_-16px_rgba(20,35,59,0.18)] lg:grid-cols-[280px_minmax(0,1fr)] 2xl:grid-cols-[320px_minmax(0,1fr)]",
        active && "xl:grid-cols-[280px_minmax(0,1fr)_260px] 2xl:grid-cols-[320px_minmax(0,1fr)_290px]",
      )}>
        {/* ------------------------------------------------ conversation list */}
        <aside className={cn("flex min-h-0 min-w-0 flex-col border-e border-border", activeId && "hidden lg:flex")}>
          <div className="space-y-4 border-b border-border p-4">
            <div className="flex items-center justify-between gap-2">
              <h2 className="flex items-center gap-2 text-sm font-semibold"><Inbox className="size-4 text-primary" />{t(`filters.${filter}`)}</h2>
              <span className="rounded-md bg-muted/60 px-2 py-0.5 text-xs font-medium tabular-nums text-muted-foreground">{visible.length}</span>
            </div>
            <div className="relative">
              <Search className="pointer-events-none absolute start-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("search")}
                aria-label={t("search")}
                title={t("search")}
                className="h-10 rounded-xl border-border/70 bg-muted/25 ps-8 text-xs shadow-none"
              />
            </div>
            <div className="flex gap-1 rounded-xl bg-muted/45 p-1 text-xs">
              {(["OPEN", "CLOSED", "ALL"] as const).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  aria-pressed={filter === f}
                  className={cn(
                    "flex-1 rounded-lg px-2 py-2 font-medium transition focus-visible:outline-2 focus-visible:outline-primary",
                    filter === f ? "btn-gradient text-white shadow-sm" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {t(`filters.${f}`)}
                </button>
              ))}
            </div>
          </div>
          <div className="min-h-0 flex-1 space-y-1 overflow-y-auto p-2">
            {listLoading && conversations.length === 0 ? (
              <div className="flex justify-center p-8">
                <Loader2 className="size-5 animate-spin text-muted-foreground" />
              </div>
            ) : visible.length === 0 ? (
              <div className="flex flex-col items-center gap-2 p-10 text-center text-sm text-muted-foreground">
                <Inbox className="size-8" />
                {t("empty")}
              </div>
            ) : (
              visible.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => void openThread(c.id)}
                  aria-current={c.id === activeId ? "true" : undefined}
                  className={cn(
                    "relative flex w-full items-start gap-3 rounded-xl border border-transparent px-3 py-4 text-start transition focus-visible:outline-2 focus-visible:outline-primary",
                    c.id === activeId ? "border-primary/20 bg-primary/10 shadow-xs" : "hover:bg-primary/5",
                  )}
                >
                  <span className="relative shrink-0">
                    <span className={cn("flex size-10 items-center justify-center rounded-2xl text-sm font-semibold", c.id === activeId ? "bg-primary text-white" : "bg-primary/10 text-primary")}>
                      {initials(c.visitorName)}
                    </span>
                    <span
                      className={cn(
                        "absolute -bottom-0.5 -end-0.5 size-3 rounded-full border-2 border-card",
                        isOnline(c) ? "bg-emerald-500" : "bg-zinc-400",
                      )}
                    />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between gap-2">
                      <span className={cn("truncate text-[13px]", c.unreadCount || c.id === activeId ? "font-semibold" : "font-medium")}>
                        {c.visitorName}
                      </span>
                      <span className="shrink-0 text-[11px] text-muted-foreground">{fmtTime(c.lastMessageAt ?? c.createdAt)}</span>
                    </span>
                    <span className="mt-1.5 flex items-center justify-between gap-2">
                      <span className="truncate text-xs text-muted-foreground">
                        {typing[c.id] ? (
                          <span className="inline-flex items-center gap-1 text-primary">
                            <TypingDots /> {t("typingShort")}
                          </span>
                        ) : (
                          (c.lastMessagePreview ?? t("noMessages"))
                        )}
                      </span>
                      {c.unreadCount > 0 && (
                        <span className="flex min-w-5 shrink-0 items-center justify-center rounded-full bg-primary px-1.5 text-[11px] font-bold text-white">
                          {c.unreadCount}
                        </span>
                      )}
                    </span>
                  </span>
                </button>
              ))
            )}
          </div>
        </aside>

        {/* ------------------------------------------------------- thread */}
        <section className={cn("flex min-h-0 min-w-0 flex-col", !activeId && "hidden lg:flex")}>
          {!active ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-5 bg-[#f0f5fa] p-8 text-center dark:bg-muted/20">
              <div className="flex size-24 items-center justify-center rounded-[2rem] border border-primary/10 bg-primary/5 text-primary shadow-[0_0_0_12px_color-mix(in_srgb,var(--primary)_3%,transparent)]">
                <MessagesSquare className="size-10" strokeWidth={1.5} />
              </div>
              <div className="space-y-2">
                <p className="font-semibold">{t("title")}</p>
                <p className="max-w-64 text-sm leading-relaxed text-muted-foreground">{t("pick")}</p>
              </div>
            </div>
          ) : (
            <>
              <header className="flex min-h-20 shrink-0 items-center gap-2 border-b border-primary bg-[linear-gradient(100deg,#1088ef,#003180)] px-3 py-3 text-white sm:gap-3 sm:px-5">
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/15 hover:text-white lg:hidden" onClick={() => setActiveId(null)} aria-label={t("back")}>
                  <ArrowLeft className="size-4 rtl:-scale-x-100" />
                </Button>
                <span className="relative hidden shrink-0 sm:block">
                  <span className="flex size-10 items-center justify-center rounded-2xl border border-white/20 bg-white/15 text-sm font-semibold text-white">{initials(active.visitorName)}</span>
                  <span className={cn("absolute -bottom-0.5 -end-0.5 size-3 rounded-full border-2 border-primary", isOnline(active) ? "bg-emerald-400" : "bg-zinc-300")} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{active.visitorName}</p>
                  <p className="mt-1 truncate text-[11px] text-white/80">
                    {typing[active.id] ? (
                      <span className="text-white/90">{t("typingShort")}</span>
                    ) : isOnline(active) ? (
                      <span className="text-white/90">
                        {t("onlineOn", { path: active.currentPath ?? "/" })}
                      </span>
                    ) : (
                      t("lastSeen", { time: fmtFull(active.visitorLastSeenAt) })
                    )}
                  </p>
                </div>
                <Button className="h-9 rounded-xl border-white/30 bg-white/10 text-xs text-white shadow-none hover:bg-white/20 hover:text-white dark:border-white/30 dark:bg-white/10 dark:hover:bg-white/20" variant="outline" size="sm" onClick={toggleStatus} disabled={status !== "open"}>
                  {active.status === "OPEN" ? <CheckCircle2 className="size-4" /> : <RotateCcw className="size-4" />}
                  {active.status === "OPEN" ? t("close") : t("reopen")}
                </Button>
                <Sheet open={detailsOpen} onOpenChange={setDetailsOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="shrink-0 rounded-xl text-white hover:bg-white/15 hover:text-white xl:hidden" aria-label={t("details.title")}>
                      <PanelRight className="size-4" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side={locale === "ar" ? "left" : "right"} aria-describedby={undefined} className="gap-0 overflow-y-auto bg-card [--primary:#1088ef] [--secondary:#003180]" dir={locale === "ar" ? "rtl" : "ltr"}>
                    <div className="flex h-20 shrink-0 items-center border-b border-border px-5">
                      <SheetTitle className="text-sm">{t("details.title")}</SheetTitle>
                    </div>
                    <VisitorDetails conversation={active} online={isOnline(active)} fmtFull={fmtFull} />
                  </SheetContent>
                </Sheet>
              </header>

              <div ref={listRef} role="log" aria-label={active.visitorName} aria-busy={threadLoading} className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain bg-[#f0f5fa] px-4 py-6 dark:bg-muted/20 sm:px-6">
                {threadLoading && (
                  <div className="flex justify-center p-6">
                    <Loader2 className="size-5 animate-spin text-muted-foreground" />
                  </div>
                )}
                {hasMore && (
                  <button type="button" onClick={loadOlder} className="mx-auto block text-xs text-primary hover:underline">
                    {t("loadOlder")}
                  </button>
                )}
                {messages.map((m, index) => {
                  const mine = m.senderType === "ADMIN";
                  const state = deliveryState(m);
                  const date = new Date(m.createdAt);
                  const previous = messages[index - 1];
                  const showDate = !previous || new Date(previous.createdAt).toDateString() !== date.toDateString();
                  return (
                    <div key={m.id}>
                      {showDate && (
                        <div className="mb-6 flex items-center justify-center gap-3" aria-hidden="true">
                          <span className="h-px w-10 bg-border" />
                          <time dateTime={m.createdAt} className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{date.toLocaleDateString(locale, { day: "numeric", month: "short", year: "numeric" })}</time>
                          <span className="h-px w-10 bg-border" />
                        </div>
                      )}
                      <div className={cn("flex items-end gap-2", mine ? "justify-end" : "justify-start")}>
                        {!mine && <span aria-hidden="true" className="flex size-7 shrink-0 items-center justify-center rounded-full border border-border bg-card text-[9px] font-semibold text-muted-foreground">{initials(active.visitorName)}</span>}
                        <div
                          className={cn(
                            "min-w-20 max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-xs sm:max-w-[75%]",
                            mine
                              ? "rounded-ee-md bg-[linear-gradient(100deg,#1088ef,#003180)] text-white"
                              : "rounded-es-md border border-border/70 bg-card",
                          )}
                        >
                          {mine && m.senderName && <p className="mb-0.5 text-[11px] font-semibold opacity-80">{m.senderName}</p>}
                          {m.imageId && <ChatMessageImage imageId={m.imageId} label={t("composer.attachedImage")} />}
                          {m.body && <p className="whitespace-pre-wrap [overflow-wrap:anywhere]">{m.body}</p>}
                          <div
                            className={cn(
                              "mt-1.5 flex items-center justify-end gap-1 text-[10px]",
                              mine ? "text-white/75" : "text-muted-foreground",
                            )}
                          >
                            <time dateTime={m.createdAt} title={fmtFull(m.createdAt)}>
                              {fmtTime(m.createdAt)}
                            </time>
                            {mine && (
                              <MessageStatus
                                state={state}
                                label={`${t(`status.${state}`)}${m.readAt ? ` · ${fmtFull(m.readAt)}` : ""}`}
                              />
                            )}
                          </div>
                          <MessageReactions message={m} actor={reactionActor} mine={mine} enabled={status === "open"} admin onUpdate={(message) => setMessages((list) => applyReaction(list, message))} />
                          {m.failed && (
                            <button
                              type="button"
                              className="mt-1 text-[11px] font-medium underline"
                              onClick={() => {
                                setMessages((list) => list.filter((x) => x.clientId !== m.clientId));
                                sendText(m.body);
                              }}
                            >
                              {t("retry")}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
                {typing[active.id] && (
                  <div role="status" className="flex w-fit items-center gap-2 rounded-2xl rounded-es-sm border border-border bg-card px-3 py-2 text-xs text-muted-foreground">
                    <TypingDots /> {t("typing", { name: active.visitorName })}
                  </div>
                )}
                {typing[`admin:${active.id}`] && (
                  <div className="flex items-center justify-end gap-2 text-xs text-muted-foreground">
                    <TypingDots />
                    {t("colleagueTyping", {
                      name: typeof typing[`admin:${active.id}`] === "string" ? String(typing[`admin:${active.id}`]) : "",
                    })}
                  </div>
                )}
              </div>

              <ChatComposer
                key={active.id}
                admin
                onStopTyping={typingEmitter.stop}
                onSend={sendText}
                onTyping={typingEmitter.ping}
                placeholder={active.status === "CLOSED" ? t("placeholderClosed") : t("placeholder")}
                sendLabel={t("send")}
              />
            </>
          )}
        </section>

        {/* ------------------------------------------------------ details */}
        {active && (
          <aside className="hidden min-h-0 overflow-y-auto border-s border-border bg-card text-sm xl:block">
            <div className="flex h-20 items-center border-b border-border px-5">
              <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground"><User className="size-4" />{t("details.title")}</h2>
            </div>
            <VisitorDetails conversation={active} online={isOnline(active)} fmtFull={fmtFull} />
          </aside>
        )}
      </div>
    </div>
  );
}

function mergeConversation(list: AdminConversationDTO[], c: AdminConversationDTO) {
  const rest = list.filter((x) => x.id !== c.id);
  return [c, ...rest].sort((a, b) =>
    (b.lastMessageAt ?? b.createdAt).localeCompare(a.lastMessageAt ?? a.createdAt),
  );
}

function VisitorDetails({ conversation, online, fmtFull }: {
  conversation: AdminConversationDTO;
  online: boolean;
  fmtFull: (iso: string | null) => string;
}) {
  const t = useTranslations("admin.chat");
  return (
    <>
      <div className="border-b border-border px-5 py-6 text-center">
        <span className="mx-auto flex size-16 items-center justify-center rounded-3xl border border-primary/10 bg-primary/10 text-xl font-semibold text-primary">{initials(conversation.visitorName)}</span>
        <h3 className="mt-3 break-words font-semibold">{conversation.visitorName}</h3>
        <p className="mt-1 text-xs text-muted-foreground">{conversation.userId ? t("details.registered") : t("details.guest")}</p>
        <span className={cn("mt-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-medium", conversation.status === "OPEN" ? "bg-primary/10 text-primary" : "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400")}><span className={cn("size-1.5 rounded-full", conversation.status === "OPEN" ? "bg-primary" : "bg-emerald-500")} />{t(`filters.${conversation.status}`)}</span>
      </div>
      <dl className="space-y-4 border-b border-border p-5">
        <Detail
          icon={Mail}
          label={t("details.email")}
          value={conversation.visitorEmail ? <a className="text-primary hover:underline" href={`mailto:${conversation.visitorEmail}`}>{conversation.visitorEmail}</a> : "—"}
        />
        <Detail
          icon={Phone}
          label={t("details.phone")}
          value={conversation.visitorPhone ? <a className="text-primary hover:underline" href={`tel:${conversation.visitorPhone}`}>{conversation.visitorPhone}</a> : "—"}
        />
      </dl>
      <dl className="space-y-4 border-b border-border p-5">
        <Detail icon={Globe} label={t("details.currentPage")} value={conversation.currentPath ?? "—"} />
        <Detail icon={Globe} label={t("details.startPage")} value={conversation.startPath ?? "—"} />
        <Detail label={t("details.account")} value={conversation.userId ? t("details.registered") : t("details.guest")} />
        <Detail label={t("details.language")} value={conversation.locale.toUpperCase()} />
      </dl>
      <dl className="space-y-4 p-5">
        <Detail icon={Clock3} label={t("details.started")} value={fmtFull(conversation.createdAt)} />
        <Detail icon={Clock3} label={t("details.lastSeen")} value={online ? <span className="text-emerald-600 dark:text-emerald-400">{t("details.now")}</span> : fmtFull(conversation.visitorLastSeenAt)} />
        {conversation.userAgent && <Detail icon={Monitor} label={t("details.device")} value={<span className="text-[11px] leading-relaxed text-muted-foreground">{conversation.userAgent}</span>} />}
      </dl>
    </>
  );
}

function Detail({
  icon: Icon,
  label,
  value,
}: {
  icon?: React.ComponentType<{ className?: string }>;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[28px_minmax(0,1fr)] gap-x-2">
      <dt className="col-span-2 flex items-center gap-2 text-[11px] text-muted-foreground">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-muted/40">{Icon ? <Icon className="size-3.5" /> : <User className="size-3.5" />}</span>
        {label}
      </dt>
      <dd className="col-start-2 -mt-0.5 text-xs leading-relaxed [overflow-wrap:anywhere]">{value}</dd>
    </div>
  );
}
