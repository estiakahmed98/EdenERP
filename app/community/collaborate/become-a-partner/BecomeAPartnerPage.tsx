"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
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

const benefits = [
  {
    icon: Target,
    title: "Reach new customers",
    description:
      "Showcase your expertise and grow your business by connecting with clients searching for solutions on AdonERP's growing platform.",
    gradient: "from-purple-500 to-violet-600",
  },
  {
    icon: Handshake,
    title: "Earn industry recognition",
    description:
      "Build a trusted reputation as an AdonERP certified partner — a mark that signals quality and reliability across markets and industries.",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    icon: Rocket,
    title: "Fast-trackyour growth",
    description:
      "Access exclusive tools, training, and co-marketing opportunities to shorten your sales cycle and accelerate business outcomes.",
    gradient: "from-purple-600 to-violet-700",
  },
  {
    icon: Globe2,
    title: "Go global with confidence",
    description:
      "Tap into international leads and expand your reach with AdonERP's presence in more than 180 countries worldwide.",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    icon: BadgeCheck,
    title: "Formal certification path",
    description:
      "Earn platinum, gold, or silver partner credentials with structured exams, supervised training, and official accreditation milestones.",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    icon: Headphones,
    title: "Dedicated partner support",
    description:
      "Your personal account manager ensures you always have priority access to resources, technical guidance, and sales enablement.",
    gradient: "from-sky-500 to-blue-600",
  },
];

const steps = [
  {
    step: "01",
    title: "Apply to join",
    description:
      "Fill out our partner application form with your company details, market focus, and professional references.",
    icon: Search,
    color: "purple",
  },
  {
    step: "02",
    title: "Attend training",
    description:
      "Complete our onboarding curriculum — product fundamentals, best practices, and tools — at your own pace.",
    icon: Lightbulb,
    color: "violet",
  },
  {
    step: "03",
    title: "Complete certification",
    description:
      "Pass the exam to earn your official partner certificate and unlock tier bonuses and partner-only resources.",
    icon: ShieldCheck,
    color: "indigo",
  },
  {
    step: "04",
    title: "Start growing",
    description:
      "Connect with leads, co-market together, and start delivering AdonERP solutions to your clients.",
    icon: TrendingUp,
    color: "emerald",
  },
];

const partnerTypes = [
  {
    title: "Implementation",
    description:
      "Deploy and customize AdonERP, guide clients through the full setup, and manage long-term upgrades and integrations.",
    icon: Building2,
    accent: "from-violet-100 to-purple-100",
    tags: ["ERP Setup", "Customization", "Integration"],
  },
  {
    title: "Reseller",
    description:
      "Sell AdonERP subscriptions and complementary services to your customer base, supported by full training and materials.",
    icon: Megaphone,
    accent: "from-purple-100 to-violet-100",
    tags: ["Subscription Sales", "B2B Outreach", "Channel Growth"],
  },
  {
    title: "Consulting",
    description:
      "Lead digital transformation projects, conduct business process engineering, and deliver AdonERP-accelerated consulting engagements.",
    icon: Users,
    accent: "from-indigo-100 to-purple-100",
    tags: ["Strategy", "Digital Transformation", "Process Engineering"],
  },
];

const testimonials = [
  {
    quote:
      "Becoming an AdonERP partner more than doubled our consulting pipelines the first year. The partner team is world-class, and the certification gives real credibility.",
    name: "Carlos Mendez",
    role: "Director, Mendez Consulting",
    avatar: "CM",
  },
  {
    quote:
      "The structured partner path and certification tracking made it simple to scale. Our team now serves clients across three countries from one unified hub.",
    name: "Aisha Karim",
    role: "CEO, Karim Technologies",
    avatar: "AK",
  },
];

function ScriptHeading({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`text-balance text-4xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl ${className}`}
      style={{
        fontFamily: '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
      }}
    >
      {children}
    </h2>
  );
}

function SectionEyebrow({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-purple-50 px-4 py-2 text-sm font-semibold text-purple-700 shadow-sm ring-1 ring-purple-100">
      <span className="text-purple-500">{icon}</span>
      {label}
    </div>
  );
}

