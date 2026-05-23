"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown, Menu, Moon, Sun, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useTheme } from "next-themes";

import { Link, usePathname, useRouter } from "@/i18n/navigation";

type MegaMenuLink = {
  labelKey: string;
  href: string;
};

type MegaMenuColumn = {
  titleKey: string;
  accentClass: string;
  underlineClass: string;
  links: MegaMenuLink[];
};

type MenuId = "apps" | "industries" | "community";

type NavItem =
  | {
      labelKey: string;
      href: string;
      id: MenuId;
      megaMenu: MegaMenuColumn[];
    }
  | {
      labelKey: string;
      href: string;
      id?: never;
      megaMenu?: never;
    };

const appsMegaMenu: MegaMenuColumn[] = [
  {
    titleKey: "menu.apps.finance",
    accentClass: "text-emerald-600",
    underlineClass: "bg-emerald-200",
    links: [
      { labelKey: "menu.apps.accounting", href: "/apps/Finance/Accounting" },
      { labelKey: "menu.apps.invoicing", href: "/apps/Finance/Invoicing" },
      { labelKey: "menu.apps.expenses", href: "/apps/Finance/Expenses" },
      { labelKey: "menu.apps.spreadsheet", href: "/apps/Finance/Spreadsheet" },
      { labelKey: "menu.apps.documents", href: "/apps/Finance/Documents" },
      { labelKey: "menu.apps.sign", href: "/apps/Finance/esign" },
    ],
  },
  {
    titleKey: "menu.apps.sales",
    accentClass: "text-rose-500",
    underlineClass: "bg-rose-200",
    links: [
      { labelKey: "menu.apps.crm", href: "/apps/sales/crm" },
      { labelKey: "menu.apps.salesApp", href: "/apps/sales" },
      { labelKey: "menu.apps.posShop", href: "/apps/sales/pos" },
      {
        labelKey: "menu.apps.posRestaurant",
        href: "/apps/sales/pos-restaurant",
      },
      {
        labelKey: "menu.apps.subscriptions",
        href: "/apps/sales/subscriptions",
      },
      { labelKey: "menu.apps.rental", href: "/apps/sales/rental" },
    ],
  },
  {
    titleKey: "menu.apps.websites",
    accentClass: "text-sky-600",
    underlineClass: "bg-sky-200",
    links: [
      { labelKey: "menu.apps.websiteBuilder", href: "/apps/website" },
      { labelKey: "menu.apps.ecommerce", href: "/apps/website/ecommerce" },
      { labelKey: "menu.apps.blog", href: "/apps/website/blog" },
      { labelKey: "menu.apps.forum", href: "/apps/website/forum" },
      { labelKey: "menu.apps.liveChat", href: "/apps/website/live-chat" },
      { labelKey: "menu.apps.elearning", href: "/apps/website/elearning" },
    ],
  },
  {
    titleKey: "menu.apps.supplyChain",
    accentClass: "text-indigo-500",
    underlineClass: "bg-indigo-200",
    links: [
      { labelKey: "menu.apps.inventory", href: "/apps/supply-chain/inventory" },
      {
        labelKey: "menu.apps.manufacturing",
        href: "/apps/supply-chain/manufacturing",
      },
      { labelKey: "menu.apps.purchase", href: "/apps/supply-chain/purchase" },
      {
        labelKey: "menu.apps.maintenance",
        href: "/apps/supply-chain/maintenance",
      },
      { labelKey: "menu.apps.quality", href: "/apps/supply-chain/quality" },
      { labelKey: "menu.apps.barcode", href: "/apps/supply-chain/barcode" },
    ],
  },
  {
    titleKey: "menu.apps.humanResources",
    accentClass: "text-violet-600",
    underlineClass: "bg-violet-200",
    links: [
      {
        labelKey: "menu.apps.employees",
        href: "/apps/human-resources/employees",
      },
      {
        labelKey: "menu.apps.recruitment",
        href: "/apps/human-resources/recruitment",
      },
      { labelKey: "menu.apps.timeOff", href: "/apps/human-resources/time-off" },
      {
        labelKey: "menu.apps.appraisals",
        href: "/apps/human-resources/appraisals",
      },
      {
        labelKey: "menu.apps.attendance",
        href: "/apps/human-resources/attendance",
      },
      { labelKey: "menu.apps.payroll", href: "/apps/human-resources/payroll" },
    ],
  },
  {
    titleKey: "menu.apps.services",
    accentClass: "text-cyan-600",
    underlineClass: "bg-cyan-200",
    links: [
      { labelKey: "menu.apps.project", href: "/apps/services/project" },
      { labelKey: "menu.apps.timesheets", href: "/apps/services/timesheets" },
      { labelKey: "menu.apps.helpdesk", href: "/apps/services/helpdesk" },
      { labelKey: "menu.apps.planning", href: "/apps/services/planning" },
      {
        labelKey: "menu.apps.appointments",
        href: "/apps/services/appointments",
      },
    ],
  },
  {
    titleKey: "menu.apps.productivity",
    accentClass: "text-purple-600",
    underlineClass: "bg-purple-200",
    links: [
      { labelKey: "menu.apps.discuss", href: "/apps/productivity/discuss" },
      {
        labelKey: "menu.apps.artificialIntelligence",
        href: "/apps/productivity/artificial-intelligence",
      },
      { labelKey: "menu.apps.iot", href: "/apps/productivity/iot" },
    ],
  },
];

