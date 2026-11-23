"use client";

import Image from "next/image";
import {
  Building2,
  Calculator,
  Factory,
  Headphones,
  MessagesSquare,
  Package,
} from "lucide-react";
import { useTranslations } from "next-intl";
import css from "./contact.module.css";

/** An illustrative conversation, with no invented people, records or metrics. */
export default function ContactScene() {
  const t = useTranslations("pages.contact.experience");
  const modules = useTranslations("layout.header.menu.apps");
  return (
    <figure className={css.scene} aria-label={t("visualTitle")}>
      <div className={css.sceneHalo} aria-hidden="true" />
      <svg
        className={css.connections}
        viewBox="0 0 600 540"
        fill="none"
        aria-hidden="true"
      >
        <path
          className={css.connectionBack}
          d="M110 84H210Q230 84 230 104V152M440 202H530Q550 202 550 222V414H417M126 400V455Q126 470 141 470H290V395"
        />
        <path
          className={css.connectionFlow}
          d="M110 84H210Q230 84 230 104V152M440 202H530Q550 202 550 222V414H417"
        />
        <circle cx="110" cy="84" r="5" fill="var(--contact-green)" />
        <circle cx="417" cy="414" r="5" fill="var(--contact-blue)" />
      </svg>
      <div className={css.businessNode}>
        <span>
          <Building2 size={22} aria-hidden="true" />
        </span>
        <p>{t("businessLabel")}</p>
      </div>
      <div className={css.panelShadow} aria-hidden="true" />
      <div className={css.scenePanel}>
        <div className={css.panelChrome} aria-hidden="true">
          <i />
          <i />
          <i />
          <span />
        </div>
        <div className={css.sceneLogo}>
          <Image
            src="/adon_erp_logo.png"
            alt="AdonERP"
            width={180}
            height={100}
          />
        </div>
        <p className={css.visualTitle}>{t("visualTitle")}</p>
        <div className={css.moduleTiles}>
          <div>
            <span>
              <Calculator size={22} aria-hidden="true" />
            </span>
            <p>{modules("accounting")}</p>
          </div>
          <div>
            <span>
              <Factory size={22} aria-hidden="true" />
            </span>
            <p>{modules("manufacturing")}</p>
          </div>
          <div>
            <span>
              <Package size={22} aria-hidden="true" />
            </span>
            <p>{modules("inventory")}</p>
          </div>
        </div>
      </div>
      <svg
        className={css.messagePlatform}
        viewBox="0 0 200 155"
        fill="none"
        aria-hidden="true"
      >
        <path d="M15 94L97 48L184 95L102 143L15 94Z" fill="#C4E2FF" />
        <path d="M15 84L97 38L184 85L102 133L15 84Z" fill="#1088EF" />
        <path d="M15 84V96L102 145V133L15 84Z" fill="#0870CE" />
        <path d="M102 133L184 85V97L102 145V133Z" fill="#003180" />
        <path
          d="M27 67L99 27L172 68L101 109L27 67Z"
          fill="#FFF"
          stroke="#A9D5FF"
        />
        <path d="M27 67V76L101 119V109L27 67Z" fill="#E1F0FF" />
        <path d="M101 109L172 68V77L101 119V109Z" fill="#B9DDFB" />
        <path
          d="M76 57L101 42L129 58L104 73L76 57Z"
          stroke="#1088EF"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <path
          d="M76 57V71L94 82L94 90L104 88L129 73V58M76 71L104 88V73"
          stroke="#1088EF"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <circle
          cx="157"
          cy="108"
          r="8"
          fill="#21A816"
          stroke="var(--card)"
          strokeWidth="3"
        />
      </svg>
      <div className={css.teamNode}>
        <span>
          <Headphones size={24} aria-hidden="true" />
        </span>
        <p>{t("teamLabel")}</p>
        <MessagesSquare size={18} aria-hidden="true" />
      </div>
    </figure>
  );
}
