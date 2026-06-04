"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Globe2,
  Handshake,
  Headphones,
  Lightbulb,
  Megaphone,
  Play,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { HandUnderline } from "@/components/ui/headunderline";

// Helper component to get icon by name
const getIconComponent = (iconName: string) => {
  const icons: Record<string, React.ElementType> = {
    Target, Handshake, Rocket, Globe2, BadgeCheck, Headphones, Search,
    Lightbulb, ShieldCheck, TrendingUp, Building2, Megaphone, Users,
    Sparkles, Star, ArrowRight, Play, Calendar,
  };
  return icons[iconName] || Handshake;
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
      className={`text-balance text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl ${className}`}
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

function StepCard({
  step,
  title,
  description,
  iconName,
  index,
  t,
}: {
  step: string;
  title: string;
  description: string;
  iconName: string;
  index: number;
  t: any;
}) {
  const Icon = getIconComponent(iconName);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 }}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      className="relative group"
    >
      <div className="relative flex gap-6 rounded-3xl border border-border bg-card p-7 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
        {index % 2 === 0 && (
          <div className="mt-1 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-sm">
            <Icon className="h-6 w-6 text-primary" />
          </div>
        )}
        <div className="space-y-3">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">
            Step {step}
          </span>
          <h3 className="text-xl font-semibold text-foreground">{title}</h3>
          <p className="text-sm leading-7 text-muted-foreground">{description}</p>
        </div>
        {index % 2 === 1 && (
          <div className="mt-1 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-sm">
            <Icon className="h-6 w-6 text-primary" />
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function BecomeAPartnerPage() {
  const t = useTranslations("pages.partner");
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-80px" });
  const footerRef = useRef(null);
  const footerInView = useInView(footerRef, { once: true, margin: "-60px" });

  const benefitsList = t.raw("benefitsSection.benefits");
  const journeySteps = t.raw("journeySection.steps");
  const partnerTypesList = t.raw("partnerTypesSection.types");
  const testimonialsList = t.raw("testimonialsSection.testimonials");
  const statsList = t.raw("statsSection.stats");

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
                </h1>
              </div>
              <p className="max-w-lg text-lg leading-8 text-muted-foreground">
                {t("hero.description")}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="#benefits"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform duration-300 hover:-translate-y-0.5 hover:bg-primary/90"
              >
                {t("hero.becomeButton")}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#partner-types"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground shadow-sm transition-colors duration-300 hover:border-primary/30 hover:text-primary"
              >
                <Play className="h-4 w-4" />
                {t("hero.watchButton")}
              </Link>
            </div>

            {/* Testimonial / trust badge */}
            <div className="rounded-[2rem] border border-border bg-card p-6 shadow-[0_30px_80px_rgba(0,0,0,0.08)]">
              <div className="mb-4 text-4xl leading-none text-primary">&quot;</div>
              <p className="text-base leading-7 text-card-foreground">
                {t("hero.testimonial.quote")}
              </p>
              <div className="mt-6 flex items-center justify-between gap-4 border-t border-border pt-5">
                <div>
                  <p className="font-semibold text-foreground">
                    {t("hero.testimonial.name")}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {t("hero.testimonial.role")}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-primary">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — partner showcase card */}
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

            <div className="relative h-[28rem] w-full overflow-hidden rounded-[2.5rem] border-8 border-card shadow-[0_40px_100px_rgba(0,0,0,0.16)] bg-gradient-to-br from-muted to-background">
              {/* Illustration card surface */}
              <div className="absolute inset-0">
                {/* Decorative dots */}
                <div className="absolute left-10 right-10 top-10 bottom-14 rounded-[2rem] bg-primary/5 p-6 shadow-inner">
                  <div className="grid h-full grid-cols-7 gap-2.5">
                    {Array.from({ length: 56 }).map((_, index) => (
                      <div
                        key={index}
                        className={`rounded-xs ${
                          [
                            "bg-primary/20",
                            "bg-primary/15",
                            "bg-primary/10",
                            "bg-primary/25",
                            "bg-primary/20",
                            "bg-primary/10",
                          ][index % 6]
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Handshake illustration circles */}
                <div className="absolute bottom-16 left-16 h-24 w-24 rounded-[2rem] rounded-b-lg bg-secondary shadow-xl" />
                <div className="absolute bottom-14 left-[8.5rem] h-28 w-24 rounded-t-[2rem] rounded-b-[2rem] bg-primary shadow-2xl" />
                <div className="absolute bottom-8 left-36 h-16 w-12 rounded-full bg-primary/40 shadow-lg" />
                <div className="absolute bottom-6 left-[13.5rem] h-12 w-12 rounded-full bg-card shadow-md" />
                <div className="absolute bottom-6 right-[8.5rem] h-14 w-14 rounded-full bg-secondary/30 shadow-lg" />
                <div className="absolute bottom-16 right-[5.5rem] h-20 w-20 rounded-[2rem] bg-primary/30 shadow-xl" />
              </div>

              {/* Center badge */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-card/95 shadow-2xl">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/80">
                    <Handshake className="h-8 w-8 text-primary-foreground" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═════════════════════ BENEFITS ═════════════════════ */}
      <section id="benefits" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <SectionEyebrow
            iconName={t("benefitsSection.eyebrowIcon")}
            labelKey="benefitsSection.eyebrowLabel"
            t={t}
          />
          <ScriptHeading className="mt-6">
            {t("benefitsSection.title")}
            <br />
            {t("benefitsSection.subtitle")}
          </ScriptHeading>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            {t("benefitsSection.description")}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefitsList.map((benefit: any, index: number) => {
            const Icon = getIconComponent(benefit.icon);
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  delay: Math.min(index * 0.07, 0.4),
                }}
                viewport={{ once: true, amount: 0.15 }}
                className="group relative overflow-hidden rounded-3xl border border-border bg-card p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-[0.035] transition-opacity duration-300 group-hover:opacity-[0.07]`}
                />
                <div className="relative">
                  <div
                    className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${benefit.gradient} shadow-md shadow-primary/10`}
                  >
                    <Icon className="h-5.5 w-5.5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {benefit.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-7 text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ═════════════════════ JOURNEY ═════════════════════ */}
      <section className="relative overflow-hidden overflow-x-hidden">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <SectionEyebrow
              iconName={t("journeySection.eyebrowIcon")}
              labelKey="journeySection.eyebrowLabel"
              t={t}
            />
            <ScriptHeading className="mt-6">
              {t("journeySection.title")}
            </ScriptHeading>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              {t("journeySection.description")}
            </p>
          </div>

          <div className="flex flex-col gap-8 lg:gap-12">
            {journeySteps.map((step: any, index: number) => (
              <StepCard
                key={step.step}
                step={step.step}
                title={step.title}
                description={step.description}
                iconName={step.icon}
                index={index}
                t={t}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════════════ PARTNER TYPES ═════════════════════ */}
      <section id="partner-types" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <SectionEyebrow
            iconName={t("partnerTypesSection.eyebrowIcon")}
            labelKey="partnerTypesSection.eyebrowLabel"
            t={t}
          />
          <ScriptHeading className="mt-6">
            {t("partnerTypesSection.title")}
            <br />
            {t("partnerTypesSection.subtitle")}
          </ScriptHeading>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            {t("partnerTypesSection.description")}
          </p>
        </div>

        <div className="grid gap-7 lg:grid-cols-3">
          {partnerTypesList.map((type: any, index: number) => {
            const Icon = getIconComponent(type.icon);
            return (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.15 }}
                className="group relative overflow-hidden rounded-[2.5rem] border border-border bg-card p-8 shadow-[0_20px_80px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${type.accent} opacity-30 group-hover:opacity-40 transition-opacity dark:hidden`} />
                <div className="absolute inset-0 hidden bg-gradient-to-br from-white/10 via-white/5 to-transparent opacity-40 transition-opacity group-hover:opacity-60 dark:block" />

                <div className="relative space-y-5">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border/60 bg-card/90 shadow-sm">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>

                  <h3 className="text-2xl font-semibold text-foreground">
                    {type.title}
                  </h3>
                  <p className="text-sm leading-7 text-muted-foreground">
                    {type.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {type.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                    {t("partnerTypesSection.applyButton")}
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
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
                <p className="text-base leading-8 text-card-foreground">
                  &quot;{tItem.quote}&quot;
                </p>
                <div className="flex items-center gap-1 text-primary">
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

      {/* ═════════════════════ STATS ═════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <div className="overflow-hidden rounded-[2.5rem] border border-border bg-card p-8 shadow-sm sm:p-10">
          <div className="grid gap-8 sm:grid-cols-3 lg:gap-12">
            {statsList.map((stat: any) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                viewport={{ once: true }}
                className="text-center space-y-2"
              >
                <p className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════════════ CTA ═════════════════════ */}
      <section id="get-started" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28" ref={footerRef}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={footerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-primary/90 to-primary/70 px-6 py-16 text-center shadow-[0_50px_130px_rgba(0,0,0,0.22)] sm:px-10 sm:py-20"
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-24 -right-24 h-60 w-60 rounded-full bg-primary/30 blur-3xl" />
            <div className="absolute -bottom-28 -left-28 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
          </div>

          <div className="relative space-y-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 shadow-lg">
              <Handshake className="h-8 w-8 text-primary-foreground/80" />
            </div>

            <ScriptHeading className="text-white text-4xl sm:text-5xl lg:text-6xl">
              {t("ctaSection.title")}
            </ScriptHeading>

            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/80">
              {t("ctaSection.description")}
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="#"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-primary shadow-xl transition-all hover:shadow-2xl hover:-translate-y-0.5"
              >
                {t("ctaSection.applyButton")}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:border-white/40"
              >
                <Calendar className="h-4 w-4" />
                {t("ctaSection.callButton")}
              </Link>
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