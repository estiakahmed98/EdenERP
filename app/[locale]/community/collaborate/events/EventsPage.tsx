"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { useMessages } from "next-intl";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Code2,
  Crown,
  Flame,
  Globe2,
  Handshake,
  Headphones,
  Lightbulb,
  MapPin,
  MessageSquareText,
  Play,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  ThumbsUp,
  TrendingUp,
  Users,
  Video,
  Zap,
} from "lucide-react";
import { HandUnderline } from "@/components/ui/headunderline";

type MessageRecord = Record<string, unknown>;
type ScopedTranslator = ((key: string) => string) & {
  raw: (key: string) => unknown;
};

function isRecord(value: unknown): value is MessageRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getByPath(source: unknown, keyPath: string): unknown {
  return keyPath.split(".").reduce<unknown>((currentValue, key) => {
    if (!isRecord(currentValue)) {
      return undefined;
    }

    return currentValue[key];
  }, source);
}

function createTranslator(scope: unknown): ScopedTranslator {
  const translator = ((key: string) => {
    const value = getByPath(scope, key);

    return typeof value === "string" || typeof value === "number"
      ? String(value)
      : key;
  }) as ScopedTranslator;

  translator.raw = (key: string) => getByPath(scope, key);

  return translator;
}

function asArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

// Helper component to get icon by name
const getIconComponent = (iconName: string) => {
  const icons: Record<string, React.ElementType> = {
    Calendar, Code2, MapPin, Video, Star, Sparkles, Crown, BookOpen,
    Users, Play, Globe2, ArrowRight, ChevronRight,
  };
  return icons[iconName] || Calendar;
};

function ScriptHeading({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`text-balance text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl ${className}`}
      style={{
        fontFamily: '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
      }}
    >
      {children}
    </h2>
  );
}

function SectionEyebrow({
  iconName,
  labelKey,
  t,
}: {
  iconName: string;
  labelKey: string;
  t: any;
}) {
  const IconComponent = getIconComponent(iconName);
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary shadow-sm ring-1 ring-primary/20">
      <span className="text-primary">
        <IconComponent className="h-4 w-4" />
      </span>
      {t(labelKey)}
    </div>
  );
}

