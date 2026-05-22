"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import LanguageSwitcher from "@/components/language-switcher";

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
      { labelKey: "menu.apps.sign", href: "/apps/Finance/esign" }
    ]
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
        href: "/apps/sales/pos-restaurant"
      },
      {
        labelKey: "menu.apps.subscriptions",
        href: "/apps/sales/subscriptions"
      },
      { labelKey: "menu.apps.rental", href: "/apps/sales/rental" }
    ]
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
      { labelKey: "menu.apps.elearning", href: "/apps/website/elearning" }
    ]
  },
  {
    titleKey: "menu.apps.supplyChain",
    accentClass: "text-indigo-500",
    underlineClass: "bg-indigo-200",
    links: [
      { labelKey: "menu.apps.inventory", href: "/apps/supply-chain/inventory" },
      {
        labelKey: "menu.apps.manufacturing",
        href: "/apps/supply-chain/manufacturing"
      },
      { labelKey: "menu.apps.purchase", href: "/apps/supply-chain/purchase" },
      {
        labelKey: "menu.apps.maintenance",
        href: "/apps/supply-chain/maintenance"
      },
      { labelKey: "menu.apps.quality", href: "/apps/supply-chain/quality" },
      { labelKey: "menu.apps.barcode", href: "/apps/supply-chain/barcode" }
    ]
  },
  {
    titleKey: "menu.apps.humanResources",
    accentClass: "text-violet-600",
    underlineClass: "bg-violet-200",
    links: [
      {
        labelKey: "menu.apps.employees",
        href: "/apps/human-resources/employees"
      },
      {
        labelKey: "menu.apps.recruitment",
        href: "/apps/human-resources/recruitment"
      },
      { labelKey: "menu.apps.timeOff", href: "/apps/human-resources/time-off" },
      {
        labelKey: "menu.apps.appraisals",
        href: "/apps/human-resources/appraisals"
      },
      {
        labelKey: "menu.apps.attendance",
        href: "/apps/human-resources/attendance"
      },
      { labelKey: "menu.apps.payroll", href: "/apps/human-resources/payroll" }
    ]
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
        href: "/apps/services/appointments"
      }
    ]
  },
  {
    titleKey: "menu.apps.productivity",
    accentClass: "text-purple-600",
    underlineClass: "bg-purple-200",
    links: [
      { labelKey: "menu.apps.discuss", href: "/apps/productivity/discuss" },
      {
        labelKey: "menu.apps.artificialIntelligence",
        href: "/apps/productivity/artificial-intelligence"
      },
      { labelKey: "menu.apps.iot", href: "/apps/productivity/iot" }
    ]
  }
];

const industriesMegaMenu: MegaMenuColumn[] = [
  {
    titleKey: "menu.industries.retail",
    accentClass: "text-emerald-600",
    underlineClass: "bg-emerald-200",
    links: [
      { labelKey: "menu.industries.bookStore", href: "/industries/retail/book-store" },
      {
        labelKey: "menu.industries.clothingStore",
        href: "/industries/retail/clothing-store"
      },
      {
        labelKey: "menu.industries.furnitureStore",
        href: "/industries/retail/furniture-store"
      },
      {
        labelKey: "menu.industries.groceryStore",
        href: "/industries/retail/grocery-store"
      },
      {
        labelKey: "menu.industries.hardwareStore",
        href: "/industries/retail/hardware-store"
      },
      { labelKey: "menu.industries.toyStore", href: "/industries/retail/toy-store" }
    ]
  },
  {
    titleKey: "menu.industries.foodHospitality",
    accentClass: "text-sky-600",
    underlineClass: "bg-sky-200",
    links: [
      {
        labelKey: "menu.industries.restaurant",
        href: "/industries/food&hospitality/restaurant"
      },
      {
        labelKey: "menu.industries.fastFood",
        href: "/industries/food&hospitality/fast-food"
      },
      {
        labelKey: "menu.industries.guestHouse",
        href: "/industries/food&hospitality/guest-house"
      },
      {
        labelKey: "menu.industries.beverageDistributor",
        href: "/industries/food&hospitality/beverage-distributor"
      },
      { labelKey: "menu.industries.hotel", href: "/industries/food&hospitality/hotel" }
    ]
  },
  {
    titleKey: "menu.industries.realEstate",
    accentClass: "text-rose-500",
    underlineClass: "bg-rose-200",
    links: [
      {
        labelKey: "menu.industries.realEstateAgency",
        href: "/industries/realestate/real-estate-agency"
      },
      {
        labelKey: "menu.industries.architectureFirm",
        href: "/industries/realestate/architecture-firm"
      },
      {
        labelKey: "menu.industries.construction",
        href: "/industries/realestate/construction"
      }
    ]
  },
  {
    titleKey: "menu.industries.consulting",
    accentClass: "text-indigo-500",
    underlineClass: "bg-indigo-200",
    links: [
      {
        labelKey: "menu.industries.accountingFirm",
        href: "/industries/consulting/accounting-firm"
      },
      {
        labelKey: "menu.industries.marketingAgency",
        href: "/industries/consulting/marketing-agency"
      },
      {
        labelKey: "menu.industries.auditCertification",
        href: "/industries/consulting/audit-certification"
      },
      {
        labelKey: "menu.industries.talentAcquisition",
        href: "/industries/consulting/talent-acquisition"
      }
    ]
  },
  {
    titleKey: "menu.industries.manufacturing",
    accentClass: "text-violet-600",
    underlineClass: "bg-violet-200",
    links: [
      { labelKey: "menu.industries.textile", href: "/industries/manufacturing/textile" },
      { labelKey: "menu.industries.metal", href: "/industries/manufacturing/metal" },
      { labelKey: "menu.industries.furniture", href: "/industries/manufacturing/furniture" }
    ]
  }
];

