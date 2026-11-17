"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  ArrowLeft,
  CheckCircle2,
  Globe,
  Inbox,
  Loader2,
  Mail,
  MessagesSquare,
  Phone,
  RotateCcw,
  Search,
  Send,
  User,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  CHAT_LIMITS,
  newClientId,
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

  const { status, send } = useChatSocket({ enabled: true, admin: true, onEvent });
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
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{t("title")}</h1>
          <p className="text-sm text-muted-foreground">{t("subtitle")}</p>
        </div>
        <span
          className={cn(
            "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium",
            status === "open" ? "border-emerald-500/40 text-emerald-600" : "border-amber-500/40 text-amber-600",
          )}
        >
          <span className={cn("size-2 rounded-full", status === "open" ? "bg-emerald-500" : "animate-pulse bg-amber-500")} />
          {status === "open" ? t("connected") : t("connecting")}
        </span>
      </div>

      <div className="grid h-[calc(100dvh-14rem)] min-h-[520px] overflow-hidden rounded-xl border border-border bg-card md:grid-cols-[320px_1fr] xl:grid-cols-[320px_1fr_280px]">
        {/* ------------------------------------------------ conversation list */}
        <aside className={cn("flex min-h-0 flex-col border-e border-border", activeId && "hidden md:flex")}>
          <div className="space-y-2 border-b border-border p-3">
            <div className="relative">
              <Search className="pointer-events-none absolute start-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("search")}
                aria-label={t("search")}
                className="ps-8"
              />
            </div>
            <div className="flex gap-1 rounded-lg bg-muted p-1 text-xs">
              {(["OPEN", "CLOSED", "ALL"] as const).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  className={cn(
                    "flex-1 rounded-md px-2 py-1 font-medium transition",
                    filter === f ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {t(`filters.${f}`)}
                </button>
              ))}
            </div>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto">
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
                  className={cn(
                    "flex w-full items-start gap-3 border-b border-border/60 px-3 py-3 text-start transition hover:bg-muted/60",
                    c.id === activeId && "bg-muted",
                  )}
                >
                  <span className="relative shrink-0">
                    <span className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
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
                      <span className={cn("truncate text-sm", c.unreadCount ? "font-semibold" : "font-medium")}>
                        {c.visitorName}
                      </span>
                      <span className="shrink-0 text-[11px] text-muted-foreground">{fmtTime(c.lastMessageAt ?? c.createdAt)}</span>
                    </span>
                    <span className="mt-0.5 flex items-center justify-between gap-2">
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
                        <span className="flex min-w-5 shrink-0 items-center justify-center rounded-full bg-primary px-1.5 text-[11px] font-bold text-primary-foreground">
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
        <section className={cn("flex min-h-0 flex-col", !activeId && "hidden md:flex")}>
          {!active ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-2 text-sm text-muted-foreground">
              <MessagesSquare className="size-10" />
              {t("pick")}
            </div>
          ) : (
            <>
              <header className="flex items-center gap-3 border-b border-border px-4 py-3">
                <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setActiveId(null)} aria-label={t("back")}>
                  <ArrowLeft className="size-4 rtl:-scale-x-100" />
                </Button>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold">{active.visitorName}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {typing[active.id] ? (
                      <span className="text-primary">{t("typingShort")}</span>
                    ) : isOnline(active) ? (
                      <span className="text-emerald-600">
                        {t("onlineOn", { path: active.currentPath ?? "/" })}
                      </span>
                    ) : (
                      t("lastSeen", { time: fmtFull(active.visitorLastSeenAt) })
                    )}
                  </p>
                </div>
                <Button variant={active.status === "OPEN" ? "outline" : "default"} size="sm" onClick={toggleStatus} disabled={status !== "open"}>
                  {active.status === "OPEN" ? <CheckCircle2 className="size-4" /> : <RotateCcw className="size-4" />}
                  {active.status === "OPEN" ? t("close") : t("reopen")}
                </Button>
              </header>

              <div ref={listRef} className="min-h-0 flex-1 space-y-2 overflow-y-auto bg-muted/30 px-4 py-4">
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
                {messages.map((m) => {
                  const mine = m.senderType === "ADMIN";
                  const state = deliveryState(m);
                  return (
                    <div key={m.id} className={cn("flex", mine ? "justify-end" : "justify-start")}>
                      <div
                        className={cn(
                          "max-w-[75%] rounded-2xl px-3 py-2 text-sm shadow-sm",
                          mine
                            ? "rounded-ee-sm bg-primary text-primary-foreground"
                            : "rounded-es-sm border border-border bg-background",
                        )}
                      >
                        {mine && m.senderName && <p className="mb-0.5 text-[11px] font-semibold opacity-80">{m.senderName}</p>}
                        <p className="whitespace-pre-wrap break-words">{m.body}</p>
                        <div
                          className={cn(
                            "mt-1 flex items-center justify-end gap-1 text-[10px]",
                            mine ? "text-primary-foreground/75" : "text-muted-foreground",
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
                  );
                })}
                {typing[active.id] && (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
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

              <AdminComposer
                key={active.id}
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
          <aside className="hidden min-h-0 overflow-y-auto border-s border-border p-4 text-sm xl:block">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t("details.title")}</h2>
            <dl className="space-y-3">
              <Detail icon={User} label={t("details.name")} value={active.visitorName} />
              <Detail
                icon={Mail}
                label={t("details.email")}
                value={active.visitorEmail ? <a className="text-primary hover:underline" href={`mailto:${active.visitorEmail}`}>{active.visitorEmail}</a> : "—"}
              />
              <Detail
                icon={Phone}
                label={t("details.phone")}
                value={active.visitorPhone ? <a className="text-primary hover:underline" href={`tel:${active.visitorPhone}`}>{active.visitorPhone}</a> : "—"}
              />
              <Detail icon={Globe} label={t("details.currentPage")} value={active.currentPath ?? "—"} />
              <Detail icon={Globe} label={t("details.startPage")} value={active.startPath ?? "—"} />
              <Detail label={t("details.account")} value={active.userId ? t("details.registered") : t("details.guest")} />
              <Detail label={t("details.language")} value={active.locale.toUpperCase()} />
              <Detail label={t("details.started")} value={fmtFull(active.createdAt)} />
              <Detail label={t("details.lastSeen")} value={isOnline(active) ? t("details.now") : fmtFull(active.visitorLastSeenAt)} />
              <Detail label={t("details.status")} value={t(`filters.${active.status}`)} />
              {active.userAgent && <Detail label={t("details.device")} value={<span className="break-all text-xs">{active.userAgent}</span>} />}
            </dl>
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
    <div>
      <dt className="flex items-center gap-1.5 text-xs text-muted-foreground">
        {Icon && <Icon className="size-3.5" />}
        {label}
      </dt>
      <dd className="mt-0.5 break-words">{value}</dd>
    </div>
  );
}

function AdminComposer({
  onSend,
  onTyping,
  placeholder,
  sendLabel,
}: {
  onSend: (text: string) => void;
  onTyping: () => void;
  placeholder: string;
  sendLabel: string;
}) {
  const [text, setText] = useState("");
  const submit = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };
  return (
    <form
      className="flex items-end gap-2 border-t border-border p-3"
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
    >
      <Textarea
        value={text}
        rows={1}
        maxLength={CHAT_LIMITS.body}
        placeholder={placeholder}
        aria-label={placeholder}
        className="max-h-40 min-h-10 resize-none"
        onChange={(e) => {
          setText(e.target.value);
          if (e.target.value) onTyping();
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
            e.preventDefault();
            submit();
          }
        }}
      />
      <Button type="submit" disabled={!text.trim()} aria-label={sendLabel}>
        <Send className="size-4 rtl:-scale-x-100" />
        <span className="hidden sm:inline">{sendLabel}</span>
      </Button>
    </form>
  );
}
