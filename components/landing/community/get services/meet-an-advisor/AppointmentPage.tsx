"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Star,
  Users,
  Calendar,
  Check,
  Clock,
  Video,
  Building,
  Briefcase,
  Award,
} from "lucide-react";

const appointments = [
  {
    title: "Micro Company",
    subtitle: "1-5 employees",
    type: "Online",
    duration: "1 hour",
    image: "/Assets/apps/meeting.avif",
    benefits: ["tailored demonstration", "custom recommendations", "quick setup guide"],
  },
  {
    title: "Small Company",
    subtitle: "5-250 employees",
    type: "Online",
    duration: "1 hour",
    image: "/Assets/apps/meeting2.avif",
    benefits: ["tailored demonstration", "implementation roadmap", "team training plan"],
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
      className={`text-balance text-4xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-5xl ${className}`}
      style={{
        fontFamily:
          '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
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

export default function AppointmentPage() {
  return (
    <main className="overflow-hidden bg-[linear-gradient(180deg,_#fff_0%,_#faf5ff_18%,_#ffffff_100%)] text-slate-800">
      {/* Hero Section */}
      <section className="relative isolate">
        <div className="absolute inset-x-0 top-0 -z-10 h-[28rem] bg-[radial-gradient(circle_at_15%_12%,rgba(147,51,234,0.08),transparent_25%),radial-gradient(circle_at_85%_15%,rgba(168,85,247,0.06),transparent_24%)]" />
        <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <SectionEyebrow
            icon={<Calendar className="h-4 w-4" />}
            label="Book a meeting"
          />
          <ScriptHeading className="mt-6">
            Choose your{" "}
            <span className="underline decoration-yellow-400 decoration-4 underline-offset-8">
              appointment
            </span>
          </ScriptHeading>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Schedule a free consultation with our experts. Get personalized
            guidance for your business needs.
          </p>
        </div>
      </section>

      {/* Cards Section */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          {appointments.map((item, index) => (
            <div
              key={item.title}
              className="group rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden rounded-t-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
                <Image
                  src={item.image}
                  alt={item.title}
                  width={600}
                  height={300}
                  className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 z-20 flex gap-2">
                  <span className="rounded-full bg-purple-600/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-white">
                    {item.type}
                  </span>
                  <span className="rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-slate-700">
                    ◷ {item.duration}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-7">
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-700">
                    {index === 0 ? (
                      <Building className="h-5 w-5" />
                    ) : (
                      <Briefcase className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-500">{item.subtitle}</p>
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  <p className="text-sm font-semibold text-purple-700">
                    What you'll get:
                  </p>
                  <ul className="space-y-2">
                    {item.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-center gap-2 text-sm text-slate-600">
                        <Check className="h-4 w-4 text-purple-500" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <button className="mt-8 w-full rounded-xl bg-purple-700 py-3.5 font-semibold text-white transition hover:bg-purple-800">
                  Book now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Extra Info Banner */}
        <div className="mt-12 rounded-2xl border border-purple-100 bg-purple-50/50 p-6 text-center">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 sm:flex-row sm:justify-between sm:text-left">
            <div>
              <h4 className="font-semibold text-slate-900">Need a custom plan?</h4>
              <p className="text-sm text-slate-600">
                We also offer consultations for larger teams and enterprises.
              </p>
            </div>
            <button className="rounded-xl border border-purple-300 bg-white px-5 py-2.5 text-sm font-semibold text-purple-700 transition hover:bg-purple-50">
              Contact Sales
            </button>
          </div>
        </div>

        {/* Trust Badge */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-center">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span>4.9/5 from 500+ reviews</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Users className="h-4 w-4 text-purple-500" />
            <span>15M+ happy users</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Clock className="h-4 w-4 text-purple-500" />
            <span>Free 1-hour session</span>
          </div>
        </div>
      </section>
    </main>
  );
}