function StepCard({
  step,
  title,
  description,
  icon: Icon,
  color,
  index,
}: (typeof steps)[number] & { index: number }) {
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
      {/* Connector line */}
      {index < steps.length - 1 && (
        <div className="hidden lg:block absolute left-[2.75rem] top-[7.25rem] h-[calc(100%-7rem)] w-0.5 bg-gradient-to-b from-purple-200 to-purple-50" />
      )}
      <div className="relative flex gap-6 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
        {index % 2 === 0 && (
          <div
            className={`mt-1 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-${color}-100 text-${color}-600 shadow-sm`}
          >
            <Icon
              className={`h-6 w-6 ${
                color === "purple"
                  ? "text-purple-600"
                  : color === "violet"
                    ? "text-violet-600"
                    : color === "indigo"
                      ? "text-indigo-600"
                      : "text-emerald-600"
              }`}
            />
          </div>
        )}
        <div className="space-y-3">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-300">
            Step {step}
          </span>
          <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
          <p className="text-sm leading-7 text-slate-500">{description}</p>
        </div>
        {index % 2 === 1 && (
          <div
            className={`mt-1 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-${color}-100 text-${color}-600 shadow-sm`}
          >
            <Icon
              className={`h-6 w-6 ${
                color === "purple"
                  ? "text-purple-600"
                  : color === "violet"
                    ? "text-violet-600"
                    : color === "indigo"
                      ? "text-indigo-600"
                      : "text-emerald-600"
              }`}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function BecomeAPartnerPage() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-80px" });

  const footerRef = useRef(null);
  const footerInView = useInView(footerRef, { once: true, margin: "-60px" });

  return (
    <main className="overflow-hidden bg-[linear-gradient(180deg,_#fff_0%,_#faf5ff_18%,_#ffffff_100%)] text-slate-800">
      {/* ═════════════════════ HERO ═════════════════════ */}
      <section className="relative isolate" ref={heroRef}>
        {/* Background gradients */}
        <div className="absolute inset-x-0 top-0 -z-10 h-[38rem] bg-[radial-gradient(circle_at_15%_12%,rgba(147,51,234,0.13),transparent_28%),radial-gradient(circle_at_85%_8%,rgba(168,85,247,0.13),transparent_26%),linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(250,245,255,1)_30%,rgba(255,255,255,1)_100%)]" />

        <div className="mx-auto grid max-w-7xl gap-16 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-28">
          {/* Left content */}
          <motion.div
            className="max-w-xl space-y-8"
            initial={{ opacity: 0, x: -40 }}
            animate={heroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            <SectionEyebrow
              icon={<Handshake className="h-4 w-4" />}
              label="Join the Partner Program"
            />

            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/70">
                Community / Collaborate / Become a Partner
              </p>
              <div className="space-y-3">
                <p
                  className="text-2xl font-medium text-slate-700"
                  style={{
                    fontFamily:
                      '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
                  }}
                >
                  Grow as a
                </p>
                <h1
                  className="text-5xl font-semibold leading-none tracking-tight text-slate-900 sm:text-6xl"
                  style={{
                    fontFamily:
                      '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
                  }}
                >
                  Partner
                </h1>
              </div>
              <p className="max-w-lg text-lg leading-8 text-slate-600">
                Collaborate with Adon ERP — join a network of trusted
                professionals who deliver world-class solutions, amplify their
                brands, and unlock new revenue streams together.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="#benefits"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-transform duration-300 hover:-translate-y-0.5"
              >
                Become a Partner
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#partner-types"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-colors duration-300 hover:border-primary/30 hover:text-primary"
              >
                <Play className="h-4 w-4" />
                Watch Overview
              </Link>
            </div>

            {/* Testimonial / trust badge */}
            <div className="rounded-[2rem] border border-slate-200/80 bg-white/95 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.08)]">
              <div className="mb-4 text-4xl leading-none text-purple-500">&quot;</div>
              <p className="text-base leading-7 text-slate-700">
                Joining AdonERP as a partner transformed our business. The
                recognition, resources, and community are unmatched — we&apos;ve
                expanded our reach to more than 15 new clients in just one
                quarter.
              </p>
              <div className="mt-6 flex items-center justify-between gap-4 border-t border-slate-100 pt-5">
                <div>
                  <p className="font-semibold text-slate-900">
                    Sofia Rodriguez
                  </p>
                  <p className="text-sm text-slate-500">
                    Head of Partnerships, TechPartner Ltd.
                  </p>
                </div>
                <div className="flex items-center gap-1 text-purple-400">
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
            <div className="absolute -top-6 right-8 h-28 w-28 rounded-full bg-purple-100 blur-3xl" />
            <div className="absolute -bottom-10 left-4 h-36 w-36 rounded-full bg-violet-100 blur-3xl" />

            <div className="relative h-[28rem] w-full overflow-hidden rounded-[2.5rem] border-8 border-white shadow-[0_40px_100px_rgba(15,23,42,0.16)] bg-[linear-gradient(135deg,#faf5ff_0%,#ffffff_50%,#f5f0ff_100%)]">
              {/* Illustration card surface */}
              <div className="absolute inset-0">
                {/* Decorative dots */}
                <div className="absolute left-10 right-10 top-10 bottom-14 rounded-[2rem] bg-[#7c3aed]/[0.04] p-6 shadow-inner">
                  <div className="grid h-full grid-cols-7 gap-2.5">
                    {Array.from({ length: 56 }).map((_, index) => (
                      <div
                        key={index}
                        className={`rounded-xs ${
                          [
                            "bg-purple-200/60",
                            "bg-violet-200/60",
                            "bg-indigo-200/60",
                            "bg-purple-300/60",
                            "bg-violet-300/60",
                            "bg-purple-100/80",
                          ][index % 6]
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Handshake illustration circles */}
                <div className="absolute bottom-16 left-16 h-24 w-24 rounded-[2rem] rounded-b-lg bg-violet-500 shadow-xl" />
                <div className="absolute bottom-14 left-[8.5rem] h-28 w-24 rounded-t-[2rem] rounded-b-[2rem] bg-purple-500 shadow-2xl" />
                <div className="absolute bottom-8 left-36 h-16 w-12 rounded-full bg-purple-300 shadow-lg" />

                <div className="absolute bottom-6 left-[13.5rem] h-12 w-12 rounded-full bg-white shadow-md" />
                <div className="absolute bottom-6 right-[8.5rem] h-14 w-14 rounded-full bg-violet-300 shadow-lg" />
                <div className="absolute bottom-16 right-[5.5rem] h-20 w-20 rounded-[2rem] bg-purple-400 shadow-xl" />
              </div>

              {/* Center badge */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/95 shadow-2xl">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-purple-500 to-violet-600">
                    <Handshake className="h-8 w-8 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═════════════════════ BENEFITS ═════════════════════ */}
      <section
        id="benefits"
        className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
      >
        <div className="text-center max-w-3xl mx-auto mb-14">
          <SectionEyebrow
            icon={<Sparkles className="h-4 w-4" />}
            label="Why join"
          />
          <ScriptHeading className="mt-6">
            Build something worth
            <br />
            talking about
          </ScriptHeading>
          <p className="mt-4 max-w-2xl text-lg text-slate-600">
            By joining the Adon ERP Partner Program, you gain access to
            resources, recognition, and opportunities that help you stand out
            and thrive.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
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
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-purple-200 hover:shadow-xl"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-[0.035] transition-opacity duration-300 group-hover:opacity-[0.07]`}
                />
                <div className="relative">
                  <div
                    className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${benefit.gradient} shadow-md shadow-purple-500/10`}
                  >
                    <Icon className="h-5.5 w-5.5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {benefit.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-7 text-slate-500">
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
              icon={<Rocket className="h-4 w-4" />}
              label="Your journey"
            />
            <ScriptHeading className="mt-6">
              Become a partner in four easy steps
            </ScriptHeading>
            <p className="mt-4 max-w-2xl text-lg text-slate-600">
              Our streamlined process ensures you can go from application to
              delivering value to clients as quickly as possible.
            </p>
          </div>

          <div className="flex flex-col gap-8 lg:gap-12">
            {steps.map((item, index) => (
              <StepCard key={item.step} {...item} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════════════ PARTNER TYPES ═════════════════════ */}
      <section
        id="partner-types"
        className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
      >
        <div className="text-center max-w-3xl mx-auto mb-14">
          <SectionEyebrow
            icon={<BadgeCheck className="h-4 w-4" />}
            label="Partnership models"
          />
          <ScriptHeading className="mt-6">
            Choose the path
            <br />
            that fits you
          </ScriptHeading>
          <p className="mt-4 max-w-2xl text-lg text-slate-600">
            No matter your focus, there&apos;s a partnership tier designed to
            help you deliver value and grow your business with AdonERP.
          </p>
        </div>

        <div className="grid gap-7 lg:grid-cols-3">
          {partnerTypes.map((type, index) => {
            const Icon = type.icon;
            return (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.15 }}
                className="group relative overflow-hidden rounded-[2.5rem] border border-border/60 bg-white p-8 shadow-[0_20px_80px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${type.accent} opacity-80 group-hover:opacity-100 transition-opacity`}
                />

                <div className="relative space-y-5">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/90 shadow-sm">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>

                  <h3 className="text-2xl font-semibold text-slate-900">
                    {type.title}
                  </h3>
                  <p className="text-sm leading-7 text-muted-foreground">
                    {type.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {type.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-full border border-purple-100 bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                    Apply now
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
            icon={<Users className="h-4 w-4" />}
            label="Partner stories"
          />
          <ScriptHeading className="mt-6">
            Partners who trust us,
            <br />
            grow with us
          </ScriptHeading>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: index * 0.15 }}
              viewport={{ once: true, amount: 0.15 }}
              className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm"
            >
              <div className="absolute -top-14 -right-14 h-48 w-48 rounded-full bg-purple-100/40 blur-3xl" />
              <div className="relative space-y-5">
                {/* Quote */}
                <p className="text-base leading-8 text-slate-700">&quot;{t.quote}&quot;</p>

                {/* Star */}
                <div className="flex items-center gap-1 text-purple-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>

                {/* Author */}
                <div className="flex items-center gap-4 border-t border-slate-100 pt-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-purple-500 to-violet-600 text-sm font-black text-white">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{t.name}</p>
                    <p className="text-sm text-slate-500">{t.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═════════════════════ STATS ═════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <div className="overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <div className="grid gap-8 sm:grid-cols-3 lg:gap-12">
            {[
              { value: "180+", label: "Countries with active partners" },
              { value: "3,000+", label: "Certified partners worldwide" },
              { value: "$500M+", label: "Combined client GMV" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                viewport={{ once: true }}
                className="text-center space-y-2"
              >
                <p className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-linear-to-r from-purple-600 via-violet-600 to-indigo-600">
                  {stat.value}
                </p>
                <p className="text-sm text-slate-500">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════════════ CTA ═════════════════════ */}
      <section
        id="get-started"
        className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
        ref={footerRef}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={footerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[2.5rem] bg-linear-to-br from-slate-900 via-purple-900 to-violet-900 px-6 py-16 text-center shadow-[0_50px_130px_rgba(15,23,42,0.22)] sm:px-10 sm:py-20"
        >
          {/* Background blobs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-24 -right-24 h-60 w-60 rounded-full bg-purple-500/25 blur-3xl" />
            <div className="absolute -bottom-28 -left-28 h-72 w-72 rounded-full bg-violet-600/20 blur-3xl" />
            <div className="absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-3xl" />
          </div>

          <div className="relative space-y-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 shadow-lg">
              <Handshake className="h-8 w-8 text-purple-300" />
            </div>

            <ScriptHeading className="text-white text-4xl sm:text-5xl lg:text-6xl">
              Ready to grow together?
            </ScriptHeading>

            <p className="mx-auto mt-4 max-w-2xl text-lg text-purple-100/80">
              Join the Adon ERP Partner Program and start unlocking new
              opportunities today. Your next chapter starts here.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="#"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-purple-900 shadow-xl transition-all hover:shadow-2xl hover:-translate-y-0.5"
              >
                Apply now
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:border-white/40"
              >
                <Calendar className="h-4 w-4" />
                Book a call
              </Link>
            </div>

            <p className="mt-6 text-sm text-purple-200/60">
              Free to apply · No commitment required · Fast review process
            </p>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
