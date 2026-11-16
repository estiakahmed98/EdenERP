"use client";

import dynamic from "next/dynamic";
import { ArrowRight, ChevronRight, HeartPulse } from "lucide-react";
import LiveDemoButton from "@/components/live-demo-button";
import { Link } from "@/i18n/navigation";
import { hospitalHref, hospitalPage, type HospitalSlug } from "./registry";
import HospitalHero from "./heroes";
import { css, LoadingWorkspace, NextLink, useHospital } from "./ui";

const Analytics = dynamic(() => import("./workspaces/analytics"), {
  loading: LoadingWorkspace,
});
const FrontDesk = dynamic(() => import("./workspaces/front-desk"), {
  loading: LoadingWorkspace,
});
const Finance = dynamic(() => import("./workspaces/finance"), {
  loading: LoadingWorkspace,
});
const Operations = dynamic(() => import("./workspaces/operations"), {
  loading: LoadingWorkspace,
});
const Clinical = dynamic(() => import("./workspaces/clinical"), {
  loading: LoadingWorkspace,
});
const Administration = dynamic(() => import("./workspaces/administration"), {
  loading: LoadingWorkspace,
});

export default function HospitalExperience({ slug }: { slug: HospitalSlug }) {
  const { t, locale } = useHospital();
  const page = hospitalPage(slug);
  const kind = page.workspace;
  return (
    <main
      className={css.hospital}
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      data-hospital-page={slug}
    >
      <div className={css.shell}>
        <div className={css.mainColumn}>
          <nav className={css.breadcrumb} aria-label={t("ui.navigation")}>
            <Link href="/apps">AdonERP</Link>
            <ChevronRight size={12} aria-hidden="true" />
            <Link href={hospitalHref("hospital-dashboard")}>
              {t("ui.hospital")}
            </Link>
            <ChevronRight size={12} aria-hidden="true" />
            <span aria-current="page">{t(`pages.${slug}.title`)}</span>
          </nav>
          <HospitalHero slug={slug} />
          <div className={css.connectionNote}>
            <span className={css.connectionDot} />
            <p>{t("ui.noBackend")}</p>
          </div>
          {kind === "dashboard" || kind === "indicators" ? (
            <Analytics key={slug} kind={kind} />
          ) : kind === "patients" ||
            kind === "queue" ||
            kind === "consultations" ? (
            <FrontDesk key={slug} kind={kind} />
          ) : kind === "billing" ||
            kind === "close" ||
            kind === "settlement" ||
            kind === "payers" ? (
            <Finance key={slug} kind={kind} />
          ) : kind === "wards" || kind === "admissions" || kind === "census" ? (
            <Operations key={slug} kind={kind} />
          ) : kind === "laboratory" ||
            kind === "imaging" ||
            kind === "pharmacy" ||
            kind === "theatre" ||
            kind === "emergency" ||
            kind === "blood" ? (
            <Clinical key={slug} kind={kind} />
          ) : (
            <Administration key={slug} kind={kind} />
          )}
          <div className={css.bottomJourney}>
            <NextLink slug={page.next} />
            <div>
              <HeartPulse size={22} aria-hidden="true" />
              <p>{t("ui.requestDemo")}</p>
              <span>{t("ui.requestDescription")}</span>
              <LiveDemoButton />
            </div>
          </div>
          <Link className={css.backToDirectory} href="/apps">
            {t("ui.back")}
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </main>
  );
}
