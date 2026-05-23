"use client";

import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

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

const socialLinks = [
  {
    label: "Twitter",
    href: "#",
    icon: Twitter,
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: Linkedin,
  },
  {
    label: "Facebook",
    href: "#",
    icon: Facebook,
  },
  {
    label: "Instagram",
    href: "#",
    icon: Instagram,
  },
];

export default function Footer() {
  const t = useTranslations("Footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bn-content bg-linear-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-16">
        <div className="rounded-3xl bg-slate-900/35 p-5 shadow-2xl shadow-cyan-950/20 sm:p-6 lg:p-8">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_2fr] lg:gap-12">
            {/* Brand Area */}
            <div className="text-center lg:text-left">
              <Link
                href="/"
                className="group inline-flex items-center justify-center gap-1 transition-transform duration-300 hover:scale-105 lg:justify-start"
              >
                <Image
                  src="/icon.svg"
                  alt="Adon ERP icon"
                  width={44}
                  height={44}
                  className="h-11 w-11 shrink-0 object-contain transition-transform duration-300 group-hover:scale-105"
                  priority
                />

                <span
                  className="relative inline-block bg-linear-to-r from-violet-400 via-cyan-300 to-amber-300 bg-clip-text text-3xl font-black text-transparent drop-shadow-[0_2px_10px_rgba(34,211,238,0.25)] transition-all duration-300 group-hover:scale-105 sm:text-4xl"
                  style={{
                    fontFamily:
                      '"Hauser Script", "Segoe Script", "Brush Script MT", "Segoe Print", cursive',
                  }}
                >
                  Adon<span className="mx-1.5 text-slate-500">|</span>
                </span>

                <span
                  className="relative inline-block bg-linear-to-r from-emerald-300 to-cyan-300 bg-clip-text text-4xl font-black uppercase tracking-wide text-transparent sm:text-5xl"
                  style={{
                    fontFamily:
                      '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
                  }}
                >
                  ERP
                </span>
              </Link>

              <p className="mx-auto mt-4 max-w-sm text-sm leading-7 text-slate-300 lg:mx-0">
                {t("description")}
              </p>

              <div className="mt-5 flex justify-center gap-3 lg:justify-start">
                {socialLinks.map((item) => {
                  const Icon = item.icon;

                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      aria-label={item.label}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950/60 text-slate-300 transition-all duration-300 hover:-translate-y-1 hover:bg-cyan-400/10 hover:text-cyan-300"
                    >
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Links Area */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-6">
              {footerSections.map((section) => (
                <div
                  key={section.titleKey}
                  className="rounded-2xl bg-slate-950/35 p-4 sm:bg-transparent sm:p-0"
                >
                  <h3 className="mb-3 text-[11px] font-black uppercase tracking-[0.18em] text-white">
                    {t(section.titleKey)}
                  </h3>

                  <ul className="space-y-2.5">
                    {section.links.map((link) => (
                      <li key={`${section.titleKey}:${link.labelKey}`}>
                        <Link
                          href={link.href}
                          className="inline-flex text-sm font-medium leading-5 text-slate-300 transition-colors hover:text-cyan-300"
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

          <div className="my-6 h-px bg-linear-to-r from-transparent via-slate-700/60 to-transparent" />

          <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
            <p className="text-xs leading-6 text-slate-400 sm:text-sm">
              {t("copyright", { year: currentYear })}
            </p>

            <Link
              href="/"
              className="rounded-full bg-slate-950/60 px-4 py-2 text-xs font-bold text-slate-300 transition-colors hover:bg-cyan-400/10 hover:text-cyan-300"
            >
              Adon ERP
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
