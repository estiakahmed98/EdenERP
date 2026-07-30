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

export default function Footer({
  showPricing = true,
}: {
  showPricing?: boolean;
}) {
  const t = useTranslations("layout.footer");
  const currentYear = new Date().getFullYear();
  const resolvedSections = footerSections.map((section) => ({
    ...section,
    links: showPricing
      ? section.links
      : section.links.filter((link) => link.href !== "/pricing"),
  }));

  return (
    <footer className="bn-content relative overflow-hidden border-t border-border bg-background text-foreground">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-8 left-1/2 z-0 w-[90vw] -translate-x-1/2 text-center text-[15vw] font-black uppercase leading-none tracking-tight text-foreground/5 select-none sm:-bottom-12"
      >
        Adon ERP
      </span>

      <div className="relative z-10 mx-auto max-w-[90vw] px-4 py-8 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_2fr] lg:gap-12">
          {/* Brand Area */}
          <div className="text-center lg:text-left">
            <Link
              href="/"
              className="group inline-flex min-w-0 shrink items-center gap-2 transition-transform duration-300"
            >
              <Image
                src="/adon_erp_logo.png"
                alt="Adon ERP logo"
                width={140}
                height={50}
                className="h-9 w-auto shrink-0 sm:h-24 xl:h-24"
                priority
              />
            </Link>

            <p className="mx-auto mt-4 max-w-sm text-sm leading-7 text-muted-foreground lg:mx-0">
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
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/70 text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:bg-primary/10 hover:text-primary"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links Area */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-6">
            {resolvedSections.map((section) => (
              <div
                key={section.titleKey}
                className="rounded-2xl bg-background/60 p-4 sm:bg-transparent sm:p-0"
              >
                <h3 className="mb-3 text-[11px] font-black uppercase tracking-[0.18em] text-foreground">
                  {t(section.titleKey)}
                </h3>

                <ul className="space-y-2.5">
                  {section.links.map((link) => (
                    <li key={`${section.titleKey}:${link.labelKey}`}>
                      <Link
                        href={link.href}
                        className="inline-flex text-sm font-medium leading-5 text-muted-foreground transition-colors hover:text-primary"
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

        <div className="my-6 h-px bg-linear-to-r from-transparent via-border to-transparent" />

        <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
          <p className="text-xs leading-6 text-muted-foreground sm:text-sm">
            {t("copyright", { year: currentYear })}
          </p>

          <Link
            href="/"
            className="group inline-flex min-w-0 shrink items-center gap-2 transition-transform duration-300"
          >
            <Image
              src="/adon_erp_logo.png"
              alt="Adon ERP logo"
              width={140}
              height={50}
              className="h-9 w-auto shrink-0 sm:h-14 xl:h-16"
              priority
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
