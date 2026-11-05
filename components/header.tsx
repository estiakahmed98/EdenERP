"use client";
import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";

import LanguageSwitcher from "@/components/language-switcher";
import ThemeSwitcher from "@/components/theme-switcher";
import { Link, usePathname } from "@/i18n/navigation";
import { appsMegaMenu, type MegaMenuColumn } from "@/lib/apps-menu";
import NextLink from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";

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

const industriesMegaMenu: MegaMenuColumn[] = [
  {
    titleKey: "menu.industries.retail",
    accentClass: "text-teal-600",
    underlineClass: "bg-border",
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
    underlineClass: "bg-border",
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
    underlineClass: "bg-border",
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
    underlineClass: "bg-border",
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
        labelKey: "menu.industries.talentAcquisition",
        href: "/industries/consulting/talent-acquisition",
      },
      {
        labelKey: "menu.industries.auditCertification",
        href: "/industries/consulting/audit-certification",
      },
      {
        labelKey: "modules.industries.links.travelAgency",
        href: "/industries/consulting/travel-agency",
      },
    ],
  },
  {
    titleKey: "menu.industries.garmentsTextile",
    accentClass: "text-violet-500",
    underlineClass: "bg-border",
    links: [
      {
        labelKey: "menu.industries.textile",
        href: "/industries/manufacturing/textile",
      },
      {
        labelKey: "modules.industries.links.garments",
        href: "/industries/garments",
      },
      {
        labelKey: "modules.industries.links.accessories",
        href: "/industries/accessories",
      },
      {
        labelKey: "modules.industries.links.buyingHouse",
        href: "/industries/buying-house",
      },
      {
        labelKey: "modules.industries.links.merchandising",
        href: "/industries/merchandising",
      },
    ],
  },
  {
    titleKey: "menu.industries.manufacturing",
    accentClass: "text-orange-500",
    underlineClass: "bg-border",
    links: [
      { labelKey: "modules.industries.links.steel", href: "/industries/steel" },
      {
        labelKey: "menu.industries.metal",
        href: "/industries/manufacturing/metal",
      },
      {
        labelKey: "menu.industries.furniture",
        href: "/industries/manufacturing/furniture",
      },
      {
        labelKey: "modules.industries.links.agroRice",
        href: "/industries/agro-rice",
      },
    ],
  },
  {
    titleKey: "menu.industries.education",
    accentClass: "text-emerald-600",
    underlineClass: "bg-border",
    links: [
      {
        labelKey: "modules.industries.links.school",
        href: "/industries/school",
      },
      {
        labelKey: "modules.industries.links.college",
        href: "/industries/college",
      },
      {
        labelKey: "modules.industries.links.university",
        href: "/industries/university",
      },
      { labelKey: "modules.industries.links.lms", href: "/industries/lms" },
    ],
  },
  {
    titleKey: "menu.industries.others",
    accentClass: "text-primary",
    underlineClass: "bg-border",
    links: [
      {
        labelKey: "modules.industries.links.ecommerce",
        href: "/industries/ecommerce",
      },
      { labelKey: "modules.industries.links.ngo", href: "/industries/ngo" },
      { labelKey: "modules.industries.links.tv", href: "/industries/tv" },
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
    accentClass: "text-primary",
    underlineClass: "bg-primary/20",
    links: [
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

export default function Header({
  showPricing = true,
}: {
  showPricing?: boolean;
}) {
  const t = useTranslations("layout.header");
  const pathname = usePathname();
  const { data: session } = useSession();
  const navId = useId();
  const headerRef = useRef<HTMLElement | null>(null);
  const desktopNavRef = useRef<HTMLDivElement | null>(null);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDesktopMenu, setOpenDesktopMenu] = useState<MenuId | null>(null);
  const [mobileOpenMenu, setMobileOpenMenu] = useState<MenuId | null>(null);
  const [mobileDrawerTop, setMobileDrawerTop] = useState(0);
  const visibleNavItems = showPricing
    ? navItems
    : navItems.filter((item) => item.href !== "/pricing");

  const isActivePath = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const isActiveMenu = (item: NavItem) => isActivePath(item.href);

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
    function updateMobileDrawerTop() {
      setMobileDrawerTop(headerRef.current?.offsetHeight ?? 0);
    }

    function onResize() {
      updateMobileDrawerTop();

      if (window.innerWidth >= 1280) {
        setMobileMenuOpen(false);
        setMobileOpenMenu(null);
      }
    }

    updateMobileDrawerTop();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className="bn-content sticky top-0 z-50 w-full border-b border-border/70 bg-background/85 backdrop-blur-2xl"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group inline-flex min-w-0 shrink items-center gap-2 transition-transform duration-300"
        >
          <Image
            src="/adon_erp_logo.png"
            alt="Adon ERP logo"
            width={180}
            height={100}
            className="h-9 w-auto shrink-0 sm:h-14 xl:h-16"
            priority
          />
        </Link>

        <div ref={desktopNavRef} className="hidden items-center gap-6 xl:flex">
          {visibleNavItems.map((item) => (
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
                    className={`group relative inline-flex items-center gap-1.5 text-md font-semibold transition-colors ${
                      openDesktopMenu === item.id || isActiveMenu(item)
                        ? "text-primary"
                        : "text-muted-foreground hover:text-primary"
                    }`}
                  >
                    {t(item.labelKey)}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        openDesktopMenu === item.id ? "rotate-180" : ""
                      }`}
                    />
                    <span
                      className={`absolute -bottom-1 start-0 h-0.5 rounded-full bg-primary transition-all duration-300 ${
                        isActiveMenu(item) || openDesktopMenu === item.id
                          ? "w-full"
                          : "w-0 group-hover:w-full"
                      }`}
                    />
                  </button>

                  {openDesktopMenu === item.id && (
                    <div
                      id={`${navId}-${item.id}-panel`}
                      role="dialog"
                      aria-label={`${t(item.labelKey)} menu`}
                      className="fixed left-1/2 top-23 z-50 w-[min(calc(100vw-2rem),1120px)] -translate-x-1/2 overflow-hidden rounded-2xl border border-border bg-popover shadow-2xl"
                    >
                      <div className="border-b border-border bg-linear-to-r from-background via-background to-muted/20 px-6 py-4">
                        <p className="text-sm font-semibold text-popover-foreground">
                          {t("menu.explore", { label: t(item.labelKey) })}
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {t("menu.description")}
                        </p>
                      </div>

                      <div className="max-h-[calc(100vh-200px)] overflow-y-auto px-6 py-5 [scrollbar-color:var(--border)_transparent] [scrollbar-width:thin]">
                        <div className="grid grid-cols-1 gap-x-10 gap-y-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                          {item.megaMenu.map((column) => (
                            <div key={column.titleKey}>
                              <div
                                className={`uppercase ${
                                  item.id === "industries"
                                    ? "ps-2 text-base font-semibold"
                                    : "text-xs font-black tracking-[0.22em]"
                                } ${column.accentClass}`}
                              >
                                {t(column.titleKey)}
                              </div>

                              <div
                                className={`mt-2 h-px w-full ${column.underlineClass}`}
                              />

                              <ul className="mt-3 max-h-58 space-y-2 overflow-y-auto px-px pe-1 [scrollbar-color:var(--border)_transparent] [scrollbar-width:thin]">
                                {column.links.map((link) => (
                                  <li key={`${column.titleKey}:${link.href}`}>
                                    {link.groupKey && (
                                      <p className="mb-2 px-2 text-[11px] font-bold uppercase tracking-wider text-foreground/70">
                                        {t(link.groupKey)}
                                      </p>
                                    )}
                                    <Link
                                      href={link.href}
                                      onClick={() => setOpenDesktopMenu(null)}
                                      className={`block rounded-xl px-2 py-1.5 text-sm font-medium transition-all ${
                                        isActivePath(link.href)
                                          ? "bg-primary/10 text-primary ring-1 ring-primary/15"
                                          : "text-muted-foreground hover:bg-accent/10 hover:text-primary"
                                      }`}
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
                  className={`group relative text-md font-semibold transition-colors ${
                    isActivePath(item.href)
                      ? "text-primary"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {t(item.labelKey)}
                  <span
                    className={`absolute -bottom-1 start-0 h-0.5 rounded-full bg-primary transition-all duration-300 ${
                      isActivePath(item.href)
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              )}
            </div>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <button
            type="button"
            aria-label={t("mobileMenuLabel")}
            className="rounded-xl p-2 text-muted-foreground transition-colors hover:bg-accent/10 hover:text-foreground xl:hidden"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="hidden items-center gap-2 xl:flex">
            <LanguageSwitcher variant="desktop" />
            <ThemeSwitcher variant="desktop" />

            {session?.user ? (
              <div className="flex items-center gap-3 rounded-xl btn-gradient text-white">
                <NextLink
                  href="/admin"
                  className="rounded-xl px-4 py-2 text-sm font-semibold text-white transition-colors"
                >
                  {session.user.name ?? session.user.email}
                </NextLink>
              </div>
            ) : (
              <div className="flex items-center gap-3 rounded-xl btn-gradient text-white">
                <Link
                  href="/auth/signin"
                  className="rounded-xl px-4 py-2 text-sm font-semibold text-white transition-colors"
                >
                  {t("nav.signIn")}
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div
          className="fixed inset-x-0 z-50 overflow-x-hidden overflow-y-auto border-t border-border bg-background px-4 py-5 xl:hidden"
          style={{
            top: mobileDrawerTop,
            maxHeight:
              mobileDrawerTop > 0
                ? `calc(100dvh - ${mobileDrawerTop}px)`
                : "100dvh",
          }}
        >
          <div className="mb-5">
            <ThemeSwitcher variant="mobile" />
          </div>

          <div className="space-y-3">
            {/* Apps Accordion */}
            <div>
              <button
                type="button"
                onClick={() =>
                  setMobileOpenMenu(mobileOpenMenu === "apps" ? null : "apps")
                }
                className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-start text-base font-bold text-foreground hover:bg-accent/10"
              >
                {t("nav.apps")}
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    mobileOpenMenu === "apps" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {mobileOpenMenu === "apps" && (
                <div className="mt-3 rounded-2xl border border-border bg-card p-4">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {appsMegaMenu.map((column) => (
                      <div key={column.titleKey}>
                        <div
                          className={`mb-3 border-b border-border pb-2 text-xs font-black uppercase tracking-[0.2em] ${column.accentClass}`}
                        >
                          {t(column.titleKey)}
                        </div>

                        <ul className="max-h-64 space-y-2 overflow-y-auto px-px pe-1 [scrollbar-color:var(--border)_transparent] [scrollbar-width:thin]">
                          {column.links.map((link) => (
                            <li key={`${column.titleKey}:${link.href}`}>
                              {link.groupKey && (
                                <p className="mb-2 px-2 text-[11px] font-bold uppercase tracking-wider text-foreground/70">
                                  {t(link.groupKey)}
                                </p>
                              )}
                              <Link
                                href={link.href}
                                className={`block rounded-lg px-2 py-2 text-sm font-semibold transition-colors ${
                                  isActivePath(link.href)
                                    ? "bg-primary/10 text-primary ring-1 ring-primary/15"
                                    : "text-muted-foreground hover:bg-accent/10 hover:text-foreground"
                                }`}
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
                className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-start text-base font-bold text-foreground hover:bg-accent/10"
              >
                {t("nav.industries")}
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    mobileOpenMenu === "industries" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {mobileOpenMenu === "industries" && (
                <div className="mt-3 rounded-2xl border border-border bg-card p-4">
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {industriesMegaMenu.map((column) => (
                      <div key={column.titleKey}>
                        <div
                          className={`mb-2 text-xs font-black uppercase tracking-[0.2em] ${column.accentClass}`}
                        >
                          {t(column.titleKey)}
                        </div>
                        <ul className="ms-2 max-h-53 space-y-1 overflow-y-auto px-px pe-1 [scrollbar-color:var(--border)_transparent] [scrollbar-width:thin]">
                          {column.links.map((link) => (
                            <li key={`${column.titleKey}:${link.href}`}>
                              <Link
                                href={link.href}
                                className={`block wrap-break-word rounded-lg px-2 py-1.5 text-sm font-semibold transition-colors ${
                                  isActivePath(link.href)
                                    ? "bg-primary/10 text-primary ring-1 ring-primary/15"
                                    : "text-muted-foreground hover:bg-accent/10 hover:text-foreground"
                                }`}
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

            {/* Community Accordion */}
            <div>
              <button
                type="button"
                onClick={() =>
                  setMobileOpenMenu(
                    mobileOpenMenu === "community" ? null : "community",
                  )
                }
                className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-start text-base font-bold text-foreground hover:bg-accent/10"
              >
                {t("nav.community")}
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    mobileOpenMenu === "community" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {mobileOpenMenu === "community" && (
                <div className="mt-3 rounded-2xl border border-border bg-card p-4">
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {communityMegaMenu.map((column) => (
                      <div key={column.titleKey}>
                        <div
                          className={`mb-2 text-xs font-black uppercase tracking-[0.2em] ${column.accentClass}`}
                        >
                          {t(column.titleKey)}
                        </div>
                        <ul className="ms-2 space-y-1">
                          {column.links.map((link) => (
                            <li key={`${column.titleKey}:${link.href}`}>
                              <Link
                                href={link.href}
                                className={`block wrap-break-word rounded-lg px-2 py-1.5 text-sm font-semibold transition-colors ${
                                  isActivePath(link.href)
                                    ? "bg-primary/10 text-primary ring-1 ring-primary/15"
                                    : "text-muted-foreground hover:bg-accent/10 hover:text-foreground"
                                }`}
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

            {showPricing && (
              <Link
                href="/pricing"
                className={`block rounded-xl px-4 py-3 text-base font-bold transition-colors ${
                  isActivePath("/pricing")
                    ? "bg-primary/10 text-primary ring-1 ring-primary/15"
                    : "text-foreground hover:bg-accent/10"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("nav.pricing")}
              </Link>
            )}

            <Link
              href="/help"
              className={`block rounded-xl px-4 py-3 text-base font-bold transition-colors ${
                isActivePath("/help")
                  ? "bg-primary/10 text-primary ring-1 ring-primary/15"
                  : "text-foreground hover:bg-accent/10"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("nav.help")}
            </Link>
          </div>

          <div className="mt-8 space-y-4">
            <LanguageSwitcher variant="mobile" />

            {session?.user ? (
              <NextLink
                href="/admin"
                className="block w-full rounded-2xl border border-border bg-card px-5 py-4 text-center text-base font-bold text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                {session.user.name ?? session.user.email}
              </NextLink>
            ) : (
              <Link
                href="/auth/signin"
                className="block w-full rounded-2xl btn-gradient px-5 py-4 text-center text-base font-bold text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("nav.signIn")}
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
