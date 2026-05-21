"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown, Menu, Sparkles, X } from "lucide-react";

type MegaMenuLink = {
  label: string;
  href?: string;
};

type MegaMenuColumn = {
  title: string;
  accentClass: string;
  underlineClass: string;
  links: Array<string | MegaMenuLink>;
};

type NavItem =
  | {
      label: string;
      href: string;
      id: "apps" | "industries" | "community";
      megaMenu: MegaMenuColumn[];
    }
  | {
      label: string;
      href: string;
      id?: never;
      megaMenu?: never;
    };

export default function Header() {
  const navId = useId();
  const desktopNavRef = useRef<HTMLDivElement | null>(null);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDesktopMenu, setOpenDesktopMenu] = useState<
    "apps" | "industries" | "community" | null
  >(null);

  const appsMegaMenu: MegaMenuColumn[] = [
    {
      title: "Finance",
      accentClass: "text-emerald-600",
      underlineClass: "bg-emerald-200",
      links: [
        { label: "Accounting", href: "/apps/Finance/Accounting" },
        { label: "Invoicing", href: "/apps/Finance/Invoicing" },
        { label: "Expenses", href: "/apps/Finance/Expenses" },
        { label: "Spreadsheet", href: "/apps/Finance/Spreadsheet" },
        { label: "Documents", href: "/apps/Finance/Documents" },
        { label: "Sign", href: "/apps/Finance/esign" },
      ],
    },
    {
      title: "Sales",
      accentClass: "text-rose-500",
      underlineClass: "bg-rose-200",
      links: [
        { label: "CRM", href: "/apps/sales/crm" },
        { label: "Sales", href: "/apps/sales" },
        { label: "POS Shop", href: "/apps/sales/pos" },
        { label: "POS Restaurant", href: "/apps/sales/pos-restaurant" },
        { label: "Subscriptions", href: "/apps/sales/subscriptions" },
        { label: "Rental", href: "/apps/sales/rental" },
      ],
    },
    {
      title: "Websites",
      accentClass: "text-sky-600",
      underlineClass: "bg-sky-200",
      links: [
        "Website Builder",
        "eCommerce",
        "Blog",
        "Forum",
        "Live Chat",
        "eLearning",
      ],
    },
    {
      title: "Supply Chain",
      accentClass: "text-indigo-500",
      underlineClass: "bg-indigo-200",
      links: [
        "Inventory",
        "Manufacturing",
        "Purchase",
        "Maintenance",
        "Quality",
        "Barcode",
      ],
    },
    {
      title: "Human Resources",
      accentClass: "text-violet-600",
      underlineClass: "bg-violet-200",
      links: [
        "Employees",
        "Recruitment",
        "Time Off",
        "Appraisals",
        "Attendance",
        "Payroll",
      ],
    },
    {
      title: "Marketing",
      accentClass: "text-orange-500",
      underlineClass: "bg-orange-200",
      links: [
        "Social Marketing",
        "Email Marketing",
        "SMS Marketing",
        "Events",
        "Automation",
        "Surveys",
      ],
    },
    {
      title: "Services",
      accentClass: "text-cyan-600",
      underlineClass: "bg-cyan-200",
      links: [
        "Project",
        "Timesheets",
        "Field Service",
        "Helpdesk",
        "Planning",
        "Appointments",
      ],
    },
    {
      title: "Productivity",
      accentClass: "text-purple-600",
      underlineClass: "bg-purple-200",
      links: [
        "Discuss",
        "Artificial Intelligence",
        "Knowledge",
        "VoIP",
        "WhatsApp",
        "Approvals",
      ],
    },
  ];

  const industriesMegaMenu: MegaMenuColumn[] = [
    {
      title: "Retail",
      accentClass: "text-emerald-600",
      underlineClass: "bg-emerald-200",
      links: [
        { label: "Book Store", href: "/industries/retail/book-store" },
        { label: "Clothing Store", href: "/industries/retail/clothing-store" },
        {
          label: "Furniture Store",
          href: "/industries/retail/furniture-store",
        },
        {
          label: "Grocery Store",
          href: "/industries/retail/grocery-store",
        },
        {
          label: "Hardware Store",
          href: "/industries/retail/hardware-store",
        },
        {
          label: "Toy Store",
          href: "/industries/retail/toy-store",
        },
      
      ],
    },
    {
      title: "Food & Hospitality",
      accentClass: "text-sky-600",
      underlineClass: "bg-sky-200",
      links: [
        { label: "Restaurant", href: "/industries/food&hospitality/restaurant" },
        { label: "Fast Food", href: "/industries/food&hospitality/fast-food" },
        "Guest House",
        "Beverage Distributor",
        "Hotel",
      ],
    },
    {
      title: "Real Estate",
      accentClass: "text-rose-500",
      underlineClass: "bg-rose-200",
      links: [
        "Real Estate Agency",
        "Architecture Firm",
        "Construction",
        "Property Management",
        "Gardening",
      ],
    },
    {
      title: "Consulting",
      accentClass: "text-indigo-500",
      underlineClass: "bg-indigo-200",
      links: [
        "Accounting Firm",
        "Marketing Agency",
        "Law Firm",
        "Audit & Certification",
        "Talent Acquisition",
      ],
    },
    {
      title: "Manufacturing",
      accentClass: "text-violet-600",
      underlineClass: "bg-violet-200",
      links: [
        "Textile",
        "Metal",
        "Furniture",
        "Food",
        "Brewery",
        "Corporate Gifts",
      ],
    },
    {
      title: "Health & Fitness",
      accentClass: "text-orange-500",
      underlineClass: "bg-orange-200",
      links: [
        "Sports Club",
        "Fitness Center",
        "Wellness",
        "Pharmacy",
        "Hair Salon",
        "Eyewear Store",
      ],
    },
    {
      title: "Trades",
      accentClass: "text-cyan-600",
      underlineClass: "bg-cyan-200",
      links: [
        "Handyman",
        "IT Support",
        "Solar Energy",
        "Cleaning Services",
        "HVAC Services",
      ],
    },
    {
      title: "Others",
      accentClass: "text-purple-600",
      underlineClass: "bg-purple-200",
      links: [
        "Nonprofit",
        "Photography",
        "Bike Leasing",
        "Software Reseller",
        "Agency",
      ],
    },
  ];

  const communityMegaMenu: MegaMenuColumn[] = [
    {
      title: "Learn",
      accentClass: "text-orange-500",
      underlineClass: "bg-orange-200",
      links: ["Tutorials", "Documentation", "Training", "Blog", "Podcast"],
    },
    {
      title: "Get Services",
      accentClass: "text-sky-600",
      underlineClass: "bg-sky-200",
      links: [
        "Find a Partner",
        "Meet an Advisor",
        "Implementation",
        "Support",
        "Customer Stories",
      ],
    },
    {
      title: "Collaborate",
      accentClass: "text-purple-600",
      underlineClass: "bg-purple-200",
      links: ["GitHub", "Forum", "Events", "Translations", "Become a Partner"],
    },
  ];

  const navItems: NavItem[] = [
    { label: "Apps", href: "/apps", id: "apps", megaMenu: appsMegaMenu },
    {
      label: "Industries",
      href: "/industries",
      id: "industries",
      megaMenu: industriesMegaMenu,
    },
    {
      label: "Community",
      href: "/community",
      id: "community",
      megaMenu: communityMegaMenu,
    },
    { label: "Pricing", href: "/pricing" },
    { label: "Help", href: "/help" },
  ];

  const normalizeMegaMenuLinks = (links: Array<string | MegaMenuLink>) =>
    links.map((link) => (typeof link === "string" ? { label: link } : link));

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      if (!openDesktopMenu) return;

      const target = event.target as Node | null;
      if (!target) return;
      if (desktopNavRef.current?.contains(target)) return;

      setOpenDesktopMenu(null);
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpenDesktopMenu(null);
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
        <Link href="/" className={`group relative flex items-center gap-0`}>
          {/* Eden Text */}
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
                letterSpacing: "-0.06em",
              }}
            >
              Eden
            </span>

            {/* Animated underline */}
            <div className="absolute -bottom-1 left-0 h-0.5 w-0 bg-linear-to-r from-emerald-500 to-cyan-500 transition-all duration-500 group-hover:w-full" />
          </div>

          {/* Dash separator */}
          <span
            className="mx-1 inline-block transition-all duration-300 group-hover:rotate-0"
            style={{
              fontFamily:
                '"Hauser Script", "Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
              fontSize: "12px",
              fontWeight: 200,
              color: "#cbd5e1",
              transform: "rotate(-12deg)",
            }}
          >
            —
          </span>

          {/* ERP Badge */}
          <div className="relative">
            {/* Background glow */}
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
                letterSpacing: "0.1em",
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
                        prev === item.id ? null : item.id,
                      )
                    }
                    className={`group inline-flex items-center gap-1.5 text-sm font-semibold transition-colors ${
                      openDesktopMenu === item.id
                        ? "text-cyan-700"
                        : "text-slate-700 hover:text-cyan-700"
                    }`}
                  >
                    {item.label}
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
                      aria-label={`${item.label} menu`}
                      className="absolute left-1/2 top-full z-50 mt-6 w-[min(1120px,calc(100vw-2rem))] -translate-x-1/2"
                    >
                      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_30px_90px_rgba(15,23,42,0.14)] ring-1 ring-slate-200/60">
                        <div className="border-b border-slate-100 bg-linear-to-r from-slate-50 to-white px-8 py-5">
                          <p className="text-sm font-semibold text-slate-950">
                            Explore Eden ERP {item.label}
                          </p>
                          <p className="mt-1 text-sm text-slate-500">
                            Premium business tools connected in one unified ERP
                            platform.
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-x-10 gap-y-9 p-8 lg:grid-cols-4 lg:p-10">
                          {item.megaMenu.map((col) => (
                            <div key={col.title}>
                              <div
                                className={`text-xs font-black uppercase tracking-[0.22em] ${col.accentClass}`}
                              >
                                {col.title}
                              </div>

                              <div
                                className={`mt-2 h-px w-full ${col.underlineClass}`}
                              />

                              <ul className="mt-4 space-y-2.5">
                                {normalizeMegaMenuLinks(col.links).map(
                                  (link) => (
                                    <li key={`${col.title}:${link.label}`}>
                                      <Link
                                        href={link.href ?? item.href}
                                        onClick={() => setOpenDesktopMenu(null)}
                                        className="block rounded-xl px-2 py-1.5 text-sm font-medium text-slate-600 transition-all hover:bg-slate-50 hover:text-cyan-700"
                                      >
                                        {link.label}
                                      </Link>
                                    </li>
                                  ),
                                )}
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
                  className="relative text-sm font-semibold text-slate-700 transition-colors hover:text-cyan-700"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 rounded-full bg-linear-to-r from-cyan-500 to-emerald-500 transition-all duration-300 hover:w-full" />
                </Link>
              )}
            </div>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-950"
          >
            Sign in
          </Link>

          <Link
            href="/pricing"
            className="rounded-xl bg-linear-to-r from-[#5B3B5F] to-cyan-700 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-cyan-500/20 transition-all hover:-translate-y-0.5 hover:shadow-xl"
          >
            Try it free
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          className="rounded-xl p-2 text-slate-700 transition-colors hover:bg-slate-100 md:hidden"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="space-y-1 px-4 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 hover:text-cyan-700"
              >
                {item.label}
              </Link>
            ))}

            <div className="grid gap-3 pt-4">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl border border-slate-200 px-5 py-3 text-center text-sm font-semibold text-slate-700"
              >
                Sign in
              </Link>

              <Link
                href="/pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl bg-linear-to-r from-[#5B3B5F] to-cyan-700 px-5 py-3 text-center text-sm font-bold text-white shadow-lg shadow-cyan-500/20"
              >
                Try it free
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
