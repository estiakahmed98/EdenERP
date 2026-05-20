"use client";

import AutomationSection from "@/components/landing/apps/Finance/Accounting/AutomationSection";
import BankingSection from "@/components/landing/apps/Finance/Accounting/BankingSection";
import CTASection from "@/components/landing/apps/Finance/Accounting/CTASection";
import FeaturesSection from "@/components/landing/apps/Finance/Accounting/FeaturesSection";
import HeroSection from "@/components/landing/apps/Finance/Accounting/HeroSection";
import IntegrationsSection from "@/components/landing/apps/Finance/Accounting/IntegrationsSection";
import MobileSection from "@/components/landing/apps/Finance/Accounting/MobileSection";
import PerformanceSection from "@/components/landing/apps/Finance/Accounting/PerformanceSection";
import TestimonialSection from "@/components/landing/apps/Finance/Accounting/TestimonialSection";



export default function AccountingPage() {
  return (
    <div className="bg-white overflow-x-hidden">
      <HeroSection />
      <PerformanceSection />
      <AutomationSection />
      <MobileSection />
      <BankingSection />
      <FeaturesSection />
      <IntegrationsSection />
      <TestimonialSection />
      <CTASection />
    </div>
  );
}