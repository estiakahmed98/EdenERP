"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Send, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CHAT_LIMITS } from "@/lib/chat/shared";
import { cn } from "@/lib/utils";

const EMOJI = ["\u{1F600}", "\u{1F60A}", "\u{1F603}", "\u{1F602}", "\u{1F609}", "\u{1F60D}", "\u{1F917}", "\u{1F914}", "\u{1F622}", "\u{1F64F}", "\u{1F44D}", "\u{1F44E}", "\u{1F44F}", "\u{1F44B}", "\u{1F4AA}", "\u{1F389}", "\u{2764}\u{FE0F}", "\u{2705}", "\u{2728}", "\u{1F525}", "\u{1F680}", "\u{1F4AF}", "\u{1F916}", "\u{1F91D}"];

export function ChatComposer({ onSend, onTyping, onStopTyping, placeholder, sendLabel, admin = false }: {
  onSend: (text: string) => void;
  onTyping: () => void;
  onStopTyping: () => void;
  placeholder: string;
  sendLabel: string;
  admin?: boolean;
}) {
  const t = useTranslations(admin ? "admin.chat.composer" : "common.chat.composer");
  const [text, setText] = useState("");
  const [emojiOpen, setEmojiOpen] = useState(false);
  const textarea = useRef<HTMLTextAreaElement>(null);

  const submit = () => {
    if (!text.trim()) return;
    onStopTyping();
    onSend(text);
    setText("");
  };

  return (
    <form className={cn("shrink-0 border-t border-border bg-[#f7fafd] p-3 dark:bg-card", admin && "sm:p-4")} onSubmit={(e) => { e.preventDefault(); submit(); }}>
      <div className="rounded-2xl border border-primary/15 bg-card p-2 transition focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10">
        <Textarea ref={textarea} value={text} rows={1} maxLength={CHAT_LIMITS.body} placeholder={placeholder} aria-label={placeholder}
          className="max-h-36 min-h-10 resize-none border-0 bg-transparent text-sm shadow-none focus-visible:ring-0 dark:bg-transparent"
          onChange={(e) => { setText(e.target.value); if (e.target.value) onTyping(); else onStopTyping(); }}
          onBlur={onStopTyping}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) { e.preventDefault(); submit(); } }}
        />
        <div className="mt-1 flex items-center gap-1 border-t border-border/50 pt-2">
          <Popover open={emojiOpen} onOpenChange={setEmojiOpen}>
            <PopoverTrigger asChild><Button type="button" variant="ghost" size="icon-sm" className="rounded-lg text-muted-foreground" title={t("emoji")} aria-label={t("emoji")}><Smile className="size-4" /></Button></PopoverTrigger>
            <PopoverContent side="top" align="start" className="grid w-64 grid-cols-6 gap-1 p-2" aria-label={t("emoji")} onCloseAutoFocus={(e) => { e.preventDefault(); textarea.current?.focus(); }}>
              {EMOJI.map((emoji) => <button key={emoji} type="button" className="flex size-9 items-center justify-center rounded-lg text-xl hover:bg-muted focus-visible:outline-2 focus-visible:outline-primary" aria-label={emoji} onClick={() => {
                const start = textarea.current?.selectionStart ?? text.length;
                const end = textarea.current?.selectionEnd ?? start;
                const next = text.slice(0, start) + emoji + text.slice(end);
                if (next.length <= CHAT_LIMITS.body) { setText(next); onTyping(); }
                setEmojiOpen(false);
                requestAnimationFrame(() => { textarea.current?.focus(); textarea.current?.setSelectionRange(start + emoji.length, start + emoji.length); });
              }}>{emoji}</button>)}
            </PopoverContent>
          </Popover>
          <span className="ms-auto" />
          <Button type="submit" className="h-9 rounded-xl px-3 text-white" disabled={!text.trim()} aria-label={sendLabel}>
            <Send className="size-4 rtl:-scale-x-100" />
            {admin && <span className="hidden sm:inline">{sendLabel}</span>}
          </Button>
        </div>
      </div>
    </form>
  );
}

export function ChatMessageImage({ imageId, label }: { imageId: string; label: string }) {
  const url = `/api/chat/images/${imageId}`;
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="mb-1 block overflow-hidden rounded-xl border border-white/20 focus-visible:outline-2 focus-visible:outline-current" aria-label={label}>
      {/* These private images require the viewer's cookies on every request. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={url} alt={label} width={224} height={176} loading="lazy" decoding="async" className="h-44 w-56 max-w-full rounded-xl object-contain" />
    </a>
  );
}