function HandUnderlineText({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={`relative ${className}`}>
      {children}
      <svg
        className="absolute -bottom-2 left-0 w-full"
        height="12"
        viewBox="0 0 200 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 9C40 3 80 2 120 3.5C160 5 180 8 201 2.5"
          stroke="#7c3aed"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

export default function EventsPage() {
  const messages = useMessages();
  const eventsMessages =
    getByPath(messages, "pages.events") ??
    getByPath(messages, "pages.community.events");
  const t = createTranslator(eventsMessages);
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-80px" });

  const heroStats = asArray(t.raw("hero.stats"));
  const calendarDays = asArray(t.raw("hero.calendar.days"));
  const calendarEventsList = asArray(t.raw("hero.calendar.events"));
  const upcomingEventsList = asArray(t.raw("upcomingSection.events"));
  const formatsFeatures = asArray(t.raw("formatsSection.features"));
  const speakersList = asArray(t.raw("speakersSection.speakers"));
  const agendaSchedule = asArray(t.raw("agendaSection.schedule"));
  const pastEventsList = asArray(t.raw("pastEventsSection.events"));
  const testimonialsList = asArray(t.raw("testimonialsSection.testimonials"));

  return (
    <main className="overflow-hidden bg-background text-foreground">
      {/* ═════════════════════ HERO ═════════════════════ */}
      <section className="relative isolate" ref={heroRef}>
        <div className="absolute inset-x-0 top-0 -z-10 h-[38rem] bg-[radial-gradient(circle_at_15%_12%,rgba(139,92,246,0.08),transparent_28%),radial-gradient(circle_at_85%_8%,rgba(139,92,246,0.06),transparent_26%)]" />

        <div className="mx-auto grid max-w-7xl gap-16 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-28">
          {/* Left content */}
          <motion.div
            className="max-w-xl space-y-8"
            initial={{ opacity: 0, x: -40 }}
            animate={heroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            <SectionEyebrow
              iconName={t("hero.eyebrowIcon")}
              labelKey="hero.eyebrowLabel"
              t={t}
            />

            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/70">
                {t("hero.communityLabel")}
              </p>
              <div className="space-y-3">
                <p
                  className="text-2xl font-medium text-muted-foreground"
                  style={{
                    fontFamily:
                      '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
                  }}
                >
                  {t("hero.preHeading")}
                </p>
                <h1
                  className="text-5xl font-semibold leading-none tracking-tight text-foreground sm:text-6xl"
                  style={{
                    fontFamily:
                      '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
                  }}
                >
                  {t("hero.title")}
                  <br />
                  <span className="text-primary">{t("hero.titleHighlight")}</span>
                </h1>
              </div>
              <p className="max-w-lg text-lg leading-8 text-muted-foreground">
                {t("hero.description")}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="#upcoming"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform duration-300 hover:-translate-y-0.5 hover:bg-primary/90"
              >
                <Calendar className="h-4 w-4" />
                {t("hero.seeEventsButton")}
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground shadow-sm transition-colors duration-300 hover:border-primary/30 hover:text-primary"
              >
                <MapPin className="h-4 w-4" />
                {t("hero.hostButton")}
              </a>
            </div>

            {/* Stats strip */}
            <div className="grid grid-cols-4 gap-3 rounded-2xl border border-primary/20 bg-card/80 p-5 backdrop-blur-sm shadow-sm">
              {heroStats.map((s: any) => (
                <div key={s.label} className="text-center">
                  <p className="text-xl font-black text-primary">{s.value}</p>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — event calendar card */}
          <motion.div
            className="relative mx-auto flex w-full max-w-xl items-center justify-center"
            initial={{ opacity: 0, scale: 0.88 }}
            animate={
              heroInView
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.88 }
            }
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          >
            <div className="absolute -top-6 right-8 h-28 w-28 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute -bottom-10 left-4 h-36 w-36 rounded-full bg-primary/15 blur-3xl" />

            <div className="w-full overflow-hidden rounded-[2.5rem] border-8 border-card bg-card shadow-[0_40px_100px_rgba(0,0,0,0.1)]">
              <div className="border-b border-border px-5 py-3 flex items-center gap-4">
                <Calendar className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-foreground">{t("hero.calendar.title")}</span>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {calendarDays.map((d: string) => (
                    <div
                      key={d}
                      className="text-center text-[10px] font-bold uppercase tracking-widest text-muted-foreground"
                    >
                      {d}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: 30 }).map((_, i) => {
                    const day = i + 1;
                    const isToday = day === 22;
                    const hasEvent = [17, 25, 26, 30].includes(day);
                    return (
                      <div
                        key={day}
                        className={`relative flex items-center justify-center rounded-lg py-2 text-xs font-medium ${
                          isToday
                            ? "bg-primary text-primary-foreground"
                            : hasEvent
                              ? "bg-primary/10 text-primary"
                              : "text-foreground hover:bg-muted/30"
                        }`}
                      >
                        {day}
                        {hasEvent && !isToday && (
                          <span className="absolute -bottom-0.5 h-1 w-1 rounded-full bg-primary" />
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="mt-4 space-y-2">
                  {calendarEventsList.map((ev: any, i: number) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 rounded-lg border border-primary/20 bg-primary/5 px-3 py-2"
                    >
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-black text-primary-foreground">
                        {ev.day.split(" ")[1] || ev.day}
                      </div>
                      <p className="text-xs font-medium text-foreground">
                        {ev.event}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═════════════════════ UPCOMING EVENTS ═════════════════════ */}
      <section id="upcoming" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <SectionEyebrow
            iconName={t("upcomingSection.eyebrowIcon")}
            labelKey="upcomingSection.eyebrowLabel"
            t={t}
          />
          <ScriptHeading className="mt-6">
            {t("upcomingSection.title")}
          </ScriptHeading>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            {t("upcomingSection.description")}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {upcomingEventsList.map((event: any, index: number) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.45,
                delay: Math.min(index * 0.07, 0.4),
              }}
              viewport={{ once: true, amount: 0.15 }}
              className="group relative overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"
            >
              <div
                className={`h-32 bg-gradient-to-br ${event.color} relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-white/10" />
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10 blur-xl" />
                <div className="absolute bottom-3 left-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                    {event.type}
                  </span>
                </div>
              </div>
              <div className="p-6 space-y-3">
                <h3 className="text-base font-semibold text-foreground leading-snug">
                  {event.title}
                </h3>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {event.date}
                  </span>
                  <span>{event.time}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {asArray(event.tags).map((tag) => (
                    <span
                      key={String(tag)}
                      className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground bg-muted/30 px-2 py-0.5 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div className="flex -space-x-2">
                    {asArray(event.speakers).map((s) => (
                      <div
                        key={String(s)}
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/80 text-[9px] font-black text-primary-foreground ring-2 ring-card"
                        title={String(s)}
                      >
                        {String(s).split(" ").map((w) => w[0]).join("")}
                      </div>
                    ))}
                  </div>
                  <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {event.attendees}
                  </span>
                </div>
                <a
                  href="#"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                >
                  {t("upcomingSection.registerButton")}
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═════════════════════ EVENT TYPES ═════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <SectionEyebrow
            iconName={t("formatsSection.eyebrowIcon")}
            labelKey="formatsSection.eyebrowLabel"
            t={t}
          />
          <ScriptHeading className="mt-6">
            {t("formatsSection.title")}
          </ScriptHeading>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            {t("formatsSection.description")}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {formatsFeatures.map((feature: any, index: number) => {
            const Icon = getIconComponent(feature.icon);
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  delay: Math.min(index * 0.07, 0.4),
                }}
                viewport={{ once: true, amount: 0.15 }}
                className="group relative overflow-hidden rounded-3xl border border-border bg-card p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"
              >
                <div className="relative">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-sm">
                    <Icon className="h-5.5 w-5.5" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-7 text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ═════════════════════ SPEAKERS ═════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <SectionEyebrow
            iconName={t("speakersSection.eyebrowIcon")}
            labelKey="speakersSection.eyebrowLabel"
            t={t}
          />
          <ScriptHeading className="mt-6">
            {t("speakersSection.title")}
          </ScriptHeading>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            {t("speakersSection.description")}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {speakersList.map((speaker: any, index: number) => (
            <motion.div
              key={speaker.name}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              viewport={{ once: true, amount: 0.15 }}
              className="group rounded-3xl border border-border bg-card p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl text-center"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-lg font-black text-primary-foreground shadow-md shadow-primary/10">
                {speaker.avatar}
              </div>
              <h3 className="text-base font-bold text-foreground">
                {speaker.name}
              </h3>
              <p className="mt-1 text-xs text-primary font-semibold">
                {speaker.topic}
              </p>
              <div className="mt-3 flex items-center justify-center gap-1 text-muted-foreground">
                <Video className="h-3 w-3" />
                <span className="text-[10px] font-semibold uppercase tracking-wider">
                  Speaker
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═════════════════════ SAMPLE AGENDA ═════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-14">
            <SectionEyebrow
              iconName={t("agendaSection.eyebrowIcon")}
              labelKey="agendaSection.eyebrowLabel"
              t={t}
            />
            <ScriptHeading className="mt-6">
              {t("agendaSection.title")}
            </ScriptHeading>
            <p className="mt-4 text-lg text-muted-foreground">
              {t("agendaSection.description")}
            </p>
          </div>

          <div className="space-y-3">
            {agendaSchedule.map((item: any, index: number) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="group flex items-start gap-5 rounded-2xl border border-border bg-card px-6 py-5 shadow-sm transition-all"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary text-sm font-black">
                  {item.time}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-foreground">
                      {item.label}
                    </h3>
                    <span className="text-[10px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                      {item.speaker}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-0.5" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════════════ PAST EVENTS ═════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <SectionEyebrow
            iconName={t("pastEventsSection.eyebrowIcon")}
            labelKey="pastEventsSection.eyebrowLabel"
            t={t}
          />
          <ScriptHeading className="mt-6">
            {t("pastEventsSection.title")}
          </ScriptHeading>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            {t("pastEventsSection.description")}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {pastEventsList.map((event: any, index: number) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.15 }}
              className="group rounded-3xl border border-border bg-card p-7 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
                  {event.type}
                </span>
                {event.recordings && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-accent-foreground bg-accent/10 px-2 py-0.5 rounded-full">
                    <Play className="h-3 w-3" />
                    Available
                  </span>
                )}
              </div>
              <h3 className="text-base font-semibold text-foreground leading-snug">
                {event.title}
              </h3>
              <p className="mt-2 text-xs text-muted-foreground flex items-center gap-1">
                <Users className="h-3 w-3" />
                {event.attendees} attendees
              </p>
              <a
                href="#"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
              >
                {t("pastEventsSection.watchButton")}
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═════════════════════ TESTIMONIALS ═════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <SectionEyebrow
            iconName={t("testimonialsSection.eyebrowIcon")}
            labelKey="testimonialsSection.eyebrowLabel"
            t={t}
          />
          <ScriptHeading className="mt-6">
            {t("testimonialsSection.title")}
            <br />
            {t("testimonialsSection.subtitle")}
          </ScriptHeading>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          {testimonialsList.map((tItem: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: index * 0.15 }}
              viewport={{ once: true, amount: 0.15 }}
              className="relative overflow-hidden rounded-[2rem] border border-border bg-card p-8 shadow-sm"
            >
              <div className="absolute -top-14 -right-14 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
              <div className="relative space-y-5">
                <div className="flex items-center gap-4">
                  <Video className="h-8 w-8 text-primary/60" />
                  <span className="text-xs font-bold uppercase tracking-widest text-primary">
                    Event
                  </span>
                </div>
                <p className="text-base leading-8 text-foreground/80">
                  &quot;{tItem.quote}&quot;
                </p>
                <div className="flex items-center gap-1 text-primary/60">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <div className="flex items-center gap-4 border-t border-border pt-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/80 text-sm font-black text-primary-foreground">
                    {tItem.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{tItem.name}</p>
                    <p className="text-sm text-muted-foreground">{tItem.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═════════════════════ CTA ═════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-primary/90 to-primary/70 px-6 py-16 text-center shadow-[0_50px_130px_rgba(0,0,0,0.22)] sm:px-10 sm:py-20"
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-24 -right-24 h-60 w-60 rounded-full bg-primary/30 blur-3xl" />
            <div className="absolute -bottom-28 -left-28 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
          </div>

          <div className="relative space-y-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 shadow-lg">
              <Sparkles className="h-8 w-8 text-primary-foreground/80" />
            </div>

            <ScriptHeading className="text-white text-4xl sm:text-5xl lg:text-6xl">
              {t("ctaSection.title")}
              <br />
              {t("ctaSection.subtitle")}
            </ScriptHeading>

            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/80">
              {t("ctaSection.description")}
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-primary shadow-xl transition-all hover:shadow-2xl hover:-translate-y-0.5"
              >
                <Calendar className="h-4 w-4" />
                {t("ctaSection.browseButton")}
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:border-white/40"
              >
                <Globe2 className="h-4 w-4" />
                {t("ctaSection.newsletterButton")}
              </a>
            </div>

            <p className="mt-6 text-sm text-primary-foreground/60">
              {t("ctaSection.footerText")}
            </p>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
