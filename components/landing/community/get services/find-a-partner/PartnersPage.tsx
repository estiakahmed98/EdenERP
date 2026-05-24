"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowRight, Search, Star, Users } from "lucide-react";
import { useTranslations } from "next-intl";

type Partner = {
  name: string;
  level: string;
  industry: string;
  logo: string;
  logoAlt: string;
  reviews: string;
  projects: string;
  experts: string;
  experience: string;
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

export default function PartnersPage() {
  const t = useTranslations("pages.community.find-partner");
  const partners = t.raw("partners") as Partner[];
  const industries = t.raw("filters.industries") as string[];

  const [searchTerm, setSearchTerm] = useState("");
  const [levelFilter, setLevelFilter] = useState(t("filters.allLevels"));
  const [industryFilter, setIndustryFilter] = useState(
    t("filters.allIndustries"),
  );

  const levels = [t("filters.allLevels"), "Platinum", "Gold", "Silver"];

  const filteredPartners = partners.filter((partner) => {
    const matchesSearch = partner.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesLevel =
      levelFilter === t("filters.allLevels") || partner.level === levelFilter;
    const matchesIndustry =
      industryFilter === t("filters.allIndustries") ||
      partner.industry === industryFilter;

    return matchesSearch && matchesLevel && matchesIndustry;
  });

  return (
    <main className="overflow-hidden bg-background text-foreground">
      <section className="relative isolate">
        <div className="absolute inset-x-0 top-0 -z-10 h-[28rem] bg-[radial-gradient(circle_at_15%_12%,rgba(139,92,246,0.08),transparent_25%),radial-gradient(circle_at_85%_15%,rgba(139,92,246,0.06),transparent_24%)]" />
        <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <SectionEyebrow
            icon={<Users className="h-4 w-4" />}
            label={t("hero.eyebrow")}
          />
          <ScriptHeading className="mt-6">{t("hero.title")}</ScriptHeading>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            {t("hero.description")}
          </p>
          <button className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:-translate-y-0.5 hover:bg-primary/90">
            {t("hero.cta")}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="grid gap-4 md:grid-cols-[1fr_200px_200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder={t("filters.searchPlaceholder")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border border-input bg-background py-3 pl-10 pr-4 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary/40 focus:ring-1 focus:ring-primary/20"
              />
            </div>
            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20"
            >
              {levels.map((level) => (
                <option key={level} value={level}>
                  {level === t("filters.allLevels")
                    ? level
                    : `${level} ${t("filters.levelSuffix")}`}
                </option>
              ))}
            </select>
            <select
              value={industryFilter}
              onChange={(e) => setIndustryFilter(e.target.value)}
              className="rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20"
            >
              <option>{t("filters.allIndustries")}</option>
              {industries.map((industry) => (
                <option key={industry}>{industry}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {filteredPartners.map((partner) => (
            <div
              key={partner.name}
              className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex flex-wrap items-center gap-6 md:flex-nowrap">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-muted to-muted/50 p-3 shadow-md">
                  <Image
                    src={partner.logo}
                    alt={partner.logoAlt}
                    width={70}
                    height={70}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-xl font-bold text-foreground">
                      {partner.name}
                    </h3>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        partner.level === "Platinum"
                          ? "bg-slate-800 text-white dark:bg-slate-700"
                          : partner.level === "Gold"
                            ? "bg-amber-500 text-white"
                            : "bg-slate-400 text-white dark:bg-slate-600"
                      }`}
                    >
                      {partner.level}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-1 text-amber-400">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={index} className="h-4 w-4 fill-current" />
                    ))}
                    <span className="ml-2 text-xs text-muted-foreground">
                      5.0 ({partner.reviews} {t("stats.reviews")})
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {partner.industry}
                  </p>
                </div>

                <div className="flex gap-6 text-center">
                  <div>
                    <p className="text-2xl font-bold text-primary">
                      {partner.projects}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t("stats.projects")}
                    </p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">
                      {partner.experts}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t("stats.experts")}
                    </p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">
                      {partner.experience}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t("stats.experience")}
                    </p>
                  </div>
                </div>

                <button className="shrink-0 rounded-xl border border-primary/20 bg-card px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary/10">
                  {t("stats.contact")}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredPartners.length === 0 ? (
          <div className="py-20 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted/30">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">
              {t("empty.title")}
            </h3>
            <p className="text-muted-foreground">{t("empty.description")}</p>
          </div>
        ) : null}

        <div className="mt-16 rounded-3xl bg-gradient-to-r from-primary/10 to-primary/5 p-8 text-center">
          <div className="mx-auto max-w-2xl">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mt-4 text-2xl font-bold text-foreground">
              {t("banner.title")}
            </h3>
            <p className="mt-2 text-muted-foreground">
              {t("banner.description")}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