const communityMegaMenu: MegaMenuColumn[] = [
  {
    titleKey: "menu.community.learn",
    accentClass: "text-orange-500",
    underlineClass: "bg-orange-200",
    links: [
      { labelKey: "menu.community.tutorials", href: "/community/learn/tutorials" },
      {
        labelKey: "menu.community.documentation",
        href: "/community/learn/documentation"
      },
      { labelKey: "menu.community.training", href: "/community/learn/training" },
      { labelKey: "menu.community.blog", href: "/community/learn/blog" }
    ]
  },
  {
    titleKey: "menu.community.getServices",
    accentClass: "text-sky-600",
    underlineClass: "bg-sky-200",
    links: [
      {
        labelKey: "menu.community.findPartner",
        href: "/community/get-services/find-partner"
      },
      {
        labelKey: "menu.community.meetAdvisor",
        href: "/community/get-services/meet-advisor"
      },
      {
        labelKey: "menu.community.implementation",
        href: "/community/get-services/implementation"
      },
      { labelKey: "menu.community.support", href: "/community/get-services/support" },
      {
        labelKey: "menu.community.customerStories",
        href: "/community/get-services/customer-stories"
      }
    ]
  },
  {
    titleKey: "menu.community.collaborate",
    accentClass: "text-purple-600",
    underlineClass: "bg-purple-200",
    links: [
      { labelKey: "menu.community.github", href: "/community/collaborate/github" },
      { labelKey: "menu.community.forum", href: "/community/collaborate/forum" },
      { labelKey: "menu.community.events", href: "/community/collaborate/events" },
      {
        labelKey: "menu.community.translations",
        href: "/community/collaborate/translations"
      },
      {
        labelKey: "menu.community.becomePartner",
        href: "/community/collaborate/become-a-partner"
      }
    ]
  }
];

const navItems: NavItem[] = [
  { labelKey: "nav.apps", href: "/apps", id: "apps", megaMenu: appsMegaMenu },
  {
    labelKey: "nav.industries",
    href: "/industries",
    id: "industries",
    megaMenu: industriesMegaMenu
  },
  {
    labelKey: "nav.community",
    href: "/community",
    id: "community",
    megaMenu: communityMegaMenu
  },
  { labelKey: "nav.pricing", href: "/pricing" },
  { labelKey: "nav.help", href: "/help" }
];

