"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
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

const UPCOMING_EVENTS = [
  {
    type: "Webinar",
    title: "Adon ERP 17 Release Deep Dive",
    date: "Jun 25, 2026",
    time: "14:00 UTC",
    speakers: ["Omar Yousef", "Aisha Karim"],
    attendees: 840,
    tags: ["release", "v17"],
    color: "from-blue-500 to-indigo-600",
  },
  {
    type: "Workshop",
    title: "Build Your First Custom Module in 90 Minutes",
    date: "Jul 2, 2026",
    time: "10:00 UTC",
    speakers: ["Jules P.", "Lena K."],
    attendees: 530,
    tags: ["workshop", "development"],
    color: "from-emerald-500 to-teal-600",
  },
  {
    type: "Meetup",
    title: "AdonERP Community Meetup — Berlin",
    date: "Jul 18, 2026",
    time: "18:00 CET",
    speakers: ["Community Team"],
    attendees: 120,
    tags: ["meetup", "in-person"],
    color: "from-violet-500 to-purple-600",
  },
  {
    type: "Webinar",
    title: "Multi-currency & Compliance: A Practical Guide",
    date: "Aug 5, 2026",
    time: "11:00 UTC",
    speakers: ["Rajesh M.", "Nadia R."],
    attendees: 610,
    tags: ["accounting", "compliance"],
    color: "from-amber-500 to-orange-600",
  },
];

const PAST_EVENTS = [
  {
    type: "Conference",
    title: "Adon ERP Open Source Conference 2026",
    attendees: 2100,
    recordings: true,
  },
  {
    type: "Workshop",
    title: "Migrating from v16 to v17",
    attendees: 890,
    recordings: true,
  },
  {
    type: "Webinar",
    title: "Inventory: Advanced Stock Control",
    attendees: 670,
    recordings: true,
  },
];

const FEATURES = [
  {
    icon: Calendar,
    title: "Live webinars",
    description:
      "Join the core team and community experts for deep-dive sessions on new features, best practices, and migration paths.",
  },
  {
    icon: Code2,
    title: "Hands-on workshops",
    description:
      "Code alongside the instructors. Each workshop ships with a ready-to-run sandbox and post-event lab exercises.",
  },
  {
    icon: MapPin,
    title: "Community meetups",
    description:
      "In-person gatherings in major cities around the world — from Berlin to Nairobi. Host your own local meetup with our kit.",
  },
  {
    icon: Video,
    title: "Recorded library",
    description:
      "Missed a session? Every event is recorded and added to the on-demand library within 24 hours of going live.",
  },
];

const SPEAKERS = [
  {
    name: "Omar Yousef",
    topic: "Adon ERP Core",
    avatar: "OY",
    color: "from-blue-500 to-indigo-600",
  },
  {
    name: "Aisha Karim",
    topic: "Product Roadmap",
    avatar: "AK",
    color: "from-purple-500 to-violet-600",
  },
  {
    name: "Lena Kowalska",
    topic: "Addon Development",
    avatar: "LK",
    color: "from-emerald-500 to-teal-600",
  },
  {
    name: "Rajesh M.",
    topic: "Accounting & Tax",
    avatar: "RM",
    color: "from-amber-500 to-orange-600",
  },
];

const STATS = [
  { value: "60+", label: "Events hosted" },
  { value: "12K+", label: "Total attendees" },
  { value: "180+", label: "Countries reached" },
  { value: "4.8/5", label: "Avg rating" },
];

