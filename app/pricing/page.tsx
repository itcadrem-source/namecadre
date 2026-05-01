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

        <MotionScrollReveal>
          <HostvibePricingSection />
        </MotionScrollReveal>

        <MotionScrollReveal>
          <IncludedWithPlan />
        </MotionScrollReveal>
        <MotionScrollReveal>
          <HostWithConfidence />
        </MotionScrollReveal>
        <MotionScrollReveal>
          <WhyChooseSection />
        </MotionScrollReveal>

        <MotionScrollReveal>
          <div data-pricing-section="faq">
            <HomepageFaqSection />
          </div>
        </MotionScrollReveal>
      </main>
      <HostvibeFooter />
    </>
  );
}
