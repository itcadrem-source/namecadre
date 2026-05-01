import HostvibeHeader from "@/components/hostvibe/header";
import {
  PricingHero,
  MotionScrollReveal,
  HostvibePricingSection,
  IncludedWithPlan,
} from "@/components/hostvibe/pricing";
import { HostvibeFooter } from "@/components/hostvibe/shared";
import HostWithConfidence from "@/components/hostvibe/section-components/common/host-with-confidence";
import WhyChooseSection from "@/components/hostvibe/section-components/common/why-choose";
import { FaqSection as HomepageFaqSection } from "@/components/hostvibe/homepage";
import { getHostvibePricingTabs } from "@/lib/hostvibe/data";

export default function PricingPage() {
  const tabs = getHostvibePricingTabs();

  return (
    <>
      <HostvibeHeader />
      <main className="hvx-landing-section bg-[var(--hv-landing-bg)] pt-20">
        <MotionScrollReveal>
          <PricingHero tabs={tabs} />
        </MotionScrollReveal>

        <MotionScrollReveal delay={0.03}>
          <HostvibePricingSection />
        </MotionScrollReveal>

        <MotionScrollReveal delay={0.05}>
          <IncludedWithPlan />
        </MotionScrollReveal>
        <MotionScrollReveal delay={0.07}>
          <HostWithConfidence />
        </MotionScrollReveal>
        <MotionScrollReveal delay={0.09}>
          <WhyChooseSection />
        </MotionScrollReveal>

        <MotionScrollReveal delay={0.1}>
          <div data-pricing-section="faq">
            <HomepageFaqSection />
          </div>
        </MotionScrollReveal>
      </main>
      <HostvibeFooter />
    </>
  );
}
