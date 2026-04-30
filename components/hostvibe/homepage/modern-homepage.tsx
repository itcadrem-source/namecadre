"use client";

import HostvibeHero from "@/components/hostvibe/hero";
import HostvibePricingSection from "@/components/hostvibe/pricing/pricing-section";
import HostvibeHostingCarousel from "./hosting-carousel";
import {
  ChooseSection,
  CpanelFeaturesSection,
  FaqSection,
  FeaturesSection,
  JoinCommunitySection,
  SupportFrameworkSection,
  SupportSection,
} from "./sections";

export default function HostvibeModernHomepage() {
  return (
    <>
      <HostvibeHero />
      <HostvibeHostingCarousel />
      <HostvibePricingSection />
      <CpanelFeaturesSection />
      <FeaturesSection />
      <ChooseSection />
      <SupportSection />
      <SupportFrameworkSection />
      <FaqSection />
      <JoinCommunitySection />
    </>
  );
}
