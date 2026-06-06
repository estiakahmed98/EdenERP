// app/[locale]/contact/ContactClient.tsx

"use client";

import {
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  Building2,
  Users,
  Briefcase,
  Globe,
  ChevronRight,
  Sparkles,
  Headphones,
  ShieldCheck,
  Star,
  Rocket,
  Calendar,
  Linkedin,
  Facebook,
  Twitter,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

type ContactInfo = {
  icon: "mail" | "phone" | "mapPin" | "clock";
  title: string;
  details: string[];
  action?: string;
  href?: string;
};

const contactInfoIcons = {
  mail: Mail,
  phone: Phone,
  mapPin: MapPin,
  clock: Clock,
} as const;

function HandwrittenHeading({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`text-balance text-4xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-5xl dark:text-slate-100 ${className}`}
      style={{
        fontFamily: `"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive`,
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
    <div className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-white/80 px-4 py-2 text-sm font-semibold text-primary shadow-sm backdrop-blur-xl dark:bg-slate-950/60">
      <span>{icon}</span>
      {label}
    </div>
  );
}

export default function ContactClient() {
  const t = useTranslations("pages.contact");

  const contactInfo: ContactInfo[] = [
    {
      icon: "phone",
      title: t("contactInfo.phone.title"),
      details: [t("contactInfo.phone.number1"), t("contactInfo.phone.number2")],
      action: t("contactInfo.phone.action"),
      href: "tel:+8801234567890",
    },
    {
      icon: "mail",
      title: t("contactInfo.email.title"),
      details: [t("contactInfo.email.sales"), t("contactInfo.email.support")],
      action: t("contactInfo.email.action"),
      href: "mailto:sales@adonerp.com",
    },
    {
      icon: "mapPin",
      title: t("contactInfo.address.title"),
      details: [
        t("contactInfo.address.line1"),
        t("contactInfo.address.line2"),
        t("contactInfo.address.line3"),
      ],
    },
    {
      icon: "clock",
      title: t("contactInfo.hours.title"),
      details: [t("contactInfo.hours.weekdays"), t("contactInfo.hours.weekend")],
    },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-[linear-gradient(180deg,_#ffffff_0%,_#fbf7ff_22%,_#ffffff_55%,_#fff8ed_100%)] text-slate-800 dark:bg-[linear-gradient(180deg,_#020617_0%,_#0b1220_35%,_#020617_70%,_#020617_100%)] dark:text-slate-100">
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden rounded-b-[3rem] sm:rounded-b-[5rem] lg:rounded-b-[7rem]">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_15%_12%,rgba(124,58,237,0.18),transparent_28%),radial-gradient(circle_at_85%_18%,rgba(245,158,11,0.16),transparent_26%),linear-gradient(180deg,#ffffff_0%,#fbf7ff_62%,#ffffff_100%)] dark:bg-[radial-gradient(circle_at_15%_12%,rgba(124,58,237,0.22),transparent_32%),radial-gradient(circle_at_85%_18%,rgba(245,158,11,0.18),transparent_30%),linear-gradient(180deg,#020617_0%,#0b1220_62%,#020617_100%)]" />
        
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <SectionEyebrow
              icon={<MessageSquare className="h-4 w-4" />}
              label={t("hero.eyebrowLabel")}
            />
            <div className="mt-8">
              <h1
                className="text-balance text-5xl font-semibold leading-[0.98] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl dark:text-slate-100"
                style={{
                  fontFamily: `"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive`,
                }}
              >
                {t("hero.title")}
                <span className="block bg-[linear-gradient(90deg,_#6d28d9,_#db2777,_#f59e0b)] bg-clip-text text-transparent">
                  {t("hero.titleAccent")}
                </span>
              </h1>
            </div>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              {t("hero.description")}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="mx-auto max-w-7xl px-4 -mt-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {contactInfo.map((info) => {
            const Icon = contactInfoIcons[info.icon];
            return (
              <div
                key={info.title}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-950/80"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-slate-950 dark:text-slate-100">
                    {info.title}
                  </h3>
                  <div className="mt-3 space-y-1">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-sm text-slate-600 dark:text-slate-300">
                        {detail}
                      </p>
                    ))}
                  </div>
                  {info.action && info.href && (
                    <a
                      href={info.href}
                      className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary transition-all duration-300 hover:gap-2"
                    >
                      {info.action}
                      <ChevronRight className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Office Location Section - Without Map */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Office Address */}
          <div>
            <SectionEyebrow
              icon={<MapPin className="h-4 w-4" />}
              label={t("map.eyebrow")}
            />
            <div className="mt-8">
              <HandwrittenHeading>{t("map.title")}</HandwrittenHeading>
            </div>
            <p className="mt-4 text-slate-600 dark:text-slate-300">
              {t("map.description")}
            </p>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-800 dark:bg-slate-950">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Building2 className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-950 dark:text-slate-100">
                    {t("office.fullAddress")}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    Tower 71, Flat # 9 A-B, 516/3 South Manikdi<br />
                    Matikata Road, ECB Chattar, Dhaka Cantonment<br />
                    Dhaka - 1206, Bangladesh
                  </p>
                  <div className="mt-3 flex items-center gap-2 text-xs text-primary">
                    <MapPin className="h-3 w-3" />
                    <span>📍 Landmark: Beside ECB Chattar Circle</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direction Button */}
            <div className="mt-4 rounded-xl bg-primary/5 p-4 text-center dark:bg-primary/10">
              <a
                href="https://maps.google.com/?q=Tower+71+ECB+Chattar+Dhaka+Cantonment"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all hover:gap-3"
              >
                <MapPin className="h-4 w-4" />
                Get Directions to Tower 71, ECB Chattar
                <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Why Choose Us & Social Links */}
          <div className="space-y-8">
            <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-primary/5 to-transparent p-6 dark:border-slate-800">
              <h3 className="text-lg font-semibold text-slate-950 dark:text-slate-100">
                {t("whyChoose.title")}
              </h3>
              <div className="mt-4 space-y-3">
                {t.raw("whyChoose.items").map((item: string) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30">
                      <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm text-slate-600 dark:text-slate-300">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950">
              <h3 className="text-lg font-semibold text-slate-950 dark:text-slate-100">
                {t("social.title")}
              </h3>
              <div className="mt-4 flex gap-4">
                <a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-all duration-300 hover:bg-primary hover:text-white dark:bg-slate-800 dark:text-slate-300"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-all duration-300 hover:bg-primary hover:text-white dark:bg-slate-800 dark:text-slate-300"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-all duration-300 hover:bg-primary hover:text-white dark:bg-slate-800 dark:text-slate-300"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative overflow-hidden bg-[#f6f5f8] py-16 lg:py-24 dark:bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(124,58,237,0.08),transparent_26%),radial-gradient(circle_at_80%_80%,rgba(245,158,11,0.12),transparent_30%)] dark:bg-[radial-gradient(circle_at_18%_20%,rgba(124,58,237,0.16),transparent_30%),radial-gradient(circle_at_80%_80%,rgba(245,158,11,0.16),transparent_34%)]" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {t.raw("stats").map((stat: { value: string; label: string; icon: string }) => {
              const IconMap: Record<string, any> = {
                Users: Users,
                Briefcase: Briefcase,
                Building2: Building2,
                Globe: Globe,
              };
              const Icon = IconMap[stat.icon] || Users;
              return (
                <div
                  key={stat.label}
                  className="text-center transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-lg dark:bg-slate-800">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <p className="mt-4 text-3xl font-bold text-slate-950 dark:text-slate-100">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-6 lg:px-8 lg:pb-28">
        <div className="relative overflow-hidden rounded-[3rem] bg-[linear-gradient(135deg,_#111827_0%,_#4c1d95_55%,_#f59e0b_140%)] px-6 py-14 text-center text-white shadow-[0_35px_90px_rgba(15,23,42,0.18)] sm:px-10 lg:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.18),transparent_24%),radial-gradient(circle_at_82%_80%,rgba(255,255,255,0.14),transparent_26%)]" />

          <div className="relative mx-auto max-w-3xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-xl">
              <Sparkles className="h-8 w-8" />
            </div>

            <h2
              className="mt-8 text-4xl font-semibold leading-tight sm:text-5xl"
              style={{
                fontFamily: `"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive`,
              }}
            >
              {t("cta.title")}
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/75">
              {t("cta.description")}
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 text-sm font-semibold text-slate-950 transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-xl"
              >
                {t("cta.viewPricing")}
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-7 py-4 text-sm font-semibold text-white backdrop-blur-xl transition-colors duration-300 hover:bg-white/15"
              >
                {t("cta.scheduleCall")}
                <Calendar className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-white/70">
              <span className="inline-flex items-center gap-2">
                <Star className="h-4 w-4 fill-amber-300 text-amber-300" />
                {t("cta.freeConsultation")}
              </span>
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-300" />
                {t("cta.support")}
              </span>
              <span className="inline-flex items-center gap-2">
                <Rocket className="h-4 w-4 text-amber-300" />
                {t("cta.customSolutions")}
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}