export default function Header() {
  const t = useTranslations("Header");
  const navId = useId();
  const desktopNavRef = useRef<HTMLDivElement | null>(null);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDesktopMenu, setOpenDesktopMenu] = useState<MenuId | null>(null);

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

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/70 bg-white/85 backdrop-blur-2xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="group relative flex items-center gap-0">
          <div className="relative">
            <span
              className="relative inline-block transition-all duration-300 group-hover:scale-105"
              style={{
                fontFamily:
                  '"Hauser Script", "Segoe Script", "Brush Script MT", "Segoe Print", cursive',
                fontSize: "32px",
                fontWeight: 900,
                background:
                  "linear-gradient(135deg, #0f172a 0%, #1e293b 45%, #0ea5e9 70%, #10b981 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                letterSpacing: "-0.06em"
              }}
            >
              Adon
            </span>

            <div className="absolute -bottom-1 left-0 h-0.5 w-0 bg-linear-to-r from-emerald-500 to-cyan-500 transition-all duration-500 group-hover:w-full" />
          </div>

          <span
            className="mx-1 inline-block transition-all duration-300 group-hover:rotate-0"
            style={{
              fontFamily:
                '"Hauser Script", "Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
              fontSize: "12px",
              fontWeight: 200,
              color: "#cbd5e1",
              transform: "rotate(-12deg)"
            }}
          >
            -
          </span>

          <div className="relative">
            <div className="absolute inset-0 rounded-lg bg-linear-to-r from-emerald-500/20 to-cyan-500/20 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />

            <span
              className="relative inline-block rounded-lg px-2 py-0.5 font-black uppercase tracking-wider transition-all duration-300 group-hover:scale-105"
              style={{
                fontFamily:
                  '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
                fontSize: "20px",
                background: "linear-gradient(135deg, #10b981 0%, #06b6d4 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                letterSpacing: "0.1em"
              }}
            >
              ERP
            </span>
          </div>
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
                        prev === item.id ? null : item.id
                      )
                    }
                    className={`group inline-flex items-center gap-1.5 text-sm font-semibold transition-colors ${
                      openDesktopMenu === item.id
                        ? "text-cyan-700"
                        : "text-slate-700 hover:text-cyan-700"
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
                      className="absolute left-1/2 top-full z-50 mt-6 w-[min(1120px,calc(100vw-2rem))] -translate-x-1/2"
                    >
                      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_30px_90px_rgba(15,23,42,0.14)] ring-1 ring-slate-200/60">
                        <div className="border-b border-slate-100 bg-linear-to-r from-slate-50 to-white px-8 py-5">
                          <p className="text-sm font-semibold text-slate-950">
                            {t("menu.explore", { label: t(item.labelKey) })}
                          </p>
                          <p className="mt-1 text-sm text-slate-500">
                            {t("menu.description")}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-x-10 gap-y-9 p-8 lg:grid-cols-4 lg:p-10">
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

                              <ul className="mt-4 space-y-2.5">
                                {column.links.map((link) => (
                                  <li key={`${column.titleKey}:${link.href}`}>
                                    <Link
                                      href={link.href}
                                      onClick={() => setOpenDesktopMenu(null)}
                                      className="block rounded-xl px-2 py-1.5 text-sm font-medium text-slate-600 transition-all hover:bg-slate-50 hover:text-cyan-700"
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
                  className="group relative text-sm font-semibold text-slate-700 transition-colors hover:text-cyan-700"
                >
                  {t(item.labelKey)}
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 rounded-full bg-linear-to-r from-cyan-500 to-emerald-500 transition-all duration-300 group-hover:w-full" />
                </Link>
              )}
            </div>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher />

          <Link
            href="/login"
            className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-950"
          >
            {t("nav.signIn")}
          </Link>

          <Link
            href="/pricing"
            className="rounded-xl bg-linear-to-r from-[#5B3B5F] to-cyan-700 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-cyan-500/20 transition-all hover:-translate-y-0.5 hover:shadow-xl"
          >
            {t("nav.tryFree")}
          </Link>
        </div>

        <button
          type="button"
          aria-label={t("mobileMenuLabel")}
          className="rounded-xl p-2 text-slate-700 transition-colors hover:bg-slate-100 md:hidden"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="space-y-4 px-4 py-4">
            <LanguageSwitcher mobile />

            <div className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 hover:text-cyan-700"
                >
                  {t(item.labelKey)}
                </Link>
              ))}
            </div>

            <div className="grid gap-3 pt-2">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl border border-slate-200 px-5 py-3 text-center text-sm font-semibold text-slate-700"
              >
                {t("nav.signIn")}
              </Link>

              <Link
                href="/pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl bg-linear-to-r from-[#5B3B5F] to-cyan-700 px-5 py-3 text-center text-sm font-bold text-white shadow-lg shadow-cyan-500/20"
              >
                {t("nav.tryFree")}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
