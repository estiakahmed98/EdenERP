"use client";

import React from "react";

import AppsSection from "./AppsSection";
import CTASection from "./CTASection";
import EnterpriseSection from "./EnterpriseSection";
import FeaturesSection from "./FeaturesSection";
import Hero from "./Hero";
import LevelUpSection from "./LevelUpSection";
import MarqueeStrip from "./MarqueeStrip";
import NativeAISection from "./NativeAISection";
import StackedSection from "./StackedSection";
import StatsSection from "./StatsSection";
import TestimonialsSection from "./TestimonialsSection";
import { GLOBAL_CSS, useReveal } from "./landing-ui";

export default function LandingPage() {
  useReveal();

  return (
    <main className="landing-page bn-content min-h-screen bg-(--cream) text-(--ink)">
      <style>{GLOBAL_CSS}</style>
      <Hero />
            <NativeAISection />
      {/* <MarqueeStrip /> */}
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
