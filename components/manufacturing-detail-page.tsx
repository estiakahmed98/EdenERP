"use client";

import Image from "next/image";
import Link from "next/link";
import { Sparkles, Star, type LucideIcon } from "lucide-react";

import { HandUnderline } from "@/components/ui/headunderline";

const handwrittenFont =
  '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive';

export function ScriptHeading({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`text-balance text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl ${className}`}
      style={{ fontFamily: handwrittenFont }}
    >
      {children}
    </h2>
  );
}

export function SectionEyebrow({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-[#f8eff6] px-4 py-2 text-sm font-semibold text-[#714b67] shadow-sm ring-1 ring-[#714b67]/10 dark:bg-[#2a1a24] dark:text-[#c79bb8] dark:ring-[#9b6a8f]/30">
      <span className="text-[#714b67] dark:text-[#c79bb8]">{icon}</span>
      {label}
    </div>
  );
}

export type ImageSection = {
  icon: React.ReactNode;
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  imageSrc: string;
  imageAlt: string;
  bullets?: string[];
  reversed?: boolean;
  tint?: "white" | "muted";
};

export type WorkflowStep = {
  title: string;
  description: string;
};

export type FeatureCard = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export function ManufacturingDetailPage({
  moduleLabel,
  heroTitle,
  heroTitleHighlight,
  heroDescription,
  sections,
  workflowTitle,
  workflowHighlight,
  workflowDescription,
  workflowSteps,
  featuresTitle,
  features,
  ctaTitle,
  ctaDescription,
}: {
  moduleLabel: string;
  heroTitle: string;
  heroTitleHighlight: string;
  heroDescription: string;
  sections: ImageSection[];
  workflowTitle: string;
  workflowHighlight: string;
  workflowDescription: string;
  workflowSteps: WorkflowStep[];
  featuresTitle: string;
  features: FeatureCard[];
  ctaTitle: string;
  ctaDescription: string;
}) {
  return (
    <main className="overflow-hidden bg-white dark:bg-slate-950 text-slate-900 dark:text-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-white dark:bg-slate-950 pt-14">
        <div className="mx-auto max-w-7xl px-4 pb-16 text-center sm:px-6 lg:px-8">
          <SectionEyebrow
            icon={<Sparkles className="h-4 w-4" />}
            label={moduleLabel}
          />

          <h1
            className="mt-5 text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl"
            style={{ fontFamily: handwrittenFont }}
          >
            {heroTitle}{" "}
            <HandUnderline color="bg-sky-300 dark:bg-sky-800">
              <span className="text-sky-500 dark:text-sky-400">
                {heroTitleHighlight}
              </span>
            </HandUnderline>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
            {heroDescription}
          </p>
        </div>
      </section>

      {/* Content sections */}
      {sections.map((section, index) => (
        <section
          key={section.eyebrow}
          className={`py-20 ${
            section.tint === "muted"
              ? "bg-[#f3f4f7] dark:bg-[#0f0f1a]"
              : "bg-white dark:bg-slate-950"
          }`}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div
              className={`grid items-center gap-14 lg:grid-cols-2 ${
                section.reversed ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div>
                <SectionEyebrow icon={section.icon} label={section.eyebrow} />
                <ScriptHeading className="mt-4">{section.title}</ScriptHeading>
                <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
                  {section.description}
                </p>

                {section.bullets && (
                  <div className="mt-8 space-y-3">
                    {section.bullets.map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f8eff6] text-[#714b67] dark:bg-[#2a1a24] dark:text-[#9b6a8f]">
                          <svg
                            viewBox="0 0 24 24"
                            className="h-3.5 w-3.5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                        </div>
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[0_30px_90px_rgba(15,23,42,0.13)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.3)]">
                <Image
                  src={section.imageSrc}
                  alt={section.imageAlt}
                  width={1200}
                  height={900}
                  className="h-auto w-full"
                />
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Workflow */}
      <section className="rounded-t-[4rem] bg-[#f3f4f7] dark:bg-[#0f0f1a] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            className="max-w-2xl text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            {workflowTitle}{" "}
            <span className="relative inline-block">
              <span className="relative z-10">{workflowHighlight}</span>
              <span className="absolute -inset-x-3 -inset-y-2 rounded-[50%] border-[6px] border-[#02cfc3] dark:border-[#02cfc3]/70" />
            </span>
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
            {workflowDescription}
          </p>

          <div className="mt-12 grid gap-4 md:grid-cols-4">
            {workflowSteps.map((step, index) => (
              <div
                key={step.title}
                className="rounded-xl border border-white dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#714b67]/10 text-sm font-bold text-[#714b67] dark:bg-[#9b6a8f]/20 dark:text-[#c79bb8]">
                  {index + 1}
                </span>
                <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white dark:bg-slate-950 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScriptHeading>{featuresTitle}</ScriptHeading>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f8eff6] dark:bg-[#2a1a24] text-[#714b67] dark:text-[#9b6a8f]">
                      <Icon className="h-5 w-5" />
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
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-[#f3f4f7] dark:bg-[#0f0f1a] py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto mb-4 flex justify-center text-amber-400 dark:text-amber-500">
            <Sparkles className="h-10 w-10" />
          </div>

          <ScriptHeading className="text-3xl sm:text-4xl">
            {ctaTitle}
          </ScriptHeading>

          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
            {ctaDescription}
          </p>

          <Link
            href="/pricing"
            className="mt-8 inline-flex rounded-md bg-[#714b67] px-7 py-3 text-sm font-bold text-white shadow-lg shadow-[#714b67]/20 transition hover:-translate-y-0.5 hover:bg-[#5f3d56] dark:shadow-[#714b67]/40"
          >
            Start now
          </Link>
        </div>
      </section>
    </main>
  );
}
