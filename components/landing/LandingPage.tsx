"use client";

import React from "react";
import dynamic from "next/dynamic";

import Hero from "./Hero";
import StackedSection from "./StackedSection";
import { GLOBAL_CSS, useReveal } from "./landing-ui";

// Below-the-fold sections are code-split into their own chunks so the hero
// can paint and become interactive sooner. They are still server-rendered
// (ssr default), so the HTML/content stays crawlable for SEO.
const NativeAISection = dynamic(() => import("./NativeAISection"));
const AppsSection = dynamic(() => import("./AppsSection"));
const LevelUpSection = dynamic(() => import("./LevelUpSection"));
const FeaturesSection = dynamic(() => import("./FeaturesSection"));
const EnterpriseSection = dynamic(() => import("./EnterpriseSection"));
const StatsSection = dynamic(() => import("./StatsSection"));
const TestimonialsSection = dynamic(() => import("./TestimonialsSection"));
const CTASection = dynamic(() => import("./CTASection"));

export default function LandingPage() {
  useReveal();

  return (
    <main className="landing-page bn-content min-h-screen bg-(--cream) text-(--ink)">
      <style>{GLOBAL_CSS}</style>
      <Hero />
      <NativeAISection />
      <AppsSection />

      <div className="relative">
        <StackedSection index={0}>
          <LevelUpSection />
        </StackedSection>
        <StackedSection index={1}>
          <FeaturesSection />
        </StackedSection>
        <StackedSection index={2}>
          <EnterpriseSection />
        </StackedSection>
      </div>
      <StatsSection />
      <TestimonialsSection />
      <CTASection />
    </main>
  );
}
