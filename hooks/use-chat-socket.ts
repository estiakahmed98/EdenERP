"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import {
  CHAT_WS_PATH,
  type ChatClientEvent,
  type ChatServerEvent,
} from "@/lib/chat/shared";

export type ChatSocketStatus = "idle" | "connecting" | "open" | "closed";

type SendFrame = Extract<ChatClientEvent, { t: "send" }>;
type Transport = "ws" | "poll";

/**
 * "poll" forces the HTTP transport (set automatically on Vercel in
 * next.config.mjs), "ws" forces WebSockets; unset = try the WebSocket and
 * fall back to polling if it never opens.
 */
const FORCED: Transport | null =
  process.env.NEXT_PUBLIC_CHAT_TRANSPORT === "poll" || process.env.NEXT_PUBLIC_CHAT_TRANSPORT === "ws"
    ? process.env.NEXT_PUBLIC_CHAT_TRANSPORT
    : null;
const POLL_URL = "/api/chat/poll";
const POLL_VISIBLE_MS = 2_500;
const POLL_HIDDEN_MS = 10_000;
/** No "hello" within this long on the first WebSocket attempt -> switch to polling. */
const WS_HELLO_TIMEOUT_MS = 6_000;

/**
 * Live connection to the chat hub. Uses one WebSocket with automatic
 * reconnect (exponential backoff, capped at 30s) where the host supports it,
 * and HTTP polling (/api/chat/poll) where it does not — serverless hosts such
 * as Vercel cannot hold WebSockets.
 *
 * Outgoing chat messages are kept in an outbox until the server echoes them
 * back (matched by clientId), so a message typed while offline — or lost to a
 * dropped connection — is resent on reconnect. The server de-duplicates by
 * clientId, so a resend never creates a second row.
 */
