import {
  BadgeDollarSign,
  BookOpen,
  CalendarCheck,
  LayoutDashboard,
  type LucideIcon,
} from "lucide-react";

export type AdminNavItem = {
  /** Key under `admin.nav.items` (holds `name` and `description`). */
  key: string;
  href: string;
  icon: LucideIcon;
};

export type AdminNavGroup = {
  /** Key under `admin.nav.groups`. */
  key: string;
  items: AdminNavItem[];
};

/** Single source of truth for the admin sidebar, header title and breadcrumbs. */
export const ADMIN_NAV: AdminNavGroup[] = [
  {
    key: "overview",
    items: [
      {
        key: "dashboard",
        href: "/admin",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    key: "sales",
    items: [
      {
        key: "demoBookings",
        href: "/admin/demo-bookings",
        icon: CalendarCheck,
      },
      {
        key: "pricing",
        href: "/admin/pricing",
        icon: BadgeDollarSign,
      },
    ],
  },
  {
    key: "content",
    items: [
      {
        key: "blog",
        href: "/admin/blog",
        icon: BookOpen,
      },
    ],
  },
];

export const ADMIN_NAV_ITEMS = ADMIN_NAV.flatMap((group) => group.items);

export function isAdminRouteActive(pathname: string, href: string) {
  return href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
}

export function getAdminPage(pathname: string) {
  return (
    [...ADMIN_NAV_ITEMS]
      .sort((a, b) => b.href.length - a.href.length)
      .find((item) => isAdminRouteActive(pathname, item.href)) ??
    ADMIN_NAV_ITEMS[0]
  );
}
