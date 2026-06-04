import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/lib/site";

const title = "Eden Defence IoT Platform";
const description =
  "Build connected drone systems, autonomous robots, missile monitoring, and air defence command operations with one intelligent IoT platform.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/apps/productivity/iot" },
  openGraph: {
    type: "website",
    title,
    description,
    url: "/apps/productivity/iot",
    siteName: siteConfig.name,
    images: [{ url: "/icon.svg" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/icon.svg"],
    creator: siteConfig.twitterHandle,
  },
};

function SparklesIcon() {
  return (
    <svg viewBox="0 0 80 80" className="h-12 w-12" fill="none">
      <path
        d="M40 5V25"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M40 55V75"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M5 40H25"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M55 40H75"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function IoTDefencePage() {
  const t = useTranslations("pages.iotdefence");

  const dashboardCards = t.raw("hero.dashboard.cards");
  const missionFeatures = t.raw("missionSection.features");
  const defenceCards = t.raw("defenceCardsSection.cards");
  const featuresList = t.raw("featuresSection.features");
  const appsList = t.raw("appsSection.apps");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: `${siteConfig.url}/apps/productivity/iot`,
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string; text: string }> = {
      sky: { bg: "bg-sky-100 dark:bg-sky-950/50", text: "text-sky-700 dark:text-sky-400" },
      emerald: { bg: "bg-emerald-100 dark:bg-emerald-950/50", text: "text-emerald-700 dark:text-emerald-400" },
      amber: { bg: "bg-amber-100 dark:bg-amber-950/50", text: "text-amber-700 dark:text-amber-400" },
      rose: { bg: "bg-rose-100 dark:bg-rose-950/50", text: "text-rose-700 dark:text-rose-400" },
    };
    return colorMap[color] || colorMap.sky;
  };

  return (
    <main className="overflow-hidden bg-white dark:bg-slate-950 text-slate-900 dark:text-white">
      <Script
        id="iot-defence-json-ld"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(jsonLd)}
      </Script>

      {/* HERO */}
      <section className="relative bg-white dark:bg-slate-950 pt-20 text-center">
        <div className="mx-auto max-w-7xl px-4 pb-24">
          <h1
            className="text-5xl font-bold leading-tight text-slate-900 dark:text-white sm:text-6xl lg:text-7xl"
            style={{
              fontFamily:
                '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
            }}
          >
            {t("hero.title")}{" "}
            <span className="relative inline-block text-sky-500 dark:text-sky-400">
              {t("hero.titleHighlight")}
              <span className="absolute -bottom-2 left-0 h-2 w-full rounded-full bg-sky-300 dark:bg-sky-600" />
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            {t("hero.description")}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button className="rounded-md bg-[#714b67] px-7 py-3 text-sm font-bold text-white transition hover:bg-[#5d3f57] dark:bg-[#8a5a7e] dark:hover:bg-[#7a4a6e]">
              {t("hero.startButton")}
            </button>

            <button className="rounded-md bg-slate-100 dark:bg-slate-800 px-7 py-3 text-sm font-bold text-slate-700 dark:text-slate-200 transition hover:bg-slate-200 dark:hover:bg-slate-700">
              {t("hero.advisorButton")}
            </button>
          </div>

          <div className="relative mx-auto mt-16 max-w-6xl">
            <div className="absolute -left-10 -top-10 hidden text-rose-400 dark:text-rose-500 sm:block">
              <SparklesIcon />
            </div>

            <div className="relative z-20 overflow-hidden rounded-[28px] border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[0_35px_100px_rgba(15,23,42,0.14)] dark:shadow-[0_35px_100px_rgba(0,0,0,0.4)]">
              <div className="bg-linear-to-r from-slate-950 via-slate-900 to-slate-800 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 p-8 text-left text-white">
                <div className="flex flex-wrap items-center justify-between gap-5">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.3em] text-sky-300 dark:text-sky-400">
                      {t("hero.dashboard.title")}
                    </p>

                    <h2 className="mt-4 text-4xl font-black leading-tight">
                      {t("hero.dashboard.subtitle")}
                    </h2>
                  </div>

                  <div className="rounded-2xl bg-white/10 dark:bg-white/5 px-5 py-3 text-xs font-bold tracking-[0.2em] text-white backdrop-blur">
                    {t("hero.dashboard.liveBadge")}
                  </div>
                </div>
              </div>

              <div className="grid gap-5 bg-[#f7f8fb] dark:bg-[#0f0f1a] p-6 lg:grid-cols-4">
                {dashboardCards.map((card: any) => {
                  const colors = getColorClasses(card.color);
                  return (
                    <div
                      key={card.title}
                      className="overflow-hidden rounded-2xl bg-white dark:bg-slate-800 shadow-sm"
                    >
                      <div className="h-36 overflow-hidden">
                        <Image
                          src={card.image}
                          alt={card.title}
                          width={500}
                          height={300}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="p-5">
                        <div
                          className={`mb-4 inline-flex rounded-xl px-4 py-2 text-xs font-bold ${colors.bg} ${colors.text}`}
                        >
                          {t("hero.dashboard.liveText")}
                        </div>

                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                          {card.title}
                        </h3>

                        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                          {card.value}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button className="absolute left-1/2 top-1/2 z-30 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white dark:bg-slate-800 text-[#714b67] dark:text-[#9b6a8f] shadow-[0_10px_40px_rgba(0,0,0,0.25)]">
                ▶
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 z-0 h-44 w-full bg-[#f3f4f7] dark:bg-[#0f0f1a] [clip-path:polygon(0_42%,100%_0,100%_100%,0_100%)]" />
      </section>

      {/* MISSION */}
      <section className="bg-white dark:bg-slate-950 py-28">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <div className="mb-5 flex gap-4">
                <div className="rounded-xl bg-amber-100 dark:bg-amber-950/50 p-4 text-2xl">
                  🚀
                </div>
                <div className="rounded-xl bg-sky-100 dark:bg-sky-950/50 p-4 text-2xl">
                  🛰️
                </div>
                <div className="rounded-xl bg-emerald-100 dark:bg-emerald-950/50 p-4 text-2xl">
                  🤖
                </div>
              </div>

              <h2
                className="text-5xl font-bold leading-tight text-slate-900 dark:text-white"
                style={{
                  fontFamily:
                    '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
                }}
              >
                {t("missionSection.title")}{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">{t("missionSection.titleHighlight")}</span>
                  <span className="absolute bottom-1 left-0 h-5 w-full rounded-lg bg-[#02cfc3] dark:bg-[#02cfc3]/40" />
                </span>
              </h2>

              <p className="mt-7 text-lg leading-8 text-slate-600 dark:text-slate-300">
                {t("missionSection.description")}
              </p>

              <div className="mt-10 space-y-4">
                {missionFeatures.map((item: string) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 px-5 py-4"
                  >
                    <div className="h-3 w-3 rounded-full bg-[#02cfc3] dark:bg-[#02cfc3]/60" />
                    <p className="font-semibold text-slate-700 dark:text-slate-200">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-10 top-10 z-0 h-72 w-72 rounded-full bg-[#02cfc3]/20 dark:bg-[#02cfc3]/10 blur-3xl" />

              <div className="relative z-10 overflow-hidden rounded-[28px] border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[0_25px_90px_rgba(15,23,42,0.12)] dark:shadow-[0_25px_90px_rgba(0,0,0,0.3)]">
                <Image
                  src="/Assets/apps/Air Defence.webp"
                  alt="Air Defence"
                  width={1200}
                  height={900}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DEFENCE CARDS */}
      <section className="bg-white dark:bg-slate-950 py-28">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-4">
            {defenceCards.map((item: any) => (
              <div
                key={item.title}
                className="group overflow-hidden rounded-[28px] border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 transition duration-300 hover:-translate-y-2 hover:shadow-[0_25px_90px_rgba(15,23,42,0.14)] dark:hover:shadow-[0_25px_90px_rgba(0,0,0,0.3)]"
              >
                <div className="h-56 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={700}
                    height={500}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-7">
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="rounded-t-[5rem] bg-[#f3f4f7] dark:bg-[#0f0f1a] py-28">
        <div className="mx-auto max-w-7xl px-4">
          <h2
            className="max-w-2xl text-6xl font-bold leading-tight text-slate-900 dark:text-white"
            style={{
              fontFamily:
                '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
            }}
          >
            {t("featuresSection.title")}{" "}
            <span className="relative inline-block">
              <span className="relative z-10">features</span>
              <span className="absolute -inset-x-3 -inset-y-2 rounded-[50%] border-[6px] border-[#02cfc3] dark:border-[#02cfc3]/70" />
            </span>
            <br />
            done{" "}
            <span className="relative inline-block">
              <span className="relative z-10">{t("featuresSection.subtitle")}</span>
              <span className="absolute -bottom-2 left-0 h-2 w-full rounded-full bg-sky-400 dark:bg-sky-500" />
            </span>
          </h2>

          <div className="mt-16 grid gap-5 lg:grid-cols-2">
            {featuresList.map((feature: any) => (
              <div
                key={feature.title}
                className="rounded-2xl bg-white dark:bg-slate-800 p-7 shadow-sm"
              >
                <div className="flex items-start justify-between gap-5">
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <div className="text-xl text-amber-400 dark:text-amber-500">
                    ★
                  </div>
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <Link
            href="#"
            className="mt-10 inline-flex items-center gap-2 text-sm font-bold text-[#714b67] dark:text-[#9b6a8f] hover:underline"
          >
            {t("featuresSection.seeAllLink")} →
          </Link>
        </div>
      </section>

      {/* APPS */}
      <section className="bg-white dark:bg-slate-950 py-28">
        <div className="mx-auto max-w-7xl px-4">
          <h2
            className="text-5xl font-bold text-slate-900 dark:text-white"
            style={{
              fontFamily:
                '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
            }}
          >
            {t("appsSection.title")}{" "}
            <span className="border-b-4 border-sky-300 dark:border-sky-600">
              need
            </span>
            , one{" "}
            <span className="border-b-4 border-sky-300 dark:border-sky-600">
              app.
            </span>
          </h2>

          <p className="mt-4 text-slate-600 dark:text-slate-300">
            {t("appsSection.description")}
          </p>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {appsList.map((app: any) => (
              <div
                key={app.title}
                className="rounded-2xl bg-slate-50 dark:bg-slate-800/50 p-6 shadow-sm"
              >
                <div className="mb-4 h-12 w-12 rounded-xl bg-white dark:bg-slate-800 shadow-sm" />
                <h3 className="font-bold text-slate-900 dark:text-white">
                  {app.title}
                </h3>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  {app.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white dark:bg-slate-950 py-28 text-center">
        <div className="mx-auto max-w-4xl px-4">
          <h2
            className="text-6xl font-bold leading-tight text-slate-900 dark:text-white"
            style={{
              fontFamily:
                '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
            }}
          >
            {t("ctaSection.title")}
            <br />
            {t("ctaSection.subtitle")}{" "}
            <span className="text-[#02a6a6] dark:text-[#02cfc3]">
              {t("ctaSection.titleHighlight")}
            </span>{" "}
            {t("ctaSection.titleEnd")}
          </h2>

          <button className="mt-10 rounded-md bg-[#714b67] px-8 py-4 text-sm font-bold text-white transition hover:bg-[#5d3f57] dark:bg-[#8a5a7e] dark:hover:bg-[#7a4a6e]">
            {t("ctaSection.button")}
          </button>
        </div>
      </section>
    </main>
  );
}