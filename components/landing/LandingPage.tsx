"use client";

import React from "react";

import AppsSection from "./AppsSection";
import CTASection from "./CTASection";
import EnterpriseSection from "./EnterpriseSection";
import FeaturesSection from "./FeaturesSection";
import Hero from "./Hero";
import { LanguageProvider, type Language } from "./LanguageProvider";
import LanguageSwitcher from "./LanguageSwitcher";
import LevelUpSection from "./LevelUpSection";
import MarqueeStrip from "./MarqueeStrip";
import NativeAISection from "./NativeAISection";
import StatsSection from "./StatsSection";
import TestimonialsSection from "./TestimonialsSection";
import { GLOBAL_CSS, useReveal } from "./landing-ui";

export default function LandingPage({ locale }: { locale: Language }) {
  useReveal();

  return (
    <LanguageProvider initialLanguage={locale}>
      <main className="min-h-screen bg-(--cream)">
        <style>{GLOBAL_CSS}</style>
        <LanguageSwitcher />
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
    </LanguageProvider>
  );
}
