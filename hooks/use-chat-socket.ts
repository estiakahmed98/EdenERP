"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import {
  CHAT_WS_PATH,
  type ChatClientEvent,
  type ChatServerEvent,
} from "@/lib/chat/shared";

export type ChatSocketStatus = "idle" | "connecting" | "open" | "closed";

type SendFrame = Extract<ChatClientEvent, { t: "send" }>;

/**
 * One WebSocket to the chat hub with automatic reconnect (exponential backoff,
 * capped at 30s, resumes immediately when the tab comes back online/visible).
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
  const wsRef = useRef<WebSocket | null>(null);
  const outbox = useRef(new Map<string, SendFrame>());
  const onEventRef = useRef(options.onEvent);
  onEventRef.current = options.onEvent;

  useEffect(() => {
    if (!enabled) return;
    let attempt = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let pinger: ReturnType<typeof setInterval> | undefined;
    let stopped = false;

    const connect = () => {
      if (stopped) return;
      clearTimeout(timer);
      const proto = window.location.protocol === "https:" ? "wss:" : "ws:";
      const url = `${proto}//${window.location.host}${CHAT_WS_PATH}${admin ? "?as=admin" : ""}`;
      setStatus("connecting");
      const ws = new WebSocket(url);
      wsRef.current = ws;

      ws.onmessage = (msg) => {
        let event: ChatServerEvent;
        try {
          event = JSON.parse(String(msg.data)) as ChatServerEvent;
        } catch {
          return;
        }
        if (event.t === "hello") {
          attempt = 0;
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
        setStatus("closed");
        if (stopped) return;
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
      if (!ws || ws.readyState === WebSocket.CLOSED) {
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
      clearInterval(pinger);
      window.removeEventListener("online", wake);
      document.removeEventListener("visibilitychange", onVisible);
      wsRef.current?.close();
      wsRef.current = null;
      setStatus("idle");
    };
  }, [enabled, admin]);

  /** Send a frame now if connected. Chat messages are also queued for resend. */
  const send = useCallback((event: ChatClientEvent) => {
    if (event.t === "send") outbox.current.set(event.clientId, event);
    const ws = wsRef.current;
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(event));
      return true;
    }
    return false;
  }, []);

  return { status, send };
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
