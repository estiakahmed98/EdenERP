import {
  BadgeDollarSign,
  BookOpen,
  CalendarCheck,
  LayoutDashboard,
  type LucideIcon,
} from "lucide-react";

export type AdminNavItem = {
  name: string;
  href: string;
  icon: LucideIcon;
  description: string;
};

export type AdminNavGroup = { label: string; items: AdminNavItem[] };

/** Single source of truth for the admin sidebar, header title and breadcrumbs. */
export const ADMIN_NAV: AdminNavGroup[] = [
  {
    label: "Overview",
    items: [
      {
        name: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
        description: "Traffic, content and activity at a glance",
      },
    ],
  },
  {
    label: "Sales",
    items: [
      {
        name: "Demo requests",
        href: "/admin/demo-bookings",
        icon: CalendarCheck,
        description: "Track, follow up and close demo leads",
      },
      {
        name: "Pricing",
        href: "/admin/pricing",
        icon: BadgeDollarSign,
        description: "Plans, modules and public pricing page",
      },
    ],
  },
  {
    label: "Content",
    items: [
      {
        name: "Blog",
        href: "/admin/blog",
        icon: BookOpen,
        description: "Write and publish blog posts",
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
