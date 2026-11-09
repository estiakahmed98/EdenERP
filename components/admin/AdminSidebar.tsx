"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import { ChevronsLeft, ChevronsRight, LogOut } from "lucide-react";

import { ADMIN_NAV, isAdminRouteActive } from "./admin-nav";

interface Props {
  onNavigate?: () => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  user?: { name: string; role: string; image?: string };
  /** Mobile drawer: fills its container instead of being fixed to the viewport. */
  drawer?: boolean;
}

export const SIDEBAR_EXPANDED = 256;
export const SIDEBAR_COLLAPSED = 72;

function initials(name?: string) {
  const parts = (name || "Admin").trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "A") + (parts[1]?.[0] ?? "")).toUpperCase();
}

const AdminSidebar = ({
  onNavigate,
  collapsed = false,
  onToggleCollapse,
  user,
  drawer = false,
}: Props) => {
  const pathname = usePathname();
  const t = useTranslations("admin");
  const dir = useLocale() === "ar" ? "rtl" : "ltr";
  const [signingOut, setSigningOut] = React.useState(false);

  const handleSignOut = async () => {
    setSigningOut(true);
    try {
      await signOut({ callbackUrl: "/auth/signin" });
    } finally {
      setSigningOut(false);
    }
  };

  return (
    <aside
      dir={dir}
      className={`flex flex-col border-r border-border bg-card text-card-foreground transition-[width] duration-300 ${
        drawer
          ? "h-full w-full"
          : "h-screen md:fixed md:left-0 md:top-0 md:z-40"
      }`}
      style={{
        width: drawer ? undefined : collapsed ? SIDEBAR_COLLAPSED : SIDEBAR_EXPANDED,
      }}
    >
      {/* Brand */}
      <div
        className={`flex h-16 shrink-0 items-center border-b border-border ${
          collapsed ? "justify-center px-2" : "justify-between px-4"
        }`}
      >
        <Link
          href="/admin"
          onClick={onNavigate}
          className="flex min-w-0 items-center gap-3"
          title={t("shell.brandTitle")}
        >
          <span className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-xl ring-1 ring-border">
            <Image
              src="/icon-192.png"
              alt=""
              width={36}
              height={36}
              className="size-9 object-cover"
              priority
            />
          </span>
          {!collapsed && (
            <span className="min-w-0 leading-tight">
              <span className="block truncate text-sm font-bold text-foreground">
                Adon ERP
              </span>
              <span className="block truncate text-xs text-muted-foreground">
                {t("shell.panel")}
              </span>
            </span>
          )}
        </Link>

        {!collapsed && onToggleCollapse && (
          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label={t("shell.collapseSidebar")}
            className="hidden size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:flex"
          >
            <ChevronsLeft size={18} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav
        aria-label={t("shell.navLabel")}
        className="flex-1 space-y-5 overflow-y-auto px-3 py-4"
      >
        {ADMIN_NAV.map((group) => (
          <div key={group.key}>
            {!collapsed ? (
              <p className="mb-1.5 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/80">
                {t(`nav.groups.${group.key}`)}
              </p>
            ) : (
              <div className="mx-3 mb-2 h-px bg-border" />
            )}
            <ul className="space-y-1">
              {group.items.map((item) => {
                const active = isAdminRouteActive(pathname, item.href);
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      title={collapsed ? t(`nav.items.${item.key}.name`) : undefined}
                      aria-current={active ? "page" : undefined}
                      className={`relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                        collapsed ? "justify-center" : ""
                      } ${
                        active
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      {active && (
                        <span className="absolute inset-y-2 left-0 w-1 rounded-r-full bg-primary" />
                      )}
                      <Icon size={19} className="shrink-0" />
                      {!collapsed && <span className="truncate">
                          {t(`nav.items.${item.key}.name`)}
                        </span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="shrink-0 border-t border-border p-3">
        {collapsed && onToggleCollapse && (
          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label={t("shell.expandSidebar")}
            className="mb-2 hidden w-full items-center justify-center rounded-lg py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:flex"
          >
            <ChevronsRight size={18} />
          </button>
        )}
        <div
          className={`flex items-center gap-3 rounded-lg bg-muted/60 p-2.5 ${
            collapsed ? "flex-col" : ""
          }`}
        >
          {user?.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.image}
              alt=""
              className="size-9 shrink-0 rounded-lg object-cover"
            />
          ) : (
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg btn-gradient text-xs font-bold text-white">
              {initials(user?.name)}
            </span>
          )}
          {!collapsed && (
            <div className="min-w-0 flex-1 leading-tight">
              <p className="truncate text-sm font-semibold text-foreground">
                {user?.name || t("shell.defaultUser")}
              </p>
              <p className="truncate text-xs capitalize text-muted-foreground">
                {t(`shell.role.${(user?.role || "admin").toLowerCase()}` as never)}
              </p>
            </div>
          )}
          <button
            type="button"
            onClick={handleSignOut}
            disabled={signingOut}
            aria-label={t("shell.signOut")}
            title={t("shell.signOut")}
            className="flex size-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive disabled:opacity-50"
          >
            <LogOut size={17} />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
