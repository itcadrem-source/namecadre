import HostvibeHeader from "@/components/hostvibe/header";
import HostvibeHero from "@/components/hostvibe/hero";
import {
  ChooseSection,
  CpanelFeaturesSection,
  FaqSection,
  FeaturesSection,
  HostvibeHostingCarousel,
  JoinCommunitySection,
  SupportFrameworkSection,
  SupportSection,
} from "@/components/hostvibe/homepage";
import { HostvibePricingSection } from "@/components/hostvibe/pricing";
import { HostvibeFooter } from "@/components/hostvibe/shared";

export default function Home() {
  return (
    <>
      <HostvibeHeader />
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
      <HostvibeFooter />
    </>
  );
}
