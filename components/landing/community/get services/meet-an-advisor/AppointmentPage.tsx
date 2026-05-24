"use client";

import Image from "next/image";
import {
  Briefcase,
  Building,
  Calendar,
  Check,
  Clock,
  Star,
  Users,
} from "lucide-react";
import { useTranslations } from "next-intl";

type Appointment = {
  id: string;
  title: string;
  subtitle: string;
  type: string;
  duration: string;
  image: string;
  benefits: string[];
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
    <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary shadow-sm ring-1 ring-primary/20">
      <span className="text-primary">{icon}</span>
      {label}
    </div>
  );
}

export default function AppointmentPage() {
  const t = useTranslations("pages.community.meet-advisor");
  const appointments = t.raw("appointments") as Appointment[];
  const trust = t.raw("trust") as string[];

  return (
    <main className="overflow-hidden bg-background text-foreground">
      <section className="relative isolate">
        <div className="absolute inset-x-0 top-0 -z-10 h-[28rem] bg-[radial-gradient(circle_at_15%_12%,rgba(139,92,246,0.08),transparent_25%),radial-gradient(circle_at_85%_15%,rgba(139,92,246,0.06),transparent_24%)]" />
        <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <SectionEyebrow
            icon={<Calendar className="h-4 w-4" />}
            label={t("hero.eyebrow")}
          />
          <ScriptHeading className="mt-6">
            {t("hero.title")}
          </ScriptHeading>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            {t("hero.description")}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          {appointments.map((item, index) => (
            <div
              key={item.id}
              className="group rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="relative overflow-hidden rounded-t-2xl">
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/20 to-transparent" />
                <Image
                  src={item.image}
                  alt={item.title}
                  width={600}
                  height={300}
                  className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute right-4 top-4 z-20 flex gap-2">
                  <span className="rounded-full bg-primary/90 px-3 py-1 text-xs font-semibold text-primary-foreground backdrop-blur-sm">
                    {item.type}
                  </span>
                  <span className="rounded-full bg-card/90 px-3 py-1 text-xs font-semibold text-foreground backdrop-blur-sm">
                    ◷ {item.duration}
                  </span>
                </div>
              </div>

              <div className="p-7">
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    {index === 0 ? (
                      <Building className="h-5 w-5" />
                    ) : (
                      <Briefcase className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {item.subtitle}
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  <p className="text-sm font-semibold text-primary">
                    {t("card.label")}
                  </p>
                  <ul className="space-y-2">
                    {item.benefits.map((benefit) => (
                      <li
                        key={benefit}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <Check className="h-4 w-4 text-primary" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <button className="mt-8 w-full rounded-xl bg-primary py-3.5 font-semibold text-primary-foreground transition hover:bg-primary/90">
                  {t("card.book")}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-primary/20 bg-primary/5 p-6 text-center">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 sm:flex-row sm:justify-between sm:text-left">
            <div>
              <h4 className="font-semibold text-foreground">{t("banner.title")}</h4>
              <p className="text-sm text-muted-foreground">
                {t("banner.description")}
              </p>
            </div>
            <button className="rounded-xl border border-primary/30 bg-card px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary/10">
              {t("banner.action")}
            </button>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-center">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span>{trust[0]}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4 text-primary" />
            <span>{trust[1]}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4 text-primary" />
            <span>{trust[2]}</span>
          </div>
        </div>
      </section>
    </main>
  );
}
