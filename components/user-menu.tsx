"use client";

import { useState } from "react";
import NextLink from "next/link";
import { ChevronDown, LayoutDashboard, Loader2, LogOut } from "lucide-react";
import { signOut, type useSession } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type SessionUser = NonNullable<
  NonNullable<ReturnType<typeof useSession>["data"]>["user"]
>;

function initials(user: SessionUser) {
  const source = (user.name || user.email || "?").trim();
  const parts = source.split(/[\s@._-]+/).filter(Boolean);
  return ((parts[0]?.[0] ?? "?") + (parts[1]?.[0] ?? "")).toUpperCase();
}

function useSignOut() {
  const locale = useLocale();
  const [pending, setPending] = useState(false);
  const run = async () => {
    setPending(true);
    try {
      await signOut({ callbackUrl: `/${locale}` });
    } finally {
      setPending(false);
    }
  };
  return { pending, run };
}

/** Desktop: avatar button with a dropdown (account info, dashboard, sign out). */
export function UserMenu({ user }: { user: SessionUser }) {
  const t = useTranslations("layout.header.nav");
  const { pending, run } = useSignOut();
  const isAdmin = user.role === "ADMIN";
  const displayName = user.name || user.email || "";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-2 rounded-xl btn-gradient py-1.5 pl-1.5 pr-3 text-sm font-semibold text-white outline-none transition-opacity hover:opacity-95 focus-visible:ring-2 focus-visible:ring-ring"
          aria-label={t("account")}
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/20 text-xs font-bold">
            {initials(user)}
          </span>
          <span className="max-w-36 truncate">{displayName}</span>
          <ChevronDown className="h-4 w-4 opacity-80" aria-hidden="true" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" sideOffset={8} className="w-60">
        <DropdownMenuLabel className="font-normal">
          <div className="truncate text-sm font-semibold text-foreground">
            {user.name || t("account")}
          </div>
          {user.email && (
            <div className="truncate text-xs text-muted-foreground">
              {user.email}
            </div>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {isAdmin && (
          <DropdownMenuItem asChild className="cursor-pointer">
            <NextLink href="/admin">
              <LayoutDashboard className="h-4 w-4" aria-hidden="true" />
              {t("dashboard")}
            </NextLink>
          </DropdownMenuItem>
        )}

        <DropdownMenuItem
          className="cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-700 dark:text-red-400 dark:focus:bg-red-950/40"
          disabled={pending}
          onSelect={(event) => {
            event.preventDefault();
            void run();
          }}
        >
          {pending ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <LogOut className="h-4 w-4" aria-hidden="true" />
          )}
          {t("signOut")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/** Mobile drawer: account card + dashboard link + sign out button. */
export function MobileUserMenu({
  user,
  onNavigate,
}: {
  user: SessionUser;
  onNavigate?: () => void;
}) {
  const t = useTranslations("layout.header.nav");
  const { pending, run } = useSignOut();
  const isAdmin = user.role === "ADMIN";

  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl btn-gradient text-sm font-bold text-white">
          {initials(user)}
        </span>
        <div className="min-w-0">
          <div className="truncate text-base font-bold text-foreground">
            {user.name || t("account")}
          </div>
          {user.email && (
            <div className="truncate text-sm text-muted-foreground">
              {user.email}
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 grid gap-2">
        {isAdmin && (
          <NextLink
            href="/admin"
            onClick={onNavigate}
            className="flex items-center justify-center gap-2 rounded-xl btn-gradient px-4 py-3 text-sm font-bold text-white"
          >
            <LayoutDashboard className="h-4 w-4" aria-hidden="true" />
            {t("dashboard")}
          </NextLink>
        )}
        <button
          type="button"
          disabled={pending}
          onClick={() => void run()}
          className="flex items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-3 text-sm font-bold text-red-600 transition-colors hover:bg-red-50 disabled:opacity-60 dark:border-red-900/60 dark:text-red-400 dark:hover:bg-red-950/40"
        >
          {pending ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <LogOut className="h-4 w-4" aria-hidden="true" />
          )}
          {t("signOut")}
        </button>
      </div>
    </div>
  );
}
