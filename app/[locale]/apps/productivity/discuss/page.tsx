"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Bell,
  CheckCircle2,
  Globe2,
  Mail,
  MessageCircle,
  MonitorPlay,
  Play,
  Sparkles,
  Star,
  Users,
  Video,
  Zap,
} from "lucide-react";

import { HandUnderline } from "@/components/ui/headunderline";

const handwrittenFont =
  '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive';

// Helper component to get icon by name
const getIconComponent = (iconName: string) => {
  const icons: Record<string, React.ElementType> = {
    BadgeCheck, BarChart3, Bell, CheckCircle2, Globe2, Mail, MessageCircle,
    MonitorPlay, Play, Sparkles, Star, Users, Video, Zap, ArrowRight,
  };
  return icons[iconName] || MessageCircle;
};

// Avatar images array (kept as static since these are image URLs)
const avatars = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=96&h=96&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=96&h=96&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=96&h=96&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=96&h=96&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&fit=crop&crop=face",
];

function DashedArrow({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 160"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M25 25C75 30 105 58 102 91C99 120 70 138 36 130"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray="10 14"
      />
      <path
        d="M37 130L57 116M37 130L52 151"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function DiscussLandingPage() {
  const t = useTranslations("pages.discuss");
  const commonT = useTranslations("common.actions");

  const channelsList = t.raw("hero.dashboard.channels");
  const messagesList = t.raw("hero.dashboard.messages");
  const integratedItems = t.raw("integratedSection.items");
  const integratedAppsList = t.raw("centralHubSection.apps");
  const integratedAppsFields = t.raw("integratedAppsSection.demo.fields");
  const notificationItems = t.raw("notificationsSection.demo.items");
  const successDemo = t.raw("successSection.demo");
  const featuresList = t.raw("featuresSection.features");
  const appsList = t.raw("appsSection.apps");

  return (
    <main className="overflow-hidden bg-white dark:bg-slate-950 text-slate-900 dark:text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white dark:bg-slate-950 pt-16">
        <div className="mx-auto max-w-7xl px-4 pb-24 text-center sm:px-6 lg:px-8">
          <h1
            className="text-5xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-6xl lg:text-7xl"
            style={{ fontFamily: handwrittenFont }}
          >
            {t("hero.title")}{" "}
            <HandUnderline color="bg-amber-300 dark:bg-amber-800">
              <span className="text-amber-500 dark:text-amber-400">
                {t("hero.titleHighlight")}
              </span>
            </HandUnderline>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
            {t("hero.description")}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-md bg-[#714b67] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#714b67]/20 transition hover:-translate-y-0.5 hover:bg-[#5f3d56] dark:shadow-[#714b67]/40"
            >
              {commonT("contactSales")}
            </Link>

            <Link
              href="#features"
              className="rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-6 py-3 text-sm font-bold text-slate-700 dark:text-slate-200 shadow-sm transition hover:border-[#714b67]/30 hover:text-[#714b67] dark:hover:border-[#9b6a8f] dark:hover:text-[#9b6a8f]"
            >
              {t("hero.advisorButton")}
            </Link>
          </div>

          <div className="relative mx-auto mt-16 max-w-5xl">
            <div className="absolute -left-10 -top-10 hidden text-rose-400 dark:text-rose-500 sm:block">
              <Sparkles className="h-12 w-12 rotate-[-20deg]" />
            </div>

            <div className="relative z-20 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[0_30px_90px_rgba(15,23,42,0.14)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.4)]">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 px-5 py-4 text-left">
                <div className="flex items-center gap-3">
                  <MessageCircle className="h-5 w-5 text-[#714b67] dark:text-[#9b6a8f]" />
                  <span className="font-bold text-slate-900 dark:text-white">
                    {t("hero.dashboard.title")}
                  </span>
                  <span className="hidden text-xs text-slate-400 dark:text-slate-500 sm:block">
                    {t("hero.dashboard.subtitle")}
                  </span>
                </div>

                <button className="rounded-md bg-[#714b67] px-4 py-2 text-xs font-bold text-white hover:bg-[#5f3d56] transition dark:bg-[#8a5a7e] dark:hover:bg-[#7a4a6e]">
                  {t("hero.dashboard.newButton")}
                </button>
              </div>

              <div className="grid bg-[#f7f8fb] dark:bg-[#0f0f1a] p-6 lg:grid-cols-[220px_1fr_220px]">
                <aside className="rounded-xl bg-white dark:bg-slate-800 p-4 text-left shadow-sm ring-1 ring-slate-100 dark:ring-slate-700">
                  <p className="mb-4 font-bold text-slate-900 dark:text-white">
                    Channels
                  </p>

                  {channelsList.map((item: string, index: number) => (
                    <div
                      key={item}
                      className={`mb-2 rounded-md px-3 py-2 text-xs font-bold ${
                        index === 0
                          ? "bg-[#714b67] text-white dark:bg-[#8a5a7e]"
                          : "bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400"
                      }`}
                    >
                      # {item}
                    </div>
                  ))}
                </aside>

                <div className="mt-5 rounded-xl bg-white dark:bg-slate-800 p-5 text-left shadow-sm ring-1 ring-slate-100 dark:ring-slate-700 lg:mx-5 lg:mt-0">
                  <div className="mb-5 rounded-lg bg-slate-50 dark:bg-slate-800/50 p-4">
                    <p className="font-bold text-slate-900 dark:text-white">
                      {t("hero.dashboard.companyUpdate.title")}
                    </p>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                      {t("hero.dashboard.companyUpdate.description")}
                    </p>
                  </div>

                  {messagesList.map((message: any, index: number) => (
                    <div key={message.text} className="mb-4 flex gap-3">
                      <img
                        src={avatars[index % avatars.length]}
                        alt=""
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <div className="rounded-xl bg-[#e9fbf8] dark:bg-[#0a2a2d] px-4 py-3">
                        <p className="text-sm font-bold text-slate-900 dark:text-white">
                          {message.name}
                        </p>
                        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                          {message.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <aside className="mt-5 rounded-xl bg-white dark:bg-slate-800 p-4 text-left shadow-sm ring-1 ring-slate-100 dark:ring-slate-700 lg:mt-0">
                  <p className="mb-4 font-bold text-slate-900 dark:text-white">
                    Online
                  </p>

                  {avatars.slice(0, 5).map((avatar, idx) => (
                    <div key={avatar} className="mb-3 flex items-center gap-3">
                      <img
                        src={avatar}
                        alt=""
                        className="h-9 w-9 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-xs font-bold text-slate-700 dark:text-slate-200">
                          User {idx + 1}
                        </p>
                        <p className="text-[10px] text-emerald-500 dark:text-emerald-400">
                          Online
                        </p>
                      </div>
                    </div>
                  ))}
                </aside>
              </div>

              <button className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white dark:bg-slate-800 text-[#714b67] dark:text-[#9b6a8f] shadow-xl">
                <Play className="ml-1 h-6 w-6 fill-current" />
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 z-0 h-44 w-full bg-[#f3f4f7] dark:bg-[#0f0f1a] [clip-path:polygon(0_42%,100%_0,100%_100%,0_100%)]" />
      </section>

      {/* Adon Discuss: a fully integrated communication hub Section */}
      <section className="bg-white dark:bg-slate-950 py-24 text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            className="mx-auto max-w-3xl text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            {t("integratedSection.title")}{" "}
            <HandUnderline color="bg-sky-300 dark:bg-sky-800">
              <span className="dark:text-sky-200">{t("integratedSection.titleHighlight")}</span>
            </HandUnderline>
            <br />
            {t("integratedSection.titleEnd")}
          </h2>

          <div className="mx-auto mt-14 grid max-w-5xl items-center gap-14 lg:grid-cols-2">
            <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-[0_25px_70px_rgba(15,23,42,0.10)] dark:shadow-[0_25px_70px_rgba(0,0,0,0.3)]">
              {integratedItems.map((item: string, index: number) => (
                <div
                  key={item}
                  className="mb-3 flex items-center gap-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-left"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#714b67] text-xs font-bold text-white dark:bg-[#8a5a7e]">
                    {index + 1}
                  </span>
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-left text-sm leading-7 text-slate-600 dark:text-slate-300">
              {t("integratedSection.description")}
            </p>
          </div>
        </div>
      </section>

      {/* Create message channels to reach the masses Section */}
      <section className="bg-white dark:bg-slate-950 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2
              className="text-5xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-6xl"
              style={{ fontFamily: handwrittenFont }}
            >
              {t("channelsSection.title")}
              <br />
              {t("channelsSection.subtitle")}
              <br />
              <HandUnderline color="bg-sky-300 dark:bg-sky-800">
                <span className="dark:text-sky-200">{t("channelsSection.titleHighlight")}</span>
              </HandUnderline>
            </h2>

            <p className="mt-8 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              {t("channelsSection.description")}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-[0_25px_70px_rgba(15,23,42,0.10)] dark:shadow-[0_25px_70px_rgba(0,0,0,0.3)]">
            <div className="mb-5 flex items-center gap-3">
              <MessageCircle className="h-5 w-5 text-[#714b67] dark:text-[#9b6a8f]" />
              <p className="font-bold text-slate-900 dark:text-white">
                {t("channelsSection.demo.channel")}
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 dark:bg-slate-800/50 p-5">
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                {t("channelsSection.demo.post")}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                {t("channelsSection.demo.content")}
              </p>

              <div className="mt-5 h-48 rounded-xl bg-[url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=900&auto=format&fit=crop')] bg-cover bg-center" />
            </div>
          </div>
        </div>
      </section>

      {/* Adon Discuss is integrated throughout all the Adon apps Section */}
      <section className="bg-white dark:bg-slate-950 py-24 text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            className="mx-auto max-w-4xl text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            {t("integratedAppsSection.title")}
            <br />
            <HandUnderline color="bg-rose-300 dark:bg-rose-800">
              <span className="dark:text-rose-200">{t("integratedAppsSection.titleHighlight")}</span>
            </HandUnderline>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
            {t("integratedAppsSection.description")}
          </p>

          <div className="relative mx-auto mt-14 max-w-3xl">
            <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 text-left shadow-[0_30px_90px_rgba(15,23,42,0.13)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.3)]">
              <div className="mb-5 flex items-center justify-between">
                <p className="font-bold text-slate-900 dark:text-white">
                  {t("integratedAppsSection.demo.title")}
                </p>
                <span className="rounded-full bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  {t("integratedAppsSection.demo.badge")}
                </span>
              </div>

              <div className="grid gap-5 md:grid-cols-[1fr_260px]">
                <div className="space-y-3">
                  {integratedAppsFields.map((field: string) => (
                    <div key={field} className="rounded-lg bg-slate-50 dark:bg-slate-800/50 p-4">
                      <p className="text-xs font-bold text-slate-400 dark:text-slate-500">
                        {field}
                      </p>
                      <p className="mt-2 text-sm font-bold text-slate-900 dark:text-white">
                        Connected business record
                      </p>
                    </div>
                  ))}
                </div>

                <div className="rounded-xl bg-[#e9fbf8] dark:bg-[#0a2a2d] p-4">
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    {t("integratedAppsSection.demo.thread.title")}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {t("integratedAppsSection.demo.thread.description")}
                  </p>
                </div>
              </div>
            </div>

            <DashedArrow className="mx-auto mt-12 h-24 w-24 rotate-90 text-slate-300 dark:text-slate-600" />
          </div>
        </div>
      </section>

      {/* The Discuss app is the central communications hub in Adon Section */}
      <section className="bg-white dark:bg-slate-950 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2
              className="text-5xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-6xl"
              style={{ fontFamily: handwrittenFont }}
            >
              {t("centralHubSection.title")}
              <br />
              <HandUnderline color="bg-sky-300 dark:bg-sky-800">
                <span className="dark:text-sky-200">{t("centralHubSection.titleHighlight")}</span>
              </HandUnderline>{" "}
              {t("centralHubSection.titleEnd")}
            </h2>

            <p className="mt-8 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              {t("centralHubSection.description")}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-[0_25px_70px_rgba(15,23,42,0.10)] dark:shadow-[0_25px_70px_rgba(0,0,0,0.3)]">
            <div className="grid gap-4 md:grid-cols-3">
              {integratedAppsList.map((app: string) => (
                <div key={app} className="rounded-lg bg-slate-50 dark:bg-slate-800/50 p-4 text-center">
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-white dark:bg-slate-800 text-[#02a6a6] dark:text-[#02cfc3] shadow-sm">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <p className="mt-3 text-sm font-bold text-slate-900 dark:text-white">
                    {app}
                  </p>
                  <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                    Connected
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Video meetings for internal and external users Section */}
      <section className="bg-white dark:bg-slate-950 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-[0_25px_70px_rgba(15,23,42,0.10)] dark:shadow-[0_25px_70px_rgba(0,0,0,0.3)]">
            <div className="grid grid-cols-2 gap-3">
              {avatars.slice(0, 4).map((avatar, idx) => (
                <div key={avatar} className="relative overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800">
                  <img src={avatar} alt="" className="h-40 w-full object-cover" />
                  <span className="absolute bottom-3 left-3 rounded-full bg-black/60 px-3 py-1 text-xs font-bold text-white">
                    User {idx + 1}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-center gap-3 rounded-lg bg-slate-900 dark:bg-slate-800 p-4 text-white">
              <Video className="h-5 w-5" />
              <span className="text-sm font-bold">{t("videoSection.demo.videoLabel")}</span>
            </div>
          </div>

          <div>
            <h2
              className="text-5xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-6xl"
              style={{ fontFamily: handwrittenFont }}
            >
              {t("videoSection.title")}
              <br />
              {t("videoSection.subtitle")}
            </h2>

            <p className="mt-8 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              {t("videoSection.description")}
            </p>
          </div>
        </div>
      </section>

      {/* #Message_channels for targeted group communications Section */}
      <section className="bg-white dark:bg-slate-950 py-24 text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            className="mx-auto max-w-4xl text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            {t("messageChannelsSection.title")}{" "}
            <HandUnderline color="bg-amber-300 dark:bg-amber-800">
              <span className="dark:text-amber-200">{t("messageChannelsSection.titleHighlight")}</span>
            </HandUnderline>
            <br />
            {t("messageChannelsSection.titleEnd")}
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
            {t("messageChannelsSection.description")}
          </p>

          <div className="mx-auto mt-14 max-w-3xl rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 text-left shadow-[0_30px_90px_rgba(15,23,42,0.13)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.3)]">
            <div className="mb-5 flex items-center gap-3">
              <MessageCircle className="h-5 w-5 text-[#714b67] dark:text-[#9b6a8f]" />
              <p className="font-bold text-slate-900 dark:text-white">
                {t("messageChannelsSection.demo.channel")}
              </p>
            </div>

            <div className="rounded-xl bg-[#e9fbf8] dark:bg-[#0a2a2d] p-5">
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                {t("messageChannelsSection.demo.post")}
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {t("messageChannelsSection.demo.content")}
              </p>

              <div className="mt-5 h-56 rounded-xl bg-[url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&auto=format&fit=crop')] bg-cover bg-center" />
            </div>
          </div>
        </div>
      </section>

      {/* Notifications all in one place Section */}
      <section className="bg-white dark:bg-slate-950 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-[0_25px_70px_rgba(15,23,42,0.10)] dark:shadow-[0_25px_70px_rgba(0,0,0,0.3)]">
            <p className="mb-5 font-bold text-slate-900 dark:text-white">
              {t("notificationsSection.demo.title")}
            </p>

            {notificationItems.map((item: string) => (
              <div
                key={item}
                className="mb-3 rounded-lg bg-[#e9fbf8] dark:bg-[#0a2a2d] px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200"
              >
                {item}
              </div>
            ))}
          </div>

          <div>
            <h2
              className="text-5xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-6xl"
              style={{ fontFamily: handwrittenFont }}
            >
              {t("notificationsSection.title")}{" "}
              <HandUnderline color="bg-sky-300 dark:bg-sky-800">
                <span className="dark:text-sky-200">{t("notificationsSection.titleHighlight")}</span>
              </HandUnderline>
            </h2>

            <p className="mt-8 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              {t("notificationsSection.description")}
            </p>
          </div>
        </div>
      </section>

      {/* Effective communication drives business success Section */}
      <section className="relative bg-white dark:bg-slate-950 py-24">
        <div className="absolute right-0 top-1/2 z-0 hidden h-80 w-80 -translate-y-1/2 rounded-l-full bg-[#f3f4f7] dark:bg-[#0f0f1a] lg:block" />

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <Zap className="mb-6 h-12 w-12 text-sky-500 dark:text-sky-400" />

            <h2
              className="text-5xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-6xl"
              style={{ fontFamily: handwrittenFont }}
            >
              {t("successSection.title")}
              <br />
              {t("successSection.subtitle")}
            </h2>

            <p className="mt-8 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              {t("successSection.description")}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-[0_25px_70px_rgba(15,23,42,0.10)] dark:shadow-[0_25px_70px_rgba(0,0,0,0.3)]">
            {successDemo.map((item: any, index: number) => (
              <div
                key={item.message}
                className="mb-4 flex gap-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 p-4"
              >
                <img
                  src={avatars[index % avatars.length]}
                  alt=""
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    {item.name}
                  </p>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {item.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section
        id="features"
        className="rounded-t-[4rem] bg-[#f3f4f7] dark:bg-[#0f0f1a] py-20 sm:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            className="max-w-xl text-5xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-6xl"
            style={{ fontFamily: handwrittenFont }}
          >
            {t("featuresSection.title")}{" "}
            <span className="relative inline-block">
              <span className="relative z-10">{t("featuresSection.subtitle")}</span>
              <span className="absolute -bottom-2 left-0 h-2 w-full rounded-full bg-sky-400 dark:bg-sky-500" />
            </span>
          </h2>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {featuresList.map((feature: any) => (
              <div
                key={feature.title}
                className="rounded-xl border border-white dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f8eff6] dark:bg-[#2a1a24] text-[#714b67] dark:text-[#9b6a8f]">
                    <BadgeCheck className="h-5 w-5" />
                  </div>
                  <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <Link
            href="#"
            className="mt-10 inline-flex items-center gap-2 text-sm font-bold text-[#714b67] dark:text-[#9b6a8f] hover:underline"
          >
            {t("featuresSection.seeAllLink")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Apps Section */}
      <section className="bg-white dark:bg-slate-950 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            {t("appsSection.title")}{" "}
          </h2>


          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {appsList.map((app: any) => {
              const Icon = getIconComponent(app.icon);
              return (
                <div
                  key={app.title}
                  className="flex items-center gap-4 rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 p-5 transition hover:bg-white dark:hover:bg-slate-800 hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white dark:bg-slate-800 text-[#02a6a6] dark:text-[#02cfc3] shadow-sm">
                    <Icon className="h-6 w-6" />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">
                      {app.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      {app.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <Link
            href="#"
            className="mt-10 inline-flex items-center gap-2 text-sm font-bold text-[#714b67] dark:text-[#9b6a8f] hover:underline"
          >
            {t("appsSection.seeAllLink")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-white dark:bg-slate-950 py-20">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <div className="relative mx-auto min-h-90">
            {avatars.map((avatar, index) => (
              <img
                key={avatar}
                src={avatar}
                alt=""
                className="absolute z-10 h-14 w-14 rounded-full border-4 border-white dark:border-slate-800 object-cover shadow-lg"
                style={{
                  left: `${10 + ((index * 17) % 78)}%`,
                  top: `${20 + ((index * 29) % 62)}%`,
                }}
              />
            ))}

            {Array.from({ length: 14 }).map((_, index) => (
              <span
                key={`circle-${index}`}
                className="absolute h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-800"
                style={{
                  left: `${5 + ((index * 13) % 88)}%`,
                  top: `${10 + ((index * 23) % 74)}%`,
                }}
              />
            ))}

            {Array.from({ length: 10 }).map((_, index) => (
              <span
                key={`square-${index}`}
                className="absolute h-12 w-12 rounded-md bg-[#714b67] dark:bg-[#9b6a8f]"
                style={{
                  left: `${6 + ((index * 19) % 86)}%`,
                  top: `${12 + ((index * 31) % 78)}%`,
                }}
              />
            ))}

            <div className="absolute left-1/2 top-1/2 z-20 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white/90 dark:bg-slate-900/90 p-8 shadow-[0_25px_80px_rgba(15,23,42,0.12)] dark:shadow-[0_25px_80px_rgba(0,0,0,0.4)] backdrop-blur">
              <p
                className="text-4xl font-bold leading-tight text-slate-900 dark:text-white"
                style={{ fontFamily: handwrittenFont }}
              >
                {t("ctaBanner.title")}
              </p>
              <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                {t("ctaBanner.description")}
              </p>
            </div>
          </div>

          <div className="mx-auto mt-10 max-w-4xl rounded-xl bg-[#f7f7fa] dark:bg-slate-800/50 p-8 text-left shadow-sm">
            <div className="flex flex-col gap-6 md:flex-row md:items-start">
              <div className="text-5xl text-amber-400 dark:text-amber-500">
                “
              </div>

              <div>
                <p className="text-base leading-8 text-slate-700 dark:text-slate-300">
                  {t("testimonial.quote")}
                </p>

                <div className="mt-6 flex items-center gap-3">
                  <img
                    src={avatars[4]}
                    alt=""
                    className="h-12 w-12 rounded-full object-cover"
                  />

                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">
                      {t("testimonial.name")}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {t("testimonial.role")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="start" className="mt-20 text-center">
            <div className="mx-auto mb-4 flex justify-center text-amber-400 dark:text-amber-500">
              <Sparkles className="h-12 w-12" />
            </div>

            <h2
              className="text-4xl font-bold leading-tight text-slate-900 dark:text-white sm:text-5xl"
              style={{ fontFamily: handwrittenFont }}
            >
              {t("footerCta.title")}
              <br />
              {t("footerCta.subtitle")}
            </h2>

            <Link
              href="/pricing"
              className="mt-8 inline-flex rounded-md bg-[#714b67] px-7 py-3 text-sm font-bold text-white shadow-lg shadow-[#714b67]/20 transition hover:-translate-y-0.5 hover:bg-[#5f3d56] dark:shadow-[#714b67]/40"
            >
              {t("footerCta.button")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
