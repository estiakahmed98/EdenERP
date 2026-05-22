"use client";

import Link from "next/link";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Apps: [
      { label: "Accounting", href: "/apps/Finance/Accounting" },
      { label: "CRM", href: "/apps/sales/crm" },
      { label: "eCommerce", href: "/apps/website/ecommerce" },
      { label: "Inventory", href: "/apps/supply-chain/inventory" },
      { label: "Employees", href: "/apps/human-resources/employees" },
      { label: "Project", href: "/apps/services/project" },
    ],
    Industries: [
      { label: "Book Store", href: "/industries/retail/book-store" },
      { label: "Restaurant", href: "/industries/food&hospitality/restaurant" },
      { label: "Hotel", href: "/industries/food&hospitality/hotel" },
      {
        label: "Real Estate Agency",
        href: "/industries/realestate/real-estate-agency",
      },
      {
        label: "Marketing Agency",
        href: "/industries/consulting/marketing-agency",
      },
      { label: "Manufacturing", href: "/industries/manufacturing/textile" },
    ],
    Community: [
      { label: "Tutorials", href: "/community/learn/tutorials" },
      { label: "Documentation", href: "/community/learn/documentation" },
      { label: "Training", href: "/community/learn/training" },
      { label: "Find a Partner", href: "/community/get-services/find-partner" },
      {
        label: "Meet an Advisor",
        href: "/community/get-services/meet-advisor",
      },
      {
        label: "Customer Stories",
        href: "/community/get-services/customer-stories",
      },
    ],
    Collaborate: [
      { label: "GitHub", href: "/community/collaborate/github" },
      { label: "Forum", href: "/community/collaborate/forum" },
      { label: "Events", href: "/community/collaborate/events" },
      { label: "Translations", href: "/community/collaborate/translations" },
      {
        label: "Become a Partner",
        href: "/community/collaborate/become-a-partner",
      },
    ],
    Company: [
      { label: "Pricing", href: "/pricing" },
      { label: "Help", href: "/help" },
      { label: "Sign in", href: "/login" },
      { label: "Apps", href: "/apps" },
      { label: "Industries", href: "/industries" },
      { label: "Community", href: "/community" },
    ],
  };

  return (
    <footer className="border-t border-slate-800 bg-linear-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mb-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-6 lg:gap-10">
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="group mb-4 inline-flex items-center gap-0"
            >
              <span
                className="relative inline-block bg-linear-to-r from-violet-400 via-cyan-300 to-amber-300 bg-clip-text text-3xl font-black text-transparent drop-shadow-[0_2px_10px_rgba(34,211,238,0.25)] transition-all duration-300 group-hover:scale-105"
                style={{
                  fontFamily:
                    '"Hauser Script", "Segoe Script", "Brush Script MT", "Segoe Print", cursive',
                  letterSpacing: "-0.06em",
                }}
              >
                Adon
              </span>

              <span
                className="mx-1 inline-block text-slate-500"
                style={{
                  fontFamily:
                    '"Hauser Script", "Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
                  fontSize: "12px",
                  fontWeight: 200,
                  transform: "rotate(-12deg)",
                }}
              >
                —
              </span>

              <span
                className="relative inline-block bg-linear-to-r from-emerald-300 to-cyan-300 bg-clip-text text-xl font-black uppercase tracking-wider text-transparent"
                style={{
                  fontFamily:
                    '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
                }}
              >
                ERP
              </span>
            </Link>

            <p className="text-sm leading-relaxed text-slate-300">
              Unified apps for finance, sales, operations, team collaboration,
              and business growth in one connected ERP platform.
            </p>

            <div className="mt-6 flex gap-4">
              <a
                href="#"
                aria-label="Twitter"
                className="text-slate-300 transition-colors hover:text-cyan-300"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="text-slate-300 transition-colors hover:text-cyan-300"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="text-slate-300 transition-colors hover:text-cyan-300"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="text-slate-300 transition-colors hover:text-cyan-300"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h3 className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-white">
                {section}
              </h3>

              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={`${section}:${link.label}`}>
                    <Link
                      href={link.href}
                      className="text-sm font-medium text-slate-300 transition-colors hover:text-cyan-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-800" />

        <div className="flex flex-col items-center justify-between gap-4 pt-8 sm:flex-row">
          <p className="text-sm text-slate-400">
            &copy; {currentYear} Adon ERP. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/login"
              className="rounded-xl border border-slate-700 px-5 py-2.5 text-sm font-semibold text-slate-200 transition-all hover:-translate-y-0.5 hover:border-cyan-400 hover:text-cyan-300"
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
        </div>
      </div>
    </footer>
  );
}