const SCHEDULE = [
  {
    time: "14:00",
    label: "Opening Keynote",
    speaker: "Omar Y.",
    description: "State of Adon ERP: what shipped, what is next, and how you can help.",
  },
  {
    time: "14:30",
    label: "Hands-on demo",
    speaker: "Aisha K.",
    description: "Building a purchasing workflow from scratch in the live sandbox.",
  },
  {
    time: "15:15",
    label: "Lightning talks",
    speaker: "Community",
    description: "Five 5-minute talks from first-time and repeat contributors.",
  },
  {
    time: "15:45",
    label: "Open Q&A",
    speaker: "Core team",
    description: "Ask anything — roadmap, architecture, licensing, or career paths.",
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
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary shadow-sm ring-1 ring-primary/20">
      <span className="text-primary">{icon}</span>
      {label}
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
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-80px" });

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
              icon={<Calendar className="h-4 w-4" />}
              label="Community events"
            />

            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/70">
                Community / Collaborate / Events
              </p>
              <div className="space-y-3">
                <p
                  className="text-2xl font-medium text-muted-foreground"
                  style={{
                    fontFamily:
                      '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
                  }}
                >
                  Learn together,
                </p>
                <h1
                  className="text-5xl font-semibold leading-none tracking-tight text-foreground sm:text-6xl"
                  style={{
                    fontFamily:
                      '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
                  }}
                >
                  grow
                  <br />
                  <span className="text-primary">together</span>
                </h1>
              </div>
              <p className="max-w-lg text-lg leading-8 text-muted-foreground">
                Webinars, workshops, meetups, and conferences — both online and
                in-person. Join the Adon ERP community wherever you are in the
                world.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="#upcoming"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform duration-300 hover:-translate-y-0.5 hover:bg-primary/90"
              >
                <Calendar className="h-4 w-4" />
                See upcoming events
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground shadow-sm transition-colors duration-300 hover:border-primary/30 hover:text-primary"
              >
                <MapPin className="h-4 w-4" />
                Host a meetup
              </a>
            </div>

            {/* Stats strip */}
            <div className="grid grid-cols-4 gap-3 rounded-2xl border border-primary/20 bg-card/80 p-5 backdrop-blur-sm shadow-sm">
              {STATS.map((s) => (
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
                <span className="text-sm font-semibold text-foreground">June 2026</span>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
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
                  {[
                    { day: "Jun 25", event: "v17 Release Deep Dive — Webinar" },
                    { day: "Jul 2", event: "Custom Module Workshop" },
                    { day: "Jul 18", event: "Berlin Community Meetup" },
                  ].map((ev, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 rounded-lg border border-primary/20 bg-primary/5 px-3 py-2"
                    >
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-black text-primary-foreground">
                        {ev.day.split(" ")[1]}
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
            icon={<Sparkles className="h-4 w-4" />}
            label="Upcoming"
          />
          <ScriptHeading className="mt-6">
            Mark your calendar
          </ScriptHeading>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Live events every month — webinars, workshops, meetups, and
            lightning sessions. Register for free.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {UPCOMING_EVENTS.map((event, index) => (
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
                  {event.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground bg-muted/30 px-2 py-0.5 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div className="flex -space-x-2">
                    {event.speakers.map((s, i) => (
                      <div
                        key={s}
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/80 text-[9px] font-black text-primary-foreground ring-2 ring-card"
                        title={s}
                      >
                        {s
                          .split(" ")
                          .map((w) => w[0])
                          .join("")}
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
                  Register free
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
            icon={<Star className="h-4 w-4" />}
            label="Events format"
          />
          <ScriptHeading className="mt-6">
            Four ways to meet the community
          </ScriptHeading>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Whether you prefer deep dives, quick learning, or real-world
            networking — there is an event format for you.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;
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
            icon={<Crown className="h-4 w-4" />}
            label="Featured speakers"
          />
          <ScriptHeading className="mt-6">
            Learn from the best
          </ScriptHeading>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Core team members and top community contributors share their
            expertise in every session.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SPEAKERS.map((speaker, index) => (
            <motion.div
              key={speaker.name}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              viewport={{ once: true, amount: 0.15 }}
              className="group rounded-3xl border border-border bg-card p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl text-center"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br text-lg font-black text-primary-foreground shadow-md shadow-primary/10">
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
              icon={<BookOpen className="h-4 w-4" />}
              label="A typical session"
            />
            <ScriptHeading className="mt-6">
              What to expect
            </ScriptHeading>
            <p className="mt-4 text-lg text-muted-foreground">
              A 90-minute format designed to maximise learning and minimise
              meeting-fatigue.
            </p>
          </div>

          <div className="space-y-3">
            {SCHEDULE.map((item, index) => (
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
            icon={<BookOpen className="h-4 w-4" />}
            label="On demand"
          />
          <ScriptHeading className="mt-6">
            Missed something? Watch it
          </ScriptHeading>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Every session is recorded and added to the on-demand library so you
            can catch up at your own pace.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {PAST_EVENTS.map((event, index) => (
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
                Watch recording
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
            icon={<Users className="h-4 w-4" />}
            label="Member voices"
          />
          <ScriptHeading className="mt-6">
            From the
            <br />
            event community
          </ScriptHeading>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          {[
            {
              quote:
                "The v17 Release Deep Dive answered every question I had about migration. Being able to ask the core team directly saved us weeks of uncertainty.",
              name: "Adèle Moreau",
              role: "Operations Lead · France",
              avatar: "AM",
            },
            {
              quote:
                "The Berlin meetup was incredible. I met three people I now work with daily. These events are where the real networking happens.",
              name: "Fritz Lehmann",
              role: "Tech Lead · Germany",
              avatar: "FL",
            },
          ].map((t, index) => (
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
                  &quot;{t.quote}&quot;
                </p>
                <div className="flex items-center gap-1 text-primary/60">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <div className="flex items-center gap-4 border-t border-border pt-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/80 text-sm font-black text-primary-foreground">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{t.name}</p>
                    <p className="text-sm text-muted-foreground">{t.role}</p>
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
              Your seat is
              <br />
              waiting
            </ScriptHeading>

            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/80">
              From quick 30-minute webinars to full-day hands-on workshops —
              there is always something happening in the Adon ERP community.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-primary shadow-xl transition-all hover:shadow-2xl hover:-translate-y-0.5"
              >
                <Calendar className="h-4 w-4" />
                Browse all events
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:border-white/40"
              >
                <Globe2 className="h-4 w-4" />
                Join the newsletter
              </a>
            </div>

            <p className="mt-6 text-sm text-primary-foreground/60">
              Free attendance &middot; Recordings on demand &middot; Open to everyone
            </p>
          </div>
        </motion.div>
      </section>
    </main>
  );
}