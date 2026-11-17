"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Loader2, MessageCircle, Send, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  CHAT_FLAG_COOKIE,
  CHAT_LIMITS,
  newClientId,
  type ChatMessageDTO,
  type ChatServerEvent,
  type VisitorConversationDTO,
} from "@/lib/chat/shared";
import {
  applyReceipt,
  upsertMessage,
  useChatSocket,
  useRemoteTyping,
  useTypingEmitter,
} from "@/hooks/use-chat-socket";
import { MessageStatus, TypingDots, deliveryState } from "./message-status";

type LocalMessage = ChatMessageDTO & { failed?: boolean };

const hasFlagCookie = () =>
  typeof document !== "undefined" && document.cookie.split("; ").some((c) => c.startsWith(`${CHAT_FLAG_COOKIE}=`));

/** Floating live-chat widget for site visitors (guests or signed-in users). */
export default function ChatWidget() {
  const t = useTranslations("common.chat");
  const locale = useLocale();
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState<VisitorConversationDTO | null>(null);
  const [messages, setMessages] = useState<LocalMessage[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [agentsOnline, setAgentsOnline] = useState(false);
  const [prefill, setPrefill] = useState({ name: "", email: "" });
  const [error, setError] = useState<string | null>(null);
  const { typing: remoteTyping, update: setRemoteTyping } = useRemoteTyping();

  // ------------------------------------------------------------ load thread
  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/chat/session", { cache: "no-store" });
      const data = await res.json();
      if (data.conversation) {
        setConversation(data.conversation);
        setMessages(data.messages ?? []);
        setHasMore(Boolean(data.hasMore));
      } else if (data.prefill) {
        setPrefill({ name: data.prefill.name ?? "", email: data.prefill.email ?? "" });
      }
    } catch {
      /* offline: the form still works once back */
    } finally {
      setLoaded(true);
      setLoading(false);
    }
  }, []);

  // Returning visitors reconnect on page load so admins see them live.
  useEffect(() => {
    if (hasFlagCookie()) void load();
  }, [load]);
  useEffect(() => {
    if (open && !loaded) void load();
  }, [open, loaded, load]);

  // --------------------------------------------------------------- socket
  const onEvent = useCallback(
    (e: ChatServerEvent) => {
      switch (e.t) {
        case "hello":
          if (e.role === "visitor") {
            setConversation(e.conversation);
            setAgentsOnline(e.agentsOnline);
          }
          break;
        case "agents":
          setAgentsOnline(e.online);
          break;
        case "message":
          setMessages((list) => upsertMessage(list, e.message));
          if (e.message.senderType !== "VISITOR") setRemoteTyping("admin", false);
          break;
        case "receipt":
          setMessages((list) => applyReceipt(list, e));
          break;
        case "typing":
          if (e.from === "ADMIN") setRemoteTyping("admin", e.typing, e.name);
          break;
        case "conversation":
          setConversation((c) => (c ? { ...c, status: e.conversation.status } : c));
          break;
        case "error":
          if (e.clientId) {
            setMessages((list) => list.map((m) => (m.clientId === e.clientId ? { ...m, failed: true } : m)));
            setError(t(`errors.${e.code === "RATE_LIMITED" || e.code === "TOO_LONG" ? e.code : "generic"}`));
          }
          break;
      }
    },
    [setRemoteTyping, t],
  );

  const { status, send } = useChatSocket({ enabled: Boolean(conversation), onEvent });
  const typingEmitter = useTypingEmitter(send);

  // Page tracking: tell support which page the visitor is on.
  useEffect(() => {
    if (status === "open" && pathname) send({ t: "page", path: pathname });
  }, [status, pathname, send]);

  // Read receipts: admin messages count as read while the panel is open and visible.
  const unread = useMemo(
    () => messages.filter((m) => m.senderType !== "VISITOR" && !m.readAt).length,
    [messages],
  );
  useEffect(() => {
    if (!open || status !== "open" || unread === 0) return;
    const markRead = () => document.visibilityState === "visible" && send({ t: "read" });
    markRead();
    document.addEventListener("visibilitychange", markRead);
    return () => document.removeEventListener("visibilitychange", markRead);
  }, [open, status, unread, send]);

  // -------------------------------------------------------------- scrolling
  const listRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages.length, open, remoteTyping]);

  const loadOlder = async () => {
    const first = messages.find((m) => !m.id.startsWith("local-"));
    if (!first) return;
    const res = await fetch(`/api/chat/session?before=${encodeURIComponent(first.createdAt)}`, { cache: "no-store" });
    if (!res.ok) return;
    const data = await res.json();
    setMessages((list) => (data.messages as ChatMessageDTO[]).reduce(upsertMessage, list));
    setHasMore(Boolean(data.hasMore));
  };

  // ---------------------------------------------------------------- actions
  const sendText = (body: string, target: VisitorConversationDTO | null = conversation) => {
    const text = body.trim();
    if (!text || !target) return;
    const clientId = newClientId();
    setMessages((list) =>
      upsertMessage(list, {
        id: `local-${clientId}`,
        conversationId: target.id,
        senderType: "VISITOR",
        senderName: target.visitorName,
        body: text,
        clientId,
        createdAt: new Date().toISOString(),
        deliveredAt: null,
        readAt: null,
      }),
    );
    typingEmitter.stop();
    setError(null);
    send({ t: "send", clientId, body: text });
  };

  const retry = (m: LocalMessage) => {
    setMessages((list) => list.filter((x) => x.clientId !== m.clientId));
    sendText(m.body);
  };

  const adminTypingName = remoteTyping.admin;

  return (
    <>
      {open && (
        <div
          role="dialog"
          aria-label={t("title")}
          className="fixed inset-x-3 bottom-24 z-50 flex max-h-[min(640px,calc(100dvh-8rem))] flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl [--primary:#1088ef] [--secondary:#003180] sm:inset-x-auto sm:end-5 sm:w-[380px]"
        >
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-primary bg-[linear-gradient(100deg,#1088ef,#003180)] px-4 py-3 text-white">
            <div className="relative">
              <span className="flex size-9 items-center justify-center rounded-full bg-white/15">
                <MessageCircle className="size-5" aria-hidden />
              </span>
              <span
                className={cn(
                  "absolute -bottom-0.5 -end-0.5 size-3 rounded-full border-2 border-primary",
                  agentsOnline ? "bg-emerald-400" : "bg-zinc-400",
                )}
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{t("title")}</p>
              <p className="truncate text-xs opacity-80">
                {conversation && status !== "open" && status !== "idle"
                  ? t("reconnecting")
                  : agentsOnline
                    ? t("online")
                    : t("offline")}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t("close")}
              className="rounded-full p-1.5 transition hover:bg-white/15"
            >
              <X className="size-5" />
            </button>
          </div>

          {!loaded && loading ? (
            <div className="flex flex-1 items-center justify-center p-10">
              <Loader2 className="size-6 animate-spin text-muted-foreground" />
            </div>
          ) : !conversation ? (
            <StartForm
              prefill={prefill}
              onStarted={(c, firstMessage) => {
                setConversation(c);
                setMessages([]);
                // Queued in the socket outbox; sent as soon as it connects.
                if (firstMessage) sendText(firstMessage, c);
              }}
              locale={locale}
              pathname={pathname}
            />
          ) : (
            <>
              <div ref={listRef} className="flex-1 space-y-2 overflow-y-auto bg-[#f0f5fa] px-3 py-4 dark:bg-muted/30">
                {hasMore && (
                  <button
                    type="button"
                    onClick={loadOlder}
                    className="mx-auto block text-xs text-primary hover:underline"
                  >
                    {t("loadOlder")}
                  </button>
                )}
                {messages.length === 0 && (
                  <p className="px-6 py-8 text-center text-sm text-muted-foreground">
                    {t("welcome", { name: conversation.visitorName })}
                  </p>
                )}
                {messages.map((m) => {
                  const mine = m.senderType === "VISITOR";
                  if (m.senderType === "SYSTEM")
                    return (
                      <p key={m.id} className="text-center text-xs text-muted-foreground">
                        {m.body}
                      </p>
                    );
                  const state = deliveryState(m);
                  return (
                    <div key={m.id} className={cn("flex", mine ? "justify-end" : "justify-start")}>
                      <div
                        className={cn(
                          "max-w-[80%] rounded-2xl px-3 py-2 text-sm shadow-sm",
                          mine
                            ? "rounded-ee-sm bg-[linear-gradient(100deg,#1088ef,#003180)] text-white"
                            : "rounded-es-sm border border-border bg-background",
                        )}
                      >
                        {!mine && m.senderName && (
                          <p className="mb-0.5 text-xs font-semibold text-primary">{m.senderName}</p>
                        )}
                        <p className="whitespace-pre-wrap break-words">{m.body}</p>
                        <div
                          className={cn(
                            "mt-1 flex items-center justify-end gap-1 text-[10px]",
                            mine ? "text-white/75" : "text-muted-foreground",
                          )}
                        >
                          <time dateTime={m.createdAt}>
                            {new Date(m.createdAt).toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit" })}
                          </time>
                          {mine && <MessageStatus state={state} label={t(`status.${state}`)} />}
                        </div>
                        {m.failed && (
                          <button
                            type="button"
                            onClick={() => retry(m)}
                            className="mt-1 text-[11px] font-medium underline"
                          >
                            {t("retry")}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
                {adminTypingName && (
                  <div className="flex items-center gap-2 px-1 text-xs text-muted-foreground">
                    <TypingDots />
                    {t("typing", { name: typeof adminTypingName === "string" ? adminTypingName : t("support") })}
                  </div>
                )}
              </div>

              {conversation.status === "CLOSED" && (
                <p className="border-t border-border bg-muted/50 px-4 py-2 text-center text-xs text-muted-foreground">
                  {t("closedNotice")}
                </p>
              )}
              {error && <p className="px-4 pt-2 text-xs text-destructive">{error}</p>}
              <Composer onSend={(text) => sendText(text)} onTyping={typingEmitter.ping} placeholder={t("placeholder")} sendLabel={t("send")} />
            </>
          )}
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? t("close") : t("open")}
        aria-expanded={open}
        className="relative flex h-12 w-12 items-center justify-center rounded-full border border-[#1088ef] bg-[linear-gradient(100deg,#1088ef,#003180)] text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      >
        {open ? <X size={22} /> : <MessageCircle size={24} />}
        {!open && unread > 0 && (
          <span className="absolute -end-1 -top-1 flex min-w-5 items-center justify-center rounded-full bg-destructive px-1 text-[11px] font-bold text-white">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>
    </>
  );

}

function Composer({
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
      className="flex items-end gap-2 border-t border-border bg-[#f7fafd] p-3 dark:bg-background"
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
        className="max-h-32 min-h-10 resize-none"
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
      <Button type="submit" size="icon" disabled={!text.trim()} aria-label={sendLabel}>
        <Send className="size-4 rtl:-scale-x-100" />
      </Button>
    </form>
  );
}

function StartForm({
  prefill,
  onStarted,
  locale,
  pathname,
}: {
  prefill: { name: string; email: string };
  onStarted: (c: VisitorConversationDTO, firstMessage: string) => void;
  locale: string;
  pathname: string | null;
}) {
  const t = useTranslations("common.chat");
  const [name, setName] = useState(prefill.name);
  const [email, setEmail] = useState(prefill.email);
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setName((n) => n || prefill.name);
    setEmail((v) => v || prefill.email);
  }, [prefill]);

  return (
    <form
      className="space-y-3 overflow-y-auto p-4"
      onSubmit={async (e) => {
        e.preventDefault();
        setBusy(true);
        setError(null);
        try {
          const res = await fetch("/api/chat/session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name,
              email: email.trim(),
              phone: phone.trim() || undefined,
              locale,
              path: pathname || "/",
            }),
          });
          const data = await res.json().catch(() => ({}));
          if (!res.ok || !data.conversation) {
            setError(
              res.status === 429 ? t("errors.RATE_LIMITED") : res.status === 400 ? t("errors.invalid") : t("errors.generic"),
            );
            return;
          }
          onStarted(data.conversation, message.trim());
        } catch {
          setError(t("errors.generic"));
        } finally {
          setBusy(false);
        }
      }}
    >
      <p className="text-sm text-muted-foreground">{t("intro")}</p>
      <Input
        required
        value={name}
        maxLength={CHAT_LIMITS.name}
        onChange={(e) => setName(e.target.value)}
        placeholder={t("form.name")}
        aria-label={t("form.name")}
        autoComplete="name"
      />
      <Input
        type="email"
        value={email}
        maxLength={CHAT_LIMITS.email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t("form.email")}
        aria-label={t("form.email")}
        autoComplete="email"
      />
      <Input
        type="tel"
        value={phone}
        maxLength={CHAT_LIMITS.phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder={t("form.phone")}
        aria-label={t("form.phone")}
        autoComplete="tel"
      />
      <Textarea
        value={message}
        maxLength={CHAT_LIMITS.body}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={t("form.message")}
        aria-label={t("form.message")}
        rows={3}
      />
      {error && <p className="text-xs text-destructive">{error}</p>}
      <Button type="submit" className="w-full" disabled={busy || !name.trim()}>
        {busy && <Loader2 className="size-4 animate-spin" />}
        {t("form.start")}
      </Button>
    </form>
  );
}