export function useChatSocket(options: {
  enabled: boolean;
  admin?: boolean;
  onEvent: (event: ChatServerEvent) => void;
}) {
  const { enabled, admin = false } = options;
  const [status, setStatus] = useState<ChatSocketStatus>("idle");
  const [transport, setTransport] = useState<Transport>(FORCED ?? "ws");
  const wsRef = useRef<WebSocket | null>(null);
  const postRef = useRef<((frame: ChatClientEvent) => void) | null>(null);
  const outbox = useRef(new Map<string, SendFrame>());
  const onEventRef = useRef(options.onEvent);
  onEventRef.current = options.onEvent;

  // ------------------------------------------------------------- WebSocket
  useEffect(() => {
    if (!enabled || transport !== "ws") return;
    let attempt = 0;
    let everOpened = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let helloTimer: ReturnType<typeof setTimeout> | undefined;
    let pinger: ReturnType<typeof setInterval> | undefined;
    let stopped = false;

    /** The hub was never reached: this host has no WebSocket server (e.g. Vercel). */
    const fallBack = () => {
      if (FORCED === "ws" || everOpened || stopped) return false;
      stopped = true;
      clearTimeout(timer);
      clearTimeout(helloTimer);
      clearInterval(pinger);
      setTransport("poll");
      return true;
    };

    const connect = () => {
      if (stopped) return;
      clearTimeout(timer);
      const proto = window.location.protocol === "https:" ? "wss:" : "ws:";
      const url = `${proto}//${window.location.host}${CHAT_WS_PATH}${admin ? "?as=admin" : ""}`;
      setStatus("connecting");
      const ws = new WebSocket(url);
      wsRef.current = ws;
      clearTimeout(helloTimer);
      if (!everOpened) {
        helloTimer = setTimeout(() => {
          if (fallBack()) ws.close();
        }, WS_HELLO_TIMEOUT_MS);
      }

      ws.onmessage = (msg) => {
        let event: ChatServerEvent;
        try {
          event = JSON.parse(String(msg.data)) as ChatServerEvent;
        } catch {
          return;
        }
        if (event.t === "hello") {
          attempt = 0;
          everOpened = true;
          clearTimeout(helloTimer);
          setStatus("open");
          for (const frame of outbox.current.values()) ws.send(JSON.stringify(frame));
        } else if (event.t === "message") {
          outbox.current.delete(event.message.clientId);
        } else if (event.t === "error" && event.clientId) {
          outbox.current.delete(event.clientId);
        }
        onEventRef.current(event);
      };
      ws.onclose = () => {
        if (wsRef.current === ws) wsRef.current = null;
        clearInterval(pinger);
        if (stopped || fallBack()) return;
        setStatus("closed");
        const delay = Math.min(30_000, 1_000 * 2 ** attempt) + Math.random() * 500;
        attempt += 1;
        timer = setTimeout(connect, delay);
      };
      ws.onerror = () => ws.close();
      // Keeps idle proxies (nginx default 60s) from cutting the connection.
      clearInterval(pinger);
      pinger = setInterval(() => {
        if (ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify({ t: "ping" }));
      }, 25_000);
    };

    const wake = () => {
      const ws = wsRef.current;
      if (!stopped && (!ws || ws.readyState === WebSocket.CLOSED)) {
        attempt = 0;
        connect();
      }
    };
    const onVisible = () => document.visibilityState === "visible" && wake();

    connect();
    window.addEventListener("online", wake);
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      stopped = true;
      clearTimeout(timer);
      clearTimeout(helloTimer);
      clearInterval(pinger);
      window.removeEventListener("online", wake);
      document.removeEventListener("visibilitychange", onVisible);
      const ws = wsRef.current;
      wsRef.current = null;
      ws?.close();
      setStatus("idle");
    };
  }, [enabled, admin, transport]);

  // ---------------------------------------------------------- HTTP polling
  useEffect(() => {
    if (!enabled || transport !== "poll") return;
    const qs = admin ? "?as=admin" : "";
    let stopped = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let cursor: string | null = null;
    let failures = 0;
    let inFlight = false;
    // Polls re-read a small overlap and report receipt changes as whole
    // messages: pass unseen ones on as "message", state changes as "receipt".
    const seen = new Map<string, string>();

    const dispatch = (events: ChatServerEvent[]) => {
      for (const event of events) {
        if (event.t === "message") {
          const m = event.message;
          outbox.current.delete(m.clientId);
          const state = `${m.deliveredAt ?? ""}|${m.readAt ?? ""}`;
          const prev = seen.get(m.id);
          seen.set(m.id, state);
          if (prev === undefined) {
            onEventRef.current(event);
          } else if (prev !== state) {
            const kind = m.readAt && !prev.split("|")[1] ? "read" : "delivered";
            onEventRef.current({
              t: "receipt",
              conversationId: m.conversationId,
              kind,
              ids: [m.id],
              at: (kind === "read" ? m.readAt : m.deliveredAt) ?? new Date().toISOString(),
            });
          }
          continue;
        }
        if (event.t === "error" && event.clientId) outbox.current.delete(event.clientId);
        onEventRef.current(event);
      }
    };

    const sending = new Set<string>();
    const post = (frame: ChatClientEvent) => {
      if (frame.t === "send") {
        if (sending.has(frame.clientId)) return;
        sending.add(frame.clientId);
      }
      void fetch(`${POLL_URL}${qs}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(frame),
        cache: "no-store",
      })
        .then(async (res) => {
          const data = (await res.json().catch(() => null)) as { events?: ChatServerEvent[] } | null;
          if (!stopped && data?.events) dispatch(data.events);
        })
        .catch(() => {
          /* offline: chat messages stay in the outbox and are resent after the next poll */
        })
        .finally(() => {
          if (frame.t === "send") sending.delete(frame.clientId);
        });
    };

    const schedule = (ms: number) => {
      clearTimeout(timer);
      if (!stopped) timer = setTimeout(() => void poll(), ms);
    };

    const poll = async () => {
      if (stopped || inFlight) return;
      inFlight = true;
      try {
        const since = cursor ? `${qs ? "&" : "?"}since=${encodeURIComponent(cursor)}` : "";
        const res = await fetch(`${POLL_URL}${qs}${since}`, { cache: "no-store" });
        if (!res.ok) throw new Error(String(res.status));
        const data = (await res.json()) as { events: ChatServerEvent[]; cursor: string };
        if (stopped) return;
        const first = cursor === null;
        cursor = data.cursor;
        failures = 0;
        dispatch(data.events);
        if (first) {
          setStatus("open");
          for (const frame of outbox.current.values()) post(frame);
        }
      } catch {
        if (stopped) return;
        failures += 1;
        setStatus(cursor === null ? "connecting" : "closed");
      } finally {
        inFlight = false;
      }
      // Anything still pending (sent while offline, or a POST that failed) is resent.
      if (failures === 0 && outbox.current.size && cursor) {
        for (const frame of outbox.current.values()) post(frame);
      }
      const base = document.visibilityState === "visible" ? POLL_VISIBLE_MS : POLL_HIDDEN_MS;
      schedule(failures ? Math.min(30_000, base * 2 ** failures) : base);
    };

    const wake = () => {
      if (document.visibilityState === "visible") {
        failures = 0;
        schedule(0);
      }
    };

    postRef.current = post;
    setStatus("connecting");
    void poll();
    window.addEventListener("online", wake);
    document.addEventListener("visibilitychange", wake);
    return () => {
      stopped = true;
      clearTimeout(timer);
      postRef.current = null;
      window.removeEventListener("online", wake);
      document.removeEventListener("visibilitychange", wake);
      setStatus("idle");
    };
  }, [enabled, admin, transport]);

  /** Send a frame now if connected. Chat messages are also queued for resend. */
  const send = useCallback((event: ChatClientEvent) => {
    if (event.t === "send") outbox.current.set(event.clientId, event);
    if (postRef.current) {
      postRef.current(event);
      return true;
    }
    const ws = wsRef.current;
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(event));
      return true;
    }
    return false;
  }, []);

  return { status, send, transport };
}

/** Merge a message into a sorted list, replacing an optimistic copy with the same clientId. */
export function upsertMessage<T extends { id: string; clientId: string; createdAt: string }>(list: T[], message: T) {
  const i = list.findIndex((m) => m.id === message.id || m.clientId === message.clientId);
  const next = i >= 0 ? list.map((m, j) => (j === i ? message : m)) : [...list, message];
  return next.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}

/** Apply a delivered/read receipt to a message list. */
export function applyReceipt<T extends { id: string; deliveredAt: string | null; readAt: string | null }>(
  list: T[],
  receipt: { kind: "delivered" | "read"; ids: string[]; at: string },
) {
  const ids = new Set(receipt.ids);
  return list.map((m) =>
    ids.has(m.id)
      ? {
          ...m,
          deliveredAt: m.deliveredAt ?? receipt.at,
          readAt: receipt.kind === "read" ? (m.readAt ?? receipt.at) : m.readAt,
        }
      : m,
  );
}

/**
 * Typing indicator emitter: sends `typing: true` at most every 3s while the
 * user types and `typing: false` after 4s idle (or immediately via `stop`).
 */
export function useTypingEmitter(send: (event: ChatClientEvent) => boolean, conversationId?: string) {
  const lastSent = useRef(0);
  const idle = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const active = useRef(false);

  const stop = useCallback(() => {
    clearTimeout(idle.current);
    if (active.current) send({ t: "typing", typing: false, conversationId });
    active.current = false;
    lastSent.current = 0;
  }, [send, conversationId]);

  const ping = useCallback(() => {
    const now = Date.now();
    if (now - lastSent.current > 3_000) {
      send({ t: "typing", typing: true, conversationId });
      lastSent.current = now;
      active.current = true;
    }
    clearTimeout(idle.current);
    idle.current = setTimeout(stop, 4_000);
  }, [send, conversationId, stop]);

  useEffect(() => stop, [stop]);
  return { ping, stop };
}

/** Peer typing state that clears itself if the "stopped" frame never arrives. */
export function useRemoteTyping(timeoutMs = 6_000) {
  const [typing, setTyping] = useState<Record<string, string | true>>({});
  const timers = useRef(new Map<string, ReturnType<typeof setTimeout>>());

  const update = useCallback(
    (key: string, isTyping: boolean, name?: string) => {
      clearTimeout(timers.current.get(key));
      setTyping((prev) => {
        if (!isTyping) {
          if (!(key in prev)) return prev;
          const { [key]: _gone, ...rest } = prev;
          return rest;
        }
        return { ...prev, [key]: name ?? true };
      });
      if (isTyping) timers.current.set(key, setTimeout(() => update(key, false), timeoutMs));
    },
    [timeoutMs],
  );

  useEffect(() => {
    const map = timers.current;
    return () => map.forEach(clearTimeout);
  }, []);
  return { typing, update };
}
