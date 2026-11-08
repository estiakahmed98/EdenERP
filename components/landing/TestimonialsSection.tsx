"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

import { HandText, ICON_TONES, SURFACE, SectionTag, plainTag } from "./landing-ui";

type Story = { name: string; role: string; quote: string };

const AUTOPLAY_MS = 6000;

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

function Avatar({ name, index, size = "h-10 w-10 text-sm" }: { name: string; index: number; size?: string }) {
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-full font-body font-semibold ${size} ${ICON_TONES[index % ICON_TONES.length]}`}
      aria-hidden="true"
    >
      {initials(name)}
    </span>
  );
}

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${count} / 5`}>
      {Array.from({ length: count }, (_, index) => (
        <Star key={index} className="h-3.5 w-3.5 fill-[#fbbf24] text-[#fbbf24]" aria-hidden="true" />
      ))}
    </div>
  );
}

function StoryBody({ story, index }: { story: Story; index: number }) {
  return (
    <>
      <blockquote className="font-body text-[17px] leading-[1.75] text-(--ink) sm:text-lg">
        “{story.quote}”
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <Avatar name={story.name} index={index} size="h-11 w-11 text-sm" />
        <div className="min-w-0">
          <p className="font-body text-sm font-semibold text-(--ink)">{story.name}</p>
          <p className="font-body text-xs text-(--muted)">{story.role}</p>
        </div>
      </figcaption>
    </>
  );
}

function StoryCarousel({ stories }: { stories: Story[] }) {
  const t = useTranslations("pages.home.testimonials.carousel");
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = stories.length;

  const go = useCallback(
    (step: number) => setActive((current) => (current + step + total) % total),
    [total],
  );

  useEffect(() => {
    if (paused || reduceMotion || total < 2) return;
    const id = window.setTimeout(() => go(1), AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [active, paused, reduceMotion, total, go]);

  const story = stories[active];

  return (
    <div
      className="reveal shadow-float relative mt-8 overflow-hidden rounded-3xl border border-border bg-card"
      role="region"
      aria-roledescription="carousel"
      aria-label={t("slide", { current: active + 1, total })}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="relative px-6 pb-6 pt-8 sm:px-10 sm:pt-9">
        <span
          className={`mb-5 grid h-10 w-10 place-items-center rounded-xl -rotate-6 ${ICON_TONES[1]}`}
          aria-hidden="true"
        >
          <Quote className="h-4.5 w-4.5" strokeWidth={2} />
        </span>

        <div className="grid" aria-live={paused ? "polite" : "off"}>
          {/* Invisible copies reserve the height of the longest story, so the card never jumps */}
          {stories.map((item) => (
            <div key={item.name} className="invisible col-start-1 row-start-1" aria-hidden="true">
              <StoryBody story={item} index={0} />
            </div>
          ))}
          <AnimatePresence mode="wait" initial={false}>
            <motion.figure
              key={active}
              className="col-start-1 row-start-1"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -24 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <StoryBody story={story} index={active} />
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex items-center justify-between gap-4 border-t border-dashed border-border pt-5">
          <div className="flex items-center gap-1.5">
            {stories.map((item, index) => (
              <button
                key={item.name}
                type="button"
                onClick={() => setActive(index)}
                aria-label={t("slide", { current: index + 1, total })}
                aria-current={index === active}
                className="grid h-6 place-items-center"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all duration-300 ${
                    index === active ? "w-7 bg-(--purple)" : "w-1.5 bg-border hover:bg-(--muted)"
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="me-1 font-body text-xs tabular-nums text-(--muted)">
              {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            {[
              { step: -1, label: t("previous"), Icon: ChevronLeft },
              { step: 1, label: t("next"), Icon: ChevronRight },
            ].map(({ step, label, Icon }) => (
              <button
                key={step}
                type="button"
                onClick={() => go(step)}
                aria-label={label}
                className="grid h-9 w-9 place-items-center rounded-full border border-border bg-background text-(--ink) transition hover:border-(--purple)/40 hover:text-(--purple)"
              >
                <Icon className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Autoplay progress */}
      {!paused && !reduceMotion && total > 1 && (
        <motion.span
          key={`progress-${active}`}
          className="absolute inset-x-0 bottom-0 block h-0.5 origin-left bg-(--purple)/50 rtl:origin-right"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

export default function TestimonialsSection() {
  const t = useTranslations("pages.home");
  const testimonials = t.raw("testimonials.items") as Array<{
    name: string;
    role: string;
    quote: string;
    avatar: string;
    score: number;
  }>;
  const stories: Story[] = [
    {
      name: t("testimonials.extraAuthor"),
      role: t("testimonials.extraRole"),
      quote: t("testimonials.extraQuote"),
    },
    ...(t.raw("testimonials.moreStories") as Story[]),
  ];

  return (
    <section className="bg-(--gray-bg) px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-240">
        <div className="reveal mb-8">
          <SectionTag>{plainTag(t("testimonials.tag"))}</SectionTag>
          <h2 className="mt-4 landing-heading text-[clamp(34px,4.6vw,56px)] font-bold leading-[1.1] text-(--ink)">
            <HandText>{t("testimonials.title")}</HandText>
          </h2>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <figure
              key={testimonial.name}
              className={`reveal reveal-d${index + 1} flex flex-col p-6 ${SURFACE}`}
            >
              <Stars count={testimonial.score} />
              <blockquote className="mt-4 flex-1 font-body text-[15px] leading-[1.7] text-(--ink)">
                “{testimonial.quote}”
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-dashed border-border pt-4">
                <Avatar name={testimonial.name} index={index} />
                <div className="min-w-0">
                  <p className="truncate font-body text-[13px] font-semibold text-(--ink)">
                    {testimonial.name}
                  </p>
                  <p className="truncate font-body text-xs text-(--muted)">{testimonial.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        <StoryCarousel stories={stories} />
      </div>
    </section>
  );
}
