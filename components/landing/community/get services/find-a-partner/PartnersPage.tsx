"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Sparkles,
  Star,
  Users,
  Calendar,
  Check,
  Search,
  MapPin,
  Briefcase,
  Award,
  FileCheck,
} from "lucide-react";

const partners = [
  {
    name: "Ann-nahl Software",
    level: "Silver",
    rating: 5,
    industry: "ERP & Business Solutions",
    logo: "/Assets/apps/ann-nahl.png",
    logoAlt: "Ann-nahl Software",
  },
  {
    name: "Reputation Prime",
    level: "Silver",
    rating: 5,
    industry: "AI & Digital Marketing",
    logo: "/Assets/apps/repuprime.jpeg",
    logoAlt: "Reputation Prime",
  },
  {
    name: "Government of Bangladesh",
    level: "Platinum",
    rating: 5,
    industry: "Public Sector",
    logo: "/Assets/apps/bangovt.png",
    logoAlt: "Bangladesh Government",
  },
  {
    name: "Ministry of Health",
    level: "Gold",
    rating: 5,
    industry: "Healthcare",
    logo: "/Assets/apps/moh.png",
    logoAlt: "Ministry of Health",
  },
  {
    name: "SDAIA",
    level: "Platinum",
    rating: 5,
    industry: "Data & AI Authority",
    logo: "/Assets/apps/sdaia.png",
    logoAlt: "SDAIA",
  },
  {
    name: "Ministry of Human Resources & Social Development",
    level: "Platinum",
    rating: 5,
    industry: "Government & HR Services",
    logo: "/Assets/apps/HRSD.png",
    logoAlt: "Ministry of Human Resources",
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

export default function PartnersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [levelFilter, setLevelFilter] = useState("All");

  const filteredPartners = partners.filter((partner) => {
    const matchesSearch = partner.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesLevel = levelFilter === "All" || partner.level === levelFilter;
    return matchesSearch && matchesLevel;
  });

  const levels = ["All", "Platinum", "Gold", "Silver"];

  return (
    <main className="overflow-hidden bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative isolate">
        <div className="absolute inset-x-0 top-0 -z-10 h-[28rem] bg-[radial-gradient(circle_at_15%_12%,rgba(139,92,246,0.08),transparent_25%),radial-gradient(circle_at_85%_15%,rgba(139,92,246,0.06),transparent_24%)]" />
        <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <SectionEyebrow
            icon={<Users className="h-4 w-4" />}
            label="Trusted partners"
          />
          <ScriptHeading className="mt-6">
            Implementation Partners
          </ScriptHeading>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Connect with certified experts who bring Eden ERP solutions to
            businesses and government organizations across the region.
          </p>
          <button className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:-translate-y-0.5 hover:bg-primary/90">
            Find Best Match
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      {/* Partners List Section */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Filters */}
        <div className="mb-12 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="grid gap-4 md:grid-cols-[1fr_200px_200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search partners..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border border-input bg-background py-3 pl-10 pr-4 text-sm outline-none text-foreground placeholder:text-muted-foreground focus:border-primary/40 focus:ring-1 focus:ring-primary/20"
              />
            </div>
            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none text-foreground focus:border-primary/40 focus:ring-1 focus:ring-primary/20"
            >
              {levels.map((level) => (
                <option key={level} value={level}>
                  {level} Level
                </option>
              ))}
            </select>
            <select className="rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none text-foreground focus:border-primary/40 focus:ring-1 focus:ring-primary/20">
              <option>All Industries</option>
              <option>Government</option>
              <option>Technology</option>
              <option>Healthcare</option>
              <option>ERP Solutions</option>
              <option>AI & Marketing</option>
            </select>
          </div>
        </div>

        {/* Partners Grid */}
        <div className="space-y-4">
          {filteredPartners.map((partner, index) => (
            <div
              key={partner.name}
              className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex flex-wrap items-center gap-6 md:flex-nowrap">
                {/* Logo */}
                <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-muted to-muted/50 p-3 shadow-md">
                  {partner.logo ? (
                    <Image
                      src={partner.logo}
                      alt={partner.logoAlt}
                      width={70}
                      height={70}
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <span className="text-2xl font-black text-primary">
                      {partner.name.slice(0, 2).toUpperCase()}
                    </span>
                  )}
                </div>

                {/* Partner Info */}
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
                    {Array.from({ length: partner.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                    <span className="ml-2 text-xs text-muted-foreground">
                      5.0 ({Math.floor(Math.random() * 30) + 10} reviews)
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {partner.industry}
                  </p>
                </div>

                {/* Stats */}
                <div className="flex gap-6 text-center">
                  <div>
                    <p className="text-2xl font-bold text-primary">
                      {Math.floor(Math.random() * 30) + 10}+
                    </p>
                    <p className="text-xs text-muted-foreground">Projects</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">
                      {Math.floor(Math.random() * 8) + 1}+
                    </p>
                    <p className="text-xs text-muted-foreground">Experts</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">
                      {Math.floor(Math.random() * 8) + 2}yr
                    </p>
                    <p className="text-xs text-muted-foreground">Experience</p>
                  </div>
                </div>

                {/* CTA Button */}
                <button className="shrink-0 rounded-xl border border-primary/20 bg-card px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary/10">
                  Contact Partner
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredPartners.length === 0 && (
          <div className="py-20 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted/30">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">
              No partners found
            </h3>
            <p className="text-muted-foreground">Try adjusting your search or filter</p>
          </div>
        )}

        {/* Stats Banner */}
        <div className="mt-16 rounded-3xl bg-gradient-to-r from-primary/10 to-primary/5 p-8 text-center">
          <div className="mx-auto max-w-2xl">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mt-4 text-2xl font-bold text-foreground">
              Trusted by leading organizations
            </h3>
            <p className="mt-2 text-muted-foreground">
              Join 15 million+ users who rely on Eden ERP and our certified
              partners for successful digital transformation.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}