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
import StatsSection from "./StatsSection";
import TestimonialsSection from "./TestimonialsSection";
import { GLOBAL_CSS, useReveal } from "./landing-ui";

export default function LandingPage() {
  useReveal();

  return (
    <main className="bn-content min-h-screen bg-(--cream) text-(--ink)">
      <style>{GLOBAL_CSS}</style>
      <Hero />
      <MarqueeStrip />
      <AppsSection />
      <NativeAISection />
      <LevelUpSection />
      <FeaturesSection />
      <EnterpriseSection />
      <StatsSection />
      <TestimonialsSection />
      <CTASection />
    </main>
  );
}
