"use client";

import { useState } from "react";
import {
  ArrowRight,
  Briefcase,
  Building,
  Calendar,
  Clock,
  HelpCircle,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Search,
  Send,
  Sparkles,
  Star,
  Users
} from "lucide-react";
import { useTranslations } from "next-intl";

type ContactKey = "advisor" | "development" | "partner" | "bug";
type EmergencyKey = "bangladesh" | "support" | "office";

const offices = [
  {
    countryKey: "bangladesh",
    phone: "+880 1700 000000",
    email: "bd@adon-erp.com",
    tags: ["sales", "services", "support"] as const,
    addressKeys: ["line1", "line2", "line3"] as const
  }
] as const;

const contacts: Array<{
  key: ContactKey;
  icon: typeof Calendar;
  color: string;
}> = [
  {
    key: "advisor",
    icon: Calendar,
    color: "from-purple-500 to-indigo-500"
  },
  {
    key: "development",
    icon: Sparkles,
    color: "from-blue-500 to-cyan-500"
  },
  {
    key: "partner",
    icon: Briefcase,
    color: "from-green-500 to-emerald-500"
  },
  {
    key: "bug",
    icon: Send,
    color: "from-orange-500 to-red-500"
  }
];

const emergencyLines: Array<{ key: EmergencyKey; number: string }> = [
  { key: "bangladesh", number: "+880 1700 000000" },
  { key: "support", number: "+880 1800 000000" },
  { key: "office", number: "+880 1900 000000" }
];

function ScriptHeading({
  children,
  className = ""
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`text-balance text-4xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-5xl ${className}`}
      style={{
        fontFamily:
          '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive'
      }}
    >
      {children}
    </h2>
  );
}

function SectionEyebrow({
  icon,
  label
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

export default function SupportPage() {
  const t = useTranslations("SupportPage");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <main className="overflow-hidden bg-[linear-gradient(180deg,_#fff_0%,_#faf5ff_18%,_#f4f4f4_100%)] font-sans text-slate-800">
      <section className="relative isolate">
        <div className="absolute inset-x-0 top-0 -z-10 h-[28rem] bg-[radial-gradient(circle_at_15%_12%,rgba(147,51,234,0.08),transparent_25%),radial-gradient(circle_at_85%_15%,rgba(168,85,247,0.06),transparent_24%)]" />
        <div className="absolute left-0 top-32 -z-5 h-[420px] w-[120%] rounded-full bg-purple-50/50" />

        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <SectionEyebrow
              icon={<HelpCircle className="h-4 w-4" />}
              label={t("hero.eyebrow")}
            />
            <ScriptHeading className="mt-4">{t("hero.title")}</ScriptHeading>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
              {t("hero.description")}
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-3xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder={t("hero.searchPlaceholder")}
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  className="h-14 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-4 text-lg outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
                  style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
                />
              </div>

              <span className="text-center text-slate-400">{t("hero.or")}</span>

              <button className="inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-purple-700 px-8 font-semibold text-white shadow-lg shadow-purple-700/20 transition hover:-translate-y-0.5 hover:bg-purple-800">
                <MessageCircle className="h-5 w-5" />
                {t("hero.askHuman")}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <ScriptHeading>{t("contact.title")}</ScriptHeading>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            {t("contact.description")}
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <div className="grid gap-4 md:col-span-2 md:grid-cols-2">
            {contacts.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.key}
                  className="group flex h-28 items-center justify-center gap-3 rounded-2xl bg-white text-xl font-bold text-purple-700 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
                >
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-br ${item.color} text-white shadow-sm`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  {t(`contact.${item.key}`)}
                  <ArrowRight className="h-5 w-5 opacity-0 transition group-hover:opacity-100" />
                </button>
              );
            })}
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100">
                <Phone className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">
                {t("emergency.title")}
              </h3>
            </div>

            <div className="mt-6 space-y-4">
              {emergencyLines.map((line) => (
                <div
                  key={line.key}
                  className="flex items-center justify-between border-b border-slate-100 pb-3"
                >
                  <span
                    className="text-slate-600"
                    style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
                  >
                    {t(`emergency.${line.key}`)}
                  </span>
                  <a
                    href={`tel:${line.number}`}
                    className="font-bold text-purple-700 hover:underline"
                    style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
                  >
                    {line.number}
                  </a>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-xl bg-purple-50 p-4 text-center">
              <p className="text-sm text-slate-600">{t("emergency.available")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f4f4f4] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <ScriptHeading>
              {t.rich("offices.title", {
                accent: (chunks) => (
                  <span className="text-purple-700">{chunks}</span>
                )
              })}
            </ScriptHeading>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
              {t("offices.description")}
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {offices.map((office) => (
              <div
                key={office.countryKey}
                className="group rounded-2xl bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 text-purple-700">
                    <Building className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">
                      {t("offices.officeTitle")}
                    </h3>
                    <p
                      className="text-slate-500"
                      style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
                    >
                      {t(`offices.${office.countryKey}.city`)}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {office.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700"
                    >
                      {t(`offices.${office.countryKey}.tags.${tag}`)}
                    </span>
                  ))}
                </div>

                <div className="mt-6 space-y-2">
                  {office.addressKeys.map((line) => (
                    <p key={line} className="flex items-start gap-2 text-sm text-slate-600">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-purple-500" />
                      <span>{t(`offices.${office.countryKey}.address.${line}`)}</span>
                    </p>
                  ))}
                </div>

                <div className="mt-6 space-y-2">
                  <a
                    href={`tel:${office.phone}`}
                    className="flex items-center gap-2 text-sm font-semibold text-purple-700 hover:underline"
                  >
                    <Phone className="h-4 w-4" />
                    {office.phone}
                  </a>
                  <a
                    href={`mailto:${office.email}`}
                    className="flex items-center gap-2 text-sm font-semibold text-purple-700 hover:underline"
                  >
                    <Mail className="h-4 w-4" />
                    {office.email}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-8 text-center">
          <div
            className="flex items-center gap-2 text-sm text-slate-500"
            style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
          >
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span>{t("trust.reviews")}</span>
          </div>
          <div
            className="flex items-center gap-2 text-sm text-slate-500"
            style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
          >
            <Users className="h-4 w-4 text-purple-500" />
            <span>{t("trust.users")}</span>
          </div>
          <div
            className="flex items-center gap-2 text-sm text-slate-500"
            style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
          >
            <Clock className="h-4 w-4 text-purple-500" />
            <span>{t("trust.support")}</span>
          </div>
          <div
            className="flex items-center gap-2 text-sm text-slate-500"
            style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
          >
            <MessageCircle className="h-4 w-4 text-purple-500" />
            <span>{t("trust.response")}</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-purple-600 to-indigo-600 p-10 text-center text-white">
          <h2 className="text-3xl font-bold">{t("cta.title")}</h2>
          <p className="mx-auto mt-2 max-w-xl text-purple-100">
            {t("cta.description")}
          </p>
          <button className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3 font-semibold text-purple-700 transition hover:-translate-y-0.5 hover:shadow-lg">
            {t("cta.action")}
            <MessageCircle className="h-4 w-4" />
          </button>
        </div>
      </section>
    </main>
  );
}