const industriesMegaMenu: MegaMenuColumn[] = [
  {
    titleKey: "menu.industries.retail",
    accentClass: "text-emerald-600",
    underlineClass: "bg-emerald-200",
    links: [
      {
        labelKey: "menu.industries.bookStore",
        href: "/industries/retail/book-store",
      },
      {
        labelKey: "menu.industries.clothingStore",
        href: "/industries/retail/clothing-store",
      },
      {
        labelKey: "menu.industries.furnitureStore",
        href: "/industries/retail/furniture-store",
      },
      {
        labelKey: "menu.industries.groceryStore",
        href: "/industries/retail/grocery-store",
      },
      {
        labelKey: "menu.industries.hardwareStore",
        href: "/industries/retail/hardware-store",
      },
      {
        labelKey: "menu.industries.toyStore",
        href: "/industries/retail/toy-store",
      },
    ],
  },
  {
    titleKey: "menu.industries.foodHospitality",
    accentClass: "text-sky-600",
    underlineClass: "bg-sky-200",
    links: [
      {
        labelKey: "menu.industries.restaurant",
        href: "/industries/food&hospitality/restaurant",
      },
      {
        labelKey: "menu.industries.fastFood",
        href: "/industries/food&hospitality/fast-food",
      },
      {
        labelKey: "menu.industries.guestHouse",
        href: "/industries/food&hospitality/guest-house",
      },
      {
        labelKey: "menu.industries.beverageDistributor",
        href: "/industries/food&hospitality/beverage-distributor",
      },
      {
        labelKey: "menu.industries.hotel",
        href: "/industries/food&hospitality/hotel",
      },
    ],
  },
  {
    titleKey: "menu.industries.realEstate",
    accentClass: "text-rose-500",
    underlineClass: "bg-rose-200",
    links: [
      {
        labelKey: "menu.industries.realEstateAgency",
        href: "/industries/realestate/real-estate-agency",
      },
      {
        labelKey: "menu.industries.architectureFirm",
        href: "/industries/realestate/architecture-firm",
      },
      {
        labelKey: "menu.industries.construction",
        href: "/industries/realestate/construction",
      },
    ],
  },
  {
    titleKey: "menu.industries.consulting",
    accentClass: "text-indigo-500",
    underlineClass: "bg-indigo-200",
    links: [
      {
        labelKey: "menu.industries.accountingFirm",
        href: "/industries/consulting/accounting-firm",
      },
      {
        labelKey: "menu.industries.marketingAgency",
        href: "/industries/consulting/marketing-agency",
      },
      {
        labelKey: "menu.industries.auditCertification",
        href: "/industries/consulting/audit-certification",
      },
      {
        labelKey: "menu.industries.talentAcquisition",
        href: "/industries/consulting/talent-acquisition",
      },
    ],
  },
  {
    titleKey: "menu.industries.manufacturing",
    accentClass: "text-violet-600",
    underlineClass: "bg-violet-200",
    links: [
      {
        labelKey: "menu.industries.textile",
        href: "/industries/manufacturing/textile",
      },
      {
        labelKey: "menu.industries.metal",
        href: "/industries/manufacturing/metal",
      },
      {
        labelKey: "menu.industries.furniture",
        href: "/industries/manufacturing/furniture",
      },
    ],
  },
];

