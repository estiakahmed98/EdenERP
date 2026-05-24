import type { Metadata } from "next";
import Link from "next/link";
import {
  Award,
  BadgeCheck,
  BookOpen,
  Briefcase,
  CheckCircle2,
  Clock3,
  Globe,
  GraduationCap,
  ShieldCheck,
  Sparkles,
  Star,
  Trophy,
  Users,
} from "lucide-react";
import { getTranslations } from "next-intl/server";

import { getLocaleAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations(
    "pages.community.metadata.learnCertifications",
  );

  return {
    title: t("title"),
    description: t("description"),
    alternates: getLocaleAlternates("/community/learn/certifications"),
  };
}

const certifications = [
  {
    title: "Functional Consultant",
    level: "Intermediate",
    duration: "6 Weeks",
    students: "12k+ Certified",
  },
  {
    title: "Technical Developer",
    level: "Advanced",
    duration: "8 Weeks",
    students: "8k+ Certified",
  },
  {
    title: "Accounting Specialist",
    level: "Beginner",
    duration: "4 Weeks",
    students: "15k+ Certified",
  },
  {
    title: "Project Implementation",
    level: "Professional",
    duration: "10 Weeks",
    students: "5k+ Certified",
  },
];

const benefits = [
  "Industry-recognized certifications",
  "Real-world ERP workflows",
  "Hands-on practical exams",
  "Career-ready learning paths",
  "Global partner opportunities",
  "Official AdonERP badge",
];

export default function CertificationsPage() {
  return (
    <main className="overflow-hidden bg-[linear-gradient(180deg,#fff_0%,#faf7ff_25%,#ffffff_100%)] text-slate-800">
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.14),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(251,191,36,0.14),transparent_28%)]" />

        <div className="mx-auto grid max-w-7xl gap-16 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.95fr] lg:px-8 lg:py-24">
          <div className="max-w-2xl space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-700 ring-1 ring-violet-100">
              <Award className="h-4 w-4" />
              AdonERP Certifications
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/70">
                  Community / Learn / Certifications
                </p>

                <h1
                  className="text-5xl font-semibold leading-none tracking-tight text-slate-900 sm:text-6xl"
                  style={{
                    fontFamily:
                      '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
                  }}
                >
                  Validate Your
                  <br />
                  ERP Expertise
                </h1>
              </div>

              <p className="max-w-xl text-lg leading-8 text-slate-600">
                Become officially certified in AdonERP and showcase your
                implementation, accounting, technical, and business process
                skills with globally recognized credentials.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-transform duration-300 hover:-translate-y-0.5"
              >
                Get Certified
              </Link>

              <Link
                href="/community/learn/training"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-colors duration-300 hover:border-primary/30 hover:text-primary"
              >
                Explore Training
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ["50k+", "Certified Professionals"],
                ["120+", "Countries"],
                ["98%", "Success Rate"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm"
                >
                  <div className="text-3xl font-bold text-slate-900">
                    {value}
                  </div>
                  <div className="mt-1 text-sm text-slate-500">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto flex w-full max-w-xl items-center justify-center">
            <div className="absolute -top-6 right-10 h-36 w-36 rounded-full bg-violet-100 blur-3xl" />
            <div className="absolute -bottom-8 left-6 h-32 w-32 rounded-full bg-amber-100 blur-3xl" />

            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/80 bg-white p-8 shadow-[0_35px_90px_rgba(15,23,42,0.12)]">
              <div className="rounded-xl bg-[linear-gradient(135deg,#6d28d9_0%,#8b5cf6_55%,#f59e0b_100%)] p-8 text-white shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.25em] text-white/80">
                      Official Certificate
                    </p>
                    <h3 className="mt-3 text-3xl font-bold">
                      AdonERP Expert
                    </h3>
                  </div>

                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
                    <Trophy className="h-8 w-8" />
                  </div>
                </div>

                <div className="mt-10 rounded-2xl bg-white/10 p-5 backdrop-blur-sm">
                  <div className="flex items-center justify-between text-sm text-white/80">
                    <span>Certification ID</span>
                    <span>EDN-ERP-2026</span>
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                    <BadgeCheck className="h-7 w-7 text-emerald-300" />
                    <div>
                      <p className="font-semibold">Globally Verified</p>
                      <p className="text-sm text-white/75">
                        Shareable public credential
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700 ring-1 ring-amber-100">
            <GraduationCap className="h-4 w-4" />
            Certification Tracks
          </div>

          <h2
            className="mt-8 text-4xl font-semibold text-slate-900 sm:text-5xl"
            style={{
              fontFamily:
                '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
            }}
          >
            Choose your specialization
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {certifications.map((item) => (
            <div
              key={item.title}
              className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
                <BookOpen className="h-7 w-7" />
              </div>

              <h3 className="mt-6 text-xl font-semibold text-slate-900">
                {item.title}
              </h3>

              <div className="mt-5 space-y-3 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-500" />
                  {item.level}
                </div>

                <div className="flex items-center gap-2">
                  <Clock3 className="h-4 w-4 text-amber-500" />
                  {item.duration}
                </div>

                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-violet-500" />
                  {item.students}
                </div>
              </div>

              <button className="mt-7 w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary">
                View Certification
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#f8f8fb] py-16 lg:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(168,85,247,0.08),transparent_22%)]" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 ring-1 ring-emerald-100">
              <Sparkles className="h-4 w-4" />
              Why get certified?
            </div>

            <h2
              className="mt-8 text-4xl font-semibold text-slate-900 sm:text-5xl"
              style={{
                fontFamily:
                  '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
              }}
            >
              Build trust with
              <br />
              proven skills
            </h2>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-600">
              Certification proves your capability to implement, manage, and
              optimize ERP systems professionally for businesses worldwide.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <div
                key={benefit}
                className="rounded-[1.8rem] border border-white bg-white p-6 shadow-sm"
              >
                <CheckCircle2 className="h-7 w-7 text-emerald-500" />

                <p className="mt-4 text-base font-medium text-slate-700">
                  {benefit}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="rounded-[3rem] bg-[linear-gradient(135deg,#ffffff_0%,#faf5ff_50%,#fff7ed_100%)] px-8 py-16 shadow-[0_35px_90px_rgba(15,23,42,0.08)]">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-violet-100 text-violet-700">
              <Globe className="h-8 w-8" />
            </div>

            <h2
              className="mt-8 text-4xl font-semibold text-slate-900 sm:text-5xl"
              style={{
                fontFamily:
                  '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
              }}
            >
              Ready to become
              <br />
              officially certified?
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600">
              Join thousands of professionals who grow their ERP careers with
              official AdonERP certifications and verified expertise.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-transform duration-300 hover:-translate-y-0.5"
              >
                Start Certification
              </Link>

              <Link
                href="/community/learn/tutorials"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-colors duration-300 hover:border-primary/30 hover:text-primary"
              >
                Browse Tutorials
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
