"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const navId = useId();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDesktopMenu, setOpenDesktopMenu] = useState<
    "apps" | "industries" | "community" | null
  >(null);
  const desktopNavRef = useRef<HTMLDivElement | null>(null);

  const appsMegaMenu = [
    {
      title: "Finance",
      accentClass: "text-teal-600",
      underlineClass: "bg-teal-200",
      links: [
        "Accounting",
        "Invoicing",
        "Expenses",
        "Spreadsheet (BI)",
        "Documents",
        "Sign",
      ],
    },
    {
      title: "Sales",
      accentClass: "text-rose-500",
      underlineClass: "bg-rose-200",
      links: [
        "CRM",
        "Sales",
        "POS Shop",
        "POS Restaurant",
        "Subscriptions",
        "Rental",
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
        "PLM",
        "Purchase",
        "Maintenance",
        "Quality",
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
        "Referrals",
        "Fleet",
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
        "Marketing Automation",
        "Surveys",
      ],
    },
    {
      title: "Services",
      accentClass: "text-orange-600",
      underlineClass: "bg-orange-200",
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
        "IoT",
        "VoIP",
        "Knowledge",
        "WhatsApp",
      ],
    },
  ];

  const industriesMegaMenu = [
    {
      title: "Retail",
      accentClass: "text-teal-600",
      underlineClass: "bg-teal-200",
      links: [
        "Book Store",
        "Clothing Store",
        "Furniture Store",
        "Grocery Store",
        "Hardware Store",
        "Toy Store",
      ],
    },
    {
      title: "Food & Hospitality",
      accentClass: "text-sky-600",
      underlineClass: "bg-sky-200",
      links: [
        "Bar and Pub",
        "Restaurant",
        "Fast Food",
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
        "Property Owner Association",
      ],
    },
    {
      title: "Consulting",
      accentClass: "text-indigo-500",
      underlineClass: "bg-indigo-200",
      links: [
        "Accounting Firm",
        "Odoo Partner",
        "Marketing Agency",
        "Law firm",
        "Talent Acquisition",
        "Audit & Certification",
      ],
    },
    {
      title: "Manufacturing",
      accentClass: "text-violet-600",
      underlineClass: "bg-violet-200",
      links: [
        "Textile",
        "Metal",
        "Furnitures",
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
        "Eyewear Store",
        "Fitness Center",
        "Wellness Practitioners",
        "Pharmacy",
        "Hair Salon",
      ],
    },
    {
      title: "Trades",
      accentClass: "text-orange-600",
      underlineClass: "bg-orange-200",
      links: [
        "Handyman",
        "IT Hardware & Support",
        "Solar Energy Systems",
        "Shoe Maker",
        "Cleaning Services",
        "HVAC Services",
      ],
    },
    {
      title: "Others",
      accentClass: "text-purple-600",
      underlineClass: "bg-purple-200",
      links: [
        "Nonprofit Organization",
        "Environmental Agency",
        "Billboard Rental",
        "Photography",
        "Bike Leasing",
        "Software Reseller",
      ],
    },
  ];

  const navItems = [
    {
      label: "Apps",
      href: "/apps",
      id: "apps" as const,
      megaMenu: appsMegaMenu,
    },
    {
      label: "Industries",
      href: "/industries",
      id: "industries" as const,
      megaMenu: industriesMegaMenu,
    },
    {
      label: "Community",
      href: "/community",
      id: "community" as const,
      megaMenu: [
        {
          title: "Learn",
          accentClass: "text-orange-500",
          underlineClass: "bg-orange-200",
          links: [
            "Tutorials",
            "Documentation",
            "Certifications",
            "Training",
            "Blog",
            "Podcast",
          ],
        },
        {
          title: "Empower Education",
          accentClass: "text-orange-600",
          underlineClass: "bg-orange-200",
          links: ["Education Program", "Scale Up! Business Game", "Visit Odoo"],
        },
        {
          title: "Get The Software",
          accentClass: "text-teal-600",
          underlineClass: "bg-teal-200",
          links: ["Download", "Compare Editions", "Releases"],
        },
        {
          title: "Collaborate",
          accentClass: "text-purple-600",
          underlineClass: "bg-purple-200",
          links: [
            "Github",
            "Forum",
            "Events",
            "Translations",
            "Become a Partner",
            "Services for Partners",
            "Register your Accounting Firm",
          ],
        },
        {
          title: "Get Services",
          accentClass: "text-sky-600",
          underlineClass: "bg-sky-200",
          links: [
            "Find a Partner",
            "Find an Accountant",
            "Meet an advisor",
            "Implementation Services",
            "Customer References",
            "Support",
            "Upgrades",
          ],
        },
      ],
    },
    { label: "Pricing", href: "/pricing" },
    { label: "Help", href: "/help" },
  ];

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
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-sm border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-bold text-xl hidden sm:inline text-foreground">
            Eden Erp
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div ref={desktopNavRef} className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <div key={item.href} className="relative group">
              {item.megaMenu ? (
                <>
                  <button
                    type="button"
                    aria-haspopup="dialog"
                    aria-expanded={openDesktopMenu === item.id}
                    aria-controls={`${navId}-${item.id}-panel`}
                    className="text-foreground hover:text-primary font-medium transition-colors relative"
                    onClick={() =>
                      setOpenDesktopMenu((prev) =>
                        prev === item.id ? null : item.id,
                      )
                    }
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r from-primary to-accent group-hover:w-full transition-all duration-300"></span>
                  </button>

                  {openDesktopMenu === item.id && (
                    <div
                      id={`${navId}-${item.id}-panel`}
                      role="dialog"
                      aria-label={`${item.label} menu`}
                      className="absolute left-1/2 top-full z-50 mt-5 w-[min(1100px,calc(100vw-2rem))] -translate-x-1/2"
                    >
                      <div className="rounded-2xl border border-border bg-background shadow-xl ring-1 ring-border/50">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-10 p-8 lg:p-10">
                          {item.megaMenu.map((col) => (
                            <div key={col.title}>
                              <div
                                className={`text-xs font-bold tracking-widest uppercase ${col.accentClass}`}
                              >
                                {col.title}
                              </div>
                              <div
                                className={`mt-2 h-px w-full ${col.underlineClass}`}
                              />
                              <ul className="mt-4 space-y-3">
                                {(() => {
                                  // Map section title to route
                                  const sectionRouteMap = {
                                    Learn: "/community/learn",
                                    "Empower Education":
                                      "/community/empower-education",
                                    "Get The Software":
                                      "/community/get-the-software",
                                    Collaborate: "/community/collaborate",
                                    "Get Services": "/community/get-services",
                                  };
                                  return col.links.map((label, idx) => (
                                    <li key={`${col.title}:${label}`}>
                                      <Link
                                        href={
                                          sectionRouteMap[col.title] ||
                                          "/community"
                                        }
                                        className="text-left text-sm text-foreground/80 hover:text-primary transition-colors block"
                                        onClick={() => setOpenDesktopMenu(null)}
                                      >
                                        {label}
                                      </Link>
                                    </li>
                                  ));
                                })()}
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
                  className="text-foreground hover:text-primary font-medium transition-colors relative"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r from-primary to-accent group-hover:w-full transition-all duration-300"></span>
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          <button className="px-6 py-2 rounded-lg bg-linear-to-r from-primary to-secondary text-primary-foreground font-semibold hover:shadow-lg transition-all hover:scale-105">
            Get Started
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-card">
          <div className="px-4 py-4 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-2 text-foreground hover:bg-muted rounded-lg transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <button className="w-full px-6 py-2 rounded-lg bg-linear-to-r from-primary to-secondary text-primary-foreground font-semibold hover:shadow-lg transition-all mt-4">
              Get Started
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