const communityMegaMenu: MegaMenuColumn[] = [
  {
    titleKey: "menu.community.learn",
    accentClass: "text-orange-500",
    underlineClass: "bg-orange-200",
    links: [
      {
        labelKey: "menu.community.tutorials",
        href: "/community/learn/tutorials",
      },
      {
        labelKey: "menu.community.documentation",
        href: "/community/learn/documentation",
      },
      {
        labelKey: "menu.community.training",
        href: "/community/learn/training",
      },
      { labelKey: "menu.community.blog", href: "/community/learn/blog" },
    ],
  },
  {
    titleKey: "menu.community.getServices",
    accentClass: "text-sky-600",
    underlineClass: "bg-sky-200",
    links: [
      {
        labelKey: "menu.community.findPartner",
        href: "/community/get-services/find-partner",
      },
      {
        labelKey: "menu.community.meetAdvisor",
        href: "/community/get-services/meet-advisor",
      },
      {
        labelKey: "menu.community.implementation",
        href: "/community/get-services/implementation",
      },
      {
        labelKey: "menu.community.support",
        href: "/community/get-services/support",
      },
      {
        labelKey: "menu.community.customerStories",
        href: "/community/get-services/customer-stories",
      },
    ],
  },
  {
    titleKey: "menu.community.collaborate",
    accentClass: "text-purple-600",
    underlineClass: "bg-purple-200",
    links: [
      {
        labelKey: "menu.community.github",
        href: "/community/collaborate/github",
      },
      {
        labelKey: "menu.community.forum",
        href: "/community/collaborate/forum",
      },
      {
        labelKey: "menu.community.events",
        href: "/community/collaborate/events",
      },
      {
        labelKey: "menu.community.translations",
        href: "/community/collaborate/translations",
      },
      {
        labelKey: "menu.community.becomePartner",
        href: "/community/collaborate/become-a-partner",
      },
    ],
  },
];

const navItems: NavItem[] = [
  { labelKey: "nav.apps", href: "/apps", id: "apps", megaMenu: appsMegaMenu },
  {
    labelKey: "nav.industries",
    href: "/industries",
    id: "industries",
    megaMenu: industriesMegaMenu,
  },
  {
    labelKey: "nav.community",
    href: "/community",
    id: "community",
    megaMenu: communityMegaMenu,
  },
  { labelKey: "nav.pricing", href: "/pricing" },
  { labelKey: "nav.help", href: "/help" },
];

