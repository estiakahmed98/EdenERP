"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { ExternalLink, Menu, Moon, Sun } from "lucide-react";

import { useTheme } from "@/components/theme-provider";
import AdminLanguageSwitcher from "./AdminLanguageSwitcher";
import { getAdminPage } from "./admin-nav";

interface AdminHeaderProps {
  title?: string;
  toggleSidebar?: () => void;
  user?: { name: string; role: string; image?: string };
}

function ThemeToggle() {
  const t = useTranslations("admin.shell");
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const dark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(dark ? "light" : "dark")}
      aria-label={dark ? t("switchToLight") : t("switchToDark")}
      title={dark ? t("lightTheme") : t("darkTheme")}
      className="flex size-10 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
    >
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}

function initials(name?: string) {
  const parts = (name || "Admin").trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "A") + (parts[1]?.[0] ?? "")).toUpperCase();
}

/** Top bar: where am I + quick actions. Page titles live in each page. */
const AdminHeader = ({ toggleSidebar, user }: AdminHeaderProps) => {
  const pathname = usePathname();
  const t = useTranslations("admin");
  const dir = useLocale() === "ar" ? "rtl" : "ltr";
  const page = getAdminPage(pathname);
  const Icon = page.icon;

  return (
    <header dir={dir} className="sticky top-0 z-30 border-b border-border bg-card/85 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between gap-3 px-4 md:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={toggleSidebar}
            aria-label={t("shell.openMenu")}
            className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted text-foreground transition-colors hover:bg-muted/70 md:hidden"
          >
            <Menu size={20} />
          </button>

          <span className="hidden size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary sm:flex">
            <Icon size={19} />
          </span>
          <div className="min-w-0 leading-tight">
            <p className="truncate text-sm font-bold text-foreground">
              {t(`nav.items.${page.key}.name`)}
            </p>
            <p className="hidden truncate text-xs text-muted-foreground sm:block">
              {t(`nav.items.${page.key}.description`)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <Link
            href="/"
            target="_blank"
            className="hidden items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:flex"
          >
            <ExternalLink size={15} />
            {t("shell.viewSite")}
          </Link>
          <AdminLanguageSwitcher />
          <ThemeToggle />
          <span className="mx-1 hidden h-7 w-px bg-border sm:block" />
          <div className="flex items-center gap-2.5 rounded-xl py-1 ps-1 pe-2">
            {user?.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.image}
                alt=""
                className="size-9 rounded-xl object-cover"
              />
            ) : (
              <span className="flex size-9 items-center justify-center rounded-xl btn-gradient text-xs font-bold text-white">
                {initials(user?.name)}
              </span>
            )}
            <span className="hidden leading-tight lg:block">
              <span className="block text-sm font-semibold text-foreground">
                {user?.name || t("shell.defaultUser")}
              </span>
              <span className="block text-xs capitalize text-muted-foreground">
                {t(`shell.role.${(user?.role || "admin").toLowerCase()}` as never)}
              </span>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
