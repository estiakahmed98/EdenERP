"use client";
import dynamic from "next/dynamic";
import { ArrowUpRight, ChevronRight, Info } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { collegePages, collegeHref, type CollegeSlug } from "./registry";
import { css, LoadingWorkspace, useCollege } from "./ui";
import CollegeHero from "./heroes";
const Admission = dynamic(() => import("./workspaces/admission"), {
  loading: LoadingWorkspace,
});
const Assessment = dynamic(() => import("./workspaces/assessment"), {
  loading: LoadingWorkspace,
});
const Exams = dynamic(() => import("./workspaces/exams"), {
  loading: LoadingWorkspace,
});
const Rotations = dynamic(() => import("./workspaces/rotations"), {
  loading: LoadingWorkspace,
});
const Training = dynamic(() => import("./workspaces/training"), {
  loading: LoadingWorkspace,
});
const Governance = dynamic(() => import("./workspaces/governance"), {
  loading: LoadingWorkspace,
});
const Settings = dynamic(() => import("./workspaces/settings"), {
  loading: LoadingWorkspace,
});
export default function Experience({ slug }: { slug: CollegeSlug }) {
  const { t, locale } = useCollege();
  const next = collegePages.find((p) => p.slug === slug)!.next;
  return (
    <main
      className={css.college}
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      data-college-page={slug}
    >
      <div className={css.wrap}>
        <nav className={css.breadcrumb} aria-label={t("ui.breadcrumb")}>
          <Link href="/apps">AdonERP</Link>
          <ChevronRight size={12} aria-hidden="true" />
          <Link href={collegeHref("intake-admission")}>{t("ui.college")}</Link>
          <ChevronRight size={12} aria-hidden="true" />
          <span aria-current="page">{t(`pages.${slug}.title`)}</span>
        </nav>
        <CollegeHero slug={slug} />
        <p className={css.connection}>
          <Info size={14} aria-hidden="true" />
          {t("ui.backend")}
        </p>
        {slug === "intake-admission" ? (
          <Admission />
        ) : slug === "cards-items" ? (
          <Assessment />
        ) : slug === "professional-exams" ? (
          <Exams />
        ) : slug === "ward-placement" ? (
          <Rotations />
        ) : slug === "interns" || slug === "postgraduate-trainees" ? (
          <Training key={slug} kind={slug} />
        ) : slug === "governance" ? (
          <Governance />
        ) : (
          <Settings />
        )}
        <Link className={css.next} href={collegeHref(next)}>
          <span>{t("ui.continue")}</span>
          <strong>{t(`pages.${next}.title`)}</strong>
          <ArrowUpRight size={19} aria-hidden="true" />
        </Link>
      </div>
    </main>
  );
}
