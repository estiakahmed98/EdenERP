"use client";

import {
  Facebook,
  Headphones,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/lib/site";
import BusinessCompanyName from "@/components/business-company-name";
import css from "./footer.module.css";

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
  const contactT = useTranslations("pages.contact.contactInfo");
  const currentYear = new Date().getFullYear();
  const resolvedSections = footerSections.map((section) => ({
    ...section,
    links: showPricing
      ? section.links
      : section.links.filter((link) => link.href !== "/pricing"),
  }));

  return (
    <footer className={`bn-content ${css.footer}`} data-site-footer>
      <div className={css.wrap}>
        <div className={css.top}>
          <div className={css.brand}>
            <Link href="/" className={css.brandLink}>
              <Image
                src="/adon_erp_logo.png"
                alt="Adon ERP logo"
                width={206}
                height={115}
                className={css.logo}
              />
            </Link>
            <p className={css.description}>{t("description")}</p>
          </div>
          <div className={css.navigation}>
            {resolvedSections.map((section) => (
              <div key={section.titleKey} className={css.linkGroup}>
                <h3>{t(section.titleKey)}</h3>
                <ul>
                  {section.links.map((link) => (
                    <li key={`${section.titleKey}:${link.labelKey}`}>
                      <Link href={link.href}>{t(link.labelKey)}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <address className={css.contacts} data-business-contact>
          <div className={`${css.contactGroup} ${css.addressGroup}`}>
            <p className={css.contactLabel}>
              <MapPin size={15} aria-hidden="true" />
              {contactT("address.title")}
            </p>
            <BusinessCompanyName />
            <a
              href={siteConfig.business.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={css.addressLink}
            >
              <span dir="ltr">
                {siteConfig.business.addressLines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </span>
            </a>
          </div>
          <div className={`${css.contactGroup} ${css.phoneGroup}`}>
            <p className={css.contactLabel}>
              <Phone size={14} aria-hidden="true" />
              {contactT("phone.title")}
            </p>
            <div className={css.phoneLinks}>
              {siteConfig.business.phones.map((phone) => (
                <a key={phone.number} href={`tel:${phone.number}`} dir="ltr">
                  {phone.display}
                </a>
              ))}
            </div>
          </div>
          <div className={css.contactGroup}>
            <p className={css.contactLabel}>
              <Mail size={15} aria-hidden="true" />
              {contactT("email.title")}
            </p>
            <a href={`mailto:${siteConfig.business.email}`} dir="ltr">
              {siteConfig.business.email}
            </a>
          </div>
          <div className={css.contactGroup}>
            <p className={css.contactLabel}>
              <Headphones size={15} aria-hidden="true" />
              {t("sections.support")}
            </p>
            <a href={`mailto:${siteConfig.business.supportEmail}`} dir="ltr">
              {siteConfig.business.supportEmail}
            </a>
          </div>
        </address>

        <div className={css.bottom}>
          <p>
            {t("copyright", {
              year: currentYear,
              company: siteConfig.business.companyName,
            })}
          </p>
          <div className={css.socials}>
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a key={label} href={href} aria-label={label}>
                <Icon size={16} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
