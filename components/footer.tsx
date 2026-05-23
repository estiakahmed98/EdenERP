"use client";

import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

type FooterSection = {
  titleKey: string;
  links: Array<{
    labelKey: string;
    href: string;
  }>;
};

const footerSections: FooterSection[] = [
  {
    titleKey: "sections.product",
    links: [
      { labelKey: "links.apps", href: "/apps" },
      { labelKey: "links.industries", href: "/industries" },
      { labelKey: "links.pricing", href: "/pricing" },
      { labelKey: "links.help", href: "/help" },
    ],
  },
  {
    titleKey: "sections.company",
    links: [
      { labelKey: "links.community", href: "/community" },
      { labelKey: "links.learn", href: "/community/learn" },
      { labelKey: "links.getServices", href: "/community/get-services" },
      { labelKey: "links.collaborate", href: "/community/collaborate" },
    ],
  },
  {
    titleKey: "sections.support",
    links: [
      { labelKey: "links.helpCenter", href: "/help" },
      {
        labelKey: "links.documentation",
        href: "/community/learn/documentation",
      },
      { labelKey: "links.tutorials", href: "/community/learn/tutorials" },
      { labelKey: "links.training", href: "/community/learn/training" },
    ],
  },
  {
    titleKey: "sections.legal",
    links: [
      { labelKey: "links.privacy", href: "#" },
      { labelKey: "links.terms", href: "#" },
      { labelKey: "links.cookies", href: "#" },
      { labelKey: "links.gdpr", href: "#" },
    ],
  },
];

export default function Footer() {
  const t = useTranslations("Footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bn-content border-t border-slate-200 bg-slate-50 text-slate-800 dark:border-slate-800 dark:bg-linear-to-b dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 dark:text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mb-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-12">
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
                }}
              >
                Adon
              </span>

              <span
                className="mx-1 inline-block text-slate-400 dark:text-slate-500"
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

            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {t("description")}
            </p>

            <div className="mt-6 flex gap-4">
              <a
                href="#"
                className="text-slate-500 transition-colors hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-300"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="text-slate-500 transition-colors hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-300"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="text-slate-500 transition-colors hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-300"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="text-slate-500 transition-colors hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-300"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.titleKey}>
              <h3 className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-slate-900 dark:text-white">
                {t(section.titleKey)}
              </h3>

              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={`${section.titleKey}:${link.labelKey}`}>
                    <Link
                      href={link.href}
                      className="text-sm font-medium text-slate-600 transition-colors hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-300"
                    >
                      {t(link.labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-200 dark:border-slate-800" />

        <div className="flex flex-col items-center justify-between gap-4 pt-8 sm:flex-row">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {t("copyright", { year: currentYear })}
          </p>
        </div>
      </div>
    </footer>
  );
}