export default function Header() {
  const t = useTranslations("Header");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const navId = useId();
  const desktopNavRef = useRef<HTMLDivElement | null>(null);
  const { theme, resolvedTheme, setTheme } = useTheme();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDesktopMenu, setOpenDesktopMenu] = useState<MenuId | null>(null);
  const [mobileOpenMenu, setMobileOpenMenu] = useState<MenuId | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      if (!openDesktopMenu) return;

      const target = event.target as Node | null;
      if (!target) return;
      if (desktopNavRef.current?.contains(target)) return;

      setOpenDesktopMenu(null);
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenDesktopMenu(null);
      }
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [openDesktopMenu]);

  useEffect(() => {
    setMounted(true);
  }, []);

  function toggleTheme() {
    const current = resolvedTheme ?? theme;
    setTheme(current === "dark" ? "light" : "dark");
  }

  function switchLanguage(nextLocale: "en" | "bn") {
    if (nextLocale === locale) return;
    router.replace(pathname, { locale: nextLocale });
  }

  const isDark = mounted && (resolvedTheme ?? theme) === "dark";

  return (
    <header className="bn-content sticky top-0 z-50 w-full border-b border-slate-200/70 bg-white/85 backdrop-blur-2xl dark:border-slate-800 dark:bg-linear-to-b dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group mb-4 inline-flex items-center gap-1 transition-transform duration-300 hover:scale-105"
        >
          <Image
            src="/icon.svg"
            alt="Adon ERP icon"
            width={30}
            height={30}
            className="h-10 w-10 mr-2 shrink-0 object-contain transition-transform duration-300 group-hover:scale-105"
            priority
          />

          <span
            className="relative inline-block bg-linear-to-r from-violet-400 via-cyan-300 to-amber-300 bg-clip-text text-3xl font-black text-transparent drop-shadow-[0_2px_10px_rgba(34,211,238,0.25)] transition-all duration-300 group-hover:scale-105"
            style={{
              fontFamily:
                '"Hauser Script", "Segoe Script", "Brush Script MT", "Segoe Print", cursive',
            }}
          >
            Adon<span className="text-slate-400 mx-1.5">|</span>
          </span>

          <span
            className="relative inline-block bg-linear-to-r from-emerald-300 to-cyan-300 bg-clip-text text-4xl font-black uppercase tracking-wide text-transparent"
            style={{
              fontFamily:
                '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
            }}
          >
            ERP
          </span>
        </Link>

        <div ref={desktopNavRef} className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <div key={item.href} className="relative">
              {item.megaMenu ? (
                <>
                  <button
                    type="button"
                    aria-haspopup="dialog"
                    aria-expanded={openDesktopMenu === item.id}
                    aria-controls={`${navId}-${item.id}-panel`}
                    onClick={() =>
                      setOpenDesktopMenu((prev) =>
                        prev === item.id ? null : item.id,
                      )
                    }
                    className={`group inline-flex items-center gap-1.5 text-sm font-semibold transition-colors ${
                      openDesktopMenu === item.id
                        ? "text-cyan-700"
                        : "text-slate-700 hover:text-cyan-700 dark:text-slate-200 dark:hover:text-cyan-300"
                    }`}
                  >
                    {t(item.labelKey)}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        openDesktopMenu === item.id ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {openDesktopMenu === item.id && (
                    <div
                      id={`${navId}-${item.id}-panel`}
                      role="dialog"
                      aria-label={`${t(item.labelKey)} menu`}
                      className="fixed left-1/2 top-[92px] z-50 w-[min(calc(100vw-2rem),1120px)] -translate-x-1/2 overflow-hidden rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#071126] shadow-2xl dark:shadow-black/40"
                    >
                      <div className="border-b border-slate-200 dark:border-slate-700 bg-linear-to-r from-slate-50 to-white dark:from-slate-950 dark:to-slate-900/60 px-6 py-4">
                        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                          {t("menu.explore", { label: t(item.labelKey) })}
                        </p>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                          {t("menu.description")}
                        </p>
                      </div>

                      <div className="max-h-[calc(100vh-200px)] overflow-y-auto px-6 py-5 scrollbar-thin">
                        <div className="grid grid-cols-1 gap-x-10 gap-y-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                          {item.megaMenu.map((column) => (
                            <div key={column.titleKey}>
                              <div
                                className={`text-xs font-black uppercase tracking-[0.22em] ${column.accentClass}`}
                              >
                                {t(column.titleKey)}
                              </div>

                              <div
                                className={`mt-2 h-px w-full ${column.underlineClass}`}
                              />

                              <ul className="mt-3 space-y-2">
                                {column.links.map((link) => (
                                  <li key={`${column.titleKey}:${link.href}`}>
                                    <Link
                                      href={link.href}
                                      onClick={() => setOpenDesktopMenu(null)}
                                      className="block rounded-xl px-2 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 transition-all hover:bg-slate-100 dark:hover:bg-slate-900/60 hover:text-cyan-700 dark:hover:text-cyan-300"
                                    >
                                      {t(link.labelKey)}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  className="group relative text-sm font-semibold text-slate-700 transition-colors hover:text-cyan-700 dark:text-slate-200 dark:hover:text-cyan-300"
                >
                  {t(item.labelKey)}
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 rounded-full bg-linear-to-r from-cyan-500 to-emerald-500 transition-all duration-300 group-hover:w-full" />
                </Link>
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white/90 p-1 shadow-sm dark:border-slate-700 dark:bg-slate-900/90">
            <button
              type="button"
              onClick={() => switchLanguage("en")}
              className={`rounded-full px-3 py-1 text-xs font-bold transition-colors ${
                locale === "en"
                  ? "bg-(--purple) text-white"
                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => switchLanguage("bn")}
              className={`rounded-full px-3 py-1 text-xs font-bold transition-colors ${
                locale === "bn"
                  ? "bg-(--purple) text-white"
                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              }`}
            >
              বাংলা
            </button>
          </div>

          <button
            type="button"
            aria-label={t("mobileMenuLabel")}
            className="rounded-xl p-2 text-slate-700 transition-colors hover:bg-slate-100 md:hidden dark:text-slate-200 dark:hover:bg-slate-900/60"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="hidden items-center gap-2 md:flex">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={
                isDark ? "Switch to light mode" : "Switch to dark mode"
              }
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white p-2 text-slate-700 shadow-xs transition-colors hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900/60"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <div className="flex items-center gap-3 rounded-xl bg-(--purple) text-white">
              <Link
                href="/auth/signin"
                className="rounded-xl px-4 py-2 text-sm font-semibold text-white transition-colors"
              >
                {t("nav.signIn")}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-[102px] z-50 max-h-[calc(100vh-102px)] overflow-y-auto border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-[#020817] px-4 py-5 md:hidden">
          <div className="mb-5 flex justify-end">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={
                isDark ? "Switch to light mode" : "Switch to dark mode"
              }
              className="flex items-center gap-2 rounded-2xl border border-slate-300 dark:border-slate-700 px-5 py-3 text-sm font-bold text-slate-800 dark:text-white"
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
              <span>{isDark ? "Light" : "Dark"}</span>
            </button>
          </div>

          <div className="space-y-3">
            {/* Apps Accordion */}
            <div>
              <button
                type="button"
                onClick={() =>
                  setMobileOpenMenu(mobileOpenMenu === "apps" ? null : "apps")
                }
                className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-base font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900"
              >
                {t("nav.apps")}
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    mobileOpenMenu === "apps" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {mobileOpenMenu === "apps" && (
                <div className="mt-3 rounded-2xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-[#071126] p-4">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {appsMegaMenu.map((column) => (
                      <div key={column.titleKey}>
                        <div
                          className={`mb-3 border-b border-slate-300 dark:border-slate-700 pb-2 text-xs font-black uppercase tracking-[0.2em] ${column.accentClass}`}
                        >
                          {t(column.titleKey)}
                        </div>

                        <ul className="space-y-2">
                          {column.links.map((link) => (
                            <li key={`${column.titleKey}:${link.href}`}>
                              <Link
                                href={link.href}
                                className="block rounded-lg px-2 py-2 text-sm font-semibold text-slate-300 hover:bg-slate-800 hover:text-white"
                                onClick={() => {
                                  setMobileMenuOpen(false);
                                  setMobileOpenMenu(null);
                                }}
                              >
                                {t(link.labelKey)}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Industries Accordion */}
            <div>
              <button
                type="button"
                onClick={() =>
                  setMobileOpenMenu(
                    mobileOpenMenu === "industries" ? null : "industries",
                  )
                }
                className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-base font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900"
              >
                {t("nav.industries")}
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    mobileOpenMenu === "industries" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {mobileOpenMenu === "industries" && (
                <div className="mt-3 rounded-2xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-[#071126] p-4">
                  <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {industriesMegaMenu.map((column) => (
                      <div key={column.titleKey}>
                        <div
                          className={`mb-2 text-xs font-black uppercase tracking-[0.2em] ${column.accentClass}`}
                        >
                          {t(column.titleKey)}
                        </div>
                        <ul className="ml-2 space-y-1">
                          {column.links.map((link) => (
                            <li key={`${column.titleKey}:${link.href}`}>
                              <Link
                                href={link.href}
                                className="block rounded-lg px-2 py-1.5 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                                onClick={() => {
                                  setMobileMenuOpen(false);
                                  setMobileOpenMenu(null);
                                }}
                              >
                                {t(link.labelKey)}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Community Accordion */}
            <div>
              <button
                type="button"
                onClick={() =>
                  setMobileOpenMenu(
                    mobileOpenMenu === "community" ? null : "community",
                  )
                }
                className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-base font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900"
              >
                {t("nav.community")}
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    mobileOpenMenu === "community" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {mobileOpenMenu === "community" && (
                <div className="mt-3 rounded-2xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-[#071126] p-4">
                  <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {communityMegaMenu.map((column) => (
                      <div key={column.titleKey}>
                        <div
                          className={`mb-2 text-xs font-black uppercase tracking-[0.2em] ${column.accentClass}`}
                        >
                          {t(column.titleKey)}
                        </div>
                        <ul className="ml-2 space-y-1">
                          {column.links.map((link) => (
                            <li key={`${column.titleKey}:${link.href}`}>
                              <Link
                                href={link.href}
                                className="block rounded-lg px-2 py-1.5 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                                onClick={() => {
                                  setMobileMenuOpen(false);
                                  setMobileOpenMenu(null);
                                }}
                              >
                                {t(link.labelKey)}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <Link
              href="/pricing"
              className="block rounded-xl px-4 py-3 text-base font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("nav.pricing")}
            </Link>

            <Link
              href="/help"
              className="block rounded-xl px-4 py-3 text-base font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("nav.help")}
            </Link>
          </div>

          <div className="mt-8 space-y-4">
            <div className="flex w-full items-center justify-center gap-10 rounded-2xl border border-slate-300 dark:border-slate-800 px-5 py-4">
              <button
                type="button"
                onClick={() => switchLanguage("en")}
                className={`text-sm font-bold ${
                  locale === "en" ? "text-slate-900" : "text-slate-500"
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => switchLanguage("bn")}
                className={`text-sm font-bold ${
                  locale === "bn" ? "text-slate-900" : "text-slate-500"
                }`}
              >
                বাংলা
              </button>
            </div>

            <Link
              href="/auth/signin"
              className="block w-full rounded-2xl border border-slate-300 dark:border-slate-800 px-5 py-4 text-center text-base font-bold text-slate-800 dark:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("nav.signIn")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
