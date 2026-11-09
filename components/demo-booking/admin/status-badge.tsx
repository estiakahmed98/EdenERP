"use client";

import { Check, ChevronDown, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
  DEMO_STATUSES,
  type DemoRequestStatus,
} from "@/lib/demo-requests/validation";
import { STATUS_META } from "./status";

/** Read-only pill. */
export function StatusPill({
  status,
  className,
}: {
  status: DemoRequestStatus;
  className?: string;
}) {
  const t = useTranslations("admin.demo");
  const meta = STATUS_META[status];
  const Icon = meta.icon;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset",
        meta.pill,
        className,
      )}
    >
      <Icon className="size-3.5" aria-hidden="true" />
      {t(`status.${status}.label`)}
    </span>
  );
}

/** Pill that opens a menu to change the status in one click. */
export function StatusMenu({
  status,
  busy,
  onChange,
}: {
  status: DemoRequestStatus;
  busy?: boolean;
  onChange: (next: DemoRequestStatus) => void;
}) {
  const t = useTranslations("admin.demo");
  const meta = STATUS_META[status];
  const Icon = meta.icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          disabled={busy}
          aria-label={t("status.aria", { status: t(`status.${status}.label`) })}
          onClick={(event) => event.stopPropagation()}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full py-1 ps-2.5 pe-2 text-xs font-semibold ring-1 ring-inset outline-none transition-[filter,box-shadow] hover:brightness-95 focus-visible:ring-2 disabled:opacity-70",
            meta.pill,
          )}
        >
          {busy ? (
            <Loader2 className="size-3.5 animate-spin" aria-hidden="true" />
          ) : (
            <Icon className="size-3.5" aria-hidden="true" />
          )}
          {t(`status.${status}.label`)}
          <ChevronDown className="size-3.5 opacity-70" aria-hidden="true" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="w-64"
        onClick={(event) => event.stopPropagation()}
      >
        <DropdownMenuLabel className="text-xs font-medium text-muted-foreground">
          {t("status.moveTo")}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {DEMO_STATUSES.map((value) => {
          const item = STATUS_META[value];
          const ItemIcon = item.icon;
          return (
            <DropdownMenuItem
              key={value}
              disabled={value === status}
              onSelect={() => onChange(value)}
              className="cursor-pointer items-start gap-3 py-2"
            >
              <span
                className={cn(
                  "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full text-white",
                  item.dot,
                )}
              >
                <ItemIcon className="size-3.5" aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium">{t(`status.${value}.label`)}</span>
                <span className="block text-xs text-muted-foreground">
                  {t(`status.${value}.hint`)}
                </span>
              </span>
              {value === status && (
                <Check className="mt-1 size-4 text-primary" aria-hidden="true" />
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
