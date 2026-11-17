"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { SmilePlus } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CHAT_REACTIONS, type ChatMessageDTO } from "@/lib/chat/shared";
import { cn } from "@/lib/utils";

export function MessageReactions({ message, actor, mine, enabled, admin = false, onUpdate }: {
  message: ChatMessageDTO;
  actor: string | null;
  mine: boolean;
  enabled: boolean;
  admin?: boolean;
  onUpdate: (message: ChatMessageDTO) => void;
}) {
  const t = useTranslations(admin ? "admin.chat.composer" : "common.chat.composer");
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);
  const request = useRef<AbortController | null>(null);
  useEffect(() => () => request.current?.abort(), []);
  const disabled = !enabled || !actor || pending || message.id.startsWith("local-") || message.senderType === "SYSTEM";

  const react = async (emoji: string) => {
    if (disabled || request.current) return;
    const controller = new AbortController();
    request.current = controller;
    setPending(true);
    setOpen(false);
    setError(false);
    try {
      const response = await fetch(`/api/chat/reactions${admin ? "?as=admin" : ""}`, {
        method: "POST", headers: { "Content-Type": "application/json" }, signal: controller.signal,
        body: JSON.stringify({ messageId: message.id, conversationId: message.conversationId, emoji }),
      });
      const result = await response.json();
      if (!response.ok || !result.message) throw new Error("Reaction failed");
      if (!controller.signal.aborted) onUpdate(result.message);
    } catch {
      if (!controller.signal.aborted) setError(true);
    } finally {
      request.current = null;
      setPending(false);
    }
  };

  return (
    <div className="mt-1.5" aria-busy={pending}>
      <div className={cn("flex flex-wrap items-center gap-1", mine && "justify-end")}>
        {(message.reactions ?? []).map((reaction) => {
          const selected = actor !== null && reaction.actors.includes(actor);
          return <button key={reaction.emoji} type="button" disabled={disabled} aria-pressed={selected}
            aria-label={`${t("react")} ${reaction.emoji} (${reaction.actors.length})`}
            className={cn("inline-flex min-h-7 items-center gap-1 rounded-full border px-2 py-0.5 text-xs transition disabled:cursor-default focus-visible:outline-2 focus-visible:outline-current",
              mine ? selected ? "border-white/50 bg-white/25 text-white" : "border-white/20 bg-white/10 text-white" : selected ? "border-primary/40 bg-primary/10 text-primary" : "border-border bg-muted/40 text-foreground")}
            onClick={() => void react(reaction.emoji)}>
            <span>{reaction.emoji}</span><span className="text-[10px] font-medium tabular-nums">{reaction.actors.length}</span>
          </button>;
        })}
        {message.senderType !== "SYSTEM" && !message.id.startsWith("local-") && (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <button type="button" disabled={disabled} aria-label={t("react")} title={t("react")}
                className={cn("flex size-7 items-center justify-center rounded-full transition disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-current", mine ? "text-white/75 hover:bg-white/15 hover:text-white" : "text-muted-foreground hover:bg-primary/10 hover:text-primary")}>
                <SmilePlus className="size-3.5" />
              </button>
            </PopoverTrigger>
            <PopoverContent side="top" align={mine ? "end" : "start"} className="flex w-auto gap-1 rounded-full p-1.5" aria-label={t("react")}>
              {CHAT_REACTIONS.map((emoji) => <button key={emoji} type="button" aria-label={emoji} onClick={() => void react(emoji)}
                className="flex size-8 items-center justify-center rounded-full text-xl transition hover:bg-muted focus-visible:outline-2 focus-visible:outline-primary">{emoji}</button>)}
            </PopoverContent>
          </Popover>
        )}
      </div>
      {error && <p role="alert" className={cn("mt-1 max-w-56 text-[10px]", mine ? "text-white" : "text-destructive")}>{t("reactionFailed")}</p>}
    </div>
  );
}
