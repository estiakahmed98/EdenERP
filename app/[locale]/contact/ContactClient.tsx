"use client";

import { useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  Clock3,
  Copy,
  Headphones,
  LifeBuoy,
  Mail,
  MapPin,
  PhoneCall,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import BusinessCompanyName from "@/components/business-company-name";
import LiveDemoButton from "@/components/live-demo-button";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/lib/site";
import ContactScene from "./contact-scene";
import css from "./contact.module.css";

export default function ContactClient() {
  const t = useTranslations("pages.contact");
  const tx = useTranslations("pages.contact.experience");
  const footer = useTranslations("layout.footer");
  const locale = useLocale();
  const [copy, setCopy] = useState<{
    locale: string;
    status: "copied" | "error";
  } | null>(null);
  const copyStatus = copy?.locale === locale ? copy.status : null;
  const { business } = siteConfig;
  const addressLines = (["line1", "line2", "line3"] as const).map((key) =>
    t(`contactInfo.address.${key}`),
  );

  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(
        [business.companyName, ...addressLines].join("\n"),
      );
      setCopy({ locale, status: "copied" });
    } catch {
      setCopy({ locale, status: "error" });
    }
  }

  return (
    <main className={`bn-content ${css.page}`} data-contact-page>
      <section className={css.hero} aria-labelledby="contact-title">
        <div className={css.wrap}>
          <div className={css.heroGrid}>
            <div className={css.heroCopy}>
              <p className={css.eyebrow}>
                <span />
                {t("hero.eyebrowLabel")}
              </p>
              <h1 id="contact-title">
                {t("hero.title")}
                <span className={css.heroAccent}>
                  {t("hero.titleAccent")}
                  <svg
                    viewBox="0 0 440 18"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path d="M4 11C109 1 297 0 435 8M72 16C178 7 310 9 386 13" />
                  </svg>
                </span>
              </h1>
              <p className={css.lead}>{t("hero.description")}</p>
              <div className={css.heroActions}>
                <LiveDemoButton />
                <a href="#contact-channels" className={css.textLink}>
                  {tx("contactOptions")}
                  <ArrowDown size={15} aria-hidden="true" />
                </a>
              </div>
              <p className={css.heroNote}>
                <Headphones size={16} aria-hidden="true" />
                {tx("heroNote")}
              </p>
            </div>
            <ContactScene />
          </div>
        </div>
      </section>

      <section
        className={`${css.wrap} ${css.channels}`}
        id="contact-channels"
        aria-labelledby="contact-channels-title"
      >
        <div className={css.sectionHeading}>
          <h2 id="contact-channels-title">{tx("channelsTitle")}</h2>
          <p>{tx("channelsDescription")}</p>
        </div>
        <div className={css.channelGrid}>
          <article className={css.channel} data-contact-channel="phone">
            <span className={css.channelIcon}>
              <PhoneCall size={21} aria-hidden="true" />
            </span>
            <h3>{t("contactInfo.phone.title")}</h3>
            <div className={css.phoneNumbers}>
              {business.phones.map((phone) => (
                <a key={phone.number} href={`tel:${phone.number}`} dir="ltr">
                  {phone.display}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              ))}
            </div>
            <div className={css.channelFoot}>
              <Clock3 size={14} aria-hidden="true" />
              <span>{t("contactInfo.hours.weekdays")}</span>
            </div>
          </article>
          <article
            className={`${css.channel} ${css.productChannel}`}
            data-contact-channel="product"
          >
            <span className={css.channelIcon}>
              <Mail size={21} aria-hidden="true" />
            </span>
            <h3>{tx("productTitle")}</h3>
            <p>{tx("productDescription")}</p>
            <a
              href={`mailto:${business.email}`}
              className={css.emailLink}
              dir="ltr"
            >
              {business.email}
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <a href={`mailto:${business.email}`} className={css.channelAction}>
              {t("contactInfo.email.action")}
              <ArrowRight size={15} aria-hidden="true" />
            </a>
          </article>
          <article className={css.channel} data-contact-channel="support">
            <span className={`${css.channelIcon} ${css.greenIcon}`}>
              <LifeBuoy size={21} aria-hidden="true" />
            </span>
            <h3>{footer("sections.support")}</h3>
            <p>{tx("supportDescription")}</p>
            <div className={css.supportEmails}>
              {business.supportEmails.map((email) => (
                <a key={email} href={`mailto:${email}`} dir="ltr">
                  {email}
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className={css.visit} aria-labelledby="contact-visit-title">
        <div className={`${css.wrap} ${css.visitGrid}`}>
          <div className={css.visitCopy}>
            <p className={css.eyebrow}>
              <MapPin size={15} aria-hidden="true" />
              {t("map.eyebrow")}
            </p>
            <h2 id="contact-visit-title">{tx("locationTitle")}</h2>
            <p>{t("map.description")}</p>
            <a
              href={business.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={css.directionLink}
            >
              {t("office.directions")}
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            <div className={css.locationMark} aria-hidden="true">
              <span />
              <span />
              <span />
              <MapPin size={34} strokeWidth={1.5} />
            </div>
          </div>
          <div className={css.officeCard}>
            <div className={css.officeTop}>
              <span className={css.officeStamp}>
                <MapPin size={21} aria-hidden="true" />
              </span>
              <h3>{t("office.fullAddress")}</h3>
            </div>
            <address className={css.address} data-contact-office>
              <BusinessCompanyName />
              {addressLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </address>
            <p className={css.landmark}>{t("office.landmark")}</p>
            <button
              type="button"
              onClick={copyAddress}
              className={css.copyButton}
            >
              {copyStatus === "copied" ? (
                <Check size={15} aria-hidden="true" />
              ) : (
                <Copy size={15} aria-hidden="true" />
              )}
              {copyStatus === "copied"
                ? tx("copiedAddress")
                : tx("copyAddress")}
            </button>
            <p className={css.copyStatus} role="status">
              {copyStatus === "error"
                ? tx("copyError")
                : copyStatus === "copied"
                  ? tx("copiedAddress")
                  : ""}
            </p>
            <div className={css.hours}>
              <Clock3 size={18} aria-hidden="true" />
              <div>
                <h4>{t("contactInfo.hours.title")}</h4>
                <p>{t("contactInfo.hours.weekdays")}</p>
                <p>{t("contactInfo.hours.weekend")}</p>
              </div>
            </div>
          </div>
          <figure
            id="office-map"
            className={css.mapPanel}
            aria-labelledby="office-map-title"
          >
            <figcaption className={css.mapCaption}>
              <div>
                <h3 id="office-map-title">{t("map.title")}</h3>
                <p>{business.companyName} · AdonERP</p>
              </div>
              <a
                href={business.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("office.directions")}
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </figcaption>
            <div className={css.mapFrame}>
              <iframe
                src={business.mapEmbedUrl}
                title={`${t("map.title")} — AdonERP`}
                width="600"
                height="450"
                loading="lazy"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </figure>
        </div>
      </section>

      <section
        className={`${css.wrap} ${css.closing}`}
        aria-labelledby="contact-demo-title"
      >
        <div>
          <p className={css.eyebrow}>AdonERP</p>
          <h2 id="contact-demo-title">{tx("demoTitle")}</h2>
          <p className={css.closingLead}>{tx("demoDescription")}</p>
        </div>
        <div className={css.closingActions}>
          <LiveDemoButton />
          <Link href="/help" className={css.textLink}>
            {footer("links.helpCenter")}
            <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
