import { ArrowDown, BookOpen, Compass, MessagesSquare } from "lucide-react";
import LiveDemoButton from "@/components/live-demo-button";
import base from "@/components/industries/professional/professional.module.css";
import css from "./community.module.css";
import { useTranslations } from "next-intl";
export { base, css };
export {
  Note,
  Metric,
  HandNote,
} from "@/components/industries/professional/ui";
export function Actions() {
  const t = useTranslations("pages.communityApp");
  return (
    <div className={base.actions}>
      <LiveDemoButton />
      <a href="#community-content">
        {t("ui.exploreThisPage")}
        <ArrowDown size={14} aria-hidden="true" />
      </a>
    </div>
  );
}
export function GuideArt() {
  return (
    <svg
      viewBox="0 0 360 250"
      fill="none"
      aria-hidden="true"
      className={css.guideArt}
    >
      <path
        d="M48 43h128c19 0 29 12 29 25v147c-6-17-17-23-38-23H48V43Z"
        fill="var(--card)"
        stroke="currentColor"
      />
      <path
        d="M205 68c0-13 10-25 29-25h83v149h-77c-20 0-29 6-35 23V68Z"
        fill="var(--p-wash)"
        stroke="currentColor"
      />
      <path
        d="M73 72h97M73 88h97M73 104h58m-58 42h97m-97 16h76M226 73h69m-69 16h69m-69 16h45m-45 42h69m-69 16h51"
        stroke="currentColor"
        strokeOpacity=".35"
      />
      <path
        d="M49 204h118c24 0 29 3 38 15 9-12 14-15 37-15h75M205 69v146"
        stroke="currentColor"
        strokeOpacity=".35"
      />
      <path d="M25 226h306" stroke="currentColor" strokeOpacity=".2" />
    </svg>
  );
}
export function DialogueArt() {
  const t = useTranslations("pages.communityApp");
  return (
    <div className={css.dialogueArt} aria-hidden="true">
      <div>
        <MessagesSquare size={21} />
        <span>{t("ui.yourWorkflow")}</span>
      </div>
      <div>
        <BookOpen size={21} />
        <span>{t("ui.theProductContext")}</span>
      </div>
      <div>
        <Compass size={21} />
        <span>{t("ui.aUsefulNextStep")}</span>
      </div>
    </div>
  );
}
