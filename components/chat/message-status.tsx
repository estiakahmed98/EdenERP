"use client";

import { Check, CheckCheck, Clock, TriangleAlert } from "lucide-react";

import { cn } from "@/lib/utils";

export type MessageDeliveryState = "pending" | "failed" | "sent" | "delivered" | "read";

export function deliveryState(m: {
  id: string;
  deliveredAt: string | null;
  readAt: string | null;
  failed?: boolean;
}): MessageDeliveryState {
  if (m.failed) return "failed";
  if (m.id.startsWith("local-")) return "pending";
  if (m.readAt) return "read";
  if (m.deliveredAt) return "delivered";
  return "sent";
}

/** WhatsApp-style ticks: clock (sending) · ✓ sent · ✓✓ delivered · blue ✓✓ read. */
export function MessageStatus({
  state,
  label,
  className,
}: {
  state: MessageDeliveryState;
  label: string;
  className?: string;
}) {
  const Icon =
    state === "pending" ? Clock : state === "failed" ? TriangleAlert : state === "sent" ? Check : CheckCheck;
  return (
    <span title={label} aria-label={label} className={cn("inline-flex", className)}>
      <Icon
        className={cn(
          "size-3.5",
          state === "read" && "text-sky-500",
          state === "failed" && "text-destructive",
        )}
        aria-hidden
      />
    </span>
  );
}

export function TypingDots() {
  return (
    <span className="inline-flex items-center gap-0.5" aria-hidden>
      {[0, 150, 300].map((d) => (
        <span
          key={d}
          className="size-1.5 animate-bounce rounded-full bg-current opacity-60"
          style={{ animationDelay: `${d}ms` }}
        />
      ))}
    </span>
  );
}
