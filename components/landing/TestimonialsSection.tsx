"use client";

import { ArrowUpRight, Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { guides } from "@/components/community/redesign/data";
import { HandText, SectionTag, SURFACE, plainTag } from "./landing-ui";

/** Product walkthroughs replace endorsements without documented consent. */
export default function TestimonialsSection() {
  const t = useTranslations("pages.home");
  const community = useTranslations("pages.communityApp");
  return (
    <section
      className="bg-(--gray-bg) px-4 py-16 sm:px-6 sm:py-20"
      data-product-walkthroughs
    >
      <div className="mx-auto max-w-240">
        <div className="reveal mb-8">
          <SectionTag>{plainTag(t("testimonials.tag"))}</SectionTag>
          <h2 className="mt-4 landing-heading text-[clamp(30px,4.6vw,48px)] font-bold leading-tight text-(--ink)">
            <HandText>{t("testimonials.title")}</HandText>
          </h2>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {guides(community).map((guide, index) => (
            <article
              key={guide.id}
              className={`reveal flex flex-col p-6 ${SURFACE}`}
            >
              <span className="text-xs font-medium text-(--muted)">
                0{index + 1} / {guide.category}
              </span>
              <h3 className="mt-4 text-lg font-semibold leading-relaxed">
                {guide.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-(--muted)">
                {guide.summary}
              </p>
              <ul className="my-5 space-y-3">
                {guide.steps.map((step) => (
                  <li
                    key={step}
                    className="flex gap-2 text-xs leading-6 text-(--muted)"
                  >
                    <Check
                      size={14}
                      className="mt-1 shrink-0 text-(--teal)"
                      aria-hidden="true"
                    />
                    {step}
                  </li>
                ))}
              </ul>
              <Link
                href={guide.href}
                className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-(--ink)"
              >
                {guide.linkLabel}
                <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
